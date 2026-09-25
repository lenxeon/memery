/**
 * @file PropSvgTemplates.ts
 * @description 供品道具的高精 SVG 矢量模版，保持极致写实与精美色彩渐变，
 * 用于离屏超采样生成 PixiJS 超清 GPU 纹理。
 */
import { FlowerType, FruitType } from '../../types';

export function getPorcelainVaseDefs(): string {
  return `
    <linearGradient id="porcelainVaseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#cfc8bb" />
      <stop offset="18%" stop-color="#ebe4d6" />
      <stop offset="42%" stop-color="#ffffff" />
      <stop offset="68%" stop-color="#f7f2e8" />
      <stop offset="88%" stop-color="#dfd7c8" />
      <stop offset="100%" stop-color="#b5ada0" />
    </linearGradient>
    <linearGradient id="porcelainNeckGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c5beb0" />
      <stop offset="25%" stop-color="#f2ebe0" />
      <stop offset="55%" stop-color="#ffffff" />
      <stop offset="85%" stop-color="#ded6c6" />
      <stop offset="100%" stop-color="#b0a89a" />
    </linearGradient>
    <linearGradient id="porcelainNeckRim" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#a39a88" />
      <stop offset="50%" stop-color="#ded5c4" />
      <stop offset="100%" stop-color="#8c8270" />
    </linearGradient>
  `;
}

export function getVaseBodySvg(): string {
  return `
    <!-- 花瓶主体 -->
    <g id="vasePorcelainBody">
      <!-- 瓶颈与收腰 -->
      <path d="M 64 124 Q 63 138 52 150 Q 42 162 48 182 Q 52 192 75 192 Q 98 192 102 182 Q 108 162 98 150 Q 87 138 86 124 Z"
            fill="url(#porcelainVaseGrad)" stroke="#b5aca0" stroke-width="1" />
      <!-- 瓶颈上段 -->
      <path d="M 64 124 L 62 118 Q 75 119 88 118 L 86 124 Z"
            fill="url(#porcelainNeckGrad)" stroke="#beb5a8" stroke-width="0.8" />
      <!-- 瓶口外撇金边与开口 -->
      <ellipse cx="75" cy="118" rx="14" ry="4" fill="url(#porcelainNeckRim)" stroke="#877d6c" stroke-width="0.8" />
      <ellipse cx="75" cy="118" rx="11" ry="2.6" fill="#302820" />
      <!-- 瓷身左侧微光弧线 -->
      <path d="M 68 126 Q 58 144 54 165 Q 52 178 60 188" stroke="#ffffff" stroke-width="1.8" fill="none" opacity="0.65" stroke-linecap="round" />
    </g>
  `;
}

export function getPeoniesFloraSvg(): string {
  return `
    <defs>
      <radialGradient id="peonyDeepGrad" cx="45%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#f472b6" />
        <stop offset="40%" stop-color="#ec4899" />
        <stop offset="85%" stop-color="#db2777" />
        <stop offset="100%" stop-color="#9d174d" />
      </radialGradient>
      <radialGradient id="peonySoftGrad" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#fbcfe8" />
        <stop offset="50%" stop-color="#f472b6" />
        <stop offset="85%" stop-color="#ec4899" />
        <stop offset="100%" stop-color="#be185d" />
      </radialGradient>
      <linearGradient id="peonyStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#4ade80" />
        <stop offset="50%" stop-color="#16a34a" />
        <stop offset="100%" stop-color="#14532d" />
      </linearGradient>
      <linearGradient id="peonyLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#22c55e" />
        <stop offset="60%" stop-color="#15803d" />
        <stop offset="100%" stop-color="#14532d" />
      </linearGradient>
    </defs>
    <!-- 枝干 -->
    <g>
      <path d="M 74 125 Q 68 85 54 48" stroke="url(#peonyStemGrad)" stroke-width="3.6" fill="none" stroke-linecap="round" />
      <path d="M 76 125 Q 86 85 96 58" stroke="url(#peonyStemGrad)" stroke-width="3.4" fill="none" stroke-linecap="round" />
      <path d="M 75 125 Q 75 65 76 28" stroke="url(#peonyStemGrad)" stroke-width="3.2" fill="none" stroke-linecap="round" />
      <path d="M 73 125 Q 56 86 36 54" stroke="url(#peonyStemGrad)" stroke-width="2.8" fill="none" stroke-linecap="round" />
      <path d="M 77 125 Q 96 78 114 44" stroke="url(#peonyStemGrad)" stroke-width="2.8" fill="none" stroke-linecap="round" />
    </g>
    <!-- 绿叶 -->
    <g>
      <path d="M 52 78 C 30 68 14 76 8 86 C 22 92 42 90 54 81 Z" fill="url(#peonyLeafGrad)" />
      <path d="M 90 88 C 112 80 130 86 138 96 C 122 102 104 98 90 90 Z" fill="url(#peonyLeafGrad)" />
      <path d="M 42 46 C 24 34 12 42 8 52 C 20 58 36 54 44 48 Z" fill="url(#peonyLeafGrad)" />
      <path d="M 94 58 C 114 48 128 54 134 64 C 120 70 106 66 94 60 Z" fill="url(#peonyLeafGrad)" />
    </g>
    <!-- 牡丹花簇 -->
    <g>
      <!-- 主花 -->
      <g transform="translate(54, 48) scale(0.95)">
        <circle cx="0" cy="0" r="28" fill="url(#peonyDeepGrad)" opacity="0.95" />
        <path d="M -22 -10 C -26 -26 2 -32 16 -22 C 28 -8 24 16 10 24 C -8 28 -18 12 -22 -10 Z" fill="url(#peonySoftGrad)" />
        <path d="M -16 -18 C -4 -26 18 -20 20 -8 C 22 8 6 20 -6 18 C -18 14 -20 -2 -16 -18 Z" fill="url(#peonyDeepGrad)" />
        <path d="M -12 -12 C 0 -20 15 -14 14 -2 C 12 10 0 14 -8 10 C -16 6 -16 -4 -12 -12 Z" fill="url(#peonySoftGrad)" />
        <circle cx="-1" cy="-2" r="2.8" fill="#fcd34d" opacity="0.9" />
        <circle cx="3" cy="1" r="2.4" fill="#f59e0b" opacity="0.95" />
      </g>
      <!-- 顶冠牡丹 -->
      <g transform="translate(76, 28) scale(0.90)">
        <circle cx="0" cy="0" r="26" fill="url(#peonyDeepGrad)" />
        <path d="M -20 -10 C -24 -24 4 -28 16 -18 C 26 -6 22 14 8 22 C -6 26 -16 12 -20 -10 Z" fill="url(#peonySoftGrad)" />
        <path d="M -14 -14 C 0 -22 16 -16 16 -4 C 16 10 2 18 -8 14 C -18 10 -18 -2 -14 -14 Z" fill="#ffe2ed" />
        <circle cx="0" cy="-1" r="2.6" fill="#fcd34d" />
      </g>
      <!-- 右侧副花 -->
      <g transform="translate(96, 58) scale(0.88)">
        <circle cx="0" cy="0" r="25" fill="url(#peonyDeepGrad)" />
        <path d="M -18 -8 C -22 -22 2 -26 12 -18 C 22 -6 20 12 8 20 C -6 24 -14 10 -18 -8 Z" fill="url(#peonySoftGrad)" />
        <circle cx="1" cy="-1" r="2.5" fill="#fcd34d" />
      </g>
      <!-- 左下花 -->
      <g transform="translate(36, 54) scale(0.75)">
        <circle cx="0" cy="0" r="20" fill="url(#peonyDeepGrad)" />
        <path d="M -14 -6 C -18 -18 2 -20 10 -14 C 18 -4 16 10 6 16 C -6 18 -12 8 -14 -6 Z" fill="url(#peonySoftGrad)" />
        <circle cx="0" cy="0" r="2.0" fill="#fcd34d" />
      </g>
      <!-- 枝头幼蕾 -->
      <g transform="translate(114, 44) scale(0.68)">
        <ellipse cx="0" cy="0" rx="12" ry="16" fill="url(#peonyDeepGrad)" transform="rotate(25)" />
        <ellipse cx="-2" cy="-2" rx="8" ry="12" fill="url(#peonySoftGrad)" transform="rotate(25)" />
      </g>
    </g>
  `;
}

