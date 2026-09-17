/**
 * @file RosesFlower.tsx
 * @description 【典雅温情】重瓣香槟粉玫瑰插花组件。
 * 具备精致旋涡花心、层叠波浪舒展翻瓣、玫瑰专属锯齿叶片与修长花萼、以及微风摇曳与生命周期花瓣掉落。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const ROSES_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.48, fallSpan: 0.06, startX: 106, startY: 46, landX: 110, landY: 194, rx: 6.8, ry: 3.5, landRot: 30, swayAmp: 14, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.35, fallSpan: 0.06, startX: 40, startY: 54, landX: 44, landY: 193, rx: 7.2, ry: 3.8, landRot: -32, swayAmp: 13, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.18, fallSpan: 0.06, startX: 94, startY: 58, landX: 100, landY: 195, rx: 7.5, ry: 4.0, landRot: 22, swayAmp: 16, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.08, fallSpan: 0.05, startX: 75, startY: 28, landX: 82, landY: 196, rx: 8.0, ry: 4.2, landRot: -20, swayAmp: 15, swayFreq: 4.0 },
];

export const RosesFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  // 优雅香槟粉渐变
  const roseCore0 = lerpColor('#f43f5e', '#883038', dryFactor);
  const roseCore60 = lerpColor('#fb7185', '#b25359', dryFactor);
  const roseCore100 = lerpColor('#fda4af', '#cca0a4', dryFactor);

  const petalSoft0 = lerpColor('#ffe4e6', '#f5e8e4', dryFactor);
  const petalSoft50 = lerpColor('#fecdd3', '#dfbdbd', dryFactor);
  const petalSoft100 = lerpColor('#f43f5e', '#943b44', dryFactor);

  const calyxCol = lerpColor('#4ade80', '#634f37', dryFactor);
  const stemCol0 = lerpColor('#22c55e', '#665037', dryFactor);
  const stemCol100 = lerpColor('#14532d', '#291e14', dryFactor);
  const leafCol0 = lerpColor('#16a34a', '#694f31', dryFactor);
  const leafCol100 = lerpColor('#064e3b', '#241b12', dryFactor);

  const mainState = getBlossomDropStyle(health, 0.08);
  const crownState = getBlossomDropStyle(health, 0.18);
  const secState = getBlossomDropStyle(health, 0.35);
  const budState = getBlossomDropStyle(health, 0.48);

  const leafOpacity = isFaded ? 0.35 : Math.max(0.45, health);

  return (
    <g id="rosesFlora">
      <defs>
        {/* 玫瑰花心深邃径向渐变 */}
        <radialGradient id="roseCoreGrad" cx="45%" cy="45%" r="55%">
          <stop offset="0%" stopColor={roseCore0} />
          <stop offset="60%" stopColor={roseCore60} />
          <stop offset="100%" stopColor={roseCore100} />
        </radialGradient>

        {/* 外展翻卷花瓣柔粉渐变 */}
        <linearGradient id="rosePetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={petalSoft0} />
          <stop offset="45%" stopColor={petalSoft50} />
          <stop offset="100%" stopColor={petalSoft100} />
        </linearGradient>

        <linearGradient id="roseStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stemCol0} />
          <stop offset="100%" stopColor={stemCol100} />
        </linearGradient>

        <linearGradient id="roseLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={leafCol0} />
          <stop offset="100%" stopColor={leafCol100} />
        </linearGradient>
      </defs>

      {/* ── 1. 劲挺花枝 (瓶内紧致收束于 x:74~76，出瓶后优雅斜逸) ── */}
      <g id="roseStems">
        <path d="M 75 128 C 75 115, 75 108, 75 80 C 74 60, 75 40, 75 28" stroke="url(#roseStemGrad)" strokeWidth="3.4" fill="none" strokeLinecap="round" />
        <path d="M 74 128 C 74 115, 74 108, 68 96 C 60 84, 52 70, 46 54" stroke="url(#roseStemGrad)" strokeWidth="3.0" fill="none" strokeLinecap="round" />
        <path d="M 76 128 C 76 115, 76 108, 82 96 C 90 84, 96 66, 102 48" stroke="url(#roseStemGrad)" strokeWidth="3.0" fill="none" strokeLinecap="round" />

        {/* 枝干小刺 */}
        <path d="M 75 92 L 71 96 L 75 97 Z" fill={stemCol100} />
        <path d="M 75 74 L 79 78 L 75 79 Z" fill={stemCol100} />
        <path d="M 64 86 L 60 90 L 64 91 Z" fill={stemCol100} />
      </g>

      {/* ── 2. 玫瑰特有标志性·奇数羽状复叶带细锯齿与花茎利刺 ── */}
      <g id="roseStemsExtras">
        {/* 茎上深红利刺 (Rose Thorns) */}
        <polygon points="71,114 65,116 71,118" fill="#881337" opacity="0.9" />
        <polygon points="77,104 83,106 77,108" fill="#881337" opacity="0.9" />
        <polygon points="69,82 63,84 69,86" fill="#881337" opacity="0.85" />
        <polygon points="81,76 87,78 81,80" fill="#881337" opacity="0.85" />
      </g>

      <g id="roseLeaves" style={{ opacity: leafOpacity, transition: 'opacity 0.8s ease-out' }}>
        {/* 左侧三出羽状复叶 (顶生小叶 + 对生两枚侧生小叶，边缘锐细锯齿) */}
        <g className="animate-leaf-sway-1" style={{ transformOrigin: '54px 84px' }}>
          {/* 总叶柄 */}
          <path d="M 68 96 Q 58 92 46 88" stroke="#166534" strokeWidth="1.6" fill="none" />
          {/* 顶小叶 */}
          <path d="M 46 88 C 36 84 26 88 18 92 C 26 98 38 98 46 92 Z" fill="url(#roseLeafGrad)" stroke="#14532d" strokeWidth="0.5" />
          {/* 侧小叶上 */}
          <path d="M 54 90 C 48 80 40 76 34 78 C 36 86 44 92 52 92 Z" fill="url(#roseLeafGrad)" stroke="#14532d" strokeWidth="0.5" />
          {/* 侧小叶下 */}
          <path d="M 58 93 C 54 102 46 108 38 106 C 42 98 50 94 56 93 Z" fill="url(#roseLeafGrad)" stroke="#14532d" strokeWidth="0.5" />
          {/* 羽状叶脉 */}
          <path d="M 46 88 Q 32 92 20 92" stroke="#86efac" strokeWidth="0.7" fill="none" opacity="0.7" />
        </g>

        {/* 右侧三出羽状复叶 */}
        <g className="animate-leaf-sway-2" style={{ transformOrigin: '92px 86px' }}>
          <path d="M 80 96 Q 90 92 102 88" stroke="#166534" strokeWidth="1.6" fill="none" />
          {/* 顶小叶 */}
          <path d="M 102 88 C 112 84 122 88 130 92 C 122 98 110 98 102 92 Z" fill="url(#roseLeafGrad)" stroke="#14532d" strokeWidth="0.5" />
          {/* 侧小叶上 */}
          <path d="M 94 90 C 100 80 108 76 114 78 C 112 86 104 92 96 92 Z" fill="url(#roseLeafGrad)" stroke="#14532d" strokeWidth="0.5" />
          {/* 侧小叶下 */}
          <path d="M 90 93 C 94 102 102 108 110 106 C 106 98 98 94 92 93 Z" fill="url(#roseLeafGrad)" stroke="#14532d" strokeWidth="0.5" />
          <path d="M 102 88 Q 116 92 128 92" stroke="#86efac" strokeWidth="0.7" fill="none" opacity="0.7" />
        </g>
      </g>

      {/* ── 3. 经典重瓣香槟玫瑰群 ── */}
      <g id="roseBlossoms">
        {/* 【主花】：正中大朵盛放玫瑰 (多层旋涡花芯与波浪翻边) */}
        <g transform="translate(75, 28) scale(0.96)">
          <g className="animate-flower-sway-crown">
            <g style={{ opacity: crownState.opacity, transform: `translateY(${crownState.droopY}px)`, transition: 'opacity 0.8s ease-out' }}>
              {/* 最外层舒展翻卷大花瓣 */}
              <path d="M -24 -12 C -32 -32 4 -40 24 -26 C 38 -10 34 20 12 28 C -14 34 -24 10 -24 -12 Z" fill="url(#rosePetalGrad)" stroke="#fecdd3" strokeWidth="0.6" />
              <path d="M 22 -14 C 36 -28 8 -42 -14 -32 C -34 -18 -32 16 -12 26 C 12 32 26 12 22 -14 Z" fill="url(#rosePetalGrad)" stroke="#fecdd3" strokeWidth="0.6" />

              {/* 中层包裹瓣 */}
              <path d="M -18 -10 C -24 -24 4 -30 18 -18 C 28 -6 24 14 8 20 C -8 24 -18 8 -18 -10 Z" fill="url(#rosePetalGrad)" />
              <path d="M 16 -12 C 22 -24 -2 -28 -16 -18 C -26 -6 -20 12 -6 18 C 8 22 18 6 16 -12 Z" fill="url(#rosePetalGrad)" />

              {/* 内层深邃旋涡花芯 */}
              <circle cx="0" cy="0" r="16" fill="url(#roseCoreGrad)" />
              <path d="M -10 -4 C -12 -14 2 -18 10 -10 C 16 -2 12 10 2 12 C -6 14 -10 4 -10 -4 Z" fill="#ffe4e6" opacity="0.85" />
              <path d="M -5 -4 C -6 -10 2 -12 6 -6 C 9 -1 6 6 0 6 C -4 6 -6 1 -5 -4 Z" fill="url(#roseCoreGrad)" />
              <circle cx="0" cy="0" r="2.8" fill="#fda4af" />
            </g>
          </g>
        </g>

        {/* 【副花】：左侧半开倚放粉玫瑰 */}
        <g transform="translate(46, 54) scale(0.82)">
          <g className="animate-flower-sway-left">
            <g style={{ opacity: secState.opacity, transform: `translateY(${secState.droopY}px)`, transition: 'opacity 0.8s ease-out' }}>
              <path d="M -18 -8 C -24 -24 2 -28 14 -18 C 24 -6 20 14 6 20 C -8 22 -18 8 -18 -8 Z" fill="url(#rosePetalGrad)" stroke="#fecdd3" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="13" fill="url(#roseCoreGrad)" />
              <path d="M -8 -3 C -10 -10 2 -12 8 -6 C 12 0 8 8 0 8 C -5 8 -8 3 -8 -3 Z" fill="#ffe4e6" opacity="0.85" />
              <circle cx="0" cy="0" r="2.2" fill="#fda4af" />
            </g>
          </g>
        </g>

        {/* 【幼蕾】：右上枝头含羞小花蕾 (带纤长花萼) */}
        <g transform="translate(102, 48) scale(0.72)">
          <g className="animate-flower-sway-bud">
            <g style={{ opacity: budState.opacity, transform: `translateY(${budState.droopY}px)`, transition: 'opacity 0.8s ease-out' }}>
              {/* 细长五裂绿萼 */}
              <path d="M -6 6 C -12 -4 -8 -18 0 -22 C 8 -18 12 -4 6 6 Z" fill={calyxCol} />
              <path d="M -4 2 Q -14 -8 -16 -18 Q -8 -12 -4 2" fill={calyxCol} />
              <path d="M 4 2 Q 14 -8 16 -18 Q 8 -12 4 2" fill={calyxCol} />
              {/* 顶开微露玫瑰尖 */}
              <ellipse cx="0" cy="-14" rx="7" ry="12" fill="url(#roseCoreGrad)" />
            </g>
          </g>
        </g>
      </g>
    </g>
  );
};
