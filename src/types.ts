/**
 * @file types.ts
 * @description 全局业务类型定义（供品类型、时段、纪念对象、桌布风格与背景墙风格等）。
 */
export type TimeOfDay = 'day' | 'sunset' | 'night';

export interface Position2D {
  x: number; // offset in px from table center
  y: number; // vertical depth offset on table
}

export type FlowerType = 
  | 'peonies' 
  | 'lilies' 
  | 'lotus' 
  | 'chrysanthemum' 
  | 'roses'
  | 'plum_blossoms'
  | 'sunflowers'
  | 'carnations'
  | 'calla_lilies'
  | 'tulips'
  | 'narcissus'
  | 'lily_of_valley'
  | 'orchids'
  | 'hydrangeas'
  | 'daisies';
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

export type { VaseStyle } from './pixi/assets/templates/flowers/vases';

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
export * from './types/entity';

import { GameItemData } from './types/entity';

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

export type AuditCategory = 'flowers' | 'vases';
export type VaseAuditGroup = 'new_unique' | 'designer_twist';
export type FlowerAuditGroup =
  | 'flowers_tier1_all'   // 🌟 第一梯队 10 花齐放同台
  | 'flowers_tier1_a'     // 🌺 第一梯队 A 组 (前5名卉：梅花/向日葵/康乃馨/马蹄莲/郁金香)
  | 'flowers_tier1_b'     // 🪷 第一梯队 B 组 (后5名卉：水仙/铃兰/蝴蝶兰/绣球/雏菊)
  | 'flowers_classic'     // 💮 经典传承 5 供 (牡丹/百合/清莲/白菊/玫瑰)
  | 'flowers_bouquets';   // 💐 案前敬献花束平铺对比

export type AuditGroup = VaseAuditGroup | FlowerAuditGroup;

export type LoginMethod = 'phone' | 'wechat' | 'apple';

export interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  loginType: LoginMethod;
  phoneNumber?: string;
  isSubscribed?: boolean;
  guardianDays: number;
  blessingCount: number;
  createdAt: number;
}

export interface MemorialHallItem {
  id: string;
  name: string;             // 先人姓名，如"王秀英"
  title: string;            // 堂号，如"慈颜常驻 · 永沐春风"
  relationship: string;     // 关系，如"祖母" / "慈父" / "爱宠" / "先师"
  birthDate?: string;       // 生卒日期，如"1936 - 2021"
  photoUrl: string;         // 肖像相片
  guardianDays: number;     // 守护天数
  blessingCount: number;    // 累计祈福/香火次数
  isOwner: boolean;         // 是否是我创建的
  creatorName?: string;     // 筹建人（如"由堂哥 张伟 筹建"）
  lastVisitedAt?: number;   // 上次瞻仰时间
  createdAt: number;
}
