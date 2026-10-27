# 场景主题 JSONC 契约

本文定义应用实际读取的主题 catalog 与 `public/themes/<theme-id>/manifest.json`。字段、类型和默认装配以此为准；TypeScript 主题注册表只负责加载、校验和归一化，不维护第二套主题数据。

## 文件与启动

- `public/themes/catalog.json` 是唯一主题入口，`themes` 是 manifest 描述对象数组。UI 只展示 catalog 中的主题；暂时下线主题时从 catalog 移除，不删除素材目录。
- 每个 manifest 使用 JSONC，可写 `//` 注释。运行时加载器先移除字符串外的行注释和块注释，再按 JSON 解析；禁止尾随逗号。
- 所有素材路径相对 `public/` 根目录，例如 `themes/classic_dawn/...` 或共享素材 `scene-assets/...`。加载器转换成站点根路径。
- `schemaVersion` 当前为 `1`。升级字段约定时同时更新本文、相关 manifest、TypeScript 契约与通用加载器。

## Manifest 字段

主题有共同的元信息、`preset` 和 `lightRig`。画面字段可使用下列一种模式：拆分图层，或单张完整背景。

| 字段 | 类型 | 含义 |
|---|---|---|
| `schemaVersion` | number | JSON 契约版本 |
| `themeId` | string | 稳定 ID，必须与 catalog 的 ID 和目录名一致 |
| `name`, `poeticTitle`, `iconText`, `desc`, `tag` | string | 主题显示信息 |
| `version` | number | 该主题素材与构图修订号 |
| `sceneBackground` | object? | 单张完整场景图模式；配置后拆分图层字段必须为空 |
| `wall`, `ground`, `table` | object / null | 拆分图层模式的墙体、地面和供桌；单图模式设为 `null` |
| `foregroundCandidates` | object? / null | 拆分图层模式的左右前景候选，分别以对象键保存 |
| `defaultAssembly` | object / null | 拆分图层模式的新场景默认部件和供品模板；单图模式设为 `null` |
| `foregroundSetIds` | string[] | 当前主题允许切换的前景组 ID |
| `defaultForegroundSetId` | string | 默认前景组 |
| `preset` | object | 桌布和初始光照设置 |
| `lightRig` | object | 主光位置、强度、颜色与阴影方向 |

### 单张完整背景模式

当场景图本身已经包含墙面、窗户、地板、光照和阴影等最终画面时，使用 `sceneBackground` 直接显示整张图。窗框和地坪不再拆层；`wall` 写为 `null`，`ground.floor` 写为 `null`，渲染器跳过独立地板层。供桌、席垫、蒲团、左右前景和供品仍可由 `table`、`ground.groundMat`、`ground.cushion`、`foregroundCandidates` 与 `defaultAssembly` 单独配置并叠加到整张背景上。动态遗像与重复地板渲染保持关闭。

`sceneBackground.asset` 必须是当前主题目录内的 PNG。渲染时按视口宽高比等比 cover 铺满整个画布，只允许边缘裁切；若配置了桌体、席垫、蒲团或前景，它们按主题素材位置叠加。

```jsonc
{
  "sceneBackground": {
    "mode": "single-background",
    "asset": "themes/warm_blessing/backgrounds/scene2-full.png"
  },
  "wall": null,
  "ground": {
    "floor": null,
    "groundMat": { "id": "rush_mat", "asset": "themes/warm_blessing/mats/rush.png", "widthRatio": 1.2, "bottomRatio": 0.045 },
    "cushion": { "id": "woven_cushion", "asset": "themes/warm_blessing/cushions/cushion.png", "widthRatio": 0.32, "bottomRatio": 0.065 }
  },
  "table": { "id": "oak_altar", "asset": "themes/warm_blessing/table/altar.png" },
  "defaultAssembly": { "groundMatId": "rush_mat", "cushionId": "woven_cushion" }
}
```

### 墙面层顺序

由远到近固定为：

1. `wall.wallpaper`：不透明壁画底图，不负责运行时光照。
2. `wall.wallpaperDecorations`：可选的独立花枝等装饰，列表项含透明素材和相对遗像环的 `widthInPortraits`、`dxInPortraits`、`dyInPortraits`。
3. `wall.frame`：墙体与完整窗户/框架的一张 RGBA PNG。拱顶、窗棂、立柱、横档必须作为一个整体；窗格内部用 PNG 的透明 alpha 留空，让下方壁画从窗洞中露出。不能用 SVG 包装，也不能把框架拆成多个图层。
4. `wall.portrait`：动态遗像和纪念文字的缩放与纵向微调。

