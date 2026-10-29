/**
 * @file sceneTheme.ts
 * @description 空间主题的数据契约。主题描述的是一台完整镜头，而非单张背景图。
 *
 * 主题只声明资产、可选背景视频、深度关系与推荐氛围；运行期渲染仍由 Pixi 各层负责。
 * UI 只持有 themeId，通过渲染域公开的注册表读取展示信息。
 */
import type {
  LightingSettings,
  TableclothStyle,
  TableWoodStyle,
} from '../types';

/** 主题 ID 来自主题 manifest；不能以 TS 字符串联合枚举代替运行时配置。 */
export type SceneThemeId = string;

export interface SceneThemePortraitPlacement {
  /** Circle inside an authored full-canvas room frame; coordinates share its cover transform. */
  sceneOpening?: { x: number; y: number; diameterRatio: number };
  dx?: number;
  dy?: number;
  scale?: number;
  textDx?: number;
  textDy?: number;
  textGap?: number;
}

/** 依附遗像锚点的透明资产，尺寸和位移都以遗像环直径为单位。 */
export interface SceneThemePortraitAsset {
  url: string;
  responsiveAssets?: Partial<Record<'phone' | 'tablet', string>>;
  widthInPortraits: number;
  dxInPortraits?: number;
  dyInPortraits?: number;
  anchorX?: number;
  anchorY?: number;
  alpha?: number;
}

/** 铺在地坪上的独立席垫或蒲团透明资产；席垫位于供桌后，蒲团位于供桌前。 */
export interface SceneThemeGroundAsset {
  id?: string;
  name?: string;
  poeticTitle?: string;
  description?: string;
  previewUrl?: string;
  url: string;
  /** Rendered width relative to the viewport. Assets use the scene's camera angle and are not re-projected. */
  widthRatio: number;
  bottom?: number;
  /** 距画布底边的比例锚点，适配不同高度的手机视口。 */
  bottomRatio?: number;
  alpha?: number;
}

/** 主题自带的完整透视地坪图；Pixi 按图像直接显示，不再对地面做投影变形。 */
export interface SceneThemeFloorImage {
  url: string;
  /** When true, the floor image already includes its designed light and skips runtime reflection sprites. */
  bakedLighting?: boolean;
  baseColor: number;
  baseboard: { color: number; highlight: number };
}

export interface SceneThemeTablePoint {
  /** 相对桌子素材宽度归一化的横坐标，范围 0..1。 */
  x: number;
  /** 相对桌子素材高度归一化的纵坐标，范围 0..1。 */
  y: number;
}

/** 桌面在整张桌子 PNG 中的位置；用于把供品局部坐标映射到屏幕坐标。 */
export interface SceneThemeTableSurface {
  assetQuad: {
    backLeft: SceneThemeTablePoint;
    backRight: SceneThemeTablePoint;
    frontRight: SceneThemeTablePoint;
    frontLeft: SceneThemeTablePoint;
  };
  usableArea: { uMin: number; uMax: number; vMin: number; vMax: number };
  backScale?: number;
  frontScale?: number;
}

/** 桌 PNG 的源图测量值，使用归一化比例，由共享几何函数换算成 Pixi 像素。 */
export interface SceneThemeTableGeometry {
  sourceSize: { width: number; height: number };
  /** Every landmark is normalized to the source image (0..1). */
  visibleBounds: { left: number; top: number; right: number; bottom: number };
  frontEdgeY: number;
  backEdgeY: number;
  fasciaBottomY: number;
  apronBottomY: number;
  footBottomY: number;
  legCentersX?: { left: number; right: number };
  legWidth?: number;
  apronBoundsX?: { left: number; right: number };
}

/** 每套主题只提供桌子的素材和校准数据；布局与供品映射由同一个通用实现完成。 */
export interface SceneThemeTableDefinition {
  id: string;
  name: string;
  asset: string;
  structure: 'legged' | 'legless' | 'pedestal';
  woodStyle: TableWoodStyle;
  runner: boolean;
  position: {
    x: number;
    bottomRatio: number;
    widthRatio: number;
    minWidthRatio: number;
    maxWidthRatio: number;
    forwardScale: number;
    forwardOffsetRatio: number;
  };
  geometry: SceneThemeTableGeometry;
  surface: SceneThemeTableSurface;
}

/** Theme default offerings are a scene template; runtime items remain separate mutable state. */
export interface SceneThemeDefaultOffering {
  catalogId: string;
  position: { u: number; v: number };
  scale?: number;
}

export interface SceneThemeComponentMetadata {
  id: string;
  name: string;
  poeticTitle: string;
  description: string;
  previewUrl: string;
  asset: SceneThemeViewportAsset;
}

