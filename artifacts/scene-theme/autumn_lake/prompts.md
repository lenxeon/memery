# 场景5「秋湖夕照」素材提示词

## 规范要求

以内置 image_gen 编辑工具制作透明素材。正式设计画布统一 1179×2556 px，参考图等比 cover 到此画布，只裁不足 1px 的横向边缘，不拉伸。原始附件 852×1846 px 原样保存在 public/themes/autumn_lake/reference/source-original.png。

本次用户明确选定此图并要求拆分接入，沿用其墙地交界约 y=0.718H（标准图约1835px），不套用旧版草稿 y≈1167 的审计。完整构图与暖金夕照以本次附件为准。墙纸只含湖山夕照；室内层包含完整亭阁、固定枫枝、墙面、地板及统一光影，窗洞为真实 alpha。供桌、席垫、蒲团、左右前景独立；供品、遗像及纪念文字留在运行时。

## 内容描述

秋色群山围合的湖面承接落日金光，桃金色云霞、孤鹤、红枫、浅石亭阁与木格栅构成暖静追思空间。浅木石面供桌保留两端象牙织锦垂布，草编席上放米白锦面蒲团，左右白花只在底缘形成轻柔焦外。

### Wallpaper

```text
Use case: precise-object-edit. Project asset for Memery scene 5 秋湖夕照. Input image is the selected full-scene effect image; it is the visual and composition authority. Preserve its warm peach-gold sunset palette, realistic refined 3D materials, straight verticals, frontal centered camera, and exact vertical framing. Final design canvas target 1179 by 2556 pixels, portrait aspect 0.4613, no stretching, no reframing, no text or watermark. All scene layers must share this full-canvas coordinate system.
Asset type: opaque full-canvas outdoor landscape / wallpaper.
Primary request: Extract and reconstruct ONLY the outdoor sunset lake landscape seen through the pavilion in the reference. Remove the entire indoor architecture, roof, columns, window lattice, red maple branch, wall panels, floor, table, portrait frame, all offerings, mat, cushion and all blurry foreground flowers. Inpaint their former locations as a continuous outdoor view. Keep existing landscape features aligned to the reference: peach lavender clouded sky to y~0.31H, sun at x~0.76W y~0.323H, blue-grey mountain ridges at y~0.33H, autumn forest along the far lake shore y~0.38H, golden sun reflection at x~0.76W on the lake below it, one small flying crane at x~0.74W y~0.24H. The lower half of the full canvas continues ONLY the same lake water and reflected sunset naturally, all the way to the bottom. Do not add architecture, shore foreground, foliage, plants, foreground objects or floor. Keep landscape at the same screen height as the reference, do not expand mountains to fill the canvas. Opaque image.
```

### Room

```text
Use case: precise-object-edit. Project asset for Memery scene 5 秋湖夕照. Input image is the selected full-scene effect image; it is the visual and composition authority. Preserve its warm peach-gold sunset palette, realistic refined 3D materials, straight verticals, frontal centered camera, and exact vertical framing. Final design canvas target 1179 by 2556 pixels, portrait aspect 0.4613, no stretching, no reframing, no text or watermark. All scene layers must share this full-canvas coordinate system.
Use case: background-extraction.
Asset type: full-canvas transparent RGBA room architecture, wall and floor plate. This is an exact registered layer extracted from the supplied effect image, NOT a new interior design.
Keep ONLY the complete pavilion architecture (ceiling wooden slats, upper peach marble lintel, left and right ivory marble columns, side bronze/brown thin window slats, low peach marble rear wall below the opening) AND the full warm marble floor with its coherent diagonal sunset light and window shadows. Keep the red maple branch in the upper left and the very edge-side olive foliage as fixed wall elements exactly where they are. The main marble wall meets floor at y~0.718H in this user-selected image; preserve that specific composition. Reconstruct the low solid marble wall behind the removed altar at y~0.57H to 0.718H, and floor beneath the removed mat, cushion and blurred flowers.
Remove the outdoor landscape ENTIRELY to genuine transparent alpha in every opening, including between thin side window slats; keep fine red maple leaves, branches and lattice cleanly cut out over transparent space. Remove ALL movable objects entirely: altar table, table runners, circular blank portrait frame and supports, vases/flowers on altar, candles, fruits, incense burner, tea cups, floor mat, cushion, blurred bottom foreground flowers. Replace their hidden areas with correct marble wall/floor as appropriate. No residual table legs, flowers or portrait. No opaque background behind the window. No checkerboard graphic, no sky, mountains or water in this layer. All architecture including top and bottom floor remains in exactly original position on full portrait canvas. Preserve fixed wall/floor shadows. Output actual transparent alpha, not simulated transparency.
```

