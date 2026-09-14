import React from 'react';
import { LightingSettings, TimeOfDay } from '../types';
import { 
  Sun, 
  Moon, 
  Sunset, 
  Flame, 
  Wind, 
  Sliders, 
  Power, 
  Volume2, 
  VolumeX, 
  Sparkles,
  X
} from 'lucide-react';
import { sound } from '../utils/audio';

interface LightingPanelProps {
  isOpen: boolean;
  onClose: () => void;
  lighting: LightingSettings;
  onUpdateLighting: (updated: Partial<LightingSettings>) => void;
  onToggleAllCandles: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const LightingPanel: React.FC<LightingPanelProps> = ({
  isOpen,
  onClose,
  lighting,
  onUpdateLighting,
  onToggleAllCandles,
  soundEnabled,
  onToggleSound,
}) => {
  if (!isOpen) return null;

  const handleTimeChange = (tod: TimeOfDay) => {
    sound.playBell(480, 2);
    onUpdateLighting({ timeOfDay: tod });
  };

  const handleMasterToggle = () => {
    sound.playBell(lighting.masterOn ? 360 : 540, 2);
    onUpdateLighting({ masterOn: !lighting.masterOn });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-stone-50/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-amber-200/80 text-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-200/60 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Sliders size={18} className="text-amber-700" />
            <h3 className="font-serif text-lg font-semibold text-stone-800">场景光影与模拟控制</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 text-lg leading-none p-1 rounded-full hover:bg-stone-200/60 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          {/* Master Light Switch */}
          <div className="flex items-center justify-between p-3 bg-amber-100/50 rounded-xl border border-amber-200/60">
            <div className="flex items-center gap-2.5">
              <Power size={18} className={lighting.masterOn ? 'text-amber-600' : 'text-stone-400'} />
              <div>
                <div className="font-semibold text-stone-800 text-sm">主光照总开关</div>
                <div className="text-stone-500 text-[11px]">
                  {lighting.masterOn ? '自然日光照耀中' : '全室暗光 (转为烛光微茫模式)'}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleMasterToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                lighting.masterOn ? 'bg-amber-600' : 'bg-stone-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform ${
                  lighting.masterOn ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Time of Day Presets */}
          <div>
            <label className="block text-stone-600 font-medium mb-1.5">时间与自然天色</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleTimeChange('day')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border transition-all cursor-pointer ${
                  lighting.timeOfDay === 'day' 
                    ? 'bg-amber-100/80 border-amber-500 text-amber-900 font-medium shadow-sm' 
                    : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <Sun size={14} className="text-amber-600" />
                <span>白昼晨辉</span>
              </button>

              <button
                type="button"
                onClick={() => handleTimeChange('sunset')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border transition-all cursor-pointer ${
                  lighting.timeOfDay === 'sunset' 
                    ? 'bg-orange-100/80 border-orange-500 text-orange-900 font-medium shadow-sm' 
                    : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <Sunset size={14} className="text-orange-600" />
                <span>暖调黄昏</span>
              </button>

              <button
                type="button"
                onClick={() => handleTimeChange('night')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border transition-all cursor-pointer ${
                  lighting.timeOfDay === 'night' 
                    ? 'bg-slate-800 border-slate-700 text-slate-100 font-medium shadow-sm' 
                    : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <Moon size={14} className="text-indigo-400" />
                <span>静谧微夜</span>
              </button>
            </div>
          </div>

          {/* Volumetric Rays / God Rays Switch & Intensity */}
          <div className="space-y-2 p-3 bg-white rounded-xl border border-stone-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-medium text-stone-800">
                <Sparkles size={14} className="text-amber-600" />
                <span>丁达尔光线 (体积光束 / God Rays)</span>
              </div>
              <button
                type="button"
                onClick={() => onUpdateLighting({ godRaysEnabled: !lighting.godRaysEnabled })}
                className={`text-xs px-2.5 py-0.5 rounded-full transition-colors cursor-pointer ${
                  lighting.godRaysEnabled ? 'bg-amber-100 text-amber-800 font-medium' : 'bg-stone-200 text-stone-500'
                }`}
              >
                {lighting.godRaysEnabled ? '已开启' : '已关闭'}
              </button>
            </div>

            {lighting.godRaysEnabled && (
              <div className="pt-2 space-y-2">
                <div className="flex items-center justify-between text-stone-500">
                  <span>光束浓度</span>
                  <span>{Math.round(lighting.godRaysIntensity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={lighting.godRaysIntensity}
                  onChange={(e) => onUpdateLighting({ godRaysIntensity: parseFloat(e.target.value) })}
                  className="w-full accent-amber-600 cursor-pointer"
                />

                <div className="flex items-center justify-between text-stone-500 pt-1">
                  <span>光束入射倾角</span>
                  <span>{lighting.sunAngle > 0 ? `右斜 ${lighting.sunAngle}°` : lighting.sunAngle < 0 ? `左斜 ${Math.abs(lighting.sunAngle)}°` : '正中下射'}</span>
                </div>
                <input
                  type="range"
                  min="-25"
                  max="25"
                  step="1"
                  value={lighting.sunAngle}
                  onChange={(e) => onUpdateLighting({ sunAngle: parseInt(e.target.value) })}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Candle Flame & Smoke Control */}
          <div className="space-y-3 p-3 bg-white rounded-xl border border-stone-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-medium text-stone-800">
                <Flame size={14} className="text-orange-500" />
                <span>烛火与清香火苗控制</span>
              </div>
              <button
                type="button"
                onClick={onToggleAllCandles}
                className="text-xs text-amber-700 hover:text-amber-800 underline font-medium cursor-pointer"
              >
                一键全点 / 全熄
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-stone-500">
                <span className="flex items-center gap-1">
                  <Wind size={12} />
                  <span>微风吹拂 (影响火苗摆动与烟雾飘向)</span>
                </span>
                <span>{lighting.windForce > 0 ? '微弱东风' : lighting.windForce < 0 ? '微弱西风' : '无风静止'}</span>
              </div>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.1"
                value={lighting.windForce}
                onChange={(e) => onUpdateLighting({ windForce: parseFloat(e.target.value) })}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Audio & Ambience */}
          <div className="flex items-center justify-between p-2.5 bg-stone-100 rounded-xl">
            <div className="flex items-center gap-2">
              {soundEnabled ? (
                <Volume2 size={16} className="text-stone-700" />
              ) : (
                <VolumeX size={16} className="text-stone-400" />
              )}
              <span className="text-stone-700 font-medium">颂钵清音与禅意音效</span>
            </div>
            <button
              type="button"
              onClick={onToggleSound}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                soundEnabled ? 'bg-amber-600 text-white' : 'bg-stone-300 text-stone-600'
              }`}
            >
              {soundEnabled ? '开' : '关'}
            </button>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-amber-50 font-medium text-xs shadow-md transition-colors cursor-pointer"
          >
            完成调节
          </button>
        </div>
      </div>
    </div>
  );
};
