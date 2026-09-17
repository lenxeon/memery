/**
 * @file MinimalDropSwanVase.tsx
 * @description 12. 现代极简水滴天鹅瓶 (现代器型)
 * 形制：极简纤颈水滴纯白留白，纤秀天鹅颈与圆润悬胆下腹。
 */
import { VaseItemDefinition } from '../types';

export const MinimalDropSwanVase: VaseItemDefinition = {
  id: 'minimal_drop_swan',
  name: '极简水滴天鹅瓶',
  category: 'minimalist',
  categoryLabel: '极简主义',
  sourceLabel: '参考图4左1/1左',
  shapeLabel: '极简天鹅纤颈水滴',
  desc: '包豪斯现代主义流线，修长纤细的天鹅颈自如过渡到饱满圆融的水滴腹，大美无饰。',
  tag: '水滴天鹅',
  iconText: '🦢',
  accentColor: '#64748b',
  borderColor: '#e2e8f0',

  mouthAperture: 'narrow',
  mouthWidth: 15,
  mouthCenter: { x: 75, y: 106.5 },
  vaseHeight: 88.5,
  spreadFactor: 0.72,

  renderMouthBack: () => `
<g id="mouth_back_minimal_drop">
      <ellipse cx="75" cy="106.5" rx="7.5" ry="2.2" fill="#140d07" />
      <path d="M 67.5 106.5 C 67.5 104.5, 82.5 104.5, 82.5 106.5" stroke="#2a1e14" stroke-width="1.6" fill="none" stroke-linecap="round" />
    </g>
`,

  renderBody: () => {
    const dropPath = `
      M 67.5 106.5
      Q 75 108.5 82.5 106.5
      C 81 114, 78 126, 78 138
      C 84 144, 94 156, 95 170
      C 96 178, 92 188, 87 192
      Q 75 194.5 63 192
      C 58 188, 54 178, 55 170
      C 56 156, 66 144, 72 138
      C 72 126, 69 114, 67.5 106.5
      Z
    `;

    return `
<g id="vase_minimal_drop_swan">
        <path
          d="${dropPath}"
          fill="url(#pureMatteWhiteGrad)"
          stroke="#2a1e14"
          stroke-width="1.8"
          stroke-linejoin="round"
        />

        <path d="M 73 110 Q 74 124 73 138" stroke="#ffffff" stroke-width="1.4" fill="none" opacity="0.85" />

        <path
          d="M 62 154 C 58 164, 58 175, 64 184 C 61 176, 60 164, 64 154 Z"
          fill="#ffffff"
          opacity="0.8"
        />
        <ellipse cx="66" cy="166" rx="6" ry="14" fill="#ffffff" opacity="0.5" transform="rotate(-15 66 166)" />

        <path d="M 63 192 Q 75 194.5 87 192 L 86.5 195 Q 75 197 63.5 195 Z" fill="#dfd5c5" stroke="#2a1e14" stroke-width="1.5" />

        <path
          d="M 67.5 106.5 Q 75 108.5 82.5 106.5 C 82.5 110, 67.5 110, 67.5 106.5 Z"
          fill="#ffffff"
          stroke="#2a1e14"
          stroke-width="1.6"
          stroke-linejoin="round"
        />
      </g>
`;
  },
};
