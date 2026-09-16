/**
 * @file OrchidsFlower.tsx
 * @description 【幽谷空灵】素雅蝴蝶兰/国兰插花组件。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const ORCHID_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.5, fallSpan: 0.06, startX: 110, startY: 42, landX: 116, landY: 194, rx: 5.2, ry: 3.2, landRot: 32, swayAmp: 15, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.4, fallSpan: 0.06, startX: 42, startY: 52, landX: 40, landY: 193, rx: 5.4, ry: 3.0, landRot: -28, swayAmp: 12, swayFreq: 3.6 },
  { id: 3, detachHealth: 0.3, fallSpan: 0.06, startX: 98, startY: 56, landX: 102, landY: 195, rx: 5.6, ry: 3.4, landRot: -20, swayAmp: 16, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.2, fallSpan: 0.06, startX: 74, startY: 26, landX: 80, landY: 197, rx: 5.8, ry: 3.5, landRot: 38, swayAmp: 18, swayFreq: 4.0 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.05, startX: 58, startY: 44, landX: 64, landY: 196, rx: 6.0, ry: 3.6, landRot: 14, swayAmp: 14, swayFreq: 4.2 },
];

export const OrchidsFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  // 兰花紫粉至素雅白青衰变
  const orchidWing0 = lerpColor('#e9d5ff', '#d6c7b2', dryFactor);
  const orchidWing60 = lerpColor('#c084fc', '#9f8569', dryFactor);
  const orchidWing100 = lerpColor('#9333ea', '#5b4530', dryFactor);

  const orchidLip0 = lerpColor('#fef08a', '#d1bca0', dryFactor);
  const orchidLip60 = lerpColor('#eab308', '#8f683e', dryFactor);
  const orchidLip100 = lerpColor('#a855f7', '#4b2a1a', dryFactor);

  const stemCol0 = lerpColor('#86efac', '#98836a', dryFactor);
  const stemCol60 = lerpColor('#16a34a', '#523e27', dryFactor);
  const stemCol100 = lerpColor('#14532d', '#2c1e13', dryFactor);

  const leafCol0 = lerpColor('#4ade80', '#9c8466', dryFactor);
  const leafCol60 = lerpColor('#15803d', '#584128', dryFactor);
  const leafCol100 = lerpColor('#064e3b', '#241b12', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.5);
  const fl2 = getBlossomDropStyle(health, 0.4);
  const fl3 = getBlossomDropStyle(health, 0.3);
  const fl4 = getBlossomDropStyle(health, 0.2);
  const fl5 = getBlossomDropStyle(health, 0.08);

  const leafOpacity = isFaded ? 0.35 : Math.max(0.45, health);

  // 单朵蝴蝶兰翼瓣与唇瓣渲染
  const renderOrchidBloom = (cx: number, cy: number, scale: number = 1.0, rot: number = 0) => (
    <g transform={`translate(${cx}, ${cy}) rotate(${rot}) scale(${scale})`}>
      {/* 后方背萼片与侧萼片 */}
      <path d="M 0 0 C -3 -12 3 -12 0 -18 C -2 -14 -4 -10 0 0 Z" fill="url(#orchidWingGrad)" opacity="0.92" />
      <path d="M 0 0 C -12 4 -16 10 -18 14 C -12 12 -6 8 0 0 Z" fill="url(#orchidWingGrad)" opacity="0.9" />
      <path d="M 0 0 C 12 4 16 10 18 14 C 12 12 6 8 0 0 Z" fill="url(#orchidWingGrad)" opacity="0.9" />

      {/* 左右舒展蝴蝶大翼瓣 */}
      <path d="M 0 0 C -6 -10 -16 -8 -18 -1 C -19 6 -10 8 0 0 Z" fill="url(#orchidWingGrad)" />
      <path d="M 0 0 C 6 -10 16 -8 18 -1 C 19 6 10 8 0 0 Z" fill="url(#orchidWingGrad)" />

      {/* 兰花唇瓣与花蕊 */}
      <path d="M 0 1 C -4 4 -6 10 0 12 C 6 10 4 4 0 1 Z" fill="url(#orchidLipGrad)" />
      <circle cx="0" cy="3" r="1.6" fill={orchidLip60} />
      <circle cx="0" cy="5" r="1.1" fill={orchidLip100} />
    </g>
  );

  return (
    <g id="orchidsFlora">
      <defs>
        <linearGradient id="orchidWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={orchidWing0} />
          <stop offset="60%" stopColor={orchidWing60} />
          <stop offset="100%" stopColor={orchidWing100} />
        </linearGradient>
        <linearGradient id="orchidLipGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={orchidLip0} />
          <stop offset="60%" stopColor={orchidLip60} />
          <stop offset="100%" stopColor={orchidLip100} />
        </linearGradient>
        <linearGradient id="orchidStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stemCol0} />
          <stop offset="60%" stopColor={stemCol60} />
          <stop offset="100%" stopColor={stemCol100} />
        </linearGradient>
        <linearGradient id="orchidLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={leafCol0} />
          <stop offset="60%" stopColor={leafCol60} />
          <stop offset="100%" stopColor={leafCol100} />
        </linearGradient>
      </defs>

      {/* 典雅拱弧长花梗 */}
      <g id="orchidStems">
        {/* 主干左弧 */}
        <path d="M 74 125 C 73 105, 68 85, 54 62 C 46 50, 36 44, 30 38" stroke="url(#orchidStemGrad)" strokeWidth="3.0" fill="none" strokeLinecap="round" />
        {/* 主干右弧 */}
        <path d="M 76 125 C 77 105, 84 82, 98 58 C 108 42, 118 36, 124 28" stroke="url(#orchidStemGrad)" strokeWidth="2.8" fill="none" strokeLinecap="round" />
        {/* 中挺挺秀 */}
        <path d="M 75 125 C 75 100, 76 75, 75 42 C 75 32, 74 24, 74 16" stroke="url(#orchidStemGrad)" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      </g>

      {/* 蝴蝶兰特有标志性·基部横展肥厚肉质革质大叶 (平展于瓶口基部，倒卵状长圆形，深绿肥厚油润，花葶无叶光洁) */}
      <g id="orchidLeaves" style={{ opacity: leafOpacity, transition: 'opacity 0.8s ease-out' }}>
        {/* 左侧平展厚肉质舌形大叶 */}
        <g className="animate-leaf-sway-1" style={{ transformOrigin: '73px 123px' }}>
          <path
            d="M 74 121 C 60 116 42 115 22 118 C 12 119 10 124 16 127 C 28 130 52 129 73 125 Z"
            fill="url(#orchidLeafGrad)"
          />
          {/* 肉质凹槽主脉 */}
          <path d="M 74 122 C 58 119 40 118 18 121" stroke="#86efac" strokeWidth="1.1" fill="none" opacity="0.7" />
          {/* 叶缘微光 */}
          <path d="M 73 121 C 58 116 40 115 22 117" stroke="#34d399" strokeWidth="0.6" fill="none" opacity="0.4" />
        </g>

        {/* 右侧横斜油亮厚肉质大叶 */}
        <g className="animate-leaf-sway-2" style={{ transformOrigin: '77px 123px' }}>
          <path
            d="M 76 121 C 90 116 108 115 128 118 C 138 119 140 124 134 127 C 122 130 98 129 77 125 Z"
            fill="url(#orchidLeafGrad)"
          />
          <path d="M 76 122 C 92 119 110 118 132 121" stroke="#86efac" strokeWidth="1.1" fill="none" opacity="0.7" />
          <path d="M 77 121 C 92 116 110 115 128 117" stroke="#34d399" strokeWidth="0.6" fill="none" opacity="0.4" />
        </g>

        {/* 基部中前叠生小厚叶 */}
        <path
          d="M 72 124 C 64 120 54 121 46 125 C 56 127 66 127 75 125 Z"
          fill="url(#orchidLeafGrad)"
          opacity="0.9"
        />
      </g>

      {/* 5 朵出尘蝴蝶兰花朵 */}
      <g id="orchidBlooms">
        <g style={fl1}>{renderOrchidBloom(122, 30, 0.88, 18)}</g>
        <g style={fl2}>{renderOrchidBloom(34, 40, 0.92, -22)}</g>
        <g style={fl3}>{renderOrchidBloom(96, 56, 1.05, 12)}</g>
        <g style={fl4}>{renderOrchidBloom(52, 60, 1.0, -15)}</g>
        <g style={fl5}>{renderOrchidBloom(74, 20, 1.15, 0)}</g>
      </g>
    </g>
  );
};
