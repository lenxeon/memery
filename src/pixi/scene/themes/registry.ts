/**
 * @file registry.ts
 * @description 通用主题配置加载器。主题的构图、素材、桌面测量和默认装配来自 public/themes 下的 JSONC。
 */
import type {
  SceneAssemblySelection,
  SceneForegroundSide,
  SceneForegroundDefinition,
  SceneThemeDefinition,
  SceneThemeId,
  SceneThemeTableDefinition,
  SceneThemeViewportAsset,
  SceneThemeGroundAsset,
  SceneThemePortraitAsset,
} from '../../../types';

interface ThemeCatalog {
  schemaVersion: number;
  themes: Array<{ id: string; manifest: string }>;
}

type RawAssembly = Omit<SceneAssemblySelection, 'wallSceneryId' | 'foreground'> & {
  frameId: string;
  offerings: SceneThemeDefinition['defaultOfferings'];
  foreground: Record<SceneForegroundSide, { foregroundId: string; offsetX?: number; offsetY?: number; alpha?: number }>;
};

const registry: Record<string, SceneThemeDefinition> = {};
const options: SceneThemeDefinition[] = [];
let loadPromise: Promise<void> | null = null;

/** Remove JSONC comments without touching comment-like text inside quoted strings. */
const stripJsonComments = (source: string): string => {
  let result = '';
  let inString = false;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];
    if (lineComment) {
      if (char === '\n' || char === '\r') {
        lineComment = false;
        result += char;
      } else result += ' ';
      continue;
    }
    if (blockComment) {
      if (char === '*' && next === '/') {
        result += '  ';
        index += 1;
        blockComment = false;
      } else result += char === '\n' || char === '\r' ? char : ' ';
      continue;
    }
    if (inString) {
      result += char;
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === '"') inString = false;
      continue;
    }
    if (char === '"') {
      inString = true;
      result += char;
    } else if (char === '/' && next === '/') {
      result += '  ';
      index += 1;
      lineComment = true;
    } else if (char === '/' && next === '*') {
      result += '  ';
      index += 1;
      blockComment = true;
    } else result += char;
  }
  return result;
};

const parseJsonc = <T,>(source: string, path: string): T => {
  try {
    return JSON.parse(stripJsonComments(source)) as T;
  } catch (error) {
    throw new Error(`Invalid theme JSONC at ${path}: ${String(error)}`);
  }
};

