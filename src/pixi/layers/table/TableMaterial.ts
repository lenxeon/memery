/**
 * @file TableMaterial.ts
 * @description 供案专属自闭环材质系统。
 * 独立封装原木纹理加载、缓存、光影色温及高质量程序化实木兜底，
 * 实现场景元素自治，彻底与全局管道解耦。
 */
import { Texture } from 'pixi.js';
import { TableWoodStyle, LightingSettings } from '../../../types';

export class TableMaterial {
  private static instance: TableMaterial | null = null;

  // 4 款原木材质纹理缓存
  private textures: Record<TableWoodStyle, Texture | null> = {
    white_oak: null,
    huanghuali: null,
    cherry: null,
    walnut: null,
  };

  // 当前主实木纹理
  private primaryTexture: Texture | null = null;
  // 程序化兜底纹理
  private fallbackTexture: Texture | null = null;

  private isInitializing: boolean = false;
  private currentStyle: TableWoodStyle = 'walnut';
  private listeners: Set<(style: TableWoodStyle) => void> = new Set();

  public static getInstance(): TableMaterial {
    if (!TableMaterial.instance) {
      TableMaterial.instance = new TableMaterial();
    }
    return TableMaterial.instance;
  }

  constructor() {
    this.init();
  }

  /**
   * 注册材质就绪或切换监听
   */
  public onUpdate(fn: (style: TableWoodStyle) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private notify(style: TableWoodStyle): void {
    this.listeners.forEach((fn) => {
      try {
        fn(style);
      } catch (err) {
        console.warn('[TableMaterial] Listener error:', err);
      }
    });
  }

  /**
   * 初始化并异步预热 4 款原木高清材质
   */
  public init(): void {
    if (this.isInitializing) return;
    this.isInitializing = true;

    const urls: Record<TableWoodStyle, string> = {
      white_oak: '/textures/wood_white_oak.jpg',
      huanghuali: '/textures/wood_huanghuali.jpg',
      cherry: '/textures/wood_cherry.jpg',
      walnut: '/textures/wood_altar_table.jpg', // 默认暖栗胡桃（Wood026）
    };

    for (const [key, url] of Object.entries(urls)) {
      try {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          const tex = Texture.from(img);
          this.textures[key as TableWoodStyle] = tex;
          if (key === this.currentStyle || key === 'walnut') {
            this.primaryTexture = tex;
          }
          this.notify(key as TableWoodStyle);
        };
      } catch (e) {
        console.warn('[TableMaterial] Failed to load wood texture:', key, e);
      }
    }
  }

  /**
   * 切换供案原木风格
   */
  public setStyle(style: TableWoodStyle): void {
    if (this.currentStyle === style && this.primaryTexture) return;
    this.currentStyle = style;
    const tex = this.textures[style];
    if (tex && tex.source && tex.source.width > 1) {
      this.primaryTexture = tex;
    }
    this.notify(style);
  }

  /**
   * 获取供案实木纹理贴图（具备高韧性兜底）
   */
  public getWoodTexture(style?: TableWoodStyle): Texture {
    const targetStyle = style || this.currentStyle;
    const target = this.textures[targetStyle];
    if (target && target.source && target.source.width > 1) {
      return target;
    }
    if (this.primaryTexture && this.primaryTexture.source && this.primaryTexture.source.width > 1) {
      return this.primaryTexture;
    }
    if (!this.fallbackTexture) {
      this.fallbackTexture = this.generateProceduralWoodTexture();
    }
    return this.fallbackTexture;
  }

  /**
   * 根据全局灯光计算木质色彩 Tint
   */
  public calculateTint(lighting?: LightingSettings | null): number {
    if (!lighting || !lighting.masterOn) {
      // 关灯：仅调色温（中性暖褐），明暗交给光照层按光源位置计算，
      // 避免整体统一压暗导致案面在烛照场景下失真
      return 0x8a7264;
    }
    if (lighting.timeOfDay === 'sunset') {
      return 0xffd0a2; // 夕阳：暖金琥珀微泛红（加强暖调，与晨光拉开差异）
    }
    if (lighting.timeOfDay === 'night') {
      return 0xa8957c; // 夜晚：弱光暖调，仅反射变弱不发蓝
    }
    return 0xffffff; // 日景：原汁原味实木本色
  }

  /**
   * 生成高精度程序化古典红木/胡桃木材质贴图（首帧兜底）
   */
  private generateProceduralWoodTexture(): Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return Texture.WHITE;

    const baseGrad = ctx.createLinearGradient(0, 0, 512, 0);
    baseGrad.addColorStop(0, '#3a1f12');
    baseGrad.addColorStop(0.3, '#4d2a18');
    baseGrad.addColorStop(0.6, '#412314');
    baseGrad.addColorStop(1, '#361c10');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 42; i++) {
      const y = i * 12.5;
      ctx.fillStyle = i % 2 === 0 ? 'rgba(84, 46, 24, 0.32)' : 'rgba(24, 12, 6, 0.38)';
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(
        140, y + Math.sin(i * 0.7) * 7,
        360, y - Math.cos(i * 0.8) * 7,
        512, y
      );
      ctx.lineTo(512, y + 8);
      ctx.bezierCurveTo(
        360, y + 8 - Math.cos(i * 0.8) * 7,
        140, y + 8 + Math.sin(i * 0.7) * 7,
        0, y + 8
      );
      ctx.closePath();
      ctx.fill();
    }

    const imgData = ctx.getImageData(0, 0, 512, 512);
    const data = imgData.data;
    for (let p = 0; p < data.length; p += 4) {
      const noise = (Math.random() - 0.5) * 14;
      data[p] = Math.min(255, Math.max(0, data[p] + noise));
      data[p + 1] = Math.min(255, Math.max(0, data[p + 1] + noise * 0.8));
      data[p + 2] = Math.min(255, Math.max(0, data[p + 2] + noise * 0.6));
    }
    ctx.putImageData(imgData, 0, 0);

    return Texture.from(canvas);
  }

  public destroy(): void {
    this.fallbackTexture?.destroy(true);
    TableMaterial.instance = null;
  }
}
