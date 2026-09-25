/** 西周象尊神韵花器：象背方口、肥硕器身、上扬长鼻、凤鸟与云雷纹。 */
import { VaseItemDefinition } from '../types';

export const WesternZhouElephantVase: VaseItemDefinition = {
  id: 'western_zhou_elephant', name: '西周凤鸟纹象尊花器', category: 'sculptural_unique', categoryLabel: '西周重器',
  sourceLabel: '神似 · 西周象尊', shapeLabel: '象形方背口上扬长鼻',
  desc: '象背方口承花，上扬中空长鼻、肥硕器身与短柱足保留象尊鲜明生命感。',
  tag: '凤鸟象尊', iconText: '象', accentColor: '#3e867a', borderColor: '#bb8d4e',
  mouthAperture: 'standard', mouthWidth: 18, mouthCenter: { x: 71, y: 116 }, vaseHeight: 79, spreadFactor: 1.0,

  renderMouthBack: () => `
<g id="mouth_back_western_zhou_elephant"><path d="M62 116 L66 113 L78 113 L81 116 L77 119 L66 119 Z" fill="#151411" stroke="#9d7845" stroke-width="1.35"/></g>`,

  renderBody: () => `
<g id="vase_western_zhou_elephant">
  <path d="M87 135 C95 129 101 131 104 137 C109 146 107 156 111 161 C113 164 116 163 118 160 C118 169 111 174 105 170 C98 165 101 151 97 145 C94 140 90 142 86 146 Z" fill="url(#westernZhouBronzeGrad)" stroke="#2b211a" stroke-width="1.6"/>
  <path d="M91 130 Q99 124 103 132 Q98 139 90 138 Z" fill="#6d5234" stroke="#2b211a" stroke-width="1.3"/>
  <path d="M57 133 C63 120 79 118 91 127 C99 133 101 149 96 163 C93 171 86 176 63 174 C52 173 47 163 48 150 C49 142 52 136 57 133 Z" fill="url(#westernZhouBronzeGrad)" stroke="#2b211a" stroke-width="1.75"/>
  <path d="M54 165 C61 143 72 127 96 126 C87 137 79 151 72 174 C64 175 58 171 54 165 Z" fill="url(#westernZhouSpecularGrad)" opacity="0.78"/>
  <path d="M56 168 L57 191 Q60 195 64 191 L67 172 M82 173 L84 192 Q87 195 90 191 L92 165" fill="url(#westernZhouBronzeGrad)" stroke="#2b211a" stroke-width="5" stroke-linecap="round"/>
  <path d="M64 130 Q72 122 80 130 L79 143 Q72 150 65 143 Z" fill="#2c5e57" stroke="#b48b4d" stroke-width="1.1"/>
  <circle cx="94" cy="136" r="1.7" fill="#111"/><circle cx="94.3" cy="135.6" r="0.55" fill="#d5c27f"/>
  <path d="M58 151 C65 141 74 143 78 151 C82 159 88 158 94 151" fill="none" stroke="#d0a45d" stroke-width="1.1"/>
  <path d="M55 161 Q65 154 73 163 Q80 151 91 160" fill="none" stroke="#54b0a0" stroke-width="1.3"/>
  <path d="M52 143 C60 149 60 160 56 168" stroke="#a8f1e2" stroke-width="1.4" opacity="0.62" fill="none"/>
  <path d="M61 128 C66 124 72 123 77 124" stroke="#fff0bd" stroke-width="1.25" opacity="0.8" fill="none" stroke-linecap="round"/>
  <path d="M62 116 L81 116 L79 121 L64 121 Z" fill="#87643b" stroke="#2b211a" stroke-width="1.35"/>
  <path d="M64 116.7 L79 116.7" stroke="#ffefae" stroke-width="0.95" opacity="0.95"/>
</g>`,
};
