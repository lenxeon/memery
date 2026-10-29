# 主题1、2、4供桌实测（修订前记录）

主题1与主题4已在后续修订中更新；本报告保留修订前数据。复现脚本对这两套使用已保存的 manifest / 素材快照，最新结果见 [桌面标准修订](/Volumes/data/workspace/memery/artifacts/scene-theme/tabletop-standard-revision/README.md)。

测量对象为测量当时 manifest 引用的实际 PNG；统一测量平整承载桌面，排除两端卷沿、桌沿厚度、围板和桌腿。原图四角由人工按像素边界标定，单点误差约 ±3 px；脚本计算长度、前后投影、面积与透视比例。

显示尺寸通过项目当前 `getSceneCompositionWidth`、`getSceneThemeAltarTableMetrics` 函数计算，基准画布为 393×852 CSS px、默认进深 `forward=0`。以下显示数据是布局计算结果，未启动浏览器做视觉验收。

## 桌面实际测量

| 主题 | 桌子 | 源图前沿长 × 前后投影 px | 手机前沿长 × 前后投影 CSS px | 纵深/前沿长 | 后缘/前缘 |
| --- | --- | --- | --- | --- | --- |
| 1 · 晴岚映曜 | [classic_dawn](/Volumes/data/workspace/memery/public/themes/classic_dawn/table/altar-table-render-match-v2.png) | 1568 × 136 | 329.8 × 28.6 | 8.67% | 0.856 |
| 2 · 暖意窗光 | [warm_blessing](/Volumes/data/workspace/memery/public/themes/warm_blessing/table/legless-oak-altar-v2.png) | 1490 × 126 | 371.9 × 31.4 | 8.46% | 0.832 |
| 4 · 雪庭梅映 | [snow_plum_courtyard](/Volumes/data/workspace/memery/artifacts/scene-theme/tabletop-standard-revision/reference/snow-plum-table-before.png) | 1605 × 39 | 335.7 × 8.2 | 2.43% | 0.898 |

前后“宽”在此表示屏幕上的纵深投影，不代表物体真实物理宽度；图片未提供厘米尺度。所有长度均按平整桌面边界计算，整桌（含卷沿）默认显示宽分别为 373.35、373.35、369.42 CSS px。

## 视角判断与规范对照

- 规范目标：俯视 15°±2°；桌面纵深投影/前缘宽 0.07±0.02，后缘宽/前缘宽 0.82±0.03。两个比例依赖器物本身的长宽造型，属于初筛指标。
- 实测纵深比：主题1为 8.67%，主题2为 8.46%，主题4为 2.43%。主题4低于 5% 的初筛下限，考虑 ±3 px 四角标定误差后仍低于该下限。
- 实测后前缘比：主题1为 0.856，处于 0.85 上界附近，测量误差范围与边界重叠；主题2为 0.832，在参考范围内；主题4为 0.898，收窄程度明显更弱。
- 可直接测得两侧纵深边相对屏幕水平线的夹角，分别约为 50.3°、45.2°、25.4°。这些是屏幕边线的投影斜角，不是相机俯视角。
- 三张 PNG 缺少真实桌面长宽比、焦距和相机标定，无法唯一反算真实俯视角；不能把任何一张标成“实测15°”。主题4呈现明显更薄的桌面投影，可能来自更低视线、较短实体进深，或生成图的透视不一致。
- 默认手机布局下，主题4前后投影约为主题1的28.5%、主题2的25.9%；投影面积约为主题1的29.7%、主题2的24.3%。主题4平整桌面长度接近主题1，主要差异集中在可见纵深。

## PNG与JSON的差异

| 主题 | PNG实测纵深 px | surface.assetQuad纵深 px | geometry地标计算纵深 px |
| --- | --- | --- | --- |
| 1 | 136 | 155.88 | 155.88 |
| 2 | 126 | 128.00 | 128.00 |
| 4 | 39 | 43.00 | 79.00 |

主题1的 JSON 四边形覆盖范围包括部分卷沿/边缘，不等同于有效平整桌面；主题2标注较贴合实物；主题4承载四边形和桌体几何还采用了不同的前缘口径。上一轮提到的主题4“43 px”是 JSON 标注，这次 PNG 实际平整桌面的测量值约为39 px。

## 检查图与复现

- `tables-comparison.png`：三张完整桌子，按实际默认显示比例统一放大2.5倍作对照；绿色线为实测平整桌面。
- `tabletops-comparison.png`：同一显示比例下的桌面局部对照。
- `theme-1-measured-top.png`、`theme-2-measured-top.png`、`theme-4-measured-top.png`：原图像素坐标检查；绿线为PNG实测边界，粉线为JSON四边形。
- `measurements.json` 保存人工标定点；`results.json` 与 `results.csv` 保存完整结果；SHA-256记录本次读取的具体素材。

从项目根目录运行：

```sh
node --import tsx artifacts/scene-theme/table-metrics-1-2-4/measure-runtime.mjs
python3 artifacts/scene-theme/table-metrics-1-2-4/measure-tables.py
```

执行结果：三套素材实际尺寸与 manifest 源尺寸一致；布局函数统一缩放和桌脚锚点检查通过；主题4的桌面纵深比例未达到现有规范初筛范围。本次只新增测量报告与检查图，未修改素材、主题配置或渲染代码。
