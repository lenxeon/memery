/**
 * @file MelonLobedCeladonVase.tsx
 * @description 11. 海棠瓜棱秀颈素瓶 (现代器型)
 * 形制：纤细秀颈与6瓣饱满瓜棱圆凸瓣，海棠温润蛋壳青白瓷质感。
 */
import { VaseItemDefinition } from '../types';

export const MelonLobedCeladonVase: VaseItemDefinition = {
  id: 'melon_lobed_celadon',
  name: '海棠瓜棱秀颈瓶',
  category: 'designer_modern',
  categoryLabel: '现代设计',
  sourceLabel: '参考图4之3 瓜棱圆瓣',
  shapeLabel: '六瓣海棠瓜棱秀颈',
  desc: '优雅细长秀颈下接六瓣海棠瓜棱饱满球腹，青碧釉色流淌如水，温雅静穆。',
  tag: '瓜棱秀颈',
  iconText: '🍈',
  accentColor: '#059669',
  borderColor: '#a7f3d0',

  mouthAperture: 'narrow',
  mouthWidth: 17,
  mouthCenter: { x: 75, y: 108 },
  vaseHeight: 87,
  spreadFactor: 0.72,

  renderMouthBack: () => `
<g id="mouth_back_melon_lobed">
      <ellipse cx="75" cy="108" rx="8.5" ry="2.6" fill="#064e3b" />
      <path d="M 66.5 108 C 66.5 105.8, 83.5 105.8, 83.5 108" stroke="#065f46" stroke-width="1.6" fill="none" stroke-linecap="round" />
    </g>
`,

  renderBody: () => {
    const melonPath = `
      M 66.5 108
      Q 75 110.5 83.5 108
      C 81 116, 78 126, 78 132
      C 88 138, 98 152, 98 168
      C 98 180, 93 188, 88 192
      Q 75 194.5 62 192
      C 57 188, 52 180, 52 168
      C 52 152, 62 138, 72 132
      C 72 126, 69 116, 66.5 108
      Z
    `;

    return `
<g id="vase_melon_lobed_celadon">
        <clipPath id="clipMelonLobed">
          <path d="${melonPath}" />
        </clipPath>

        <path
          d="${melonPath}"
          fill="url(#melonLobedCeladonGrad)"
          stroke="#065f46"
          stroke-width="1.8"
          stroke-linejoin="round"
        />

        <g id="sixMelonLobes" clip-path="url(#clipMelonLobed)">
          <path d="M 72 132 C 66 142, 60 162, 63 192" stroke="#065f46" stroke-width="1.2" fill="none" opacity="0.35" />
          <path d="M 74 132 C 71 146, 70 168, 72 192" stroke="#065f46" stroke-width="1.2" fill="none" opacity="0.25" />
          <path d="M 76 132 C 79 146, 80 168, 78 192" stroke="#065f46" stroke-width="1.2" fill="none" opacity="0.25" />
          <path d="M 78 132 C 84 142, 90 162, 87 192" stroke="#065f46" stroke-width="1.2" fill="none" opacity="0.35" />

          <ellipse cx="66" cy="165" rx="4" ry="16" fill="#ffffff" opacity="0.65" transform="rotate(-12 66 165)" />
          <ellipse cx="75" cy="166" rx="4" ry="18" fill="#ffffff" opacity="0.8" />
          <ellipse cx="84" cy="165" rx="3.5" ry="16" fill="#ffffff" opacity="0.55" transform="rotate(12 84 165)" />
        </g>

        <path d="M 73 112 Q 74 122 73.5 132" stroke="#ffffff" stroke-width="1.2" fill="none" opacity="0.8" />
        <path d="M 62 192 Q 75 194.5 88 192 L 87.5 195 Q 75 197 62.5 195 Z" fill="#a7f3d0" stroke="#065f46" stroke-width="1.5" />

        <path
          d="M 66.5 108 Q 75 110.5 83.5 108 C 83.5 111.5, 66.5 111.5, 66.5 108 Z"
          fill="#ffffff"
          stroke="#065f46"
          stroke-width="1.6"
          stroke-linejoin="round"
        />
      </g>
`;
  },
};
