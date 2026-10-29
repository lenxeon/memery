# 云海朝晖 · 场景6素材提示词

## 规范要求

完整设计画布为 1179×2556 px，正面居中；以本次用户完整参考图作为构图依据。环境上下部共用同一等比 cover 和中心原点，石台后沿约在 0.732H。纯背景不透明；固定山松与地面、桌体、席毯、蒲团、左右前景使用真实 RGBA。人物、姓名、日期、纪念文字和操作界面不进入静态 PNG。背景自然光来自右上方日出，环境层已包含统一光照，默认关闭额外丁达尔光。前景虚焦烘焙入 PNG，中央保留透明。

工具为内置 image_gen，未使用 CLI/API 回退。生成器的实际输出尺寸见 asset-measurements.json；全画布仅作等比适配，独立器物仅裁透明导出余量，不重绘内容、不拉伸。最初左前景因覆盖过大弃用，最终采用 correction 版本。

## 内容描述

日出云海与层叠黄山式群峰，金桃色云霞和淡蓝晨空；左右古松与浅雕石台围合观景空间。浅石雕花桌面搭配暖棕木质 A 形桌脚，靛蓝山纹席毯、米白暗花蒲团与两角焦外白花，表达开阔、安宁和温暖的思念。个人遗像与供品由应用已有组件独立渲染。

### 1. wallpaper

```text
Use case: precise-object-edit / background-extraction. Input image is the user's approved complete composition, used as the exact camera/composition and visual source. Create ONLY the far environmental background plate of this Chinese mountaintop memorial scene, for a layered Pixi game. Portrait canvas 1179x2556 pixels, same ~0.4613 width/height aspect as input. Keep the input's exquisite realistic golden sunrise near (0.77W,0.27H), peach and lavender clouds above, blue sky, layers of Huangshan granite peaks and vast glowing sea of cloud below. Reconstruct naturally the background hidden by objects. REMOVE ALL near pine trees and branches along both sides, all near rocks, every flower and leaf, the entire stone terrace and paving, table and legs, candles, offerings, portrait frame, rug and cushion. The entire canvas, including bottom, must be opaque uninterrupted distant mountains and cloud sea with the same perspective as the original. Preserve the spectacular but peaceful morning color palette and fine natural detail. Absolutely no furniture, no near plants, no floor, no text or UI. This is an opaque full-canvas wallpaper, not a full assembled scene. Output PNG.
```

### 2. roomOverlay

```text
Use case: background-extraction. Extract the fixed near environment from the provided approved memorial scene into one registration-aligned TRUE transparent RGBA PNG. Full portrait canvas 1179x2556 px, preserve the exact complete input framing, camera, scale and positions, do not crop, zoom or recompose. KEEP ONLY: the ancient pine trunks and branches framing the left and right edges (starting around y=0.42H), their rooted rocks and low green shrubs on the lower sides, the low pale stone rear lip of the mountain terrace at y about 0.732H, and the ENTIRE pale irregular stone-paved terrace across the full lower 26.8% of the canvas to the bottom, with the input's engraved natural stone detail and consistent warm sunrise lighting. Ground is completely continuous and opaque from y=0.748H to the bottom across full width. Reconstruct clean stone paving where the table, mat and cushion covered it. Main sunrise comes from upper right. Make the entire sky, far mountains and cloud sea area TRUE alpha-transparent, including holes between pine needles, trunks and branches. REMOVE table and legs, every candle, flower vase, fruit, offerings, incense, portrait frame, rug, round cushion. REMOVE all white flower close-up foregrounds at the bottom corners (these will be separate assets). No architecture, no new railings, no new objects. The center from top down to terrace edge is transparent, the side pines stay in their exact original positions. This is a landscape-free, furniture-free transparent fixed environment layer, not a background image. No checkerboard pattern, no white/black background, no text, no UI. Preserve full canvas and alpha.
```

### 3. table

