/**
 * @file AltarTableLayer.ts
 * @description PixiJS 真实实木【明式条案形制】中式古典供案渲染系统。
 *
 * 遵循明式条案经典构造（挺拔、通透、端庄）：
 * 1. 上台面板 (Top Surface Slab)：浅收敛梯形大板，后沿内缩量按地坪灭点
 *    收敛关系实时推算，保证台面透视与地面透视一致、不失真。
 * 2. 台面厚度立面 (Front Edge Slab)：22.5u 实木厚板封边，顶沿天光倒角线与底口拼缝。
 * 3. 腿足构架 (Leg & Apron Frame)：
 *    - 左右落地圆料感实木腿足，腿间通透，不做整板封闭。
 *    - 大边牙板 (Apron)：与腿足同一平面横贯衔接，承上启下。
 *    - 低位横枨 (Stretcher)：连接左右腿足，结构稳定且增添层次。
 *    - 后腿透视内收，隐于阴影，营造纵深。
 * 4. 着地环境遮蔽阴影 (Floor AO Shadows)：足端接触阴影与案底大面积柔和落影。
 * 5. 材质自治：由 TableMaterial 自闭环管理 4 款名木纹理与动态热更新，
 *    台面 (topWoodStyle) 与腿足 (legWoodStyle) 支持独立材质搭配。
 *
 * 所有构件尺寸均以 560 单位经典设计稿为基准按 u = tableWidth / 560 等比换算，
 * 并与布局系统 tableHangingHeight (96/560) 精确对齐，确保足底接地位置一致。
 */
import { Container, Graphics, Sprite, TilingSprite, Rectangle, BlurFilter } from 'pixi.js';
import { TableclothStyle, LightingSettings, TableWoodStyle } from '../../types';
import { TableMaterial } from './table/TableMaterial';
import { TexturePipeline } from '../assets/TexturePipeline';

/** 场景点光源（烛火），坐标为舞台全局坐标 */
export interface AltarLightSource {
  x: number;
  y: number;
  /** 0~1，火焰明灭与蜡体余量 */
  intensity: number;
}

/** 光照层复用的案体几何 */
interface AltarTableGeometry {
  u: number;
  halfW: number;
  depth: number;
  frontThickness: number;
  baseTopY: number;
  baseBottomY: number;
  leftLegX: number;
  rightLegX: number;
  legW: number;
  backLeftLegX: number;
  backRightLegX: number;
  backLegW: number;
  backLegTopY: number;
  backLegBottomY: number;
  apronX: number;
  apronW: number;
  apronY: number;
  apronH: number;
  tlX: number;
  tlY: number;
  trX: number;
  trY: number;
}

/**
 * 竖长构件（左右腿足、后腿）的木纹平铺旋转角。
 * 木料纹理沿构件长向走刀，竖立的腿足应旋转 90° 使纹理竖直贯通，
 * 与横向的台面、牙板形成正确的顺纹方向。
 */
const LEG_TILE_ROTATION = Math.PI / 2;

/** 供案本体拖放回调（用于场景内直接拖动调整前后进深位置） */
export interface AltarTableDragCallbacks {
  onDragStart?: () => void;
  /** dy 为相对按下起点的累计纵向位移（屏幕像素，向下为正） */
  onDrag?: (dy: number) => void;
  onDragEnd?: () => void;
}

export interface AltarTableRenderOptions {
  centerX: number;
  tableTopY: number;
  tableWidth?: number;
  tableclothStyle?: TableclothStyle;
  showTableRunner?: boolean;
  showPetals?: boolean;
  /** 台面板料材质（台面 + 厚板封边） */
  topWoodStyle?: TableWoodStyle;
  /** 腿足构架材质（腿、牙板、横枨、后腿） */
  legWoodStyle?: TableWoodStyle;
  /** 地坪水平灭点基线 Y（用于台面透视收缩计算），缺省按 tableTopY - 220 估算 */
  horizonY?: number;
}

export class AltarTableLayer {
  public container: Container = new Container();

  // 0. 案底纵深：透视内收的后腿（隐于阴影）
  private backLegsContainer: Container = new Container();
  private backLeftLegSprite: TilingSprite | null = null;
  private backRightLegSprite: TilingSprite | null = null;

