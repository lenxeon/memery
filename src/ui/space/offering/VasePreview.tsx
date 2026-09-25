/**
 * @file VasePreview.tsx
 * @description 花器（花瓶）小样微缩展示组件（UI 层）。
 * 与 FlowerPreview 同源：接收纯 SVG 模板字符串直接渲染，
 * 用于花器形制选单中「真实预览」器型（取代原先的 emoji 占位）。
 */
import React from 'react';
import { VaseStyle, getVaseOnlyPreviewSvg } from '../../../pixi';

export interface VasePreviewProps {
  vaseStyle: VaseStyle;
  size?: number | string;
  className?: string;
  showHalo?: boolean;
}

export const VasePreview: React.FC<VasePreviewProps> = ({
  vaseStyle,
  size = 40,
  className = '',
  showHalo = false,
}) => {
  const svgMarkup = getVaseOnlyPreviewSvg(vaseStyle);

  return (
    <div
      className={`relative flex items-end justify-center shrink-0 select-none pointer-events-none ${
        showHalo
          ? 'rounded-2xl bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 border border-amber-400/40 shadow-[0_0_12px_rgba(245,158,11,0.18)]'
          : ''
      } ${className}`}
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
};
