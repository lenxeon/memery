/**
 * @file OrchidsFlower.tsx
 * @description 【空谷幽兰 / 素兰蝴蝶兰】
 * 核心特征：
 * 1. 素兰无叶：剔除一切杂叶，展现文人雅供“一枝独秀、清冷出尘”的纯粹花葶之美；
 * 2. 径硬挺韧：深褐青色硬挺花葶，带天然竹节状花梗节点，线条遒劲流畅；
 * 3. 一径多花成串、大小各异：
 *    - 靠近底部（花序基部）花朵硕大饱满，花瓣舒展如飞蝶；
 *    - 沿花序向前依次递减变小（大花 -> 中花 -> 初绽小花）；
 *    - 前端梢头为一串由大到小的青紫未开放花骨朵；
 * 4. 花朵质感写实：艳丽华贵的玫紫渐变翼瓣，洁白微鹅黄双须蝶唇，立体生动。
 */
import React from 'react';
import { FlowerComponentProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle, getFlowerAgingFilter } from '../utils/lifecycle';

export const ORCHID_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.50, fallSpan: 0.07, startX: 84, startY: 78, landX: 92, landY: 194, rx: 6.3, ry: 4.3, landRot: 28, swayAmp: 14, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.38, fallSpan: 0.06, startX: 68, startY: 58, landX: 60, landY: 193, rx: 6.1, ry: 4.1, landRot: -30, swayAmp: 12, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.22, fallSpan: 0.06, startX: 56, startY: 40, landX: 50, landY: 195, rx: 5.6, ry: 3.8, landRot: 20, swayAmp: 16, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.10, fallSpan: 0.05, startX: 44, startY: 26, landX: 42, landY: 196, rx: 5.0, ry: 3.4, landRot: -18, swayAmp: 15, swayFreq: 4.0 },
];