export function getLiliesFloraSvg(): string {
  return `
    <defs>
      <linearGradient id="whiteLilyPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="65%" stop-color="#faf9f4" />
        <stop offset="85%" stop-color="#eef1df" />
        <stop offset="100%" stop-color="#c6d6a5" />
      </linearGradient>
      <linearGradient id="lilyThroatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#e1eeb5" />
        <stop offset="100%" stop-color="#9cb862" />
      </linearGradient>
      <linearGradient id="lilyStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#4ade80" />
        <stop offset="50%" stop-color="#16a34a" />
        <stop offset="100%" stop-color="#14532d" />
      </linearGradient>
      <linearGradient id="lilyLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#22c55e" />
        <stop offset="60%" stop-color="#15803d" />
        <stop offset="100%" stop-color="#14532d" />
      </linearGradient>
    </defs>
    <!-- 枝干 -->
    <g>
      <path d="M 76 128 Q 86 85 98 52" stroke="url(#lilyStemGrad)" stroke-width="3.6" fill="none" stroke-linecap="round" />
      <path d="M 75 128 Q 62 88 52 68" stroke="url(#lilyStemGrad)" stroke-width="3.4" fill="none" stroke-linecap="round" />
      <path d="M 75 128 Q 74 65 75 26" stroke="url(#lilyStemGrad)" stroke-width="3.2" fill="none" stroke-linecap="round" />
      <path d="M 74 128 Q 54 88 34 54" stroke="url(#lilyStemGrad)" stroke-width="2.8" fill="none" stroke-linecap="round" />
      <path d="M 78 128 Q 98 76 116 36" stroke="url(#lilyStemGrad)" stroke-width="2.8" fill="none" stroke-linecap="round" />
    </g>
    <!-- 细长叶片 -->
    <g>
      <path d="M 68 95 C 44 86 26 95 16 110 C 32 112 56 108 70 98 Z" fill="url(#lilyLeafGrad)" />
      <path d="M 82 92 C 104 84 126 92 136 106 C 120 110 98 104 80 95 Z" fill="url(#lilyLeafGrad)" />
    </g>
    <!-- 百合花簇 -->
    <g>
      <!-- 主花 -->
      <g transform="translate(75, 26) scale(0.92)">
        <path d="M 0 0 C -25 -25 -25 -55 0 -70 C 25 -55 25 -25 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke="#d9dfca" stroke-width="0.8" />
        <path d="M 0 0 C -45 -10 -65 -30 -60 -50 C -40 -45 -20 -25 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke="#d9dfca" stroke-width="0.8" />
        <path d="M 0 0 C 45 -10 65 -30 60 -50 C 40 -45 20 -25 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke="#d9dfca" stroke-width="0.8" />
        <ellipse cx="0" cy="-22" rx="10" ry="14" fill="url(#lilyThroatGrad)" opacity="0.8" />
        <!-- 花蕊 -->
        <line x1="0" y1="-5" x2="-8" y2="-38" stroke="#859942" stroke-width="1.5" />
        <ellipse cx="-8" cy="-38" rx="2.5" ry="4.5" fill="#ca8a04" transform="rotate(-15, -8, -38)" />
        <line x1="0" y1="-5" x2="8" y2="-38" stroke="#859942" stroke-width="1.5" />
        <ellipse cx="8" cy="-38" rx="2.5" ry="4.5" fill="#ca8a04" transform="rotate(15, 8, -38)" />
        <line x1="0" y1="-5" x2="0" y2="-44" stroke="#859942" stroke-width="1.5" />
        <ellipse cx="0" cy="-44" rx="2.5" ry="4.5" fill="#eab308" />
      </g>
      <!-- 左副花 -->
      <g transform="translate(52, 68) scale(0.78)">
        <path d="M 0 0 C -20 -20 -20 -44 0 -56 C 20 -44 20 -20 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke="#d9dfca" stroke-width="0.8" />
        <path d="M 0 0 C -36 -8 -50 -24 -46 -40 C -32 -36 -16 -20 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke="#d9dfca" stroke-width="0.8" />
        <ellipse cx="0" cy="-16" rx="8" ry="10" fill="url(#lilyThroatGrad)" opacity="0.75" />
      </g>
      <!-- 右副花 -->
      <g transform="translate(98, 52) scale(0.80)">
        <path d="M 0 0 C -20 -20 -20 -44 0 -56 C 20 -44 20 -20 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke="#d9dfca" stroke-width="0.8" />
        <path d="M 0 0 C 36 -8 50 -24 46 -40 C 32 -36 16 -20 0 0 Z" fill="url(#whiteLilyPetalGrad)" stroke="#d9dfca" stroke-width="0.8" />
        <ellipse cx="0" cy="-16" rx="8" ry="10" fill="url(#lilyThroatGrad)" opacity="0.75" />
      </g>
    </g>
  `;
}

