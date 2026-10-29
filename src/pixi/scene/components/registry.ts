/**
 * @file registry.ts
 * @description 通用部件目录。所有主题部件选项都从已加载的主题 manifest 汇总。
 */
import type {
  SceneAssemblyPart,
  SceneAssemblySelection,
  SceneForegroundDefinition,
  SceneForegroundInstance,
  SceneForegroundSide,
  SceneThemeGroundAsset,
  SceneThemePortraitAsset,
  SceneThemeViewportAsset,
} from '../../../types';
import { SCENE_THEME_OPTIONS, getSceneTheme } from '../themes';

export interface SceneViewportComponentOption {
  id: string;
  part: Exclude<SceneAssemblyPart, 'groundMat' | 'cushion' | 'wallpaperDecoration'>;
  name: string;
  poeticTitle: string;
  description: string;
  previewUrl: string;
  asset: SceneThemeViewportAsset;
}

export interface ScenePortraitComponentOption {
  id: string;
  part: 'wallpaperDecoration';
  name: string;
  poeticTitle: string;
  description: string;
  previewUrl: string;
  backAsset: SceneThemePortraitAsset;
  frontAsset?: SceneThemePortraitAsset;
}

export interface SceneGroundComponentOption {
  id: string;
  part: 'groundMat' | 'cushion';
  name: string;
  poeticTitle: string;
  description: string;
  previewUrl: string;
  asset: SceneThemeGroundAsset;
}

const uniqueById = <T extends { id: string }>(items: T[]): T[] =>
  [...new Map(items.map((item) => [item.id, item])).values()];

const viewportOptions = (part: SceneViewportComponentOption['part']): SceneViewportComponentOption[] =>
  uniqueById(SCENE_THEME_OPTIONS.flatMap((theme) => {
    const assets = part === 'wallpaper'
      ? [theme.wall?.wallpaper]
      : part === 'wallScenery'
        ? theme.wall?.scenery ?? []
        : [];
    return assets.filter((asset): asset is SceneThemeViewportAsset => Boolean(asset?.id)).map((asset) => ({
      id: asset.id!,
      part,
      name: asset.name ?? asset.id!,
      poeticTitle: asset.poeticTitle ?? '',
      description: asset.description ?? '',
      previewUrl: asset.previewUrl ?? asset.url,
      asset,
    }));
  }));

export const WALLPAPER_OPTIONS = viewportOptions('wallpaper');
export const WALL_SCENERY_OPTIONS = viewportOptions('wallScenery');

export const WALLPAPER_DECORATION_OPTIONS: ScenePortraitComponentOption[] = uniqueById(
  SCENE_THEME_OPTIONS.flatMap((theme) => (theme.components?.wallpaperDecorations ?? []).map((option) => ({
    ...option,
    part: 'wallpaperDecoration' as const,
  }))).concat([{
    id: 'none', part: 'wallpaperDecoration', name: '不添加', poeticTitle: '留白',
    description: '不叠加窗花装饰。', previewUrl: '', backAsset: { url: '', widthInPortraits: 0 },
  }])
);

export const WALL_DECORATION_OPTIONS: SceneViewportComponentOption[] = uniqueById(
  SCENE_THEME_OPTIONS.flatMap((theme) => (theme.components?.frameDecorations ?? []).map((option) => ({
    ...option,
    part: 'wallDecoration' as const,
  }))).concat([{
    id: 'none', part: 'wallDecoration', name: '不添加', poeticTitle: '素面',
    description: '不叠加框架附件。', previewUrl: '', asset: { url: '', fit: 'width', alpha: 0 },
  }])
);

export const GROUND_MAT_OPTIONS: SceneGroundComponentOption[] = uniqueById(
  SCENE_THEME_OPTIONS.flatMap((theme) => theme.components?.groundMat ? [{
    ...theme.components.groundMat,
    part: 'groundMat' as const,
  }] : [])
);

