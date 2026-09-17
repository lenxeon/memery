/**
 * @file FlowerPreview.tsx
 * @description 供花小样微缩展示组件，将真实 SVG 花卉渲染为微缩图，用于菜单、按钮、弹窗等直观导览。
 */
import React from 'react';
import { FlowerType } from '../../../types';
import { FLOWER_REGISTRY } from './registry';
import { ProtectedCanvasFlora } from './ProtectedCanvasFlora';

export interface FlowerPreviewProps {
  flowerType: FlowerType;
  size?: number | string;
  className?: string;
  showHalo?: boolean;
}

export const FlowerPreview: React.FC<FlowerPreviewProps> = ({
  flowerType,
  size = 40,
  className = '',
  showHalo = false,
}) => {
  const meta = FLOWER_REGISTRY[flowerType] || FLOWER_REGISTRY.peonies;
  const FlowerComp = meta.Component;

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 select-none pointer-events-none ${
        showHalo
          ? 'rounded-2xl bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 border border-amber-400/40 shadow-[0_0_12px_rgba(245,158,11,0.18)]'
          : ''
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="10 5 130 135"
        className="w-full h-full overflow-visible drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
      >
        <ProtectedCanvasFlora
          boundX={10}
          boundY={5}
          boundWidth={130}
          boundHeight={135}
          viewBox="10 5 130 135"
        >
          <FlowerComp health={1.0} dryFactor={0} isFaded={false} />
        </ProtectedCanvasFlora>
      </svg>
    </div>
  );
};
