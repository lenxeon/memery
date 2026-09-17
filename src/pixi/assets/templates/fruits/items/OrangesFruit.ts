/**
 * @file OrangesFruit.ts
 * @description 吉庆供果 · 蜜桔（大吉大利） 纯 SVG 模板数据。
 */

export const metadata = {
  title: "吉庆供果 · 蜜桔（大吉大利）",
  nextName: "福寿仙桃",
};

export const renderDefs = (): string => `
{/* 1. 顶层金蜜柑主体渐变 (金黄透亮至浓郁熟橙层层晕染) */}
      <radialGradient id="orangeTopBodyGrad" cx="36%" cy="30%" r="68%">
        <stop offset="0%" stop-color="#fef08a" />
        <stop offset="16%" stop-color="#fde047" />
        <stop offset="38%" stop-color="#fb923c" />
        <stop offset="65%" stop-color="#f97316" />
        <stop offset="85%" stop-color="#ea580c" />
        <stop offset="96%" stop-color="#c2410c" />
        <stop offset="100%" stop-color="#7c2d12" />
      </radialGradient>

      {/* 2. 左下蜜柑渐变 */}
      <radialGradient id="orangeLeftBodyGrad" cx="36%" cy="32%" r="66%">
        <stop offset="0%" stop-color="#fef08a" />
        <stop offset="18%" stop-color="#fdba74" />
        <stop offset="45%" stop-color="#f97316" />
        <stop offset="72%" stop-color="#ea580c" />
        <stop offset="90%" stop-color="#c2410c" />
        <stop offset="100%" stop-color="#6c2307" />
      </radialGradient>

      {/* 3. 右下蜜柑渐变 */}
      <radialGradient id="orangeRightBodyGrad" cx="34%" cy="32%" r="66%">
        <stop offset="0%" stop-color="#fed7aa" />
        <stop offset="20%" stop-color="#fb923c" />
        <stop offset="48%" stop-color="#f97316" />
        <stop offset="75%" stop-color="#d9480f" />
        <stop offset="92%" stop-color="#9a3412" />
        <stop offset="100%" stop-color="#581604" />
      </radialGradient>

      {/* 4. 后方底层微露蜜柑渐变 */}
      <radialGradient id="orangeBackBodyGrad" cx="45%" cy="35%" r="60%">
        <stop offset="0%" stop-color="#fdba74" />
        <stop offset="50%" stop-color="#ea580c" />
        <stop offset="100%" stop-color="#7c2d12" />
      </radialGradient>

      {/* 5. 翠绿星形果萼与嫩叶渐变 */}
      <linearGradient id="orangeLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#a7f3d0" />
        <stop offset="35%" stop-color="#22c55e" />
        <stop offset="75%" stop-color="#15803d" />
        <stop offset="100%" stop-color="#0f4625" />
      </linearGradient>

      {/* 6. 果实相互接触闭塞阴影 */}
      <radialGradient id="orangeContactOcclusion" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#2e0d04" stop-opacity="0.8" />
        <stop offset="60%" stop-color="#431407" stop-opacity="0.35" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>

      {/* 7. 柑橘表皮柔和油润漫散射微光 (绝非高对比度白斑噪点) */}
      <radialGradient id="orangeMatteSheen" cx="38%" cy="32%" r="58%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.38" />
        <stop offset="35%" stop-color="#fef08a" stop-opacity="0.2" />
        <stop offset="70%" stop-color="#fed7aa" stop-opacity="0.06" />
        <stop offset="100%" stop-color="#f97316" stop-opacity="0" />
      </radialGradient>

      {/* 8. 浅凹果蒂窝阴影 */}
      <radialGradient id="orangeStemDimple" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#3d1204" />
        <stop offset="65%" stop-color="#7c2d12" />
        <stop offset="100%" stop-color="#ea580c" stop-opacity="0" />
      </radialGradient>
`.trim();

