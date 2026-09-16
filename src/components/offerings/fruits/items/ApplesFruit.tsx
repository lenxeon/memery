/**
 * @file ApplesFruit.tsx
 * @description 【平平安安】红富士苹果工笔写实多层堆叠供品。
 * 具备天然果形丰润双肩与果蒂深凹、黄底透红多层朱砂分染、果蜡温润漫反射微光与木质果梗嫩叶，
 * 彻底消除生硬线条与塑料感，稳稳盛放于白玉高足供盘之中。
 */
import React from 'react';
import { FruitProps } from '../types';
import { BaseFruitDish } from '../BaseFruitDish';

export const ApplesFruit: React.FC<FruitProps> = ({ scale, className, onClick }) => {
  const defs = (
    <>
      {/* 1. 顶层苹果主体渐变 (黄底透红，多层朱砂与胭脂温润分染) */}
      <radialGradient id="appleTopBodyGrad" cx="36%" cy="30%" r="68%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="14%" stopColor="#fca5a5" />
        <stop offset="35%" stopColor="#f87171" />
        <stop offset="60%" stopColor="#dc2626" />
        <stop offset="82%" stopColor="#991b1b" />
        <stop offset="96%" stopColor="#650f0f" />
        <stop offset="100%" stopColor="#3b0808" />
      </radialGradient>

      {/* 2. 左下苹果主体渐变 */}
      <radialGradient id="appleLeftBodyGrad" cx="36%" cy="32%" r="66%">
        <stop offset="0%" stopColor="#fef3c7" />
        <stop offset="16%" stopColor="#fca5a5" />
        <stop offset="40%" stopColor="#ef4444" />
        <stop offset="68%" stopColor="#b91c1c" />
        <stop offset="90%" stopColor="#7f1d1d" />
        <stop offset="100%" stopColor="#450a0a" />
      </radialGradient>

      {/* 3. 右下苹果主体渐变 */}
      <radialGradient id="appleRightBodyGrad" cx="34%" cy="32%" r="66%">
        <stop offset="0%" stopColor="#fed7aa" />
        <stop offset="18%" stopColor="#f87171" />
        <stop offset="42%" stopColor="#dc2626" />
        <stop offset="70%" stopColor="#9f1239" />
        <stop offset="90%" stopColor="#6f0e26" />
        <stop offset="100%" stopColor="#3d0714" />
      </radialGradient>

      {/* 4. 果蒂深凹阴影渐变 */}
      <radialGradient id="appleStemWellGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#1e0404" />
        <stop offset="60%" stopColor="#4c0d0d" />
        <stop offset="100%" stopColor="#881c1c" stopOpacity="0" />
      </radialGradient>

      {/* 5. 果顶天然杏黄微晕 (苹果向阳面自然底色) */}
      <radialGradient id="appleTopWarmBlush" cx="45%" cy="35%" r="50%">
        <stop offset="0%" stopColor="#fef08a" stopOpacity="0.45" />
        <stop offset="60%" stopColor="#f97316" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
      </radialGradient>

      {/* 6. 果实之间的接触闭塞阴影 */}
      <radialGradient id="appleContactOcclusion" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#180404" stopOpacity="0.8" />
        <stop offset="60%" stopColor="#380808" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>

      {/* 7. 天然果蜡温润漫反射柔光 */}
      <radialGradient id="appleWaxySheen" cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.38" />
        <stop offset="35%" stopColor="#ffeedd" stopOpacity="0.18" />
        <stop offset="70%" stopColor="#fca5a5" stopOpacity="0.05" />
        <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
      </radialGradient>

      {/* 8. 青翠苹果嫩叶渐变 */}
      <linearGradient id="appleLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a7f3d0" />
        <stop offset="30%" stopColor="#34d399" />
        <stop offset="70%" stopColor="#15803d" />
        <stop offset="100%" stopColor="#064e3b" />
      </linearGradient>

      {/* 9. 果梗木质渐变 */}
      <linearGradient id="appleStemWood" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#78350f" />
        <stop offset="50%" stopColor="#451a03" />
        <stop offset="100%" stopColor="#290f02" />
      </linearGradient>
    </>
  );

  return (
    <BaseFruitDish
      title="清雅供果 · 苹果（岁岁平安）"
      nextName="吉祥蜜柑"
      scale={scale}
      className={className}
      onClick={onClick}
      defsSlot={defs}
    >
      <g id="applesPyramid">
        {/* ── 1. 左下苹果 (Left Apple) ── */}
        <g id="appleLeft">
          {/* 自然微凹饱满苹果外轮廓：果顶凹陷，双肩丰润，下腹微收 */}
          <path
            d="M 34 32 C 28 29, 18 32, 17 41 C 16 50, 21 59, 29 62 C 33 63.5, 39 63.5, 43 62 C 51 59, 53 49, 51 41 C 49 32, 40 29, 34 32 Z"
            fill="url(#appleLeftBodyGrad)"
          />
          {/* 果面受光暖杏黄自然底晕 */}
          <path
            d="M 34 32 C 28 29, 18 32, 17 41 C 16 50, 21 59, 29 62 C 33 63.5, 39 63.5, 43 62 C 51 59, 53 49, 51 41 C 49 32, 40 29, 34 32 Z"
            fill="url(#appleTopWarmBlush)"
          />
          {/* 果顶凹窝 */}
          <ellipse cx="34" cy="32" rx="4.5" ry="2" fill="url(#appleStemWellGrad)" />
          {/* 木质果梗 */}
          <path d="M 34 32 Q 36 26 41 23" stroke="url(#appleStemWood)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M 34.5 32 Q 36.5 26.5 41 23.5" stroke="#92400e" strokeWidth="0.6" fill="none" opacity="0.6" strokeLinecap="round" />
          
          {/* 柔润果蜡漫反射高光 (摒弃生硬线条) */}
          <ellipse cx="26" cy="39" rx="4.5" ry="7.5" fill="url(#appleWaxySheen)" transform="rotate(-20, 26, 39)" />
          {/* 果肩微弧反光 */}
          <path d="M 23 35 C 22 40, 24 45, 27 48" stroke="#ffffff" strokeWidth="0.8" fill="none" opacity="0.28" strokeLinecap="round" />
          {/* 下部边缘玉盘暖反光 */}
          <path d="M 18 47 Q 20 57 28 61" stroke="#fef08a" strokeWidth="0.75" fill="none" opacity="0.25" />
        </g>

        {/* ── 2. 右下苹果 (Right Apple) ── */}
        <g id="appleRight">
          {/* 自然微凹饱满苹果外轮廓 */}
          <path
            d="M 68 32 C 62 29, 51 32, 49 41 C 47 50, 52 59, 60 62 C 64 63.5, 70 63.5, 74 62 C 82 59, 85 49, 84 41 C 83 32, 74 29, 68 32 Z"
            fill="url(#appleRightBodyGrad)"
          />
          {/* 果面暖黄底晕 */}
          <path
            d="M 68 32 C 62 29, 51 32, 49 41 C 47 50, 52 59, 60 62 C 64 63.5, 70 63.5, 74 62 C 82 59, 85 49, 84 41 C 83 32, 74 29, 68 32 Z"
            fill="url(#appleTopWarmBlush)"
          />
          {/* 果顶凹窝 */}
          <ellipse cx="68" cy="32" rx="4.5" ry="2" fill="url(#appleStemWellGrad)" />
          {/* 木质果梗 */}
          <path d="M 68 32 Q 66 26 61 23" stroke="url(#appleStemWood)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M 67.5 32 Q 65.5 26.5 61 23.5" stroke="#92400e" strokeWidth="0.6" fill="none" opacity="0.6" strokeLinecap="round" />

          {/* 柔润果蜡漫反射高光 */}
          <ellipse cx="63" cy="39" rx="4.5" ry="7.5" fill="url(#appleWaxySheen)" transform="rotate(-15, 63, 39)" />
          <path d="M 60 35 C 59 40, 61 45, 64 48" stroke="#ffffff" strokeWidth="0.8" fill="none" opacity="0.26" strokeLinecap="round" />
          {/* 边缘反光 */}
          <path d="M 83 47 Q 81 57 73 61" stroke="#fef08a" strokeWidth="0.75" fill="none" opacity="0.25" />
        </g>

        {/* 两底果中央交界处的自然接触阴影 */}
        <ellipse cx="51" cy="48" rx="8" ry="12" fill="url(#appleContactOcclusion)" />

        {/* ── 3. 顶层压轴大苹果 (Crown Top Apple) ── */}
        <g id="appleTop">
          {/* 顶果投在底果上的柔和自然阴影 */}
          <ellipse cx="51" cy="45" rx="16.5" ry="6" fill="#180404" opacity="0.4" />

          {/* 顶层饱满苹果外轮廓：凹蒂双肩，丰满雍容 */}
          <path
            d="M 51 15 C 45 12, 34 15, 32 24 C 30 33, 35 44, 43 47 C 47 48.5, 55 48.5, 59 47 C 67 44, 72 33, 70 24 C 68 15, 57 12, 51 15 Z"
            fill="url(#appleTopBodyGrad)"
          />
          {/* 向阳面暖底泛光 (苹果皮下金红通透感) */}
          <path
            d="M 51 15 C 45 12, 34 15, 32 24 C 30 33, 35 44, 43 47 C 47 48.5, 55 48.5, 59 47 C 67 44, 72 33, 70 24 C 68 15, 57 12, 51 15 Z"
            fill="url(#appleTopWarmBlush)"
          />

          {/* 果顶凹窝深坑 */}
          <ellipse cx="51" cy="16.5" rx="5.5" ry="2.2" fill="url(#appleStemWellGrad)" />

          {/* 木质果蒂小枝 */}
          <path d="M 51 16.5 Q 53 8 58 6" stroke="url(#appleStemWood)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M 51.5 16.5 Q 53.5 8.5 58 6.5" stroke="#92400e" strokeWidth="0.7" fill="none" opacity="0.7" strokeLinecap="round" />

          {/* 鲜嫩翠绿苹果叶片 (带自然叶弧、主脉与光泽) */}
          <g id="topAppleLeaf">
            <path
              d="M 52 14 C 62 9, 73 12, 72 20 C 65 23, 57 19, 52 14 Z"
              fill="url(#appleLeafGrad)"
              stroke="#064e3b"
              strokeWidth="0.5"
            />
            {/* 叶脉精工勾勒 */}
            <path d="M 53 14.5 Q 62 16.5 69 19.5" stroke="#d1fae5" strokeWidth="0.6" fill="none" opacity="0.85" />
            <path d="M 58 15.5 Q 61 14 63 13" stroke="#d1fae5" strokeWidth="0.4" fill="none" opacity="0.6" />
            <path d="M 62 17.5 Q 65 18.5 67 20" stroke="#d1fae5" strokeWidth="0.4" fill="none" opacity="0.6" />
            {/* 叶片柔光 */}
            <path d="M 55 13.5 Q 63 11 68 14" stroke="#ffffff" strokeWidth="0.5" fill="none" opacity="0.4" />
          </g>

          {/* 柔润苹果果蜡漫反射高光 (温润散射，绝不生硬) */}
          <ellipse cx="42" cy="24" rx="5" ry="8.5" fill="url(#appleWaxySheen)" transform="rotate(-24, 42, 24)" />
          {/* 果肩弧形漫光 */}
          <path
            d="M 39 19 C 37 23, 38 29, 41 33"
            stroke="#ffffff"
            strokeWidth="0.9"
            fill="none"
            opacity="0.35"
            strokeLinecap="round"
          />
          {/* 左侧下沿微弱暖光漫反 */}
          <path d="M 33 32 Q 35 42 42 46" stroke="#fef08a" strokeWidth="0.75" fill="none" opacity="0.25" />
        </g>
      </g>
    </BaseFruitDish>
  );
};
