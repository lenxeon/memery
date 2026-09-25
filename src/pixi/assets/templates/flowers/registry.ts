/**
 * @file registry.ts
 * @description 鲜花花卉纯 TS 模块注册表，映射 49 种东方传统名卉与雅供鲜花。
 */
import { FlowerType } from '../../../../types';
import { FlowerRenderProps, FallingPetalDef } from './types';

import { renderPeoniesFlower, PEONY_FALLING_PETALS } from './items/PeoniesFlower';
import { renderLiliesFlower, LILY_FALLING_PETALS } from './items/LiliesFlower';
import { renderLotusFlower, LOTUS_FALLING_PETALS } from './items/LotusFlower';
import { renderChrysanthemumFlower, CHRYSANTHEMUM_FALLING_PETALS } from './items/ChrysanthemumFlower';
import { renderRosesFlower, ROSES_FALLING_PETALS } from './items/RosesFlower';
import { renderPlumBlossomsFlower, PLUM_FALLING_PETALS } from './items/PlumBlossomsFlower';
import { renderSunflowersFlower, SUNFLOWER_FALLING_PETALS } from './items/SunflowersFlower';
import { renderCarnationsFlower, CARNATION_FALLING_PETALS } from './items/CarnationsFlower';
import { renderCallaLiliesFlower, CALLA_FALLING_PETALS } from './items/CallaLiliesFlower';
import { renderTulipsFlower, TULIP_FALLING_PETALS } from './items/TulipsFlower';
import { renderNarcissusFlower, NARCISSUS_FALLING_PETALS } from './items/NarcissusFlower';
import { renderLilyOfValleyFlower, VALLEY_FALLING_PETALS } from './items/LilyOfValleyFlower';
import { renderOrchidsFlower, ORCHID_FALLING_PETALS } from './items/OrchidsFlower';
import { renderHydrangeasFlower, HYDRANGEA_FALLING_PETALS } from './items/HydrangeasFlower';
import { renderDaisiesFlower, DAISY_FALLING_PETALS } from './items/DaisiesFlower';
import { renderWintersweetFlower, WINTERSWEET_FALLING_PETALS } from './items/WintersweetFlower';
import { renderMagnoliaFlower, MAGNOLIA_FALLING_PETALS } from './items/MagnoliaFlower';
import { renderPeachBlossomsFlower, PEACH_BLOSSOM_FALLING_PETALS } from './items/PeachBlossomsFlower';
import { renderApricotBlossomsFlower, APRICOT_BLOSSOM_FALLING_PETALS } from './items/ApricotBlossomsFlower';
import { renderPearBlossomsFlower, PEAR_BLOSSOM_FALLING_PETALS } from './items/PearBlossomsFlower';
import { renderCrabappleBlossomsFlower, CRABAPPLE_FALLING_PETALS } from './items/CrabappleBlossomsFlower';
import { renderCamelliasFlower, CAMELLIA_FALLING_PETALS } from './items/CamelliasFlower';
import { renderAzaleasFlower, AZALEA_FALLING_PETALS } from './items/AzaleasFlower';
import { renderKerriaFlower, KERRIA_FALLING_PETALS } from './items/KerriaFlower';
import { renderHibiscusMutabilisFlower, HIBISCUS_MUTABILIS_FALLING_PETALS } from './items/HibiscusMutabilisFlower';
import { renderIrisesFlower, IRIS_FALLING_PETALS } from './items/IrisesFlower';
import { renderCliviaFlower, CLIVIA_FALLING_PETALS } from './items/CliviaFlower';
import { renderWisteriaFlower, WISTERIA_FALLING_PETALS } from './items/WisteriaFlower';
import { renderTrumpetCreeperFlower, TRUMPET_CREEPER_FALLING_PETALS } from './items/TrumpetCreeperFlower';
import { renderMorningGloriesFlower, MORNING_GLORY_FALLING_PETALS } from './items/MorningGloriesFlower';
import { renderHoneysuckleFlower, HONEYSUCKLE_FALLING_PETALS } from './items/HoneysuckleFlower';
import { renderWinterJasmineFlower, WINTER_JASMINE_FALLING_PETALS } from './items/WinterJasmineFlower';
import { renderOsmanthusFlower, OSMANTHUS_FALLING_PETALS } from './items/OsmanthusFlower';
import { renderCrapeMyrtleFlower, CRAPE_MYRTLE_FALLING_PETALS } from './items/CrapeMyrtleFlower';
import { renderGlobeAmaranthFlower, GLOBE_AMARANTH_FALLING_PETALS } from './items/GlobeAmaranthFlower';
import { renderGardeniasFlower, GARDENIA_FALLING_PETALS } from './items/GardeniasFlower';
import { renderJasmineFlower, JASMINE_FALLING_PETALS } from './items/JasmineFlower';
import { renderBalloonFlowersFlower, BALLOON_FLOWER_FALLING_PETALS } from './items/BalloonFlowersFlower';
import { renderDayliliesFlower, DAYLILY_FALLING_PETALS } from './items/DayliliesFlower';
import { renderHostasFlower, HOSTA_FALLING_PETALS } from './items/HostasFlower';
import { renderImpatiensFlower, IMPATIENS_FALLING_PETALS } from './items/ImpatiensFlower';
import { renderHollyhocksFlower, HOLLYHOCK_FALLING_PETALS } from './items/HollyhocksFlower';
import { renderPomegranateBlossomsFlower, POMEGRANATE_BLOSSOM_FALLING_PETALS } from './items/PomegranateBlossomsFlower';
import { renderChineseHibiscusFlower, CHINESE_HIBISCUS_FALLING_PETALS } from './items/ChineseHibiscusFlower';
import { renderCockscombFlower, COCKSCOMB_FALLING_PETALS } from './items/CockscombFlower';
import { renderPoppiesFlower, POPPY_FALLING_PETALS } from './items/PoppiesFlower';
import { renderEpiphyllumFlower, EPIPHYLLUM_FALLING_PETALS } from './items/EpiphyllumFlower';
import { renderSpiderLiliesFlower, SPIDER_LILY_FALLING_PETALS } from './items/SpiderLiliesFlower';
import { renderRedbudsFlower, REDBUD_FALLING_PETALS } from './items/RedbudsFlower';

