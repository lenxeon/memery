/**
 * @file ChiseledStoneGrayVase.tsx
 * @description 8. 侘寂玄灰砂岩横纹瓶 (现代器型)
 * 形制：玄灰石器微锥体，手工凿刻横向砂岩肌理，质朴粗陶质感。
 */
import { VaseItemDefinition } from '../types';

export const ChiseledStoneGrayVase: VaseItemDefinition = {
  id: 'chiseled_stone_gray',
  name: '侘寂玄灰砂岩瓶',
  category: 'wabi_sabi',
  categoryLabel: '侘寂美学',
  sourceLabel: '参考图3 玄灰粗砂',
  shapeLabel: '横纹粗砂岩微锥',
  desc: '玄灰砂岩质感与手工拉坯留下的细密横向粗粝刻痕，呈现返璞归真的侘寂禅韵。',
  tag: '砂岩横纹',
  iconText: '🗿',
  accentColor: '#52525b',
  borderColor: '#a1a1aa',

  mouthAperture: 'wide',
  mouthWidth: 19,
  mouthCenter: { x: 75, y: 108.5 },
  vaseHeight: 86.5,
  spreadFactor: 1.25,

  renderMouthBack: () => `
<g id="mouth_back_chiseled_stone">
      <ellipse cx="75" cy="108.5" rx="9.5" ry="2.8" fill="#0d0e10" />
      <path d="M 65.5 108.5 C 65.5 106, 84.5 106, 84.5 108.5" stroke="#18181b" stroke-width="1.6" fill="none" stroke-linecap="round" />
    </g>
`,

  renderBody: () => {
    const stoneBodyPath = `
      M 65.5 108.5
      L 84.5 108.5
      C 86 125, 87 155, 90 192
      L 60 192
      C 63 155, 64 125, 65.5 108.5
      Z
    `;
    const yLevels = [
      113, 116, 120, 123, 127, 131, 135, 139, 143, 147, 151,
      155, 159, 163, 167, 171, 175, 179, 183, 187, 190
    ];

    return `
<g id="vase_chiseled_stone_gray">
        <clipPath id="clipChiseledStone">
          <path d="${stoneBodyPath}" />
        </clipPath>

        <path
          d="${stoneBodyPath}"
          fill="url(#chiseledStoneGrad)"
          stroke="#18181b"
          stroke-width="1.8"
          stroke-linejoin="round"
        />

        <g id="horizontalChiseledGrooves" clip-path="url(#clipChiseledStone)">
          ${yLevels.map((y, idx) => {
            const t = (y - 108.5) / (192 - 108.5);
            const leftX = 65.5 - 5.5 * t;
            const rightX = 84.5 + 5.5 * t;
            return `
              <g>
                <line
                  x1="${leftX}"
                  y1="${y}"
                  x2="${rightX}"
                  y2="${y}"
                  stroke="#18181b"
                  stroke-width="0.85"
                  opacity="${idx % 2 === 0 ? 0.7 : 0.45}"
                />
                <line
                  x1="${leftX + 2}"
                  y1="${y + 0.6}"
                  x2="${rightX - 3}"
                  y2="${y + 0.6}"
                  stroke="#71717a"
                  stroke-width="0.65"
                  opacity="${idx % 3 === 0 ? 0.65 : 0.4}"
                />
              </g>
            `;
          }).join('')}
        </g>

        <rect x="60" y="192" width="30" height="3" fill="#27272a" stroke="#18181b" stroke-width="1.5" />

        <path
          d="M 65.5 108.5 Q 75 110.8 84.5 108.5 C 84.5 112, 65.5 112, 65.5 108.5 Z"
          fill="#52525b"
          stroke="#18181b"
          stroke-width="1.6"
          stroke-linejoin="round"
        />
      </g>
    `;
  },
};
