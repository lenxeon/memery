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
import { FlowerRenderProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle, getFlowerAgingFilter } from '../utils/lifecycle';

export const PLUM_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.65, fallSpan: 0.08, startX: 84, startY: 32, landX: 62, landY: 194, rx: 3.2, ry: 2.2, landRot: 35, swayAmp: 12, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.45, fallSpan: 0.08, startX: 102, startY: -2, landX: 96, landY: 193, rx: 3.4, ry: 2.3, landRot: -20, swayAmp: 15, swayFreq: 3.0 },
  { id: 3, detachHealth: 0.3, fallSpan: 0.07, startX: 68, startY: 2, landX: 45, landY: 195, rx: 3.1, ry: 2.1, landRot: 45, swayAmp: 10, swayFreq: 3.5 },
  { id: 4, detachHealth: 0.18, fallSpan: 0.06, startX: 108, startY: -25, landX: 108, landY: 194, rx: 3.0, ry: 2.0, landRot: -40, swayAmp: 16, swayFreq: 2.8 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.05, startX: 64, startY: -26, landX: 52, landY: 195, rx: 2.8, ry: 1.9, landRot: 15, swayAmp: 14, swayFreq: 3.3 },
];

export const renderPlumBlossomsFlower = (props: FlowerRenderProps): string => {
  const {
  health,
  dryFactor,
  isFaded,
} = props;
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
      `<g transform="${`translate(${cx}, ${cy}) rotate(${rot})`}">
        
        <circle cx="0" cy="0" r="${r * 0.35}" fill="${calyxDark}" opacity="0.85" />

        
        ${posture === 'front_tilt' ? `
          <g transform="scale(1, 0.82)">
            ${[0, 72, 144, 216, 288].map((angle) => `
              <g transform="rotate(${angle})">
                <path
                  d="M 0 0 C -${r * 0.65} -${r * 0.45}, -${r * 0.72} -${r * 1.1}, 0 -${r * 1.22} C ${r * 0.72} -${r * 1.1}, ${r * 0.65} -${r * 0.45}, 0 0 Z"
                  fill="url(#whitePlumPetalGrad)"
                  stroke="${petalBase}"
                  stroke-width="0.35"
                />
              </g>
            `).join('')}
            <circle cx="0" cy="0" r="${r * 0.22}" fill="${budGreen100}" />
            ${[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const len = r * 0.65;
              const x2 = Math.cos(rad) * len;
              const y2 = Math.sin(rad) * len;
              return `
                <g>
                  <line x1="0" y1="0" x2="${x2}" y2="${y2}" stroke="${stamenGold}" stroke-width="0.4" />
                  <circle cx="${x2}" cy="${y2}" r="0.55" fill="${antherGold}" />
                </g>
              `;
            }).join('')}
          </g>
        ` : ''}

        ${posture === 'three_quarter' ? `
          <g transform="scale(0.88, 1.1) rotate(15)">
            <path d="M 0 0 C -${r * 0.5} -${r * 0.3}, -${r * 0.6} -${r * 0.8}, 0 -${r * 0.85} C ${r * 0.4} -${r * 0.8}, ${r * 0.4} -${r * 0.3}, 0 0 Z" fill="url(#whitePlumPetalGrad)" stroke="${petalBase}" stroke-width="0.3" transform="rotate(-50)" />
            <path d="M 0 0 C -${r * 0.4} -${r * 0.3}, -${r * 0.4} -${r * 0.8}, 0 -${r * 0.85} C ${r * 0.6} -${r * 0.8}, ${r * 0.5} -${r * 0.3}, 0 0 Z" fill="url(#whitePlumPetalGrad)" stroke="${petalBase}" stroke-width="0.3" transform="rotate(45)" />
            <ellipse cx="0" cy="0" rx="${r * 0.25}" ry="${r * 0.18}" fill="${budGreen100}" />
            <path d="M 0 0 C -${r * 0.65} -${r * 0.4}, -${r * 0.75} -${r * 1.1}, 0 -${r * 1.25} C ${r * 0.75} -${r * 1.1}, ${r * 0.65} -${r * 0.4}, 0 0 Z" fill="url(#whitePlumPetalGrad)" stroke="${petalBase}" stroke-width="0.35" transform="rotate(115)" />
            <path d="M 0 0 C -${r * 0.65} -${r * 0.4}, -${r * 0.75} -${r * 1.1}, 0 -${r * 1.2} C ${r * 0.75} -${r * 1.1}, ${r * 0.65} -${r * 0.4}, 0 0 Z" fill="url(#whitePlumPetalGrad)" stroke="${petalBase}" stroke-width="0.35" transform="rotate(180)" />
            <path d="M 0 0 C -${r * 0.65} -${r * 0.4}, -${r * 0.75} -${r * 1.1}, 0 -${r * 1.25} C ${r * 0.75} -${r * 1.1}, ${r * 0.65} -${r * 0.4}, 0 0 Z" fill="url(#whitePlumPetalGrad)" stroke="${petalBase}" stroke-width="0.35" transform="rotate(245)" />
            ${[-25, -10, 5, 20, 35].map((angle) => {
              const rad = ((angle + 90) * Math.PI) / 180;
              const len = r * 0.75;
              return `
                <g>
                  <line x1="0" y1="0" x2="${Math.cos(rad) * len}" y2="${Math.sin(rad) * len}" stroke="${stamenGold}" stroke-width="0.4" />
                  <circle cx="${Math.cos(rad) * len}" cy="${Math.sin(rad) * len}" r="0.55" fill="${antherGold}" />
                </g>
              `;
            }).join('')}
          </g>
        ` : ''}

        ${posture === 'side_right' ? `
          <g>
            <path d="M 0 0 C -3 1, -4 -3, -1 -4 C 1 -4, 2 -1, 0 0 Z" fill="${calyxDark}" />
            <ellipse cx="-1.5" cy="-2.5" rx="1.8" ry="1.2" fill="${budGreen100}" opacity="0.9" />
            <path d="M 0 0 C 0 -${r * 0.6}, ${r * 0.4} -${r * 1.1}, ${r * 0.85} -${r * 1.0} C ${r * 0.8} -${r * 0.4}, ${r * 0.3} -${r * 0.1}, 0 0 Z" fill="url(#whitePlumPetalGrad)" stroke="${petalBase}" stroke-width="0.3" />
            <path d="M 0 0 C ${r * 0.3} -${r * 0.6}, ${r * 0.9} -${r * 0.8}, ${r * 1.25} -${r * 0.2} C ${r * 0.9} ${r * 0.3}, ${r * 0.4} ${r * 0.2}, 0 0 Z" fill="url(#whitePlumPetalGrad)" stroke="${petalBase}" stroke-width="0.35" />
            <path d="M 0 0 C ${r * 0.2} ${r * 0.2}, ${r * 0.7} ${r * 0.6}, ${r * 1.0} ${r * 0.5} C ${r * 0.8} ${r * 0.1}, ${r * 0.4} 0, 0 0 Z" fill="url(#whitePlumPetalGrad)" stroke="${petalBase}" stroke-width="0.3" />
            <line x1="2" y1="-1" x2="${r * 0.9}" y2="-3" stroke="${stamenGold}" stroke-width="0.4" />
            <circle cx="${r * 0.9}" cy="-3" r="0.55" fill="${antherGold}" />
            <line x1="2" y1="0" x2="${r * 1.05}" y2="-0.5" stroke="${stamenGold}" stroke-width="0.4" />
            <circle cx="${r * 1.05}" cy="-0.5" r="0.55" fill="${antherGold}" />
            <line x1="2" y1="1" x2="${r * 0.95}" y2="2" stroke="${stamenGold}" stroke-width="0.4" />
            <circle cx="${r * 0.95}" cy="2" r="0.55" fill="${antherGold}" />
          </g>
        ` : ''}

        ${posture === 'side_left' ? `
          <g transform="scale(-1, 1)">
            <path d="M 0 0 C -3 1, -4 -3, -1 -4 C 1 -4, 2 -1, 0 0 Z" fill="${calyxDark}" />
            <ellipse cx="-1.5" cy="-2.5" rx="1.8" ry="1.2" fill="${budGreen100}" opacity="0.9" />
            <path d="M 0 0 C 0 -${r * 0.6}, ${r * 0.4} -${r * 1.1}, ${r * 0.85} -${r * 1.0} C ${r * 0.8} -${r * 0.4}, ${r * 0.3} -${r * 0.1}, 0 0 Z" fill="url(#whitePlumPetalGrad)" stroke="${petalBase}" stroke-width="0.3" />
            <path d="M 0 0 C ${r * 0.3} -${r * 0.6}, ${r * 0.9} -${r * 0.8}, ${r * 1.25} -${r * 0.2} C ${r * 0.9} ${r * 0.3}, ${r * 0.4} ${r * 0.2}, 0 0 Z" fill="url(#whitePlumPetalGrad)" stroke="${petalBase}" stroke-width="0.35" />
            <path d="M 0 0 C ${r * 0.2} ${r * 0.2}, ${r * 0.7} ${r * 0.6}, ${r * 1.0} ${r * 0.5} C ${r * 0.8} ${r * 0.1}, ${r * 0.4} 0, 0 0 Z" fill="url(#whitePlumPetalGrad)" stroke="${petalBase}" stroke-width="0.3" />
            <line x1="2" y1="-1" x2="${r * 0.9}" y2="-3" stroke="${stamenGold}" stroke-width="0.4" />
            <circle cx="${r * 0.9}" cy="-3" r="0.55" fill="${antherGold}" />
            <line x1="2" y1="0" x2="${r * 1.05}" y2="-0.5" stroke="${stamenGold}" stroke-width="0.4" />
            <circle cx="${r * 1.05}" cy="-0.5" r="0.55" fill="${antherGold}" />
            <line x1="2" y1="1" x2="${r * 0.95}" y2="2" stroke="${stamenGold}" stroke-width="0.4" />
            <circle cx="${r * 0.95}" cy="2" r="0.55" fill="${antherGold}" />
          </g>
        ` : ''}

        ${posture === 'back_cup' ? `
          <g>
            <circle cx="0" cy="-2.5" r="${r * 0.75}" fill="url(#whitePlumPetalGrad)" stroke="${petalBase}" stroke-width="0.3" />
            <circle cx="0" cy="0" r="${r * 0.32}" fill="${calyxDark}" />
            ${[0, 72, 144, 216, 288].map((angle) => `
              <path
                d="M 0 0 L -1.2 -1.8 L 0 -3.6 L 1.2 -1.8 Z"
                fill="${budGreen100}"
                stroke="${calyxDark}"
                stroke-width="0.3"
                transform="rotate(${angle})"
              />
            `).join('')}
          </g>
        ` : ''}
      </g>`
    );
  };

  // ── 神：水滴直立生长的嫩青绿色小花苞（更小更紧致，清瘦灵动） ──
  const renderWaterDropBud = (x: number, y: number, rot: number = 0, scale: number = 0.85) => (
    `<g transform="${`translate(${x}, ${y}) rotate(${rot}) scale(${scale})`}">
      
      <path d="M -1.8 0 C -2.2 1.2, 2.2 1.2, 1.8 0 Z" fill="${calyxDark}" />
      <path d="M -1.5 -0.4 L -2.0 -1.8 L -0.8 -1.1 L 0 -2.0 L 0.8 -1.1 L 2.0 -1.8 L 1.5 -0.4 Z" fill="${calyxDark}" />
      
      <path d="M 0 0 C -2.2 -1.4, -2.6 -4.0, 0 -7.2 C 2.6 -4.0, 2.2 -1.4, 0 0 Z" fill="url(#greenDropBudGrad)" stroke="#15803d" stroke-width="0.3" />
      
      <ellipse cx="0" cy="-5.6" rx="0.7" ry="1.2" fill="#ffffff" opacity="0.9" />
    </g>`
  );

  return (
    `<g id="plumBlossomsFlora" style="${agingStyle}">
      <defs>
        
        <radialGradient id="whitePlumPetalGrad" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="65%" stop-color="${petalWhite0}" />
          <stop offset="100%" stop-color="${petalWhite50}" />
        </radialGradient>

        
        <linearGradient id="greenDropBudGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="${budGreen100}" />
          <stop offset="60%" stop-color="${budGreen0}" />
          <stop offset="100%" stop-color="#dcfce7" />
        </linearGradient>

        
        <linearGradient id="thinBarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${barkLight}" />
          <stop offset="40%" stop-color="${barkMid}" />
          <stop offset="100%" stop-color="${barkDark}" />
        </linearGradient>
      </defs>

      
      <g class="animate-sway-woody-stem" style="transform-origin: ${'75px 125px'};">
        
        <g id="plumThinStems">
          
          <path d="M 75 125 L 75 106 L 73 88 L 76 70 L 74 48" stroke="url(#thinBarkGrad)" stroke-width="2.1" fill="none" stroke-linecap="round" stroke-linejoin="bevel" />

          
          <path d="M 74 48 L 84 32 L 95 18 L 102 -2 L 108 -25 L 114 -42" stroke="url(#thinBarkGrad)" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="bevel" />

          
          <path d="M 108 -25 L 115 -18 L 122 -14" stroke="url(#thinBarkGrad)" stroke-width="1.0" fill="none" stroke-linecap="round" />
          <path d="M 95 18 L 89 12 L 85 8" stroke="url(#thinBarkGrad)" stroke-width="1.1" fill="none" stroke-linecap="round" />
          <path d="M 102 -2 L 110 -6" stroke="url(#thinBarkGrad)" stroke-width="1.0" fill="none" stroke-linecap="round" />

          
          <path d="M 74 48 L 72 26 L 68 2 L 64 -26 L 67 -54 L 62 -75" stroke="url(#thinBarkGrad)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="bevel" />

          
          <path d="M 64 -26 L 56 -36 L 48 -42" stroke="url(#thinBarkGrad)" stroke-width="1.0" fill="none" stroke-linecap="round" />
          <path d="M 67 -54 L 72 -64" stroke="url(#thinBarkGrad)" stroke-width="0.9" fill="none" stroke-linecap="round" />
          <path d="M 62 -75 L 58 -82" stroke="url(#thinBarkGrad)" stroke-width="0.8" fill="none" stroke-linecap="round" />

          
          <path d="M 73 88 L 62 82 L 54 78" stroke="url(#thinBarkGrad)" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="bevel" />
          <path d="M 62 82 L 58 88" stroke="url(#thinBarkGrad)" stroke-width="0.9" fill="none" stroke-linecap="round" />

          
          <ellipse cx="75" cy="106" rx="1.6" ry="1.1" fill="${barkDark}" stroke="${barkLight}" stroke-width="0.4" />
          <ellipse cx="76" cy="70" rx="1.5" ry="1.0" fill="${barkDark}" stroke="${barkLight}" stroke-width="0.4" />
          <ellipse cx="74" cy="48" rx="1.8" ry="1.2" fill="${barkDark}" stroke="${barkLight}" stroke-width="0.5" />
          <ellipse cx="95" cy="18" rx="1.4" ry="1.0" fill="${barkDark}" stroke="${barkLight}" stroke-width="0.4" />
          <ellipse cx="108" cy="-25" rx="1.3" ry="0.9" fill="${barkDark}" stroke="${barkLight}" stroke-width="0.4" />
          <ellipse cx="68" cy="2" rx="1.4" ry="1.0" fill="${barkDark}" stroke="${barkLight}" stroke-width="0.4" />
          <ellipse cx="64" cy="-26" rx="1.3" ry="0.9" fill="${barkDark}" stroke="${barkLight}" stroke-width="0.4" />

          
          <path d="M 74.8 115 L 74.2 98" stroke="${barkLight}" stroke-width="0.5" opacity="0.6" />
          <path d="M 74.5 65 L 75.2 55" stroke="${barkLight}" stroke-width="0.4" opacity="0.6" />
          <path d="M 86 30 L 93 20" stroke="${barkLight}" stroke-width="0.4" opacity="0.6" />
        </g>

        
        <g id="plumGreenBuds">
          
          ${renderWaterDropBud(58, -82, -18, 0.85)}
          ${renderWaterDropBud(72, -64, 22, 0.8)}
          ${renderWaterDropBud(48, -42, -35, 0.8)}
          
          ${renderWaterDropBud(114, -42, 28, 0.85)}
          ${renderWaterDropBud(122, -14, 45, 0.75)}
          ${renderWaterDropBud(110, -6, 15, 0.75)}
          ${renderWaterDropBud(85, 8, -25, 0.75)}
          
          ${renderWaterDropBud(54, 78, -35, 0.8)}
          ${renderWaterDropBud(76, 68, 12, 0.75)}
        </g>

        
        <g id="plumWhiteBlooms">
          
          <g class="animate-flower-sway-main-gentle" style="transform-origin: ${'84px 32px'};">
            ${renderPlumBloom(84, 32, 5.4, -18, 'side_right')}
          </g>

          
          <g class="animate-flower-sway-right-gentle" style="transform-origin: ${'102px -2px'};">
            ${renderPlumBloom(102, -2, 5.8, 25, 'three_quarter')}
          </g>

          
          <g class="animate-flower-sway-bud-gentle" style="transform-origin: ${'108px -25px'};">
            ${renderPlumBloom(108, -25, 5.0, 15, 'side_left')}
          </g>

          
          <g class="animate-flower-sway-left-gentle" style="transform-origin: ${'68px 2px'};">
            ${renderPlumBloom(68, 2, 5.2, -10, 'front_tilt')}
          </g>

          
          <g class="animate-flower-sway-crown-gentle" style="transform-origin: ${'64px -26px'};">
            ${renderPlumBloom(64, -26, 4.8, 30, 'back_cup')}
          </g>
        </g>
      </g>
    </g>`
  );
};
