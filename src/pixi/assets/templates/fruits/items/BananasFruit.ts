/**
 * @file BananasFruit.ts
 * @description 招财供果 · 香蕉（金条纳福） 纯 SVG 模板数据。
 */

export const metadata = {
  title: "招财供果 · 香蕉（金条纳福）",
  nextName: "翡翠青桔",
};

export const renderDefs = (): string => `
{/* 1. 肥厚黄金香蕉主体渐变 (明快金黄至丰满熟成橙金，肉感十足) */}
      <linearGradient id="bananaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fef08a" />
        <stop offset="30%" stop-color="#fde047" />
        <stop offset="65%" stop-color="#eab308" />
        <stop offset="88%" stop-color="#ca8a04" />
        <stop offset="100%" stop-color="#92400e" />
      </linearGradient>

      {/* 2. 粗硕蕉身饱满背棱宽阔高光 */}
      <linearGradient id="bananaPlumpRidge" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85" />
        <stop offset="35%" stop-color="#fef9c3" stop-opacity="0.65" />
        <stop offset="70%" stop-color="#fde047" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#ca8a04" stop-opacity="0" />
      </linearGradient>

      {/* 3. 后排香蕉深厚阴影渐变 */}
      <linearGradient id="bananaBackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#d97706" />
        <stop offset="50%" stop-color="#b45309" />
        <stop offset="85%" stop-color="#78350f" />
        <stop offset="100%" stop-color="#451a03" />
      </linearGradient>

      {/* 4. 厚实墨绿蕉柄 */}
      <linearGradient id="bananaStemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#a3e635" />
        <stop offset="35%" stop-color="#4d7c0f" />
        <stop offset="75%" stop-color="#1e3a10" />
        <stop offset="100%" stop-color="#14290a" />
      </linearGradient>

      {/* 5. 盘底接触深影 */}
      <radialGradient id="bananaPlateOcclusion" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#291202" stop-opacity="0.85" />
        <stop offset="60%" stop-color="#451a03" stop-opacity="0.35" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
`.trim();

