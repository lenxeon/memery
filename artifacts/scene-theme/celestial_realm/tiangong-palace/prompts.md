# 天宫 · 琼楼玉阙概念稿

## 规范要求

项目统一全画布为1179×2556。正面居中、垂直线竖直；共同光源来自右上方。墙地分界目标y=1870（0.7316H），像容圆直径目标0.272W、中心目标(0.50W,0.315H)。全部个人像容、姓名和日期留空，无UI文字。

本次只按用户“来一个天宫主题看看”制作美术概念稿，使用内置image_gen，未新增运行时主题、未改catalog，未拆分批量素材。生成原始图保存为852×1846，最终预览等比放大后仅作中心1像素裁边，导出为1179×2556，不作非等比拉伸。concept-v2.png为本次展示稿；draft-v1-source.png为构图调整前草稿。

**构图未达正式装配规范**：v2虽然缩小了像位并向下移动供桌，但可见像位中心仍约0.41H，高于目标数值（画面中偏低）；后方柱脚/台基地坪交界约0.70H，受台基厚度和供桌遮挡，无法把它认定为y=1870的准确边界。此稿用于看天宫美术方向，不宣称通过布局审核；正式拆层前仍需调整并核验。未启动浏览器，未提交Git。

## 内容描述

主题暂名「琼楼玉阙」：置身于云海之上的白玉天宫，描金斗拱与云纹玉柱围合空间，远处有悬空宫阙、玉桥和云瀑。色彩使用暖白、香槟金、浅青与柔蓝；正中空白像位、玉石供案、青瓷花器与五供、云纹席垫和锦面蒲团，底角白花柔焦。采用当代中式仙境的诗意设计，不作具体宗教教义的呈现。

### 首版实际提示词

```text
Use case: stylized-concept.
Asset type: one complete, high-end photorealistic Chinese celestial-palace memorial-space concept rendering for Memery, not a UI screen. Create a BRAND NEW composition.
Canvas: tall portrait 1179 x 2556 pixels, aspect ratio 0.4613. Full bleed, single continuous scene, no borders.
Primary request: a true Chinese TIANGONG heavenly palace, instantly recognized by its majestic architecture. We are standing INSIDE an elegant open celestial hall built above the clouds. Two tall warm ivory-white jade columns at the far sides, exquisite pale-gold cloud-pattern capitals, graceful Chinese dougong brackets and a lightly gilded carved beam/cornice across the top, tall airy bays framing an immense sea of white clouds. Through the bays, show several distant suspended Chinese palace pavilions with golden roof ridges, delicate jade bridges, and mist-softened distant mountains. Architecture must be a major subject, not a mountain landscape with a tiny pavilion. Heavenly and serene, spacious, dignified and emotionally warm; refined Chinese fantasy realism rather than a videogame throne room.
Palette/materials: creamy white jade, translucent celadon accents, restrained champagne gold, soft sky blue and pale peach cloud light; polished yet tactile jade and stone, finely worked wood and metal. Bright luminous natural daylight from upper right, consistent across the architecture, objects and floor, soft directional shadows to lower left. High dynamic range but restrained highlights and no blown-out white region.
Camera: centered frontal camera, no roll, vertical columns stay vertical, shallow downward viewing angle about 15 degrees for the horizontal floor, table and seat. Use single-point perspective tending toward the overall canvas point (0.50W,0.58H).
EXACT composition targets: scene's rear architecture/ground seam is at y=1870 of 2556 (73.16% down the full image); a low 80-pixel-high jade plinth/baseboard is immediately ABOVE that line. The foreground jade stone floor covers the lower 686 pixels, not half the image. Keep the side column bases at that 73.16% seam. This is distinct from the perspective vanishing point. The hall and cloud view dominate the upper 73%.
Memorial anchor: one EMPTY circular portrait opening, diameter 0.272W (~320px) excluding its thin ornamented frame, centered at (0.50W,0.315H), elegantly mounted on a narrow ivory jade ceremonial screen with restrained pale-gold cloud motifs. The circular interior is plain softly lit ivory, absolutely no person. Reserve a calm pale surface immediately below for future memorial text at y=0.39H..0.45H; leave it completely blank, do not write any characters. The screen must not block the airy sky on both sides.
Table and five offerings: complete elegant Chinese altar table centered, about 0.90W wide, top carrying plane around y=0.745H, feet near y=0.872H. White jade or creamy carved stone table top, fine restrained cloud carving, four warm pale-gold/celadon-accent legs, light and architecturally convincing, no giant throne or massive block. The horizontal top has a visible shallow depth about 9.5% of its front edge width, rear edge 85.6% of front width. Show five offerings, individually readable: one small tasteful bronze-gold incense burner with exactly three fine incense sticks at the center, a pair of slim ivory candles on two elegant matching holders, and a pair of celadon vases holding white magnolia/lily flowers. Also two small restrained fruit plates and three little tea cups, neat balanced placement with air between objects. No oversized bouquet blocking the memorial anchor.
Ground decoration: in front of the table feet, one SMALL pale celadon woven rectangular prayer mat with subtle cloud embroidery, about 0.66W wide, rear edge about 72% of front edge, projected depth about 19% of front edge. Mat sits around y=0.88H..0.96H. On it, a single low round ivory brocade meditation cushion about 0.21W wide, horizontal ellipse top with minor/major axis around 0.26, sidewall visible, centered and safely inset from the mat front edge. Do not turn the cushion upright toward camera.
Foreground: a few very near-lens soft-focus white magnolia blooms and pale green leaves in the far bottom LEFT and RIGHT corners, no branches across the center or table. Subtle shallow depth of field, not a ring of blurry plants.
Style/quality: exquisite realistic architectural visualization, painterly refinement in the distant atmospheric clouds but convincing fine materials and beautiful cohesive lighting, sacred calm, luxurious yet restrained, inviting rather than solemn darkness.
Avoid: people, deities, statues, thrones, dragons dominating the scene, giant lotus throne, excessive red, dark cavern, oversaturated rainbow, loud glowing magical particles, bokeh circles, text, labels, watermarks, logos, interface controls, red guide lines, collage or multiple panels. Deliver the COMPLETE assembled concept image.
```

