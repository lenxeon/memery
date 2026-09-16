/**
 * @file MangosteensFruit.tsx
 * @description 【冰清玉洁 · 福寿圆满】果后紫玉山竹工笔写实供品组件。
 * 遵循真实“热带水果之后”之神韵：
 * 1. 2 颗完整深沉茄紫整山竹（圆润敦实、果皮油润有光，顶冠 4 枚肥厚圆肉质深绿花萼与粗木果蒂）。
 * 2. 前排核心特写：一颗半剥露肉的绝美鲜山竹！
 *    厚厚一层深红紫海绵质果皮切开，盛托出如纯白羊脂玉、白嫩如蒜瓣的 5-6 瓣晶莹雪白果肉（清甜多汁，水光微澜）。
 * 3. 盘底隐现经典木质梅花状柱头残痕（花瓣数对应果瓣数）。
 */
import React from 'react';
import { FruitProps } from '../types';
import { BaseFruitDish } from '../BaseFruitDish';

export const MangosteensFruit: React.FC<FruitProps> = ({ scale, className, onClick }) => {
  const defs = (
    <>
      {/* 1. 整山竹紫黑油润果皮渐变 */}
      <radialGradient id="mangosteenSkinGrad" cx="38%" cy="32%" r="65%">
        <stop offset="0%" stopColor="#7e22ce" />
        <stop offset="25%" stopColor="#581c87" />
        <stop offset="60%" stopColor="#3b0764" />
        <stop offset="85%" stopColor="#2e1065" />
        <stop offset="100%" stopColor="#0f051d" />
      </radialGradient>

      {/* 2. 剥开深红紫海绵质果皮渐变 */}
      <linearGradient id="mangosteenRindGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#9d174d" />
        <stop offset="50%" stopColor="#701a75" />
        <stop offset="100%" stopColor="#4a044e" />
      </linearGradient>

      {/* 3. 晶莹雪白蒜瓣果肉渐变 (Snow-White Translucent Pulp) */}
      <radialGradient id="mangosteenPulpGrad" cx="42%" cy="36%" r="65%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="45%" stopColor="#f8fafc" />
        <stop offset="80%" stopColor="#f1f5f9" />
        <stop offset="100%" stopColor="#e2e8f0" />
      </radialGradient>

      {/* 4. 肥厚肉质花萼渐变 (Fleshy Calyx) */}
      <radialGradient id="mangosteenCalyxGrad" cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#86efac" />
        <stop offset="40%" stopColor="#22c55e" />
        <stop offset="80%" stopColor="#15803d" />
        <stop offset="100%" stopColor="#064e3b" />
      </radialGradient>

      {/* 5. 粗壮木质果梗渐变 */}
      <linearGradient id="mangosteenStemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#854d0e" />
        <stop offset="50%" stopColor="#542b08" />
        <stop offset="100%" stopColor="#290f02" />
      </linearGradient>

      {/* 6. 盘底接触深影 */}
      <radialGradient id="mangosteenPlateOcclusion" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#1e052c" stopOpacity="0.85" />
        <stop offset="60%" stopColor="#3b0764" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
    </>
  );

  return (
    <BaseFruitDish
      title="清供名果 · 山竹（冰清玉洁）"
      nextName="好运凤梨"
      scale={scale}
      className={className}
      onClick={onClick}
      defsSlot={defs}
    >
      <g id="mangosteensFruitGroup">
        {/* ── 0. 盘底接地深影 ── */}
        <ellipse cx="54" cy="56.5" rx="32" ry="6.8" fill="url(#mangosteenPlateOcclusion)" />

        {/* ── 1. 左后整山竹 (Whole Mangosteen 1) ── */}
        <g id="wholeMangosteenLeft">
          {/* 球形果身 */}
          <circle cx="34" cy="38" r="15.5" fill="url(#mangosteenSkinGrad)" stroke="#0f051d" strokeWidth="0.4" />
          {/* 光洁蜡质高光 */}
          <ellipse cx="30" cy="32" rx="6.5" ry="3.8" fill="#ffffff" opacity="0.35" transform="rotate(-20, 30, 32)" />

          {/* 顶端四片肥厚圆润肉质花萼 (Fleshy 4-lobed Calyx) */}
          <g id="calyxLeft">
            {/* 后萼片 */}
            <ellipse cx="34" cy="22.5" rx="4.2" ry="2.8" fill="url(#mangosteenCalyxGrad)" stroke="#064e3b" strokeWidth="0.3" />
            {/* 左萼片 */}
            <ellipse cx="28.5" cy="25.5" rx="3.2" ry="4.5" fill="url(#mangosteenCalyxGrad)" stroke="#064e3b" strokeWidth="0.3" transform="rotate(-30, 28.5, 25.5)" />
            {/* 右萼片 */}
            <ellipse cx="39.5" cy="25.5" rx="3.2" ry="4.5" fill="url(#mangosteenCalyxGrad)" stroke="#064e3b" strokeWidth="0.3" transform="rotate(30, 39.5, 25.5)" />
            {/* 前萼片 */}
            <ellipse cx="34" cy="26" rx="4.6" ry="3.2" fill="url(#mangosteenCalyxGrad)" stroke="#064e3b" strokeWidth="0.35" />

            {/* 粗壮木质弯曲果蒂 (Sturdy Stem) */}
            <path d="M 34 24 C 33.5 18, 31 14, 27 12" stroke="url(#mangosteenStemGrad)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <ellipse cx="27" cy="12" rx="1.2" ry="0.8" fill="#d4b584" stroke="#290f02" strokeWidth="0.3" />
          </g>
        </g>

        {/* ── 2. 右后整山竹 (Whole Mangosteen 2) ── */}
        <g id="wholeMangosteenRight">
          {/* 球形果身 */}
          <circle cx="70" cy="38" r="15.5" fill="url(#mangosteenSkinGrad)" stroke="#0f051d" strokeWidth="0.4" />
          <ellipse cx="66" cy="32" rx="6.5" ry="3.8" fill="#ffffff" opacity="0.35" transform="rotate(-15, 66, 32)" />

          {/* 顶端四片肥厚花萼 */}
          <g id="calyxRight">
            <ellipse cx="70" cy="22.5" rx="4.2" ry="2.8" fill="url(#mangosteenCalyxGrad)" stroke="#064e3b" strokeWidth="0.3" />
            <ellipse cx="64.5" cy="25.5" rx="3.2" ry="4.5" fill="url(#mangosteenCalyxGrad)" stroke="#064e3b" strokeWidth="0.3" transform="rotate(-25, 64.5, 25.5)" />
            <ellipse cx="75.5" cy="25.5" rx="3.2" ry="4.5" fill="url(#mangosteenCalyxGrad)" stroke="#064e3b" strokeWidth="0.3" transform="rotate(25, 75.5, 25.5)" />
            <ellipse cx="70" cy="26" rx="4.6" ry="3.2" fill="url(#mangosteenCalyxGrad)" stroke="#064e3b" strokeWidth="0.35" />

            <path d="M 70 24 C 71 18, 73 14, 76 12" stroke="url(#mangosteenStemGrad)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <ellipse cx="76" cy="12" rx="1.2" ry="0.8" fill="#d4b584" stroke="#290f02" strokeWidth="0.3" />
          </g>
        </g>

        {/* ── 3. 前排核心：半剖鲜剥白玉山竹 (Peeled Open Mangosteen) ── */}
        <g id="peeledMangosteen">
          {/* 下半部厚实的深紫红果皮底托 (Thick Rind Bowl) */}
          <path
            d="M 33 46 
               C 32 56, 42 61, 52 61 
               C 62 61, 72 56, 71 46 
               C 69 49, 61 52, 52 52 
               C 43 52, 35 49, 33 46 Z"
            fill="url(#mangosteenRindGrad)"
            stroke="#4a044e"
            strokeWidth="0.4"
          />

          {/* 果皮切口截面 (Sponge Rind Edge) */}
          <ellipse cx="52" cy="46" rx="19" ry="7.5" fill="#831843" stroke="#4a044e" strokeWidth="0.35" />
          <ellipse cx="52" cy="46" rx="17" ry="6.2" fill="#9d174d" />

          {/* 核心白玉如蒜瓣的丰满晶莹果肉 (Garlic Clove Snow-White Pulp) */}
          {/* 5 瓣多汁紧密相依的白雪瓣 */}
          <g id="garlicCloves">
            {/* 瓣 1: 顶中大瓣 (主瓣) */}
            <path
              d="M 52 32 C 48 33, 47 38, 49 43 C 52 45, 55 43, 55 38 C 55 34, 54 32, 52 32 Z"
              fill="url(#mangosteenPulpGrad)"
              stroke="#cbd5e1"
              strokeWidth="0.3"
            />
            {/* 瓣 2: 左上瓣 */}
            <path
              d="M 45 35 C 41 37, 40 42, 43 46 C 46 47, 48 45, 48 41 C 48 37, 47 35, 45 35 Z"
              fill="url(#mangosteenPulpGrad)"
              stroke="#cbd5e1"
              strokeWidth="0.3"
            />
            {/* 瓣 3: 右上瓣 */}
            <path
              d="M 59 35 C 57 35, 56 37, 56 41 C 56 45, 58 47, 61 46 C 64 42, 63 37, 59 35 Z"
              fill="url(#mangosteenPulpGrad)"
              stroke="#cbd5e1"
              strokeWidth="0.3"
            />
            {/* 瓣 4: 左下瓣 */}
            <path
              d="M 46 44 C 43 45, 44 49, 47 50 C 50 50, 50 47, 49 45 C 48 44, 47 44, 46 44 Z"
              fill="url(#mangosteenPulpGrad)"
              stroke="#cbd5e1"
              strokeWidth="0.3"
            />
            {/* 瓣 5: 右下瓣 */}
            <path
              d="M 58 44 C 57 44, 56 44, 55 45 C 54 47, 54 50, 57 50 C 60 49, 61 45, 58 44 Z"
              fill="url(#mangosteenPulpGrad)"
              stroke="#cbd5e1"
              strokeWidth="0.3"
            />
          </g>

          {/* 晶莹果汁水润微光 */}
          <ellipse cx="51" cy="37" rx="3.5" ry="2.0" fill="#ffffff" opacity="0.8" />
          <ellipse cx="45" cy="41" rx="2.5" ry="1.5" fill="#ffffff" opacity="0.75" />
          <ellipse cx="58" cy="41" rx="2.5" ry="1.5" fill="#ffffff" opacity="0.75" />
        </g>

        {/* ── 4. 盘沿温润反光 ── */}
        <path d="M 34 54 Q 52 58 68 54" stroke="#c084fc" strokeWidth="0.8" fill="none" opacity="0.45" pointerEvents="none" />
      </g>
    </BaseFruitDish>
  );
};
