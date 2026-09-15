import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SceneItem, SceneItemId, LightingSettings, EntityTypeId, GameItemData, TableclothStyle } from '../types';
import { itemRegistry } from '../game/factories/AbstractItemFactory';
import { sound } from '../utils/audio';
import { RotateCcw } from 'lucide-react';


export interface TableclothTheme {
  name: string;
  materialName: string;
  textureName: string;
  weavePatternId: string;
  borderPatternId: string;
  motifType: 'peony' | 'orchid' | 'crane' | 'bamboo' | 'pine' | 'lotus';
  sheenOpacity: number;
  weaveOpacity: number;
  topGrad: [string, string, string, string];
  drapeGrad: [string, string, string, string, string];
  meanderBg: string;
  meanderStroke: string;
  pipingStroke: string;
  fringeGrad: [string, string, string];
  pendantBeadGrad: [string, string, string, string];
  cornerShadow: [string, string, string];
  hemStroke: string;
  tasselColor: {
    cord: string;
    bead: string;
    beadStroke: string;
    shadow: string;
  };
  ribbonY: number;
  ribbonH: number;
  tasselY: number;
  tasselLength: number;
  tasselWidth: number;
  motifColors: {
    primary: string;
    secondary: string;
    accent: string;
    leaf: string;
  };
}

export const TABLECLOTH_THEMES: Record<TableclothStyle, TableclothTheme> = {
  autumn_gold: {
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
  },
  indigo_linen: {
    name: '靛青蓝 · 禅意粗麻',
    materialName: '苎麻竹节布 (质朴粗麻)',
    textureName: '素白抽纱边 · 水墨幽兰与扎染波纹',
    weavePatternId: 'weaveCoarseLinen',
    borderPatternId: 'borderIndigoHemstitch',
    motifType: 'orchid',
    sheenOpacity: 0.10, // 粗麻无塑料反光，真实哑光质朴
    weaveOpacity: 0.98, // 明显可见的麻丝竹节交错
    topGrad: ['#3b4d66', '#4e6584', '#34455c', '#233144'],
    drapeGrad: ['#384a62', '#4b6280', '#2d3d52', '#1f2b3b', '#101721'],
    meanderBg: '#111a26',
    meanderStroke: '#e2e8f0',
    pipingStroke: '#f1f5f9',
    fringeGrad: ['#ffffff', '#e2e8f0', '#94a3b8'], // 本白粗棉排穗，复刻图1
    pendantBeadGrad: ['#93c5fd', '#3b82f6', '#1d4ed8', '#1e3a8a'],
    cornerShadow: ['#182230', '#0e1520', '#03060a'],
    hemStroke: '#1b2738',
    tasselColor: { cord: '#ffffff', bead: '#ffffff', beadStroke: '#64748b', shadow: 'rgba(5, 10, 20, 0.45)' },
    ribbonY: 100,
    ribbonH: 14,
    tasselY: 114,
    tasselLength: 18, // 18px 长本白粗棉排穗，复刻图1极显眼！
    tasselWidth: 3.4,
    motifColors: { primary: '#f8fafc', secondary: '#cbd5e1', accent: '#38bdf8', leaf: '#475569' },
  },
  cinnabar_red: {
    name: '朱砂红 · 吉祥华彩',
    materialName: '重工红呢 (密绒漳缎)',
    textureName: '泥金万字锦 · 双鹤衔芝如意图',
    weavePatternId: 'weaveVelvetWool',
    borderPatternId: 'borderWanFretwork',
    motifType: 'crane',
    sheenOpacity: 0.22,
    weaveOpacity: 0.90,
    topGrad: ['#b93839', '#d94d4e', '#af2f30', '#871d1e'],
    drapeGrad: ['#bd3c3d', '#db5455', '#a02b2c', '#79191a', '#4c0c0d'],
    meanderBg: '#2a0c0d',
    meanderStroke: '#fcd34d',
    pipingStroke: '#fef08a',
    fringeGrad: ['#fef08a', '#dc2626', '#7f1d1d'],
    pendantBeadGrad: ['#fca5a5', '#ef4444', '#b91c1c', '#7f1d1d'],
    cornerShadow: ['#450a0a', '#280505', '#140101'],
    hemStroke: '#7f1d1d',
    tasselColor: { cord: '#fffbeb', bead: '#fcd34d', beadStroke: '#b91c1c', shadow: 'rgba(25, 5, 5, 0.45)' },
    ribbonY: 100,
    ribbonH: 14,
    tasselY: 114,
    tasselLength: 15,
    tasselWidth: 2.8,
    motifColors: { primary: '#ffffff', secondary: '#fef08a', accent: '#ef4444', leaf: '#d97706' },
  },
  moonlight_white: {
    name: '月魄白 · 出尘素绢',
    materialName: '冰丝生绢 (轻盈绉绢)',
    textureName: '素银如意纹 · 月下修竹水墨影',
    weavePatternId: 'weaveSheerCrepe',
    borderPatternId: 'borderSilverRuyi',
    motifType: 'bamboo',
    sheenOpacity: 0.30,
    weaveOpacity: 0.82,
    topGrad: ['#f5f3ec', '#ffffff', '#edeae1', '#d9d4c7'],
    drapeGrad: ['#eeebe2', '#fcfbf8', '#ded8cc', '#c7c0b0', '#99907f'],
    meanderBg: '#3b3732',
    meanderStroke: '#f5f5f4',
    pipingStroke: '#ffffff',
    fringeGrad: ['#ffffff', '#f1f5f9', '#cbd5e1'],
    pendantBeadGrad: ['#ffffff', '#f8fafc', '#cbd5e1', '#64748b'],
    cornerShadow: ['#44403c', '#292524', '#0c0a09'],
    hemStroke: '#78716c',
    tasselColor: { cord: '#ffffff', bead: '#f8fafc', beadStroke: '#94a3b8', shadow: 'rgba(30, 25, 20, 0.25)' },
    ribbonY: 98,
    ribbonH: 14,
    tasselY: 112,
    tasselLength: 14,
    tasselWidth: 2.2,
    motifColors: { primary: '#ffffff', secondary: '#e2e8f0', accent: '#94a3b8', leaf: '#64748b' },
  },
  evergreen_pine: {
    name: '黛螺绿 · 松柏长青',
    materialName: '沉香宋锦 (菱格重织)',
    textureName: '八达晕金边 · 岁寒苍松长青图',
    weavePatternId: 'weaveSongBrocade',
    borderPatternId: 'borderSongRosette',
    motifType: 'pine',
    sheenOpacity: 0.26,
    weaveOpacity: 0.88,
    topGrad: ['#335242', '#456b56', '#2c4739', '#1e3328'],
    drapeGrad: ['#385a49', '#4d7560', '#304f3f', '#223a2d', '#12231a'],
    meanderBg: '#111f17',
    meanderStroke: '#eab308',
    pipingStroke: '#fef08a',
    fringeGrad: ['#fef08a', '#16a34a', '#14532d'],
    pendantBeadGrad: ['#86efac', '#22c55e', '#15803d', '#14532d'],
    cornerShadow: ['#14221a', '#0a140f', '#020504'],
    hemStroke: '#14532d',
    tasselColor: { cord: '#fffbeb', bead: '#fef08a', beadStroke: '#15803d', shadow: 'rgba(10, 20, 15, 0.4)' },
    ribbonY: 102,
    ribbonH: 14,
    tasselY: 116,
    tasselLength: 15,
    tasselWidth: 2.6,
    motifColors: { primary: '#f0fdf4', secondary: '#bbf7d0', accent: '#22c55e', leaf: '#15803d' },
  },
  sandalwood_purple: {
    name: '紫檀金 · 沉香庄严',
    materialName: '盘金缂丝 (捻金重缎)',
    textureName: '盛唐卷草连珠 · 宝相金莲曼荼罗',
    weavePatternId: 'weaveKesiGold',
    borderPatternId: 'borderTangLotus',
    motifType: 'lotus',
    sheenOpacity: 0.45,
    weaveOpacity: 0.92,
    topGrad: ['#593a52', '#724c69', '#4f3349', '#3b2135'],
    drapeGrad: ['#5f3e57', '#785170', '#4e3047', '#3c2035', '#220f1e'],
    meanderBg: '#210e1e',
    meanderStroke: '#fbbf24',
    pipingStroke: '#fef08a',
    fringeGrad: ['#fef08a', '#a855f7', '#581c87'],
    pendantBeadGrad: ['#d8b4fe', '#a855f7', '#7e22ce', '#3b0764'],
    cornerShadow: ['#2e1026', '#1a0815', '#0a0208'],
    hemStroke: '#581c87',
    tasselColor: { cord: '#fffbeb', bead: '#fef08a', beadStroke: '#7e22ce', shadow: 'rgba(25, 10, 25, 0.45)' },
    ribbonY: 102,
    ribbonH: 14,
    tasselY: 114,
    tasselLength: 16,
    tasselWidth: 2.8,
    motifColors: { primary: '#fef08a', secondary: '#f3e8ff', accent: '#d8b4fe', leaf: '#fbbf24' },
  },
};

