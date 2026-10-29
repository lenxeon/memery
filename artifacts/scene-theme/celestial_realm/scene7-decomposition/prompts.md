# 琼楼玉阙 · 场景7拆解提示词

## 规范要求

用户在地面比例审计后再次选定concept-v3对应的原始图，并要求按主题2拆解及接入。以该图作为装配基准，保留缩小玉屏和原地面占比；不以通用目标替换已选定的构图。采用主题2历史“独立室外背景＋墙框地坪一体层”的关系，使用新主题支持的wall.wallpaper与wall.roomOverlay。供桌、席毯、蒲团、左右前景独立，照片与姓名仍为动态内容；不使用主题2目前的单背景兼容字段。

全画布交付1179×2556；生成器实际输出按等比cover和同一中心原点导出，不非等比拉伸。独立器物只裁透明余量，前景原生全幅构图，不附加BlurFilter。恰好6套不同花材左右候选，默认白玉兰；每侧仅绘制所选一张。透明素材使用真实alpha。所有图片由内置image_gen生成；最后一次同名slot为采用版，替代前次工作稿。最终源图路径和SHA见production-inputs.json与asset-measurements.json。

## 内容描述

白玉描金天宫、云桥、宫阙与瀑布云海。室内层保留完整梁柱、台阶、缩小玉屏和石坪光影；空桌保留云纹牙板和玉质桌脚。青玉云纹席、米白描金锦垫，配六套近摄柔焦花材：玉兰凝露、莲影浮云、兰风清和、桃云含春、桂月流金、雪茶映玉。照片圆孔按室内源图实测位置装配，避免重复绘制大金环。

### 1. wallpaper（采用）

```text
Use case: precise-object-edit / background-extraction. The supplied approved celestial-palace memorial scene is the exact composition reference. Produce ONLY its distant environmental wallpaper, opaque full portrait canvas, same aspect 1179x2556, same camera and registration. Preserve the positions and sizes of the distant Chinese white jade and gold-roof palaces, arch bridges, waterfalls, mountains, luminous clouds and pale blue sky. Reconstruct naturally the portions hidden by near objects. Remove ALL near architecture: overhead carved beam, side pillars, column bases, entire ground and stairs. Remove the small central jade portrait screen completely. Remove altar table and legs, all vases/flowers, candles, incense and burner, fruit, plates, cups, mat, cushion, foreground flowers. Entire image including lower portion is uninterrupted distant heavenly cloudscape with natural architectural depth, NOT empty solid white. No foreground elements, no floor, no frame, no words or UI. Full opaque RGB PNG. Preserve composition, realistic material style, sky palette and upper-right morning light. This is the outside backdrop only, not a complete assembled memorial scene.
```

### 2. roomOverlay（采用）

```text
Use case: background-extraction. Extract ONLY the fixed interior architecture and floor of the supplied approved celestial-palace memorial image into a TRUE transparent RGBA full portrait canvas. Canvas same aspect 1179x2556, absolutely preserve original camera, scale and all coordinates. KEEP the ENTIRE complete ivory jade and champagne-gold top carved beam and brackets, left and right tall jade columns with full base plinths, the small central jade memorial screen with its empty circular ivory opening (keep its approved SMALL size), its stepped jade base, and the ENTIRE polished pale jade floor with the coherent upper-right daylight and existing architectural shadows/reflections. The floor must be reconstructed seamlessly where furniture was, retaining fine stone texture, horizontal seams and single-point perspective. KEEP ORIGINAL ground boundary near y=0.712H; do not move or enforce an earlier template line. All distant sky, cloud sea, heavenly palaces, bridges, mountains and waterfalls must be TRUE alpha-transparent inside the open hall bays. The small central jade screen stays opaque ivory, including blank circular opening; user photograph will be placed over it at runtime. REMOVE the entire altar table and all legs, ALL offerings including vases and flowers/candles/incense/fruit/cups, the rug, cushion, and every soft near-camera flower or leaf. Reconstruct clean floor under removed rug/cushion. No person, no words, no UI, no checkerboard or black/white backdrop. Preserve full canvas, exact approved architectural geometry and lighting, no zoom/crop/recomposition. This is one transparent fixed architecture + ground layer, with the cloud view cut out.
```

