import { Assets } from 'pixi.js';

const loadedUrls = new Set<string>();
const pendingLoads = new Map<string, Promise<unknown>>();
const unloadingUrls = new Map<string, Promise<void>>();
let desiredUrls = new Set<string>();
let cleanupTimer: ReturnType<typeof setTimeout> | undefined;
let cleanupRevision = 0;

/** Load a scene image through one cache so theme changes can release stale GPU textures. */
export const loadSceneAsset = <T = unknown>(url: string): Promise<T> => {
  desiredUrls.add(url);
  cleanupRevision += 1;
  if (cleanupTimer) {
    clearTimeout(cleanupTimer);
    cleanupTimer = undefined;
  }

  const unloading = unloadingUrls.get(url);
  if (unloading) return unloading.then(() => loadSceneAsset<T>(url));

  const cachedLoad = pendingLoads.get(url);
  if (cachedLoad) return cachedLoad as Promise<T>;

  loadedUrls.add(url);
  const pending = Assets.load<T>(url);
  pendingLoads.set(url, pending);
  void pending.then(
    () => {
      if (pendingLoads.get(url) === pending) pendingLoads.delete(url);
    },
    () => {
      if (pendingLoads.get(url) === pending) pendingLoads.delete(url);
      loadedUrls.delete(url);
    },
  );
  return pending;
};

/** Keep the active scene's assets and unload everything left over after rapid switches settle. */
export const releaseUnusedSceneAssets = (activeUrls: Iterable<string>, delayMs = 250): void => {
  desiredUrls = new Set([...activeUrls].filter(Boolean));
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
