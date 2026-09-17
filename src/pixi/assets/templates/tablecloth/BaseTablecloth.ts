/**
 * @file BaseTablecloth.ts
 * @description 供桌桌布纯 SVG 模板生成器，负责案面铺陈、3D纵深侧垂面、前垂围幔、万字回纹带与垂密金丝流苏。
 */
import { TableclothTheme } from './types';
import { TableclothStyle } from '../../../../types';

export const renderTableclothRoundel = (theme: TableclothTheme): string => `
  <g id="tableclothCenterRoundel">
    <ellipse cx="280" cy="34" rx="42" ry="9" fill="none" stroke="${theme.pipingStroke}" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.7" />
    <path d="M 260 34 Q 280 27 300 34 Q 280 41 260 34 Z" fill="#ffffff" opacity="${theme.sheenOpacity}" />
  </g>
`;

export const renderTableclothTopSurface = (theme: TableclothTheme, motifSvg: string): string => `
  <g id="imperialTablecloth">
    <polygon points="14,16 546,16 556,52 4,52" fill="url(#brocadeGoldTop)" />
    <polygon points="14,16 546,16 556,52 4,52" fill="url(#${theme.weavePatternId})" opacity="${theme.weaveOpacity}" />
    <polygon points="14,16 546,16 556,52 4,52" fill="url(#fabricSoftDiffuse)" opacity="0.35" />
    <polygon points="14,16 546,16 556,52 4,52" fill="none" stroke="${theme.pipingStroke}" stroke-width="1.0" opacity="0.85" />
    <polygon points="16,18 544,18 553,50 7,50" fill="none" stroke="${theme.pipingStroke}" stroke-width="0.6" stroke-dasharray="3,2" opacity="0.35" />
    ${motifSvg}
    ${renderTableclothRoundel(theme)}
    <g id="leftSideDrape">
      <polygon points="14,16 4,52 4,118 14,110" fill="url(#cornerDropShadowLeft)" stroke="${theme.hemStroke}" stroke-width="0.8" />
      <polygon points="14,16 4,52 4,118 14,110" fill="url(#${theme.weavePatternId})" opacity="${(theme.weaveOpacity * 0.7).toFixed(2)}" />
      <polygon points="14,97 4,104 4,118 14,110" fill="url(#${theme.borderPatternId})" opacity="0.88" />
      <line x1="14" y1="97" x2="4" y2="104" stroke="#24170d" stroke-width="1.2" />
      <line x1="14" y1="110" x2="4" y2="118" stroke="#24170d" stroke-width="1.2" />
      <line x1="4" y1="52" x2="4" y2="118" stroke="${theme.pipingStroke}" stroke-width="1.2" opacity="0.9" />
      <line x1="4" y1="52" x2="4" y2="118" stroke="#24170d" stroke-width="0.5" />
      <g opacity="0.8">
        <line x1="10" y1="112" x2="10" y2="120" stroke="${theme.tasselColor.cord}" stroke-width="1.0" />
        <circle cx="10" cy="114" r="1.4" fill="${theme.tasselColor.bead}" stroke="#24170d" stroke-width="0.5" />
        <polygon points="9,115 11,115 11.4,121 8.6,121" fill="url(#goldFringeFull)" />
        <line x1="6.5" y1="115" x2="6.5" y2="124" stroke="${theme.tasselColor.cord}" stroke-width="1.0" />
        <circle cx="6.5" cy="117" r="1.5" fill="${theme.tasselColor.bead}" stroke="#24170d" stroke-width="0.5" />
        <polygon points="5.4,118 7.6,118 8,125 5,125" fill="url(#goldFringeFull)" />
      </g>
    </g>
    <g id="rightSideDrape">
      <polygon points="546,16 556,52 556,118 546,110" fill="url(#cornerDropShadowRight)" stroke="${theme.hemStroke}" stroke-width="0.8" />
      <polygon points="546,16 556,52 556,118 546,110" fill="url(#${theme.weavePatternId})" opacity="${(theme.weaveOpacity * 0.7).toFixed(2)}" />
      <polygon points="556,104 546,97 546,110 556,118" fill="url(#${theme.borderPatternId})" opacity="0.88" />
      <line x1="556" y1="104" x2="546" y2="97" stroke="#24170d" stroke-width="1.2" />
      <line x1="556" y1="118" x2="546" y2="110" stroke="#24170d" stroke-width="1.2" />
      <line x1="556" y1="52" x2="556" y2="118" stroke="${theme.pipingStroke}" stroke-width="1.2" opacity="0.9" />
      <line x1="556" y1="52" x2="556" y2="118" stroke="#24170d" stroke-width="0.5" />
      <g opacity="0.8">
        <line x1="550" y1="112" x2="550" y2="120" stroke="${theme.tasselColor.cord}" stroke-width="1.0" />
        <circle cx="550" cy="114" r="1.4" fill="${theme.tasselColor.bead}" stroke="#24170d" stroke-width="0.5" />
        <polygon points="549,115 551,115 551.4,121 548.6,121" fill="url(#goldFringeFull)" />
        <line x1="553.5" y1="115" x2="553.5" y2="124" stroke="${theme.tasselColor.cord}" stroke-width="1.0" />
        <circle cx="553.5" cy="117" r="1.5" fill="${theme.tasselColor.bead}" stroke="#24170d" stroke-width="0.5" />
        <polygon points="552.4,118 554.6,118 555,125 552,125" fill="url(#goldFringeFull)" />
      </g>
    </g>
  </g>
`;

