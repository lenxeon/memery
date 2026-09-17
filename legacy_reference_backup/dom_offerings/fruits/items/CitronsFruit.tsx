/**
 * @file CitronsFruit.tsx
 * @description 【福寿双全】案头清供之首 · 禅意开指佛手柑工笔写实供品组件。
 * 遵循真实开指佛手写生结构：
 * 1. 掌部浑然一体：指瓣绝非从根部分叉，下半身是连绵圆润的肉质大基部，自然卧于白玉盘内。
 * 2. 中位自然分瓣：手指在中高位渐次分离舒展，中央主峰挺拔昂首，两侧与右翼横舒指瓣如兰花曼舞。
 * 3. 梢头极细外卷：指尖细锐且天然外翻，末梢伴有生动上翘反勾与天然随机微曲。
 * 4. 纵向肌理交融：纵向指沟自然汇流于果蒂，脊线微光流淌，前衬苍翠柑橘叶卧盘托底。
 */
import React from 'react';
import { FruitProps } from '../types';
import { BaseFruitDish } from '../BaseFruitDish';

export const CitronsFruit: React.FC<FruitProps> = ({ scale, className, onClick }) => {
  const defs = (
    <>
      {/* 1. 佛手金身主体渐变 (明净蜜蜡黄至温润琥珀金) */}
      <radialGradient id="citronGoldGrad" cx="36%" cy="38%" r="66%">
        <stop offset="0%" stopColor="#fef9c3" />
        <stop offset="18%" stopColor="#fef08a" />
        <stop offset="42%" stopColor="#fde047" />
        <stop offset="68%" stopColor="#eab308" />
        <stop offset="88%" stopColor="#ca8a04" />
        <stop offset="100%" stopColor="#854d0e" />
      </radialGradient>

      {/* 2. 前排佛指脊背柔润高光渐变 */}
      <linearGradient id="citronRidgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.88" />
        <stop offset="30%" stopColor="#fef9c3" stopOpacity="0.7" />
        <stop offset="70%" stopColor="#fde047" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
      </linearGradient>

      {/* 3. 鲜活柑橘叶片渐变 (苍翠带润) */}
      <linearGradient id="citronLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#86efac" />
        <stop offset="28%" stopColor="#22c55e" />
        <stop offset="72%" stopColor="#15803d" />
        <stop offset="100%" stopColor="#064e3b" />
      </linearGradient>

      {/* 4. 木质果梗渐变 */}
      <linearGradient id="citronStemWood" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#854d0e" />
        <stop offset="50%" stopColor="#542b08" />
        <stop offset="100%" stopColor="#290f02" />
      </linearGradient>

      {/* 5. 佛手坐盘接触深影 */}
      <radialGradient id="citronCavityOcclusion" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#291202" stopOpacity="0.85" />
        <stop offset="60%" stopColor="#451a03" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
    </>
  );

  return (
    <BaseFruitDish
      title="清供圣果 · 佛手（福寿双全）"
      nextName="阳光玫瑰"
      scale={scale}
      className={className}
      onClick={onClick}
      defsSlot={defs}
    >
      <g id="buddhasHandCitronGroup">
        {/* ── 0. 佛手坐盘接地接触深影 ── */}
        <ellipse cx="52" cy="56.5" rx="30" ry="6.8" fill="url(#citronCavityOcclusion)" />

        {/* ── 1. 【真实真形】开指佛手整体主轮廓 (连绵肉质果身与向外翻卷之灵动指尖) ── */}
        <path
          d="M 48.92 5.0 L 50.04 5.0 L 50.75 5.61 L 49.06 6.31 L 47.94 8.23 L 47.37 12.57 L 48.22 17.83 L 48.78 17.93 L 49.06 17.12 L 48.64 16.51 L 48.92 14.7 L 50.75 12.27 L 52.01 11.46 L 54.12 11.36 L 52.85 12.78 L 52.57 13.79 L 52.85 16.01 L 53.84 18.03 L 50.89 20.35 L 50.89 21.26 L 53.42 18.84 L 54.54 18.33 L 54.4 17.83 L 55.81 17.42 L 55.95 17.93 L 57.35 16.01 L 59.04 15.4 L 63.82 14.7 L 65.08 15.0 L 66.63 16.01 L 66.49 17.12 L 64.94 16.51 L 63.25 16.61 L 60.58 17.83 L 58.48 19.54 L 55.81 23.08 L 56.65 25.4 L 61.85 23.38 L 64.66 23.48 L 65.92 24.59 L 67.47 23.78 L 68.17 23.78 L 68.17 25.6 L 66.49 27.92 L 66.63 28.23 L 67.33 28.23 L 70.98 26.41 L 74.5 23.68 L 76.18 21.56 L 76.32 19.85 L 76.75 19.74 L 77.59 20.75 L 77.45 22.77 L 76.75 24.39 L 74.22 27.82 L 71.55 29.94 L 72.11 30.15 L 72.95 29.44 L 74.64 29.34 L 78.01 27.22 L 79.7 24.49 L 79.28 22.17 L 80.26 22.27 L 81.52 23.18 L 82.09 25.4 L 80.82 28.33 L 78.71 30.55 L 73.37 33.68 L 73.51 34.49 L 74.92 34.59 L 76.89 33.98 L 79.84 33.88 L 85.46 32.57 L 87.99 31.36 L 89.25 29.94 L 89.39 28.63 L 87.99 27.52 L 90.38 27.22 L 91.64 27.92 L 92.35 29.24 L 92.35 31.06 L 90.24 33.88 L 87.57 35.9 L 82.51 38.23 L 79.98 38.83 L 79.7 39.24 L 80.68 41.96 L 85.88 42.27 L 87.85 41.36 L 86.86 39.94 L 88.55 40.14 L 90.24 41.56 L 93.05 39.03 L 92.77 37.22 L 93.89 37.22 L 95.3 38.23 L 95.72 40.25 L 94.31 42.97 L 92.77 44.39 L 88.97 46.61 L 83.91 48.12 L 81.95 47.92 L 81.81 48.22 L 79.84 48.43 L 78.99 48.02 L 77.31 47.92 L 76.61 47.31 L 76.32 48.12 L 75.62 48.12 L 75.06 48.02 L 75.48 47.52 L 74.64 46.71 L 74.36 47.72 L 73.79 47.92 L 73.37 47.92 L 73.79 47.42 L 73.37 47.21 L 72.11 47.31 L 71.83 48.02 L 69.16 47.82 L 67.89 47.31 L 67.61 47.82 L 66.06 47.92 L 64.8 48.63 L 63.11 48.22 L 61.85 48.73 L 60.58 48.63 L 60.44 49.23 L 57.77 50.14 L 55.52 50.45 L 54.4 51.15 L 53.14 51.25 L 52.15 52.06 L 49.9 52.16 L 49.2 51.86 L 49.06 52.36 L 48.22 52.77 L 46.81 53.17 L 44.84 52.97 L 44.84 53.48 L 43.58 53.68 L 43.44 53.27 L 42.31 52.87 L 43.58 51.46 L 44.7 51.76 L 45.55 50.85 L 47.65 50.45 L 48.36 49.94 L 49.2 50.24 L 51.87 48.83 L 54.4 48.12 L 55.1 47.52 L 55.52 47.92 L 55.66 47.42 L 57.21 47.62 L 59.32 46.61 L 60.16 46.71 L 62.13 45.4 L 63.39 45.09 L 64.1 45.3 L 64.94 44.49 L 63.96 43.28 L 64.1 42.77 L 67.61 42.16 L 70.0 42.16 L 69.86 41.76 L 71.69 41.26 L 74.78 41.76 L 77.73 41.66 L 78.29 39.34 L 73.65 40.35 L 69.3 39.24 L 68.59 40.35 L 67.61 40.55 L 66.21 40.04 L 59.32 43.78 L 57.91 44.89 L 56.65 45.19 L 50.61 48.22 L 49.34 48.63 L 47.37 48.22 L 46.95 48.93 L 45.69 48.83 L 44.56 50.14 L 41.75 50.24 L 40.91 50.85 L 40.06 49.94 L 39.22 50.85 L 39.36 51.96 L 37.11 52.57 L 36.27 53.88 L 34.72 53.17 L 33.6 53.17 L 33.6 53.88 L 32.19 53.88 L 31.21 54.28 L 31.35 54.79 L 34.72 54.79 L 34.58 55.5 L 33.04 57.11 L 32.9 58.02 L 31.07 57.82 L 31.49 58.12 L 31.35 58.73 L 28.68 58.73 L 27.42 56.71 L 27.7 58.73 L 26.15 58.73 L 26.57 58.32 L 25.87 57.41 L 25.31 57.82 L 23.9 56.71 L 23.62 55.6 L 25.31 54.69 L 26.43 54.89 L 27.42 56.5 L 28.4 55.39 L 28.68 54.08 L 28.12 53.98 L 28.12 54.59 L 27.56 54.38 L 27.14 53.27 L 27.7 52.47 L 27.42 52.16 L 26.99 52.06 L 26.57 52.77 L 25.87 52.77 L 22.22 54.79 L 21.65 54.59 L 25.45 52.47 L 24.61 52.16 L 24.46 51.56 L 23.9 51.66 L 24.04 51.15 L 24.61 51.56 L 25.31 51.46 L 24.89 50.95 L 22.78 50.85 L 22.36 51.46 L 23.76 52.26 L 23.76 52.87 L 21.65 53.78 L 18.28 52.16 L 18.7 51.86 L 18.56 50.85 L 19.26 50.34 L 18.28 46.61 L 18.98 45.4 L 20.25 45.4 L 19.41 44.49 L 20.95 44.18 L 20.53 43.28 L 20.81 42.97 L 21.65 43.07 L 21.65 42.06 L 22.5 41.76 L 21.94 40.85 L 23.62 38.83 L 23.76 37.52 L 25.17 36.81 L 24.89 36.41 L 26.43 36.51 L 26.57 36.1 L 26.01 35.7 L 26.99 35.5 L 28.4 33.78 L 29.24 33.38 L 29.66 32.17 L 31.21 31.26 L 31.63 30.25 L 32.62 30.15 L 32.9 28.63 L 34.02 28.43 L 35.57 25.6 L 36.83 25.4 L 36.27 24.9 L 36.69 24.39 L 36.41 23.78 L 36.97 23.68 L 37.25 24.59 L 37.68 23.78 L 36.83 23.08 L 37.54 22.47 L 37.96 19.74 L 37.25 19.14 L 36.83 19.44 L 37.54 20.25 L 36.55 20.15 L 35.99 17.02 L 34.3 13.58 L 30.93 10.86 L 29.38 10.35 L 26.57 10.76 L 26.71 10.05 L 28.68 8.94 L 30.51 8.84 L 33.18 9.24 L 37.54 11.46 L 39.22 12.78 L 41.33 15.3 L 41.89 15.4 L 42.45 14.19 L 42.17 12.27 L 40.91 10.55 L 38.94 9.24 L 40.91 8.94 L 44.14 10.25 L 45.26 7.52 L 47.65 5.5 L 48.78 5.1 Z"
          fill="url(#citronGoldGrad)"
          stroke="#ca8a04"
          strokeWidth="0.25"
        />

        {/* ── 2. 指间微凹自然过渡 (仅在指间分叉处保留极淡自然阴影，绝不生硬划线) ── */}
        <g id="citronValleys">
          <path d="M 35 24 C 35.5 19, 36 15, 36.5 12" stroke="#b45309" strokeWidth="0.35" fill="none" opacity="0.25" strokeLinecap="round" />
          <path d="M 42 22 C 43 18, 44 14, 44.5 10" stroke="#b45309" strokeWidth="0.35" fill="none" opacity="0.25" strokeLinecap="round" />
          <path d="M 50 24 C 52 19, 54 16, 56.5 13" stroke="#b45309" strokeWidth="0.35" fill="none" opacity="0.25" strokeLinecap="round" />
          <path d="M 59 28 C 63 24, 67 21, 71 18" stroke="#b45309" strokeWidth="0.35" fill="none" opacity="0.25" strokeLinecap="round" />
          <path d="M 68 33 C 73 29, 77 26, 81.5 24" stroke="#b45309" strokeWidth="0.35" fill="none" opacity="0.25" strokeLinecap="round" />
        </g>

        {/* ── 3. 丰腴肉质漫反射微光 (温润大光晕取代生硬细尖高光线，消除“刺”感) ── */}
        <g id="citronHighlights">
          {/* 指背宽阔温润微光 (Soft Diffuse Glows) */}
          <path d="M 38 28 C 40 22, 43 16, 46 10" stroke="#ffffff" strokeWidth="2.0" fill="none" opacity="0.18" strokeLinecap="round" />
          <path d="M 46 32 C 51 24, 57 18, 63 14" stroke="#ffffff" strokeWidth="2.0" fill="none" opacity="0.18" strokeLinecap="round" />
          <path d="M 54 36 C 62 29, 70 24, 76 20" stroke="#ffffff" strokeWidth="1.8" fill="none" opacity="0.16" strokeLinecap="round" />

          {/* 饱满掌部肉质向阳大柔光 */}
          <ellipse cx="40" cy="42" rx="14" ry="8" fill="#fefce8" opacity="0.32" transform="rotate(-18, 40, 42)" />
          <ellipse cx="56" cy="38" rx="11" ry="6" fill="#fef9c3" opacity="0.25" transform="rotate(-12, 56, 38)" />
        </g>

        {/* ── 4. 枝叶典雅配衬 (横卧托底苍翠大叶与左侧老桩果柄) ── */}
        <g id="citronFoliage">
          {/* 横卧盘心下沿之苍翠大叶 (Cradle Leaf) */}
          <path
            d="M 44 52 C 54 45, 68 44, 82 48 C 85 52, 75 57, 63 57 C 52 57, 44 54, 44 52 Z"
            fill="url(#citronLeafGrad)"
            stroke="#064e3b"
            strokeWidth="0.4"
          />
          <path d="M 45 51 Q 62 50 80 49" stroke="#dcfce7" strokeWidth="0.55" fill="none" opacity="0.85" />
          <path d="M 54 51 Q 59 53 62 56" stroke="#dcfce7" strokeWidth="0.35" fill="none" opacity="0.6" />
          <path d="M 64 50 Q 69 52 72 54" stroke="#dcfce7" strokeWidth="0.35" fill="none" opacity="0.6" />

          {/* 左侧老桩木质小梗 */}
          <path d="M 25 51 C 19 53, 14 54, 10 55" stroke="url(#citronStemWood)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <ellipse cx="10" cy="55" rx="1.1" ry="1.8" fill="#d4b584" stroke="#451a03" strokeWidth="0.4" />

          {/* 左侧斜拂苍翠小叶 */}
          <path
            d="M 22 50 C 15 43, 12 35, 13 27 C 18 30, 21 40, 23 48 Z"
            fill="url(#citronLeafGrad)"
            stroke="#064e3b"
            strokeWidth="0.35"
          />
          <path d="M 22 48 Q 16 38 14 29" stroke="#dcfce7" strokeWidth="0.4" fill="none" opacity="0.8" />
        </g>

        {/* ── 5. 白玉描金盘前沿环境温润反光 ── */}
        <g id="citronDishReflection" pointerEvents="none">
          <path d="M 34 54 Q 52 58 68 54" stroke="#fef08a" strokeWidth="0.8" fill="none" opacity="0.45" />
        </g>
      </g>
    </BaseFruitDish>
  );
};
