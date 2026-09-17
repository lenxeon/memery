/**
 * @file SmokeParticleEmitter.ts
 * @description PixiJS 真实青烟流体粒子发射系统。
 * 在香炉立香顶端持续发射半透明、受风力扰动、旋转翻滚与扩散消散的青烟粒子，
 * 呈现如同真实袅袅升腾的青烟视觉。
 */
import { Container, Sprite, Texture } from 'pixi.js';

interface SmokeParticle {
  sprite: Sprite;
  x: number;
  y: number;
  vx: number;
  vy: number;
  scale: number;
  scaleSpeed: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  rotationSpeed: number;
  active: boolean;
}

export class SmokeParticleEmitter {
  public container: Container = new Container();
  private particles: SmokeParticle[] = [];
  private poolSize: number = 75;
  private texture: Texture;
  public isLit: boolean = true;
  public windForce: number = 0.15;
  public spawnTimer: number = 0;

  // 发射源锚点 (以香炉容器坐标系为准)
  public originX: number = 0;
  public originY: number = 0;

  constructor(smokeTexture: Texture) {
    this.texture = smokeTexture;
    this.initPool();
  }

  private initPool(): void {
    for (let i = 0; i < this.poolSize; i++) {
      const sprite = new Sprite(this.texture);
      sprite.anchor.set(0.5);
      sprite.visible = false;
      this.container.addChild(sprite);

      this.particles.push({
        sprite,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        scale: 0.3,
        scaleSpeed: 0.005,
        alpha: 0,
        maxAlpha: 0.45,
        life: 0,
        maxLife: 180,
        rotationSpeed: 0,
        active: false,
      });
    }
  }

  /**
   * 设定发射锚点
   */
  public setOrigin(x: number, y: number): void {
    this.originX = x;
    this.originY = y;
  }

  /**
   * 逐帧更新粒子物理状态
   */
  public update(delta: number = 1): void {
    if (this.isLit) {
      this.spawnTimer += delta;
      if (this.spawnTimer >= 2.5) {
        this.spawnTimer = 0;
        this.spawnParticle();
      }
    }

    const windDrift = this.windForce * 0.4;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      if (!p.active) continue;

      p.life += delta;
      if (p.life >= p.maxLife) {
        p.active = false;
        p.sprite.visible = false;
        continue;
      }

      // 物理运动更新
      const lifeProgress = p.life / p.maxLife; // 0.0 ~ 1.0

      // 模拟热气流上升加自然轻摆
      p.x += (p.vx + windDrift + Math.sin(p.life * 0.05 + i) * 0.4) * delta;
      p.y += p.vy * delta;

      // 粒子自旋与扩散
      p.sprite.rotation += p.rotationSpeed * delta;
      p.scale += p.scaleSpeed * delta;
      p.sprite.scale.set(p.scale);

      // 透明度包络线：前 15% 渐入，后 60% 逐渐消散
      if (lifeProgress < 0.15) {
        p.alpha = (lifeProgress / 0.15) * p.maxAlpha;
      } else {
        p.alpha = (1 - (lifeProgress - 0.15) / 0.85) * p.maxAlpha;
      }

      p.sprite.alpha = Math.max(0, p.alpha);
      p.sprite.x = p.x;
      p.sprite.y = p.y;
    }
  }

  private spawnParticle(): void {
    const inactive = this.particles.find((p) => !p.active);
    if (!inactive) return;

    // 随机在三炷香香头微小横向偏移
    const stickOffset = (Math.random() - 0.5) * 12;
    inactive.active = true;
    inactive.sprite.visible = true;
    inactive.x = this.originX + stickOffset;
    inactive.y = this.originY;

    // 初速度
    inactive.vx = (Math.random() - 0.5) * 0.25;
    inactive.vy = -1.2 - Math.random() * 0.6; // 向上飘动

    inactive.scale = 0.25 + Math.random() * 0.15;
    inactive.scaleSpeed = 0.007 + Math.random() * 0.004;
    inactive.maxAlpha = 0.35 + Math.random() * 0.2;
    inactive.alpha = 0;
    inactive.life = 0;
    inactive.maxLife = 140 + Math.random() * 80;
    inactive.rotationSpeed = (Math.random() - 0.5) * 0.02;

    inactive.sprite.scale.set(inactive.scale);
    inactive.sprite.alpha = 0;
    inactive.sprite.x = inactive.x;
    inactive.sprite.y = inactive.y;
  }

  public destroy(): void {
    this.container.destroy({ children: true });
  }
}
