/**
 * @file PixiStage.ts
 * @description PixiJS v8 核心舞台控制器。
 * 负责 2.5D 视差分层容器管理、视口响应式适配、Ticker 物理时钟与鼠标视差微动。
 * 具备独立 Canvas 创建与 StrictMode 防 context lost 保护。
 */
import { Application, Container } from 'pixi.js';

export interface PixiStageOptions {
  container: HTMLElement;
  width: number;
  height: number;
}

export class PixiStage {
  public app: Application | null = null;
  public isReady: boolean = false;
  private isDestroyed: boolean = false;

  // 2.5D 视差分层容器体系
  public stageContainer: Container = new Container();
  public backgroundLayer: Container = new Container();
  public floorLayer: Container = new Container();
  public portraitLayer: Container = new Container();
  public wallFrontLayer: Container = new Container();
  public tableLayer: Container = new Container();
  /** 蒲团位于桌前、供品下方；席垫在 tableLayer 中绘制于桌体之前。 */
  public groundFrontLayer: Container = new Container();
  public propsLayer: Container = new Container();
  public smokeLayer: Container = new Container();
  public lightsLayer: Container = new Container();

  // 2.5D 视差目标与当前平滑偏移
  private targetParallaxX: number = 0;
  private targetParallaxY: number = 0;
  private currentParallaxX: number = 0;
  private currentParallaxY: number = 0;

  public async init(options: PixiStageOptions): Promise<void> {
    if (this.isDestroyed) return;

    const app = new Application();
    await app.init({
      width: Math.max(100, Math.round(options.width)),
      height: Math.max(100, Math.round(options.height)),
      resolution: Math.min(window.devicePixelRatio || 1, 2.0),
      autoDensity: true,
      antialias: true,
      backgroundAlpha: 0,
      preference: 'webgl',
    });

    if (this.isDestroyed) {
      try {
        app.destroy(true, { children: true });
      } catch {
        // ignore
      }
      return;
    }

    this.app = app;

    // 挂载动态生成的全新 Canvas 至容器中
    app.canvas.style.width = '100%';
    app.canvas.style.height = '100%';
    app.canvas.style.display = 'block';
    app.canvas.style.touchAction = 'none';
    // 禁用移动端长按弹出的图片操作菜单与系统选择
    (app.canvas.style as CSSStyleDeclaration & { WebkitTouchCallout: string }).WebkitTouchCallout = 'none';
    (app.canvas.style as CSSStyleDeclaration & { WebkitUserSelect: string }).WebkitUserSelect = 'none';
    options.container.replaceChildren(app.canvas);

    this.stageContainer = new Container();
    app.stage.addChild(this.stageContainer);

    // 墙纸 → 遗像 → 墙灯 → 地坪/框架 → 席垫 → 供桌 → 蒲团与供品。
    this.stageContainer.addChild(this.backgroundLayer);
    this.stageContainer.addChild(this.portraitLayer);
    this.stageContainer.addChild(this.wallFrontLayer);
    this.stageContainer.addChild(this.floorLayer);
    this.stageContainer.addChild(this.tableLayer);
    this.stageContainer.addChild(this.groundFrontLayer);
    this.stageContainer.addChild(this.propsLayer);
    this.stageContainer.addChild(this.smokeLayer);
    this.stageContainer.addChild(this.lightsLayer);

    // 启动 Ticker 循环（驱动 2.5D 视差阻尼与粒子）
    app.ticker.add(this.update.bind(this));

    this.isReady = true;
  }

  // 响应式尺寸适配
  public resize(width: number, height: number): void {
    if (!this.app || !this.app.renderer) return;
    try {
      this.app.renderer.resize(Math.max(100, Math.round(width)), Math.max(100, Math.round(height)));
    } catch (e) {
      console.warn('PixiStage resize error:', e);
    }
  }

  // 鼠标移动输入，设置视差目标（归一化 -1 到 1）
  public setParallaxInput(normalizedX: number, normalizedY: number): void {
    this.targetParallaxX = normalizedX * 16;
    this.targetParallaxY = normalizedY * 10;
  }

  // 逐帧更新视差层级偏移
  private update(): void {
    this.currentParallaxX += (this.targetParallaxX - this.currentParallaxX) * 0.05;
    this.currentParallaxY += (this.targetParallaxY - this.currentParallaxY) * 0.05;

    // 远景背景层：视差系数 0.25
    this.backgroundLayer.x = this.currentParallaxX * 0.25;
    this.backgroundLayer.y = this.currentParallaxY * 0.25;

    // 遗像牌位层：视差系数 0.35（悬于墙面之前，比墙略"近"）
    this.portraitLayer.x = this.currentParallaxX * 0.35;
    this.portraitLayer.y = this.currentParallaxY * 0.35;

    // 墙面造景与结构附件比遗像略近、仍远于地面。
    this.wallFrontLayer.x = this.currentParallaxX * 0.4;
    this.wallFrontLayer.y = this.currentParallaxY * 0.4;

    // 地面层：视差系数 0.45
    this.floorLayer.x = this.currentParallaxX * 0.45;
    this.floorLayer.y = this.currentParallaxY * 0.45;

    // 供桌层：视差系数 0.75
    this.tableLayer.x = this.currentParallaxX * 0.75;
    this.tableLayer.y = this.currentParallaxY * 0.75;

    // 近景席垫略近于供桌，位于桌脚前，但仍在桌面供品之后。
    this.groundFrontLayer.x = this.currentParallaxX * 0.82;
    this.groundFrontLayer.y = this.currentParallaxY * 0.82;

    // 供品道具层：视差系数 0.95
    this.propsLayer.x = this.currentParallaxX * 0.95;
    this.propsLayer.y = this.currentParallaxY * 0.95;

    // 烟雾与前景光线：视差系数 1.1 / 1.25
    this.smokeLayer.x = this.currentParallaxX * 1.1;
    this.smokeLayer.y = this.currentParallaxY * 1.1;
    this.lightsLayer.x = this.currentParallaxX * 1.25;
    this.lightsLayer.y = this.currentParallaxY * 1.25;
  }

  // 销毁清理
  public destroy(): void {
    this.isDestroyed = true;
    this.isReady = false;
    if (this.app) {
      try {
        if (this.app.canvas && this.app.canvas.parentElement) {
          this.app.canvas.parentElement.removeChild(this.app.canvas);
        }
        this.app.destroy(true, { children: true });
      } catch (e) {
        console.warn('Error destroying PixiStage:', e);
      }
      this.app = null;
    }
  }
}
