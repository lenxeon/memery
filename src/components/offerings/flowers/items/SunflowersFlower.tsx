/**
 * @file SunflowersFlower.tsx
 * @description 【金色向日葵】焦糖深褐蜂窝大花盘与金黄放射大花瓣插花组件。
 * 核心特征：标志性的大圆深色管状花盘、金黄外圈辐射舌状花瓣，粗壮挺直茎干与阔大绿叶。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const SUNFLOWER_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.5, fallSpan: 0.06, startX: 108, startY: 48, landX: 114, landY: 194, rx: 7.2, ry: 3.8, landRot: 28, swayAmp: 15, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.4, fallSpan: 0.06, startX: 44, startY: 56, landX: 42, landY: 193, rx: 7.5, ry: 4.0, landRot: -32, swayAmp: 14, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.3, fallSpan: 0.06, startX: 96, startY: 62, landX: 102, landY: 195, rx: 7.8, ry: 4.2, landRot: -22, swayAmp: 16, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.2, fallSpan: 0.06, startX: 74, startY: 30, landX: 82, landY: 197, rx: 8.0, ry: 4.4, landRot: 38, swayAmp: 18, swayFreq: 4.0 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.05, startX: 58, startY: 48, landX: 66, landY: 196, rx: 8.2, ry: 4.5, landRot: 15, swayAmp: 14, swayFreq: 4.2 },
];

export const SunflowersFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  // 向日葵金黄至焦黄衰变
  const goldPetal0 = lerpColor('#fde047', '#cca064', dryFactor);
  const goldPetal50 = lerpColor('#eab308', '#9d6d39', dryFactor);
  const goldPetal100 = lerpColor('#ca8a04', '#6b4724', dryFactor);

  // 焦糖深褐花心大圆盘
  const diskCenter0 = lerpColor('#713f12', '#4a2f16', dryFactor);
  const diskCenter50 = lerpColor('#451a03', '#2e1c0c', dryFactor);
  const diskRingGold = lerpColor('#a16207', '#5f401f', dryFactor);

  const stemCol0 = lerpColor('#4ade80', '#836f56', dryFactor);
  const stemCol100 = lerpColor('#15803d', '#382c1e', dryFactor);

  const leafCol0 = lerpColor('#22c55e', '#887355', dryFactor);
  const leafCol100 = lerpColor('#14532d', '#2c2114', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.45);
  const fl2 = getBlossomDropStyle(health, 0.35);
  const fl3 = getBlossomDropStyle(health, 0.08);

  const leafOpacity = isFaded ? 0.35 : Math.max(0.45, health);

  // 渲染单朵向日葵大花盘与辐射瓣
  const renderSunflower = (cx: number, cy: number, outerR: number = 24, diskR: number = 10.5, rot: number = 0) => {
    // 20 枚环形放射金黄舌状花瓣
    const petalCount = 20;
    const step = 360 / petalCount;
    return (
      <g transform={`translate(${cx}, ${cy}) rotate(${rot})`}>
        {/* 外圈金黄辐射瓣 */}
        {Array.from({ length: petalCount }).map((_, i) => (
          <g key={i} transform={`rotate(${i * step})`}>
            <path
              d={`M -${outerR * 0.16} -${diskR * 0.9} C -${outerR * 0.22} -${outerR * 0.6}, -${outerR * 0.14} -${outerR * 0.95}, 0 -${outerR} C ${outerR * 0.14} -${outerR * 0.95}, ${outerR * 0.22} -${outerR * 0.6}, ${outerR * 0.16} -${diskR * 0.9} Z`}
              fill="url(#sunflowerGoldGrad)"
            />
            {/* 花瓣中央金色脉纹 */}
            <line x1="0" y1={-diskR * 0.9} x2="0" y2={-outerR * 0.9} stroke="#fef08a" strokeWidth="0.6" opacity="0.6" />
          </g>
        ))}

        {/* 焦糖深褐大圆花盘 */}
        <circle cx="0" cy="0" r={diskR} fill="url(#sunflowerDiskGrad)" stroke={diskRingGold} strokeWidth="1.2" />

        {/* 花盘内部密布的花蕊同心微圆点（蜂窝花盘质感） */}
        <circle cx="0" cy="0" r={diskR * 0.72} fill="none" stroke={diskRingGold} strokeWidth="0.8" strokeDasharray="2, 2" opacity="0.6" />
        <circle cx="0" cy="0" r={diskR * 0.44} fill="none" stroke={diskRingGold} strokeWidth="0.8" strokeDasharray="1.5, 1.5" opacity="0.7" />
        <circle cx="0" cy="0" r={diskR * 0.2} fill="#261102" />
      </g>
    );
  };

  return (
    <g id="sunflowersFlora">
      <defs>
        <radialGradient id="sunflowerGoldGrad" cx="50%" cy="80%" r="90%">
          <stop offset="0%" stopColor={goldPetal100} />
          <stop offset="50%" stopColor={goldPetal50} />
          <stop offset="100%" stopColor={goldPetal0} />
        </radialGradient>
        <radialGradient id="sunflowerDiskGrad" cx="45%" cy="45%" r="60%">
          <stop offset="0%" stopColor={diskCenter0} />
          <stop offset="70%" stopColor={diskCenter50} />
          <stop offset="100%" stopColor="#220e03" />
        </radialGradient>
        <linearGradient id="sunflowerStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stemCol0} />
          <stop offset="100%" stopColor={stemCol100} />
        </linearGradient>
        <linearGradient id="sunflowerLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={leafCol0} />
          <stop offset="100%" stopColor={leafCol100} />
        </linearGradient>
      </defs>

      {/* 粗壮挺立的绿色主花茎 */}
      <g id="sunflowerStems">
        <path d="M 75 125 C 75 105, 75 80, 75 48" stroke="url(#sunflowerStemGrad)" strokeWidth="4.6" fill="none" strokeLinecap="round" />
        <path d="M 74 125 C 73 110, 68 95, 54 75" stroke="url(#sunflowerStemGrad)" strokeWidth="3.8" fill="none" strokeLinecap="round" />
        <path d="M 76 125 C 77 108, 84 92, 98 72" stroke="url(#sunflowerStemGrad)" strokeWidth="3.8" fill="none" strokeLinecap="round" />
      </g>

      {/* 阔大心形向日葵锯齿大绿叶与羽状叶脉 (盛夏向日葵标志性叶形) */}
      <g id="sunflowerLeaves" style={{ opacity: leafOpacity, transition: 'opacity 0.8s ease-out' }}>
        {/* 左侧宽阔大葵叶 */}
        <g className="animate-leaf-sway-1" style={{ transformOrigin: '65px 96px' }}>
          {/* 叶柄 */}
          <path d="M 72 100 Q 64 98 58 97" stroke="url(#sunflowerStemGrad)" strokeWidth="3.4" fill="none" strokeLinecap="round" />
          {/* 阔卵心形带锯齿波折叶身 */}
          <path
            d="M 58 97 C 48 88 38 82 24 84 C 18 86 13 90 8 96 C 4 104 7 112 14 116 C 22 120 34 122 46 116 C 54 110 58 104 58 97 Z"
            fill="url(#sunflowerLeafGrad)"
          />
          {/* 粗壮白色/黄绿主叶脉与向外分叉侧脉 */}
          <path d="M 58 97 Q 36 100 12 104" stroke="#86efac" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.8" />
          <path d="M 46 98 Q 38 90 28 88" stroke="#86efac" strokeWidth="0.9" fill="none" opacity="0.6" />
          <path d="M 38 99 Q 30 110 20 114" stroke="#86efac" strokeWidth="0.9" fill="none" opacity="0.6" />
          <path d="M 28 101 Q 20 96 14 94" stroke="#86efac" strokeWidth="0.8" fill="none" opacity="0.6" />
        </g>

        {/* 右侧垂展心形大葵叶 */}
        <g className="animate-leaf-sway-2" style={{ transformOrigin: '84px 98px' }}>
          <path d="M 77 102 Q 86 100 92 98" stroke="url(#sunflowerStemGrad)" strokeWidth="3.4" fill="none" strokeLinecap="round" />
          <path
            d="M 92 98 C 102 88 114 84 128 86 C 134 88 139 92 143 98 C 146 106 142 114 135 118 C 125 122 112 120 102 115 C 96 110 92 104 92 98 Z"
            fill="url(#sunflowerLeafGrad)"
          />
          <path d="M 92 98 Q 114 101 138 106" stroke="#86efac" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.8" />
          <path d="M 104 99 Q 112 91 122 89" stroke="#86efac" strokeWidth="0.9" fill="none" opacity="0.6" />
          <path d="M 112 100 Q 120 112 130 115" stroke="#86efac" strokeWidth="0.9" fill="none" opacity="0.6" />
          <path d="M 124 102 Q 132 97 138 95" stroke="#86efac" strokeWidth="0.8" fill="none" opacity="0.6" />
        </g>

        {/* 瓶口上方正中低垂幼叶 */}
        <path d="M 75 106 C 70 112 66 118 68 122 C 75 124 82 124 84 118 C 82 114 78 110 75 106 Z" fill="url(#sunflowerLeafGrad)" opacity="0.85" />
      </g>

      {/* 3 朵醒目硕大的向日葵花头 */}
      <g id="sunflowerBlooms">
        {/* 左侧副花 */}
        <g style={fl1}>{renderSunflower(48, 70, 21, 9.2, -18)}</g>
        {/* 右侧副花 */}
        <g style={fl2}>{renderSunflower(102, 66, 22, 9.6, 16)}</g>
        {/* 居中正主大向日葵 */}
        <g style={fl3}>{renderSunflower(75, 38, 27, 12.0, 0)}</g>
      </g>
    </g>
  );
};
