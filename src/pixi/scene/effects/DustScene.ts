/**
 * @file DustScene.ts
 * @description 空气微尘悬浮场景元素（纯 TS，无 React 依赖）。
 *
 * 自己持有粒子数据、自驱动动画与销毁逻辑；外部只需挂载容器并按需更新参数。
 * 供 SpaceRenderer 统一编排，也可由 UI 侧的薄包装临时挂载。
 */
import type { TimeOfDay } from '../../../types';

interface Mote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
}

export interface DustSceneOptions {
  /** 浮尘密度（0~1 量级） */
  density: number;
  /** 日照强度（0~1） */
  sunlightIntensity: number;
  /** 风力 */
  windForce?: number;
  /** 时段 */
  timeOfDay: TimeOfDay;
}

const MAX_MOTES = 120;

/** 预渲染发光微尘精灵：明亮核心 + 柔和外晕 */
function createDustSprite(r: number, g: number, b: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(16, 16, 2, 16, 16, 15);
    grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
    grad.addColorStop(0.35, `rgba(${r}, ${g}, ${b}, 0.7)`);
    grad.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, 0.25)`);
    grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(16, 16, 15, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(16, 16, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }
  return canvas;
}

export class DustScene {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D | null;
  private motes: Mote[] = [];
  private sprites: Record<string, HTMLCanvasElement> | null = null;
  private raf: number | null = null;
  private time = 0;
  private opts: DustSceneOptions;
  private readonly handleResize = () => this.resize();

  constructor(opts: DustSceneOptions) {
    this.opts = opts;
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'absolute inset-0 w-full h-full pointer-events-none select-none z-15';
    this.canvas.style.transform = 'translateZ(0)';
    this.canvas.style.willChange = 'transform';
    this.ctx = this.canvas.getContext('2d', { alpha: true });
  }

  /** 挂载到指定容器并开始动画 */
  mount(container: HTMLElement): void {
    if (!this.ctx) return;
    container.appendChild(this.canvas);

    if (!this.sprites) {
      this.sprites = {
        day: createDustSprite(255, 242, 205),
        sunset: createDustSprite(255, 215, 160),
        night: createDustSprite(200, 230, 255),
      };
    }

    this.resize();
    window.addEventListener('resize', this.handleResize);
    this.seedMotes();
    this.loop();
  }

  /** 更新场景参数（密度、日照、风力、时段） */
  setOptions(patch: Partial<DustSceneOptions>): void {
    this.opts = { ...this.opts, ...patch };
  }

  /** 供外部统一 ticker 驱动；不调用时由内部 rAF 自驱动 */
  update(): void {
    this.step();
  }

  destroy(): void {
    if (this.raf !== null) {
      cancelAnimationFrame(this.raf);
      this.raf = null;
    }
    window.removeEventListener('resize', this.handleResize);
    this.canvas.remove();
  }

  private resize(): void {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = Math.max(1, Math.round(rect.width));
    this.canvas.height = Math.max(1, Math.round(rect.height));
  }

  private seedMotes(): void {
    const w = this.canvas.width || 400;
    const h = this.canvas.height || 700;
    const list: Mote[] = [];
    for (let i = 0; i < MAX_MOTES; i++) {
      list.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.15 - Math.random() * 0.35,
        size: 1.2 + Math.random() * 2.2,
        baseAlpha: 0.35 + Math.random() * 0.55,
        twinkleSpeed: 0.025 + Math.random() * 0.045,
        phase: Math.random() * Math.PI * 2,
      });
    }
    this.motes = list;
  }

  private loop(): void {
    const tick = () => {
      this.step();
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }

  private step(): void {
    const ctx = this.ctx;
    if (!ctx) return;

    this.time += 0.02;
    const { sunlightIntensity: sunInt, density: den, windForce: wind = 0, timeOfDay: tod } = this.opts;
    const canvas = this.canvas;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (sunInt <= 0.05 && tod === 'night') return;

    const sprite = this.sprites ? this.sprites[tod] || this.sprites.day : null;
    if (!sprite) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const activeCount = Math.min(MAX_MOTES, Math.floor(den * (0.3 + sunInt * 0.7)));

    for (let i = 0; i < activeCount; i++) {
      const m = this.motes[i];
      if (!m) continue;
      m.phase += m.twinkleSpeed;
      m.x += m.vx + wind * 0.25 + Math.sin(this.time + m.phase) * 0.15;
      m.y += m.vy;

      if (m.y < 0) m.y = height;
      if (m.y > height) m.y = 0;
      if (m.x < 0) m.x = width;
      if (m.x > width) m.x = 0;

      const distFromCenterRatio = Math.abs(m.x - centerX) / (width * 0.5);
      const inBeamFactor = Math.max(0.3, 1 - distFromCenterRatio * 0.7);
      const twinkle = Math.sin(m.phase) * 0.35 + 0.65;
      const finalAlpha = Math.min(1, m.baseAlpha * twinkle * (0.4 + sunInt * 0.6) * inBeamFactor);
      if (finalAlpha <= 0.02) continue;

      const drawSize = m.size * 7;
      ctx.globalAlpha = finalAlpha;
      ctx.drawImage(sprite, m.x - drawSize * 0.5, m.y - drawSize * 0.5, drawSize, drawSize);
    }

    ctx.globalAlpha = 1;
  }
}
