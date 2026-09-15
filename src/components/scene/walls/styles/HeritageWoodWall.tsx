/**
 * @file HeritageWoodWall.tsx
 * @description 【古朴苍然】深色原木立柱与榫卯结构背景墙组件。
 */
import React from 'react';
import { WallStyleProps, WallAmbiance } from '../types';
import { TimeOfDay } from '../../../types';

export const getHeritageWoodAmbiance = (timeOfDay: TimeOfDay, masterOn: boolean): WallAmbiance => {
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
        ? 'rgba(217, 119, 6, 0.14)'
        : timeOfDay === 'sunset'
        ? 'rgba(234, 88, 12, 0.25)'
        : 'rgba(245, 158, 11, 0.28)',
    nicheBevel: timeOfDay === 'night' ? '#26150c' : '#3d2314',
    archBorder: timeOfDay === 'night' ? '#3e2313' : '#5c3820',
    archInner: timeOfDay === 'night' ? '#2a1a10' : '#fcf8ee',
    mullion: timeOfDay === 'night' ? '#321c0e' : '#4a2c17',
    sunOrb: 'radial-gradient(circle, #fffbeb 0%, #fed7aa 40%, rgba(245, 158, 11, 0.18) 75%, transparent 100%)',
  };
};

export const HeritageWoodDefs: React.FC<{ timeOfDay: TimeOfDay; masterOn?: boolean }> = ({ timeOfDay, masterOn }) => (
  <>
    {/* Fretwork Lattice Pattern for Heritage Wood */}
    <pattern id="fretworkLattice" width="32" height="32" patternUnits="userSpaceOnUse">
      <rect width="32" height="32" fill="none" stroke="#4a2c17" strokeWidth="1.8" />
      <path
        d="M 0 16 L 16 16 L 16 0 M 16 32 L 16 16 L 32 16 M 8 8 L 8 16 M 24 16 L 24 24"
        fill="none"
        stroke="#caa262"
        strokeWidth="0.9"
        opacity="0.85"
      />
    </pattern>

    <linearGradient id="heritageWoodLightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      {!masterOn ? (
        <>
          <stop offset="0%" stopColor="#100d0b" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#171410" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0f0d0b" stopOpacity="0.3" />
        </>
      ) : (
        <>
          <stop offset="0%" stopColor={timeOfDay === 'night' ? '#2d1b10' : '#fdfaf3'} />
          <stop offset="50%" stopColor={timeOfDay === 'night' ? '#23140a' : '#faecd5'} />
          <stop offset="100%" stopColor={timeOfDay === 'night' ? '#1a0d05' : '#f5dcba'} />
        </>
      )}
    </linearGradient>
  </>
);

export const HeritageWoodWall: React.FC<WallStyleProps> = ({ timeOfDay }) => {
  return (
    <g id="heritageWoodScreen">
      {/* Outer Deep Rosewood Reveal */}
      <path
        d="M 14 210 A 196 196 0 0 1 406 210 L 406 618 L 14 618 Z"
        fill="none"
        stroke="#3d2314"
        strokeWidth="12"
        opacity="0.95"
      />

      {/* Gold Trim Fillet */}
      <path
        d="M 22 210 A 188 188 0 0 1 398 210 L 398 614 L 22 614 Z"
        fill="none"
        stroke="url(#goldFilletGrad)"
        strokeWidth="2.5"
      />

      {/* Recessed Frame Reveal */}
      <path
        d="M 28 210 A 182 182 0 0 1 392 210 L 392 610 L 28 610 Z"
        fill="none"
        stroke={timeOfDay === 'night' ? '#231208' : '#4a2c17'}
        strokeWidth="7"
      />

      {/* Mulberry Paper Backlit Opening */}
      <path
        d="M 34 210 A 176 176 0 0 1 386 210 L 386 605 L 34 605 Z"
        fill="url(#heritageWoodLightGrad)"
      />

      {/* Fretwork Lattice Grid */}
      <rect x="36" y="212" width="348" height="392" fill="url(#fretworkLattice)" opacity="0.8" />

      {/* Upper Arch Radiant Spokes */}
      <path d="M 210 34 L 210 210" stroke="#4a2c17" strokeWidth="4.5" />
      <path d="M 210 34 L 210 210" stroke="url(#goldFilletGrad)" strokeWidth="1.2" />
      <path d="M 90 95 L 210 210" stroke="#4a2c17" strokeWidth="4" />
      <path d="M 330 95 L 210 210" stroke="#4a2c17" strokeWidth="4" />

      {/* Central Diamond Medallion */}
      <polygon points="210,110 238,138 210,166 182,138" fill="#3d2314" stroke="url(#goldFilletGrad)" strokeWidth="2.5" />
      <circle cx="210" cy="138" r="7" fill="#5c3820" stroke="#caa262" strokeWidth="1.2" />

      {/* Horizontal Transom Beam */}
      <rect x="26" y="206" width="368" height="8" rx="1.5" fill="#4a2c17" stroke="url(#goldFilletGrad)" strokeWidth="1.2" />
    </g>
  );
};
