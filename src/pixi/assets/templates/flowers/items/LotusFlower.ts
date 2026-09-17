/**
 * @file LotusFlower.tsx
 * @description 【出尘圣洁】工笔写实粉白重瓣清莲与莲蓬插花组件。
 * 具备多层重叠花瓣、精致莲蓬莲心、舒展卷曲荷叶叶脉、以及微风摇曳与生命周期掉落系统。
 */
import { FlowerRenderProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle } from '../utils/lifecycle';

export const LOTUS_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.5, fallSpan: 0.06, startX: 114, startY: 42, landX: 118, landY: 194, rx: 7.0, ry: 3.5, landRot: 28, swayAmp: 14, swayFreq: 3.0 },
  { id: 2, detachHealth: 0.38, fallSpan: 0.06, startX: 38, startY: 52, landX: 42, landY: 193, rx: 7.5, ry: 3.8, landRot: -32, swayAmp: 13, swayFreq: 3.4 },
  { id: 3, detachHealth: 0.22, fallSpan: 0.06, startX: 96, startY: 56, landX: 104, landY: 195, rx: 8.0, ry: 4.0, landRot: 20, swayAmp: 16, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.1, fallSpan: 0.05, startX: 75, startY: 28, landX: 82, landY: 196, rx: 8.5, ry: 4.2, landRot: -18, swayAmp: 15, swayFreq: 4.0 },
];

