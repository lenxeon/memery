/**
 * @file types.ts
 * @description 供果盘 Props 与水果类型定义。
 */
import React from 'react';
import { FruitType } from '../../../types';

export interface FruitProps {
  scale?: number;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export interface FruitMetadata {
  id: FruitType;
  title: string;
  nextName: string;
  meaning: string;
  Component: React.FC<FruitProps>;
}

export interface FruitPlatterProps {
  fruitType?: FruitType;
  scale?: number;
  className?: string;
  onToggleFruit?: () => void;
}
