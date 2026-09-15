/**
 * @file registry.tsx
 * @description 鲜花花瓶注册表，映射菊花、莲花、百合、牡丹、玫瑰花卉。
 */
import React from 'react';
import { FlowerType } from '../../../types';
import { FlowerComponentProps, FallingPetalDef } from './types';
import { PeoniesFlower, PEONY_FALLING_PETALS } from './items/PeoniesFlower';
import { LiliesFlower, LILY_FALLING_PETALS } from './items/LiliesFlower';
import { LotusFlower, LOTUS_FALLING_PETALS } from './items/LotusFlower';
import { ChrysanthemumFlower, CHRYSANTHEMUM_FALLING_PETALS } from './items/ChrysanthemumFlower';
import { RosesFlower, ROSES_FALLING_PETALS } from './items/RosesFlower';

export interface FlowerMetadata {
  id: FlowerType;
  name: string;
  Component: React.FC<FlowerComponentProps>;
  fallingPetals: FallingPetalDef[];
}

export const FLOWER_REGISTRY: Record<FlowerType, FlowerMetadata> = {
  peonies: {
    id: 'peonies',
    name: '富贵牡丹',
    Component: PeoniesFlower,
    fallingPetals: PEONY_FALLING_PETALS,
  },
  lilies: {
    id: 'lilies',
    name: '清圣百合',
    Component: LiliesFlower,
    fallingPetals: LILY_FALLING_PETALS,
  },
  lotus: {
    id: 'lotus',
    name: '出尘净莲',
    Component: LotusFlower,
    fallingPetals: LOTUS_FALLING_PETALS,
  },
  chrysanthemum: {
    id: 'chrysanthemum',
    name: '岁寒金菊',
    Component: ChrysanthemumFlower,
    fallingPetals: CHRYSANTHEMUM_FALLING_PETALS,
  },
  roses: {
    id: 'roses',
    name: '长情玫瑰',
    Component: RosesFlower,
    fallingPetals: ROSES_FALLING_PETALS,
  },
};

export const getFlowerModule = (type: FlowerType): FlowerMetadata => {
  return FLOWER_REGISTRY[type] || FLOWER_REGISTRY.peonies;
};