export interface SceneThemePortraitComponentMetadata {
  id: string;
  name: string;
  poeticTitle: string;
  description: string;
  previewUrl: string;
  backAsset: SceneThemePortraitAsset;
  frontAsset?: SceneThemePortraitAsset;
}

export interface SceneThemeGroundComponentMetadata {
  id: string;
  name: string;
  poeticTitle: string;
  description: string;
  previewUrl: string;
  asset: SceneThemeGroundAsset;
}

export interface SceneThemeComponents {
  wallpaperDecorations?: SceneThemePortraitComponentMetadata[];
  frameDecorations?: SceneThemeComponentMetadata[];
  groundMat?: SceneThemeGroundComponentMetadata;
  cushion?: SceneThemeGroundComponentMetadata;
}

/** 贴合视口的附件：既可作背景建筑附件，也可作镜头最近处的虚化遮挡。 */
export interface SceneThemeViewportAsset {
  id?: string;
  name?: string;
  poeticTitle?: string;
  description?: string;
  previewUrl?: string;
  url: string;
  fit: 'cover' | 'contain' | 'width' | 'wall' | 'wall-frame';
  x?: number;
  y?: number;
  widthRatio?: number;
  /** Frame-specific scale by device profile; permits wall architecture to extend below the wall/floor seam. */
  responsiveWidthRatios?: {
    phone?: number;
    tablet?: number;
  };
  /** Extend the complete wall/frame downward while keeping wallpaper and frame aligned. */
  bottomExtensionRatio?: number;
  /** 墙布等有明确构图的视口资产可按移动设备尺寸提供独立画幅。 */
  responsiveAssets?: {
    phone?: string;
    tablet?: string;
  };
  /** 壁画的可选无声循环视频；url 仍保留首帧静态图，供加载与播放失败时使用。 */
  video?: { url: string };
  alpha?: number;
  /** Position a wall attachment in the wall-scenery group's authored coordinate space. */
  wallAnchor?: {
    /** Normalized horizontal position in the wall composition. */
    x: number;
    /** Normalized vertical position in the wall composition. */
    y: number;
    /** Rendered width as a ratio of the wall composition width. */
    widthRatio: number;
  };
  /** Atlas frames mounted as independent Pixi sprites inside the wall group. */
  wallParts?: Array<{
    frame: { x: number; y: number; width: number; height: number };
    anchor: {
      /** Normalized fallback position when no source region is provided. */
      x: number;
      y: number;
      widthRatio: number;
      /** Authored source-pixel region whose horizontal midpoint should center this part. */
      centerRegionByProfile?: {
        phone?: { left: number; right: number };
        tablet?: { left: number; right: number };
      };
    };
  }>;
}

/** 墙体可以使用模块化造景，或以单张墙地一体透明层覆盖墙纸。 */
export interface SceneThemeWallDefinition {
  /** 最远处的墙纸 / 墙布，只承担底色和浅层纹样。 */
  wallpaper?: SceneThemeViewportAsset;
  /** 墙地一体主题的窗外透明花枝，与背景、室内层同画布、同原点。 */
  wallpaperOverlays?: SceneThemeViewportAsset[];
  /** 用户指定墙地一体时，完整墙体、框架、地面及统一光影合并为一张全画布 RGBA；开口透明露出 wallpaper。 */
  roomOverlay?: SceneThemeViewportAsset;
  /** 用户遗像与纪念文字在墙面中的锚点。 */
  portrait?: SceneThemePortraitPlacement;
  /** 贴在墙纸上、位于遗像周围的花枝、云纹、光环；显式分为遗像前后。 */
  wallpaperDecorations?: {
    behindPortrait?: SceneThemePortraitAsset[];
    overPortrait?: SceneThemePortraitAsset[];
  };
  /** 月洞门、木格栅、石材立柱等空间造景结构。 */
  scenery?: SceneThemeViewportAsset[];
  /** 安装在造景结构上的灯、挂饰等附件。 */
  sceneryDecorations?: SceneThemeViewportAsset[];
}

export type SceneAssemblyPart =
  | 'wallpaper'
  | 'wallpaperDecoration'
  | 'wallScenery'
  | 'wallDecoration'
  | 'groundMat'
  | 'cushion';

export type SceneForegroundSide = 'left' | 'right';

