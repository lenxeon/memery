/**
 * @file OrangesFruit.tsx
 * @description 【吉祥如意】金橙柑橘供品组件。
 */
import React from 'react';
import { FruitProps } from '../types';
import { BaseFruitDish } from '../BaseFruitDish';

export const OrangesFruit: React.FC<FruitProps> = ({ scale, className, onClick }) => {
  const defs = (
    <>
      <radialGradient id="orangeGradTop" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#fed7aa" />
        <stop offset="35%" stopColor="#fb923c" />
        <stop offset="75%" stopColor="#ea580c" />
        <stop offset="100%" stopColor="#9a3412" />
      </radialGradient>
      <radialGradient id="orangeGradLeft" cx="45%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#ffedd5" />
        <stop offset="40%" stopColor="#f97316" />
        <stop offset="85%" stopColor="#c2410c" />
        <stop offset="100%" stopColor="#7c2d12" />
      </radialGradient>
      <radialGradient id="orangeGradRight" cx="35%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#fed7aa" />
        <stop offset="45%" stopColor="#ea580c" />
        <stop offset="85%" stopColor="#9a3412" />
        <stop offset="100%" stopColor="#6c1d07" />
      </radialGradient>
      <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#86efac" />
        <stop offset="50%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#15803d" />
      </linearGradient>
    </>
  );

  return (
    <BaseFruitDish
      title="吉庆供果 · 蜜桔（大吉大利）"
      nextName="福寿仙桃"
      scale={scale}
      className={className}
      onClick={onClick}
      defsSlot={defs}
    >
      <g id="orangesPyramid">
        {/* Left Bottom Orange */}
        <g id="orangeLeft">
          <ellipse cx="32" cy="48" rx="18" ry="16" fill="url(#orangeGradLeft)" />
          <circle cx="32" cy="36" r="2.5" fill="#431407" />
          <ellipse cx="27" cy="43" rx="3.5" ry="6" fill="#ffffff" opacity="0.35" transform="rotate(-20, 27, 43)" />
        </g>

        {/* Right Bottom Orange */}
        <g id="orangeRight">
          <ellipse cx="72" cy="48" rx="18" ry="16" fill="url(#orangeGradRight)" />
          <circle cx="72" cy="36" r="2.5" fill="#431407" />
          <ellipse cx="77" cy="43" rx="3.5" ry="6" fill="#ffffff" opacity="0.35" transform="rotate(20, 77, 43)" />
        </g>

        {/* Center Base Middle Orange */}
        <g id="orangeCenterBase">
          <ellipse cx="52" cy="50" rx="17" ry="15" fill="url(#orangeGradTop)" />
          <circle cx="52" cy="38" r="2.5" fill="#431407" />
        </g>

        {/* Top Center Crown Orange */}
        <g id="orangeTop">
          <ellipse cx="52" cy="33" rx="18.5" ry="16.5" fill="url(#orangeGradTop)" />
          <circle cx="52" cy="20" r="3" fill="#3b1103" />
          {/* Calyx & Twin Leaves */}
          <path d="M 52 19 L 45 14 Q 50 11 52 19 Z" fill="url(#leafGrad)" />
          <path d="M 52 19 L 61 13 Q 58 9 52 19 Z" fill="url(#leafGrad)" />
          <path d="M 52 19 Q 53 14 54 11" stroke="#2e1004" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Peel Texture Dimples & Specular */}
          <ellipse cx="46" cy="27" rx="3.8" ry="7" fill="#ffffff" opacity="0.45" transform="rotate(-25, 46, 27)" />
          <circle cx="49" cy="24" r="1.5" fill="#ffffff" opacity="0.75" />
        </g>
      </g>
    </BaseFruitDish>
  );
};
