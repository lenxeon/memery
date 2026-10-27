import type { SceneThemeTableDefinition } from '../../../types';

/**
 * Measured layout for the extracted Ming-style altar-table raster.
 * Coordinates refer to the 2060×763 source image; visible bounds are used as
 * the design width so its transparent padding does not change scene sizing.
 */
const IMAGE_WIDTH = 2060;
const IMAGE_HEIGHT = 763;
const VISIBLE_LEFT = 40;
const VISIBLE_RIGHT = 2020;
const IMAGE_CENTER_X = (VISIBLE_LEFT + VISIBLE_RIGHT) / 2;
const VISIBLE_TOP = 36;
const FRONT_EDGE_Y = 222;
const TOP_BACK_EDGE_Y = 90;
const FRONT_FASCIA_BOTTOM_Y = 286;
const APRON_BOTTOM_Y = 409;
const FOOT_BOTTOM_Y = 721;
const LEG_LEFT = 150;
const LEG_RIGHT = 268;
const APRON_LEFT = 245;
const APRON_RIGHT = 1815;

const VISIBLE_WIDTH = VISIBLE_RIGHT - VISIBLE_LEFT;

export interface MingAltarTableMetrics {
  spriteWidth: number;
  spriteHeight: number;
  spriteY: number;
  topExtent: number;
  surfaceDepth: number;
  frontThickness: number;
  apronHeight: number;
  footDrop: number;
  legWidth: number;
  leftLegX: number;
  rightLegX: number;
  apronX: number;
  apronWidth: number;
}

export const getMingAltarTableMetrics = (tableWidth: number): MingAltarTableMetrics => {
  const scale = tableWidth / VISIBLE_WIDTH;
  const legWidth = (LEG_RIGHT - LEG_LEFT) * scale;
  const leftLegCenter = (LEG_LEFT + LEG_RIGHT) * 0.5 - IMAGE_CENTER_X;
  const rightLegCenter = IMAGE_WIDTH - (LEG_LEFT + LEG_RIGHT) * 0.5 - IMAGE_CENTER_X;

  return {
    spriteWidth: IMAGE_WIDTH * scale,
    spriteHeight: IMAGE_HEIGHT * scale,
    spriteY: -FRONT_EDGE_Y * scale,
    topExtent: (FRONT_EDGE_Y - VISIBLE_TOP) * scale,
    surfaceDepth: (FRONT_EDGE_Y - TOP_BACK_EDGE_Y) * scale,
    frontThickness: (FRONT_FASCIA_BOTTOM_Y - FRONT_EDGE_Y) * scale,
    apronHeight: (APRON_BOTTOM_Y - FRONT_FASCIA_BOTTOM_Y) * scale,
    footDrop: (FOOT_BOTTOM_Y - FRONT_EDGE_Y) * scale,
    legWidth,
    leftLegX: leftLegCenter * scale - legWidth / 2,
    rightLegX: rightLegCenter * scale - legWidth / 2,
    apronX: (APRON_LEFT - IMAGE_CENTER_X) * scale,
    apronWidth: (APRON_RIGHT - APRON_LEFT) * scale,
  };
};

/** Convert the manifest's normalized image landmarks into Pixi coordinates. */
export const getSceneThemeAltarTableMetrics = (
  table: SceneThemeTableDefinition,
  tableWidth: number
): MingAltarTableMetrics => {
  const { width: imageWidth, height: imageHeight } = table.geometry.sourceSize;
  const { visibleBounds, frontEdgeY, backEdgeY, fasciaBottomY, apronBottomY, footBottomY } = table.geometry;
  const visibleWidth = (visibleBounds.right - visibleBounds.left) * imageWidth;
  const scale = tableWidth / visibleWidth;
  const px = (ratio: number) => ratio * imageWidth * scale;
  const py = (ratio: number) => ratio * imageHeight * scale;
  const centerX = imageWidth * 0.5;
  const legWidth = table.geometry.legWidth ? px(table.geometry.legWidth) : 0;
  const leftLegCenter = table.geometry.legCentersX ? (table.geometry.legCentersX.left * imageWidth - centerX) * scale : 0;
  const rightLegCenter = table.geometry.legCentersX ? (table.geometry.legCentersX.right * imageWidth - centerX) * scale : 0;
  const apronLeft = table.geometry.apronBoundsX?.left ?? visibleBounds.left;
  const apronRight = table.geometry.apronBoundsX?.right ?? visibleBounds.right;
  return {
    spriteWidth: imageWidth * scale,
    spriteHeight: imageHeight * scale,
    spriteY: -py(frontEdgeY),
    topExtent: py(frontEdgeY - visibleBounds.top),
    surfaceDepth: py(frontEdgeY - backEdgeY),
    frontThickness: py(fasciaBottomY - frontEdgeY),
    apronHeight: py(apronBottomY - fasciaBottomY),
    footDrop: py(footBottomY - frontEdgeY),
    legWidth,
    leftLegX: leftLegCenter - legWidth / 2,
    rightLegX: rightLegCenter - legWidth / 2,
    apronX: (apronLeft * imageWidth - centerX) * scale,
    apronWidth: px(apronRight - apronLeft),
  };
};

/** Map manifest u/v coordinates on the authored desktop quad to the app's stable 560px position unit. */
export const mapSceneThemeTablePosition = (
  table: SceneThemeTableDefinition,
  u: number,
  v: number
): { x: number; y: number } => {
  const { width, height } = table.geometry.sourceSize;
  const { visibleBounds, frontEdgeY } = table.geometry;
  const { backLeft, backRight, frontLeft, frontRight } = table.surface.assetQuad;
  const topX = backLeft.x + (backRight.x - backLeft.x) * u;
  const topY = backLeft.y + (backRight.y - backLeft.y) * u;
  const bottomX = frontLeft.x + (frontRight.x - frontLeft.x) * u;
  const bottomY = frontLeft.y + (frontRight.y - frontLeft.y) * u;
  const x = topX + (bottomX - topX) * v;
  const y = topY + (bottomY - topY) * v;
  const referenceScale = 560 / ((visibleBounds.right - visibleBounds.left) * width);
  return {
    x: Math.round((x * width - width * 0.5) * referenceScale),
    y: Math.round((y * height - frontEdgeY * height) * referenceScale),
  };
};

export const getSceneThemeTablePlanBounds = (table: SceneThemeTableDefinition) => {
  const { uMin, uMax, vMin, vMax } = table.surface.usableArea;
  const corners = [
    mapSceneThemeTablePosition(table, uMin, vMin),
    mapSceneThemeTablePosition(table, uMax, vMin),
    mapSceneThemeTablePosition(table, uMax, vMax),
    mapSceneThemeTablePosition(table, uMin, vMax),
  ];
  return {
    xMin: Math.min(...corners.map(({ x }) => x)),
    xMax: Math.max(...corners.map(({ x }) => x)),
    yMin: Math.min(...corners.map(({ y }) => y)),
    yMax: Math.max(...corners.map(({ y }) => y)),
  };
};

/** Sprite y=0 is the tabletop's front edge; keep placement data in this range. */
export const getMingAltarTableSurfaceDepth = (tableWidth: number): number =>
  getMingAltarTableMetrics(tableWidth).surfaceDepth;

/** Distance from the tabletop's front edge to the bottoms of the legs. */
export const getMingAltarTableFootDrop = (tableWidth: number): number =>
  getMingAltarTableMetrics(tableWidth).footDrop;
