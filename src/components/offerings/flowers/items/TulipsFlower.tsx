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
   * 肥厚硬挺、内卷如槽的郁金香抱茎叶片
   * 缩小一半、不向外过度展开（maxW约8~11px），起始于中上段紧贴花茎上延护蕾
   */
  const renderRigidCuppedLeaf = (
    x0: number,
    y0: number,
    cx1: number,
    cy1: number,
    tx: number,
    ty: number,
    maxW: number = 9.5,
    side: number = 1,
    curlRatio: number = 0.45
  ) => {
    const outerX = cx1 + side * maxW;
    const outerY = cy1;
    const innerRimX = cx1 + side * (maxW * (1 - curlRatio));
    const innerRimY = cy1 - 2;
    const ridgeX = cx1 + side * (maxW * 0.45);
    const ridgeY = cy1 - 1;

    return (
      <g>
        {/* 1. 外背肥厚叶肉底面 */}
        <path
          d={`M ${x0} ${y0} C ${cx1 + side * (maxW * 0.35)} ${y0 - 6}, ${outerX} ${outerY + 8}, ${outerX} ${outerY} C ${outerX} ${outerY - 10}, ${tx + side * 3} ${ty + 6}, ${tx} ${ty} C ${tx - side * 1.5} ${ty + 5}, ${innerRimX} ${innerRimY - 4}, ${innerRimX} ${innerRimY} C ${innerRimX} ${innerRimY + 6}, ${x0 + side * 2} ${y0 - 4}, ${x0} ${y0} Z`}
          fill="url(#leafBodyGrad)"
          stroke={leafDeep}
          strokeWidth="0.5"
        />

        {/* 2. 肥厚叶侧缘肉质亮线 */}
        <path
          d={`M ${outerX} ${outerY + 6} C ${outerX + side * 1.2} ${outerY}, ${tx + side * 1.5} ${ty + 4}, ${tx} ${ty}`}
          stroke={leafHighlight}
          strokeWidth="0.8"
          fill="none"
          opacity="0.9"
        />

        {/* 3. 内卷槽深凹阴影 */}
        <path
          d={`M ${x0} ${y0} Q ${innerRimX} ${innerRimY} ${tx} ${ty} Q ${cx1 + side * 1.0} ${cy1 + 3} ${x0} ${y0} Z`}
          fill={leafShadowInner}
          opacity="0.65"
        />

        {/* 4. 迎光面硬挺多汁的凸起主叶肉高光宽带 */}
        <path
          d={`M ${x0 + side * 1.5} ${y0 - 2} Q ${ridgeX} ${ridgeY} ${tx} ${ty}`}
          stroke="url(#leafSpineHighlightGrad)"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          opacity="0.95"
        />

        {/* 5. 纵向微凹平行辅助光纹 */}
        <path
          d={`M ${x0 + side * 3} ${y0 - 1} Q ${outerX - side * 1.5} ${outerY + 1} ${tx} ${ty}`}
          stroke="#dcfce7"
          strokeWidth="0.6"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* 6. 硬挺尖锐叶尖反光 */}
        <circle cx={tx} cy={ty} r="0.8" fill="#f0fdf4" />
      </g>
    );
  };

  /**
   * 倒卵形郁金香含苞花杯 (Tulip Bud Cup)
   */
  const renderTulipBud = (
    cx: number,
    cy: number,
    colorType: 'pink' | 'white' | 'rose',
    scale: number = 1.05,
    rot: number = 0
  ) => {
    const gradId =
      colorType === 'pink' ? 'url(#tulipPinkGrad)' : colorType === 'white' ? 'url(#tulipWhiteGrad)' : 'url(#tulipRoseGrad)';
    const topCol = colorType === 'pink' ? pinkTop : colorType === 'white' ? whiteTop : roseTop;
    const rimCol = colorType === 'pink' ? pinkLight : colorType === 'white' ? '#fef9c3' : roseLight;

    return (
      <g transform={`translate(${cx}, ${cy}) rotate(${rot}) scale(${scale})`}>
        {/* 基部肉厚花托小绿圈 */}
        <ellipse cx="0" cy="11" rx="4.0" ry="2.3" fill={leafMid} stroke={leafDeep} strokeWidth="0.5" />

        {/* 1. 后背合抱瓣 */}
        <path
          d="M -4.5 9 C -11 0, -12 -20, 0 -29 C 12 -20, 11 0, 4.5 9 Z"
          fill={gradId}
          opacity="0.9"
        />

        {/* 2. 左侧紧裹内合肥厚主瓣 */}
        <path
          d="M 0 10 C -12 7, -14 -9, -7 -27 C -2 -21, 1 -9, 0 10 Z"
          fill={gradId}
          stroke={rimCol}
          strokeWidth="0.35"
        />

        {/* 3. 右侧肥厚包裹大瓣 */}
        <path
          d="M 0 10.5 C 13 8, 15 -7, 5 -28 C -2 -22, -4 -7, 0 10.5 Z"
          fill={gradId}
          stroke={rimCol}
          strokeWidth="0.4"
        />

        {/* 4. 居中合抱正面大腹瓣 */}
        <path
          d="M -4.5 10.5 C -10 5.5, -11 -9, -2.5 -27.5 C 2.5 -28, 8 -16, 4.5 10.5 Z"
          fill={gradId}
        />

        {/* 5. 强烈立体弧形高光 */}
        <path
          d="M -1 7 C -6 0, -7.5 -12, -2 -23"
          stroke="#ffffff"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
          opacity={colorType === 'white' ? 0.95 : 0.7}
        />
        {/* 尖头聚拢点光晕 */}
        <ellipse cx="-0.5" cy="-26" rx="2.2" ry="1.2" fill={topCol} opacity="0.95" />
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
          第一支（居中·高位·最大）：纯雅奶白含苞花苞（scale=1.16，y=14）
          高挺耸立，叶片紧贴中上段花径上延，叶尖贴近花苞基部
      ───────────────────────────────────────────────────────────── */}
      <g id="tulipUnit_CenterWhite">
        {/* 直挺修长花径 */}
        <path d="M 75 125 L 75 68 L 75 22" stroke="url(#tulipJuicyStemGrad)" strokeWidth="4.0" fill="none" strokeLinecap="round" />
        {/* 一花一叶：靠近花苞位置（从 y=82 起包裹至 y=32），不大幅外翻（宽9.5px） */}
        {renderRigidCuppedLeaf(74, 82, 68, 56, 68, 30, 9.5, -1, 0.46)}
        {/* 居中高位大花苞 (纯雅奶白，体量最大，姿态端正高拔) */}
        <g style={fl1}>{renderTulipBud(75, 14, 'white', 1.16, 0)}</g>
      </g>

      {/* ─────────────────────────────────────────────────────────────
          第二支（左侧·中位·中等大小）：娇粉含苞花苞（scale=1.05，y=30）
          向左适度斜展，叶片从花茎中段向上包贴，护在花苞左侧下方
      ───────────────────────────────────────────────────────────── */}
      <g id="tulipUnit_LeftPink">
        {/* 向左微倾挺立花径 */}
        <path d="M 73 125 Q 67 85 48 40" stroke="url(#tulipJuicyStemGrad)" strokeWidth="3.8" fill="none" strokeLinecap="round" />
        {/* 一花一叶：靠近花苞中上部（从 y=86 起至 y=44），不过度外张（宽10px） */}
        {renderRigidCuppedLeaf(68, 86, 52, 64, 40, 42, 10, -1, 0.48)}
        {/* 左侧中位花苞 (娇粉，中等体量，微向左倾斜-7度) */}
        <g style={fl2}>{renderTulipBud(47, 30, 'pink', 1.05, -7)}</g>
      </g>

      {/* ─────────────────────────────────────────────────────────────
          第三支（右侧·低位·紧致小巧）：浓郁玫红含苞花苞（scale=0.92，y=45）
          位于右前侧低位，娇小紧凑，叶片紧贴护持，高低错落分明
      ───────────────────────────────────────────────────────────── */}
      <g id="tulipUnit_RightRose">
        {/* 向右挺立短花径 */}
        <path d="M 77 125 Q 85 92 102 55" stroke="url(#tulipJuicyStemGrad)" strokeWidth="3.6" fill="none" strokeLinecap="round" />
        {/* 一花一叶：靠近低位花苞（从 y=92 起至 y=58），紧贴茎干（宽9px） */}
        {renderRigidCuppedLeaf(82, 92, 94, 74, 108, 56, 9.0, 1, 0.48)}
        {/* 右侧前低位小巧花苞 (玫红，紧致小巧，微向右倾斜9度) */}
        <g style={fl3}>{renderTulipBud(103, 44, 'rose', 0.92, 9)}</g>
      </g>
    </g>
  );
};

