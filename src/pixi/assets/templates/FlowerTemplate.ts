/**
 * @file FlowerTemplate.ts
 * @description 鲜花与花瓶纯 SVG 模板生成器（Pure TypeScript）。
 * 彻底消除 React 依赖与 renderToStaticMarkup，支持极速字符串拼接生成花瓶与鲜花组合矢量图。
 * 内嵌微几何数字资产隐写签名。
 */
import { FlowerType } from '../../../types';
import { getGeometricWatermark } from '../security/Watermark';
import { FLOWER_REGISTRY } from './flowers/registry';
import {
  getVaseDefsSvg,
  getVaseItem,
  renderVaseMouthBack,
  renderVaseBody,
  VaseStyle,
} from './flowers/vases';
import { getVaseMouthAperture, getVaseSpreadFactor } from './flowers/types';

export interface VaseFlowerSvgOptions {
  flowerType?: FlowerType | 'none';
  vaseStyle?: VaseStyle;
  isRight?: boolean;
  health?: number;
}

/**
 * 获取完整插花花瓶原生 SVG 字符串
 */
export function getVaseFlowerSvg(options: VaseFlowerSvgOptions = {}): string {
  const {
    flowerType = 'peonies',
    isRight = false,
    vaseStyle = isRight ? 'painted_iris' : 'warm_white_plain',
    health = 1.0,
  } = options;

  const rawHealth = Math.round(health * 50) / 50;
  const steppedDry = Math.round(Math.max(0, Math.min(1.0, (0.75 - rawHealth) / 0.7)) * 50) / 50;
  const isFaded = rawHealth <= 0.05;

  const hasFlower = flowerType && flowerType !== 'none';
  const flowerModule = hasFlower ? (FLOWER_REGISTRY[flowerType as FlowerType] || FLOWER_REGISTRY.peonies) : null;
  const mouthAperture = getVaseMouthAperture(vaseStyle);
  const spreadFactor = getVaseSpreadFactor(vaseStyle);

  const watermarkSvg = getGeometricWatermark();
  const defsSvg = getVaseDefsSvg();
  const mouthBackSvg = renderVaseMouthBack(vaseStyle);
  const vaseBodySvg = renderVaseBody(vaseStyle);

  const flowerSvg = flowerModule
    ? flowerModule.renderSvg({
        health: rawHealth,
        dryFactor: steppedDry,
        isFaded,
        vaseStyle,
        mouthAperture,
        spreadFactor,
      })
    : '';

  const groupTransform = isRight ? 'transform="translate(150, 0) scale(-1, 1)"' : '';

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -70 250 280" width="250" height="280">
  <defs>
    ${defsSvg}
  </defs>

  ${watermarkSvg}

  <!-- 案面阴影 -->
  <ellipse cx="75" cy="193" rx="26" ry="6" fill="#140d07" opacity="0.4" />

  <g ${groupTransform}>
    <g id="vaseMouthBack">
      ${mouthBackSvg}
    </g>
    ${flowerSvg ? `<g id="flowerMain">${flowerSvg}</g>` : ''}
    <g id="vaseBody">
      ${vaseBodySvg}
    </g>
  </g>
</svg>
  `.trim();
}

/**
 * 获取微缩鲜花单独预览 SVG（用于 UI 弹窗与导览选单）
 */
export function getFlowerOnlyPreviewSvg(flowerType: FlowerType): string {
  const flowerModule = FLOWER_REGISTRY[flowerType] || FLOWER_REGISTRY.peonies;
  const flowerSvg = flowerModule.renderSvg({
    health: 1.0,
    dryFactor: 0,
    isFaded: false,
  });

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 5 130 135" width="100%" height="100%" class="w-full h-full overflow-visible drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
  ${flowerSvg}
</svg>
  `.trim();
}

/**
 * 获取花器单独预览 SVG（不含插花，用于花器形制选单真实预览器型）。
 * 视窗按器型声明的瓶口中心/口径/器高收紧，避免瓶身在卡片中过小。
 */
export function getVaseOnlyPreviewSvg(vaseStyle: VaseStyle = 'ribbed_fluted_white'): string {
  const item = getVaseItem(vaseStyle);
  const watermarkSvg = getGeometricWatermark();
  const defsSvg = getVaseDefsSvg();
  const mouthBackSvg = renderVaseMouthBack(vaseStyle);
  const vaseBodySvg = renderVaseBody(vaseStyle);

  const centerX = item.mouthCenter?.x ?? 75;
  const top = (item.mouthCenter?.y ?? 108) - 8;
  const viewWidth = Math.max((item.mouthWidth ?? 24) * 2.8, 62);
  const viewHeight = (item.vaseHeight ?? 90) + 24;

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${centerX - viewWidth / 2} ${top} ${viewWidth} ${viewHeight}" width="100%" height="100%" class="w-full h-full overflow-visible drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
  <defs>
    ${defsSvg}
  </defs>

  ${watermarkSvg}

  <!-- 案面阴影 -->
  <ellipse cx="75" cy="193" rx="26" ry="6" fill="#140d07" opacity="0.4" />

  <g id="vaseMouthBack">
    ${mouthBackSvg}
  </g>
  <g id="vaseBody">
    ${vaseBodySvg}
  </g>
</svg>
  `.trim();
}
