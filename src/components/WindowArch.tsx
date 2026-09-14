import React from 'react';

interface WindowArchProps {
  sunlightIntensity: number;
  timeOfDay: 'day' | 'sunset' | 'night';
  sunAngle: number;
}

export const WindowArch: React.FC<WindowArchProps> = ({
  sunlightIntensity,
  timeOfDay,
}) => {
  const getSkyColors = () => {
    switch (timeOfDay) {
      case 'sunset':
        return {
          glow: 'from-amber-200 via-orange-300 to-rose-300',
          nicheBevel: '#cfa682',
          archBorder: '#e6cbb1',
          archInner: '#d9b698',
          mullion: '#cca480',
          halo: 'rgba(255, 195, 120, 0.45)',
        };
      case 'night':
        return {
          glow: 'from-indigo-950 via-slate-900 to-blue-950',
          nicheBevel: '#242e42',
          archBorder: '#38445e',
          archInner: '#1e283c',
          mullion: '#182030',
          halo: 'rgba(140, 180, 255, 0.15)',
        };
      case 'day':
      default:
        return {
          glow: 'from-[#fffbf2] via-[#fef4dd] to-[#fbe8c7]',
          nicheBevel: '#e5cca9',
          archBorder: '#faecdc',
          archInner: '#edd3b9',
          mullion: '#dfbe9e',
          halo: 'rgba(255, 240, 190, 0.55)',
        };
    }
  };

  const colors = getSkyColors();
  const effectiveOpacity = Math.max(0.2, sunlightIntensity);

  return (
    <div className="absolute inset-x-0 top-0 bottom-0 flex flex-col items-center pointer-events-none select-none z-0 overflow-hidden">
      {/* 1. Dramatic Volumetric Spotlight Cone from Window illuminating the room wall */}
      <div 
        className="absolute top-2 left-1/2 -translate-x-1/2 w-[720px] h-[780px] pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${colors.halo} 0%, rgba(255,245,220,0.2) 35%, rgba(255,245,220,0) 70%)`,
          opacity: effectiveOpacity,
        }}
      />

      {/* 2. Recessed Architectural Arch Niche & Window Structure */}
      <div 
        className="relative w-[360px] sm:w-[420px] h-[540px] sm:h-[620px] mt-2 flex flex-col items-center overflow-visible"
        style={{
          opacity: effectiveOpacity,
          transition: 'opacity 0.6s ease',
        }}
      >
        <svg 
          viewBox="0 0 420 620" 
          className="w-full h-full filter drop-shadow-xl"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="windowLightGradV2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={timeOfDay === 'night' ? '#1a2336' : '#fffcf5'} stopOpacity="0.95" />
              <stop offset="45%" stopColor={timeOfDay === 'night' ? '#0f172a' : '#fef4dc'} stopOpacity="0.9" />
              <stop offset="100%" stopColor={timeOfDay === 'night' ? '#040814' : '#fae4c2'} stopOpacity="0.85" />
            </linearGradient>

            <linearGradient id="archBevelShading" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.14)" />
              <stop offset="15%" stopColor="rgba(255,255,255,0.25)" />
              <stop offset="85%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.18)" />
            </linearGradient>
          </defs>

          {/* Architectural Recessed Alcove / Niche Outer Wall Reveal (壁龛拱券厚度边缘) */}
          <path
            d="M 12 210 A 198 198 0 0 1 408 210 L 408 618 L 12 618 Z"
            fill="none"
            stroke={colors.nicheBevel}
            strokeWidth="14"
            opacity="0.8"
          />

          {/* Recessed Niche Inner Arch Reveal (内拱券边框) */}
          <path
            d="M 22 210 A 188 188 0 0 1 398 210 L 398 614 L 22 614 Z"
            fill="none"
            stroke={colors.archBorder}
            strokeWidth="8"
          />

          {/* Window Glass Pane Opening */}
          <path
            d="M 26 210 A 184 184 0 0 1 394 210 L 394 610 L 26 610 Z"
            fill="url(#windowLightGradV2)"
            stroke={colors.archInner}
            strokeWidth="3.5"
          />

          {/* Bevel Shading overlay */}
          <path
            d="M 26 210 A 184 184 0 0 1 394 210 L 394 610 L 26 610 Z"
            fill="url(#archBevelShading)"
          />

          {/* Semi-circular Arch Radial Spokes (3 rays as in classical arched windows) */}
          <line x1="210" y1="26" x2="210" y2="210" stroke={colors.mullion} strokeWidth="5.5" strokeLinecap="round" />
          <line x1="80" y1="80" x2="210" y2="210" stroke={colors.mullion} strokeWidth="4.5" strokeLinecap="round" />
          <line x1="340" y1="80" x2="210" y2="210" stroke={colors.mullion} strokeWidth="4.5" strokeLinecap="round" />

          {/* Horizontal Transom Bar (between arch and lower grid) */}
          <rect x="24" y="207" width="372" height="7" rx="1.5" fill={colors.mullion} />
          <line x1="24" y1="207" x2="396" y2="207" stroke="#ffffff" strokeWidth="1" opacity="0.6" />

          {/* Lower Grid Window Mullions */}
          {/* Vertical central mullion */}
          <line x1="210" y1="210" x2="210" y2="610" stroke={colors.mullion} strokeWidth="5.5" />
          {/* Left vertical mullion */}
          <line x1="118" y1="210" x2="118" y2="610" stroke={colors.mullion} strokeWidth="4.2" />
          {/* Right vertical mullion */}
          <line x1="302" y1="210" x2="302" y2="610" stroke={colors.mullion} strokeWidth="4.2" />

          {/* Horizontal cross bars */}
          <line x1="26" y1="340" x2="394" y2="340" stroke={colors.mullion} strokeWidth="5" />
          <line x1="26" y1="472" x2="394" y2="472" stroke={colors.mullion} strokeWidth="5" />

          {/* Glass specular shine highlight lines */}
          <line x1="50" y1="230" x2="90" y2="320" stroke="#ffffff" strokeWidth="2.5" opacity="0.45" strokeLinecap="round" />
          <line x1="140" y1="230" x2="180" y2="320" stroke="#ffffff" strokeWidth="2.5" opacity="0.45" strokeLinecap="round" />
        </svg>

        {/* Soft Golden Sun Orb behind window */}
        {timeOfDay !== 'night' && (
          <div 
            className="absolute top-12 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-amber-100/80 blur-3xl pointer-events-none mix-blend-screen"
            style={{
              transform: `scale(${0.9 + sunlightIntensity * 0.4})`,
            }}
          />
        )}
      </div>
    </div>
  );
};
