/**
 * @file PomelosFruit.ts
 * @description 吉祥供果 · 金柚（保佑平安） 纯 SVG 模板数据。
 */

export const metadata = {
  title: "吉祥供果 · 金柚（保佑平安）",
  nextName: "富贵龙眼",
};

export const renderDefs = (): string => `
{/* 1. 黄金蜜柚长椭圆主体渐变 (透亮浅黄至温润成熟蜜金，通体丰满高长) */}
      <radialGradient id="pomeloGoldGrad" cx="38%" cy="32%" r="65%">
        <stop offset="0%" stop-color="#fefce8" />
        <stop offset="18%" stop-color="#fef08a" />
        <stop offset="45%" stop-color="#fde047" />
        <stop offset="72%" stop-color="#eab308" />
        <stop offset="92%" stop-color="#ca8a04" />
        <stop offset="100%" stop-color="#854d0e" />
      </radialGradient>

      {/* 2. 柚子饱满长椭圆向阳漫射微光 */}
      <radialGradient id="pomeloWaxySheen" cx="36%" cy="30%" r="52%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55" />
        <stop offset="35%" stop-color="#fef9c3" stop-opacity="0.25" />
        <stop offset="75%" stop-color="#fde047" stop-opacity="0.05" />
        <stop offset="100%" stop-color="#eab308" stop-opacity="0" />
      </radialGradient>

      {/* 3. 鲜活厚实单枚柚叶渐变 */}
      <linearGradient id="pomeloLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#86efac" />
        <stop offset="30%" stop-color="#22c55e" />
        <stop offset="75%" stop-color="#15803d" />
        <stop offset="100%" stop-color="#064e3b" />
      </linearGradient>

      {/* 4. 盘底接触深层阴影 */}
      <radialGradient id="pomeloPlateOcclusion" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#241002" stop-opacity="0.85" />
        <stop offset="60%" stop-color="#451a03" stop-opacity="0.35" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
`.trim();

export const renderContent = (): string => `
<g id="pomelosGroup">
        {/* ── 0. 盘底接触深影 ── */}
        <ellipse cx="54" cy="56.5" rx="26" ry="6" fill="url(#pomeloPlateOcclusion)" />

        {/* ── 1. 黄金蜜柚主体 (高大饱满长椭圆果身，上部钝圆、腰腹圆润、下腹沉稳) ── */}
        <g id="pomeloMain">
          {/* 长椭圆形饱满轮廓，宽度约46，高度从y=8到y=57约49，顶部呈平滑钝圆弧线，绝非尖锐圆锥 */}
          <path
            d="M 46 8 
               C 52 7, 56 7, 62 8 
               C 69 9.5, 75 14, 78 22 
               C 81 30, 80 40, 77 48 
               C 74 54, 66 58, 54 58 
               C 42 58, 34 54, 31 48 
               C 28 40, 27 30, 30 22 
               C 33 14, 39 9.5, 46 8 Z"
            fill="url(#pomeloGoldGrad)"
            stroke="#a16207"
            stroke-width="0.4"
          />

          {/* 椭圆形饱满长身经纬弧线高光 */}
          <path 
            d="M 42 12 C 37 22, 36 36, 39 48" 
            stroke="#ffffff" 
            stroke-width="0.8" 
            fill="none" 
            opacity="0.35" 
            stroke-linecap="round" 
          />

          {/* 饱满长椭圆受光漫反射柔光 */}
          <ellipse cx="44" cy="30" rx="15" ry="20" fill="url(#pomeloWaxySheen)" transform="rotate(-6, 44, 30)" />

          {/* 顶部受光高光 */}
          <ellipse cx="51" cy="13" rx="7" ry="3.5" fill="#ffffff" opacity="0.4" />
        </g>

        {/* ── 2. 顶部精致果蒂与自然斜拂单叶 ── */}
        <g id="pomeloFoliage">
          {/* 果蒂窝凹痕 */}
          <ellipse cx="54" cy="8" rx="3.5" ry="1.4" fill="#854d0e" opacity="0.6" />

          {/* 短小木质果柄 */}
          <path d="M 54 8 C 54.5 5.5, 55 3.5, 56 2" stroke="#542b08" stroke-width="2.2" fill="none" stroke-linecap="round" />
          <path d="M 54 7.5 C 54.5 5, 55 3.5, 55.6 2.2" stroke="#ca8a04" stroke-width="0.6" fill="none" opacity="0.7" stroke-linecap="round" />
          <ellipse cx="56" cy="2" rx="1.1" ry="0.6" fill="#d4b584" stroke="#451a03" stroke-width="0.3" />

          {/* 单枚苍翠柚叶 (斜拂果肩右上方，清秀自然，不抢果实主体) */}
          <path
            d="M 55 7 C 62 4, 71 3, 79 5 C 79 10, 72 14, 63 12 C 58 11, 55 8, 55 7 Z"
            fill="url(#pomeloLeafGrad)"
            stroke="#064e3b"
            stroke-width="0.35"
          />
          <path d="M 56 7 Q 67 6 77 6" stroke="#dcfce7" stroke-width="0.4" fill="none" opacity="0.75" />
          <path d="M 64 7 Q 66 9 68 11" stroke="#dcfce7" stroke-width="0.3" fill="none" opacity="0.5" />
        </g>

        {/* ── 3. 白玉描金盘前沿反光 ── */}
        <g id="pomeloReflection" pointer-events="none">
          <path d="M 34 54 Q 52 58 68 54" stroke="#fef08a" stroke-width="0.8" fill="none" opacity="0.4" />
        </g>
      </g>
`.trim();
