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
import { FlowerRenderProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle, getFlowerAgingFilter } from '../utils/lifecycle';

export const ORCHID_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.50, fallSpan: 0.07, startX: 84, startY: 78, landX: 92, landY: 194, rx: 6.3, ry: 4.3, landRot: 28, swayAmp: 14, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.38, fallSpan: 0.06, startX: 68, startY: 58, landX: 60, landY: 193, rx: 6.1, ry: 4.1, landRot: -30, swayAmp: 12, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.22, fallSpan: 0.06, startX: 56, startY: 40, landX: 50, landY: 195, rx: 5.6, ry: 3.8, landRot: 20, swayAmp: 16, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.10, fallSpan: 0.05, startX: 44, startY: 26, landX: 42, landY: 196, rx: 5.0, ry: 3.4, landRot: -18, swayAmp: 15, swayFreq: 4.0 },
];

export const renderOrchidsFlower = (props: FlowerRenderProps): string => {
  const { health, dryFactor, isFaded } = props;
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
      `<g transform="${`rotate(${rot}) scale(${scale})`}">
        
        
        <path d="M 0 -2 C -5 -9, -7 -17, 0 -21 C 7 -17, 5 -9, 0 -2 Z" fill="url(#orchidSepalGrad)" stroke="${petalDeepShadow}" stroke-width="0.35" />
        
        <path d="M -2 2 C -8 7, -15 14, -13 20 C -7 21, -2 13, -1 2 Z" fill="url(#orchidSepalGrad)" stroke="${petalDeepShadow}" stroke-width="0.35" />
        
        <path d="M 2 2 C 8 7, 15 14, 13 20 C 7 21, 2 13, 1 2 Z" fill="url(#orchidSepalGrad)" stroke="${petalDeepShadow}" stroke-width="0.35" />

        
        
        <g>
          <path d="M -2 -1 C -10 -9, -21 -5, -23 4 C -24 13, -13 15, -2 3 Z" fill="url(#orchidPetalGrad)" stroke="${petalDeepShadow}" stroke-width="0.38" />
          
          <path d="M -2 0 C -9 -3, -16 1, -19 5" stroke="${petalEdgeLight}" stroke-width="0.4" fill="none" opacity="0.6" />
          <path d="M -2 1 C -8 3, -14 7, -17 11" stroke="${petalEdgeLight}" stroke-width="0.35" fill="none" opacity="0.5" />
        </g>
        
        <g>
          <path d="M 2 -1 C 10 -9, 21 -5, 23 4 C 24 13, 13 15, 2 3 Z" fill="url(#orchidPetalGrad)" stroke="${petalDeepShadow}" stroke-width="0.38" />
          
          <path d="M 2 0 C 9 -3, 16 1, 19 5" stroke="${petalEdgeLight}" stroke-width="0.4" fill="none" opacity="0.6" />
          <path d="M 2 1 C 8 3, 14 7, 17 11" stroke="${petalEdgeLight}" stroke-width="0.35" fill="none" opacity="0.5" />
        </g>

        
        
        <path d="M -4 2 C -7 5, -5 9, -1 8 C -2 5, -3 3, -4 2 Z" fill="${lipYellow}" stroke="${lipRedSpots}" stroke-width="0.3" />
        <path d="M 4 2 C 7 5, 5 9, 1 8 C 2 5, 3 3, 4 2 Z" fill="${lipYellow}" stroke="${lipRedSpots}" stroke-width="0.3" />

        
        <path d="M -3 6 C -5 11, -3 16, 0 17.5 C 3 16, 5 11, 3 6 Z" fill="url(#orchidLipGrad)" stroke="${lipRedSpots}" stroke-width="0.35" />
        
        <path d="M -0.8 17 C -2.5 19, -4.5 19, -3.8 17" stroke="${lipWhite}" stroke-width="0.5" fill="none" stroke-linecap="round" />
        <path d="M 0.8 17 C 2.5 19, 4.5 19, 3.8 17" stroke="${lipWhite}" stroke-width="0.5" fill="none" stroke-linecap="round" />

        
        <circle cx="-1.2" cy="7" r="0.45" fill="${lipRedSpots}" />
        <circle cx="0" cy="8" r="0.5" fill="${lipRedSpots}" />
        <circle cx="1.2" cy="7" r="0.45" fill="${lipRedSpots}" />
        <circle cx="-0.8" cy="10" r="0.4" fill="${lipRedSpots}" />
        <circle cx="0.8" cy="10" r="0.4" fill="${lipRedSpots}" />

        
        <ellipse cx="0" cy="2.2" rx="2.0" ry="2.6" fill="${lipWhite}" stroke="${petalDeepShadow}" stroke-width="0.25" />
        <circle cx="0" cy="1.2" r="1.1" fill="${columnPollen}" />
      </g>`
    );
  };

  /**
   * 渲染前端未开放的花骨朵（饱满青紫水滴形，带合拢萼缝）
   */
  const renderOrchidBud = (scale: number = 1.0, rot: number = 0) => {
    return (
      `<g transform="${`rotate(${rot}) scale(${scale})`}">
        
        <path d="M 0 0 C -4.5 -3.5, -5.5 -10, 0 -14 C 5.5 -10, 4.5 -3.5, 0 0 Z" fill="url(#orchidBudGrad)" stroke="${stemDark}" stroke-width="0.35" />
        
        <path d="M 0 0 L 0 -13.5" stroke="${petalDeepShadow}" stroke-width="0.4" opacity="0.8" />
        
        <path d="M -1.8 -4 C -2.8 -8, -1.8 -11, 0 -13" stroke="${budGreen}" stroke-width="0.3" fill="none" opacity="0.7" />
        <path d="M 1.8 -4 C 2.8 -8, 1.8 -11, 0 -13" stroke="${budGreen}" stroke-width="0.3" fill="none" opacity="0.7" />
      </g>`
    );
  };

  return (
    `<g id="orchidsFlora" style="${agingStyle}">
      <defs>
        
        <radialGradient id="orchidPetalGrad" cx="15%" cy="15%" r="85%">
          <stop offset="0%" stop-color="${petalEdgeLight}" />
          <stop offset="35%" stop-color="${petalMidMagenta}" />
          <stop offset="80%" stop-color="${petalRichViolet}" />
          <stop offset="100%" stop-color="${petalDeepShadow}" />
        </radialGradient>

        
        <linearGradient id="orchidSepalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${petalEdgeLight}" />
          <stop offset="45%" stop-color="${petalMidMagenta}" />
          <stop offset="100%" stop-color="${petalDeepShadow}" />
        </linearGradient>

        
        <linearGradient id="orchidLipGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${lipYellow}" />
          <stop offset="45%" stop-color="${lipWhite}" />
          <stop offset="100%" stop-color="${petalEdgeLight}" />
        </linearGradient>

        
        <linearGradient id="orchidHardStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${stemDark}" />
          <stop offset="50%" stop-color="${stemLight}" />
          <stop offset="100%" stop-color="${stemDark}" />
        </linearGradient>

        
        <linearGradient id="orchidBudGrad" x1="0%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stop-color="${budGreen}" />
          <stop offset="40%" stop-color="${budPurple}" />
          <stop offset="85%" stop-color="${petalRichViolet}" />
          <stop offset="100%" stop-color="${petalEdgeLight}" />
        </linearGradient>
      </defs>

      
      <g class="animate-sway-woody-stem" style="transform-origin: ${'75px 125px'};">
        
        <g id="orchidHardStemSpike">
          
          <path d="M 75 125 C 75 106, 76 92, 75 78 C 74 65, 71 52, 63 38 C 55 24, 42 16, 28 18 C 22 19, 18 22, 14 28" stroke="url(#orchidHardStemGrad)" stroke-width="2.7" fill="none" stroke-linecap="round" />

          
          
          <path d="M 75 80 Q 78 81 82 82" stroke="url(#orchidHardStemGrad)" stroke-width="1.6" fill="none" />
          <ellipse cx="75" cy="80" rx="1.6" ry="1.0" fill="${nodeBract}" />

          
          <path d="M 74 62 Q 71 62.5 67 63" stroke="url(#orchidHardStemGrad)" stroke-width="1.6" fill="none" />
          <ellipse cx="74" cy="62" rx="1.5" ry="1.0" fill="${nodeBract}" />

          
          <path d="M 67 46 Q 62 45.5 57 45" stroke="url(#orchidHardStemGrad)" stroke-width="1.5" fill="none" />
          <ellipse cx="67" cy="46" rx="1.5" ry="0.9" fill="${nodeBract}" />

          
          <path d="M 55 30 Q 50 29 45 28" stroke="url(#orchidHardStemGrad)" stroke-width="1.4" fill="none" />
          <ellipse cx="55" cy="30" rx="1.4" ry="0.8" fill="${nodeBract}" />

          
          <path d="M 44 20 Q 39 18.5 35 17" stroke="url(#orchidHardStemGrad)" stroke-width="1.3" fill="none" />
          <ellipse cx="44" cy="20" rx="1.3" ry="0.8" fill="${nodeBract}" />

          
          <path d="M 32 17 Q 29 14 26 12" stroke="url(#orchidHardStemGrad)" stroke-width="1.2" fill="none" />

          
          <path d="M 24 19 Q 21 17 19 16" stroke="url(#orchidHardStemGrad)" stroke-width="1.1" fill="none" />

          
          <path d="M 18 22 Q 16 21.5 14 21" stroke="url(#orchidHardStemGrad)" stroke-width="1.0" fill="none" />
        </g>

        
        <g id="orchidBloomsRaceme">
          
          <g style="${fl1}" transform="translate(82, 82)">
            <g class="animate-flower-sway-main-gentle" style="transform-origin: ${'0px 0px'};">
              ${renderOrchidBloom(1.12, 15)}
            </g>
          </g>

          
          <g style="${fl2}" transform="translate(67, 63)">
            <g class="animate-flower-sway-left-gentle" style="transform-origin: ${'0px 0px'};">
              ${renderOrchidBloom(1.00, -12)}
            </g>
          </g>

          
          <g style="${fl3}" transform="translate(57, 45)">
            <g class="animate-flower-sway-crown-gentle" style="transform-origin: ${'0px 0px'};">
              ${renderOrchidBloom(0.86, -20)}
            </g>
          </g>

          
          <g style="${fl4}" transform="translate(45, 28)">
            <g class="animate-flower-sway-right-gentle" style="transform-origin: ${'0px 0px'};">
              ${renderOrchidBloom(0.70, -28)}
            </g>
          </g>

          
          <g transform="translate(35, 17)">
            <g class="animate-flower-sway-bud-gentle" style="transform-origin: ${'0px 0px'};">
              ${renderOrchidBloom(0.56, -35)}
            </g>
          </g>

          
          
          <g transform="translate(26, 12)">
            <g class="animate-flower-sway-bud-gentle" style="transform-origin: ${'0px 0px'};">
              ${renderOrchidBud(0.47, -45)}
            </g>
          </g>

          
          <g transform="translate(19, 16)">
            <g class="animate-flower-sway-bud-gentle" style="transform-origin: ${'0px 0px'};">
              ${renderOrchidBud(0.36, -60)}
            </g>
          </g>

          
          <g transform="translate(14, 21)">
            <g class="animate-flower-sway-bud-gentle" style="transform-origin: ${'0px 0px'};">
              ${renderOrchidBud(0.27, -78)}
            </g>
          </g>

          
          <g transform="translate(11, 29)">
            <g class="animate-flower-sway-bud-gentle" style="transform-origin: ${'0px 0px'};">
              ${renderOrchidBud(0.20, -95)}
            </g>
          </g>
        </g>
      </g>
    </g>`
  );
};