export function getLotusFloraSvg(): string {
  return `
    <defs>
      <linearGradient id="lotusPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#fff1f2" />
        <stop offset="60%" stop-color="#fecdd3" />
        <stop offset="100%" stop-color="#f43f5e" />
      </linearGradient>
    </defs>
    <!-- 梗 -->
    <g>
      <path d="M 75 128 Q 74 65 75 32" stroke="#16a34a" stroke-width="3.4" fill="none" stroke-linecap="round" />
      <path d="M 74 128 Q 58 80 44 56" stroke="#16a34a" stroke-width="3.0" fill="none" stroke-linecap="round" />
      <path d="M 76 128 Q 94 75 108 48" stroke="#16a34a" stroke-width="2.8" fill="none" stroke-linecap="round" />
    </g>
    <!-- 莲花 -->
    <g>
      <g transform="translate(75, 32) scale(0.92)">
        <path d="M 0 0 C -22 -14 -28 -34 -14 -46 C -2 -34 0 -18 0 0 Z" fill="url(#lotusPetalGrad)" />
        <path d="M 0 0 C 22 -14 28 -34 14 -46 C 2 -34 0 -18 0 0 Z" fill="url(#lotusPetalGrad)" />
        <path d="M 0 0 C -12 -20 -14 -44 0 -52 C 14 -44 12 -20 0 0 Z" fill="url(#lotusPetalGrad)" />
        <circle cx="0" cy="-28" r="6" fill="#eab308" />
      </g>
      <g transform="translate(44, 56) scale(0.78)">
        <path d="M 0 0 C -16 -12 -18 -32 -6 -40 C 4 -28 2 -14 0 0 Z" fill="url(#lotusPetalGrad)" />
        <path d="M 0 0 C 12 -10 16 -30 4 -38 C -4 -26 -2 -12 0 0 Z" fill="url(#lotusPetalGrad)" />
      </g>
      <g transform="translate(108, 48) scale(0.68)">
        <ellipse cx="0" cy="-18" rx="8" ry="18" fill="url(#lotusPetalGrad)" transform="rotate(18, 0, -18)" />
      </g>
    </g>
  `;
}

export function getChrysanthemumFloraSvg(): string {
  return `
    <defs>
      <radialGradient id="chrysGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#fffbeb" />
        <stop offset="70%" stop-color="#fef08a" />
        <stop offset="100%" stop-color="#eab308" />
      </radialGradient>
      <linearGradient id="chrysStemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#84cc16" />
        <stop offset="100%" stop-color="#15803d" />
      </linearGradient>
    </defs>
    <!-- 枝干 -->
    <g>
      <path d="M 75 128 Q 72 70 75 35" stroke="url(#chrysStemGrad)" stroke-width="3.2" fill="none" stroke-linecap="round" />
      <path d="M 74 128 Q 58 80 48 58" stroke="url(#chrysStemGrad)" stroke-width="2.8" fill="none" stroke-linecap="round" />
      <path d="M 76 128 Q 92 78 102 54" stroke="url(#chrysStemGrad)" stroke-width="2.8" fill="none" stroke-linecap="round" />
    </g>
    <!-- 菊盛 -->
    <g>
      <!-- 主花 -->
      <g transform="translate(75, 35)">
        ${Array.from({ length: 16 })
          .map((_, i) => {
            const angle = (i * 360) / 16;
            return `<ellipse cx="0" cy="-16" rx="4" ry="16" fill="url(#chrysGrad)" transform="rotate(${angle})" />`;
          })
          .join('')}
        <circle cx="0" cy="0" r="8" fill="#ca8a04" />
      </g>
      <!-- 左花 -->
      <g transform="translate(48, 58) scale(0.75)">
        ${Array.from({ length: 12 })
          .map((_, i) => {
            const angle = (i * 360) / 12;
            return `<ellipse cx="0" cy="-14" rx="3.5" ry="14" fill="url(#chrysGrad)" transform="rotate(${angle})" />`;
          })
          .join('')}
        <circle cx="0" cy="0" r="6" fill="#ca8a04" />
      </g>
      <!-- 右花 -->
      <g transform="translate(102, 54) scale(0.72)">
        ${Array.from({ length: 12 })
          .map((_, i) => {
            const angle = (i * 360) / 12;
            return `<ellipse cx="0" cy="-14" rx="3.5" ry="14" fill="url(#chrysGrad)" transform="rotate(${angle})" />`;
          })
          .join('')}
        <circle cx="0" cy="0" r="6" fill="#ca8a04" />
      </g>
    </g>
  `;
}

