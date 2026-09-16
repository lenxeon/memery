/**
 * @file PineapplesFruit.tsx
 * @description 【好运旺来 · 财源滚滚】祥瑞金凤梨（旺来）工笔写实供品组件。
 * 遵循真实成熟金钻凤梨修长挺拔的高耸圆柱体态（Tall Cylindrical Barrel）：
 * 1. 挺拔修长黄金果身：告别矮胖体态，呈现传统供案名品凤梨的高耸柱状身姿。
 * 2. 顶戴威仪尊贵的“凤尾翠冠”：剑形深翠叶冠层叠冲天与向外舒展飞扬。
 * 3. 6 层精细错落的六角菱形“凤梨果目”（苞片立体包覆、深琥珀交织沟槽）。
 * 4. 稳坐白玉高足描金盘内，寓意“好运旺来、财源滚滚、家业隆盛”。
 */
import React from 'react';
import { FruitProps } from '../types';
import { BaseFruitDish } from '../BaseFruitDish';

export const PineapplesFruit: React.FC<FruitProps> = ({ scale, className, onClick }) => {
  const defs = (
    <>
      {/* 1. 凤梨果身黄金主体渐变 */}
      <radialGradient id="pineappleGoldGrad" cx="38%" cy="32%" r="65%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="28%" stopColor="#fde047" />
        <stop offset="58%" stopColor="#eab308" />
        <stop offset="85%" stopColor="#ca8a04" />
        <stop offset="100%" stopColor="#854d0e" />
      </radialGradient>

      {/* 2. 凤尾翠冠叶片渐变 (深翠至黄绿反卷) */}
      <linearGradient id="crownLeafGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#064e3b" />
        <stop offset="35%" stopColor="#15803d" />
        <stop offset="70%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#86efac" />
      </linearGradient>

      {/* 3. 果目鳞片中心受光高光 */}
      <radialGradient id="eyeCenterGlow" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
        <stop offset="45%" stopColor="#fef08a" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
      </radialGradient>

      {/* 4. 盘底接地深影 */}
      <radialGradient id="pineapplePlateOcclusion" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#291202" stopOpacity="0.85" />
        <stop offset="60%" stopColor="#451a03" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
    </>
  );

  // 单个凤梨果目菱形鳞片渲染
  const renderEye = (cx: number, cy: number, rx: number, ry: number) => (
    <g key={`eye_${cx}_${cy}`}>
      {/* 六角形果目单元 */}
      <polygon
        points={`
          ${cx},${cy - ry} 
          ${cx + rx * 0.95},${cy - ry * 0.45} 
          ${cx + rx * 0.95},${cy + ry * 0.45} 
          ${cx},${cy + ry} 
          ${cx - rx * 0.95},${cy + ry * 0.45} 
          ${cx - rx * 0.95},${cy - ry * 0.45}
        `}
        fill="url(#pineappleGoldGrad)"
        stroke="#854d0e"
        strokeWidth="0.38"
      />
      {/* 中心苞片小尖与微光 */}
      <polygon
        points={`${cx},${cy - ry * 0.55} ${cx + rx * 0.4},${cy + ry * 0.2} ${cx - rx * 0.4},${cy + ry * 0.2}`}
        fill="#a16207"
        opacity="0.8"
      />
      <circle cx={cx} cy={cy - 0.4} r={rx * 0.32} fill="url(#eyeCenterGlow)" />
    </g>
  );

  return (
    <BaseFruitDish
      title="祥瑞金果 · 凤梨（好运旺来）"
      nextName="金秋秋月梨"
      scale={scale}
      className={className}
      onClick={onClick}
      defsSlot={defs}
    >
      <g id="pineapplesFruitGroup">
        {/* ── 0. 盘底接地深影 ── */}
        <ellipse cx="54" cy="56.5" rx="26" ry="6.2" fill="url(#pineapplePlateOcclusion)" />

        {/* ── 1. 顶戴威仪凤尾翠冠 (Crown of Spiky Leaves) ── */}
        <g id="pineappleCrown">
          {/* 后排外展长叶 */}
          <path d="M 52 18 C 42 9, 30 3, 22 0 C 30 5, 42 12, 48 19 Z" fill="url(#crownLeafGrad)" stroke="#064e3b" strokeWidth="0.3" />
          <path d="M 56 18 C 66 9, 78 3, 86 0 C 78 5, 66 12, 60 19 Z" fill="url(#crownLeafGrad)" stroke="#064e3b" strokeWidth="0.3" />

          {/* 后排次高叶 */}
          <path d="M 50 17 C 43 7, 36 2, 31 -3 C 38 3, 45 10, 50 18 Z" fill="url(#crownLeafGrad)" stroke="#064e3b" strokeWidth="0.3" />
          <path d="M 58 17 C 65 7, 72 2, 77 -3 C 70 3, 63 10, 58 18 Z" fill="url(#crownLeafGrad)" stroke="#064e3b" strokeWidth="0.3" />

          {/* 中央冲天主冠剑叶 */}
          <path d="M 52 17 C 50 7, 50 -1, 54 -5 C 57 -1, 57 7, 55 17 Z" fill="url(#crownLeafGrad)" stroke="#064e3b" strokeWidth="0.35" />

          {/* 前排向前下翻短冠叶 */}
          <path d="M 48 19 C 40 13, 33 11, 27 10 C 34 14, 42 17, 47 20 Z" fill="url(#crownLeafGrad)" stroke="#064e3b" strokeWidth="0.3" />
          <path d="M 60 19 C 68 13, 75 11, 81 10 C 74 14, 66 17, 61 20 Z" fill="url(#crownLeafGrad)" stroke="#064e3b" strokeWidth="0.3" />
          <path d="M 53 18 C 50 11, 46 9, 43 5 C 50 9, 52 13, 52 19 Z" fill="url(#crownLeafGrad)" stroke="#064e3b" strokeWidth="0.3" />
          <path d="M 55 18 C 58 11, 62 9, 65 5 C 58 9, 56 13, 56 19 Z" fill="url(#crownLeafGrad)" stroke="#064e3b" strokeWidth="0.3" />
        </g>

        {/* ── 2. 修长挺拔高挑黄金果身 (Tall Slender Barrel Body) ── */}
        <g id="pineappleBody">
          {/* 纵向高度从 y=17 延伸到 y=58 (高41px)，横向宽约 37px，修长高大 */}
          <path
            d="M 44 17 
               C 38 19, 35 24, 34 32 
               C 33 41, 35 50, 42 55.5 
               C 47 58, 61 58, 66 55.5 
               C 73 50, 75 41, 74 32 
               C 73 24, 70 19, 64 17 
               C 58 16, 50 16, 44 17 Z"
            fill="url(#pineappleGoldGrad)"
            stroke="#854d0e"
            strokeWidth="0.42"
          />

          {/* 规整错落的六角菱形凤梨果目阵列 (6 Tiered Interlocking Diamond Eyes) */}
          <g id="pineappleEyes">
            {/* 第 1 排 (y=21) */}
            {renderEye(45, 21, 4.2, 2.9)}
            {renderEye(54, 21, 4.4, 2.9)}
            {renderEye(63, 21, 4.2, 2.9)}

            {/* 第 2 排 (y=27) */}
            {renderEye(40, 27, 4.3, 3.1)}
            {renderEye(49, 27, 4.6, 3.2)}
            {renderEye(59, 27, 4.6, 3.2)}
            {renderEye(68, 27, 4.3, 3.1)}

            {/* 第 3 排 (y=33) */}
            {renderEye(37, 33, 4.4, 3.2)}
            {renderEye(46, 33, 4.8, 3.4)}
            {renderEye(56, 33, 4.8, 3.4)}
            {renderEye(65, 33, 4.6, 3.3)}
            {renderEye(72, 33, 3.8, 3.0)}

            {/* 第 4 排 (y=40) */}
            {renderEye(37, 40, 4.4, 3.2)}
            {renderEye(46, 40, 4.8, 3.4)}
            {renderEye(56, 40, 4.8, 3.4)}
            {renderEye(65, 40, 4.6, 3.3)}
            {renderEye(72, 40, 3.8, 3.0)}

            {/* 第 5 排 (y=47) */}
            {renderEye(40, 47, 4.5, 3.2)}
            {renderEye(49, 47, 4.8, 3.3)}
            {renderEye(59, 47, 4.8, 3.3)}
            {renderEye(68, 47, 4.4, 3.2)}

            {/* 第 6 排 (下腹贴盘 y=53) */}
            {renderEye(45, 53, 4.2, 3.0)}
            {renderEye(54, 53, 4.5, 3.0)}
            {renderEye(63, 53, 4.2, 3.0)}
          </g>

          {/* 果身柔和蜡质漫反射微光 */}
          <ellipse cx="46" cy="35" rx="12" ry="15" fill="#ffffff" opacity="0.2" transform="rotate(-10, 46, 35)" />
        </g>

        {/* ── 3. 盘沿温润反光 ── */}
        <path d="M 34 54 Q 52 58 68 54" stroke="#fde047" strokeWidth="0.8" fill="none" opacity="0.45" pointerEvents="none" />
      </g>
    </BaseFruitDish>
  );
};