### 3. table（采用）

```text
Use case: background-extraction. Isolate ONLY the entire ivory jade and champagne-gold altar TABLE from the supplied approved celestial palace image. TRUE transparent RGBA PNG, landscape canvas tightly framed with a 24px transparent margin, full object and all four feet visible. Preserve the exact approved table design: rectangular polished ivory pale-jade slab with lightly gilded corners, finely carved cloud-pattern front apron in ivory and pale gold, ornate gently curving jade legs with sculpted scroll capitals and gold-bordered square feet. Centered front view with the same shallow downward camera of the reference. Keep the original tabletop depth and shape: rear edge about 85.6% of front width, visible top depth about 9% of front width, level horizontal surface; do not flatten it into a narrow unusable line. REMOVE every object on the table: ALL flower vases and flowers, candles and holders, incense burner and sticks, fruit, plates, cups, screen and backdrop. Reconstruct the complete clean polished stone top and full rear edge hidden by offerings. No floor, no architecture or cloud scenery, no mat/cushion, no plants, no cast shadow or reflection on an imaginary floor. Neutral soft material illumination with the original warm jade/gold color, no dramatic baked lighting. Entire table fits within image, no cropping of feet. Actual alpha transparency, no white or checkerboard backdrop, no words or UI.
```

### 4. groundMat（已由后续修订替代）

```text
Use case: background-extraction. Produce ONLY the pale celadon jade-green rectangular embroidered floor prayer mat visible below the altar in the supplied approved scene. Isolate it on TRUE transparent RGBA, landscape image with a small 24px transparent safety margin. Preserve its muted grey-green woven fabric, fine creamy gold border and refined ivory cloud / geometric embroidery, delicate woven texture and soft binding. REMOVE the round cushion completely and reconstruct the cloth and embroidery hidden by it. No floor, no reflections or cast shadow, no flowers, no legs, no clouds or architecture, no other objects, no text. Camera shallow 15-degree downward view of a perfectly horizontal rectangular mat, front centered, not tilted upright. Shape is a wide shallow symmetrical trapezoid: rear edge 72% of front edge, projected rear-to-front surface depth about19% of front width (17-21% acceptable), no need to deepen it to fill the canvas. Whole mat including all corners visible, horizontal far/near edges, sides converge to a point above the object. Use the same restrained celadon, ivory and champagne-gold palette as the reference. Real alpha transparency with clean anti-aliased edges, no checkerboard.
```

### 5. cushion（采用）

```text
Use case: background-extraction. Isolate ONLY the low round ivory and champagne-gold brocade meditation cushion from the bottom of the supplied celestial palace scene. Produce a standalone TRUE transparent RGBA PNG, landscape tight frame with small24px safety margin, complete cushion visible. Preserve its creamy white silky brocade top with fine tonal gold cloud/floral woven pattern, slim gold piping, substantial softly padded sidewall and realistic cloth texture. No floor, no rug, no flowers, no architecture, no other objects, no cast shadow or reflected light puddle, no background, no text. Front-centered shallow downward15-degree camera of a cushion resting perfectly horizontal, not tilted upright. The top ellipse's minor/major ratio is about0.26 (allowed0.23..0.29), sidewall below it is a distinct padded band; do not confuse top ellipse with the total object height. Soft neutral material illumination and gentle original warm color. Actual alpha transparency, not white/black/checkerboard.
```

### 6. ivory_magnolia_left（已由后续修订替代）

