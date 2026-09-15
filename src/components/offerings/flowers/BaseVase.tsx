/**
 * @file BaseVase.tsx
 * @description 祭坛花瓶基类组件，负责陶瓷瓶身、瓶口收束及绿叶托底渲染。
 */
import React from 'react';
import { ItemLifecycle } from '../../../game/types/entity';
import { sound } from '../../../utils/audio';
import { Sparkles } from 'lucide-react';

interface BaseVaseProps {
  scale?: number;
  className?: string;
  isRightSide?: boolean;
  lifecycle?: ItemLifecycle;
  onRevitalize?: () => void;
  defsSlot?: React.ReactNode;
  fallingPetalsSlot?: React.ReactNode;
  children: React.ReactNode;
}

export const BaseVase: React.FC<BaseVaseProps> = ({
  scale = 1,
  className = '',
  isRightSide = false,
  lifecycle,
  onRevitalize,
  defsSlot,
  fallingPetalsSlot,
  children,
}) => {
  const stage = lifecycle?.stage || 'blooming';
  const health = lifecycle?.health ?? 1.0;

  const handleRevitalize = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playBell(720, 2);
    onRevitalize?.();
  };

  return (
    <div
      className={`relative select-none pointer-events-auto group ${className}`}
      style={{
        width: 150 * scale,
        height: 200 * scale,
        transform: isRightSide ? 'scaleX(-1)' : 'none',
      }}
    >
      {/* ── 注入甘露复苏浮动微光按键 (当生机衰竭枯萎时醒目提示) ── */}
      {(stage === 'withered' || health < 0.35) && onRevitalize && (
        <button
          onClick={handleRevitalize}
          className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 px-2 py-0.5 rounded-full text-[10px] font-medium 
                     bg-amber-500/90 hover:bg-amber-400 text-stone-900 shadow-md shadow-amber-900/40 
                     flex items-center gap-1 backdrop-blur-sm animate-bounce cursor-pointer border border-amber-200/60
                     transition-transform active:scale-95"
          style={{ transform: isRightSide ? 'scaleX(-1) translateX(50%)' : 'translateX(-50%)' }}
          title="点击为花枝注入清泉甘露，唤醒生机"
        >
          <Sparkles className="w-2.5 h-2.5 text-amber-900" />
          <span>注露回春</span>
        </button>
      )}

      <svg viewBox="0 0 150 200" className="w-full h-full overflow-visible">
        <defs>
          {/* Porcelain Vase Body Gradient */}
          <linearGradient id="porcelainVaseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#cfc8bb" />
            <stop offset="18%" stopColor="#ebe4d6" />
            <stop offset="42%" stopColor="#ffffff" />
            <stop offset="68%" stopColor="#f7f2e8" />
            <stop offset="88%" stopColor="#dfd7c8" />
            <stop offset="100%" stopColor="#b5ada0" />
          </linearGradient>

          {/* Vase Neck Gradient */}
          <linearGradient id="porcelainNeckGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c5beb0" />
            <stop offset="25%" stopColor="#f2ebe0" />
            <stop offset="55%" stopColor="#ffffff" />
            <stop offset="85%" stopColor="#ded6c6" />
            <stop offset="100%" stopColor="#b0a89a" />
          </linearGradient>

          {/* Rim Opening Dark Gold Trim */}
          <linearGradient id="porcelainNeckRim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a39a88" />
            <stop offset="50%" stopColor="#ded5c4" />
            <stop offset="100%" stopColor="#8c8270" />
          </linearGradient>

          {defsSlot}
        </defs>

        {/* ── 1. Table Ambient Depth Shadow under Vase Foot ── */}
        <ellipse cx="75" cy="193" rx="26" ry="6" fill="#140d07" opacity="0.4" filter="blur(2px)" />

        {/* ── 2. Flowers / Foliage / Branches Slot (Behind & Rising out of neck) ── */}
        {children}

        {/* ── 3. Porcelain Guanyin Vase Body (白瓷观音尊净瓶) ── */}
        <g id="vasePorcelainBody">
          {/* Main Vase Silhouette (Classic Guanyin Baluster Outline) */}
          <path
            d="
              M 64 120
              L 64 125
              C 62 135, 51 144, 49 158
              C 46 173, 56 186, 61 190
              L 89 190
              C 94 186, 104 173, 101 158
              C 99 144, 88 135, 86 125
              L 86 120
              Z
            "
            fill="url(#porcelainVaseGrad)"
            stroke="#b8b0a2"
            strokeWidth="0.8"
          />

          {/* Vase Slender Neck (直颈) */}
          <path
            d="
              M 65 112
              L 64 122
              L 86 122
              L 85 112
              Z
            "
            fill="url(#porcelainNeckGrad)"
            stroke="#beb6a8"
            strokeWidth="0.6"
          />

          {/* Vase Flared Lip Rim (微撇口唇沿) */}
          <ellipse cx="75" cy="112" rx="12" ry="3.5" fill="url(#porcelainNeckRim)" stroke="#9a907e" strokeWidth="0.8" />
          <ellipse cx="75" cy="112" rx="10" ry="2.5" fill="#383025" opacity="0.6" />

          {/* Vase Foot Rim (圈足) */}
          <ellipse cx="75" cy="190" rx="14" ry="3.5" fill="#b0a89a" stroke="#8a8072" strokeWidth="0.8" />
          <ellipse cx="75" cy="189" rx="13" ry="2.8" fill="#e8e2d4" />

          {/* Specular Glaze Sheen Line (净瓶通体釉光倒影弧线) */}
          <path
            d="M 68 126 C 66 138, 56 148, 54 162 C 53 172, 58 181, 62 186"
            stroke="#ffffff"
            strokeWidth="2.0"
            fill="none"
            opacity="0.65"
            strokeLinecap="round"
          />
          <ellipse cx="64" cy="154" rx="2.5" ry="10" fill="#ffffff" opacity="0.75" transform="rotate(-15, 64, 154)" />
        </g>

        {/* ── 4. Falling Petals Trajectory Slot (掉落花瓣动效) ── */}
        {fallingPetalsSlot}
      </svg>
    </div>
  );
};
