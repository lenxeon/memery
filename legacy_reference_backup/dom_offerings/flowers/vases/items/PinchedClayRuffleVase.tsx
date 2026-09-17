/**
 * @file PinchedClayRuffleVase.tsx
 * @description 1. 手作泥捏翻边梳齿瓶 (奇特器型)
 * 形制：不对称荷叶卷边口、手工梳齿拉坯刮痕粗陶，大口阔口，暖姜黄手作质感。
 */
import React from 'react';
import { VaseItemDefinition } from '../types';

export const PinchedClayRuffleVase: VaseItemDefinition = {
  id: 'pinched_clay_ruffle',
  name: '泥捏翻边梳齿瓶',
  category: 'sculptural_unique',
  categoryLabel: '奇特造型',
  sourceLabel: '参考新图1',
  shapeLabel: '不对称荷叶卷唇',
  desc: '不对称翻边马蹄口与泥捏凹凸指印筒腹，通体布满手工梳齿微刮刻痕，暖姜黄粗陶手作质感。',
  tag: '梳齿泥痕',
  iconText: '🏺',
  accentColor: '#d97706',
  borderColor: '#fde68a',

  // 物理形态接口：大口阔口，允许枝干向外自然舒展
  mouthAperture: 'wide',
  mouthWidth: 26,
  mouthCenter: { x: 74.5, y: 107 },
  vaseHeight: 88,
  spreadFactor: 1.25,

  renderMouthBack: () => (
    <g id="mouth_back_pinched_clay_ruffle">
      <ellipse cx="74.5" cy="107" rx="8" ry="2.6" fill="#140d07" />
      {/* 左高右低的不对称翻边后唇 */}
      <path d="M 62 104 C 66 101, 74 103, 85 108" stroke="#78350f" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </g>
  ),

  renderBody: () => {
    // 不对称翻边马蹄口与手捏自然凹凸指痕筒腹轮廓
    const ruffleBodyPath = `
      M 62 104
      C 66 101, 74 103, 85 108
      C 86 112, 80 114, 76 116
      C 76 126, 75 142, 79 152
      C 84 162, 86 176, 85 192
      Q 73 194.5 62 192
      C 60 178, 62 165, 67 154
      C 70 144, 70 126, 69 116
      C 66 114, 62 110, 62 104
      Z
    `;

    // 手工梳齿刮痕纹理 y 坐标
    const combYs = [
      118, 122, 126, 130, 134, 138, 142, 146, 150, 154, 158, 162, 166, 170, 174, 178, 182, 186, 189
    ];

    return (
      <g id="vase_pinched_clay_ruffle">
        <clipPath id="clipClayRuffle">
          <path d={ruffleBodyPath} />
        </clipPath>

        {/* 暖姜黄手作粗陶胎 */}
        <path
          d={ruffleBodyPath}
          fill="url(#warmPinchedClayGrad)"
          stroke="#78350f"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* 手工梳齿刮擦与泥捏指印表面微肌理 */}
        <g id="clayCombedStriations" clipPath="url(#clipClayRuffle)">
          {/* 纵向手工梳齿刮拉纹 */}
          {[64, 66, 68, 70, 72, 74, 76, 78, 80, 82].map((x, i) => (
            <path
              key={`vert_${i}`}
              d={`M ${x} 118 Q ${x + (i % 2 === 0 ? 1 : -1)} 155 ${x + (x - 73) * 0.15} 192`}
              stroke="#78350f"
              strokeWidth="0.65"
              strokeDasharray="4,2"
              opacity="0.38"
              fill="none"
            />
          ))}

          {/* 横向微斜慢轮拉坯刮擦细痕 */}
          {combYs.map((y, i) => (
            <g key={`comb_${i}`}>
              <path
                d={`M 60 ${y} Q 74 ${y + (i % 2 === 0 ? 0.8 : -0.6)} 86 ${y + (i % 3 === 0 ? 1.2 : 0)}`}
                stroke="#78350f"
                strokeWidth="0.75"
                opacity={i % 2 === 0 ? 0.45 : 0.28}
                fill="none"
              />
              <path
                d={`M 62 ${y + 0.4} Q 74 ${y + 1.0} 84 ${y + 0.4}`}
                stroke="#fef08a"
                strokeWidth="0.5"
                opacity="0.55"
                fill="none"
              />
            </g>
          ))}

          {/* 手捏凹凸微指痕受光阴影 */}
          <ellipse cx="69" cy="148" rx="4" ry="7" fill="#78350f" opacity="0.18" />
          <ellipse cx="77" cy="165" rx="5" ry="9" fill="#fde047" opacity="0.3" />
        </g>

        {/* 质朴平底圈足 */}
        <path d="M 62 192 Q 73 194.5 85 192 L 84 195 Q 73 197 63 195 Z" fill="#b45309" stroke="#78350f" strokeWidth="1.6" />

        {/* 不对称荷叶翻边前唇 */}
        <path
          d="M 62 104 C 66 109, 73 113, 85 108 C 88 111, 80 115, 73 114 C 66 113, 62 109, 62 104 Z"
          fill="#fef08a"
          stroke="#78350f"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M 63 105 C 67 108.5, 74 111, 83 109" stroke="#ffffff" strokeWidth="1.1" fill="none" opacity="0.9" />
      </g>
    );
  },
};
