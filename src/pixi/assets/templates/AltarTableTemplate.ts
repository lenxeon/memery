/**
 * @file AltarTableTemplate.ts
 * @description 3D 禅意红木雕花供案纯 SVG 模板生成器（Pure TypeScript）。
 * 彻底消除 React 运行时依赖与 renderToStaticMarkup 开销，以极速字符串拼接返回标准原生 SVG。
 * 内嵌微几何数字资产隐写签名（Geometric Steganography）。
 */
import { TableclothStyle } from '../../../types';
import {
  getTableclothModule,
  renderTableclothTopSurface,
  renderTableclothFrontValance,
} from './tablecloth';
import { getGeometricWatermark } from '../security/Watermark';

export interface AltarTableOptions {
  tableclothStyle?: TableclothStyle;
  showTableRunner?: boolean;
  showPetals?: boolean;
  shadowTiltX?: number;
}

export function getAltarTableSvg(options: AltarTableOptions = {}): string {
  const {
    tableclothStyle = 'autumn_gold',
    showTableRunner = true,
    showPetals = true,
    shadowTiltX = 0,
  } = options;

  const tableclothModule = getTableclothModule(tableclothStyle);
  const theme = tableclothModule.theme;

  const watermarkSvg = getGeometricWatermark();

  // 案面铺陈布料
  const tableclothTopSvg = showTableRunner
    ? renderTableclothTopSurface(theme, tableclothModule.renderMotif(theme))
    : '';

  // 散落花瓣
  const petalsSvg = showPetals
    ? `
      <g id="scatteredTablePetals">
        <ellipse cx="132" cy="46" rx="4.5" ry="2.2" fill="#2d1a0e" opacity="0.3" transform="rotate(25 132 46)" />
        <path d="M 130 42 C 136 40, 138 48, 131 47 C 127 46, 127 43, 130 42 Z" fill="#f472b6" />
        <ellipse cx="178" cy="48" rx="5" ry="2.2" fill="#2d1a0e" opacity="0.28" transform="rotate(-15 178 48)" />
        <ellipse cx="178" cy="47" rx="4.5" ry="2" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.5" transform="rotate(-15 178 47)" />
        <ellipse cx="236" cy="49" rx="4" ry="1.8" fill="#2d1a0e" opacity="0.25" transform="rotate(35 236 49)" />
        <ellipse cx="236" cy="48" rx="3.6" ry="1.8" fill="#fda4af" transform="rotate(35 236 48)" />
        <ellipse cx="376" cy="48" rx="5" ry="2" fill="#2d1a0e" opacity="0.28" transform="rotate(20 376 48)" />
        <ellipse cx="376" cy="47" rx="4.6" ry="2" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.5" transform="rotate(20 376 47)" />
        <ellipse cx="426" cy="46" rx="4.2" ry="2" fill="#2d1a0e" opacity="0.3" transform="rotate(-30 426 46)" />
        <path d="M 424 43 C 430 41, 432 48, 425 47 C 421 46, 421 44, 424 43 Z" fill="#f472b6" />
      </g>
    `
    : '';

  // 纯木前面板线纹（未启用桌布时呈现）
  const bareWoodLines = Array.from({ length: 18 })
    .map((_, i) => `<line x1="${20 + i * 30}" y1="72.5" x2="${20 + i * 30}" y2="92.5" stroke="rgba(75, 45, 20, 0.12)" stroke-width="1.2" />`)
    .join('');

  // 前垂布幔 / 裸木面
  const valanceOrBareWood = showTableRunner
    ? renderTableclothFrontValance(
        tableclothStyle,
        theme,
        tableclothModule.getFrontDrapePath(),
        tableclothModule.renderCenterpiece(theme)
      )
    : `
      <g id="bareWoodFrontSlab">
        <polygon points="4,70 556,70 556,72.5 4,72.5" fill="url(#bevelSpecularGrad)" />
        <rect x="4" y="72.5" width="552" height="20" rx="1.5" fill="url(#frontSlabGrad)" />
        ${bareWoodLines}
        <line x1="4" y1="92.5" x2="556" y2="92.5" stroke="#52361d" stroke-width="1.5" />
        <polygon points="14,16 4,70 4,92.5 8,92.5 16,16" fill="url(#endgrainLeft)" opacity="0.6" />
        <polygon points="546,16 556,70 556,92.5 552,92.5 544,16" fill="url(#endgrainRight)" opacity="0.6" />
      </g>
    `;

  return `
<svg viewBox="0 0 560 166" width="560" height="166" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
  <defs>
    <linearGradient id="woodTableTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#c8ad6a" />
      <stop offset="25%" stop-color="#d4b96e" />
      <stop offset="65%" stop-color="#bb9f54" />
      <stop offset="100%" stop-color="#9a8040" />
    </linearGradient>
    <linearGradient id="bevelSpecularGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#b89a50" />
      <stop offset="20%" stop-color="#d9c278" />
      <stop offset="50%" stop-color="#e8d28a" />
      <stop offset="80%" stop-color="#d9c278" />
      <stop offset="100%" stop-color="#b89a50" />
    </linearGradient>
    <linearGradient id="frontSlabGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#d8b997" />
      <stop offset="35%" stop-color="#caa47c" />
      <stop offset="80%" stop-color="#b68e65" />
      <stop offset="100%" stop-color="#96724a" />
    </linearGradient>
    <linearGradient id="endgrainLeft" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#d1b18e" />
      <stop offset="100%" stop-color="#9d7751" />
    </linearGradient>
    <linearGradient id="endgrainRight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#d1b18e" />
      <stop offset="100%" stop-color="#9d7751" />
    </linearGradient>
    <linearGradient id="apronPanelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#755234" />
      <stop offset="15%" stop-color="#a37c56" />
      <stop offset="55%" stop-color="#be976f" />
      <stop offset="90%" stop-color="#aa835b" />
      <stop offset="100%" stop-color="#684729" />
    </linearGradient>
    <linearGradient id="legBlockGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8d6844" />
      <stop offset="30%" stop-color="#be966f" />
      <stop offset="70%" stop-color="#ca9f75" />
      <stop offset="100%" stop-color="#9b734c" />
    </linearGradient>
    <radialGradient id="tableFloorShadowGrad" cx="50%" cy="50%" rx="50%" ry="50%">
      <stop offset="0%" stop-color="#3a2211" stop-opacity="0.58" />
      <stop offset="55%" stop-color="#3a2211" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#3a2211" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="brocadeRunnerTop" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#9a6e2e" />
      <stop offset="15%" stop-color="#d4a34b" />
      <stop offset="50%" stop-color="#f7d488" />
      <stop offset="85%" stop-color="#d4a34b" />
      <stop offset="100%" stop-color="#9a6e2e" />
    </linearGradient>
    <linearGradient id="brocadeRunnerFront" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ca9842" />
      <stop offset="35%" stop-color="#dfb25d" />
      <stop offset="75%" stop-color="#aa792c" />
      <stop offset="100%" stop-color="#6e4915" />
    </linearGradient>
    <linearGradient id="goldFringe" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="60%" stop-color="#d97706" />
      <stop offset="100%" stop-color="#92400e" />
    </linearGradient>
    <pattern id="weaveGoldBrocade" width="8" height="8" patternUnits="userSpaceOnUse">
      <rect width="8" height="8" fill="none" />
      <rect x="0" y="0" width="4" height="4" fill="rgba(255,248,200,0.07)" />
      <rect x="4" y="4" width="4" height="4" fill="rgba(255,248,200,0.07)" />
      <rect x="4" y="0" width="4" height="4" fill="rgba(20,10,0,0.05)" />
      <rect x="0" y="4" width="4" height="4" fill="rgba(20,10,0,0.05)" />
      <line x1="0" y1="0" x2="8" y2="0" stroke="rgba(20,10,0,0.10)" stroke-width="0.5" />
      <line x1="0" y1="4" x2="8" y2="4" stroke="rgba(255,245,180,0.10)" stroke-width="0.4" />
      <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(20,10,0,0.10)" stroke-width="0.5" />
      <line x1="4" y1="0" x2="4" y2="8" stroke="rgba(255,245,180,0.10)" stroke-width="0.4" />
    </pattern>
    <pattern id="weaveSatinSilk" width="16" height="16" patternUnits="userSpaceOnUse">
      <rect width="16" height="16" fill="none" />
      <path d="M 0 0 L 16 16 M 0 8 L 8 16 M 8 0 L 16 8" stroke="rgba(255,255,255,0.28)" stroke-width="1.2" />
      <line x1="0" y1="4" x2="16" y2="4" stroke="rgba(0,0,0,0.08)" stroke-width="0.8" />
      <line x1="0" y1="12" x2="16" y2="12" stroke="rgba(255,255,255,0.22)" stroke-width="0.8" />
    </pattern>
    <pattern id="weaveSilkRaw" width="16" height="16" patternUnits="userSpaceOnUse">
      <use href="#weaveSatinSilk" />
    </pattern>
    <pattern id="weaveCoarseLinen" width="20" height="20" patternUnits="userSpaceOnUse">
      <rect width="20" height="20" fill="none" />
      <rect x="0" y="0" width="20" height="10" fill="rgba(0,0,0,0.16)" />
      <rect x="0" y="10" width="20" height="10" fill="rgba(255,255,255,0.18)" />
      <rect x="0" y="0" width="10" height="20" fill="rgba(255,255,255,0.22)" />
      <rect x="10" y="0" width="10" height="20" fill="rgba(0,0,0,0.16)" />
      <ellipse cx="5" cy="4" rx="4.5" ry="2" fill="rgba(255,255,255,0.45)" />
      <ellipse cx="15" cy="14" rx="4.8" ry="2.2" fill="rgba(0,0,0,0.32)" />
      <line x1="0" y1="3" x2="20" y2="3" stroke="rgba(0,0,0,0.3)" stroke-width="1.4" />
      <line x1="0" y1="13" x2="20" y2="13" stroke="rgba(255,255,255,0.42)" stroke-width="1.4" />
      <line x1="3" y1="0" x2="3" y2="20" stroke="rgba(255,255,255,0.42)" stroke-width="1.4" />
      <line x1="13" y1="0" x2="13" y2="20" stroke="rgba(0,0,0,0.3)" stroke-width="1.4" />
    </pattern>
    <pattern id="weaveRoughLinen" width="20" height="20" patternUnits="userSpaceOnUse">
      <use href="#weaveCoarseLinen" />
    </pattern>
    <pattern id="weaveVelvetWool" width="16" height="16" patternUnits="userSpaceOnUse">
      <rect width="16" height="16" fill="none" />
      <circle cx="4" cy="4" r="2.2" fill="rgba(255,255,255,0.25)" />
      <circle cx="12" cy="12" r="2.2" fill="rgba(255,255,255,0.22)" />
      <circle cx="12" cy="4" r="1.8" fill="rgba(0,0,0,0.22)" />
      <circle cx="4" cy="12" r="1.8" fill="rgba(0,0,0,0.22)" />
      <circle cx="8" cy="8" r="2.6" fill="rgba(255,220,120,0.32)" />
      <line x1="2" y1="6" x2="6" y2="2" stroke="rgba(255,255,255,0.2)" stroke-width="1.1" />
      <line x1="10" y1="14" x2="14" y2="10" stroke="rgba(255,255,255,0.2)" stroke-width="1.1" />
    </pattern>
    <pattern id="weaveSheerCrepe" width="20" height="12" patternUnits="userSpaceOnUse">
      <rect width="20" height="12" fill="none" />
      <path d="M 0 3 Q 5 1, 10 3 T 20 3" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="1.2" />
      <path d="M 0 9 Q 5 7, 10 9 T 20 9" fill="none" stroke="rgba(0,0,0,0.12)" stroke-width="1.0" />
      <line x1="5" y1="0" x2="5" y2="12" stroke="rgba(255,255,255,0.28)" stroke-width="0.8" stroke-dasharray="2,2" />
      <line x1="15" y1="0" x2="15" y2="12" stroke="rgba(0,0,0,0.08)" stroke-width="0.8" stroke-dasharray="2,2" />
    </pattern>
    <pattern id="weaveSongBrocade" width="24" height="24" patternUnits="userSpaceOnUse">
      <rect width="24" height="24" fill="none" />
      <polygon points="12,2 22,12 12,22 2,12" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.4" />
      <circle cx="12" cy="12" r="2.6" fill="rgba(255,230,150,0.4)" />
      <line x1="0" y1="0" x2="24" y2="24" stroke="rgba(0,0,0,0.18)" stroke-width="1.0" />
      <line x1="24" y1="0" x2="0" y2="24" stroke="rgba(0,0,0,0.18)" stroke-width="1.0" />
    </pattern>
    <pattern id="weaveKesiGold" width="20" height="16" patternUnits="userSpaceOnUse">
      <rect width="20" height="16" fill="none" />
      <rect x="0" y="0" width="20" height="6" fill="rgba(255,215,0,0.24)" />
      <rect x="0" y="6" width="20" height="10" fill="rgba(0,0,0,0.22)" />
      <line x1="0" y1="3" x2="20" y2="3" stroke="rgba(255,245,170,0.8)" stroke-width="1.6" />
      <line x1="0" y1="5" x2="20" y2="5" stroke="rgba(110,50,5,0.4)" stroke-width="1.0" />
      <line x1="0" y1="11" x2="20" y2="11" stroke="rgba(255,245,170,0.5)" stroke-width="1.2" />
      <line x1="5" y1="0" x2="5" y2="16" stroke="rgba(255,255,255,0.4)" stroke-width="1.0" stroke-dasharray="3,3" />
      <line x1="15" y1="0" x2="15" y2="16" stroke="rgba(255,255,255,0.4)" stroke-width="1.0" stroke-dasharray="3,3" />
    </pattern>
    <pattern id="borderMeanderGold" width="24" height="14" patternUnits="userSpaceOnUse">
      <rect width="24" height="14" fill="#24160c" />
      <line x1="0" y1="0.8" x2="24" y2="0.8" stroke="#caa34e" stroke-width="1.2" />
      <line x1="0" y1="13.2" x2="24" y2="13.2" stroke="#caa34e" stroke-width="1.2" />
      <path d="M 0 2.5 L 22 2.5 L 22 11.5 L 2 11.5 L 2 5.5 L 18 5.5 L 18 8.5 L 6 8.5" fill="none" stroke="#d5b060" stroke-width="1.4" stroke-linecap="square" stroke-linejoin="miter" />
    </pattern>
    <pattern id="borderWanziRed" width="24" height="14" patternUnits="userSpaceOnUse">
      <rect width="24" height="14" fill="#2a0c0d" />
      <path d="M 0 7 L 7 7 L 7 2 L 13 2 L 13 7 L 21 7 M 13 7 L 13 12 L 19 12" fill="none" stroke="#fcd34d" stroke-width="1.8" stroke-linecap="square" />
    </pattern>
    <pattern id="borderBadayunGreen" width="24" height="14" patternUnits="userSpaceOnUse">
      <rect width="24" height="14" fill="#111f17" />
      <polygon points="6,7 12,2 18,7 12,12" fill="none" stroke="#eab308" stroke-width="1.8" />
      <circle cx="12" cy="7" r="1.8" fill="#eab308" />
      <line x1="0" y1="7" x2="6" y2="7" stroke="#eab308" stroke-width="1.2" />
      <line x1="18" y1="7" x2="24" y2="7" stroke="#eab308" stroke-width="1.2" />
    </pattern>
    <pattern id="borderDrawnThread" width="20" height="14" patternUnits="userSpaceOnUse">
      <rect width="20" height="14" fill="#111a26" />
      <line x1="0" y1="2" x2="20" y2="2" stroke="#ffffff" stroke-width="1.2" />
      <line x1="0" y1="12" x2="20" y2="12" stroke="#ffffff" stroke-width="1.2" />
      <path d="M 0 7 L 5 2 L 10 7 L 15 2 L 20 7 M 0 7 L 5 12 L 10 7 L 15 12 L 20 7" fill="none" stroke="#ffffff" stroke-width="1.6" />
    </pattern>
    <pattern id="borderRuyiSilver" width="24" height="14" patternUnits="userSpaceOnUse">
      <rect width="24" height="14" fill="#3b3732" />
      <path d="M 0 7 Q 6 2, 12 7 Q 18 12, 24 7" fill="none" stroke="#ffffff" stroke-width="1.8" />
      <circle cx="12" cy="7" r="2.2" fill="#ffffff" />
    </pattern>
    <pattern id="borderLianzhuGold" width="24" height="14" patternUnits="userSpaceOnUse">
      <rect width="24" height="14" fill="#210e1e" />
      <circle cx="4" cy="7" r="2.2" fill="#fbbf24" />
      <circle cx="20" cy="7" r="2.2" fill="#fbbf24" />
      <path d="M 6 7 Q 12 2, 18 7 Q 12 12, 6 7 Z" fill="none" stroke="#fbbf24" stroke-width="1.6" />
    </pattern>
    <linearGradient id="brocadeGoldTop" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${theme.topGrad[0]}" />
      <stop offset="25%" stop-color="${theme.topGrad[1]}" />
      <stop offset="65%" stop-color="${theme.topGrad[2]}" />
      <stop offset="100%" stop-color="${theme.topGrad[3]}" />
    </linearGradient>
    <linearGradient id="brocadeGoldDrape" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${theme.drapeGrad[0]}" />
      <stop offset="15%" stop-color="${theme.drapeGrad[1]}" />
      <stop offset="60%" stop-color="${theme.drapeGrad[2]}" />
      <stop offset="88%" stop-color="${theme.drapeGrad[3]}" />
      <stop offset="100%" stop-color="${theme.drapeGrad[4]}" />
    </linearGradient>
    <linearGradient id="clothLipShadow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1a0f06" stop-opacity="0.52" />
      <stop offset="30%" stop-color="#251609" stop-opacity="0.28" />
      <stop offset="75%" stop-color="#2e1a0b" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#2e1a0b" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="fabricSoftDiffuse" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.08" />
      <stop offset="35%" stop-color="#ffffff" stop-opacity="0.10" />
      <stop offset="75%" stop-color="#ffffff" stop-opacity="0.06" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.15" />
    </linearGradient>
    <linearGradient id="cornerDropShadowLeft" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${theme.cornerShadow[0]}" />
      <stop offset="70%" stop-color="${theme.cornerShadow[1]}" />
      <stop offset="100%" stop-color="${theme.cornerShadow[2]}" />
    </linearGradient>
    <linearGradient id="cornerDropShadowRight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.cornerShadow[0]}" />
      <stop offset="70%" stop-color="${theme.cornerShadow[1]}" />
      <stop offset="100%" stop-color="${theme.cornerShadow[2]}" />
    </linearGradient>
    <radialGradient id="amberPendantGrad" cx="35%" cy="30%" rx="65%" ry="65%">
      <stop offset="0%" stop-color="${theme.pendantBeadGrad[0]}" />
      <stop offset="35%" stop-color="${theme.pendantBeadGrad[1]}" />
      <stop offset="75%" stop-color="${theme.pendantBeadGrad[2]}" />
      <stop offset="100%" stop-color="${theme.pendantBeadGrad[3]}" />
    </radialGradient>
    <linearGradient id="goldFringeFull" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${theme.fringeGrad[0]}" />
      <stop offset="60%" stop-color="${theme.fringeGrad[1]}" />
      <stop offset="100%" stop-color="${theme.fringeGrad[2]}" />
    </linearGradient>
  </defs>

  ${watermarkSvg}

  <g id="tableBaseStructure">
    <rect x="58" y="70" width="444" height="76" rx="3" fill="url(#apronPanelGrad)" />
    <rect x="62" y="70" width="140" height="76" fill="rgba(255, 235, 205, 0.05)" />
    <rect x="210" y="70" width="140" height="76" fill="rgba(255, 235, 205, 0.07)" />
    <rect x="358" y="70" width="140" height="76" fill="rgba(255, 235, 205, 0.05)" />
    <line x1="205" y1="70" x2="205" y2="146" stroke="#48301c" stroke-width="3" />
    <line x1="207" y1="70" x2="207" y2="146" stroke="#dfc09c" stroke-width="1" opacity="0.6" />
    <line x1="353" y1="70" x2="353" y2="146" stroke="#48301c" stroke-width="3" />
    <line x1="355" y1="70" x2="355" y2="146" stroke="#dfc09c" stroke-width="1" opacity="0.6" />
    <rect x="52" y="70" width="48" height="78" rx="2" fill="url(#legBlockGrad)" />
    <line x1="53" y1="70" x2="53" y2="148" stroke="#edd4b8" stroke-width="1.2" opacity="0.8" />
    <rect x="96" y="70" width="5" height="78" fill="#4d321c" opacity="0.45" />
    <rect x="460" y="70" width="48" height="78" rx="2" fill="url(#legBlockGrad)" />
    <line x1="461" y1="70" x2="461" y2="148" stroke="#edd4b8" stroke-width="1.2" opacity="0.8" />
    <rect x="460" y="70" width="5" height="78" fill="#4d321c" opacity="0.45" />
    <rect x="52" y="144" width="456" height="5" rx="1" fill="#6e4c2b" />
    <rect x="52" y="70" width="456" height="12" fill="#2d1b0d" opacity="0.65" />
  </g>

  <g id="tableTopSlab">
    <polygon points="14,16 546,16 556,70 4,70" fill="url(#woodTableTopGrad)" stroke="#cfb290" stroke-width="0.8" />
    <path d="M 25 24 Q 280 23 535 24" stroke="#e0c4a4" stroke-width="0.9" fill="none" opacity="0.75" />
    <path d="M 18 40 Q 280 39 542 40" stroke="#e0c4a4" stroke-width="1.0" fill="none" opacity="0.7" />
    <path d="M 10 56 Q 280 55 550 56" stroke="#e0c4a4" stroke-width="1.1" fill="none" opacity="0.65" />
    <ellipse cx="280" cy="45" rx="210" ry="18" fill="#fff9ef" opacity="0.12" />
    ${tableclothTopSvg}
    ${petalsSvg}
    ${valanceOrBareWood}
  </g>

  <ellipse cx="76" cy="152" rx="38" ry="4.5" fill="#201208" opacity="0.85" />
  <ellipse cx="484" cy="152" rx="38" ry="4.5" fill="#201208" opacity="0.85" />
  <rect x="74" y="150" width="412" height="4" rx="2" fill="#201208" opacity="0.75" />
  <ellipse cx="${(280 + shadowTiltX * 1.5).toFixed(1)}" cy="158" rx="270" ry="10" fill="url(#tableFloorShadowGrad)" />
</svg>
  `.trim();
}

