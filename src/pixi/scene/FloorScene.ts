/**
 * @file FloorScene.ts
 * @description 地坪场景元素（纯 TS，无 React 依赖）。
 *
 * 自持 DOM 结构与材质/光影状态：真·CSS 3D 纵深压缩与近大远小视锥透视。
 * 风格或光影变化时整体重建（切换动作低频，重建成本可忽略）。
 */
import type { FloorStyle, LightingSettings, TimeOfDay } from '../../types';

export interface FloorSceneOptions {
  lighting: LightingSettings;
  floorStyle?: FloorStyle;
}

/** 地坪材质选项（UI 面板用于展示与选择） */
export const FLOOR_STYLE_OPTIONS: {
  id: FloorStyle;
  name: string;
  poeticTitle: string;
  desc: string;
  iconText: string;
  tag: string;
  textureUrl: string;
}[] = [
  {
    id: 'hinoki_wood',
    name: '日式浅暖原木',
    poeticTitle: '晴岚暖木',
    desc: '对标参考图 1！阳光倾洒茶室的明朗浅橡原木大长板，温厚治愈，透视纵深开阔。',
    iconText: '🪵',
    tag: '图1核心推荐',
    textureUrl: '/textures/hinoki_wood.jpg',
  },
  {
    id: 'walnut_plank',
    name: '自然胡桃宽板',
    poeticTitle: '檀影温润',
    desc: '对标参考图 3！北美黑胡桃宽板错缝地板，木纹舒展流淌，斜切微倒角温润高级。',
    iconText: '🌲',
    tag: '图3奢雅质感',
    textureUrl: '/textures/walnut_plank.jpg',
  },
  {
    id: 'herringbone_wood',
    name: '暖木人字拼花',
    poeticTitle: '暖木拼花',
    desc: '对标参考图 2！经典手绘橡木人字拼实木地板，交织错落，立体层次分明。',
    iconText: '🏡',
    tag: '图2经典大宅',
    textureUrl: '/textures/herringbone_wood.jpg',
  },
  {
    id: 'zen_tatami',
    name: '禅意草木素席',
    poeticTitle: '幽香素席',
    desc: '对标参考图 1 禅意座榻！日式草木素麻编织地席配雅致深色包边，质朴静谧。',
    iconText: '🍵',
    tag: '图1茶室禅风',
    textureUrl: '/textures/zen_tatami.jpg',
  },
  {
    id: 'marble_tile',
    name: '汉白玉大理石',
    poeticTitle: '如意方砖',
    desc: '原版受好评的皇家级云石大方砖，光洁温润，美缝清晰，带近大远小倒影反光。',
    iconText: '🏛️',
    tag: '光洁高华',
    textureUrl: '/textures/marble_tile.jpg',
  },
];

const textureUrlOf = (style: FloorStyle): string => {
  switch (style) {
    case 'walnut_plank':
      return '/textures/walnut_plank.jpg';
    case 'herringbone_wood':
    case 'wood_planks':
      return '/textures/herringbone_wood.jpg';
    case 'zen_tatami':
      return '/textures/zen_tatami.jpg';
    case 'marble_tile':
      return '/textures/marble_tile.jpg';
    case 'hinoki_wood':
    default:
      return '/textures/hinoki_wood.jpg';
  }
};

interface FloorAttrs {
  bgSize: string;
  baseboardBg: string;
  baseboardHighlight: string;
  baseboardShadow: string;
}

const attrsOf = (style: FloorStyle): FloorAttrs => {
  switch (style) {
    case 'marble_tile':
      // 素材 910x910 正方形，1:1 平铺，杜绝非等比拉伸
      return {
        bgSize: '160px 160px',
        baseboardBg: '#a89884',
        baseboardHighlight: '#ffffff',
        baseboardShadow: 'rgba(60, 50, 40, 0.45)',
      };
    case 'zen_tatami':
      return {
        bgSize: '340px 190px',
        baseboardBg: '#4a3b2c',
        baseboardHighlight: '#8a735c',
        baseboardShadow: 'rgba(25, 18, 12, 0.75)',
      };
    case 'walnut_plank':
      return {
        bgSize: '280px 156px',
        baseboardBg: '#4e3322',
        baseboardHighlight: '#8c6044',
        baseboardShadow: 'rgba(30, 16, 8, 0.75)',
      };
    case 'herringbone_wood':
    case 'wood_planks':
      return {
        bgSize: '280px 156px',
        baseboardBg: '#5a2e16',
        baseboardHighlight: '#a3633d',
        baseboardShadow: 'rgba(45, 24, 12, 0.65)',
      };
    case 'hinoki_wood':
    default:
      return {
        bgSize: '240px 195px',
        baseboardBg: '#8c5a32',
        baseboardHighlight: '#e5ab75',
        baseboardShadow: 'rgba(60, 32, 14, 0.65)',
      };
  }
};

