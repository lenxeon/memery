/**
 * @file registry.ts
 * @description 场景可换部件目录。UI 只选择 id，Pixi 根据目录装配真实 PNG。
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

export interface SceneViewportComponentOption {
  id: string;
  part: Exclude<SceneAssemblyPart, 'ground' | 'wallpaperDecoration'>;
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
  frontAsset: SceneThemePortraitAsset;
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

const viewport = (
  option: SceneViewportComponentOption
): SceneViewportComponentOption => option;
const ground = (option: SceneGroundComponentOption): SceneGroundComponentOption => option;
const portrait = (option: ScenePortraitComponentOption): ScenePortraitComponentOption => option;

export const WALLPAPER_OPTIONS = [
  viewport({ id: 'ink_warm_silk', part: 'wallpaper', name: '水墨梅山', poeticTitle: '远岫含烟',
    description: '暖绢底色承托朱日、层叠墨山、雾谷和水岸。', previewUrl: '/themes/classic_dawn/wallpapers/phone/ink-landscape-render-match.png',
    asset: { url: '/themes/classic_dawn/wallpapers/phone/ink-landscape-render-match.png', fit: 'cover',
      responsiveAssets: { phone: '/themes/classic_dawn/wallpapers/phone/ink-landscape-render-match.png', tablet: '/themes/classic_dawn/wallpapers/tablet/ink-landscape-render-match.png' } } }),
] as const;

export const WALLPAPER_DECORATION_OPTIONS = [
  portrait({ id: 'plum_encircling', part: 'wallpaperDecoration', name: '梅枝流芳', poeticTitle: '春信绕影',
    description: '白梅从左上环抱遗像，保留中心透明。', previewUrl: '/themes/classic_dawn/wall-overlays/plum-encircling.png',
    backAsset: { url: '/themes/classic_dawn/wall-overlays/plum-encircling.png', widthInPortraits: 3.1, alpha: 0.88 },
    frontAsset: { url: '/themes/classic_dawn/wall-overlays/plum-encircling-front.png', widthInPortraits: 1.7, dxInPortraits: -0.42, dyInPortraits: 0.26, alpha: 0.9 } }),
] as const;

export const WALL_SCENERY_OPTIONS = [
  viewport({ id: 'moon_gate_rosewood', part: 'wallScenery', name: '月洞紫檀', poeticTitle: '圆门纳景',
    description: '洞门开口展示墙纸；两侧格扇以素纸衬底铺满，不透出底层远景；手机与平板分别构图并裁齐墙地交界。', previewUrl: '/themes/classic_dawn/wall-scenery/phone/moon-gate-rosewood-render-match.png',
    asset: { url: '/themes/classic_dawn/wall-scenery/phone/moon-gate-rosewood-render-match.png', fit: 'wall-frame', responsiveWidthRatios: { phone: 1, tablet: 1 },
      responsiveAssets: { phone: '/themes/classic_dawn/wall-scenery/phone/moon-gate-rosewood-render-match.png', tablet: '/themes/classic_dawn/wall-scenery/tablet/moon-gate-rosewood-render-match.png' } } }),
] as const;

export const WALL_DECORATION_OPTIONS = [
  viewport({ id: 'palace_fretwork_lamps', part: 'wallDecoration', name: '回纹宫灯', poeticTitle: '暖阁长明',
    description: '左右各一盏完整的木框宫灯，作为框架附件按墙面坐标统一缩放，灯面由 Pixi 添加微弱暖光。', previewUrl: '/themes/classic_dawn/wall-decor/palace-fretwork-lamps-unlit.png',
    asset: { url: '/themes/classic_dawn/wall-decor/palace-fretwork-lamps-unlit.png', fit: 'width', alpha: 1,
      wallParts: [
        { frame: { x: 16, y: 52, width: 222, height: 883 }, anchor: { x: 0.10, y: 0.32, widthRatio: 0.085 } },
        { frame: { x: 1229, y: 52, width: 222, height: 883 }, anchor: { x: 0.90, y: 0.32, widthRatio: 0.085 } },
      ] } }),
] as const;

const GROUND_MAT_GEOMETRY = { widthRatio: 0.62, bottomRatio: 0.045 } as const;
const CUSHION_GEOMETRY = { widthRatio: 0.19, bottomRatio: 0.055 } as const;

export const GROUND_MAT_OPTIONS = [
  ground({ id: 'clear_rush_long_mat', part: 'groundMat', name: '清篾长席', poeticTitle: '清席承步',
    description: '以整体渲染稿为准，采用真实细篾编织与窄木边；席面低矮铺在桌前地面。', previewUrl: '/themes/classic_dawn/mats/clear-rush-long-mat-clean.png',
    asset: { url: '/themes/classic_dawn/mats/clear-rush-long-mat-clean.png', ...GROUND_MAT_GEOMETRY } }),
] as const;

export const CUSHION_OPTIONS = [
  ground({ id: 'woven_round_cushion', part: 'cushion', name: '藤编蒲团', poeticTitle: '蒲影静坐',
    description: '低矮的圆形藤编蒲团，清楚呈现编织顶面与短侧壁，单独叠放在席面上。', previewUrl: '/themes/classic_dawn/cushions/woven-round-cushion-clean.png',
    asset: { url: '/themes/classic_dawn/cushions/woven-round-cushion-clean.png', ...CUSHION_GEOMETRY } }),
] as const;

const foreground = (definition: SceneForegroundDefinition): SceneForegroundDefinition => definition;
// Keep foreground assets crisp; depth is expressed through placement and alpha,
// while any optional focus blur remains a separate runtime effect.
const FOREGROUND_BLUR_STRENGTH = 0.15;

export const SCENE_FOREGROUND_OPTIONS: SceneForegroundDefinition[] = [
  foreground({ id: 'warm_foliage_left', side: 'left', name: '暖庭枝影·左', poeticTitle: '近叶含光', description: '左侧绿叶与浅色花朵，形成近景层次。',
    previewUrl: '/themes/classic_dawn/foregrounds/warm-foliage-left-clean.png', asset: { url: '/themes/classic_dawn/foregrounds/warm-foliage-left-clean.png', fit: 'width', widthRatio: 0.44, alpha: 1, blur: FOREGROUND_BLUR_STRENGTH } }),
  foreground({ id: 'warm_foliage_right', side: 'right', name: '暖庭枝影·右', poeticTitle: '夕照入庭', description: '右侧竹叶与浅色花朵，形成近景层次。',
    previewUrl: '/themes/classic_dawn/foregrounds/warm-foliage-right-clean.png', asset: { url: '/themes/classic_dawn/foregrounds/warm-foliage-right-clean.png', fit: 'width', widthRatio: 0.44, alpha: 1, blur: FOREGROUND_BLUR_STRENGTH } }),
];

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
export function getSceneComponentOption(
  part: SceneAssemblyPart,
  id: string
): SceneViewportComponentOption | ScenePortraitComponentOption | SceneGroundComponentOption | undefined;
export function getSceneComponentOption(part: SceneAssemblyPart, id: string) {
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
});

export const createDefaultSceneAssembly = (): SceneAssemblySelection => ({
  wallpaperId: 'ink_warm_silk',
  wallpaperDecorationId: 'plum_encircling',
  wallSceneryId: 'moon_gate_rosewood',
  wallDecorationId: 'palace_fretwork_lamps',
  groundMatId: 'clear_rush_long_mat',
  cushionId: 'woven_round_cushion',
  foreground: {
    left: [defaultForeground('left', 'warm_foliage_left')],
    right: [defaultForeground('right', 'warm_foliage_right')],
  },
});
