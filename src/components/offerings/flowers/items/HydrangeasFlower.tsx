/**
 * @file HydrangeasFlower.tsx
 * @description 【团圆绣球 / 东方雅供双球插花】
 * 严格遵从现代高端花道写实参考图重塑：
 * 1. 两朵绣球高低搭配：
 *    - 主花球：高挑偏左，硕大丰满的大型圆球花簇；
 *    - 次花球：低倚偏右，小巧圆润，与主花形成极富韵律的高低错落对角线构图；
 * 2. 聚花成球、明显的立体球型：
 *    - 底部柔和球体光影底模，表面层叠几十朵精致四瓣小花（中心正对、边缘倾斜透视）；
 *    - 整体立体球体光感强烈，绝无平面图章感；
 * 3. 花色淡紫中透白：
 *    - 外缘与受光花瓣为纯洁白玉与淡丁香紫透光渐变，背阴与内层呈温润丁香紫；
 * 4. 扁平绿叶自然托底：
 *    - 浓绿扁平宽卵形绣球叶，带微细锯齿与清晰羽状叶脉，自然垫托于两朵花球下方；
 * 5. 飘逸细长小草装饰（点睛神来之笔）：
 *    - 右侧 2-3 根细长草叶笔直拔起冲天，打破球形呆板；
 *    - 左侧 1 根优雅长草大跨度向左拱起垂落，形成优美抛物线；
 * 6. 分枝处点缀小巧白色星状碎花，层次丰富，意境高绝。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle, getFlowerAgingFilter } from '../utils/lifecycle';

export const HYDRANGEA_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.50, fallSpan: 0.06, startX: 106, startY: 86, landX: 112, landY: 194, rx: 4.2, ry: 3.6, landRot: 26, swayAmp: 14, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.40, fallSpan: 0.05, startX: 46, startY: 58, landX: 40, landY: 193, rx: 4.5, ry: 3.8, landRot: -28, swayAmp: 12, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.28, fallSpan: 0.06, startX: 68, startY: 52, landX: 74, landY: 195, rx: 4.6, ry: 3.9, landRot: -18, swayAmp: 16, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.18, fallSpan: 0.05, startX: 92, startY: 96, landX: 98, landY: 197, rx: 4.8, ry: 4.0, landRot: 32, swayAmp: 18, swayFreq: 4.0 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.04, startX: 54, startY: 66, landX: 60, landY: 196, rx: 4.4, ry: 3.8, landRot: 14, swayAmp: 14, swayFreq: 4.2 },
];

export const HydrangeasFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  const agingStyle = getFlowerAgingFilter(health, isFaded);

  // ── 花色：淡紫中透着白色（纯白 -> 柔淡丁香紫 -> 优雅温润淡紫） ──
  const floretWhite = lerpColor('#ffffff', '#f5eee6', dryFactor);
  const floretPaleLilac = lerpColor('#ede9fe', '#ddcec2', dryFactor);
  const floretMidLilac = lerpColor('#c4b5fd', '#b8a090', dryFactor);
  const floretSoftPurple = lerpColor('#a78bfa', '#957c6c', dryFactor);
  const floretDeepPurple = lerpColor('#7c3aed', '#6b5141', dryFactor);
  const floretPistil = lerpColor('#fef08a', '#c2b07e', dryFactor);

  // ── 枝茎与草叶、绣球大叶 ──
  const stemDark = lerpColor('#143d1a', '#2d2816', dryFactor);
  const stemFresh = lerpColor('#22c55e', '#524d2b', dryFactor);
  const stemLight = lerpColor('#86efac', '#847e50', dryFactor);
  const leafDark = lerpColor('#0f381e', '#292518', dryFactor);
  const leafMid = lerpColor('#15803d', '#454025', dryFactor);
  const leafLight = lerpColor('#4ade80', '#747043', dryFactor);
  const leafVein = lerpColor('#86efac', '#9e9964', dryFactor);
  const grassGreen = lerpColor('#166534', '#3d381f', dryFactor);
  const grassTip = lerpColor('#84cc16', '#7a763d', dryFactor);

  // 碎花小白菊
  const tinyPetal = lerpColor('#ffffff', '#eeddcc', dryFactor);
  const tinyPistil = lerpColor('#facc15', '#b59b48', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.45);
  const fl2 = getBlossomDropStyle(health, 0.15);

  /**
   * 渲染单朵精致四瓣十字小花 (Single Floret)
   * 每朵小花呈 4 片圆润扁平花瓣，中心带微小花蕊点
   */
  const renderFloret = (
    cx: number,
    cy: number,
    r: number = 5.2,
    rot: number = 0,
    opacity: number = 1.0,
    isBright: boolean = false
  ) => {
    const fillId = isBright ? 'url(#floretBrightGrad)' : 'url(#floretNormalGrad)';
    return (
      <g
        key={`floret-${cx}-${cy}-${rot}`}
        transform={`translate(${cx}, ${cy}) rotate(${rot})`}
        opacity={opacity}
      >
        {/* 4 片扁平十字对生花瓣 */}
        <path
          d={`M 0 0 C -${r * 0.55} -${r * 0.4}, -${r * 0.45} -${r}, 0 -${r * 1.05} C ${r * 0.45} -${r}, ${r * 0.55} -${r * 0.4}, 0 0 Z`}
          fill={fillId}
          stroke={floretPaleLilac}
          strokeWidth="0.25"
        />
        <path
          d={`M 0 0 C -${r * 0.55} ${r * 0.4}, -${r * 0.45} ${r}, 0 ${r * 1.05} C ${r * 0.45} ${r}, ${r * 0.55} ${r * 0.4}, 0 0 Z`}
          fill={fillId}
          stroke={floretPaleLilac}
          strokeWidth="0.25"
        />
        <path
          d={`M 0 0 C -${r * 0.4} -${r * 0.55}, -${r} -${r * 0.45}, -${r * 1.05} 0 C -${r} ${r * 0.45}, -${r * 0.4} ${r * 0.55}, 0 0 Z`}
          fill={fillId}
          stroke={floretPaleLilac}
          strokeWidth="0.25"
        />
        <path
          d={`M 0 0 C ${r * 0.4} -${r * 0.55}, ${r} -${r * 0.45}, ${r * 1.05} 0 C ${r} ${r * 0.45}, ${r * 0.4} ${r * 0.55}, 0 0 Z`}
          fill={fillId}
          stroke={floretPaleLilac}
          strokeWidth="0.25"
        />
        {/* 花心微小圆蕊 */}
        <circle cx="0" cy="0" r="0.75" fill={floretWhite} />
        <circle cx="0" cy="0" r="0.4" fill={floretPistil} opacity="0.85" />
      </g>
    );
  };

  /**
   * 渲染大型丰满立体绣球花球 (Spherical Hydrangea Head)
   * 拥有底层渐变球形底模 + 三层透视重叠的小花密集覆盖，展现明显的圆球造型
   */
  const renderHydrangeaHead = (
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    scale: number = 1.0
  ) => {
    return (
      <g transform={`translate(${cx}, ${cy}) scale(${scale})`}>
        {/* 1. 底层立体球体柔和光影底模（确立明显的球体景深与体积，防止露空） */}
        <ellipse
          cx="0"
          cy="0"
          rx={rx}
          ry={ry}
          fill="url(#hydrangeaSphereShadeGrad)"
          filter="url(#hydrangeaSoftShadow)"
        />

        {/* 2. 底层周边小花（较小，处于球体边缘，背阴面偏深紫） */}
        {renderFloret(-rx * 0.75, -ry * 0.55, 4.4, 25, 0.9, false)}
        {renderFloret(rx * 0.72, -ry * 0.52, 4.4, -18, 0.9, false)}
        {renderFloret(-rx * 0.82, ry * 0.35, 4.5, 40, 0.92, false)}
        {renderFloret(rx * 0.80, ry * 0.38, 4.5, -35, 0.92, false)}
        {renderFloret(0, -ry * 0.85, 4.6, 12, 0.92, true)}
        {renderFloret(-rx * 0.45, -ry * 0.78, 4.6, -20, 0.92, true)}
        {renderFloret(rx * 0.45, -ry * 0.78, 4.5, 30, 0.92, false)}
        {renderFloret(0, ry * 0.85, 4.6, -10, 0.95, false)}
        {renderFloret(-rx * 0.48, ry * 0.76, 4.7, 15, 0.95, false)}
        {renderFloret(rx * 0.48, ry * 0.76, 4.6, -24, 0.95, false)}

        {/* 3. 中层主体小花（圆润密实，大小适中） */}
        {renderFloret(-rx * 0.52, -ry * 0.28, 5.0, -12, 0.98, true)}
        {renderFloret(-rx * 0.18, -ry * 0.52, 5.2, 22, 1.0, true)}
        {renderFloret(rx * 0.22, -ry * 0.48, 5.1, -15, 0.98, true)}
        {renderFloret(rx * 0.54, -ry * 0.22, 4.9, 28, 0.96, false)}
        {renderFloret(-rx * 0.56, ry * 0.12, 5.2, 8, 1.0, false)}
        {renderFloret(-rx * 0.22, ry * 0.38, 5.3, -28, 1.0, false)}
        {renderFloret(rx * 0.24, ry * 0.36, 5.2, 16, 1.0, false)}
        {renderFloret(rx * 0.58, ry * 0.14, 5.0, -22, 0.98, false)}

        {/* 4. 表层凸显受光面核心小花（中心与受光面透白亮紫，球形顶峰突出） */}
        {renderFloret(-rx * 0.22, -ry * 0.14, 5.6, 5, 1.0, true)}
        {renderFloret(rx * 0.14, -ry * 0.18, 5.8, -14, 1.0, true)}
        {renderFloret(-rx * 0.05, ry * 0.12, 5.7, 34, 1.0, true)}
        {renderFloret(rx * 0.28, ry * 0.08, 5.4, -8, 1.0, true)}
        {renderFloret(-rx * 0.32, ry * 0.22, 5.3, 18, 1.0, false)}
      </g>
    );
  };

  /**
   * 渲染扁平宽卵形绣球叶 (Flat Serrated Leaf)
   * 宽大饱满、细致叶齿与羽状侧脉，绝无生硬横切感
   */
  const renderFlatLeaf = (
    sx: number,
    sy: number,
    length: number,
    width: number,
    angle: number
  ) => {
    return (
      <g transform={`translate(${sx}, ${sy}) rotate(${angle})`}>
        {/* 叶柄 */}
        <path d={`M 0 0 L 0 ${length * 0.15}`} stroke={stemDark} strokeWidth="1.6" strokeLinecap="round" />
        {/* 叶面：平展宽卵形，边缘细腻波浪/锯齿 */}
        <path
          d={`
            M 0 ${length * 0.15}
            C -${width * 0.5} ${length * 0.3}, -${width * 0.65} ${length * 0.65}, -${width * 0.4} ${length * 0.88}
            C -${width * 0.2} ${length * 0.98}, 0 ${length * 1.02}, 0 ${length * 1.05}
            C 0 ${length * 1.02}, ${width * 0.2} ${length * 0.98}, ${width * 0.4} ${length * 0.88}
            C ${width * 0.65} ${length * 0.65}, ${width * 0.5} ${length * 0.3}, 0 ${length * 0.15}
            Z
          `}
          fill="url(#hydrangeaLeafGrad)"
          stroke={leafDark}
          strokeWidth="0.5"
          filter="url(#hydrangeaSoftShadow)"
        />
        {/* 主叶脉 */}
        <path
          d={`M 0 ${length * 0.15} Q 0 ${length * 0.6} 0 ${length * 1.02}`}
          stroke={leafVein}
          strokeWidth="0.9"
          fill="none"
          opacity="0.85"
        />
        {/* 侧羽脉 */}
        <path d={`M 0 ${length * 0.38} Q -${width * 0.25} ${length * 0.48} -${width * 0.42} ${length * 0.52}`} stroke={leafVein} strokeWidth="0.5" fill="none" opacity="0.65" />
        <path d={`M 0 ${length * 0.38} Q ${width * 0.25} ${length * 0.48} ${width * 0.42} ${length * 0.52}`} stroke={leafVein} strokeWidth="0.5" fill="none" opacity="0.65" />
        <path d={`M 0 ${length * 0.58} Q -${width * 0.25} ${length * 0.68} -${width * 0.38} ${length * 0.72}`} stroke={leafVein} strokeWidth="0.5" fill="none" opacity="0.65" />
        <path d={`M 0 ${length * 0.58} Q ${width * 0.25} ${length * 0.68} ${width * 0.38} ${length * 0.72}`} stroke={leafVein} strokeWidth="0.5" fill="none" opacity="0.65" />
        <path d={`M 0 ${length * 0.76} Q -${width * 0.18} ${length * 0.84} -${width * 0.25} ${length * 0.86}`} stroke={leafVein} strokeWidth="0.45" fill="none" opacity="0.55" />
        <path d={`M 0 ${length * 0.76} Q ${width * 0.18} ${length * 0.84} ${width * 0.25} ${length * 0.86}`} stroke={leafVein} strokeWidth="0.45" fill="none" opacity="0.55" />
      </g>
    );
  };

  /**
   * 渲染基部分枝处的小巧白色碎花簇（微型满天星/雏菊碎花）
   */
  const renderTinyFillerFlower = (cx: number, cy: number, r: number = 2.4) => (
    <g transform={`translate(${cx}, ${cy})`}>
      <circle cx="0" cy={-r} r={r * 0.55} fill={tinyPetal} />
      <circle cx={-r * 0.95} cy={-r * 0.31} r={r * 0.55} fill={tinyPetal} />
      <circle cx={-r * 0.59} cy={r * 0.81} r={r * 0.55} fill={tinyPetal} />
      <circle cx={r * 0.59} cy={r * 0.81} r={r * 0.55} fill={tinyPetal} />
      <circle cx={r * 0.95} cy={-r * 0.31} r={r * 0.55} fill={tinyPetal} />
      <circle cx="0" cy="0" r={r * 0.38} fill={tinyPistil} />
    </g>
  );

  return (
    <g id="hydrangeasFlora" style={agingStyle}>
      <defs>
        {/* 1. 绣球立体球形底模光影（左上受光淡紫透白，右下深紫柔和暗影） */}
        <radialGradient id="hydrangeaSphereShadeGrad" cx="35%" cy="32%" r="68%">
          <stop offset="0%" stopColor={floretWhite} stopOpacity="0.95" />
          <stop offset="42%" stopColor={floretPaleLilac} stopOpacity="0.9" />
          <stop offset="78%" stopColor={floretSoftPurple} stopOpacity="0.85" />
          <stop offset="100%" stopColor={floretDeepPurple} stopOpacity="0.75" />
        </radialGradient>

        {/* 2. 表层受光小花渐变（淡紫透白，通透清雅） */}
        <linearGradient id="floretBrightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={floretWhite} />
          <stop offset="55%" stopColor={floretPaleLilac} />
          <stop offset="100%" stopColor={floretMidLilac} />
        </linearGradient>

        {/* 3. 中底层小花渐变（淡粉紫与丁香紫） */}
        <linearGradient id="floretNormalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={floretPaleLilac} />
          <stop offset="60%" stopColor={floretMidLilac} />
          <stop offset="100%" stopColor={floretSoftPurple} />
        </linearGradient>

        {/* 4. 扁平绿叶渐变 */}
        <linearGradient id="hydrangeaLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={leafLight} />
          <stop offset="45%" stopColor={leafMid} />
          <stop offset="100%" stopColor={leafDark} />
        </linearGradient>

        {/* 5. 坚韧花茎渐变 */}
        <linearGradient id="hydrangeaStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stemDark} />
          <stop offset="40%" stopColor={stemFresh} />
          <stop offset="100%" stopColor={stemLight} />
        </linearGradient>

        {/* 6. 细长装饰草渐变 */}
        <linearGradient id="hydrangeaGrassGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={stemDark} />
          <stop offset="50%" stopColor={grassGreen} />
          <stop offset="100%" stopColor={grassTip} />
        </linearGradient>

        {/* 7. 柔和影视级立体落影 */}
        <filter id="hydrangeaSoftShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0.6" dy="1.2" stdDeviation="0.8" floodColor="#0f172a" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* ── 架构 1：细长的小草装饰（高耸直立与飘逸垂落，完美复现参考图神韵） ── */}
      <g id="hydrangeaDecorativeGrass">
        {/* 草 1【右侧高耸冲天直草】：穿插于两花之间，高挺耸立在右上天际 */}
        <path
          d="M 77 126 C 80 90, 94 45, 108 10"
          stroke="url(#hydrangeaGrassGrad)"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
        />
        {/* 草 2【右侧次高直草】：伴生直立 */}
        <path
          d="M 79 126 C 84 88, 98 48, 114 20"
          stroke="url(#hydrangeaGrassGrad)"
          strokeWidth="1.0"
          fill="none"
          strokeLinecap="round"
        />

        {/* 草 3【左侧优雅飘垂大长草】：从基部抽出向左前方大跨度拱起垂落，神来之笔！ */}
        <path
          d="M 74 126 C 70 95, 62 66, 40 64 C 24 62, 13 80, 11 104"
          stroke="url(#hydrangeaGrassGrad)"
          strokeWidth="1.35"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* ── 架构 2：主要花枝硬挺茎秆 ── */}
      <g id="hydrangeaStems">
        {/* 伸向左上方高处主花球的粗挺主茎 */}
        <path
          d="M 75 126 C 75 102, 72 80, 60 56"
          stroke="url(#hydrangeaStemGrad)"
          strokeWidth="3.6"
          fill="none"
          strokeLinecap="round"
        />
        {/* 伸向右下方次花球的短粗侧茎 */}
        <path
          d="M 76 126 C 80 114, 88 102, 95 90"
          stroke="url(#hydrangeaStemGrad)"
          strokeWidth="3.2"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* ── 架构 3：扁平宽卵形绿叶（垫托在两朵绣球下方，承托整体花形） ── */}
      <g id="hydrangeaFlatLeaves">
        {/* 叶 1：主花球下方偏左，平展向下微展 */}
        {renderFlatLeaf(55, 58, 26, 16, 135)}
        {/* 叶 2：主花球下方偏右 */}
        {renderFlatLeaf(65, 58, 24, 15, -145)}
        {/* 叶 3：次花球右下侧叶片，平实自然垫托 */}
        {renderFlatLeaf(100, 94, 25, 16, -115)}
        {/* 叶 4：下部近瓶口处扁平叶片 */}
        {renderFlatLeaf(85, 116, 20, 13, -80)}
      </g>

      {/* ── 架构 4：高低搭配的两朵饱满绣球大花球 ── */}
      <g id="hydrangeaSphericalBlooms">
        {/* 【主花球】：高挑偏左（Y: 48, X: 58），丰满硕大的立体圆球花簇 */}
        <g id="hydrangeaMainSphere" style={fl1}>
          {renderHydrangeaHead(58, 48, 27, 24, 1.05)}
        </g>

        {/* 【次花球】：低倚偏右（Y: 88, X: 96），小巧圆润，与主花高低辉映 */}
        <g id="hydrangeaSecondarySphere" style={fl2}>
          {renderHydrangeaHead(96, 88, 22, 19, 0.95)}
        </g>
      </g>

      {/* ── 架构 5：瓶口分枝处的小巧白色星状碎花装饰（如参考图所示精致点缀） ── */}
      <g id="hydrangeaTinyFillers">
        {/* 细小花梗 */}
        <path d="M 78 118 Q 82 112 86 108" stroke={stemFresh} strokeWidth="0.8" fill="none" />
        <path d="M 80 116 Q 86 114 90 111" stroke={stemFresh} strokeWidth="0.7" fill="none" />
        <path d="M 77 119 Q 80 115 82 112" stroke={stemFresh} strokeWidth="0.7" fill="none" />

        {renderTinyFillerFlower(86, 108, 2.3)}
        {renderTinyFillerFlower(90, 111, 2.1)}
        {renderTinyFillerFlower(82, 112, 2.0)}
        {renderTinyFillerFlower(88, 116, 1.9)}
      </g>
    </g>
  );
};
