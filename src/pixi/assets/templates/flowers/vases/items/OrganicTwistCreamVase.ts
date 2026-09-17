/**
 * @file OrganicTwistCreamVase.tsx
 * @description 6. 流光旋风波浪奶油瓶 (现代器型)
 * 形制：奶油白陶，S型波浪旋风立体扭转，微收腰优雅身形。
 */
import { VaseItemDefinition } from '../types';

export const OrganicTwistCreamVase: VaseItemDefinition = {
  id: 'organic_twist_cream',
  name: '流光旋风奶油瓶',
  category: 'designer_modern',
  categoryLabel: '现代设计',
  sourceLabel: '参考图2 奶油白',
  shapeLabel: '旋转S波浪曲线',
  desc: '奶油白温润陶胎表面流淌着柔和舒展的S形旋风波浪立棱，光影流动，宛若凝固的丝绸。',
  tag: '旋风波浪',
  iconText: '🍦',
  accentColor: '#d97706',
  borderColor: '#fef3c7',

  mouthAperture: 'standard',
  mouthWidth: 22,
  mouthCenter: { x: 75, y: 107.5 },
  vaseHeight: 87.5,
  spreadFactor: 1.0,

  renderMouthBack: () => `
<g id="mouth_back_organic_twist_cream">
      <ellipse cx="75" cy="108" rx="11" ry="3.2" fill="#140d07" />
      <path d="M 64 107.5 C 64 105.2, 86 105.2, 86 107.5" stroke="#3d2c1d" stroke-width="1.6" fill="none" stroke-linecap="round" />
    </g>
`,

  renderBody: () => {
    const twistBodyPath = `
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
<g id="vase_organic_twist_cream">
        <clipPath id="clipTwistCream">
          <path d="${twistBodyPath}" />
        </clipPath>

        <path
          d="${twistBodyPath}"
          fill="url(#creamWavePorcelainGrad)"
          stroke="#2a1e14"
          stroke-width="1.8"
          stroke-linejoin="round"
        />

        <g id="sculpturalTwistWaves" clip-path="url(#clipTwistCream)">
          <path
            d="M 60 192 C 64 175, 60 145, 66 115 C 68 118, 64 145, 62 192 Z"
            fill="#dfd0bb"
            opacity="0.6"
          />
          <path
            d="M 67 192 C 73 170, 66 142, 72 108 L 75 108 C 70 142, 76 170, 71 192 Z"
            fill="#ffffff"
            opacity="0.9"
          />
          <path d="M 69 192 C 74 170, 68 142, 73.5 108" stroke="#ffffff" stroke-width="1.6" fill="none" opacity="0.95" />

          <path
            d="M 76 192 C 81 168, 75 140, 80 108 L 83 108 C 78 140, 84 168, 79 192 Z"
            fill="#f7efe0"
            opacity="0.8"
          />
          <path d="M 77.5 192 C 82 168, 76.5 140, 81.5 108" stroke="#ffffff" stroke-width="1.4" fill="none" opacity="0.9" />

          <path
            d="M 82 192 C 87 165, 82 138, 86 112"
            stroke="#3d2c1d"
            stroke-width="1.2"
            fill="none"
            opacity="0.35"
          />
        </g>

        <path d="M 65 192 Q 75 194.5 85 192 L 84.5 195 Q 75 197 65.5 195 Z" fill="#d1be9f" stroke="#2a1e14" stroke-width="1.5" />

        <path
          d="M 64 107.5 Q 75 110 86 107.5 C 86 111.8, 64 111.8, 64 107.5 Z"
          fill="#ffffff"
          stroke="#2a1e14"
          stroke-width="1.6"
          stroke-linejoin="round"
        />
        <path d="M 66 108.8 Q 75 110.5 84 108.8" stroke="#ffffff" stroke-width="1.1" fill="none" opacity="0.95" />
      </g>
`;
  },
};
