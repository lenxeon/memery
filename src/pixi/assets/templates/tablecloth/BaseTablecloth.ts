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
    <polygon points="14,16 546,16 556,70 4,70" fill="url(#brocadeGoldTop)" />
    <polygon points="14,16 546,16 556,70 4,70" fill="url(#${theme.weavePatternId})" opacity="${theme.weaveOpacity}" />
    <polygon points="14,16 546,16 556,70 4,70" fill="url(#fabricSoftDiffuse)" opacity="0.35" />
    <polygon points="14,16 546,16 556,70 4,70" fill="none" stroke="${theme.pipingStroke}" stroke-width="1.0" opacity="0.85" />
    <polygon points="16,18 544,18 553,68 7,68" fill="none" stroke="${theme.pipingStroke}" stroke-width="0.6" stroke-dasharray="3,2" opacity="0.35" />
    ${motifSvg}
    ${renderTableclothRoundel(theme)}
    <g id="leftSideDrape">
      <polygon points="14,16 4,70 4,136 14,128" fill="url(#cornerDropShadowLeft)" stroke="${theme.hemStroke}" stroke-width="0.8" />
      <polygon points="14,16 4,70 4,136 14,128" fill="url(#${theme.weavePatternId})" opacity="${(theme.weaveOpacity * 0.7).toFixed(2)}" />
      <polygon points="14,115 4,122 4,136 14,128" fill="url(#${theme.borderPatternId})" opacity="0.88" />
      <line x1="14" y1="115" x2="4" y2="122" stroke="#24170d" stroke-width="1.2" />
      <line x1="14" y1="128" x2="4" y2="136" stroke="#24170d" stroke-width="1.2" />
      <line x1="4" y1="70" x2="4" y2="136" stroke="${theme.pipingStroke}" stroke-width="1.2" opacity="0.9" />
      <line x1="4" y1="70" x2="4" y2="136" stroke="#24170d" stroke-width="0.5" />
      <g opacity="0.8">
        <line x1="10" y1="130" x2="10" y2="138" stroke="${theme.tasselColor.cord}" stroke-width="1.0" />
        <circle cx="10" cy="132" r="1.4" fill="${theme.tasselColor.bead}" stroke="#24170d" stroke-width="0.5" />
        <polygon points="9,133 11,133 11.4,139 8.6,139" fill="url(#goldFringeFull)" />
        <line x1="6.5" y1="133" x2="6.5" y2="142" stroke="${theme.tasselColor.cord}" stroke-width="1.0" />
        <circle cx="6.5" cy="135" r="1.5" fill="${theme.tasselColor.bead}" stroke="#24170d" stroke-width="0.5" />
        <polygon points="5.4,136 7.6,136 8,143 5,143" fill="url(#goldFringeFull)" />
      </g>
    </g>
    <g id="rightSideDrape">
      <polygon points="546,16 556,70 556,136 546,128" fill="url(#cornerDropShadowRight)" stroke="${theme.hemStroke}" stroke-width="0.8" />
      <polygon points="546,16 556,70 556,136 546,128" fill="url(#${theme.weavePatternId})" opacity="${(theme.weaveOpacity * 0.7).toFixed(2)}" />
      <polygon points="556,122 546,115 546,128 556,136" fill="url(#${theme.borderPatternId})" opacity="0.88" />
      <line x1="556" y1="122" x2="546" y2="115" stroke="#24170d" stroke-width="1.2" />
      <line x1="556" y1="136" x2="546" y2="128" stroke="#24170d" stroke-width="1.2" />
      <line x1="556" y1="70" x2="556" y2="136" stroke="${theme.pipingStroke}" stroke-width="1.2" opacity="0.9" />
      <line x1="556" y1="70" x2="556" y2="136" stroke="#24170d" stroke-width="0.5" />
      <g opacity="0.8">
        <line x1="550" y1="130" x2="550" y2="138" stroke="${theme.tasselColor.cord}" stroke-width="1.0" />
        <circle cx="550" cy="132" r="1.4" fill="${theme.tasselColor.bead}" stroke="#24170d" stroke-width="0.5" />
        <polygon points="549,133 551,133 551.4,139 548.6,139" fill="url(#goldFringeFull)" />
        <line x1="553.5" y1="133" x2="553.5" y2="142" stroke="${theme.tasselColor.cord}" stroke-width="1.0" />
        <circle cx="553.5" cy="135" r="1.5" fill="${theme.tasselColor.bead}" stroke="#24170d" stroke-width="0.5" />
        <polygon points="552.4,136 554.6,136 555,143 552,143" fill="url(#goldFringeFull)" />
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
  const tasselCount = 48;
  const tasselStep = 520 / (tasselCount - 1);
  const topTabs = ['8-', '18-', '18-', '18-', '18-', '18-', '16-', '16-', '16-', '18-', '18-', '18-', '18-', '18-', '18-', '18-'];

  const rulerRibbonContent = topTabs.map((tab, idx) => {
    const tabX = 20 + idx * 33;
    return `
      <g opacity="0.85">
        <line x1="${tabX}" y1="70" x2="${tabX}" y2="78" stroke="#24170d" stroke-width="0.8" />
        <text x="${tabX + 6.5}" y="76.2" font-size="5.5" font-family="sans-serif" font-weight="bold" fill="#24170d" letter-spacing="-0.5">${tab}</text>
      </g>
    `;
  }).join('');

  const verticalPanelsContent = topTabs.map((_, idx) => {
    const seamX = 20 + idx * 33;
    return `
      <g>
        <line x1="${seamX}" y1="78" x2="${seamX}" y2="${theme.ribbonY}" stroke="rgba(40, 20, 5, 0.28)" stroke-width="0.9" />
        <line x1="${seamX + 0.8}" y1="78" x2="${seamX + 0.8}" y2="${theme.ribbonY}" stroke="rgba(255, 245, 200, 0.18)" stroke-width="0.7" />
        <rect x="${seamX + 3}" y="78" width="26" height="${theme.ribbonY - 78}" fill="rgba(255, 255, 255, 0.03)" />
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
        <polygon points="30,136 56,136 54,148 28,148" fill="#24170d" stroke="#160e07" stroke-width="1.2" />
        <line x1="28" y1="148" x2="54" y2="148" stroke="#0a0502" stroke-width="1.8" />
        <polygon points="504,136 530,136 532,148 506,148" fill="#24170d" stroke="#160e07" stroke-width="1.2" />
        <line x1="506" y1="148" x2="532" y2="148" stroke="#0a0502" stroke-width="1.8" />
      </g>
      <polygon points="4,70 556,70 556,136 4,136" fill="url(#brocadeGoldDrape)" stroke="${theme.hemStroke}" stroke-width="1.0" />
      <polygon points="4,70 556,70 556,136 4,136" fill="url(#${theme.weavePatternId})" opacity="${theme.weaveOpacity}" />
      <polygon points="4,70 556,70 556,82 4,82" fill="url(#clothLipShadow)" />
      <g id="topPleatRulerRibbon">
        <rect x="4" y="70" width="552" height="8" fill="#caa44e" opacity="0.95" />
        <line x1="4" y1="70" x2="556" y2="70" stroke="#24170d" stroke-width="1.4" />
        <line x1="4" y1="78" x2="556" y2="78" stroke="#24170d" stroke-width="1.0" />
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
      <rect x="0" y="148" width="560" height="6" fill="#140b04" opacity="0.45" filter="blur(2px)" />
    </g>
  `;
};
