/**
 * @file SceneThemeLayer.ts
 * @description 场景主题的独立部件装配器。墙纸由背景层负责，本层按真实深度装配
 * 墙纸装饰、遗像关系、墙面造景、结构附件、地面陈设与左右镜头前景。
 */
import { Assets, Container, Graphics, Polygon, Rectangle, Sprite, Texture } from 'pixi.js';
import { getFloorTopY } from './FloorLayer';
import { TexturePipeline } from '../assets/TexturePipeline';
import type {
  SceneAssemblySelection,
  SceneForegroundInstance,
  SceneForegroundDefinition,
  SceneThemeFloorImage,
  SceneThemeGroundAsset,
  SceneThemeLightRig,
  SceneThemeId,
  SceneThemePortraitAsset,
  SceneThemeViewportAsset,
  LightingSettings,
} from '../../types';
import { getSceneComponentOption, getSceneForeground } from '../scene/components';
import { getSceneTheme } from '../scene/themes';
import { getSceneCompositionWidth } from '../scene/SceneViewportLayout';

export interface MemorialThemeAnchor { x: number; y: number; size: number; }

type AssetSprite<T> = { spec: T; sprite: Sprite };
type ForegroundSprite = AssetSprite<SceneThemeViewportAsset> & {
  instance: SceneForegroundInstance;
  definition: SceneForegroundDefinition;
};
type GroundSpriteAsset = AssetSprite<SceneThemeGroundAsset>;
type WallPartAnchor = NonNullable<SceneThemeViewportAsset['wallParts']>[number]['anchor'];
type WallAssemblySprite = AssetSprite<SceneThemeViewportAsset> & {
  role: 'scenery' | 'decoration';
  anchor?: WallPartAnchor;
  subTexture?: Texture;
  glowIndex?: number;
};

const ellipseHitArea = (
  width: number,
  height: number,
  centerXRatio: number,
  centerYRatio: number,
  radiusXRatio: number,
  radiusYRatio: number
): Polygon => {
  const points: number[] = [];
  for (let index = 0; index < 32; index += 1) {
    const angle = (index / 32) * Math.PI * 2;
    points.push(
      width * (centerXRatio + Math.cos(angle) * radiusXRatio),
      height * (centerYRatio + Math.sin(angle) * radiusYRatio)
    );
  }
  return new Polygon(points);
};

export class SceneThemeLayer {
  public wallpaperDecorations: Container = new Container();
  public portraitBack: Container = new Container();
  public portraitFront: Container = new Container();
  public wallScenery: Container = new Container();
  /** Frame and attachments share one wall coordinate system and one responsive transform. */
  public wallAssembly: Container = new Container();
  private wallLampGlow: Container = new Container();
  private wallLampGlowSprites: Sprite[][] = [];
  public wallDecorations: Container = new Container();
  /** The mat sits on the floor behind the table so the table feet can rest on it. */
  public groundMat: Container = new Container();
  /** The cushion stays in front of the table and is drawn over the mat. */
  public ground: Container = new Container();
  public foregroundLeft: Container = new Container();
  public foregroundRight: Container = new Container();

  private roomKey = '';
  private foregroundKey = '';
  private loadToken = 0;
  private foregroundLoadToken = 0;
  private viewportAssets: AssetSprite<SceneThemeViewportAsset>[] = [];
  private wallAssemblyAssets: WallAssemblySprite[] = [];
  private portraitBackAssets: AssetSprite<SceneThemePortraitAsset>[] = [];
  private portraitFrontAssets: AssetSprite<SceneThemePortraitAsset>[] = [];
  private groundAssets: GroundSpriteAsset[] = [];
  private foregroundAssets: ForegroundSprite[] = [];
  private readonly pendingAssets = new Set<Promise<unknown>>();
  private assetLoadError: unknown = null;
  private viewport = { width: 0, height: 0 };
  private memorial: MemorialThemeAnchor = { x: 0, y: 0, size: 144 };
  private floorImageSpec: SceneThemeFloorImage | null = null;
  private floorImageTexture: Texture | null = null;
  private lighting: LightingSettings | null = null;
  private lightRig: SceneThemeLightRig | null = null;
  /** Per-viewport wall bounds; crop architectural PNG spill below the wall/floor seam. */
  private wallSceneryMask: Graphics = new Graphics();

