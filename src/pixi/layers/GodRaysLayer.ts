/**
 * @file GodRaysLayer.ts
 * @description 丁达尔晨曦光束层（PixiJS 纯 TS 实现）。
 *
 * 取代原先的 DOM/SVG 版 GodRaysScene：
 * - 光束形态一次性烘焙成 GPU 贴图，运行时只做变换与着色，无 SVG 重排、无 feGaussianBlur；
 * - 以加色混合（add）参与 Pixi 合成，真正与墙、地、供案在同一空间里叠加发光，
 *   不再是 CSS mix-blend-mode 的"整屏贴膜"；
 * - 挂在 lightsLayer 上，随 2.5D 视差（系数 1.25）一同微动，光有纵深。
 *
 * 「叠加态」设计要点：光束只提亮空气，不抢戏。
 * - 强度经过两级收敛（INTENSITY_SCALE + MAX_BEAM_ALPHA），
 *   即便强度滑杆拉满也只是薄纱级提亮，供案、供品、遗像的明暗与彩度不受影响；
 * - 纵向能量在落地前即衰减归零，光落在空中而非糊在器物上；
 * - 每一束都有独立相位：呼吸、摇曳、横向漂移互不同步，避免"整片一起动"的贴纸感。
 *
 * 光束以主题 lightRig.source 为起点，沿场景共享的 sunAngle 倾斜；尾端向地面铺开。
 * 几何仍沿用旧 SVG 的 800×1000 viewBox 坐标，保留原来的柔光形态。
 */
import { Container, Sprite, Texture } from 'pixi.js';
import { LightingSettings, TimeOfDay } from '../../types';

/** 旧 SVG 的 viewBox 尺寸——所有光束顶点均以此坐标系定义 */
const VIEWBOX_W = 800;
const VIEWBOX_H = 1000;

interface BeamSpec {
  /** 顶左 / 顶右 / 底右 / 底左（viewBox 坐标，构成梯形） */
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
  x4: number;
  y4: number;
  /** 该束相对亮度 */
  alpha: number;
}

/**
 * 强度滑杆 → 实际不透明度的总缩放。
 * 光束定位是"空气里的光"，不是"盖在画面上的白纱"，因此取值远低于 1。
 */
const INTENSITY_SCALE = 0.26;
/** 单束不透明度硬上限：多束加色叠加后也不越过此值，杜绝洗白 */
const MAX_BEAM_ALPHA = 0.2;

/** 主束 + 内束 + 左右副束：近光源窄、落地处散开，形成扇面 */
const BEAMS: BeamSpec[] = [
  { x1: 240, y1: -50, x2: 560, y2: -50, x3: 780, y3: 1050, x4: 20, y4: 1050, alpha: 0.5 },
  { x1: 320, y1: 0, x2: 480, y2: 0, x3: 640, y3: 1050, x4: 160, y4: 1050, alpha: 0.42 },
  { x1: 310, y1: 30, x2: 420, y2: 30, x3: 390, y3: 1050, x4: 100, y4: 1050, alpha: 0.34 },
  { x1: 420, y1: 30, x2: 500, y2: 30, x3: 700, y3: 1050, x4: 440, y4: 1050, alpha: 0.3 },
];

/**
 * 纵向能量分布：0 = 光束顶（近光源）→ 1 = 光束尾（消散入空气）。
 * 峰值低、衰减早，光在到达供案高度前已基本散尽，不会糊住器物。
 */
const ENERGY_STOPS: [number, number][] = [
  [0, 0],
  [0.08, 0.3],
  [0.26, 0.66],
  [0.5, 0.38],
  [0.74, 0.14],
  [0.92, 0.03],
  [1, 0],
];

/** 光束与光晕的时段配色（加色混合下即为光的颜色） */
const RAY_TINT: Record<TimeOfDay, number> = { day: 0xfff6da, sunset: 0xffb964, night: 0xebcd9b };
const HAZE_TINT: Record<TimeOfDay, number> = { day: 0xfff0c8, sunset: 0xffaf5a, night: 0xe6c38c };

