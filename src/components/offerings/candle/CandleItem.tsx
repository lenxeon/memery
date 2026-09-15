/**
 * @file CandleItem.tsx
 * @description 祈福红烛摆件组件，包含蜡烛主体、熔蜡质感与交互触发逻辑。
 */
import React from 'react';
import { CandleFlame } from './CandleFlame';
import { ItemLifecycle } from '../../../game/types/entity';
import { Sparkles } from 'lucide-react';

export interface CandleItemProps {
  isLit: boolean;
  onToggle: () => void;
  windForce?: number;
  glowIntensity?: number;
  scale?: number;
  className?: string;
  waxHeight?: number; // 0.08 ~ 1.0 (实时蜡烛高度比例)
  lifecycle?: ItemLifecycle;
}

export type ItemCandleProps = CandleItemProps;

export const CandleItem: React.FC<CandleItemProps> = ({
  isLit,
  onToggle,
  windForce = 0,
  glowIntensity = 1,
  scale = 1,
  className = '',
  waxHeight = 1.0,
  lifecycle,
}) => {
  const health = lifecycle?.health ?? waxHeight;
  const stage = lifecycle?.stage || 'blooming';
  const isExpired = stage === 'expired' || health <= 0.05;

  // 蜡烛高度动态范围：由最高 98px 随蜡油燃烧缩短至 28px (案面上沉稳的残蜡底座)
  const currentWaxFactor = Math.max(0.08, Math.min(1.0, waxHeight));
  const candleH = 22 + 76 * currentWaxFactor;

  // 烛火垂直对齐：严格贴附于蜡烛顶端凹槽 (蜡烛在 bottom-0，顶部蜡池在距底 candleH - 8 处)
  const flameBottomOffset = (candleH - 24) * scale;

  let stageLabel = '初燃长明';
  if (stage === 'blooming') stageLabel = '长明旺盛';
  else if (stage === 'wilting') stageLabel = '渐燃半截';
  else if (stage === 'withered') stageLabel = '残烛微光';
  else if (stage === 'expired') stageLabel = '燃尽熄灭';

  return (
    <div 
      className={`relative select-none flex flex-col items-center group ${className}`}
      style={{
        width: 60 * scale,
        height: 120 * scale,
      }}
      title={isExpired ? '红烛燃尽（点击添换新蜡，长明再续）' : `朱砂红烛（状态：${stageLabel} · 剩余 ${Math.round(health * 100)}% · 点击${isLit ? '熄灭' : '点燃'}）`}
    >
      {/* 燃尽换新烛提示浮标 */}
      {isExpired && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-amber-950/90 text-[10px] font-medium text-amber-200 border border-amber-400/60 shadow-lg backdrop-blur-xs pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 z-30 whitespace-nowrap">
          <Sparkles size={11} className="text-amber-400 animate-spin" style={{ animationDuration: '3s' }} />
          <span>点击添新烛</span>
        </div>
      )}

      {/* 烛火系统：随蜡烛融化高度动态下降，且后期火头缩小 */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 pointer-events-auto transition-all duration-300 ease-out"
        style={{ 
          width: 80 * scale, 
          height: 110 * scale,
          bottom: flameBottomOffset,
        }}
      >
        <CandleFlame
          isLit={isLit}
          onToggle={onToggle}
          windForce={windForce}
          glowIntensity={glowIntensity}
          scale={scale}
          health={health}
        />
      </div>

      {/* 随生命周期缩短的蜡烛柱体 */}
      <div 
        className="absolute bottom-0 w-[42px] cursor-pointer transition-all duration-300 ease-out"
        onClick={onToggle}
        style={{
          width: 42 * scale,
          height: candleH * scale,
        }}
      >
        <svg 
          viewBox={`0 0 42 ${candleH}`} 
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="waxGradC" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d5cebd" />
              <stop offset="25%" stopColor={isLit ? '#fff7e0' : '#f8f4ea'} />
              <stop offset="65%" stopColor={isLit ? '#f9edd0' : '#f0ebd8'} />
              <stop offset="90%" stopColor="#ded5be" />
              <stop offset="100%" stopColor="#c7bda2" />
            </linearGradient>

            <linearGradient id="waxPoolGradC" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isLit ? '#ffe699' : '#f4eee0'} />
              <stop offset="100%" stopColor={isLit ? '#ffd066' : '#ded6c1'} />
            </linearGradient>
          </defs>

          {/* 柱状蜡体 */}
          <path
            d={`M 4 8
               L 4 ${candleH - 5}
               C 4 ${candleH - 2}, 38 ${candleH - 2}, 38 ${candleH - 5}
               L 38 8
               Z`}
            fill="url(#waxGradC)"
            stroke="#c8beaa"
            strokeWidth="0.8"
          />

          {/* 自然流淌烛泪 */}
          {candleH > 36 && (
            <path
              d={`M 12 8 C 12 ${Math.min(candleH - 12, 28)}, 14 ${Math.min(candleH - 8, 42)}, 16 ${Math.min(candleH - 6, 46)} C 18 ${Math.min(candleH - 8, 42)}, 17 ${Math.min(candleH - 12, 28)}, 17 8 Z`}
              fill={isLit ? '#fff5d6' : '#f7f2e4'}
              opacity="0.9"
            />
          )}

          {/* 顶部凹陷融蜡油池 */}
          <ellipse cx="21" cy="8" rx="17" ry="4.8" fill="url(#waxPoolGradC)" stroke="#c4ba9f" strokeWidth="0.8" />
          <ellipse cx="21" cy="8" rx="14" ry="3.2" fill={isLit ? '#ffbe3b' : '#c8bfa8'} opacity={isLit ? 0.7 : 0.4} />

          {/* 烛芯根部黑碳点 */}
          <circle cx="21" cy="8" r="2.2" fill="#3a2f24" opacity="0.6" />
        </svg>

        {isLit && (
          <div 
            className="absolute top-0 inset-x-0 h-10 rounded-t-lg pointer-events-none opacity-40 bg-gradient-to-b from-amber-300 via-amber-400/20 to-transparent"
          />
        )}
      </div>
    </div>
  );
};

export const ItemCandle = CandleItem;