/** 一件完整、可重复入镜的前景定义。左右只决定从哪一侧入画。 */
export interface SceneForegroundDefinition {
  id: string;
  /** Stable pair identifier shared by its left/right assets and any themes that reuse it. */
  setId: string;
  themeId: SceneThemeId;
  name: string;
  poeticTitle: string;
  description: string;
  plant: string;
  /** Short production note describing the baked near-focus treatment. */
  focusTreatment: string;
  defaultHeightRatio: number;
  minHeightRatio: number;
  maxHeightRatio: number;
  /** Portion of the sprite height that continues below the viewport edge. */
  bottomOverflowRatio?: number;
  /** 全幅前景按源画布等比适配，不按高度边界重新缩放植物。 */
  referenceCanvas?: { width: number; height: number };
  side: SceneForegroundSide;
  previewUrl: string;
  asset: SceneThemeViewportAsset;
}

/** 前景实例允许同一种素材重复出现，并各自调整位置、比例、透明度和顺序。 */
export interface SceneForegroundInstance {
  instanceId: string;
  foregroundId: string;
  side: SceneForegroundSide;
  offsetX?: number;
  offsetY?: number;
  scale?: number;
  alpha?: number;
  order?: number;
}

export interface SceneForegroundComposition {
  left: SceneForegroundInstance;
  right: SceneForegroundInstance;
}

/** 当前镜头的可换部件选择。单选部件存 id，左、右前景各存一个实例对象。 */
export interface SceneAssemblySelection {
  wallpaperId: string;
  wallpaperDecorationId: string;
  wallSceneryId: string;
  wallDecorationId: string;
  groundMatId: string;
  cushionId: string;
  foreground: SceneForegroundComposition;
}

export interface SceneThemeLightRig {
  /** 画面坐标 0~1，记录主光来源，便于阴影与后续材质统一。 */
  source: { x: number; y: number };
  /** 现有丁达尔光束的推荐角度。 */
  sunAngle: number;
  sunlightIntensity: number;
  godRaysIntensity: number;
  godRaysEnabled: boolean;
  /** 主题的主光/环境色，先作为资产生产与后续着色的统一依据。 */
  keyColor: number;
  ambientColor: number;
  /** 阴影离开光源的方向，归一化向量。 */
  shadowDirection: { x: number; y: number };
}

export interface SceneThemeDefinition {
  id: SceneThemeId;
  name: string;
  poeticTitle: string;
  iconText: string;
  desc: string;
  tag: string;
  /** A single authored image containing the complete scene background (wall + floor). */
  sceneBackground?: string;
  /** 新墙体契约：墙纸、遗像、墙纸装饰、造景结构、结构附件分层定义。 */
  wall?: SceneThemeWallDefinition;
  /** Component choices are supplied by the manifest and indexed generically by slot. */
  components?: SceneThemeComponents;
  /** New scene defaults loaded from JSON; the live offering collection stays in scene state. */
  defaultOfferings?: Record<string, SceneThemeDefaultOffering>;
  /** @deprecated 历史主题的整张背景；新主题使用 wall.wallpaper。 */
  backdropUrl?: string;
  floorImage?: SceneThemeFloorImage;
  table?: SceneThemeTableDefinition;
  /** Isolated theme altar table raster; Pixi retains scene layout, lighting and tablecloth overlays. */
  tableAssetUrl?: string;
  /** @deprecated 历史主题兼容；新主题使用 wall.portrait。 */
  portrait?: SceneThemePortraitPlacement;
  /** 主题进入时采用的部件组合；未提供时沿用历史整张背景。 */
  defaultAssembly?: SceneAssemblySelection;
  /** Theme-local foreground candidate pairs available in the environment panel. */
  foregroundSetIds?: string[];
  /** Foreground choices are theme data, grouped by their authored side. */
  foregroundCandidates?: SceneForegroundDefinition[];
  /** The selected pair used by defaultAssembly for this theme. */
  defaultForegroundSetId?: string;
  layers?: {
    /** 墙面上的灯、窗、帘、植物等独立附件，位于遗像之后。 */
    backgroundAccessories?: SceneThemeViewportAsset[];
    /** 遗像之后的花枝、光环、屏风等，用来建立后景关系。 */
    portraitBack?: SceneThemePortraitAsset[];
    /** 遗像之前的小枝、纱、叶片等，用来形成明确遮挡。 */
    portraitFront?: SceneThemePortraitAsset[];
    /** 地面材质上方、供案下方的地毯、草席、蒲团。 */
    ground?: SceneThemeGroundAsset[];
    /** 最靠近镜头的虚化植物、光斑、帘角。 */
    foreground?: SceneThemeViewportAsset[];
  };
  preset: {
    tablecloth: TableclothStyle;
    lighting: Pick<
      LightingSettings,
      'sunAngle' | 'sunlightIntensity' | 'godRaysIntensity' | 'godRaysEnabled'
    >;
  };
  lightRig: SceneThemeLightRig;
}
