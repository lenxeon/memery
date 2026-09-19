/**
 * @file FloorView.tsx
 * @description 地坪场景元素的 React 薄包装（临时层）。
 * 仅负责挂载渲染域的 FloorScene 并同步参数，不含任何场景逻辑。
 */
import React, { useEffect, useRef } from 'react';
import { FloorScene } from '../../../pixi';
import type { FloorStyle, LightingSettings } from '../../../types';

export interface FloorViewProps {
  lighting: LightingSettings;
  floorStyle?: FloorStyle;
}

export const FloorView: React.FC<FloorViewProps> = ({
  lighting,
  floorStyle = 'hinoki_wood' as FloorStyle,
}) => {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<FloorScene | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const scene = new FloorScene({ lighting, floorStyle });
    sceneRef.current = scene;
    scene.mount(host);
    return () => {
      scene.destroy();
      sceneRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sceneRef.current?.setOptions({ lighting, floorStyle });
  }, [lighting, floorStyle]);

  return <div ref={hostRef} className="absolute inset-0 pointer-events-none" />;
};
