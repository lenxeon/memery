# 场景7「琼楼玉阙」拆解与接入

用户在地面比例审计后重新选定天宫concept-v3原图，要求按主题2拆解并加入项目。主题ID为 `celestial_realm`，通过 `public/themes/catalog.json` 注册，配置集中在 `public/themes/celestial_realm/manifest.json`。

## 参考主题2的含义

采用独立环境背景与完整墙地一体层，供桌、席毯、蒲团和左右前景独立。主题使用 `wall.wallpaper` 与 `wall.roomOverlay`，省略 `wall.frame`、设置 `ground.floor=null`、默认 `frameId=none`。2026-10-29 按用户要求改成开放云台：移除两侧柱子、柱础和顶部梁架，保留中央描金玉屏、台阶与地坪；地面修成无物体倒影的哑光白玉石。两侧与上方使用真实透明 alpha 露出云海背景。

默认供品完整沿用主题2的8项模板及其 `u/v` 点位：左右花瓶、左右蜡烛、香炉、左右果盘和茶杯。供品仍使用项目已有可交互组件；图片里的供品全部从环境与桌案素材中移除。

## 设计稿三件套

- `ui/场景7效果图.png`：开放云台、移除倒影后的完整效果图。原始图保存在 `public/themes/celestial_realm/reference/source-original.png`。
- `ui/场景7墙纸.png`：只含云海、远山、天宫、云桥、瀑布的全幅不透明背景。
- `ui/场景7场景图.png`：开放云台、缩小玉屏、台阶与哑光地坪的透明RGBA，室外空间透出背景。

三张图均为1179×2556；用户原始852×1846附件字节副本位于 `public/themes/celestial_realm/reference/source-original.png`，SHA-256为 `81738bf1fe02e88e8d030637dd5b7e6570a19f2999eb4ba389bb2d220d466f4d`。图像通过等比缩放和共同原点导出，未作非等比拉伸。本轮采用内置image_gen修改资产，提示词和导出检查见 `artifacts/scene-theme/celestial_realm/open-terrace-20261029/`。

此前 `tiangong-palace/floor-ratio-audit-v3.json` 对选定图的地面估计约28.8%（边界 y≈1820±15）；这是含遮挡误差的历史估计。当前开放云台层侧边可见地坪起始行约为 `y=1712/2556≈0.67H`，中央台阶高于地坪。这是本轮源图测量，不是物理相机标定或用户的最终视觉审批结论。

## 运行时17张素材

路径均相对 `public/themes/celestial_realm/`：

| 插槽 | 文件 | 尺寸 |
| --- | --- | --- |
| 纯背景 | `wallpapers/phone/heavenly-palaces.png` | 1179×2556 |
| 开放云台/玉屏/地坪一体层 | `interior/phone/jade-hall-ground.png` | 1179×2556 |
| 白玉描金供桌 | `table/jade-gold-altar.png` | 1772×696 |
| 青玉云纹席 | `mats/celadon-cloud-mat.png` | 1973×445 |
| 米白描金锦垫 | `cushions/ivory-gold-brocade.png` | 1635×764 |
| 6套左右前景 | `foregrounds/<set-id>/left.png`、`right.png` | 每张1179×2556 |

各套前景独立生成，花型与叶形不同，不以翻转或改色凑数：

| set-id | 中文名 | English | 植物与色彩 |
| --- | --- | --- | --- |
| `ivory_magnolia` | 玉兰凝露（默认） | Ivory magnolia | 白玉兰/百合、灰绿叶；米白与灰绿 |
| `pale_lotus` | 莲影浮云 | Pale lotus | 浅粉白莲、小荷叶；粉白与淡青 |
| `jade_orchid` | 兰风清和 | Jade orchid | 奶白兰花、细兰叶；奶白与青绿 |
| `peach_blossom` | 桃云含春 | Peach blossom | 淡粉桃花、细枝；浅粉与灰褐 |
| `golden_osmanthus` | 桂月流金 | Golden osmanthus | 桂花小簇、橄榄绿叶；淡金与绿 |
| `snow_camellia` | 雪茶映玉 | Snow camellia | 米白重瓣山茶、圆叶；米白与深绿 |

