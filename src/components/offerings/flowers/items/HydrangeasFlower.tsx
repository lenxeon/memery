/**
 * @file HydrangeasFlower.tsx
 * @description 【团圆绣球】圆滚滚饱满绣球花球与对生四瓣小花簇插花组件。
 * 核心特征：标志性的大型球状密伞房花序、数十朵精致的十字四瓣冰蓝粉紫小花聚合成团，饱满丰腴。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const HYDRANGEA_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.5, fallSpan: 0.05, startX: 110, startY: 48, landX: 116, landY: 194, rx: 4.5, ry: 3.8, landRot: 28, swayAmp: 14, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.4, fallSpan: 0.05, startX: 42, startY: 54, landX: 40, landY: 193, rx: 4.8, ry: 4.0, landRot: -30, swayAmp: 12, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.3, fallSpan: 0.05, startX: 96, startY: 60, landX: 102, landY: 195, rx: 5.0, ry: 4.2, landRot: -20, swayAmp: 16, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.2, fallSpan: 0.05, startX: 75, startY: 30, landX: 82, landY: 197, rx: 5.2, ry: 4.4, landRot: 36, swayAmp: 18, swayFreq: 4.0 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.04, startX: 58, startY: 48, landX: 66, landY: 196, rx: 5.4, ry: 4.6, landRot: 14, swayAmp: 14, swayFreq: 4.2 },
];

export const HydrangeasFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  // 绣球冰蓝粉紫至枯萎灰褐衰变
  const floret0 = lerpColor('#7dd3fc', '#d0c4b4', dryFactor);
  const floret50 = lerpColor('#818cf8', '#99836d', dryFactor);
  const floret100 = lerpColor('#c084fc', '#5f4b39', dryFactor);

  const stemCol0 = lerpColor('#4ade80', '#836f56', dryFactor);
  const stemCol100 = lerpColor('#15803d', '#332414', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.45);
  const fl2 = getBlossomDropStyle(health, 0.35);
  const fl3 = getBlossomDropStyle(health, 0.08);

  const leafOpacity = isFaded ? 0.35 : Math.max(0.45, health);

  // 单朵四瓣十字小花
  const renderFloret = (cx: number, cy: number, r: number = 6.0, rot: number = 0) => (
    <g transform={`translate(${cx}, ${cy}) rotate(${rot})`}>
      {/* 4 片十字对生圆瓣 */}
      <path d={`M 0 0 C -${r * 0.6} -${r * 0.4}, -${r * 0.5} -${r}, 0 -${r * 1.1} C ${r * 0.5} -${r}, ${r * 0.6} -${r * 0.4}, 0 0 Z`} fill="url(#hydrangeaFloretGrad)" />
      <path d={`M 0 0 C -${r * 0.6} ${r * 0.4}, -${r * 0.5} ${r}, 0 ${r * 1.1} C ${r * 0.5} ${r}, ${r * 0.6} ${r * 0.4}, 0 0 Z`} fill="url(#hydrangeaFloretGrad)" />
      <path d={`M 0 0 C -${r * 0.4} -${r * 0.6}, -${r} -${r * 0.5}, -${r * 1.1} 0 C -${r} ${r * 0.5}, -${r * 0.4} ${r * 0.6}, 0 0 Z`} fill="url(#hydrangeaFloretGrad)" />
      <path d={`M 0 0 C ${r * 0.4} -${r * 0.6}, ${r} -${r * 0.5}, ${r * 1.1} 0 C ${r} ${r * 0.5}, ${r * 0.4} ${r * 0.6}, 0 0 Z`} fill="url(#hydrangeaFloretGrad)" />
      {/* 花心微小圆蕊点 */}
      <circle cx="0" cy="0" r="1.1" fill="#ffffff" opacity="0.9" />
    </g>
  );

  // 单个绣球大圆球簇 (几十朵四瓣小花精密堆叠)
  const renderHydrangeaHead = (cx: number, cy: number, scale: number = 1.0) => (
    <g transform={`translate(${cx}, ${cy}) scale(${scale})`}>
      {/* 底层阴影小花 */}
      {renderFloret(-16, -12, 6.0, 15)}
      {renderFloret(16, -12, 6.2, -20)}
      {renderFloret(-18, 8, 6.4, 45)}
      {renderFloret(18, 8, 6.2, -35)}
      {renderFloret(0, -22, 6.5, 0)}
      {renderFloret(0, 20, 6.6, 25)}

      {/* 中层丰满小花 */}
      {renderFloret(-10, -8, 6.8, -10)}
      {renderFloret(10, -8, 7.0, 30)}
      {renderFloret(-12, 6, 7.2, 12)}
      {renderFloret(12, 6, 7.0, -15)}
      {renderFloret(-6, 14, 6.8, 5)}
      {renderFloret(6, 14, 6.8, -25)}

      {/* 表层凸显中心小花 */}
      {renderFloret(0, -2, 7.6, 8)}
      {renderFloret(-6, 2, 7.4, -18)}
      {renderFloret(6, 2, 7.4, 22)}
    </g>
  );

  return (
    <g id="hydrangeasFlora">
      <defs>
        <linearGradient id="hydrangeaFloretGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={floret0} />
          <stop offset="50%" stopColor={floret50} />
          <stop offset="100%" stopColor={floret100} />
        </linearGradient>
        <linearGradient id="hydrangeaStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stemCol0} />
          <stop offset="100%" stopColor={stemCol100} />
        </linearGradient>
      </defs>

      {/* 坚韧厚质粗花茎 */}
      <g id="hydrangeaStems">
        <path d="M 74 125 C 74 105, 68 85, 52 65" stroke="url(#hydrangeaStemGrad)" strokeWidth="4.0" fill="none" strokeLinecap="round" />
        <path d="M 76 125 C 76 105, 82 82, 98 62" stroke="url(#hydrangeaStemGrad)" strokeWidth="4.0" fill="none" strokeLinecap="round" />
        <path d="M 75 125 C 75 95, 75 65, 75 38" stroke="url(#hydrangeaStemGrad)" strokeWidth="4.2" fill="none" strokeLinecap="round" />
      </g>

      {/* 绣球宽大对生锯齿厚绿叶 */}
      <g id="hydrangeaLeaves" style={{ opacity: leafOpacity }}>
        <g className="animate-leaf-sway-1" style={{ transformOrigin: '73px 105px' }}>
          <path d="M 73 105 C 45 92, 18 100, 8 116 C 26 122, 54 116, 73 105 Z" fill={stemCol100} />
        </g>
        <g className="animate-leaf-sway-2" style={{ transformOrigin: '77px 108px' }}>
          <path d="M 77 108 C 105 92, 132 100, 142 116 C 124 122, 96 116, 77 108 Z" fill={stemCol100} />
        </g>
      </g>

      {/* 3 团饱满圆润大绣球花 */}
      <g id="hydrangeaBlooms">
        <g style={fl1}>{renderHydrangeaHead(48, 65, 0.95)}</g>
        <g style={fl2}>{renderHydrangeaHead(102, 62, 0.95)}</g>
        <g style={fl3}>{renderHydrangeaHead(75, 34, 1.15)}</g>
      </g>
    </g>
  );
};
