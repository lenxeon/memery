/**
 * @file registry.tsx
 * @description 桌布款式注册表，映射宫廷织锦、禅意粗麻、朱砂红等纹样风格。
 */
import { TableclothStyle } from '../../../types';
import { TableclothStyleModule } from './types';

import {
  autumnGoldTheme,
  AutumnGoldMotif,
  AutumnGoldCenterpiece,
  getAutumnGoldDrapePath,
} from './styles/AutumnGoldTablecloth';

import {
  indigoLinenTheme,
  IndigoLinenMotif,
  IndigoLinenCenterpiece,
  getIndigoLinenDrapePath,
} from './styles/IndigoLinenTablecloth';

import {
  cinnabarRedTheme,
  CinnabarRedMotif,
  CinnabarRedCenterpiece,
  getCinnabarRedDrapePath,
} from './styles/CinnabarRedTablecloth';

import {
  moonlightWhiteTheme,
  MoonlightWhiteMotif,
  MoonlightWhiteCenterpiece,
  getMoonlightWhiteDrapePath,
} from './styles/MoonlightWhiteTablecloth';

import {
  evergreenPineTheme,
  EvergreenPineMotif,
  EvergreenPineCenterpiece,
  getEvergreenPineDrapePath,
} from './styles/EvergreenPineTablecloth';

import {
  sandalwoodPurpleTheme,
  SandalwoodPurpleMotif,
  SandalwoodPurpleCenterpiece,
  getSandalwoodPurpleDrapePath,
} from './styles/SandalwoodPurpleTablecloth';

export const TABLECLOTH_MODULES: Record<TableclothStyle, TableclothStyleModule> = {
  autumn_gold: {
    id: 'autumn_gold',
    theme: autumnGoldTheme,
    MotifComponent: AutumnGoldMotif,
    CenterpieceComponent: AutumnGoldCenterpiece,
    getFrontDrapePath: getAutumnGoldDrapePath,
  },
  indigoLinen: {
    id: 'indigo_linen',
    theme: indigoLinenTheme,
    MotifComponent: IndigoLinenMotif,
    CenterpieceComponent: IndigoLinenCenterpiece,
    getFrontDrapePath: getIndigoLinenDrapePath,
  },
  indigo_linen: {
    id: 'indigo_linen',
    theme: indigoLinenTheme,
    MotifComponent: IndigoLinenMotif,
    CenterpieceComponent: IndigoLinenCenterpiece,
    getFrontDrapePath: getIndigoLinenDrapePath,
  },
  cinnabar_red: {
    id: 'cinnabar_red',
    theme: cinnabarRedTheme,
    MotifComponent: CinnabarRedMotif,
    CenterpieceComponent: CinnabarRedCenterpiece,
    getFrontDrapePath: getCinnabarRedDrapePath,
  },
  moonlight_white: {
    id: 'moonlight_white',
    theme: moonlightWhiteTheme,
    MotifComponent: MoonlightWhiteMotif,
    CenterpieceComponent: MoonlightWhiteCenterpiece,
    getFrontDrapePath: getMoonlightWhiteDrapePath,
  },
  evergreen_pine: {
    id: 'evergreen_pine',
    theme: evergreenPineTheme,
    MotifComponent: EvergreenPineMotif,
    CenterpieceComponent: EvergreenPineCenterpiece,
    getFrontDrapePath: getEvergreenPineDrapePath,
  },
  sandalwood_purple: {
    id: 'sandalwood_purple',
    theme: sandalwoodPurpleTheme,
    MotifComponent: SandalwoodPurpleMotif,
    CenterpieceComponent: SandalwoodPurpleCenterpiece,
    getFrontDrapePath: getSandalwoodPurpleDrapePath,
  },
};

export const getTableclothModule = (style: TableclothStyle = 'autumn_gold'): TableclothStyleModule => {
  return TABLECLOTH_MODULES[style] || TABLECLOTH_MODULES.autumn_gold;
};

export const TABLECLOTH_THEMES: Record<TableclothStyle, TableclothTheme> = {
  autumn_gold: autumnGoldTheme,
  indigo_linen: indigoLinenTheme,
  cinnabar_red: cinnabarRedTheme,
  moonlight_white: moonlightWhiteTheme,
  evergreen_pine: evergreenPineTheme,
  sandalwood_purple: sandalwoodPurpleTheme,
};

export const getFrontDrapePath = (style?: TableclothStyle | string): string => {
  return getTableclothModule(style as TableclothStyle).getFrontDrapePath();
};
