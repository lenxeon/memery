/** 北宋钧窑月白紫霞长颈瓶神韵：撇口细颈、垂腹，青白釉中流动紫红窑变。 */
import { VaseItemDefinition } from '../types';

export const SongJunMoonWhiteVase: VaseItemDefinition = {
  id: 'song_jun_moon_white',
  name: '北宋钧窑月白紫霞长颈瓶',
  category: 'minimalist',
  categoryLabel: '北宋名窑',
  sourceLabel: '神似 · 北宋钧窑窑变釉瓶',
  shapeLabel: '细颈垂腹撇口',
  desc: '月白天青釉色由肩至腹渐深，一抹紫霞窑变晕开在圆腹侧面，釉光下隐约可见细微开片。',
  tag: '月白紫霞',
  iconText: '钧',
  accentColor: '#849da8',
  borderColor: '#d8b4b1',

  mouthAperture: 'narrow',
  mouthWidth: 12,
  mouthCenter: { x: 75, y: 99 },
  vaseHeight: 96,
  spreadFactor: 0.72,

  renderMouthBack: () => `
<g id="mouth_back_song_jun_moon_white">
  <ellipse cx="75" cy="99" rx="6.2" ry="2.1" fill="#30464d" />
  <path d="M68.8 99 C69.3 96.5 80.7 96.5 81.2 99" stroke="#dbe8e3" stroke-width="1.35" fill="none" />
</g>`,

  renderBody: () => `
<g id="vase_song_jun_moon_white">
  <clipPath id="clipSongJunMoonWhite">
    <path d="M68.8 99 Q75 101.5 81.2 99 L80.3 123 C80.2 130 86 133 92 139 C101 148 103 160 100 173 C97 185 89 191 84 192 L87 195 L63 195 L66 192 C60 189 52 182 49 172 C45 159 48 148 58 139 C64 133 69.8 130 69.7 123 Z" />
  </clipPath>
  <path d="M68.8 99 Q75 101.5 81.2 99 L80.3 123 C80.2 130 86 133 92 139 C101 148 103 160 100 173 C97 185 89 191 84 192 L87 195 L63 195 L66 192 C60 189 52 182 49 172 C45 159 48 148 58 139 C64 133 69.8 130 69.7 123 Z" fill="url(#songJunMoonWhiteGrad)" stroke="#526d75" stroke-width="1.55" stroke-linejoin="round" />
  <g clip-path="url(#clipSongJunMoonWhite)">
    <!-- 紫霞窑变沿腹部自然晕散，不作规则色斑 -->
    <ellipse cx="60" cy="151" rx="21" ry="19" fill="url(#songJunPurpleTransmutationGrad)" transform="rotate(-23 60 151)" />
    <ellipse cx="83" cy="169" rx="18" ry="14" fill="url(#songJunPurpleTransmutationGrad)" transform="rotate(16 83 169)" opacity="0.56" />
    <path d="M44 190 C55 163 69 135 101 115 L105 139 C81 155 72 178 67 199 Z" fill="url(#songJunGlazeSheenGrad)" opacity="0.82" />
    <path d="M60 124 C62 114 68 107 74 103" stroke="#f7f5df" stroke-width="1.5" opacity="0.84" fill="none" stroke-linecap="round" />
    <!-- 极淡釉下开片：纤细不规则短线 -->
    <g stroke="#526f75" stroke-width="0.48" opacity="0.28" fill="none" stroke-linecap="round">
      <path d="M56 145 l5 4 -2 5 5 4 -1 5" />
      <path d="M81 143 l-4 5 2 4 -4 5 1 5" />
      <path d="M67 168 l4 3 -1 5 4 3" />
      <path d="M91 162 l-4 4 2 4 -3 4" />
      <path d="M57 177 l4 -3 3 3 -1 4" />
    </g>
    <path d="M54 151 C56 155 59 157 62 158 M79 168 C82 170 85 170 88 168" stroke="#f3d7cf" stroke-width="0.8" opacity="0.46" fill="none" />
  </g>
  <path d="M62 190 Q75 193 88 190 L89 195 Q75 198 61 195 Z" fill="#758f94" stroke="#526d75" stroke-width="1.1" />
  <path d="M68.8 99 Q75 101.7 81.2 99 C80.5 102.3 69.5 102.3 68.8 99 Z" fill="#b9d1d1" stroke="#526d75" stroke-width="1.05" />
  <path d="M70.2 99.4 Q75 100.8 79.8 99.4" stroke="#fff8e7" stroke-width="0.8" opacity="0.9" fill="none" />
</g>`,
};
