/**
 * @file types.ts
 * @description 花器形制定义与元数据配置：
 * 涵盖现代几何、手作肌理与当代东方极简系列；每款形制同时声明瓶口口径、中心、器高与插花散开系数。
 */

import type { VaseStyle } from '../../../../../types';

// 形制类型由全局协议层定义，此处转出以保持原有导入路径可用
export type { VaseStyle };

export interface VaseStyleMeta {
  id: VaseStyle;
  name: string;
  category: 'sculptural_unique' | 'designer_modern' | 'wabi_sabi' | 'minimalist';
  categoryLabel: string;
  sourceLabel: string;
  shapeLabel: string;
  desc: string;
  tag: string;
  iconText: string;
  accentColor: string;
  borderColor: string;
}

export interface VaseItemDefinition extends VaseStyleMeta {
  mouthAperture: VaseMouthAperture;
  mouthWidth: number;
  mouthCenter: { x: number; y: number };
  vaseHeight: number;
  spreadFactor: number;
  renderDefs?: () => string;
  renderMouthBack: () => string;
  renderBody: () => string;
}

export const VASE_STYLES: VaseStyleMeta[] = [
  // ── 奇特器型 1: 手作泥捏翻边陶瓶 (新图1) ──
  {
    id: 'pinched_clay_ruffle',
    name: '泥捏翻边梳齿瓶',
    category: 'sculptural_unique',
    categoryLabel: '奇特造型',
    sourceLabel: '参考新图1',
    shapeLabel: '不对称荷叶卷唇',
    desc: '不对称翻边马蹄口与泥捏凹凸指印筒腹，通体布满手工梳齿微刮刻痕，暖姜黄粗陶手作质感。',
    tag: '梳齿泥痕',
    iconText: '🏺',
    accentColor: '#d97706',
    borderColor: '#fde68a',
  },
  // ── 奇特器型 2: 银曜珠光螺旋涡轮瓶 (新图3) ──
  {
    id: 'pearlescent_turbine',
    name: '银曜螺旋涡轮瓶',
    category: 'sculptural_unique',
    categoryLabel: '奇特造型',
    sourceLabel: '参考新图3',
    shapeLabel: '旋转刀锋涡轮',
    desc: '外撇喇叭口、水滴胆腹周身环绕如涡轮叶片般的3D立体旋转刀锋立棱，银白珠光金属冷冽反射。',
    tag: '旋转刀锋',
    iconText: '🌪️',
    accentColor: '#94a3b8',
    borderColor: '#e2e8f0',
  },
  // ── 奇特器型 3: 极简莫兰迪旋转扭扭塔瓶 (新图4) ──
  {
    id: 'twisted_helix_tower',
    name: '旋转几何扭扭瓶',
    category: 'sculptural_unique',
    categoryLabel: '奇特造型',
    sourceLabel: '参考新图4',
    shapeLabel: '轴向旋转沙漏',
    desc: '空间多边形柱身沿中心轴发生90度空间立体旋转，中段收拢为沙漏细腰，莫兰迪冰蓝微光纯瓷。',
    tag: '空间旋转',
    iconText: '🔷',
    accentColor: '#0284c7',
    borderColor: '#bae6fd',
  },
  // ── 奇特器型 4: 天青流沙渐变圆锥砂陶瓶 (新图5) ──
  {
    id: 'gradient_sand_volcano',
    name: '天青流沙渐变瓶',
    category: 'sculptural_unique',
    categoryLabel: '奇特造型',
    sourceLabel: '参考新图5',
    shapeLabel: '极简圆台圆锥',
    desc: '极简火山圆台体形制，双色材质渐变碰撞——哑光天青釉柔和过渡到底部粗粝原矿砂陶，细砂斑驳。',
    tag: '流沙渐变',
    iconText: '⛰️',
    accentColor: '#0ea5e9',
    borderColor: '#bae6fd',
  },
  // ── 现代器型 5: 极细百褶密棱直筒瓶 (参考图1右 / 图4右) ──
  {
    id: 'ribbed_fluted_white',
    name: '极细百褶密棱瓶',
    category: 'designer_modern',
    categoryLabel: '现代设计',
    sourceLabel: '参考图1右款',
    shapeLabel: '垂直密棱柱',
    desc: '纯白哑光微收腰直筒身，密布16道精细垂直立体棱线与凹凸光影，极简建筑律动感。',
    tag: '百褶密棱',
    iconText: '🏛️',
    accentColor: '#0284c7',
    borderColor: '#bae6fd',
  },
  // ── 现代器型 6: 流光旋风波浪奶油瓶 (参考图2 奶油白) ──
  {
    id: 'organic_twist_cream',
    name: '旋风波浪奶油瓶',
    category: 'designer_modern',
    categoryLabel: '现代设计',
    sourceLabel: '参考图2实拍',
    shapeLabel: '流线有机旋风',
    desc: '奶油米白陶肌理，器身呈现6道优雅的S型螺旋上升波浪凹凸曲面，流线舒展治愈。',
    tag: '旋风波浪',
    iconText: '🌪️',
    accentColor: '#d97706',
    borderColor: '#fde68a',
  },
  // ── 现代器型 7: 落樱粉波浪旋风瓶 (参考图5 樱粉色) ──
  {
    id: 'organic_twist_rose',
    name: '落樱粉旋风波纹瓶',
    category: 'designer_modern',
    categoryLabel: '现代设计',
    sourceLabel: '参考图5实拍',
    shapeLabel: '柔美粉波旋纹',
    desc: '莫兰迪低饱和落樱粉，顺时针舒展起伏的立体波浪旋风棱线，温婉雅致浪漫。',
    tag: '落樱波浪',
    iconText: '🌸',
    accentColor: '#f43f5e',
    borderColor: '#fecdd3',
  },
  // ── 侘寂器型 8: 侘寂玄灰砂岩横纹瓶 (参考图3) ──
  {
    id: 'chiseled_stone_gray',
    name: '侘寂砂岩横纹瓶',
    category: 'wabi_sabi',
    categoryLabel: '侘寂石器',
    sourceLabel: '参考图3实拍',
    shapeLabel: '粗砂微锥石筒',
    desc: '深玄灰粗砂陶胎，表面布满手工凿刻与慢轮拉坯横向微肌理，质朴宁静，厚重内敛。',
    tag: '砂岩横纹',
    iconText: '🪨',
    accentColor: '#52525b',
    borderColor: '#d4d4d8',
  },
  // ── 现代器型 9: 折线圆台百褶短瓶 (参考图1中款) ──
  {
    id: 'fluted_trapezoid_mini',
    name: '圆台百褶梯形瓶',
    category: 'designer_modern',
    categoryLabel: '现代设计',
    sourceLabel: '参考图1中款',
    shapeLabel: '圆台百褶梯形',
    desc: '上收下展的现代低重心梯形圆台，挺拔外展的立体百褶竖棱，微缩现代建筑雕塑感。',
    tag: '圆台梯形',
    iconText: '🔺',
    accentColor: '#4f46e5',
    borderColor: '#c7d2fe',
  },
  // ── 现代器型 10: 钻石晶体多面切角瓶 (参考图4之2) ──
  {
    id: 'faceted_gem_prism',
    name: '钻石晶体切角瓶',
    category: 'designer_modern',
    categoryLabel: '现代设计',
    sourceLabel: '参考图4之2',
    shapeLabel: '多面切角晶体',
    desc: '现代 Low-Poly 多面体晶体切角造型，八块立体三角形与四边形折面，棱角分明纯粹。',
    tag: '晶体切角',
    iconText: '💎',
    accentColor: '#0891b2',
    borderColor: '#a5f3fc',
  },
  // ── 极简器型 11: 海棠瓜棱秀颈素瓶 (参考图4之3) ──
  {
    id: 'melon_lobed_celadon',
    name: '海棠瓜棱秀颈瓶',
    category: 'minimalist',
    categoryLabel: '东方极简',
    sourceLabel: '参考图4之3',
    shapeLabel: '丰润六棱瓜瓣',
    desc: '纤细喇叭口与6瓣饱满向外舒展鼓凸的海棠甜瓜瓣体，线条柔美温润，落落大方。',
    tag: '海棠瓜棱',
    iconText: '🍈',
    accentColor: '#10b981',
    borderColor: '#a7f3d0',
  },
  // ── 极简器型 12: 现代极简水滴天鹅瓶 (参考图4左1) ──
  {
    id: 'minimal_drop_swan',
    name: '极简水滴天鹅瓶',
    category: 'minimalist',
    categoryLabel: '现代极简',
    sourceLabel: '参考图4左1',
    shapeLabel: '天鹅长颈水滴',
    desc: '极纤秀天鹅长颈，平滑舒展汇入水滴纯净饱满底腹，温润如玉，极净东方留白。',
    tag: '纤颈水滴',
    iconText: '🏺',
    accentColor: '#ca8a04',
    borderColor: '#fef08a',
  },
  // ── 原创东方极简 13: 月白玉壶春瓶 ──
  {
    id: 'moon_white_orb',
    name: '月白玉壶春瓶',
    category: 'minimalist',
    categoryLabel: '东方极简',
    sourceLabel: '原创 · 东方极简',
    shapeLabel: '撇口细颈垂腹',
    desc: '玉壶春的撇口、细颈和垂腹采用修长当代比例，月白珍珠釉浮现青粉虹彩，秀雅而不单薄。',
    tag: '月白珠光',
    iconText: '◯',
    accentColor: '#8b9691',
    borderColor: '#d9dcd7',
  },
  // ── 原创东方极简 14: 玄墨梅瓶 ──
  {
    id: 'ink_black_meiping',
    name: '玄墨梅瓶',
    category: 'minimalist',
    categoryLabel: '东方极简',
    sourceLabel: '原创 · 东方极简',
    shapeLabel: '小口高肩敛腹',
    desc: '收窄的梅瓶比例抬高肩线，小口聚枝、高肩利落、下腹渐敛；乌金釉中浮现蓝灰与茶金暗闪。',
    tag: '玄墨静影',
    iconText: '●',
    accentColor: '#343532',
    borderColor: '#7c7b75',
  },
  // ── 原创东方极简 15: 汝青琮影瓶 ──
  {
    id: 'ru_celadon_cong',
    name: '汝青琮影瓶',
    category: 'minimalist',
    categoryLabel: '东方极简',
    sourceLabel: '原创 · 东方极简',
    shapeLabel: '圆口方身琮影',
    desc: '圆口、短颈、折肩和修长方身建立内圆外方秩序，汝青玉釉带青蓝窑变与极淡开片。',
    tag: '方圆相生',
    iconText: '□',
    accentColor: '#7d9184',
    borderColor: '#cdd8cd',
  },
  // ── 原创东方极简 16: 茶白贯耳方瓶 ──
  {
    id: 'tea_white_shoulder',
    name: '茶白贯耳方瓶',
    category: 'wabi_sabi',
    categoryLabel: '东方极简',
    sourceLabel: '原创 · 东方极简',
    shapeLabel: '双贯耳折肩方腹',
    desc: '长颈两侧生双贯耳，折肩落入切面方腹；茶白乳浊釉流转暖金与青白微光，古意与当代雕塑感并存。',
    tag: '窑变贯耳',
    iconText: '▱',
    accentColor: '#a79884',
    borderColor: '#e8dfcf',
  },
  // ── 历史神韵 17: 唐三彩凤首壶再设计 ──
  {
    id: 'tang_sancai_phoenix',
    name: '唐彩凤首曲柄瓶',
    category: 'sculptural_unique',
    categoryLabel: '历史神韵',
    sourceLabel: '灵感 · 唐三彩凤首壶',
    shapeLabel: '凤冠口曲柄扁腹',
    desc: '提炼唐三彩凤首壶的凤冠、细颈、扁圆腹、外撇高足与曲柄，以绿、琥珀、乳白流釉重构鲜活插花器。',
    tag: '三彩流釉',
    iconText: '♬',
    accentColor: '#2f8f63',
    borderColor: '#d7a34b',
  },
  // ── 历史神韵 18: 商周青铜觚再设计 ──
  {
    id: 'shang_bronze_gu',
    name: '商青铜觚花器',
    category: 'sculptural_unique',
    categoryLabel: '历史神韵',
    sourceLabel: '灵感 · 商周青铜觚',
    shapeLabel: '大撇口束腰高足',
    desc: '保留青铜觚的大撇口、修长束腰与高圈足，以铜绿、孔雀蓝和金棕氧化层表现时间沉积。',
    tag: '铜绿鎏光',
    iconText: '𓏤',
    accentColor: '#397d71',
    borderColor: '#b7894e',
  },
  // ── 历史神韵 19: 战国错金绿松石云纹钫再设计 ──
  {
    id: 'warring_turquoise_fang',
    name: '战国错金云纹钫',
    category: 'sculptural_unique',
    categoryLabel: '历史神韵',
    sourceLabel: '灵感 · 嵌绿松石勾连云纹钫',
    shapeLabel: '方口双耳斜肩钫',
    desc: '方口、双耳、斜肩与收束高足构成钫式轮廓，深铜胎上错金并嵌绿松石勾连云纹，华丽而庄重。',
    tag: '错金嵌翠',
    iconText: '◇',
    accentColor: '#169b8c',
    borderColor: '#d1a64c',
  },
  // ── 历史神韵 20: 青花釉里红葫芦瓶再设计 ──
  {
    id: 'blue_red_double_gourd',
    name: '青花釉里红双生葫芦瓶',
    category: 'designer_modern',
    categoryLabel: '历史神韵',
    sourceLabel: '灵感 · 青花釉里红葫芦瓶',
    shapeLabel: '双葫芦束腰',
    desc: '双葫芦轮廓以纤细束腰相连，月白瓷胎上让钴蓝缠枝与铜红祥云上下呼应，明快鲜活。',
    tag: '青红双彩',
    iconText: '∞',
    accentColor: '#2457a6',
    borderColor: '#b34a43',
  },
  {
    id: 'western_zhou_he_zun',
    name: '宅兹中国何尊花器',
    category: 'sculptural_unique',
    categoryLabel: '西周重器',
    sourceLabel: '神似 · 西周何尊',
    shapeLabel: '圆口方体四扉棱',
    desc: '提炼何尊圆口棱方体、高圈足、四道扉棱与高浮雕兽面，以铜绿、古金和“中国”铭文意象重构。',
    tag: '宅兹中国',
    iconText: '中',
    accentColor: '#3f7f70',
    borderColor: '#c59a55',
  },
  {
    id: 'western_zhou_li_gui',
    name: '克商利簋方座花器',
    category: 'sculptural_unique',
    categoryLabel: '西周重器',
    sourceLabel: '神似 · 西周利簋',
    shapeLabel: '侈口鼓腹双兽耳方座',
    desc: '以利簋的侈口鼓腹、双兽耳垂珥和方形底座为骨架，云雷地纹与青金锈色表现牧野克商的凝重。',
    tag: '克商之证',
    iconText: '簋',
    accentColor: '#557c6c',
    borderColor: '#b28a4f',
  },
  {
    id: 'western_zhou_elephant',
    name: '西周凤鸟纹象尊花器',
    category: 'sculptural_unique',
    categoryLabel: '西周重器',
    sourceLabel: '神似 · 西周象尊',
    shapeLabel: '象形方背口上扬长鼻',
    desc: '保留象尊肥硕器身、背部方口、上扬中空长鼻与短柱足，以凤鸟纹、蛇纹和青铜斑驳赋予异兽生命感。',
    tag: '凤鸟象尊',
    iconText: '象',
    accentColor: '#3e867a',
    borderColor: '#bb8d4e',
  },
  {
    id: 'qin_chariot_canopy',
    name: '秦陵铜车马伞盖瓶',
    category: 'sculptural_unique',
    categoryLabel: '秦制新生',
    sourceLabel: '神似 · 秦陵彩绘铜车马',
    shapeLabel: '伞盖中轴方舆双轮',
    desc: '将秦陵铜车马的伞盖、中轴、方舆和双轮压缩成机械感花器，青铜胎上保留金银饰与朱蓝彩绘。',
    tag: '青铜之冠',
    iconText: '车',
    accentColor: '#387a72',
    borderColor: '#cfaa66',
  },
  {
    id: 'qin_painted_armor',
    name: '秦彩绘铠甲俑瓶',
    category: 'sculptural_unique',
    categoryLabel: '秦制新生',
    sourceLabel: '神似 · 秦陵将军俑',
    shapeLabel: '束领宽肩鱼鳞甲',
    desc: '以将军俑宽肩、束腰、鱼鳞甲片和彩色花结为器身结构，陶红、玄黑、朱红与石青残彩鲜活交叠。',
    tag: '赳赳军阵',
    iconText: '甲',
    accentColor: '#a45635',
    borderColor: '#3f6570',
  },
  {
    id: 'qin_bronze_crane',
    name: '秦陵青铜鹤曲颈瓶',
    category: 'sculptural_unique',
    categoryLabel: '秦制新生',
    sourceLabel: '神似 · 秦陵青铜鹤',
    shapeLabel: '鹤背方口长曲颈',
    desc: '从秦陵青铜鹤提取长曲颈、尖喙、层叠羽翼和细足，鹤背开口承花，铜绿与白色残彩呈现宫苑水禽神韵。',
    tag: '苑囿仙禽',
    iconText: '鹤',
    accentColor: '#6f9088',
    borderColor: '#d7d8ca',
  },
  {
    id: 'sui_double_dragon_linked',
    name: '隋月白双龙联腹传瓶',
    category: 'sculptural_unique',
    categoryLabel: '隋韵新生',
    sourceLabel: '神似 · 白釉双龙柄联腹传瓶',
    shapeLabel: '双口联腹双龙柄',
    desc: '两枚修长梨腹相倚连生，双龙柄自肩部攀向盘口；凝脂月白釉中浮现淡青虹光，异形而不失端庄。',
    tag: '双龙联璧',
    iconText: '双',
    accentColor: '#b8cfce',
    borderColor: '#f0e7d5',
  },
  {
    id: 'sui_lotus_panmouth',
    name: '隋碧釉莲瓣四系盘口瓶',
    category: 'sculptural_unique',
    categoryLabel: '隋韵新生',
    sourceLabel: '神似 · 青釉莲瓣纹四系盘口瓶',
    shapeLabel: '盘口四系长腹莲瓣',
    desc: '平展盘口落入溜肩长腹，肩置四系、下腹刻重瓣莲纹；青碧玻璃釉沿器身自然淌落，清润含光。',
    tag: '碧釉莲影',
    iconText: '莲',
    accentColor: '#4d9284',
    borderColor: '#bad9c7',
  },
  {
    id: 'sui_white_chicken_head',
    name: '隋凝脂白瓷鸡首壶',
    category: 'sculptural_unique',
    categoryLabel: '隋韵新生',
    sourceLabel: '神似 · 隋白瓷鸡首壶',
    shapeLabel: '鸡首流桥系曲柄',
    desc: '细颈、丰肩与修长梨腹构成主体，鸡首流与高曲柄形成灵动侧影；乳白釉泛出淡青冰裂与柔亮高光。',
    tag: '鸡首凝光',
    iconText: '鸣',
    accentColor: '#dce8e2',
    borderColor: '#fff5df',
  },
  {
    id: 'tang_secret_celadon_octagonal',
    name: '唐越窑秘色八棱净瓶',
    category: 'minimalist',
    categoryLabel: '唐风名器',
    sourceLabel: '神似 · 法门寺秘色瓷八棱净瓶',
    shapeLabel: '小口长颈八棱腹',
    desc: '法门寺秘色瓷净瓶的纤小口沿、长颈与八棱腹化作清峻轮廓，湖青釉在棱面间浮动如水。',
    tag: '千峰秘色',
    iconText: '秘',
    accentColor: '#6ca897',
    borderColor: '#d8e4bf',
  },
  {
    id: 'tang_lushan_splashed_glaze',
    name: '唐鲁山月斑花釉壶',
    category: 'sculptural_unique',
    categoryLabel: '唐风名器',
    sourceLabel: '神似 · 鲁山窑花釉瓷壶',
    shapeLabel: '短颈鼓腹月斑流釉',
    desc: '深玄褐釉壶身如夜色，天蓝与月白花斑在肩腹间熔流晕散；短颈、鼓腹和高弓柄沉稳有力。',
    tag: '月斑花瓷',
    iconText: '月',
    accentColor: '#537f96',
    borderColor: '#cfdbc9',
  },
  {
    id: 'tang_changsha_bird_ewer',
    name: '唐长沙窑褐绿彩花鸟壶',
    category: 'sculptural_unique',
    categoryLabel: '唐风名器',
    sourceLabel: '神似 · 长沙窑青釉褐绿彩花鸟壶',
    shapeLabel: '短流弓柄圆腹彩绘',
    desc: '短流与弓形柄拉开轻快侧影，温润青黄釉上以褐绿两色勾勒折枝与飞鸟，保留盛唐民间器物的鲜活气。',
    tag: '花鸟入釉',
    iconText: '鸟',
    accentColor: '#758e52',
    borderColor: '#d8bd73',
  },
  {
    id: 'song_jun_moon_white',
    name: '北宋钧窑月白紫霞长颈瓶',
    category: 'minimalist',
    categoryLabel: '北宋名窑',
    sourceLabel: '神似 · 北宋钧窑窑变釉瓶',
    shapeLabel: '细颈垂腹撇口',
    desc: '修长细颈收束花枝，垂腹轮廓稳而不笨；月白天青釉面浮现一抹紫红窑变与细若游丝的开片。',
    tag: '月白紫霞',
    iconText: '钧',
    accentColor: '#849da8',
    borderColor: '#d8b4b1',
  },
  {
    id: 'song_yaozhou_carved_peony',
    name: '北宋耀州青釉刻牡丹瓶',
    category: 'minimalist',
    categoryLabel: '北宋名窑',
    sourceLabel: '神似 · 耀州窑青釉刻花器',
    shapeLabel: '短颈丰肩刻花腹',
    desc: '青釉丰肩瓶身以深刀刻出折枝牡丹，刀痕蓄釉显出深浅层次；明亮釉光沿肩线轻轻流过。',
    tag: '青釉刻花',
    iconText: '耀',
    accentColor: '#6b987c',
    borderColor: '#c8d8ad',
  },
  {
    id: 'song_cizhou_black_carved_yuhuchun',
    name: '北宋磁州白地剔黑玉壶春瓶',
    category: 'sculptural_unique',
    categoryLabel: '北宋名窑',
    sourceLabel: '神似 · 磁州窑白地黑剔花器',
    shapeLabel: '撇口细颈垂腹玉壶春',
    desc: '玉壶春曲线收放分明，乌黑化妆土上剔出米白折枝花叶，形成简练鲜明的黑白对照。',
    tag: '白地剔黑',
    iconText: '磁',
    accentColor: '#393a36',
    borderColor: '#eee5d3',
  },
  {
    id: 'ming_xuande_lobed_blue_white',
    name: '宣德青花灵芝纹莲瓣瓜棱瓶',
    category: 'minimalist',
    categoryLabel: '明代名器',
    sourceLabel: '神似 · 宣德青花瓜棱瓶',
    shapeLabel: '莲瓣口瓜棱腹',
    desc: '莲瓣口与六道瓜棱收成清峻轮廓，青花灵芝纹随棱面起伏，浓淡钴蓝如墨色在白釉上流动。',
    tag: '宣德青花',
    iconText: '宣',
    accentColor: '#315e9b',
    borderColor: '#dce7ef',
  },
  {
    id: 'ming_zhengde_ring_handle_blue_white',
    name: '正德青花缠枝莲双耳环瓶',
    category: 'sculptural_unique',
    categoryLabel: '明代名器',
    sourceLabel: '神似 · 正德青花仿铜礼器',
    shapeLabel: '仿铜礼器双环耳',
    desc: '仿青铜供器的挺拔比例配双环耳，青花缠枝莲环绕瓶腹；两侧耳环落在花枝线条之外，不遮挡瓶口。',
    tag: '缠枝莲影',
    iconText: '正',
    accentColor: '#285b9a',
    borderColor: '#dfd3b5',
  },
  {
    id: 'ming_jingtai_cloisonne_lotus_bottle',
    name: '景泰蓝掐丝缠枝莲羽纹瓶',
    category: 'sculptural_unique',
    categoryLabel: '明代名器',
    sourceLabel: '神似 · 景泰年间掐丝珐琅瓶',
    shapeLabel: '长颈丰肩珐琅瓶',
    desc: '铜胎上以鎏金细丝分隔宝蓝、孔雀青与松石绿珐琅，颈部饰羽纹，腹部缠枝莲在亮釉与金线间舒展。',
    tag: '景泰蓝光',
    iconText: '珐',
    accentColor: '#169b9a',
    borderColor: '#e0bf69',
  },
];

