import assert from 'node:assert/strict';
import { readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getSceneCompositionWidth, getScenePortraitOpeningLayout } from '../../../../src/pixi/scene/SceneViewportLayout.ts';
import { getSceneThemeAltarTableMetrics, mapSceneThemeTablePosition } from '../../../../src/pixi/layers/table/MingAltarTableSpec.ts';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../../..');
const publicRoot = path.join(root, 'public');
globalThis.fetch = async (url) => {
  const local = path.resolve(publicRoot, String(url).replace(/^\//, ''));
  assert.ok(local.startsWith(publicRoot + path.sep));
  try { return new Response(await readFile(local)); }
  catch { return new Response('', { status: 404 }); }
};
const { loadSceneThemes, SCENE_THEME_OPTIONS, getSceneTheme } = await import('../../../../src/pixi/scene/themes/registry.ts');
await loadSceneThemes();
const { createDefaultSceneAssembly, getSceneComponentOption, getSceneForeground } = await import('../../../../src/pixi/scene/components/registry.ts');
const { getWallSpec } = await import('../../../../src/pixi/scene/walls/BaseWall.ts');
const id = 'celestial_realm';
const theme = getSceneTheme(id);
const raw = JSON.parse(await readFile(path.join(publicRoot, `themes/${id}/manifest.json`), 'utf8'));
const warm = JSON.parse(await readFile(path.join(publicRoot, 'themes/warm_blessing/manifest.json'), 'utf8'));
assert.equal(theme.id, id);
assert.ok(SCENE_THEME_OPTIONS.some(t => t.id === id));
assert.equal(new Set(SCENE_THEME_OPTIONS.map(t => t.id)).size, SCENE_THEME_OPTIONS.length);
assert.equal(theme.sceneBackground, undefined);
assert.equal(raw.wall.frame, undefined);
assert.equal(raw.ground.floor, null);
assert.equal(raw.defaultAssembly.frameId, 'none');
assert.deepEqual(raw.wall.wallpaperDecorations, []);
assert.deepEqual(raw.wall.frameDecorations, []);
assert.deepEqual(raw.defaultAssembly.offerings, warm.defaultAssembly.offerings, 'offering template follows theme2');
assert.equal(theme.defaultForegroundSetId, 'celestial_ivory_magnolia');
assert.equal(theme.foregroundSetIds.length, 6);
assert.equal(new Set(theme.foregroundSetIds).size, 6);
assert.equal(theme.foregroundCandidates.length, 12);
const assembly = createDefaultSceneAssembly(undefined, id);
for (const [part, field] of [['wallpaper', 'wallpaperId'], ['groundMat', 'groundMatId'], ['cushion', 'cushionId']]) {
  assert.ok(getSceneComponentOption(part, assembly[field]));
}
for (const setId of theme.foregroundSetIds) {
  const selected = createDefaultSceneAssembly(setId, id);
  for (const side of ['left', 'right']) {
    const instance = selected.foreground[side];
    const foreground = getSceneForeground(instance.foregroundId);
    assert.ok(!Array.isArray(instance));
    assert.equal(foreground.themeId, id);
    assert.equal(foreground.side, side);
    assert.equal(foreground.setId, setId);
    assert.deepEqual(foreground.referenceCanvas, { width: 1179, height: 2556 });
    assert.equal(instance.offsetX, 0);
  }
}

const measurement = JSON.parse(await readFile(path.join(here, 'asset-measurements.json'), 'utf8'));
assert.equal(measurement.assets.length, 17);
const paths = [raw.wall.wallpaper.assets.phone, raw.wall.roomOverlay.asset,
  raw.table.asset, raw.ground.groundMat.asset, raw.ground.cushion.asset,
  ...['left', 'right'].flatMap(side => Object.values(raw.foregroundCandidates[side]).map(a => a.asset))];
assert.deepEqual(paths.sort(), measurement.assets.map(a => a.path).sort());
for (const asset of measurement.assets) {
  await access(path.join(publicRoot, asset.path));
  const png = await readFile(path.join(publicRoot, asset.path));
  assert.equal(png.subarray(1, 4).toString(), 'PNG');
  assert.deepEqual([png.readUInt32BE(16), png.readUInt32BE(20)], asset.exportSize);
  if (!['table', 'groundMat', 'cushion'].includes(asset.slot)) assert.deepEqual(asset.exportSize, [1179, 2556]);
  if (asset.slot === 'wallpaper') assert.equal(asset.transparentPixels, 0);
  else assert.ok(asset.transparentPixels > 0, `${asset.slot} true alpha`);
  if (asset.slot.includes('_left') || asset.slot.includes('_right')) {
    assert.ok(asset.visibleHeightRatio >= .18 && asset.visibleHeightRatio <= .4, `${asset.slot}: height ${asset.visibleHeightRatio}`);
    assert.ok(asset.centralAlphaMax <= 1, `${asset.slot}: center intrusion`);
  }
}
for (const name of ['场景7效果图.png', '场景7墙纸.png', '场景7场景图.png']) {
  const png = await readFile(path.join(root, 'ui', name));
  assert.deepEqual([png.readUInt32BE(16), png.readUInt32BE(20)], [1179, 2556]);
}
const tableImage = measurement.assets.find(a => a.slot === 'table');
assert.deepEqual(raw.table.geometry.sourceSize, { width: tableImage.exportSize[0], height: tableImage.exportSize[1] });
const t = theme.table, q = t.surface.assetQuad;
assert.equal(q.frontLeft.y, t.geometry.frontEdgeY);
assert.equal(q.frontRight.y, t.geometry.frontEdgeY);
assert.equal(q.backLeft.y, t.geometry.backEdgeY);
assert.equal(q.backRight.y, t.geometry.backEdgeY);
const offerings = Object.entries(theme.defaultOfferings).map(([item, offering]) => {
  const { u, v } = offering.position, a = t.surface.usableArea;
  assert.ok(u >= a.uMin && u <= a.uMax && v >= a.vMin && v <= a.vMax);
  const mapped = mapSceneThemeTablePosition(t, u, v);
  assert.ok(Number.isFinite(mapped.x) && Number.isFinite(mapped.y));
  return { item, ...offering, mapped };
});
assert.equal(offerings.length, 8);

const opening = raw.wall.portrait.sceneOpening;
assert.deepEqual(getWallSpec(id).portrait.sceneOpening, opening, 'wall adapter retains opening');
for (const old of SCENE_THEME_OPTIONS.filter(t =>
  ['classic_dawn', 'warm_blessing', 'lotus_serenity', 'snow_plum_courtyard', 'autumn_lake', 'high_mountain_outdoors'].includes(t.id))) {
  assert.equal(getWallSpec(old.id).portrait.sceneOpening, undefined, `${old.id}: retain legacy portrait layout`);
}
const layouts = [[393, 852], [375, 812], [430, 932], [393, 800]].map(([width, height]) => {
  const tableWidth = getSceneCompositionWidth(width, height) * t.position.widthRatio;
  const metrics = getSceneThemeAltarTableMetrics(t, tableWidth);
  const scale = metrics.spriteWidth / t.geometry.sourceSize.width;
  assert.ok(Math.abs(scale - metrics.spriteHeight / t.geometry.sourceSize.height) < 1e-10);
  const tableTopY = height * (1 - t.position.bottomRatio) - metrics.footDrop;
  const portrait = getScenePortraitOpeningLayout(width, height, opening);
  // Independently map actual design pixels through the room texture's cover transform.
  const cover = Math.max(width / 1179, height / 2556);
  const openingX = opening.x * 1179;
  const openingY = opening.y * 2556;
  const openingDiameter = opening.diameterRatio * 1179;
  const expectedX = (width - 1179 * cover) / 2 + openingX * cover;
  const expectedY = (height - 2556 * cover) / 2 + openingY * cover;
  assert.ok(Math.abs(portrait.x - expectedX) < 1e-9);
  assert.ok(Math.abs(portrait.y - expectedY) < 1e-9);
  assert.ok(Math.abs(portrait.diameter - openingDiameter * cover) < 1e-9);
  return { width, height, tableWidth, metrics, scale, tableTopY,
    spriteTop: tableTopY + metrics.spriteY,
    surfaceFrontWidth: (q.frontRight.x - q.frontLeft.x) * t.geometry.sourceSize.width * scale,
    surfaceBackWidth: (q.backRight.x - q.backLeft.x) * t.geometry.sourceSize.width * scale,
    surfaceDepth: metrics.surfaceDepth, portrait };
});
await writeFile(path.join(here, 'runtime-validation.json'), JSON.stringify({
  themeId: id, name: theme.name, loadedThemeIds: SCENE_THEME_OPTIONS.map(t => t.id),
  assets: measurement.assets.map(({ slot, path, exportSize }) => ({ slot, path, exportSize })),
  foregroundSetIds: theme.foregroundSetIds, assembly, offerings, layouts,
  oldPortraitLayoutsPreserved: true, browserAutomationUsed: false,
}, null, 2) + '\n');
console.log(`PASS: ${SCENE_THEME_OPTIONS.length} themes load; 17 PNGs, 6 paired foreground sets and theme2's 8 offerings resolve. Portrait registers to the scene circle on 4 phone sizes; old portrait layouts remain default.`);
