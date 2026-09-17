/**
 * @file BrickScreenWall.tsx
 * @description 【古朴苍然】月亮门水墨远山千道金芒、斑驳竹影、落地宫灯与挺拔青竹背景墙组件。
 */
import React, { useMemo } from 'react';
import { WallStyleProps, WallAmbiance } from '../types';
import { TimeOfDay } from '../../../../types';

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

/**
 * BrickScreenEnvironment: 真实环境全景层
 * 还原设计稿图1：
 * 1. 左侧：从左上方倾斜洒落的百叶窗晨光光带与斑驳竹影
 * 2. 左侧下方：立于地面的中式实木纱绢落地宫灯（温润暖光）
 * 3. 右侧：立于壁前、苍翠挺拔的写意工笔青竹，并在墙面投下真实自然的柔和虚焦投影！
 */
export const BrickScreenEnvironment: React.FC<WallStyleProps> = ({ masterOn = true, sunlightIntensity, timeOfDay }) => {
  const effectiveOpacity = masterOn ? Math.max(0.4, sunlightIntensity) : 0.45;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex justify-center">
      <div className="relative w-full max-w-[1200px] h-full">

        {/* ── 1. 左上方斜向倾斜晨光光带 (Slanted Morning Light Rays & Window Shadows) ── */}
        {masterOn && timeOfDay !== 'night' && (
          <div
            className="absolute -top-10 -left-10 w-[700px] h-[750px] pointer-events-none transition-opacity duration-700"
            style={{
              background: `
                repeating-linear-gradient(
                  130deg,
                  rgba(255, 252, 240, 0.18) 0px,
                  rgba(255, 252, 240, 0.18) 45px,
                  rgba(180, 160, 140, 0.04) 45px,
                  rgba(180, 160, 140, 0.04) 110px
                )
              `,
              filter: 'blur(22px)',
              opacity: effectiveOpacity * 0.95,
              mixBlendMode: 'soft-light',
            }}
          />
        )}

        {/* ── 2. 左侧墙面斑驳竹影 (Soft Dappled Bamboo Shadow Cast on Wall) ── */}
        <svg
          className="absolute -left-6 sm:left-4 top-4 w-[280px] sm:w-[360px] h-[580px] pointer-events-none transition-opacity duration-700"
          style={{
            opacity: timeOfDay === 'night' ? 0.12 : 0.32 * effectiveOpacity,
            filter: 'blur(4.5px)',
            transform: 'rotate(-2deg)',
          }}
          viewBox="0 0 340 580"
        >
          {/* Bamboo Stalk Shadows */}
          <path d="M 40 580 Q 75 320 110 0" stroke="#685643" strokeWidth="16" fill="none" strokeLinecap="round" />
          <path d="M 100 580 Q 145 300 185 0" stroke="#685643" strokeWidth="20" fill="none" strokeLinecap="round" />
          <path d="M 170 580 Q 210 350 250 40" stroke="#685643" strokeWidth="14" fill="none" strokeLinecap="round" />
          
          {/* Culm Nodes */}
          {[90, 180, 270, 360, 450].map((y, i) => (
            <g key={i}>
              <line x1={40 + (580 - y) * 0.12 - 12} y1={y} x2={40 + (580 - y) * 0.12 + 16} y2={y - 2} stroke="#4f4030" strokeWidth="4" />
              <line x1={100 + (580 - y) * 0.14 - 15} y1={y + 12} x2={100 + (580 - y) * 0.14 + 18} y2={y + 10} stroke="#4f4030" strokeWidth="5" />
              <line x1={170 + (580 - y) * 0.13 - 12} y1={y - 8} x2={170 + (580 - y) * 0.13 + 14} y2={y - 10} stroke="#4f4030" strokeWidth="4" />
            </g>
          ))}

          {/* Dappled Leaf Clusters (柔和落影竹叶簇) */}
          {[
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
          ].map((c, i) => (
            <g key={i} transform={`translate(${c.x}, ${c.y}) rotate(${c.rot})`}>
              <path d="M 0 0 C 24 16 58 14 86 0 C 58 -14 24 -16 0 0 Z" fill="#685643" />
              <path d="M 6 -12 C 30 -4 64 -8 92 -20 C 64 -32 30 -26 6 -12 Z" fill="#685643" />
              <path d="M 12 14 C 36 28 70 24 96 12 C 70 2 36 4 12 14 Z" fill="#685643" />
            </g>
          ))}
        </svg>

        {/* ── 3. 左侧立式落地木雕宣纸宫灯 (Floor Standing Silk Lantern) ── */}
        <div
          className="absolute left-[12px] sm:left-[55px] bottom-[140px] sm:bottom-[160px] w-[95px] h-[340px] flex flex-col items-center pointer-events-none transition-all duration-700 z-15"
          style={{ opacity: effectiveOpacity }}
        >
          {/* 温润暖光辐射光晕 (Warm Radial Glow Aura) */}
          {masterOn && (
            <div
              className="absolute top-[28px] left-1/2 -translate-x-1/2 w-44 h-56 rounded-full pointer-events-none"
              style={{
                background:
                  timeOfDay === 'night'
                    ? 'radial-gradient(circle, rgba(254, 215, 130, 0.55) 0%, rgba(245, 158, 11, 0.22) 45%, transparent 75%)'
                    : 'radial-gradient(circle, rgba(255, 235, 175, 0.45) 0%, rgba(251, 191, 36, 0.16) 48%, transparent 75%)',
                filter: 'blur(12px)',
              }}
            />
          )}

          {/* 宫灯整体精致矢量结构 */}
          <svg viewBox="0 0 95 340" className="w-full h-full drop-shadow-md">
            <defs>
              {/* 灯罩柔纸渐变 */}
              <radialGradient id="silkLampGlow" cx="45%" cy="48%" r="55%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="30%" stopColor={masterOn ? '#fffbeb' : '#e6dfce'} />
                <stop offset="68%" stopColor={masterOn ? '#fed7aa' : '#cfc5b0'} />
                <stop offset="100%" stopColor={masterOn ? '#f59e0b' : '#a89d86'} />
              </radialGradient>
              {/* 红木框架渐变 */}
              <linearGradient id="rosewoodFrame" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2c170a" />
                <stop offset="35%" stopColor="#5a3317" />
                <stop offset="70%" stopColor="#6e3d19" />
                <stop offset="100%" stopColor="#251307" />
              </linearGradient>
            </defs>

            {/* 顶端黄铜宝珠纽 */}
            <circle cx="47.5" cy="14" r="5" fill="#caa262" stroke="#6b4a1b" strokeWidth="1" />
            <path d="M 40 22 C 43 18 52 18 55 22 L 53 25 L 42 25 Z" fill="url(#rosewoodFrame)" />

            {/* 顶部木构顶冠 */}
            <ellipse cx="47.5" cy="27" rx="16" ry="5.5" fill="url(#rosewoodFrame)" stroke="#1a0d05" strokeWidth="1.2" />

            {/* 椭圆素绢灯罩 */}
            <ellipse
              cx="47.5" cy="74" rx="31" ry="48"
              fill="url(#silkLampGlow)"
              stroke="#4a2a12" strokeWidth="2.2"
            />
            {/* 宣纸竖向竹丝骨架 */}
            <ellipse cx="47.5" cy="74" rx="17" ry="47.5" fill="none" stroke="#8a5c28" strokeWidth="1.2" opacity="0.65" />
            <line x1="47.5" y1="26" x2="47.5" y2="122" stroke="#8a5c28" strokeWidth="1.5" opacity="0.8" />
            
            {/* 内部发光暖烛核 */}
            {masterOn && (
              <circle cx="47.5" cy="72" r="16" fill="#ffffff" opacity="0.85" filter="blur(3px)" />
            )}

            {/* 底部木承托与精雕托架 */}
            <ellipse cx="47.5" cy="122" rx="18" ry="6" fill="url(#rosewoodFrame)" stroke="#1a0d05" strokeWidth="1.2" />
            <path
              d="M 36 126 Q 24 140 42 152 L 47.5 150 L 53 152 Q 71 140 59 126 Z"
              fill="url(#rosewoodFrame)"
              stroke="#1a0d05" strokeWidth="1.2"
            />

            {/* 细长立柱杆身 */}
            <rect x="44.5" y="148" width="6" height="150" fill="url(#rosewoodFrame)" stroke="#1a0d05" strokeWidth="0.8" />
            {/* 铜箍节点装饰 */}
            <rect x="43" y="215" width="9" height="7" rx="1.5" fill="#caa262" stroke="#68461b" strokeWidth="0.8" />

            {/* 中式镂空斗式三足木基座 (稳固立于地面) */}
            <path d="M 33 296 L 62 296 L 70 326 L 25 326 Z" fill="url(#rosewoodFrame)" stroke="#1a0d05" strokeWidth="1.5" />
            {/* 三足落地底板与阴影垫脚 */}
            <rect x="18" y="324" width="59" height="8" rx="2.5" fill="#1f1006" />
            <rect x="14" y="331" width="67" height="3" rx="1.5" fill="#000000" opacity="0.4" />
          </svg>
        </div>

        {/* ── 4. 右侧立于壁前的挺拔工笔翠竹与柔和墙面投影 (Living Bamboo & Drop Shadow) ── */}
        <div className="absolute -right-2 sm:right-3 top-6 sm:top-10 w-[240px] sm:w-[310px] h-[640px] pointer-events-none z-10">
          <svg viewBox="0 0 280 620" className="w-full h-full overflow-visible">
            <defs>
              {/* 挺拔青竹竿渐变：苍翠富有生机 */}
              <linearGradient id="realBambooGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e3e1c" />
                <stop offset="30%" stopColor="#3d6c34" />
                <stop offset="65%" stopColor="#588d45" />
                <stop offset="90%" stopColor="#6ea855" />
                <stop offset="100%" stopColor="#254a20" />
              </linearGradient>

              {/* 青竹叶片渐变：自然受光 */}
              <linearGradient id="realLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7cb952" />
                <stop offset="45%" stopColor="#508332" />
                <stop offset="85%" stopColor="#325d20" />
                <stop offset="100%" stopColor="#1e3a13" />
              </linearGradient>

              {/* 较嫩翠绿侧枝 */}
              <linearGradient id="tenderTwigGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3a602c" />
                <stop offset="50%" stopColor="#679a48" />
                <stop offset="100%" stopColor="#2c4d1f" />
              </linearGradient>
            </defs>

            {/* ── 4.1 核心光影层：竹子在浅米色墙壁上的柔和虚焦投影 (Drop Shadow Cast) ── */}
            <g
              transform="translate(-16, 18)"
              style={{
                opacity: timeOfDay === 'night' ? 0.15 : 0.38 * effectiveOpacity,
                filter: 'blur(5px)',
              }}
            >
              {/* 主干竹影 */}
              <path d="M 90 620 Q 125 350 160 0" stroke="#685643" strokeWidth="18" fill="none" strokeLinecap="round" />
              <path d="M 175 620 Q 200 380 230 40" stroke="#685643" strokeWidth="13" fill="none" strokeLinecap="round" />
              {/* 细枝与叶簇竹影 */}
              {[
                { x: 105, y: 130, rot: -30 },
                { x: 125, y: 200, rot: -15 },
                { x: 95, y: 280, rot: -40 },
                { x: 180, y: 150, rot: -25 },
                { x: 205, y: 240, rot: -45 },
                { x: 150, y: 350, rot: -20 },
                { x: 110, y: 420, rot: -50 },
                { x: 190, y: 450, rot: -30 },
              ].map((c, i) => (
                <g key={`shadow-${i}`} transform={`translate(${c.x}, ${c.y}) rotate(${c.rot})`}>
                  <line x1="0" y1="0" x2="-35" y2="15" stroke="#685643" strokeWidth="3" />
                  <path d="M -35 15 C -60 16 -100 2 -125 -14 C -95 -8 -60 2 -35 15 Z" fill="#685643" />
                  <path d="M -35 15 C -68 32 -110 28 -140 14 C -105 10 -65 6 -35 15 Z" fill="#685643" />
                  <path d="M -35 15 C -55 42 -95 50 -120 40 C -95 24 -60 18 -35 15 Z" fill="#685643" />
                </g>
              ))}
            </g>

            {/* ── 4.2 前景真实青竹实体 (Living Fresh Bamboo Foreground) ── */}
            <g style={{ opacity: effectiveOpacity }}>
              {/* 主竿 1 (粗壮挺拔主干) */}
              <path d="M 90 620 Q 125 350 160 0" stroke="url(#realBambooGrad)" strokeWidth="17" fill="none" strokeLinecap="round" />
              {/* 主竿 2 (侧旁挺拔竹干) */}
              <path d="M 175 620 Q 200 380 230 40" stroke="url(#realBambooGrad)" strokeWidth="12" fill="none" strokeLinecap="round" />

              {/* 细致逼真的竹节环箍 (Bamboo Nodes with Gilded Ivory Ring) */}
              {[110, 220, 330, 440, 550].map((y, i) => (
                <g key={`node-${i}`}>
                  {/* 主竿 1 节环 */}
                  <ellipse
                    cx={90 + (620 - y) * 0.11} cy={y} rx="10.5" ry="4"
                    fill="#1e3818" stroke="#a3d47d" strokeWidth="1.2"
                  />
                  <line
                    x1={90 + (620 - y) * 0.11 - 10} y1={y}
                    x2={90 + (620 - y) * 0.11 + 10} y2={y}
                    stroke="#c6e89a" strokeWidth="0.8" opacity="0.8"
                  />
                  {/* 主竿 2 节环 */}
                  <ellipse
                    cx={175 + (620 - y) * 0.09} cy={y - 20} rx="7.5" ry="3.2"
                    fill="#1e3818" stroke="#a3d47d" strokeWidth="1"
                  />
                  <line
                    x1={175 + (620 - y) * 0.09 - 7} y1={y - 20}
                    x2={175 + (620 - y) * 0.09 + 7} y2={y - 20}
                    stroke="#c6e89a" strokeWidth="0.7" opacity="0.8"
                  />
                </g>
              ))}

              {/* 青翠修长竹叶簇 (符合工笔“个/介”字形出叶) */}
              {[
                { x: 105, y: 130, rot: -30, scale: 1 },
                { x: 125, y: 200, rot: -15, scale: 1.1 },
                { x: 95, y: 280, rot: -40, scale: 0.95 },
                { x: 180, y: 150, rot: -25, scale: 1.05 },
                { x: 205, y: 240, rot: -45, scale: 0.9 },
                { x: 150, y: 350, rot: -20, scale: 1.15 },
                { x: 110, y: 420, rot: -50, scale: 0.85 },
                { x: 190, y: 450, rot: -30, scale: 1 },
              ].map((c, i) => (
                <g key={`leaf-${i}`} transform={`translate(${c.x}, ${c.y}) rotate(${c.rot}) scale(${c.scale})`}>
                  {/* 出叶细梗枝 */}
                  <line x1="0" y1="0" x2="-35" y2="15" stroke="url(#tenderTwigGrad)" strokeWidth="2.2" strokeLinecap="round" />
                  
                  {/* 竹叶 1 (上扬主叶) */}
                  <path
                    d="M -35 15 C -60 16 -100 2 -125 -14 C -95 -8 -60 2 -35 15 Z"
                    fill="url(#realLeafGrad)"
                    stroke="#1e3e15" strokeWidth="0.5"
                  />
                  {/* 竹叶 2 (展平侧叶) */}
                  <path
                    d="M -35 15 C -68 32 -110 28 -140 14 C -105 10 -65 6 -35 15 Z"
                    fill="url(#realLeafGrad)"
                    stroke="#1e3e15" strokeWidth="0.5"
                  />
                  {/* 竹叶 3 (下垂飘叶) */}
                  <path
                    d="M -35 15 C -55 42 -95 50 -120 40 C -95 24 -60 18 -35 15 Z"
                    fill="url(#realLeafGrad)"
                    stroke="#1e3e15" strokeWidth="0.5"
                  />
                </g>
              ))}
            </g>
          </svg>
        </div>

      </div>
    </div>
  );
};