export const renderTableclothFrontValance = (
  style: TableclothStyle,
  theme: TableclothTheme,
  _drapePath: string,
  centerpieceSvg: string
): string => {
  const tasselCount = 32;
  const tasselStep = 520 / (tasselCount - 1);
  const topTabs = ['8-', '18-', '18-', '18-', '18-', '18-', '16-', '16-', '16-', '18-', '18-', '18-', '18-', '18-', '18-', '18-'];

  const rulerRibbonContent = topTabs.map((tab, idx) => {
    const tabX = 20 + idx * 33;
    return `
      <g opacity="0.85">
        <line x1="${tabX}" y1="52" x2="${tabX}" y2="61.5" stroke="#24170d" stroke-width="0.8" />
        <text x="${tabX + 6.5}" y="59" font-size="6.2" font-family="sans-serif" font-weight="bold" fill="#24170d" letter-spacing="-0.5">${tab}</text>
      </g>
    `;
  }).join('');

  const verticalPanelsContent = topTabs.map((_, idx) => {
    const seamX = 20 + idx * 33;
    return `
      <g>
        <line x1="${seamX}" y1="61.5" x2="${seamX}" y2="${theme.ribbonY}" stroke="rgba(40, 20, 5, 0.28)" stroke-width="0.9" />
        <line x1="${seamX + 0.8}" y1="61.5" x2="${seamX + 0.8}" y2="${theme.ribbonY}" stroke="rgba(255, 245, 200, 0.18)" stroke-width="0.7" />
        <rect x="${seamX + 3}" y="61.5" width="26" height="${theme.ribbonY - 61.5}" fill="rgba(255, 255, 255, 0.03)" />
      </g>
    `;
  }).join('');

  const tasselsContent = Array.from({ length: tasselCount }).map((_, i) => {
    const tx = 20 + i * tasselStep;
    const tY = theme.tasselY;
    const tLen = theme.tasselLength;
    const tW = theme.tasselWidth;
    const fringeFill = style === 'indigo_linen' ? '#ffffff' : 'url(#goldFringeFull)';
    return `
      <g>
        <line x1="${tx}" y1="${tY}" x2="${tx}" y2="${tY + tLen}" stroke="${theme.tasselColor.shadow}" stroke-width="${tW + 1.2}" />
        <line x1="${tx}" y1="${tY}" x2="${tx}" y2="${tY + 3.5}" stroke="#24170d" stroke-width="0.9" />
        <circle cx="${tx}" cy="${tY + 3.5}" r="${(tW * 0.55).toFixed(2)}" fill="${theme.tasselColor.bead}" stroke="${theme.tasselColor.beadStroke}" stroke-width="0.7" />
        <polygon points="${(tx - tW * 0.48).toFixed(2)},${tY + 4.5} ${(tx + tW * 0.48).toFixed(2)},${tY + 4.5} ${(tx + tW * 0.58).toFixed(2)},${tY + tLen} ${(tx - tW * 0.58).toFixed(2)},${tY + tLen}" fill="${fringeFill}" stroke="#24170d" stroke-width="0.45" />
        <line x1="${(tx - tW * 0.35).toFixed(2)}" y1="${tY + tLen - 0.5}" x2="${(tx + tW * 0.35).toFixed(2)}" y2="${tY + tLen - 0.5}" stroke="#fae896" stroke-width="0.7" />
      </g>
    `;
  }).join('');

  return `
    <g id="tableclothFrontValance">
      <g id="valanceTableFeet">
        <polygon points="30,122 56,122 54,136 28,136" fill="#24170d" stroke="#160e07" stroke-width="1.2" />
        <line x1="28" y1="136" x2="54" y2="136" stroke="#0a0502" stroke-width="1.8" />
        <polygon points="504,122 530,122 532,136 506,136" fill="#24170d" stroke="#160e07" stroke-width="1.2" />
        <line x1="506" y1="136" x2="532" y2="136" stroke="#0a0502" stroke-width="1.8" />
      </g>
      <polygon points="4,52 556,52 556,118 4,118" fill="url(#brocadeGoldDrape)" stroke="${theme.hemStroke}" stroke-width="1.0" />
      <polygon points="4,52 556,52 556,118 4,118" fill="url(#${theme.weavePatternId})" opacity="${theme.weaveOpacity}" />
      <polygon points="4,52 556,52 556,66 4,66" fill="url(#clothLipShadow)" />
      <g id="topPleatRulerRibbon">
        <rect x="4" y="52" width="552" height="9.5" fill="#caa44e" opacity="0.95" />
        <line x1="4" y1="52" x2="556" y2="52" stroke="#24170d" stroke-width="1.4" />
        <line x1="4" y1="61.5" x2="556" y2="61.5" stroke="#24170d" stroke-width="1.0" />
        ${rulerRibbonContent}
      </g>
      <g id="verticalClothPanels">
        ${verticalPanelsContent}
      </g>
      ${centerpieceSvg}
      <g id="bottomMeanderRibbon">
        <rect x="4" y="${theme.ribbonY}" width="552" height="${theme.ribbonH}" fill="url(#${theme.borderPatternId})" />
        <line x1="4" y1="${theme.ribbonY}" x2="556" y2="${theme.ribbonY}" stroke="#24170d" stroke-width="1.4" />
        <line x1="4" y1="${theme.ribbonY + theme.ribbonH}" x2="556" y2="${theme.ribbonY + theme.ribbonH}" stroke="#24170d" stroke-width="1.4" />
      </g>
      <g id="hangingTasselFringe">
        ${tasselsContent}
      </g>
      <rect x="0" y="132" width="560" height="8" fill="#140b04" opacity="0.5" filter="blur(2px)" />
    </g>
  `;
};
