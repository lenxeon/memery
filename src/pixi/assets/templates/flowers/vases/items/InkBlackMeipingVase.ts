/**
 * @file InkBlackMeipingVase.ts
 * @description 原创东方极简玄墨梅瓶：小口、高肩、敛腹，以蓝灰与茶金暗闪表现乌金窑变釉。
 */
import { VaseItemDefinition } from '../types';

export const InkBlackMeipingVase: VaseItemDefinition = {
  id: 'ink_black_meiping',
  name: '玄墨梅瓶',
  category: 'minimalist',
  categoryLabel: '东方极简',
  sourceLabel: '原创 · 东方极简',
  shapeLabel: '小口高肩敛腹',
  desc: '收窄梅瓶比例并抬高肩线，石墨乌金釉中流转蓝灰与茶金暗闪。',
  tag: '玄墨静影',
  iconText: '●',
  accentColor: '#343532',
  borderColor: '#7c7b75',

  mouthAperture: 'narrow',
  mouthWidth: 12,
  mouthCenter: { x: 75, y: 107 },
  vaseHeight: 88,
  spreadFactor: 0.72,

  renderMouthBack: () => `
<g id="mouth_back_ink_black_meiping">
  <ellipse cx="75" cy="107" rx="6" ry="2.15" fill="#020302" />
  <path d="M 69 107 C 69 105.1, 81 105.1, 81 107" stroke="#6d6c66" stroke-width="1.35" fill="none" stroke-linecap="round" />
</g>
`,

  renderBody: () => `
<g id="vase_ink_black_meiping">
  <clipPath id="clipInkBlackMeiping">
    <path d="M 69 107 Q 75 109 81 107 C 80.5 111.5 80.5 116 82 119.5 C 88 123 90.5 128.5 90 136 C 89.5 147 86.5 159 85 171 C 83.8 180 84.5 187.5 83 191 Q 75 193.5 67 191 C 65.5 187.5 66.2 180 65 171 C 63.5 159 60.5 147 60 136 C 59.5 128.5 62 123 68 119.5 C 69.5 116 69.5 111.5 69 107 Z" />
  </clipPath>
  <path
    d="M 69 107
       Q 75 109 81 107
       C 80.5 111.5 80.5 116 82 119.5
       C 88 123 90.5 128.5 90 136
       C 89.5 147 86.5 159 85 171
       C 83.8 180 84.5 187.5 83 191
       Q 75 193.5 67 191
       C 65.5 187.5 66.2 180 65 171
       C 63.5 159 60.5 147 60 136
       C 59.5 128.5 62 123 68 119.5
       C 69.5 116 69.5 111.5 69 107 Z"
    fill="url(#inkBlackMeipingGrad)"
    stroke="#020302"
    stroke-width="1.7"
    stroke-linejoin="round"
  />
  <g clip-path="url(#clipInkBlackMeiping)">
    <path d="M 56 174 C 67 152 76 139 94 124 L 95 143 C 81 155 72 173 65 196 Z" fill="url(#inkGoldSheenGrad)" opacity="0.88" />
    <path d="M 64 128 C 62.5 142 66.5 166 69 183" stroke="#a7c5cc" stroke-width="1.35" opacity="0.3" fill="none" stroke-linecap="round" />
    <path d="M 84.5 127 C 88 143 83.5 169 81.2 184" stroke="#000000" stroke-width="1.05" opacity="0.58" fill="none" stroke-linecap="round" />
    <path d="M 63 151 Q 75 146 87 151" stroke="#caa66d" stroke-width="0.55" opacity="0.22" fill="none" />
  </g>
  <path d="M 67 190.5 Q 75 193 83 190.5 L 82 195 Q 75 196.2 68 195 Z" fill="#050605" stroke="#000000" stroke-width="1.25" />
  <path
    d="M 69 107 Q 75 109 81 107 C 81 110 69 110 69 107 Z"
    fill="#353632"
    stroke="#020302"
    stroke-width="1.4"
    stroke-linejoin="round"
  />
  <path d="M 70.2 107.6 Q 75 108.8 79.8 107.6" stroke="#a6a49d" stroke-width="0.7" opacity="0.54" fill="none" />
</g>
`,
};
