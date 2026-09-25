/** 秦陵铜车马神韵花器：伞盖、中轴、方舆、双轮与金银彩绘构件。 */
import { VaseItemDefinition } from '../types';

export const QinChariotCanopyVase: VaseItemDefinition = {
  id: 'qin_chariot_canopy', name: '秦陵铜车马伞盖瓶', category: 'sculptural_unique', categoryLabel: '秦制新生',
  sourceLabel: '神似 · 秦陵彩绘铜车马', shapeLabel: '伞盖中轴方舆双轮',
  desc: '伞盖、中轴、方舆与双轮压缩为机械感花器，青铜胎上保留金银饰和朱蓝残彩。',
  tag: '青铜之冠', iconText: '车', accentColor: '#387a72', borderColor: '#cfaa66',
  mouthAperture: 'standard', mouthWidth: 14, mouthCenter: { x: 75, y: 104.5 }, vaseHeight: 90.5, spreadFactor: 1.0,

  renderMouthBack: () => `
<g id="mouth_back_qin_chariot_canopy"><ellipse cx="75" cy="104.5" rx="7" ry="2.2" fill="#151614"/><path d="M68 104.5 C68 102.5 82 102.5 82 104.5" stroke="#9e7e4b" stroke-width="1.4" fill="none"/></g>`,

  renderBody: () => `
<g id="vase_qin_chariot_canopy">
  <circle cx="53" cy="172" r="13" fill="#37675f" stroke="#d1ac68" stroke-width="1.7"/><circle cx="53" cy="172" r="4" fill="#e2bd75"/><path d="M53 159 V185 M40 172 H66 M44 163 L62 181 M62 163 L44 181" stroke="#f0d28e" stroke-width="0.85" opacity="0.88"/>
  <circle cx="97" cy="172" r="13" fill="#37675f" stroke="#d1ac68" stroke-width="1.7"/><circle cx="97" cy="172" r="4" fill="#e2bd75"/><path d="M97 159 V185 M84 172 H110 M88 163 L106 181 M106 163 L88 181" stroke="#f0d28e" stroke-width="0.85" opacity="0.88"/>
  <path d="M68 104.5 Q75 106.5 82 104.5 L80 124 L91 129 Q98 133 102 139 Q75 148 48 139 Q52 133 59 129 L70 124 Z" fill="url(#qinImperialBronzeGrad)" stroke="#2d261d" stroke-width="1.7" stroke-linejoin="round"/>
  <path d="M52 137 Q61 129 70 125 L80 124 Q91 128 98 137 Q77 143 52 137 Z" fill="url(#qinPolychromeSheenGrad)" opacity="0.78"/>
  <path d="M49 138 Q75 145 101 138 L98 144 Q75 151 52 144 Z" fill="url(#qinSilverGoldGrad)" stroke="#2d261d" stroke-width="1.2"/>
  <path d="M69 143 L81 143 L88 184 L84 191 L66 191 L62 184 Z" fill="url(#qinImperialBronzeGrad)" stroke="#2d261d" stroke-width="1.65"/>
  <path d="M63 182 C67 164 73 151 86 143 L88 158 C80 168 76 180 73 191 Z" fill="url(#qinPolychromeSheenGrad)" opacity="0.72"/>
  <path d="M65 154 L85 154 M64 165 L86 165 M63 177 L87 177" stroke="#d0aa68" stroke-width="0.8" opacity="0.72"/>
  <path d="M68 148 L66 187" stroke="#5bc1af" stroke-width="1" opacity="0.34"/><path d="M82 148 L84 187" stroke="#c44739" stroke-width="1.1" opacity="0.48"/>
  <path d="M61 184 L89 184 L91 194 L59 194 Z" fill="#4c3a2a" stroke="#2d261d" stroke-width="1.35"/>
  <path d="M68 104.5 Q75 106.5 82 104.5 C82 107.4 68 107.4 68 104.5 Z" fill="#a28250" stroke="#2d261d" stroke-width="1.35"/>
  <path d="M75 108 L75 138" stroke="#fff7cf" stroke-width="1.35" opacity="0.9"/>
  <path d="M53 137 Q75 144 97 137" stroke="#fff0ae" stroke-width="1" opacity="0.86" fill="none"/>
</g>`,
};
