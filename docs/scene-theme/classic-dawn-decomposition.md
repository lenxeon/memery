# 主题 1（晴岚映曜）场景拆分

## 原始稿

- 原图：[`references/classic-dawn-original-composite.png`](./references/classic-dawn-original-composite.png)
- 原图尺寸：852 × 1846，完整保留用户提供的 RGB 文件；仅作为构图审核稿，不直接进入运行时。
- 画面是正面居中的手机竖屏构图，墙地交界约在画面高度的 72% 附近。山水、木质月洞框和地板使用同一机位与中轴。

## 运行时分层

| 层 | 运行时字段 | 素材 | 处理范围 |
| --- | --- | --- | --- |
| 山水壁画 | `wall.wallpaper` | `public/themes/classic_dawn/wallpapers/phone/ink-landscape-clouds-v1.png` | 单独不透明的蓝灰水墨山水、湖面与如意云纹；不含太阳、木框、花枝、供桌或地板。 |
| 木框墙体 | `wall.frame` | `public/themes/classic_dawn/wall-scenery/phone/moon-gate-rosewood-render-match.png` | 一张完整 RGBA 素材，月洞、格栅和立柱不再互相拆层；透明洞口露出下层山水。沿用主题 1 当前的提亮木色。 |
| 地板 | `ground.floor` | `public/themes/classic_dawn/floor/polished-chestnut-plane-render-match-v2.png` | 独立完整透视地坪，保留既有的细腻纹理与光泽；Pixi 按墙地交界裁切，不做网格变形。 |
| 供桌与陈设 | 主题组件层 | `table`、`offerings`、`groundMat`、`cushion`、左右前景 | 仍由运行时独立摆放，不烘焙进上述背景层。 |

默认装配不再叠加墙纸梅枝或框面宫灯，以匹配这张原图的干净墙框构图；对应素材和选项仍可单独选择。主题 1 的清晰山水壁画、整张木框、独立透视地板已经由 `manifest.json` 接入。

## 构图参考

墙纸以顶部中轴锚定，并与完整木框共用画布和墙面缩放；地板继续使用 `FloorLayer` 的统一墙地交界。源稿本身不含桌案与动态供品，故这些运行时图层不会被合并进原图或新的壁画素材。
