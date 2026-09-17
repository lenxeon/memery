/**
 * @file FloorLayer.ts
 * @description PixiJS 2.5D 透视地坪层。
 * 完美还原 5 款古典禅意地坪 (浅暖桧木、黑胡桃长条、人字拼花、草木素席、汉白玉方砖)，
 * 具备实木雕花双层踢脚线、自然视线景深渐变与晨昏色温光影。
 */
import { Container, Graphics, TilingSprite, Texture } from 'pixi.js';
import { FloorStyle, LightingSettings } from '../../types';
import { TexturePipeline } from '../assets/TexturePipeline';

export class FloorLayer {
  public container: Container = new Container();

  private fallbackGraphics: Graphics = new Graphics();
  private floorSprite: TilingSprite | null = null;
  private depthShadingGraphics: Graphics = new Graphics();
  private skirtingGraphics: Graphics = new Graphics();
  private shadowGraphics: Graphics = new Graphics();

  constructor() {
    this.container.addChild(this.fallbackGraphics);
    this.container.addChild(this.depthShadingGraphics);
    this.container.addChild(this.skirtingGraphics);
    this.container.addChild(this.shadowGraphics);
  }

  public render(
    width: number,
    height: number,
    floorStyle: FloorStyle,
    woodTexture: Texture | null,
    marbleTexture: Texture | null,
    lighting: LightingSettings
  ): void {
    // 地面水平基准线：位于视口下 38%
    const horizonY = height * 0.62;
    const floorHeight = Math.max(60, height - horizonY);

    // 1. 地坪底色
    this.fallbackGraphics.clear();
    let baseColor = 0x8c5a32;
    if (floorStyle === 'marble_tile') baseColor = 0xd8d3ca;
    else if (floorStyle === 'zen_tatami') baseColor = 0x4a3b2c;
    else if (floorStyle === 'walnut_plank') baseColor = 0x4e3322;
    else if (floorStyle === 'herringbone_wood' || floorStyle === 'wood_planks') baseColor = 0x5a2e16;

    this.fallbackGraphics.rect(0, horizonY, width, floorHeight).fill({ color: baseColor });

    // 2. 获取当前风格贴图 (从 5 风格贴图池中读取)
    const pipeline = TexturePipeline.getInstance();
    const activeTex = pipeline.floorTextures[floorStyle] || (floorStyle === 'marble_tile' ? marbleTexture : woodTexture);

    if (activeTex && activeTex.source && activeTex.source.width > 1) {
      try {
        if (!this.floorSprite) {
          this.floorSprite = new TilingSprite({
            texture: activeTex,
            width,
            height: floorHeight,
          });
          // 放在 fallbackGraphics 之后、depthShading 之前
          this.container.addChildAt(this.floorSprite, 1);
        } else {
          this.floorSprite.texture = activeTex;
          this.floorSprite.width = width;
          this.floorSprite.height = floorHeight;
        }

        this.floorSprite.x = 0;
        this.floorSprite.y = horizonY;
        this.floorSprite.visible = true;

        const tileScale = floorStyle === 'marble_tile' ? 0.42 : floorStyle === 'zen_tatami' ? 0.35 : 0.38;
        this.floorSprite.tileScale.set(tileScale);

        if (!lighting.masterOn) {
          this.floorSprite.tint = 0x241a12;
        } else if (lighting.timeOfDay === 'sunset') {
          this.floorSprite.tint = 0xffe2cc;
        } else if (lighting.timeOfDay === 'night') {
          this.floorSprite.tint = 0x556b82;
        } else {
          this.floorSprite.tint = 0xffffff;
        }
      } catch (err) {
        console.warn('FloorLayer tiling error:', err);
      }
    } else if (this.floorSprite) {
      this.floorSprite.visible = false;
    }

    // 3. 景深与漫反射渐变遮罩 (近大远小视锥明暗收敛)
    this.depthShadingGraphics.clear();
    // 远端幽微深沉
    this.depthShadingGraphics.rect(0, horizonY, width, floorHeight * 0.35).fill({ color: 0x000000, alpha: 0.28 });
    // 近端两侧暗角
    this.depthShadingGraphics.rect(0, horizonY + floorHeight * 0.35, width, floorHeight * 0.65).fill({ color: 0x000000, alpha: 0.08 });

    // 4. 双层实木雕花踢脚线
    this.skirtingGraphics.clear();
    let baseboardColor = 0x5a2e16;
    let baseboardHighlight = 0xa3633d;
    if (floorStyle === 'marble_tile') {
      baseboardColor = 0xa89884;
      baseboardHighlight = 0xffffff;
    } else if (floorStyle === 'zen_tatami') {
      baseboardColor = 0x4a3b2c;
      baseboardHighlight = 0x8a735c;
    } else if (floorStyle === 'walnut_plank') {
      baseboardColor = 0x4e3322;
      baseboardHighlight = 0x8c6044;
    }

    // 踢脚线主身 (12px)
    this.skirtingGraphics.rect(0, horizonY - 14, width, 14).fill({ color: baseboardColor });
    // 顶面微光金线倒角 (2px)
    this.skirtingGraphics.rect(0, horizonY - 14, width, 2.5).fill({ color: baseboardHighlight, alpha: 0.8 });
    // 踢脚线底切暗槽阴影 (4px)
    this.skirtingGraphics.rect(0, horizonY - 1, width, 4).fill({ color: 0x000000, alpha: 0.45 });

    // 5. 供案底座接地深层柔和投影 (Table Ambient Shadow)
    this.shadowGraphics.clear();
    const centerX = width * 0.5;
    const tableShadowY = horizonY + floorHeight * 0.52;
    this.shadowGraphics
      .ellipse(centerX, tableShadowY, Math.min(width * 0.45, 340), 16)
      .fill({ color: 0x0a0604, alpha: 0.68 });
  }

  public destroy(): void {
    this.container.destroy({ children: true });
  }
}
