import { Capacitor } from '@capacitor/core';
import { Assets, loadTextures } from 'pixi.js';

// WKWebView serves bundled files through a custom URL scheme. Decode them in
// the web view so worker fetches do not depend on custom-scheme support.
if (Capacitor.getPlatform() === 'ios' && loadTextures.config) {
  loadTextures.config.preferWorkers = false;
  loadTextures.config.preferCreateImageBitmap = false;
  loadTextures.config.crossOrigin = null;
}

const loadedUrls = new Set<string>();
const pendingLoads = new Map<string, Promise<unknown>>();
const unloadingUrls = new Map<string, Promise<void>>();
let desiredUrls = new Set<string>();
let cleanupTimer: ReturnType<typeof setTimeout> | undefined;
let cleanupRevision = 0;

// Pixi treats a root-relative URL under capacitor:// as capacitor://themes/...
// and drops localhost. Resolve it before passing it to Pixi or its unloader.
const resolveSceneAssetUrl = (url: string): string => new URL(url, document.baseURI).href;

const assetFailure = (label: string, url: string, error: unknown): Error => {
  const reason = error instanceof Error ? error.message
    : typeof error === 'string' && error ? error : '设备无法读取或解码该图片';
  const readableReason = reason.replace(/\[object (?:Event|ErrorEvent)\]/g, '图片请求或解码失败，系统未提供更多信息');
  return new Error(`${label}加载失败：${url}\n原因：${readableReason}`);
};

/** Load a scene image through one cache so theme changes can release stale GPU textures. */
export const loadSceneAsset = <T = unknown>(url: string, label = '场景素材'): Promise<T> => {
  const assetUrl = resolveSceneAssetUrl(url);
  desiredUrls.add(assetUrl);
  cleanupRevision += 1;
  if (cleanupTimer) {
    clearTimeout(cleanupTimer);
    cleanupTimer = undefined;
  }

  const unloading = unloadingUrls.get(assetUrl);
  if (unloading) return unloading.then(() => loadSceneAsset<T>(url, label));

  const cachedLoad = pendingLoads.get(assetUrl);
  if (cachedLoad) return cachedLoad as Promise<T>;

  loadedUrls.add(assetUrl);
  const pending = Assets.load<T>(assetUrl).catch((error: unknown) => {
    throw assetFailure(label, url, error);
  });
  pendingLoads.set(assetUrl, pending);
  void pending.then(
    () => {
      if (pendingLoads.get(assetUrl) === pending) pendingLoads.delete(assetUrl);
    },
    () => {
      if (pendingLoads.get(assetUrl) === pending) pendingLoads.delete(assetUrl);
      loadedUrls.delete(assetUrl);
    },
  );
  return pending;
};

/** Keep the active scene's assets and unload everything left over after rapid switches settle. */
export const releaseUnusedSceneAssets = (activeUrls: Iterable<string>, delayMs = 250): void => {
  desiredUrls = new Set([...activeUrls].filter(Boolean).map(resolveSceneAssetUrl));
  cleanupRevision += 1;
  const revision = cleanupRevision;
  if (cleanupTimer) clearTimeout(cleanupTimer);
  cleanupTimer = setTimeout(() => {
    cleanupTimer = undefined;
    void unloadUnusedAssets(revision);
  }, delayMs);
};

const unloadUnusedAssets = async (revision: number): Promise<void> => {
  for (const url of loadedUrls) {
    if (revision !== cleanupRevision) return;
    if (desiredUrls.has(url)) continue;

    const pending = pendingLoads.get(url);
    if (pending) await pending.catch(() => undefined);
    if (revision !== cleanupRevision || desiredUrls.has(url)) return;

    let didUnload = false;
    const unload = Assets.unload(url).then(() => {
      didUnload = true;
    }).catch((error: unknown) => {
      console.warn(`Failed to release inactive scene asset: ${url}`, error);
    });
    unloadingUrls.set(url, unload);
    await unload;
    if (unloadingUrls.get(url) === unload) unloadingUrls.delete(url);
    if (didUnload) {
      loadedUrls.delete(url);
      pendingLoads.delete(url);
    }
    if (revision !== cleanupRevision || desiredUrls.has(url)) return;
  }
};
