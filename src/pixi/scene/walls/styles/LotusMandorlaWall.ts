/**
 * @file LotusMandorlaWall.ts
 * @description 【步步生莲】汉白玉浮雕背光与宝相莲花华光背景墙（纯 TS 场景元素）。
 */
import { WallStyleProps, WallAmbiance } from '../types';
import { TimeOfDay } from '../../../../types';

export const getLotusMandorlaAmbiance = (timeOfDay: TimeOfDay, masterOn: boolean): WallAmbiance => {
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
        ? 'rgba(188, 126, 36, 0.18)'
        : timeOfDay === 'sunset'
        ? 'rgba(218, 155, 55, 0.30)'
        : 'rgba(228, 170, 62, 0.30)',
    nicheBevel: timeOfDay === 'night' ? '#221408' : '#38200e',
    archBorder: timeOfDay === 'night' ? '#3c2610' : '#683a16',
    archInner: timeOfDay === 'night' ? '#281808' : '#fdf2e0',
    mullion: '#c89810',
    sunOrb: 'radial-gradient(circle, #fffef5 0%, #fde8a0 45%, rgba(248, 205, 72, 0.2) 75%, transparent 100%)',
  };
};

export const LotusMandorlaDefs = ({ timeOfDay, masterOn }: { timeOfDay: TimeOfDay; masterOn?: boolean }): string => {
  const night = timeOfDay === 'night';
  const lightStops = !masterOn
    ? `
      <stop offset="0%" stop-color="#100d0b" stop-opacity="0.6" />
      <stop offset="50%" stop-color="#171410" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#0f0d0b" stop-opacity="0.3" />`
    : `
      <stop offset="0%" stop-color="${night ? '#321808' : '#c87818'}" />
      <stop offset="50%" stop-color="${night ? '#261204' : '#b46810'}" />
      <stop offset="100%" stop-color="${night ? '#1a0c00' : '#a05808'}" />`;

  return `
  <radialGradient id="lotusGlowGrad" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#fffef8" />
    <stop offset="35%" stop-color="${night ? '#fef0b0' : '#fef5c8'}" />
    <stop offset="70%" stop-color="${night ? '#f8d868' : '#f8e088'}" />
    <stop offset="100%" stop-color="${night ? '#e8b840' : '#f0c840'}" />
  </radialGradient>

  <linearGradient id="lotusMandorlaLightGrad" x1="0%" y1="0%" x2="0%" y2="100%">${lightStops}
  </linearGradient>`;
};

