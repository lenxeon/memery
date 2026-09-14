import React from 'react';
import { IncenseSmoke } from './IncenseSmoke';

interface ItemCenserProps {
  isLit: boolean;
  onToggle: () => void;
  windForce?: number;
  density?: number;
  sunlightIntensity?: number;
  masterOn?: boolean;
  timeOfDay?: 'day' | 'sunset' | 'night';
  scale?: number;
  className?: string;
}

export const ItemCenser: React.FC<ItemCenserProps> = ({
  isLit,
  onToggle,
  windForce = 0,
  density = 1,
  sunlightIntensity = 0.8,
  masterOn = true,
  timeOfDay = 'day',
  scale = 1,
  className = '',
}) => {
  return (
    <div 
      className={`relative select-none flex flex-col items-center ${className}`}
      style={{
        width: 100 * scale,
        height: 140 * scale,
      }}
    >
      <div 
        className="absolute -top-44 left-1/2 -translate-x-1/2 pointer-events-auto"
        style={{ width: 160, height: 280 }}
      >
        <IncenseSmoke
          isLit={isLit}
          onToggle={onToggle}
          windForce={windForce}
          density={density}
          sunlightIntensity={sunlightIntensity}
          masterOn={masterOn}
          timeOfDay={timeOfDay}
        />
      </div>

      <div 
        className="absolute bottom-0 w-full h-[52px] cursor-pointer"
        onClick={onToggle}
        title={isLit ? '点击熄灭香火' : '点击敬点清香'}
      >
        <svg 
          viewBox="0 0 100 52" 
          className="w-full h-full filter drop-shadow-md"
        >
          <defs>
            <linearGradient id="censerGlazeG" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d2cdc3" />
              <stop offset="25%" stopColor="#f4efe6" />
              <stop offset="60%" stopColor="#ebe4d8" />
              <stop offset="85%" stopColor="#d6cec1" />
              <stop offset="100%" stopColor="#beb5a6" />
            </linearGradient>

            <linearGradient id="ashGradG" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8c857b" />
              <stop offset="50%" stopColor="#c5beb3" />
              <stop offset="100%" stopColor="#dfd9ce" />
            </linearGradient>
          </defs>

          <ellipse cx="50" cy="50" rx="32" ry="3" fill="#2d2218" opacity="0.4" />

          {/* Foot */}
          <path d="M 36 46 L 38 49 L 62 49 L 64 46 Z" fill="#b0a89a" />

          {/* Body */}
          <path
            d="M 22 14
               C 10 24, 12 42, 36 46
               L 64 46
               C 88 42, 90 24, 78 14
               Z"
            fill="url(#censerGlazeG)"
            stroke="#c4bcad"
            strokeWidth="1"
          />

          <ellipse cx="50" cy="28" rx="20" ry="7" fill="#ffffff" opacity="0.35" />

          {/* Rim */}
          <ellipse cx="50" cy="14" rx="28" ry="7" fill="url(#censerGlazeG)" stroke="#c8c0b2" strokeWidth="1" />
          <ellipse cx="50" cy="13.5" rx="24" ry="5.5" fill="url(#ashGradG)" />

          <circle cx="44" cy="13" r="1.5" fill="#595249" opacity="0.4" />
          <circle cx="56" cy="14" r="1.2" fill="#4d463d" opacity="0.5" />
          <circle cx="50" cy="12.5" r="2" fill="#fff" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
};
