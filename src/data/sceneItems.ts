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
  AuditGroup,
  VaseAuditGroup,
  FlowerAuditGroup,
} from '../types';
import type { VaseStyle } from '../pixi';
import { resolveSystemTimeOfDay } from '../utils/timeOfDay';

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
  vase_left: createVaseItem('vase_left', 'peonies', { x: -164, y: -4 }, 'warm_white_plain', '富贵牡丹花瓶 (左)'),
  vase_right: createVaseItem('vase_right', 'lilies', { x: 164, y: -4 }, 'painted_iris', '纯洁百合花瓶 (右)'),
  candle_left: {
    id: 'candle_left',
    type: 'candle',
    name: '长明红烛 (左)',
    position: { x: -74, y: 3 },
    isLit: true,
  },
  candle_right: {
    id: 'candle_right',
    type: 'candle',
    name: '长明红烛 (右)',
    position: { x: 74, y: 3 },
    isLit: true,
  },
  censer: {
    id: 'censer',
    type: 'censer',
    name: '青瓷清香香炉 (中)',
    position: { x: 0, y: 6 },
    isLit: true,
  },
  fruit_left: {
    id: 'fruit_left',
    type: 'fruit',
    name: '平安红富士苹果盘 (左)',
    fruitType: 'apples',
    position: { x: -118, y: 16 },
  },
  fruit_right: {
    id: 'fruit_right',
    type: 'fruit',
    name: '吉祥砂糖橘盘 (右)',
    fruitType: 'oranges',
    position: { x: 118, y: 16 },
  },
  tea_cups: {
    id: 'tea_cups',
    type: 'tea_cups',
    name: '虔诚敬茶三盏',
    position: { x: 0, y: 22 },
  },
  singing_bowl: {
    id: 'singing_bowl',
    type: 'singing_bowl',
    name: '静心铜磬颂钵 (左前)',
    position: { x: -62, y: 32 },
  },
});

export type { AuditCategory, VaseAuditGroup, FlowerAuditGroup, AuditGroup };

/** 1. 雅瓷花器形制专项审计 */
export const buildAuditVaseItems = (
  group: VaseAuditGroup = 'new_unique',
  withFlowers: boolean = true
): Record<SceneItemId, SceneItem> => {
  if (group === 'new_unique') {
    // 4 款全新异形与手作/旋涡/流沙微观质感花器 (最新参考图提炼打造)
    return {
      vase_audit_1: createVaseItem(
        'vase_audit_1',
        withFlowers ? 'peonies' : 'none',
        { x: -140, y: 0 },
        'pinched_clay_ruffle',
        '1. 手作泥捏翻边陶瓶 (梳齿拉坯刮痕粗陶)',
        0.96
      ),
      vase_audit_2: createVaseItem(
        'vase_audit_2',
        withFlowers ? 'lilies' : 'none',
        { x: -46, y: -4 },
        'pearlescent_turbine',
        '2. 银曜珠光螺旋涡轮瓶 (8道3D旋转刀锋棱)',
        0.96
      ),
      vase_audit_3: createVaseItem(
        'vase_audit_3',
        withFlowers ? 'lotus' : 'none',
        { x: 46, y: -4 },
        'twisted_helix_tower',
        '3. 极简莫兰迪旋转扭扭塔 (90°沙漏扭转腰)',
        0.96
      ),
      vase_audit_4: createVaseItem(
        'vase_audit_4',
        withFlowers ? 'roses' : 'none',
        { x: 140, y: 0 },
        'gradient_sand_volcano',
        '4. 天青流沙渐变圆锥瓶 (砂岩颗粒极简锥台)',
        0.96
      ),
    };
  }

  // designer_twist: 8 款现代几何折痕与器形
  return {
    vase_audit_1: createVaseItem('vase_audit_1', withFlowers ? 'peonies' : 'none', { x: -189, y: 4 }, 'ribbed_fluted_white', '1. 极细百褶密棱瓶', 0.82),
    vase_audit_2: createVaseItem('vase_audit_2', withFlowers ? 'lilies' : 'none', { x: -135, y: 0 }, 'organic_twist_cream', '2. 旋风波浪奶油瓶', 0.82),
    vase_audit_3: createVaseItem('vase_audit_3', withFlowers ? 'peonies' : 'none', { x: -81, y: -4 }, 'organic_twist_rose', '3. 落樱粉旋风波纹瓶', 0.82),
    vase_audit_4: createVaseItem('vase_audit_4', withFlowers ? 'roses' : 'none', { x: -27, y: -6 }, 'chiseled_stone_gray', '4. 侘寂砂岩横纹瓶', 0.82),
    vase_audit_5: createVaseItem('vase_audit_5', withFlowers ? 'lotus' : 'none', { x: 27, y: -6 }, 'fluted_trapezoid_mini', '5. 圆台百褶梯形瓶', 0.82),
    vase_audit_6: createVaseItem('vase_audit_6', withFlowers ? 'chrysanthemum' : 'none', { x: 81, y: -4 }, 'faceted_gem_prism', '6. 钻石晶体切角瓶', 0.82),
    vase_audit_7: createVaseItem('vase_audit_7', withFlowers ? 'lilies' : 'none', { x: 135, y: 0 }, 'melon_lobed_celadon', '7. 海棠瓜棱秀颈瓶', 0.82),
    vase_audit_8: createVaseItem('vase_audit_8', withFlowers ? 'lotus' : 'none', { x: 189, y: 4 }, 'minimal_drop_swan', '8. 极简水滴天鹅瓶', 0.82),
  };
};

