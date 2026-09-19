/**
 * @file GodRaysScene.ts
 * @description 丁达尔晨曦光束场景元素（纯 TS，无 React 依赖）。
 *
 * 自持 DOM 结构与配色状态：时段变化重建 SVG（渐变色标内联），
 * 强度与角度变化只更新样式，避免无谓重建。
 */
import type { TimeOfDay } from '../../../types';

export interface GodRaysOptions {
  /** 是否启用 */
  enabled: boolean;
  /** 光束强度（0~1） */
  intensity: number;
  /** 太阳角度（ deg，控制光束倾角） */
  sunAngle: number;
  /** 时段（决定光束配色） */
  timeOfDay: TimeOfDay;
}

interface RayPalette {
  primary: string;
  beam1: string;
  beam2: string;
  ambientHaze: string;
}

let uidSeq = 0;

const paletteOf = (timeOfDay: TimeOfDay): RayPalette => {
  switch (timeOfDay) {
    case 'sunset':
      return {
        primary: 'rgba(255, 185, 100, 0.65)',
        beam1: 'rgba(255, 160, 75, 0.45)',
        beam2: 'rgba(255, 200, 120, 0.22)',
        ambientHaze: 'rgba(255, 175, 90, 0.15)',
      };
    case 'night':
      return {
        primary: 'rgba(175, 205, 255, 0.35)',
        beam1: 'rgba(150, 190, 255, 0.22)',
        beam2: 'rgba(190, 220, 255, 0.12)',
        ambientHaze: 'rgba(160, 200, 255, 0.08)',
      };
    case 'day':
    default:
      return {
        primary: 'rgba(255, 246, 218, 0.72)',
        beam1: 'rgba(255, 236, 185, 0.52)',
        beam2: 'rgba(255, 245, 220, 0.28)',
        ambientHaze: 'rgba(255, 240, 200, 0.18)',
      };
  }
};

export class GodRaysScene {
  private readonly root: HTMLDivElement;
  private readonly uid: string;
  private opts: GodRaysOptions;
  private renderedTimeOfDay: TimeOfDay | null = null;

  constructor(opts: GodRaysOptions) {
    this.opts = opts;
    this.uid = `godrays-${++uidSeq}`;
    this.root = document.createElement('div');
    this.root.className =
      'absolute inset-0 pointer-events-none overflow-hidden select-none z-10 transition-opacity duration-700';
    // 模拟光学加色混合，光束与背景平滑叠加
    this.root.style.mixBlendMode = 'screen';
  }

  mount(container: HTMLElement): void {
    container.appendChild(this.root);
    this.rebuild();
  }

  setOptions(patch: Partial<GodRaysOptions>): void {
    const prevTimeOfDay = this.opts.timeOfDay;
    this.opts = { ...this.opts, ...patch };
    // 配色内联在渐变定义中，换时段才需要重建
    if (prevTimeOfDay !== this.opts.timeOfDay) this.rebuild();
    else this.applyStyle();
  }

  destroy(): void {
    this.root.remove();
  }

  private rebuild(): void {
    const { enabled, intensity } = this.opts;
    if (!enabled || intensity <= 0.02) {
      this.root.innerHTML = '';
      this.renderedTimeOfDay = null;
      return;
    }
    this.renderedTimeOfDay = this.opts.timeOfDay;
    this.root.innerHTML = this.buildMarkup();
    this.applyStyle();
  }

  private applyStyle(): void {
    const { intensity, sunAngle } = this.opts;
    this.root.style.opacity = String(Math.min(1, (Number(intensity) || 0) * 0.95));
    const group = this.root.querySelector<SVGGElement>(`#${this.uid}-group`);
    if (group) {
      group.style.transformOrigin = '400px 120px';
      group.style.transform = `rotate(${sunAngle * 0.45}deg)`;
      group.style.transition = 'transform 0.4s ease-out';
    }
  }

  private buildMarkup(): string {
    const c = paletteOf(this.opts.timeOfDay);
    const idFilter = `${this.uid}-blur`;
    const idMask = `${this.uid}-mask`;
    const idMain = `${this.uid}-main`;
    const idLeft = `${this.uid}-left`;
    const idRight = `${this.uid}-right`;

    return `
<svg class="w-full h-full" viewBox="0 0 800 1000" preserveAspectRatio="none">
  <defs>
    <filter id="${idFilter}" x="-30%" y="-20%" width="160%" height="150%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="22 10" />
    </filter>
    <linearGradient id="${idMask}" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#fff" stop-opacity="0" />
      <stop offset="12%" stop-color="#fff" stop-opacity="0.4" />
      <stop offset="35%" stop-color="#fff" stop-opacity="1" />
      <stop offset="70%" stop-color="#fff" stop-opacity="0.65" />
      <stop offset="95%" stop-color="#fff" stop-opacity="0.1" />
      <stop offset="100%" stop-color="#fff" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="${idMain}" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="${c.primary}" stop-opacity="0" />
      <stop offset="15%" stop-color="${c.primary}" stop-opacity="0.55" />
      <stop offset="35%" stop-color="${c.beam1}" stop-opacity="0.75" />
      <stop offset="60%" stop-color="${c.beam2}" stop-opacity="0.35" />
      <stop offset="85%" stop-color="${c.beam2}" stop-opacity="0.1" />
      <stop offset="100%" stop-color="${c.primary}" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="${idLeft}" x1="45%" y1="5%" x2="20%" y2="100%">
      <stop offset="0%" stop-color="${c.beam1}" stop-opacity="0" />
      <stop offset="20%" stop-color="${c.beam1}" stop-opacity="0.6" />
      <stop offset="45%" stop-color="${c.beam1}" stop-opacity="0.45" />
      <stop offset="75%" stop-color="${c.beam2}" stop-opacity="0.18" />
      <stop offset="100%" stop-color="${c.primary}" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="${idRight}" x1="55%" y1="5%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="${c.beam1}" stop-opacity="0" />
      <stop offset="20%" stop-color="${c.beam1}" stop-opacity="0.6" />
      <stop offset="45%" stop-color="${c.beam1}" stop-opacity="0.45" />
      <stop offset="75%" stop-color="${c.beam2}" stop-opacity="0.18" />
      <stop offset="100%" stop-color="${c.primary}" stop-opacity="0" />
    </linearGradient>
  </defs>
  <g id="${this.uid}-group" mask="url(#${idMask})" filter="url(#${idFilter})">
    <polygon points="240,-50 560,-50 780,1050 20,1050" fill="url(#${idMain})" opacity="0.85" />
    <polygon points="320,0 480,0 640,1050 160,1050" fill="url(#${idMain})" opacity="0.75" />
    <polygon points="310,30 420,30 390,1050 100,1050" fill="url(#${idLeft})" opacity="0.6" />
    <polygon points="420,30 500,30 700,1050 440,1050" fill="url(#${idRight})" opacity="0.55" />
  </g>
</svg>`.trim();
  }
}
