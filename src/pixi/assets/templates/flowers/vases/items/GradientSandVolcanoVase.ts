/**
 * @file GradientSandVolcanoVase.tsx
 * @description 4. 天青流沙渐变圆锥砂陶瓶 (奇特器型)
 * 形制：极简火山圆台体形制，哑光天青釉柔和过渡到底部粗粝原矿砂陶，细砂斑驳。
 */
import { VaseItemDefinition } from '../types';

export const GradientSandVolcanoVase: VaseItemDefinition = {
  id: 'gradient_sand_volcano',
  name: '天青流沙渐变瓶',
  category: 'sculptural_unique',
  categoryLabel: '奇特造型',
  sourceLabel: '参考新图5',
  shapeLabel: '极简圆台圆锥',
  desc: '极简火山圆台体形制，双色材质渐变碰撞——哑光天青釉柔和过渡到底部粗粝原矿砂陶，细砂斑驳。',
  tag: '流沙渐变',
  iconText: '⛰️',
  accentColor: '#0ea5e9',
  borderColor: '#bae6fd',

  mouthAperture: 'standard',
  mouthWidth: 15,
  mouthCenter: { x: 75, y: 112 },
  vaseHeight: 83,
  spreadFactor: 1.0,

  renderMouthBack: () => `
<g id="mouth_back_gradient_sand_volcano">
      <ellipse cx="75" cy="112" rx="7.5" ry="2.4" fill="#1c1917" />
      <path d="M 67.5 112 C 67.5 109.8, 82.5 109.8, 82.5 112" stroke="#0284c7" stroke-width="1.6" fill="none" stroke-linecap="round" />
    </g>
`,

  renderBody: () => {
    const volcanoPath = `
      M 67.5 112
      L 82.5 112
      C 84 125, 87 150, 98 192
      L 52 192
      C 63 150, 66 125, 67.5 112
      Z
    `;

    return `
<g id="vase_gradient_sand_volcano">
        <clipPath id="clipVolcanoSand">
          <path d="${volcanoPath}" />
        </clipPath>

        {/* 天青釉至砂岩渐变底色 */}
        <path
          d="${volcanoPath}"
          fill="url(#skyBlueToSandGrad)"
          stroke="#1c1917"
          stroke-width="1.8"
          stroke-linejoin="round"
        />

        {/* 下部粗砂陶原矿粗粝颗粒微肌理 */}
        <g id="coarseSandGrit" clip-path="url(#clipVolcanoSand)">
          ${[
            { cx: 58, cy: 172, r: 0.8 }, { cx: 64, cy: 178, r: 0.9 }, { cx: 72, cy: 175, r: 0.7 },
            { cx: 80, cy: 176, r: 0.9 }, { cx: 88, cy: 174, r: 0.8 }, { cx: 93, cy: 180, r: 0.7 },
            { cx: 56, cy: 184, r: 1.0 }, { cx: 66, cy: 188, r: 0.8 }, { cx: 76, cy: 186, r: 1.1 },
            { cx: 84, cy: 189, r: 0.9 }, { cx: 90, cy: 187, r: 0.7 }, { cx: 70, cy: 182, r: 0.6 },
          ].map((dot) => `
            <circle cx="${dot.cx}" cy="${dot.cy}" r="${dot.r}" fill="#451a03" opacity="0.45" />
          `).join('')}

          {/* 上部天青哑光微漫射 */}
          <path d="M 68 114 Q 72 135 73 155" stroke="#ffffff" stroke-width="1.5" fill="none" opacity="0.75" />
        </g>

        {/* 稳固圆台底座 */}
        <path d="M 52 192 Q 75 194.5 98 192 L 97 195 Q 75 197 53 195 Z" fill="#8c7053" stroke="#1c1917" stroke-width="1.6" />

        {/* 纯净天青前唇 */}
        <path
          d="M 67.5 112 Q 75 114 82.5 112 C 82.5 115, 67.5 115, 67.5 112 Z"
          fill="#e0f2fe"
          stroke="#0284c7"
          stroke-width="1.6"
          stroke-linejoin="round"
        />
        <path d="M 69 112.8 Q 75 114.2 81 112.8" stroke="#ffffff" stroke-width="0.9" fill="none" opacity="0.9" />
      </g>
`;
  },
};
