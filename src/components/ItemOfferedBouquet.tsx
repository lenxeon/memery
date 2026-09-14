import React from 'react';
import { FlowerType } from '../types';
import { X } from 'lucide-react';

interface ItemOfferedBouquetProps {
  flowerType: FlowerType;
  scale?: number;
  isArrangeMode?: boolean;
  onRemove?: () => void;
}

export const ItemOfferedBouquet: React.FC<ItemOfferedBouquetProps> = ({
  flowerType = 'lilies',
  scale = 1,
  isArrangeMode = false,
  onRemove,
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
          title: '敬献 · 出尘清莲',
          primaryColor: '#ec4899',
          secColor: '#fce7f3',
          ribbonColor: '#d9f99d',
        };
      case 'chrysanthemum':
        return {
          title: '敬献 · 高洁白菊',
          primaryColor: '#fef08a',
          secColor: '#ffffff',
          ribbonColor: '#e2e8f0',
        };
      case 'roses':
        return {
          title: '敬献 · 香槟玫瑰',
          primaryColor: '#fb923c',
          secColor: '#fed7aa',
          ribbonColor: '#fef3c7',
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

  return (
    <div 
      className="relative select-none pointer-events-auto group"
      style={{
        width: 130 * scale,
        height: 72 * scale,
      }}
      title={meta.title}
    >
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
        className="w-full h-full filter drop-shadow-md"
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
            {/* Peony Blossom 1 */}
            <circle cx="16" cy="2" r="15" fill="#f472b6" />
            <circle cx="16" cy="2" r="11" fill="#fda4af" />
            <circle cx="16" cy="2" r="7" fill="#ffe4e6" />
            <circle cx="16" cy="2" r="2.5" fill="#f59e0b" />

            {/* Peony Blossom 2 */}
            <circle cx="-12" cy="5" r="13" fill="#f43f5e" />
            <circle cx="-12" cy="5" r="9" fill="#fb7185" />
            <circle cx="-12" cy="5" r="5" fill="#fff1f2" />
            <circle cx="-12" cy="5" r="2" fill="#f59e0b" />
          </g>
        )}

        {flowerType === 'lilies' && (
          <g transform="translate(74, 34)">
            {/* Pure White Lily 1 */}
            <g transform="translate(14, 0) scale(0.65)">
              <path d="M 0 0 C 12 -30 28 -24 30 -14 C 20 -2 10 4 0 0 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <path d="M 0 0 C 4 -32 -12 -34 -20 -22 C -12 -10 -4 -2 0 0 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <path d="M 0 0 C -30 -16 -34 -4 -26 8 C -16 8 -4 2 0 0 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <path d="M 0 0 C -20 12 -14 30 -2 32 C 4 20 2 8 0 0 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <path d="M 0 0 C 18 16 28 26 32 16 C 22 8 10 2 0 0 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="6" fill="#bef264" />
              <circle cx="2" cy="-2" r="2" fill="#d97706" />
            </g>

            {/* Pure White Lily 2 */}
            <g transform="translate(-14, 4) scale(0.55)">
              <path d="M 0 0 C 10 -25 24 -20 25 -12 C 16 -2 8 3 0 0 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <path d="M 0 0 C 3 -26 -10 -28 -16 -18 C -10 -8 -3 -2 0 0 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <path d="M 0 0 C -25 -14 -28 -3 -22 6 C -13 6 -3 2 0 0 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="5" fill="#bef264" />
            </g>
          </g>
        )}

        {flowerType === 'lotus' && (
          <g transform="translate(74, 34)">
            {/* Sacred Lotus Blossom */}
            <g transform="translate(10, 2) scale(0.68)">
              <path d="M 0 10 C -20 2 -28 -18 -16 -30 C -4 -20 0 -8 0 10 Z" fill="#f472b6" />
              <path d="M 0 10 C 20 2 28 -18 16 -30 C 4 -20 0 -8 0 10 Z" fill="#f472b6" />
              <path d="M 0 10 C -12 -4 -16 -30 0 -35 C 16 -30 12 -4 0 10 Z" fill="#fbcfe8" />
              <circle cx="0" cy="-4" r="6" fill="#a3e635" />
            </g>
            {/* Lotus Pad / Bud */}
            <ellipse cx="-16" cy="4" rx="14" ry="7" fill="#4d7c0f" transform="rotate(-10 -16 4)" />
          </g>
        )}

        {flowerType === 'chrysanthemum' && (
          <g transform="translate(74, 34)">
            {/* White Chrysanthemum 1 */}
            <g transform="translate(12, 0) scale(0.65)">
              {Array.from({ length: 12 }).map((_, i) => (
                <ellipse key={i} cx="0" cy="-14" rx="3" ry="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" transform={`rotate(${i * 30})`} />
              ))}
              <circle cx="0" cy="0" r="6" fill="#eab308" />
            </g>
            {/* White Chrysanthemum 2 */}
            <g transform="translate(-14, 4) scale(0.55)">
              {Array.from({ length: 12 }).map((_, i) => (
                <ellipse key={i} cx="0" cy="-14" rx="3" ry="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" transform={`rotate(${i * 30 + 15})`} />
              ))}
              <circle cx="0" cy="0" r="5" fill="#eab308" />
            </g>
          </g>
        )}

        {flowerType === 'roses' && (
          <g transform="translate(74, 34)">
            {/* Champagne Rose 1 */}
            <g transform="translate(14, 0) scale(0.68)">
              <circle cx="0" cy="0" r="18" fill="#fed7aa" />
              <path d="M -12 -6 C -14 -16 2 -18 10 -10 C 16 -2 14 10 6 14 C -4 16 -10 6 -12 -6 Z" fill="#fb923c" />
              <path d="M -6 -8 C 0 -14 8 -8 8 0 C 6 6 0 6 -4 4 Z" fill="#fff7ed" />
            </g>
            {/* Champagne Rose 2 */}
            <g transform="translate(-14, 4) scale(0.58)">
              <circle cx="0" cy="0" r="16" fill="#fed7aa" />
              <path d="M -10 -4 C -12 -12 2 -14 8 -8 C 12 -2 10 8 4 10 C -2 12 -8 4 -10 -4 Z" fill="#fb923c" />
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