export const renderLotusFlower = (props: FlowerRenderProps): string => {
  const { health, dryFactor, isFaded } = props;
  // 衰变色彩插值 (圣洁粉红 -> 枯黄淡褐)
  const tipCol = lerpColor('#fb7185', '#b08462', dryFactor);
  const midCol = lerpColor('#fecdd3', '#d5b99e', dryFactor);
  const baseCol = lerpColor('#ffffff', '#f2ebe2', dryFactor);
  const greenRoot = lerpColor('#dcfce7', '#937a5b', dryFactor);

  const calyxCol = lerpColor('#86efac', '#6b5133', dryFactor);
  const stemCol0 = lerpColor('#22c55e', '#785b39', dryFactor);
  const stemCol100 = lerpColor('#14532d', '#2b1c11', dryFactor);
  const leafCol0 = lerpColor('#15803d', '#61472a', dryFactor);
  const leafCol100 = lerpColor('#052e16', '#21150c', dryFactor);
  const podCol = lerpColor('#ca8a04', '#573d1f', dryFactor);

  const mainState = getBlossomDropStyle(health, 0.1);
  const crownState = getBlossomDropStyle(health, 0.22);
  const secState = getBlossomDropStyle(health, 0.38);
  const budState = getBlossomDropStyle(health, 0.5);

  const leafOpacity = isFaded ? 0.35 : Math.max(0.45, health);

  return (
    `<g id="lotusFlora">
      <defs>
        
        <linearGradient id="lotusPetalMainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${tipCol}" />
          <stop offset="35%" stop-color="${midCol}" />
          <stop offset="75%" stop-color="${baseCol}" />
          <stop offset="100%" stop-color="${greenRoot}" />
        </linearGradient>

        <linearGradient id="lotusPetalInnerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${tipCol}" />
          <stop offset="50%" stop-color="${baseCol}" />
          <stop offset="100%" stop-color="${greenRoot}" />
        </linearGradient>

        
        <linearGradient id="lotusStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${stemCol0}" />
          <stop offset="60%" stop-color="${stemCol0}" />
          <stop offset="100%" stop-color="${stemCol100}" />
        </linearGradient>

        
        <radialGradient id="lotusLeafGrad" cx="45%" cy="45%" r="55%">
          <stop offset="0%" stop-color="${leafCol0}" />
          <stop offset="70%" stop-color="${leafCol0}" />
          <stop offset="100%" stop-color="${leafCol100}" />
        </radialGradient>
      </defs>

      
      <g id="lotusStems">
        <path d="M 75 128 C 75 115, 75 108, 75 80 C 74 60, 75 40, 75 28" stroke="url(#lotusStemGrad)" stroke-width="3.6" fill="none" stroke-linecap="round" />
        <path d="M 74 128 C 74 115, 74 108, 68 96 C 60 84, 52 70, 46 54" stroke="url(#lotusStemGrad)" stroke-width="3.2" fill="none" stroke-linecap="round" />
        <path d="M 76 128 C 76 115, 76 108, 82 96 C 90 84, 98 66, 104 48" stroke="url(#lotusStemGrad)" stroke-width="3.0" fill="none" stroke-linecap="round" />
        <path d="M 73 128 C 73 115, 73 108, 64 96 C 54 84, 40 78, 32 72" stroke="url(#lotusStemGrad)" stroke-width="2.6" fill="none" stroke-linecap="round" />

        
        <circle cx="75" cy="95" r="1.2" fill="${stemCol100}" />
        <circle cx="74" cy="75" r="1.2" fill="${stemCol100}" />
        <circle cx="62" cy="85" r="1.1" fill="${stemCol100}" />
        <circle cx="86" cy="80" r="1.1" fill="${stemCol100}" />
      </g>

      
      <g id="lotusLeaves" style="opacity: ${leafOpacity}; transition: ${'opacity 0.8s ease-out'};">
        
        <g class="animate-leaf-sway-1" style="transform-origin: ${'32px 72px'};">
          <ellipse cx="32" cy="72" rx="28" ry="14" fill="url(#lotusLeafGrad)" transform="rotate(-18, 32, 72)" />
          
          <path d="M 32 72 Q 16 66 8 68 M 32 72 Q 22 82 14 84 M 32 72 Q 44 64 54 62 M 32 72 Q 42 82 50 82" stroke="${calyxCol}" stroke-width="0.8" fill="none" opacity="0.6" />
          <circle cx="32" cy="72" r="2.2" fill="${stemCol100}" />
        </g>

        
        <g class="animate-leaf-sway-2" style="transform-origin: ${'116px 82px'};">
          <ellipse cx="116" cy="82" rx="24" ry="11" fill="url(#lotusLeafGrad)" transform="rotate(22, 116, 82)" />
          <path d="M 116 82 Q 102 78 96 80 M 116 82 Q 106 90 100 92 M 116 82 Q 128 76 134 76 M 116 82 Q 126 88 132 88" stroke="${calyxCol}" stroke-width="0.7" fill="none" opacity="0.6" />
          <circle cx="116" cy="82" r="1.8" fill="${stemCol100}" />
        </g>
      </g>

      
      <g id="lotusBlossoms">
        
        <g transform="translate(75, 28) scale(0.96)">
          <g class="animate-flower-sway-crown">
            <g style="opacity: ${crownState.opacity}; transform: ${`translateY(${crownState.droopY}px)`}; transition: ${'opacity 0.8s ease-out'};">
              
              <path d="M 0 0 C -36 -12 -42 -36 -28 -52 C -12 -38 -4 -16 0 0 Z" fill="url(#lotusPetalMainGrad)" stroke="#fecdd3" stroke-width="0.6" />
              <path d="M 0 0 C 36 -12 42 -36 28 -52 C 12 -38 4 -16 0 0 Z" fill="url(#lotusPetalMainGrad)" stroke="#fecdd3" stroke-width="0.6" />
              <path d="M 0 0 C -48 4 -46 -22 -32 -38 C -18 -26 -4 -10 0 0 Z" fill="url(#lotusPetalMainGrad)" stroke="#fecdd3" stroke-width="0.5" />
              <path d="M 0 0 C 48 4 46 -22 32 -38 C 18 -26 4 -10 0 0 Z" fill="url(#lotusPetalMainGrad)" stroke="#fecdd3" stroke-width="0.5" />
              
              
              <path d="M 0 0 C -22 -18 -26 -48 -8 -58 C 4 -44 2 -18 0 0 Z" fill="url(#lotusPetalInnerGrad)" stroke="#fecdd3" stroke-width="0.7" />
              <path d="M 0 0 C 22 -18 26 -48 8 -58 C -4 -44 -2 -18 0 0 Z" fill="url(#lotusPetalInnerGrad)" stroke="#fecdd3" stroke-width="0.7" />
              <path d="M 0 0 C -12 -22 -14 -56 0 -64 C 14 -56 12 -22 0 0 Z" fill="url(#lotusPetalInnerGrad)" stroke="#fecdd3" stroke-width="0.8" />

              
              <g transform="translate(0, -32)">
                <ellipse cx="0" cy="0" rx="9" ry="6" fill="${podCol}" stroke="#a16207" stroke-width="0.6" />
                
                <circle cx="-4" cy="-1.5" r="1.2" fill="#713f12" />
                <circle cx="0" cy="-2.5" r="1.2" fill="#713f12" />
                <circle cx="4" cy="-1.5" r="1.2" fill="#713f12" />
                <circle cx="-2" cy="1.5" r="1.2" fill="#713f12" />
                <circle cx="2" cy="1.5" r="1.2" fill="#713f12" />
                
                ${Array.from({ length: 12 }).map((_, i) => {
                  const rad = (i * 30 * Math.PI) / 180;
                  const rx = Math.cos(rad) * 11;
                  const ry = Math.sin(rad) * 7.5;
                  return `<circle cx="${rx}" cy="${ry}" r="1.0" fill="#fde047" />`;
                }).join('')}
              </g>

              
              <path d="M -6 0 C -18 -10 -16 -32 -2 -38 C 6 -26 4 -10 -6 0 Z" fill="url(#lotusPetalInnerGrad)" opacity="0.95" />
              <path d="M 6 0 C 18 -10 16 -32 2 -38 C -6 -26 -4 -10 6 0 Z" fill="url(#lotusPetalInnerGrad)" opacity="0.95" />
            </g>
          </g>
        </g>

        
        <g transform="translate(46, 54) scale(0.82)">
          <g class="animate-flower-sway-left">
            <g style="opacity: ${secState.opacity}; transform: ${`translateY(${secState.droopY}px)`}; transition: ${'opacity 0.8s ease-out'};">
              <path d="M 0 0 C -26 -14 -28 -38 -14 -48 C -2 -34 0 -16 0 0 Z" fill="url(#lotusPetalMainGrad)" stroke="#fecdd3" stroke-width="0.6" />
              <path d="M 0 0 C 24 -12 28 -36 14 -46 C 2 -32 0 -14 0 0 Z" fill="url(#lotusPetalMainGrad)" stroke="#fecdd3" stroke-width="0.6" />
              <path d="M 0 0 C -12 -18 -16 -46 0 -54 C 14 -46 10 -18 0 0 Z" fill="url(#lotusPetalInnerGrad)" stroke="#fecdd3" stroke-width="0.7" />
              <circle cx="0" cy="-24" r="4.5" fill="${podCol}" opacity="0.8" />
            </g>
          </g>
        </g>

        
        <g transform="translate(104, 48) scale(0.72)">
          <g class="animate-flower-sway-bud">
            <g style="opacity: ${budState.opacity}; transform: ${`translateY(${budState.droopY}px)`}; transition: ${'opacity 0.8s ease-out'};">
              
              <path d="M -4 4 C -8 -6 -6 -16 0 -20 C 6 -16 8 -6 4 4 Z" fill="${calyxCol}" />
              
              <ellipse cx="0" cy="-18" rx="8" ry="18" fill="url(#lotusPetalMainGrad)" stroke="#fecdd3" stroke-width="0.6" transform="rotate(16, 0, -18)" />
            </g>
          </g>
        </g>
      </g>
    </g>`
  );
};
