/**
 * @file SceneBackgroundLayer.ts
 * @description PixiJS 背景墙层。
 *
 * 墙纸在最底层单独铺设；完整墙体/窗框由主题层叠在上方，透明窗格露出墙纸。
 * 本层不接收光照 tint，避免壁画随运行时光照改变颜色。
 */
import { Assets, Container, Graphics, Sprite, Texture, VideoSource } from 'pixi.js';
import { WallBackgroundStyle } from '../../types';
import { getFloorTopY } from './FloorLayer';
import { BaseWallSpec, getWallSpec } from '../scene/walls/BaseWall';

const WALL_BASE_COLOR = 0xf5eee6;
const WARM_BLESSING_EDGE_COVER_RATIO = 0.04;

export class SceneBackgroundLayer {
  public container: Container = new Container();

  private wallBgGraphics: Graphics = new Graphics();
  private wallBackdropSprite: Sprite = new Sprite();
  private wallVideoSprite: Sprite = new Sprite();
  private video: HTMLVideoElement | null = null;
  private videoTexture: Texture<VideoSource> | null = null;
  private videoUrl = '';
  private requestedVideoUrl = '';
  private videoCleanup: (() => void) | null = null;
  private readonly reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  private readonly onPlaybackEnvironmentChange = (): void => {
    this.renderBackdropVideo(this.requestedVideoUrl);
    this.updateVideoPlayback();
  };
  private readonly onPlaybackGesture = (): void => this.updateVideoPlayback();
  private wallEdgeCover: Graphics = new Graphics();
  /** 背景大图：最近一次视口尺寸（异步加载完成后据此重新布局） */
  private viewport: { w: number; h: number } = { w: 0, h: 0 };
  private backdropUrl: string = '';
  private fullSceneBackdrop = false;
  private backdropBottomExtensionRatio = 0;
  private backdropToken: number = 0;
  private backdropReady: Promise<unknown> = Promise.resolve();
  private backdropError: unknown = null;

  public async whenReady(): Promise<void> {
    let pending: Promise<unknown>;
    do {
      pending = this.backdropReady;
      await pending;
    } while (pending !== this.backdropReady);
    if (this.backdropError) throw this.backdropError;
  }

  constructor() {
    this.wallBackdropSprite.visible = false;
    this.wallVideoSprite.visible = false;
    this.container.addChild(this.wallBgGraphics);
    this.container.addChild(this.wallBackdropSprite);
    this.container.addChild(this.wallVideoSprite);
    // Keep the wallpaper behind the arch opening only. The warm blessing frame
    // has a few transparent pixels at the outer side edges, so cover those with
    // the same opaque wall backing before the frame layer is drawn above it.
    this.container.addChild(this.wallEdgeCover);
    this.reducedMotion.addEventListener('change', this.onPlaybackEnvironmentChange);
    document.addEventListener('visibilitychange', this.onPlaybackEnvironmentChange);
    document.addEventListener('pointerdown', this.onPlaybackGesture, { passive: true });
  }

  /**
   * 渲染重绘背景
   */
  public render(
    width: number,
    height: number,
    wallStyle: WallBackgroundStyle = 'classic_dawn',
    wallpaperOverride?: string,
    wallpaperVideoUrl?: string,
    fullSceneBackdrop = false
  ): void {
    // 1. 室内主墙基底色（无背景大图时即为此色；有图时被完全盖住）
    this.wallBgGraphics.clear();
    this.wallBgGraphics.rect(0, 0, width, height).fill({ color: WALL_BASE_COLOR });

    // 2. 壁纸独立于完整墙框素材；两者共用同一构图尺度。
    this.viewport = { w: width, h: height };
    this.fullSceneBackdrop = fullSceneBackdrop;
    const deviceProfile = width < 700 ? 'phone' : 'tablet';
    const wallSpec = getWallSpec(wallStyle, wallpaperOverride, deviceProfile);
    this.backdropBottomExtensionRatio = fullSceneBackdrop ? 0 : (wallSpec.bottomExtensionRatio ?? 0);
    this.renderBackdrop(wallSpec);
    this.renderBackdropVideo(wallpaperVideoUrl ?? '');

    this.wallEdgeCover.clear();
    if (!fullSceneBackdrop && wallStyle === 'warm_blessing') {
      const wallBottom = getFloorTopY(width, height);
      const edgeWidth = width * WARM_BLESSING_EDGE_COVER_RATIO;
      this.wallEdgeCover
        .rect(0, 0, edgeWidth, wallBottom).fill(WALL_BASE_COLOR)
        .rect(width - edgeWidth, 0, edgeWidth, wallBottom).fill(WALL_BASE_COLOR);
    }
  }

