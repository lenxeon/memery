/**
 * @file IncenseSmokeRenderer.ts
 * @description 三炷立香与细薄直升的轻烟：烟根收细，上段缓慢扩散并渐隐。
 */
import { CanvasSource, Rectangle, Sprite, Texture } from 'pixi.js';

interface SmokeNode {
  x: number;
  y: number;
  vy: number;
  age: number;
  maxAge: number;
  width: number;
  density: number;
}

const SMOKE_EMISSION_STEP = 4;
const SMOKE_WIDTH_SCALE = 1.5;
const SMOKE_STREAMS = [
  { life: 138, speed: 0.50, baseWidth: 0.42, maxWidth: 1.8, sway: 0.42, phase: -0.8 },
  { life: 158, speed: 0.53, baseWidth: 0.48, maxWidth: 2.2, sway: 0.50, phase: 0.2 },
  { life: 148, speed: 0.51, baseWidth: 0.44, maxWidth: 1.95, sway: 0.46, phase: 1.1 },
] as const;

const smoothNoise = (x: number, y: number, seed: number): number => {
  const fade = (t: number): number => t * t * (3 - 2 * t);
  const hash = (ix: number, iy: number): number => {
    const n = Math.sin(ix * 127.1 + iy * 311.7 + seed * 74.7) * 43758.5453;
    return (n - Math.floor(n)) * 2 - 1;
  };
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = fade(x - ix);
  const fy = fade(y - iy);
  const top = hash(ix, iy) + (hash(ix + 1, iy) - hash(ix, iy)) * fx;
  const bottom = hash(ix, iy + 1) + (hash(ix + 1, iy + 1) - hash(ix, iy + 1)) * fx;
  return top + (bottom - top) * fy;
};

export class IncenseSmokeRenderer {
  public sprite: Sprite;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private texture: Texture;

  private trails: SmokeNode[][] = [[], [], []];
  private time: number = 0;
  private emissionAccum: number = 0;
  private litTransition: number = 1.0;

  private readonly canvasW = 160;
  private readonly canvasH = 280;
  // The three streams stay near centerX. Upload only this strip while Texture.trim
  // preserves the original sprite size, anchor and all drawing coordinates.
  private readonly contentLeft = 56;
  private readonly contentWidth = 48;
  private readonly centerX = 80;
  private readonly burnerBaseY = 278;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.contentWidth * 2;
    this.canvas.height = this.canvasH * 2;
    this.ctx = this.canvas.getContext('2d', { alpha: true })!;

