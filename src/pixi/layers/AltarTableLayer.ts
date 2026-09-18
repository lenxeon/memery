/**
 * @file AltarTableLayer.ts
 * @description PixiJS 真实实木【板式结构】中式古典供案渲染系统。
 *
 * 遵循现代中式极简板式形制（无复杂桌腿、无繁琐牙头横撑）：
 * 1. 上台面板 (Top Surface Slab)：规则后敛梯形，透视斜率精准对齐地坪灭点。
 * 2. 台面前立面 (Front Face Slab)：22px 实木厚板封边立面，带顶沿 1.2px 倒角天光微高光线与底边平直拼缝。
 * 3. 板式承重构架 (Panel Base Structure)：
 *    - 左右大实木落地承重立板 (Left & Right Side Slab Panels)：平直垂直落地整板，厚重大气。
 *    - 连贯实木大前挡板 (Center Modesty Board)：左右立板间横贯的大面积实木中板，受光温润沉稳。
 *    - 纯板式构造，彻底消灭复杂细腿、牙板、斜角牙头、管脚横撑及马蹄足。
 * 4. 着地环境遮蔽阴影 (Floor AO Shadows)：落地厚板整条平稳接地软阴影与案底通透环境遮蔽。
 * 5. 材质自治：由 TableMaterial 自闭环管理 4 款名木纹理与动态热更新。
 */
import { Container, Graphics, Sprite, TilingSprite } from 'pixi.js';
import { TableclothStyle, LightingSettings, TableWoodStyle } from '../../types';
import { TableMaterial } from './table/TableMaterial';
import { TexturePipeline } from '../assets/TexturePipeline';

export class AltarTableLayer {
  public container: Container = new Container();

  // 1. 底层：着地接触阴影与案底环境遮蔽
  private shadowGraphics: Graphics = new Graphics();

  // 2. 板式承重底架容器 (左右厚立板、中前挡板、板式微光影)
  private basePanelsContainer: Container = new Container();
  private centerBoardSprite: TilingSprite | null = null;
  private leftPanelSprite: TilingSprite | null = null;
  private rightPanelSprite: TilingSprite | null = null;
  private panelShadingGraphics: Graphics = new Graphics();

  // 3. 正前面台面厚度立面容器 (台面封板、倒角微高光、底边缝)
  private frontFaceContainer: Container = new Container();
  private frontFaceSprite: TilingSprite | null = null;
  private frontFaceBevelGraphics: Graphics = new Graphics();

  // 4. 上台面板规则梯形容器 (对齐地坪灭点的水平大板)
  private topSurfaceContainer: Container = new Container();
  private topSurfaceSprite: TilingSprite | null = null;
  private topSurfaceMask: Graphics = new Graphics();
  private topSurfaceShading: Graphics = new Graphics();

  // 5. 装饰桌布容器 (仅在开启桌布时叠加)
  private tableclothContainer: Container = new Container();
  private tableclothSprite: Sprite = new Sprite();
  private currentTableclothKey: string = '';

  private currentLighting: LightingSettings | null = null;
  private currentWoodStyle: TableWoodStyle = 'walnut';
  private unsubscribeMaterial?: () => void;

  constructor() {
    // 严格按纵深前后层次排列
    this.container.addChild(this.shadowGraphics);
    this.container.addChild(this.basePanelsContainer);
    this.container.addChild(this.frontFaceContainer);
    this.container.addChild(this.topSurfaceContainer);
    this.container.addChild(this.tableclothContainer);

    // 板式底架构件立体光影与分界线
    this.basePanelsContainer.addChild(this.panelShadingGraphics);

    // 正立面高光线
    this.frontFaceContainer.addChild(this.frontFaceBevelGraphics);

    // 上台面遮罩与渐变
    this.topSurfaceContainer.mask = this.topSurfaceMask;
    this.container.addChild(this.topSurfaceMask);
    this.topSurfaceContainer.addChild(this.topSurfaceShading);

    // 桌布精灵
    this.tableclothSprite.visible = false;
    this.tableclothContainer.addChild(this.tableclothSprite);

    // 订阅材质动态加载，自动热更新当前贴图
    this.unsubscribeMaterial = TableMaterial.getInstance().onUpdate((style) => {
      if (style === this.currentWoodStyle) {
        this.applyWoodTexture();
      }
    });
  }

