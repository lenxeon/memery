/**
 * @file MoonWhiteOrbVase.ts
 * @description 原创东方极简月白玉壶春瓶：撇口、细颈、垂腹，以珍珠釉虹彩和凝练轮廓塑形。
 */
import { VaseItemDefinition } from '../types';

export const MoonWhiteOrbVase: VaseItemDefinition = {
  id: 'moon_white_orb',
  name: '月白玉壶春瓶',
  category: 'minimalist',
  categoryLabel: '东方极简',
  sourceLabel: '原创 · 东方极简',
  shapeLabel: '撇口细颈垂腹',
  desc: '撇口、细颈、垂腹构成修长玉壶春比例，月白珍珠釉流转青粉虹彩。',
  tag: '月白珠光',
  iconText: '◯',
  accentColor: '#8b9691',
  borderColor: '#d9dcd7',

  mouthAperture: 'narrow',
  mouthWidth: 17,
  mouthCenter: { x: 75, y: 105.5 },
  vaseHeight: 89.5,
  spreadFactor: 0.72,

  renderMouthBack: () => `
<g id="mouth_back_moon_white_orb">
  <ellipse cx="75" cy="105.5" rx="8.5" ry="2.45" fill="#252a27" />
  <path d="M 66.5 105.5 C 67 103.2, 83 103.2, 83.5 105.5" stroke="#727d77" stroke-width="1.45" fill="none" stroke-linecap="round" />
</g>
`,

  renderBody: () => `
<g id="vase_moon_white_orb">
  <clipPath id="clipMoonWhiteOrb">
    <path d="M 66.5 105.5 Q 75 108 83.5 105.5 C 82 110 80.5 113 80 117 C 79.2 122 81 126 85 131 C 91 139 93 151 92 162 C 91 176 85.5 187.5 80 191.5 Q 75 194 70 191.5 C 64.5 187.5 59 176 58 162 C 57 151 59 139 65 131 C 69 126 70.8 122 70 117 C 69.5 113 68 110 66.5 105.5 Z" />
  </clipPath>
  <path
    d="M 66.5 105.5
       Q 75 108 83.5 105.5
       C 82 110 80.5 113 80 117
       C 79.2 122 81 126 85 131
       C 91 139 93 151 92 162
       C 91 176 85.5 187.5 80 191.5
       Q 75 194 70 191.5
       C 64.5 187.5 59 176 58 162
       C 57 151 59 139 65 131
       C 69 126 70.8 122 70 117
       C 69.5 113 68 110 66.5 105.5 Z"
    fill="url(#moonWhitePorcelainGrad)"
    stroke="#59645e"
    stroke-width="1.65"
    stroke-linejoin="round"
  />
  <g clip-path="url(#clipMoonWhiteOrb)">
    <path d="M 55 178 C 64 158 74 143 95 124 L 96 146 C 78 158 69 174 63 194 Z" fill="url(#moonPearlSheenGrad)" opacity="0.9" />
    <path d="M 63 136 C 60.5 149 61.5 168 67.5 182.5" stroke="#ffffff" stroke-width="1.65" opacity="0.74" fill="none" stroke-linecap="round" />
    <path d="M 87 136 C 90 149 89 169 83.5 184" stroke="#6c7d78" stroke-width="1.05" opacity="0.32" fill="none" stroke-linecap="round" />
    <ellipse cx="71" cy="151" rx="4.2" ry="17" fill="#ffffff" opacity="0.13" transform="rotate(10 71 151)" />
  </g>
  <path d="M 69 190.5 Q 75 193 81 190.5 L 80.5 195 Q 75 196.3 69.5 195 Z" fill="#7d908d" stroke="#59645e" stroke-width="1.15" />
  <path
    d="M 66.5 105.5 Q 75 108 83.5 105.5 C 83 109.2 67 109.2 66.5 105.5 Z"
    fill="#f6f6f2"
    stroke="#59645e"
    stroke-width="1.45"
    stroke-linejoin="round"
  />
  <path d="M 68 106.2 Q 75 107.8 82 106.2" stroke="#ffffff" stroke-width="0.8" opacity="0.82" fill="none" />
</g>
`,
};
