/**
 * @file VaseDefs.tsx
 * @description 花器全局共享 SVG 渐变与光影滤镜定义
 */
import React from 'react';

export const VaseDefs: React.FC = () => (
  <>
    {/* ── 1. 纯白哑光现代陶艺渐变 ── */}
    <linearGradient id="pureMatteWhiteGrad" x1="15%" y1="20%" x2="90%" y2="80%">
      <stop offset="0%" stopColor="#ffffff" />
      <stop offset="45%" stopColor="#faf7f2" />
      <stop offset="85%" stopColor="#ece4d8" />
      <stop offset="100%" stopColor="#dfd5c5" />
    </linearGradient>

    {/* ── 2. 奶油白陶温润柔光渐变 ── */}
    <linearGradient id="creamWavePorcelainGrad" x1="20%" y1="15%" x2="85%" y2="85%">
      <stop offset="0%" stopColor="#ffffff" />
      <stop offset="35%" stopColor="#fdfaf3" />
      <stop offset="70%" stopColor="#f4ebda" />
      <stop offset="92%" stopColor="#e3d4bd" />
      <stop offset="100%" stopColor="#d1be9f" />
    </linearGradient>

    {/* ── 3. 莫兰迪落樱粉优雅柔和渐变 ── */}
    <linearGradient id="blushRoseWaveGrad" x1="20%" y1="15%" x2="85%" y2="85%">
      <stop offset="0%" stopColor="#fff5f5" />
      <stop offset="30%" stopColor="#ffe4e6" />
      <stop offset="70%" stopColor="#fecdd3" />
      <stop offset="90%" stopColor="#f43f5e" stopOpacity="0.55" />
      <stop offset="100%" stopColor="#be123c" stopOpacity="0.4" />
    </linearGradient>

    {/* ── 4. 侘寂玄灰砂岩质朴粗陶渐变 ── */}
    <linearGradient id="chiseledStoneGrad" x1="15%" y1="15%" x2="85%" y2="85%">
      <stop offset="0%" stopColor="#52525b" />
      <stop offset="35%" stopColor="#3f3f46" />
      <stop offset="75%" stopColor="#27272a" />
      <stop offset="100%" stopColor="#18181b" />
    </linearGradient>

    {/* ── 5. 钻石晶体切面折光 A/B/C 组 ── */}
    <linearGradient id="crystalFacetA" x1="10%" y1="10%" x2="90%" y2="90%">
      <stop offset="0%" stopColor="#ffffff" />
      <stop offset="100%" stopColor="#f1eae0" />
    </linearGradient>
    <linearGradient id="crystalFacetB" x1="85%" y1="15%" x2="15%" y2="85%">
      <stop offset="0%" stopColor="#faf6ee" />
      <stop offset="100%" stopColor="#dfd2be" />
    </linearGradient>
    <linearGradient id="crystalFacetC" x1="10%" y1="85%" x2="90%" y2="15%">
      <stop offset="0%" stopColor="#cfbe9e" />
      <stop offset="100%" stopColor="#baab92" />
    </linearGradient>

    {/* ── 6. 海棠瓜棱温润蛋壳青白 ── */}
    <linearGradient id="melonLobedCeladonGrad" x1="15%" y1="20%" x2="85%" y2="80%">
      <stop offset="0%" stopColor="#f0fdf4" />
      <stop offset="35%" stopColor="#e7f8ee" />
      <stop offset="75%" stopColor="#c7edd5" />
      <stop offset="100%" stopColor="#9cd9b5" />
    </linearGradient>

    {/* ── 7. 手作泥捏翻边暖姜黄粗陶渐变 ── */}
    <linearGradient id="warmPinchedClayGrad" x1="18%" y1="12%" x2="88%" y2="88%">
      <stop offset="0%" stopColor="#fde047" stopOpacity="0.8" />
      <stop offset="15%" stopColor="#f59e0b" stopOpacity="0.9" />
      <stop offset="50%" stopColor="#d97706" />
      <stop offset="80%" stopColor="#b45309" />
      <stop offset="100%" stopColor="#78350f" />
    </linearGradient>

    {/* ── 8. 银曜珠光金属涡轮渐变 ── */}
    <linearGradient id="silverPearlTurbineGrad" x1="15%" y1="15%" x2="85%" y2="85%">
      <stop offset="0%" stopColor="#ffffff" />
      <stop offset="25%" stopColor="#f1f5f9" />
      <stop offset="50%" stopColor="#cbd5e1" />
      <stop offset="75%" stopColor="#94a3b8" />
      <stop offset="100%" stopColor="#475569" />
    </linearGradient>
    <linearGradient id="pearlBladeHighGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
      <stop offset="50%" stopColor="#f8fafc" stopOpacity="0.85" />
      <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.2" />
    </linearGradient>

    {/* ── 9. 莫兰迪冰蓝纯瓷渐变 ── */}
    <linearGradient id="morandiIceBlueGrad" x1="20%" y1="15%" x2="85%" y2="85%">
      <stop offset="0%" stopColor="#e0f2fe" />
      <stop offset="35%" stopColor="#bae6fd" />
      <stop offset="70%" stopColor="#38bdf8" />
      <stop offset="90%" stopColor="#0284c7" />
      <stop offset="100%" stopColor="#0369a1" />
    </linearGradient>

    {/* ── 10. 天青釉流沙粗砂岩渐变 ── */}
    <linearGradient id="skyBlueToSandGrad" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stopColor="#e0f2fe" />
      <stop offset="30%" stopColor="#bae6fd" />
      <stop offset="58%" stopColor="#7dd3fc" />
      <stop offset="68%" stopColor="#d4c3aa" />
      <stop offset="85%" stopColor="#bfa588" />
      <stop offset="100%" stopColor="#8c7053" />
    </linearGradient>
  </>
);
