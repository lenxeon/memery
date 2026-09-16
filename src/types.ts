/**
 * @file types.ts
 * @description 全局业务类型定义（供品类型、时段、纪念对象、桌布风格与背景墙风格等）。
 */
export type TimeOfDay = 'day' | 'sunset' | 'night';

export interface Position2D {
  x: number; // offset in px from table center
  y: number; // vertical depth offset on table
}

export type FlowerType = 'peonies' | 'lilies' | 'lotus' | 'chrysanthemum' | 'roses';
export type FruitType = 
  | 'apples' 
  | 'oranges' 
  | 'peaches' 
  | 'persimmons' 
  | 'citrons' 
  | 'grapes'
  | 'pomelos'
  | 'longans'
  | 'bananas'
  | 'kumquats'
  | 'dragonfruits'
  | 'cucumbers'
  | 'watermelons'
  | 'coconuts'
  | 'plums'
  | 'mangosteens'
  | 'pineapples'
  | 'pears';

export type { VaseStyle } from './components/offerings/flowers/vases';

export type TableclothStyle = 
  | 'autumn_gold'       // 👑 秋香金 · 宫廷织锦 (如参考图2)
  | 'indigo_linen'      // 🌿 靛青蓝 · 禅意粗麻 (如参考图1)
  | 'cinnabar_red'      // 🏮 朱砂红 · 吉祥华彩
  | 'moonlight_white'   // 🌙 月魄白 · 出尘素绢
  | 'evergreen_pine'    // 🌲 黛螺绿 · 松柏长青
  | 'sandalwood_purple';// 🪻 紫檀金 · 沉香庄严

export type WallBackgroundStyle = 
  | 'classic_dawn'    // 🏛️ 1. 晴岚映曜 · 晨光沐影 (欧式经典砂岩暖拱景窗 · 晨岚金辉丁达尔光)
  | 'heritage_wood'   // 🏮 2. 暮林晚钟 · 沉香花格 (中式紫檀老木雕花木格扇 · 透光手工云龙皮纸影壁)
  | 'royal_drape'     // 🎭 3. 华彩生光 · 皇家帷幔 (深绯皇家丝绒帷幔束以金绳流苏 · 暖金华彩透光)
  | 'bronze_mirror'   // 🌕 4. 圆满如月 · 铜镜华光 (古法镏金大圆铜镜莲纹铸边 · 暖辉圆满映照)
  | 'brick_screen'    // 🏯 5. 古朴苍然 · 青砖影壁 (传统青砖雕花影壁如意寿纹 · 蝠纹祖制典雅)
  | 'lotus_mandorla'; // 🪷 6. 宝相庄严 · 莲台佛境 (盛唐泥金宝相莲花曼陀罗光背 · 佛光福佑庄严)

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

export type FloorStyle = 
  | 'hinoki_wood'      // 日式浅暖原木 (图1 参考风格 · 晴岚暖木)
  | 'walnut_plank'     // 自然胡桃宽板 (图3 参考风格 · 檀影温润)
  | 'herringbone_wood' // 暖木人字拼花 (图2 参考风格 · 经典人字拼)
  | 'wood_planks'      // 兼容别名
  | 'zen_tatami'       // 禅意素席榻榻米 (图1 茶室风格 · 幽香素席)
  | 'marble_tile';     // 汉白玉大理石 (如意方砖)

export interface FloorStyleInfo {
  id: FloorStyle;
  name: string;
  poeticTitle: string;
  desc: string;
  iconText: string;
}

export type BgmTrackId = 'singing_bowl' | 'bamboo_wind' | 'temple_bell' | 'pentatonic_zither';

export interface BgmTrackInfo {
  id: BgmTrackId;
  name: string;
  poeticName: string;
  instrument: string;
  desc: string;
  icon: string;
}
