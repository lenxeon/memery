/**
 * @file ShangBronzeGuVase.ts
 * @description 商周青铜觚神韵再设计：大撇口、束腰、高圈足，铜绿与金棕氧化层交叠。
 */
import { VaseItemDefinition } from '../types';

export const ShangBronzeGuVase: VaseItemDefinition = {
  id: 'shang_bronze_gu',
  name: '商青铜觚花器',
  category: 'sculptural_unique',
  categoryLabel: '历史神韵',
  sourceLabel: '灵感 · 商周青铜觚',
  shapeLabel: '大撇口束腰高足',
  desc: '大撇口、修长束腰与高圈足构成礼器式比例，铜绿、孔雀蓝和金棕氧化层交叠。',
  tag: '铜绿鎏光',
  iconText: '𓏤',
  accentColor: '#397d71',
  borderColor: '#b7894e',

  mouthAperture: 'wide',
  mouthWidth: 30,
  mouthCenter: { x: 75, y: 104 },
  vaseHeight: 91,
  spreadFactor: 1.25,

  renderMouthBack: () => `
<g id="mouth_back_shang_bronze_gu">
  <ellipse cx="75" cy="104" rx="15" ry="3.2" fill="#171712" />
  <path d="M 60 104 C 61 100.8, 89 100.8, 90 104" stroke="#8f6d3e" stroke-width="1.6" fill="none" />
</g>
`,

  renderBody: () => `
<g id="vase_shang_bronze_gu">
  <clipPath id="clipShangBronzeGu">
    <path d="M 60 104 Q 75 107 90 104 C 86 113 83 120 81 129 L 79 143 L 85 163 L 90 192 Q 75 195 60 192 L 65 163 L 71 143 L 69 129 C 67 120 64 113 60 104 Z" />
  </clipPath>
  <path d="M 60 104 Q 75 107 90 104 C 86 113 83 120 81 129 L 79 143 L 85 163 L 90 192 Q 75 195 60 192 L 65 163 L 71 143 L 69 129 C 67 120 64 113 60 104 Z" fill="url(#bronzePatinaGuGrad)" stroke="#34251b" stroke-width="1.75" stroke-linejoin="round" />
  <g clip-path="url(#clipShangBronzeGu)">
    <path d="M 63 108 L 87 108 M 68 126 L 82 126 M 70 142 L 80 142 M 64 164 L 86 164 M 61 188 L 89 188" stroke="#d0a961" stroke-width="1" opacity="0.72" />
    <path d="M 70 130 C 73 127 77 127 80 130 C 77 134 73 134 70 130 Z" fill="#153e3d" stroke="#c59b58" stroke-width="0.7" />
    <circle cx="72.5" cy="130.5" r="1.1" fill="#54c7b5" />
    <circle cx="77.5" cy="130.5" r="1.1" fill="#54c7b5" />
    <path d="M 67 151 Q 75 145 83 151 Q 75 157 67 151 Z" fill="none" stroke="#1b817a" stroke-width="1.3" opacity="0.82" />
    <path d="M 64 176 C 70 170 80 170 86 176" stroke="#c99e5a" stroke-width="1" fill="none" opacity="0.68" />
    <path d="M 66 110 C 70 128 67 151 69 184" stroke="#7ad0be" stroke-width="1.1" opacity="0.28" fill="none" />
    <path d="M 83 108 C 79 130 84 151 81 188" stroke="#edc87f" stroke-width="0.8" opacity="0.3" fill="none" />
  </g>
  <path d="M 58.5 191 Q 75 194.5 91.5 191 L 93 195 Q 75 198 57 195 Z" fill="url(#bronzeGoldEdgeGrad)" stroke="#34251b" stroke-width="1.4" />
  <path d="M 60 104 Q 75 107 90 104 C 89 108 61 108 60 104 Z" fill="url(#bronzeGoldEdgeGrad)" stroke="#34251b" stroke-width="1.45" />
  <path d="M 62 104.8 Q 75 106.8 88 104.8" stroke="#e6c984" stroke-width="0.75" opacity="0.8" fill="none" />
</g>
`,
};
