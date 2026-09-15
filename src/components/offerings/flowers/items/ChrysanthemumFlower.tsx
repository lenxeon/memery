/**
 * @file ChrysanthemumFlower.tsx
 * @description 【傲霜怀远】白菊/黄菊祭祀插花组件。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const CHRYSANTHEMUM_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.45, fallSpan: 0.06, startX: 98, startY: 46, landX: 102, landY: 194, rx: 5.0, ry: 1.8, landRot: 35, swayAmp: 12, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.3, fallSpan: 0.06, startX: 48, startY: 54, landX: 52, landY: 195, rx: 5.5, ry: 2.0, landRot: -25, swayAmp: 14, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.1, fallSpan: 0.05, startX: 75, startY: 32, landX: 80, landY: 196, rx: 6.0, ry: 2.2, landRot: 15, swayAmp: 16, swayFreq: 4.0 },
];

export const ChrysanthemumFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  const goldPetal = lerpColor('#f59e0b', '#926a38', dryFactor);
  const coreCol = lerpColor('#d97706', '#5c3a1b', dryFactor);
  const stemCol = lerpColor('#16a34a', '#4a3825', dryFactor);

  const mainState = getBlossomDropStyle(health, 0.1);
  const secState = getBlossomDropStyle(health, 0.3);
  const thirdState = getBlossomDropStyle(health, 0.45);

  return (
    <g id="chrysanthemumFlora">
      <g id="stems">
        <path d="M 75 128 Q 74 65 75 32" stroke={stemCol} strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <path d="M 74 128 Q 58 80 48 54" stroke={stemCol} strokeWidth="2.8" fill="none" strokeLinecap="round" />
        <path d="M 76 128 Q 92 75 98 46" stroke={stemCol} strokeWidth="2.8" fill="none" strokeLinecap="round" />
      </g>

      <g id="blossoms">
        {/* 1. 主菊 */}
        <g transform="translate(75, 32) scale(0.92)">
          <g style={{ opacity: mainState.opacity, transform: `translateY(${mainState.droopY}px)` }}>
            {Array.from({ length: 16 }, (_, i) => (
              <line
                key={i}
                x1="0"
                y1="0"
                x2={22 * Math.cos((i * 22.5 * Math.PI) / 180)}
                y2={22 * Math.sin((i * 22.5 * Math.PI) / 180)}
                stroke={goldPetal}
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            ))}
            <circle cx="0" cy="0" r="7" fill={coreCol} />
          </g>
        </g>

        {/* 2. 左侧菊 */}
        <g transform="translate(48, 54) scale(0.78)">
          <g style={{ opacity: secState.opacity, transform: `translateY(${secState.droopY}px)` }}>
            {Array.from({ length: 12 }, (_, i) => (
              <line
                key={i}
                x1="0"
                y1="0"
                x2={18 * Math.cos((i * 30 * Math.PI) / 180)}
                y2={18 * Math.sin((i * 30 * Math.PI) / 180)}
                stroke={goldPetal}
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            ))}
            <circle cx="0" cy="0" r="5" fill={coreCol} />
          </g>
        </g>

        {/* 3. 右侧菊 */}
        <g transform="translate(98, 46) scale(0.72)">
          <g style={{ opacity: thirdState.opacity, transform: `translateY(${thirdState.droopY}px)` }}>
            {Array.from({ length: 12 }, (_, i) => (
              <line
                key={i}
                x1="0"
                y1="0"
                x2={16 * Math.cos((i * 30 * Math.PI) / 180)}
                y2={16 * Math.sin((i * 30 * Math.PI) / 180)}
                stroke={goldPetal}
                strokeWidth="2.0"
                strokeLinecap="round"
              />
            ))}
            <circle cx="0" cy="0" r="4.5" fill={coreCol} />
          </g>
        </g>
      </g>
    </g>
  );
};
