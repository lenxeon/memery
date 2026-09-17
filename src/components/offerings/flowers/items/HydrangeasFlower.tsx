/**
 * @file HydrangeasFlower.tsx
 * @description 【团圆绣球 / 现代花道双球高低雅供】
 * 严格按照参考图重构优化：
 * 1. 瓶口上方纯净整洁：
 *    - 瓶口至分枝节点一段（Y: 96 ~ 128）为纯净挺拔花茎，完全去除瓶口杂叶杂花；
 * 2. 花茎质感与明显造节（段生长）：
 *    - 主茎呈圆柱形光影质感，下粗上细；
 *    - 在分枝处与叶柄连接处有清晰的茎节（膨大竹节状环与叶痕），呈现植物天然分段生长结构；
 * 3. 完美高低错落与收拢构图：
 *    - 高花球：进一步加长花径，高耸至 Y: 32（X: 56），形成大气质朴的主体；
 *    - 矮花球：向主茎靠近收拢至 Y: 74（X: 86），形成紧凑温馨的依偎呼应；
 * 4. 叶片严格位于花朵下方承托：
 *    - 大花下方左右各有一片扁平宽卵形质感绿叶，小花右下方有一片绿叶，托住花势；
 * 5. 装饰草叶与点缀小花：
 *    - 右侧 2 根细长挺拔草叶高耸冲天（达 Y: 6）；
 *    - 左侧 1 根优雅弧形草叶向左大幅拱弯垂落（至 Y: 108）；
 *    - 两花汇聚节点处紧簇几朵精致白色小碎花；
 * 6. 花球由多层紧密四瓣小花精密堆叠，边缘花瓣突破轮廓，球感自然真实，绝无贴纸感。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle, getFlowerAgingFilter } from '../utils/lifecycle';

export const HYDRANGEA_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.50, fallSpan: 0.06, startX: 96, startY: 76, landX: 102, landY: 194, rx: 4.2, ry: 3.6, landRot: 26, swayAmp: 14, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.40, fallSpan: 0.05, startX: 46, startY: 42, landX: 40, landY: 193, rx: 4.5, ry: 3.8, landRot: -28, swayAmp: 12, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.28, fallSpan: 0.06, startX: 68, startY: 36, landX: 74, landY: 195, rx: 4.6, ry: 3.9, landRot: -18, swayAmp: 16, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.18, fallSpan: 0.05, startX: 86, startY: 82, landX: 92, landY: 197, rx: 4.8, ry: 4.0, landRot: 32, swayAmp: 18, swayFreq: 4.0 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.04, startX: 52, startY: 50, landX: 58, landY: 196, rx: 4.4, ry: 3.8, landRot: 14, swayAmp: 14, swayFreq: 4.2 },
];

export const HydrangeasFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  const agingStyle = getFlowerAgingFilter(health, isFaded);

  // ── 花色：淡紫中透着白色（纯白 -> 柔淡丁香紫 -> 优雅温润紫蓝） ──
  const floretWhite = lerpColor('#ffffff', '#f6f0e8', dryFactor);
  const floretLilacLight = lerpColor('#f3e8ff', '#e5d7ca', dryFactor);
  const floretLilacMid = lerpColor('#d8b4fe', '#c4af9c', dryFactor);
  const floretLilacDark = lerpColor('#a855f7', '#977d69', dryFactor);
  const floretShadow = lerpColor('#7e22ce', '#69513e', dryFactor);
  const floretPistil = lerpColor('#fef08a', '#c2b07e', dryFactor);

  // ── 枝茎、木质化茎节与草叶 ──
  const stemDark = lerpColor('#143d1a', '#2d2816', dryFactor);
  const stemFresh = lerpColor('#22c55e', '#524d2b', dryFactor);
  const stemHighlight = lerpColor('#86efac', '#847e50', dryFactor);
  const nodeRingDark = lerpColor('#14532d', '#2b2314', dryFactor);
  const nodeRingBrown = lerpColor('#78350f', '#4e331b', dryFactor);

  // ── 扁平绿叶 ──
  const leafDark = lerpColor('#0f381e', '#292518', dryFactor);
  const leafMid = lerpColor('#166534', '#454025', dryFactor);
  const leafLight = lerpColor('#22c55e', '#747043', dryFactor);
  const leafVein = lerpColor('#86efac', '#9e9964', dryFactor);

  // ── 细长小草 ──
  const grassDark = lerpColor('#14532d', '#3d381f', dryFactor);
  const grassTip = lerpColor('#84cc16', '#7a763d', dryFactor);

  // ── 碎花小白菊 ──
  const tinyPetal = lerpColor('#ffffff', '#eeddcc', dryFactor);
  const tinyPistil = lerpColor('#facc15', '#b59b48', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.45);
  const fl2 = getBlossomDropStyle(health, 0.15);

  /**
   * 渲染单朵精致四瓣十字小花 (Single Floret)
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
          stroke={floretLilacLight}
          strokeWidth="0.28"
        />
        <path
          d={`M 0 0 C -${r * 0.55} ${r * 0.4}, -${r * 0.45} ${r}, 0 ${r * 1.05} C ${r * 0.45} ${r}, ${r * 0.55} ${r * 0.4}, 0 0 Z`}
          fill={fillId}
          stroke={floretLilacLight}
          strokeWidth="0.28"
        />
        <path
          d={`M 0 0 C -${r * 0.4} -${r * 0.55}, -${r} -${r * 0.45}, -${r * 1.05} 0 C -${r} ${r * 0.45}, -${r * 0.4} ${r * 0.55}, 0 0 Z`}
          fill={fillId}
          stroke={floretLilacLight}
          strokeWidth="0.28"
        />
        <path
          d={`M 0 0 C ${r * 0.4} -${r * 0.55}, ${r} -${r * 0.45}, ${r * 1.05} 0 C ${r} ${r * 0.45}, ${r * 0.4} ${r * 0.55}, 0 0 Z`}
          fill={fillId}
          stroke={floretLilacLight}
          strokeWidth="0.28"
        />
        {/* 花心微小圆蕊 */}
        <circle cx="0" cy="0" r="0.8" fill={floretWhite} />
        <circle cx="0" cy="0" r="0.4" fill={floretPistil} opacity="0.9" />
      </g>
    );
  };

  /**
   * 渲染大型丰满立体绣球花球 (Spherical Hydrangea Head)
   * 由 35+ 朵不同旋转角度与尺寸的四瓣小花密实交叠成圆球状，边缘自然凹凸，饱满立体
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
        {/* 底层柔和阴影球模，避免空隙露底 */}
        <ellipse
          cx="0"
          cy="0"
          rx={rx * 0.96}
          ry={ry * 0.96}
          fill="url(#hydrangeaSphereShadeGrad)"
          filter="url(#hydrangeaSoftShadow)"
        />

        {/* 1. 外缘轮廓小花（打破生硬几何椭圆边界，形成真实花瓣外展毛茸茸轮廓） */}
        {renderFloret(-rx * 0.88, -ry * 0.32, 4.4, 25, 0.95, false)}
        {renderFloret(rx * 0.86, -ry * 0.30, 4.4, -20, 0.95, false)}
        {renderFloret(-rx * 0.78, ry * 0.45, 4.5, 42, 0.95, false)}
        {renderFloret(rx * 0.76, ry * 0.48, 4.5, -36, 0.95, false)}
        {renderFloret(-rx * 0.45, -ry * 0.85, 4.6, -15, 0.96, true)}
        {renderFloret(0, -ry * 0.95, 4.8, 8, 0.98, true)}
        {renderFloret(rx * 0.42, -ry * 0.85, 4.6, 28, 0.96, true)}
        {renderFloret(-rx * 0.52, ry * 0.82, 4.6, 12, 0.95, false)}
        {renderFloret(0, ry * 0.92, 4.7, -10, 0.95, false)}
        {renderFloret(rx * 0.50, ry * 0.82, 4.6, -26, 0.95, false)}

        {/* 2. 中层过渡密实小花 */}
        {renderFloret(-rx * 0.65, -ry * 0.48, 4.8, -12, 0.98, true)}
        {renderFloret(-rx * 0.30, -ry * 0.62, 5.0, 32, 1.0, true)}
        {renderFloret(rx * 0.28, -ry * 0.60, 5.0, -18, 1.0, true)}
        {renderFloret(rx * 0.62, -ry * 0.45, 4.8, 22, 0.98, false)}
        {renderFloret(-rx * 0.66, 0, 5.0, 15, 0.98, true)}
        {renderFloret(rx * 0.68, 0, 5.0, -14, 0.98, false)}
        {renderFloret(-rx * 0.58, ry * 0.35, 5.0, -22, 0.98, false)}
        {renderFloret(-rx * 0.22, ry * 0.55, 5.1, 18, 1.0, false)}
        {renderFloret(rx * 0.24, ry * 0.55, 5.1, -12, 1.0, false)}
        {renderFloret(rx * 0.60, ry * 0.32, 5.0, 26, 0.98, false)}

        {/* 3. 表层受光面饱满核心小花（中心与受光面透白亮紫，球形顶峰突出） */}
        {renderFloret(-rx * 0.35, -ry * 0.25, 5.4, 6, 1.0, true)}
        {renderFloret(0, -ry * 0.38, 5.6, -15, 1.0, true)}
        {renderFloret(rx * 0.32, -ry * 0.22, 5.4, 28, 1.0, true)}
        {renderFloret(-rx * 0.38, ry * 0.10, 5.5, -8, 1.0, true)}
        {renderFloret(-rx * 0.05, -ry * 0.05, 5.8, 14, 1.0, true)}
        {renderFloret(rx * 0.35, ry * 0.10, 5.5, -24, 1.0, true)}
        {renderFloret(-rx * 0.12, ry * 0.28, 5.4, 32, 1.0, true)}
        {renderFloret(rx * 0.18, ry * 0.25, 5.4, -6, 1.0, true)}
      </g>
    );
  };

  /**
   * 渲染带立体造节（竹节膨大环与叶痕）的花茎节点
   */
  const renderStemNode = (cx: number, cy: number, r: number = 3.2, rot: number = 0) => (
    <g transform={`translate(${cx}, ${cy}) rotate(${rot})`}>
      {/* 膨大木质化节环 */}
      <ellipse cx="0" cy="0" rx={r} ry={r * 0.5} fill={nodeRingDark} stroke={stemHighlight} strokeWidth="0.4" />
      {/* 节间横向叶痕木栓环 */}
      <path d={`M -${r * 0.9} 0 Q 0 -${r * 0.25} ${r * 0.9} 0`} stroke={nodeRingBrown} strokeWidth="0.6" fill="none" opacity="0.85" />
    </g>
  );

  /**
   * 渲染扁平宽卵形绣球叶 (Flat Serrated Leaf)
   * 宽大饱满、细致叶齿与羽状侧脉，严格衬托于花朵下方
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
        <path d={`M 0 0 L 0 ${length * 0.18}`} stroke={stemDark} strokeWidth="1.6" strokeLinecap="round" />
        {/* 叶面：平展宽卵形，边缘细腻锯齿 */}
        <path
          d={`
            M 0 ${length * 0.18}
            C -${width * 0.5} ${length * 0.32}, -${width * 0.65} ${length * 0.65}, -${width * 0.4} ${length * 0.88}
            C -${width * 0.2} ${length * 0.98}, 0 ${length * 1.02}, 0 ${length * 1.05}
            C 0 ${length * 1.02}, ${width * 0.2} ${length * 0.98}, ${width * 0.4} ${length * 0.88}
            C ${width * 0.65} ${length * 0.65}, ${width * 0.5} ${length * 0.32}, 0 ${length * 0.18}
            Z
          `}
          fill="url(#hydrangeaLeafGrad)"
          stroke={leafDark}
          strokeWidth="0.5"
          filter="url(#hydrangeaSoftShadow)"
        />
        {/* 主脉 */}
        <path
          d={`M 0 ${length * 0.18} Q 0 ${length * 0.6} 0 ${length * 1.02}`}
          stroke={leafVein}
          strokeWidth="0.8"
          fill="none"
          opacity="0.85"
        />
        {/* 侧脉 */}
        <path d={`M 0 ${length * 0.38} Q -${width * 0.25} ${length * 0.48} -${width * 0.42} ${length * 0.52}`} stroke={leafVein} strokeWidth="0.45" fill="none" opacity="0.65" />
        <path d={`M 0 ${length * 0.38} Q ${width * 0.25} ${length * 0.48} ${width * 0.42} ${length * 0.52}`} stroke={leafVein} strokeWidth="0.45" fill="none" opacity="0.65" />
        <path d={`M 0 ${length * 0.58} Q -${width * 0.25} ${length * 0.68} -${width * 0.38} ${length * 0.72}`} stroke={leafVein} strokeWidth="0.45" fill="none" opacity="0.65" />
        <path d={`M 0 ${length * 0.58} Q ${width * 0.25} ${length * 0.68} ${width * 0.38} ${length * 0.72}`} stroke={leafVein} strokeWidth="0.45" fill="none" opacity="0.65" />
        <path d={`M 0 ${length * 0.76} Q -${width * 0.18} ${length * 0.84} -${width * 0.25} ${length * 0.86}`} stroke={leafVein} strokeWidth="0.4" fill="none" opacity="0.55" />
        <path d={`M 0 ${length * 0.76} Q ${width * 0.18} ${length * 0.84} ${width * 0.25} ${length * 0.86}`} stroke={leafVein} strokeWidth="0.4" fill="none" opacity="0.55" />
      </g>
    );
  };

  /**
   * 渲染基部分枝处的小巧白色碎花簇
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
        {/* 1. 绣球球体柔和深邃渐变底模 */}
        <radialGradient id="hydrangeaSphereShadeGrad" cx="35%" cy="32%" r="68%">
          <stop offset="0%" stopColor={floretWhite} stopOpacity="0.95" />
          <stop offset="40%" stopColor={floretLilacLight} stopOpacity="0.9" />
          <stop offset="76%" stopColor={floretLilacMid} stopOpacity="0.88" />
          <stop offset="92%" stopColor={floretLilacDark} stopOpacity="0.85" />
          <stop offset="100%" stopColor={floretShadow} stopOpacity="0.8" />
        </radialGradient>

        {/* 2. 表层受光小花渐变（淡紫透白，通透清雅） */}
        <linearGradient id="floretBrightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={floretWhite} />
          <stop offset="55%" stopColor={floretLilacLight} />
          <stop offset="100%" stopColor={floretLilacMid} />
        </linearGradient>

        {/* 3. 中底层小花渐变（淡粉紫与丁香紫） */}
        <linearGradient id="floretNormalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={floretLilacLight} />
          <stop offset="60%" stopColor={floretLilacMid} />
          <stop offset="100%" stopColor={floretLilacDark} />
        </linearGradient>

        {/* 4. 扁平绿叶渐变 */}
        <linearGradient id="hydrangeaLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={leafLight} />
          <stop offset="45%" stopColor={leafMid} />
          <stop offset="100%" stopColor={leafDark} />
        </linearGradient>

        {/* 5. 坚韧花茎圆柱形立体光感渐变 */}
        <linearGradient id="hydrangeaStemCylinderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stemDark} />
          <stop offset="28%" stopColor={stemFresh} />
          <stop offset="55%" stopColor={stemHighlight} />
          <stop offset="85%" stopColor={stemFresh} />
          <stop offset="100%" stopColor={stemDark} />
        </linearGradient>

        {/* 6. 细长装饰草渐变 */}
        <linearGradient id="hydrangeaGrassGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={grassDark} />
          <stop offset="50%" stopColor={leafMid} />
          <stop offset="100%" stopColor={grassTip} />
        </linearGradient>

        {/* 7. 柔和影视级立体落影 */}
        <filter id="hydrangeaSoftShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0.6" dy="1.2" stdDeviation="0.8" floodColor="#0f172a" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* ── 架构 1：细长的小草装饰（高耸直立与飘逸垂落） ── */}
      <g id="hydrangeaDecorativeGrass">
        {/* 草 1【右侧最高冲天直草】：穿过花间，直冲上方天际（Y: 6） */}
        <path
          d="M 76 100 C 80 75, 92 38, 102 6"
          stroke="url(#hydrangeaGrassGrad)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        {/* 草 2【右侧伴生直草】：伴随高挺直立（Y: 18） */}
        <path
          d="M 78 100 C 82 72, 96 44, 108 18"
          stroke="url(#hydrangeaGrassGrad)"
          strokeWidth="1.0"
          fill="none"
          strokeLinecap="round"
        />

        {/* 草 3【左侧优雅长草】：大跨度弧形向左弯垂，柔和下摆至 Y: 108 */}
        <path
          d="M 73 98 C 66 82, 52 68, 36 68 C 22 68, 13 86, 11 108"
          stroke="url(#hydrangeaGrassGrad)"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* ── 架构 2：主要花茎（带明显造节、呈段生长、下纯净整洁） ── */}
      <g id="hydrangeaStems">
        {/* 【基段·纯净直立主茎】：瓶口 (75, 128) 至第一分枝造节处 (74, 96)，完全纯净无叶无杂物！ */}
        <path
          d="M 75 128 L 74 96"
          stroke="url(#hydrangeaStemCylinderGrad)"
          strokeWidth="4.2"
          fill="none"
          strokeLinecap="round"
        />
        {/* 节点 1：基部分枝明显造节膨大环 */}
        {renderStemNode(74, 96, 3.2, -5)}

        {/* 【次花分枝短段】：从第一节 (74, 96) 向上紧凑收拢至次花球基底 (84, 82) */}
        <path
          d="M 74 96 C 77 92, 81 87, 84 82"
          stroke="url(#hydrangeaStemCylinderGrad)"
          strokeWidth="3.4"
          fill="none"
          strokeLinecap="round"
        />
        {/* 节点 2：次花花托造节 */}
        {renderStemNode(84, 82, 2.6, 25)}

        {/* 【主花延伸中段】：从第一节 (74, 96) 向上延伸至第二造节 (66, 62) */}
        <path
          d="M 74 96 C 72 84, 69 73, 66 62"
          stroke="url(#hydrangeaStemCylinderGrad)"
          strokeWidth="3.8"
          fill="none"
          strokeLinecap="round"
        />
        {/* 节点 3：主茎中段明显造节 */}
        {renderStemNode(66, 62, 2.9, -15)}

        {/* 【主花顶段】：从第二节 (66, 62) 高挑拔起至主花球基底 (56, 40) */}
        <path
          d="M 66 62 C 63 54, 59 47, 56 40"
          stroke="url(#hydrangeaStemCylinderGrad)"
          strokeWidth="3.4"
          fill="none"
          strokeLinecap="round"
        />
        {/* 节点 4：主花花托造节 */}
        {renderStemNode(56, 40, 2.8, -20)}
      </g>

      {/* ── 架构 3：扁平宽卵形绿叶（严格出现在花朵下方，承托花头） ── */}
      <g id="hydrangeaFlatLeaves">
        {/* 【主花下方·左托叶】：紧贴主花下部，向左下自然平展承托 */}
        {renderFlatLeaf(52, 42, 25, 16, 130)}
        {/* 【主花下方·右托叶】：紧贴主花下部，向右下微展 */}
        {renderFlatLeaf(62, 42, 23, 15, -140)}

        {/* 【次花下方·右侧托叶】：紧贴次花下部，向右下方舒展 */}
        {renderFlatLeaf(88, 82, 22, 15, -115)}
      </g>

      {/* ── 架构 4：高低搭配的两朵饱满圆球形绣球花球 ── */}
      <g id="hydrangeaSphericalBlooms">
        {/* 【高挑主花球】：高挑拔升至 Y: 32（X: 56），硕大丰满圆球（直径约 54px） */}
        <g id="hydrangeaMainSphere" style={fl1}>
          {renderHydrangeaHead(56, 32, 27, 24, 1.05)}
        </g>

        {/* 【收拢次花球】：向主茎紧凑收拢至 Y: 74（X: 86），紧密依偎（直径约 44px） */}
        <g id="hydrangeaSecondarySphere" style={fl2}>
          {renderHydrangeaHead(86, 74, 22, 19, 0.95)}
        </g>
      </g>

      {/* ── 架构 5：两花交界节点处的小巧白色星状碎花装饰 ── */}
      <g id="hydrangeaTinyFillers">
        <path d="M 75 94 Q 78 89 80 85" stroke={stemFresh} strokeWidth="0.8" fill="none" />
        <path d="M 76 92 Q 80 88 83 87" stroke={stemFresh} strokeWidth="0.7" fill="none" />

        {renderTinyFillerFlower(80, 85, 2.3)}
        {renderTinyFillerFlower(83, 87, 2.0)}
        {renderTinyFillerFlower(78, 89, 1.9)}
      </g>
    </g>
  );
};