export const renderContent = (): string => `
<g id="orangesPyramid">
        {/* ── 0. 衬底中央微露金桔 (Center Base Supporting Orange) ── */}
        <g id="orangeCenterBase">
          <ellipse cx="51" cy="45" rx="16.5" ry="13.5" fill="url(#orangeBackBodyGrad)" />
        </g>

        {/* ── 1. 左下蜜柑 (Left Orange) ── */}
        <g id="orangeLeft">
          {/* 饱满扁圆柑橘外形：横阔略扁，敦实饱满 */}
          <path
            d="M 33 33 C 44 33, 51 39, 50 48 C 49 57, 42 62, 33 62 C 24 62, 16 57, 16 48 C 16 39, 23 33, 33 33 Z"
            fill="url(#orangeLeftBodyGrad)"
          />
          {/* 果顶微凹 */}
          <ellipse cx="33" cy="36" rx="3.5" ry="1.4" fill="url(#orangeStemDimple)" />
          {/* 翠绿五裂星芒小萼与小柄 */}
          <path
            d="M 33 36 L 31 33.5 M 33 36 L 35 33.5 M 33 36 L 30 36.5 M 33 36 L 36 36.5 M 33 36 L 33 38"
            stroke="#15803d"
            stroke-width="0.9"
            stroke-linecap="round"
          />
          <circle cx="33" cy="36" r="0.9" fill="#451a03" />

          {/* 柔润柑橘油润漫散射微光 (无白斑麻点) */}
          <ellipse cx="26" cy="42" rx="5" ry="7" fill="url(#orangeMatteSheen)" transform="rotate(-18, 26, 42)" />
          <path d="M 23 38 C 22 42, 24 47, 27 50" stroke="#ffffff" stroke-width="0.75" fill="none" opacity="0.3" stroke-linecap="round" />
          {/* 下部边缘白玉盘暖金反光 */}
          <path d="M 18 48 Q 21 58 31 61" stroke="#fde047" stroke-width="0.75" fill="none" opacity="0.28" />
        </g>

        {/* ── 2. 右下蜜柑 (Right Orange) ── */}
        <g id="orangeRight">
          {/* 饱满扁圆柑橘外形 */}
          <path
            d="M 69 33 C 79 33, 86 39, 86 48 C 86 57, 78 62, 69 62 C 60 62, 52 57, 52 48 C 52 39, 59 33, 69 33 Z"
            fill="url(#orangeRightBodyGrad)"
          />
          {/* 果顶微凹 */}
          <ellipse cx="69" cy="36" rx="3.5" ry="1.4" fill="url(#orangeStemDimple)" />
          {/* 翠绿星萼 */}
          <path
            d="M 69 36 L 67 33.5 M 69 36 L 71 33.5 M 69 36 L 66 36.5 M 69 36 L 72 36.5 M 69 36 L 69 38"
            stroke="#15803d"
            stroke-width="0.9"
            stroke-linecap="round"
          />
          <circle cx="69" cy="36" r="0.9" fill="#451a03" />

          {/* 柔润漫散射高光 */}
          <ellipse cx="64" cy="42" rx="5" ry="7" fill="url(#orangeMatteSheen)" transform="rotate(-12, 64, 42)" />
          <path d="M 61 38 C 60 42, 62 47, 65 50" stroke="#ffffff" stroke-width="0.75" fill="none" opacity="0.28" stroke-linecap="round" />
          {/* 底部反光 */}
          <path d="M 84 48 Q 81 58 71 61" stroke="#fde047" stroke-width="0.75" fill="none" opacity="0.28" />
        </g>

        {/* 左右金桔交汇闭塞阴影 */}
        <ellipse cx="51" cy="49" rx="9" ry="10" fill="url(#orangeContactOcclusion)" />

        {/* ── 3. 顶层压轴金蜜柑 (Top Crown Orange) ── */}
        <g id="orangeTop">
          {/* 顶果压底的柔和阴影 */}
          <ellipse cx="51" cy="44" rx="16.5" ry="5.5" fill="#290a03" opacity="0.4" />

          {/* 饱满扁圆顶果：果顶微凹，侧向饱满丰硕 */}
          <path
            d="M 51 16 C 63 16, 71 22, 70 31 C 69 40, 61 46, 51 46 C 41 46, 33 40, 32 31 C 31 22, 39 16, 51 16 Z"
            fill="url(#orangeTopBodyGrad)"
          />

          {/* 果蒂微凹深涡 */}
          <ellipse cx="51" cy="18" rx="4" ry="1.8" fill="url(#orangeStemDimple)" />

          {/* 翠绿五裂星芒花萼与木质短蒂 */}
          <g id="orangeStarCalyx">
            {/* 五角小星萼 */}
            <path
              d="M 51 18 L 47 15.5 M 51 18 L 55 15.5 M 51 18 L 45.5 18 M 51 18 L 56.5 18 M 51 18 L 51 20.5"
              stroke="#15803d"
              stroke-width="1.2"
              stroke-linecap="round"
            />
            {/* 木质短柄 */}
            <path d="M 51 18 Q 52 13 54 10" stroke="#3b1502" stroke-width="1.6" fill="none" stroke-linecap="round" />
            <circle cx="51" cy="18" r="1.1" fill="#451a03" />
          </g>

          {/* 双生翠绿吉庆小橘叶 */}
          <g id="orangeTwinLeaves">
            {/* 左小叶 */}
            <path
              d="M 52 14 C 43 9, 37 15, 44 19 C 49 19, 51 16, 52 14 Z"
              fill="url(#orangeLeafGrad)"
              stroke="#0f4625"
              stroke-width="0.4"
            />
            <path d="M 50 14 Q 44 14 41 16" stroke="#bbf7d0" stroke-width="0.45" fill="none" opacity="0.8" />
            {/* 右长叶 */}
            <path
              d="M 52 14 C 62 8, 72 13, 67 21 C 61 22, 56 18, 52 14 Z"
              fill="url(#orangeLeafGrad)"
              stroke="#0f4625"
              stroke-width="0.4"
            />
            <path d="M 53 14 Q 62 15 65 19" stroke="#bbf7d0" stroke-width="0.5" fill="none" opacity="0.85" />
            <path d="M 55 13 Q 63 11 67 15" stroke="#ffffff" stroke-width="0.45" fill="none" opacity="0.35" />
          </g>

          {/* 柑橘表皮柔和油润漫射高光 (纯净晶莹，绝不长白斑) */}
          <ellipse cx="42" cy="24" rx="5" ry="7.5" fill="url(#orangeMatteSheen)" transform="rotate(-20, 42, 24)" />
          <path
            d="M 39 21 C 37 25, 38 30, 42 33"
            stroke="#ffffff"
            stroke-width="0.85"
            fill="none"
            opacity="0.32"
            stroke-linecap="round"
          />
          {/* 下沿环境漫反温和金色 */}
          <path d="M 34 32 Q 36 41 45 44" stroke="#fef08a" stroke-width="0.75" fill="none" opacity="0.25" />
        </g>
      </g>
`.trim();
