# Warm Blessing wall layer review

Four wall layers, in compositing order:

1. `01-wallpaper.png` — static mural paper, no light, no window frame, no blossoms.
2. `../shared/02-portrait-frame.png` — independent portrait ornament; the portrait itself remains runtime content.
3. `03-window-blossoms.png` — independently movable blossom branches behind the frame.
4. `04-wall-window-assembly.png` — one unified wall and window structure. Pane interiors and portrait-ring footprint are transparent; the frame geometry is extracted from the supplied reference by subtraction.

These PNGs are older review candidates and are not connected to the live scene. Their previous canvases are not current output specifications. New scene design images use phone-only 1179×2556 px canvases; do not create an iPad variant. See `/Volumes/data/workspace/memery/.agents/skills/memery-scene-theme/SKILL.md`. Composite previews are for checking layer order.
