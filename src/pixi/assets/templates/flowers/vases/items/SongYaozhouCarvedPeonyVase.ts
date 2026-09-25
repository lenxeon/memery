/** 北宋耀州青釉刻牡丹瓶神韵：短颈丰肩，刻花凹处积釉，凸棱映出青玉釉光。 */
import { VaseItemDefinition } from '../types';

export const SongYaozhouCarvedPeonyVase: VaseItemDefinition = {
  id: 'song_yaozhou_carved_peony',
  name: '北宋耀州青釉刻牡丹瓶',
  category: 'minimalist',
  categoryLabel: '北宋名窑',
  sourceLabel: '神似 · 耀州窑青釉刻花器',
  shapeLabel: '短颈丰肩刻花腹',
  desc: '短颈接丰肩，青釉瓶腹以深刀刻出舒展牡丹；刀痕蓄釉成深色阴影，肩腹折光清润而有层次。',
  tag: '青釉刻花',
  iconText: '耀',
  accentColor: '#6b987c',
  borderColor: '#c8d8ad',

  mouthAperture: 'narrow',
  mouthWidth: 15,
  mouthCenter: { x: 75, y: 108 },
  vaseHeight: 87,
  spreadFactor: 0.72,

  renderMouthBack: () => `
<g id="mouth_back_song_yaozhou_carved_peony">
  <ellipse cx="75" cy="108" rx="7.6" ry="2.25" fill="#294b40" />
  <path d="M67.4 108 C67.8 105.4 82.2 105.4 82.6 108" stroke="#d2d7ad" stroke-width="1.35" fill="none" />
</g>`,

  renderBody: () => `
<g id="vase_song_yaozhou_carved_peony">
  <clipPath id="clipSongYaozhouPeony">
    <path d="M67.4 108 Q75 110.5 82.6 108 L82 122 C82 127 88 130 94 136 C103 145 103 158 99 172 C95 185 88 191 84 192 L87 195 L63 195 L66 192 C60 189 53 182 50 172 C46 158 47 145 56 136 C62 130 68 127 68 122 Z" />
  </clipPath>
  <path d="M67.4 108 Q75 110.5 82.6 108 L82 122 C82 127 88 130 94 136 C103 145 103 158 99 172 C95 185 88 191 84 192 L87 195 L63 195 L66 192 C60 189 53 182 50 172 C46 158 47 145 56 136 C62 130 68 127 68 122 Z" fill="url(#songYaozhouCeladonGrad)" stroke="#456b59" stroke-width="1.55" stroke-linejoin="round" />
  <g clip-path="url(#clipSongYaozhouPeony)">
    <path d="M43 190 C55 163 68 138 102 116 L106 138 C82 155 72 178 68 199 Z" fill="url(#songYaozhouGlazeSheenGrad)" opacity="0.85" />
    <path d="M57 127 C60 118 66 112 73 111" stroke="#fff8d7" stroke-width="1.55" opacity="0.8" fill="none" stroke-linecap="round" />
    <!-- 刻花以深凹线和偏一侧的釉光双线表现刀口，不做贴花质感 -->
    <g stroke-linecap="round" stroke-linejoin="round">
      <g fill="none" stroke="#385844" stroke-width="1.7" opacity="0.82">
        <path d="M74 177 C73 165 74 153 77 140 C79 134 83 130 88 127" />
        <path d="M76 151 C68 149 63 143 62 136 C69 137 74 141 77 147" />
        <path d="M75 160 C84 157 89 151 90 145 C84 146 79 150 76 156" />
        <path d="M73 169 C65 166 60 161 58 155 C65 156 70 160 74 166" />
        <path d="M77 167 C84 164 90 160 93 154 C86 155 81 159 76 164" />
        <path d="M87 137 C83 136 81 133 81 129 C85 130 88 132 89 135" />
      </g>
      <g fill="none" stroke="#d9dfb9" stroke-width="0.72" opacity="0.82">
        <path d="M75.8 174 C75 163 76 152 79 141 C81 135 84 132 88 129" />
        <path d="M75 148 C70 145 67 142 65 139 M78 155 C82 151 85 149 88 147" />
        <path d="M72 166 C67 163 64 160 62 158 M79 165 C84 162 87 159 90 157" />
      </g>
    </g>
    <!-- 牡丹花心与舒展花瓣：刀刻露胎的暖米白 -->
    <path d="M85 138 C82 136 80 132 82 129 C85 129 87 131 88 134 C89 130 93 129 95 132 C96 136 93 139 89 140 C93 141 95 145 92 148 C88 149 85 146 85 142 C83 146 79 147 76 144 C76 140 79 138 83 138 Z" fill="#e5e2c6" stroke="#344f40" stroke-width="1.05" />
    <path d="M84 139 Q87 136 90 139 Q91 142 88 144 Q85 143 84 139 Z" fill="#a8aa7b" opacity="0.9" />
    <path d="M87 140 Q88 141 89 141" stroke="#f8f0cf" stroke-width="0.9" fill="none" />
  </g>
  <path d="M62 190 Q75 193 88 190 L89 195 Q75 198 61 195 Z" fill="#617b67" stroke="#456b59" stroke-width="1.1" />
  <path d="M67.4 108 Q75 110.5 82.6 108 C82.3 111.5 67.7 111.5 67.4 108 Z" fill="#aebe9b" stroke="#456b59" stroke-width="1.05" />
  <path d="M69 108.5 Q75 110 81 108.5" stroke="#fff8db" stroke-width="0.8" opacity="0.86" fill="none" />
</g>`,
};
