/**
 * @file FpsMonitor.tsx
 * @description 实时性能监控小部件，显示当前渲染帧率（FPS）与运行状态。
 */
import React, { useEffect, useRef, useState } from 'react';
import { Activity, Gauge, ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, Flame, Sparkles, Layers } from 'lucide-react';

interface FpsMonitorProps {
  className?: string;
}

export const FpsMonitor: React.FC<FpsMonitorProps> = ({ className = '' }) => {
  const [fps, setFps] = useState<number>(60);
  const [frameTime, setFrameTime] = useState<number>(16.6);
  const [minFps, setMinFps] = useState<number>(60);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const frameCountRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());
  const minFpsRef = useRef<number>(60);
  const animFrameIdRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(performance.now());

  useEffect(() => {
    let lastFrameTimestamp = performance.now();

    const loop = (timestamp: number) => {
      frameCountRef.current++;
      const delta = timestamp - lastFrameTimestamp;
      lastFrameTimestamp = timestamp;

      // Update calculations every 300ms to avoid React re-rendering overhead
      if (timestamp - lastUpdateRef.current >= 300) {
        const elapsed = (timestamp - lastUpdateRef.current) / 1000;
        const currentFps = Math.round(frameCountRef.current / elapsed);
        const currentFrameTime = delta > 0 ? parseFloat(delta.toFixed(1)) : 16.6;

        if (currentFps > 0 && currentFps <= 240) {
          setFps(currentFps);
          setFrameTime(currentFrameTime);

          if (currentFps < minFpsRef.current) {
            minFpsRef.current = currentFps;
            setMinFps(currentFps);
          }
        }

        frameCountRef.current = 0;
        lastUpdateRef.current = timestamp;
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  const handleResetMin = (e: React.MouseEvent) => {
    e.stopPropagation();
    minFpsRef.current = fps;
    setMinFps(fps);
  };

  // Status color based on FPS
  const getStatus = () => {
    if (fps >= 54) {
      return {
        color: 'text-emerald-600 dark:text-emerald-400',
        badgeBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300',
        dot: 'bg-emerald-500',
        text: '流畅',
      };
    }
    if (fps >= 32) {
      return {
        color: 'text-amber-600 dark:text-amber-400',
        badgeBg: 'bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300',
        dot: 'bg-amber-500 animate-pulse',
        text: '轻微掉帧',
      };
    }
    return {
      color: 'text-rose-600 dark:text-rose-400',
      badgeBg: 'bg-rose-500/15 border-rose-500/30 text-rose-700 dark:text-rose-300',
      dot: 'bg-rose-500 animate-ping',
      text: '严重卡顿',
    };
  };

  const status = getStatus();

  return (
    <div className={`relative z-40 select-none ${className}`}>
      {/* Pill Badge */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md border shadow-xs cursor-pointer transition-all hover:scale-105 active:scale-95 ${status.badgeBg}`}
        title="点击查看页面性能与掉帧瓶颈分析"
      >
        <span className={`w-2 h-2 rounded-full ${status.dot}`} />
        <span className="font-mono font-bold text-xs tracking-tight">
          {fps} <span className="font-sans text-[10px] font-normal opacity-80">FPS</span>
        </span>
        <span className="hidden sm:inline-block font-mono text-[10px] opacity-70 border-l border-current/20 pl-1.5">
          {frameTime}ms
        </span>
        {isExpanded ? (
          <ChevronUp size={12} className="opacity-70" />
        ) : (
          <ChevronDown size={12} className="opacity-70" />
        )}
      </div>

      {/* Expanded Performance Diagnostic Popup */}
      {isExpanded && (
        <div className="absolute top-full mt-2 right-0 w-72 sm:w-80 p-3.5 rounded-2xl bg-stone-900/95 backdrop-blur-xl border border-stone-700/80 text-stone-200 shadow-2xl text-xs animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-auto">
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-stone-800">
            <div className="flex items-center gap-1.5 font-semibold text-stone-100">
              <Activity size={14} className="text-amber-400" />
              <span>页面渲染性能实时监控</span>
            </div>
            <button
              type="button"
              onClick={handleResetMin}
              className="text-[10px] text-stone-400 hover:text-amber-300 underline cursor-pointer"
            >
              重置最低值
            </button>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-stone-800/80 p-2 rounded-xl text-center border border-stone-700/50">
              <div className="text-[10px] text-stone-400">实时帧率</div>
              <div className={`font-mono text-base font-bold ${status.color}`}>
                {fps}
              </div>
            </div>
            <div className="bg-stone-800/80 p-2 rounded-xl text-center border border-stone-700/50">
              <div className="text-[10px] text-stone-400">单帧耗时</div>
              <div className="font-mono text-base font-bold text-stone-100">
                {frameTime}<span className="text-[10px] font-normal text-stone-400">ms</span>
              </div>
            </div>
            <div className="bg-stone-800/80 p-2 rounded-xl text-center border border-stone-700/50">
              <div className="text-[10px] text-stone-400">最低掉帧</div>
              <div className="font-mono text-base font-bold text-stone-300">
                {minFps}
              </div>
            </div>
          </div>

          {/* Diagnostic Bottlenecks */}
          <div className="space-y-1.5 text-[11px] text-stone-300">
            <div className="font-medium text-amber-300/90 flex items-center gap-1">
              <AlertTriangle size={12} />
              <span>当前页面主要性能开销瓶颈：</span>
            </div>
            <div className="bg-stone-800/50 rounded-lg p-2 space-y-1.5 border border-stone-700/40 text-[10.5px]">
              <div className="flex items-start gap-1.5">
                <Sparkles size={12} className="text-amber-400 mt-0.5 shrink-0" />
                <span><strong>Canvas shadowBlur 高斯模糊</strong>：DustMotes 每帧对 80+ 尘埃微粒调用 shadowBlur，开销极大</span>
              </div>
              <div className="flex items-start gap-1.5">
                <Flame size={12} className="text-orange-400 mt-0.5 shrink-0" />
                <span><strong>高频对象分配与多循环</strong>：双蜡烛与香炉并发 4 个 requestAnimationFrame 独立循环，并在循环中生成 RadialGradient</span>
              </div>
              <div className="flex items-start gap-1.5">
                <Layers size={12} className="text-cyan-400 mt-0.5 shrink-0" />
                <span><strong>全屏复合滤镜层叠</strong>：SVG feGaussianBlur(32px) + mix-blend-mode: screen + blur-3xl 导致 GPU 合成开销过重</span>
              </div>
            </div>
          </div>

          <div className="mt-2.5 text-[10px] text-stone-400 text-right">
            状态：<span className="font-medium text-stone-200">{status.text}</span> (推荐基准 60 FPS)
          </div>
        </div>
      )}
    </div>
  );
};
