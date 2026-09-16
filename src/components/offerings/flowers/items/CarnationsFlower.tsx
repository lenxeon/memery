/**
 * @file CarnationsFlower.tsx
 * @description 【写实温润蜜桃粉康乃馨】严格遵循用户要求：
 * 1. 保证一花一径：5 根细长青绿花茎各自从瓶口独立直通花底，无叶，绝无断开悬空。
 * 2. 杜绝开得太旺：
 *    - 3 支为精巧紧凑的【小花骨朵】（长青绿花托，顶端仅探出一小撮粉嫩卷褶花尖）；
 *    - 2 支为优雅含蓄的【小朵初绽花】（杯状聚拢微开，紧凑水润，绝无大平盘外翻）；
 * 3. 高低有致：
 *    - 5 枝高度与姿态错落有致，宛若花艺师精心插瓶：
 *      • 枝1 (左高-花骨朵): (36, 32)
 *      • 枝2 (左中-小绽花): (52, 60)
 *      • 枝3 (中高-花骨朵): (72, 38)
 *      • 枝4 (右中低-小绽花): (88, 66)
 *      • 枝5 (右高-花骨朵): (114, 46)
 * 4. 色彩渐变粉嫩：纯净柔粉、蜜桃腮红粉与奶白波浪锯齿，花托青绿过渡自然。
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
  // ── 娇嫩粉润蜜桃粉色系（水灵通透粉白、柔桃粉、腮红粉，杜绝浓重暗紫） ──
  const petalWhite = lerpColor('#ffffff', '#faf6f5', dryFactor);
  const petalSoftEdge = lerpColor('#fff1f2', '#f6ede8', dryFactor);
  const petalBlush = lerpColor('#fce7f3', '#eadad2', dryFactor);
  const petalMid = lerpColor('#f9a8d4', '#d8b2a8', dryFactor);
  const petalCore = lerpColor('#f472b6', '#c4877b', dryFactor);
  const petalDeep = lerpColor('#ec4899', '#ab6256', dryFactor);

  // ── 清新饱满的青绿花托与细长花茎 ──
  const calyxBase = lerpColor('#2d6a1e', '#49442b', dryFactor);
  const calyxMid = lerpColor('#529e2f', '#6e673e', dryFactor);
  const calyxLight = lerpColor('#86efac', '#a4a273', dryFactor);
  const calyxTeeth = lerpColor('#3f8222', '#565130', dryFactor);

  const stemDark = lerpColor('#2b641d', '#454029', dryFactor);
  const stemBright = lerpColor('#5aa338', '#7b734f', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.5);
  const fl2 = getBlossomDropStyle(health, 0.4);
  const fl3 = getBlossomDropStyle(health, 0.28);
  const fl4 = getBlossomDropStyle(health, 0.16);
  const fl5 = getBlossomDropStyle(health, 0.05);

  const overallOpacity = isFaded ? 0.45 : Math.max(0.65, health);

  /**
   * 细长圆柱杯状青绿花托 (Calyx)
   * 原点 (0, 0) 严格位于花托底端，与花茎端点 100% 严丝合缝
   */
  const renderCalyx = (h: number = 22, wTop: number = 4.8, wBottom: number = 1.8) => (
    <g>
      {/* 花托基部小鳞苞包片 */}
      <path
        d={`M -${wBottom * 1.3} 1 L -${wBottom * 1.5} -3.5 L -${wBottom * 0.7} -2.5 L 0 -4.5 L ${wBottom * 0.7} -2.5 L ${wBottom * 1.5} -3.5 L ${wBottom * 1.3} 1 Z`}
        fill={calyxTeeth}
      />
      {/* 倒圆锥花托主筒体 */}
      <path
        d={`M -${wBottom} 0 
           C -${wBottom * 1.15} -${h * 0.3}, -${wTop * 0.85} -${h * 0.7}, -${wTop} -${h} 
           C -${wTop * 0.5} -${h + 1}, ${wTop * 0.5} -${h + 1}, ${wTop} -${h} 
           C ${wTop * 0.85} -${h * 0.7}, ${wBottom * 1.15} -${h * 0.3}, ${wBottom} 0 Z`}
        fill="url(#carnationCalyxGrad)"
        stroke={calyxBase}
        strokeWidth="0.3"
      />
      {/* 迎光圆柱侧高光 */}
      <path
        d={`M ${wBottom * 0.2} -1 Q ${wTop * 0.3} -${h * 0.5} ${wTop * 0.2} -${h}`}
        stroke={calyxLight}
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.85"
        fill="none"
      />
      {/* 顶部包萼尖齿：紧贴花瓣基底 */}
      <path
        d={`M -${wTop} -${h} 
           L -${wTop * 0.75} -${h + 3.2} 
           L -${wTop * 0.35} -${h + 0.5} 
           L 0 -${h + 4.0} 
           L ${wTop * 0.35} -${h + 0.5} 
           L ${wTop * 0.75} -${h + 3.2} 
           L ${wTop} -${h} Z`}
        fill={calyxTeeth}
        stroke={calyxBase}
        strokeWidth="0.3"
      />
    </g>
  );

  /**
   * 1. 【小小的花骨朵】（紧致修长，青绿花托顶端只探出一簇娇嫩细小的粉红尖芽）
   */
  const renderTinyBud = (scale: number = 1.0) => (
    <g transform={`scale(${scale})`}>
      {/* 花托基底位于 (0, 0) */}
      {renderCalyx(21, 4.2, 1.7)}
      {/* 花托顶部探出的小花尖 */}
      <g transform="translate(0, -22)">
        {/* 初探粉红花心尖瓣 */}
        <path
          d="M -3 1 C -4 -4, -3 -9, 0 -11 C 3 -9, 4 -4, 3 1 Z"
          fill="url(#petalCoreGrad)"
        />
        <path
          d="M -2 -1 Q -3 -7 0 -9 Q 3 -7 2 -1 Z"
          fill="url(#petalBlushGrad)"
        />
        {/* 顶部微卷嫩白高光边缘 */}
        <path
          d="M -2 -7 Q 0 -10 2 -7"
          stroke={petalWhite}
          strokeWidth="0.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </g>
  );

  /**
   * 2. 【小朵初绽花】（开的小一点，紧凑杯状向上微展，细密波浪皱褶，绝不过大）
   */
  const renderSmallBloom = (scale: number = 1.0) => (
    <g transform={`scale(${scale})`}>
      {/* 花托基底位于 (0, 0) */}
      {renderCalyx(19, 5.0, 1.8)}
      {/* 花瓣群：紧凑杯状向上舒展 */}
      <g transform="translate(0, -20)">
        {/* 底层小波浪外瓣 */}
        <path
          d="M -8 1 C -10 -5, -8 -13, -4 -16 C -1 -11, 0 -14, 1 -11 C 5 -14, 8 -11, 8 1 Z"
          fill="url(#petalLightGrad)"
        />
        {/* 中层细密起伏褶皱花瓣 */}
        <path
          d="M -7 -2 
             C -9 -7, -6 -12, -3 -14 
             C 0 -11, 1 -11, 4 -14 
             C 7 -12, 8 -7, 6 -2 
             C 3 0, -3 0, -7 -2 Z"
          fill="url(#petalBlushGrad)"
        />
        {/* 核心紧聚小皱瓣 */}
        <path
          d="M -4 -4 Q -6 -9 -2 -11 Q 0 -8 2 -11 Q 5 -9 3 -4 Z"
          fill="url(#petalCoreGrad)"
        />
        <path
          d="M -2 -5 Q 0 -9 2 -5 Z"
          fill={petalDeep}
          opacity="0.8"
        />
        {/* 细密波浪锯齿高光边 */}
        <path
          d="M -7 -10 Q -4 -14 -1 -11 Q 2 -14 6 -10"
          stroke={petalWhite}
          strokeWidth="0.55"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M -4 -9 Q 0 -11 3 -9"
          stroke={petalSoftEdge}
          strokeWidth="0.45"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </g>
  );

  return (
    <g id="carnationsFlora" style={{ opacity: overallOpacity }}>
      <defs>
        {/* 青绿花托立体渐变 */}
        <linearGradient id="carnationCalyxGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={calyxBase} />
          <stop offset="45%" stopColor={calyxMid} />
          <stop offset="85%" stopColor={calyxLight} />
          <stop offset="100%" stopColor={petalBlush} />
        </linearGradient>

        {/* 细长花茎圆柱立体渐变 */}
        <linearGradient id="carnationStemRealGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stemDark} />
          <stop offset="35%" stopColor={stemBright} />
          <stop offset="75%" stopColor={stemDark} />
          <stop offset="100%" stopColor="#153610" />
        </linearGradient>

        {/* 粉嫩花瓣层级渐变 */}
        <linearGradient id="petalLightGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={petalCore} />
          <stop offset="40%" stopColor={petalMid} />
          <stop offset="80%" stopColor={petalBlush} />
          <stop offset="100%" stopColor={petalWhite} />
        </linearGradient>

        <linearGradient id="petalBlushGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={petalDeep} />
          <stop offset="35%" stopColor={petalCore} />
          <stop offset="75%" stopColor={petalMid} />
          <stop offset="100%" stopColor={petalSoftEdge} />
        </linearGradient>

        <linearGradient id="petalCoreGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={petalDeep} />
          <stop offset="50%" stopColor={petalCore} />
          <stop offset="100%" stopColor={petalMid} />
        </linearGradient>
      </defs>

      {/* ─────────────────────────────────────────────────────────────
          一花一径：5 根细长优雅的青绿花茎从瓶口 (125) 独立直通每朵花的花托底端
          严格一一对应，绝无悬空或断裂：
          1. 枝1 (左高-小花骨朵): 端点 (36, 32)
          2. 枝2 (左中-小朵初绽): 端点 (52, 60)
          3. 枝3 (中高-小花骨朵): 端点 (72, 38)
          4. 枝4 (右中低-小朵初绽): 端点 (88, 66)
          5. 枝5 (右高-小花骨朵): 端点 (114, 46)
      ───────────────────────────────────────────────────────────── */}
      <g id="carnationLongStems">
        {/* 枝1 花茎：直通左高花骨朵 (36, 32) */}
        <path
          d="M 72 125 C 64 96, 44 64, 36 32"
          stroke="url(#carnationStemRealGrad)"
          strokeWidth="2.3"
          fill="none"
          strokeLinecap="round"
        />

        {/* 枝2 花茎：直通左中小花朵 (52, 60) */}
        <path
          d="M 73 125 C 69 104, 58 84, 52 60"
          stroke="url(#carnationStemRealGrad)"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />

        {/* 枝3 花茎：直通中高花骨朵 (72, 38) */}
        <path
          d="M 74 125 C 74 100, 73 70, 72 38"
          stroke="url(#carnationStemRealGrad)"
          strokeWidth="2.3"
          fill="none"
          strokeLinecap="round"
        />

        {/* 枝4 花茎：直通右中小花朵 (88, 66) */}
        <path
          d="M 76 125 C 79 106, 85 86, 88 66"
          stroke="url(#carnationStemRealGrad)"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />

        {/* 枝5 花茎：直通右高花骨朵 (114, 46) */}
        <path
          d="M 78 125 C 86 100, 104 74, 114 46"
          stroke="url(#carnationStemRealGrad)"
          strokeWidth="2.3"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* ─────────────────────────────────────────────────────────────
          总计五朵：三支小小的花骨朵 + 两支小朵初绽花，高低有致、粉嫩娇巧
          花托基底坐标与花茎端点 100% 吻合对齐
      ───────────────────────────────────────────────────────────── */}
      <g id="carnationFlowers">
        {/* 枝1：【小花骨朵】左侧最高位，修长微倾 */}
        <g transform="translate(36, 32) rotate(-16)" style={fl1}>
          {renderTinyBud(0.95)}
        </g>

        {/* 枝2：【小朵初绽花】左中位，小巧水润 */}
        <g transform="translate(52, 60) rotate(-9)" style={fl2}>
          {renderSmallBloom(0.98)}
        </g>

        {/* 枝3：【小花骨朵】居中高位，挺拔含苞 */}
        <g transform="translate(72, 38) rotate(-2)" style={fl3}>
          {renderTinyBud(0.95)}
        </g>

        {/* 枝4：【小朵初绽花】右中偏低位，舒展呼应 */}
        <g transform="translate(88, 66) rotate(10)" style={fl4}>
          {renderSmallBloom(1.0)}
        </g>

        {/* 枝5：【小花骨朵】右侧高位，斜向探展 */}
        <g transform="translate(114, 46) rotate(18)" style={fl5}>
          {renderTinyBud(0.92)}
        </g>
      </g>
    </g>
  );
};
