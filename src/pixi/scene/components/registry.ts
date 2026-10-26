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
    description: '淡色梅枝从左上入画，手机和平板使用各自构图。', previewUrl: '/themes/classic_dawn/wall-overlays/phone/plum-blossom-branch.png',
    backAsset: { url: '/themes/classic_dawn/wall-overlays/phone/plum-blossom-branch.png',
      responsiveAssets: { phone: '/themes/classic_dawn/wall-overlays/phone/plum-blossom-branch.png', tablet: '/themes/classic_dawn/wall-overlays/tablet/plum-blossom-branch.png' },
      widthInPortraits: 3.5, dxInPortraits: -1.0, dyInPortraits: -1.15, alpha: 1 },
  }),
] as const;

export const WALL_SCENERY_OPTIONS = [
  viewport({ id: 'moon_gate_rosewood', part: 'wallScenery', name: '月洞紫檀', poeticTitle: '圆门纳景',
    description: '洞门开口展示墙纸；两侧格扇以素纸衬底铺满，不透出底层远景；手机与平板分别构图并裁齐墙地交界。', previewUrl: '/themes/classic_dawn/wall-scenery/phone/moon-gate-rosewood-render-match.png',
    asset: { url: '/themes/classic_dawn/wall-scenery/phone/moon-gate-rosewood-render-match.png', fit: 'wall-frame', responsiveWidthRatios: { phone: 1, tablet: 1 },
      responsiveAssets: { phone: '/themes/classic_dawn/wall-scenery/phone/moon-gate-rosewood-render-match.png', tablet: '/themes/classic_dawn/wall-scenery/tablet/moon-gate-rosewood-render-match.png' } } }),
] as const;

export const WALL_DECORATION_OPTIONS = [
  viewport({ id: 'palace_fretwork_lamps', part: 'wallDecoration', name: '回纹宫灯', poeticTitle: '暖阁长明',
    description: '左右各一盏薄木框暖光宫灯，灯纸为主体，独立裁切并锚定到木框两侧。', previewUrl: '/themes/classic_dawn/wall-decor/palace-fretwork-lamps.png',
    asset: { url: '/themes/classic_dawn/wall-decor/palace-fretwork-lamps.png', fit: 'width', alpha: 1,
      wallParts: [
        // Center lamps inside the slatted mounting panels; exclude the outer solid edge rails.
        { frame: { x: 70, y: 12, width: 192, height: 877 }, anchor: {
          x: 0.10, y: 0.32, widthRatio: 0.07,
          centerRegionByProfile: { phone: { left: 32, right: 163 }, tablet: { left: 62, right: 257 } },
        } },
        { frame: { x: 530, y: 12, width: 190, height: 877 }, anchor: {
          x: 0.90, y: 0.32, widthRatio: 0.07,
          centerRegionByProfile: { phone: { left: 1016, right: 1147 }, tablet: { left: 1791, right: 1986 } },
        } },
      ] } }),
] as const;

const GROUND_MAT_GEOMETRY = { widthRatio: 1.20, bottomRatio: 0.045 } as const;
const CUSHION_GEOMETRY = { widthRatio: 0.32, bottomRatio: 0.065 } as const;

export const GROUND_MAT_OPTIONS = [
  ground({ id: 'clear_rush_long_mat', part: 'groundMat', name: '清篾长席', poeticTitle: '清席承步',
    description: '低机位前宽后窄的细篾长席，铺面覆盖供桌桌脚与蒲团。', previewUrl: '/themes/classic_dawn/mats/clear-rush-long-mat-clean.png',
    asset: { url: '/themes/classic_dawn/mats/clear-rush-long-mat-clean.png', ...GROUND_MAT_GEOMETRY } }),
] as const;

export const CUSHION_OPTIONS = [
  ground({ id: 'woven_round_cushion', part: 'cushion', name: '藤编蒲团', poeticTitle: '蒲影静坐',
    description: '低机位下厚实饱满的藤编蒲团，顶部螺旋编织、前侧多层编边清晰，单独叠放在席面上。', previewUrl: '/themes/classic_dawn/cushions/woven-round-cushion-clean.png',
    asset: { url: '/themes/classic_dawn/cushions/woven-round-cushion-clean.png', ...CUSHION_GEOMETRY } }),
] as const;

const foreground = (definition: SceneForegroundDefinition): SceneForegroundDefinition => definition;
// Foreground foliage assets already contain their soft near-focus treatment;
// do not add a runtime filter to these full-height transparent sprites.

const foregroundHeight = { defaultHeightRatio: 0.22, minHeightRatio: 0.18, maxHeightRatio: 0.4 } as const;
const foregroundBaseHeightRatio = 0.4;
const rightForegroundScaleRatio = 0.74;

