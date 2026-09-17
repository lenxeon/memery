/**
 * @file CenserItem.tsx
 * @description 仿古三足铜香炉组件，承载三炷立香与香烟动画。
 */
import React from 'react';
import { IncenseSmoke } from './IncenseSmoke';
import { ItemLifecycle } from '../../../game/types/entity';
import { Sparkles } from 'lucide-react';

export interface CenserItemProps {
  isLit: boolean;
  onToggle: () => void;
  windForce?: number;
  density?: number;
  sunlightIntensity?: number;
  masterOn?: boolean;
  timeOfDay?: 'day' | 'sunset' | 'night';
  scale?: number;
  className?: string;
  incenseHealth?: number; // 0.0 ~ 1.0 (剩余香长比例)
  lifecycle?: ItemLifecycle;
}

export type ItemCenserProps = CenserItemProps;

export const CenserItem: React.FC<CenserItemProps> = ({
  isLit,
  onToggle,
  windForce = 0,
  density = 1,
  sunlightIntensity = 0.8,
  masterOn = true,
  timeOfDay = 'day',
  scale = 1,
  className = '',
  incenseHealth = 1.0,
  lifecycle,
}) => {
  const health = lifecycle?.health ?? incenseHealth;
  const stage = lifecycle?.stage || 'blooming';
  const isExpired = stage === 'expired' || health <= 0.05;

  let stageLabel = '青烟袅袅';
  if (stage === 'blooming') stageLabel = '初献高香';
  else if (stage === 'wilting') stageLabel = '香过半柱';
  else if (stage === 'withered') stageLabel = '余烬残香';
  else if (stage === 'expired') stageLabel = '燃毕留香脚';

  return (
    <div 
      className={`relative select-none flex flex-col items-center group ${className}`}
      style={{
        width: 100 * scale,
        height: 140 * scale,
      }}
      title={isExpired ? '香火燃毕（保留沉稳香脚 · 点击敬奉新香）' : `青瓷清香香炉（状态：${stageLabel} · 剩余 ${Math.round(health * 100)}% · 点击${isLit ? '熄灭' : '点燃'}）`}
    >
      {/* 燃尽敬献新香浮标 */}
      {isExpired && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-amber-950/90 text-[10px] font-medium text-amber-200 border border-amber-400/60 shadow-lg backdrop-blur-xs pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 z-30 whitespace-nowrap">
          <Sparkles size={11} className="text-amber-400 animate-spin" style={{ animationDuration: '3s' }} />
          <span>点击敬献新香</span>
        </div>
      )}

      <div 
        className="absolute -top-44 left-1/2 -translate-x-1/2 pointer-events-auto"
        style={{ width: 160, height: 280 }}
      >
        <IncenseSmoke
          isLit={isLit}
          onToggle={onToggle}
          windForce={windForce}
          density={density}
          sunlightIntensity={sunlightIntensity}
          masterOn={masterOn}
          timeOfDay={timeOfDay}
          health={health}
        />
      </div>

      <div 
        className="absolute bottom-0 w-full h-[52px] cursor-pointer"
        onClick={onToggle}
      >
        <svg 
          viewBox="0 0 100 52" 
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="censerGlazeG" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d2cdc3" />
              <stop offset="25%" stopColor="#f4efe6" />
              <stop offset="60%" stopColor="#ebe4d8" />
              <stop offset="85%" stopColor="#d6cec1" />
              <stop offset="100%" stopColor="#beb5a6" />
            </linearGradient>

            <linearGradient id="ashGradG" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8c857b" />
              <stop offset="50%" stopColor="#c5beb3" />
              <stop offset="100%" stopColor="#dfd9ce" />
            </linearGradient>
          </defs>

          <ellipse cx="50" cy="50" rx="32" ry="3" fill="#2d2218" opacity="0.4" />

          {/* Foot */}
          <path d="M 36 46 L 38 49 L 62 49 L 64 46 Z" fill="#b0a89a" />

          {/* Body */}
          <path
            d="M 22 14
               C 10 24, 12 42, 36 46
               L 64 46
               C 88 42, 90 24, 78 14
               Z"
            fill="url(#censerGlazeG)"
            stroke="#c4bcad"
            strokeWidth="1"
          />

          <ellipse cx="50" cy="28" rx="20" ry="7" fill="#ffffff" opacity="0.35" />

          {/* Rim */}
          <ellipse cx="50" cy="14" rx="28" ry="7" fill="url(#censerGlazeG)" stroke="#c8c0b2" strokeWidth="1" />
          <ellipse cx="50" cy="13.5" rx="24" ry="5.5" fill="url(#ashGradG)" />

          <circle cx="44" cy="13" r="1.5" fill="#595249" opacity="0.4" />
          <circle cx="56" cy="14" r="1.2" fill="#4d463d" opacity="0.5" />
          <circle cx="50" cy="12.5" r="2" fill="#fff" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
};

export const ItemCenser = CenserItem;
