import React from 'react';
import { Flame, Sliders, Heart, Flower2, LayoutGrid } from 'lucide-react';
import { sound } from '../utils/audio';

interface BottomDockProps {
  onOpenFlowers: () => void;
  onToggleCandles: () => void;
  candlesLit: boolean;
  onToggleArrangeMode: () => void;
  isArrangeMode: boolean;
  onOpenLighting: () => void;
  onOpenBlessing: () => void;
}

export const BottomDock: React.FC<BottomDockProps> = ({
  onOpenFlowers,
  onToggleCandles,
  candlesLit,
  onToggleArrangeMode,
  isArrangeMode,
  onOpenLighting,
  onOpenBlessing,
}) => {
  return (
    <div className="fixed bottom-3 sm:bottom-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <nav 
        aria-label="供台操作导航"
        className="pointer-events-auto flex items-center justify-between gap-1 sm:gap-3 px-3 sm:px-5 py-2 rounded-2xl sm:rounded-3xl bg-[#fdfbf7]/95 border border-amber-200/70 shadow-[0_8px_28px_rgba(70,45,20,0.15)] text-stone-600 max-w-[420px] w-full"
      >
        {/* 1. 献花 */}
        <button
          type="button"
          onClick={() => {
            sound.playBell(580, 2);
            onOpenFlowers();
          }}
          className="flex flex-col items-center justify-center gap-1 min-h-[44px] py-1 px-2.5 rounded-xl hover:bg-amber-100/50 text-stone-600 hover:text-amber-900 transition-all active:scale-95 cursor-pointer group"
        >
          <Flower2 size={20} className="text-stone-500 group-hover:text-amber-700 transition-colors" />
          <span className="text-[11px] font-normal tracking-wider">献花</span>
        </button>

        {/* 2. 点烛 */}
        <button
          type="button"
          onClick={onToggleCandles}
          className={`flex flex-col items-center justify-center gap-1 min-h-[44px] py-1 px-2.5 rounded-xl transition-all active:scale-95 cursor-pointer ${
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

        {/* 3. 置台 (Center Hero Button in golden rounded badge like reference image) */}
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
          className="flex flex-col items-center justify-center gap-1 min-h-[44px] py-1 px-2.5 rounded-xl hover:bg-amber-100/50 text-stone-600 hover:text-amber-900 transition-all active:scale-95 cursor-pointer group"
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
          className="flex flex-col items-center justify-center gap-1 min-h-[44px] py-1 px-2.5 rounded-xl hover:bg-rose-100/50 text-stone-600 hover:text-rose-900 transition-all active:scale-95 cursor-pointer group"
        >
          <Heart size={20} className="text-stone-500 group-hover:text-rose-600 group-hover:fill-rose-500/30 transition-colors" />
          <span className="text-[11px] font-normal tracking-wider">祈愿</span>
        </button>
      </nav>
    </div>
  );
};