  // 1. 底层：着地接触阴影与案底环境遮蔽
  private shadowGraphics: Graphics = new Graphics();
  /** 足端落影专用柔化模糊（随案体尺度调整强度，避免硬边椭圆） */
  private shadowBlurFilter: BlurFilter = new BlurFilter({ strength: 2.2, quality: 3 });

  // 2. 腿足承重构架容器 (牙板、横枨、左右腿足、构件光影)
  private basePanelsContainer: Container = new Container();
  private apronSprite: TilingSprite | null = null;
  private leftLegSprite: TilingSprite | null = null;
  private rightLegSprite: TilingSprite | null = null;
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

  // 6. 基于光源位置的局部照明层（环境压暗 + 烛火点光源衰减照亮）
  //    独立容器：与案体同位但不继承案体色温 tint
  public lightContainer: Container = new Container();
  private lightLayer: Container = new Container();
  private ambientDimGraphics: Graphics = new Graphics();
  private pointLightGraphics: Graphics = new Graphics();
  /** 点光源高斯模糊：抹去同心圆层带，让光斑成为柔和的光雾 */
  private lightBlurFilter: BlurFilter = new BlurFilter({ strength: 9, quality: 3 });
  private silhouetteMask: Graphics = new Graphics();
  private candleLights: AltarLightSource[] = [];
  private lastLightsKey: string = '';
  /** 案体几何缓存（供光照层独立于 render 重算） */
  private geom: AltarTableGeometry | null = null;

  private currentLighting: LightingSettings | null = null;
  private currentTopWoodStyle: TableWoodStyle = 'walnut';
  private currentLegWoodStyle: TableWoodStyle = 'walnut';
  private unsubscribeMaterial?: () => void;

  // 供案本体拖放（前后进深调整）
  private dragCallbacks: AltarTableDragCallbacks = {};
  private isDragging: boolean = false;
  private dragStartY: number = 0;

  constructor() {
    // 严格按纵深前后层次排列
    this.shadowGraphics.filters = [this.shadowBlurFilter];
    this.container.addChild(this.shadowGraphics);
    this.container.addChild(this.backLegsContainer);
    this.container.addChild(this.basePanelsContainer);
    this.container.addChild(this.frontFaceContainer);
    this.container.addChild(this.topSurfaceContainer);
    this.container.addChild(this.tableclothContainer);

    // 腿足构架立体光影与分界线
    this.basePanelsContainer.addChild(this.panelShadingGraphics);

    // 正立面高光线
    this.frontFaceContainer.addChild(this.frontFaceBevelGraphics);

    // 光照层：独立于案体容器，避免被案体色温 tint 二次削弱，
    // 同时压在案体之上、道具之下，仅作用于案体剪影范围内
    this.pointLightGraphics.blendMode = 'add';
    // 高斯模糊后加色叠加，光斑边界自然弥散
    this.pointLightGraphics.filters = [this.lightBlurFilter];
    this.lightLayer.addChild(this.ambientDimGraphics);
    this.lightLayer.addChild(this.pointLightGraphics);
    // 光照层纯视觉，不参与命中测试，避免遮挡案体拖放
    this.lightLayer.eventMode = 'none';
    this.ambientDimGraphics.eventMode = 'none';
    this.pointLightGraphics.eventMode = 'none';
    this.silhouetteMask.eventMode = 'none';
    this.lightContainer.eventMode = 'none';
    this.lightContainer.addChild(this.lightLayer);
    // 案体剪影遮罩：避免压暗与光斑溢出到墙面与地面
    // （Pixi v8 内部以 includeInBuild=false 处理 mask 自身，不可设 renderable=false）
    this.lightContainer.addChild(this.silhouetteMask);
    this.lightLayer.mask = this.silhouetteMask;

    // 上台面遮罩与渐变
    this.topSurfaceContainer.mask = this.topSurfaceMask;
    this.container.addChild(this.topSurfaceMask);
    this.topSurfaceContainer.addChild(this.topSurfaceShading);

    // 桌布精灵
    this.tableclothSprite.visible = false;
    this.tableclothContainer.addChild(this.tableclothSprite);

    // 订阅材质动态加载，任一部位材质就绪即热更新
    this.unsubscribeMaterial = TableMaterial.getInstance().onUpdate(() => {
      this.applyWoodTexture();
    });

    // 供案本体可直接在场景中拖放以调整前后进深位置
    this.container.eventMode = 'static';
    this.container.cursor = 'grab';
    this.container.on('pointerdown', (e) => {
      if (!this.dragCallbacks.onDragStart) return;
      e.stopPropagation();
      this.isDragging = true;
      this.dragStartY = e.global.y;
      this.container.cursor = 'grabbing';
      this.dragCallbacks.onDragStart();
    });
    this.container.on('globalpointermove', (e) => {
      if (!this.isDragging) return;
      this.dragCallbacks.onDrag?.(e.global.y - this.dragStartY);
    });
    const endDrag = () => {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.container.cursor = 'grab';
      this.dragCallbacks.onDragEnd?.();
    };
    this.container.on('pointerup', endDrag);
    this.container.on('pointerupoutside', endDrag);
    this.container.on('pointercancel', endDrag);
  }

