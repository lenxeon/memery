/**
 * @file CarnationsFlower.tsx
 * @description 【慈孝康乃馨】锯齿折边皱褶花冠与圆筒花萼插花组件。
 * 核心特征：标志性的波浪锯齿裂边（Serrated crinkled edges）叠瓣、修长带节细茎、杯状厚质花萼。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const CARNATION_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.5, fallSpan: 0.06, startX: 112, startY: 46, landX: 118, landY: 194, rx: 5.8, ry: 3.4, landRot: 28, swayAmp: 14, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.4, fallSpan: 0.06, startX: 38, startY: 54, landX: 40, landY: 193, rx: 6.0, ry: 3.5, landRot: -32, swayAmp: 12, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.3, fallSpan: 0.06, startX: 96, startY: 60, landX: 102, landY: 195, rx: 6.2, ry: 3.6, landRot: -20, swayAmp: 16, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.2, fallSpan: 0.06, startX: 76, startY: 28, landX: 82, landY: 197, rx: 6.4, ry: 3.8, landRot: 36, swayAmp: 18, swayFreq: 4.0 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.05, startX: 56, startY: 48, landX: 64, landY: 196, rx: 6.5, ry: 4.0, landRot: 14, swayAmp: 14, swayFreq: 4.2 },
];

export const CarnationsFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  // 康乃馨柔粉至枯萎暖茶色衰变
  const carnation0 = lerpColor('#fbcfe8', '#dac3ae', dryFactor);
  const carnation50 = lerpColor('#f43f5e', '#a3624e', dryFactor);
  const carnation100 = lerpColor('#be123c', '#5e3223', dryFactor);

  const calyx0 = lerpColor('#86efac', '#8c7b64', dryFactor);
  const calyx100 = lerpColor('#16a34a', '#3f3324', dryFactor);

  const stemCol0 = lerpColor('#4ade80', '#836f56', dryFactor);
  const stemCol100 = lerpColor('#15803d', '#332414', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.5);
  const fl2 = getBlossomDropStyle(health, 0.4);
  const fl3 = getBlossomDropStyle(health, 0.3);
  const fl4 = getBlossomDropStyle(health, 0.2);
  const fl5 = getBlossomDropStyle(health, 0.08);

  const leafOpacity = isFaded ? 0.35 : Math.max(0.45, health);

  // 绘制单朵康乃馨：下部是杯状绿色花萼，上部是层叠锯齿折边（serrated crinkled）花瓣
  const renderCarnationBloom = (cx: number, cy: number, scale: number = 1.0, rot: number = 0) => (
    <g transform={`translate(${cx}, ${cy}) rotate(${rot}) scale(${scale})`}>
      {/* 绿色圆筒状花萼托 (Calyx cup) */}
      <path d="M -4 8 L -5 18 C -2 20, 2 20, 5 18 L 4 8 Z" fill="url(#carnationCalyxGrad)" stroke="#15803d" strokeWidth="0.6" />
      <polygon points="-5,8 -3,4 -2,8 0,4 2,8 3,4 5,8" fill={calyx100} />

      {/* 外层锯齿波浪大花瓣 */}
      <path
        d="M -16 6 Q -18 0 -14 -6 L -16 -8 L -12 -10 L -13 -14 L -8 -13 L -6 -18 L -2 -14 L 0 -19 L 2 -14 L 6 -18 L 8 -13 L 13 -14 L 12 -10 L 16 -8 L 14 -6 Q 18 0 16 6 C 10 10, -10 10, -16 6 Z"
        fill="url(#carnationPetalGrad)"
      />

      {/* 中层紧致锯齿花冠 */}
      <path
        d="M -11 4 L -13 -2 L -9 -4 L -10 -9 L -5 -8 L -4 -12 L 0 -9 L 4 -12 L 5 -8 L 10 -9 L 9 -4 L 13 -2 L 11 4 C 6 7, -6 7, -11 4 Z"
        fill={carnation50}
        opacity="0.9"
      />

      {/* 内层卷曲花心瓣 */}
      <path
        d="M -6 2 L -7 -3 L -4 -4 L -3 -7 L 0 -5 L 3 -7 L 4 -4 L 7 -3 L 6 2 Z"
        fill={carnation100}
      />
      {/* 边缘细微雪白霜线 */}
      <path
        d="M -14 -6 L -16 -8 L -12 -10 L -13 -14 L -8 -13 L -6 -18 L -2 -14 L 0 -19 L 2 -14 L 6 -18 L 8 -13 L 13 -14 L 12 -10 L 16 -8 L 14 -6"
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.6"
        opacity="0.5"
      />
    </g>
  );

  return (
    <g id="carnationsFlora">
      <defs>
        <radialGradient id="carnationPetalGrad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor={carnation0} />
          <stop offset="55%" stopColor={carnation50} />
          <stop offset="100%" stopColor={carnation100} />
        </radialGradient>
        <linearGradient id="carnationCalyxGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={calyx0} />
          <stop offset="100%" stopColor={calyx100} />
        </linearGradient>
        <linearGradient id="carnationLinearLeafGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a7f3d0" />
          <stop offset="60%" stopColor="#059669" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>
      </defs>

      {/* 纤细挺直、带竹节状茎节的花茎 */}
      <g id="carnationStems">
        <path d="M 74 125 C 74 110, 72 90, 54 62" stroke="url(#carnationStemGrad)" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <path d="M 76 125 C 76 108, 80 88, 98 58" stroke="url(#carnationStemGrad)" strokeWidth="3.0" fill="none" strokeLinecap="round" />
        <path d="M 75 125 C 75 98, 75 68, 75 38" stroke="url(#carnationStemGrad)" strokeWidth="2.8" fill="none" strokeLinecap="round" />
        <path d="M 73 125 C 73 115, 66 100, 38 72" stroke="url(#carnationStemGrad)" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <path d="M 77 125 C 77 115, 85 98, 114 68" stroke="url(#carnationStemGrad)" strokeWidth="2.6" fill="none" strokeLinecap="round" />

        {/* 茎节处膨大环节 (Nodes) */}
        <ellipse cx="74" cy="98" rx="2.4" ry="1.4" fill={calyx100} />
        <ellipse cx="68" cy="80" rx="2.2" ry="1.3" fill={calyx100} />
        <ellipse cx="82" cy="78" rx="2.2" ry="1.3" fill={calyx100} />
      </g>

      {/* 康乃馨标志性粉霜蓝绿·对生狭长剑状线形叶 (两层对生，绝非阔卵叶) */}
      <g id="carnationLeaves" style={{ opacity: leafOpacity, transition: 'opacity 0.8s ease-out' }}>
        {/* 下节对生狭长线叶 (平展微上翘) */}
        <g className="animate-leaf-sway-1" style={{ transformOrigin: '74px 98px' }}>
          <path d="M 74 98 C 58 92 42 84 20 86 C 38 92 56 97 74 100 Z" fill="url(#carnationLinearLeafGrad)" />
          <path d="M 74 99 Q 46 91 22 87" stroke="#ecfdf5" strokeWidth="0.7" fill="none" opacity="0.75" />
        </g>
        <g className="animate-leaf-sway-2" style={{ transformOrigin: '76px 98px' }}>
          <path d="M 76 98 C 92 92 108 84 130 86 C 112 92 94 97 76 100 Z" fill="url(#carnationLinearLeafGrad)" />
          <path d="M 76 99 Q 104 91 128 87" stroke="#ecfdf5" strokeWidth="0.7" fill="none" opacity="0.75" />
        </g>

        {/* 上节对生轻盈线叶 */}
        <g className="animate-leaf-sway-1" style={{ transformOrigin: '68px 80px' }}>
          <path d="M 68 80 C 54 75 42 70 30 72 C 42 76 54 80 68 82 Z" fill="url(#carnationLinearLeafGrad)" />
          <path d="M 68 81 Q 48 74 32 73" stroke="#ecfdf5" strokeWidth="0.6" fill="none" opacity="0.7" />
        </g>
        <g className="animate-leaf-sway-2" style={{ transformOrigin: '82px 78px' }}>
          <path d="M 82 78 C 96 73 108 68 120 70 C 108 74 96 78 82 80 Z" fill="url(#carnationLinearLeafGrad)" />
          <path d="M 82 79 Q 102 72 118 71" stroke="#ecfdf5" strokeWidth="0.6" fill="none" opacity="0.7" />
        </g>
      </g>

      {/* 5 朵层叠锯齿康乃馨花冠 */}
      <g id="carnationBlooms">
        <g style={fl1}>{renderCarnationBloom(114, 52, 0.9, 18)}</g>
        <g style={fl2}>{renderCarnationBloom(38, 56, 0.92, -20)}</g>
        <g style={fl3}>{renderCarnationBloom(96, 44, 1.05, 12)}</g>
        <g style={fl4}>{renderCarnationBloom(54, 48, 1.0, -12)}</g>
        <g style={fl5}>{renderCarnationBloom(75, 24, 1.18, 0)}</g>
      </g>
    </g>
  );
};