```text
Use case: background-extraction. The supplied full celestial palace scene is the style and exact layout reference. Produce ONLY the small near-camera WHITE MAGNOLIA flower cluster at the bottom LEFT corner, as a TRUE transparent RGBA FULL PORTRAIT canvas 1179x2556, same camera coordinates and ~0.4613 aspect. This is an ALMOST EMPTY transparent tall image, not a full scene or close-up filled image. Keep ALL rows above y=0.80H entirely transparent, and confine EVERY plant pixel to x=0.00W..0.29W, y=0.80H..1.00H. Small natural white magnolia and creamy lily-like blooms with soft sage/celadon green leaves, branch stems entering from bottom/outer edge, main flower heads fully inside canvas. Strong but tasteful 50mm f/1.4 close-focus defocus throughout petals and leaves, more softness at bottom, still readable flower silhouette; match original corner foreground. Neutral warm ivory light, no rim glow. Center and opposite side fully transparent. No vase or pot, no rock, no floor, no cloud, no architecture, no table, no shade or shadow, no bokeh circles/particles, no labels or text, no checkerboard backdrop. IMPORTANT: cluster occupies ONLY lower20% of canvas HEIGHT and outer29% WIDTH. Do not zoom, crop, center, or enlarge to fill frame. Full tall transparent canvas retained.
```

### 7. ivory_magnolia_right（已由后续修订替代）

```text
Use case: background-extraction. The supplied full celestial palace scene is the style and exact layout reference. Produce ONLY the small near-camera WHITE MAGNOLIA flower cluster at the bottom RIGHT corner, as a TRUE transparent RGBA FULL PORTRAIT canvas 1179x2556, same camera coordinates and ~0.4613 aspect. This is an ALMOST EMPTY transparent tall image, not a full scene or close-up filled image. Keep ALL rows above y=0.80H entirely transparent, and confine EVERY plant pixel to x=0.71W..1.00W, y=0.80H..1.00H. Small natural white magnolia and creamy lily-like blooms with soft sage/celadon green leaves, branch stems entering from bottom/outer edge, main flower heads fully inside canvas. Strong but tasteful 50mm f/1.4 close-focus defocus throughout petals and leaves, more softness at bottom, still readable flower silhouette; match original corner foreground. Neutral warm ivory light, no rim glow. Center and opposite side fully transparent. No vase or pot, no rock, no floor, no cloud, no architecture, no table, no shade or shadow, no bokeh circles/particles, no labels or text, no checkerboard backdrop. IMPORTANT: cluster occupies ONLY lower20% of canvas HEIGHT and outer29% WIDTH. Do not zoom, crop, center, or enlarge to fill frame. Full tall transparent canvas retained.
```

### 8. pale_lotus_left（已由后续修订替代）

```text
Use case: background-extraction. Create a production-ready near-lens botanical foreground companion for the supplied approved white jade celestial palace scene. This variant is Pale lotus: 浅粉白莲与小型荷叶, palette 粉白、淡青. Only these flowers/leaves, no pot or vase. TRUE transparent RGBA, FULL tall portrait canvas 852x1846 (final design1179x2556), same full-scene coordinates. All plants restricted to the BOTTOM LEFT corner: x=0..290, y=1450..1845. The complete upper1450 rows and central area x=300..550 remain alpha0. This is an almost empty tall image with a SMALL natural spray at the very bottom corner, only20% image height, no enlargement to fill canvas. Flower heads have complete readable silhouettes with safety space toward the inner edge; stems can enter from bottom/outer border. Natural curved arrangement toward center, left composition, not a mirror-copy of another flower type. Match original foreground's uniform 50mmf/1.4 close-focus blur, petals/leaves markedly defocused, nearer bottom softer, but identifiable botanical outline. Soft neutral warm daylight, no glow or shadow, no artificial light spot, no bokeh circle. No floor, no scenery, no architecture/table/cushion, no words or UI, no checkerboard or opaque background. Preserve FULL portrait canvas with real transparent alpha; don't crop, center, zoom or enlarge the cluster.
```

### 9. pale_lotus_right（已由后续修订替代）

