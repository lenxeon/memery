/**
 * @file CinnabarRedTablecloth.ts
 * @description 【朱砂红】传统吉祥织锦缎华彩桌布纯 SVG 模板生成器。
 */
import { TableclothTheme } from '../types';

export const cinnabarRedTheme: TableclothTheme = {
  name: '朱砂红 · 吉祥华彩',
  materialName: '密织红呢 (喜庆绒呢)',
  textureName: '泥金万字锦 · 双鹤衔芝如意图',
  weavePatternId: 'weaveVelvetWool',
  borderPatternId: 'borderWanziRed',
  motifType: 'crane',
  sheenOpacity: 0.28,
  weaveOpacity: 0.88,
  topGrad: ['#b93839', '#dc4a4b', '#c53839', '#962324'],
  drapeGrad: ['#bd3637', '#d64546', '#a82425', '#801617', '#50090a'],
  meanderBg: '#450a0a',
  meanderStroke: '#fef08a',
  pipingStroke: '#fef08a',
  fringeGrad: ['#fef08a', '#eab308', '#854d0e'],
  pendantBeadGrad: ['#fef08a', '#eab308', '#b45309', '#78350f'],
  cornerShadow: ['#450a0a', '#2e0707', '#170303'],
  hemStroke: '#7f1d1d',
  tasselColor: { cord: '#fef08a', bead: '#fde047', beadStroke: '#ca8a04', shadow: 'rgba(23, 3, 3, 0.45)' },
  ribbonY: 104,
  ribbonH: 14,
  tasselY: 118,
  tasselLength: 14,
  tasselWidth: 2.6,
  motifColors: { primary: '#fffdf5', secondary: '#fde047', accent: '#dc2626', leaf: '#ca8a04' },
};

export const renderCinnabarRedMotif = (theme: TableclothTheme): string => `
  <g transform="translate(335, 33) scale(0.68, 0.45)" opacity="0.9">
    <path d="M -35 8 Q -20 0, -5 8 Q 10 0, 25 8 Q 10 16, -5 12 Q -20 16, -35 8 Z" fill="${theme.motifColors.secondary}" opacity="0.6" stroke="${theme.pipingStroke}" stroke-width="0.8" />
    <g transform="translate(10, -3)">
      <path d="M -15 6 Q 0 -22, 22 -16 Q 12 0, -15 6 Z" fill="${theme.motifColors.primary}" stroke="${theme.motifColors.secondary}" stroke-width="1" />
      <path d="M -18 8 Q -10 -15, 6 -12 Q 0 4, -18 8 Z" fill="${theme.motifColors.primary}" opacity="0.85" stroke="${theme.motifColors.secondary}" stroke-width="0.8" />
      <path d="M -22 10 Q -5 2, 8 10 Q -8 16, -22 10 Z" fill="${theme.motifColors.primary}" />
      <path d="M 8 10 Q 18 8, 22 2 Q 18 12, 8 10 Z" fill="${theme.motifColors.primary}" />
      <circle cx="22" cy="2" r="2" fill="${theme.motifColors.accent}" />
      <line x1="22" y1="2" x2="28" y2="4" stroke="${theme.motifColors.secondary}" stroke-width="1" />
    </g>
  </g>
`;

export const renderCinnabarRedCenterpiece = (_theme: TableclothTheme): string => `
  <g id="centerpieceCinnabarRed" transform="translate(280, 80)">
    <circle cx="0" cy="0" r="25" fill="#450a0a" stroke="url(#goldFringeFull)" stroke-width="2.5" />
    <circle cx="0" cy="0" r="20" fill="none" stroke="#fef08a" stroke-width="1.2" stroke-dasharray="4,3" />
    <circle cx="0" cy="0" r="7" fill="#fef08a" />
    <circle cx="0" cy="0" r="3" fill="#dc2626" />
  </g>
`;

export const getCinnabarRedDrapePath = (): string =>
  'M 0 52 L 560 52 L 560 112 Q 490 122 420 112 Q 350 124 280 124 Q 210 124 140 112 Q 70 122 0 112 Z';
