/** 唐长沙窑褐绿彩花鸟壶神韵花器：短流、弓柄、圆腹与釉下花鸟彩绘。 */
import { VaseItemDefinition } from '../types';

export const TangChangshaBirdEwerVase: VaseItemDefinition = {
  id: 'tang_changsha_bird_ewer', name: '唐长沙窑褐绿彩花鸟壶', category: 'sculptural_unique', categoryLabel: '唐风名器',
  sourceLabel: '神似 · 长沙窑青釉褐绿彩花鸟壶', shapeLabel: '短流弓柄圆腹彩绘',
  desc: '短流与弓柄拉开不对称侧影，青黄釉圆腹上以褐绿两彩勾勒折枝与飞鸟。',
  tag: '花鸟入釉', iconText: '鸟', accentColor: '#758e52', borderColor: '#d8bd73',
  mouthAperture: 'standard', mouthWidth: 20, mouthCenter: { x: 74, y: 109 }, vaseHeight: 86, spreadFactor: 1.0,

  renderMouthBack: () => `
<g id="mouth_back_tang_changsha_bird_ewer">
  <ellipse cx="74" cy="109" rx="10" ry="2.65" fill="#33281a"/>
  <path d="M64 109 C64.5 106 83.5 106 84 109" stroke="#c1af70" stroke-width="1.45" fill="none"/>
</g>`,

  renderBody: () => `
<g id="vase_tang_changsha_bird_ewer">
  <!-- 左短流、右弓柄均先于壶腹，形成清楚的不对称轮廓 -->
  <path d="M60 132 C51 126 41 126 33 132 L35 137 C45 134 53 137 61 143 Z" fill="url(#tangChangshaBodyGrad)" stroke="#584a2f" stroke-width="1.35"/>
  <path d="M35 132 L27 134 L35 138 Z" fill="#8e7948" stroke="#584a2f" stroke-width="1"/>
  <path d="M86 126 C105 127 111 144 107 160 C104 172 97 178 89 181" fill="none" stroke="#594c31" stroke-width="8" stroke-linecap="round"/>
  <path d="M86 126 C101 129 104 143 102 157 C100 166 95 172 90 175" fill="none" stroke="#d4c180" stroke-width="2.15" stroke-linecap="round" opacity="0.78"/>

  <clipPath id="clipTangChangshaBird"><path d="M64 109 Q74 112 84 109 L83 125 C94 133 99 146 98 162 C97 179 89 188 84 191 L88 195 L60 195 L64 191 C58 188 50 179 49 162 C48 146 53 133 65 125 Z"/></clipPath>
  <path d="M64 109 Q74 112 84 109 L83 125 C94 133 99 146 98 162 C97 179 89 188 84 191 L88 195 L60 195 L64 191 C58 188 50 179 49 162 C48 146 53 133 65 125 Z" fill="url(#tangChangshaBodyGrad)" stroke="#584a2f" stroke-width="1.6"/>
  <g clip-path="url(#clipTangChangshaBird)">
    <path d="M45 192 C54 166 67 140 103 117 L106 139 C81 154 70 178 66 199 Z" fill="url(#tangChangshaGlazeSheenGrad)" opacity="0.78"/>
    <path d="M58 129 C61 119 67 114 73 112" stroke="#fff3b3" stroke-width="1.55" opacity="0.72" fill="none" stroke-linecap="round"/>

    <!-- 褐绿釉下彩：一只回首飞鸟与两枝叶，不做满幅繁纹 -->
    <path d="M58 166 C66 157 76 153 87 156 C81 161 80 168 86 174 C75 173 68 169 63 166 C61 170 60 175 59 181" fill="#446f46" opacity="0.88" stroke="#624026" stroke-width="1.05" stroke-linejoin="round"/>
    <path d="M67 161 C72 152 77 147 84 144 C82 150 84 154 89 157 C81 158 75 160 67 161 Z" fill="#799651" stroke="#654124" stroke-width="0.9"/>
    <path d="M86 156 Q92 152 94 156 Q91 159 86 159" fill="#704327"/>
    <circle cx="86.2" cy="156.4" r="0.75" fill="#241a12"/>
    <path d="M60 181 C65 174 69 166 73 156 M59 177 Q53 173 52 168 M65 171 Q58 166 57 160 M71 160 Q65 155 65 150" stroke="#754a29" stroke-width="1.45" fill="none" stroke-linecap="round"/>
    <path d="M52 168 Q57 165 61 169 Q56 173 52 168 Z M57 160 Q62 157 66 161 Q62 165 57 160 Z M65 150 Q70 147 73 151 Q69 155 65 150 Z" fill="#4d7e4c" stroke="#654124" stroke-width="0.65"/>
  </g>
  <path d="M59 190 Q74 193 89 190 L90 195 Q74 198 58 195 Z" fill="#78663d" stroke="#584a2f" stroke-width="1.15"/>
  <path d="M64 109 Q74 112.3 84 109 L82 114 Q74 116 66 114 Z" fill="#a9955e" stroke="#584a2f" stroke-width="1.15"/>
  <path d="M65.5 109.3 Q74 111.4 82.5 109.3" stroke="#fff0a6" stroke-width="0.95" opacity="0.88" fill="none"/>
</g>`,
};