  /**
   * 应用当前选中的实木贴图至所有板式构件
   */
  private applyWoodTexture(): void {
    const tex = TableMaterial.getInstance().getWoodTexture(this.currentWoodStyle);
    if (!tex || !tex.source || tex.source.width <= 1) return;
    if (this.topSurfaceSprite && this.topSurfaceSprite.texture !== tex) {
      this.topSurfaceSprite.texture = tex;
    }
    if (this.frontFaceSprite && this.frontFaceSprite.texture !== tex) {
      this.frontFaceSprite.texture = tex;
    }
    if (this.centerBoardSprite && this.centerBoardSprite.texture !== tex) {
      this.centerBoardSprite.texture = tex;
    }
    if (this.leftPanelSprite && this.leftPanelSprite.texture !== tex) {
      this.leftPanelSprite.texture = tex;
    }
    if (this.rightPanelSprite && this.rightPanelSprite.texture !== tex) {
      this.rightPanelSprite.texture = tex;
    }
  }

  /**
   * 设定实木材质风格
   */
  public setWoodStyle(style: TableWoodStyle): void {
    this.currentWoodStyle = style;
    TableMaterial.getInstance().setStyle(style);
    this.applyWoodTexture();
  }

  /**
   * 根据全局灯光调节木质色温与明暗
   */
  public setLighting(lighting: LightingSettings): void {
    this.currentLighting = lighting;
    const tint = TableMaterial.getInstance().calculateTint(lighting);
    this.container.tint = tint;
  }

