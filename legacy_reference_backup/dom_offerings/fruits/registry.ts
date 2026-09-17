/**
 * @file registry.ts
 * @description 供果组件注册表，映射苹果、蜜柑、仙桃、丹柿、佛手、葡萄、黄瓜、西瓜、椰子、李子、山竹、凤梨、芒果等十八品类传统与时令吉祥供果。
 */
import { FruitType } from '../../../types';
import { FruitMetadata } from './types';
import { ApplesFruit } from './items/ApplesFruit';
import { OrangesFruit } from './items/OrangesFruit';
import { PeachesFruit } from './items/PeachesFruit';
import { PersimmonsFruit } from './items/PersimmonsFruit';
import { CitronsFruit } from './items/CitronsFruit';
import { GrapesFruit } from './items/GrapesFruit';
import { PomelosFruit } from './items/PomelosFruit';
import { LongansFruit } from './items/LongansFruit';
import { BananasFruit } from './items/BananasFruit';
import { KumquatsFruit } from './items/KumquatsFruit';
import { DragonfruitsFruit } from './items/DragonfruitsFruit';
import { CucumbersFruit } from './items/CucumbersFruit';
import { WatermelonsFruit } from './items/WatermelonsFruit';
import { CoconutsFruit } from './items/CoconutsFruit';
import { PlumsFruit } from './items/PlumsFruit';
import { MangosteensFruit } from './items/MangosteensFruit';
import { PineapplesFruit } from './items/PineapplesFruit';
import { PearsFruit } from './items/PearsFruit';

export const FRUIT_REGISTRY: Record<FruitType, FruitMetadata> = {
  apples: {
    id: 'apples',
    title: '清雅供果 · 苹果（岁岁平安）',
    nextName: '吉祥蜜柑',
    meaning: '岁岁平安',
    Component: ApplesFruit,
  },
  oranges: {
    id: 'oranges',
    title: '吉庆供果 · 蜜桔（大吉大利）',
    nextName: '福寿仙桃',
    meaning: '大吉大利',
    Component: OrangesFruit,
  },
  peaches: {
    id: 'peaches',
    title: '寿考供果 · 仙桃（福寿延绵）',
    nextName: '如意丹柿',
    meaning: '福寿延绵',
    Component: PeachesFruit,
  },
  persimmons: {
    id: 'persimmons',
    title: '如意供果 · 丹柿（事事如意）',
    nextName: '禅意佛手',
    meaning: '事事如意',
    Component: PersimmonsFruit,
  },
  citrons: {
    id: 'citrons',
    title: '清供圣果 · 佛手（福寿双全）',
    nextName: '阳光玫瑰',
    meaning: '福寿双全',
    Component: CitronsFruit,
  },
  grapes: {
    id: 'grapes',
    title: '清雅供果 · 青提（阳光玫瑰）',
    nextName: '黄金蜜柚',
    meaning: '生机常青',
    Component: GrapesFruit,
  },
  pomelos: {
    id: 'pomelos',
    title: '吉祥供果 · 金柚（保佑平安）',
    nextName: '富贵龙眼',
    meaning: '保佑平安',
    Component: PomelosFruit,
  },
  longans: {
    id: 'longans',
    title: '富贵供果 · 龙眼（团圆吉庆）',
    nextName: '招财金蕉',
    meaning: '富贵团圆',
    Component: LongansFruit,
  },
  bananas: {
    id: 'bananas',
    title: '招财供果 · 香蕉（金条纳福）',
    nextName: '翡翠青桔',
    meaning: '招财进宝',
    Component: BananasFruit,
  },
  kumquats: {
    id: 'kumquats',
    title: '清雅供果 · 青桔（青云直上）',
    nextName: '红运火龙果',
    meaning: '青云直上',
    Component: KumquatsFruit,
  },
  dragonfruits: {
    id: 'dragonfruits',
    title: '祥瑞供果 · 火龙果（鸿运当头）',
    nextName: '翠玉黄瓜',
    meaning: '鸿运当头',
    Component: DragonfruitsFruit,
  },
  cucumbers: {
    id: 'cucumbers',
    title: '清雅时果 · 黄瓜（顺遂如意）',
    nextName: '盛夏西瓜',
    meaning: '飞黄腾达',
    Component: CucumbersFruit,
  },
  watermelons: {
    id: 'watermelons',
    title: '盛夏甘霖 · 西瓜（硕果红运）',
    nextName: '南国椰子',
    meaning: '硕果累累',
    Component: WatermelonsFruit,
  },
  coconuts: {
    id: 'coconuts',
    title: '南国瑞果 · 椰子（清吉长寿）',
    nextName: '金玉蜂糖李',
    meaning: '清吉长寿',
    Component: CoconutsFruit,
  },
  plums: {
    id: 'plums',
    title: '清供名果 · 蜂糖李（甜甜蜜蜜）',
    nextName: '果后山竹',
    meaning: '甜甜蜜蜜',
    Component: PlumsFruit,
  },
  mangosteens: {
    id: 'mangosteens',
    title: '清供名果 · 山竹（冰清玉洁）',
    nextName: '好运凤梨',
    meaning: '冰清玉洁',
    Component: MangosteensFruit,
  },
  pineapples: {
    id: 'pineapples',
    title: '祥瑞金果 · 凤梨（好运旺来）',
    nextName: '金秋秋月梨',
    meaning: '好运旺来',
    Component: PineapplesFruit,
  },
  pears: {
    id: 'pears',
    title: '金秋瑞果 · 秋月梨（花好月圆）',
    nextName: '平安红苹果',
    meaning: '花好月圆',
    Component: PearsFruit,
  },
};

export const getFruitModule = (type: FruitType): FruitMetadata => {
  return FRUIT_REGISTRY[type] || FRUIT_REGISTRY.apples;
};
