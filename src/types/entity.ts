/**
 * @file entity.ts
 * @description 供品道具数据模型、生命周期与上下文类型定义。
 */
import { Position2D, LightingSettings, FlowerType, FruitType } from '../types';

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

export interface EntityEvent {
  type: 'stage_change' | 'despawn' | 'petal_drop' | 'sound';
  entityId: string;
  payload?: unknown;
}
