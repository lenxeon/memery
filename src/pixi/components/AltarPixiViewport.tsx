/**
 * @file AltarPixiViewport.tsx
 * @description 祭祀与祈福主舞台 PixiJS 视口组件。
 * 全面接管场景环境、地面材质、红木供案与所有供品摆件的 2.5D WebGL 渲染，
 * 采用原生动态 Canvas 挂载与 StrictMode 防 context lost 保护机制。
 */
import React, { useEffect, useRef, useCallback } from 'react';
import { PixiStage } from '../engine/PixiStage';
import { TexturePipeline } from '../assets/TexturePipeline';
import { SceneBackgroundLayer } from '../layers/SceneBackgroundLayer';
import { FloorLayer } from '../layers/FloorLayer';
import { AltarTableLayer } from '../layers/AltarTableLayer';
import { PropsLayer } from '../layers/PropsLayer';
import { SmokeParticleEmitter } from '../effects/SmokeParticleEmitter';
import { PixiEffects } from '../effects/PixiEffects';
import {
  SceneItem,
  SceneItemId,
  LightingSettings,
  WallBackgroundStyle,
  FloorStyle,
  TableclothStyle,
  FlowerType,
} from '../../types';
import { sound } from '../../utils/audio';

export interface AltarPixiViewportProps {
  items: Record<SceneItemId, SceneItem>;
  lighting: LightingSettings;
  wallStyle: WallBackgroundStyle;
  floorStyle: FloorStyle;
  tableclothStyle: TableclothStyle;
  showTableRunner?: boolean;
  petalTrigger?: number;
  lastOfferedFlower?: FlowerType;
  onToggleItemLit?: (id: SceneItemId) => void;
  onToggleFruit?: (id: SceneItemId) => void;
  onVaseClick?: (id: SceneItemId) => void;
  onBowlHit?: () => void;
  onUpdateItemPosition?: (id: SceneItemId, pos: { x: number; y: number }) => void;
  className?: string;
}

export const AltarPixiViewport: React.FC<AltarPixiViewportProps> = ({
  items,
  lighting,
  wallStyle,
  floorStyle,
  tableclothStyle,
  showTableRunner = true,
  petalTrigger = 0,
  lastOfferedFlower = 'peonies',
  onToggleItemLit,
  onToggleFruit,
  onVaseClick,
  onBowlHit,
  onUpdateItemPosition,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<PixiStage | null>(null);
  const isReadyRef = useRef<boolean>(false);

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
    onUpdateItemPosition,
  });

  useEffect(() => {
    callbacksRef.current = {
      onToggleItemLit,
      onToggleFruit,
      onVaseClick,
      onBowlHit,
      onUpdateItemPosition,
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

  // 重绘全部图层
  const renderAll = useCallback(() => {
    if (!isReadyRef.current) return;
    const { width, height } = getViewportDimensions();
    viewportSizeRef.current = { width, height };

    // 1. 供案几何与桌布 (对标原版 560x160 黄金比例与底部边距)
    const centerX = width * 0.5;
    const tableWidth = Math.min(width - 32, 560);
    const tableHeight = tableWidth * (160 / 560);
    const tableBottomOffset = width < 640 ? 88 : 112;
    const tableTopY = height - tableBottomOffset - tableHeight * 0.71;
    tableLayerRef.current?.render(centerX, tableTopY, tableWidth, tableHeight, tableclothStyle, showTableRunner);

    // 2. 供品与道具 (1:1 视觉真理源比例：鲜花高挑雅致 265px，烛身纤巧 28x72px，烛火灵动 24px)
    propsLayerRef.current?.syncItems(items, centerX, tableTopY, tableWidth);
  }, [items, tableclothStyle, showTableRunner, getViewportDimensions]);

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
        onVaseClick: (id) => callbacksRef.current.onVaseClick?.(id),
        onUpdatePosition: (id, pos) => callbacksRef.current.onUpdateItemPosition?.(id, pos),
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
  }, [wallStyle, floorStyle, tableclothStyle, showTableRunner, lighting.masterOn, lighting.timeOfDay, lighting.sunlightIntensity]);

  // 3. 道具状态轻量同步 (只更新道具，绝不重绘背景和地面)
  useEffect(() => {
    if (!isReadyRef.current) return;
    const { width, height } = viewportSizeRef.current;
    const centerX = width * 0.5;
    const tableWidth = Math.min(width - 32, 560);
    const tableHeight = tableWidth * (160 / 560);
    const tableBottomOffset = width < 640 ? 88 : 112;
    const tableTopY = height - tableBottomOffset - tableHeight * 0.71;
    propsLayerRef.current?.syncItems(items, centerX, tableTopY, tableWidth);
  }, [items]);

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

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
};