```text
Use case: background-extraction. Create a production-ready near-lens botanical foreground companion for the supplied approved white jade celestial palace scene. This variant is Pale lotus: 浅粉白莲与小型荷叶, palette 粉白、淡青. Only these flowers/leaves, no pot or vase. TRUE transparent RGBA, FULL tall portrait canvas 852x1846 (final design1179x2556), same full-scene coordinates. All plants restricted to the BOTTOM RIGHT corner: x=562..851, y=1450..1845. The complete upper1450 rows and central area x=300..550 remain alpha0. This is an almost empty tall image with a SMALL natural spray at the very bottom corner, only20% image height, no enlargement to fill canvas. Flower heads have complete readable silhouettes with safety space toward the inner edge; stems can enter from bottom/outer border. Natural curved arrangement toward center, right composition, not a mirror-copy of another flower type. Match original foreground's uniform 50mmf/1.4 close-focus blur, petals/leaves markedly defocused, nearer bottom softer, but identifiable botanical outline. Soft neutral warm daylight, no glow or shadow, no artificial light spot, no bokeh circle. No floor, no scenery, no architecture/table/cushion, no words or UI, no checkerboard or opaque background. Preserve FULL portrait canvas with real transparent alpha; don't crop, center, zoom or enlarge the cluster.
```

### 10. jade_orchid_left（已由后续修订替代）

```text
Use case: background-extraction. Create a production-ready near-lens botanical foreground companion for the supplied approved white jade celestial palace scene. This variant is Jade orchid: 奶白蕙兰花序与细长兰叶, palette 奶白、浅青绿. Only these flowers/leaves, no pot or vase. TRUE transparent RGBA, FULL tall portrait canvas 852x1846 (final design1179x2556), same full-scene coordinates. All plants restricted to the BOTTOM LEFT corner: x=0..290, y=1450..1845. The complete upper1450 rows and central area x=300..550 remain alpha0. This is an almost empty tall image with a SMALL natural spray at the very bottom corner, only20% image height, no enlargement to fill canvas. Flower heads have complete readable silhouettes with safety space toward the inner edge; stems can enter from bottom/outer border. Natural curved arrangement toward center, left composition, not a mirror-copy of another flower type. Match original foreground's uniform 50mmf/1.4 close-focus blur, petals/leaves markedly defocused, nearer bottom softer, but identifiable botanical outline. Soft neutral warm daylight, no glow or shadow, no artificial light spot, no bokeh circle. No floor, no scenery, no architecture/table/cushion, no words or UI, no checkerboard or opaque background. Preserve FULL portrait canvas with real transparent alpha; don't crop, center, zoom or enlarge the cluster.
```

### 11. jade_orchid_right（已由后续修订替代）

```text
Use case: background-extraction. Create a production-ready near-lens botanical foreground companion for the supplied approved white jade celestial palace scene. This variant is Jade orchid: 奶白蕙兰花序与细长兰叶, palette 奶白、浅青绿. Only these flowers/leaves, no pot or vase. TRUE transparent RGBA, FULL tall portrait canvas 852x1846 (final design1179x2556), same full-scene coordinates. All plants restricted to the BOTTOM RIGHT corner: x=562..851, y=1450..1845. The complete upper1450 rows and central area x=300..550 remain alpha0. This is an almost empty tall image with a SMALL natural spray at the very bottom corner, only20% image height, no enlargement to fill canvas. Flower heads have complete readable silhouettes with safety space toward the inner edge; stems can enter from bottom/outer border. Natural curved arrangement toward center, right composition, not a mirror-copy of another flower type. Match original foreground's uniform 50mmf/1.4 close-focus blur, petals/leaves markedly defocused, nearer bottom softer, but identifiable botanical outline. Soft neutral warm daylight, no glow or shadow, no artificial light spot, no bokeh circle. No floor, no scenery, no architecture/table/cushion, no words or UI, no checkerboard or opaque background. Preserve FULL portrait canvas with real transparent alpha; don't crop, center, zoom or enlarge the cluster.
```

### 12. peach_blossom_left（采用）

