/**
 * @file index.tsx
 * @description 供果模块统一导出入口，按类型派发果品渲染。
 */
import React from 'react';
import { FruitPlatterProps } from './types';
import { getFruitModule } from './registry';

export * from './types';
export * from './BaseFruitDish';
export * from './registry';
export * from './items/ApplesFruit';
export * from './items/OrangesFruit';
export * from './items/PeachesFruit';
export * from './items/PersimmonsFruit';
export * from './items/CitronsFruit';
export * from './items/GrapesFruit';
export * from './items/PomelosFruit';
export * from './items/LongansFruit';
export * from './items/BananasFruit';
export * from './items/KumquatsFruit';
export * from './items/DragonfruitsFruit';

export const FruitDish: React.FC<FruitPlatterProps> = ({
  fruitType = 'apples',
  scale = 1,
  className = '',
  onToggleFruit,
}) => {
  const fruitModule = getFruitModule((fruitType || 'apples') as FruitType);
  const FruitComponent = fruitModule.Component;

  return (
    <FruitComponent
      scale={scale}
      className={className}
      onClick={onToggleFruit}
    />
  );
};

export const ItemFruitPlatter = FruitDish;
