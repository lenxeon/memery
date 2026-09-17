/**
 * @file ZenMusicPlayer.tsx
 * @description 禅意背景音乐控制胶囊组件，支持 4 大禅音曲目切换、动态声波律动、播放暂停与音量微调。
 */
import React, { useState, useEffect, useRef } from 'react';
import { 
  Music, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  SkipForward, 
  Sparkles,
  ChevronDown,
  Disc3
} from 'lucide-react';
import { sound, BGM_TRACKS } from '../../utils/audio';
import { BgmTrackId } from '../../types';

export const ZenMusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(sound.bgmPlaying);
  const [currentTrackId, setCurrentTrackId] = useState<BgmTrackId>(sound.currentTrackId);
  const [volume, setVolume] = useState<number>(sound.bgmVolume);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = sound.subscribeBgm((state) => {
      setIsPlaying(state.isPlaying);
      setCurrentTrackId(state.trackId);
      setVolume(state.volume);
    });
    return unsubscribe;
  }, []);

  // 点击外部关闭弹窗
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const currentTrack = BGM_TRACKS.find((t) => t.id === currentTrackId) || BGM_TRACKS[0];

  const handleTogglePlay = () => {
    sound.toggleBgm();
  };

  const handleSelectTrack = (id: BgmTrackId) => {
    sound.playBgm(id);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative inline-flex items-center" ref={menuRef}>
      {/* ── 1. 顶部音乐悬浮胶囊 ── */}
      <div 
        className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full backdrop-blur-md border shadow-xs transition-all duration-300 select-none ${
          isPlaying 
            ? 'bg-amber-50/90 border-amber-300/80 text-amber-950 ring-2 ring-amber-400/20' 
            : 'bg-white/85 hover:bg-white border-amber-200/60 text-stone-700'
        }`}
      >
        {/* 播放/暂停控制按钮 */}
        <button
          type="button"
          onClick={handleTogglePlay}
          className={`w-5 h-5 rounded-full flex items-center justify-center transition-transform active:scale-90 cursor-pointer ${
            isPlaying ? 'bg-amber-600 text-white shadow-xs' : 'bg-stone-200 text-stone-600 hover:bg-amber-100'
          }`}
          title={isPlaying ? '暂停禅音' : '开启禅意背景音乐'}
        >
          {isPlaying ? <Pause size={10} /> : <Play size={10} className="ml-0.5" />}
        </button>

        {/* 动态跳动声波谱线 (Playing Animated Equalizer) */}
        {isPlaying ? (
          <div 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-end gap-[2px] h-3.5 cursor-pointer px-0.5"
            title="点击切换曲目"
          >
            <div className="w-[2.5px] bg-amber-600 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-3.5" />
            <div className="w-[2.5px] bg-amber-500 rounded-full animate-[pulse_1.2s_ease-in-out_infinite_0.2s] h-2.5" />
            <div className="w-[2.5px] bg-amber-600 rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.4s] h-3" />
            <div className="w-[2.5px] bg-amber-500 rounded-full animate-[pulse_1.1s_ease-in-out_infinite_0.1s] h-2" />
          </div>
        ) : (
          <Music size={13} className="text-stone-400" />
        )}

        {/* 当前曲目名称与切换气泡触发 */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-1 text-xs cursor-pointer hover:opacity-80"
          title="点击挑选禅音曲目"
        >
          <span className="font-serif font-medium tracking-wide max-w-[80px] sm:max-w-[110px] truncate text-[11px] sm:text-xs">
            {currentTrack.name}
          </span>
          <ChevronDown size={12} className={`text-stone-400 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* ── 2. 禅音选曲与音量浮动卡片 ── */}
      {isMenuOpen && (
        <div className="absolute top-10 right-0 z-50 w-72 sm:w-80 p-3.5 rounded-2xl bg-[#fefcf8]/95 backdrop-blur-xl border border-amber-200/80 shadow-[0_16px_36px_rgba(40,25,10,0.18)] text-stone-800 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-900/10">
            <div className="flex items-center gap-1.5">
              <Disc3 size={15} className="text-amber-700 animate-[spin_10s_linear_infinite]" />
              <span className="text-xs font-serif font-semibold text-amber-950 tracking-wider">
                禅意背景乐章
              </span>
            </div>
            <span className="text-[10px] text-amber-700/80 bg-amber-100/70 px-1.5 py-0.5 rounded-full">
              432Hz / 528Hz 疗愈
            </span>
          </div>

          {/* 4 大精选曲目列表 */}
          <div className="space-y-1.5 mb-3">
            {BGM_TRACKS.map((track) => {
              const isSelected = track.id === currentTrackId;
              return (
                <div
                  key={track.id}
                  onClick={() => handleSelectTrack(track.id)}
                  className={`flex items-start gap-2.5 p-2 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-100/70 border border-amber-300/80 text-amber-950 shadow-xs'
                      : 'hover:bg-stone-100/70 border border-transparent text-stone-700'
                  }`}
                >
                  <span className="text-lg mt-0.5 select-none">{track.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-serif font-medium tracking-wide">
                        {track.name}
                      </span>
                      {isSelected && isPlaying && (
                        <span className="text-[10px] text-amber-700 font-sans flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping" />
                          播放中
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-stone-500 truncate mt-0.5">
                      {track.poeticName} · {track.instrument}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 禅音音量滑块 */}
          <div className="pt-2 border-t border-amber-900/10 flex items-center justify-between gap-3 text-xs text-stone-600">
            <div className="flex items-center gap-1.5 text-stone-500">
              {volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} className="text-amber-700" />}
              <span className="text-[11px]">背景音量</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => sound.setBgmVolume(parseFloat(e.target.value))}
              className="flex-1 accent-amber-600 h-1.5 bg-stone-200 rounded-lg cursor-pointer"
            />
            <span className="text-[10px] font-mono text-stone-500 w-7 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
