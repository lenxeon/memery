/**
 * @file ApplesFruit.tsx
 * @description 【平平安安】红苹果多层堆叠供品组件。
 */
import React from 'react';
import { FruitProps } from '../types';
import { BaseFruitDish } from '../BaseFruitDish';

export const ApplesFruit: React.FC<FruitProps> = ({ scale, className, onClick }) => {
  const defs = (
    <>
      <radialGradient id="appleGradTop" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#ff7b6b" />
        <stop offset="35%" stopColor="#ef4444" />
        <stop offset="75%" stopColor="#b91c1c" />
        <stop offset="100%" stopColor="#7f1d1d" />
      </radialGradient>
      <radialGradient id="appleGradLeft" cx="45%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#fca5a5" />
        <stop offset="40%" stopColor="#dc2626" />
        <stop offset="85%" stopColor="#991b1b" />
        <stop offset="100%" stopColor="#701a1a" />
      </radialGradient>
      <radialGradient id="appleGradRight" cx="35%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#f87171" />
        <stop offset="45%" stopColor="#e11d48" />
        <stop offset="85%" stopColor="#9f1239" />
        <stop offset="100%" stopColor="#680b24" />
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
      title="清雅供果 · 苹果（岁岁平安）"
      nextName="吉祥蜜柑"
      scale={scale}
      className={className}
      onClick={onClick}
      defsSlot={defs}
    >
      <g id="applesPyramid">
        {/* Left Bottom Apple */}
        <g id="appleLeft">
          <circle cx="34" cy="46" r="19" fill="url(#appleGradLeft)" />
          <ellipse cx="34" cy="31" rx="5" ry="2" fill="#5b1111" />
          <path d="M 34 31 Q 36 24 40 22" stroke="#451a03" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <ellipse cx="29" cy="40" rx="3.5" ry="7" fill="#ffffff" opacity="0.32" transform="rotate(-20, 29, 40)" />
        </g>

        {/* Right Bottom Apple */}
        <g id="appleRight">
          <circle cx="70" cy="46" r="19" fill="url(#appleGradRight)" />
          <ellipse cx="70" cy="31" rx="5" ry="2" fill="#5b1111" />
          <path d="M 70 31 Q 68 24 64 22" stroke="#451a03" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <ellipse cx="75" cy="40" rx="3.5" ry="7" fill="#ffffff" opacity="0.32" transform="rotate(20, 75, 40)" />
        </g>

        {/* Top Center Crown Apple */}
        <g id="appleTop">
          <circle cx="52" cy="32" r="20" fill="url(#appleGradTop)" />
          <ellipse cx="52" cy="16" rx="5" ry="2" fill="#4c0d0d" />
          <path d="M 52 16 Q 55 7 59 5" stroke="#3b1502" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          {/* Fresh Green Leaf on Top Apple */}
          <path d="M 54 12 Q 66 10 68 18 Q 58 20 54 12 Z" fill="url(#leafGrad)" stroke="#166534" strokeWidth="0.5" />
          {/* Specular Highlight Sheen */}
          <ellipse cx="46" cy="25" rx="4.5" ry="8" fill="#ffffff" opacity="0.4" transform="rotate(-25, 46, 25)" />
          <circle cx="49" cy="22" r="1.5" fill="#ffffff" opacity="0.7" />
        </g>
      </g>
    </BaseFruitDish>
  );
};
