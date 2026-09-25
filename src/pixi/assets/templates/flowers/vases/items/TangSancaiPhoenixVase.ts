/**
 * @file TangSancaiPhoenixVase.ts
 * @description 唐三彩凤首壶神韵再设计：凤冠口、曲柄、扁圆腹、高足与绿褐白流釉。
 */
import { VaseItemDefinition } from '../types';

export const TangSancaiPhoenixVase: VaseItemDefinition = {
  id: 'tang_sancai_phoenix',
  name: '唐彩凤首曲柄瓶',
  category: 'sculptural_unique',
  categoryLabel: '历史神韵',
  sourceLabel: '灵感 · 唐三彩凤首壶',
  shapeLabel: '凤冠口曲柄扁腹',
  desc: '凤冠口、细颈、扁圆腹、外撇高足与曲柄形成鲜明侧影，绿褐白三彩釉自然垂流。',
  tag: '三彩流釉',
  iconText: '♬',
  accentColor: '#2f8f63',
  borderColor: '#d7a34b',

  mouthAperture: 'standard',
  mouthWidth: 14,
  mouthCenter: { x: 75, y: 108 },
  vaseHeight: 87,
  spreadFactor: 1.0,

  renderMouthBack: () => `
<g id="mouth_back_tang_sancai_phoenix">
  <ellipse cx="75" cy="108" rx="7" ry="2.35" fill="#302315" />
  <path d="M 68 108 C 68 106, 82 106, 82 108" stroke="#956129" stroke-width="1.4" fill="none" />
  <path d="M 69 106 Q 66 101 70 99 Q 73 102 75 106" fill="#2f8f63" stroke="#5f3b20" stroke-width="1.1" />
  <path d="M 81 106 Q 87 105 89 109 Q 85 110 81 109" fill="#d7952f" stroke="#5f3b20" stroke-width="1.1" />
</g>
`,

  renderBody: () => `
<g id="vase_tang_sancai_phoenix">
  <path d="M 81 118 C 94 120 103 133 101 149 C 100 160 95 169 89 176" stroke="#6b4524" stroke-width="6" fill="none" stroke-linecap="round" />
  <path d="M 82 119 C 93 123 98 135 96 149 C 95 158 92 165 87 171" stroke="#d59b48" stroke-width="2.2" fill="none" stroke-linecap="round" opacity="0.9" />
  <clipPath id="clipTangSancaiPhoenix">
    <path d="M 68 108 Q 75 110 82 108 C 80.5 116 80 123 84 130 C 92 138 96 151 94 165 C 92 178 86 187 83 190 L 88 194 L 87 196 L 63 196 L 62 194 L 67 190 C 64 187 58 178 56 165 C 54 151 58 138 66 130 C 70 123 69.5 116 68 108 Z" />
  </clipPath>
  <path d="M 68 108 Q 75 110 82 108 C 80.5 116 80 123 84 130 C 92 138 96 151 94 165 C 92 178 86 187 83 190 L 88 194 L 87 196 L 63 196 L 62 194 L 67 190 C 64 187 58 178 56 165 C 54 151 58 138 66 130 C 70 123 69.5 116 68 108 Z" fill="url(#sancaiIvoryBodyGrad)" stroke="#60401f" stroke-width="1.7" stroke-linejoin="round" />
  <g clip-path="url(#clipTangSancaiPhoenix)">
    <path d="M 55 119 C 66 126 65 143 71 154 C 76 165 70 183 68 196 L 55 196 Z" fill="url(#sancaiGreenFlowGrad)" />
    <path d="M 75 108 C 84 126 79 139 87 151 C 93 160 86 180 82 197 L 96 197 L 98 111 Z" fill="url(#sancaiAmberFlowGrad)" />
    <path d="M 66 126 C 74 131 76 139 74 148 C 72 157 78 165 76 177" stroke="#f8e7a9" stroke-width="2.2" opacity="0.72" fill="none" stroke-linecap="round" />
    <circle cx="83" cy="145" r="3" fill="#277f59" opacity="0.72" />
    <circle cx="65" cy="168" r="2.2" fill="#b15425" opacity="0.62" />
  </g>
  <path d="M 63 190 Q 75 193 87 190 L 89 195 Q 75 198 61 195 Z" fill="#9d652d" stroke="#60401f" stroke-width="1.35" />
  <path d="M 68 108 Q 75 110 82 108 C 82 111 68 111 68 108 Z" fill="#e5bd66" stroke="#60401f" stroke-width="1.4" />
  <path d="M 69.2 108.5 Q 75 109.8 80.8 108.5" stroke="#fff2bd" stroke-width="0.7" opacity="0.8" fill="none" />
</g>
`,
};
