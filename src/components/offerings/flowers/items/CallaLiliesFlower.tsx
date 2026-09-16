/**
 * @file CallaLiliesFlower.tsx
 * @description 【写实粉晕与象牙白马蹄莲（三枝经典大花雅供）】严格按照用户要求与参考图重构：
 * 1. 经典三枝构图（保留三朵大花，疏朗空灵不拥挤）：
 *    - 马蹄莲花型舒展阔大，三朵构成高雅经典的黄金三角错落构图：
 *      • 枝1 (左高-粉晕侧仰): (54, 38)
 *      • 枝2 (右中高-象牙白粉晕微卷): (96, 46)
 *      • 枝3 (居中低-正面粉晕花，展现金黄肉穗与鲜活花喉): (72, 70)
 * 2. 严格一花一径：3 根细长肉质青绿长茎由瓶口直通花底，无杂叶相扰，端点100%精确相接。
 * 3. 真实色彩与质感（彻底告别死白平淡）：
 *    - 翻卷马蹄口沿晕染柔美生动的玫瑰蜜桃粉晕（#fb7185, #f472b6, #fbcfe8）；
 *    - 苞身流线过渡为羊脂玉般丝缎象牙白；
 *    - 花喉与基部透着青翠嫩草绿（#bbf7d0, #86efac）；
 *    - 尖端灵动回钩出标志性翠绿小尾角；
 *    - 正面大花内嵌立体鲜亮金黄肉穗花序；
 * 4. 支持花瓶口径动态自适应 (spreadFactor)。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle, getFlowerAgingFilter } from '../utils/lifecycle';

export const CALLA_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.45, fallSpan: 0.06, startX: 96, startY: 46, landX: 104, landY: 194, rx: 5.8, ry: 3.0, landRot: 28, swayAmp: 14, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.25, fallSpan: 0.06, startX: 54, startY: 38, landX: 58, landY: 193, rx: 6.0, ry: 3.2, landRot: -28, swayAmp: 12, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.1, fallSpan: 0.05, startX: 72, startY: 70, landX: 76, landY: 195, rx: 6.2, ry: 3.4, landRot: 14, swayAmp: 16, swayFreq: 3.8 },
];

export const CallaLiliesFlower: React.FC<FlowerComponentProps> = ({
  health,
  dryFactor,
  isFaded,
  spreadFactor = 1.0,
}) => {
  const agingStyle = getFlowerAgingFilter(health, isFaded);
  // ── 粉晕色彩色阶（参考图中迷人的玫瑰蜜桃粉渐变） ──
  const pinkEdge = lerpColor('#f43f5e', '#b04a5a', dryFactor);
  const pinkMid = lerpColor('#fb7185', '#c26d7c', dryFactor);
  const pinkSoft = lerpColor('#fbcfe8', '#d6a8b1', dryFactor);
  const pinkGlow = lerpColor('#fff1f2', '#f2dfe2', dryFactor);

  // ── 象牙白与丝缎高光 ──
  const ivoryWhite = lerpColor('#ffffff', '#f7f2eb', dryFactor);
  const ivorySoft = lerpColor('#f8fafc', '#ece4d8', dryFactor);
  const ivoryShade = lerpColor('#e2e8f0', '#c4b5a2', dryFactor);

  // ── 嫩绿喉部与青翠尖角 ──
  const throatGreen = lerpColor('#86efac', '#8a9478', dryFactor);
  const throatLime = lerpColor('#bbf7d0', '#adb59d', dryFactor);
  const tipGreen = lerpColor('#65a30d', '#5d6b46', dryFactor);

  // ── 金黄肉穗花序 ──
  const spadixGold = lerpColor('#eab308', '#9e8143', dryFactor);
  const spadixLight = lerpColor('#fef08a', '#d9c9a0', dryFactor);

  // ── 肉质饱满青绿花茎 ──
  const stemDark = lerpColor('#226519', '#464a33', dryFactor);
  const stemLight = lerpColor('#4ade80', '#839e6a', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.45);
  const fl2 = getBlossomDropStyle(health, 0.3);
  const fl3 = getBlossomDropStyle(health, 0.12);

  /**
   * 1. 侧仰/半侧面【粉晕马蹄莲】（参考图中部及上方花朵）
   * 佛焰苞流线漏斗螺旋外翻，口沿泛起娇嫩粉晕，尖端回翘翠绿小尾尖
   */
  const renderPinkSideCalla = (scale: number = 1.15) => (
    <g transform={`scale(${scale})`}>
      {/* 佛焰苞背面阴影内腔 */}
      <path
        d="M -3 0 C -6 -12, -12 -28, -2 -38 C 10 -26, 12 -12, 3 0 Z"
        fill="url(#callaPinkBackGrad)"
      />

      {/* 隐约可见的肉穗花序尖端 */}
      <path
        d="M -1 -12 L -0.5 -26 C -0.5 -28, 1.5 -28, 1.5 -26 L 1 -12 Z"
        fill="url(#callaSpadixGrad)"
      />

      {/* 佛焰苞正面主体：流线漏斗螺旋翻卷 */}
      <path
        d="M -2.5 0 
           C -5 -10, -14 -22, -18 -32 
           C -20 -40, -10 -46, 2 -48 
           C 14 -46, 22 -36, 18 -26 
           C 14 -16, 6 -8, 2.5 0 Z"
        fill="url(#callaPinkFrontGrad)"
        stroke={ivoryShade}
        strokeWidth="0.35"
      />

      {/* 苞口外卷波浪边缘粉晕层 */}
      <path
        d="M -18 -32 
           C -20 -40, -10 -46, 2 -48 
           C 14 -46, 22 -36, 18 -26 
           C 13 -32, 2 -36, -8 -30 
           C -14 -26, -17 -28, -18 -32 Z"
        fill="url(#callaLipPinkGrad)"
        opacity="0.95"
      />

      {/* 优雅反翘的青绿卷尖 (标志性特征) */}
      <path
        d="M 2 -48 C 4 -53, 7 -55, 9 -53 C 7 -51, 5 -50, 4 -47 Z"
        fill={tipGreen}
      />

      {/* 佛焰苞表面肉质纵向微细纹理与丝缎反光 */}
      <path
        d="M -1.5 -2 C -4 -12, -10 -22, -12 -34"
        stroke={pinkMid}
        strokeWidth="0.5"
        strokeOpacity="0.4"
        fill="none"
      />
      <path
        d="M 0 -2 C 2 -14, 8 -24, 11 -32"
        stroke={pinkMid}
        strokeWidth="0.5"
        strokeOpacity="0.35"
        fill="none"
      />
      {/* 迎光丝缎高光弧线 */}
      <path
        d="M -1 -4 C -2 -14, -6 -26, -4 -38"
        stroke={ivoryWhite}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeOpacity="0.75"
        fill="none"
      />
      <path
        d="M -0.5 -5 C -1 -15, -3 -26, -2 -34"
        stroke="#ffffff"
        strokeWidth="0.6"
        strokeOpacity="0.9"
        fill="none"
      />
    </g>
  );

  /**
   * 2. 正面微倾【粉晕大马蹄莲】（参考图左下正面大花朵）
   * 展现圆润翠绿花喉、金黄肉穗花序与全圈外卷波浪粉晕边缘
   */
  const renderPinkFrontCalla = (scale: number = 1.15) => (
    <g transform={`scale(${scale})`}>
      {/* 苞身外漏斗 */}
      <path
        d="M -3 0 
           C -6 -8, -14 -16, -18 -24 
           C -22 -34, -14 -44, 0 -45 
           C 14 -44, 22 -34, 18 -24 
           C 14 -16, 6 -8, 3 0 Z"
        fill="url(#callaPinkFrontGrad)"
        stroke={ivoryShade}
        strokeWidth="0.35"
      />

      {/* 正面深陷的花喉圆腔（清澈嫩草绿） */}
      <ellipse cx="0" cy="-22" rx="7.5" ry="9.5" fill="url(#callaThroatGrad)" />

      {/* 核心金黄肉穗花序 (直立饱满，顶端圆润带微光) */}
      <path
        d="M -2 -17 L -1.5 -29 C -1.5 -32, 1.5 -32, 1.5 -29 L 2 -17 Z"
        fill="url(#callaSpadixGrad)"
      />
      {/* 肉穗表面颗粒质感光点 */}
      <ellipse cx="0" cy="-30" rx="1.6" ry="2.0" fill={spadixLight} />
      <circle cx="-0.6" cy="-24" r="0.6" fill={spadixGold} />
      <circle cx="0.6" cy="-22" r="0.6" fill={spadixLight} />
      <circle cx="-0.4" cy="-20" r="0.5" fill={spadixGold} />

      {/* 外围起伏翻卷波浪形粉红唇边 */}
      <path
        d="M -18 -24 
           C -22 -34, -14 -44, 0 -45 
           C 14 -44, 22 -34, 18 -24 
           C 15 -21, 10 -25, 7 -22 
           C 0 -17, -7 -18, -11 -22 
           C -15 -24, -17 -22, -18 -24 Z"
        fill="url(#callaLipPinkGrad)"
        opacity="0.9"
      />

      {/* 苞顶翠绿反翘小尖尾 */}
      <path
        d="M 0 -45 C 1 -49, 3 -51, 5 -49 C 3 -47, 2 -46, 1 -44 Z"
        fill={tipGreen}
      />

      {/* 丝缎高光微弧 */}
      <path
        d="M -14 -26 C -10 -36, -4 -42, 0 -44"
        stroke={pinkGlow}
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );

  /**
   * 3. 优雅舒展【象牙白微粉卷边马蹄莲】（参考图右侧纯白温润花朵）
   * 温润象牙白、青绿通透花喉、细长回卷青尖与丝绢微光
   */
  const renderWhiteCalla = (scale: number = 1.15) => (
    <g transform={`scale(${scale})`}>
      {/* 内壁阴影 */}
      <path
        d="M -3 0 C -6 -12, -12 -26, -2 -36 C 10 -24, 12 -12, 3 0 Z"
        fill="url(#callaWhiteBackGrad)"
      />

      {/* 肉穗花序 */}
      <path
        d="M -1 -10 L -0.6 -24 C -0.6 -26, 1.4 -26, 1.4 -24 L 1 -10 Z"
        fill="url(#callaSpadixGrad)"
      />

      {/* 正面流线象牙白佛焰苞 */}
      <path
        d="M -2.5 0 
           C -5 -10, -13 -20, -17 -30 
           C -19 -38, -9 -44, 2 -46 
           C 13 -44, 20 -34, 16 -24 
           C 12 -14, 5 -8, 2.5 0 Z"
        fill="url(#callaWhiteFrontGrad)"
        stroke={ivoryShade}
        strokeWidth="0.3"
      />

      {/* 边缘翻卷薄膜透光边 */}
      <path
        d="M -17 -30 C -19 -38, -9 -44, 2 -46 C 13 -44, 20 -34, 16 -24"
        stroke={ivoryWhite}
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
      />

      {/* 尖端标志性嫩绿回卷小尾角 */}
      <path
        d="M 2 -46 C 4 -51, 7 -53, 9 -51 C 7 -49, 5 -48, 4 -45 Z"
        fill={tipGreen}
      />

      {/* 表面纵向肉质纤维微纹与丝缎反光 */}
      <path
        d="M -1 -3 C -3 -12, -8 -22, -10 -32"
        stroke={throatLime}
        strokeWidth="0.5"
        strokeOpacity="0.4"
        fill="none"
      />
      <path
        d="M -1.5 -4 C -2 -14, -5 -25, -3 -36"
        stroke="#ffffff"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeOpacity="0.8"
        fill="none"
      />
    </g>
  );

  // ─────────────────────────────────────────────────────────────
  // 3 枝黄金三角插花空间规划（保留三朵大花，疏朗空灵、错落有致）：
  // 枝1: (左高-粉晕侧仰)
  // 枝2: (右中高-象牙白舒展花)
  // 枝3: (居中偏低-正面粉晕花，展现金黄肉穗)
  // ─────────────────────────────────────────────────────────────
  const b1x = 75 - 20 * spreadFactor;
  const b1y = 38;
  const b1rot = -10 * spreadFactor;

  const b2x = 75 + 20 * spreadFactor;
  const b2y = 46;
  const b2rot = 12 * spreadFactor;

  const b3x = 75 - 3 * spreadFactor;
  const b3y = 70;
  const b3rot = -4 * spreadFactor;

  return (
    <g id="callaLiliesFlora" style={agingStyle}>
      <defs>
        {/* 1. 佛焰苞正面粉晕渐变（基部嫩绿 -> 象牙白身 -> 娇嫩桃粉唇边） */}
        <linearGradient id="callaPinkFrontGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={throatGreen} />
          <stop offset="25%" stopColor={throatLime} />
          <stop offset="55%" stopColor={ivoryWhite} />
          <stop offset="80%" stopColor={pinkSoft} />
          <stop offset="95%" stopColor={pinkMid} />
          <stop offset="100%" stopColor={pinkEdge} />
        </linearGradient>

        {/* 2. 佛焰苞背面阴影渐变 */}
        <linearGradient id="callaPinkBackGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={throatGreen} />
          <stop offset="40%" stopColor={ivoryShade} />
          <stop offset="85%" stopColor={pinkMid} />
          <stop offset="100%" stopColor={pinkEdge} />
        </linearGradient>

        {/* 3. 苞口卷唇粉红光晕 */}
        <linearGradient id="callaLipPinkGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={pinkSoft} stopOpacity="0.3" />
          <stop offset="50%" stopColor={pinkMid} stopOpacity="0.9" />
          <stop offset="100%" stopColor={pinkEdge} stopOpacity="1.0" />
        </linearGradient>

        {/* 4. 象牙白正面渐变（青翠基底 -> 羊脂玉白身 -> 微黄绿反卷尖） */}
        <linearGradient id="callaWhiteFrontGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={throatGreen} />
          <stop offset="28%" stopColor={throatLime} />
          <stop offset="65%" stopColor={ivoryWhite} />
          <stop offset="92%" stopColor={ivorySoft} />
          <stop offset="100%" stopColor="#ecfdf5" />
        </linearGradient>

        {/* 5. 象牙白背面阴影渐变 */}
        <linearGradient id="callaWhiteBackGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={throatGreen} />
          <stop offset="45%" stopColor={ivoryShade} />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>

        {/* 6. 花喉圆腔渐变（鲜活青绿） */}
        <radialGradient id="callaThroatGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="65%" stopColor={throatGreen} />
          <stop offset="100%" stopColor={throatLime} />
        </radialGradient>

        {/* 7. 肉穗金黄渐变 */}
        <linearGradient id="callaSpadixGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="50%" stopColor={spadixGold} />
          <stop offset="100%" stopColor={spadixLight} />
        </linearGradient>

        {/* 8. 肉质细长花茎圆柱立体渐变 (userSpaceOnUse 杜绝零宽度渐变失效) */}
        <linearGradient id="callaStemRealGrad" gradientUnits="userSpaceOnUse" x1="45" y1="0" x2="105" y2="0">
          <stop offset="0%" stopColor={stemDark} />
          <stop offset="35%" stopColor={stemLight} />
          <stop offset="75%" stopColor={stemDark} />
          <stop offset="100%" stopColor="#14380f" />
        </linearGradient>
      </defs>

      {/* ─────────────────────────────────────────────────────────────
          严格一花一径：3 根细长优雅肉质青绿花茎（无叶，端点与花朵底座 100% 严丝合缝）
      ───────────────────────────────────────────────────────────── */}
      <g id="callaStems">
        {/* 枝1 花茎：直通左高粉晕大花 (b1x, b1y) */}
        <path
          d={`M ${75 - 2.8 * spreadFactor} 125 C ${75 - 7 * spreadFactor} 96, ${b1x + 2} 65, ${b1x} ${b1y}`}
          stroke="url(#callaStemRealGrad)"
          strokeWidth="3.2"
          fill="none"
          strokeLinecap="round"
        />

        {/* 枝2 花茎：直通右高象牙白大花 (b2x, b2y) */}
        <path
          d={`M ${75 + 2.8 * spreadFactor} 125 C ${75 + 7 * spreadFactor} 96, ${b2x - 2} 72, ${b2x} ${b2y}`}
          stroke="url(#callaStemRealGrad)"
          strokeWidth="3.2"
          fill="none"
          strokeLinecap="round"
        />

        {/* 枝3 花茎：直通居中低位正面粉晕大花 (b3x, b3y) */}
        <path
          d={`M 75 125 C 75.8 106, 73.8 88, ${b3x} ${b3y}`}
          stroke="url(#callaStemRealGrad)"
          strokeWidth="3.3"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* ─────────────────────────────────────────────────────────────
          三枝阔大马蹄莲（粉晕与象牙白交映，疏密得体、高低生动）
      ───────────────────────────────────────────────────────────── */}
      <g id="callaBlooms">
        {/* 枝1：【粉晕侧仰马蹄莲】左高梢，大而舒展 */}
        <g transform={`translate(${b1x}, ${b1y}) rotate(${b1rot})`} style={fl1}>
          {renderPinkSideCalla(1.15)}
        </g>

        {/* 枝2：【象牙白舒展大花】右侧中高位，温润高贵 */}
        <g transform={`translate(${b2x}, ${b2y}) rotate(${b2rot})`} style={fl2}>
          {renderWhiteCalla(1.12)}
        </g>

        {/* 枝3：【正面粉晕大马蹄莲】居中偏低焦点花，露出金黄肉穗与鲜活花喉 */}
        <g transform={`translate(${b3x}, ${b3y}) rotate(${b3rot})`} style={fl3}>
          {renderPinkFrontCalla(1.18)}
        </g>
      </g>
    </g>
  );
};
