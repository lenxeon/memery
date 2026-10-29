# 场景4拆解提示词

## 规范要求

- 采用内置 imagegen 工具，参考本次上传的 1179×2556 原图。
- 全幅图层最终统一导出 1179×2556，使用同原点、同长宽比，保留生成的 alpha 通道。生成器返回的近似同比例画幅通过等比 cover 归一化，仅处理像素取整差。
- 采用场景2的窗外底景、窗外花枝、墙窗地光一体层关系。桌案、席垫、蒲团、左右近景独立。
- 室内层保存原稿约 71% 高的墙地构图；原图已由本次拆解指令指定，不调整为其他主题的默认锚点。
- 遗像、纪念文字与供品由运行时独立渲染。生成器补绘被遮挡区域；最终组合由用户审核。

## 内容描述

雪山庭院与覆雪园林，红梅和松枝映在暖木窗外；木梁、木窗、浅暖墙面和木地板保持同一晴日斜光。近景左梅右松明显失焦，中央留清晰主体区域。

### outside

Use case: precise-object-edit. Asset type: Memery scene4 opaque outdoor wallpaper layer. Reference is the user's approved full scene, not a new design. Extract/reconstruct ONLY the snowy Chinese courtyard and distant snow mountains visible through the window: pale winter blue sky, hazy snow mountains, gray snow-covered tiled courtyard wall at the same y position, snowy rockery and shrubs, stone garden lanterns, right-side snow-covered pavilion. REMOVE all indoor ceiling, beams, window frames, indoor walls, floor, altar table and every offering, portrait frame, mat, cushion, all near-camera foreground plants. REMOVE the large red plum branch on the left and the large near pine crown at upper right because those belong in a separate transparent outdoor-branches layer; small distant snow-covered garden plants stay. Fill their occluded areas naturally. Output an OPAQUE full-bleed 1179x2556 portrait canvas with continuous outdoor environment across the entire frame. Maintain the exact reference positions of mountain peaks, horizon, wall roof line and courtyard inside the original window aperture (central aperture x~142..1035, y~355..1395), do not zoom or recenter the outdoor view. Outside that aperture extend the environment naturally to all edges. Exact same camera/light, high quality painterly photoreal 3D illustration; no text, no UI, no checkerboard.

### interior

Use case: background-extraction. Asset type: Memery scene4 full-canvas transparent indoor wall/window/floor layer. Extract the INDOOR ARCHITECTURE ONLY from the supplied approved reference, preserving the exact composition, scale, materials, all carved wooden ornaments and camera. Output 1179x2556 RGBA portrait canvas. Keep wooden ceiling rafters and horizontal top beam, pale plaster transom above the central window, both thick vertical wooden window jambs, the entire thin side lattice windows, lower pale plaster wall under the opening, wooden baseboard and ENTIRE wooden plank floor with the original coherent sunlight and floor shadows. Keep the wall/floor junction at original ~y=1815 (about .71H); do not redesign or reposition. Every outdoor-view opening between wood/lattice bars must be ACTUAL ALPHA TRANSPARENT, including the broad central aperture roughly x=145..1035,y=355..1395. Retain the lower plaster wall across the central area beginning at aperture bottom y~1395; reconstruct the wall previously hidden by the table. REMOVE/reconstruct behind: all outdoor mountains, sky, courtyard, outside branches; all table/legs, all offerings and vases, portrait frame, floor mat/cushion, and both bottom foreground plants. Fill table/offerings/foreground occlusions with the correct wall or continuous wooden floor. Floor must remain fully opaque to all bottom corners. Do not add a portrait circle or any object. Preserve architecture as a SINGLE unbroken layer; no separate collage panels. No baked checkerboard/gray grid; true alpha in window apertures only.

### branches

Use case: background-extraction. Extract ONLY the outdoor red plum branch at middle left and snow-covered pine crown at middle right from the approved reference into one true ALPHA TRANSPARENT 1179x2556 full canvas. Keep exact original positions and size: red plum roughly x=140..430,y=500..880; snow pine crown roughly x=730..1040,y=495..785. Keep snowy twigs and realistic daylight. This is an overlay BEHIND indoor window frames. No indoor wood, wall, roof, garden shrubs, mountains, sky, table, vases, or bottom foreground plants. All non-branch pixels transparent. Do not zoom, crop, recenter or print checkerboard.

### table

Use case: background-extraction. Extract only the carved honey-brown wooden altar table from the approved reference as one complete standalone TRUE TRANSPARENT RGBA sprite, horizontally centered, 4% transparent margin. Preserve original front-facing shallow perspective and exact width-to-height ratio about 2.15:1, two thick square carved legs with block feet, detailed floral apron, fretwork brackets and raised rolled tabletop ends. REMOVE every tabletop object (portrait frame, vases, flowers, fruit, plates, censers, candles and incense), reconstruct clean continuous EMPTY tabletop. Remove floor, cast shadows, wall and every other background. Negative spaces under table and between carving are transparent. No cloth/runner. Neutral soft material light, realistic fine warm wood grain. Landscape canvas, no text, no checkerboard.

