/**
 * @file AltarTableSvg.tsx
 * @description 3D 禅意红木雕花供案纯矢量 SVG 组件。
 * 包含：案面冰盘沿、木纹高光倒角、雕花束腰板、实木立柱台墩、
 * 6大材质专属织锦桌布/前垂围幔/回纹金穗流苏、案面散落花瓣及地面软阴影。
 * 供 React DOM 渲染与 PixiJS 离屏超采样 GPU 贴图管线共同复用，保证 100% 视觉严丝合缝。
 */
import React from 'react';
import { TableclothStyle } from '../../types';
import {
  getTableclothModule,
  TableclothTopSurface,
  TableclothFrontValance,
} from '../offerings/tablecloth';

export interface AltarTableSvgProps {
  tableclothStyle?: TableclothStyle;
  showTableRunner?: boolean;
  showPetals?: boolean;
  shadowTiltX?: number;
  className?: string;
}

export const AltarTableSvg: React.FC<AltarTableSvgProps> = ({
  tableclothStyle = 'autumn_gold',
  showTableRunner = true,
  showPetals = true,
  shadowTiltX = 0,
  className = 'w-full h-full',
}) => {
  const tableclothModule = getTableclothModule(tableclothStyle);
  const theme = tableclothModule.theme;

  return (
    <svg
      viewBox="0 0 560 160"
      width="560"
      height="160"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
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

        {/* 2. Top Edge Chamfer / Specular Highlight */}
        <linearGradient id="bevelSpecularGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#eedcc7" />
          <stop offset="20%" stopColor="#fff8ee" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="80%" stopColor="#fff8ee" />
          <stop offset="100%" stopColor="#eedcc7" />
        </linearGradient>

        {/* 3. Front Vertical Tabletop Slab Face */}
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

        {/* 5. Recessed Under-Apron Panel Gradient */}
        <linearGradient id="apronPanelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#755234" />
          <stop offset="15%" stopColor="#a37c56" />
          <stop offset="55%" stopColor="#be976f" />
          <stop offset="90%" stopColor="#aa835b" />
          <stop offset="100%" stopColor="#684729" />
        </linearGradient>

        {/* 6. Pedestal Legs Solid Blocks */}
        <linearGradient id="legBlockGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8d6844" />
          <stop offset="30%" stopColor="#be966f" />
          <stop offset="70%" stopColor="#ca9f75" />
          <stop offset="100%" stopColor="#9b734c" />
        </linearGradient>

        {/* 7. Soft Ambient Floor Shadow Gradient */}
        <radialGradient id="tableFloorShadowGrad" cx="50%" cy="50%" rx="50%" ry="50%">
          <stop offset="0%" stopColor="#3a2211" stopOpacity="0.58" />
          <stop offset="55%" stopColor="#3a2211" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#3a2211" stopOpacity="0" />
        </radialGradient>

        {/* 8. Brocade Silk Table Runner Gradients */}
        <linearGradient id="brocadeRunnerTop" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9a6e2e" />
          <stop offset="15%" stopColor="#d4a34b" />
          <stop offset="50%" stopColor="#f7d488" />
          <stop offset="85%" stopColor="#d4a34b" />
          <stop offset="100%" stopColor="#9a6e2e" />
        </linearGradient>
        <linearGradient id="brocadeRunnerFront" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ca9842" />
          <stop offset="35%" stopColor="#dfb25d" />
          <stop offset="75%" stopColor="#aa792c" />
          <stop offset="100%" stopColor="#6e4915" />
        </linearGradient>
        <linearGradient id="goldFringe" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="60%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>

        {/* 材质微纹理贴图库 (真实织物经纬线与暗提花机理，绝无塑料反光) */}
        {/* 1. 御制金绫织锦专用布纹 (纵横交织纱线与暗八宝菱花) */}
        <pattern id="weaveGoldBrocade" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="none" />
          <line x1="0" y1="2" x2="16" y2="2" stroke="rgba(255,245,210,0.18)" strokeWidth="0.8" />
          <line x1="0" y1="6" x2="16" y2="6" stroke="rgba(40,20,5,0.12)" strokeWidth="0.8" />
          <line x1="0" y1="10" x2="16" y2="10" stroke="rgba(255,245,210,0.18)" strokeWidth="0.8" />
          <line x1="0" y1="14" x2="16" y2="14" stroke="rgba(40,20,5,0.12)" strokeWidth="0.8" />
          <line x1="2" y1="0" x2="2" y2="16" stroke="rgba(255,245,210,0.15)" strokeWidth="0.8" />
          <line x1="6" y1="0" x2="6" y2="16" stroke="rgba(40,20,5,0.10)" strokeWidth="0.8" />
          <line x1="10" y1="0" x2="10" y2="16" stroke="rgba(255,245,210,0.15)" strokeWidth="0.8" />
          <line x1="14" y1="0" x2="14" y2="16" stroke="rgba(40,20,5,0.10)" strokeWidth="0.8" />
          <polygon points="8,3 13,8 8,13 3,8" fill="none" stroke="rgba(255,240,180,0.22)" strokeWidth="0.8" />
          <polygon points="8,5 11,8 8,11 5,8" fill="rgba(80,45,10,0.06)" />
        </pattern>

        <pattern id="weaveSatinSilk" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="none" />
          <path d="M 0 0 L 16 16 M 0 8 L 8 16 M 8 0 L 16 8" stroke="rgba(255,255,255,0.28)" strokeWidth="1.2" />
          <line x1="0" y1="4" x2="16" y2="4" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" />
          <line x1="0" y1="12" x2="16" y2="12" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" />
        </pattern>
        <pattern id="weaveSilkRaw" width="16" height="16" patternUnits="userSpaceOnUse">
          <use href="#weaveSatinSilk" />
        </pattern>

        <pattern id="weaveCoarseLinen" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="none" />
          <rect x="0" y="0" width="20" height="10" fill="rgba(0,0,0,0.16)" />
          <rect x="0" y="10" width="20" height="10" fill="rgba(255,255,255,0.18)" />
          <rect x="0" y="0" width="10" height="20" fill="rgba(255,255,255,0.22)" />
          <rect x="10" y="0" width="10" height="20" fill="rgba(0,0,0,0.16)" />
          <ellipse cx="5" cy="4" rx="4.5" ry="2" fill="rgba(255,255,255,0.45)" />
          <ellipse cx="15" cy="14" rx="4.8" ry="2.2" fill="rgba(0,0,0,0.32)" />
          <line x1="0" y1="3" x2="20" y2="3" stroke="rgba(0,0,0,0.3)" strokeWidth="1.4" />
          <line x1="0" y1="13" x2="20" y2="13" stroke="rgba(255,255,255,0.42)" strokeWidth="1.4" />
          <line x1="3" y1="0" x2="3" y2="20" stroke="rgba(255,255,255,0.42)" strokeWidth="1.4" />
          <line x1="13" y1="0" x2="13" y2="20" stroke="rgba(0,0,0,0.3)" strokeWidth="1.4" />
        </pattern>
        <pattern id="weaveRoughLinen" width="20" height="20" patternUnits="userSpaceOnUse">
          <use href="#weaveCoarseLinen" />
        </pattern>

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

        <pattern id="weaveSheerCrepe" width="20" height="12" patternUnits="userSpaceOnUse">
          <rect width="20" height="12" fill="none" />
          <path d="M 0 3 Q 5 1, 10 3 T 20 3" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" />
          <path d="M 0 9 Q 5 7, 10 9 T 20 9" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1.0" />
          <line x1="5" y1="0" x2="5" y2="12" stroke="rgba(255,255,255,0.28)" strokeWidth="0.8" strokeDasharray="2,2" />
          <line x1="15" y1="0" x2="15" y2="12" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" strokeDasharray="2,2" />
        </pattern>

        <pattern id="weaveSongBrocade" width="24" height="24" patternUnits="userSpaceOnUse">
          <rect width="24" height="24" fill="none" />
          <polygon points="12,2 22,12 12,22 2,12" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4" />
          <circle cx="12" cy="12" r="2.6" fill="rgba(255,230,150,0.4)" />
          <line x1="0" y1="0" x2="24" y2="24" stroke="rgba(0,0,0,0.18)" strokeWidth="1.0" />
          <line x1="24" y1="0" x2="0" y2="24" stroke="rgba(0,0,0,0.18)" strokeWidth="1.0" />
        </pattern>

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

        {/* 边饰锦带贴图库 */}
        <pattern id="borderMeanderGold" width="24" height="14" patternUnits="userSpaceOnUse">
          <rect width="24" height="14" fill="#24160c" />
          <line x1="0" y1="0.8" x2="24" y2="0.8" stroke="#caa34e" strokeWidth="1.2" />
          <line x1="0" y1="13.2" x2="24" y2="13.2" stroke="#caa34e" strokeWidth="1.2" />
          <path d="M 0 2.5 L 22 2.5 L 22 11.5 L 2 11.5 L 2 5.5 L 18 5.5 L 18 8.5 L 6 8.5" fill="none" stroke="#d5b060" strokeWidth="1.4" strokeLinecap="square" strokeLinejoin="miter" />
        </pattern>

        <pattern id="borderIndigoHemstitch" width="20" height="14" patternUnits="userSpaceOnUse">
          <rect width="20" height="14" fill="#111a26" />
          <line x1="0" y1="2" x2="20" y2="2" stroke="#ffffff" strokeWidth="1.2" />
          <line x1="0" y1="12" x2="20" y2="12" stroke="#ffffff" strokeWidth="1.2" />
          <path d="M 0 7 L 5 2 L 10 7 L 15 2 L 20 7 M 0 7 L 5 12 L 10 7 L 15 12 L 20 7" fill="none" stroke="#ffffff" strokeWidth="1.6" />
        </pattern>

        <pattern id="borderWanFretwork" width="24" height="14" patternUnits="userSpaceOnUse">
          <rect width="24" height="14" fill="#2a0c0d" />
          <path d="M 0 7 L 7 7 L 7 2 L 13 2 L 13 7 L 21 7 M 13 7 L 13 12 L 19 12" fill="none" stroke="#fcd34d" strokeWidth="1.8" strokeLinecap="square" />
        </pattern>

        <pattern id="borderSilverRuyi" width="24" height="14" patternUnits="userSpaceOnUse">
          <rect width="24" height="14" fill="#3b3732" />
          <path d="M 0 7 Q 6 2, 12 7 Q 18 12, 24 7" fill="none" stroke="#ffffff" strokeWidth="1.8" />
          <circle cx="12" cy="7" r="2.2" fill="#ffffff" />
        </pattern>

        <pattern id="borderSongRosette" width="24" height="14" patternUnits="userSpaceOnUse">
          <rect width="24" height="14" fill="#111f17" />
          <polygon points="6,7 12,2 18,7 12,12" fill="none" stroke="#eab308" strokeWidth="1.8" />
          <circle cx="12" cy="7" r="1.8" fill="#eab308" />
          <line x1="0" y1="7" x2="6" y2="7" stroke="#eab308" strokeWidth="1.2" />
          <line x1="18" y1="7" x2="24" y2="7" stroke="#eab308" strokeWidth="1.2" />
        </pattern>

        <pattern id="borderTangLotus" width="24" height="14" patternUnits="userSpaceOnUse">
          <rect width="24" height="14" fill="#210e1e" />
          <circle cx="4" cy="7" r="2.2" fill="#fbbf24" />
          <circle cx="20" cy="7" r="2.2" fill="#fbbf24" />
          <path d="M 6 7 Q 12 2, 18 7 Q 12 12, 6 7 Z" fill="none" stroke="#fbbf24" strokeWidth="1.6" />
        </pattern>

        {/* ── Fabric Color Gradients ── */}
        <linearGradient id="brocadeGoldTop" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={theme.topGrad[0]} />
          <stop offset="25%" stopColor={theme.topGrad[1]} />
          <stop offset="65%" stopColor={theme.topGrad[2]} />
          <stop offset="100%" stopColor={theme.topGrad[3]} />
        </linearGradient>

        <linearGradient id="brocadeGoldDrape" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={theme.drapeGrad[0]} />
          <stop offset="15%" stopColor={theme.drapeGrad[1]} />
          <stop offset="60%" stopColor={theme.drapeGrad[2]} />
          <stop offset="88%" stopColor={theme.drapeGrad[3]} />
          <stop offset="100%" stopColor={theme.drapeGrad[4]} />
        </linearGradient>

        {/* 木质案唇投在布面上的柔和漫反射环境落影 (展现真实布料从桌面垂挂的空间关系) */}
        <linearGradient id="clothLipShadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a0f06" stopOpacity="0.52" />
          <stop offset="30%" stopColor="#251609" stopOpacity="0.28" />
          <stop offset="75%" stopColor="#2e1a0b" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#2e1a0b" stopOpacity="0" />
        </linearGradient>

        {/* 柔和亚光布面漫反射 (取代刺眼的塑料白光反射) */}
        <linearGradient id="fabricSoftDiffuse" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.08" />
          <stop offset="35%" stopColor="#ffffff" stopOpacity="0.10" />
          <stop offset="75%" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
        </linearGradient>

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

        <radialGradient id="amberPendantGrad" cx="35%" cy="30%" rx="65%" ry="65%">
          <stop offset="0%" stopColor={theme.pendantBeadGrad[0]} />
          <stop offset="35%" stopColor={theme.pendantBeadGrad[1]} />
          <stop offset="75%" stopColor={theme.pendantBeadGrad[2]} />
          <stop offset="100%" stopColor={theme.pendantBeadGrad[3]} />
        </radialGradient>

        <linearGradient id="goldFringeFull" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={theme.fringeGrad[0]} />
          <stop offset="60%" stopColor={theme.fringeGrad[1]} />
          <stop offset="100%" stopColor={theme.fringeGrad[2]} />
        </linearGradient>
      </defs>

      {/* === UNDER-STRUCTURE (Recessed Base & Pedestal Legs) === */}
      <g id="tableBaseStructure">
        <rect x="58" y="55" width="444" height="80" rx="3" fill="url(#apronPanelGrad)" />

        <rect x="62" y="55" width="140" height="80" fill="rgba(255, 235, 205, 0.05)" />
        <rect x="210" y="55" width="140" height="80" fill="rgba(255, 235, 205, 0.07)" />
        <rect x="358" y="55" width="140" height="80" fill="rgba(255, 235, 205, 0.05)" />

        <line x1="205" y1="55" x2="205" y2="135" stroke="#48301c" strokeWidth="3" />
        <line x1="207" y1="55" x2="207" y2="135" stroke="#dfc09c" strokeWidth="1" opacity="0.6" />

        <line x1="353" y1="55" x2="353" y2="135" stroke="#48301c" strokeWidth="3" />
        <line x1="355" y1="55" x2="355" y2="135" stroke="#dfc09c" strokeWidth="1" opacity="0.6" />

        <rect x="52" y="55" width="48" height="82" rx="2" fill="url(#legBlockGrad)" />
        <line x1="53" y1="55" x2="53" y2="137" stroke="#edd4b8" strokeWidth="1.2" opacity="0.8" />
        <rect x="96" y="55" width="5" height="82" fill="#4d321c" opacity="0.45" />

        <rect x="460" y="55" width="48" height="82" rx="2" fill="url(#legBlockGrad)" />
        <line x1="461" y1="55" x2="461" y2="137" stroke="#edd4b8" strokeWidth="1.2" opacity="0.8" />
        <rect x="460" y="55" width="5" height="82" fill="#4d321c" opacity="0.45" />

        <rect x="52" y="132" width="456" height="5" rx="1" fill="#6e4c2b" />
        <rect x="52" y="55" width="456" height="14" fill="#2d1b0d" opacity="0.65" />
      </g>

      {/* === UPPER TABLETOP SLAB === */}
      <g id="tableTopSlab">
        <polygon
          points="14,16 546,16 556,52 4,52"
          fill="url(#woodTableTopGrad)"
          stroke="#cfb290"
          strokeWidth="0.8"
        />

        <path d="M 25 24 Q 280 23 535 24" stroke="#e0c4a4" strokeWidth="0.9" fill="none" opacity="0.75" />
        <path d="M 18 33 Q 280 32 542 33" stroke="#e0c4a4" strokeWidth="1.0" fill="none" opacity="0.7" />
        <path d="M 12 42 Q 280 41 548 42" stroke="#e0c4a4" strokeWidth="1.1" fill="none" opacity="0.65" />

        <ellipse cx="280" cy="34" rx="210" ry="14" fill="#fff9ef" opacity="0.35" />

        {showTableRunner && (
          <TableclothTopSurface
            theme={theme}
            MotifComponent={tableclothModule.MotifComponent}
          />
        )}

        {showPetals && (
          <g id="scatteredTablePetals">
            <ellipse cx="132" cy="46" rx="4.5" ry="2.2" fill="#2d1a0e" opacity="0.3" transform="rotate(25 132 46)" />
            <path d="M 130 42 C 136 40, 138 48, 131 47 C 127 46, 127 43, 130 42 Z" fill="#f472b6" />

            <ellipse cx="178" cy="48" rx="5" ry="2.2" fill="#2d1a0e" opacity="0.28" transform="rotate(-15 178 48)" />
            <ellipse cx="178" cy="47" rx="4.5" ry="2" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.5" transform="rotate(-15 178 47)" />

            <ellipse cx="236" cy="49" rx="4" ry="1.8" fill="#2d1a0e" opacity="0.25" transform="rotate(35 236 49)" />
            <ellipse cx="236" cy="48" rx="3.6" ry="1.8" fill="#fda4af" transform="rotate(35 236 48)" />

            <ellipse cx="376" cy="48" rx="5" ry="2" fill="#2d1a0e" opacity="0.28" transform="rotate(20 376 48)" />
            <ellipse cx="376" cy="47" rx="4.6" ry="2" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.5" transform="rotate(20 376 47)" />

            <ellipse cx="426" cy="46" rx="4.2" ry="2" fill="#2d1a0e" opacity="0.3" transform="rotate(-30 426 46)" />
            <path d="M 424 43 C 430 41, 432 48, 425 47 C 421 46, 421 44, 424 43 Z" fill="#f472b6" />
          </g>
        )}

        {showTableRunner ? (
          <TableclothFrontValance
            style={tableclothStyle}
            theme={theme}
            drapePath={tableclothModule.getFrontDrapePath()}
            CenterpieceComponent={tableclothModule.CenterpieceComponent}
          />
        ) : (
          <g id="bareWoodFrontSlab">
            <polygon
              points="4,52 556,52 556,54.5 4,54.5"
              fill="url(#bevelSpecularGrad)"
            />
            <rect
              x="4"
              y="54"
              width="552"
              height="20"
              rx="1.5"
              fill="url(#frontSlabGrad)"
            />
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

        <line x1="4" y1="74" x2="556" y2="74" stroke="#52361d" strokeWidth="1.5" />

        <polygon points="14,16 4,52 4,74 8,74 16,16" fill="url(#endgrainLeft)" opacity="0.6" />
        <polygon points="546,16 556,52 556,74 552,74 544,16" fill="url(#endgrainRight)" opacity="0.6" />
      </g>

      {/* === FLOOR CONTACT SHADOW === */}
      <ellipse cx="76" cy="139" rx="38" ry="4.5" fill="#201208" opacity="0.85" />
      <ellipse cx="484" cy="139" rx="38" ry="4.5" fill="#201208" opacity="0.85" />
      <rect x="74" y="137" width="412" height="4" rx="2" fill="#201208" opacity="0.75" />

      <ellipse
        cx={280 + shadowTiltX * 1.5}
        cy="146"
        rx="270"
        ry="12"
        fill="url(#tableFloorShadowGrad)"
      />
    </svg>
  );
};
