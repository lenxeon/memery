/**
 * @file DaisiesFlower.tsx
 * @description 【写实清纯小雏菊】
 * 核心特征：
 * 1. 高度整体压缩（花丛顶梢自原先高耸位置下移压实至 y:36~40，紧凑聚合于瓶口）；
 * 2. 多花紧聚、高低掩映、层次极度聚拢，绝无零散突兀飞出；
 * 3. 严格遵循天然多重视角与植物结构：
 *    - 【花骨朵】：青绿细萼紧裹纯白尖，绝无花蕊；
 *    - 【背面】：宋画禅意，清晰显露背部青绿叠复总苞盘与洁白花瓣反面，绝无花蕊；
 *    - 【侧面】：小巧雅致青绿花托，花瓣前侧轻展，花托口严整贴合，绝无大绿瓜与大黄球；
 *    - 【三分之四面与正面】：饱满绽放，显露由无数细长金黄花丝簇聚而成的绒毛花蕊；
 * 4. 叶片小而细长，微卷微翘，层叠收拢于枝间，极具自然插花聚落之美。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getFlowerAgingFilter } from '../utils/lifecycle';

export const DAISY_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.55, fallSpan: 0.08, startX: 86, startY: 62, landX: 94, landY: 194, rx: 4.8, ry: 2.1, landRot: 32, swayAmp: 12, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.42, fallSpan: 0.07, startX: 62, startY: 66, landX: 55, landY: 193, rx: 4.6, ry: 2.0, landRot: -28, swayAmp: 14, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.30, fallSpan: 0.06, startX: 82, startY: 82, landX: 88, landY: 195, rx: 5.0, ry: 2.2, landRot: 22, swayAmp: 10, swayFreq: 3.0 },
  { id: 4, detachHealth: 0.18, fallSpan: 0.06, startX: 67, startY: 86, landX: 60, landY: 196, rx: 4.5, ry: 1.9, landRot: -35, swayAmp: 15, swayFreq: 3.8 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.05, startX: 75, startY: 58, landX: 78, landY: 195, rx: 4.7, ry: 2.0, landRot: 15, swayAmp: 11, swayFreq: 3.4 },
];

export const DaisiesFlower: React.FC<FlowerComponentProps> = ({
  health,
  dryFactor,
  isFaded,
}) => {
  const agingStyle = getFlowerAgingFilter(health, isFaded);

  // ── 纯白花瓣色彩 ──
  const petalPureWhite = lerpColor('#ffffff', '#fcfaf5', dryFactor);
  const petalMidWhite = lerpColor('#f5f7fa', '#ebdcc5', dryFactor);
  const petalShadow = lerpColor('#cbd5e1', '#a8947d', dryFactor);
  const petalBackTint = lerpColor('#edf2f7', '#dcd0bf', dryFactor);

  // ── 花蕊：细长金黄花丝色彩 ──
  const filamentGoldLight = lerpColor('#fef08a', '#dcc698', dryFactor);
  const filamentGoldMid = lerpColor('#facc15', '#b8944d', dryFactor);
  const filamentGoldDark = lerpColor('#ca8a04', '#7a5a29', dryFactor);
  const stamenCoreAmber = lerpColor('#854d0e', '#452f14', dryFactor);

  // ── 枝茎与小叶色彩（深翠橄榄绿，细长微卷） ──
  const stemDark = lerpColor('#1b4317', '#343825', dryFactor);
  const stemMid = lerpColor('#2e6c27', '#4d5336', dryFactor);
  const stemLight = lerpColor('#5cb843', '#798555', dryFactor);
  const leafDark = lerpColor('#143512', '#2c3020', dryFactor);
  const leafMid = lerpColor('#245a1f', '#444a30', dryFactor);
  const leafLight = lerpColor('#4ade80', '#7ca668', dryFactor);

  /**
   * 细长花丝簇聚花蕊 (Filamentous Daisy Stamen)
   */
  const renderFilamentStamen = (rx: number, ry: number) => {
    const threadRings = [
      { r: 0.35, count: 7, strokeW: 0.8, color: filamentGoldLight },
      { r: 0.65, count: 11, strokeW: 0.75, color: filamentGoldMid },
      { r: 0.90, count: 14, strokeW: 0.7, color: filamentGoldDark },
    ];

    return (
      <g>
        <ellipse cx="0" cy="0" rx={rx} ry={ry} fill="url(#daisyStamenCoreGrad)" />
        {threadRings.map((ring, ringIdx) => {
          const step = (Math.PI * 2) / ring.count;
          return Array.from({ length: ring.count }).map((_, i) => {
            const angle = i * step + ringIdx * 0.3;
            const px = Math.cos(angle) * (rx * ring.r);
            const py = Math.sin(angle) * (ry * ring.r);
            const curveX = px + Math.cos(angle + 1.2) * (rx * 0.28);
            const curveY = py + Math.sin(angle + 1.2) * (ry * 0.28);

            return (
              <path
                key={`${ringIdx}_${i}`}
                d={`M ${px * 0.3} ${py * 0.3} Q ${curveX} ${curveY} ${px} ${py}`}
                stroke={ring.color}
                strokeWidth={ring.strokeW}
                fill="none"
                strokeLinecap="round"
              />
            );
          });
        })}
        <circle cx={-rx * 0.2} cy={-ry * 0.25} r={rx * 0.22} fill={filamentGoldLight} opacity="0.85" />
        <ellipse cx="0" cy="0" rx={rx * 0.4} ry={ry * 0.35} fill="none" stroke={filamentGoldLight} strokeWidth="0.7" strokeDasharray="1.2, 1.0" />
      </g>
    );
  };

  /**
   * 单枚纯白狭长舌状花瓣
   */
  const renderSingleRayPetal = (angleDeg: number, len: number, w: number, isBackSide: boolean = false) => {
    return (
      <g transform={`rotate(${angleDeg})`}>
        <path
          d={`M -${w * 0.35} 0 C -${w * 0.55} -${len * 0.4}, -${w * 0.45} -${len * 0.88}, 0 -${len} C ${w * 0.45} -${len * 0.88}, ${w * 0.55} -${len * 0.4}, ${w * 0.35} 0 Z`}
          fill={isBackSide ? 'url(#daisyBackPetalGrad)' : 'url(#daisyRayPetalGrad)'}
          stroke={petalShadow}
          strokeWidth="0.3"
        />
        <path
          d={`M 0 -${len * 0.15} L 0 -${len * 0.85}`}
          stroke={isBackSide ? petalShadow : '#ffffff'}
          strokeWidth="0.4"
          strokeLinecap="round"
          opacity={isBackSide ? 0.6 : 0.9}
        />
      </g>
    );
  };

  /**
   * 1. 饱满正盛开主花【正视显露金黄绒毛花蕊】
   */
  const renderFrontBloom = (outerR: number = 14.5, stamenR: number = 4.8) => {
    const count = 18;
    const step = 360 / count;
    return (
      <g>
        {Array.from({ length: count }).map((_, i) => (
          <g key={`b_${i}`} opacity="0.92">
            {renderSingleRayPetal(i * step + step * 0.5, outerR * 0.92, outerR * 0.25)}
          </g>
        ))}
        {Array.from({ length: count }).map((_, i) => (
          <g key={`t_${i}`}>
            {renderSingleRayPetal(i * step, outerR, outerR * 0.27)}
          </g>
        ))}
        {renderFilamentStamen(stamenR, stamenR * 0.92)}
      </g>
    );
  };

  /**
   * 2. 三分之四侧仰花【倾角透视显露侧向花蕊】
   */
  const renderThreeQuarterBloom = (outerR: number = 13, rot: number = 0, isFacingLeft: boolean = false) => {
    const count = 16;
    const step = 360 / count;
    const sx = isFacingLeft ? -1 : 1;

    return (
      <g transform={`rotate(${rot}) scale(${sx}, 1)`}>
        <g transform="scale(0.92, 0.62)">
          {Array.from({ length: count }).map((_, i) => {
            const ang = i * step;
            const isBack = ang > 110 && ang < 250;
            const pLen = isBack ? outerR * 0.72 : outerR * 1.0;
            return (
              <g key={i}>
                {renderSingleRayPetal(ang, pLen, outerR * 0.28)}
              </g>
            );
          })}
        </g>
        <g transform="translate(0.8, -0.6)">
          {renderFilamentStamen(outerR * 0.32, outerR * 0.20)}
        </g>
      </g>
    );
  };

  /**
   * 3. 经典正侧面雏菊【纯粹侧颜：纤巧花托，白瓣侧展，完全看不到花蕊圆盘！】
   */
  const renderProfileBloom = (size: number = 12.5, rot: number = 0, isFacingLeft: boolean = false) => {
    const sx = isFacingLeft ? -1 : 1;
    return (
      <g transform={`rotate(${rot}) scale(${sx}, 1)`}>
        {/* 小巧雅致扁平花托（微型半球，绝无大绿瓜！） */}
        <path
          d="M -3.2 1.5 C -3.8 -0.5, -2.5 -2.2, 0 -2.6 C 2.5 -2.2, 3.8 -0.5, 3.2 1.5 C 2.0 2.4, -2.0 2.4, -3.2 1.5 Z"
          fill="url(#daisyCalyxGrad)"
          stroke={stemDark}
          strokeWidth="0.32"
        />
        {/* 细小紧贴的青绿萼片 */}
        <polygon points="-2.4,0.5 -3.2,-1.2 -1.6,-0.6" fill={stemLight} />
        <polygon points="-0.8,-1.2 0,-2.8 0.8,-1.2" fill={stemLight} />
        <polygon points="1.6,-0.6 3.2,-1.2 2.4,0.5" fill={stemLight} />

        {/* 侧向展开的洁白舌状花瓣群（自托口轻灵散开，完全掩蔽内部） */}
        <g transform="translate(0, -2.2)">
          {/* 上挑长瓣 */}
          <path d="M 0 0 C -1.2 -4.5, -3.0 -8.5, -3.6 -11.5 C -1.8 -12.2, 0.2 -7.5, 0 0 Z" fill="url(#daisyRayPetalGrad)" stroke={petalShadow} strokeWidth="0.28" />
          <path d="M 0 0 C -0.2 -5.5, 0.2 -9.8, 0.4 -13.0 C 2.0 -12.5, 1.8 -7.5, 0 0 Z" fill="url(#daisyRayPetalGrad)" stroke={petalShadow} strokeWidth="0.28" />
          <path d="M 0 0 C 1.8 -5.0, 3.8 -8.8, 5.5 -11.8 C 6.5 -10.5, 3.0 -6.5, 0 0 Z" fill="url(#daisyRayPetalGrad)" stroke={petalShadow} strokeWidth="0.28" />
          {/* 侧展长瓣 */}
          <path d="M 0 0 C 2.8 -3.5, 6.8 -6.2, 9.6 -8.0 C 9.8 -6.5, 5.0 -3.5, 0 0 Z" fill="url(#daisyRayPetalGrad)" stroke={petalShadow} strokeWidth="0.28" />
          <path d="M 0 0 C 3.2 -1.5, 7.5 -2.2, 10.8 -3.0 C 10.8 -1.5, 5.8 -0.5, 0 0 Z" fill="url(#daisyRayPetalGrad)" stroke={petalShadow} strokeWidth="0.28" />
          <path d="M 0 0 C 3.0 0.5, 7.0 2.2, 9.8 4.0 C 8.8 5.2, 4.8 2.8, 0 0 Z" fill="url(#daisyRayPetalGrad)" stroke={petalShadow} strokeWidth="0.28" />
          {/* 下垂短瓣 */}
          <path d="M 0 0 C 2.2 2.5, 4.5 5.5, 6.2 7.5 C 5.0 8.5, 2.2 4.5, 0 0 Z" fill="url(#daisyRayPetalGrad)" stroke={petalShadow} strokeWidth="0.28" />
          <path d="M 0 0 C 0.8 2.8, 1.5 5.8, 2.0 7.8 C 1.0 8.2, 0.2 4.8, 0 0 Z" fill="url(#daisyRayPetalGrad)" stroke={petalShadow} strokeWidth="0.28" />

          {/* 纯侧面：花心由内侧花瓣基部聚拢遮掩，完全无黄色大球！仅露花托深处自然阴影 */}
          <ellipse cx="0.4" cy="-0.2" rx="1.0" ry="0.6" fill={leafDark} opacity="0.65" />
        </g>
      </g>
    );
  };

  /**
   * 4. 背侧回眸雏菊【背视角度：显露背部青绿多层总苞与花瓣反面，完全看不到花蕊！】
   */
  const renderBackBloom = (outerR: number = 12, rot: number = 0) => {
    return (
      <g transform={`rotate(${rot})`}>
        {/* 外围纯白花瓣反面辐射展开 */}
        {Array.from({ length: 15 }).map((_, i) => (
          <g key={i}>
            {renderSingleRayPetal((i * 360) / 15, outerR * 0.95, outerR * 0.26, true)}
          </g>
        ))}
        {/* 背部青绿总苞盘底座 */}
        <circle cx="0" cy="0" r={outerR * 0.42} fill="url(#daisyCalyxGrad)" stroke={stemDark} strokeWidth="0.32" />
        {/* 辐射状青翠覆瓦状苞片 (Phyllaries) */}
        {Array.from({ length: 10 }).map((_, i) => (
          <polygon
            key={`calyx_${i}`}
            points="0,0 -1.1,-5.0 1.1,-5.0"
            fill={stemLight}
            transform={`rotate(${(i * 360) / 10})`}
          />
        ))}
        {/* 紧接花茎着生点 */}
        <circle cx="0" cy="0" r={1.5} fill={stemDark} />
        <circle cx="-0.3" cy="-0.3" r={0.5} fill={stemLight} opacity="0.8" />
      </g>
    );
  };

  /**
   * 5. 含苞待放花骨朵【青绿细萼紧裹纯白尖，完全看不到花蕊！】
   */
  const renderFlowerBud = (rot: number = 0, scale: number = 1.0) => {
    return (
      <g transform={`rotate(${rot}) scale(${scale})`}>
        {/* 紧闭白花瓣尖束 */}
        <path
          d="M -1.6 -3.5 C -1.8 -7.5, 0 -10.5, 0 -10.5 C 0 -10.5, 1.8 -7.5, 1.6 -3.5 Z"
          fill="url(#daisyRayPetalGrad)"
          stroke={petalShadow}
          strokeWidth="0.28"
        />
        <path d="M 0 -3.5 L 0 -10.0" stroke="#ffffff" strokeWidth="0.35" opacity="0.9" />

        {/* 青绿萼杯底托 */}
        <path
          d="M -2.5 1.5 C -3.5 -1.0, -2.5 -4.5, 0 -5.5 C 2.5 -4.5, 3.5 -1.0, 2.5 1.5 C 1.5 2.5, -1.5 2.5, -2.5 1.5 Z"
          fill="url(#daisyCalyxGrad)"
          stroke={stemDark}
          strokeWidth="0.32"
        />
        {/* 尖细苞片紧扣 */}
        <polygon points="-2.0,0 -2.4,-3.8 -1.0,-1.8" fill={stemLight} />
        <polygon points="-0.8,-1.8 0,-5.2 0.8,-1.8" fill={stemLight} />
        <polygon points="1.0,-1.8 2.4,-3.8 2.0,0" fill={stemLight} />
      </g>
    );
  };

  /**
   * 小而细长、微卷小叶 (Slender Curled Daisy Leaves)
   */
  const renderSlenderLeaf = (x: number, y: number, length: number, rot: number, curlSign: number = 1) => {
    const w = length * 0.16;
    return (
      <g transform={`translate(${x}, ${y}) rotate(${rot})`}>
        <path
          d={`M 0 0 C ${w * 0.8} -${length * 0.3}, ${w * 1.2 * curlSign} -${length * 0.7}, ${w * 2.0 * curlSign} -${length} C ${w * 0.5 * curlSign} -${length * 0.75}, -${w * 0.2} -${length * 0.35}, 0 0 Z`}
          fill="url(#daisyLeafGrad)"
          stroke={leafDark}
          strokeWidth="0.3"
        />
        <path
          d={`M 0 0 Q ${w * 0.6 * curlSign} -${length * 0.55} ${w * 1.6 * curlSign} -${length * 0.95}`}
          stroke={leafLight}
          strokeWidth="0.35"
          fill="none"
          opacity="0.85"
        />
      </g>
    );
  };

  return (
    <g id="daisiesFlora" style={agingStyle}>
      <defs>
        {/* 1. 正面舌状白瓣柔和立体渐变 */}
        <linearGradient id="daisyRayPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={petalShadow} />
          <stop offset="25%" stopColor={petalMidWhite} />
          <stop offset="85%" stopColor={petalPureWhite} />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>

        {/* 2. 反面舌状白瓣柔和渐变 */}
        <linearGradient id="daisyBackPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={petalShadow} />
          <stop offset="40%" stopColor={petalBackTint} />
          <stop offset="90%" stopColor={petalMidWhite} />
          <stop offset="100%" stopColor={petalPureWhite} />
        </linearGradient>

        {/* 3. 花蕊底核琥珀金渐变 */}
        <radialGradient id="daisyStamenCoreGrad" cx="40%" cy="40%" r="65%">
          <stop offset="0%" stopColor={filamentGoldLight} />
          <stop offset="60%" stopColor={filamentGoldMid} />
          <stop offset="90%" stopColor={filamentGoldDark} />
          <stop offset="100%" stopColor={stamenCoreAmber} />
        </radialGradient>

        {/* 4. 青绿花茎立体圆柱渐变 */}
        <linearGradient id="daisyRealStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stemDark} />
          <stop offset="45%" stopColor={stemLight} />
          <stop offset="100%" stopColor={stemDark} />
        </linearGradient>

        {/* 5. 细长微卷绿叶渐变 */}
        <linearGradient id="daisyLeafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={leafDark} />
          <stop offset="60%" stopColor={leafMid} />
          <stop offset="100%" stopColor={leafLight} />
        </linearGradient>

        {/* 6. 花托总苞立体渐变 */}
        <linearGradient id="daisyCalyxGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={stemDark} />
          <stop offset="70%" stopColor={stemMid} />
          <stop offset="100%" stopColor={stemLight} />
        </linearGradient>
      </defs>

      {/* ── 架构 1：高度整体压缩、聚拢紧致的分枝骨架（紧凑聚拢于瓶口上方，不稀疏张扬） ── */}
      <g id="daisyBranchedStems">
        {/* A. 中央主茎：自瓶口 (75,125) 挺拔聚拢直上至高位 (74,40) */}
        <path
          d="M 75 125 C 75 108, 74 88, 74 65 C 74 54, 74 46, 74 40"
          stroke="url(#daisyRealStemGrad)"
          strokeWidth="2.1"
          fill="none"
          strokeLinecap="round"
        />
        {/* 主茎向右上分枝小径：聚拢斜出至 (84,48) */}
        <path
          d="M 74 58 C 77 53, 81 50, 84 48"
          stroke="url(#daisyRealStemGrad)"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
        {/* 主茎向左上分枝小径：聚拢斜出至 (64,50) */}
        <path
          d="M 74 62 C 70 57, 67 53, 64 50"
          stroke="url(#daisyRealStemGrad)"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />

        {/* B. 右侧分支主茎：聚拢自然，向上聚拢至 (86,70) 与 (82,86) */}
        <path
          d="M 76 125 C 77 112, 79 100, 82 86"
          stroke="url(#daisyRealStemGrad)"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
        {/* 右分支小径：自 (80,98) 向上斜挑至 (86,70) */}
        <path
          d="M 80 98 C 82 88, 84 78, 86 70"
          stroke="url(#daisyRealStemGrad)"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />

        {/* C. 左侧分支主茎：聚拢自然，向上聚拢至 (62,68) 与 (66,88) */}
        <path
          d="M 74 125 C 73 112, 70 102, 66 88"
          stroke="url(#daisyRealStemGrad)"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
        {/* 左分支小径：自 (71,102) 向上斜挑至 (62,68) */}
        <path
          d="M 71 102 C 68 90, 65 79, 62 68"
          stroke="url(#daisyRealStemGrad)"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* ── 架构 2：小而细长、微卷小叶片群（聚拢环绕枝干，层叠充实中下层） ── */}
      <g id="daisySlenderLeaves">
        {/* 瓶口基生微卷小叶（紧凑护瓶） */}
        {renderSlenderLeaf(73, 120, 16, -30, -1)}
        {renderSlenderLeaf(77, 118, 17, 28, 1)}
        {renderSlenderLeaf(74, 112, 15, -16, 1)}
        {renderSlenderLeaf(76, 108, 15, 22, -1)}

        {/* 中下层茎干分叉处微卷小叶 */}
        {renderSlenderLeaf(70, 98, 16, -38, -1)}
        {renderSlenderLeaf(80, 96, 16, 35, 1)}
        {renderSlenderLeaf(66, 88, 14, -25, 1)}
        {renderSlenderLeaf(83, 85, 14, 28, -1)}

        {/* 中高层掩映小叶 */}
        {renderSlenderLeaf(72, 74, 13, -20, -1)}
        {renderSlenderLeaf(76, 68, 13, 24, 1)}
        {renderSlenderLeaf(64, 62, 12, -35, -1)}
        {renderSlenderLeaf(85, 60, 12, 32, 1)}

        {/* 顶梢娇嫩小叶 */}
        {renderSlenderLeaf(72, 48, 11, -15, -1)}
        {renderSlenderLeaf(75, 45, 11, 18, 1)}
      </g>

      {/* ── 架构 3：多花聚集、高度压缩、不可统一朝向（花骨朵/背面/侧面/正面生动呼应） ── */}
      <g id="daisyMultiBlooms">
        {/* 1. 【极顶高位·娇嫩花骨朵】(x:74, y:38)：高度压缩顶标，青绿萼裹白尖，绝无花蕊！ */}
        <g transform="translate(74, 38)">
          {renderFlowerBud(-5, 0.9)}
        </g>

        {/* 2. 【高位右侧·向右侧展雏菊】(x:84, y:48)：小巧青绿花托，白瓣向右上方轻灵侧展，侧面视角无花蕊！ */}
        <g transform="translate(84, 48)">
          {renderProfileBloom(12, 22, false)}
        </g>

        {/* 3. 【高位左侧·向左背侧回眸】(x:64, y:50)：宋画禅意，露出背部青绿星芒总苞与花瓣反面，绝无花蕊！ */}
        <g transform="translate(64, 50)">
          {renderBackBloom(11.5, -20)}
        </g>

        {/* 4. 【中央主花·饱满盛放正视】(x:74, y:64)：全束视觉中心（r=14，密集金黄丝绒花蕊，层叠双重白瓣） */}
        <g transform="translate(74, 64)">
          {renderFrontBloom(14.0, 4.6)}
        </g>

        {/* 5. 【中层右侧·背侧微仰雏菊】(x:86, y:70)：优雅背视角度，青绿总苞星芒辐射，洁白花瓣反面舒展，绝无黄色大球！ */}
        <g transform="translate(86, 70)">
          {renderBackBloom(11.0, 30)}
        </g>

        {/* 6. 【中层左侧·三分之四微颔】(x:62, y:68)：向左微侧俯视，椭圆透视金蕊与层叠白瓣 */}
        <g transform="translate(62, 68)">
          {renderThreeQuarterBloom(12.5, -24, true)}
        </g>

        {/* 7. 【中层后方·掩映侧背小花】(x:72, y:76)：掩映于主花与茎干后方，增加花丛深远景深 */}
        <g transform="translate(72, 76)">
          {renderBackBloom(10.0, -10)}
        </g>

        {/* 8. 【下层右侧·向右正侧小雏菊】(x:82, y:86)：纤细托杯贴合，纯白花瓣侧发展开，无大绿囊大黄球！ */}
        <g transform="translate(82, 86)">
          {renderProfileBloom(11.5, 36, false)}
        </g>

        {/* 9. 【下层左侧·向左下三分之四初放】(x:66, y:88)：向左微俯，贴近瓶口丰满层次 */}
        <g transform="translate(66, 88)">
          {renderThreeQuarterBloom(12.0, -32, true)}
        </g>

        {/* 10. 【瓶口中央·鲜嫩紧致小花蕾】(x:75, y:98)：自瓶口抽出的小青苞蕾，含蓄初露白尖，绝无花蕊！ */}
        <g transform="translate(75, 98)">
          {renderFlowerBud(10, 0.85)}
        </g>
      </g>
    </g>
  );
};

