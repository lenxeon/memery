/**
 * @file CoconutsFruit.tsx
 * @description 【爷孙同福 · 清吉长寿】南国金玉椰子工笔写实供品组件。
 * 经典热带祥瑞清供组合：
 * 1. 左侧：高大圆润的翡翠青椰（青嫩油亮，顶带木质蒂圈）。
 * 2. 右侧：饱经沉淀的金丝棕毛老椰（经典深褐纤维纹理与三孔灵动“椰眼”）。
 * 3. 前排：半剖白玉椰子盅（厚厚一圈纯白如雪的凝脂椰肉，盛放清澈甘冽椰天泉水与微漾水波）。
 * 4. 侧衬一束清秀的翡翠羽状椰叶。
 */
import React from 'react';
import { FruitProps } from '../types';
import { BaseFruitDish } from '../BaseFruitDish';

export const CoconutsFruit: React.FC<FruitProps> = ({ scale, className, onClick }) => {
  const defs = (
    <>
      {/* 1. 翡翠青椰渐变 */}
      <radialGradient id="greenCoconutGrad" cx="38%" cy="32%" r="65%">
        <stop offset="0%" stopColor="#86efac" />
        <stop offset="30%" stopColor="#4ade80" />
        <stop offset="65%" stopColor="#16a34a" />
        <stop offset="90%" stopColor="#15803d" />
        <stop offset="100%" stopColor="#064e3b" />
      </radialGradient>

      {/* 2. 棕毛老椰纤维木质渐变 */}
      <radialGradient id="brownCoconutGrad" cx="42%" cy="36%" r="65%">
        <stop offset="0%" stopColor="#d97706" />
        <stop offset="25%" stopColor="#b45309" />
        <stop offset="60%" stopColor="#78350f" />
        <stop offset="85%" stopColor="#451a03" />
        <stop offset="100%" stopColor="#290f02" />
      </radialGradient>

      {/* 3. 老椰外壳硬壳渐变 */}
      <linearGradient id="coconutShellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#542b08" />
        <stop offset="50%" stopColor="#311502" />
        <stop offset="100%" stopColor="#1a0a01" />
      </linearGradient>

      {/* 4. 椰肉凝脂纯白渐变 */}
      <linearGradient id="coconutMeatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="70%" stopColor="#f8fafc" />
        <stop offset="100%" stopColor="#e2e8f0" />
      </linearGradient>

      {/* 5. 椰清泉水渐变 */}
      <radialGradient id="coconutWaterGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.9" />
        <stop offset="60%" stopColor="#bae6fd" stopOpacity="0.65" />
        <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.4" />
      </radialGradient>

      {/* 6. 热带椰叶羽片渐变 */}
      <linearGradient id="palmFrondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4ade80" />
        <stop offset="40%" stopColor="#16a34a" />
        <stop offset="100%" stopColor="#064e3b" />
      </linearGradient>

      {/* 7. 盘底接触阴影 */}
      <radialGradient id="coconutPlateOcclusion" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#291202" stopOpacity="0.85" />
        <stop offset="60%" stopColor="#451a03" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
    </>
  );

  return (
    <BaseFruitDish
      title="南国瑞果 · 椰子（清吉长寿）"
      nextName="金玉蜂糖李"
      scale={scale}
      className={className}
      onClick={onClick}
      defsSlot={defs}
    >
      <g id="coconutsFruitGroup">
        {/* ── 0. 盘底接地深影 ── */}
        <ellipse cx="54" cy="56.5" rx="32" ry="6.8" fill="url(#coconutPlateOcclusion)" />

        {/* ── 1. 侧衬热带羽状椰叶 (Palm Fronds) ── */}
        <g id="palmFronds">
          {/* 左后主羽叶 */}
          <path
            d="M 14 42 C 10 32, 12 20, 22 14 C 20 22, 22 34, 28 44 Z"
            fill="url(#palmFrondGrad)"
            stroke="#064e3b"
            strokeWidth="0.35"
            opacity="0.85"
          />
          <path d="M 12 26 Q 18 20 26 15" stroke="#bbf7d0" strokeWidth="0.4" fill="none" opacity="0.75" />
          {/* 小侧羽裂片 */}
          <path d="M 18 16 L 24 10 L 22 17 Z" fill="#16a34a" />
          <path d="M 14 22 L 8 16 L 15 24 Z" fill="#16a34a" />
        </g>

        {/* ── 2. 左后翡翠大青椰 (Green Coconut) ── */}
        <g id="greenCoconut">
          {/* 饱满圆润圆锥形大青椰 */}
          <path
            d="M 24 48 
               C 20 38, 22 26, 30 18 
               C 36 13, 44 14, 48 18 
               C 54 24, 55 38, 52 48 
               C 46 54, 32 55, 24 48 Z"
            fill="url(#greenCoconutGrad)"
            stroke="#064e3b"
            strokeWidth="0.4"
          />

          {/* 青椰平滑光泽纵向高光 */}
          <path d="M 32 20 C 27 28, 27 38, 30 46" stroke="#ffffff" strokeWidth="1.2" fill="none" opacity="0.45" strokeLinecap="round" />
          <ellipse cx="36" cy="22" rx="7" ry="4" fill="#ffffff" opacity="0.3" transform="rotate(-18, 36, 22)" />

          {/* 青椰顶端木质蒂部 */}
          <ellipse cx="39" cy="15" rx="3.5" ry="1.8" fill="#542b08" stroke="#15803d" strokeWidth="0.4" />
          <path d="M 39 15 L 40 12" stroke="#290f02" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* ── 3. 右后金丝棕毛老椰 (Mature Brown Coconut with 3 Eyes) ── */}
        <g id="brownCoconut">
          {/* 浑圆坚硬棕毛老椰 */}
          <ellipse cx="68" cy="36" rx="20" ry="19" fill="url(#brownCoconutGrad)" stroke="#290f02" strokeWidth="0.45" />

          {/* 棕毛纤维丝缕排线纹理 (Fibrous Husk Texture) */}
          <g id="fibers" stroke="#ca8a04" strokeWidth="0.35" opacity="0.4" fill="none">
            <path d="M 56 30 Q 66 22 78 28" />
            <path d="M 54 36 Q 67 28 82 35" />
            <path d="M 56 42 Q 68 36 84 41" />
            <path d="M 60 48 Q 72 44 80 47" />
          </g>

          {/* 饱满圆球高光 */}
          <ellipse cx="64" cy="28" rx="8" ry="5" fill="#fef08a" opacity="0.25" transform="rotate(-15, 64, 28)" />

          {/* 经典三孔“椰眼” (Three Germination Pores / Eyes) */}
          <g id="coconutEyes">
            <ellipse cx="72" cy="25" rx="1.6" ry="1.8" fill="#1a0a01" stroke="#451a03" strokeWidth="0.3" />
            <ellipse cx="77" cy="28" rx="1.5" ry="1.7" fill="#1a0a01" stroke="#451a03" strokeWidth="0.3" />
            <ellipse cx="73" cy="31" rx="1.7" ry="1.9" fill="#1a0a01" stroke="#451a03" strokeWidth="0.3" />
            {/* 椰眼微光 */}
            <circle cx="71.5" cy="24.5" r="0.4" fill="#78350f" opacity="0.6" />
            <circle cx="76.5" cy="27.5" r="0.4" fill="#78350f" opacity="0.6" />
          </g>
        </g>

        {/* ── 4. 前排半剖白玉椰子盅 (Split Half Coconut Cup) ── */}
        <g id="splitCoconut">
          {/* 外圈深褐坚硬木质硬壳 */}
          <ellipse cx="48" cy="47" rx="21" ry="11" fill="url(#coconutShellGrad)" stroke="#1a0a01" strokeWidth="0.5" />

          {/* 中圈厚实纯白如雪的鲜嫩椰肉 (Thick White Coconut Meat) */}
          <ellipse cx="48" cy="46.5" rx="18.5" ry="9" fill="url(#coconutMeatGrad)" stroke="#cbd5e1" strokeWidth="0.4" />

          {/* 内圈清澈晶莹椰天泉水 (Pure Coconut Water) */}
          <ellipse cx="48" cy="46.5" rx="14.5" ry="6.5" fill="url(#coconutWaterGrad)" stroke="#7dd3fc" strokeWidth="0.3" />

          {/* 水面微漾白光波纹 */}
          <path d="M 40 45 Q 48 48 56 45" stroke="#ffffff" strokeWidth="0.8" fill="none" opacity="0.85" strokeLinecap="round" />
          <path d="M 43 47.5 Q 49 49.5 54 47.5" stroke="#ffffff" strokeWidth="0.5" fill="none" opacity="0.6" strokeLinecap="round" />

          {/* 纯白椰肉环上光泽反光 */}
          <path d="M 33 46 C 36 41, 58 40, 63 45" stroke="#ffffff" strokeWidth="1.1" fill="none" opacity="0.9" strokeLinecap="round" />
        </g>

        {/* ── 5. 盘沿温润反光 ── */}
        <path d="M 34 54 Q 52 58 68 54" stroke="#fef08a" strokeWidth="0.8" fill="none" opacity="0.4" pointerEvents="none" />
      </g>
    </BaseFruitDish>
  );
};
