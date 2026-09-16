/**
 * @file AutumnGoldTablecloth.tsx
 * @description 【暖念金绫】宫廷织锦金绫桌裙组件，完美还原动漫治愈系金绫经幡、万字回纹、中央黑金宝相徽章与垂密金流苏。
 */
import React from 'react';
import { TableclothTheme } from '../types';

export const autumnGoldTheme: TableclothTheme = {
  name: '暖念金绫 · 宫廷织锦',
  materialName: '金绫织锦 (御制金绸)',
  textureName: '万字回纹 · 垂金丝苏 · 黑金宝相徽记',
  weavePatternId: 'weaveGoldBrocade',
  borderPatternId: 'borderMeanderGold',
  motifType: 'peony',
  sheenOpacity: 0.42,
  weaveOpacity: 0.65,
  topGrad: ['#d5ab4f', '#edd078', '#dfba5a', '#b58b32'],
  drapeGrad: ['#caa44e', '#e2c36a', '#c79f42', '#a67b26', '#6d4b0f'],
  meanderBg: '#caa44e',
  meanderStroke: '#281a0e',
  pipingStroke: '#fef08a',
  fringeGrad: ['#fef08a', '#eab308', '#78350f'],
  pendantBeadGrad: ['#fef08a', '#eab308', '#b45309', '#78350f'],
  cornerShadow: ['#543715', '#38220a', '#1f1103'],
  hemStroke: '#281a0e',
  tasselColor: {
    cord: '#fef08a',
    bead: '#eecb5c',
    beadStroke: '#281b10',
    shadow: 'rgba(20, 10, 4, 0.4)',
  },
  ribbonY: 104,
  ribbonH: 14,
  tasselY: 118,
  tasselLength: 13,
  tasselWidth: 3.2,
  motifColors: { primary: '#fff8f0', secondary: '#fff1f2', accent: '#f43f5e', leaf: '#606c38' },
};

export const AutumnGoldMotif: React.FC<{ theme: TableclothTheme }> = ({ theme }) => (
  <g id="motifAutumnGold" opacity="0.85">
    {/* 案面两侧淡金暗纹云水织锦 */}
    <path
      d="M 60 28 C 90 20, 140 38, 180 26 C 220 18, 260 36, 300 28"
      stroke="#fdf0c0"
      strokeWidth="1.2"
      fill="none"
      opacity="0.5"
    />
    <path
      d="M 280 28 C 320 20, 380 38, 430 26 C 470 18, 500 34, 520 28"
      stroke="#fdf0c0"
      strokeWidth="1.2"
      fill="none"
      opacity="0.5"
    />
  </g>
);

/**
 * 中央黑金漆金宝相三叶云纹徽章 (1:1 还原用户参考图中的中央徽记)
 * 沉黑漆金圆盘、金丝内环、三叶祥云宝相、中嵌朱砂红宝石
 */
export const AutumnGoldCenterpiece: React.FC<{ theme: TableclothTheme }> = () => (
  <g id="centerpieceAutumnGold" transform="translate(280, 84)">
    {/* 1. 底层沉稳阴影 */}
    <circle cx="0" cy="2" r="23" fill="#140c06" opacity="0.5" filter="blur(1.5px)" />

    {/* 2. 沉黑大漆黑铜主圆盘 */}
    <circle cx="0" cy="0" r="22.5" fill="#291c12" stroke="#1c130b" strokeWidth="1.6" />

    {/* 3. 内嵌璀璨金圈 */}
    <circle cx="0" cy="0" r="19" fill="#352418" stroke="#e8ca68" strokeWidth="1.4" />

    {/* 4. 放射状暗金色微晕 */}
    <circle cx="0" cy="0" r="16.5" fill="#422e1e" />

    {/* 5. 三叶祥云宝相纹 (三瓣向外舒展的金铜云纹) */}
    <g id="threeTrefoilClouds">
      {/* 顶部一瓣 */}
      <path
        d="M 0 0 C -4 -4, -10 -7, -10 -12 C -10 -16, -5 -18, 0 -18 C 5 -18, 10 -16, 10 -12 C 10 -7, 4 -4, 0 0 Z"
        fill="#cfa952"
        stroke="#1c130b"
        strokeWidth="1.0"
        strokeLinejoin="round"
      />
      {/* 左下一瓣 (旋转 120°) */}
      <path
        d="M 0 0 C -4 -4, -10 -7, -10 -12 C -10 -16, -5 -18, 0 -18 C 5 -18, 10 -16, 10 -12 C 10 -7, 4 -4, 0 0 Z"
        fill="#cfa952"
        stroke="#1c130b"
        strokeWidth="1.0"
        strokeLinejoin="round"
        transform="rotate(120)"
      />
      {/* 右下一瓣 (旋转 240°) */}
      <path
        d="M 0 0 C -4 -4, -10 -7, -10 -12 C -10 -16, -5 -18, 0 -18 C 5 -18, 10 -16, 10 -12 C 10 -7, 4 -4, 0 0 Z"
        fill="#cfa952"
        stroke="#1c130b"
        strokeWidth="1.0"
        strokeLinejoin="round"
        transform="rotate(240)"
      />
    </g>

    {/* 6. 中央朱砂红宝石核心 */}
    <circle cx="0" cy="0" r="4.8" fill="#a81c1c" stroke="#1c130b" strokeWidth="1.0" />
    <circle cx="0" cy="0" r="3.6" fill="#dc2626" />
    {/* 宝石高光白点 */}
    <circle cx="-1.2" cy="-1.2" r="1.1" fill="#ffffff" opacity="0.9" />
  </g>
);

export const getAutumnGoldDrapePath = () =>
  'M 0 52 L 560 52 L 560 118 L 0 118 Z';