```text
Use case: precise-object-edit. Image1 is the EDIT TARGET: an almost-empty tall transparent canvas containing a SMALL plant ONLY at the bottom left corner. Image2 is ONLY the celestial-palace style reference. Change ONLY the botanical species of the small corner plant in IMAGE1 to Peach blossom, specifically 淡粉桃花与细灰褐花枝, palette 浅粉、灰褐、嫩绿. Do NOT recreate Image2 or add any scene object. Preserve Image1's full transparent portrait canvas, its EXACT SMALL botanical footprint and position: visible plant only in lowest20% height and outer35% width of the left corner. All the rest, especially upper80% and central30% of canvas, must remain completely alpha-transparent. Do not enlarge or zoom the plant when changing species. Change botanical morphology naturally so this is a genuinely distinct flower type, not recoloring the old flowers. Keep image1's same obvious soft 50mmf/1.4 close-focus defocus, readable plant silhouette, slightly softer at bottom, neutral warm ivory daylight. No vase, no pot, no ground, no shadow, no glows, no bokeh circles, no background, no words, no UI. Keep full1179x2556 tall portrait canvas, no cropping, no repositioning. The upper80% of resulting image must be EMPTY, not filled with new plant details.
```

### 13. peach_blossom_right（采用）

```text
Use case: precise-object-edit. Image1 is the EDIT TARGET: an almost-empty tall transparent canvas containing a SMALL plant ONLY at the bottom right corner. Image2 is ONLY the celestial-palace style reference. Change ONLY the botanical species of the small corner plant in IMAGE1 to Peach blossom, specifically 淡粉桃花与细灰褐花枝, palette 浅粉、灰褐、嫩绿. Do NOT recreate Image2 or add any scene object. Preserve Image1's full transparent portrait canvas, its EXACT SMALL botanical footprint and position: visible plant only in lowest20% height and outer35% width of the right corner. All the rest, especially upper80% and central30% of canvas, must remain completely alpha-transparent. Do not enlarge or zoom the plant when changing species. Change botanical morphology naturally so this is a genuinely distinct flower type, not recoloring the old flowers. Keep image1's same obvious soft 50mmf/1.4 close-focus defocus, readable plant silhouette, slightly softer at bottom, neutral warm ivory daylight. No vase, no pot, no ground, no shadow, no glows, no bokeh circles, no background, no words, no UI. Keep full1179x2556 tall portrait canvas, no cropping, no repositioning. The upper80% of resulting image must be EMPTY, not filled with new plant details.
```

### 14. golden_osmanthus_left（采用）

```text
Use case: precise-object-edit. Image1 is the EDIT TARGET: an almost-empty tall transparent canvas containing a SMALL plant ONLY at the bottom left corner. Image2 is ONLY the celestial-palace style reference. Change ONLY the botanical species of the small corner plant in IMAGE1 to Golden osmanthus, specifically 淡金桂花小簇与柔和橄榄绿叶, palette 淡金、橄榄绿. Do NOT recreate Image2 or add any scene object. Preserve Image1's full transparent portrait canvas, its EXACT SMALL botanical footprint and position: visible plant only in lowest20% height and outer35% width of the left corner. All the rest, especially upper80% and central30% of canvas, must remain completely alpha-transparent. Do not enlarge or zoom the plant when changing species. Change botanical morphology naturally so this is a genuinely distinct flower type, not recoloring the old flowers. Keep image1's same obvious soft 50mmf/1.4 close-focus defocus, readable plant silhouette, slightly softer at bottom, neutral warm ivory daylight. No vase, no pot, no ground, no shadow, no glows, no bokeh circles, no background, no words, no UI. Keep full1179x2556 tall portrait canvas, no cropping, no repositioning. The upper80% of resulting image must be EMPTY, not filled with new plant details.
```

### 15. golden_osmanthus_right（采用）

```text
Use case: precise-object-edit. Image1 is the EDIT TARGET: an almost-empty tall transparent canvas containing a SMALL plant ONLY at the bottom right corner. Image2 is ONLY the celestial-palace style reference. Change ONLY the botanical species of the small corner plant in IMAGE1 to Golden osmanthus, specifically 淡金桂花小簇与柔和橄榄绿叶, palette 淡金、橄榄绿. Do NOT recreate Image2 or add any scene object. Preserve Image1's full transparent portrait canvas, its EXACT SMALL botanical footprint and position: visible plant only in lowest20% height and outer35% width of the right corner. All the rest, especially upper80% and central30% of canvas, must remain completely alpha-transparent. Do not enlarge or zoom the plant when changing species. Change botanical morphology naturally so this is a genuinely distinct flower type, not recoloring the old flowers. Keep image1's same obvious soft 50mmf/1.4 close-focus defocus, readable plant silhouette, slightly softer at bottom, neutral warm ivory daylight. No vase, no pot, no ground, no shadow, no glows, no bokeh circles, no background, no words, no UI. Keep full1179x2556 tall portrait canvas, no cropping, no repositioning. The upper80% of resulting image must be EMPTY, not filled with new plant details.
```

