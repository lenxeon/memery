/**
 * @file WarringTurquoiseFangVase.ts
 * @description 战国错金绿松石云纹钫神韵再设计：方口双耳、斜肩方腹、错金嵌翠。
 */
import { VaseItemDefinition } from '../types';

export const WarringTurquoiseFangVase: VaseItemDefinition = {
  id: 'warring_turquoise_fang',
  name: '战国错金云纹钫',
  category: 'sculptural_unique',
  categoryLabel: '历史神韵',
  sourceLabel: '灵感 · 嵌绿松石勾连云纹钫',
  shapeLabel: '方口双耳斜肩钫',
  desc: '方口、双耳、斜肩和高足构成钫式轮廓，深铜胎上错金并嵌绿松石勾连云纹。',
  tag: '错金嵌翠',
  iconText: '◇',
  accentColor: '#169b8c',
  borderColor: '#d1a64c',

  mouthAperture: 'standard',
  mouthWidth: 16,
  mouthCenter: { x: 75, y: 107 },
  vaseHeight: 88,
  spreadFactor: 1.0,

  renderMouthBack: () => `
<g id="mouth_back_warring_turquoise_fang">
  <path d="M 67 107 L 70 104.8 L 80 104.8 L 83 107 L 80 109 L 70 109 Z" fill="#17120f" stroke="#b88a42" stroke-width="1.3" />
</g>
`,

  renderBody: () => `
<g id="vase_warring_turquoise_fang">
  <path d="M 65 128 C 56 126 51 131 51 139 L 51 151 C 51 158 56 162 62 158 L 62 153 C 58 156 55 153 55 149 L 55 140 C 55 135 58 133 64 134 Z" fill="url(#warringFangBronzeGrad)" stroke="#2c2019" stroke-width="1.4" />
  <path d="M 85 128 C 94 126 99 131 99 139 L 99 151 C 99 158 94 162 88 158 L 88 153 C 92 156 95 153 95 149 L 95 140 C 95 135 92 133 86 134 Z" fill="url(#warringFangBronzeGrad)" stroke="#2c2019" stroke-width="1.4" />
  <clipPath id="clipWarringTurquoiseFang">
    <path d="M 67 107 L 83 107 L 82 122 L 94 136 L 90 190 L 86 194 L 64 194 L 60 190 L 56 136 L 68 122 Z" />
  </clipPath>
  <path d="M 67 107 L 83 107 L 82 122 L 94 136 L 90 190 L 86 194 L 64 194 L 60 190 L 56 136 L 68 122 Z" fill="url(#warringFangBronzeGrad)" stroke="#2c2019" stroke-width="1.75" stroke-linejoin="round" />
  <g clip-path="url(#clipWarringTurquoiseFang)">
    <path d="M 56 136 L 64 141 L 65 190 L 60 190 Z" fill="#1c7770" opacity="0.4" />
    <path d="M 94 136 L 86 141 L 85 190 L 90 190 Z" fill="#181311" opacity="0.38" />
    <path d="M 62 148 C 66 142 72 143 72 149 C 72 154 66 155 64 151 C 62 147 68 146 75 153 C 82 160 88 157 88 151 C 88 146 82 143 78 148" fill="none" stroke="#d5ad58" stroke-width="1.25" stroke-linecap="round" />
    <path d="M 62 169 C 67 164 72 165 75 171 C 78 177 83 177 88 171" fill="none" stroke="url(#turquoiseInlayGrad)" stroke-width="2.1" stroke-linecap="round" />
    <path d="M 75 139 L 81 151 L 75 162 L 69 151 Z" fill="url(#turquoiseInlayGrad)" stroke="#ddb866" stroke-width="0.9" />
    <circle cx="75" cy="151" r="2" fill="#bcefe2" />
    <path d="M 64 184 L 86 184" stroke="#d5ad58" stroke-width="1.1" />
  </g>
  <path d="M 62 190 L 88 190 L 90 195 L 60 195 Z" fill="#513823" stroke="#2c2019" stroke-width="1.35" />
  <path d="M 67 107 L 83 107 L 81 111 L 69 111 Z" fill="#8b6940" stroke="#2c2019" stroke-width="1.35" />
  <path d="M 69 107.5 L 81 107.5" stroke="#e2bc6b" stroke-width="0.75" opacity="0.85" />
</g>
`,
};
