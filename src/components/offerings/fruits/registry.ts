/**
 * @file registry.ts
 * @description 供果组件注册表，映射苹果、寿桃、甜橙等多品类水果。
 */
import { FruitType } from '../../../types';
import { FruitMetadata } from './types';
import { ApplesFruit } from './items/ApplesFruit';
import { OrangesFruit } from './items/OrangesFruit';
import { PeachesFruit } from './items/PeachesFruit';

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
    nextName: '平安苹果',
    meaning: '福寿延绵',
    Component: PeachesFruit,
  },
};

export const getFruitModule = (type: FruitType): FruitMetadata => {
  return FRUIT_REGISTRY[type] || FRUIT_REGISTRY.apples;
};