### 16. ivory_magnolia_left（采用）

```text
Use case: precise-object-edit. Image1 is the EDIT TARGET: an almost-empty tall transparent canvas containing a SMALL plant ONLY at the bottom left corner. Image2 is ONLY the celestial-palace style reference. Change ONLY the botanical species of the SMALL corner plant in IMAGE1 to Ivory magnolia, specifically 白玉兰与米白百合、灰绿叶, palette 米白、灰绿. Do NOT recreate Image2 or add a scene. Preserve Image1's FULL transparent portrait canvas, its EXACT SMALL botanical footprint and position: plants only in lowest20% image height and outer35% width at left. Upper80% and central30% remain completely alpha-transparent. Do NOT enlarge or zoom the plant to fill the canvas. Main flower heads fully inside canvas. Natural botanically distinct flowers/leaves, stems entering from bottom, no container. SAME obvious soft50mmf/1.4 close-focus defocus as image1, whole plant gently out of focus with a readable flower silhouette and softer bottom. Neutral warm daylight, no rim lighting, no shadow, no bokeh spots, no backdrop, no words or UI. Full1179x2556 portrait canvas, retain transparent empty area, no cropping or recomposition.
```

### 17. ivory_magnolia_right（采用）

```text
Use case: precise-object-edit. Image1 is the EDIT TARGET: an almost-empty tall transparent canvas containing a SMALL plant ONLY at the bottom right corner. Image2 is ONLY the celestial-palace style reference. Change ONLY the botanical species of the SMALL corner plant in IMAGE1 to Ivory magnolia, specifically 白玉兰与米白百合、灰绿叶, palette 米白、灰绿. Do NOT recreate Image2 or add a scene. Preserve Image1's FULL transparent portrait canvas, its EXACT SMALL botanical footprint and position: plants only in lowest20% image height and outer35% width at right. Upper80% and central30% remain completely alpha-transparent. Do NOT enlarge or zoom the plant to fill the canvas. Main flower heads fully inside canvas. Natural botanically distinct flowers/leaves, stems entering from bottom, no container. SAME obvious soft50mmf/1.4 close-focus defocus as image1, whole plant gently out of focus with a readable flower silhouette and softer bottom. Neutral warm daylight, no rim lighting, no shadow, no bokeh spots, no backdrop, no words or UI. Full1179x2556 portrait canvas, retain transparent empty area, no cropping or recomposition.
```

### 18. snow_camellia_left（采用）

```text
Use case: precise-object-edit. Image1 is the EDIT TARGET: an almost-empty tall transparent canvas containing a SMALL plant ONLY at the bottom left corner. Image2 is ONLY the celestial-palace style reference. Change ONLY the botanical species of the SMALL corner plant in IMAGE1 to Snow camellia, specifically 米白重瓣山茶与圆润深绿叶, palette 米白、墨绿. Do NOT recreate Image2 or add a scene. Preserve Image1's FULL transparent portrait canvas, its EXACT SMALL botanical footprint and position: plants only in lowest20% image height and outer35% width at left. Upper80% and central30% remain completely alpha-transparent. Do NOT enlarge or zoom the plant to fill the canvas. Main flower heads fully inside canvas. Natural botanically distinct flowers/leaves, stems entering from bottom, no container. SAME obvious soft50mmf/1.4 close-focus defocus as image1, whole plant gently out of focus with a readable flower silhouette and softer bottom. Neutral warm daylight, no rim lighting, no shadow, no bokeh spots, no backdrop, no words or UI. Full1179x2556 portrait canvas, retain transparent empty area, no cropping or recomposition.
```

### 19. snow_camellia_right（采用）

