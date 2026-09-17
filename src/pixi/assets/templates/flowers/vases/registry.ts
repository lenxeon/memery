/**
 * @file registry.ts
 * @description 花瓶形制注册表 (Base-Registry 扩展架构，纯 TypeScript)。
 * 统一管理 12 款独立花瓶的形制、公共接口与纯 SVG 字符串生成。
 */
import { VaseStyle, VaseItemDefinition, normalizeVaseStyle } from './types';
import { getVaseDefsSvg } from './VaseDefs';

// 导入 12 款独立花瓶定义
import { PinchedClayRuffleVase } from './items/PinchedClayRuffleVase';
import { PearlescentTurbineVase } from './items/PearlescentTurbineVase';
import { TwistedHelixTowerVase } from './items/TwistedHelixTowerVase';
import { GradientSandVolcanoVase } from './items/GradientSandVolcanoVase';
import { RibbedFlutedWhiteVase } from './items/RibbedFlutedWhiteVase';
import { OrganicTwistCreamVase } from './items/OrganicTwistCreamVase';
import { OrganicTwistRoseVase } from './items/OrganicTwistRoseVase';
import { ChiseledStoneGrayVase } from './items/ChiseledStoneGrayVase';
import { FlutedTrapezoidMiniVase } from './items/FlutedTrapezoidMiniVase';
import { FacetedGemPrismVase } from './items/FacetedGemPrismVase';
import { MelonLobedCeladonVase } from './items/MelonLobedCeladonVase';
import { MinimalDropSwanVase } from './items/MinimalDropSwanVase';

export { getVaseDefsSvg } from './VaseDefs';

/**
 * 核心花瓶映射注册表
 */
export const VASE_REGISTRY: Record<string, VaseItemDefinition> = {
  pinched_clay_ruffle: PinchedClayRuffleVase,
  pearlescent_turbine: PearlescentTurbineVase,
  twisted_helix_tower: TwistedHelixTowerVase,
  gradient_sand_volcano: GradientSandVolcanoVase,
  ribbed_fluted_white: RibbedFlutedWhiteVase,
  organic_twist_cream: OrganicTwistCreamVase,
  organic_twist_rose: OrganicTwistRoseVase,
  chiseled_stone_gray: ChiseledStoneGrayVase,
  fluted_trapezoid_mini: FlutedTrapezoidMiniVase,
  faceted_gem_prism: FacetedGemPrismVase,
  melon_lobed_celadon: MelonLobedCeladonVase,
  minimal_drop_swan: MinimalDropSwanVase,
};

/**
 * 获取标准化花瓶项目定义（自动处理历史别名并带默认值兜底）
 */
export const getVaseItem = (styleId?: VaseStyle): VaseItemDefinition => {
  const normId = normalizeVaseStyle(styleId);
  return VASE_REGISTRY[normId] || RibbedFlutedWhiteVase;
};

/**
 * 所有可用花瓶定义列表 (供设置面板展示)
 */
export const VASE_ITEMS: VaseItemDefinition[] = [
  PinchedClayRuffleVase,
  PearlescentTurbineVase,
  TwistedHelixTowerVase,
  GradientSandVolcanoVase,
  RibbedFlutedWhiteVase,
  OrganicTwistCreamVase,
  OrganicTwistRoseVase,
  ChiseledStoneGrayVase,
  FlutedTrapezoidMiniVase,
  FacetedGemPrismVase,
  MelonLobedCeladonVase,
  MinimalDropSwanVase,
];

/**
 * 渲染花瓶瓶口后唇与暗槽纯 SVG 字符串
 */
export const renderVaseMouthBack = (styleId?: VaseStyle): string => {
  const item = getVaseItem(styleId);
  return item.renderMouthBack();
};

/**
 * 渲染花瓶瓶身主体与前唇纯 SVG 字符串
 */
export const renderVaseBody = (styleId?: VaseStyle): string => {
  const item = getVaseItem(styleId);
  return item.renderBody();
};
