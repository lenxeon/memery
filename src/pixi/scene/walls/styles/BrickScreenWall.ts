/**
 * @file BrickScreenWall.ts
 * @description 【古朴苍然】月亮门水墨远山千道金芒、斑驳竹影、落地宫灯与挺拔青竹背景墙（纯 TS 场景元素）。
 */
import { WallStyleProps, WallAmbiance } from '../types';
import { TimeOfDay } from '../../../../types';

/** 坐标格式化：避免长浮点污染 SVG 字符串 */
const n2 = (v: number): string => v.toFixed(2);

export const getBrickScreenAmbiance = (timeOfDay: TimeOfDay, masterOn: boolean): WallAmbiance => {
  if (!masterOn) {
    return {
      halo: 'rgba(0, 0, 0, 0)',
      nicheBevel: '#1c1713',
      archBorder: '#27201a',
      archInner: '#171310',
      mullion: '#1e1914',
      sunOrb: 'transparent',
    };
  }

  return {
    halo:
      timeOfDay === 'night'
        ? 'rgba(215, 185, 140, 0.15)'
        : timeOfDay === 'sunset'
        ? 'rgba(240, 185, 120, 0.28)'
        : 'rgba(255, 242, 215, 0.45)',
    nicheBevel: timeOfDay === 'night' ? '#2c251e' : '#cfc5b4',
    archBorder: timeOfDay === 'night' ? '#3d342a' : '#b8ac99',
    archInner: timeOfDay === 'night' ? '#1f1b16' : '#fcfaf5',
    mullion: timeOfDay === 'night' ? '#383028' : '#a69986',
    sunOrb:
      'radial-gradient(circle, rgba(255, 253, 242, 0.98) 0%, rgba(254, 238, 185, 0.55) 35%, rgba(248, 215, 130, 0.18) 70%, transparent 100%)',
  };
};

/** 墙面斑驳竹影：竹节环箍坐标（三根竹影逐节偏移） */
const CULM_NODE_Y = [90, 180, 270, 360, 450];

/** 墙面斑驳竹影：柔和落影竹叶簇 */
const DAPPLED_LEAVES: { x: number; y: number; rot: number }[] = [
  { x: 95, y: 110, rot: 25 },
  { x: 120, y: 180, rot: 35 },
  { x: 160, y: 140, rot: -20 },
  { x: 180, y: 230, rot: 30 },
  { x: 195, y: 90, rot: 45 },
  { x: 230, y: 170, rot: 15 },
  { x: 245, y: 260, rot: -30 },
  { x: 140, y: 310, rot: 35 },
  { x: 210, y: 340, rot: 20 },
  { x: 150, y: 420, rot: -15 },
  { x: 260, y: 390, rot: 25 },
];

/** 青竹侧枝出叶点（工笔“个 / 介”字形） */
const BAMBOO_TWIGS: { x: number; y: number; rot: number; scale: number }[] = [
  { x: 105, y: 130, rot: -30, scale: 1 },
  { x: 125, y: 200, rot: -15, scale: 1.1 },
  { x: 95, y: 280, rot: -40, scale: 0.95 },
  { x: 180, y: 150, rot: -25, scale: 1.05 },
  { x: 205, y: 240, rot: -45, scale: 0.9 },
  { x: 150, y: 350, rot: -20, scale: 1.15 },
  { x: 110, y: 420, rot: -50, scale: 0.85 },
  { x: 190, y: 450, rot: -30, scale: 1 },
];

/** 青竹主竿节环高度 */
const BAMBOO_NODE_Y = [110, 220, 330, 440, 550];

/** 月门日轮放射金芒数量 */
const SUNBURST_COUNT = 180;

/**
 * BrickScreenEnvironment: 真实环境全景层（HTML 片段）
 * 还原设计稿图1：
 * 1. 左侧：从左上方倾斜洒落的百叶窗晨光光带与斑驳竹影
 * 2. 左侧下方：立于地面的中式实木纱绢落地宫灯（温润暖光）
 * 3. 右侧：立于壁前、苍翠挺拔的写意工笔青竹，并在墙面投下真实自然的柔和虚焦投影
 */