/** 2. 🌸 名花形神与枯荣生命周期专项审计 */
export const buildAuditFlowerItems = (
  group: FlowerAuditGroup = 'flowers_tier1_all',
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

  if (group === 'flowers_tier1_a') {
    // 5 款第一梯队名花 (前5)
    return {
      vase_audit_flower_1: {
        ...createVaseItem(
          'vase_audit_flower_1',
          'plum_blossoms',
          { x: -144, y: 0 },
          'ribbed_fluted_white',
          '1. 傲霜冷香白梅 · 枯瘦挺拔细折枝',
          0.96
        ),
        lifecycle,
      },
      vase_audit_flower_2: {
        ...createVaseItem(
          'vase_audit_flower_2',
          'sunflowers',
          { x: -72, y: -4 },
          'chiseled_stone_gray',
          '2. 金色灿烂向日 · 葵盘蜂巢蕊',
          0.96
        ),
        lifecycle,
      },
      vase_audit_flower_3: {
        ...createVaseItem(
          'vase_audit_flower_3',
          'carnations',
          { x: 0, y: -6 },
          'organic_twist_rose',
          '3. 慈孝粉康乃馨 · 锯齿折叠瓣',
          0.96
        ),
        lifecycle,
      },
      vase_audit_flower_4: {
        ...createVaseItem(
          'vase_audit_flower_4',
          'calla_lilies',
          { x: 72, y: -4 },
          'minimal_drop_swan',
          '4. 素雅圣洁马蹄莲 · 纯白佛焰苞',
          0.96
        ),
        lifecycle,
      },
      vase_audit_flower_5: {
        ...createVaseItem(
          'vase_audit_flower_5',
          'tulips',
          { x: 144, y: 0 },
          'pearlescent_turbine',
          '5. 优雅高脚红郁金香 · 艳红高杯',
          0.96
        ),
        lifecycle,
      },
    };
  }

  if (group === 'flowers_tier1_b') {
    // 5 款第一梯队名花 (后5)
    return {
      vase_audit_flower_6: {
        ...createVaseItem(
          'vase_audit_flower_6',
          'narcissus',
          { x: -144, y: 0 },
          'melon_lobed_celadon',
          '6. 凌波仙子水仙 · 金盏银台',
          0.96
        ),
        lifecycle,
      },
      vase_audit_flower_7: {
        ...createVaseItem(
          'vase_audit_flower_7',
          'lily_of_valley',
          { x: -72, y: -4 },
          'fluted_trapezoid_mini',
          '7. 幽谷如意铃兰 · 拱枝乳白银铃',
          0.96
        ),
        lifecycle,
      },
      vase_audit_flower_8: {
        ...createVaseItem(
          'vase_audit_flower_8',
          'orchids',
          { x: 0, y: -6 },
          'twisted_helix_tower',
          '8. 空谷幽兰蝴蝶兰 · 展翅粉紫唇',
          0.96
        ),
        lifecycle,
      },
      vase_audit_flower_9: {
        ...createVaseItem(
          'vase_audit_flower_9',
          'hydrangeas',
          { x: 72, y: -4 },
          'pinched_clay_ruffle',
          '9. 团圆锦簇紫绣球 · 繁英聚球',
          0.96
        ),
        lifecycle,
      },
      vase_audit_flower_10: {
        ...createVaseItem(
          'vase_audit_flower_10',
          'daisies',
          { x: 144, y: 0 },
          'organic_twist_cream',
          '10. 清纯明朗雏菊 · 金蕊白丝带',
          0.96
        ),
        lifecycle,
      },
    };
  }

  if (group === 'flowers_tier1_all') {
    // 10 款第一梯队名花同台大展 (双排立体景深)
    return {
      // 后排 5 款 (微靠后、略小尺寸营造进深感)
      vase_audit_flower_6: {
        ...createVaseItem('vase_audit_flower_6', 'narcissus', { x: -148, y: -10 }, 'melon_lobed_celadon', '6. 凌波水仙', 0.84),
        lifecycle,
      },
      vase_audit_flower_7: {
        ...createVaseItem('vase_audit_flower_7', 'lily_of_valley', { x: -74, y: -12 }, 'fluted_trapezoid_mini', '7. 幽谷铃兰', 0.84),
        lifecycle,
      },
      vase_audit_flower_8: {
        ...createVaseItem('vase_audit_flower_8', 'orchids', { x: 0, y: -14 }, 'twisted_helix_tower', '8. 蝴蝶兰', 0.84),
        lifecycle,
      },
      vase_audit_flower_9: {
        ...createVaseItem('vase_audit_flower_9', 'hydrangeas', { x: 74, y: -12 }, 'pinched_clay_ruffle', '9. 紫绣球', 0.84),
        lifecycle,
      },
      vase_audit_flower_10: {
        ...createVaseItem('vase_audit_flower_10', 'daisies', { x: 148, y: -10 }, 'organic_twist_cream', '10. 小雏菊', 0.84),
        lifecycle,
      },

      // 前排 5 款
      vase_audit_flower_1: {
        ...createVaseItem('vase_audit_flower_1', 'plum_blossoms', { x: -148, y: 12 }, 'ribbed_fluted_white', '1. 傲霜冷香白梅', 0.88),
        lifecycle,
      },
      vase_audit_flower_2: {
        ...createVaseItem('vase_audit_flower_2', 'sunflowers', { x: -74, y: 14 }, 'chiseled_stone_gray', '2. 向日葵', 0.88),
        lifecycle,
      },
      vase_audit_flower_3: {
        ...createVaseItem('vase_audit_flower_3', 'carnations', { x: 0, y: 16 }, 'organic_twist_rose', '3. 康乃馨', 0.88),
        lifecycle,
      },
      vase_audit_flower_4: {
        ...createVaseItem('vase_audit_flower_4', 'calla_lilies', { x: 74, y: 14 }, 'minimal_drop_swan', '4. 马蹄莲', 0.88),
        lifecycle,
      },
      vase_audit_flower_5: {
        ...createVaseItem('vase_audit_flower_5', 'tulips', { x: 148, y: 12 }, 'pearlescent_turbine', '5. 郁金香', 0.88),
        lifecycle,
      },
    };
  }

  if (group === 'flowers_classic') {
    // 5 款经典名花
    return {
      vase_audit_flower_c1: {
        ...createVaseItem('vase_audit_flower_c1', 'peonies', { x: -144, y: 0 }, 'warm_white_plain', '经典 · 富贵牡丹', 0.96),
        lifecycle,
      },
      vase_audit_flower_c2: {
        ...createVaseItem('vase_audit_flower_c2', 'lilies', { x: -72, y: -4 }, 'painted_iris', '经典 · 纯白百合', 0.96),
        lifecycle,
      },
      vase_audit_flower_c3: {
        ...createVaseItem('vase_audit_flower_c3', 'lotus', { x: 0, y: -6 }, 'celadon_ru', '经典 · 出尘净莲', 0.96),
        lifecycle,
      },
      vase_audit_flower_c4: {
        ...createVaseItem('vase_audit_flower_c4', 'chrysanthemum', { x: 72, y: -4 }, 'ribbed_fluted_white', '经典 · 傲霜白菊', 0.96),
        lifecycle,
      },
      vase_audit_flower_c5: {
        ...createVaseItem('vase_audit_flower_c5', 'roses', { x: 144, y: 0 }, 'chiseled_stone_gray', '经典 · 长情玫瑰', 0.96),
        lifecycle,
      },
    };
  }

  // flowers_bouquets: 案前敬献花束平铺比对
  return {
    // 后排 5 束花
    offered_flower_b6: createBouquetItem('narcissus', { x: -140, y: -4 }, { id: 'offered_flower_b6', name: '水仙花束' }),
    offered_flower_b7: createBouquetItem('lily_of_valley', { x: -70, y: -4 }, { id: 'offered_flower_b7', name: '铃兰花束' }),
    offered_flower_b8: createBouquetItem('orchids', { x: 0, y: -4 }, { id: 'offered_flower_b8', name: '蝴蝶兰花束' }),
    offered_flower_b9: createBouquetItem('hydrangeas', { x: 70, y: -4 }, { id: 'offered_flower_b9', name: '绣球花束' }),
    offered_flower_b10: createBouquetItem('daisies', { x: 140, y: -4 }, { id: 'offered_flower_b10', name: '雏菊花束' }),

    // 前排 5 束花
    offered_flower_b1: createBouquetItem('plum_blossoms', { x: -140, y: 18 }, { id: 'offered_flower_b1', name: '冷香素白梅' }),
    offered_flower_b2: createBouquetItem('sunflowers', { x: -70, y: 18 }, { id: 'offered_flower_b2', name: '向日葵花束' }),
    offered_flower_b3: createBouquetItem('carnations', { x: 0, y: 18 }, { id: 'offered_flower_b3', name: '康乃馨花束' }),
    offered_flower_b4: createBouquetItem('calla_lilies', { x: 70, y: 18 }, { id: 'offered_flower_b4', name: '马蹄莲花束' }),
    offered_flower_b5: createBouquetItem('tulips', { x: 140, y: 18 }, { id: 'offered_flower_b5', name: '郁金香花束' }),
  };
};