  /** 贴独立壁画底图；位置和尺度与其上的完整墙框保持一致。 */
  private renderBackdrop(spec: BaseWallSpec): void {
    const url = spec.backdropUrl;
    if (!url) {
      this.backdropToken += 1;
      this.backdropReady = Promise.resolve();
      this.backdropError = null;
      this.wallBackdropSprite.visible = false;
      this.backdropUrl = '';
      return;
    }

    const sprite = this.wallBackdropSprite;
    // Wallpaper is printed/background art, not a lit 3D surface; preserve its authored color.
    sprite.tint = 0xffffff;

    if (this.backdropUrl !== url) {
      this.backdropUrl = url;
      this.backdropError = null;
      const token = ++this.backdropToken;
      sprite.visible = false;
      this.backdropReady = Assets.load(url)
        .then((tex) => {
          if (token !== this.backdropToken || sprite.destroyed) return;
          sprite.texture = tex;
          sprite.visible = true;
          this.layoutWallBackdrop();
        })
        .catch((err) => {
          if (token === this.backdropToken) this.backdropError = err;
          console.error('Failed to load wall backdrop:', err);
        });
    } else if (sprite.texture && sprite.texture.width > 0) {
      sprite.visible = true;
      this.layoutWallBackdrop();
    }
  }

  /** Video is optional and never blocks the static scene's readiness. */
  private renderBackdropVideo(requestedUrl: string): void {
    this.requestedVideoUrl = requestedUrl;
    const url = this.reducedMotion.matches ? '' : requestedUrl;
    if (url === this.videoUrl) {
      this.layoutBackdropSprite(this.wallVideoSprite);
      return;
    }
    this.releaseVideo();
    this.videoUrl = url;
    if (!url) return;

    const video = document.createElement('video');
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.preload = 'auto';
    video.src = url;
    this.video = video;

    const source = new VideoSource({
      resource: video,
      autoLoad: false,
      autoPlay: false,
      // Prefer decoded-frame callbacks over uploading at the scene's 60 fps.
      updateFPS: 0,
      alphaMode: 'no-premultiply-alpha',
    });
    this.videoTexture = new Texture({ source });
    this.wallVideoSprite.texture = this.videoTexture;

    const onPlaying = (): void => {
      if (this.video !== video) return;
      this.wallVideoSprite.visible = !this.reducedMotion.matches && !document.hidden;
      this.layoutBackdropSprite(this.wallVideoSprite);
    };
    const onError = (): void => {
      if (this.video !== video) return;
      console.error('Failed to play wall backdrop video; showing static poster:', url, video.error);
      this.releaseVideo();
    };
    video.addEventListener('playing', onPlaying);
    video.addEventListener('error', onError);
    this.videoCleanup = () => {
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('error', onError);
    };
    void source.load().then(() => {
      if (this.video !== video) return;
      this.layoutBackdropSprite(this.wallVideoSprite);
      this.updateVideoPlayback();
    }).catch((error) => {
      if (this.video !== video) return;
      console.error('Failed to load wall backdrop video; showing static poster:', url, error);
      this.releaseVideo();
    });
  }

  private updateVideoPlayback(): void {
    const video = this.video;
    if (!video) return;
    if (document.hidden || this.reducedMotion.matches) {
      video.pause();
      this.wallVideoSprite.visible = false;
      return;
    }
    if (!video.paused || !this.videoTexture?.source.isReady) return;
    void video.play().catch((error: unknown) => {
      if (this.video !== video) return;
      this.wallVideoSprite.visible = false;
      if (error instanceof DOMException && error.name === 'AbortError') return;
      // A later pointer gesture retries playback on browsers that block autoplay.
      console.warn('Wall backdrop autoplay unavailable; showing static poster:', error);
    });
  }

  private releaseVideo(): void {
    this.videoCleanup?.();
    this.videoCleanup = null;
    this.wallVideoSprite.visible = false;
    this.wallVideoSprite.texture = Texture.EMPTY;
    const texture = this.videoTexture;
    this.videoTexture = null;
    this.video = null;
    if (texture) {
      texture.source.autoUpdate = false;
      texture.destroy(true);
    }
  }

  private layoutWallBackdrop(): void {
    this.layoutBackdropSprite(this.wallBackdropSprite);
  }

  /** Poster and video use the same top-centered cover composition. */
  private layoutBackdropSprite(sprite: Sprite): void {
    const tex = sprite.texture;
    const { w, h } = this.viewport;
    if (!tex || !tex.width || !tex.height || w <= 0 || h <= 0) return;

    const wallHeight = this.fullSceneBackdrop ? h : getFloorTopY(w, h);
    const scale = Math.max(w / tex.width, wallHeight / tex.height);

    sprite.anchor.set(0.5, 0); // 同完整墙框一样，以顶边和中轴为锚
    sprite.x = w * 0.5;
    sprite.y = 0;
    sprite.width = tex.width * scale;
    sprite.height = tex.height * scale * (1 + this.backdropBottomExtensionRatio);
  }

  public destroy(): void {
    this.backdropToken += 1;
    this.reducedMotion.removeEventListener('change', this.onPlaybackEnvironmentChange);
    document.removeEventListener('visibilitychange', this.onPlaybackEnvironmentChange);
    document.removeEventListener('pointerdown', this.onPlaybackGesture);
    this.releaseVideo();
    this.container.destroy({ children: true });
  }
}
