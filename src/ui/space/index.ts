/**
 * @file index.ts
 * @description 馆空间（堂轩主场景）统一导出入口。
 * 本域复杂，内部按角色再分：offering 献供 · setting 光影配置 · directory 名录与筹建 ·
 * audit 专项审计 · hooks 环境与献供状态机 · controls 馆内底栏 · memorial 纪念馆编辑。
 * （遗像牌位与场景环境已迁至 src/pixi 图层，由 SceneCanvas 统一渲染。）
 */
export * from './HallSpacePage';
export * from './offering';
export * from './setting';
export * from './directory';
export * from './audit';
export * from './hooks';
export * from './controls';
export * from './memorial';
