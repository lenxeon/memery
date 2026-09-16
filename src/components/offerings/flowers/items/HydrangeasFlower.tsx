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

      {/* 团圆绣球特有标志性·对生阔卵形粗锐锯齿厚大叶 (边缘密布尖锐锯齿，羽状深凹叶脉直达齿尖) */}
      <g id="hydrangeaLeaves" style={{ opacity: leafOpacity }}>
        {/* 左侧阔卵形锐锯齿大叶 */}
        <g className="animate-leaf-sway-1" style={{ transformOrigin: '72px 108px' }}>
          <path
            d="M 72 108 L 62 103 L 57 98 L 50 101 L 43 95 L 36 99 L 28 93 L 20 98 L 12 94 C 8 104 10 114 18 118 L 26 116 L 34 122 L 44 120 L 54 122 L 64 116 L 72 110 Z"
            fill={stemCol100}
            stroke="#14532d"
            strokeWidth="0.8"
          />
          {/* 主脉与侧齿脉 */}
          <path d="M 72 108 Q 42 104 14 96" stroke="#86efac" strokeWidth="1.4" fill="none" opacity="0.85" />
          <path d="M 57 106 L 50 101" stroke="#86efac" strokeWidth="0.8" opacity="0.65" />
          <path d="M 46 105 L 36 99" stroke="#86efac" strokeWidth="0.8" opacity="0.65" />
          <path d="M 34 103 L 20 98" stroke="#86efac" strokeWidth="0.8" opacity="0.65" />
          <path d="M 52 108 L 44 120" stroke="#86efac" strokeWidth="0.8" opacity="0.65" />
          <path d="M 40 106 L 26 116" stroke="#86efac" strokeWidth="0.8" opacity="0.65" />
        </g>

        {/* 右侧阔卵形锐锯齿大叶 */}
        <g className="animate-leaf-sway-2" style={{ transformOrigin: '78px 108px' }}>
          <path
            d="M 78 108 L 88 103 L 93 98 L 100 101 L 107 95 L 114 99 L 122 93 L 130 98 L 138 94 C 142 104 140 114 132 118 L 124 116 L 116 122 L 106 120 L 96 122 L 86 116 L 78 110 Z"
            fill={stemCol100}
            stroke="#14532d"
            strokeWidth="0.8"
          />
          <path d="M 78 108 Q 108 104 136 96" stroke="#86efac" strokeWidth="1.4" fill="none" opacity="0.85" />
          <path d="M 93 106 L 100 101" stroke="#86efac" strokeWidth="0.8" opacity="0.65" />
          <path d="M 104 105 L 114 99" stroke="#86efac" strokeWidth="0.8" opacity="0.65" />
          <path d="M 116 103 L 130 98" stroke="#86efac" strokeWidth="0.8" opacity="0.65" />
          <path d="M 98 108 L 106 120" stroke="#86efac" strokeWidth="0.8" opacity="0.65" />
          <path d="M 110 106 L 124 116" stroke="#86efac" strokeWidth="0.8" opacity="0.65" />
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
