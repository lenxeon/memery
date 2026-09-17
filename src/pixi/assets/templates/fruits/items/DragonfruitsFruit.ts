/**
 * @file DragonfruitsFruit.ts
 * @description 祥瑞供果 · 火龙果（鸿运当头） 纯 SVG 模板数据。
 */

export const metadata = {
  title: "祥瑞供果 · 火龙果（鸿运当头）",
  nextName: "平安红富士苹果",
};

export const renderDefs = (): string => `
{/* 1. 火龙果修长金红紫主体渐变 (娇艳玫红洋红至浓郁暗紫红) */}
      <radialGradient id="dragonFruitBodyGrad" cx="38%" cy="28%" r="68%">
        <stop offset="0%" stop-color="#fecdd3" />
        <stop offset="16%" stop-color="#fb7185" />
        <stop offset="42%" stop-color="#e11d48" />
        <stop offset="72%" stop-color="#be123c" />
        <stop offset="90%" stop-color="#881337" />
        <stop offset="100%" stop-color="#4c0519" />
      </radialGradient>

      {/* 2. 龙鳞外翘萼片渐变 (基部浓艳玫红，向尖梢转为鲜亮柠檬黄绿反卷) */}
      <linearGradient id="dragonScaleGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#9f1239" />
        <stop offset="35%" stop-color="#e11d48" />
        <stop offset="70%" stop-color="#facc15" />
        <stop offset="100%" stop-color="#65a30d" />
      </linearGradient>

      {/* 3. 后景翻卷龙鳞阴影渐变 */}
      <linearGradient id="dragonScaleBackGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#4c0519" />
        <stop offset="50%" stop-color="#881337" />
        <stop offset="85%" stop-color="#ca8a04" />
        <stop offset="100%" stop-color="#4d7c0f" />
      </linearGradient>

      {/* 4. 瘦长果身天鹅绒高光 */}
      <radialGradient id="dragonVelvetSheen" cx="36%" cy="26%" r="55%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55" />
        <stop offset="35%" stop-color="#ffe4e6" stop-opacity="0.25" />
        <stop offset="75%" stop-color="#f43f5e" stop-opacity="0.05" />
        <stop offset="100%" stop-color="#be123c" stop-opacity="0" />
      </radialGradient>

      {/* 5. 盘底接触深影 */}
      <radialGradient id="dragonPlateOcclusion" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#2c0612" stop-opacity="0.85" />
        <stop offset="60%" stop-color="#4c0519" stop-opacity="0.35" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
`.trim();