export const CUSHION_OPTIONS: SceneGroundComponentOption[] = uniqueById(
  SCENE_THEME_OPTIONS.flatMap((theme) => theme.components?.cushion ? [{
    ...theme.components.cushion,
    part: 'cushion' as const,
  }] : [])
);

export const SCENE_FOREGROUND_OPTIONS: SceneForegroundDefinition[] = uniqueById(
  SCENE_THEME_OPTIONS.flatMap((theme) => theme.foregroundCandidates ?? [])
);

export const SCENE_COMPONENT_GROUPS = [
  { part: 'wallpaper' as const, name: '墙纸', options: WALLPAPER_OPTIONS },
  { part: 'wallpaperDecoration' as const, name: '墙纸覆盖装饰', options: WALLPAPER_DECORATION_OPTIONS },
  { part: 'wallScenery' as const, name: '墙面造景', options: WALL_SCENERY_OPTIONS },
  { part: 'wallDecoration' as const, name: '造景附件', options: WALL_DECORATION_OPTIONS },
  { part: 'groundMat' as const, name: '席毯', options: GROUND_MAT_OPTIONS },
  { part: 'cushion' as const, name: '蒲团 / 坐垫', options: CUSHION_OPTIONS },
];

export function getSceneComponentOption(
  part: Exclude<SceneAssemblyPart, 'groundMat' | 'cushion' | 'wallpaperDecoration'>,
  id: string
): SceneViewportComponentOption | undefined;
export function getSceneComponentOption(part: 'wallpaperDecoration', id: string): ScenePortraitComponentOption | undefined;
export function getSceneComponentOption(part: 'groundMat' | 'cushion', id: string): SceneGroundComponentOption | undefined;
export function getSceneComponentOption(part: SceneAssemblyPart, id: string) {
  if (id === 'none' && (part === 'wallpaperDecoration' || part === 'wallDecoration')) return undefined;
  switch (part) {
    case 'wallpaper': return WALLPAPER_OPTIONS.find((option) => option.id === id);
    case 'wallpaperDecoration': return WALLPAPER_DECORATION_OPTIONS.find((option) => option.id === id);
    case 'wallScenery': return WALL_SCENERY_OPTIONS.find((option) => option.id === id);
    case 'wallDecoration': return WALL_DECORATION_OPTIONS.find((option) => option.id === id);
    case 'groundMat': return GROUND_MAT_OPTIONS.find((option) => option.id === id);
    case 'cushion': return CUSHION_OPTIONS.find((option) => option.id === id);
  }
}

export const getSceneForeground = (id: string): SceneForegroundDefinition | undefined =>
  SCENE_FOREGROUND_OPTIONS.find((option) => option.id === id);

const defaultForeground = (side: SceneForegroundSide, foregroundId: string): SceneForegroundInstance => ({
  instanceId: `default-${side}-${foregroundId}`,
  foregroundId,
  side,
  order: 0,
  offsetX: getSceneForeground(foregroundId)?.referenceCanvas ? 0 : side === 'left' ? -0.36 : 0,
});

/** Read the selected theme's JSON assembly; optional set id only changes its foreground pair. */
export const createDefaultSceneAssembly = (
  foregroundSetId?: string,
  themeId: string = 'classic_dawn'
): SceneAssemblySelection => {
  const config = getSceneTheme(themeId as never);
  const base = config.defaultAssembly;
  if (!base) throw new Error(`Theme ${themeId} has no defaultAssembly in its manifest`);
  const leftId = foregroundSetId ? `${foregroundSetId}_left` : base.foreground.left.foregroundId;
  const rightId = foregroundSetId ? `${foregroundSetId}_right` : base.foreground.right.foregroundId;
  return {
    ...base,
    foreground: {
      left: foregroundSetId ? defaultForeground('left', leftId) : { ...base.foreground.left },
      right: foregroundSetId ? defaultForeground('right', rightId) : { ...base.foreground.right },
    },
  };
};
