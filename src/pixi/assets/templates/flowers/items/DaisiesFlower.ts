/**
 * @file DaisiesFlower.tsx
 * @description 【清纯小雏菊】
 * 核心特征：
 * 1. 高度适中挺秀（高度增加 10px，花冠顶梢展于 y:16，比例饱满舒展）；
 * 2. 突出翠绿微卷小叶，叶片更富生机地自枝干与花朵间舒展探出，形成鲜明花叶衬托；
 * 3. 角度丰富生动，侧向与正面自然呼应，绝无死板背向糊脸；
 * 4. 金黄细密花丝绒毛花蕊，雪白层叠辐射花瓣，纯真烂漫。
 */
import { FlowerRenderProps, FallingPetalDef } from '../types';
import { lerpColor, getFlowerAgingFilter } from '../utils/lifecycle';

export const DAISY_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.55, fallSpan: 0.08, startX: 96, startY: 32, landX: 104, landY: 194, rx: 5.0, ry: 2.2, landRot: 32, swayAmp: 12, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.42, fallSpan: 0.07, startX: 52, startY: 36, landX: 46, landY: 193, rx: 4.8, ry: 2.1, landRot: -28, swayAmp: 14, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.30, fallSpan: 0.06, startX: 98, startY: 60, landX: 106, landY: 195, rx: 5.2, ry: 2.3, landRot: 22, swayAmp: 10, swayFreq: 3.0 },
  { id: 4, detachHealth: 0.18, fallSpan: 0.06, startX: 48, startY: 64, landX: 42, landY: 196, rx: 4.6, ry: 2.0, landRot: -35, swayAmp: 15, swayFreq: 3.8 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.05, startX: 75, startY: 16, landX: 82, landY: 195, rx: 5.0, ry: 2.2, landRot: 15, swayAmp: 11, swayFreq: 3.4 },
];