const publicUrl = (path: string): string => `/${path.replace(/^\/+/, '')}`;
const parseColor = (value: string | number): number =>
  typeof value === 'number' ? value : Number.parseInt(value.replace(/^#/, ''), 16);

const withAssetUrls = <T extends { assets?: Partial<Record<'phone' | 'tablet', string>>; asset?: string }>(value: T) => {
  const responsiveAssets = value.assets
    ? Object.fromEntries(Object.entries(value.assets).map(([profile, path]) => [profile, publicUrl(path!)])) as Partial<Record<'phone' | 'tablet', string>>
    : undefined;
  return {
    url: publicUrl(value.asset ?? value.assets?.phone ?? value.assets?.tablet ?? ''),
    ...(responsiveAssets ? { responsiveAssets } : {}),
  };
};

interface RawAsset {
  id: string;
  name: string;
  poeticTitle?: string;
  description?: string;
  previewUrl?: string;
  asset?: string;
  assets?: Partial<Record<'phone' | 'tablet', string>>;
  video?: { asset: string };
  fit?: SceneThemeViewportAsset['fit'];
  position?: { x?: number; y?: number; widthRatio?: number };
  responsiveWidthRatios?: { phone?: number; tablet?: number };
  bottomExtensionRatio?: number;
  widthRatio?: number;
  alpha?: number;
  backAsset?: RawAsset & Omit<SceneThemePortraitAsset, 'url' | 'responsiveAssets'>;
  frontAsset?: RawAsset & Omit<SceneThemePortraitAsset, 'url' | 'responsiveAssets'>;
  wallParts?: SceneThemeViewportAsset['wallParts'];
}

interface RawThemeManifest {
  schemaVersion: number;
  themeId: string;
  name: string;
  poeticTitle: string;
  iconText: string;
  desc: string;
  tag: string;
  version: number;
  sceneBackground?: { mode: 'single-background'; asset: string };
  wall?: {
    wallpaper: RawAsset;
    wallpaperDecorations: RawAsset[];
    frame: RawAsset;
    frameDecorations: RawAsset[];
    portrait: NonNullable<SceneThemeDefinition['wall']>['portrait'];
  } | null;
  ground?: {
    floor: { id: string; name: string; asset: string; baseColor: number | string; baseboard: { color: number | string; highlight: number | string }; bakedLighting?: boolean } | null;
    groundMat: RawAsset & SceneThemeGroundAsset;
    cushion: RawAsset & SceneThemeGroundAsset;
  } | null;
  table?: SceneThemeTableDefinition | null;
  foregroundCandidates?: {
    left: Record<string, Omit<SceneForegroundDefinition, 'themeId' | 'side' | 'asset' | 'previewUrl'> & { asset: string; previewUrl?: string; widthRatio?: number }>;
    right: Record<string, Omit<SceneForegroundDefinition, 'themeId' | 'side' | 'asset' | 'previewUrl'> & { asset: string; previewUrl?: string; widthRatio?: number }>;
  } | null;
  defaultAssembly?: RawAssembly | null;
  foregroundSetIds?: string[];
  defaultForegroundSetId?: string;
  preset: SceneThemeDefinition['preset'];
  lightRig: Omit<SceneThemeDefinition['lightRig'], 'keyColor' | 'ambientColor'> & { keyColor: number | string; ambientColor: number | string };
}

const portraitAsset = (raw: RawAsset): SceneThemePortraitAsset => ({
  ...withAssetUrls(raw),
  widthInPortraits: Number((raw as unknown as SceneThemePortraitAsset).widthInPortraits ?? 1),
  dxInPortraits: (raw as unknown as SceneThemePortraitAsset).dxInPortraits,
  dyInPortraits: (raw as unknown as SceneThemePortraitAsset).dyInPortraits,
  anchorX: (raw as unknown as SceneThemePortraitAsset).anchorX,
  anchorY: (raw as unknown as SceneThemePortraitAsset).anchorY,
  alpha: raw.alpha,
});

const validateThemeManifest = (raw: RawThemeManifest): void => {
  const assert = (condition: unknown, message: string): void => {
    if (!condition) throw new Error(`Invalid theme manifest ${raw.themeId}: ${message}`);
  };
  assert(Boolean(raw.themeId && raw.name && raw.poeticTitle), 'themeId, name and poeticTitle are required');
  if (raw.sceneBackground) {
    const { mode, asset } = raw.sceneBackground;
    assert(mode === 'single-background', 'sceneBackground.mode must be "single-background"');
    assert(typeof asset === 'string' && asset.startsWith(`themes/${raw.themeId}/`) && /\.png$/i.test(asset) && !asset.split('/').includes('..'), 'sceneBackground.asset must reference a PNG inside the current theme directory');
    assert(raw.wall == null, 'single-background themes must not define split wall layers');
    assert(Boolean(raw.ground && raw.ground.floor == null && raw.table && raw.defaultAssembly && raw.foregroundCandidates), 'single-background themes require a null ground.floor plus configured ground props, table, assembly and foreground candidates');
    const ground = raw.ground!;
    const table = raw.table!;
    const defaultAssembly = raw.defaultAssembly!;
    const foregroundCandidates = raw.foregroundCandidates!;
    for (const [field, path] of [['ground.groundMat.asset', ground.groundMat.asset], ['ground.cushion.asset', ground.cushion.asset], ['table.asset', table.asset]] as const) {
      assert(typeof path === 'string' && path.startsWith(`themes/${raw.themeId}/`) && /\.png$/i.test(path) && !path.split('/').includes('..'), `${field} must reference a PNG inside the current theme directory`);
    }
    assert(defaultAssembly.groundMatId === ground.groundMat.id, 'defaultAssembly.groundMatId must reference ground.groundMat.id');
    assert(defaultAssembly.cushionId === ground.cushion.id, 'defaultAssembly.cushionId must reference ground.cushion.id');
    const leftSetIds = new Set(Object.values(foregroundCandidates.left).map(({ setId }) => setId));
    const rightSetIds = new Set(Object.values(foregroundCandidates.right).map(({ setId }) => setId));
    for (const setId of raw.foregroundSetIds ?? []) assert(leftSetIds.has(setId) && rightSetIds.has(setId), `foregroundSetIds entry ${setId} must have both left and right candidates`);
    for (const side of ['left', 'right'] as const) {
      assert(Boolean(foregroundCandidates[side][defaultAssembly.foreground[side].foregroundId]), `default foreground ${side}.${defaultAssembly.foreground[side].foregroundId} is missing from its candidate object`);
    }
    const { usableArea } = table.surface;
    for (const [itemId, offering] of Object.entries(defaultAssembly.offerings ?? {})) {
      const { u, v } = offering.position;
      assert(u >= usableArea.uMin && u <= usableArea.uMax && v >= usableArea.vMin && v <= usableArea.vMax, `default offering ${itemId} must fall inside table.surface.usableArea`);
    }
    return;
  }
  assert(Boolean(raw.wall && raw.ground && raw.table && raw.defaultAssembly && raw.foregroundCandidates), 'split themes require wall, ground, table, defaultAssembly and foregroundCandidates');
  const wall = raw.wall!;
  const ground = raw.ground!;
  const table = raw.table!;
  const defaultAssembly = raw.defaultAssembly!;
  const foregroundCandidates = raw.foregroundCandidates!;
  const wallpaper = wall.wallpaper;
  if (wallpaper.video !== undefined) {
    const videoPath = wallpaper.video?.asset;
    assert(typeof videoPath === 'string' && videoPath.startsWith(`themes/${raw.themeId}/`) && /\.mp4$/i.test(videoPath) && !videoPath.split('/').includes('..'), 'wall.wallpaper.video.asset must reference an MP4 inside the current theme directory');
    assert(typeof wallpaper.assets?.phone === 'string' && /\.png$/i.test(wallpaper.assets.phone), 'video wallpapers require a static assets.phone PNG poster');
  }
  const bottomExtensionRatio = wall.frame.bottomExtensionRatio;
  assert(bottomExtensionRatio === undefined || (Number.isFinite(bottomExtensionRatio) && bottomExtensionRatio >= 0 && bottomExtensionRatio <= 0.15), 'wall.frame.bottomExtensionRatio must be between 0 and 0.15');
  const floor = ground.floor;
  assert(Boolean(floor), 'split themes require ground.floor; use null only when a single scene background already contains the floor');
  const floorSpec = floor!;
  assert(typeof floorSpec.asset === 'string' && floorSpec.asset.startsWith(`themes/${raw.themeId}/`) && /\.png$/i.test(floorSpec.asset) && !floorSpec.asset.split('/').includes('..'), 'ground.floor.asset must reference a PNG inside the current theme directory');
  assert(floorSpec.bakedLighting === undefined || typeof floorSpec.bakedLighting === 'boolean', 'ground.floor.bakedLighting must be a boolean');
  assert(!('mode' in floorSpec) && !('tileSize' in floorSpec), 'ground.floor no longer supports legacy material modes or tile sizes');
  assert(defaultAssembly.wallpaperId === wall.wallpaper.id, 'defaultAssembly.wallpaperId must reference wall.wallpaper.id');
  assert(defaultAssembly.frameId === wall.frame.id, 'defaultAssembly.frameId must reference wall.frame.id');
  assert(defaultAssembly.wallpaperDecorationId === 'none' || wall.wallpaperDecorations.some(({ id }) => id === defaultAssembly.wallpaperDecorationId), 'defaultAssembly.wallpaperDecorationId must reference a wallpaper decoration or "none"');
  assert(defaultAssembly.wallDecorationId === 'none' || wall.frameDecorations.some(({ id }) => id === defaultAssembly.wallDecorationId), 'defaultAssembly.wallDecorationId must reference a frame decoration or "none"');
  assert(defaultAssembly.groundMatId === ground.groundMat.id, 'defaultAssembly.groundMatId must reference ground.groundMat.id');
  assert(defaultAssembly.cushionId === ground.cushion.id, 'defaultAssembly.cushionId must reference ground.cushion.id');
  const leftSetIds = new Set(Object.values(foregroundCandidates.left).map(({ setId }) => setId));
  const rightSetIds = new Set(Object.values(foregroundCandidates.right).map(({ setId }) => setId));
  for (const setId of raw.foregroundSetIds ?? []) {
    assert(leftSetIds.has(setId) && rightSetIds.has(setId), `foregroundSetIds entry ${setId} must have both left and right candidates`);
  }
  for (const side of ['left', 'right'] as const) {
    const selected = defaultAssembly.foreground[side].foregroundId;
    assert(Boolean(foregroundCandidates[side][selected]), `default foreground ${side}.${selected} is missing from its candidate object`);
  }
  const { usableArea } = table.surface;
  for (const [itemId, offering] of Object.entries(defaultAssembly.offerings ?? {})) {
    const { u, v } = offering.position;
    assert(u >= 0 && u <= 1 && v >= 0 && v <= 1, `default offering ${itemId} coordinates must be within 0..1`);
    assert(u >= usableArea.uMin && u <= usableArea.uMax && v >= usableArea.vMin && v <= usableArea.vMax, `default offering ${itemId} must fall inside table.surface.usableArea`);
  }
  const points = Object.values(table.surface.assetQuad);
  assert(points.every(({ x, y }) => x >= 0 && x <= 1 && y >= 0 && y <= 1), 'table.surface.assetQuad points must be normalized to 0..1');
};

const normalizeTheme = (raw: RawThemeManifest): SceneThemeDefinition => {
  if (raw.schemaVersion !== 1) throw new Error(`Unsupported theme schemaVersion: ${raw.schemaVersion}`);
  validateThemeManifest(raw);
  if (raw.sceneBackground) {
    const ground = raw.ground!;
    const table = raw.table!;
    const foregroundConfig = raw.foregroundCandidates!;
    const rawAssembly = raw.defaultAssembly!;
    const groundAsset = (rawAsset: RawAsset & SceneThemeGroundAsset): SceneThemeGroundAsset => ({
      ...rawAsset,
      url: publicUrl(rawAsset.asset ?? rawAsset.url),
      widthRatio: rawAsset.widthRatio,
      bottomRatio: rawAsset.bottomRatio,
      previewUrl: publicUrl(rawAsset.previewUrl ?? rawAsset.asset ?? rawAsset.url),
    });
    const foregroundCandidates: SceneForegroundDefinition[] = (['left', 'right'] as const).flatMap((side) =>
      Object.entries(foregroundConfig[side]).map(([id, candidate]) => ({
        ...candidate,
        id,
        themeId: raw.themeId,
        side,
        previewUrl: publicUrl(candidate.previewUrl ?? candidate.asset),
        asset: { url: publicUrl(candidate.asset), fit: 'width', widthRatio: candidate.widthRatio ?? 0.34, alpha: 1 },
      }))
    );
    const { frameId, offerings, foreground, ...assembly } = rawAssembly;
    return {
      id: raw.themeId,
      name: raw.name,
      poeticTitle: raw.poeticTitle,
      iconText: raw.iconText,
      desc: raw.desc,
      tag: raw.tag,
      sceneBackground: publicUrl(raw.sceneBackground.asset),
      components: {
        groundMat: {
          id: ground.groundMat.id,
          name: ground.groundMat.name,
          poeticTitle: ground.groundMat.poeticTitle ?? '',
          description: ground.groundMat.description ?? '',
          previewUrl: publicUrl(ground.groundMat.previewUrl ?? ground.groundMat.asset ?? ''),
          asset: groundAsset(ground.groundMat),
        },
        cushion: {
          id: ground.cushion.id,
          name: ground.cushion.name,
          poeticTitle: ground.cushion.poeticTitle ?? '',
          description: ground.cushion.description ?? '',
          previewUrl: publicUrl(ground.cushion.previewUrl ?? ground.cushion.asset ?? ''),
          asset: groundAsset(ground.cushion),
        },
        wallpaperDecorations: [],
        frameDecorations: [],
      },
      table: { ...table, asset: publicUrl(table.asset) },
      tableAssetUrl: publicUrl(table.asset),
      foregroundCandidates,
      foregroundSetIds: raw.foregroundSetIds ?? [],
      defaultForegroundSetId: raw.defaultForegroundSetId,
      defaultAssembly: {
        ...assembly,
        wallSceneryId: frameId,
        foreground: {
          left: { instanceId: `default-left-${foreground.left.foregroundId}`, side: 'left', order: 0, ...foreground.left },
          right: { instanceId: `default-right-${foreground.right.foregroundId}`, side: 'right', order: 0, ...foreground.right },
        },
      },
      defaultOfferings: offerings,
      preset: raw.preset,
      lightRig: {
        ...raw.lightRig,
        keyColor: parseColor(raw.lightRig.keyColor),
        ambientColor: parseColor(raw.lightRig.ambientColor),
      },
    };
  }
  const wall = raw.wall!;
  const ground = raw.ground!;
  const floor = ground.floor!;
  const table = raw.table!;
  const foregroundConfig = raw.foregroundCandidates!;
  const rawAssembly = raw.defaultAssembly!;
  const wallpaper = {
    ...withAssetUrls(wall.wallpaper),
    ...(wall.wallpaper.video ? { video: { url: publicUrl(wall.wallpaper.video.asset) } } : {}),
    id: wall.wallpaper.id,
    name: wall.wallpaper.name,
    poeticTitle: wall.wallpaper.poeticTitle ?? '',
    description: wall.wallpaper.description ?? '',
    previewUrl: publicUrl(wall.wallpaper.previewUrl ?? wall.wallpaper.assets?.phone ?? ''),
    fit: wall.wallpaper.fit ?? 'cover',
  } satisfies SceneThemeViewportAsset;
  const frame = {
    ...withAssetUrls(wall.frame),
    id: wall.frame.id,
    name: wall.frame.name,
    poeticTitle: wall.frame.poeticTitle ?? '',
    description: wall.frame.description ?? '',
    previewUrl: publicUrl(wall.frame.previewUrl ?? wall.frame.assets?.phone ?? ''),
    fit: wall.frame.fit ?? 'wall-frame',
    x: wall.frame.position?.x,
    y: wall.frame.position?.y,
    widthRatio: wall.frame.position?.widthRatio,
    responsiveWidthRatios: wall.frame.responsiveWidthRatios,
    bottomExtensionRatio: wall.frame.bottomExtensionRatio,
    alpha: wall.frame.alpha,
  } satisfies SceneThemeViewportAsset;
  const groundAsset = (rawAsset: RawAsset & SceneThemeGroundAsset): SceneThemeGroundAsset => ({
    ...rawAsset,
    url: publicUrl(rawAsset.asset ?? rawAsset.url),
    widthRatio: rawAsset.widthRatio,
    bottomRatio: rawAsset.bottomRatio,
    previewUrl: publicUrl(rawAsset.previewUrl ?? rawAsset.asset ?? rawAsset.url),
  });
  const wallpaperDecorations = wall.wallpaperDecorations.map((item) => ({
    id: item.id,
    name: item.name,
    poeticTitle: item.poeticTitle ?? '',
    description: item.description ?? '',
    previewUrl: publicUrl(item.previewUrl ?? item.backAsset?.assets?.phone ?? item.backAsset?.asset ?? ''),
    backAsset: portraitAsset(item.backAsset ?? item),
    ...(item.frontAsset ? { frontAsset: portraitAsset(item.frontAsset) } : {}),
  }));
  const frameDecorations = wall.frameDecorations.map((item) => ({
    id: item.id,
    name: item.name,
    poeticTitle: item.poeticTitle ?? '',
    description: item.description ?? '',
    previewUrl: publicUrl(item.previewUrl ?? item.assets?.phone ?? item.asset ?? ''),
    asset: {
      ...withAssetUrls(item),
      fit: item.fit ?? 'width',
      alpha: item.alpha,
      wallParts: item.wallParts,
    } satisfies SceneThemeViewportAsset,
  }));
  const foregroundCandidates: SceneForegroundDefinition[] = (['left', 'right'] as const).flatMap((side) =>
    Object.entries(foregroundConfig[side]).map(([id, candidate]) => ({
      ...candidate,
      id,
      themeId: raw.themeId,
      side,
      previewUrl: publicUrl(candidate.previewUrl ?? candidate.asset),
      asset: { url: publicUrl(candidate.asset), fit: 'width', widthRatio: candidate.widthRatio ?? 0.34, alpha: 1 },
    }))
  );
  const { frameId, offerings, foreground, ...assembly } = rawAssembly;
  return {
    id: raw.themeId,
    name: raw.name,
    poeticTitle: raw.poeticTitle,
    iconText: raw.iconText,
    desc: raw.desc,
    tag: raw.tag,
    wall: {
      wallpaper,
      portrait: wall.portrait,
      scenery: [frame],
    },
    components: {
      wallpaperDecorations,
      frameDecorations,
      groundMat: {
        id: ground.groundMat.id,
        name: ground.groundMat.name,
        poeticTitle: ground.groundMat.poeticTitle ?? '',
        description: ground.groundMat.description ?? '',
        previewUrl: publicUrl(ground.groundMat.previewUrl ?? ground.groundMat.asset ?? ''),
        asset: groundAsset(ground.groundMat),
      },
      cushion: {
        id: ground.cushion.id,
        name: ground.cushion.name,
        poeticTitle: ground.cushion.poeticTitle ?? '',
        description: ground.cushion.description ?? '',
        previewUrl: publicUrl(ground.cushion.previewUrl ?? ground.cushion.asset ?? ''),
        asset: groundAsset(ground.cushion),
      },
    },
    foregroundCandidates,
    foregroundSetIds: raw.foregroundSetIds ?? [],
    defaultForegroundSetId: raw.defaultForegroundSetId,
    floorImage: {
      url: publicUrl(floor.asset),
      bakedLighting: floor.bakedLighting,
      baseColor: parseColor(floor.baseColor),
      baseboard: {
        color: parseColor(floor.baseboard.color),
        highlight: parseColor(floor.baseboard.highlight),
      },
    },
    table: { ...table, asset: publicUrl(table.asset) },
    tableAssetUrl: publicUrl(table.asset),
    defaultAssembly: {
      ...assembly,
      wallSceneryId: frameId,
      foreground: {
        left: { instanceId: `default-left-${foreground.left.foregroundId}`, side: 'left', order: 0, ...foreground.left },
        right: { instanceId: `default-right-${foreground.right.foregroundId}`, side: 'right', order: 0, ...foreground.right },
      },
    },
    defaultOfferings: offerings,
    preset: raw.preset,
    lightRig: {
      ...raw.lightRig,
      keyColor: parseColor(raw.lightRig.keyColor),
      ambientColor: parseColor(raw.lightRig.ambientColor),
    },
  };
};

export const SCENE_THEME_REGISTRY = registry as Record<SceneThemeId, SceneThemeDefinition>;
export const SCENE_THEME_OPTIONS = options;

export const loadSceneThemes = (): Promise<void> => {
  if (loadPromise) return loadPromise;
  loadPromise = (async () => {
    const catalogResponse = await fetch('/themes/catalog.json');
    if (!catalogResponse.ok) throw new Error(`Failed to load theme catalog (${catalogResponse.status})`);
    const catalog = parseJsonc<ThemeCatalog>(await catalogResponse.text(), '/themes/catalog.json');
    if (catalog.schemaVersion !== 1 || !Array.isArray(catalog.themes) || catalog.themes.length === 0) {
      throw new Error('Theme catalog must declare at least one manifest with schemaVersion 1');
    }
    const loaded = await Promise.all(catalog.themes.map(async ({ id, manifest }) => {
      const path = publicUrl(manifest);
      const response = await fetch(path);
      if (!response.ok) throw new Error(`Failed to load theme manifest ${path} (${response.status})`);
      const normalized = normalizeTheme(parseJsonc<RawThemeManifest>(await response.text(), path));
      if (normalized.id !== id) throw new Error(`Theme catalog id ${id} does not match ${path}`);
      return normalized;
    }));
    for (const key of Object.keys(registry)) delete registry[key];
    options.splice(0, options.length, ...loaded);
    for (const theme of loaded) registry[theme.id] = theme;
  })().catch((error) => {
    loadPromise = null;
    throw error;
  });
  return loadPromise;
};

export const getSceneTheme = (id: SceneThemeId): SceneThemeDefinition => {
  const theme = registry[id] ?? registry.classic_dawn ?? options[0];
  if (!theme) throw new Error('Scene theme manifests have not loaded; call loadSceneThemes() before mounting the app.');
  return theme;
};