const TEX_W = 256;
const TEX_H = 512;
const HAZE_TEX_SIZE = 256;

const beamTextureCache = new Map<string, Texture[]>();

/** 烘焙单束：梯形 → 纵向能量渐变 → 横向羽化（代替 SVG 的高斯模糊） */
const bakeBeamTexture = (spec: BeamSpec): Texture => {
  const canvas = document.createElement('canvas');
  canvas.width = TEX_W;
  canvas.height = TEX_H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return Texture.EMPTY;

  const xs = [spec.x1, spec.x2, spec.x3, spec.x4];
  const ys = [spec.y1, spec.y2, spec.y3, spec.y4];
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const spanX = Math.max(1, maxX - minX);
  const spanY = Math.max(1, maxY - minY);

  // viewBox → 贴图归一化坐标
  const px = (x: number) => ((x - minX) / spanX) * TEX_W;
  const py = (y: number) => ((y - minY) / spanY) * TEX_H;

  const gradient = ctx.createLinearGradient(0, 0, 0, TEX_H);
  for (const [offset, alpha] of ENERGY_STOPS) {
    gradient.addColorStop(offset, `rgba(255, 255, 255, ${alpha})`);
  }
  ctx.beginPath();
  ctx.moveTo(px(spec.x1), py(spec.y1));
  ctx.lineTo(px(spec.x2), py(spec.y2));
  ctx.lineTo(px(spec.x3), py(spec.y3));
  ctx.lineTo(px(spec.x4), py(spec.y4));
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  // 横向羽化：把梯形两侧硬边化开，形成柔和光锥（羽化带更宽，边缘不留可辨轮廓）
  ctx.globalCompositeOperation = 'destination-in';
  const feather = ctx.createLinearGradient(0, 0, TEX_W, 0);
  feather.addColorStop(0, 'rgba(0, 0, 0, 0)');
  feather.addColorStop(0.2, 'rgba(0, 0, 0, 0.4)');
  feather.addColorStop(0.34, 'rgba(0, 0, 0, 0.78)');
  feather.addColorStop(0.5, 'rgba(0, 0, 0, 1)');
  feather.addColorStop(0.66, 'rgba(0, 0, 0, 0.78)');
  feather.addColorStop(0.8, 'rgba(0, 0, 0, 0.4)');
  feather.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = feather;
  ctx.fillRect(0, 0, TEX_W, TEX_H);
  ctx.globalCompositeOperation = 'source-over';

  return Texture.from(canvas);
};

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

/** 将光束顶端从默认中轴移到主题光源位置，尾端仍铺向完整地面。 */
const getBeamSpecsForSource = (sourceX: number): BeamSpec[] => {
  const horizontalOffset = (sourceX - 0.5) * VIEWBOX_W;
  const shiftX = (x: number, y: number): number => x + horizontalOffset * clamp01(1 - y / VIEWBOX_H);
  return BEAMS.map((beam) => ({
    ...beam,
    x1: shiftX(beam.x1, beam.y1),
    x2: shiftX(beam.x2, beam.y2),
    x3: shiftX(beam.x3, beam.y3),
    x4: shiftX(beam.x4, beam.y4),
  }));
};

const getBeamTextures = (sourceKey: string, specs: BeamSpec[]): Texture[] => {
  const cached = beamTextureCache.get(sourceKey);
  if (cached) return cached;
  const textures = specs.map(bakeBeamTexture);
  beamTextureCache.set(sourceKey, textures);
  return textures;
};

let hazeTexture: Texture | null = null;

/** 光源处的空气辉光（等同旧版 ambientHaze） */
const getHazeTexture = (): Texture => {
  if (hazeTexture) return hazeTexture;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = HAZE_TEX_SIZE;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const r = HAZE_TEX_SIZE / 2;
    const grad = ctx.createRadialGradient(r, r, 0, r, r, r);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
    grad.addColorStop(0.32, 'rgba(255, 255, 255, 0.22)');
    grad.addColorStop(0.66, 'rgba(255, 255, 255, 0.07)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, HAZE_TEX_SIZE, HAZE_TEX_SIZE);
  }
  hazeTexture = Texture.from(canvas);
  return hazeTexture;
};

