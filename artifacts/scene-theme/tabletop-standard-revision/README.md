# 主题1桌面基准与雪庭供桌修订

按用户确认，重生成对象为上张对比图的第3张——「雪庭梅映」（主题4）；「莲池清境」（主题3）保留原有供桌。

## 更新内容

- 项目 `.agents/skills/memery-scene-theme/SKILL.md` 已加入主题1平整桌面基准：左右前沿长约329.8 CSS px、后缘长约282.3 CSS px、可见纵深目标31.4 CSS px。画布为393×852，默认桌位forward=0；排除卷沿和桌沿厚度。
- 主题1通过内置imagegen局部增加平整桌面纵深，新PNG使用独立v3路径；原v2继续供主题3使用。
- 主题4通过内置imagegen重生成暖木雕花供桌，保留桌型、暖木与雕花，增加原来过薄的可见顶面；新PNG为v2。旧素材保存在reference/，未留作无引用的运行时文件。
- 两套主题的源尺寸、有效边界、前后缘、桌面承载四边形、料厚地标和默认宽度已按新PNG重标定。前后缘采用同一平整承载面口径。

## 最终默认布局测量

| 主题 | 修订前平整桌面 CSS px | 修订后平整桌面 CSS px | 后缘/前缘 | 纵深/前缘 |
| --- | --- | --- | --- | --- |
| 主题1 · 晴岚映曜 | 329.8 × 28.6 | 328.2 × 31.4 | 0.8501 | 9.57% |
| 主题4 · 雪庭梅映 | 335.7 × 8.2 | 322.8 × 31.4 | 0.8541 | 9.73% |

新PNG保持原生分辨率、原生alpha，仅进行整桌等比适配。默认widthRatio做了小幅等比校准，使最终平整桌面纵深约31.4 CSS px；主题1实测长度328.2在329.8±2 CSS px的校准范围内。主题4按相同纵深目标与近似桌面比例重做，卷沿造型仍为雪庭主题自身款式。

坐标由最终PNG人工标点，单点误差约±3源像素；显示测量由当前布局函数计算，31.4是按这些标点得到的校准值。15°±2°仍是生成观感目标，未把它写成真实相机角度的测量值。最终视觉仍由用户在页面审核。

## 保存路径

- 主题1：`public/themes/classic_dawn/table/altar-table-render-match-v3.png`
- 主题4：`public/themes/snow_plum_courtyard/table/carved-timber-altar-v2.png`
- 主题配置：上述两个主题目录中的manifest.json，版本号均递增。
- `prompts.md`：完整内置imagegen提示词，包括局部校准与比例导引。
- `before-after-tabletops.png`：同一比例下的桌面修订前后对照。
- `updated-tables.png`：两张完整新桌子。
- `snow-plum-static-assembly.png`：新雪庭桌放回场景的静态检查图，不含动态像容、纪念文字、供品或UI。
- `theme1-measurement.json`、`theme4-measurement.json`：实际标点与像素边界。
- `verification.json`：调用当前布局函数后的结果、源素材hash和alpha范围。
- `reference/`：修订前配置与雪庭桌参考；历史三桌测量报告已使用这些快照，维持修订前数据的可复现性。

## 验证

- SKILL的quick_validate通过，现有内容与前置用户改动已保留。
- `npm run lint`、`npm run build`通过；构建保留既有的大chunk提示。
- 真实主题加载器校验通过：四套主题可载入；主题4全部18条PNG引用存在，默认装配、前景候选和供品边界有效。
- `verify-tabletops.mjs`调用当前布局函数，验证两个桌面默认纵深约31.4、主题1长度容差、承载四边形与前后缘一致、等比缩放、供品边界，并确认主题3的table定义与主题1修改前完全一致。
- 新PNG尺寸与manifest一致，透明背景/桌下孔洞存在；同步更新JSONC规范说明、主题1拆解说明以及主题4拆解清单和场景检查图。

复现尺寸检查：

```sh
node --import tsx artifacts/scene-theme/tabletop-standard-revision/verify-tabletops.mjs
python3 artifacts/scene-theme/tabletop-standard-revision/render-review.py
```

未启动浏览器自动化，未提交Git。
