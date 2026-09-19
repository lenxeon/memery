/**
 * @file WallView.tsx
 * @description 背景墙场景元素的 React 薄包装（临时层）。
 * 仅负责挂载渲染域的 WallScene 并同步参数，不含任何场景逻辑。
 */
import React, { useEffect, useRef } from 'react';
import { WallScene } from '../../../pixi';
import type { LightingSettings, WallBackgroundStyle } from '../../../types';

export interface WallViewProps {
  lighting: LightingSettings;
  wallStyle?: WallBackgroundStyle;
}

export const WallView: React.FC<WallViewProps> = ({
  lighting,
  wallStyle = 'classic_dawn' as WallBackgroundStyle,
}) => {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<WallScene | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const scene = new WallScene({ lighting, wallStyle });
    sceneRef.current = scene;
    scene.mount(host);
    return () => {
      scene.destroy();
      sceneRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sceneRef.current?.setOptions({ lighting, wallStyle });
  }, [lighting, wallStyle]);

  return <div ref={hostRef} className="absolute inset-0 pointer-events-none" />;
};
