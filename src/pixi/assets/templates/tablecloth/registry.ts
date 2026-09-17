/**
 * @file registry.ts
 * @description 桌布款式注册表，映射宫廷织锦、禅意粗麻、朱砂红等纹样风格纯函数模块。
 */
import { TableclothStyle } from '../../../../types';
import { TableclothStyleModule } from './types';

import {
  autumnGoldTheme,
  renderAutumnGoldMotif,
  renderAutumnGoldCenterpiece,
  getAutumnGoldDrapePath,
} from './styles/AutumnGoldTablecloth';

import {
  indigoLinenTheme,
  renderIndigoLinenMotif,
  renderIndigoLinenCenterpiece,
  getIndigoLinenDrapePath,
} from './styles/IndigoLinenTablecloth';

import {
  cinnabarRedTheme,
  renderCinnabarRedMotif,
  renderCinnabarRedCenterpiece,
  getCinnabarRedDrapePath,
} from './styles/CinnabarRedTablecloth';

import {
  moonlightWhiteTheme,
  renderMoonlightWhiteMotif,
  renderMoonlightWhiteCenterpiece,
  getMoonlightWhiteDrapePath,
} from './styles/MoonlightWhiteTablecloth';

import {
  evergreenPineTheme,
  renderEvergreenPineMotif,
  renderEvergreenPineCenterpiece,
  getEvergreenPineDrapePath,
} from './styles/EvergreenPineTablecloth';

import {
  sandalwoodPurpleTheme,
  renderSandalwoodPurpleMotif,
  renderSandalwoodPurpleCenterpiece,
  getSandalwoodPurpleDrapePath,
} from './styles/SandalwoodPurpleTablecloth';

export const TABLECLOTH_MODULES: Record<TableclothStyle, TableclothStyleModule> = {
  autumn_gold: {
    id: 'autumn_gold',
    theme: autumnGoldTheme,
    renderMotif: renderAutumnGoldMotif,
    renderCenterpiece: renderAutumnGoldCenterpiece,
    getFrontDrapePath: getAutumnGoldDrapePath,
  },
  indigo_linen: {
    id: 'indigo_linen',
    theme: indigoLinenTheme,
    renderMotif: renderIndigoLinenMotif,
    renderCenterpiece: renderIndigoLinenCenterpiece,
    getFrontDrapePath: getIndigoLinenDrapePath,
  },
  cinnabar_red: {
    id: 'cinnabar_red',
    theme: cinnabarRedTheme,
    renderMotif: renderCinnabarRedMotif,
    renderCenterpiece: renderCinnabarRedCenterpiece,
    getFrontDrapePath: getCinnabarRedDrapePath,
  },
  moonlight_white: {
    id: 'moonlight_white',
    theme: moonlightWhiteTheme,
    renderMotif: renderMoonlightWhiteMotif,
    renderCenterpiece: renderMoonlightWhiteCenterpiece,
    getFrontDrapePath: getMoonlightWhiteDrapePath,
  },
  evergreen_pine: {
    id: 'evergreen_pine',
    theme: evergreenPineTheme,
    renderMotif: renderEvergreenPineMotif,
    renderCenterpiece: renderEvergreenPineCenterpiece,
    getFrontDrapePath: getEvergreenPineDrapePath,
  },
  sandalwood_purple: {
    id: 'sandalwood_purple',
    theme: sandalwoodPurpleTheme,
    renderMotif: renderSandalwoodPurpleMotif,
    renderCenterpiece: renderSandalwoodPurpleCenterpiece,
    getFrontDrapePath: getSandalwoodPurpleDrapePath,
  },
};

export const getTableclothModule = (style: TableclothStyle = 'autumn_gold'): TableclothStyleModule => {
  return TABLECLOTH_MODULES[style] || TABLECLOTH_MODULES.autumn_gold;
};
