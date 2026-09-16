/**
 * @file PlumBlossomsFlower.tsx
 * @description 【傲霜寒梅】五瓣朱砂正红、金丝辐射细蕊与苍劲铁骨老枝插花组件。
 * 核心特征：极其鲜明的五枚倒卵形圆润红瓣，中央发散十余根金丝花蕊，褐色虬枝曲折有力。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const PLUM_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.5, fallSpan: 0.05, startX: 116, startY: 42, landX: 122, landY: 194, rx: 4.8, ry: 4.2, landRot: 25, swayAmp: 14, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.4, fallSpan: 0.05, startX: 40, startY: 52, landX: 42, landY: 193, rx: 5.0, ry: 4.4, landRot: -30, swayAmp: 12, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.3, fallSpan: 0.05, startX: 98, startY: 58, landX: 104, landY: 195, rx: 5.2, ry: 4.5, landRot: -18, swayAmp: 16, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.2, fallSpan: 0.05, startX: 74, startY: 28, landX: 80, landY: 197, rx: 5.4, ry: 4.6, landRot: 35, swayAmp: 18, swayFreq: 4.0 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.04, startX: 58, startY: 46, landX: 66, landY: 196, rx: 5.5, ry: 4.8, landRot: 12, swayAmp: 14, swayFreq: 4.2 },
];

export const PlumBlossomsFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  // 朱砂正红至枯萎深赭衰变
  const petalRed0 = lerpColor('#f43f5e', '#b87b64', dryFactor);
  const petalRed50 = lerpColor('#e11d48', '#8f4b36', dryFactor);
  const petalRed100 = lerpColor('#9f1239', '#4d2417', dryFactor);

  const woodBark0 = lerpColor('#78350f', '#5c3a21', dryFactor);
  const woodBark100 = lerpColor('#451a03', '#2b170c', dryFactor);

  const stamenGold = lerpColor('#fef08a', '#a88d6b', dryFactor);
  const antherRed = lerpColor('#fbbf24', '#78542b', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.5);
  const fl2 = getBlossomDropStyle(health, 0.4);
  const fl3 = getBlossomDropStyle(health, 0.3);
  const fl4 = getBlossomDropStyle(health, 0.2);
  const fl5 = getBlossomDropStyle(health, 0.08);

  const branchOpacity = isFaded ? 0.4 : Math.max(0.6, health);

  // 单朵经典五瓣梅花与金丝辐射花蕊
  const renderPlumBloom = (cx: number, cy: number, r: number = 11, rot: number = 0) => (
    <g transform={`translate(${cx}, ${cy}) rotate(${rot})`}>
      {/* 5 枚圆润饱满的倒卵形正红花瓣 */}
      {[0, 72, 144, 216, 288].map((angle, idx) => (
        <g key={idx} transform={`rotate(${angle})`}>
          <path
            d={`M 0 0 C -${r * 0.75} -${r * 0.5}, -${r * 0.8} -${r * 1.3}, 0 -${r * 1.4} C ${r * 0.8} -${r * 1.3}, ${r * 0.75} -${r * 0.5}, 0 0 Z`}
            fill="url(#plumPetalGrad)"
          />
          {/* 花瓣中央微凹高光 */}
          <path
            d={`M 0 -${r * 0.3} Q 0 -${r * 1.1} 0 -${r * 1.3}`}
            stroke="#fda4af"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.4"
          />
        </g>
      ))}

      {/* 中央金丝辐射花蕊 (10-12根向四周放射，顶着金黄小花药) */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const len = r * 0.65;
        const x2 = Math.cos(rad) * len;
        const y2 = Math.sin(rad) * len;
        return (
          <g key={i}>
            <line x1="0" y1="0" x2={x2} y2={y2} stroke={stamenGold} strokeWidth="0.75" strokeLinecap="round" opacity="0.9" />
            <circle cx={x2} cy={y2} r="1.1" fill={antherRed} />
          </g>
        );
      })}

      {/* 紧致暗红花心点 */}
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
        <linearGradient id="plumWoodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={woodBark0} />
          <stop offset="100%" stopColor={woodBark100} />
        </linearGradient>
      </defs>

      {/* 苍劲铁骨老梅虬枝 (瓶内收拢于74-76，出瓶后转折遒劲) */}
      <g id="plumBranches" style={{ opacity: branchOpacity }}>
        <path
          d="M 75 125 C 75 105, 73 90, 68 76 C 62 62, 52 50, 42 42"
          stroke="url(#plumWoodGrad)"
          strokeWidth="4.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 75 125 C 76 102, 82 82, 94 65 C 102 52, 114 42, 120 34"
          stroke="url(#plumWoodGrad)"
          strokeWidth="3.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 73 95 C 74 75, 75 52, 75 28"
          stroke="url(#plumWoodGrad)"
          strokeWidth="3.2"
          fill="none"
          strokeLinecap="round"
        />
        {/* 侧出小老枝桠与花苞 */}
        <path d="M 68 76 C 60 72, 54 68, 48 66" stroke="url(#plumWoodGrad)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M 94 65 C 102 68, 108 72, 114 74" stroke="url(#plumWoodGrad)" strokeWidth="2.2" fill="none" strokeLinecap="round" />

        {/* 几颗含苞待放的红梅小圆蕾 */}
        <circle cx="38" cy="38" r="3.2" fill={petalRed50} />
        <circle cx="48" cy="65" r="2.8" fill={petalRed50} />
        <circle cx="122" cy="30" r="3.0" fill={petalRed50} />
        <circle cx="75" cy="22" r="3.4" fill={petalRed50} />
      </g>

      {/* 5 朵盛放朱砂红梅花 (错落高低布局，一眼辨识) */}
      <g id="plumBlooms">
        <g style={fl1}>{renderPlumBloom(116, 44, 11.5, 15)}</g>
        <g style={fl2}>{renderPlumBloom(42, 52, 12.0, -25)}</g>
        <g style={fl3}>{renderPlumBloom(98, 62, 13.0, 35)}</g>
        <g style={fl4}>{renderPlumBloom(56, 70, 11.0, -10)}</g>
        <g style={fl5}>{renderPlumBloom(75, 34, 14.5, 5)}</g>
      </g>
    </g>
  );
};
