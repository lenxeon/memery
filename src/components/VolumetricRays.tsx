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
  const idMain  = `godRayMain-${uid}`;
  const idLeft  = `godRayLeft-${uid}`;
  const idRight = `godRayRight-${uid}`;

  if (!enabled || intensity <= 0.02) return null;

  const getColor = () => {
    switch (timeOfDay) {
      case 'sunset':
        return {
          primary: 'rgba(255, 185, 110, 0.7)',
          beam1: 'rgba(255, 160, 80, 0.55)',
          beam2: 'rgba(255, 200, 130, 0.35)',
          floorSpot: 'rgba(255, 180, 100, 0.45)',
        };
      case 'night':
        return {
          primary: 'rgba(180, 210, 255, 0.28)',
          beam1: 'rgba(160, 195, 255, 0.2)',
          beam2: 'rgba(200, 225, 255, 0.12)',
          floorSpot: 'rgba(170, 205, 255, 0.2)',
        };
      case 'day':
      default:
        return {
          primary: 'rgba(255, 245, 210, 0.72)',
          beam1: 'rgba(255, 238, 180, 0.56)',
          beam2: 'rgba(255, 248, 220, 0.36)',
          floorSpot: 'rgba(255, 235, 185, 0.55)',
        };
    }
  };

  const colors = getColor();

  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10 transition-opacity duration-500"
      style={{ opacity: intensity }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 800 1000"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Main radiant cathedral light beam with soft multi-stop falloff */}
          <linearGradient id={idMain} x1="50%" y1="10%" x2="50%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.75" />
            <stop offset="25%" stopColor={colors.beam1} stopOpacity="0.5" />
            <stop offset="55%" stopColor={colors.beam2} stopOpacity="0.22" />
            <stop offset="85%" stopColor={colors.beam2} stopOpacity="0.06" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
          </linearGradient>

          {/* Left angled shaft */}
          <linearGradient id={idLeft} x1="45%" y1="15%" x2="20%" y2="100%">
            <stop offset="0%" stopColor={colors.beam1} stopOpacity="0.65" />
            <stop offset="30%" stopColor={colors.beam1} stopOpacity="0.38" />
            <stop offset="65%" stopColor={colors.beam2} stopOpacity="0.15" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
          </linearGradient>

          {/* Right angled shaft */}
          <linearGradient id={idRight} x1="55%" y1="15%" x2="80%" y2="100%">
            <stop offset="0%" stopColor={colors.beam1} stopOpacity="0.65" />
            <stop offset="30%" stopColor={colors.beam1} stopOpacity="0.38" />
            <stop offset="65%" stopColor={colors.beam2} stopOpacity="0.15" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Diffused Tyndall Light Group - 100% Vector Hardware Accelerated (0 blur penalty) */}
        <g 
          style={{
            transformOrigin: '400px 150px',
            transform: `rotate(${sunAngle * 0.5}deg)`,
            transition: 'transform 0.4s ease-out',
          }}
        >
          {/* Wide Ambient Shaft */}
          <polygon
            points="280,100 520,100 750,960 50,960"
            fill={`url(#${idMain})`}
            opacity="0.9"
          />

          {/* Core Luminous Shaft */}
          <polygon
            points="340,110 460,110 620,960 180,960"
            fill={`url(#${idMain})`}
            opacity="0.8"
          />

          {/* Left Angle Sub-shaft */}
          <polygon
            points="320,130 420,130 380,960 120,960"
            fill={`url(#${idLeft})`}
            opacity="0.65"
          />

          {/* Right Angle Sub-shaft */}
          <polygon
            points="420,130 490,130 680,960 460,960"
            fill={`url(#${idRight})`}
            opacity="0.6"
          />
        </g>
      </svg>

      {/* Light pool on floor using pure radial gradient with soft stops */}
      <div
        className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 w-[90%] max-w-[560px] h-40 rounded-[100%] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${colors.floorSpot} 0%, rgba(255, 230, 170, 0.25) 40%, rgba(255, 210, 140, 0.08) 65%, transparent 80%)`,
          transform: `translateX(calc(-50% + ${sunAngle * 4}px)) scaleY(0.48)`,
          transition: 'transform 0.4s ease-out, background 0.5s ease',
        }}
      />
    </div>
  );
};
