/**
 * @file SvgToTexture.ts
 * @description 将高保真 SVG 矢量字符串在离屏光栅化为 PixiJS 超采样 GPU 纹理。
 * 保留所有的多层径向渐变、阴影、花瓣细节，保证 100% 极致精美与清晰度。
 * 具备超时回退与内存缓存，确保绝不阻塞渲染管线。
 */
import { Texture } from 'pixi.js';

interface TextureCacheEntry {
  texture: Texture;
  width: number;
  height: number;
}

const textureCache = new Map<string, TextureCacheEntry>();

function createFallbackTexture(width: number, height: number, color: string = 'rgba(0,0,0,0)'): Texture {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  const ctx = canvas.getContext('2d');
  if (ctx && color !== 'rgba(0,0,0,0)') {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  return Texture.from(canvas);
}

/**
 * 同步检查是否已有缓存
 */
export function getCachedTexture(cacheKey: string): Texture | null {
  const entry = textureCache.get(cacheKey);
  return entry ? entry.texture : null;
}

/**
 * 将 SVG 字符串转为高分辨率 PixiJS 纹理
 * @param postProcess 光栅化完成、生成纹理之前的画布后处理（用于叠加程序化材质）
 */
export async function rasterizeSvgToTexture(
  cacheKey: string,
  svgString: string,
  width: number,
  height: number,
  scale: number = 2.0,
  postProcess?: (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => void
): Promise<Texture> {
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!.texture;
  }

  return new Promise((resolve) => {
    // 8000ms 超时保护，避免复杂矢量首帧光栅化被异常阻断
    const timer = setTimeout(() => {
      console.warn(`Rasterize SVG timeout for key: ${cacheKey}, using temporary fallback`);
      const fallback = createFallbackTexture(width, height);
      // 绝不将 fallback 写入永久缓存，避免后续永远加载不出真纹理
      resolve(fallback);
    }, 8000);

    // 确保包含 W3C SVG 命名空间，否则浏览器独立 Image 解析会直接报错
    let sanitizedSvg = svgString;
    if (!sanitizedSvg.includes('xmlns=')) {
      sanitizedSvg = sanitizedSvg.replace(/<svg\b([^>]*)>/, '<svg xmlns="http://www.w3.org/2000/svg" $1>');
    }

    // 自动将 JSX 驼峰属性转换为标准 W3C SVG 连字符属性，彻底防止渐变丢失或变黑
    sanitizedSvg = sanitizedSvg
      .replace(/stopColor=/g, 'stop-color=')
      .replace(/stopOpacity=/g, 'stop-opacity=')
      .replace(/strokeWidth=/g, 'stroke-width=')
      .replace(/strokeLinecap=/g, 'stroke-linecap=')
      .replace(/strokeLinejoin=/g, 'stroke-linejoin=')
      .replace(/strokeDasharray=/g, 'stroke-dasharray=')
      .replace(/strokeOpacity=/g, 'stroke-opacity=')
      .replace(/fillOpacity=/g, 'fill-opacity=')
      .replace(/fillRule=/g, 'fill-rule=')
      .replace(/clipRule=/g, 'clip-rule=')
      .replace(/className="[^"]*"/g, '');

    // 剥离模板由 TSX 迁移时残留的 JSX 注释块 {/* ... */}：
    // 它们在 XML 中既可能被当作可见文本渲染，也可能因注释内含 & 直接导致解析失败
    sanitizedSvg = sanitizedSvg.replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, '');
    // 转义未成实体的裸 &（XML 实体引用必须是 &name; 形式，否则解析直接报错）
    sanitizedSvg = sanitizedSvg.replace(
      /&(?!(?:#\d+|#x[0-9a-fA-F]+|amp|lt|gt|quot|apos);)/g,
      '&amp;'
    );

    const blob = new Blob([sanitizedSvg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.src = url;

    img.onload = () => {
      clearTimeout(timer);
      URL.revokeObjectURL(url);
      try {
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(width * scale);
        canvas.height = Math.round(height * scale);
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          const fallback = createFallbackTexture(width, height);
          resolve(fallback);
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // 材质后处理（程序化贴图叠加）：失败也不应让整面墙消失
        if (postProcess) {
          try {
            postProcess(ctx, canvas.width, canvas.height);
          } catch (err) {
            console.warn('Error applying texture post-process:', err);
          }
        }

        const texture = Texture.from(canvas);
        textureCache.set(cacheKey, { texture, width, height });
        resolve(texture);
      } catch (err) {
        console.error('Error drawing SVG to canvas:', err);
        const fallback = createFallbackTexture(width, height);
        resolve(fallback);
      }
    };

    img.onerror = (err) => {
      clearTimeout(timer);
      URL.revokeObjectURL(url);
      console.error(`Failed to rasterize SVG for key: ${cacheKey}`, err);
      if (import.meta.env?.DEV) {
        console.error('Offending SVG head:', sanitizedSvg.slice(0, 400));
      }
      const fallback = createFallbackTexture(width, height);
      resolve(fallback);
    };
  });
}

