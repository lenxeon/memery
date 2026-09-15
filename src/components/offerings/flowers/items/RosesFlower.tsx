/**
 * @file RosesFlower.tsx
 * @description 【深情怀思】玫瑰花束插花组件。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const ROSES_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.45, fallSpan: 0.06, startX: 104, startY: 48, landX: 108, landY: 194, rx: 6.2, ry: 3.2, landRot: 28, swayAmp: 14, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.3, fallSpan: 0.06, startX: 42, startY: 56, landX: 44, landY: 193, rx: 6.8, ry: 3.5, landRot: -30, swayAmp: 12, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.1, fallSpan: 0.05, startX: 75, startY: 30, landX: 82, landY: 196, rx: 7.0, ry: 3.6, landRot: 18, swayAmp: 15, swayFreq: 4.0 },
];

export const RosesFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  const roseRed = lerpColor('#e11d48', '#883038', dryFactor);
  const roseDeep = lerpColor('#881337', '#45171d', dryFactor);
  const stemCol = lerpColor('#15803d', '#3e2e1c', dryFactor);

  const mainState = getBlossomDropStyle(health, 0.1);
  const secState = getBlossomDropStyle(health, 0.3);
  const thirdState = getBlossomDropStyle(health, 0.45);

  return (
    <g id="rosesFlora">
      <defs>
        <radialGradient id="roseRedGrad" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor={roseRed} />
          <stop offset="100%" stopColor={roseDeep} />
        </radialGradient>
      </defs>

      <g id="stems">
        <path d="M 75 128 Q 74 65 75 32" stroke={stemCol} strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <path d="M 74 128 Q 58 80 44 54" stroke={stemCol} strokeWidth="2.8" fill="none" strokeLinecap="round" />
        <path d="M 76 128 Q 92 75 102 46" stroke={stemCol} strokeWidth="2.8" fill="none" strokeLinecap="round" />
      </g>

      <g id="blossoms">
        {/* 主花 */}
        <g transform="translate(75, 30) scale(0.92)">
          <g style={{ opacity: mainState.opacity, transform: `translateY(${mainState.droopY}px)` }}>
            <circle cx="0" cy="0" r="22" fill="url(#roseRedGrad)" />
            <path d="M -14 -6 C -18 -18 2 -20 12 -12 C 22 2 18 16 4 20 C -8 20 -12 6 -14 -6 Z" fill={roseRed} />
            <circle cx="0" cy="0" r="6" fill={roseDeep} />
          </g>
        </g>

        {/* 左花 */}
        <g transform="translate(44, 54) scale(0.76)">
          <g style={{ opacity: secState.opacity, transform: `translateY(${secState.droopY}px)` }}>
            <circle cx="0" cy="0" r="18" fill="url(#roseRedGrad)" />
            <circle cx="0" cy="0" r="5" fill={roseDeep} />
          </g>
        </g>

        {/* 右花 */}
        <g transform="translate(102, 46) scale(0.70)">
          <g style={{ opacity: thirdState.opacity, transform: `translateY(${thirdState.droopY}px)` }}>
            <circle cx="0" cy="0" r="16" fill="url(#roseRedGrad)" />
            <circle cx="0" cy="0" r="4.5" fill={roseDeep} />
          </g>
        </g>
      </g>
    </g>
  );
};
