/**
 * @file FlowerPreview.tsx
 * @description 供花小样微缩展示组件（UI 层）。
 * 接收纯 SVG 模板字符串直接渲染，彻底剥离 Pixi 引擎与 React DOM 冗余转换。
 */
import React from 'react';
import { FlowerType } from '../../types';
import { getFlowerOnlyPreviewSvg } from '../../pixi';

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
  const svgMarkup = getFlowerOnlyPreviewSvg(flowerType);

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 select-none pointer-events-none ${
        showHalo
          ? 'rounded-2xl bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 border border-amber-400/40 shadow-[0_0_12px_rgba(245,158,11,0.18)]'
          : ''
      } ${className}`}
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
};
