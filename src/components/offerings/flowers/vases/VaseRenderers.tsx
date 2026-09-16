/**
 * @file VaseRenderers.tsx
 * @description 现代高阶设计感与奇特造型花器 SVG 矢量渲染器：
 * 涵盖：
 * 1. 极细百褶密棱直筒瓶 (参考图1右/图4右)
 * 2. 旋风波浪奶油瓶 (参考图2 奶油白)
 * 3. 落樱粉旋风波纹瓶 (参考图5 樱粉色)
 * 4. 侘寂砂岩横纹瓶 (参考图3 玄灰石器横纹)
 * 5. 圆台百褶梯形瓶 (参考图1中 梯形百褶)
 * 6. 钻石晶体切角瓶 (参考图4之2 晶体多边形)
 * 7. 海棠瓜棱秀颈瓶 (参考图4之3 纤秀颈瓜棱圆瓣)
 * 8. 极简水滴天鹅瓶 (参考图4左1 极简留白)
 * 9. 手作泥捏翻边陶瓶 (新图1: 不对称荷叶卷边口、手工梳齿拉坯刮痕粗陶)
 * 10. 银曜珠光螺旋涡轮瓶 (新图3: 喇叭撇口垂胆腹、8道3D旋转刀锋螺旋棱)
 * 11. 极简莫兰迪旋转扭扭塔瓶 (新图4: 空间多边形沿中心轴90°旋转沙漏腰)
 * 12. 天青流沙渐变圆锥砂陶瓶 (新图5: 极简圆台圆锥体、天青釉渐变粗砂岩底)
 * 
 * 采用【瓶口后唇与内腔】->【插花花枝】->【瓶身主体与瓶口前唇】空间深度分层，
 * 确保任何插花均能自然探入瓶口内部，且每款花瓶拥有完全不同的实体轮廓与外观肌理！
 */
import React from 'react';
import { VaseStyle, normalizeVaseStyle } from './types';