  /**
   * 渲染实木板式供案
   * @param centerX 供案中心 X 坐标
   * @param tableTopY 供案台面前沿基线 Y 坐标
   * @param tableWidth 供案台面横向总长（红线之间的宽度）
   * @param _tableHeight 兼容参数
   * @param tableclothStyle 可选桌布风格
   * @param showTableRunner 是否展示桌布
   * @param showPetals 是否展示落花瓣
   * @param tableWoodStyle 可选实木风格
   */
  public render(
    centerX: number,
    tableTopY: number,
    tableWidth: number = 620,
    _tableHeight: number = 166,
    tableclothStyle: TableclothStyle = 'autumn_gold',
    showTableRunner: boolean = false,
    showPetals: boolean = false,
    tableWoodStyle?: TableWoodStyle
  ): void {
    if (tableWoodStyle && tableWoodStyle !== this.currentWoodStyle) {
      this.currentWoodStyle = tableWoodStyle;
      TableMaterial.getInstance().setStyle(tableWoodStyle);
    }
    const material = TableMaterial.getInstance();
    const woodTexture = material.getWoodTexture(this.currentWoodStyle);

    // ── 纯板式几何规范 ──
    const halfW = tableWidth * 0.5;

    // 1. 上台面板：深度 68px，后沿内敛收缩，透视斜率精准对齐地坪视平线灭点
    const depth = 68;
    const inset = Math.round(halfW * 0.165); // 后沿内缩约 51px，后沿宽约 518px

    // 2. 台面正前料厚立面
    const frontThickness = 22; // 22px 饱满平整厚板封边

    // 3. 板式承重构架尺寸（纯板式落地结构）
    const panelHeight = 106;   // 承重立板总高
    const sidePanelWidth = 44; // 左右落地承重厚立板宽度（厚重端庄）
    const sideOverhang = 38;   // 侧板内缩挑头余量（台面左右各挑头 38px，显得沉着舒展）

    const leftPanelX = -halfW + sideOverhang;
    const rightPanelX = halfW - sideOverhang - sidePanelWidth;

    const baseTopY = frontThickness;
    const baseBottomY = baseTopY + panelHeight;

    // 中间连贯大前挡板（位于左右侧板之间）
    const centerBoardX = leftPanelX + sidePanelWidth;
    const centerBoardW = rightPanelX - centerBoardX;
    const centerBoardH = 80;   // 挡板高度 80px，底部留出 26px 悬空通透空间

    // 容器基点置于 (centerX, tableTopY)
    this.container.x = centerX;
    this.container.y = tableTopY;

    // ──────────────────────────────────────────
    // 1. 渲染上台面板 (Top Surface Slab)
    // ──────────────────────────────────────────
    const tlX = -halfW + inset;
    const tlY = -depth;
    const trX = halfW - inset;
    const trY = -depth;
    const brX = halfW;
    const brY = 0;
    const blX = -halfW;
    const blY = 0;

    this.topSurfaceMask.clear();
    this.topSurfaceMask.poly([tlX, tlY, trX, trY, brX, brY, blX, blY]).fill({ color: 0xffffff });

    if (!this.topSurfaceSprite && woodTexture) {
      this.topSurfaceSprite = new TilingSprite({
        texture: woodTexture,
        width: tableWidth + 10,
        height: depth + 10,
      });
      this.topSurfaceContainer.addChildAt(this.topSurfaceSprite, 0);
    }
    if (this.topSurfaceSprite) {
      if (woodTexture && this.topSurfaceSprite.texture !== woodTexture) {
        this.topSurfaceSprite.texture = woodTexture;
      }
      this.topSurfaceSprite.x = -halfW;
      this.topSurfaceSprite.y = -depth;
      this.topSurfaceSprite.width = tableWidth;
      this.topSurfaceSprite.height = depth;
      this.topSurfaceSprite.tileScale.set(0.68, 0.68);
    }

    // 台面板面光影
    this.topSurfaceShading.clear();
    // 远端深景深柔和遮蔽
    this.topSurfaceShading.rect(-halfW, -depth, tableWidth, depth * 0.48).fill({
      color: 0x180c05,
      alpha: 0.26,
    });
    // 前缘天光漫反射微高光
    this.topSurfaceShading.rect(-halfW, -depth * 0.35, tableWidth, depth * 0.35).fill({
      color: 0xffffff,
      alpha: 0.045,
    });
    // 梯形内沿微倒角内轮廓高光线
    this.topSurfaceShading
      .poly([tlX + 1, tlY + 1, trX - 1, trY + 1, brX - 1, brY - 0.5, blX + 1, blY - 0.5])
      .stroke({ color: 0xf5dfc8, width: 0.8, alpha: 0.4 });

    // ──────────────────────────────────────────
    // 2. 渲染正前面台面厚度立面 (Front Face Slab)
    // ──────────────────────────────────────────
    if (!this.frontFaceSprite && woodTexture) {
      this.frontFaceSprite = new TilingSprite({
        texture: woodTexture,
        width: tableWidth,
        height: frontThickness,
      });
      this.frontFaceContainer.addChildAt(this.frontFaceSprite, 0);
    }
    if (this.frontFaceSprite) {
      if (woodTexture && this.frontFaceSprite.texture !== woodTexture) {
        this.frontFaceSprite.texture = woodTexture;
      }
      this.frontFaceSprite.x = -halfW;
      this.frontFaceSprite.y = 0;
      this.frontFaceSprite.width = tableWidth;
      this.frontFaceSprite.height = frontThickness;
      this.frontFaceSprite.tileScale.set(0.62, 0.62);
      // 正立面微温润受光
      this.frontFaceSprite.tint = 0xf0ddc9;
    }

    // 正前面微倒角高光与底口阴影槽
    this.frontFaceBevelGraphics.clear();
    // 顶沿天光倒角高光线 (Highlight Lip)
    this.frontFaceBevelGraphics
      .moveTo(-halfW, 0.5)
      .lineTo(halfW, 0.5)
      .stroke({ color: 0xfff0dd, width: 1.2, alpha: 0.9 });
    // 下沿转角拼缝阴影线
    this.frontFaceBevelGraphics
      .moveTo(-halfW, frontThickness - 0.5)
      .lineTo(halfW, frontThickness - 0.5)
      .stroke({ color: 0x1b0e06, width: 1.4, alpha: 0.95 });

    // ──────────────────────────────────────────
    // 3. 渲染纯板式承重构架 (Panel Base Structure)
    // ──────────────────────────────────────────

    // 3.1 中间连贯大前挡板 (Center Modesty Board)
    if (!this.centerBoardSprite && woodTexture) {
      this.centerBoardSprite = new TilingSprite({
        texture: woodTexture,
        width: centerBoardW,
        height: centerBoardH,
      });
      this.basePanelsContainer.addChildAt(this.centerBoardSprite, 0);
    }
    if (this.centerBoardSprite) {
      if (woodTexture && this.centerBoardSprite.texture !== woodTexture) {
        this.centerBoardSprite.texture = woodTexture;
      }
      this.centerBoardSprite.x = centerBoardX;
      this.centerBoardSprite.y = baseTopY;
      this.centerBoardSprite.width = centerBoardW;
      this.centerBoardSprite.height = centerBoardH;
      this.centerBoardSprite.tileScale.set(0.58, 0.58);
      // 中挡板受台面遮蔽，色泽略微内敛沉稳
      this.centerBoardSprite.tint = 0xb59372;
    }

    // 3.2 左承重落地厚立板 (Left Side Slab Panel)
    if (!this.leftPanelSprite && woodTexture) {
      this.leftPanelSprite = new TilingSprite({
        texture: woodTexture,
        width: sidePanelWidth,
        height: panelHeight,
      });
      this.basePanelsContainer.addChild(this.leftPanelSprite);
    }
    if (this.leftPanelSprite) {
      if (woodTexture && this.leftPanelSprite.texture !== woodTexture) {
        this.leftPanelSprite.texture = woodTexture;
      }
      this.leftPanelSprite.x = leftPanelX;
      this.leftPanelSprite.y = baseTopY;
      this.leftPanelSprite.width = sidePanelWidth;
      this.leftPanelSprite.height = panelHeight;
      this.leftPanelSprite.tileScale.set(0.52, 0.78);
      this.leftPanelSprite.tint = 0xc8a888;
    }

    // 3.3 右承重落地厚立板 (Right Side Slab Panel)
    if (!this.rightPanelSprite && woodTexture) {
      this.rightPanelSprite = new TilingSprite({
        texture: woodTexture,
        width: sidePanelWidth,
        height: panelHeight,
      });
      this.basePanelsContainer.addChild(this.rightPanelSprite);
    }
    if (this.rightPanelSprite) {
      if (woodTexture && this.rightPanelSprite.texture !== woodTexture) {
        this.rightPanelSprite.texture = woodTexture;
      }
      this.rightPanelSprite.x = rightPanelX;
      this.rightPanelSprite.y = baseTopY;
      this.rightPanelSprite.width = sidePanelWidth;
      this.rightPanelSprite.height = panelHeight;
      this.rightPanelSprite.tileScale.set(0.52, 0.78);
      this.rightPanelSprite.tint = 0xc8a888;
    }

    // 3.4 板式构架立体光影与转角分界（纯净利落板式线条）
    this.panelShadingGraphics.clear();

    // 台面下方横贯投影暗带（让中挡板和侧板顶口产生深邃阴影）
    this.panelShadingGraphics.rect(leftPanelX, baseTopY, rightPanelX + sidePanelWidth - leftPanelX, 6).fill({
      color: 0x140a04,
      alpha: 0.65,
    });

    // 左右立板外侧立体暗边（表现板材的厚度与边缘）
    this.panelShadingGraphics.rect(leftPanelX, baseTopY, 6, panelHeight).fill({ color: 0x180d06, alpha: 0.38 });
    this.panelShadingGraphics.rect(rightPanelX + sidePanelWidth - 6, baseTopY, 6, panelHeight).fill({ color: 0x180d06, alpha: 0.38 });

    // 左右立板内侧接缝暗槽（与中挡板的拼板分界缝）
    this.panelShadingGraphics
      .moveTo(centerBoardX + 0.5, baseTopY)
      .lineTo(centerBoardX + 0.5, baseTopY + centerBoardH)
      .stroke({ color: 0x1a0d06, width: 1.2, alpha: 0.8 });

    this.panelShadingGraphics
      .moveTo(rightPanelX - 0.5, baseTopY)
      .lineTo(rightPanelX - 0.5, baseTopY + centerBoardH)
      .stroke({ color: 0x1a0d06, width: 1.2, alpha: 0.8 });

    // 中挡板下沿拼板收边与悬空阴影槽
    this.panelShadingGraphics
      .moveTo(centerBoardX, baseTopY + centerBoardH)
      .lineTo(rightPanelX, baseTopY + centerBoardH)
      .stroke({ color: 0x1c0f07, width: 1.5, alpha: 0.85 });

    // 立板表面温润微受光线（表现优质打磨实木质感）
    this.panelShadingGraphics
      .moveTo(leftPanelX + 8, baseTopY)
      .lineTo(leftPanelX + 8, baseBottomY)
      .stroke({ color: 0xffeedc, width: 0.8, alpha: 0.3 });
    this.panelShadingGraphics
      .moveTo(rightPanelX + 8, baseTopY)
      .lineTo(rightPanelX + 8, baseBottomY)
      .stroke({ color: 0xffeedc, width: 0.8, alpha: 0.3 });

    // ──────────────────────────────────────────
    // 4. 渲染着地接触与案底环境遮蔽阴影 (Floor Shadows)
    // ──────────────────────────────────────────
    this.shadowGraphics.clear();
    // 左立板整块落地的扎实接触软阴影
    this.shadowGraphics.ellipse(leftPanelX + sidePanelWidth * 0.5, baseBottomY + 2, sidePanelWidth * 0.7, 4.5).fill({
      color: 0x120702,
      alpha: 0.85,
    });
    // 右立板整块落地的扎实接触软阴影
    this.shadowGraphics.ellipse(rightPanelX + sidePanelWidth * 0.5, baseBottomY + 2, sidePanelWidth * 0.7, 4.5).fill({
      color: 0x120702,
      alpha: 0.85,
    });
    // 案底大面积开阔环境光遮蔽（AO）柔和落影
    this.shadowGraphics.ellipse(0, baseBottomY + 6, halfW * 0.88, 9).fill({
      color: 0x140803,
      alpha: 0.45,
    });

    // ──────────────────────────────────────────
    // 5. 渲染可选装饰桌布 (仅当开启时呈现)
    // ──────────────────────────────────────────
    if (showTableRunner) {
      this.tableclothContainer.visible = true;
      const tableclothKey = `${tableclothStyle}_${showPetals}`;
      if (this.currentTableclothKey !== tableclothKey) {
        this.currentTableclothKey = tableclothKey;
        const pipeline = TexturePipeline.getInstance();
        pipeline.getAltarTableTexture(tableclothStyle, true, showPetals).then((tex) => {
          if (!this.tableclothSprite.destroyed) {
            this.tableclothSprite.texture = tex;
            this.tableclothSprite.anchor.set(0.5, 70 / 166);
            this.tableclothSprite.width = tableWidth;
            this.tableclothSprite.height = tableWidth * (166 / 560);
            this.tableclothSprite.visible = true;
          }
        });
      }
    } else {
      this.tableclothContainer.visible = false;
    }

    // 保持当前灯光生效
    if (this.currentLighting) {
      this.setLighting(this.currentLighting);
    }
  }

  public destroy(): void {
    this.unsubscribeMaterial?.();
    this.topSurfaceMask.destroy();
    this.container.destroy({ children: true });
  }
}
