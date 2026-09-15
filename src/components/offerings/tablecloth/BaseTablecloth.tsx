/**
 * @file BaseTablecloth.tsx
 * @description 供桌桌布基类组件，统筹布面垂褶、两翼垂坠与边缘流苏骨架。
 */
import React from 'react';
import { TableclothTheme } from './types';
import { TableclothStyle } from '../../../types';

export const TableclothRoundel: React.FC<{ theme: TableclothTheme }> = ({ theme }) => (
  <g id="tableclothCenterRoundel">
    <ellipse cx="230" cy="34" rx="42" ry="9" fill="none" stroke={theme.pipingStroke} strokeWidth="0.8" strokeDasharray="3,2" opacity="0.7" />
    <path d="M 210 34 Q 230 27 250 34 Q 230 41 210 34 Z" fill="#ffffff" opacity={theme.sheenOpacity} />
  </g>
);

export const TableclothTopSurface: React.FC<{
  theme: TableclothTheme;
  MotifComponent: React.FC<{ theme: TableclothTheme }>;
}> = ({ theme, MotifComponent }) => (
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
    <MotifComponent theme={theme} />

    {/* Center Auspicious Roundel (中堂祥瑞暗提花) */}
    <TableclothRoundel theme={theme} />

    {/* 6. Volumetric 3D Corner Draping (真实桌角对折大悬垂) */}
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
);

export const TableclothFrontValance: React.FC<{
  style: TableclothStyle;
  theme: TableclothTheme;
  drapePath: string;
  CenterpieceComponent: React.FC<{ theme: TableclothTheme }>;
}> = ({ style, theme, drapePath, CenterpieceComponent }) => (
  <g id="tableclothFrontValance">
    {/* 1. Main Front Hanging Drape with Style-Specific Hem Silhouette */}
    <path d={drapePath} fill="url(#brocadeGoldDrape)" stroke={theme.hemStroke} strokeWidth="0.8" />

    {/* 2. Fabric Weave Texture on Front Valance */}
    <path d={drapePath} fill={`url(#${theme.weavePatternId})`} opacity={theme.weaveOpacity} />

    {/* 3. Realistic Vertical Drapery Folds & Silk Highlights */}
    {Array.from({ length: 14 }).map((_, i) => {
      const px = 20 + i * 38;
      return (
        <g key={i}>
          <path d={`M ${px} 52 Q ${px - 2} 82 ${px} 112`} stroke="rgba(40, 20, 5, 0.35)" strokeWidth="2.4" fill="none" />
          <path d={`M ${px + 18} 52 Q ${px + 20} 82 ${px + 18} 112`} stroke="rgba(255, 245, 200, 0.55)" strokeWidth="3.2" fill="none" />
        </g>
      );
    })}

    {/* 4. Top Table Rim Cloth Seam Line */}
    <line x1="0" y1="52.5" x2="560" y2="52.5" stroke={theme.pipingStroke} strokeWidth="1.2" opacity="0.85" />

    {/* 5. Distinct Artistic Front Centerpiece */}
    <CenterpieceComponent theme={theme} />

    {/* 6. Classical Continuous Traditional Ribbon */}
    <rect x="0" y={theme.ribbonY} width="560" height={theme.ribbonH} fill={`url(#${theme.borderPatternId})`} />
    <line x1="0" y1={theme.ribbonY - 0.5} x2="560" y2={theme.ribbonY - 0.5} stroke={theme.pipingStroke} strokeWidth="1.2" />
    <line x1="0" y1={theme.ribbonY + theme.ribbonH + 0.5} x2="560" y2={theme.ribbonY + theme.ribbonH + 0.5} stroke={theme.pipingStroke} strokeWidth="1.2" />

    {/* 7. Authentic Hanging Cloth Fringe Tassels */}
    {Array.from({ length: 35 }).map((_, i) => {
      const tx = 16 + i * 15.5;
      const tY = theme.tasselY;
      const tLen = theme.tasselLength;
      const tW = theme.tasselWidth;
      return (
        <g key={i}>
          <line x1={tx} y1={tY} x2={tx} y2={tY + tLen} stroke={theme.tasselColor.shadow} strokeWidth={tW + 1} />
          <line x1={tx} y1={tY} x2={tx} y2={tY + 4} stroke={theme.tasselColor.cord} strokeWidth="1.5" />
          <circle cx={tx} cy={tY + 4} r={tW * 0.55} fill={theme.tasselColor.bead} stroke={theme.tasselColor.beadStroke} strokeWidth="0.5" />
          <polygon
            points={`${tx - tW * 0.6},${tY + 5} ${tx + tW * 0.6},${tY + 5} ${tx + tW},${tY + tLen} ${tx - tW},${tY + tLen}`}
            fill={style === 'indigo_linen' ? '#ffffff' : 'url(#goldFringeFull)'}
          />
        </g>
      );
    })}

    {/* 8. Soft Ambient Drop Shadow */}
    <rect x="4" y="126" width="552" height="9" fill="#1b0f05" opacity="0.45" />
  </g>
);
