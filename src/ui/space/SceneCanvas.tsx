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
import { AltarTableLayer } from '../../pixi/layers/AltarTableLayer';
import { PropsLayer } from '../../pixi/layers/PropsLayer';
import { SmokeParticleEmitter } from '../../pixi/effects/SmokeParticleEmitter';
import { PixiEffects } from '../../pixi/effects/PixiEffects';
import {
  SceneItem,
  SceneItemId,
  LightingSettings,
  WallBackgroundStyle,
  FloorStyle,
  TableclothStyle,
  TableWoodStyle,
  FlowerType,
  VaseHitZone,
} from '../../pixi/../types';
import { sound } from '../../pixi/../utils/audio';

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
  const tableLayerRef = useRef<AltarTableLayer | null>(null);
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
    bgLayerRef.current?.render(width, height, lighting, wallStyle);

    // 0b. 地坪渲染：已回退至 DOM 层 FloorView（CSS 3D 真透视），此处不再绘制 Pixi 地坪

    // 1. 供案几何与桌布 (置于用户近前前景，开阔背景纵深)
    const forward = activeForwardRef.current;
    const { centerX, tableTopY, tableWidth } = getTableLayout(width, height, forward);
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
    }, [items, wallStyle, tableclothStyle, tableWoodStyle, tableLegWoodStyle, showTableRunner, lighting, getViewportDimensions, getTableLayout]);

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
      const tableLayer = new AltarTableLayer();
      const propsLayer = new PropsLayer(pipeline);

      const pixiEffects = new PixiEffects(pipeline.glowTexture!, pipeline.petalTextures);

      // 装载到 2.5D 深度视差容器中
      stage.backgroundLayer.addChild(bgLayer.container);
      stage.floorLayer.addChild(floorLayer.container);
      stage.tableLayer.addChild(tableLayer.container);
      // 案体照明层：叠在案体之上、道具之下
      stage.tableLayer.addChild(tableLayer.lightContainer);
      stage.propsLayer.addChild(propsLayer.container);
      stage.lightsLayer.addChild(pixiEffects.lightsContainer);
      stage.lightsLayer.addChild(pixiEffects.petalsContainer);

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
      tableLayerRef.current = tableLayer;
      propsLayerRef.current = propsLayer;
      pixiEffectsRef.current = pixiEffects;

      // 注册 Ticker 逐帧物理与动画更新 (只更新粒子物理与微风拂动)
      stage.app?.ticker.add((ticker) => {
        const delta = ticker.deltaTime;
        propsLayer.update(delta);
        pixiEffects.update(delta);
        // 案体光照随烛火真实位置与明灭状态实时衰减照亮
        tableLayerRef.current?.setCandleLights(propsLayer.getCandleLightSources());
      });

      isReadyRef.current = true;
      renderAll();
    };

    initEngine();

    const handleResize = () => {
      if (!stageRef.current || !containerRef.current) return;
      const { width, height } = getViewportDimensions();
      stageRef.current.resize(width, height);
      renderAll();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isMounted = false;
      isReadyRef.current = false;
      window.removeEventListener('resize', handleResize);
      bgLayerRef.current?.destroy();
      floorLayerRef.current?.destroy();
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
  }, [wallStyle, floorStyle, tableclothStyle, tableWoodStyle, tableLegWoodStyle, tableForward, showTableRunner, lighting.masterOn, lighting.timeOfDay, lighting.sunlightIntensity]);

  // 3. 道具状态轻量同步 (只更新道具，绝不重绘背景和地面)
  useEffect(() => {
    if (!isReadyRef.current) return;
    const { width, height } = viewportSizeRef.current;
    const { centerX, tableTopY, tableWidth } = getTableLayout(width, height, tableForward);
    propsLayerRef.current?.syncItems(items, centerX, tableTopY, tableWidth);
  }, [items, tableForward, getTableLayout]);

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
