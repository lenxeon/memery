/**
 * @file registry.tsx
 * @description 背景墙风格注册表，管理各类壁画/壁饰组件与显示名称映射。
 */
import React from 'react';
import { WallBackgroundStyle, TimeOfDay } from '../../../types';
import { WallComponentModule, WallStyleProps, WallAmbiance } from './types';

import {
  ClassicDawnWall,
  ClassicDawnDefs,
  getClassicDawnAmbiance,
} from './styles/ClassicDawnWall';
import {
  HeritageWoodWall,
  HeritageWoodDefs,
  getHeritageWoodAmbiance,
} from './styles/HeritageWoodWall';
import {
  RoyalDrapeWall,
  RoyalDrapeDefs,
  getRoyalDrapeAmbiance,
} from './styles/RoyalDrapeWall';
import {
  BronzeMirrorWall,
  BronzeMirrorDefs,
  getBronzeMirrorAmbiance,
} from './styles/BronzeMirrorWall';
import {
  BrickScreenWall,
  BrickScreenDefs,
  BrickScreenEnvironment,
  getBrickScreenAmbiance,
} from './styles/BrickScreenWall';
import {
  LotusMandorlaWall,
  LotusMandorlaDefs,
  getLotusMandorlaAmbiance,
} from './styles/LotusMandorlaWall';

export const WALL_REGISTRY: Record<WallBackgroundStyle, WallComponentModule> = {
  classic_dawn: {
    id: 'classic_dawn',
    name: '晴岚映曜',
    poeticTitle: '晨光沐影',
    getAmbiance: getClassicDawnAmbiance,
    Component: ClassicDawnWall,
  },
  heritage_wood: {
    id: 'heritage_wood',
    name: '暮林晚钟',
    poeticTitle: '沉香花格',
    getAmbiance: getHeritageWoodAmbiance,
    Component: HeritageWoodWall,
  },
  royal_drape: {
    id: 'royal_drape',
    name: '华彩生光',
    poeticTitle: '皇家帷幔',
    getAmbiance: getRoyalDrapeAmbiance,
    Component: RoyalDrapeWall,
  },
  bronze_mirror: {
    id: 'bronze_mirror',
    name: '圆满如月',
    poeticTitle: '铜镜华光',
    getAmbiance: getBronzeMirrorAmbiance,
    Component: BronzeMirrorWall,
  },
  brick_screen: {
    id: 'brick_screen',
    name: '古朴苍然',
    poeticTitle: '月洞空灵',
    getAmbiance: getBrickScreenAmbiance,
    Component: BrickScreenWall,
    EnvironmentComponent: BrickScreenEnvironment,
  },
  lotus_mandorla: {
    id: 'lotus_mandorla',
    name: '宝相庄严',
    poeticTitle: '莲台佛境',
    getAmbiance: getLotusMandorlaAmbiance,
    Component: LotusMandorlaWall,
  },
};

export const getWallModule = (style: WallBackgroundStyle): WallComponentModule => {
  return WALL_REGISTRY[style] || WALL_REGISTRY.classic_dawn;
};

export const renderWallDefs = (
  style: WallBackgroundStyle,
  timeOfDay: TimeOfDay,
  masterOn: boolean = true
): React.ReactNode => {
  switch (style) {
    case 'heritage_wood':
      return <HeritageWoodDefs timeOfDay={timeOfDay} masterOn={masterOn} />;
    case 'royal_drape':
      return <RoyalDrapeDefs timeOfDay={timeOfDay} masterOn={masterOn} />;
    case 'bronze_mirror':
      return <BronzeMirrorDefs timeOfDay={timeOfDay} />;
    case 'brick_screen':
      return <BrickScreenDefs timeOfDay={timeOfDay} />;
    case 'lotus_mandorla':
      return <LotusMandorlaDefs timeOfDay={timeOfDay} masterOn={masterOn} />;
    case 'classic_dawn':
    default:
      return <ClassicDawnDefs timeOfDay={timeOfDay} masterOn={masterOn} />;
  }
};
