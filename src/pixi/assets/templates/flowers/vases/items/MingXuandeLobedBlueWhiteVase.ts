/** 宣德青花瓜棱瓶神韵：莲瓣口、瓜棱腹与灵芝青花纹。 */
import { VaseItemDefinition } from '../types';

export const MingXuandeLobedBlueWhiteVase: VaseItemDefinition = {
  id: 'ming_xuande_lobed_blue_white',
  name: '宣德青花灵芝纹莲瓣瓜棱瓶',
  category: 'minimalist',
  categoryLabel: '明代名器',
  sourceLabel: '神似 · 宣德青花瓜棱瓶',
  shapeLabel: '莲瓣口瓜棱腹',
  desc: '莲瓣口与六道瓜棱收成清峻轮廓，青花灵芝纹随棱面起伏，浓淡钴蓝如墨色在白釉上流动。',
  tag: '宣德青花',
  iconText: '宣',
  accentColor: '#315e9b',
  borderColor: '#dce7ef',

  mouthAperture: 'standard',
  mouthWidth: 19,
  mouthCenter: { x: 75, y: 107 },
  vaseHeight: 88,
  spreadFactor: 1.0,

  renderMouthBack: () => `
<g id="mouth_back_ming_xuande_lobed_blue_white">
  <ellipse cx="75" cy="107" rx="9.4" ry="2.3" fill="#243b54" />
  <path d="M65.6 107 C66.2 104.2 83.8 104.2 84.4 107" stroke="#e8edf0" stroke-width="1.35" fill="none" />
</g>`,

  renderBody: () => `
<g id="vase_ming_xuande_lobed_blue_white">
  <clipPath id="clipMingXuandeLobedBlueWhite">
    <path d="M65.6 107 Q75 109.5 84.4 107 L83 124 C83 130 88 133 92 139 C99 148 99 160 99 168 C99 178 92 187 86 190 L88 195 L62 195 L64 190 C58 187 51 178 51 168 C51 160 51 148 58 139 C62 133 67 130 67 124 Z" />
  </clipPath>
  <path d="M65.6 107 Q75 109.5 84.4 107 L83 124 C83 130 88 133 92 139 C99 148 99 160 99 168 C99 178 92 187 86 190 L88 195 L62 195 L64 190 C58 187 51 178 51 168 C51 160 51 148 58 139 C62 133 67 130 67 124 Z" fill="url(#mingBlueWhitePorcelainGrad)" stroke="#526a78" stroke-width="1.55" stroke-linejoin="round" />
  <g clip-path="url(#clipMingXuandeLobedBlueWhite)">
    <!-- 六道柔和瓜棱：以窄阴面和釉白棱光塑出起伏 -->
    <path d="M50 143 Q57 145 61 150 L62 190 L53 183 Z" fill="#6c8ca2" opacity="0.34" />
    <path d="M62 138 Q68 141 70 147 L70 193 L63 190 Z" fill="#ffffff" opacity="0.47" />
    <path d="M75 136 Q78 142 78 149 L78 194 L72 195 L72 148 Z" fill="#8aa8b8" opacity="0.27" />
    <path d="M87 138 Q82 142 81 148 L82 193 L89 189 Z" fill="#ffffff" opacity="0.36" />
    <path d="M98 145 Q92 146 89 151 L90 185 L98 177 Z" fill="#6c8ca2" opacity="0.27" />
    <path d="M43 190 C54 162 68 137 103 115 L106 140 C83 156 73 180 68 199 Z" fill="url(#mingPorcelainSheenGrad)" opacity="0.8" />
    <path d="M59 128 C62 119 68 113 74 111" stroke="#ffffff" stroke-width="1.55" opacity="0.86" fill="none" stroke-linecap="round" />
    <!-- 灵芝枝纹随棱面留白，采用青花深浅两笔 -->
    <g stroke="#234e8e" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M64 174 C67 165 68 156 67 148 C66 143 63 140 59 138" stroke-width="1.9" />
      <path d="M66 161 C61 159 58 156 57 152 C62 152 65 155 67 158" stroke-width="1.5" />
      <path d="M67 153 C72 151 74 147 74 143 C70 144 68 147 67 150" stroke-width="1.4" />
      <path d="M83 179 C81 170 82 161 85 154 C87 150 91 148 94 146" stroke-width="1.8" />
      <path d="M83 166 C78 164 76 161 75 157 C80 158 82 160 84 164" stroke-width="1.4" />
      <path d="M86 157 C91 157 94 154 96 150 C91 150 88 152 85 155" stroke-width="1.4" />
    </g>
    <g fill="#3469aa" stroke="#234e8e" stroke-width="0.85" stroke-linejoin="round">
      <path d="M59 139 C55 135 57 131 63 130 C66 134 64 138 59 139 Z" />
      <path d="M74 143 C72 138 75 135 80 135 C81 140 78 143 74 143 Z" />
      <path d="M94 146 C94 141 98 139 102 141 C101 145 98 147 94 146 Z" />
    </g>
    <path d="M55 181 Q75 185 95 181" stroke="#366aa5" stroke-width="0.8" opacity="0.74" fill="none" />
  </g>
  <!-- 口沿莲瓣由深蓝瓣尖与釉白瓣脊构成 -->
  <path d="M65.6 107 Q75 109.7 84.4 107 C84 111 81.5 113.5 79.7 115 C78.7 112.6 76.8 111.4 75 111 C73.2 111.4 71.3 112.6 70.3 115 C68.5 113.5 66 111 65.6 107 Z" fill="#f5f1df" stroke="#315b91" stroke-width="1.15" />
  <path d="M69 109.2 Q70.5 113 72.3 114.3 M75 110.5 L75 113.2 M81 109.2 Q79.5 113 77.7 114.3" stroke="#315b91" stroke-width="0.8" opacity="0.86" fill="none" />
  <path d="M61 190 Q75 193 89 190 L90 195 Q75 198 60 195 Z" fill="#b7cbd3" stroke="#526a78" stroke-width="1.1" />
  <path d="M66.8 107.5 Q75 109.7 83.2 107.5" stroke="#ffffff" stroke-width="0.8" opacity="0.9" fill="none" />
</g>`,
};
