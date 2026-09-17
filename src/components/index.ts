/**
 * @file index.ts
 * @description 组件库聚合统一导出入口，按 5 大领域分层对外输出所有模块。
 */
/**
 * 供奉系统组件库 (Memorial Component Library)
 *
 * 按照业务领域清晰分层：
 * - scene: 空间与场景舞台（供桌、背景墙、地板、灵位遗像）
 * - offerings: 供奉器物与五供十景（香、花、烛、茶、果、磬、桌布）
 * - effects: 宏观环境与视觉特效（丁达尔体积光、微尘、落花飞瓣）
 * - settings: 交互抽屉与业务弹窗（环境设置、祈愿信条、挑选花卉、灵位编辑）
 * - controls: 用户操作栏与调试监视器（底部快捷坞、FPS指示器）
 */

export * from './scene';
export * from './offerings';
export * from './effects';
export * from './settings';
export * from './controls';
export * from './auth';
export * from './memorial';
