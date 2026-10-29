# 场景6「云海朝晖」素材拆解与接入

本次用户提供的完整场景作为拆解基准；主题 ID 为 `high_mountain_outdoors`，显示名为「云海朝晖」。已有 `high_mountain_outdoors/concept-preview-v*.png` 是此前概念稿，本次未覆盖。新增配置在 `public/themes/high_mountain_outdoors/manifest.json`，通过 catalog 的第6项进入现有主题选择器，无主题专用渲染分支。

## 设计稿与生成记录

- `ui/场景6效果图.png`：用户参考图的标准画布副本，1179×2556。
- `ui/场景6墙纸.png`：仅日出、晨空、山峰、云海的全幅不透明背景。
- `ui/场景6场景图.png`：固定山松、侧边岩石与植被、完整石台地坪及统一环境光；云海开口使用真实透明 alpha。
- `public/themes/high_mountain_outdoors/reference/source-original.png`：附件原始字节副本，852×1846；SHA-256 为 `1312ac85d0ff68b8099b6ac093a1ff7411c8c1dee15a7f931b2fc67d6099c6e0`。
- `prompts.md`：规范要求、内容描述和全部9个实际提示词。使用内置 image_gen；左前景和席毯各做过一次定向修正，初稿未接入运行时。
- `generated-sources/`：最终选定的生成器原始输出，保留原生 alpha。

生成器没有遵从提示词指定的精确导出尺寸。所有全幅图按同一1179×2556画布等比 cover、中心对齐，不作非等比拉伸；原图比例与标准画布接近，横向裁切不足1个设计像素。右前景原生853×1844，比标准比例略宽，标准化时横向合计裁切约3.4个设计像素，不改变花枝相对画面的尺寸。独立器物只清理透明导出余量，不做透视变形或重绘。

## 运行时7张素材

所有路径位于 `public/themes/high_mountain_outdoors/`：

| 插槽 | 文件 | 导出尺寸 |
| --- | --- | --- |
| `wall.wallpaper` | `wallpapers/phone/sunrise-cloud-sea.png` | 1179×2556 |
| `wall.roomOverlay` | `interior/phone/pine-terrace.png` | 1179×2556 |
| `table` | `table/carved-stone-trestle.png` | 1906×658 |
| `ground.groundMat` | `mats/indigo-mountain-mat.png` | 1770×441 |
| `ground.cushion` | `cushions/ivory-brocade.png` | 1654×721 |
| 左前景 | `foregrounds/left.png` | 1179×2556 |
| 右前景 | `foregrounds/right.png` | 1179×2556 |

采用现有全画布背景 + 透明场景层装配：`ground.floor=null`，省略 `wall.frame`，默认 `frameId=none`；不使用旧单图 `sceneBackground`。导出场景层中首个横贯全宽、alpha≥128的连续石台行实测为y=1873，接近默认目标y=1870（约+3px）；这是素材轮廓测量，不是用户视觉审批结论。左右古松保留原图层次；完整地坪及其受光合在场景层，不重复增加地板光斑。日出光源约为 `(0.77W,0.27H)`，默认关闭额外丁达尔光。左右白花的真实可见高度分别约19.76%与20.11%，使用全画布 `referenceCanvas`，偏移为0，无运行时 BlurFilter。

供桌中没有烘焙相框、香烛、花果与杯碟。8个默认供品继续由现有可交互组件渲染；个人像容、题名和日期继续使用现有动态遗像组件及其通用布局。参考图中的桌上木质空相框未另做静态背景装饰，因此运行时遗像造型与位置沿用应用已有实现，而不是把参考图直接铺满屏幕。供桌关闭额外桌旗，保留石材雕花和两侧暖木A形桌脚。

## 桌面与器物测量

裁掉透明余量后的桌图1906×658，承载面四角约为后左(139,24)、后右(1764,24)、前右(1881,121)、前左(24,121)，估计误差±3源像素。前后缘与 `geometry` 使用同一口径；石材前沿厚度单独标记为 `fasciaBottomY`。

默认393×852、forward=0下：可见桌宽361.56 CSS px，顶面前沿361.37 CSS px、后沿316.22 CSS px、可见纵深18.88 CSS px，桌脚落在约0.793H。该桌按本次附件的浅石板外观制作，未将旧主题1/4的31.4 CSS px专项指标假报为本桌实测值。供品点位全部落入 `usableArea`。

席毯修订后的可见席面四角估计为生成源图(278,300)、(1495,300)、(1718,641)、(62,641)，后缘/前缘约0.735、纵深/前缘约0.206。蒲团顶面椭圆短长轴比目测约0.25；仅为图像轮廓估计，未声称实测相机角度。席毯和蒲团没有再次做运行时投影。

## 核验与复查

`asset-measurements.json` 记录真实导出尺寸、透明像素、可见边界和原生生成文件。`runtime-validation.json` 使用项目真实 `loadSceneThemes()`、组件目录与桌面布局函数，确认6个主题可加载、新主题7张PNG存在且尺寸正确、2个前景和8个供品可解析、3种手机视口下桌图等比缩放、坐标有效。

已逐项对照 `docs/scene-theme/theme-manifest-schema.md`：顶层/嵌套字段及类型、对象/数组形状、部件ID与默认装配、当前主题内素材路径、PNG尺寸、桌面归一化坐标、供品边界、`none`与`null`语义均一致。现有JSONC加载器读取所有主题成功。

`npm run lint`（TypeScript无输出错误）和 `npm run build` 均通过；构建保留现有大包提示。`git diff --check` 通过。

运行配置核验命令：

```sh
node --import tsx artifacts/scene-theme/high_mountain_outdoors/scene6-decomposition/verify-runtime.mjs
```

`environment-composite.png` 是背景和透明环境层的静态叠放图；`assembly-preview.png` 按已校验的默认运行坐标合成桌、席、蒲团与前景，不包含运行时个人遗像和供品，不是浏览器截图。未启动浏览器自动化，最终视觉效果以用户页面查看为准；未提交Git。
