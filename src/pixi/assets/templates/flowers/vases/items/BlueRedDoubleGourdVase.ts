/**
 * @file BlueRedDoubleGourdVase.ts
 * @description 青花釉里红葫芦瓶神韵再设计：双葫芦束腰，钴蓝缠枝与铜红祥云相映。
 */
import { VaseItemDefinition } from '../types';

export const BlueRedDoubleGourdVase: VaseItemDefinition = {
  id: 'blue_red_double_gourd',
  name: '青花釉里红双生葫芦瓶',
  category: 'designer_modern',
  categoryLabel: '历史神韵',
  sourceLabel: '灵感 · 青花釉里红葫芦瓶',
  shapeLabel: '双葫芦束腰',
  desc: '双葫芦轮廓以纤细束腰相连，青白瓷胎上钴蓝缠枝与铜红祥云上下呼应。',
  tag: '青红双彩',
  iconText: '∞',
  accentColor: '#2457a6',
  borderColor: '#b34a43',

  mouthAperture: 'narrow',
  mouthWidth: 12,
  mouthCenter: { x: 75, y: 104.5 },
  vaseHeight: 90.5,
  spreadFactor: 0.72,

  renderMouthBack: () => `
<g id="mouth_back_blue_red_double_gourd">
  <ellipse cx="75" cy="104.5" rx="6" ry="2.15" fill="#17264a" />
  <path d="M 69 104.5 C 69 102.7, 81 102.7, 81 104.5" stroke="#28549a" stroke-width="1.35" fill="none" />
</g>
`,

  renderBody: () => `
<g id="vase_blue_red_double_gourd">
  <clipPath id="clipBlueRedDoubleGourd">
    <path d="M 69 104.5 Q 75 106.5 81 104.5 C 80 110 81 113 85 117 C 90 122 90 132 87 139 C 85 144 80 147 79 151 C 82 155 88 157 92 163 C 98 172 94 185 86 190 Q 75 194 64 190 C 56 185 52 172 58 163 C 62 157 68 155 71 151 C 70 147 65 144 63 139 C 60 132 60 122 65 117 C 69 113 70 110 69 104.5 Z" />
  </clipPath>
  <path d="M 69 104.5 Q 75 106.5 81 104.5 C 80 110 81 113 85 117 C 90 122 90 132 87 139 C 85 144 80 147 79 151 C 82 155 88 157 92 163 C 98 172 94 185 86 190 Q 75 194 64 190 C 56 185 52 172 58 163 C 62 157 68 155 71 151 C 70 147 65 144 63 139 C 60 132 60 122 65 117 C 69 113 70 110 69 104.5 Z" fill="url(#blueRedGourdPorcelainGrad)" stroke="#334f76" stroke-width="1.65" stroke-linejoin="round" />
  <g clip-path="url(#clipBlueRedDoubleGourd)">
    <path d="M 64 122 C 70 117 78 119 83 125 C 87 130 82 136 76 134 C 70 132 70 126 75 124" fill="none" stroke="#2457a6" stroke-width="1.35" stroke-linecap="round" />
    <path d="M 68 139 C 73 136 78 137 82 142" fill="none" stroke="#b34540" stroke-width="1.15" />
    <path d="M 60 171 C 67 162 79 160 88 167 C 95 173 88 180 82 176 C 76 172 80 166 85 168" fill="none" stroke="#2457a6" stroke-width="1.45" stroke-linecap="round" />
    <path d="M 62 182 C 69 175 79 176 88 184" fill="none" stroke="#b34540" stroke-width="1.25" />
    <path d="M 70 153 Q 75 156 80 153" stroke="#2457a6" stroke-width="1" fill="none" />
    <g fill="#b34540" opacity="0.88">
      <circle cx="66" cy="129" r="2.2" />
      <circle cx="83" cy="136" r="1.8" />
      <circle cx="69" cy="174" r="2.4" />
      <circle cx="87" cy="184" r="1.7" />
    </g>
    <path d="M 64 116 C 61 130 66 143 66 151 C 65 164 61 178 67 189" stroke="#ffffff" stroke-width="1.3" opacity="0.5" fill="none" />
  </g>
  <path d="M 64 189 Q 75 193 86 189 L 85 195 Q 75 196.5 65 195 Z" fill="#7f91a7" stroke="#334f76" stroke-width="1.15" />
  <path d="M 69 104.5 Q 75 106.5 81 104.5 C 81 107.3 69 107.3 69 104.5 Z" fill="#edf4f5" stroke="#334f76" stroke-width="1.35" />
  <path d="M 70.2 105 Q 75 106.2 79.8 105" stroke="#ffffff" stroke-width="0.7" opacity="0.78" fill="none" />
</g>
`,
};
