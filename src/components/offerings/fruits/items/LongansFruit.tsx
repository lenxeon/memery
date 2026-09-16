/**
 * @file LongansFruit.tsx
 * @description 【富贵团圆 · 龙腾祥瑞】富贵龙眼（桂圆）工笔写实供品组件。
 * 珠圆玉润攒叠成丘，温润金褐木质壳泽，前右侧精雕一颗半剥壳晶莹凝脂白肉，
 * 细木小枝穿插，深翠细长龙眼叶掩映，稳坐于羊脂白玉描金高足盘中。
 */
import React from 'react';
import { FruitProps } from '../types';
import { BaseFruitDish } from '../BaseFruitDish';

export const LongansFruit: React.FC<FruitProps> = ({ scale, className, onClick }) => {
  const defs = (
    <>
      {/* 1. 真实龙眼外壳渐变 (自然温润的浅卡其土黄、浅沙褐色木质外壳，绝不偏黑) */}
      <radialGradient id="longanWarmShellGrad" cx="35%" cy="30%" r="68%">
        <stop offset="0%" stopColor="#fef9c3" />
        <stop offset="22%" stopColor="#fde68a" />
        <stop offset="55%" stopColor="#d4a373" />
        <stop offset="85%" stopColor="#b08968" />
        <stop offset="100%" stopColor="#7c522f" />
      </radialGradient>

      {/* 2. 后景深层龙眼阴影渐变 (暖木赭褐，层次分明) */}
      <radialGradient id="longanBackMoundGrad" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#c59265" />
        <stop offset="65%" stopColor="#8c5c36" />
        <stop offset="100%" stopColor="#543319" />
      </radialGradient>

      {/* 3. 盘底接触阴影 */}
      <radialGradient id="longanPlateOcclusion" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#3b1f0b" stopOpacity="0.85" />
        <stop offset="60%" stopColor="#543319" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
    </>
  );

  return (
    <BaseFruitDish
      title="富贵供果 · 龙眼（团圆吉庆）"
      nextName="招财金蕉"
      scale={scale}
      className={className}
      onClick={onClick}
      defsSlot={defs}
    >
      <g id="longansGroup">
        {/* ── 0. 盘心托底深影 ── */}
        <ellipse cx="54" cy="56.5" rx="30" ry="6.5" fill="url(#longanPlateOcclusion)" />

        {/* ── 1. 底层与后景龙眼群 (深层丰满托底，垫出高大果丘) ── */}
        <g id="longanBackLayer">
          <circle cx="28" cy="48" r="5.6" fill="url(#longanBackMoundGrad)" stroke="#543319" strokeWidth="0.3" />
          <circle cx="36" cy="44" r="5.7" fill="url(#longanBackMoundGrad)" stroke="#543319" strokeWidth="0.3" />
          <circle cx="45" cy="40" r="5.8" fill="url(#longanBackMoundGrad)" stroke="#543319" strokeWidth="0.3" />
          <circle cx="55" cy="38" r="5.8" fill="url(#longanBackMoundGrad)" stroke="#543319" strokeWidth="0.3" />
          <circle cx="64" cy="40" r="5.7" fill="url(#longanBackMoundGrad)" stroke="#543319" strokeWidth="0.3" />
          <circle cx="73" cy="44" r="5.7" fill="url(#longanBackMoundGrad)" stroke="#543319" strokeWidth="0.3" />
          <circle cx="80" cy="48" r="5.6" fill="url(#longanBackMoundGrad)" stroke="#543319" strokeWidth="0.3" />

          {/* 顶后二层 */}
          <circle cx="42" cy="33" r="5.6" fill="url(#longanBackMoundGrad)" stroke="#543319" strokeWidth="0.3" />
          <circle cx="51" cy="31" r="5.8" fill="url(#longanBackMoundGrad)" stroke="#543319" strokeWidth="0.3" />
          <circle cx="60" cy="32" r="5.7" fill="url(#longanBackMoundGrad)" stroke="#543319" strokeWidth="0.3" />
          <circle cx="47" cy="25" r="5.5" fill="url(#longanBackMoundGrad)" stroke="#543319" strokeWidth="0.3" />
          <circle cx="55" cy="24" r="5.5" fill="url(#longanBackMoundGrad)" stroke="#543319" strokeWidth="0.3" />
        </g>

        {/* ── 2. 前景层层攒聚的大果丘 (全部完整圆润无咬破、浅土黄色调、珠圆玉润) ── */}
        <g id="longanFrontLayer">
          {/* 【底层前排 (坐落玉盘沿)：7颗】 */}
          <g>
            <circle cx="26" cy="54" r="5.8" fill="url(#longanWarmShellGrad)" stroke="#8c5c36" strokeWidth="0.3" />
            <ellipse cx="24.5" cy="52.2" rx="1.6" ry="1" fill="#ffffff" opacity="0.6" transform="rotate(-15, 24.5, 52.2)" />
            <circle cx="23.8" cy="53.8" r="0.45" fill="#7c522f" />
          </g>
          <g>
            <circle cx="35" cy="54.5" r="5.9" fill="url(#longanWarmShellGrad)" stroke="#8c5c36" strokeWidth="0.3" />
            <ellipse cx="33.5" cy="52.5" rx="1.7" ry="1.1" fill="#ffffff" opacity="0.6" transform="rotate(-15, 33.5, 52.5)" />
            <circle cx="32.8" cy="54" r="0.45" fill="#7c522f" />
          </g>
          <g>
            <circle cx="44.5" cy="55" r="6" fill="url(#longanWarmShellGrad)" stroke="#8c5c36" strokeWidth="0.3" />
            <ellipse cx="43" cy="53" rx="1.8" ry="1.1" fill="#ffffff" opacity="0.65" transform="rotate(-15, 43, 53)" />
            <circle cx="42.5" cy="54.5" r="0.45" fill="#7c522f" />
          </g>
          <g>
            <circle cx="54.5" cy="55.2" r="6" fill="url(#longanWarmShellGrad)" stroke="#8c5c36" strokeWidth="0.3" />
            <ellipse cx="53" cy="53.2" rx="1.8" ry="1.1" fill="#ffffff" opacity="0.65" transform="rotate(-15, 53, 53.2)" />
            <circle cx="52.5" cy="54.8" r="0.45" fill="#7c522f" />
          </g>
          <g>
            <circle cx="64.5" cy="55" r="6" fill="url(#longanWarmShellGrad)" stroke="#8c5c36" strokeWidth="0.3" />
            <ellipse cx="63" cy="53" rx="1.7" ry="1.1" fill="#ffffff" opacity="0.6" transform="rotate(-15, 63, 53)" />
            <circle cx="62.5" cy="54.5" r="0.45" fill="#7c522f" />
          </g>
          <g>
            <circle cx="74" cy="54.2" r="5.9" fill="url(#longanWarmShellGrad)" stroke="#8c5c36" strokeWidth="0.3" />
            <ellipse cx="72.5" cy="52.3" rx="1.6" ry="1" fill="#ffffff" opacity="0.6" transform="rotate(-15, 72.5, 52.3)" />
            <circle cx="72" cy="53.8" r="0.45" fill="#7c522f" />
          </g>
          <g>
            <circle cx="82.5" cy="53.5" r="5.6" fill="url(#longanWarmShellGrad)" stroke="#8c5c36" strokeWidth="0.3" />
            <ellipse cx="81" cy="51.8" rx="1.5" ry="0.9" fill="#ffffff" opacity="0.55" transform="rotate(-15, 81, 51.8)" />
            <circle cx="80.5" cy="53.2" r="0.4" fill="#7c522f" />
          </g>

          {/* 【中层前排：5颗】 */}
          <g>
            <circle cx="31" cy="47" r="5.8" fill="url(#longanWarmShellGrad)" stroke="#8c5c36" strokeWidth="0.3" />
            <ellipse cx="29.5" cy="45" rx="1.7" ry="1.1" fill="#ffffff" opacity="0.6" transform="rotate(-15, 29.5, 45)" />
          </g>
          <g>
            <circle cx="41" cy="47.5" r="5.9" fill="url(#longanWarmShellGrad)" stroke="#8c5c36" strokeWidth="0.3" />
            <ellipse cx="39.5" cy="45.5" rx="1.8" ry="1.1" fill="#ffffff" opacity="0.65" transform="rotate(-15, 39.5, 45.5)" />
          </g>
          <g>
            <circle cx="51" cy="48" r="6" fill="url(#longanWarmShellGrad)" stroke="#8c5c36" strokeWidth="0.3" />
            <ellipse cx="49.5" cy="45.8" rx="1.9" ry="1.2" fill="#ffffff" opacity="0.7" transform="rotate(-15, 49.5, 45.8)" />
          </g>
          <g>
            <circle cx="61" cy="47.5" r="5.9" fill="url(#longanWarmShellGrad)" stroke="#8c5c36" strokeWidth="0.3" />
            <ellipse cx="59.5" cy="45.5" rx="1.8" ry="1.1" fill="#ffffff" opacity="0.65" transform="rotate(-15, 59.5, 45.5)" />
          </g>
          <g>
            <circle cx="70.5" cy="46.8" r="5.8" fill="url(#longanWarmShellGrad)" stroke="#8c5c36" strokeWidth="0.3" />
            <ellipse cx="69" cy="45" rx="1.7" ry="1" fill="#ffffff" opacity="0.6" transform="rotate(-15, 69, 45)" />
          </g>

          {/* 【中上层：4颗】 */}
          <g>
            <circle cx="37" cy="39.5" r="5.8" fill="url(#longanWarmShellGrad)" stroke="#8c5c36" strokeWidth="0.3" />
            <ellipse cx="35.5" cy="37.5" rx="1.8" ry="1.1" fill="#ffffff" opacity="0.65" transform="rotate(-15, 35.5, 37.5)" />
          </g>
          <g>
            <circle cx="47" cy="40" r="5.9" fill="url(#longanWarmShellGrad)" stroke="#8c5c36" strokeWidth="0.3" />
            <ellipse cx="45.5" cy="37.8" rx="1.9" ry="1.2" fill="#ffffff" opacity="0.7" transform="rotate(-15, 45.5, 37.8)" />
          </g>
          <g>
            <circle cx="57" cy="39.5" r="5.8" fill="url(#longanWarmShellGrad)" stroke="#8c5c36" strokeWidth="0.3" />
            <ellipse cx="55.5" cy="37.5" rx="1.8" ry="1.1" fill="#ffffff" opacity="0.65" transform="rotate(-15, 55.5, 37.5)" />
          </g>
          <g>
            <circle cx="66" cy="39" r="5.7" fill="url(#longanWarmShellGrad)" stroke="#8c5c36" strokeWidth="0.3" />
            <ellipse cx="64.5" cy="37.2" rx="1.7" ry="1" fill="#ffffff" opacity="0.6" transform="rotate(-15, 64.5, 37.2)" />
          </g>

          {/* 【次顶层：3颗】 */}
          <g>
            <circle cx="42" cy="32" r="5.8" fill="url(#longanWarmShellGrad)" stroke="#8c5c36" strokeWidth="0.3" />
            <ellipse cx="40.5" cy="30" rx="1.8" ry="1.1" fill="#ffffff" opacity="0.7" transform="rotate(-15, 40.5, 30)" />
          </g>
          <g>
            <circle cx="52" cy="32.5" r="5.9" fill="url(#longanWarmShellGrad)" stroke="#8c5c36" strokeWidth="0.3" />
            <ellipse cx="50.5" cy="30.2" rx="1.9" ry="1.2" fill="#ffffff" opacity="0.75" transform="rotate(-15, 50.5, 30.2)" />
          </g>
          <g>
            <circle cx="61.5" cy="32" r="5.7" fill="url(#longanWarmShellGrad)" stroke="#8c5c36" strokeWidth="0.3" />
            <ellipse cx="60" cy="30.2" rx="1.7" ry="1" fill="#ffffff" opacity="0.65" transform="rotate(-15, 60, 30.2)" />
          </g>

          {/* 【宝塔聚顶尖层：2颗】 */}
          <g>
            <circle cx="48" cy="24.5" r="5.7" fill="url(#longanWarmShellGrad)" stroke="#8c5c36" strokeWidth="0.3" />
            <ellipse cx="46.5" cy="22.5" rx="1.8" ry="1.1" fill="#ffffff" opacity="0.75" transform="rotate(-15, 46.5, 22.5)" />
            <circle cx="48" cy="21.5" r="0.5" fill="#7c522f" />
          </g>
          <g>
            <circle cx="56" cy="25" r="5.6" fill="url(#longanWarmShellGrad)" stroke="#8c5c36" strokeWidth="0.3" />
            <ellipse cx="54.5" cy="23" rx="1.7" ry="1" fill="#ffffff" opacity="0.7" transform="rotate(-15, 54.5, 23)" />
            <circle cx="56" cy="22" r="0.5" fill="#7c522f" />
          </g>
        </g>

        {/* ── 3. 白玉描金盘前沿反光 ── */}
        <g id="longanDishReflection" pointerEvents="none">
          <path d="M 34 54 Q 52 58 68 54" stroke="#fef08a" strokeWidth="0.8" fill="none" opacity="0.4" />
        </g>
      </g>
    </BaseFruitDish>
  );
};

