/**
 * @file useWorldLoop.ts
 * @description 供案世界时钟与供品生命周期调度 Hook。
 */
import { useEffect, useRef, useState, useCallback } from 'react';
import { GameItemData, WorldContext, EntityEvent, LifecycleStage } from '../types/entity';
import { LightingSettings } from '../types';

interface UseWorldLoopProps {
  items: Record<string, GameItemData>;
  onUpdateItems: (updater: (prev: Record<string, GameItemData>) => Record<string, GameItemData>) => void;
  lighting: LightingSettings;
  soundEnabled: boolean;
  initialTimeScale?: number;
  onEntityEvent?: (event: EntityEvent) => void;
}

export function useWorldLoop({
  items,
  onUpdateItems,
  lighting,
  soundEnabled,
  initialTimeScale = 1.0,
  onEntityEvent,
}: UseWorldLoopProps) {
  const [timeScale, setTimeScale] = useState<number>(initialTimeScale);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const lastTimeRef = useRef<number>(performance.now());
  const lastCommitTimeRef = useRef<number>(performance.now());
  const itemsRef = useRef(items);
  itemsRef.current = items;

  const onEntityEventRef = useRef(onEntityEvent);
  onEntityEventRef.current = onEntityEvent;
  const hasActiveLifecycle = Object.entries(items).some(([id, item]) => {
    if (!item?.lifecycle) return false;
    return !(id.startsWith('candle') || id === 'censer') || !!item.isLit;
  });

  useEffect(() => {
    if (isPaused || timeScale <= 0 || !hasActiveLifecycle) return;
    let animId: number;

    const tick = (now: number) => {
      const deltaMs = Math.min(100, now - lastTimeRef.current);
      lastTimeRef.current = now;

      const deltaSec = deltaMs / 1000;
      const effectiveScale = isPaused ? 0 : timeScale;

      if (effectiveScale > 0) {
        const commitInterval = effectiveScale <= 1 ? 1000 : effectiveScale <= 10 ? 300 : 150;
        const timeSinceLastCommit = now - lastCommitTimeRef.current;
        const shouldPeriodicCommit = timeSinceLastCommit >= commitInterval;

        const currentItems = itemsRef.current;
        let hasStructuralChange = false;
        let hasValueChange = false;
        const nextItems: Record<string, GameItemData> = {};
        const eventsToFire: EntityEvent[] = [];

        for (const id of Object.keys(currentItems)) {
          const item = currentItems[id];
          if (!item) continue;

          // 仅对具有 lifecycle 的物品进行生命周期心跳推进
          if (!item.lifecycle) {
            nextItems[id] = item;
            continue;
          }

          const lc = item.lifecycle;
          const isCandle = id.startsWith('candle');
          const isCenser = id === 'censer';

          // 未点燃的蜡烛或香炉暂停衰减
          if ((isCandle || isCenser) && !item.isLit) {
            nextItems[id] = item;
            continue;
          }

          const nextAge = lc.age + deltaSec * (lc.decayRate || 1.0) * effectiveScale;
          const progress = Math.min(1.0, nextAge / Math.max(1, lc.duration || 180));
          const health = Math.max(0, 1.0 - progress);

          let stage: LifecycleStage = lc.stage;
          let isLit = item.isLit;

          if (isCandle) {
            if (progress < 0.40) stage = 'blooming';
            else if (progress < 0.70) stage = 'wilting';
            else if (progress < 0.96) stage = 'withered';
            else {
              stage = 'expired';
              isLit = false;
            }
          } else {
            if (progress < 0.15) stage = 'budding';
            else if (progress < 0.65) stage = 'blooming';
            else if (progress < 0.90) {
              if (stage === 'blooming') {
                eventsToFire.push({ type: 'petal_drop', entityId: id });
              }
              stage = 'wilting';
            } else if (progress < 1.0) stage = 'withered';
            else {
              stage = 'expired';
              if (lc.autoDespawn) {
                eventsToFire.push({ type: 'despawn', entityId: id });
                hasStructuralChange = true;
                continue; // 移除已消亡物品
              }
            }
          }

          const updated: GameItemData = {
            ...item,
            isLit,
            lifecycle: {
              ...lc,
              age: nextAge,
              health,
              stage,
            },
          };

          if (stage !== lc.stage || isLit !== item.isLit) {
            hasStructuralChange = true;
          } else {
            hasValueChange = true;
          }

          nextItems[id] = updated;
        }

        if (hasStructuralChange || (hasValueChange && shouldPeriodicCommit)) {
          lastCommitTimeRef.current = now;
          onUpdateItems(() => nextItems);
        }

        if (eventsToFire.length > 0 && onEntityEventRef.current) {
          eventsToFire.forEach((ev) => onEntityEventRef.current?.(ev));
        }
      }

      animId = requestAnimationFrame(tick);
    };

    lastTimeRef.current = performance.now();
    lastCommitTimeRef.current = performance.now();
    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPaused, timeScale, hasActiveLifecycle, lighting, soundEnabled, onUpdateItems]);

  const togglePause = useCallback(() => {
    setIsPaused((p) => !p);
  }, []);

  return {
    timeScale,
    setTimeScale,
    isPaused,
    togglePause,
  };
}