  constructor(private readonly onAssetReady?: () => void) {
    for (const [container, side] of [
      [this.foregroundLeft, 'left'],
      [this.foregroundRight, 'right'],
    ] as const) {
      container.eventMode = 'static';
      container.interactiveChildren = false;
      container.cursor = 'pointer';
      container.on('pointertap', (event) => {
        event.stopPropagation();
        window.dispatchEvent(new CustomEvent('memery:foreground-tap', { detail: { side } }));
      });
    }

    this.wallAssembly.addChild(this.wallScenery, this.wallLampGlow, this.wallDecorations);
    this.wallScenery.mask = this.wallSceneryMask;
    this.wallScenery.addChild(this.wallSceneryMask);
    const radialGlow = TexturePipeline.getInstance().wallLampGlowTexture;
    for (let index = 0; index < 2; index += 1) {
      const halo = new Sprite(radialGlow ?? Texture.EMPTY);
      halo.anchor.set(0.5);
      halo.tint = 0xffb84a;
      halo.alpha = radialGlow ? 0.32 : 0;
      halo.blendMode = 'add';
      const paperSpill = new Sprite(radialGlow ?? Texture.EMPTY);
      paperSpill.anchor.set(0.5);
      paperSpill.tint = 0xffdfa0;
      paperSpill.alpha = radialGlow ? 0.30 : 0;
      paperSpill.blendMode = 'add';
      const layers = [halo, paperSpill];
      this.wallLampGlowSprites.push(layers);
      layers.forEach((glow) => this.wallLampGlow.addChild(glow));
    }
  }

  public render(
    width: number,
    height: number,
    themeId: SceneThemeId,
    memorial: MemorialThemeAnchor,
    selection?: SceneAssemblySelection | null,
    lighting?: LightingSettings,
    lightRig?: SceneThemeLightRig
  ): void {
    this.viewport = { width, height };
    this.memorial = memorial;
    this.lighting = lighting ?? null;
    this.lightRig = lightRig ?? null;
    const definition = getSceneTheme(themeId);
    const effectiveSelection = selection ?? definition.defaultAssembly ?? null;
    const deviceProfile = this.getDeviceProfile();
    const nextRoomKey = JSON.stringify({
      themeId,
      deviceProfile,
      wallpaperDecorationId: effectiveSelection?.wallpaperDecorationId,
      wallSceneryId: effectiveSelection?.wallSceneryId,
      wallDecorationId: effectiveSelection?.wallDecorationId,
      groundMatId: effectiveSelection?.groundMatId,
      cushionId: effectiveSelection?.cushionId,
    });
    const nextFgKey = JSON.stringify(effectiveSelection?.foreground);

    if (this.roomKey !== nextRoomKey) {
      this.roomKey = nextRoomKey;
      this.foregroundKey = nextFgKey;
      this.mountTheme(themeId, effectiveSelection);
    } else if (this.foregroundKey !== nextFgKey) {
      this.foregroundKey = nextFgKey;
      this.mountForegroundOnly(effectiveSelection, definition.foregroundSetIds);
    }
    this.layout();
  }

  public getFloorImage(): { spec: SceneThemeFloorImage; image: Texture } | undefined {
    if (!this.floorImageSpec || !this.floorImageTexture) return undefined;
    return { spec: this.floorImageSpec, image: this.floorImageTexture };
  }

  public async whenReady(): Promise<void> {
    while (this.pendingAssets.size) await Promise.allSettled([...this.pendingAssets]);
    if (this.assetLoadError) throw this.assetLoadError;
  }

  private trackAssetLoad(pending: Promise<unknown>): void {
    this.pendingAssets.add(pending);
    void pending.then(
      () => this.pendingAssets.delete(pending),
      () => this.pendingAssets.delete(pending)
    );
  }

  private mountTheme(themeId: SceneThemeId, selection: SceneAssemblySelection | null): void {
    const token = ++this.loadToken;
    this.foregroundLoadToken += 1;
    this.assetLoadError = null;
    const definition = getSceneTheme(themeId);
    const floorImageSpec = definition.floorImage ?? null;
    this.floorImageSpec = floorImageSpec;
    this.floorImageTexture = null;

    for (const container of this.contentContainers()) this.clearContainer(container);
    for (const { subTexture } of this.wallAssemblyAssets) subTexture?.destroy(false);
    this.wallLampGlowSprites.flat().forEach((glow) => { glow.visible = false; });
    this.viewportAssets = [];
    this.wallAssemblyAssets = [];
    this.portraitBackAssets = [];
    this.portraitFrontAssets = [];
    this.groundAssets = [];
    this.foregroundAssets = [];

    if (selection) this.mountSelection(selection, token, definition.foregroundSetIds);
    else this.mountLegacyLayers(definition.layers, token);

    if (!floorImageSpec) return;
    this.trackAssetLoad(Assets.load(floorImageSpec.url)
      .then((image) => {
        if (token !== this.loadToken) return;
        this.floorImageTexture = image;
        this.onAssetReady?.();
      })
      .catch((error) => {
        if (token === this.loadToken) this.assetLoadError = error;
        console.error(`Failed to load theme floor image: ${floorImageSpec.url}`, error);
      }));
  }

