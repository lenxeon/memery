/**
 * @file BaseTablecloth.tsx
 * @description 供桌桌布基类组件，统筹案面铺陈、前垂围幔（经幡折景、万字回纹、中央徽章、垂密金丝流苏与实木足）。
 */
import React from 'react';
import { TableclothTheme } from './types';
import { TableclothStyle } from '../../../types';

export const TableclothRoundel: React.FC<{ theme: TableclothTheme }> = ({ theme }) => (
  <g id="tableclothCenterRoundel">
    <ellipse cx="280" cy="34" rx="42" ry="9" fill="none" stroke={theme.pipingStroke} strokeWidth="0.8" strokeDasharray="3,2" opacity="0.7" />
    <path d="M 260 34 Q 280 27 300 34 Q 280 41 260 34 Z" fill="#ffffff" opacity={theme.sheenOpacity} />
  </g>
);

export const TableclothTopSurface: React.FC<{
  theme: TableclothTheme;
  MotifComponent: React.FC<{ theme: TableclothTheme }>;
}> = ({ theme, MotifComponent }) => (
  <g id="imperialTablecloth">
    {/* 1. Base Silk/Linen Drape Ground Color (底布真丝成色) */}
    <polygon
      points="14,16 546,16 556,52 4,52"
      fill="url(#brocadeGoldTop)"
    />

    {/* 2. Specific Material Weave Physical Texture (真实织物经纬细密交织) */}
    <polygon
      points="14,16 546,16 556,52 4,52"
      fill={`url(#${theme.weavePatternId})`}
      opacity={theme.weaveOpacity}
    />

    {/* 3. Surface Soft Matte Diffuse Shading (柔和亚光漫反射，彻底消除塑料白光反光) */}
    <polygon
      points="14,16 546,16 556,52 4,52"
      fill="url(#fabricSoftDiffuse)"
      opacity="0.35"
    />

    {/* 4. Classical Border Ribbon Trim (沉稳中式织锦滚边) */}
    <polygon
      points="26,18 534,18 544,49 16,49"
      fill="none"
      stroke={`url(#${theme.borderPatternId})`}
      strokeWidth="4.5"
      opacity="0.9"
    />
    {/* Double Stitched Piping (内外双道真丝缝线) */}
    <polygon
      points="22,15 538,15 548,52 12,52"
      fill="none"
      stroke={theme.pipingStroke}
      strokeWidth="0.8"
      opacity="0.8"
    />
    <polygon
      points="30,22 530,22 540,46 20,46"
      fill="none"
      stroke={theme.pipingStroke}
      strokeWidth="0.7"
      opacity="0.75"
    />

    {/* 5. Distinct Artistic Centerpiece & Embroidery Motifs */}
    <MotifComponent theme={theme} />

    {/* Center Auspicious Roundel */}
    <TableclothRoundel theme={theme} />

    {/* 6. Volumetric 3D Corner Draping (真实桌角自然对折下垂) */}
    {/* ── Left Corner Drop (左桌角自然下垂大折角) ── */}
    <g id="leftCornerDrape">
      {/* Inner Fold Shadow (对折内层深邃暗影) */}
      <polygon
        points="4,52 -10,126 -2,130 18,72"
        fill="url(#cornerDropShadowLeft)"
      />
      {/* Outer Folded Drape Face (外层垂布) */}
      <polygon
        points="14,16 4,52 -10,126 12,118 18,17"
        fill="url(#brocadeGoldDrape)"
        stroke={theme.hemStroke}
        strokeWidth="0.8"
      />
      <polygon
        points="14,16 4,52 -10,126 12,118 18,17"
        fill={`url(#${theme.weavePatternId})`}
        opacity={theme.weaveOpacity * 0.7}
      />
      {/* Corner Ribbon Trim */}
      <line x1="4" y1="52" x2="-10" y2="126" stroke={`url(#${theme.borderPatternId})`} strokeWidth="3.5" />
      <line x1="4" y1="52" x2="-10" y2="126" stroke={theme.pipingStroke} strokeWidth="0.8" />
      {/* Corner Tassel Pendant (角端吊坠) */}
      <g transform="translate(-10, 126)">
        <line x1="0" y1="0" x2="0" y2="6" stroke={theme.tasselColor.cord} strokeWidth="1.2" />
        <circle cx="0" cy="5" r="1.8" fill={theme.tasselColor.bead} stroke={theme.tasselColor.beadStroke} strokeWidth="0.6" />
        <ellipse cx="0" cy="11" rx="3.5" ry="5.5" fill="url(#amberPendantGrad)" stroke={theme.pipingStroke} strokeWidth="0.6" />
        <polygon points="-2.5,16 2.5,16 3.8,28 -3.8,28" fill="url(#goldFringeFull)" />
      </g>
    </g>

    {/* ── Right Corner Drop (右桌角自然下垂大折角) ── */}
    <g id="rightCornerDrape">
      {/* Inner Fold Shadow */}
      <polygon
        points="556,52 570,126 562,130 542,72"
        fill="url(#cornerDropShadowRight)"
      />
      {/* Outer Folded Drape Face */}
      <polygon
        points="546,16 556,52 570,126 548,118 542,17"
        fill="url(#brocadeGoldDrape)"
        stroke={theme.hemStroke}
        strokeWidth="0.8"
      />
      <polygon
        points="546,16 556,52 570,126 548,118 542,17"
        fill={`url(#${theme.weavePatternId})`}
        opacity={theme.weaveOpacity * 0.7}
      />
      {/* Corner Ribbon Trim */}
      <line x1="556" y1="52" x2="570" y2="126" stroke={`url(#${theme.borderPatternId})`} strokeWidth="3.5" />
      <line x1="556" y1="52" x2="570" y2="126" stroke={theme.pipingStroke} strokeWidth="0.8" />
      {/* Corner Tassel Pendant */}
      <g transform="translate(570, 126)">
        <line x1="0" y1="0" x2="0" y2="6" stroke={theme.tasselColor.cord} strokeWidth="1.2" />
        <circle cx="0" cy="5" r="1.8" fill={theme.tasselColor.bead} stroke={theme.tasselColor.beadStroke} strokeWidth="0.6" />
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
}> = ({ style, theme, drapePath, CenterpieceComponent }) => {
  // 34 颗密集精致的垂金流苏穗子
  const tasselCount = 34;
  const tasselStep = 528 / (tasselCount - 1);

  // 顶部折景鲁班尺吉度标尺刻度与装饰印记 (对标参考图中的 8- 18- 18- 18- 16- 16- 18- 18-)
  const topTabs = [
    '8-', '18-', '18-', '18-', '18-', '18-', '16-', '16-', '16-', '18-', '18-', '18-', '18-', '18-', '18-', '18-',
  ];

  return (
    <g id="tableclothFrontValance">
      {/* ── 0. 底层实木桌脚 (参考图底部两角露出的稳重暗木桌足) ── */}
      <g id="valanceTableFeet">
        {/* 左桌足 */}
        <polygon points="30,122 56,122 54,136 28,136" fill="#24170d" stroke="#160e07" strokeWidth="1.2" />
        <line x1="28" y1="136" x2="54" y2="136" stroke="#0a0502" strokeWidth="1.8" />
        {/* 右桌足 */}
        <polygon points="504,122 530,122 532,136 506,136" fill="#24170d" stroke="#160e07" strokeWidth="1.2" />
        <line x1="506" y1="136" x2="532" y2="136" stroke="#0a0502" strokeWidth="1.8" />
      </g>

      {/* ── 1. 主垂帷布面 (梯形悬垂织锦，平整垂顺) ── */}
      <polygon
        points="4,52 556,52 560,118 0,118"
        fill="url(#brocadeGoldDrape)"
        stroke={theme.hemStroke}
        strokeWidth="1.0"
      />

      {/* ── 2. 面料暗纹提花经纬机理 (高保真织物触感) ── */}
      <polygon
        points="4,52 556,52 560,118 0,118"
        fill={`url(#${theme.weavePatternId})`}
        opacity={theme.weaveOpacity}
      />

      {/* ── 2.1 案唇在布面上方的柔和遮光落影 (极具织物空间深度的 Ambient Shadow) ── */}
      <polygon
        points="4,52 556,52 557,66 3,66"
        fill="url(#clothLipShadow)"
      />

      {/* ── 3. 顶部折叠包边横带 (带鲁班吉度折景刻度印记) ── */}
      <g id="topPleatRulerRibbon">
        <rect x="0" y="52" width="560" height="9.5" fill="#caa44e" opacity="0.95" />
        <line x1="0" y1="52" x2="560" y2="52" stroke="#24170d" strokeWidth="1.4" />
        <line x1="0" y1="61.5" x2="560" y2="61.5" stroke="#24170d" strokeWidth="1.0" />

        {/* 标志性的 18- 18- 16- 16- 折景刻度印花与缝针刻线 */}
        {topTabs.map((tab, idx) => {
          const tabX = 18 + idx * 34;
          return (
            <g key={idx} opacity="0.85">
              <line x1={tabX} y1="52" x2={tabX} y2="61.5" stroke="#24170d" strokeWidth="0.8" />
              <text
                x={tabX + 7}
                y="59"
                fontSize="6.2"
                fontFamily="sans-serif"
                fontWeight="bold"
                fill="#24170d"
                letterSpacing="-0.5"
              >
                {tab}
              </text>
            </g>
          );
        })}
      </g>

      {/* ── 4. 垂帷纵向拼接布幅与自然缝痕 (彻底消灭塑料瓦楞硬反光，还原真织物悬垂) ── */}
      <g id="verticalClothPanels">
        {topTabs.map((_, idx) => {
          const seamX = 18 + idx * 34;
          return (
            <g key={idx}>
              {/* 布幅车缝接缝线 (亚光微凹暗缝) */}
              <line
                x1={seamX}
                y1="61.5"
                x2={seamX}
                y2={theme.ribbonY}
                stroke="rgba(40, 20, 5, 0.28)"
                strokeWidth="0.9"
              />
              {/* 细微丝线侧向缝痕 (柔和漫反射，非塑料白反光) */}
              <line
                x1={seamX + 0.8}
                y1="61.5"
                x2={seamX + 0.8}
                y2={theme.ribbonY}
                stroke="rgba(255, 245, 200, 0.18)"
                strokeWidth="0.7"
              />
              {/* 纵向布幅自然微悬垂柔光 (让布幔呈现自然的微微起伏柔软感) */}
              <rect
                x={seamX + 3}
                y="61.5"
                width="28"
                height={theme.ribbonY - 61.5}
                fill="rgba(255, 255, 255, 0.03)"
              />
            </g>
          );
        })}
      </g>

      {/* ── 5. 中央标志性黑金宝相三叶云纹徽章 (刺绣镶嵌于布幔中央) ── */}
      <CenterpieceComponent theme={theme} />

      {/* ── 6. 经典中式万字回纹带 (连续贯通横幅下摆锦带) ── */}
      <g id="bottomMeanderRibbon">
        <rect x="0" y={theme.ribbonY} width="560" height={theme.ribbonH} fill={`url(#${theme.borderPatternId})`} />
        {/* 上下两道工整深黑与金黄压边线 */}
        <line x1="0" y1={theme.ribbonY} x2="560" y2={theme.ribbonY} stroke="#24170d" strokeWidth="1.4" />
        <line x1="0" y1={theme.ribbonY + theme.ribbonH} x2="560" y2={theme.ribbonY + theme.ribbonH} stroke="#24170d" strokeWidth="1.4" />
      </g>

      {/* ── 7. 密排垂金丝流苏 (参考图下方整齐排列的温润亚光真丝排穗) ── */}
      <g id="hangingTasselFringe">
        {Array.from({ length: tasselCount }).map((_, i) => {
          const tx = 16 + i * tasselStep;
          const tY = theme.tasselY;
          const tLen = theme.tasselLength;
          const tW = theme.tasselWidth;
          return (
            <g key={i}>
              {/* 流苏背部柔和接触阴影 */}
              <line
                x1={tx}
                y1={tY}
                x2={tx}
                y2={tY + tLen}
                stroke={theme.tasselColor.shadow}
                strokeWidth={tW + 1.2}
              />
              {/* 流苏挂线细编绳 */}
              <line
                x1={tx}
                y1={tY}
                x2={tx}
                y2={tY + 3.5}
                stroke="#24170d"
                strokeWidth="0.9"
              />
              {/* 金色圆珠包头 */}
              <circle
                cx={tx}
                cy={tY + 3.5}
                r={tW * 0.55}
                fill={theme.tasselColor.bead}
                stroke={theme.tasselColor.beadStroke}
                strokeWidth="0.7"
              />
              {/* 丝滑垂直下垂的亚光金流苏穗身 */}
              <polygon
                points={`${tx - tW * 0.48},${tY + 4.5} ${tx + tW * 0.48},${tY + 4.5} ${tx + tW * 0.58},${tY + tLen} ${tx - tW * 0.58},${tY + tLen}`}
                fill={style === 'indigo_linen' ? '#ffffff' : 'url(#goldFringeFull)'}
                stroke="#24170d"
                strokeWidth="0.45"
              />
              {/* 流苏梢头自然的微光 */}
              <line
                x1={tx - tW * 0.35}
                y1={tY + tLen - 0.5}
                x2={tx + tW * 0.35}
                y2={tY + tLen - 0.5}
                stroke="#fae896"
                strokeWidth="0.7"
              />
            </g>
          );
        })}
      </g>

      {/* ── 8. 柔和地面接地投影 ── */}
      <rect x="0" y="132" width="560" height="8" fill="#140b04" opacity="0.5" filter="blur(2px)" />
    </g>
  );
};
