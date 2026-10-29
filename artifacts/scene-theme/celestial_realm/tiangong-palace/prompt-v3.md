# 天宫概念v3 · 缩小中央像位

## 规范要求

用户用局部截图指出中央玉碑与圆框“太大了”。本轮将整套中央玉屏等比缩小，目标约为v2宽高的60%，覆盖本场景先前像位尺寸目标；底部仍落在供桌后方台基。保持整幅场景、殿柱、远景、供桌、供品、席垫和蒲团的构图。背景缺口由image_gen补全云海，不通过运行时缩放实现。全幅导出1179×2556，采用等比尺寸适配与中心裁边，不作非等比拉伸。原图和v2均保留。此稿为美术概念修订，未接入代码；墙地分界及整体装配仍未作最终审核。

## 内容描述

缩小白玉描金屏风、圆形空白像框、边柱与底座，减少纪念碑体量，露出中央云海与两侧仙宫云桥。输出为concept-v3.png，工具为内置image_gen；生成器原始输出保存在concept-v3-source.png。

### 实际提示词

```text
Use case: precise-object-edit.
Image 1 is the full edit target. Image 2 is the user's crop identifying ONLY the large central upright jade portrait screen that is too big. It is a locator reference, not a new composition.
Make ONE change to image 1: substantially reduce the ENTIRE central jade memorial screen assembly, including its circular empty portrait frame, vertical jade panel, gold cloud ornament, side posts and small base, to approximately 60% of its current WIDTH AND HEIGHT. The user's feedback is "too big". This must be a visibly much SMALLER, delicate freestanding portrait screen, not a monumental wall or tombstone.
Keep the screen's bottom/base at the same position on the rear ledge behind the altar table, horizontally centered at x=0.50W. Scaling is anchored at its bottom center. Therefore its top moves DOWN, freeing a LARGE AREA of cloud sea and palace view above and to both sides. For clarity: current screen including decorations spans approximately x=0.24W..0.76W and y=0.32H..0.68H. After reduction it should span roughly x=0.34W..0.66W and y=0.46H..0.68H. Its circular portrait opening also shrinks proportionally; ignore any earlier larger portrait-circle specification. Keep this circle EMPTY softly lit ivory, no people or text. Preserve the same beautiful ivory jade, champagne gold and cloud carving in the smaller scale, use restrained fine detail.
Where the large old screen used to be, seamlessly reconstruct the existing airy cloud sea, distant palace bridges and mountain mist. Do not leave a blank white rectangular patch or a ghost outline. Preserve the majestic cloud palace view and its perspective.
CRITICAL invariants: preserve the full tall portrait canvas, 1179x2556 aspect, overall camera and framing. Do not zoom or crop the whole image. Do not resize or move the large left/right hall columns, overhead cornice, distant palace buildings, altar table, pair of flower vases, candles, censer, fruit plates, tea cups, floor, mat, cushion or corner foreground flowers. Keep every offering at its existing position and scale. Keep lighting, palette, texture quality and all other details unchanged.
Complete high-quality photorealistic image, no guide lines, no labels, no text or UI. The visible outcome must be that the center feels much lighter and more open, with a small elegant memorial screen behind the altar instead of an oversized monument.
```
