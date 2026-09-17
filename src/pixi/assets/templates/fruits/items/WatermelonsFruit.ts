/**
 * @file WatermelonsFruit.ts
 * @description 盛夏甘霖 · 西瓜（硕果红运） 纯 SVG 模板数据。
 */

export const metadata = {
  title: "盛夏甘霖 · 西瓜（硕果红运）",
  nextName: "南国椰子",
};

export const renderDefs = (): string => `
{/* 1. 整瓜底色渐变 (青翠浅绿至浓润墨绿) */}
      <radialGradient id="melonBodyGrad" cx="42%" cy="35%" r="65%">
        <stop offset="0%" stop-color="#86efac" />
        <stop offset="35%" stop-color="#4ade80" />
        <stop offset="70%" stop-color="#16a34a" />
        <stop offset="90%" stop-color="#15803d" />
        <stop offset="100%" stop-color="#052e16" />
      </radialGradient>

      {/* 2. 整瓜墨黑波浪条纹色 (Dark Wavy Stripes) */}
      <linearGradient id="melonStripeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#14532d" />
        <stop offset="50%" stop-color="#052e16" />
        <stop offset="100%" stop-color="#021f0e" />
      </linearGradient>

      {/* 3. 切片鲜红水嫩瓜瓤渐变 */}
      <radialGradient id="slicePulpGrad" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#f87171" />
        <stop offset="30%" stop-color="#ef4444" />
        <stop offset="70%" stop-color="#dc2626" />
        <stop offset="90%" stop-color="#b91c1c" />
        <stop offset="100%" stop-color="#991b1b" />
      </radialGradient>

      {/* 4. 瓜皮截面过渡 (自翠绿向白玉向浅粉缓冲) */}
      <linearGradient id="sliceRindGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#14532d" />
        <stop offset="35%" stop-color="#22c55e" />
        <stop offset="75%" stop-color="#bbf7d0" />
        <stop offset="95%" stop-color="#fef2f2" />
        <stop offset="100%" stop-color="#fee2e2" />
      </linearGradient>

      {/* 5. 盘底接地深影 */}
      <radialGradient id="melonPlateOcclusion" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#052e16" stop-opacity="0.85" />
        <stop offset="60%" stop-color="#14290a" stop-opacity="0.35" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
`.trim();

