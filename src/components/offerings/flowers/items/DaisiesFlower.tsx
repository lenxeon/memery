/**
 * @file DaisiesFlower.tsx
 * @description 【清纯雏菊】细密平铺雪白花瓣与凸起金黄圆纽扣花心插花组件。
 * 核心特征：标志性的纯白细长辐射舌状花瓣（16-18枚）围绕着中央一颗凸起饱满的金黄大纽扣花盘，纯净治愈。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const DAISY_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.5, fallSpan: 0.05, startX: 110, startY: 46, landX: 116, landY: 194, rx: 4.6, ry: 2.2, landRot: 28, swayAmp: 14, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.4, fallSpan: 0.05, startX: 42, startY: 52, landX: 40, landY: 193, rx: 4.8, ry: 2.4, landRot: -30, swayAmp: 12, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.3, fallSpan: 0.05, startX: 96, startY: 58, landX: 102, landY: 195, rx: 5.0, ry: 2.5, landRot: -20, swayAmp: 16, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.2, fallSpan: 0.05, startX: 75, startY: 28, landX: 82, landY: 197, rx: 5.2, ry: 2.6, landRot: 36, swayAmp: 18, swayFreq: 4.0 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.04, startX: 58, startY: 46, landX: 66, landY: 196, rx: 5.4, ry: 2.8, landRot: 14, swayAmp: 14, swayFreq: 4.2 },
];

export const DaisiesFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  // 雏菊纯白至枯萎浅茶色衰变
  const whitePetal0 = lerpColor('#ffffff', '#ded2c3', dryFactor);
  const whitePetal50 = lerpColor('#f8fafc', '#bfae9c', dryFactor);
  const whiteShadow = lerpColor('#e2e8f0', '#8c7b64', dryFactor);

  // 金黄大纽扣花心
  const buttonCenter0 = lerpColor('#fef08a', '#caa97b', dryFactor);
  const buttonCenter50 = lerpColor('#facc15', '#9a7846', dryFactor);
  const buttonCenter100 = lerpColor('#ca8a04', '#6b512c', dryFactor);

  const stemCol0 = lerpColor('#4ade80', '#836f56', dryFactor);
  const stemCol100 = lerpColor('#15803d', '#332414', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.5);
  const fl2 = getBlossomDropStyle(health, 0.4);
  const fl3 = getBlossomDropStyle(health, 0.3);
  const fl4 = getBlossomDropStyle(health, 0.2);
  const fl5 = getBlossomDropStyle(health, 0.08);

  const leafOpacity = isFaded ? 0.35 : Math.max(0.45, health);

  // 单朵清纯雏菊
  const renderDaisyBloom = (cx: number, cy: number, outerR: number = 16, centerR: number = 5.6, rot: number = 0) => {
    const petalCount = 18;
    const step = 360 / petalCount;
    return (
      <g transform={`translate(${cx}, ${cy}) rotate(${rot})`}>
        {/* 18 枚均匀平铺辐射长白瓣 */}
        {Array.from({ length: petalCount }).map((_, i) => (
          <g key={i} transform={`rotate(${i * step})`}>
            <path
              d={`M -${outerR * 0.1} -${centerR * 0.8} C -${outerR * 0.16} -${outerR * 0.5}, -${outerR * 0.12} -${outerR * 0.95}, 0 -${outerR} C ${outerR * 0.12} -${outerR * 0.95}, ${outerR * 0.16} -${outerR * 0.5}, ${outerR * 0.1} -${centerR * 0.8} Z`}
              fill="url(#daisyWhiteGrad)"
              stroke={whiteShadow}
              strokeWidth="0.3"
            />
            {/* 花瓣中央白色反光细线 */}
            <line x1="0" y1={-centerR * 0.8} x2="0" y2={-outerR * 0.85} stroke="#ffffff" strokeWidth="0.5" />
          </g>
        ))}

        {/* 凸起饱满的金黄大圆纽扣花心 */}
        <circle cx="0" cy="0" r={centerR} fill="url(#daisyButtonGrad)" stroke={buttonCenter100} strokeWidth="0.6" />
        {/* 纽扣花盘蜂窝同心微环 */}
        <circle cx="0" cy="0" r={centerR * 0.65} fill="none" stroke={buttonCenter100} strokeWidth="0.5" strokeDasharray="1.5, 1" opacity="0.6" />
      </g>
    );
  };

  return (
    <g id="daisiesFlora">
      <defs>
        <radialGradient id="daisyWhiteGrad" cx="50%" cy="80%" r="90%">
          <stop offset="0%" stopColor={whiteShadow} />
          <stop offset="35%" stopColor={whitePetal50} />
          <stop offset="100%" stopColor={whitePetal0} />
        </radialGradient>
        <radialGradient id="daisyButtonGrad" cx="40%" cy="40%" r="65%">
          <stop offset="0%" stopColor={buttonCenter0} />
          <stop offset="65%" stopColor={buttonCenter50} />
          <stop offset="100%" stopColor={buttonCenter100} />
        </radialGradient>
        <linearGradient id="daisyStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stemCol0} />
          <stop offset="100%" stopColor={stemCol100} />
        </linearGradient>
      </defs>

      {/* 细密挺立小花茎 */}
      <g id="daisyStems">
        <path d="M 74 125 C 74 110, 70 85, 48 58" stroke="url(#daisyStemGrad)" strokeWidth="2.8" fill="none" strokeLinecap="round" />
        <path d="M 76 125 C 76 108, 80 85, 102 55" stroke="url(#daisyStemGrad)" strokeWidth="2.8" fill="none" strokeLinecap="round" />
        <path d="M 75 125 C 75 95, 75 65, 75 32" stroke="url(#daisyStemGrad)" strokeWidth="3.0" fill="none" strokeLinecap="round" />
        <path d="M 73 125 C 72 112, 64 95, 36 74" stroke="url(#daisyStemGrad)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d="M 77 125 C 78 112, 86 95, 114 70" stroke="url(#daisyStemGrad)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </g>

      {/* 清纯雏菊特有标志性·基生匙形波缘小叶（上部圆钝匙状、下部收狭成柄，波状钝齿） */}
      <g id="daisyLeaves" style={{ opacity: leafOpacity }}>
        {/* 左侧平展匙形波缘叶 */}
        <g className="animate-leaf-sway-1" style={{ transformOrigin: '73px 115px' }}>
          <path
            d="M 73 118 C 66 116 58 114 48 108 C 42 104 36 106 30 108 C 24 110 22 116 26 120 C 32 124 40 123 52 122 C 62 121 68 120 73 118 Z"
            fill={stemCol100}
          />
          <path d="M 72 118 Q 46 114 26 114" stroke="#86efac" strokeWidth="1.0" fill="none" opacity="0.8" />
          <path d="M 46 115 Q 38 108 30 108" stroke="#86efac" strokeWidth="0.6" fill="none" opacity="0.5" />
        </g>

        {/* 右侧微斜匙形叶 */}
        <g className="animate-leaf-sway-2" style={{ transformOrigin: '77px 116px' }}>
          <path
            d="M 77 118 C 84 116 92 114 102 108 C 108 104 114 106 120 108 C 126 110 128 116 124 120 C 118 124 110 123 98 122 C 88 121 82 120 77 118 Z"
            fill={stemCol100}
          />
          <path d="M 78 118 Q 104 114 124 114" stroke="#86efac" strokeWidth="1.0" fill="none" opacity="0.8" />
          <path d="M 104 115 Q 112 108 120 108" stroke="#86efac" strokeWidth="0.6" fill="none" opacity="0.5" />
        </g>

        {/* 基部中央两枚幼匙叶 */}
        <path d="M 74 122 C 68 118 64 112 66 108 C 70 107 74 112 75 120 Z" fill={stemCol100} opacity="0.85" />
        <path d="M 76 122 C 82 118 86 112 84 108 C 80 107 76 112 75 120 Z" fill={stemCol100} opacity="0.85" />
      </g>

      {/* 5 朵明亮清新的白雏菊 */}
      <g id="daisyBlooms">
        <g style={fl1}>{renderDaisyBloom(114, 62, 14, 4.8, 12)}</g>
        <g style={fl2}>{renderDaisyBloom(38, 66, 14.5, 5.0, -18)}</g>
        <g style={fl3}>{renderDaisyBloom(100, 46, 15.5, 5.4, 25)}</g>
        <g style={fl4}>{renderDaisyBloom(50, 52, 15.0, 5.2, -10)}</g>
        <g style={fl5}>{renderDaisyBloom(75, 26, 17.5, 6.2, 0)}</g>
      </g>
    </g>
  );
};
