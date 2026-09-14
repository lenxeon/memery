import React from 'react';
import { FlowerType } from '../types';

interface ItemVaseProps {
  flowerType?: FlowerType;
  scale?: number;
  className?: string;
  isRightSide?: boolean;
}

export const ItemVase: React.FC<ItemVaseProps> = ({
  flowerType = 'peonies',
  scale = 1,
  className = '',
  isRightSide = false,
}) => {
  return (
    <div 
      className={`relative select-none pointer-events-none ${className}`}
      style={{
        width: 152 * scale,
        height: 204 * scale,
      }}
    >
      <svg 
        viewBox="0 0 152 204" 
        className="w-full h-full filter drop-shadow-lg"
      >
        <defs>
          {/* Porcelain Fluted Facets Gradients */}
          <linearGradient id={`vaseLeftFacet_${flowerType}_${isRightSide}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ded9d1" />
            <stop offset="100%" stopColor="#f5f0e8" />
          </linearGradient>

          <linearGradient id={`vaseCenterFacet_${flowerType}_${isRightSide}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f7f2ea" />
            <stop offset="40%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f0e9df" />
          </linearGradient>

          <linearGradient id={`vaseRightFacet_${flowerType}_${isRightSide}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e5ded4" />
            <stop offset="100%" stopColor="#c5bcb0" />
          </linearGradient>

          {/* Peony Gradients */}
          <radialGradient id={`peonyDeep_${isRightSide}`} cx="45%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#ffedf3" />
            <stop offset="40%" stopColor="#f8a7be" />
            <stop offset="85%" stopColor="#e76b8d" />
            <stop offset="100%" stopColor="#b8385d" />
          </radialGradient>
          <radialGradient id={`peonySoft_${isRightSide}`} cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fff6f8" />
            <stop offset="50%" stopColor="#fbc2d2" />
            <stop offset="85%" stopColor="#f486a4" />
            <stop offset="100%" stopColor="#cb4b72" />
          </radialGradient>

          {/* Lily Gradients */}
          <linearGradient id={`whiteLilyPetal_${isRightSide}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="65%" stopColor="#faf9f4" />
            <stop offset="85%" stopColor="#eef1df" />
            <stop offset="100%" stopColor="#c6d6a5" />
          </linearGradient>
          <linearGradient id={`lilyThroat_${isRightSide}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e1eeb5" />
            <stop offset="100%" stopColor="#9cb862" />
          </linearGradient>

          {/* Lotus Gradients */}
          <linearGradient id={`lotusPetal_${isRightSide}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="40%" stopColor="#fbcfe8" />
            <stop offset="80%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#fdf2f8" />
          </linearGradient>
          <radialGradient id={`lotusPod_${isRightSide}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="70%" stopColor="#a3e635" />
            <stop offset="100%" stopColor="#4d7c0f" />
          </radialGradient>

          {/* Chrysanthemum Gradients */}
          <linearGradient id={`chrysPetal_${isRightSide}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#fefce8" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          {/* Champagne Rose Gradients */}
          <radialGradient id={`roseChampagne_${isRightSide}`} cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="40%" stopColor="#fed7aa" />
            <stop offset="75%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ea580c" />
          </radialGradient>

          {/* Stem & Leaves */}
          <linearGradient id={`stemGrad_${flowerType}_${isRightSide}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4d6632" />
            <stop offset="60%" stopColor="#718e4c" />
            <stop offset="100%" stopColor="#3d5226" />
          </linearGradient>
          <linearGradient id={`leafGrad_${flowerType}_${isRightSide}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#84a659" />
            <stop offset="60%" stopColor="#557235" />
            <stop offset="100%" stopColor="#2e421a" />
          </linearGradient>
        </defs>

        {/* 1. Flowers Specific Rendering */}
        {flowerType === 'peonies' && (
          <g id="peoniesArt">
            {/* Stems & Foliage */}
            <path d="M 74 125 Q 70 85 54 48" stroke={`url(#stemGrad_${flowerType}_${isRightSide})`} strokeWidth="3.6" fill="none" strokeLinecap="round" />
            <path d="M 76 125 Q 82 82 102 62" stroke={`url(#stemGrad_${flowerType}_${isRightSide})`} strokeWidth="3.4" fill="none" strokeLinecap="round" />
            <path d="M 74 125 Q 74 65 68 34" stroke={`url(#stemGrad_${flowerType}_${isRightSide})`} strokeWidth="3.2" fill="none" strokeLinecap="round" />
            <path d="M 52 78 C 30 68 14 76 8 86 C 22 92 42 90 54 81 Z" fill={`url(#leafGrad_${flowerType}_${isRightSide})`} />
            <path d="M 90 88 C 112 80 130 86 138 96 C 122 102 104 98 90 90 Z" fill={`url(#leafGrad_${flowerType}_${isRightSide})`} />
            <path d="M 42 46 C 24 34 12 42 8 52 C 20 58 36 54 44 48 Z" fill={`url(#leafGrad_${flowerType}_${isRightSide})`} />
            <path d="M 94 58 C 114 48 128 54 134 64 C 120 70 106 66 94 60 Z" fill={`url(#leafGrad_${flowerType}_${isRightSide})`} />

            {/* Main Double Peony */}
            <g transform="translate(54, 42) scale(0.98)">
              <circle cx="0" cy="0" r="28" fill={`url(#peonyDeep_${isRightSide})`} opacity="0.95" />
              <path d="M -22 -10 C -26 -26 2 -32 16 -22 C 28 -8 24 16 10 24 C -8 28 -18 12 -22 -10 Z" fill={`url(#peonySoft_${isRightSide})`} />
              <path d="M -16 -18 C -4 -26 18 -20 20 -8 C 22 8 6 20 -6 18 C -18 14 -20 -2 -16 -18 Z" fill={`url(#peonyDeep_${isRightSide})`} />
              <path d="M -12 -12 C 0 -20 15 -14 14 -2 C 12 10 0 14 -8 10 C -16 6 -16 -4 -12 -12 Z" fill={`url(#peonySoft_${isRightSide})`} />
              <circle cx="-1" cy="-2" r="2.8" fill="#fcd34d" opacity="0.9" />
              <circle cx="3" cy="1" r="2.4" fill="#f59e0b" opacity="0.95" />
            </g>

            {/* Secondary Peony */}
            <g transform="translate(94, 62) scale(0.92)">
              <circle cx="0" cy="0" r="26" fill={`url(#peonyDeep_${isRightSide})`} />
              <path d="M -18 -8 C -22 -22 2 -26 12 -18 C 22 -6 20 12 8 20 C -6 24 -14 10 -18 -8 Z" fill={`url(#peonySoft_${isRightSide})`} />
              <path d="M -12 -14 C 0 -22 14 -16 16 -6 C 18 8 5 16 -5 14 C -15 10 -15 -2 -12 -14 Z" fill="#ffe2ed" />
              <circle cx="1" cy="-1" r="2.5" fill="#fcd34d" />
            </g>
          </g>
        )}

        {flowerType === 'lilies' && (
          <g id="liliesArt">
            <path d="M 76 128 Q 78 95 64 48" stroke={`url(#stemGrad_${flowerType}_${isRightSide})`} strokeWidth="3.4" fill="none" strokeLinecap="round" />
            <path d="M 78 128 Q 86 85 102 45" stroke={`url(#stemGrad_${flowerType}_${isRightSide})`} strokeWidth="3.6" fill="none" strokeLinecap="round" />
            <path d="M 64 88 C 42 76 24 88 18 98 C 30 102 52 96 64 90 Z" fill={`url(#leafGrad_${flowerType}_${isRightSide})`} />
            <path d="M 90 84 C 112 74 132 82 140 92 C 126 96 106 92 90 86 Z" fill={`url(#leafGrad_${flowerType}_${isRightSide})`} />

            {/* Lily 1 */}
            <g transform="translate(94, 52) scale(0.98)">
              <path d="M 0 0 C 16 -38 34 -32 40 -18 C 28 -4 15 6 0 0 Z" fill={`url(#whiteLilyPetal_${isRightSide})`} stroke="#ded9c7" strokeWidth="0.8" />
              <path d="M 0 0 C 6 -42 -14 -44 -24 -30 C -16 -14 -6 -2 0 0 Z" fill={`url(#whiteLilyPetal_${isRightSide})`} stroke="#ded9c7" strokeWidth="0.8" />
              <path d="M 0 0 C -38 -22 -44 -6 -34 10 C -20 10 -6 3 0 0 Z" fill={`url(#whiteLilyPetal_${isRightSide})`} stroke="#ded9c7" strokeWidth="0.8" />
              <path d="M 0 0 C -28 16 -20 38 -2 42 C 6 26 3 11 0 0 Z" fill={`url(#whiteLilyPetal_${isRightSide})`} stroke="#ded9c7" strokeWidth="0.8" />
              <path d="M 0 0 C 24 20 36 34 42 22 C 28 11 14 3 0 0 Z" fill={`url(#whiteLilyPetal_${isRightSide})`} stroke="#ded9c7" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="9" fill={`url(#lilyThroat_${isRightSide})`} opacity="0.9" />
              <path d="M 0 0 Q 9 -14 18 -16" stroke="#8da84b" strokeWidth="1.6" fill="none" />
              <ellipse cx="18" cy="-16" rx="4" ry="1.6" fill="#d97706" transform="rotate(-30 18 -16)" />
              <path d="M 0 0 Q -6 -16 -12 -20" stroke="#8da84b" strokeWidth="1.6" fill="none" />
              <ellipse cx="-12" cy="-20" rx="4" ry="1.6" fill="#f59e0b" transform="rotate(40 -12 -20)" />
            </g>

            {/* Lily 2 */}
            <g transform="translate(52, 68) scale(0.86)">
              <path d="M 0 0 C -14 -32 2 -40 14 -30 C 9 -16 3 -2 0 0 Z" fill={`url(#whiteLilyPetal_${isRightSide})`} stroke="#ded9c7" strokeWidth="0.8" />
              <path d="M 0 0 C -32 -16 -38 2 -28 16 C -14 11 -2 3 0 0 Z" fill={`url(#whiteLilyPetal_${isRightSide})`} stroke="#ded9c7" strokeWidth="0.8" />
              <path d="M 0 0 C -16 26 6 34 20 26 C 13 16 6 5 0 0 Z" fill={`url(#whiteLilyPetal_${isRightSide})`} stroke="#ded9c7" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="8" fill={`url(#lilyThroat_${isRightSide})`} opacity="0.9" />
            </g>
          </g>
        )}

        {flowerType === 'lotus' && (
          <g id="lotusArt">
            {/* Elegant Lotus Stems */}
            <path d="M 76 128 Q 72 80 50 48" stroke={`url(#stemGrad_${flowerType}_${isRightSide})`} strokeWidth="3.6" fill="none" strokeLinecap="round" />
            <path d="M 76 128 Q 85 85 106 55" stroke={`url(#stemGrad_${flowerType}_${isRightSide})`} strokeWidth="3.4" fill="none" strokeLinecap="round" />
            {/* Rounded Lotus Leaf / Pad */}
            <ellipse cx="108" cy="85" rx="30" ry="14" fill={`url(#leafGrad_${flowerType}_${isRightSide})`} transform="rotate(15 108 85)" />
            <ellipse cx="40" cy="88" rx="26" ry="12" fill={`url(#leafGrad_${flowerType}_${isRightSide})`} transform="rotate(-20 40 88)" />

            {/* Main Sacred Lotus Blossom */}
            <g transform="translate(50, 48) scale(0.95)">
              {/* Petals */}
              <path d="M 0 15 C -25 5 -35 -20 -20 -35 C -5 -25 0 -10 0 15 Z" fill={`url(#lotusPetal_${isRightSide})`} />
              <path d="M 0 15 C 25 5 35 -20 20 -35 C 5 -25 0 -10 0 15 Z" fill={`url(#lotusPetal_${isRightSide})`} />
              <path d="M 0 15 C -15 -5 -20 -38 0 -44 C 20 -38 15 -5 0 15 Z" fill={`url(#lotusPetal_${isRightSide})`} />
              <path d="M 0 15 C -8 -8 -10 -35 0 -40 C 10 -35 8 -8 0 15 Z" fill="#ffffff" opacity="0.9" />
              {/* Lotus Pod Center */}
              <circle cx="0" cy="-5" r="7" fill={`url(#lotusPod_${isRightSide})`} />
              <circle cx="-2" cy="-6" r="1.2" fill="#3f6212" />
              <circle cx="2" cy="-6" r="1.2" fill="#3f6212" />
              <circle cx="0" cy="-3" r="1.2" fill="#3f6212" />
            </g>

            {/* Lotus Bud / Pod */}
            <g transform="translate(104, 52) scale(0.78)">
              <path d="M 0 15 C -14 0 -15 -28 0 -35 C 15 -28 14 0 0 15 Z" fill={`url(#lotusPetal_${isRightSide})`} />
              <path d="M 0 15 C -6 0 -8 -25 0 -30 C 8 -25 6 0 0 15 Z" fill="#ffffff" opacity="0.8" />
            </g>
          </g>
        )}

        {flowerType === 'chrysanthemum' && (
          <g id="chrysanthemumArt">
            <path d="M 75 128 Q 72 85 58 48" stroke={`url(#stemGrad_${flowerType}_${isRightSide})`} strokeWidth="3.2" fill="none" strokeLinecap="round" />
            <path d="M 77 128 Q 85 82 98 56" stroke={`url(#stemGrad_${flowerType}_${isRightSide})`} strokeWidth="3.2" fill="none" strokeLinecap="round" />
            {/* Serrated Leaves */}
            <path d="M 50 82 C 32 72 18 80 14 90 C 26 94 44 90 52 84 Z" fill={`url(#leafGrad_${flowerType}_${isRightSide})`} />
            <path d="M 90 86 C 110 78 126 84 132 94 C 118 98 102 94 88 88 Z" fill={`url(#leafGrad_${flowerType}_${isRightSide})`} />

            {/* Radiant White Chrysanthemum 1 */}
            <g transform="translate(58, 48) scale(0.92)">
              {Array.from({ length: 16 }).map((_, i) => (
                <ellipse 
                  key={i} 
                  cx="0" 
                  cy="-18" 
                  rx="3.5" 
                  ry="16" 
                  fill={`url(#chrysPetal_${isRightSide})`} 
                  stroke="#e2e8f0" 
                  strokeWidth="0.5" 
                  transform={`rotate(${i * 22.5})`} 
                />
              ))}
              {Array.from({ length: 12 }).map((_, i) => (
                <ellipse 
                  key={`in_${i}`} 
                  cx="0" 
                  cy="-12" 
                  rx="2.8" 
                  ry="11" 
                  fill="#ffffff" 
                  transform={`rotate(${i * 30 + 15})`} 
                />
              ))}
              <circle cx="0" cy="0" r="8" fill="#eab308" />
              <circle cx="0" cy="0" r="5" fill="#ca8a04" />
            </g>

            {/* Radiant White Chrysanthemum 2 */}
            <g transform="translate(98, 56) scale(0.82)">
              {Array.from({ length: 14 }).map((_, i) => (
                <ellipse 
                  key={i} 
                  cx="0" 
                  cy="-16" 
                  rx="3.2" 
                  ry="14" 
                  fill={`url(#chrysPetal_${isRightSide})`} 
                  stroke="#e2e8f0" 
                  strokeWidth="0.5" 
                  transform={`rotate(${i * 25.7})`} 
                />
              ))}
              <circle cx="0" cy="0" r="7" fill="#eab308" />
            </g>
          </g>
        )}

        {flowerType === 'roses' && (
          <g id="rosesArt">
            <path d="M 75 128 Q 71 85 55 48" stroke={`url(#stemGrad_${flowerType}_${isRightSide})`} strokeWidth="3.4" fill="none" strokeLinecap="round" />
            <path d="M 77 128 Q 86 85 100 58" stroke={`url(#stemGrad_${flowerType}_${isRightSide})`} strokeWidth="3.4" fill="none" strokeLinecap="round" />
            {/* Rose Leaves */}
            <path d="M 48 76 C 30 68 20 76 16 86 C 28 90 44 86 52 80 Z" fill={`url(#leafGrad_${flowerType}_${isRightSide})`} />
            <path d="M 92 84 C 112 78 124 84 130 94 C 116 96 102 92 90 86 Z" fill={`url(#leafGrad_${flowerType}_${isRightSide})`} />

            {/* Main Champagne Rose */}
            <g transform="translate(55, 48) scale(0.95)">
              <circle cx="0" cy="0" r="24" fill={`url(#roseChampagne_${isRightSide})`} />
              <path d="M -16 -8 C -18 -20 4 -22 14 -14 C 22 -4 18 12 8 18 C -6 20 -14 8 -16 -8 Z" fill="#fed7aa" />
              <path d="M -10 -10 C 0 -18 12 -12 10 0 C 8 8 -2 10 -6 6 C -10 2 -10 -4 -10 -10 Z" fill="#fff7ed" />
              <path d="M -4 -6 C 2 -10 8 -4 6 2 C 4 6 0 6 -2 4 Z" fill="#ffedd5" />
            </g>

            {/* Secondary Champagne Rose */}
            <g transform="translate(100, 58) scale(0.82)">
              <circle cx="0" cy="0" r="22" fill={`url(#roseChampagne_${isRightSide})`} />
              <path d="M -14 -6 C -16 -18 2 -18 10 -10 C 16 -2 14 10 6 14 C -4 16 -12 6 -14 -6 Z" fill="#fed7aa" />
              <path d="M -6 -8 C 0 -14 8 -8 8 0 C 6 6 0 6 -4 4 Z" fill="#fff7ed" />
            </g>
          </g>
        )}

        {/* 2. Modern Fluted/Faceted White Ceramic Vase (Common to all) */}
        <g id="facetedPorcelainVaseBase">
          <ellipse cx="75" cy="193" rx="19" ry="4" fill="#b5ad9f" opacity="0.6" />

          {/* Left Facet */}
          <path
            d="M 57 117 
               C 51 123, 46 135, 44 151 
               C 42 169, 51 189, 58 193 
               L 66 193 
               C 61 189, 55 169, 56 151 
               C 57 135, 62 123, 65 117 
               Z"
            fill={`url(#vaseLeftFacet_${flowerType}_${isRightSide})`}
            stroke="#cfc7bc"
            strokeWidth="0.8"
          />

          {/* Center-Left Facet */}
          <path
            d="M 65 117 
               C 62 123, 57 135, 56 151 
               C 55 169, 61 189, 66 193 
               L 75 193 
               C 73 189, 71 169, 72 151 
               C 72 135, 74 123, 75 117 
               Z"
            fill={`url(#vaseCenterFacet_${flowerType}_${isRightSide})`}
            stroke="#cfc7bc"
            strokeWidth="0.8"
          />

          {/* Center-Right Facet */}
          <path
            d="M 75 117 
               C 74 123, 72 135, 72 151 
               C 71 169, 73 189, 75 193 
               L 84 193 
               C 89 189, 93 169, 92 151 
               C 91 135, 87 123, 84 117 
               Z"
            fill={`url(#vaseCenterFacet_${flowerType}_${isRightSide})`}
            stroke="#cfc7bc"
            strokeWidth="0.8"
          />

          {/* Right Facet */}
          <path
            d="M 84 117 
               C 87 123, 91 135, 92 151 
               C 93 169, 89 189, 84 193 
               L 92 193 
               C 99 189, 106 169, 104 151 
               C 102 135, 97 123, 93 117 
               Z"
            fill={`url(#vaseRightFacet_${flowerType}_${isRightSide})`}
            stroke="#cfc7bc"
            strokeWidth="0.8"
          />

          {/* Ridge Highlights */}
          <path d="M 65 117 C 62 123, 57 135, 56 151 C 55 169, 61 189, 66 193" stroke="#ffffff" strokeWidth="1.2" fill="none" opacity="0.9" />
          <path d="M 75 117 C 74 123, 72 135, 72 151 C 71 169, 73 189, 75 193" stroke="#ffffff" strokeWidth="1.6" fill="none" opacity="0.95" />
          <path d="M 84 117 C 87 123, 91 135, 92 151 C 93 169, 89 189, 84 193" stroke="#e0d7cb" strokeWidth="1.2" fill="none" opacity="0.8" />

          {/* Rim */}
          <ellipse cx="75" cy="117" rx="19" ry="4.8" fill="#f6f1e8" stroke="#cfc7bc" strokeWidth="1" />
          <ellipse cx="75" cy="117" rx="15" ry="3.2" fill="#2d2822" opacity="0.38" />
        </g>
      </svg>
    </div>
  );
};
