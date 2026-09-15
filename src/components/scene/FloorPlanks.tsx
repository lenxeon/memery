/**
 * @file FloorPlanks.tsx
 * @description 祭坛地板层，负责渲染具有禅意质感的古朴木质条纹透视地板与阴影。
 */
import React from 'react';
import { LightingSettings } from '../../types';

interface FloorPlanksProps {
  lighting: LightingSettings;
}

export const FloorPlanks: React.FC<FloorPlanksProps> = ({ lighting }) => {
  const { masterOn, timeOfDay, sunAngle, sunlightIntensity, godRaysEnabled } = lighting;

  const lightFactor = masterOn ? sunlightIntensity : 0.08;

  // Harmonious natural floor palettes matching room ambiance in both lit and unlit states
  const getFloorPalette = () => {
    if (!masterOn) {
      return {
        baseFloor: 'from-[#090706] via-[#120f0d]/90 to-transparent',
        plankSeam: 'rgba(35, 24, 18, 0.45)',
        sunlightColor: 'rgba(255, 180, 100, 0.08)',
        sunlightCore: 'rgba(255, 200, 120, 0.12)',
        ambientShadow: 'rgba(5, 4, 3, 0.6)',
      };
    }
    switch (timeOfDay) {
      case 'sunset':
        return {
          baseFloor: 'from-[#c9956d] via-[#dcb08d]/60 to-transparent',
          plankSeam: 'rgba(120, 75, 45, 0.16)',
          sunlightColor: 'rgba(255, 205, 145, 0.65)',
          sunlightCore: 'rgba(255, 235, 195, 0.85)',
          ambientShadow: 'rgba(60, 35, 18, 0.35)',
        };
      case 'night':
        return {
          baseFloor: 'from-[#0e121a] via-[#161d2b]/60 to-transparent',
          plankSeam: 'rgba(15, 22, 35, 0.35)',
          sunlightColor: 'rgba(160, 190, 240, 0.15)',
          sunlightCore: 'rgba(190, 215, 255, 0.22)',
          ambientShadow: 'rgba(6, 10, 18, 0.5)',
        };
      case 'day':
      default:
        return {
          baseFloor: 'from-[#d2b89a] via-[#e5d2be]/60 to-transparent',
          plankSeam: 'rgba(130, 95, 65, 0.12)',
          sunlightColor: 'rgba(255, 246, 220, 0.72)',
          sunlightCore: 'rgba(255, 253, 240, 0.9)',
          ambientShadow: 'rgba(70, 45, 25, 0.28)',
        };
    }
  };

  const palette = getFloorPalette();

  return (
    <div
      className="absolute inset-x-0 bottom-0 h-[45%] max-h-[440px] w-full pointer-events-none overflow-hidden select-none z-10"
      style={{
        maskImage: 'linear-gradient(to top, black 0%, black 25%, rgba(0,0,0,0.6) 65%, transparent 96%)',
        WebkitMaskImage: 'linear-gradient(to top, black 0%, black 25%, rgba(0,0,0,0.6) 65%, transparent 96%)',
      }}
    >
      {/* 1. Base Wooden Floor Perspective Planks (Fades naturally to transparent at the top) */}
      <div
        className={`absolute inset-0 bg-gradient-to-t ${palette.baseFloor} transition-colors duration-700`}
      >
        {/* SVG Perspective Floorboard Lines */}
        <svg
          viewBox="0 0 1000 400"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="softWoodGrain" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="25%" stopColor="rgba(0,0,0,0.03)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="75%" stopColor="rgba(0,0,0,0.03)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
            </linearGradient>

            {/* Subtle soft gradient fade into vanishing distance */}
            <linearGradient id="plankDepthFade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="40%" stopColor="rgba(0,0,0,0.02)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.05)" />
            </linearGradient>
          </defs>

          {/* Perspective floorboard seams radiating gently from vanishing center point */}
          <line x1="120" y1="0" x2="-60" y2="400" stroke={palette.plankSeam} strokeWidth="1.8" />
          <line x1="260" y1="0" x2="140" y2="400" stroke={palette.plankSeam} strokeWidth="1.8" />
          <line x1="390" y1="0" x2="330" y2="400" stroke={palette.plankSeam} strokeWidth="1.8" />
          <line x1="500" y1="0" x2="500" y2="400" stroke={palette.plankSeam} strokeWidth="2.0" />
          <line x1="610" y1="0" x2="670" y2="400" stroke={palette.plankSeam} strokeWidth="1.8" />
          <line x1="740" y1="0" x2="860" y2="400" stroke={palette.plankSeam} strokeWidth="1.8" />
          <line x1="880" y1="0" x2="1060" y2="400" stroke={palette.plankSeam} strokeWidth="1.8" />

          {/* Gentle horizontal floor cuts */}
          <line x1="0" y1="130" x2="1000" y2="130" stroke={palette.plankSeam} strokeWidth="1" opacity="0.6" />
          <line x1="0" y1="270" x2="1000" y2="270" stroke={palette.plankSeam} strokeWidth="1.2" opacity="0.7" />

          <rect x="0" y="0" width="1000" height="400" fill="url(#softWoodGrain)" />
          <rect x="0" y="0" width="1000" height="400" fill="url(#plankDepthFade)" />
        </svg>
      </div>

      {/* 2. Warm Sunlit Light Puddle projected from Cathedral Window onto Floor */}
      {masterOn && godRaysEnabled && (
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-700 pointer-events-none"
          style={{
            opacity: lightFactor * 0.9,
            transform: `translateX(${sunAngle * 3.5}px)`,
          }}
        >
          <svg
            viewBox="0 0 800 400"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <defs>
              <radialGradient id="sunFloorSoftGlow" cx="50%" cy="60%" rx="46%" ry="42%">
                <stop offset="0%" stopColor={palette.sunlightCore} stopOpacity="0.85" />
                <stop offset="35%" stopColor={palette.sunlightColor} stopOpacity="0.65" />
                <stop offset="65%" stopColor={palette.sunlightColor} stopOpacity="0.25" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Smooth, atmospheric sunlight footprint on floor - No harsh lines or dirty blotches */}
            <ellipse
              cx="400"
              cy="230"
              rx="370"
              ry="165"
              fill="url(#sunFloorSoftGlow)"
            />

            {/* Soft, gentle window reflection warmth */}
            <ellipse
              cx="400"
              cy="220"
              rx="260"
              ry="110"
              fill={palette.sunlightCore}
              opacity="0.3"
            />
          </svg>
        </div>
      )}

      {/* 3. Deep ambient floor shadow directly beneath the altar table */}
      <div
        className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 w-[90%] max-w-[620px] h-20 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(45, 28, 14, 0.35) 0%, rgba(55, 35, 18, 0.16) 45%, transparent 75%)',
        }}
      />
    </div>
  );
};
