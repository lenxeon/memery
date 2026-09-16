/**
 * @file FloorPlanks.tsx
 * @description 祭坛地面系统，100% 严选对标参考图 1、图 2、图 3 所示的暖木禅意大宅风格，
 * 搭载 5 款工业级 2D 手绘写实超清原木与禅意材质资产，具备真实 3D 纵深透视（近大远小视锥压缩）与晨昏光影。
 */
import React from 'react';
import { LightingSettings, FloorStyle } from '../../types';

interface FloorPlanksProps {
  lighting: LightingSettings;
  floorStyle?: FloorStyle;
}

export const FLOOR_STYLE_OPTIONS = [
  {
    id: 'hinoki_wood' as FloorStyle,
    name: '日式浅暖原木',
    poeticTitle: '晴岚暖木',
    desc: '对标参考图 1！阳光倾洒茶室的明朗浅橡原木大长板，温厚治愈，透视纵深开阔。',
    iconText: '🪵',
    tag: '图1核心推荐',
    textureUrl: '/textures/hinoki_wood.jpg',
  },
  {
    id: 'walnut_plank' as FloorStyle,
    name: '自然胡桃宽板',
    poeticTitle: '檀影温润',
    desc: '对标参考图 3！北美黑胡桃宽板错缝地板，木纹舒展流淌，斜切微倒角温润高级。',
    iconText: '🌲',
    tag: '图3奢雅质感',
    textureUrl: '/textures/walnut_plank.jpg',
  },
  {
    id: 'herringbone_wood' as FloorStyle,
    name: '暖木人字拼花',
    poeticTitle: '暖木拼花',
    desc: '对标参考图 2！经典手绘橡木人字拼实木地板，交织错落，立体层次分明。',
    iconText: '🏡',
    tag: '图2经典大宅',
    textureUrl: '/textures/herringbone_wood.jpg',
  },
  {
    id: 'zen_tatami' as FloorStyle,
    name: '禅意草木素席',
    poeticTitle: '幽香素席',
    desc: '对标参考图 1 禅意座榻！日式草木素麻编织地席配雅致深色包边，质朴静谧。',
    iconText: '🍵',
    tag: '图1茶室禅风',
    textureUrl: '/textures/zen_tatami.jpg',
  },
  {
    id: 'marble_tile' as FloorStyle,
    name: '汉白玉大理石',
    poeticTitle: '如意方砖',
    desc: '原版受好评的皇家级云石大方砖，光洁温润，美缝清晰，带近大远小倒影反光。',
    iconText: '🏛️',
    tag: '光洁高华',
    textureUrl: '/textures/marble_tile.jpg',
  },
];

