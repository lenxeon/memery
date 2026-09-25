/**
 * @file index.ts
 * @description 渲染域（纪念馆空间）唯一对外入口。
 *
 * 契约（UI 层必须遵守）：
 * 1. UI 只允许从 'pixi' 这个入口导入，禁止直接引用 scene/、layers/、effects/、
 *    engine/、assets/ 等内部实现；
 * 2. 空间内的一切（墙、地面、光束、浮尘、供案、花、果、烛）由渲染域自持数据与生命周期，
 *    外部不得直接修改；
 * 3. 内部变化（花谢、落瓣、点击、拖放、熄灭…）只通过回调事件向外暴露。
 *
 * 4. 「一个馆渲染成什么样」的完整数据定义见 SpaceData（./space.ts）：
 *    页面按该契约准备数据，渲染域不得索取契约之外的输入。
 *
 * 当前形态：React 视口组件 + 场景组件 + 领域数据（过渡态）。
 * 目标形态：SpaceRenderer —— init(container) / render(spaceData) / dispatch(cmd) / on(event) / destroy()，
 *          届时 pixi 目录内不再有任何 tsx，React 侧仅保留挂载容器用的适配组件（置于 ui 侧）。
 */

// ── 领域数据：风格选项（UI 面板用于展示与选择） ──
export { FLOOR_STYLE_OPTIONS } from './scene/floorOptions';
export { WALL_STYLE_OPTIONS } from './scene/walls/options';

// ── 领域数据：供品图形模板与注册表 ──
export { FLOWER_REGISTRY } from './assets/templates/flowers';
export { VASE_STYLES, getVaseStyleMeta } from './assets/templates/flowers/vases';
export { getFlowerOnlyPreviewSvg } from './assets/templates/FlowerTemplate';

// ── 渲染数据契约：渲染一个馆所需的全部数据定义 ──
export type {
  SpaceData,
  SpaceScene,
  SpaceWall,
  SpaceFloor,
  SpaceTable,
  SpaceSpot,
} from './space';

// ── 对外类型 ──
export type { VaseStyle } from './assets/templates/flowers/vases';
export type {
  SceneItem,
  SceneItemId,
  LightingSettings,
  FlowerType,
  FruitType,
  WallBackgroundStyle,
  FloorStyle,
  TableclothStyle,
  TableWoodStyle,
  VaseHitZone,
} from '../types';