export function getRosesFloraSvg(): string {
  return `
    <defs>
      <radialGradient id="roseGrad" cx="45%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#fecdd3" />
        <stop offset="45%" stop-color="#f43f5e" />
        <stop offset="85%" stop-color="#e11d48" />
        <stop offset="100%" stop-color="#9f1239" />
      </radialGradient>
      <linearGradient id="roseStemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#4ade80" />
        <stop offset="100%" stop-color="#14532d" />
      </linearGradient>
    </defs>
    <!-- 枝干 -->
    <g>
      <path d="M 75 128 Q 72 70 75 36" stroke="url(#roseStemGrad)" stroke-width="3.2" fill="none" stroke-linecap="round" />
      <path d="M 74 128 Q 56 82 46 60" stroke="url(#roseStemGrad)" stroke-width="2.8" fill="none" stroke-linecap="round" />
      <path d="M 76 128 Q 94 80 104 56" stroke="url(#roseStemGrad)" stroke-width="2.8" fill="none" stroke-linecap="round" />
    </g>
    <!-- 玫瑰朵 -->
    <g>
      <!-- 主花 -->
      <g transform="translate(75, 36) scale(0.95)">
        <circle cx="0" cy="0" r="22" fill="url(#roseGrad)" />
        <path d="M -16 -6 C -18 -18 6 -20 14 -12 C 20 -2 16 12 4 16 C -8 18 -14 8 -16 -6 Z" fill="#ffe4e6" opacity="0.8" />
        <path d="M -8 -8 C 0 -16 12 -12 10 -2 C 8 8 -2 10 -6 6 Z" fill="url(#roseGrad)" />
      </g>
      <!-- 左花 -->
      <g transform="translate(46, 60) scale(0.75)">
        <circle cx="0" cy="0" r="18" fill="url(#roseGrad)" />
        <path d="M -12 -4 C -14 -14 4 -16 10 -10 C 14 -2 12 8 2 12 C -6 14 -10 6 -12 -4 Z" fill="#ffe4e6" opacity="0.8" />
      </g>
      <!-- 右花 -->
      <g transform="translate(104, 56) scale(0.72)">
        <circle cx="0" cy="0" r="18" fill="url(#roseGrad)" />
        <path d="M -12 -4 C -14 -14 4 -16 10 -10 C 14 -2 12 8 2 12 C -6 14 -10 6 -12 -4 Z" fill="#ffe4e6" opacity="0.8" />
      </g>
    </g>
  `;
}

/**
 * 生成完整花瓶+鲜花的 SVG 文本 (150x200 逻辑视口)
 */
