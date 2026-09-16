/**
 * @file CarnationsFlower.tsx
 * @description 【写实温润蜜桃粉康乃馨】严格按照参考图重构：
 * 1. 一花一径：细长笔直的青绿圆柱长茎（一花直通瓶口），通体一片叶子不长。
 * 2. 姿态错落（两盛放、三含苞）：
 *    - 居中偏低：一朵饱满圆球状大盛开花
 *    - 左中侧：一朵微昂盛开花（水润展开）
 *    - 左极高、右上、右远：三朵紧凑杯状含苞待放花蕾（花托修长、花瓣紧紧聚拢向上展出细密褶皱）
 * 3. 花托：倒圆锥细长青绿花托，基部深绿自然过渡到浅草绿，上托多齿小萼。
 * 4. 花朵：无花心无花蕊，全是极细密起伏的波浪锯齿叠瓣，立体真实。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const CARNATION_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.5, fallSpan: 0.06, startX: 104, startY: 42, landX: 110, landY: 194, rx: 4.5, ry: 2.8, landRot: 28, swayAmp: 12, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.35, fallSpan: 0.06, startX: 46, startY: 46, landX: 50, landY: 193, rx: 4.6, ry: 2.9, landRot: -30, swayAmp: 10, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.15, fallSpan: 0.05, startX: 75, startY: 64, landX: 78, landY: 195, rx: 4.8, ry: 3.0, landRot: 14, swayAmp: 14, swayFreq: 3.8 },
];

export const CarnationsFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  // ── 温润蜜桃粉色阶 ──
  const petalWhite = lerpColor('#ffffff', '#f5eae2', dryFactor);
  const petalEdge = lerpColor('#fef2f2', '#eddcd2', dryFactor);
  const petalLight = lerpColor('#fbcfe8', '#dfc4b4', dryFactor);
  const petalMid = lerpColor('#f472b6', '#b57f72', dryFactor);
  const petalDeep = lerpColor('#db2777', '#80453c', dryFactor);
  const petalShadow = lerpColor('#831843', '#4f241e', dryFactor);

  // ── 细长青绿花托渐变（深草绿 -> 嫩黄绿 -> 泛白） ──
  const calyxDark = lerpColor('#1b4d1b', '#3b3824', dryFactor);
  const calyxMid = lerpColor('#439324', '#615a38', dryFactor);
  const calyxLight = lerpColor('#86efac', '#8c8a5a', dryFactor);
  const calyxTip = lerpColor('#bbf7d0', '#aba880', dryFactor);

  // 茎色
  const stemBase = lerpColor('#2d6323', '#473f2a', dryFactor);
  const stemLight = lerpColor('#529e3a', '#786e4e', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.5);
  const fl2 = getBlossomDropStyle(health, 0.35);
  const fl3 = getBlossomDropStyle(health, 0.15);

  const overallOpacity = isFaded ? 0.45 : Math.max(0.65, health);

  /**
   * 细长优雅的倒圆锥花托 (Calyx)
   * 严格参照图：圆柱下接花茎，向上微微放宽呈杯形，青绿过渡自然，有明显的纵向立体光
   */
  const renderCalyx = (h: number = 18, w: number = 5.2) => (
    <g>
      {/* 花托主体：倒圆锥长杯形 */}
      <path
        d={`M -${w * 0.45} ${h} L -${w} 3 C -${w * 1.1} 0, -${w * 0.6} -1, 0 -1 C ${w * 0.6} -1, ${w * 1.1} 0, ${w} 3 L ${w * 0.45} ${h} Z`}
        fill="url(#carnationCalyxGrad)"
        stroke={calyxDark}
        strokeWidth="0.4"
      />
      {/* 背光侧微暗 */}
      <path
        d={`M -${w * 0.45} ${h} L -${w} 3 C -${w} 0, 0 -1, 0 ${h} Z`}
        fill="#0a290a"
        opacity="0.22"
      />
      {/* 迎光面圆柱高光 */}
      <path
        d={`M ${w * 0.25} ${h} Q ${w * 0.4} ${h * 0.5} ${w * 0.3} 1`}
        stroke="url(#calyxSpineLight)"
        strokeWidth="1.1"
        fill="none"
        strokeLinecap="round"
      />
      {/* 顶部包萼小尖齿 (5裂) */}
      <path
        d={`M -${w} 3 L -${w * 0.7} -2 L -${w * 0.4} 1 L 0 -3 L ${w * 0.4} 1 L ${w * 0.7} -2 L ${w} 3 Z`}
        fill={calyxLight}
        stroke={calyxDark}
        strokeWidth="0.3"
      />
    </g>
  );

  /**
   * 盛开康乃馨：圆球状层层叠叠密集的波浪锯齿皱褶花瓣
   * 无花心、无花蕊，全是细密褶皱，立体透光
   */
  const renderFullBloom = (scale: number = 1.0, rot: number = 0) => (
    <g transform={`rotate(${rot}) scale(${scale})`}>
      {/* 底部细长花托 */}
      {renderCalyx(20, 5.8)}

      {/* 盛开花冠：多重高密度折皱锯齿瓣 */}
      <g transform="translate(0, 0)">
        {/* 底层外展大波浪瓣 */}
        <path
          d="M -18 1 Q -24 -6 -18 -14 Q -14 -11 -10 -16 Q -5 -10 0 -18 Q 5 -10 10 -16 Q 14 -11 18 -14 Q 24 -6 18 1 Q 10 6 0 6 Q -10 6 -18 1 Z"
          fill="url(#petalOuterGrad)"
          stroke={petalEdge}
          strokeWidth="0.3"
        />

        {/* 次外层翻卷折叠瓣群 */}
        <path
          d="M -16 -2 C -20 -9, -14 -16, -9 -17 C -6 -13, -3 -10, 0 -12 C 3 -10, 6 -13, 9 -17 C 14 -16, 20 -9, 16 -2 C 8 3, -8 3, -16 -2 Z"
          fill="url(#petalMidGrad)"
        />

        {/* 密集内层纵横交错细碎折痕（深浅交叠，完全无花心） */}
        <path
          d="M -12 -5 Q -15 -13 -8 -16 Q -4 -11 0 -15 Q 4 -11 8 -16 Q 15 -13 12 -5 Q 6 1 -6 1 Z"
          fill="url(#petalDenseGrad)"
        />
        <path
          d="M -9 -7 Q -11 -15 -5 -17 Q -1 -12 2 -16 Q 8 -15 8 -7 Q 2 -2 -5 -2 Z"
          fill={petalDeep}
        />
        <path
          d="M -6 -9 Q -7 -15 -2 -16 Q 1 -13 4 -15 Q 6 -11 4 -8 Q 0 -5 -4 -6 Z"
          fill={petalShadow}
        />

        {/* 表面细密波浪锯齿高光碎边（模拟水灵灵的细碎皱褶边缘） */}
        <path
          d="M -17 -8 Q -13 -5 -9 -10 Q -5 -6 0 -11 Q 5 -6 9 -10 Q 13 -5 17 -8"
          stroke={petalWhite}
          strokeWidth="0.5"
          fill="none"
          opacity="0.85"
        />
        <path
          d="M -12 -12 Q -8 -9 -4 -13 Q 0 -9 4 -13 Q 8 -9 12 -12"
          stroke={petalEdge}
          strokeWidth="0.45"
          fill="none"
          opacity="0.9"
        />
        <path
          d="M -7 -14 Q -3 -11 0 -13 Q 3 -11 7 -14"
          stroke="#ffffff"
          strokeWidth="0.5"
          fill="none"
          opacity="0.95"
        />
      </g>
    </g>
  );

  /**
   * 含苞待放康乃馨（参考图中右上及顶梢三支）：
   * 特征：花托格外细长紧俏，花瓣含蓄向上聚拢成直立扇杯形，顶部密布细碎锯齿微绽褶边
   */
  const renderBudBloom = (scale: number = 0.92, rot: number = 0) => (
    <g transform={`rotate(${rot}) scale(${scale})`}>
      {/* 紧俏细长花托 */}
      {renderCalyx(21, 4.8)}

      {/* 紧密合拢向上的花冠 */}
      <g transform="translate(0, -1)">
        {/* 外侧两瓣紧贴向上 */}
        <path
          d="M -11 2 C -14 -4, -13 -13, -8 -17 C -4 -13, -2 -6, 0 1 C 2 -6, 4 -13, 8 -17 C 13 -13, 14 -4, 11 2 C 6 4, -6 4, -11 2 Z"
          fill="url(#petalMidGrad)"
          stroke={petalEdge}
          strokeWidth="0.3"
        />
        {/* 顶部向上散开的密集锯齿花苞口 */}
        <path
          d="M -9 -6 Q -11 -15 -6 -18 Q -2 -13 0 -17 Q 2 -13 6 -18 Q 11 -15 9 -6 Q 4 -1 -4 -1 Z"
          fill="url(#petalDenseGrad)"
        />
        <path
          d="M -5 -9 Q -6 -16 -2 -17 Q 0 -14 2 -17 Q 6 -16 5 -9 Z"
          fill={petalDeep}
        />
        {/* 顶部细密碎浪锯齿白边 */}
        <path
          d="M -8 -15 Q -5 -12 -2 -15 Q 0 -12 2 -15 Q 5 -12 8 -15"
          stroke="#ffffff"
          strokeWidth="0.55"
          fill="none"
          opacity="0.9"
        />
      </g>
    </g>
  );

  return (
    <g id="carnationsFlora" style={{ opacity: overallOpacity }}>
      <defs>
        {/* 细长花托渐变 */}
        <linearGradient id="carnationCalyxGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={calyxDark} />
          <stop offset="50%" stopColor={calyxMid} />
          <stop offset="85%" stopColor={calyxLight} />
          <stop offset="100%" stopColor={calyxTip} />
        </linearGradient>

        <linearGradient id="calyxSpineLight" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={calyxDark} stopOpacity="0.2" />
          <stop offset="50%" stopColor={calyxTip} stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.7" />
        </linearGradient>

        {/* 细长花茎圆柱立体渐变 */}
        <linearGradient id="carnationStemRealGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stemBase} />
          <stop offset="35%" stopColor={stemLight} />
          <stop offset="75%" stopColor={stemBase} />
          <stop offset="100%" stopColor="#173315" />
        </linearGradient>

        {/* 花瓣层次渐变 */}
        <radialGradient id="petalOuterGrad" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor={petalDeep} />
          <stop offset="45%" stopColor={petalMid} />
          <stop offset="80%" stopColor={petalLight} />
          <stop offset="100%" stopColor={petalEdge} />
        </radialGradient>

        <linearGradient id="petalMidGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={petalDeep} />
          <stop offset="35%" stopColor={petalMid} />
          <stop offset="85%" stopColor={petalLight} />
          <stop offset="100%" stopColor={petalWhite} />
        </linearGradient>

        <linearGradient id="petalDenseGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={petalShadow} />
          <stop offset="40%" stopColor={petalDeep} />
          <stop offset="85%" stopColor={petalMid} />
          <stop offset="100%" stopColor={petalLight} />
        </linearGradient>
      </defs>

      {/* ─────────────────────────────────────────────────────────────
          一花一径：5 根细长优雅的青绿花茎（直通瓶口，无叶，高低舒展）
      ───────────────────────────────────────────────────────────── */}
      <g id="carnationLongStems">
        {/* 1. 居中近景盛放花长茎：稍低，垂直挺立 */}
        <path d="M 75 125 L 75 88 L 74 74" stroke="url(#carnationStemRealGrad)" strokeWidth="3.2" fill="none" strokeLinecap="round" />

        {/* 2. 左中盛放花长茎：微向左斜上方挺出 */}
        <path d="M 73 125 Q 64 85 45 66" stroke="url(#carnationStemRealGrad)" strokeWidth="3.0" fill="none" strokeLinecap="round" />

        {/* 3. 左上极高位含苞长茎：破空高耸，修长挺拔 */}
        <path d="M 71 125 Q 52 75 30 35" stroke="url(#carnationStemRealGrad)" strokeWidth="2.7" fill="none" strokeLinecap="round" />

        {/* 4. 右侧中高含苞长茎：向右上方舒展 */}
        <path d="M 77 125 Q 86 86 92 60" stroke="url(#carnationStemRealGrad)" strokeWidth="2.8" fill="none" strokeLinecap="round" />

        {/* 5. 右远侧含苞长茎：向右侧高位舒展倾斜 */}
        <path d="M 78 125 Q 96 82 116 52" stroke="url(#carnationStemRealGrad)" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      </g>

      {/* ─────────────────────────────────────────────────────────────
          五朵花：两朵盛放、三朵含苞待放，高低层次分明，无叶相衬
      ───────────────────────────────────────────────────────────── */}
      <g id="carnationBlooms">
        {/* 1. 【盛开】居中低位焦点大花：饱满圆球状，波浪锯齿叠瓣密集，正向展示 */}
        <g transform="translate(74, 54)" style={fl1}>
          {renderFullBloom(1.22, 0)}
        </g>

        {/* 2. 【盛开】左中侧盛放花：微向左侧昂立，层叠舒展，自然水灵 */}
        <g transform="translate(45, 46)" style={fl2}>
          {renderFullBloom(1.12, -14)}
        </g>

        {/* 3. 【含苞待放】左上方极高位花蕾：修长花托挺立，顶部紧密微展 */}
        <g transform="translate(30, 15)" style={fl3}>
          {renderBudBloom(0.96, -20)}
        </g>

        {/* 4. 【含苞待放】右中位花蕾：细长花托，直立向上含蓄待放 */}
        <g transform="translate(92, 40)" style={fl3}>
          {renderBudBloom(0.95, 8)}
        </g>

        {/* 5. 【含苞待放】右远侧高位花蕾：向右上倾展微昂 */}
        <g transform="translate(116, 32)" style={fl3}>
          {renderBudBloom(0.92, 22)}
        </g>
      </g>
    </g>
  );
};