/** 3. 统一审计展台物品生成器 */
export const buildAuditItems = (
  category: AuditCategory = 'flowers',
  group: AuditGroup = 'flowers_tier1_all',
  withFlowers: boolean = true,
  decayHealth: number = 1.0
): Record<SceneItemId, SceneItem> => {
  if (category === 'flowers') {
    const flowerGroup = (
      ['flowers_tier1_a', 'flowers_tier1_b', 'flowers_tier1_all', 'flowers_classic', 'flowers_bouquets'].includes(group)
        ? group
        : 'flowers_tier1_all'
    ) as FlowerAuditGroup;
    return buildAuditFlowerItems(flowerGroup, decayHealth);
  }
  const vaseGroup = (group === 'designer_twist' ? 'designer_twist' : 'new_unique') as VaseAuditGroup;
  return buildAuditVaseItems(vaseGroup, withFlowers);
};

export const buildInitialItems = (): Record<SceneItemId, SceneItem> => ({});

/* ── 初始场景常量 ────────────────────────────────────────────────────────── */

export const INITIAL_ITEMS: Record<SceneItemId, SceneItem> = buildInitialItems();

export const INITIAL_LIGHTING: LightingSettings = {
  masterOn: true,
  timeOfDay: resolveSystemTimeOfDay(),
  timeMode: 'system',
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
