/**
 * @file PeoniesFlower.tsx
 * @description 【富贵端方】牡丹华贵插花组件。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const PEONY_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.5, fallSpan: 0.06, startX: 114, startY: 44, landX: 118, landY: 194, rx: 5.5, ry: 3.2, landRot: 28, swayAmp: 14, swayFreq: 3.0 },
  { id: 2, detachHealth: 0.4, fallSpan: 0.06, startX: 36, startY: 54, landX: 38, landY: 193, rx: 6.0, ry: 3.6, landRot: -35, swayAmp: 12, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.3, fallSpan: 0.06, startX: 96, startY: 58, landX: 104, landY: 195, rx: 6.5, ry: 3.8, landRot: -24, swayAmp: 15, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.2, fallSpan: 0.06, startX: 76, startY: 26, landX: 84, landY: 197, rx: 6.4, ry: 3.6, landRot: 40, swayAmp: 18, swayFreq: 4.2 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.05, startX: 54, startY: 46, landX: 62, landY: 196, rx: 7.0, ry: 4.0, landRot: 16, swayAmp: 14, swayFreq: 4.0 },
];

export const PeoniesFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  // 动态衰变花色
  const peonyDeep0 = lerpColor('#f472b6', '#c49a7c', dryFactor);
  const peonyDeep40 = lerpColor('#ec4899', '#9d6d4b', dryFactor);
  const peonyDeep85 = lerpColor('#db2777', '#6c4327', dryFactor);
  const peonyDeep100 = lerpColor('#9d174d', '#3d2212', dryFactor);

  const peonySoft0 = lerpColor('#fbcfe8', '#e5d7cb', dryFactor);
  const peonySoft50 = lerpColor('#f472b6', '#b58b6c', dryFactor);
  const peonySoft85 = lerpColor('#ec4899', '#7a5135', dryFactor);
  const peonySoft100 = lerpColor('#be185d', '#452817', dryFactor);

  const stemCol0 = lerpColor('#4ade80', '#856644', dryFactor);
  const stemCol50 = lerpColor('#16a34a', '#543b23', dryFactor);
  const stemCol100 = lerpColor('#14532d', '#2c1e12', dryFactor);

  const leafCol0 = lerpColor('#22c55e', '#a3845b', dryFactor);
  const leafCol60 = lerpColor('#15803d', '#61472a', dryFactor);
  const leafCol100 = lerpColor('#14532d', '#332313', dryFactor);

  // 花头衰老逐层掉落状态
  const budState = getBlossomDropStyle(health, 0.5);
  const sideState = getBlossomDropStyle(health, 0.4);
  const secState = getBlossomDropStyle(health, 0.3);
  const crownState = getBlossomDropStyle(health, 0.2);
  const mainState = getBlossomDropStyle(health, 0.08);

  const leafOpacity = isFaded ? 0.35 : Math.max(0.45, health);

  return (
    <g id="peoniesFlora">
      <defs>
        <radialGradient id="peonyDeepGrad" cx="45%" cy="45%" r="55%">
          <stop offset="0%" stopColor={peonyDeep0} />
          <stop offset="40%" stopColor={peonyDeep40} />
          <stop offset="85%" stopColor={peonyDeep85} />
          <stop offset="100%" stopColor={peonyDeep100} />
        </radialGradient>
        <radialGradient id="peonySoftGrad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor={peonySoft0} />
          <stop offset="50%" stopColor={peonySoft50} />
          <stop offset="85%" stopColor={peonySoft85} />
          <stop offset="100%" stopColor={peonySoft100} />
        </radialGradient>
        <linearGradient id="peonyStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stemCol0} />
          <stop offset="50%" stopColor={stemCol50} />
          <stop offset="100%" stopColor={stemCol100} />
        </linearGradient>
        <linearGradient id="peonyLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={leafCol0} />
          <stop offset="60%" stopColor={leafCol60} />
          <stop offset="100%" stopColor={leafCol100} />
        </linearGradient>
      </defs>

      {/* 5 根坚挺枝干 (瓶内紧致收束于瓶口 x:72~78，出瓶后向外舒展绽放) */}
      <g id="peonyStems">
        <path d="M 74 125 C 74 114, 74 108, 70 96 C 66 84, 58 66, 54 48" stroke="url(#peonyStemGrad)" strokeWidth="3.6" fill="none" strokeLinecap="round" />
        <path d="M 76 125 C 76 114, 76 108, 80 96 C 84 84, 92 68, 96 58" stroke="url(#peonyStemGrad)" strokeWidth="3.4" fill="none" strokeLinecap="round" />
        <path d="M 75 125 C 75 114, 75 108, 75 85 C 75 65, 76 45, 76 28" stroke="url(#peonyStemGrad)" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <path d="M 73 125 C 73 115, 73 108, 68 98 C 62 86, 48 70, 36 54" stroke="url(#peonyStemGrad)" strokeWidth="2.8" fill="none" strokeLinecap="round" />
        <path d="M 77 125 C 77 115, 77 108, 82 98 C 88 86, 102 68, 114 44" stroke="url(#peonyStemGrad)" strokeWidth="2.8" fill="none" strokeLinecap="round" />

        <circle cx="70" cy="85" r="2.2" fill={stemCol100} opacity="0.8" />
        <circle cx="82" cy="82" r="2.0" fill={stemCol100} opacity="0.8" />
        <circle cx="75" cy="65" r="1.8" fill={stemCol100} opacity="0.8" />
      </g>

      {/* 绿叶群落 */}
      <g id="peonyLeaves" style={{ opacity: leafOpacity, transition: 'opacity 0.8s ease-out' }}>
        <g className="animate-leaf-sway-1" style={{ transformOrigin: '52px 78px' }}>
          <path d="M 52 78 C 30 68 14 76 8 86 C 22 92 42 90 54 81 Z" fill="url(#peonyLeafGrad)" />
        </g>
        <g className="animate-leaf-sway-2" style={{ transformOrigin: '90px 88px' }}>
          <path d="M 90 88 C 112 80 130 86 138 96 C 122 102 104 98 90 90 Z" fill="url(#peonyLeafGrad)" />
        </g>
        <g className="animate-leaf-sway-3" style={{ transformOrigin: '42px 46px' }}>
          <path d="M 42 46 C 24 34 12 42 8 52 C 20 58 36 54 44 48 Z" fill="url(#peonyLeafGrad)" />
        </g>
        <g className="animate-leaf-sway-4" style={{ transformOrigin: '94px 58px' }}>
          <path d="M 94 58 C 114 48 128 54 134 64 C 120 70 106 66 94 60 Z" fill="url(#peonyLeafGrad)" />
        </g>
      </g>

      {/* 5 朵牡丹花 */}
      <g id="peonyBlossoms">
        {/* 1. 主花 (中左核心大牡丹) */}
        <g transform="translate(54, 48) scale(0.95)">
          <g className="animate-flower-sway-main">
            <g style={{ opacity: mainState.opacity, transform: `translateY(${mainState.droopY}px)`, transition: 'opacity 0.8s ease-out' }}>
              <circle cx="0" cy="0" r="28" fill="url(#peonyDeepGrad)" opacity="0.95" />
              <path d="M -22 -10 C -26 -26 2 -32 16 -22 C 28 -8 24 16 10 24 C -8 28 -18 12 -22 -10 Z" fill="url(#peonySoftGrad)" />
              <path d="M -16 -18 C -4 -26 18 -20 20 -8 C 22 8 6 20 -6 18 C -18 14 -20 -2 -16 -18 Z" fill="url(#peonyDeepGrad)" />
              <path d="M -12 -12 C 0 -20 15 -14 14 -2 C 12 10 0 14 -8 10 C -16 6 -16 -4 -12 -12 Z" fill="url(#peonySoftGrad)" />
              <circle cx="-1" cy="-2" r="2.8" fill={dryFactor > 0.4 ? '#78542c' : '#fcd34d'} opacity="0.9" />
              <circle cx="3" cy="1" r="2.4" fill={dryFactor > 0.4 ? '#4f3417' : '#f59e0b'} opacity="0.95" />
            </g>
          </g>
        </g>

        {/* 2. 顶冠牡丹 */}
        <g transform="translate(76, 28) scale(0.90)">
          <g className="animate-flower-sway-crown">
            <g style={{ opacity: crownState.opacity, transform: `translateY(${crownState.droopY}px)`, transition: 'opacity 0.8s ease-out' }}>
              <circle cx="0" cy="0" r="26" fill="url(#peonyDeepGrad)" />
              <path d="M -20 -10 C -24 -24 4 -28 16 -18 C 26 -6 22 14 8 22 C -6 26 -16 12 -20 -10 Z" fill="url(#peonySoftGrad)" />
              <path d="M -14 -14 C 0 -22 16 -16 16 -4 C 16 10 2 18 -8 14 C -18 10 -18 -2 -14 -14 Z" fill={dryFactor > 0.4 ? '#e0d3cb' : '#ffe2ed'} />
              <circle cx="0" cy="-1" r="2.6" fill={dryFactor > 0.4 ? '#78542c' : '#fcd34d'} />
            </g>
          </g>
        </g>

        {/* 3. 右侧副花 */}
        <g transform="translate(96, 58) scale(0.88)">
          <g className="animate-flower-sway-right">
            <g style={{ opacity: secState.opacity, transform: `translateY(${secState.droopY}px)`, transition: 'opacity 0.8s ease-out' }}>
              <circle cx="0" cy="0" r="25" fill="url(#peonyDeepGrad)" />
              <path d="M -18 -8 C -22 -22 2 -26 12 -18 C 22 -6 20 12 8 20 C -6 24 -14 10 -18 -8 Z" fill="url(#peonySoftGrad)" />
              <path d="M -12 -14 C 0 -22 14 -16 16 -6 C 18 8 5 16 -5 14 C -15 10 -15 -2 -12 -14 Z" fill={dryFactor > 0.4 ? '#e0d3cb' : '#ffe2ed'} />
              <circle cx="1" cy="-1" r="2.5" fill={dryFactor > 0.4 ? '#78542c' : '#fcd34d'} />
            </g>
          </g>
        </g>

        {/* 4. 左下侧花 */}
        <g transform="translate(36, 54) scale(0.75)">
          <g className="animate-flower-sway-left">
            <g style={{ opacity: sideState.opacity, transform: `translateY(${sideState.droopY}px)`, transition: 'opacity 0.8s ease-out' }}>
              <circle cx="0" cy="0" r="20" fill="url(#peonyDeepGrad)" />
              <path d="M -14 -6 C -18 -18 2 -20 10 -14 C 18 -4 16 10 6 16 C -6 18 -12 8 -14 -6 Z" fill="url(#peonySoftGrad)" />
              <circle cx="0" cy="0" r="2.0" fill={dryFactor > 0.4 ? '#78542c' : '#fcd34d'} />
            </g>
          </g>
        </g>

        {/* 5. 右上梢头幼蕾 */}
        <g transform="translate(114, 44) scale(0.68)">
          <g className="animate-flower-sway-bud">
            <g style={{ opacity: budState.opacity, transform: `translateY(${budState.droopY}px)`, transition: 'opacity 0.8s ease-out' }}>
              <ellipse cx="0" cy="0" rx="12" ry="16" fill="url(#peonyDeepGrad)" transform="rotate(25)" />
              <ellipse cx="-2" cy="-2" rx="8" ry="12" fill="url(#peonySoftGrad)" transform="rotate(25)" />
            </g>
          </g>
        </g>
      </g>
    </g>
  );
};
