/**
 * @file RoyalDrapeWall.tsx
 * @description 【紫绶金章】深绛金边帷幔与祥云暗纹背景墙组件。
 */
import React from 'react';
import { WallStyleProps, WallAmbiance } from '../types';
import { TimeOfDay } from '../../../../types';

export const getRoyalDrapeAmbiance = (timeOfDay: TimeOfDay, masterOn: boolean): WallAmbiance => {
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
        ? 'rgba(155, 48, 18, 0.14)'
        : timeOfDay === 'sunset'
        ? 'rgba(195, 78, 38, 0.24)'
        : 'rgba(200, 82, 40, 0.18)',
    nicheBevel: timeOfDay === 'night' ? '#2e1208' : '#45180c',
    archBorder: timeOfDay === 'night' ? '#5c2210' : '#782e12',
    archInner: timeOfDay === 'night' ? '#3a1808' : '#8e3616',
    mullion: '#c89420',
    sunOrb: 'radial-gradient(circle, #fffdf0 0%, #fde8c0 40%, rgba(245, 188, 80, 0.18) 75%, transparent 100%)',
  };
};

export const RoyalDrapeDefs: React.FC<{ timeOfDay: TimeOfDay; masterOn?: boolean }> = ({ timeOfDay, masterOn }) => (
  <>
    <linearGradient id="curtainGradL" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor={timeOfDay === 'night' ? '#3e0e05' : '#7a1818'} />
      <stop offset="70%" stopColor={timeOfDay === 'night' ? '#521408' : '#9a2020'} stopOpacity="0.92" />
      <stop offset="100%" stopColor={timeOfDay === 'night' ? '#3e1005' : '#7a1212'} stopOpacity="0.82" />
    </linearGradient>

    <linearGradient id="curtainGradR" x1="100%" y1="0%" x2="0%" y2="0%">
      <stop offset="0%" stopColor={timeOfDay === 'night' ? '#3e0e05' : '#7a1818'} />
      <stop offset="70%" stopColor={timeOfDay === 'night' ? '#521408' : '#9a2020'} stopOpacity="0.92" />
      <stop offset="100%" stopColor={timeOfDay === 'night' ? '#3e1005' : '#7a1212'} stopOpacity="0.82" />
    </linearGradient>

    <linearGradient id="royalDrapeLightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      {!masterOn ? (
        <>
          <stop offset="0%" stopColor="#100d0b" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#171410" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0f0d0b" stopOpacity="0.3" />
        </>
      ) : (
        <>
          <stop offset="0%" stopColor={timeOfDay === 'night' ? '#2a1a06' : '#fef8e8'} />
          <stop offset="50%" stopColor={timeOfDay === 'night' ? '#201204' : '#faecc8'} />
          <stop offset="100%" stopColor={timeOfDay === 'night' ? '#160c00' : '#f5e0a0'} />
        </>
      )}
    </linearGradient>
  </>
);

