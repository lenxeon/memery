/**
 * @file BronzeMirrorWall.tsx
 * @description 【青铜古鉴】玄色浮雕砖与青铜重器神韵背景墙组件。
 */
import React from 'react';
import { WallStyleProps, WallAmbiance } from '../types';
import { TimeOfDay } from '../../../types';

export const getBronzeMirrorAmbiance = (timeOfDay: TimeOfDay, masterOn: boolean): WallAmbiance => {
  if (!masterOn) {
    return {
      halo: 'rgba(0, 0, 0, 0)',
      nicheBevel: '#1c1713',
      archBorder: '#27201a',
      archInner: '#171310',
      mullion: '#1e1914',
      sunOrb: 'transparent',
    };
  }

  return {
    halo:
      timeOfDay === 'night'
        ? 'rgba(150, 115, 45, 0.14)'
        : timeOfDay === 'sunset'
        ? 'rgba(192, 152, 65, 0.24)'
        : 'rgba(205, 162, 75, 0.22)',
    nicheBevel: timeOfDay === 'night' ? '#221a10' : '#3a2c1a',
    archBorder: timeOfDay === 'night' ? '#3c2e1c' : '#55431e',
    archInner: timeOfDay === 'night' ? '#1e1a10' : '#c8a650',
    mullion: '#7a6035',
    sunOrb: 'radial-gradient(circle, #fffdf5 0%, #fef4d0 40%, rgba(248, 215, 120, 0.2) 75%, transparent 100%)',
  };
};

export const BronzeMirrorDefs: React.FC<{ timeOfDay: TimeOfDay }> = ({ timeOfDay }) => (
  <radialGradient id="mirrorFaceGrad" cx="50%" cy="45%" r="50%">
    <stop offset="0%" stopColor="#fffef8" />
    <stop offset="40%" stopColor={timeOfDay === 'night' ? '#fef4d0' : '#fef8e0'} />
    <stop offset="75%" stopColor={timeOfDay === 'night' ? '#f8e0a0' : '#faecc0'} />
    <stop offset="100%" stopColor={timeOfDay === 'night' ? '#ecc870' : '#f0d890'} />
  </radialGradient>
);

export const BronzeMirrorWall: React.FC<WallStyleProps> = ({ timeOfDay }) => {
  return (
    <g id="bronzeMirrorWall">
      {/* Outer alcove shadow arch */}
      <path
        d="M 14 210 A 196 196 0 0 1 406 210 L 406 618 L 14 618 Z"
        fill="none"
        stroke={timeOfDay === 'night' ? '#1a140c' : '#2c2014'}
        strokeWidth="14"
        opacity="0.95"
      />
      <path
        d="M 22 210 A 188 188 0 0 1 398 210 L 398 614 L 22 614 Z"
        fill="none"
        stroke={timeOfDay === 'night' ? '#3a2c18' : '#5a4225'}
        strokeWidth="4"
      />

      {/* Deep wood backdrop panel */}
      <path
        d="M 26 210 A 184 184 0 0 1 394 210 L 394 610 L 26 610 Z"
        fill={timeOfDay === 'night' ? '#18120c' : '#2a1e12'}
      />

      {/* Central Grand Bronze Mirror (古法大圆铜镜) */}
      <circle cx="210" cy="200" r="148" fill="#1e160e" stroke="#3d2c18" strokeWidth="6" />
      <circle cx="210" cy="200" r="142" fill="none" stroke="url(#goldFilletGrad)" strokeWidth="3" />
      <circle
        cx="210"
        cy="200"
        r="136"
        fill="none"
        stroke={timeOfDay === 'night' ? '#6a5028' : '#8a6830'}
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />

      {/* Mirror cast rim petals */}
      {Array.from({ length: 16 }, (_, i) => {
        const angle = (i * 22.5 * Math.PI) / 180;
        const cx = 210 + 130 * Math.cos(angle);
        const cy = 200 + 130 * Math.sin(angle);
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="4.5"
            fill={timeOfDay === 'night' ? '#aa8030' : '#caa262'}
            stroke="#4a3010"
            strokeWidth="0.8"
          />
        );
      })}

      {/* Inner mirror rim */}
      <circle cx="210" cy="200" r="124" fill="none" stroke="url(#goldFilletGrad)" strokeWidth="2" />
      <circle cx="210" cy="200" r="120" fill="url(#mirrorFaceGrad)" />

      {/* Subtle auspicious cloud reflections on mirror surface */}
      <path
        d="M 160 170 Q 185 155 210 168 Q 235 155 260 170 Q 235 185 210 176 Q 185 185 160 170 Z"
        fill="#ffffff"
        opacity="0.22"
      />
      <circle cx="210" cy="200" r="28" fill="none" stroke="url(#goldFilletGrad)" strokeWidth="1.5" opacity="0.6" />
      <circle cx="210" cy="200" r="12" fill={timeOfDay === 'night' ? '#c89838' : '#dca842'} opacity="0.4" />

      {/* Wooden support frame side pillars */}
      <rect
        x="30"
        y="340"
        width="22"
        height="264"
        rx="2"
        fill={timeOfDay === 'night' ? '#2c2018' : '#3c2e18'}
        stroke="#8a6830"
        strokeWidth="1.5"
      />
      <line x1="41" y1="344" x2="41" y2="600" stroke="url(#goldFilletGrad)" strokeWidth="1.2" />
      <rect
        x="368"
        y="340"
        width="22"
        height="264"
        rx="2"
        fill={timeOfDay === 'night' ? '#2c2018' : '#3c2e18'}
        stroke="#8a6830"
        strokeWidth="1.5"
      />
      <line x1="379" y1="344" x2="379" y2="600" stroke="url(#goldFilletGrad)" strokeWidth="1.2" />

      {/* Horizontal divider beam */}
      <rect
        x="30"
        y="336"
        width="360"
        height="7"
        rx="1.5"
        fill={timeOfDay === 'night' ? '#2c2015' : '#3c2e18'}
        stroke="url(#goldFilletGrad)"
        strokeWidth="1.2"
      />

      {/* Lower oval cartouche ornament */}
      <ellipse cx="210" cy="462" rx="70" ry="44" fill="none" stroke="#9a7830" strokeWidth="2" opacity="0.65" />
      <ellipse cx="210" cy="462" rx="52" ry="32" fill="none" stroke="url(#goldFilletGrad)" strokeWidth="1.2" opacity="0.55" />
      <path
        d="M 176 462 Q 210 446 244 462 Q 210 478 176 462 Z"
        fill={timeOfDay === 'night' ? '#c89838' : '#daa840'}
        opacity="0.35"
      />
    </g>
  );
};
