/**
 * @file TulipsFlower.tsx
 * @description 【写实混色郁金香】叶肥厚硬挺内卷、一花一茎配二至三叶、含苞待放、多色混搭（娇粉/奶白/玫红）、强立体高光感。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const TULIP_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.5, fallSpan: 0.06, startX: 106, startY: 40, landX: 114, landY: 194, rx: 5.5, ry: 3.6, landRot: 28, swayAmp: 12, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.4, fallSpan: 0.06, startX: 42, startY: 34, landX: 46, landY: 193, rx: 5.8, ry: 3.8, landRot: -30, swayAmp: 10, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.3, fallSpan: 0.06, startX: 88, startY: 48, landX: 94, landY: 195, rx: 5.6, ry: 3.7, landRot: -18, swayAmp: 14, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.2, fallSpan: 0.06, startX: 62, startY: 42, landX: 68, landY: 197, rx: 6.0, ry: 4.0, landRot: 32, swayAmp: 15, swayFreq: 4.0 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.05, startX: 74, startY: 52, landX: 78, landY: 196, rx: 5.9, ry: 3.9, landRot: 14, swayAmp: 12, swayFreq: 4.2 },
];

export const TulipsFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  // ── 茎叶色彩与光影衰变 ──
  const stemBase = lerpColor('#327528', '#635338', dryFactor);
  const stemLight = lerpColor('#5cb843', '#8f805e', dryFactor);

  const leafDeep = lerpColor('#1d521d', '#3d3828', dryFactor);
  const leafMid = lerpColor('#2f7a26', '#595036', dryFactor);
  const leafBright = lerpColor('#52b336', '#877c59', dryFactor);
  const leafHighlight = lerpColor('#8ae667', '#aba07d', dryFactor);
  const leafShadowInner = lerpColor('#133b14', '#262217', dryFactor);

  // ── 三款经典写实花色定义（枯萎衰变渐变） ──
  // 1. 经典娇嫩浅粉 (Soft Rose Pink)
  const pinkDark = lerpColor('#b8385e', '#663b36', dryFactor);
  const pinkMid = lerpColor('#e55c82', '#995955', dryFactor);
  const pinkLight = lerpColor('#f896b0', '#c28783', dryFactor);
  const pinkTop = lerpColor('#fbcfe8', '#dec3be', dryFactor);

  // 2. 纯雅奶白微带鹅黄绿晕 (Cream Milk White with soft chartreuse base)
  const whiteDark = lerpColor('#cbd5a2', '#7a7662', dryFactor);
  const whiteMid = lerpColor('#eef2c6', '#aba58c', dryFactor);
  const whiteLight = lerpColor('#fdfef2', '#dcd8c4', dryFactor);
  const whiteTop = lerpColor('#ffffff', '#ebe8d8', dryFactor);

  // 3. 浓郁玫红深粉 (Deep Coral Magenta)
  const roseDark = lerpColor('#9f1239', '#5c2222', dryFactor);
  const roseMid = lerpColor('#e11d48', '#8c3b40', dryFactor);
  const roseLight = lerpColor('#fb7185', '#b8636b', dryFactor);
  const roseTop = lerpColor('#fecdd3', '#d99fa6', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.5);
  const fl2 = getBlossomDropStyle(health, 0.4);
  const fl3 = getBlossomDropStyle(health, 0.3);
  const fl4 = getBlossomDropStyle(health, 0.2);

  const overallOpacity = isFaded ? 0.45 : Math.max(0.65, health);

  /**
   * 宽阔肥厚、具明显内卷肉质厚度与强光泽的郁金香大叶片
   * 彻底告别针细感，展现真实郁金香厚实阔长披针叶：
   * - 宽展（w 达 12~18px），呈长卵披针弧度
   * - 明确的双层肉质断面（内凹腹面 + 饱满背部肉质厚唇）
   * - 纵向硬挺脊线与蜡质高光带
   * @param x0 叶基部 X (抱茎起始)
   * @param y0 叶基部 Y
   * @param cx1 腹部隆起控制点 X
   * @param cy1 腹部隆起控制点 Y
   * @param tx 叶尖 X
   * @param ty 叶尖 Y
   * @param maxW 最大展开肥厚半宽 (11 ~ 18px)
   * @param side 展开方向: -1 向左, 1 向右
   * @param curlRatio 内卷弧度深度 (0.3 ~ 0.6)
   */
  const renderRigidCuppedLeaf = (
    x0: number,
    y0: number,
    cx1: number,
    cy1: number,
    tx: number,
    ty: number,
    maxW: number = 14,
    side: number = 1,
    curlRatio: number = 0.45
  ) => {
    // 宽大外轮廓顶点
    const outerX = cx1 + side * maxW;
    const outerY = cy1;

    // 内卷深槽的内沿脊线
    const innerRimX = cx1 + side * (maxW * (1 - curlRatio));
    const innerRimY = cy1 - 2;

    // 脊线最高反光点
    const ridgeX = cx1 + side * (maxW * 0.45);
    const ridgeY = cy1;

    return (
      <g>
        {/* 1. 外背肥厚大叶肉底面（饱满宽阔长披针身） */}
        <path
          d={`M ${x0} ${y0} C ${cx1 + side * (maxW * 0.4)} ${y0 - 8}, ${outerX} ${outerY + 12}, ${outerX} ${outerY} C ${outerX} ${outerY - 14}, ${tx + side * 4} ${ty + 10}, ${tx} ${ty} C ${tx - side * 2} ${ty + 8}, ${innerRimX} ${innerRimY - 6}, ${innerRimX} ${innerRimY} C ${innerRimX} ${innerRimY + 8}, ${x0 + side * 3} ${y0 - 6}, ${x0} ${y0} Z`}
          fill="url(#leafBodyGrad)"
          stroke={leafDeep}
          strokeWidth="0.5"
        />

        {/* 2. 肥厚肉质厚唇侧缘（体现厚度切面） */}
        <path
          d={`M ${outerX} ${outerY + 10} C ${outerX + side * 1.5} ${outerY}, ${tx + side * 2} ${ty + 6}, ${tx} ${ty}`}
          stroke={leafHighlight}
          strokeWidth="0.9"
          fill="none"
          opacity="0.85"
        />

        {/* 3. 内卷槽背光深邃腹凹（体现郁金香叶特有的U型深凹内卷立体感） */}
        <path
          d={`M ${x0} ${y0} Q ${innerRimX} ${innerRimY} ${tx} ${ty} Q ${cx1} ${cy1 + 4} ${x0} ${y0} Z`}
          fill={leafShadowInner}
          opacity="0.65"
        />

        {/* 4. 迎光面硬挺多汁的凸起主叶肉高光面 */}
        <path
          d={`M ${x0 + side * 2} ${y0 - 2} Q ${ridgeX} ${ridgeY} ${tx} ${ty}`}
          stroke="url(#leafSpineHighlightGrad)"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* 5. 平行微凹槽副光纹（郁金香肥厚叶片纵向微凹带） */}
        <path
          d={`M ${x0 + side * 4} ${y0 - 1} Q ${outerX - side * 2} ${outerY + 2} ${tx} ${ty}`}
          stroke="#bbf7d0"
          strokeWidth="0.75"
          fill="none"
          strokeLinecap="round"
          opacity="0.45"
        />

        {/* 6. 硬挺叶尖聚光点 */}
        <circle cx={tx} cy={ty} r="0.9" fill="#f0fdf4" />
      </g>
    );
  };

  /**
   * 紧凑含苞待放的倒卵形郁金香花苞 (Bud/Tulip Cup)
   */
  const renderTulipBud = (
    cx: number,
    cy: number,
    colorType: 'pink' | 'white' | 'rose',
    scale: number = 1.0,
    rot: number = 0
  ) => {
    const gradId =
      colorType === 'pink' ? 'url(#tulipPinkGrad)' : colorType === 'white' ? 'url(#tulipWhiteGrad)' : 'url(#tulipRoseGrad)';
    const topCol = colorType === 'pink' ? pinkTop : colorType === 'white' ? whiteTop : roseTop;
    const rimCol = colorType === 'pink' ? pinkLight : colorType === 'white' ? '#fef9c3' : roseLight;

    return (
      <g transform={`translate(${cx}, ${cy}) rotate(${rot}) scale(${scale})`}>
        {/* 基部花托肉质小绿托圈 */}
        <ellipse cx="0" cy="10" rx="3.6" ry="2.2" fill={leafMid} stroke={leafDeep} strokeWidth="0.5" />

        {/* 1. 后背合抱瓣（露出一角尖峰） */}
        <path
          d="M -4 8 C -9 0, -10 -18, 0 -26 C 10 -18, 9 0, 4 8 Z"
          fill={gradId}
          opacity="0.88"
        />

        {/* 2. 左侧紧裹内合厚瓣 */}
        <path
          d="M 0 9 C -10 6, -12 -9, -6 -24 C -1 -19, 1 -9, 0 9 Z"
          fill={gradId}
          stroke={rimCol}
          strokeWidth="0.35"
        />

        {/* 3. 右侧包覆主瓣（饱满卵圆形，从外围紧紧包裹住左瓣，呈含苞初绽之态） */}
        <path
          d="M 0 9.5 C 11 7, 13 -7, 5 -25 C -2 -20, -4 -7, 0 9.5 Z"
          fill={gradId}
          stroke={rimCol}
          strokeWidth="0.4"
        />

        {/* 4. 居中合抱前瓣（正面丰满圆润，质感如蜡如玉） */}
        <path
          d="M -4 9.5 C -8.5 5, -9 -9, -2 -24.5 C 2 -25, 7 -15, 4 9.5 Z"
          fill={gradId}
        />

        {/* 5. 迎光立体高光弧（右上方光源照在卵形花苞侧面） */}
        <path
          d="M -1 6 C -5.5 0, -6.5 -11, -2 -21"
          stroke="#ffffff"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          opacity={colorType === 'white' ? 0.9 : 0.65}
        />
        {/* 瓣尖聚拢点透出的娇嫩浅晕 */}
        <ellipse cx="-0.5" cy="-23" rx="2.0" ry="1.1" fill={topCol} opacity="0.9" />
      </g>
    );
  };

  return (
    <g id="tulipsFlora" style={{ opacity: overallOpacity }}>
      <defs>
        {/* 叶片主肉身立体渐变：从鲜润多汁的亮绿过渡至饱满沉着深绿 */}
        <linearGradient id="leafBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={leafBright} />
          <stop offset="45%" stopColor={leafMid} />
          <stop offset="100%" stopColor={leafDeep} />
        </linearGradient>

        {/* 叶片脊线挺拔反光渐变 */}
        <linearGradient id="leafSpineHighlightGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={leafMid} stopOpacity="0.3" />
          <stop offset="45%" stopColor={leafHighlight} stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.85" />
        </linearGradient>

        {/* 粗直多汁圆柱花茎截面光感渐变 */}
        <linearGradient id="tulipJuicyStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stemBase} />
          <stop offset="30%" stopColor={stemLight} />
          <stop offset="75%" stopColor={stemBase} />
          <stop offset="100%" stopColor="#193814" />
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
          第一组（后排居中 · 奶白含苞郁金香）：一茎配二宽展肥厚大叶
      ───────────────────────────────────────────────────────────── */}
      <g id="tulipUnit_WhiteCenter">
        {/* 肉质圆柱花径 (笔直修长 直达瓶口) */}
        <path d="M 75 125 L 75 78 L 76 34" stroke="url(#tulipJuicyStemGrad)" strokeWidth="3.8" fill="none" strokeLinecap="round" />
        {/* 左翼肥厚内卷大叶：宽 14px，高挺包裹茎干，叶尖硬朗 */}
        {renderRigidCuppedLeaf(74, 118, 62, 76, 52, 38, 14, -1, 0.48)}
        {/* 右翼肥厚内卷大叶：宽 13.5px，向右上昂立，内凹深槽清晰 */}
        {renderRigidCuppedLeaf(76, 114, 88, 72, 92, 32, 13.5, 1, 0.45)}
        {/* 奶白透青小花苞 (后排高雅直挺) */}
        <g style={fl1}>{renderTulipBud(76, 26, 'white', 1.02, 1)}</g>
      </g>

      {/* ─────────────────────────────────────────────────────────────
          第二组（左前排 · 娇粉含苞郁金香）：一茎配三肥厚硬挺内卷叶
      ───────────────────────────────────────────────────────────── */}
      <g id="tulipUnit_PinkLeft">
        {/* 花径：向左上微微倾展 */}
        <path d="M 73 125 Q 67 86 44 40" stroke="url(#tulipJuicyStemGrad)" strokeWidth="3.9" fill="none" strokeLinecap="round" />
        {/* 基部外展肥厚大叶 1：宽 17px，阔披针形，叶肉质感极重 */}
        {renderRigidCuppedLeaf(72, 122, 46, 88, 26, 52, 17, -1, 0.52)}
        {/* 贴茎中段肥厚抱叶 2：宽 13.5px，紧贴花茎上延 */}
        {renderRigidCuppedLeaf(67, 106, 54, 72, 44, 42, 13.5, 1, 0.42)}
        {/* 蕾下硬挺护花小厚叶 3：宽 10px，直挺尖锐 */}
        {renderRigidCuppedLeaf(52, 70, 38, 52, 32, 35, 10, -1, 0.45)}
        {/* 娇粉含苞圆润花苞 */}
        <g style={fl2}>{renderTulipBud(43, 28, 'pink', 1.08, -8)}</g>
      </g>

      {/* ─────────────────────────────────────────────────────────────
          第三组（右前排 · 玫红含苞郁金香）：一茎配三肥厚硬挺内卷叶
      ───────────────────────────────────────────────────────────── */}
      <g id="tulipUnit_RoseRight">
        {/* 花径：向右上挺立 */}
        <path d="M 77 125 Q 83 86 106 42" stroke="url(#tulipJuicyStemGrad)" strokeWidth="3.9" fill="none" strokeLinecap="round" />
        {/* 基部外展肥厚大叶 1：宽 17.5px，阔展厚重，强反光脊线 */}
        {renderRigidCuppedLeaf(78, 122, 102, 86, 122, 54, 17.5, 1, 0.52)}
        {/* 抱茎中段肥厚叶 2：宽 13.5px，内侧贴紧花茎 */}
        {renderRigidCuppedLeaf(81, 106, 92, 72, 102, 44, 13.5, -1, 0.42)}
        {/* 蕾下近花厚护叶 3：宽 10px，向上斜刺挺出 */}
        {renderRigidCuppedLeaf(96, 72, 110, 55, 118, 38, 10, 1, 0.45)}
        {/* 浓郁玫红含苞圆润花苞 */}
        <g style={fl3}>{renderTulipBud(107, 30, 'rose', 1.1, 10)}</g>
      </g>

      {/* ─────────────────────────────────────────────────────────────
          第四组（正前中景 · 纯雅白/香槟微含郁金香）：双侧肥厚抱茎宽叶
      ───────────────────────────────────────────────────────────── */}
      <g id="tulipUnit_ForegroundCenter">
        {/* 居中前排花径 */}
        <path d="M 75 125 L 75 88 L 74 58" stroke="url(#tulipJuicyStemGrad)" strokeWidth="3.6" fill="none" strokeLinecap="round" />
        {/* 前排左侧肥厚宽叶：宽 13px */}
        {renderRigidCuppedLeaf(73, 120, 64, 90, 60, 62, 13, -1, 0.48)}
        {/* 前排右侧肥厚宽叶：宽 13px */}
        {renderRigidCuppedLeaf(76, 120, 84, 90, 88, 60, 13, 1, 0.48)}
        {/* 奶白香槟微含花苞（位于前排适度高度，与两侧娇粉、玫红形成丰富层次） */}
        <g style={fl4}>{renderTulipBud(74, 48, 'white', 0.98, -2)}</g>
      </g>
    </g>
  );
};

