/**
 * @file VaseDefs.ts
 * @description 花器全局共享 SVG 渐变与光影滤镜定义（纯 TypeScript 字符串模板）。
 */

export const getVaseDefsSvg = (): string => `
  <!-- 1. 纯白哑光现代陶艺渐变 -->
  <linearGradient id="pureMatteWhiteGrad" x1="15%" y1="20%" x2="90%" y2="80%">
    <stop offset="0%" stop-color="#ffffff" />
    <stop offset="45%" stop-color="#faf7f2" />
    <stop offset="85%" stop-color="#ece4d8" />
    <stop offset="100%" stop-color="#dfd5c5" />
  </linearGradient>

  <!-- 2. 奶油白陶温润柔光渐变 -->
  <linearGradient id="creamWavePorcelainGrad" x1="20%" y1="15%" x2="85%" y2="85%">
    <stop offset="0%" stop-color="#ffffff" />
    <stop offset="35%" stop-color="#fdfaf3" />
    <stop offset="70%" stop-color="#f4ebda" />
    <stop offset="92%" stop-color="#e3d4bd" />
    <stop offset="100%" stop-color="#d1be9f" />
  </linearGradient>

  <!-- 3. 莫兰迪落樱粉优雅柔和渐变 -->
  <linearGradient id="blushRoseWaveGrad" x1="20%" y1="15%" x2="85%" y2="85%">
    <stop offset="0%" stop-color="#fff5f5" />
    <stop offset="30%" stop-color="#ffe4e6" />
    <stop offset="70%" stop-color="#fecdd3" />
    <stop offset="90%" stop-color="#f43f5e" stop-opacity="0.55" />
    <stop offset="100%" stop-color="#be123c" stop-opacity="0.4" />
  </linearGradient>

  <!-- 4. 侘寂玄灰砂岩质朴粗陶渐变 -->
  <linearGradient id="chiseledStoneGrad" x1="15%" y1="15%" x2="85%" y2="85%">
    <stop offset="0%" stop-color="#52525b" />
    <stop offset="35%" stop-color="#3f3f46" />
    <stop offset="75%" stop-color="#27272a" />
    <stop offset="100%" stop-color="#18181b" />
  </linearGradient>

  <!-- 5. 钻石晶体切面折光 A/B/C 组 -->
  <linearGradient id="crystalFacetA" x1="10%" y1="10%" x2="90%" y2="90%">
    <stop offset="0%" stop-color="#ffffff" />
    <stop offset="100%" stop-color="#f1eae0" />
  </linearGradient>
  <linearGradient id="crystalFacetB" x1="85%" y1="15%" x2="15%" y2="85%">
    <stop offset="0%" stop-color="#faf6ee" />
    <stop offset="100%" stop-color="#dfd2be" />
  </linearGradient>
  <linearGradient id="crystalFacetC" x1="10%" y1="85%" x2="90%" y2="15%">
    <stop offset="0%" stop-color="#cfbe9e" />
    <stop offset="100%" stop-color="#baab92" />
  </linearGradient>

  <!-- 6. 海棠瓜棱温润蛋壳青白 -->
  <linearGradient id="melonLobedCeladonGrad" x1="15%" y1="20%" x2="85%" y2="80%">
    <stop offset="0%" stop-color="#f0fdf4" />
    <stop offset="35%" stop-color="#e7f8ee" />
    <stop offset="75%" stop-color="#c7edd5" />
    <stop offset="100%" stop-color="#9cd9b5" />
  </linearGradient>

  <!-- 7. 手作泥捏翻边暖姜黄粗陶渐变 -->
  <linearGradient id="warmPinchedClayGrad" x1="18%" y1="12%" x2="88%" y2="88%">
    <stop offset="0%" stop-color="#fde047" stop-opacity="0.8" />
    <stop offset="15%" stop-color="#f59e0b" stop-opacity="0.9" />
    <stop offset="50%" stop-color="#d97706" />
    <stop offset="80%" stop-color="#b45309" />
    <stop offset="100%" stop-color="#78350f" />
  </linearGradient>

  <!-- 8. 银曜珠光金属涡轮渐变 -->
  <linearGradient id="silverPearlTurbineGrad" x1="15%" y1="15%" x2="85%" y2="85%">
    <stop offset="0%" stop-color="#ffffff" />
    <stop offset="25%" stop-color="#f1f5f9" />
    <stop offset="50%" stop-color="#cbd5e1" />
    <stop offset="75%" stop-color="#94a3b8" />
    <stop offset="100%" stop-color="#475569" />
  </linearGradient>
  <linearGradient id="pearlBladeHighGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
    <stop offset="50%" stop-color="#f8fafc" stop-opacity="0.85" />
    <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.2" />
  </linearGradient>

  <!-- 9. 莫兰迪冰蓝纯瓷渐变 -->
  <linearGradient id="morandiIceBlueGrad" x1="20%" y1="15%" x2="85%" y2="85%">
    <stop offset="0%" stop-color="#e0f2fe" />
    <stop offset="35%" stop-color="#bae6fd" />
    <stop offset="70%" stop-color="#38bdf8" />
    <stop offset="90%" stop-color="#0284c7" />
    <stop offset="100%" stop-color="#0369a1" />
  </linearGradient>

  <!-- 10. 天青釉流沙粗砂岩渐变 -->
  <linearGradient id="skyBlueToSandGrad" x1="50%" y1="0%" x2="50%" y2="100%">
    <stop offset="0%" stop-color="#e0f2fe" />
    <stop offset="30%" stop-color="#bae6fd" />
    <stop offset="58%" stop-color="#7dd3fc" />
    <stop offset="68%" stop-color="#d4c3aa" />
    <stop offset="85%" stop-color="#bfa588" />
    <stop offset="100%" stop-color="#8c7053" />
  </linearGradient>

  <!-- 11. 月白珍珠釉：中央凝光，边缘带冷暖虹彩 -->
  <linearGradient id="moonWhitePorcelainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#899e9d" />
    <stop offset="16%" stop-color="#c9ddd9" />
    <stop offset="38%" stop-color="#fff7ed" />
    <stop offset="55%" stop-color="#f8f4ff" />
    <stop offset="77%" stop-color="#d5e3e8" />
    <stop offset="100%" stop-color="#788b89" />
  </linearGradient>
  <linearGradient id="moonPearlSheenGrad" x1="10%" y1="90%" x2="90%" y2="10%">
    <stop offset="0%" stop-color="#8dd8d1" stop-opacity="0" />
    <stop offset="35%" stop-color="#b8e6df" stop-opacity="0.36" />
    <stop offset="58%" stop-color="#f2cddd" stop-opacity="0.42" />
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
  </linearGradient>

  <!-- 12. 玄墨乌金釉：石墨底色中含蓝灰与茶金暗闪 -->
  <linearGradient id="inkBlackMeipingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#050706" />
    <stop offset="24%" stop-color="#253035" />
    <stop offset="47%" stop-color="#4a4d47" />
    <stop offset="72%" stop-color="#202625" />
    <stop offset="100%" stop-color="#030403" />
  </linearGradient>
  <linearGradient id="inkGoldSheenGrad" x1="0%" y1="100%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#132f3e" stop-opacity="0" />
    <stop offset="38%" stop-color="#4c7a89" stop-opacity="0.34" />
    <stop offset="64%" stop-color="#c39a5a" stop-opacity="0.28" />
    <stop offset="100%" stop-color="#7d542c" stop-opacity="0" />
  </linearGradient>

  <!-- 13. 汝青玉釉：方身中央柔光与青蓝窑变 -->
  <linearGradient id="ruCeladonCongGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#667d72" />
    <stop offset="20%" stop-color="#a7c0b3" />
    <stop offset="47%" stop-color="#e1eadf" />
    <stop offset="73%" stop-color="#a8c3bd" />
    <stop offset="100%" stop-color="#5e746b" />
  </linearGradient>
  <radialGradient id="ruJadeBloomGrad" cx="38%" cy="35%" r="72%">
    <stop offset="0%" stop-color="#f3f7ed" stop-opacity="0.72" />
    <stop offset="48%" stop-color="#9bd0c6" stop-opacity="0.2" />
    <stop offset="100%" stop-color="#5b7f78" stop-opacity="0" />
  </radialGradient>

  <!-- 14. 茶白乳浊釉：暖金与青白微光交叠 -->
  <linearGradient id="teaWhiteShoulderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#897a66" />
    <stop offset="18%" stop-color="#d7c8b4" />
    <stop offset="43%" stop-color="#fff8e9" />
    <stop offset="68%" stop-color="#e3d7c8" />
    <stop offset="86%" stop-color="#c3d2cd" />
    <stop offset="100%" stop-color="#756b5d" />
  </linearGradient>
  <linearGradient id="teaKilnFlowGrad" x1="15%" y1="0%" x2="85%" y2="100%">
    <stop offset="0%" stop-color="#f5d49e" stop-opacity="0" />
    <stop offset="42%" stop-color="#efc985" stop-opacity="0.34" />
    <stop offset="67%" stop-color="#a6d1ca" stop-opacity="0.3" />
    <stop offset="100%" stop-color="#7ba6a0" stop-opacity="0" />
  </linearGradient>

  <!-- 15. 唐三彩：象牙胎上翠绿、琥珀与赭褐纵向流釉 -->
  <linearGradient id="sancaiIvoryBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#8e6a35" />
    <stop offset="18%" stop-color="#ead8a0" />
    <stop offset="48%" stop-color="#fff1bd" />
    <stop offset="76%" stop-color="#d9b866" />
    <stop offset="100%" stop-color="#765128" />
  </linearGradient>
  <linearGradient id="sancaiGreenFlowGrad" x1="20%" y1="0%" x2="75%" y2="100%">
    <stop offset="0%" stop-color="#9bd35b" stop-opacity="0.9" />
    <stop offset="52%" stop-color="#178f61" stop-opacity="0.88" />
    <stop offset="100%" stop-color="#0b5f50" stop-opacity="0" />
  </linearGradient>
  <linearGradient id="sancaiAmberFlowGrad" x1="70%" y1="0%" x2="25%" y2="100%">
    <stop offset="0%" stop-color="#ffd768" stop-opacity="0.88" />
    <stop offset="55%" stop-color="#c66a22" stop-opacity="0.8" />
    <stop offset="100%" stop-color="#73351f" stop-opacity="0" />
  </linearGradient>

  <!-- 16. 青铜觚：古铜金、孔雀蓝与铜绿氧化层 -->
  <linearGradient id="bronzePatinaGuGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#443322" />
    <stop offset="20%" stop-color="#397a70" />
    <stop offset="46%" stop-color="#b18a50" />
    <stop offset="72%" stop-color="#2e716c" />
    <stop offset="100%" stop-color="#39271d" />
  </linearGradient>
  <linearGradient id="bronzeGoldEdgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#6a4728" />
    <stop offset="50%" stop-color="#e0b86f" />
    <stop offset="100%" stop-color="#5b3824" />
  </linearGradient>

  <!-- 17. 战国钫：深铜胎、错金与绿松石镶嵌 -->
  <linearGradient id="warringFangBronzeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#2d211b" />
    <stop offset="24%" stop-color="#62452e" />
    <stop offset="48%" stop-color="#9b7043" />
    <stop offset="74%" stop-color="#4c382c" />
    <stop offset="100%" stop-color="#211916" />
  </linearGradient>
  <linearGradient id="turquoiseInlayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#7fe0cf" />
    <stop offset="48%" stop-color="#1fa996" />
    <stop offset="100%" stop-color="#086b68" />
  </linearGradient>

  <!-- 18. 青花釉里红：青白瓷胎与柔和釉光 -->
  <linearGradient id="blueRedGourdPorcelainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#9baec1" />
    <stop offset="17%" stop-color="#dceaf2" />
    <stop offset="46%" stop-color="#fffdf6" />
    <stop offset="77%" stop-color="#d9e5ee" />
    <stop offset="100%" stop-color="#8198b1" />
  </linearGradient>

  <!-- 19. 西周重器：黑铜、古金与青绿锈色 -->
  <linearGradient id="westernZhouBronzeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#3b3026" />
    <stop offset="18%" stop-color="#4d887d" />
    <stop offset="42%" stop-color="#d1a665" />
    <stop offset="61%" stop-color="#6aa094" />
    <stop offset="82%" stop-color="#ae824e" />
    <stop offset="100%" stop-color="#30251f" />
  </linearGradient>
  <linearGradient id="zhouVerdigrisBloomGrad" x1="0%" y1="100%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#1d6862" stop-opacity="0" />
    <stop offset="38%" stop-color="#68d5c2" stop-opacity="0.72" />
    <stop offset="67%" stop-color="#e3c27e" stop-opacity="0.5" />
    <stop offset="100%" stop-color="#d8b36b" stop-opacity="0" />
  </linearGradient>
  <linearGradient id="westernZhouSpecularGrad" x1="15%" y1="100%" x2="85%" y2="0%">
    <stop offset="0%" stop-color="#4cc8b7" stop-opacity="0" />
    <stop offset="34%" stop-color="#85e2d1" stop-opacity="0.42" />
    <stop offset="52%" stop-color="#fff1bd" stop-opacity="0.72" />
    <stop offset="70%" stop-color="#e8b86e" stop-opacity="0.36" />
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
  </linearGradient>

  <!-- 20. 秦陵铜车马与水禽：青铜、金银与朱蓝残彩 -->
  <linearGradient id="qinImperialBronzeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#34362f" />
    <stop offset="18%" stop-color="#4e9185" />
    <stop offset="45%" stop-color="#d6aa67" />
    <stop offset="68%" stop-color="#76a99e" />
    <stop offset="86%" stop-color="#b38d59" />
    <stop offset="100%" stop-color="#292923" />
  </linearGradient>
  <linearGradient id="qinSilverGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#a5aca8" />
    <stop offset="35%" stop-color="#fffbe8" />
    <stop offset="65%" stop-color="#f0c978" />
    <stop offset="100%" stop-color="#967444" />
  </linearGradient>
  <linearGradient id="qinPolychromeSheenGrad" x1="5%" y1="100%" x2="95%" y2="0%">
    <stop offset="0%" stop-color="#43b8ad" stop-opacity="0" />
    <stop offset="30%" stop-color="#65dfcf" stop-opacity="0.48" />
    <stop offset="50%" stop-color="#fff0ae" stop-opacity="0.72" />
    <stop offset="68%" stop-color="#e95e4b" stop-opacity="0.38" />
    <stop offset="84%" stop-color="#538ed5" stop-opacity="0.34" />
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
  </linearGradient>

  <!-- 21. 秦俑陶胎：陶红、赭褐与烟熏黑 -->
  <linearGradient id="qinTerracottaArmorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#744332" />
    <stop offset="20%" stop-color="#c96d45" />
    <stop offset="47%" stop-color="#f0a26a" />
    <stop offset="72%" stop-color="#bd6044" />
    <stop offset="100%" stop-color="#59352f" />
  </linearGradient>
  <linearGradient id="qinTerracottaLacquerGrad" x1="10%" y1="100%" x2="90%" y2="0%">
    <stop offset="0%" stop-color="#c83e36" stop-opacity="0" />
    <stop offset="38%" stop-color="#ef6552" stop-opacity="0.42" />
    <stop offset="55%" stop-color="#ffd28b" stop-opacity="0.62" />
    <stop offset="75%" stop-color="#4d9caf" stop-opacity="0.38" />
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
  </linearGradient>

  <!-- 22. 隋代白瓷：凝脂乳白、淡青虹彩与锐利釉面高光 -->
  <linearGradient id="suiMoonWhitePorcelainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#788e89" />
    <stop offset="14%" stop-color="#c5d9d3" />
    <stop offset="36%" stop-color="#fffdf0" />
    <stop offset="55%" stop-color="#fff8e8" />
    <stop offset="76%" stop-color="#d9e7e4" />
    <stop offset="100%" stop-color="#748985" />
  </linearGradient>
  <linearGradient id="suiPorcelainIridescenceGrad" x1="5%" y1="100%" x2="95%" y2="0%">
    <stop offset="0%" stop-color="#69cfc4" stop-opacity="0" />
    <stop offset="30%" stop-color="#8ee4d5" stop-opacity="0.44" />
    <stop offset="49%" stop-color="#fff7c7" stop-opacity="0.74" />
    <stop offset="66%" stop-color="#e9bfd4" stop-opacity="0.34" />
    <stop offset="82%" stop-color="#8bbfd4" stop-opacity="0.38" />
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
  </linearGradient>

  <!-- 23. 隋代青釉：青碧玻璃质流釉与金青反光 -->
  <linearGradient id="suiCeladonFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#274e49" />
    <stop offset="14%" stop-color="#4f8b7c" />
    <stop offset="36%" stop-color="#b9d6b9" />
    <stop offset="51%" stop-color="#e8e3ad" />
    <stop offset="68%" stop-color="#7db3a1" />
    <stop offset="86%" stop-color="#397166" />
    <stop offset="100%" stop-color="#1e403d" />
  </linearGradient>
  <linearGradient id="suiCeladonKilnSheenGrad" x1="10%" y1="100%" x2="90%" y2="0%">
    <stop offset="0%" stop-color="#35c4b1" stop-opacity="0" />
    <stop offset="30%" stop-color="#5ee3cb" stop-opacity="0.45" />
    <stop offset="50%" stop-color="#fff4ac" stop-opacity="0.78" />
    <stop offset="70%" stop-color="#8bc9dc" stop-opacity="0.35" />
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
  </linearGradient>

  <!-- 24. 唐越窑秘色：湖青深浅与八棱折光 -->
  <linearGradient id="tangSecretCeladonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#315d55" />
    <stop offset="14%" stop-color="#679587" />
    <stop offset="31%" stop-color="#bdd0a9" />
    <stop offset="47%" stop-color="#e4e3b5" />
    <stop offset="64%" stop-color="#8fb7a2" />
    <stop offset="82%" stop-color="#4d8074" />
    <stop offset="100%" stop-color="#294d49" />
  </linearGradient>
  <linearGradient id="tangSecretSheenGrad" x1="5%" y1="100%" x2="95%" y2="0%">
    <stop offset="0%" stop-color="#4dc7b7" stop-opacity="0" />
    <stop offset="38%" stop-color="#91e1cf" stop-opacity="0.42" />
    <stop offset="53%" stop-color="#fff8bd" stop-opacity="0.8" />
    <stop offset="72%" stop-color="#a4cce0" stop-opacity="0.26" />
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
  </linearGradient>

  <!-- 25. 唐鲁山花釉：玄褐底釉与天蓝、月白熔斑 -->
  <linearGradient id="tangLushanDarkGlazeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#171918" />
    <stop offset="18%" stop-color="#3b3029" />
    <stop offset="42%" stop-color="#65503f" />
    <stop offset="61%" stop-color="#2c3334" />
    <stop offset="82%" stop-color="#44352d" />
    <stop offset="100%" stop-color="#101211" />
  </linearGradient>
  <radialGradient id="tangLushanBlueSplashGrad" cx="38%" cy="34%" r="68%">
    <stop offset="0%" stop-color="#e4f1e9" stop-opacity="0.94" />
    <stop offset="28%" stop-color="#9cc7d5" stop-opacity="0.88" />
    <stop offset="66%" stop-color="#568ca7" stop-opacity="0.54" />
    <stop offset="100%" stop-color="#365b70" stop-opacity="0" />
  </radialGradient>
  <linearGradient id="tangLushanSheenGrad" x1="10%" y1="100%" x2="90%" y2="0%">
    <stop offset="0%" stop-color="#51b9d0" stop-opacity="0" />
    <stop offset="42%" stop-color="#8dcfe1" stop-opacity="0.34" />
    <stop offset="57%" stop-color="#fff6d4" stop-opacity="0.64" />
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
  </linearGradient>

  <!-- 26. 唐长沙窑：青黄胎釉与褐绿釉下彩 -->
  <linearGradient id="tangChangshaBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#73623d" />
    <stop offset="17%" stop-color="#b9a667" />
    <stop offset="39%" stop-color="#e9d999" />
    <stop offset="57%" stop-color="#f5e8b7" />
    <stop offset="78%" stop-color="#a99a5e" />
    <stop offset="100%" stop-color="#655737" />
  </linearGradient>
  <linearGradient id="tangChangshaGlazeSheenGrad" x1="5%" y1="100%" x2="95%" y2="0%">
    <stop offset="0%" stop-color="#477d58" stop-opacity="0" />
    <stop offset="34%" stop-color="#78b878" stop-opacity="0.4" />
    <stop offset="53%" stop-color="#fff0a4" stop-opacity="0.68" />
    <stop offset="72%" stop-color="#9fb97b" stop-opacity="0.3" />
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
  </linearGradient>

  <!-- 27. 北宋钧窑：月白天青釉、紫霞窑变与温润釉光 -->
  <linearGradient id="songJunMoonWhiteGrad" x1="0%" y1="5%" x2="100%" y2="80%">
    <stop offset="0%" stop-color="#526e79" />
    <stop offset="18%" stop-color="#9ab5bd" />
    <stop offset="38%" stop-color="#e6eee7" />
    <stop offset="55%" stop-color="#c5d9d7" />
    <stop offset="78%" stop-color="#8da8ae" />
    <stop offset="100%" stop-color="#526973" />
  </linearGradient>
  <radialGradient id="songJunPurpleTransmutationGrad" cx="34%" cy="32%" r="72%">
    <stop offset="0%" stop-color="#e6b9ae" stop-opacity="0.9" />
    <stop offset="36%" stop-color="#b87580" stop-opacity="0.72" />
    <stop offset="72%" stop-color="#8e6375" stop-opacity="0.4" />
    <stop offset="100%" stop-color="#765c70" stop-opacity="0" />
  </radialGradient>
  <linearGradient id="songJunGlazeSheenGrad" x1="8%" y1="90%" x2="88%" y2="8%">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0" />
    <stop offset="36%" stop-color="#e8f7f0" stop-opacity="0.38" />
    <stop offset="53%" stop-color="#fff8df" stop-opacity="0.78" />
    <stop offset="69%" stop-color="#c6dce5" stop-opacity="0.35" />
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
  </linearGradient>

  <!-- 28. 北宋耀州青釉：深浅橄榄青层次与刻花积釉 -->
  <linearGradient id="songYaozhouCeladonGrad" x1="0%" y1="0%" x2="100%" y2="55%">
    <stop offset="0%" stop-color="#355b4d" />
    <stop offset="17%" stop-color="#648c70" />
    <stop offset="38%" stop-color="#b1c49a" />
    <stop offset="54%" stop-color="#d4d7ad" />
    <stop offset="76%" stop-color="#7f9b74" />
    <stop offset="100%" stop-color="#385b4e" />
  </linearGradient>
  <linearGradient id="songYaozhouGlazeSheenGrad" x1="5%" y1="100%" x2="90%" y2="0%">
    <stop offset="0%" stop-color="#74bb9d" stop-opacity="0" />
    <stop offset="40%" stop-color="#c2e0b5" stop-opacity="0.36" />
    <stop offset="54%" stop-color="#fff6ca" stop-opacity="0.78" />
    <stop offset="72%" stop-color="#a4c9a5" stop-opacity="0.36" />
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
  </linearGradient>

  <!-- 29. 北宋磁州剔黑：墨黑化妆土、温白露胎与漆釉高光 -->
  <linearGradient id="songCizhouBlackGlazeGrad" x1="0%" y1="0%" x2="100%" y2="30%">
    <stop offset="0%" stop-color="#171b1a" />
    <stop offset="18%" stop-color="#343936" />
    <stop offset="43%" stop-color="#575a50" />
    <stop offset="58%" stop-color="#282d2b" />
    <stop offset="82%" stop-color="#41443d" />
    <stop offset="100%" stop-color="#151817" />
  </linearGradient>
  <linearGradient id="songCizhouLacquerSheenGrad" x1="10%" y1="100%" x2="90%" y2="0%">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0" />
    <stop offset="43%" stop-color="#c9d4c8" stop-opacity="0.2" />
    <stop offset="54%" stop-color="#fff9e8" stop-opacity="0.66" />
    <stop offset="68%" stop-color="#aeb9ab" stop-opacity="0.2" />
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
  </linearGradient>

  <!-- 30. 明代青花：瓷白釉面、钴蓝浓淡与清亮釉光 -->
  <linearGradient id="mingBlueWhitePorcelainGrad" x1="0%" y1="0%" x2="100%" y2="20%">
    <stop offset="0%" stop-color="#71899a" />
    <stop offset="16%" stop-color="#d0dce0" />
    <stop offset="38%" stop-color="#fffdf3" />
    <stop offset="57%" stop-color="#f5f2e5" />
    <stop offset="80%" stop-color="#c9d8db" />
    <stop offset="100%" stop-color="#657d8c" />
  </linearGradient>
  <linearGradient id="mingCobaltBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#173e80" />
    <stop offset="50%" stop-color="#2e68b1" />
    <stop offset="100%" stop-color="#142e64" />
  </linearGradient>
  <linearGradient id="mingPorcelainSheenGrad" x1="5%" y1="100%" x2="90%" y2="0%">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0" />
    <stop offset="40%" stop-color="#e8f5f4" stop-opacity="0.3" />
    <stop offset="53%" stop-color="#ffffff" stop-opacity="0.86" />
    <stop offset="68%" stop-color="#c7e0ed" stop-opacity="0.32" />
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
  </linearGradient>

  <!-- 31. 景泰掐丝珐琅：松石蓝绿、孔雀青、宝蓝与鎏金铜丝 -->
  <linearGradient id="mingJingtaiTurquoiseGrad" x1="0%" y1="0%" x2="100%" y2="30%">
    <stop offset="0%" stop-color="#086c72" />
    <stop offset="18%" stop-color="#159a98" />
    <stop offset="38%" stop-color="#66c6b3" />
    <stop offset="54%" stop-color="#b1dfc7" />
    <stop offset="72%" stop-color="#248d89" />
    <stop offset="100%" stop-color="#075b66" />
  </linearGradient>
  <linearGradient id="mingJingtaiCobaltCellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#123e91" />
    <stop offset="46%" stop-color="#316bc1" />
    <stop offset="100%" stop-color="#102c6c" />
  </linearGradient>
  <linearGradient id="mingJingtaiJadeCellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#226b56" />
    <stop offset="50%" stop-color="#6bb078" />
    <stop offset="100%" stop-color="#174e49" />
  </linearGradient>
  <linearGradient id="mingJingtaiMetalSheenGrad" x1="4%" y1="100%" x2="94%" y2="0%">
    <stop offset="0%" stop-color="#fff4b1" stop-opacity="0" />
    <stop offset="38%" stop-color="#f8e08b" stop-opacity="0.36" />
    <stop offset="51%" stop-color="#fffdf0" stop-opacity="0.88" />
    <stop offset="63%" stop-color="#e5bb54" stop-opacity="0.38" />
    <stop offset="100%" stop-color="#fff8d5" stop-opacity="0" />
  </linearGradient>
`.trim();