  /**
   * 注册供案本体拖放回调（传空对象即关闭拖放）
   */
  public setDragCallbacks(callbacks: AltarTableDragCallbacks): void {
    this.dragCallbacks = callbacks;
  }

  /**
   * 应用当前选中的实木贴图：台面与腿足构架各自独立取材
   */
  private applyWoodTexture(): void {
    const material = TableMaterial.getInstance();
    const topTex = material.getWoodTexture(this.currentTopWoodStyle);
    const legTex = material.getWoodTexture(this.currentLegWoodStyle);

    const topSprites = [this.topSurfaceSprite, this.frontFaceSprite];
    const legSprites = [
      this.apronSprite,
      this.leftLegSprite,
      this.rightLegSprite,
      this.backLeftLegSprite,
      this.backRightLegSprite,
    ];

    for (const s of topSprites) {
      if (s && topTex && topTex.source && topTex.source.width > 1 && s.texture !== topTex) {
        s.texture = topTex;
      }
    }
    for (const s of legSprites) {
      if (s && legTex && legTex.source && legTex.source.width > 1 && s.texture !== legTex) {
        s.texture = legTex;
      }
    }
  }

  /**
   * 设定台面实木材质风格
   */
  public setWoodStyle(style: TableWoodStyle): void {
    this.currentTopWoodStyle = style;
    TableMaterial.getInstance().setStyle(style);
    this.applyWoodTexture();
  }

  /**
   * 设定腿足构架实木材质风格
   */
  public setLegWoodStyle(style: TableWoodStyle): void {
    this.currentLegWoodStyle = style;
    this.applyWoodTexture();
  }

  /**
   * 根据全局灯光调节木质色温与明暗
   */
  public setLighting(lighting: LightingSettings): void {
    this.currentLighting = lighting;
    const tint = TableMaterial.getInstance().calculateTint(lighting);
    this.container.tint = tint;
    this.renderLighting();
  }

  /**
   * 烛火在照明中的主导权重：熄日照时全靠烛火，夜色次之，明亮日光下不参与。
   */
  private getCandleInfluence(): number {
    const l = this.currentLighting;
    if (!l || !l.masterOn) return 1;
    if (l.timeOfDay === 'night') return 0.5;
    if (l.timeOfDay === 'sunset') return 0.22;
    return 0;
  }

  /**
   * 接入场景真实点光源（烛火火苗位置，舞台全局坐标）。
   * 光照层据此按距离衰减照亮案体，而非整体统一调亮。
   */
  public setCandleLights(lights: AltarLightSource[]): void {
    const key = `${this.lightContainer.x.toFixed(1)}|${this.lightContainer.y.toFixed(1)}|${lights
      .map((l) => `${l.x.toFixed(1)},${l.y.toFixed(1)},${l.intensity.toFixed(2)}`)
      .join(';')}`;
    if (key === this.lastLightsKey) return;
    this.lastLightsKey = key;
    this.candleLights = lights;
    this.renderLighting();
  }