export const OrchidsFlower: React.FC<FlowerComponentProps> = ({ health, dryFactor, isFaded }) => {
  const agingStyle = getFlowerAgingFilter(health, isFaded);

  // ── 兰花华贵紫红至枯萎茶褐衰变 ──
  const petalEdgeLight = lerpColor('#f5d0fe', '#ebd8c2', dryFactor);
  const petalMidMagenta = lerpColor('#d946ef', '#b07a65', dryFactor);
  const petalRichViolet = lerpColor('#a21caf', '#784638', dryFactor);
  const petalDeepShadow = lerpColor('#701a75', '#45251d', dryFactor);

  // ── 兰花唇瓣与蕊柱（白底鹅黄、深红斑纹） ──
  const lipWhite = lerpColor('#ffffff', '#f1e6d4', dryFactor);
  const lipYellow = lerpColor('#facc15', '#b8924b', dryFactor);
  const lipRedSpots = lerpColor('#9f1239', '#5c2222', dryFactor);
  const columnPollen = lerpColor('#fef08a', '#d4be8a', dryFactor);

  // ── 硬挺花葶枝茎（暗橄榄褐青色，木质化硬韧） ──
  const stemDark = lerpColor('#1f2918', '#382b1c', dryFactor);
  const stemMid = lerpColor('#3f4e29', '#5c462e', dryFactor);
  const stemLight = lerpColor('#657c3d', '#856e4c', dryFactor);
  const nodeBract = lerpColor('#78350f', '#4d2b17', dryFactor);

  // ── 花骨朵青紫渐变 ──
  const budGreen = lerpColor('#4d7c0f', '#5e5234', dryFactor);
  const budPurple = lerpColor('#86198f', '#6b403a', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.50);
  const fl2 = getBlossomDropStyle(health, 0.38);
  const fl3 = getBlossomDropStyle(health, 0.22);
  const fl4 = getBlossomDropStyle(health, 0.10);

  /**
   * 渲染单朵写实蝴蝶兰（宽大圆润翼瓣 + 三枚外萼片 + 悬垂金黄双须唇瓣）
   */
  const renderOrchidBloom = (scale: number = 1.0, rot: number = 0) => {
    return (
      <g transform={`rotate(${rot}) scale(${scale})`}>
        {/* 1. 后层外轮三枚萼片 (Sepals) */}
        {/* 中萼片（正上方直挺） */}
        <path
          d="M 0 -2 C -5 -9, -7 -17, 0 -21 C 7 -17, 5 -9, 0 -2 Z"
          fill="url(#orchidSepalGrad)"
          stroke={petalDeepShadow}
          strokeWidth="0.35"
        />
        {/* 左下侧萼片 */}
        <path
          d="M -2 2 C -8 7, -15 14, -13 20 C -7 21, -2 13, -1 2 Z"
          fill="url(#orchidSepalGrad)"
          stroke={petalDeepShadow}
          strokeWidth="0.35"
        />
        {/* 右下侧萼片 */}
        <path
          d="M 2 2 C 8 7, 15 14, 13 20 C 7 21, 2 13, 1 2 Z"
          fill="url(#orchidSepalGrad)"
          stroke={petalDeepShadow}
          strokeWidth="0.35"
        />

        {/* 2. 中层内轮两大圆润翼瓣（蝴蝶阔翅，质感丰腴） */}
        {/* 左大翼瓣 */}
        <g>
          <path
            d="M -2 -1 C -10 -9, -21 -5, -23 4 C -24 13, -13 15, -2 3 Z"
            fill="url(#orchidPetalGrad)"
            stroke={petalDeepShadow}
            strokeWidth="0.38"
          />
          {/* 瓣面放射状微细脉纹与丝绒反光 */}
          <path d="M -2 0 C -9 -3, -16 1, -19 5" stroke={petalEdgeLight} strokeWidth="0.4" fill="none" opacity="0.6" />
          <path d="M -2 1 C -8 3, -14 7, -17 11" stroke={petalEdgeLight} strokeWidth="0.35" fill="none" opacity="0.5" />
        </g>
        {/* 右大翼瓣 */}
        <g>
          <path
            d="M 2 -1 C 10 -9, 21 -5, 23 4 C 24 13, 13 15, 2 3 Z"
            fill="url(#orchidPetalGrad)"
            stroke={petalDeepShadow}
            strokeWidth="0.38"
          />
          {/* 瓣面放射状微细脉纹与丝绒反光 */}
          <path d="M 2 0 C 9 -3, 16 1, 19 5" stroke={petalEdgeLight} strokeWidth="0.4" fill="none" opacity="0.6" />
          <path d="M 2 1 C 8 3, 14 7, 17 11" stroke={petalEdgeLight} strokeWidth="0.35" fill="none" opacity="0.5" />
        </g>

        {/* 3. 前层标志性素兰唇瓣 (Labellum) */}
        {/* 侧裂片（深红与金黄内衬） */}
        <path
          d="M -4 2 C -7 5, -5 9, -1 8 C -2 5, -3 3, -4 2 Z"
          fill={lipYellow}
          stroke={lipRedSpots}
          strokeWidth="0.3"
        />
        <path
          d="M 4 2 C 7 5, 5 9, 1 8 C 2 5, 3 3, 4 2 Z"
          fill={lipYellow}
          stroke={lipRedSpots}
          strokeWidth="0.3"
        />

        {/* 中裂片（纯白底染鹅黄，带双丝状弯曲胡须） */}
        <path
          d="M -3 6 C -5 11, -3 16, 0 17.5 C 3 16, 5 11, 3 6 Z"
          fill="url(#orchidLipGrad)"
          stroke={lipRedSpots}
          strokeWidth="0.35"
        />
        {/* 唇端双弯须 (Cirri) */}
        <path d="M -0.8 17 C -2.5 19, -4.5 19, -3.8 17" stroke={lipWhite} strokeWidth="0.5" fill="none" strokeLinecap="round" />
        <path d="M 0.8 17 C 2.5 19, 4.5 19, 3.8 17" stroke={lipWhite} strokeWidth="0.5" fill="none" strokeLinecap="round" />

        {/* 喉部红斑点彩 */}
        <circle cx="-1.2" cy="7" r="0.45" fill={lipRedSpots} />
        <circle cx="0" cy="8" r="0.5" fill={lipRedSpots} />
        <circle cx="1.2" cy="7" r="0.45" fill={lipRedSpots} />
        <circle cx="-0.8" cy="10" r="0.4" fill={lipRedSpots} />
        <circle cx="0.8" cy="10" r="0.4" fill={lipRedSpots} />

        {/* 4. 核心蕊柱 (Column) */}
        <ellipse cx="0" cy="2.2" rx="2.0" ry="2.6" fill={lipWhite} stroke={petalDeepShadow} strokeWidth="0.25" />
        <circle cx="0" cy="1.2" r="1.1" fill={columnPollen} />
      </g>
    );
  };

  /**
   * 渲染前端未开放的花骨朵（饱满青紫水滴形，带合拢萼缝）
   */
  const renderOrchidBud = (scale: number = 1.0, rot: number = 0) => {
    return (
      <g transform={`rotate(${rot}) scale(${scale})`}>
        {/* 饱满花蕾主体 */}
        <path
          d="M 0 0 C -4.5 -3.5, -5.5 -10, 0 -14 C 5.5 -10, 4.5 -3.5, 0 0 Z"
          fill="url(#orchidBudGrad)"
          stroke={stemDark}
          strokeWidth="0.35"
        />
        {/* 萼片合拢纵缝线 */}
        <path d="M 0 0 L 0 -13.5" stroke={petalDeepShadow} strokeWidth="0.4" opacity="0.8" />
        {/* 侧萼微拱线 */}
        <path d="M -1.8 -4 C -2.8 -8, -1.8 -11, 0 -13" stroke={budGreen} strokeWidth="0.3" fill="none" opacity="0.7" />
        <path d="M 1.8 -4 C 2.8 -8, 1.8 -11, 0 -13" stroke={budGreen} strokeWidth="0.3" fill="none" opacity="0.7" />
      </g>
    );
  };

  return (
    <g id="orchidsFlora" style={agingStyle}>
      <defs>
        {/* 1. 蝴蝶兰大花瓣（翼瓣）柔润紫红立体渐变 */}
        <radialGradient id="orchidPetalGrad" cx="15%" cy="15%" r="85%">
          <stop offset="0%" stopColor={petalEdgeLight} />
          <stop offset="35%" stopColor={petalMidMagenta} />
          <stop offset="80%" stopColor={petalRichViolet} />
          <stop offset="100%" stopColor={petalDeepShadow} />
        </radialGradient>

        {/* 2. 三枚外萼片透光紫红渐变 */}
        <linearGradient id="orchidSepalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={petalEdgeLight} />
          <stop offset="45%" stopColor={petalMidMagenta} />
          <stop offset="100%" stopColor={petalDeepShadow} />
        </linearGradient>

        {/* 3. 兰花唇瓣白黄渐变 */}
        <linearGradient id="orchidLipGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={lipYellow} />
          <stop offset="45%" stopColor={lipWhite} />
          <stop offset="100%" stopColor={petalEdgeLight} />
        </linearGradient>

        {/* 4. 硬挺花葶枝茎圆柱渐变 */}
        <linearGradient id="orchidHardStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={stemDark} />
          <stop offset="50%" stopColor={stemLight} />
          <stop offset="100%" stopColor={stemDark} />
        </linearGradient>

        {/* 5. 花骨朵青紫渐变 */}
        <linearGradient id="orchidBudGrad" x1="0%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor={budGreen} />
          <stop offset="40%" stopColor={budPurple} />
          <stop offset="85%" stopColor={petalRichViolet} />
          <stop offset="100%" stopColor={petalEdgeLight} />
        </linearGradient>
      </defs>

      {/* ── 整个素兰花序与挺韧花茎在风中起伏摇曳（以瓶口 75px 125px 为旋转锚点） ── */}
      <g className="animate-sway-woody-stem" style={{ transformOrigin: '75px 125px' }}>
        {/* ── 架构 1：深褐青色硬挺花葶与小花梗（硬径遒劲、一径贯通、带竹节小苞） ── */}
        <g id="orchidHardStemSpike">
          {/* A. 主硬径：自瓶口 (75,125) 挺韧拔起，向左上方优雅拱折延伸至前端 (15,28) */}
          <path
            d="M 75 125 C 75 106, 76 92, 75 78 C 74 65, 71 52, 63 38 C 55 24, 42 16, 28 18 C 22 19, 18 22, 14 28"
            stroke="url(#orchidHardStemGrad)"
            strokeWidth="2.7"
            fill="none"
            strokeLinecap="round"
          />

          {/* B. 各朵花的小着生柄 (Pedicels) 与花茎节点 */}
          {/* 节点 1：主茎 (75,80) 连向花 1 (82,82) */}
          <path d="M 75 80 Q 78 81 82 82" stroke="url(#orchidHardStemGrad)" strokeWidth="1.6" fill="none" />
          <ellipse cx="75" cy="80" rx="1.6" ry="1.0" fill={nodeBract} />

          {/* 节点 2：主茎 (74,62) 连向花 2 (67,63) */}
          <path d="M 74 62 Q 71 62.5 67 63" stroke="url(#orchidHardStemGrad)" strokeWidth="1.6" fill="none" />
          <ellipse cx="74" cy="62" rx="1.5" ry="1.0" fill={nodeBract} />

          {/* 节点 3：主茎 (67,46) 连向花 3 (57,45) */}
          <path d="M 67 46 Q 62 45.5 57 45" stroke="url(#orchidHardStemGrad)" strokeWidth="1.5" fill="none" />
          <ellipse cx="67" cy="46" rx="1.5" ry="0.9" fill={nodeBract} />

          {/* 节点 4：主茎 (55,30) 连向花 4 (45,28) */}
          <path d="M 55 30 Q 50 29 45 28" stroke="url(#orchidHardStemGrad)" strokeWidth="1.4" fill="none" />
          <ellipse cx="55" cy="30" rx="1.4" ry="0.8" fill={nodeBract} />

          {/* 节点 5：主茎 (44,20) 连向花 5 (35,17) */}
          <path d="M 44 20 Q 39 18.5 35 17" stroke="url(#orchidHardStemGrad)" strokeWidth="1.3" fill="none" />
          <ellipse cx="44" cy="20" rx="1.3" ry="0.8" fill={nodeBract} />

          {/* 节点 6：花骨朵 1 小花梗 (32,17) -> (26,12) */}
          <path d="M 32 17 Q 29 14 26 12" stroke="url(#orchidHardStemGrad)" strokeWidth="1.2" fill="none" />

          {/* 节点 7：花骨朵 2 小花梗 (24,19) -> (19,16) */}
          <path d="M 24 19 Q 21 17 19 16" stroke="url(#orchidHardStemGrad)" strokeWidth="1.1" fill="none" />

          {/* 节点 8：花骨朵 3 小花梗 (18,22) -> (14,21) */}
          <path d="M 18 22 Q 16 21.5 14 21" stroke="url(#orchidHardStemGrad)" strokeWidth="1.0" fill="none" />
        </g>

        {/* ── 架构 2：一径多花成串，自基部向前端由大渐小（附着点轻柔微风颤动） ── */}
        <g id="orchidBloomsRaceme">
          {/* 1. 【基部第一朵·最大盛开花】(x:82, y:82)：靠近底部花朵最大（scale: 1.12），饱满盛放俯展 */}
          <g style={fl1} transform="translate(82, 82)">
            <g className="animate-flower-sway-main-gentle" style={{ transformOrigin: '0px 0px' }}>
              {renderOrchidBloom(1.12, 15)}
            </g>
          </g>

          {/* 2. 【中下部第二朵·盛开大花】(x:67, y:63)：次大朵（scale: 1.00），向左微仰 */}
          <g style={fl2} transform="translate(67, 63)">
            <g className="animate-flower-sway-left-gentle" style={{ transformOrigin: '0px 0px' }}>
              {renderOrchidBloom(1.00, -12)}
            </g>
          </g>

          {/* 3. 【中高部第三朵·端庄中花】(x:57, y:45)：中型朵（scale: 0.86），翩跹若飞 */}
          <g style={fl3} transform="translate(57, 45)">
            <g className="animate-flower-sway-crown-gentle" style={{ transformOrigin: '0px 0px' }}>
              {renderOrchidBloom(0.86, -20)}
            </g>
          </g>

          {/* 4. 【前段第四朵·初绽小花】(x:45, y:28)：逐渐缩小（scale: 0.70），初舒羽翼 */}
          <g style={fl4} transform="translate(45, 28)">
            <g className="animate-flower-sway-right-gentle" style={{ transformOrigin: '0px 0px' }}>
              {renderOrchidBloom(0.70, -28)}
            </g>
          </g>

          {/* 5. 【前端第五朵·含苞微吐小花】(x:35, y:17)：小巧玲珑（scale: 0.56），半开掩映 */}
          <g transform="translate(35, 17)">
            <g className="animate-flower-sway-bud-gentle" style={{ transformOrigin: '0px 0px' }}>
              {renderOrchidBloom(0.56, -35)}
            </g>
          </g>

          {/* ── 前端未开放的花骨朵（依次递减变小） ── */}
          {/* 6. 【前端大蕾】(x:26, y:12)：充实饱满的青紫花骨朵 (scale: 0.47) */}
          <g transform="translate(26, 12)">
            <g className="animate-flower-sway-bud-gentle" style={{ transformOrigin: '0px 0px' }}>
              {renderOrchidBud(0.47, -45)}
            </g>
          </g>

          {/* 7. 【前端中蕾】(x:19, y:16)：紧致微翘小蕾 (scale: 0.36) */}
          <g transform="translate(19, 16)">
            <g className="animate-flower-sway-bud-gentle" style={{ transformOrigin: '0px 0px' }}>
              {renderOrchidBud(0.36, -60)}
            </g>
          </g>

          {/* 8. 【前端初生嫩蕾】(x:14, y:21)：精巧青绿小蕾 (scale: 0.27) */}
          <g transform="translate(14, 21)">
            <g className="animate-flower-sway-bud-gentle" style={{ transformOrigin: '0px 0px' }}>
              {renderOrchidBud(0.27, -78)}
            </g>
          </g>

          {/* 9. 【极梢微型苞尖】(x:11, y:29)：梢头初生细蕾 (scale: 0.20) */}
          <g transform="translate(11, 29)">
            <g className="animate-flower-sway-bud-gentle" style={{ transformOrigin: '0px 0px' }}>
              {renderOrchidBud(0.20, -95)}
            </g>
          </g>
        </g>
      </g>
    </g>
  );
};