前景均按50mm f/1.4等效近摄焦外效果制作，柔焦烘焙到RGBA，不加运行时BlurFilter、光斑或粒子。原生可见高度约19.7%–24.8%，符合18%–40%范围；中轴47%–53%宽度区域alpha最大值不超过1（仅不可见导出余量）。使用 `referenceCanvas=1179×2556`、默认位移0，用户只在既有安全范围移动。主题显示恰好6组候选，运行时每侧只选一张，初始只加载默认一对。

独立器物仅裁去透明导出余量；席毯在生成器中修正为更浅的透视，未在代码里压缩、拉伸或做二次投影。原生输出、导出裁边、尺寸、alpha、可见边界和SHA见 `production-inputs.json` 与 `asset-measurements.json`。正式public目录只保留被manifest引用的选定素材。

## 小玉屏中的动态像容

为保留用户选定的小玉屏，空间主题 JSONC 使用 `wall.portrait.sceneOpening` 数据字段；它按1179×2556全画布定位照片，内径占画布宽度的比例参与同一等比cover变换，不另绘旧金环/光晕，也不在悬停时放大到实体相框外。姓名、日期和照片继续是动态内容，不烘焙进PNG。雪庭、经典、秋湖、云山和其它未采用该字段的主题保持原有遗像布局。

2026-10-29 移除框架后，按新玉屏圆环重标定像容：圆心约为(591.23,1252.43)、动态内径158设计像素；默认393×852手机视口中，中心约(197.08,417.48)、内径52.67 CSS px。测量文件 `open-terrace-20261029/revision.json` 记录了当前锚点。

供桌承载面四角约为裁边后源图的后左(181,24)、后右(1590,24)、前右(1744,201)、前左(27,201)，测量误差约±3源像素；默认393×852、forward=0时，可见桌宽353.70CSS px，承载前沿352.26、后沿289.07、纵深36.31CSS px。该桌遵循本次源图，不将旧主题1/4的31.4CSS px专项目标写成本桌实测。`usableArea` 避开边角装饰，默认8个供品均落在范围内。席毯修订后顶面深宽比目测约0.19–0.20，蒲团顶面短长轴比约0.27；这是图像轮廓估计，未声称实测相机标定角度。

## 检查与交付

`verify-runtime.mjs` 使用项目真实JSONC加载器、组件注册表、墙面适配和布局函数，确认主题目录均可加载；新主题17张PNG与3张设计稿存在且尺寸/透明通道正确；6套左右候选可选；8个默认供品与主题2完全一致且位于承载面；照片圆在4种手机尺寸下与室内层的cover变换一致；其余主题没有启用新像位配置。

已对照 `docs/scene-theme/theme-manifest-schema.md` 核对：顶层/嵌套字段、字段类型、对象与数组、ID引用、默认装配、主题内素材路径、`none`/`null`语义、归一化坐标和供品边界；新增 `sceneOpening` 也有运行时有限数/范围与 `roomOverlay` 依赖校验。

`npm run lint`、真实运行配置校验、`npm run build` 和 `git diff --check` 均通过。生产构建保留既有大包提示；本次未为此修改打包策略。

```sh
node --import tsx artifacts/scene-theme/celestial_realm/scene7-decomposition/verify-runtime.mjs
```

`environment-composite.png` 为环境叠放图，`assembly-preview.png` 为按真实默认布局合成的静态素材装配，`foreground-set-review.png` 为6套前景放回完整场景的对照。静态图不含动态用户照片、纪念文字和可交互供品，不是浏览器截图。未启动浏览器自动化；最终视觉由用户在页面中查看。未提交Git。