interface FloorAmbiance {
  filter: string;
  tintColor: string;
  lightPuddle: string;
}

const ambianceOf = (masterOn: boolean, timeOfDay: TimeOfDay): FloorAmbiance => {
  if (!masterOn) {
    return {
      filter: 'brightness(0.24) contrast(1.18) saturate(0.6)',
      tintColor: 'rgba(5, 4, 3, 0.75)',
      lightPuddle: 'rgba(255, 200, 120, 0.06)',
    };
  }
  switch (timeOfDay) {
    case 'sunset':
      return {
        filter: 'brightness(0.98) contrast(1.08) saturate(1.22)',
        tintColor: 'rgba(190, 95, 25, 0.14)',
        lightPuddle: 'rgba(255, 215, 140, 0.58)',
      };
    case 'night':
      return {
        filter: 'brightness(0.42) contrast(1.22) saturate(0.55) hue-rotate(200deg)',
        tintColor: 'rgba(10, 18, 32, 0.58)',
        lightPuddle: 'rgba(180, 210, 255, 0.18)',
      };
    case 'day':
    default:
      return {
        filter: 'brightness(1.03) contrast(1.04) saturate(1.02)',
        tintColor: 'rgba(255, 248, 230, 0.05)',
        lightPuddle: 'rgba(255, 250, 235, 0.65)',
      };
  }
};

export class FloorScene {
  private readonly root: HTMLDivElement;
  private opts: FloorSceneOptions;

  constructor(opts: FloorSceneOptions) {
    this.opts = opts;
    this.root = document.createElement('div');
    this.root.className =
      'absolute inset-x-0 bottom-0 h-[210px] sm:h-[240px] w-full pointer-events-none select-none z-10 overflow-hidden';
  }

  mount(container: HTMLElement): void {
    container.appendChild(this.root);
    this.render();
  }

  setOptions(patch: Partial<FloorSceneOptions>): void {
    this.opts = { ...this.opts, ...patch };
    this.render();
  }

  destroy(): void {
    this.root.remove();
  }

  private render(): void {
    const { lighting, floorStyle = 'hinoki_wood' } = this.opts;
    const { masterOn, timeOfDay, sunAngle, sunlightIntensity, godRaysEnabled } = lighting;
    const lightFactor = masterOn ? sunlightIntensity : 0.08;
    const attrs = attrsOf(floorStyle);
    const ambiance = ambianceOf(masterOn, timeOfDay);

    this.root.innerHTML = `
      <div class="absolute top-0 inset-x-0 h-5 z-25 flex flex-col justify-start pointer-events-none shadow-sm">
        <div class="w-full h-[2px] transition-colors duration-500" style="background-color:${attrs.baseboardHighlight}"></div>
        <div class="w-full h-[12px] flex flex-col justify-between transition-colors duration-500" style="background-color:${attrs.baseboardBg};background-image:linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.3) 100%)">
          <div class="w-full h-[1px] bg-black/35 mt-0.5"></div>
          <div class="w-full h-[1px] bg-white/20 mb-0.5"></div>
        </div>
        <div class="w-full h-[6px]" style="background:linear-gradient(to bottom, ${attrs.baseboardShadow} 0%, transparent 100%)"></div>
      </div>

      <div class="absolute inset-0 top-4 overflow-hidden" style="perspective:420px;perspective-origin:50% -15%">
        <div class="relative w-full h-[260%] origin-top transition-all duration-700" style="transform:rotateX(66deg) scale(1.36, 1.26);background-image:url(${textureUrlOf(floorStyle)});background-repeat:repeat;background-size:${attrs.bgSize};background-position:center top;filter:${ambiance.filter}">
          <div class="absolute inset-0 transition-colors duration-700 pointer-events-none" style="background-color:${ambiance.tintColor}"></div>
          <div class="absolute inset-0 pointer-events-none" style="background:linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.08) 35%, transparent 65%, rgba(255,255,255,0.08) 100%)"></div>
          <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse at 50% 100%, transparent 55%, rgba(0,0,0,0.22) 100%)"></div>
        </div>
      </div>

      ${
        masterOn && godRaysEnabled
          ? `<div class="absolute inset-0 flex items-center justify-center transition-all duration-700 pointer-events-none z-15" style="opacity:${lightFactor * 0.85};transform:translateX(${sunAngle * 3}px)">
        <div class="w-[88%] max-w-[740px] h-[140px] rounded-full pointer-events-none" style="background:radial-gradient(ellipse at 50% 50%, ${ambiance.lightPuddle} 0%, transparent 70%);filter:blur(16px)"></div>
      </div>`
          : ''
      }

      <div class="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[620px] h-14 rounded-full pointer-events-none z-20" style="background:radial-gradient(ellipse at 50% 50%, rgba(15,8,4,0.76) 0%, rgba(25,14,6,0.3) 50%, transparent 80%);filter:blur(6px)"></div>
    `.trim();
  }
}
