import React from 'react';
import { FruitType } from '../types';
import { sound } from '../utils/audio';

interface ItemFruitPlatterProps {
  fruitType?: FruitType;
  scale?: number;
  className?: string;
  onToggleFruit?: () => void;
}

export const ItemFruitPlatter: React.FC<ItemFruitPlatterProps> = ({
  fruitType = 'apples',
  scale = 1,
  className = '',
  onToggleFruit,
}) => {
  const getFruitMeta = () => {
    switch (fruitType) {
      case 'oranges':
        return {
          title: '吉庆供果 · 蜜桔（大吉大利）',
          nextName: '福寿仙桃',
        };
      case 'peaches':
        return {
          title: '寿考供果 · 仙桃（福寿延绵）',
          nextName: '平安苹果',
        };
      case 'apples':
      default:
        return {
          title: '清雅供果 · 苹果（岁岁平安）',
          nextName: '吉祥蜜柑',
        };
    }
  };

  const meta = getFruitMeta();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playPorcelainClink();
    onToggleFruit?.();
  };

  return (
    <div
      onClick={handleClick}
      title={`${meta.title} (点击切换为${meta.nextName})`}
      className={`relative select-none cursor-pointer transition-transform hover:scale-105 active:scale-95 group ${className}`}
      style={{
        width: 104 * scale,
        height: 86 * scale,
      }}
    >
      <svg
        viewBox="0 0 104 86"
        className="w-full h-full"
      >
        <defs>
          {/* Porcelain Pedestal Dish Gradient */}
          <linearGradient id="porcelainDishGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d8d3c8" />
            <stop offset="25%" stopColor="#faf6ee" />
            <stop offset="60%" stopColor="#ffffff" />
            <stop offset="85%" stopColor="#f0eae0" />
            <stop offset="100%" stopColor="#c8c0b2" />
          </linearGradient>

          {/* Pedestal Foot Gradient */}
          <linearGradient id="pedestalFootGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dfd9cd" />
            <stop offset="50%" stopColor="#eae4d8" />
            <stop offset="100%" stopColor="#b5ada0" />
          </linearGradient>

          {/* Red Apple Gradients */}
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

          {/* Mandarin Orange Gradients */}
          <radialGradient id="orangeGradTop" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="35%" stopColor="#f97316" />
            <stop offset="80%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#9a3412" />
          </radialGradient>
          <radialGradient id="orangeGradLeft" cx="42%" cy="38%" r="60%">
            <stop offset="0%" stopColor="#ffedd5" />
            <stop offset="40%" stopColor="#fb923c" />
            <stop offset="85%" stopColor="#c2410c" />
            <stop offset="100%" stopColor="#7c2d12" />
          </radialGradient>
          <radialGradient id="orangeGradRight" cx="38%" cy="38%" r="60%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="80%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </radialGradient>

          {/* Peach Gradients */}
          <radialGradient id="peachGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#fbcfe8" />
            <stop offset="70%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#be123c" />
          </radialGradient>

          {/* Green Leaf Gradient */}
          <linearGradient id="leafGradFruit" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
        </defs>

        {/* ── High-Footed Porcelain Pedestal Base (白瓷高足底座) ── */}
        {/* Foot Rim */}
        <ellipse cx="52" cy="79" rx="16" ry="3.5" fill="#3a2818" opacity="0.3" />
        <ellipse cx="52" cy="78" rx="15" ry="3.2" fill="url(#pedestalFootGrad)" stroke="#c2baa9" strokeWidth="0.8" />
        {/* Foot Column Stem */}
        <path
          d="M 44 78 C 45 70, 48 64, 48 58 L 56 58 C 56 64, 59 70, 60 78 Z"
          fill="url(#pedestalFootGrad)"
          stroke="#c2baa9"
          strokeWidth="0.8"
        />
        {/* Dish Under-Bow */}
        <path
          d="M 16 48 C 22 58, 42 61, 52 61 C 62 61, 82 58, 88 48 Z"
          fill="url(#porcelainDishGrad)"
          stroke="#c8c0af"
          strokeWidth="0.8"
        />
        {/* Dish Top Rim (Lotus scalloped curve) */}
        <ellipse cx="52" cy="48" rx="38" ry="7.5" fill="url(#porcelainDishGrad)" stroke="#d2cbbe" strokeWidth="1" />
        <ellipse cx="52" cy="47.5" rx="34" ry="5.5" fill="#f4efe6" />

        {/* ── Specific Fruits Rendered ── */}
        {fruitType === 'apples' && (
          <g id="stackedApples">
            {/* Left Apple */}
            <g transform="translate(38, 40)">
              <circle cx="0" cy="0" r="14" fill="url(#appleGradLeft)" />
              <path d="M 0 -13 Q -2 -17 -6 -18" stroke="#5c3d2e" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <ellipse cx="-7" cy="-19" rx="4" ry="2" fill="url(#leafGradFruit)" transform="rotate(-30 -7 -19)" />
              {/* Glossy sheen */}
              <ellipse cx="-4" cy="-5" rx="4.5" ry="2.5" fill="#ffffff" opacity="0.35" transform="rotate(-25 -4 -5)" />
            </g>

            {/* Right Apple */}
            <g transform="translate(66, 40)">
              <circle cx="0" cy="0" r="14" fill="url(#appleGradRight)" />
              <path d="M 0 -13 Q 2 -17 6 -18" stroke="#5c3d2e" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <ellipse cx="7" cy="-19" rx="4" ry="2" fill="url(#leafGradFruit)" transform="rotate(30 7 -19)" />
              <ellipse cx="-3" cy="-5" rx="4.5" ry="2.5" fill="#ffffff" opacity="0.35" transform="rotate(-25 -3 -5)" />
            </g>

            {/* Top Pyramid Apple */}
            <g transform="translate(52, 22)">
              <circle cx="0" cy="0" r="14.5" fill="url(#appleGradTop)" />
              <path d="M 0 -13.5 Q 2 -18 5 -20" stroke="#4a2818" strokeWidth="2.0" fill="none" strokeLinecap="round" />
              <ellipse cx="7" cy="-21" rx="5" ry="2.5" fill="url(#leafGradFruit)" transform="rotate(25 7 -21)" />
              <ellipse cx="-4" cy="-5.5" rx="5" ry="2.8" fill="#ffffff" opacity="0.45" transform="rotate(-20 -4 -5.5)" />
            </g>
          </g>
        )}

        {fruitType === 'oranges' && (
          <g id="stackedOranges">
            {/* Left Orange */}
            <g transform="translate(36, 40)">
              <circle cx="0" cy="0" r="13" fill="url(#orangeGradLeft)" />
              <circle cx="0" cy="-12" r="1.5" fill="#365314" />
              <ellipse cx="-4" cy="-4" rx="3.8" ry="2" fill="#ffffff" opacity="0.4" transform="rotate(-30 -4 -4)" />
            </g>

            {/* Right Orange */}
            <g transform="translate(68, 40)">
              <circle cx="0" cy="0" r="13" fill="url(#orangeGradRight)" />
              <circle cx="0" cy="-12" r="1.5" fill="#365314" />
              <ellipse cx="-4" cy="-4" rx="3.8" ry="2" fill="#ffffff" opacity="0.4" transform="rotate(-30 -4 -4)" />
            </g>

            {/* Top Orange with Twig & Leaf */}
            <g transform="translate(52, 23)">
              <circle cx="0" cy="0" r="13.5" fill="url(#orangeGradTop)" />
              <path d="M 0 -12.5 Q 3 -16 6 -18" stroke="#365314" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <ellipse cx="8" cy="-19" rx="6" ry="2.8" fill="url(#leafGradFruit)" transform="rotate(25 8 -19)" />
              <ellipse cx="-3" cy="-17" rx="4" ry="2.2" fill="url(#leafGradFruit)" transform="rotate(-35 -3 -17)" />
              <ellipse cx="-4" cy="-5" rx="4.5" ry="2.5" fill="#ffffff" opacity="0.48" transform="rotate(-25 -4 -5)" />
            </g>
          </g>
        )}

        {fruitType === 'peaches' && (
          <g id="stackedPeaches">
            {/* Left Peach */}
            <g transform="translate(38, 38) scale(0.9)">
              <path
                d="M 0 -16 C 16 -12, 18 14, 0 16 C -18 14, -16 -12, 0 -16 Z"
                fill="url(#peachGrad)"
              />
              <path d="M 0 -16 Q 0 0 0 16" stroke="#fb7185" strokeWidth="0.8" fill="none" opacity="0.6" />
            </g>

            {/* Right Peach */}
            <g transform="translate(66, 38) scale(0.9)">
              <path
                d="M 0 -16 C 16 -12, 18 14, 0 16 C -18 14, -16 -12, 0 -16 Z"
                fill="url(#peachGrad)"
              />
              <path d="M 0 -16 Q 0 0 0 16" stroke="#fb7185" strokeWidth="0.8" fill="none" opacity="0.6" />
            </g>

            {/* Top Peach with Two Lush Leaves */}
            <g transform="translate(52, 21)">
              <ellipse cx="-10" cy="-6" rx="8" ry="3.5" fill="url(#leafGradFruit)" transform="rotate(-35 -10 -6)" />
              <ellipse cx="10" cy="-6" rx="8" ry="3.5" fill="url(#leafGradFruit)" transform="rotate(35 10 -6)" />
              <path
                d="M 0 -17 C 18 -13, 20 15, 0 17 C -20 15, -18 -13, 0 -17 Z"
                fill="url(#peachGrad)"
              />
              <path d="M 0 -17 Q 0 0 0 17" stroke="#fb7185" strokeWidth="1" fill="none" opacity="0.7" />
              <ellipse cx="-5" cy="-5" rx="5" ry="3" fill="#ffffff" opacity="0.45" transform="rotate(-25 -5 -5)" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
