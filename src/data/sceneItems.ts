/**
 * @file sceneItems.ts
 * @description 馆空间（堂轩）供案陈设的纯数据层：摆件工厂、初始陈设、审计展台与常量字典。
 *
 * 本模块零 UI 依赖（仅引用类型与一个纯函数工具），可独立单测：
 * 输入确定的参数即得到确定的 SceneItem 集合，不含任何 React 状态与副作用。
 */
import {
  SceneItem,
  SceneItemId,
  LightingSettings,
  MemorialInfo,
  MemorialHallItem,
  FlowerType,
  FruitType,
  TableWoodStyle,
  AuditCategory,
} from '../types';
import type { VaseStyle } from '../pixi';
import {
  AUDIT_FLOWER_CATALOG,
  AUDIT_VASE_CATALOG,
  formatAuditEntryLabel,
  getAuditPageEntries,
} from './auditCatalog';

/* ── 摆件构造器 ───────────────────────────────────────────────────────────── */

export const createVaseItem = (
  id: string,
  flowerType: FlowerType | 'none',
  position: { x: number; y: number },
  vaseStyle: VaseStyle = 'warm_white_plain',
  name: string = '花瓶',
  scale: number = 0.95
): SceneItem => ({
  id,
  type: 'vase',
  name,
  flowerType: flowerType as FlowerType,
  vaseStyle,
  position,
  scale,
});

export const createBouquetItem = (
  flowerType: FlowerType,
  position: { x: number; y: number },
  options?: { id?: string; name?: string }
): SceneItem => ({
  id: options?.id || 'bouquet',
  type: 'flower',
  name: options?.name || `敬献 · ${flowerType}`,
  flowerType,
  position,
  scale: 0.95,
});

/* ── 名目字典 ────────────────────────────────────────────────────────────── */

/** 点击花冠时循环切换的花材顺序 */
export const FLOWER_CYCLE_ORDER: FlowerType[] = [
  'peonies',
  'lilies',
  'lotus',
  'chrysanthemum',
  'roses',
  'plum_blossoms',
  'sunflowers',
  'carnations',
  'calla_lilies',
  'tulips',
  'narcissus',
  'lily_of_valley',
  'orchids',
  'hydrangeas',
  'daisies',
  'wintersweet',
  'magnolia',
  'peach_blossoms',
  'apricot_blossoms',
  'pear_blossoms',
  'crabapple_blossoms',
  'camellias',
  'azaleas',
  'kerria',
  'hibiscus_mutabilis',
  'irises',
  'clivia',
  'wisteria',
  'trumpet_creeper',
  'morning_glories',
  'honeysuckle',
  'winter_jasmine',
  'osmanthus',
  'crape_myrtle',
  'globe_amaranth',
  'gardenias',
  'jasmine',
  'balloon_flowers',
  'daylilies',
  'hostas',
  'impatiens',
  'hollyhocks',
  'pomegranate_blossoms',
  'chinese_hibiscus',
  'cockscomb',
  'poppies',
  'epiphyllum',
  'spider_lilies',
  'redbuds',
];

/** 点击果盘时循环切换的果品顺序 */
export const FRUIT_CYCLE_ORDER: FruitType[] = [
  'apples',
  'oranges',
  'peaches',
  'persimmons',
  'citrons',
  'grapes',
  'pomelos',
  'longans',
  'bananas',
  'kumquats',
  'dragonfruits',
  'cucumbers',
  'watermelons',
  'coconuts',
  'plums',
  'mangosteens',
  'pineapples',
  'pears',
];

/** 点击瓶身时循环切换的器形顺序 */
export const VASE_STYLE_CYCLE_ORDER: VaseStyle[] = [
  'warm_white_plain',
  'painted_iris',
  'painted_peony',
  'painted_plum',
  'qinghua_lotus',
  'royal_blue_gold',
  'mutton_jade_ears',
  'celadon_ru',
];

export const FLOWER_DISPLAY_NAMES: Record<FlowerType, string> = {
  peonies: '富贵牡丹',
  lilies: '纯白百合',
  lotus: '出尘净莲',
  chrysanthemum: '岁寒金菊',
  roses: '长情玫瑰',
  plum_blossoms: '傲霜冷香白梅',
  sunflowers: '金色向阳',
  carnations: '慈孝康乃馨',
  calla_lilies: '圣洁马蹄莲',
  tulips: '典雅郁金香',
  narcissus: '凌波水仙',
  lily_of_valley: '如意铃兰',
  orchids: '幽谷素兰',
  hydrangeas: '团圆绣球',
  daisies: '清纯雏菊',
  wintersweet: '凌寒腊梅',
  magnolia: '玉盏玉兰',
  peach_blossoms: '灼灼桃花',
  apricot_blossoms: '春雨杏花',
  pear_blossoms: '晴雪梨花',
  crabapple_blossoms: '垂丝海棠',
  camellias: '丹华山茶',
  azaleas: '映山杜鹃',
  kerria: '金玉棣棠',
  hibiscus_mutabilis: '照水芙蓉',
  irises: '蝶影鸢尾',
  clivia: '丹霞君子兰',
  wisteria: '垂云紫藤',
  trumpet_creeper: '凌云霄花',
  morning_glories: '晨露牵牛',
  honeysuckle: '金银忍冬',
  winter_jasmine: '金英迎春',
  osmanthus: '月宫金桂',
  crape_myrtle: '百日紫薇',
  globe_amaranth: '千日红',
  gardenias: '玉雪栀子',
  jasmine: '素馨茉莉',
  balloon_flowers: '青蓝桔梗',
  daylilies: '忘忧萱草',
  hostas: '月下玉簪',
  impatiens: '染甲凤仙',
  hollyhocks: '锦塔蜀葵',
  pomegranate_blossoms: '榴火石榴花',
  chinese_hibiscus: '丹心朱槿',
  cockscomb: '锦冠鸡冠花',
  poppies: '绛绡虞美人',
  epiphyllum: '月下昙花',
  spider_lilies: '赤焰彼岸花',
  redbuds: '同心紫荆',
};