### Table

```text
Use case: precise-object-edit. Project asset for Memery scene 5 秋湖夕照. Input image is the selected full-scene effect image; it is the visual and composition authority. Preserve its warm peach-gold sunset palette, realistic refined 3D materials, straight verticals, frontal centered camera, and exact vertical framing. Final design canvas target 1179 by 2556 pixels, portrait aspect 0.4613, no stretching, no reframing, no text or watermark. All scene layers must share this full-canvas coordinate system.
Asset type: isolated altar table sprite on actual transparent alpha.
Primary request: Extract the complete altar table ONLY from the reference image, reconstructing the empty tabletop under the removed offerings. Full table centered on a wide landscape canvas, tightly framed with a small transparent margin, no object clipped. Keep its simple straight rectangular honey-golden oak frame, warm ivory marble tabletop, two sturdy thick square front legs, thin horizontal apron, bronze vertical grille inserts near the lower inner leg faces and two narrow ivory damask cloth runners hanging over the left and right ends, as in the reference. Both runners are part of the table and must be retained. No rear marble wall, no floor, no floor shadow, no landscape or architecture.
Camera straight-on centered with slight downward angle about 15 degrees, all legs vertical, horizontal front edge. The flat usable tabletop must be visibly deep: back edge about 86% of front edge width; tabletop depth visible in image about 9.5% of front edge width. Keep table legs and proportions readable. Natural warm neutral materials, subtle coherent warm directional highlights, no dramatic baked glow.
Remove ALL objects from tabletop: circular portrait frame and stand, flowers/vases, candles and flames, fruit plates, incense burner and sticks, cups, tea pot, bowls. Empty uninterrupted flat tabletop with fine ivory marble and the two side runner strips only. No additional center tablecloth. No text, no shadow outside table. Output a landscape transparent PNG containing one complete table.
```

### Mat

```text
Use case: precise-object-edit. Project asset for Memery scene 5 秋湖夕照. Input image is the selected full-scene effect image; it is the visual and composition authority. Preserve its warm peach-gold sunset palette, realistic refined 3D materials, straight verticals, frontal centered camera, and exact vertical framing. Final design canvas target 1179 by 2556 pixels, portrait aspect 0.4613, no stretching, no reframing, no text or watermark. All scene layers must share this full-canvas coordinate system.
Use case: background-extraction.
Asset type: isolated rectangular woven floor mat sprite, true transparent background.
Extract only the golden honey-caramel woven rectangular rush mat from lower part of reference. Remove cushion and reconstruct complete uninterrupted weave beneath it. Center the entire mat with transparent margins on a wide horizontal canvas. Match the reference's irregular natural handmade weave, delicate straw crosshatch, rolled thin braided edges, warm ochre/beige color. Straight frontal view, low downward camera 15 degrees. A flat horizontal trapezoidal rectangle: rear edge 0.72 of front edge width, visible depth 0.19 of front edge width. Do not turn into a top-down square. No floor, no cushion, no table, no plants, no cast shadow, no backdrop, no text. Actual transparent alpha outside mat.
```

### Cushion