export const RoyalDrapeWall: React.FC<WallStyleProps> = ({ timeOfDay }) => {
  return (
    <g id="royalDrapeStage">
      {/* Outer mahogany arch frame with gold gilding */}
      <path
        d="M 14 210 A 196 196 0 0 1 406 210 L 406 618 L 14 618 Z"
        fill="none"
        stroke={timeOfDay === 'night' ? '#1e0c04' : '#2e1408'}
        strokeWidth="14"
        opacity="0.95"
      />
      <path
        d="M 22 210 A 188 188 0 0 1 398 210 L 398 614 L 22 614 Z"
        fill="none"
        stroke="url(#goldFilletGrad)"
        strokeWidth="3"
      />
      <path
        d="M 26 210 A 184 184 0 0 1 394 210 L 394 610 L 26 610 Z"
        fill="none"
        stroke={timeOfDay === 'night' ? '#5c2210' : '#78300e'}
        strokeWidth="5"
      />

      {/* Warm amber center backdrop (visible between parted curtains) */}
      <path
        d="M 30 210 A 180 180 0 0 1 390 210 L 390 607 L 30 607 Z"
        fill="url(#royalDrapeLightGrad)"
      />

      {/* Left silk curtain */}
      <path
        d="M 28 607 L 28 210 C 32 100 90 38 132 30 C 120 62 145 120 160 210 L 162 607 Z"
        fill="url(#curtainGradL)"
      />
      {[44, 64, 84, 104, 124, 144].map((x) => (
        <line
          key={x}
          x1={x}
          y1="215"
          x2={x + 8}
          y2="605"
          stroke={timeOfDay === 'night' ? '#5a1810' : '#7a1010'}
          strokeWidth="1"
          opacity="0.22"
        />
      ))}
      <path
        d="M 45 215 C 46 300 48 450 50 605"
        stroke={timeOfDay === 'night' ? '#c05020' : '#e06030'}
        strokeWidth="5"
        fill="none"
        opacity="0.12"
        strokeLinecap="round"
      />

      {/* Right silk curtain */}
      <path
        d="M 392 607 L 392 210 C 388 100 330 38 288 30 C 300 62 275 120 260 210 L 258 607 Z"
        fill="url(#curtainGradR)"
      />
      {[276, 296, 316, 336, 356, 376].map((x) => (
        <line
          key={x}
          x1={x}
          y1="215"
          x2={x - 8}
          y2="605"
          stroke={timeOfDay === 'night' ? '#5a1810' : '#7a1010'}
          strokeWidth="1"
          opacity="0.22"
        />
      ))}
      <path
        d="M 375 215 C 374 300 372 450 370 605"
        stroke={timeOfDay === 'night' ? '#c05020' : '#e06030'}
        strokeWidth="5"
        fill="none"
        opacity="0.12"
        strokeLinecap="round"
      />

      {/* Top Swag / Valance */}
      <path
        d="M 28 210 C 60 120 110 90 210 128 C 310 90 360 120 392 210 C 360 160 300 135 210 148 C 120 135 60 160 28 210 Z"
        fill={timeOfDay === 'night' ? '#681812' : '#8e2020'}
        stroke={timeOfDay === 'night' ? '#8a2015' : '#b02c2c'}
        strokeWidth="2"
      />
      <path
        d="M 28 210 C 100 148 210 168 210 168 C 210 168 320 148 392 210"
        stroke="url(#goldFilletGrad)"
        strokeWidth="2.5"
        fill="none"
      />

      {/* Gold tie-back ropes and tassels */}
      <g transform="translate(136, 330)">
        <path d="M -8 -8 C 0 10 12 18 18 20" stroke="url(#goldFilletGrad)" strokeWidth="3" fill="none" />
        <ellipse cx="14" cy="22" rx="4.5" ry="3" fill="#caa262" />
        <path d="M 12 24 L 8 46 L 20 46 Z" fill="#d4aa48" stroke="#8a6018" strokeWidth="0.8" />
        <circle cx="14" cy="23" r="2.5" fill="#fef08a" />
      </g>
      <g transform="translate(284, 330)">
        <path d="M 8 -8 C 0 10 -12 18 -18 20" stroke="url(#goldFilletGrad)" strokeWidth="3" fill="none" />
        <ellipse cx="-14" cy="22" rx="4.5" ry="3" fill="#caa262" />
        <path d="M -12 24 L -8 46 L -20 46 Z" fill="#d4aa48" stroke="#8a6018" strokeWidth="0.8" />
        <circle cx="-14" cy="23" r="2.5" fill="#fef08a" />
      </g>

      {/* Central imperial hanging pendant */}
      <g transform="translate(210, 155)">
        <polygon points="0,-12 12,0 0,12 -12,0" fill="#a56c28" stroke="url(#goldFilletGrad)" strokeWidth="1.8" />
        <circle cx="0" cy="0" r="5" fill="#dca842" />
        <line x1="0" y1="12" x2="0" y2="28" stroke="url(#goldFilletGrad)" strokeWidth="1.8" />
        <path d="M -5 28 L 5 28 L 3 44 L -3 44 Z" fill="#caa262" stroke="#8a6018" strokeWidth="0.8" />
      </g>
    </g>
  );
};
