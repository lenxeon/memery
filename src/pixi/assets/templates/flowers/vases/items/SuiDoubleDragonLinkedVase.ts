/** 隋白釉双龙柄联腹传瓶神韵花器：双口联腹、攀龙双柄与月白虹彩釉。 */
import { VaseItemDefinition } from '../types';

export const SuiDoubleDragonLinkedVase: VaseItemDefinition = {
  id: 'sui_double_dragon_linked', name: '隋月白双龙联腹传瓶', category: 'sculptural_unique', categoryLabel: '隋韵新生',
  sourceLabel: '神似 · 白釉双龙柄联腹传瓶', shapeLabel: '双口联腹双龙柄',
  desc: '两枚梨腹相倚连生，双龙柄由肩部攀向盘口；凝脂月白釉中浮现淡青虹光。',
  tag: '双龙联璧', iconText: '双', accentColor: '#b8cfce', borderColor: '#f0e7d5',
  mouthAperture: 'standard', mouthWidth: 22, mouthCenter: { x: 75, y: 106.5 }, vaseHeight: 88.5, spreadFactor: 1.0,

  renderMouthBack: () => `
<g id="mouth_back_sui_double_dragon_linked">
  <ellipse cx="67" cy="106.5" rx="6.5" ry="2.2" fill="#263630"/>
  <ellipse cx="83" cy="106.5" rx="6.5" ry="2.2" fill="#263630"/>
  <path d="M60.5 106.5 C61 103.8 73 103.8 73.5 106.5 M76.5 106.5 C77 103.8 89 103.8 89.5 106.5" stroke="#d8e7df" stroke-width="1.35" fill="none"/>
</g>`,

  renderBody: () => `
<g id="vase_sui_double_dragon_linked">
  <!-- 双龙柄先置于器身之后，龙首咬盘口、曲身护腹 -->
  <path d="M62 119 C48 122 44 139 49 151 C52 158 55 158 59 151 C62 145 57 137 54 141 C52 144 54 148 58 147" fill="none" stroke="url(#suiMoonWhitePorcelainGrad)" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M88 119 C102 122 106 139 101 151 C98 158 95 158 91 151 C88 145 93 137 96 141 C98 144 96 148 92 147" fill="none" stroke="url(#suiMoonWhitePorcelainGrad)" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M61 117 Q53 115 51 121 L56 122 L53 126 L62 125 Z M89 117 Q97 115 99 121 L94 122 L97 126 L88 125 Z" fill="#e9efe5" stroke="#617a73" stroke-width="1.05"/>
  <circle cx="55.6" cy="120.2" r="0.8" fill="#263630"/><circle cx="94.4" cy="120.2" r="0.8" fill="#263630"/>

  <!-- 两腹之间保留可见的烧结连桥，避免退化成两只并排普通瓶 -->
  <path d="M66 132 C71 128 79 128 84 132 L88 181 C84 188 80 191 75 191 C70 191 66 188 62 181 Z" fill="url(#suiMoonWhitePorcelainGrad)" stroke="#5c756f" stroke-width="1.15"/>
  <path d="M68 137 C73 134 78 134 83 137" stroke="#fffce9" stroke-width="1.25" opacity="0.72" fill="none"/>

  <clipPath id="clipSuiDoubleDragonLinked"><path d="M61 106.5 Q67 108.7 73 106.5 L72 123 C64 130 59 143 59 160 C59 178 63 187 68 191 L66 195 L48 195 L46 192 C51 184 52 175 51 160 C50 143 53 130 62 123 Z M77 106.5 Q83 108.7 89 106.5 L88 123 C97 130 100 143 99 160 C98 175 99 184 104 192 L102 195 L84 195 L82 191 C87 187 91 178 91 160 C91 143 86 130 78 123 Z"/></clipPath>
  <g clip-path="url(#clipSuiDoubleDragonLinked)">
    <path d="M61 106.5 Q67 108.7 73 106.5 L72 123 C64 130 59 143 59 160 C59 178 63 187 68 191 L66 195 L48 195 L46 192 C51 184 52 175 51 160 C50 143 53 130 62 123 Z M77 106.5 Q83 108.7 89 106.5 L88 123 C97 130 100 143 99 160 C98 175 99 184 104 192 L102 195 L84 195 L82 191 C87 187 91 178 91 160 C91 143 86 130 78 123 Z" fill="url(#suiMoonWhitePorcelainGrad)"/>
    <path d="M43 191 C57 161 67 139 91 110 L108 122 C85 145 72 169 65 198 Z" fill="url(#suiPorcelainIridescenceGrad)" opacity="0.88"/>
    <path d="M56 126 C59 117 63 112 67 111 M84 112 C90 124 91 142 88 162" stroke="#fffef2" stroke-width="2.1" opacity="0.86" fill="none" stroke-linecap="round"/>
    <path d="M55 171 C61 166 66 167 72 172 M78 166 C84 161 90 162 96 168" stroke="#8caeaa" stroke-width="0.55" opacity="0.38" fill="none"/>
  </g>
  <path d="M61 106.5 Q67 108.7 73 106.5 L72 123 C64 130 59 143 59 160 C59 178 63 187 68 191 L66 195 L48 195 L46 192 C51 184 52 175 51 160 C50 143 53 130 62 123 Z M77 106.5 Q83 108.7 89 106.5 L88 123 C97 130 100 143 99 160 C98 175 99 184 104 192 L102 195 L84 195 L82 191 C87 187 91 178 91 160 C91 143 86 130 78 123 Z" fill="none" stroke="#526c66" stroke-width="1.55" stroke-linejoin="round"/>
  <path d="M68 128 C70 139 71 176 68 190 M82 128 C80 139 79 176 82 190" stroke="#6f8f89" stroke-width="1" opacity="0.66" fill="none"/>
  <path d="M47 190 Q58 193 68 190 L69 195 Q58 198 46 194 Z M82 190 Q92 193 103 190 L104 194 Q92 198 81 195 Z" fill="#a8bbb5" stroke="#526c66" stroke-width="1.1"/>
  <!-- 前唇覆盖花枝末端 -->
  <path d="M60.5 106.5 Q67 109.3 73.5 106.5 C73 110.2 61 110.2 60.5 106.5 Z M76.5 106.5 Q83 109.3 89.5 106.5 C89 110.2 77 110.2 76.5 106.5 Z" fill="#dbe6df" stroke="#526c66" stroke-width="1.15"/>
  <path d="M62 106.8 Q67 108.3 72 106.8 M78 106.8 Q83 108.3 88 106.8" stroke="#fffef0" stroke-width="0.9" opacity="0.98" fill="none"/>
</g>`,
};
