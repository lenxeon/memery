/**
 * @file CallaLiliesFlower.tsx
 * @description 【圣洁马蹄莲】流线型佛焰苞漏斗与金黄肉穗插花组件。
 * 核心特征：标志性的纯白漏斗状卷折佛焰苞、尖端微反卷、正中直挺的一枚鲜黄花烛肉穗，极具现代肃穆追思美感。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const CALLA_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.5, fallSpan: 0.06, startX: 112, startY: 42, landX: 118, landY: 194, rx: 6.2, ry: 3.2, landRot: 32, swayAmp: 14, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.4, fallSpan: 0.06, startX: 40, startY: 50, landX: 42, landY: 193, rx: 6.5, ry: 3.4, landRot: -30, swayAmp: 12, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.3, fallSpan: 0.06, startX: 96, startY: 54, landX: 102, landY: 195, rx: 6.8, ry: 3.5, landRot: -22, swayAmp: 16, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.2, fallSpan: 0.06, startX: 75, startY: 26, landX: 82, landY: 197, rx: 7.0, ry: 3.6, landRot: 38, swayAmp: 18, swayFreq: 4.0 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.05, startX: 58, startY: 44, landX: 66, landY: 196, rx: 7.2, ry: 3.8, landRot: 15, swayAmp: 14, swayFreq: 4.2 },
];

export const CallaLiliesFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  // 象牙白至枯萎浅驼色衰变
  const callaWhite0 = lerpColor('#ffffff', '#ded3c5', dryFactor);
  const callaWhite50 = lerpColor('#f8fafc', '#bfae9c', dryFactor);
  const callaThroatGreen = lerpColor('#bbf7d0', '#8c7b64', dryFactor);
  const callaShadow = lerpColor('#e2e8f0', '#7a6854', dryFactor);

  const spadixGold0 = lerpColor('#fde047', '#bca377', dryFactor);
  const spadixGold100 = lerpColor('#ca8a04', '#6b5435', dryFactor);

  const stemCol0 = lerpColor('#4ade80', '#836f56', dryFactor);
  const stemCol100 = lerpColor('#15803d', '#332414', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.45);
  const fl2 = getBlossomDropStyle(health, 0.35);
  const fl3 = getBlossomDropStyle(health, 0.2);
  const fl4 = getBlossomDropStyle(health, 0.08);

  const leafOpacity = isFaded ? 0.35 : Math.max(0.45, health);

  // 单朵马蹄莲（佛焰苞 + 嫩黄肉穗）
  const renderCallaBloom = (cx: number, cy: number, scale: number = 1.0, rot: number = 0) => (
    <g transform={`translate(${cx}, ${cy}) rotate(${rot}) scale(${scale})`}>
      {/* 佛焰苞喉部与背面深色阴影面 */}
      <path d="M -4 14 C -6 0, -10 -16, 0 -26 C 10 -16, 6 0, 4 14 Z" fill="url(#callaShadowGrad)" />

      {/* 核心标志物：中央直立金黄肉穗花序 (Spadix) */}
      <path d="M -1.8 4 L -1.5 -14 C -1.5 -18, 1.5 -18, 1.5 -14 L 1.8 4 Z" fill="url(#callaSpadixGrad)" />
      <circle cx="0" cy="-15" r="1.4" fill={spadixGold0} />

      {/* 佛焰苞前面优雅翻卷面 (Flared Spathe) */}
      <path
        d="M -3 16 C -8 6, -14 -6, -15 -14 C -15 -22, -8 -28, 0 -34 C 8 -28, 15 -22, 15 -14 C 14 -6, 8 6, 3 16 C 0 18, -1 18, -3 16 Z"
        fill="url(#callaSpatheGrad)"
        stroke={callaShadow}
        strokeWidth="0.8"
      />

      {/* 漏斗外卷翻折阴影线条 */}
      <path
        d="M -12 -12 C -6 -2, -2 8, -2 15"
        stroke={callaThroatGreen}
        strokeWidth="1.2"
        fill="none"
        opacity="0.7"
      />
      {/* 佛焰苞卷尖微反翘 */}
      <path d="M 0 -34 Q 2 -37 4 -35" stroke={callaWhite0} strokeWidth="1.0" fill="none" strokeLinecap="round" />
    </g>
  );

  return (
    <g id="callaLiliesFlora">
      <defs>
        <linearGradient id="callaSpatheGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={callaThroatGreen} />
          <stop offset="35%" stopColor={callaWhite50} />
          <stop offset="100%" stopColor={callaWhite0} />
        </linearGradient>
        <linearGradient id="callaShadowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={callaShadow} />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="callaSpadixGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={spadixGold100} />
          <stop offset="100%" stopColor={spadixGold0} />
        </linearGradient>
        <linearGradient id="callaStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stemCol0} />
          <stop offset="100%" stopColor={stemCol100} />
        </linearGradient>
      </defs>

      {/* 挺秀修长肉质花梗 */}
      <g id="callaStems">
        <path d="M 74 125 C 73 105, 68 85, 48 55" stroke="url(#callaStemGrad)" strokeWidth="4.0" fill="none" strokeLinecap="round" />
        <path d="M 76 125 C 77 105, 84 82, 104 52" stroke="url(#callaStemGrad)" strokeWidth="4.0" fill="none" strokeLinecap="round" />
        <path d="M 75 125 C 75 95, 75 65, 75 32" stroke="url(#callaStemGrad)" strokeWidth="4.2" fill="none" strokeLinecap="round" />
        <path d="M 73 125 C 72 112, 64 92, 58 72" stroke="url(#callaStemGrad)" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      </g>

      {/* 马蹄莲箭形肉质大叶片 */}
      <g id="callaLeaves" style={{ opacity: leafOpacity, transition: 'opacity 0.8s ease-out' }}>
        <g className="animate-leaf-sway-1" style={{ transformOrigin: '73px 105px' }}>
          <path d="M 73 105 C 50 95, 26 102, 14 118 C 28 122, 56 116, 73 105 Z" fill={stemCol100} />
        </g>
        <g className="animate-leaf-sway-2" style={{ transformOrigin: '77px 108px' }}>
          <path d="M 77 108 C 100 96, 124 104, 136 120 C 122 124, 98 118, 77 108 Z" fill={stemCol100} />
        </g>
      </g>

      {/* 4 朵圣洁挺拔马蹄莲 */}
      <g id="callaBlooms">
        <g style={fl1}>{renderCallaBloom(46, 52, 0.95, -18)}</g>
        <g style={fl2}>{renderCallaBloom(106, 50, 0.96, 16)}</g>
        <g style={fl3}>{renderCallaBloom(60, 68, 0.88, -8)}</g>
        <g style={fl4}>{renderCallaBloom(75, 28, 1.15, 0)}</g>
      </g>
    </g>
  );
};
