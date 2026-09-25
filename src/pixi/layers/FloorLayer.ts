/**
 * @file FloorLayer.ts
 * @description PixiJS 真·透视地坪层。
 *
 * 以 PerspectiveMesh 复刻旧版 DOM/CSS 3D 的投影链：
 *   perspective: 420px / perspective-origin: 50% -15% / rotateX(66deg) scale(1.36, 1.26)
 * 平面 → 屏幕的映射是单应变换（homography），而 PerspectiveMesh 正是"矩形 → 任意四边形"的
 * 单应映射，因此只要把世界矩形的四角用同一套投影公式算出来，纹理的近大远小收敛就是数学精确的；
 * 中间网格顶点由单应变换采样，纵向细分足够密即可消除分片线性误差。
 *
 * 纹理平铺走 GPU：uv 超出 [0,1] + 纹理 repeat 寻址（等价 CSS background-repeat），
 * 并开启 mipmap 保证远处不摩尔纹、近处不糊。
 */
import { ColorMatrixFilter, Container, Graphics, PerspectiveMesh, Sprite, Texture } from 'pixi.js';
import { FloorStyle, LightingSettings, TimeOfDay } from '../../types';
import { TexturePipeline } from '../assets/TexturePipeline';

/** ---- CSS 3D 投影参数（沿用旧版 DOM 实现的取值，保证观感一致） ---- */
const FLOOR_H_BASE = 210; // h-[210px]
const FLOOR_H_SM = 240; // sm:h-[240px]
const TOP_INSET = 16; // top-4
const PERSPECTIVE_D = 420; // perspective: 420px
const PERSPECTIVE_ORIGIN_Y = -0.15; // perspective-origin: 50% -15%
const ROT_X = (66 * Math.PI) / 180; // rotateX(66deg)
const SCALE_X = 1.36; // scale(1.36, 1.26)
const SCALE_Y = 1.26;
const ELEMENT_H_RATIO = 2.6; // h-[260%]

/** 踢脚线（地坪顶缘）的屏幕 y —— 所有层的纵向对齐基准（墙底、案底均以此为锚） */
export const getFloorTopY = (width: number, height: number): number =>
  height - (width >= 640 ? FLOOR_H_SM : FLOOR_H_BASE);

/** 网格细分：横向线性（2 即精确），纵向承担全部透视压缩，需足够密 */
const GRID_X = 4;
const GRID_Y = 64;

/** 各款地坪贴图在元素空间的平铺尺寸（对应 CSS background-size） */
const TILE_SIZE: Record<FloorStyle, { w: number; h: number }> = {
  hinoki_wood: { w: 240, h: 195 },
  walnut_plank: { w: 280, h: 156 },
  herringbone_wood: { w: 280, h: 156 },
  wood_planks: { w: 280, h: 156 },
  zen_tatami: { w: 340, h: 190 },
  marble_tile: { w: 160, h: 160 },
};

const BASE_COLOR: Record<FloorStyle, number> = {
  hinoki_wood: 0x8c5a32,
  walnut_plank: 0x4e3322,
  herringbone_wood: 0x5a2e16,
  wood_planks: 0x5a2e16,
  zen_tatami: 0x4a3b2c,
  marble_tile: 0xd8d3ca,
};

const BASEBOARD: Record<FloorStyle, { color: number; highlight: number }> = {
  hinoki_wood: { color: 0x8c5a32, highlight: 0xe5ab75 },
  walnut_plank: { color: 0x4e3322, highlight: 0x8c6044 },
  herringbone_wood: { color: 0x5a2e16, highlight: 0xa3633d },
  wood_planks: { color: 0x5a2e16, highlight: 0xa3633d },
  zen_tatami: { color: 0x4a3b2c, highlight: 0x8a735c },
  marble_tile: { color: 0xa89884, highlight: 0xffffff },
};

interface Ambiance {
  brightness: number;
  contrast: number;
  saturation: number;
  hue: number;
  tint: { color: number; alpha: number };
  puddle: { color: number; alpha: number };
}

/** 与旧版 CSS filter / 叠色一一对应 */
const AMBIANCE_OFF: Ambiance = {
  brightness: 0.24,
  contrast: 1.18,
  saturation: 0.6,
  hue: 0,
  tint: { color: 0x050403, alpha: 0.75 },
  puddle: { color: 0xffc878, alpha: 0.06 },
};

