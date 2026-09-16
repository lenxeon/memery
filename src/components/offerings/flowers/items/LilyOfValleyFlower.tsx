/**
 * @file LilyOfValleyFlower.tsx
 * @description 【如意铃兰】
 * 核心特征：
 * 1. 如意铃兰无叶：剔除一切大叶，纯粹展现多支如意玉铃插瓶的雅致幽香；
 * 2. 多支插瓶：五支高低掩映、自然错落的硬挺花葶，群聚于瓶口；
 * 3. 径粗而硬挺、尖部渐细、下深绿上浅绿透嫩黄：
 *    - 基部粗壮有力，至顶端梢头逐渐尖秀纤细；
 *    - 径身施以自底向上深绿 -> 翠绿 -> 浅嫩绿 -> 嫩鹅黄立体圆柱渐变；
 * 4. 花如铃铛倒悬、花多盛开、向外翻卷：
 *    - 洁白玉质钟形花冠，如倒挂羊脂白玉铃铛；
 *    - 盛开花朵钟口显著向外翘卷（6裂翻卷反翘齿缘），显露立体景深与内蕊；
 *    - 梢端挂由大到小的圆润初生花骨朵；
 * 5. 纯正微距影视级光感，剔除粗劣涂抹感，呈现通透晶莹白瓷玉光。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle, getFlowerAgingFilter } from '../utils/lifecycle';

export const VALLEY_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.50, fallSpan: 0.07, startX: 104, startY: 48, landX: 112, landY: 194, rx: 4.6, ry: 4.2, landRot: 25, swayAmp: 14, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.40, fallSpan: 0.06, startX: 42, startY: 52, landX: 38, landY: 193, rx: 4.8, ry: 4.4, landRot: -28, swayAmp: 12, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.28, fallSpan: 0.06, startX: 88, startY: 66, landX: 95, landY: 195, rx: 5.0, ry: 4.5, landRot: -20, swayAmp: 16, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.18, fallSpan: 0.05, startX: 60, startY: 34, landX: 68, landY: 197, rx: 5.2, ry: 4.6, landRot: 35, swayAmp: 18, swayFreq: 4.0 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.04, startX: 52, startY: 72, landX: 58, landY: 196, rx: 4.8, ry: 4.4, landRot: 14, swayAmp: 14, swayFreq: 4.2 },
];

export const LilyOfValleyFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  const agingStyle = getFlowerAgingFilter(health, isFaded);

  // ── 白玉铃铛色调（纯净瓷白至茶褐干枯衰变） ──
  const bellHighlight = lerpColor('#ffffff', '#fcfaf7', dryFactor);
  const bellBodyWhite = lerpColor('#f8fafc', '#ece3d5', dryFactor);
  const bellShadowSoft = lerpColor('#cbd5e1', '#b5a38f', dryFactor);
  const bellShadowDeep = lerpColor('#94a3b8', '#7c6a56', dryFactor);
  const bellInnerCavity = lerpColor('#64748b', '#4e3f32', dryFactor);
  const pistilTender = lerpColor('#d9f99d', '#aba282', dryFactor);

  // ── 花茎自底向上的下深绿、中浅绿、上透嫩黄渐变 ──
  const stemBaseDark = lerpColor('#143d1a', '#2c2918', dryFactor);
  const stemMidGreen = lerpColor('#22c55e', '#525032', dryFactor);
  const stemUpperLight = lerpColor('#86efac', '#8a885e', dryFactor);
  const stemTopTenderYellow = lerpColor('#fef08a', '#c2bb8c', dryFactor);
  const bractTranslucent = lerpColor('#ecfccb', '#beb78e', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.50);
  const fl2 = getBlossomDropStyle(health, 0.40);
  const fl3 = getBlossomDropStyle(health, 0.28);
  const fl4 = getBlossomDropStyle(health, 0.18);
  const fl5 = getBlossomDropStyle(health, 0.08);

  /**
   * 渲染单朵写实如意玉铃花（花如铃铛倒悬、向外翘卷翻裂、晶莹通透光感）
   */
  const renderValleyBell = (r: number = 5.2, rot: number = 0, isOpen: boolean = true) => {
    return (
      <g transform={`rotate(${rot})`}>
        {/* 细小倒悬花梗 (Pedicel) */}
        <path
          d={`M 0 -${r * 1.5} C ${r * 0.8} -${r * 1.5}, ${r * 1.3} -${r * 0.8}, ${r * 0.2} 0`}
          stroke="url(#valleyPedicelGrad)"
          strokeWidth="1.1"
          fill="none"
          strokeLinecap="round"
        />

        {/* 节上微型透明尖苞片 (Bract) */}
        <polygon
          points={`0,-${r * 1.5} ${r * 0.6},-${r * 1.2} ${r * 0.2},-${r * 1.8}`}
          fill={bractTranslucent}
          opacity="0.85"
        />

        {/* 花冠与梗连接点小青蒂 */}
        <circle cx={r * 0.2} cy="0" r="1.1" fill={stemUpperLight} />

        {isOpen ? (
          <g transform={`translate(${r * 0.2}, 0)`}>
            {/* 1. 钟身主体（倒挂圆钟形，自上到下自然膨大，边缘向外显著外翻） */}
            <path
              d={`
                M -${r * 0.35} 0
                C -${r * 0.9} ${r * 0.3}, -${r * 1.25} ${r * 0.9}, -${r * 1.15} ${r * 1.5}
                C -${r * 1.35} ${r * 1.7}, -${r * 1.55} ${r * 1.8}, -${r * 1.45} ${r * 1.95}
                C -${r * 1.0} ${r * 2.2}, ${r * 1.0} ${r * 2.2}, ${r * 1.45} ${r * 1.95}
                C ${r * 1.55} ${r * 1.8}, ${r * 1.35} ${r * 1.7}, ${r * 1.15} ${r * 1.5}
                C ${r * 1.25} ${r * 0.9}, ${r * 0.9} ${r * 0.3}, ${r * 0.35} 0
                Z
              `}
              fill="url(#valleyBellBodyGrad)"
              stroke={bellShadowDeep}
              strokeWidth="0.35"
            />

            {/* 2. 钟口内部深邃阴影与内腔（倒挂微俯视景深） */}
            <ellipse
              cx="0"
              cy={r * 1.82}
              rx={r * 1.18}
              ry={r * 0.38}
              fill="url(#valleyInnerMouthGrad)"
            />

            {/* 3. 钟腔内微露的小黄绿雌雄蕊 (Stigma & Stamens) */}
            <circle cx="0" cy={r * 1.72} r={r * 0.26} fill={pistilTender} />
            <circle cx="-0.8" cy={r * 1.76} r="0.5" fill={bellHighlight} opacity="0.9" />
            <circle cx="0.8" cy={r * 1.76} r="0.5" fill={bellHighlight} opacity="0.9" />

            {/* 4. 钟口前缘标志性 6 枚外翻卷翘花瓣裂片（向外向上翻卷，极具真实光感） */}
            {/* 左侧外翻尖 */}
            <path
              d={`M -${r * 1.4} ${r * 1.8} Q -${r * 1.6} ${r * 1.9} -${r * 1.2} ${r * 2.05} Q -${r * 0.9} ${r * 2.15} -${r * 0.75} ${r * 1.85}`}
              fill="url(#valleyLobeGrad)"
              stroke={bellShadowSoft}
              strokeWidth="0.32"
            />
            {/* 中左翻卷尖 */}
            <path
              d={`M -${r * 0.75} ${r * 1.85} Q -${r * 0.5} ${r * 2.22} -${r * 0.25} ${r * 2.05} Q 0 ${r * 1.9} 0 ${r * 1.82}`}
              fill="url(#valleyLobeGrad)"
              stroke={bellShadowSoft}
              strokeWidth="0.32"
            />
            {/* 中右翻卷尖 */}
            <path
              d={`M 0 ${r * 1.82} Q ${r * 0.25} ${r * 2.22} ${r * 0.5} ${r * 2.05} Q ${r * 0.75} ${r * 1.9} ${r * 0.75} ${r * 1.85}`}
              fill="url(#valleyLobeGrad)"
              stroke={bellShadowSoft}
              strokeWidth="0.32"
            />
            {/* 右侧外翻尖 */}
            <path
              d={`M ${r * 0.75} ${r * 1.85} Q ${r * 0.9} ${r * 2.15} ${r * 1.2} ${r * 2.05} Q ${r * 1.6} ${r * 1.9} ${r * 1.4} ${r * 1.8}`}
              fill="url(#valleyLobeGrad)"
              stroke={bellShadowSoft}
              strokeWidth="0.32"
            />

            {/* 5. 钟身瓷质高光与反光线（微距高级视频光感） */}
            <path
              d={`M -${r * 0.5} ${r * 0.35} C -${r * 0.8} ${r * 0.8}, -${r * 0.6} ${r * 1.4}, -${r * 0.4} ${r * 1.65}`}
              stroke="#ffffff"
              strokeWidth="0.75"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />
            <circle cx={-r * 0.35} cy={r * 0.65} r={r * 0.32} fill="#ffffff" opacity="0.85" />
            {/* 右侧微弱边缘反光 */}
            <path
              d={`M ${r * 0.7} ${r * 0.5} C ${r * 0.95} ${r * 0.9}, ${r * 0.85} ${r * 1.3}, ${r * 0.65} ${r * 1.5}`}
              stroke="#ffffff"
              strokeWidth="0.4"
              strokeLinecap="round"
              fill="none"
              opacity="0.65"
            />
          </g>
        ) : (
          /* 顶端未开的小花骨朵（饱满浑圆白青小珠） */
          <g transform={`translate(${r * 0.2}, 0)`}>
            <path
              d={`M -${r * 0.4} 0 C -${r * 0.9} ${r * 0.4}, -${r * 0.9} ${r * 1.1}, 0 ${r * 1.45} C ${r * 0.9} ${r * 1.1}, ${r * 0.9} ${r * 0.4}, ${r * 0.4} 0 Z`}
              fill="url(#valleyBudGrad)"
              stroke={bellShadowDeep}
              strokeWidth="0.35"
            />
            {/* 顶端紧闭闭合纵线 */}
            <path d={`M 0 0 L 0 ${r * 1.4}`} stroke={stemUpperLight} strokeWidth="0.35" opacity="0.8" />
            <circle cx={-r * 0.25} cy={r * 0.45} r={r * 0.22} fill="#ffffff" opacity="0.85" />
          </g>
        )}
      </g>
    );
  };

  return (
    <g id="lilyOfValleyFlora" style={agingStyle}>
      <defs>
        {/* 1. 钟身立体瓷白径向渐变 */}
        <radialGradient id="valleyBellBodyGrad" cx="30%" cy="30%" r="75%">
          <stop offset="0%" stopColor={bellHighlight} />
          <stop offset="45%" stopColor={bellBodyWhite} />
          <stop offset="80%" stopColor={bellShadowSoft} />
          <stop offset="100%" stopColor={bellShadowDeep} />
        </radialGradient>

        {/* 2. 钟口内腔深色阴影渐变 */}
        <linearGradient id="valleyInnerMouthGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={bellInnerCavity} />
          <stop offset="60%" stopColor={bellShadowDeep} />
          <stop offset="100%" stopColor={bellBodyWhite} />
        </linearGradient>

        {/* 3. 翻卷裂片光泽渐变 */}
        <linearGradient id="valleyLobeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={bellHighlight} />
          <stop offset="60%" stopColor={bellBodyWhite} />
          <stop offset="100%" stopColor={bellShadowSoft} />
        </linearGradient>

        {/* 4. 梢头花骨朵青白渐变 */}
        <radialGradient id="valleyBudGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor={bellHighlight} />
          <stop offset="50%" stopColor={stemTopTenderYellow} />
          <stop offset="90%" stopColor={stemUpperLight} />
          <stop offset="100%" stopColor={stemMidGreen} />
        </radialGradient>

        {/* 5. 主花茎垂直线性渐变：下深绿上浅绿透嫩黄 */}
        <linearGradient id="valleyStemVerticalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={stemBaseDark} />
          <stop offset="35%" stopColor={stemMidGreen} />
          <stop offset="75%" stopColor={stemUpperLight} />
          <stop offset="100%" stopColor={stemTopTenderYellow} />
        </linearGradient>

        {/* 6. 小花梗嫩黄绿渐变 */}
        <linearGradient id="valleyPedicelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={stemTopTenderYellow} />
          <stop offset="100%" stopColor={stemUpperLight} />
        </linearGradient>
      </defs>

      {/* ── 架构 1：五支硬挺花葶多支插瓶（粗而硬挺、尖部渐细、下深绿上浅绿透嫩黄，无任何大绿叶） ── */}
      <g id="valleyHardStems">
        {/* 支 1【中央高挑主支】瓶口直插高位 (75,125) -> (58,16)，雄浑挺拔 */}
        <path
          d="M 75 125 C 75 98, 76 68, 72 44 C 70 32, 65 22, 58 16"
          stroke="url(#valleyStemVerticalGrad)"
          strokeWidth="3.2"
          fill="none"
          strokeLinecap="round"
        />

        {/* 支 2【右侧主华丽拱支】瓶口右偏高位 (77,125) -> (104,26)，舒展大气 */}
        <path
          d="M 77 125 C 78 100, 84 72, 94 50 C 99 38, 103 30, 106 24"
          stroke="url(#valleyStemVerticalGrad)"
          strokeWidth="3.0"
          fill="none"
          strokeLinecap="round"
        />

        {/* 支 3【左侧丰满长侧支】瓶口左挑 (73,125) -> (36,36)，优雅垂展 */}
        <path
          d="M 73 125 C 72 102, 66 78, 54 56 C 47 46, 40 40, 34 36"
          stroke="url(#valleyStemVerticalGrad)"
          strokeWidth="2.8"
          fill="none"
          strokeLinecap="round"
        />

        {/* 支 4【右中景深衬支】瓶口右斜 (76,125) -> (90,48)，充实层次 */}
        <path
          d="M 76 125 C 77 106, 80 84, 86 66 C 88 58, 90 52, 90 46"
          stroke="url(#valleyStemVerticalGrad)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* 支 5【左中近景小支】瓶口向左前展开 (74,125) -> (52,56)，丰满中下盘 */}
        <path
          d="M 74 125 C 74 108, 70 90, 64 74 C 60 66, 56 60, 52 54"
          stroke="url(#valleyStemVerticalGrad)"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* ── 架构 2：如意铃铛倒悬花群（盛开外翻铃铛 + 梢头紧致小花骨朵，多花密集） ── */}
      <g id="valleyBellsCluster">
        {/* ── 支 1 花群【中央高枝·长串垂铃】 ── */}
        <g id="valleyStem1Blooms" style={fl4}>
          {/* 梢头微型花骨朵 */}
          <g transform="translate(56, 17)">{renderValleyBell(3.2, -35, false)}</g>
          {/* 梢端初绽小铃 */}
          <g transform="translate(60, 24)">{renderValleyBell(4.2, -25, true)}</g>
          {/* 顺次向下盛开外翻大玉铃 */}
          <g transform="translate(65, 33)">{renderValleyBell(5.0, -18, true)}</g>
          <g transform="translate(69, 44)">{renderValleyBell(5.4, -10, true)}</g>
          <g transform="translate(73, 56)">{renderValleyBell(5.6, -2, true)}</g>
          <g transform="translate(74, 70)">{renderValleyBell(5.8, 6, true)}</g>
        </g>

        {/* ── 支 2 花群【右主拱枝·华丽倒悬】 ── */}
        <g id="valleyStem2Blooms" style={fl1}>
          {/* 梢端圆润花骨朵 */}
          <g transform="translate(108, 26)">{renderValleyBell(3.4, 42, false)}</g>
          {/* 顺次向下倒悬大玉铃 */}
          <g transform="translate(104, 34)">{renderValleyBell(4.4, 32, true)}</g>
          <g transform="translate(98, 44)">{renderValleyBell(5.2, 24, true)}</g>
          <g transform="translate(92, 56)">{renderValleyBell(5.6, 16, true)}</g>
          <g transform="translate(86, 70)">{renderValleyBell(5.8, 10, true)}</g>
          <g transform="translate(81, 84)">{renderValleyBell(5.5, 4, true)}</g>
        </g>

        {/* ── 支 3 花群【左侧垂枝·翩然倒悬】 ── */}
        <g id="valleyStem3Blooms" style={fl2}>
          {/* 梢端花骨朵 */}
          <g transform="translate(32, 38)">{renderValleyBell(3.3, -48, false)}</g>
          {/* 顺次向下外翻玉铃 */}
          <g transform="translate(38, 45)">{renderValleyBell(4.4, -36, true)}</g>
          <g transform="translate(46, 55)">{renderValleyBell(5.2, -26, true)}</g>
          <g transform="translate(54, 67)">{renderValleyBell(5.5, -16, true)}</g>
          <g transform="translate(63, 80)">{renderValleyBell(5.6, -8, true)}</g>
        </g>

        {/* ── 支 4 花群【右中景深枝·玲珑玉串】 ── */}
        <g id="valleyStem4Blooms" style={fl3}>
          {/* 顶端小骨朵 */}
          <g transform="translate(92, 48)">{renderValleyBell(3.2, 30, false)}</g>
          {/* 盛开铃铛 */}
          <g transform="translate(88, 57)">{renderValleyBell(4.6, 20, true)}</g>
          <g transform="translate(84, 68)">{renderValleyBell(5.2, 12, true)}</g>
          <g transform="translate(80, 80)">{renderValleyBell(5.4, 6, true)}</g>
        </g>

        {/* ── 支 5 花群【左中近景枝·娇美初放】 ── */}
        <g id="valleyStem5Blooms" style={fl5}>
          {/* 顶端小骨朵 */}
          <g transform="translate(50, 56)">{renderValleyBell(3.2, -26, false)}</g>
          {/* 盛开铃铛 */}
          <g transform="translate(56, 65)">{renderValleyBell(4.8, -18, true)}</g>
          <g transform="translate(62, 76)">{renderValleyBell(5.2, -10, true)}</g>
          <g transform="translate(68, 88)">{renderValleyBell(5.4, -4, true)}</g>
        </g>
      </g>
    </g>
  );
};

