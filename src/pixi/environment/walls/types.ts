/**
 * @file types.ts
 * @description 背景墙组件 Props 与样式定义。
 */
import { WallBackgroundStyle, TimeOfDay } from '../../../types';
import React from 'react';

export interface WallAmbiance {
  halo: string;
  nicheBevel: string;
  archBorder: string;
  archInner: string;
  mullion: string;
  sunOrb: string;
}

export interface WallStyleProps {
  masterOn?: boolean;
  sunlightIntensity: number;
  timeOfDay: TimeOfDay;
  sunAngle: number;
  ambiance: WallAmbiance;
}

export interface WallComponentModule {
  id: WallBackgroundStyle;
  name: string;
  poeticTitle: string;
  getAmbiance: (timeOfDay: TimeOfDay, masterOn: boolean) => WallAmbiance;
  Component: React.FC<WallStyleProps>;
  EnvironmentComponent?: React.FC<WallStyleProps>;
}
