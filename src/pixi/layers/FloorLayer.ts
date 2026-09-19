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
  /** 真·透视地坪：横向条带池（每条 4px，尺度随距地平线距离线性衰减） */
  private floorStrips: TilingSprite[] = [];
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

    // 2. 真·透视地坪贴图 —— 还原旧 CSS 3D (perspective + rotateX) 的近大远小观感：
    //    将地面视为水平平面做投影：屏幕尺度 s(y) ∝ (y - horizonY)（线性衰减），
    //    纵向纹理坐标 v(y) ∝ ln(y - horizonY)（等距世界深度被透视压缩、收敛于地平线）。
    //    用 4px 横向条带逐条绘制，条带内尺度近似恒定，接缝不可见；
    //    横向以画面中心为消失点锚定（tilePosition.x = width/2），砖缝向灭点收敛。
    const pipeline = TexturePipeline.getInstance();
    const activeTex = pipeline.floorTextures[floorStyle] || (floorStyle === 'marble_tile' ? marbleTexture : woodTexture);

    if (activeTex && activeTex.source && activeTex.source.width > 1) {
      try {
        const tsBottom = 0.6; // 近端（画面底缘）基础贴图尺度
        const rowH = 4; // 条带高度
        const mLog = floorHeight / tsBottom; // 对数映射系数
        const vanishX = width / 2;
        const needed = Math.ceil(floorHeight / rowH);

        while (this.floorStrips.length < needed) {
          const strip = new TilingSprite({ texture: activeTex, width, height: rowH + 0.6 });
          // 插在底色之上、景深遮罩之下
          this.container.addChildAt(strip, 1);
          this.floorStrips.push(strip);
        }

        let stripTint = 0xffffff;
        if (!lighting.masterOn) {
          // 关灯：留一层烛照余晖，地面仍比案体更沉，维持纵深层次
          stripTint = 0x453122;
        } else if (lighting.timeOfDay === 'sunset') {
          stripTint = 0xffe2cc;
        } else if (lighting.timeOfDay === 'night') {
          stripTint = 0x556b82;
        }

        for (let i = 0; i < this.floorStrips.length; i++) {
          const strip = this.floorStrips[i];
          if (i >= needed) {
            strip.visible = false;
            continue;
          }
          const yTop = horizonY + i * rowH;
          const yBot = Math.min(yTop + rowH, height);
          const yMid = (yTop + yBot) / 2;
          const dist = yMid - horizonY; // 距地平线的屏幕距离
          const tileScale = (tsBottom * dist) / floorHeight;
          // 纵向世界坐标：v = mLog · ln(dist)，保证跨条带纹理连续
          const vWorld = mLog * Math.log(Math.max(dist, 0.001));

          strip.visible = true;
          strip.texture = activeTex;
          strip.x = 0;
          strip.y = yTop;
          strip.width = width;
          strip.height = yBot - yTop + 0.6; // 轻微重叠消除条带缝
          strip.tileScale.set(tileScale);
          strip.tilePosition.x = vanishX; // 横向以灭点锚定 → 砖缝向灭点收敛
          strip.tilePosition.y = yMid - yTop - vWorld * tileScale;
          strip.tint = stripTint;
        }
      } catch (err) {
        console.warn('FloorLayer perspective tiling error:', err);
      }
    } else {
      for (const strip of this.floorStrips) strip.visible = false;
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
