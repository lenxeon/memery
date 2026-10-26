/**
 * @file SceneCanvas.tsx
 * @description 祭祀与祈福主舞台 PixiJS 视口组件。
 * 全面接管场景环境、地面材质、红木供案与所有供品摆件的 2.5D WebGL 渲染，
 * 采用原生动态 Canvas 挂载与 StrictMode 防 context lost 保护机制。
 */
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { PixiStage } from '../../pixi/engine/PixiStage';
import { TexturePipeline } from '../../pixi/assets/TexturePipeline';
import { SceneBackgroundLayer } from '../../pixi/layers/SceneBackgroundLayer';
import { SceneThemeLayer } from '../../pixi/layers/SceneThemeLayer';
import { getSceneComponentOption } from '../../pixi/scene/components';
import { getSceneTheme } from '../../pixi/scene/themes';
import { getSceneCompositionWidth } from '../../pixi/scene/SceneViewportLayout';
import { FloorLayer } from '../../pixi/layers/FloorLayer';
import { GodRaysLayer } from '../../pixi/layers/GodRaysLayer';
import { DustMotesLayer } from '../../pixi/layers/DustMotesLayer';
import { AltarTableLayer } from '../../pixi/layers/AltarTableLayer';
import { getMingAltarTableMetrics, getRenderMatchAltarTableMetrics } from '../../pixi/layers/table/MingAltarTableSpec';
import { MemorialPortraitLayer, StageInsets } from '../../pixi/layers/MemorialPortraitLayer';
import { PropsLayer } from '../../pixi/layers/PropsLayer';
import { SmokeParticleEmitter } from '../../pixi/effects/SmokeParticleEmitter';
import { PixiEffects } from '../../pixi/effects/PixiEffects';
import {
  SceneItem,
  SceneItemId,
  LightingSettings,
  MemorialInfo,
  SceneThemeId,
  SceneAssemblySelection,
  FloorStyle,
  TableclothStyle,
  TableWoodStyle,
  FlowerType,
  VaseHitZone,
} from '../../pixi/../types';
import { sound } from '../../pixi/../utils/audio';

/** TEMP_DEBUG: 置为 true 时不渲染背景墙（用于单独查看/截地面），恢复时改回 false */
const DISABLE_WALL = false;
/** TEMP_DEBUG: 置为 true 时不渲染供案（含案体照明层），恢复时改回 false */
const DISABLE_TABLE = false;
const ENABLE_GOD_RAYS = false;
const ENABLE_SCENE_SHADOWS = false;

const DEFAULT_STAGE_INSETS: StageInsets = { top: 48, bottom: 0 };

export interface SceneCanvasProps {
  items: Record<SceneItemId, SceneItem>;
  lighting: LightingSettings;
  themeId: SceneThemeId;
  /** 墙体、地面陈设与左右前景的独立部件组合。 */
  sceneAssembly?: SceneAssemblySelection | null;
  floorStyle: FloorStyle;
  /** 为 false 时用户已手动选择公共地材，不再使用主题自带地材。 */
  useThemeFloor?: boolean;
  tableclothStyle: TableclothStyle;
  tableWoodStyle?: TableWoodStyle;
  /** 腿足构架独立材质（桌腿/牙板/横枨） */
  tableLegWoodStyle?: TableWoodStyle;
  /** 桌子前后位置：-1 最靠后（远），0 标准，1 最靠前（近） */
  tableForward?: number;
  showTableRunner?: boolean;
  petalTrigger?: number;
  lastOfferedFlower?: FlowerType;
  onToggleItemLit?: (id: SceneItemId) => void;
  onToggleFruit?: (id: SceneItemId) => void;
  onVaseClick?: (id: SceneItemId, zone: VaseHitZone) => void;
  onBowlHit?: () => void;
  /** 长按物件：请求查看该物件的典故出处 */
  onInspectItem?: (id: SceneItemId) => void;
  onUpdateItemPosition?: (id: SceneItemId, pos: { x: number; y: number }) => void;
  /** 场景内直接拖放供案调整前后进深后提交 (范围 -1 ~ 1) */
  onUpdateTableForward?: (value: number) => void;
  /** 遗像牌位（堂号 / 题名 / 像容），由 Pixi 层渲染于墙面之前 */
  memorial?: MemorialInfo;
  /** 点击遗像：请求打开牌位编辑弹窗 */
  onEditMemorial?: () => void;
  /** 舞台区相对画布的上下内缩（顶栏 / 底栏高度），用于遗像纵向定位 */
  stageInsets?: StageInsets;
  className?: string;
}

