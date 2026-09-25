/**
 * @file MemorialPortraitLayer.ts
 * @description 纪念遗像牌位层（PixiJS 纯 TS 实现）。
 *
 * 取代原先浮在画布之上的 DOM 版 MemorialPortrait：
 * - 光晕、金环缠枝、圆形遗像、悬停遮罩、堂号与题名全部进入 Pixi 场景坐标系，
 *   与墙身、地坪、供案共用同一套布局基准，不再靠 CSS 百分比各自为政；
 * - 挂在 portraitLayer 上（视差系数 0.35，介于背景墙 0.25 与地坪 0.45 之间），
 *   鼠标微动时与墙面同向轻微错位，纵深关系成立；
 * - 由于位于 lightsLayer（丁达尔光束、浮尘）之下，光束的加色混合会真正照亮相框，
 *   不再像 DOM 版那样只能靠自身一层 CSS 径向渐变"假装"发光。
 *
 * 几何沿用旧 DOM 的尺度：金环 128/144px（移动端/桌面），遗像为金环的 0.75 / 0.778，
 * 题名 20/24px、副题 11/12px，保证迁移前后构图一致。
 */
import { Container, Graphics, Rectangle, Sprite, Text, Texture } from 'pixi.js';
import { MemorialInfo, TimeOfDay, WallBackgroundStyle } from '../../types';
import { getFloorTopY } from './FloorLayer';
import { getWallSpec } from '../scene/walls/BaseWall';

/** 金环 SVG 原 viewBox 尺寸——所有缠枝纹顶点均以此坐标系定义 */
const RING_VIEWBOX = 200;
const RING_TEX_SIZE = 512;

/** 移动端断点：与旧版 sm: 断点（640px）一致 */
const COMPACT_BREAKPOINT = 640;

/** 加载失败时的兜底像容 */
const FALLBACK_PHOTO_URL =
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80';

/** 金环转一圈的秒数（对应旧版 animate-[spin_120s_linear_infinite]） */
const RING_SPIN_SECONDS = 120;

const AURA_TINT: Record<TimeOfDay, number> = { day: 0xffe696, sunset: 0xffcf90, night: 0xf0c878 };

const TITLE_COLOR: Record<TimeOfDay, number> = { day: 0x453225, sunset: 0x453225, night: 0xf3e2c2 };
const SUBTITLE_COLOR: Record<TimeOfDay, number> = { day: 0x7d6856, sunset: 0x7d6856, night: 0xd8c3a1 };

export interface StageInsets {
  /** 画布顶缘到舞台区顶缘的距离（顶栏高度） */
  top: number;
  /** 画布底缘到舞台区底缘的距离（底栏高度） */
  bottom: number;
}

let ringTexture: Texture | null = null;
let auraTexture: Texture | null = null;
let innerShadowTexture: Texture | null = null;

