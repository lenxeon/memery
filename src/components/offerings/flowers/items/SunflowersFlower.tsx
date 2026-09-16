/**
 * @file SunflowersFlower.tsx
 * @description 【写实金色向日葵】严格遵循参考图重构：
 * 1. 结构与构图紧凑收拢（拒绝散乱外撇，黄金三角聚拢插瓶）：
 *    - 枝1 (居中偏上主花): 正视微仰大花盘，深褐丝绒蜂窝花芯与多层金黄舌状花瓣；
 *    - 枝2 (右侧中位): 3/4 侧视向右大花，背萼与花盘紧密一体，绝无脱节断层；
 *    - 枝3 (左侧偏低): 侧背朝向，重点展现硕大多层反卷青绿总苞（大花托），金瓣外翻，花茎自然弯曲拱入花托底心；
 * 2. 花径与花瓶关系自然统一：
 *    - 3 根花茎在瓶口紧密汇聚扎束（X: 73~77，Y: 120），自瓶口幽暗处优雅探出；
 *    - 发白多汁粗茎：温润浅粉绿底色、中央白霜丝缎高光、外缘柔和的微细白绒光晕（告别生硬斑马虚线）；
 * 3. 花托与花朵都大，通体无叶。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const SUNFLOWER_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.5, fallSpan: 0.06, startX: 98, startY: 54, landX: 106, landY: 194, rx: 6.8, ry: 3.5, landRot: 28, swayAmp: 14, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.35, fallSpan: 0.06, startX: 48, startY: 66, landX: 52, landY: 193, rx: 7.0, ry: 3.6, landRot: -30, swayAmp: 12, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.15, fallSpan: 0.05, startX: 72, startY: 42, landX: 76, landY: 195, rx: 7.2, ry: 3.8, landRot: 14, swayAmp: 15, swayFreq: 3.8 },
];

export const SunflowersFlower: React.FC<FlowerComponentProps> = ({
  health,
  dryFactor,
  isFaded,
  spreadFactor = 1.0,
}) => {
  // ── 向日葵金黄与暖橙渐变 ──
  const goldLight = lerpColor('#fef08a', '#e8d2a2', dryFactor);
  const goldPrimary = lerpColor('#facc15', '#cca656', dryFactor);
  const goldAmber = lerpColor('#eab308', '#ad833e', dryFactor);
  const goldOrange = lerpColor('#f59e0b', '#9c6f2e', dryFactor);
  const goldShadow = lerpColor('#b45309', '#664319', dryFactor);

  // ── 深焦糖黑巧蜂窝大花盘 ──
  const discDeepDark = lerpColor('#1c0f06', '#140c06', dryFactor);
  const discVelvet = lerpColor('#3d1d08', '#2a1608', dryFactor);
  const discFloretsGold = lerpColor('#ca8a04', '#7a5a2b', dryFactor);
  const discEdgeGlow = lerpColor('#eab308', '#8f6a31', dryFactor);

  // ── 硕大青绿花托（总苞片）──
  const calyxDarkGreen = lerpColor('#22541c', '#3b3b27', dryFactor);
  const calyxMidGreen = lerpColor('#3f8222', '#545934', dryFactor);
  const calyxLightGreen = lerpColor('#65a30d', '#717849', dryFactor);
  const calyxTipLime = lerpColor('#a3e635', '#9ca36d', dryFactor);

  // ── 发白带细毛的粗壮多汁花茎 ──
  const stemDark = lerpColor('#36542f', '#444634', dryFactor);
  const stemSage = lerpColor('#7fa274', '#70755f', dryFactor);
  const stemWhiteFrost = lerpColor('#dcfce7', '#c8cfbc', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.45);
  const fl2 = getBlossomDropStyle(health, 0.3);
  const fl3 = getBlossomDropStyle(health, 0.12);

  const overallOpacity = isFaded ? 0.45 : Math.max(0.65, health);

  /**
   * 1. 硕大正视微仰【盛开向日葵】（居中偏上，主视觉焦点）
   */
  const renderCenterSunflower = (scale: number = 1.18) => {
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
        {/* 外层大花瓣 */}
        {petalsOuter.map((deg, idx) => (
          <path
            key={`out_${idx}`}
            d="M -3 -11 C -4.5 -17, -3.5 -25, 0 -30 C 3.5 -25, 4.5 -17, 3 -11 Z"
            fill="url(#sunflowerGoldOuterGrad)"
            transform={`rotate(${deg})`}
          />
        ))}

        {/* 内层交错花瓣 */}
        {petalsInner.map((deg, idx) => (
          <g key={`in_${idx}`} transform={`rotate(${deg})`}>
            <path
              d="M -2.8 -10 C -4 -16, -3 -23, 0 -27 C 3 -23, 4 -16, 2.8 -10 Z"
              fill="url(#sunflowerGoldInnerGrad)"
            />
            <line x1="0" y1="-10" x2="0" y2="-24" stroke={goldLight} strokeWidth="0.5" opacity="0.65" />
          </g>
        ))}

        {/* 雄蕊金橙小花环 */}
        <circle cx="0" cy="0" r="11.2" fill={goldShadow} />
        <circle cx="0" cy="0" r="10.8" fill="none" stroke={discEdgeGlow} strokeWidth="1.2" strokeDasharray="1.2, 1.5" />

        {/* 核心大花盘（深褐蜂窝同心轮） */}
        <circle cx="0" cy="0" r="10" fill="url(#sunflowerCenterDiscGrad)" />
        <circle cx="0" cy="0" r="7.5" fill="none" stroke={discFloretsGold} strokeWidth="0.8" strokeDasharray="1.2, 1.8" opacity="0.55" />
        <circle cx="0" cy="0" r="5.0" fill="none" stroke={discFloretsGold} strokeWidth="0.7" strokeDasharray="1.0, 1.4" opacity="0.7" />
        <circle cx="0" cy="0" r="2.8" fill={discDeepDark} />
        <circle cx="-1.5" cy="-1.8" r="1.5" fill="#522a10" opacity="0.4" />
      </g>
    );
  };

  /**
   * 2. 3/4 侧面向右【向日葵】（右侧中位）
   * 彻底修复花朵与花托脱节问题：
   * 绿萼碗底包裹花体左后方，与花瓣基部无缝连结，整朵花朝右前下方优雅舒展！
   */
  const renderRightTiltSunflower = (scale: number = 1.14) => (
    <g transform={`scale(${scale})`}>
      {/* 1. 后层绿萼苞片：紧贴花瓣基底向左后方包裹 */}
      <g id="rightCalyxBacking">
        {/* 肉质花托基盘 */}
        <path
          d="M -14 -12 C -20 -4, -20 12, -12 18 C -6 16, -2 8, -4 -6 Z"
          fill="url(#sunflowerCalyxDomeGrad)"
          stroke={calyxDarkGreen}
          strokeWidth="0.6"
        />
        {/* 反卷的青绿总苞尖齿 */}
        <path d="M -12 -12 C -18 -18, -24 -12, -18 -6 Z" fill={calyxMidGreen} stroke={calyxDarkGreen} strokeWidth="0.4" />
        <path d="M -15 -4 C -24 -6, -26 4, -18 8 Z" fill={calyxLightGreen} stroke={calyxDarkGreen} strokeWidth="0.4" />
        <path d="M -14 6 C -24 8, -24 18, -15 16 Z" fill={calyxMidGreen} stroke={calyxDarkGreen} strokeWidth="0.4" />
        <path d="M -10 14 C -18 18, -14 26, -6 20 Z" fill={calyxTipLime} stroke={calyxDarkGreen} strokeWidth="0.4" />
      </g>

      {/* 2. 环绕整朵花头的金黄舌状花瓣群（紧密衔接，严丝合缝） */}
      <g id="rightSunflowerPetals">
        {/* 上方辐射花瓣 */}
        <path d="M -8 -10 C -12 -22, -2 -28, 4 -22 Z" fill={goldShadow} />
        <path d="M -2 -14 C 2 -26, 12 -28, 12 -18 Z" fill={goldOrange} />
        <path d="M 6 -12 C 14 -24, 24 -20, 18 -10 Z" fill={goldPrimary} />

        {/* 右侧主展长花瓣 (迎光展开) */}
        <path d="M 8 -8 C 22 -16, 30 -6, 22 0 Z" fill="url(#sunflowerGoldOuterGrad)" />
        <path d="M 9 -2 C 26 -6, 33 6, 23 8 Z" fill="url(#sunflowerGoldInnerGrad)" />
        <path d="M 8 4 C 24 6, 30 16, 20 16 Z" fill="url(#sunflowerGoldOuterGrad)" />

        {/* 下方舒展花瓣 */}
        <path d="M 5 8 C 16 18, 18 26, 11 22 Z" fill="url(#sunflowerGoldInnerGrad)" />
        <path d="M 0 12 C 6 24, 4 28, -2 22 Z" fill={goldOrange} />
        <path d="M -6 10 C -10 22, -4 28, 2 20 Z" fill={goldShadow} />

        {/* 紧贴绿萼处的前排内衬瓣 (消除任何视觉断层空隙) */}
        <path d="M -8 -4 C -12 -2, -12 6, -8 8 Z" fill={goldShadow} />
      </g>

      {/* 3. 透视倾斜的黑巧蜂窝大花盘（居于花瓣中央，微偏右） */}
      <g id="rightDiscCore" transform="translate(4, 0)">
        {/* 外圈金橙花药圆环 */}
        <ellipse cx="0" cy="0" rx="7.0" ry="11.5" fill={goldShadow} />
        <ellipse cx="0" cy="0" rx="6.5" ry="11.0" fill="none" stroke={discEdgeGlow} strokeWidth="1.0" strokeDasharray="1.2, 1.5" />

        {/* 花盘主体 */}
        <ellipse cx="0" cy="0" rx="5.8" ry="10.2" fill="url(#sunflowerCenterDiscGrad)" />
        <ellipse cx="0" cy="0" rx="4.0" ry="7.2" fill="none" stroke={discFloretsGold} strokeWidth="0.8" strokeDasharray="1.0, 1.4" opacity="0.65" />
        <ellipse cx="-0.5" cy="0" rx="2.5" ry="4.5" fill={discDeepDark} />
      </g>
    </g>
  );

  /**
   * 3. 侧背朝向【特大青绿总苞向日葵】（左侧低位）
   * 严格依照参考图左侧花朵：展示巨大的多层反卷总苞（大花托），金黄花瓣自背后层层外展，花茎自然弯曲拱入花托底心！
   */
  const renderLeftCalyxSunflower = (scale: number = 1.1) => (
    <g transform={`scale(${scale})`}>
      {/* 1. 外围向四周与下方翻卷露出的金黄大花瓣 */}
      <g id="calyxBackingPetals">
        <path d="M -16 -10 C -26 -16, -28 -6, -20 -2 Z" fill={goldPrimary} />
        <path d="M -18 -2 C -28 -2, -30 8, -20 11 Z" fill={goldAmber} />
        <path d="M -16 6 C -26 12, -26 20, -16 18 Z" fill={goldPrimary} />
        <path d="M -10 14 C -20 22, -12 28, -4 22 Z" fill={goldAmber} />
        <path d="M -2 18 C -6 28, 4 30, 6 22 Z" fill={goldPrimary} />
        <path d="M 6 16 C 16 26, 20 18, 12 12 Z" fill={goldAmber} />
        <path d="M -12 -16 C -18 -24, -8 -28, -2 -18 Z" fill={goldPrimary} />
        <path d="M 0 -16 C 8 -26, 16 -20, 8 -13 Z" fill={goldAmber} />
      </g>

      {/* 2. 核心大花托（层层反卷多齿总苞片） */}
      <g id="giantInvolucreBracts">
        {/* 花托主肉质圆穹顶 */}
        <circle cx="0" cy="0" r="14.0" fill="url(#sunflowerCalyxDomeGrad)" stroke={calyxDarkGreen} strokeWidth="0.8" />

        {/* 外圈长披针形大萼苞片（自然向四周辐射翘起） */}
        {[
          { x1: -9, y1: -9, cx: -23, cy: -18, x2: -3, y2: -13 },
          { x1: -13, y1: -2, cx: -26, cy: -6, x2: -13, y2: 6 },
          { x1: -12, y1: 5, cx: -24, cy: 15, x2: -5, y2: 12 },
          { x1: -6, y1: 11, cx: -15, cy: 24, x2: 2, y2: 13 },
          { x1: 2, y1: 13, cx: 12, cy: 24, x2: 9, y2: 10 },
          { x1: 8, y1: 9, cx: 22, cy: 15, x2: 12, y2: 3 },
          { x1: 12, y1: 2, cx: 24, cy: -6, x2: 9, y2: -7 },
          { x1: 7, y1: -9, cx: 17, cy: -22, x2: 0, y2: -13 },
        ].map((b, idx) => (
          <path
            key={idx}
            d={`M ${b.x1} ${b.y1} Q ${b.cx} ${b.cy} ${b.x2} ${b.y2} Z`}
            fill={idx % 2 === 0 ? calyxMidGreen : calyxLightGreen}
            stroke={calyxDarkGreen}
            strokeWidth="0.45"
          />
        ))}

        {/* 内圈层叠紧密包萼 */}
        {[
          { d: 'M -5 -6 Q -12 -11 -2 -9 Z' },
          { d: 'M -7 -2 Q -14 0 -6 4 Z' },
          { d: 'M -5 5 Q -11 10 0 7 Z' },
          { d: 'M 2 6 Q 9 11 5 2 Z' },
          { d: 'M 5 -1 Q 11 -4 3 -5 Z' },
          { d: 'M 0 -7 Q 5 -11 -3 -7 Z' },
        ].map((sB, idx) => (
          <path key={`sb_${idx}`} d={sB.d} fill={calyxTipLime} stroke={calyxMidGreen} strokeWidth="0.4" />
        ))}

        {/* 花托中央凹槽连接点 (花茎插入处) */}
        <circle cx="0" cy="0" r="4.2" fill={calyxDarkGreen} />
      </g>
    </g>
  );

  // ─────────────────────────────────────────────────────────────
  // 紧凑收拢插花空间规划（符合花艺美学与参考图聚拢感）：
  // 枝1 (中偏上主花): (72, 42)
  // 枝2 (右侧中位大花): (92, 54)
  // 枝3 (左侧低位大花托): (50, 68)
  // 瓶口汇聚基准点：Y=120，X=73~77
  // ─────────────────────────────────────────────────────────────
  const b1x = 75 - 3 * spreadFactor;
  const b1y = 42;
  const b1rot = -2 * spreadFactor;

  const b2x = 75 + 17 * spreadFactor;
  const b2y = 54;
  const b2rot = 12 * spreadFactor;

  const b3x = 75 - 25 * spreadFactor;
  const b3y = 68;
  const b3rot = -16 * spreadFactor;

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

        {/* 5. 发白带霜粗壮花茎渐变 (自然温润粉绿/灰白鼠尾草绿) */}
        <linearGradient id="sunflowerStemNaturalGrad" gradientUnits="userSpaceOnUse" x1="40" y1="0" x2="100" y2="0">
          <stop offset="0%" stopColor={stemDark} />
          <stop offset="25%" stopColor={stemSage} />
          <stop offset="55%" stopColor={stemWhiteFrost} />
          <stop offset="80%" stopColor={stemSage} />
          <stop offset="100%" stopColor={stemDark} />
        </linearGradient>
      </defs>

      {/* ─────────────────────────────────────────────────────────────
          发白且有细毛的粗壮多汁花茎 (无叶，瓶口聚集探出，自然毛感光晕)
      ───────────────────────────────────────────────────────────── */}
      <g id="sunflowerFrostStems">
        {/* 枝1 花茎：直通中上正视大花 (b1x, b1y) */}
        <g>
          {/* 主茎圆柱体 */}
          <path
            d={`M 75 125 C 75.6 104, ${b1x + 1} 76, ${b1x} ${b1y + 10}`}
            stroke="url(#sunflowerStemNaturalGrad)"
            strokeWidth="4.6"
            fill="none"
            strokeLinecap="round"
          />
          {/* 表面发白绒霜脊光 */}
          <path
            d={`M 75 124 C 75.6 104, ${b1x + 1} 76, ${b1x} ${b1y + 10}`}
            stroke={stemWhiteFrost}
            strokeWidth="1.5"
            fill="none"
            opacity="0.85"
          />
          {/* 边缘细密白色柔毛微晕 (细毛感，杜绝粗大虚线) */}
          <path
            d={`M 75 124 C 75.6 104, ${b1x + 1} 76, ${b1x} ${b1y + 10}`}
            stroke="#ffffff"
            strokeWidth="5.4"
            fill="none"
            opacity="0.28"
          />
        </g>

        {/* 枝2 花茎：舒展微弧连入右侧大花花托基部 */}
        <g>
          <path
            d={`M ${75 + 2 * spreadFactor} 125 C ${75 + 6 * spreadFactor} 104, ${b2x - 4} 82, ${b2x - 4} ${b2y + 6}`}
            stroke="url(#sunflowerStemNaturalGrad)"
            strokeWidth="4.4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={`M ${75 + 2 * spreadFactor} 125 C ${75 + 6 * spreadFactor} 104, ${b2x - 4} 82, ${b2x - 4} ${b2y + 6}`}
            stroke={stemWhiteFrost}
            strokeWidth="1.4"
            fill="none"
            opacity="0.85"
          />
          <path
            d={`M ${75 + 2 * spreadFactor} 125 C ${75 + 6 * spreadFactor} 104, ${b2x - 4} 82, ${b2x - 4} ${b2y + 6}`}
            stroke="#ffffff"
            strokeWidth="5.2"
            fill="none"
            opacity="0.28"
          />
        </g>

        {/* 枝3 花茎：优美拱弧向左弯折，精准插入侧背花托底心 (b3x, b3y) */}
        <g>
          <path
            d={`M ${75 - 2 * spreadFactor} 125 C ${75 - 8 * spreadFactor} 104, ${b3x + 10} 88, ${b3x} ${b3y}`}
            stroke="url(#sunflowerStemNaturalGrad)"
            strokeWidth="4.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={`M ${75 - 2 * spreadFactor} 125 C ${75 - 8 * spreadFactor} 104, ${b3x + 10} 88, ${b3x} ${b3y}`}
            stroke={stemWhiteFrost}
            strokeWidth="1.4"
            fill="none"
            opacity="0.85"
          />
          <path
            d={`M ${75 - 2 * spreadFactor} 125 C ${75 - 8 * spreadFactor} 104, ${b3x + 10} 88, ${b3x} ${b3y}`}
            stroke="#ffffff"
            strokeWidth="5.3"
            fill="none"
            opacity="0.28"
          />
        </g>
      </g>

      {/* ─────────────────────────────────────────────────────────────
          三朵大向日葵（聚拢高低错落、各有朝向、无叶相杂）
      ───────────────────────────────────────────────────────────── */}
      <g id="sunflowerBlooms">
        {/* 枝3：【侧背向日葵·特大花托】左侧低位，突出展示多层反卷大总苞 */}
        <g transform={`translate(${b3x}, ${b3y}) rotate(${b3rot})`} style={fl3}>
          {renderLeftCalyxSunflower(1.1)}
        </g>

        {/* 枝2：【3/4 侧面向右向日葵】右侧中位，花托花瓣紧密浑然一体 */}
        <g transform={`translate(${b2x}, ${b2y}) rotate(${b2rot})`} style={fl2}>
          {renderRightTiltSunflower(1.14)}
        </g>

        {/* 枝1：【正视盛放向日葵】中上主花，金黄璀璨，压在最上层 */}
        <g transform={`translate(${b1x}, ${b1y}) rotate(${b1rot})`} style={fl1}>
          {renderCenterSunflower(1.18)}
        </g>
      </g>
    </g>
  );
};
