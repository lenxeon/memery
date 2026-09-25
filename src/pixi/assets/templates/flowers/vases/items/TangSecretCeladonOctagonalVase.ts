/** 唐越窑秘色瓷八棱净瓶神韵花器：纤口长颈、八棱腹与湖青秘色折光。 */
import { VaseItemDefinition } from '../types';

export const TangSecretCeladonOctagonalVase: VaseItemDefinition = {
  id: 'tang_secret_celadon_octagonal', name: '唐越窑秘色八棱净瓶', category: 'minimalist', categoryLabel: '唐风名器',
  sourceLabel: '神似 · 法门寺秘色瓷八棱净瓶', shapeLabel: '小口长颈八棱腹',
  desc: '纤小口沿、长颈与八棱腹构成清峻净瓶，湖青秘色釉在棱面间浮动如水。',
  tag: '千峰秘色', iconText: '秘', accentColor: '#6ca897', borderColor: '#d8e4bf',
  mouthAperture: 'narrow', mouthWidth: 11, mouthCenter: { x: 75, y: 103.5 }, vaseHeight: 91.5, spreadFactor: 0.72,

  renderMouthBack: () => `
<g id="mouth_back_tang_secret_celadon_octagonal">
  <ellipse cx="75" cy="103.5" rx="5.5" ry="1.95" fill="#16302b"/>
  <path d="M69.5 103.5 C70 101.4 80 101.4 80.5 103.5" stroke="#a8c6aa" stroke-width="1.25" fill="none"/>
</g>`,

  renderBody: () => `
<g id="vase_tang_secret_celadon_octagonal">
  <clipPath id="clipTangSecretOctagonal"><path d="M69.5 103.5 Q75 105.6 80.5 103.5 L80 126 L87 135 L94 165 L88 190 L84 195 L66 195 L62 190 L56 165 L63 135 L70 126 Z"/></clipPath>
  <path d="M69.5 103.5 Q75 105.6 80.5 103.5 L80 126 L87 135 L94 165 L88 190 L84 195 L66 195 L62 190 L56 165 L63 135 L70 126 Z" fill="url(#tangSecretCeladonGrad)" stroke="#254b44" stroke-width="1.55" stroke-linejoin="round"/>
  <g clip-path="url(#clipTangSecretOctagonal)">
    <path d="M53 191 C60 166 70 139 95 116 L102 136 C81 153 72 177 69 199 Z" fill="url(#tangSecretSheenGrad)" opacity="0.9"/>
    <path d="M67 106 L66 128 L59 138 L56 165 L63 190 L68 195 L72 134 L72 105 Z" fill="#75a18e" opacity="0.34"/>
    <path d="M72 104 L72 134 L68 195 L75 198 L75 105 Z" fill="#e4e2b4" opacity="0.26"/>
    <path d="M78 104 L78 132 L82 195 L88 190 L93 165 L86 136 L80 126 Z" fill="#315f57" opacity="0.34"/>
    <path d="M65 127 C66 114 68 108 72 106" stroke="#fff8c5" stroke-width="1.55" opacity="0.78" fill="none" stroke-linecap="round"/>
  </g>
  <!-- 八条棱线仅用明暗塑形，不以重纹破坏秘色留白 -->
  <path d="M70 126 L63 135 L56 165 L62 190 L66 195 M72 132 L68 195 M78 132 L82 195 M80 126 L87 135 L94 165 L88 190 L84 195" stroke="#bad1ac" stroke-width="0.72" opacity="0.56" fill="none"/>
  <path d="M62 190 Q75 193 88 190 L89 195 Q75 198 61 195 Z" fill="#4e796d" stroke="#254b44" stroke-width="1.1"/>
  <path d="M69.5 103.5 Q75 105.9 80.5 103.5 C80 106.7 70 106.7 69.5 103.5 Z" fill="#719b89" stroke="#254b44" stroke-width="1.05"/>
  <path d="M70.5 103.8 Q75 105.1 79.5 103.8" stroke="#fff8bf" stroke-width="0.78" opacity="0.95" fill="none"/>
</g>`,
};
