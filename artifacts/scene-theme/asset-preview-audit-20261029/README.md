# 红框席垫与蒲团对比审计（2026-10-29）

对照用户截图中的四项资产，以「金篾编席」和「象牙锦面蒲团」为同类参照。`comparison.png` 按素材生成静态对照，左列模拟原来的居中 cover，中央展示修复后的 contain，右列为同类参照；不是浏览器截图。

| 资产 | 根因 | 原画幅 → 修复画幅 |
| --- | --- | --- |
| 清篾长席 | 主体从源图第 714 行才开始，占图高约 24%；上方大块留白与低透明度背景残留使 cover 预览仅露出底部 | 1536×1024 → 1544×255 |
| 象牙编席 | 与清篾长席共用相同的留白和透明通道问题 | 1536×1024 → 1544×255 |
| 暖篾花纹席 | 上下留白分别约 23% 和 20%，透明区有红黄杂边和散点，cover 进一步截掉完整轮廓 | 2172×724 → 2012×434 |
| 锦面藤编蒲团 | 顶部留白约 18%、底部约 10%，透明区有散点与杂边，造成卡片中的可见占比和居中位置不一致 | 1774×887 → 1695×666 |

## 处理

- 保留原图的物体像素、纹样、材质和透视；只修复透明通道和导出画幅，没有重画或非等比拉伸。
- 清除 alpha 1–15 的背景残留，保留连通主体并恢复不透明内区；共移除 82,622 个低 alpha 像素。四周保留等宽的透明安全边。
- `AmbiancePanel.tsx` 中，席垫和蒲团使用 `bg-contain bg-center bg-no-repeat`，完整展示轮廓。
- 在 393×852 设计画布中按源图裁切差值补偿 `widthRatio`、`bottomRatio`；可见宽度和接地位置误差均小于 0.000001 CSS px。同步更新引用清篾长席的 classic_dawn、lotus_serenity，以及 warm_blessing、snow_plum_courtyard 的素材修订号。
- 尝试了内置 imagegen 编辑，但候选仍有透明区杂点，并改变了席面比例，因此未采用这些生成图。最终资产来自原图的确定性导出；候选提示词保存在 `candidate-prompts.json`，只作过程记录。

## 验证

- `npm run lint` 和 `npm run build` 通过；构建仍提示已有的大体积 chunk。
- 用应用自身的 `loadSceneThemes()` 加载当前 catalog，主题契约校验通过；部件素材与预览路径存在。
- 已核对四份修改的 manifest：字段/类型未扩展，默认装配与部件 ID 保持一致，路径存在，两个位置字段保持原有比例单位，未引入空候选值或不符合 JSONC 的语法。
- `verification.json` 记录四张素材的透明安全边、内部不透明像素、无红黄饱和彩边、物体 RGB 像素未改、设计画布摆放补偿结果。`measurements.json` 保存尺寸、边界、哈希和新旧摆放参数。
- 未启动浏览器自动化；实际页面与场景观感待用户刷新后审核。

## 文件

- `public/themes/classic_dawn/mats/clear-rush-long-mat-unified.png`
- `public/themes/warm_blessing/mats/ivory-rush-mat.png`
- `public/themes/snow_plum_courtyard/mats/straw-mat.png`
- `public/themes/snow_plum_courtyard/cushions/brocade-cushion.png`

`export-assets.mjs` 是本次确定性导出脚本，需从项目根目录执行，参数为修复前 PNG/manifest 所在目录和本机 sharp 包目录；输入必须是修复前快照，不能再次以修复后的图覆盖原始输入。本次原始快照保存在 `/private/tmp/memery-asset-audit-20261029/`。
