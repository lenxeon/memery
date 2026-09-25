/** 西周何尊神韵花器：圆口棱方体、四扉棱、高圈足与兽面纹。 */
import { VaseItemDefinition } from '../types';

export const WesternZhouHeZunVase: VaseItemDefinition = {
  id: 'western_zhou_he_zun', name: '宅兹中国何尊花器', category: 'sculptural_unique', categoryLabel: '西周重器',
  sourceLabel: '神似 · 西周何尊', shapeLabel: '圆口方体四扉棱',
  desc: '圆口棱方体、高圈足、四扉棱与兽面纹，以青铜锈色和“中国”铭文意象重构。',
  tag: '宅兹中国', iconText: '中', accentColor: '#3f7f70', borderColor: '#c59a55',
  mouthAperture: 'wide', mouthWidth: 30, mouthCenter: { x: 75, y: 104.5 }, vaseHeight: 90.5, spreadFactor: 1.25,

  renderMouthBack: () => `
<g id="mouth_back_western_zhou_he_zun">
  <ellipse cx="75" cy="104.5" rx="15" ry="3.2" fill="#151411" />
  <path d="M 60 104.5 C 61 101.2, 89 101.2, 90 104.5" stroke="#9f7944" stroke-width="1.6" fill="none" />
</g>`,

  renderBody: () => `
<g id="vase_western_zhou_he_zun">
  <clipPath id="clipWesternZhouHeZun"><path d="M60 104.5 Q75 107.5 90 104.5 C86 115 84 122 85 129 L92 139 L89 181 L85 190 L90 195 L60 195 L65 190 L61 181 L58 139 L65 129 C66 122 64 115 60 104.5 Z"/></clipPath>
  <path d="M60 104.5 Q75 107.5 90 104.5 C86 115 84 122 85 129 L92 139 L89 181 L85 190 L90 195 L60 195 L65 190 L61 181 L58 139 L65 129 C66 122 64 115 60 104.5 Z" fill="url(#westernZhouBronzeGrad)" stroke="#2b211a" stroke-width="1.8" stroke-linejoin="round"/>
  <g clip-path="url(#clipWesternZhouHeZun)">
    <path d="M54 187 C64 163 71 148 96 124 L98 148 C83 159 75 176 69 198 Z" fill="url(#zhouVerdigrisBloomGrad)" opacity="0.98"/>
    <path d="M54 176 C64 157 75 143 96 127 L96 143 C80 155 71 174 66 196 Z" fill="url(#westernZhouSpecularGrad)" opacity="0.9"/>
    <path d="M65 118 C68 113 72 111 75 111" stroke="#fff0bd" stroke-width="1.5" opacity="0.72" fill="none" stroke-linecap="round"/>
    <path d="M58 139 L64 143 L64 180 L60 181 M92 139 L86 143 L86 180 L90 181" stroke="#c39a56" stroke-width="1.2" fill="none" opacity="0.72"/>
    <path d="M64 146 Q69 137 75 145 Q81 137 86 146 Q82 153 75 151 Q68 153 64 146 Z" fill="#273b35" stroke="#b98b4b" stroke-width="1"/>
    <circle cx="70" cy="146.5" r="1.4" fill="#5bd0bd"/><circle cx="80" cy="146.5" r="1.4" fill="#5bd0bd"/>
    <path d="M75 151 L75 165 M69 158 L81 158 M69 153 L69 166 L81 166 L81 153" stroke="#d0ad68" stroke-width="0.9" fill="none" opacity="0.86"/>
    <path d="M62 174 Q75 168 88 174" stroke="#56a99a" stroke-width="1.2" fill="none" opacity="0.7"/>
  </g>
  <path d="M56.5 137 L60 134 L62 183 L58 180 Z M93.5 137 L90 134 L88 183 L92 180 Z" fill="#6e5131" stroke="#2b211a" stroke-width="0.9"/>
  <path d="M61 189 L89 189 L92 195 L58 195 Z" fill="#6f5130" stroke="#2b211a" stroke-width="1.35"/>
  <path d="M60 104.5 Q75 107.5 90 104.5 C89 108.5 61 108.5 60 104.5 Z" fill="#987244" stroke="#2b211a" stroke-width="1.45"/>
  <path d="M62 105.2 Q75 107.3 88 105.2" stroke="#fff0b0" stroke-width="1" opacity="0.96" fill="none"/>
</g>`,
};