const foregroundPair = (
  setId: string,
  name: string,
  poeticTitle: string,
  plant: string,
  description: string
): SceneForegroundDefinition[] => (['left', 'right'] as const).map((side) => {
  const isLeft = side === 'left';
  const assetPath = `/scene-assets/foregrounds/${setId}/${side}.png`;
  // Bump this value when overwriting a public asset so browser and Pixi caches reload it.
  const url = isLeft
    ? `${assetPath}?v=20261026-left-foreground-blur-r4`
    : `${assetPath}?v=20261026-right-from-left-half-r1`;
  return foreground({
    id: `${setId}_${side}`,
    setId,
    themeId: 'classic_dawn',
    name: `${name}·${side === 'left' ? '左' : '右'}`,
    poeticTitle,
    description,
    plant,
    focusTreatment: isLeft
      ? '五组素材统一追加高斯模糊（半径 4 px）；玉兰沿用既有虚化版本；虚化烘焙进 PNG，不使用运行时模糊滤镜。'
      : '使用对应左图左半幅原像素，放置在同尺寸右侧画布的右半边；不缩放、不镜像，焦外虚化烘焙在 PNG。',
    ...foregroundHeight,
    defaultHeightRatio: isLeft
      ? foregroundBaseHeightRatio
      : foregroundBaseHeightRatio * rightForegroundScaleRatio,
    bottomOverflowRatio: 0.12,
    side,
    previewUrl: url,
    asset: { url, fit: 'width', widthRatio: 0.34, alpha: 1 },
  });
});

export const SCENE_FOREGROUND_OPTIONS: SceneForegroundDefinition[] = [
  foreground({ id: 'warm_foliage_left', setId: 'warm_foliage', themeId: 'classic_dawn', side: 'left',
    name: '暖庭枝影·左', poeticTitle: '近叶含光', description: '左侧暖色枝叶与浅花，作为经典主题的近景。',
    plant: '暖庭花叶', focusTreatment: '近处花叶轻柔，主体仍可辨；不使用运行时模糊滤镜。', ...foregroundHeight,
    previewUrl: '/themes/classic_dawn/foregrounds/warm-foliage-left-clean.png',
    asset: { url: '/themes/classic_dawn/foregrounds/warm-foliage-left-clean.png', fit: 'width', widthRatio: 0.34, alpha: 1 } }),
  foreground({ id: 'warm_foliage_right', setId: 'warm_foliage', themeId: 'classic_dawn', side: 'right',
    name: '暖庭枝影·右', poeticTitle: '夕照入庭', description: '右侧暖色枝叶与浅花，作为经典主题的近景。',
    plant: '暖庭花叶', focusTreatment: '近处花叶轻柔，主体仍可辨；不使用运行时模糊滤镜。', ...foregroundHeight,
    previewUrl: '/themes/classic_dawn/foregrounds/warm-foliage-right-clean.png',
    asset: { url: '/themes/classic_dawn/foregrounds/warm-foliage-right-clean.png', fit: 'width', widthRatio: 0.34, alpha: 1 } }),
  ...foregroundPair('plum_blossom', '梅枝暖雪', '春信入庭', '梅花', '主枝直立上行、侧枝自然分布，深褐枝条配暖白梅花；构图从底边入画，不露根部与树干终点。'),
  ...foregroundPair('camellia', '山茶含春', '茶香映雪', '山茶花', '木本山茶与米白花瓣，暖粉花心呼应朱木和柔金墙色。'),
  ...foregroundPair('osmanthus', '桂影秋香', '金粟微明', '桂花', '细枝与金桂点缀暖色花叶，保持轻巧的边缘层次。'),
  ...foregroundPair('magnolia', '玉兰初绽', '玉堂清影', '玉兰', '木本玉兰配象牙白花朵，色彩克制，轮廓向上舒展。'),
  ...foregroundPair('peach_blossom', '桃枝浅绯', '春色含烟', '桃花', '棕褐枝条与浅粉花朵，降低饱和度以贴合祠堂暖色。'),
  ...foregroundPair('wintersweet', '腊梅疏影', '寒香入暖', '腊梅', '细木枝与淡金腊梅，枝形清瘦，适合作为较轻的边缘前景。'),
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
  offsetX: side === 'left' ? -0.36 : 0,
});

export const createDefaultSceneAssembly = (foregroundSetId = 'warm_foliage'): SceneAssemblySelection => ({
  wallpaperId: 'ink_warm_silk',
  wallpaperDecorationId: 'plum_encircling',
  wallSceneryId: 'moon_gate_rosewood',
  wallDecorationId: 'palace_fretwork_lamps',
  groundMatId: 'clear_rush_long_mat',
  cushionId: 'woven_round_cushion',
  foreground: {
    left: [defaultForeground('left', `${foregroundSetId}_left`)],
    right: [defaultForeground('right', `${foregroundSetId}_right`)],
  },
});
