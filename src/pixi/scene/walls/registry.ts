/**
 * @file registry.ts
 * @description 背景墙风格注册表，管理各类壁画/壁饰场景模块与显示名称映射。
 */
import { WallBackgroundStyle, TimeOfDay } from '../../../types';
import { WallComponentModule } from './types';

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
    renderContent: ClassicDawnWall,
    renderDefs: ClassicDawnDefs,
  },
  heritage_wood: {
    id: 'heritage_wood',
    name: '暮林晚钟',
    poeticTitle: '沉香花格',
    getAmbiance: getHeritageWoodAmbiance,
    renderContent: HeritageWoodWall,
    renderDefs: HeritageWoodDefs,
  },
  royal_drape: {
    id: 'royal_drape',
    name: '华彩生光',
    poeticTitle: '皇家帷幔',
    getAmbiance: getRoyalDrapeAmbiance,
    renderContent: RoyalDrapeWall,
    renderDefs: RoyalDrapeDefs,
  },
  bronze_mirror: {
    id: 'bronze_mirror',
    name: '圆满如月',
    poeticTitle: '铜镜华光',
    getAmbiance: getBronzeMirrorAmbiance,
    renderContent: BronzeMirrorWall,
    renderDefs: BronzeMirrorDefs,
  },
  brick_screen: {
    id: 'brick_screen',
    name: '古朴苍然',
    poeticTitle: '月洞空灵',
    getAmbiance: getBrickScreenAmbiance,
    renderContent: BrickScreenWall,
    renderDefs: BrickScreenDefs,
    renderEnvironment: BrickScreenEnvironment,
  },
  lotus_mandorla: {
    id: 'lotus_mandorla',
    name: '宝相庄严',
    poeticTitle: '莲台佛境',
    getAmbiance: getLotusMandorlaAmbiance,
    renderContent: LotusMandorlaWall,
    renderDefs: LotusMandorlaDefs,
  },
};

export const getWallModule = (style: WallBackgroundStyle): WallComponentModule => {
  return WALL_REGISTRY[style] || WALL_REGISTRY.classic_dawn;
};

/** 渲染指定风格专属的 SVG <defs> 片段 */
export const renderWallDefs = (
  style: WallBackgroundStyle,
  timeOfDay: TimeOfDay,
  masterOn: boolean = true
): string => {
  return getWallModule(style).renderDefs?.({ timeOfDay, masterOn }) ?? '';
};
