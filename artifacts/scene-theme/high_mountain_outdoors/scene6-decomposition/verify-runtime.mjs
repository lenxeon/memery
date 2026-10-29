import assert from 'node:assert/strict';
import { readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getSceneCompositionWidth } from '../../../../src/pixi/scene/SceneViewportLayout.ts';
import { getSceneThemeAltarTableMetrics, mapSceneThemeTablePosition } from '../../../../src/pixi/layers/table/MingAltarTableSpec.ts';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../../..');
const publicRoot = path.join(root, 'public');
// Exercise the application's actual JSONC loader against local public files.
globalThis.fetch = async (url) => {
  const local = path.resolve(publicRoot, String(url).replace(/^\//, ''));
  assert.ok(local.startsWith(publicRoot + path.sep));
  try { return new Response(await readFile(local), { status: 200 }); }
  catch { return new Response('', { status: 404 }); }
};
const { loadSceneThemes, SCENE_THEME_OPTIONS, getSceneTheme } = await import('../../../../src/pixi/scene/themes/registry.ts');
await loadSceneThemes();
const { createDefaultSceneAssembly, getSceneComponentOption, getSceneForeground } = await import('../../../../src/pixi/scene/components/registry.ts');
const id = 'high_mountain_outdoors';
const theme = getSceneTheme(id);
const raw = JSON.parse(await readFile(path.join(publicRoot, `themes/${id}/manifest.json`), 'utf8'));
assert.equal(theme.id, id);
assert.equal(SCENE_THEME_OPTIONS.at(-1).id, id);
assert.equal(new Set(SCENE_THEME_OPTIONS.map(t => t.id)).size, SCENE_THEME_OPTIONS.length);
assert.equal(theme.sceneBackground, undefined);
assert.equal(raw.ground.floor, null);
assert.equal(raw.wall.frame, undefined);
assert.equal(raw.defaultAssembly.frameId, 'none');
assert.deepEqual(raw.wall.wallpaperDecorations, []);
assert.deepEqual(raw.wall.frameDecorations, []);
assert.equal(raw.table.woodStyle, 'walnut');
assert.equal(raw.lightRig.godRaysEnabled, false);
assert.equal(raw.preset.lighting.godRaysEnabled, false);

const assembly = createDefaultSceneAssembly(undefined, id);
for (const [part, field] of [['wallpaper', 'wallpaperId'], ['groundMat', 'groundMatId'], ['cushion', 'cushionId']]) {
  assert.ok(getSceneComponentOption(part, assembly[field]), `${part} registered`);
}
for (const side of ['left', 'right']) {
  assert.ok(!Array.isArray(raw.foregroundCandidates[side]));
  assert.ok(!Array.isArray(assembly.foreground[side]));
  const fg = getSceneForeground(assembly.foreground[side].foregroundId);
  assert.equal(fg.themeId, id);
  assert.equal(fg.side, side);
  assert.equal(fg.setId, raw.defaultForegroundSetId);
  assert.deepEqual(fg.referenceCanvas, { width: 1179, height: 2556 });
  assert.equal(assembly.foreground[side].offsetX, 0);
  assert.equal(assembly.foreground[side].offsetY, 0);
}

const measurements = JSON.parse(await readFile(path.join(here, 'asset-measurements.json'), 'utf8'));
const assets = [];
for (const asset of measurements.assets) {
  await access(path.join(publicRoot, asset.path));
  const header = await readFile(path.join(publicRoot, asset.path));
  assert.equal(header.subarray(1, 4).toString(), 'PNG');
  const size = [header.readUInt32BE(16), header.readUInt32BE(20)];
  assert.deepEqual(size, asset.exportSize);
  if (['wallpaper', 'roomOverlay', 'foregroundLeft', 'foregroundRight'].includes(asset.slot)) {
    assert.deepEqual(size, [1179, 2556]);
  }
  if (asset.slot === 'wallpaper') assert.equal(asset.transparentPixels, 0);
  else assert.ok(asset.transparentPixels > 0, `${asset.slot} has real alpha`);
  if (asset.slot.startsWith('foreground')) {
    assert.ok(asset.visibleHeightRatio >= .18 && asset.visibleHeightRatio <= .4);
  }
  assets.push({ slot: asset.slot, path: asset.path, size });
}
const actualPaths = [raw.wall.wallpaper.assets.phone, raw.wall.roomOverlay.asset,
  raw.table.asset, raw.ground.groundMat.asset, raw.ground.cushion.asset,
  ...['left', 'right'].map(side => Object.values(raw.foregroundCandidates[side])[0].asset)].sort();
assert.deepEqual(actualPaths, assets.map(a => a.path).sort());
assert.equal(assets.length, 7);
assert.deepEqual(raw.table.geometry.sourceSize, {
  width: assets.find(a => a.slot === 'table').size[0],
  height: assets.find(a => a.slot === 'table').size[1],
});
const t = theme.table;
const q = t.surface.assetQuad;
assert.equal(q.backLeft.y, t.geometry.backEdgeY);
assert.equal(q.backRight.y, t.geometry.backEdgeY);
assert.equal(q.frontLeft.y, t.geometry.frontEdgeY);
assert.equal(q.frontRight.y, t.geometry.frontEdgeY);
const offerings = Object.entries(theme.defaultOfferings).map(([item, value]) => {
  const { u, v } = value.position;
  const area = t.surface.usableArea;
  assert.ok(u >= area.uMin && u <= area.uMax && v >= area.vMin && v <= area.vMax);
  const mapped = mapSceneThemeTablePosition(t, u, v);
  assert.ok(Number.isFinite(mapped.x) && Number.isFinite(mapped.y));
  return { item, ...value, mapped };
});
assert.equal(offerings.length, 8);

const layouts = [[393, 852], [375, 812], [430, 932]].map(([width, height]) => {
  const tableWidth = getSceneCompositionWidth(width, height) * t.position.widthRatio;
  const metrics = getSceneThemeAltarTableMetrics(t, tableWidth);
  const scale = metrics.spriteWidth / t.geometry.sourceSize.width;
  assert.ok(Math.abs(scale - metrics.spriteHeight / t.geometry.sourceSize.height) < 1e-10);
  const tableTopY = height * (1 - t.position.bottomRatio) - metrics.footDrop;
  return { width, height, tableWidth, metrics, scale, tableTopY,
    spriteTop: tableTopY + metrics.spriteY,
    surfaceFrontWidth: (q.frontRight.x - q.frontLeft.x) * t.geometry.sourceSize.width * scale,
    surfaceBackWidth: (q.backRight.x - q.backLeft.x) * t.geometry.sourceSize.width * scale,
    surfaceDepth: metrics.surfaceDepth };
});
await writeFile(path.join(here, 'runtime-validation.json'), JSON.stringify({
  themeId: id, name: theme.name, loadedThemeIds: SCENE_THEME_OPTIONS.map(t => t.id),
  assets, assembly, offerings, layouts, browserAutomationUsed: false,
}, null, 2) + '\n');
console.log(`PASS: actual loader loaded ${SCENE_THEME_OPTIONS.length} themes; 云海朝晖 registered with 7 PNGs, 2 foregrounds, 8 offerings; IDs, alpha, dimensions, uniform scale and table placement agree.`);
