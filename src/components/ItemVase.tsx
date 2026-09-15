import React from 'react';
import { FlowerType } from '../types';
import { ItemLifecycle } from '../game/types/entity';
import { sound } from '../utils/audio';
import { Sparkles } from 'lucide-react';

interface ItemVaseProps {
  flowerType?: FlowerType;
  scale?: number;
  className?: string;
  isRightSide?: boolean;
  lifecycle?: ItemLifecycle;
  onRevitalize?: () => void;
}

// 颜色线性插值工具：真实模拟花瓣与叶片从鲜活到干枯褐变的过程
function lerpColor(hex1: string, hex2: string, factor: number): string {
  const clampF = Math.max(0, Math.min(1, factor));
  const parse = (h: string) => {
    const hex = h.replace('#', '');
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16),
    };
  };
  const c1 = parse(hex1);
  const c2 = parse(hex2);
  const r = Math.round(c1.r + (c2.r - c1.r) * clampF);
  const g = Math.round(c1.g + (c2.g - c1.g) * clampF);
  const b = Math.round(c1.b + (c2.b - c1.b) * clampF);
  return `rgb(${r}, ${g}, ${b})`;
}

// 枝头花瓣逐层脱落状态计算
function getBlossomDropStyle(health: number, dropThreshold: number) {
  if (health > dropThreshold) {
    const approach = Math.max(0, (dropThreshold + 0.12 - health) / 0.12);
    return {
      opacity: 1,
      droopY: approach * 4.0,
      isShed: false,
    };
  }
  return {
    opacity: 0,
    droopY: 8,
    isShed: true,
  };
}

// 散落与飘落花瓣配置结构
interface FallingPetalDef {
  id: number;
  detachHealth: number; // 开始脱落的生机阈值
  fallSpan: number;     // 在空中下坠飘落所跨越的生机区间
  startX: number;       // 花头起始 X
  startY: number;       // 花头起始 Y
  landX: number;        // 桌面上最终着陆 X
  landY: number;        // 桌面上最终着陆 Y (靠近瓶底 y=193 案面)
  rx: number;           // 花瓣尺寸
  ry: number;
  landRot: number;      // 落地后的最终平铺旋转角度
  swayAmp: number;      // 飘落时的左右空气阻力摇曳幅度
  swayFreq: number;     // 摇曳频率
}

// 牡丹 5 个花头的落瓣轨迹
const PEONY_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.50, fallSpan: 0.06, startX: 114, startY: 44, landX: 118, landY: 194, rx: 5.5, ry: 3.2, landRot: 28, swayAmp: 14, swayFreq: 3.0 },
  { id: 2, detachHealth: 0.40, fallSpan: 0.06, startX: 36, startY: 54, landX: 38, landY: 193, rx: 6.0, ry: 3.6, landRot: -35, swayAmp: 12, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.30, fallSpan: 0.06, startX: 96, startY: 58, landX: 104, landY: 195, rx: 6.5, ry: 3.8, landRot: -24, swayAmp: 15, swayFreq: 3.8 },
  { id: 4, detachHealth: 0.20, fallSpan: 0.06, startX: 76, startY: 26, landX: 84, landY: 197, rx: 6.4, ry: 3.6, landRot: 40, swayAmp: 18, swayFreq: 4.2 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.05, startX: 54, startY: 46, landX: 62, landY: 196, rx: 7.0, ry: 4.0, landRot: 16, swayAmp: 14, swayFreq: 4.0 },
];

// 百合 5 个花头的落瓣轨迹
const LILY_FALLING_PETALS: FallingPetalDef[] = [
  { id: 1, detachHealth: 0.50, fallSpan: 0.06, startX: 116, startY: 36, landX: 120, landY: 194, rx: 6.5, ry: 2.8, landRot: 35, swayAmp: 14, swayFreq: 3.0 },
  { id: 2, detachHealth: 0.40, fallSpan: 0.06, startX: 34, startY: 54, landX: 36, landY: 193, rx: 7.2, ry: 3.0, landRot: -40, swayAmp: 13, swayFreq: 3.5 },
  { id: 3, detachHealth: 0.30, fallSpan: 0.06, startX: 52, startY: 68, landX: 54, landY: 195, rx: 8.0, ry: 3.2, landRot: 22, swayAmp: 16, swayFreq: 4.0 },
  { id: 4, detachHealth: 0.20, fallSpan: 0.06, startX: 75, startY: 26, landX: 82, landY: 197, rx: 7.5, ry: 2.8, landRot: 45, swayAmp: 18, swayFreq: 4.2 },
  { id: 5, detachHealth: 0.08, fallSpan: 0.05, startX: 98, startY: 52, landX: 98, landY: 196, rx: 7.6, ry: 2.9, landRot: -18, swayAmp: 14, swayFreq: 4.0 },
];

