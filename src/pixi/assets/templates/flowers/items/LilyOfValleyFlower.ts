/**
 * @file LilyOfValleyFlower.tsx
 * @description 【如意铃兰 / 幽谷百合】
 * 严格按照高精影视级特写参考图重塑：
 * 1. 如意铃兰无叶：文人雅供，三支优美挺秀花葶插瓶，纯净高洁；
 * 2. 径硬挺拔，由粗入细：下深绿、中翠绿、上透嫩黄，基部粗壮硬挺，至顶梢渐变纤细灵动；
 * 3. 花如铃铛倒垂：每朵花由独立拱弧花梗（带微型膜质苞片）垂挂，呈优美倒钟形；
 * 4. 花瓣向外翻卷：钟口 6 枚花瓣裂片鲜明外翻、翘起微卷，微距细节分明；
 * 5. 影视级光感与羊脂玉瓷质：
 *    - 纯净白玉高光、通透半透明质感与纵向瓣棱反光；
 *    - 绝无死灰阴影与平涂涂抹感；
 *    - 梢头点缀数颗圆润透青的珍珠花蕾（花骨朵）。
 */
import { FlowerRenderProps, FallingPetalDef } from '../types';
import { lerpColor, getBlossomDropStyle, getFlowerAgingFilter } from '../utils/lifecycle';

export const VALLEY_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.50, fallSpan: 0.07, startX: 104, startY: 74, landX: 110, landY: 194, rx: 4.8, ry: 4.2, landRot: 24, swayAmp: 14, swayFreq: 3.2 },
  { id: 2, detachHealth: 0.40, fallSpan: 0.06, startX: 42, startY: 68, landX: 38, landY: 193, rx: 4.6, ry: 4.0, landRot: -26, swayAmp: 12, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.28, fallSpan: 0.06, startX: 86, startY: 82, landX: 92, landY: 195, rx: 5.0, ry: 4.4, landRot: -18, swayAmp: 16, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.18, fallSpan: 0.05, startX: 58, startY: 48, landX: 64, landY: 197, rx: 5.2, ry: 4.5, landRot: 32, swayAmp: 18, swayFreq: 4.0 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.04, startX: 74, startY: 96, landX: 78, landY: 196, rx: 4.8, ry: 4.2, landRot: 15, swayAmp: 14, swayFreq: 4.2 },
];