/** 单束的布局快照与动画相位：相位错开，各束运动不同步 */
interface BeamRuntime {
  x: number;
  y: number;
  w: number;
  h: number;
  alpha: number;
  phase: number;
}

export class GodRaysLayer {
  public container: Container = new Container();

  /** 光束组：以主题光源位置为轴整体旋转（太阳角），组内为各束精灵 */
  private group: Container = new Container();
  private beamSprites: Sprite[] = [];
  private beamRuntime: BeamRuntime[] = [];
  private hazeSprite!: Sprite;

  private baseAlpha: number = 0;
  private baseRotation: number = 0;
  private hazeBaseAlpha: number = 0;
  private hazeBaseSize: number = 0;
  private pivotX: number = 0;
  private pivotY: number = 0;
  private time: number = 0;
  private beamSourceKey = '';
  private beamSpecs: BeamSpec[] = BEAMS;

  constructor() {
    this.configureBeamSource(0.5);

    this.hazeSprite = new Sprite(getHazeTexture());
    this.hazeSprite.anchor.set(0.5, 0.5);
    this.hazeSprite.blendMode = 'add';
    this.group.addChild(this.hazeSprite);

    this.container.addChild(this.group);
    this.container.visible = false;
  }

  /** 按视口与光照重建光束几何与配色 */
  public render(width: number, height: number, lighting: LightingSettings, source = { x: 0.5, y: 0.12 }): void {
    const enabled = lighting.masterOn && lighting.godRaysEnabled && lighting.godRaysIntensity > 0.02;
    this.container.visible = enabled;
    if (!enabled) return;

    const sourceX = clamp01(source.x);
    const sourceY = clamp01(source.y);
    const sourceKey = sourceX.toFixed(3);
    if (sourceKey !== this.beamSourceKey) this.configureBeamSource(sourceX);

    const sx = width / VIEWBOX_W;
    const sy = height / VIEWBOX_H;
    this.pivotX = sourceX * width;
    this.pivotY = sourceY * height;

    this.group.position.set(this.pivotX, this.pivotY);
    // 太阳角：旧版角度映射保留，负值代表光束向画面左侧倾斜。
    this.baseRotation = (lighting.sunAngle * 0.45 * Math.PI) / 180;
    this.group.rotation = this.baseRotation;

    const tint = RAY_TINT[lighting.timeOfDay] ?? RAY_TINT.day;
    // 两级收敛：滑杆 → 薄纱级透明度，且单束不越过 MAX_BEAM_ALPHA
    this.baseAlpha = Math.min(1, (Number(lighting.godRaysIntensity) || 0) * INTENSITY_SCALE);

    this.beamSpecs.forEach((spec, i) => {
      const sprite = this.beamSprites[i];
      const xs = [spec.x1, spec.x2, spec.x3, spec.x4].map((v) => v * sx);
      const ys = [spec.y1, spec.y2, spec.y3, spec.y4].map((v) => v * sy);
      const minX = Math.min(...xs);
      const minY = Math.min(...ys);
      const w = Math.max(...xs) - minX;
      const h = Math.max(...ys) - minY;
      // 位置相对旋转轴给出，旋转即绕光源摆动
      const runtime = this.beamRuntime[i];
      runtime.x = minX - this.pivotX;
      runtime.y = minY - this.pivotY;
      runtime.w = w;
      runtime.h = h;
      runtime.alpha = Math.min(MAX_BEAM_ALPHA, spec.alpha * this.baseAlpha);

      sprite.position.set(runtime.x, runtime.y);
      sprite.width = w;
      sprite.height = h;
      sprite.tint = tint;
      sprite.alpha = runtime.alpha;
    });

    // 光源辉光：尺度随视口，亮度随强度与时段（夜色收敛）
    this.hazeBaseSize = Math.max(width * 0.64, height * 0.48);
    this.hazeSprite.position.set(0, 0);
    this.hazeSprite.width = this.hazeBaseSize;
    this.hazeSprite.height = this.hazeBaseSize;
    this.hazeSprite.tint = HAZE_TINT[lighting.timeOfDay] ?? HAZE_TINT.day;
    this.hazeBaseAlpha =
      this.baseAlpha *
      (lighting.timeOfDay === 'night' ? 0.24 : lighting.timeOfDay === 'sunset' ? 0.42 : 0.34);
    this.hazeSprite.alpha = this.hazeBaseAlpha;
  }

