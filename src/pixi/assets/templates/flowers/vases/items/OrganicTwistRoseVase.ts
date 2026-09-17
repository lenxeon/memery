/**
 * @file OrganicTwistRoseVase.tsx
 * @description 7. 落樱粉旋风波纹瓶 (现代器型)
 * 形制：莫兰迪落樱粉，柔和立体波浪旋风，S形波浪曲线。
 */
import { VaseItemDefinition } from '../types';

export const OrganicTwistRoseVase: VaseItemDefinition = {
  id: 'organic_twist_rose',
  name: '落樱粉波纹瓶',
  category: 'designer_modern',
  categoryLabel: '现代设计',
  sourceLabel: '参考图5 樱粉色',
  shapeLabel: '旋转S粉樱波浪',
  desc: '低饱和莫兰迪落樱粉，表面舒展的立体旋风波纹带来极致温润的触觉与视觉观感。',
  tag: '粉樱波浪',
  iconText: '🌸',
  accentColor: '#f43f5e',
  borderColor: '#fecdd3',

  mouthAperture: 'standard',
  mouthWidth: 22,
  mouthCenter: { x: 75, y: 107.5 },
  vaseHeight: 87.5,
  spreadFactor: 1.0,

  renderMouthBack: () => `
<g id="mouth_back_organic_twist_rose">
      <ellipse cx="75" cy="108" rx="11" ry="3.2" fill="#140d07" />
      <path d="M 64 107.5 C 64 105.2, 86 105.2, 86 107.5" stroke="#4c1d24" stroke-width="1.6" fill="none" stroke-linecap="round" />
    </g>
`,

  renderBody: () => {
    const roseBodyPath = `
      M 64 107.5
      Q 75 110 86 107.5
      C 88 125, 85 150, 88 175
      C 89 184, 87 190, 85 192
      Q 75 194.5 65 192
      C 63 190, 61 184, 62 175
      C 65 150, 62 125, 64 107.5
      Z
    `;

    return `
<g id="vase_organic_twist_rose">
        <clipPath id="clipTwistRose">
          <path d="${roseBodyPath}" />
        </clipPath>

        <path
          d="${roseBodyPath}"
          fill="url(#blushRoseWaveGrad)"
          stroke="#4c1d24"
          stroke-width="1.8"
          stroke-linejoin="round"
        />

        <g id="roseTwistWaves" clip-path="url(#clipTwistRose)">
          <path
            d="M 68 192 C 73 170, 67 142, 72 108 L 75 108 C 70 142, 76 170, 71 192 Z"
            fill="#ffffff"
            opacity="0.8"
          />
          <path d="M 69.5 192 C 74 170, 68.5 142, 73.5 108" stroke="#ffffff" stroke-width="1.6" fill="none" opacity="0.9" />

          <path
            d="M 76 192 C 81 168, 75 140, 80 108 L 83 108 C 78 140, 84 168, 79 192 Z"
            fill="#fff1f2"
            opacity="0.6"
          />
          <path d="M 78 192 C 82.5 168, 77 140, 82 108" stroke="#ffffff" stroke-width="1.3" fill="none" opacity="0.85" />
        </g>

        <path d="M 65 192 Q 75 194.5 85 192 L 84.5 195 Q 75 197 65.5 195 Z" fill="#fecdd3" stroke="#4c1d24" stroke-width="1.5" />

        <path
          d="M 64 107.5 Q 75 110 86 107.5 C 86 111.8, 64 111.8, 64 107.5 Z"
          fill="#ffe4e6"
          stroke="#4c1d24"
          stroke-width="1.6"
          stroke-linejoin="round"
        />
        <path d="M 66 108.8 Q 75 110.5 84 108.8" stroke="#ffffff" stroke-width="1.0" fill="none" opacity="0.9" />
      </g>
`;
  },
};
