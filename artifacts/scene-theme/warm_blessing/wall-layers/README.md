# Warm Blessing wall layer review

Four wall layers, in compositing order:

1. `01-wallpaper.png` — static mural paper, no light, no window frame, no blossoms.
2. `../shared/02-portrait-frame.png` — independent portrait ornament; the portrait itself remains runtime content.
3. `03-window-blossoms.png` — independently movable blossom branches behind the frame.
4. `04-wall-window-assembly.png` — one unified wall and window structure. Pane interiors and portrait-ring footprint are transparent; the frame geometry is extracted from the supplied reference by subtraction.

Phone canvas: 1179×1840. iPad canvas: 2048×1967. The structure PNGs are review candidates and are not connected to the live scene yet. Composite previews are for checking layer order.
