/**
 * @file SceneBackgroundLayer.ts
 * @description PixiJS 背景墙层。
 *
 * 壁面构成 = 背景大图（装饰框已一并画在图里）+ 遗像 + 纪念文字：
 * 程序化矢量壁构、墙面材质平铺、明暗 / 暗晕 / 天光叠层均已下线，
 * 故本层只剩「墙基底色」与「背景大图」两件东西，越薄越不容易与出图打架。
 */
import { Assets, Container, Graphics, Sprite } from 'pixi.js';
import { LightingSettings, WallBackgroundStyle } from '../../types';
import { getFloorTopY } from './FloorLayer';
import { BaseWallSpec, getWallSpec } from '../scene/walls/BaseWall';

/** 墙体最小可用高度兜底（极矮视口时不至于消失） */
const MIN_WALL_H = 320;

/** 墙身背景大图的额外缩放（1 = 恰好 cover 铺满墙区；>1 再放大，可裁掉更多边缘） */
const WALL_BACKDROP_ZOOM = 1;

/** 墙图底缘埋进踢脚线之下的深度（px）：踢脚线与地坪均在墙图之上绘制，
 *  多出的这一段被完全遮住 —— 墙/地交界因此不会出现缝，也不会露白 */
const WALL_BACKDROP_SKIRT_OVERLAP = 24;

export class SceneBackgroundLayer {
  public container: Container = new Container();

  private wallBgGraphics: Graphics = new Graphics();
  private wallBackdropSprite: Sprite = new Sprite();
  /** 背景大图：最近一次视口尺寸（异步加载完成后据此重新布局） */
  private viewport: { w: number; h: number } = { w: 0, h: 0 };
  private backdropUrl: string = '';
  private backdropToken: number = 0;

  constructor() {
    this.wallBackdropSprite.visible = false;
    this.container.addChild(this.wallBgGraphics);
    this.container.addChild(this.wallBackdropSprite);
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

    // 1. 室内主墙基底色（无背景大图时即为此色；有图时被完全盖住）
    this.wallBgGraphics.clear();
    let wallColor = 0xf5eee6;
    if (!masterOn) wallColor = 0x14100e;
    else if (isNight) wallColor = 0x171310;
    else if (isSunset) wallColor = 0xf9dfc6;

    this.wallBgGraphics.rect(0, 0, width, height).fill({ color: wallColor });

    // 2. 壁面由 BaseWall 统一给出：贴哪张背景图（装饰框已在图内）
    this.viewport = { w: width, h: height };
    this.renderBackdrop(lighting, getWallSpec(wallStyle));
  }

  /**
   * 墙身背景大图（可选）：配置了即用实拍/渲染大图作墙身，昼夜以 tint 调色。
   */
  private renderBackdrop(lighting: LightingSettings, spec: BaseWallSpec): void {
    const url = spec.backdropUrl;
    const isSunset = lighting.timeOfDay === 'sunset';
    const isNight = lighting.timeOfDay === 'night';

    if (!url) {
      this.wallBackdropSprite.visible = false;
      this.backdropUrl = '';
      return;
    }

    const sprite = this.wallBackdropSprite;
    sprite.tint = !lighting.masterOn ? 0x2a241e : isNight ? 0x6f6354 : isSunset ? 0xffd9b4 : 0xffffff;

    if (this.backdropUrl !== url) {
      this.backdropUrl = url;
      const token = ++this.backdropToken;
      sprite.visible = false;
      Assets.load(url)
        .then((tex) => {
          if (token !== this.backdropToken || sprite.destroyed) return;
          sprite.texture = tex;
          sprite.visible = true;
          this.layoutWallBackdrop();
        })
        .catch((err) => {
          console.error('Failed to load wall backdrop:', err);
        });
    } else if (sprite.texture && sprite.texture.width > 0) {
      sprite.visible = true;
      this.layoutWallBackdrop();
    }
  }

  /**
   * 背景大图布局：中轴线对齐 + 一边优先贴合。
   *
   * 优先保证「宽」贴满（横向铺满、中轴对称，绝不出现左右留白的竖带）；
   * 竖向则要求至少盖到踢脚线以下 WALL_BACKDROP_SKIRT_OVERLAP —— 多出的部分
   * 要么溢出屏幕顶部裁掉、要么压在踢脚线/地坪这些更上层的图之下，
   * 因此任何视口下都不会留白、不会出现缝，也不会拉伸变形。
   */
  private layoutWallBackdrop(): void {
    const sprite = this.wallBackdropSprite;
    const tex = sprite.texture;
    const { w, h } = this.viewport;
    if (!tex || !tex.width || !tex.height || w <= 0 || h <= 0) return;

    // 底缘算到踢脚线之下：把墙图脚埋进上层图里，杜绝墙/地交界的缝
    const floorTop = getFloorTopY(w, h);
    const zoneBottom = floorTop + WALL_BACKDROP_SKIRT_OVERLAP;
    const zoneH = Math.max(MIN_WALL_H, zoneBottom);

    // 宽优先，竖向兜底：取两者较大者 ⇒ 两边都覆盖，宁可裁不露白
    const scale = Math.max(w / tex.width, zoneH / tex.height) * WALL_BACKDROP_ZOOM;

    sprite.anchor.set(0.5, 1); // 中轴 + 底缘为锚
    sprite.x = w * 0.5;
    sprite.y = zoneBottom;
    sprite.width = tex.width * scale;
    sprite.height = tex.height * scale;
  }

  public destroy(): void {
    this.container.destroy({ children: true });
  }
}