export const LotusMandorlaWall = ({ timeOfDay }: WallStyleProps): string => {
  const night = timeOfDay === 'night';
  const n2 = (v: number): string => v.toFixed(2);

  // 24 Rays of Bodhi Light（长短交替，菩提佛光芒芒射出）
  const rays = Array.from({ length: 24 }, (_, i) => {
    const angle = (i * 15 * Math.PI) / 180;
    const x1 = 210 + 72 * Math.cos(angle);
    const y1 = 212 + 72 * Math.sin(angle);
    const reach = i % 2 === 0 ? 124 : 108;
    const x2 = 210 + reach * Math.cos(angle);
    const y2 = 212 + reach * Math.sin(angle);
    return `<line x1="${n2(x1)}" y1="${n2(y1)}" x2="${n2(x2)}" y2="${n2(y2)}" stroke="${
      night ? '#c89030' : '#f0c050'
    }" stroke-width="${i % 2 === 0 ? '1.8' : '1.0'}" opacity="${i % 2 === 0 ? '0.75' : '0.5'}" />`;
  }).join('\n      ');

  // 16 Tier-1 Outer Lotus Petals（盛唐宝相花大花瓣）
  const outerPetals = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * 22.5 * Math.PI) / 180;
    const cx = 210 + 84 * Math.cos(angle);
    const cy = 212 + 84 * Math.sin(angle);
    return `<ellipse cx="${n2(cx)}" cy="${n2(cy)}" rx="16" ry="28" transform="rotate(${n2(
      i * 22.5 + 90
    )}, ${n2(cx)}, ${n2(cy)})" fill="${
      night ? '#b87820' : '#d89828'
    }" stroke="url(#goldFilletGrad)" stroke-width="1.2" opacity="0.78" />`;
  }).join('\n      ');

  // 8 inner small petals（错位 22.5°）
  const innerPetals = Array.from({ length: 8 }, (_, i) => {
    const angle = ((i * 45 + 22.5) * Math.PI) / 180;
    const cx = 210 + 42 * Math.cos(angle);
    const cy = 212 + 42 * Math.sin(angle);
    return `<ellipse cx="${n2(cx)}" cy="${n2(cy)}" rx="10" ry="16" transform="rotate(${n2(
      i * 45 + 112.5
    )}, ${n2(cx)}, ${n2(cy)})" fill="${night ? '#daa030' : '#f0c048'}" opacity="0.8" />`;
  }).join('\n      ');

  // Lotus seed bumps（莲蓬心，1 心 6 子）
  const seeds = Array.from({ length: 7 }, (_, i) => {
    const r = i === 0 ? 0 : 9;
    const angle = i === 0 ? 0 : ((i - 1) * 60 * Math.PI) / 180;
    return `<circle cx="${n2(210 + r * Math.cos(angle))}" cy="${n2(
      212 + r * Math.sin(angle)
    )}" r="3.5" fill="${night ? '#f8e080' : '#fff090'}" />`;
  }).join('\n      ');

  // Auspicious cloud scrolls（如意云头纹）
  const clouds = Array.from({ length: 4 }, (_, i) => {
    const tone = night ? '#7a4818' : '#a06018';
    const line = night ? '#c89030' : '#e0a840';
    return `<g transform="translate(${60 + i * 82}, 426)">
        <path d="M -15 12 Q -12 0 0 -8 Q 12 0 15 12 Q 8 18 0 14 Q -8 18 -15 12 Z" fill="${tone}" opacity="0.6" />
        <path d="M -10 8 Q -8 0 0 -4 Q 8 0 10 8" fill="none" stroke="${line}" stroke-width="1.2" opacity="0.7" />
      </g>`;
  }).join('\n      ');

  return `
  <g id="lotusMandorlaWall">
    <!-- Deep amber arch frame -->
    <path
      d="M 14 210 A 196 196 0 0 1 406 210 L 406 618 L 14 618 Z"
      fill="none"
      stroke="${night ? '#281408' : '#3c2010'}"
      stroke-width="14"
      opacity="0.95"
    />
    <path
      d="M 22 210 A 188 188 0 0 1 398 210 L 398 614 L 22 614 Z"
      fill="none"
      stroke="url(#goldFilletGrad)"
      stroke-width="3.5"
    />
    <path
      d="M 28 210 A 182 182 0 0 1 392 210 L 392 610 L 28 610 Z"
      fill="none"
      stroke="${night ? '#5a280c' : '#7c3812'}"
      stroke-width="6"
    />

    <!-- Warm backlit shrine interior -->
    <path
      d="M 32 210 A 178 178 0 0 1 388 210 L 388 607 L 32 607 Z"
      fill="url(#lotusMandorlaLightGrad)"
    />

    <!-- Grand Lotus Mandorla Outer Halo (佛光宝相外轮光环) -->
    <circle
      cx="210"
      cy="212"
      r="142"
      fill="none"
      stroke="url(#goldFilletGrad)"
      stroke-width="2.5"
      stroke-dasharray="8 5"
      opacity="0.8"
    />
    <circle
      cx="210"
      cy="212"
      r="128"
      fill="none"
      stroke="${night ? '#caa040' : '#e6be50'}"
      stroke-width="1.5"
      opacity="0.65"
    />

    <!-- 24 Rays of Bodhi Light -->
    ${rays}

    <!-- 16 Tier-1 Outer Lotus Petals -->
    ${outerPetals}

    <!-- Inner lotus ring -->
    <circle
      cx="210"
      cy="212"
      r="62"
      fill="none"
      stroke="${night ? '#c89030' : '#e0a838'}"
      stroke-width="4"
    />
    <circle cx="210" cy="212" r="58" fill="url(#lotusGlowGrad)" />

    <!-- 8 inner small petals -->
    ${innerPetals}

    <!-- Central lotus receptacle (莲蓬心) -->
    <circle
      cx="210"
      cy="212"
      r="26"
      fill="${night ? '#c88820' : '#e0a030'}"
      stroke="url(#goldFilletGrad)"
      stroke-width="2.5"
    />
    <circle cx="210" cy="212" r="18" fill="${night ? '#b07020' : '#d09020'}" />

    <!-- Lotus seed bumps -->
    ${seeds}
    <circle
      cx="210"
      cy="212"
      r="5.5"
      fill="${night ? '#fef0a0' : '#fff5b0'}"
      stroke="#e8c840"
      stroke-width="1"
    />

    <!-- Gold horizontal divider -->
    <rect
      x="36"
      y="392"
      width="348"
      height="5.5"
      rx="1.5"
      fill="${night ? '#5a3010' : '#7a4818'}"
      stroke="url(#goldFilletGrad)"
      stroke-width="1.2"
    />

    <!-- Auspicious cloud scrolls (如意云头纹) -->
    ${clouds}

    <!-- Side pillar accent strips -->
    <rect
      x="34"
      y="216"
      width="12"
      height="386"
      fill="${night ? '#3c2010' : '#5a3018'}"
      stroke="${night ? '#8a5020' : '#a06020'}"
      stroke-width="1"
    />
    <line x1="40" y1="220" x2="40" y2="598" stroke="url(#goldFilletGrad)" stroke-width="1.2" />
    <rect
      x="374"
      y="216"
      width="12"
      height="386"
      fill="${night ? '#3c2010' : '#5a3018'}"
      stroke="${night ? '#8a5020' : '#a06020'}"
      stroke-width="1"
    />
    <line x1="380" y1="220" x2="380" y2="598" stroke="url(#goldFilletGrad)" stroke-width="1.2" />
  </g>`;
};
