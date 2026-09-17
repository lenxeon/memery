/**
 * @file CandleFlameRenderer.ts
 * @description PixiJS 烛火动态高保真渲染器。
 * 100% 完整复刻原版 CandleFlame.tsx 的数学微频跳跃、双层贝塞尔渐变火苗、幽蓝燃烧底座与环境光晕，
 * 彻底消除生硬死板的单色矢量贴片，重现 60FPS 极具生命力的灵动长明祈福烛火。
 */
import { Sprite, Texture } from 'pixi.js';

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
}

export class CandleFlameRenderer {
  public sprite: Sprite;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private texture: Texture;

  private time: number = Math.random() * 100;
  private emberAlpha: number = 0;
  private smokeParticles: SmokeParticle[] = [];

  private readonly logicalWidth = 80;
  private readonly logicalHeight = 110;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.logicalWidth * 2;
    this.canvas.height = this.logicalHeight * 2;
    this.ctx = this.canvas.getContext('2d', { alpha: true })!;

    this.texture = Texture.from(this.canvas);
    this.sprite = new Sprite(this.texture);
    // 限制精灵尺寸为高精缩小版，防止 220px 巨火失真
    this.sprite.width = 38;
    this.sprite.height = 52;
    // 锚点精确对齐火苗底座 (centerX=40, baseY=94)
    this.sprite.anchor.set(40 / this.logicalWidth, 94 / this.logicalHeight);
  }

  public update(
    delta: number = 1,
    isLit: boolean = true,
    windForce: number = 0.15,
    glowIntensity: number = 1.0,
    health: number = 1.0,
    scale: number = 1.0
  ): void {
    const ctx = this.ctx;
    if (!ctx) return;

    this.time += 0.05 * delta;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.save();
    ctx.scale(2, 2);

    const centerX = this.logicalWidth / 2; // 40
    const baseY = this.logicalHeight - 16;  // 94

    if (isLit) {
      this.emberAlpha = 1;

      // 烛火后期自适应减小 (当生机低于 0.4 时平滑缩小至 ~45%)
      const lateFlameFactor = health > 0.4 
        ? 1.0 
        : Math.max(0.42, 0.42 + 0.58 * (health / 0.4));

      const microFlicker = Math.sin(this.time * 12) * 0.5 + Math.cos(this.time * 23) * 0.3;
      const windTilt = windForce * 12 + Math.sin(this.time * 3) * 2;
      const flameHeight = (38 + Math.sin(this.time * 7) * 3 + microFlicker * 2) * scale * lateFlameFactor;
      const flameWidth = (14 + Math.cos(this.time * 5) * 1.5) * scale * Math.max(0.55, lateFlameFactor);

      // 1. Soft Warm Ambient Glow (细致幽微暖橙底晕，确保绝不洗白掩盖水滴火苗轮廓)
      const effectiveGlow = glowIntensity * (0.3 + 0.45 * lateFlameFactor);
      const maxGlowRadius = 22 * scale * Math.max(0.5, lateFlameFactor);
      const glowCenterY = baseY - flameHeight * 0.45;
      const radialGlow = ctx.createRadialGradient(
        centerX + windTilt * 0.3,
        glowCenterY,
        1,
        centerX,
        glowCenterY,
        maxGlowRadius
      );
      radialGlow.addColorStop(0, `rgba(255, 180, 50, ${0.25 * effectiveGlow})`);
      radialGlow.addColorStop(0.4, `rgba(255, 130, 20, ${0.12 * effectiveGlow})`);
      radialGlow.addColorStop(0.8, `rgba(255, 90, 0, 0)`);
      radialGlow.addColorStop(1, 'rgba(255, 80, 0, 0)');

      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(centerX, glowCenterY, maxGlowRadius, 0, Math.PI * 2);
      ctx.fill();

      // 2. Outer Flame Teardrop (Warm Golden Orange - 4 段水滴贝塞尔渐变)
      const tipX = centerX + windTilt;
      const tipY = baseY - flameHeight;

      ctx.beginPath();
      ctx.moveTo(centerX - flameWidth * 0.5, baseY);
      ctx.bezierCurveTo(
        centerX - flameWidth * 0.9, baseY - flameHeight * 0.35,
        centerX - flameWidth * 0.4 + windTilt * 0.5, baseY - flameHeight * 0.75,
        tipX, tipY
      );
      ctx.bezierCurveTo(
        centerX + flameWidth * 0.4 + windTilt * 0.5, baseY - flameHeight * 0.75,
        centerX + flameWidth * 0.9, baseY - flameHeight * 0.35,
        centerX + flameWidth * 0.5, baseY
      );
      ctx.closePath();

      const outerGrad = ctx.createLinearGradient(centerX, baseY, tipX, tipY);
      outerGrad.addColorStop(0, 'rgba(255, 80, 0, 0.95)');
      outerGrad.addColorStop(0.3, 'rgba(255, 140, 10, 0.92)');
      outerGrad.addColorStop(0.75, 'rgba(255, 215, 60, 0.9)');
      outerGrad.addColorStop(1, 'rgba(255, 245, 180, 0.4)');
      ctx.fillStyle = outerGrad;
      ctx.fill();

      // 3. Inner Core Flame (Luminous Pure Yellow-White - 4 段内焰炽烈金心)
      const innerH = flameHeight * 0.65;
      const innerW = flameWidth * 0.55;
      const innerTipX = centerX + windTilt * 0.75;
      const innerTipY = baseY - innerH;

      ctx.beginPath();
      ctx.moveTo(centerX - innerW * 0.5, baseY - 2);
      ctx.bezierCurveTo(
        centerX - innerW * 0.8, baseY - innerH * 0.35,
        centerX - innerW * 0.3 + windTilt * 0.4, baseY - innerH * 0.75,
        innerTipX, innerTipY
      );
      ctx.bezierCurveTo(
        centerX + innerW * 0.3 + windTilt * 0.4, baseY - innerH * 0.75,
        centerX + innerW * 0.8, baseY - innerH * 0.35,
        centerX + innerW * 0.5, baseY - 2
      );
      ctx.closePath();

      const innerGrad = ctx.createLinearGradient(centerX, baseY, innerTipX, innerTipY);
      innerGrad.addColorStop(0, '#ff9500');
      innerGrad.addColorStop(0.35, '#ffee55');
      innerGrad.addColorStop(0.75, '#ffffff');
      innerGrad.addColorStop(1, '#ffffff');
      ctx.fillStyle = innerGrad;
      ctx.fill();

      // 4. Blue Flame Base (Clean natural candle combustion - 幽蓝燃烧根部)
      ctx.beginPath();
      ctx.ellipse(centerX, baseY + 1, flameWidth * 0.35, 3, 0, 0, Math.PI * 2);
      const blueGrad = ctx.createRadialGradient(centerX, baseY + 1, 0, centerX, baseY + 1, flameWidth * 0.35);
      blueGrad.addColorStop(0, 'rgba(60, 130, 255, 0.75)');
      blueGrad.addColorStop(0.7, 'rgba(40, 90, 230, 0.35)');
      blueGrad.addColorStop(1, 'rgba(20, 50, 180, 0)');
      ctx.fillStyle = blueGrad;
      ctx.fill();
    } else {
      // 熄灭后的微弱余烬火炭
      if (this.emberAlpha > 0.01) {
        this.emberAlpha *= 0.985;
        if (Math.random() < 0.35) {
          this.smokeParticles.push({
            x: centerX + (Math.random() - 0.5) * 4,
            y: baseY - 4,
            vx: windForce * 0.5 + (Math.random() - 0.5) * 0.6,
            vy: -0.8 - Math.random() * 0.6,
            alpha: 0.6 * this.emberAlpha,
            size: 2 + Math.random() * 2,
          });
        }

        ctx.beginPath();
        ctx.arc(centerX, baseY - 3, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 80, 20, ${this.emberAlpha})`;
        ctx.fill();
      }
    }

    // 熄灭飘散的轻烟微粒
    for (let i = this.smokeParticles.length - 1; i >= 0; i--) {
      const p = this.smokeParticles[i];
      p.x += p.vx * delta;
      p.y += p.vy * delta;
      p.alpha *= 0.96;
      p.size += 0.15;

      if (p.alpha <= 0.02 || p.y < 0) {
        this.smokeParticles.splice(i, 1);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 220, 220, ${p.alpha})`;
        ctx.fill();
      }
    }

    // Candle Wick (微曲深色棉线烛芯)
    ctx.beginPath();
    ctx.moveTo(centerX, baseY + 6);
    ctx.quadraticCurveTo(centerX + (isLit ? 1.5 : 0.5), baseY + 1, centerX + 1, baseY - 3);
    ctx.lineWidth = 1.8;
    ctx.strokeStyle = '#2d1f14';
    ctx.lineCap = 'round';
    ctx.stroke();

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