export const BrickScreenDefs: React.FC<{ timeOfDay: TimeOfDay }> = ({ timeOfDay }) => (
  <>
    {/* 扇形圆角花格窗格纹 */}
    <pattern id="chineseDiagonalLattice" width="14" height="14" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
      <rect width="14" height="14" fill={timeOfDay === 'night' ? '#25201a' : '#faf7f0'} />
      <line x1="0" y1="0" x2="0" y2="14" stroke={timeOfDay === 'night' ? '#443b32' : '#baad9b'} strokeWidth="1.5" />
      <line x1="0" y1="0" x2="14" y2="0" stroke={timeOfDay === 'night' ? '#443b32' : '#baad9b'} strokeWidth="1.5" />
    </pattern>

    {/* 圆窗裁剪路径 */}
    <clipPath id="moonWindowClip">
      <circle cx="210" cy="190" r="142" />
    </clipPath>

    {/* 月洞门纯净晨曦天空 */}
    <linearGradient id="moonSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor={timeOfDay === 'night' ? '#1c202a' : '#ffffff'} />
      <stop offset="50%" stopColor={timeOfDay === 'night' ? '#161921' : '#fdfaf5'} />
      <stop offset="85%" stopColor={timeOfDay === 'night' ? '#12141a' : '#f5ebe0'} />
      <stop offset="100%" stopColor={timeOfDay === 'night' ? '#0b0c10' : '#ece0d0'} />
    </linearGradient>

    {/* 金日耀白日核 */}
    <radialGradient id="sunCoreGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#ffffff" />
      <stop offset="40%" stopColor={timeOfDay === 'night' ? '#fff9e6' : '#fffef8'} />
      <stop offset="75%" stopColor={timeOfDay === 'night' ? '#fed7aa' : '#fef0c7'} />
      <stop offset="100%" stopColor={timeOfDay === 'night' ? '#f59e0b' : '#fde68a'} stopOpacity="0.85" />
    </radialGradient>

    {/* 金日漫射光晕 */}
    <radialGradient id="sunGlowAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor={timeOfDay === 'night' ? '#f59e0b' : '#fcd34d'} stopOpacity="0.55" />
      <stop offset="45%" stopColor={timeOfDay === 'night' ? '#d97706' : '#fef08a'} stopOpacity="0.25" />
      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
    </radialGradient>

    {/* 月亮门素雅木石边框渐变 */}
    <linearGradient id="sandstoneFrameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor={timeOfDay === 'night' ? '#3d342a' : '#ded5c7'} />
      <stop offset="35%" stopColor={timeOfDay === 'night' ? '#2f271f' : '#cfc4b2'} />
      <stop offset="70%" stopColor={timeOfDay === 'night' ? '#261f18' : '#b8ab97'} />
      <stop offset="100%" stopColor={timeOfDay === 'night' ? '#1b1611' : '#a29480'} />
    </linearGradient>

    {/* 暖念墙立柱与基座渐变 (质地温润，直通到底) */}
    <linearGradient id="sandstoneBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor={timeOfDay === 'night' ? '#322b22' : '#d8cfbe'} />
      <stop offset="30%" stopColor={timeOfDay === 'night' ? '#28221b' : '#cbc0ad'} />
      <stop offset="75%" stopColor={timeOfDay === 'night' ? '#221c15' : '#c0b4a0'} />
      <stop offset="100%" stopColor={timeOfDay === 'night' ? '#19150f' : '#b1a48f'} />
    </linearGradient>

    {/* 水墨远山渐变 (4 层次，远淡近深，水墨灵动) */}
    <linearGradient id="inkMountainGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor={timeOfDay === 'night' ? '#2c323f' : '#d4cec4'} />
      <stop offset="100%" stopColor={timeOfDay === 'night' ? '#1a1e27' : '#bab2a5'} />
    </linearGradient>

    <linearGradient id="inkMountainGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor={timeOfDay === 'night' ? '#232832' : '#aba395'} />
      <stop offset="100%" stopColor={timeOfDay === 'night' ? '#161920' : '#8e8677'} />
    </linearGradient>

    <linearGradient id="inkMountainGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor={timeOfDay === 'night' ? '#1b1e26' : '#827869'} />
      <stop offset="100%" stopColor={timeOfDay === 'night' ? '#111318' : '#696052'} />
    </linearGradient>

    <linearGradient id="inkMountainGrad4" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor={timeOfDay === 'night' ? '#14171d' : '#605748'} />
      <stop offset="100%" stopColor={timeOfDay === 'night' ? '#0b0c0f' : '#494134'} />
    </linearGradient>
  </>
);

