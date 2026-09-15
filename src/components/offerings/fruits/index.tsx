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

export const FruitDish: React.FC<FruitPlatterProps> = ({
  fruitType = 'apples',
  scale = 1,
  className = '',
  onToggleFruit,
}) => {
  const fruitModule = getFruitModule(fruitType);
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
