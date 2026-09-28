/**
 * @file options.ts
 * @description 背景墙风格选项（渲染域领域数据）。
 * 风格定义本身属于空间场景，UI 面板只读取用于展示与选择。
 */
import { SCENE_THEME_OPTIONS } from '../themes';

/** @deprecated 兼容旧调用；新代码统一使用 SCENE_THEME_OPTIONS。 */
export const WALL_STYLE_OPTIONS = SCENE_THEME_OPTIONS;
