/**
 * @file NarcissusFlower.tsx
 * @description 【凌波水仙 / 寒梅雪客雅供】
 * 严格遵照东方文人折枝写实参考图重塑：
 * 1. 水仙无叶：剔除一切杂叶，展现寒冬折枝古拙清奇的风骨；
 * 2. 花径硬挺且色深、多曲折有度、自然分叉：
 *    - 深褐古青木质硬径，遒劲曲折，自带枝桠木节与分叉生长逻辑；
 * 3. 一径多花、主支盛开、侧支多骨朵：
 *    - 主支高挑挺立，中上部数朵盛开大花灿然绽放；
 *    - 侧支曲折掩映，伴生半开小花与饱满青白珍珠花骨朵；
 *    - 右下侧枝呈大弧形优美悬垂，顶梢挂一粒下垂小蕾；
 * 4. 开放程度不同、六瓣形态各异：
 *    - 每朵花均具 6 枚雪白质感玉瓣，根据视角展现正面、3/4 俯仰、侧向杯状等不同透视；
 * 5. 花蕊由花丝+花粉组成：
 *    - 核心嫩绿花盘辐射多枚纤细花丝，顶端带有立体明艳的金黄花粉粒（花药）；
 * 6. 可随风摇曳：
 *    - 枝丫带自然微风摇曳律动，层次分明，空灵超逸。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle, getFlowerAgingFilter } from '../utils/lifecycle';

export const NARCISSUS_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.50, fallSpan: 0.06, startX: 96, startY: 22, landX: 104, landY: 194, rx: 4.6, ry: 3.2, landRot: 26, swayAmp: 14, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.40, fallSpan: 0.05, startX: 86, startY: 44, landX: 80, landY: 193, rx: 4.8, ry: 3.4, landRot: -28, swayAmp: 12, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.28, fallSpan: 0.06, startX: 44, startY: 70, landX: 52, landY: 195, rx: 5.0, ry: 3.5, landRot: -18, swayAmp: 16, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.18, fallSpan: 0.05, startX: 98, startY: 82, landX: 106, landY: 197, rx: 5.2, ry: 3.6, landRot: 32, swayAmp: 18, swayFreq: 4.0 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.04, startX: 34, startY: 56, landX: 42, landY: 196, rx: 4.8, ry: 3.3, landRot: 14, swayAmp: 14, swayFreq: 4.2 },
];

export const NarcissusFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  const agingStyle = getFlowerAgingFilter(health, isFaded);

  // ── 花瓣羊脂瓷白至衰老浅茶色 ──
  const petalWhite = lerpColor('#ffffff', '#f4ede2', dryFactor);
  const petalBody = lerpColor('#fafaf9', '#e5dacf', dryFactor);
  const petalSoftShade = lerpColor('#e7e5e4', '#cbbcb0', dryFactor);
  const petalDepthShade = lerpColor('#d6d3d1', '#b09f90', dryFactor);
  const petalThroatGreen = lerpColor('#d9f99d', '#aba36e', dryFactor);

  // ── 花蕊：花丝（嫩青金黄）+ 花粉粒（金黄/琥珀） ──
  const filamentCol = lerpColor('#fef08a', '#cbb27a', dryFactor);
  const pollenCol = lerpColor('#facc15', '#b89445', dryFactor);
  const pollenEdge = lerpColor('#ca8a04', '#7c5f2b', dryFactor);
  const pistilCenter = lerpColor('#84cc16', '#696434', dryFactor);

  // ── 花径质地硬且色深（深古木褐青色，木质硬劲） ──
  const stemDark = lerpColor('#1f2415', '#332717', dryFactor);
  const stemMid = lerpColor('#363b22', '#4d3d25', dryFactor);
  const stemHighlight = lerpColor('#525732', '#6b5736', dryFactor);
  const stemJointBract = lerpColor('#5c4028', '#422c19', dryFactor);

  // ── 花骨朵青白透玉渐变 ──
  const budGreen = lerpColor('#4d7c0f', '#52502f', dryFactor);
  const budTender = lerpColor('#84cc16', '#76733f', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.50);
  const fl2 = getBlossomDropStyle(health, 0.40);
  const fl3 = getBlossomDropStyle(health, 0.28);
  const fl4 = getBlossomDropStyle(health, 0.18);
  const fl5 = getBlossomDropStyle(health, 0.08);

  /**
   * 渲染单朵六瓣盛开大花（正面 / 3/4 俯仰透视）
   * 具 6 枚形态各异的白玉花瓣 + 辐射花丝 + 金黄花粉粒
   */
  const renderOpenBloom = (
    cx: number,
    cy: number,
    r: number = 14,
    rot: number = 0,
    petalJitter: number[] = [0, 0, 0, 0, 0, 0]
  ) => {
    // 6 枚花瓣角度微扰，打破死板几何对称
    const angles = [
      -4 + petalJitter[0],
      58 + petalJitter[1],
      122 + petalJitter[2],
      176 + petalJitter[3],
      242 + petalJitter[4],
      304 + petalJitter[5],
    ];

    return (
      <g transform={`translate(${cx}, ${cy}) rotate(${rot})`} filter="url(#narcissusSoftGlow)">
        {/* 花托小绿萼 */}
        <circle cx="0" cy="0" r="3.2" fill={budGreen} />

        {/* 1. 六枚形态生动的白玉花瓣 */}
        {angles.map((ang, i) => {
          const petalScale = 0.95 + (i % 3) * 0.06;
          return (
            <g key={i} transform={`rotate(${ang}) scale(${petalScale})`}>
              {/* 花瓣本体：倒卵形/阔匙形，顶端圆润微带尖 */}
              <path
                d={`
                  M 0 0
                  C -${r * 0.45} -${r * 0.35}, -${r * 0.62} -${r * 0.82}, -${r * 0.42} -${r * 1.25}
                  C -${r * 0.25} -${r * 1.48}, ${r * 0.25} -${r * 1.48}, ${r * 0.42} -${r * 1.25}
                  C ${r * 0.62} -${r * 0.82}, ${r * 0.45} -${r * 0.35}, 0 0
                  Z
                `}
                fill="url(#narcissusPetalGrad)"
                stroke={petalSoftShade}
                strokeWidth="0.32"
              />
              {/* 花瓣中央立体光影浅脊 */}
              <path
                d={`M 0 0 Q 0 -${r * 0.75} 0 -${r * 1.35}`}
                stroke="#ffffff"
                strokeWidth="0.75"
                fill="none"
                opacity="0.85"
              />
              {/* 花瓣基部微泛嫩黄绿 */}
              <path
                d={`M 0 0 C -${r * 0.2} -${r * 0.2}, -${r * 0.25} -${r * 0.45}, 0 -${r * 0.55} C ${r * 0.25} -${r * 0.45}, ${r * 0.2} -${r * 0.2}, 0 0 Z`}
                fill={petalThroatGreen}
                opacity="0.6"
              />
            </g>
          );
        })}

        {/* 2. 花心中心圆盘 */}
        <circle cx="0" cy="0" r={r * 0.24} fill="url(#narcissusThroatGrad)" />

        {/* 3. 精密花蕊：由多枚辐射花丝 + 金黄花粉粒（花药）组成 */}
        {[...Array(12)].map((_, idx) => {
          const rad = (idx * 30 + (idx % 2 ? 6 : -6)) * (Math.PI / 180);
          const fLen = r * (0.36 + (idx % 3) * 0.06);
          const fx = Math.cos(rad) * fLen;
          const fy = Math.sin(rad) * fLen;
          return (
            <g key={idx}>
              {/* 细长花丝 */}
              <line
                x1="0"
                y1="0"
                x2={fx}
                y2={fy}
                stroke={filamentCol}
                strokeWidth="0.45"
                strokeLinecap="round"
              />
              {/* 花粉粒 (花药) */}
              <circle
                cx={fx}
                cy={fy}
                r="1.0"
                fill={pollenCol}
                stroke={pollenEdge}
                strokeWidth="0.25"
              />
            </g>
          );
        })}

        {/* 4. 中心雌蕊柱头 */}
        <circle cx="0" cy="0" r="1.2" fill={pistilCenter} />
      </g>
    );
  };

  /**
   * 渲染侧向/俯仰杯状水仙花（侧向花，展现侧面花托与前伸花蕊）
   */
  const renderProfileBloom = (
    cx: number,
    cy: number,
    scale: number = 1.0,
    rot: number = 0
  ) => {
    return (
      <g transform={`translate(${cx}, ${cy}) rotate(${rot}) scale(${scale})`} filter="url(#narcissusSoftGlow)">
        {/* 侧面花托与绿萼 */}
        <path d="M 0 0 C -3 -3, -4 -7, -2 -11 C 0 -13, 3 -11, 2 -7 C 3 -3, 2 -1, 0 0 Z" fill={stemMid} />
        <ellipse cx="0" cy="-10" rx="3.5" ry="1.8" fill={budGreen} />

        {/* 后层花瓣 */}
        <path
          d="M -3 -10 C -8 -16, -10 -24, -4 -28 C 1 -30, 4 -22, 1 -11 Z"
          fill="url(#narcissusPetalGrad)"
          stroke={petalSoftShade}
          strokeWidth="0.3"
        />
        <path
          d="M 2 -10 C 8 -16, 12 -23, 8 -27 C 3 -29, -1 -22, -1 -11 Z"
          fill="url(#narcissusPetalGrad)"
          stroke={petalSoftShade}
          strokeWidth="0.3"
        />

        {/* 侧面杯状花心与探出的金黄花丝 */}
        <ellipse cx="0" cy="-12" rx="4.5" ry="2.6" fill="url(#narcissusThroatGrad)" />

        {/* 探出花冠的斜向花丝与花粉 */}
        {[
          { x: -2.5, y: -19, len: 9 },
          { x: 0, y: -22, len: 10 },
          { x: 2.2, y: -20, len: 8.5 },
          { x: -4, y: -16, len: 7 },
          { x: 3.5, y: -17, len: 7.5 },
        ].map((pt, i) => (
          <g key={i}>
            <line x1="0" y1="-12" x2={pt.x} y2={pt.y} stroke={filamentCol} strokeWidth="0.5" />
            <circle cx={pt.x} cy={pt.y} r="1.1" fill={pollenCol} stroke={pollenEdge} strokeWidth="0.25" />
          </g>
        ))}

        {/* 前层翻翘花瓣 */}
        <path
          d="M -5 -11 C -12 -13, -16 -8, -13 -3 C -10 1, -4 -5, -1 -10 Z"
          fill="url(#narcissusPetalGrad)"
          stroke={petalSoftShade}
          strokeWidth="0.3"
        />
        <path
          d="M 3 -11 C 11 -13, 15 -7, 12 -2 C 9 2, 4 -5, 1 -10 Z"
          fill="url(#narcissusPetalGrad)"
          stroke={petalSoftShade}
          strokeWidth="0.3"
        />
      </g>
    );
  };

  /**
   * 渲染圆润饱满的青翠白玉花骨朵 (Flower Bud)
   */
  const renderFlowerBud = (
    cx: number,
    cy: number,
    r: number = 3.2,
    rot: number = 0,
    hasPetalTip: boolean = true
  ) => {
    return (
      <g transform={`translate(${cx}, ${cy}) rotate(${rot})`} filter="url(#narcissusSoftGlow)">
        {/* 花骨朵球体 */}
        <ellipse
          cx="0"
          cy="0"
          rx={r}
          ry={r * 1.15}
          fill="url(#narcissusBudGrad)"
          stroke={stemDark}
          strokeWidth="0.3"
        />
        {/* 若微裂，露出一抹洁白花瓣尖 */}
        {hasPetalTip && (
          <path
            d={`M -${r * 0.35} -${r * 0.8} Q 0 -${r * 1.3} ${r * 0.35} -${r * 0.8} Z`}
            fill={petalWhite}
          />
        )}
        {/* 萼片裂线 */}
        <path d={`M 0 ${r * 1.1} L 0 -${r * 0.6}`} stroke={stemHighlight} strokeWidth="0.35" opacity="0.6" />
        <circle cx={-r * 0.35} cy={-r * 0.2} r={r * 0.25} fill="#ffffff" opacity="0.75" />
      </g>
    );
  };

  return (
    <g id="narcissusFlora" style={agingStyle}>
      <defs>
        {/* 1. 花瓣羊脂玉质立体渐变 */}
        <radialGradient id="narcissusPetalGrad" cx="45%" cy="35%" r="70%">
          <stop offset="0%" stopColor={petalWhite} />
          <stop offset="58%" stopColor={petalBody} />
          <stop offset="88%" stopColor={petalSoftShade} />
          <stop offset="100%" stopColor={petalDepthShade} />
        </radialGradient>

        {/* 2. 花心内盘嫩黄绿渐变 */}
        <radialGradient id="narcissusThroatGrad" cx="40%" cy="40%" r="65%">
          <stop offset="0%" stopColor={pollenCol} />
          <stop offset="50%" stopColor={petalThroatGreen} />
          <stop offset="100%" stopColor={budGreen} />
        </radialGradient>

        {/* 3. 深色坚韧花径圆柱形渐变 */}
        <linearGradient id="narcissusStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stemDark} />
          <stop offset="35%" stopColor={stemHighlight} />
          <stop offset="65%" stopColor={stemMid} />
          <stop offset="100%" stopColor={stemDark} />
        </linearGradient>

        {/* 4. 花骨朵青翠白玉渐变 */}
        <radialGradient id="narcissusBudGrad" cx="35%" cy="32%" r="68%">
          <stop offset="0%" stopColor={petalWhite} />
          <stop offset="40%" stopColor={budTender} />
          <stop offset="85%" stopColor={budGreen} />
          <stop offset="100%" stopColor={stemDark} />
        </radialGradient>

        {/* 5. 柔和立体微距落影 */}
        <filter id="narcissusSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0.5" dy="1.0" stdDeviation="0.7" floodColor="#0f172a" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* ── 架构 1：深色古拙曲折硬花径（无叶、多曲折、自然分叉、木质节痕） ── */}
      <g id="narcissusWoodyStems">
        {/* ════ 主干 (从瓶口 75, 126 向上升起，曲折挺拔延伸至顶梢 96, 20) ════ */}
        {/* 基段：从瓶口 75, 126 升至第一分叉节 74, 102 */}
        <path
          d="M 75 126 L 74 102"
          stroke="url(#narcissusStemGrad)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        {/* 节 1 木质膨大节痕 */}
        <ellipse cx="74" cy="102" rx="2.4" ry="1.2" fill={stemJointBract} />

        {/* 中下段：从 74, 102 折行向上至第二分叉节 72, 78 */}
        <path
          d="M 74 102 L 71 88 L 73 78"
          stroke="url(#narcissusStemGrad)"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* 节 2 */}
        <ellipse cx="73" cy="78" rx="2.2" ry="1.1" fill={stemJointBract} />

        {/* 中上主段：从 73, 78 向右上方曲折挑起至第三分叉节 84, 48 */}
        <path
          d="M 73 78 L 76 64 L 84 48"
          stroke="url(#narcissusStemGrad)"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* 节 3 */}
        <ellipse cx="84" cy="48" rx="1.9" ry="1.0" fill={stemJointBract} />

        {/* 顶梢主段：从 84, 48 劲挺伸向顶峰盛开花朵 94, 22 */}
        <path
          d="M 84 48 L 90 34 L 94 22"
          stroke="url(#narcissusStemGrad)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ════ 侧支 1：左侧曲折枝桠（带半开小花与密集花骨朵） ════ */}
        {/* 从第二节 73, 78 分出，向左上方曲折探展 */}
        <path
          d="M 73 78 L 60 72 L 48 68"
          stroke="url(#narcissusStemGrad)"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* 左分叉小节 */}
        <ellipse cx="48" cy="68" rx="1.6" ry="0.9" fill={stemJointBract} />
        {/* 左向上细枝 */}
        <path
          d="M 48 68 L 40 58 L 34 54"
          stroke="url(#narcissusStemGrad)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* 左向下侧小细梗 */}
        <path
          d="M 60 72 L 54 84"
          stroke="url(#narcissusStemGrad)"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <path
          d="M 48 68 L 38 76"
          stroke="url(#narcissusStemGrad)"
          strokeWidth="1.0"
          strokeLinecap="round"
        />

        {/* ════ 侧支 2：右侧中段花骨朵细梗 ════ */}
        {/* 从 73, 78 向上右方分出的长梗，顶戴花骨朵 */}
        <path
          d="M 74 88 C 82 82, 94 72, 102 54"
          stroke="url(#narcissusStemGrad)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />

        {/* 侧面花托细梗：连接右侧盛开侧向花 (98, 80) */}
        <path
          d="M 74 102 C 82 98, 90 92, 98 80"
          stroke="url(#narcissusStemGrad)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* ════ 侧支 3：右下方大弧度悬垂长枝（优美抛物线下弯，绝佳意境） ════ */}
        {/* 从基部 74, 102 向右下方深情下垂 */}
        <path
          d="M 74 102 C 85 106, 102 112, 118 122"
          stroke="url(#narcissusStemGrad)"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
        />

        {/* 顶段小花骨朵侧枝 */}
        <path
          d="M 84 48 C 92 46, 102 42, 108 32"
          stroke="url(#narcissusStemGrad)"
          strokeWidth="1.0"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* ── 架构 2：开放程度不同的白玉水仙花朵（主支盛开、六瓣、花丝花粉清晰生动，随风丰姿摇曳） ── */}
      <g id="narcissusBloomsGroup">
        {/* 【花朵 1·顶峰盛开主花】：位于 94, 22，面向右上方，高挑圣洁随风微仰 */}
        <g id="bloomTop" className="animate-flower-sway-crown" style={{ ...fl4, transformOrigin: '94px 22px' }}>
          {renderOpenBloom(94, 22, 13.5, 24, [2, -3, 4, -2, 3, -4])}
        </g>

        {/* 【花朵 2·中上部大花】：位于 84, 48，3/4 俯仰盛开，主花沉稳轻晃 */}
        <g id="bloomMidUpper" className="animate-flower-sway-main" style={{ ...fl1, transformOrigin: '84px 48px' }}>
          {renderOpenBloom(84, 48, 15.0, -12, [-3, 2, -4, 3, -2, 4])}
        </g>

        {/* 【花朵 3·右侧侧向立体花】：位于 98, 80，侧面杯状杯口朝右，向外舒展轻摆 */}
        <g id="bloomRightProfile" className="animate-flower-sway-right" style={{ ...fl2, transformOrigin: '98px 80px' }}>
          {renderProfileBloom(98, 80, 1.12, 110)}
        </g>

        {/* 【花朵 4·左侧初绽半开花】：位于 46, 68，迎风轻拂起伏 */}
        <g id="bloomLeftSemi" className="animate-flower-sway-left" style={{ ...fl3, transformOrigin: '46px 68px' }}>
          {renderOpenBloom(46, 68, 11.5, -35, [3, -2, 4, -4, 2, -3])}
        </g>

        {/* 【花朵 5·左梢初放小星花】：位于 34, 54，灵巧微颤 */}
        <g id="bloomLeftTip" className="animate-flower-sway-bud" style={{ ...fl5, transformOrigin: '34px 54px' }}>
          {renderOpenBloom(34, 54, 9.5, 45, [1, -1, 2, -2, 1, -1])}
        </g>
      </g>

      {/* ── 架构 3：饱满青白珍珠花骨朵群（侧支花骨朵轻快随风摇曳） ── */}
      <g id="narcissusBudsGroup">
        {/* 骨朵 1：右上梢头伴生花蕾 */}
        <g className="animate-flower-sway-bud" style={{ ...fl1, transformOrigin: '108px 32px' }}>
          {renderFlowerBud(108, 32, 2.8, 45, true)}
        </g>

        {/* 骨朵 2：右侧中上挺拔长梗花蕾 */}
        <g className="animate-flower-sway-bud" style={{ ...fl2, transformOrigin: '102px 54px' }}>
          {renderFlowerBud(102, 54, 3.2, 30, true)}
        </g>

        {/* 骨朵 3：主干中段伴生青蕾 */}
        <g style={fl3}>{renderFlowerBud(76, 66, 2.7, -15, false)}</g>

        {/* 骨朵 4：右下悬垂长枝顶端的垂悬小蕾（下垂摆动） */}
        <g className="animate-sway-grass-weeping" style={{ ...fl2, transformOrigin: '118px 122px' }}>
          {renderFlowerBud(118, 122, 3.1, 105, false)}
        </g>

        {/* 骨朵 5：左侧分枝下方小蕾 */}
        <g style={fl4}>{renderFlowerBud(54, 84, 2.8, 135, false)}</g>

        {/* 骨朵 6：左侧探出小蕾 */}
        <g className="animate-flower-sway-bud" style={{ ...fl5, transformOrigin: '38px 76px' }}>
          {renderFlowerBud(38, 76, 2.9, -45, true)}
        </g>
      </g>
    </g>
  );
};
