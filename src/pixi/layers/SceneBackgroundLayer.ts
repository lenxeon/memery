/**
 * @file SceneBackgroundLayer.ts
 * @description PixiJS 远景与古典建筑背景墙层。
 * 100% 呈现 6 大传世殿宇壁构 (来自 WallScene / registry 官方高精矢量 GPU 纹理)，
 * 融合柔和天光光晕与昼夜晨昏环境色谱。
 */
import { Container, Graphics, Sprite } from 'pixi.js';
import { LightingSettings, WallBackgroundStyle } from '../../types';
import { TexturePipeline } from '../assets/TexturePipeline';

export class SceneBackgroundLayer {
  public container: Container = new Container();

  private wallBgGraphics: Graphics = new Graphics();
  private wallGlowGraphics: Graphics = new Graphics();
  private wallSprite: Sprite = new Sprite();
  private currentKey: string = '';

  constructor() {
    this.wallSprite.visible = false;
    this.container.addChild(this.wallBgGraphics);
    this.container.addChild(this.wallGlowGraphics);
    this.container.addChild(this.wallSprite);
  }

  /**
   * 渲染重绘背景
   */
  public render(
    width: number,
    height: number,
    lighting: LightingSettings,
    wallStyle: WallBackgroundStyle = 'classic_dawn'
  ): void {
    const isSunset = lighting.timeOfDay === 'sunset';
    const isNight = lighting.timeOfDay === 'night';
    const masterOn = lighting.masterOn;

    // 1. 绘制室内主墙基底色彩 (大宅温润素雅米宣墙色)
    this.wallBgGraphics.clear();
    let wallColor = 0xf5eee6;
    if (!masterOn) wallColor = 0x14100e;
    else if (isNight) wallColor = 0x0d131f;
    else if (isSunset) wallColor = 0xf7ede2;

    this.wallBgGraphics.rect(0, 0, width, height).fill({ color: wallColor });

    // 2. 殿堂中心天光晕染 (Radial Ambience Wash)
    const centerX = width * 0.5;
    const glowY = height * 0.28;
    this.wallGlowGraphics.clear();

    if (masterOn) {
      const glowRadius = Math.min(width * 0.55, height * 0.45);
      const glowColor = isSunset ? 0xfed7aa : isNight ? 0x38bdf8 : 0xffedd5;
      const glowAlpha = isSunset ? 0.35 : isNight ? 0.12 : 0.28;
      this.wallGlowGraphics
        .circle(centerX, glowY, glowRadius)
        .fill({ color: glowColor, alpha: glowAlpha });
    }

    // 3. 高清古典大木作背景墙 (420x720 视口原生纹理)
    const wallHeight = Math.min(height * 0.88, 720);
    const wallWidth = wallHeight * (420 / 720);

    this.wallSprite.x = centerX;
    this.wallSprite.y = Math.max(0, height * 0.04);
    this.wallSprite.anchor.set(0.5, 0);
    this.wallSprite.width = wallWidth;
    this.wallSprite.height = wallHeight;

    const key = `${wallStyle}_${lighting.timeOfDay}_${masterOn ? '1' : '0'}`;
    if (this.currentKey !== key) {
      this.currentKey = key;
      TexturePipeline.getInstance()
        .getWallTexture(wallStyle, lighting.timeOfDay, masterOn)
        .then((tex) => {
          if (!this.wallSprite.destroyed) {
            this.wallSprite.texture = tex;
            this.wallSprite.visible = true;
          }
        })
        .catch((err) => {
          console.error('Failed to load wall texture:', err);
        });
    } else {
      this.wallSprite.visible = true;
    }
  }

  public destroy(): void {
    this.container.destroy({ children: true });
  }
}
