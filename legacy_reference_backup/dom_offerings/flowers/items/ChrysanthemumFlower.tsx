/**
 * @file ChrysanthemumFlower.tsx
 * @description 【傲霜高洁】名品工笔重瓣金丝/白菊插花组件。
 * 具备多层曲瓣舒展包裹、浓密立体花芯、经典羽状深裂翠绿菊叶、以及微风拂动与生命周期花瓣飘落系统。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const CHRYSANTHEMUM_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.48, fallSpan: 0.06, startX: 104, startY: 46, landX: 108, landY: 194, rx: 6.5, ry: 2.2, landRot: 32, swayAmp: 13, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.36, fallSpan: 0.06, startX: 38, startY: 54, landX: 42, landY: 193, rx: 7.0, ry: 2.4, landRot: -36, swayAmp: 14, swayFreq: 3.6 },
  { id: 3, detachHealth: 0.2, fallSpan: 0.06, startX: 92, startY: 58, landX: 98, landY: 195, rx: 7.2, ry: 2.5, landRot: 24, swayAmp: 16, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.08, fallSpan: 0.05, startX: 75, startY: 28, landX: 82, landY: 196, rx: 7.8, ry: 2.6, landRot: -20, swayAmp: 15, swayFreq: 4.0 },
];

export const ChrysanthemumFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  // 优雅白菊微透柔金渐变 (纯净凝雪白 -> 花芯柔和金黄)
  const petalTip = lerpColor('#ffffff', '#ded2be', dryFactor);
  const petalMid = lerpColor('#fffbeb', '#cca982', dryFactor);
  const petalBase = lerpColor('#fef08a', '#967448', dryFactor);
  const coreDeep = lerpColor('#ca8a04', '#5e3f19', dryFactor);

  const stemCol0 = lerpColor('#4ade80', '#856644', dryFactor);
  const stemCol100 = lerpColor('#14532d', '#2c1e12', dryFactor);
  const leafCol0 = lerpColor('#16a34a', '#785b39', dryFactor);
  const leafCol100 = lerpColor('#064e3b', '#26180d', dryFactor);

  const mainState = getBlossomDropStyle(health, 0.08);
  const crownState = getBlossomDropStyle(health, 0.2);
  const secState = getBlossomDropStyle(health, 0.36);
  const budState = getBlossomDropStyle(health, 0.48);

  const leafOpacity = isFaded ? 0.35 : Math.max(0.45, health);

  return (
    <g id="chrysanthemumFlora">
      <defs>
        {/* 菊瓣修长流光渐变 */}
        <linearGradient id="chrysPetalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={petalTip} />
          <stop offset="65%" stopColor={petalMid} />
          <stop offset="100%" stopColor={petalBase} />
        </linearGradient>

        <linearGradient id="chrysOuterPetalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={petalTip} />
          <stop offset="85%" stopColor={petalMid} />
          <stop offset="100%" stopColor={petalBase} />
        </linearGradient>

        {/* 菊茎渐变 */}
        <linearGradient id="chrysStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stemCol0} />
          <stop offset="100%" stopColor={stemCol100} />
        </linearGradient>

        {/* 羽裂菊叶深翠渐变 */}
        <linearGradient id="chrysLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={leafCol0} />
          <stop offset="100%" stopColor={leafCol100} />
        </linearGradient>
      </defs>

      {/* ── 1. 坚挺劲拔秋菊枝干 (瓶内聚束于 x:73~77，出瓶后多姿舒展) ── */}
      <g id="chrysStems">
        <path d="M 75 128 C 75 115, 75 108, 75 80 C 74 60, 75 40, 75 28" stroke="url(#chrysStemGrad)" strokeWidth="3.4" fill="none" strokeLinecap="round" />
        <path d="M 74 128 C 74 115, 74 108, 68 96 C 60 84, 54 70, 48 54" stroke="url(#chrysStemGrad)" strokeWidth="3.0" fill="none" strokeLinecap="round" />
        <path d="M 76 128 C 76 115, 76 108, 82 96 C 88 84, 94 65, 98 46" stroke="url(#chrysStemGrad)" strokeWidth="3.0" fill="none" strokeLinecap="round" />
        <path d="M 73 128 C 73 115, 73 108, 65 98 C 55 86, 42 78, 34 70" stroke="url(#chrysStemGrad)" strokeWidth="2.6" fill="none" strokeLinecap="round" />

        <circle cx="76" cy="94" r="1.8" fill={stemCol100} />
        <circle cx="68" cy="80" r="1.6" fill={stemCol100} />
        <circle cx="84" cy="78" r="1.6" fill={stemCol100} />
      </g>

      {/* ── 2. 传统深裂羽状菊叶 (造型分明，锯齿起伏逼真) ── */}
      <g id="chrysLeaves" style={{ opacity: leafOpacity, transition: 'opacity 0.8s ease-out' }}>
        {/* 左侧大菊叶 */}
        <g className="animate-leaf-sway-1" style={{ transformOrigin: '56px 84px' }}>
          <path 
            d="M 56 84 C 44 76 34 68 22 72 C 24 78 30 80 34 84 C 20 86 16 94 22 100 C 32 98 42 94 48 96 C 38 102 36 110 44 112 C 52 108 54 94 56 84 Z" 
            fill="url(#chrysLeafGrad)" 
          />
          {/* 主叶脉 */}
          <path d="M 56 84 Q 40 88 28 88" stroke="#86efac" strokeWidth="0.8" fill="none" opacity="0.6" />
        </g>

        {/* 右侧大菊叶 */}
        <g className="animate-leaf-sway-2" style={{ transformOrigin: '92px 88px' }}>
          <path 
            d="M 92 88 C 104 80 114 74 126 78 C 124 84 118 86 114 90 C 128 92 132 100 126 106 C 116 104 106 100 100 102 C 110 108 112 116 104 118 C 96 114 94 98 92 88 Z" 
            fill="url(#chrysLeafGrad)" 
          />
          <path d="M 92 88 Q 108 92 120 92" stroke="#86efac" strokeWidth="0.8" fill="none" opacity="0.6" />
        </g>
      </g>

      {/* ── 3. 傲霜名品重瓣菊花群 (数十片柔韧弧瓣层层抱拢) ── */}
      <g id="chrysBlossoms">
        {/* 【主花】：正中盛放千丝玉菊 */}
        <g transform="translate(75, 28) scale(0.95)">
          <g className="animate-flower-sway-crown">
            <g style={{ opacity: crownState.opacity, transform: `translateY(${crownState.droopY}px)`, transition: 'opacity 0.8s ease-out' }}>
              {/* 第 1 层：最外圈舒展下垂弧瓣 (16 片长波浪卷瓣) */}
              <g id="outerPetals">
                {Array.from({ length: 16 }).map((_, i) => {
                  const angle = (i * 360) / 16;
                  return (
                    <path
                      key={`out_${i}`}
                      d="M -3 0 C -6 -18 -4 -34 0 -44 C 4 -34 6 -18 3 0 Z"
                      fill="url(#chrysOuterPetalGrad)"
                      stroke="#fef08a"
                      strokeWidth="0.4"
                      transform={`rotate(${angle})`}
                    />
                  );
                })}
              </g>

              {/* 第 2 层：中圈稍短向内聚拢的抱瓣 (14 片) */}
              <g id="midPetals">
                {Array.from({ length: 14 }).map((_, i) => {
                  const angle = (i * 360) / 14 + 12;
                  return (
                    <path
                      key={`mid_${i}`}
                      d="M -2.5 0 C -5 -14 -3 -26 0 -34 C 3 -26 5 -14 2.5 0 Z"
                      fill="url(#chrysPetalGrad)"
                      stroke="#fde047"
                      strokeWidth="0.4"
                      transform={`rotate(${angle})`}
                    />
                  );
                })}
              </g>

              {/* 第 3 层：内圈紧密卷曲花瓣 (12 片) */}
              <g id="innerPetals">
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 360) / 12 + 6;
                  return (
                    <path
                      key={`in_${i}`}
                      d="M -2 0 C -4 -10 -2 -18 0 -22 C 2 -18 4 -10 2 0 Z"
                      fill="url(#chrysPetalGrad)"
                      transform={`rotate(${angle})`}
                    />
                  );
                })}
              </g>

              {/* 核心金黄绒密花芯 */}
              <circle cx="0" cy="0" r="7.5" fill={coreDeep} />
              <circle cx="0" cy="0" r="5" fill="#eab308" />
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 45 * Math.PI) / 180;
                return <circle key={`dot_${i}`} cx={Math.cos(angle) * 4.5} cy={Math.sin(angle) * 4.5} r="0.9" fill="#fef08a" />;
              })}
            </g>
          </g>
        </g>

        {/* 【副花】：左侧半仰初展金菊 */}
        <g transform="translate(48, 54) scale(0.82)">
          <g className="animate-flower-sway-left">
            <g style={{ opacity: secState.opacity, transform: `translateY(${secState.droopY}px)`, transition: 'opacity 0.8s ease-out' }}>
              {Array.from({ length: 14 }).map((_, i) => {
                const angle = (i * 360) / 14;
                return (
                  <path
                    key={`left_out_${i}`}
                    d="M -2.5 0 C -5 -14 -3 -26 0 -32 C 3 -26 5 -14 2.5 0 Z"
                    fill="url(#chrysPetalGrad)"
                    stroke="#fef08a"
                    strokeWidth="0.4"
                    transform={`rotate(${angle})`}
                  />
                );
              })}
              {Array.from({ length: 10 }).map((_, i) => {
                const angle = (i * 360) / 10 + 15;
                return (
                  <path
                    key={`left_in_${i}`}
                    d="M -2 0 C -3 -9 -2 -16 0 -20 C 2 -16 3 -9 2 0 Z"
                    fill="url(#chrysPetalGrad)"
                    transform={`rotate(${angle})`}
                  />
                );
              })}
              <circle cx="0" cy="0" r="5.5" fill={coreDeep} />
            </g>
          </g>
        </g>

        {/* 【副花 2】：右侧稍小侧映金菊 */}
        <g transform="translate(98, 46) scale(0.74)">
          <g className="animate-flower-sway-right">
            <g style={{ opacity: budState.opacity, transform: `translateY(${budState.droopY}px)`, transition: 'opacity 0.8s ease-out' }}>
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 360) / 12;
                return (
                  <path
                    key={`rt_out_${i}`}
                    d="M -2 0 C -4 -12 -2 -22 0 -26 C 2 -22 4 -12 2 0 Z"
                    fill="url(#chrysPetalGrad)"
                    stroke="#fef08a"
                    strokeWidth="0.4"
                    transform={`rotate(${angle})`}
                  />
                );
              })}
              <circle cx="0" cy="0" r="4.5" fill={coreDeep} />
            </g>
          </g>
        </g>
      </g>
    </g>
  );
};
