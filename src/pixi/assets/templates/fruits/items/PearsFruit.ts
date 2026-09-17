/**
 * @file PearsFruit.ts
 * @description 金秋瑞果 · 秋月梨（花好月圆） 纯 SVG 模板数据。
 */

export const metadata = {
  title: "金秋瑞果 · 秋月梨（花好月圆）",
  nextName: "平安红苹果",
};

export const renderDefs = (): string => `
{/* 1. 秋月梨金砂暖褐主渐变 (浅金黄 -> 蜜糖金 -> 暖金褐 -> 润栗褐) */}
      <radialGradient id="qiuyuePearSkinGrad" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#fef9c3" />
        <stop offset="20%" stop-color="#fef08a" />
        <stop offset="42%" stop-color="#facc15" />
        <stop offset="68%" stop-color="#eab308" />
        <stop offset="85%" stop-color="#ca8a04" />
        <stop offset="95%" stop-color="#a16207" />
        <stop offset="100%" stop-color="#713f12" />
      </radialGradient>

      {/* 2. 后排背阴暗面金褐渐变 */}
      <radialGradient id="qiuyuePearDarkGrad" cx="35%" cy="28%" r="68%">
        <stop offset="0%" stop-color="#fde047" />
        <stop offset="30%" stop-color="#eab308" />
        <stop offset="65%" stop-color="#a16207" />
        <stop offset="88%" stop-color="#78350f" />
        <stop offset="100%" stop-color="#451a03" />
      </radialGradient>

      {/* 3. 梗洼深陷阴影 (Funnel Stem Cavity) */}
      <radialGradient id="pearCavityGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#3d1a04" stop-opacity="0.95" />
        <stop offset="50%" stop-color="#713f12" stop-opacity="0.75" />
        <stop offset="85%" stop-color="#a16207" stop-opacity="0.3" />
        <stop offset="100%" stop-color="#ca8a04" stop-opacity="0" />
      </radialGradient>

      {/* 4. 砂梨特色金沙果点纹理 (Russet Lenticels Pattern) */}
      <pattern id="pearSandDots" width="10" height="10" patternUnits="userSpaceOnUse">
        {/* 细密淡金白色微点 */}
        <circle cx="2" cy="2" r="0.35" fill="#ffffff" opacity="0.6" />
        <circle cx="7" cy="3" r="0.4" fill="#fef9c3" opacity="0.5" />
        <circle cx="4" cy="7" r="0.3" fill="#ffffff" opacity="0.55" />
        <circle cx="8.5" cy="8" r="0.45" fill="#fef08a" opacity="0.5" />
        {/* 微深砂褐点 */}
        <circle cx="2.5" cy="6" r="0.38" fill="#713f12" opacity="0.35" />
        <circle cx="6.5" cy="6" r="0.32" fill="#78350f" opacity="0.3" />
        <circle cx="5" cy="1.5" r="0.3" fill="#854d0e" opacity="0.3" />
      </pattern>

      {/* 5. 饱满浑圆漫反射柔光高光 */}
      <radialGradient id="pearHighlightGlow" cx="32%" cy="28%" r="45%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.65" />
        <stop offset="35%" stop-color="#fef9c3" stop-opacity="0.35" />
        <stop offset="70%" stop-color="#fef08a" stop-opacity="0.1" />
        <stop offset="100%" stop-color="#eab308" stop-opacity="0" />
      </radialGradient>

      {/* 6. 木质粗壮果梗渐变 */}
      <linearGradient id="pearWoodStemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#854d0e" />
        <stop offset="30%" stop-color="#542b08" />
        <stop offset="70%" stop-color="#3d1a04" />
        <stop offset="100%" stop-color="#290f02" />
      </linearGradient>

      {/* 7. 深翠卵圆梨叶渐变 */}
      <linearGradient id="pearLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#86efac" />
        <stop offset="25%" stop-color="#22c55e" />
        <stop offset="65%" stop-color="#15803d" />
        <stop offset="100%" stop-color="#064e3b" />
      </linearGradient>

      {/* 8. 盘底接触深影 */}
      <radialGradient id="pearPlateOcclusion" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#3d1a04" stop-opacity="0.85" />
        <stop offset="60%" stop-color="#713f12" stop-opacity="0.35" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
`.trim();

export const renderContent = (): string => `
<g id="qiuyuePearFruitGroup">
        {/* ── 0. 盘底接地深影 ── */}
        <ellipse cx="54" cy="56.5" rx="32" ry="6.8" fill="url(#pearPlateOcclusion)" />

        {/* ── 1. 衬底翡翠细齿梨叶 (Oval Pear Leaves with Fine Serrations) ── */}
        <g id="pearLeaves">
          {/* 左后微卷大梨叶 */}
          <path
            d="M 28 42 C 16 35, 12 22, 14 10 C 24 14, 34 26, 38 39 Z"
            fill="url(#pearLeafGrad)"
            stroke="#064e3b"
            stroke-width="0.38"
            opacity="0.92"
          />
          {/* 主叶脉与细侧脉 */}
          <path d="M 18 16 Q 26 27 34 38" stroke="#dcfce7" stroke-width="0.45" fill="none" opacity="0.8" />
          <path d="M 22 22 Q 25 20 29 22" stroke="#dcfce7" stroke-width="0.3" fill="none" opacity="0.55" />
          <path d="M 25 28 Q 28 26 32 29" stroke="#dcfce7" stroke-width="0.3" fill="none" opacity="0.55" />
          {/* 叶尖晶莹晨露 */}
          <circle cx="15" cy="13" r="1.1" fill="#ffffff" opacity="0.8" />
          <circle cx="15" cy="13" r="0.45" fill="#38bdf8" opacity="0.9" />

          {/* 右侧微露嫩梨叶 */}
          <path
            d="M 72 44 C 82 38, 88 28, 90 18 C 82 20, 74 30, 68 40 Z"
            fill="url(#pearLeafGrad)"
            stroke="#064e3b"
            stroke-width="0.35"
            opacity="0.88"
          />
          <path d="M 85 23 Q 78 30 71 39" stroke="#dcfce7" stroke-width="0.4" fill="none" opacity="0.75" />
        </g>

        {/* ── 2. 底层左后秋月梨 (Pear 1 - 稳健坐镇左后) ── */}
        {renderPear(37, 43, 14.2, 12.2, -6, true, -1)}

        {/* ── 3. 底层右后秋月梨 (Pear 2 - 舒展落座右后) ── */}
        {renderPear(68, 43, 14.0, 12.0, 8, true, 1)}

        {/* ── 4. 前排核心尊崇秋月大梨 (Pear 3 - 雍容巨圆，如月当空，正对观者) ── */}
        {renderPear(53, 46, 15.6, 13.5, 0, false, 1)}

        {/* ── 5. 盘沿金黄温润反光 ── */}
        <path d="M 34 54 Q 52 58 68 54" stroke="#fde047" stroke-width="0.8" fill="none" opacity="0.45" pointer-events="none" />
      </g>
`.trim();
