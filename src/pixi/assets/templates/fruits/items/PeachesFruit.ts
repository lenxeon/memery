/**
 * @file PeachesFruit.ts
 * @description 寿考供果 · 仙桃（福寿延绵） 纯 SVG 模板数据。
 */

export const metadata = {
  title: "寿考供果 · 仙桃（福寿延绵）",
  nextName: "平安苹果",
};

export const renderDefs = (): string => `
{/* 1. 仙桃底色渐变 (羊脂玉白、暖乳浅金，如脂如玉) */}
      <radialGradient id="peachBaseJadeGrad" cx="42%" cy="48%" r="68%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="25%" stop-color="#fffdfa" />
        <stop offset="55%" stop-color="#fefce8" />
        <stop offset="80%" stop-color="#fef08a" />
        <stop offset="100%" stop-color="#fde047" />
      </radialGradient>

      {/* 2. 顶层主仙桃胭脂霞彩分染 (浓郁水蜜桃胭脂朱砂层层晕化) */}
      <radialGradient id="peachTopBlushGrad" cx="48%" cy="18%" r="65%">
        <stop offset="0%" stop-color="#9f1239" />
        <stop offset="16%" stop-color="#be123c" />
        <stop offset="38%" stop-color="#e11d48" />
        <stop offset="60%" stop-color="#f43f5e" />
        <stop offset="78%" stop-color="#fb7185" />
        <stop offset="90%" stop-color="#fbcfe8" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#fecdd3" stop-opacity="0" />
      </radialGradient>

      {/* 3. 左仙桃胭脂渐变 */}
      <radialGradient id="peachLeftBlushGrad" cx="45%" cy="22%" r="65%">
        <stop offset="0%" stop-color="#be123c" />
        <stop offset="25%" stop-color="#e11d48" />
        <stop offset="52%" stop-color="#fb7185" />
        <stop offset="78%" stop-color="#fbcfe8" stop-opacity="0.75" />
        <stop offset="100%" stop-color="#fecdd3" stop-opacity="0" />
      </radialGradient>

      {/* 4. 右仙桃胭脂渐变 */}
      <radialGradient id="peachRightBlushGrad" cx="52%" cy="22%" r="65%">
        <stop offset="0%" stop-color="#be123c" />
        <stop offset="25%" stop-color="#e11d48" />
        <stop offset="52%" stop-color="#fb7185" />
        <stop offset="78%" stop-color="#fbcfe8" stop-opacity="0.75" />
        <stop offset="100%" stop-color="#fecdd3" stop-opacity="0" />
      </radialGradient>

      {/* 5. 桃沟柔和阴影渐变 (极柔和分染，绝非粗黑刻线) */}
      <linearGradient id="peachSutureSoftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#be123c" stop-opacity="0.4" />
        <stop offset="45%" stop-color="#e11d48" stop-opacity="0.25" />
        <stop offset="85%" stop-color="#fda4af" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#fecdd3" stop-opacity="0" />
      </linearGradient>

      {/* 6. 天鹅绒桃绒漫反射微光 (Velvety Peach Fuzz Bloom，无塑料反光) */}
      <radialGradient id="peachVelvetBloom" cx="38%" cy="36%" r="58%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.4" />
        <stop offset="35%" stop-color="#fff1f2" stop-opacity="0.2" />
        <stop offset="70%" stop-color="#fbcfe8" stop-opacity="0.06" />
        <stop offset="100%" stop-color="#f43f5e" stop-opacity="0" />
      </radialGradient>

      {/* 7. 修长苍翠仙桃寿叶渐变 */}
      <linearGradient id="peachLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#86efac" />
        <stop offset="30%" stop-color="#22c55e" />
        <stop offset="75%" stop-color="#15803d" />
        <stop offset="100%" stop-color="#0f4625" />
      </linearGradient>

      {/* 8. 桃实相互依偎闭塞阴影 */}
      <radialGradient id="peachContactShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#2d050d" stop-opacity="0.75" />
        <stop offset="55%" stop-color="#4a0e1a" stop-opacity="0.3" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
`.trim();

