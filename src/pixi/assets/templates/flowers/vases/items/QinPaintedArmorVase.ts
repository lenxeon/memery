/** 秦彩绘将军俑神韵花器：束领宽肩、鱼鳞甲、彩色花结与陶红残彩。 */
import { VaseItemDefinition } from '../types';

export const QinPaintedArmorVase: VaseItemDefinition = {
  id: 'qin_painted_armor', name: '秦彩绘铠甲俑瓶', category: 'sculptural_unique', categoryLabel: '秦制新生',
  sourceLabel: '神似 · 秦陵将军俑', shapeLabel: '束领宽肩鱼鳞甲',
  desc: '宽肩、束腰、鱼鳞甲片和彩色花结成为器身结构，陶红、玄黑、朱红与石青残彩交叠。',
  tag: '赳赳军阵', iconText: '甲', accentColor: '#a45635', borderColor: '#3f6570',
  mouthAperture: 'narrow', mouthWidth: 13, mouthCenter: { x: 75, y: 106 }, vaseHeight: 89, spreadFactor: 0.72,

  renderMouthBack: () => `
<g id="mouth_back_qin_painted_armor"><ellipse cx="75" cy="106" rx="6.5" ry="2.2" fill="#281a16"/><path d="M68.5 106 C68.5 104 81.5 104 81.5 106" stroke="#75432d" stroke-width="1.4" fill="none"/></g>`,

  renderBody: () => {
    const plates = Array.from({ length: 6 }, (_, row) =>
      Array.from({ length: 5 }, (_, col) => {
        const x = 61 + col * 5.6 + (row % 2 ? 2.8 : 0);
        const y = 136 + row * 7.2;
        return `<path d="M${x} ${y} h5 l-0.8 5 h-3.4 Z" fill="${(row + col) % 3 === 0 ? '#3e6873' : '#342b27'}" stroke="#c57b4b" stroke-width="0.45" opacity="0.9"/>`;
      }).join('')
    ).join('');
    return `
<g id="vase_qin_painted_armor">
  <clipPath id="clipQinPaintedArmor"><path d="M68.5 106 Q75 108 81.5 106 L82 119 Q92 123 96 132 L91 190 Q75 194 59 190 L54 132 Q58 123 68 119 Z"/></clipPath>
  <path d="M68.5 106 Q75 108 81.5 106 L82 119 Q92 123 96 132 L91 190 Q75 194 59 190 L54 132 Q58 123 68 119 Z" fill="url(#qinTerracottaArmorGrad)" stroke="#442820" stroke-width="1.7"/>
  <g clip-path="url(#clipQinPaintedArmor)">
    <path d="M54 132 Q75 143 96 132 L93 190 Q75 194 57 190 Z" fill="#272522" opacity="0.78"/>
    <path d="M54 185 C63 159 74 143 97 126 L98 146 C82 161 74 178 69 198 Z" fill="url(#qinTerracottaLacquerGrad)" opacity="0.9"/>
    ${plates}
    <path d="M58 130 Q75 139 92 130" stroke="#b74437" stroke-width="2.2" fill="none"/>
    <path d="M61 126 C65 122 69 126 67 130 C65 134 60 131 61 126 Z M89 126 C85 122 81 126 83 130 C85 134 90 131 89 126 Z" fill="#ba4034" stroke="#e0a05d" stroke-width="0.8"/>
    <path d="M71 132 L75 140 L79 132" stroke="#3d7180" stroke-width="1.4" fill="none"/>
    <path d="M58 181 Q75 187 92 181" stroke="#b74437" stroke-width="1.3" fill="none"/>
  </g>
  <path d="M59 188 Q75 193 91 188 L89 195 Q75 197 61 195 Z" fill="#5f3427" stroke="#442820" stroke-width="1.25"/>
  <path d="M68.5 106 Q75 108 81.5 106 C81.5 109 68.5 109 68.5 106 Z" fill="#b46543" stroke="#442820" stroke-width="1.35"/>
  <path d="M70 106.6 Q75 107.8 80 106.6" stroke="#ffd69a" stroke-width="0.9" opacity="0.9" fill="none"/>
</g>`;
  },
};