export const renderContent = (): string => `
<g id="dragonfruitGroup">
        {/* ── 0. 盘底接触深影 ── */}
        <ellipse cx="54" cy="56.5" rx="24" ry="6.0" fill="url(#dragonPlateOcclusion)" />

        {/* ── 1. 后层向上向外舒展的顶冠龙鳞尖 (Back Crown Scales) ── */}
        <g id="dragonScalesBack">
          {/* 顶后左上冲天鳞 */}
          <path
            d="M 47 10 C 40 5, 33 2, 28 0 C 33 5, 42 10, 48 13 Z"
            fill="url(#dragonScaleBackGrad)"
            stroke="#4c0519"
            stroke-width="0.35"
          />
          {/* 顶冲龙角鳞 (中央最高顶尖) */}
          <path
            d="M 52 8 C 52 3, 53 -1, 55 -2 C 57 -1, 57 3, 56 9 Z"
            fill="url(#dragonScaleBackGrad)"
            stroke="#4c0519"
            stroke-width="0.35"
          />
          {/* 顶后右上冲天鳞 */}
          <path
            d="M 60 9 C 66 4, 73 1, 79 -1 C 75 4, 67 9, 62 13 Z"
            fill="url(#dragonScaleBackGrad)"
            stroke="#4c0519"
            stroke-width="0.35"
          />

          {/* 左侧中高位微展鳞 */}
          <path
            d="M 37 20 C 30 15, 23 12, 19 11 C 24 16, 31 22, 38 25 Z"
            fill="url(#dragonScaleBackGrad)"
            stroke="#4c0519"
            stroke-width="0.35"
          />
          {/* 右侧中高位微展鳞 */}
          <path
            d="M 70 20 C 77 15, 84 12, 89 11 C 84 16, 77 22, 70 25 Z"
            fill="url(#dragonScaleBackGrad)"
            stroke="#4c0519"
            stroke-width="0.35"
          />

          {/* 左侧中部向外翻卷鳞 */}
          <path
            d="M 35 32 C 27 27, 21 26, 17 26 C 22 30, 29 35, 36 38 Z"
            fill="url(#dragonScaleBackGrad)"
            stroke="#4c0519"
            stroke-width="0.35"
          />
          {/* 右侧中部向外翻卷鳞 */}
          <path
            d="M 72 32 C 80 27, 86 26, 91 26 C 86 30, 79 35, 72 38 Z"
            fill="url(#dragonScaleBackGrad)"
            stroke="#4c0519"
            stroke-width="0.35"
          />
        </g>

        {/* ── 2. 瘦长高大椭圆形主果身 (Slender Prolate Spheroid Body) ── */}
        <g id="dragonFruitBody">
          {/* 纵向高度达到 52px (从 y=5 到 y=57)，横向仅宽 37px，呈现显著的修长水滴长椭圆 */}
          <path
            d="M 48 6 
               C 51 4.5, 57 4.5, 60 6 
               C 68 8.5, 73 17, 74 28 
               C 75 40, 71 50, 64 54.5 
               C 60 57, 48 57, 44 54.5 
               C 37 50, 33 40, 34 28 
               C 35 17, 40 8.5, 48 6 Z"
            fill="url(#dragonFruitBodyGrad)"
            stroke="#881337"
            stroke-width="0.4"
          />

          {/* 瘦长果身柔润天鹅绒光晕 */}
          <ellipse cx="48" cy="28" rx="12" ry="21" fill="url(#dragonVelvetSheen)" transform="rotate(-4, 48, 28)" />
          {/* 顶部微高光 */}
          <ellipse cx="53" cy="11" rx="4.5" ry="2.2" fill="#ffffff" opacity="0.45" />
        </g>

        {/* ── 3. 前排贴合升腾的肉质龙鳞群 (Front Bract Scales - 纵向修长分布) ── */}
        <g id="dragonScalesFront">
          {/* 【下底排左鳞】 */}
          <path
            d="M 39 50 C 32 47, 25 47, 21 47 C 26 50, 34 53, 41 53 Z"
            fill="url(#dragonScaleGrad)"
            stroke="#881337"
            stroke-width="0.35"
          />
          {/* 【下底排右鳞】 */}
          <path
            d="M 69 50 C 76 47, 83 47, 87 47 C 82 50, 74 53, 67 53 Z"
            fill="url(#dragonScaleGrad)"
            stroke="#881337"
            stroke-width="0.35"
          />

          {/* 【中下排左鳞】 */}
          <path
            d="M 37 41 C 30 35, 24 33, 20 32 C 25 37, 32 41, 39 44 Z"
            fill="url(#dragonScaleGrad)"
            stroke="#881337"
            stroke-width="0.38"
          />
          <path d="M 36 41 Q 26 35 21 33" stroke="#fef08a" stroke-width="0.35" fill="none" opacity="0.8" />

          {/* 【中下排右鳞】 */}
          <path
            d="M 70 41 C 77 35, 83 33, 88 32 C 83 37, 75 41, 68 44 Z"
            fill="url(#dragonScaleGrad)"
            stroke="#881337"
            stroke-width="0.38"
          />
          <path d="M 70 41 Q 80 35 86 33" stroke="#fef08a" stroke-width="0.35" fill="none" opacity="0.8" />

          {/* 【腹心主翻卷龙鳞 1】修长如火舌昂扬升腾 */}
          <path
            d="M 45 44 C 44 33, 46 24, 49 19 C 52 25, 54 34, 53 45 C 50 46, 47 46, 45 44 Z"
            fill="url(#dragonScaleGrad)"
            stroke="#881337"
            stroke-width="0.4"
          />
          <path d="M 48 43 Q 48 30 49 20" stroke="#fef08a" stroke-width="0.45" fill="none" opacity="0.85" />

          {/* 【腹心主翻卷龙鳞 2】右偏昂扬向右上翻翘 */}
          <path
            d="M 54 43 C 58 33, 63 25, 68 21 C 67 28, 64 37, 60 45 C 58 45, 55 44, 54 43 Z"
            fill="url(#dragonScaleGrad)"
            stroke="#881337"
            stroke-width="0.4"
          />
          <path d="M 57 42 Q 62 31 67 22" stroke="#fef08a" stroke-width="0.45" fill="none" opacity="0.85" />

          {/* 【中上部左侧翻卷鳞】 */}
          <path
            d="M 40 28 C 34 20, 27 17, 23 16 C 28 21, 35 26, 42 30 Z"
            fill="url(#dragonScaleGrad)"
            stroke="#881337"
            stroke-width="0.38"
          />
          <path d="M 39 28 Q 30 21 24 17" stroke="#fef08a" stroke-width="0.35" fill="none" opacity="0.8" />

          {/* 【中上部右侧翻卷鳞】 */}
          <path
            d="M 66 29 C 72 21, 80 18, 84 17 C 79 22, 72 27, 64 31 Z"
            fill="url(#dragonScaleGrad)"
            stroke="#881337"
            stroke-width="0.38"
          />
          <path d="M 67 29 Q 76 21 82 18" stroke="#fef08a" stroke-width="0.35" fill="none" opacity="0.8" />

          {/* 【顶冠聚拢微聚小火苗鳞】 */}
          <path
            d="M 49 16 C 48 10, 49 5, 52 2 C 54 6, 54 11, 53 16 Z"
            fill="url(#dragonScaleGrad)"
            stroke="#881337"
            stroke-width="0.35"
          />
          <path
            d="M 55 16 C 57 11, 59 6, 61 3 C 60 8, 58 12, 57 16 Z"
            fill="url(#dragonScaleGrad)"
            stroke="#881337"
            stroke-width="0.35"
          />
        </g>

        {/* ── 4. 白玉描金盘前沿反光 ── */}
        <g id="dragonDishReflection" pointer-events="none">
          <path d="M 34 54 Q 52 58 68 54" stroke="#fef08a" stroke-width="0.8" fill="none" opacity="0.4" />
        </g>
      </g>
`.trim();
