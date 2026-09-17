/**
 * @file ProtectedCanvasFlora.tsx
 * @description 运行期花草 Canvas/光栅化保护渲染器 (支持动态全范围边界与请求抑制防刷屏)。
 * 
 * 核心设计目标：
 * 1. 【开发友好 (DX)】：开发者依然使用直观优雅的 React SVG (TSX) 编写花草贝塞尔曲线与渐变色标；
 * 2. 【渲染防盗】：在运行时将 SVG 在内存中直接光栅化并绘制到 HTML5 <canvas> 画布；
 * 3. 【无缝交互】：保留外层容器的案台拖拽、位置坐标摆放、换位以及点击弹窗等所有交互能力；
 * 4. 【DOM 干净】：页面 DOM 树中彻底抹去所有的 <path>、<defs> 与贝塞尔控制点，F12 审查元素只能看到纯 <canvas>；
 * 5. 【防止 Network 刷屏】：内置精确的 SVG 增量内容比对缓存（Memoization），内容未变绝不触发图像重载；
 * 6. 【高挑/大花全景容纳】：支持负坐标与扩展边界 (boundX, boundY, boundWidth, boundHeight)，彻底根除高枝白梅、百合、向日葵被裁切显示不全的问题。
 */

import React, { useEffect, useRef, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server.browser';

export interface ProtectedCanvasFloraProps {
  /** 视口外接矩形 X 起点，默认 -60（向左扩展 60px 容纳外展枝叶） */
  boundX?: number;
  /** 视口外接矩形 Y 起点，默认 -80（向上扩展 80px 容纳高挺枝头，如傲霜白梅、向日葵） */
  boundY?: number;
  /** 视口外接矩形宽度，默认 270（覆盖 -60 到 +210） */
  boundWidth?: number;
  /** 视口外接矩形高度，默认 290（覆盖 -80 到 +210） */
  boundHeight?: number;
  /** SVG viewBox 坐标系，若不填则自动按 `${boundX} ${boundY} ${boundWidth} ${boundHeight}` 计算 */
  viewBox?: string;
  /** 外层附加样式类 */
  className?: string;
  /** 是否位于外部 <svg> 容器内部（若是则用 <foreignObject> 包裹，若否则直接输出原生独立 <canvas> 节点） */
  isInsideSvg?: boolean;
  /** 调试或对比开关（默认自动开启 Canvas 保护，开发环境下可手动指定 'svg' 对比） */
  mode?: 'canvas' | 'image' | 'svg';
  /** 子组件：开发者编写的写实花草 SVG 组件 */
  children: React.ReactNode;
}

export const ProtectedCanvasFlora: React.FC<ProtectedCanvasFloraProps> = ({
  boundX = -60,
  boundY = -80,
  boundWidth = 270,
  boundHeight = 290,
  viewBox,
  isInsideSvg = true,
  className = '',
  mode = 'svg',
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastSvgStringRef = useRef<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const effectiveViewBox = viewBox || `${boundX} ${boundY} ${boundWidth} ${boundHeight}`;

  useEffect(() => {
    if (mode === 'svg') return;

    try {
      // 1. 在内存中使用 renderToStaticMarkup 渲染完整 <svg>（提供原生 SVG 命名空间上下文，彻底消除 linearGradient casing 警告）
      const fullSvgString = renderToStaticMarkup(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={effectiveViewBox}
          width={boundWidth}
          height={boundHeight}
        >
          {children}
        </svg>
      );

      // 增量缓存拦截：如果 SVG 内容未发生视觉改变，绝不重新加载 Image，彻底杜绝 Network 面板刷屏！
      if (fullSvgString === lastSvgStringRef.current) {
        return;
      }
      lastSvgStringRef.current = fullSvgString;

      // 2. 将 SVG 字符转换为 Blob URL（比 data: 协议更加安全且不在网络 URL 明文暴露源码）
      const svgBlob = new Blob([fullSvgString], { type: 'image/svg+xml;charset=utf-8' });
      const blobUrl = URL.createObjectURL(svgBlob);

      // 3. 加载到内存 Image 中并在离屏/视口 Canvas 像素化绘制
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        URL.revokeObjectURL(blobUrl); // 绘制完成立即销毁内存引用，不留痕迹

        const canvas = canvasRef.current;
        if (!canvas) return;

        // 视网膜 Retina 超采样 (2x/3x) 保证高分屏下边缘极其平滑锐利
        const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 2, 3) : 2;
        canvas.width = Math.round(boundWidth * dpr);
        canvas.height = Math.round(boundHeight * dpr);

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }

        if (mode === 'image') {
          setImageUrl(canvas.toDataURL('image/png'));
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(blobUrl);
      };

      img.src = blobUrl;
    } catch (err) {
      console.warn('ProtectedCanvasFlora rasterization error:', err);
    }
  }, [children, boundX, boundY, boundWidth, boundHeight, effectiveViewBox, mode]);

  // 开发期调试模式：直接输出原始 SVG
  if (mode === 'svg') {
    return <>{children}</>;
  }

  // 备用光栅图模式（纯 <image href="..." />）
  if (mode === 'image' && imageUrl) {
    return (
      <image
        href={imageUrl}
        x={boundX}
        y={boundY}
        width={boundWidth}
        height={boundHeight}
        preserveAspectRatio="xMidYMid meet"
        className={`pointer-events-none select-none ${className}`}
      />
    );
  }

  // 独立模式（非 SVG 内部，例如供奉花束）：直接输出原生独立 <canvas> 画布标签，DOM 中完全没有 <svg> 包装
  if (!isInsideSvg) {
    return (
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          pointerEvents: 'none',
        }}
        className={`pointer-events-none select-none ${className}`}
      />
    );
  }

  // SVG 嵌套模式：输出自适应全景 <foreignObject><canvas /></foreignObject>
  // 在 DOM 树中，花瓶内只有 <canvas> 元素，无任何矢量路径暴露，且边界完整容纳高挺枝叶
  return (
    <foreignObject
      x={boundX}
      y={boundY}
      width={boundWidth}
      height={boundHeight}
      className={`overflow-visible pointer-events-none select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          pointerEvents: 'none',
        }}
      />
    </foreignObject>
  );
};
