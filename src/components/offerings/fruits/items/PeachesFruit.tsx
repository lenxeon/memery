/**
 * @file PeachesFruit.tsx
 * @description 【福寿绵长】寿桃供品组件。
 */
import React from 'react';
import { FruitProps } from '../types';
import { BaseFruitDish } from '../BaseFruitDish';

export const PeachesFruit: React.FC<FruitProps> = ({ scale, className, onClick }) => {
  const defs = (
    <>
      <radialGradient id="peachGradTip" cx="50%" cy="25%" r="75%">
        <stop offset="0%" stopColor="#fda4af" />
        <stop offset="30%" stopColor="#fb7185" />
        <stop offset="70%" stopColor="#fef08a" />
        <stop offset="100%" stopColor="#fde047" />
      </radialGradient>
      <radialGradient id="peachGradBody" cx="45%" cy="45%" r="65%">
        <stop offset="0%" stopColor="#fff1f2" />
        <stop offset="25%" stopColor="#fecdd3" />
        <stop offset="60%" stopColor="#fef08a" />
        <stop offset="100%" stopColor="#eab308" />
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
      title="寿考供果 · 仙桃（福寿延绵）"
      nextName="平安苹果"
      scale={scale}
      className={className}
      onClick={onClick}
      defsSlot={defs}
    >
      <g id="peachesDuo">
        {/* Left Peach */}
        <g id="peachLeft" transform="rotate(-10, 36, 44)">
          <path
            d="M 36 20 C 44 26 52 38 48 54 C 44 64 26 64 22 52 C 18 38 28 26 36 20 Z"
            fill="url(#peachGradBody)"
          />
          {/* Crimson Blush on Tip */}
          <path d="M 36 20 C 40 24 45 30 42 38 C 38 40 30 38 28 32 C 28 26 33 22 36 20 Z" fill="url(#peachGradTip)" />
          {/* Peach Cleft / Crease */}
          <path d="M 36 20 Q 34 35 33 50" stroke="#f43f5e" strokeWidth="1.2" fill="none" opacity="0.65" />
          <ellipse cx="28" cy="38" rx="3.5" ry="7" fill="#ffffff" opacity="0.4" transform="rotate(-15, 28, 38)" />
        </g>

        {/* Right Peach (Front) */}
        <g id="peachRight" transform="rotate(12, 68, 42)">
          <path
            d="M 68 18 C 77 24 85 36 81 53 C 77 63 58 63 54 51 C 50 37 60 24 68 18 Z"
            fill="url(#peachGradBody)"
          />
          <path d="M 68 18 C 73 23 78 30 75 38 C 70 41 61 38 59 31 C 60 24 65 21 68 18 Z" fill="url(#peachGradTip)" />
          <path d="M 68 18 Q 66 34 65 49" stroke="#f43f5e" strokeWidth="1.2" fill="none" opacity="0.65" />
          <ellipse cx="61" cy="36" rx="4" ry="8" fill="#ffffff" opacity="0.45" transform="rotate(-15, 61, 36)" />
        </g>

        {/* Longevity Peach Leaves (仙桃青翠长叶) */}
        <path d="M 52 48 Q 50 32 38 28 Q 46 38 52 48 Z" fill="url(#leafGrad)" stroke="#15803d" strokeWidth="0.5" />
        <path d="M 54 48 Q 58 30 72 26 Q 62 36 54 48 Z" fill="url(#leafGrad)" stroke="#15803d" strokeWidth="0.5" />
      </g>
    </BaseFruitDish>
  );
};
