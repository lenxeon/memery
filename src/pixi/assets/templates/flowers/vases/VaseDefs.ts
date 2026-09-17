/**
 * @file VaseDefs.ts
 * @description 花器全局共享 SVG 渐变与光影滤镜定义（纯 TypeScript 字符串模板）。
 */

export const getVaseDefsSvg = (): string => `
  <!-- 1. 纯白哑光现代陶艺渐变 -->
  <linearGradient id="pureMatteWhiteGrad" x1="15%" y1="20%" x2="90%" y2="80%">
    <stop offset="0%" stop-color="#ffffff" />
    <stop offset="45%" stop-color="#faf7f2" />
    <stop offset="85%" stop-color="#ece4d8" />
    <stop offset="100%" stop-color="#dfd5c5" />
  </linearGradient>

  <!-- 2. 奶油白陶温润柔光渐变 -->
  <linearGradient id="creamWavePorcelainGrad" x1="20%" y1="15%" x2="85%" y2="85%">
    <stop offset="0%" stop-color="#ffffff" />
    <stop offset="35%" stop-color="#fdfaf3" />
    <stop offset="70%" stop-color="#f4ebda" />
    <stop offset="92%" stop-color="#e3d4bd" />
    <stop offset="100%" stop-color="#d1be9f" />
  </linearGradient>

  <!-- 3. 莫兰迪落樱粉优雅柔和渐变 -->
  <linearGradient id="blushRoseWaveGrad" x1="20%" y1="15%" x2="85%" y2="85%">
    <stop offset="0%" stop-color="#fff5f5" />
    <stop offset="30%" stop-color="#ffe4e6" />
    <stop offset="70%" stop-color="#fecdd3" />
    <stop offset="90%" stop-color="#f43f5e" stop-opacity="0.55" />
    <stop offset="100%" stop-color="#be123c" stop-opacity="0.4" />
  </linearGradient>

  <!-- 4. 侘寂玄灰砂岩质朴粗陶渐变 -->
  <linearGradient id="chiseledStoneGrad" x1="15%" y1="15%" x2="85%" y2="85%">
    <stop offset="0%" stop-color="#52525b" />
    <stop offset="35%" stop-color="#3f3f46" />
    <stop offset="75%" stop-color="#27272a" />
    <stop offset="100%" stop-color="#18181b" />
  </linearGradient>

  <!-- 5. 钻石晶体切面折光 A/B/C 组 -->
  <linearGradient id="crystalFacetA" x1="10%" y1="10%" x2="90%" y2="90%">
    <stop offset="0%" stop-color="#ffffff" />
    <stop offset="100%" stop-color="#f1eae0" />
  </linearGradient>
  <linearGradient id="crystalFacetB" x1="85%" y1="15%" x2="15%" y2="85%">
    <stop offset="0%" stop-color="#faf6ee" />
    <stop offset="100%" stop-color="#dfd2be" />
  </linearGradient>
  <linearGradient id="crystalFacetC" x1="10%" y1="85%" x2="90%" y2="15%">
    <stop offset="0%" stop-color="#cfbe9e" />
    <stop offset="100%" stop-color="#baab92" />
  </linearGradient>

  <!-- 6. 海棠瓜棱温润蛋壳青白 -->
  <linearGradient id="melonLobedCeladonGrad" x1="15%" y1="20%" x2="85%" y2="80%">
    <stop offset="0%" stop-color="#f0fdf4" />
    <stop offset="35%" stop-color="#e7f8ee" />
    <stop offset="75%" stop-color="#c7edd5" />
    <stop offset="100%" stop-color="#9cd9b5" />
  </linearGradient>

  <!-- 7. 手作泥捏翻边暖姜黄粗陶渐变 -->
  <linearGradient id="warmPinchedClayGrad" x1="18%" y1="12%" x2="88%" y2="88%">
    <stop offset="0%" stop-color="#fde047" stop-opacity="0.8" />
    <stop offset="15%" stop-color="#f59e0b" stop-opacity="0.9" />
    <stop offset="50%" stop-color="#d97706" />
    <stop offset="80%" stop-color="#b45309" />
    <stop offset="100%" stop-color="#78350f" />
  </linearGradient>

  <!-- 8. 银曜珠光金属涡轮渐变 -->
  <linearGradient id="silverPearlTurbineGrad" x1="15%" y1="15%" x2="85%" y2="85%">
    <stop offset="0%" stop-color="#ffffff" />
    <stop offset="25%" stop-color="#f1f5f9" />
    <stop offset="50%" stop-color="#cbd5e1" />
    <stop offset="75%" stop-color="#94a3b8" />
    <stop offset="100%" stop-color="#475569" />
  </linearGradient>
  <linearGradient id="pearlBladeHighGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
    <stop offset="50%" stop-color="#f8fafc" stop-opacity="0.85" />
    <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.2" />
  </linearGradient>

  <!-- 9. 莫兰迪冰蓝纯瓷渐变 -->
  <linearGradient id="morandiIceBlueGrad" x1="20%" y1="15%" x2="85%" y2="85%">
    <stop offset="0%" stop-color="#e0f2fe" />
    <stop offset="35%" stop-color="#bae6fd" />
    <stop offset="70%" stop-color="#38bdf8" />
    <stop offset="90%" stop-color="#0284c7" />
    <stop offset="100%" stop-color="#0369a1" />
  </linearGradient>

  <!-- 10. 天青釉流沙粗砂岩渐变 -->
  <linearGradient id="skyBlueToSandGrad" x1="50%" y1="0%" x2="50%" y2="100%">
    <stop offset="0%" stop-color="#e0f2fe" />
    <stop offset="30%" stop-color="#bae6fd" />
    <stop offset="58%" stop-color="#7dd3fc" />
    <stop offset="68%" stop-color="#d4c3aa" />
    <stop offset="85%" stop-color="#bfa588" />
    <stop offset="100%" stop-color="#8c7053" />
  </linearGradient>
`.trim();