export const renderDaisiesFlower = (props: FlowerRenderProps): string => {
  const {
  health,
  dryFactor,
  isFaded,
} = props;
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
      `<g>
        <ellipse cx="0" cy="0" rx="${rx}" ry="${ry}" fill="url(#daisyStamenCoreGrad)" />
        ${threadRings.map((ring, ringIdx) => {
          const step = (Math.PI * 2) / ring.count;
          return Array.from({ length: ring.count }).map((_, i) => {
            const angle = i * step + ringIdx * 0.3;
            const px = Math.cos(angle) * (rx * ring.r);
            const py = Math.sin(angle) * (ry * ring.r);
            const curveX = px + Math.cos(angle + 1.2) * (rx * 0.28);
            const curveY = py + Math.sin(angle + 1.2) * (ry * 0.28);

            return `
              <path
                d="M ${px * 0.3} ${py * 0.3} Q ${curveX} ${curveY} ${px} ${py}"
                stroke="${ring.color}"
                stroke-width="${ring.strokeW}"
                fill="none"
                stroke-linecap="round"
              />
            `;
          }).join('');
        }).join('')}
        <circle cx="${-rx * 0.2}" cy="${-ry * 0.25}" r="${rx * 0.22}" fill="${filamentGoldLight}" opacity="0.85" />
        <ellipse cx="0" cy="0" rx="${rx * 0.4}" ry="${ry * 0.35}" fill="none" stroke="${filamentGoldLight}" stroke-width="0.7" stroke-dasharray="1.2, 1.0" />
      </g>`
    );
  };

  /**
   * 单枚纯白狭长舌状花瓣
   */
  const renderSingleRayPetal = (angleDeg: number, len: number, w: number) => {
    return (
      `<g transform="${`rotate(${angleDeg})`}">
        <path d="${`M -${w * 0.35} 0 C -${w * 0.55} -${len * 0.4}, -${w * 0.45} -${len * 0.88}, 0 -${len} C ${w * 0.45} -${len * 0.88}, ${w * 0.55} -${len * 0.4}, ${w * 0.35} 0 Z`}" fill="url(#daisyRayPetalGrad)" stroke="${petalShadow}" stroke-width="0.32" />
        <path d="${`M 0 -${len * 0.15} L 0 -${len * 0.85}`}" stroke="#ffffff" stroke-width="0.45" stroke-linecap="round" opacity="0.9" />
      </g>`
    );
  };

  /**
   * 1. 饱满盛放正视雏菊【正视盛放，细密金丝绒毛花蕊】
   */
  const renderFrontBloom = (outerR: number = 15.5, stamenR: number = 5.0) => {
    const count = 18;
    const step = 360 / count;
    return (
      `<g>
        ${Array.from({ length: count }).map((_, i) => `<g opacity="0.92">
            ${renderSingleRayPetal(i * step + step * 0.5, outerR * 0.92, outerR * 0.26)}
          </g>`).join('')}
        ${Array.from({ length: count }).map((_, i) => `<g>
            ${renderSingleRayPetal(i * step, outerR, outerR * 0.28)}
          </g>`).join('')}
        ${renderFilamentStamen(stamenR, stamenR * 0.92)}
      </g>`
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
      `<g transform="${`rotate(${rot}) scale(${sx}, 1)`}">
        
        <path d="M -3.2 2 C -3.8 0, -2.5 -2.0, 0 -2.6 C 2.5 -2.0, 3.8 0, 3.2 2 Z" fill="url(#daisyCalyxGrad)" stroke="${stemDark}" stroke-width="0.32" />
        
        <g transform="${`scale(1, ${tilt})`}">
          ${Array.from({ length: count }).map((_, i) => {
            const ang = i * step;
            const isBack = ang > 110 && ang < 250;
            const pLen = isBack ? outerR * 0.72 : outerR * 1.0;
            return `
              <g>
                {renderSingleRayPetal(ang, pLen, outerR * 0.28)}
              </g>
            `;
          }).join('')}
        </g>
        
        <g transform="${`translate(0.6, ${-outerR * 0.08 * tilt})`}">
          ${renderFilamentStamen(outerR * 0.32, outerR * 0.32 * tilt)}
        </g>
      </g>`
    );
  };

  /**
   * 3. 鲜嫩小花骨朵【含苞待放：青绿细萼裹纯白尖，挺立枝梢】
   */
  const renderFlowerBud = (rot: number = 0, scale: number = 1.0) => {
    return (
      `<g transform="${`rotate(${rot}) scale(${scale})`}">
        
        <path d="M -1.8 -3.5 C -2.0 -7.5, 0 -10.5, 0 -10.5 C 0 -10.5, 2.0 -7.5, 1.8 -3.5 Z" fill="url(#daisyRayPetalGrad)" stroke="${petalShadow}" stroke-width="0.28" />
        <path d="M 0 -3.5 L 0 -10.0" stroke="#ffffff" stroke-width="0.35" opacity="0.9" />

        
        <path d="M -2.5 1.5 C -3.5 -1.0, -2.5 -4.5, 0 -5.5 C 2.5 -4.5, 3.5 -1.0, 2.5 1.5 C 1.5 2.5, -1.5 2.5, -2.5 1.5 Z" fill="url(#daisyCalyxGrad)" stroke="${stemDark}" stroke-width="0.32" />
        
        <polygon points="-2.0,0 -2.4,-3.8 -1.0,-1.8" fill="${stemLight}" />
        <polygon points="-0.8,-1.8 0,-5.2 0.8,-1.8" fill="${stemLight}" />
        <polygon points="1.0,-1.8 2.4,-3.8 2.0,0" fill="${stemLight}" />
      </g>`
    );
  };

  /**
   * 突出、舒展且微卷的雏菊特有小叶 (Prominent Lobed & Curled Daisy Leaves)
   */
  const renderDaisyLeaf = (x: number, y: number, length: number, rot: number, curlSign: number = 1) => {
    const w = length * 0.25;
    return (
      `<g transform="${`translate(${x}, ${y}) rotate(${rot})`}">
        
        <path d="${`M 0 0 C ${w * 0.9} -${length * 0.25}, ${w * 1.5 * curlSign} -${length * 0.55}, ${w * 2.2 * curlSign} -${length} C ${w * 0.8 * curlSign} -${length * 0.75}, -${w * 0.3} -${length * 0.35}, 0 0 Z`}" fill="url(#daisyLeafGrad)" stroke="${leafDark}" stroke-width="0.35" />
        
        <path d="${`M 0 0 Q ${w * 0.8 * curlSign} -${length * 0.55} ${w * 1.8 * curlSign} -${length * 0.95}`}" stroke="${leafLight}" stroke-width="0.5" fill="none" opacity="0.9" />
      </g>`
    );
  };

  return (
    `<g id="daisiesFlora" style="${agingStyle}">
      <defs>
        
        <linearGradient id="daisyRayPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="${petalShadow}" />
          <stop offset="25%" stop-color="${petalMidWhite}" />
          <stop offset="85%" stop-color="${petalPureWhite}" />
          <stop offset="100%" stop-color="#ffffff" />
        </linearGradient>

        
        <radialGradient id="daisyStamenCoreGrad" cx="40%" cy="40%" r="65%">
          <stop offset="0%" stop-color="${filamentGoldLight}" />
          <stop offset="60%" stop-color="${filamentGoldMid}" />
          <stop offset="90%" stop-color="${filamentGoldDark}" />
          <stop offset="100%" stop-color="${stamenCoreAmber}" />
        </radialGradient>

        
        <linearGradient id="daisyRealStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${stemDark}" />
          <stop offset="45%" stop-color="${stemLight}" />
          <stop offset="100%" stop-color="${stemDark}" />
        </linearGradient>

        
        <linearGradient id="daisyLeafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${leafDark}" />
          <stop offset="55%" stop-color="${leafMid}" />
          <stop offset="100%" stop-color="${leafLight}" />
        </linearGradient>

        
        <linearGradient id="daisyCalyxGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="${stemDark}" />
          <stop offset="70%" stop-color="${stemMid}" />
          <stop offset="100%" stop-color="${stemLight}" />
        </linearGradient>
      </defs>

      
      <g class="animate-sway-daisy-whole" style="transform-origin: ${'75px 125px'};">
        
        <g id="daisySlenderLeaves">
          
          ${renderDaisyLeaf(84, 24, 16, 26, 1)}
          ${renderDaisyLeaf(66, 25, 16, -24, -1)}

          
          ${renderDaisyLeaf(50, 42, 17, -40, -1)}
          ${renderDaisyLeaf(98, 40, 17, 36, 1)}

          
          ${renderDaisyLeaf(62, 52, 18, -32, -1)}
          ${renderDaisyLeaf(88, 50, 18, 30, 1)}

          
          ${renderDaisyLeaf(48, 54, 18, -48, -1)}
          ${renderDaisyLeaf(100, 52, 18, 46, 1)}
          ${renderDaisyLeaf(60, 72, 19, -35, -1)}
          ${renderDaisyLeaf(89, 68, 19, 32, 1)}

          
          ${renderDaisyLeaf(66, 82, 18, -28, 1)}
          ${renderDaisyLeaf(84, 78, 18, 25, -1)}
          ${renderDaisyLeaf(71, 92, 16, -18, -1)}
          ${renderDaisyLeaf(79, 90, 16, 20, 1)}
        </g>

        
        <g id="daisyBranchedStems">
          
          <path d="M 75 125 C 75 95, 74 62, 75 38 C 75 28, 75 22, 75 16" stroke="url(#daisyRealStemGrad)" stroke-width="2.4" fill="none" stroke-linecap="round" />

          
          <path d="M 75 60 C 82 48, 89 40, 96 32" stroke="url(#daisyRealStemGrad)" stroke-width="1.8" fill="none" stroke-linecap="round" />

          
          <path d="M 75 65 C 68 54, 60 44, 52 34" stroke="url(#daisyRealStemGrad)" stroke-width="1.8" fill="none" stroke-linecap="round" />

          
          <path d="M 62 46 C 62 36, 62 28, 62 22" stroke="url(#daisyRealStemGrad)" stroke-width="1.3" fill="none" stroke-linecap="round" />

          
          <path d="M 75 88 C 84 78, 92 70, 98 60" stroke="url(#daisyRealStemGrad)" stroke-width="1.9" fill="none" stroke-linecap="round" />

          
          <path d="M 75 92 C 64 82, 54 74, 46 64" stroke="url(#daisyRealStemGrad)" stroke-width="1.9" fill="none" stroke-linecap="round" />

          
          <path d="M 75 102 C 78 94, 80 87, 82 80" stroke="url(#daisyRealStemGrad)" stroke-width="1.4" fill="none" stroke-linecap="round" />
        </g>

        
        <g id="daisyMultiBlooms">
          
          <g transform="translate(75, 16)">
            <g class="animate-sway-daisy-nod-crown" style="transform-origin: ${'0px 0px'};">
              ${renderFrontBloom(16.0, 5.2)}
            </g>
          </g>

          
          <g transform="translate(96, 32)">
            <g class="animate-sway-daisy-nod-right" style="transform-origin: ${'0px 0px'};">
              ${renderSideBloom(14.5, 22, false, 0.55)}
            </g>
          </g>

          
          <g transform="translate(52, 34)">
            <g class="animate-sway-daisy-nod-left" style="transform-origin: ${'0px 0px'};">
              ${renderSideBloom(14.5, -20, true, 0.55)}
            </g>
          </g>

          
          <g transform="translate(62, 22)">
            <g class="animate-sway-daisy-nod-bud" style="transform-origin: ${'0px 0px'};">
              ${renderFlowerBud(-12, 0.9)}
            </g>
          </g>

          
          <g transform="translate(74, 46)">
            <g class="animate-sway-daisy-nod-crown" style="transform-origin: ${'0px 0px'};">
              ${renderFrontBloom(16.5, 5.4)}
            </g>
          </g>

          
          <g transform="translate(98, 60)">
            <g class="animate-sway-daisy-nod-right" style="transform-origin: ${'0px 0px'};">
              ${renderSideBloom(14.0, 32, false, 0.52)}
            </g>
          </g>

          
          <g transform="translate(46, 64)">
            <g class="animate-sway-daisy-nod-left" style="transform-origin: ${'0px 0px'};">
              ${renderSideBloom(14.0, -30, true, 0.52)}
            </g>
          </g>

          
          <g transform="translate(82, 80)">
            <g class="animate-sway-daisy-nod-right" style="transform-origin: ${'0px 0px'};">
              ${renderSideBloom(12.5, 26, false, 0.62)}
            </g>
          </g>

          
          <g transform="translate(68, 88)">
            <g class="animate-sway-daisy-nod-bud" style="transform-origin: ${'0px 0px'};">
              ${renderFlowerBud(12, 0.85)}
            </g>
          </g>
        </g>
      </g>
    </g>`
  );
};



