# 月照莲湖素材生成记录

使用内置 ImageGen，输入包含用户参考图和对应的定位参考图。以下保留各轮生成的实际提示与参数；后续对齐尝试仅用于审查，未替换当前注册素材。

## moonlotus_prompts

```json
[
  {
    "key": "wallpaper",
    "transparent": false,
    "prompt": "Use case precise-object-edit. Input is the exact approved reference. Extract/reconstruct ONLY the opaque full-frame background environment to go behind transparent foreground layers of a Pixi scene. Keep the exact full-frame composition and original camera/scale: moon upper right at x~0.75W,y~0.155H, dark blue night sky and distant cloud/mountains, distant dark trees, arched stone bridge and waterside pavilion at same source position x~0.65W,y~0.34H, tranquil lake with moon reflection, six floating warm golden lotus lanterns at original positions. Fill image across full 1179x2556 portrait canvas. Remove and reconstruct all close indoor terrace floor and curb, altar table, portrait frame, all offerings/vases/candles/fruit/incense, mat/cushion, the entire CLOSE dark tree trunk and canopy on left, close hanging lantern, close bamboo at right and close side plants and close stone lantern at left. Distant trees, bridge/pavilion remain. Natural landscape should fill all edges and extend behind removed elements so it can serve as an opaque full canvas; no transparency, no text, no UI. Keep high-quality photorealistic warm lanterns, moonlight and dark indigo atmosphere from the reference; no stylistic redesign, no recentering."
  },
  {
    "key": "foliage",
    "transparent": true,
    "prompt": "Use case background-extraction. On a TRUE transparent RGBA 1179x2556 portrait FULL CANVAS with exactly the same camera, scale and original reference coordinates, isolate only the fixed close landscape around the outdoor lake: large old tree trunk entering from TOP LEFT, its warm golden leaves and branches extending across upper left, its hanging traditional golden lantern at upper left, slender dark bamboo stems and leaves along TOP RIGHT and right edge; at MID-LOWER EDGES keep the close shoreside leafy plants and rocks and the small glowing stone lantern at left, all as in the original. The center is unobstructed. Keep these elements in their original positions, scale, and coherent night lighting. This layer sits between the separate lake background and separate foreground stone terrace. ALL OTHER AREAS INCLUDING sky, moon, far trees, distant bridge, lake, lotus lights, altar table, portrait, food, candles, vases, floor, mat, cushion MUST BE FULL ALPHA TRANSPARENT. Do not add any colored backdrop or checkerboard. Do not draw extra plants over the central portrait or tabletop."
  },
  {
    "key": "terrace",
    "transparent": true,
    "prompt": "Use case background-extraction. Create one 1179x2556 full-canvas RGBA transparent scene overlay matching the supplied full reference exactly. Keep ONLY (1) the foreground stone terrace curb and entire large stone-tile floor with the existing warm lantern light and coherent shadows, beginning at the actual source reference y~0.682H; reconstruct the complete empty tile floor behind any removed furniture; and (2) the small square dark polished rosewood portrait frame, centered above the tabletop at original exact position x=0.50W,y=0.50H, with delicate gold filigree corners, stand, circular cream BLANK opening, no photo/no name/no text. The frame is a fixed decorative element, its round inner opening must be clear and circular for a runtime dynamic photo, not oversized. Preserve frame size/center and original camera; maintain its warm night illumination. All sky, moon, lake, mountains, trees, hanging lantern, bamboo, plants, stone lantern, table, candles, vessels, incense, fruit, rug and cushion must be removed and fully transparent above the curb except the isolated frame. Reconstruct stone floor hidden by table and rug. Output has fully opaque stone floor below curb across entire width, true alpha0 background above curb, no gray/checkerboard. No baked portrait, photos or text."
  },
  {
    "key": "table",
    "transparent": true,
    "prompt": "Use case background-extraction. Extract/reconstruct ONLY the original dark polished reddish-brown Chinese altar table with its white stone/marble tabletop, antique gold fret details, thin graceful legs and bottom crossbar, as one EMPTY standalone RGBA sprite, true alpha transparent outside and through space between legs. Preserve exact front-facing source style, material and ornament. Remove portrait, flowers, vases, fruit, dishes, candles, incense, floor, mat, cushion, lake and all other objects; reconstruct smooth continuous empty white stone tabletop. Camera shallow 15 degree down, centered without yaw/roll. Critically match Memery measured tabletop standard: flat load-bearing top projected depth divided by front edge width about 0.0952; rear edge/front edge width about 0.856; top surface must be clearly visible, not a thin line and not steep overhead. This should correspond to an approximately 329.8 CSS px long by 31.4 CSS px deep top on a 393x852 reference layout. Full table including legs and marble edge entirely visible, centered with 3% transparent margins, on a landscape canvas. Original dark wood + pale marble and gold trim, clean cutout, no floor/ground/shadow/glow or checkerboard."
  },
  {
    "key": "mat",
    "transparent": true,
    "prompt": "Use case background-extraction. Extract ONLY the black woven rectangular mat with thin gold Chinese geometric border from the supplied reference as a standalone full-body RGBA PNG on true transparent background. Remove the cushion and reconstruct the black fabric texture beneath it. Do not include ground/floor/shadows/table/plants/lanterns. Retain exact matte dark charcoal-to-black color, gold geometric trim and corner scroll motifs, gently foreshortened front view; flat on floor, shallow 15-degree view, rear edge slightly narrower than front. Full mat centered on landscape canvas with small transparent margin; no checkerboard, no text, no halo."
  },
  {
    "key": "cushion",
    "transparent": true,
    "prompt": "Use case background-extraction. Extract ONLY the original single cream ivory circular meditation cushion with subtle woven floral brocade and restrained gold piping from the supplied reference as a complete standalone RGBA PNG with true alpha transparent background. Remove mat, floor, table and any shadow. Flat round top in shallow 15-degree perspective; the circular top surface has a flattened oval with visible short-to-long axis around 0.26, side thickness separate. Preserve warm ivory fabric with delicate flowers and gold edge, no decorative fringe. Full cushion centered on a landscape transparent canvas with margin, gentle neutral light, no checkerboard, no studio backdrop or glow."
  }
]
```