```text
Use case: precise-object-edit. Image1 is the EDIT TARGET: an almost-empty tall transparent canvas containing a SMALL plant ONLY at the bottom right corner. Image2 is ONLY the celestial-palace style reference. Change ONLY the botanical species of the SMALL corner plant in IMAGE1 to Snow camellia, specifically 米白重瓣山茶与圆润深绿叶, palette 米白、墨绿. Do NOT recreate Image2 or add a scene. Preserve Image1's FULL transparent portrait canvas, its EXACT SMALL botanical footprint and position: plants only in lowest20% image height and outer35% width at right. Upper80% and central30% remain completely alpha-transparent. Do NOT enlarge or zoom the plant to fill the canvas. Main flower heads fully inside canvas. Natural botanically distinct flowers/leaves, stems entering from bottom, no container. SAME obvious soft50mmf/1.4 close-focus defocus as image1, whole plant gently out of focus with a readable flower silhouette and softer bottom. Neutral warm daylight, no rim lighting, no shadow, no bokeh spots, no backdrop, no words or UI. Full1179x2556 portrait canvas, retain transparent empty area, no cropping or recomposition.
```

### 20. pale_lotus_left（采用）

```text
Use case: precise-object-edit. IMAGE1 is the edit target: full tall transparent canvas with a SMALL plant at bottom left. IMAGE2 is only the celestial-palace color/material reference. Replace ONLY image1's small plant with Pale lotus: 浅粉白莲与小型荷叶, palette 粉白、淡青. Preserve EXACT image1 footprint and full empty transparent portrait canvas: bottom20% HEIGHT, outer35% WIDTH at left; upper80% and central30% completely transparent. Use compact flower clusters and short gently curving leaves INSIDE the existing footprint, no long leaf crossing center. Do NOT recreate image2 and do NOT enlarge plant when changing species. Entire flower heads readable and safe inside inner edge, stems enter bottom/outerborder. Strong realistic50mmf/1.4 near-lens defocus matching image1, finer shapes softly blurred and bottom more defocused; elegant natural botanical arrangement distinct from the old species. No pot, no floor, no other objects, no background/shadow/glow/bokeh circle/text/UI. Actual alpha0 in all empty areas, retain full1179x2556 portrait frame, no zoom/crop/reposition.
```

### 21. pale_lotus_right（采用）

```text
Use case: precise-object-edit. IMAGE1 is the edit target: full tall transparent canvas with a SMALL plant at bottom right. IMAGE2 is only the celestial-palace color/material reference. Replace ONLY image1's small plant with Pale lotus: 浅粉白莲与小型荷叶, palette 粉白、淡青. Preserve EXACT image1 footprint and full empty transparent portrait canvas: bottom20% HEIGHT, outer35% WIDTH at right; upper80% and central30% completely transparent. Use compact flower clusters and short gently curving leaves INSIDE the existing footprint, no long leaf crossing center. Do NOT recreate image2 and do NOT enlarge plant when changing species. Entire flower heads readable and safe inside inner edge, stems enter bottom/outerborder. Strong realistic50mmf/1.4 near-lens defocus matching image1, finer shapes softly blurred and bottom more defocused; elegant natural botanical arrangement distinct from the old species. No pot, no floor, no other objects, no background/shadow/glow/bokeh circle/text/UI. Actual alpha0 in all empty areas, retain full1179x2556 portrait frame, no zoom/crop/reposition.
```

### 22. jade_orchid_left（已由后续修订替代）

```text
Use case: precise-object-edit. IMAGE1 is the edit target: full tall transparent canvas with a SMALL plant at bottom left. IMAGE2 is only the celestial-palace color/material reference. Replace ONLY image1's small plant with Jade orchid: 奶白蕙兰花序与细长兰叶, palette 奶白、浅青绿. Preserve EXACT image1 footprint and full empty transparent portrait canvas: bottom20% HEIGHT, outer35% WIDTH at left; upper80% and central30% completely transparent. Use compact flower clusters and short gently curving leaves INSIDE the existing footprint, no long leaf crossing center. Do NOT recreate image2 and do NOT enlarge plant when changing species. Entire flower heads readable and safe inside inner edge, stems enter bottom/outerborder. Strong realistic50mmf/1.4 near-lens defocus matching image1, finer shapes softly blurred and bottom more defocused; elegant natural botanical arrangement distinct from the old species. No pot, no floor, no other objects, no background/shadow/glow/bokeh circle/text/UI. Actual alpha0 in all empty areas, retain full1179x2556 portrait frame, no zoom/crop/reposition.
```

