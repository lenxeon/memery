/**
 * @file registry.ts
 * @description 花瓶形制注册表 (Base-Registry 扩展架构，纯 TypeScript)。
 * 统一管理独立花瓶的形制、公共接口与纯 SVG 字符串生成。
 */
import { VaseStyle, VaseItemDefinition, normalizeVaseStyle } from './types';
import { getVaseDefsSvg } from './VaseDefs';

// 导入独立花瓶定义
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
import { MoonWhiteOrbVase } from './items/MoonWhiteOrbVase';
import { InkBlackMeipingVase } from './items/InkBlackMeipingVase';
import { RuCeladonCongVase } from './items/RuCeladonCongVase';
import { TeaWhiteShoulderVase } from './items/TeaWhiteShoulderVase';
import { TangSancaiPhoenixVase } from './items/TangSancaiPhoenixVase';
import { ShangBronzeGuVase } from './items/ShangBronzeGuVase';
import { WarringTurquoiseFangVase } from './items/WarringTurquoiseFangVase';
import { BlueRedDoubleGourdVase } from './items/BlueRedDoubleGourdVase';
import { WesternZhouHeZunVase } from './items/WesternZhouHeZunVase';
import { WesternZhouLiGuiVase } from './items/WesternZhouLiGuiVase';
import { WesternZhouElephantVase } from './items/WesternZhouElephantVase';
import { QinChariotCanopyVase } from './items/QinChariotCanopyVase';
import { QinPaintedArmorVase } from './items/QinPaintedArmorVase';
import { QinBronzeCraneVase } from './items/QinBronzeCraneVase';
import { SuiDoubleDragonLinkedVase } from './items/SuiDoubleDragonLinkedVase';
import { SuiLotusPanmouthVase } from './items/SuiLotusPanmouthVase';
import { SuiWhiteChickenHeadVase } from './items/SuiWhiteChickenHeadVase';
import { TangSecretCeladonOctagonalVase } from './items/TangSecretCeladonOctagonalVase';
import { TangLushanSplashedGlazeVase } from './items/TangLushanSplashedGlazeVase';
import { TangChangshaBirdEwerVase } from './items/TangChangshaBirdEwerVase';
import { SongJunMoonWhiteVase } from './items/SongJunMoonWhiteVase';
import { SongYaozhouCarvedPeonyVase } from './items/SongYaozhouCarvedPeonyVase';
import { SongCizhouBlackCarvedYuhuchunVase } from './items/SongCizhouBlackCarvedYuhuchunVase';
import { MingXuandeLobedBlueWhiteVase } from './items/MingXuandeLobedBlueWhiteVase';
import { MingZhengdeRingHandleBlueWhiteVase } from './items/MingZhengdeRingHandleBlueWhiteVase';
import { MingJingtaiCloisonneLotusBottle } from './items/MingJingtaiCloisonneLotusBottle';

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
  moon_white_orb: MoonWhiteOrbVase,
  ink_black_meiping: InkBlackMeipingVase,
  ru_celadon_cong: RuCeladonCongVase,
  tea_white_shoulder: TeaWhiteShoulderVase,
  tang_sancai_phoenix: TangSancaiPhoenixVase,
  shang_bronze_gu: ShangBronzeGuVase,
  warring_turquoise_fang: WarringTurquoiseFangVase,
  blue_red_double_gourd: BlueRedDoubleGourdVase,
  western_zhou_he_zun: WesternZhouHeZunVase,
  western_zhou_li_gui: WesternZhouLiGuiVase,
  western_zhou_elephant: WesternZhouElephantVase,
  qin_chariot_canopy: QinChariotCanopyVase,
  qin_painted_armor: QinPaintedArmorVase,
  qin_bronze_crane: QinBronzeCraneVase,
  sui_double_dragon_linked: SuiDoubleDragonLinkedVase,
  sui_lotus_panmouth: SuiLotusPanmouthVase,
  sui_white_chicken_head: SuiWhiteChickenHeadVase,
  tang_secret_celadon_octagonal: TangSecretCeladonOctagonalVase,
  tang_lushan_splashed_glaze: TangLushanSplashedGlazeVase,
  tang_changsha_bird_ewer: TangChangshaBirdEwerVase,
  song_jun_moon_white: SongJunMoonWhiteVase,
  song_yaozhou_carved_peony: SongYaozhouCarvedPeonyVase,
  song_cizhou_black_carved_yuhuchun: SongCizhouBlackCarvedYuhuchunVase,
  ming_xuande_lobed_blue_white: MingXuandeLobedBlueWhiteVase,
  ming_zhengde_ring_handle_blue_white: MingZhengdeRingHandleBlueWhiteVase,
  ming_jingtai_cloisonne_lotus_bottle: MingJingtaiCloisonneLotusBottle,
};

/**
 * 获取标准化花瓶项目定义（自动处理历史别名并带默认值兜底）
 */
export const getVaseItem = (styleId?: VaseStyle): VaseItemDefinition => {
  const normId = normalizeVaseStyle(styleId);
  return VASE_REGISTRY[normId] || RibbedFlutedWhiteVase;
};



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
