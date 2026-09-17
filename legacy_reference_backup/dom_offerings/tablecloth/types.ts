/**
 * @file types.ts
 * @description 桌布 Props 与款式定义。
 */
import React from 'react';
import { TableclothStyle } from '../../../types';

export interface TableclothTheme {
  name: string;
  materialName: string;
  textureName: string;
  weavePatternId: string;
  borderPatternId: string;
  motifType: 'peony' | 'orchid' | 'crane' | 'bamboo' | 'pine' | 'lotus';
  sheenOpacity: number;
  weaveOpacity: number;
  topGrad: [string, string, string, string];
  drapeGrad: [string, string, string, string, string];
  meanderBg: string;
  meanderStroke: string;
  pipingStroke: string;
  fringeGrad: [string, string, string];
  pendantBeadGrad: [string, string, string, string];
  cornerShadow: [string, string, string];
  hemStroke: string;
  tasselColor: {
    cord: string;
    bead: string;
    beadStroke: string;
    shadow: string;
  };
  ribbonY: number;
  ribbonH: number;
  tasselY: number;
  tasselLength: number;
  tasselWidth: number;
  motifColors: {
    primary: string;
    secondary: string;
    accent: string;
    leaf: string;
  };
}

export interface TableclothStyleModule {
  id: TableclothStyle;
  theme: TableclothTheme;
  MotifComponent: React.FC<{ theme: TableclothTheme }>;
  CenterpieceComponent: React.FC<{ theme: TableclothTheme }>;
  getFrontDrapePath: () => string;
}