    this.texture = new Texture({
      source: new CanvasSource({ resource: this.canvas, resolution: 1 }),
      orig: new Rectangle(0, 0, this.canvasW * 2, this.canvasH * 2),
      trim: new Rectangle(this.contentLeft * 2, 0, this.contentWidth * 2, this.canvasH * 2),
    });
    this.sprite = new Sprite(this.texture);
    // 锚点精确对齐香炉香灰口底面 (centerX=80, burnerBaseY=278)
    this.sprite.anchor.set(this.centerX / this.canvasW, this.burnerBaseY / this.canvasH);
  }

  public update(
    delta: number = 1,
    isLit: boolean = true,
    windForce: number = 0.15,
    density: number = 1.0,
    health: number = 1.0,
    timeOfDay: 'day' | 'sunset' | 'night' = 'day'
  ): void {
    const ctx = this.ctx;
    if (!ctx) return;

    const step = Math.min(6, Math.max(0, delta));
    this.time += step / 60;

    const currentHealth = Math.max(0, Math.min(1.0, health));

    // 平滑点燃/熄灭过渡
    const targetLit = isLit && currentHealth > 0.02 ? 1.0 : 0.0;
    this.litTransition += (targetLit - this.litTransition) * (1 - Math.exp(-0.05 * step));

    // 三炷香等高、竖直平行；点燃消耗时同步缩短。
    const STUB_LENGTH = 26.5;
    const BURNABLE_LENGTH = 55.5;
    const INCENSE_FOOT_LENGTH = 8;
    const stickLength = STUB_LENGTH + BURNABLE_LENGTH * currentHealth;
    const spreadX = 4.0 + 1.8 * currentHealth;

    const dynamicEmbers = [
      { x: this.centerX - spreadX, y: this.burnerBaseY - stickLength },
      { x: this.centerX,           y: this.burnerBaseY - stickLength },
      { x: this.centerX + spreadX, y: this.burnerBaseY - stickLength },
    ];

    const lateFactor = currentHealth > 0.35
      ? 1.0
      : Math.max(0.3, 0.3 + 0.7 * (currentHealth / 0.35));

    const isNightMode = timeOfDay === 'night';

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.save();
    ctx.scale(2, 2);
    ctx.translate(-this.contentLeft, 0);

    // ── 1. 绘制三炷清香香身 ─────────────────────────────────────────
    ctx.lineCap = 'round';
    for (let i = 0; i < dynamicEmbers.length; i++) {
      const emb = dynamicEmbers[i];

      // 浅暖棕香体；三炷香保持等高、平行。
      ctx.beginPath();
      ctx.moveTo(emb.x, this.burnerBaseY - INCENSE_FOOT_LENGTH);
      ctx.lineTo(emb.x, emb.y);
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = '#9a7954';
      ctx.stroke();

      // 香体受光侧的浅色细纹。
      ctx.beginPath();
      ctx.moveTo(emb.x - 0.35, this.burnerBaseY - INCENSE_FOOT_LENGTH - 0.5);
      ctx.lineTo(emb.x - 0.35, emb.y + 1.5);
      ctx.lineWidth = 0.45;
      ctx.strokeStyle = '#c5a77d';
      ctx.stroke();

      // 香脚略细于香体，使用参考图中的红棕色，插入香灰处收住。
      ctx.beginPath();
      ctx.moveTo(emb.x, this.burnerBaseY);
      ctx.lineTo(emb.x, this.burnerBaseY - INCENSE_FOOT_LENGTH);
      ctx.lineWidth = 1.15;
      ctx.strokeStyle = '#963c2d';
      ctx.stroke();

      // 燃烧顶端的香灰节
      if (isLit && currentHealth > 0.02) {
        ctx.beginPath();
        ctx.moveTo(emb.x, emb.y);
        ctx.lineTo(emb.x, emb.y + 1.8 * lateFactor);
        ctx.lineWidth = 1.3;
        ctx.strokeStyle = '#6e6962';
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(emb.x - 0.8, emb.y);
        ctx.lineTo(emb.x + 0.8, emb.y);
        ctx.lineWidth = 1.0;
        ctx.strokeStyle = '#1e140e';
        ctx.stroke();
      }
    }

    // ── 2. 细烟直升：细小扰动随烟上行，离开香头后才逐渐展开 ──
    const trails = this.trails;
    const wind = Math.max(-1, Math.min(1, windForce));
    const follow = 1 - Math.exp(-0.2 * step);
    for (let s = 0; s < trails.length; s++) {
      const trail = trails[s];
      const emb = dynamicEmbers[s];
      const profile = SMOKE_STREAMS[s];

      for (let i = trail.length - 1; i >= 0; i--) {
        const node = trail[i];
        node.age += step;
        if (node.age >= node.maxAge) {
          trail.splice(i, 1);
          continue;
        }

        node.y += node.vy * step;
        const height = Math.max(0, emb.y - node.y);
        const progress = Math.min(1, node.age / node.maxAge);
        const release = Math.pow(Math.min(1, height / 24), 1.5);
        const flowPhase = height * 0.15 - this.time * 2.1 + profile.phase;
        const flowNoise = smoothNoise(height * 0.035 + profile.phase * 3, this.time * 0.42, s * 13 + 4);
        const sway = Math.sin(height * 0.045 - this.time * 0.55 + profile.phase) * profile.sway * 0.55
          + flowNoise * 0.34;
        const fineWisp = Math.sin(flowPhase) * 0.08 + smoothNoise(height * 0.11, this.time * 0.8, s * 19 + 11) * 0.055;
        const drift = wind * 1.8 * progress * progress;
        node.x += (emb.x + (sway + fineWisp) * release + drift - node.x) * follow;

        // 上段轻轻散开，宽度中的细微起伏随流上行；透明度负责末端消散。
        const spread = progress * progress * (3 - 2 * progress);
        node.width = (profile.baseWidth + (profile.maxWidth - profile.baseWidth) * spread)
          * (0.88 + node.density * 0.12 + 0.08 * flowNoise);
      }
    }

    // 按经过的时间发射，维持不同帧率下的烟丝间距。
    if (targetLit > 0) {
      this.emissionAccum += step;
      while (this.emissionAccum >= SMOKE_EMISSION_STEP) {
        this.emissionAccum -= SMOKE_EMISSION_STEP;
        for (let s = 0; s < trails.length; s++) {
          const emb = dynamicEmbers[s];
          const profile = SMOKE_STREAMS[s];
          const vy = -profile.speed * lateFactor;
          const age = this.emissionAccum;
          trails[s].unshift({
            x: emb.x,
            y: emb.y - 0.4 + vy * age,
            vy,
            age,
            maxAge: profile.life,
            width: profile.baseWidth,
            density: 0.88 + 0.12 * smoothNoise(this.time * 1.7, s * 2.3, 23),
          });
        }
      }
    } else {
      this.emissionAccum = 0;
    }

    // ── 3. 淡灰烟芯与低透明度外缘，沿高度渐隐 ──
    if (this.litTransition > 0.02) {
      const baseAlpha = Math.min(0.68, Math.max(0, density) * 0.62) * lateFactor * this.litTransition;
      const smokeColor = isNightMode ? '246, 247, 248' : '244, 245, 246';
      const smokeEdgeColor = isNightMode ? '196, 201, 204' : '190, 196, 200';

      for (let s = 0; s < trails.length; s++) {
        const trail = trails[s];
        if (trail.length < 3) continue;

        const gradientStartY = dynamicEmbers[s].y;
        const gradientEndY = trail[trail.length - 1].y;
        const edgeGrad = ctx.createLinearGradient(0, gradientStartY, 0, gradientEndY);
        edgeGrad.addColorStop(0, `rgba(${smokeEdgeColor}, 0)`);
        edgeGrad.addColorStop(0.05, `rgba(${smokeEdgeColor}, ${0.16 * baseAlpha})`);
        edgeGrad.addColorStop(0.18, `rgba(${smokeEdgeColor}, ${0.48 * baseAlpha})`);
        edgeGrad.addColorStop(0.42, `rgba(${smokeEdgeColor}, ${0.36 * baseAlpha})`);
        edgeGrad.addColorStop(0.70, `rgba(${smokeEdgeColor}, ${0.14 * baseAlpha})`);
        edgeGrad.addColorStop(0.88, `rgba(${smokeEdgeColor}, ${0.025 * baseAlpha})`);
        edgeGrad.addColorStop(1, `rgba(${smokeEdgeColor}, 0)`);

        const streamGrad = ctx.createLinearGradient(0, gradientStartY, 0, gradientEndY);
        streamGrad.addColorStop(0, `rgba(${smokeColor}, 0)`);
        streamGrad.addColorStop(0.05, `rgba(${smokeColor}, ${0.16 * baseAlpha})`);
        streamGrad.addColorStop(0.18, `rgba(${smokeColor}, ${0.48 * baseAlpha})`);
        streamGrad.addColorStop(0.42, `rgba(${smokeColor}, ${0.36 * baseAlpha})`);
        streamGrad.addColorStop(0.70, `rgba(${smokeColor}, ${0.14 * baseAlpha})`);
        streamGrad.addColorStop(0.88, `rgba(${smokeColor}, ${0.025 * baseAlpha})`);
        streamGrad.addColorStop(1, `rgba(${smokeColor}, 0)`);
        ctx.fillStyle = edgeGrad;
        ctx.globalAlpha = 0.26;
        this.drawSmokeRibbon(trail, 2.6);
        ctx.fillStyle = streamGrad;
        ctx.globalAlpha = 1;
        this.drawSmokeRibbon(trail, 0.8);
      }
    }

    // ── 4. 纤巧内敛的香头火炭 ──
    const emberSizeScale = 0.6;
    for (let i = 0; i < dynamicEmbers.length; i++) {
      const emb = dynamicEmbers[i];
      if (this.litTransition > 0.02 && currentHealth > 0.02) {
        const emberCycle = Math.sin(this.time * 2.8 + i * 1.6);
        const emberBreath = 0.82 + emberCycle * 0.18;

        // 微晕
        const glowRadius = 4.2 * lateFactor * emberSizeScale;
        const rGlow = ctx.createRadialGradient(emb.x, emb.y, 0.4 * emberSizeScale, emb.x, emb.y, glowRadius);
        rGlow.addColorStop(0, `rgba(255, 100, 30, ${0.65 * emberBreath * this.litTransition})`);
        rGlow.addColorStop(0.4, `rgba(245, 60, 15, ${0.25 * emberBreath * this.litTransition})`);
        rGlow.addColorStop(1, 'rgba(200, 40, 10, 0)');
        ctx.fillStyle = rGlow;
        ctx.beginPath();
        ctx.arc(emb.x, emb.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // 核心亮点
        ctx.fillStyle = `rgba(255, 200, 120, ${0.9 * emberBreath * this.litTransition})`;
        ctx.beginPath();
        ctx.arc(emb.x, emb.y, 0.75 * lateFactor * emberSizeScale, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();

    // 更新 GPU 纹理源
    this.texture.source.update();
  }

  private drawSmokeRibbon(trail: SmokeNode[], widthScale: number): void {
    const ctx = this.ctx;
    const half = widthScale * SMOKE_WIDTH_SCALE * 0.5;
    const first = trail[0];
    const last = trail[trail.length - 1];
    ctx.beginPath();
    ctx.moveTo(first.x - first.width * half, first.y);
    for (let i = 0; i < trail.length - 1; i++) {
      const node = trail[i];
      const next = trail[i + 1];
      const x = node.x - node.width * half;
      const nextX = next.x - next.width * half;
      ctx.quadraticCurveTo(x, node.y, (x + nextX) * 0.5, (node.y + next.y) * 0.5);
    }
    ctx.lineTo(last.x - last.width * half, last.y);
    ctx.lineTo(last.x + last.width * half, last.y);
    for (let i = trail.length - 1; i > 0; i--) {
      const node = trail[i];
      const next = trail[i - 1];
      const x = node.x + node.width * half;
      const nextX = next.x + next.width * half;
      ctx.quadraticCurveTo(x, node.y, (x + nextX) * 0.5, (node.y + next.y) * 0.5);
    }
    ctx.lineTo(first.x + first.width * half, first.y);
    ctx.closePath();
    ctx.fill();
  }

  public destroy(): void {
    try {
      this.sprite.destroy();
      this.texture.destroy(true);
    } catch {
      // ignore
    }
  }
}
