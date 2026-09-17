/**
 * @file AltarTableLayer.ts
 * @description PixiJS 供案台基与织锦层。
 * 100% 渲染真实 3D 禅意红木雕花供案与华美垂悬织锦桌布 (来自 AltarTableSvg 高清 GPU 纹理)。
 */
import { Container, Sprite } from 'pixi.js';
import { TableclothStyle } from '../../types';
import { TexturePipeline } from '../assets/TexturePipeline';

export class AltarTableLayer {
  public container: Container = new Container();
  private tableSprite: Sprite = new Sprite();
  private currentKey: string = '';

  constructor() {
    this.tableSprite.visible = false;
    this.container.addChild(this.tableSprite);
  }

  /**
   * 渲染真实供案与桌布
   * @param centerX 供案中心 X
   * @param tableTopY 供案台面 Y 坐标
   * @param tableWidth 供案宽度
   * @param tableHeight 供案高度 (按 560:160 等比)
   * @param tableclothStyle 桌布风格
   * @param showTableRunner 是否展示桌旗/桌布
   * @param showPetals 是否展示案面落瓣
   */
  public render(
    centerX: number,
    tableTopY: number,
    tableWidth: number = 560,
    tableHeight: number = 160,
    tableclothStyle: TableclothStyle = 'autumn_gold',
    showTableRunner: boolean = true,
    showPetals: boolean = true
  ): void {
    const key = `${tableclothStyle}_${showTableRunner}_${showPetals}`;

    this.tableSprite.x = centerX;
    this.tableSprite.y = tableTopY;
    // 在 560x160 视口中，台面置物平面严格处于 y = 46.4
    this.tableSprite.anchor.set(0.5, 46.4 / 160);
    this.tableSprite.width = tableWidth;
    this.tableSprite.height = tableWidth * (160 / 560);

    if (this.currentKey !== key) {
      this.currentKey = key;
      TexturePipeline.getInstance()
        .getAltarTableTexture(tableclothStyle, showTableRunner, showPetals)
        .then((tex) => {
          if (!this.tableSprite.destroyed) {
            this.tableSprite.texture = tex;
            this.tableSprite.visible = true;
          }
        })
        .catch((err) => {
          console.error('Failed to load altar table texture:', err);
        });
    } else {
      this.tableSprite.visible = true;
    }
  }

  public destroy(): void {
    this.container.destroy({ children: true });
  }
}
