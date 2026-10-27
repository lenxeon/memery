/**
 * @file types.ts
 * @description 全局业务类型定义（供品类型、时段、纪念对象、桌布风格与背景墙风格等）。
 */
export type TimeOfDay = 'day' | 'sunset' | 'night';

/** 天色时辰模式：跟随系统时间自动推算 / 手动固定某一时辰 */
export type TimeMode = 'system' | 'fixed';

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
  | 'daisies'
  // 东方花谱扩展：枝骨春信
  | 'wintersweet'
  | 'magnolia'
  | 'peach_blossoms'
  | 'apricot_blossoms'
  | 'pear_blossoms'
  | 'crabapple_blossoms'
  // 富贵重瓣
  | 'camellias'
  | 'azaleas'
  | 'kerria'
  | 'hibiscus_mutabilis'
  // 清供高茎
  | 'irises'
  | 'clivia'
  // 垂蔓串花
  | 'wisteria'
  | 'trumpet_creeper'
  | 'morning_glories'
  | 'honeysuckle'
  | 'winter_jasmine'
  // 圆冠团簇
  | 'osmanthus'
  | 'crape_myrtle'
  | 'globe_amaranth'
  // 庭院清芳
  | 'gardenias'
  | 'jasmine'
  | 'balloon_flowers'
  | 'daylilies'
  | 'hostas'
  | 'impatiens'
  | 'hollyhocks'
  // 奇姿华彩
  | 'pomegranate_blossoms'
  | 'chinese_hibiscus'
  | 'cockscomb'
  | 'poppies'
  | 'epiphyllum'
  | 'spider_lilies'
  | 'redbuds';
/** 花瓶点击命中分区：花冠区换花材，瓶身区换器型 */
export type VaseHitZone = 'flowers' | 'vase';

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

/**
 * 花器（花瓶）形制。
 * 类型源头定义在全局协议层，渲染域（pixi）从此处引用，保证依赖方向单一。
 * 具体形制的图形实现与元数据仍位于 src/pixi/assets/templates/flowers/vases。
 */
