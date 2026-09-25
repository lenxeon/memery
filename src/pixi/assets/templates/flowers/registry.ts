/**
 * @file registry.ts
 * @description 鲜花花卉纯 TS 模块注册表，映射 15 种传统名卉与雅供鲜花。
 */
import { FlowerType } from '../../../../types';
import { FlowerRenderProps, FallingPetalDef } from './types';

import { renderPeoniesFlower, PEONY_FALLING_PETALS } from './items/PeoniesFlower';
import { renderLiliesFlower, LILY_FALLING_PETALS } from './items/LiliesFlower';
import { renderLotusFlower, LOTUS_FALLING_PETALS } from './items/LotusFlower';
import { renderChrysanthemumFlower, CHRYSANTHEMUM_FALLING_PETALS } from './items/ChrysanthemumFlower';
import { renderRosesFlower, ROSES_FALLING_PETALS } from './items/RosesFlower';
import { renderPlumBlossomsFlower, PLUM_FALLING_PETALS } from './items/PlumBlossomsFlower';
import { renderSunflowersFlower, SUNFLOWER_FALLING_PETALS } from './items/SunflowersFlower';
import { renderCarnationsFlower, CARNATION_FALLING_PETALS } from './items/CarnationsFlower';
import { renderCallaLiliesFlower, CALLA_FALLING_PETALS } from './items/CallaLiliesFlower';
import { renderTulipsFlower, TULIP_FALLING_PETALS } from './items/TulipsFlower';
import { renderNarcissusFlower, NARCISSUS_FALLING_PETALS } from './items/NarcissusFlower';
import { renderLilyOfValleyFlower, VALLEY_FALLING_PETALS } from './items/LilyOfValleyFlower';
import { renderOrchidsFlower, ORCHID_FALLING_PETALS } from './items/OrchidsFlower';
import { renderHydrangeasFlower, HYDRANGEA_FALLING_PETALS } from './items/HydrangeasFlower';
import { renderDaisiesFlower, DAISY_FALLING_PETALS } from './items/DaisiesFlower';

export interface FlowerMetadata {
  id: FlowerType;
  name: string;
  poeticTitle: string;
  renderSvg: (props: FlowerRenderProps) => string;
  fallingPetals: FallingPetalDef[];
}

export const FLOWER_REGISTRY: Record<FlowerType, FlowerMetadata> = {
  peonies: {
    id: 'peonies',
    name: '富贵牡丹',
    poeticTitle: '国色天香',
    renderSvg: renderPeoniesFlower,
    fallingPetals: PEONY_FALLING_PETALS,
  },
  lilies: {
    id: 'lilies',
    name: '清圣百合',
    poeticTitle: '百年好合',
    renderSvg: renderLiliesFlower,
    fallingPetals: LILY_FALLING_PETALS,
  },
  lotus: {
    id: 'lotus',
    name: '出尘净莲',
    poeticTitle: '佛前清供',
    renderSvg: renderLotusFlower,
    fallingPetals: LOTUS_FALLING_PETALS,
  },
  chrysanthemum: {
    id: 'chrysanthemum',
    name: '岁寒金菊',
    poeticTitle: '延年益寿',
    renderSvg: renderChrysanthemumFlower,
    fallingPetals: CHRYSANTHEMUM_FALLING_PETALS,
  },
  roses: {
    id: 'roses',
    name: '长情玫瑰',
    poeticTitle: '真情永固',
    renderSvg: renderRosesFlower,
    fallingPetals: ROSES_FALLING_PETALS,
  },
  plum_blossoms: {
    id: 'plum_blossoms',
    name: '傲霜冷香白梅',
    poeticTitle: '清瘦孤高',
    renderSvg: renderPlumBlossomsFlower,
    fallingPetals: PLUM_FALLING_PETALS,
  },
  sunflowers: {
    id: 'sunflowers',
    name: '金色向阳',
    poeticTitle: '生生不息',
    renderSvg: renderSunflowersFlower,
    fallingPetals: SUNFLOWER_FALLING_PETALS,
  },
  carnations: {
    id: 'carnations',
    name: '慈孝康乃馨',
    poeticTitle: '春晖寸草',
    renderSvg: renderCarnationsFlower,
    fallingPetals: CARNATION_FALLING_PETALS,
  },
  calla_lilies: {
    id: 'calla_lilies',
    name: '圣洁马蹄莲',
    poeticTitle: '高雅虔心',
    renderSvg: renderCallaLiliesFlower,
    fallingPetals: CALLA_FALLING_PETALS,
  },
  tulips: {
    id: 'tulips',
    name: '典雅郁金香',
    poeticTitle: '庄重永恒',
    renderSvg: renderTulipsFlower,
    fallingPetals: TULIP_FALLING_PETALS,
  },
  narcissus: {
    id: 'narcissus',
    name: '凌波水仙',
    poeticTitle: '金盏银台',
    renderSvg: renderNarcissusFlower,
    fallingPetals: NARCISSUS_FALLING_PETALS,
  },
  lily_of_valley: {
    id: 'lily_of_valley',
    name: '如意铃兰',
    poeticTitle: '福音归来',
    renderSvg: renderLilyOfValleyFlower,
    fallingPetals: VALLEY_FALLING_PETALS,
  },
  orchids: {
    id: 'orchids',
    name: '幽谷素兰',
    poeticTitle: '君子空灵',
    renderSvg: renderOrchidsFlower,
    fallingPetals: ORCHID_FALLING_PETALS,
  },
  hydrangeas: {
    id: 'hydrangeas',
    name: '团圆绣球',
    poeticTitle: '岁岁安康',
    renderSvg: renderHydrangeasFlower,
    fallingPetals: HYDRANGEA_FALLING_PETALS,
  },
  daisies: {
    id: 'daisies',
    name: '清纯雏菊',
    poeticTitle: '纯真深念',
    renderSvg: renderDaisiesFlower,
    fallingPetals: DAISY_FALLING_PETALS,
  },
};
