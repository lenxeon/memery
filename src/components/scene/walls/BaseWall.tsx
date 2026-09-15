/**
 * @file BaseWall.tsx
 * @description 背景墙基类包装组件，统一处理景深渐变、晨昏光照色相偏移与居中挂落阴影。
 */
import React from 'react';
import { WallAmbiance } from './types';

interface BaseWallProps {
  masterOn?: boolean;
  sunlightIntensity: number;
  ambiance: WallAmbiance;
  defsSlot?: React.ReactNode;
  environmentSlot?: React.ReactNode;
  children: React.ReactNode;
}

export const BaseWall: React.FC<BaseWallProps> = ({
  masterOn = true,
  sunlightIntensity,
  ambiance,
  defsSlot,
  environmentSlot,
  children,
}) => {
  const effectiveOpacity = masterOn ? Math.max(0.35, sunlightIntensity) : 0.45;

  return (
    <div className="absolute inset-x-0 top-0 bottom-0 flex flex-col items-center pointer-events-none select-none z-0 overflow-hidden">
      {/* ── 1. Soft Atmospheric Wall Glow (光学滤色，柔和融入室内墙面，绝对零硬切边缘) ── */}
      {masterOn && (
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[840px] h-[860px] pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse at 50% 32%, ${ambiance.halo} 0%, rgba(255,248,230,0.18) 32%, rgba(255,245,220,0.06) 62%, transparent 88%)`,
            opacity: effectiveOpacity,
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* ── 2. Environment Decor Slot (全景环境外围装饰：如竹影、落地宫灯、挺拔青竹) ── */}
      {environmentSlot}

      {/* ── 3. Main Architectural Structure (通体落地，立柱坚实挺拔，绝不半空虚化模糊) ── */}
      <div
        className="relative w-[380px] sm:w-[440px] h-[660px] sm:h-[740px] mt-2 flex flex-col items-center overflow-visible"
        style={{
          opacity: effectiveOpacity,
          transition: 'opacity 0.6s ease',
        }}
      >
        {/* Soft Sun/Moon Light Source behind window opening */}
        {masterOn && ambiance.sunOrb !== 'transparent' && (
          <div
            className="absolute top-12 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full pointer-events-none z-0"
            style={{
              background: ambiance.sunOrb,
              transform: `scale(${0.9 + sunlightIntensity * 0.4})`,
              mixBlendMode: 'screen',
            }}
          />
        )}

        <svg
          viewBox="0 0 420 720"
          className="relative z-10 w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Common Antiqued Gilded Rim Gradient */}
            <linearGradient id="goldFilletGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8cd8a" />
              <stop offset="35%" stopColor="#caa262" />
              <stop offset="70%" stopColor="#9a7638" />
              <stop offset="100%" stopColor="#6e4f1f" />
            </linearGradient>

            {/* Custom Defs from Specific Style */}
            {defsSlot}
          </defs>

          {/* Render Style Specific Content */}
          {children}
        </svg>
      </div>
    </div>
  );
};
