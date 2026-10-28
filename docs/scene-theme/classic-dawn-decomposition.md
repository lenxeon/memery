# 主题 1（晴岚映曜）场景拆分

## 原始稿

- 原图：[`references/classic-dawn-original-composite.png`](./references/classic-dawn-original-composite.png)
- 原图尺寸：852 × 1846，完整保留用户提供的 RGB 文件；仅作为构图审核稿，不直接进入运行时。
- 画面是正面居中的手机竖屏构图，墙地交界约在画面高度的 72% 附近。山水、木质月洞框和地板使用同一机位与中轴。

## 运行时分层

| 层 | 运行时字段 | 素材 | 处理范围 |
| --- | --- | --- | --- |
| 山水背景画 | `wall.wallpaper` | `public/themes/classic_dawn/wallpapers/phone/ink-landscape-clouds-v1.png` | 单独的不透明蓝灰水墨山水、湖面与如意云纹；不含室内墙、框、地板或供桌。 |
| 墙地一体室内层 | `wall.roomOverlay` | `public/themes/classic_dawn/interior/phone/moon-gate-wall-floor-integrated-v1.png` | 一张全画布透明 RGBA，含墙面、完整木质月洞与格栅、踢脚线、地板和同一光影；月洞开口 alpha 透明，露出下层背景画。 |
| 供桌与陈设 | 主题组件层 | `table`、`offerings`、`groundMat`、`cushion`、左右前景 | 仍由运行时独立摆放，不烘焙进两张背景素材。 |

`manifest.json` 使用墙地一体模式：`ground.floor` 为 `null`，不再叠加独立木框、地坪、墙纸梅枝或框面宫灯。供桌及其交互陈设仍由原运行时层独立渲染。

## 构图参考

山水背景画与墙地一体室内层均为 `853×1844` 全画布、同原点，运行时按同一全幅等比 cover 和中心锚点叠放；室内层的透明月洞开口露出背景画。源稿本身不含桌案与动态供品，故这些运行时图层不会被合并进原图或两张背景素材。