  private mountSelection(selection: SceneAssemblySelection, token: number, foregroundSetIds?: string[]): void {
    const wallpaperDecoration = getSceneComponentOption('wallpaperDecoration', selection.wallpaperDecorationId);
    const wallScenery = getSceneComponentOption('wallScenery', selection.wallSceneryId);
    const wallDecoration = getSceneComponentOption('wallDecoration', selection.wallDecorationId);
    const groundMat = getSceneComponentOption('groundMat', selection.groundMatId);
    const cushion = getSceneComponentOption('cushion', selection.cushionId);

    if (wallpaperDecoration) {
      this.portraitBackAssets.push(this.createAsset(this.portraitBack, this.resolvePortraitAsset(wallpaperDecoration.backAsset), token));
      if (wallpaperDecoration.frontAsset) {
        this.portraitFrontAssets.push(this.createAsset(this.portraitFront, this.resolvePortraitAsset(wallpaperDecoration.frontAsset), token));
      }
    }
    if (wallScenery) this.wallAssemblyAssets.push({
      ...this.createAsset(this.wallScenery, this.resolveViewportAsset(wallScenery.asset), token),
      role: 'scenery',
    });
    if (wallDecoration) this.mountWallDecoration(this.resolveViewportAsset(wallDecoration.asset), token);
    if (groundMat) this.groundAssets.push(this.createGroundAsset(groundMat.asset, token, this.groundMat));
    if (cushion) this.groundAssets.push(this.createGroundAsset(cushion.asset, token));

    const instances = [selection.foreground.left, selection.foreground.right]
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    for (const instance of instances) {
      const definition = getSceneForeground(instance.foregroundId);
      if (!definition || definition.side !== instance.side) continue;
      if (foregroundSetIds && !foregroundSetIds.includes(definition.setId)) continue;
      const container = instance.side === 'left' ? this.foregroundLeft : this.foregroundRight;
      const mounted = this.createAsset(container, this.resolveViewportAsset(definition.asset), this.foregroundLoadToken);
      mounted.sprite.eventMode = 'none';
      this.foregroundAssets.push({ ...mounted, instance, definition });
    }
  }

  private mountForegroundOnly(selection: SceneAssemblySelection | null, foregroundSetIds?: string[]): void {
    const token = ++this.foregroundLoadToken;
    this.clearContainer(this.foregroundLeft);
    this.clearContainer(this.foregroundRight);
    this.foregroundAssets = [];
    if (!selection) return;

    const instances = [selection.foreground.left, selection.foreground.right]
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    for (const instance of instances) {
      const definition = getSceneForeground(instance.foregroundId);
      if (!definition || definition.side !== instance.side) continue;
      if (foregroundSetIds && !foregroundSetIds.includes(definition.setId)) continue;
      const container = instance.side === 'left' ? this.foregroundLeft : this.foregroundRight;
      const mounted = this.createAsset(container, this.resolveViewportAsset(definition.asset), token);
      mounted.sprite.eventMode = 'none';
      this.foregroundAssets.push({ ...mounted, instance, definition });
    }
  }

  private mountLegacyLayers(layers: ReturnType<typeof getSceneTheme>['layers'], token: number): void {
    for (const spec of layers?.backgroundAccessories ?? []) this.viewportAssets.push(this.createAsset(this.wallpaperDecorations, this.resolveViewportAsset(spec), token));
    for (const spec of layers?.portraitBack ?? []) this.portraitBackAssets.push(this.createAsset(this.portraitBack, spec, token));
    for (const spec of layers?.portraitFront ?? []) this.portraitFrontAssets.push(this.createAsset(this.portraitFront, spec, token));
    for (const spec of layers?.ground ?? []) this.groundAssets.push(this.createGroundAsset(spec, token));
    for (const spec of layers?.foreground ?? []) this.viewportAssets.push(this.createAsset(this.foregroundLeft, this.resolveViewportAsset(spec), this.foregroundLoadToken));
  }

