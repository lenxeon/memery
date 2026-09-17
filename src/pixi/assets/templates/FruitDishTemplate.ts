/**
 * @file FruitDishTemplate.ts
 * @description 供果盘纯 SVG 模板生成器（Pure TypeScript）。
 * 组合羊脂白玉描金高足花口供盘与 18 品类写实水果矢量，内嵌隐蔽式几何水印。
 */
import { FruitType } from '../../../types';
import { getGeometricWatermark } from '../security/Watermark';
import { FRUIT_REGISTRY } from './fruits/registry';

export function getFruitDishSvg(fruitType: FruitType): string {
  const fruitModule = FRUIT_REGISTRY[fruitType] || FRUIT_REGISTRY.apples;
  const watermarkSvg = getGeometricWatermark();
  const fruitDefs = fruitModule.renderDefs();
  const fruitContent = fruitModule.renderContent();

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 92" width="108" height="92">
  <defs>
    <linearGradient id="jadePorcelainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#cfc8bb" />
      <stop offset="18%" stop-color="#e8e2d5" />
      <stop offset="45%" stop-color="#faf7f0" />
      <stop offset="70%" stop-color="#ffffff" />
      <stop offset="85%" stop-color="#ede7dc" />
      <stop offset="100%" stop-color="#bfb7a7" />
    </linearGradient>
    <radialGradient id="dishBasinCavity" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#dcd5c7" />
      <stop offset="65%" stop-color="#eee9de" />
      <stop offset="90%" stop-color="#f7f4ec" />
      <stop offset="100%" stop-color="#e3dcce" />
    </radialGradient>
    <linearGradient id="pedestalStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#b5ac9d" />
      <stop offset="25%" stop-color="#dfd8cb" />
      <stop offset="55%" stop-color="#fdfbf7" />
      <stop offset="80%" stop-color="#dcd5c7" />
      <stop offset="100%" stop-color="#a39988" />
    </linearGradient>
    <linearGradient id="goldRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#b48332" />
      <stop offset="30%" stop-color="#f7dc8c" />
      <stop offset="60%" stop-color="#ffd875" />
      <stop offset="85%" stop-color="#e5ba55" />
      <stop offset="100%" stop-color="#9a6e24" />
    </linearGradient>
    <radialGradient id="fruitBasinShadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1a1208" stop-opacity="0.45" />
      <stop offset="50%" stop-color="#3d2a17" stop-opacity="0.25" />
      <stop offset="80%" stop-color="#634c32" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
    ${fruitDefs}
  </defs>

  ${watermarkSvg}

  <!-- 层级 1：案面接触投影 -->
  <ellipse cx="54" cy="85" rx="44" ry="5.5" fill="#140c05" opacity="0.36" />
  <ellipse cx="54" cy="85" rx="30" ry="3.8" fill="#000000" opacity="0.25" />

  <!-- 层级 2：高足底座 -->
  <g id="dishFootGroup">
    <ellipse cx="54" cy="82" rx="23" ry="4.5" fill="#a89f90" />
    <ellipse cx="54" cy="81" rx="22.5" ry="4" fill="url(#pedestalStemGrad)" stroke="#c4bcad" stroke-width="0.5" />
    <ellipse cx="54" cy="80.6" rx="21" ry="3.3" fill="none" stroke="url(#goldRimGrad)" stroke-width="0.8" opacity="0.85" />
    <path d="M 44 65 Q 49 73 42 80 L 66 80 Q 59 73 64 65 Z" fill="url(#pedestalStemGrad)" stroke="#b8b0a1" stroke-width="0.6" />
    <path d="M 46.5 72.5 Q 54 74 61.5 72.5" stroke="url(#goldRimGrad)" stroke-width="1.2" fill="none" />
    <path d="M 46 73.2 Q 54 74.8 62 73.2" stroke="#ffffff" stroke-width="0.5" fill="none" opacity="0.8" />
  </g>

  <!-- 层级 3：玉盘外腹与盘内凹槽底托 -->
  <g id="dishBasinGroup">
    <path d="M 8 59 Q 54 74 100 59 L 98 62 Q 54 77 10 62 Z" fill="#b5ac9d" />
    <ellipse cx="54" cy="58.5" rx="46.5" ry="13" fill="url(#jadePorcelainGrad)" stroke="#b8b0a0" stroke-width="0.8" />
    <ellipse cx="54" cy="57.5" rx="43" ry="10.8" fill="url(#dishBasinCavity)" stroke="#d2c9bc" stroke-width="0.6" />
    <ellipse cx="54" cy="58" rx="35" ry="8" fill="#e2dad0" opacity="0.7" />
    <ellipse cx="54" cy="57" rx="36" ry="7.5" fill="url(#fruitBasinShadow)" />
  </g>

  <!-- 层级 4：水果堆叠金字塔内容插槽 -->
  <g id="fruitContentLayer" transform="translate(2, 0)">
    ${fruitContent}
  </g>

  <!-- 层级 5：前沿浅盘微翘包边与描金流光 -->
  <g id="frontRimLip" pointer-events="none">
    <path d="M 7.5 58.5 C 16 68.5, 92 68.5, 100.5 58.5" fill="none" stroke="url(#goldRimGrad)" stroke-width="1.2" stroke-linecap="round" />
    <path d="M 12 59.5 C 24 67.5, 84 67.5, 96 59.5" fill="none" stroke="#ffffff" stroke-width="0.8" stroke-linecap="round" opacity="0.8" />
    <path d="M 40 65.2 Q 54 66.2 68 65.2" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity="0.95" />
  </g>
</svg>
  `.trim();
}
