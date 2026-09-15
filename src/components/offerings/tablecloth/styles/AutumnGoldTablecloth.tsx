/**
 * @file AutumnGoldTablecloth.tsx
 * @description 【秋香金】宫廷织锦云纹金线刺绣桌布组件。
 */
import React from 'react';
import { TableclothTheme } from '../types';

export const autumnGoldTheme: TableclothTheme = {
  name: '秋香金 · 宫廷织锦',
  materialName: '真丝贡缎 (宫廷重缎)',
  textureName: '黑金回形纹 · 富贵宝相牡丹提花',
  weavePatternId: 'weaveSatinSilk',
  borderPatternId: 'borderMeanderGold',
  motifType: 'peony',
  sheenOpacity: 0.38,
  weaveOpacity: 0.85,
  topGrad: ['#dca842', '#f5cf6d', '#e5b64c', '#ba8225'],
  drapeGrad: ['#e2b24e', '#f4cf70', '#ce9b32', '#a8741b', '#6e460b'],
  meanderBg: '#26170d',
  meanderStroke: '#f3cf7a',
  pipingStroke: '#fef08a',
  fringeGrad: ['#fef08a', '#f59e0b', '#78350f'],
  pendantBeadGrad: ['#fef08a', '#f59e0b', '#b45309', '#78350f'],
  cornerShadow: ['#543715', '#38220a', '#1f1103'],
  hemStroke: '#7a4f0c',
  tasselColor: { cord: '#fffbeb', bead: '#fef08a', beadStroke: '#d97706', shadow: 'rgba(20, 10, 4, 0.35)' },
  ribbonY: 104,
  ribbonH: 14,
  tasselY: 118,
  tasselLength: 14,
  tasselWidth: 2.6,
  motifColors: { primary: '#fff8f0', secondary: '#fff1f2', accent: '#f43f5e', leaf: '#606c38' },
};

export const AutumnGoldMotif: React.FC<{ theme: TableclothTheme }> = ({ theme }) => (
  <g transform="translate(340, 32) scale(0.65, 0.45)" opacity="0.82">
    <path d="M -30 -10 C -50 -20, -60 5, -35 15 C -20 15, -20 -5, -30 -10 Z" fill={theme.motifColors.leaf} opacity="0.75" />
    <path d="M 30 -5 C 55 -15, 60 12, 38 18 C 25 15, 22 -2, 30 -5 Z" fill={theme.motifColors.leaf} opacity="0.75" />
    <path d="M -22 10 C -35 25, 0 35, 22 15 C 30 5, -5 2, -22 10 Z" fill={theme.motifColors.primary} stroke={theme.motifColors.secondary} strokeWidth="1" />
    <path d="M -28 -5 C -40 12, -15 20, 0 8 C 15 20, 35 10, 25 -8 C 10 -18, -15 -18, -28 -5 Z" fill={theme.motifColors.secondary} stroke={theme.motifColors.accent} strokeWidth="1.2" />
    <ellipse cx="0" cy="0" rx="14" ry="9" fill={theme.motifColors.accent} opacity="0.5" />
    <circle cx="-2" cy="-1" r="5" fill={theme.motifColors.accent} opacity="0.85" />
    <circle cx="0" cy="0" r="2.5" fill={theme.pipingStroke} />
  </g>
);

export const AutumnGoldCenterpiece: React.FC<{ theme: TableclothTheme }> = ({ theme }) => (
  <g id="centerpieceAutumnGold" transform="translate(280, 80)">
    <ellipse cx="0" cy="0" rx="26" ry="22" fill="#2a1808" stroke="url(#goldFringeFull)" strokeWidth="2.5" />
    <ellipse cx="0" cy="0" rx="22" ry="18" fill="none" stroke="#fef08a" strokeWidth="1" strokeDasharray="3,2" />
    <g transform="scale(0.85)">
      <path d="M -12 6 Q 0 -8, 12 6 Q 0 16, -12 6 Z" fill="#caa262" stroke="#4a2c17" strokeWidth="0.8" />
      <circle cx="0" cy="4" r="3" fill="#fef08a" />
      <circle cx="-6" cy="7" r="2.2" fill="#f59e0b" />
      <circle cx="6" cy="7" r="2.2" fill="#f59e0b" />
    </g>
  </g>
);

export const getAutumnGoldDrapePath = () =>
  'M 0 52 L 560 52 L 560 116 Q 525 122 490 116 Q 455 122 420 116 Q 385 122 350 116 Q 315 122 280 118 Q 245 122 210 116 Q 175 122 140 116 Q 105 122 70 116 Q 35 122 0 116 Z';