export const FRUIT_DISPLAY_NAMES: Record<FruitType, string> = {
  apples: '平安红富士苹果',
  oranges: '吉祥金蜜柑',
  peaches: '福寿仙桃',
  persimmons: '如意熟丹柿',
  citrons: '禅意佛手柑',
  grapes: '阳光玫瑰青提',
  pomelos: '黄金蜜柚',
  longans: '富贵龙眼',
  bananas: '招财金蕉',
  kumquats: '翡翠青桔',
  dragonfruits: '红运火龙果',
  cucumbers: '翠玉黄瓜',
  watermelons: '盛夏西瓜',
  coconuts: '南国椰子',
  plums: '金玉蜂糖李',
  mangosteens: '果后山竹',
  pineapples: '祥瑞凤梨',
  pears: '金秋秋月梨',
};

/** 供案 4 款原木材质选项（台面与腿足构架共用） */
export const TABLE_WOOD_OPTIONS = [
  { id: 'walnut', name: '暖栗胡桃', color: '#452618', border: '#7c3f25' },
  { id: 'huanghuali', name: '明式黄花梨', color: '#7a421b', border: '#b4602a' },
  { id: 'cherry', name: '典雅樱桃', color: '#6a2f20', border: '#9a4731' },
  { id: 'white_oak', name: '素雅白橡', color: '#8c6e54', border: '#b8997a' },
] as const;

export type TableWoodOptionId = (typeof TABLE_WOOD_OPTIONS)[number]['id'];

/* ── 陈设 ────────────────────────────────────────────────────────────────── */

/** 供案常规陈设（五供齐备：香、花、灯、水、果） */
export const buildStandardItems = (): Record<SceneItemId, SceneItem> => ({
  vase_left: createVaseItem('vase_left', 'peonies', { x: -190, y: -39 }, 'warm_white_plain', '富贵牡丹花瓶 (左)'),
  vase_right: createVaseItem('vase_right', 'lilies', { x: 190, y: -39 }, 'painted_iris', '纯洁百合花瓶 (右)'),
  candle_left: {
    id: 'candle_left',
    type: 'candle',
    name: '长明红烛 (左)',
    position: { x: -95, y: -28 },
    isLit: true,
  },
  candle_right: {
    id: 'candle_right',
    type: 'candle',
    name: '长明红烛 (右)',
    position: { x: 95, y: -28 },
    isLit: true,
  },
  censer: {
    id: 'censer',
    type: 'censer',
    name: '青瓷清香香炉 (中)',
    position: { x: 0, y: -37 },
    isLit: true,
  },
  fruit_left: {
    id: 'fruit_left',
    type: 'fruit',
    name: '平安红富士苹果盘 (左)',
    fruitType: 'apples',
    position: { x: -150, y: -16 },
  },
  fruit_right: {
    id: 'fruit_right',
    type: 'fruit',
    name: '吉祥砂糖橘盘 (右)',
    fruitType: 'oranges',
    position: { x: 150, y: -16 },
  },
  tea_cups: {
    id: 'tea_cups',
    type: 'tea_cups',
    name: '虔诚敬茶三盏',
    position: { x: 0, y: -12 },
  },
});

export type { AuditCategory };

/** 展台 5 席的横向落位（席距 154，两侧靠前、中间靠后，形成浅弧形避免花冠互压） */
const AUDIT_SLOTS: { x: number; y: number }[] = [
  { x: -308, y: 6 },
  { x: -154, y: -2 },
  { x: 0, y: -8 },
  { x: 154, y: -2 },
  { x: 308, y: 6 },
];

/** 展台条目的稳定 id（5 席固定，翻页只换内容不换席位） */
const auditSlotId = (slot: number): SceneItemId => `vase_audit_${slot + 1}`;

