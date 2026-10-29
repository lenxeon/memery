// One-time export: node export-assets.mjs <originals-dir> <sharp-package-dir>
// Original PNGs and manifests were captured before this repair. No perspective
// transform, resizing, texture repainting, or runtime rendering change is used.
import { createRequire } from 'node:module';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

const [originals, sharpPackage] = process.argv.slice(2);
if (!originals || !sharpPackage) throw new Error('Pass originals directory and sharp package directory.');
const sharp = createRequire(resolve(sharpPackage, 'package.json'))('sharp');
const jobs = [
  { key: 'clear_mat', path: 'themes/classic_dawn/mats/clear-rush-long-mat-unified.png', part: 'groundMat', themes: ['classic_dawn', 'lotus_serenity'] },
  { key: 'ivory_mat', path: 'themes/warm_blessing/mats/ivory-rush-mat.png', part: 'groundMat', themes: ['warm_blessing'] },
  { key: 'straw_mat', path: 'themes/snow_plum_courtyard/mats/straw-mat.png', part: 'groundMat', themes: ['snow_plum_courtyard'] },
  { key: 'brocade_cushion', path: 'themes/snow_plum_courtyard/cushions/brocade-cushion.png', part: 'cushion', themes: ['snow_plum_courtyard'] },
];

function bounds(data, width, height, threshold) {
  let left = width, right = -1, top = height, bottom = -1;
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    if (data[(y * width + x) * 4 + 3] < threshold) continue;
    left = Math.min(left, x); right = Math.max(right, x);
    top = Math.min(top, y); bottom = Math.max(bottom, y);
  }
  if (right < left) throw new Error('Empty sprite.');
  return { left, top, right: right + 1, bottom: bottom + 1 };
}

const manifests = new Map();
for (const theme of new Set(jobs.flatMap(job => job.themes))) {
  manifests.set(theme, JSON.parse(await readFile(resolve(originals, `${theme}-manifest-before.json`), 'utf8')));
}
const measurements = [];
for (const job of jobs) {
  const input = await readFile(resolve(originals, `${job.key}-before.png`));
  const { data, info: { width, height } } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const beforeBounds = bounds(data, width, height, 16);
  const labels = new Int32Array(width * height);
  const queue = new Int32Array(width * height);
  let component = 0, main = 0, mainSize = 0, lowAlphaPixels = 0;
  // All four assets have a single solid object; alpha 1..15 contains the
  // extraction backdrop, colored fringe, and detached background noise.
  for (let p = 0; p < labels.length; p++) {
    const alpha = data[p * 4 + 3];
    if (alpha > 0 && alpha < 16) lowAlphaPixels++;
    if (alpha < 16 || labels[p]) continue;
    component++; let head = 0, tail = 1;
    queue[0] = p; labels[p] = component;
    while (head < tail) {
      const current = queue[head++], x = current % width, y = Math.floor(current / width);
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
        const next = ny * width + nx;
        if (labels[next] || data[next * 4 + 3] < 16) continue;
        labels[next] = component; queue[tail++] = next;
      }
    }
    if (tail > mainSize) { main = component; mainSize = tail; }
  }
  for (let p = 0; p < labels.length; p++) {
    const i = p * 4;
    if (labels[p] !== main) data.fill(0, i, i + 4);
    else data[i + 3] = Math.round(Math.min(1, (data[i + 3] - 15) / 225) * 255);
  }
  const cleanedBounds = bounds(data, width, height, 1);
  const visibleWidth = cleanedBounds.right - cleanedBounds.left;
  const visibleHeight = cleanedBounds.bottom - cleanedBounds.top;
  const padding = Math.ceil(Math.min(visibleWidth, visibleHeight) * 0.02);
  const outputWidth = visibleWidth + padding * 2, outputHeight = visibleHeight + padding * 2;
  const output = await sharp(data, { raw: { width, height, channels: 4 } })
    .extract({ left: cleanedBounds.left, top: cleanedBounds.top, width: visibleWidth, height: visibleHeight })
    .extend({ top: padding, bottom: padding, left: padding, right: padding, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 }).toBuffer();
  await writeFile(resolve('public', job.path), output);
  const placements = [];
  for (const theme of job.themes) {
    const asset = manifests.get(theme).ground[job.part];
    const previous = { widthRatio: asset.widthRatio, bottomRatio: asset.bottomRatio };
    // Preserve the source-pixel-to-design-pixel scale and visible contact edge
    // on the project's 393x852 design canvas after changing transparent canvas.
    asset.widthRatio = Number((previous.widthRatio * outputWidth / width).toFixed(9));
    asset.bottomRatio = Number((previous.bottomRatio + (height - cleanedBounds.bottom - padding) * previous.widthRatio * 393 / width / 852).toFixed(9));
    placements.push({ theme, previous, next: { widthRatio: asset.widthRatio, bottomRatio: asset.bottomRatio } });
  }
  measurements.push({
    key: job.key, path: job.path, before: { width, height, boundsAtAlpha16: beforeBounds, bytes: input.length },
    after: { width: outputWidth, height: outputHeight, bounds: { left: padding, top: padding, right: padding + visibleWidth, bottom: padding + visibleHeight }, bytes: output.length },
    removedLowAlphaPixels: lowAlphaPixels, removedDetachedComponents: component - 1, placements,
    beforeSha256: createHash('sha256').update(input).digest('hex'), afterSha256: createHash('sha256').update(output).digest('hex'),
  });
}
for (const [theme, manifest] of manifests) {
  manifest.version++;
  // Replace only the changed numeric fields; preserve all existing formatting.
  const filename = resolve('public/themes', theme, 'manifest.json');
  let source = await readFile(filename, 'utf8');
  source = source.replace(/("version"\s*:\s*)\d+/, (_, prefix) => `${prefix}${manifest.version}`);
  for (const part of ['groundMat', 'cushion']) {
    const asset = manifest.ground[part];
    source = source.replace(new RegExp(`("${part}"\\s*:\\s*\\{[^}]*?"widthRatio"\\s*:\\s*)[\\d.]+`), (_, prefix) => `${prefix}${asset.widthRatio}`);
    source = source.replace(new RegExp(`("${part}"\\s*:\\s*\\{[^}]*?"bottomRatio"\\s*:\\s*)[\\d.]+`), (_, prefix) => `${prefix}${asset.bottomRatio}`);
  }
  await writeFile(filename, source);
}
await writeFile(new URL('./measurements.json', import.meta.url), JSON.stringify({ designCanvas: { width: 393, height: 852 }, alphaCutoff: 16, assets: measurements }, null, 2) + '\n');
console.log(JSON.stringify(measurements.map(({ key, before, after, removedLowAlphaPixels, removedDetachedComponents }) => ({ key, before, after, removedLowAlphaPixels, removedDetachedComponents })), null, 2));