export const BrickScreenEnvironment = ({
  masterOn = true,
  sunlightIntensity,
  timeOfDay,
}: WallStyleProps): string => {
  const effectiveOpacity = masterOn ? Math.max(0.4, sunlightIntensity) : 0.45;
  const night = timeOfDay === 'night';

  // ── 1. 左上方斜向倾斜晨光光带 ──
  const lightBand =
    masterOn && !night
      ? `<div
          class="absolute -top-10 -left-10 w-[700px] h-[750px] pointer-events-none transition-opacity duration-700"
          style="background:repeating-linear-gradient(130deg, rgba(255, 252, 240, 0.18) 0px, rgba(255, 252, 240, 0.18) 45px, rgba(180, 160, 140, 0.04) 45px, rgba(180, 160, 140, 0.04) 110px);filter:blur(22px);opacity:${n2(
            effectiveOpacity * 0.95
          )};mix-blend-mode:soft-light"
        />`
      : '';

  // ── 2. 左侧墙面斑驳竹影：竹节环箍 ──
  const culmNodes = CULM_NODE_Y.map((y) => {
    const a = 40 + (580 - y) * 0.12;
    const b = 100 + (580 - y) * 0.14;
    const c = 170 + (580 - y) * 0.13;
    return `<line x1="${n2(a - 12)}" y1="${y}" x2="${n2(a + 16)}" y2="${y - 2}" stroke="#4f4030" stroke-width="4" />
            <line x1="${n2(b - 15)}" y1="${y + 12}" x2="${n2(b + 18)}" y2="${y + 10}" stroke="#4f4030" stroke-width="5" />
            <line x1="${n2(c - 12)}" y1="${y - 8}" x2="${n2(c + 14)}" y2="${y - 10}" stroke="#4f4030" stroke-width="4" />`;
  }).join('\n          ');

  // ── 2. 左侧墙面斑驳竹影：柔和落影竹叶簇 ──
  const dappledLeaves = DAPPLED_LEAVES.map(
    (c) => `<g transform="translate(${c.x}, ${c.y}) rotate(${c.rot})">
              <path d="M 0 0 C 24 16 58 14 86 0 C 58 -14 24 -16 0 0 Z" fill="#685643" />
              <path d="M 6 -12 C 30 -4 64 -8 92 -20 C 64 -32 30 -26 6 -12 Z" fill="#685643" />
              <path d="M 12 14 C 36 28 70 24 96 12 C 70 2 36 4 12 14 Z" fill="#685643" />
            </g>`
  ).join('\n          ');

  // ── 3. 左侧立式落地木雕宣纸宫灯：温润暖光辐射光晕 ──
  const lanternGlow = masterOn
    ? `<div
            class="absolute top-[28px] left-1/2 -translate-x-1/2 w-44 h-56 rounded-full pointer-events-none"
            style="background:${
              night
                ? 'radial-gradient(circle, rgba(254, 215, 130, 0.55) 0%, rgba(245, 158, 11, 0.22) 45%, transparent 75%)'
                : 'radial-gradient(circle, rgba(255, 235, 175, 0.45) 0%, rgba(251, 191, 36, 0.16) 48%, transparent 75%)'
            };filter:blur(12px)"
          />`
    : '';

  // ── 3. 宫灯内部发光暖烛核 ──
  const candleCore = masterOn
    ? `<circle cx="47.5" cy="72" r="16" fill="#ffffff" opacity="0.85" filter="blur(3px)" />`
    : '';

  // ── 4. 右侧竹影：细枝与叶簇投影 ──
  const bambooShadowLeaves = BAMBOO_TWIGS.map(
    (c) => `<g transform="translate(${c.x}, ${c.y}) rotate(${c.rot})">
                  <line x1="0" y1="0" x2="-35" y2="15" stroke="#685643" stroke-width="3" />
                  <path d="M -35 15 C -60 16 -100 2 -125 -14 C -95 -8 -60 2 -35 15 Z" fill="#685643" />
                  <path d="M -35 15 C -68 32 -110 28 -140 14 C -105 10 -65 6 -35 15 Z" fill="#685643" />
                  <path d="M -35 15 C -55 42 -95 50 -120 40 C -95 24 -60 18 -35 15 Z" fill="#685643" />
                </g>`
  ).join('\n                ');

  // ── 4. 右侧青竹：竹节环箍 ──
  const bambooNodes = BAMBOO_NODE_Y.map((y) => {
    const a = 90 + (620 - y) * 0.11;
    const b = 175 + (620 - y) * 0.09;
    return `<ellipse cx="${n2(a)}" cy="${y}" rx="10.5" ry="4" fill="#1e3818" stroke="#a3d47d" stroke-width="1.2" />
                  <line x1="${n2(a - 10)}" y1="${y}" x2="${n2(a + 10)}" y2="${y}" stroke="#c6e89a" stroke-width="0.8" opacity="0.8" />
                  <ellipse cx="${n2(b)}" cy="${y - 20}" rx="7.5" ry="3.2" fill="#1e3818" stroke="#a3d47d" stroke-width="1" />
                  <line x1="${n2(b - 7)}" y1="${y - 20}" x2="${n2(b + 7)}" y2="${y - 20}" stroke="#c6e89a" stroke-width="0.7" opacity="0.8" />`;
  }).join('\n                ');

  // ── 4. 右侧青竹：青翠修长竹叶簇 ──
  const bambooLeaves = BAMBOO_TWIGS.map(
    (c) => `<g transform="translate(${c.x}, ${c.y}) rotate(${c.rot}) scale(${c.scale})">
                  <line x1="0" y1="0" x2="-35" y2="15" stroke="url(#tenderTwigGrad)" stroke-width="2.2" stroke-linecap="round" />
                  <path d="M -35 15 C -60 16 -100 2 -125 -14 C -95 -8 -60 2 -35 15 Z" fill="url(#realLeafGrad)" stroke="#1e3e15" stroke-width="0.5" />
                  <path d="M -35 15 C -68 32 -110 28 -140 14 C -105 10 -65 6 -35 15 Z" fill="url(#realLeafGrad)" stroke="#1e3e15" stroke-width="0.5" />
                  <path d="M -35 15 C -55 42 -95 50 -120 40 C -95 24 -60 18 -35 15 Z" fill="url(#realLeafGrad)" stroke="#1e3e15" stroke-width="0.5" />
                </g>`
  ).join('\n                ');

  return `
    <div class="absolute inset-0 pointer-events-none z-0 overflow-hidden flex justify-center">
      <div class="relative w-full max-w-[1200px] h-full">
        ${lightBand}

        <!-- 左侧墙面斑驳竹影 -->
        <svg
          class="absolute -left-6 sm:left-4 top-4 w-[280px] sm:w-[360px] h-[580px] pointer-events-none transition-opacity duration-700"
          style="opacity:${n2(night ? 0.12 : 0.32 * effectiveOpacity)};filter:blur(4.5px);transform:rotate(-2deg)"
          viewBox="0 0 340 580"
        >
          <path d="M 40 580 Q 75 320 110 0" stroke="#685643" stroke-width="16" fill="none" stroke-linecap="round" />
          <path d="M 100 580 Q 145 300 185 0" stroke="#685643" stroke-width="20" fill="none" stroke-linecap="round" />
          <path d="M 170 580 Q 210 350 250 40" stroke="#685643" stroke-width="14" fill="none" stroke-linecap="round" />
          ${culmNodes}
          ${dappledLeaves}
        </svg>

        <!-- 左侧立式落地木雕宣纸宫灯 -->
        <div
          class="absolute left-[12px] sm:left-[55px] bottom-[140px] sm:bottom-[160px] w-[95px] h-[340px] flex flex-col items-center pointer-events-none transition-all duration-700 z-15"
          style="opacity:${n2(effectiveOpacity)}"
        >
          ${lanternGlow}
          <svg viewBox="0 0 95 340" class="w-full h-full drop-shadow-md">
            <defs>
              <radialGradient id="silkLampGlow" cx="45%" cy="48%" r="55%">
                <stop offset="0%" stop-color="#ffffff" />
                <stop offset="30%" stop-color="${masterOn ? '#fffbeb' : '#e6dfce'}" />
                <stop offset="68%" stop-color="${masterOn ? '#fed7aa' : '#cfc5b0'}" />
                <stop offset="100%" stop-color="${masterOn ? '#f59e0b' : '#a89d86'}" />
              </radialGradient>
              <linearGradient id="rosewoodFrame" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#2c170a" />
                <stop offset="35%" stop-color="#5a3317" />
                <stop offset="70%" stop-color="#6e3d19" />
                <stop offset="100%" stop-color="#251307" />
              </linearGradient>
            </defs>

            <circle cx="47.5" cy="14" r="5" fill="#caa262" stroke="#6b4a1b" stroke-width="1" />
            <path d="M 40 22 C 43 18 52 18 55 22 L 53 25 L 42 25 Z" fill="url(#rosewoodFrame)" />
            <ellipse cx="47.5" cy="27" rx="16" ry="5.5" fill="url(#rosewoodFrame)" stroke="#1a0d05" stroke-width="1.2" />
            <ellipse cx="47.5" cy="74" rx="31" ry="48" fill="url(#silkLampGlow)" stroke="#4a2a12" stroke-width="2.2" />
            <ellipse cx="47.5" cy="74" rx="17" ry="47.5" fill="none" stroke="#8a5c28" stroke-width="1.2" opacity="0.65" />
            <line x1="47.5" y1="26" x2="47.5" y2="122" stroke="#8a5c28" stroke-width="1.5" opacity="0.8" />
            ${candleCore}
            <ellipse cx="47.5" cy="122" rx="18" ry="6" fill="url(#rosewoodFrame)" stroke="#1a0d05" stroke-width="1.2" />
            <path d="M 36 126 Q 24 140 42 152 L 47.5 150 L 53 152 Q 71 140 59 126 Z" fill="url(#rosewoodFrame)" stroke="#1a0d05" stroke-width="1.2" />
            <rect x="44.5" y="148" width="6" height="150" fill="url(#rosewoodFrame)" stroke="#1a0d05" stroke-width="0.8" />
            <rect x="43" y="215" width="9" height="7" rx="1.5" fill="#caa262" stroke="#68461b" stroke-width="0.8" />
            <path d="M 33 296 L 62 296 L 70 326 L 25 326 Z" fill="url(#rosewoodFrame)" stroke="#1a0d05" stroke-width="1.5" />
            <rect x="18" y="324" width="59" height="8" rx="2.5" fill="#1f1006" />
            <rect x="14" y="331" width="67" height="3" rx="1.5" fill="#000000" opacity="0.4" />
          </svg>
        </div>

        <!-- 右侧立于壁前的挺拔工笔翠竹与柔和墙面投影 -->
        <div class="absolute -right-2 sm:right-3 top-6 sm:top-10 w-[240px] sm:w-[310px] h-[640px] pointer-events-none z-10">
          <svg viewBox="0 0 280 620" class="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="realBambooGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#1e3e1c" />
                <stop offset="30%" stop-color="#3d6c34" />
                <stop offset="65%" stop-color="#588d45" />
                <stop offset="90%" stop-color="#6ea855" />
                <stop offset="100%" stop-color="#254a20" />
              </linearGradient>
              <linearGradient id="realLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#7cb952" />
                <stop offset="45%" stop-color="#508332" />
                <stop offset="85%" stop-color="#325d20" />
                <stop offset="100%" stop-color="#1e3a13" />
              </linearGradient>
              <linearGradient id="tenderTwigGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#3a602c" />
                <stop offset="50%" stop-color="#679a48" />
                <stop offset="100%" stop-color="#2c4d1f" />
              </linearGradient>
            </defs>

            <!-- 竹子在浅米色墙壁上的柔和虚焦投影 -->
            <g transform="translate(-16, 18)" style="opacity:${n2(
              night ? 0.15 : 0.38 * effectiveOpacity
            )};filter:blur(5px)">
              <path d="M 90 620 Q 125 350 160 0" stroke="#685643" stroke-width="18" fill="none" stroke-linecap="round" />
              <path d="M 175 620 Q 200 380 230 40" stroke="#685643" stroke-width="13" fill="none" stroke-linecap="round" />
              ${bambooShadowLeaves}
            </g>

            <!-- 前景真实青竹实体 -->
            <g style="opacity:${n2(effectiveOpacity)}">
              <path d="M 90 620 Q 125 350 160 0" stroke="url(#realBambooGrad)" stroke-width="17" fill="none" stroke-linecap="round" />
              <path d="M 175 620 Q 200 380 230 40" stroke="url(#realBambooGrad)" stroke-width="12" fill="none" stroke-linecap="round" />
              ${bambooNodes}
              ${bambooLeaves}
            </g>
          </svg>
        </div>
      </div>
    </div>`;
};