  private getDeviceProfile(): 'phone' | 'tablet' {
    return this.viewport.width < 700 ? 'phone' : 'tablet';
  }

  private resolveViewportAsset(spec: SceneThemeViewportAsset): SceneThemeViewportAsset {
    const url = spec.responsiveAssets?.[this.getDeviceProfile()];
    return url ? { ...spec, url } : spec;
  }

  private resolvePortraitAsset(spec: SceneThemePortraitAsset): SceneThemePortraitAsset {
    const url = spec.responsiveAssets?.[this.getDeviceProfile()];
    return url ? { ...spec, url } : spec;
  }

  private createAsset<T extends { url: string; alpha?: number }>(container: Container, spec: T, token: number): AssetSprite<T> {
    const sprite = new Sprite(Texture.EMPTY);
    sprite.visible = false;
    sprite.alpha = spec.alpha ?? 1;
    container.addChild(sprite);
    this.trackAssetLoad(Assets.load(spec.url)
      .then((texture) => {
        const currentToken = container === this.foregroundLeft || container === this.foregroundRight
          ? this.foregroundLoadToken : this.loadToken;
        if (token !== currentToken || sprite.destroyed) return;
        sprite.texture = texture;
        sprite.visible = true;
        this.layout();
        this.onAssetReady?.();
      })
      .catch((error) => {
        const currentToken = container === this.foregroundLeft || container === this.foregroundRight
          ? this.foregroundLoadToken : this.loadToken;
        if (token === currentToken) this.assetLoadError = error;
        console.error(`Failed to load scene component: ${spec.url}`, error);
      }));
    return { spec, sprite };
  }

  private createGroundAsset(spec: SceneThemeGroundAsset, token: number, container: Container = this.ground): GroundSpriteAsset {
    return this.createAsset(container, spec, token);
  }

  private mountWallDecoration(spec: SceneThemeViewportAsset, token: number): void {
    if (!spec.wallParts?.length) {
      this.wallAssemblyAssets.push({
        ...this.createAsset(this.wallDecorations, spec, token),
        role: 'decoration',
      });
      return;
    }

    this.trackAssetLoad(Assets.load(spec.url)
      .then((atlas: Texture) => {
        if (token !== this.loadToken) return;
        spec.wallParts?.forEach(({ frame, anchor }, index) => {
          const subTexture = new Texture({
            source: atlas.source,
            frame: new Rectangle(frame.x, frame.y, frame.width, frame.height),
            orig: new Rectangle(0, 0, frame.width, frame.height),
            label: `wall-lamp-${index}`,
          });
          const sprite = new Sprite(subTexture);
          this.wallDecorations.addChild(sprite);
          this.wallAssemblyAssets.push({ spec, sprite, role: 'decoration', anchor, subTexture, glowIndex: index });
        });
        this.layout();
        this.onAssetReady?.();
      })
      .catch((error) => {
        if (token === this.loadToken) this.assetLoadError = error;
        console.error(`Failed to load scene component: ${spec.url}`, error);
      }));
  }

