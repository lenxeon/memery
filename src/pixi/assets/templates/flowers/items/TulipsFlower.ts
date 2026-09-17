/**
 * @file TulipsFlower.tsx
 * @description 【写实混色郁金香】叶肥厚硬挺内卷、一花一茎配二至三叶、含苞待放、多色混搭（娇粉/奶白/玫红）、强立体高光感。
 */
import { FlowerRenderProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle, getFlowerAgingFilter } from '../utils/lifecycle';

export const TULIP_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.5, fallSpan: 0.06, startX: 106, startY: 36, landX: 112, landY: 194, rx: 7.2, ry: 4.8, landRot: 28, swayAmp: 12, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.35, fallSpan: 0.06, startX: 42, startY: 38, landX: 46, landY: 193, rx: 7.5, ry: 5.0, landRot: -30, swayAmp: 10, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.15, fallSpan: 0.06, startX: 75, startY: 22, landX: 80, landY: 195, rx: 7.6, ry: 5.2, landRot: 16, swayAmp: 14, swayFreq: 3.8 },
];

export const renderTulipsFlower = (props: FlowerRenderProps): string => {
  const { health, dryFactor, isFaded } = props;
  const agingStyle = getFlowerAgingFilter(health, isFaded);
  // ── 茎叶色彩与光影衰变 ──
  const stemBase = lerpColor('#2f7225', '#5a4c33', dryFactor);
  const stemLight = lerpColor('#5cb843', '#887a58', dryFactor);

  const leafDeep = lerpColor('#184718', '#383324', dryFactor);
  const leafMid = lerpColor('#2d7324', '#534a32', dryFactor);
  const leafBright = lerpColor('#4eb532', '#7e7352', dryFactor);
  const leafHighlight = lerpColor('#8ae667', '#aba07d', dryFactor);
  const leafShadowInner = lerpColor('#0f3010', '#221f15', dryFactor);

  // ── 三款写实经典花苞色 ──
  // 1. 娇粉
  const pinkDark = lerpColor('#b8385e', '#663b36', dryFactor);
  const pinkMid = lerpColor('#e55c82', '#995955', dryFactor);
  const pinkLight = lerpColor('#f896b0', '#c28783', dryFactor);
  const pinkTop = lerpColor('#fbcfe8', '#dec3be', dryFactor);

  // 2. 奶白微鹅黄
  const whiteDark = lerpColor('#cbd5a2', '#7a7662', dryFactor);
  const whiteMid = lerpColor('#eef2c6', '#aba58c', dryFactor);
  const whiteLight = lerpColor('#fdfef2', '#dcd8c4', dryFactor);
  const whiteTop = lerpColor('#ffffff', '#ebe8d8', dryFactor);

  // 3. 浓郁玫红
  const roseDark = lerpColor('#9f1239', '#5c2222', dryFactor);
  const roseMid = lerpColor('#e11d48', '#8c3b40', dryFactor);
  const roseLight = lerpColor('#fb7185', '#b8636b', dryFactor);
  const roseTop = lerpColor('#fecdd3', '#d99fa6', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.5);
  const fl2 = getBlossomDropStyle(health, 0.35);
  const fl3 = getBlossomDropStyle(health, 0.15);

  /**
   * 肥厚硬挺、内卷如槽的郁金香抱茎叶片
   * 缩小一半、不向外过度展开（maxW约8~11px），起始于中上段紧贴花茎上延护蕾
   */
  const renderRigidCuppedLeaf = (
    x0: number,
    y0: number,
    cx1: number,
    cy1: number,
    tx: number,
    ty: number,
    maxW: number = 9.5,
    side: number = 1,
    curlRatio: number = 0.45
  ) => {
    const outerX = cx1 + side * maxW;
    const outerY = cy1;
    const innerRimX = cx1 + side * (maxW * (1 - curlRatio));
    const innerRimY = cy1 - 2;
    const ridgeX = cx1 + side * (maxW * 0.45);
    const ridgeY = cy1 - 1;

    return (
      `<g>
        
        <path d="${`M ${x0} ${y0} C ${cx1 + side * (maxW * 0.35)} ${y0 - 6}, ${outerX} ${outerY + 8}, ${outerX} ${outerY} C ${outerX} ${outerY - 10}, ${tx + side * 3} ${ty + 6}, ${tx} ${ty} C ${tx - side * 1.5} ${ty + 5}, ${innerRimX} ${innerRimY - 4}, ${innerRimX} ${innerRimY} C ${innerRimX} ${innerRimY + 6}, ${x0 + side * 2} ${y0 - 4}, ${x0} ${y0} Z`}" fill="url(#leafBodyGrad)" stroke="${leafDeep}" stroke-width="0.5" />

        
        <path d="${`M ${outerX} ${outerY + 6} C ${outerX + side * 1.2} ${outerY}, ${tx + side * 1.5} ${ty + 4}, ${tx} ${ty}`}" stroke="${leafHighlight}" stroke-width="0.8" fill="none" opacity="0.9" />

        
        <path d="${`M ${x0} ${y0} Q ${innerRimX} ${innerRimY} ${tx} ${ty} Q ${cx1 + side * 1.0} ${cy1 + 3} ${x0} ${y0} Z`}" fill="${leafShadowInner}" opacity="0.65" />

        
        <path d="${`M ${x0 + side * 1.5} ${y0 - 2} Q ${ridgeX} ${ridgeY} ${tx} ${ty}`}" stroke="url(#leafSpineHighlightGrad)" stroke-width="1.8" fill="none" stroke-linecap="round" opacity="0.95" />

        
        <path d="${`M ${x0 + side * 3} ${y0 - 1} Q ${outerX - side * 1.5} ${outerY + 1} ${tx} ${ty}`}" stroke="#dcfce7" stroke-width="0.6" fill="none" stroke-linecap="round" opacity="0.5" />

        
        <circle cx="${tx}" cy="${ty}" r="0.8" fill="#f0fdf4" />
      </g>`
    );
  };

  /**
   * 倒卵形郁金香含苞花杯 (Tulip Bud Cup)
   */
  const renderTulipBud = (
    cx: number,
    cy: number,
    colorType: 'pink' | 'white' | 'rose',
    scale: number = 1.05,
    rot: number = 0
  ) => {
    const gradId =
      colorType === 'pink' ? 'url(#tulipPinkGrad)' : colorType === 'white' ? 'url(#tulipWhiteGrad)' : 'url(#tulipRoseGrad)';
    const topCol = colorType === 'pink' ? pinkTop : colorType === 'white' ? whiteTop : roseTop;
    const rimCol = colorType === 'pink' ? pinkLight : colorType === 'white' ? '#fef9c3' : roseLight;

    return (
      `<g transform="${`translate(${cx}, ${cy}) rotate(${rot}) scale(${scale})`}">
        
        <ellipse cx="0" cy="11" rx="4.0" ry="2.3" fill="${leafMid}" stroke="${leafDeep}" stroke-width="0.5" />

        
        <path d="M -4.5 9 C -11 0, -12 -20, 0 -29 C 12 -20, 11 0, 4.5 9 Z" fill="${gradId}" opacity="0.9" />

        
        <path d="M 0 10 C -12 7, -14 -9, -7 -27 C -2 -21, 1 -9, 0 10 Z" fill="${gradId}" stroke="${rimCol}" stroke-width="0.35" />

        
        <path d="M 0 10.5 C 13 8, 15 -7, 5 -28 C -2 -22, -4 -7, 0 10.5 Z" fill="${gradId}" stroke="${rimCol}" stroke-width="0.4" />

        
        <path d="M -4.5 10.5 C -10 5.5, -11 -9, -2.5 -27.5 C 2.5 -28, 8 -16, 4.5 10.5 Z" fill="${gradId}" />

        
        <path d="M -1 7 C -6 0, -7.5 -12, -2 -23" stroke="#ffffff" stroke-width="1.3" fill="none" stroke-linecap="round" opacity="${colorType === 'white' ? 0.95 : 0.7}" />
        
        <ellipse cx="-0.5" cy="-26" rx="2.2" ry="1.2" fill="${topCol}" opacity="0.95" />
      </g>`
    );
  };

  return (
    `<g id="tulipsFlora" style="${agingStyle}">
      <defs>
        
        <linearGradient id="leafBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${leafBright}" />
          <stop offset="45%" stop-color="${leafMid}" />
          <stop offset="100%" stop-color="${leafDeep}" />
        </linearGradient>

        
        <linearGradient id="leafSpineHighlightGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="${leafMid}" stop-opacity="0.25" />
          <stop offset="45%" stop-color="${leafHighlight}" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0.9" />
        </linearGradient>

        
        <linearGradient id="tulipJuicyStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${stemBase}" />
          <stop offset="30%" stop-color="${stemLight}" />
          <stop offset="75%" stop-color="${stemBase}" />
          <stop offset="100%" stop-color="#142e10" />
        </linearGradient>

        
        <linearGradient id="tulipPinkGrad" x1="30%" y1="100%" x2="70%" y2="0%">
          <stop offset="0%" stop-color="${pinkDark}" />
          <stop offset="45%" stop-color="${pinkMid}" />
          <stop offset="85%" stop-color="${pinkLight}" />
          <stop offset="100%" stop-color="${pinkTop}" />
        </linearGradient>

        
        <linearGradient id="tulipWhiteGrad" x1="20%" y1="100%" x2="80%" y2="0%">
          <stop offset="0%" stop-color="${whiteDark}" />
          <stop offset="35%" stop-color="${whiteMid}" />
          <stop offset="80%" stop-color="${whiteLight}" />
          <stop offset="100%" stop-color="${whiteTop}" />
        </linearGradient>

        
        <linearGradient id="tulipRoseGrad" x1="30%" y1="100%" x2="70%" y2="0%">
          <stop offset="0%" stop-color="${roseDark}" />
          <stop offset="45%" stop-color="${roseMid}" />
          <stop offset="85%" stop-color="${roseLight}" />
          <stop offset="100%" stop-color="${roseTop}" />
        </linearGradient>
      </defs>

      
      <g id="tulipUnit_CenterWhite">
        
        <path d="M 75 125 L 75 68 L 75 22" stroke="url(#tulipJuicyStemGrad)" stroke-width="4.0" fill="none" stroke-linecap="round" />
        
        <g class="animate-leaf-sway-1-gentle" style="transform-origin: ${'74px 82px'};">
          ${renderRigidCuppedLeaf(74, 82, 68, 56, 68, 30, 9.5, -1, 0.46)}
        </g>
        
        <g class="animate-flower-sway-crown-gentle" style="transform-origin: ${'75px 22px'};">
          ${renderTulipBud(75, 14, 'white', 1.16, 0)}
        </g>
      </g>

      
      <g id="tulipUnit_LeftPink">
        
        <path d="M 73 125 Q 67 85 48 40" stroke="url(#tulipJuicyStemGrad)" stroke-width="3.8" fill="none" stroke-linecap="round" />
        
        <g class="animate-leaf-sway-2-gentle" style="transform-origin: ${'68px 86px'};">
          ${renderRigidCuppedLeaf(68, 86, 52, 64, 40, 42, 10, -1, 0.48)}
        </g>
        
        <g class="animate-flower-sway-left-gentle" style="transform-origin: ${'48px 40px'};">
          ${renderTulipBud(47, 30, 'pink', 1.05, -7)}
        </g>
      </g>

      
      <g id="tulipUnit_RightRose">
        
        <path d="M 77 125 Q 85 92 102 55" stroke="url(#tulipJuicyStemGrad)" stroke-width="3.6" fill="none" stroke-linecap="round" />
        
        <g class="animate-leaf-sway-3-gentle" style="transform-origin: ${'82px 92px'};">
          ${renderRigidCuppedLeaf(82, 92, 94, 74, 108, 56, 9.0, 1, 0.48)}
        </g>
        
        <g class="animate-flower-sway-right-gentle" style="transform-origin: ${'102px 55px'};">
          ${renderTulipBud(103, 44, 'rose', 0.92, 9)}
        </g>
      </g>
    </g>`
  );
};