```text
Use case: precise-object-edit. Project asset for Memery scene 5 秋湖夕照. Input image is the selected full-scene effect image; it is the visual and composition authority. Preserve its warm peach-gold sunset palette, realistic refined 3D materials, straight verticals, frontal centered camera, and exact vertical framing. Final design canvas target 1179 by 2556 pixels, portrait aspect 0.4613, no stretching, no reframing, no text or watermark. All scene layers must share this full-canvas coordinate system.
Use case: background-extraction.
Asset type: isolated ivory silk brocade round meditation cushion on actual transparent alpha.
Extract only the complete soft cream-ivory round cushion from reference. Its top fabric has a refined faint irregular geometric damask/brocade pattern, lightly gathered seams, softly padded sidewall, piping around top edge, warm beige lower edge. Keep this fabric cushion, not a brown rattan cushion. Center one complete cushion on a wide horizontal transparent canvas with small margins. Camera frontal centered looking down about 15 degrees: circular top projects to a shallow ellipse, top boundary short/long axis ratio about 0.26, with visible gently domed cushion sidewall beneath. Realistic textile folds. No mat, floor, shadow, architecture, flowers, objects, glow, text. No checkerboard pixels. True transparent background.
```

### Left

```text
Use case: precise-object-edit. Project asset for Memery scene 5 秋湖夕照. Input image is the selected full-scene effect image; it is the visual and composition authority. Preserve its warm peach-gold sunset palette, realistic refined 3D materials, straight verticals, frontal centered camera, and exact vertical framing. Final design canvas target 1179 by 2556 pixels, portrait aspect 0.4613, no stretching, no reframing, no text or watermark. All scene layers must share this full-canvas coordinate system.
Use case: background-extraction.
Asset type: LEFT foreground floral layer, full-canvas transparent PNG registered to the reference.
Keep ONLY the softly out-of-focus white blossom branches at the extreme bottom LEFT of reference. Their buds are creamy white with small warm brown branches and muted leaves. Match the source airy photographic defocus and warm late-afternoon color. Reconstruct naturally where needed but maintain their original screen positions: a branch enters from left around y=0.84H and grows diagonally inward toward x~0.25W at the bottom, plus small floral tips close to bottom-center-left. Visible plant confined to x=0..0.40W and y=0.83..1H. Keep entire remaining full canvas completely transparent: no table, floor, mat, cushion, architecture, sunset, upper maple tree, right flowers, glow, bokeh disks, shadows or particles. Canvas must retain same portrait proportions and full height as input, do not crop tightly to branch. This layer will be placed at full-canvas native registered size. Real alpha with natural feathered soft edges. Do not draw a visible checkerboard.
```

### Right

```text
Use case: precise-object-edit. Project asset for Memery scene 5 秋湖夕照. Input image is the selected full-scene effect image; it is the visual and composition authority. Preserve its warm peach-gold sunset palette, realistic refined 3D materials, straight verticals, frontal centered camera, and exact vertical framing. Final design canvas target 1179 by 2556 pixels, portrait aspect 0.4613, no stretching, no reframing, no text or watermark. All scene layers must share this full-canvas coordinate system.
Use case: background-extraction.
Asset type: RIGHT foreground floral layer, full-canvas transparent PNG registered to the reference.
Keep ONLY the softly out-of-focus white blossom branches at extreme bottom RIGHT of reference. Creamy white clustered blossom buds, a few small muted leaves, warm brown branching stems, realistic photographic foreground defocus. Preserve their screen positions: small blossoms enter right edge at y~0.92H and spread left toward x~0.74W near bottom edge. Visible plant confined to x=0.66..1W and y=0.90..1H. Entire remainder of full canvas must be completely transparent. No left flowers, no floor, mat, cushion, table, objects, architecture, sky, maple tree, artificial glow, light dots, cast shadows or text. Same full portrait canvas proportions and origin as source; don't crop tightly. True alpha and natural soft feathered edges, not checkerboard art.
```
