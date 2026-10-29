import type { SceneThemePortraitPlacement } from '../../types';

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

/** Use the same centered, uniform cover transform as full-canvas room artwork. */
export const getScenePortraitOpeningLayout = (
  width: number,
  height: number,
  opening: NonNullable<SceneThemePortraitPlacement['sceneOpening']>
): { x: number; y: number; diameter: number } => {
  const scale = Math.max(width / IPHONE_16_SCENE_REFERENCE.width, height / IPHONE_16_SCENE_REFERENCE.height);
  const sceneWidth = IPHONE_16_SCENE_REFERENCE.width * scale;
  const sceneHeight = IPHONE_16_SCENE_REFERENCE.height * scale;
  return {
    x: width * 0.5 + (opening.x - 0.5) * sceneWidth,
    y: height * 0.5 + (opening.y - 0.5) * sceneHeight,
    diameter: sceneWidth * opening.diameterRatio,
  };
};
