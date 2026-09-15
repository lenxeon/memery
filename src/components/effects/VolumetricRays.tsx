/**
 * @file VolumetricRays.tsx
 * @description 丁达尔晨曦光束特效组件，营造自上而下的神圣与静谧光柱。
 */
import React, { useId } from 'react';

interface VolumetricRaysProps {
  enabled: boolean;
  intensity: number;
  sunAngle: number;
  timeOfDay: 'day' | 'sunset' | 'night';
}

export const VolumetricRays: React.FC<VolumetricRaysProps> = ({
  enabled,
  intensity,
  sunAngle,
  timeOfDay,
}) => {
  const uid = useId().replace(/:/g, '');
  const idMain = `godRayMain-${uid}`;
  const idLeft = `godRayLeft-${uid}`;
  const idRight = `godRayRight-${uid}`;
  const idFilter = `godRayBlur-${uid}`;
  const idMask = `godRayMask-${uid}`;

  if (!enabled || intensity <= 0.02) return null;

  // Photographic atmospheric light color palettes designed for additive screen blending
  const getColor = () => {
    switch (timeOfDay) {
      case 'sunset':
        return {
          primary: 'rgba(255, 185, 100, 0.65)',
          beam1: 'rgba(255, 160, 75, 0.45)',
          beam2: 'rgba(255, 200, 120, 0.22)',
          ambientHaze: 'rgba(255, 175, 90, 0.15)',
        };
      case 'night':
        return {
          primary: 'rgba(175, 205, 255, 0.35)',
          beam1: 'rgba(150, 190, 255, 0.22)',
          beam2: 'rgba(190, 220, 255, 0.12)',
          ambientHaze: 'rgba(160, 200, 255, 0.08)',
        };
      case 'day':
      default:
        return {
          primary: 'rgba(255, 246, 218, 0.72)',
          beam1: 'rgba(255, 236, 185, 0.52)',
          beam2: 'rgba(255, 245, 220, 0.28)',
          ambientHaze: 'rgba(255, 240, 200, 0.18)',
        };
    }
  };

  const colors = getColor();

  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10 transition-opacity duration-700"
      style={{ 
        opacity: Math.min(1, intensity * 0.95),
        mixBlendMode: 'screen', // 模拟光学加色混合（光束与背景平滑叠加，绝不产生硬边发暗色块）
      }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 800 1000"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Gaussian Atmospheric Scattering Filter for velvety, seamless ray diffusion */}
          <filter id={idFilter} x="-30%" y="-20%" width="160%" height="150%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="22 10" />
          </filter>

          {/* Smooth radial-linear mask ensuring ray origin at top has 0 hard edge */}
          <linearGradient id={idMask} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="12%" stopColor="#fff" stopOpacity="0.4" />
            <stop offset="35%" stopColor="#fff" stopOpacity="1" />
            <stop offset="70%" stopColor="#fff" stopOpacity="0.65" />
            <stop offset="95%" stopColor="#fff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>

          {/* Main radiant cathedral light beam */}
          <linearGradient id={idMain} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0" />
            <stop offset="15%" stopColor={colors.primary} stopOpacity="0.55" />
            <stop offset="35%" stopColor={colors.beam1} stopOpacity="0.75" />
            <stop offset="60%" stopColor={colors.beam2} stopOpacity="0.35" />
            <stop offset="85%" stopColor={colors.beam2} stopOpacity="0.1" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
          </linearGradient>

          {/* Left angled shaft */}
          <linearGradient id={idLeft} x1="45%" y1="5%" x2="20%" y2="100%">
            <stop offset="0%" stopColor={colors.beam1} stopOpacity="0" />
            <stop offset="20%" stopColor={colors.beam1} stopOpacity="0.6" />
            <stop offset="45%" stopColor={colors.beam1} stopOpacity="0.45" />
            <stop offset="75%" stopColor={colors.beam2} stopOpacity="0.18" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
          </linearGradient>

          {/* Right angled shaft */}
          <linearGradient id={idRight} x1="55%" y1="5%" x2="80%" y2="100%">
            <stop offset="0%" stopColor={colors.beam1} stopOpacity="0" />
            <stop offset="20%" stopColor={colors.beam1} stopOpacity="0.6" />
            <stop offset="45%" stopColor={colors.beam1} stopOpacity="0.45" />
            <stop offset="75%" stopColor={colors.beam2} stopOpacity="0.18" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Diffused Tyndall Light Group with Gaussian Filter & Smooth Mask */}
        <g 
          mask={`url(#${idMask})`}
          filter={`url(#${idFilter})`}
          style={{
            transformOrigin: '400px 120px',
            transform: `rotate(${sunAngle * 0.45}deg)`,
            transition: 'transform 0.4s ease-out',
          }}
        >
          {/* Broad Ambient Soft Light Cone */}
          <polygon
            points="240,-50 560,-50 780,1050 20,1050"
            fill={`url(#${idMain})`}
            opacity="0.85"
          />

          {/* Core Luminous Shaft */}
          <polygon
            points="320,0 480,0 640,1050 160,1050"
            fill={`url(#${idMain})`}
            opacity="0.75"
          />

          {/* Left Angled Sunlight Beam */}
          <polygon
            points="310,30 420,30 390,1050 100,1050"
            fill={`url(#${idLeft})`}
            opacity="0.6"
          />

          {/* Right Angled Sunlight Beam */}
          <polygon
            points="420,30 500,30 700,1050 440,1050"
            fill={`url(#${idRight})`}
            opacity="0.55"
          />
        </g>
      </svg>
    </div>
  );
};