const TableclothMotif: React.FC<{ motif: TableclothTheme['motifType']; theme: TableclothTheme }> = ({ motif, theme }) => {
  switch (motif) {
    case 'peony': // 富贵宝相牡丹提花 (秋香金)
      return (
        <g transform="translate(340, 32) scale(0.65, 0.45)" opacity="0.82">
          {/* Leaves */}
          <path d="M -30 -10 C -50 -20, -60 5, -35 15 C -20 15, -20 -5, -30 -10 Z" fill={theme.motifColors.leaf} opacity="0.75" />
          <path d="M 30 -5 C 55 -15, 60 12, 38 18 C 25 15, 22 -2, 30 -5 Z" fill={theme.motifColors.leaf} opacity="0.75" />
          {/* Petals */}
          <path d="M -22 10 C -35 25, 0 35, 22 15 C 30 5, -5 2, -22 10 Z" fill={theme.motifColors.primary} stroke={theme.motifColors.secondary} strokeWidth="1" />
          <path d="M -28 -5 C -40 12, -15 20, 0 8 C 15 20, 35 10, 25 -8 C 10 -18, -15 -18, -28 -5 Z" fill={theme.motifColors.secondary} stroke={theme.motifColors.accent} strokeWidth="1.2" />
          <ellipse cx="0" cy="0" rx="14" ry="9" fill={theme.motifColors.accent} opacity="0.5" />
          <circle cx="-2" cy="-1" r="5" fill={theme.motifColors.accent} opacity="0.85" />
          <circle cx="0" cy="0" r="2.5" fill={theme.pipingStroke} />
        </g>
      );
    case 'orchid': // 水墨幽兰与扎染波纹 (靛青蓝粗麻，完全复刻图1风韵)
      return (
        <g transform="translate(330, 33) scale(0.7, 0.45)" opacity="0.85">
          {/* Shibori ripples */}
          <ellipse cx="0" cy="0" rx="55" ry="16" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" strokeDasharray="5,4" />
          <ellipse cx="0" cy="0" rx="35" ry="10" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1" strokeDasharray="3,3" />
          {/* Graceful orchid leaves */}
          <path d="M -40 18 Q -10 -15, 35 -12 Q 10 -5, -40 18 Z" fill={theme.motifColors.leaf} opacity="0.85" />
          <path d="M -30 18 Q 0 -22, 50 -5 Q 15 2, -30 18 Z" fill={theme.motifColors.leaf} opacity="0.75" />
          <path d="M -20 18 Q -35 -2, -50 -10 Q -25 5, -20 18 Z" fill={theme.motifColors.leaf} opacity="0.65" />
          {/* White delicate orchid bloom */}
          <path d="M 20 -8 Q 30 -22, 35 -10 Q 38 2, 20 -8 Z" fill={theme.motifColors.primary} stroke={theme.motifColors.accent} strokeWidth="0.8" />
          <path d="M 22 -6 Q 10 -16, 28 -12 Q 32 0, 22 -6 Z" fill={theme.motifColors.primary} stroke={theme.motifColors.accent} strokeWidth="0.8" />
          <circle cx="26" cy="-8" r="2.2" fill={theme.motifColors.accent} />
        </g>
      );
    case 'crane': // 双鹤衔芝如意图 (朱砂红呢)
      return (
        <g transform="translate(335, 33) scale(0.68, 0.45)" opacity="0.9">
          {/* Lingzhi Auspicious Cloud */}
          <path d="M -35 8 Q -20 0, -5 8 Q 10 0, 25 8 Q 10 16, -5 12 Q -20 16, -35 8 Z" fill={theme.motifColors.secondary} opacity="0.6" stroke={theme.pipingStroke} strokeWidth="0.8" />
          {/* Flying White-Gold Crane */}
          <g transform="translate(10, -3)">
            <path d="M -15 6 Q 0 -22, 22 -16 Q 12 0, -15 6 Z" fill={theme.motifColors.primary} stroke={theme.motifColors.secondary} strokeWidth="1" />
            <path d="M -18 8 Q -10 -15, 6 -12 Q 0 4, -18 8 Z" fill={theme.motifColors.primary} opacity="0.85" stroke={theme.motifColors.secondary} strokeWidth="0.8" />
            <path d="M -22 10 Q -5 2, 8 10 Q -8 16, -22 10 Z" fill={theme.motifColors.primary} />
            <path d="M 8 10 Q 18 8, 22 2 Q 18 12, 8 10 Z" fill={theme.motifColors.primary} />
            <circle cx="22" cy="2" r="2" fill={theme.motifColors.accent} />
            <line x1="22" y1="2" x2="28" y2="4" stroke={theme.motifColors.secondary} strokeWidth="1" />
          </g>
        </g>
      );
    case 'bamboo': // 清风修竹水墨影 (月魄白素绢)
      return (
        <g transform="translate(330, 32) scale(0.65, 0.45)" opacity="0.85">
          <ellipse cx="0" cy="0" rx="42" ry="14" fill="rgba(255,255,255,0.6)" />
          {/* Bamboo stalks */}
          <line x1="-15" y1="22" x2="-8" y2="-20" stroke={theme.motifColors.leaf} strokeWidth="3" strokeLinecap="round" opacity="0.65" />
          <circle cx="-11.5" cy="1" r="2" fill={theme.motifColors.secondary} />
          <line x1="12" y1="24" x2="18" y2="-18" stroke={theme.motifColors.leaf} strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
          <circle cx="15" cy="3" r="1.8" fill={theme.motifColors.secondary} />
          {/* Bamboo leaves */}
          <path d="M -8 -15 Q 10 -25, 20 -15 Q 5 -12, -8 -15 Z" fill={theme.motifColors.leaf} opacity="0.8" />
          <path d="M -10 -5 Q -32 -12, -45 -5 Q -25 0, -10 -5 Z" fill={theme.motifColors.leaf} opacity="0.7" />
          <path d="M 16 -10 Q 38 -20, 48 -10 Q 30 -6, 16 -10 Z" fill={theme.motifColors.leaf} opacity="0.8" />
          <path d="M 18 0 Q 40 5, 45 15 Q 30 8, 18 0 Z" fill={theme.motifColors.leaf} opacity="0.75" />
          <path d="M -12 8 Q 5 18, 12 25 Q 0 15, -12 8 Z" fill={theme.motifColors.leaf} opacity="0.7" />
        </g>
      );
    case 'pine': // 苍松岁寒长青图 (黛螺绿宋锦)
      return (
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
    case 'lotus': // 宝相金莲曼荼罗 (紫檀金缂丝)
      return (
        <g transform="translate(330, 33) scale(0.66, 0.45)" opacity="0.95">
          <ellipse cx="0" cy="0" rx="46" ry="16" fill="none" stroke={theme.pipingStroke} strokeWidth="1" strokeDasharray="2,2" opacity="0.85" />
          <ellipse cx="0" cy="0" rx="36" ry="12" fill="none" stroke={theme.motifColors.secondary} strokeWidth="0.8" opacity="0.7" />
          <path d="M -40 2 Q -25 -14, -12 0 Q -25 10, -40 2 Z" fill={theme.motifColors.leaf} opacity="0.85" />
          <path d="M 40 2 Q 25 -14, 12 0 Q 25 10, 40 2 Z" fill={theme.motifColors.leaf} opacity="0.85" />
          <g>
            <path d="M 0 -18 C -10 -8, -10 6, 0 12 C 10 6, 10 -8, 0 -18 Z" fill={theme.motifColors.primary} stroke={theme.motifColors.secondary} strokeWidth="1" />
            <path d="M -15 -10 C -22 -2, -18 8, -5 10 C -8 0, -8 -5, -15 -10 Z" fill={theme.motifColors.secondary} stroke={theme.motifColors.primary} strokeWidth="0.8" />
            <path d="M 15 -10 C 22 -2, 18 8, 5 10 C 8 0, 8 -5, 15 -10 Z" fill={theme.motifColors.secondary} stroke={theme.motifColors.primary} strokeWidth="0.8" />
            <circle cx="0" cy="2" r="4.5" fill={theme.motifColors.accent} />
            <circle cx="0" cy="2" r="2.2" fill={theme.pipingStroke} />
          </g>
        </g>
      );
  }
};

const TableclothRoundel: React.FC<{ theme: TableclothTheme }> = ({ theme }) => {
  return (
    <g id="tableclothCenterRoundel">
      <ellipse cx="230" cy="34" rx="42" ry="9" fill="none" stroke={theme.pipingStroke} strokeWidth="0.8" strokeDasharray="3,2" opacity="0.7" />
      <path d="M 210 34 Q 230 27 250 34 Q 230 41 210 34 Z" fill="#ffffff" opacity={theme.sheenOpacity} />
    </g>
  );
};

export const getFrontDrapePath = (style?: TableclothStyle | string): string => {
  switch (style) {
    case 'indigo_linen':
      // 禅意粗麻：利落平直垂裁，复刻图1，垂至 y=114
      return 'M 0 52 L 560 52 L 560 114 L 0 114 Z';

    case 'cinnabar_red':
      // 吉祥华彩：三弧如意垂拱造型，正中深垂至 y=124，两侧优雅起伏
      return 'M 0 52 L 560 52 L 560 112 Q 490 122 420 112 Q 350 124 280 124 Q 210 124 140 112 Q 70 122 0 112 Z';

    case 'moonlight_white':
      // 出尘素绢：极简轻灵微弧直摆，垂至 y=112
      return 'M 0 52 L 560 52 L 560 112 Q 280 116 0 112 Z';

    case 'evergreen_pine':
      // 沉香宋锦：宋代多峰起伏下摆，y=112 ~ 118
      return 'M 0 52 L 560 52 L 560 114 L 520 118 L 480 112 L 440 118 L 400 112 L 360 118 L 320 112 L 280 120 L 240 112 L 200 118 L 160 112 L 120 118 L 80 112 L 40 118 L 0 114 Z';

    case 'sandalwood_purple':
      // 盛唐缂丝：阶梯式庄严御制围幔，正中垂至 y=122
      return 'M 0 52 L 560 52 L 560 110 L 460 110 L 455 116 L 375 116 L 370 122 L 190 122 L 185 116 L 105 116 L 100 110 L 0 110 Z';

    case 'autumn_gold':
    default:
      // 宫廷织锦：皇家波浪大曲裾褶摆，y=116 ~ 120
      return 'M 0 52 L 560 52 L 560 116 Q 525 122 490 116 Q 455 122 420 116 Q 385 122 350 116 Q 315 122 280 118 Q 245 122 210 116 Q 175 122 140 116 Q 105 122 70 116 Q 35 122 0 116 Z';
  }
};

const FrontValanceCenterpiece: React.FC<{ style?: TableclothStyle | string; theme: TableclothTheme }> = ({ style, theme }) => {
  switch (style) {
    case 'indigo_linen':
      // 粗麻正中心：图1同款！本白棉线传统中国蝴蝶盘扣 + 蓝染同心波纹扎染大圆环 + 双垂纯白棉穗
      return (
        <g id="centerpieceIndigoLinen" transform="translate(280, 80)">
          {/* Shibori Tie-dye Ripple Ring */}
          <circle cx="0" cy="0" r="28" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.8" strokeDasharray="4,3" />
          <circle cx="0" cy="0" r="20" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeDasharray="3,2" />
          <circle cx="0" cy="0" r="12" fill="rgba(17, 26, 38, 0.6)" stroke="#ffffff" strokeWidth="1.4" />
          
          {/* Traditional Butterfly Chinese Knot (本白粗棉盘扣) */}
          <path d="M 0 0 C -12 -12, -24 -4, -16 6 C -10 12, -2 4, 0 0 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          <path d="M 0 0 C 12 -12, 24 -4, 16 6 C 10 12, 2 4, 0 0 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          <path d="M 0 0 C -10 10, -18 18, -8 22 C -2 18, -1 6, 0 0 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="0.8" />
          <path d="M 0 0 C 10 10, 18 18, 8 22 C 2 18, 1 6, 0 0 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="0.8" />
          {/* Center Knot Core */}
          <circle cx="0" cy="0" r="4.5" fill="#ffffff" stroke="#64748b" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="2" fill="#38bdf8" />
          {/* Dangling White Cotton Twin Tassels */}
          <g transform="translate(-5, 18)">
            <line x1="0" y1="0" x2="0" y2="10" stroke="#ffffff" strokeWidth="1.6" />
            <circle cx="0" cy="9" r="2" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.6" />
            <polygon points="-2.5,10 2.5,10 3.5,24 -3.5,24" fill="#ffffff" />
          </g>
          <g transform="translate(5, 18)">
            <line x1="0" y1="0" x2="0" y2="10" stroke="#ffffff" strokeWidth="1.6" />
            <circle cx="0" cy="9" r="2" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.6" />
            <polygon points="-2.5,10 2.5,10 3.5,24 -3.5,24" fill="#ffffff" />
          </g>
        </g>
      );

    case 'cinnabar_red':
      // 重工红呢：泥金吉祥如意盘长结 + 翡翠白玉双挂佩
      return (
        <g id="centerpieceCinnabar" transform="translate(280, 82)">
          <circle cx="0" cy="0" r="27" fill="none" stroke="#fcd34d" strokeWidth="1.6" strokeDasharray="5,2" />
          <circle cx="0" cy="0" r="22" fill="#4c0c0d" stroke="#fef08a" strokeWidth="1.2" />
          <rect x="-10" y="-10" width="20" height="20" rx="3" fill="none" stroke="#fcd34d" strokeWidth="2.2" />
          <line x1="-10" y1="0" x2="10" y2="0" stroke="#fcd34d" strokeWidth="2" />
          <line x1="0" y1="-10" x2="0" y2="10" stroke="#fcd34d" strokeWidth="2" />
          <circle cx="0" cy="0" r="3" fill="#ef4444" stroke="#fef08a" strokeWidth="0.8" />
          <g transform="translate(0, 14)">
            <line x1="0" y1="0" x2="0" y2="10" stroke="#fcd34d" strokeWidth="1.4" />
            <ellipse cx="0" cy="14" rx="4.5" ry="7" fill="#86efac" stroke="#15803d" strokeWidth="0.8" />
            <polygon points="-3,22 3,22 4.5,34 -4.5,34" fill="#fef08a" />
          </g>
        </g>
      );

    case 'moonlight_white':
      // 出尘素绢：温润白玉璧 + 素银修竹月华轮
      return (
        <g id="centerpieceMoonlight" transform="translate(280, 80)">
          <circle cx="0" cy="0" r="26" fill="none" stroke="#e2e8f0" strokeWidth="1.4" />
          <circle cx="0" cy="0" r="21" fill="rgba(255,255,255,0.7)" stroke="#cbd5e1" strokeWidth="1" />
          <circle cx="0" cy="0" r="9" fill="#f5f3ec" stroke="#94a3b8" strokeWidth="0.8" />
          <path d="M -8 10 L 0 -10 L 8 8" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" />
          <ellipse cx="-4" cy="-3" rx="4.5" ry="1.8" fill="#94a3b8" transform="rotate(-30 -4 -3)" />
          <ellipse cx="5" cy="-1" rx="5" ry="2" fill="#94a3b8" transform="rotate(35 5 -1)" />
          <line x1="0" y1="9" x2="0" y2="28" stroke="#ffffff" strokeWidth="1.4" />
          <circle cx="0" cy="27" r="2" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.5" />
          <polygon points="-2.5,28 2.5,28 3.5,40 -3.5,40" fill="#f1f5f9" />
        </g>
      );

    case 'evergreen_pine':
      // 沉香宋锦：宋式八角菱花开光金纹章 + 双苍松金穗
      return (
        <g id="centerpieceEvergreen" transform="translate(280, 82)">
          <polygon points="0,-26 18,-18 26,0 18,18 0,26 -18,18 -26,0 -18,-18" fill="#12231a" stroke="#eab308" strokeWidth="1.8" />
          <polygon points="0,-21 14,-14 21,0 14,14 0,21 -14,14 -21,0 -14,-14" fill="none" stroke="#fef08a" strokeWidth="0.9" strokeDasharray="3,2" />
          <circle cx="0" cy="0" r="8" fill="#15803d" stroke="#fef08a" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="3.5" fill="#fef08a" />
          <g transform="translate(0, 26)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#fef08a" strokeWidth="1.4" />
            <circle cx="0" cy="7" r="2" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.6" />
            <polygon points="-3,8 3,8 4.5,22 -4.5,22" fill="#fef08a" />
          </g>
        </g>
      );

    case 'sandalwood_purple':
      // 盘金缂丝：盛唐宝相花金轮曼荼罗大徽章
      return (
        <g id="centerpieceSandalwood" transform="translate(280, 84)">
          <circle cx="0" cy="0" r="28" fill="none" stroke="#fbbf24" strokeWidth="1.8" />
          {Array.from({ length: 12 }).map((_, i) => {
            const rad = (i * 30 * Math.PI) / 180;
            return <circle key={i} cx={Math.cos(rad) * 28} cy={Math.sin(rad) * 28} r="1.8" fill="#fef08a" />;
          })}
          <circle cx="0" cy="0" r="22" fill="#220f1e" stroke="#fbbf24" strokeWidth="1.4" />
          <path d="M 0 -18 C 6 -10, 6 10, 0 18 C -6 10, -6 -10, 0 -18 Z" fill="#fbbf24" opacity="0.9" />
          <path d="M -18 0 C -10 6, 10 6, 18 0 C 10 -6, -10 -6, -18 0 Z" fill="#fbbf24" opacity="0.9" />
          <circle cx="0" cy="0" r="6" fill="#7e22ce" stroke="#fef08a" strokeWidth="1" />
          <circle cx="0" cy="0" r="2.8" fill="#fef08a" />
          <g transform="translate(0, 28)">
            <line x1="0" y1="0" x2="0" y2="10" stroke="#fef08a" strokeWidth="1.6" />
            <circle cx="0" cy="9" r="2.2" fill="#fbbf24" stroke="#7e22ce" strokeWidth="0.6" />
            <polygon points="-3.5,10 3.5,10 5,26 -5,26" fill="#fef08a" />
          </g>
        </g>
      );

    case 'autumn_gold':
    default:
      // 秋香金：皇家富贵宝相牡丹盛开刺绣大徽标 (复刻图2风华)
      return (
        <g id="centerpieceAutumnGold" transform="translate(280, 82)">
          <circle cx="0" cy="0" r="28" fill="none" stroke="#f3cf7a" strokeWidth="2" strokeDasharray="4,2" />
          <circle cx="0" cy="0" r="23" fill="#26170d" stroke="#fef08a" strokeWidth="1.2" />
          <ellipse cx="-8" cy="-5" rx="9" ry="7" fill="#e5b64c" opacity="0.8" />
          <ellipse cx="8" cy="-5" rx="9" ry="7" fill="#e5b64c" opacity="0.8" />
          <ellipse cx="0" cy="7" rx="10" ry="8" fill="#e5b64c" opacity="0.85" />
          <circle cx="0" cy="0" r="8" fill="#f43f5e" opacity="0.9" />
          <circle cx="0" cy="0" r="4.5" fill="#fef08a" />
          <circle cx="0" cy="0" r="2" fill="#78350f" />
          <g transform="translate(0, 26)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#fef08a" strokeWidth="1.6" />
            <circle cx="0" cy="7" r="2.2" fill="#f59e0b" stroke="#78350f" strokeWidth="0.6" />
            <polygon points="-3.2,8 3.2,8 4.6,24 -4.6,24" fill="#fef08a" />
          </g>
        </g>
      );
  }
};

interface DraggableAltarTableProps {
  items: Record<SceneItemId, SceneItem>;
  onUpdateItemPosition: (id: SceneItemId, pos: { x: number; y: number }) => void;
  onToggleItemLit: (id: SceneItemId) => void;
  onResetLayout: () => void;
  onRemoveItem?: (id: SceneItemId) => void;
  onToggleFruit?: (id: SceneItemId) => void;
  showTableRunner?: boolean;
  tableclothStyle?: TableclothStyle;
  showPetals?: boolean;
  lighting: LightingSettings;
  isArrangeMode: boolean;
}

interface AltarItemSlotProps {
  id: SceneItemId;
  item: SceneItem;
  isDragging: boolean;
  tableScale: number;
  shadowTiltX: number;
  isArrangeMode: boolean;
  lighting: LightingSettings;
  onPointerDown: (id: SceneItemId, e: React.PointerEvent) => void;
  onToggleItemLit: (id: SceneItemId) => void;
  onToggleFruit?: (id: SceneItemId) => void;
  onRemoveItem?: (id: SceneItemId) => void;
}

const AltarItemSlot = React.memo<AltarItemSlotProps>(({
  id,
  item,
  isDragging,
  tableScale,
  shadowTiltX,
  isArrangeMode,
  lighting,
  onPointerDown,
  onToggleItemLit,
  onToggleFruit,
  onRemoveItem,
}) => {
  const posX = item.position.x * tableScale;
  const posY = item.position.y * tableScale;
  const perspectiveScale = (1 + (item.position.y / 80) * 0.08) * Math.max(0.72, tableScale);

  const inferredType: EntityTypeId = (item.type || (
    id.startsWith('offered_flower') ? 'flower' :
    id.startsWith('vase') ? 'vase' :
    id.startsWith('candle') ? 'candle' :
    id === 'censer' ? 'censer' :
    id.startsWith('fruit') ? 'fruit' :
    id === 'tea_cups' ? 'tea_cups' :
    id === 'singing_bowl' ? 'singing_bowl' : 'flower'
  )) as EntityTypeId;
  const shadowProps = itemRegistry.getShadowProps({ ...item, type: inferredType }, tableScale);
  const shadowSize = shadowProps.size;
  const shadowSpread = shadowProps.spread;

  const entityItem: GameItemData = { ...item, type: inferredType };

  const content = itemRegistry.renderItem({
    item: entityItem,
    lighting,
    isDragging,
    onInteract: (action) => {
      if (action === 'toggle_lit') {
        onToggleItemLit(id);
      } else if (action === 'toggle_fruit') {
        onToggleFruit?.(id);
      }
    },
    onRemove: () => onRemoveItem?.(id),
  });

  return (
    <div
      onPointerDown={(e) => onPointerDown(id, e)}
      className={`absolute bottom-0 left-1/2 flex flex-col items-center pointer-events-auto cursor-grab active:cursor-grabbing ${
        isDragging ? 'z-50 scale-105' : 'z-20'
      }`}
      style={{
        transform: `translate3d(calc(-50% + ${posX}px), ${posY + (isDragging ? -10 : 0)}px, 0) scale(${perspectiveScale})`,
        transition: isDragging ? 'none' : 'transform 0.36s cubic-bezier(0.16, 1, 0.3, 1), scale 0.2s ease-out',
      }}
    >
      <div
        className="absolute bottom-1 rounded-[100%] pointer-events-none transition-all"
        style={{
          width: shadowSize,
          height: shadowSpread,
          background: 'radial-gradient(ellipse, rgba(50, 32, 16, 0.5) 0%, rgba(50, 32, 16, 0.2) 45%, transparent 75%)',
          transform: `translate(${shadowTiltX}px, ${4 + posY * 0.05}px) scale(${isDragging ? 1.3 : 1})`,
          opacity: isDragging ? 0.25 : 0.65,
        }}
      />
      {isArrangeMode && (
        <div className="absolute -inset-2 rounded-2xl border border-dashed border-amber-600/70 bg-amber-400/10 pointer-events-none animate-pulse" />
      )}
      {content}
    </div>
  );
});

export const DraggableAltarTableComponent: React.FC<DraggableAltarTableProps> = ({
  items,
  onUpdateItemPosition,
  onToggleItemLit,
  onResetLayout,
  onRemoveItem,
  onToggleFruit,
  showTableRunner = true,
  tableclothStyle = 'autumn_gold',
  showPetals = true,
  lighting,
  isArrangeMode,
}) => {
  const theme = TABLECLOTH_THEMES[tableclothStyle] || TABLECLOTH_THEMES.autumn_gold;
  const [activeDragId, setActiveDragId] = useState<SceneItemId | null>(null);
  const dragStartRef = useRef<{ startX: number; startY: number; itemX: number; itemY: number } | null>(null);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const [tableScale, setTableScale] = useState(1);

  // Responsive scale tracker ensures items stay locked to the tabletop across all screen widths
  useEffect(() => {
    if (!tableRef.current) return;
    const el = tableRef.current;
    const updateScale = () => {
      const w = el.getBoundingClientRect().width;
      if (w > 0) {
        setTableScale(Math.min(1, w / 560));
      }
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, []);

  // Table surface limits in px
  const BOUNDS_X = 220;
  const BOUNDS_Y_MIN = -18; // further back on the 3D table surface
  const BOUNDS_Y_MAX = 24;  // front edge of table surface

  // Magnetic snapping thresholds (unscaled units)
  const SNAP_CENTER_X = 14;   // Snap to central axis (X = 0) within 14px
  const SNAP_MIRROR_X = 12;   // Snap to symmetrical partner within 12px
  const SNAP_DEPTH_Y = 6;     // Snap to partner depth within 6px

  const [snapInfo, setSnapInfo] = useState<{ type: 'center' | 'mirror'; x: number } | null>(null);

  const itemsRef = useRef(items);
  itemsRef.current = items;

  const handlePointerDown = useCallback((id: SceneItemId, e: React.PointerEvent) => {
    e.stopPropagation();
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setActiveDragId(id);
    const it = itemsRef.current[id];
    if (it) {
      dragStartRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        itemX: it.position.x,
        itemY: it.position.y,
      };
    }
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!activeDragId || !dragStartRef.current) return;
    const safeScale = Math.max(0.4, tableScale);
    const dx = (e.clientX - dragStartRef.current.startX) / safeScale;
    const dy = (e.clientY - dragStartRef.current.startY) / safeScale;

    let newX = dragStartRef.current.itemX + dx;
    let newY = dragStartRef.current.itemY + dy;

    newX = Math.max(-BOUNDS_X, Math.min(BOUNDS_X, newX));
    newY = Math.max(BOUNDS_Y_MIN, Math.min(BOUNDS_Y_MAX, newY));

    let currentSnap: { type: 'center' | 'mirror'; x: number } | null = null;

    // 1. Center Axis Snap for Censer (or any item brought to center)
    if (Math.abs(newX) < SNAP_CENTER_X) {
      newX = 0;
      currentSnap = { type: 'center', x: 0 };
    }

    // 2. Symmetrical Mirror Snap for Candle Pairs
    if (activeDragId === 'candle_left' && items.candle_right) {
      const mirrorTargetX = -items.candle_right.position.x;
      if (Math.abs(newX - mirrorTargetX) < SNAP_MIRROR_X) {
        newX = mirrorTargetX;
        currentSnap = { type: 'mirror', x: newX };
      }
      if (Math.abs(newY - items.candle_right.position.y) < SNAP_DEPTH_Y) {
        newY = items.candle_right.position.y;
      }
    } else if (activeDragId === 'candle_right' && items.candle_left) {
      const mirrorTargetX = -items.candle_left.position.x;
      if (Math.abs(newX - mirrorTargetX) < SNAP_MIRROR_X) {
        newX = mirrorTargetX;
        currentSnap = { type: 'mirror', x: newX };
      }
      if (Math.abs(newY - items.candle_left.position.y) < SNAP_DEPTH_Y) {
        newY = items.candle_left.position.y;
      }
    }

    // 3. Symmetrical Mirror Snap for Vase Pairs
    if (activeDragId === 'vase_left' && items.vase_right) {
      const mirrorTargetX = -items.vase_right.position.x;
      if (Math.abs(newX - mirrorTargetX) < SNAP_MIRROR_X) {
        newX = mirrorTargetX;
        currentSnap = { type: 'mirror', x: newX };
      }
      if (Math.abs(newY - items.vase_right.position.y) < SNAP_DEPTH_Y) {
        newY = items.vase_right.position.y;
      }
    } else if (activeDragId === 'vase_right' && items.vase_left) {
      const mirrorTargetX = -items.vase_left.position.x;
      if (Math.abs(newX - mirrorTargetX) < SNAP_MIRROR_X) {
        newX = mirrorTargetX;
        currentSnap = { type: 'mirror', x: newX };
      }
      if (Math.abs(newY - items.vase_left.position.y) < SNAP_DEPTH_Y) {
        newY = items.vase_left.position.y;
      }
    }

    setSnapInfo(currentSnap);
    onUpdateItemPosition(activeDragId, { x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (activeDragId) {
      sound.playWoodPlacement();
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      setActiveDragId(null);
      dragStartRef.current = null;
      setSnapInfo(null);
    }
  };

  // Depth sort based on Y position (items with smaller Y are further back, rendered first)
  const sortedItemIds: SceneItemId[] = Object.keys(items)
    .sort((a, b) => (items[a]?.position.y || 0) - (items[b]?.position.y || 0));

  const isSymmetrical = 
    Math.abs(items.censer?.position.x || 0) <= 2 &&
    Math.abs((items.candle_left?.position.x || 0) + (items.candle_right?.position.x || 0)) <= 2 &&
    Math.abs((items.vase_left?.position.x || 0) + (items.vase_right?.position.x || 0)) <= 2;

  const sunAngle = lighting.sunAngle;
  const shadowTiltX = -sunAngle * 0.45;

  return (
    <div 
      className="relative w-full max-w-[560px] flex flex-col items-center justify-end select-none pointer-events-auto"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Symmetrical Reset Icon Button */}
      <div className="absolute -top-9 inset-x-0 flex justify-end px-2 pointer-events-auto z-40">
        <button
          type="button"
          onClick={onResetLayout}
          title="对称复位（花、烛、香对齐中轴）"
          aria-label="对称复位"
          className={`w-7 h-7 flex items-center justify-center rounded-full border shadow-xs transition-all cursor-pointer active:scale-90 ${
            isSymmetrical 
              ? 'bg-white/85 hover:bg-white text-stone-600 hover:text-stone-900 border-stone-200/80' 
              : 'bg-amber-50/95 hover:bg-amber-100 text-amber-800 border-amber-300/90 shadow-amber-500/20 animate-pulse'
          }`}
        >
          <RotateCcw size={13} className={isSymmetrical ? '' : 'text-amber-700'} />
        </button>
      </div>

      {/* Unified Responsive Table & Items Container */}
      <div 
        ref={tableRef}
        className="relative w-full aspect-[560/160] select-none pointer-events-none z-20"
      >
        {/* Layer A: Draggable Items locked to the 3D tabletop surface plane */}
        {/* At aspect ratio 560/160, the wooden tabletop top plane is at bottom-[71%] */}
        <div className="absolute bottom-[71%] left-0 w-full h-0 pointer-events-none z-30">
          {/* Sacred Center Axis Guide Line & Snap Indicator */}
          {(isArrangeMode || snapInfo !== null) && (
            <div className="absolute -top-36 bottom-0 left-1/2 -translate-x-1/2 w-0 pointer-events-none z-10 flex flex-col items-center">
              <div className="w-[1px] h-44 bg-gradient-to-b from-amber-400/0 via-amber-400/80 to-amber-500/0 border-r border-dashed border-amber-400/70" />
              {snapInfo && (
                <div className="absolute -top-7 px-2.5 py-0.5 rounded-full bg-stone-900/90 text-[11px] font-medium text-amber-200 border border-amber-400/50 backdrop-blur-xs whitespace-nowrap shadow-lg animate-in fade-in zoom-in-95 duration-150 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  {snapInfo.type === 'center' ? '已精准吸附中轴' : '已严格对称对齐'}
                </div>
              )}
            </div>
          )}

          {sortedItemIds.map((id) => {
            const item = items[id];
            if (!item) return null;

            return (
              <AltarItemSlot
                key={id}
                id={id}
                item={item}
                isDragging={activeDragId === id}
                tableScale={tableScale}
                shadowTiltX={shadowTiltX}
                isArrangeMode={isArrangeMode}
                lighting={lighting}
                onPointerDown={handlePointerDown}
                onToggleItemLit={onToggleItemLit}
                onToggleFruit={onToggleFruit}
                onRemoveItem={onRemoveItem}
              />
            );
          })}
        </div>

        {/* Layer B: Ultra-Realistic 3D Japanese Zen Wooden Altar Table (榻榻米供案) */}
        <svg 
          viewBox="0 0 560 160" 
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            {/* 1. Top Tabletop Surface Gradient (Sunlit warm blonde oak wood) */}
            <linearGradient id="woodTableTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f3e5d3" />
              <stop offset="25%" stopColor="#faecd8" />
              <stop offset="65%" stopColor="#eed7bf" />
              <stop offset="100%" stopColor="#dfc3a3" />
            </linearGradient>

            {/* 2. Top Edge Chamfer / Specular Highlight (The bright golden edge in reference image) */}
            <linearGradient id="bevelSpecularGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#eedcc7" />
              <stop offset="20%" stopColor="#fff8ee" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="80%" stopColor="#fff8ee" />
              <stop offset="100%" stopColor="#eedcc7" />
            </linearGradient>

            {/* 3. Front Vertical Tabletop Slab Face (Solid thick wood with fiber shading) */}
            <linearGradient id="frontSlabGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d8b997" />
              <stop offset="35%" stopColor="#caa47c" />
              <stop offset="80%" stopColor="#b68e65" />
              <stop offset="100%" stopColor="#96724a" />
            </linearGradient>

            {/* 4. Left & Right Tabletop Endgrain Cuts */}
            <linearGradient id="endgrainLeft" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d1b18e" />
              <stop offset="100%" stopColor="#9d7751" />
            </linearGradient>
            <linearGradient id="endgrainRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d1b18e" />
              <stop offset="100%" stopColor="#9d7751" />
            </linearGradient>

            {/* 5. Recessed Under-Apron Panel Gradient (Warm shadow with vertical wood grain) */}
            <linearGradient id="apronPanelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#755234" />
              <stop offset="15%" stopColor="#a37c56" />
              <stop offset="55%" stopColor="#be976f" />
              <stop offset="90%" stopColor="#aa835b" />
              <stop offset="100%" stopColor="#684729" />
            </linearGradient>

            {/* 6. Pedestal Legs Solid Blocks (Left and Right supports) */}
            <linearGradient id="legBlockGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8d6844" />
              <stop offset="30%" stopColor="#be966f" />
              <stop offset="70%" stopColor="#ca9f75" />
              <stop offset="100%" stopColor="#9b734c" />
            </linearGradient>

            {/* 7. Soft Ambient Floor Shadow Gradient (Zero blur penalty) */}
            <radialGradient id="tableFloorShadowGrad" cx="50%" cy="50%" rx="50%" ry="50%">
              <stop offset="0%" stopColor="#3a2211" stopOpacity="0.58" />
              <stop offset="55%" stopColor="#3a2211" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#3a2211" stopOpacity="0" />
            </radialGradient>

            {/* 8. Brocade Silk Table Runner Gradients (Backwards compatible) */}
            <linearGradient id="brocadeRunnerTop" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9a6e2e" />
              <stop offset="15%" stopColor="#d4a34b" />
              <stop offset="50%" stopColor="#f7d488" />
              <stop offset="85%" stopColor="#d4a34b" />
              <stop offset="100%" stopColor="#9a6e2e" />
            </linearGradient>
            <linearGradient id="brocadeRunnerFront" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ca9842" />
              <stop offset="35%" stopColor="#dfb25d" />
              <stop offset="75%" stopColor="#aa792c" />
              <stop offset="100%" stopColor="#6e4915" />
            </linearGradient>
            <linearGradient id="goldFringe" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>

            {/* ══════════════════════════════════════════════════════════════════
                1. 材质微纹理贴图库 (6大专属织物物理机理，彻底告别单调与塑料感)
               ══════════════════════════════════════════════════════════════════ */}

            {/* [材质 1]: 真丝重缎 (Satin Silk Weave) - 斜纹细密经纬缎光，典雅微反光 */}
            <pattern id="weaveSatinSilk" width="16" height="16" patternUnits="userSpaceOnUse">
              <rect width="16" height="16" fill="none" />
              <path d="M 0 0 L 16 16 M 0 8 L 8 16 M 8 0 L 16 8" stroke="rgba(255,255,255,0.28)" strokeWidth="1.2" />
              <line x1="0" y1="4" x2="16" y2="4" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" />
              <line x1="0" y1="12" x2="16" y2="12" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" />
            </pattern>

            {/* [材质 2]: 苎麻粗布 (Coarse Slub Linen Weave) - 粗粝竹节麻纱、孔隙交织，复刻参考图1 */}
            <pattern id="weaveCoarseLinen" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="none" />
              <rect x="0" y="0" width="20" height="10" fill="rgba(0,0,0,0.16)" />
              <rect x="0" y="10" width="20" height="10" fill="rgba(255,255,255,0.18)" />
              <rect x="0" y="0" width="10" height="20" fill="rgba(255,255,255,0.22)" />
              <rect x="10" y="0" width="10" height="20" fill="rgba(0,0,0,0.16)" />
              {/* Slub yarn nodules (麻丝竹节粗节与凹凸结子) */}
              <ellipse cx="5" cy="4" rx="4.5" ry="2" fill="rgba(255,255,255,0.45)" />
              <ellipse cx="15" cy="14" rx="4.8" ry="2.2" fill="rgba(0,0,0,0.32)" />
              <line x1="0" y1="3" x2="20" y2="3" stroke="rgba(0,0,0,0.3)" strokeWidth="1.4" />
              <line x1="0" y1="13" x2="20" y2="13" stroke="rgba(255,255,255,0.42)" strokeWidth="1.4" />
              <line x1="3" y1="0" x2="3" y2="20" stroke="rgba(255,255,255,0.42)" strokeWidth="1.4" />
              <line x1="13" y1="0" x2="13" y2="20" stroke="rgba(0,0,0,0.3)" strokeWidth="1.4" />
            </pattern>

            {/* [材质 3]: 重工红呢漳缎 (Velvet Plush Nap) - 密绒磨毛微粒质感，厚实温润 */}
            <pattern id="weaveVelvetWool" width="16" height="16" patternUnits="userSpaceOnUse">
              <rect width="16" height="16" fill="none" />
              <circle cx="4" cy="4" r="2.2" fill="rgba(255,255,255,0.25)" />
              <circle cx="12" cy="12" r="2.2" fill="rgba(255,255,255,0.22)" />
              <circle cx="12" cy="4" r="1.8" fill="rgba(0,0,0,0.22)" />
              <circle cx="4" cy="12" r="1.8" fill="rgba(0,0,0,0.22)" />
              <circle cx="8" cy="8" r="2.6" fill="rgba(255,220,120,0.32)" />
              <line x1="2" y1="6" x2="6" y2="2" stroke="rgba(255,255,255,0.2)" strokeWidth="1.1" />
              <line x1="10" y1="14" x2="14" y2="10" stroke="rgba(255,255,255,0.2)" strokeWidth="1.1" />
            </pattern>

            {/* [材质 4]: 冰丝生绢绉纱 (Sheer Crepe Organza) - 轻盈通透微横绉波，仙风道骨 */}
            <pattern id="weaveSheerCrepe" width="20" height="12" patternUnits="userSpaceOnUse">
              <rect width="20" height="12" fill="none" />
              <path d="M 0 3 Q 5 1, 10 3 T 20 3" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" />
              <path d="M 0 9 Q 5 7, 10 9 T 20 9" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1.0" />
              <line x1="5" y1="0" x2="5" y2="12" stroke="rgba(255,255,255,0.28)" strokeWidth="0.8" strokeDasharray="2,2" />
              <line x1="15" y1="0" x2="15" y2="12" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" strokeDasharray="2,2" />
            </pattern>

            {/* [材质 5]: 沉香宋锦菱格 (Song Brocade Diamond Twill) - 雅宋几何经纬互结提花骨架 */}
            <pattern id="weaveSongBrocade" width="24" height="24" patternUnits="userSpaceOnUse">
              <rect width="24" height="24" fill="none" />
              <polygon points="12,2 22,12 12,22 2,12" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4" />
              <circle cx="12" cy="12" r="2.6" fill="rgba(255,230,150,0.4)" />
              <line x1="0" y1="0" x2="24" y2="24" stroke="rgba(0,0,0,0.18)" strokeWidth="1.0" />
              <line x1="24" y1="0" x2="0" y2="24" stroke="rgba(0,0,0,0.18)" strokeWidth="1.0" />
            </pattern>

            {/* [材质 6]: 盘金缂丝捻金线 (Gold-Couching Kesi Brocade) - 金属线微凸棱脊与高光 */}
            <pattern id="weaveKesiGold" width="20" height="16" patternUnits="userSpaceOnUse">
              <rect width="20" height="16" fill="none" />
              <rect x="0" y="0" width="20" height="6" fill="rgba(255,215,0,0.24)" />
              <rect x="0" y="6" width="20" height="10" fill="rgba(0,0,0,0.22)" />
              <line x1="0" y1="3" x2="20" y2="3" stroke="rgba(255,245,170,0.8)" strokeWidth="1.6" />
              <line x1="0" y1="5" x2="20" y2="5" stroke="rgba(110,50,5,0.4)" strokeWidth="1.0" />
              <line x1="0" y1="11" x2="20" y2="11" stroke="rgba(255,245,170,0.5)" strokeWidth="1.2" />
              <line x1="5" y1="0" x2="5" y2="16" stroke="rgba(255,255,255,0.4)" strokeWidth="1.0" strokeDasharray="3,3" />
              <line x1="15" y1="0" x2="15" y2="16" stroke="rgba(255,255,255,0.4)" strokeWidth="1.0" strokeDasharray="3,3" />
            </pattern>

            {/* ══════════════════════════════════════════════════════════════════
                2. 边饰锦带贴图库 (6款各具风骨的传统经典织锦滚边)
               ══════════════════════════════════════════════════════════════════ */}

            {/* [边饰 1]: 黑金回纹锦带 (Autumn Gold Meander) */}
            <pattern id="borderMeanderGold" width="24" height="14" patternUnits="userSpaceOnUse">
              <rect width="24" height="14" fill="#26170d" />
              <path d="M 0 2 L 21 2 L 21 12 L 3 12 L 3 5.5 L 17 5.5 L 17 9 L 7 9" fill="none" stroke="#f3cf7a" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter" />
            </pattern>

            {/* [边饰 2]: 素白抽纱人字边 (Indigo Linen Hemstitch) - 对应图1素白编织边 */}
            <pattern id="borderIndigoHemstitch" width="20" height="14" patternUnits="userSpaceOnUse">
              <rect width="20" height="14" fill="#111a26" />
              <line x1="0" y1="2" x2="20" y2="2" stroke="#ffffff" strokeWidth="1.2" />
              <line x1="0" y1="12" x2="20" y2="12" stroke="#ffffff" strokeWidth="1.2" />
              <path d="M 0 7 L 5 2 L 10 7 L 15 2 L 20 7 M 0 7 L 5 12 L 10 7 L 15 12 L 20 7" fill="none" stroke="#ffffff" strokeWidth="1.6" />
            </pattern>

            {/* [边饰 3]: 泥金万字不到头锦纹 (Cinnabar Wan Fretwork) */}
            <pattern id="borderWanFretwork" width="24" height="14" patternUnits="userSpaceOnUse">
              <rect width="24" height="14" fill="#2a0c0d" />
              <path d="M 0 7 L 7 7 L 7 2 L 13 2 L 13 7 L 21 7 M 13 7 L 13 12 L 19 12" fill="none" stroke="#fcd34d" strokeWidth="1.8" strokeLinecap="square" />
            </pattern>

            {/* [边饰 4]: 素银如意流云纹 (Moonlight Silver Ruyi) */}
            <pattern id="borderSilverRuyi" width="24" height="14" patternUnits="userSpaceOnUse">
              <rect width="24" height="14" fill="#3b3732" />
              <path d="M 0 7 Q 6 2, 12 7 Q 18 12, 24 7" fill="none" stroke="#ffffff" strokeWidth="1.8" />
              <circle cx="12" cy="7" r="2.2" fill="#ffffff" />
            </pattern>

            {/* [边饰 5]: 宋式八达晕菱花金边 (Evergreen Song Rosette) */}
            <pattern id="borderSongRosette" width="24" height="14" patternUnits="userSpaceOnUse">
              <rect width="24" height="14" fill="#111f17" />
              <polygon points="6,7 12,2 18,7 12,12" fill="none" stroke="#eab308" strokeWidth="1.8" />
              <circle cx="12" cy="7" r="1.8" fill="#eab308" />
              <line x1="0" y1="7" x2="6" y2="7" stroke="#eab308" strokeWidth="1.2" />
              <line x1="18" y1="7" x2="24" y2="7" stroke="#eab308" strokeWidth="1.2" />
            </pattern>

            {/* [边饰 6]: 盛唐盘金连珠宝相卷草 (Sandalwood Tang Lotus & Pearl) */}
            <pattern id="borderTangLotus" width="24" height="14" patternUnits="userSpaceOnUse">
              <rect width="24" height="14" fill="#210e1e" />
              <circle cx="4" cy="7" r="2.2" fill="#fbbf24" />
              <circle cx="20" cy="7" r="2.2" fill="#fbbf24" />
              <path d="M 6 7 Q 12 2, 18 7 Q 12 12, 6 7 Z" fill="none" stroke="#fbbf24" strokeWidth="1.6" />
            </pattern>

            {/* ── Fabric Color Gradients (6大主题定制面料质感色彩) ── */}
            {/* 台面贡缎主色 */}
            <linearGradient id="brocadeGoldTop" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={theme.topGrad[0]} />
              <stop offset="25%" stopColor={theme.topGrad[1]} />
              <stop offset="65%" stopColor={theme.topGrad[2]} />
              <stop offset="100%" stopColor={theme.topGrad[3]} />
            </linearGradient>

            {/* 前垂围幔丝绸跌落光感 */}
            <linearGradient id="brocadeGoldDrape" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={theme.drapeGrad[0]} />
              <stop offset="15%" stopColor={theme.drapeGrad[1]} />
              <stop offset="60%" stopColor={theme.drapeGrad[2]} />
              <stop offset="88%" stopColor={theme.drapeGrad[3]} />
              <stop offset="100%" stopColor={theme.drapeGrad[4]} />
            </linearGradient>

            {/* 桌角自然对折阴影 */}
            <linearGradient id="cornerDropShadowLeft" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={theme.cornerShadow[0]} />
              <stop offset="70%" stopColor={theme.cornerShadow[1]} />
              <stop offset="100%" stopColor={theme.cornerShadow[2]} />
            </linearGradient>
            <linearGradient id="cornerDropShadowRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={theme.cornerShadow[0]} />
              <stop offset="70%" stopColor={theme.cornerShadow[1]} />
              <stop offset="100%" stopColor={theme.cornerShadow[2]} />
            </linearGradient>

            {/* 珠宝/琥珀玉珠吊坠高光渐变 */}
            <radialGradient id="amberPendantGrad" cx="35%" cy="30%" rx="65%" ry="65%">
              <stop offset="0%" stopColor={theme.pendantBeadGrad[0]} />
              <stop offset="35%" stopColor={theme.pendantBeadGrad[1]} />
              <stop offset="75%" stopColor={theme.pendantBeadGrad[2]} />
              <stop offset="100%" stopColor={theme.pendantBeadGrad[3]} />
            </radialGradient>

            {/* 下摆挂穗流苏渐变 */}
            <linearGradient id="goldFringeFull" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={theme.fringeGrad[0]} />
              <stop offset="60%" stopColor={theme.fringeGrad[1]} />
              <stop offset="100%" stopColor={theme.fringeGrad[2]} />
            </linearGradient>

            {/* 桌面丝绸光泽横向水波纹 */}
            <linearGradient id="tableclothSheenWave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="35%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="65%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* === UNDER-STRUCTURE (Recessed Base & Pedestal Legs) === */}
          {/* Base apron container: sits inward from x=55 to x=505, y=55 to y=135 */}
          <g id="tableBaseStructure">
            {/* Recessed Back Slat Panels (3 panels divided by 2 shadow grooves as in reference image) */}
            <rect x="58" y="55" width="444" height="80" rx="3" fill="url(#apronPanelGrad)" />

            {/* 3 vertical panels texture highlights */}
            <rect x="62" y="55" width="140" height="80" fill="rgba(255, 235, 205, 0.05)" />
            <rect x="210" y="55" width="140" height="80" fill="rgba(255, 235, 205, 0.07)" />
            <rect x="358" y="55" width="140" height="80" fill="rgba(255, 235, 205, 0.05)" />

            {/* 2 Dark Vertical Shadow Grooves between panels */}
            <line x1="205" y1="55" x2="205" y2="135" stroke="#48301c" strokeWidth="3" />
            <line x1="207" y1="55" x2="207" y2="135" stroke="#dfc09c" strokeWidth="1" opacity="0.6" />

            <line x1="353" y1="55" x2="353" y2="135" stroke="#48301c" strokeWidth="3" />
            <line x1="355" y1="55" x2="355" y2="135" stroke="#dfc09c" strokeWidth="1" opacity="0.6" />

            {/* Left Sturdy Pedestal Leg (厚实左立柱台墩) */}
            <rect x="52" y="55" width="48" height="82" rx="2" fill="url(#legBlockGrad)" />
            {/* Left leg front bevel highlight */}
            <line x1="53" y1="55" x2="53" y2="137" stroke="#edd4b8" strokeWidth="1.2" opacity="0.8" />
            {/* Left leg shadow corner */}
            <rect x="96" y="55" width="5" height="82" fill="#4d321c" opacity="0.45" />

            {/* Right Sturdy Pedestal Leg (厚实右立柱台墩) */}
            <rect x="460" y="55" width="48" height="82" rx="2" fill="url(#legBlockGrad)" />
            {/* Right leg front bevel highlight */}
            <line x1="461" y1="55" x2="461" y2="137" stroke="#edd4b8" strokeWidth="1.2" opacity="0.8" />
            {/* Right leg inner shadow */}
            <rect x="460" y="55" width="5" height="82" fill="#4d321c" opacity="0.45" />

            {/* Bottom Plinth Floor Contact Rail */}
            <rect x="52" y="132" width="456" height="5" rx="1" fill="#6e4c2b" />

            {/* Deep Ambient Occlusion Shadow cast under tabletop onto base */}
            <rect x="52" y="55" width="456" height="14" fill="#2d1b0d" opacity="0.65" />
          </g>

          {/* === UPPER TABLETOP SLAB (Thick Solid Wood with 3D Perspective Plane) === */}
          <g id="tableTopSlab">
            {/* 1. Perspective Top Surface Plane (where items rest) */}
            {/* Polygon with perspective: back width=536px (from x=12 to 548), front width=552px (from x=4 to 556) */}
            <polygon
              points="14,16 546,16 556,52 4,52"
              fill="url(#woodTableTopGrad)"
              stroke="#cfb290"
              strokeWidth="0.8"
            />

            {/* Top surface natural subtle wood grain lines */}
            <path d="M 25 24 Q 280 23 535 24" stroke="#e0c4a4" strokeWidth="0.9" fill="none" opacity="0.75" />
            <path d="M 18 33 Q 280 32 542 33" stroke="#e0c4a4" strokeWidth="1.0" fill="none" opacity="0.7" />
            <path d="M 12 42 Q 280 41 548 42" stroke="#e0c4a4" strokeWidth="1.1" fill="none" opacity="0.65" />

            {/* Top surface sunny sheen wash in center */}
            <ellipse cx="280" cy="34" rx="210" ry="14" fill="#fff9ef" opacity="0.35" />

            {/* ── Imperial Jacquard & Artisanal Tablecloth (真实材质织法 · 专属印花提花 · 3D桌角悬垂) ── */}
            {showTableRunner && (
              <g id="imperialTablecloth">
                {/* 1. Base Silk/Linen Drape Ground Color (底布成色) */}
                <polygon
                  points="14,16 546,16 556,52 4,52"
                  fill="url(#brocadeGoldTop)"
                />

                {/* 2. Specific Material Weave Physical Texture (6大专属织物物理机理，如粗麻竹节/真丝缎纹/丝绒等) */}
                <polygon
                  points="14,16 546,16 556,52 4,52"
                  fill={`url(#${theme.weavePatternId})`}
                  opacity={theme.weaveOpacity}
                />

                {/* 3. Surface Light Sheen Reflection (不同面料各具特色的反光漫反射) */}
                <ellipse cx="280" cy="34" rx="220" ry="14" fill="#ffffff" opacity={theme.sheenOpacity * 0.8} />
                <path d="M 14 16 Q 280 18 546 16 L 556 52 Q 280 50 4 52 Z" fill="url(#tableclothSheenWave)" opacity={theme.sheenOpacity} />

                {/* 4. Classical Border Ribbon Trim (6款风格专属传统锦带边饰) */}
                <polygon
                  points="26,18 534,18 544,49 16,49"
                  fill="none"
                  stroke={`url(#${theme.borderPatternId})`}
                  strokeWidth="6"
                  opacity="0.95"
                />
                {/* Double Stitched Piping (内外双道滚边缝线) */}
                <polygon
                  points="22,15 538,15 548,52 12,52"
                  fill="none"
                  stroke={theme.pipingStroke}
                  strokeWidth="0.9"
                  opacity="0.95"
                />
                <polygon
                  points="30,22 530,22 540,46 20,46"
                  fill="none"
                  stroke={theme.pipingStroke}
                  strokeWidth="0.8"
                  opacity="0.9"
                />

                {/* 5. Distinct Artistic Centerpiece & Embroidery Motifs (6大主题专属台面贴图/提花) */}
                <TableclothMotif motif={theme.motifType} theme={theme} />

                {/* Center Auspicious Roundel (中堂祥瑞暗提花) */}
                <TableclothRoundel theme={theme} />

                {/* 6. Volumetric 3D Corner Draping (真实桌角对折大悬垂 · 完全复刻图1与图2) */}
                {/* ── Left Corner Drop (左桌角自然下垂大折角) ── */}
                <g id="leftCornerDrape">
                  {/* Inner Fold Shadow (对折内层深邃暗影) */}
                  <polygon
                    points="4,52 -14,126 -5,130 18,72"
                    fill="url(#cornerDropShadowLeft)"
                  />
                  {/* Outer Folded Drape Face (外层垂布) */}
                  <polygon
                    points="14,16 4,52 -14,126 10,114 18,17"
                    fill="url(#brocadeGoldDrape)"
                    stroke={theme.hemStroke}
                    strokeWidth="0.8"
                  />
                  {/* Material weave texture on left corner */}
                  <polygon
                    points="14,16 4,52 -14,126 10,114 18,17"
                    fill={`url(#${theme.weavePatternId})`}
                    opacity={theme.weaveOpacity}
                  />
                  {/* Corner Ribbon Trim */}
                  <line x1="4" y1="52" x2="-14" y2="126" stroke={`url(#${theme.borderPatternId})`} strokeWidth="4.5" />
                  <line x1="4" y1="52" x2="-14" y2="126" stroke={theme.pipingStroke} strokeWidth="0.8" />
                  {/* Gem/Crystal & Silk/Cotton Tassel Pendant (角端吊坠) */}
                  <g transform="translate(-14, 126)">
                    <line x1="0" y1="0" x2="0" y2="6" stroke={theme.tasselColor.cord} strokeWidth="1.2" />
                    <circle cx="0" cy="5" r="1.6" fill={theme.tasselColor.bead} stroke={theme.tasselColor.beadStroke} strokeWidth="0.5" />
                    <ellipse cx="0" cy="11" rx="3.5" ry="5.5" fill="url(#amberPendantGrad)" stroke={theme.pipingStroke} strokeWidth="0.6" />
                    <polygon points="-2.5,16 2.5,16 3.8,28 -3.8,28" fill="url(#goldFringeFull)" />
                  </g>
                </g>

                {/* ── Right Corner Drop (右桌角自然下垂大折角) ── */}
                <g id="rightCornerDrape">
                  {/* Inner Fold Shadow */}
                  <polygon
                    points="556,52 574,126 565,130 542,72"
                    fill="url(#cornerDropShadowRight)"
                  />
                  {/* Outer Folded Drape Face */}
                  <polygon
                    points="546,16 556,52 574,126 550,114 542,17"
                    fill="url(#brocadeGoldDrape)"
                    stroke={theme.hemStroke}
                    strokeWidth="0.8"
                  />
                  {/* Material weave texture on right corner */}
                  <polygon
                    points="546,16 556,52 574,126 550,114 542,17"
                    fill={`url(#${theme.weavePatternId})`}
                    opacity={theme.weaveOpacity}
                  />
                  {/* Corner Ribbon Trim */}
                  <line x1="556" y1="52" x2="574" y2="126" stroke={`url(#${theme.borderPatternId})`} strokeWidth="4.5" />
                  <line x1="556" y1="52" x2="574" y2="126" stroke={theme.pipingStroke} strokeWidth="0.8" />
                  {/* Gem/Crystal & Silk/Cotton Tassel Pendant */}
                  <g transform="translate(574, 126)">
                    <line x1="0" y1="0" x2="0" y2="6" stroke={theme.tasselColor.cord} strokeWidth="1.2" />
                    <circle cx="0" cy="5" r="1.6" fill={theme.tasselColor.bead} stroke={theme.tasselColor.beadStroke} strokeWidth="0.5" />
                    <ellipse cx="0" cy="11" rx="3.5" ry="5.5" fill="url(#amberPendantGrad)" stroke={theme.pipingStroke} strokeWidth="0.6" />
                    <polygon points="-2.5,16 2.5,16 3.8,28 -3.8,28" fill="url(#goldFringeFull)" />
                  </g>
                </g>
              </g>
            )}

            {/* ── Scattered Flower Petals on Tabletop (案面散落花瓣) ── */}
            {showPetals && (
              <g id="scatteredTablePetals">
                {/* Petal 1: Left peony pink petal */}
                <ellipse cx="132" cy="46" rx="4.5" ry="2.2" fill="#2d1a0e" opacity="0.3" transform="rotate(25 132 46)" />
                <path d="M 130 42 C 136 40, 138 48, 131 47 C 127 46, 127 43, 130 42 Z" fill="#f472b6" />

                {/* Petal 2: Left-mid lily white petal */}
                <ellipse cx="178" cy="48" rx="5" ry="2.2" fill="#2d1a0e" opacity="0.28" transform="rotate(-15 178 48)" />
                <ellipse cx="178" cy="47" rx="4.5" ry="2" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.5" transform="rotate(-15 178 47)" />

                {/* Petal 3: Center-left peony petal */}
                <ellipse cx="236" cy="49" rx="4" ry="1.8" fill="#2d1a0e" opacity="0.25" transform="rotate(35 236 49)" />
                <ellipse cx="236" cy="48" rx="3.6" ry="1.8" fill="#fda4af" transform="rotate(35 236 48)" />

                {/* Petal 4: Center-right lily petal */}
                <ellipse cx="376" cy="48" rx="5" ry="2" fill="#2d1a0e" opacity="0.28" transform="rotate(20 376 48)" />
                <ellipse cx="376" cy="47" rx="4.6" ry="2" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.5" transform="rotate(20 376 47)" />

                {/* Petal 5: Right peony petal */}
                <ellipse cx="426" cy="46" rx="4.2" ry="2" fill="#2d1a0e" opacity="0.3" transform="rotate(-30 426 46)" />
                <path d="M 424 43 C 430 41, 432 48, 425 47 C 421 46, 421 44, 424 43 Z" fill="#f472b6" />
              </g>
            )}

            {/* ── Front Face: Tablecloth Valance or Bare Solid Wood Slab ── */}
            {showTableRunner ? (
              <g id="tableclothFrontValance">
                {/* 1. Main Front Hanging Drape with Style-Specific Hem Silhouette (各款专属下摆剪裁) */}
                <path
                  d={getFrontDrapePath(tableclothStyle)}
                  fill="url(#brocadeGoldDrape)"
                  stroke={theme.hemStroke}
                  strokeWidth="0.8"
                />

                {/* 2. Fabric Weave Texture on Front Valance (前围经纬布纹) */}
                <path
                  d={getFrontDrapePath(tableclothStyle)}
                  fill={`url(#${theme.weavePatternId})`}
                  opacity={theme.weaveOpacity}
                />

                {/* 3. Realistic Vertical Drapery Folds & Silk Highlights (立体垂褶深垂至下摆) */}
                {Array.from({ length: 14 }).map((_, i) => {
                  const px = 20 + i * 38;
                  return (
                    <g key={i}>
                      {/* Deep pleat vertical shadow line */}
                      <path
                        d={`M ${px} 52 Q ${px - 2} 82 ${px} 112`}
                        stroke="rgba(40, 20, 5, 0.35)"
                        strokeWidth="2.4"
                        fill="none"
                      />
                      {/* Pleat crest soft silk highlight */}
                      <path
                        d={`M ${px + 18} 52 Q ${px + 20} 82 ${px + 18} 112`}
                        stroke="rgba(255, 245, 200, 0.55)"
                        strokeWidth="3.2"
                        fill="none"
                      />
                    </g>
                  );
                })}

                {/* 4. Top Table Rim Cloth Seam Line (台沿折布柔和高光) */}
                <line x1="0" y1="52.5" x2="560" y2="52.5" stroke={theme.pipingStroke} strokeWidth="1.2" opacity="0.85" />

                {/* 5. Distinct Artistic Front Centerpiece (案前正前方艺术大徽标，完全无遮挡) */}
                <FrontValanceCenterpiece style={tableclothStyle} theme={theme} />

                {/* 6. Classical Continuous Traditional Ribbon across entire hem (6款专属传统锦带边饰) */}
                <rect x="0" y={theme.ribbonY} width="560" height={theme.ribbonH} fill={`url(#${theme.borderPatternId})`} />
                <line x1="0" y1={theme.ribbonY - 0.5} x2="560" y2={theme.ribbonY - 0.5} stroke={theme.pipingStroke} strokeWidth="1.2" />
                <line x1="0" y1={theme.ribbonY + theme.ribbonH + 0.5} x2="560" y2={theme.ribbonY + theme.ribbonH + 0.5} stroke={theme.pipingStroke} strokeWidth="1.2" />

                {/* 7. Authentic Hanging Cloth Fringe Tassels (沿下摆悬挂，长穗垂至案座，彻底遮盖木箱面板) */}
                {Array.from({ length: 35 }).map((_, i) => {
                  const tx = 16 + i * 15.5;
                  const tY = theme.tasselY;
                  const tLen = theme.tasselLength;
                  const tW = theme.tasselWidth;
                  return (
                    <g key={i}>
                      {/* Soft shadow on wood behind */}
                      <line x1={tx} y1={tY} x2={tx} y2={tY + tLen} stroke={theme.tasselColor.shadow} strokeWidth={tW + 1} />
                      {/* Tassel cord */}
                      <line x1={tx} y1={tY} x2={tx} y2={tY + 4} stroke={theme.tasselColor.cord} strokeWidth="1.5" />
                      {/* Cord knot bead */}
                      <circle cx={tx} cy={tY + 4} r={tW * 0.55} fill={theme.tasselColor.bead} stroke={theme.tasselColor.beadStroke} strokeWidth="0.5" />
                      {/* Flared silk/cotton tassel bell body */}
                      <polygon
                        points={`${tx - tW * 0.6},${tY + 5} ${tx + tW * 0.6},${tY + 5} ${tx + tW},${tY + tLen} ${tx - tW},${tY + tLen}`}
                        fill={tableclothStyle === 'indigo_linen' ? '#ffffff' : 'url(#goldFringeFull)'}
                      />
                    </g>
                  );
                })}

                {/* 8. Soft Ambient Drop Shadow cast by the valance onto plinth and legs */}
                <rect x="4" y="126" width="552" height="9" fill="#1b0f05" opacity="0.45" />
              </g>
            ) : (
              /* 素木桌面时：完整展示纯实木前沿厚板与木纹 */
              <g id="bareWoodFrontSlab">
                {/* 2. Front Chamfer Bevel Highlight (The bright horizontal light strip) */}
                <polygon
                  points="4,52 556,52 556,54.5 4,54.5"
                  fill="url(#bevelSpecularGrad)"
                />

                {/* 3. Front Vertical Face of Tabletop (Thick solid slab) */}
                <rect
                  x="4"
                  y="54"
                  width="552"
                  height="20"
                  rx="1.5"
                  fill="url(#frontSlabGrad)"
                />

                {/* Vertical grain texture lines on front slab face */}
                {Array.from({ length: 18 }).map((_, i) => (
                  <line
                    key={i}
                    x1={20 + i * 30}
                    y1="54"
                    x2={20 + i * 30}
                    y2="74"
                    stroke="rgba(75, 45, 20, 0.12)"
                    strokeWidth="1.2"
                  />
                ))}
              </g>
            )}

            {/* Bottom edge shadow line of tabletop */}
            <line x1="4" y1="74" x2="556" y2="74" stroke="#52361d" strokeWidth="1.5" />

            {/* Left & Right angled end-grain corner bevels */}
            <polygon points="14,16 4,52 4,74 8,74 16,16" fill="url(#endgrainLeft)" opacity="0.6" />
            <polygon points="546,16 556,52 556,74 552,74 544,16" fill="url(#endgrainRight)" opacity="0.6" />
          </g>

          {/* === FLOOR CONTACT SHADOW & AMBIENT OCCLUSION === */}
          {/* Contact shadow where the table feet touch the floor planks */}
          <ellipse cx="76" cy="139" rx="38" ry="4.5" fill="#201208" opacity="0.85" />
          <ellipse cx="484" cy="139" rx="38" ry="4.5" fill="#201208" opacity="0.85" />
          <rect x="74" y="137" width="412" height="4" rx="2" fill="#201208" opacity="0.75" />

          {/* Soft cast shadow extending outward onto floor */}
          <ellipse
            cx={280 + shadowTiltX * 1.5}
            cy="146"
            rx="270"
            ry="12"
            fill="url(#tableFloorShadowGrad)"
          />
        </svg>
      </div>
    </div>
  );
};

export const DraggableAltarTable = React.memo(DraggableAltarTableComponent);