  private layout(): void {
    const { width, height } = this.viewport;
    if (width <= 0 || height <= 0) return;

    // Keep foreground cycling within the narrow edge zones marked in the scene.
    this.foregroundLeft.hitArea = ellipseHitArea(width, height, 0.09, 0.805, 0.09, 0.195);
    this.foregroundRight.hitArea = ellipseHitArea(width, height, 0.92, 0.82, 0.08, 0.18);

    // FloorLayer owns the shared wall/floor boundary. Recompute the clipping mask
    // on every viewport layout so tall phone and shorter tablet screens stay aligned.
    const wallBottom = getFloorTopY(width, height);
    const frame = this.wallAssemblyAssets.find(({ role }) => role === 'scenery');
    if (frame?.sprite.texture.width && frame.sprite.texture.height) {
      const profile = this.getDeviceProfile();
      const wallWidth = width;
      const frameWidthRatio = frame.spec.responsiveWidthRatios?.[profile] ?? frame.spec.widthRatio ?? 1;
      const groupScale = Math.max((wallWidth * frameWidthRatio) / frame.sprite.texture.width, wallBottom / frame.sprite.texture.height);
      const bottomExtensionRatio = frame.spec.bottomExtensionRatio ?? 0;
      const authoredWidth = frame.sprite.texture.width;
      const authoredHeight = frame.sprite.texture.height;

      this.wallAssembly.position.set(width * 0.5, 0);
      this.wallAssembly.scale.set(groupScale, groupScale * (1 + bottomExtensionRatio));
      this.wallSceneryMask.clear().rect(-authoredWidth * 0.5, 0, authoredWidth, authoredHeight * (1 + bottomExtensionRatio)).fill({ color: 0xffffff });

      for (const { role, spec, sprite, anchor: partAnchor, glowIndex } of this.wallAssemblyAssets) {
        if (!sprite.texture.width || !sprite.texture.height) continue;
        if (role === 'scenery') {
          // Keep the authored frame PNG's wood color unchanged in the default scene.
          sprite.filters = [];
          sprite.anchor.set(0.5, 0);
          sprite.position.set(0, 0);
          sprite.scale.set(1);
          continue;
        }

        const anchor = partAnchor ?? spec.wallAnchor;
        if (anchor) {
          const centerRegion = partAnchor?.centerRegionByProfile?.[profile];
          const anchorX = centerRegion
            ? ((centerRegion.left + centerRegion.right) / 2) / authoredWidth
            : anchor.x;
          sprite.anchor.set(0.5, 0.5);
          sprite.position.set((anchorX - 0.5) * authoredWidth, anchor.y * authoredHeight);
          const partScale = (authoredWidth * anchor.widthRatio) / sprite.texture.width;
          sprite.scale.set(partScale);
          sprite.alpha = spec.alpha ?? 1;
          if (glowIndex !== undefined) {
            this.layoutWallLampGlow(anchorX, anchor.y, authoredWidth, authoredHeight, glowIndex);
          }
        } else {
          // Wall attachments without an explicit anchor remain centered in the same composition.
          sprite.anchor.set(0.5, 0.5);
          sprite.position.set(0, authoredHeight * 0.4);
          sprite.scale.set(authoredWidth / sprite.texture.width);
          sprite.alpha = spec.alpha ?? 1;
        }
      }
    } else {
      this.wallSceneryMask.clear().rect(0, 0, width, wallBottom).fill({ color: 0xffffff });
      this.wallAssembly.position.set(width * 0.5, 0);
      this.wallAssembly.scale.set(1);
    }
    const compositionWidth = getSceneCompositionWidth(width, height);

    for (const { spec, sprite } of this.viewportAssets) {
      if (!sprite.texture.width || !sprite.texture.height) continue;
      const profile = this.getDeviceProfile();
      const wallWidth = width;
      const sx = wallWidth / sprite.texture.width;
      const sy = height / sprite.texture.height;
      const wallHeight = getFloorTopY(width, height);
      const frameWidthRatio = spec.responsiveWidthRatios?.[profile] ?? spec.widthRatio ?? 1;
      const scale = spec.fit === 'wall-frame' ? Math.max((wallWidth * frameWidthRatio) / sprite.texture.width, wallHeight / sprite.texture.height)
        : spec.fit === 'wall' ? Math.max(sx, wallHeight / sprite.texture.height)
        : spec.fit === 'cover' ? Math.max(sx, sy) * 1.02
        : spec.fit === 'contain' ? Math.min(sx, sy)
        : (compositionWidth * (spec.widthRatio ?? 1)) / sprite.texture.width;
      const wallAnchored = spec.fit === 'wall' || spec.fit === 'wall-frame';
      sprite.anchor.set(0.5, wallAnchored ? 0 : 0.5);
      sprite.position.set(width * (spec.x ?? 0.5), wallAnchored ? 0 : height * (spec.y ?? 0.5));
      sprite.scale.set(scale);
      sprite.alpha = spec.alpha ?? 1;
    }

    this.layoutPortraitAssets(this.portraitBackAssets);
    this.layoutPortraitAssets(this.portraitFrontAssets);

    for (const { spec, sprite } of this.groundAssets) {
      if (!sprite.texture.width || !sprite.texture.height) continue;
      const scale = (compositionWidth * spec.widthRatio) / sprite.texture.width;
      const bottomOffset = spec.bottomRatio !== undefined ? height * spec.bottomRatio : (spec.bottom ?? 0);
      sprite.anchor.set(0.5, 1);
      sprite.position.set(width * 0.5, height - bottomOffset);
      sprite.scale.set(scale);
      sprite.alpha = spec.alpha ?? 1;
    }

    for (const { spec, sprite, instance, definition } of this.foregroundAssets) {
      if (!sprite.texture.width || !sprite.texture.height) continue;
      const minHeight = Math.max(0, definition.minHeightRatio);
      const maxHeight = Math.max(minHeight, definition.maxHeightRatio);
      const requestedHeight = definition.defaultHeightRatio * (instance.scale ?? 1);
      const visibleHeightRatio = Math.min(maxHeight, Math.max(minHeight, requestedHeight));
      const bottomOverflowRatio = Math.min(0.5, Math.max(0, definition.bottomOverflowRatio ?? 0));
      const spriteHeightRatio = visibleHeightRatio / (1 - bottomOverflowRatio);
      const scale = (height * spriteHeightRatio) / sprite.texture.height;
      const isLeft = instance.side === 'left';
      sprite.anchor.set(isLeft ? 0 : 1, 1);
      const offsetX = Math.min(0.36, Math.max(-0.36, instance.offsetX ?? 0));
      const offsetY = Math.min(0.04, Math.max(-0.04, instance.offsetY ?? 0));
      const bottomOverflow = height * spriteHeightRatio * bottomOverflowRatio;
      sprite.position.set((isLeft ? 0 : width) + width * offsetX, height + height * offsetY + bottomOverflow);
      sprite.scale.set(scale);
      sprite.alpha = (spec.alpha ?? 1) * (instance.alpha ?? 1);
    }
  }

