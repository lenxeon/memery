/**
 * @file CucumbersFruit.tsx
 * @description 【飞黄腾达 · 清心顺遂】翠玉黄瓜工笔写实供品组件。
 * 遵循真实“顶花带刺”新鲜黄瓜之神韵：
 * 1. 2-3 根修长微弯的墨翠碧玉黄瓜错落横卧于白玉盘内。
 * 2. 鲜明纵向浅黄绿棱条与微小白色刺瘤突起（顶花带刺）。
 * 3. 前端绽放金黄五角星形黄瓜嫩花（鲜嫩朝露感）。
 * 4. 左侧连带嫩绿果柄与卷曲灵动藤蔓卷须，底衬宽阔黄瓜掌状绿叶。
 */
import React from 'react';
import { FruitProps } from '../types';
import { BaseFruitDish } from '../BaseFruitDish';

export const CucumbersFruit: React.FC<FruitProps> = ({ scale, className, onClick }) => {
  const defs = (
    <>
      {/* 1. 黄瓜墨绿果身主渐变 (青翠至深林浓绿) */}
      <linearGradient id="cukeSkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4ade80" />
        <stop offset="25%" stopColor="#22c55e" />
        <stop offset="60%" stopColor="#16a34a" />
        <stop offset="85%" stopColor="#15803d" />
        <stop offset="100%" stopColor="#052e16" />
      </linearGradient>

      {/* 2. 黄瓜向阳浅绿背棱纹理 */}
      <linearGradient id="cukeStripeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#bbf7d0" stopOpacity="0.85" />
        <stop offset="40%" stopColor="#86efac" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
      </linearGradient>

      {/* 3. 金黄鲜花渐变 (顶花) */}
      <linearGradient id="cukeFlowerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="45%" stopColor="#facc15" />
        <stop offset="100%" stopColor="#ca8a04" />
      </linearGradient>

      {/* 4. 宽阔黄瓜叶片渐变 */}
      <linearGradient id="cukeLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#86efac" />
        <stop offset="30%" stopColor="#22c55e" />
        <stop offset="70%" stopColor="#15803d" />
        <stop offset="100%" stopColor="#064e3b" />
      </linearGradient>

      {/* 5. 盘底接触深影 */}
      <radialGradient id="cukePlateOcclusion" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#052e16" stopOpacity="0.85" />
        <stop offset="60%" stopColor="#14290a" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
    </>
  );

  return (
    <BaseFruitDish
      title="清雅时果 · 黄瓜（顺遂如意）"
      nextName="盛夏西瓜"
      scale={scale}
      className={className}
      onClick={onClick}
      defsSlot={defs}
    >
      <g id="cucumbersFruitGroup">
        {/* ── 0. 盘底接地深影 ── */}
        <ellipse cx="54" cy="56.5" rx="32" ry="6.8" fill="url(#cukePlateOcclusion)" />

        {/* ── 1. 底衬宽大掌状黄瓜叶 (Cradling Leaf) ── */}
        <g id="cukeLeaves">
          <path
            d="M 28 55 C 22 45, 18 36, 22 28 C 28 26, 36 30, 42 37 C 46 32, 54 30, 58 35 C 64 42, 58 52, 48 56 Z"
            fill="url(#cukeLeafGrad)"
            stroke="#064e3b"
            strokeWidth="0.4"
            opacity="0.85"
          />
          <path d="M 24 30 Q 38 40 46 54" stroke="#dcfce7" strokeWidth="0.5" fill="none" opacity="0.7" />
          <path d="M 32 36 Q 36 32 40 31" stroke="#dcfce7" strokeWidth="0.35" fill="none" opacity="0.5" />
        </g>

        {/* ── 2. 后排修长黄瓜 (Cucumber 1 - 后方斜卧) ── */}
        <g id="cukeBack">
          <path
            d="M 22 42 
               C 32 30, 50 26, 72 32 
               C 80 34, 86 40, 84 43 
               C 82 45, 74 42, 66 39 
               C 48 34, 32 38, 20 46 Z"
            fill="url(#cukeSkinGrad)"
            stroke="#052e16"
            strokeWidth="0.4"
            opacity="0.92"
          />
          {/* 后黄瓜脊棱浅光 */}
          <path d="M 26 38 C 42 30, 60 30, 78 35" stroke="url(#cukeStripeGrad)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
        </g>

        {/* ── 3. 主排横卧大黄瓜 (Cucumber 2 - 前排核心，“顶花带刺”) ── */}
        <g id="cukeFrontMain">
          {/* 黄瓜丰满果身：自左向右微微向下再向上微翘之优美弧度 */}
          <path
            d="M 18 52 
               C 22 44, 36 41, 52 42 
               C 66 43, 78 48, 86 52 
               C 88 53.5, 87 56, 84 57 
               C 74 60, 60 56, 46 54 
               C 32 52, 20 57, 16 55 Z"
            fill="url(#cukeSkinGrad)"
            stroke="#052e16"
            strokeWidth="0.45"
          />

          {/* 纵向明丽浅绿凸起棱线 (Ribs) */}
          <path d="M 20 50 C 35 43, 52 43, 68 46 C 76 48, 82 52, 85 53" stroke="url(#cukeStripeGrad)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M 18 53 C 34 47, 50 47, 66 50 C 74 52, 80 55, 84 55" stroke="url(#cukeStripeGrad)" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.75" />
          <path d="M 22 48 C 36 44, 52 44, 66 45" stroke="#ffffff" strokeWidth="0.5" fill="none" strokeLinecap="round" opacity="0.6" />

          {/* 鲜脆小刺瘤突 (Prickles/Tubercles - 顶花带刺写实感) */}
          <g id="cukeTubercles" fill="#ffffff" opacity="0.75">
            <circle cx="28" cy="46" r="0.45" />
            <circle cx="36" cy="44" r="0.5" />
            <circle cx="44" cy="44" r="0.55" />
            <circle cx="53" cy="45" r="0.55" />
            <circle cx="62" cy="47" r="0.5" />
            <circle cx="70" cy="50" r="0.45" />
            <circle cx="78" cy="53" r="0.4" />
            {/* 第二排小刺 */}
            <circle cx="32" cy="49" r="0.4" />
            <circle cx="41" cy="48" r="0.45" />
            <circle cx="50" cy="49" r="0.45" />
            <circle cx="59" cy="51" r="0.45" />
            <circle cx="68" cy="53" r="0.4" />
          </g>

          {/* 前端金黄初绽小黄瓜花 (顶花) */}
          <g id="cukeFlower" transform="translate(86, 52) rotate(15)">
            {/* 绿色花托 */}
            <path d="M 0 0 L -1.5 -1.2 L -1.5 1.2 Z" fill="#15803d" />
            {/* 五角星状金黄娇嫩花瓣 */}
            <polygon points="1,-4 2.5,-1 5,-1.5 3,1 4.5,4 1.5,2.5 -0.5,4.5 0,1.5 -2.5,0.5 0,-1" fill="url(#cukeFlowerGrad)" stroke="#a16207" strokeWidth="0.25" />
            {/* 花蕊红晕 */}
            <circle cx="1" cy="0.8" r="0.7" fill="#ea580c" opacity="0.8" />
          </g>
        </g>

        {/* ── 4. 上方斜倚嫩黄瓜 (Cucumber 3 - 丰富层次) ── */}
        <g id="cukeTop">
          <path
            d="M 30 36 
               C 38 28, 52 26, 68 31 
               C 74 33, 76 37, 73 39 
               C 66 41, 56 36, 46 34 
               C 36 33, 28 38, 27 38 Z"
            fill="url(#cukeSkinGrad)"
            stroke="#052e16"
            strokeWidth="0.38"
          />
          <path d="M 34 33 C 44 28, 56 28, 68 33" stroke="url(#cukeStripeGrad)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
        </g>

        {/* ── 5. 果蒂、青翠果柄与灵动卷须 (Stem & Tendril) ── */}
        <g id="cukeTendrils">
          {/* 左侧果柄 */}
          <path d="M 17 53 C 12 52, 8 50, 6 46" stroke="#16a34a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <ellipse cx="6" cy="46" rx="0.9" ry="1.2" fill="#86efac" stroke="#064e3b" strokeWidth="0.3" />

          {/* 嫩绿螺旋卷须 (Tendril - 充满春意生机) */}
          <path
            d="M 12 51 
               C 10 46, 12 40, 16 38 
               C 20 36, 22 41, 19 44 
               C 17 46, 14 44, 15 42"
            stroke="#4ade80"
            strokeWidth="0.75"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* ── 6. 盘沿温润反光 ── */}
        <path d="M 34 54 Q 52 58 68 54" stroke="#86efac" strokeWidth="0.8" fill="none" opacity="0.4" pointerEvents="none" />
      </g>
    </BaseFruitDish>
  );
};
