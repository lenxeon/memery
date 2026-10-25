/**
 * @file registry.ts
 * @description 空间主题注册表。新增主题只需注册一份定义并放入对应 PNG 资产。
 */
import type { SceneThemeDefinition, SceneThemeId } from '../../../types';
import { createDefaultSceneAssembly } from '../components';

const theme = (definition: SceneThemeDefinition): SceneThemeDefinition => definition;

export const SCENE_THEME_REGISTRY: Record<SceneThemeId, SceneThemeDefinition> = {
  classic_dawn: theme({
    id: 'classic_dawn',
    name: '晴岚映曜', poeticTitle: '晨光沐影', iconText: '🏛️',
    desc: '支摘槛窗 · 横披纳远岫、冰裂格心透光', tag: '经典圣洁',
    wall: {
      wallpaper: {
        url: '/themes/classic_dawn/wallpapers/phone/ink-landscape-render-match.png',
        fit: 'cover',
        responsiveAssets: {
          phone: '/themes/classic_dawn/wallpapers/phone/ink-landscape-render-match.png',
          tablet: '/themes/classic_dawn/wallpapers/tablet/ink-landscape-render-match.png',
        },
      },
      portrait: { scale: 1.02, dy: 6, textDy: 2, textGap: 2 },
    },
    foregroundSetIds: ['plum_blossom', 'camellia', 'osmanthus', 'magnolia', 'peach_blossom', 'wintersweet'],
    defaultForegroundSetId: 'plum_blossom',
    defaultAssembly: createDefaultSceneAssembly('plum_blossom'),
    floorMaterial: {
      url: '/themes/classic_dawn/floor/polished-chestnut-plane-render-match-v2.png',
      mode: 'projected-plane',
      baseColor: 0x805339,
      baseboard: { color: 0x6f3d22, highlight: 0xc28a58 },
    },
    tableAssetUrl: '/themes/classic_dawn/table/altar-table-render-match.png',
    preset: { floor: 'hinoki_wood', tablecloth: 'autumn_gold', tableWood: 'walnut', tableRunner: false,
      lighting: { sunAngle: -20, sunlightIntensity: 0.92, godRaysIntensity: 0.68, godRaysEnabled: true } },
    lightRig: { source: { x: 0.82, y: 0.12 }, sunAngle: -20, sunlightIntensity: 0.92,
      godRaysIntensity: 0.68, godRaysEnabled: true, keyColor: 0xffedc2, ambientColor: 0xf2e8dc,
      shadowDirection: { x: -0.76, y: 0.65 } },
  }),
  heritage_wood: theme({
    id: 'heritage_wood',
    name: '暮林晚钟', poeticTitle: '沉香花格', iconText: '🏮',
    desc: '紫檀落地罩 · 素壁留白只嵌一扇冰裂漏窗', tag: '传家古韵',
    wall: { wallpaper: { url: '/textures/wall/wall_01.png', fit: 'cover' } },
    preset: { floor: 'walnut_plank', tablecloth: 'indigo_linen', tableWood: 'walnut', tableRunner: true,
      lighting: { sunAngle: 8, sunlightIntensity: 0.64, godRaysIntensity: 0.24, godRaysEnabled: true } },
    lightRig: { source: { x: 0.28, y: 0.16 }, sunAngle: 8, sunlightIntensity: 0.64,
      godRaysIntensity: 0.24, godRaysEnabled: true, keyColor: 0xffd49b, ambientColor: 0xd9c6af,
      shadowDirection: { x: 0.68, y: 0.72 } },
  }),
  royal_drape: theme({
    id: 'royal_drape',
    name: '华彩生光', poeticTitle: '皇家帷幔', iconText: '🎭',
    desc: '深绛丝绒帷幔半开 · 幔内月洞一线远岫', tag: '庄重华美',
    wall: { wallpaper: { url: '/textures/wall/wall_03.png', fit: 'cover' } },
    preset: { floor: 'herringbone_wood', tablecloth: 'cinnabar_red', tableWood: 'cherry', tableRunner: true,
      lighting: { sunAngle: -8, sunlightIntensity: 0.74, godRaysIntensity: 0.32, godRaysEnabled: true } },
    lightRig: { source: { x: 0.76, y: 0.16 }, sunAngle: -8, sunlightIntensity: 0.74,
      godRaysIntensity: 0.32, godRaysEnabled: true, keyColor: 0xffcc83, ambientColor: 0x9e624f,
      shadowDirection: { x: -0.72, y: 0.7 } },
  }),
  bronze_mirror: theme({
    id: 'bronze_mirror',
    name: '圆满如月', poeticTitle: '铜镜华光', iconText: '🌕',
    desc: '圆光罩镶镏金铜镜 · 莲瓣铸边镜中借景', tag: '圆满通达',
    wall: { wallpaper: { url: '/textures/wall/wall_04.png', fit: 'cover' } },
    preset: { floor: 'hinoki_wood', tablecloth: 'moonlight_white', tableWood: 'walnut', tableRunner: false,
      lighting: { sunAngle: -4, sunlightIntensity: 0.8, godRaysIntensity: 0.28, godRaysEnabled: true } },
    lightRig: { source: { x: 0.68, y: 0.1 }, sunAngle: -4, sunlightIntensity: 0.8,
      godRaysIntensity: 0.28, godRaysEnabled: true, keyColor: 0xffe1a9, ambientColor: 0xe9dcc8,
      shadowDirection: { x: -0.64, y: 0.76 } },
  }),
  brick_screen: theme({
    id: 'brick_screen',
    name: '古朴苍然', poeticTitle: '月洞空灵', iconText: '🪟',
    desc: '月洞门水墨二重远山 · 冰裂漏窗竹影宫灯', tag: '东方雅意',
    preset: { floor: 'zen_tatami', tablecloth: 'evergreen_pine', tableWood: 'walnut', tableRunner: true,
      lighting: { sunAngle: 12, sunlightIntensity: 0.58, godRaysIntensity: 0.18, godRaysEnabled: true } },
    lightRig: { source: { x: 0.24, y: 0.14 }, sunAngle: 12, sunlightIntensity: 0.58,
      godRaysIntensity: 0.18, godRaysEnabled: true, keyColor: 0xe8d7bb, ambientColor: 0xa8aca1,
      shadowDirection: { x: 0.78, y: 0.62 } },
  }),
  lotus_mandorla: theme({
    id: 'lotus_mandorla',
    name: '宝相庄严', poeticTitle: '莲台佛境', iconText: '🪷',
    desc: '佛龛欢门暖金 · 两层宝相花莲台一缕清香', tag: '福佑庄严',
    preset: { floor: 'marble_tile', tablecloth: 'sandalwood_purple', tableWood: 'walnut', tableRunner: true,
      lighting: { sunAngle: 0, sunlightIntensity: 0.66, godRaysIntensity: 0.22, godRaysEnabled: true } },
    lightRig: { source: { x: 0.5, y: 0.08 }, sunAngle: 0, sunlightIntensity: 0.66,
      godRaysIntensity: 0.22, godRaysEnabled: true, keyColor: 0xffd57d, ambientColor: 0x6d594b,
      shadowDirection: { x: 0, y: 1 } },
  }),
  ancestral_hall: theme({
    id: 'ancestral_hall',
    name: '祠堂暖阁', poeticTitle: '慈颜春晖', iconText: '🏮',
    desc: '紫檀月洞门 · 双侧宫灯 · 梅枝远山', tag: '中式祠堂',
    wall: {
      wallpaper: { url: '/themes/ancestral_warmth/wallpapers/ink-warm-silk.png', fit: 'cover' },
      portrait: { scale: 1.04, dy: 8, textDy: 4, textGap: 2 },
    },
    foregroundSetIds: ['warm_foliage'],
    defaultForegroundSetId: 'warm_foliage',
    defaultAssembly: createDefaultSceneAssembly('warm_foliage'),
    floorMaterial: {
      url: '/themes/ancestral_warmth/floor-wood.png',
      tileSize: { w: 310, h: 310 },
      baseColor: 0xc78d51,
      baseboard: { color: 0x6f3d22, highlight: 0xc28a58 },
    },
    preset: { floor: 'hinoki_wood', tablecloth: 'moonlight_white', tableWood: 'huanghuali', tableRunner: true,
      lighting: { sunAngle: -18, sunlightIntensity: 0.86, godRaysIntensity: 0.34, godRaysEnabled: true } },
    lightRig: { source: { x: 0.86, y: 0.16 }, sunAngle: -18, sunlightIntensity: 0.86,
      godRaysIntensity: 0.34, godRaysEnabled: true, keyColor: 0xffc86b, ambientColor: 0xe7c99d,
      shadowDirection: { x: -0.82, y: 0.57 } },
  }),
};

export const SCENE_THEME_OPTIONS = Object.values(SCENE_THEME_REGISTRY);

export const getSceneTheme = (id: SceneThemeId): SceneThemeDefinition =>
  SCENE_THEME_REGISTRY[id] ?? SCENE_THEME_REGISTRY.classic_dawn;
