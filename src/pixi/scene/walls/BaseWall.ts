/**
 * @file BaseWall.ts
 * @description 背景墙外壳（纯 TS 场景元素）：统一处理景深渐变、晨昏光照色相偏移与居中挂落阴影。
 *
 * 风格模块以 SVG / HTML 字符串注入对应插槽，本文件只负责壳体结构与光照氛围。
 */
import { WallAmbiance } from './types';

/** 通用鎏金描边渐变（各风格共用） */
export const WALL_GOLD_FILLET_DEFS = `
    <linearGradient id="goldFilletGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e8cd8a" />
      <stop offset="35%" stop-color="#caa262" />
      <stop offset="70%" stop-color="#9a7638" />
      <stop offset="100%" stop-color="#6e4f1f" />
    </linearGradient>`;

export interface BaseWallOptions {
  masterOn?: boolean;
  sunlightIntensity?: number;
  ambiance: WallAmbiance;
  /** 风格专属渐变与图案（SVG <defs> 片段） */
  defsSlot?: string;
  /** 风格专属环境装饰层（HTML 片段，如竹影、落地宫灯、青竹） */
  environmentSlot?: string;
  /** 风格主体画面（SVG 片段） */
  contentSlot: string;
}

export const renderBaseWall = ({
  masterOn = true,
  sunlightIntensity = 0.92,
  ambiance,
  defsSlot = '',
  environmentSlot = '',
  contentSlot,
}: BaseWallOptions): string => {
  const safeIntensity = Number.isFinite(sunlightIntensity) ? sunlightIntensity : 0.92;
  const effectiveOpacity = masterOn ? Math.max(0.35, safeIntensity) : 0.45;

  // 柔和天光滤色（screen 混合，绝无硬切边缘）
  const glow = masterOn
    ? `<div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-[840px] h-[860px] pointer-events-none transition-all duration-700"
        style="background:radial-gradient(ellipse at 50% 32%, ${ambiance.halo} 0%, rgba(255,248,230,0.18) 32%, rgba(255,245,220,0.06) 62%, transparent 88%);opacity:${effectiveOpacity};mix-blend-mode:screen"
      />`
    : '';

  // 窗洞背后的日/月光源
  const sunOrb =
    masterOn && ambiance.sunOrb !== 'transparent'
      ? `<div
          class="absolute top-12 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full pointer-events-none z-0"
          style="background:${ambiance.sunOrb};transform:scale(${(
            0.9 +
            safeIntensity * 0.4
          ).toFixed(3)});mix-blend-mode:screen"
        />`
      : '';

  return `
    <div class="absolute inset-x-0 top-0 bottom-0 flex flex-col items-center pointer-events-none select-none z-0 overflow-hidden">
      ${glow}
      ${environmentSlot}
      <div
        class="relative w-[380px] sm:w-[440px] h-[660px] sm:h-[740px] mt-2 flex flex-col items-center overflow-visible"
        style="opacity:${effectiveOpacity};transition:opacity 0.6s ease"
      >
        ${sunOrb}
        <svg viewBox="0 0 420 720" class="relative z-10 w-full h-full" preserveAspectRatio="none">
          <defs>
            ${WALL_GOLD_FILLET_DEFS}
            ${defsSlot}
          </defs>
          ${contentSlot}
        </svg>
      </div>
    </div>`;
};
