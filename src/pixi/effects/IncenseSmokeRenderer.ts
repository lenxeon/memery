/**
 * @file IncenseSmokeRenderer.ts
 * @description PixiJS 国风禅意工笔香烟与三炷立香高保真渲染器。
 * 100% 完整复刻原版 IncenseSmoke.tsx 的拉格朗日流体力学质点流（Lagrangian Puff Ribbon）。
 * 呈现 86px 挺拔沉静的高香柱身、三缕同心徐徐升腾的 1.5px~3.3px 纤巧柔光缕烟多边形，
 * 以及细若游丝的 0.7px 工笔高光中流线，彻底消灭失火般的圆形滚滚浓烟！
 */
import { Sprite, Texture } from 'pixi.js';

interface SmokeNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  maxAge: number;
  width: number;
  alpha: number;
}

export class IncenseSmokeRenderer {
  public sprite: Sprite;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private texture: Texture;

  private trails: SmokeNode[][] = [[], [], []];
  private time: number = 0;
  private frameCount: number = 0;
  private litTransition: number = 1.0;

  private readonly canvasW = 160;
  private readonly canvasH = 280;
  private readonly centerX = 80;
  private readonly burnerBaseY = 278;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.canvasW * 2;
    this.canvas.height = this.canvasH * 2;
    this.ctx = this.canvas.getContext('2d', { alpha: true })!;

    this.texture = Texture.from(this.canvas);
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

    this.time += 0.016 * delta;
    this.frameCount++;

    const currentHealth = Math.max(0, Math.min(1.0, health));

    // 平滑点燃/熄灭过渡
    const targetLit = isLit && currentHealth > 0.02 ? 1.0 : 0.0;
    this.litTransition += (targetLit - this.litTransition) * 0.05 * delta;

    // 1. 香体长度与保留香脚 (原版标准尺寸：中心香 86px，两侧香 78px)
    const STUB_CENTER_LEN = 28;
    const STUB_SIDE_LEN = 25;
    const BURNABLE_CENTER = 58;
    const BURNABLE_SIDE = 53;

    const centerLen = STUB_CENTER_LEN + BURNABLE_CENTER * currentHealth;
    const sideLen = STUB_SIDE_LEN + BURNABLE_SIDE * currentHealth;
    const spreadX = 4.0 + 1.8 * currentHealth;

    const dynamicEmbers = [
      { x: this.centerX - spreadX, y: this.burnerBaseY - sideLen, dir: -1 },
      { x: this.centerX,           y: this.burnerBaseY - centerLen, dir: 0 },
      { x: this.centerX + spreadX, y: this.burnerBaseY - sideLen, dir: 1 },
    ];

    const lateFactor = currentHealth > 0.35
      ? 1.0
      : Math.max(0.3, 0.3 + 0.7 * (currentHealth / 0.35));

    const isNightMode = timeOfDay === 'night';

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.save();
    ctx.scale(2, 2);

