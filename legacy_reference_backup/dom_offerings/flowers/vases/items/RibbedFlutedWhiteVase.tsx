/**
 * @file RibbedFlutedWhiteVase.tsx
 * @description 5. 极细百褶密棱直筒瓶 (现代器型)
 * 形制：微收腰直筒瓶身，密布精细垂直百褶密棱，窄口直筒，纯白哑光现代陶艺质感。
 */
import React from 'react';
import { VaseItemDefinition } from '../types';

export const RibbedFlutedWhiteVase: VaseItemDefinition = {
  id: 'ribbed_fluted_white',
  name: '极细百褶密棱瓶',
  category: 'designer_modern',
  categoryLabel: '现代设计',
  sourceLabel: '参考图1右/4右',
  shapeLabel: '垂直细褶直筒',
  desc: '微收腰直筒瓶身密布如风琴褶般的垂直立体细棱，纯白哑光现代陶艺质感，高雅挺秀。',
  tag: '百褶密棱',
  iconText: '🏛️',
  accentColor: '#475569',
  borderColor: '#e2e8f0',

  mouthAperture: 'narrow',
  mouthWidth: 21,
  mouthCenter: { x: 75, y: 108 },
  vaseHeight: 87,
  spreadFactor: 0.72,

  renderMouthBack: () => (
    <g id="mouth_back_ribbed_fluted">
      <ellipse cx="75" cy="108.5" rx="10.5" ry="3.0" fill="#140d07" />
      <path d="M 64.5 108 C 64.5 105.5, 85.5 105.5, 85.5 108" stroke="#38281a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </g>
  ),

  renderBody: () => {
    const outerFlutePath = `
      M 64.5 108
      Q 75 110.5 85.5 108
      C 86.5 125, 85 155, 87 186
      L 86 192
      Q 75 194.5 64 192
      L 63 186
      C 65 155, 63.5 125, 64.5 108
      Z
    `;
    const ribs = [65.5, 67, 68.5, 70, 71.5, 73, 74.5, 76, 77.5, 79, 80.5, 82, 83.5, 85];

    return (
      <g id="vase_ribbed_fluted_white">
        <clipPath id="clipRibbedFluted">
          <path d={outerFlutePath} />
        </clipPath>

        <path
          d={outerFlutePath}
          fill="url(#pureMatteWhiteGrad)"
          stroke="#2a1e14"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        <g id="verticalPleatedFlutes" clipPath="url(#clipRibbedFluted)">
          {ribs.map((rx, idx) => {
            const isCenter = Math.abs(rx - 75) < 3.5;
            const isLeft = rx < 75;
            return (
              <g key={idx}>
                <line
                  x1={rx}
                  y1="108"
                  x2={rx + (rx - 75) * 0.08}
                  y2="192"
                  stroke="#ffffff"
                  strokeWidth={isCenter ? 1.4 : 1.1}
                  opacity={isCenter ? 0.95 : isLeft ? 0.85 : 0.65}
                />
                <line
                  x1={rx + 0.75}
                  y1="108"
                  x2={rx + 0.75 + (rx - 75) * 0.08}
                  y2="192"
                  stroke="#38281a"
                  strokeWidth="0.8"
                  opacity={isLeft ? 0.25 : 0.45}
                />
              </g>
            );
          })}
        </g>

        <path
          d="M 81 110 C 83 130, 83 170, 85 192 L 87 192 C 85 170, 86 130, 85 108 Z"
          fill="#2a1e14"
          opacity="0.12"
        />

        <path d="M 64 192 Q 75 194.5 86 192 L 85.5 195 Q 75 197 64.5 195 Z" fill="#dfd5c5" stroke="#2a1e14" strokeWidth="1.5" />

        <path
          d="M 64.5 108 Q 75 110.5 85.5 108 C 85.5 112, 64.5 112, 64.5 108 Z"
          fill="#ffffff"
          stroke="#2a1e14"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M 66 109 Q 75 110.8 84 109" stroke="#ffffff" strokeWidth="1.0" fill="none" opacity="0.9" />
      </g>
    );
  },
};