/** 月洞门专属渐变与图案定义（SVG <defs> 片段） */
export const BrickScreenDefs = ({ timeOfDay }: { timeOfDay: TimeOfDay }): string => {
  const night = timeOfDay === 'night';

  return `
  <pattern id="chineseDiagonalLattice" width="14" height="14" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
    <rect width="14" height="14" fill="${night ? '#25201a' : '#faf7f0'}" />
    <line x1="0" y1="0" x2="0" y2="14" stroke="${night ? '#443b32' : '#baad9b'}" stroke-width="1.5" />
    <line x1="0" y1="0" x2="14" y2="0" stroke="${night ? '#443b32' : '#baad9b'}" stroke-width="1.5" />
  </pattern>

  <clipPath id="moonWindowClip">
    <circle cx="210" cy="190" r="142" />
  </clipPath>

  <linearGradient id="moonSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="${night ? '#1c202a' : '#ffffff'}" />
    <stop offset="50%" stop-color="${night ? '#161921' : '#fdfaf5'}" />
    <stop offset="85%" stop-color="${night ? '#12141a' : '#f5ebe0'}" />
    <stop offset="100%" stop-color="${night ? '#0b0c10' : '#ece0d0'}" />
  </linearGradient>

  <radialGradient id="sunCoreGrad" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#ffffff" />
    <stop offset="40%" stop-color="${night ? '#fff9e6' : '#fffef8'}" />
    <stop offset="75%" stop-color="${night ? '#fed7aa' : '#fef0c7'}" />
    <stop offset="100%" stop-color="${night ? '#f59e0b' : '#fde68a'}" stop-opacity="0.85" />
  </radialGradient>

  <radialGradient id="sunGlowAura" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="${night ? '#f59e0b' : '#fcd34d'}" stop-opacity="0.55" />
    <stop offset="45%" stop-color="${night ? '#d97706' : '#fef08a'}" stop-opacity="0.25" />
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
  </radialGradient>

  <linearGradient id="sandstoneFrameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="${night ? '#3d342a' : '#ded5c7'}" />
    <stop offset="35%" stop-color="${night ? '#2f271f' : '#cfc4b2'}" />
    <stop offset="70%" stop-color="${night ? '#261f18' : '#b8ab97'}" />
    <stop offset="100%" stop-color="${night ? '#1b1611' : '#a29480'}" />
  </linearGradient>

  <linearGradient id="sandstoneBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="${night ? '#322b22' : '#d8cfbe'}" />
    <stop offset="30%" stop-color="${night ? '#28221b' : '#cbc0ad'}" />
    <stop offset="75%" stop-color="${night ? '#221c15' : '#c0b4a0'}" />
    <stop offset="100%" stop-color="${night ? '#19150f' : '#b1a48f'}" />
  </linearGradient>

  <linearGradient id="inkMountainGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="${night ? '#2c323f' : '#d4cec4'}" />
    <stop offset="100%" stop-color="${night ? '#1a1e27' : '#bab2a5'}" />
  </linearGradient>

  <linearGradient id="inkMountainGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="${night ? '#232832' : '#aba395'}" />
    <stop offset="100%" stop-color="${night ? '#161920' : '#8e8677'}" />
  </linearGradient>

  <linearGradient id="inkMountainGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="${night ? '#1b1e26' : '#827869'}" />
    <stop offset="100%" stop-color="${night ? '#111318' : '#696052'}" />
  </linearGradient>

  <linearGradient id="inkMountainGrad4" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="${night ? '#14171d' : '#605748'}" />
    <stop offset="100%" stop-color="${night ? '#0b0c0f' : '#494134'}" />
  </linearGradient>`;
};

