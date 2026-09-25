/**
 * @file TeaWhiteShoulderVase.ts
 * @description 原创东方极简茶白贯耳方瓶：双贯耳、折肩、切面方腹，以乳浊窑变釉重构古典器形。
 */
import { VaseItemDefinition } from '../types';

export const TeaWhiteShoulderVase: VaseItemDefinition = {
  id: 'tea_white_shoulder',
  name: '茶白贯耳方瓶',
  category: 'wabi_sabi',
  categoryLabel: '东方极简',
  sourceLabel: '原创 · 东方极简',
  shapeLabel: '双贯耳折肩方腹',
  desc: '长颈两侧生双贯耳，折肩落入切面方腹；茶白乳浊釉流转暖金与青白微光。',
  tag: '窑变贯耳',
  iconText: '▱',
  accentColor: '#a79884',
  borderColor: '#e8dfcf',

  mouthAperture: 'narrow',
  mouthWidth: 14,
  mouthCenter: { x: 75, y: 106.5 },
  vaseHeight: 88.5,
  spreadFactor: 0.72,

  renderMouthBack: () => `
<g id="mouth_back_tea_white_shoulder">
  <ellipse cx="75" cy="106.5" rx="7" ry="2.25" fill="#302b24" />
  <path d="M 68 106.5 C 68 104.5, 82 104.5, 82 106.5" stroke="#7d705e" stroke-width="1.4" fill="none" stroke-linecap="round" />
</g>
`,

  renderBody: () => `
<g id="vase_tea_white_shoulder">
  <clipPath id="clipTeaWhiteShoulder">
    <path d="M 68 106.5 Q 75 108.5 82 106.5 L 81 128 Q 81 132 84 135 L 90 141 L 87 191 Q 75 194 63 191 L 60 141 L 66 135 Q 69 132 69 128 Z" />
  </clipPath>
  <path d="M 69 116 C 63 113.5 58.5 117 58.5 123 L 58.5 133.5 C 58.5 140 63 143.5 68 139 L 68 134.5 C 65 137.5 62.5 136 62.5 132.5 L 62.5 124 C 62.5 120.5 65 119 69 120 Z" fill="url(#teaWhiteShoulderGrad)" stroke="#6f6251" stroke-width="1.3" />
  <path d="M 81 116 C 87 113.5 91.5 117 91.5 123 L 91.5 133.5 C 91.5 140 87 143.5 82 139 L 82 134.5 C 85 137.5 87.5 136 87.5 132.5 L 87.5 124 C 87.5 120.5 85 119 81 120 Z" fill="url(#teaWhiteShoulderGrad)" stroke="#6f6251" stroke-width="1.3" />
  <path
    d="M 68 106.5
       Q 75 108.5 82 106.5
       L 81 128
       Q 81 132 84 135
       L 90 141
       L 87 191
       Q 75 194 63 191
       L 60 141
       L 66 135
       Q 69 132 69 128 Z"
    fill="url(#teaWhiteShoulderGrad)"
    stroke="#6f6251"
    stroke-width="1.65"
    stroke-linejoin="round"
  />
  <g clip-path="url(#clipTeaWhiteShoulder)">
    <path d="M 55 184 C 66 159 78 143 94 127 L 95 149 C 82 161 74 177 68 199 Z" fill="url(#teaKilnFlowGrad)" opacity="0.9" />
    <path d="M 60 141 L 67 146 L 68 189 L 63 191 Z" fill="#9a8b75" opacity="0.32" />
    <path d="M 90 141 L 83 146 L 82 189 L 87 191 Z" fill="#78918b" opacity="0.22" />
    <path d="M 67 146 L 75 141 L 83 146 L 82 189 Q 75 192 68 189 Z" fill="#fffdf5" opacity="0.18" />
    <path d="M 67 145 L 68 188" stroke="#ffffff" stroke-width="1.2" opacity="0.6" />
    <path d="M 83 145 L 82 188" stroke="#756754" stroke-width="0.9" opacity="0.34" />
    <path d="M 72 112 C 71.5 126 72.5 137 70.5 151 C 69.5 160 71 172 70 184" stroke="#f7d6a0" stroke-width="0.7" opacity="0.38" fill="none" stroke-linecap="round" />
    <path d="M 79 113 C 80 127 78.5 139 80.5 151 C 82 163 80 175 81 187" stroke="#91c4bd" stroke-width="0.7" opacity="0.34" fill="none" stroke-linecap="round" />
  </g>
  <path d="M 63 190.5 Q 75 193.5 87 190.5 L 86 195 Q 75 196.5 64 195 Z" fill="#8f816d" stroke="#6f6251" stroke-width="1.15" />
  <path
    d="M 68 106.5 Q 75 108.5 82 106.5 C 82 109.4 68 109.4 68 106.5 Z"
    fill="#eee6d9"
    stroke="#6f6251"
    stroke-width="1.4"
    stroke-linejoin="round"
  />
  <path d="M 69.2 107.1 Q 75 108.3 80.8 107.1" stroke="#ffffff" stroke-width="0.75" opacity="0.76" fill="none" />
</g>
`,
};