/** 1. 雅瓷花器形制专项审计（按目录每页 5 款，新增形制自动入列） */
export const buildAuditVaseItems = (
  page: number = 0,
  withFlowers: boolean = true
): Record<SceneItemId, SceneItem> => {
  const entries = getAuditPageEntries('vases', page);
  const flowers = AUDIT_FLOWER_CATALOG;

  const items: Record<SceneItemId, SceneItem> = {};
  entries.forEach((entry, slot) => {
    // 插花比对时，按全局序号轮转取花，保证每只瓶配到的花都不同
    const flower = flowers.length ? flowers[entry.no % flowers.length].id : 'peonies';
    items[auditSlotId(slot)] = createVaseItem(
      auditSlotId(slot),
      withFlowers ? (flower as FlowerType) : 'none',
      AUDIT_SLOTS[slot],
      entry.id as VaseStyle,
      formatAuditEntryLabel(entry),
      0.84
    );
  });
  return items;
};

/** 2. 🌸 名花形神与枯荣生命周期专项审计（按目录每页 5 款，新增花材自动入列） */
export const buildAuditFlowerItems = (
  page: number = 0,
  decayHealth: number = 1.0
): Record<SceneItemId, SceneItem> => {
  const lifecycle = {
    stage: (decayHealth < 0.2 ? 'withered' : decayHealth < 0.7 ? 'decaying' : 'blooming') as any,
    age: (1 - decayHealth) * 200,
    duration: 240,
    decayRate: 1.0,
    health: decayHealth,
    autoDespawn: false,
  };

  const entries = getAuditPageEntries('flowers', page);
  const vases = AUDIT_VASE_CATALOG;

  const items: Record<SceneItemId, SceneItem> = {};
  entries.forEach((entry, slot) => {
    // 依全局序号轮转配瓶，相邻名花不会撞同一器形
    const vase = vases.length ? vases[entry.no % vases.length].id : 'ribbed_fluted_white';
    items[auditSlotId(slot)] = {
      ...createVaseItem(
        auditSlotId(slot),
        entry.id as FlowerType,
        AUDIT_SLOTS[slot],
        vase as VaseStyle,
        formatAuditEntryLabel(entry),
        0.88
      ),
      lifecycle,
    };
  });
  return items;
};

/** 3. 统一审计展台物品生成器（名花 / 花器一律按「每组 5 件」翻页） */
export const buildAuditItems = (
  category: AuditCategory = 'flowers',
  page: number = 0,
  withFlowers: boolean = true,
  decayHealth: number = 1.0
): Record<SceneItemId, SceneItem> =>
  category === 'vases'
    ? buildAuditVaseItems(page, withFlowers)
    : buildAuditFlowerItems(page, decayHealth);

export const buildInitialItems = (): Record<SceneItemId, SceneItem> => buildStandardItems();

/* ── 初始场景常量 ────────────────────────────────────────────────────────── */

export const INITIAL_ITEMS: Record<SceneItemId, SceneItem> = buildInitialItems();

export const INITIAL_LIGHTING: LightingSettings = {
  masterOn: true,
  // 默认固定在白昼上午（不跟随系统时钟）：开局天色恒定，时辰仅由用户手动切换
  timeOfDay: 'day',
  timeMode: 'fixed',
  sunlightIntensity: 0.92,
  godRaysEnabled: true,
  godRaysIntensity: 0.88,
  sunAngle: -8,
  candleGlowIntensity: 1.0,
  dustDensity: 85,
  windForce: 0.15,
};

export const DEFAULT_MEMORIAL_HALLS: MemorialHallItem[] = [
  {
    id: 'hall_grandma',
    name: '王秀英',
    title: '慈颜常驻 · 永沐春风',
    relationship: '祖母',
    birthDate: '1936 - 2021',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    guardianDays: 186,
    blessingCount: 38,
    isOwner: true,
    createdAt: Date.now() - 186 * 86400000,
  },
  {
    id: 'hall_father',
    name: '林建国',
    title: '父爱如山 · 德泽流芳',
    relationship: '慈父',
    birthDate: '1948 - 2023',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    guardianDays: 92,
    blessingCount: 24,
    isOwner: true,
    createdAt: Date.now() - 92 * 86400000,
  },
  {
    id: 'hall_uncle',
    name: '张明德',
    title: '松柏长青 · 德馨永存',
    relationship: '叔公',
    birthDate: '1942 - 2022',
    photoUrl: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=400&q=80',
    guardianDays: 45,
    blessingCount: 16,
    isOwner: false,
    creatorName: '由堂兄 张伟 筹建',
    lastVisitedAt: Date.now() - 3 * 86400000,
    createdAt: Date.now() - 45 * 86400000,
  },
];

export const INITIAL_MEMORIAL: MemorialInfo = {
  title: DEFAULT_MEMORIAL_HALLS[0].title,
  subtitle: `${DEFAULT_MEMORIAL_HALLS[0].relationship} ${DEFAULT_MEMORIAL_HALLS[0].name} (${DEFAULT_MEMORIAL_HALLS[0].birthDate})`,
  photoUrl: DEFAULT_MEMORIAL_HALLS[0].photoUrl,
};

/** 供案木质默认取值（台面与腿足） */
export const DEFAULT_TABLE_WOOD_STYLE: TableWoodStyle = 'walnut';
