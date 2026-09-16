/**
 * @file TulipsFlower.tsx
 * @description 【典雅郁金香】高脚酒杯形圆润花冠与宽展剑叶插花组件。
 * 核心特征：圆润闭合或微启的红酒杯形倒卵花杯、挺拔单生花葶、两枚宽厚抱茎长叶，轮廓一目了然。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const TULIP_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.5, fallSpan: 0.06, startX: 112, startY: 44, landX: 118, landY: 194, rx: 6.8, ry: 4.2, landRot: 28, swayAmp: 14, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.4, fallSpan: 0.06, startX: 38, startY: 52, landX: 40, landY: 193, rx: 7.0, ry: 4.4, landRot: -30, swayAmp: 12, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.3, fallSpan: 0.06, startX: 96, startY: 58, landX: 102, landY: 195, rx: 7.2, ry: 4.5, landRot: -20, swayAmp: 16, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.2, fallSpan: 0.06, startX: 75, startY: 26, landX: 82, landY: 197, rx: 7.4, ry: 4.6, landRot: 36, swayAmp: 18, swayFreq: 4.0 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.05, startX: 56, startY: 46, landX: 64, landY: 196, rx: 7.5, ry: 4.8, landRot: 14, swayAmp: 14, swayFreq: 4.2 },
];

export const TulipsFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  // 郁金香正红带暖金边至枯萎深茶色衰变
  const tulipRed0 = lerpColor('#f43f5e', '#b87b64', dryFactor);
  const tulipRed50 = lerpColor('#e11d48', '#8f4b36', dryFactor);
  const tulipRed100 = lerpColor('#9f1239', '#4d2417', dryFactor);
  const tulipGoldRim = lerpColor('#fde047', '#a88d6b', dryFactor);

  const stemCol0 = lerpColor('#4ade80', '#836f56', dryFactor);
  const stemCol100 = lerpColor('#15803d', '#332414', dryFactor);

  const leafCol0 = lerpColor('#22c55e', '#887355', dryFactor);
  const leafCol100 = lerpColor('#14532d', '#2c2114', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.5);
  const fl2 = getBlossomDropStyle(health, 0.4);
  const fl3 = getBlossomDropStyle(health, 0.3);
  const fl4 = getBlossomDropStyle(health, 0.2);
  const fl5 = getBlossomDropStyle(health, 0.08);

  const leafOpacity = isFaded ? 0.35 : Math.max(0.45, health);

  // 绘制单朵郁金香高脚杯状花冠
  const renderTulipBloom = (cx: number, cy: number, scale: number = 1.0, rot: number = 0) => (
    <g transform={`translate(${cx}, ${cy}) rotate(${rot}) scale(${scale})`}>
      {/* 内部背瓣 */}
      <path d="M 0 6 C -8 -6, -8 -22, 0 -28 C 8 -22, 8 -6, 0 6 Z" fill="url(#tulipPetalGradDark)" />
      {/* 左侧圆弧主瓣 */}
      <path
        d="M 0 8 C -14 0, -16 -16, -11 -25 C -7 -20, -2 -14, 0 8 Z"
        fill="url(#tulipPetalGrad)"
        stroke={tulipGoldRim}
        strokeWidth="0.4"
      />
      {/* 右侧圆弧主瓣 */}
      <path
        d="M 0 8 C 14 0, 16 -16, 11 -25 C 7 -20, 2 -14, 0 8 Z"
        fill="url(#tulipPetalGrad)"
        stroke={tulipGoldRim}
        strokeWidth="0.4"
      />
      {/* 居中正抱前瓣 (经典酒杯正面) */}
      <path
        d="M 0 9 C -11 4, -13 -12, -7 -26 C 0 -22, 0 -22, 7 -26 C 13 -12, 11 4, 0 9 Z"
        fill="url(#tulipPetalGrad)"
      />
      {/* 花杯光泽高光 */}
      <path d="M -3 4 C -6 -4, -6 -16, -3 -22" stroke="#fda4af" strokeWidth="0.9" fill="none" opacity="0.6" strokeLinecap="round" />
    </g>
  );

  return (
    <g id="tulipsFlora">
      <defs>
        <linearGradient id="tulipPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={tulipRed100} />
          <stop offset="60%" stopColor={tulipRed50} />
          <stop offset="100%" stopColor={tulipRed0} />
        </linearGradient>
        <linearGradient id="tulipPetalGradDark" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#881337" />
          <stop offset="100%" stopColor={tulipRed100} />
        </linearGradient>
        <linearGradient id="tulipStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stemCol0} />
          <stop offset="100%" stopColor={stemCol100} />
        </linearGradient>
        <linearGradient id="tulipLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={leafCol0} />
          <stop offset="100%" stopColor={leafCol100} />
        </linearGradient>
      </defs>

      {/* 郁金香笔挺多汁的翠绿单生花葶 */}
      <g id="tulipStems">
        <path d="M 74 125 C 74 110, 70 85, 52 56" stroke="url(#tulipStemGrad)" strokeWidth="3.6" fill="none" strokeLinecap="round" />
        <path d="M 76 125 C 76 108, 80 82, 98 52" stroke="url(#tulipStemGrad)" strokeWidth="3.6" fill="none" strokeLinecap="round" />
        <path d="M 75 125 C 75 95, 75 62, 75 30" stroke="url(#tulipStemGrad)" strokeWidth="3.8" fill="none" strokeLinecap="round" />
        <path d="M 73 125 C 73 115, 65 96, 36 68" stroke="url(#tulipStemGrad)" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <path d="M 77 125 C 77 115, 85 96, 114 65" stroke="url(#tulipStemGrad)" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      </g>

      {/* 郁金香宽大挺秀抱茎叶 */}
      <g id="tulipLeaves" style={{ opacity: leafOpacity, transition: 'opacity 0.8s ease-out' }}>
        <g className="animate-leaf-sway-1" style={{ transformOrigin: '74px 105px' }}>
          <path d="M 74 105 C 45 88, 22 92, 10 112 C 26 116, 52 110, 74 105 Z" fill="url(#tulipLeafGrad)" />
        </g>
        <g className="animate-leaf-sway-2" style={{ transformOrigin: '76px 108px' }}>
          <path d="M 76 108 C 105 90, 128 94, 140 114 C 124 118, 98 112, 76 108 Z" fill="url(#tulipLeafGrad)" />
        </g>
      </g>

      {/* 5 朵高挺圆润酒杯形郁金香 */}
      <g id="tulipBlooms">
        <g style={fl1}>{renderTulipBloom(114, 56, 0.95, 16)}</g>
        <g style={fl2}>{renderTulipBloom(36, 60, 0.96, -18)}</g>
        <g style={fl3}>{renderTulipBloom(98, 44, 1.05, 10)}</g>
        <g style={fl4}>{renderTulipBloom(52, 48, 1.02, -10)}</g>
        <g style={fl5}>{renderTulipBloom(75, 22, 1.18, 0)}</g>
      </g>
    </g>
  );
};