`wall.wallpaper`、`wall.frame` 可按设备提供 `assets.phone`、`assets.tablet`；路径相对 `public/`。壁画与框架按同一顶部锚点和构图尺度对齐。`frame.position` 的 `x/y/widthRatio` 是相对画布的归一化构图参数；可选 `bottomExtensionRatio`（0–0.15）让壁画和框架共同向下延伸，遮住不同长宽比下的墙地交界。`frameDecorations` 是可选的独立附件，不得用它拆分本应完整绘制的墙体或窗框。

`wall.wallpaper` 可选 `video: { "asset": "themes/<themeId>/wallpapers/phone/background.mp4" }`，路径必须是当前主题目录内的 MP4。未配置时保持静态壁画；配置后仍必须保留 `assets.phone` 静态 PNG，使用与视频首帧一致的构图和画幅，作为海报及回退图。视频与静态图共用顶部中轴和等比 cover 布局，位于全部墙饰、框架和遗像之后。运行时默认静音、循环、内联播放，不改变其他图层的光照；首帧可播放前、加载失败或自动播放被阻止时显示海报。系统开启减少动态效果时只显示静态图；页面不可见时暂停，返回后恢复。视频加载不阻塞静态场景就绪，切换壁画或销毁画布时释放视频及专属纹理。不在 manifest 中配置音量、播放速度或额外裁切坐标。

```jsonc
{
  "assets": { "phone": "themes/lotus_mandorla/wallpapers/phone/cloud-sea-poster.png" },
  "video": { "asset": "themes/lotus_mandorla/wallpapers/phone/cloud-sea.mp4" },
  "fit": "cover"
}
```

附件若由一张 PNG 图集中的多个小部件组成，可用 `wallParts` 指定图集切片及其在墙面构图中的锚点。每项的 `frame` 使用 PNG 源像素矩形 `{x,y,width,height}`；`anchor.x/y` 是墙面构图中的归一化中心坐标，`anchor.widthRatio` 是该部件相对墙面构图宽度的显示宽度比例。可选 `centerRegionByProfile.phone/tablet` 提供源图横向区域 `{left,right}`，渲染时以该区域中心作为横向锚点。此字段只用于装饰附件，不能把完整墙体或主框架拆成独立图块。

```jsonc
{
  "id": "stone_mandorla_ring",
  "asset": "themes/lotus_mandorla/wall-decor/mandorla-ring.png",
  "wallParts": [
    {
      "frame": { "x": 0, "y": 0, "width": 1254, "height": 1254 },
      "anchor": { "x": 0.5, "y": 0.47, "widthRatio": 0.366 }
    }
  ]
}
```

### 地面和供桌

- `ground.floor` 必须引用该主题的完整不透明透视地坪 PNG；地面的单点透视、纹样远近变化和构图需直接生成在图像内，Pixi 将图像作为普通精灵等比 cover 摆入墙地交界下方的地坪区域。这里定义烘焙光照标记、素材未就绪时的底色和踢脚线色，不支持公共地板材质或地面渲染模式切换。
- 地坪 `asset` 必须位于 `themes/<themeId>/` 内并以 `.png` 结尾；`mode`、`tileSize` 等旧地材字段会被加载器拒绝。运行时禁止 `PerspectiveMesh`、UV 映射、单应变换、地面投影、非等比拉伸和重复平铺；适配不同手机长宽比时只进行等比 cover 与边缘裁切。素材缺失时只显示该主题 `baseColor` 并报告加载错误。
- `ground.groundMat`、`ground.cushion` 各自定义素材、显示宽度比例和画布底边比例。
- `table.position` 定义桌体水平锚点、离画布底边比例、默认宽度范围以及前后拖动时的缩放和位移；渲染层不得按 `themeId` 写另一套桌位常量。
- `table.geometry` 中 `visibleBounds`、各个 Y 地标、腿位、腿宽和牙板边界都相对桌子源图宽高归一化至 `0..1`。
- `table.surface.assetQuad` 是桌面承载平面的四边形，坐标相对桌子 PNG；`backLeft/backRight` 为靠墙边，`frontRight/frontLeft` 为靠镜头边。`usableArea` 是 `uMin/uMax/vMin/vMax` 桌面局部坐标范围。
- 桌型差异由 `table.asset`、`structure`（`legged`、`legless`、`pedestal`）和 `surface` 表达。供品坐标不因桌腿或桌裙改变。

