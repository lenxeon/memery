import assert from 'node:assert/strict';
import { test } from 'node:test';

// Pixi reads the browser environment at import time. Recreate the Capacitor
// origin and use its real path resolver while substituting image I/O.
Object.defineProperties(globalThis, {
  navigator: { configurable: true, value: { userAgent: 'iPhone', platform: 'iPhone' } },
  document: { configurable: true, value: { baseURI: 'capacitor://localhost/index.html' } },
  webkit: { configurable: true, value: { messageHandlers: { bridge: {} } } },
});

const { Assets, loadTextures, path } = await import('pixi.js');
await Assets.init({ skipDetections: true });
const loads: string[] = [];
const unloads: string[] = [];
let finishUnload: (() => void) | undefined;
let holdUnload = false;

loadTextures.load = (async (url: string) => {
  loads.push(url);
  if (url.endsWith('/broken.png')) throw new Error('image read failed');
  if (url.endsWith('/unreadable.png')) throw new Event('error');
  return { url };
}) as typeof loadTextures.load;
loadTextures.unload = (async (texture: { url: string }) => {
  unloads.push(texture.url);
  if (holdUnload) await new Promise<void>((resolve) => { finishUnload = resolve; });
}) as typeof loadTextures.unload;

const { loadSceneAsset, releaseUnusedSceneAssets } = await import('../src/pixi/assets/SceneAssetCache');
const tick = () => new Promise<void>((resolve) => setTimeout(resolve, 30));

test('Capacitor scene images keep their host, report failures and survive rapid reuse', async () => {
  assert.equal(loadTextures.config?.preferWorkers, false);
  assert.equal(loadTextures.config?.preferCreateImageBitmap, false);

  const url = '/themes/example/wall.png';
  const expected = 'capacitor://localhost/themes/example/wall.png';
  await loadSceneAsset(url, '背景墙纸');
  assert.equal(loads.at(-1), expected);
  assert.equal(path.toAbsolute(loads.at(-1)!), expected);

  releaseUnusedSceneAssets([url], 0);
  await tick();
  assert.deepEqual(unloads, []);

  holdUnload = true;
  releaseUnusedSceneAssets([], 0);
  await tick();
  assert.equal(unloads.at(-1), expected);
  const countBeforeReuse = loads.length;
  const reused = loadSceneAsset(url, '背景墙纸');
  assert.equal(loads.length, countBeforeReuse);
  assert.ok(finishUnload);
  finishUnload();
  await reused;
  assert.equal(loads.length, countBeforeReuse + 1);
  assert.equal(loads.at(-1), expected);

  await assert.rejects(loadSceneAsset('/themes/broken.png', '前景素材'), (error: Error) => {
    assert.match(error.message, /前景素材加载失败：\/themes\/broken\.png/);
    assert.match(error.message, /image read failed/);
    return true;
  });
  await assert.rejects(loadSceneAsset('/themes/unreadable.png', '席垫素材'), (error: Error) => {
    assert.match(error.message, /席垫素材加载失败：\/themes\/unreadable\.png/);
    assert.match(error.message, /图片请求或解码失败/);
    assert.doesNotMatch(error.message, /\[object Event\]/);
    return true;
  });
});

test('theme configuration failures identify the file that could not be read', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (url: string) => {
    if (url === '/themes/catalog.json') {
      return new Response(JSON.stringify({
        schemaVersion: 1,
        themes: [{ id: 'example', manifest: 'themes/example/manifest.json' }],
      }));
    }
    throw new Error('connection lost');
  }) as typeof fetch;
  try {
    const { loadSceneThemes } = await import('../src/pixi/scene/themes/registry');
    await assert.rejects(loadSceneThemes(), (error: Error) => {
      assert.match(error.message, /主题配置文件读取失败：\/themes\/example\/manifest\.json/);
      assert.match(error.message, /connection lost/);
      return true;
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});