  /**
   * 按光源位置重算案体照明：
   * 1. 环境光压暗层：整案沉入暗部（受案体剪影遮罩约束，不污染墙地）；
   * 2. 点光源加色层：每盏烛火以自身位置为中心照亮，按距离平方反比衰减，
   *    近火处暖亮、远火处幽微，符合真实光照分布。
   */
  public renderLighting(): void {
    const g = this.geom;
    if (!g) return;

    this.silhouetteMask.clear();
    this.ambientDimGraphics.clear();
    this.pointLightGraphics.clear();

    const influence = this.getCandleInfluence();
    if (influence <= 0.01) return;

    // 案体剪影：台面梯形 + 厚板立面 + 牙板 + 前后四条腿足
    this.silhouetteMask
      .poly([g.tlX, g.tlY, g.trX, g.trY, g.halfW, 0, -g.halfW, 0])
      .fill({ color: 0xffffff })
      .rect(-g.halfW, 0, g.halfW * 2, g.frontThickness)
      .fill({ color: 0xffffff })
      .rect(g.apronX, g.apronY, g.apronW, g.apronH)
      .fill({ color: 0xffffff })
      .rect(g.leftLegX, g.baseTopY, g.legW, g.baseBottomY - g.baseTopY)
      .fill({ color: 0xffffff })
      .rect(g.rightLegX, g.baseTopY, g.legW, g.baseBottomY - g.baseTopY)
      .fill({ color: 0xffffff })
      .rect(g.backLeftLegX, g.backLegTopY, g.backLegW, g.backLegBottomY - g.backLegTopY)
      .fill({ color: 0xffffff })
      .rect(g.backRightLegX, g.backLegTopY, g.backLegW, g.backLegBottomY - g.backLegTopY)
      .fill({ color: 0xffffff });

    // 1) 环境压暗：无直射天光时的基础暗部
    const top = g.tlY - 2;
    const bottom = g.baseBottomY + 2;
    // 压暗适度收敛，交由点光源表现明暗层次，避免暗部生硬
    this.ambientDimGraphics
      .rect(-g.halfW - 2, top, g.halfW * 2 + 4, bottom - top)
      .fill({ color: 0x050301, alpha: 0.54 * influence });

    // 2) 烛火点光源：以火苗为中心向外衰减（宽域余晖 + 蜡池近核）
    //    模糊会摊薄峰值，故强度取柔和值，保证近火处是暖雾而非硬光斑
    const u = g.u;
    this.lightBlurFilter.strength = Math.max(6, 9 * u);
    for (const light of this.candleLights) {
      if (light.intensity <= 0.01) continue;
      // 舞台全局坐标 → 光照层局部坐标
      const p = this.lightContainer.toLocal({ x: light.x, y: light.y });
      this.drawPointLight(this.pointLightGraphics, p.x, p.y, 222 * u, 0.27 * light.intensity * influence);
      this.drawPointLight(this.pointLightGraphics, p.x, p.y, 96 * u, 0.2 * light.intensity * influence);
    }
  }

  /**
   * 绘制单盏点光源的衰减光锥截面（加色混合，多层同心圆逼近平方反比衰减）
   */
  private drawPointLight(g: Graphics, x: number, y: number, radius: number, peak: number): void {
    if (peak <= 0.002 || radius <= 0) return;
    const layers = 6;
    for (let i = layers; i >= 1; i--) {
      const t = i / layers;
      const falloff = Math.pow(1 - t + 1 / layers, 2.2);
      g.circle(x, y, radius * t).fill({ color: 0xffb057, alpha: peak * falloff * 0.32 });
    }
  }

