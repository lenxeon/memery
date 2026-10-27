# 暖意窗光墙框侧边修补

工具：内置 imagegen，透明 PNG 编辑。生产素材：`public/themes/warm_blessing/wall-scenery/ivory-arched-wall.png`，1024×1536 RGBA。保持现有墙框构图，只补齐外缘墙面，窗洞保留透明。未用脚本修改图片。

最终编辑提示词：

```text
Edit this existing layered-game WALL PANEL asset. It is NOT an isolated window object and has NO exterior background. It is a FULL RECTANGULAR WALL which MUST FILL THE ENTIRE IMAGE from edge to edge. Add SOLID OPAQUE IVORY PLASTER WALL on the entire left and right outermost 96 pixel strips, including every edge pixel and all four corners, joining seamlessly to the existing ivory wall behind the columns. Specifically the columns x=32..140 and x=884..992 must have solid ivory plaster BEHIND THEM ALL THE WAY TO x=0 and x=1023. Never cut out the exterior silhouette, never remove ivory plaster as background, never fade the outer wall. Only the inner individual glass window panes (inside x=165..858 and y=140..1260 with the arched top) are holes with transparency. Architecture, color, gilding, mullions, column widths, shape and placement must exactly match this 1024x1536 source. Leave everything outside those interior pane openings 100% opaque (alpha=255). This includes the side strips outside the columns and the top/bottom borders. Keep the interior pane transparency. No landscape or graphic text. The output image is a rectangular full-bleed architectural wall with transparent pane apertures cut out of its interior, NOT a cutout silhouette of an arch. Absolutely NO transparent pixels at the outer image perimeter.
```

静态检查：两侧最外 96px 条带的 alpha 最低分别为 247/255、249/255，替换前边缘典型值约为 3/255；窗洞抽样 alpha 为 7/255。该生成 PNG 仍存在轻微 alpha 软化，未宣称所有像素达到 255。最终视觉按用户截图审核。


## 红线位置横档补充

在相同墙框上按用户标记补入一条横档。imagegen 输出另含其它区域 alpha 改动，所以最终仅把该图中的横档局部合成到上一版边缘已修好的主图；窗洞、两侧外墙与其它画面继续使用原主图像素。输出仍是 1024×1536 RGBA。两侧外墙最外 96px 的 alpha 最低值为 247/255 和 249/255；取样横档 alpha 为 252–255，窗洞取样仍透明。

横档生成提示词：

```text
Use case: precise-object-edit. Image 1 is the exact existing 1024x1536 transparent architectural wall frame to edit. Image 2 is the user's screenshot with a red line marking the desired missing crossbar position; red is ONLY a placement guide and must not appear in output. Add exactly ONE continuous, straight horizontal gold wood muntin across the central opening in the lower half of the inner arched window. Map its placement from Image 2 onto Image 1: the guide is at approximately 31% of the wall-frame image height from top, crossing the two inner upright mullions in the upper third of the large rectangular window section below the inner arch. In Image 1 coordinates, place the bar at y≈478, running horizontally from x≈295 to x≈730 and meeting/visually joining both inner upright mullions, passing over the center vertical mullion. Match the existing crossbars in Image 1 precisely: the thin dimensional honey-gold carved wood profile, edge highlights, bevel, thickness, perspective, light direction, and clean joint connections. This must read as a real wooden window crossbar continuous across all four pane divisions, aligned to and connecting with the mullions. Change no other parts: preserve the exact arch, windows, full wall, columns, crop, resolution 1024x1536, RGB appearance, and full-bleed opaque outer wall. Keep every glass/window opening genuinely transparent. Add no red, no words, no extra rails or decoration, no scenery. Return one RGBA PNG at exactly the source size.
```