export const renderContent = (): string => `
<g id="watermelonsFruitGroup">
        {/* ── 0. 盘底接地深影 ── */}
        <ellipse cx="54" cy="56.5" rx="32" ry="6.8" fill="url(#melonPlateOcclusion)" />

        {/* ── 1. 后排浑圆大西瓜 (Whole Striped Watermelon) ── */}
        <g id="wholeWatermelon">
          {/* 大瓜球主体 */}
          <ellipse cx="50" cy="33" rx="26" ry="24" fill="url(#melonBodyGrad)" stroke="#052e16" stroke-width="0.4" />

          {/* 瓜身纵向波浪锯齿墨绿花纹 (Classic Undulating Watermelon Stripes) */}
          <g id="melonStripes" fill="url(#melonStripeGrad)" opacity="0.88">
            {/* 条纹 1 (左侧边缘) */}
            <path d="M 28 20 Q 25 32 30 46 Q 27 34 26 22 Z" />
            {/* 条纹 2 */}
            <path d="M 35 15 C 33 22, 37 28, 34 36 C 32 42, 38 48, 39 52 C 37 46, 33 40, 35 34 C 38 27, 34 20, 37 14 Z" />
            {/* 条纹 3 */}
            <path d="M 44 11 C 42 19, 46 27, 43 36 C 41 43, 47 49, 48 54 C 45 48, 41 41, 44 33 C 47 25, 43 17, 46 10 Z" />
            {/* 条纹 4 (中央主纹) */}
            <path d="M 52 9 C 54 18, 50 27, 53 37 C 55 44, 52 50, 55 55 C 51 49, 53 42, 51 34 C 48 25, 53 17, 50 9 Z" />
            {/* 条纹 5 */}
            <path d="M 60 11 C 63 20, 59 29, 62 38 C 65 44, 61 50, 63 54 C 60 48, 62 42, 60 35 C 57 26, 62 18, 58 11 Z" />
            {/* 条纹 6 */}
            <path d="M 67 15 C 71 23, 67 31, 70 39 C 72 45, 68 50, 71 52 C 67 47, 69 40, 67 33 C 65 25, 69 19, 65 15 Z" />
            {/* 条纹 7 (右侧边缘) */}
            <path d="M 73 22 Q 76 34 72 46 Q 74 33 71 24 Z" />
          </g>

          {/* 瓜顶微光与果蜡漫射 */}
          <ellipse cx="45" cy="22" rx="14" ry="9" fill="#ffffff" opacity="0.25" transform="rotate(-15, 45, 22)" />
          <ellipse cx="44" cy="19" rx="6" ry="3.5" fill="#ffffff" opacity="0.4" transform="rotate(-15, 44, 19)" />

          {/* 瓜顶瓜蒂与俏皮猪尾巴卷卷须 (Curly Stem) */}
          <g id="melonStem">
            <ellipse cx="50" cy="9.5" rx="2.5" ry="1.2" fill="#052e16" />
            {/* 卷曲嫩绿瓜蔓 */}
            <path
              d="M 50 9.5 
                 C 48 6, 52 3, 56 4 
                 C 59 5, 57 9, 54 8 
                 C 52 7, 54 5, 56 6"
              stroke="#4ade80"
              stroke-width="1.4"
              fill="none"
              stroke-linecap="round"
            />
          </g>
        </g>

        {/* ── 2. 前排横卧一牙鲜切月牙红瓤西瓜 (Juicy Watermelon Slice) ── */}
        <g id="watermelonSlice">
          {/* 瓜皮底层弧 (绿白皮) */}
          <path
            d="M 22 52 
               C 38 61, 68 62, 84 53 
               C 80 50, 52 50, 22 52 Z"
            fill="url(#sliceRindGrad)"
            stroke="#052e16"
            stroke-width="0.4"
          />

          {/* 鲜美多汁红瓜瓤大月牙 (Juicy Ruby Flesh) */}
          <path
            d="M 23 51 
               C 38 59, 68 60, 83 52 
               C 74 42, 54 36, 40 37 
               C 32 38, 26 44, 23 51 Z"
            fill="url(#slicePulpGrad)"
            stroke="#b91c1c"
            stroke-width="0.35"
          />

          {/* 瓜瓤截面沙瓤高光带 */}
          <path
            d="M 28 49 C 40 42, 60 41, 76 48"
            stroke="#fca5a5"
            stroke-width="1.1"
            fill="none"
            opacity="0.6"
            stroke-linecap="round"
          />

          {/* 鲜甜光泽水润反光 */}
          <ellipse cx="48" cy="46" rx="14" ry="5" fill="#ffffff" opacity="0.3" />

          {/* 油润水滴状西瓜黑籽 (Obsidian Seeds) */}
          <g id="melonSeeds">
            {/* 瓜籽 1 */}
            <path d="M 36 46 C 35 44, 37 42, 38 43 C 39 44, 38 47, 36 46 Z" fill="#1c1917" />
            <circle cx="37.2" cy="43.5" r="0.4" fill="#ffffff" opacity="0.8" />

            {/* 瓜籽 2 */}
            <path d="M 45 44 C 44 42, 46 40, 47 41 C 48 42, 47 45, 45 44 Z" fill="#1c1917" />
            <circle cx="46.2" cy="41.5" r="0.4" fill="#ffffff" opacity="0.8" />

            {/* 瓜籽 3 */}
            <path d="M 54 44 C 53 42, 55 40, 56 41 C 57 42, 56 45, 54 44 Z" fill="#1c1917" />
            <circle cx="55.2" cy="41.5" r="0.4" fill="#ffffff" opacity="0.8" />

            {/* 瓜籽 4 */}
            <path d="M 63 46 C 62 44, 64 42, 65 43 C 66 44, 65 47, 63 46 Z" fill="#1c1917" />
            <circle cx="64.2" cy="43.5" r="0.4" fill="#ffffff" opacity="0.8" />

            {/* 瓜籽 5 (边缘小籽) */}
            <path d="M 72 49 C 71 47.5, 72.5 46, 73.5 46.5 C 74 47.5, 73.5 49.5, 72 49 Z" fill="#1c1917" />
            <circle cx="72.8" cy="47" r="0.35" fill="#ffffff" opacity="0.8" />
          </g>
        </g>

        {/* ── 3. 盘沿温润反光 ── */}
        <path d="M 34 54 Q 52 58 68 54" stroke="#f87171" stroke-width="0.8" fill="none" opacity="0.45" pointer-events="none" />
      </g>
`.trim();
