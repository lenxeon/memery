/**
 * @file CarnationsFlower.tsx
 * @description 【写实温润蜜桃粉康乃馨】严格按照参考图重构：
 * 1. 一花一径：5 根细长青绿花茎独立通往花瓶，与花托基部 100% 严丝合缝相接，通体无叶。
 * 2. 高低有致（总计五朵）：
 *    - 删除了开得太旺的生硬平盘大花；
 *    - 5 朵花错落有致：两侧高挑探出、居中粉嫩簇拥、高低俯仰自然（Y: 36, 64, 78, 56, 44）；
 * 3. 色彩渐变粉嫩：
 *    - 参考真实粉色康乃馨：温润蜜桃粉、娇嫩腮红粉与奶白波浪锯齿边缘交融；
 *    - 花托青绿饱满，基部到萼尖自然层次过渡；
 * 4. 真实质感：无花心无花蕊，全是丰富立体、密密麻麻的细碎波浪褶皱瓣片。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const CARNATION_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.5, fallSpan: 0.06, startX: 104, startY: 42, landX: 110, landY: 194, rx: 4.5, ry: 2.8, landRot: 28, swayAmp: 12, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.35, fallSpan: 0.06, startX: 46, startY: 46, landX: 50, landY: 193, rx: 4.6, ry: 2.9, landRot: -30, swayAmp: 10, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.15, fallSpan: 0.05, startX: 75, startY: 64, landX: 78, landY: 195, rx: 4.8, ry: 3.0, landRot: 14, swayAmp: 14, swayFreq: 3.8 },
];

export const CarnationsFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  // ── 娇嫩粉润蜜桃粉色系（白透粉、腮红粉、柔桃粉，完全杜绝浓紫暗黑） ──
  const petalEdge = lerpColor('#ffffff', '#faf6f5', dryFactor);
  const petalHighlight = lerpColor('#fff1f2', '#f6ece8', dryFactor);
  const petalLight = lerpColor('#fce7f3', '#ebd7d0', dryFactor);
  const petalBlush = lerpColor('#fbcfe8', '#dec3bc', dryFactor);
  const petalMid = lerpColor('#f472b6', '#cc8f83', dryFactor);
  const petalDeep = lerpColor('#ec4899', '#b56d60', dryFactor);

  // ── 清新饱满的青绿花托与花茎 ──
  const calyxBaseGreen = lerpColor('#2d6a1e', '#48442b', dryFactor);
  const calyxBodyGreen = lerpColor('#529e2f', '#6c653d', dryFactor);
  const calyxLightGreen = lerpColor('#86efac', '#a3a170', dryFactor);
  const calyxTeeth = lerpColor('#3f8222', '#575231', dryFactor);

  const stemBase = lerpColor('#326b24', '#47422a', dryFactor);
  const stemLight = lerpColor('#5ea83b', '#7c7450', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.5);
  const fl2 = getBlossomDropStyle(health, 0.4);
  const fl3 = getBlossomDropStyle(health, 0.28);
  const fl4 = getBlossomDropStyle(health, 0.16);
  const fl5 = getBlossomDropStyle(health, 0.05);

  const overallOpacity = isFaded ? 0.45 : Math.max(0.65, health);

  /**
   * 细长圆柱杯状青绿花托 (Calyx)
   * 原点 (0, 0) 严格位于花托底端中央，确保与花茎端点 (x, y) 100% 严密贴合无缝！
   */
  const renderCalyx = (h: number = 20, wTop: number = 5.2, wBottom: number = 1.8) => (
    <g>
      {/* 花托下部小副萼片 (小鳞苞片) */}
      <path
        d={`M -${wBottom * 1.3} 1 L -${wBottom * 1.6} -4 L -${wBottom * 0.8} -3 L 0 -5 L ${wBottom * 0.8} -3 L ${wBottom * 1.6} -4 L ${wBottom * 1.3} 1 Z`}
        fill={calyxTeeth}
      />
      {/* 花托主筒体 */}
      <path
        d={`M -${wBottom} 0 
           C -${wBottom * 1.2} -${h * 0.3}, -${wTop * 0.85} -${h * 0.7}, -${wTop} -${h} 
           C -${wTop * 0.5} -${h + 1}, ${wTop * 0.5} -${h + 1}, ${wTop} -${h} 
           C ${wTop * 0.85} -${h * 0.7}, ${wBottom * 1.2} -${h * 0.3}, ${wBottom} 0 Z`}
        fill="url(#carnationCalyxGrad)"
        stroke={calyxBaseGreen}
        strokeWidth="0.35"
      />
      {/* 迎光高光侧棱 */}
      <path
        d={`M ${wBottom * 0.2} -1 Q ${wTop * 0.35} -${h * 0.5} ${wTop * 0.2} -${h}`}
        stroke={calyxLightGreen}
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.85"
        fill="none"
      />
      {/* 顶部包萼尖齿：紧贴花瓣底部向上包拢 */}
      <path
        d={`M -${wTop} -${h} 
           L -${wTop * 0.75} -${h + 3.5} 
           L -${wTop * 0.4} -${h + 0.5} 
           L 0 -${h + 4.2} 
           L ${wTop * 0.4} -${h + 0.5} 
           L ${wTop * 0.75} -${h + 3.5} 
           L ${wTop} -${h} Z`}
        fill={calyxTeeth}
        stroke={calyxBaseGreen}
        strokeWidth="0.3"
      />
    </g>
  );

  /**
   * 优雅自然的粉嫩康乃馨花朵
   * 均采用花托杯口向上喷涌的细密波浪皱褶瓣片，彻底消除平盘圆环感
   */
  const renderFlowerHead = (type: 'tight_bud' | 'bud' | 'bloom', scale: number) => {
    const calyxH = type === 'tight_bud' ? 21 : type === 'bud' ? 19 : 17;
    const calyxW = type === 'tight_bud' ? 4.2 : type === 'bud' ? 5.0 : 5.8;

    return (
      <g transform={`scale(${scale})`}>
        {/* 1. 底部青绿花托：基底位于 (0, 0) */}
        {renderCalyx(calyxH, calyxW, 1.8)}

        {/* 2. 花瓣群：从花托顶部 (0, -calyxH) 自然向外舒展绽放 */}
        <g transform={`translate(0, -${calyxH + 1})`}>
          {type === 'tight_bud' && (
            // ── 紧凑初绽花蕾（花托长，尖端露出层层嫩粉细褶） ──
            <g>
              {/* 外层初探娇嫩小波浪瓣 */}
              <path
                d="M -5 1 C -7 -6, -6 -14, -3 -17 C -1 -12, 0 -6, 0 1 C 0 -6, 1 -12, 3 -17 C 6 -14, 7 -6, 5 1 Z"
                fill="url(#petalBlushGrad)"
              />
              {/* 紧聚花芯小褶 */}
              <path
                d="M -3 -4 Q -5 -13 -2 -16 Q 0 -11 0 -14 Q 0 -11 2 -16 Q 5 -13 3 -4 Z"
                fill="url(#petalMidGrad)"
              />
              {/* 锯齿边缘透光高光 */}
              <path
                d="M -4 -13 Q -2 -16 0 -15 Q 2 -16 4 -13"
                stroke={petalEdge}
                strokeWidth="0.5"
                fill="none"
              />
            </g>
          )}

          {type === 'bud' && (
            // ── 挺拔含苞微放（参考图中部及右侧花朵姿态：向上杯状微开，边缘密布柔细褶纹） ──
            <g>
              {/* 最底层粉白打底衬瓣 */}
              <path
                d="M -11 1 C -14 -6, -11 -16, -6 -20 C -2 -14, -1 -6, 0 1 C 1 -6, 2 -14, 6 -20 C 11 -16, 14 -6, 11 1 Z"
                fill="url(#petalLightGrad)"
              />
              {/* 中层丰满波浪起伏花瓣 */}
              <path
                d="M -10 -2 
                   C -13 -9, -9 -15, -6 -18 
                   C -3 -13, -1 -18, 0 -15 
                   C 1 -18, 3 -13, 6 -18 
                   C 9 -15, 13 -9, 10 -2 
                   C 5 1, -5 1, -10 -2 Z"
                fill="url(#petalBlushGrad)"
              />
              {/* 前排密褶 */}
              <path
                d="M -7 -4 Q -10 -11 -5 -15 Q -1 -10 0 -13 Q 1 -10 5 -15 Q 10 -11 7 -4 Z"
                fill="url(#petalMidGrad)"
              />
              {/* 阴影皱痕 */}
              <path
                d="M -4 -6 Q -6 -12 -1 -13 Q 2 -11 4 -13 Q 6 -12 4 -6 Z"
                fill={petalDeep}
                opacity="0.8"
              />
              {/* 细密如丝的波浪边缘高光线条 */}
              <path
                d="M -10 -14 Q -7 -18 -4 -15 Q -1 -19 2 -15 Q 5 -18 9 -13"
                stroke={petalEdge}
                strokeWidth="0.6"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M -6 -12 Q -3 -14 0 -12 Q 3 -14 6 -12"
                stroke={petalHighlight}
                strokeWidth="0.5"
                fill="none"
              />
            </g>
          )}

          {type === 'bloom' && (
            // ── 娇嫩舒展花朵（水润粉嫩、层层波浪簇拥、绝不过度张扬） ──
            <g>
              {/* 1. 底层大扇形波浪裙瓣 */}
              <path
                d="M -15 1 
                   C -18 -7, -13 -17, -8 -21 
                   C -4 -15, -1 -19, 0 -16 
                   C 1 -19, 4 -15, 8 -21 
                   C 13 -17, 18 -7, 15 1 
                   C 8 3, -8 3, -15 1 Z"
                fill="url(#petalLightGrad)"
              />
              {/* 2. 次层细碎波浪褶皱瓣 */}
              <path
                d="M -13 -3 
                   C -16 -11, -10 -18, -6 -20 
                   C -2 -14, 0 -17, 2 -15 
                   C 4 -17, 7 -14, 10 -19 
                   C 15 -14, 14 -7, 12 -3 
                   C 6 1, -6 1, -13 -3 Z"
                fill="url(#petalBlushGrad)"
              />
              {/* 3. 内层繁密小波浪瓣 */}
              <path
                d="M -10 -5 
                   Q -13 -13 -7 -17 
                   Q -3 -12 0 -15 
                   Q 3 -12 7 -17 
                   Q 13 -13 10 -5 
                   Q 4 0 -4 0 Z"
                fill="url(#petalMidGrad)"
              />
              {/* 4. 纵深立体柔和暗纹 */}
              <path
                d="M -6 -7 Q -8 -13 -2 -15 Q 1 -12 4 -15 Q 7 -13 5 -7 Z"
                fill={petalDeep}
                opacity="0.85"
              />
              <path
                d="M -3 -8 Q -4 -13 0 -14 Q 4 -13 3 -8 Z"
                fill="#be185d"
                opacity="0.6"
              />
              {/* 5. 顶层细致繁复的浪花状锯齿光边 */}
              <path
                d="M -14 -15 Q -10 -20 -6 -16 Q -2 -21 2 -17 Q 6 -20 10 -15 Q 14 -12 13 -6"
                stroke={petalEdge}
                strokeWidth="0.65"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M -9 -14 Q -5 -16 -2 -13 Q 2 -16 6 -13 Q 9 -15 10 -9"
                stroke={petalHighlight}
                strokeWidth="0.55"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M -5 -11 Q -2 -13 1 -11 Q 4 -13 6 -11"
                stroke="#ffffff"
                strokeWidth="0.5"
                fill="none"
              />
            </g>
          )}
        </g>
      </g>
    );
  };

  return (
    <g id="carnationsFlora" style={{ opacity: overallOpacity }}>
      <defs>
        {/* 饱满花托圆柱立体渐变 */}
        <linearGradient id="carnationCalyxGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={calyxBaseGreen} />
          <stop offset="50%" stopColor={calyxBodyGreen} />
          <stop offset="90%" stopColor={calyxLightGreen} />
          <stop offset="100%" stopColor={petalLight} />
        </linearGradient>

        {/* 细长花茎圆柱立体渐变 */}
        <linearGradient id="carnationStemRealGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stemBase} />
          <stop offset="35%" stopColor={stemLight} />
          <stop offset="75%" stopColor={stemBase} />
          <stop offset="100%" stopColor="#1a3d13" />
        </linearGradient>

        {/* 柔粉花瓣层级渐变（纯美通透粉嫩） */}
        <linearGradient id="petalLightGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={petalMid} />
          <stop offset="45%" stopColor={petalBlush} />
          <stop offset="85%" stopColor={petalLight} />
          <stop offset="100%" stopColor={petalEdge} />
        </linearGradient>

        <linearGradient id="petalBlushGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={petalDeep} />
          <stop offset="35%" stopColor={petalMid} />
          <stop offset="80%" stopColor={petalBlush} />
          <stop offset="100%" stopColor={petalHighlight} />
        </linearGradient>

        <linearGradient id="petalMidGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#be185d" />
          <stop offset="30%" stopColor={petalDeep} />
          <stop offset="70%" stopColor={petalMid} />
          <stop offset="100%" stopColor={petalBlush} />
        </linearGradient>
      </defs>

      {/* ─────────────────────────────────────────────────────────────
          一花一径：5 根细长优雅的青绿花茎（无叶，与花托底座 100% 紧密闭合连接）
          花朵位置（高低错落有致）：
          1. 左侧高位花蕾： (35, 36)  — 倾角 -16°
          2. 左中位舒展花： (52, 64)  — 倾角 -9°
          3. 居中核心花朵： (75, 78)  — 倾角 0°（略偏低，与瓶口呼应）
          4. 右中位含苞花： (98, 56)  — 倾角 +12°
          5. 右侧高位微绽： (118, 44) — 倾角 +18°
      ───────────────────────────────────────────────────────────── */}
      <g id="carnationLongStems">
        {/* 1. 左高枝花茎：平滑弧线从瓶口直连 (35, 36) */}
        <path
          d="M 72 125 C 65 98, 43 66, 35 36"
          stroke="url(#carnationStemRealGrad)"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />

        {/* 2. 左中枝花茎：平滑弧线连往 (52, 64) */}
        <path
          d="M 73 125 C 70 106, 59 86, 52 64"
          stroke="url(#carnationStemRealGrad)"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />

        {/* 3. 居中直立花茎：平滑挺拔连往 (75, 78) */}
        <path
          d="M 75 125 C 75 110, 75 94, 75 78"
          stroke="url(#carnationStemRealGrad)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* 4. 右中枝花茎：平滑弧线连往 (98, 56) */}
        <path
          d="M 77 125 C 82 104, 91 80, 98 56"
          stroke="url(#carnationStemRealGrad)"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />

        {/* 5. 右高枝花茎：向右上轻扬弧线连往 (118, 44) */}
        <path
          d="M 78 125 C 86 100, 108 72, 118 44"
          stroke="url(#carnationStemRealGrad)"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* ─────────────────────────────────────────────────────────────
          五朵粉嫩高低有致花朵（原点精准对齐花托底座，严禁悬空与错位）
      ───────────────────────────────────────────────────────────── */}
      <g id="carnationFlowers">
        {/* 1. 左极高位：初绽含苞花蕾，挺拔秀丽 */}
        <g transform="translate(35, 36) rotate(-16)" style={fl1}>
          {renderFlowerHead('tight_bud', 0.95)}
        </g>

        {/* 2. 左中位：娇美微绽花朵，水灵粉嫩 */}
        <g transform="translate(52, 64) rotate(-9)" style={fl2}>
          {renderFlowerHead('bloom', 1.05)}
        </g>

        {/* 3. 居中核心位：含苞待放主花，层次丰富 */}
        <g transform="translate(75, 78) rotate(0)" style={fl3}>
          {renderFlowerHead('bloom', 1.12)}
        </g>

        {/* 4. 右中位：含苞待放，向上探展 */}
        <g transform="translate(98, 56) rotate(12)" style={fl4}>
          {renderFlowerHead('bud', 1.0)}
        </g>

        {/* 5. 右高位：斜向舒展花蕾，娇嫩呼应 */}
        <g transform="translate(118, 44) rotate(18)" style={fl5}>
          {renderFlowerHead('bud', 0.96)}
        </g>
      </g>
    </g>
  );
};