export const FloorPlanks: React.FC<FloorPlanksProps> = ({ 
  lighting, 
  floorStyle = 'hinoki_wood' 
}) => {
  const { masterOn, timeOfDay, sunAngle, sunlightIntensity, godRaysEnabled } = lighting;
  const lightFactor = masterOn ? sunlightIntensity : 0.08;

  // 映射当前风格贴图路径
  const getTextureUrl = () => {
    switch (floorStyle) {
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

  // 根据当前材质类型调整贴图尺寸与踢脚线用色（完全匹配暖木与禅意体系）
  const getStyleAttributes = () => {
    switch (floorStyle) {
      case 'marble_tile':
        return {
          bgSize: '320px 180px',
          baseboardBg: '#a89884',
          baseboardHighlight: '#ffffff',
          baseboardShadow: 'rgba(60, 50, 40, 0.45)',
        };
      case 'zen_tatami':
        return {
          bgSize: '360px 200px',
          baseboardBg: '#4a3b2c',
          baseboardHighlight: '#8a735c',
          baseboardShadow: 'rgba(25, 18, 12, 0.75)',
        };
      case 'walnut_plank':
        return {
          bgSize: '280px 180px',
          baseboardBg: '#4e3322',
          baseboardHighlight: '#8c6044',
          baseboardShadow: 'rgba(30, 16, 8, 0.75)',
        };
      case 'herringbone_wood':
      case 'wood_planks':
        return {
          bgSize: '280px 155px',
          baseboardBg: '#5a2e16',
          baseboardHighlight: '#a3633d',
          baseboardShadow: 'rgba(45, 24, 12, 0.65)',
        };
      case 'hinoki_wood':
      default:
        return {
          bgSize: '280px 180px',
          baseboardBg: '#8c5a32',
          baseboardHighlight: '#e5ab75',
          baseboardShadow: 'rgba(60, 32, 14, 0.65)',
        };
    }
  };

  const attrs = getStyleAttributes();

  // 根据时间动态计算光影滤镜（保持图1温暖明亮通透的基调）
  const getAmbianceFilter = () => {
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

  const ambiance = getAmbianceFilter();

  return (
    <div 
      className="absolute inset-x-0 bottom-0 h-[210px] sm:h-[240px] w-full pointer-events-none select-none z-10 overflow-hidden"
    >
      {/* ── 1. 顶部写实实木雕花踢脚线 (位于供桌台面后下方，自然衔接墙地) ── */}
      <div className="absolute top-0 inset-x-0 h-5 z-25 flex flex-col justify-start pointer-events-none shadow-sm">
        {/* 1.1 顶面微光修边 */}
        <div 
          className="w-full h-[2px] transition-colors duration-500" 
          style={{ backgroundColor: attrs.baseboardHighlight }} 
        />
        {/* 1.2 踢脚线立体主身 (实木雕花双层凹凸线脚) */}
        <div 
          className="w-full h-[12px] flex flex-col justify-between transition-colors duration-500" 
          style={{
            backgroundColor: attrs.baseboardBg,
            backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.3) 100%)',
          }} 
        >
          <div className="w-full h-[1px] bg-black/35 mt-0.5" />
          <div className="w-full h-[1px] bg-white/20 mb-0.5" />
        </div>
        {/* 1.3 踢脚线与地面咬合的深沉投影切缝 */}
        <div 
          className="w-full h-[6px]" 
          style={{
            background: `linear-gradient(to bottom, ${attrs.baseboardShadow} 0%, transparent 100%)`,
          }} 
        />
      </div>

      {/* ── 2. 地坪主体：真·CSS 3D 纵深压缩与近大远小视锥透视 ── */}
      <div 
        className="absolute inset-0 top-4 overflow-hidden"
        style={{
          perspective: '420px',
          perspectiveOrigin: '50% -15%',
        }}
      >
        <div 
          className="relative w-full h-[260%] origin-top transition-all duration-700"
          style={{
            transform: 'rotateX(66deg) scale(1.36, 1.26)',
            backgroundImage: `url(${getTextureUrl()})`,
            backgroundRepeat: 'repeat',
            backgroundSize: attrs.bgSize,
            backgroundPosition: 'center top',
            filter: ambiance.filter,
          }}
        >
          {/* 光照色相温润漫反射滤层 */}
          <div 
            className="absolute inset-0 transition-colors duration-700 pointer-events-none"
            style={{ backgroundColor: ambiance.tintColor }}
          />

          {/* 自然视线景深光影：远处幽微深沉、近处受光清晰（极强近大远小空间感） */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.08) 35%, transparent 65%, rgba(255,255,255,0.08) 100%)',
            }}
          />

          {/* 近景两侧微弱暗角，引导视觉汇聚向供案中心 */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 100%, transparent 55%, rgba(0,0,0,0.22) 100%)',
            }}
          />
        </div>
      </div>

      {/* ── 3. 窗外晨曦日光投射在地面的聚光光斑 (Ambient Sunlight Floor Pool) ── */}
      {masterOn && godRaysEnabled && (
        <div 
          className="absolute inset-0 flex items-center justify-center transition-all duration-700 pointer-events-none z-15"
          style={{
            opacity: lightFactor * 0.85,
            transform: `translateX(${sunAngle * 3}px)`,
          }}
        >
          <div 
            className="w-[88%] max-w-[740px] h-[140px] rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 50%, ${ambiance.lightPuddle} 0%, transparent 70%)`,
              filter: 'blur(16px)',
            }}
          />
        </div>
      )}

      {/* ── 4. 供桌台脚与基座沉稳接地阴影 (Table Ambient Occlusion Shadow) ── */}
      <div 
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[620px] h-14 rounded-full pointer-events-none z-20"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(15,8,4,0.76) 0%, rgba(25,14,6,0.3) 50%, transparent 80%)',
          filter: 'blur(6px)',
        }}
      />
    </div>
  );
};
