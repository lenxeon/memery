/**
 * @file GodRaysView.tsx
 * @description 丁达尔光束场景元素的 React 薄包装（临时层）。
 * 仅负责挂载渲染域的 GodRaysScene 并同步参数，不含任何场景逻辑。
 */
import React, { useEffect, useRef } from 'react';
import { GodRaysScene } from '../../../pixi';

export interface GodRaysViewProps {
  enabled: boolean;
  intensity: number;
  sunAngle: number;
  timeOfDay: 'day' | 'sunset' | 'night';
}

export const GodRaysView: React.FC<GodRaysViewProps> = ({
  enabled,
  intensity,
  sunAngle,
  timeOfDay,
}) => {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<GodRaysScene | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const scene = new GodRaysScene({ enabled, intensity, sunAngle, timeOfDay });
    sceneRef.current = scene;
    scene.mount(host);
    return () => {
      scene.destroy();
      sceneRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sceneRef.current?.setOptions({ enabled, intensity, sunAngle, timeOfDay });
  }, [enabled, intensity, sunAngle, timeOfDay]);

  return <div ref={hostRef} className="absolute inset-0 pointer-events-none" />;
};