// 标准化映射旧别名到新 ID
export const normalizeVaseStyle = (style?: VaseStyle): VaseStyle => {
  if (!style) return 'ribbed_fluted_white';
  switch (style) {
    case 'warm_white_plain':
      return 'minimal_drop_swan';
    case 'painted_iris':
      return 'organic_twist_cream';
    case 'fluted_origami':
    case 'painted_peony':
      return 'ribbed_fluted_white';
    case 'faceted_prism':
    case 'painted_plum':
      return 'faceted_gem_prism';
    case 'song_mallet':
    case 'celadon_ru':
      return 'melon_lobed_celadon';
    case 'willow_guanyin':
    case 'qinghua_lotus':
      return 'minimal_drop_swan';
    case 'archaic_ears':
    case 'mutton_jade_ears':
      return 'chiseled_stone_gray';
    case 'classic_meiping':
    case 'royal_blue_gold':
      return 'fluted_trapezoid_mini';
    default:
      return style;
  }
};

export const getVaseStyleMeta = (styleId?: VaseStyle): VaseStyleMeta => {
  const normId = normalizeVaseStyle(styleId);
  return VASE_STYLES.find((s) => s.id === normId) || VASE_STYLES[0];
};

export type VaseMouthAperture = 'narrow' | 'standard' | 'wide';

