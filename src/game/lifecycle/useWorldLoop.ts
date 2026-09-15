/**
 * useWorldLoop: 游戏世界时钟与高性能生命周期引擎
 * 采用累积时间片调度与事件驱动更新，彻底消除 60FPS 虚拟 DOM 频繁 Reconciliation 开销
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { GameItemData, WorldContext, EntityEvent } from '../types/entity';
import { itemRegistry } from '../factories/AbstractItemFactory';
import { LightingSettings } from '../../types';

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

  // 帧步进调度 (高频物理/衰减累积，低频 React 状态提交)
  useEffect(() => {
    let animId: number;

    const tick = (now: number) => {
      const deltaMs = Math.min(100, now - lastTimeRef.current);
      lastTimeRef.current = now;

      const deltaSec = deltaMs / 1000;
      const effectiveScale = isPaused ? 0 : timeScale;

      if (effectiveScale > 0) {
        // 根据流速动态决定 React state 提交间隔 (现实1x时为1000ms，演示10x时为300ms，极速30x时为150ms)
        const commitInterval = effectiveScale <= 1 ? 1000 : effectiveScale <= 10 ? 300 : 150;
        const timeSinceLastCommit = now - lastCommitTimeRef.current;
        const shouldPeriodicCommit = timeSinceLastCommit >= commitInterval;

        const world: WorldContext = {
          deltaSec,
          timeScale: effectiveScale,
          lighting,
          soundEnabled,
        };

        const currentItems = itemsRef.current;
        let hasStructuralChange = false;
        let hasValueChange = false;
        const nextItems: Record<string, GameItemData> = {};
        const eventsToFire: EntityEvent[] = [];

        for (const id of Object.keys(currentItems)) {
          const item = currentItems[id];
          if (!item) continue;
          const result = itemRegistry.tickItem(item, world);

          if (result.events && result.events.length > 0) {
            eventsToFire.push(...result.events);
            // 发生阶段切换 (如盛开->枯萎) 或消亡事件时，必须立即触发生命周期提交
            hasStructuralChange = true;
          }

          if (result.nextItem === null) {
            // 实体自然消亡从案面撤下，必须立即提交
            hasStructuralChange = true;
          } else {
            nextItems[id] = result.nextItem;
            if (result.nextItem !== item) {
              hasValueChange = true;
            }
          }
        }

        // 仅在发生结构/阶段跃迁，或到达平滑采样周期时，才提交 React 渲染
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
  }, [isPaused, timeScale, lighting, soundEnabled, onUpdateItems]);

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