const AMBIANCE_BY_TIME: Record<TimeOfDay, Ambiance> = {
  day: {
    brightness: 1.03,
    contrast: 1.04,
    saturation: 1.02,
    hue: 0,
    tint: { color: 0xfff8e6, alpha: 0.05 },
    puddle: { color: 0xfff0eb, alpha: 0.65 },
  },
  sunset: {
    brightness: 0.94,
    contrast: 1.12,
    saturation: 1.38,
    hue: 0,
    tint: { color: 0xd8761f, alpha: 0.26 },
    puddle: { color: 0xffc66a, alpha: 0.62 },
  },
  night: {
    brightness: 0.55,
    contrast: 1.08,
    saturation: 0.85,
    hue: 0,
    tint: { color: 0x191009, alpha: 0.32 },
    puddle: { color: 0xffdca8, alpha: 0.2 },
  },
};

type PerspectiveGeometryLike = {
  setCorners(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void;
  buffers: { data: Float32Array; update(): void }[];
  verticesX: number;
  verticesY: number;
};

/** 生成径向柔光遮罩纹理（白色 + alpha 衰减，靠 Sprite.tint 上色） */
const createRadialTexture = (stops: { offset: number; alpha: number }[]): Texture => {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return Texture.WHITE;
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

/** 生成纵向渐变遮罩纹理（stops 按 0~1 归一化） */
const createVerticalGradientTexture = (stops: { offset: number; color: string }[]): Texture => {
  const canvas = document.createElement('canvas');
  canvas.width = 4;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return Texture.WHITE;
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  for (const stop of stops) {
    grad.addColorStop(Math.min(1, Math.max(0, stop.offset)), stop.color);
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 4, 256);
  const tex = Texture.from(canvas);
  tex.source.scaleMode = 'linear';
  return tex;
};

export class FloorLayer {
  public container: Container = new Container();

  private baseGraphics: Graphics = new Graphics();
  private mesh: PerspectiveMesh | null = null;
  private meshKey = '';
  private gradientKey = '';
  private baseUvs: Float32Array | null = null;
  private colorFilter: ColorMatrixFilter = new ColorMatrixFilter();

  private tintGraphics: Graphics = new Graphics();
  private depthGradient: Sprite = new Sprite(Texture.WHITE);
  private puddleSprite: Sprite | null = null;
  private skirtingGraphics: Graphics = new Graphics();
  private contactShadow: Sprite | null = null;

  constructor() {
    this.container.addChild(this.baseGraphics);
    // 透视网格在底色之上
    this.container.addChild(this.depthGradient);
    this.container.addChild(this.tintGraphics);
    this.container.addChild(this.skirtingGraphics);
  }

  public render(
    width: number,
    height: number,
    floorStyle: FloorStyle,
    woodTexture: Texture | null,
    marbleTexture: Texture | null,
    lighting: LightingSettings
  ): void {
    // ---- 1. 几何：复刻 CSS 3D 投影 ----
    const floorH = width >= 640 ? FLOOR_H_SM : FLOOR_H_BASE;
    const containerH = Math.max(40, floorH - TOP_INSET);
    const floorTop = getFloorTopY(width, height);
    // rotateX 后的纵向压缩率与入深速率（元素空间 v → 3D）
    const aRate = SCALE_Y * Math.cos(ROT_X);
    const bRate = SCALE_Y * Math.sin(ROT_X);
    const originY = PERSPECTIVE_ORIGIN_Y * containerH;
    // 使投影落点恰为容器底缘的元素空间纵向坐标（由 Y(v)=C 解出）
    const vMax = (containerH * PERSPECTIVE_D) / (aRate * PERSPECTIVE_D + (containerH - originY) * bRate);

    // 元素空间 (u, v) → 屏幕坐标
    const project = (u: number, v: number): { x: number; y: number } => {
      const s = PERSPECTIVE_D / (PERSPECTIVE_D - bRate * v);
      return {
        x: width / 2 + (u - width / 2) * SCALE_X * s,
        y: floorTop + TOP_INSET + originY + (aRate * v - originY) * s,
      };
    };
    // 屏幕纵坐标 → 元素空间纵向坐标（Y 的反函数，用于把 CSS 渐变还原到屏幕空间）
    const vAtScreenY = (screenY: number): number => {
      const y = screenY - (floorTop + TOP_INSET);
      return (y * PERSPECTIVE_D) / (aRate * PERSPECTIVE_D + (y - originY) * bRate);
    };

    const tl = project(0, 0);
    const tr = project(width, 0);
    const br = project(width, vMax);
    const bl = project(0, vMax);

    // ---- 2. 底色（贴图未就绪时兜底） ----
    this.baseGraphics.clear();
    this.baseGraphics.rect(0, floorTop, width, floorH).fill({ color: BASE_COLOR[floorStyle] ?? 0x8c5a32 });

    // ---- 3. 透视贴图 ----
    const pipeline = TexturePipeline.getInstance();
    const activeTex =
      pipeline.floorTextures[floorStyle] || (floorStyle === 'marble_tile' ? marbleTexture : woodTexture);

    const key = `${Math.round(width)}x${Math.round(height)}|${floorStyle}`;
    if (activeTex && activeTex.source && activeTex.source.width > 1) {
      this.ensureTiling(activeTex);
      if (this.meshKey !== key || !this.mesh) {
        this.rebuildMesh(activeTex, key);
      }
      const mesh = this.mesh;
      if (mesh) {
        const geometry = mesh.geometry as unknown as PerspectiveGeometryLike;
        geometry.setCorners(tl.x, tl.y, tr.x, tr.y, br.x, br.y, bl.x, bl.y);

        const tile = TILE_SIZE[floorStyle] ?? { w: 240, h: 195 };
        const repeatX = width / tile.w;
        const repeatY = vMax / tile.h;
        // CSS background-position: center top —— 水平居中相位，纵向自顶端起铺
        const offsetPx = ((((width - tile.w) / 2) % tile.w) + tile.w) % tile.w;
        const phaseX = -offsetPx / tile.w;
        const uvBuffer = geometry.buffers[1];
        const base = this.baseUvs;
        if (base && uvBuffer) {
          for (let i = 0; i < base.length; i += 2) {
            uvBuffer.data[i] = base[i] * repeatX + phaseX;
            uvBuffer.data[i + 1] = base[i + 1] * repeatY;
          }
          uvBuffer.update();
        }
        mesh.visible = true;
        this.applyAmbianceFilter(lighting);
      }
    } else if (this.mesh) {
      this.mesh.visible = false;
    }

    // ---- 4. 纵深压暗（还原 CSS 两层叠加渐变，按元素空间反解到屏幕） ----
    const elementH = containerH * ELEMENT_H_RATIO;
    const stops: { offset: number; color: string }[] = [];
    const samples = 12;
    for (let i = 0; i <= samples; i++) {
      const t = i / samples; // 屏幕纵向 0（远）→ 1（近）
      const screenY = floorTop + TOP_INSET + containerH * t;
      const v = vAtScreenY(screenY);
      const p = Math.min(1, Math.max(0, v / elementH));
      // CSS: linear-gradient(to bottom, rgba(0,0,0,.35) 0%, rgba(0,0,0,.08) 35%, transparent 65%)
      let alpha = 0;
      if (p <= 0.35) alpha = 0.35 + ((0.08 - 0.35) * p) / 0.35;
      else if (p <= 0.65) alpha = 0.08 * (1 - (p - 0.35) / 0.3);
      // CSS: radial-gradient(ellipse at 50% 100%, transparent 55%, rgba(0,0,0,.22) 100%)
      const radialP = 1 - p; // 元素底部为椭圆中心，可见区位于元素上部
      const radialAlpha = radialP <= 0.55 ? 0 : (0.22 * (radialP - 0.55)) / 0.45;
      const total = 1 - (1 - alpha) * (1 - radialAlpha);
      stops.push({ offset: t, color: `rgba(0, 0, 0, ${total.toFixed(3)})` });
    }
    // 渐变只随几何变化，缓存复用（避免每次重绘都新建纹理）
    const gradientKey = `${Math.round(width)}x${Math.round(height)}`;
    if (this.gradientKey !== gradientKey) {
      const previous = this.depthGradient.texture;
      this.depthGradient.texture = createVerticalGradientTexture(stops);
      if (previous && previous !== Texture.WHITE) previous.destroy(true);
      this.gradientKey = gradientKey;
    }
    this.depthGradient.x = 0;
    this.depthGradient.y = floorTop + TOP_INSET;
    this.depthGradient.width = width;
    this.depthGradient.height = containerH;

    // ---- 5. 时段色调 ----
    const ambiance = lighting.masterOn
      ? AMBIANCE_BY_TIME[lighting.timeOfDay as TimeOfDay] ?? AMBIANCE_BY_TIME.day
      : AMBIANCE_OFF;
    this.tintGraphics.clear();
    this.tintGraphics
      .rect(0, floorTop + TOP_INSET, width, containerH)
      .fill({ color: ambiance.tint.color, alpha: ambiance.tint.alpha });

    // ---- 6. 双层实木踢脚线 ----
    this.skirtingGraphics.clear();
    const board = BASEBOARD[floorStyle] ?? BASEBOARD.hinoki_wood;
    this.skirtingGraphics.rect(0, floorTop, width, 2).fill({ color: board.highlight, alpha: 0.85 });
    this.skirtingGraphics.rect(0, floorTop + 2, width, 10).fill({ color: board.color });
    this.skirtingGraphics.rect(0, floorTop + 2, width, 1).fill({ color: 0x000000, alpha: 0.35 });
    this.skirtingGraphics.rect(0, floorTop + 11, width, 1).fill({ color: 0xffffff, alpha: 0.2 });
    this.skirtingGraphics.rect(0, floorTop + 12, width, 3).fill({ color: 0x000000, alpha: 0.45 });
    this.skirtingGraphics.rect(0, floorTop + 15, width, 3).fill({ color: 0x000000, alpha: 0.18 });
    // 环境同步：踢脚线与地面同受时段氛围影响（叠加同款 tint，避免夜里地板暗了、踢脚线仍是暖亮色）
    this.skirtingGraphics
      .rect(0, floorTop, width, 18)
      .fill({ color: ambiance.tint.color, alpha: ambiance.tint.alpha });

    // ---- 7. 天光光斑与案体接地投影 ----
    const lightFactor = lighting.masterOn ? lighting.sunlightIntensity : 0.08;
    if (lighting.masterOn && lighting.godRaysEnabled) {
      if (!this.puddleSprite) {
        this.puddleSprite = new Sprite(
          createRadialTexture([
            { offset: 0, alpha: 1 },
            { offset: 0.7, alpha: 0 },
          ])
        );
        this.puddleSprite.anchor.set(0.5);
        this.container.addChildAt(this.puddleSprite, this.container.getChildIndex(this.tintGraphics) + 1);
      }
      const pw = Math.min(width * 0.88, 740);
      const ph = 140;
      this.puddleSprite.visible = true;
      this.puddleSprite.texture.source.scaleMode = 'linear';
      this.puddleSprite.tint = ambiance.puddle.color;
      this.puddleSprite.alpha = lightFactor * 0.85 * ambiance.puddle.alpha;
      this.puddleSprite.x = width / 2 + lighting.sunAngle * 3;
      this.puddleSprite.y = floorTop + floorH / 2;
      this.puddleSprite.width = pw;
      this.puddleSprite.height = ph;
    } else if (this.puddleSprite) {
      this.puddleSprite.visible = false;
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

  /** 纹理平铺配置：repeat 寻址 + mipmap（远处不摩尔纹、近处不糊） */
  private ensureTiling(texture: Texture): void {
    const source = texture.source;
    if (source.addressMode !== 'repeat') source.addressMode = 'repeat';
    if (source.scaleMode !== 'linear') source.scaleMode = 'linear';
    if (!source.autoGenerateMipmaps) {
      source.autoGenerateMipmaps = true;
      source.update();
    }
  }

  private rebuildMesh(texture: Texture, key: string): void {
    if (this.mesh) {
      this.container.removeChild(this.mesh);
      this.mesh.destroy();
      this.mesh = null;
    }
    const mesh = new PerspectiveMesh({
      texture,
      verticesX: GRID_X,
      verticesY: GRID_Y,
      x0: 0,
      y0: 0,
      x1: 1,
      y1: 0,
      x2: 1,
      y2: 1,
      x3: 0,
      y3: 1,
    });
    const geometry = mesh.geometry as unknown as PerspectiveGeometryLike;
    this.baseUvs = Float32Array.from(geometry.buffers[1].data);
    mesh.filters = [this.colorFilter];
    // 插在底色之上、纵深渐变之下
    this.container.addChildAt(mesh, 1);
    this.mesh = mesh;
    this.meshKey = key;
  }

  /** 还原 CSS filter: brightness / contrast / saturate / hue-rotate */
  private applyAmbianceFilter(lighting: LightingSettings): void {
    const ambiance = lighting.masterOn
      ? AMBIANCE_BY_TIME[lighting.timeOfDay as TimeOfDay] ?? AMBIANCE_BY_TIME.day
      : AMBIANCE_OFF;
    const filter = this.colorFilter;
    filter.reset();
    filter.brightness(ambiance.brightness, true);
    filter.contrast(ambiance.contrast - 1, true);
    filter.saturate(ambiance.saturation - 1, true);
    if (ambiance.hue !== 0) filter.hue(ambiance.hue, true);
  }

  public destroy(): void {
    this.container.destroy({ children: true });
  }
}
