/**
 * @file AutumnGoldTablecloth.ts
 * @description 【暖念金绫】宫廷织锦金绫桌裙纯 SVG 模板生成器。
 */
import { TableclothTheme } from '../types';

export const autumnGoldTheme: TableclothTheme = {
  name: '暖念金绫 · 宫廷织锦',
  materialName: '竹黄织锦 (祭祀稻席)',
  textureName: '万字回纹 · 垂金丝苏 · 黑金宝相徽记',
  weavePatternId: 'weaveGoldBrocade',
  borderPatternId: 'borderMeanderGold',
  motifType: 'peony',
  sheenOpacity: 0.04,
  weaveOpacity: 0.45,
  topGrad: ['#c4a84e', '#d8bc62', '#c0a44c', '#9e8238'],
  drapeGrad: ['#c4a44a', '#d6b85e', '#c09636', '#a07820', '#6e500e'],
  meanderBg: '#1e1208',
  meanderStroke: '#d0a840',
  pipingStroke: '#d4ae52',
  fringeGrad: ['#e0bf6a', '#c89840', '#7a5010'],
  pendantBeadGrad: ['#e8c878', '#ccaa48', '#987020', '#60400a'],
  cornerShadow: ['#3e2508', '#261504', '#120900'],
  hemStroke: '#241608',
  tasselColor: {
    cord: '#c09038',
    bead: '#d4a84a',
    beadStroke: '#24160a',
    shadow: 'rgba(18, 8, 2, 0.5)',
  },
  ribbonY: 118,
  ribbonH: 16,
  tasselY: 134,
  tasselLength: 20,
  tasselWidth: 4.2,
  motifColors: { primary: '#fff8f0', secondary: '#fff1f2', accent: '#f43f5e', leaf: '#606c38' },
};

export const renderAutumnGoldMotif = (_theme: TableclothTheme): string => `
  <g id="motifAutumnGold" opacity="0.85">
    <path d="M 60 28 C 90 20, 140 38, 180 26 C 220 18, 260 36, 300 28" stroke="#fdf0c0" stroke-width="1.2" fill="none" opacity="0.5" />
    <path d="M 280 28 C 320 20, 380 38, 430 26 C 470 18, 500 34, 520 28" stroke="#fdf0c0" stroke-width="1.2" fill="none" opacity="0.5" />
  </g>
`;

export const renderAutumnGoldCenterpiece = (_theme: TableclothTheme): string => `
  <g id="centerpieceAutumnGold" transform="translate(280, 84)">
    <circle cx="0" cy="2" r="23" fill="#140c06" opacity="0.5" filter="blur(1.5px)" />
    <circle cx="0" cy="0" r="22.5" fill="#291c12" stroke="#1c130b" stroke-width="1.6" />
    <circle cx="0" cy="0" r="19" fill="#352418" stroke="#e8ca68" stroke-width="1.4" />
    <circle cx="0" cy="0" r="16.5" fill="#422e1e" />
    <g id="threeTrefoilClouds">
      <path d="M 0 0 C -4 -4, -10 -7, -10 -12 C -10 -16, -5 -18, 0 -18 C 5 -18, 10 -16, 10 -12 C 10 -7, 4 -4, 0 0 Z" fill="#cfa952" stroke="#1c130b" stroke-width="1.0" stroke-linejoin="round" />
      <path d="M 0 0 C -4 -4, -10 -7, -10 -12 C -10 -16, -5 -18, 0 -18 C 5 -18, 10 -16, 10 -12 C 10 -7, 4 -4, 0 0 Z" fill="#cfa952" stroke="#1c130b" stroke-width="1.0" stroke-linejoin="round" transform="rotate(120)" />
      <path d="M 0 0 C -4 -4, -10 -7, -10 -12 C -10 -16, -5 -18, 0 -18 C 5 -18, 10 -16, 10 -12 C 10 -7, 4 -4, 0 0 Z" fill="#cfa952" stroke="#1c130b" stroke-width="1.0" stroke-linejoin="round" transform="rotate(240)" />
    </g>
    <circle cx="0" cy="0" r="4.8" fill="#a81c1c" stroke="#1c130b" stroke-width="1.0" />
    <circle cx="0" cy="0" r="3.6" fill="#dc2626" />
    <circle cx="-1.2" cy="-1.2" r="1.1" fill="#ffffff" opacity="0.9" />
  </g>
`;

export const getAutumnGoldDrapePath = (): string =>
  'M 0 52 L 560 52 L 560 118 L 0 118 Z';
