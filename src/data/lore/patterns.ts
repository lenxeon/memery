/**
 * @file patterns.ts
 * @description 纹样典故：回纹、万字、如意、连珠、八达晕、莲纹、蝠纹、宝相花。
 * id 以 pattern_ 前缀，与桌布/墙面 borderPatternId、墙面主题对应。
 */
import type { RelicLore } from './types';

export const PATTERN_LORE: RelicLore[] = [
  {
    id: 'pattern_meander',
    category: 'pattern',
    name: '回纹',
    poeticTitle: '连绵不断',
    dynasty: '商周',
    origin: '商周青铜器与陶器之云雷纹、回字纹',
    allusion:
      '回纹方折回旋，一笔不断，源于商周青铜器上的云雷纹。因其首尾相连、无起无止，民间谓之「富贵不断头」，寓意福泽连绵。',
    ritual: '多用于案围、织锦与建筑边饰，取久长不绝之意。',
    authenticity: 'canon',
  },
  {
    id: 'pattern_wanzi',
    category: 'pattern',
    name: '万字纹',
    poeticTitle: '万德庄严',
    dynasty: '唐',
    origin: '佛教瑞相，唐武则天时定读为「万」',
    allusion:
      '「卍」本为佛之瑞相，寓吉祥万德。唐武则天长寿年间定此符号读「万」，取万德庄严、吉祥万福之义，遂通行于织绣与装修。',
    note: '「定读为万」一说流传甚广，具体年份诸书微有出入，此处取通行之说。',
    ritual: '连缀成「万字不到头」，用于案围与檐角，寓万福无疆。',
    authenticity: 'canon',
  },
  {
    id: 'pattern_ruyi',
    category: 'pattern',
    name: '如意纹',
    poeticTitle: '称心如意',
    dynasty: '魏晋',
    origin: '源出爪杖（搔杖），明清演为云头纹',
    allusion:
      '如意本为背痒时搔之的爪杖，魏晋名士清谈执之，后世渐成礼器与祥物。其首作云头或心形，纹样化后即为如意云头。',
    ritual: '取「如意」之名，寓事事顺遂，常见于供案织品与器物边饰。',
    authenticity: 'canon',
  },
  {
    id: 'pattern_lianzhu',
    category: 'pattern',
    name: '连珠纹',
    poeticTitle: '珠联璧合',
    dynasty: '南北朝',
    origin: '源出波斯萨珊，经丝路东传',
    allusion:
      '连珠纹以圆珠相接成圈，其源在波斯萨珊王朝，经丝路传入中土，南北朝至隋唐织锦多见「联珠对鸟」「联珠团窠」之属。',
    note: '连珠为中外交流之证，非中土原生纹样。',
    ritual: '取珠联璧合之意，多用于织锦边饰与锦缘。',
    authenticity: 'canon',
  },
  {
    id: 'pattern_badayun',
    category: 'pattern',
    name: '八达晕',
    poeticTitle: '四通八达',
    dynasty: '宋',
    origin: '宋锦几何纹之一，元·费著《蜀锦谱》著录',
    allusion:
      '八达晕为宋锦名目之一，以规矩的几何骨架向八方延展，中嵌团花，故名「八达」。元人费著《蜀锦谱》所记宋代蜀锦纹样中即有八答晕。',
    ritual: '取四通八达、路路皆通之意，宜作案围锦缘。',
    authenticity: 'canon',
  },
  {
    id: 'pattern_lotus',
    category: 'pattern',
    name: '莲瓣纹',
    poeticTitle: '莲华化生',
    dynasty: '南北朝',
    origin: '佛教东传后的莲瓣装饰（南朝青瓷莲瓣尊一系）',
    allusion:
      '莲瓣纹随佛教东传而盛，南朝青瓷仰覆莲瓣尊为其翘楚，后及于石刻、藻井与织品。莲出淤泥不染，为清净之象。',
    ritual: '佛前供器多用莲瓣纹，取化生净土之意。',
    authenticity: 'canon',
    related: ['lotus'],
  },
  {
    id: 'pattern_bat',
    category: 'pattern',
    name: '蝠纹',
    poeticTitle: '五蝠捧寿',
    dynasty: '清',
    origin: '清代吉样纹样，取「蝠」谐「福」',
    allusion:
      '清人以「蝠」谐「福」，五蝠拱寿谓「五福捧寿」，出《尚书·洪范》五福之说（寿、富、康宁、攸好德、考终命）。',
    note: '蝠入纹样为明清之事，谐「福」属民间吉语，先秦并无以蝠为纹之制。',
    ritual: '祝寿与祭祖场合皆用，取福寿双全。',
    authenticity: 'folk',
  },
  {
    id: 'pattern_baoxiang',
    category: 'pattern',
    name: '宝相花',
    poeticTitle: '宝相庄严',
    dynasty: '唐',
    origin: '唐代佛教装饰团花',
    allusion:
      '宝相花非实有之花，乃唐人以莲、牡丹、石榴诸花合为一体，作对称团花，用于佛帐、藻井与织锦，取其庄严圆满。',
    note: '宝相花为「理想花」，非某种真实花卉，故不宜按花名索解。',
    ritual: '多见于供案织品与壁饰，取圆满庄严之意。',
    authenticity: 'canon',
  },
];
