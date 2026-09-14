import React from 'react';

interface ItemVasePeoniesProps {
  scale?: number;
  className?: string;
}

export const ItemVasePeonies: React.FC<ItemVasePeoniesProps> = ({
  scale = 1,
  className = '',
}) => {
  return (
    <div 
      className={`relative select-none pointer-events-none ${className}`}
      style={{
        width: 148 * scale,
        height: 200 * scale,
      }}
    >
      <svg 
        viewBox="0 0 148 200" 
        className="w-full h-full filter drop-shadow-lg"
      >
        <defs>
          {/* Porcelain Fluted Facets Gradients */}
          <linearGradient id="peonyVaseLeftFacet" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d9d4cc" />
            <stop offset="100%" stopColor="#f3ede5" />
          </linearGradient>

          <linearGradient id="peonyVaseCenterFacet" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f7f2ea" />
            <stop offset="40%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f0e9df" />
          </linearGradient>

          <linearGradient id="peonyVaseRightFacet" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e5ded4" />
            <stop offset="100%" stopColor="#c8bfb3" />
          </linearGradient>

          {/* Peony Flower Petals Gradients */}
          <radialGradient id="pinkPeonyDeep" cx="45%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#ffedf3" />
            <stop offset="40%" stopColor="#f8a7be" />
            <stop offset="85%" stopColor="#e76b8d" />
            <stop offset="100%" stopColor="#b8385d" />
          </radialGradient>

          <radialGradient id="pinkPeonySoft" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fff6f8" />
            <stop offset="50%" stopColor="#fbc2d2" />
            <stop offset="85%" stopColor="#f486a4" />
            <stop offset="100%" stopColor="#cb4b72" />
          </radialGradient>

          <linearGradient id="peonyStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#556e3b" />
            <stop offset="60%" stopColor="#7a9757" />
            <stop offset="100%" stopColor="#44592e" />
          </linearGradient>

          <linearGradient id="peonyLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8da868" />
            <stop offset="60%" stopColor="#58733a" />
            <stop offset="100%" stopColor="#354822" />
          </linearGradient>
        </defs>

        {/* 1. Stems & Lush Foliage */}
        <g id="peonyStems">
          <path d="M 72 125 Q 70 85 54 48" stroke="url(#peonyStemGrad)" strokeWidth="3.6" fill="none" strokeLinecap="round" />
          <path d="M 76 125 Q 82 82 102 62" stroke="url(#peonyStemGrad)" strokeWidth="3.4" fill="none" strokeLinecap="round" />
          <path d="M 74 125 Q 74 65 68 34" stroke="url(#peonyStemGrad)" strokeWidth="3.2" fill="none" strokeLinecap="round" />

          {/* Serrated Peony Leaves */}
          <path d="M 52 78 C 30 68 14 76 8 86 C 22 92 42 90 54 81 Z" fill="url(#peonyLeafGrad)" />
          <path d="M 90 88 C 112 80 130 86 138 96 C 122 102 104 98 90 90 Z" fill="url(#peonyLeafGrad)" />
          <path d="M 42 46 C 24 34 12 42 8 52 C 20 58 36 54 44 48 Z" fill="url(#peonyLeafGrad)" />
          <path d="M 94 58 C 114 48 128 54 134 64 C 120 70 106 66 94 60 Z" fill="url(#peonyLeafGrad)" />
          <path d="M 64 36 C 50 24 38 28 34 36 C 46 42 58 38 66 35 Z" fill="url(#peonyLeafGrad)" />
        </g>

        {/* 2. Main Double Peony Blossom (Left / Top) */}
        <g transform="translate(54, 42) scale(0.98)">
          {/* Outer Petals Ring */}
          <circle cx="0" cy="0" r="28" fill="url(#pinkPeonyDeep)" opacity="0.95" />
          <path d="M -22 -10 C -26 -26 2 -32 16 -22 C 28 -8 24 16 10 24 C -8 28 -18 12 -22 -10 Z" fill="url(#pinkPeonySoft)" />
          <path d="M -16 -18 C -4 -26 18 -20 20 -8 C 22 8 6 20 -6 18 C -18 14 -20 -2 -16 -18 Z" fill="url(#pinkPeonyDeep)" />
          
          {/* Mid Layer Ruffles */}
          <path d="M -12 -12 C 0 -20 15 -14 14 -2 C 12 10 0 14 -8 10 C -16 6 -16 -4 -12 -12 Z" fill="url(#pinkPeonySoft)" />
          <path d="M -8 -8 C 4 -16 14 -8 12 2 C 10 8 -2 10 -6 6 C -10 2 -10 -4 -8 -8 Z" fill="#ffe7f0" />
          
          {/* Petal Highlights & Yellow Pistils */}
          <path d="M -4 -6 C 2 -10 8 -6 6 -1 C 4 3 -2 4 -4 1 Z" fill="#ffffff" opacity="0.9" />
          <circle cx="-1" cy="-2" r="2.8" fill="#fcd34d" opacity="0.9" />
          <circle cx="3" cy="1" r="2.4" fill="#f59e0b" opacity="0.95" />
        </g>

        {/* 3. Secondary Peony Blossom (Right) */}
        <g transform="translate(94, 62) scale(0.92)">
          <circle cx="0" cy="0" r="26" fill="url(#pinkPeonyDeep)" />
          <path d="M -18 -8 C -22 -22 2 -26 12 -18 C 22 -6 20 12 8 20 C -6 24 -14 10 -18 -8 Z" fill="url(#pinkPeonySoft)" />
          <path d="M -12 -14 C 0 -22 14 -16 16 -6 C 18 8 5 16 -5 14 C -15 10 -15 -2 -12 -14 Z" fill="#ffe2ed" />
          <path d="M -6 -10 C 2 -16 12 -8 10 2 C 8 8 -2 10 -6 6 Z" fill="#fff1f6" />
          <circle cx="1" cy="-1" r="2.5" fill="#fcd34d" />
        </g>

        {/* 4. Small Opening Bud (Left lower) */}
        <g transform="translate(24, 75) scale(0.68)">
          <path d="M 0 0 C -12 -14 2 -26 14 -16 C 20 -6 12 10 0 0 Z" fill="url(#pinkPeonyDeep)" />
          <path d="M -5 -3 C -1 -12 10 -10 7 -2 Z" fill="#fff5f9" />
          <path d="M 0 0 C -5 8 -2 15 2 17 C 6 12 7 5 0 0 Z" fill="url(#peonyLeafGrad)" />
        </g>

        {/* 5. Modern Fluted/Faceted White Ceramic Vase (As in reference image) */}
        <g id="facetedPorcelainVase">
          {/* Vase Foot Base */}
          <ellipse cx="74" cy="192" rx="19" ry="4" fill="#b5ad9f" opacity="0.6" />

          {/* Main Vase Silhouette Body with vertical faceted flutes */}
          {/* Left Facet */}
          <path
            d="M 56 116 
               C 50 122, 45 134, 43 150 
               C 41 168, 50 188, 57 192 
               L 65 192 
               C 60 188, 54 168, 55 150 
               C 56 134, 61 122, 64 116 
               Z"
            fill="url(#peonyVaseLeftFacet)"
            stroke="#cfc7bc"
            strokeWidth="0.8"
          />

          {/* Center-Left Facet */}
          <path
            d="M 64 116 
               C 61 122, 56 134, 55 150 
               C 54 168, 60 188, 65 192 
               L 74 192 
               C 72 188, 70 168, 71 150 
               C 71 134, 73 122, 74 116 
               Z"
            fill="url(#peonyVaseCenterFacet)"
            stroke="#cfc7bc"
            strokeWidth="0.8"
          />

          {/* Center-Right Facet (Brightest Highlight) */}
          <path
            d="M 74 116 
               C 73 122, 71 134, 71 150 
               C 70 168, 72 188, 74 192 
               L 83 192 
               C 88 188, 92 168, 91 150 
               C 90 134, 86 122, 83 116 
               Z"
            fill="url(#peonyVaseCenterFacet)"
            stroke="#cfc7bc"
            strokeWidth="0.8"
          />

          {/* Right Facet */}
          <path
            d="M 83 116 
               C 86 122, 90 134, 91 150 
               C 92 168, 88 188, 83 192 
               L 91 192 
               C 98 188, 105 168, 103 150 
               C 101 134, 96 122, 92 116 
               Z"
            fill="url(#peonyVaseRightFacet)"
            stroke="#cfc7bc"
            strokeWidth="0.8"
          />

          {/* Fluted Facet Crisp Highlight Ridge Lines */}
          <path d="M 64 116 C 61 122, 56 134, 55 150 C 54 168, 60 188, 65 192" stroke="#ffffff" strokeWidth="1.2" fill="none" opacity="0.9" />
          <path d="M 74 116 C 73 122, 71 134, 71 150 C 70 168, 72 188, 74 192" stroke="#ffffff" strokeWidth="1.6" fill="none" opacity="0.95" />
          <path d="M 83 116 C 86 122, 90 134, 91 150 C 92 168, 88 188, 83 192" stroke="#e0d7cb" strokeWidth="1.2" fill="none" opacity="0.8" />

          {/* Vase Rim opening */}
          <ellipse cx="74" cy="116" rx="19" ry="4.8" fill="#f6f1e8" stroke="#cfc7bc" strokeWidth="1" />
          <ellipse cx="74" cy="116" rx="15" ry="3.2" fill="#2d2822" opacity="0.38" />
        </g>
      </svg>
    </div>
  );
};