export const VaseDefs: React.FC = () => (
  <>
    {/* ── 1. 纯白哑光现代陶艺渐变 ── */}
    <linearGradient id="pureMatteWhiteGrad" x1="15%" y1="20%" x2="90%" y2="80%">
      <stop offset="0%" stopColor="#ffffff" />
      <stop offset="45%" stopColor="#faf7f2" />
      <stop offset="85%" stopColor="#ece4d8" />
      <stop offset="100%" stopColor="#dfd5c5" />
    </linearGradient>

    {/* ── 2. 奶油白陶（参考图2）温润柔光渐变 ── */}
    <linearGradient id="creamWavePorcelainGrad" x1="20%" y1="15%" x2="85%" y2="85%">
      <stop offset="0%" stopColor="#ffffff" />
      <stop offset="35%" stopColor="#fdfaf3" />
      <stop offset="70%" stopColor="#f4ebda" />
      <stop offset="92%" stopColor="#e3d4bd" />
      <stop offset="100%" stopColor="#d1be9f" />
    </linearGradient>

    {/* ── 3. 莫兰迪落樱粉（参考图5）优雅柔和渐变 ── */}
    <linearGradient id="blushRoseWaveGrad" x1="20%" y1="15%" x2="85%" y2="85%">
      <stop offset="0%" stopColor="#fff5f5" />
      <stop offset="30%" stopColor="#ffe4e6" />
      <stop offset="70%" stopColor="#fecdd3" />
      <stop offset="90%" stopColor="#f43f5e" stopOpacity="0.55" />
      <stop offset="100%" stopColor="#be123c" stopOpacity="0.4" />
    </linearGradient>

    {/* ── 4. 侘寂玄灰砂岩（参考图3）质朴粗陶渐变 ── */}
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

    {/* ── 7. 手作泥捏翻边暖姜黄粗陶渐变 (新图1) ── */}
    <linearGradient id="warmPinchedClayGrad" x1="18%" y1="12%" x2="88%" y2="88%">
      <stop offset="0%" stopColor="#fde047" stopOpacity="0.8" />
      <stop offset="15%" stopColor="#f59e0b" stopOpacity="0.9" />
      <stop offset="50%" stopColor="#d97706" />
      <stop offset="80%" stopColor="#b45309" />
      <stop offset="100%" stopColor="#78350f" />
    </linearGradient>

    {/* ── 8. 银曜珠光金属涡轮渐变 (新图3) ── */}
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

    {/* ── 9. 莫兰迪冰蓝纯瓷渐变 (新图4) ── */}
    <linearGradient id="morandiIceBlueGrad" x1="20%" y1="15%" x2="85%" y2="85%">
      <stop offset="0%" stopColor="#e0f2fe" />
      <stop offset="35%" stopColor="#bae6fd" />
      <stop offset="70%" stopColor="#38bdf8" />
      <stop offset="90%" stopColor="#0284c7" />
      <stop offset="100%" stopColor="#0369a1" />
    </linearGradient>

    {/* ── 10. 天青釉流沙粗砂岩渐变 (新图5) ── */}
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

/**
 * 渲染瓶口内腔与后唇 (位于插花花枝后方)
 * 花枝从内腔幽暗处自然探出，产生真实的插花景深
 */
export const renderVaseMouthBack = (styleId: VaseStyle = 'ribbed_fluted_white'): React.ReactNode => {
  const style = normalizeVaseStyle(styleId);

  switch (style) {
    // 1. 极细百褶密棱直筒瓶
    case 'ribbed_fluted_white':
      return (
        <g id="mouth_back_ribbed_fluted">
          <ellipse cx="75" cy="108.5" rx="10.5" ry="3.0" fill="#140d07" />
          <path d="M 64.5 108 C 64.5 105.5, 85.5 105.5, 85.5 108" stroke="#38281a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>
      );

    // 2. 旋风波浪奶油瓶
    case 'organic_twist_cream':
      return (
        <g id="mouth_back_organic_twist_cream">
          <ellipse cx="75" cy="108" rx="11" ry="3.2" fill="#140d07" />
          <path d="M 64 107.5 C 64 105.2, 86 105.2, 86 107.5" stroke="#3d2c1d" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>
      );

    // 3. 落樱粉旋风波纹瓶
    case 'organic_twist_rose':
      return (
        <g id="mouth_back_organic_twist_rose">
          <ellipse cx="75" cy="108" rx="11" ry="3.2" fill="#140d07" />
          <path d="M 64 107.5 C 64 105.2, 86 105.2, 86 107.5" stroke="#4c1d24" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>
      );

    // 4. 侘寂砂岩横纹瓶 (略小圆形石口)
    case 'chiseled_stone_gray':
      return (
        <g id="mouth_back_chiseled_stone">
          <ellipse cx="75" cy="108.5" rx="9.5" ry="2.8" fill="#0d0e10" />
          <path d="M 65.5 108.5 C 65.5 106.2, 84.5 106.2, 84.5 108.5" stroke="#18181b" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </g>
      );

    // 5. 圆台百褶梯形瓶 (收束口径)
    case 'fluted_trapezoid_mini':
      return (
        <g id="mouth_back_fluted_trapezoid">
          <ellipse cx="75" cy="112" rx="7.5" ry="2.4" fill="#140d07" />
          <path d="M 67.5 112 C 67.5 109.8, 82.5 109.8, 82.5 112" stroke="#332418" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>
      );

    // 6. 钻石晶体切角瓶 (切角多边形口)
    case 'faceted_gem_prism':
      return (
        <g id="mouth_back_faceted_gem">
          <ellipse cx="75" cy="109" rx="10" ry="3.0" fill="#140d07" />
          <path d="M 65 109 L 70 106.8 L 80 106.8 L 85 109" stroke="#332418" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>
      );

    // 7. 海棠瓜棱秀颈瓶 (小巧秀唇)
    case 'melon_lobed_celadon':
      return (
        <g id="mouth_back_melon_lobed">
          <ellipse cx="75" cy="108" rx="8.5" ry="2.6" fill="#140d07" />
          <path d="M 66.5 108 C 66.5 105.8, 83.5 105.8, 83.5 108" stroke="#065f46" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>
      );

    // 8. 极简水滴天鹅瓶 (纤长秀口)
    case 'minimal_drop_swan':
      return (
        <g id="mouth_back_minimal_drop">
          <ellipse cx="75" cy="106.5" rx="7.5" ry="2.4" fill="#140d07" />
          <path d="M 67.5 106.5 C 67.5 104.5, 82.5 104.5, 82.5 106.5" stroke="#2a1e14" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>
      );

    // 9. 手作泥捏翻边陶瓶 (新图1: 不对称荷叶翘边口)
    case 'pinched_clay_ruffle':
      return (
        <g id="mouth_back_pinched_clay_ruffle">
          <ellipse cx="74.5" cy="107" rx="8" ry="2.6" fill="#140d07" />
          {/* 左高右低的不对称翻边后唇 */}
          <path d="M 62 104 C 66 101, 74 103, 85 108" stroke="#78350f" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </g>
      );

    // 10. 银曜珠光螺旋涡轮瓶 (新图3: 外撇喇叭圆唇)
    case 'pearlescent_turbine':
      return (
        <g id="mouth_back_pearlescent_turbine">
          <ellipse cx="75" cy="107" rx="10.5" ry="3.0" fill="#0f172a" />
          <path d="M 64.5 107 C 64.5 104.5, 85.5 104.5, 85.5 107" stroke="#334155" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>
      );

    // 11. 极简莫兰迪旋转扭扭塔瓶 (新图4: 空间多边形旋转口)
    case 'twisted_helix_tower':
      return (
        <g id="mouth_back_twisted_helix_tower">
          <ellipse cx="75" cy="108" rx="8" ry="2.5" fill="#0c4a6e" />
          <path d="M 67 108 L 71 105.5 L 79 105.5 L 83 108" stroke="#0369a1" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>
      );

    // 12. 天青流沙渐变圆锥砂陶瓶 (新图5: 极简平口圆锥)
    case 'gradient_sand_volcano':
    default:
      return (
        <g id="mouth_back_gradient_sand_volcano">
          <ellipse cx="75" cy="112" rx="7.5" ry="2.4" fill="#1c1917" />
          <path d="M 67.5 112 C 67.5 109.8, 82.5 109.8, 82.5 112" stroke="#0284c7" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>
      );
  }
};

/**
 * 渲染花瓶瓶身主体与瓶口前唇 (位于插花花枝前方)
 */
export const renderVaseBody = (styleId: VaseStyle = 'ribbed_fluted_white'): React.ReactNode => {
  const style = normalizeVaseStyle(styleId);

  switch (style) {
    /* ─────────────────────────────────────────────────────────────
     * 1. 极细百褶密棱直筒瓶 (参考图1右 / 图4右：微收腰直筒，密布精细垂直百褶)
     * ───────────────────────────────────────────────────────────── */
    case 'ribbed_fluted_white': {
      const outerFlutePath = `
        M 64.5 108
        Q 75 110.5 85.5 108
        C 86.5 125, 85 155, 87 186
        L 86 192
        Q 75 194.5 64 192
        L 63 186
        C 65 155, 63.5 125, 64.5 108
        Z
      `;
      const ribs = [65.5, 67, 68.5, 70, 71.5, 73, 74.5, 76, 77.5, 79, 80.5, 82, 83.5, 85];

      return (
        <g id="vase_ribbed_fluted_white">
          <clipPath id="clipRibbedFluted">
            <path d={outerFlutePath} />
          </clipPath>

          <path
            d={outerFlutePath}
            fill="url(#pureMatteWhiteGrad)"
            stroke="#2a1e14"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          <g id="verticalPleatedFlutes" clipPath="url(#clipRibbedFluted)">
            {ribs.map((rx, idx) => {
              const isCenter = Math.abs(rx - 75) < 3.5;
              const isLeft = rx < 75;
              return (
                <g key={idx}>
                  <line
                    x1={rx}
                    y1="108"
                    x2={rx + (rx - 75) * 0.08}
                    y2="192"
                    stroke="#ffffff"
                    strokeWidth={isCenter ? 1.4 : 1.1}
                    opacity={isCenter ? 0.95 : isLeft ? 0.85 : 0.65}
                  />
                  <line
                    x1={rx + 0.75}
                    y1="108"
                    x2={rx + 0.75 + (rx - 75) * 0.08}
                    y2="192"
                    stroke="#38281a"
                    strokeWidth="0.8"
                    opacity={isLeft ? 0.25 : 0.45}
                  />
                </g>
              );
            })}
          </g>

          <path
            d="M 81 110 C 83 130, 83 170, 85 192 L 87 192 C 85 170, 86 130, 85 108 Z"
            fill="#2a1e14"
            opacity="0.12"
          />

          <path d="M 64 192 Q 75 194.5 86 192 L 85.5 195 Q 75 197 64.5 195 Z" fill="#dfd5c5" stroke="#2a1e14" strokeWidth="1.5" />

          <path
            d="M 64.5 108 Q 75 110.5 85.5 108 C 85.5 112, 64.5 112, 64.5 108 Z"
            fill="#ffffff"
            stroke="#2a1e14"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M 66 109 Q 75 110.8 84 109" stroke="#ffffff" strokeWidth="1.0" fill="none" opacity="0.9" />
        </g>
      );
    }

    /* ─────────────────────────────────────────────────────────────
     * 2. 旋风波浪奶油瓶 (参考图2：奶油白陶，S型波浪旋风立体扭转)
     * ───────────────────────────────────────────────────────────── */
    case 'organic_twist_cream': {
      const twistBodyPath = `
        M 64 107.5
        Q 75 110 86 107.5
        C 88 125, 85 150, 88 175
        C 89 184, 87 190, 85 192
        Q 75 194.5 65 192
        C 63 190, 61 184, 62 175
        C 65 150, 62 125, 64 107.5
        Z
      `;

      return (
        <g id="vase_organic_twist_cream">
          <clipPath id="clipTwistCream">
            <path d={twistBodyPath} />
          </clipPath>

          <path
            d={twistBodyPath}
            fill="url(#creamWavePorcelainGrad)"
            stroke="#2a1e14"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          <g id="sculpturalTwistWaves" clipPath="url(#clipTwistCream)">
            <path
              d="M 60 192 C 64 175, 60 145, 66 115 C 68 118, 64 145, 62 192 Z"
              fill="#dfd0bb"
              opacity="0.6"
            />
            <path
              d="M 67 192 C 73 170, 66 142, 72 108 L 75 108 C 70 142, 76 170, 71 192 Z"
              fill="#ffffff"
              opacity="0.9"
            />
            <path d="M 69 192 C 74 170, 68 142, 73.5 108" stroke="#ffffff" strokeWidth="1.6" fill="none" opacity="0.95" />

            <path
              d="M 76 192 C 81 168, 75 140, 80 108 L 83 108 C 78 140, 84 168, 79 192 Z"
              fill="#f7efe0"
              opacity="0.8"
            />
            <path d="M 77.5 192 C 82 168, 76.5 140, 81.5 108" stroke="#ffffff" strokeWidth="1.4" fill="none" opacity="0.9" />

            <path
              d="M 82 192 C 87 165, 82 138, 86 112"
              stroke="#3d2c1d"
              strokeWidth="1.2"
              fill="none"
              opacity="0.35"
            />
          </g>

          <path d="M 65 192 Q 75 194.5 85 192 L 84.5 195 Q 75 197 65.5 195 Z" fill="#d1be9f" stroke="#2a1e14" strokeWidth="1.5" />

          <path
            d="M 64 107.5 Q 75 110 86 107.5 C 86 111.8, 64 111.8, 64 107.5 Z"
            fill="#ffffff"
            stroke="#2a1e14"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M 66 108.8 Q 75 110.5 84 108.8" stroke="#ffffff" strokeWidth="1.1" fill="none" opacity="0.95" />
        </g>
      );
    }

    /* ─────────────────────────────────────────────────────────────
     * 3. 落樱粉旋风波纹瓶 (参考图5：莫兰迪落樱粉，柔和立体波浪旋风)
     * ───────────────────────────────────────────────────────────── */
    case 'organic_twist_rose': {
      const roseBodyPath = `
        M 64 107.5
        Q 75 110 86 107.5
        C 88 125, 85 150, 88 175
        C 89 184, 87 190, 85 192
        Q 75 194.5 65 192
        C 63 190, 61 184, 62 175
        C 65 150, 62 125, 64 107.5
        Z
      `;

      return (
        <g id="vase_organic_twist_rose">
          <clipPath id="clipTwistRose">
            <path d={roseBodyPath} />
          </clipPath>

          <path
            d={roseBodyPath}
            fill="url(#blushRoseWaveGrad)"
            stroke="#4c1d24"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          <g id="roseTwistWaves" clipPath="url(#clipTwistRose)">
            <path
              d="M 68 192 C 73 170, 67 142, 72 108 L 75 108 C 70 142, 76 170, 71 192 Z"
              fill="#ffffff"
              opacity="0.8"
            />
            <path d="M 69.5 192 C 74 170, 68.5 142, 73.5 108" stroke="#ffffff" strokeWidth="1.6" fill="none" opacity="0.9" />

            <path
              d="M 76 192 C 81 168, 75 140, 80 108 L 83 108 C 78 140, 84 168, 79 192 Z"
              fill="#fff1f2"
              opacity="0.6"
            />
            <path d="M 78 192 C 82.5 168, 77 140, 82 108" stroke="#ffffff" strokeWidth="1.3" fill="none" opacity="0.85" />
          </g>

          <path d="M 65 192 Q 75 194.5 85 192 L 84.5 195 Q 75 197 65.5 195 Z" fill="#fecdd3" stroke="#4c1d24" strokeWidth="1.5" />

          <path
            d="M 64 107.5 Q 75 110 86 107.5 C 86 111.8, 64 111.8, 64 107.5 Z"
            fill="#ffe4e6"
            stroke="#4c1d24"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M 66 108.8 Q 75 110.5 84 108.8" stroke="#ffffff" strokeWidth="1.0" fill="none" opacity="0.9" />
        </g>
      );
    }

    /* ─────────────────────────────────────────────────────────────
     * 4. 侘寂玄灰砂岩横纹瓶 (参考图3：玄灰石器微锥体，手工凿刻横向砂岩肌理)
     * ───────────────────────────────────────────────────────────── */
    case 'chiseled_stone_gray': {
      const stoneBodyPath = `
        M 65.5 108.5
        L 84.5 108.5
        C 86 125, 87 155, 90 192
        L 60 192
        C 63 155, 64 125, 65.5 108.5
        Z
      `;
      const yLevels = [
        113, 116, 120, 123, 127, 131, 135, 139, 143, 147, 151,
        155, 159, 163, 167, 171, 175, 179, 183, 187, 190
      ];

      return (
        <g id="vase_chiseled_stone_gray">
          <clipPath id="clipChiseledStone">
            <path d={stoneBodyPath} />
          </clipPath>

          <path
            d={stoneBodyPath}
            fill="url(#chiseledStoneGrad)"
            stroke="#18181b"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          <g id="horizontalChiseledGrooves" clipPath="url(#clipChiseledStone)">
            {yLevels.map((y, idx) => {
              const t = (y - 108.5) / (192 - 108.5);
              const leftX = 65.5 - 5.5 * t;
              const rightX = 84.5 + 5.5 * t;
              return (
                <g key={idx}>
                  <line
                    x1={leftX}
                    y1={y}
                    x2={rightX}
                    y2={y}
                    stroke="#18181b"
                    strokeWidth="0.85"
                    opacity={idx % 2 === 0 ? 0.7 : 0.45}
                  />
                  <line
                    x1={leftX + 2}
                    y1={y + 0.6}
                    x2={rightX - 3}
                    y2={y + 0.6}
                    stroke="#71717a"
                    strokeWidth="0.65"
                    opacity={idx % 3 === 0 ? 0.65 : 0.4}
                  />
                </g>
              );
            })}
          </g>

          <rect x="60" y="192" width="30" height="3" fill="#27272a" stroke="#18181b" strokeWidth="1.5" />

          <path
            d="M 65.5 108.5 Q 75 110.8 84.5 108.5 C 84.5 112, 65.5 112, 65.5 108.5 Z"
            fill="#52525b"
            stroke="#18181b"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </g>
      );
    }

    /* ─────────────────────────────────────────────────────────────
     * 5. 圆台百褶梯形瓶 (参考图1中款：上窄下阔梯形圆台，密布外展折线竖棱)
     * ───────────────────────────────────────────────────────────── */
    case 'fluted_trapezoid_mini': {
      const trapezoidBodyPath = `
        M 67.5 112
        L 82.5 112
        L 100 192
        L 50 192
        Z
      `;
      const ribs = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6];

      return (
        <g id="vase_fluted_trapezoid_mini">
          <clipPath id="clipTrapezoid">
            <path d={trapezoidBodyPath} />
          </clipPath>

          <path
            d={trapezoidBodyPath}
            fill="url(#pureMatteWhiteGrad)"
            stroke="#2a1e14"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          <g id="radiatingTrapezoidFlutes" clipPath="url(#clipTrapezoid)">
            {ribs.map((idx) => {
              const topX = 75 + idx * 1.15;
              const bottomX = 75 + idx * 3.8;
              const isCenter = Math.abs(idx) <= 1;
              return (
                <g key={idx}>
                  <line
                    x1={topX}
                    y1="112"
                    x2={bottomX}
                    y2="192"
                    stroke="#ffffff"
                    strokeWidth={isCenter ? 1.5 : 1.2}
                    opacity={isCenter ? 0.95 : idx < 0 ? 0.85 : 0.65}
                  />
                  <line
                    x1={topX + 0.6}
                    y1="112"
                    x2={bottomX + 1.2}
                    y2="192"
                    stroke="#332418"
                    strokeWidth="0.8"
                    opacity={idx < 0 ? 0.25 : 0.45}
                  />
                </g>
              );
            })}
          </g>

          <polygon points="50,192 100,192 99,195 51,195" fill="#dfd5c5" stroke="#2a1e14" strokeWidth="1.5" />

          <path
            d="M 67.5 112 Q 75 114 82.5 112 C 82.5 115, 67.5 115, 67.5 112 Z"
            fill="#ffffff"
            stroke="#2a1e14"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </g>
      );
    }

    /* ─────────────────────────────────────────────────────────────
     * 6. 钻石晶体多面切角瓶 (参考图4之2：现代 Low-Poly 晶体切角，多边形面光影)
     * ───────────────────────────────────────────────────────────── */
    case 'faceted_gem_prism': {
      return (
        <g id="vase_faceted_gem_prism">
          <polygon points="65,109 75,109 70,140 62,136" fill="url(#crystalFacetA)" stroke="#2a1e14" strokeWidth="1.4" strokeLinejoin="round" />
          <polygon points="75,109 85,109 88,136 78,140" fill="#ffffff" stroke="#2a1e14" strokeWidth="1.4" strokeLinejoin="round" />
          <polygon points="75,109 78,140 75,152 70,140" fill="url(#crystalFacetB)" stroke="#2a1e14" strokeWidth="1.3" strokeLinejoin="round" />

          <polygon points="62,136 70,140 67,168 56,166" fill="url(#crystalFacetC)" stroke="#2a1e14" strokeWidth="1.4" strokeLinejoin="round" />
          <polygon points="70,140 75,152 78,140 82,168 74,172 67,168" fill="url(#crystalFacetA)" stroke="#2a1e14" strokeWidth="1.4" strokeLinejoin="round" />
          <polygon points="78,140 88,136 94,166 82,168" fill="url(#crystalFacetB)" stroke="#2a1e14" strokeWidth="1.4" strokeLinejoin="round" />

          <polygon points="56,166 67,168 68,192 59,192" fill="url(#crystalFacetC)" stroke="#2a1e14" strokeWidth="1.4" strokeLinejoin="round" />
          <polygon points="67,168 74,172 82,168 83,192 68,192" fill="#ffffff" stroke="#2a1e14" strokeWidth="1.4" strokeLinejoin="round" />
          <polygon points="82,168 94,166 91,192 83,192" fill="url(#crystalFacetB)" stroke="#2a1e14" strokeWidth="1.4" strokeLinejoin="round" />

          <line x1="75" y1="109" x2="70" y2="140" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="70" y1="140" x2="67" y2="168" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="74" y1="172" x2="68" y2="192" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />

          <polygon points="59,192 91,192 90,195 60,195" fill="#dfd5c5" stroke="#2a1e14" strokeWidth="1.5" />

          <polygon
            points="65,109 75,109 85,109 82,112.5 75,113 67,112.5"
            fill="#ffffff"
            stroke="#2a1e14"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </g>
      );
    }

    /* ─────────────────────────────────────────────────────────────
     * 7. 海棠瓜棱秀颈素瓶 (参考图4之3：纤细秀颈与6瓣饱满瓜棱圆凸瓣)
     * ───────────────────────────────────────────────────────────── */
    case 'melon_lobed_celadon': {
      const melonPath = `
        M 66.5 108
        Q 75 110.5 83.5 108
        C 81 116, 78 126, 78 132
        C 88 138, 98 152, 98 168
        C 98 180, 93 188, 88 192
        Q 75 194.5 62 192
        C 57 188, 52 180, 52 168
        C 52 152, 62 138, 72 132
        C 72 126, 69 116, 66.5 108
        Z
      `;

      return (
        <g id="vase_melon_lobed_celadon">
          <clipPath id="clipMelonLobed">
            <path d={melonPath} />
          </clipPath>

          <path
            d={melonPath}
            fill="url(#melonLobedCeladonGrad)"
            stroke="#065f46"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          <g id="sixMelonLobes" clipPath="url(#clipMelonLobed)">
            <path d="M 72 132 C 66 142, 60 162, 63 192" stroke="#065f46" strokeWidth="1.2" fill="none" opacity="0.35" />
            <path d="M 74 132 C 71 146, 70 168, 72 192" stroke="#065f46" strokeWidth="1.2" fill="none" opacity="0.25" />
            <path d="M 76 132 C 79 146, 80 168, 78 192" stroke="#065f46" strokeWidth="1.2" fill="none" opacity="0.25" />
            <path d="M 78 132 C 84 142, 90 162, 87 192" stroke="#065f46" strokeWidth="1.2" fill="none" opacity="0.35" />

            <ellipse cx="66" cy="165" rx="4" ry="16" fill="#ffffff" opacity="0.65" transform="rotate(-12 66 165)" />
            <ellipse cx="75" cy="166" rx="4" ry="18" fill="#ffffff" opacity="0.8" />
            <ellipse cx="84" cy="165" rx="3.5" ry="16" fill="#ffffff" opacity="0.55" transform="rotate(12 84 165)" />
          </g>

          <path d="M 73 112 Q 74 122 73.5 132" stroke="#ffffff" strokeWidth="1.2" fill="none" opacity="0.8" />
          <path d="M 62 192 Q 75 194.5 88 192 L 87.5 195 Q 75 197 62.5 195 Z" fill="#a7f3d0" stroke="#065f46" strokeWidth="1.5" />

          <path
            d="M 66.5 108 Q 75 110.5 83.5 108 C 83.5 111.5, 66.5 111.5, 66.5 108 Z"
            fill="#ffffff"
            stroke="#065f46"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </g>
      );
    }

    /* ─────────────────────────────────────────────────────────────
     * 8. 现代极简水滴天鹅瓶 (参考图4左1 / 图1左：极简纤颈水滴纯白留白)
     * ───────────────────────────────────────────────────────────── */
    case 'minimal_drop_swan': {
      const dropPath = `
        M 67.5 106.5
        Q 75 108.5 82.5 106.5
        C 81 114, 78 126, 78 138
        C 84 144, 94 156, 95 170
        C 96 178, 92 188, 87 192
        Q 75 194.5 63 192
        C 58 188, 54 178, 55 170
        C 56 156, 66 144, 72 138
        C 72 126, 69 114, 67.5 106.5
        Z
      `;

      return (
        <g id="vase_minimal_drop_swan">
          <path
            d={dropPath}
            fill="url(#pureMatteWhiteGrad)"
            stroke="#2a1e14"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          <path d="M 73 110 Q 74 124 73 138" stroke="#ffffff" strokeWidth="1.4" fill="none" opacity="0.85" />

          <path
            d="M 62 154 C 58 164, 58 175, 64 184 C 61 176, 60 164, 64 154 Z"
            fill="#ffffff"
            opacity="0.8"
          />
          <ellipse cx="66" cy="166" rx="6" ry="14" fill="#ffffff" opacity="0.5" transform="rotate(-15 66 166)" />

          <path d="M 63 192 Q 75 194.5 87 192 L 86.5 195 Q 75 197 63.5 195 Z" fill="#dfd5c5" stroke="#2a1e14" strokeWidth="1.5" />

          <path
            d="M 67.5 106.5 Q 75 108.5 82.5 106.5 C 82.5 110, 67.5 110, 67.5 106.5 Z"
            fill="#ffffff"
            stroke="#2a1e14"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </g>
      );
    }

    /* ─────────────────────────────────────────────────────────────
     * 9. 手作泥捏翻边陶瓶 (新图1: 不对称荷叶卷边口、手工梳齿拉坯刮痕粗陶)
     * ───────────────────────────────────────────────────────────── */
    case 'pinched_clay_ruffle': {
      // 不对称翻边马蹄口与手捏自然凹凸指痕筒腹轮廓 (新图1实拍)
      const ruffleBodyPath = `
        M 62 104
        C 66 101, 74 103, 85 108
        C 86 112, 80 114, 76 116
        C 76 126, 75 142, 79 152
        C 84 162, 86 176, 85 192
        Q 73 194.5 62 192
        C 60 178, 62 165, 67 154
        C 70 144, 70 126, 69 116
        C 66 114, 62 110, 62 104
        Z
      `;

      // 手工梳齿刮痕纹理 y 坐标 (新图1细密刮痕)
      const combYs = [
        118, 122, 126, 130, 134, 138, 142, 146, 150, 154, 158, 162, 166, 170, 174, 178, 182, 186, 189
      ];

      return (
        <g id="vase_pinched_clay_ruffle">
          <clipPath id="clipClayRuffle">
            <path d={ruffleBodyPath} />
          </clipPath>

          {/* 暖姜黄手作粗陶胎 */}
          <path
            d={ruffleBodyPath}
            fill="url(#warmPinchedClayGrad)"
            stroke="#78350f"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* 手工梳齿刮擦与泥捏指印表面微肌理 (新图1精髓) */}
          <g id="clayCombedStriations" clipPath="url(#clipClayRuffle)">
            {/* 纵向手工梳齿刮拉纹 */}
            {[64, 66, 68, 70, 72, 74, 76, 78, 80, 82].map((x, i) => (
              <path
                key={`vert_${i}`}
                d={`M ${x} 118 Q ${x + (i % 2 === 0 ? 1 : -1)} 155 ${x + (x - 73) * 0.15} 192`}
                stroke="#78350f"
                strokeWidth="0.65"
                strokeDasharray="4,2"
                opacity="0.38"
                fill="none"
              />
            ))}

            {/* 横向微斜慢轮拉坯刮擦细痕 */}
            {combYs.map((y, i) => (
              <g key={`comb_${i}`}>
                <path
                  d={`M 60 ${y} Q 74 ${y + (i % 2 === 0 ? 0.8 : -0.6)} 86 ${y + (i % 3 === 0 ? 1.2 : 0)}`}
                  stroke="#78350f"
                  strokeWidth="0.75"
                  opacity={i % 2 === 0 ? 0.45 : 0.28}
                  fill="none"
                />
                <path
                  d={`M 62 ${y + 0.4} Q 74 ${y + 1.0} 84 ${y + 0.4}`}
                  stroke="#fef08a"
                  strokeWidth="0.5"
                  opacity="0.55"
                  fill="none"
                />
              </g>
            ))}

            {/* 手捏凹凸微指痕受光阴影 */}
            <ellipse cx="69" cy="148" rx="4" ry="7" fill="#78350f" opacity="0.18" />
            <ellipse cx="77" cy="165" rx="5" ry="9" fill="#fde047" opacity="0.3" />
          </g>

          {/* 质朴平底圈足 */}
          <path d="M 62 192 Q 73 194.5 85 192 L 84 195 Q 73 197 63 195 Z" fill="#b45309" stroke="#78350f" strokeWidth="1.6" />

          {/* 不对称荷叶翻边前唇 (左翘右卷，真实再现新图1实拍) */}
          <path
            d="M 62 104 C 66 109, 73 113, 85 108 C 88 111, 80 115, 73 114 C 66 113, 62 109, 62 104 Z"
            fill="#fef08a"
            stroke="#78350f"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M 63 105 C 67 108.5, 74 111, 83 109" stroke="#ffffff" strokeWidth="1.1" fill="none" opacity="0.9" />
        </g>
      );
    }

    /* ─────────────────────────────────────────────────────────────
     * 10. 银曜珠光螺旋涡轮瓶 (新图3: 撇口垂胆腹、8道3D旋转刀锋螺旋棱)
     * ───────────────────────────────────────────────────────────── */
    case 'pearlescent_turbine': {
      // 外撇撇口、高腰、下垂饱满胆腹轮廓
      const turbineBodyPath = `
        M 64.5 107
        Q 75 109.5 85.5 107
        C 83 115, 79 126, 78 138
        C 86 145, 96 158, 97 172
        C 98 182, 94 189, 89 192
        Q 75 194.5 61 192
        C 56 189, 52 182, 53 172
        C 54 158, 64 145, 72 138
        C 71 126, 67 115, 64.5 107
        Z
      `;

      return (
        <g id="vase_pearlescent_turbine">
          <clipPath id="clipTurbineBody">
            <path d={turbineBodyPath} />
          </clipPath>

          {/* 银曜冷冽珠光金属底色 */}
          <path
            d={turbineBodyPath}
            fill="url(#silverPearlTurbineGrad)"
            stroke="#334155"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* 8 道立体 3D 旋转刀锋涡轮螺旋立棱 (新图3震撼视觉) */}
          <g id="spiralTurbineBlades" clipPath="url(#clipTurbineBody)">
            {[
              { startX: 68, startY: 110, ctrlX1: 60, ctrlY1: 145, ctrlX2: 56, ctrlY2: 175, endX: 63, endY: 192 },
              { startX: 71, startY: 108, ctrlX1: 65, ctrlY1: 142, ctrlX2: 62, ctrlY2: 172, endX: 69, endY: 192 },
              { startX: 74, startY: 108, ctrlX1: 71, ctrlY1: 140, ctrlX2: 68, ctrlY2: 170, endX: 75, endY: 192 },
              { startX: 77, startY: 108, ctrlX1: 77, ctrlY1: 138, ctrlX2: 74, ctrlY2: 168, endX: 81, endY: 192 },
              { startX: 80, startY: 108, ctrlX1: 83, ctrlY1: 138, ctrlX2: 82, ctrlY2: 168, endX: 87, endY: 192 },
              { startX: 83, startY: 109, ctrlX1: 89, ctrlY1: 142, ctrlX2: 92, ctrlY2: 170, endX: 92, endY: 192 },
            ].map((blade, idx) => (
              <g key={idx}>
                {/* 刀锋阴影面 */}
                <path
                  d={`M ${blade.startX} ${blade.startY} C ${blade.ctrlX1} ${blade.ctrlY1}, ${blade.ctrlX2} ${blade.ctrlY2}, ${blade.endX} ${blade.endY} L ${blade.endX + 2.5} ${blade.endY} C ${blade.ctrlX2 + 2.5} ${blade.ctrlY2}, ${blade.ctrlX1 + 2.0} ${blade.ctrlY1}, ${blade.startX + 1.5} ${blade.startY} Z`}
                  fill="#1e293b"
                  opacity="0.32"
                />
                {/* 刀锋锐利白色珠光高亮脊线 */}
                <path
                  d={`M ${blade.startX} ${blade.startY} C ${blade.ctrlX1} ${blade.ctrlY1}, ${blade.ctrlX2} ${blade.ctrlY2}, ${blade.endX} ${blade.endY}`}
                  stroke="#ffffff"
                  strokeWidth="1.6"
                  fill="none"
                  opacity="0.95"
                />
              </g>
            ))}

            {/* 珠光弧形泛光 */}
            <ellipse cx="66" cy="168" rx="8" ry="18" fill="#ffffff" opacity="0.45" transform="rotate(-20 66 168)" />
          </g>

          {/* 圈足 */}
          <path d="M 61 192 Q 75 194.5 89 192 L 88 195 Q 75 197 62 195 Z" fill="#94a3b8" stroke="#334155" strokeWidth="1.6" />

          {/* 喇叭前唇 */}
          <path
            d="M 64.5 107 Q 75 109.5 85.5 107 C 85.5 111, 64.5 111, 64.5 107 Z"
            fill="#f8fafc"
            stroke="#334155"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M 66 108 Q 75 109.8 84 108" stroke="#ffffff" strokeWidth="1.0" fill="none" opacity="0.95" />
        </g>
      );
    }

    /* ─────────────────────────────────────────────────────────────
     * 11. 极简莫兰迪旋转扭扭塔瓶 (新图4: 空间多边形沿中心轴90°旋转沙漏腰)
     * ───────────────────────────────────────────────────────────── */
    case 'twisted_helix_tower': {
      return (
        <g id="vase_twisted_helix_tower">
          {/* 上段旋转多边形棱柱切面 (沿竖轴顺时针旋转) */}
          {/* 上左主光面 */}
          <polygon points="67,108 75,108 72,148 65,146" fill="#7dd3fc" stroke="#0369a1" strokeWidth="1.4" strokeLinejoin="round" />
          {/* 上中主高亮面 */}
          <polygon points="75,108 83,108 79,146 72,148" fill="#ffffff" stroke="#0369a1" strokeWidth="1.4" strokeLinejoin="round" />
          {/* 上右阴影面 */}
          <polygon points="83,108 81,114 84,144 79,146" fill="#0284c7" stroke="#0369a1" strokeWidth="1.3" strokeLinejoin="round" />

          {/* 下段反向展开旋转棱柱切面 (形成沙漏收腰至底座展阔) */}
          {/* 下左暗影折面 */}
          <polygon points="65,146 72,148 68,192 58,192" fill="#0284c7" stroke="#0369a1" strokeWidth="1.4" strokeLinejoin="round" />
          {/* 下中核心受光面 */}
          <polygon points="72,148 79,146 84,192 68,192" fill="#bae6fd" stroke="#0369a1" strokeWidth="1.4" strokeLinejoin="round" />
          {/* 下右侧光折面 */}
          <polygon points="79,146 84,144 92,192 84,192" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.4" strokeLinejoin="round" />

          {/* 旋转空间棱线锐利高光 (表现空间扭转感) */}
          <line x1="75" y1="108" x2="72" y2="148" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="72" y1="148" x2="68" y2="192" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="83" y1="108" x2="79" y2="146" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="79" y1="146" x2="84" y2="192" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" />

          {/* 稳重多边形底足 */}
          <polygon points="58,192 92,192 91,195 59,195" fill="#0369a1" stroke="#0c4a6e" strokeWidth="1.5" />

          {/* 旋转切口前唇 */}
          <polygon
            points="67,108 75,108 83,108 80,111.5 74,112 68,111"
            fill="#e0f2fe"
            stroke="#0369a1"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </g>
      );
    }

    /* ─────────────────────────────────────────────────────────────
     * 12. 天青流沙渐变圆锥砂陶瓶 (新图5: 极简圆台圆锥体、天青釉渐变粗砂岩底)
     * ───────────────────────────────────────────────────────────── */
    case 'gradient_sand_volcano':
    default: {
      const volcanoPath = `
        M 67.5 112
        L 82.5 112
        C 84 125, 87 150, 98 192
        L 52 192
        C 63 150, 66 125, 67.5 112
        Z
      `;

      return (
        <g id="vase_gradient_sand_volcano">
          <clipPath id="clipVolcanoSand">
            <path d={volcanoPath} />
          </clipPath>

          {/* 天青釉至砂岩渐变底色 (新图5实拍双色渐变) */}
          <path
            d={volcanoPath}
            fill="url(#skyBlueToSandGrad)"
            stroke="#1c1917"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* 下部粗砂陶原矿粗粝颗粒微肌理 (新图5精髓) */}
          <g id="coarseSandGrit" clipPath="url(#clipVolcanoSand)">
            {[
              { cx: 58, cy: 172, r: 0.8 }, { cx: 64, cy: 178, r: 0.9 }, { cx: 72, cy: 175, r: 0.7 },
              { cx: 80, cy: 176, r: 0.9 }, { cx: 88, cy: 174, r: 0.8 }, { cx: 93, cy: 180, r: 0.7 },
              { cx: 56, cy: 184, r: 1.0 }, { cx: 66, cy: 188, r: 0.8 }, { cx: 76, cy: 186, r: 1.1 },
              { cx: 84, cy: 189, r: 0.9 }, { cx: 90, cy: 187, r: 0.7 }, { cx: 70, cy: 182, r: 0.6 },
            ].map((dot, idx) => (
              <circle key={idx} cx={dot.cx} cy={dot.cy} r={dot.r} fill="#451a03" opacity="0.45" />
            ))}

            {/* 上部天青哑光微漫射 */}
            <path d="M 68 114 Q 72 135 73 155" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.75" />
          </g>

          {/* 稳固圆台底座 */}
          <path d="M 52 192 Q 75 194.5 98 192 L 97 195 Q 75 197 53 195 Z" fill="#8c7053" stroke="#1c1917" strokeWidth="1.6" />

          {/* 纯净天青前唇 */}
          <path
            d="M 67.5 112 Q 75 114 82.5 112 C 82.5 115, 67.5 115, 67.5 112 Z"
            fill="#e0f2fe"
            stroke="#0284c7"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M 69 112.8 Q 75 114.2 81 112.8" stroke="#ffffff" strokeWidth="0.9" fill="none" opacity="0.9" />
        </g>
      );
    }
  }
};
