/**
 * @file DustMotesLayer.ts
 * @description 光束中悬浮浮尘层（PixiJS 纯 TS 实现）。
 *
 * 取代原先自建 Canvas2D 的 DustScene：
 * - 粒子全部走 Pixi 精灵池，与场景共用同一 Ticker，不再另开 rAF（避免两套时钟不同步的抖动）；
 * - 加色混合（add）+ 时段着色，浮尘才真的"被光照亮"，而不是一层灰白噪点；
 * - 挂在 lightsLayer 上，随视差一同微动，近处的尘比墙走得快，纵深感由此而来。
 *
 * 交互逻辑沿用旧版：光束中心更亮、边缘衰减，随日照强度与密度决定可见数量。
 *
 * 性能约定（逐帧只做"必要写入"）：
 * - 密度整体按 DENSITY_SCALE 折半，粒子池同步减半；
 * - 尺寸在播种时一次写入 scale，逐帧不再改 width/height（省掉矩阵重算）；
 * - 时段着色只在 timeOfDay 变化时统一刷新，逐帧不写 tint；
 * - 逐帧只写 position / alpha / visible，且 visible 仅在状态翻转时写。
 */
import { Container, Sprite, Texture } from 'pixi.js';
import { LightingSettings, TimeOfDay } from '../../types';

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

/** 粒子池上限（密度 20~200 时的封顶） */
const MAX_MOTES = 18;
/**
 * 密度折算系数：同样的密度滑杆读数只生成一半的浮尘。
 * 浮尘的观感靠"疏密有致"而非数量堆叠，减半既降负载也更像真实的空气尘。
 */
const DENSITY_SCALE = 0.5;
const TEX_SIZE = 64;
/** 贴图绘制倍率：mote.size → 屏幕像素 */
const DRAW_SCALE = 7;

/** 时段配色：日光偏暖白、夕照偏橙、夜色压暗偏冷白 */
const DUST_TINT: Record<TimeOfDay, number> = { day: 0xfff2cd, sunset: 0xffd7a0, night: 0xffe4b9 };
/** 时段整体亮度系数 */
const DUST_GAIN: Record<TimeOfDay, number> = { day: 1, sunset: 0.95, night: 0.45 };

let dustTexture: Texture | null = null;

/** 预渲染发光微尘贴图：明亮核心 + 柔和外晕 */
const getDustTexture = (): Texture => {
  if (dustTexture) return dustTexture;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = TEX_SIZE;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const c = TEX_SIZE / 2;
    const grad = ctx.createRadialGradient(c, c, 1, c, c, c);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.28, 'rgba(255, 255, 255, 0.62)');
    grad.addColorStop(0.62, 'rgba(255, 255, 255, 0.2)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, TEX_SIZE, TEX_SIZE);

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(c, c, TEX_SIZE * 0.07, 0, Math.PI * 2);
    ctx.fill();
  }
  dustTexture = Texture.from(canvas);
  return dustTexture;
};

export interface DustMotesOptions {
  /** 浮尘密度（20~200） */
  density: number;
  /** 日照强度（0~1） */
  sunlightIntensity: number;
  /** 风力（-1~1，横推浮尘） */
  windForce?: number;
  timeOfDay: TimeOfDay;
}

export class DustMotesLayer {
  public container: Container = new Container();

  private motes: Mote[] = [];
  private sprites: Sprite[] = [];
  private width: number = 0;
  private height: number = 0;
  private time: number = 0;

  /** 当前已写入精灵的时段着色，用于跳过逐帧 tint 写入 */
  private tintCache: number = -1;

  private opts: DustMotesOptions = {
    density: 60,
    sunlightIntensity: 0.6,
    windForce: 0,
    timeOfDay: 'day',
  };

  constructor() {
    const texture = getDustTexture();
    for (let i = 0; i < MAX_MOTES; i++) {
      const sprite = new Sprite(texture);
      sprite.anchor.set(0.5);
      sprite.blendMode = 'add';
      sprite.visible = false;
      this.sprites.push(sprite);
      this.container.addChild(sprite);
    }
    this.container.visible = false;
  }

