import React from 'react';
import { sound } from '../utils/audio';

interface ItemTeaCupsProps {
  scale?: number;
  className?: string;
  onClick?: () => void;
}

export const ItemTeaCups: React.FC<ItemTeaCupsProps> = ({
  scale = 1,
  className = '',
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playPorcelainClink();
    onClick?.();
  };

  return (
    <div
      onClick={handleClick}
      title="敬茶三盅 · 虔心清敬（点击轻品清茗）"
      className={`relative select-none cursor-pointer transition-transform hover:scale-105 active:scale-95 group ${className}`}
      style={{
        width: 108 * scale,
        height: 48 * scale,
      }}
    >
      {/* Animated Subtle Rising Steam Wisps (温热清茶微弱热气) */}
      <div className="absolute -top-3 left-0 w-full flex justify-around pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-4 bg-gradient-to-t from-stone-300/60 to-transparent rounded-full blur-[1px] animate-pulse"
            style={{
              animationDuration: `${2.2 + i * 0.4}s`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <svg
        viewBox="0 0 108 48"
        className="w-full h-full"
      >
        <defs>
          {/* Rosewood Tray Gradient */}
          <linearGradient id="rosewoodTrayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2c1810" />
            <stop offset="25%" stopColor="#4a2818" />
            <stop offset="50%" stopColor="#5c3420" />
            <stop offset="75%" stopColor="#4a2818" />
            <stop offset="100%" stopColor="#2c1810" />
          </linearGradient>

          {/* Tray Gold Rim Inlay */}
          <linearGradient id="trayGoldInlay" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="50%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          {/* Porcelain Cup Gradient */}
          <linearGradient id="teaCupPorcelain" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ded9d0" />
            <stop offset="30%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ded9d0" />
          </linearGradient>

          {/* Amber-Green Brewed Tea Gradient */}
          <radialGradient id="teaLiquidGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="60%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </radialGradient>
        </defs>

        {/* ── 1. Carved Rosewood Tray (紫檀雕花茶托) ── */}
        {/* Tray Contact Shadow */}
        <ellipse cx="54" cy="42" rx="48" ry="4" fill="#2d1b11" opacity="0.35" />
        {/* Tray Body */}
        <path
          d="M 6 36 C 6 42, 102 42, 102 36 L 100 40 C 100 44, 8 44, 8 40 Z"
          fill="url(#rosewoodTrayGrad)"
          stroke="#3d2012"
          strokeWidth="0.8"
        />
        <ellipse cx="54" cy="36" rx="48" ry="6" fill="url(#rosewoodTrayGrad)" stroke="#693b22" strokeWidth="0.8" />
        <ellipse cx="54" cy="35.5" rx="45" ry="4.5" fill="none" stroke="url(#trayGoldInlay)" strokeWidth="0.6" opacity="0.85" />

        {/* ── 2. Three Gilded Porcelain Tea Cups (三盏描金白瓷茶盅) ── */}
        {/* Cup Positions: Left (24), Center (54), Right (84) */}
        {[
          { x: 25, y: 30, label: '清茶 · 敬天' },
          { x: 54, y: 30, label: '清茶 · 敬尊' },
          { x: 83, y: 30, label: '清茶 · 敬地' },
        ].map((cup, idx) => (
          <g key={idx} transform={`translate(${cup.x}, ${cup.y})`}>
            {/* Cup Foot Shadow */}
            <ellipse cx="0" cy="5" rx="7" ry="1.5" fill="#1e130c" opacity="0.3" />
            {/* Cup Foot Ring */}
            <ellipse cx="0" cy="4.5" rx="6.5" ry="1.4" fill="#cfc7ba" stroke="#b5aca0" strokeWidth="0.5" />
            {/* Cup Porcelain Body */}
            <path
              d="M -11 -7 C -11 0, -8 4.5, 0 4.5 C 8 4.5, 11 0, 11 -7 Z"
              fill="url(#teaCupPorcelain)"
              stroke="#cfc7ba"
              strokeWidth="0.8"
            />
            {/* Gilded Rim Accent (杯沿描金) */}
            <ellipse cx="0" cy="-7" rx="11" ry="3.2" fill="url(#teaCupPorcelain)" stroke="url(#trayGoldInlay)" strokeWidth="0.8" />
            {/* Fresh Amber Tea Surface */}
            <ellipse cx="0" cy="-6.5" rx="9" ry="2.2" fill="url(#teaLiquidGrad)" />
            {/* Tea Surface Specular Highlight */}
            <ellipse cx="-2.5" cy="-7" rx="3.5" ry="0.8" fill="#ffffff" opacity="0.65" />
          </g>
        ))}
      </svg>
    </div>
  );
};
