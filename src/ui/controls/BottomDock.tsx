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
import { FlowerType } from '../../types';
import { FLOWER_REGISTRY } from '../../pixi/assets/templates/flowers';

interface BottomDockProps {
  onOpenFlowers: () => void;
  currentFlower?: FlowerType;
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
  currentFlower = 'peonies',
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

  const currentFlowerMeta = FLOWER_REGISTRY[currentFlower] || FLOWER_REGISTRY.peonies;

  return (
    <div className="fixed bottom-2 sm:bottom-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex flex-col items-center max-w-[460px] w-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
        
        {/* ── 1. 展开状态：玄石黑金控制底栏 ── */}
        {isExpanded ? (
          <nav 
            aria-label="供台操作导航"
            className="w-full flex flex-col items-center pt-1.5 pb-2.5 px-3 sm:px-5 rounded-3xl bg-[#1c1917]/95 backdrop-blur-xl border border-amber-500/50 ring-1 ring-amber-400/20 shadow-[0_16px_48px_rgba(0,0,0,0.85)] text-stone-300 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] animate-in fade-in zoom-in-95"
          >
            {/* 顶部 Grabber 收起触控条 */}
            <button
              type="button"
              onClick={toggleExpand}
              className="w-full flex items-center justify-center py-1 -mt-0.5 mb-1 cursor-pointer group select-none"
              title="点击收起菜单，尽览肃穆案台"
            >
              <div className="w-10 h-1.5 rounded-full bg-amber-500/30 group-hover:bg-amber-400 group-hover:w-14 transition-all duration-300" />
              <ChevronDown size={14} className="text-amber-400/70 group-hover:text-amber-300 ml-1.5 opacity-60 group-hover:opacity-100 transition-all" />
            </button>

            {/* 6 个核心功能按钮 (花、果、烛、台、影、愿) */}
            <div className="w-full flex items-center justify-between gap-1 sm:gap-2">
              {/* 1. 献花：纯图标统一风格 */}
              <button
                type="button"
                onClick={() => {
                  sound.playBell(580, 2);
                  onOpenFlowers();
                }}
                className="flex flex-col items-center justify-center gap-1 min-h-[44px] py-1 px-2 rounded-2xl hover:bg-amber-950/40 text-stone-300 hover:text-amber-200 transition-all active:scale-95 cursor-pointer group"
                title={`献花 · 当前选定「${currentFlowerMeta.name}」，点击即可挑选或敬献`}
              >
                <Flower2 size={20} className="text-amber-400/80 group-hover:text-amber-300 group-hover:scale-110 transition-all" />
                <span className="text-[11px] font-normal tracking-wider">献花</span>
              </button>

              {/* 2. 供果 */}
              <button
                type="button"
                onClick={() => {
                  sound.playBell(560, 2);
                  onOpenFruits();
                }}
                className="flex flex-col items-center justify-center gap-1 min-h-[44px] py-1 px-2 rounded-2xl hover:bg-amber-950/40 text-stone-300 hover:text-amber-200 transition-all active:scale-95 cursor-pointer group"
              >
                <Apple size={20} className="text-amber-400/80 group-hover:text-amber-300 group-hover:scale-110 transition-all" />
                <span className="text-[11px] font-normal tracking-wider">供果</span>
              </button>

              {/* 3. 点烛 */}
              <button
                type="button"
                onClick={onToggleCandles}
                className={`flex flex-col items-center justify-center gap-1 min-h-[44px] py-1 px-2 rounded-2xl transition-all active:scale-95 cursor-pointer group ${
                  candlesLit 
                    ? 'bg-amber-500/20 text-amber-200 border border-amber-400/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]' 
                    : 'hover:bg-amber-950/40 text-stone-300 hover:text-amber-200'
                }`}
              >
                <Flame 
                  size={20} 
                  className={candlesLit ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'text-amber-400/80 group-hover:text-amber-300 group-hover:scale-110 transition-all'} 
                />
                <span className="text-[11px] font-normal tracking-wider">
                  {candlesLit ? '熄烛' : '点烛'}
                </span>
              </button>

              {/* 4. 置台 (Center Hero Button in golden badge) */}
              <button
                type="button"
                onClick={() => {
                  sound.playWoodPlacement();
                  onToggleArrangeMode();
                }}
                className="flex flex-col items-center justify-center gap-1 min-h-[44px] py-0.5 px-2 active:scale-95 cursor-pointer transition-all group"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                  isArrangeMode 
                    ? 'bg-gradient-to-tr from-amber-500 to-amber-300 text-stone-950 shadow-[0_0_16px_rgba(245,158,11,0.45)] ring-2 ring-amber-300 font-bold scale-105' 
                    : 'bg-amber-500/25 hover:bg-amber-500/40 text-amber-200 border border-amber-400/40 shadow-xs'
                }`}>
                  <LayoutGrid size={18} />
                </div>
                <span className="text-[11px] font-medium text-amber-200 tracking-wider">置台</span>
              </button>

              {/* 5. 光影 / 氛围 */}
              <button
                type="button"
                onClick={() => {
                  sound.playBell(480, 2);
                  onOpenLighting();
                }}
                className="flex flex-col items-center justify-center gap-1 min-h-[44px] py-1 px-2.5 rounded-2xl hover:bg-amber-950/40 text-stone-300 hover:text-amber-200 transition-all active:scale-95 cursor-pointer group"
              >
                <Sliders size={20} className="text-amber-400/80 group-hover:text-amber-300 group-hover:scale-110 transition-all" />
                <span className="text-[11px] font-normal tracking-wider">光影</span>
              </button>

              {/* 6. 祈愿 */}
              <button
                type="button"
                onClick={() => {
                  sound.playBell(528, 2.5);
                  onOpenBlessing();
                }}
                className="flex flex-col items-center justify-center gap-1 min-h-[44px] py-1 px-2.5 rounded-2xl hover:bg-rose-950/40 text-stone-300 hover:text-rose-200 transition-all active:scale-95 cursor-pointer group"
              >
                <Heart size={20} className="text-amber-400/80 group-hover:text-rose-400 group-hover:fill-rose-500/30 group-hover:scale-110 transition-all" />
                <span className="text-[11px] font-normal tracking-wider">祈愿</span>
              </button>
            </div>
          </nav>
        ) : (
          /* ── 2. 收起状态：黑金鎏金胶囊悬浮条 (Black-Gold Dynamic Capsule) ── */
          <button
            type="button"
            onClick={toggleExpand}
            className="flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-[#1c1917]/95 hover:bg-stone-900 backdrop-blur-xl border border-amber-500/50 ring-1 ring-amber-400/20 shadow-[0_8px_30px_rgba(0,0,0,0.7)] text-amber-200 hover:text-amber-100 transition-all duration-300 active:scale-95 cursor-pointer group select-none animate-in fade-in zoom-in-95"
            title="点击展开供台功能菜单"
          >
            <div className="w-6 h-1 rounded-full bg-amber-500/40 group-hover:bg-amber-400 transition-colors" />
            <span className="text-xs font-serif font-medium tracking-widest text-amber-200 group-hover:text-amber-100">供台功能</span>
            <ChevronUp size={14} className="text-amber-400 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        )}

      </div>
    </div>
  );
};