  private configureBeamSource(sourceX: number): void {
    const key = sourceX.toFixed(3);
    if (key === this.beamSourceKey && this.beamSprites.length) return;
    for (const sprite of this.beamSprites) {
      this.group.removeChild(sprite);
      sprite.destroy();
    }
    this.beamSprites = [];
    this.beamRuntime = [];
    this.beamSpecs = getBeamSpecsForSource(sourceX);
    const textures = getBeamTextures(key, this.beamSpecs);
    this.beamSpecs.forEach((spec, i) => {
      const sprite = new Sprite(textures[i]);
      sprite.anchor.set(0, 0);
      sprite.blendMode = 'add';
      sprite.alpha = spec.alpha;
      this.beamSprites.push(sprite);
      this.beamRuntime.push({ x: 0, y: 0, w: 1, h: 1, alpha: 0, phase: i * 1.7 + 0.4 });
      this.group.addChildAt(sprite, i);
    });
    this.beamSourceKey = key;
  }

  /**
   * 逐帧：多频叠加的呼吸、摇曳与漂移。
   * 各束相位互不相同（BeamRuntime.phase），叠加后不会出现整片同步的"贴纸感"。
   */
  public update(delta: number): void {
    if (!this.container.visible) return;
    this.time += delta * 0.016;
    const t = this.time;

    // 整体呼吸：两个不相称的低频叠加，周期感被打破
    const breathe = 1 + (Math.sin(t * 0.33) * 0.6 + Math.sin(t * 0.13 + 1.1) * 0.4) * 0.12;
    this.container.alpha = Math.max(0, Math.min(1, breathe));

    // 整体摇曳：绕光源的极缓摆动（约 ±2°），光像被空气推着走
    const sway = Math.sin(t * 0.21) * 0.02 + Math.sin(t * 0.085 + 0.7) * 0.014;
    this.group.rotation = this.baseRotation + sway;
    // 横向漂移：日照角度的缓慢推移，幅度仅为视口的极小比例
    const drift = Math.sin(t * 0.09) * 0.008 + Math.sin(t * 0.047 + 2.2) * 0.005;
    this.group.position.set(this.pivotX + this.hazeBaseSize * drift, this.pivotY);

    // 单束：明暗闪烁（如云影掠过）+ 光锥轻微张合
    for (let i = 0; i < this.beamSprites.length; i += 1) {
      const sprite = this.beamSprites[i];
      const rt = this.beamRuntime[i];
      const shimmer =
        0.74 + (Math.sin(t * 0.47 + rt.phase) * 0.62 + Math.sin(t * 0.19 + rt.phase * 2.1) * 0.38) * 0.26;
      sprite.alpha = Math.max(0, Math.min(MAX_BEAM_ALPHA, rt.alpha * shimmer));
      sprite.width = rt.w * (1 + Math.sin(t * 0.29 + rt.phase * 1.3) * 0.05);
      sprite.height = rt.h * (1 + Math.sin(t * 0.17 + rt.phase) * 0.02);
      sprite.x = rt.x + Math.sin(t * 0.11 + rt.phase * 0.7) * 6;
    }

    // 光源辉光：明暗与尺度同步轻微起伏
    const hazePulse = 0.82 + (Math.sin(t * 0.37) * 0.6 + Math.sin(t * 0.11 + 0.4) * 0.4) * 0.18;
    this.hazeSprite.alpha = this.hazeBaseAlpha * hazePulse;
    const hazeSize = this.hazeBaseSize * (1 + Math.sin(t * 0.24) * 0.04);
    this.hazeSprite.width = hazeSize;
    this.hazeSprite.height = hazeSize;
  }

  public destroy(): void {
    this.container.destroy({ children: true });
  }
}
