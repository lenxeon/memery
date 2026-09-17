/**
 * @file registry.tsx
 * @description 鲜花花瓶注册表，映射15种一眼可辨的传统名卉与雅供鲜花。
 */
import React from 'react';
import { FlowerType } from '../../../types';
import { FlowerComponentProps, FallingPetalDef } from './types';
import { PeoniesFlower, PEONY_FALLING_PETALS } from './items/PeoniesFlower';
import { LiliesFlower, LILY_FALLING_PETALS } from './items/LiliesFlower';
import { LotusFlower, LOTUS_FALLING_PETALS } from './items/LotusFlower';
import { ChrysanthemumFlower, CHRYSANTHEMUM_FALLING_PETALS } from './items/ChrysanthemumFlower';
import { RosesFlower, ROSES_FALLING_PETALS } from './items/RosesFlower';
import { PlumBlossomsFlower, PLUM_FALLING_PETALS } from './items/PlumBlossomsFlower';
import { SunflowersFlower, SUNFLOWER_FALLING_PETALS } from './items/SunflowersFlower';
import { CarnationsFlower, CARNATION_FALLING_PETALS } from './items/CarnationsFlower';
import { CallaLiliesFlower, CALLA_FALLING_PETALS } from './items/CallaLiliesFlower';
import { TulipsFlower, TULIP_FALLING_PETALS } from './items/TulipsFlower';
import { NarcissusFlower, NARCISSUS_FALLING_PETALS } from './items/NarcissusFlower';
import { LilyOfValleyFlower, VALLEY_FALLING_PETALS } from './items/LilyOfValleyFlower';
import { OrchidsFlower, ORCHID_FALLING_PETALS } from './items/OrchidsFlower';
import { HydrangeasFlower, HYDRANGEA_FALLING_PETALS } from './items/HydrangeasFlower';
import { DaisiesFlower, DAISY_FALLING_PETALS } from './items/DaisiesFlower';

export interface FlowerMetadata {
  id: FlowerType;
  name: string;
  poeticTitle: string;
  Component: React.FC<FlowerComponentProps>;
  fallingPetals: FallingPetalDef[];
}

export const FLOWER_REGISTRY: Record<FlowerType, FlowerMetadata> = {
  peonies: {
    id: 'peonies',
    name: '富贵牡丹',
    poeticTitle: '国色天香',
    Component: PeoniesFlower,
    fallingPetals: PEONY_FALLING_PETALS,
  },
  lilies: {
    id: 'lilies',
    name: '清圣百合',
    poeticTitle: '百年好合',
    Component: LiliesFlower,
    fallingPetals: LILY_FALLING_PETALS,
  },
  lotus: {
    id: 'lotus',
    name: '出尘净莲',
    poeticTitle: '佛前清供',
    Component: LotusFlower,
    fallingPetals: LOTUS_FALLING_PETALS,
  },
  chrysanthemum: {
    id: 'chrysanthemum',
    name: '岁寒金菊',
    poeticTitle: '延年益寿',
    Component: ChrysanthemumFlower,
    fallingPetals: CHRYSANTHEMUM_FALLING_PETALS,
  },
  roses: {
    id: 'roses',
    name: '长情玫瑰',
    poeticTitle: '真情永固',
    Component: RosesFlower,
    fallingPetals: ROSES_FALLING_PETALS,
  },
  plum_blossoms: {
    id: 'plum_blossoms',
    name: '傲霜冷香白梅',
    poeticTitle: '清瘦孤高',
    Component: PlumBlossomsFlower,
    fallingPetals: PLUM_FALLING_PETALS,
  },
  sunflowers: {
    id: 'sunflowers',
    name: '金色向阳',
    poeticTitle: '生生不息',
    Component: SunflowersFlower,
    fallingPetals: SUNFLOWER_FALLING_PETALS,
  },
  carnations: {
    id: 'carnations',
    name: '慈孝康乃馨',
    poeticTitle: '春晖寸草',
    Component: CarnationsFlower,
    fallingPetals: CARNATION_FALLING_PETALS,
  },
  calla_lilies: {
    id: 'calla_lilies',
    name: '圣洁马蹄莲',
    poeticTitle: '高雅虔心',
    Component: CallaLiliesFlower,
    fallingPetals: CALLA_FALLING_PETALS,
  },
  tulips: {
    id: 'tulips',
    name: '典雅郁金香',
    poeticTitle: '庄重永恒',
    Component: TulipsFlower,
    fallingPetals: TULIP_FALLING_PETALS,
  },
  narcissus: {
    id: 'narcissus',
    name: '凌波水仙',
    poeticTitle: '金盏银台',
    Component: NarcissusFlower,
    fallingPetals: NARCISSUS_FALLING_PETALS,
  },
  lily_of_valley: {
    id: 'lily_of_valley',
    name: '如意铃兰',
    poeticTitle: '福音归来',
    Component: LilyOfValleyFlower,
    fallingPetals: VALLEY_FALLING_PETALS,
  },
  orchids: {
    id: 'orchids',
    name: '幽谷素兰',
    poeticTitle: '君子空灵',
    Component: OrchidsFlower,
    fallingPetals: ORCHID_FALLING_PETALS,
  },
  hydrangeas: {
    id: 'hydrangeas',
    name: '团圆绣球',
    poeticTitle: '岁岁安康',
    Component: HydrangeasFlower,
    fallingPetals: HYDRANGEA_FALLING_PETALS,
  },
  daisies: {
    id: 'daisies',
    name: '清纯雏菊',
    poeticTitle: '纯真深念',
    Component: DaisiesFlower,
    fallingPetals: DAISY_FALLING_PETALS,
  },
};

export const getFlowerModule = (type: FlowerType): FlowerMetadata => {
  return FLOWER_REGISTRY[type] || FLOWER_REGISTRY.peonies;
};