/** 烘焙金色缠枝纹金环：与旧 SVG 完全同构（虚线外圈 + 12 瓣曼陀罗 + 内外重圈） */
const bakeRingTexture = (): Texture => {
  if (ringTexture) return ringTexture;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = RING_TEX_SIZE;
  const ctx = canvas.getContext('2d');
  if (!ctx) return Texture.EMPTY;

  const s = RING_TEX_SIZE / RING_VIEWBOX;
  ctx.scale(s, s);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const gold = ctx.createLinearGradient(0, 0, RING_VIEWBOX, RING_VIEWBOX);
  gold.addColorStop(0, '#f5e1a4');
  gold.addColorStop(0.35, '#d8b168');
  gold.addColorStop(0.7, '#efd595');
  gold.addColorStop(1, '#b6893e');
  ctx.strokeStyle = gold;
  ctx.fillStyle = gold;

  // 外圈虚线
  ctx.setLineDash([3, 3]);
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(100, 100, 95, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(100, 100, 91, 0, Math.PI * 2);
  ctx.stroke();

  // 12 瓣缠枝：每瓣含一枚尖叶与两颗金珠，绕心轴每 30° 复制
  const petal = new Path2D('M 100 9 C 94 22, 90 32, 100 42 C 110 32, 106 22, 100 9 Z');
  for (let i = 0; i < 12; i += 1) {
    ctx.save();
    ctx.translate(100, 100);
    ctx.rotate((i * 30 * Math.PI) / 180);
    ctx.translate(-100, -100);
    ctx.lineWidth = 1.2;
    ctx.stroke(petal);
    ctx.beginPath();
    ctx.arc(100, 13, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(100, 30, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(100, 100, 69, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(255, 248, 231, 0.8)';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.arc(100, 100, 66, 0, Math.PI * 2);
  ctx.stroke();

  ringTexture = Texture.from(canvas);
  ringTexture.source.scaleMode = 'linear';
  return ringTexture;
};

/** 像背后的金色光环（加色混合下即为光本身，替代旧版 CSS radial-gradient） */
const bakeAuraTexture = (): Texture => {
  if (auraTexture) return auraTexture;
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const r = size / 2;
    const grad = ctx.createRadialGradient(r, r, 0, r, r, r);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
    grad.addColorStop(0.45, 'rgba(255, 255, 255, 0.2)');
    grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.06)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  auraTexture = Texture.from(canvas);
  auraTexture.source.scaleMode = 'linear';
  return auraTexture;
};

/** 像框内缘投影（旧版 inset 阴影）：透明心 → 边缘沉褐 */
const bakeInnerShadowTexture = (): Texture => {
  if (innerShadowTexture) return innerShadowTexture;
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const r = size / 2;
    const grad = ctx.createRadialGradient(r, r, 0, r, r, r);
    grad.addColorStop(0, 'rgba(140, 100, 50, 0)');
    grad.addColorStop(0.74, 'rgba(140, 100, 50, 0.05)');
    grad.addColorStop(0.9, 'rgba(140, 100, 50, 0.24)');
    grad.addColorStop(1, 'rgba(140, 100, 50, 0.34)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  innerShadowTexture = Texture.from(canvas);
  return innerShadowTexture;
};

/** 只有跨域图片才需要 CORS 声明，同源 / data / blob 加了反而可能被服务端拒绝 */
const needsCors = (url: string): boolean => {
  if (!url || url.startsWith('data:') || url.startsWith('blob:')) return false;
  try {
    return new URL(url, window.location.href).origin !== window.location.origin;
  } catch {
    return false;
  }
};

export class MemorialPortraitLayer {
  public container: Container = new Container();

  /** 悬停缩放与整体位移的载体：children 全部以「相框中心」为原点布局 */
  private root: Container = new Container();

  private auraSprite: Sprite;
  private ringSprite: Sprite;

  /** 遗像组：底衬 + 照片 + 内缘投影 + 悬停遮罩 + 悬停提示 */
  private photoGroup: Container = new Container();
  private photoBackdrop: Graphics = new Graphics();
  private photoSprite: Sprite;
  private photoMask: Graphics = new Graphics();
  private innerShadow: Sprite;
  private hoverVeil: Graphics = new Graphics();
  private hoverCamera: Graphics = new Graphics();
  private hoverLabel!: Text;

  private titleText!: Text;
  private subtitleText!: Text;

  private info: MemorialInfo = { title: '', subtitle: '', photoUrl: '' };
  private sunlightIntensity = 0.6;
  private timeOfDay: TimeOfDay = 'day';

  private ringSize = 144;
  private photoSize = 112;
  private centerX = 0;
  private centerY = 0;
  private titleBaseline = 0;
  private titleBlockHeight = 48;

  private photoUrl = '';
  private photoToken = 0;

  private hoverTarget = 0;
  private hoverCurrent = 0;
  private pressed = false;
  private time = 0;

  private onEdit?: () => void;

  constructor() {
    this.auraSprite = new Sprite(bakeAuraTexture());
    this.auraSprite.anchor.set(0.5);
    // 普通混合：加色会在浅色墙面上直接把相框周边烧成死白（旧 DOM 版也是普通混合的柔光）
    this.auraSprite.blendMode = 'normal';

    this.ringSprite = new Sprite(bakeRingTexture());
    this.ringSprite.anchor.set(0.5);

    this.photoSprite = new Sprite(Texture.EMPTY);
    this.photoSprite.anchor.set(0.5);

    this.innerShadow = new Sprite(bakeInnerShadowTexture());
    this.innerShadow.anchor.set(0.5);

    this.hoverVeil.alpha = 0;
    this.hoverCamera.alpha = 0;

    const textResolution = Math.min(window.devicePixelRatio || 1, 2);
    this.hoverLabel = new Text({
      text: '更换像容',
      style: {
        fontFamily: ['PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'sans-serif'],
        fontSize: 11,
        fill: 0xfef3c7,
        letterSpacing: 1,
      },
      resolution: textResolution,
      anchor: 0.5,
    });

    this.titleText = new Text({
      text: '',
      style: {
        fontFamily: ['Songti SC', 'STSong', 'SimSun', 'Noto Serif CJK SC', 'serif'],
        fontSize: 24,
        fill: TITLE_COLOR.day,
        letterSpacing: 6.7,
        align: 'center',
      },
      resolution: textResolution,
      anchor: 0.5,
    });

    this.subtitleText = new Text({
      text: '',
      style: {
        fontFamily: ['PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'sans-serif'],
        fontSize: 12,
        fill: SUBTITLE_COLOR.day,
        letterSpacing: 1.2,
        align: 'center',
      },
      resolution: textResolution,
      anchor: 0.5,
    });

    // 自下而上：光晕 → 金环 → 遗像（底衬/照片/投影/悬停）→ 题名
    this.root.addChild(this.auraSprite);
    this.root.addChild(this.ringSprite);

    this.photoGroup.addChild(this.photoBackdrop);
    this.photoGroup.addChild(this.photoSprite);
    this.photoGroup.addChild(this.photoMask);
    this.photoGroup.addChild(this.innerShadow);
    this.photoGroup.addChild(this.hoverVeil);
    this.photoGroup.addChild(this.hoverCamera);
    this.photoGroup.addChild(this.hoverLabel);
    this.photoSprite.mask = this.photoMask;
    this.root.addChild(this.photoGroup);

    this.root.addChild(this.titleText);
    this.root.addChild(this.subtitleText);

    this.container.addChild(this.root);
    this.container.eventMode = 'static';
    this.container.cursor = 'pointer';

    this.container.on('pointerover', () => {
      this.hoverTarget = 1;
    });
    this.container.on('pointerout', () => {
      this.hoverTarget = 0;
      this.pressed = false;
    });
    this.container.on('pointerdown', () => {
      this.pressed = true;
    });
    const release = () => {
      this.pressed = false;
    };
    this.container.on('pointerup', release);
    this.container.on('pointerupoutside', release);
    this.container.on('pointertap', () => {
      this.onEdit?.();
    });
  }

  public setCallbacks(callbacks: { onEdit?: () => void }): void {
    this.onEdit = callbacks.onEdit;
  }

  /** 更新堂号 / 题名 / 像容（像容为远程图，异步落地后自动套用） */
  public setInfo(info: MemorialInfo): void {
    if (!info) return;
    this.info = info;
    this.titleText.text = info.title || '';
    this.subtitleText.text = info.subtitle || '';
    this.loadPhoto(info.photoUrl);
  }

  /** 光环强度与时段配色：随日照滑杆与昼夜切换即时生效 */
  public setLighting(sunlightIntensity: number, timeOfDay: TimeOfDay): void {
    this.sunlightIntensity = Number(sunlightIntensity) || 0;
    this.timeOfDay = timeOfDay;
    this.applyLighting();
  }

  /**
   * 按视口重排：纵向基准为「舞台区（顶栏与底栏之间）高度」的 18% / 20%，
   * 与旧版 top-[18%] sm:top-[20%] 完全对齐；并夹在踢脚线之上，绝不压到地坪。
   *
   * 遗像与纪念文字的落位由 BaseWall 规格给出：各风格只需提供偏移量微调数据，
   * 此处统一按「基准位 + 偏移」落位，不再为每个主题各写一套布局。
   */
  public layout(
    width: number,
    height: number,
    insets: StageInsets = { top: 0, bottom: 0 },
    wallStyle: WallBackgroundStyle = 'classic_dawn'
  ): void {
    if (width <= 0 || height <= 0) return;

    const spec = getWallSpec(wallStyle);
    const portrait = spec.portrait ?? {};
    const text = spec.text ?? {};
    const scale = portrait.scale ?? 1;
    const textGap = text.gap ?? 0;

    const compact = width < COMPACT_BREAKPOINT;
    this.ringSize = (compact ? 128 : 144) * scale;
    this.photoSize = this.ringSize * (compact ? 0.75 : 0.778);

    const titleSize = compact ? 20 : 24;
    const subtitleSize = compact ? 11 : 12;
    const ringR = this.ringSize * 0.5;
    const photoR = this.photoSize * 0.5;

    const stageH = Math.max(120, height - insets.top - insets.bottom);
    const floorTop = getFloorTopY(width, height);
    // 题名区总高（题名行 + 间距 + 副题行，间距含风格追加的 gap）
    this.titleBlockHeight = titleSize * 1.35 + 2 + textGap + subtitleSize * 1.35;

    let centerY = insets.top + stageH * (compact ? 0.18 : 0.2) + ringR;
    centerY += portrait.dy ?? 0;
    // 兜底：整组（含题名）不越过踢脚线，短屏也不至于压在地坪上
    centerY = Math.min(centerY, floorTop - ringR - this.titleBlockHeight - 12);
    centerY = Math.max(centerY, ringR + 12);

    this.centerX = width * 0.5 + (portrait.dx ?? 0);
    this.centerY = centerY;
    this.root.position.set(this.centerX, this.centerY);

    // 光晕：略大于金环的柔光圆（旧版为 -inset-4 的圆角矩形，这里取正圆更贴合金环）
    const auraSize = this.ringSize * 1.85;
    this.auraSprite.width = auraSize;
    this.auraSprite.height = auraSize;

    this.ringSprite.width = this.ringSize;
    this.ringSprite.height = this.ringSize;

    // 遗像：圆形遮罩 + 琥珀底衬 + 内缘投影 + 悬停遮罩
    this.photoMask.clear();
    this.photoMask.circle(0, 0, photoR);
    this.photoMask.fill(0xffffff);

    this.photoBackdrop.clear();
    this.photoBackdrop.circle(0, 0, photoR);
    this.photoBackdrop.fill(0xfffbeb);
    this.photoBackdrop.circle(0, 0, photoR);
    this.photoBackdrop.stroke({ width: 1.5, color: 0xfff4d6, alpha: 0.6 });

    this.innerShadow.width = this.photoSize;
    this.innerShadow.height = this.photoSize;

    this.hoverVeil.clear();
    this.hoverVeil.circle(0, 0, photoR);
    this.hoverVeil.fill({ color: 0x000000, alpha: 0.4 });

    // 悬停提示：一枚相机图标 + 「更换像容」
    this.hoverCamera.clear();
    this.hoverCamera.roundRect(-9, -12, 18, 12, 2.5);
    this.hoverCamera.fill(0xfde68a);
    this.hoverCamera.roundRect(-3.5, -15, 7, 3.5, 1);
    this.hoverCamera.fill(0xfde68a);
    this.hoverCamera.circle(0, -6, 3.4);
    this.hoverCamera.fill(0x1f2937);

    this.hoverLabel.style.fontSize = compact ? 10 : 11;
    this.hoverLabel.position.set(0, photoR * 0.42);

    this.applyPhotoCover();

    // 题名 / 副题：置于金环之下
    this.titleText.style.fontSize = titleSize;
    this.titleText.style.letterSpacing = titleSize * 0.28;
    this.subtitleText.style.fontSize = subtitleSize;

    // 纪念文字：基准位（金环下方）之上再叠加风格偏移
    const textX = text.dx ?? 0;
    this.titleBaseline = ringR + 10 + (text.dy ?? 0);
    const titleCenterY = this.titleBaseline + titleSize * 0.675;
    this.titleText.position.set(textX, titleCenterY);
    this.subtitleText.position.set(
      textX,
      titleCenterY + titleSize * 0.675 + 2 + textGap + subtitleSize * 0.675
    );

    // 命中区：金环 + 题名整块（Pixi 坐标系内的矩形，随布局同步）
    this.container.hitArea = new Rectangle(
      this.centerX - ringR,
      this.centerY - ringR,
      this.ringSize,
      this.ringSize + 10 + this.titleBlockHeight + 8
    );

    this.applyLighting();
  }

  /** 逐帧：金环缓转（120s 一圈）、光晕呼吸、悬停与按压的缩放阻尼 */
  public update(delta: number): void {
    this.time += delta / 60;

    this.ringSprite.rotation += ((Math.PI * 2) / RING_SPIN_SECONDS) * (delta / 60);

    const breathe = 1 + Math.sin(this.time * 0.5) * 0.05;
    this.auraSprite.alpha = (0.6 + this.sunlightIntensity * 0.4) * breathe;

    this.hoverCurrent += (this.hoverTarget - this.hoverCurrent) * 0.18;
    const hoverScale = 1 + this.hoverCurrent * 0.02;
    const pressScale = 1 - (this.pressed ? 0.05 : 0);
    const target = hoverScale * pressScale;
    const cur = this.root.scale.x;
    this.root.scale.set(cur + (target - cur) * 0.2);

    this.hoverVeil.alpha = this.hoverCurrent * 0.4;
    this.hoverCamera.alpha = this.hoverCurrent;
    this.hoverLabel.alpha = this.hoverCurrent;
  }

  public destroy(): void {
    this.container.removeAllListeners();
    this.container.destroy({ children: true });
  }

  /** 照片按 object-cover 规则铺满圆形（取较大缩放，多余部分被圆形遮罩裁掉） */
  private applyPhotoCover(): void {
    const tex = this.photoSprite.texture;
    const tw = tex?.width || 0;
    const th = tex?.height || 0;
    if (!tw || !th) return;
    const scale = Math.max(this.photoSize / tw, this.photoSize / th);
    this.photoSprite.width = tw * scale;
    this.photoSprite.height = th * scale;
    this.photoSprite.position.set(0, 0);
  }

  private loadPhoto(url: string): void {
    if (!url || url === this.photoUrl) return;
    this.photoUrl = url;
    const token = ++this.photoToken;

    const apply = (img: HTMLImageElement) => {
      if (token !== this.photoToken) return;
      const tex = Texture.from(img);
      this.photoSprite.texture = tex;
      this.applyPhotoCover();
    };

    const attempt = (target: string, useCors: boolean) => {
      const img = new Image();
      img.referrerPolicy = 'no-referrer';
      if (useCors) img.crossOrigin = 'anonymous';
      img.onload = () => apply(img);
      img.onerror = () => {
        if (token !== this.photoToken) return;
        if (target !== FALLBACK_PHOTO_URL) {
          attempt(FALLBACK_PHOTO_URL, true);
        }
      };
      img.src = target;
    };

    attempt(url, needsCors(url));
  }

  /** 光环配色 + 题名昼夜配色与投影 */
  private applyLighting(): void {
    const isNight = this.timeOfDay === 'night';
    this.auraSprite.tint = AURA_TINT[this.timeOfDay] ?? AURA_TINT.day;
    this.auraSprite.alpha = 0.6 + this.sunlightIntensity * 0.4;

    this.titleText.style.fill = TITLE_COLOR[this.timeOfDay] ?? TITLE_COLOR.day;
    this.subtitleText.style.fill = SUBTITLE_COLOR[this.timeOfDay] ?? SUBTITLE_COLOR.day;

    const shadow = isNight
      ? { color: 0x2b1c10, alpha: 0.55, blur: 3, distance: 1, angle: Math.PI / 2 }
      : { color: 0xfff6e2, alpha: 0.35, blur: 1, distance: 0, angle: Math.PI / 2 };
    this.titleText.style.dropShadow = shadow;
    this.subtitleText.style.dropShadow = {
      ...shadow,
      alpha: isNight ? 0.45 : 0.28,
      blur: isNight ? 2 : 1,
    };
  }
}
