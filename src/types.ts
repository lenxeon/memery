export type TimeOfDay = 'day' | 'sunset' | 'night';

export interface Position2D {
  x: number; // offset in px from table center
  y: number; // vertical depth offset on table
}

export type FlowerType = 'peonies' | 'lilies' | 'lotus' | 'chrysanthemum' | 'roses';
export type FruitType = 'apples' | 'oranges' | 'peaches';

export type TableclothStyle = 
  | 'autumn_gold'       // 👑 秋香金 · 宫廷织锦 (如参考图2)
  | 'indigo_linen'      // 🌿 靛青蓝 · 禅意粗麻 (如参考图1)
  | 'cinnabar_red'      // 🏮 朱砂红 · 吉祥华彩
  | 'moonlight_white'   // 🌙 月魄白 · 出尘素绢
  | 'evergreen_pine'    // 🌲 黛螺绿 · 松柏长青
  | 'sandalwood_purple';// 🪻 紫檀金 · 沉香庄严

export type SceneItemId = string;

// Re-export game entity types
export * from './game/types/entity';

import { GameItemData } from './game/types/entity';

export interface SceneItem extends GameItemData {}

export interface LightingSettings {
  masterOn: boolean;
  timeOfDay: TimeOfDay;
  sunlightIntensity: number; // 0 to 1
  godRaysEnabled: boolean;
  godRaysIntensity: number; // 0 to 1
  sunAngle: number; // -25 to 25 deg
  candleGlowIntensity: number; // 0 to 1
  dustDensity: number; // 20 to 150
  windForce: number; // -1 to 1
}

export interface MemorialInfo {
  title: string;
  subtitle: string;
  photoUrl: string;
}
