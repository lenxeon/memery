/** 北宋磁州白地剔黑玉壶春瓶神韵：黑色化妆土上剔出米白花叶，黑白如墨拓。 */
import { VaseItemDefinition } from '../types';

export const SongCizhouBlackCarvedYuhuchunVase: VaseItemDefinition = {
  id: 'song_cizhou_black_carved_yuhuchun',
  name: '北宋磁州白地剔黑玉壶春瓶',
  category: 'sculptural_unique',
  categoryLabel: '北宋名窑',
  sourceLabel: '神似 · 磁州窑白地黑剔花器',
  shapeLabel: '撇口细颈垂腹玉壶春',
  desc: '撇口、细颈、溜肩与垂腹连成流畅玉壶春曲线；墨黑化妆土上剔出米白折枝牡丹，像一幅温润的黑白刻版。',
  tag: '白地剔黑',
  iconText: '磁',
  accentColor: '#393a36',
  borderColor: '#eee5d3',

  mouthAperture: 'standard',
  mouthWidth: 21,
  mouthCenter: { x: 75, y: 101 },
  vaseHeight: 94,
  spreadFactor: 1.0,

  renderMouthBack: () => `
<g id="mouth_back_song_cizhou_black_carved_yuhuchun">
  <ellipse cx="75" cy="101" rx="10.7" ry="2.45" fill="#181b1a" />
  <path d="M64.3 101 C65 98.1 85 98.1 85.7 101" stroke="#e7dfcc" stroke-width="1.45" fill="none" />
</g>`,

  renderBody: () => `
<g id="vase_song_cizhou_black_carved_yuhuchun">
  <clipPath id="clipSongCizhouBlackYuhuchun">
    <path d="M64.3 101 Q75 104 85.7 101 L82 119 C80.8 125 84 130 91 137 C100 147 103 159 99 173 C95 185 87 191 82 192 L85 195 L65 195 L68 192 C61 189 54 182 51 172 C47 159 50 147 59 137 C66 130 69.2 125 68 119 Z" />
  </clipPath>
  <path d="M64.3 101 Q75 104 85.7 101 L82 119 C80.8 125 84 130 91 137 C100 147 103 159 99 173 C95 185 87 191 82 192 L85 195 L65 195 L68 192 C61 189 54 182 51 172 C47 159 50 147 59 137 C66 130 69.2 125 68 119 Z" fill="url(#songCizhouBlackGlazeGrad)" stroke="#202522" stroke-width="1.6" stroke-linejoin="round" />
  <g clip-path="url(#clipSongCizhouBlackYuhuchun)">
    <path d="M45 190 C56 161 70 133 103 112 L107 138 C82 155 72 179 68 199 Z" fill="url(#songCizhouLacquerSheenGrad)" opacity="0.78" />
    <path d="M61 125 C64 115 69 108 76 105" stroke="#faf2dd" stroke-width="1.55" opacity="0.78" fill="none" stroke-linecap="round" />
    <!-- 剔黑折枝：留白花朵、叶片与连贯枝梗，刻线保留轻微刀锋变化 -->
    <g fill="none" stroke="#e9e2cf" stroke-linecap="round" stroke-linejoin="round">
      <path d="M60 180 C68 167 72 155 76 143 C78 137 83 132 90 129" stroke-width="2.05" />
      <path d="M73 155 C66 152 62 147 61 141 C67 143 72 147 75 152" stroke-width="1.35" />
      <path d="M76 163 C84 160 89 155 91 149 C85 151 80 155 76 160" stroke-width="1.35" />
      <path d="M68 170 C61 168 57 163 56 157 C62 159 67 163 70 167" stroke-width="1.25" />
      <path d="M81 145 C85 141 88 137 89 133" stroke-width="1.1" />
    </g>
    <path d="M88 137 C84 136 82 132 84 129 C87 129 89 131 90 134 C92 130 96 130 98 133 C98 137 95 140 91 141 C95 142 97 146 94 149 C90 150 87 147 87 143 C84 147 80 147 78 144 C78 140 82 138 86 138 Z" fill="#eee6d2" stroke="#292e2a" stroke-width="1.05" />
    <path d="M88 139 Q91 136 93 139 Q94 142 91 144 Q89 143 88 139 Z" fill="#9a927d" />
    <path d="M59 141 Q54 137 54 133 Q60 134 63 139 Z M62 145 Q57 147 53 145 Q56 141 61 142 Z M61 158 Q56 154 56 151 Q62 152 65 156 Z M83 157 Q86 152 91 151 Q89 157 84 160 Z M65 168 Q61 165 59 162 Q65 163 68 167 Z M80 149 Q83 145 87 144 Q85 149 81 152 Z" fill="#e9e2cf" stroke="#303530" stroke-width="0.85" stroke-linejoin="round" />
    <!-- 刀口边缘一侧的暖白微线，暗示露胎而非描金 -->
    <g stroke="#fff8e7" stroke-width="0.58" opacity="0.82" fill="none" stroke-linecap="round">
      <path d="M61 179 C68 167 72 155 76 143 M73 153 C69 149 66 146 63 145 M77 161 C83 158 87 154 89 151" />
    </g>
  </g>
  <path d="M63 190 Q75 193 87 190 L88 195 Q75 198 62 195 Z" fill="#292d2a" stroke="#202522" stroke-width="1.1" />
  <path d="M64.3 101 Q75 104 85.7 101 C85.3 104.3 64.7 104.3 64.3 101 Z" fill="#494b44" stroke="#202522" stroke-width="1.1" />
  <path d="M66.4 101.5 Q75 103.2 83.6 101.5" stroke="#fff8e8" stroke-width="0.82" opacity="0.9" fill="none" />
</g>`,
};
