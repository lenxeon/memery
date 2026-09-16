/**
 * @file TulipsFlower.tsx
 * @description 【写实混色郁金香】叶肥厚硬挺内卷、一花一茎配二至三叶、含苞待放、多色混搭（娇粉/奶白/玫红）、强立体高光感。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const TULIP_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.5, fallSpan: 0.06, startX: 106, startY: 36, landX: 112, landY: 194, rx: 7.2, ry: 4.8, landRot: 28, swayAmp: 12, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.35, fallSpan: 0.06, startX: 42, startY: 38, landX: 46, landY: 193, rx: 7.5, ry: 5.0, landRot: -30, swayAmp: 10, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.15, fallSpan: 0.06, startX: 75, startY: 22, landX: 80, landY: 195, rx: 7.6, ry: 5.2, landRot: 16, swayAmp: 14, swayFreq: 3.8 },
];

export const TulipsFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  // ── 茎叶色彩与光影衰变 ──
  const stemBase = lerpColor('#2f7225', '#5a4c33', dryFactor);
  const stemLight = lerpColor('#5cb843', '#887a58', dryFactor);

  const leafDeep = lerpColor('#184718', '#383324', dryFactor);
  const leafMid = lerpColor('#2d7324', '#534a32', dryFactor);
  const leafBright = lerpColor('#4eb532', '#7e7352', dryFactor);
  const leafHighlight = lerpColor('#8ae667', '#aba07d', dryFactor);
  const leafShadowInner = lerpColor('#0f3010', '#221f15', dryFactor);

  // ── 三款写实经典花苞色 ──
  // 1. 娇粉
  const pinkDark = lerpColor('#b8385e', '#663b36', dryFactor);
  const pinkMid = lerpColor('#e55c82', '#995955', dryFactor);
  const pinkLight = lerpColor('#f896b0', '#c28783', dryFactor);
  const pinkTop = lerpColor('#fbcfe8', '#dec3be', dryFactor);

  // 2. 奶白微鹅黄
  const whiteDark = lerpColor('#cbd5a2', '#7a7662', dryFactor);
  const whiteMid = lerpColor('#eef2c6', '#aba58c', dryFactor);
  const whiteLight = lerpColor('#fdfef2', '#dcd8c4', dryFactor);
  const whiteTop = lerpColor('#ffffff', '#ebe8d8', dryFactor);

  // 3. 浓郁玫红
  const roseDark = lerpColor('#9f1239', '#5c2222', dryFactor);
  const roseMid = lerpColor('#e11d48', '#8c3b40', dryFactor);
  const roseLight = lerpColor('#fb7185', '#b8636b', dryFactor);
  const roseTop = lerpColor('#fecdd3', '#d99fa6', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.5);
  const fl2 = getBlossomDropStyle(health, 0.35);
  const fl3 = getBlossomDropStyle(health, 0.15);

  const overallOpacity = isFaded ? 0.45 : Math.max(0.65, health);

  /**
   * 宽阔肥厚、具明显内卷肉质厚度与强光泽的郁金香单片大厚叶
   * 宽大肉厚（宽 18~24px），由瓶口沿花茎一路向上包裹，具明显向内合卷的深凹腹槽与肥厚背肉
   */
  const renderRigidCuppedLeaf = (
    x0: number,
    y0: number,
    cx1: number,
    cy1: number,
    tx: number,
    ty: number,
    maxW: number = 20,
    side: number = 1,
    curlRatio: number = 0.45
  ) => {
    const outerX = cx1 + side * maxW;
    const outerY = cy1;
    const innerRimX = cx1 + side * (maxW * (1 - curlRatio));
    const innerRimY = cy1 - 3;
    const ridgeX = cx1 + side * (maxW * 0.45);
    const ridgeY = cy1 - 1;

    return (
      <g>
        {/* 1. 外背饱满阔大肉厚叶身底面 */}
        <path
          d={`M ${x0} ${y0} C ${cx1 + side * (maxW * 0.35)} ${y0 - 12}, ${outerX} ${outerY + 16}, ${outerX} ${outerY} C ${outerX} ${outerY - 18}, ${tx + side * 5} ${ty + 12}, ${tx} ${ty} C ${tx - side * 3} ${ty + 10}, ${innerRimX} ${innerRimY - 8}, ${innerRimX} ${innerRimY} C ${innerRimX} ${innerRimY + 10}, ${x0 + side * 4} ${y0 - 8}, ${x0} ${y0} Z`}
          fill="url(#leafBodyGrad)"
          stroke={leafDeep}
          strokeWidth="0.6"
        />

        {/* 2. 肥厚叶侧缘肉质厚唇与亮光 */}
        <path
          d={`M ${outerX} ${outerY + 12} C ${outerX + side * 2} ${outerY}, ${tx + side * 2.5} ${ty + 8}, ${tx} ${ty}`}
          stroke={leafHighlight}
          strokeWidth="1.1"
          fill="none"
          opacity="0.9"
        />

        {/* 3. 内卷槽深凹阴影（生动体现厚叶内合卷曲的U型厚度腔体） */}
        <path
          d={`M ${x0} ${y0} Q ${innerRimX} ${innerRimY} ${tx} ${ty} Q ${cx1 + side * 1.5} ${cy1 + 6} ${x0} ${y0} Z`}
          fill={leafShadowInner}
          opacity="0.7"
        />

        {/* 4. 迎光面硬挺多汁的凸起主叶肉高光宽带 */}
        <path
          d={`M ${x0 + side * 3} ${y0 - 3} Q ${ridgeX} ${ridgeY} ${tx} ${ty}`}
          stroke="url(#leafSpineHighlightGrad)"
          strokeWidth="2.8"
          fill="none"
          strokeLinecap="round"
          opacity="0.95"
        />

        {/* 5. 纵向微凹平行辅助光纹 */}
        <path
          d={`M ${x0 + side * 6} ${y0 - 2} Q ${outerX - side * 3} ${outerY + 2} ${tx} ${ty}`}
          stroke="#dcfce7"
          strokeWidth="0.9"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* 6. 硬挺尖锐叶尖反光 */}
        <circle cx={tx} cy={ty} r="1.1" fill="#f0fdf4" />
      </g>
    );
  };

  /**
   * 更加肥厚硕大、圆润饱满的倒卵形郁金香含苞花杯 (Plump Tulip Bud Cup)
   * 放大体量，瓣片紧凑合抱微露瓣尖，强立体玉润高光
   */
  const renderTulipBud = (
    cx: number,
    cy: number,
    colorType: 'pink' | 'white' | 'rose',
    scale: number = 1.35,
    rot: number = 0
  ) => {
    const gradId =
      colorType === 'pink' ? 'url(#tulipPinkGrad)' : colorType === 'white' ? 'url(#tulipWhiteGrad)' : 'url(#tulipRoseGrad)';
    const topCol = colorType === 'pink' ? pinkTop : colorType === 'white' ? whiteTop : roseTop;
    const rimCol = colorType === 'pink' ? pinkLight : colorType === 'white' ? '#fef9c3' : roseLight;

    return (
      <g transform={`translate(${cx}, ${cy}) rotate(${rot}) scale(${scale})`}>
        {/* 基部肉厚花托小绿圈 */}
        <ellipse cx="0" cy="11.5" rx="4.5" ry="2.6" fill={leafMid} stroke={leafDeep} strokeWidth="0.6" />

        {/* 1. 后背合抱瓣（圆润大顶端） */}
        <path
          d="M -5 10 C -12 0, -13 -22, 0 -31 C 13 -22, 12 0, 5 10 Z"
          fill={gradId}
          opacity="0.9"
        />

        {/* 2. 左侧紧裹内合肥厚主瓣 */}
        <path
          d="M 0 11 C -13 8, -15 -10, -8 -29 C -2 -23, 1 -10, 0 11 Z"
          fill={gradId}
          stroke={rimCol}
          strokeWidth="0.4"
        />

        {/* 3. 右侧肥厚包裹大瓣（丰润圆隆，自外侧大面积向内包裹，呈典型肥润含苞初绽姿态） */}
        <path
          d="M 0 11.5 C 14 9, 16 -8, 6 -30 C -2 -24, -5 -8, 0 11.5 Z"
          fill={gradId}
          stroke={rimCol}
          strokeWidth="0.45"
        />

        {/* 4. 居中合抱正面大腹瓣（圆润丰满，极显花苞肥厚） */}
        <path
          d="M -5 11.5 C -11 6, -12 -10, -3 -29.5 C 3 -30, 9 -18, 5 11.5 Z"
          fill={gradId}
        />

        {/* 5. 强烈立体弧形高光（表现花苞玉石般光泽） */}
        <path
          d="M -1 8 C -6.5 0, -8 -13, -2 -25"
          stroke="#ffffff"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity={colorType === 'white' ? 0.95 : 0.72}
        />
        {/* 尖头聚拢点娇柔光晕 */}
        <ellipse cx="-0.5" cy="-28" rx="2.5" ry="1.3" fill={topCol} opacity="0.95" />
      </g>
    );
  };

  return (
    <g id="tulipsFlora" style={{ opacity: overallOpacity }}>
      <defs>
        {/* 肥厚叶肉立体渐变 */}
        <linearGradient id="leafBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={leafBright} />
          <stop offset="45%" stopColor={leafMid} />
          <stop offset="100%" stopColor={leafDeep} />
        </linearGradient>

        {/* 叶片挺拔硬脊反光渐变 */}
        <linearGradient id="leafSpineHighlightGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={leafMid} stopOpacity="0.25" />
          <stop offset="45%" stopColor={leafHighlight} stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
        </linearGradient>

        {/* 粗直多汁圆柱花茎截面光感渐变 */}
        <linearGradient id="tulipJuicyStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stemBase} />
          <stop offset="30%" stopColor={stemLight} />
          <stop offset="75%" stopColor={stemBase} />
          <stop offset="100%" stopColor="#142e10" />
        </linearGradient>

        {/* 1. 娇粉花瓣渐变 */}
        <linearGradient id="tulipPinkGrad" x1="30%" y1="100%" x2="70%" y2="0%">
          <stop offset="0%" stopColor={pinkDark} />
          <stop offset="45%" stopColor={pinkMid} />
          <stop offset="85%" stopColor={pinkLight} />
          <stop offset="100%" stopColor={pinkTop} />
        </linearGradient>

        {/* 2. 奶白微黄绿花瓣渐变 */}
        <linearGradient id="tulipWhiteGrad" x1="20%" y1="100%" x2="80%" y2="0%">
          <stop offset="0%" stopColor={whiteDark} />
          <stop offset="35%" stopColor={whiteMid} />
          <stop offset="80%" stopColor={whiteLight} />
          <stop offset="100%" stopColor={whiteTop} />
        </linearGradient>

        {/* 3. 浓郁玫红花瓣渐变 */}
        <linearGradient id="tulipRoseGrad" x1="30%" y1="100%" x2="70%" y2="0%">
          <stop offset="0%" stopColor={roseDark} />
          <stop offset="45%" stopColor={roseMid} />
          <stop offset="85%" stopColor={roseLight} />
          <stop offset="100%" stopColor={roseTop} />
        </linearGradient>
      </defs>

      {/* ─────────────────────────────────────────────────────────────
          第一支（居中·最高）：一花一径一叶 · 纯雅奶白大肥厚花苞
      ───────────────────────────────────────────────────────────── */}
      <g id="tulipUnit_CenterWhite">
        {/* 直挺粗硕花径 */}
        <path d="M 75 125 L 75 74 L 75 26" stroke="url(#tulipJuicyStemGrad)" strokeWidth="4.4" fill="none" strokeLinecap="round" />
        {/* 一花留一叶：左后侧大肥厚抱茎内卷叶（宽20px，自下而上挺拔直立） */}
        {renderRigidCuppedLeaf(74, 120, 60, 70, 52, 28, 20, -1, 0.48)}
        {/* 居中高位大花苞 (奶白，高挑错落，最顶峰) */}
        <g style={fl1}>{renderTulipBud(75, 16, 'white', 1.38, 0)}</g>
      </g>

      {/* ─────────────────────────────────────────────────────────────
          第二支（左侧·中位）：一花一径一叶 · 娇嫩浅粉大肥厚花苞
      ───────────────────────────────────────────────────────────── */}
      <g id="tulipUnit_LeftPink">
        {/* 向左微斜挺立花径 */}
        <path d="M 73 125 Q 66 84 42 38" stroke="url(#tulipJuicyStemGrad)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        {/* 一花留一叶：外展阔大肥厚内卷叶（宽22px，阔披针形，内卷深槽，强脊光） */}
        {renderRigidCuppedLeaf(72, 122, 44, 84, 22, 46, 22, -1, 0.52)}
        {/* 左侧中位大花苞 (娇粉，微向左倾斜8度) */}
        <g style={fl2}>{renderTulipBud(41, 26, 'pink', 1.42, -8)}</g>
      </g>

      {/* ─────────────────────────────────────────────────────────────
          第三支（右侧·前低位）：一花一径一叶 · 浓郁玫红大肥厚花苞
      ───────────────────────────────────────────────────────────── */}
      <g id="tulipUnit_RightRose">
        {/* 向右挺立花径 */}
        <path d="M 77 125 Q 85 86 108 42" stroke="url(#tulipJuicyStemGrad)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        {/* 一花留一叶：向右外展阔大肥厚内卷叶（宽23px，饱满厚重，叶尖硬朗直挺） */}
        {renderRigidCuppedLeaf(78, 122, 106, 84, 128, 48, 23, 1, 0.52)}
        {/* 右侧前低位大花苞 (玫红，向右微倾10度，形成左中右高低自然错落) */}
        <g style={fl3}>{renderTulipBud(109, 30, 'rose', 1.45, 10)}</g>
      </g>
    </g>
  );
};

