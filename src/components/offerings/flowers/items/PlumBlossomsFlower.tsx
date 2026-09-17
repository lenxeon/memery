/**
 * @file PlumBlossomsFlower.tsx
 * @description 【傲霜冷香素白梅】瘦、硬、折·单层五瓣紧贴枝·金丝满心青萼点缀·疏朗极简传统文人插梅。
 * 
 * 艺术四准则：
 * 1. 骨（枝干形态）：“瘦、硬、折” —— 深褐焦墨、枯瘦挺拔木质细枝、硬朗顿挫与骨节感、顶端小分叉、通体不生一片叶。
 * 2. 肉（花瓣结构）：“单层、五瓣、紧贴枝” —— 纯白圆润五瓣如瓷碟平展，无垂吊长梗，直接“咬/贴”在木枝骨节上。
 * 3. 神（花蕊与花蕾）：“金丝满心，青萼点缀” —— 密集金色放射丝与火星花药、直立水滴形嫩青小花苞包覆深色花萼。
 * 4. 韵（整体构图与气度）：“疏朗、素净、极简” —— 仅褐、白、金、青绿四色，疏密有致，清瘦孤高。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle, getFlowerAgingFilter } from '../utils/lifecycle';

export const PLUM_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.65, fallSpan: 0.08, startX: 84, startY: 32, landX: 62, landY: 194, rx: 3.2, ry: 2.2, landRot: 35, swayAmp: 12, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.45, fallSpan: 0.08, startX: 102, startY: -2, landX: 96, landY: 193, rx: 3.4, ry: 2.3, landRot: -20, swayAmp: 15, swayFreq: 3.0 },
  { id: 3, detachHealth: 0.3, fallSpan: 0.07, startX: 68, startY: 2, landX: 45, landY: 195, rx: 3.1, ry: 2.1, landRot: 45, swayAmp: 10, swayFreq: 3.5 },
  { id: 4, detachHealth: 0.18, fallSpan: 0.06, startX: 108, startY: -25, landX: 108, landY: 194, rx: 3.0, ry: 2.0, landRot: -40, swayAmp: 16, swayFreq: 2.8 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.05, startX: 64, startY: -26, landX: 52, landY: 195, rx: 2.8, ry: 1.9, landRot: 15, swayAmp: 14, swayFreq: 3.3 },
];

export const PlumBlossomsFlower: React.FC<FlowerComponentProps> = ({
  health,
  dryFactor,
  isFaded,
}) => {
  const agingStyle = getFlowerAgingFilter(health, isFaded);

  // 纯白花瓣衰变色：冰洁玉白 -> 微泛淡黄素宣纸白 -> 枯萎温润浅赭
  const petalWhite0 = lerpColor('#ffffff', '#faf6ee', dryFactor);
  const petalWhite50 = lerpColor('#fcfbf8', '#eedec7', dryFactor);
  const petalBase = lerpColor('#f1f5f9', '#cbb398', dryFactor);

  // 焦墨老木苍干色（瘦、硬、枯老、节骨顿挫）
  const barkDark = lerpColor('#221008', '#160a04', dryFactor);
  const barkMid = lerpColor('#391e10', '#251308', dryFactor);
  const barkLight = lerpColor('#543018', '#381e0d', dryFactor);

  // 金丝花蕊与金色小火星花药
  const stamenGold = lerpColor('#fef08a', '#c4a66a', dryFactor);
  const antherGold = lerpColor('#eab308', '#8f6828', dryFactor);

  // 嫩青花蕾与青萼
  const budGreen0 = lerpColor('#86efac', '#8a8868', dryFactor);
  const budGreen100 = lerpColor('#22c55e', '#524f33', dryFactor);
  const calyxDark = lerpColor('#30150b', '#1a0b05', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.5);
  const fl2 = getBlossomDropStyle(health, 0.4);
  const fl3 = getBlossomDropStyle(health, 0.3);
  const fl4 = getBlossomDropStyle(health, 0.2);
  const fl5 = getBlossomDropStyle(health, 0.1);

  // ── 纯白五瓣梅神态渲染（花朵极小，各异神态，绝非单一千篇一律正面） ──
  /**
   * @param cx 枝干节点 X
   * @param cy 枝干节点 Y
   * @param r 基础半径（缩小一半：约 4.8 ~ 6.2px）
   * @param rot 枝头附着角度
   * @param posture 神态：
   *   - 'side_right': 侧颜向右微昂，2瓣重叠背立，3瓣展向侧方，花蕊斜挑而出
   *   - 'side_left': 侧颜向左斜倚，青萼后托明显，花蕊斜出
   *   - 'three_quarter': 三分之四侧俯仰，花盘椭圆透视倾斜
   *   - 'back_cup': 背身/侧背向（仅露青绿托萼与探出的一半微卷白瓣，含蓄冷幽）
   *   - 'front_tilt': 正面微仰，透视扁圆，显金色火星花蕊
   */
  const renderPlumBloom = (
    cx: number,
    cy: number,
    r: number = 5.5,
    rot: number = 0,
    posture: 'side_right' | 'side_left' | 'three_quarter' | 'back_cup' | 'front_tilt' = 'three_quarter'
  ) => {
    return (
      <g transform={`translate(${cx}, ${cy}) rotate(${rot})`}>
        {/* 1. 侧枝贴合木质深焦墨花托基座（紧咬枝节，无下垂软梗） */}
        <circle cx="0" cy="0" r={r * 0.35} fill={calyxDark} opacity="0.85" />

        {/* 2. 依据不同姿态绘制形态各异的花瓣与花蕊 */}
        {posture === 'front_tilt' && (
          // 正面微仰小碟状（椭圆透视扁平，花体轻巧精妙）
          <g transform="scale(1, 0.82)">
            {[0, 72, 144, 216, 288].map((angle, idx) => (
              <g key={idx} transform={`rotate(${angle})`}>
                <path
                  d={`M 0 0 C -${r * 0.65} -${r * 0.45}, -${r * 0.72} -${r * 1.1}, 0 -${r * 1.22} C ${r * 0.72} -${r * 1.1}, ${r * 0.65} -${r * 0.45}, 0 0 Z`}
                  fill="url(#whitePlumPetalGrad)"
                  stroke={petalBase}
                  strokeWidth="0.35"
                />
              </g>
            ))}
            {/* 青绿花心 */}
            <circle cx="0" cy="0" r={r * 0.22} fill={budGreen100} />
            {/* 放射细金丝与花药（辐射开出，精细纤巧） */}
            {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const len = r * 0.65;
              const x2 = Math.cos(rad) * len;
              const y2 = Math.sin(rad) * len;
              return (
                <g key={i}>
                  <line x1="0" y1="0" x2={x2} y2={y2} stroke={stamenGold} strokeWidth="0.4" />
                  <circle cx={x2} cy={y2} r="0.55" fill={antherGold} />
                </g>
              );
            })}
          </g>
        )}

        {posture === 'three_quarter' && (
          // 三刻侧颜（后两瓣因透视较短，前三瓣舒展，金丝向侧前发散）
          <g transform="scale(0.88, 1.1) rotate(15)">
            {/* 后侧两瓣 */}
            <path d={`M 0 0 C -${r * 0.5} -${r * 0.3}, -${r * 0.6} -${r * 0.8}, 0 -${r * 0.85} C ${r * 0.4} -${r * 0.8}, ${r * 0.4} -${r * 0.3}, 0 0 Z`} fill="url(#whitePlumPetalGrad)" stroke={petalBase} strokeWidth="0.3" transform="rotate(-50)" />
            <path d={`M 0 0 C -${r * 0.4} -${r * 0.3}, -${r * 0.4} -${r * 0.8}, 0 -${r * 0.85} C ${r * 0.6} -${r * 0.8}, ${r * 0.5} -${r * 0.3}, 0 0 Z`} fill="url(#whitePlumPetalGrad)" stroke={petalBase} strokeWidth="0.3" transform="rotate(45)" />
            {/* 青绿心底 */}
            <ellipse cx="0" cy="0" rx={r * 0.25} ry={r * 0.18} fill={budGreen100} />
            {/* 前侧三瓣倾展 */}
            <path d={`M 0 0 C -${r * 0.65} -${r * 0.4}, -${r * 0.75} -${r * 1.1}, 0 -${r * 1.25} C ${r * 0.75} -${r * 1.1}, ${r * 0.65} -${r * 0.4}, 0 0 Z`} fill="url(#whitePlumPetalGrad)" stroke={petalBase} strokeWidth="0.35" transform="rotate(115)" />
            <path d={`M 0 0 C -${r * 0.65} -${r * 0.4}, -${r * 0.75} -${r * 1.1}, 0 -${r * 1.2} C ${r * 0.75} -${r * 1.1}, ${r * 0.65} -${r * 0.4}, 0 0 Z`} fill="url(#whitePlumPetalGrad)" stroke={petalBase} strokeWidth="0.35" transform="rotate(180)" />
            <path d={`M 0 0 C -${r * 0.65} -${r * 0.4}, -${r * 0.75} -${r * 1.1}, 0 -${r * 1.25} C ${r * 0.75} -${r * 1.1}, ${r * 0.65} -${r * 0.4}, 0 0 Z`} fill="url(#whitePlumPetalGrad)" stroke={petalBase} strokeWidth="0.35" transform="rotate(245)" />
            {/* 侧探金丝 */}
            {[-25, -10, 5, 20, 35].map((angle, i) => {
              const rad = ((angle + 90) * Math.PI) / 180;
              const len = r * 0.75;
              return (
                <g key={i}>
                  <line x1="0" y1="0" x2={Math.cos(rad) * len} y2={Math.sin(rad) * len} stroke={stamenGold} strokeWidth="0.4" />
                  <circle cx={Math.cos(rad) * len} cy={Math.sin(rad) * len} r="0.55" fill={antherGold} />
                </g>
              );
            })}
          </g>
        )}

        {posture === 'side_right' && (
          // 纯侧身向右（花瓣层叠如玉勺侧立，花萼在左下清晰紧包，极具古典画意）
          <g>
            {/* 左后侧深褐色青绿花萼托 */}
            <path d="M 0 0 C -3 1, -4 -3, -1 -4 C 1 -4, 2 -1, 0 0 Z" fill={calyxDark} />
            <ellipse cx="-1.5" cy="-2.5" rx="1.8" ry="1.2" fill={budGreen100} opacity="0.9" />
            {/* 后向侧瓣 */}
            <path d={`M 0 0 C 0 -${r * 0.6}, ${r * 0.4} -${r * 1.1}, ${r * 0.85} -${r * 1.0} C ${r * 0.8} -${r * 0.4}, ${r * 0.3} -${r * 0.1}, 0 0 Z`} fill="url(#whitePlumPetalGrad)" stroke={petalBase} strokeWidth="0.3" />
            {/* 正侧中瓣 */}
            <path d={`M 0 0 C ${r * 0.3} -${r * 0.6}, ${r * 0.9} -${r * 0.8}, ${r * 1.25} -${r * 0.2} C ${r * 0.9} ${r * 0.3}, ${r * 0.4} ${r * 0.2}, 0 0 Z`} fill="url(#whitePlumPetalGrad)" stroke={petalBase} strokeWidth="0.35" />
            {/* 前下方微收瓣 */}
            <path d={`M 0 0 C ${r * 0.2} ${r * 0.2}, ${r * 0.7} ${r * 0.6}, ${r * 1.0} ${r * 0.5} C ${r * 0.8} ${r * 0.1}, ${r * 0.4} 0, 0 0 Z`} fill="url(#whitePlumPetalGrad)" stroke={petalBase} strokeWidth="0.3" />
            {/* 向右探出的细金丝与花药 */}
            <line x1="2" y1="-1" x2={r * 0.9} y2="-3" stroke={stamenGold} strokeWidth="0.4" />
            <circle cx={r * 0.9} cy="-3" r="0.55" fill={antherGold} />
            <line x1="2" y1="0" x2={r * 1.05} y2="-0.5" stroke={stamenGold} strokeWidth="0.4" />
            <circle cx={r * 1.05} cy="-0.5" r="0.55" fill={antherGold} />
            <line x1="2" y1="1" x2={r * 0.95} y2="2" stroke={stamenGold} strokeWidth="0.4" />
            <circle cx={r * 0.95} cy="2" r="0.55" fill={antherGold} />
          </g>
        )}

        {posture === 'side_left' && (
          // 纯侧身向左微倾
          <g transform="scale(-1, 1)">
            <path d="M 0 0 C -3 1, -4 -3, -1 -4 C 1 -4, 2 -1, 0 0 Z" fill={calyxDark} />
            <ellipse cx="-1.5" cy="-2.5" rx="1.8" ry="1.2" fill={budGreen100} opacity="0.9" />
            <path d={`M 0 0 C 0 -${r * 0.6}, ${r * 0.4} -${r * 1.1}, ${r * 0.85} -${r * 1.0} C ${r * 0.8} -${r * 0.4}, ${r * 0.3} -${r * 0.1}, 0 0 Z`} fill="url(#whitePlumPetalGrad)" stroke={petalBase} strokeWidth="0.3" />
            <path d={`M 0 0 C ${r * 0.3} -${r * 0.6}, ${r * 0.9} -${r * 0.8}, ${r * 1.25} -${r * 0.2} C ${r * 0.9} ${r * 0.3}, ${r * 0.4} ${r * 0.2}, 0 0 Z`} fill="url(#whitePlumPetalGrad)" stroke={petalBase} strokeWidth="0.35" />
            <path d={`M 0 0 C ${r * 0.2} ${r * 0.2}, ${r * 0.7} ${r * 0.6}, ${r * 1.0} ${r * 0.5} C ${r * 0.8} ${r * 0.1}, ${r * 0.4} 0, 0 0 Z`} fill="url(#whitePlumPetalGrad)" stroke={petalBase} strokeWidth="0.3" />
            <line x1="2" y1="-1" x2={r * 0.9} y2="-3" stroke={stamenGold} strokeWidth="0.4" />
            <circle cx={r * 0.9} cy="-3" r="0.55" fill={antherGold} />
            <line x1="2" y1="0" x2={r * 1.05} y2="-0.5" stroke={stamenGold} strokeWidth="0.4" />
            <circle cx={r * 1.05} cy="-0.5" r="0.55" fill={antherGold} />
            <line x1="2" y1="1" x2={r * 0.95} y2="2" stroke={stamenGold} strokeWidth="0.4" />
            <circle cx={r * 0.95} cy="2" r="0.55" fill={antherGold} />
          </g>
        )}

        {posture === 'back_cup' && (
          // 背身回望杯状（主要呈现深色与青绿五裂花萼，掩映露出素白瓣尖，极具文人幽玄含蓄之神）
          <g>
            {/* 白瓣背影浅露 */}
            <circle cx="0" cy="-2.5" r={r * 0.75} fill="url(#whitePlumPetalGrad)" stroke={petalBase} strokeWidth="0.3" />
            {/* 清晰挺拔的五星青褐色花萼杯 */}
            <circle cx="0" cy="0" r={r * 0.32} fill={calyxDark} />
            {[0, 72, 144, 216, 288].map((angle, idx) => (
              <path
                key={idx}
                d="M 0 0 L -1.2 -1.8 L 0 -3.6 L 1.2 -1.8 Z"
                fill={budGreen100}
                stroke={calyxDark}
                strokeWidth="0.3"
                transform={`rotate(${angle})`}
              />
            ))}
          </g>
        )}
      </g>
    );
  };

  // ── 神：水滴直立生长的嫩青绿色小花苞（更小更紧致，清瘦灵动） ──
  const renderWaterDropBud = (x: number, y: number, rot: number = 0, scale: number = 0.85) => (
    <g transform={`translate(${x}, ${y}) rotate(${rot}) scale(${scale})`}>
      {/* 深色木质小花萼杯 (咬紧于枝) */}
      <path d="M -1.8 0 C -2.2 1.2, 2.2 1.2, 1.8 0 Z" fill={calyxDark} />
      <path d="M -1.5 -0.4 L -2.0 -1.8 L -0.8 -1.1 L 0 -2.0 L 0.8 -1.1 L 2.0 -1.8 L 1.5 -0.4 Z" fill={calyxDark} />
      {/* 水滴形嫩青小花苞 */}
      <path
        d="M 0 0 C -2.2 -1.4, -2.6 -4.0, 0 -7.2 C 2.6 -4.0, 2.2 -1.4, 0 0 Z"
        fill="url(#greenDropBudGrad)"
        stroke="#15803d"
        strokeWidth="0.3"
      />
      {/* 尖端一缕素白瓣芯 */}
      <ellipse cx="0" cy="-5.6" rx="0.7" ry="1.2" fill="#ffffff" opacity="0.9" />
    </g>
  );

  return (
    <g id="plumBlossomsFlora" style={agingStyle}>
      <defs>
        {/* 白梅花瓣莹洁玉白渐变 */}
        <radialGradient id="whitePlumPetalGrad" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="65%" stopColor={petalWhite0} />
          <stop offset="100%" stopColor={petalWhite50} />
        </radialGradient>

        {/* 水滴嫩青花蕾渐变 */}
        <linearGradient id="greenDropBudGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={budGreen100} />
          <stop offset="60%" stopColor={budGreen0} />
          <stop offset="100%" stopColor="#dcfce7" />
        </linearGradient>

        {/* 焦墨枯瘦老枝木纹渐变 */}
        <linearGradient id="thinBarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={barkLight} />
          <stop offset="40%" stopColor={barkMid} />
          <stop offset="100%" stopColor={barkDark} />
        </linearGradient>
      </defs>

      {/* ── 整个冷香素白梅花枝在风中苍劲微晃（以瓶口 75px 125px 为旋转锚点，木质高挺） ── */}
      <g className="animate-sway-woody-stem" style={{ transformOrigin: '75px 125px' }}>
        {/* ── 骨：枝干形态“瘦、硬、折” ──
            枝干加高一半（从原本瓶口 125 一路破空耸立至 -75，高挑清朗，中后段错落折枝，通体绝不生叶） */}
        <g id="plumThinStems">
          {/* 1. 下部木质老主干（自瓶口 75,125 挺拔直上，极度清瘦 2.0px，至中段 74,48 破空顿挫） */}
          <path
            d="M 75 125 L 75 106 L 73 88 L 76 70 L 74 48"
            stroke="url(#thinBarkGrad)"
            strokeWidth="2.1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="bevel"
          />

          {/* 2. 中后段向右上方舒展的折枝（硬朗折角，高远瘦硬） */}
          <path
            d="M 74 48 L 84 32 L 95 18 L 102 -2 L 108 -25 L 114 -42"
            stroke="url(#thinBarkGrad)"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="bevel"
          />

          {/* 右后段分叉梢细枝 */}
          <path d="M 108 -25 L 115 -18 L 122 -14" stroke="url(#thinBarkGrad)" strokeWidth="1.0" fill="none" strokeLinecap="round" />
          <path d="M 95 18 L 89 12 L 85 8" stroke="url(#thinBarkGrad)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          <path d="M 102 -2 L 110 -6" stroke="url(#thinBarkGrad)" strokeWidth="1.0" fill="none" strokeLinecap="round" />

          {/* 3. 破空拔高之孤高绝顶主枝（加高至 y=-75，峭拔清峻，一枝独秀） */}
          <path
            d="M 74 48 L 72 26 L 68 2 L 64 -26 L 67 -54 L 62 -75"
            stroke="url(#thinBarkGrad)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="bevel"
          />

          {/* 梢头微有清瘦小分叉 */}
          <path d="M 64 -26 L 56 -36 L 48 -42" stroke="url(#thinBarkGrad)" strokeWidth="1.0" fill="none" strokeLinecap="round" />
          <path d="M 67 -54 L 72 -64" stroke="url(#thinBarkGrad)" strokeWidth="0.9" fill="none" strokeLinecap="round" />
          <path d="M 62 -75 L 58 -82" stroke="url(#thinBarkGrad)" strokeWidth="0.8" fill="none" strokeLinecap="round" />

          {/* 4. 中下部向左探出的小折枝（极为克制，仅作骨气呼应） */}
          <path
            d="M 73 88 L 62 82 L 54 78"
            stroke="url(#thinBarkGrad)"
            strokeWidth="1.3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="bevel"
          />
          <path d="M 62 82 L 58 88" stroke="url(#thinBarkGrad)" strokeWidth="0.9" fill="none" strokeLinecap="round" />

          {/* 5. 枝条折变处的硬朗骨节（Knobby Node） */}
          <ellipse cx="75" cy="106" rx="1.6" ry="1.1" fill={barkDark} stroke={barkLight} strokeWidth="0.4" />
          <ellipse cx="76" cy="70" rx="1.5" ry="1.0" fill={barkDark} stroke={barkLight} strokeWidth="0.4" />
          <ellipse cx="74" cy="48" rx="1.8" ry="1.2" fill={barkDark} stroke={barkLight} strokeWidth="0.5" />
          <ellipse cx="95" cy="18" rx="1.4" ry="1.0" fill={barkDark} stroke={barkLight} strokeWidth="0.4" />
          <ellipse cx="108" cy="-25" rx="1.3" ry="0.9" fill={barkDark} stroke={barkLight} strokeWidth="0.4" />
          <ellipse cx="68" cy="2" rx="1.4" ry="1.0" fill={barkDark} stroke={barkLight} strokeWidth="0.4" />
          <ellipse cx="64" cy="-26" rx="1.3" ry="0.9" fill={barkDark} stroke={barkLight} strokeWidth="0.4" />

          {/* 树皮皴纹细笔 */}
          <path d="M 74.8 115 L 74.2 98" stroke={barkLight} strokeWidth="0.5" opacity="0.6" />
          <path d="M 74.5 65 L 75.2 55" stroke={barkLight} strokeWidth="0.4" opacity="0.6" />
          <path d="M 86 30 L 93 20" stroke={barkLight} strokeWidth="0.4" opacity="0.6" />
        </g>

        {/* ── 神：水滴形直立嫩青绿色小花苞（仅稀疏点缀在中后高段枝节与梢头） ── */}
        <g id="plumGreenBuds">
          {/* 极顶高梢直立水滴嫩蕾 */}
          {renderWaterDropBud(58, -82, -18, 0.85)}
          {renderWaterDropBud(72, -64, 22, 0.8)}
          {renderWaterDropBud(48, -42, -35, 0.8)}
          {/* 右上高梢直立嫩蕾 */}
          {renderWaterDropBud(114, -42, 28, 0.85)}
          {renderWaterDropBud(122, -14, 45, 0.75)}
          {renderWaterDropBud(110, -6, 15, 0.75)}
          {renderWaterDropBud(85, 8, -25, 0.75)}
          {/* 中下部极少一两枚幼蕾 */}
          {renderWaterDropBud(54, 78, -35, 0.8)}
          {renderWaterDropBud(76, 68, 12, 0.75)}
        </g>

        {/* ── 肉：纯白小碟梅花（花体缩小一半，稀疏错落分布在中后段，神态各异：俯仰、侧颜、背杯，微风轻晃） ── */}
        <g id="plumWhiteBlooms">
          {/* 1. 中段主节处：【侧颜向右】微昂（咬在 84,32 节处，尺寸极小 r=5.4，侧颜清冷，向右斜挑金蕊） */}
          <g className="animate-flower-sway-main-gentle" style={{ ...fl1, transformOrigin: '84px 32px' }}>
            {renderPlumBloom(84, 32, 5.4, -18, 'side_right')}
          </g>

          {/* 2. 中高右侧折枝：【三分之四侧俯】微俯（咬在 102,-2 节处，尺寸 r=5.8，向案前微俯视） */}
          <g className="animate-flower-sway-right-gentle" style={{ ...fl2, transformOrigin: '102px -2px' }}>
            {renderPlumBloom(102, -2, 5.8, 25, 'three_quarter')}
          </g>

          {/* 3. 高枝顶端分梢：【侧颜向左】清拔（咬在 108,-25 节处，尺寸 r=5.0，侧身回看主干） */}
          <g className="animate-flower-sway-bud-gentle" style={{ ...fl3, transformOrigin: '108px -25px' }}>
            {renderPlumBloom(108, -25, 5.0, 15, 'side_left')}
          </g>

          {/* 4. 主长枝中段偏左：【正面微仰】扁碟（咬在 68,2 节处，尺寸 r=5.2，仰望长空，金丝毕现） */}
          <g className="animate-flower-sway-left-gentle" style={{ ...fl4, transformOrigin: '68px 2px' }}>
            {renderPlumBloom(68, 2, 5.2, -10, 'front_tilt')}
          </g>

          {/* 5. 顶梢破空回眸处：【背身含蓄杯状】（咬在 64,-26 节处，尺寸 r=4.8，背立露青绿花萼与白瓣尖，宋画幽玄禅意） */}
          <g className="animate-flower-sway-crown-gentle" style={{ ...fl5, transformOrigin: '64px -26px' }}>
            {renderPlumBloom(64, -26, 4.8, 30, 'back_cup')}
          </g>
        </g>
      </g>
    </g>
  );
};
