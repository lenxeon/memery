/** 隋白瓷鸡首壶神韵花器：细口长颈、鸡首流、高曲柄与桥形系。 */
import { VaseItemDefinition } from '../types';

export const SuiWhiteChickenHeadVase: VaseItemDefinition = {
  id: 'sui_white_chicken_head', name: '隋凝脂白瓷鸡首壶', category: 'sculptural_unique', categoryLabel: '隋韵新生',
  sourceLabel: '神似 · 隋白瓷鸡首壶', shapeLabel: '鸡首流桥系曲柄',
  desc: '细颈丰肩梨腹配鸡首流与高曲柄，乳白釉浮现淡青冰裂和柔亮虹光。',
  tag: '鸡首凝光', iconText: '鸣', accentColor: '#dce8e2', borderColor: '#fff5df',
  mouthAperture: 'narrow', mouthWidth: 13, mouthCenter: { x: 75, y: 105.5 }, vaseHeight: 89.5, spreadFactor: 0.72,

  renderMouthBack: () => `
<g id="mouth_back_sui_white_chicken_head">
  <ellipse cx="75" cy="105.5" rx="6.5" ry="2.15" fill="#253530"/>
  <path d="M68.5 105.5 C69 103.2 81 103.2 81.5 105.5" stroke="#d8e7df" stroke-width="1.35" fill="none"/>
</g>`,

  renderBody: () => `
<g id="vase_sui_white_chicken_head">
  <!-- 高曲柄置后，外缘深、内缘亮，建立白瓷厚度 -->
  <path d="M85 122 C101 124 104 139 101 153 C99 163 94 169 88 171" fill="none" stroke="#627a74" stroke-width="7" stroke-linecap="round"/>
  <path d="M85 122 C98 126 99 139 97 152 C96 159 92 164 88 167" fill="none" stroke="#eaf2e9" stroke-width="3.6" stroke-linecap="round"/>

  <!-- 鸡首流：冠、眼、喙保留动物辨识度，但压低装饰复杂度 -->
  <path d="M62 127 C55 120 46 121 43 127 C41 132 46 136 52 134 C57 132 60 132 64 135 Z" fill="url(#suiMoonWhitePorcelainGrad)" stroke="#566e68" stroke-width="1.4"/>
  <path d="M48 123 Q45 118 49 116 Q52 119 53 123 Q55 117 58 120 L57 126 Z" fill="#d8e5dc" stroke="#647b75" stroke-width="0.9"/>
  <path d="M43 127 L34 131 L44 133 Z" fill="#d5b673" stroke="#665c48" stroke-width="1"/>
  <circle cx="48.8" cy="127.2" r="1.25" fill="#1f2926"/><circle cx="49.1" cy="126.8" r="0.38" fill="#fff9d9"/>

  <!-- 桥形系 -->
  <path d="M57 138 C51 136 49 144 55 147" stroke="#6e8680" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M93 137 C99 136 101 144 95 147" stroke="#6e8680" stroke-width="4" fill="none" stroke-linecap="round"/>

  <clipPath id="clipSuiWhiteChickenHead"><path d="M68.5 105.5 Q75 107.8 81.5 105.5 L81 123 C87 128 94 137 96 151 C99 170 91 187 84 191 L88 195 L62 195 L66 191 C59 187 51 170 54 151 C56 137 63 128 69 123 Z"/></clipPath>
  <path d="M68.5 105.5 Q75 107.8 81.5 105.5 L81 123 C87 128 94 137 96 151 C99 170 91 187 84 191 L88 195 L62 195 L66 191 C59 187 51 170 54 151 C56 137 63 128 69 123 Z" fill="url(#suiMoonWhitePorcelainGrad)" stroke="#526a64" stroke-width="1.65"/>
  <g clip-path="url(#clipSuiWhiteChickenHead)">
    <path d="M49 191 C57 165 68 141 97 115 L102 136 C80 153 72 177 68 199 Z" fill="url(#suiPorcelainIridescenceGrad)" opacity="0.83"/>
    <path d="M65 119 C66 112 69 109 74 108 M61 141 C64 132 68 128 72 127" stroke="#fffef0" stroke-width="2" opacity="0.88" fill="none" stroke-linecap="round"/>
    <path d="M61 158 Q67 152 72 158 T84 157 M58 172 Q63 166 69 172 T81 170 T92 171 M66 184 Q72 178 78 184 T88 182" stroke="#84a8a1" stroke-width="0.58" opacity="0.38" fill="none"/>
  </g>
  <path d="M62 190 Q75 193 88 190 L90 195 Q75 198 60 195 Z" fill="#b3c2bc" stroke="#526a64" stroke-width="1.2"/>
  <!-- 前唇最后覆盖枝脚 -->
  <path d="M68.5 105.5 Q75 108.2 81.5 105.5 C81 109.2 69 109.2 68.5 105.5 Z" fill="#dae6df" stroke="#526a64" stroke-width="1.15"/>
  <path d="M69.7 105.8 Q75 107.3 80.3 105.8" stroke="#fffdef" stroke-width="0.9" opacity="0.98" fill="none"/>
</g>`,
};