export interface FlowerMetadata {
  id: FlowerType;
  name: string;
  poeticTitle: string;
  renderSvg: (props: FlowerRenderProps) => string;
  fallingPetals: FallingPetalDef[];
}

export const FLOWER_REGISTRY: Record<FlowerType, FlowerMetadata> = {
  peonies: {
    id: 'peonies',
    name: '富贵牡丹',
    poeticTitle: '国色天香',
    renderSvg: renderPeoniesFlower,
    fallingPetals: PEONY_FALLING_PETALS,
  },
  lilies: {
    id: 'lilies',
    name: '清圣百合',
    poeticTitle: '百年好合',
    renderSvg: renderLiliesFlower,
    fallingPetals: LILY_FALLING_PETALS,
  },
  lotus: {
    id: 'lotus',
    name: '出尘净莲',
    poeticTitle: '佛前清供',
    renderSvg: renderLotusFlower,
    fallingPetals: LOTUS_FALLING_PETALS,
  },
  chrysanthemum: {
    id: 'chrysanthemum',
    name: '岁寒金菊',
    poeticTitle: '延年益寿',
    renderSvg: renderChrysanthemumFlower,
    fallingPetals: CHRYSANTHEMUM_FALLING_PETALS,
  },
  roses: {
    id: 'roses',
    name: '长情玫瑰',
    poeticTitle: '真情永固',
    renderSvg: renderRosesFlower,
    fallingPetals: ROSES_FALLING_PETALS,
  },
  plum_blossoms: {
    id: 'plum_blossoms',
    name: '傲霜冷香白梅',
    poeticTitle: '清瘦孤高',
    renderSvg: renderPlumBlossomsFlower,
    fallingPetals: PLUM_FALLING_PETALS,
  },
  sunflowers: {
    id: 'sunflowers',
    name: '金色向阳',
    poeticTitle: '生生不息',
    renderSvg: renderSunflowersFlower,
    fallingPetals: SUNFLOWER_FALLING_PETALS,
  },
  carnations: {
    id: 'carnations',
    name: '慈孝康乃馨',
    poeticTitle: '春晖寸草',
    renderSvg: renderCarnationsFlower,
    fallingPetals: CARNATION_FALLING_PETALS,
  },
  calla_lilies: {
    id: 'calla_lilies',
    name: '圣洁马蹄莲',
    poeticTitle: '高雅虔心',
    renderSvg: renderCallaLiliesFlower,
    fallingPetals: CALLA_FALLING_PETALS,
  },
  tulips: {
    id: 'tulips',
    name: '典雅郁金香',
    poeticTitle: '庄重永恒',
    renderSvg: renderTulipsFlower,
    fallingPetals: TULIP_FALLING_PETALS,
  },
  narcissus: {
    id: 'narcissus',
    name: '凌波水仙',
    poeticTitle: '金盏银台',
    renderSvg: renderNarcissusFlower,
    fallingPetals: NARCISSUS_FALLING_PETALS,
  },
  lily_of_valley: {
    id: 'lily_of_valley',
    name: '如意铃兰',
    poeticTitle: '福音归来',
    renderSvg: renderLilyOfValleyFlower,
    fallingPetals: VALLEY_FALLING_PETALS,
  },
  orchids: {
    id: 'orchids',
    name: '幽谷素兰',
    poeticTitle: '君子空灵',
    renderSvg: renderOrchidsFlower,
    fallingPetals: ORCHID_FALLING_PETALS,
  },
  hydrangeas: {
    id: 'hydrangeas',
    name: '团圆绣球',
    poeticTitle: '岁岁安康',
    renderSvg: renderHydrangeasFlower,
    fallingPetals: HYDRANGEA_FALLING_PETALS,
  },
  daisies: {
    id: 'daisies',
    name: '清纯雏菊',
    poeticTitle: '纯真深念',
    renderSvg: renderDaisiesFlower,
    fallingPetals: DAISY_FALLING_PETALS,
  },
  wintersweet: {
    id: 'wintersweet', name: '凌寒腊梅', poeticTitle: '蜡蕊凝香',
    renderSvg: renderWintersweetFlower, fallingPetals: WINTERSWEET_FALLING_PETALS,
  },
  magnolia: {
    id: 'magnolia', name: '玉盏玉兰', poeticTitle: '霓裳片片',
    renderSvg: renderMagnoliaFlower, fallingPetals: MAGNOLIA_FALLING_PETALS,
  },
  peach_blossoms: {
    id: 'peach_blossoms', name: '灼灼桃花', poeticTitle: '桃之夭夭',
    renderSvg: renderPeachBlossomsFlower, fallingPetals: PEACH_BLOSSOM_FALLING_PETALS,
  },
  apricot_blossoms: {
    id: 'apricot_blossoms', name: '春雨杏花', poeticTitle: '杏林春暖',
    renderSvg: renderApricotBlossomsFlower, fallingPetals: APRICOT_BLOSSOM_FALLING_PETALS,
  },
  pear_blossoms: {
    id: 'pear_blossoms', name: '晴雪梨花', poeticTitle: '一枝春雪',
    renderSvg: renderPearBlossomsFlower, fallingPetals: PEAR_BLOSSOM_FALLING_PETALS,
  },
  crabapple_blossoms: {
    id: 'crabapple_blossoms', name: '垂丝海棠', poeticTitle: '花中神仙',
    renderSvg: renderCrabappleBlossomsFlower, fallingPetals: CRABAPPLE_FALLING_PETALS,
  },
  camellias: {
    id: 'camellias', name: '丹华山茶', poeticTitle: '雪里开花',
    renderSvg: renderCamelliasFlower, fallingPetals: CAMELLIA_FALLING_PETALS,
  },
  azaleas: {
    id: 'azaleas', name: '映山杜鹃', poeticTitle: '春山如染',
    renderSvg: renderAzaleasFlower, fallingPetals: AZALEA_FALLING_PETALS,
  },
  kerria: {
    id: 'kerria', name: '金玉棣棠', poeticTitle: '满庭金蕊',
    renderSvg: renderKerriaFlower, fallingPetals: KERRIA_FALLING_PETALS,
  },
  hibiscus_mutabilis: {
    id: 'hibiscus_mutabilis', name: '照水芙蓉', poeticTitle: '一日三醉',
    renderSvg: renderHibiscusMutabilisFlower, fallingPetals: HIBISCUS_MUTABILIS_FALLING_PETALS,
  },
  irises: {
    id: 'irises', name: '蝶影鸢尾', poeticTitle: '紫翼流金',
    renderSvg: renderIrisesFlower, fallingPetals: IRIS_FALLING_PETALS,
  },
  clivia: {
    id: 'clivia', name: '丹霞君子兰', poeticTitle: '君子谦谦',
    renderSvg: renderCliviaFlower, fallingPetals: CLIVIA_FALLING_PETALS,
  },
  wisteria: {
    id: 'wisteria', name: '垂云紫藤', poeticTitle: '紫气东来',
    renderSvg: renderWisteriaFlower, fallingPetals: WISTERIA_FALLING_PETALS,
  },
  trumpet_creeper: {
    id: 'trumpet_creeper', name: '凌云霄花', poeticTitle: '赤焰凌云',
    renderSvg: renderTrumpetCreeperFlower, fallingPetals: TRUMPET_CREEPER_FALLING_PETALS,
  },
  morning_glories: {
    id: 'morning_glories', name: '晨露牵牛', poeticTitle: '碧蔓晓妆',
    renderSvg: renderMorningGloriesFlower, fallingPetals: MORNING_GLORY_FALLING_PETALS,
  },
  honeysuckle: {
    id: 'honeysuckle', name: '金银忍冬', poeticTitle: '双花守望',
    renderSvg: renderHoneysuckleFlower, fallingPetals: HONEYSUCKLE_FALLING_PETALS,
  },
  winter_jasmine: {
    id: 'winter_jasmine', name: '金英迎春', poeticTitle: '一枝报岁',
    renderSvg: renderWinterJasmineFlower, fallingPetals: WINTER_JASMINE_FALLING_PETALS,
  },
  osmanthus: {
    id: 'osmanthus', name: '月宫金桂', poeticTitle: '折桂流芳',
    renderSvg: renderOsmanthusFlower, fallingPetals: OSMANTHUS_FALLING_PETALS,
  },
  crape_myrtle: {
    id: 'crape_myrtle', name: '百日紫薇', poeticTitle: '繁英长放',
    renderSvg: renderCrapeMyrtleFlower, fallingPetals: CRAPE_MYRTLE_FALLING_PETALS,
  },
  globe_amaranth: {
    id: 'globe_amaranth', name: '千日红', poeticTitle: '千日不凋',
    renderSvg: renderGlobeAmaranthFlower, fallingPetals: GLOBE_AMARANTH_FALLING_PETALS,
  },
  gardenias: {
    id: 'gardenias', name: '玉雪栀子', poeticTitle: '清芬守候',
    renderSvg: renderGardeniasFlower, fallingPetals: GARDENIA_FALLING_PETALS,
  },
  jasmine: {
    id: 'jasmine', name: '素馨茉莉', poeticTitle: '人间第一香',
    renderSvg: renderJasmineFlower, fallingPetals: JASMINE_FALLING_PETALS,
  },
  balloon_flowers: {
    id: 'balloon_flowers', name: '青蓝桔梗', poeticTitle: '丹心如故',
    renderSvg: renderBalloonFlowersFlower, fallingPetals: BALLOON_FLOWER_FALLING_PETALS,
  },
  daylilies: {
    id: 'daylilies', name: '忘忧萱草', poeticTitle: '椿萱并茂',
    renderSvg: renderDayliliesFlower, fallingPetals: DAYLILY_FALLING_PETALS,
  },
  hostas: {
    id: 'hostas', name: '月下玉簪', poeticTitle: '瑶簪坠露',
    renderSvg: renderHostasFlower, fallingPetals: HOSTA_FALLING_PETALS,
  },
  impatiens: {
    id: 'impatiens', name: '染甲凤仙', poeticTitle: '金凤衔珠',
    renderSvg: renderImpatiensFlower, fallingPetals: IMPATIENS_FALLING_PETALS,
  },
  hollyhocks: {
    id: 'hollyhocks', name: '锦塔蜀葵', poeticTitle: '步步花开',
    renderSvg: renderHollyhocksFlower, fallingPetals: HOLLYHOCK_FALLING_PETALS,
  },
  pomegranate_blossoms: {
    id: 'pomegranate_blossoms', name: '榴火石榴花', poeticTitle: '榴开百子',
    renderSvg: renderPomegranateBlossomsFlower, fallingPetals: POMEGRANATE_BLOSSOM_FALLING_PETALS,
  },
  chinese_hibiscus: {
    id: 'chinese_hibiscus', name: '丹心朱槿', poeticTitle: '赤华照日',
    renderSvg: renderChineseHibiscusFlower, fallingPetals: CHINESE_HIBISCUS_FALLING_PETALS,
  },
  cockscomb: {
    id: 'cockscomb', name: '锦冠鸡冠花', poeticTitle: '加官进爵',
    renderSvg: renderCockscombFlower, fallingPetals: COCKSCOMB_FALLING_PETALS,
  },
  poppies: {
    id: 'poppies', name: '绛绡虞美人', poeticTitle: '楚韵风姿',
    renderSvg: renderPoppiesFlower, fallingPetals: POPPY_FALLING_PETALS,
  },
  epiphyllum: {
    id: 'epiphyllum', name: '月下昙花', poeticTitle: '刹那芳华',
    renderSvg: renderEpiphyllumFlower, fallingPetals: EPIPHYLLUM_FALLING_PETALS,
  },
  spider_lilies: {
    id: 'spider_lilies', name: '赤焰彼岸花', poeticTitle: '彼岸追思',
    renderSvg: renderSpiderLiliesFlower, fallingPetals: SPIDER_LILY_FALLING_PETALS,
  },
  redbuds: {
    id: 'redbuds', name: '同心紫荆', poeticTitle: '骨肉和睦',
    renderSvg: renderRedbudsFlower, fallingPetals: REDBUD_FALLING_PETALS,
  },
};