```text
Use case: background-extraction. Input image is the approved mountain sunrise altar scene. Produce ONLY its empty stone-and-wood altar table as a standalone TRUE transparent RGBA PNG, landscape canvas, tightly framed with a small transparent margin around the whole object. Exactly retain the pale grey-white richly carved stone slab top with a natural stone surface and carved floral front fascia, supported on two heavy warm brown timber A-shaped trestle legs, no crossbar through the center, the same elegant material, proportion and front-facing symmetry as the source. EMPTY tabletop: remove vases, all flowers, candles and holders, incense burner and sticks, fruit and plates, tea cups, sweets, circular portrait frame and its wooden pedestal. Reconstruct the clean complete table top and retain both fully visible trestle feet. No room, no ground, no scenery, no plants, no floor shadow, no opaque background, no text. Camera front centered, mild shallow downward view about 15 degrees; see a usable level stone carrying surface (not a vertical slab): back edge about 85.6% of front edge length and visible top depth about 9.5% of front edge length. Outer stone width dominates image; full table body about 0.40 times its width in height. Gentle neutral material illumination with subtle warm edge tone matching source, no dramatic flare or baked cast shadow. Produce a clean production-ready isolated sprite with actual transparent alpha, no checkerboard texture.
```

### 4. groundMat

```text
Use case: background-extraction. Extract and reconstruct ONLY the dark slate-blue woven prayer mat from the input approved mountain terrace memorial scene. Produce a standalone landscape TRUE transparent RGBA PNG sprite, the entire mat centered and tightly framed with a small transparent margin. Preserve its navy/slate blue-grey fine woven fibers, subtle cream embroidered flowing mountain ridge outlines near the two sides and foreground, neat stitched indigo binding, restrained elegant traditional style. REMOVE the round cushion completely and reconstruct the patterned weave it occluded. No stone paving, no flowers, no table legs, no landscape, no cast shadow, no other object, no text. Camera is directly centered, shallow downward 15-degree view of a perfectly horizontal rectangular mat; visible outline is a wide symmetrical trapezoid, rear edge 0.72 times front edge, projected back-to-front depth 0.19 times front width. Horizontal edges perfectly horizontal, lateral edges converge toward a common central vanishing point above the mat. Entire mat including all corners and fine edge must be inside canvas, realistic detailed fabric, neutral soft material light. Actual alpha transparency, no checkerboard or colored backdrop.
```

### 5. cushion

```text
Use case: background-extraction. Produce ONLY the single round ivory sage-grey brocade meditation cushion from the bottom center of the supplied mountain terrace memorial reference. Isolate it as a standalone TRUE transparent RGBA PNG with tight framing and a small transparent safety margin. Preserve its substantial softly padded low cylinder shape, cool warm-neutral ivory with a slight sage-grey cast, exquisite subtle traditional woven cloud and geometric brocade on top and the sidewall, fine pale piping around the top and bottom rim. Front-centered perfectly horizontal cushion resting level, observed at shallow downward angle about 15 degrees, top circular face appears as a broad flat ellipse with minor/major ratio 0.26 (acceptable 0.23-0.29), sidewall visibly padded but not tall. Do not tilt the cushion toward the camera. All of the cushion within canvas. No rug, no floor, no cast shadow, no plants, no other objects, no background, no text, no checkerboard; actual alpha transparency. Soft neutral material illumination and realistic high quality textile detail matching the supplied reference.
```

### 6. foregroundLeft

```text
Use case: background-extraction. Create ONLY the LEFT bottom close-up soft-focus white flower foreground from the supplied approved mountain sunrise memorial reference, as one TRUE transparent full-canvas RGBA PNG sprite. Portrait canvas 1179x2556 pixels, aspect ~0.4613, same camera coordinates as reference. Keep the complete upper 80 percent of the image completely empty transparent. Put a natural cluster of soft white chrysanthemum-like and small white lily blooms with muted olive/sage leaves ONLY in the bottom LEFT corner, rising to y=0.80H, extending across x=0.00 to no farther than 0.27W. Flower tips and complete readable flower heads gently curve toward center but remain in left quarter. Main flower shapes recognizable but distinctly defocused as 50mm f/1.4 very near-lens photography, softly feathered botanical edges, realistic warm ivory petals and muted green stems. Plant stems may exit at bottom/left canvas border but do not abruptly cut main blooms. Center x>=0.28W and the entire right side MUST be alpha zero. No pine trunks, no rocks, no mountain, no sky, no floor, no rug, no table, no cushion, no pot or vase, no cast shadow. No light particles, no bokeh circles, no glows, no checkerboard, no white/black backdrop, no UI, no text. Match the reference's bottom-left flowers and natural color, neutral soft illumination with a faint morning warmth. This is one isolated LEFT botanical foreground on a mostly transparent full canvas, not a composition of the scene.
```

