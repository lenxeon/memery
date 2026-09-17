/**
 * @file FlutedTrapezoidMiniVase.tsx
 * @description 9. 折线圆台百褶短瓶 (现代器型)
 * 形制：上窄下阔梯形圆台，密布外展折线竖棱，纯白折线现代陶艺质感。
 */
import React from 'react';
import { VaseItemDefinition } from '../types';

export const FlutedTrapezoidMiniVase: VaseItemDefinition = {
  id: 'fluted_trapezoid_mini',
  name: '圆台百褶短瓶',
  category: 'designer_modern',
  categoryLabel: '现代设计',
  sourceLabel: '参考图1中 梯形百褶',
  shapeLabel: '梯形外展折棱',
  desc: '上敛下侈的倒梯台雕塑形制，斜向放射展开的硬朗折纸折线百褶，极简现代。',
  tag: '圆台百褶',
  iconText: '📐',
  accentColor: '#334155',
  borderColor: '#cbd5e1',

  mouthAperture: 'wide',
  mouthWidth: 15,
  mouthCenter: { x: 75, y: 112 },
  vaseHeight: 83,
  spreadFactor: 1.25,

  renderMouthBack: () => (
    <g id="mouth_back_fluted_trapezoid">
      <ellipse cx="75" cy="112" rx="7.5" ry="2.2" fill="#140d07" />
      <path d="M 67.5 112 C 67.5 110, 82.5 110, 82.5 112" stroke="#332418" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </g>
  ),

  renderBody: () => {
    const trapezoidBodyPath = `
      M 67.5 112
      L 82.5 112
      L 100 192
      L 50 192
      Z
    `;
    const ribs = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6];

    return (
      <g id="vase_fluted_trapezoid_mini">
        <clipPath id="clipTrapezoid">
          <path d={trapezoidBodyPath} />
        </clipPath>

        <path
          d={trapezoidBodyPath}
          fill="url(#pureMatteWhiteGrad)"
          stroke="#2a1e14"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        <g id="radiatingTrapezoidFlutes" clipPath="url(#clipTrapezoid)">
          {ribs.map((idx) => {
            const topX = 75 + idx * 1.15;
            const bottomX = 75 + idx * 3.8;
            const isCenter = Math.abs(idx) <= 1;
            return (
              <g key={idx}>
                <line
                  x1={topX}
                  y1="112"
                  x2={bottomX}
                  y2="192"
                  stroke="#ffffff"
                  strokeWidth={isCenter ? 1.5 : 1.2}
                  opacity={isCenter ? 0.95 : idx < 0 ? 0.85 : 0.65}
                />
                <line
                  x1={topX + 0.6}
                  y1="112"
                  x2={bottomX + 1.2}
                  y2="192"
                  stroke="#332418"
                  strokeWidth="0.8"
                  opacity={idx < 0 ? 0.25 : 0.45}
                />
              </g>
            );
          })}
        </g>

        <polygon points="50,192 100,192 99,195 51,195" fill="#dfd5c5" stroke="#2a1e14" strokeWidth="1.5" />

        <path
          d="M 67.5 112 Q 75 114 82.5 112 C 82.5 115, 67.5 115, 67.5 112 Z"
          fill="#ffffff"
          stroke="#2a1e14"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </g>
    );
  },
};
