/**
 * @file DaisiesFlower.tsx
 * @description 【清纯小雏菊】
 * 核心特征：
 * 1. 高度挺秀适中，与案台各名花及白玉瓶身比例谐调（花冠高位展于 y:24 左右）；
 * 2. 多花高低有致、枝茎疏密相间，主小径分枝自然舒展；
 * 3. 角度丰富生动，绝无死板“大绿圆盘正对人”：
 *    - 【饱满盛放正视】：居中盛开，雪白层叠辐射舌状瓣，中央无数细密金黄花丝簇聚成绒毛花蕊；
 *    - 【生动侧向与半侧面】：优雅倾角透视，白瓣侧展，金蕊若隐若现微敛，绝无绿盘糊脸；
 *    - 【含苞娇嫩小花骨朵】：青绿细萼紧裹纯白尖束，挺立枝梢；
 * 4. 叶片小而细长，微卷微翘，层叠掩映于枝干瓶口之间。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getFlowerAgingFilter } from '../utils/lifecycle';

export const DAISY_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.55, fallSpan: 0.08, startX: 96, startY: 42, landX: 104, landY: 194, rx: 5.0, ry: 2.2, landRot: 32, swayAmp: 12, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.42, fallSpan: 0.07, startX: 52, startY: 46, landX: 46, landY: 193, rx: 4.8, ry: 2.1, landRot: -28, swayAmp: 14, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.30, fallSpan: 0.06, startX: 98, startY: 70, landX: 106, landY: 195, rx: 5.2, ry: 2.3, landRot: 22, swayAmp: 10, swayFreq: 3.0 },
  { id: 4, detachHealth: 0.18, fallSpan: 0.06, startX: 48, startY: 74, landX: 42, landY: 196, rx: 4.6, ry: 2.0, landRot: -35, swayAmp: 15, swayFreq: 3.8 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.05, startX: 75, startY: 26, landX: 82, landY: 195, rx: 5.0, ry: 2.2, landRot: 15, swayAmp: 11, swayFreq: 3.4 },
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
  const renderSingleRayPetal = (angleDeg: number, len: number, w: number) => {
    return (
      <g transform={`rotate(${angleDeg})`}>
        <path
          d={`M -${w * 0.35} 0 C -${w * 0.55} -${len * 0.4}, -${w * 0.45} -${len * 0.88}, 0 -${len} C ${w * 0.45} -${len * 0.88}, ${w * 0.55} -${len * 0.4}, ${w * 0.35} 0 Z`}
          fill="url(#daisyRayPetalGrad)"
          stroke={petalShadow}
          strokeWidth="0.32"
        />
        <path
          d={`M 0 -${len * 0.15} L 0 -${len * 0.85}`}
          stroke="#ffffff"
          strokeWidth="0.45"
          strokeLinecap="round"
          opacity="0.9"
        />
      </g>
    );
  };

  /**
   * 1. 饱满盛放正视雏菊【正视盛放，细密金丝绒毛花蕊】
   */
  const renderFrontBloom = (outerR: number = 15.5, stamenR: number = 5.0) => {
    const count = 18;
    const step = 360 / count;
    return (
      <g>
        {Array.from({ length: count }).map((_, i) => (
          <g key={`b_${i}`} opacity="0.92">
            {renderSingleRayPetal(i * step + step * 0.5, outerR * 0.92, outerR * 0.26)}
          </g>
        ))}
        {Array.from({ length: count }).map((_, i) => (
          <g key={`t_${i}`}>
            {renderSingleRayPetal(i * step, outerR, outerR * 0.28)}
          </g>
        ))}
        {renderFilamentStamen(stamenR, stamenR * 0.92)}
      </g>
    );
  };

  /**
   * 2. 优雅侧向与斜俯雏菊【透视侧展，绝无绿盘糊脸】
   */
  const renderSideBloom = (
    outerR: number = 14,
    rot: number = 0,
    isFacingLeft: boolean = false,
    tilt: number = 0.58
  ) => {
    const count = 16;
    const step = 360 / count;
    const sx = isFacingLeft ? -1 : 1;

    return (
      <g transform={`rotate(${rot}) scale(${sx}, 1)`}>
        {/* 小巧杯状青绿花托（仅侧视露出优雅小托萼，绝无臃肿大瓜） */}
        <path
          d="M -3.2 2 C -3.8 0, -2.5 -2.0, 0 -2.6 C 2.5 -2.0, 3.8 0, 3.2 2 Z"
          fill="url(#daisyCalyxGrad)"
          stroke={stemDark}
          strokeWidth="0.32"
        />
        {/* 倾角透视下的花瓣群：后瓣缩短，前瓣拉长 */}
        <g transform={`scale(1, ${tilt})`}>
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
        {/* 随透视压扁的金黄绒毛花丝花蕊 */}
        <g transform={`translate(0.6, ${-outerR * 0.08 * tilt})`}>
          {renderFilamentStamen(outerR * 0.32, outerR * 0.32 * tilt)}
        </g>
      </g>
    );
  };

  /**
   * 3. 鲜嫩小花骨朵【含苞待放：青绿细萼裹纯白尖，挺立枝梢】
   */
  const renderFlowerBud = (rot: number = 0, scale: number = 1.0) => {
    return (
      <g transform={`rotate(${rot}) scale(${scale})`}>
        {/* 探出紧闭白花瓣尖束 */}
        <path
          d="M -1.8 -3.5 C -2.0 -7.5, 0 -10.5, 0 -10.5 C 0 -10.5, 2.0 -7.5, 1.8 -3.5 Z"
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
        {/* 1. 舌状白瓣柔和立体渐变 */}
        <linearGradient id="daisyRayPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={petalShadow} />
          <stop offset="25%" stopColor={petalMidWhite} />
          <stop offset="85%" stopColor={petalPureWhite} />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>

        {/* 2. 花蕊底核琥珀金渐变 */}
        <radialGradient id="daisyStamenCoreGrad" cx="40%" cy="40%" r="65%">
          <stop offset="0%" stopColor={filamentGoldLight} />
          <stop offset="60%" stopColor={filamentGoldMid} />
          <stop offset="90%" stopColor={filamentGoldDark} />
          <stop offset="100%" stopColor={stamenCoreAmber} />
        </radialGradient>

        {/* 3. 青绿花茎立体圆柱渐变 */}
        <linearGradient id="daisyRealStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stemDark} />
          <stop offset="45%" stopColor={stemLight} />
          <stop offset="100%" stopColor={stemDark} />
        </linearGradient>

        {/* 4. 细长微卷绿叶渐变 */}
        <linearGradient id="daisyLeafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={leafDark} />
          <stop offset="60%" stopColor={leafMid} />
          <stop offset="100%" stopColor={leafLight} />
        </linearGradient>

        {/* 5. 花托总苞立体渐变 */}
        <linearGradient id="daisyCalyxGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={stemDark} />
          <stop offset="70%" stopColor={stemMid} />
          <stop offset="100%" stopColor={stemLight} />
        </linearGradient>
      </defs>

      {/* ── 架构 1：高度舒展适中、主小径自然分枝的花茎骨架（高位至 y:24） ── */}
      <g id="daisyBranchedStems">
        {/* A. 中央主茎：自瓶口 (75,125) 挺立直上至顶花 (75,26) */}
        <path
          d="M 75 125 C 75 102, 74 72, 75 48 C 75 38, 75 32, 75 26"
          stroke="url(#daisyRealStemGrad)"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />

        {/* B. 右上高位小径：自 (75,70) 优雅斜逸至 (96,42) */}
        <path
          d="M 75 70 C 82 58, 89 50, 96 42"
          stroke="url(#daisyRealStemGrad)"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />

        {/* C. 左上高位小径：自 (75,75) 斜逸至 (52,44) */}
        <path
          d="M 75 75 C 68 64, 60 54, 52 44"
          stroke="url(#daisyRealStemGrad)"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />

        {/* D. 左梢花蕾分枝：自 (62,56) 向上抽出至 (62,32) */}
        <path
          d="M 62 56 C 62 46, 62 38, 62 32"
          stroke="url(#daisyRealStemGrad)"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
        />

        {/* E. 右中侧分枝：自 (75,98) 向右下舒展至 (98,70) */}
        <path
          d="M 75 98 C 84 88, 92 80, 98 70"
          stroke="url(#daisyRealStemGrad)"
          strokeWidth="1.9"
          fill="none"
          strokeLinecap="round"
        />

        {/* F. 左中侧分枝：自 (75,102) 向左下舒展至 (46,74) */}
        <path
          d="M 75 102 C 64 92, 54 84, 46 74"
          stroke="url(#daisyRealStemGrad)"
          strokeWidth="1.9"
          fill="none"
          strokeLinecap="round"
        />

        {/* G. 右下花蕾小径：自 (75,112) 斜挑至 (82,90) */}
        <path
          d="M 75 112 C 78 104, 80 97, 82 90"
          stroke="url(#daisyRealStemGrad)"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* ── 架构 2：小而细长、微卷小叶片群（层叠掩映于枝干与瓶口） ── */}
      <g id="daisySlenderLeaves">
        {/* 瓶口基生微卷小叶 */}
        {renderSlenderLeaf(73, 120, 20, -32, -1)}
        {renderSlenderLeaf(77, 118, 20, 30, 1)}
        {renderSlenderLeaf(74, 112, 18, -18, 1)}
        {renderSlenderLeaf(76, 108, 18, 22, -1)}

        {/* 中下部主茎分叉微卷小叶 */}
        {renderSlenderLeaf(69, 98, 18, -40, -1)}
        {renderSlenderLeaf(81, 95, 18, 38, 1)}
        {renderSlenderLeaf(64, 84, 16, -26, 1)}
        {renderSlenderLeaf(85, 82, 16, 28, -1)}

        {/* 中上部枝干掩映小叶 */}
        {renderSlenderLeaf(72, 68, 15, -20, -1)}
        {renderSlenderLeaf(77, 62, 15, 24, 1)}
        {renderSlenderLeaf(58, 56, 14, -36, -1)}
        {renderSlenderLeaf(88, 54, 14, 34, 1)}

        {/* 顶梢娇嫩小叶 */}
        {renderSlenderLeaf(72, 40, 13, -15, -1)}
        {renderSlenderLeaf(76, 36, 13, 18, 1)}
        {renderSlenderLeaf(64, 40, 11, -22, -1)}
      </g>

      {/* ── 架构 3：多花高低有致、侧向与正视生动呼应（绝无死板“大绿圆盘背向正对人”） ── */}
      <g id="daisyMultiBlooms">
        {/* 1. 【极顶挺秀·饱满盛放正视】(x:75, y:26)：高度挺秀适中，雪白层叠辐射瓣，金黄绒毛花蕊 */}
        <g transform="translate(75, 26)">
          {renderFrontBloom(16.0, 5.2)}
        </g>

        {/* 2. 【高位右上·侧向舒展】(x:96, y:42)：优雅侧仰，白瓣向右上方轻灵展开，金蕊微倾透视 */}
        <g transform="translate(96, 42)">
          {renderSideBloom(14.5, 22, false, 0.55)}
        </g>

        {/* 3. 【高位左上·侧向舒展】(x:52, y:44)：优雅侧仰，白瓣向左上方轻灵展开，金蕊微倾透视 */}
        <g transform="translate(52, 44)">
          {renderSideBloom(14.5, -20, true, 0.55)}
        </g>

        {/* 4. 【左梢高位·娇嫩小花骨朵】(x:62, y:32)：挺立于高梢分枝，青绿细萼紧裹纯白尖 */}
        <g transform="translate(62, 32)">
          {renderFlowerBud(-12, 0.9)}
        </g>

        {/* 5. 【中央主花·饱满盛放正视】(x:74, y:56)：全束视觉中心（r=16.5，密集金黄花丝绒毛花蕊） */}
        <g transform="translate(74, 56)">
          {renderFrontBloom(16.5, 5.4)}
        </g>

        {/* 6. 【中层右侧·侧向微俯】(x:98, y:70)：向右微俯，透视白瓣层次生动，金蕊若隐若现 */}
        <g transform="translate(98, 70)">
          {renderSideBloom(14.0, 32, false, 0.52)}
        </g>

        {/* 7. 【中层左侧·侧向微俯】(x:46, y:74)：向左微俯，白瓣侧发展开，轻灵生动 */}
        <g transform="translate(46, 74)">
          {renderSideBloom(14.0, -30, true, 0.52)}
        </g>

        {/* 8. 【下层右侧·侧向初放雏菊】(x:82, y:90)：贴近瓶口高低错落，纯白小花微侧舒展 */}
        <g transform="translate(82, 90)">
          {renderSideBloom(12.5, 26, false, 0.62)}
        </g>

        {/* 9. 【瓶口左侧·鲜嫩小花骨朵】(x:68, y:98)：近瓶口抽出的小青蕾，含蓄初露白尖 */}
        <g transform="translate(68, 98)">
          {renderFlowerBud(12, 0.85)}
        </g>
      </g>
    </g>
  );
};


