/**
 * @file entity.ts
 * @description 游戏实体（ItemEntity）、物品数据模型与渲染上下文类型定义。
 */
/**
 * Game Entity & Lifecycle Architecture - Core Types
 */

import React from 'react';
import { Position2D, LightingSettings, FlowerType, FruitType } from '../../types';

export type LifecycleStage = 
  | 'budding'    // 含苞待放 / 初献
  | 'blooming'   // 盛开绽放 / 最美花期
  | 'wilting'    // 渐枯微凋 / 花瓣低垂枯黄
  | 'withered'   // 枯萎凋零 / 花瓣随风脱落
  | 'expired';   // 燃尽/散尽 / 自供案上自然消失

export interface ItemLifecycle {
  stage: LifecycleStage;
  age: number;             // 当前生命经历时间 (秒)
  duration: number;        // 总生命周期时长 (秒)
  decayRate: number;       // 衰减流速倍率 (1.0 = 标准)
  health: number;          // 生命健康度 (1.0 盛开 -> 0.0 凋亡)
  autoDespawn?: boolean;   // 是否在 expired 时自动从案面撤下消失
}

export type EntityTypeId = 
  | 'flower'
  | 'vase'
  | 'candle'
  | 'censer'
  | 'fruit'
  | 'tea_cups'
  | 'singing_bowl';

export interface GameItemData {
  id: string;
  type: EntityTypeId;
  name: string;
  position: Position2D;
  scale?: number;
  isLit?: boolean;
  flowerType?: FlowerType;
  fruitType?: FruitType;
  lifecycle?: ItemLifecycle;
  metadata?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface WorldContext {
  deltaSec: number;
  timeScale: number;
  lighting: LightingSettings;
  soundEnabled: boolean;
}

export interface EntityShadowProps {
  size: number;
  spread: number;
}

export interface EntityRenderProps {
  item: GameItemData;
  lighting: LightingSettings;
  isDragging: boolean;
  onInteract?: (action: string, payload?: unknown) => void;
  onRemove?: () => void;
}

export interface EntityEvent {
  type: 'stage_change' | 'despawn' | 'petal_drop' | 'sound';
  entityId: string;
  payload?: unknown;
}

export interface ItemTickResult<T extends GameItemData = GameItemData> {
  nextItem: T | null; // null 表示实体已消亡，需从案面清除
  events?: EntityEvent[];
}

export interface ItemEntityController<T extends GameItemData = GameItemData> {
  readonly type: EntityTypeId;

  // 工厂创建实例
  createInstance(params: Partial<T>): T;

  // 帧步进生命周期
  onTick(item: T, world: WorldContext): ItemTickResult<T>;

  // 实体交互行为
  onInteract(item: T, action: string, world: WorldContext, payload?: unknown): T;

  // 获取桌面贴合阴影属性
  getShadowProps(item: T, tableScale: number): EntityShadowProps;

  // 实体多态渲染
  render(props: EntityRenderProps): React.ReactNode;
}
