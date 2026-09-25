/** 景泰蓝掐丝珐琅瓶神韵：金属丝分区的蓝绿珐琅、颈部羽纹与腹部缠枝莲。 */
import { VaseItemDefinition } from '../types';

export const MingJingtaiCloisonneLotusBottle: VaseItemDefinition = {
  id: 'ming_jingtai_cloisonne_lotus_bottle',
  name: '景泰蓝掐丝缠枝莲羽纹瓶',
  category: 'sculptural_unique',
  categoryLabel: '明代名器',
  sourceLabel: '神似 · 景泰年间掐丝珐琅瓶',
  shapeLabel: '长颈丰肩珐琅瓶',
  desc: '铜胎上以鎏金细丝分隔宝蓝、孔雀青与松石绿珐琅，颈部羽纹，腹部缠枝莲在亮釉与金线间舒展。',
  tag: '景泰蓝光',
  iconText: '珐',
  accentColor: '#169b9a',
  borderColor: '#e0bf69',

  mouthAperture: 'narrow',
  mouthWidth: 13,
  mouthCenter: { x: 75, y: 99 },
  vaseHeight: 96,
  spreadFactor: 0.72,

  renderMouthBack: () => `
<g id="mouth_back_ming_jingtai_cloisonne_lotus_bottle">
  <ellipse cx="75" cy="99" rx="6.4" ry="2.25" fill="#123f48" />
  <path d="M68.6 99 C69.2 96.2 80.8 96.2 81.4 99" stroke="#d8b65c" stroke-width="1.6" fill="none" />
</g>`,

  renderBody: () => `
<g id="vase_ming_jingtai_cloisonne_lotus_bottle">
  <clipPath id="clipMingJingtaiCloisonneLotusBottle">
    <path d="M68.6 99 Q75 101.5 81.4 99 L80.5 124 C80.4 130 86 133 92 139 C101 148 102 160 99 173 C96 185 88 191 83 192 L86 195 L64 195 L67 192 C61 189 53 182 50 173 C47 160 49 148 58 139 C64 133 69.6 130 69.5 124 Z" />
  </clipPath>
  <path d="M68.6 99 Q75 101.5 81.4 99 L80.5 124 C80.4 130 86 133 92 139 C101 148 102 160 99 173 C96 185 88 191 83 192 L86 195 L64 195 L67 192 C61 189 53 182 50 173 C47 160 49 148 58 139 C64 133 69.6 130 69.5 124 Z" fill="url(#mingJingtaiTurquoiseGrad)" stroke="#a97832" stroke-width="2" stroke-linejoin="round" />
  <g clip-path="url(#clipMingJingtaiCloisonneLotusBottle)">
    <!-- 颈部羽翎格：铜丝勾边，单元内蓝绿交替 -->
    <g stroke="#d0a449" stroke-width="0.95" stroke-linejoin="round">
      <path d="M70 108 Q75 105 80 108 L80 116 Q75 119 70 116 Z" fill="url(#mingJingtaiCobaltCellGrad)" />
      <path d="M70 118 Q75 115 80 118 L80 126 Q75 129 70 126 Z" fill="url(#mingJingtaiJadeCellGrad)" />
      <path d="M70.5 109 Q75 106 79.5 109 L79.5 116 Q75 118 70.5 116 Z" fill="url(#mingJingtaiJadeCellGrad)" opacity="0.88" />
      <path d="M70.5 119 Q75 116 79.5 119 L79.5 126 Q75 128 70.5 126 Z" fill="url(#mingJingtaiCobaltCellGrad)" opacity="0.86" />
      <path d="M75 107 L75 127" fill="none" />
    </g>
    <!-- 腹部铺青绿珐琅，蓝色莲瓣单元围绕金丝花心 -->
    <path d="M43 190 C55 162 69 137 103 114 L107 140 C82 156 73 179 68 199 Z" fill="url(#mingJingtaiMetalSheenGrad)" opacity="0.9" />
    <g stroke="#c99b42" stroke-width="1.3" stroke-linejoin="round">
      <path d="M74 158 C69 153 69 148 74 145 C79 148 79 153 75 158 Z" fill="url(#mingJingtaiCobaltCellGrad)" />
      <path d="M75 158 C80 153 85 153 87 158 C85 163 80 164 75 159 Z" fill="url(#mingJingtaiJadeCellGrad)" />
      <path d="M75 159 C80 164 80 169 75 172 C70 169 70 164 74 159 Z" fill="url(#mingJingtaiCobaltCellGrad)" />
      <path d="M74 158 C69 163 64 163 62 158 C64 153 69 153 74 158 Z" fill="url(#mingJingtaiJadeCellGrad)" />
      <path d="M74 158 C71 151 73 146 77 145 C82 149 80 154 76 158 Z" fill="url(#mingJingtaiTurquoiseGrad)" />
      <path d="M75 158 Q82 155 86 159 Q84 165 77 160 Z" fill="url(#mingJingtaiCobaltCellGrad)" />
      <path d="M75 159 Q78 166 74 171 Q68 168 72 160 Z" fill="url(#mingJingtaiTurquoiseGrad)" />
      <path d="M74 158 Q67 161 62 157 Q64 151 71 156 Z" fill="url(#mingJingtaiCobaltCellGrad)" />
    </g>
    <circle cx="75" cy="158.5" r="2.25" fill="#dcad4c" stroke="#f6dc88" stroke-width="0.8" />
    <circle cx="75" cy="158.5" r="0.8" fill="#fff4bd" />
    <!-- 金丝缠枝与小叶，沿腹部留出呼吸感 -->
    <g fill="none" stroke="#d6aa51" stroke-width="1.35" stroke-linecap="round">
      <path d="M55 178 C62 171 65 166 68 160 M82 157 C87 151 91 148 96 146 M81 162 C87 167 91 172 93 178" />
      <path d="M62 172 Q57 167 56 163 M87 153 Q91 156 96 155 M87 170 Q94 167 97 169" />
    </g>
    <path d="M56 163 Q59 157 64 157 Q63 163 57 165 Z M93 154 Q96 150 100 151 Q99 156 94 157 Z M94 170 Q99 167 102 170 Q99 174 94 172 Z" fill="url(#mingJingtaiJadeCellGrad)" stroke="#c99b42" stroke-width="1.05" />
    <!-- 釉面高光细长如窗边掠光，保留掐丝与珐琅的饱和颜色 -->
    <path d="M58 137 C61 128 66 119 72 113" stroke="#f6ffea" stroke-width="1.55" opacity="0.78" fill="none" stroke-linecap="round" />
    <path d="M51 181 C55 163 64 145 73 132" stroke="#e5f4dc" stroke-width="0.9" opacity="0.48" fill="none" stroke-linecap="round" />
  </g>
  <path d="M63 190 Q75 193 87 190 L88 195 Q75 198 62 195 Z" fill="#146a69" stroke="#a97832" stroke-width="1.5" />
  <path d="M68.6 99 Q75 101.7 81.4 99 C80.8 102.6 69.2 102.6 68.6 99 Z" fill="#138a89" stroke="#a97832" stroke-width="1.45" />
  <path d="M70.2 99.4 Q75 100.9 79.8 99.4" stroke="#ffefad" stroke-width="0.9" opacity="0.96" fill="none" />
</g>`,
};
