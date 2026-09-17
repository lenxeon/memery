/**
 * @file GrapesFruit.ts
 * @description 清雅供果 · 青提（阳光玫瑰） 纯 SVG 模板数据。
 */

export const metadata = {
  title: "清雅供果 · 青提（阳光玫瑰）",
  nextName: "平安红苹果",
};

export const renderDefs = (): string => `
{/* 1. 阳光玫瑰主浆果渐变 (浓郁青翠透嫩黄绿，通体如上等翡翠碧玉，不发白) */}
      <radialGradient id="muscatBodyGrad" cx="36%" cy="30%" r="68%">
        <stop offset="0%" stop-color="#d9f99d" />
        <stop offset="22%" stop-color="#a3e635" />
        <stop offset="55%" stop-color="#65a30d" />
        <stop offset="85%" stop-color="#4d7c0f" />
        <stop offset="100%" stop-color="#244205" />
      </radialGradient>

      {/* 2. 暗部深层青提渐变 (深邃青翠，稳固底色) */}
      <radialGradient id="muscatShadowGrad" cx="42%" cy="36%" r="65%">
        <stop offset="0%" stop-color="#a3e635" />
        <stop offset="35%" stop-color="#65a30d" />
        <stop offset="75%" stop-color="#3f6212" />
        <stop offset="100%" stop-color="#172b03" />
      </radialGradient>

      {/* 3. 前排受光晶莹青提渐变 (清雅嫩绿透亮，微金黄向光，杜绝死白) */}
      <radialGradient id="muscatFrontLightGrad" cx="34%" cy="28%" r="68%">
        <stop offset="0%" stop-color="#ecfccb" />
        <stop offset="20%" stop-color="#bef264" />
        <stop offset="52%" stop-color="#84cc16" />
        <stop offset="82%" stop-color="#4d7c0f" />
        <stop offset="100%" stop-color="#244205" />
      </radialGradient>

      {/* 4. 青提极浅微霜柔雾 (清透极低透明度，绝不发白发灰) */}
      <radialGradient id="muscatFrostBloom" cx="38%" cy="30%" r="60%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.16" />
        <stop offset="40%" stop-color="#d9f99d" stop-opacity="0.06" />
        <stop offset="100%" stop-color="#65a30d" stop-opacity="0" />
      </radialGradient>

      {/* 5. 掌状葡萄嫩叶渐变 */}
      <linearGradient id="muscatLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#bef264" />
        <stop offset="30%" stop-color="#4ade80" />
        <stop offset="75%" stop-color="#15803d" />
        <stop offset="100%" stop-color="#064e3b" />
      </linearGradient>

      {/* 6. 青提果梗藤木渐变 */}
      <linearGradient id="muscatVineWood" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#a3e635" />
        <stop offset="45%" stop-color="#65a30d" />
        <stop offset="75%" stop-color="#78350f" />
        <stop offset="100%" stop-color="#451a03" />
      </linearGradient>

      {/* 7. 青提串接地闭塞阴影 */}
      <radialGradient id="muscatClusterShadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#142404" stop-opacity="0.75" />
        <stop offset="60%" stop-color="#274609" stop-opacity="0.32" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
`.trim();

