/**
 * @file DustMotesView.tsx
 * @description 浮尘场景元素的 React 薄包装（临时层）。
 * 仅负责把渲染域的 DustScene 挂到 DOM 并同步参数，自身不含任何场景逻辑。
 * 待 SpaceRenderer 统一编排后本文件可直接删除。
 */
import React, { useEffect, useRef } from 'react';
import { DustScene } from '../../../pixi';

export interface DustMotesViewProps {
  density: number;
  sunlightIntensity: number;
  windForce?: number;
  timeOfDay: 'day' | 'sunset' | 'night';
}

export const DustMotesView: React.FC<DustMotesViewProps> = ({
  density,
  sunlightIntensity,
  windForce = 0,
  timeOfDay,
}) => {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<DustScene | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const scene = new DustScene({ density, sunlightIntensity, windForce, timeOfDay });
    sceneRef.current = scene;
    scene.mount(host);
    return () => {
      scene.destroy();
      sceneRef.current = null;
    };
    // 仅在挂载时创建，参数变化通过下方 effect 同步
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sceneRef.current?.setOptions({ density, sunlightIntensity, windForce, timeOfDay });
  }, [density, sunlightIntensity, windForce, timeOfDay]);

  return <div ref={hostRef} className="absolute inset-0 pointer-events-none" />;
};