### 构图调整实际提示词

```text
Edit target: the supplied Chinese heavenly-palace full-scene rendering. Preserve its beautiful white-jade / champagne-gold celestial hall, distant cloud palaces and bridges, luminous color palette, material realism, front-centered symmetry, five offerings and elegant white flower corners. Change ONLY composition and relative placement, with new coherent artwork, not a distorted stretch. Keep the SAME tall portrait 852x1846 canvas and full bleed framing.
The previous image has too much floor: the architecture/floor seam is around y=1125. It must be at y=1350 (73.16% of image), measured from the FULL image top. Move BOTH column bases and the long horizontal rear jade plinth DOWN to y=1350, keeping the floor entirely restricted to y=1350..1845. Columns and rear screen naturally extend down, the cloud palace view becomes taller. No stairs or extra platforms behind the table. Keep verticals vertical.
Make the central circular blank portrait opening SMALLER: exact inner diameter about 232px (27.2% of image width), centered at x=426, y=582 (31.5% of image height). It is now ~300px and too low. Keep only tasteful fine pale-gold frame outside that 232px opening. Mount it higher on the existing central jade ceremonial screen, which extends naturally down to the rear plinth. This creates a quiet empty pale jade region below the circle around y=720..850 for future text; KEEP IT BLANK, no symbols or writing. The rest of the screen can have subtle low-relief clouds near lower corners but should remain refined.
Move the ENTIRE complete altar table and ALL its offerings DOWN, keeping table width and proportions unchanged. Tabletop front edge around y=1425 (77.2% of image), feet bottom near y=1620 (87.8%). Table sits in front of the new y=1350 rear seam. Keep all five offerings readable and proportional, three incense sticks, pair of candles, pair of celadon flower vases, fruit and tea.
Move mat and cushion DOWN into the table's foreground: mat spans roughly y=1630..1760; keep mat around 65% of image width, front centered, no overlap hiding the table feet. Round ivory cushion width about 180px (21% W), centered on the mat around y=1690, low horizontal top ellipse about 0.26 short/long axis. This is a SMALLER cushion than the previous one; don't use it to fill space.
Keep the nearest soft-focus magnolia flowers confined to the very bottom corners with center clear; no large empty floor between mat and flowers.
Exact image objectives: heavenly architecture and cloud view occupy upper 73%, floor lower 27%, portrait circle at 31.5%H, table feet at 87.8%H, ground mat near 95%H. NO text, no arrows, no dimension labels, no UI, no guide lines. High quality complete image, not diagram.
```