export const renderContent = (): string => `
<g id="peachesTrio">
        {/* ── 0. 底衬双生修长仙桃寿叶 (Background Longevity Leaves) ── */}
        <g id="peachBackLeaves">
          {/* 左侧斜探长叶 */}
          <path
            d="M 38 54 C 26 56, 12 51, 6 43 C 12 42, 26 45, 36 50 Z"
            fill="url(#peachLeafGrad)"
            stroke="#0f4625"
            stroke-width="0.4"
          />
          <path d="M 37 53 Q 23 48 8 43" stroke="#bbf7d0" stroke-width="0.45" fill="none" opacity="0.8" />

          {/* 右侧斜探长叶 */}
          <path
            d="M 64 54 C 76 56, 90 51, 96 43 C 90 42, 76 45, 66 50 Z"
            fill="url(#peachLeafGrad)"
            stroke="#0f4625"
            stroke-width="0.4"
          />
          <path d="M 65 53 Q 79 48 94 43" stroke="#bbf7d0" stroke-width="0.45" fill="none" opacity="0.8" />
        </g>

        {/* ── 1. 左下饱满仙桃 (Left Plump Longevity Peach) ── */}
        <g id="peachLeft">
          {/* 饱满心形倒卵桃身：底部丰厚圆润，桃尖朝上自然微倾 */}
          <path
            d="M 33 24 C 36 22, 38 23, 39 26 C 45 32, 50 42, 48 51 C 46 60, 36 63, 29 63 C 20 63, 15 56, 16 47 C 17 37, 26 29, 33 24 Z"
            fill="url(#peachBaseJadeGrad)"
          />
          {/* 桃尖与向阳颊面胭脂水红晕染 */}
          <path
            d="M 33 24 C 36 22, 38 23, 39 26 C 45 32, 50 42, 48 51 C 46 60, 36 63, 29 63 C 20 63, 15 56, 16 47 C 17 37, 26 29, 33 24 Z"
            fill="url(#peachLeftBlushGrad)"
          />
          {/* 天然桃沟凹槽柔和阴影 (极度柔和自然，非生硬刻划) */}
          <path
            d="M 34 25 Q 35 37 32 50"
            stroke="url(#peachSutureSoftGrad)"
            stroke-width="1.5"
            fill="none"
            stroke-linecap="round"
          />
          {/* 桃绒漫散射柔光 */}
          <ellipse cx="25" cy="40" rx="4.5" ry="7.5" fill="url(#peachVelvetBloom)" transform="rotate(-18, 25, 40)" />
          {/* 边缘暖玉微光 */}
          <path d="M 18 47 Q 20 57 28 61" stroke="#fef08a" stroke-width="0.75" fill="none" opacity="0.3" />
        </g>

        {/* ── 2. 右下饱满仙桃 (Right Plump Longevity Peach) ── */}
        <g id="peachRight">
          {/* 饱满心形桃身 */}
          <path
            d="M 69 24 C 66 22, 64 23, 63 26 C 57 32, 52 42, 54 51 C 56 60, 66 63, 73 63 C 82 63, 87 56, 86 47 C 85 37, 76 29, 69 24 Z"
            fill="url(#peachBaseJadeGrad)"
          />
          {/* 桃尖与右颊胭脂晕染 */}
          <path
            d="M 69 24 C 66 22, 64 23, 63 26 C 57 32, 52 42, 54 51 C 56 60, 66 63, 73 63 C 82 63, 87 56, 86 47 C 85 37, 76 29, 69 24 Z"
            fill="url(#peachRightBlushGrad)"
          />
          {/* 桃沟柔和阴影 */}
          <path
            d="M 68 25 Q 67 37 70 50"
            stroke="url(#peachSutureSoftGrad)"
            stroke-width="1.5"
            fill="none"
            stroke-linecap="round"
          />
          {/* 桃绒漫散射柔光 */}
          <ellipse cx="64" cy="40" rx="4.5" ry="7.5" fill="url(#peachVelvetBloom)" transform="rotate(-12, 64, 40)" />
          {/* 边缘暖光 */}
          <path d="M 84 47 Q 82 57 74 61" stroke="#fef08a" stroke-width="0.75" fill="none" opacity="0.3" />
        </g>

        {/* 两底桃依偎接触闭塞阴影 */}
        <ellipse cx="51" cy="48" rx="8" ry="11" fill="url(#peachContactShadow)" />

        {/* ── 3. 顶层压盘大仙桃 (Crown Longevity Peach) ── */}
        <g id="peachTop">
          {/* 顶桃投在底桃上的柔和阴影 */}
          <ellipse cx="51" cy="45" rx="16.5" ry="6" fill="#2d050d" opacity="0.38" />

          {/* 仙桃饱满心形轮廓：双颊隆起丰腴，顶端桃尖灵动微翘 */}
          <path
            d="M 50 12 C 48 11.5, 45 14, 40 18 C 34 23, 31 31, 32 39 C 33 47, 41 51, 51 51 C 61 51, 69 47, 70 39 C 71 31, 68 23, 62 18 C 57 14, 53 14, 52 14.5 C 51 14.5, 51 13, 50 12 Z"
            fill="url(#peachBaseJadeGrad)"
          />
          {/* 顶端仙桃尖与阳面胭脂朱砂晕染 (白里透红，由尖向腹层层曼延) */}
          <path
            d="M 50 12 C 48 11.5, 45 14, 40 18 C 34 23, 31 31, 32 39 C 33 47, 41 51, 51 51 C 61 51, 69 47, 70 39 C 71 31, 68 23, 62 18 C 57 14, 53 14, 52 14.5 C 51 14.5, 51 13, 50 12 Z"
            fill="url(#peachTopBlushGrad)"
          />

          {/* 桃尖顺延而下的浅桃沟 (柔和阴影，展现真实仙桃饱满肌肉质感) */}
          <path
            d="M 51.5 14.5 Q 52.5 26 51 40"
            stroke="url(#peachSutureSoftGrad)"
            stroke-width="1.8"
            fill="none"
            stroke-linecap="round"
          />
          {/* 桃沟受光柔边 */}
          <path
            d="M 50.5 15 Q 51.5 26 50 40"
            stroke="#ffffff"
            stroke-width="0.6"
            fill="none"
            opacity="0.3"
            stroke-linecap="round"
          />

          {/* 顶桃娇俏叶片 (鲜活小叶衬托桃尖微翘之灵动) */}
          <g id="topPeachLeaf">
            <path
              d="M 52 14.5 C 60 10, 70 12, 68 19 C 63 21, 56 18, 52 14.5 Z"
              fill="url(#peachLeafGrad)"
              stroke="#0f4625"
              stroke-width="0.45"
            />
            <path d="M 53 15 Q 61 16 66 18.5" stroke="#d1fae5" stroke-width="0.5" fill="none" opacity="0.85" />
          </g>

          {/* 仙桃天鹅绒质感柔光 (Velvety Peach Bloom，通透粉润绝非硬光) */}
          <ellipse cx="42" cy="26" rx="5" ry="8.5" fill="url(#peachVelvetBloom)" transform="rotate(-20, 42, 26)" />
          {/* 次级漫光 */}
          <path
            d="M 39 22 C 37 26, 38 31, 41 34"
            stroke="#ffffff"
            stroke-width="0.8"
            fill="none"
            opacity="0.3"
            stroke-linecap="round"
          />
          {/* 下沿玉暖漫反 */}
          <path d="M 34 35 Q 36 43 43 47" stroke="#fef08a" stroke-width="0.75" fill="none" opacity="0.25" />
        </g>
      </g>
`.trim();
