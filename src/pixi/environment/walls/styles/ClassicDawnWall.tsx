/**
 * @file ClassicDawnWall.tsx
 * @description 【晨光破晓】古建中式格栅窗与晨曦金辉背景墙组件。
 */
import React from 'react';
import { WallStyleProps, WallAmbiance } from '../types';
import { TimeOfDay } from '../../../../types';

export const getClassicDawnAmbiance = (timeOfDay: TimeOfDay, masterOn: boolean): WallAmbiance => {
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
        ? 'rgba(140, 180, 255, 0.12)'
        : timeOfDay === 'sunset'
        ? 'rgba(255, 190, 110, 0.32)'
        : 'rgba(255, 245, 210, 0.38)',
    nicheBevel: timeOfDay === 'night' ? '#242e42' : timeOfDay === 'sunset' ? '#cfa682' : '#e5cca9',
    archBorder: timeOfDay === 'night' ? '#38445e' : timeOfDay === 'sunset' ? '#e6cbb1' : '#faecdc',
    archInner: timeOfDay === 'night' ? '#1e283c' : timeOfDay === 'sunset' ? '#d9b698' : '#edd3b9',
    mullion: timeOfDay === 'night' ? '#182030' : timeOfDay === 'sunset' ? '#cca480' : '#dfbe9e',
    sunOrb:
      'radial-gradient(circle, rgba(255, 248, 220, 0.85) 0%, rgba(254, 230, 165, 0.45) 35%, rgba(254, 215, 130, 0.12) 65%, transparent 80%)',
  };
};

export const ClassicDawnDefs: React.FC<{ timeOfDay: TimeOfDay; masterOn?: boolean }> = ({ timeOfDay, masterOn }) => (
  <linearGradient id="classicDawnLightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
    {!masterOn ? (
      <>
        <stop offset="0%" stopColor="#100d0b" stopOpacity="0.6" />
        <stop offset="50%" stopColor="#171410" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#0f0d0b" stopOpacity="0.3" />
      </>
    ) : (
      <>
        <stop offset="0%" stopColor={timeOfDay === 'night' ? '#1a2336' : '#fffcf5'} stopOpacity="0.95" />
        <stop offset="45%" stopColor={timeOfDay === 'night' ? '#0f172a' : '#fef4dc'} stopOpacity="0.9" />
        <stop offset="100%" stopColor={timeOfDay === 'night' ? '#040814' : '#fae4c2'} stopOpacity="0.85" />
      </>
    )}
  </linearGradient>
);

export const ClassicDawnWall: React.FC<WallStyleProps> = ({ ambiance }) => {
  return (
    <g id="standardArchWindow">
      {/* Outer Alcove Niche Reveal Bevel */}
      <path
        d="M 12 210 A 198 198 0 0 1 408 210 L 408 618 L 12 618 Z"
        fill="none"
        stroke={ambiance.nicheBevel}
        strokeWidth="14"
        opacity={0.8}
      />

      {/* Recessed Niche Inner Arch Reveal */}
      <path
        d="M 22 210 A 188 188 0 0 1 398 210 L 398 614 L 22 614 Z"
        fill="none"
        stroke={ambiance.archBorder}
        strokeWidth="8"
      />

      {/* Window Glass Pane Opening */}
      <path
        d="M 26 210 A 184 184 0 0 1 394 210 L 394 610 L 26 610 Z"
        fill="url(#classicDawnLightGrad)"
        stroke={ambiance.archInner}
        strokeWidth="3.5"
      />

      {/* Semi-circular Arch Radial Spokes */}
      <line x1="210" y1="26" x2="210" y2="210" stroke={ambiance.mullion} strokeWidth="5.5" strokeLinecap="round" />
      <line x1="80" y1="80" x2="210" y2="210" stroke={ambiance.mullion} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="340" y1="80" x2="210" y2="210" stroke={ambiance.mullion} strokeWidth="4.5" strokeLinecap="round" />

      {/* Horizontal Transom Bar */}
      <rect x="24" y="207" width="372" height="7" rx="1.5" fill={ambiance.mullion} />
      <line x1="24" y1="207" x2="396" y2="207" stroke="#ffffff" strokeWidth="1" opacity={0.6} />

      {/* Lower Grid Window Mullions */}
      <line x1="210" y1="210" x2="210" y2="610" stroke={ambiance.mullion} strokeWidth="5.5" />
      <line x1="118" y1="210" x2="118" y2="610" stroke={ambiance.mullion} strokeWidth="4.2" />
      <line x1="302" y1="210" x2="302" y2="610" stroke={ambiance.mullion} strokeWidth="4.2" />

      {/* Horizontal Cross Bars */}
      <line x1="26" y1="340" x2="394" y2="340" stroke={ambiance.mullion} strokeWidth="5" />
      <line x1="26" y1="472" x2="394" y2="472" stroke={ambiance.mullion} strokeWidth="5" />

      {/* Glass Specular Shine Highlight Lines */}
      <line x1="50" y1="230" x2="90" y2="320" stroke="#ffffff" strokeWidth="2.5" opacity="0.4" strokeLinecap="round" />
      <line x1="140" y1="230" x2="180" y2="320" stroke="#ffffff" strokeWidth="2.5" opacity="0.4" strokeLinecap="round" />
    </g>
  );
};
