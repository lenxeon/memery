/**
 * @file TwistedHelixTowerVase.tsx
 * @description 3. 极简莫兰迪旋转扭扭塔瓶 (奇特器型)
 * 形制：空间多边形沿中心轴90度空间立体旋转，中段收拢为沙漏细腰，莫兰迪冰蓝微光纯瓷。
 */
import { VaseItemDefinition } from '../types';

export const TwistedHelixTowerVase: VaseItemDefinition = {
  id: 'twisted_helix_tower',
  name: '旋转几何扭扭瓶',
  category: 'sculptural_unique',
  categoryLabel: '奇特造型',
  sourceLabel: '参考新图4',
  shapeLabel: '轴向旋转沙漏',
  desc: '空间多边形柱身沿中心轴发生90度空间立体旋转，中段收拢为沙漏细腰，莫兰迪冰蓝微光纯瓷。',
  tag: '空间旋转',
  iconText: '🔷',
  accentColor: '#0284c7',
  borderColor: '#bae6fd',

  mouthAperture: 'standard',
  mouthWidth: 16,
  mouthCenter: { x: 75, y: 108 },
  vaseHeight: 87,
  spreadFactor: 1.0,

  renderMouthBack: () => `
<g id="mouth_back_twisted_helix_tower">
      <ellipse cx="75" cy="108" rx="8" ry="2.5" fill="#0c4a6e" />
      <path d="M 67 108 L 71 105.5 L 79 105.5 L 83 108" stroke="#0369a1" stroke-width="1.6" fill="none" stroke-linecap="round" />
    </g>
`,

  renderBody: () => `
    <g id="vase_twisted_helix_tower">
      <!-- 上段旋转多边形棱柱切面 -->
      <!-- 上左主光面 -->
      <polygon points="67,108 75,108 72,148 65,146" fill="#7dd3fc" stroke="#0369a1" stroke-width="1.4" stroke-linejoin="round" />
      <!-- 上中主高亮面 -->
      <polygon points="75,108 83,108 79,146 72,148" fill="#ffffff" stroke="#0369a1" stroke-width="1.4" stroke-linejoin="round" />
      <!-- 上右阴影面 -->
      <polygon points="83,108 81,114 84,144 79,146" fill="#0284c7" stroke="#0369a1" stroke-width="1.3" stroke-linejoin="round" />

      <!-- 下段反向展开旋转棱柱切面 -->
      <!-- 下左暗影折面 -->
      <polygon points="65,146 72,148 68,192 58,192" fill="#0284c7" stroke="#0369a1" stroke-width="1.4" stroke-linejoin="round" />
      <!-- 下中核心受光面 -->
      <polygon points="72,148 79,146 84,192 68,192" fill="#bae6fd" stroke="#0369a1" stroke-width="1.4" stroke-linejoin="round" />
      <!-- 下右侧光折面 -->
      <polygon points="79,146 84,144 92,192 84,192" fill="#38bdf8" stroke="#0369a1" stroke-width="1.4" stroke-linejoin="round" />

      <!-- 旋转空间棱线锐利高光 -->
      <line x1="75" y1="108" x2="72" y2="148" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" />
      <line x1="72" y1="148" x2="68" y2="192" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" />
      <line x1="83" y1="108" x2="79" y2="146" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" />
      <line x1="79" y1="146" x2="84" y2="192" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" />

      <!-- 稳重多边形底足 -->
      <polygon points="58,192 92,192 91,195 59,195" fill="#0369a1" stroke="#0c4a6e" stroke-width="1.5" />

      <!-- 旋转切口前唇 -->
      <polygon
        points="67,108 75,108 83,108 80,111.5 74,112 68,111"
        fill="#e0f2fe"
        stroke="#0369a1"
        stroke-width="1.6"
        stroke-linejoin="round"
      />
    </g>
  `,
};