export const renderContent = (): string => `
<g id="bananasGroup">
        {/* ── 0. 盘心托底深影 ── */}
        <ellipse cx="54" cy="56.5" rx="30" ry="6.5" fill="url(#bananaPlateOcclusion)" />

        {/* ── 1. 后排丰硕粗壮香蕉 (Back Layer - 饱满大蕉身，绝非细条) ── */}
        <g id="bananaBackPlumpLayer">
          {/* 后大蕉 1 (上方大高拱) */}
          <path
            d="M 30 27 C 42 12, 60 10, 76 13 C 82 14, 85 18, 80 20 C 66 22, 50 24, 38 34 Z"
            fill="url(#bananaBackGrad)"
          />
          {/* 后大蕉 2 (右后粗硕外展) */}
          <path
            d="M 36 34 C 52 20, 72 18, 88 22 C 92 23, 93 28, 86 30 C 72 31, 56 34, 44 42 Z"
            fill="url(#bananaBackGrad)"
          />
        </g>

        {/* ── 2. 前景三根极其粗壮、饱满肥硕的大香蕉 (Plump Golden Bananas) ── */}
        <g id="bananaFrontPlumpLayer">
          {/* 【大香蕉 1: 上排主蕉，体态肥厚粗壮，圆弧饱满】 */}
          <g id="bananaMain1">
            <path
              d="M 28 30 
                 C 40 16, 62 14, 78 20 
                 C 86 23, 91 29, 93 35 
                 C 91 38, 85 38, 81 33 
                 C 68 25, 50 25, 36 36 
                 C 30 41, 26 40, 24 35 Z"
              fill="url(#bananaGoldGrad)"
              stroke="#a16207"
              stroke-width="0.4"
            />
            {/* 宽阔宽弧脊线高光 */}
            <path d="M 33 27 C 47 18, 66 18, 80 24" stroke="url(#bananaPlumpRidge)" stroke-width="1.8" fill="none" stroke-linecap="round" />
            <path d="M 36 29 C 48 21, 64 21, 76 26" stroke="#ffffff" stroke-width="0.8" fill="none" opacity="0.6" stroke-linecap="round" />
            {/* 蕉尖粗钝黑褐色花柱残痕 */}
            <path d="M 91 33 L 94 35 L 92 37 Z" fill="#3f1a04" />
          </g>

          {/* 【大香蕉 2: 中间最肥硕肉嘟嘟的大金蕉，横卧盘心，粗壮肥美】 */}
          <g id="bananaMain2">
            <path
              d="M 24 37 
                 C 38 27, 60 26, 78 31 
                 C 88 34, 94 41, 96 46 
                 C 94 49, 88 49, 82 44 
                 C 68 36, 48 35, 33 46 
                 C 27 50, 22 47, 21 41 Z"
              fill="url(#bananaGoldGrad)"
              stroke="#a16207"
              stroke-width="0.4"
            />
            {/* 宽阔饱满高光带 */}
            <path d="M 31 36 C 48 29, 68 29, 84 37" stroke="url(#bananaPlumpRidge)" stroke-width="2.2" fill="none" stroke-linecap="round" />
            <path d="M 35 38 C 50 32, 67 32, 80 39" stroke="#ffffff" stroke-width="0.9" fill="none" opacity="0.65" stroke-linecap="round" />
            {/* 蕉尖残痕 */}
            <path d="M 94 44 L 97 46 L 95 48 Z" fill="#3f1a04" />
            {/* 零星成熟芝麻细点 */}
            <circle cx="58" cy="34" r="0.6" fill="#78350f" opacity="0.55" />
            <circle cx="62" cy="36" r="0.7" fill="#78350f" opacity="0.55" />
            <circle cx="73" cy="39" r="0.6" fill="#78350f" opacity="0.55" />
          </g>

          {/* 【大香蕉 3: 底排垫底大肥蕉，厚实沉稳托于白玉盘面】 */}
          <g id="bananaMain3">
            <path
              d="M 23 45 
                 C 38 41, 58 40, 74 45 
                 C 82 48, 88 53, 90 56 
                 C 88 58, 82 58, 77 54 
                 C 64 48, 46 48, 32 54 
                 C 26 56, 21 53, 20 48 Z"
              fill="url(#bananaGoldGrad)"
              stroke="#a16207"
              stroke-width="0.4"
            />
            {/* 高光 */}
            <path d="M 32 46 C 48 43, 64 44, 78 50" stroke="url(#bananaPlumpRidge)" stroke-width="1.8" fill="none" stroke-linecap="round" />
            <path d="M 88 54 L 91 56 L 89 57 Z" fill="#3f1a04" />
          </g>
        </g>

        {/* ── 3. 左侧聚拢的厚实墨绿蕉柄 (Thick Banana Crown) ── */}
        <g id="bananaCrown">
          <path
            d="M 14 36 C 20 30, 26 31, 28 37 C 28 45, 26 52, 21 54 C 15 54, 12 48, 13 42 Z"
            fill="url(#bananaStemGrad)"
            stroke="#14290a"
            stroke-width="0.45"
          />
          {/* 顶端平滑木质横截面 */}
          <ellipse cx="20" cy="33" rx="5" ry="3" fill="#84cc16" stroke="#365314" stroke-width="0.4" transform="rotate(-15, 20, 33)" />
          <ellipse cx="20" cy="33" rx="2.5" ry="1.4" fill="#4d7c0f" opacity="0.6" transform="rotate(-15, 20, 33)" />
        </g>

        {/* ── 4. 白玉描金盘前沿反光 ── */}
        <g id="bananaDishReflection" pointer-events="none">
          <path d="M 34 54 Q 52 58 68 54" stroke="#fef08a" stroke-width="0.8" fill="none" opacity="0.4" />
        </g>
      </g>
`.trim();
