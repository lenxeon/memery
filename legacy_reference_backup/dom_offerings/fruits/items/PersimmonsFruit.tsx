/**
 * @file PersimmonsFruit.tsx
 * @description 【事事如意】丹柿工笔写实三品供盘组件。
 * 具备四方圆润敦厚的果形、经典四裂如意柿蒂木质花萼、浓郁朱砂熟柿色彩与清透工笔天然柿霜微光，
 * 稳稳盛放于白玉描金高足供盘之中，祈愿万事顺遂、事事称心。
 */
import React from 'react';
import { FruitProps } from '../types';
import { BaseFruitDish } from '../BaseFruitDish';

export const PersimmonsFruit: React.FC<FruitProps> = ({ scale, className, onClick }) => {
  const defs = (
    <>
      {/* 1. 顶层大柿子主体渐变 (向阳暖橙至深熟朱红，如火如霞) */}
      <radialGradient id="persimmonTopBodyGrad" cx="36%" cy="30%" r="68%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="15%" stopColor="#fb923c" />
        <stop offset="42%" stopColor="#ea580c" />
        <stop offset="68%" stopColor="#dc2626" />
        <stop offset="88%" stopColor="#991b1b" />
        <stop offset="100%" stopColor="#450a0a" />
      </radialGradient>

      {/* 2. 左下柿子渐变 */}
      <radialGradient id="persimmonLeftBodyGrad" cx="36%" cy="32%" r="66%">
        <stop offset="0%" stopColor="#fed7aa" />
        <stop offset="20%" stopColor="#fb923c" />
        <stop offset="48%" stopColor="#ea580c" />
        <stop offset="75%" stopColor="#c2410c" />
        <stop offset="92%" stopColor="#7c2d12" />
        <stop offset="100%" stopColor="#451a03" />
      </radialGradient>

      {/* 3. 右下柿子渐变 */}
      <radialGradient id="persimmonRightBodyGrad" cx="34%" cy="32%" r="66%">
        <stop offset="0%" stopColor="#fed7aa" />
        <stop offset="22%" stopColor="#f97316" />
        <stop offset="50%" stopColor="#dc2626" />
        <stop offset="78%" stopColor="#991b1b" />
        <stop offset="92%" stopColor="#6b1414" />
        <stop offset="100%" stopColor="#3d0707" />
      </radialGradient>

      {/* 4. 木质柿蒂如意四裂花萼渐变 */}
      <linearGradient id="persimmonCalyxWood" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#365314" />
        <stop offset="35%" stopColor="#451a03" />
        <stop offset="70%" stopColor="#290f02" />
        <stop offset="100%" stopColor="#1a0801" />
      </linearGradient>

      {/* 5. 天然薄霜天鹅绒微光 (工笔柿霜白雾光晕) */}
      <radialGradient id="persimmonFrostBloom" cx="38%" cy="32%" r="58%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
        <stop offset="35%" stopColor="#fef08a" stopOpacity="0.2" />
        <stop offset="70%" stopColor="#fca5a5" stopOpacity="0.05" />
        <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
      </radialGradient>

      {/* 6. 果实接触闭塞阴影 */}
      <radialGradient id="persimmonContactShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#2e0505" stopOpacity="0.8" />
        <stop offset="55%" stopColor="#450a0a" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
    </>
  );

  return (
    <BaseFruitDish
      title="如意供果 · 丹柿（事事如意）"
      nextName="禅意佛手"
      scale={scale}
      className={className}
      onClick={onClick}
      defsSlot={defs}
    >
      <g id="persimmonsTrio">
        {/* ── 0. 衬底中央微露柿果 ── */}
        <ellipse cx="51" cy="45" rx="16.5" ry="13" fill="url(#persimmonRightBodyGrad)" opacity="0.9" />

        {/* ── 1. 左下丹柿 (Left Persimmon) ── */}
        <g id="persimmonLeft">
          {/* 四方圆润扁平柿果体态：四隅微隆，顶面宽平 */}
          <path
            d="M 33 33 C 41 33, 49 37, 49 46 C 49 55, 42 61, 33 61 C 24 61, 17 55, 17 46 C 17 37, 25 33, 33 33 Z"
            fill="url(#persimmonLeftBodyGrad)"
          />
          {/* 经典四裂如意木质柿蒂花萼 */}
          <g id="leftCalyx" transform="translate(33, 36.5)">
            <path d="M 0 0 C -4 -4, -7 -3, -8 -1 C -7 2, -4 2, 0 0 Z" fill="url(#persimmonCalyxWood)" stroke="#1a0801" strokeWidth="0.3" />
            <path d="M 0 0 C 4 -4, 7 -3, 8 -1 C 7 2, 4 2, 0 0 Z" fill="url(#persimmonCalyxWood)" stroke="#1a0801" strokeWidth="0.3" />
            <path d="M 0 0 C -4 4, -7 3, -8 1 C -7 -2, -4 -2, 0 0 Z" fill="url(#persimmonCalyxWood)" stroke="#1a0801" strokeWidth="0.3" />
            <path d="M 0 0 C 4 4, 7 3, 8 1 C 7 -2, 4 -2, 0 0 Z" fill="url(#persimmonCalyxWood)" stroke="#1a0801" strokeWidth="0.3" />
            {/* 木质果柄 */}
            <circle cx="0" cy="0" r="1.3" fill="#1c0701" />
            <path d="M 0 0 Q 1 -4 3 -6" stroke="#451a03" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          </g>
          {/* 柿皮白霜微光 */}
          <ellipse cx="26" cy="42" rx="4.5" ry="7" fill="url(#persimmonFrostBloom)" transform="rotate(-18, 26, 42)" />
          {/* 边缘暖金反光 */}
          <path d="M 18 47 Q 21 57 30 60" stroke="#fef08a" strokeWidth="0.75" fill="none" opacity="0.28" />
        </g>

        {/* ── 2. 右下丹柿 (Right Persimmon) ── */}
        <g id="persimmonRight">
          {/* 四方圆润体态 */}
          <path
            d="M 69 33 C 77 33, 85 37, 85 46 C 85 55, 78 61, 69 61 C 60 61, 53 55, 53 46 C 53 37, 61 33, 69 33 Z"
            fill="url(#persimmonRightBodyGrad)"
          />
          {/* 四裂木质柿蒂 */}
          <g id="rightCalyx" transform="translate(69, 36.5)">
            <path d="M 0 0 C -4 -4, -7 -3, -8 -1 C -7 2, -4 2, 0 0 Z" fill="url(#persimmonCalyxWood)" stroke="#1a0801" strokeWidth="0.3" />
            <path d="M 0 0 C 4 -4, 7 -3, 8 -1 C 7 2, 4 2, 0 0 Z" fill="url(#persimmonCalyxWood)" stroke="#1a0801" strokeWidth="0.3" />
            <path d="M 0 0 C -4 4, -7 3, -8 1 C -7 -2, -4 -2, 0 0 Z" fill="url(#persimmonCalyxWood)" stroke="#1a0801" strokeWidth="0.3" />
            <path d="M 0 0 C 4 4, 7 3, 8 1 C 7 -2, 4 -2, 0 0 Z" fill="url(#persimmonCalyxWood)" stroke="#1a0801" strokeWidth="0.3" />
            <circle cx="0" cy="0" r="1.3" fill="#1c0701" />
            <path d="M 0 0 Q -1 -4 -3 -6" stroke="#451a03" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          </g>
          {/* 柿霜微光 */}
          <ellipse cx="64" cy="42" rx="4.5" ry="7" fill="url(#persimmonFrostBloom)" transform="rotate(-12, 64, 42)" />
          {/* 边缘反光 */}
          <path d="M 84 47 Q 81 57 72 60" stroke="#fef08a" strokeWidth="0.75" fill="none" opacity="0.28" />
        </g>

        {/* 左右依偎阴影 */}
        <ellipse cx="51" cy="48" rx="8" ry="11" fill="url(#persimmonContactShadow)" />

        {/* ── 3. 顶层压盘大丹柿 (Crown Persimmon) ── */}
        <g id="persimmonTop">
          {/* 顶果柔和投影 */}
          <ellipse cx="51" cy="44" rx="16.5" ry="5.5" fill="#290505" opacity="0.4" />

          {/* 硕大四方圆润主柿果：果肩方圆敦实，雍容饱满 */}
          <path
            d="M 51 16 C 62 16, 70 21, 69 31 C 69 40, 61 46, 51 46 C 41 46, 33 40, 33 31 C 32 21, 40 16, 51 16 Z"
            fill="url(#persimmonTopBodyGrad)"
          />

          {/* 顶端四裂如意柿蒂花萼 (古朴端庄，如意吉祥纹样) */}
          <g id="topCalyx" transform="translate(51, 20)">
            {/* 四片贴紧果实微微翘曲的厚革质如意萼瓣 */}
            {/* 上瓣 */}
            <path d="M 0 0 C -3 -5, -6 -6, -8 -3 C -7 0, -3 1, 0 0 Z" fill="url(#persimmonCalyxWood)" stroke="#1a0801" strokeWidth="0.35" />
            {/* 右瓣 */}
            <path d="M 0 0 C 5 -3, 7 -5, 8 -2 C 7 1, 4 2, 0 0 Z" fill="url(#persimmonCalyxWood)" stroke="#1a0801" strokeWidth="0.35" />
            {/* 下瓣 */}
            <path d="M 0 0 C 4 3, 6 6, 4 8 C 1 6, 0 3, 0 0 Z" fill="url(#persimmonCalyxWood)" stroke="#1a0801" strokeWidth="0.35" />
            {/* 左瓣 */}
            <path d="M 0 0 C -4 4, -7 5, -7 2 C -5 -1, -2 0, 0 0 Z" fill="url(#persimmonCalyxWood)" stroke="#1a0801" strokeWidth="0.35" />
            {/* 萼瓣脉络与反光 */}
            <circle cx="0" cy="0" r="1.6" fill="#1a0801" />
            {/* 苍劲微曲木质果蒂 */}
            <path d="M 0 0 Q 2 -6 5 -9" stroke="#451a03" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M 0.5 0 Q 2.5 -6 5 -8.5" stroke="#78350f" strokeWidth="0.7" fill="none" opacity="0.8" strokeLinecap="round" />
          </g>

          {/* 丹柿天然白霜天鹅绒漫反射柔光 */}
          <ellipse cx="42" cy="26" rx="5" ry="8" fill="url(#persimmonFrostBloom)" transform="rotate(-20, 42, 26)" />
          <path
            d="M 39 22 C 37 26, 38 31, 41 34"
            stroke="#ffffff"
            strokeWidth="0.85"
            fill="none"
            opacity="0.3"
            strokeLinecap="round"
          />
          {/* 下沿微弱暖光漫反 */}
          <path d="M 34 32 Q 36 41 45 44" stroke="#fef08a" strokeWidth="0.75" fill="none" opacity="0.25" />
        </g>
      </g>
    </BaseFruitDish>
  );
};
