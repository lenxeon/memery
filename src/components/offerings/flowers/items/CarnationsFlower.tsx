/**
 * @file CarnationsFlower.tsx
 * @description 【写实温润蜜桃粉康乃馨】
 * 核心特征：
 * 1. 配色：纯正温润蜜桃柔粉，娇嫩层叠，边缘浅透。
 * 2. 此花无叶：通体一片叶子都不长，仅在清秀茎节处留有极微细抱茎干膜托片。
 * 3. 花托硕大且色彩过渡自然：基部是肥厚圆筒倒钟状大花托，由深青绿过渡至嫩黄绿，再自然融入花瓣基部的极淡粉白。
 * 4. 花无花心、无花蕊：内部全由细碎丰富、密密匝匝的锯齿波浪褶皱花瓣团簇充盈。
 * 5. 层次构图：错落主副分支，姿态自然清秀。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const CARNATION_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.5, fallSpan: 0.06, startX: 108, startY: 34, landX: 114, landY: 194, rx: 4.8, ry: 3.0, landRot: 28, swayAmp: 12, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.4, fallSpan: 0.06, startX: 40, startY: 42, landX: 45, landY: 193, rx: 5.0, ry: 3.2, landRot: -30, swayAmp: 10, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.25, fallSpan: 0.06, startX: 74, startY: 58, landX: 78, landY: 195, rx: 5.2, ry: 3.4, landRot: -18, swayAmp: 14, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.12, fallSpan: 0.05, startX: 86, startY: 26, landX: 90, landY: 197, rx: 5.4, ry: 3.5, landRot: 32, swayAmp: 15, swayFreq: 4.0 },
];

export const CarnationsFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  // ── 蜜桃柔粉衰变色：清雅温润粉（#f9a8d4, #f472b6, #fda4af, #fff1f2） ──
  const petalEdge = lerpColor('#fff1f2', '#f3e8e2', dryFactor);
  const petalLight = lerpColor('#fbcfe8', '#e2cbbe', dryFactor);
  const petalMid = lerpColor('#f472b6', '#ba8a7e', dryFactor);
  const petalDeep = lerpColor('#db2777', '#8a554a', dryFactor);
  const petalFoldShadow = lerpColor('#9d174d', '#542f28', dryFactor);

  // ── 硕大花托色彩过渡：深墨青绿 -> 嫩黄绿 -> 浅玉绿 -> 泛粉 ──
  const calyxBase = lerpColor('#1e4d1e', '#3b3826', dryFactor);
  const calyxMid = lerpColor('#4d9929', '#635c3c', dryFactor);
  const calyxTop = lerpColor('#a3e635', '#8a885b', dryFactor);
  const calyxRim = lerpColor('#d9f99d', '#b5b28d', dryFactor);

  // 茎杆色
  const stemBase = lerpColor('#2d6324', '#473f2b', dryFactor);
  const stemLight = lerpColor('#529e3a', '#786e4e', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.5);
  const fl2 = getBlossomDropStyle(health, 0.4);
  const fl3 = getBlossomDropStyle(health, 0.25);
  const fl4 = getBlossomDropStyle(health, 0.12);
  const fl5 = getBlossomDropStyle(health, 0.05);

  const overallOpacity = isFaded ? 0.45 : Math.max(0.65, health);

  /**
   * 绘制单朵写实康乃馨：
   * 1. 巨大且圆润挺拔的深绿至嫩绿渐变长花托（Calyx）
   * 2. 多重锯齿波浪褶皱合抱花瓣，无任何花心与花蕊，纯粹由花瓣叠满
   */
  const renderCarnationUnit = (
    cx: number,
    cy: number,
    scale: number = 1.0,
    rot: number = 0,
    fullness: 'bud' | 'semi' | 'full' = 'full'
  ) => {
    return (
      <g transform={`translate(${cx}, ${cy}) rotate(${rot}) scale(${scale})`}>
        {/* ── 1. 硕大肥厚长圆筒杯状花托 (大且色彩平滑过渡) ── */}
        <g id="carnationCalyxBig">
          {/* 花托主杯身（长达 22px，上宽下圆收腰，由深绿过渡至浅黄绿） */}
          <path
            d="M -5.5 2 C -7 8, -6 18, -3 24 C -0.5 25.5, 0.5 25.5, 3 24 C 6 18, 7 8, 5.5 2 Z"
            fill="url(#calyxBigGrad)"
            stroke={calyxBase}
            strokeWidth="0.5"
          />

          {/* 花托背光侧阴影 */}
          <path
            d="M -5.5 2 C -7 8, -6 18, -3 24 C -1 25, 0 25, 0 2 C -2 2, -4 2, -5.5 2 Z"
            fill="#0f2b0f"
            opacity="0.25"
          />

          {/* 花托迎光立体饱满纵向反光 */}
          <path
            d="M 1 24 Q 3 14 2 2"
            stroke="url(#calyxHighlightGrad)"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />

          {/* 花托顶部 5 裂尖齿苞片（紧扣在花冠底部，尖头微黄绿带浅红晕） */}
          <path d="M -5.5 2 L -4 -2 L -2.5 2 L 0 -3 L 2.5 2 L 4 -2 L 5.5 2 Z" fill={calyxTop} stroke={calyxBase} strokeWidth="0.4" />

          {/* 基部外轮包被的小副萼（小鳞苞片紧包花托底部） */}
          <path d="M -3 24 L -4 19 L -1.5 21 L 0 18 L 1.5 21 L 4 19 L 3 24 Z" fill={calyxBase} opacity="0.85" />
        </g>

        {/* ── 2. 多重锯齿波浪褶皱花瓣（完全无花心、无花蕊，全是细密褶皱） ── */}
        <g id="carnationCrinkledPetals">
          {/* 第 1 层：后背舒展托瓣（外展大锯齿波浪，粉白通透） */}
          <path
            d="M -16 2 C -18 -4, -15 -14, -11 -18 C -7 -14, -8 -8, -5 -5 C -3 -12, 3 -12, 5 -5 C 8 -8, 7 -14, 11 -18 C 15 -14, 18 -4, 16 2 C 10 5, -10 5, -16 2 Z"
            fill="url(#petalBackGrad)"
            opacity="0.85"
          />

          {/* 第 2 层：外围下垂波浪大褶皱瓣（边缘密布极细微锯齿裂刻） */}
          <path
            d="M -17 0 Q -21 -6 -16 -12 Q -12 -9 -9 -14 Q -5 -8 -2 -15 Q 2 -8 5 -14 Q 9 -9 12 -12 Q 17 -6 17 0 Q 10 7 0 7 Q -10 7 -17 0 Z"
            fill="url(#petalMainGrad)"
            stroke={petalEdge}
            strokeWidth="0.35"
          />

          {/* 第 3 层：中部向上聚拢翻折瓣（波浪起伏，深浅交叠） */}
          <path
            d="M -13 -2 C -16 -8, -13 -15, -8 -17 C -5 -13, -4 -9, -1 -9 C 2 -12, 5 -16, 9 -15 C 13 -13, 14 -7, 12 -2 C 6 2, -6 2, -13 -2 Z"
            fill="url(#petalMidGrad)"
          />

          {/* 第 4 层：内部繁密细碎褶皱团簇（无花心，紧紧挤在一起的褶皱） */}
          <path
            d="M -9 -5 Q -12 -12 -6 -16 Q -2 -11 0 -15 Q 3 -10 7 -14 Q 9 -9 7 -5 Q 2 -1 -3 -1 Q -7 -1 -9 -5 Z"
            fill="url(#petalDenseGrad)"
          />

          {/* 第 5 层：顶心翻卷花褶（褶皱密闭，只有层叠的粉红色褶瓣） */}
          {fullness !== 'bud' && (
            <g>
              {/* 核心内层褶纹阴影与高光翻边 */}
              <path
                d="M -5 -7 Q -8 -13 -3 -15 Q 0 -11 3 -14 Q 6 -10 4 -7 Q 0 -4 -5 -7 Z"
                fill={petalDeep}
              />
              <path
                d="M -3 -8 Q -4 -13 0 -13 Q 3 -12 2 -8 Z"
                fill={petalFoldShadow}
              />
              {/* 极细微粉白边缘碎浪齿纹（高光精细勾边） */}
              <path
                d="M -14 -11 Q -11 -8 -8 -13 Q -4 -8 0 -13 Q 4 -8 8 -12 Q 12 -8 14 -10"
                stroke={petalEdge}
                strokeWidth="0.5"
                fill="none"
                opacity="0.8"
              />
              <path
                d="M -10 -15 Q -6 -11 -2 -14 Q 2 -11 6 -13"
                stroke="#ffffff"
                strokeWidth="0.45"
                fill="none"
                opacity="0.85"
              />
            </g>
          )}

          {/* 外瓣边缘反折立体高光 */}
          <path
            d="M -16 0 C -18 -4, -15 -10, -11 -11"
            stroke="#ffffff"
            strokeWidth="0.65"
            fill="none"
            opacity="0.6"
            strokeLinecap="round"
          />
          <path
            d="M 12 -11 C 15 -9, 17 -4, 16 0"
            stroke="#ffffff"
            strokeWidth="0.65"
            fill="none"
            opacity="0.6"
            strokeLinecap="round"
          />
        </g>
      </g>
    );
  };

  return (
    <g id="carnationsFlora" style={{ opacity: overallOpacity }}>
      <defs>
        {/* 硕大花托由深青绿至嫩黄绿平滑过渡渐变 */}
        <linearGradient id="calyxBigGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={calyxBase} />
          <stop offset="55%" stopColor={calyxMid} />
          <stop offset="90%" stopColor={calyxTop} />
          <stop offset="100%" stopColor={calyxRim} />
        </linearGradient>

        {/* 花托纵向圆柱高光 */}
        <linearGradient id="calyxHighlightGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={calyxBase} stopOpacity="0.2" />
          <stop offset="60%" stopColor="#d9f99d" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6" />
        </linearGradient>

        {/* 细挺花茎圆柱立体光 */}
        <linearGradient id="carnationStemGradReal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stemBase} />
          <stop offset="35%" stopColor={stemLight} />
          <stop offset="80%" stopColor={stemBase} />
          <stop offset="100%" stopColor="#193816" />
        </linearGradient>

        {/* 蜜桃粉花瓣各层渐变（多重层次过渡） */}
        <radialGradient id="petalMainGrad" cx="50%" cy="60%" r="65%">
          <stop offset="0%" stopColor={petalDeep} />
          <stop offset="45%" stopColor={petalMid} />
          <stop offset="85%" stopColor={petalLight} />
          <stop offset="100%" stopColor={petalEdge} />
        </radialGradient>

        <linearGradient id="petalMidGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={petalDeep} />
          <stop offset="40%" stopColor={petalMid} />
          <stop offset="85%" stopColor={petalLight} />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>

        <linearGradient id="petalDenseGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={petalFoldShadow} />
          <stop offset="50%" stopColor={petalDeep} />
          <stop offset="100%" stopColor={petalLight} />
        </linearGradient>

        <linearGradient id="petalBackGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={petalMid} />
          <stop offset="100%" stopColor={petalLight} />
        </linearGradient>
      </defs>

      {/* ─────────────────────────────────────────────────────────────
          花茎与极小节托（通体绝不生叶，严格依参考图）
      ───────────────────────────────────────────────────────────── */}
      <g id="carnationStemsNoLeaf">
        {/* 1. 居中主花直挺长茎 (通体无叶，挺拔修长) */}
        <path d="M 75 125 L 75 90 L 74 62" stroke="url(#carnationStemGradReal)" strokeWidth="3.2" fill="none" strokeLinecap="round" />

        {/* 2. 左侧修长主枝茎 (自中下部微向左分出，高拔斜挺) */}
        <path d="M 73 125 Q 68 85 46 48" stroke="url(#carnationStemGradReal)" strokeWidth="3.0" fill="none" strokeLinecap="round" />

        {/* 3. 左上方极高耸侧枝 (自左主枝分叉向上破空而起) */}
        <path d="M 58 72 Q 44 42 32 16" stroke="url(#carnationStemGradReal)" strokeWidth="2.4" fill="none" strokeLinecap="round" />

        {/* 4. 右侧前倾中枝 */}
        <path d="M 76 125 Q 82 82 92 48" stroke="url(#carnationStemGradReal)" strokeWidth="3.0" fill="none" strokeLinecap="round" />

        {/* 5. 右上侧轻盈挺枝 */}
        <path d="M 84 68 Q 98 46 112 36" stroke="url(#carnationStemGradReal)" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* ── 茎节微小干膜托片（极小，紧抱茎节，绝非长叶，真实还原石竹科植物特征） ── */}
        <g id="carnationStemNodes">
          <ellipse cx="75" cy="102" rx="2.0" ry="1.1" fill={calyxBase} />
          <path d="M 73 103 L 72 99 L 75 102 L 77 99 L 76 103 Z" fill={calyxMid} />

          <ellipse cx="64" cy="80" rx="1.8" ry="1.0" fill={calyxBase} />
          <path d="M 62 81 L 60 77 L 63 80 L 65 77 L 64 81 Z" fill={calyxMid} />

          <ellipse cx="80" cy="82" rx="1.8" ry="1.0" fill={calyxBase} />
          <path d="M 78 83 L 77 79 L 80 82 L 82 79 L 81 83 Z" fill={calyxMid} />

          <ellipse cx="44" cy="46" rx="1.6" ry="0.9" fill={calyxBase} />
          <ellipse cx="94" cy="56" rx="1.6" ry="0.9" fill={calyxBase} />
        </g>
      </g>

      {/* ─────────────────────────────────────────────────────────────
          五朵错落有致的温润蜜桃粉康乃馨（大花托自然过渡、密密匝匝细褶皱）
      ───────────────────────────────────────────────────────────── */}
      <g id="carnationBlooms">
        {/* 1. 居中近景：丰满盛开大花（位置居中略偏下，正对视线，肥厚大花托向下收至花茎） */}
        <g style={fl1}>{renderCarnationUnit(74, 60, 1.25, 0, 'full')}</g>

        {/* 2. 左侧主位：饱满斜仰花朵（向左微倾，花托饱满，褶皱层叠） */}
        <g style={fl2}>{renderCarnationUnit(46, 46, 1.15, -12, 'full')}</g>

        {/* 3. 左上方极高位：高挑清雅侧颜花（破空高立，花托修长直挺，尽显层次高低错落） */}
        <g style={fl3}>{renderCarnationUnit(32, 14, 0.96, -20, 'semi')}</g>

        {/* 4. 右中位：初绽温婉花朵（向右微昂，硕大花托过渡至娇嫩粉瓣） */}
        <g style={fl4}>{renderCarnationUnit(92, 46, 1.08, 10, 'full')}</g>

        {/* 5. 右上方高位：半开轻灵花苞（右上方呼应，花托修长优雅，顶部褶皱聚拢如贝） */}
        <g style={fl5}>{renderCarnationUnit(112, 34, 0.92, 22, 'semi')}</g>
      </g>
    </g>
  );
};

