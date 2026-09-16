/**
 * @file KumquatsFruit.tsx
 * @description 【青云直上 · 大吉大利】翡翠青桔工笔写实供品组件。
 * 小巧玲珑青翠欲滴，金字塔式错落堆叠于白玉高足盘中，
 * 翠绿向嫩黄青透渐变，点缀五星星芒小果蒂与清雅带露小桔叶。
 */
import React from 'react';
import { FruitProps } from '../types';
import { BaseFruitDish } from '../BaseFruitDish';

export const KumquatsFruit: React.FC<FruitProps> = ({ scale, className, onClick }) => {
  const defs = (
    <>
      {/* 1. 翡翠青桔主体渐变 (透亮嫩绿至浓郁青翠，带微弱向阳柠檬黄) */}
      <radialGradient id="kumquatGreenGrad" cx="38%" cy="32%" r="65%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="18%" stopColor="#bef264" />
        <stop offset="48%" stopColor="#65a30d" />
        <stop offset="78%" stopColor="#15803d" />
        <stop offset="100%" stopColor="#064e3b" />
      </radialGradient>

      {/* 2. 后景青桔暗部渐变 */}
      <radialGradient id="kumquatBackGrad" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#4d7c0f" />
        <stop offset="60%" stopColor="#14532d" />
        <stop offset="100%" stopColor="#022c22" />
      </radialGradient>

      {/* 3. 青桔水润高光漫射 */}
      <radialGradient id="kumquatSheen" cx="35%" cy="30%" r="45%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
        <stop offset="40%" stopColor="#d9f99d" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
      </radialGradient>

      {/* 4. 鲜活小桔叶渐变 */}
      <linearGradient id="kumquatLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#86efac" />
        <stop offset="30%" stopColor="#22c55e" />
        <stop offset="75%" stopColor="#15803d" />
        <stop offset="100%" stopColor="#064e3b" />
      </linearGradient>

      {/* 5. 盘底接触深影 */}
      <radialGradient id="kumquatPlateOcclusion" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#022c22" stopOpacity="0.8" />
        <stop offset="60%" stopColor="#064e3b" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
    </>
  );

  return (
    <BaseFruitDish
      title="清雅供果 · 青桔（青云直上）"
      nextName="红运火龙果"
      scale={scale}
      className={className}
      onClick={onClick}
      defsSlot={defs}
    >
      <g id="kumquatsGroup">
        {/* ── 0. 盘心托底阴影 ── */}
        <ellipse cx="54" cy="56" rx="27" ry="6" fill="url(#kumquatPlateOcclusion)" />

        {/* ── 1. 后排侧生青桔叶 ── */}
        <g id="kumquatFoliageBack">
          {/* 左后上扬桔叶 */}
          <path
            d="M 32 38 C 24 30, 16 22, 14 14 C 20 16, 29 26, 36 36 Z"
            fill="url(#kumquatLeafGrad)"
            stroke="#064e3b"
            strokeWidth="0.35"
          />
          <path d="M 32 36 Q 22 23 15 15" stroke="#bbf7d0" strokeWidth="0.4" fill="none" opacity="0.75" />

          {/* 右后轻展桔叶 */}
          <path
            d="M 68 40 C 76 32, 86 24, 93 20 C 90 27, 80 37, 72 43 Z"
            fill="url(#kumquatLeafGrad)"
            stroke="#064e3b"
            strokeWidth="0.35"
          />
          <path d="M 70 41 Q 81 31 91 22" stroke="#bbf7d0" strokeWidth="0.4" fill="none" opacity="0.75" />
        </g>

        {/* ── 2. 底层暗部青桔 (Back Layer) ── */}
        <g id="kumquatBackLayer">
          {/* 后左 1 */}
          <circle cx="37" cy="46" r="9.2" fill="url(#kumquatBackGrad)" stroke="#064e3b" strokeWidth="0.3" />
          {/* 后右 1 */}
          <circle cx="70" cy="47" r="9.4" fill="url(#kumquatBackGrad)" stroke="#064e3b" strokeWidth="0.3" />
        </g>

        {/* ── 3. 前景饱满青桔群 (精巧叠堆，带星芒小蒂点) ── */}
        <g id="kumquatFrontLayer">
          {/* 【青桔 1: 左侧饱满】 */}
          <g id="k1">
            <ellipse cx="33" cy="51" rx="9.8" ry="9" fill="url(#kumquatGreenGrad)" stroke="#166534" strokeWidth="0.35" />
            <ellipse cx="30" cy="48" rx="4" ry="2.8" fill="url(#kumquatSheen)" transform="rotate(-15, 30, 48)" />
            {/* 星芒花萼蒂 */}
            <path d="M 33 44 L 34 46 L 36 46 L 34.5 47.5 L 35 49.5 L 33 48 L 31 49.5 L 31.5 47.5 L 30 46 L 32 46 Z" fill="#14532d" />
            <circle cx="33" cy="46.5" r="0.65" fill="#dcfce7" />
          </g>

          {/* 【青桔 2: 中前主力】 */}
          <g id="k2">
            <ellipse cx="50" cy="52" rx="10.2" ry="9.4" fill="url(#kumquatGreenGrad)" stroke="#166534" strokeWidth="0.35" />
            <ellipse cx="46.5" cy="48.5" rx="4.5" ry="3" fill="url(#kumquatSheen)" transform="rotate(-10, 46.5, 48.5)" />
            {/* 星芒花萼蒂 */}
            <path d="M 50 45 L 51 47 L 53 47 L 51.5 48.5 L 52 50.5 L 50 49 L 48 50.5 L 48.5 48.5 L 47 47 L 49 47 Z" fill="#14532d" />
            <circle cx="50" cy="47.5" r="0.7" fill="#dcfce7" />
          </g>

          {/* 【青桔 3: 右侧微展】 */}
          <g id="k3">
            <ellipse cx="66" cy="51" rx="9.8" ry="9" fill="url(#kumquatGreenGrad)" stroke="#166534" strokeWidth="0.35" />
            <ellipse cx="63" cy="48" rx="4" ry="2.8" fill="url(#kumquatSheen)" transform="rotate(-15, 63, 48)" />
            {/* 星芒花萼蒂 */}
            <path d="M 66 44.5 L 67 46.5 L 69 46.5 L 67.5 48 L 68 50 L 66 48.5 L 64 50 L 64.5 48 L 63 46.5 L 65 46.5 Z" fill="#14532d" />
            <circle cx="66" cy="47" r="0.65" fill="#dcfce7" />
          </g>

          {/* 【青桔 4: 顶峰聚顶】 */}
          <g id="k4">
            <ellipse cx="44" cy="38" rx="9.6" ry="8.8" fill="url(#kumquatGreenGrad)" stroke="#166534" strokeWidth="0.35" />
            <ellipse cx="40.5" cy="34.5" rx="4.2" ry="2.8" fill="url(#kumquatSheen)" transform="rotate(-15, 40.5, 34.5)" />
            {/* 果蒂带一小段小枝梗 */}
            <path d="M 44 31 C 45 28, 46 25, 47 23" stroke="#4d7c0f" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <circle cx="44" cy="31" r="1.1" fill="#14532d" />
          </g>

          {/* 【青桔 5: 顶后依偎】 */}
          <g id="k5">
            <ellipse cx="58" cy="40" rx="9.5" ry="8.7" fill="url(#kumquatGreenGrad)" stroke="#166534" strokeWidth="0.35" />
            <ellipse cx="55" cy="36.5" rx="3.8" ry="2.6" fill="url(#kumquatSheen)" transform="rotate(-10, 55, 36.5)" />
            <circle cx="58" cy="33.5" r="1" fill="#14532d" />
          </g>
        </g>

        {/* ── 4. 前沿娇嫩小叶拂盘 (Front Leaf Accent) ── */}
        <g id="kumquatFoliageFront">
          <path
            d="M 28 53 C 21 54, 13 58, 9 64 C 14 65, 23 62, 30 55 Z"
            fill="url(#kumquatLeafGrad)"
            stroke="#064e3b"
            strokeWidth="0.4"
          />
          <path d="M 28 54 Q 18 60 11 63" stroke="#bbf7d0" strokeWidth="0.4" fill="none" opacity="0.8" />
        </g>

        {/* ── 5. 白玉描金盘前沿反光 ── */}
        <g id="kumquatDishReflection" pointerEvents="none">
          <path d="M 34 54 Q 52 58 68 54" stroke="#fef08a" strokeWidth="0.8" fill="none" opacity="0.4" />
        </g>
      </g>
    </BaseFruitDish>
  );
};
