/**
 * @file PearlescentTurbineVase.tsx
 * @description 2. 银曜珠光螺旋涡轮瓶 (奇特器型)
 * 形制：外撇喇叭口、水滴胆腹周身环绕如涡轮叶片般的3D立体旋转刀锋立棱，银白珠光金属冷冽反射。
 */
import React from 'react';
import { VaseItemDefinition } from '../types';

export const PearlescentTurbineVase: VaseItemDefinition = {
  id: 'pearlescent_turbine',
  name: '银曜螺旋涡轮瓶',
  category: 'sculptural_unique',
  categoryLabel: '奇特造型',
  sourceLabel: '参考新图3',
  shapeLabel: '旋转刀锋涡轮',
  desc: '外撇喇叭口、水滴胆腹周身环绕如涡轮叶片般的3D立体旋转刀锋立棱，银白珠光金属冷冽反射。',
  tag: '旋转刀锋',
  iconText: '🌪️',
  accentColor: '#94a3b8',
  borderColor: '#e2e8f0',

  mouthAperture: 'standard',
  mouthWidth: 21,
  mouthCenter: { x: 75, y: 107 },
  vaseHeight: 88,
  spreadFactor: 1.0,

  renderMouthBack: () => (
    <g id="mouth_back_pearlescent_turbine">
      <ellipse cx="75" cy="107" rx="10.5" ry="3.0" fill="#0f172a" />
      <path d="M 64.5 107 C 64.5 104.5, 85.5 104.5, 85.5 107" stroke="#334155" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </g>
  ),

  renderBody: () => {
    // 外撇撇口、高腰、下垂饱满胆腹轮廓
    const turbineBodyPath = `
      M 64.5 107
      Q 75 109.5 85.5 107
      C 83 115, 79 126, 78 138
      C 86 145, 96 158, 97 172
      C 98 182, 94 189, 89 192
      Q 75 194.5 61 192
      C 56 189, 52 182, 53 172
      C 54 158, 64 145, 72 138
      C 71 126, 67 115, 64.5 107
      Z
    `;

    return (
      <g id="vase_pearlescent_turbine">
        <clipPath id="clipTurbineBody">
          <path d={turbineBodyPath} />
        </clipPath>

        {/* 银曜冷冽珠光金属底色 */}
        <path
          d={turbineBodyPath}
          fill="url(#silverPearlTurbineGrad)"
          stroke="#334155"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* 8 道立体 3D 旋转刀锋涡轮螺旋立棱 */}
        <g id="spiralTurbineBlades" clipPath="url(#clipTurbineBody)">
          {[
            { startX: 68, startY: 110, ctrlX1: 60, ctrlY1: 145, ctrlX2: 56, ctrlY2: 175, endX: 63, endY: 192 },
            { startX: 71, startY: 108, ctrlX1: 65, ctrlY1: 142, ctrlX2: 62, ctrlY2: 172, endX: 69, endY: 192 },
            { startX: 74, startY: 108, ctrlX1: 71, ctrlY1: 140, ctrlX2: 68, ctrlY2: 170, endX: 75, endY: 192 },
            { startX: 77, startY: 108, ctrlX1: 77, ctrlY1: 138, ctrlX2: 74, ctrlY2: 168, endX: 81, endY: 192 },
            { startX: 80, startY: 108, ctrlX1: 83, ctrlY1: 138, ctrlX2: 82, ctrlY2: 168, endX: 87, endY: 192 },
            { startX: 83, startY: 109, ctrlX1: 89, ctrlY1: 142, ctrlX2: 92, ctrlY2: 170, endX: 92, endY: 192 },
          ].map((blade, idx) => (
            <g key={idx}>
              {/* 刀锋阴影面 */}
              <path
                d={`M ${blade.startX} ${blade.startY} C ${blade.ctrlX1} ${blade.ctrlY1}, ${blade.ctrlX2} ${blade.ctrlY2}, ${blade.endX} ${blade.endY} L ${blade.endX + 2.5} ${blade.endY} C ${blade.ctrlX2 + 2.5} ${blade.ctrlY2}, ${blade.ctrlX1 + 2.0} ${blade.ctrlY1}, ${blade.startX + 1.5} ${blade.startY} Z`}
                fill="#1e293b"
                opacity="0.32"
              />
              {/* 刀锋锐利白色珠光高亮脊线 */}
              <path
                d={`M ${blade.startX} ${blade.startY} C ${blade.ctrlX1} ${blade.ctrlY1}, ${blade.ctrlX2} ${blade.ctrlY2}, ${blade.endX} ${blade.endY}`}
                stroke="#ffffff"
                strokeWidth="1.6"
                fill="none"
                opacity="0.95"
              />
            </g>
          ))}

          {/* 珠光弧形泛光 */}
          <ellipse cx="66" cy="168" rx="8" ry="18" fill="#ffffff" opacity="0.45" transform="rotate(-20 66 168)" />
        </g>

        {/* 圈足 */}
        <path d="M 61 192 Q 75 194.5 89 192 L 88 195 Q 75 197 62 195 Z" fill="#94a3b8" stroke="#334155" strokeWidth="1.6" />

        {/* 喇叭前唇 */}
        <path
          d="M 64.5 107 Q 75 109.5 85.5 107 C 85.5 111, 64.5 111, 64.5 107 Z"
          fill="#f8fafc"
          stroke="#334155"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M 66 108 Q 75 109.8 84 108" stroke="#ffffff" strokeWidth="1.0" fill="none" opacity="0.95" />
      </g>
    );
  },
};
