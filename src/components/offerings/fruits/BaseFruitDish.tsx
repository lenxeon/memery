/**
 * @file BaseFruitDish.tsx
 * @description 供果果盘基类组件，负责青花瓷盘/铜盘造型及高光托底渲染。
 */
import React from 'react';
import { sound } from '../../../utils/audio';

interface BaseFruitDishProps {
  title: string;
  nextName: string;
  scale?: number;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  defsSlot?: React.ReactNode;
  children: React.ReactNode;
}

export const BaseFruitDish: React.FC<BaseFruitDishProps> = ({
  title,
  nextName,
  scale = 1,
  className = '',
  onClick,
  defsSlot,
  children,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playPorcelainClink();
    onClick?.(e);
  };

  return (
    <div
      onClick={handleClick}
      title={`${title} (点击切换为${nextName})`}
      className={`relative select-none cursor-pointer transition-transform hover:scale-105 active:scale-95 group ${className}`}
      style={{
        width: 104 * scale,
        height: 86 * scale,
      }}
    >
      <svg viewBox="0 0 104 86" className="w-full h-full">
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

          {defsSlot}
        </defs>

        {/* 1. Ambient Table Shadow under Dish */}
        <ellipse cx="52" cy="80" rx="46" ry="6" fill="#120c06" opacity="0.32" filter="blur(2px)" />

        {/* 2. Specific Fruit Pyramid / Content Slot */}
        {children}

        {/* 3. High Pedestal Foot (高足瓷座) */}
        <g id="dishFoot">
          <path
            d="M 38 68 L 32 77 Q 52 79 72 77 L 66 68 Z"
            fill="url(#pedestalFootGrad)"
            stroke="#b0a89a"
            strokeWidth="0.75"
          />
          <ellipse cx="52" cy="77" rx="20" ry="3" fill="#c4bcad" stroke="#9e9585" strokeWidth="0.8" />
        </g>

        {/* 4. Porcelain Shallow Dish (白瓷浅盘碗体) */}
        <g id="dishBowl">
          <ellipse cx="52" cy="62" rx="48" ry="13" fill="url(#porcelainDishGrad)" stroke="#c2b9aa" strokeWidth="1" />
          <ellipse cx="52" cy="60" rx="44" ry="10" fill="#fcf9f2" stroke="#d5ccbe" strokeWidth="0.8" />
          {/* Inner dish rim specular highlight */}
          <ellipse cx="52" cy="59" rx="42" ry="8.5" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
};
