/**
 * @file SceneCanvas.tsx
 * @description 祭祀与祈福主舞台 PixiJS 视口组件。
 * 全面接管场景环境、地面材质、红木供案与所有供品摆件的 2.5D WebGL 渲染，
 * 采用原生动态 Canvas 挂载与 StrictMode 防 context lost 保护机制。
 */
import React, { useEffect, useRef, useCallback } from 'react';
import { PixiStage } from '../../pixi/engine/PixiStage';
import { TexturePipeline } from '../../pixi/assets/TexturePipeline';
import { SceneBackgroundLayer } from '../../pixi/layers/SceneBackgroundLayer';
import { FloorLayer } from '../../pixi/layers/FloorLayer';
import { GodRaysLayer } from '../../pixi/layers/GodRaysLayer';
import { DustMotesLayer } from '../../pixi/layers/DustMotesLayer';
import { AltarTableLayer } from '../../pixi/layers/AltarTableLayer';
import { MemorialPortraitLayer, StageInsets } from '../../pixi/layers/MemorialPortraitLayer';
import { PropsLayer } from '../../pixi/layers/PropsLayer';
import { SmokeParticleEmitter } from '../../pixi/effects/SmokeParticleEmitter';
import { PixiEffects } from '../../pixi/effects/PixiEffects';
import {
  SceneItem,
  SceneItemId,
  LightingSettings,
  MemorialInfo,
  WallBackgroundStyle,
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

/** 未量测到舞台内缩时的兜底值（近似顶栏 + 底栏高度） */
const DEFAULT_STAGE_INSETS: StageInsets = { top: 64, bottom: 96 };

export interface SceneCanvasProps {
  items: Record<SceneItemId, SceneItem>;
  lighting: LightingSettings;
  wallStyle: WallBackgroundStyle;
  floorStyle: FloorStyle;
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
  wallStyle,
  floorStyle,
  tableclothStyle,
  tableWoodStyle = 'walnut',
  tableLegWoodStyle = 'walnut',
  tableForward = 0,
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

  // 供案前后进深：拖动过程中本地即时生效，松手后提交给外部状态
  const activeForwardRef = useRef<number>(tableForward);
  const isDraggingTableRef = useRef<boolean>(false);
  const dragStartForwardRef = useRef<number>(tableForward);

  // 场景图层实例
  const bgLayerRef = useRef<SceneBackgroundLayer | null>(null);
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
    // 供案横向长度（对标经典设计稿，适度舒展且两侧通透留白）+ 前后进深缩放
    const depthScale = 1 + forward * 0.07;
    let tableWidth = Math.min(width - 32, width < 640 ? 540 : 620) * depthScale;
    tableWidth = Math.min(tableWidth, width - 20);
    const tableHeight = tableWidth * (166 / 560);
    // 台面前沿到桌脚底部的垂挂高度（在 560:166 视口中为 96 单位）
    const tableHangingHeight = tableWidth * (96 / 560);
    // 底部留出开阔地板透视余量：前移收窄（贴近镜头），后移加宽（退向纵深）
    const tableBottomOffset = (width < 640 ? 44 : 58) - forward * 24;
    const tableTopY = height - tableBottomOffset - tableHangingHeight;
    return { centerX, tableTopY, tableWidth, tableHeight };
  }, []);

  // 重绘全部图层
  const renderAll = useCallback(() => {
    if (!isReadyRef.current) return;
    const { width, height } = getViewportDimensions();
    viewportSizeRef.current = { width, height };

    // 0. 远景背景墙（纯 Pixi 坐标系渲染，与供案共用同一 centerX，杜绝 DOM/CSS 布局错位）
    // TEMP_DEBUG: 临时关闭墙面渲染，仅看地面
    if (!DISABLE_WALL) {
      bgLayerRef.current?.render(width, height, lighting, wallStyle);
    }
    if (bgLayerRef.current) bgLayerRef.current.container.visible = !DISABLE_WALL;

    // 0b. 2.5D 透视地坪（PerspectiveMesh 复刻 CSS 3D 投影，位于墙层之上）
    const pipeline = TexturePipeline.getInstance();
    floorLayerRef.current?.render(
      width,
      height,
      floorStyle,
      pipeline.woodPlankTexture,
      pipeline.marbleTileTexture,
      lighting
    );

    // 0c. 丁达尔光束（Pixi 加色混合，随 lightsLayer 视差一同摆动）
    godRaysLayerRef.current?.render(width, height, lighting);

    // 0d. 光束中的浮尘（与场景共用 Ticker，密度/日照/风力同光照联动）
    dustLayerRef.current?.layout(width, height);
    dustLayerRef.current?.setOptions({
      density: lighting.dustDensity,
      sunlightIntensity: lighting.masterOn ? lighting.sunlightIntensity : 0.15,
      windForce: lighting.windForce,
      timeOfDay: lighting.timeOfDay,
    });

    // 0e. 遗像牌位：Pixi 坐标系内定位（舞台区 18% / 20% 处，夹在踢脚线之上）
    if (portraitLayerRef.current) {
      portraitLayerRef.current.layout(width, height, stageInsets ?? DEFAULT_STAGE_INSETS, wallStyle);
      portraitLayerRef.current.setLighting(
        lighting.masterOn ? lighting.sunlightIntensity : 0.2,
        lighting.timeOfDay
      );
    }

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
      // 地坪水平灭点基线与 FloorLayer 保持一致 (视口下 38%)
      horizonY: height * 0.62,
    });

    // 1b. 同步供案台面灯光暗化
    if (tableLayerRef.current) tableLayerRef.current.setLighting(lighting);

    // 2. 供品与道具 (1:1 同步置于供案台面)
    propsLayerRef.current?.syncItems(items, centerX, tableTopY, tableWidth);
    }, [items, wallStyle, floorStyle, tableclothStyle, tableWoodStyle, tableLegWoodStyle, showTableRunner, lighting, stageInsets, getViewportDimensions, getTableLayout]);

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

      await stage.init({ container, width, height });
      if (!isMounted) {
        stage.destroy();
        return;
      }

      // 初始化纹理管线
      const pipeline = TexturePipeline.getInstance();
      await pipeline.init();

      // 构建分层与特效系统
      const bgLayer = new SceneBackgroundLayer();
      const floorLayer = new FloorLayer();
      const godRaysLayer = new GodRaysLayer();
      const dustLayer = new DustMotesLayer();
      const tableLayer = new AltarTableLayer();
      const portraitLayer = new MemorialPortraitLayer();
      const propsLayer = new PropsLayer(pipeline);

      const pixiEffects = new PixiEffects(pipeline.glowTexture!, pipeline.petalTextures);

      // 装载到 2.5D 深度视差容器中
      stage.backgroundLayer.addChild(bgLayer.container);
      stage.portraitLayer.addChild(portraitLayer.container);
      stage.floorLayer.addChild(floorLayer.container);
      stage.tableLayer.addChild(tableLayer.container);
      // 案体照明层：叠在案体之上、道具之下
      stage.tableLayer.addChild(tableLayer.lightContainer);
      stage.propsLayer.addChild(propsLayer.container);
      // 前景气光层次：光束（远）→ 烛焰光晕 → 落瓣 → 浮尘（最近）
      stage.lightsLayer.addChild(godRaysLayer.container);
      stage.lightsLayer.addChild(pixiEffects.lightsContainer);
      stage.lightsLayer.addChild(pixiEffects.petalsContainer);
      stage.lightsLayer.addChild(dustLayer.container);

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
      if (memorial) portraitLayer.setInfo(memorial);

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
        tableLayerRef.current?.setCandleLights(propsLayer.getCandleLightSources());
      });

      isReadyRef.current = true;
      renderAll();

      // 地坪贴图为异步 Image 加载，落地后补一次重绘（否则首屏仅显示兜底底色）
      window.setTimeout(() => {
        if (isMounted) renderAllRef.current();
      }, 500);
    };

    initEngine();

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
    wallStyle,
    floorStyle,
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

  // 5. 鼠标与触摸视差交互
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!stageRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    stageRef.current.setParallaxInput(nx, ny);
  };

  const handleMouseLeave = () => {
    if (!stageRef.current) return;
    stageRef.current.setParallaxInput(0, 0);
  };

  // 禁用场景内浏览器原生右键/长按菜单，避免拖放供品时误弹出
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };
  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
    />
  );
};
