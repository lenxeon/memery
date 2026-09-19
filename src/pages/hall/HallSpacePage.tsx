/**
 * @file HallSpacePage.tsx
 * @description 馆空间页：单个纪念堂（堂轩）的供案场景主视图。
 *
 * 承载祭台陈设、氛围光影、献花供果、祈愿与专项审计等馆内交互；
 * 登录态由应用外壳（AppShell）持有并通过 props 传入，本页不关心路由与登录页。
 */
/**
 * @file App.tsx
 * @description 应用程序根组件，负责整合供桌场景、实体状态机、全局光影氛围、弹窗交互及音效调度。
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  SceneItem,
  SceneItemId,
  LightingSettings,
  MemorialInfo,
  FlowerType,
  FruitType,
  WorldContext,
  EntityTypeId,
  TableclothStyle,
  TableWoodStyle,
  WallBackgroundStyle,
  FloorStyle,
  AuditCategory,
  AuditGroup,
  VaseAuditGroup,
  FlowerAuditGroup,
  VaseHitZone,
  UserProfile,
  MemorialHallItem
} from '../../types';
import { FLOOR_STYLE_OPTIONS, WALL_STYLE_OPTIONS } from '../../pixi';
import { FloorView } from '../../ui/hall/environment/FloorView';
import { WallView } from '../../ui/hall/environment/WallView';
import { SceneCanvas } from '../../ui/hall/SceneCanvas';
import { GodRaysView } from '../../ui/hall/environment/GodRaysView';
import { DustMotesView } from '../../ui/hall/environment/DustMotesView';

import { 
  BottomDock,
  MemorialPortrait,
  CinnabarSealBadge 
} from '../../ui';
import { openFlowerOffering, openFruitOffering, openBlessing } from '../../features/offering';
import { openAmbianceDrawer } from '../../features/ambiance';
import { openHallDirectory, openCreateHall } from '../../features/hall';
import { openAgreement } from '../../features/agreement';
import { VaseStyle, getVaseStyleMeta, FLOWER_REGISTRY } from '../../pixi';
import { useWorldLoop } from '../../utils/useWorldLoop';
import { findOptimalTableSpot, planSpotsSequentially } from '../../utils/tablePlan';
import { sound } from '../../utils/audio';
import {
  Sun,
  Moon,
  Sunset,
  Power,
  Volume2,
  VolumeX,
  Sparkles,
  SlidersHorizontal,
  Heart,
  GripVertical,
  X,
  ChevronDown,
  ChevronUp,
  User,
  LogOut,
  Compass
} from 'lucide-react';

// ── 供案摆件纯数据构造器 ──
const createVaseItem = (
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

const createBouquetItem = (
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

// ── 供案常规陈设 (五供齐备) ──
/** 点击花冠时循环切换的花材顺序 */
const FLOWER_CYCLE_ORDER: FlowerType[] = [
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

// 1. 雅瓷花器形制专项审计
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

// 2. 🌸 名花形神与枯荣生命周期专项审计
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

// 3. 统一审计展台物品生成器
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

const INITIAL_ITEMS: Record<SceneItemId, SceneItem> = buildInitialItems();

const INITIAL_LIGHTING: LightingSettings = {
  masterOn: true,
  timeOfDay: 'day',
  sunlightIntensity: 0.92,
  godRaysEnabled: true,
  godRaysIntensity: 0.88,
  sunAngle: -8,
  candleGlowIntensity: 1.0,
  dustDensity: 85,
  windForce: 0.15,
};

const DEFAULT_MEMORIAL_HALLS: MemorialHallItem[] = [
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

const INITIAL_MEMORIAL: MemorialInfo = {
  title: DEFAULT_MEMORIAL_HALLS[0].title,
  subtitle: `${DEFAULT_MEMORIAL_HALLS[0].relationship} ${DEFAULT_MEMORIAL_HALLS[0].name} (${DEFAULT_MEMORIAL_HALLS[0].birthDate})`,
  photoUrl: DEFAULT_MEMORIAL_HALLS[0].photoUrl,
};

// 供案 4 款原木材质选项（台面与腿足构架共用）
const TABLE_WOOD_OPTIONS = [
  { id: 'walnut', name: '暖栗胡桃', color: '#452618', border: '#7c3f25' },
  { id: 'huanghuali', name: '明式黄花梨', color: '#7a421b', border: '#b4602a' },
  { id: 'cherry', name: '典雅樱桃', color: '#6a2f20', border: '#9a4731' },
  { id: 'white_oak', name: '素雅白橡', color: '#8c6e54', border: '#b8997a' },
] as const;

export interface HallSpacePageProps {
  /** 当前登录用户（由应用外壳持有并持久化） */
  currentUser: UserProfile | null;
  /** 请求进入登录页 */
  onRequestAuth: () => void;
  /** 登录态变更（登录成功 / 退出登录） */
  onUserChange: (user: UserProfile | null) => void;
}

export const HallSpacePage: React.FC<HallSpacePageProps> = ({
  currentUser,
  onRequestAuth,
  onUserChange,
}) => {
  const [items, setItems] = useState<Record<SceneItemId, SceneItem>>(INITIAL_ITEMS);
  const [lighting, setLighting] = useState<LightingSettings>(INITIAL_LIGHTING);
  const [memorial, setMemorial] = useState<MemorialInfo>(INITIAL_MEMORIAL);

  // 堂轩名录与纪念堂管理状态
  const [memorialHalls, setMemorialHalls] = useState<MemorialHallItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('memery_memorial_halls');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_MEMORIAL_HALLS;
  });

  const [currentHallId, setCurrentHallId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedId = localStorage.getItem('memery_current_hall_id');
        if (savedId) return savedId;
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_MEMORIAL_HALLS[0]?.id || '';
  });

  // 当前主奉堂轩
  const currentHall = memorialHalls.find((h) => h.id === currentHallId) || memorialHalls[0];

  const [isArrangeMode, setIsArrangeMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Table adornments (桌旗/大桌布与落花瓣：响应用户指令默认去除桌布)
  const [showTableRunner, setShowTableRunner] = useState(false);
  const [tableclothStyle, setTableclothStyle] = useState<TableclothStyle>('autumn_gold');
  const [tableWoodStyle, setTableWoodStyle] = useState<TableWoodStyle>('walnut');
  const [tableLegWoodStyle, setTableLegWoodStyle] = useState<TableWoodStyle>('walnut');
  // 桌子前后位置：-1 最靠后（远），0 标准，1 最靠前（近）
  const [tableForward, setTableForward] = useState(0);
  const [showPetals, setShowPetals] = useState(false);

  // Petal shower animation trigger
  const [petalTrigger, setPetalTrigger] = useState(0);
  const [lastOfferedFlower, setLastOfferedFlower] = useState<FlowerType>('peonies');
  const [currentFlower, setCurrentFlower] = useState<FlowerType>('peonies');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const handleLogout = () => {
    sound.playWoodPlacement();
    onUserChange(null);
    setIsUserMenuOpen(false);
    showToast('已安全退出登录');
  };

  // 登录态由应用外壳注入：从无到有时在馆空间内提示
  const prevUserRef = useRef<UserProfile | null>(currentUser);
  useEffect(() => {
    if (!prevUserRef.current && currentUser) {
      showToast(`已登录：${currentUser.name}，暖念心灯已长伴`);
    }
    prevUserRef.current = currentUser;
  }, [currentUser]);

  // Background space aesthetics (默认晴岚映曜 · 宏伟木构殿堂长廊)
  const [wallStyle, setWallStyle] = useState<WallBackgroundStyle>('heritage_wood');

  const handleWallStyleChange = (style: WallBackgroundStyle) => {
    setWallStyle(style);
    const opt = WALL_STYLE_OPTIONS.find((o) => o.id === style);
    sound.playBell(540, 2);
    showToast(`已切换背景风格为「${opt?.name || ''} · ${opt?.poeticTitle || ''}」`);
  };

  // Ground floor aesthetics (5 款高品质暖木与禅意大宅地坪材质可选，默认图1晴岚暖木)
  const [floorStyle, setFloorStyle] = useState<FloorStyle>('hinoki_wood');

  const handleFloorStyleChange = (style: FloorStyle) => {
    setFloorStyle(style);
    sound.playWoodPlacement();
    const opt = FLOOR_STYLE_OPTIONS.find((o) => o.id === style);
    showToast(`已切换地面材质为「${opt?.name || ''} · ${opt?.poeticTitle || ''}」`);
  };

  // Toast / notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  // 堂轩选择与切换
  const handleSelectHall = (hall: MemorialHallItem) => {
    setCurrentHallId(hall.id);
    try {
      localStorage.setItem('memery_current_hall_id', hall.id);
    } catch (e) {
      console.error(e);
    }
    setMemorial({
      title: hall.title,
      subtitle: `${hall.relationship} ${hall.name} ${hall.birthDate ? `(${hall.birthDate})` : ''}`,
      photoUrl: hall.photoUrl,
    });
    showToast(`已步入《${hall.title}》· 守护 ${hall.name}`);
  };

  // 筹建新堂轩并设为当前案台
  const handleCreateHall = (newHall: MemorialHallItem) => {
    setMemorialHalls((prev) => {
      const next = [newHall, ...prev];
      try {
        localStorage.setItem('memery_memorial_halls', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
    handleSelectHall(newHall);
    showToast(`新堂轩《${newHall.title}》已筹建落成`);
  };

  // 2.5D 深度视差微动交互
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleStageMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setParallax({ x: nx * 14, y: ny * 8 });
  };

  const handleStageMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };


  const handleToggleFruit = (id: SceneItemId) => {
    setItems((prev) => {
      const item = prev[id];
      if (!item) return prev;
      const current = item.fruitType || 'apples';
      const order: FruitType[] = [
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
      const curIdx = order.indexOf(current);
      const next: FruitType = order[(curIdx + 1) % order.length];
      const fruitNames: Record<FruitType, string> = {
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
      showToast(`已更换供果为「${fruitNames[next]}」`);
      sound.playPorcelainClink();
      return {
        ...prev,
        [id]: {
          ...item,
          fruitType: next,
          name: `${fruitNames[next]}高足盘 (${id.includes('left') ? '左' : id.includes('right') ? '右' : '敬献'})`,
        },
      };
    });
  };

  const updateItemPosition = (id: SceneItemId, pos: { x: number; y: number }) => {
    setItems((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        position: pos,
      },
    }));
  };

  const toggleItemLit = (id: SceneItemId) => {
    setItems((prev) => {
      const item = prev[id];
      if (!item) return prev;
      const nextLit = !item.isLit;
      const updated: SceneItem = {
        ...item,
        isLit: nextLit,
        lifecycle: (item.lifecycle?.stage === 'expired' || (item.lifecycle?.health ?? 1) <= 0.05) && nextLit
          ? {
              ...item.lifecycle,
              stage: 'blooming',
              age: 0,
              health: 1.0,
            }
          : item.lifecycle,
      };
      if (item.lifecycle?.stage === 'expired' || (item.lifecycle?.health ?? 1) <= 0.05) {
        showToast(id.startsWith('candle') ? '已添上崭新长明红烛并点燃' : '已敬奉崭新三炷高香并点燃');
      }
      return {
        ...prev,
        [id]: updated,
      };
    });
  };

  // Game World Loop: Lifecycle ticking for flowers, candles, incense, fruits
  const { timeScale, setTimeScale } = useWorldLoop({
    items,
    onUpdateItems: setItems,
    lighting,
    soundEnabled,
    initialTimeScale: 1.0,
    onEntityEvent: (event) => {
      if (event.type === 'despawn') {
        showToast('一捧供花完成生命花期，芬芳随风化作尘香');
        setPetalTrigger(Date.now());
      } else if (event.type === 'petal_drop') {
        setPetalTrigger(Date.now());
      }
    },
  });

  // ── 专项审计模式状态 (默认不开启，支持拖拽改变位置与配置项开启) ──
  const [isAuditMode, setIsAuditMode] = useState(false);
  const [auditPos, setAuditPos] = useState<{ x: number; y: number } | null>(null);
  const auditPanelRef = useRef<HTMLDivElement>(null);
  const [auditCategory, setAuditCategory] = useState<AuditCategory>('flowers');
  const [auditGroup, setAuditGroup] = useState<AuditGroup>('flowers_tier1_all');
  const [auditWithFlowers, setAuditWithFlowers] = useState(true);
  const [flowerDecayHealth, setFlowerDecayHealth] = useState<number>(1.0);
  const [isAuditCapsuleExpanded, setIsAuditCapsuleExpanded] = useState<boolean>(true);

  // 审计胶囊拖拽改变位置 (支持桌面端鼠标与移动端触摸)
  const handleAuditPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // 若点击在按钮等交互元素上，不触发面板拖拽
    if ((e.target as HTMLElement).closest('button, input, select, a')) return;

    const panel = auditPanelRef.current;
    if (!panel) return;

    const rect = panel.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const onPointerMove = (moveEv: PointerEvent) => {
      const panelW = rect.width;
      const panelH = rect.height;
      const newX = Math.max(8, Math.min(window.innerWidth - panelW - 8, moveEv.clientX - offsetX));
      const newY = Math.max(50, Math.min(window.innerHeight - panelH - 20, moveEv.clientY - offsetY));
      setAuditPos({ x: newX, y: newY });
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const switchAuditCategory = (category: AuditCategory) => {
    setAuditCategory(category);
    if (category === 'table') {
      sound.playWoodPlacement();
      showToast('已进入「供案材质专项审计」');
      return;
    }
    const defaultGroup: AuditGroup = category === 'flowers' ? 'flowers_tier1_all' : 'new_unique';
    setAuditGroup(defaultGroup);
    sound.playPorcelainClink();
    setItems(buildAuditItems(category, defaultGroup, auditWithFlowers, flowerDecayHealth));
    showToast(category === 'flowers' ? '已进入「名花专项审计展台」' : '已进入「花器专项审计展台」');
  };

  const switchAuditGroup = (group: AuditGroup) => {
    setAuditGroup(group);
    sound.playPorcelainClink();
    setItems(buildAuditItems(auditCategory, group, auditWithFlowers, flowerDecayHealth));
    const labelMap: Record<AuditGroup, string> = {
      flowers_tier1_all: '已展示第一梯队 10 款名花齐放同台全景',
      flowers_tier1_a: '已展示第一梯队前5名花 (梅花/向日葵/康乃馨/马蹄莲/郁金香)',
      flowers_tier1_b: '已展示第一梯队后5名花 (水仙/铃兰/蝴蝶兰/绣球/雏菊)',
      flowers_classic: '已展示经典五供名花 (牡丹/百合/清莲/白菊/玫瑰)',
      flowers_bouquets: '已展示案前敬献花束平铺形态对比',
      new_unique: '已展示 4 款异形与微观肌理瓶',
      designer_twist: '已展示 8 款现代几何折痕瓶',
      all_woods: '已展示 4 款名木实木板式材质',
    };
    showToast(labelMap[group] || '展台已更新');
  };

  const cycleFlowerDecay = () => {
    // 1.0 (满盛) -> 0.55 (微枯) -> 0.15 (岁暮) -> 1.0 (重放)
    const nextHealth = flowerDecayHealth === 1.0 ? 0.55 : flowerDecayHealth === 0.55 ? 0.15 : 1.0;
    setFlowerDecayHealth(nextHealth);
    sound.playBell(720, 1.5);
    setItems(buildAuditItems(auditCategory, auditGroup, auditWithFlowers, nextHealth));
    const stageDesc =
      nextHealth === 1.0
        ? '🌸 满盛怒放（生机 100%）'
        : nextHealth === 0.55
        ? '🍂 微枯初衰（生机 55%）'
        : '🥀 岁暮深凋（生机 15%）';
    showToast(`名花枯荣生命审计：${stageDesc}`);
  };

  const selectFlowerDecayHealth = (health: number) => {
    setFlowerDecayHealth(health);
    sound.playBell(720, 1.5);
    setItems(buildAuditItems(auditCategory, auditGroup, auditWithFlowers, health));
    const stageDesc =
      health >= 0.9
        ? '🌸 满盛怒放（生机 100%）'
        : health >= 0.4
        ? '🍂 微枯初衰（生机 55%）'
        : '🥀 岁暮深凋（生机 15%）';
    showToast(`名花枯荣生命审计：${stageDesc}`);
  };

  const triggerAuditPetals = () => {
    setPetalTrigger(Date.now());
    sound.playBell(580, 2);
    showToast('🍃 已触发落英缤纷动效（花瓣随风舒展漫舞）');
  };

  const toggleAuditFlowers = () => {
    const next = !auditWithFlowers;
    setAuditWithFlowers(next);
    sound.playPorcelainClink();
    setItems(buildAuditItems(auditCategory, auditGroup, next, flowerDecayHealth));
    showToast(next ? '已开启插花比对（审计花枝入瓶景深与咬合）' : '已切换为净瓶裸检模式（审计器形、釉色与微观肌理）');
  };

  const toggleAuditMode = () => {
    if (isAuditMode) {
      setIsAuditMode(false);
      setItems(buildStandardItems());
      showToast('已恢复常规五供陈设（香、花、灯、水、果）');
    } else {
      setIsAuditMode(true);
      setItems(buildAuditItems(auditCategory, auditGroup, auditWithFlowers, flowerDecayHealth));
      showToast(auditCategory === 'flowers' ? '已进入「名花专项审计展台」' : '已进入「花器专项审计展台」');
    }
    sound.playWoodPlacement();
  };

  const resetTableLayout = () => {
    sound.playWoodPlacement();
    setItems(
      isAuditMode
        ? buildAuditItems(auditCategory, auditGroup, auditWithFlowers, flowerDecayHealth)
        : buildStandardItems()
    );
    showToast('案面摆设已恢复初始格局');
  };

  const toggleAllCandles = () => {
    const anyLit = items.candle_left?.isLit || items.candle_right?.isLit || items.censer?.isLit;
    if (anyLit) {
      sound.playExtinguish();
      setItems((prev) => ({
        ...prev,
        candle_left: prev.candle_left ? { ...prev.candle_left, isLit: false } : prev.candle_left,
        candle_right: prev.candle_right ? { ...prev.candle_right, isLit: false } : prev.candle_right,
        censer: prev.censer ? { ...prev.censer, isLit: false } : prev.censer,
      }));
      showToast('已熄灭案上全部烛火与香炉');
    } else {
      sound.playMatchStrike();
      sound.playBell(528, 2.5);
      setItems((prev) => {
        const renewOrLight = (item: SceneItem | undefined, type: 'candle' | 'censer'): SceneItem | undefined => {
          if (!item) return item;
          const isExpired = item.lifecycle?.stage === 'expired' || (item.lifecycle?.health ?? 1) <= 0.05;
          if (isExpired) {
            return {
              ...item,
              isLit: true,
              ...(type === 'candle' ? { waxHeight: 1.0 } : {}),
              ...(type === 'censer' ? { incenseHealth: 1.0 } : {}),
              lifecycle: item.lifecycle ? {
                ...item.lifecycle,
                age: 0,
                stage: 'blooming',
                health: 1.0,
              } : undefined,
            };
          }
          return { ...item, isLit: true };
        };

        // 已撤下的摆件不应被写回 undefined 空位（会让下游渲染层读到空对象）
        const next: Record<SceneItemId, SceneItem> = { ...prev };
        const nextLeft = renewOrLight(prev.candle_left, 'candle');
        const nextRight = renewOrLight(prev.candle_right, 'candle');
        const nextCenser = renewOrLight(prev.censer, 'censer');
        if (nextLeft) next.candle_left = nextLeft;
        if (nextRight) next.candle_right = nextRight;
        if (nextCenser) next.censer = nextCenser;
        return next;
      });
      showToast('已重新奉上并点燃长明红烛与清香');
    }
  };

  const FLOWER_DISPLAY_NAMES: Record<FlowerType, string> = {
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

  const handleAddOfferedFlower = (flowerType: FlowerType) => {
    const newId = `offered_flower_${Date.now()}`;
    const name = FLOWER_DISPLAY_NAMES[flowerType] || '鲜花';

    // 按案面平面占用求解相对最优摆位（避开既有陈设，多束时错落排开不重叠）
    const spot = findOptimalTableSpot(items, { radius: 59, depthRadius: 14, preferredDepth: -14 });

    const newBouquet = createBouquetItem(
      flowerType,
      spot,
      { id: newId, name: `敬献 · ${name}` }
    );

    setItems((prev) => ({
      ...prev,
      [newId]: newBouquet,
    }));

    setCurrentFlower(flowerType);
    setLastOfferedFlower(flowerType);
    setPetalTrigger(Date.now());
    sound.playBell(560, 2);
    showToast(`已将新鲜「${name}」奉献于供案桌面，可在案上随意拖拽摆放`);
  };

  const handleChangeVaseFlower = (side: 'left' | 'right' | 'both', flowerType: FlowerType) => {
    const name = FLOWER_DISPLAY_NAMES[flowerType] || '鲜花';

    setItems((prev) => {
      const next = { ...prev };
      if (side === 'left' || side === 'both') {
        next.vase_left = {
          ...next.vase_left,
          flowerType,
          name: `${name}花瓶 (左)`,
        };
      }
      if (side === 'right' || side === 'both') {
        next.vase_right = {
          ...next.vase_right,
          flowerType,
          name: `${name}花瓶 (右)`,
        };
      }
      return next;
    });

    setLastOfferedFlower(flowerType);
    setPetalTrigger(Date.now());
    showToast(`已更换花瓶插花为「${name}」`);
  };

  const handleChangeVaseStyle = (side: 'left' | 'right' | 'both', vaseStyle: VaseStyle) => {
    const meta = getVaseStyleMeta(vaseStyle);
    setItems((prev) => {
      const next = { ...prev };
      if (side === 'left' || side === 'both') {
        if (next.vase_left) {
          next.vase_left = {
            ...next.vase_left,
            vaseStyle,
            name: `${meta.name} (左)`,
          };
        }
      }
      if (side === 'right' || side === 'both') {
        if (next.vase_right) {
          next.vase_right = {
            ...next.vase_right,
            vaseStyle,
            name: `${meta.name} (右)`,
          };
        }
      }
      return next;
    });
    sound.playPorcelainClink();
    sound.playBell(640, 2);
    showToast(`已更换花瓶形制为「${meta.name}」`);
  };

  const handleToggleVaseStyle = (id: SceneItemId) => {
    if (id.startsWith('vase_audit_flower_') || (isAuditMode && auditCategory === 'flowers')) {
      const item = items[id];
      if (item) {
        sound.playPorcelainClink();
        const meta = item.flowerType ? FLOWER_REGISTRY[item.flowerType] : null;
        if (meta) {
          showToast(`🌸【${meta.name}】${meta.poeticTitle} · 名花专项审计中`);
        } else {
          showToast(`🌸【${item.name}】· 名花专项审计中`);
        }
        return;
      }
    }
    if (id.startsWith('vase_audit_') || isAuditMode) {
      const item = items[id];
      if (item) {
        sound.playPorcelainClink();
        showToast(`🏺【${item.name}】· 花器专项审计中`);
        return;
      }
    }
    const styleOrder: VaseStyle[] = [
      'warm_white_plain',
      'painted_iris',
      'painted_peony',
      'painted_plum',
      'qinghua_lotus',
      'royal_blue_gold',
      'mutton_jade_ears',
      'celadon_ru',
    ];
    setItems((prev) => {
      const item = prev[id];
      if (!item || !id.startsWith('vase')) return prev;
      const current = (item.vaseStyle || (id.includes('right') ? 'painted_iris' : 'warm_white_plain')) as VaseStyle;
      const curIdx = styleOrder.indexOf(current);
      const next: VaseStyle = styleOrder[(curIdx + 1) % styleOrder.length];
      const nextMeta = getVaseStyleMeta(next);
      showToast(`已更换花瓶为「${nextMeta.name}」`);
      sound.playPorcelainClink();
      return {
        ...prev,
        [id]: {
          ...item,
          vaseStyle: next,
          name: `${nextMeta.name} (${id.includes('left') ? '左' : '右'})`,
        },
      };
    });
  };

  /**
   * 花瓶分区点击：命中花冠换花材，命中瓶身换器型，两类切换互不干扰。
   */
  const handleVaseClick = (id: SceneItemId, zone?: VaseHitZone) => {
    if (zone === 'flowers') {
      // 名花专项审计展台：花材由展台固定，点击仅作提示
      if (id.startsWith('vase_audit_flower_') || (isAuditMode && auditCategory === 'flowers')) {
        const item = items[id];
        if (item) {
          sound.playPorcelainClink();
          const meta = item.flowerType ? FLOWER_REGISTRY[item.flowerType] : null;
          if (meta) {
            showToast(`🌸【${meta.name}】${meta.poeticTitle} · 名花专项审计中`);
          } else {
            showToast(`🌸【${item.name}】· 名花专项审计中`);
          }
          return;
        }
      }
      cycleVaseFlower(id);
      return;
    }
    handleToggleVaseStyle(id);
  };

  /** 点击花冠：循环切换瓶中的花材 */
  const cycleVaseFlower = (id: SceneItemId) => {
    const item = items[id];
    if (!item || !id.startsWith('vase')) return;

    const isRight = id.includes('right');
    const current = (item.flowerType || (isRight ? 'lilies' : 'peonies')) as FlowerType;
    const curIdx = FLOWER_CYCLE_ORDER.indexOf(current);
    const next = FLOWER_CYCLE_ORDER[(curIdx + 1) % FLOWER_CYCLE_ORDER.length];
    const name = FLOWER_DISPLAY_NAMES[next] || '鲜花';

    setItems((prev) => {
      const prevItem = prev[id];
      if (!prevItem) return prev;
      return {
        ...prev,
        [id]: {
          ...prevItem,
          flowerType: next,
          name: `${name}花瓶 (${isRight ? '右' : '左'})`,
        },
      };
    });

    setLastOfferedFlower(next);
    setPetalTrigger(Date.now());
    sound.playPorcelainClink();
    sound.playBell(660, 1.6);
    showToast(`已更换插花为「${name}」`);
  };

  const handleRemoveItem = (id: SceneItemId) => {
    setItems((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    sound.playWoodPlacement();
    showToast('已从供案上撤下该项');
  };

  const handleClearOfferedFlowers = () => {
    setItems((prev) => {
      const next = { ...prev };
      for (const k of Object.keys(next)) {
        if (k.startsWith('offered_flower_')) {
          delete next[k];
        }
      }
      return next;
    });
    sound.playWoodPlacement();
    showToast('已清空供案上的全部献花捧束');
  };

  const handleFillTenFlowers = () => {
    sound.playBell(528, 2.5);
    setPetalTrigger(Date.now());

    const flowerOrder: FlowerType[] = [
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
    ];
    // 十捧花一次性排布：逐件求解并把已排定的计入占用，互不重叠
    const spots = planSpotsSequentially(items, flowerOrder.length, {
      radius: 59,
      depthRadius: 14,
      preferredDepth: -12,
    });

    setItems((prev) => {
      const next: Record<SceneItemId, SceneItem> = { ...prev };
      for (const key of Object.keys(next)) {
        if (key.startsWith('offered_flower_')) delete next[key];
      }
      flowerOrder.forEach((flower, idx) => {
        const id = `offered_flower_fill_${idx}`;
        next[id] = createBouquetItem(
          flower,
          spots[idx],
          { id, name: `敬献 · ${FLOWER_DISPLAY_NAMES[flower] || '鲜花'}` }
        );
      });
      return next;
    });

    showToast('已一键布设十捧香花盛供，案前繁花锦簇');
  };

  // ── 供果与摆盘能力拓展 (献果上案 · 定制双盘) ──
  const handleAddOfferedFruit = (fruitType: FruitType) => {
    const newId = `fruit_offered_${Date.now()}`;
    const fruitNames: Record<FruitType, string> = {
      apples: '平安红富士苹果',
      oranges: '吉祥金蜜柑',
      peaches: '福寿并蒂仙桃',
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

    // 果盘占地略大，取相应的占地半径并摆在中前部
    const spot = findOptimalTableSpot(items, { radius: 49, depthRadius: 14, preferredDepth: -10 });

    const newFruitDish: SceneItem = {
      id: newId,
      type: 'fruit',
      name: `敬奉 · ${fruitNames[fruitType]}`,
      fruitType,
      position: spot,
      scale: 0.95,
    };

    setItems((prev) => ({
      ...prev,
      [newId]: newFruitDish,
    }));

    sound.playBell(560, 2);
    sound.playPorcelainClink();
    showToast(`已向供案敬奉一盘新鲜「${fruitNames[fruitType]}」，可在案台自由拖拽摆放`);
  };

  const handleChangeMainFruit = (side: 'left' | 'right' | 'both', fruitType: FruitType) => {
    const fruitNames: Record<FruitType, string> = {
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

    setItems((prev) => {
      const next = { ...prev };
      if (side === 'left' || side === 'both') {
        if (next.fruit_left) {
          next.fruit_left = {
            ...next.fruit_left,
            fruitType,
            name: `${fruitNames[fruitType]}高足盘 (左)`,
          };
        }
      }
      if (side === 'right' || side === 'both') {
        if (next.fruit_right) {
          next.fruit_right = {
            ...next.fruit_right,
            fruitType,
            name: `${fruitNames[fruitType]}高足盘 (右)`,
          };
        }
      }
      return next;
    });

    sound.playPorcelainClink();
    showToast(`已将${side === 'left' ? '左侧' : side === 'right' ? '右侧' : '左右双侧'}主果盘设置为「${fruitNames[fruitType]}」`);
  };

  const handleClearOfferedFruits = () => {
    setItems((prev) => {
      const next = { ...prev };
      for (const k of Object.keys(next)) {
        if (k.startsWith('fruit_offered_')) {
          delete next[k];
        }
      }
      return next;
    });
    sound.playWoodPlacement();
    showToast('已从供案上撤下全部新增敬献果盘');
  };

  const handleBlessingSubmit = (blessingText: string) => {
    // Also light candles if present
    setItems((prev) => ({
      ...prev,
      ...(prev.candle_left ? { candle_left: { ...prev.candle_left, isLit: true } } : {}),
      ...(prev.candle_right ? { candle_right: { ...prev.candle_right, isLit: true } } : {}),
      ...(prev.censer ? { censer: { ...prev.censer, isLit: true } } : {}),
    }));
    showToast(`祈愿已诚心呈奉：「${blessingText.slice(0, 16)}...」`);
  };

  // ──────────────────────────────────────────
  // 弹窗入口：生命周期统一由通用弹窗系统托管（DialogHost + openDialog），
  // 此处只描述「打开什么内容、传入什么数据与回调」，不再声明开关状态与挂载节点。
  // ──────────────────────────────────────────
  const openEnvironmentDrawer = () => {
    openAmbianceDrawer({
        lighting,
        onUpdateLighting: (up: Partial<LightingSettings>) => setLighting((prev) => ({ ...prev, ...up })),
        onToggleAllCandles: toggleAllCandles,
        soundEnabled,
        onToggleSound: toggleSound,
        showTableRunner,
        tableclothStyle,
        onChangeTableclothStyle: (st: TableclothStyle) => {
          sound.playWoodPlacement();
          setTableclothStyle(st);
        },
        tableWoodStyle,
        onChangeTableWoodStyle: (st: TableWoodStyle) => {
          sound.playWoodPlacement();
          setTableWoodStyle(st);
        },
        floorStyle,
        onChangeFloorStyle: handleFloorStyleChange,
        onToggleTableRunner: () => {
          sound.playWoodPlacement();
          setShowTableRunner((v) => {
            const next = !v;
            showToast(next ? '已铺设提花织锦大桌布（整案覆盖 · 金丝流苏）' : '已收起桌布，呈现素雅纯实木案台');
            return next;
          });
        },
        showPetals,
        onTogglePetals: () => setShowPetals((v) => !v),
        wallStyle,
        onChangeWallStyle: handleWallStyleChange,
        timeScale,
        onUpdateTimeScale: setTimeScale,
        isAuditMode,
        onToggleAuditMode: toggleAuditMode,
        auditCategory,
        onSwitchAuditCategory: switchAuditCategory,
        auditGroup,
        onSwitchAuditGroup: switchAuditGroup,
        auditWithFlowers,
        onToggleAuditFlowers: toggleAuditFlowers,
        flowerDecayHealth,
        onSelectFlowerDecayHealth: selectFlowerDecayHealth,
        onTriggerAuditPetals: triggerAuditPetals,
        onOpenAgreement: openAgreement,
    });
  };

  const openFlowerPicker = () => {
    openFlowerOffering({
        currentFlower,
        onSelectFlower: setCurrentFlower,
        onAddOfferedFlower: handleAddOfferedFlower,
        onChangeVaseFlower: handleChangeVaseFlower,
        onChangeVaseStyle: handleChangeVaseStyle,
        leftVaseFlower: items.vase_left?.flowerType || 'peonies',
        rightVaseFlower: items.vase_right?.flowerType || 'lilies',
        leftVaseStyle: items.vase_left?.vaseStyle || 'warm_white_plain',
        rightVaseStyle: items.vase_right?.vaseStyle || 'painted_iris',
        offeredCount: Object.keys(items).filter((k) => k.startsWith('offered_flower_')).length,
        onClearOfferedFlowers: handleClearOfferedFlowers,
        onFillTenFlowers: handleFillTenFlowers,
    });
  };

  const openFruitPicker = () => {
    openFruitOffering({
        onAddOfferedFruit: handleAddOfferedFruit,
        onChangeMainFruit: handleChangeMainFruit,
        leftFruitType: items.fruit_left?.fruitType || 'apples',
        rightFruitType: items.fruit_right?.fruitType || 'oranges',
        offeredCount: Object.keys(items).filter((k) => k.startsWith('fruit_offered_')).length,
        onClearOfferedFruits: handleClearOfferedFruits,
    });
  };

  const openCreateMemorial = () => {
    const handle = openCreateHall({
        onCreate: (newHall: MemorialHallItem) => {
          handleCreateHall(newHall);
          handle.close();
        },
    });
  };

  const openMemorialList = () => {
    const handle = openHallDirectory({
        halls: memorialHalls,
        currentHallId,
        onSelectHall: handleSelectHall,
        onOpenCreate: () => {
          handle.close();
          openCreateMemorial();
        },
        onClearHalls: () => {
          setMemorialHalls([]);
          try {
            localStorage.setItem('memery_memorial_halls', JSON.stringify([]));
          } catch (e) {
            console.error(e);
          }
          showToast('已清空当前堂轩列表（供体验空状态引导创建流程）');
        },
        onLoadSampleHalls: () => {
          setMemorialHalls(DEFAULT_MEMORIAL_HALLS);
          setCurrentHallId(DEFAULT_MEMORIAL_HALLS[0].id);
          try {
            localStorage.setItem('memery_memorial_halls', JSON.stringify(DEFAULT_MEMORIAL_HALLS));
            localStorage.setItem('memery_current_hall_id', DEFAULT_MEMORIAL_HALLS[0].id);
          } catch (e) {
            console.error(e);
          }
          showToast('已恢复预置示例纪念堂');
        },
    });
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    if (next) sound.playBell(580, 2);
  };

  // Background ambiance color according to lighting & time
  const getSceneBackgroundClass = () => {
    if (!lighting.masterOn) {
      return 'bg-gradient-to-b from-[#141210] via-[#1c1714] to-[#120f0d] text-stone-200';
    }
    switch (lighting.timeOfDay) {
      case 'sunset':
        return 'bg-gradient-to-b from-[#f3dfcf] via-[#f7eae1] to-[#e8d2c0] text-stone-800';
      case 'night':
        return 'bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#090d16] text-stone-200';
      case 'day':
      default:
        return 'bg-gradient-to-b from-[#fbf8f3] via-[#f5ede3] to-[#e7dacb] text-stone-800';
    }
  };

  return (
    <main
      className={`relative w-full h-screen overflow-hidden flex flex-col items-center justify-between select-none transition-colors duration-700 font-sans ${getSceneBackgroundClass()}`}
    >
      {/* Wall Texture Effect (Hardware accelerated, zero blend cost) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background: `radial-gradient(circle at 50% 35%, transparent 25%, rgba(60, 40, 20, 0.12) 100%)`,
        }}
      />

      {/* Top Header & Quick Environment Bar */}
      <header className="relative z-30 w-full max-w-5xl px-4 pt-3 sm:pt-4 flex items-center justify-between pointer-events-auto">
        {/* Left: App Brand, Quick Agreement Link & User Login/Profile */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openAgreement}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1917]/90 backdrop-blur-md border border-amber-500/40 shadow-xs text-xs text-amber-200 hover:bg-stone-900 transition-all cursor-pointer group select-none"
            title="查看《暖念》立意初心、社会价值与服务声明"
          >
            <span className="font-serif font-bold tracking-widest text-amber-100 group-hover:text-amber-200 text-xs sm:text-sm">暖念</span>
            <span className="w-1 h-1 rounded-full bg-amber-400/60" />
            <span className="text-[10px] text-amber-400/80 group-hover:text-amber-300 font-normal">公约与立意</span>
          </button>

          {/* 堂轩名录（纪念馆列表）入口 */}
          <button
            type="button"
            onClick={() => {
              sound.playWoodPlacement();
              openMemorialList();
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#1c1917]/90 backdrop-blur-md hover:bg-stone-900 border border-amber-500/40 hover:border-amber-400/70 text-amber-200 text-xs shadow-xs transition-all cursor-pointer group select-none"
            title="点击打开堂轩名录，切换或创建纪念堂"
          >
            <Compass size={13} className="text-amber-400 group-hover:rotate-45 transition-transform duration-300 shrink-0" />
            <span className="font-serif max-w-[80px] sm:max-w-[120px] truncate text-[11px] sm:text-xs text-amber-100 font-medium">
              {currentHall ? currentHall.title.split('·')[0].trim() : '堂轩名录'}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
              {memorialHalls.length}
            </span>
            <ChevronDown size={11} className="text-amber-400/70 group-hover:translate-y-0.5 transition-transform shrink-0" />
          </button>

          {/* 用户账户与登录卡片入口 */}
          <div className="relative">
            {currentUser ? (
              <div>
                <button
                  type="button"
                  onClick={() => {
                    sound.playWoodPlacement();
                    setIsUserMenuOpen(!isUserMenuOpen);
                  }}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#1c1917]/90 backdrop-blur-md hover:bg-stone-900 border border-amber-500/40 text-amber-200 text-xs shadow-xs transition-all cursor-pointer"
                  title="点击查看个人暖念档案与守护记录"
                >
                  <span className="text-xs select-none">{currentUser.avatar || (currentUser.loginType === 'wechat' ? '💬' : currentUser.loginType === 'apple' ? '🍎' : '👤')}</span>
                  <span className="font-serif max-w-[70px] sm:max-w-[100px] truncate text-[11px] sm:text-xs text-amber-100">{currentUser.name}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" title="心灯已长伴" />
                </button>

                {/* 用户档案气泡卡片 */}
                {isUserMenuOpen && (
                  <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-[#1c1917]/95 backdrop-blur-xl border border-amber-500/50 shadow-2xl p-3.5 z-50 text-xs text-stone-200 animate-in fade-in zoom-in-95 ring-1 ring-amber-400/20">
                    <div className="flex items-center gap-2.5 pb-2.5 border-b border-amber-500/20">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-lg shrink-0">
                        {currentUser.avatar || (currentUser.loginType === 'wechat' ? '💬' : currentUser.loginType === 'apple' ? '🍎' : '👤')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-serif font-bold text-amber-100 truncate text-xs">{currentUser.name}</div>
                        <div className="text-[10px] text-amber-400/80 flex items-center gap-1 mt-0.5">
                          <span>{currentUser.loginType === 'wechat' ? '微信授权登录' : currentUser.loginType === 'apple' ? 'Apple 隐私登录' : '手机账号登录'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="py-2.5 space-y-1.5 text-[11px] text-stone-300">
                      <div className="flex justify-between items-center">
                        <span className="text-stone-400">已守护天数</span>
                        <span className="font-mono text-amber-300 font-semibold">{currentUser.guardianDays} 天</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-stone-400">案前寄思祈愿</span>
                        <span className="font-mono text-amber-300 font-semibold">{currentUser.blessingCount} 次</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-stone-400">暖念长青状态</span>
                        <span className="text-emerald-400 text-[10px] flex items-center gap-1 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          <span>心灯守护中</span>
                        </span>
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-amber-500/20 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          openAgreement();
                        }}
                        className="text-[10px] text-stone-400 hover:text-amber-200 cursor-pointer transition-colors"
                      >
                        服务公约
                      </button>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-1 text-[11px] text-red-400 hover:text-red-300 cursor-pointer transition-colors"
                      >
                        <LogOut size={12} />
                        <span>退出登录</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  sound.playWoodPlacement();
                  onRequestAuth();
                }}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 border border-amber-400/60 shadow-xs text-xs text-stone-950 font-bold transition-all cursor-pointer active:scale-95 whitespace-nowrap"
                title="开启暖念心灯档案 · 登录与注册"
              >
                <User size={12} className="stroke-[2.5]" />
                <span>登录 / 注册</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick controls on right */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Master Light switch */}
          <button
            type="button"
            onClick={() => {
              const next = !lighting.masterOn;
              sound.playBell(next ? 520 : 380, 2);
              setLighting((p) => ({ ...p, masterOn: next }));
            }}
            title={lighting.masterOn ? '点击关闭自然光照' : '点击开启自然光照'}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-xs cursor-pointer whitespace-nowrap ${lighting.masterOn
                ? 'bg-amber-100/90 hover:bg-amber-200/90 text-amber-900 border border-amber-300/80'
                : 'bg-stone-800 text-stone-300 border border-stone-700'
              }`}
          >
            <Power size={13} className={lighting.masterOn ? 'text-amber-600' : 'text-stone-400'} />
            <span className="hidden sm:inline">{lighting.masterOn ? '日照开' : '烛夜暗'}</span>
          </button>

          {/* Time presets quick switch */}
          <div className="hidden sm:flex items-center bg-white/90 rounded-full p-0.5 border border-amber-200/60 shadow-xs text-xs">
            <button
              type="button"
              onClick={() => {
                sound.playBell(480, 2);
                setLighting((p) => ({ ...p, timeOfDay: 'day' }));
              }}
              className={`p-1.5 rounded-full transition-colors ${lighting.timeOfDay === 'day' ? 'bg-amber-200/80 text-amber-900' : 'text-stone-500 hover:text-stone-800'
                }`}
              title="白昼晨光"
            >
              <Sun size={14} />
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playBell(440, 2);
                setLighting((p) => ({ ...p, timeOfDay: 'sunset' }));
              }}
              className={`p-1.5 rounded-full transition-colors ${lighting.timeOfDay === 'sunset' ? 'bg-orange-200/80 text-orange-900' : 'text-stone-500 hover:text-stone-800'
                }`}
              title="黄昏暖阳"
            >
              <Sunset size={14} />
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playBell(390, 2);
                setLighting((p) => ({ ...p, timeOfDay: 'night' }));
              }}
              className={`p-1.5 rounded-full transition-colors ${lighting.timeOfDay === 'night' ? 'bg-slate-700 text-indigo-300' : 'text-stone-500 hover:text-stone-800'
                }`}
              title="静谧微夜"
            >
              <Moon size={14} />
            </button>
          </div>

          {/* Sound toggle */}
          <button
            type="button"
            onClick={toggleSound}
            title={soundEnabled ? '静音' : '开启颂钵音效'}
            className="p-1.5 sm:p-2 rounded-full bg-white/90 border border-amber-200/60 text-stone-700 hover:bg-white shadow-xs cursor-pointer transition-colors"
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} className="text-stone-400" />}
          </button>

          {/* Table wood quick audit launcher */}
          <button
            type="button"
            onClick={() => {
              sound.playWoodPlacement();
              if (isAuditMode && auditCategory === 'table') {
                setIsAuditMode(false);
              } else {
                setIsAuditMode(true);
                setAuditCategory('table');
                setIsAuditCapsuleExpanded(true);
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-xs cursor-pointer whitespace-nowrap ${
              isAuditMode && auditCategory === 'table'
                ? 'bg-amber-500 text-stone-950 font-bold border border-amber-400 ring-2 ring-amber-400/40 shadow-sm'
                : 'bg-white/90 border border-amber-200/60 text-stone-700 hover:bg-white'
            }`}
            title="快捷切换供案实木材质与桌布"
          >
            <span>🪵</span>
            <span className="font-serif font-medium">案台材质</span>
          </button>

          {/* Detailed Ambiance & Music panel button */}
          <button
            type="button"
            onClick={openEnvironmentDrawer}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/90 border border-amber-200/60 text-stone-700 hover:bg-white shadow-xs text-xs cursor-pointer transition-colors whitespace-nowrap"
            title="设置：背景风格、光影、禅意背景音乐、桌布等"
          >
            <SlidersHorizontal size={13} className="text-amber-700" />
            <span className="hidden sm:inline font-medium">设置</span>
          </button>
        </div>
      </header>

      {/* Floating Toast */}
      {toastMessage && (
        <div className="absolute top-16 z-50 animate-in fade-in slide-in-from-top-3 duration-300 flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900/90 backdrop-blur-md text-amber-100 text-xs shadow-xl border border-amber-500/30 pointer-events-none">
          <Sparkles size={14} className="text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Core Simulation Stage (古典建筑壁构 + 2.5D 深度视差微动 + 写实 3D 透视地坪 + 极致精美纯 Canvas 供台) */}
      <div 
        className="relative w-full flex-1 flex flex-col items-center justify-center overflow-hidden"
        onMouseMove={handleStageMouseMove}
        onMouseLeave={handleStageMouseLeave}
      >
        {/* Layer 1: Sacred Altar Back Wall (宏伟古典建筑壁构) */}
        <WallView
          lighting={lighting}
          wallStyle={wallStyle}
        />

        {/* Layer 2: Volumetric Rays (Tyndall Light Beams / 晨曦丁达尔柔和金芒) */}
        <GodRaysView
          enabled={lighting.masterOn && lighting.godRaysEnabled}
          intensity={lighting.godRaysIntensity}
          sunAngle={lighting.sunAngle}
          timeOfDay={lighting.timeOfDay}
        />

        {/* Layer 3: Floating Dust Motes caught in the sunlight */}
        <DustMotesView
          density={lighting.dustDensity}
          sunlightIntensity={lighting.masterOn ? lighting.sunlightIntensity : 0.15}
          windForce={lighting.windForce}
          timeOfDay={lighting.timeOfDay}
        />

        {/* Layer 4: Perspective Flooring with Marble Tile & Hardwood Planks (2.5D 真·CSS 3D 纵深透视地坪，近大远小视锥收敛) */}
        <div 
          className="absolute inset-x-0 bottom-0 transition-transform duration-300 ease-out pointer-events-none"
          style={{
            transform: `translate3d(${parallax.x * 0.45}px, ${parallax.y * 0.45}px, 0)`,
          }}
        >
          <FloorView lighting={lighting} floorStyle={floorStyle} />
        </div>

        {/* Layer 5: Sacred Memorial Portrait Frame (居中安放于木构长廊正前) */}
        <div 
          className="absolute top-[18%] sm:top-[20%] z-30 pointer-events-auto transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${parallax.x * 0.45}px, ${parallax.y * 0.45}px, 0)`,
          }}
        >
          <MemorialPortrait
            info={memorial}
            onUpdateInfo={(up) => setMemorial((prev) => ({ ...prev, ...up }))}
            sunlightIntensity={lighting.masterOn ? lighting.sunlightIntensity : 0.2}
            timeOfDay={lighting.timeOfDay}
          />
        </div>

        {/* Layer 6: 2.5D Pure Canvas WebGL Game Scene Viewport (全面接管红木供案、金丝桌布与全部供品摆件的 Canvas 光栅化与动效渲染) */}
        <SceneCanvas
          items={items}
          lighting={lighting}
          wallStyle={wallStyle}
          floorStyle={floorStyle}
          tableclothStyle={tableclothStyle}
          tableWoodStyle={tableWoodStyle}
          tableLegWoodStyle={tableLegWoodStyle}
          tableForward={tableForward}
          showTableRunner={showTableRunner}
          petalTrigger={petalTrigger}
          lastOfferedFlower={lastOfferedFlower}
          onToggleItemLit={toggleItemLit}
          onToggleFruit={handleToggleFruit}
          onVaseClick={handleVaseClick}
          onBowlHit={() => sound.playSingingBowl()}
          onUpdateItemPosition={updateItemPosition}
          onUpdateTableForward={(v) => setTableForward(Math.max(-1, Math.min(1, v)))}
          className="absolute inset-0 z-25 pointer-events-auto"
        />

        {/* Layer 5.5: 🔍 专项审计模式控制胶囊 (默认不开启，支持拖拽改变位置，支持关闭) */}
        {isAuditMode && (
          <div 
            ref={auditPanelRef}
            onPointerDown={handleAuditPointerDown}
            className="fixed z-40 select-none touch-none cursor-move transition-shadow"
            style={{
              left: auditPos ? `${auditPos.x}px` : '50%',
              top: auditPos ? `${auditPos.y}px` : '88px',
              transform: auditPos ? 'none' : 'translateX(-50%)',
              maxWidth: '96vw',
            }}
          >
            <div className="pointer-events-auto flex items-center flex-wrap justify-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-[#1c1917]/95 backdrop-blur-xl border border-amber-500/60 shadow-[0_12px_36px_rgba(0,0,0,0.85)] text-xs text-amber-100 ring-1 ring-amber-400/20 animate-in fade-in zoom-in-95">
              {/* 拖动手柄与标题 */}
              <div className="flex items-center gap-1 font-semibold text-amber-300 font-serif mr-1">
                <div 
                  className="text-amber-400/60 hover:text-amber-300 p-0.5 cursor-grab active:cursor-grabbing" 
                  title="按住拖动位置"
                >
                  <GripVertical size={15} />
                </div>
                <span>{auditCategory === 'flowers' ? '🌸' : auditCategory === 'vases' ? '🏺' : '🪵'}</span>
                <span>{auditCategory === 'flowers' ? '名花专项审计' : auditCategory === 'vases' ? '花器专项审计' : '案台木质审计'}</span>
                <CinnabarSealBadge text="审计" />
              </div>

              {/* 胶囊展开/收起切换按钮 */}
              <button
                type="button"
                onClick={() => {
                  sound.playWoodPlacement();
                  setIsAuditCapsuleExpanded((prev) => !prev);
                }}
                className="px-2 py-0.5 rounded-full bg-stone-900/90 border border-amber-500/40 hover:border-amber-400 text-[11px] text-amber-200/90 flex items-center gap-0.5 cursor-pointer transition-all active:scale-95"
                title={isAuditCapsuleExpanded ? '收起配置选项' : '展开详细配置选项'}
              >
                <span>{isAuditCapsuleExpanded ? '收起' : '展开配置'}</span>
                {isAuditCapsuleExpanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
              </button>

              {isAuditCapsuleExpanded && (
                <>
                  <span className="text-stone-600 hidden sm:inline">|</span>

                  {/* 类别切换：名花 vs 花器 vs 案台 */}
                  <div className="flex items-center bg-stone-950/90 p-0.5 rounded-full border border-amber-500/40">
                    <button
                      type="button"
                      onClick={() => switchAuditCategory('flowers')}
                      className={`px-2.5 py-1 rounded-full cursor-pointer transition-all active:scale-95 font-medium flex items-center gap-1 ${
                        auditCategory === 'flowers'
                          ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-stone-950 font-bold shadow-xs'
                          : 'text-amber-200/70 hover:text-amber-100'
                      }`}
                    >
                      <span>🌸</span>
                      <span>名花 (15款)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => switchAuditCategory('vases')}
                      className={`px-2.5 py-1 rounded-full cursor-pointer transition-all active:scale-95 font-medium flex items-center gap-1 ${
                        auditCategory === 'vases'
                          ? 'bg-amber-600/90 text-stone-950 font-bold shadow-xs'
                          : 'text-amber-200/70 hover:text-amber-100'
                      }`}
                    >
                      <span>🏺</span>
                      <span>花器 (12款)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => switchAuditCategory('table')}
                      className={`px-2.5 py-1 rounded-full cursor-pointer transition-all active:scale-95 font-medium flex items-center gap-1 ${
                        auditCategory === 'table'
                          ? 'bg-amber-600/90 text-stone-950 font-bold shadow-xs'
                          : 'text-amber-200/70 hover:text-amber-100'
                      }`}
                    >
                      <span>🪵</span>
                      <span>案台 (4款)</span>
                    </button>
                  </div>

                  <span className="text-stone-600 hidden sm:inline">|</span>

                  {/* 名花专属分组切换 */}
                  {auditCategory === 'flowers' ? (
                    <div className="flex items-center flex-wrap gap-1 bg-stone-950/80 p-0.5 rounded-full border border-amber-500/30">
                      <button
                        type="button"
                        onClick={() => switchAuditGroup('flowers_tier1_all')}
                        className={`px-2 py-0.5 rounded-full cursor-pointer transition-all active:scale-95 font-medium ${
                          auditGroup === 'flowers_tier1_all'
                            ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                            : 'text-amber-200/70 hover:text-amber-100'
                        }`}
                        title="第一梯队 10 款新名花双排错落同台大展"
                      >
                        🌟 10花齐放
                      </button>
                      <button
                        type="button"
                        onClick={() => switchAuditGroup('flowers_tier1_a')}
                        className={`px-2 py-0.5 rounded-full cursor-pointer transition-all active:scale-95 font-medium ${
                          auditGroup === 'flowers_tier1_a'
                            ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                            : 'text-amber-200/70 hover:text-amber-100'
                        }`}
                        title="梅花、向日葵、康乃馨、马蹄莲、郁金香"
                      >
                        🌺 梯队A (前5)
                      </button>
                      <button
                        type="button"
                        onClick={() => switchAuditGroup('flowers_tier1_b')}
                        className={`px-2 py-0.5 rounded-full cursor-pointer transition-all active:scale-95 font-medium ${
                          auditGroup === 'flowers_tier1_b'
                            ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                            : 'text-amber-200/70 hover:text-amber-100'
                        }`}
                        title="水仙、铃兰、蝴蝶兰、绣球、雏菊"
                      >
                        🪷 梯队B (后5)
                      </button>
                      <button
                        type="button"
                        onClick={() => switchAuditGroup('flowers_classic')}
                        className={`px-2 py-0.5 rounded-full cursor-pointer transition-all active:scale-95 font-medium ${
                          auditGroup === 'flowers_classic'
                            ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                            : 'text-amber-200/70 hover:text-amber-100'
                        }`}
                        title="牡丹、百合、清莲、白菊、玫瑰"
                      >
                        💮 经典5供
                      </button>
                      <button
                        type="button"
                        onClick={() => switchAuditGroup('flowers_bouquets')}
                        className={`px-2 py-0.5 rounded-full cursor-pointer transition-all active:scale-95 font-medium ${
                          auditGroup === 'flowers_bouquets'
                            ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                            : 'text-amber-200/70 hover:text-amber-100'
                        }`}
                        title="桌面平铺丝带花束敬献形态比对"
                      >
                        💐 案前花束
                      </button>
                    </div>
                  ) : (
                    /* 花器专属分组切换 */
                    <div className="flex items-center bg-stone-950/80 p-0.5 rounded-full border border-amber-500/30">
                      <button
                        type="button"
                        onClick={() => switchAuditGroup('new_unique')}
                        className={`px-2.5 py-1 rounded-full cursor-pointer transition-all active:scale-95 font-medium ${
                          auditGroup === 'new_unique'
                            ? 'bg-amber-600/90 text-stone-950 font-bold shadow-xs'
                            : 'text-amber-200/70 hover:text-amber-100'
                        }`}
                      >
                        ✨ 4款异形瓶
                      </button>
                      <button
                        type="button"
                        onClick={() => switchAuditGroup('designer_twist')}
                        className={`px-2.5 py-1 rounded-full cursor-pointer transition-all active:scale-95 font-medium ${
                          auditGroup === 'designer_twist'
                            ? 'bg-amber-600/90 text-stone-950 font-bold shadow-xs'
                            : 'text-amber-200/70 hover:text-amber-100'
                        }`}
                      >
                        🎨 8款折痕瓶
                      </button>
                    </div>
                  )}

                  <span className="text-stone-600 hidden sm:inline">|</span>

                  {/* 案台专属控制：台面/腿足独立原木材质、前后位置与桌布开关 */}
                  {auditCategory === 'table' ? (
                    <div className="flex items-center flex-wrap gap-1.5">
                      <div className="flex items-center gap-1 bg-stone-950/80 p-0.5 rounded-full border border-amber-500/30">




                        {TABLE_WOOD_OPTIONS.map((w) => {
                          const isSel = tableWoodStyle === w.id;
                          return (
                            <button
                              key={w.id}
                              type="button"
                              onClick={() => {
                                sound.playWoodPlacement();
                                setTableWoodStyle(w.id as TableWoodStyle);
                                showToast(`供案材质已切换为「${w.name}」`);
                              }}
                              className={`px-2.5 py-1 rounded-full cursor-pointer transition-all active:scale-95 text-xs font-medium flex items-center gap-1.5 ${
                                isSel
                                  ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                                  : 'text-amber-200/80 hover:text-amber-100 hover:bg-stone-900/60'
                              }`}
                            >
                              <span
                                className="w-2.5 h-2.5 rounded-full inline-block border shrink-0"
                                style={{ background: w.color, borderColor: w.border }}
                              />
                              <span>{w.name}</span>
                            </button>
                          );
                        })}
                      </div>

                      <select
                        value={tableLegWoodStyle}
                        onChange={(e) => {
                          sound.playWoodPlacement();
                          const v = e.target.value as TableWoodStyle;
                          setTableLegWoodStyle(v);
                          showToast(`腿足材质已切换为「${TABLE_WOOD_OPTIONS.find((o) => o.id === v)?.name}」`);
                        }}
                        className="px-2 py-1 rounded-full bg-stone-950/80 border border-amber-500/30 text-amber-200 text-xs cursor-pointer outline-none"
                        title="切换腿足构架（桌腿/牙板/横枨）材质"
                      >
                        {TABLE_WOOD_OPTIONS.map((w) => (
                          <option key={w.id} value={w.id}>
                            腿足·{w.name}
                          </option>
                        ))}
                      </select>

                      <div className="flex items-center gap-1.5 bg-stone-950/80 px-2 py-1 rounded-full border border-amber-500/30">
                        <span className="text-[10px] text-amber-300/70 whitespace-nowrap">
                          ✥ 场景中拖动供案调前后
                        </span>
                        <span className="text-[10px] font-mono text-amber-200/80 w-8 text-right">
                          {Math.round(tableForward * 100)}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            sound.playWoodPlacement();
                            setTableForward(0);
                            showToast('供案前后位置已复位');
                          }}
                          className="px-1.5 py-0.5 rounded-full bg-stone-900/80 border border-stone-700 text-stone-400 hover:text-amber-200 hover:border-amber-500/50 cursor-pointer transition-all active:scale-95 text-[10px]"
                          title="复位供案至标准前后位置"
                        >
                          复位
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          sound.playWoodPlacement();
                          setShowTableRunner((v) => {
                            const next = !v;
                            showToast(next ? '已铺设提花大桌布' : '已收起桌布，呈现纯实木板式案台');
                            return next;
                          });
                        }}
                        className={`px-2.5 py-1 rounded-full border cursor-pointer transition-all active:scale-95 flex items-center gap-1 font-medium text-xs ${
                          showTableRunner
                            ? 'bg-amber-600/50 border-amber-400 text-amber-200 font-bold'
                            : 'bg-stone-900/80 border-stone-700 text-stone-400 hover:text-stone-200'
                        }`}
                        title="切换铺设大桌布或纯实木板式案台"
                      >
                        <span>🧺</span>
                        <span>{showTableRunner ? '已铺大桌布' : '素雅纯实木'}</span>
                      </button>
                    </div>
                  ) : auditCategory === 'flowers' ? (
                    /* 名花专属控制：枯荣生命周期切换 & 漫天落瓣动效 */
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={cycleFlowerDecay}
                        className="px-2.5 py-1 rounded-full bg-rose-950/40 hover:bg-rose-900/50 text-rose-200 border border-rose-400/40 cursor-pointer transition-all active:scale-95 flex items-center gap-1 font-medium"
                        title="切换名花生命周期：满盛(100%) -> 微枯(55%) -> 岁暮深凋(15%)"
                      >
                        <span>
                          {flowerDecayHealth === 1.0 ? '🌸 满盛' : flowerDecayHealth === 0.55 ? '🍂 微枯' : '🥀 岁暮'}
                        </span>
                        <span className="text-[10px] text-rose-300/80 font-mono">
                          {Math.round(flowerDecayHealth * 100)}%
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={triggerAuditPetals}
                        className="px-2.5 py-1 rounded-full bg-amber-950/40 hover:bg-amber-900/50 text-amber-200 border border-amber-400/40 cursor-pointer transition-all active:scale-95 flex items-center gap-1 font-medium"
                        title="模拟落英缤纷漫天落瓣动效"
                      >
                        <span>🍃 花雨</span>
                      </button>
                    </div>
                  ) : (
                    /* 花器专属控制 */
                    <button
                      type="button"
                      onClick={toggleAuditFlowers}
                      className="px-2.5 py-1 rounded-full bg-amber-950/40 hover:bg-amber-900/50 text-amber-200 border border-amber-400/40 cursor-pointer transition-all active:scale-95 flex items-center gap-1 font-medium"
                      title="切换插花查看瓶口咬合深度，或看净瓶裸瓶"
                    >
                      <span>{auditWithFlowers ? '🌸 切换裸检' : '🌸 显示插花'}</span>
                    </button>
                  )}

                  {/* 恢复常规五供快捷按钮 */}
                  <button
                    type="button"
                    onClick={toggleAuditMode}
                    className="px-2.5 py-1 rounded-full bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 border border-amber-500/50 cursor-pointer transition-all active:scale-95 flex items-center gap-1 font-medium"
                    title="恢复常规五供陈设"
                  >
                    <span>🔄 恢复常规五供</span>
                  </button>
                </>
              )}

              {/* 关闭审计展台 X 按钮 */}
              <button
                type="button"
                onClick={toggleAuditMode}
                className="w-6 h-6 rounded-full bg-stone-900/90 hover:bg-rose-950/80 text-stone-400 hover:text-rose-300 flex items-center justify-center cursor-pointer border border-amber-500/40 hover:border-rose-400/60 transition-all shrink-0 ml-0.5 active:scale-90"
                title="关闭专项审计展台"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}



      </div>

      {/* Bottom Navigation Dock (reproducing user's bottom buttons: 献花 / 供果 / 点烛 / 置台 / 氛围 / 祈愿) */}
      <BottomDock
        onOpenFlowers={openFlowerPicker}
        currentFlower={currentFlower}
        onOpenFruits={openFruitPicker}
        onToggleCandles={toggleAllCandles}
        candlesLit={Boolean(items.candle_left?.isLit || items.candle_right?.isLit)}
        onToggleArrangeMode={() => setIsArrangeMode(!isArrangeMode)}
        isArrangeMode={isArrangeMode}
        onOpenLighting={openEnvironmentDrawer}
        onOpenBlessing={openBlessing}
      />
    </main>
  );
}
