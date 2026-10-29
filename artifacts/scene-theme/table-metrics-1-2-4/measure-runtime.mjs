import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { getSceneCompositionWidth } from '../../../src/pixi/scene/SceneViewportLayout.ts';
import { getSceneThemeAltarTableMetrics } from '../../../src/pixi/layers/table/MingAltarTableSpec.ts';
const directory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(directory, '../../..');
const input = JSON.parse(await readFile(path.join(directory, 'measurements.json'), 'utf8'));
const results = [];
for (const sample of input.samples) {
  const manifestPath = sample.manifestSnapshot ? path.resolve(directory, sample.manifestSnapshot) : path.join(root, 'public/themes', sample.themeId, 'manifest.json');
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  const table = manifest.table;
  const { width, height } = input.canvas;
  const compositionWidth = getSceneCompositionWidth(width, height);
  const tableWidth = Math.max(compositionWidth * table.position.minWidthRatio, Math.min(compositionWidth * table.position.maxWidthRatio, compositionWidth * table.position.widthRatio * (1 + input.forward * table.position.forwardScale)));
  const metrics = getSceneThemeAltarTableMetrics(table, tableWidth);
  const tableTopY = height - (height * table.position.bottomRatio - input.forward * height * table.position.forwardOffsetRatio) - metrics.footDrop;
  const scaleX = metrics.spriteWidth / table.geometry.sourceSize.width;
  const scaleY = metrics.spriteHeight / table.geometry.sourceSize.height;
  assert.ok(Math.abs(scaleX - scaleY) < 1e-10, `${sample.themeId}: nonuniform sprite scale`);
  const feetY = tableTopY + metrics.footDrop;
  assert.ok(Math.abs(feetY - height * (1-table.position.bottomRatio)) < 1e-8);
  results.push({themeId:sample.themeId,asset:table.asset,sourceSize:table.geometry.sourceSize,scale:scaleX,tableWidth,tableTopY,spriteOrigin:{x:width/2-metrics.spriteWidth/2,y:tableTopY+metrics.spriteY},metrics});
}
await writeFile(path.join(directory,'runtime-layouts.json'),JSON.stringify(results,null,2)+'\n');
console.log('PASS: actual runtime geometry helpers evaluated for themes 1, 2, 4 at 393x852; uniform scales and foot anchors verified.');
