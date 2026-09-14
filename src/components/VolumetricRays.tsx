import React from 'react';

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
  if (!enabled || intensity <= 0.02) return null;

  const getColor = () => {
    switch (timeOfDay) {
      case 'sunset':
        return {
          primary: 'rgba(255, 185, 110, 0.45)',
          beam1: 'rgba(255, 160, 80, 0.35)',
          beam2: 'rgba(255, 200, 130, 0.28)',
          floorSpot: 'rgba(255, 180, 100, 0.38)',
        };
      case 'night':
        return {
          primary: 'rgba(180, 210, 255, 0.15)',
          beam1: 'rgba(160, 195, 255, 0.12)',
          beam2: 'rgba(200, 225, 255, 0.08)',
          floorSpot: 'rgba(170, 205, 255, 0.15)',
        };
      case 'day':
      default:
        return {
          primary: 'rgba(255, 245, 210, 0.48)',
          beam1: 'rgba(255, 238, 180, 0.38)',
          beam2: 'rgba(255, 248, 220, 0.26)',
          floorSpot: 'rgba(255, 235, 185, 0.45)',
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
          <linearGradient id="godRayGradMain" x1="50%" y1="10%" x2="50%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.85" />
            <stop offset="40%" stopColor={colors.beam1} stopOpacity="0.65" />
            <stop offset="75%" stopColor={colors.beam2} stopOpacity="0.35" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
          </linearGradient>

          <linearGradient id="godRayGradLeft" x1="45%" y1="15%" x2="20%" y2="100%">
            <stop offset="0%" stopColor={colors.beam1} stopOpacity="0.75" />
            <stop offset="60%" stopColor={colors.beam2} stopOpacity="0.3" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
          </linearGradient>

          <linearGradient id="godRayGradRight" x1="55%" y1="15%" x2="80%" y2="100%">
            <stop offset="0%" stopColor={colors.beam1} stopOpacity="0.75" />
            <stop offset="60%" stopColor={colors.beam2} stopOpacity="0.3" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
          </linearGradient>

          <filter id="godRayBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="32" />
          </filter>
        </defs>

        <g 
          filter="url(#godRayBlur)"
          style={{
            transformOrigin: '400px 150px',
            transform: `rotate(${sunAngle * 0.5}deg)`,
            transition: 'transform 0.4s ease-out',
          }}
        >
          <polygon
            points="290,120 510,120 740,940 60,940"
            fill="url(#godRayGradMain)"
            style={{ mixBlendMode: 'screen' }}
          />
          <polygon
            points="330,140 430,140 380,950 140,950"
            fill="url(#godRayGradLeft)"
            style={{ mixBlendMode: 'screen', opacity: 0.8 }}
          />
          <polygon
            points="420,140 480,140 680,950 480,950"
            fill="url(#godRayGradRight)"
            style={{ mixBlendMode: 'screen', opacity: 0.7 }}
          />
        </g>
      </svg>

      {/* Light pool on floor */}
      <div
        className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 w-[90%] max-w-[560px] h-44 rounded-[100%] blur-3xl pointer-events-none"
        style={{
          backgroundColor: colors.floorSpot,
          mixBlendMode: 'screen',
          transform: `translateX(calc(-50% + ${sunAngle * 4}px)) scaleY(0.48)`,
          transition: 'transform 0.4s ease-out, background-color 0.5s ease',
        }}
      />
    </div>
  );
};
