/**
 * @file LiliesFlower.tsx
 * @description 【纯洁永恒】白百合高雅插花组件。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const LILY_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.5, fallSpan: 0.06, startX: 116, startY: 36, landX: 120, landY: 194, rx: 6.5, ry: 2.8, landRot: 35, swayAmp: 14, swayFreq: 3.0 },
  { id: 2, detachHealth: 0.4, fallSpan: 0.06, startX: 34, startY: 54, landX: 36, landY: 193, rx: 7.2, ry: 3.0, landRot: -40, swayAmp: 13, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.3, fallSpan: 0.06, startX: 52, startY: 68, landX: 54, landY: 195, rx: 8.0, ry: 3.2, landRot: 22, swayAmp: 16, swayFreq: 4.0 },
  { id: 4, detachHealth: 0.2, fallSpan: 0.06, startX: 75, startY: 26, landX: 82, landY: 197, rx: 7.5, ry: 2.8, landRot: 45, swayAmp: 18, swayFreq: 4.2 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.05, startX: 98, startY: 52, landX: 98, landY: 196, rx: 7.6, ry: 2.9, landRot: -18, swayAmp: 14, swayFreq: 4.0 },
];

export const LiliesFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  const lilyPetal0 = lerpColor('#ffffff', '#f4efe6', dryFactor);
  const lilyPetal65 = lerpColor('#faf9f4', '#ded1b8', dryFactor);
  const lilyPetal85 = lerpColor('#eef1df', '#b89f78', dryFactor);
  const lilyPetal100 = lerpColor('#c6d6a5', '#7d6547', dryFactor);

  const lilyThroat0 = lerpColor('#e1eeb5', '#b09868', dryFactor);
  const lilyThroat100 = lerpColor('#9cb862', '#634825', dryFactor);

  const stemCol0 = lerpColor('#4ade80', '#856644', dryFactor);
  const stemCol50 = lerpColor('#16a34a', '#543b23', dryFactor);
  const stemCol100 = lerpColor('#14532d', '#2c1e12', dryFactor);

  const leafCol0 = lerpColor('#22c55e', '#a3845b', dryFactor);
  const leafCol60 = lerpColor('#15803d', '#61472a', dryFactor);
  const leafCol100 = lerpColor('#14532d', '#332313', dryFactor);

  const budState = getBlossomDropStyle(health, 0.5);
  const sideState = getBlossomDropStyle(health, 0.4);
  const secState = getBlossomDropStyle(health, 0.3);
  const crownState = getBlossomDropStyle(health, 0.2);
  const mainState = getBlossomDropStyle(health, 0.08);

  const leafOpacity = isFaded ? 0.35 : Math.max(0.45, health);

  return (
    <g id="liliesFlora">
      <defs>
        <linearGradient id="whiteLilyPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={lilyPetal0} />
          <stop offset="65%" stopColor={lilyPetal65} />
          <stop offset="85%" stopColor={lilyPetal85} />
          <stop offset="100%" stopColor={lilyPetal100} />
        </linearGradient>
        <linearGradient id="lilyThroatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={lilyThroat0} />
          <stop offset="100%" stopColor={lilyThroat100} />
        </linearGradient>
        <linearGradient id="lilyStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stemCol0} />
          <stop offset="50%" stopColor={stemCol50} />
          <stop offset="100%" stopColor={stemCol100} />
        </linearGradient>
        <linearGradient id="lilyLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={leafCol0} />
          <stop offset="60%" stopColor={leafCol60} />
          <stop offset="100%" stopColor={leafCol100} />
        </linearGradient>
      </defs>

      {/* 5 根坚实百合花枝 */}
      <g id="lilyStems">
        <path d="M 76 128 Q 86 85 98 52" stroke="url(#lilyStemGrad)" strokeWidth="3.6" fill="none" strokeLinecap="round" />
        <path d="M 75 128 Q 62 88 52 68" stroke="url(#lilyStemGrad)" strokeWidth="3.4" fill="none" strokeLinecap="round" />
        <path d="M 75 128 Q 74 65 75 26" stroke="url(#lilyStemGrad)" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <path d="M 74 128 Q 54 88 34 54" stroke="url(#lilyStemGrad)" strokeWidth="2.8" fill="none" strokeLinecap="round" />
        <path d="M 78 128 Q 98 76 116 36" stroke="url(#lilyStemGrad)" strokeWidth="2.8" fill="none" strokeLinecap="round" />

        <circle cx="78" cy="95" r="2.2" fill={stemCol100} opacity="0.8" />
        <circle cx="86" cy="85" r="2.0" fill={stemCol100} opacity="0.8" />
      </g>

      {/* 百合叶片 */}
      <g id="lilyLeaves" style={{ opacity: leafOpacity, transition: 'opacity 0.8s ease-out' }}>
        <g className="animate-leaf-sway-1" style={{ transformOrigin: '64px 88px' }}>
          <path d="M 64 88 C 42 76 24 88 18 98 C 30 102 52 96 64 90 Z" fill="url(#lilyLeafGrad)" />
        </g>
        <g className="animate-leaf-sway-2" style={{ transformOrigin: '90px 84px' }}>
          <path d="M 90 84 C 112 74 132 82 140 92 C 126 96 106 92 90 86 Z" fill="url(#lilyLeafGrad)" />
        </g>
        <g className="animate-leaf-sway-3" style={{ transformOrigin: '38px 72px' }}>
          <path d="M 38 72 C 18 64 8 74 6 84 C 20 86 36 82 42 76 Z" fill="url(#lilyLeafGrad)" />
        </g>
      </g>

      {/* 5 朵百合花 */}
      <g id="lilyBlossoms">
        {/* 1. 主花 (右侧大百合) */}
        <g transform="translate(98, 52) scale(0.96)">
          <g className="animate-flower-sway-main">
            <g style={{ opacity: mainState.opacity, transform: `translateY(${mainState.droopY}px)`, transition: 'opacity 0.8s ease-out' }}>
              <path d="M 0 0 C 16 -38 34 -32 40 -18 C 28 -4 15 6 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke={dryFactor > 0.4 ? '#a88e6a' : '#ded9c7'} strokeWidth="0.8" />
              <path d="M 0 0 C 6 -42 -14 -44 -24 -30 C -16 -14 -6 -2 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke={dryFactor > 0.4 ? '#a88e6a' : '#ded9c7'} strokeWidth="0.8" />
              <path d="M 0 0 C -38 -22 -44 -6 -34 10 C -20 10 -6 3 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke={dryFactor > 0.4 ? '#a88e6a' : '#ded9c7'} strokeWidth="0.8" />
              <path d="M 0 0 C -28 16 -20 38 -2 42 C 6 26 3 11 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke={dryFactor > 0.4 ? '#a88e6a' : '#ded9c7'} strokeWidth="0.8" />
              <path d="M 0 0 C 24 20 36 34 42 22 C 28 11 14 3 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke={dryFactor > 0.4 ? '#a88e6a' : '#ded9c7'} strokeWidth="0.8" />
              <circle cx="0" cy="0" r="9" fill="url(#lilyThroatGrad)" opacity="0.9" />
              <path d="M 0 0 Q 9 -14 18 -16" stroke={dryFactor > 0.4 ? '#634825' : '#8da84b'} strokeWidth="1.6" fill="none" />
              <ellipse cx="18" cy="-16" rx="4" ry="1.6" fill={dryFactor > 0.4 ? '#452d14' : '#d97706'} transform="rotate(-30 18 -16)" />
              <path d="M 0 0 Q -6 -16 -12 -20" stroke={dryFactor > 0.4 ? '#634825' : '#8da84b'} strokeWidth="1.6" fill="none" />
              <ellipse cx="-12" cy="-20" rx="4" ry="1.6" fill={dryFactor > 0.4 ? '#452d14' : '#f59e0b'} transform="rotate(40 -12 -20)" />
            </g>
          </g>
        </g>

        {/* 2. 顶冠百合 */}
        <g transform="translate(75, 26) scale(0.90)">
          <g className="animate-flower-sway-crown">
            <g style={{ opacity: crownState.opacity, transform: `translateY(${crownState.droopY}px)`, transition: 'opacity 0.8s ease-out' }}>
              <path d="M 0 0 C 14 -36 30 -30 36 -16 C 26 -4 14 6 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke={dryFactor > 0.4 ? '#a88e6a' : '#ded9c7'} strokeWidth="0.8" />
              <path d="M 0 0 C 4 -38 -12 -40 -20 -28 C -14 -12 -4 -2 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke={dryFactor > 0.4 ? '#a88e6a' : '#ded9c7'} strokeWidth="0.8" />
              <path d="M 0 0 C -34 -18 -38 -4 -30 8 C -18 8 -4 2 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke={dryFactor > 0.4 ? '#a88e6a' : '#ded9c7'} strokeWidth="0.8" />
              <path d="M 0 0 C 20 18 32 30 38 18 C 24 8 12 2 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke={dryFactor > 0.4 ? '#a88e6a' : '#ded9c7'} strokeWidth="0.8" />
              <circle cx="0" cy="0" r="8" fill="url(#lilyThroatGrad)" opacity="0.9" />
              <ellipse cx="12" cy="-14" rx="3.5" ry="1.4" fill={dryFactor > 0.4 ? '#452d14' : '#d97706'} transform="rotate(-25 12 -14)" />
            </g>
          </g>
        </g>

        {/* 3. 左下花 */}
        <g transform="translate(52, 68) scale(0.85)">
          <g className="animate-flower-sway-left">
            <g style={{ opacity: secState.opacity, transform: `translateY(${secState.droopY}px)`, transition: 'opacity 0.8s ease-out' }}>
              <path d="M 0 0 C -14 -32 2 -40 14 -30 C 9 -16 3 -2 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke={dryFactor > 0.4 ? '#a88e6a' : '#ded9c7'} strokeWidth="0.8" />
              <path d="M 0 0 C -32 -16 -38 2 -28 16 C -14 11 -2 3 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke={dryFactor > 0.4 ? '#a88e6a' : '#ded9c7'} strokeWidth="0.8" />
              <path d="M 0 0 C -16 26 6 34 20 26 C 13 16 6 5 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke={dryFactor > 0.4 ? '#a88e6a' : '#ded9c7'} strokeWidth="0.8" />
              <circle cx="0" cy="0" r="8" fill="url(#lilyThroatGrad)" opacity="0.9" />
            </g>
          </g>
        </g>

        {/* 4. 左侧花 */}
        <g transform="translate(34, 54) scale(0.72)">
          <g className="animate-flower-sway-right">
            <g style={{ opacity: sideState.opacity, transform: `translateY(${sideState.droopY}px)`, transition: 'opacity 0.8s ease-out' }}>
              <path d="M 0 0 C -16 -28 -30 -18 -26 -6 C -18 2 -6 2 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke={dryFactor > 0.4 ? '#a88e6a' : '#ded9c7'} strokeWidth="0.8" />
              <path d="M 0 0 C -12 20 4 28 16 20 C 10 10 4 2 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke={dryFactor > 0.4 ? '#a88e6a' : '#ded9c7'} strokeWidth="0.8" />
              <circle cx="0" cy="0" r="6" fill="url(#lilyThroatGrad)" opacity="0.85" />
            </g>
          </g>
        </g>

        {/* 5. 右上梢头幼蕾 */}
        <g transform="translate(116, 36) scale(0.65)">
          <g className="animate-flower-sway-bud">
            <g style={{ opacity: budState.opacity, transform: `translateY(${budState.droopY}px)`, transition: 'opacity 0.8s ease-out' }}>
              <ellipse cx="0" cy="0" rx="6" ry="18" fill="url(#whiteLilyPetalGrad)" stroke={dryFactor > 0.4 ? '#a88e6a' : '#c6d6a5'} strokeWidth="0.8" transform="rotate(35)" />
            </g>
          </g>
        </g>
      </g>
    </g>
  );
};
