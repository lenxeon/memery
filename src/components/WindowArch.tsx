import React from 'react';
import { WallBackgroundStyle, TimeOfDay } from '../types';

interface WindowArchProps {
  masterOn?: boolean;
  sunlightIntensity: number;
  timeOfDay: TimeOfDay;
  sunAngle: number;
  wallStyle?: WallBackgroundStyle;
}

export const WindowArch: React.FC<WindowArchProps> = ({
  masterOn = true,
  sunlightIntensity,
  timeOfDay,
  wallStyle = 'spring_sakura',
}) => {
  // 1. Calculate color scheme and lighting aura - meticulously balanced to blend naturally into room
  const getThemeAmbiance = () => {
    if (!masterOn) {
      return {
        glow: 'from-[#080706] via-[#100d0b] to-[#0a0807]',
        nicheBevel: '#1c1713',
        archBorder: '#27201a',
        archInner: '#171310',
        mullion: '#1e1914',
        halo: 'rgba(0, 0, 0, 0)',
        wallBg: '#0f0d0b',
        sunOrb: 'transparent',
      };
    }

    switch (wallStyle) {
      case 'summer_firefly':
        // 🌌 2. 夏 · 星夜流萤 (深邃夜空，古铜暖金窗框，繁星明月)
        return {
          glow: 'from-[#060b18] via-[#0a152d] to-[#0e1d3e]',
          nicheBevel: '#3b2f21', // 沉稳深色阴影边
          archBorder: '#caa262', // 典雅古法描金框 (融入夜色，绝不刺眼)
          archInner: '#091326',
          mullion: '#8c6b39',    // 古铜金棂条
          halo: 'rgba(234, 179, 8, 0.22)', // 柔和烛光月色晕染
          wallBg: '#080e1b',     // 沉静深邃夜空壁面
          sunOrb: 'radial-gradient(circle, #fffef5 0%, #fef9c3 35%, rgba(254, 240, 138, 0.15) 70%, transparent 100%)',
        };

      case 'autumn_maple':
        // 🍁 3. 秋 · 暖阳枫语 (米金拱形窗，暖阳金色漫射)
        return {
          glow: 'from-[#fffbeb] via-[#fef3c7] to-[#fed7aa]',
          nicheBevel: '#d4c2aa', // 柔和暖砂岩壁龛
          archBorder: '#edd8c0',
          archInner: '#fbf4ea',
          mullion: '#b49678',    // 暖金橡木棂条
          halo: 'rgba(245, 158, 11, 0.35)',
          wallBg: '#fcf8f2',     // 温暖暖白壁纸
          sunOrb: 'radial-gradient(circle, #fffbeb 0%, #fde68a 40%, rgba(245, 158, 11, 0.2) 75%, transparent 100%)',
        };

      case 'winter_snow':
        // ❄️ 4. 冬 · 静雪围炉 (霜雪窗格，壁炉暖光)
        return {
          glow: 'from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]',
          nicheBevel: '#cbd5e1', // 浅灰石质壁龛
          archBorder: '#e2e8f0',
          archInner: '#f8fafc',
          mullion: '#64748b',    // 沉静松木棂条
          halo: 'rgba(249, 115, 22, 0.25)', // 壁炉隐约暖橘红晕
          wallBg: '#f8fafc',
          sunOrb: 'radial-gradient(circle, #ffffff 0%, #f8fafc 50%, rgba(226, 232, 240, 0.2) 80%, transparent 100%)',
        };

      case 'zen_bamboo':
        // 🎋 5. 禅 · 竹林月门 (正圆水磨青石月洞门，东方留白)
        return {
          glow: 'from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]',
          nicheBevel: '#64748b', // 黛灰水磨石圈
          archBorder: '#94a3b8',
          archInner: '#f8fafc',
          mullion: '#475569',
          halo: 'rgba(148, 163, 184, 0.28)',
          wallBg: '#f5f6f6',     // 素雅宣纸白壁
          sunOrb: 'radial-gradient(circle, #ffffff 0%, #f1f5f9 40%, rgba(226, 232, 240, 0.3) 75%, transparent 100%)',
        };

      case 'classical_lattice':
        // 🏮 6. 古典 · 朱漆花窗 (深沉朱砂大漆，描金木雕花格)
        return {
          glow: 'from-[#fdf8f6] via-[#fcefe9] to-[#f9dfd5]',
          nicheBevel: '#4c1017', // 深沉朱红阴影
          archBorder: '#9f1d2b', // 醇厚朱砂大漆
          archInner: '#fdf9f7',
          mullion: '#7f1d1d',    // 庄重大漆棂格
          halo: 'rgba(185, 28, 28, 0.2)',
          wallBg: '#fbf7f4',     // 庄重暖白壁面
          sunOrb: 'radial-gradient(circle, #fffbeb 0%, #fde68a 40%, rgba(245, 158, 11, 0.18) 75%, transparent 100%)',
        };

      case 'modern_cream':
        // 🍦 7. 现代 · 极简奶油 (无窗棂单一奶油色块，极简留白)
        return {
          glow: 'from-[#faf7f2] via-[#f4eee4] to-[#ede3d4]',
          nicheBevel: '#e5ded4', // 极简柔和阴影凹陷
          archBorder: '#efe8dd',
          archInner: '#f8f4ec',
          mullion: 'transparent',
          halo: 'rgba(240, 230, 215, 0.35)',
          wallBg: '#fbf9f6',     // 莫兰迪温润奶油白
          sunOrb: 'transparent',
        };

      case 'spring_sakura':
      default:
        // 🌸 1. 春 · 樱粉细语 (高级粉白奶油系，温润象牙白砂岩壁龛，绝不突兀)
        return {
          glow: 'from-[#fffaf8] via-[#fbf2ed] to-[#fcebe4]',
          nicheBevel: '#dfd3c8', // 真实石灰石壁龛倒角阴影（告别刺眼荧光粉！）
          archBorder: '#f2e8de', // 温润象牙奶油边框
          archInner: '#fbf5ef',  // 柔白窗洞
          mullion: '#bfaea2',    // 浅灰暖木色窗棂
          halo: 'rgba(255, 235, 225, 0.32)', // 极度柔和春晨暖晖
          wallBg: '#fbf7f4',     // 温暖粉白奶油墙面（完全契合地板与案台）
          sunOrb: 'radial-gradient(circle, #fffaf5 0%, #fed7aa 38%, rgba(254, 215, 170, 0.2) 72%, transparent 100%)',
        };
    }
  };

  const ambiance = getThemeAmbiance();
  const effectiveOpacity = masterOn ? Math.max(0.4, sunlightIntensity) : 0.45;

  return (
    <div 
      className="absolute inset-x-0 top-0 bottom-0 flex flex-col items-center pointer-events-none select-none z-0 overflow-hidden transition-colors duration-700"
      style={{
        background: wallStyle === 'summer_firefly' && timeOfDay === 'night' 
          ? 'radial-gradient(ellipse at 50% 35%, rgba(10, 19, 41, 0.7) 0%, rgba(6, 10, 20, 0.85) 100%)'
          : undefined,
      }}
    >
      {/* ── 1. Volumetric Light Spotlight Cone (柔和漫射光锥) ── */}
      {masterOn && (
        <div 
          className="absolute top-2 left-1/2 -translate-x-1/2 w-[760px] h-[820px] pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse at 50% 30%, ${ambiance.halo} 0%, rgba(255,248,235,0.15) 40%, rgba(255,248,235,0) 75%)`,
            opacity: effectiveOpacity,
          }}
        />
      )}

      {/* ── 2. Subtle Petal Bokeh for [春 · 樱粉细语] (极轻柔低对比散景光斑) ── */}
      {wallStyle === 'spring_sakura' && masterOn && (
        <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden opacity-40">
          <div className="absolute top-16 left-[24%] w-24 h-24 rounded-full bg-rose-100/30 blur-2xl" />
          <div className="absolute top-40 right-[26%] w-32 h-32 rounded-full bg-amber-100/30 blur-3xl" />
        </div>
      )}

      {/* ── 3. Cozy Hearth Fireglow for [冬 · 静雪围炉] ── */}
      {wallStyle === 'winter_snow' && masterOn && (
        <div className="absolute bottom-0 inset-x-0 h-64 pointer-events-none z-1 overflow-hidden">
          <div 
            className="w-full h-full animate-pulse"
            style={{
              background: 'radial-gradient(ellipse at 50% 100%, rgba(249, 115, 22, 0.22) 0%, rgba(234, 88, 12, 0.1) 40%, transparent 75%)',
              animationDuration: '4s',
            }}
          />
        </div>
      )}

      {/* ── 4. Main Architectural Window / Moon Gate Structure ── */}
      <div 
        className="relative w-[360px] sm:w-[420px] h-[540px] sm:h-[620px] mt-2 flex flex-col items-center overflow-visible"
        style={{
          opacity: effectiveOpacity,
          maskImage: 'linear-gradient(to bottom, black 0%, black 58%, rgba(0,0,0,0.6) 78%, transparent 98%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 58%, rgba(0,0,0,0.6) 78%, transparent 98%)',
          transition: 'opacity 0.6s ease',
        }}
      >
        <svg 
          viewBox="0 0 420 620" 
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Window Glass Gradient (自然天空微光) */}
            <linearGradient id="windowLightGradV4" x1="0%" y1="0%" x2="0%" y2="100%">
              {wallStyle === 'summer_firefly' ? (
                <>
                  <stop offset="0%" stopColor="#050a16" />
                  <stop offset="50%" stopColor="#091429" />
                  <stop offset="100%" stopColor="#03060f" />
                </>
              ) : wallStyle === 'spring_sakura' ? (
                <>
                  <stop offset="0%" stopColor="#fffaf7" />
                  <stop offset="45%" stopColor="#fbf1ec" />
                  <stop offset="100%" stopColor="#f9e6de" />
                </>
              ) : wallStyle === 'autumn_maple' ? (
                <>
                  <stop offset="0%" stopColor="#fffdf5" />
                  <stop offset="45%" stopColor="#fef6dc" />
                  <stop offset="100%" stopColor="#fae6c6" />
                </>
              ) : wallStyle === 'winter_snow' ? (
                <>
                  <stop offset="0%" stopColor="#fbfcfe" />
                  <stop offset="55%" stopColor="#edf2f7" />
                  <stop offset="100%" stopColor="#dce4ed" />
                </>
              ) : wallStyle === 'zen_bamboo' ? (
                <>
                  <stop offset="0%" stopColor="#fafbfa" />
                  <stop offset="50%" stopColor="#f3f5f3" />
                  <stop offset="100%" stopColor="#e9ece9" />
                </>
              ) : wallStyle === 'classical_lattice' ? (
                <>
                  <stop offset="0%" stopColor="#fffcfb" />
                  <stop offset="50%" stopColor="#fdf4f0" />
                  <stop offset="100%" stopColor="#fce7df" />
                </>
              ) : (
                /* modern_cream */
                <>
                  <stop offset="0%" stopColor="#fbf8f3" />
                  <stop offset="50%" stopColor="#f3ede3" />
                  <stop offset="100%" stopColor="#e9dfd0" />
                </>
              )}
            </linearGradient>

            {/* Gold Frame Rim Gradient (For summer & classical) */}
            <linearGradient id="antiquedGoldRim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e6ca85" />
              <stop offset="35%" stopColor="#caa262" />
              <stop offset="70%" stopColor="#a37b3f" />
              <stop offset="100%" stopColor="#785526" />
            </linearGradient>

            {/* Ice Frost Crystal Pattern (For winter_snow) */}
            <pattern id="frostCrystalsV2" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 14 0 L 14 28 M 0 14 L 28 14 M 4 4 L 24 24 M 4 24 L 24 4" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
              <circle cx="14" cy="14" r="2" fill="rgba(255,255,255,0.5)" />
            </pattern>

            {/* Wan Fretwork Lattice Pattern (For classical_lattice) */}
            <pattern id="wanLatticeGridV2" width="36" height="36" patternUnits="userSpaceOnUse">
              <rect width="36" height="36" fill="none" stroke="#7f1d1d" strokeWidth="2" />
              <path d="M 0 18 L 18 18 L 18 0 M 18 36 L 18 18 L 36 18 M 9 9 L 9 18 M 27 18 L 27 27" fill="none" stroke="#caa262" strokeWidth="1" />
            </pattern>
          </defs>

          {/* ══════════════════════════════════════════════════════════════════
              CASE 5: 禅 · 竹林月门 (正圆中式月洞门 · 水墨远山与青竹)
             ══════════════════════════════════════════════════════════════════ */}
          {wallStyle === 'zen_bamboo' ? (
            <g id="zenMoonGate">
              <circle cx="210" cy="270" r="194" fill="#1e293b" opacity="0.08" />
              
              {/* Outer Masonry Moon Gate Ring (水磨灰石台圈) */}
              <circle cx="210" cy="270" r="190" fill="none" stroke="#64748b" strokeWidth="10" opacity="0.85" />
              <circle cx="210" cy="270" r="185" fill="none" stroke="#94a3b8" strokeWidth="4" />
              <circle cx="210" cy="270" r="182" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />

              {/* Moon Gate Vista Inside */}
              <circle cx="210" cy="270" r="180" fill="url(#windowLightGradV4)" />

              {/* Ink-wash Mountain Peaks (水墨远山) */}
              <path
                d="M 30 350 Q 95 240 165 295 Q 245 200 325 285 Q 370 250 390 340 Z"
                fill="#94a3b8"
                opacity="0.28"
              />
              <path
                d="M 30 380 Q 125 290 205 345 Q 285 270 390 370 Z"
                fill="#64748b"
                opacity="0.38"
              />

              {/* Elegant Bamboo Grove (水墨青竹) */}
              <g id="bambooSilhouettes">
                <path d="M 68 448 C 72 345, 86 245, 128 155" stroke="#334155" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.8" />
                <circle cx="83" cy="280" r="2.4" fill="#475569" />
                <circle cx="105" cy="200" r="2.2" fill="#475569" />
                <path d="M 128 155 Q 152 150, 170 165 Q 148 168, 128 155 Z" fill="#2d4a3e" opacity="0.85" />
                <path d="M 124 160 Q 145 172, 156 190 Q 138 182, 124 160 Z" fill="#3a5a4c" opacity="0.8" />
                <path d="M 105 200 Q 132 195, 150 208 Q 128 212, 105 200 Z" fill="#2d4a3e" opacity="0.85" />

                <path d="M 348 448 C 340 335, 318 225, 262 140" stroke="#334155" strokeWidth="3.2" fill="none" strokeLinecap="round" opacity="0.75" />
                <path d="M 262 140 Q 235 135, 215 152 Q 238 155, 262 140 Z" fill="#2d4a3e" opacity="0.85" />
                <path d="M 266 145 Q 242 158, 234 176 Q 252 168, 266 145 Z" fill="#3a5a4c" opacity="0.8" />
              </g>

              {/* Gentle Morning Mist across bottom */}
              <ellipse cx="210" cy="385" rx="172" ry="42" fill="#f8fafc" opacity="0.5" />
            </g>
          ) : wallStyle === 'classical_lattice' ? (
            /* ══════════════════════════════════════════════════════════════════
               CASE 6: 古典 · 朱漆花窗 (明清朱漆木雕花格窗 · 冰裂万字纹)
               ══════════════════════════════════════════════════════════════════ */
            <g id="classicalLatticeWindow">
              {/* Outer Cinnabar Arch Reveal */}
              <path
                d="M 14 210 A 196 196 0 0 1 406 210 L 406 618 L 14 618 Z"
                fill="none"
                stroke="#3f0a10"
                strokeWidth="12"
                opacity="0.85"
              />
              <path
                d="M 22 210 A 188 188 0 0 1 398 210 L 398 614 L 22 614 Z"
                fill="none"
                stroke="url(#antiquedGoldRim)"
                strokeWidth="4"
              />
              <path
                d="M 28 210 A 182 182 0 0 1 392 210 L 392 610 L 28 610 Z"
                fill="none"
                stroke="#7f1d1d"
                strokeWidth="8"
              />

              {/* Glass opening */}
              <path
                d="M 34 210 A 176 176 0 0 1 386 210 L 386 605 L 34 605 Z"
                fill="url(#windowLightGradV4)"
              />

              {/* Classical Wan Fretwork Lattice */}
              <rect x="36" y="212" width="348" height="392" fill="url(#wanLatticeGridV2)" opacity="0.8" />

              {/* Arch Upper Rays */}
              <path d="M 210 34 L 210 210" stroke="#7f1d1d" strokeWidth="4" />
              <path d="M 210 34 L 210 210" stroke="#caa262" strokeWidth="1.2" />
              <path d="M 90 95 L 210 210" stroke="#7f1d1d" strokeWidth="3.5" />
              <path d="M 330 95 L 210 210" stroke="#7f1d1d" strokeWidth="3.5" />

              {/* Central Diamond Medallion */}
              <polygon points="210,110 240,140 210,170 180,140" fill="#3f0a10" stroke="url(#antiquedGoldRim)" strokeWidth="2.5" />
              <circle cx="210" cy="140" r="8" fill="#7f1d1d" stroke="#e6ca85" strokeWidth="1.2" />

              {/* Horizontal Bar */}
              <rect x="28" y="207" width="364" height="8" rx="1.5" fill="#65141d" stroke="url(#antiquedGoldRim)" strokeWidth="1.5" />

              {/* Courtyard branch silhouette outside */}
              <path d="M 370 240 Q 305 232 265 175 Q 235 188 205 178" stroke="#3f0a10" strokeWidth="2.5" fill="none" opacity="0.5" />
              <circle cx="265" cy="175" r="4" fill="#fecdd3" opacity="0.75" />
              <circle cx="205" cy="178" r="3.5" fill="#fecdd3" opacity="0.75" />
            </g>
          ) : wallStyle === 'modern_cream' ? (
            /* ══════════════════════════════════════════════════════════════════
               CASE 7: 现代 · 极简奶油 (无窗棂单一温润奶油色块，极简留白)
               ══════════════════════════════════════════════════════════════════ */
            <g id="modernCreamNiche">
              {/* Soft Ambient Inner Recess Shadow */}
              <path
                d="M 18 210 A 192 192 0 0 1 402 210 L 402 618 L 18 618 Z"
                fill="rgba(180, 168, 150, 0.18)"
              />
              {/* Minimalist Tactile Curved Bevel */}
              <path
                d="M 26 210 A 184 184 0 0 1 394 210 L 394 614 L 26 614 Z"
                fill="#f1ebd0"
                opacity="0.6"
              />
              {/* Pure, seamless Warm Cream Recessed Block Face */}
              <path
                d="M 32 210 A 178 178 0 0 1 388 210 L 388 610 L 32 610 Z"
                fill="url(#windowLightGradV4)"
              />
              <path
                d="M 32 210 A 178 178 0 0 1 388 210 L 388 230 A 178 178 0 0 0 32 230 Z"
                fill="#ffffff"
                opacity="0.3"
              />
            </g>
          ) : (
            /* ══════════════════════════════════════════════════════════════════
               CASES 1, 2, 3, 4: 拱形窗架构 (自然柔和建筑美学)
               ══════════════════════════════════════════════════════════════════ */
            <g id="standardThemedArchWindow">
              {/* Outer Wall Reveal Bevel (壁龛外圈倒角阴影) */}
              <path
                d="M 14 210 A 196 196 0 0 1 406 210 L 406 618 L 14 618 Z"
                fill="none"
                stroke={wallStyle === 'summer_firefly' ? 'url(#antiquedGoldRim)' : ambiance.nicheBevel}
                strokeWidth={wallStyle === 'summer_firefly' ? '8' : '10'}
                opacity={wallStyle === 'summer_firefly' ? 0.9 : 0.65}
              />

              {/* Inner Arch Reveal (内拱券边框) */}
              <path
                d="M 22 210 A 188 188 0 0 1 398 210 L 398 614 L 22 614 Z"
                fill="none"
                stroke={wallStyle === 'summer_firefly' ? '#e6ca85' : ambiance.archBorder}
                strokeWidth={wallStyle === 'summer_firefly' ? '3.5' : '5'}
              />

              {/* Window Glass Pane Opening */}
              <path
                d="M 26 210 A 184 184 0 0 1 394 210 L 394 610 L 26 610 Z"
                fill="url(#windowLightGradV4)"
                stroke={ambiance.archInner}
                strokeWidth="2.5"
              />

              {/* ── 特别景深 A: 夏 · 星夜流萤 (窗外浩瀚繁星与一轮明月) ── */}
              {wallStyle === 'summer_firefly' && (
                <g id="summerNightSkyFeatures">
                  <g transform="translate(145, 95)">
                    <circle cx="0" cy="0" r="30" fill="#fffef5" opacity="0.12" />
                    <circle cx="0" cy="0" r="22" fill="#fffef5" opacity="0.25" />
                    <circle cx="0" cy="0" r="16" fill="#fffef7" />
                    <ellipse cx="-3" cy="-2" rx="4.5" ry="3.5" fill="#fef08a" opacity="0.25" />
                  </g>

                  {[
                    { cx: 70, cy: 90, r: 1.6, o: 0.85 },
                    { cx: 105, cy: 150, r: 1.0, o: 0.7 },
                    { cx: 260, cy: 80, r: 2.0, o: 0.9 },
                    { cx: 310, cy: 130, r: 1.3, o: 0.75 },
                    { cx: 345, cy: 85, r: 1.2, o: 0.65 },
                    { cx: 215, cy: 60, r: 1.8, o: 0.85 },
                    { cx: 80, cy: 260, r: 1.1, o: 0.6 },
                    { cx: 330, cy: 250, r: 1.4, o: 0.75 },
                    { cx: 275, cy: 240, r: 1.2, o: 0.8 },
                  ].map((star, idx) => (
                    <circle key={idx} cx={star.cx} cy={star.cy} r={star.r} fill="#ffffff" opacity={star.o} />
                  ))}
                </g>
              )}

              {/* ── 特别景深 B: 冬 · 静雪围炉 (窗格冰花霜纹理) ── */}
              {wallStyle === 'winter_snow' && (
                <g id="winterFrostFeatures">
                  <rect x="28" y="210" width="364" height="395" fill="url(#frostCrystalsV2)" opacity="0.4" />
                  <path d="M 28 206 Q 80 203 140 206 Q 210 202 280 206 Q 340 203 392 206 Z" fill="#ffffff" opacity="0.75" />
                  <path d="M 28 338 Q 120 335 210 338 Q 300 335 392 338 Z" fill="#ffffff" opacity="0.65" />
                </g>
              )}

              {/* ── 特别景深 C: 春 · 樱粉细语 (自然柔美樱花枝丫，告别刺眼红线) ── */}
              {wallStyle === 'spring_sakura' && (
                <g id="springSakuraTreeSilhouette">
                  <path d="M 380 220 Q 320 180 280 120 Q 240 85 190 65" stroke="#715b50" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.6" />
                  <path d="M 280 120 Q 310 90 330 65" stroke="#715b50" strokeWidth="1.6" fill="none" opacity="0.5" />
                  {/* Pale pink blossoms clusters */}
                  <circle cx="280" cy="120" r="4.5" fill="#fcded8" opacity="0.85" />
                  <circle cx="277" cy="116" r="3.5" fill="#fbcfe8" opacity="0.8" />
                  <circle cx="240" cy="85" r="4.2" fill="#fcded8" opacity="0.85" />
                  <circle cx="190" cy="65" r="3.8" fill="#fbcfe8" opacity="0.85" />
                  <circle cx="330" cy="65" r="4.0" fill="#fcded8" opacity="0.85" />
                </g>
              )}

              {/* ── 特别景深 D: 秋 · 暖阳枫语 (红枫枝丫) ── */}
              {wallStyle === 'autumn_maple' && (
                <g id="autumnMapleBranchSilhouette">
                  <path d="M 40 180 Q 110 140 160 90 Q 210 50 260 30" stroke="#78350f" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.55" />
                  <circle cx="160" cy="90" r="4.8" fill="#ea580c" opacity="0.75" />
                  <circle cx="210" cy="50" r="4.5" fill="#f59e0b" opacity="0.8" />
                </g>
              )}

              {/* Semi-circular Arch Radial Mullions (精致细实木棂条) */}
              <line x1="210" y1="26" x2="210" y2="210" stroke={ambiance.mullion} strokeWidth={wallStyle === 'summer_firefly' ? '4.5' : '4'} strokeLinecap="round" />
              <line x1="80" y1="80" x2="210" y2="210" stroke={ambiance.mullion} strokeWidth="3.2" strokeLinecap="round" />
              <line x1="340" y1="80" x2="210" y2="210" stroke={ambiance.mullion} strokeWidth="3.2" strokeLinecap="round" />

              {/* Horizontal Transom Bar */}
              <rect 
                x="24" 
                y="207" 
                width="372" 
                height="6" 
                rx="1" 
                fill={wallStyle === 'summer_firefly' ? 'url(#antiquedGoldRim)' : ambiance.mullion} 
              />

              {/* Lower Grid Window Mullions */}
              <line x1="210" y1="210" x2="210" y2="610" stroke={ambiance.mullion} strokeWidth={wallStyle === 'summer_firefly' ? '4.5' : '4'} />
              <line x1="118" y1="210" x2="118" y2="610" stroke={ambiance.mullion} strokeWidth="3" />
              <line x1="302" y1="210" x2="302" y2="610" stroke={ambiance.mullion} strokeWidth="3" />

              {/* Horizontal cross bars */}
              <line x1="26" y1="340" x2="394" y2="340" stroke={ambiance.mullion} strokeWidth="3.5" />
              <line x1="26" y1="472" x2="394" y2="472" stroke={ambiance.mullion} strokeWidth="3.5" />

              {/* Glass subtle highlight lines */}
              <line x1="50" y1="230" x2="85" y2="320" stroke="#ffffff" strokeWidth="2" opacity="0.35" strokeLinecap="round" />
            </g>
          )}
        </svg>

        {/* Soft Sun/Moon Orb behind window */}
        {ambiance.sunOrb !== 'transparent' && wallStyle !== 'summer_firefly' && timeOfDay !== 'night' && (
          <div 
            className="absolute top-12 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full pointer-events-none"
            style={{
              background: ambiance.sunOrb,
              transform: `scale(${0.85 + sunlightIntensity * 0.35})`,
            }}
          />
        )}
      </div>
    </div>
  );
};