/**
 * BrickScreenWall: 月亮门水墨画卷与暖念墙主台（SVG 片段）
 * 还原设计稿图1：
 * 1. 巨大通透的月亮门双层外圈
 * 2. 月门上方外侧精致典雅的木质斜角花格窗棂
 * 3. 门内：纯净晨曦天空、一轮金色暖阳向外散发数百道纤细金芒、远淡近浓的泼墨群山
 * 4. 山峦前景优雅标注 "INSERT PORTRAIT HERE"
 * 5. 下方立柱台基垂直落地，正中典雅镌刻“暖念墙 / WARMTH & BLESSING”
 */
export const BrickScreenWall = ({ masterOn = true, timeOfDay }: WallStyleProps): string => {
  const night = timeOfDay === 'night';

  // 180 道细密规整的佛光日芒金线 (Sunburst Radiant Rays)
  const sunburstRays = Array.from({ length: SUNBURST_COUNT }, (_, i) => {
    const angle = (i * 360) / SUNBURST_COUNT;
    const rad = (angle * Math.PI) / 180;
    const len = i % 4 === 0 ? 84 : i % 2 === 0 ? 66 : i % 3 === 0 ? 52 : 42;
    const r1 = 34;
    const r2 = r1 + len;
    return {
      x1: 210 + r1 * Math.cos(rad),
      y1: 155 + r1 * Math.sin(rad),
      x2: 210 + r2 * Math.cos(rad),
      y2: 155 + r2 * Math.sin(rad),
      opacity: (i % 4 === 0 ? 0.92 : i % 2 === 0 ? 0.72 : 0.45) * (masterOn ? 1 : 0.4),
      strokeWidth: i % 4 === 0 ? 0.95 : i % 2 === 0 ? 0.7 : 0.45,
      stroke: night ? '#e2b34a' : i % 2 === 0 ? '#caa262' : '#e6c387',
    };
  })
    .map(
      (ray) =>
        `<line x1="${n2(ray.x1)}" y1="${n2(ray.y1)}" x2="${n2(ray.x2)}" y2="${n2(
          ray.y2
        )}" stroke="${ray.stroke}" stroke-width="${ray.strokeWidth}" opacity="${n2(ray.opacity)}" />`
    )
    .join('\n          ');

  return `
  <g id="moonGateNuannianScreen">
    <!-- 月洞门外圈上方精致的木质斜角花格窗棂 -->
    <path
      d="M 52 165 A 162 162 0 0 1 155 42 L 155 22 L 38 22 L 38 165 Z"
      fill="url(#chineseDiagonalLattice)"
      stroke="${night ? '#443b32' : '#baad9b'}"
      stroke-width="2.5"
    />
    <path
      d="M 368 165 A 162 162 0 0 0 265 42 L 265 22 L 382 22 L 382 165 Z"
      fill="url(#chineseDiagonalLattice)"
      stroke="${night ? '#443b32' : '#baad9b'}"
      stroke-width="2.5"
    />

    <!-- 暖念墙竖向直通基柱 -->
    <path
      d="M 68 220 Q 126 295 126 345 L 126 720 L 294 720 L 294 345 Q 294 295 352 220 Z"
      fill="url(#sandstoneBaseGrad)"
      stroke="${night ? '#3d342a' : '#b8ac99'}"
      stroke-width="2.5"
    />
    <line x1="132" y1="345" x2="132" y2="718" stroke="${night ? '#251f18' : '#a29480'}" stroke-width="1.5" opacity="0.7" />
    <line x1="135" y1="345" x2="135" y2="718" stroke="#ffffff" stroke-width="1" opacity="0.5" />
    <line x1="288" y1="345" x2="288" y2="718" stroke="${night ? '#251f18' : '#a29480'}" stroke-width="1.5" opacity="0.7" />
    <line x1="285" y1="345" x2="285" y2="718" stroke="#ffffff" stroke-width="1" opacity="0.5" />

    <!-- 月亮门立体外圆框 -->
    <circle cx="210" cy="190" r="160" fill="none" stroke="url(#sandstoneFrameGrad)" stroke-width="17" />
    <circle cx="210" cy="190" r="169" fill="none" stroke="${night ? '#251f18' : '#a39582'}" stroke-width="2.5" opacity="0.8" />
    <circle cx="210" cy="190" r="151.5" fill="none" stroke="#ffffff" stroke-width="1.8" opacity="0.6" />
    <circle cx="210" cy="190" r="147.5" fill="none" stroke="${night ? '#2c251e' : '#8e8271'}" stroke-width="2.5" />

    <!-- 月洞门内景：日轮万道金芒与水墨远山画卷 -->
    <g clip-path="url(#moonWindowClip)">
      <rect x="50" y="30" width="320" height="320" fill="url(#moonSkyGrad)" />

      <g id="sunburstRaysGroup">
        <circle cx="210" cy="155" r="115" fill="url(#sunGlowAura)" />
        ${sunburstRays}
        <circle cx="210" cy="155" r="38" fill="url(#sunCoreGrad)" />
        <circle cx="210" cy="155" r="25" fill="#ffffff" opacity="0.95" filter="blur(1.5px)" />
      </g>

      <path
        d="M 50 255 Q 95 215 140 228 Q 185 205 230 224 Q 280 202 325 238 Q 355 220 370 248 L 370 340 L 50 340 Z"
        fill="url(#inkMountainGrad1)"
        opacity="0.7"
      />
      <path
        d="M 50 274 Q 110 238 165 254 Q 220 230 270 260 Q 320 235 370 282 L 370 340 L 50 340 Z"
        fill="url(#inkMountainGrad2)"
        opacity="0.85"
      />
      <path
        d="M 50 292 Q 100 264 145 275 Q 195 252 245 280 Q 295 260 370 306 L 370 340 L 50 340 Z"
        fill="url(#inkMountainGrad3)"
        opacity="0.92"
      />
      <path
        d="M 50 314 Q 130 280 210 304 Q 290 270 370 316 L 370 340 L 50 340 Z"
        fill="url(#inkMountainGrad4)"
      />

      <path
        d="M 50 278 Q 210 262 370 282 L 370 296 Q 210 280 50 296 Z"
        fill="#ffffff"
        opacity="0.32"
        filter="blur(3.5px)"
      />

      <text
        x="210"
        y="282"
        text-anchor="middle"
        fill="${night ? '#c7baa6' : '#5a4f42'}"
        font-size="10.5"
        letter-spacing="0.22em"
        font-family="system-ui, -apple-system, sans-serif"
        font-weight="500"
        opacity="0.8"
      >INSERT PORTRAIT HERE</text>
    </g>

    <!-- 暖念墙立柱正中题字 -->
    <g transform="translate(210, 412)">
      <text
        x="0"
        y="0"
        text-anchor="middle"
        fill="${night ? '#c7baa6' : '#453528'}"
        font-size="22"
        font-weight="600"
        font-family="'Songti SC', 'Source Han Serif SC', 'SimSun', serif"
        letter-spacing="0.34em"
      >暖 念 墙</text>
      <text
        x="0"
        y="25"
        text-anchor="middle"
        fill="${night ? '#9e9180' : '#6b5a4b'}"
        font-size="9.5"
        font-weight="400"
        font-family="system-ui, -apple-system, sans-serif"
        letter-spacing="0.22em"
      >WARMTH & BLESSING</text>
    </g>
  </g>`;
};