### 默认供品和左右前景

- `defaultAssembly.offerings` 是新场景的初始供品模板，以稳定场景物品 ID 为键；每项有 `catalogId`、`position.u/v` 和可选 `scale`。`u/v` 为桌面局部坐标，必须在 `0..1` 且位于该桌的 `usableArea` 内。
- 用户上供、移动或撤供只更新运行时场景状态，不回写 manifest。新供品由通用布局器结合当前桌面 `usableArea`、物品占地和间距选位。
- `foregroundCandidates.left` 与 `.right` 必须是对象，不用数组；对象键与候选 `id` 相同。左右默认装配 `defaultAssembly.foreground.left/right` 也是单个实例对象。
- 候选前景含 `setId`、显示信息、`defaultHeightRatio`、高度边界、`bottomOverflowRatio` 和 `asset`。同一 `setId` 的左右候选构成一组。

### 光照

`lightRig` 只配置运行时光照。墙纸和壁画不烘焙光照；主题光照只作用于供桌、地板及木质框架/装饰。地板若 `bakedLighting` 为 `true`，应关闭重复的运行时地面光斑。`godRaysEnabled` 为 `false` 时关闭丁达尔光。

## 完整示例

```jsonc
{
  "schemaVersion": 1, // 结构升级时递增。
  "themeId": "warm_blessing", // 必须与 catalog 条目一致。
  "name": "暖意窗光", // UI 显示名。
  "poeticTitle": "温光常伴", // 主题副题。
  "iconText": "☀️", // 主题入口图标。
  "desc": "奶油暖墙 · 浅橡木供桌", // 主题说明。
  "tag": "温暖明亮", // 分类标签。
  "version": 1, // 主题素材修订号。
  "wall": {
    "wallpaper": { // 不透明的独立壁画图。
      "id": "warm_mural",
      "name": "春山壁画",
      "poeticTitle": "远岫含烟",
      "description": "只画墙纸内容，不绘独立窗花。",
      "assets": { "phone": "themes/warm_blessing/wallpapers/phone/wallpaper.png", "tablet": "themes/warm_blessing/wallpapers/tablet/wallpaper.png" },
      "fit": "cover"
    },
    "wallpaperDecorations": [], // 没有窗花时保留空数组。
    "frame": { // 完整墙体和窗框为单张素材。
      "id": "ivory_arch_window",
      "name": "象牙金拱窗",
      "poeticTitle": "窗景纳山",
      "description": "整张墙体和窗格，不拆拱顶与立柱。",
      "previewUrl": "themes/warm_blessing/wall-frame/phone/arch-window.png",
      "assets": { "phone": "themes/warm_blessing/wall-frame/phone/arch-window.png", "tablet": "themes/warm_blessing/wall-frame/tablet/arch-window.png" },
      "fit": "wall-frame",
      "position": { "x": 0.5, "y": 0, "widthRatio": 1 },
      "responsiveWidthRatios": { "phone": 1, "tablet": 1 }
    },
    "frameDecorations": [], // 可选的宫灯等附件。
    "portrait": { "scale": 1, "dy": 0, "textDy": 0, "textGap": 0 } // 动态遗像与文字定位。
  },
  "ground": {
    "floor": { "id": "light_oak_perspective_plate", "name": "浅橡木透视地坪", "asset": "themes/warm_blessing/floor/light-oak-planks.png", "bakedLighting": true, "baseColor": "#e8c89a", "baseboard": { "color": "#b98953", "highlight": "#f3d8a8" } },
    "groundMat": { "id": "rush_mat", "name": "象牙编席", "poeticTitle": "暖席迎光", "description": "浅麦色编席。", "asset": "themes/warm_blessing/mats/rush.png", "previewUrl": "themes/warm_blessing/mats/rush.png", "widthRatio": 1.2, "bottomRatio": 0.045 },
    "cushion": { "id": "woven_cushion", "name": "暖棕蒲团", "poeticTitle": "藤编安坐", "description": "独立藤编蒲团。", "asset": "themes/warm_blessing/cushions/cushion.png", "previewUrl": "themes/warm_blessing/cushions/cushion.png", "widthRatio": 0.32, "bottomRatio": 0.065 }
  },
  "table": {
    "id": "oak_altar", "name": "浅橡木供桌", "asset": "themes/warm_blessing/table/altar.png", "structure": "legless", "woodStyle": "white_oak", "runner": false,
    "position": { "x": 0.5, "bottomRatio": 0.125, "widthRatio": 0.9, "minWidthRatio": 0.84, "maxWidthRatio": 0.92, "forwardScale": 0.07, "forwardOffsetRatio": 0.028 },
    "geometry": { "sourceSize": { "width": 1536, "height": 1024 }, "visibleBounds": { "left": 0.02, "top": 0.32, "right": 0.98, "bottom": 0.82 }, "frontEdgeY": 0.38, "backEdgeY": 0.32, "fasciaBottomY": 0.44, "apronBottomY": 0.61, "footBottomY": 0.82 },
    "surface": { "assetQuad": { "backLeft": { "x": 0.08, "y": 0.32 }, "backRight": { "x": 0.92, "y": 0.32 }, "frontRight": { "x": 0.96, "y": 0.38 }, "frontLeft": { "x": 0.04, "y": 0.38 } }, "usableArea": { "uMin": 0.08, "uMax": 0.92, "vMin": 0.08, "vMax": 0.94 }, "backScale": 0.85, "frontScale": 1 }
  },
  "foregroundCandidates": {
    "left": { "plum_left": { "id": "plum_left", "setId": "plum", "name": "梅枝·左", "poeticTitle": "春信入庭", "description": "左侧梅枝。", "plant": "梅花", "focusTreatment": "焦外已烘焙。", "defaultHeightRatio": 0.4, "minHeightRatio": 0.18, "maxHeightRatio": 0.4, "bottomOverflowRatio": 0.12, "asset": "scene-assets/foregrounds/plum/left.png", "widthRatio": 0.34 } },
    "right": { "plum_right": { "id": "plum_right", "setId": "plum", "name": "梅枝·右", "poeticTitle": "春信入庭", "description": "右侧梅枝。", "plant": "梅花", "focusTreatment": "焦外已烘焙。", "defaultHeightRatio": 0.3, "minHeightRatio": 0.18, "maxHeightRatio": 0.4, "bottomOverflowRatio": 0.12, "asset": "scene-assets/foregrounds/plum/right.png", "widthRatio": 0.34 } }
  },
  "defaultAssembly": {
    "wallpaperId": "warm_mural", "wallpaperDecorationId": "none", "frameId": "ivory_arch_window", "wallDecorationId": "none", "groundMatId": "rush_mat", "cushionId": "woven_cushion",
    "offerings": { "vase_left": { "catalogId": "flower_vase", "position": { "u": 0.18, "v": 0.35 }, "scale": 1 }, "censer": { "catalogId": "censer", "position": { "u": 0.5, "v": 0.38 }, "scale": 1 } },
    "foreground": { "left": { "foregroundId": "plum_left", "offsetX": -0.36, "offsetY": 0, "alpha": 1 }, "right": { "foregroundId": "plum_right", "offsetX": 0, "offsetY": 0, "alpha": 1 } }
  },
  "foregroundSetIds": ["plum"], "defaultForegroundSetId": "plum",
  "preset": { "tablecloth": "moonlight_white", "lighting": { "sunAngle": 0, "sunlightIntensity": 0.82, "godRaysIntensity": 0, "godRaysEnabled": false } },
  "lightRig": { "source": { "x": 0.5, "y": 0.12 }, "sunAngle": 0, "sunlightIntensity": 0.82, "godRaysIntensity": 0, "godRaysEnabled": false, "keyColor": "#fff1d5", "ambientColor": "#f6ead2", "shadowDirection": { "x": 0, "y": 1 } }
}
```

## 校验清单

- catalog 中每个 ID 唯一；每个 manifest 的 `themeId` 与其一致。
- 拆分图层主题按拆分字段校验；单图主题声明 `sceneBackground` 并将 `wall`、`ground`、`table`、`defaultAssembly` 置为 `null`。
- 默认装配引用的部件 ID 必须存在；默认前景 ID 必须分别存在于左、右候选对象。
- `wall.frame` 始终是单个完整素材；不能把墙纸、窗花或遗像合并进框架。
- 可选 `wall.wallpaper.video` 为含 `asset` 字符串的对象；MP4 属于当前主题，静态 PNG 必须保留且与首帧匹配。省略整个 `video` 字段表示静态主题，不使用空路径。
- 桌面归一化坐标在 `0..1`；默认供品点位位于 `usableArea`。
- 每次修改主题 JSONC 后，必须逐字段对照本文，并检查 catalog 引用、素材路径、部件引用和供品边界一致。
- `SceneThemeLayer`、地板和供桌布局从 manifest 取值；不得增加按 `themeId` 写的渲染分支或重复布局常量。
