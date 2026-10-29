# 主题 1（晴岚映曜）场景拆分

> 本文只记录既有主题的运行时接线，不再定义新场景设计稿或出图尺寸。既有文件中的源稿尺寸属于历史记录；新场景的效果图、墙纸/纯背景图、场景图/墙地一体图统一为 `1179×2556 px`，详见权威[场景主题技能规范](/Volumes/data/workspace/memery/.agents/skills/memery-scene-theme/SKILL.md)。

## 原始稿

- 原图：[`references/classic-dawn-original-composite.png`](./references/classic-dawn-original-composite.png)
- 原图尺寸：852 × 1846（用户提供的历史参考图尺寸）；仅作为构图审核稿，不直接进入运行时，也不是当前出图尺寸。
- 画面是正面居中的手机竖屏构图；原始参考图的墙地交界约在画面高度的 72% 附近，仅为历史画面观察。新场景按技能规范使用 1179×2556 px 画布和当前墙地锚点。山水、木质月洞框和地板使用同一机位与中轴。

## 运行时分层

| 层 | 运行时字段 | 素材 | 处理范围 |
| --- | --- | --- | --- |
| 山水背景画 | `wall.wallpaper` | `public/themes/classic_dawn/wallpapers/phone/ink-landscape-clouds-v1.png` | 单独的不透明蓝灰水墨山水、湖面与如意云纹；不含室内墙、框、地板或供桌。 |
| 墙地一体室内层 | `wall.roomOverlay` | `public/themes/classic_dawn/interior/phone/moon-gate-wall-floor-integrated-v1.png` | 一张全画布透明 RGBA，含墙面、完整木质月洞与格栅、踢脚线、地板和同一光影；月洞开口 alpha 透明，露出下层背景画。 |
| 供桌与陈设 | 主题组件层 | `table`、`offerings`、`groundMat`、`cushion`、左右前景 | 仍由运行时独立摆放，不烘焙进两张背景素材。主题1供桌更新为 `table/altar-table-render-match-v3.png`，平整桌面纵深按默认手机布局校准到约 `31.4 CSS px`；主题3继续使用其原有 v2 素材。 |

`manifest.json` 使用墙地一体模式：`ground.floor` 为 `null`，不再叠加独立木框、地坪、墙纸梅枝或框面宫灯。供桌及其交互陈设仍由原运行时层独立渲染。

## 构图参考

既有山水背景画与墙地一体室内层使用共同构图原点，运行时按同一全幅等比 cover 和中心锚点叠放；室内层的透明月洞开口露出背景画。本段描述当前兼容装配关系，不规定新的图片导出尺寸。新场景仍需额外交付包含桌案、供品、前景、席垫和蒲团的完整效果图；运行时交互素材保持独立。
