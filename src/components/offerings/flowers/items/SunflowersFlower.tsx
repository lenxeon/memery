/**
 * @file SunflowersFlower.tsx
 * @description 【写实金色向日葵】严格按照参考图重构：
 * 1. 无叶、三朵、高低有致、各有朝向：
 *    - 主花1 (居中偏左高位): 正视微仰大金盘，深褐蜂窝绒面花芯与层叠金黄舌状花瓣；
 *    - 主花2 (右侧中位): 3/4 侧倾朝右舒展大花，展露侧面花托与透视深核；
 *    - 主花3 (左侧低位): 侧背朝向，重点展现硕大层叠反卷的青绿总苞（花托特写），多层尖齿叶苞包裹花瓣，枝干弧线优雅插入；
 * 2. 花朵与花托都大：
 *    - 硕大霸气的花盘直径与极具厚重感的反卷多层总苞片；
 * 3. 花茎发白有细毛：
 *    - 粗壮多汁的花茎通体呈带白霜的浅粉绿/灰白鼠尾草绿，边缘覆有细密柔和的白色绒毛光边；
 * 4. 严格一花一径：3 根粗壮白绒花茎直通瓶口，无叶相杂；支持花瓶口径动态自适应 (spreadFactor)。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const SUNFLOWER_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.5, fallSpan: 0.06, startX: 104, startY: 48, landX: 110, landY: 194, rx: 6.8, ry: 3.5, landRot: 28, swayAmp: 14, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.35, fallSpan: 0.06, startX: 46, startY: 56, landX: 50, landY: 193, rx: 7.0, ry: 3.6, landRot: -30, swayAmp: 12, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.15, fallSpan: 0.05, startX: 72, startY: 44, landX: 78, landY: 195, rx: 7.2, ry: 3.8, landRot: 14, swayAmp: 15, swayFreq: 3.8 },
];

export const SunflowersFlower: React.FC<FlowerComponentProps> = ({
  health,
  dryFactor,
  isFaded,
  spreadFactor = 1.0,
}) => {
  // ── 向日葵纯正金黄与暖橙渐变 ──
  const goldLight = lerpColor('#fef08a', '#e8d2a2', dryFactor);
  const goldPrimary = lerpColor('#facc15', '#cca656', dryFactor);
  const goldAmber = lerpColor('#eab308', '#ad833e', dryFactor);
  const goldOrange = lerpColor('#f59e0b', '#9c6f2e', dryFactor);
  const goldShadow = lerpColor('#b45309', '#664319', dryFactor);

  // ── 标志性深焦糖黑巧蜂窝大花盘 ──
  const discDeepDark = lerpColor('#1c0f06', '#140c06', dryFactor);
  const discVelvet = lerpColor('#3d1d08', '#2a1608', dryFactor);
  const discFloretsGold = lerpColor('#ca8a04', '#7a5a2b', dryFactor);
  const discEdgeGlow = lerpColor('#eab308', '#8f6a31', dryFactor);

  // ── 硕大青绿花托（总苞片）──
  const calyxDarkGreen = lerpColor('#22541c', '#3b3b27', dryFactor);
  const calyxMidGreen = lerpColor('#3f8222', '#545934', dryFactor);
  const calyxLightGreen = lerpColor('#65a30d', '#717849', dryFactor);
  const calyxTipLime = lerpColor('#a3e635', '#9ca36d', dryFactor);

  // ── 发白且有细毛的粗壮多汁花茎 ──
  const stemCoreDark = lerpColor('#3f6236', '#4b4d3a', dryFactor);
  const stemPaleSage = lerpColor('#8da882', '#7b8069', dryFactor);
  const stemWhiteFrost = lerpColor('#dcfce7', '#c8cfbb', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.45);
  const fl2 = getBlossomDropStyle(health, 0.3);
  const fl3 = getBlossomDropStyle(health, 0.12);

  const overallOpacity = isFaded ? 0.45 : Math.max(0.65, health);

  /**
   * 1. 硕大正视微仰【盛开向日葵】（居中偏左高位）
   * 焦点主花：多层层叠金黄舌状花瓣，深邃黑巧蜂窝大花盘
   */
  const renderFrontSunflower = (scale: number = 1.16) => {
    // 24 枚双层错落金黄花瓣
    const petalsOuter = [
      0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165,
      180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345
    ];
    const petalsInner = [
      7.5, 22.5, 37.5, 52.5, 67.5, 82.5, 97.5, 112.5, 127.5, 142.5, 157.5, 172.5,
      187.5, 202.5, 217.5, 232.5, 247.5, 262.5, 277.5, 292.5, 307.5, 322.5, 337.5, 352.5
    ];

    return (
      <g transform={`scale(${scale})`}>
        {/* 外层大花瓣 (放射展开，尖端略呈波状小褶) */}
        {petalsOuter.map((deg, idx) => (
          <path
            key={`outer_${idx}`}
            d="M -3 -11 C -4.5 -17, -3.5 -25, 0 -30 C 3.5 -25, 4.5 -17, 3 -11 Z"
            fill="url(#sunflowerGoldOuterGrad)"
            transform={`rotate(${deg})`}
          />
        ))}

        {/* 内层交错花瓣 (更鲜亮金黄，尖端轻微翻卷) */}
        {petalsInner.map((deg, idx) => (
          <g key={`inner_${idx}`} transform={`rotate(${deg})`}>
            <path
              d="M -2.8 -10 C -4 -16, -3 -23, 0 -27 C 3 -23, 4 -16, 2.8 -10 Z"
              fill="url(#sunflowerGoldInnerGrad)"
            />
            {/* 花瓣中央金色微脉脊 */}
            <line x1="0" y1="-10" x2="0" y2="-24" stroke={goldLight} strokeWidth="0.5" opacity="0.65" />
          </g>
        ))}

        {/* 雄蕊花环圈 (金橙微粒紧包花盘外沿) */}
        <circle cx="0" cy="0" r="11.2" fill={goldShadow} />
        <circle cx="0" cy="0" r="10.8" fill="none" stroke={discEdgeGlow} strokeWidth="1.2" strokeDasharray="1.2, 1.5" />

        {/* 核心大花盘（黑巧丝绒质感，斐波那契螺旋蜂窝结构） */}
        <circle cx="0" cy="0" r="10" fill="url(#sunflowerCenterDiscGrad)" />
        <circle cx="0" cy="0" r="7.5" fill="none" stroke={discFloretsGold} strokeWidth="0.8" strokeDasharray="1.2, 1.8" opacity="0.55" />
        <circle cx="0" cy="0" r="5.0" fill="none" stroke={discFloretsGold} strokeWidth="0.7" strokeDasharray="1.0, 1.4" opacity="0.7" />
        <circle cx="0" cy="0" r="2.8" fill={discDeepDark} />
        {/* 丝绒花盘光晕点 */}
        <circle cx="-1.5" cy="-1.8" r="1.5" fill="#522a10" opacity="0.4" />
      </g>
    );
  };

  /**
   * 2. 3/4 侧面向右【向日葵】（右侧中高位）
   * 展露右倾透视花盘、迎光翻卷金瓣，以及左侧厚重的大花托（总苞片）
   */
  const renderSideProfileSunflower = (scale: number = 1.12) => (
    <g transform={`scale(${scale})`}>
      {/* 左后方大花托与层叠总苞片 (花托大) */}
      <g id="sideCalyxBracts">
        {/* 厚实花托基底肉质碗 */}
        <path
          d="M -12 -14 C -22 -6, -24 10, -12 18 C -4 14, 0 8, -2 -6 Z"
          fill="url(#sunflowerCalyxDomeGrad)"
          stroke={calyxDarkGreen}
          strokeWidth="0.5"
        />
        {/* 辐射反卷的披针形大萼苞 */}
        {[
          { d: 'M -10 -16 C -18 -22, -26 -16, -20 -8 Z' },
          { d: 'M -14 -10 C -24 -12, -28 -2, -22 4 Z' },
          { d: 'M -15 -2 C -26 -2, -28 8, -20 12 Z' },
          { d: 'M -13 6 C -24 8, -26 18, -16 20 Z' },
          { d: 'M -8 14 C -18 20, -14 26, -6 22 Z' },
        ].map((bract, i) => (
          <path
            key={i}
            d={bract.d}
            fill={calyxMidGreen}
            stroke={calyxDarkGreen}
            strokeWidth="0.4"
          />
        ))}
      </g>

      {/* 侧向展开的金黄花瓣裙 */}
      <g id="sidePetalsGroup">
        {/* 背阴面小瓣 */}
        <path d="M -8 -15 C -8 -26, 0 -30, 4 -22 Z" fill={goldShadow} />
        <path d="M -10 14 C -8 26, 0 30, 4 22 Z" fill={goldShadow} />

        {/* 迎光主花瓣 (层叠向前及向右伸展) */}
        {[
          'M 2 -26 C 14 -28, 22 -20, 16 -12 Z',
          'M 8 -20 C 22 -22, 28 -10, 20 -4 Z',
          'M 12 -12 C 28 -12, 32 -2, 22 4 Z',
          'M 13 -4 C 30 -2, 33 8, 21 12 Z',
          'M 11 4 C 26 8, 28 18, 17 18 Z',
          'M 7 12 C 20 18, 18 26, 11 22 Z',
          'M 1 18 C 10 26, 6 30, 1 24 Z',
        ].map((pD, i) => (
          <path
            key={i}
            d={pD}
            fill={i % 2 === 0 ? 'url(#sunflowerGoldOuterGrad)' : 'url(#sunflowerGoldInnerGrad)'}
            stroke={goldShadow}
            strokeWidth="0.3"
          />
        ))}
      </g>

      {/* 透视斜侧向日葵大花盘 (椭圆向右) */}
      <ellipse cx="6" cy="0" rx="6.5" ry="11" fill="url(#sunflowerCenterDiscGrad)" stroke={discFloretsGold} strokeWidth="0.9" />
      <ellipse cx="6" cy="0" rx="4.0" ry="7.5" fill={discDeepDark} />
      {/* 边缘细密金圈 */}
      <path d="M 5 -10 C 11 -6, 11 6, 5 10" stroke={discEdgeGlow} strokeWidth="0.9" strokeDasharray="1.2, 1.5" fill="none" />
    </g>
  );

  /**
   * 3. 侧背朝向【特大花托向日葵】（左侧低位）
   * 严格按照参考图左侧花朵：侧背朝向，重点展现硕大无朋的青绿多层反卷总苞（大花托）！
   * 粗壮发白带细毛的拱形花茎直接连入花托底心，周围金黄花瓣向后微露！
   */
  const renderBackCalyxSunflower = (scale: number = 1.1) => (
    <g transform={`scale(${scale})`}>
      {/* 外围露出的金黄花瓣尖角 */}
      <g id="peekingPetals">
        <path d="M -18 -12 C -26 -16, -28 -6, -20 -2 Z" fill={goldPrimary} />
        <path d="M -20 -4 C -28 -4, -30 6, -21 10 Z" fill={goldAmber} />
        <path d="M -18 6 C -26 10, -27 18, -17 18 Z" fill={goldPrimary} />
        <path d="M -12 15 C -20 22, -14 28, -6 23 Z" fill={goldAmber} />
        <path d="M -4 20 C -8 28, 2 30, 4 22 Z" fill={goldPrimary} />
        <path d="M 6 18 C 14 26, 18 18, 12 12 Z" fill={goldAmber} />
        <path d="M -12 -18 C -18 -26, -8 -28, -2 -20 Z" fill={goldPrimary} />
        <path d="M 0 -19 C 6 -27, 14 -22, 8 -15 Z" fill={goldAmber} />
      </g>

      {/* 硕大多层青绿总苞 (参考图中震撼的向日葵大花托) */}
      <g id="giantInvolucreBracts">
        {/* 花托背部主肉质圆台 */}
        <circle cx="0" cy="0" r="14.5" fill="url(#sunflowerCalyxDomeGrad)" stroke={calyxDarkGreen} strokeWidth="0.8" />

        {/* 外圈多枚尖长反卷披针形大萼苞 (向四周张开) */}
        {[
          { x1: -10, y1: -10, cx: -24, cy: -20, x2: -3, y2: -14 },
          { x1: -14, y1: -3, cx: -27, cy: -8, x2: -14, y2: 6 },
          { x1: -13, y1: 5, cx: -26, cy: 15, x2: -6, y2: 13 },
          { x1: -7, y1: 12, cx: -16, cy: 26, x2: 2, y2: 14 },
          { x1: 2, y1: 14, cx: 12, cy: 26, x2: 9, y2: 11 },
          { x1: 9, y1: 10, cx: 24, cy: 16, x2: 13, y2: 3 },
          { x1: 13, y1: 2, cx: 26, cy: -6, x2: 10, y2: -8 },
          { x1: 8, y1: -10, cx: 18, cy: -24, x2: 0, y2: -14 },
        ].map((b, idx) => (
          <path
            key={idx}
            d={`M ${b.x1} ${b.y1} Q ${b.cx} ${b.cy} ${b.x2} ${b.y2} Z`}
            fill={idx % 2 === 0 ? calyxMidGreen : calyxLightGreen}
            stroke={calyxDarkGreen}
            strokeWidth="0.45"
          />
        ))}

        {/* 内圈紧裹小萼片 (环绕花茎基部，层层簇拥) */}
        {[
          { d: 'M -6 -7 Q -14 -12 -2 -10 Z' },
          { d: 'M -8 -2 Q -15 0 -7 4 Z' },
          { d: 'M -6 5 Q -12 11 0 8 Z' },
          { d: 'M 2 7 Q 10 12 6 2 Z' },
          { d: 'M 6 -1 Q 12 -4 4 -6 Z' },
          { d: 'M 0 -8 Q 6 -12 -4 -8 Z' },
        ].map((sB, idx) => (
          <path key={`sb_${idx}`} d={sB.d} fill={calyxTipLime} stroke={calyxMidGreen} strokeWidth="0.4" />
        ))}

        {/* 花托中央与花茎相连处紧缩圆环 (花茎自然拱入) */}
        <ellipse cx="0" cy="0" rx="4.5" ry="4.5" fill={calyxDarkGreen} />
      </g>
    </g>
  );

  // ─────────────────────────────────────────────────────────────
  // 3 枝空间构图与花茎路径（根据花瓶口径动态自适应）：
  // 枝1 (中高主花-正视): 端点 (68, 38)
  // 枝2 (右中主花-3/4侧倾朝右): 端点 (102, 58)
  // 枝3 (左低特大花托-侧背朝左): 端点 (38, 76)
  // ─────────────────────────────────────────────────────────────
  const b1x = 75 - 7 * spreadFactor;
  const b1y = 38;
  const b1rot = -4 * spreadFactor;

  const b2x = 75 + 27 * spreadFactor;
  const b2y = 58;
  const b2rot = 16 * spreadFactor;

  const b3x = 75 - 37 * spreadFactor;
  const b3y = 76;
  const b3rot = -20 * spreadFactor;

  return (
    <g id="sunflowersFlora" style={{ opacity: overallOpacity }}>
      <defs>
        {/* 1. 外层向日葵金黄渐变 */}
        <linearGradient id="sunflowerGoldOuterGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={goldShadow} />
          <stop offset="25%" stopColor={goldOrange} />
          <stop offset="70%" stopColor={goldPrimary} />
          <stop offset="100%" stopColor={goldLight} />
        </linearGradient>

        {/* 2. 内层向日葵金黄渐变 */}
        <linearGradient id="sunflowerGoldInnerGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={goldOrange} />
          <stop offset="40%" stopColor={goldPrimary} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.85" />
        </linearGradient>

        {/* 3. 焦糖黑巧深色蜂窝花盘渐变 */}
        <radialGradient id="sunflowerCenterDiscGrad" cx="45%" cy="45%" r="60%">
          <stop offset="0%" stopColor={discVelvet} />
          <stop offset="65%" stopColor={discDeepDark} />
          <stop offset="90%" stopColor="#291205" />
          <stop offset="100%" stopColor={discEdgeGlow} />
        </radialGradient>

        {/* 4. 硕大青绿花托（总苞穹顶）渐变 */}
        <radialGradient id="sunflowerCalyxDomeGrad" cx="40%" cy="40%" r="65%">
          <stop offset="0%" stopColor={calyxTipLime} />
          <stop offset="45%" stopColor={calyxMidGreen} />
          <stop offset="85%" stopColor={calyxDarkGreen} />
          <stop offset="100%" stopColor="#143310" />
        </radialGradient>

        {/* 5. 粗壮多汁花茎发白带微霜渐变 (userSpaceOnUse) */}
        <linearGradient id="sunflowerStemFrostGrad" gradientUnits="userSpaceOnUse" x1="30" y1="0" x2="110" y2="0">
          <stop offset="0%" stopColor={stemCoreDark} />
          <stop offset="30%" stopColor={stemPaleSage} />
          <stop offset="60%" stopColor={stemWhiteFrost} />
          <stop offset="85%" stopColor={stemPaleSage} />
          <stop offset="100%" stopColor={stemCoreDark} />
        </linearGradient>
      </defs>

      {/* ─────────────────────────────────────────────────────────────
          发白且有细毛的粗壮多汁花茎 (无叶，一花一径，3 枝各有优美弧度)
      ───────────────────────────────────────────────────────────── */}
      <g id="sunflowerFrostStems">
        {/* 枝1 花茎：直挺挺拔通往中高正视大花 (b1x, b1y) */}
        <g>
          {/* 主茎芯 */}
          <path
            d={`M 75 125 C 75 105, ${b1x + 2} 75, ${b1x} ${b1y + 12}`}
            stroke="url(#sunflowerStemFrostGrad)"
            strokeWidth="5.0"
            fill="none"
            strokeLinecap="round"
          />
          {/* 发白中脊光感 */}
          <path
            d={`M 75 124 C 75 105, ${b1x + 2} 75, ${b1x} ${b1y + 12}`}
            stroke={stemWhiteFrost}
            strokeWidth="1.6"
            fill="none"
            opacity="0.8"
          />
          {/* 边缘细密白色绒毛 (细毛光晕) */}
          <path
            d={`M 75 124 C 75 105, ${b1x + 2} 75, ${b1x} ${b1y + 12}`}
            stroke="#ffffff"
            strokeWidth="5.8"
            strokeDasharray="1.2, 2.0"
            fill="none"
            opacity="0.6"
          />
        </g>

        {/* 枝2 花茎：舒缓向右弯折通往右侧 3/4 侧倾大花 (b2x, b2y) */}
        <g>
          <path
            d={`M ${75 + 3 * spreadFactor} 125 C ${75 + 8 * spreadFactor} 104, ${b2x - 8} 86, ${b2x - 8} ${b2y + 8}`}
            stroke="url(#sunflowerStemFrostGrad)"
            strokeWidth="4.8"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={`M ${75 + 3 * spreadFactor} 125 C ${75 + 8 * spreadFactor} 104, ${b2x - 8} 86, ${b2x - 8} ${b2y + 8}`}
            stroke={stemWhiteFrost}
            strokeWidth="1.5"
            fill="none"
            opacity="0.8"
          />
          <path
            d={`M ${75 + 3 * spreadFactor} 125 C ${75 + 8 * spreadFactor} 104, ${b2x - 8} 86, ${b2x - 8} ${b2y + 8}`}
            stroke="#ffffff"
            strokeWidth="5.6"
            strokeDasharray="1.2, 2.0"
            fill="none"
            opacity="0.6"
          />
        </g>

        {/* 枝3 花茎：优美拱桥弧线向左弯折，精准插入侧背大花托中心 (b3x, b3y) */}
        <g>
          <path
            d={`M ${75 - 3 * spreadFactor} 125 C ${75 - 12 * spreadFactor} 105, ${b3x + 14} 92, ${b3x} ${b3y}`}
            stroke="url(#sunflowerStemFrostGrad)"
            strokeWidth="4.8"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={`M ${75 - 3 * spreadFactor} 125 C ${75 - 12 * spreadFactor} 105, ${b3x + 14} 92, ${b3x} ${b3y}`}
            stroke={stemWhiteFrost}
            strokeWidth="1.5"
            fill="none"
            opacity="0.8"
          />
          <path
            d={`M ${75 - 3 * spreadFactor} 125 C ${75 - 12 * spreadFactor} 105, ${b3x + 14} 92, ${b3x} ${b3y}`}
            stroke="#ffffff"
            strokeWidth="5.6"
            strokeDasharray="1.2, 2.0"
            fill="none"
            opacity="0.6"
          />
        </g>
      </g>

      {/* ─────────────────────────────────────────────────────────────
          三朵大向日葵（各有朝向、高低有致、无叶相衬）
      ───────────────────────────────────────────────────────────── */}
      <g id="sunflowerBlooms">
        {/* 枝3：【侧背向日葵·特大花托】左低位，重点呈现反卷大总苞片 */}
        <g transform={`translate(${b3x}, ${b3y}) rotate(${b3rot})`} style={fl3}>
          {renderBackCalyxSunflower(1.12)}
        </g>

        {/* 枝2：【3/4 侧面向右向日葵】右侧中位，立体透视大花 */}
        <g transform={`translate(${b2x}, ${b2y}) rotate(${b2rot})`} style={fl2}>
          {renderSideProfileSunflower(1.14)}
        </g>

        {/* 枝1：【正视盛放向日葵】中高居中偏左焦点大花，金光灿烂 */}
        <g transform={`translate(${b1x}, ${b1y}) rotate(${b1rot})`} style={fl1}>
          {renderFrontSunflower(1.18)}
        </g>
      </g>
    </g>
  );
};
