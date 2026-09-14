import React from 'react';
import { LightingSettings } from '../types';

interface FloorPlanksProps {
  lighting: LightingSettings;
}

export const FloorPlanks: React.FC<FloorPlanksProps> = ({ lighting }) => {
  const { masterOn, timeOfDay, sunAngle, sunlightIntensity, godRaysEnabled } = lighting;

  // Compute lighting intensity
  const lightFactor = masterOn ? sunlightIntensity : 0.08;

  // Colors based on time of day
  const getFloorPalette = () => {
    switch (timeOfDay) {
      case 'sunset':
        return {
          baseFloor: 'from-[#d2ad8a] via-[#e5c5a4] to-[#cba682]',
          plankSeam: 'rgba(95, 60, 35, 0.28)',
          sunlightColor: 'rgba(255, 205, 145, 0.72)',
          sunlightCore: 'rgba(255, 235, 195, 0.85)',
          shadowColor: 'rgba(70, 42, 22, 0.45)',
        };
      case 'night':
        return {
          baseFloor: 'from-[#1a1f2c] via-[#232a3b] to-[#121622]',
          plankSeam: 'rgba(10, 15, 25, 0.5)',
          sunlightColor: 'rgba(160, 190, 240, 0.18)',
          sunlightCore: 'rgba(190, 215, 255, 0.25)',
          shadowColor: 'rgba(5, 8, 15, 0.65)',
        };
      case 'day':
      default:
        return {
          baseFloor: 'from-[#debfa0] via-[#eed4b9] to-[#d6b493]',
          plankSeam: 'rgba(110, 80, 52, 0.22)',
          sunlightColor: 'rgba(255, 246, 220, 0.78)',
          sunlightCore: 'rgba(255, 253, 240, 0.92)',
          shadowColor: 'rgba(80, 55, 35, 0.38)',
        };
    }
  };

  const palette = getFloorPalette();

  return (
    <div className="absolute inset-x-0 bottom-0 h-[48%] max-h-[460px] w-full pointer-events-none overflow-hidden select-none z-10">
      {/* 1. Base Wooden Floor Perspective Planks */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t ${palette.baseFloor} transition-colors duration-700`}
        style={{
          boxShadow: 'inset 0 30px 40px rgba(45, 28, 14, 0.35)',
        }}
      >
        {/* SVG Perspective Floorboard Lines */}
        <svg 
          viewBox="0 0 1000 400" 
          className="absolute inset-0 w-full h-full" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="plankFade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.4)" />
              <stop offset="30%" stopColor="rgba(0,0,0,0.12)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.02)" />
            </linearGradient>

            <linearGradient id="woodGrainH" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
              <stop offset="25%" stopColor="rgba(0,0,0,0.04)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="75%" stopColor="rgba(0,0,0,0.05)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.06)" />
            </linearGradient>
          </defs>

          {/* Perspective floorboard seams radiating slightly from vanishing center point (500, -200) */}
          <line x1="120" y1="0" x2="-60" y2="400" stroke={palette.plankSeam} strokeWidth="2.2" />
          <line x1="260" y1="0" x2="140" y2="400" stroke={palette.plankSeam} strokeWidth="2.2" />
          <line x1="390" y1="0" x2="330" y2="400" stroke={palette.plankSeam} strokeWidth="2.2" />
          <line x1="500" y1="0" x2="500" y2="400" stroke={palette.plankSeam} strokeWidth="2.4" />
          <line x1="610" y1="0" x2="670" y2="400" stroke={palette.plankSeam} strokeWidth="2.2" />
          <line x1="740" y1="0" x2="860" y2="400" stroke={palette.plankSeam} strokeWidth="2.2" />
          <line x1="880" y1="0" x2="1060" y2="400" stroke={palette.plankSeam} strokeWidth="2.2" />

          {/* Subtle horizontal plank cuts */}
          <line x1="0" y1="120" x2="1000" y2="120" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
          <line x1="0" y1="260" x2="1000" y2="260" stroke="rgba(0,0,0,0.06)" strokeWidth="1.2" />

          {/* Depth shading vignette at wall/floor intersection */}
          <rect x="0" y="0" width="1000" height="400" fill="url(#plankFade)" />
          <rect x="0" y="0" width="1000" height="400" fill="url(#woodGrainH)" />
        </svg>
      </div>

      {/* 2. Arched Window Sunlight & Mullion Shadow Projection on Floor (as seen in user image!) */}
      {masterOn && godRaysEnabled && (
        <div 
          className="absolute inset-0 flex items-center justify-center transition-all duration-700 pointer-events-none"
          style={{
            opacity: lightFactor,
            transform: `translateX(${sunAngle * 3.5}px)`,
          }}
        >
          <svg 
            viewBox="0 0 800 400" 
            className="w-full h-full filter blur-[1.5px]"
            preserveAspectRatio="none"
            style={{ mixBlendMode: 'screen' }}
          >
            <defs>
              {/* Radial gradient for the soft sunlit puddle */}
              <radialGradient id="sunFloorPuddle" cx="50%" cy="55%" rx="48%" ry="45%">
                <stop offset="0%" stopColor={palette.sunlightCore} stopOpacity="0.95" />
                <stop offset="35%" stopColor={palette.sunlightColor} stopOpacity="0.8" />
                <stop offset="70%" stopColor={palette.sunlightColor} stopOpacity="0.35" />
                <stop offset="100%" stopColor="rgba(255, 230, 160, 0)" stopOpacity="0" />
              </radialGradient>

              {/* Clip path shaping the arched window light footprint on floor */}
              <clipPath id="archLightClip">
                <ellipse cx="400" cy="220" rx="360" ry="175" />
              </clipPath>
            </defs>

            {/* Sunlight puddle bounded by window arch perspective ellipse */}
            <ellipse 
              cx="400" 
              cy="220" 
              rx="360" 
              ry="175" 
              fill="url(#sunFloorPuddle)" 
            />

            {/* Projected Window Mullion Shadows (the dark window frame lines projected across the floor!) */}
            <g clipPath="url(#archLightClip)" opacity="0.48">
              {/* Vertical center window bar shadow */}
              <line 
                x1="400" y1="30" x2="400" y2="400" 
                stroke={palette.shadowColor} 
                strokeWidth="14" 
                strokeLinecap="round"
              />
              {/* Left & right vertical window bars */}
              <line 
                x1="240" y1="60" x2="200" y2="400" 
                stroke={palette.shadowColor} 
                strokeWidth="11" 
                strokeLinecap="round"
              />
              <line 
                x1="560" y1="60" x2="600" y2="400" 
                stroke={palette.shadowColor} 
                strokeWidth="11" 
                strokeLinecap="round"
              />

              {/* Horizontal window transom bar shadow */}
              <line 
                x1="40" y1="180" x2="760" y2="180" 
                stroke={palette.shadowColor} 
                strokeWidth="13" 
              />
              <line 
                x1="80" y1="280" x2="720" y2="280" 
                stroke={palette.shadowColor} 
                strokeWidth="11" 
              />

              {/* Projected Dappled Leaf Silhouettes (树影摇曳) on the right side of the floor */}
              <g transform="translate(480, 240) scale(1.1)" fill={palette.shadowColor} opacity="0.75">
                <ellipse cx="40" cy="20" rx="22" ry="11" transform="rotate(-25 40 20)" />
                <ellipse cx="70" cy="35" rx="26" ry="13" transform="rotate(15 70 35)" />
                <ellipse cx="100" cy="20" rx="20" ry="10" transform="rotate(-10 100 20)" />
                <ellipse cx="60" cy="60" rx="24" ry="12" transform="rotate(35 60 60)" />
                <ellipse cx="90" cy="70" rx="22" ry="11" transform="rotate(-30 90 70)" />
                <ellipse cx="30" cy="50" rx="18" ry="9" transform="rotate(45 30 50)" />
                <ellipse cx="120" cy="50" rx="22" ry="10" transform="rotate(10 120 50)" />
                <path d="M 30 40 Q 60 45 110 50" stroke={palette.shadowColor} strokeWidth="3" fill="none" />
              </g>
            </g>
          </svg>
        </div>
      )}

      {/* 3. Deep ambient floor shadow right behind the altar table */}
      <div 
        className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-[620px] h-24 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(40, 24, 12, 0.45) 0%, rgba(50, 30, 15, 0.25) 45%, rgba(0, 0, 0, 0) 75%)',
          filter: 'blur(10px)',
        }}
      />
    </div>
  );
};