export function getVaseWithFlowerSvg(flowerType: FlowerType, isRight: boolean): string {
  let floraContent = '';
  switch (flowerType) {
    case 'peonies':
      floraContent = getPeoniesFloraSvg();
      break;
    case 'lilies':
      floraContent = getLiliesFloraSvg();
      break;
    case 'lotus':
      floraContent = getLotusFloraSvg();
      break;
    case 'chrysanthemum':
      floraContent = getChrysanthemumFloraSvg();
      break;
    case 'roses':
      floraContent = getRosesFloraSvg();
      break;
    default:
      floraContent = getPeoniesFloraSvg();
      break;
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 200" width="150" height="200">
      <defs>
        ${getPorcelainVaseDefs()}
      </defs>
      <!-- 底座投影 -->
      <ellipse cx="75" cy="193" rx="26" ry="6" fill="#140d07" opacity="0.4" />
      <!-- 花木上部 -->
      <g transform="${isRight ? 'translate(150, 0) scale(-1, 1)' : ''}">
        ${floraContent}
      </g>
      <!-- 花瓶本体 (瓶身盖在花梗下端，与真实插花完全一致) -->
      <g transform="${isRight ? 'translate(150, 0) scale(-1, 1)' : ''}">
        ${getVaseBodySvg()}
      </g>
    </svg>
  `;
}

/**
 * 经典素雅青瓷清香香炉 SVG (100x52 逻辑视口，100% 严丝合缝对标原版 CenserItem.tsx)
 */
export function getCenserSvg(isLit: boolean = true): string {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 52" width="100" height="52">
      <defs>
        <linearGradient id="censerGlazeG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#d2cdc3" />
          <stop offset="25%" stop-color="#f4efe6" />
          <stop offset="60%" stop-color="#ebe4d8" />
          <stop offset="85%" stop-color="#d6cec1" />
          <stop offset="100%" stop-color="#beb5a6" />
        </linearGradient>

        <linearGradient id="ashGradG" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#8c857b" />
          <stop offset="50%" stop-color="#c5beb3" />
          <stop offset="100%" stop-color="#dfd9ce" />
        </linearGradient>
      </defs>

      <!-- 案面接地柔和阴影 -->
      <ellipse cx="50" cy="50" rx="32" ry="3" fill="#2d2218" opacity="0.4" />

      <!-- 沉稳平整底足 -->
      <path d="M 36 46 L 38 49 L 62 49 L 64 46 Z" fill="#b0a89a" />

      <!-- 灰白青瓷圆润炉肚 -->
      <path
        d="M 22 14
           C 10 24, 12 42, 36 46
           L 64 46
           C 88 42, 90 24, 78 14
           Z"
        fill="url(#censerGlazeG)"
        stroke="#c4bcad"
        stroke-width="1"
      />

      <!-- 瓷身漫射月白微光 -->
      <ellipse cx="50" cy="28" rx="20" ry="7" fill="#ffffff" opacity="0.35" />

      <!-- 炉口外唇与香灰池 -->
      <ellipse cx="50" cy="14" rx="28" ry="7" fill="url(#censerGlazeG)" stroke="#c8c0b2" stroke-width="1" />
      <ellipse cx="50" cy="13.5" rx="24" ry="5.5" fill="url(#ashGradG)" />

      <!-- 香灰表面自然灰烬质感斑点 -->
      <circle cx="44" cy="13" r="1.5" fill="#595249" opacity="0.4" />
      <circle cx="56" cy="14" r="1.2" fill="#4d463d" opacity="0.5" />
      <circle cx="50" cy="12.5" r="2" fill="#ffffff" opacity="0.4" />
    </svg>
  `;
}

/**
 * 经典素白/暖白长明祈福蜡烛 SVG (完全对标原版 CandleItem.tsx)
 */
export function getCandleSvg(health: number = 1.0, isLit: boolean = true): string {
  const currentWaxFactor = Math.max(0.08, Math.min(1.0, health));
  const candleH = Math.round(22 + 76 * currentWaxFactor);

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 ${candleH}" width="42" height="${candleH}">
      <defs>
        <linearGradient id="waxGradC_${isLit ? 'lit' : 'dim'}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#d5cebd" />
          <stop offset="25%" stop-color="${isLit ? '#fff7e0' : '#f8f4ea'}" />
          <stop offset="65%" stop-color="${isLit ? '#f9edd0' : '#f0ebd8'}" />
          <stop offset="90%" stop-color="#ded5be" />
          <stop offset="100%" stop-color="#c7bda2" />
        </linearGradient>

        <linearGradient id="waxPoolGradC_${isLit ? 'lit' : 'dim'}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${isLit ? '#ffe699' : '#f4eee0'}" />
          <stop offset="100%" stop-color="${isLit ? '#ffd066' : '#ded6c1'}" />
        </linearGradient>
      </defs>

      <!-- 案面柔和接地阴影 -->
      <ellipse cx="21" cy="${candleH - 2}" rx="18" ry="3" fill="#20140c" opacity="0.35" />

      <!-- 柱状暖白蜡体 -->
      <path
        d="M 4 8 L 4 ${candleH - 5} C 4 ${candleH - 2}, 38 ${candleH - 2}, 38 ${candleH - 5} L 38 8 Z"
        fill="url(#waxGradC_${isLit ? 'lit' : 'dim'})"
        stroke="#c8beaa"
        stroke-width="0.8"
      />

      <!-- 自然流淌烛泪 -->
      ${candleH > 36 ? `
        <path
          d="M 12 8 C 12 ${Math.min(candleH - 12, 28)}, 14 ${Math.min(candleH - 8, 42)}, 16 ${Math.min(candleH - 6, 46)} C 18 ${Math.min(candleH - 8, 42)}, 17 ${Math.min(candleH - 12, 28)}, 17 8 Z"
          fill="${isLit ? '#fff5d6' : '#f7f2e4'}"
          opacity="0.9"
        />
      ` : ''}

      <!-- 顶部凹陷融蜡油池 -->
      <ellipse cx="21" cy="8" rx="17" ry="4.8" fill="url(#waxPoolGradC_${isLit ? 'lit' : 'dim'})" stroke="#c4ba9f" stroke-width="0.8" />
      <ellipse cx="21" cy="8" rx="14" ry="3.2" fill="${isLit ? '#ffbe3b' : '#c8bfa8'}" opacity="${isLit ? 0.7 : 0.4}" />

      <!-- 烛芯根部黑碳点与棉芯 -->
      <circle cx="21" cy="8" r="2.2" fill="#3a2f24" opacity="0.6" />
      <line x1="21" y1="8" x2="21" y2="1" stroke="#22180f" stroke-width="1.6" stroke-linecap="round" />
    </svg>
  `;
}

/**
 * 供果盘 SVG (104x86 逻辑视口)
 */
export function getFruitDishSvg(fruitType: FruitType): string {
  let fruitItems = '';
  if (fruitType === 'apples') {
    fruitItems = `
      <defs>
        <radialGradient id="appleGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#fca5a5" />
          <stop offset="25%" stop-color="#ef4444" />
          <stop offset="80%" stop-color="#b91c1c" />
          <stop offset="100%" stop-color="#7f1d1d" />
        </radialGradient>
      </defs>
      <!-- 底层 3 颗苹果 -->
      <circle cx="34" cy="50" r="14" fill="url(#appleGrad)" stroke="#7f1d1d" stroke-width="0.5" />
      <circle cx="70" cy="50" r="14" fill="url(#appleGrad)" stroke="#7f1d1d" stroke-width="0.5" />
      <circle cx="52" cy="52" r="14.5" fill="url(#appleGrad)" stroke="#7f1d1d" stroke-width="0.5" />
      <!-- 顶层 1 颗苹果 -->
      <circle cx="52" cy="32" r="15" fill="url(#appleGrad)" stroke="#7f1d1d" stroke-width="0.5" />
      <path d="M 52 18 Q 55 12 58 13" stroke="#451a03" stroke-width="2.2" fill="none" stroke-linecap="round" />
      <!-- 绿叶 -->
      <path d="M 53 17 C 62 13 65 19 66 18 C 64 22 58 20 53 17 Z" fill="#22c55e" />
    `;
  } else if (fruitType === 'oranges') {
    fruitItems = `
      <defs>
        <radialGradient id="orangeGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#fed7aa" />
          <stop offset="30%" stop-color="#fb923c" />
          <stop offset="85%" stop-color="#ea580c" />
          <stop offset="100%" stop-color="#9a3412" />
        </radialGradient>
      </defs>
      <circle cx="34" cy="51" r="13.5" fill="url(#orangeGrad)" />
      <circle cx="70" cy="51" r="13.5" fill="url(#orangeGrad)" />
      <circle cx="52" cy="53" r="14" fill="url(#orangeGrad)" />
      <circle cx="52" cy="34" r="14.5" fill="url(#orangeGrad)" />
      <circle cx="52" cy="22" r="2.2" fill="#15803d" />
    `;
  } else {
    // 仙桃
    fruitItems = `
      <defs>
        <radialGradient id="peachGrad" cx="40%" cy="40%" r="65%">
          <stop offset="0%" stop-color="#fef08a" />
          <stop offset="40%" stop-color="#fed7aa" />
          <stop offset="75%" stop-color="#f43f5e" />
          <stop offset="100%" stop-color="#be123c" />
        </radialGradient>
      </defs>
      <circle cx="36" cy="51" r="14" fill="url(#peachGrad)" />
      <circle cx="68" cy="51" r="14" fill="url(#peachGrad)" />
      <circle cx="52" cy="53" r="14.5" fill="url(#peachGrad)" />
      <!-- 顶峰大桃尖 -->
      <path d="M 52 18 C 36 32 38 48 52 48 C 66 48 68 32 52 18 Z" fill="url(#peachGrad)" />
      <path d="M 52 18 Q 50 14 47 13" stroke="#9f1239" stroke-width="1.8" fill="none" stroke-linecap="round" />
    `;
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104 86" width="104" height="86">
      <defs>
        <linearGradient id="porcelainDish" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#d8d3c8" />
          <stop offset="25%" stop-color="#faf6ee" />
          <stop offset="60%" stop-color="#ffffff" />
          <stop offset="85%" stop-color="#f0eae0" />
          <stop offset="100%" stop-color="#c8c0b2" />
        </linearGradient>
      </defs>
      <!-- 台面阴影 -->
      <ellipse cx="52" cy="80" rx="44" ry="5.5" fill="#120c06" opacity="0.35" />
      <!-- 高足底座 -->
      <path d="M 40 68 L 34 77 Q 52 79 70 77 L 64 68 Z" fill="#ded7cb" stroke="#b0a89a" stroke-width="0.8" />
      <ellipse cx="52" cy="77" rx="19" ry="3" fill="#c4bcad" stroke="#9e9585" stroke-width="0.8" />
      <!-- 白瓷浅盘底座与盘面 -->
      <ellipse cx="52" cy="62" rx="46" ry="12.5" fill="url(#porcelainDish)" stroke="#c2b9aa" stroke-width="1" />
      <ellipse cx="52" cy="60" rx="42" ry="9.5" fill="#fcf9f2" stroke="#d5ccbe" stroke-width="0.8" />
      <!-- 水果盛放于盘面之上 -->
      <g id="fruitGroup">
        ${fruitItems}
      </g>
      <!-- 浅盘前唇描金微光 -->
      <path d="M 12 62 Q 52 74 92 62" fill="none" stroke="#ffffff" stroke-width="1.6" opacity="0.85" />
    </svg>
  `;
}

/**
 * 敬茶三盅与紫檀描金茶托 SVG (108x48 逻辑视口，100% 严丝合缝对标原版 TeaCupsItem.tsx)
 */
export function getTeaCupsSvg(): string {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 48" width="108" height="48">
      <defs>
        <linearGradient id="rosewoodTrayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#2c1810" />
          <stop offset="25%" stop-color="#4a2818" />
          <stop offset="50%" stop-color="#5c3420" />
          <stop offset="75%" stop-color="#4a2818" />
          <stop offset="100%" stop-color="#2c1810" />
        </linearGradient>

        <linearGradient id="trayGoldInlay" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#d97706" />
          <stop offset="50%" stop-color="#fde047" />
          <stop offset="100%" stop-color="#d97706" />
        </linearGradient>

        <linearGradient id="teaCupPorcelain" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ded9d0" />
          <stop offset="30%" stop-color="#ffffff" />
          <stop offset="70%" stop-color="#ffffff" />
          <stop offset="100%" stop-color="#ded9d0" />
        </linearGradient>

        <radialGradient id="teaLiquidGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fef08a" />
          <stop offset="60%" stop-color="#d97706" />
          <stop offset="100%" stop-color="#78350f" />
        </radialGradient>
      </defs>

      <!-- 1. 紫檀雕花托盘 -->
      <ellipse cx="54" cy="42" rx="48" ry="4" fill="#2d1b11" opacity="0.35" />
      <path
        d="M 6 36 C 6 42, 102 42, 102 36 L 100 40 C 100 44, 8 44, 8 40 Z"
        fill="url(#rosewoodTrayGrad)"
        stroke="#3d2012"
        stroke-width="0.8"
      />
      <ellipse cx="54" cy="36" rx="48" ry="6" fill="url(#rosewoodTrayGrad)" stroke="#693b22" stroke-width="0.8" />
      <ellipse cx="54" cy="35.5" rx="45" ry="4.5" fill="none" stroke="url(#trayGoldInlay)" stroke-width="0.6" opacity="0.85" />

      <!-- 2. 三盏描金白瓷茶盅 (左 25, 中 54, 右 83) -->
      ${[25, 54, 83]
        .map(
          (cx) => `
        <g transform="translate(${cx}, 30)">
          <ellipse cx="0" cy="5" rx="7" ry="1.5" fill="#1e130c" opacity="0.3" />
          <ellipse cx="0" cy="4.5" rx="6.5" ry="1.4" fill="#cfc7ba" stroke="#b5aca0" stroke-width="0.5" />
          <path d="M -11 -7 C -11 0, -8 4.5, 0 4.5 C 8 4.5, 11 0, 11 -7 Z" fill="url(#teaCupPorcelain)" stroke="#cfc7ba" stroke-width="0.8" />
          <ellipse cx="0" cy="-7" rx="11" ry="3.2" fill="url(#teaCupPorcelain)" stroke="url(#trayGoldInlay)" stroke-width="0.8" />
          <ellipse cx="0" cy="-6.5" rx="9" ry="2.2" fill="url(#teaLiquidGrad)" />
          <ellipse cx="-2.5" cy="-7" rx="3.5" ry="0.8" fill="#ffffff" opacity="0.65" />
        </g>
      `
        )
        .join('')}
    </svg>
  `;
}

/**
 * 纯铜颂钵与紫檀木槌 SVG (82x68 逻辑视口，100% 严丝合缝对标原版 SingingBowlItem.tsx)
 */
export function getSingingBowlSvg(): string {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82 68" width="82" height="68">
      <defs>
        <radialGradient id="bronzeBowlGrad" cx="38%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#fffbeb" />
          <stop offset="25%" stop-color="#fde047" />
          <stop offset="55%" stop-color="#ca8a04" />
          <stop offset="85%" stop-color="#854d0e" />
          <stop offset="100%" stop-color="#451a03" />
        </radialGradient>
        <linearGradient id="bronzeRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ca8a04" />
          <stop offset="25%" stop-color="#fef08a" />
          <stop offset="50%" stop-color="#ffffff" />
          <stop offset="75%" stop-color="#fef08a" />
          <stop offset="100%" stop-color="#a16207" />
        </linearGradient>
        <linearGradient id="brocadeCushion" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#881337" />
          <stop offset="35%" stop-color="#e11d48" />
          <stop offset="70%" stop-color="#be123c" />
          <stop offset="100%" stop-color="#4c0519" />
        </linearGradient>
        <linearGradient id="strikerWood" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#451a03" />
          <stop offset="60%" stop-color="#78350f" />
          <stop offset="100%" stop-color="#290e03" />
        </linearGradient>
      </defs>

      <!-- 1. 丝缎锦圈环垫 -->
      <ellipse cx="40" cy="58" rx="28" ry="6.5" fill="#261208" opacity="0.3" />
      <path d="M 14 55 C 14 62, 66 62, 66 55 L 64 58 C 64 64, 16 64, 16 58 Z" fill="url(#brocadeCushion)" stroke="#4c0519" stroke-width="0.8" />
      <ellipse cx="40" cy="55" rx="26" ry="5" fill="url(#brocadeCushion)" stroke="#f43f5e" stroke-width="0.6" />
      <ellipse cx="40" cy="55" rx="23" ry="3.5" fill="none" stroke="#fcd34d" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.8" />

      <!-- 2. 古铜颂钵体 -->
      <path d="M 14 26 C 12 40, 22 52, 40 52 C 58 52, 68 40, 66 26 Z" fill="url(#bronzeBowlGrad)" stroke="#713f12" stroke-width="1" />
      <ellipse cx="28" cy="38" rx="7" ry="4" fill="#ffffff" opacity="0.18" transform="rotate(-15 28 38)" />
      <ellipse cx="50" cy="40" rx="9" ry="5" fill="#ffffff" opacity="0.15" transform="rotate(15 50 40)" />
      <ellipse cx="36" cy="45" rx="6" ry="3" fill="#ffffff" opacity="0.12" />
      <ellipse cx="40" cy="26" rx="26" ry="6.5" fill="url(#bronzeRimGrad)" stroke="#854d0e" stroke-width="0.9" />
      <ellipse cx="40" cy="25.5" rx="22.5" ry="5.2" fill="#381907" />
      <ellipse cx="40" cy="25.2" rx="19" ry="4" fill="#1f0c03" />

      <!-- 3. 紫檀小敲棰 -->
      <g transform="translate(62, 38) rotate(32)">
        <ellipse cx="0" cy="14" rx="3.5" ry="12" fill="#1b0e07" opacity="0.35" />
        <rect x="-2" y="-12" width="4" height="24" rx="2" fill="url(#strikerWood)" stroke="#260e02" stroke-width="0.5" />
        <rect x="-2.8" y="4" width="5.6" height="12" rx="2" fill="#d97706" stroke="#92400e" stroke-width="0.6" />
        <line x1="-2.8" y1="8" x2="2.8" y2="8" stroke="#78350f" stroke-width="0.6" />
        <line x1="-2.8" y1="12" x2="2.8" y2="12" stroke="#78350f" stroke-width="0.6" />
      </g>
    </svg>
  `;
}

/**
 * 供案上横放的一捧鲜花束 (130x72 逻辑视口，100% 对标原版 OfferedBouquet.tsx 造型与色彩)
 */
export function getSingleBouquetSvg(flowerType: FlowerType): string {
  const flowerColors: Record<FlowerType, { primary: string; secondary: string; center: string }> = {
    peonies: { primary: '#f472b6', secondary: '#fbcfe8', center: '#eab308' },
    lilies: { primary: '#ffffff', secondary: '#f1f5f9', center: '#bef264' },
    lotus: { primary: '#fb7185', secondary: '#ffe4e6', center: '#facc15' },
    chrysanthemum: { primary: '#facc15', secondary: '#fef08a', center: '#ca8a04' },
    roses: { primary: '#f43f5e', secondary: '#fecdd3', center: '#9f1239' },
    plum_blossoms: { primary: '#fb7185', secondary: '#ffe4e6', center: '#be123c' },
    sunflowers: { primary: '#eab308', secondary: '#fef08a', center: '#713f12' },
    carnations: { primary: '#f472b6', secondary: '#fce7f3', center: '#be185d' },
    calla_lilies: { primary: '#ffffff', secondary: '#f8fafc', center: '#eab308' },
    tulips: { primary: '#fb7185', secondary: '#fecdd3', center: '#e11d48' },
    narcissus: { primary: '#ffffff', secondary: '#fef08a', center: '#ca8a04' },
    lily_of_valley: { primary: '#ffffff', secondary: '#f8fafc', center: '#84cc16' },
    orchids: { primary: '#ec4899', secondary: '#fdf2f8', center: '#a21caf' },
    hydrangeas: { primary: '#60a5fa', secondary: '#dbeafe', center: '#3b82f6' },
    daisies: { primary: '#ffffff', secondary: '#f8fafc', center: '#eab308' },
    wintersweet: { primary: '#facc15', secondary: '#fde68a', center: '#9a3412' },
    magnolia: { primary: '#fff7ed', secondary: '#fbcfe8', center: '#d97706' },
    peach_blossoms: { primary: '#fb7185', secondary: '#fecdd3', center: '#fbbf24' },
    apricot_blossoms: { primary: '#fff7f5', secondary: '#f9a8b8', center: '#be123c' },
    pear_blossoms: { primary: '#ffffff', secondary: '#f1f5f9', center: '#4c1d2f' },
    crabapple_blossoms: { primary: '#fb7185', secondary: '#fce7f3', center: '#9f1239' },
    camellias: { primary: '#dc2626', secondary: '#fb7185', center: '#facc15' },
    azaleas: { primary: '#f43f5e', secondary: '#f9a8d4', center: '#fde047' },
    kerria: { primary: '#facc15', secondary: '#fef08a', center: '#d97706' },
    hibiscus_mutabilis: { primary: '#fb7185', secondary: '#ffe4e6', center: '#fbbf24' },
    irises: { primary: '#6366f1', secondary: '#a78bfa', center: '#facc15' },
    clivia: { primary: '#f97316', secondary: '#ef4444', center: '#fde047' },
    wisteria: { primary: '#8b5cf6', secondary: '#c4b5fd', center: '#fef3c7' },
    trumpet_creeper: { primary: '#f97316', secondary: '#dc2626', center: '#facc15' },
    morning_glories: { primary: '#3b82f6', secondary: '#c4b5fd', center: '#fff7ed' },
    honeysuckle: { primary: '#facc15', secondary: '#fffbea', center: '#d97706' },
    winter_jasmine: { primary: '#fde047', secondary: '#fef08a', center: '#d97706' },
    osmanthus: { primary: '#fbbf24', secondary: '#fde68a', center: '#b45309' },
    crape_myrtle: { primary: '#d946ef', secondary: '#f0abfc', center: '#fde047' },
    globe_amaranth: { primary: '#db2777', secondary: '#f9a8d4', center: '#fde68a' },
    gardenias: { primary: '#fffdf5', secondary: '#f1f5e8', center: '#d9f99d' },
    jasmine: { primary: '#ffffff', secondary: '#ecfccb', center: '#facc15' },
    balloon_flowers: { primary: '#6366f1', secondary: '#a5b4fc', center: '#fef3c7' },
    daylilies: { primary: '#f97316', secondary: '#fde047', center: '#9a3412' },
    hostas: { primary: '#ffffff', secondary: '#ddd6fe', center: '#fef3c7' },
    impatiens: { primary: '#ec4899', secondary: '#fb7185', center: '#facc15' },
    hollyhocks: { primary: '#e11d48', secondary: '#fb7185', center: '#fde047' },
    pomegranate_blossoms: { primary: '#ef4444', secondary: '#b91c1c', center: '#fbbf24' },
    chinese_hibiscus: { primary: '#ef4444', secondary: '#fb923c', center: '#fde047' },
    cockscomb: { primary: '#be123c', secondary: '#fb7185', center: '#f59e0b' },
    poppies: { primary: '#ef4444', secondary: '#fb923c', center: '#292524' },
    epiphyllum: { primary: '#ffffff', secondary: '#fef3c7', center: '#facc15' },
    spider_lilies: { primary: '#dc2626', secondary: '#ef4444', center: '#fbbf24' },
    redbuds: { primary: '#c026d3', secondary: '#f0abfc', center: '#fde047' },
  };

  const colors = flowerColors[flowerType] || flowerColors.peonies;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 72" width="130" height="72">
      <defs>
        <linearGradient id="bouquetShadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#140d07" stop-opacity="0.4" />
          <stop offset="100%" stop-color="#140d07" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#4d6232" />
          <stop offset="100%" stop-color="#283618" />
        </linearGradient>
        <linearGradient id="silkRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="50%" stop-color="#e2d4be" />
          <stop offset="100%" stop-color="#b5a48b" />
        </linearGradient>
      </defs>

      <!-- 接地阴影 -->
      <ellipse cx="65" cy="58" rx="52" ry="6" fill="url(#bouquetShadow)" />

      <!-- 1. 雅致宣纸/牛皮纸包装角 -->
      <path
        d="M 20 48 Q 50 36 108 42 Q 118 46 112 56 Q 70 58 18 54 Z"
        fill="rgba(255, 248, 235, 0.92)"
        stroke="rgba(215, 185, 145, 0.75)"
        stroke-width="0.8"
      />

      <!-- 束拢翠绿花茎 -->
      <path d="M 22 51 L 54 48" stroke="url(#stemGrad)" stroke-width="2.6" stroke-linecap="round" />
      <path d="M 18 49 L 52 46" stroke="url(#stemGrad)" stroke-width="2.2" stroke-linecap="round" />
      <path d="M 20 53 L 50 50" stroke="url(#stemGrad)" stroke-width="2.4" stroke-linecap="round" />

      <!-- 丝带系扣 -->
      <ellipse cx="38" cy="50" rx="4.5" ry="6" fill="url(#silkRibbon)" stroke="#8c7a65" stroke-width="0.5" />
      <path d="M 38 52 Q 32 60 26 62" stroke="#8c7a65" stroke-width="1.2" fill="none" />
      <path d="M 38 52 Q 42 61 46 63" stroke="#8c7a65" stroke-width="1.2" fill="none" />

      <!-- 2. 花朵衬底绿叶 -->
      <ellipse cx="68" cy="40" rx="18" ry="7" fill="#4d6c2d" transform="rotate(-15 68 40)" />
      <ellipse cx="94" cy="38" rx="16" ry="6" fill="#5c8236" transform="rotate(20 94 38)" />
      <ellipse cx="80" cy="48" rx="15" ry="5.5" fill="#3b5321" transform="rotate(5 80 48)" />

      <!-- 3. 花簇群组 (3 朵层叠盛开花朵) -->
      <g transform="translate(74, 34)">
        <!-- 副花 (左) -->
        <g transform="translate(-16, 4) scale(0.85)">
          <circle cx="0" cy="0" r="13" fill="${colors.primary}" opacity="0.9" />
          <circle cx="0" cy="0" r="9" fill="${colors.secondary}" />
          <circle cx="0" cy="0" r="3.5" fill="${colors.center}" />
        </g>
        <!-- 主花 (中) -->
        <g transform="translate(4, -2) scale(1.05)">
          <circle cx="0" cy="0" r="15" fill="${colors.primary}" />
          <circle cx="0" cy="0" r="10.5" fill="${colors.secondary}" />
          <circle cx="0" cy="0" r="4" fill="${colors.center}" />
        </g>
        <!-- 副花 (右) -->
        <g transform="translate(22, 2) scale(0.8)">
          <circle cx="0" cy="0" r="12" fill="${colors.primary}" opacity="0.95" />
          <circle cx="0" cy="0" r="8" fill="${colors.secondary}" />
          <circle cx="0" cy="0" r="3" fill="${colors.center}" />
        </g>
      </g>
    </svg>
  `;
}
