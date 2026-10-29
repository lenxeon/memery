# 场景4「雪庭梅映」素材拆解

以本次上传的 `1179×2556` 附件为输入，原图保存在 `effect.png`。使用内置 imagegen 提取图层并补绘被供桌、供品及前景遮挡的环境，提示词见 `prompts.md`。没有修改项目内其它名称相似的场景稿。

## 交付与装配

设计交付文件为：本目录 `effect.png`（完整参考效果图）、`public/themes/snow_plum_courtyard/wallpapers/phone/outside-landscape.png`（纯背景图）、`public/themes/snow_plum_courtyard/interior/phone/room-wall-ground-light-window.png`（透明墙地一体场景图），以及 `prompts.md`。三张全幅图均为 `1179×2556`。

沿用场景2的窗景拆层关系，由远到近装配：

| 层 | 运行时文件（相对 public/themes/snow_plum_courtyard） | 配置字段 |
| --- | --- | --- |
| 雪山庭院底景 | `wallpapers/phone/outside-landscape.png` | `wall.wallpaper` |
| 窗外红梅与雪松 | `wall-overlays/phone/outside-branches.png` | `wall.wallpaperOverlays` |
| 木梁、整扇窗格、墙面、地板与统一光影 | `interior/phone/room-wall-ground-light-window.png` | `wall.roomOverlay` |
| 独立编席 | `mats/straw-mat.png` | `ground.groundMat` |
| 空供桌（两腿、牙板及雕花完整） | `table/carved-timber-altar-v2.png` | `table` |
| 独立锦面藤编蒲团 | `cushions/brocade-cushion.png` | `ground.cushion` |
| 左近景红白梅枝 | `foregrounds/snow_plum_pine/left.png` | `defaultAssembly.foreground.left` |
| 右近景覆雪松枝 | `foregrounds/snow_plum_pine/right.png` | `defaultAssembly.foreground.right` |

全幅底景、窗外花枝、室内层及左右近景均以同一设计原点导出。墙地交界沿用本稿约 `0.71H` 的构图。桌案、席垫和蒲团保留独立 RGBA 精灵，桌面四边形、可用区域与陈设位置写入 manifest。窗洞 alpha 为 0；供桌与其它陈设的背景也保留真实 alpha。

`decomposition.json` 记录每张素材的路径、像素尺寸、alpha 范围、有效轮廓与图层顺序。应用读取 `public/themes/snow_plum_courtyard/manifest.json`，由 `public/themes/catalog.json` 注册到主题选择面板。

遗像和纪念文字沿用应用现有动态圆形组件与墙面锚点；供花、香烛、果盘与茶具使用现有交互供品。新素材中的桌面保持空置；原参考图的桌上方形空白像框由动态像容替代。

## 六组前景

默认使用新提取的「梅雪映庭」左右一组；另显式引用共享库中的梅花、山茶、桂花、玉兰和桃花五组，共六组、十二个左右候选。新组是全画布前景，尺寸已在 PNG 中确定，运行时只随完整镜头等比适配与受限移动。现有共享候选保持历史布局。

| setId | 中文名 / English | 植物组合 | 来源 | 主色 / 辅色 |
| --- | --- | --- | --- | --- |
| snow_plum_pine | 梅雪映庭 / Snow Plum and Pine | 红白梅枝、覆雪松枝 | 本主题 | 梅红、雪白 / 松绿、深褐 |
| plum_blossom | 梅枝暖雪 / Soft Plum Blossom | 暖白梅花、深褐枝条 | 共享库 | 暖白 / 褐红 |
| camellia | 山茶含春 / Camellia | 米白山茶、木本枝叶 | 共享库 | 米白 / 深绿 |
| osmanthus | 桂影秋香 / Osmanthus | 金桂、暖色花叶 | 共享库 | 金黄 / 暖绿 |
| magnolia | 玉兰映雪 / Magnolia | 玉兰、枝叶 | 共享库 | 象牙白 / 灰绿 |
| peach_blossom | 桃枝春信 / Peach Blossom | 桃花、细枝 | 共享库 | 淡粉 / 褐色 |

新组近景焦外效果烘焙在 PNG 中；左侧有效占高约 29.50%，右侧约 33.41%，位于 18%–40% 验收范围内。

## 检查结果

- `npm run lint` 与 `npm run build` 通过。
- 通过真实加载器读取全部四套主题；验证新增的三层背景、六组左右候选、18 条新主题引用的 PNG 路径、默认前景偏移、桌面几何和供品边界。
- 验证跨主题窗外素材路径、错误前景设计画布会被加载器拒绝。
- 全幅导出尺寸、透明开口、地面覆盖和新近景有效占高通过静态检查。
- `background-layers-preview.png` 为三层背景装配图；`static-assembly-preview.png` 为依 manifest 装配的静态部件图，不含运行时像容、纪念文字、供品、灯光或 UI。两图均为素材合成检查文件，最终交互与视觉由用户在应用中审核。

未启动浏览器自动化，未提交 Git。

供桌已按主题1的平整桌面标准重生成，默认手机布局的桌面纵深校准到约31.4 CSS px，承载四边形与几何前后缘采用相同口径。最新测量见 `artifacts/scene-theme/tabletop-standard-revision/`。

2026-10-29 红框资产审计：编席与锦面藤编蒲团已清理透明区低 alpha 杂边并收紧留白，保留原始材质和物体像素；`decomposition.json` 的两项尺寸与有效边界已同步更新。manifest 按 393×852 设计画布补偿裁去的透明留白，保持可见宽度和接地位置。对照图与测量见 `artifacts/scene-theme/asset-preview-audit-20261029/`；本目录原有静态装配图属于修复前记录。
