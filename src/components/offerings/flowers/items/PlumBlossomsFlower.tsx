/**
 * @file PlumBlossomsFlower.tsx
 * @description 【傲霜朱砂寒梅】老干虬枝·铁骨嶙峋·先花后叶传统古梅插花组件。
 * 核心特征：
 *  - 苍劲木质老枝（粗干古树皮皴纹、老木节瘤、之字顿挫硬朗折枝），绝非草本绿径；
 *  - 无草本绿叶（梅花先花后叶，冬雪开花时唯见铁骨红梅与深红小圆花蕾）；
 *  - 五瓣饱满圆润正红梅瓣、十数根放射金丝蕊丝与紫褐星形木质花萼底座。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const PLUM_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.5, fallSpan: 0.05, startX: 118, startY: 40, landX: 124, landY: 194, rx: 4.8, ry: 4.2, landRot: 25, swayAmp: 14, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.4, fallSpan: 0.05, startX: 38, startY: 52, landX: 40, landY: 193, rx: 5.0, ry: 4.4, landRot: -30, swayAmp: 12, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.3, fallSpan: 0.05, startX: 102, startY: 62, landX: 108, landY: 195, rx: 5.2, ry: 4.5, landRot: -18, swayAmp: 16, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.2, fallSpan: 0.05, startX: 72, startY: 28, landX: 78, landY: 197, rx: 5.4, ry: 4.6, landRot: 35, swayAmp: 18, swayFreq: 4.0 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.04, startX: 56, startY: 66, landX: 62, landY: 196, rx: 5.5, ry: 4.8, landRot: 12, swayAmp: 14, swayFreq: 4.2 },
];

export const PlumBlossomsFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  // 朱砂正红至枯萎深赭衰变
  const petalRed0 = lerpColor('#f43f5e', '#b87b64', dryFactor);
  const petalRed50 = lerpColor('#e11d48', '#8f4b36', dryFactor);
  const petalRed100 = lerpColor('#9f1239', '#4d2417', dryFactor);

  // 古梅苍干老皮色（铁褐、墨赭与苍皮高光）
  const barkDark = lerpColor('#361b0c', '#241308', dryFactor);
  const barkMid = lerpColor('#5c3418', '#3d2312', dryFactor);
  const barkLight = lerpColor('#824e28', '#54331a', dryFactor);

  // 金丝花蕊与暗红药头
  const stamenGold = lerpColor('#fef08a', '#a88d6b', dryFactor);
  const antherRed = lerpColor('#fbbf24', '#78542b', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.5);
  const fl2 = getBlossomDropStyle(health, 0.4);
  const fl3 = getBlossomDropStyle(health, 0.3);
  const fl4 = getBlossomDropStyle(health, 0.2);
  const fl5 = getBlossomDropStyle(health, 0.08);

  const branchOpacity = isFaded ? 0.4 : Math.max(0.65, health);

  // 单朵经典五瓣梅花（含紫黑木质花萼底托与金丝放射花蕊）
  const renderPlumBloom = (cx: number, cy: number, r: number = 11, rot: number = 0) => (
    <g transform={`translate(${cx}, ${cy}) rotate(${rot})`}>
      {/* 1. 紫黑木质五星花托/花萼底托 (显露于花瓣后方) */}
      {[36, 108, 180, 252, 324].map((ang, i) => (
        <path
          key={`calyx-${i}`}
          d={`M 0 0 L -2 -${r * 0.9} Q 0 -${r * 1.1} 2 -${r * 0.9} Z`}
          fill="#4c0519"
          stroke="#2a040d"
          strokeWidth="0.5"
          transform={`rotate(${ang})`}
          opacity="0.8"
        />
      ))}

      {/* 2. 5 枚圆润饱满的倒卵形正红花瓣 */}
      {[0, 72, 144, 216, 288].map((angle, idx) => (
        <g key={idx} transform={`rotate(${angle})`}>
          <path
            d={`M 0 0 C -${r * 0.75} -${r * 0.5}, -${r * 0.8} -${r * 1.3}, 0 -${r * 1.4} C ${r * 0.8} -${r * 1.3}, ${r * 0.75} -${r * 0.5}, 0 0 Z`}
            fill="url(#plumPetalGrad)"
          />
          {/* 花瓣中央微凹柔光 */}
          <path
            d={`M 0 -${r * 0.3} Q 0 -${r * 1.05} 0 -${r * 1.25}`}
            stroke="#fda4af"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.45"
          />
        </g>
      ))}

      {/* 3. 中央金丝辐射花蕊 (12根向四周放射，顶着金黄小花药) */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const len = r * 0.65;
        const x2 = Math.cos(rad) * len;
        const y2 = Math.sin(rad) * len;
        return (
          <g key={i}>
            <line x1="0" y1="0" x2={x2} y2={y2} stroke={stamenGold} strokeWidth="0.75" strokeLinecap="round" opacity="0.95" />
            <circle cx={x2} cy={y2} r="1.1" fill={antherRed} />
          </g>
        );
      })}

      {/* 4. 紧致暗红花心 */}
      <circle cx="0" cy="0" r={r * 0.22} fill={petalRed100} />
      <circle cx="0" cy="0" r={r * 0.1} fill="#881337" />
    </g>
  );

  return (
    <g id="plumBlossomsFlora">
      <defs>
        <radialGradient id="plumPetalGrad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor={petalRed0} />
          <stop offset="55%" stopColor={petalRed50} />
          <stop offset="100%" stopColor={petalRed100} />
        </radialGradient>
        <linearGradient id="plumWoodMain" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={barkMid} />
          <stop offset="50%" stopColor={barkDark} />
          <stop offset="100%" stopColor="#201007" />
        </linearGradient>
      </defs>

      {/* ── 🪵 苍劲铁骨老干虬枝（顿挫转折、树皮皴裂、老木节瘤，绝非圆滑绿草茎） ── */}
      <g id="plumBranches" style={{ opacity: branchOpacity }}>
        {/* 1. 主粗干（自瓶口75,125粗壮拔起，向上硬朗顿挫折变） */}
        <path
          d="M 75 125 L 74 110 L 71 96 L 75 84 L 69 72 L 56 60 L 42 46"
          stroke="url(#plumWoodMain)"
          strokeWidth="6.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="bevel"
        />
        {/* 主干背光深色轮廓与受光皴线 */}
        <path
          d="M 73 125 L 72 110 L 69 96 L 73 84 L 67 72 L 54 60 L 41 46"
          stroke={barkLight}
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          opacity="0.65"
        />

        {/* 2. 右侧苍劲大分枝（斜出盘曲，宛如龙爪伸展） */}
        <path
          d="M 75 84 L 84 76 L 94 68 L 104 54 L 118 38"
          stroke="url(#plumWoodMain)"
          strokeWidth="5.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="bevel"
        />
        <path
          d="M 85 75 L 95 67 L 105 53 L 119 37"
          stroke={barkLight}
          strokeWidth="1.0"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* 3. 向上直立古朴中挺梢 */}
        <path
          d="M 69 72 L 72 56 L 74 40 L 73 24"
          stroke="url(#plumWoodMain)"
          strokeWidth="3.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="bevel"
        />

        {/* 4. 侧向嶙峋小桠枝 */}
        <path d="M 56 60 L 44 68 L 36 72" stroke="url(#plumWoodMain)" strokeWidth="2.8" fill="none" strokeLinecap="round" />
        <path d="M 94 68 L 102 74 L 110 76" stroke="url(#plumWoodMain)" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <path d="M 72 56 L 62 48" stroke="url(#plumWoodMain)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M 104 54 L 114 50" stroke="url(#plumWoodMain)" strokeWidth="2.0" fill="none" strokeLinecap="round" />

        {/* 5. 古树皮木质节瘤与苔痕点 (Knots & Lichen) */}
        <ellipse cx="73" cy="92" rx="3.5" ry="2.2" fill="#1f0c05" stroke={barkLight} strokeWidth="0.8" />
        <ellipse cx="80" cy="79" rx="3.0" ry="1.8" fill="#1f0c05" stroke={barkLight} strokeWidth="0.7" transform="rotate(-25 80 79)" />
        <ellipse cx="64" cy="65" rx="2.5" ry="1.6" fill="#1f0c05" stroke={barkLight} strokeWidth="0.6" transform="rotate(20 64 65)" />
        {/* 苍古苔点 */}
        <circle cx="76" cy="102" r="1.0" fill="#2d2a12" opacity="0.8" />
        <circle cx="70" cy="88" r="0.9" fill="#2d2a12" opacity="0.8" />
        <circle cx="91" cy="71" r="1.1" fill="#2d2a12" opacity="0.8" />

        {/* 6. 冬雪傲骨红梅小圆珠花蕾 (带紫黑萼托，绝无绿叶) */}
        <g id="plumBuds">
          <g transform="translate(34, 72)">
            <circle cx="0" cy="0" r="3.2" fill="#4c0519" />
            <circle cx="0" cy="-0.5" r="2.6" fill={petalRed50} />
            <circle cx="0.5" cy="-1.0" r="1.0" fill="#fbcfe8" opacity="0.6" />
          </g>
          <g transform="translate(42, 44)">
            <circle cx="0" cy="0" r="3.4" fill="#4c0519" />
            <circle cx="0" cy="-0.5" r="2.8" fill={petalRed50} />
          </g>
          <g transform="translate(122, 34)">
            <circle cx="0" cy="0" r="3.2" fill="#4c0519" />
            <circle cx="0" cy="-0.5" r="2.6" fill={petalRed50} />
          </g>
          <g transform="translate(112, 76)">
            <circle cx="0" cy="0" r="3.0" fill="#4c0519" />
            <circle cx="0" cy="-0.5" r="2.4" fill={petalRed50} />
          </g>
          <g transform="translate(73, 20)">
            <circle cx="0" cy="0" r="3.4" fill="#4c0519" />
            <circle cx="0" cy="-0.5" r="2.8" fill={petalRed50} />
          </g>
        </g>
      </g>

      {/* ── 🌸 5 朵正红傲雪红梅（生于老木虬枝之上，一眼即知为冬梅） ── */}
      <g id="plumBlooms">
        <g style={fl1}>{renderPlumBloom(118, 42, 12.0, 18)}</g>
        <g style={fl2}>{renderPlumBloom(38, 54, 12.5, -25)}</g>
        <g style={fl3}>{renderPlumBloom(100, 64, 13.2, 32)}</g>
        <g style={fl4}>{renderPlumBloom(56, 70, 11.2, -12)}</g>
        <g style={fl5}>{renderPlumBloom(74, 32, 14.8, 5)}</g>
      </g>
    </g>
  );
};
