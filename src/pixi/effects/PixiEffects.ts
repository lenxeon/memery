/**
 * @file PixiEffects.ts
 * @description PixiJS 光景特效与粒子系统。
 * 包含：烛光柔和呼吸光晕 (Additive Blend)、丁达尔金芒光束、落花纷飞粒子雨。
 */
import { Container, Sprite, Graphics, Texture } from 'pixi.js';
import { FlowerType } from '../../types';

interface FallingPetal {
  sprite: Sprite;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  rotSpeed: number;
  swayFreq: number;
  swayAmp: number;
  life: number;
  maxLife: number;
  active: boolean;
}

export class PixiEffects {
  public lightsContainer: Container = new Container();
  public petalsContainer: Container = new Container();
  public raysGraphics: Graphics = new Graphics();

  // 烛光光晕 Sprites (左烛、右烛)
  private leftCandleGlow: Sprite | null = null;
  private rightCandleGlow: Sprite | null = null;
  private leftCandleFlame: Graphics = new Graphics();
  private rightCandleFlame: Graphics = new Graphics();

  // 落花粒子池
  private petalPool: FallingPetal[] = [];
  private poolSize: number = 60;

  private glowTexture: Texture;
  private petalTextures: Partial<Record<FlowerType, Texture | null>>;
  private time: number = 0;

  constructor(glowTex: Texture, petalTexes: Partial<Record<FlowerType, Texture | null>>) {
    this.glowTexture = glowTex;
    this.petalTextures = petalTexes;

    this.initCandleLights();
    this.initPetalPool();

    this.lightsContainer.addChild(this.raysGraphics);
    this.lightsContainer.addChild(this.leftCandleFlame);
    this.lightsContainer.addChild(this.rightCandleFlame);
  }

  private initCandleLights(): void {
    this.leftCandleGlow = new Sprite(this.glowTexture);
    this.leftCandleGlow.anchor.set(0.5);
    this.leftCandleGlow.blendMode = 'add';
    this.lightsContainer.addChild(this.leftCandleGlow);

    this.rightCandleGlow = new Sprite(this.glowTexture);
    this.rightCandleGlow.anchor.set(0.5);
    this.rightCandleGlow.blendMode = 'add';
    this.lightsContainer.addChild(this.rightCandleGlow);
  }

  private initPetalPool(): void {
    const defaultTex = this.petalTextures.peonies || this.glowTexture;
    for (let i = 0; i < this.poolSize; i++) {
      const sprite = new Sprite(defaultTex);
      sprite.anchor.set(0.5);
      sprite.visible = false;
      this.petalsContainer.addChild(sprite);

      this.petalPool.push({
        sprite,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        rot: 0,
        rotSpeed: 0,
        swayFreq: 0.05,
        swayAmp: 1.5,
        life: 0,
        maxLife: 300,
        active: false,
      });
    }
  }

  /**
   * 触发一波落花飘落 (献花、点赞或换花触发)
   */
  public triggerPetalShower(flowerType: FlowerType = 'peonies', count: number = 24, viewWidth: number = 1000): void {
    const tex = this.petalTextures[flowerType] || this.petalTextures.peonies;
    let spawned = 0;

    for (let i = 0; i < this.petalPool.length && spawned < count; i++) {
      const p = this.petalPool[i];
      if (p.active) continue;

      p.active = true;
      p.sprite.visible = true;
      if (tex) p.sprite.texture = tex;

      // 屏幕上部随机位置散落
      p.x = Math.random() * viewWidth;
      p.y = -20 - Math.random() * 120;
      p.vx = (Math.random() - 0.5) * 0.8;
      p.vy = 1.2 + Math.random() * 1.5;
      p.rot = Math.random() * Math.PI * 2;
      p.rotSpeed = (Math.random() - 0.5) * 0.04;
      p.swayFreq = 0.03 + Math.random() * 0.03;
      p.swayAmp = 1.2 + Math.random() * 2.0;
      p.life = 0;
      p.maxLife = 260 + Math.random() * 100;

      p.sprite.scale.set(0.35 + Math.random() * 0.3);
      p.sprite.alpha = 0.9;
      spawned++;
    }
  }

  private candleState = {
    leftX: 0,
    leftY: 0,
    leftLit: false,
    rightX: 0,
    rightY: 0,
    rightLit: false,
    scale: 1.0,
    hasState: false,
  };