export const renderLilyOfValleyFlower = (props: FlowerRenderProps): string => {
  const { health, dryFactor, isFaded } = props;
  const agingStyle = getFlowerAgingFilter(health, isFaded);

  // ── 白玉铃铛色调（纯净瓷白至温润茶褐衰变） ──
  const bellHighlight = lerpColor('#ffffff', '#faf6ee', dryFactor);
  const bellBodyWhite = lerpColor('#f8fafc', '#ece2d0', dryFactor);
  const bellSoftShade = lerpColor('#e2e8f0', '#d2c0a8', dryFactor);
  const bellDepthShade = lerpColor('#cbd5e1', '#b8a184', dryFactor);
  const innerMouthDepth = lerpColor('#cbd5e1', '#a89073', dryFactor);
  const pistilCreamGold = lerpColor('#fef08a', '#cbb37a', dryFactor);

  // ── 花梗与花萼嫩绿 ──
  const calyxTender = lerpColor('#65a30d', '#615f33', dryFactor);
  const pedicelTender = lerpColor('#84cc16', '#7a783e', dryFactor);
  const pedicelBract = lerpColor('#bef264', '#9e9c56', dryFactor);

  // ── 硬挺花葶渐变（下深绿、中翠绿、上透嫩黄） ──
  const stemDark = lerpColor('#143d1a', '#2d2816', dryFactor);
  const stemMid = lerpColor('#16a34a', '#4a4927', dryFactor);
  const stemLight = lerpColor('#65a30d', '#6d6c38', dryFactor);
  const stemTopYellow = lerpColor('#facc15', '#a89c4f', dryFactor);

  const fl1 = getBlossomDropStyle(health, 0.50);
  const fl2 = getBlossomDropStyle(health, 0.40);
  const fl3 = getBlossomDropStyle(health, 0.28);
  const fl4 = getBlossomDropStyle(health, 0.18);
  const fl5 = getBlossomDropStyle(health, 0.08);

  /**
   * 渲染带拱弧花梗的高清倒垂白玉风铃 (Pendant Bell Blossom with Pedicel)
   * @param sx 花梗在花葶上的节点 X
   * @param sy 花梗在花葶上的节点 Y
   * @param bx 铃花顶部花托挂点 X
   * @param by 铃花顶部花托挂点 Y
   * @param scale 绽放缩放尺度
   * @param rot 微倾角度
   * @param mode 花朵状态：'open' (完全盛开) | 'semi' (初放半开) | 'bud' (珍珠花蕾)
   */
  const renderPendantBloom = (
    sx: number,
    sy: number,
    bx: number,
    by: number,
    scale: number = 1.0,
    rot: number = 0,
    mode: 'open' | 'semi' | 'bud' = 'open'
  ) => {
    // 自然柔和花梗曲线：从节点平缓挑出并优雅弧弯下垂至花顶
    const isLeft = bx < sx;
    const cp1x = sx + (isLeft ? -1 : 1) * Math.abs(sx - bx) * 0.4;
    const cp1y = sy - 2.8;
    const cp2x = bx + (isLeft ? -0.5 : 0.5);
    const cp2y = by - 4.5;

    return (
      `<g>
        
        <path d="${`M ${sx} ${sy} Q ${sx + (isLeft ? -1.4 : 1.4)} ${sy - 2.8} ${sx + (isLeft ? -0.8 : 0.8)} ${sy - 4.2}`}" stroke="${pedicelBract}" stroke-width="0.65" fill="none" stroke-linecap="round" opacity="0.85" />

        
        <path d="${`M ${sx} ${sy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${bx} ${by}`}" stroke="url(#valleyPedicelGrad)" stroke-width="0.9" fill="none" stroke-linecap="round" />

        
        <g transform="${`translate(${bx}, ${by}) rotate(${rot}) scale(${scale})`}">
          <g class="${isLeft ? 'animate-sway-bell-chime-1' : 'animate-sway-bell-chime-2'}" style="transform-origin: ${'0px 0px'};">
            
            <ellipse cx="0" cy="0.4" rx="1.1" ry="0.55" fill="${calyxTender}" />
            <circle cx="0" cy="0.1" r="0.6" fill="${pedicelTender}" />

          ${mode === 'open' ? `
            <g filter="url(#valleySoftGlow)">
              <!-- A. 钟体外轮廓：上端圆润饱满，下端收束并向外外翻卷起 6 枚裂片 -->
              <path
                d="
                  M 0 0.5
                  C -2.8 0.6, -5.2 2.6, -5.8 5.6
                  C -6.4 8.2, -5.8 10.2, -5.3 11.5
                  C -5.8 12.2, -7.4 12.6, -7.0 13.8
                  C -6.4 13.0, -4.8 12.5, -4.2 12.6
                  C -3.8 14.0, -2.6 14.8, -2.2 14.8
                  C -1.8 13.6, -0.8 13.0, 0 13.1
                  C 0.8 13.0, 1.8 13.6, 2.2 14.8
                  C 2.6 14.8, 3.8 14.0, 4.2 12.6
                  C 4.8 12.5, 6.4 13.0, 7.0 13.8
                  C 7.4 12.6, 5.8 12.2, 5.3 11.5
                  C 5.8 10.2, 6.4 8.2, 5.8 5.6
                  C 5.2 2.6, 2.8 0.6, 0 0.5
                  Z
                "
                fill="url(#valleyBellPorcelainGrad)"
                stroke="${bellDepthShade}"
                stroke-width="0.3"
              />

              <!-- B. 钟口内膛柔和浅影（通透自然，绝非生硬死灰大洞） -->
              <path
                d="M -4.8 12.2 Q 0 11.0 4.8 12.2 Q 0 13.2 -4.8 12.2 Z"
                fill="url(#valleyInnerDepthGrad)"
              />
              <!-- 隐约可见的娇嫩花蕊 -->
              <circle cx="0" cy="11.8" r="0.65" fill="${pistilCreamGold}" opacity="0.9" />

              <!-- C. 鲜明外翻、翘起微卷的 4 枚前向花瓣裂片（花瓣向外翻卷） -->
              <path
                d="M -7.0 13.8 C -6.3 12.8, -4.8 12.5, -4.2 12.6 C -5.0 13.4, -6.1 14.3, -7.0 13.8 Z"
                fill="url(#valleyLobeGrad)"
                stroke="${bellHighlight}"
                stroke-width="0.32"
              />
              <path
                d="M -4.2 12.6 C -3.5 14.2, -2.2 14.8, -1.2 13.6 C -1.8 12.8, -3.0 12.5, -4.2 12.6 Z"
                fill="url(#valleyLobeGrad)"
                stroke="${bellHighlight}"
                stroke-width="0.32"
              />
              <path
                d="M -1.2 13.6 C -0.2 14.8, 1.2 14.8, 2.2 13.6 C 1.2 12.6, 0.0 12.5, -1.2 13.6 Z"
                fill="url(#valleyLobeGrad)"
                stroke="${bellHighlight}"
                stroke-width="0.32"
              />
              <path
                d="M 2.2 13.6 C 3.2 14.8, 4.5 14.2, 5.2 12.6 C 4.0 12.5, 2.8 12.8, 2.2 13.6 Z"
                fill="url(#valleyLobeGrad)"
                stroke="${bellHighlight}"
                stroke-width="0.32"
              />
              <path
                d="M 4.2 12.6 C 4.8 12.5, 6.4 13.0, 7.0 13.8 C 6.1 14.3, 5.0 13.4, 4.2 12.6 Z"
                fill="url(#valleyLobeGrad)"
                stroke="${bellHighlight}"
                stroke-width="0.32"
              />

              <!-- D. 羊脂白玉立体纵向瓣棱与高光反射 -->
              <path d="M 0 1.2 Q 0 7.0 0 12.5" stroke="${bellHighlight}" stroke-width="0.8" fill="none" opacity="0.85" />
              <path d="M -0.6 1.5 Q -1.6 6.5 -2.0 13.2" stroke="${bellHighlight}" stroke-width="0.6" fill="none" opacity="0.8" />
              <path d="M 0.6 1.5 Q 1.6 6.5 2.0 13.2" stroke="${bellHighlight}" stroke-width="0.5" fill="none" opacity="0.7" />
              <path d="M -1.5 1.8 Q -3.6 6.0 -4.2 11.5" stroke="${bellHighlight}" stroke-width="0.5" fill="none" opacity="0.75" />
              <path d="M -2.0 2.2 Q -4.6 4.8 -4.2 9.0" stroke="${bellHighlight}" stroke-width="0.8" fill="none" opacity="0.9" />
            </g>
          ` : mode === 'semi' ? `
            <g filter="url(#valleySoftGlow)">
              <path
                d="
                  M 0 0.5
                  C -2.2 0.6, -4.2 2.2, -4.6 4.8
                  C -5.0 7.0, -4.5 8.6, -4.2 9.8
                  C -4.8 10.4, -5.8 10.8, -5.4 11.6
                  C -4.8 11.0, -3.8 10.6, -3.2 10.8
                  C -2.8 11.8, -1.8 12.4, -1.5 12.4
                  C -1.2 11.5, -0.6 11.0, 0 11.0
                  C 0.6 11.0, 1.2 11.5, 1.5 12.4
                  C 1.8 12.4, 2.8 11.8, 3.2 10.8
                  C 3.8 10.6, 4.8 11.0, 5.4 11.6
                  C 5.8 10.8, 4.8 10.4, 4.2 9.8
                  C 4.5 8.6, 5.0 7.0, 4.6 4.8
                  C 4.2 2.2, 2.2 0.6, 0 0.5
                  Z
                "
                fill="url(#valleyBellPorcelainGrad)"
                stroke="${bellDepthShade}"
                stroke-width="0.28"
              />
              <path d="M -3.2 10.0 Q 0 9.2 3.2 10.0 Q 0 10.8 -3.2 10.0 Z" fill="url(#valleyInnerDepthGrad)" />
              <path d="M 0 1.0 Q 0 5.5 0 10.0" stroke="${bellHighlight}" stroke-width="0.65" fill="none" opacity="0.85" />
              <path d="M -1.5 1.5 Q -3.0 4.5 -2.8 8.0" stroke="${bellHighlight}" stroke-width="0.75" fill="none" opacity="0.9" />
            </g>
          ` : `
            <g filter="url(#valleySoftGlow)">
              <ellipse cx="0" cy="3.6" rx="3.0" ry="3.8" fill="url(#valleyBudPorcelainGrad)" stroke="${calyxTender}" stroke-width="0.25" />
              <!-- 花蕾瓣缝与反光 -->
              <path d="M 0 0.5 L 0 7.0" stroke="${pedicelTender}" stroke-width="0.3" opacity="0.7" />
              <circle cx="-0.9" cy="2.6" r="0.7" fill="${bellHighlight}" opacity="0.85" />
            </g>
          `}
          </g>
        </g>
      </g>`
    );
  };

  return (
    `<g id="lilyOfValleyFlora" style="${agingStyle}">
      <defs>
        
        <linearGradient id="valleyStemGrad1" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="${stemDark}" />
          <stop offset="35%" stop-color="${stemMid}" />
          <stop offset="70%" stop-color="${stemLight}" />
          <stop offset="100%" stop-color="${pedicelTender}" />
        </linearGradient>

        
        <linearGradient id="valleyStemGrad2" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="${stemMid}" />
          <stop offset="55%" stop-color="${stemLight}" />
          <stop offset="85%" stop-color="${pedicelBract}" />
          <stop offset="100%" stop-color="${stemTopYellow}" />
        </linearGradient>

        
        <linearGradient id="valleyPedicelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${pedicelTender}" />
          <stop offset="60%" stop-color="${calyxTender}" />
          <stop offset="100%" stop-color="${stemLight}" />
        </linearGradient>

        
        <radialGradient id="valleyBellPorcelainGrad" cx="36%" cy="32%" r="68%">
          <stop offset="0%" stop-color="${bellHighlight}" />
          <stop offset="48%" stop-color="${bellBodyWhite}" />
          <stop offset="80%" stop-color="${bellSoftShade}" />
          <stop offset="96%" stop-color="${bellDepthShade}" />
          <stop offset="100%" stop-color="${bellSoftShade}" />
        </radialGradient>

        
        <radialGradient id="valleyInnerDepthGrad" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stop-color="${innerMouthDepth}" />
          <stop offset="60%" stop-color="${bellSoftShade}" />
          <stop offset="100%" stop-color="${bellBodyWhite}" />
        </radialGradient>

        
        <linearGradient id="valleyLobeGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="${bellHighlight}" />
          <stop offset="70%" stop-color="${bellBodyWhite}" />
          <stop offset="100%" stop-color="${bellSoftShade}" />
        </linearGradient>

        
        <radialGradient id="valleyBudPorcelainGrad" cx="35%" cy="32%" r="65%">
          <stop offset="0%" stop-color="${bellHighlight}" />
          <stop offset="55%" stop-color="${bellBodyWhite}" />
          <stop offset="85%" stop-color="${pedicelBract}" />
          <stop offset="100%" stop-color="${calyxTender}" />
        </radialGradient>

        
        <filter id="valleySoftGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0.4" dy="0.9" stdDeviation="0.6" floodColor="#0f172a" floodOpacity="0.18" />
        </filter>
      </defs>

      
      <g id="valleyStemsSpikes">
        
        
        <path d="M 75 128 C 75 105, 76 80, 75 60" stroke="url(#valleyStemGrad1)" stroke-width="3.2" fill="none" stroke-linecap="round" />
        
        <path d="M 75 60 C 74 44, 76 30, 78 18" stroke="url(#valleyStemGrad2)" stroke-width="1.6" fill="none" stroke-linecap="round" />

        
        
        <path d="M 72 128 C 70 106, 65 85, 56 65" stroke="url(#valleyStemGrad1)" stroke-width="2.9" fill="none" stroke-linecap="round" />
        
        <path d="M 56 65 C 48 48, 40 38, 33 28" stroke="url(#valleyStemGrad2)" stroke-width="1.4" fill="none" stroke-linecap="round" />

        
        
        <path d="M 77 128 C 80 108, 87 90, 95 72" stroke="url(#valleyStemGrad1)" stroke-width="2.7" fill="none" stroke-linecap="round" />
        
        <path d="M 95 72 C 102 58, 108 50, 114 44" stroke="url(#valleyStemGrad2)" stroke-width="1.3" fill="none" stroke-linecap="round" />
      </g>

      
      <g id="valleyBellsRacemes">
        
        <g id="valleySpike1Bells" class="animate-flower-sway-crown-gentle" style="transform-origin: ${'75px 128px'};">
          
          ${renderPendantBloom(78, 18, 80, 16, 0.65, 8, 'bud')}
          ${renderPendantBloom(77, 24, 73, 22, 0.72, -10, 'bud')}

          
          ${renderPendantBloom(76, 32, 83, 30, 0.82, 12, 'semi')}
          ${renderPendantBloom(75, 42, 67, 40, 0.92, -8, 'open')}
          ${renderPendantBloom(75, 54, 84, 52, 1.02, 6, 'open')}
          ${renderPendantBloom(75, 68, 66, 66, 1.08, -6, 'open')}
          ${renderPendantBloom(75, 84, 85, 82, 1.14, 5, 'open')}
          ${renderPendantBloom(75, 100, 66, 98, 1.18, -4, 'open')}
        </g>

        
        <g id="valleySpike2Bells" class="animate-flower-sway-left-gentle" style="transform-origin: ${'72px 128px'};">
          
          ${renderPendantBloom(33, 28, 30, 26, 0.62, -15, 'bud')}
          ${renderPendantBloom(36, 34, 41, 32, 0.70, 12, 'bud')}

          
          ${renderPendantBloom(42, 42, 34, 42, 0.84, -10, 'semi')}
          ${renderPendantBloom(48, 52, 56, 50, 0.94, 8, 'open')}
          ${renderPendantBloom(56, 64, 46, 64, 1.04, -6, 'open')}
          ${renderPendantBloom(63, 78, 54, 78, 1.10, -4, 'open')}
          ${renderPendantBloom(68, 94, 58, 94, 1.15, -2, 'open')}
        </g>

        
        <g id="valleySpike3Bells" class="animate-flower-sway-right-gentle" style="transform-origin: ${'77px 128px'};">
          
          ${renderPendantBloom(114, 44, 116, 42, 0.62, 14, 'bud')}
          ${renderPendantBloom(111, 48, 106, 46, 0.72, -10, 'bud')}

          
          ${renderPendantBloom(106, 55, 114, 54, 0.86, 10, 'semi')}
          ${renderPendantBloom(98, 66, 90, 64, 0.98, -8, 'open')}
          ${renderPendantBloom(92, 78, 101, 76, 1.08, 6, 'open')}
          ${renderPendantBloom(85, 92, 76, 90, 1.14, -4, 'open')}
          ${renderPendantBloom(80, 106, 90, 104, 1.16, 4, 'open')}
        </g>
      </g>
    </g>`
  );
};