### mat

Use case: background-extraction. Extract ONLY rectangular woven straw floor mat from approved reference as standalone TRUE TRANSPARENT RGBA sprite. Remove round cushion and reconstruct continuous fine straw weave and floral woven motifs behind it. No floor, shadows, lighting shafts, table, plants or other objects. Preserve reference shallow camera about 15 degrees, rear edge narrower than front edge, honey-tan straw rectangular trapezoid with thin thickness and fringed edge, visible width/height about 3.5:1. Full silhouette centered on wide landscape canvas with 4% transparent margin, neutral soft light, no checkerboard.

### cushion

Use case: background-extraction. Extract ONLY single round meditation cushion from approved reference as standalone TRUE TRANSPARENT RGBA sprite. Preserve braided honey-brown rattan sides and cream brocade top with subtle floral pattern. No floor, mat, shadow, plant or other objects. Match source's shallow camera about 15 degrees: top surface an oval with short/long axis about .26, side thickness separate. Complete silhouette centered on landscape canvas with 4% transparent margin. Fine realistic weave, neutral soft light. No checkerboard/text.

### foreground_left

Use case: background-extraction. Extract ONLY very close OUT-OF-FOCUS red-and-white plum flowering branches in BOTTOM LEFT CORNER of approved reference on a true ALPHA TRANSPARENT 1179x2556 FULL PORTRAIT canvas. Exact reference placement/size, occupying x=0..510,y=1860..2555; center and entire right half transparent. Exclude upper outdoor red branch and tabletop flowers. Preserve blurred white blossoms/red buds/dark twigs, strong 50mm f/1.4 optical defocus across whole plant, nearest petals softest, no artificial bokeh circles. Complete branch shape with tiny transparent edge safety margin, no pot/roots. No wood floor/snow ground/table/mat/cushion/other background. All nonplant pixels alpha=0. No zoom or tight crop; full canvas coordinates.

### foreground_right

Use case: background-extraction. Extract ONLY very close OUT-OF-FOCUS snow-covered pine in BOTTOM RIGHT CORNER of approved reference on true ALPHA TRANSPARENT 1179x2556 FULL PORTRAIT canvas. Exact reference placement/size, roughly x=760..1178,y=2040..2555; center and ENTIRE LEFT HALF transparent. Exclude upper outdoor pine crown/garden shrubs/tabletop flowers. Preserve fluffy white snow/dark green needles with strong 50mm f/1.4 optical defocus throughout, not merely edge feather, no artificial bokeh circles. Complete branch outline with tiny transparent safe margin, no pot/roots. No wood floor/mat/cushion/table/wall/snow ground/other background. All nonplant pixels alpha=0. No zoom/crop.

### outside_refined

Use case: precise-object-edit. Asset: full canvas opaque snowy courtyard wallpaper for exact alignment behind the window in image1. Image1 is approved full composition, image2 is the extracted wallpaper candidate. Correct image2's vertical composition to match image1: snowy courtyard wall tiled ROOF RIDGE MUST sit at y=750 on a 1179x2556 canvas (29.3% of full height), highest mountain peak at about x=880,y=445 (17.4% height), right pavilion eaves at y~630 (24.6% height). In image2 these are too low. Keep those precise full-frame anchors; this is NOT a new composition. Use image1 to copy the exact view through aperture; fill rest of frame with continuous snowy outdoor garden. Remove the large foreground red plum twig on left and large near pine crown upper right (separate layer), all indoor architecture, table/objects/portrait/mat/cushion/bottom plants. Garden wall and distant shrubs remain. Full opaque outdoor landscape, no window border, no frame or floor. High quality realistic painterly 3D matching source; no alpha/grid/text. Portrait 1179x2556.

### foreground_left_final

Edit this transparent PNG without changing canvas or blur/material/colors. Keep ONLY the small diagonal red-and-white plum branch arrangement in the lowest 30% of the full canvas. REMOVE the tall vertical branch going up the left edge. Topmost plant pixel must start BELOW 70% height; upper 70% completely alpha transparent. Plant occupies bottom-left corner, x<50% width, top at .72H, bottom at .99H. Leave tiny transparent margin around complete natural silhouette. Preserve true alpha and baked optical defocus of remaining flowers. 1179x2556 full canvas, no floor/background/pot/glow/printed grid. The goal is a low corner arrangement, not a tall plant.

### cushion_final

Extract the cushion from image1 faithfully, use image2 only for wicker and cream brocade material. A standalone cutout round woven meditation cushion on completely TRUE ALPHA transparent background. Camera is LOW, 15 degrees looking down: TOP SURFACE ellipse short/long ratio EXACTLY .26, very flat ellipse; side thickness about .16 times diameter, total visible height about .4 diameter. Show fine honey rattan braid on side, subtle cream fabric floral top. No ground at all, no drop shadow, no outer light halo or glow, no opaque gradient background. Four corners and EVERY pixel outside cushion silhouette alpha=0. Complete object centered with 4% transparent margin. Landscape PNG. Keep no mat/floor/plants/other objects. Do not use elevated top-down camera.
