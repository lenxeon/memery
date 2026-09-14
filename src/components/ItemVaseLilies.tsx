import React from 'react';

interface ItemVaseLiliesProps {
  scale?: number;
  className?: string;
}

export const ItemVaseLilies: React.FC<ItemVaseLiliesProps> = ({
  scale = 1,
  className = '',
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
          <linearGradient id="lilyVaseLeftFacet" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ded9d1" />
            <stop offset="100%" stopColor="#f5f0e8" />
          </linearGradient>

          <linearGradient id="lilyVaseCenterFacet" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f7f2ea" />
            <stop offset="40%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f0e9df" />
          </linearGradient>

          <linearGradient id="lilyVaseRightFacet" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e5ded4" />
            <stop offset="100%" stopColor="#c5bcb0" />
          </linearGradient>

          {/* White Lily Petals */}
          <linearGradient id="whiteLilyPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="65%" stopColor="#faf9f4" />
            <stop offset="85%" stopColor="#eef1df" />
            <stop offset="100%" stopColor="#c6d6a5" />
          </linearGradient>

          <linearGradient id="lilyThroatGreen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e1eeb5" />
            <stop offset="100%" stopColor="#9cb862" />
          </linearGradient>

          <linearGradient id="lilyStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#58713d" />
            <stop offset="60%" stopColor="#7a9756" />
            <stop offset="100%" stopColor="#43582d" />
          </linearGradient>

          <linearGradient id="lilyLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#79984e" />
            <stop offset="60%" stopColor="#557037" />
            <stop offset="100%" stopColor="#354921" />
          </linearGradient>
        </defs>

        {/* 1. Stems & Slender Lily Leaves */}
        <g id="lilyStems">
          <path d="M 76 128 Q 78 95 64 48" stroke="url(#lilyStemGrad)" strokeWidth="3.4" fill="none" strokeLinecap="round" />
          <path d="M 78 128 Q 86 85 102 45" stroke="url(#lilyStemGrad)" strokeWidth="3.6" fill="none" strokeLinecap="round" />
          <path d="M 74 128 Q 66 80 52 65" stroke="url(#lilyStemGrad)" strokeWidth="3.0" fill="none" strokeLinecap="round" />

          {/* Lanceolate Lily Leaves */}
          <path d="M 64 88 C 42 76 24 88 18 98 C 30 102 52 96 64 90 Z" fill="url(#lilyLeafGrad)" />
          <path d="M 90 84 C 112 74 132 82 140 92 C 126 96 106 92 90 86 Z" fill="url(#lilyLeafGrad)" />
          <path d="M 84 52 C 102 38 120 42 126 50 C 112 55 98 54 84 53 Z" fill="url(#lilyLeafGrad)" />
          <path d="M 58 64 C 40 50 26 55 22 62 C 34 66 48 64 58 63 Z" fill="url(#lilyLeafGrad)" />
        </g>

        {/* 2. Main White Lily (Top Right) */}
        <g transform="translate(94, 52) scale(0.98)">
          {/* Star-shaped white petals */}
          <path d="M 0 0 C 16 -38 34 -32 40 -18 C 28 -4 15 6 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke="#ded9c7" strokeWidth="0.8" />
          <path d="M 0 0 C 6 -42 -14 -44 -24 -30 C -16 -14 -6 -2 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke="#ded9c7" strokeWidth="0.8" />
          <path d="M 0 0 C -38 -22 -44 -6 -34 10 C -20 10 -6 3 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke="#ded9c7" strokeWidth="0.8" />
          
          <path d="M 0 0 C -28 16 -20 38 -2 42 C 6 26 3 11 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke="#ded9c7" strokeWidth="0.8" />
          <path d="M 0 0 C 24 20 36 34 42 22 C 28 11 14 3 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke="#ded9c7" strokeWidth="0.8" />
          <path d="M 0 0 C 30 -12 44 4 38 16 C 24 11 11 6 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke="#ded9c7" strokeWidth="0.8" />

          {/* Chartreuse center throat */}
          <circle cx="0" cy="0" r="9" fill="url(#lilyThroatGreen)" opacity="0.9" />

          {/* Golden Pollen Stamens */}
          <path d="M 0 0 Q 9 -14 18 -16" stroke="#8da84b" strokeWidth="1.6" fill="none" />
          <ellipse cx="18" cy="-16" rx="4" ry="1.6" fill="#d97706" transform="rotate(-30 18 -16)" />

          <path d="M 0 0 Q -6 -16 -12 -20" stroke="#8da84b" strokeWidth="1.6" fill="none" />
          <ellipse cx="-12" cy="-20" rx="4" ry="1.6" fill="#f59e0b" transform="rotate(40 -12 -20)" />

          <path d="M 0 0 Q 14 2 20 6" stroke="#8da84b" strokeWidth="1.6" fill="none" />
          <ellipse cx="20" cy="6" rx="4" ry="1.6" fill="#d97706" transform="rotate(20 20 6)" />

          <path d="M 0 0 Q -10 12 -14 16" stroke="#8da84b" strokeWidth="1.6" fill="none" />
          <ellipse cx="-14" cy="16" rx="4" ry="1.6" fill="#f59e0b" transform="rotate(-40 -14 16)" />
        </g>

        {/* 3. Secondary White Lily (Left lower) */}
        <g transform="translate(52, 68) scale(0.86)">
          <path d="M 0 0 C -14 -32 2 -40 14 -30 C 9 -16 3 -2 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke="#ded9c7" strokeWidth="0.8" />
          <path d="M 0 0 C -32 -16 -38 2 -28 16 C -14 11 -2 3 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke="#ded9c7" strokeWidth="0.8" />
          <path d="M 0 0 C -16 26 6 34 20 26 C 13 16 6 5 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke="#ded9c7" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="8" fill="url(#lilyThroatGreen)" opacity="0.9" />
          <path d="M 0 0 Q 6 -12 12 -14" stroke="#8da84b" strokeWidth="1.3" fill="none" />
          <ellipse cx="12" cy="-14" rx="3.5" ry="1.4" fill="#d97706" />
        </g>

        {/* 4. Modern Fluted/Faceted White Ceramic Vase */}
        <g id="facetedPorcelainVaseL">
          <ellipse cx="76" cy="194" rx="19" ry="4" fill="#b5ad9f" opacity="0.6" />

          {/* Left Facet */}
          <path
            d="M 58 118 
               C 52 124, 47 136, 45 152 
               C 43 170, 52 190, 59 194 
               L 67 194 
               C 62 190, 56 170, 57 152 
               C 58 136, 63 124, 66 118 
               Z"
            fill="url(#lilyVaseLeftFacet)"
            stroke="#cfc7bc"
            strokeWidth="0.8"
          />

          {/* Center-Left Facet */}
          <path
            d="M 66 118 
               C 63 124, 58 136, 57 152 
               C 56 170, 62 190, 67 194 
               L 76 194 
               C 74 190, 72 170, 73 152 
               C 73 136, 75 124, 76 118 
               Z"
            fill="url(#lilyVaseCenterFacet)"
            stroke="#cfc7bc"
            strokeWidth="0.8"
          />

          {/* Center-Right Facet (Brightest Highlight) */}
          <path
            d="M 76 118 
               C 75 124, 73 136, 73 152 
               C 72 170, 74 190, 76 194 
               L 85 194 
               C 90 190, 94 170, 93 152 
               C 92 136, 88 124, 85 118 
               Z"
            fill="url(#lilyVaseCenterFacet)"
            stroke="#cfc7bc"
            strokeWidth="0.8"
          />

          {/* Right Facet */}
          <path
            d="M 85 118 
               C 88 124, 92 136, 93 152 
               C 94 170, 90 190, 85 194 
               L 93 194 
               C 100 190, 107 170, 105 152 
               C 103 136, 98 124, 94 118 
               Z"
            fill="url(#lilyVaseRightFacet)"
            stroke="#cfc7bc"
            strokeWidth="0.8"
          />

          {/* Fluted Facet Ridge Highlights */}
          <path d="M 66 118 C 63 124, 58 136, 57 152 C 56 170, 62 190, 67 194" stroke="#ffffff" strokeWidth="1.2" fill="none" opacity="0.9" />
          <path d="M 76 118 C 75 124, 73 136, 73 152 C 72 170, 74 190, 76 194" stroke="#ffffff" strokeWidth="1.6" fill="none" opacity="0.95" />
          <path d="M 85 118 C 88 124, 92 136, 93 152 C 94 170, 90 190, 85 194" stroke="#e0d7cb" strokeWidth="1.2" fill="none" opacity="0.8" />

          {/* Rim */}
          <ellipse cx="76" cy="118" rx="19" ry="4.8" fill="#f6f1e8" stroke="#cfc7bc" strokeWidth="1" />
          <ellipse cx="76" cy="118" rx="15" ry="3.2" fill="#2d2822" opacity="0.38" />
        </g>
      </svg>
    </div>
  );
};