/**
 * BrickScreenWall: 月亮门水墨画卷与暖念墙主台
 * 还原设计稿图1：
 * 1. 巨大通透的月亮门双层外圈
 * 2. 月门上方外侧精致典雅的木质斜角花格窗棂
 * 3. 门内：纯净晨曦天空、一轮金色暖阳向外散发数百道纤细金芒、远淡近浓的泼墨群山
 * 4. 山峦前景优雅标注 "INSERT PORTRAIT HERE"
 * 5. 下方立柱台基垂直落地，正中典雅镌刻“暖念墙 / WARMTH & BLESSING”
 */
export const BrickScreenWall: React.FC<WallStyleProps> = ({ masterOn = true, timeOfDay }) => {
  // 180 道细密规整的佛光日芒金线 (Sunburst Radiant Rays)
  const sunburstRays = useMemo(() => {
    const rays: { x1: number; y1: number; x2: number; y2: number; opacity: number; strokeWidth: number }[] = [];
    const count = 180;
    const cx = 210;
    const cy = 155;
    for (let i = 0; i < count; i++) {
      const angle = (i * 360) / count;
      const rad = (angle * Math.PI) / 180;
      const len = i % 4 === 0 ? 84 : i % 2 === 0 ? 66 : i % 3 === 0 ? 52 : 42;
      const r1 = 34;
      const r2 = r1 + len;
      rays.push({
        x1: cx + r1 * Math.cos(rad),
        y1: cy + r1 * Math.sin(rad),
        x2: cx + r2 * Math.cos(rad),
        y2: cy + r2 * Math.sin(rad),
        opacity: i % 4 === 0 ? 0.92 : i % 2 === 0 ? 0.72 : 0.45,
        strokeWidth: i % 4 === 0 ? 0.95 : i % 2 === 0 ? 0.7 : 0.45,
      });
    }
    return rays;
  }, []);

  return (
    <g id="moonGateNuannianScreen">
      {/* ── 1. 月洞门外圈上方精致的木质斜角花格窗棂 (Top Outer Corner Lattice Windows) ── */}
      {/* 左上方弧形花格窗 */}
      <path
        d="M 52 165 A 162 162 0 0 1 155 42 L 155 22 L 38 22 L 38 165 Z"
        fill="url(#chineseDiagonalLattice)"
        stroke={timeOfDay === 'night' ? '#443b32' : '#baad9b'}
        strokeWidth="2.5"
      />
      {/* 右上方弧形花格窗 */}
      <path
        d="M 368 165 A 162 162 0 0 0 265 42 L 265 22 L 382 22 L 382 165 Z"
        fill="url(#chineseDiagonalLattice)"
        stroke={timeOfDay === 'night' ? '#443b32' : '#baad9b'}
        strokeWidth="2.5"
      />

      {/* ── 2. 暖念墙竖向直通基柱 (Nuannian Pedestal Base 贯穿落地) ── */}
      <path
        d="M 68 220 Q 126 295 126 345 L 126 720 L 294 720 L 294 345 Q 294 295 352 220 Z"
        fill="url(#sandstoneBaseGrad)"
        stroke={timeOfDay === 'night' ? '#3d342a' : '#b8ac99'}
        strokeWidth="2.5"
      />
      {/* 立柱左右内嵌浮雕阴影线与高光线 */}
      <line x1="132" y1="345" x2="132" y2="718" stroke={timeOfDay === 'night' ? '#251f18' : '#a29480'} strokeWidth="1.5" opacity="0.7" />
      <line x1="135" y1="345" x2="135" y2="718" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
      <line x1="288" y1="345" x2="288" y2="718" stroke={timeOfDay === 'night' ? '#251f18' : '#a29480'} strokeWidth="1.5" opacity="0.7" />
      <line x1="285" y1="345" x2="285" y2="718" stroke="#ffffff" strokeWidth="1" opacity="0.5" />

      {/* ── 3. 月亮门立体外圆框 (Moon Gate Round Frame) ── */}
      <circle cx="210" cy="190" r="160" fill="none" stroke="url(#sandstoneFrameGrad)" strokeWidth="17" />
      <circle
        cx="210" cy="190" r="169"
        fill="none" stroke={timeOfDay === 'night' ? '#251f18' : '#a39582'}
        strokeWidth="2.5" opacity="0.8"
      />
      <circle cx="210" cy="190" r="151.5" fill="none" stroke="#ffffff" strokeWidth="1.8" opacity="0.6" />
      <circle cx="210" cy="190" r="147.5" fill="none" stroke={timeOfDay === 'night' ? '#2c251e' : '#8e8271'} strokeWidth="2.5" />

      {/* ── 4. 月洞门内景：日轮万道金芒与水墨远山画卷 (Sacred Landscape Painting) ── */}
      <g clipPath="url(#moonWindowClip)">
        {/* 纯净天空底色 */}
        <rect x="50" y="30" width="320" height="320" fill="url(#moonSkyGrad)" />

        {/* 金日与放射万道日光线 (Golden Sunburst Rays) */}
        <g id="sunburstRaysGroup">
          <circle cx="210" cy="155" r="115" fill="url(#sunGlowAura)" />
          {sunburstRays.map((ray, i) => (
            <line
              key={i}
              x1={ray.x1}
              y1={ray.y1}
              x2={ray.x2}
              y2={ray.y2}
              stroke={timeOfDay === 'night' ? '#e2b34a' : i % 2 === 0 ? '#caa262' : '#e6c387'}
              strokeWidth={ray.strokeWidth}
              opacity={ray.opacity * (masterOn ? 1 : 0.4)}
            />
          ))}
          {/* 金日耀白核心 */}
          <circle cx="210" cy="155" r="38" fill="url(#sunCoreGrad)" />
          <circle cx="210" cy="155" r="25" fill="#ffffff" opacity="0.95" filter="blur(1.5px)" />
        </g>

        {/* 4 重远近泼墨山峦 (Ink-wash Mountain Ranges) */}
        {/* 第 1 层：最远山 (淡雅微灰，若隐若现) */}
        <path
          d="M 50 255 Q 95 215 140 228 Q 185 205 230 224 Q 280 202 325 238 Q 355 220 370 248 L 370 340 L 50 340 Z"
          fill="url(#inkMountainGrad1)"
          opacity="0.7"
        />

        {/* 第 2 层：中山 (轻柔起伏，山峦连绵) */}
        <path
          d="M 50 274 Q 110 238 165 254 Q 220 230 270 260 Q 320 235 370 282 L 370 340 L 50 340 Z"
          fill="url(#inkMountainGrad2)"
          opacity="0.85"
        />

        {/* 第 3 层：近山 (水墨苍翠，骨法用笔) */}
        <path
          d="M 50 292 Q 100 264 145 275 Q 195 252 245 280 Q 295 260 370 306 L 370 340 L 50 340 Z"
          fill="url(#inkMountainGrad3)"
          opacity="0.92"
        />

        {/* 第 4 层：前景山 (沉稳托底) */}
        <path
          d="M 50 314 Q 130 280 210 304 Q 290 270 370 316 L 370 340 L 50 340 Z"
          fill="url(#inkMountainGrad4)"
        />

        {/* 缥缈云雾带 */}
        <path
          d="M 50 278 Q 210 262 370 282 L 370 296 Q 210 280 50 296 Z"
          fill="#ffffff"
          opacity="0.32"
          filter="blur(3.5px)"
        />

        {/* 山峦前景处题字标识：INSERT PORTRAIT HERE */}
        <text
          x="210"
          y="282"
          textAnchor="middle"
          fill={timeOfDay === 'night' ? '#c7baa6' : '#5a4f42'}
          fontSize="10.5"
          letterSpacing="0.22em"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="500"
          opacity="0.8"
        >
          INSERT PORTRAIT HERE
        </text>
      </g>

      {/* ── 5. 暖念墙立柱正中题字 (正中典雅镌刻，唯一呈现) ── */}
      <g transform="translate(210, 412)">
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fill={timeOfDay === 'night' ? '#c7baa6' : '#453528'}
          fontSize="22"
          fontWeight="600"
          fontFamily="'Songti SC', 'Source Han Serif SC', 'SimSun', serif"
          letterSpacing="0.34em"
        >
          暖 念 墙
        </text>
        <text
          x="0"
          y="25"
          textAnchor="middle"
          fill={timeOfDay === 'night' ? '#9e9180' : '#6b5a4b'}
          fontSize="9.5"
          fontWeight="400"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.22em"
        >
          WARMTH & BLESSING
        </text>
      </g>
    </g>
  );
};
