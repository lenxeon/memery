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

/**
 * Camera-space landmarks measured from the audited isolated classic-dawn table PNG.
 * Keep these proportions beside the asset spec so its feet stay on the floor when
 * the scene scales the table for phone and tablet canvases.
 */
export const getRenderMatchAltarTableMetrics = (tableWidth: number): MingAltarTableMetrics => {
  const imageWidth = 1817;
  const imageHeight = 866;
  const visibleLeft = 37;
  const visibleRight = 1780;
  const centerX = (visibleLeft + visibleRight) / 2;
  const frontEdgeY = 184;
  const visibleTop = 30;
  const footBottomY = 823;
  const scale = tableWidth / (visibleRight - visibleLeft);
  const legWidth = 116 * scale;
  const legCenters = [(214 - centerX) * scale, (1603 - centerX) * scale];
  return {
    spriteWidth: imageWidth * scale,
    spriteHeight: imageHeight * scale,
    spriteY: -frontEdgeY * scale,
    topExtent: (frontEdgeY - visibleTop) * scale,
    surfaceDepth: (frontEdgeY - 48) * scale,
    frontThickness: (236 - frontEdgeY) * scale,
    apronHeight: (407 - 236) * scale,
    footDrop: (footBottomY - frontEdgeY) * scale,
    legWidth,
    leftLegX: legCenters[0] - legWidth / 2,
    rightLegX: legCenters[1] - legWidth / 2,
    apronX: (284 - centerX) * scale,
    apronWidth: (1533 - 284) * scale,
  };
};

/** Sprite y=0 is the tabletop's front edge; keep placement data in this range. */
export const getMingAltarTableSurfaceDepth = (tableWidth: number): number =>
  getMingAltarTableMetrics(tableWidth).surfaceDepth;

/** Distance from the tabletop's front edge to the bottoms of the legs. */
export const getMingAltarTableFootDrop = (tableWidth: number): number =>
  getMingAltarTableMetrics(tableWidth).footDrop;