export type VaseStyle =
  // ── 基础现代高阶设计感系列 ──
  | 'ribbed_fluted_white'    // 1. 极细百褶密棱直筒瓶
  | 'organic_twist_cream'    // 2. 流光旋风波浪奶油瓶
  | 'organic_twist_rose'     // 3. 落樱粉波浪旋风瓶
  | 'chiseled_stone_gray'    // 4. 侘寂玄灰砂岩横纹瓶
  | 'fluted_trapezoid_mini'  // 5. 折线圆台百褶短瓶
  | 'faceted_gem_prism'      // 6. 钻石晶体多面切角瓶
  | 'melon_lobed_celadon'    // 7. 海棠瓜棱秀颈素瓶
  | 'minimal_drop_swan'      // 8. 现代极简水滴天鹅瓶
  // ── 奇特造型与手作肌理系列 ──
  | 'pinched_clay_ruffle'    // 9. 手作泥捏翻边陶瓶
  | 'pearlescent_turbine'    // 10. 银曜珠光螺旋涡轮瓶
  | 'twisted_helix_tower'    // 11. 极简莫兰迪旋转扭扭塔瓶
  | 'gradient_sand_volcano'  // 12. 天青流沙渐变圆锥砂陶瓶
  // ── 当代东方极简原创系列 ──
  | 'moon_white_orb'         // 13. 月白玉壶春瓶
  | 'ink_black_meiping'      // 14. 玄墨梅瓶
  | 'ru_celadon_cong'        // 15. 汝青琮影瓶
  | 'tea_white_shoulder'     // 16. 茶白贯耳方瓶
  // ── 历史器物神韵再设计系列 ──
  | 'tang_sancai_phoenix'    // 17. 唐彩凤首曲柄瓶
  | 'shang_bronze_gu'        // 18. 商青铜觚花器
  | 'warring_turquoise_fang' // 19. 战国错金绿松石云纹钫
  | 'blue_red_double_gourd'  // 20. 青花釉里红双生葫芦瓶
  // ── 西周国宝重器神韵系列 ──
  | 'western_zhou_he_zun'    // 21. 宅兹中国何尊花器
  | 'western_zhou_li_gui'    // 22. 克商利簋方座花器
  | 'western_zhou_elephant'  // 23. 西周凤鸟纹象尊花器
  // ── 秦制器物神韵系列 ──
  | 'qin_chariot_canopy'     // 24. 秦陵铜车马伞盖瓶
  | 'qin_painted_armor'      // 25. 秦彩绘铠甲俑瓶
  | 'qin_bronze_crane'       // 26. 秦陵青铜鹤曲颈瓶
  // ── 隋代南青北白器物神韵系列 ──
  | 'sui_double_dragon_linked' // 27. 隋月白双龙联腹传瓶
  | 'sui_lotus_panmouth'       // 28. 隋碧釉莲瓣四系盘口瓶
  | 'sui_white_chicken_head'   // 29. 隋凝脂白瓷鸡首壶
  // ── 唐代名窑器物神韵系列 ──
  | 'tang_secret_celadon_octagonal' // 30. 唐越窑秘色八棱净瓶
  | 'tang_lushan_splashed_glaze'    // 31. 唐鲁山月斑花釉壶
  | 'tang_changsha_bird_ewer'       // 32. 唐长沙窑褐绿彩花鸟壶
  // ── 北宋名窑器物神韵系列 ──
  | 'song_jun_moon_white'           // 33. 北宋钧窑月白紫霞长颈瓶
  | 'song_yaozhou_carved_peony'     // 34. 北宋耀州青釉刻牡丹瓶
  | 'song_cizhou_black_carved_yuhuchun' // 35. 北宋磁州白地剔黑玉壶春瓶
  // ── 明代名窑与珐琅器神韵系列 ──
  | 'ming_xuande_lobed_blue_white' // 36. 宣德青花灵芝纹莲瓣瓜棱瓶
  | 'ming_zhengde_ring_handle_blue_white' // 37. 正德青花缠枝莲双耳环瓶
  | 'ming_jingtai_cloisonne_lotus_bottle' // 38. 景泰蓝掐丝缠枝莲羽纹瓶
  // ── 向下兼容历史别名 ──
  | 'warm_white_plain'
  | 'painted_iris'
  | 'fluted_origami'
  | 'faceted_prism'
  | 'song_mallet'
  | 'willow_guanyin'
  | 'archaic_ears'
  | 'classic_meiping'
  | 'painted_peony'
  | 'painted_plum'
  | 'qinghua_lotus'
  | 'royal_blue_gold'
  | 'mutton_jade_ears'
  | 'celadon_ru';

export type TableclothStyle = 
  | 'autumn_gold'       // 👑 秋香金 · 宫廷织锦 (如参考图2)
  | 'indigo_linen'      // 🌿 靛青蓝 · 禅意粗麻 (如参考图1)
  | 'cinnabar_red'      // 🏮 朱砂红 · 吉祥华彩
  | 'moonlight_white'   // 🌙 月魄白 · 出尘素绢
  | 'evergreen_pine'    // 🌲 黛螺绿 · 松柏长青
  | 'sandalwood_purple';// 🪻 紫檀金 · 沉香庄严

/** @deprecated Theme IDs are loaded from the public theme catalog at runtime. */
export type WallBackgroundStyle = string;

export type SceneItemId = string;

// Re-export game entity types
export * from './types/entity';
export * from './types/sceneTheme';

import { GameItemData } from './types/entity';

export interface SceneItem extends GameItemData {}

export interface LightingSettings {
  masterOn: boolean;
  timeOfDay: TimeOfDay;
  /** 时辰模式，缺省按 system（跟随系统）处理 */
  timeMode?: TimeMode;
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

export type TableWoodStyle = 
  | 'white_oak'   // 白橡木 (清素淡雅 · 自然直纹)
  | 'huanghuali'  // 黄花梨 (明式名木 · 行云流水鬼脸纹)
  | 'cherry'      // 樱桃木 (温润暖红 · 致密丝质)
  | 'walnut';     // 胡桃木 (沉稳深邃 · 经典山纹)

export interface TableWoodStyleInfo {
  id: TableWoodStyle;
  name: string;
  poeticTitle: string;
  desc: string;
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

/**
 * 专项审计展台类别：名花 / 花器 / 案台。
 * 名花与花器已改为「按注册表全量目录、每组 5 件翻页」的动态展台
 * （见 data/auditCatalog.ts），不再有写死的分组枚举。
 */
export type AuditCategory = 'flowers' | 'vases' | 'table';

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