### 7. foregroundLeft-correction

```text
Edit target: this transparent LEFT flower-only image. This is a targeted layout correction, keep the exact same flower species, colors, photorealistic soft defocus, lighting and natural arrangement. Keep canvas dimensions and aspect unchanged (portrait 852x1846, intended design 1179x2556). REDUCE the entire existing flower cluster to HALF its current width and HALF its current height, staying anchored exactly to the BOTTOM LEFT corner. The flowers currently extend too far into the canvas. After correction, EVERY flower/leaf pixel must be restricted to x=0..300 and y=1450..1845 on the 852x1846 canvas; the rest is alpha 0. Most pixels of the final image must be completely transparent, especially ALL rows 0..1449 and ALL columns 301..851. Do not fill the empty space, do not zoom in to compensate, do not center the cluster. The entire flower cluster needs to look SMALL at the lower LEFT corner of a very tall empty transparent canvas, occupying only about one fifth of canvas height. No additional flower, no text, no scenery, no new object. Preserve real alpha transparency and the full portrait canvas, do not crop the image.
```

### 8. foregroundRight

```text
Use case: background-extraction. Image 1 is the approved full sunrise scene for botanical design; Image 2 is the corrected LEFT transparent foreground and is the STRICT size/layout/defocus reference. Generate its companion RIGHT botanical foreground as one TRUE transparent RGBA PNG. Full tall portrait canvas 852x1846 (design 1179x2556), same framing as both inputs. Only a SMALL spray of soft ivory-white chrysanthemum-like flowers, a few slim white lily blooms and muted olive/sage leaves at the bottom RIGHT corner. All visible plant pixels confined to x=550..851 and y=1450..1845. Keep every pixel above y=1450 and to the left of x=550 fully transparent. This is an almost entirely empty transparent canvas with a small near-lens plant cluster at the very bottom-right, about one fifth of canvas height. Match image 2 scale and density, but create a naturally different arrangement bending gently left. Flower heads remain within canvas, stems can enter from bottom/right. Match the distinctly soft shallow-focus lens rendering of image 2, 50mm f/1.4 defocus baked into flower and leaf edges; shapes still readable. No pine, no pot or vase, no floor, no backdrop, no landscape, no table, no rug or cushion, no bokeh circles, no glows, no text, no UI. Actual alpha transparency, not a painted checkerboard. Do NOT enlarge to fill the frame or center the flowers. Preserve full tall transparent canvas.
```

### 9. groundMat-perspective-correction

```text
Edit target: isolated indigo embroidered mountain prayer mat. Change ONLY the camera elevation / projected mat depth to match a shallow 15-degree downward view. Keep material, weave, fine cream mountain embroidery, navy binding, front-centered symmetry and overall width unchanged. Current top surface is too deep/tall. Make the visible surface more foreshortened: rear-edge width should stay 72% of front-edge width, and projected rear-to-front surface depth must be 19% of front-edge width, not the current roughly 24%. Both near and far edges perfectly horizontal, floor rectangle horizontal, not tilted upward. Show the ENTIRE mat on true transparent RGBA with 24px safety margin around every corner, landscape canvas tightly fitted to the object. No cushion, no floor, no shadow, no surrounding objects, no text, no checkerboard. Keep high resolution cloth detail, do not change color or design. This single targeted perspective correction makes a shallower, wider-looking mat.
```
