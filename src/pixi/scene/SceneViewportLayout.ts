/** iPhone 16 portrait reference canvas in CSS points (1179 × 2556 at 3×). */
export const IPHONE_16_SCENE_REFERENCE = { width: 393, height: 852 } as const;

/**
 * Scale the centered composition from the iPhone 16 reference canvas.
 * Wider portrait devices gain side wings instead of enlarging focal objects.
 */
export const getSceneCompositionScale = (viewportWidth: number, viewportHeight: number): number =>
  Math.min(
    viewportWidth / IPHONE_16_SCENE_REFERENCE.width,
    viewportHeight / IPHONE_16_SCENE_REFERENCE.height
  );

export const getSceneCompositionWidth = (viewportWidth: number, viewportHeight: number): number =>
  IPHONE_16_SCENE_REFERENCE.width * getSceneCompositionScale(viewportWidth, viewportHeight);
