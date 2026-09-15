/**
 * @file EvergreenPineTablecloth.tsx
 * @description 【苍松翠】沉稳青绿暗纹典雅桌布组件。
 */
import React from 'react';
import { TableclothTheme } from '../types';

export const evergreenPineTheme: TableclothTheme = {
  name: '黛螺绿 · 松柏长青',
  materialName: '沉香宋锦 (岁寒苍松)',
  textureName: '八达晕锦边 · 苍松岁寒长青图',
  weavePatternId: 'weaveSongBrocade',
  borderPatternId: 'borderBadayunGreen',
  motifType: 'pine',
  sheenOpacity: 0.32,
  weaveOpacity: 0.9,
  topGrad: ['#304c3e', '#456a57', '#385848', '#22382c'],
  drapeGrad: ['#324e40', '#426654', '#2b4437', '#1c2f25', '#0e1a14'],
  meanderBg: '#14532d',
  meanderStroke: '#fef08a',
  pipingStroke: '#fde047',
  fringeGrad: ['#fef08a', '#d97706', '#713f12'],
  pendantBeadGrad: ['#fef08a', '#eab308', '#a16207', '#451a03'],
  cornerShadow: ['#14532d', '#052e16', '#02120a'],
  hemStroke: '#14532d',
  tasselColor: { cord: '#fef08a', bead: '#fde047', beadStroke: '#ca8a04', shadow: 'rgba(2, 18, 10, 0.45)' },
  ribbonY: 104,
  ribbonH: 14,
  tasselY: 118,
  tasselLength: 14,
  tasselWidth: 2.6,
  motifColors: { primary: '#fef08a', secondary: '#86efac', accent: '#fbbf24', leaf: '#4ade80' },
};

export const EvergreenPineMotif: React.FC<{ theme: TableclothTheme }> = ({ theme }) => (
  <g transform="translate(335, 33) scale(0.68, 0.45)" opacity="0.9">
    <polygon points="0,-18 12,-12 18,0 12,12 0,18 -12,12 -18,0 -12,-12" fill="none" stroke={theme.pipingStroke} strokeWidth="0.8" strokeDasharray="3,2" opacity="0.7" />
    <path d="M -40 18 Q -15 8, 10 5 Q 25 8, 40 2" stroke={theme.motifColors.leaf} strokeWidth="3" fill="none" strokeLinecap="round" />
    <g transform="translate(-15, 6)">
      {Array.from({ length: 9 }).map((_, i) => {
        const ang = -80 + i * 20;
        const rad = (ang * Math.PI) / 180;
        const x2 = Math.cos(rad) * 22;
        const y2 = Math.sin(rad) * 14;
        return <line key={i} x1="0" y1="0" x2={x2} y2={y2} stroke={theme.motifColors.accent} strokeWidth="1.2" opacity="0.85" />;
      })}
    </g>
    <g transform="translate(18, 2)">
      {Array.from({ length: 9 }).map((_, i) => {
        const ang = -70 + i * 20;
        const rad = (ang * Math.PI) / 180;
        const x2 = Math.cos(rad) * 20;
        const y2 = Math.sin(rad) * 12;
        return <line key={i} x1="0" y1="0" x2={x2} y2={y2} stroke={theme.motifColors.accent} strokeWidth="1.2" opacity="0.9" />;
      })}
    </g>
  </g>
);

export const EvergreenPineCenterpiece: React.FC<{ theme: TableclothTheme }> = () => (
  <g id="centerpieceEvergreenPine" transform="translate(280, 80)">
    <polygon points="0,-22 15,-15 22,0 15,15 0,22 -15,15 -22,0 -15,-15" fill="#14532d" stroke="url(#goldFringeFull)" strokeWidth="2.5" />
    <circle cx="0" cy="0" r="16" fill="none" stroke="#fef08a" strokeWidth="1" strokeDasharray="3,2" />
    <circle cx="0" cy="0" r="6" fill="#fef08a" />
  </g>
);

export const getEvergreenPineDrapePath = () =>
  'M 0 52 L 560 52 L 560 114 L 520 118 L 480 112 L 440 118 L 400 112 L 360 118 L 320 112 L 280 120 L 240 112 L 200 118 L 160 112 L 120 118 L 80 112 L 40 118 L 0 114 Z';
