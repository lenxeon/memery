/**
 * @file FloorLayer.ts
 * @description 主题地坪：直接显示已经带透视构图的完整 PNG，并叠加独立运行时受光。
 * 地面透视由素材本身表达；运行时不做网格投影、UV 映射或重复平铺。
 */
import { ColorMatrixFilter, Container, Graphics, Sprite, Texture } from 'pixi.js';
import { LightingSettings, SceneThemeFloorImage, SceneThemeLightRig, TimeOfDay } from '../../types';

const FLOOR_HEIGHT_RATIO = 0.28;
export const getFloorTopY = (_width: number, height: number): number =>
  height * (1 - FLOOR_HEIGHT_RATIO);

interface Ambiance {
  brightness: number;
  contrast: number;
  saturation: number;
  hue: number;
  tint: { color: number; alpha: number };
  reflection: { color: number; alpha: number };
}

/** 场景时段对地面受光的调整，独立于主题地板素材。 */
const AMBIANCE_OFF: Ambiance = {
  brightness: 0.24,
  contrast: 1.18,
  saturation: 0.6,
  hue: 0,
  tint: { color: 0x050403, alpha: 0.75 },
  reflection: { color: 0xffc878, alpha: 0 },
};

const AMBIANCE_BY_TIME: Record<TimeOfDay, Ambiance> = {
  day: {
    brightness: 1.03,
    contrast: 1.04,
    saturation: 1.02,
    hue: 0,
    tint: { color: 0xfff8e6, alpha: 0.05 },
    reflection: { color: 0xffedc2, alpha: 0.12 },
  },
  sunset: {
    brightness: 0.94,
    contrast: 1.12,
    saturation: 1.38,
    hue: 0,
    tint: { color: 0xd8761f, alpha: 0.26 },
    reflection: { color: 0xffd18a, alpha: 0.16 },
  },
  night: {
    brightness: 0.55,
    contrast: 1.08,
    saturation: 0.85,
    hue: 0,
    tint: { color: 0x191009, alpha: 0.32 },
    reflection: { color: 0xffdca8, alpha: 0.06 },
  },
};

