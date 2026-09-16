/**
 * @file BottomDock.tsx
 * @description 底部悬浮控制台组件，提供上香、敬茶、献花、敲磬等核心快捷操作坞。
 */
import React, { useState } from 'react';
import { 
  Flame, 
  Sliders, 
  Heart, 
  Flower2, 
  Apple,
  LayoutGrid, 
  ChevronDown, 
  ChevronUp, 
  Sparkles 
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface BottomDockProps {
  onOpenFlowers: () => void;
  onOpenFruits: () => void;
  onToggleCandles: () => void;
  candlesLit: boolean;
  onToggleArrangeMode: () => void;
  isArrangeMode: boolean;
  onOpenLighting: () => void;
  onOpenBlessing: () => void;
  defaultExpanded?: boolean;
}

export const BottomDock: React.FC<BottomDockProps> = ({
  onOpenFlowers,
  onOpenFruits,
  onToggleCandles,
  candlesLit,
  onToggleArrangeMode,
  isArrangeMode,
  onOpenLighting,
  onOpenBlessing,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpand = () => {
    sound.playWoodPlacement();
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="fixed bottom-2 sm:bottom-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex flex-col items-center max-w-[460px] w-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
        
        {/* ── 1. 展开状态：完整苹果式控制底栏 ── */}
        {isExpanded ? (
          <nav 
            aria-label="供台操作导航"
            className="w-full flex flex-col items-center pt-1.5 pb-2 px-3 sm:px-5 rounded-3xl bg-[#fdfbf7]/92 backdrop-blur-xl border border-white/80 ring-1 ring-amber-900/10 shadow-[0_12px_36px_rgba(50,30,12,0.18)] text-stone-600 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] animate-in fade-in zoom-in-95"
          >
            {/* 顶部 iOS Grabber 收起触控条 */}
            <button
              type="button"
              onClick={toggleExpand}
              className="w-full flex items-center justify-center py-1 -mt-0.5 mb-1 cursor-pointer group select-none"
              title="点击收起菜单，尽览肃穆案台"
            >
              <div className="w-10 h-1.5 rounded-full bg-stone-300/80 group-hover:bg-amber-500/80 group-hover:w-14 transition-all duration-300" />
              <ChevronDown size={14} className="text-stone-400 group-hover:text-amber-700 ml-1.5 opacity-60 group-hover:opacity-100 transition-all" />
            </button>

            {/* 6 个核心功能按钮 (香、花、果、烛、台、愿) */}
            <div className="w-full flex items-center justify-between gap-1 sm:gap-2">
              {/* 1. 献花 */}
              <button
                type="button"
                onClick={() => {
                  sound.playBell(580, 2);
                  onOpenFlowers();
                }}
                className="flex flex-col items-center justify-center gap-1 min-h-[44px] py-1 px-2 rounded-2xl hover:bg-amber-100/50 text-stone-600 hover:text-amber-900 transition-all active:scale-95 cursor-pointer group"
              >
                <Flower2 size={20} className="text-stone-500 group-hover:text-amber-700 transition-colors" />
                <span className="text-[11px] font-normal tracking-wider">献花</span>
              </button>

              {/* 2. 供果 */}
              <button
                type="button"
                onClick={() => {
                  sound.playBell(560, 2);
                  onOpenFruits();
                }}
                className="flex flex-col items-center justify-center gap-1 min-h-[44px] py-1 px-2 rounded-2xl hover:bg-amber-100/50 text-stone-600 hover:text-amber-900 transition-all active:scale-95 cursor-pointer group"
              >
                <Apple size={20} className="text-stone-500 group-hover:text-amber-700 transition-colors" />
                <span className="text-[11px] font-normal tracking-wider">供果</span>
              </button>

              {/* 3. 点烛 */}
              <button
                type="button"
                onClick={onToggleCandles}
                className={`flex flex-col items-center justify-center gap-1 min-h-[44px] py-1 px-2.5 rounded-2xl transition-all active:scale-95 cursor-pointer ${
                  candlesLit 
                    ? 'text-amber-800' 
                    : 'hover:bg-amber-100/50 text-stone-600'
                }`}
              >
                <Flame 
                  size={20} 
                  className={candlesLit ? 'text-amber-600 fill-amber-500' : 'text-stone-500'} 
                />
                <span className="text-[11px] font-normal tracking-wider">
                  {candlesLit ? '熄烛' : '点烛'}
                </span>
              </button>

              {/* 3. 置台 (Center Hero Button in golden rounded badge) */}
              <button
                type="button"
                onClick={() => {
                  sound.playWoodPlacement();
                  onToggleArrangeMode();
                }}
                className="flex flex-col items-center justify-center gap-1 min-h-[44px] py-0.5 px-2 active:scale-95 cursor-pointer transition-all"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                  isArrangeMode 
                    ? 'bg-amber-300 text-amber-950 shadow-md ring-2 ring-amber-400' 
                    : 'bg-amber-200/80 hover:bg-amber-200 text-amber-900 shadow-xs'
                }`}>
                  <LayoutGrid size={18} />
                </div>
                <span className="text-[11px] font-medium text-amber-900 tracking-wider">置台</span>
              </button>

              {/* 4. 光影 / 氛围 */}
              <button
                type="button"
                onClick={() => {
                  sound.playBell(480, 2);
                  onOpenLighting();
                }}
                className="flex flex-col items-center justify-center gap-1 min-h-[44px] py-1 px-2.5 rounded-2xl hover:bg-amber-100/50 text-stone-600 hover:text-amber-900 transition-all active:scale-95 cursor-pointer group"
              >
                <Sliders size={20} className="text-stone-500 group-hover:text-amber-700 transition-colors" />
                <span className="text-[11px] font-normal tracking-wider">光影</span>
              </button>

              {/* 5. 祈愿 */}
              <button
                type="button"
                onClick={() => {
                  sound.playBell(528, 2.5);
                  onOpenBlessing();
                }}
                className="flex flex-col items-center justify-center gap-1 min-h-[44px] py-1 px-2.5 rounded-2xl hover:bg-rose-100/50 text-stone-600 hover:text-rose-900 transition-all active:scale-95 cursor-pointer group"
              >
                <Heart size={20} className="text-stone-500 group-hover:text-rose-600 group-hover:fill-rose-500/30 transition-colors" />
                <span className="text-[11px] font-normal tracking-wider">祈愿</span>
              </button>
            </div>
          </nav>
        ) : (
          /* ── 2. 收起状态：苹果胶囊悬浮条 (Apple Dynamic Capsule) ── */
          <button
            type="button"
            onClick={toggleExpand}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#fdfbf7]/90 hover:bg-[#fdfbf7] backdrop-blur-xl border border-white/80 ring-1 ring-amber-900/10 shadow-[0_8px_24px_rgba(50,30,12,0.15)] text-stone-700 hover:text-amber-900 transition-all duration-300 active:scale-95 cursor-pointer group select-none animate-in fade-in zoom-in-95"
            title="点击展开功能菜单"
          >
            <div className="w-7 h-1 rounded-full bg-amber-600/40 group-hover:bg-amber-600/80 transition-colors" />
            <span className="text-xs font-medium tracking-wider text-amber-950/80 group-hover:text-amber-950">供台功能</span>
            <ChevronUp size={15} className="text-amber-700 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        )}

      </div>
    </div>
  );
};