## moonlotus_refine_prompts

```json
[
  {
    "key": "mat_refined",
    "prompt": "Use case precise-object-edit. Image1 is the actual black-and-gold woven rug to correct. Image2 ONLY demonstrates the low, shallow camera of the desired mat, do not copy its color or its halo. Preserve image1's distinctive dark near-black woven material and restrained gold Chinese geometric perimeter/corner embroidery, no letters. Regenerate its shape as a horizontal LONG RECTANGLE seen from a shallow 15-degree angle (13–17 degrees). Its current top-plane front-to-back depth is about 0.305 of front width, this is far too deep/overhead. Match REQUIRED MEASURABLE SOURCE-IMAGE RATIOS: front edge length e.g. 1650px, rear edge length about1188px (rear/front=0.72±0.03), visible front-to-back depth about314px (depth/front=0.19±0.02), measured between the plane's parallel edges excluding cloth thickness. Shape is a wide shallow trapezoid, not a square, matching the low view in image2. Keep full intact gold decoration and dark texture without changing theme, realistic texture. Place centered with 3% clear margin on wide landscape canvas. No cushion, no floor, no object, no shadow, no outer halo or backdrop. ALL outside pixels TRUE ALPHA TRANSPARENT and both top and bottom edge full and horizontal; no cropping, checkerboard, text or symbols."
  },
  {
    "key": "table_refined",
    "prompt": "Use case precise-object-edit. Image1 is the dark polished mahogany and ivory marble altar to correct. Image2 ONLY guides the top-plane projection; do not copy image2's wood color, top material or decorations. Preserve image1's graceful dark legs/feet, Chinese gold trim, under-table crossbar, body ornaments, empty smooth pale marble top. Change only tabletop plane depth, and preserve front edge, body and overall width. Current front-to-back top depth is too shallow. Ensure the clean flat marble plane's visible depth is 9.52% of its front edge, with back/front edge ratio .856; i.e. if front length1400px, depth≈133px, back edge≈1198px. Back edge move UP to add enough visible marble, front edge stays above original fascia, camera centered shallow 15-degree down, no yaw/roll. Fully visible isolated empty table, no offerings, portrait, floor, mat, glow, wall or backdrop; true alpha0 outside entire table silhouette AND inside the gap between legs. No baked checkerboard or shadow. Fine details, natural neutral light."
  },
  {
    "key": "cushion_refined",
    "prompt": "Use case precise-object-edit. Isolate and correct this same cream brocade and gold-piping meditation cushion, preserving its soft floral pattern and ivory/gold material. Adjust camera of circular top to a LOW 15 degree shallow downward view: the upper face is a broad flat horizontal ellipse whose SHORT AXIS IS 0.26 OF ITS LONG AXIS, not 0.39 or greater. Side thickness is separate and thin. No overhead angle or swollen dome. Complete cushion silhouette centered on landscape canvas with generous transparent edges. Remove ALL studio backdrop, dark haze, halo, mat, floor, other objects and ground shadow. Every pixel outside fabric silhouette must have true alpha0, with fine natural anti-aliasing. No checkerboard or text."
  }
]
```