/**
 * 获取花瓶瓶口形制口径类别 (小口 / 标准口 / 大口)
 */
export const getVaseMouthAperture = (styleId?: VaseStyle): VaseMouthAperture => {
  const normId = normalizeVaseStyle(styleId);
  switch (normId) {
    // 小口/细颈花器：枝干自然聚拢、夹角收紧
    case 'minimal_drop_swan':
    case 'melon_lobed_celadon':
    case 'ribbed_fluted_white':
    case 'moon_white_orb':
    case 'ink_black_meiping':
    case 'tea_white_shoulder':
    case 'blue_red_double_gourd':
    case 'qin_painted_armor':
    case 'sui_white_chicken_head':
    case 'tang_secret_celadon_octagonal':
    case 'song_jun_moon_white':
    case 'song_yaozhou_carved_peony':
    case 'ming_jingtai_cloisonne_lotus_bottle':
      return 'narrow';

    // 大口/阔口/翻边花器：枝干自然向外舒展开放
    case 'pinched_clay_ruffle':
    case 'fluted_trapezoid_mini':
    case 'chiseled_stone_gray':
    case 'shang_bronze_gu':
    case 'western_zhou_he_zun':
    case 'western_zhou_li_gui':
    case 'sui_lotus_panmouth':
    case 'ming_zhengde_ring_handle_blue_white':
      return 'wide';

    // 经典标准口径
    case 'organic_twist_cream':
    case 'organic_twist_rose':
    case 'pearlescent_turbine':
    case 'twisted_helix_tower':
    case 'gradient_sand_volcano':
    case 'faceted_gem_prism':
    case 'ru_celadon_cong':
    case 'tang_sancai_phoenix':
    case 'warring_turquoise_fang':
    case 'western_zhou_elephant':
    case 'qin_chariot_canopy':
    case 'qin_bronze_crane':
    case 'sui_double_dragon_linked':
    case 'tang_lushan_splashed_glaze':
    case 'tang_changsha_bird_ewer':
    case 'song_cizhou_black_carved_yuhuchun':
    case 'ming_xuande_lobed_blue_white':
    default:
      return 'standard';
  }
};

/**
 * 获取花器对插花枝干的收束散开系数 (小口0.72，标准1.0，大口1.25)
 */
export const getVaseSpreadFactor = (styleId?: VaseStyle): number => {
  const aperture = getVaseMouthAperture(styleId);
  if (aperture === 'narrow') return 0.72;
  if (aperture === 'wide') return 1.25;
  return 1.0;
};