  /** 视口尺寸同步（用于播种与环绕） */
  public layout(width: number, height: number): void {
    this.width = width;
    this.height = height;
    if (!this.motes.length && width > 0 && height > 0) this.seed();
    else this.reseedBounds();
  }

  public setOptions(patch: Partial<DustMotesOptions>): void {
    this.opts = { ...this.opts, ...patch };
    this.applyVisibility();
  }

  /** 密度 → 在场粒子数：整体折半，日照越强可见越多 */
  private resolveActiveCount(density: number, sun: number): number {
    const clampedSun = Math.min(1, Math.max(0, sun));
    const raw = (Number(density) || 0) * DENSITY_SCALE * (0.35 + clampedSun * 0.65);
    return Math.min(MAX_MOTES, Math.round(raw));
  }

  /** 逐帧推进：漂浮、明暗闪动、越界环绕（逐帧只写 position / alpha / visible） */
  public update(delta: number): void {
    if (!this.container.visible) return;
    const { width, height } = this;
    if (width <= 0 || height <= 0) return;

    this.time += delta * 0.02;
    const { density, sunlightIntensity: sun, windForce: wind = 0, timeOfDay } = this.opts;
    const gain = DUST_GAIN[timeOfDay] ?? 1;
    const tint = DUST_TINT[timeOfDay] ?? DUST_TINT.day;
    const activeCount = this.resolveActiveCount(density, sun);

    // 时段着色仅在切换时统一刷新一次
    if (tint !== this.tintCache) {
      this.tintCache = tint;
      for (const s of this.sprites) s.tint = tint;
    }

    const centerX = width * 0.5;
    const halfW = width * 0.5;
    const lightBase = (0.4 + sun * 0.6) * gain;
    const swayBase = wind * 0.25;
    const t = this.time;

    for (let i = 0; i < this.motes.length; i += 1) {
      const sprite = this.sprites[i];
      if (i >= activeCount) {
        if (sprite.visible) sprite.visible = false;
        continue;
      }

      const m = this.motes[i];
      m.phase += m.twinkleSpeed * delta;
      m.x += (m.vx + swayBase + Math.sin(t + m.phase) * 0.15) * delta;
      m.y += m.vy * delta;

      if (m.y < 0) m.y = height;
      else if (m.y > height) m.y = 0;
      if (m.x < 0) m.x = width;
      else if (m.x > width) m.x = 0;

      // 越近光束中轴越亮（浮尘只有被光照到才可见）；offAxis ≤ 1，故衰减下限为 0.3
      const offAxis = Math.abs(m.x - centerX) / halfW;
      const inBeam = 1 - offAxis * 0.7;
      const twinkle = Math.sin(m.phase) * 0.35 + 0.65;
      const alpha = m.baseAlpha * twinkle * lightBase * inBeam;
      if (alpha <= 0.02) {
        if (sprite.visible) sprite.visible = false;
        continue;
      }

      // 尺寸在播种时已写入 scale，此处不再触碰 width/height
      sprite.position.set(m.x, m.y);
      sprite.alpha = alpha > 1 ? 1 : alpha;
      if (!sprite.visible) sprite.visible = true;
    }
  }

  public destroy(): void {
    this.container.destroy({ children: true });
  }

  private seed(): void {
    const w = this.width || 400;
    const h = this.height || 700;
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
    // 尺寸一次落成 scale：逐帧不再改 width/height，省掉每粒子的矩阵重算
    for (let i = 0; i < list.length; i += 1) {
      const sprite = this.sprites[i];
      if (sprite) sprite.scale.set((list[i].size * DRAW_SCALE) / TEX_SIZE);
    }
    // 强制下一帧刷新时段着色（新精灵尚未着色）
    this.tintCache = -1;
  }

  /** 视口变化后把跑到界外的粒子拉回画面内 */
  private reseedBounds(): void {
    for (const m of this.motes) {
      if (m.x > this.width) m.x = Math.random() * this.width;
      if (m.y > this.height) m.y = Math.random() * this.height;
    }
  }

  /** 夜里且日照趋零时整层隐去（无光则无尘） */
  private applyVisibility(): void {
    const { timeOfDay, sunlightIntensity: sun } = this.opts;
    this.container.visible = !(sun <= 0.05 && timeOfDay === 'night');
  }
}
