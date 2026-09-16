/**
 * @file PlumBlossomsFlower.tsx
 * @description 【傲霜冷香素白梅】瘦、硬、折·单层五瓣紧贴枝·金丝满心青萼点缀·疏朗极简传统文人插梅。
 * 
 * 艺术四准则：
 * 1. 骨（枝干形态）：“瘦、硬、折” —— 深褐焦墨、枯瘦挺拔木质细枝、硬朗顿挫与骨节感、顶端小分叉、通体不生一片叶。
 * 2. 肉（花瓣结构）：“单层、五瓣、紧贴枝” —— 纯白圆润五瓣如瓷碟平展，无垂吊长梗，直接“咬/贴”在木枝骨节上。
 * 3. 神（花蕊与花蕾）：“金丝满心，青萼点缀” —— 密集金色放射丝与火星花药、直立水滴形嫩青小花苞包覆深色花萼。
 * 4. 韵（整体构图与气度）：“疏朗、素净、极简” —— 仅褐、白、金、青绿四色，疏密有致，清瘦孤高。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const PLUM_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.5, fallSpan: 0.05, startX: 98, startY: 45, landX: 104, landY: 194, rx: 4.5, ry: 3.8, landRot: 25, swayAmp: 14, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.4, fallSpan: 0.05, startX: 58, startY: 96, landX: 62, landY: 193, rx: 4.6, ry: 3.9, landRot: -30, swayAmp: 12, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.3, fallSpan: 0.05, startX: 90, startY: 60, landX: 96, landY: 195, rx: 4.8, ry: 4.0, landRot: -18, swayAmp: 16, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.2, fallSpan: 0.05, startX: 74, startY: 76, landX: 80, landY: 197, rx: 5.0, ry: 4.2, landRot: 35, swayAmp: 18, swayFreq: 4.0 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.04, startX: 68, startY: 36, landX: 74, landY: 196, rx: 5.2, ry: 4.3, landRot: 12, swayAmp: 14, swayFreq: 4.2 },
];

export const PlumBlossomsFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  // 纯白花瓣衰变色：冰洁玉白 -> 微泛淡黄素宣纸白 -> 枯萎温润浅赭
  const petalWhite0 = lerpColor('#ffffff', '#faf6ee', dryFactor);
  const petalWhite50 = lerpColor('#fcfbf8', '#eedec7', dryFactor);
  const petalBase = lerpColor('#f1f5f9', '#cbb398', dryFactor);

  // 焦墨老木苍干色（瘦、硬、枯老）
  const barkDark = lerpColor('#261309', '#1a0c05', dryFactor);
  const barkMid = lerpColor('#3d2212', '#2c170a', dryFactor);
  const barkLight = lerpColor('#5a361e', '#412411', dryFactor);

  // 金丝花蕊与金色小火星花药
  const stamenGold = lerpColor('#fef08a', '#c4a66a', dryFactor);
  const antherGold = lerpColor('#eab308', '#8f6828', dryFactor);

  // 嫩青花蕾与青萼
  const budGreen0 = lerpColor('#86efac', '#8a8868', dryFactor);
  const budGreen100 = lerpColor('#22c55e', '#524f33', dryFactor);
  const calyxDark = lerpColor('#3b1a0e', '#231109', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.5);
  const fl2 = getBlossomDropStyle(health, 0.4);
  const fl3 = getBlossomDropStyle(health, 0.3);
  const fl4 = getBlossomDropStyle(health, 0.2);
  const fl5 = getBlossomDropStyle(health, 0.12);
  const fl6 = getBlossomDropStyle(health, 0.06);

  const branchOpacity = isFaded ? 0.45 : Math.max(0.7, health);

  // ── 肉：单层、五瓣、紧贴枝（平展如瓷小碟，白花、金蕊、青绿心） ──
  const renderPlumBloom = (cx: number, cy: number, r: number = 10, rot: number = 0) => (
    <g transform={`translate(${cx}, ${cy}) rotate(${rot})`}>
      {/* 1. 紧贴木枝的花托背萼点（紧紧咬附在老枝节骨上，绝无吊挂长花梗） */}
      <circle cx="0" cy="0" r={r * 0.42} fill={calyxDark} opacity="0.8" />

      {/* 2. 纯白单层五枚圆润花瓣（如小浅碟般平展舒放） */}
      {[0, 72, 144, 216, 288].map((angle, idx) => (
        <g key={idx} transform={`rotate(${angle})`}>
          <path
            d={`M 0 0 C -${r * 0.65} -${r * 0.45}, -${r * 0.75} -${r * 1.15}, 0 -${r * 1.25} C ${r * 0.75} -${r * 1.15}, ${r * 0.65} -${r * 0.45}, 0 0 Z`}
            fill="url(#whitePlumPetalGrad)"
            stroke={petalBase}
            strokeWidth="0.45"
          />
          {/* 花瓣中央莹润微光与细微纸感脉纹 */}
          <path
            d={`M 0 -${r * 0.25} Q 0 -${r * 0.9} 0 -${r * 1.1}`}
            stroke="#ffffff"
            strokeWidth="0.75"
            strokeLinecap="round"
            opacity="0.8"
          />
        </g>
      ))}

      {/* 3. 神：金丝满心，辐射细丝与金色火星花药（中心点缀青绿嫩芯） */}
      {/* 绿萼梅花心青绿小圆蕊台 */}
      <circle cx="0" cy="0" r={r * 0.22} fill={budGreen100} opacity="0.85" />
      <circle cx="0" cy="0" r={r * 0.12} fill="#14532d" />

      {/* 辐射细金丝 (14 根发散细丝，顶着繁密金黄花药，如金色小火星) */}
      {[0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 330].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const len = r * 0.68;
        const x2 = Math.cos(rad) * len;
        const y2 = Math.sin(rad) * len;
        return (
          <g key={i}>
            <line
              x1="0"
              y1="0"
              x2={x2}
              y2={y2}
              stroke={stamenGold}
              strokeWidth="0.6"
              strokeLinecap="round"
              opacity="0.95"
            />
            {/* 金色小火星花药 */}
            <circle cx={x2} cy={y2} r="0.95" fill={antherGold} />
          </g>
        );
      })}
    </g>
  );

  // ── 神：水滴一样直立生长的嫩青绿色小花苞（基部深色花萼包覆） ──
  const renderWaterDropBud = (x: number, y: number, rot: number = 0, scale: number = 1) => (
    <g transform={`translate(${x}, ${y}) rotate(${rot}) scale(${scale})`}>
      {/* 深色木质小花萼杯 (附于枝上) */}
      <path d="M -2 0 C -2.5 1.5, 2.5 1.5, 2 0 Z" fill={calyxDark} />
      <path d="M -1.8 -0.5 L -2.4 -2.2 L -1 -1.4 L 0 -2.4 L 1 -1.4 L 2.4 -2.2 L 1.8 -0.5 Z" fill={calyxDark} />
      {/* 水滴形嫩青绿色饱满花蕾 (青绿微透纯白尖尖) */}
      <path
        d="M 0 0 C -2.6 -1.8, -3.2 -4.8, 0 -8.5 C 3.2 -4.8, 2.6 -1.8, 0 0 Z"
        fill="url(#greenDropBudGrad)"
        stroke="#15803d"
        strokeWidth="0.4"
      />
      {/* 水滴尖露出一缕微白花瓣尖 */}
      <ellipse cx="0" cy="-6.6" rx="0.9" ry="1.6" fill="#ffffff" opacity="0.9" />
    </g>
  );

  return (
    <g id="plumBlossomsFlora">
      <defs>
        {/* 白梅花瓣莹洁玉白渐变 */}
        <radialGradient id="whitePlumPetalGrad" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="65%" stopColor={petalWhite0} />
          <stop offset="100%" stopColor={petalWhite50} />
        </radialGradient>

        {/* 水滴嫩青花蕾渐变 */}
        <linearGradient id="greenDropBudGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={budGreen100} />
          <stop offset="60%" stopColor={budGreen0} />
          <stop offset="100%" stopColor="#dcfce7" />
        </linearGradient>

        {/* 焦墨枯瘦老枝木纹渐变 */}
        <linearGradient id="thinBarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={barkLight} />
          <stop offset="40%" stopColor={barkMid} />
          <stop offset="100%" stopColor={barkDark} />
        </linearGradient>
      </defs>

      {/* ── 骨：枝干形态“瘦、硬、折” ──
          深褐焦墨，枯瘦挺拔的木质细枝。绝非粗苯圆滑，硬朗顿挫折枝与骨节，顶端小分叉，通体无叶。 */}
      <g id="plumThinStems" style={{ opacity: branchOpacity }}>
        {/* 1. 主枯瘦挺拔细干（自瓶口 75,125 凌空修长而起，宽度仅约 2.2~2.4px） */}
        <path
          d="M 75 125 L 74 112 L 72 102 L 76 88 L 74 76"
          stroke="url(#thinBarkGrad)"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="bevel"
        />

        {/* 2. 主干中段向右上方舒展的折枝（顿挫有力，瘦硬挺拔） */}
        <path
          d="M 74 76 L 82 68 L 92 60 L 98 48 L 106 36 L 115 28"
          stroke="url(#thinBarkGrad)"
          strokeWidth="1.9"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="bevel"
        />

        {/* 右枝末端极细分叉 */}
        <path d="M 106 36 L 112 40 L 118 42" stroke="url(#thinBarkGrad)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M 92 60 L 86 64" stroke="url(#thinBarkGrad)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        <path d="M 98 48 L 105 50" stroke="url(#thinBarkGrad)" strokeWidth="1.2" fill="none" strokeLinecap="round" />

        {/* 3. 向上高耸挺立的孤高长枝（细劲凌空，梢头挺秀） */}
        <path
          d="M 74 76 L 73 62 L 71 48 L 68 34 L 64 18"
          stroke="url(#thinBarkGrad)"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="bevel"
        />

        {/* 左侧微折小分叉枝 */}
        <path d="M 71 48 L 60 42 L 52 40" stroke="url(#thinBarkGrad)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        <path d="M 68 34 L 62 28" stroke="url(#thinBarkGrad)" strokeWidth="1.1" fill="none" strokeLinecap="round" />

        {/* 4. 下段左侧低伸斜骨枝（疏密互衬） */}
        <path
          d="M 72 102 L 62 98 L 54 94 L 46 88"
          stroke="url(#thinBarkGrad)"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="bevel"
        />
        <path d="M 62 98 L 58 104" stroke="url(#thinBarkGrad)" strokeWidth="1.1" fill="none" strokeLinecap="round" />

        {/* 5. 枝条转折处硬朗骨节（Knobby Node swellings） */}
        <ellipse cx="74" cy="112" rx="1.8" ry="1.2" fill={barkDark} stroke={barkLight} strokeWidth="0.5" />
        <ellipse cx="76" cy="88" rx="1.7" ry="1.1" fill={barkDark} stroke={barkLight} strokeWidth="0.5" />
        <ellipse cx="74" cy="76" rx="2.2" ry="1.4" fill={barkDark} stroke={barkLight} strokeWidth="0.6" />
        <ellipse cx="92" cy="60" rx="1.6" ry="1.1" fill={barkDark} stroke={barkLight} strokeWidth="0.5" />
        <ellipse cx="98" cy="48" rx="1.5" ry="1.0" fill={barkDark} stroke={barkLight} strokeWidth="0.5" />
        <ellipse cx="71" cy="48" rx="1.6" ry="1.1" fill={barkDark} stroke={barkLight} strokeWidth="0.5" />
        <ellipse cx="62" cy="98" rx="1.5" ry="1.0" fill={barkDark} stroke={barkLight} strokeWidth="0.5" />

        {/* 细致树皮微皴线（焦墨笔意） */}
        <path d="M 74.8 120 L 74.2 108" stroke={barkLight} strokeWidth="0.6" opacity="0.6" />
        <path d="M 73.5 100 L 75.5 90" stroke={barkLight} strokeWidth="0.5" opacity="0.6" />
        <path d="M 83 67 L 91 61" stroke={barkLight} strokeWidth="0.5" opacity="0.6" />
      </g>

      {/* ── 神：水滴形直立嫩青绿色小花苞（点缀在枝梢与花旁） ── */}
      <g id="plumGreenBuds" style={{ opacity: branchOpacity }}>
        {/* 梢头直立水滴嫩蕾 */}
        {renderWaterDropBud(64, 18, -12, 1.05)}
        {renderWaterDropBud(62, 28, -25, 0.9)}
        {renderWaterDropBud(52, 40, -45, 0.95)}
        {/* 右梢与侧芽直立水滴嫩蕾 */}
        {renderWaterDropBud(115, 28, 25, 1.0)}
        {renderWaterDropBud(118, 42, 38, 0.9)}
        {renderWaterDropBud(105, 50, 18, 0.85)}
        {renderWaterDropBud(86, 64, -20, 0.85)}
        {/* 下枝与老骨间隐现小蕾 */}
        {renderWaterDropBud(46, 88, -35, 0.95)}
        {renderWaterDropBud(58, 104, 30, 0.85)}
        {renderWaterDropBud(76, 86, 15, 0.85)}
      </g>

      {/* ── 肉：纯白单层五瓣梅花（疏朗分布在单枝骨节上，直接贴/咬老枝，小碟盛开） ── */}
      <g id="plumWhiteBlooms">
        {/* 1. 主骨节处核心素白盛开梅花（直接咬在主杈 74,76） */}
        <g style={fl1}>{renderPlumBloom(74, 76, 11.2, 8)}</g>

        {/* 2. 右侧枝斜上盛放梅花（咬在 92,59 骨节处） */}
        <g style={fl2}>{renderPlumBloom(93, 59, 10.5, -20)}</g>

        {/* 3. 右上高枝舒展白梅（咬在 106,36 骨节处） */}
        <g style={fl3}>{renderPlumBloom(106, 36, 10.8, 35)}</g>

        {/* 4. 中挺清拔单朵白梅（咬在 71,48 骨节处） */}
        <g style={fl4}>{renderPlumBloom(71, 48, 10.0, -12)}</g>

        {/* 5. 顶梢高挺清雅小碟白梅（咬在 68,34 骨节处） */}
        <g style={fl5}>{renderPlumBloom(68, 34, 9.5, 16)}</g>

        {/* 6. 下部左折枝点缀素白梅花（咬在 54,94 骨节处，下部呼应） */}
        <g style={fl6}>{renderPlumBloom(54, 94, 9.8, -30)}</g>
      </g>
    </g>
  );
};