## moonlotus_final_prompts

```json
[
  {
    "key": "mat_final",
    "prompt": "Use case precise-object-edit. Image1 is actual black/gold woven mat, image2 is a GEOMETRY GUIDE ONLY. Improve only the taper of the flat rug: follow the green trapezoid of image2; front edge remains at source y=690 from x14 to1760, back edge at y=374 from x258 to1516. Thus rear/front width about 0.72, projected depth/front width about0.18. Current rear edge is too wide (about 0.77); bring each BACK corner inward about40px, keep front edge and depth. Preserve the original black cloth texture, delicate gold Chinese geometric border/corner detail and natural shallow15 degree floor view. The mat remains flat and centered, full outline visible with small transparent safety margin. Deliver a standalone RGBA PNG with true alpha0 outside silhouette. NEVER include the green guide lines, gray background, guide labels, text, cushion, table, floor, shadows, glow, checkerboard, or any other object. Nothing besides the one rug."
  },
  {
    "key": "table_final",
    "prompt": "Use case precise-object-edit. Edit this isolated antique mahogany/gold altar with ivory marble top. Only make the visible FLAT marble tabletop 5% deeper from back to front while preserving the front edge and table body, full exact source canvas, style and dimensions. Current clean top plane from about y=101 to y=236 needs back edge at about y=93, front edge fixed at y=236, producing projected depth 143 pixels over front length about1492px = 0.096. Keep rear/front edge width approximately .856. Keep the original legs, feet, crossbar, details, warmth, light marble material and horizontal edge in place; do not add objects or cloth. True alpha0 outside the table silhouette and in gaps between legs. No backdrop, glow, checkerboard, title or text."
  }
]
```

## moonlotus_table_guide_prompt

```json
"Use case precise-object-edit. Image1 is the authentic stand-alone marble-and-mahogany altar table. Image2 is a visual GEOMETRY GUIDE ONLY: follow the GREEN TRAPEZOID for the flat pale marble top: back corners (129,93) and (1407,93); front corners (23,235) and (1513,235) on the unchanged1536x1024 image canvas. This means visible top depth142px, front length1490px, rear/front .858. The only change is move the rear marble edge slightly downward and outward to match the GREEN guide, keep front edge fixed at y235 and keep all original body, legs, carved gold details, marble material, lighting and size exactly unchanged. The body must not distort or shift. Generate REAL transparent alpha0 everywhere outside silhouette and in gap under the apron. No props, portrait, candle, mat, green lines, gray background, guide label, checkerboard or text. Full table centered, no crop."
```

## moonlotus_alignment_prompts

```json
[
  {
    "key": "aligned_floor",
    "prompt": "Use case precise-object-edit. Image1 is the transparent full-canvas portrait-frame-and-stone-terrace overlay to correct. Image2 is a geometry guide only. Keep the exact full 852x1846 canvas, transparent alpha above the terrace, intact original small wooden gold portrait frame and the original curb at y~1255. Preserve the warm night stone material and lighting. Change only the stone floor seam directions so their extensions converge to the green reference point x=426,y=1071 (50% width, 58% height). Follow the FOUR green ray orientations in image2: floor seam endpoints approximately (321,1300)-(72,1845), (531,1300)-(780,1845), (369,1300)-(233,1845), (483,1300)-(619,1845). Horizontal floor seams remain horizontal, no change to perspective of portrait frame. Keep all parts coherent and natural. The green lines, dot and text are only guides, never render them. No lake, sky, table, mat, cushion, offerings or extra objects. True alpha outside frame and above terrace, no checkerboard or gray backing."
  },
  {
    "key": "aligned_mat",
    "prompt": "Use case precise-object-edit. Image1 is the approved-style black/gold mat. Image2 is a shape guide only. Adjust its complete flat silhouette to the green target trapezoid: back corners at (262,344),(1510,344), front corners at (31,695),(1741,695), on same 1774x887 source canvas. Rear/front about .73, projected depth/front about .205. Preserve dark woven material and gold border, full horizontal rear and front edges and no crop. This gives a matching shared vanishing region after placement, so target these exact proportions. No labels, green marks or gray background; true transparent RGBA outside mat, no floor, shadow, objects, cushion, text or checkerboard."
  }
]
```
