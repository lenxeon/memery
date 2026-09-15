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

export type WallBackgroundStyle = 
  | 'spring_sakura'     // 🌸 1. 春 · 樱粉细语 (淡粉白色调拱形窗，窗外飘落樱花，粉白奶油系)
  | 'summer_firefly'    // 🌌 2. 夏 · 星夜流萤 (深蓝夜空金框拱窗，繁星明月，飞舞流萤微光粒子)
  | 'autumn_maple'      // 🍁 3. 秋 · 暖阳枫语 (米金拱形窗，窗外枫叶飘落，向日葵金菊秋日暖阳)
  | 'winter_snow'       // ❄️ 4. 冬 · 静雪围炉 (窗外落雪，窗格霜花冰纹，透出壁炉暖火微光)
  | 'zen_bamboo'        // 🎋 5. 禅 · 竹林月门 (正圆中式月洞门，水墨竹林远山，留白东方禅意)
  | 'classical_lattice' // 🏮 6. 古典 · 朱漆花窗 (中式木质花格窗，冰裂回纹万字棂格，朱红金漆)
  | 'modern_cream';     // 🍦 7. 现代 · 极简奶油 (无窗棂单一奶油拱形色块，莫兰迪极简留白)

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
