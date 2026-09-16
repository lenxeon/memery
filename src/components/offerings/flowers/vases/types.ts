/**
 * @file types.ts
 * @description 现代高阶设计感与奇特造型花器形制定义与元数据配置：
 * 涵盖：极细百褶密棱、流光旋风波浪、落樱粉旋波、侘寂砂岩横纹、圆台百褶梯形、钻石晶体切角、海棠瓜棱秀颈、极简水滴天鹅，
 * 以及最新扩充的【奇特形制与手作肌理】：手作泥捏翻边陶瓶、银曜珠光螺旋涡轮瓶、极简莫兰迪旋转扭扭塔瓶、天青流沙渐变圆锥砂陶瓶。
 */

export type VaseStyle =
  // ── 基础现代高阶设计感系列 ──
  | 'ribbed_fluted_white'    // 1. 极细百褶密棱直筒瓶 (参考图1右 / 图4右)
  | 'organic_twist_cream'    // 2. 流光旋风波浪奶油瓶 (参考图2 奶油白)
  | 'organic_twist_rose'     // 3. 落樱粉波浪旋风瓶 (参考图5 樱粉色)
  | 'chiseled_stone_gray'    // 4. 侘寂玄灰砂岩横纹瓶 (参考图3 玄灰粗砂拉坯横纹)
  | 'fluted_trapezoid_mini'  // 5. 折线圆台百褶短瓶 (参考图1中 梯形圆台百褶)
  | 'faceted_gem_prism'      // 6. 钻石晶体多面切角瓶 (参考图4之2 晶体多边形折面)
  | 'melon_lobed_celadon'    // 7. 海棠瓜棱秀颈素瓶 (参考图4之3 纤秀颈瓜棱圆瓣)
  | 'minimal_drop_swan'      // 8. 现代极简水滴天鹅瓶 (参考图4左1 / 图1左 极简纤颈水滴)
  // ── 奇特造型与手作肌理系列 (最新用户参考) ──
  | 'pinched_clay_ruffle'    // 9. 手作泥捏翻边陶瓶 (新图1: 不对称卷边荷叶口、手工梳齿拉坯刮痕粗陶)
  | 'pearlescent_turbine'    // 10. 银曜珠光螺旋涡轮瓶 (新图3: 撇口垂胆腹、8道旋转刀锋立体螺旋棱)
  | 'twisted_helix_tower'    // 11. 极简莫兰迪旋转扭扭塔瓶 (新图4: 空间多边形沿竖轴90°旋转扭曲沙漏腰)
  | 'gradient_sand_volcano'  // 12. 天青流沙渐变圆锥砂陶瓶 (新图5: 极简圆台圆锥体、天青釉渐变粗砂岩底)
  // 向下兼容历史别名
  | 'warm_white_plain'
  | 'painted_iris'
  | 'fluted_origami'
  | 'faceted_prism'
  | 'song_mallet'
  | 'willow_guanyin'
  | 'archaic_ears'
  | 'classic_meiping'
  | 'painted_peony'
  | 'painted_plum'
  | 'qinghua_lotus'
  | 'royal_blue_gold'
  | 'mutton_jade_ears'
  | 'celadon_ru';

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
      return 'narrow';

    // 大口/阔口/翻边花器：枝干自然向外舒展开放
    case 'pinched_clay_ruffle':
    case 'fluted_trapezoid_mini':
    case 'chiseled_stone_gray':
      return 'wide';

    // 经典标准口径
    case 'organic_twist_cream':
    case 'organic_twist_rose':
    case 'pearlescent_turbine':
    case 'twisted_helix_tower':
    case 'gradient_sand_volcano':
    case 'faceted_gem_prism':
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