  private layoutWallLampGlow(x: number, y: number, width: number, height: number, index: number): void {
    const layers = this.wallLampGlowSprites[index];
    if (!layers) return;
    const [halo, paperSpill] = layers;
    if (!halo.texture.width || !halo.texture.height || !paperSpill.texture.width || !paperSpill.texture.height) return;
    const lighting = this.lighting;
    const sunlight = Math.min(1, Math.max(0, lighting?.sunlightIntensity ?? 0.75));
    const timeFactor = lighting?.timeOfDay === 'night' ? 0.82 : lighting?.timeOfDay === 'sunset' ? 0.96 : 1;
    const lampEnergy = lighting?.masterOn === false ? 0 : (0.42 + sunlight * 0.58) * timeFactor;
    const centerX = (x - 0.5) * width;
    const centerY = y * height;
    halo.position.set(centerX, centerY);
    halo.scale.set((width * 0.48) / halo.texture.width, (height * 0.42) / halo.texture.height);
    halo.tint = this.lightRig?.keyColor ?? 0xffd58a;
    halo.alpha = 0.22 * lampEnergy;
    paperSpill.position.set(centerX, centerY);
    paperSpill.scale.set((width * 0.24) / paperSpill.texture.width, (height * 0.30) / paperSpill.texture.height);
    paperSpill.tint = 0xffdfaa;
    paperSpill.alpha = 0.18 * lampEnergy;
    halo.visible = lampEnergy > 0;
    paperSpill.visible = lampEnergy > 0;
  }

  private layoutPortraitAssets(assets: AssetSprite<SceneThemePortraitAsset>[]): void {
    for (const { spec, sprite } of assets) {
      if (!sprite.texture.width || !sprite.texture.height) continue;
      const targetWidth = this.memorial.size * spec.widthInPortraits;
      const scale = targetWidth / sprite.texture.width;
      sprite.anchor.set(spec.anchorX ?? 0.5, spec.anchorY ?? 0.5);
      sprite.position.set(this.memorial.x + this.memorial.size * (spec.dxInPortraits ?? 0), this.memorial.y + this.memorial.size * (spec.dyInPortraits ?? 0));
      sprite.scale.set(scale);
      sprite.alpha = spec.alpha ?? 1;
    }
  }

  private contentContainers(): Container[] {
    return [this.wallpaperDecorations, this.portraitBack, this.portraitFront, this.wallScenery,
      this.wallDecorations, this.groundMat, this.ground, this.foregroundLeft, this.foregroundRight];
  }

  private clearContainer(container: Container): void {
    for (const child of container.removeChildren()) {
      if (container === this.wallScenery && child === this.wallSceneryMask) continue;
      child.destroy();
    }
    if (container === this.wallScenery && this.wallSceneryMask.parent !== container) {
      container.addChild(this.wallSceneryMask);
    }
  }

  public destroy(): void {
    ++this.loadToken;
    ++this.foregroundLoadToken;
    this.wallAssembly.destroy({ children: true });
    for (const { subTexture } of this.wallAssemblyAssets) subTexture?.destroy(false);
    for (const container of [this.wallpaperDecorations, this.portraitBack, this.portraitFront,
      this.groundMat, this.ground, this.foregroundLeft, this.foregroundRight]) {
      container.destroy({ children: true });
    }
  }
}
