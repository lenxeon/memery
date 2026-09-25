/** 秦陵青铜鹤神韵花器：鹤背开口、长曲颈、尖喙、层羽、细足与白色残彩。 */
import { VaseItemDefinition } from '../types';

export const QinBronzeCraneVase: VaseItemDefinition = {
  id: 'qin_bronze_crane', name: '秦陵青铜鹤曲颈瓶', category: 'sculptural_unique', categoryLabel: '秦制新生',
  sourceLabel: '神似 · 秦陵青铜鹤', shapeLabel: '鹤背方口长曲颈',
  desc: '鹤背开口承花，长曲颈、尖喙、层叠羽翼和细足形成宫苑水禽般的灵动侧影。',
  tag: '苑囿仙禽', iconText: '鹤', accentColor: '#6f9088', borderColor: '#d7d8ca',
  mouthAperture: 'standard', mouthWidth: 17, mouthCenter: { x: 72, y: 117 }, vaseHeight: 78, spreadFactor: 1.0,

  renderMouthBack: () => `
<g id="mouth_back_qin_bronze_crane"><ellipse cx="72" cy="117" rx="8.5" ry="2.4" fill="#18201d"/><path d="M63.5 117 C64 114.8 80 114.8 80.5 117" stroke="#748c84" stroke-width="1.35" fill="none"/></g>`,

  renderBody: () => `
<g id="vase_qin_bronze_crane">
  <path d="M86 139 C94 128 95 114 91 105 C88 98 91 91 98 91 C105 91 108 97 105 102 C102 107 98 104 97 100" fill="none" stroke="url(#qinImperialBronzeGrad)" stroke-width="7" stroke-linecap="round"/>
  <path d="M88 137 C95 126 95 114 92 105 C90 99 92 94 97 93" fill="none" stroke="#d9f0e6" stroke-width="1.25" opacity="0.66" stroke-linecap="round"/>
  <path d="M103 94 L116 91 L106 99 Z" fill="#9e7c49" stroke="#28231c" stroke-width="1.1"/>
  <circle cx="100" cy="94" r="1.2" fill="#111"/><circle cx="100.3" cy="93.7" r="0.4" fill="#eee5c7"/>
  <path d="M57 132 C66 119 83 119 91 132 C97 142 94 158 86 166 C77 174 60 171 54 160 C49 150 51 140 57 132 Z" fill="url(#qinImperialBronzeGrad)" stroke="#2d2820" stroke-width="1.7"/>
  <path d="M53 159 C60 139 72 125 94 126 C84 139 79 153 74 171 C65 172 57 168 53 159 Z" fill="url(#qinPolychromeSheenGrad)" opacity="0.74"/>
  <path d="M58 139 C67 130 81 132 88 140 C82 143 77 147 73 157 C68 151 63 146 58 139 Z" fill="#d7d8ca" opacity="0.66" stroke="#4f6f67" stroke-width="1"/>
  <path d="M60 143 Q72 137 85 142 M62 149 Q72 144 82 149 M66 155 Q73 151 79 155" stroke="#356f68" stroke-width="0.85" fill="none" opacity="0.78"/>
  <path d="M63 165 L62 190 M82 166 L84 190" stroke="#4c5f58" stroke-width="3" stroke-linecap="round"/>
  <path d="M57 190 L67 190 M79 190 L89 190" stroke="#7f8f88" stroke-width="2" stroke-linecap="round"/>
  <path d="M52 193 Q75 188 95 193 L91 196 L55 196 Z" fill="#33423d" stroke="#242c29" stroke-width="1.2" opacity="0.9"/>
  <path d="M63.5 117 Q72 119.5 80.5 117 C80 121 64 121 63.5 117 Z" fill="#789087" stroke="#2d2820" stroke-width="1.35"/>
  <path d="M56 134 C61 128 67 126 73 126" stroke="#fff9dc" stroke-width="1.5" opacity="0.72" fill="none" stroke-linecap="round"/>
</g>`,
};
