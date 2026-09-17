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
import { FlowerRenderProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle, getFlowerAgingFilter } from '../utils/lifecycle';

export const HYDRANGEA_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.50, fallSpan: 0.06, startX: 96, startY: 76, landX: 102, landY: 194, rx: 4.2, ry: 3.6, landRot: 26, swayAmp: 14, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.40, fallSpan: 0.05, startX: 46, startY: 42, landX: 40, landY: 193, rx: 4.5, ry: 3.8, landRot: -28, swayAmp: 12, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.28, fallSpan: 0.06, startX: 68, startY: 36, landX: 74, landY: 195, rx: 4.6, ry: 3.9, landRot: -18, swayAmp: 16, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.18, fallSpan: 0.05, startX: 86, startY: 82, landX: 92, landY: 197, rx: 4.8, ry: 4.0, landRot: 32, swayAmp: 18, swayFreq: 4.0 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.04, startX: 52, startY: 50, landX: 58, landY: 196, rx: 4.4, ry: 3.8, landRot: 14, swayAmp: 14, swayFreq: 4.2 },
];

export const renderHydrangeasFlower = (props: FlowerRenderProps): string => {
  const { health, dryFactor, isFaded } = props;
  const agingStyle = getFlowerAgingFilter(health, isFaded);

  // ── 花色：淡紫中透着白色（温润白透丁香紫，去燥降曝，保留花瓣纹理与通透层叠） ──
  const floretSoftWhite = lerpColor('#f8f4ff', '#f3ebd6', dryFactor);
  const floretLilacLight = lerpColor('#e9d5ff', '#decaba', dryFactor);
  const floretLilacMid = lerpColor('#c084fc', '#b79e8c', dryFactor);
  const floretLilacDark = lerpColor('#9333ea', '#8b6f5b', dryFactor);
  const floretShadow = lerpColor('#6b21a8', '#5c4533', dryFactor);
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
      `<g transform="${`translate(${cx}, ${cy}) rotate(${rot})`}" opacity="${opacity}">
        
        <path d="${`M 0 0 C -${r * 0.55} -${r * 0.4}, -${r * 0.45} -${r}, 0 -${r * 1.05} C ${r * 0.45} -${r}, ${r * 0.55} -${r * 0.4}, 0 0 Z`}" fill="${fillId}" stroke="${floretLilacMid}" stroke-width="0.3" />
        <path d="${`M 0 0 C -${r * 0.55} ${r * 0.4}, -${r * 0.45} ${r}, 0 ${r * 1.05} C ${r * 0.45} ${r}, ${r * 0.55} ${r * 0.4}, 0 0 Z`}" fill="${fillId}" stroke="${floretLilacMid}" stroke-width="0.3" />
        <path d="${`M 0 0 C -${r * 0.4} -${r * 0.55}, -${r} -${r * 0.45}, -${r * 1.05} 0 C -${r} ${r * 0.45}, -${r * 0.4} ${r * 0.55}, 0 0 Z`}" fill="${fillId}" stroke="${floretLilacMid}" stroke-width="0.3" />
        <path d="${`M 0 0 C ${r * 0.4} -${r * 0.55}, ${r} -${r * 0.45}, ${r * 1.05} 0 C ${r} ${r * 0.45}, ${r * 0.4} ${r * 0.55}, 0 0 Z`}" fill="${fillId}" stroke="${floretLilacMid}" stroke-width="0.3" />
        
        <circle cx="0" cy="0" r="0.8" fill="${floretLilacLight}" />
        <circle cx="0" cy="0" r="0.4" fill="${floretPistil}" opacity="0.9" />
      </g>`
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
      `<g transform="${`translate(${cx}, ${cy}) scale(${scale})`}">
        
        <ellipse cx="0" cy="0" rx="${rx * 0.96}" ry="${ry * 0.96}" fill="url(#hydrangeaSphereShadeGrad)" filter="url(#hydrangeaSoftShadow)" />

        
        ${renderFloret(-rx * 0.88, -ry * 0.32, 4.4, 25, 0.95, false)}
        ${renderFloret(rx * 0.86, -ry * 0.30, 4.4, -20, 0.95, false)}
        ${renderFloret(-rx * 0.78, ry * 0.45, 4.5, 42, 0.95, false)}
        ${renderFloret(rx * 0.76, ry * 0.48, 4.5, -36, 0.95, false)}
        ${renderFloret(-rx * 0.45, -ry * 0.85, 4.6, -15, 0.96, true)}
        ${renderFloret(0, -ry * 0.95, 4.8, 8, 0.98, true)}
        ${renderFloret(rx * 0.42, -ry * 0.85, 4.6, 28, 0.96, true)}
        ${renderFloret(-rx * 0.52, ry * 0.82, 4.6, 12, 0.95, false)}
        ${renderFloret(0, ry * 0.92, 4.7, -10, 0.95, false)}
        ${renderFloret(rx * 0.50, ry * 0.82, 4.6, -26, 0.95, false)}

        
        ${renderFloret(-rx * 0.65, -ry * 0.48, 4.8, -12, 0.98, true)}
        ${renderFloret(-rx * 0.30, -ry * 0.62, 5.0, 32, 1.0, true)}
        ${renderFloret(rx * 0.28, -ry * 0.60, 5.0, -18, 1.0, true)}
        ${renderFloret(rx * 0.62, -ry * 0.45, 4.8, 22, 0.98, false)}
        ${renderFloret(-rx * 0.66, 0, 5.0, 15, 0.98, true)}
        ${renderFloret(rx * 0.68, 0, 5.0, -14, 0.98, false)}
        ${renderFloret(-rx * 0.58, ry * 0.35, 5.0, -22, 0.98, false)}
        ${renderFloret(-rx * 0.22, ry * 0.55, 5.1, 18, 1.0, false)}
        ${renderFloret(rx * 0.24, ry * 0.55, 5.1, -12, 1.0, false)}
        ${renderFloret(rx * 0.60, ry * 0.32, 5.0, 26, 0.98, false)}

        
        ${renderFloret(-rx * 0.35, -ry * 0.25, 5.4, 6, 1.0, true)}
        ${renderFloret(0, -ry * 0.38, 5.6, -15, 1.0, true)}
        ${renderFloret(rx * 0.32, -ry * 0.22, 5.4, 28, 1.0, true)}
        ${renderFloret(-rx * 0.38, ry * 0.10, 5.5, -8, 1.0, true)}
        ${renderFloret(-rx * 0.05, -ry * 0.05, 5.8, 14, 1.0, true)}
        ${renderFloret(rx * 0.35, ry * 0.10, 5.5, -24, 1.0, true)}
        ${renderFloret(-rx * 0.12, ry * 0.28, 5.4, 32, 1.0, true)}
        ${renderFloret(rx * 0.18, ry * 0.25, 5.4, -6, 1.0, true)}
      </g>`
    );
  };

  /**
   * 渲染带立体造节（竹节膨大环与叶痕）的花茎节点
   */
  const renderStemNode = (cx: number, cy: number, r: number = 3.2, rot: number = 0) => (
    `<g transform="${`translate(${cx}, ${cy}) rotate(${rot})`}">
      
      <ellipse cx="0" cy="0" rx="${r}" ry="${r * 0.5}" fill="${nodeRingDark}" stroke="${stemHighlight}" stroke-width="0.4" />
      
      <path d="${`M -${r * 0.9} 0 Q 0 -${r * 0.25} ${r * 0.9} 0`}" stroke="${nodeRingBrown}" stroke-width="0.6" fill="none" opacity="0.85" />
    </g>`
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
      `<g transform="${`translate(${sx}, ${sy}) rotate(${angle})`}">
        
        <path d="${`M 0 0 L 0 ${length * 0.18}`}" stroke="${stemDark}" stroke-width="1.6" stroke-linecap="round" />
        
        <path d="${`
            M 0 ${length * 0.18}
            C -${width * 0.5} ${length * 0.32}, -${width * 0.65} ${length * 0.65}, -${width * 0.4} ${length * 0.88}
            C -${width * 0.2} ${length * 0.98}, 0 ${length * 1.02}, 0 ${length * 1.05}
            C 0 ${length * 1.02}, ${width * 0.2} ${length * 0.98}, ${width * 0.4} ${length * 0.88}
            C ${width * 0.65} ${length * 0.65}, ${width * 0.5} ${length * 0.32}, 0 ${length * 0.18}
            Z
          `}" fill="url(#hydrangeaLeafGrad)" stroke="${leafDark}" stroke-width="0.5" filter="url(#hydrangeaSoftShadow)" />
        
        <path d="${`M 0 ${length * 0.18} Q 0 ${length * 0.6} 0 ${length * 1.02}`}" stroke="${leafVein}" stroke-width="0.8" fill="none" opacity="0.85" />
        
        <path d="${`M 0 ${length * 0.38} Q -${width * 0.25} ${length * 0.48} -${width * 0.42} ${length * 0.52}`}" stroke="${leafVein}" stroke-width="0.45" fill="none" opacity="0.65" />
        <path d="${`M 0 ${length * 0.38} Q ${width * 0.25} ${length * 0.48} ${width * 0.42} ${length * 0.52}`}" stroke="${leafVein}" stroke-width="0.45" fill="none" opacity="0.65" />
        <path d="${`M 0 ${length * 0.58} Q -${width * 0.25} ${length * 0.68} -${width * 0.38} ${length * 0.72}`}" stroke="${leafVein}" stroke-width="0.45" fill="none" opacity="0.65" />
        <path d="${`M 0 ${length * 0.58} Q ${width * 0.25} ${length * 0.68} ${width * 0.38} ${length * 0.72}`}" stroke="${leafVein}" stroke-width="0.45" fill="none" opacity="0.65" />
        <path d="${`M 0 ${length * 0.76} Q -${width * 0.18} ${length * 0.84} -${width * 0.25} ${length * 0.86}`}" stroke="${leafVein}" stroke-width="0.4" fill="none" opacity="0.55" />
        <path d="${`M 0 ${length * 0.76} Q ${width * 0.18} ${length * 0.84} ${width * 0.25} ${length * 0.86}`}" stroke="${leafVein}" stroke-width="0.4" fill="none" opacity="0.55" />
      </g>`
    );
  };

  /**
   * 渲染基部分枝处的小巧白色碎花簇
   */
  const renderTinyFillerFlower = (cx: number, cy: number, r: number = 2.4) => (
    `<g transform="${`translate(${cx}, ${cy})`}">
      <circle cx="0" cy="${-r}" r="${r * 0.55}" fill="${tinyPetal}" />
      <circle cx="${-r * 0.95}" cy="${-r * 0.31}" r="${r * 0.55}" fill="${tinyPetal}" />
      <circle cx="${-r * 0.59}" cy="${r * 0.81}" r="${r * 0.55}" fill="${tinyPetal}" />
      <circle cx="${r * 0.59}" cy="${r * 0.81}" r="${r * 0.55}" fill="${tinyPetal}" />
      <circle cx="${r * 0.95}" cy="${-r * 0.31}" r="${r * 0.55}" fill="${tinyPetal}" />
      <circle cx="0" cy="0" r="${r * 0.38}" fill="${tinyPistil}" />
    </g>`
  );

  return (
    `<g id="hydrangeasFlora" style="${agingStyle}">
      <defs>
        
        <radialGradient id="hydrangeaSphereShadeGrad" cx="35%" cy="32%" r="68%">
          <stop offset="0%" stop-color="${floretLilacLight}" stop-opacity="0.85" />
          <stop offset="42%" stop-color="${floretLilacMid}" stop-opacity="0.82" />
          <stop offset="78%" stop-color="${floretLilacDark}" stop-opacity="0.8" />
          <stop offset="100%" stop-color="${floretShadow}" stop-opacity="0.75" />
        </radialGradient>

        
        <linearGradient id="floretBrightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${floretSoftWhite}" />
          <stop offset="45%" stop-color="${floretLilacLight}" />
          <stop offset="100%" stop-color="${floretLilacMid}" />
        </linearGradient>

        
        <linearGradient id="floretNormalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${floretLilacLight}" />
          <stop offset="60%" stop-color="${floretLilacMid}" />
          <stop offset="100%" stop-color="${floretLilacDark}" />
        </linearGradient>

        
        <linearGradient id="hydrangeaLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${leafLight}" />
          <stop offset="45%" stop-color="${leafMid}" />
          <stop offset="100%" stop-color="${leafDark}" />
        </linearGradient>

        
        <linearGradient id="hydrangeaStemCylinderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${stemDark}" />
          <stop offset="28%" stop-color="${stemFresh}" />
          <stop offset="55%" stop-color="${stemHighlight}" />
          <stop offset="85%" stop-color="${stemFresh}" />
          <stop offset="100%" stop-color="${stemDark}" />
        </linearGradient>

        
        <linearGradient id="hydrangeaGrassGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="${grassDark}" />
          <stop offset="50%" stop-color="${leafMid}" />
          <stop offset="100%" stop-color="${grassTip}" />
        </linearGradient>

        
        <filter id="hydrangeaSoftShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0.6" dy="1.2" stdDeviation="0.8" floodColor="#0f172a" floodOpacity="0.2" />
        </filter>
      </defs>

      
      <g id="hydrangeaDecorativeGrass">
        
        <g class="animate-sway-grass-tall" style="transform-origin: ${'76px 126px'};">
          <path d="M 76 100 C 80 75, 92 38, 102 6" stroke="url(#hydrangeaGrassGrad)" stroke-width="1.2" fill="none" stroke-linecap="round" />
          <path d="M 78 100 C 82 72, 96 44, 108 18" stroke="url(#hydrangeaGrassGrad)" stroke-width="1.0" fill="none" stroke-linecap="round" />
        </g>

        
        <g class="animate-sway-grass-weeping" style="transform-origin: ${'73px 98px'};">
          <path d="M 73 98 C 66 82, 52 68, 36 68 C 22 68, 13 86, 11 108" stroke="url(#hydrangeaGrassGrad)" stroke-width="1.3" fill="none" stroke-linecap="round" />
        </g>
      </g>

      
      <g id="hydrangeaStems">
        
        <path d="M 75 128 L 74 96" stroke="url(#hydrangeaStemCylinderGrad)" stroke-width="4.2" fill="none" stroke-linecap="round" />
        
        ${renderStemNode(74, 96, 3.2, -5)}

        
        <path d="M 74 96 C 77 92, 81 87, 84 82" stroke="url(#hydrangeaStemCylinderGrad)" stroke-width="3.4" fill="none" stroke-linecap="round" />
        
        ${renderStemNode(84, 82, 2.6, 25)}

        
        <path d="M 74 96 C 72 84, 69 73, 66 62" stroke="url(#hydrangeaStemCylinderGrad)" stroke-width="3.8" fill="none" stroke-linecap="round" />
        
        ${renderStemNode(66, 62, 2.9, -15)}

        
        <path d="M 66 62 C 63 54, 59 47, 56 40" stroke="url(#hydrangeaStemCylinderGrad)" stroke-width="3.4" fill="none" stroke-linecap="round" />
        
        ${renderStemNode(56, 40, 2.8, -20)}
      </g>

      
      <g id="hydrangeaFlatLeaves">
        
        <g class="animate-leaf-sway-1-gentle" style="transform-origin: ${'52px 42px'};">
          ${renderFlatLeaf(52, 42, 25, 16, 130)}
        </g>
        
        <g class="animate-leaf-sway-2-gentle" style="transform-origin: ${'62px 42px'};">
          ${renderFlatLeaf(62, 42, 23, 15, -140)}
        </g>

        
        <g class="animate-leaf-sway-3-gentle" style="transform-origin: ${'88px 82px'};">
          ${renderFlatLeaf(88, 82, 22, 15, -115)}
        </g>
      </g>

      
      <g id="hydrangeaSphericalBlooms">
        
        <g id="hydrangeaMainSphere" class="animate-sway-hydrangea-main" style="transform-origin: ${'56px 40px'};">
          ${renderHydrangeaHead(56, 32, 27, 24, 1.05)}
        </g>

        
        <g id="hydrangeaSecondarySphere" class="animate-sway-hydrangea-sub" style="transform-origin: ${'84px 82px'};">
          ${renderHydrangeaHead(86, 74, 22, 19, 0.95)}
        </g>
      </g>

      
      <g id="hydrangeaTinyFillers">
        <path d="M 75 94 Q 78 89 80 85" stroke="${stemFresh}" stroke-width="0.8" fill="none" />
        <path d="M 76 92 Q 80 88 83 87" stroke="${stemFresh}" stroke-width="0.7" fill="none" />

        ${renderTinyFillerFlower(80, 85, 2.3)}
        ${renderTinyFillerFlower(83, 87, 2.0)}
        ${renderTinyFillerFlower(78, 89, 1.9)}
      </g>
    </g>`
  );
};
