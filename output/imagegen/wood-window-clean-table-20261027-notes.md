# 木窗场景与干净供桌审核稿

日期：2026-10-27
生成方式：内置 image_gen，参考图生成后编辑。
最终文件：wood-window-clean-table-20261027.png

## 比例测算

口径：按房间画面的垂直高度测算，墙面含窗、墙框与踢脚/窗下实体墙；地面从实体墙底缘起算。物件遮挡不改变墙地交界。不是分割后统计可见像素面积。参考图交界局部遮挡，估算误差约 ±1 个百分点。

| 图像 | 画布与测量范围 | 墙地交界 | 墙 / 地占高 |
| --- | --- | --- | --- |
| 用户参考图 1 | 941×1672，整张 | y≈1234 | 约74% / 26% |
| 用户最终效果截图 2 | 762×1496；房间约 x=74..716、y=56..1453，排除外围界面 | 截图 y≈1061，房间内约1005 | 约72% / 28% |
| 本次最终审核稿 | 853×1844，整张 | 两侧可见交界约 y=1402 | 约76% / 24% |

目标曾设为74% / 26%；生成图实际约76% / 24%，应以实测交界为准。审核稿不作为精确拆件或运行时布局坐标来源。

## 本轮内容

- 保留拱形木窗、山水及奶油色墙面，采用木质框架。
- 加入干净的木质供桌，桌面无供品或布饰。
- 加强地板日光、柔和反射、窗格投影，以及桌身投影与接触阴影。
- 地板采用较细木纹和柔润表面，整体暖色服从参考图而避免金属框观感。
- 本次仅交付整体审核稿，没有替换正式主题素材或修改代码。

## 最终编辑提示词

Use case: compositing / precise-object-edit.
Asset: final full-scene architectural review render for Memery, portrait phone aspect ratio 853:1844, opaque PNG.
Input image 1 is the EDIT TARGET: the empty arched wood-window scene. Preserve this architecture, ink landscape, blossoms behind glass, cream plaster, natural WOODEN window frames (NOT gold metal), straight-on camera and narrow portrait framing.
Input image 2 is the ORIGINAL DESIGN REFERENCE. It is the authority for the clean wooden altar table form and especially the FLOOR'S refined luminous material and richer sunlight. Do not copy any offerings, portrait ring, rug, cushion, UI or near-camera flowers.
Apply BOTH requested changes:
1. ADD ONE EMPTY WOODEN ALTAR TABLE centered in front of window, matching the simple low broad table from image 2. Honey-colored natural oak, clean rectangular top with visible thickness, subtle rounded/beveled edges, restrained carpenter joinery, flat paneled wood front and recessed low base like reference. Entire table fully in frame, width ~84% of image, tabletop back edge around y=0.71H, front edge y=0.73H, bottom feet/plinth around y=0.80H. Match table dimensions and shallow 15-degree view to reference, clear tabletop depth, correct integration with floor. Top is COMPLETELY CLEAN, BARE WOOD: no tablecloth, runner, vase, flower, fruit, incense, candle, cup or other object.
2. REFINE AND ILLUMINATE FLOOR according to reference image 2 (original design): fine silky close wood grain, restrained natural pores, subtle board color variation, very few small knots, smooth crafted timber with a soft SATIN wax/oil finish. The current edit target's floor grain is too coarse and rustic: replace that coarse knotty pattern with refined fine-grained timber. Make natural daylight visibly stronger and more beautiful across the floor: luminous cream sun patches, broad SOFT grazing reflections following wood sheen, subtle warm reflected bounce, layered penumbra and legible window-grid shadows. Highlights must feel radiant but retain delicate wood texture. Wood has softly polished fine quality without mirror-gloss, metallic shine, blown white patches or plastic finish. The floor's luminous tactile quality should closely match the original design image, not just increased overall exposure.
LIGHTING AND SHADOWS: coherent strong soft sunlight from UPPER RIGHT toward LOWER LEFT, consistent with original design. Sunlight grazes clean tabletop, leaving window-grid light/shadow over portions of it; front panels show rich directional gentle shading and warm wood bounce. Physically convincing table cast shadow on floor extending toward lower left, soft-edged directional silhouette plus darker restrained contact occlusion beneath feet/base, grounding table firmly. Keep floor's light outside table shadow luminous. Preserve balanced warm-neutral cream/natural timber overall white balance, much less orange/yellow saturation than gold-metal screenshot. Distinguish wood warmth from a yellow color filter.
COMPOSITION: wall-floor seam visible at left/right sides should be y=0.74H (top wall 74%, floor bottom26%, tolerance1%). Adjust the lower wall/window slightly if needed, keeping LOW plain plaster plinth, no tall wainscot. Preserve all verticals and realistic floor perspective. Frame fills full image edge to edge.
No annotations, text, UI, portrait ring, people, offerings, rug, cushion, foreground plants, sparkles or particles. No metallic gold trim anywhere. Output one beautifully resolved full scene, focus on EMPTY TABLE + its LIGHT/SHADOW + refined luminous WOOD FLOOR.

