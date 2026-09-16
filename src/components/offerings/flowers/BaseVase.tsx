/**
 * @file BaseVase.tsx
 * @description 祭坛花瓶基类组件，负责八款陶瓷瓶身形制渲染、瓶口收束及掉落花瓣动效。
 */
import React from 'react';
import { ItemLifecycle } from '../../../game/types/entity';
import { sound } from '../../../utils/audio';
import { Sparkles } from 'lucide-react';
import { VaseStyle, VaseDefs, renderVaseBody, renderVaseMouthBack } from './vases';

interface BaseVaseProps {
  vaseStyle?: VaseStyle;
  scale?: number;
  className?: string;
  isRightSide?: boolean;
  lifecycle?: ItemLifecycle;
  onRevitalize?: () => void;
  onClick?: (e: React.MouseEvent) => void;
  defsSlot?: React.ReactNode;
  fallingPetalsSlot?: React.ReactNode;
  children: React.ReactNode;
}

export const BaseVase: React.FC<BaseVaseProps> = ({
  vaseStyle = 'warm_white_plain',
  scale = 1,
  className = '',
  isRightSide = false,
  lifecycle,
  onRevitalize,
  onClick,
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
      onClick={onClick}
      className={`relative select-none pointer-events-auto group cursor-pointer ${className}`}
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
          <VaseDefs />
          {defsSlot}
        </defs>

        {/* ── 1. 案台接地深度阴影 ── */}
        <ellipse cx="75" cy="193" rx="26" ry="6" fill="#140d07" opacity="0.4" filter="blur(2px)" />

        {/* ── 2. 瓶口后唇与内腔暗影 (位于花枝后方，花茎由此伸出) ── */}
        <g id="vaseSelectedMouthBack">
          {renderVaseMouthBack(vaseStyle)}
        </g>

        {/* ── 3. 插花花枝与绿叶插装槽 (花枝由瓶口探出，处于后唇前、前唇后) ── */}
        {children}

        {/* ── 4. 花瓶瓶身主体与瓶口前唇 (位于花枝前方，前唇完美覆盖花枝插入点) ── */}
        <g id="vaseSelectedBody">
          {renderVaseBody(vaseStyle)}
        </g>

        {/* ── 5. 掉落花瓣轨迹动效槽 ── */}
        {fallingPetalsSlot}
      </svg>
    </div>
  );
};