export const renderContent = (): string => `
<g id="muscatClusterGroup">
        {/* ── 0. 青提串整体接地柔影 ── */}
        <ellipse cx="51" cy="55" rx="30" ry="7" fill="url(#muscatClusterShadow)" />

        {/* ── 1. 底层与后排深色青提 (Back Shadow Grapes - 无强高光，浓郁翡翠深色) ── */}
        {renderMuscat(38, 44, 7.5, 'url(#muscatShadowGrad)', false)}
        {renderMuscat(50, 41, 7.8, 'url(#muscatShadowGrad)', false)}
        {renderMuscat(63, 44, 7.5, 'url(#muscatShadowGrad)', false)}
        {renderMuscat(44, 34, 7.2, 'url(#muscatShadowGrad)', false)}
        {renderMuscat(58, 34, 7.2, 'url(#muscatShadowGrad)', false)}
        {renderMuscat(32, 51, 6.8, 'url(#muscatShadowGrad)', false)}
        {renderMuscat(70, 51, 6.8, 'url(#muscatShadowGrad)', false)}

        {/* ── 2. 中层主青提群 (Middle Plump Grapes - 饱满青绿) ── */}
        {renderMuscat(28, 45, 7.2, 'url(#muscatBodyGrad)', true)}
        {renderMuscat(42, 48, 8.2, 'url(#muscatBodyGrad)', true)}
        {renderMuscat(60, 48, 8.2, 'url(#muscatBodyGrad)', true)}
        {renderMuscat(74, 45, 7.2, 'url(#muscatBodyGrad)', true)}
        {renderMuscat(51, 28, 7.5, 'url(#muscatBodyGrad)', true)}
        {renderMuscat(37, 39, 7.8, 'url(#muscatBodyGrad)', true)}
        {renderMuscat(65, 39, 7.8, 'url(#muscatBodyGrad)', true)}

        {/* ── 3. 前排受光晶莹青提群 (Front Light Grapes - 珠圆玉润，青翠欲滴) ── */}
        {renderMuscat(51, 44, 8.8, 'url(#muscatFrontLightGrad)', true)}
        {renderMuscat(35, 53, 7.5, 'url(#muscatFrontLightGrad)', true)}
        {renderMuscat(67, 53, 7.5, 'url(#muscatFrontLightGrad)', true)}
        {renderMuscat(51, 54, 7.8, 'url(#muscatFrontLightGrad)', true)}
        {renderMuscat(44, 57, 6.5, 'url(#muscatFrontLightGrad)', true)}
        {renderMuscat(58, 57, 6.5, 'url(#muscatFrontLightGrad)', true)}

        {/* ── 4. 鲜活老藤枝蔓与嫩绿卷须 (Fresh Green Vine & Tendrils) ── */}
        <g id="muscatWoodVine">
          {/* 主藤木枝 */}
          <path d="M 51 26 C 48 18, 42 12, 34 8" stroke="url(#muscatVineWood)" stroke-width="2.2" fill="none" stroke-linecap="round" />
          <path d="M 51 26 C 54 20, 60 14, 66 10" stroke="url(#muscatVineWood)" stroke-width="1.6" fill="none" stroke-linecap="round" />
          {/* 翠绿螺旋卷须 (Tendril) */}
          <path d="M 64 12 Q 72 8 71 4 Q 69 1 66 4 Q 65 8 70 8" stroke="#84cc16" stroke-width="0.8" fill="none" stroke-linecap="round" />
        </g>

        {/* ── 5. 舒展掌状翠绿葡萄嫩叶 (Palmate Emerald Leaves) ── */}
        <g id="muscatLeaves">
          {/* 左侧大掌叶 */}
          <path
            d="M 46 22 C 38 16, 26 14, 21 21 C 18 27, 24 33, 29 32 C 27 38, 33 42, 39 39 C 45 42, 48 35, 47 28 Z"
            fill="url(#muscatLeafGrad)"
            stroke="#064e3b"
            stroke-width="0.45"
          />
          {/* 掌状叶脉 */}
          <path d="M 45 23 Q 32 23 23 22" stroke="#dcfce7" stroke-width="0.6" fill="none" opacity="0.85" />
          <path d="M 42 24 Q 32 30 27 34" stroke="#dcfce7" stroke-width="0.5" fill="none" opacity="0.75" />
          <path d="M 43 25 Q 40 34 37 38" stroke="#dcfce7" stroke-width="0.5" fill="none" opacity="0.75" />

          {/* 右侧微翘娇叶 */}
          <path
            d="M 55 20 C 62 13, 74 12, 77 18 C 80 23, 73 28, 69 27 C 72 32, 66 36, 61 33 C 57 35, 54 30, 55 24 Z"
            fill="url(#muscatLeafGrad)"
            stroke="#064e3b"
            stroke-width="0.4"
          />
          {/* 叶脉 */}
          <path d="M 57 21 Q 67 20 74 18" stroke="#dcfce7" stroke-width="0.55" fill="none" opacity="0.8" />
          <path d="M 58 22 Q 68 26 71 30" stroke="#dcfce7" stroke-width="0.45" fill="none" opacity="0.7" />
        </g>
      </g>
`.trim();