  /**
   * 更新烛火光晕位置与呼吸动态
   */
  public updateCandles(
    leftX: number,
    leftY: number,
    leftLit: boolean,
    rightX: number,
    rightY: number,
    rightLit: boolean,
    scale: number = 1.0,
    windForce: number = 0.15
  ): void {
    const state = this.candleState;
    if (state.hasState && state.leftX === leftX && state.leftY === leftY && state.leftLit === leftLit
      && state.rightX === rightX && state.rightY === rightY && state.rightLit === rightLit
      && state.scale === scale) return;
    this.candleState = { leftX, leftY, leftLit, rightX, rightY, rightLit, scale, hasState: true };
    this.applyCandleGlow();
  }

  public applyCandleGlow(): void {
    if (!this.candleState.hasState) return;
    const { leftX, leftY, leftLit, rightX, rightY, rightLit, scale } = this.candleState;
    const breathe = Math.sin(this.time * 0.08) * 0.06 + Math.cos(this.time * 0.17) * 0.04;

    // 烛光光晕精准环绕火苗核心，轻柔漫射于烛顶蜡池（对标参考图二中圆润集中的暖金辉光）
    if (this.leftCandleGlow) {
      this.leftCandleGlow.visible = leftLit;
      if (leftLit) {
        this.leftCandleGlow.x = leftX;
        this.leftCandleGlow.y = leftY;
        const glowScale = (0.52 + breathe * 0.03) * scale;
        this.leftCandleGlow.scale.set(glowScale);
        this.leftCandleGlow.alpha = 0.6 + breathe * 0.07;
      }
      this.leftCandleFlame.clear();
    }

    if (this.rightCandleGlow) {
      this.rightCandleGlow.visible = rightLit;
      if (rightLit) {
        this.rightCandleGlow.x = rightX;
        this.rightCandleGlow.y = rightY;
        const glowScale = (0.52 - breathe * 0.03) * scale;
        this.rightCandleGlow.scale.set(glowScale);
        this.rightCandleGlow.alpha = 0.6 - breathe * 0.07;
      }
      this.rightCandleFlame.clear();
    }
  }

  /**
   * 绘制柔和丁达尔金芒光束
   */
  public updateGodRays(width: number, height: number, intensity: number = 0.6): void {
    this.raysGraphics.clear();
    if (intensity <= 0.05) return;

    const originX = width * 0.5;
    const originY = -40;
    const rayAlpha = Math.min(0.28, intensity * 0.22);

    const beams = [
      { targetOffset: -180, spread: 45 },
      { targetOffset: -70, spread: 55 },
      { targetOffset: 60, spread: 50 },
      { targetOffset: 170, spread: 60 },
    ];

    beams.forEach((b) => {
      this.raysGraphics.beginPath();
      this.raysGraphics.moveTo(originX, originY);
      this.raysGraphics.lineTo(originX + b.targetOffset + b.spread, height);
      this.raysGraphics.lineTo(originX + b.targetOffset - b.spread, height);
      this.raysGraphics.closePath();
      this.raysGraphics.fill({ color: 0xfff6dd, alpha: rayAlpha });
    });
  }

  /**
   * 逐帧更新粒子物理
   */
  public update(delta: number = 1): void {
    this.time += delta;
    this.applyCandleGlow();

    for (let i = 0; i < this.petalPool.length; i++) {
      const p = this.petalPool[i];
      if (!p.active) continue;

      p.life += delta;
      if (p.life >= p.maxLife) {
        p.active = false;
        p.sprite.visible = false;
        continue;
      }

      // 飘动物理轨迹
      p.x += (p.vx + Math.sin(p.life * p.swayFreq) * p.swayAmp) * delta;
      p.y += p.vy * delta;
      p.rot += p.rotSpeed * delta;

      p.sprite.x = p.x;
      p.sprite.y = p.y;
      p.sprite.rotation = p.rot;

      // 落地或生命末期消退
      const progress = p.life / p.maxLife;
      if (progress > 0.8) {
        p.sprite.alpha = (1 - (progress - 0.8) / 0.2) * 0.9;
      }
    }
  }

  public destroy(): void {
    this.lightsContainer.destroy({ children: true });
    this.petalsContainer.destroy({ children: true });
  }
}
