/**
 * @file RuCeladonCongVase.ts
 * @description 原创东方极简汝青琮影瓶：圆口方身，以修长比例、玉质窑变与淡开片表达内圆外方。
 */
import { VaseItemDefinition } from '../types';

export const RuCeladonCongVase: VaseItemDefinition = {
  id: 'ru_celadon_cong',
  name: '汝青琮影瓶',
  category: 'minimalist',
  categoryLabel: '东方极简',
  sourceLabel: '原创 · 东方极简',
  shapeLabel: '圆口方身琮影',
  desc: '圆口短颈承接低折肩与修长方身，汝青玉釉带青蓝窑变与极淡开片。',
  tag: '方圆相生',
  iconText: '□',
  accentColor: '#7d9184',
  borderColor: '#cdd8cd',

  mouthAperture: 'standard',
  mouthWidth: 16,
  mouthCenter: { x: 75, y: 107.5 },
  vaseHeight: 87.5,
  spreadFactor: 1.0,

  renderMouthBack: () => `
<g id="mouth_back_ru_celadon_cong">
  <ellipse cx="75" cy="107.5" rx="8" ry="2.4" fill="#223028" />
  <path d="M 67 107.5 C 67 105.4, 83 105.4, 83 107.5" stroke="#65786d" stroke-width="1.45" fill="none" stroke-linecap="round" />
</g>
`,

  renderBody: () => `
<g id="vase_ru_celadon_cong">
  <clipPath id="clipRuCeladonCong">
    <path d="M 67 107.5 Q 75 109.7 83 107.5 L 82.5 118 Q 82.5 121 85 123 L 89 127 L 88 190 Q 88 193 85 194 L 65 194 Q 62 193 62 190 L 61 127 L 65 123 Q 67.5 121 67.5 118 Z" />
  </clipPath>
  <path
    d="M 67 107.5
       Q 75 109.7 83 107.5
       L 82.5 118
       Q 82.5 121 85 123
       L 89 127
       L 88 190
       Q 88 193 85 194
       L 65 194
       Q 62 193 62 190
       L 61 127
       L 65 123
       Q 67.5 121 67.5 118 Z"
    fill="url(#ruCeladonCongGrad)"
    stroke="#4f6257"
    stroke-width="1.65"
    stroke-linejoin="round"
  />
  <g clip-path="url(#clipRuCeladonCong)">
    <rect x="60" y="122" width="30" height="72" fill="url(#ruJadeBloomGrad)" />
    <path d="M 61 127 L 66 131 L 66.5 189 L 62 190 Z" fill="#5f766b" opacity="0.5" />
    <path d="M 89 127 L 84 131 L 83.5 189 L 88 190 Z" fill="#4b6257" opacity="0.38" />
    <path d="M 66 131 L 84 131" stroke="#eef4ed" stroke-width="0.8" opacity="0.64" />
    <path d="M 67 133 L 67.5 187" stroke="#ffffff" stroke-width="1.2" opacity="0.56" stroke-linecap="round" />
    <g stroke="#607c71" stroke-width="0.38" opacity="0.3" fill="none">
      <path d="M 70 137 L 73 144 L 71 151 L 75 158" />
      <path d="M 81 148 L 77 155 L 79 163 L 76 171" />
      <path d="M 68 174 L 72 180 L 70 189" />
    </g>
  </g>
  <path d="M 64.5 190 Q 75 192 85.5 190 L 85 195 L 65 195 Z" fill="#667c70" stroke="#4f6257" stroke-width="1.15" />
  <path
    d="M 67 107.5 Q 75 109.7 83 107.5 C 83 110.8 67 110.8 67 107.5 Z"
    fill="#d9e3da"
    stroke="#4f6257"
    stroke-width="1.4"
    stroke-linejoin="round"
  />
  <path d="M 68.5 108.2 Q 75 109.5 81.5 108.2" stroke="#ffffff" stroke-width="0.75" opacity="0.72" fill="none" />
</g>
`,
};
