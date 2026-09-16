/**
 * @file DaisiesFlower.tsx
 * @description 【写实清纯小雏菊】
 * 核心特征：
 * 1. 主径生长小径（分支架构）：2~3 根主茎自瓶口探出，多层级分枝出侧茎小径，聚集挺立；
 * 2. 多花密集、高低有致（9~10 朵），从瓶口一路盛开错落至高梢；
 * 3. 绝不统一朝向：有仰头、俯首、半侧面、正侧颜（露出圆锥青绿花萼）与背侧回眸，极具三维立体景深；
 * 4. 花蕊由无数细长卷曲的金黄花丝簇聚而成（蓬松立体丝绒质感，杜绝平整纽扣）；
 * 5. 叶片多而细长，微卷微翘，密集附着在主小茎节点之间。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle, getFlowerAgingFilter } from '../utils/lifecycle';

export const DAISY_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.55, fallSpan: 0.08, startX: 98, startY: 48, landX: 106, landY: 194, rx: 4.8, ry: 2.1, landRot: 32, swayAmp: 12, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.42, fallSpan: 0.07, startX: 50, startY: 46, landX: 44, landY: 193, rx: 4.6, ry: 2.0, landRot: -28, swayAmp: 14, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.30, fallSpan: 0.06, startX: 86, startY: 72, landX: 92, landY: 195, rx: 5.0, ry: 2.2, landRot: 22, swayAmp: 10, swayFreq: 3.0 },
  { id: 4, detachHealth: 0.18, fallSpan: 0.06, startX: 60, startY: 82, landX: 54, landY: 196, rx: 4.5, ry: 1.9, landRot: -35, swayAmp: 15, swayFreq: 3.8 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.05, startX: 75, startY: 38, landX: 78, landY: 195, rx: 4.7, ry: 2.0, landRot: 15, swayAmp: 11, swayFreq: 3.4 },
];

export const DaisiesFlower: React.FC<FlowerComponentProps> = ({
  health,
  dryFactor,
  isFaded,
  spreadFactor = 1.0,
}) => {
  const agingStyle = getFlowerAgingFilter(health, isFaded);

  // ── 纯白花瓣衰变色彩 ──
  const petalPureWhite = lerpColor('#ffffff', '#fbf8f2', dryFactor);
  const petalMidWhite = lerpColor('#f8fafc', '#eedec7', dryFactor);
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

  const fl1 = getBlossomDropStyle(health, 0.55);
  const fl2 = getBlossomDropStyle(health, 0.45);
  const fl3 = getBlossomDropStyle(health, 0.35);
  const fl4 = getBlossomDropStyle(health, 0.25);
  const fl5 = getBlossomDropStyle(health, 0.15);

  /**
   * 细长花丝簇聚花蕊 (Filamentous Daisy Stamen)
   * 模拟无数金黄丝绒卷曲聚拢成凸起绒球的真实质感
   */
  const renderFilamentStamen = (rx: number, ry: number) => {
    // 生成圆弧密集卷曲花丝群
    const threadRings = [
      { r: 0.35, count: 8, strokeW: 0.9, color: filamentGoldLight },
      { r: 0.65, count: 12, strokeW: 0.8, color: filamentGoldMid },
      { r: 0.92, count: 16, strokeW: 0.75, color: filamentGoldDark },
    ];

    return (
      <g>
        {/* 底层高密琥珀金绒核 */}
        <ellipse cx="0" cy="0" rx={rx} ry={ry} fill="url(#daisyStamenCoreGrad)" />

        {/* 第一层：放射状密集花丝底托 */}
        {threadRings.map((ring, ringIdx) => {
          const step = (Math.PI * 2) / ring.count;
          return Array.from({ length: ring.count }).map((_, i) => {
            const angle = i * step + ringIdx * 0.3;
            const px = Math.cos(angle) * (rx * ring.r);
            const py = Math.sin(angle) * (ry * ring.r);
            const curveX = px + Math.cos(angle + 1.2) * (rx * 0.3);
            const curveY = py + Math.sin(angle + 1.2) * (ry * 0.3);

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

        {/* 顶层：纤细卷翘的小花丝头（花药与丝尖高光） */}
        <circle cx={-rx * 0.2} cy={-ry * 0.25} r={rx * 0.22} fill={filamentGoldLight} opacity="0.8" />
        <ellipse cx="0" cy="0" rx={rx * 0.4} ry={ry * 0.35} fill="none" stroke={filamentGoldLight} strokeWidth="0.8" strokeDasharray="1.2, 1.0" />
      </g>
    );
  };

  /**
   * 单枚纯白狭长舌状花瓣
   */
  const renderSingleRayPetal = (
    angleDeg: number,
    len: number,
    w: number,
    skewScaleX: number = 1.0,
    skewScaleY: number = 1.0
  ) => {
    return (
      <g transform={`rotate(${angleDeg}) scale(${skewScaleX}, ${skewScaleY})`}>
        {/* 花瓣轮廓 */}
        <path
          d={`M -${w * 0.35} 0 C -${w * 0.55} -${len * 0.4}, -${w * 0.45} -${len * 0.88}, 0 -${len} C ${w * 0.45} -${len * 0.88}, ${w * 0.55} -${len * 0.4}, ${w * 0.35} 0 Z`}
          fill="url(#daisyRayPetalGrad)"
          stroke={petalShadow}
          strokeWidth="0.32"
        />
        {/* 花瓣中央微凹背脊反光细线 */}
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
   * 1. 饱满正视微仰【盛开雏菊】（主视焦点）
   */
  const renderFrontBloom = (outerR: number = 17, stamenR: number = 5.6) => {
    const count = 20;
    const step = 360 / count;
    return (
      <g>
        {/* 双层错落细长白花瓣 */}
        {/* 底层花瓣 */}
        {Array.from({ length: count }).map((_, i) => (
          <g key={`b_${i}`} opacity="0.92">
            {renderSingleRayPetal(i * step + step * 0.5, outerR * 0.94, outerR * 0.26)}
          </g>
        ))}
        {/* 表层盛开花瓣 */}
        {Array.from({ length: count }).map((_, i) => (
          <g key={`t_${i}`}>
            {renderSingleRayPetal(i * step, outerR, outerR * 0.28)}
          </g>
        ))}
        {/* 绒毛花丝花蕊 */}
        {renderFilamentStamen(stamenR, stamenR * 0.92)}
      </g>
    );
  };

  /**
   * 2. 三分之四侧仰角【侧仰雏菊】（椭圆透视，花瓣左右近大远小）
   */
  const renderThreeQuarterBloom = (outerR: number = 16, rot: number = 0, isFacingLeft: boolean = false) => {
    const count = 18;
    const step = 360 / count;
    const sx = isFacingLeft ? -1 : 1;

    return (
      <g transform={`rotate(${rot}) scale(${sx}, 1)`}>
        {/* 花盘背向侧青绿花萼托底（半遮露） */}
        <ellipse cx="-1.5" cy="2.5" rx={outerR * 0.35} ry={outerR * 0.22} fill={stemDark} />

        {/* 透视压缩花瓣（后侧压扁，前侧展开） */}
        <g transform="scale(0.92, 0.68)">
          {Array.from({ length: count }).map((_, i) => {
            const ang = i * step;
            // 依据方位计算前后透视缩放
            const isBack = ang > 120 && ang < 240;
            const pLen = isBack ? outerR * 0.78 : outerR * 1.05;
            return (
              <g key={i}>
                {renderSingleRayPetal(ang, pLen, outerR * 0.28)}
              </g>
            );
          })}
        </g>

        {/* 侧向扁椭圆花蕊 */}
        <g transform="translate(1, -1)">
          {renderFilamentStamen(outerR * 0.34, outerR * 0.24)}
        </g>
      </g>
    );
  };

  /**
   * 3. 经典正侧颜【侧面雏菊】（露出圆锥形多层青绿总苞与外展白瓣）
   */
  const renderProfileBloom = (size: number = 15, rot: number = 0, isFacingLeft: boolean = false) => {
    const sx = isFacingLeft ? -1 : 1;
    return (
      <g transform={`rotate(${rot}) scale(${sx}, 1)`}>
        {/* 1. 圆锥形小总苞片杯 (Calyx) */}
        <path
          d="M -5 6 C -6 2, -5 -4, 0 -6 C 5 -4, 6 2, 5 6 C 3 8, -3 8, -5 6 Z"
          fill="url(#daisyCalyxGrad)"
          stroke={stemDark}
          strokeWidth="0.4"
        />
        {/* 苞片细齿 */}
        <path d="M -4 4 L -5 1 L -3 2 L -4 -2 L -1 0 L 0 -4 L 1 0 L 4 -2 L 3 2 L 5 1 L 4 4 Z" fill={stemLight} />

        {/* 2. 侧向向外绽放的白花瓣（前长后短，扇面开展） */}
        <g transform="translate(0, -6)">
          <path d="M -1 0 C -4 -5, -8 -10, -11 -13 C -8 -15, -4 -9, 0 0 Z" fill="url(#daisyRayPetalGrad)" stroke={petalShadow} strokeWidth="0.3" />
          <path d="M 0 0 C -2 -7, -4 -13, -6 -16 C -3 -17, 0 -11, 0 0 Z" fill="url(#daisyRayPetalGrad)" stroke={petalShadow} strokeWidth="0.3" />
          <path d="M 0 0 C 0 -7, 0 -14, 0 -18 C 3 -17, 3 -11, 0 0 Z" fill="url(#daisyRayPetalGrad)" stroke={petalShadow} strokeWidth="0.3" />
          <path d="M 0 0 C 2 -7, 5 -13, 7 -16 C 9 -14, 4 -9, 0 0 Z" fill="url(#daisyRayPetalGrad)" stroke={petalShadow} strokeWidth="0.3" />
          <path d="M 1 0 C 4 -5, 8 -9, 12 -12 C 12 -14, 7 -8, 0 0 Z" fill="url(#daisyRayPetalGrad)" stroke={petalShadow} strokeWidth="0.3" />

          {/* 侧面凸出的金黄蓬松花蕊边缘 */}
          <ellipse cx="0.5" cy="-2.5" rx="3.8" ry="2.2" fill={filamentGoldMid} stroke={filamentGoldDark} strokeWidth="0.5" />
          <circle cx="0.5" cy="-2.5" r="1.6" fill={filamentGoldLight} />
        </g>
      </g>
    );
  };

  /**
   * 4. 背侧回眸【背向含蓄雏菊】（宋画禅意，露出青绿杯托与白瓣反面尖角）
   */
  const renderBackBloom = (outerR: number = 13, rot: number = 0) => {
    return (
      <g transform={`rotate(${rot})`}>
        {/* 外围白花瓣尖 */}
        {Array.from({ length: 14 }).map((_, i) => (
          <path
            key={i}
            d={`M -2 0 L 0 -${outerR} L 2 0 Z`}
            fill={petalMidWhite}
            stroke={petalShadow}
            strokeWidth="0.3"
            transform={`rotate(${(i * 360) / 14})`}
          />
        ))}
        {/* 背部完整青绿花萼总苞 */}
        <circle cx="0" cy="0" r={outerR * 0.45} fill="url(#daisyCalyxGrad)" stroke={stemDark} strokeWidth="0.4" />
        {/* 辐射萼片齿 */}
        {Array.from({ length: 8 }).map((_, i) => (
          <polygon
            key={`calyx_${i}`}
            points="0,0 -1.5,-6 1.5,-6"
            fill={stemLight}
            transform={`rotate(${(i * 360) / 8})`}
          />
        ))}
        {/* 花茎相接圆蒂 */}
        <circle cx="0" cy="0" r="1.8" fill={stemDark} />
      </g>
    );
  };

  /**
   * 小而细长、微卷小叶 (Slender Curled Daisy Leaves)
   */
  const renderSlenderLeaf = (x: number, y: number, length: number, rot: number, curlSign: number = 1) => {
    // curlSign: 1 为向右微卷，-1 为向左微卷
    const w = length * 0.18;
    return (
      <g transform={`translate(${x}, ${y}) rotate(${rot})`}>
        {/* 细长微卷叶片主体 */}
        <path
          d={`M 0 0 C ${w * 0.8} -${length * 0.3}, ${w * 1.2 * curlSign} -${length * 0.7}, ${w * 2.2 * curlSign} -${length} C ${w * 0.5 * curlSign} -${length * 0.75}, -${w * 0.2} -${length * 0.35}, 0 0 Z`}
          fill="url(#daisyLeafGrad)"
          stroke={leafDark}
          strokeWidth="0.35"
        />
        {/* 叶主脉 */}
        <path
          d={`M 0 0 Q ${w * 0.6 * curlSign} -${length * 0.55} ${w * 1.8 * curlSign} -${length * 0.95}`}
          stroke={leafLight}
          strokeWidth="0.45"
          fill="none"
          opacity="0.8"
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

      {/* ── 架构 1：主径与多级小径分枝系统 (主径生长小径，错落聚拢) ── */}
      <g id="daisyBranchedStems">
        {/* A. 中央主挺拔主茎：自瓶口 (75,125) 挺拔向上一路分支至 (68,-15) */}
        <path
          d="M 75 125 C 75 105, 74 70, 72 38 C 71 18, 69 0, 68 -15"
          stroke="url(#daisyRealStemGrad)"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
        {/* 中央主径上的小径分枝 1：向右上方分出至 (88,-2) */}
        <path
          d="M 72 25 C 74 15, 80 8, 88 -2"
          stroke="url(#daisyRealStemGrad)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* 中央主径上的小径分枝 2：向左上方分出至 (52,5) */}
        <path
          d="M 73 35 C 68 25, 58 16, 52 5"
          stroke="url(#daisyRealStemGrad)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* B. 右侧多花分支主茎：自瓶口 (76,125) 略微向右昂扬 */}
        <path
          d="M 76 125 C 78 108, 82 85, 86 72"
          stroke="url(#daisyRealStemGrad)"
          strokeWidth="2.0"
          fill="none"
          strokeLinecap="round"
        />
        {/* 右主径分枝 1：向右侧平挑小径至 (98,48) */}
        <path
          d="M 83 85 C 88 72, 94 58, 98 48"
          stroke="url(#daisyRealStemGrad)"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
        {/* 右主径分枝 2：低矮小蕾小径至 (100,76) */}
        <path
          d="M 81 100 C 88 94, 95 86, 100 76"
          stroke="url(#daisyRealStemGrad)"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
        />

        {/* C. 左侧分支主茎：自瓶口 (74,125) 舒缓向左延伸 */}
        <path
          d="M 74 125 C 71 108, 64 92, 60 82"
          stroke="url(#daisyRealStemGrad)"
          strokeWidth="1.9"
          fill="none"
          strokeLinecap="round"
        />
        {/* 左主径向中上段分枝小径至 (50,46) */}
        <path
          d="M 68 96 C 62 82, 54 62, 50 46"
          stroke="url(#daisyRealStemGrad)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* 中段挺立主花柄至 (75,38) */}
        <path
          d="M 74 80 C 74 65, 75 50, 75 38"
          stroke="url(#daisyRealStemGrad)"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* ── 架构 2：细长微卷小叶片群 (叶多，分布在主小径交界处，错落舒展) ── */}
      <g id="daisySlenderLeaves">
        {/* 下段靠近瓶口小叶群 */}
        {renderSlenderLeaf(72, 118, 22, -45, -1)}
        {renderSlenderLeaf(77, 116, 24, 40, 1)}
        {renderSlenderLeaf(74, 110, 19, -20, 1)}
        {renderSlenderLeaf(76, 106, 20, 30, -1)}

        {/* 中下段茎叶 */}
        {renderSlenderLeaf(66, 95, 23, -55, -1)}
        {renderSlenderLeaf(81, 92, 22, 50, 1)}
        {renderSlenderLeaf(63, 85, 20, -35, 1)}
        {renderSlenderLeaf(84, 80, 21, 42, -1)}

        {/* 中段至分枝节点小叶 */}
        {renderSlenderLeaf(72, 68, 19, -28, -1)}
        {renderSlenderLeaf(76, 62, 20, 32, 1)}
        {renderSlenderLeaf(56, 58, 18, -60, -1)}
        {renderSlenderLeaf(92, 58, 17, 58, 1)}

        {/* 高段嫩梢微卷小叶 */}
        {renderSlenderLeaf(70, 32, 16, -22, -1)}
        {renderSlenderLeaf(74, 20, 15, 25, 1)}
        {renderSlenderLeaf(68, 5, 13, -15, 1)}
        {renderSlenderLeaf(82, 10, 14, 38, -1)}
      </g>

      {/* ── 架构 3：多花、高低有致、不可统一朝向的名品小雏菊群 (9~10 朵) ── */}
      <g id="daisyMultiBlooms">
        {/* 1. 【极顶高梢】(x:68, y:-22)：小巧微昂 3/4 俯仰花（高瞻远瞩，r=12） */}
        <g transform="translate(68, -22)">
          {renderThreeQuarterBloom(12, -15, false)}
        </g>

        {/* 2. 【高位右上侧】(x:88, y:-2)：三分之四侧仰花（向右上方仰视沐光，r=13） */}
        <g transform="translate(88, -2)">
          {renderThreeQuarterBloom(13, 28, false)}
        </g>

        {/* 3. 【高位左上侧】(x:52, y:5)：三分之四侧面微俯（向左方凝睇，r=12.5） */}
        <g transform="translate(52, 5)">
          {renderThreeQuarterBloom(12.5, -32, true)}
        </g>

        {/* 4. 【中高背身回眸】(x:73, y:16)：背立微含蓄（露出青绿总苞与白瓣反面，宋画深幽禅意，r=11.5） */}
        <g transform="translate(73, 16)">
          {renderBackBloom(11.5, 18)}
        </g>

        {/* 5. 【中层中心主花】(x:75, y:38)：舒展正视微仰盛开（主视觉焦点，r=16，密集花丝蓬松金黄花蕊） */}
        <g transform="translate(75, 38)">
          {renderFrontBloom(16, 5.4)}
        </g>

        {/* 6. 【中层左侧翼】(x:50, y:46)：三分之四左向侧倚（与右侧呼应，r=13.5） */}
        <g transform="translate(50, 46)">
          {renderThreeQuarterBloom(13.5, -25, true)}
        </g>

        {/* 7. 【中层右侧翼】(x:98, y:48)：正侧颜（清丽正侧面，清晰显现青绿圆锥花萼与前展花瓣，r=13） */}
        <g transform="translate(98, 48)">
          {renderProfileBloom(13, 15, false)}
        </g>

        {/* 8. 【下层右侧聚拢】(x:86, y:72)：向右下微垂三分之四花（饱满沉实，r=13.5） */}
        <g transform="translate(86, 72)">
          {renderThreeQuarterBloom(13.5, 38, false)}
        </g>

        {/* 9. 【下层左侧护瓶】(x:60, y:82)：向左下低头含蓄花（贴近瓶口，丰满层次，r=12.5） */}
        <g transform="translate(60, 82)">
          {renderThreeQuarterBloom(12.5, -42, true)}
        </g>

        {/* 10. 【右侧低矮小梢花蕾】(x:100, y:76)：紧凑初绽小侧花（r=10，增添原生野趣与蓬勃生机） */}
        <g transform="translate(100, 76)">
          {renderProfileBloom(10.5, 45, false)}
        </g>
      </g>
    </g>
  );
};
