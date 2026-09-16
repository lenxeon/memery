/**
 * @file PlumsFruit.tsx
 * @description 【甜甜蜜蜜 · 硕果芳华】金玉蜂糖李工笔写实供品组件。
 * 忠实还原“李中之王”贵州镇宁蜂糖李之神韵：
 * 1. 7-9 颗硕大圆润、略呈心形微凹的大蜂糖李错落堆叠成金字塔寿果丘。
 * 2. 标志性如凝脂蜂蜜般通透的金黄至蜜蜡琥珀色泽，向阳果肩晕染娇嫩的暖杏红霞。
 * 3. 缝合线深浅分明（蜂糖李经典深缝印记），表皮覆以一层细腻薄透的天然白霜果粉（Honey Bloom）。
 * 4. 晶莹油润微光沿饱满果脊流淌，顶缀苍翠带露小李叶与木质果柄。
 */
import React from 'react';
import { FruitProps } from '../types';
import { BaseFruitDish } from '../BaseFruitDish';

export const PlumsFruit: React.FC<FruitProps> = ({ scale, className, onClick }) => {
  const defs = (
    <>
      {/* 1. 蜂糖李通透金蜜主色渐变 (凝脂蜜蜡黄至温润琥珀金) */}
      <radialGradient id="honeyPlumSkinGrad" cx="36%" cy="32%" r="68%">
        <stop offset="0%" stopColor="#fefce8" />
        <stop offset="20%" stopColor="#fef08a" />
        <stop offset="45%" stopColor="#fde047" />
        <stop offset="70%" stopColor="#facc15" />
        <stop offset="88%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </radialGradient>

      {/* 2. 后排深色蜜金渐变 (背阴暗面) */}
      <radialGradient id="honeyPlumDarkGrad" cx="38%" cy="32%" r="65%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="30%" stopColor="#facc15" />
        <stop offset="65%" stopColor="#d97706" />
        <stop offset="90%" stopColor="#b45309" />
        <stop offset="100%" stopColor="#78350f" />
      </radialGradient>

      {/* 3. 向阳果肩暖杏红霞红晕 (Honey Apricot Blush) */}
      <radialGradient id="honeyPlumBlush" cx="35%" cy="30%" r="50%">
        <stop offset="0%" stopColor="#fb923c" stopOpacity="0.7" />
        <stop offset="40%" stopColor="#f97316" stopOpacity="0.4" />
        <stop offset="80%" stopColor="#ea580c" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#c2410c" stopOpacity="0" />
      </radialGradient>

      {/* 4. 蜂糖李表皮天然白霜薄雾 (Delicate Fruit Bloom Sheen) */}
      <radialGradient id="honeyPlumBloomFrost" cx="35%" cy="30%" r="55%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
        <stop offset="35%" stopColor="#fef9c3" stopOpacity="0.5" />
        <stop offset="70%" stopColor="#fde047" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
      </radialGradient>

      {/* 5. 鲜活李叶渐变 */}
      <linearGradient id="plumLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#86efac" />
        <stop offset="35%" stopColor="#22c55e" />
        <stop offset="80%" stopColor="#15803d" />
        <stop offset="100%" stopColor="#064e3b" />
      </linearGradient>

      {/* 6. 盘底接触深影 */}
      <radialGradient id="plumPlateOcclusion" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#451a03" stopOpacity="0.85" />
        <stop offset="60%" stopColor="#78350f" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
    </>
  );

  // 单颗心形蜂糖李渲染器
  const renderPlum = (
    cx: number,
    cy: number,
    r: number,
    rotate: number = 0,
    isDark: boolean = false,
    hasStem: boolean = false
  ) => {
    return (
      <g transform={`rotate(${rotate}, ${cx}, ${cy})`}>
        {/* 心形圆润李子本体 */}
        <path
          d={`M ${cx} ${cy - r}
             C ${cx + r * 0.7} ${cy - r * 1.05}, ${cx + r * 1.15} ${cy - r * 0.3}, ${cx + r * 1.05} ${cy + r * 0.4}
             C ${cx + r * 0.95} ${cy + r * 0.9}, ${cx + r * 0.3} ${cy + r * 1.15}, ${cx} ${cy + r * 1.18}
             C ${cx - r * 0.3} ${cy + r * 1.15}, ${cx - r * 0.95} ${cy + r * 0.9}, ${cx - r * 1.05} ${cy + r * 0.4}
             C ${cx - r * 1.15} ${cy - r * 0.3}, ${cx - r * 0.7} ${cy - r * 1.05}, ${cx} ${cy - r} Z`}
          fill={isDark ? 'url(#honeyPlumDarkGrad)' : 'url(#honeyPlumSkinGrad)'}
          stroke="#b45309"
          strokeWidth="0.35"
        />

        {/* 向阳果肩暖杏红霞 (Apricot Blush) */}
        {!isDark && (
          <path
            d={`M ${cx} ${cy - r * 0.95}
               C ${cx + r * 0.5} ${cy - r * 1.0}, ${cx + r * 0.9} ${cy - r * 0.2}, ${cx + r * 0.7} ${cy + r * 0.3}
               C ${cx + r * 0.4} ${cy + r * 0.6}, ${cx} ${cy + r * 0.4}, ${cx} ${cy - r * 0.95} Z`}
            fill="url(#honeyPlumBlush)"
          />
        )}

        {/* 表皮天然白霜薄雾 (Bloom Overlay) */}
        <path
          d={`M ${cx} ${cy - r * 0.9}
             C ${cx + r * 0.6} ${cy - r * 0.95}, ${cx + r * 0.9} ${cy - r * 0.2}, ${cx + r * 0.8} ${cy + r * 0.4}
             C ${cx + r * 0.5} ${cy + r * 0.8}, ${cx} ${cy + r * 0.9}, ${cx} ${cy + r * 0.9}
             C ${cx - r * 0.4} ${cy + r * 0.7}, ${cx - r * 0.8} ${cy + r * 0.3}, ${cx - r * 0.8} ${cy - r * 0.2}
             C ${cx - r * 0.6} ${cy - r * 0.9}, ${cx} ${cy - r * 0.9}, ${cx} ${cy - r * 0.9} Z`}
          fill="url(#honeyPlumBloomFrost)"
          opacity="0.85"
        />

        {/* 蜂糖李经典深缝合线 (Distinct Suture Groove) */}
        <path
          d={`M ${cx} ${cy - r * 0.9} C ${cx - r * 0.22} ${cy}, ${cx - r * 0.18} ${cy + r * 0.6}, ${cx} ${cy + r * 1.15}`}
          stroke="#b45309"
          strokeWidth="0.55"
          fill="none"
          opacity="0.6"
          strokeLinecap="round"
        />

        {/* 晶莹聚光流光高光 */}
        <ellipse
          cx={cx - r * 0.35}
          cy={cy - r * 0.35}
          rx={r * 0.28}
          ry={r * 0.16}
          fill="#ffffff"
          opacity="0.75"
          transform={`rotate(-25, ${cx - r * 0.35}, ${cy - r * 0.35})`}
        />

        {/* 果蒂窝凹与小柄 */}
        {hasStem && (
          <g>
            <ellipse cx={cx} cy={cy - r * 0.85} rx={r * 0.2} ry={r * 0.08} fill="#78350f" opacity="0.6" />
            <path
              d={`M ${cx} ${cy - r * 0.85} C ${cx + 1} ${cy - r * 1.15}, ${cx - 2} ${cy - r * 1.3}, ${cx - 3} ${cy - r * 1.4}`}
              stroke="#542b08"
              strokeWidth="0.8"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        )}
      </g>
    );
  };

  return (
    <BaseFruitDish
      title="清供名果 · 蜂糖李（甜甜蜜蜜）"
      nextName="果后山竹"
      scale={scale}
      className={className}
      onClick={onClick}
      defsSlot={defs}
    >
      <g id="honeyPlumsFruitGroup">
        {/* ── 0. 盘底接地深影 ── */}
        <ellipse cx="54" cy="56.5" rx="32" ry="6.8" fill="url(#plumPlateOcclusion)" />

        {/* ── 1. 顶层衬托翡翠小李叶 ── */}
        <g id="plumFoliage">
          {/* 左侧向外斜展李叶 */}
          <path
            d="M 52 24 C 44 18, 35 18, 29 23 C 33 28, 42 29, 50 26 Z"
            fill="url(#plumLeafGrad)"
            stroke="#064e3b"
            strokeWidth="0.35"
          />
          <path d="M 51 25 Q 40 22 30 22" stroke="#dcfce7" strokeWidth="0.4" fill="none" opacity="0.8" />

          {/* 右侧微卷小李叶 */}
          <path
            d="M 55 23 C 62 16, 72 17, 78 22 C 73 26, 64 27, 56 25 Z"
            fill="url(#plumLeafGrad)"
            stroke="#064e3b"
            strokeWidth="0.35"
          />
          <path d="M 56 24 Q 66 21 76 21" stroke="#dcfce7" strokeWidth="0.4" fill="none" opacity="0.8" />
        </g>

        {/* ── 2. 底层暗排蜂糖李 (Back Layer - 稳稳落座) ── */}
        <g id="plumsBackLayer">
          {renderPlum(34, 46, 9.5, -12, true)}
          {renderPlum(72, 46, 9.5, 15, true)}
          {renderPlum(42, 36, 9.0, -8, true)}
          {renderPlum(64, 36, 9.0, 10, true)}
        </g>

        {/* ── 3. 中层与前排黄金熟李 (Front Main Layer - 蜜润如脂) ── */}
        <g id="plumsFrontLayer">
          {/* 左前李 */}
          {renderPlum(38, 51, 10.0, -6, false, true)}
          {/* 右前李 */}
          {renderPlum(68, 51, 10.0, 8, false, true)}
          {/* 核心中位大蜂糖李 */}
          {renderPlum(53, 49, 10.8, 2, false, true)}
          {/* 金字塔顶端明珠李 */}
          {renderPlum(53, 30, 9.6, -4, false, true)}
        </g>

        {/* ── 4. 盘沿温润金黄反光 ── */}
        <path d="M 34 54 Q 52 58 68 54" stroke="#fde047" strokeWidth="0.8" fill="none" opacity="0.45" pointerEvents="none" />
      </g>
    </BaseFruitDish>
  );
};
