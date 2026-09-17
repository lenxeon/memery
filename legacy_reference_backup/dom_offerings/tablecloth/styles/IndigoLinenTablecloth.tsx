/**
 * @file IndigoLinenTablecloth.tsx
 * @description 【靛青蓝】禅意粗麻暗纹质朴桌布组件。
 */
import React from 'react';
import { TableclothTheme } from '../types';

export const indigoLinenTheme: TableclothTheme = {
  name: '靛青蓝 · 禅意粗麻',
  materialName: '天然苎麻 (粗纺植物染)',
  textureName: '素白抽纱边 · 蓝染水墨幽兰',
  weavePatternId: 'weaveRoughLinen',
  borderPatternId: 'borderDrawnThread',
  motifType: 'orchid',
  sheenOpacity: 0.12,
  weaveOpacity: 0.95,
  topGrad: ['#3e526a', '#546b86', '#465b75', '#2c3e55'],
  drapeGrad: ['#3d5169', '#4d6480', '#35485f', '#243447', '#152130'],
  meanderBg: '#1e293b',
  meanderStroke: '#f8fafc',
  pipingStroke: '#ffffff',
  fringeGrad: ['#ffffff', '#cbd5e1', '#64748b'],
  pendantBeadGrad: ['#ffffff', '#cbd5e1', '#94a3b8', '#475569'],
  cornerShadow: ['#1e293b', '#0f172a', '#020617'],
  hemStroke: '#1e293b',
  tasselColor: { cord: '#ffffff', bead: '#f8fafc', beadStroke: '#94a3b8', shadow: 'rgba(2, 6, 23, 0.45)' },
  ribbonY: 102,
  ribbonH: 12,
  tasselY: 114,
  tasselLength: 16,
  tasselWidth: 2.2,
  motifColors: { primary: '#ffffff', secondary: '#93c5fd', accent: '#38bdf8', leaf: '#86efac' },
};

export const IndigoLinenMotif: React.FC<{ theme: TableclothTheme }> = ({ theme }) => (
  <g transform="translate(330, 33) scale(0.7, 0.45)" opacity="0.85">
    <ellipse cx="0" cy="0" rx="55" ry="16" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" strokeDasharray="5,4" />
    <ellipse cx="0" cy="0" rx="35" ry="10" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1" strokeDasharray="3,3" />
    <path d="M -40 18 Q -10 -15, 35 -12 Q 10 -5, -40 18 Z" fill={theme.motifColors.leaf} opacity="0.85" />
    <path d="M -30 18 Q 0 -22, 50 -5 Q 15 2, -30 18 Z" fill={theme.motifColors.leaf} opacity="0.75" />
    <path d="M -20 18 Q -35 -2, -50 -10 Q -25 5, -20 18 Z" fill={theme.motifColors.leaf} opacity="0.65" />
    <path d="M 20 -8 Q 30 -22, 35 -10 Q 38 2, 20 -8 Z" fill={theme.motifColors.primary} stroke={theme.motifColors.accent} strokeWidth="0.8" />
    <path d="M 22 -6 Q 10 -16, 28 -12 Q 32 0, 22 -6 Z" fill={theme.motifColors.primary} stroke={theme.motifColors.accent} strokeWidth="0.8" />
    <circle cx="26" cy="-8" r="2.2" fill={theme.motifColors.accent} />
  </g>
);

export const IndigoLinenCenterpiece: React.FC<{ theme: TableclothTheme }> = () => (
  <g id="centerpieceIndigoLinen" transform="translate(280, 80)">
    <circle cx="0" cy="0" r="28" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.8" strokeDasharray="4,3" />
    <circle cx="0" cy="0" r="20" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeDasharray="3,2" />
    <circle cx="0" cy="0" r="12" fill="rgba(17, 26, 38, 0.6)" stroke="#ffffff" strokeWidth="1.4" />
    
    <path d="M 0 0 C -12 -12, -24 -4, -16 6 C -10 12, -2 4, 0 0 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
    <path d="M 0 0 C 12 -12, 24 -4, 16 6 C 10 12, 2 4, 0 0 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
    <path d="M 0 0 C -10 10, -18 18, -8 22 C -2 18, -1 6, 0 0 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="0.8" />
    <path d="M 0 0 C 10 10, 18 18, 8 22 C 2 18, 1 6, 0 0 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="0.8" />
    <circle cx="0" cy="0" r="4.5" fill="#ffffff" stroke="#64748b" strokeWidth="1.2" />
    <circle cx="0" cy="0" r="2" fill="#38bdf8" />
  </g>
);

export const getIndigoLinenDrapePath = () => 'M 0 52 L 560 52 L 560 114 L 0 114 Z';
