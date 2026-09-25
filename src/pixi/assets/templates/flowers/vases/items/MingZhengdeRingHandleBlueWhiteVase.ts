/** 正德青花双耳环瓶神韵：仿青铜礼器的高身比例、双环耳与缠枝莲青花。 */
import { VaseItemDefinition } from '../types';

export const MingZhengdeRingHandleBlueWhiteVase: VaseItemDefinition = {
  id: 'ming_zhengde_ring_handle_blue_white',
  name: '正德青花缠枝莲双耳环瓶',
  category: 'sculptural_unique',
  categoryLabel: '明代名器',
  sourceLabel: '神似 · 正德青花仿铜礼器',
  shapeLabel: '仿铜礼器双环耳',
  desc: '青铜供器意象化为挺拔白瓷瓶身，双环耳垂于颈侧，青花缠枝莲环绕腹部；宽口舒展插枝，耳饰退居两侧。',
  tag: '缠枝莲影',
  iconText: '正',
  accentColor: '#285b9a',
  borderColor: '#dfd3b5',

  mouthAperture: 'wide',
  mouthWidth: 29,
  mouthCenter: { x: 75, y: 105 },
  vaseHeight: 90,
  spreadFactor: 1.25,

  renderMouthBack: () => `
<g id="mouth_back_ming_zhengde_ring_handle_blue_white">
  <ellipse cx="75" cy="105" rx="14.4" ry="2.7" fill="#243b54" />
  <path d="M60.6 105 C61.4 101.8 88.6 101.8 89.4 105" stroke="#e8edf0" stroke-width="1.4" fill="none" />
</g>`,

  renderBody: () => `
<g id="vase_ming_zhengde_ring_handle_blue_white">
  <!-- 成对瓷环耳在瓶身之后，低于瓶口，不遮住花枝根部 -->
  <g fill="none" stroke="#466b9a" stroke-width="3.2" stroke-linecap="round">
    <path d="M67 123 C54 117 48 122 49 131 C50 139 58 141 67 136" />
    <path d="M83 123 C96 117 102 122 101 131 C100 139 92 141 83 136" />
  </g>
  <g fill="none" stroke="#9bb4c7" stroke-width="1.15" stroke-linecap="round" opacity="0.9">
    <path d="M66 124 C57 120 52 123 53 130 C53.5 135 58 137 65 134" />
    <path d="M84 124 C93 120 98 123 97 130 C96.5 135 92 137 85 134" />
  </g>
  <clipPath id="clipMingZhengdeRingHandleBlueWhite">
    <path d="M60.6 105 Q75 108 89.4 105 L85.5 122 C84.5 127 90 132 94 139 C100 149 99 163 95 177 C92 186 86 190 81 191 L84 195 L66 195 L69 191 C64 190 58 186 55 177 C51 163 50 149 56 139 C60 132 65.5 127 64.5 122 Z" />
  </clipPath>
  <path d="M60.6 105 Q75 108 89.4 105 L85.5 122 C84.5 127 90 132 94 139 C100 149 99 163 95 177 C92 186 86 190 81 191 L84 195 L66 195 L69 191 C64 190 58 186 55 177 C51 163 50 149 56 139 C60 132 65.5 127 64.5 122 Z" fill="url(#mingBlueWhitePorcelainGrad)" stroke="#526a78" stroke-width="1.6" stroke-linejoin="round" />
  <g clip-path="url(#clipMingZhengdeRingHandleBlueWhite)">
    <path d="M43 190 C54 164 69 138 104 114 L108 138 C84 157 74 179 69 199 Z" fill="url(#mingPorcelainSheenGrad)" opacity="0.78" />
    <path d="M57 126 C61 116 67 109 74 108" stroke="#ffffff" stroke-width="1.5" opacity="0.84" fill="none" stroke-linecap="round" />
    <!-- 颈、肩、足饰带取自青铜礼器构图，避免满器铺纹 -->
    <path d="M55 139 Q75 143 96 139 L96 143 Q75 147 54 143 Z" fill="#244c8b" opacity="0.92" />
    <path d="M52 176 Q75 181 98 176 L97 180 Q75 185 53 180 Z" fill="#315e9b" opacity="0.9" />
    <path d="M56 141 Q75 145 95 141 M54 178 Q75 183 97 178" stroke="#d6e0e3" stroke-width="0.72" opacity="0.85" fill="none" />
    <!-- 缠枝莲青花带：卷草连接花朵与叶片 -->
    <g stroke="#244b88" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M51 161 C57 151 63 151 68 160 C73 169 80 169 85 159 C90 150 96 151 101 160" />
      <path d="M54 169 C60 164 65 164 69 170 C74 176 81 176 86 169 C90 163 95 164 99 169" />
      <path d="M68 160 C67 154 68 150 72 147 M85 159 C87 153 86 149 82 146" />
    </g>
    <g fill="#3d70ad" stroke="#244b88" stroke-width="0.75">
      <path d="M72 149 C68 145 70 141 75 140 C79 143 77 147 72 149 Z" />
      <path d="M82 148 C81 143 84 141 88 142 C89 146 86 149 82 148 Z" />
      <path d="M61 158 C58 154 59 151 63 149 C67 152 65 156 61 158 Z" />
      <path d="M93 159 C92 155 95 152 99 153 C100 157 97 160 93 159 Z" />
      <path d="M69 169 C65 165 66 162 70 160 C74 163 73 167 69 169 Z" />
      <path d="M86 169 C85 165 88 162 92 163 C93 167 90 170 86 169 Z" />
    </g>
    <g stroke="#dbe7eb" stroke-width="0.55" opacity="0.82" fill="none">
      <path d="M53 161 C59 152 63 153 67 160 M84 158 C89 151 94 152 98 159" />
    </g>
  </g>
  <path d="M64 190 Q75 193 86 190 L88 195 L62 195 Z" fill="#91aabd" stroke="#526a78" stroke-width="1.1" />
  <path d="M60.6 105 Q75 108.2 89.4 105 C88.9 108.6 61.1 108.6 60.6 105 Z" fill="#dbe5e4" stroke="#526a78" stroke-width="1.2" />
  <path d="M63 105.5 Q75 107.6 87 105.5" stroke="#ffffff" stroke-width="0.85" opacity="0.92" fill="none" />
</g>`,
};
