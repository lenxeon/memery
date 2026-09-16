/**
 * @file CarnationsFlower.tsx
 * @description 【写实温润蜜桃粉康乃馨】严格按照用户要求与花艺美学重构：
 * 1. 整体大幅收拢（角度更聚拢自然，符合插花收束美学）：
 *    - 引入动态 spreadFactor 变量（由花瓶口径驱动：小口花器自动聚拢，大口花器自然开放）；
 * 2. 精妙构图（1旺花 + 2小花 + 2花骨朵，总计5朵）：
 *    - 居中偏低：1 朵开得旺一点的饱满波浪层叠大花（深浅交融，立体生动）；
 *    - 左右两侧中位：2 朵小巧初绽花（紧凑杯状，向上微放）；
 *    - 左右高梢：2 支修长秀丽的【小花骨朵】（长青绿花托，顶端微吐娇嫩花尖）；
 * 3. 严格一花一径：5 根细长青绿花茎各自直通瓶底，端点与花托 100% 严丝合缝相接，无叶相杂。
 * 4. 粉嫩色彩：水润蜜桃粉、柔嫩粉白与奶白细碎波浪锯齿边，青绿花托层次细腻。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const CARNATION_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.5, fallSpan: 0.06, startX: 104, startY: 42, landX: 110, landY: 194, rx: 4.5, ry: 2.8, landRot: 28, swayAmp: 12, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.35, fallSpan: 0.06, startX: 46, startY: 46, landX: 50, landY: 193, rx: 4.6, ry: 2.9, landRot: -30, swayAmp: 10, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.15, fallSpan: 0.05, startX: 75, startY: 64, landX: 78, landY: 195, rx: 4.8, ry: 3.0, landRot: 14, swayAmp: 14, swayFreq: 3.8 },
];

export const CarnationsFlower: React.FC<FlowerComponentProps> = ({
  health,
  dryFactor,
  isFaded,
  spreadFactor = 1.0,
}) => {
  // ── 娇嫩粉润蜜桃粉色系（水灵通透粉白、柔桃粉、腮红粉，杜绝浓重暗紫） ──
  const petalWhite = lerpColor('#ffffff', '#faf6f5', dryFactor);
  const petalSoftEdge = lerpColor('#fff1f2', '#f6ede8', dryFactor);
  const petalBlush = lerpColor('#fce7f3', '#eadad2', dryFactor);
  const petalMid = lerpColor('#f9a8d4', '#d8b2a8', dryFactor);
  const petalCore = lerpColor('#f472b6', '#c4877b', dryFactor);
  const petalDeep = lerpColor('#ec4899', '#ab6256', dryFactor);

  // ── 清新饱满的青绿花托与细长花茎 ──
  const calyxBase = lerpColor('#2d6a1e', '#49442b', dryFactor);
  const calyxMid = lerpColor('#529e2f', '#6e673e', dryFactor);
  const calyxLight = lerpColor('#86efac', '#a4a273', dryFactor);
  const calyxTeeth = lerpColor('#3f8222', '#565130', dryFactor);

  const stemDark = lerpColor('#2b641d', '#454029', dryFactor);
  const stemBright = lerpColor('#5aa338', '#7b734f', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.5);
  const fl2 = getBlossomDropStyle(health, 0.4);
  const fl3 = getBlossomDropStyle(health, 0.28);
  const fl4 = getBlossomDropStyle(health, 0.16);
  const fl5 = getBlossomDropStyle(health, 0.05);

  const overallOpacity = isFaded ? 0.45 : Math.max(0.65, health);

  /**
   * 细长圆柱杯状青绿花托 (Calyx)
   * 原点 (0, 0) 严格位于花托底端中央，与花茎端点 100% 严密贴合无缝！
   */
  const renderCalyx = (h: number = 22, wTop: number = 4.8, wBottom: number = 1.8) => (
    <g>
      {/* 花托基部小苞片 */}
      <path
        d={`M -${wBottom * 1.3} 1 L -${wBottom * 1.5} -3.5 L -${wBottom * 0.7} -2.5 L 0 -4.5 L ${wBottom * 0.7} -2.5 L ${wBottom * 1.5} -3.5 L ${wBottom * 1.3} 1 Z`}
        fill={calyxTeeth}
      />
      {/* 倒圆锥花托主筒体 */}
      <path
        d={`M -${wBottom} 0 
           C -${wBottom * 1.15} -${h * 0.3}, -${wTop * 0.85} -${h * 0.7}, -${wTop} -${h} 
           C -${wTop * 0.5} -${h + 1}, ${wTop * 0.5} -${h + 1}, ${wTop} -${h} 
           C ${wTop * 0.85} -${h * 0.7}, ${wBottom * 1.15} -${h * 0.3}, ${wBottom} 0 Z`}
        fill="url(#carnationCalyxGrad)"
        stroke={calyxBase}
        strokeWidth="0.3"
      />
      {/* 迎光圆柱侧高光 */}
      <path
        d={`M ${wBottom * 0.2} -1 Q ${wTop * 0.3} -${h * 0.5} ${wTop * 0.2} -${h}`}
        stroke={calyxLight}
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.85"
        fill="none"
      />
      {/* 顶部包萼尖齿：紧贴花瓣基底向上包拢 */}
      <path
        d={`M -${wTop} -${h} 
           L -${wTop * 0.75} -${h + 3.2} 
           L -${wTop * 0.35} -${h + 0.5} 
           L 0 -${h + 4.0} 
           L ${wTop * 0.35} -${h + 0.5} 
           L ${wTop * 0.75} -${h + 3.2} 
           L ${wTop} -${h} Z`}
        fill={calyxTeeth}
        stroke={calyxBase}
        strokeWidth="0.3"
      />
    </g>
  );

  /**
   * 1. 【小花骨朵】（紧致修长，青绿长花托顶端初吐一抹娇嫩粉蕾）
   */
  const renderTinyBud = (scale: number = 0.95) => (
    <g transform={`scale(${scale})`}>
      {renderCalyx(21, 4.2, 1.7)}
      <g transform="translate(0, -22)">
        <path
          d="M -3 1 C -4 -4, -3 -9, 0 -11 C 3 -9, 4 -4, 3 1 Z"
          fill="url(#petalCoreGrad)"
        />
        <path
          d="M -2 -1 Q -3 -7 0 -9 Q 3 -7 2 -1 Z"
          fill="url(#petalBlushGrad)"
        />
        <path
          d="M -2 -7 Q 0 -10 2 -7"
          stroke={petalWhite}
          strokeWidth="0.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </g>
  );

  /**
   * 2. 【小朵初绽花】（开的小一点，紧凑杯状向上微放，水润波浪碎褶）
   */
  const renderSmallBloom = (scale: number = 0.98) => (
    <g transform={`scale(${scale})`}>
      {renderCalyx(19, 5.0, 1.8)}
      <g transform="translate(0, -20)">
        {/* 外层舒展小波浪瓣 */}
        <path
          d="M -8 1 C -10 -5, -8 -13, -4 -16 C -1 -11, 0 -14, 1 -11 C 5 -14, 8 -11, 8 1 Z"
          fill="url(#petalLightGrad)"
        />
        {/* 中层细密起伏褶皱花瓣 */}
        <path
          d="M -7 -2 
             C -9 -7, -6 -12, -3 -14 
             C 0 -11, 1 -11, 4 -14 
             C 7 -12, 8 -7, 6 -2 
             C 3 0, -3 0, -7 -2 Z"
          fill="url(#petalBlushGrad)"
        />
        {/* 核心紧聚小皱瓣 */}
        <path
          d="M -4 -4 Q -6 -9 -2 -11 Q 0 -8 2 -11 Q 5 -9 3 -4 Z"
          fill="url(#petalCoreGrad)"
        />
        <path
          d="M -2 -5 Q 0 -9 2 -5 Z"
          fill={petalDeep}
          opacity="0.8"
        />
        {/* 细密波浪锯齿高光边 */}
        <path
          d="M -7 -10 Q -4 -14 -1 -11 Q 2 -14 6 -10"
          stroke={petalWhite}
          strokeWidth="0.55"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M -4 -9 Q 0 -11 3 -9"
          stroke={petalSoftEdge}
          strokeWidth="0.45"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </g>
  );

  /**
   * 3. 【饱满盛开主花】（开得旺一点的柔粉大花：层次丰富、层叠波浪繁复，绝无生硬平盘）
   */
  const renderLushBloom = (scale: number = 1.06) => (
    <g transform={`scale(${scale})`}>
      {renderCalyx(18, 5.5, 2.0)}
      <g transform="translate(0, -19)">
        {/* 1. 外层柔粉大波浪衬裙 */}
        <path
          d="M -13 1 
             C -16 -6, -12 -15, -7 -18 
             C -3 -13, 0 -16, 2 -13 
             C 5 -16, 9 -13, 12 -18 
             C 16 -14, 15 -6, 13 1 
             C 6 2.5, -6 2.5, -13 1 Z"
          fill="url(#petalLightGrad)"
        />
        {/* 2. 次层细密波浪褶皱群 */}
        <path
          d="M -11 -3 
             C -14 -9, -9 -15, -5 -17 
             C -2 -12, 0 -14, 2 -12 
             C 4 -14, 7 -12, 9 -16 
             C 13 -13, 12 -6, 10 -3 
             C 5 1, -5 1, -11 -3 Z"
          fill="url(#petalBlushGrad)"
        />
        {/* 3. 内层重叠错落小波浪瓣 */}
        <path
          d="M -8 -5 
             Q -11 -12 -6 -15 
             Q -2 -10 0 -13 
             Q 2 -10 6 -15 
             Q 11 -12 8 -5 
             Q 4 0 -4 0 Z"
          fill="url(#petalCoreGrad)"
        />
        {/* 4. 纵深立体阴影褶痕 */}
        <path
          d="M -5 -6 Q -7 -11 -2 -13 Q 1 -10 3 -13 Q 6 -11 4 -6 Z"
          fill={petalDeep}
          opacity="0.85"
        />
        {/* 5. 顶部水润如丝的波浪锯齿高光轮廓 */}
        <path
          d="M -12 -13 Q -9 -17 -5 -14 Q -1 -18 2 -14 Q 5 -17 8 -13 Q 11 -15 12 -10"
          stroke={petalWhite}
          strokeWidth="0.6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M -8 -12 Q -4 -15 -1 -12 Q 2 -15 5 -12 Q 8 -14 9 -8"
          stroke={petalSoftEdge}
          strokeWidth="0.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M -4 -10 Q 0 -12 3 -10"
          stroke="#ffffff"
          strokeWidth="0.45"
          fill="none"
        />
      </g>
    </g>
  );

  // ─────────────────────────────────────────────────────────────
  // 基于收束系数计算枝干坐标与倾角（收拢聚集，依花器口径自适应）：
  // 枝1 (左高-花骨朵)
  // 枝2 (左中-小初绽花)
  // 枝3 (居中-旺一点的盛开主花)
  // 枝4 (右中-小初绽花)
  // 枝5 (右高-花骨朵)
  // ─────────────────────────────────────────────────────────────
  const b1x = 75 - 23 * spreadFactor;
  const b1y = 34;
  const b1rot = -8 * spreadFactor;

  const b2x = 75 - 13 * spreadFactor;
  const b2y = 56;
  const b2rot = -4 * spreadFactor;

  const b3x = 75;
  const b3y = 68;
  const b3rot = 0;

  const b4x = 75 + 13 * spreadFactor;
  const b4y = 54;
  const b4rot = 4 * spreadFactor;

  const b5x = 75 + 23 * spreadFactor;
  const b5y = 40;
  const b5rot = 8 * spreadFactor;

  return (
    <g id="carnationsFlora" style={{ opacity: overallOpacity }}>
      <defs>
        {/* 青绿花托立体渐变 */}
        <linearGradient id="carnationCalyxGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={calyxBase} />
          <stop offset="45%" stopColor={calyxMid} />
          <stop offset="85%" stopColor={calyxLight} />
          <stop offset="100%" stopColor={petalBlush} />
        </linearGradient>

        {/* 细长花茎圆柱立体渐变 (使用 userSpaceOnUse 杜绝垂直线零宽度渐变失效) */}
        <linearGradient id="carnationStemRealGrad" gradientUnits="userSpaceOnUse" x1="40" y1="0" x2="110" y2="0">
          <stop offset="0%" stopColor={stemDark} />
          <stop offset="35%" stopColor={stemBright} />
          <stop offset="75%" stopColor={stemDark} />
          <stop offset="100%" stopColor="#153610" />
        </linearGradient>

        {/* 粉嫩花瓣层级渐变 */}
        <linearGradient id="petalLightGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={petalCore} />
          <stop offset="40%" stopColor={petalMid} />
          <stop offset="80%" stopColor={petalBlush} />
          <stop offset="100%" stopColor={petalWhite} />
        </linearGradient>

        <linearGradient id="petalBlushGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={petalDeep} />
          <stop offset="35%" stopColor={petalCore} />
          <stop offset="75%" stopColor={petalMid} />
          <stop offset="100%" stopColor={petalSoftEdge} />
        </linearGradient>

        <linearGradient id="petalCoreGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={petalDeep} />
          <stop offset="50%" stopColor={petalCore} />
          <stop offset="100%" stopColor={petalMid} />
        </linearGradient>
      </defs>

      {/* ─────────────────────────────────────────────────────────────
          一花一径：5 根细长优雅青绿花茎（无叶，端点与花托基底 100% 精确闭合）
      ───────────────────────────────────────────────────────────── */}
      <g id="carnationLongStems">
        {/* 枝1：直通左高花骨朵 */}
        <path
          d={`M ${75 - 3 * spreadFactor} 125 C ${75 - 8 * spreadFactor} 96, ${b1x + 3} 65, ${b1x} ${b1y}`}
          stroke="url(#carnationStemRealGrad)"
          strokeWidth="2.3"
          fill="none"
          strokeLinecap="round"
        />

        {/* 枝2：直通左中小花 */}
        <path
          d={`M ${75 - 1.5 * spreadFactor} 125 C ${75 - 4 * spreadFactor} 102, ${b2x + 2} 80, ${b2x} ${b2y}`}
          stroke="url(#carnationStemRealGrad)"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />

        {/* 枝3：直通居中旺盛主花 */}
        <path
          d={`M 75 125 C 75.8 106, 74.4 87, ${b3x} ${b3y}`}
          stroke="url(#carnationStemRealGrad)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* 枝4：直通右中小花 */}
        <path
          d={`M ${75 + 1.5 * spreadFactor} 125 C ${75 + 4 * spreadFactor} 102, ${b4x - 2} 80, ${b4x} ${b4y}`}
          stroke="url(#carnationStemRealGrad)"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />

        {/* 枝5：直通右高花骨朵 */}
        <path
          d={`M ${75 + 3 * spreadFactor} 125 C ${75 + 8 * spreadFactor} 96, ${b5x - 3} 68, ${b5x} ${b5y}`}
          stroke="url(#carnationStemRealGrad)"
          strokeWidth="2.3"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* ─────────────────────────────────────────────────────────────
          五朵粉嫩高低有致花朵（1旺花 + 2小花 + 2花骨朵）
      ───────────────────────────────────────────────────────────── */}
      <g id="carnationFlowers">
        {/* 枝1：【小花骨朵】左侧高梢 */}
        <g transform={`translate(${b1x}, ${b1y}) rotate(${b1rot})`} style={fl1}>
          {renderTinyBud(0.95)}
        </g>

        {/* 枝2：【小初绽花】左中位 */}
        <g transform={`translate(${b2x}, ${b2y}) rotate(${b2rot})`} style={fl2}>
          {renderSmallBloom(0.98)}
        </g>

        {/* 枝3：【饱满主花（旺一点）】居中焦点大花 */}
        <g transform={`translate(${b3x}, ${b3y}) rotate(${b3rot})`} style={fl3}>
          {renderLushBloom(1.08)}
        </g>

        {/* 枝4：【小初绽花】右中位 */}
        <g transform={`translate(${b4x}, ${b4y}) rotate(${b4rot})`} style={fl4}>
          {renderSmallBloom(1.0)}
        </g>

        {/* 枝5：【小花骨朵】右侧高梢 */}
        <g transform={`translate(${b5x}, ${b5y}) rotate(${b5rot})`} style={fl5}>
          {renderTinyBud(0.92)}
        </g>
      </g>
    </g>
  );
};
