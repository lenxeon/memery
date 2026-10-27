# 组件契约速查

## 选择状态

```ts
interface SceneAssemblySelection {
  wallpaperId: string;
  wallpaperDecorationId: string;
  wallSceneryId: string;
  wallDecorationId: string;
  groundMatId: string;
  cushionId: string;
  foreground: {
    left: SceneForegroundInstance;
    right: SceneForegroundInstance;
  };
}
```

单选部件保存一个 id；左、右前景分别保存一个实例对象。替换一侧前景只替换对应侧对象。

## 墙面层级

```text
backgroundLayer
  wallpaper
wallpaperDecorationLayer
  optional wallpaper decorations (for example, movable window blossoms)
wallFrameLayer
  complete wall and window frame
portraitLayer
  memorial portrait + title
floorLayer
  complete perspective floor image
tableLayer
  altar table
groundFrontLayer
  ground mat (camera-matched sprite)
  cushion (camera-matched sprite, after the mat)
propsLayer
  offerings
lightsLayer
  dynamic light effects
  foreground.left
  foreground.right
```

This is the target order defined by the theme manifest. If a frame intentionally crosses the wall/floor seam, clip it to the wall region and keep it behind the memorial portrait.

如果部件需要跟随遗像环缩放，使用 `SceneThemePortraitAsset` 的 `widthInPortraits`、`dxInPortraits` 和 `dyInPortraits`；不要用固定屏幕像素。

墙布等带有完整构图的远景以 iPhone 16 竖屏为基准制作，并通过 `SceneThemeViewportAsset.responsiveAssets.phone` 登记；其他手机比例沿用经审核的构图等比缩放并在安全区内裁切。月洞门、格栅等整框造景使用 `fit: 'wall-frame'`，按视口宽度比例铺开并锚在墙顶；可按整体渲染稿让框架越过墙地交界，与供桌脚落点呼应。比例必须保留足够宽的中间开口，避免侧柱挤压遗像和墙纸。窄横图不得在手机竖屏上直接 `cover` 放大裁切。

## 地面部件摆放规格

地坪本身是一张完整、不透明且透视已经画入图像的 PNG。Pixi 直接将它作为普通精灵放置，按地坪视口等比 cover 并裁切边缘；不得再次做网格投影、UV 映射或透视变形。

席垫和蒲团是与整体渲染稿机位匹配的透明 PNG，相机内已包含浅俯视角度与地面透视。Pixi 将它们作为精灵放在地面前层，只根据视口宽度和画布底边锚点缩放、定位；不可对素材再次使用地面透视映射。

```ts
interface SceneThemeGroundAsset {
  url: string;
  widthRatio: number; // footprint width relative to viewport width
  bottomRatio: number; // screen anchor for the footprint's front edge
  alpha?: number;
}
```

主题 01 首版席垫规格为 `widthRatio: 0.62 / bottomRatio: 0.045`，蒲团规格为 `0.19 / 0.055`，让蒲团落在席面中部而不是前沿。宽度比例指精灵画布相对视口的宽度；资产透明留白应收紧到物体边缘附近。审计通过后的同类扩展资产保持相同轮廓、画幅与显示尺寸。

近镜头前景可在 `SceneThemeViewportAsset.blur` 中指定轻微的运行时虚化强度，建议从 `1–1.5` 起调，由 Pixi `BlurFilter` 实现；不要为了虚化重新生成 PNG，也不要把光斑或散景烘焙进素材。

## 注册目录

当前目录按五类墙面/地面插槽和两类前景目录组织。首次交付每个插槽只提供一个经过选择的实现；完成用户审计后再增加候选风格：

```text
WALLPAPER_OPTIONS             # 墙纸
WALLPAPER_DECORATION_OPTIONS  # 遗像周边完整背饰/前饰
WALL_SCENERY_OPTIONS          # 墙面造景
WALL_DECORATION_OPTIONS       # 灯饰/挂饰
GROUND_MAT_OPTIONS            # 席毯
CUSHION_OPTIONS               # 蒲团/坐垫
SCENE_FOREGROUND_OPTIONS      # 左右分开的完整前景定义
```

新主题的默认组合由 `createDefaultSceneAssembly()` 或主题自身的 `defaultAssembly` 返回。增加候选只需增加注册项和对应 PNG，不能改变 `SceneAssemblySelection` 的字段含义。
