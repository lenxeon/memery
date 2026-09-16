/**
 * @file App.tsx
 * @description 应用程序根组件，负责整合供桌场景、实体状态机、全局光影氛围、弹窗交互及音效调度。
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
  WallBackgroundStyle,
  FloorStyle
} from './types';
import { AltarWall, AltarTable, FloorPlanks, MemorialPortrait, FLOOR_STYLE_OPTIONS } from './components/scene';
import { VolumetricRays, DustMotes, PetalShower } from './components/effects';
import { EnvironmentDrawer, WALL_STYLE_OPTIONS, FlowerPickerModal, FruitPickerModal, BlessingModal } from './components/settings';
import { BottomDock, FpsMonitor } from './components/controls';
import { FloraFactory, RitualFactory, VesselFactory, itemRegistry } from './game/factories/AbstractItemFactory';
import { VaseStyle, getVaseStyleMeta } from './components/offerings/flowers/vases';
import { FLOWER_REGISTRY } from './components/offerings/flowers';
import { CinnabarSealBadge } from './components/common/ChineseDecorations';
import { useWorldLoop } from './game/lifecycle/useWorldLoop';
import { sound } from './utils/audio';
import {
  Sun,
  Moon,
  Sunset,
  Power,
  Volume2,
  VolumeX,
  Sparkles,
  SlidersHorizontal,
  Heart
} from 'lucide-react';

// ── 供案常规陈设 (五供齐备) ──
export const buildStandardItems = (): Record<SceneItemId, SceneItem> => ({
  vase_left: FloraFactory.createVase('left', 'peonies', { x: -164, y: -4 }, 'warm_white_plain'),
  vase_right: FloraFactory.createVase('right', 'lilies', { x: 164, y: -4 }, 'painted_iris'),
  candle_left: RitualFactory.createCandle('left', { x: -74, y: 3 }, true),
  candle_right: RitualFactory.createCandle('right', { x: 74, y: 3 }, true),
  censer: RitualFactory.createCenser({ x: 0, y: 6 }, true),
  fruit_left: VesselFactory.createFruitPlatter('left', 'apples', { x: -118, y: 16 }),
  fruit_right: VesselFactory.createFruitPlatter('right', 'oranges', { x: 118, y: 16 }),
  tea_cups: VesselFactory.createTeaCups({ x: 0, y: 22 }),
  singing_bowl: RitualFactory.createSingingBowl({ x: -62, y: 32 }),
});

// ── 🔍 专项审计展台 (台面清空其它所有物品，并列陈列供逐一审计花器形制、微观肌理与名花形神) ──
export type AuditCategory = 'flowers' | 'vases';
export type VaseAuditGroup = 'new_unique' | 'designer_twist';
export type FlowerAuditGroup =
  | 'flowers_tier1_all'   // 🌟 第一梯队 10 花齐放同台
  | 'flowers_tier1_a'     // 🌺 第一梯队 A 组 (前5名卉：梅花/向日葵/康乃馨/马蹄莲/郁金香)
  | 'flowers_tier1_b'     // 🪷 第一梯队 B 组 (后5名卉：水仙/铃兰/蝴蝶兰/绣球/雏菊)
  | 'flowers_classic'     // 💮 经典传承 5 供 (牡丹/百合/清莲/白菊/玫瑰)
  | 'flowers_bouquets';   // 💐 案前敬献花束平铺对比

export type AuditGroup = VaseAuditGroup | FlowerAuditGroup;

// 1. 雅瓷花器形制专项审计
export const buildAuditVaseItems = (
  group: VaseAuditGroup = 'new_unique',
  withFlowers: boolean = true
): Record<SceneItemId, SceneItem> => {
  if (group === 'new_unique') {
    // 4 款全新异形与手作/旋涡/流沙微观质感花器 (最新参考图提炼打造)
    return {
      vase_audit_1: FloraFactory.createVase(
        'vase_audit_1',
        withFlowers ? 'peonies' : 'none',
        { x: -140, y: 0 },
        'pinched_clay_ruffle',
        '1. 手作泥捏翻边陶瓶 (梳齿拉坯刮痕粗陶)',
        0.96
      ),
      vase_audit_2: FloraFactory.createVase(
        'vase_audit_2',
        withFlowers ? 'lilies' : 'none',
        { x: -46, y: -4 },
        'pearlescent_turbine',
        '2. 银曜珠光螺旋涡轮瓶 (8道3D旋转刀锋棱)',
        0.96
      ),
      vase_audit_3: FloraFactory.createVase(
        'vase_audit_3',
        withFlowers ? 'lotus' : 'none',
        { x: 46, y: -4 },
        'twisted_helix_tower',
        '3. 极简莫兰迪旋转扭扭塔 (90°沙漏扭转腰)',
        0.96
      ),
      vase_audit_4: FloraFactory.createVase(
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
    vase_audit_1: FloraFactory.createVase('vase_audit_1', withFlowers ? 'peonies' : 'none', { x: -189, y: 4 }, 'ribbed_fluted_white', '1. 极细百褶密棱瓶', 0.82),
    vase_audit_2: FloraFactory.createVase('vase_audit_2', withFlowers ? 'lilies' : 'none', { x: -135, y: 0 }, 'organic_twist_cream', '2. 旋风波浪奶油瓶', 0.82),
    vase_audit_3: FloraFactory.createVase('vase_audit_3', withFlowers ? 'peonies' : 'none', { x: -81, y: -4 }, 'organic_twist_rose', '3. 落樱粉旋风波纹瓶', 0.82),
    vase_audit_4: FloraFactory.createVase('vase_audit_4', withFlowers ? 'roses' : 'none', { x: -27, y: -6 }, 'chiseled_stone_gray', '4. 侘寂砂岩横纹瓶', 0.82),
    vase_audit_5: FloraFactory.createVase('vase_audit_5', withFlowers ? 'lotus' : 'none', { x: 27, y: -6 }, 'fluted_trapezoid_mini', '5. 圆台百褶梯形瓶', 0.82),
    vase_audit_6: FloraFactory.createVase('vase_audit_6', withFlowers ? 'chrysanthemum' : 'none', { x: 81, y: -4 }, 'faceted_gem_prism', '6. 钻石晶体切角瓶', 0.82),
    vase_audit_7: FloraFactory.createVase('vase_audit_7', withFlowers ? 'lilies' : 'none', { x: 135, y: 0 }, 'melon_lobed_celadon', '7. 海棠瓜棱秀颈瓶', 0.82),
    vase_audit_8: FloraFactory.createVase('vase_audit_8', withFlowers ? 'lotus' : 'none', { x: 189, y: 4 }, 'minimal_drop_swan', '8. 极简水滴天鹅瓶', 0.82),
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
        ...FloraFactory.createVase(
          'vase_audit_flower_1',
          'plum_blossoms',
          { x: -144, y: 0 },
          'ribbed_fluted_white',
          '1. 傲霜朱砂红梅 · 苍劲曲木枝',
          0.96
        ),
        lifecycle,
      },
      vase_audit_flower_2: {
        ...FloraFactory.createVase(
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
        ...FloraFactory.createVase(
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
        ...FloraFactory.createVase(
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
        ...FloraFactory.createVase(
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
        ...FloraFactory.createVase(
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
        ...FloraFactory.createVase(
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
        ...FloraFactory.createVase(
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
        ...FloraFactory.createVase(
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
        ...FloraFactory.createVase(
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
        ...FloraFactory.createVase('vase_audit_flower_6', 'narcissus', { x: -148, y: -10 }, 'melon_lobed_celadon', '6. 凌波水仙', 0.84),
        lifecycle,
      },
      vase_audit_flower_7: {
        ...FloraFactory.createVase('vase_audit_flower_7', 'lily_of_valley', { x: -74, y: -12 }, 'fluted_trapezoid_mini', '7. 幽谷铃兰', 0.84),
        lifecycle,
      },
      vase_audit_flower_8: {
        ...FloraFactory.createVase('vase_audit_flower_8', 'orchids', { x: 0, y: -14 }, 'twisted_helix_tower', '8. 蝴蝶兰', 0.84),
        lifecycle,
      },
      vase_audit_flower_9: {
        ...FloraFactory.createVase('vase_audit_flower_9', 'hydrangeas', { x: 74, y: -12 }, 'pinched_clay_ruffle', '9. 紫绣球', 0.84),
        lifecycle,
      },
      vase_audit_flower_10: {
        ...FloraFactory.createVase('vase_audit_flower_10', 'daisies', { x: 148, y: -10 }, 'organic_twist_cream', '10. 小雏菊', 0.84),
        lifecycle,
      },

      // 前排 5 款
      vase_audit_flower_1: {
        ...FloraFactory.createVase('vase_audit_flower_1', 'plum_blossoms', { x: -148, y: 12 }, 'ribbed_fluted_white', '1. 傲霜红梅', 0.88),
        lifecycle,
      },
      vase_audit_flower_2: {
        ...FloraFactory.createVase('vase_audit_flower_2', 'sunflowers', { x: -74, y: 14 }, 'chiseled_stone_gray', '2. 向日葵', 0.88),
        lifecycle,
      },
      vase_audit_flower_3: {
        ...FloraFactory.createVase('vase_audit_flower_3', 'carnations', { x: 0, y: 16 }, 'organic_twist_rose', '3. 康乃馨', 0.88),
        lifecycle,
      },
      vase_audit_flower_4: {
        ...FloraFactory.createVase('vase_audit_flower_4', 'calla_lilies', { x: 74, y: 14 }, 'minimal_drop_swan', '4. 马蹄莲', 0.88),
        lifecycle,
      },
      vase_audit_flower_5: {
        ...FloraFactory.createVase('vase_audit_flower_5', 'tulips', { x: 148, y: 12 }, 'pearlescent_turbine', '5. 郁金香', 0.88),
        lifecycle,
      },
    };
  }

  if (group === 'flowers_classic') {
    // 5 款经典名花
    return {
      vase_audit_flower_c1: {
        ...FloraFactory.createVase('vase_audit_flower_c1', 'peonies', { x: -144, y: 0 }, 'warm_white_plain', '经典 · 富贵牡丹', 0.96),
        lifecycle,
      },
      vase_audit_flower_c2: {
        ...FloraFactory.createVase('vase_audit_flower_c2', 'lilies', { x: -72, y: -4 }, 'painted_iris', '经典 · 纯白百合', 0.96),
        lifecycle,
      },
      vase_audit_flower_c3: {
        ...FloraFactory.createVase('vase_audit_flower_c3', 'lotus', { x: 0, y: -6 }, 'celadon_ru', '经典 · 出尘净莲', 0.96),
        lifecycle,
      },
      vase_audit_flower_c4: {
        ...FloraFactory.createVase('vase_audit_flower_c4', 'chrysanthemum', { x: 72, y: -4 }, 'ribbed_fluted_white', '经典 · 傲霜白菊', 0.96),
        lifecycle,
      },
      vase_audit_flower_c5: {
        ...FloraFactory.createVase('vase_audit_flower_c5', 'roses', { x: 144, y: 0 }, 'chiseled_stone_gray', '经典 · 长情玫瑰', 0.96),
        lifecycle,
      },
    };
  }

  // flowers_bouquets: 案前敬献花束平铺比对
  return {
    // 后排 5 束花
    offered_flower_b6: FloraFactory.createOfferedBouquet('narcissus', { x: -140, y: -4 }, { id: 'offered_flower_b6', name: '水仙花束' }),
    offered_flower_b7: FloraFactory.createOfferedBouquet('lily_of_valley', { x: -70, y: -4 }, { id: 'offered_flower_b7', name: '铃兰花束' }),
    offered_flower_b8: FloraFactory.createOfferedBouquet('orchids', { x: 0, y: -4 }, { id: 'offered_flower_b8', name: '蝴蝶兰花束' }),
    offered_flower_b9: FloraFactory.createOfferedBouquet('hydrangeas', { x: 70, y: -4 }, { id: 'offered_flower_b9', name: '绣球花束' }),
    offered_flower_b10: FloraFactory.createOfferedBouquet('daisies', { x: 140, y: -4 }, { id: 'offered_flower_b10', name: '雏菊花束' }),

    // 前排 5 束花
    offered_flower_b1: FloraFactory.createOfferedBouquet('plum_blossoms', { x: -140, y: 18 }, { id: 'offered_flower_b1', name: '红梅花束' }),
    offered_flower_b2: FloraFactory.createOfferedBouquet('sunflowers', { x: -70, y: 18 }, { id: 'offered_flower_b2', name: '向日葵花束' }),
    offered_flower_b3: FloraFactory.createOfferedBouquet('carnations', { x: 0, y: 18 }, { id: 'offered_flower_b3', name: '康乃馨花束' }),
    offered_flower_b4: FloraFactory.createOfferedBouquet('calla_lilies', { x: 70, y: 18 }, { id: 'offered_flower_b4', name: '马蹄莲花束' }),
    offered_flower_b5: FloraFactory.createOfferedBouquet('tulips', { x: 140, y: 18 }, { id: 'offered_flower_b5', name: '郁金香花束' }),
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

export const buildInitialItems = (): Record<SceneItemId, SceneItem> =>
  buildAuditItems('flowers', 'flowers_tier1_all', true, 1.0);

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

const INITIAL_MEMORIAL: MemorialInfo = {
  title: '暖念墙',
  subtitle: 'Warmth & Blessing',
  photoUrl: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=400&q=80',
};

export default function App() {
  const [items, setItems] = useState<Record<SceneItemId, SceneItem>>(INITIAL_ITEMS);
  const [lighting, setLighting] = useState<LightingSettings>(INITIAL_LIGHTING);
  const [memorial, setMemorial] = useState<MemorialInfo>(INITIAL_MEMORIAL);

  // Modals state
  const [isLightingOpen, setIsLightingOpen] = useState(false);
  const [isFlowerOpen, setIsFlowerOpen] = useState(false);
  const [isFruitOpen, setIsFruitOpen] = useState(false);
  const [isBlessingOpen, setIsBlessingOpen] = useState(false);
  const [isArrangeMode, setIsArrangeMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Table adornments (桌旗/大桌布与落花瓣)
  const [showTableRunner, setShowTableRunner] = useState(true);
  const [tableclothStyle, setTableclothStyle] = useState<TableclothStyle>('autumn_gold');
  const [showPetals, setShowPetals] = useState(true);

  // Petal shower animation trigger
  const [petalTrigger, setPetalTrigger] = useState(0);
  const [lastOfferedFlower, setLastOfferedFlower] = useState<FlowerType>('peonies');

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
      const inferredType: EntityTypeId = (item.type || (
        id.startsWith('candle') ? 'candle' :
          id === 'censer' ? 'censer' : 'candle'
      )) as EntityTypeId;
      const worldContext: WorldContext = {
        deltaSec: 0,
        timeScale,
        lighting,
        soundEnabled,
      };
      const updated = itemRegistry.interactItem({ ...item, type: inferredType }, 'toggle_lit', worldContext);
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

  // ── 专项审计模式状态 ──
  const [isAuditMode, setIsAuditMode] = useState(true);
  const [auditCategory, setAuditCategory] = useState<AuditCategory>('flowers');
  const [auditGroup, setAuditGroup] = useState<AuditGroup>('flowers_tier1_all');
  const [auditWithFlowers, setAuditWithFlowers] = useState(true);
  const [flowerDecayHealth, setFlowerDecayHealth] = useState<number>(1.0);

  const switchAuditCategory = (category: AuditCategory) => {
    setAuditCategory(category);
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

        return {
          ...prev,
          candle_left: renewOrLight(prev.candle_left, 'candle'),
          candle_right: renewOrLight(prev.candle_right, 'candle'),
          censer: renewOrLight(prev.censer, 'censer'),
        } as Record<SceneItemId, SceneItem>;
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
    plum_blossoms: '傲霜寒梅',
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

    // Calculate natural position near center/front of table
    const existingOffered = Object.keys(items).filter((k) => k.startsWith('offered_flower_')).length;
    const offsetX = existingOffered === 0 ? 0 : (existingOffered % 2 === 1 ? -65 : 65);
    const offsetY = Math.min(24, 14 + (existingOffered % 4) * 3);

    const newBouquet = FloraFactory.createOfferedBouquet(
      flowerType,
      { x: offsetX, y: offsetY },
      { id: newId, name: `敬献 · ${name}` }
    );

    setItems((prev) => ({
      ...prev,
      [newId]: newBouquet,
    }));

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
    if (id.startsWith('vase_audit_flower_')) {
      const item = items[id];
      if (item && item.flowerType) {
        const meta = FLOWER_REGISTRY[item.flowerType];
        if (meta) {
          sound.playPorcelainClink();
          showToast(`🌸【${meta.name}】${meta.poeticTitle} · 名花专项审计中`);
          return;
        }
      }
    }
    if (id.startsWith('vase_audit_')) {
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
    setItems(buildInitialItems());
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

    // 计算案上黄金位置（若已有，则在案前错落排开）
    const existingFruits = Object.keys(items).filter((k) => k.startsWith('fruit_offered_')).length;
    const offsetX = existingFruits === 0 ? 0 : (existingFruits % 2 === 1 ? -150 : 150);
    const offsetY = Math.min(32, 22 + (existingFruits % 3) * 4);

    const newFruitDish = VesselFactory.createFruitPlatter(
      `offered_${Date.now()}`,
      fruitType,
      { x: offsetX, y: offsetY },
      { id: newId, name: `敬奉 · ${fruitNames[fruitType]}` }
    );

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
        {/* Left: FPS Monitor in dev mode (页面不显示主题胶囊，保持画面庄重素净) */}
        <div className="flex items-center gap-2">
          {import.meta.env.DEV && <FpsMonitor />}
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

          {/* Detailed Ambiance & Music panel button */}
          <button
            type="button"
            onClick={() => setIsLightingOpen(true)}
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

      {/* Core Simulation Stage (图 2 绝美宏伟建筑背景 + 2.5D 深度视差微动 + 写实地坪 + 极致精美供台花卉) */}
      <div 
        className="relative w-full flex-1 flex flex-col items-center justify-center overflow-hidden"
        onMouseMove={handleStageMouseMove}
        onMouseLeave={handleStageMouseLeave}
      >
        {/* Layer 1: Cathedral Window / Architectural Heritage Wood Wall (晴岚映曜宏伟殿宇木构长廊) */}
        <div 
          className="absolute inset-0 transition-transform duration-300 ease-out pointer-events-none"
          style={{
            transform: `translate3d(${parallax.x * 0.25}px, ${parallax.y * 0.25}px, 0)`,
          }}
        >
          <AltarWall
            masterOn={lighting.masterOn}
            sunlightIntensity={lighting.masterOn ? lighting.sunlightIntensity : 0.05}
            timeOfDay={lighting.timeOfDay}
            sunAngle={lighting.sunAngle}
            wallStyle={wallStyle}
          />
        </div>

        {/* Layer 2: Volumetric Rays (Tyndall Light Beams / God Rays) */}
        <VolumetricRays
          enabled={lighting.masterOn && lighting.godRaysEnabled}
          intensity={lighting.godRaysIntensity}
          sunAngle={lighting.sunAngle}
          timeOfDay={lighting.timeOfDay}
        />

        {/* Layer 3: Floating Dust Motes caught in the sunlight */}
        <DustMotes
          density={lighting.dustDensity}
          sunlightIntensity={lighting.masterOn ? lighting.sunlightIntensity : 0.15}
          windForce={lighting.windForce}
          timeOfDay={lighting.timeOfDay}
        />

        {/* Layer 4: Perspective Flooring with Marble Tile & Hardwood Planks (2D 插画写实人字拼与汉白玉大理石) */}
        <div 
          className="absolute inset-x-0 bottom-0 transition-transform duration-300 ease-out pointer-events-none"
          style={{
            transform: `translate3d(${parallax.x * 0.45}px, ${parallax.y * 0.45}px, 0)`,
          }}
        >
          <FloorPlanks lighting={lighting} floorStyle={floorStyle} />
        </div>

        {/* Layer 5: Sacred Memorial Portrait Frame (居中安放于木构长廊正前) */}
        <div 
          className="absolute top-[18%] sm:top-[20%] z-20 pointer-events-auto transition-transform duration-300 ease-out"
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

        {/* Layer 5.5: 🔍 专项审计模式控制胶囊 (居于案台上方，一键全景审计) */}
        <div className="absolute top-[26%] sm:top-[28%] z-30 flex justify-center w-full px-4 pointer-events-none">
          <div className="pointer-events-auto flex items-center flex-wrap justify-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c1917]/95 backdrop-blur-xl border border-amber-500/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-xs text-amber-100 ring-1 ring-amber-400/20 animate-in fade-in slide-in-from-top-4 max-w-[98vw]">
            <div className="flex items-center gap-1.5 font-semibold text-amber-300 font-serif mr-1">
              <span>{auditCategory === 'flowers' ? '🌸' : '🏺'}</span>
              <span>{isAuditMode ? (auditCategory === 'flowers' ? '名花专项审计' : '花器专项审计') : '常规五供陈设'}</span>
              <CinnabarSealBadge text="审计" />
            </div>

            {isAuditMode && (
              <>
                <span className="text-stone-600 hidden sm:inline">|</span>
                {/* 类别切换：名花 vs 花器 */}
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

                {/* 名花专属控制：枯荣生命周期切换 & 漫天落瓣动效 */}
                {auditCategory === 'flowers' ? (
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
                  <button
                    type="button"
                    onClick={toggleAuditFlowers}
                    className="px-2.5 py-1 rounded-full bg-amber-950/40 hover:bg-amber-900/50 text-amber-200 border border-amber-400/40 cursor-pointer transition-all active:scale-95 flex items-center gap-1 font-medium"
                    title="切换插花查看瓶口咬合深度，或看净瓶裸瓶"
                  >
                    <span>{auditWithFlowers ? '🌸 切换裸检' : '🌸 显示插花'}</span>
                  </button>
                )}
              </>
            )}

            <button
              type="button"
              onClick={toggleAuditMode}
              className="px-3 py-1 rounded-full bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 border border-amber-500/50 cursor-pointer transition-all active:scale-95 flex items-center gap-1 font-medium"
              title="切换展台模式与常规五供模式"
            >
              <span>{isAuditMode ? '🔄 恢复常规五供' : '🔍 进入专项展台'}</span>
            </button>
          </div>
        </div>

        {/* Layer 6: Altar Table with all draggable items (往背墙位置适度移入，紧贴墙体立面，更具厅堂进深感) */}
        <div 
          className="absolute bottom-22 sm:bottom-28 z-25 w-full flex justify-center px-4 transition-transform duration-300 ease-out pointer-events-none"
          style={{
            transform: `translate3d(${parallax.x * 0.85}px, ${parallax.y * 0.85}px, 0) scale(1.0)`,
            transformOrigin: '50% 90%',
          }}
        >
          <div className="pointer-events-auto w-full flex justify-center">
            <AltarTable
              items={items}
              onUpdateItemPosition={updateItemPosition}
              onToggleItemLit={toggleItemLit}
              onResetLayout={resetTableLayout}
              onRemoveItem={handleRemoveItem}
              onToggleFruit={handleToggleFruit}
              onToggleVase={handleToggleVaseStyle}
              showTableRunner={showTableRunner}
              tableclothStyle={tableclothStyle}
              showPetals={showPetals}
              lighting={lighting}
              isArrangeMode={isArrangeMode}
            />
          </div>
        </div>

        {/* Layer 7: Gentle Petal Shower upon flower offering */}
        <PetalShower activeTrigger={petalTrigger} flowerType={lastOfferedFlower} />
      </div>

      {/* Bottom Navigation Dock (reproducing user's bottom buttons: 献花 / 供果 / 点烛 / 置台 / 氛围 / 祈愿) */}
      <BottomDock
        onOpenFlowers={() => setIsFlowerOpen(true)}
        onOpenFruits={() => setIsFruitOpen(true)}
        onToggleCandles={toggleAllCandles}
        candlesLit={Boolean(items.candle_left?.isLit || items.candle_right?.isLit)}
        onToggleArrangeMode={() => setIsArrangeMode(!isArrangeMode)}
        isArrangeMode={isArrangeMode}
        onOpenLighting={() => setIsLightingOpen(true)}
        onOpenBlessing={() => setIsBlessingOpen(true)}
      />

      {/* Modals & Drawers */}

      <EnvironmentDrawer
        isOpen={isLightingOpen}
        onClose={() => setIsLightingOpen(false)}
        lighting={lighting}
        onUpdateLighting={(up) => setLighting((prev) => ({ ...prev, ...up }))}
        onToggleAllCandles={toggleAllCandles}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        showTableRunner={showTableRunner}
        tableclothStyle={tableclothStyle}
        onChangeTableclothStyle={(st) => {
          sound.playWoodPlacement();
          setTableclothStyle(st);
        }}
        floorStyle={floorStyle}
        onChangeFloorStyle={handleFloorStyleChange}
        onToggleTableRunner={() => {
          sound.playWoodPlacement();
          setShowTableRunner((v) => {
            const next = !v;
            showToast(next ? '已铺设提花织锦大桌布（整案覆盖 · 金丝流苏）' : '已收起桌布，呈现素雅纯实木案台');
            return next;
          });
        }}
        showPetals={showPetals}
        onTogglePetals={() => setShowPetals((v) => !v)}
        wallStyle={wallStyle}
        onChangeWallStyle={handleWallStyleChange}
        timeScale={timeScale}
        onUpdateTimeScale={setTimeScale}
      />

      {/* 献花控制弹窗 (献花上案 · 更换花瓶) */}
      <FlowerPickerModal
        isOpen={isFlowerOpen}
        onClose={() => setIsFlowerOpen(false)}
        onAddOfferedFlower={handleAddOfferedFlower}
        onChangeVaseFlower={handleChangeVaseFlower}
        onChangeVaseStyle={handleChangeVaseStyle}
        leftVaseFlower={items.vase_left?.flowerType || 'peonies'}
        rightVaseFlower={items.vase_right?.flowerType || 'lilies'}
        leftVaseStyle={items.vase_left?.vaseStyle || 'warm_white_plain'}
        rightVaseStyle={items.vase_right?.vaseStyle || 'painted_iris'}
        offeredCount={Object.keys(items).filter((k) => k.startsWith('offered_flower_')).length}
        onClearOfferedFlowers={handleClearOfferedFlowers}
        onFillTenFlowers={handleFillTenFlowers}
      />

      {/* 供果控制弹窗 (献果上案 · 定制左右主盘) */}
      <FruitPickerModal
        isOpen={isFruitOpen}
        onClose={() => setIsFruitOpen(false)}
        onAddOfferedFruit={handleAddOfferedFruit}
        onChangeMainFruit={handleChangeMainFruit}
        leftFruitType={items.fruit_left?.fruitType || 'apples'}
        rightFruitType={items.fruit_right?.fruitType || 'oranges'}
        offeredCount={Object.keys(items).filter((k) => k.startsWith('fruit_offered_')).length}
        onClearOfferedFruits={handleClearOfferedFruits}
      />

      <BlessingModal
        isOpen={isBlessingOpen}
        onClose={() => setIsBlessingOpen(false)}
        onSubmitBlessing={handleBlessingSubmit}
      />
    </main>
  );
}
