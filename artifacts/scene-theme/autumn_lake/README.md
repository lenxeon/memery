# 场景5「秋湖夕照」素材拆分

本次按用户提供的新图保存效果图并拆分，主题 ID 为 `autumn_lake`。代码主题入口为 `public/themes/catalog.json` 的第5项，配置集中在 `public/themes/autumn_lake/manifest.json`，复用现有主题加载器和组件目录。

## 交付

| 文件 | 内容 |
| --- | --- |
| `ui/场景5效果图.png` | 本次选定的完整效果图，1179×2556 |
| `ui/场景5墙纸.png` | 只含夕照、秋湖、远山、飞鹤的全幅不透明背景 |
| `ui/场景5场景图.png` | 亭阁、固定枫枝、完整格栅、石墙、地板与统一光影；窗洞真实透明 |
| `public/themes/autumn_lake/reference/source-original.png` | 本次附件的原始字节副本，852×1846 |
| `prompts.md` | 规范要求、内容描述和7个实际生成提示词；使用内置 image_gen |

## 运行时7张素材

路径均在 `public/themes/autumn_lake/` 内：

| 插槽 | 素材 | 尺寸 |
| --- | --- | --- |
| `wall.wallpaper` | `wallpapers/phone/sunset-lake.png` | 1179×2556 |
| `wall.roomOverlay` | `interior/phone/pavilion-wall-ground.png` | 1179×2556 |
| `table` | `table/marble-oak-altar.png` | 1622×698 |
| `ground.groundMat` | `mats/honey-rush-mat.png` | 1848×464 |
| `ground.cushion` | `cushions/ivory-brocade-cushion.png` | 1478×747 |
| 左前景 | `foregrounds/left.png` | 1179×2556 |
| 右前景 | `foregrounds/right.png` | 1179×2556 |

墙地采用现有背景画 + 透明室内层模式，`ground.floor=null`，省略 `wall.frame`，默认 `frameId=none`。不使用历史单背景兼容字段。固定红枫随室内层保留；窗格、立柱、顶梁未拆成碎件。光影已在环境层统一绘制，默认关闭丁达尔光。

供桌、席垫、蒲团和左右前景与主题2采用同样的独立插槽。桌面的静态供品及空白相框从室内素材中清除；8个默认供品沿用主题2的模板，个人遗像、题名等继续使用已有动态组件及通用布局，不烘焙入 PNG。供桌两条侧边垂布保留在桌体素材中，`runner=false` 避免额外叠加中央桌旗。

## 构图与测量

本次附件 SHA-256 为 `7d91040aa1a0cbb112c3e0fec395ae91a963a74991942bb9d27f5a2478be779c`，与先前保存的 `ui/场景5效果图-参考原图.png` 不同；原图、旧稿和旧审计均保留。旧 `scene5-boundary-audit-20261029.json` 只描述旧图，不是本次分层的审核结论。

用户当前选定的构图墙地交界约为原图 y=1324（标准画布约 y=1833，约0.717H），该位置为肉眼估计，存在柱脚和桌脚遮挡。本次保留它，不通过拉伸改成通用目标 y=1870。原始附件等比 cover 至1179×2556，横向仅裁不足1像素；所有全幅素材同尺寸、同原点。

桌面四角在裁边后源图中约为：后左(155,30)、后右(1468,30)、前右(1596,151)、前左(25,151)，估计误差±3源像素。数据以归一化坐标写入 manifest；默认393×852、forward=0时，可见桌宽369.42 CSS px，承载顶面前沿约368.72 CSS px、后沿约308.16 CSS px、纵深约28.40 CSS px。31.4 CSS px为既有主题1/4的专项修订目标，本次未将其假报为场景5实测值。

两侧前景使用 `referenceCanvas=1179×2556`，默认偏移为0；按原图底缘花枝的原生构图显示，避免沿用历史左侧-0.36位移。右侧花枝比左侧低，保留参考图的非对称边缘构图，不用代码放大。

## 核验记录

- 全幅效果图、墙纸、室内层、左右前景均为1179×2556。
- 墙纸完全不透明；室内窗洞及独立器物/前景有真实 alpha。尺寸和透明像素统计见 `asset-measurements.json`。
- 按 JSONC 契约逐项核对字段、形状、路径、默认 ID、桌面归一化坐标、供品边界和双侧前景对象。
- 使用实际 `loadSceneThemes()` 和组件注册表加载全部5套主题，确认第5项、7个素材路径、2个前景和8个供品点位；结果见 `runtime-validation.json`。
- `npm run lint` 与 `npm run build` 通过；构建保留现有大包提示。
- `environment-composite.png` 是静态环境层叠放图；`assembly-preview.png` 是默认forward=0的静态部件装配示意，不包含运行时个人遗像与供品，不等同于浏览器截图。未启动浏览器自动化；最终视觉仍由用户查看。