### 23. jade_orchid_right（采用）

```text
Use case: precise-object-edit. IMAGE1 is the edit target: full tall transparent canvas with a SMALL plant at bottom right. IMAGE2 is only the celestial-palace color/material reference. Replace ONLY image1's small plant with Jade orchid: 奶白蕙兰花序与细长兰叶, palette 奶白、浅青绿. Preserve EXACT image1 footprint and full empty transparent portrait canvas: bottom20% HEIGHT, outer35% WIDTH at right; upper80% and central30% completely transparent. Use compact flower clusters and short gently curving leaves INSIDE the existing footprint, no long leaf crossing center. Do NOT recreate image2 and do NOT enlarge plant when changing species. Entire flower heads readable and safe inside inner edge, stems enter bottom/outerborder. Strong realistic50mmf/1.4 near-lens defocus matching image1, finer shapes softly blurred and bottom more defocused; elegant natural botanical arrangement distinct from the old species. No pot, no floor, no other objects, no background/shadow/glow/bokeh circle/text/UI. Actual alpha0 in all empty areas, retain full1179x2556 portrait frame, no zoom/crop/reposition.
```

### 24. groundMat（已由后续修订替代）

```text
Edit target is the isolated jade-green cloud-embroidered prayer mat. Keep the exact same fabric color, ornate ivory-gold cloud embroidery and border, material detail, horizontal placement and front-centered symmetry. Correct ONLY the excessive projected depth: the current mat is too deep, roughly26% of its front width. Lower the camera viewpoint so the top surface projected depth is about19% of front width (17-21% allowed), while rear edge remains72% of front width. Far and near edges horizontal, the mat perfectly flat, whole object inside landscape canvas with a small24px transparent margin. Preserve width, do not stretch/squash the embroidery or rotate the whole mat; create the correct shallower perspective naturally. No cushion, no floor, no shadow or reflection, no other object, no background, no text. TRUE transparent alpha.
```

### 25. jade_orchid_left（采用）

```text
Edit target: this transparent tall LEFT orchid foreground. Change ONLY its size within the canvas. The existing cluster is too large and intrudes into the center. Scale the WHOLE botanical cluster to70% of current width AND70% of current height, anchored exactly to BOTTOM LEFT, with the tall canvas unchanged. This is an obvious30% reduction of plant dimensions, not a crop or zoom. Final visible plant must be restricted to left36% of canvas width, bottom21% of canvas height. Upper79% and center/opposite side completely alpha0. Keep the same flowers, short leaves, neutral colors, marked soft-focus blur and arrangement. Do not add plants or fill emptied areas. Retain full1179x2556 portrait alpha canvas, no checkerboard, no text, no scene.
```

### 26. groundMat（采用）

```text
Edit target: this isolated transparent jade-green embroidered rectangular mat. Its projected surface is STILL too tall/deep. Make the visible MAT OBJECT25% SHORTER in its vertical projected dimension while keeping its exact same horizontal width. Keep the FRONT EDGE fixed horizontally near the lower part of the canvas; move the FAR/BACK EDGE DOWN by one quarter of the current front-back distance. Re-render the same cloth and cloud embroidery from a LOWER camera viewpoint so it naturally becomes shallower, without mechanically distorting or elongating the pattern. Far edge remains72% of front edge width, all edge lines straight and horizontal where appropriate. The result must look noticeably SHALLOWER: top surface projected depth near19% of front-edge width, not24-26%. Do not make it longer to fill the canvas. Preserve color, border, cream/gold cloud embroidery and detail. Entire mat visible, small transparent safety margin, landscape transparent canvas. No cushion, no floor, no shadow, no reflection, no text. Actual RGBA alpha transparent background.
```
