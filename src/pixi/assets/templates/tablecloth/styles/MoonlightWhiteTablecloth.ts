/**
 * @file MoonlightWhiteTablecloth.ts
 * @description 【月魄白】出尘素绢银丝镶边桌布纯 SVG 模板生成器。
 */
import { TableclothTheme } from '../types';

export const moonlightWhiteTheme: TableclothTheme = {
  name: '月魄白 · 出尘素绢',
  materialName: '冰丝生绢 (月华流光)',
  textureName: '素银如意纹 · 清风修竹水墨影',
  weavePatternId: 'weaveSilkRaw',
  borderPatternId: 'borderRuyiSilver',
  motifType: 'bamboo',
  sheenOpacity: 0.45,
  weaveOpacity: 0.82,
  topGrad: ['#eae7df', '#fbf9f4', '#f1eee6', '#ded9ce'],
  drapeGrad: ['#edeae2', '#fbf9f5', '#ded9cf', '#c8c2b5', '#9e9686'],
  meanderBg: '#292524',
  meanderStroke: '#ffffff',
  pipingStroke: '#ffffff',
  fringeGrad: ['#ffffff', '#e7e5e4', '#78716c'],
  pendantBeadGrad: ['#ffffff', '#f5f5f4', '#d6d3d1', '#78716c'],
  cornerShadow: ['#44403c', '#292524', '#0c0a09'],
  hemStroke: '#a8a29e',
  tasselColor: { cord: '#ffffff', bead: '#fafaf9', beadStroke: '#a8a29e', shadow: 'rgba(28, 25, 23, 0.4)' },
  ribbonY: 104,
  ribbonH: 12,
  tasselY: 116,
  tasselLength: 14,
  tasselWidth: 2.2,
  motifColors: { primary: '#ffffff', secondary: '#e7e5e4', accent: '#78716c', leaf: '#57534e' },
};

export const renderMoonlightWhiteMotif = (theme: TableclothTheme): string => `
  <g transform="translate(330, 32) scale(0.65, 0.45)" opacity="0.85">
    <ellipse cx="0" cy="0" rx="42" ry="14" fill="rgba(255,255,255,0.6)" />
    <line x1="-15" y1="22" x2="-8" y2="-20" stroke="${theme.motifColors.leaf}" stroke-width="3" stroke-linecap="round" opacity="0.65" />
    <circle cx="-11.5" cy="1" r="2" fill="${theme.motifColors.secondary}" />
    <line x1="12" y1="24" x2="18" y2="-18" stroke="${theme.motifColors.leaf}" stroke-width="2.5" stroke-linecap="round" opacity="0.75" />
    <circle cx="15" cy="3" r="1.8" fill="${theme.motifColors.secondary}" />
    <path d="M -8 -15 Q 10 -25, 20 -15 Q 5 -12, -8 -15 Z" fill="${theme.motifColors.leaf}" opacity="0.8" />
    <path d="M -10 -5 Q -32 -12, -45 -5 Q -25 0, -10 -5 Z" fill="${theme.motifColors.leaf}" opacity="0.7" />
    <path d="M 16 -10 Q 38 -20, 48 -10 Q 30 -6, 16 -10 Z" fill="${theme.motifColors.leaf}" opacity="0.8" />
    <path d="M 18 0 Q 40 5, 45 15 Q 30 8, 18 0 Z" fill="${theme.motifColors.leaf}" opacity="0.75" />
    <path d="M -12 8 Q 5 18, 12 25 Q 0 15, -12 8 Z" fill="${theme.motifColors.leaf}" opacity="0.7" />
  </g>
`;

export const renderMoonlightWhiteCenterpiece = (_theme: TableclothTheme): string => `
  <g id="centerpieceMoonlightWhite" transform="translate(280, 80)">
    <circle cx="0" cy="0" r="24" fill="#292524" stroke="#ffffff" stroke-width="2" />
    <circle cx="0" cy="0" r="18" fill="none" stroke="#e7e5e4" stroke-width="1" stroke-dasharray="3,2" />
    <circle cx="0" cy="0" r="6" fill="#ffffff" />
  </g>
`;

export const getMoonlightWhiteDrapePath = (): string => 'M 0 52 L 560 52 L 560 112 Q 280 116 0 112 Z';
