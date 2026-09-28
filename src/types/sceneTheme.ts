/**
 * @file sceneTheme.ts
 * @description 空间主题的数据契约。主题描述的是一台完整镜头，而非单张背景图。
 *
 * 主题只声明静态资产、深度关系与推荐氛围；运行期渲染仍由 Pixi 各层负责。
 * UI 只持有 themeId，通过渲染域公开的注册表读取展示信息。
 */
import type {
  FloorStyle,
  LightingSettings,
  TableclothStyle,
  TableWoodStyle,
  WallBackgroundStyle,
} from '../types';

/** 现阶段沿用壁面风格 id，避免历史馆数据迁移；以后可扩展为独立字符串联合。 */
export type SceneThemeId = WallBackgroundStyle;

export interface SceneThemePortraitPlacement {
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
  url: string;
  /** Rendered width relative to the viewport. Assets use the scene's camera angle and are not re-projected. */
  widthRatio: number;
  bottom?: number;
  /** 距画布底边的比例锚点，适配手机和 iPad 的不同高度。 */
  bottomRatio?: number;
  alpha?: number;
}

/** 主题自带的地材；可使用完整投影平面图或沿用公共平铺材质。 */
export interface SceneThemeFloorMaterial {
  url: string;
  /** `projected-plane` stretches one authored surface over the shared camera plane; `repeat-tile` preserves legacy tiling. */
  mode?: 'repeat-tile' | 'projected-plane';
  tileSize?: { w: number; h: number };
  baseColor: number;
  baseboard: { color: number; highlight: number };
}

/** 贴合视口的附件：既可作背景建筑附件，也可作镜头最近处的虚化遮挡。 */
export interface SceneThemeViewportAsset {
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
  /** 墙布等有明确构图的视口资产可按移动设备尺寸提供独立画幅。 */
  responsiveAssets?: {
    phone?: string;
    tablet?: string;
  };
  alpha?: number;
  /** Runtime Pixi blur strength; keep blur out of the source PNG. */
  blur?: number;
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

/** 墙体由可独立替换的层组成；各层不得互相烘焙。 */
export interface SceneThemeWallDefinition {
  /** 最远处的墙纸 / 墙布，只承担底色和浅层纹样。 */
  wallpaper?: SceneThemeViewportAsset;
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
  name: string;
  poeticTitle: string;
  description: string;
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
  left: SceneForegroundInstance[];
  right: SceneForegroundInstance[];
}

/** 当前镜头的可换部件选择。单选部件存 id，前景存可任意增减的实例数组。 */
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
  /** 新墙体契约：墙纸、遗像、墙纸装饰、造景结构、结构附件分层定义。 */
  wall?: SceneThemeWallDefinition;
  /** @deprecated 历史主题的整张背景；新主题使用 wall.wallpaper。 */
  backdropUrl?: string;
  floorMaterial?: SceneThemeFloorMaterial;
  /** Isolated theme altar table raster; Pixi retains scene layout, lighting and tablecloth overlays. */
  tableAssetUrl?: string;
  /** @deprecated 历史主题兼容；新主题使用 wall.portrait。 */
  portrait?: SceneThemePortraitPlacement;
  /** 主题进入时采用的部件组合；未提供时沿用历史整张背景。 */
  defaultAssembly?: SceneAssemblySelection;
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
    floor: FloorStyle;
    tablecloth: TableclothStyle;
    tableWood: TableWoodStyle;
    tableRunner: boolean;
    lighting: Pick<
      LightingSettings,
      'sunAngle' | 'sunlightIntensity' | 'godRaysIntensity' | 'godRaysEnabled'
    >;
  };
  lightRig: SceneThemeLightRig;
}
