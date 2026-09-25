/** 西周利簋神韵花器：侈口鼓腹、双兽耳垂珥与方形底座。 */
import { VaseItemDefinition } from '../types';

export const WesternZhouLiGuiVase: VaseItemDefinition = {
  id: 'western_zhou_li_gui', name: '克商利簋方座花器', category: 'sculptural_unique', categoryLabel: '西周重器',
  sourceLabel: '神似 · 西周利簋', shapeLabel: '侈口鼓腹双兽耳方座',
  desc: '侈口鼓腹、双兽耳垂珥和方形底座，云雷地纹与青金锈色表现庄重礼制。',
  tag: '克商之证', iconText: '簋', accentColor: '#557c6c', borderColor: '#b28a4f',
  mouthAperture: 'wide', mouthWidth: 32, mouthCenter: { x: 75, y: 112 }, vaseHeight: 83, spreadFactor: 1.25,

  renderMouthBack: () => `
<g id="mouth_back_western_zhou_li_gui"><ellipse cx="75" cy="112" rx="16" ry="3.3" fill="#151411"/><path d="M59 112 C60 108.8 90 108.8 91 112" stroke="#9d7845" stroke-width="1.6" fill="none"/></g>`,

  renderBody: () => `
<g id="vase_western_zhou_li_gui">
  <path d="M60 125 C50 120 45 127 47 136 C48 143 53 147 59 144 L59 140 C54 143 51 138 51 134 C51 129 54 128 61 132 Z" fill="url(#westernZhouBronzeGrad)" stroke="#2c2119" stroke-width="1.4"/>
  <path d="M90 125 C100 120 105 127 103 136 C102 143 97 147 91 144 L91 140 C96 143 99 138 99 134 C99 129 96 128 89 132 Z" fill="url(#westernZhouBronzeGrad)" stroke="#2c2119" stroke-width="1.4"/>
  <path d="M55 143 L51 151 L57 149 L60 143 M95 143 L99 151 L93 149 L90 143" fill="#6e5030" stroke="#2c2119" stroke-width="1"/>
  <clipPath id="clipWesternZhouLiGui"><path d="M59 112 Q75 115 91 112 C91 129 89 143 84 153 Q75 160 66 153 C61 143 59 129 59 112 Z M66 153 L84 153 L91 188 L88 195 L62 195 L59 188 Z"/></clipPath>
  <path d="M59 112 Q75 115 91 112 C91 129 89 143 84 153 Q75 160 66 153 C61 143 59 129 59 112 Z" fill="url(#westernZhouBronzeGrad)" stroke="#2c2119" stroke-width="1.75"/>
  <path d="M66 153 L84 153 L91 188 L88 195 L62 195 L59 188 Z" fill="url(#westernZhouBronzeGrad)" stroke="#2c2119" stroke-width="1.65" stroke-linejoin="round"/>
  <g clip-path="url(#clipWesternZhouLiGui)">
    <path d="M54 183 C64 161 78 143 95 129" stroke="#75ddca" stroke-width="6" opacity="0.34" fill="none"/>
    <path d="M53 184 C64 161 75 148 96 129 L97 144 C81 158 73 174 68 198 Z" fill="url(#westernZhouSpecularGrad)" opacity="0.86"/>
    <path d="M63 130 Q68 122 75 130 Q82 122 87 130 Q82 138 75 134 Q68 138 63 130 Z" fill="#233c37" stroke="#be9352" stroke-width="0.9"/>
    <circle cx="70" cy="130" r="1.2" fill="#63c7b6"/><circle cx="80" cy="130" r="1.2" fill="#63c7b6"/>
    <path d="M64 145 C69 139 81 139 86 145" stroke="#c39c5c" stroke-width="1" fill="none"/>
    <path d="M64 166 L86 166 M62 180 L88 180" stroke="#6ab1a2" stroke-width="0.85" opacity="0.62"/>
    <path d="M69 158 L66 188 M81 158 L84 188" stroke="#c29a57" stroke-width="0.8" opacity="0.58"/>
  </g>
  <path d="M58 187 L92 187 L90 195 L60 195 Z" fill="#6b4e31" stroke="#2c2119" stroke-width="1.35"/>
  <path d="M59 112 Q75 115 91 112 C90 116 60 116 59 112 Z" fill="#8e6a3c" stroke="#2c2119" stroke-width="1.45"/>
  <path d="M61 112.7 Q75 114.7 89 112.7" stroke="#ffe9a8" stroke-width="0.95" opacity="0.92" fill="none"/>
</g>`,
};