export const SceneCanvas: React.FC<SceneCanvasProps> = ({
  items,
  lighting,
  themeId,
  sceneAssembly,
  floorStyle,
  useThemeFloor = true,
  tableclothStyle,
  tableWoodStyle = 'walnut',
  tableLegWoodStyle = 'walnut',
  tableForward = 0.5,
  showTableRunner = true,
  petalTrigger = 0,
  lastOfferedFlower = 'peonies',
  onToggleItemLit,
  onToggleFruit,
  onVaseClick,
  onBowlHit,
  onInspectItem,
  onUpdateItemPosition,
  onUpdateTableForward,
  memorial,
  onEditMemorial,
  stageInsets,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<PixiStage | null>(null);
  const isReadyRef = useRef<boolean>(false);
  const [sceneLoadState, setSceneLoadState] = useState<'loading' | 'ready' | 'error'>('loading');
  const renderRevisionRef = useRef(0);
  const floorReadyRef = useRef<Promise<void>>(Promise.resolve());
  const memorialRef = useRef(memorial);
  memorialRef.current = memorial;

  // 供案前后进深：拖动过程中本地即时生效，松手后提交给外部状态
  const activeForwardRef = useRef<number>(tableForward);
  const isDraggingTableRef = useRef<boolean>(false);
  const dragStartForwardRef = useRef<number>(tableForward);

  // 场景图层实例
  const bgLayerRef = useRef<SceneBackgroundLayer | null>(null);
  const themeLayerRef = useRef<SceneThemeLayer | null>(null);
  const floorLayerRef = useRef<FloorLayer | null>(null);
  const godRaysLayerRef = useRef<GodRaysLayer | null>(null);
  const dustLayerRef = useRef<DustMotesLayer | null>(null);
  const tableLayerRef = useRef<AltarTableLayer | null>(null);
  const portraitLayerRef = useRef<MemorialPortraitLayer | null>(null);
  const propsLayerRef = useRef<PropsLayer | null>(null);
  const smokeEmitterRef = useRef<SmokeParticleEmitter | null>(null);
  const pixiEffectsRef = useRef<PixiEffects | null>(null);

  const prevPetalTriggerRef = useRef<number>(petalTrigger);
  const viewportSizeRef = useRef<{ width: number; height: number }>({ width: 800, height: 600 });

  const callbacksRef = useRef({
    onToggleItemLit,
    onToggleFruit,
    onVaseClick,
    onBowlHit,
    onInspectItem,
    onUpdateItemPosition,
    onUpdateTableForward,
    onEditMemorial,
  });

  useEffect(() => {
    callbacksRef.current = {
      onToggleItemLit,
      onToggleFruit,
      onVaseClick,
      onBowlHit,
      onInspectItem,
      onUpdateItemPosition,
      onUpdateTableForward,
      onEditMemorial,
    };
  });

  // 获取安全视口尺寸
  const getViewportDimensions = useCallback(() => {
    const container = containerRef.current;
    if (!container) return { width: window.innerWidth, height: window.innerHeight };
    const rect = container.getBoundingClientRect();
    const w = rect.width > 10 ? rect.width : window.innerWidth;
    const h = rect.height > 10 ? rect.height : window.innerHeight;
    return { width: Math.round(w), height: Math.round(h) };
  }, []);

  // 供案透视布局几何（宽厚沉稳，台面前沿精准定位，桌裙离地悬空，绝不拖地）
  // forward ∈ [-1, 1]：前后移动伴随近大远小，前移时贴近镜头、后移时退向纵深
  const getTableLayout = useCallback((width: number, height: number, forward: number = 0) => {
    const centerX = width * 0.5;
    // 供案宽度按画布比例定义，手机与 iPad 都保持墙面与供桌的主体比例。
    const depthScale = 1 + forward * 0.07;
    const compositionWidth = getSceneCompositionWidth(width, height);
    const tableWidth = Math.max(compositionWidth * 0.84, Math.min(compositionWidth * 0.92, compositionWidth * 0.90 * depthScale));
    const tableMetrics = themeId === 'classic_dawn'
      ? getRenderMatchAltarTableMetrics(tableWidth)
      : getMingAltarTableMetrics(tableWidth);
    const tableHeight = tableMetrics.topExtent + tableMetrics.footDrop;
    // 桌面前沿到新素材桌脚底部的垂挂高度，确保足端贴地。
    const tableHangingHeight = tableMetrics.footDrop;
    // 底部留出开阔地板透视余量：前移收窄（贴近镜头），后移加宽（退向纵深）
    // 让供桌落在墙地交界附近，留出窄地面带给席垫与蒲团。
    const tableBottomOffset = height * 0.125 - forward * 24;
    const tableTopY = height - tableBottomOffset - tableHangingHeight;
    return { centerX, tableTopY, tableWidth, tableHeight };
  }, [themeId]);

  // 重绘全部图层
  const renderAll = useCallback(() => {
    if (!isReadyRef.current) return;
    renderRevisionRef.current += 1;
    const { width, height } = getViewportDimensions();
    viewportSizeRef.current = { width, height };

    // 0. 远景背景墙（纯 Pixi 坐标系渲染，与供案共用同一 centerX，杜绝 DOM/CSS 布局错位）
    // TEMP_DEBUG: 临时关闭墙面渲染，仅看地面
    if (!DISABLE_WALL) {
      const wallpaperAsset = sceneAssembly
        ? getSceneComponentOption('wallpaper', sceneAssembly.wallpaperId)?.asset
        : getSceneTheme(themeId).wall?.wallpaper;
      const deviceProfile = width < 700 ? 'phone' : 'tablet';
      const wallpaper = wallpaperAsset?.responsiveAssets?.[deviceProfile] ?? wallpaperAsset?.url;
      bgLayerRef.current?.render(width, height, lighting, themeId, wallpaper);
    }
    if (bgLayerRef.current) bgLayerRef.current.container.visible = !DISABLE_WALL;

    // 0b. 遗像与主题锚点先完成布局，地坪即可读取主题自带材质。
    if (portraitLayerRef.current) {
      portraitLayerRef.current.layout(width, height, stageInsets ?? DEFAULT_STAGE_INSETS, themeId);
      portraitLayerRef.current.setLighting(
        lighting.masterOn ? lighting.sunlightIntensity : 0.2,
        lighting.timeOfDay
      );
      themeLayerRef.current?.render(
        width,
        height,
        themeId,
        portraitLayerRef.current.getThemeAnchor(),
        sceneAssembly,
        lighting,
        getSceneTheme(themeId).lightRig
      );
    }

    // 0c. 2.5D 透视地坪；主题可提供独享材质，否则使用公共地坪选择。
    const pipeline = TexturePipeline.getInstance();
    const sceneTheme = getSceneTheme(themeId);
    floorReadyRef.current = useThemeFloor && sceneTheme.floorMaterial
      ? Promise.resolve()
      : pipeline.whenFloorReady(floorStyle);
    const themeFloorMaterial = useThemeFloor ? sceneTheme.floorMaterial : undefined;
    floorLayerRef.current?.render(
      width,
      height,
      floorStyle,
      pipeline.woodPlankTexture,
      pipeline.marbleTileTexture,
      lighting,
      useThemeFloor ? themeLayerRef.current?.getFloorMaterial() : undefined,
      themeFloorMaterial,
      sceneTheme.lightRig
    );

    // 0d. 丁达尔光束（Pixi 加色混合，随 lightsLayer 视差一同摆动）
    const raySource = themeId === 'classic_dawn'
      ? getSceneTheme(themeId).lightRig.source
      : { x: 0.5, y: 0.12 };
    godRaysLayerRef.current?.render(width, height, lighting, raySource);

    // 0e. 光束中的浮尘（与场景共用 Ticker，密度/日照/风力同光照联动）
    dustLayerRef.current?.layout(width, height);
    dustLayerRef.current?.setOptions({
      density: lighting.dustDensity,
      sunlightIntensity: lighting.masterOn ? lighting.sunlightIntensity : 0.15,
      windForce: lighting.windForce,
      timeOfDay: lighting.timeOfDay,
    });

    // 1. 供案几何与桌布 (置于用户近前前景，开阔背景纵深)
    const forward = activeForwardRef.current;
    const { centerX, tableTopY, tableWidth } = getTableLayout(width, height, forward);
    // TEMP_DEBUG: 临时关闭供案渲染
    if (tableLayerRef.current) {
      tableLayerRef.current.container.visible = !DISABLE_TABLE;
      tableLayerRef.current.lightContainer.visible = !DISABLE_TABLE;
    }
    if (DISABLE_TABLE) {
      // 供品立于案面，隐藏供案时一并隐藏，避免悬空残留
      if (propsLayerRef.current) propsLayerRef.current.container.visible = false;
      return;
    }
    if (propsLayerRef.current) propsLayerRef.current.container.visible = true;
    tableLayerRef.current?.render({
      centerX,
      tableTopY,
      tableWidth,
      tableclothStyle,
      showTableRunner,
      showPetals: false,
      topWoodStyle: tableWoodStyle,
      legWoodStyle: tableLegWoodStyle,
      tableAssetUrl: sceneTheme.tableAssetUrl,
      // 地坪水平灭点基线与 FloorLayer 保持一致 (视口下 38%)
      horizonY: height * 0.62,
    });

    // 1b. 同步供案台面灯光暗化
    if (tableLayerRef.current) tableLayerRef.current.setLighting(lighting);

    // 2. 供品与道具 (1:1 同步置于供案台面)
    propsLayerRef.current?.syncItems(items, centerX, tableTopY, tableWidth);
    }, [items, themeId, sceneAssembly, floorStyle, useThemeFloor, tableclothStyle, tableWoodStyle, tableLegWoodStyle, showTableRunner, lighting, stageInsets, getViewportDimensions, getTableLayout]);

  // 始终持有最新重绘函数（供案拖放时按最新状态即时重绘）
  const renderAllRef = useRef(renderAll);
  useEffect(() => {
    renderAllRef.current = renderAll;
  });

  // 外部进深状态变化（非拖动中）同步至本地渲染值
  useEffect(() => {
    if (isDraggingTableRef.current) return;
    activeForwardRef.current = tableForward;
  }, [tableForward]);

  // 1. 初始化 PixiJS 舞台
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isMounted = true;
    const stage = new PixiStage();
    stageRef.current = stage;

    const initEngine = async () => {
      const { width, height } = getViewportDimensions();
      viewportSizeRef.current = { width, height };

      await stage.init({ container, width, height, deferFirstFrame: true });
      if (!isMounted) {
        stage.destroy();
        return;
      }

      // 初始化纹理管线
      const pipeline = TexturePipeline.getInstance();
      await pipeline.init();
      if (!isMounted) {
        stage.destroy();
        return;
      }

      // 构建分层与特效系统
      const bgLayer = new SceneBackgroundLayer();
      const themeLayer = new SceneThemeLayer(() => renderAllRef.current());
      const floorLayer = new FloorLayer(ENABLE_SCENE_SHADOWS);
      const godRaysLayer = ENABLE_GOD_RAYS ? new GodRaysLayer() : null;
      const dustLayer = new DustMotesLayer();
      const tableLayer = new AltarTableLayer(ENABLE_SCENE_SHADOWS);
      const portraitLayer = new MemorialPortraitLayer();
      const propsLayer = new PropsLayer(pipeline);

      const pixiEffects = new PixiEffects(pipeline.glowTexture!, pipeline.petalTextures);

      // 装载到 2.5D 深度视差容器中
      stage.backgroundLayer.addChild(bgLayer.container);
      stage.backgroundLayer.addChild(themeLayer.wallpaperDecorations);
      stage.portraitLayer.addChild(themeLayer.portraitBack);
      stage.portraitLayer.addChild(portraitLayer.container);
      stage.portraitLayer.addChild(themeLayer.portraitFront);
      stage.floorLayer.addChild(floorLayer.container);
      // Frame and wall attachments share one Pixi group so their placement and scale stay aligned.
      stage.floorLayer.addChild(themeLayer.wallAssembly);
      // The mat extends under the table feet. Keep both in the same parallax group,
      // with the mat inserted first so their alignment stays fixed while the scene moves.
      stage.tableLayer.addChild(themeLayer.groundMat);
      stage.tableLayer.addChild(tableLayer.container);
      // 案体照明层：叠在案体之上、道具之下
      stage.tableLayer.addChild(tableLayer.lightContainer);
      // Keep the cushion above the mat but in front of the table.
      stage.groundFrontLayer.addChild(themeLayer.ground);
      stage.propsLayer.addChild(propsLayer.container);
      // 前景气光层次：光束（远）→ 烛焰光晕 → 落瓣 → 浮尘（最近）
      if (godRaysLayer) stage.lightsLayer.addChild(godRaysLayer.container);
      stage.lightsLayer.addChild(pixiEffects.lightsContainer);
      stage.lightsLayer.addChild(pixiEffects.petalsContainer);
      stage.lightsLayer.addChild(dustLayer.container);
      stage.lightsLayer.addChild(themeLayer.foregroundLeft);
      stage.lightsLayer.addChild(themeLayer.foregroundRight);

      // 绑定特效与道具交互
      propsLayer.bindEffects(null as any, pixiEffects);
      propsLayer.setCallbacks({
        onToggleLit: (id) => callbacksRef.current.onToggleItemLit?.(id),
        onToggleFruit: (id) => callbacksRef.current.onToggleFruit?.(id),
        onBowlHit: () => {
          sound.playSingingBowl();
          callbacksRef.current.onBowlHit?.();
        },
        onVaseClick: (id, zone) => callbacksRef.current.onVaseClick?.(id, zone),
        onUpdatePosition: (id, pos) => callbacksRef.current.onUpdateItemPosition?.(id, pos),
        onInspect: (id) => callbacksRef.current.onInspectItem?.(id),
      });

      // 遗像牌位：点击即请求页面打开牌位编辑弹窗
      portraitLayer.setCallbacks({
        onEdit: () => {
          sound.playWoodPlacement();
          callbacksRef.current.onEditMemorial?.();
        },
      });
      if (memorialRef.current) portraitLayer.setInfo(memorialRef.current);

      // 供案本体拖放：直接在场景中上下拖动调整前后进深（近大远小）
      tableLayer.setDragCallbacks({
        onDragStart: () => {
          isDraggingTableRef.current = true;
          dragStartForwardRef.current = activeForwardRef.current;
        },
        onDrag: (dy) => {
          const { height } = viewportSizeRef.current;
          const span = Math.max(160, height * 0.4);
          const next = Math.max(-1, Math.min(1, dragStartForwardRef.current + dy / span));
          if (Math.abs(next - activeForwardRef.current) < 0.004) return;
          activeForwardRef.current = next;
          renderAllRef.current();
        },
        onDragEnd: () => {
          isDraggingTableRef.current = false;
          callbacksRef.current.onUpdateTableForward?.(activeForwardRef.current);
        },
      });

      bgLayerRef.current = bgLayer;
      themeLayerRef.current = themeLayer;
      floorLayerRef.current = floorLayer;
      godRaysLayerRef.current = godRaysLayer;
      dustLayerRef.current = dustLayer;
      tableLayerRef.current = tableLayer;
      portraitLayerRef.current = portraitLayer;
      propsLayerRef.current = propsLayer;
      pixiEffectsRef.current = pixiEffects;

      // 注册 Ticker 逐帧物理与动画更新 (只更新粒子物理与微风拂动)
      stage.app?.ticker.add((ticker) => {
        const delta = ticker.deltaTime;
        propsLayer.update(delta);
        pixiEffects.update(delta);
        godRaysLayerRef.current?.update(delta);
        dustLayerRef.current?.update(delta);
        portraitLayerRef.current?.update(delta);
        // 案体光照随烛火真实位置与明灭状态实时衰减照亮
        if (tableLayer.needsCandleLightSources()) {
          tableLayer.setCandleLights(propsLayer.getCandleLightSources());
        }
      });

      isReadyRef.current = true;
      let initialAssetsLaidOut = false;
      while (isMounted && stage.app) {
        renderAllRef.current();
        const loadingRevision = renderRevisionRef.current;
        await Promise.all([
          bgLayer.whenReady(), themeLayer.whenReady(), tableLayer.whenReady(),
          portraitLayer.whenReady(), propsLayer.whenReady(), floorReadyRef.current,
        ]);
        if (!isMounted || !stage.app) return;
        // Apply late floor textures and repeat if asset callbacks or settings
        // changed the scene while the previous set of loads was settling.
        if (!initialAssetsLaidOut || loadingRevision !== renderRevisionRef.current) {
          initialAssetsLaidOut = true;
          continue;
        }
        propsLayer.update(2);
        pixiEffects.update(0);
        dustLayer.update(0);
        if (tableLayer.needsCandleLightSources()) {
          tableLayer.setCandleLights(propsLayer.getCandleLightSources());
        }
        const readyRevision = renderRevisionRef.current;
        await stage.app.renderer.prepare.upload(stage.app.stage);
        if (!isMounted || !stage.app) return;
        if (readyRevision !== renderRevisionRef.current) continue;
        stage.app.render();
        stage.app.canvas.style.visibility = 'visible';
        stage.app.start();
        setSceneLoadState('ready');
        break;
      }
    };

    void initEngine().catch((error) => {
      console.error('Failed to initialize scene:', error);
      if (isMounted) setSceneLoadState('error');
    });

    const handleResize = () => {
      if (!stageRef.current || !containerRef.current) return;
      const { width, height } = getViewportDimensions();
      stageRef.current.resize(width, height);
      // 走 ref 取最新重绘函数，避免沿用初始化闭包里的陈旧 props
      renderAllRef.current();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isMounted = false;
      isReadyRef.current = false;
      window.removeEventListener('resize', handleResize);
      bgLayerRef.current?.destroy();
      themeLayerRef.current?.destroy();
      floorLayerRef.current?.destroy();
      godRaysLayerRef.current?.destroy();
      dustLayerRef.current?.destroy();
      portraitLayerRef.current?.destroy();
      tableLayerRef.current?.destroy();
      propsLayerRef.current?.destroy();
      pixiEffectsRef.current?.destroy();
      stage.destroy();
    };
  }, []);

  // 2. 外部宏观环境状态变化
  useEffect(() => {
    if (!isReadyRef.current) return;
    renderAll();
  }, [
    themeId,
    sceneAssembly,
    floorStyle,
    useThemeFloor,
    tableclothStyle,
    tableWoodStyle,
    tableLegWoodStyle,
    tableForward,
    showTableRunner,
    lighting.masterOn,
    lighting.timeOfDay,
    lighting.sunlightIntensity,
    // 光束与浮尘随这些参数即时重建（原先由 DOM 层各自同步）
    lighting.godRaysEnabled,
    lighting.godRaysIntensity,
    lighting.sunAngle,
    lighting.dustDensity,
    lighting.windForce,
    // 舞台内缩变化（顶栏 / 底栏高度量测）需重排遗像
    stageInsets,
  ]);

  // 3. 道具状态轻量同步 (只更新道具，绝不重绘背景和地面)
  useEffect(() => {
    if (!isReadyRef.current) return;
    const { width, height } = viewportSizeRef.current;
    const { centerX, tableTopY, tableWidth } = getTableLayout(width, height, tableForward);
    propsLayerRef.current?.syncItems(items, centerX, tableTopY, tableWidth);
  }, [items, tableForward, getTableLayout]);

  // 3b. 遗像牌位轻量同步 (堂号 / 题名 / 像容，不触发全场景重绘)
  useEffect(() => {
    if (!isReadyRef.current || !memorial) return;
    portraitLayerRef.current?.setInfo(memorial);
  }, [memorial]);

  // 4. 落花飘落动效触发
  useEffect(() => {
    if (petalTrigger !== prevPetalTriggerRef.current && petalTrigger > 0) {
      prevPetalTriggerRef.current = petalTrigger;
      const { width } = viewportSizeRef.current;
      pixiEffectsRef.current?.triggerPetalShower(lastOfferedFlower, 28, width);
    }
  }, [petalTrigger, lastOfferedFlower]);

  // 禁用场景内浏览器原生右键/长按菜单，避免拖放供品时误弹出
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };
  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
      aria-busy={sceneLoadState === 'loading'}
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
    >
      <div ref={containerRef} className="absolute inset-0" />
      {sceneLoadState !== 'ready' && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#f5eee6] text-sm text-[#89745a]" role="status">
          {sceneLoadState === 'error' ? '场景加载失败，请刷新重试' : '场景加载中…'}
        </div>
      )}
    </div>
  );
};
