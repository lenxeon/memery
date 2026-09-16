/**
 * @file LilyOfValleyFlower.tsx
 * @description 【如意铃兰】倒挂一串串洁白小圆钟铃与拱曲花葶插花组件。
 * 核心特征：弯弯的花葶上如风铃般倒挂一串颗颗晶莹剔透的洁白小圆钟铃花冠，两侧依托宽大椭圆碧绿叶片。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const VALLEY_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.5, fallSpan: 0.05, startX: 110, startY: 46, landX: 116, landY: 194, rx: 4.0, ry: 3.8, landRot: 25, swayAmp: 14, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.4, fallSpan: 0.05, startX: 42, startY: 54, landX: 40, landY: 193, rx: 4.2, ry: 4.0, landRot: -28, swayAmp: 12, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.3, fallSpan: 0.05, startX: 96, startY: 58, landX: 102, landY: 195, rx: 4.4, ry: 4.2, landRot: -20, swayAmp: 16, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.2, fallSpan: 0.05, startX: 75, startY: 28, landX: 82, landY: 197, rx: 4.6, ry: 4.4, landRot: 35, swayAmp: 18, swayFreq: 4.0 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.04, startX: 58, startY: 48, landX: 66, landY: 196, rx: 4.8, ry: 4.6, landRot: 14, swayAmp: 14, swayFreq: 4.2 },
];

export const LilyOfValleyFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  // 铃兰洁白至枯萎浅茶色衰变
  const bellWhite0 = lerpColor('#ffffff', '#ded2c3', dryFactor);
  const bellWhite50 = lerpColor('#f1f5f9', '#bfae9c', dryFactor);
  const bellShadow = lerpColor('#cbd5e1', '#8c7b64', dryFactor);

  const stemCol0 = lerpColor('#86efac', '#8c7b64', dryFactor);
  const stemCol100 = lerpColor('#15803d', '#332414', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.5);
  const fl2 = getBlossomDropStyle(health, 0.35);
  const fl3 = getBlossomDropStyle(health, 0.08);

  const leafOpacity = isFaded ? 0.35 : Math.max(0.45, health);

  // 单颗倒挂洁白小铃铛花
  const renderLittleBell = (cx: number, cy: number, r: number = 4.8, rot: number = 0) => (
    <g transform={`translate(${cx}, ${cy}) rotate(${rot})`}>
      {/* 极细微拱弯小花梗 */}
      <path d="M 0 -7 Q 3 -3 0 0" stroke={stemCol100} strokeWidth="1.0" fill="none" />
      {/* 圆滚滚倒挂小钟花冠 */}
      <path
        d={`M -${r * 0.7} 0 C -${r * 1.1} ${r * 0.5}, -${r * 1.2} ${r * 1.2}, -${r * 0.9} ${r * 1.5} C -${r * 0.5} ${r * 1.7}, ${r * 0.5} ${r * 1.7}, ${r * 0.9} ${r * 1.5} C ${r * 1.2} ${r * 1.2}, ${r * 1.1} ${r * 0.5}, ${r * 0.7} 0 Z`}
        fill="url(#valleyBellGrad)"
        stroke={bellShadow}
        strokeWidth="0.4"
      />
      {/* 钟口 6 裂反卷小齿 */}
      <path
        d={`M -${r * 0.9} ${r * 1.5} Q -${r * 0.6} ${r * 1.8} -${r * 0.3} ${r * 1.5} Q 0 ${r * 1.8} ${r * 0.3} ${r * 1.5} Q ${r * 0.6} ${r * 1.8} ${r * 0.9} ${r * 1.5}`}
        stroke={bellWhite0}
        strokeWidth="0.8"
        fill="none"
      />
      {/* 钟身晶莹高光 */}
      <circle cx={-r * 0.3} cy={r * 0.6} r={r * 0.25} fill="#ffffff" opacity="0.8" />
    </g>
  );

  return (
    <g id="lilyOfValleyFlora">
      <defs>
        <radialGradient id="valleyBellGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor={bellWhite0} />
          <stop offset="60%" stopColor={bellWhite50} />
          <stop offset="100%" stopColor={bellShadow} />
        </radialGradient>
        <linearGradient id="valleyStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stemCol0} />
          <stop offset="100%" stopColor={stemCol100} />
        </linearGradient>
      </defs>

      {/* 幽谷铃兰特有标志性·基生双生宽大阔椭圆形碧玉叶 (两片大阔叶相拥托起中央纤细拱垂铃铛花序) */}
      <g id="valleyLeaves" style={{ opacity: leafOpacity }}>
        {/* 左侧宽大阔椭圆叶 */}
        <g className="animate-leaf-sway-1" style={{ transformOrigin: '73px 125px' }}>
          <path
            d="M 74 125 C 68 108 52 86 34 70 C 22 72 14 82 12 94 C 10 108 24 118 48 122 C 60 124 70 125 74 125 Z"
            fill={stemCol100}
          />
          {/* 纵向平行优雅弧形叶脉 */}
          <path d="M 73 124 C 58 106 42 88 32 72" stroke="#86efac" strokeWidth="1.2" fill="none" opacity="0.8" />
          <path d="M 71 124 C 48 112 30 100 20 84" stroke="#86efac" strokeWidth="0.8" fill="none" opacity="0.6" />
          <path d="M 66 125 C 40 120 22 112 14 96" stroke="#86efac" strokeWidth="0.7" fill="none" opacity="0.5" />
        </g>

        {/* 右侧宽大舒展托叶 */}
        <g className="animate-leaf-sway-2" style={{ transformOrigin: '77px 125px' }}>
          <path
            d="M 76 125 C 82 108 98 86 116 70 C 128 72 136 82 138 94 C 140 108 126 118 102 122 C 90 124 80 125 76 125 Z"
            fill={stemCol100}
          />
          <path d="M 77 124 C 92 106 108 88 118 72" stroke="#86efac" strokeWidth="1.2" fill="none" opacity="0.8" />
          <path d="M 79 124 C 102 112 120 100 130 84" stroke="#86efac" strokeWidth="0.8" fill="none" opacity="0.6" />
          <path d="M 84 125 C 110 120 128 112 136 96" stroke="#86efac" strokeWidth="0.7" fill="none" opacity="0.5" />
        </g>
      </g>

      {/* 3 支优雅拱曲花葶 */}
      <g id="valleyStems">
        {/* 左支花葶 */}
        <path d="M 74 125 C 73 105, 68 85, 52 65 C 44 54, 38 48, 30 46" stroke="url(#valleyStemGrad)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        {/* 右支花葶 */}
        <path d="M 76 125 C 77 105, 84 82, 102 60 C 110 50, 116 44, 124 42" stroke="url(#valleyStemGrad)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        {/* 中支挺秀拱垂 */}
        <path d="M 75 125 C 75 95, 75 70, 75 42 C 75 32, 70 24, 62 20" stroke="url(#valleyStemGrad)" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      </g>

      {/* 串串倒挂小圆铃铛花 */}
      <g id="valleyBells">
        {/* 左串花铃 */}
        <g style={fl1}>
          {renderLittleBell(32, 50, 4.5, -15)}
          {renderLittleBell(40, 56, 4.8, -20)}
          {renderLittleBell(48, 65, 5.0, -25)}
          {renderLittleBell(56, 76, 5.2, -30)}
        </g>
        {/* 右串花铃 */}
        <g style={fl2}>
          {renderLittleBell(122, 46, 4.5, 15)}
          {renderLittleBell(114, 52, 4.8, 20)}
          {renderLittleBell(104, 62, 5.0, 25)}
          {renderLittleBell(94, 74, 5.2, 30)}
        </g>
        {/* 中串花铃 */}
        <g style={fl3}>
          {renderLittleBell(62, 25, 4.6, -10)}
          {renderLittleBell(68, 32, 5.0, -8)}
          {renderLittleBell(74, 42, 5.4, 0)}
          {renderLittleBell(76, 54, 5.6, 5)}
        </g>
      </g>
    </g>
  );
};
