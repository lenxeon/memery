/**
 * @file LotusFlower.tsx
 * @description 【圣洁出尘】粉白莲花与莲蓬插花组件。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const LOTUS_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.5, fallSpan: 0.06, startX: 110, startY: 42, landX: 114, landY: 194, rx: 7.0, ry: 3.5, landRot: 25, swayAmp: 15, swayFreq: 2.8 },
  { id: 2, detachHealth: 0.35, fallSpan: 0.06, startX: 42, startY: 52, landX: 40, landY: 193, rx: 7.5, ry: 3.8, landRot: -30, swayAmp: 14, swayFreq: 3.2 },
  { id: 3, detachHealth: 0.15, fallSpan: 0.05, startX: 75, startY: 30, landX: 80, landY: 196, rx: 8.0, ry: 4.0, landRot: 15, swayAmp: 16, swayFreq: 3.6 },
];

export const LotusFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  const lotusTip = lerpColor('#f43f5e', '#a87858', dryFactor);
  const lotusBase = lerpColor('#fff1f2', '#ede0d4', dryFactor);
  const stemCol = lerpColor('#16a34a', '#4a3825', dryFactor);
  const leafCol = lerpColor('#15803d', '#402e1c', dryFactor);

  const mainState = getBlossomDropStyle(health, 0.15);
  const secState = getBlossomDropStyle(health, 0.35);
  const budState = getBlossomDropStyle(health, 0.5);

  const leafOpacity = isFaded ? 0.35 : Math.max(0.45, health);

  return (
    <g id="lotusFlora">
      <defs>
        <linearGradient id="lotusPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={lotusBase} />
          <stop offset="60%" stopColor="#fecdd3" />
          <stop offset="100%" stopColor={lotusTip} />
        </linearGradient>
      </defs>

      {/* 莲梗 */}
      <g id="lotusStems">
        <path d="M 75 128 Q 74 65 75 32" stroke={stemCol} strokeWidth="3.4" fill="none" strokeLinecap="round" />
        <path d="M 74 128 Q 58 80 44 56" stroke={stemCol} strokeWidth="3.0" fill="none" strokeLinecap="round" />
        <path d="M 76 128 Q 94 75 108 48" stroke={stemCol} strokeWidth="2.8" fill="none" strokeLinecap="round" />
      </g>

      {/* 莲叶小立 */}
      <g id="lotusLeaves" style={{ opacity: leafOpacity }}>
        <ellipse cx="48" cy="85" rx="18" ry="7" fill={leafCol} opacity="0.85" transform="rotate(-15, 48, 85)" />
        <ellipse cx="102" cy="82" rx="16" ry="6" fill={leafCol} opacity="0.85" transform="rotate(18, 102, 82)" />
      </g>

      {/* 莲花与莲蓬 */}
      <g id="lotusBlossoms">
        {/* 1. 主莲 (正中端坐) */}
        <g transform="translate(75, 32) scale(0.92)">
          <g style={{ opacity: mainState.opacity, transform: `translateY(${mainState.droopY}px)` }}>
            {/* 莲瓣层叠 */}
            <path d="M 0 0 C -22 -14 -28 -34 -14 -46 C -2 -34 0 -18 0 0 Z" fill="url(#lotusPetalGrad)" />
            <path d="M 0 0 C 22 -14 28 -34 14 -46 C 2 -34 0 -18 0 0 Z" fill="url(#lotusPetalGrad)" />
            <path d="M 0 0 C -12 -20 -14 -44 0 -52 C 14 -44 12 -20 0 0 Z" fill="url(#lotusPetalGrad)" />
            <circle cx="0" cy="-28" r="6" fill="#eab308" />
          </g>
        </g>

        {/* 2. 左侧半开莲花 */}
        <g transform="translate(44, 56) scale(0.78)">
          <g style={{ opacity: secState.opacity, transform: `translateY(${secState.droopY}px)` }}>
            <path d="M 0 0 C -16 -12 -18 -32 -6 -40 C 4 -28 2 -14 0 0 Z" fill="url(#lotusPetalGrad)" />
            <path d="M 0 0 C 12 -10 16 -30 4 -38 C -4 -26 -2 -12 0 0 Z" fill="url(#lotusPetalGrad)" />
          </g>
        </g>

        {/* 3. 右侧含苞小荷 */}
        <g transform="translate(108, 48) scale(0.68)">
          <g style={{ opacity: budState.opacity, transform: `translateY(${budState.droopY}px)` }}>
            <ellipse cx="0" cy="-18" rx="8" ry="18" fill="url(#lotusPetalGrad)" transform="rotate(18, 0, -18)" />
          </g>
        </g>
      </g>
    </g>
  );
};
