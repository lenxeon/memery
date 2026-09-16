/**
 * @file OfferedBouquet.tsx
 * @description 供桌献花束展示组件，呈现敬献鲜花的包裹与花束摆放效果。
 */
import React from 'react';
import { FlowerType } from '../../../types';
import { ItemLifecycle } from '../../../game/types/entity';
import { X } from 'lucide-react';

export interface OfferedBouquetProps {
  flowerType: FlowerType;
  scale?: number;
  isArrangeMode?: boolean;
  onRemove?: () => void;
  lifecycle?: ItemLifecycle;
}

export type ItemOfferedBouquetProps = OfferedBouquetProps;

export const OfferedBouquet: React.FC<OfferedBouquetProps> = ({
  flowerType = 'lilies',
  scale = 1,
  isArrangeMode = false,
  onRemove,
  lifecycle,
}) => {
  const getFlowerMeta = () => {
    switch (flowerType) {
      case 'peonies':
        return {
          title: '敬献 · 重瓣粉牡丹',
          primaryColor: '#f472b6',
          secColor: '#fda4af',
          ribbonColor: '#fbcfe8',
        };
      case 'lotus':
        return {
          title: '敬献 · 出尘净莲',
          primaryColor: '#ec4899',
          secColor: '#fce7f3',
          ribbonColor: '#d9f99d',
        };
      case 'chrysanthemum':
        return {
          title: '敬献 · 岁寒金菊',
          primaryColor: '#fef08a',
          secColor: '#ffffff',
          ribbonColor: '#e2e8f0',
        };
      case 'roses':
        return {
          title: '敬献 · 长情玫瑰',
          primaryColor: '#f43f5e',
          secColor: '#fecdd3',
          ribbonColor: '#ffe4e6',
        };
      case 'plum_blossoms':
        return {
          title: '敬献 · 傲霜寒梅',
          primaryColor: '#e11d48',
          secColor: '#fecdd3',
          ribbonColor: '#fef08a',
        };
      case 'sunflowers':
        return {
          title: '敬献 · 金色向阳',
          primaryColor: '#eab308',
          secColor: '#713f12',
          ribbonColor: '#fef08a',
        };
      case 'carnations':
        return {
          title: '敬献 · 慈孝康乃馨',
          primaryColor: '#f43f5e',
          secColor: '#fbcfe8',
          ribbonColor: '#fce7f3',
        };
      case 'calla_lilies':
        return {
          title: '敬献 · 圣洁马蹄莲',
          primaryColor: '#ffffff',
          secColor: '#facc15',
          ribbonColor: '#bbf7d0',
        };
      case 'tulips':
        return {
          title: '敬献 · 典雅郁金香',
          primaryColor: '#e11d48',
          secColor: '#fde047',
          ribbonColor: '#fbcfe8',
        };
      case 'narcissus':
        return {
          title: '敬献 · 凌波水仙',
          primaryColor: '#ffffff',
          secColor: '#facc15',
          ribbonColor: '#fef08a',
        };
      case 'lily_of_valley':
        return {
          title: '敬献 · 如意铃兰',
          primaryColor: '#ffffff',
          secColor: '#e2e8f0',
          ribbonColor: '#bbf7d0',
        };
      case 'orchids':
        return {
          title: '敬献 · 幽谷素兰',
          primaryColor: '#c084fc',
          secColor: '#fef08a',
          ribbonColor: '#e9d5ff',
        };
      case 'hydrangeas':
        return {
          title: '敬献 · 团圆绣球',
          primaryColor: '#818cf8',
          secColor: '#c084fc',
          ribbonColor: '#e0e7ff',
        };
      case 'daisies':
        return {
          title: '敬献 · 清纯雏菊',
          primaryColor: '#ffffff',
          secColor: '#facc15',
          ribbonColor: '#fef08a',
        };
      case 'lilies':
      default:
        return {
          title: '敬献 · 纯白百合',
          primaryColor: '#ffffff',
          secColor: '#fef9c3',
          ribbonColor: '#fef08a',
        };
    }
  };

  const meta = getFlowerMeta();

  // Lifecycle visual effects (含苞 -> 盛开 -> 微凋 -> 枯萎 -> 消失)
  const stage = lifecycle?.stage || 'blooming';
  const health = lifecycle?.health ?? 1.0;

  let lifecycleTransform = '';
  let lifecycleFilter = '';
  let lifecycleOpacity = 1;
  let stageBadgeText = '';

  switch (stage) {
    case 'budding':
      lifecycleTransform = 'scale(0.92)';
      stageBadgeText = '含苞';
      break;
    case 'blooming':
      lifecycleTransform = 'scale(1)';
      stageBadgeText = '盛开';
      break;
    case 'wilting':
      lifecycleTransform = 'rotate(3deg) translateY(2px)';
      lifecycleFilter = 'sepia(0.25) saturate(0.85)';
      stageBadgeText = '微凋';
      break;
    case 'withered':
      lifecycleTransform = 'rotate(7deg) translateY(4px)';
      lifecycleFilter = 'sepia(0.55) saturate(0.6) brightness(0.88)';
      lifecycleOpacity = Math.max(0.12, health * 1.6);
      stageBadgeText = '枯萎';
      break;
    case 'expired':
      lifecycleOpacity = 0;
      stageBadgeText = '凋零';
      break;
  }

  return (
    <div 
      className="relative select-none pointer-events-auto group transition-all duration-700 ease-out"
      style={{
        width: 130 * scale,
        height: 72 * scale,
        transform: lifecycleTransform,
        filter: lifecycleFilter || undefined,
        opacity: lifecycleOpacity,
      }}
      title={`${meta.title}${lifecycle ? `（状态：${stageBadgeText} · 生机 ${Math.round(health * 100)}%）` : ''}`}
    >
      {/* Optional lifecycle badge when in arrange mode or hovered */}
      {lifecycle && isArrangeMode && (
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full bg-stone-900/80 text-[9px] font-medium text-amber-200 border border-amber-400/40 whitespace-nowrap shadow-sm pointer-events-none">
          {stageBadgeText} {Math.round(health * 100)}%
        </div>
      )}

      {/* Delete button when in arrange mode */}
      {isArrangeMode && onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute -top-3 -right-2 z-50 w-5 h-5 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center text-xs shadow-md cursor-pointer transition-transform hover:scale-110 active:scale-95"
          title="撤下此捧供花"
        >
          <X size={12} />
        </button>
      )}

      {/* SVG Bouquet Art */}
      <svg 
        viewBox="0 0 130 72" 
        className="w-full h-full"
      >
        <defs>
          <linearGradient id={`bouquetShadow_${flowerType}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(40,24,10,0.5)" />
            <stop offset="100%" stopColor="rgba(40,24,10,0)" />
          </linearGradient>

          <linearGradient id={`stemWrap_${flowerType}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4d6232" />
            <stop offset="100%" stopColor="#32441e" />
          </linearGradient>

          <linearGradient id={`silkRibbon_${flowerType}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor={meta.ribbonColor} />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        {/* 1. Underlying craft paper / silk fabric wrap */}
        <path
          d="M 20 48 Q 50 36 108 42 Q 118 46 112 56 Q 70 58 18 54 Z"
          fill="rgba(255, 248, 235, 0.88)"
          stroke="rgba(215, 185, 145, 0.7)"
          strokeWidth="0.8"
        />

        {/* Green Stems gathered */}
        <path d="M 22 51 L 52 48" stroke="url(#stemWrap)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 18 49 L 50 46" stroke="url(#stemWrap)" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M 20 53 L 48 50" stroke="url(#stemWrap)" strokeWidth="2.4" strokeLinecap="round" />

        {/* 2. Foliage Leaves behind flowers */}
        <ellipse cx="65" cy="40" rx="20" ry="8" fill="#4d6c2d" transform="rotate(-15 65 40)" />
        <ellipse cx="90" cy="38" rx="18" ry="7" fill="#5c8236" transform="rotate(20 90 38)" />
        <ellipse cx="78" cy="48" rx="16" ry="6" fill="#3b5321" transform="rotate(5 78 48)" />

        {/* 3. Specific Flowers rendered */}
        {flowerType === 'peonies' && (
          <g transform="translate(72, 34)">
            {/* Peony Blossom 1 (Right) */}
            <circle cx="16" cy="2" r="14" fill="#f472b6" />
            <circle cx="16" cy="2" r="10" fill="#fda4af" />
            <circle cx="16" cy="2" r="6" fill="#ffe4e6" />
            <circle cx="16" cy="2" r="2.2" fill="#f59e0b" />

            {/* Peony Blossom 2 (Left) */}
            <circle cx="-14" cy="5" r="12" fill="#f43f5e" />
            <circle cx="-14" cy="5" r="8.5" fill="#fb7185" />
            <circle cx="-14" cy="5" r="5" fill="#fff1f2" />
            <circle cx="-14" cy="5" r="2" fill="#f59e0b" />

            {/* Peony Blossom 3 (Top Crown) */}
            <circle cx="2" cy="-8" r="11" fill="#ec4899" />
            <circle cx="2" cy="-8" r="7.5" fill="#fbcfe8" />
            <circle cx="2" cy="-8" r="2" fill="#fcd34d" />

            {/* Peony Bud (Side) */}
            <ellipse cx="-24" cy="-2" rx="6" ry="8" fill="#f472b6" transform="rotate(-20 -24 -2)" />
            <ellipse cx="26" cy="-4" rx="5" ry="7" fill="#fda4af" transform="rotate(25 26 -4)" />
          </g>
        )}

        {flowerType === 'lilies' && (
          <g transform="translate(74, 34)">
            {/* Pure White Lily 1 (Right) */}
            <g transform="translate(14, 0) scale(0.65)">
              <path d="M 0 0 C 12 -30 28 -24 30 -14 C 20 -2 10 4 0 0 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <path d="M 0 0 C 4 -32 -12 -34 -20 -22 C -12 -10 -4 -2 0 0 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <path d="M 0 0 C -30 -16 -34 -4 -26 8 C -16 8 -4 2 0 0 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <path d="M 0 0 C -20 12 -14 30 -2 32 C 4 20 2 8 0 0 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <path d="M 0 0 C 18 16 28 26 32 16 C 22 8 10 2 0 0 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="6" fill="#bef264" />
              <circle cx="2" cy="-2" r="2" fill="#d97706" />
            </g>

            {/* Pure White Lily 2 (Left) */}
            <g transform="translate(-14, 4) scale(0.55)">
              <path d="M 0 0 C 10 -25 24 -20 25 -12 C 16 -2 8 3 0 0 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <path d="M 0 0 C 3 -26 -10 -28 -16 -18 C -10 -8 -3 -2 0 0 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <path d="M 0 0 C -25 -14 -28 -3 -22 6 C -13 6 -3 2 0 0 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="5" fill="#bef264" />
            </g>

            {/* Pure White Lily 3 (Top Crown) */}
            <g transform="translate(1, -10) scale(0.58)">
              <path d="M 0 0 C 12 -28 26 -22 28 -12 C 18 -2 8 4 0 0 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <path d="M 0 0 C 4 -30 -10 -32 -18 -20 C -10 -8 -3 -2 0 0 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <path d="M 0 0 C -26 -16 -30 -4 -22 6 C -14 6 -3 2 0 0 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="5" fill="#bef264" />
              <ellipse cx="6" cy="-10" rx="2.5" ry="1.2" fill="#d97706" transform="rotate(-20 6 -10)" />
            </g>

            {/* Lily Bud */}
            <ellipse cx="28" cy="-6" rx="3.5" ry="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.6" transform="rotate(35 28 -6)" />
          </g>
        )}

        {flowerType === 'lotus' && (
          <g transform="translate(74, 34)">
            {/* Sacred Lotus Blossom 1 (Right) */}
            <g transform="translate(10, 2) scale(0.66)">
              <path d="M 0 10 C -20 2 -28 -18 -16 -30 C -4 -20 0 -8 0 10 Z" fill="#f472b6" />
              <path d="M 0 10 C 20 2 28 -18 16 -30 C 4 -20 0 -8 0 10 Z" fill="#f472b6" />
              <path d="M 0 10 C -12 -4 -16 -30 0 -35 C 16 -30 12 -4 0 10 Z" fill="#fbcfe8" />
              <circle cx="0" cy="-4" r="6" fill="#a3e635" />
            </g>
            {/* Sacred Lotus Blossom 2 (Top-Left) */}
            <g transform="translate(-8, -8) scale(0.56)">
              <path d="M 0 10 C -18 2 -24 -16 -14 -26 C -4 -18 0 -6 0 10 Z" fill="#ec4899" />
              <path d="M 0 10 C 18 2 24 -16 14 -26 C 4 -18 0 -6 0 10 Z" fill="#ec4899" />
              <path d="M 0 10 C -10 -4 -14 -26 0 -30 C 14 -26 10 -4 0 10 Z" fill="#fce7f3" />
              <circle cx="0" cy="-3" r="5" fill="#a3e635" />
            </g>
            {/* Lotus Pad & Buds */}
            <ellipse cx="-20" cy="6" rx="14" ry="7" fill="#4d7c0f" transform="rotate(-10 -20 6)" />
            <ellipse cx="26" cy="-4" rx="6" ry="11" fill="#f472b6" transform="rotate(30 26 -4)" />
          </g>
        )}

        {flowerType === 'chrysanthemum' && (
          <g transform="translate(74, 34)">
            {/* White Chrysanthemum 1 (Right) */}
            <g transform="translate(14, 0) scale(0.62)">
              {Array.from({ length: 12 }).map((_, i) => (
                <ellipse key={i} cx="0" cy="-14" rx="3" ry="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" transform={`rotate(${i * 30})`} />
              ))}
              <circle cx="0" cy="0" r="6" fill="#eab308" />
            </g>
            {/* White Chrysanthemum 2 (Left) */}
            <g transform="translate(-14, 4) scale(0.52)">
              {Array.from({ length: 12 }).map((_, i) => (
                <ellipse key={i} cx="0" cy="-14" rx="3" ry="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" transform={`rotate(${i * 30 + 15})`} />
              ))}
              <circle cx="0" cy="0" r="5" fill="#eab308" />
            </g>
            {/* White Chrysanthemum 3 (Top Crown) */}
            <g transform="translate(1, -10) scale(0.55)">
              {Array.from({ length: 12 }).map((_, i) => (
                <ellipse key={i} cx="0" cy="-13" rx="2.8" ry="11" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" transform={`rotate(${i * 30})`} />
              ))}
              <circle cx="0" cy="0" r="5.5" fill="#eab308" />
            </g>
            {/* Small Side Bloom */}
            <g transform="translate(26, 4) scale(0.42)">
              {Array.from({ length: 10 }).map((_, i) => (
                <ellipse key={i} cx="0" cy="-12" rx="2.5" ry="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" transform={`rotate(${i * 36})`} />
              ))}
              <circle cx="0" cy="0" r="4.5" fill="#facc15" />
            </g>
          </g>
        )}

        {flowerType === 'roses' && (
          <g transform="translate(74, 34)">
            {/* Champagne Rose 1 (Right) */}
            <g transform="translate(14, 0) scale(0.66)">
              <circle cx="0" cy="0" r="18" fill="#fed7aa" />
              <path d="M -12 -6 C -14 -16 2 -18 10 -10 C 16 -2 14 10 6 14 C -4 16 -10 6 -12 -6 Z" fill="#fb923c" />
              <path d="M -6 -8 C 0 -14 8 -8 8 0 C 6 6 0 6 -4 4 Z" fill="#fff7ed" />
            </g>
            {/* Champagne Rose 2 (Left) */}
            <g transform="translate(-14, 4) scale(0.56)">
              <circle cx="0" cy="0" r="16" fill="#fed7aa" />
              <path d="M -10 -4 C -12 -12 2 -14 8 -8 C 12 -2 10 8 4 10 C -2 12 -8 4 -10 -4 Z" fill="#fb923c" />
            </g>
            {/* Champagne Rose 3 (Top Crown) */}
            <g transform="translate(1, -9) scale(0.58)">
              <circle cx="0" cy="0" r="16" fill="#fed7aa" />
              <path d="M -10 -5 C -12 -14 2 -14 8 -8 C 12 -2 10 6 4 9 C -2 11 -8 4 -10 -5 Z" fill="#fb923c" />
              <path d="M -4 -6 C 0 -10 6 -6 6 0 C 4 4 0 4 -2 2 Z" fill="#fff7ed" />
            </g>
            {/* Rosebud (Right-Top) */}
            <g transform="translate(26, -6) scale(0.48)">
              <ellipse cx="0" cy="0" rx="8" ry="12" fill="#fb923c" transform="rotate(30)" />
              <ellipse cx="-1" cy="-1" rx="5" ry="9" fill="#ffedd5" transform="rotate(30)" />
            </g>
          </g>
        )}

        {/* 4. Elegant Silk Ribbon Tie around the stems */}
        <g transform="translate(42, 49)">
          <path d="M -4 -5 Q 0 0 4 5 Q 0 8 -4 5 Z" fill="url(#silkRibbon)" stroke="#d97706" strokeWidth="0.6" />
          <ellipse cx="0" cy="0" rx="3.5" ry="3.5" fill="#f59e0b" />
          <path d="M -2 2 Q -6 8 -8 14" stroke="#f59e0b" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M 2 2 Q 6 8 8 13" stroke="#f59e0b" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};

export const ItemOfferedBouquet = OfferedBouquet;
