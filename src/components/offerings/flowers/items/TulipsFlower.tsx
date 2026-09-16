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
   * 肥厚硬挺、截面内卷如槽的直立叶片
   * 特征：由下而上抱茎，叶片质厚、中部深凹槽脊、向内合卷、叶尖锐利硬挺、强立体明暗反光
   * @param x0 叶基 X (贴合茎部)
   * @param y0 叶基 Y
   * @param cx 弧度弯折控制点 X
   * @param cy 弧度弯折控制点 Y
   * @param tx 叶尖终点 X
   * @param ty 叶尖终点 Y
   * @param w 叶片中部展开宽度
   * @param side 卷曲朝向：-1 向左，1 向右
   */
  const renderRigidCuppedLeaf = (
    x0: number,
    y0: number,
    cx: number,
    cy: number,
    tx: number,
    ty: number,
    w: number = 7.5,
    side: number = 1
  ) => {
    // 外边缘点
    const ox = cx + side * w;
    const oy = cy;
    // 内卷槽阴影区
    return (
      <g>
        {/* 1. 外背厚实叶肉底面 */}
        <path
          d={`M ${x0} ${y0} Q ${ox} ${oy} ${tx} ${ty} Q ${cx + side * (w * 0.25)} ${cy - 2} ${x0} ${y0} Z`}
          fill="url(#leafBodyGrad)"
          stroke={leafDeep}
          strokeWidth="0.4"
        />
        {/* 2. 内凹槽背光阴影（体现厚叶内卷的厚度） */}
        <path
          d={`M ${x0} ${y0} Q ${cx + side * (w * 0.3)} ${cy + 2} ${tx} ${ty} Q ${cx - side * 1.5} ${cy + 4} ${x0} ${y0} Z`}
          fill={leafShadowInner}
          opacity="0.55"
        />
        {/* 3. 迎光面硬挺凸起的主脉脊线高光 */}
        <path
          d={`M ${x0} ${y0} Q ${cx + side * (w * 0.6)} ${cy - 1} ${tx} ${ty}`}
          stroke="url(#leafSpineHighlightGrad)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        {/* 4. 叶尖尖锐高光点 */}
        <circle cx={tx} cy={ty} r="0.8" fill={leafHighlight} />
      </g>
    );
  };

  /**
   * 紧凑含苞待放的倒卵形郁金香花苞 (Bud/Tulip Cup)
   * 特征：花苞紧密合抱微露尖，绝非大开平铺，立体圆润如玉卵，光感明显
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
        <ellipse cx="0" cy="9" rx="3.2" ry="2.0" fill={leafMid} stroke={leafDeep} strokeWidth="0.4" />

        {/* 1. 后背合抱瓣（露出一角尖峰） */}
        <path
          d="M -3 7 C -7 0, -8 -16, 0 -24 C 8 -16, 7 0, 3 7 Z"
          fill={gradId}
          opacity="0.85"
        />

        {/* 2. 左侧紧裹内合厚瓣 */}
        <path
          d="M 0 8 C -8 5, -10 -8, -5 -22 C -1 -17, 1 -8, 0 8 Z"
          fill={gradId}
          stroke={rimCol}
          strokeWidth="0.3"
        />

        {/* 3. 右侧包覆主瓣（饱满卵圆形，从外围紧紧包裹住左瓣，呈含苞初绽之态） */}
        <path
          d="M 0 8.5 C 9 6, 11 -6, 4 -23 C -2 -18, -4 -6, 0 8.5 Z"
          fill={gradId}
          stroke={rimCol}
          strokeWidth="0.35"
        />

        {/* 4. 居中合抱前瓣（正面丰满圆润，质感如蜡如玉） */}
        <path
          d="M -3 8.5 C -7 4, -8 -8, -2 -22.5 C 2 -23, 6 -14, 3 8.5 Z"
          fill={gradId}
        />

        {/* 5. 迎光立体高光弧（右上方光源照在卵形花苞侧面） */}
        <path
          d="M -1 5 C -4.5 0, -5.5 -10, -2 -19"
          stroke="#ffffff"
          strokeWidth="1.1"
          fill="none"
          strokeLinecap="round"
          opacity={colorType === 'white' ? 0.85 : 0.6}
        />
        {/* 瓣尖聚拢点透出的娇嫩浅晕 */}
        <ellipse cx="-0.5" cy="-21" rx="1.8" ry="1.0" fill={topCol} opacity="0.9" />
      </g>
    );
  };

  return (
    <g id="tulipsFlora" style={{ opacity: overallOpacity }}>
      <defs>
        {/* 叶片主肉身立体渐变 */}
        <linearGradient id="leafBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={leafBright} />
          <stop offset="50%" stopColor={leafMid} />
          <stop offset="100%" stopColor={leafDeep} />
        </linearGradient>

        {/* 叶片脊线挺拔反光渐变 */}
        <linearGradient id="leafSpineHighlightGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={leafMid} stopOpacity="0.4" />
          <stop offset="50%" stopColor={leafHighlight} stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
        </linearGradient>

        {/* 粗直多汁圆柱花茎截面光感渐变 */}
        <linearGradient id="tulipJuicyStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stemBase} />
          <stop offset="35%" stopColor={stemLight} />
          <stop offset="80%" stopColor={stemBase} />
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
          第一组（后排中央 · 奶白含苞郁金香）：一茎配二内卷长叶
      ───────────────────────────────────────────────────────────── */}
      <g id="tulipUnit_WhiteCenter">
        {/* 肉质圆柱花径 (笔直修长 直达瓶口) */}
        <path d="M 75 125 L 75 80 L 76 38" stroke="url(#tulipJuicyStemGrad)" strokeWidth="3.4" fill="none" strokeLinecap="round" />
        {/* 后生直挺内卷叶 (左翼直上，紧贴茎部，叶内卷尖锐) */}
        {renderRigidCuppedLeaf(74, 118, 64, 80, 56, 42, 6.2, -1)}
        {/* 右翼抱茎叶 (右侧直上内卷) */}
        {renderRigidCuppedLeaf(76, 115, 84, 76, 88, 36, 6.0, 1)}
        {/* 奶白透青小花苞 (居于中后方稍高处) */}
        <g style={fl1}>{renderTulipBud(76, 30, 'white', 0.96, 2)}</g>
      </g>

      {/* ─────────────────────────────────────────────────────────────
          第二组（左前排 · 经典娇粉含苞郁金香）：一茎配三内卷厚叶
      ───────────────────────────────────────────────────────────── */}
      <g id="tulipUnit_PinkLeft">
        {/* 花径：向左上微微挺立伸展 */}
        <path d="M 73 125 Q 68 85 45 42" stroke="url(#tulipJuicyStemGrad)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* 基生大厚叶 1（向左外延直挺展起，内卷明显） */}
        {renderRigidCuppedLeaf(72, 122, 50, 92, 34, 58, 8.2, -1)}
        {/* 抱茎紧实叶 2（沿茎内侧直挺包裹） */}
        {renderRigidCuppedLeaf(68, 105, 56, 75, 48, 48, 6.5, 1)}
        {/* 茎上微短尖叶 3（护持花蕾下端） */}
        {renderRigidCuppedLeaf(54, 72, 42, 56, 38, 40, 5.0, -1)}
        {/* 娇粉含苞圆润花蕾 */}
        <g style={fl2}>{renderTulipBud(44, 32, 'pink', 1.04, -8)}</g>
      </g>

      {/* ─────────────────────────────────────────────────────────────
          第三组（右前排 · 鲜活玫红含苞郁金香）：一茎配三内卷厚叶
      ───────────────────────────────────────────────────────────── */}
      <g id="tulipUnit_RoseRight">
        {/* 花径：向右上拔立微挺 */}
        <path d="M 77 125 Q 82 85 105 45" stroke="url(#tulipJuicyStemGrad)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* 基生大厚叶 1（向右侧直立挺拔，深凹槽背光强反光） */}
        {renderRigidCuppedLeaf(78, 122, 98, 90, 115, 60, 8.5, 1)}
        {/* 抱茎中叶 2（从内侧贴合直立） */}
        {renderRigidCuppedLeaf(80, 106, 92, 76, 100, 50, 6.5, -1)}
        {/* 茎上紧贴护蕾叶 3 */}
        {renderRigidCuppedLeaf(94, 75, 108, 60, 114, 42, 5.2, 1)}
        {/* 浓郁玫红含苞圆润花蕾 */}
        <g style={fl3}>{renderTulipBud(106, 35, 'rose', 1.05, 10)}</g>
      </g>

      {/* ─────────────────────────────────────────────────────────────
          第四组（正前方衬托微探 · 香槟浅白微绽郁金香）：多色交织错落
      ───────────────────────────────────────────────────────────── */}
      <g id="tulipUnit_ForegroundCenter">
        {/* 短中花径 */}
        <path d="M 75 125 L 75 92 L 74 62" stroke="url(#tulipJuicyStemGrad)" strokeWidth="3.3" fill="none" strokeLinecap="round" />
        {/* 居中挺拔直立双侧护茎叶 */}
        {renderRigidCuppedLeaf(73, 120, 66, 95, 63, 68, 5.8, -1)}
        {renderRigidCuppedLeaf(76, 120, 82, 95, 85, 66, 5.8, 1)}
        {/* 奶白香槟微含花苞（位于前排适中高度，错落有致） */}
        <g style={fl4}>{renderTulipBud(74, 52, 'white', 0.94, -3)}</g>
      </g>
    </g>
  );
};

