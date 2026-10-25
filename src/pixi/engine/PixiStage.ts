/**
 * @file PixiStage.ts
 * @description PixiJS v8 核心舞台控制器。
 * 负责场景分层容器管理与视口响应式适配。
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

  public async init(options: PixiStageOptions): Promise<void> {
    if (this.isDestroyed) return;

    const app = new Application();
    await app.init({
      width: Math.max(100, Math.round(options.width)),
      height: Math.max(100, Math.round(options.height)),
      // 1.5 caps high-DPI render targets at 2.25× CSS pixels (instead of 4× at DPR 2).
      resolution: Math.min(window.devicePixelRatio || 1, 1.5),
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