export const ItemVase: React.FC<ItemVaseProps> = ({
  flowerType = 'peonies',
  scale = 1,
  className = '',
  isRightSide = false,
  lifecycle,
  onRevitalize,
}) => {
  const stage = lifecycle?.stage || 'blooming';
  const health = lifecycle?.health ?? 1.0;

  // ── 生命演化计算 (真花枯萎色相、褐变系数、枝条木质化) ──
  const dryFactor = Math.max(0, Math.min(1.0, (0.75 - health) / 0.70));

  // 枯枝与落尽状态
  const isBareOrWithered = stage === 'withered' || stage === 'expired' || health <= 0.05;

  let stageLabel = '盛开';
  if (stage === 'budding') stageLabel = '含苞';
  else if (stage === 'blooming') stageLabel = '盛开';
  else if (stage === 'wilting') stageLabel = '微凋';
  else if (stage === 'withered') stageLabel = '枯萎';
  else if (stage === 'expired') stageLabel = '枯枝';

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRevitalize) {
      sound.playBell(580, 2);
      onRevitalize();
    }
  };

  // 枝头各花朵的生机与微垂计算
  const budState = getBlossomDropStyle(health, 0.50);
  const sideState = getBlossomDropStyle(health, 0.40);
  const secState = getBlossomDropStyle(health, 0.30);
  const crownState = getBlossomDropStyle(health, 0.20);
  const mainState = getBlossomDropStyle(health, 0.08);

  // 叶片渐黄脱落
  const leafOpacity = Math.max(0, Math.min(1, (health - 0.06) / 0.4));

  // 枝干木质化渐变色 (碧绿鲜茎 -> 苍劲老干冬枝)
  const stemCol0 = lerpColor('#4d6632', '#543722', dryFactor);
  const stemCol50 = lerpColor('#718e4c', '#754f32', dryFactor);
  const stemCol100 = lerpColor('#3d5226', '#362113', dryFactor);

  // 叶片渐变色 (翠玉鲜绿 -> 深秋焦褐)
  const leafCol0 = lerpColor('#84a659', '#8c6b38', dryFactor);
  const leafCol60 = lerpColor('#557235', '#614723', dryFactor);
  const leafCol100 = lerpColor('#2e421a', '#3d2a13', dryFactor);

  // 牡丹真花枯萎渐变色
  const peonyDeep0 = lerpColor('#ffedf3', '#e8ded6', dryFactor);
  const peonyDeep40 = lerpColor('#f8a7be', '#c9a38f', dryFactor);
  const peonyDeep85 = lerpColor('#e76b8d', '#946755', dryFactor);
  const peonyDeep100 = lerpColor('#b8385d', '#5a3828', dryFactor);

  const peonySoft0 = lerpColor('#fff6f8', '#f2ebe6', dryFactor);
  const peonySoft50 = lerpColor('#fbc2d2', '#d6b5a3', dryFactor);
  const peonySoft85 = lerpColor('#f486a4', '#a67c69', dryFactor);
  const peonySoft100 = lerpColor('#cb4b72', '#6e4735', dryFactor);

  // 百合真花枯萎渐变色
  const lilyPetal0 = lerpColor('#ffffff', '#f4efe6', dryFactor);
  const lilyPetal65 = lerpColor('#faf9f4', '#ded1b8', dryFactor);
  const lilyPetal85 = lerpColor('#eef1df', '#b89f78', dryFactor);
  const lilyPetal100 = lerpColor('#c6d6a5', '#7d6547', dryFactor);

  const lilyThroat0 = lerpColor('#e1eeb5', '#b09868', dryFactor);
  const lilyThroat100 = lerpColor('#9cb862', '#634825', dryFactor);

  // 选取当前花卉对应的掉落花瓣轨迹数据
  const fallingDefs = flowerType === 'peonies' ? PEONY_FALLING_PETALS : LILY_FALLING_PETALS;

  return (
    <div 
      onClick={handleClick}
      title={isBareOrWithered ? "繁花落尽 · 案头枯枝（点击添水剪枝，枯木逢春）" : `瓶插花卉（状态：${stageLabel} · 生机 ${Math.round(health * 100)}%）`}
      className={`relative select-none pointer-events-auto cursor-pointer group ${className}`}
      style={{
        width: 152 * scale,
        height: 204 * scale,
      }}
    >
      {/* 枯木逢春 / 添水复苏悬浮提示 */}
      {isBareOrWithered && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-amber-950/90 text-[10px] font-medium text-amber-200 border border-amber-400/60 shadow-lg backdrop-blur-xs pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 z-30 whitespace-nowrap">
          <Sparkles size={11} className="text-amber-400 animate-spin" style={{ animationDuration: '3s' }} />
          <span>枯木逢春 · 点击焕活</span>
        </div>
      )}

      <svg 
        viewBox="0 0 152 204" 
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Porcelain Fluted Facets Gradients */}
          <linearGradient id={`vaseLeftFacet_${flowerType}_${isRightSide}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ded9d1" />
            <stop offset="100%" stopColor="#f5f0e8" />
          </linearGradient>

          <linearGradient id={`vaseCenterFacet_${flowerType}_${isRightSide}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f7f2ea" />
            <stop offset="40%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f0e9df" />
          </linearGradient>

          <linearGradient id={`vaseRightFacet_${flowerType}_${isRightSide}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e5ded4" />
            <stop offset="100%" stopColor="#c5bcb0" />
          </linearGradient>

          {/* Peony Dynamic Lifelike Gradients */}
          <radialGradient id={`peonyDeep_${isRightSide}`} cx="45%" cy="45%" r="55%">
            <stop offset="0%" stopColor={peonyDeep0} />
            <stop offset="40%" stopColor={peonyDeep40} />
            <stop offset="85%" stopColor={peonyDeep85} />
            <stop offset="100%" stopColor={peonyDeep100} />
          </radialGradient>
          <radialGradient id={`peonySoft_${isRightSide}`} cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor={peonySoft0} />
            <stop offset="50%" stopColor={peonySoft50} />
            <stop offset="85%" stopColor={peonySoft85} />
            <stop offset="100%" stopColor={peonySoft100} />
          </radialGradient>

          {/* Lily Dynamic Lifelike Gradients */}
          <linearGradient id={`whiteLilyPetal_${isRightSide}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={lilyPetal0} />
            <stop offset="65%" stopColor={lilyPetal65} />
            <stop offset="85%" stopColor={lilyPetal85} />
            <stop offset="100%" stopColor={lilyPetal100} />
          </linearGradient>
          <linearGradient id={`lilyThroat_${isRightSide}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={lilyThroat0} />
            <stop offset="100%" stopColor={lilyThroat100} />
          </linearGradient>

          {/* Stem & Twigs Gradients (Fresh Bark vs Aged Dry Winter Twigs) */}
          <linearGradient id={`stemGrad_${flowerType}_${isRightSide}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={stemCol0} />
            <stop offset="50%" stopColor={stemCol50} />
            <stop offset="100%" stopColor={stemCol100} />
          </linearGradient>

          {/* Leaf Gradients (Jade Green vs Autumn Dry Ochre) */}
          <linearGradient id={`leafGrad_${flowerType}_${isRightSide}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={leafCol0} />
            <stop offset="60%" stopColor={leafCol60} />
            <stop offset="100%" stopColor={leafCol100} />
          </linearGradient>
        </defs>

        {/* ── 1. 花卉植物主体 (瓶身底座静止；每朵花瓣与每片绿叶均拥有清晰可见的风吹律动) ── */}
        <g id="vaseFloraUpper">
          {/* 1.1 粉白重瓣牡丹 */}
          {flowerType === 'peonies' && (
            <g id="peoniesArt">
              {/* 5 根坚挺枝干：根部稳固，不摇摆 */}
              <g id="peonyStems">
                <path d="M 74 125 Q 68 85 54 48" stroke={`url(#stemGrad_${flowerType}_${isRightSide})`} strokeWidth="3.6" fill="none" strokeLinecap="round" />
                <path d="M 76 125 Q 86 85 96 58" stroke={`url(#stemGrad_${flowerType}_${isRightSide})`} strokeWidth="3.4" fill="none" strokeLinecap="round" />
                <path d="M 75 125 Q 75 65 76 28" stroke={`url(#stemGrad_${flowerType}_${isRightSide})`} strokeWidth="3.2" fill="none" strokeLinecap="round" />
                <path d="M 73 125 Q 56 86 36 54" stroke={`url(#stemGrad_${flowerType}_${isRightSide})`} strokeWidth="2.8" fill="none" strokeLinecap="round" />
                <path d="M 77 125 Q 96 78 114 44" stroke={`url(#stemGrad_${flowerType}_${isRightSide})`} strokeWidth="2.8" fill="none" strokeLinecap="round" />

                {/* 木节节点 */}
                <circle cx="70" cy="85" r="2.2" fill={stemCol100} opacity="0.8" />
                <circle cx="82" cy="82" r="2.0" fill={stemCol100} opacity="0.8" />
                <circle cx="75" cy="65" r="1.8" fill={stemCol100} opacity="0.8" />
              </g>

              {/* 绿叶群落：每片叶子随风起伏飘摇，幅度清晰可见 */}
              <g id="peonyLeaves" style={{ opacity: leafOpacity, transition: 'opacity 0.8s ease-out' }}>
                {/* 叶片 1：左下大叶，向右扬起摆动 */}
                <g className="animate-leaf-sway-1" style={{ transformOrigin: '52px 78px' }}>
                  <path d="M 52 78 C 30 68 14 76 8 86 C 22 92 42 90 54 81 Z" fill={`url(#leafGrad_${flowerType}_${isRightSide})`} />
                </g>

                {/* 叶片 2：右下大叶，舒缓扇动 */}
                <g className="animate-leaf-sway-2" style={{ transformOrigin: '90px 88px' }}>
                  <path d="M 90 88 C 112 80 130 86 138 96 C 122 102 104 98 90 90 Z" fill={`url(#leafGrad_${flowerType}_${isRightSide})`} />
                </g>

                {/* 叶片 3：左上嫩叶，迎风轻盈波浪起伏 */}
                <g className="animate-leaf-sway-3" style={{ transformOrigin: '42px 46px' }}>
                  <path d="M 42 46 C 24 34 12 42 8 52 C 20 58 36 54 44 48 Z" fill={`url(#leafGrad_${flowerType}_${isRightSide})`} />
                </g>

                {/* 叶片 4：右上侧叶，柔韧摆动 */}
                <g className="animate-leaf-sway-4" style={{ transformOrigin: '94px 58px' }}>
                  <path d="M 94 58 C 114 48 128 54 134 64 C 120 70 106 66 94 60 Z" fill={`url(#leafGrad_${flowerType}_${isRightSide})`} />
                </g>
              </g>

              {/* 5 朵牡丹花：每个花头随风起伏沉浮与微侧倾斜，清晰灵动 */}
              <g id="peonyBlossoms">
                {/* 1. 主花 (中左核心大牡丹 · 沉稳起伏呼吸 ~2.6px) */}
                <g transform="translate(54, 48) scale(0.95)">
                  <g className="animate-flower-sway-main">
                    <g style={{ opacity: mainState.opacity, transform: `translateY(${mainState.droopY}px)`, transition: 'opacity 0.8s ease-out' }}>
                      <circle cx="0" cy="0" r="28" fill={`url(#peonyDeep_${isRightSide})`} opacity="0.95" />
                      <path d="M -22 -10 C -26 -26 2 -32 16 -22 C 28 -8 24 16 10 24 C -8 28 -18 12 -22 -10 Z" fill={`url(#peonySoft_${isRightSide})`} />
                      <path d="M -16 -18 C -4 -26 18 -20 20 -8 C 22 8 6 20 -6 18 C -18 14 -20 -2 -16 -18 Z" fill={`url(#peonyDeep_${isRightSide})`} />
                      <path d="M -12 -12 C 0 -20 15 -14 14 -2 C 12 10 0 14 -8 10 C -16 6 -16 -4 -12 -12 Z" fill={`url(#peonySoft_${isRightSide})`} />
                      <circle cx="-1" cy="-2" r="2.8" fill={dryFactor > 0.4 ? "#78542c" : "#fcd34d"} opacity="0.9" />
                      <circle cx="3" cy="1" r="2.4" fill={dryFactor > 0.4 ? "#4f3417" : "#f59e0b"} opacity="0.95" />
                    </g>
                  </g>
                </g>

                {/* 2. 顶冠牡丹 (冠顶高处 · 随风浮沉 ~3.6px，倾侧 4.2°) */}
                <g transform="translate(76, 28) scale(0.90)">
                  <g className="animate-flower-sway-crown">
                    <g style={{ opacity: crownState.opacity, transform: `translateY(${crownState.droopY}px)`, transition: 'opacity 0.8s ease-out' }}>
                      <circle cx="0" cy="0" r="26" fill={`url(#peonyDeep_${isRightSide})`} />
                      <path d="M -20 -10 C -24 -24 4 -28 16 -18 C 26 -6 22 14 8 22 C -6 26 -16 12 -20 -10 Z" fill={`url(#peonySoft_${isRightSide})`} />
                      <path d="M -14 -14 C 0 -22 16 -16 16 -4 C 16 10 2 18 -8 14 C -18 10 -18 -2 -14 -14 Z" fill={dryFactor > 0.4 ? "#e0d3cb" : "#ffe2ed"} />
                      <circle cx="0" cy="-1" r="2.6" fill={dryFactor > 0.4 ? "#78542c" : "#fcd34d"} />
                    </g>
                  </g>
                </g>

                {/* 3. 右侧副花 (右侧花头 · 舒展摇曳) */}
                <g transform="translate(96, 58) scale(0.88)">
                  <g className="animate-flower-sway-right">
                    <g style={{ opacity: secState.opacity, transform: `translateY(${secState.droopY}px)`, transition: 'opacity 0.8s ease-out' }}>
                      <circle cx="0" cy="0" r="25" fill={`url(#peonyDeep_${isRightSide})`} />
                      <path d="M -18 -8 C -22 -22 2 -26 12 -18 C 22 -6 20 12 8 20 C -6 24 -14 10 -18 -8 Z" fill={`url(#peonySoft_${isRightSide})`} />
                      <path d="M -12 -14 C 0 -22 14 -16 16 -6 C 18 8 5 16 -5 14 C -15 10 -15 -2 -12 -14 Z" fill={dryFactor > 0.4 ? "#e0d3cb" : "#ffe2ed"} />
                      <circle cx="1" cy="-1" r="2.5" fill={dryFactor > 0.4 ? "#78542c" : "#fcd34d"} />
                    </g>
                  </g>
                </g>

                {/* 4. 左下侧花 (左侧迎风花 · 向右微扬摇曳 5.0°) */}
                <g transform="translate(36, 54) scale(0.75)">
                  <g className="animate-flower-sway-left">
                    <g style={{ opacity: sideState.opacity, transform: `translateY(${sideState.droopY}px)`, transition: 'opacity 0.8s ease-out' }}>
                      <circle cx="0" cy="0" r="20" fill={`url(#peonyDeep_${isRightSide})`} />
                      <path d="M -14 -6 C -18 -18 2 -20 10 -14 C 18 -4 16 10 6 16 C -6 18 -12 8 -14 -6 Z" fill={`url(#peonySoft_${isRightSide})`} />
                      <circle cx="0" cy="0" r="2.0" fill={dryFactor > 0.4 ? "#78542c" : "#fcd34d"} />
                    </g>
                  </g>
                </g>

                {/* 5. 右上梢头幼蕾 (轻巧幼蕾 · 灵敏摆动 ~4.0px) */}
                <g transform="translate(114, 44) scale(0.68)">
                  <g className="animate-flower-sway-bud">
                    <g style={{ opacity: budState.opacity, transform: `translateY(${budState.droopY}px)`, transition: 'opacity 0.8s ease-out' }}>
                      <ellipse cx="0" cy="0" rx="12" ry="16" fill={`url(#peonyDeep_${isRightSide})`} transform="rotate(25)" />
                      <ellipse cx="-2" cy="-2" rx="8" ry="12" fill={`url(#peonySoft_${isRightSide})`} transform="rotate(25)" />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          )}

          {/* 1.2 纯白东方百合 */}
          {flowerType === 'lilies' && (
            <g id="liliesArt">
              {/* 5 根坚实百合花枝 */}
              <g id="lilyStems">
                <path d="M 76 128 Q 86 85 98 52" stroke={`url(#stemGrad_${flowerType}_${isRightSide})`} strokeWidth="3.6" fill="none" strokeLinecap="round" />
                <path d="M 75 128 Q 62 88 52 68" stroke={`url(#stemGrad_${flowerType}_${isRightSide})`} strokeWidth="3.4" fill="none" strokeLinecap="round" />
                <path d="M 75 128 Q 74 65 75 26" stroke={`url(#stemGrad_${flowerType}_${isRightSide})`} strokeWidth="3.2" fill="none" strokeLinecap="round" />
                <path d="M 74 128 Q 54 88 34 54" stroke={`url(#stemGrad_${flowerType}_${isRightSide})`} strokeWidth="2.8" fill="none" strokeLinecap="round" />
                <path d="M 78 128 Q 98 76 116 36" stroke={`url(#stemGrad_${flowerType}_${isRightSide})`} strokeWidth="2.8" fill="none" strokeLinecap="round" />

                <circle cx="78" cy="95" r="2.2" fill={stemCol100} opacity="0.8" />
                <circle cx="86" cy="85" r="2.0" fill={stemCol100} opacity="0.8" />
              </g>

              {/* 百合叶片：每片叶子随风飘展 */}
              <g id="lilyLeaves" style={{ opacity: leafOpacity, transition: 'opacity 0.8s ease-out' }}>
                <g className="animate-leaf-sway-1" style={{ transformOrigin: '64px 88px' }}>
                  <path d="M 64 88 C 42 76 24 88 18 98 C 30 102 52 96 64 90 Z" fill={`url(#leafGrad_${flowerType}_${isRightSide})`} />
                </g>
                <g className="animate-leaf-sway-2" style={{ transformOrigin: '90px 84px' }}>
                  <path d="M 90 84 C 112 74 132 82 140 92 C 126 96 106 92 90 86 Z" fill={`url(#leafGrad_${flowerType}_${isRightSide})`} />
                </g>
                <g className="animate-leaf-sway-3" style={{ transformOrigin: '38px 72px' }}>
                  <path d="M 38 72 C 18 64 8 74 6 84 C 20 86 36 82 42 76 Z" fill={`url(#leafGrad_${flowerType}_${isRightSide})`} />
                </g>
              </g>

              {/* 5 朵百合花：各自随风舒展摆动 */}
              <g id="lilyBlossoms">
                {/* 1. 主花 (右侧大百合 · 沉稳浮动呼吸) */}
                <g transform="translate(98, 52) scale(0.96)">
                  <g className="animate-flower-sway-main">
                    <g style={{ opacity: mainState.opacity, transform: `translateY(${mainState.droopY}px)`, transition: 'opacity 0.8s ease-out' }}>
                      <path d="M 0 0 C 16 -38 34 -32 40 -18 C 28 -4 15 6 0 0 Z" fill={`url(#whiteLilyPetal_${isRightSide})`} stroke={dryFactor > 0.4 ? "#a88e6a" : "#ded9c7"} strokeWidth="0.8" />
                      <path d="M 0 0 C 6 -42 -14 -44 -24 -30 C -16 -14 -6 -2 0 0 Z" fill={`url(#whiteLilyPetal_${isRightSide})`} stroke={dryFactor > 0.4 ? "#a88e6a" : "#ded9c7"} strokeWidth="0.8" />
                      <path d="M 0 0 C -38 -22 -44 -6 -34 10 C -20 10 -6 3 0 0 Z" fill={`url(#whiteLilyPetal_${isRightSide})`} stroke={dryFactor > 0.4 ? "#a88e6a" : "#ded9c7"} strokeWidth="0.8" />
                      <path d="M 0 0 C -28 16 -20 38 -2 42 C 6 26 3 11 0 0 Z" fill={`url(#whiteLilyPetal_${isRightSide})`} stroke={dryFactor > 0.4 ? "#a88e6a" : "#ded9c7"} strokeWidth="0.8" />
                      <path d="M 0 0 C 24 20 36 34 42 22 C 28 11 14 3 0 0 Z" fill={`url(#whiteLilyPetal_${isRightSide})`} stroke={dryFactor > 0.4 ? "#a88e6a" : "#ded9c7"} strokeWidth="0.8" />
                      <circle cx="0" cy="0" r="9" fill={`url(#lilyThroat_${isRightSide})`} opacity="0.9" />
                      <path d="M 0 0 Q 9 -14 18 -16" stroke={dryFactor > 0.4 ? "#634825" : "#8da84b"} strokeWidth="1.6" fill="none" />
                      <ellipse cx="18" cy="-16" rx="4" ry="1.6" fill={dryFactor > 0.4 ? "#452d14" : "#d97706"} transform="rotate(-30 18 -16)" />
                      <path d="M 0 0 Q -6 -16 -12 -20" stroke={dryFactor > 0.4 ? "#634825" : "#8da84b"} strokeWidth="1.6" fill="none" />
                      <ellipse cx="-12" cy="-20" rx="4" ry="1.6" fill={dryFactor > 0.4 ? "#452d14" : "#f59e0b"} transform="rotate(40 -12 -20)" />
                    </g>
                  </g>
                </g>

                {/* 2. 顶冠百合 (高处起伏沉浮 ~3.6px) */}
                <g transform="translate(75, 26) scale(0.90)">
                  <g className="animate-flower-sway-crown">
                    <g style={{ opacity: crownState.opacity, transform: `translateY(${crownState.droopY}px)`, transition: 'opacity 0.8s ease-out' }}>
                      <path d="M 0 0 C 14 -36 30 -30 36 -16 C 26 -4 14 6 0 0 Z" fill={`url(#whiteLilyPetal_${isRightSide})`} stroke={dryFactor > 0.4 ? "#a88e6a" : "#ded9c7"} strokeWidth="0.8" />
                      <path d="M 0 0 C 4 -38 -12 -40 -20 -28 C -14 -12 -4 -2 0 0 Z" fill={`url(#whiteLilyPetal_${isRightSide})`} stroke={dryFactor > 0.4 ? "#a88e6a" : "#ded9c7"} strokeWidth="0.8" />
                      <path d="M 0 0 C -34 -18 -38 -4 -30 8 C -18 8 -4 2 0 0 Z" fill={`url(#whiteLilyPetal_${isRightSide})`} stroke={dryFactor > 0.4 ? "#a88e6a" : "#ded9c7"} strokeWidth="0.8" />
                      <path d="M 0 0 C 20 18 32 30 38 18 C 24 8 12 2 0 0 Z" fill={`url(#whiteLilyPetal_${isRightSide})`} stroke={dryFactor > 0.4 ? "#a88e6a" : "#ded9c7"} strokeWidth="0.8" />
                      <circle cx="0" cy="0" r="8" fill={`url(#lilyThroat_${isRightSide})`} opacity="0.9" />
                      <ellipse cx="12" cy="-14" rx="3.5" ry="1.4" fill={dryFactor > 0.4 ? "#452d14" : "#d97706"} transform="rotate(-25 12 -14)" />
                    </g>
                  </g>
                </g>

                {/* 3. 左下花 (迎风偏左 · 微扬摇曳) */}
                <g transform="translate(52, 68) scale(0.85)">
                  <g className="animate-flower-sway-left">
                    <g style={{ opacity: secState.opacity, transform: `translateY(${secState.droopY}px)`, transition: 'opacity 0.8s ease-out' }}>
                      <path d="M 0 0 C -14 -32 2 -40 14 -30 C 9 -16 3 -2 0 0 Z" fill={`url(#whiteLilyPetal_${isRightSide})`} stroke={dryFactor > 0.4 ? "#a88e6a" : "#ded9c7"} strokeWidth="0.8" />
                      <path d="M 0 0 C -32 -16 -38 2 -28 16 C -14 11 -2 3 0 0 Z" fill={`url(#whiteLilyPetal_${isRightSide})`} stroke={dryFactor > 0.4 ? "#a88e6a" : "#ded9c7"} strokeWidth="0.8" />
                      <path d="M 0 0 C -16 26 6 34 20 26 C 13 16 6 5 0 0 Z" fill={`url(#whiteLilyPetal_${isRightSide})`} stroke={dryFactor > 0.4 ? "#a88e6a" : "#ded9c7"} strokeWidth="0.8" />
                      <circle cx="0" cy="0" r="8" fill={`url(#lilyThroat_${isRightSide})`} opacity="0.9" />
                    </g>
                  </g>
                </g>

                {/* 4. 左侧花 (外侧边缘百合 · 舒展轻拂) */}
                <g transform="translate(34, 54) scale(0.72)">
                  <g className="animate-flower-sway-right">
                    <g style={{ opacity: sideState.opacity, transform: `translateY(${sideState.droopY}px)`, transition: 'opacity 0.8s ease-out' }}>
                      <path d="M 0 0 C -16 -28 -30 -18 -26 -6 C -18 2 -6 2 0 0 Z" fill={`url(#whiteLilyPetal_${isRightSide})`} stroke={dryFactor > 0.4 ? "#a88e6a" : "#ded9c7"} strokeWidth="0.8" />
                      <path d="M 0 0 C -12 20 4 28 16 20 C 10 10 4 2 0 0 Z" fill={`url(#whiteLilyPetal_${isRightSide})`} stroke={dryFactor > 0.4 ? "#a88e6a" : "#ded9c7"} strokeWidth="0.8" />
                      <circle cx="0" cy="0" r="6" fill={`url(#lilyThroat_${isRightSide})`} opacity="0.85" />
                    </g>
                  </g>
                </g>

                {/* 5. 右上梢头幼蕾 (轻巧幼蕾 · 灵敏摆动) */}
                <g transform="translate(116, 36) scale(0.65)">
                  <g className="animate-flower-sway-bud">
                    <g style={{ opacity: budState.opacity, transform: `translateY(${budState.droopY}px)`, transition: 'opacity 0.8s ease-out' }}>
                      <ellipse cx="0" cy="0" rx="6" ry="18" fill={`url(#whiteLilyPetal_${isRightSide})`} stroke={dryFactor > 0.4 ? "#a88e6a" : "#c6d6a5"} strokeWidth="0.8" transform="rotate(35)" />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          )}
        </g>

        {/* ── 2. 现代折面素雅白瓷花瓶 (瓶身绝对坚固稳坐于案头，纹丝不动) ── */}
        <g id="facetedPorcelainVaseBase">
          <ellipse cx="75" cy="193" rx="19" ry="4" fill="#b5ad9f" opacity="0.6" />

          {/* Left Facet */}
          <path
            d="M 57 117 
               C 51 123, 46 135, 44 151 
               C 42 169, 51 189, 58 193 
               L 66 193 
               C 61 189, 55 169, 56 151 
               C 57 135, 62 123, 65 117 
               Z"
            fill={`url(#vaseLeftFacet_${flowerType}_${isRightSide})`}
            stroke="#cfc7bc"
            strokeWidth="0.8"
          />

          {/* Center-Left Facet */}
          <path
            d="M 65 117 
               C 62 123, 57 135, 56 151 
               C 55 169, 61 189, 66 193 
               L 75 193 
               C 73 189, 71 169, 72 151 
               C 72 135, 74 123, 75 117 
               Z"
            fill={`url(#vaseCenterFacet_${flowerType}_${isRightSide})`}
            stroke="#cfc7bc"
            strokeWidth="0.8"
          />

          {/* Center-Right Facet */}
          <path
            d="M 75 117 
               C 74 123, 72 135, 72 151 
               C 71 169, 73 189, 75 193 
               L 84 193 
               C 89 189, 93 169, 92 151 
               C 91 135, 87 123, 84 117 
               Z"
            fill={`url(#vaseCenterFacet_${flowerType}_${isRightSide})`}
            stroke="#cfc7bc"
            strokeWidth="0.8"
          />

          {/* Right Facet */}
          <path
            d="M 84 117 
               C 87 123, 91 135, 92 151 
               C 93 169, 89 189, 84 193 
               L 92 193 
               C 99 189, 106 169, 104 151 
               C 102 135, 97 123, 93 117 
               Z"
            fill={`url(#vaseRightFacet_${flowerType}_${isRightSide})`}
            stroke="#cfc7bc"
            strokeWidth="0.8"
          />

          {/* Ridge Highlights */}
          <path d="M 65 117 C 62 123, 57 135, 56 151 C 55 169, 61 189, 66 193" stroke="#ffffff" strokeWidth="1.2" fill="none" opacity="0.9" />
          <path d="M 75 117 C 74 123, 72 135, 72 151 C 71 169, 73 189, 75 193" stroke="#ffffff" strokeWidth="1.6" fill="none" opacity="0.95" />
          <path d="M 84 117 C 87 123, 91 135, 92 151 C 93 169, 89 189, 84 193" stroke="#e0d7cb" strokeWidth="1.2" fill="none" opacity="0.8" />

          {/* Rim */}
          <ellipse cx="75" cy="117" rx="19" ry="4.8" fill="#f6f1e8" stroke="#cfc7bc" strokeWidth="1" />
          <ellipse cx="75" cy="117" rx="15" ry="3.2" fill="#2d2822" opacity="0.38" />
        </g>

        {/* ── 3. 拟真花瓣随重力与气流掉落到桌面上并在桌上枯萎 ── */}
        <g id="fallingAndTablePetalsLayer">
          {fallingDefs.map((p) => {
            if (health > p.detachHealth) {
              return null;
            }

            const isFalling = health > p.detachHealth - p.fallSpan;
            const fallProg = isFalling 
              ? (p.detachHealth - health) / p.fallSpan 
              : 1.0;

            const easeY = fallProg < 0.5 
              ? 4 * fallProg * fallProg * fallProg 
              : 1 - Math.pow(-2 * fallProg + 2, 3) / 2;

            const currY = p.startY + (p.landY - p.startY) * easeY;
            const airSway = isFalling ? Math.sin(fallProg * Math.PI * p.swayFreq) * p.swayAmp : 0;
            const currX = p.startX + (p.landX - p.startX) * fallProg + airSway;

            const currRot = isFalling 
              ? p.landRot * fallProg + Math.sin(fallProg * Math.PI * (p.swayFreq + 1)) * 34 
              : p.landRot;

            const tableTimeSinceLand = Math.max(0, p.detachHealth - p.fallSpan - health);
            const tableDryFactor = Math.min(1.0, tableTimeSinceLand / 0.28);

            const petalCurledScale = 1.0 - tableDryFactor * 0.18;

            const petalFill = flowerType === 'peonies'
              ? (p.id % 2 === 0 ? `url(#peonySoft_${isRightSide})` : `url(#peonyDeep_${isRightSide})`)
              : `url(#whiteLilyPetal_${isRightSide})`;

            const petalStroke = flowerType === 'peonies'
              ? (tableDryFactor > 0.4 ? "#7a5436" : "#cb4b72")
              : (tableDryFactor > 0.4 ? "#8a7050" : "#ded9c7");

            return (
              <g 
                key={p.id}
                style={{ 
                  opacity: 1.0 - tableDryFactor * 0.15,
                }}
              >
                {!isFalling && (
                  <ellipse 
                    cx={p.landX + 1} 
                    cy={p.landY + 1.2} 
                    rx={p.rx * 0.92} 
                    ry={p.ry * 0.38} 
                    fill="#231307" 
                    opacity={0.38} 
                    transform={`rotate(${p.landRot} ${p.landX + 1} ${p.landY + 1.2})`} 
                  />
                )}

                {isFalling && (
                  <ellipse 
                    cx={currX} 
                    cy={Math.min(195, currY + 6)} 
                    rx={p.rx * 0.6 * fallProg} 
                    ry={p.ry * 0.25 * fallProg} 
                    fill="#231307" 
                    opacity={0.22 * fallProg} 
                  />
                )}

                <g 
                  transform={`translate(${currX}, ${currY}) rotate(${currRot}) scale(${petalCurledScale})`}
                >
                  <ellipse 
                    cx={0} 
                    cy={0} 
                    rx={p.rx} 
                    ry={p.ry} 
                    fill={petalFill} 
                    stroke={petalStroke} 
                    strokeWidth={0.5} 
                  />
                  <path 
                    d={`M ${-p.rx * 0.5} 0 Q 0 ${-p.ry * 0.3} ${p.rx * 0.5} 0`} 
                    stroke={petalStroke} 
                    strokeWidth={0.4} 
                    fill="none" 
                    opacity={0.65} 
                  />
                </g>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
