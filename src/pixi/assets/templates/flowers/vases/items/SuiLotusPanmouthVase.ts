/** 隋青釉莲瓣纹四系盘口瓶神韵花器：盘口、四系、长腹与刻莲流釉。 */
import { VaseItemDefinition } from '../types';

export const SuiLotusPanmouthVase: VaseItemDefinition = {
  id: 'sui_lotus_panmouth', name: '隋碧釉莲瓣四系盘口瓶', category: 'sculptural_unique', categoryLabel: '隋韵新生',
  sourceLabel: '神似 · 青釉莲瓣纹四系盘口瓶', shapeLabel: '盘口四系长腹莲瓣',
  desc: '平展盘口、溜肩长腹、四系与重瓣莲纹，以青碧玻璃釉和自然淌釉重构。',
  tag: '碧釉莲影', iconText: '莲', accentColor: '#4d9284', borderColor: '#bad9c7',
  mouthAperture: 'wide', mouthWidth: 28, mouthCenter: { x: 75, y: 104.5 }, vaseHeight: 90.5, spreadFactor: 1.25,

  renderMouthBack: () => `
<g id="mouth_back_sui_lotus_panmouth">
  <ellipse cx="75" cy="104.5" rx="14" ry="3.15" fill="#142925"/>
  <path d="M61 104.5 C62 100.8 88 100.8 89 104.5" stroke="#9fc4ad" stroke-width="1.6" fill="none"/>
</g>`,

  renderBody: () => `
<g id="vase_sui_lotus_panmouth">
  <!-- 肩部四系：正面两系清晰、背面两系含蓄显影 -->
  <path d="M60 127 C48 124 47 137 58 139 M90 127 C102 124 103 137 92 139" stroke="#315f57" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.72"/>
  <path d="M62 128 C53 127 53 135 60 136 M88 128 C97 127 97 135 90 136" stroke="#b8d6bd" stroke-width="1.4" fill="none" opacity="0.8"/>
  <clipPath id="clipSuiLotusPanmouth"><path d="M61 104.5 Q75 108 89 104.5 L85 111 L84 124 C96 131 101 148 98 166 C96 181 89 190 85 192 L89 195 L61 195 L65 192 C61 190 54 181 52 166 C49 148 54 131 66 124 L65 111 Z"/></clipPath>
  <path d="M61 104.5 Q75 108 89 104.5 L85 111 L84 124 C96 131 101 148 98 166 C96 181 89 190 85 192 L89 195 L61 195 L65 192 C61 190 54 181 52 166 C49 148 54 131 66 124 L65 111 Z" fill="url(#suiCeladonFlowGrad)" stroke="#1f3e39" stroke-width="1.75" stroke-linejoin="round"/>
  <g clip-path="url(#clipSuiLotusPanmouth)">
    <path d="M48 192 C55 168 67 140 98 116 L104 137 C79 152 69 177 64 199 Z" fill="url(#suiCeladonKilnSheenGrad)" opacity="0.88"/>
    <path d="M58 116 C60 110 67 108 72 108" stroke="#f7f1bd" stroke-width="1.8" opacity="0.8" fill="none" stroke-linecap="round"/>
    <path d="M57 132 C61 139 59 148 62 155 C65 162 62 172 64 181 M72 125 C76 136 73 145 76 154 C79 163 77 175 79 190 M88 128 C91 139 88 149 91 159 C94 169 90 180 89 188" stroke="#d8e8bd" stroke-width="1.15" opacity="0.43" fill="none" stroke-linecap="round"/>
    <path d="M60 155 Q67 143 75 158 Q83 143 91 155 Q88 176 75 190 Q62 176 60 155 Z" fill="#2b7569" opacity="0.2"/>
    <path d="M58 158 Q65 145 75 160 Q85 145 92 158 M61 166 Q68 153 75 165 Q82 153 89 166 M65 175 Q70 164 75 173 Q80 164 85 175" stroke="#e6db9f" stroke-width="1.05" opacity="0.92" fill="none"/>
    <path d="M55 147 L60 143 L64 146 M88 145 L92 142 L96 147" stroke="#82c9b6" stroke-width="0.7" opacity="0.48" fill="none"/>
  </g>
  <path d="M61 190 Q75 193 89 190 L91 195 Q75 198 59 195 Z" fill="#315e56" stroke="#1f3e39" stroke-width="1.25"/>
  <path d="M61 104.5 Q75 108 89 104.5 L87 110 Q75 113 63 110 Z" fill="#5d9281" stroke="#1f3e39" stroke-width="1.35"/>
  <path d="M63 104.8 Q75 107.2 87 104.8" stroke="#fff1ae" stroke-width="1.15" opacity="0.92" fill="none"/>
</g>`,
};