    // ── 1. 绘制三炷清香香身 ─────────────────────────────────────────
    ctx.lineCap = 'round';
    for (let i = 0; i < dynamicEmbers.length; i++) {
      const emb = dynamicEmbers[i];

      // 深色木质主干
      ctx.beginPath();
      ctx.moveTo(this.centerX + (i - 1) * 0.85, this.burnerBaseY);
      ctx.lineTo(emb.x, emb.y);
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = '#382315';
      ctx.stroke();

      // 细微受光侧高光
      ctx.beginPath();
      ctx.moveTo(this.centerX + (i - 1) * 0.85 - 0.2, this.burnerBaseY);
      ctx.lineTo(emb.x - 0.2, emb.y);
      ctx.lineWidth = 0.45;
      ctx.strokeStyle = '#5a3d28';
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

    // ── 环境自然呼吸与偶尔阵风系统 ──
    const breathCycle = Math.sin(this.time * 0.92);
    const gustPulse = Math.pow(Math.max(0, Math.sin(this.time * 0.35)), 2.6) * 1.4;
    const organicWind = (windForce * 1.2) + (breathCycle * 0.45) + (gustPulse * (breathCycle >= 0 ? 0.7 : -0.7));

    // ── 2. 真实物理发射与向上流动模拟 ──
    const trails = this.trails;

    // 每 2 帧发射一个新烟气质点
    if (this.litTransition > 0.02 && this.frameCount % 2 === 0) {
      for (let s = 0; s < dynamicEmbers.length; s++) {
        const emb = dynamicEmbers[s];
        trails[s].unshift({
          x: emb.x + (Math.random() - 0.5) * 0.2,
          y: emb.y - 0.5,
          vx: 0,
          vy: -(0.85 + Math.random() * 0.12) * lateFactor,
          age: 0,
          maxAge: 85 + Math.random() * 15,
          width: 0.9,
          alpha: 0,
        });
      }
    }

    // 更新烟气粒子生命周期
    for (let s = 0; s < trails.length; s++) {
      const trail = trails[s];
      const emb = dynamicEmbers[s];

      for (let i = trail.length - 1; i >= 0; i--) {
        const node = trail[i];
        node.age += delta;

        if (node.age >= node.maxAge) {
          trail.splice(i, 1);
          continue;
        }

        // 垂直升腾
        node.y += node.vy * delta;

        // 垂直高度与归一化比例
        const distFromEmber = Math.max(0, emb.y - node.y);
        const p = Math.min(1.0, distFromEmber / 88);

        // 三缕同心步调一致的微风行波
        const windShift = organicWind * (9.2 * Math.pow(p, 1.35));
        const waveShift = Math.sin(p * 3.6 - this.time * 1.5) * (4.2 * Math.pow(p, 1.25));

        const targetX = emb.x + windShift + waveShift;
        node.x += (targetX - node.x) * 0.18;

        // 烟体生命周期尺寸演变 (最宽仅约 3.3px)
        const prog = node.age / node.maxAge;
        if (prog < 0.18) {
          const t = prog / 0.18;
          node.width = 0.9 + t * 1.2;
          node.alpha = t * 0.32;
        } else if (prog < 0.65) {
          const t = (prog - 0.18) / 0.47;
          node.width = 2.1 + t * 1.2;
          node.alpha = 0.32 * (1.0 - t * 0.25);
        } else {
          const t = (prog - 0.65) / 0.35;
          node.width = 3.3 + t * 2.2;
          node.alpha = 0.24 * (1.0 - t);
        }
      }
    }

    // ── 3. 绘制平滑流线缕烟 ──
    if (this.litTransition > 0.02) {
      const baseAlpha = Math.min(0.9, density * 0.75) * lateFactor * this.litTransition;

      for (let s = 0; s < trails.length; s++) {
        const trail = trails[s];
        if (trail.length < 3) continue;

        const leftPoints: { x: number; y: number }[] = [];
        const rightPoints: { x: number; y: number }[] = [];

        for (let i = 0; i < trail.length; i++) {
          const node = trail[i];
          const halfW = (node.width * 0.5) * (0.6 + 0.4 * lateFactor);
          leftPoints.push({ x: node.x - halfW, y: node.y });
          rightPoints.push({ x: node.x + halfW, y: node.y });
        }

        // Pass 1: 纤巧柔光缕烟多边形
        ctx.beginPath();
        ctx.moveTo(leftPoints[0].x, leftPoints[0].y);
        for (let i = 0; i < leftPoints.length - 1; i++) {
          const xc = (leftPoints[i].x + leftPoints[i + 1].x) / 2;
          const yc = (leftPoints[i].y + leftPoints[i + 1].y) / 2;
          ctx.quadraticCurveTo(leftPoints[i].x, leftPoints[i].y, xc, yc);
        }
        ctx.lineTo(rightPoints[rightPoints.length - 1].x, rightPoints[rightPoints.length - 1].y);
        for (let i = rightPoints.length - 1; i > 0; i--) {
          const xc = (rightPoints[i].x + rightPoints[i - 1].x) / 2;
          const yc = (rightPoints[i].y + rightPoints[i - 1].y) / 2;
          ctx.quadraticCurveTo(rightPoints[i].x, rightPoints[i].y, xc, yc);
        }
        ctx.closePath();

        const bottomY = trail[0].y;
        const topY = trail[trail.length - 1].y;
        const streamGrad = ctx.createLinearGradient(0, bottomY, 0, topY);

        if (isNightMode) {
          streamGrad.addColorStop(0, `rgba(250, 245, 235, 0)`);
          streamGrad.addColorStop(0.12, `rgba(248, 242, 230, ${0.18 * baseAlpha})`);
          streamGrad.addColorStop(0.40, `rgba(242, 236, 224, ${0.28 * baseAlpha})`);
          streamGrad.addColorStop(0.75, `rgba(235, 228, 216, ${0.16 * baseAlpha})`);
          streamGrad.addColorStop(1.0, `rgba(220, 212, 200, 0)`);
        } else {
          streamGrad.addColorStop(0, `rgba(255, 252, 246, 0)`);
          streamGrad.addColorStop(0.12, `rgba(252, 248, 240, ${0.20 * baseAlpha})`);
          streamGrad.addColorStop(0.40, `rgba(246, 242, 234, ${0.30 * baseAlpha})`);
          streamGrad.addColorStop(0.75, `rgba(238, 234, 226, ${0.16 * baseAlpha})`);
          streamGrad.addColorStop(1.0, `rgba(220, 215, 205, 0)`);
        }

        ctx.fillStyle = streamGrad;
        ctx.fill();

        // Pass 2: 细若游丝的工笔高光中流线
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 0; i < trail.length - 1; i++) {
          const xc = (trail[i].x + trail[i + 1].x) / 2;
          const yc = (trail[i].y + trail[i + 1].y) / 2;
          ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        }

        const coreGrad = ctx.createLinearGradient(0, bottomY, 0, topY);
        coreGrad.addColorStop(0, `rgba(255, 255, 255, 0)`);
        coreGrad.addColorStop(0.15, `rgba(255, 255, 255, ${0.28 * baseAlpha})`);
        coreGrad.addColorStop(0.45, `rgba(252, 250, 246, ${0.24 * baseAlpha})`);
        coreGrad.addColorStop(0.80, `rgba(245, 240, 232, ${0.08 * baseAlpha})`);
        coreGrad.addColorStop(1.0, `rgba(235, 230, 222, 0)`);

        ctx.strokeStyle = coreGrad;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    }

    // ── 4. 纤巧内敛的香头火炭 ──
    for (let i = 0; i < dynamicEmbers.length; i++) {
      const emb = dynamicEmbers[i];
      if (this.litTransition > 0.02 && currentHealth > 0.02) {
        const emberCycle = Math.sin(this.time * 2.8 + i * 1.6);
        const emberBreath = 0.82 + emberCycle * 0.18;

        // 微晕
        const rGlow = ctx.createRadialGradient(emb.x, emb.y, 0.4, emb.x, emb.y, 4.2 * lateFactor);
        rGlow.addColorStop(0, `rgba(255, 100, 30, ${0.65 * emberBreath * this.litTransition})`);
        rGlow.addColorStop(0.4, `rgba(245, 60, 15, ${0.25 * emberBreath * this.litTransition})`);
        rGlow.addColorStop(1, 'rgba(200, 40, 10, 0)');
        ctx.fillStyle = rGlow;
        ctx.beginPath();
        ctx.arc(emb.x, emb.y, 4.2 * lateFactor, 0, Math.PI * 2);
        ctx.fill();

        // 核心亮点
        ctx.fillStyle = `rgba(255, 200, 120, ${0.9 * emberBreath * this.litTransition})`;
        ctx.beginPath();
        ctx.arc(emb.x, emb.y, 0.75 * lateFactor, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();

    // 更新 GPU 纹理源
    this.texture.source.update();
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
