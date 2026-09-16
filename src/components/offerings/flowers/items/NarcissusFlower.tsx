/**
 * @file NarcissusFlower.tsx
 * @description 【凌波水仙】“金盏银台”六瓣雪白星花与中央金黄茶盏副花冠插花组件。
 * 核心特征：标志性的六枚平铺雪白外花被裂片（银台）+ 正中心端坐的褶边金黄小酒盏（金盏副花冠）+ 笔直葱郁剑叶。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const NARCISSUS_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.5, fallSpan: 0.05, startX: 110, startY: 42, landX: 116, landY: 194, rx: 5.2, ry: 3.2, landRot: 28, swayAmp: 14, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.4, fallSpan: 0.05, startX: 42, startY: 50, landX: 40, landY: 193, rx: 5.4, ry: 3.4, landRot: -30, swayAmp: 12, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.3, fallSpan: 0.05, startX: 96, startY: 56, landX: 102, landY: 195, rx: 5.6, ry: 3.5, landRot: -20, swayAmp: 16, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.2, fallSpan: 0.05, startX: 75, startY: 26, landX: 82, landY: 197, rx: 5.8, ry: 3.6, landRot: 36, swayAmp: 18, swayFreq: 4.0 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.04, startX: 58, startY: 44, landX: 66, landY: 196, rx: 6.0, ry: 3.8, landRot: 14, swayAmp: 14, swayFreq: 4.2 },
];

export const NarcissusFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  // 水仙纯白至枯萎浅茶色衰变
  const petalWhite0 = lerpColor('#ffffff', '#ded2c3', dryFactor);
  const petalWhite50 = lerpColor('#f8fafc', '#bfae9c', dryFactor);
  const petalWhite100 = lerpColor('#e2e8f0', '#8c7b64', dryFactor);

  // 金盏副花冠纯金黄至暗黄褐衰变
  const goldCup0 = lerpColor('#fef08a', '#caa97b', dryFactor);
  const goldCup50 = lerpColor('#facc15', '#9a7846', dryFactor);
  const goldCup100 = lerpColor('#ca8a04', '#6b512c', dryFactor);

  const stemCol0 = lerpColor('#86efac', '#8c7b64', dryFactor);
  const stemCol100 = lerpColor('#15803d', '#332414', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.5);
  const fl2 = getBlossomDropStyle(health, 0.4);
  const fl3 = getBlossomDropStyle(health, 0.3);
  const fl4 = getBlossomDropStyle(health, 0.2);
  const fl5 = getBlossomDropStyle(health, 0.08);

  const leafOpacity = isFaded ? 0.35 : Math.max(0.45, health);

  // 绘制单朵经典“金盏银台”水仙花
  const renderNarcissusBloom = (cx: number, cy: number, r: number = 13.5, rot: number = 0) => (
    <g transform={`translate(${cx}, ${cy}) rotate(${rot})`}>
      {/* 银台：六枚平铺雪白椭圆星被裂片 (60度均匀对称) */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <g key={i} transform={`rotate(${deg})`}>
          <path
            d={`M 0 0 C -${r * 0.45} -${r * 0.4}, -${r * 0.5} -${r * 0.95}, 0 -${r * 1.35} C ${r * 0.5} -${r * 0.95}, ${r * 0.45} -${r * 0.4}, 0 0 Z`}
            fill="url(#narcissusWhiteGrad)"
            stroke={petalWhite100}
            strokeWidth="0.4"
          />
          {/* 花瓣纵向浅白微棱 */}
          <line x1="0" y1="0" x2="0" y2={-r * 1.25} stroke="#ffffff" strokeWidth="0.8" opacity="0.8" />
        </g>
      ))}

      {/* 金盏：正中心端坐的褶边金黄圆酒盏副花冠 */}
      <circle cx="0" cy="0" r={r * 0.48} fill="url(#narcissusGoldGrad)" stroke={goldCup100} strokeWidth="0.8" />
      {/* 盏缘微波浪折边 */}
      <circle cx="0" cy="0" r={r * 0.44} fill="none" stroke="#fef08a" strokeWidth="0.6" strokeDasharray="2, 1" />

      {/* 盏内细密花蕊 */}
      <circle cx="-1.5" cy="-1.5" r="1.1" fill={goldCup100} />
      <circle cx="1.5" cy="-1.5" r="1.1" fill={goldCup100} />
      <circle cx="0" cy="1.8" r="1.1" fill={goldCup100} />
    </g>
  );

  return (
    <g id="narcissusFlora">
      <defs>
        <radialGradient id="narcissusWhiteGrad" cx="50%" cy="80%" r="90%">
          <stop offset="0%" stopColor={petalWhite100} />
          <stop offset="40%" stopColor={petalWhite50} />
          <stop offset="100%" stopColor={petalWhite0} />
        </radialGradient>
        <radialGradient id="narcissusGoldGrad" cx="45%" cy="45%" r="65%">
          <stop offset="0%" stopColor={goldCup0} />
          <stop offset="65%" stopColor={goldCup50} />
          <stop offset="100%" stopColor={goldCup100} />
        </radialGradient>
        <linearGradient id="narcissusStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stemCol0} />
          <stop offset="100%" stopColor={stemCol100} />
        </linearGradient>
        <linearGradient id="narcissusStrapLeafGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#064e3b" />
          <stop offset="50%" stopColor="#059669" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>

      {/* 凌波水仙标志性·丛生扁平带状条形肉质叶（条形扁平如碧带，端部钝圆，簇生挺秀） */}
      <g id="narcissusLeaves" style={{ opacity: leafOpacity }}>
        {/* 左外侧长带叶 (微向左拱) */}
        <g className="animate-leaf-sway-1" style={{ transformOrigin: '73px 125px' }}>
          <path
            d="M 73 125 C 70 100 58 75 42 42 C 40 38 43 35 46 36 C 53 42 66 72 75 125 Z"
            fill="url(#narcissusStrapLeafGrad)"
          />
          <path d="M 74 125 C 68 100 57 74 44 38" stroke="#a7f3d0" strokeWidth="0.8" fill="none" opacity="0.6" />
        </g>

        {/* 右外侧长带叶 (微向右拱) */}
        <g className="animate-leaf-sway-2" style={{ transformOrigin: '77px 125px' }}>
          <path
            d="M 77 125 C 80 100 92 75 108 42 C 110 38 107 35 104 36 C 97 42 84 72 75 125 Z"
            fill="url(#narcissusStrapLeafGrad)"
          />
          <path d="M 76 125 C 82 100 93 74 106 38" stroke="#a7f3d0" strokeWidth="0.8" fill="none" opacity="0.6" />
        </g>

        {/* 居中两片挺直条带叶 */}
        <path
          d="M 74 125 C 73 98 71 70 68 28 C 68 24 72 24 73 28 C 76 68 76 98 75 125 Z"
          fill="url(#narcissusStrapLeafGrad)"
        />
        <path
          d="M 75 125 C 76 98 78 70 82 28 C 82 24 78 24 77 28 C 74 68 74 98 75 125 Z"
          fill="url(#narcissusStrapLeafGrad)"
        />

        {/* 细实花葶 (花朵着生其上) */}
        <path d="M 74 125 C 72 105 60 85 40 56" stroke="url(#narcissusStemGrad)" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <path d="M 76 125 C 78 105 90 85 108 52" stroke="url(#narcissusStemGrad)" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <path d="M 75 125 C 75 90 75 58 75 34" stroke="url(#narcissusStemGrad)" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      </g>

      {/* 5 朵清香扑鼻金盏银台水仙花 */}
      <g id="narcissusBlooms">
        <g style={fl1}>{renderNarcissusBloom(110, 48, 13.0, 18)}</g>
        <g style={fl2}>{renderNarcissusBloom(40, 52, 13.5, -22)}</g>
        <g style={fl3}>{renderNarcissusBloom(98, 62, 14.0, 30)}</g>
        <g style={fl4}>{renderNarcissusBloom(52, 65, 13.0, -12)}</g>
        <g style={fl5}>{renderNarcissusBloom(75, 30, 16.0, 0)}</g>
      </g>
    </g>
  );
};
