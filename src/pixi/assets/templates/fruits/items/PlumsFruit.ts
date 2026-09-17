/**
 * @file PlumsFruit.ts
 * @description 清供名果 · 蜂糖李（甜甜蜜蜜） 纯 SVG 模板数据。
 */

export const metadata = {
  title: "清供名果 · 蜂糖李（甜甜蜜蜜）",
  nextName: "果后山竹",
};

export const renderDefs = (): string => `
{/* 1. 蜂糖李通透金蜜主色渐变 (凝脂蜜蜡黄至温润琥珀金) */}
      <radialGradient id="honeyPlumSkinGrad" cx="36%" cy="32%" r="68%">
        <stop offset="0%" stop-color="#fefce8" />
        <stop offset="20%" stop-color="#fef08a" />
        <stop offset="45%" stop-color="#fde047" />
        <stop offset="70%" stop-color="#facc15" />
        <stop offset="88%" stop-color="#f59e0b" />
        <stop offset="100%" stop-color="#d97706" />
      </radialGradient>

      {/* 2. 后排深色蜜金渐变 (背阴暗面) */}
      <radialGradient id="honeyPlumDarkGrad" cx="38%" cy="32%" r="65%">
        <stop offset="0%" stop-color="#fef08a" />
        <stop offset="30%" stop-color="#facc15" />
        <stop offset="65%" stop-color="#d97706" />
        <stop offset="90%" stop-color="#b45309" />
        <stop offset="100%" stop-color="#78350f" />
      </radialGradient>

      {/* 3. 向阳果肩暖杏红霞红晕 (Honey Apricot Blush) */}
      <radialGradient id="honeyPlumBlush" cx="35%" cy="30%" r="50%">
        <stop offset="0%" stop-color="#fb923c" stop-opacity="0.7" />
        <stop offset="40%" stop-color="#f97316" stop-opacity="0.4" />
        <stop offset="80%" stop-color="#ea580c" stop-opacity="0.1" />
        <stop offset="100%" stop-color="#c2410c" stop-opacity="0" />
      </radialGradient>

      {/* 4. 蜂糖李表皮天然白霜薄雾 (Delicate Fruit Bloom Sheen) */}
      <radialGradient id="honeyPlumBloomFrost" cx="35%" cy="30%" r="55%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85" />
        <stop offset="35%" stop-color="#fef9c3" stop-opacity="0.5" />
        <stop offset="70%" stop-color="#fde047" stop-opacity="0.18" />
        <stop offset="100%" stop-color="#eab308" stop-opacity="0" />
      </radialGradient>

      {/* 5. 鲜活李叶渐变 */}
      <linearGradient id="plumLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#86efac" />
        <stop offset="35%" stop-color="#22c55e" />
        <stop offset="80%" stop-color="#15803d" />
        <stop offset="100%" stop-color="#064e3b" />
      </linearGradient>

      {/* 6. 盘底接触深影 */}
      <radialGradient id="plumPlateOcclusion" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#451a03" stop-opacity="0.85" />
        <stop offset="60%" stop-color="#78350f" stop-opacity="0.35" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
`.trim();

export const renderContent = (): string => `
<g id="honeyPlumsFruitGroup">
        {/* ── 0. 盘底接地深影 ── */}
        <ellipse cx="54" cy="56.5" rx="32" ry="6.8" fill="url(#plumPlateOcclusion)" />

        {/* ── 1. 顶层衬托翡翠小李叶 ── */}
        <g id="plumFoliage">
          {/* 左侧向外斜展李叶 */}
          <path
            d="M 52 24 C 44 18, 35 18, 29 23 C 33 28, 42 29, 50 26 Z"
            fill="url(#plumLeafGrad)"
            stroke="#064e3b"
            stroke-width="0.35"
          />
          <path d="M 51 25 Q 40 22 30 22" stroke="#dcfce7" stroke-width="0.4" fill="none" opacity="0.8" />

          {/* 右侧微卷小李叶 */}
          <path
            d="M 55 23 C 62 16, 72 17, 78 22 C 73 26, 64 27, 56 25 Z"
            fill="url(#plumLeafGrad)"
            stroke="#064e3b"
            stroke-width="0.35"
          />
          <path d="M 56 24 Q 66 21 76 21" stroke="#dcfce7" stroke-width="0.4" fill="none" opacity="0.8" />
        </g>

        {/* ── 2. 底层暗排蜂糖李 (Back Layer - 稳稳落座) ── */}
        <g id="plumsBackLayer">
          {renderPlum(34, 46, 9.5, -12, true)}
          {renderPlum(72, 46, 9.5, 15, true)}
          {renderPlum(42, 36, 9.0, -8, true)}
          {renderPlum(64, 36, 9.0, 10, true)}
        </g>

        {/* ── 3. 中层与前排黄金熟李 (Front Main Layer - 蜜润如脂) ── */}
        <g id="plumsFrontLayer">
          {/* 左前李 */}
          {renderPlum(38, 51, 10.0, -6, false, true)}
          {/* 右前李 */}
          {renderPlum(68, 51, 10.0, 8, false, true)}
          {/* 核心中位大蜂糖李 */}
          {renderPlum(53, 49, 10.8, 2, false, true)}
          {/* 金字塔顶端明珠李 */}
          {renderPlum(53, 30, 9.6, -4, false, true)}
        </g>

        {/* ── 4. 盘沿温润金黄反光 ── */}
        <path d="M 34 54 Q 52 58 68 54" stroke="#fde047" stroke-width="0.8" fill="none" opacity="0.45" pointer-events="none" />
      </g>
`.trim();
