/**
 * @file SingingBowlItem.tsx
 * @description 纯铜颂钵（磬）组件，支持敲击共振动效与余音荡漾反馈。
 */
import React, { useState } from 'react';
import { sound } from '../../../utils/audio';

export interface SingingBowlItemProps {
  scale?: number;
  className?: string;
  onStrike?: () => void;
}

export type ItemSingingBowlProps = SingingBowlItemProps;

export const SingingBowlItem: React.FC<SingingBowlItemProps> = ({
  scale = 1,
  className = '',
  onStrike,
}) => {
  const [isStriking, setIsStriking] = useState(false);
  const [rippleKey, setRippleKey] = useState(0);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playSingingBowl(528);
    setIsStriking(true);
    setRippleKey((k) => k + 1);
    setTimeout(() => setIsStriking(false), 800);
    onStrike?.();
  };

  return (
    <div
      onClick={handleClick}
      title="静心铜磬 · 528Hz 治愈颂钵（点击敲磬发声，静心冥思）"
      className={`relative select-none cursor-pointer flex flex-col items-center group transition-transform hover:scale-105 active:scale-95 ${className}`}
      style={{
        width: 82 * scale,
        height: 68 * scale,
      }}
    >
      {/* Expanding Golden Sonic Ripple (敲磬泛音共振光环) */}
      {rippleKey > 0 && (
        <div
          key={rippleKey}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full border border-amber-300/80 bg-amber-400/15 animate-ping duration-1000"
          style={{ width: 68 * scale, height: 68 * scale }}
        />
      )}

      <svg
        viewBox="0 0 82 68"
        className={`w-full h-full transition-transform duration-200 ${
          isStriking ? 'scale-105 rotate-1' : ''
        }`}
      >
        <defs>
          {/* Hammered Bronze Bowl Gradient */}
          <radialGradient id="bronzeBowlGrad" cx="38%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="25%" stopColor="#fde047" />
            <stop offset="55%" stopColor="#ca8a04" />
            <stop offset="85%" stopColor="#854d0e" />
            <stop offset="100%" stopColor="#451a03" />
          </radialGradient>

          {/* Golden Rim Highlight */}
          <linearGradient id="bronzeRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ca8a04" />
            <stop offset="25%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="75%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#a16207" />
          </linearGradient>

          {/* Brocade Silk Cushion Ring Gradient */}
          <linearGradient id="brocadeCushion" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#881337" />
            <stop offset="35%" stopColor="#e11d48" />
            <stop offset="70%" stopColor="#be123c" />
            <stop offset="100%" stopColor="#4c0519" />
          </linearGradient>

          {/* Striker Rosewood */}
          <linearGradient id="strikerWood" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#451a03" />
            <stop offset="60%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#290e03" />
          </linearGradient>
        </defs>

        {/* ── 1. Brocade Cushion Base (丝缎锦圈环垫) ── */}
        <ellipse cx="40" cy="58" rx="28" ry="6.5" fill="#261208" opacity="0.3" />
        <path
          d="M 14 55 C 14 62, 66 62, 66 55 L 64 58 C 64 64, 16 64, 16 58 Z"
          fill="url(#brocadeCushion)"
          stroke="#4c0519"
          strokeWidth="0.8"
        />
        <ellipse cx="40" cy="55" rx="26" ry="5" fill="url(#brocadeCushion)" stroke="#f43f5e" strokeWidth="0.6" />
        <ellipse cx="40" cy="55" rx="23" ry="3.5" fill="none" stroke="#fcd34d" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.8" />

        {/* ── 2. Antique Bronze Singing Bowl (古铜颂钵体) ── */}
        {/* Bowl Outer Bell Profile */}
        <path
          d="M 14 26 
             C 12 40, 22 52, 40 52 
             C 58 52, 68 40, 66 26 
             Z"
          fill="url(#bronzeBowlGrad)"
          stroke="#713f12"
          strokeWidth="1"
        />

        {/* Hammered Surface Textures (锤纹反光质感) */}
        <ellipse cx="28" cy="38" rx="7" ry="4" fill="#ffffff" opacity="0.18" transform="rotate(-15 28 38)" />
        <ellipse cx="50" cy="40" rx="9" ry="5" fill="#ffffff" opacity="0.15" transform="rotate(15 50 40)" />
        <ellipse cx="36" cy="45" rx="6" ry="3" fill="#ffffff" opacity="0.12" />

        {/* Heavy Polished Singing Rim (颂钵厚重发音外口沿) */}
        <ellipse cx="40" cy="26" rx="26" ry="6.5" fill="url(#bronzeRimGrad)" stroke="#854d0e" strokeWidth="0.9" />
        {/* Bowl Inner Cavity (深邃钵内) */}
        <ellipse cx="40" cy="25.5" rx="22.5" ry="5.2" fill="#381907" />
        <ellipse cx="40" cy="25.2" rx="19" ry="4" fill="#1f0c03" />

        {/* ── 3. Rosewood & Suede Striker (紫檀小敲棰) ── */}
        <g transform="translate(62, 38) rotate(32)">
          {/* Striker Shadow */}
          <ellipse cx="0" cy="14" rx="3.5" ry="12" fill="#1b0e07" opacity="0.35" />
          {/* Striker Handle */}
          <rect x="-2" y="-12" width="4" height="24" rx="2" fill="url(#strikerWood)" stroke="#260e02" strokeWidth="0.5" />
          {/* Suede/Leather wrap around head */}
          <rect x="-2.8" y="4" width="5.6" height="12" rx="2" fill="#d97706" stroke="#92400e" strokeWidth="0.6" />
          <line x1="-2.8" y1="8" x2="2.8" y2="8" stroke="#78350f" strokeWidth="0.6" />
          <line x1="-2.8" y1="12" x2="2.8" y2="12" stroke="#78350f" strokeWidth="0.6" />
        </g>
      </svg>
    </div>
  );
};

export const ItemSingingBowl = SingingBowlItem;
