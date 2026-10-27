/**
 * @file space.ts
 * @description 纪念馆空间的渲染数据契约（SpaceData）。
 *
 * 「一个馆渲染出来是什么样」全部由这里定义：
 * 页面只需按此契约准备数据交给渲染域，渲染域不得要求契约之外的东西。
 *
 * 结构原则：
 * - 按**实体**分组（墙 / 地 / 案 / 光影 / 陈设），而不是把字段平铺；
 * - 每个实体是一等对象，将来新增属性（如案的牙板雕花、墙的装饰件）只在其内部扩展，
 *   不影响上层签名与外部调用；
 * - 运行期状态（烛火跳动、烟雾粒子、供品衰败推进）由渲染域内部自持，不在此契约内。
 */
import type {
  MemorialInfo,
  SceneItem,
  SceneItemId,
  LightingSettings,
  WallBackgroundStyle,
  TableclothStyle,
  TableWoodStyle,
  SceneThemeId,
  SceneAssemblySelection,
} from '../types';

/** 一套完整镜头主题：统一装配背景、深度附件、地面陈设与光源预设。 */
export interface SpaceTheme {
  id: SceneThemeId;
  /** 可选的独立部件装配；省略时采用主题默认组合。 */
  assembly?: SceneAssemblySelection | null;
}

/** 背景墙 */
export interface SpaceWall {
  /** 墙面风格（建筑壁构样式） */
  style: WallBackgroundStyle;
}

/** 供案（桌体本体） */
export interface SpaceTable {
  /** 桌布：风格与是否铺设 */
  cloth: {
    style: TableclothStyle;
    /** 是否铺设提花织锦大桌布 */
    runner: boolean;
  };
  /** 木料：案面与腿足构架可分别指定 */
  wood: {
    top: TableWoodStyle;
    leg: TableWoodStyle;
  };
  /** 供案前后进深：-1 最靠后（远），0 标准，1 最靠前（近） */
  forward: number;
}

/** 空间整体：墙、地、案 */
export interface SpaceScene {
  theme: SpaceTheme;
  table: SpaceTable;
}

/** 渲染一个纪念馆所需的全部数据 */
export interface SpaceData {
  /** 馆标识（换馆即整体重渲染） */
  hallId: string;
  /** 纪念像容与寄语（遗像、主副标题） */
  memorial: MemorialInfo;
  /** 空间风格与陈设质感 */
  scene: SpaceScene;
  /** 光影氛围（主灯、日照、时段、风力…） */
  lighting: LightingSettings;
  /** 案上陈设：以摆件 id 为键，含类型、位置与生命周期 */
  items: Record<SceneItemId, SceneItem>;
}

/** 供品在案面上的落位（相对案心的横向偏移与纵深） */
export interface SpaceSpot {
  /** 横向偏移，负为左、正为右 */
  x: number;
  /** 纵深，0 贴台面前沿，负值向案里退 */
  y: number;
}