  /**
   * 渲染明式条案形制实木供案
   */
  public render(options: AltarTableRenderOptions): void {
    const {
      centerX,
      tableTopY,
      tableWidth = 620,
      tableclothStyle = 'autumn_gold',
      showTableRunner = false,
      showPetals = false,
      topWoodStyle,
      legWoodStyle,
      horizonY,
    } = options;

    let woodStyleChanged = false;
    if (topWoodStyle && topWoodStyle !== this.currentTopWoodStyle) {
      this.currentTopWoodStyle = topWoodStyle;
      woodStyleChanged = true;
    }
    if (legWoodStyle && legWoodStyle !== this.currentLegWoodStyle) {
      this.currentLegWoodStyle = legWoodStyle;
      woodStyleChanged = true;
    }
    const material = TableMaterial.getInstance();
    // 同步材质系统主风格，保证贴图异步加载就绪后也能热更新到位
    if (woodStyleChanged) material.setStyle(this.currentTopWoodStyle);
    const woodTexture = material.getWoodTexture(this.currentTopWoodStyle);
    const legWoodTexture = material.getWoodTexture(this.currentLegWoodStyle);

    // ── 明式条案几何规范（u 为经典设计稿换算单位） ──
    const u = tableWidth / 560;
    const halfW = tableWidth * 0.5;

    // 1. 上台面板：进深 54u，后沿内缩量按地坪灭点收敛关系推算。
    //    透视几何：前沿距灭点 eyeDist，台面屏幕进深 depth，
    //    精确收敛内缩 = halfW * depth / eyeDist；取 0.45 阻尼避免视觉过冲。
    const depth = 54 * u;
    const eyeDist = Math.max(90, tableTopY - (horizonY ?? tableTopY - 220));
    const inset = Math.min(halfW * 0.3, ((halfW * depth) / eyeDist) * 0.45);

    // 2. 台面正前料厚立面
    const frontThickness = 22.5 * u;

    // 3. 落地基准：与布局系统 tableHangingHeight (96/560) 精确一致
    const baseTopY = frontThickness;
    const baseBottomY = tableWidth * (96 / 560);

    // 4. 腿足构架（腿间通透，不做整板封闭）
    const legW = 32 * u;          // 腿足宽度（挺拔修长）
    const legInset = 46 * u;      // 腿足自案端内收距离（肩头舒展）
    const leftLegX = -halfW + legInset;
    const rightLegX = halfW - legInset - legW;

    // 牙板：与腿足同面衔接，横贯腿间
    const apronX = leftLegX + legW - 2 * u;
    const apronW = rightLegX + 2 * u - apronX;
    const apronY = baseTopY + 2 * u;
    const apronH = 24 * u;

    // 后腿：透视内收、足位略升，处于阴影中
    const backLegW = 26 * u;
    const backLegInward = 20 * u;
    const backLeftLegX = leftLegX + backLegInward;
    const backRightLegX = rightLegX + legW - backLegW - backLegInward;
    const backLegTopY = baseTopY + apronH;
    const backLegBottomY = baseBottomY - 5 * u;

    // 容器基点置于 (centerX, tableTopY)
    this.container.x = centerX;
    this.container.y = tableTopY;
    // 光照层与案体严格同位（光斑坐标以案体局部坐标计算）
    this.lightContainer.x = centerX;
    this.lightContainer.y = tableTopY;

    // 供案本体命中区域：台面 + 正立面 + 腿足构架（供场景内直接拖放调整进深）
    this.container.hitArea = new Rectangle(
      -halfW,
      -depth - 6 * u,
      tableWidth,
      depth + baseBottomY + 12 * u
    );

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

    // 缓存案体几何，供光照层按光源位置独立重算
    this.geom = {
      u,
      halfW,
      depth,
      frontThickness,
      baseTopY,
      baseBottomY,
      leftLegX,
      rightLegX,
      legW,
      backLeftLegX,
      backRightLegX,
      backLegW,
      backLegTopY,
      backLegBottomY,
      apronX,
      apronW,
      apronY,
      apronH,
      tlX,
      tlY,
      trX,
      trY,
    };

    if (!this.topSurfaceSprite) {
      this.topSurfaceSprite = new TilingSprite({
        texture: woodTexture,
        width: tableWidth + 10,
        height: depth + 10,
      });
      this.topSurfaceContainer.addChildAt(this.topSurfaceSprite, 0);
    }
    this.topSurfaceSprite.x = -halfW;
    this.topSurfaceSprite.y = -depth;
    this.topSurfaceSprite.width = tableWidth;
    this.topSurfaceSprite.height = depth;
    this.topSurfaceSprite.tileScale.set(0.62, 0.62);

    // 台面板面光影
    this.topSurfaceShading.clear();
    // 远端柔和景深遮蔽（轻盈，不压暗整体，随透视渐深）
    this.topSurfaceShading.rect(-halfW, -depth, tableWidth, depth * 0.45).fill({
      color: 0x1a0d05,
      alpha: 0.16,
    });
    this.topSurfaceShading.rect(-halfW, -depth, tableWidth, depth * 0.22).fill({
      color: 0x1a0d05,
      alpha: 0.1,
    });
    // 前缘天光漫反射微高光
    this.topSurfaceShading.rect(-halfW, -depth * 0.32, tableWidth, depth * 0.32).fill({
      color: 0xfff3e2,
      alpha: 0.05,
    });
    // 左右端面斜沿暗边（表现台面板料厚度与端头截面）
    this.topSurfaceShading
      .poly([tlX, tlY, blX, blY, blX + 4.5 * u, blY, tlX + 4.5 * u, tlY])
      .fill({ color: 0x2a170a, alpha: 0.32 });
    this.topSurfaceShading
      .poly([trX, trY, brX, brY, brX - 4.5 * u, brY, trX - 4.5 * u, trY])
      .fill({ color: 0x2a170a, alpha: 0.32 });
    // 梯形内沿微倒角内轮廓高光线（柔化，仅作极轻的转折提示）
    this.topSurfaceShading
      .poly([tlX + 1.5, tlY + 1.5, trX - 1.5, trY + 1.5, brX - 1.5, brY - 1, blX + 1.5, blY - 1])
      .stroke({ color: 0xe9d4b9, width: 0.7, alpha: 0.18 });
    // 后沿与背景分界拼缝（柔化）
    this.topSurfaceShading
      .moveTo(tlX, tlY)
      .lineTo(trX, trY)
      .stroke({ color: 0x241206, width: 0.8, alpha: 0.28 });

    // ──────────────────────────────────────────
    // 2. 渲染正前面台面厚度立面 (Front Edge Slab)
    // ──────────────────────────────────────────
    if (!this.frontFaceSprite) {
      this.frontFaceSprite = new TilingSprite({
        texture: woodTexture,
        width: tableWidth,
        height: frontThickness,
      });
      this.frontFaceContainer.addChildAt(this.frontFaceSprite, 0);
    }
    this.frontFaceSprite.x = -halfW;
    this.frontFaceSprite.y = 0;
    this.frontFaceSprite.width = tableWidth;
    this.frontFaceSprite.height = frontThickness;
    this.frontFaceSprite.tileScale.set(0.62, 0.62);
    // 正立面微温润受光
    this.frontFaceSprite.tint = 0xf2e2cf;

    // 正前面微倒角高光与底口阴影槽
    this.frontFaceBevelGraphics.clear();
    // 顶沿天光倒角高光：由内向外递弱的多层柔光，避免生硬亮线
    this.frontFaceBevelGraphics
      .moveTo(-halfW, 0.6)
      .lineTo(halfW, 0.6)
      .stroke({ color: 0xf3ddc2, width: 0.9, alpha: 0.3 });
    this.frontFaceBevelGraphics
      .moveTo(-halfW + 3 * u, 1.6)
      .lineTo(halfW - 3 * u, 1.6)
      .stroke({ color: 0xecd8bc, width: 0.7, alpha: 0.15 });
    // 下沿转角拼缝阴影线（略柔）
    this.frontFaceBevelGraphics
      .moveTo(-halfW, frontThickness - 0.5)
      .lineTo(halfW, frontThickness - 0.5)
      .stroke({ color: 0x1b0e06, width: 1.2, alpha: 0.7 });

    // ──────────────────────────────────────────
    // 3. 渲染透视后腿 (Back Legs, 沉于阴影)
    // ──────────────────────────────────────────
    if (!this.backLeftLegSprite) {
      this.backLeftLegSprite = new TilingSprite({
        texture: legWoodTexture,
        width: backLegW,
        height: backLegBottomY - backLegTopY,
        tileRotation: LEG_TILE_ROTATION,
      });
      this.backLegsContainer.addChild(this.backLeftLegSprite);
    }
    this.backLeftLegSprite.x = backLeftLegX;
    this.backLeftLegSprite.y = backLegTopY;
    this.backLeftLegSprite.width = backLegW;
    this.backLeftLegSprite.height = backLegBottomY - backLegTopY;
    // 竖长构件木纹走向随构件旋转 90°，缩放轴同步互换
    this.backLeftLegSprite.tileRotation = LEG_TILE_ROTATION;
    this.backLeftLegSprite.tileScale.set(0.55, 0.4);
    this.backLeftLegSprite.tint = 0x7d5a3a;

    if (!this.backRightLegSprite) {
      this.backRightLegSprite = new TilingSprite({
        texture: legWoodTexture,
        width: backLegW,
        height: backLegBottomY - backLegTopY,
        tileRotation: LEG_TILE_ROTATION,
      });
      this.backLegsContainer.addChild(this.backRightLegSprite);
    }
    this.backRightLegSprite.x = backRightLegX;
    this.backRightLegSprite.y = backLegTopY;
    this.backRightLegSprite.width = backLegW;
    this.backRightLegSprite.height = backLegBottomY - backLegTopY;
    this.backRightLegSprite.tileRotation = LEG_TILE_ROTATION;
    this.backRightLegSprite.tileScale.set(0.55, 0.4);
    this.backRightLegSprite.tint = 0x7d5a3a;

    // ──────────────────────────────────────────
    // 4. 渲染腿足承重构架 (Leg & Apron Frame)
    // ──────────────────────────────────────────

    // 4.2 大边牙板 (Apron，与腿足同面)
    if (!this.apronSprite) {
      this.apronSprite = new TilingSprite({
        texture: legWoodTexture,
        width: apronW,
        height: apronH,
      });
      this.basePanelsContainer.addChildAt(this.apronSprite, 0);
    }
    this.apronSprite.x = apronX;
    this.apronSprite.y = apronY;
    this.apronSprite.width = apronW;
    this.apronSprite.height = apronH;
    this.apronSprite.tileScale.set(0.58, 0.55);
    this.apronSprite.tint = 0xd2b291;

    // 4.3 左承重腿足 (Left Leg)
    if (!this.leftLegSprite) {
      this.leftLegSprite = new TilingSprite({
        texture: legWoodTexture,
        width: legW,
        height: baseBottomY - baseTopY,
        tileRotation: LEG_TILE_ROTATION,
      });
      this.basePanelsContainer.addChild(this.leftLegSprite);
    }
    this.leftLegSprite.x = leftLegX;
    this.leftLegSprite.y = baseTopY;
    this.leftLegSprite.width = legW;
    this.leftLegSprite.height = baseBottomY - baseTopY;
    this.leftLegSprite.tileRotation = LEG_TILE_ROTATION;
    this.leftLegSprite.tileScale.set(0.62, 0.42);
    this.leftLegSprite.tint = 0xdcbf9f;

    // 4.4 右承重腿足 (Right Leg)
    if (!this.rightLegSprite) {
      this.rightLegSprite = new TilingSprite({
        texture: legWoodTexture,
        width: legW,
        height: baseBottomY - baseTopY,
        tileRotation: LEG_TILE_ROTATION,
      });
      this.basePanelsContainer.addChild(this.rightLegSprite);
    }
    this.rightLegSprite.x = rightLegX;
    this.rightLegSprite.y = baseTopY;
    this.rightLegSprite.width = legW;
    this.rightLegSprite.height = baseBottomY - baseTopY;
    this.rightLegSprite.tileRotation = LEG_TILE_ROTATION;
    this.rightLegSprite.tileScale.set(0.62, 0.42);
    this.rightLegSprite.tint = 0xdcbf9f;

    // 4.5 构件立体光影与拼板分界
    this.panelShadingGraphics.clear();

    // 台面下沿横贯落影（压出牙板与腿足顶口的深邃层次）
    this.panelShadingGraphics
      .rect(leftLegX, baseTopY, rightLegX + legW - leftLegX, 6 * u)
      .fill({ color: 0x140a04, alpha: 0.55 });

    // 牙板下沿收边拼缝
    this.panelShadingGraphics
      .moveTo(apronX, apronY + apronH)
      .lineTo(apronX + apronW, apronY + apronH)
      .stroke({ color: 0x1c0f07, width: 1.3, alpha: 0.8 });

    // 腿足与牙板拼装分界缝（表现榫卯拼装）
    this.panelShadingGraphics
      .moveTo(leftLegX + legW + 0.5, apronY)
      .lineTo(leftLegX + legW + 0.5, apronY + apronH)
      .stroke({ color: 0x1a0d06, width: 1.1, alpha: 0.75 });
    this.panelShadingGraphics
      .moveTo(rightLegX - 0.5, apronY)
      .lineTo(rightLegX - 0.5, apronY + apronH)
      .stroke({ color: 0x1a0d06, width: 1.1, alpha: 0.75 });

    // 左腿外侧立体暗边 + 内侧受光棱线（圆料感）
    this.panelShadingGraphics.rect(leftLegX, baseTopY, 4 * u, baseBottomY - baseTopY).fill({
      color: 0x1c0f07,
      alpha: 0.35,
    });
    this.panelShadingGraphics
      .moveTo(leftLegX + legW - 2.5 * u, baseTopY)
      .lineTo(leftLegX + legW - 2.5 * u, baseBottomY)
      .stroke({ color: 0xffeedc, width: 1, alpha: 0.32 });

    // 右腿外侧立体暗边 + 内侧受光棱线
    this.panelShadingGraphics.rect(rightLegX + legW - 4 * u, baseTopY, 4 * u, baseBottomY - baseTopY).fill({
      color: 0x1c0f07,
      alpha: 0.35,
    });
    this.panelShadingGraphics
      .moveTo(rightLegX + 2.5 * u, baseTopY)
      .lineTo(rightLegX + 2.5 * u, baseBottomY)
      .stroke({ color: 0xffeedc, width: 1, alpha: 0.32 });

    // 腿足足端收边暗带（接地沉稳）
    this.panelShadingGraphics.rect(leftLegX, baseBottomY - 4 * u, legW, 4 * u).fill({
      color: 0x1a0d06,
      alpha: 0.4,
    });
    this.panelShadingGraphics.rect(rightLegX, baseBottomY - 4 * u, legW, 4 * u).fill({
      color: 0x1a0d06,
      alpha: 0.4,
    });

    // ──────────────────────────────────────────
    // 5. 渲染着地接触与案底环境遮蔽阴影 (Floor Shadows)
    //    天光自前上方投射：每侧前足有最实的接触影，落影向后拖出，
    //    后足有略淡略窄的接触影与落影尾部相融，四足均明确落地。
    // ──────────────────────────────────────────
    // 柔化强度随案体尺度等比缩放，保证不同桌宽下虚化程度一致
    this.shadowBlurFilter.strength = Math.max(1.6, 2.2 * u);
    this.shadowGraphics.clear();

    const drawSharedFootShadow = (frontFootX: number, backFootX: number) => {
      // 视觉透视：天光自前上方投射，落影向后（朝后腿方向）延展。
      // 1) 落影尾部：先画，从足端向后腿方向拖出并覆盖后足，随距离渐淡
      const tailCx = (frontFootX + backFootX) / 2 + 5 * u;
      const tailRx = (Math.abs(frontFootX - backFootX) + legW * 0.5 + backLegW * 0.5) / 2 + 8 * u;
      this.shadowGraphics.ellipse(tailCx, baseBottomY - 1, tailRx, 3.5).fill({
        color: 0x140803,
        alpha: 0.2,
      });
      // 2) 后足接触阴影：足位因透视上收 5u，略窄略淡于前足，确保后腿明确落地
      this.shadowGraphics.ellipse(backFootX, baseBottomY - 4 * u, backLegW * 0.72, 3.2).fill({
        color: 0x140803,
        alpha: 0.38,
      });
      // 3) 主接触阴影：贴前足端，略偏后，最实
      this.shadowGraphics.ellipse(frontFootX + 4 * u, baseBottomY + 1, legW * 0.85, 4.5).fill({
        color: 0x140803,
        alpha: 0.46,
      });
      // 4) 足底压实微核（模糊后仍保留接地实感）
      this.shadowGraphics.ellipse(frontFootX + 3 * u, baseBottomY + 1.5, legW * 0.45, 2.4).fill({
        color: 0x120702,
        alpha: 0.26,
      });
    };
    // 左侧前足 + 后足阴影组
    drawSharedFootShadow(leftLegX + legW * 0.5, backLeftLegX + backLegW * 0.5);
    // 右侧前足 + 后足阴影组
    drawSharedFootShadow(rightLegX + legW * 0.5, backRightLegX + backLegW * 0.5);

    // 案底大面积开阔环境光遮蔽（AO）柔和落影（上缘覆盖后足底，收敛宽度避免贯穿横带）
    this.shadowGraphics.ellipse(0, baseBottomY + 3, halfW * 0.72, 9).fill({
      color: 0x140803,
      alpha: 0.24,
    });
    // 案前浅淡前投落影（增强接地感）
    this.shadowGraphics.ellipse(0, baseBottomY + 12, halfW * 0.6, 4.5).fill({
      color: 0x140803,
      alpha: 0.15,
    });

    // ──────────────────────────────────────────
    // 6. 渲染可选装饰桌布 (仅当开启时呈现)
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

    // 材质热更新：切换木材后即时替换台面与腿足构架贴图（贴图异步就绪时由订阅回调兜底）
    this.applyWoodTexture();

    // 保持当前灯光与光源照明生效
    if (this.currentLighting) {
      this.setLighting(this.currentLighting);
    } else {
      this.renderLighting();
    }
  }

  public destroy(): void {
    this.unsubscribeMaterial?.();
    this.topSurfaceMask.destroy();
    this.lightContainer.destroy({ children: true });
    this.container.destroy({ children: true });
  }
}