/**
 * 桌布覆盖层专用 SVG：保留原案面织物与前围幔，移除旧案体、木面与落影，
 * 以便织物可以叠加在独立的明式条案素材上，而不把旧桌子一起盖回来。
 */
export function getAltarTableclothOverlaySvg(options: AltarTableOptions = {}): string {
  let svg = getAltarTableSvg({ ...options, showTableRunner: true });
  const obsoleteTableParts: RegExp[] = [
    /<g id="tableBaseStructure">[\s\S]*?<\/g>\s*/,
    /<polygon points="14,16 546,16 556,70 4,70" fill="url\(#woodTableTopGrad\)" stroke="#cfb290" stroke-width="0\.8" \/>\s*/,
    /<path d="M 25 24 Q 280 23 535 24"[^>]*\/>\s*/,
    /<path d="M 18 40 Q 280 39 542 40"[^>]*\/>\s*/,
    /<path d="M 10 56 Q 280 55 550 56"[^>]*\/>\s*/,
    /<ellipse cx="280" cy="45" rx="210" ry="18" fill="#fff9ef" opacity="0\.12" \/>\s*/,
    /<g id="valanceTableFeet">[\s\S]*?<\/g>\s*/,
    /<ellipse cx="76" cy="152"[^>]*\/>\s*/,
    /<ellipse cx="484" cy="152"[^>]*\/>\s*/,
    /<rect x="74" y="150" width="412" height="4"[^>]*\/>\s*/,
    /<ellipse cx="[^"]+" cy="158" rx="270" ry="10" fill="url\(#tableFloorShadowGrad\)" \/>\s*/,
  ];

  for (const pattern of obsoleteTableParts) svg = svg.replace(pattern, '');
  return svg;
}
