import React from 'react';
import { CandleFlame } from './CandleFlame';

interface ItemCandleProps {
  isLit: boolean;
  onToggle: () => void;
  windForce?: number;
  glowIntensity?: number;
  scale?: number;
  className?: string;
}

export const ItemCandle: React.FC<ItemCandleProps> = ({
  isLit,
  onToggle,
  windForce = 0,
  glowIntensity = 1,
  scale = 1,
  className = '',
}) => {
  return (
    <div 
      className={`relative select-none flex flex-col items-center ${className}`}
      style={{
        width: 60 * scale,
        height: 120 * scale,
      }}
    >
      <div 
        className="absolute -top-16 left-1/2 -translate-x-1/2 pointer-events-auto"
        style={{ width: 80 * scale, height: 110 * scale }}
      >
        <CandleFlame
          isLit={isLit}
          onToggle={onToggle}
          windForce={windForce}
          glowIntensity={glowIntensity}
          scale={scale}
        />
      </div>

      <div 
        className="absolute bottom-0 w-[42px] h-[64px] cursor-pointer"
        onClick={onToggle}
        title={isLit ? '点击熄灭烛火' : '点击点燃蜡烛'}
        style={{
          width: 42 * scale,
          height: 64 * scale,
        }}
      >
        <svg 
          viewBox="0 0 42 64" 
          className="w-full h-full filter drop-shadow-md"
        >
          <defs>
            <linearGradient id="waxGradC" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d5cebd" />
              <stop offset="25%" stopColor={isLit ? '#fff7e0' : '#f8f4ea'} />
              <stop offset="65%" stopColor={isLit ? '#f9edd0' : '#f0ebd8'} />
              <stop offset="90%" stopColor="#ded5be" />
              <stop offset="100%" stopColor="#c7bda2" />
            </linearGradient>

            <linearGradient id="waxPoolGradC" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isLit ? '#ffe699' : '#f4eee0'} />
              <stop offset="100%" stopColor={isLit ? '#ffd066' : '#ded6c1'} />
            </linearGradient>
          </defs>

          <path
            d="M 4 8
               L 4 58
               C 4 61, 38 61, 38 58
               L 38 8
               Z"
            fill="url(#waxGradC)"
            stroke="#c8beaa"
            strokeWidth="0.8"
          />

          <path
            d="M 12 8 C 12 18, 14 26, 16 28 C 18 26, 17 18, 17 8 Z"
            fill={isLit ? '#fff5d6' : '#f7f2e4'}
            opacity="0.9"
          />

          <ellipse cx="21" cy="8" rx="17" ry="4.8" fill="url(#waxPoolGradC)" stroke="#c4ba9f" strokeWidth="0.8" />
          <ellipse cx="21" cy="8" rx="14" ry="3.2" fill={isLit ? '#ffbe3b' : '#c8bfa8'} opacity={isLit ? 0.7 : 0.4} />

          <circle cx="21" cy="8" r="2.2" fill="#3a2f24" opacity="0.6" />
        </svg>

        {isLit && (
          <div 
            className="absolute top-0 inset-x-0 h-10 rounded-t-lg pointer-events-none opacity-40 bg-gradient-to-b from-amber-300 via-amber-400/20 to-transparent"
          />
        )}
      </div>
    </div>
  );
};
