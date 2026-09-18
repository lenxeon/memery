/**
 * @file SandalwoodPurpleTablecloth.ts
 * @description 【檀木紫】庄严肃穆织金暗花桌布纯 SVG 模板生成器。
 */
import { TableclothTheme } from '../types';

export const sandalwoodPurpleTheme: TableclothTheme = {
  name: '紫檀金 · 沉香庄严',
  materialName: '盘金缂丝 (皇家重器)',
  textureName: '连珠卷草纹 · 宝相金莲曼荼罗',
  weavePatternId: 'weaveKesiGold',
  borderPatternId: 'borderLianzhuGold',
  motifType: 'lotus',
  sheenOpacity: 0.42,
  weaveOpacity: 0.92,
  topGrad: ['#54364e', '#6e4766', '#593a52', '#3d2537'],
  drapeGrad: ['#56374f', '#694461', '#4b2e45', '#331d2e', '#1c0d19'],
  meanderBg: '#3b0764',
  meanderStroke: '#fef08a',
  pipingStroke: '#fef08a',
  fringeGrad: ['#fef08a', '#eab308', '#7e22ce'],
  pendantBeadGrad: ['#fef08a', '#facc15', '#9333ea', '#581c87'],
  cornerShadow: ['#3b0764', '#24043f', '#10011d'],
  hemStroke: '#581c87',
  tasselColor: { cord: '#fef08a', bead: '#fde047', beadStroke: '#9333ea', shadow: 'rgba(16, 1, 29, 0.48)' },
  ribbonY: 122,
  ribbonH: 14,
  tasselY: 136,
  tasselLength: 14,
  tasselWidth: 2.6,
  motifColors: { primary: '#fef08a', secondary: '#f3e8ff', accent: '#d8b4fe', leaf: '#fbbf24' },
};

export const renderSandalwoodPurpleMotif = (theme: TableclothTheme): string => `
  <g transform="translate(330, 33) scale(0.66, 0.45)" opacity="0.95">
    <ellipse cx="0" cy="0" rx="46" ry="16" fill="none" stroke="${theme.pipingStroke}" stroke-width="1" stroke-dasharray="2,2" opacity="0.85" />
    <ellipse cx="0" cy="0" rx="36" ry="12" fill="none" stroke="${theme.motifColors.secondary}" stroke-width="0.8" opacity="0.7" />
    <path d="M -40 2 Q -25 -14, -12 0 Q -25 10, -40 2 Z" fill="${theme.motifColors.leaf}" opacity="0.85" />
    <path d="M 40 2 Q 25 -14, 12 0 Q 25 10, 40 2 Z" fill="${theme.motifColors.leaf}" opacity="0.85" />
    <g>
      <path d="M 0 -18 C -10 -8, -10 6, 0 12 C 10 6, 10 -8, 0 -18 Z" fill="${theme.motifColors.primary}" stroke="${theme.motifColors.secondary}" stroke-width="1" />
      <path d="M -15 -10 C -22 -2, -18 8, -5 10 C -8 0, -8 -5, -15 -10 Z" fill="${theme.motifColors.secondary}" stroke="${theme.motifColors.primary}" stroke-width="0.8" />
      <path d="M 15 -10 C 22 -2, 18 8, 5 10 C 8 0, 8 -5, 15 -10 Z" fill="${theme.motifColors.secondary}" stroke="${theme.motifColors.primary}" stroke-width="0.8" />
      <circle cx="0" cy="2" r="4.5" fill="${theme.motifColors.accent}" />
      <circle cx="0" cy="2" r="2.2" fill="${theme.pipingStroke}" />
    </g>
  </g>
`;

export const renderSandalwoodPurpleCenterpiece = (_theme: TableclothTheme): string => `
  <g id="centerpieceSandalwoodPurple" transform="translate(280, 80)">
    <rect x="-26" y="-18" width="52" height="36" rx="4" fill="#3b0764" stroke="url(#goldFringeFull)" stroke-width="2.5" />
    <rect x="-22" y="-14" width="44" height="28" rx="2" fill="none" stroke="#fef08a" stroke-width="1" stroke-dasharray="3,2" />
    <circle cx="0" cy="0" r="7" fill="#fef08a" />
    <circle cx="0" cy="0" r="3" fill="#9333ea" />
  </g>
`;

export const getSandalwoodPurpleDrapePath = (): string =>
  'M 0 52 L 560 52 L 560 110 L 460 110 L 455 116 L 375 116 L 370 122 L 190 122 L 185 116 L 105 116 L 100 110 L 0 110 Z';