/** 生成径向柔光遮罩纹理（白色 + alpha 衰减，靠 Sprite.tint 上色） */
const createRadialTexture = (stops: { offset: number; alpha: number }[]): Texture => {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Unable to create the floor lighting canvas');
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  for (const stop of stops) {
    grad.addColorStop(stop.offset, `rgba(255, 255, 255, ${stop.alpha})`);
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = Texture.from(canvas);
  tex.source.scaleMode = 'linear';
  return tex;
};

export class FloorLayer {
  public container: Container = new Container();

  private baseGraphics: Graphics = new Graphics();
  private floorSprite: Sprite = new Sprite(Texture.EMPTY);
  private colorFilter: ColorMatrixFilter = new ColorMatrixFilter();

  private tintGraphics: Graphics = new Graphics();
  private reflectionSprites: Sprite[] = [];
  private reflectionTexture: Texture | null = null;
  private skirtingGraphics: Graphics = new Graphics();
  private contactShadow: Sprite | null = null;
  private floorMask: Graphics = new Graphics();

  constructor(private readonly shadowsEnabled = true) {
    this.floorSprite.anchor.set(0.5, 0);
    this.floorSprite.visible = false;
    this.container.addChild(this.baseGraphics, this.floorSprite, this.tintGraphics);
    this.container.addChild(this.skirtingGraphics, this.floorMask);
    this.container.mask = this.floorMask;
  }

  public render(
    width: number,
    height: number,
    lighting: LightingSettings,
    floorSpec: SceneThemeFloorImage,
    floorImage: Texture | null,
    lightRig?: SceneThemeLightRig
  ): void {
    const floorTop = getFloorTopY(width, height);
    const floorH = Math.max(1, height - floorTop);
    this.floorMask.clear().rect(0, floorTop, width, floorH).fill(0xffffff);
    this.baseGraphics.clear().rect(0, floorTop, width, floorH).fill(floorSpec.baseColor);

    const hasImage = Boolean(floorImage?.source && floorImage.width > 1 && floorImage.height > 1);
    if (hasImage) {
      const image = floorImage!;
      image.source.scaleMode = 'linear';
      this.floorSprite.texture = image;
      // The authored floor image already contains perspective. Fit it uniformly
      // into the ground viewport and crop only the overflow at the viewport edge.
      const scale = Math.max(width / image.width, floorH / image.height);
      // Keep the authored far edge aligned to the wall/floor seam; any cover
      // crop falls toward the viewer or beyond the side edges.
      this.floorSprite.position.set(width / 2, floorTop);
      this.floorSprite.scale.set(scale);
      this.floorSprite.visible = true;
      this.applyAmbianceFilter(lighting);
    } else {
      this.floorSprite.visible = false;
      this.floorSprite.filters = [];
    }

    // 缺图时仅显示当前主题底色，不给兜底色叠加旧阴影、反射或踢脚线。
    this.tintGraphics.visible = hasImage;
    this.skirtingGraphics.visible = hasImage;
    if (!hasImage) {
      this.reflectionSprites.forEach((sprite) => { sprite.visible = false; });
      if (this.contactShadow) this.contactShadow.visible = false;
      return;
    }

    // 时段色调
    const ambiance = lighting.masterOn
      ? AMBIANCE_BY_TIME[lighting.timeOfDay as TimeOfDay] ?? AMBIANCE_BY_TIME.day
      : AMBIANCE_OFF;
    this.tintGraphics.clear();
    this.tintGraphics
      .rect(0, floorTop, width, floorH)
      .fill({
        color: ambiance.tint.color,
        alpha: lighting.masterOn && lighting.timeOfDay === 'day'
          ? 0
          : ambiance.tint.alpha * 0.65,
      });

    // 主题指定的接缝色；厚度随画布缩放，不再绘制旧版 18px 多层木条。
    const seamHeight = height * 0.004;
    const board = floorSpec.baseboard;
    this.skirtingGraphics.clear()
      .rect(0, floorTop, width, seamHeight).fill(board.color)
      .rect(0, floorTop, width, seamHeight * 0.2).fill({ color: board.highlight, alpha: 0.65 })
      .rect(0, floorTop, width, seamHeight).fill({ color: ambiance.tint.color, alpha: ambiance.tint.alpha });

    // 未烘焙光照时的柔和反射带，以及案体接地投影。
    const lightFactor = lighting.masterOn ? lighting.sunlightIntensity : 0.08;
    if (lighting.masterOn && !floorSpec.bakedLighting) {
      if (!this.reflectionTexture) {
        this.reflectionTexture = createRadialTexture([
          { offset: 0, alpha: 0.8 },
          { offset: 0.24, alpha: 0.56 },
          { offset: 0.62, alpha: 0.18 },
          { offset: 1, alpha: 0 },
        ]);
        this.reflectionSprites = [0, 1].map(() => {
          const sprite = new Sprite(this.reflectionTexture!);
          sprite.anchor.set(0.5);
          sprite.blendMode = 'add';
          this.container.addChildAt(sprite, this.container.getChildIndex(this.tintGraphics) + 1);
          return sprite;
        });
      }
      const source = lightRig?.source ?? { x: 0.5, y: 0.12 };
      const angle = (lighting.sunAngle * Math.PI) / 180;
      const sourceShift = (source.x - 0.5) * width * 0.12;
      const floorCenterY = floorTop + floorH * 0.56;
      const [leftReflection, rightReflection] = this.reflectionSprites;
      const reflectionTint = lightRig?.keyColor ?? ambiance.reflection.color;

      // Two softer vertical reflections suggest light traveling from the wall
      // toward the viewer; the angle and source move them with the active rig.
      [leftReflection, rightReflection].forEach((sprite, index) => {
        sprite.visible = true;
        sprite.texture.source.scaleMode = 'linear';
        sprite.tint = reflectionTint;
        const timeScale = ambiance.reflection.alpha / 0.12;
        sprite.alpha = lightFactor * 0.12 * Math.min(1.35, timeScale);
        sprite.x = width * (index === 0 ? 0.39 : 0.63) + sourceShift;
        sprite.y = floorCenterY;
        sprite.width = width * 0.22;
        sprite.height = floorH * 1.10;
        sprite.rotation = -angle * 0.48;
      });
    } else {
      for (const sprite of this.reflectionSprites) sprite.visible = false;
    }

    if (!this.shadowsEnabled) {
      if (this.contactShadow) this.contactShadow.visible = false;
      return;
    }
    if (!this.contactShadow) {
      this.contactShadow = new Sprite(
        createRadialTexture([
          { offset: 0, alpha: 0.76 },
          { offset: 0.5, alpha: 0.3 },
          { offset: 0.8, alpha: 0 },
        ])
      );
      this.contactShadow.anchor.set(0.5);
      this.contactShadow.tint = 0x0f0804;
      this.container.addChild(this.contactShadow);
    }
    const shadowBottom = width >= 640 ? 32 : 24;
    this.contactShadow.visible = true;
    this.contactShadow.x = width / 2;
    this.contactShadow.y = height - shadowBottom - 28;
    this.contactShadow.width = Math.min(width * 0.9, 620);
    this.contactShadow.height = 56;
  }

  /** 白天保留设计稿像素；关闭主灯、日落与夜晚按场景时段调整受光。 */
  private applyAmbianceFilter(lighting: LightingSettings): void {
    const ambiance = lighting.masterOn
      ? AMBIANCE_BY_TIME[lighting.timeOfDay as TimeOfDay] ?? AMBIANCE_BY_TIME.day
      : AMBIANCE_OFF;
    const filter = this.colorFilter;
    filter.reset();
    // A render-match theme floor already carries its intended material color.
    // Keep the daytime base pixels untouched; sunset/night still receive the
    // shared environment grade below.
    if (lighting.masterOn && lighting.timeOfDay === 'day') {
      this.floorSprite.filters = [];
      return;
    }
    this.floorSprite.filters = [filter];
    filter.brightness(ambiance.brightness * 1.08, true);
    filter.contrast(ambiance.contrast - 1, true);
    filter.saturate(ambiance.saturation - 1, true);
    if (ambiance.hue !== 0) filter.hue(ambiance.hue, true);
  }

  public destroy(): void {
    const shadowTexture = this.contactShadow?.texture;
    this.container.destroy({ children: true });
    this.reflectionTexture?.destroy(true);
    shadowTexture?.destroy(true);
    this.colorFilter.destroy();
  }
}
