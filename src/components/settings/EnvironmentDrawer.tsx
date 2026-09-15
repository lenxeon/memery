/**
 * @file EnvironmentDrawer.tsx
 * @description 环境与场景样式抽屉面板，支持时间、背景墙、桌布、音量等实时调节。
 */
import React, { useState } from 'react';
import { LightingSettings, TimeOfDay, TableclothStyle, WallBackgroundStyle } from '../../types';
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
  Hourglass, 
  Check, 
  Palette, 
  X 
} from 'lucide-react';
import { sound } from '../../utils/audio';

export interface EnvironmentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lighting: LightingSettings;
  onUpdateLighting: (updated: Partial<LightingSettings>) => void;
  onToggleAllCandles: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  showTableRunner?: boolean;
  onToggleTableRunner?: () => void;
  tableclothStyle?: TableclothStyle;
  onChangeTableclothStyle?: (style: TableclothStyle) => void;
  wallStyle?: WallBackgroundStyle;
  onChangeWallStyle?: (style: WallBackgroundStyle) => void;
  showPetals?: boolean;
  onTogglePetals?: () => void;
  timeScale?: number;
  onUpdateTimeScale?: (scale: number) => void;
}

export const WALL_STYLE_OPTIONS: {
  id: WallBackgroundStyle;
  name: string;
  poeticTitle: string;
  iconText: string;
  desc: string;
  tag: string;
}[] = [
  { id: 'classic_dawn', name: '晴岚映曜', poeticTitle: '晨光沐影', iconText: '🏛️', desc: '欧式砂岩暖拱景窗 · 晨岚金辉丁达尔光', tag: '经典圣洁' },
  { id: 'heritage_wood', name: '暮林晚钟', poeticTitle: '沉香花格', iconText: '🏮', desc: '紫檀老木雕花隔扇 · 透光手工云龙皮纸影壁', tag: '传家古韵' },
  { id: 'royal_drape',    name: '华彩生光', poeticTitle: '皇家帷幔', iconText: '🎭', desc: '深绯皇家丝绒帷幔金绳流苏 · 暖金华彩透光', tag: '庄重华美' },
  { id: 'bronze_mirror',  name: '圆满如月', poeticTitle: '铜镜华光', iconText: '🌕', desc: '古法镏金大圆铜镜莲纹铸边 · 暖辉圆满映照', tag: '圆满通达' },
  { id: 'brick_screen',   name: '古朴苍然', poeticTitle: '月洞空灵', iconText: '🪟', desc: '月亮门水墨远山千道金芒 · 斑驳竹影落地宫灯暖念墙', tag: '东方雅意' },
  { id: 'lotus_mandorla', name: '宝相庄严', poeticTitle: '莲台佛境', iconText: '🪷', desc: '盛唐泥金宝相莲花曼陀罗 · 佛光福佑庄严', tag: '福佑庄严' },
];

const TABLECLOTH_OPTIONS: { 
  id: TableclothStyle; 
  name: string; 
  material: string; 
  texture: string; 
  color: string; 
  borderColor: string;
}[] = [
  { id: 'autumn_gold', name: '秋香金', material: '真丝重缎', texture: '黑金回形纹 · 宝相牡丹', color: '#dca842', borderColor: '#b45309' },
  { id: 'indigo_linen', name: '靛青蓝', material: '苎麻粗布', texture: '素白抽纱边 · 水墨幽兰', color: '#425672', borderColor: '#1e293b' },
  { id: 'cinnabar_red', name: '朱砂红', material: '密绒红呢', texture: '泥金万字锦 · 双鹤衔芝', color: '#b93839', borderColor: '#7f1d1d' },
  { id: 'moonlight_white', name: '月魄白', material: '冰丝生绢', texture: '素银如意纹 · 月下修竹', color: '#edeae1', borderColor: '#a8a29e' },
  { id: 'evergreen_pine', name: '黛螺绿', material: '沉香宋锦', texture: '八达晕金边 · 岁寒苍松', color: '#335242', borderColor: '#14532d' },
  { id: 'sandalwood_purple', name: '紫檀金', material: '盘金缂丝', texture: '连珠卷草纹 · 金莲曼荼罗', color: '#593a52', borderColor: '#581c87' },
];

export type LightingPanelProps = EnvironmentDrawerProps;

export const EnvironmentDrawer: React.FC<EnvironmentDrawerProps> = ({
  isOpen,
  onClose,
  lighting,
  onUpdateLighting,
  onToggleAllCandles,
  soundEnabled,
  onToggleSound,
  showTableRunner = true,
  onToggleTableRunner,
  tableclothStyle = 'autumn_gold',
  onChangeTableclothStyle,
  wallStyle = 'classic_dawn',
  onChangeWallStyle,
  showPetals = true,
  onTogglePetals,
  timeScale = 1,
  onUpdateTimeScale,
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg max-h-[85vh] sm:max-h-[88vh] flex flex-col bg-stone-50/98 backdrop-blur-md rounded-2xl shadow-2xl border border-amber-200/80 text-stone-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pinned Header */}
        <div className="flex items-center justify-between border-b border-amber-200/60 px-5 py-3.5 shrink-0 bg-stone-50/95">
          <div className="flex items-center gap-2">
            <Sliders size={18} className="text-amber-700" />
            <h3 className="font-serif text-lg font-semibold text-stone-800">场景光影与模拟控制</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 p-1.5 rounded-full hover:bg-stone-200/70 transition-colors cursor-pointer"
            title="关闭"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-5 py-4 space-y-4 text-xs overscroll-contain">
          {/* Master Light Switch */}
          <div className="flex items-center justify-between p-3 bg-amber-100/50 rounded-xl border border-amber-200/60">
            <div className="flex items-center gap-2.5">
              <Power size={18} className={lighting.masterOn ? 'text-amber-600' : 'text-stone-400'} />
              <div>
                <div className="font-medium text-stone-800">环境自然光照模拟</div>
                <div className="text-[11px] text-stone-500">
                  {lighting.masterOn ? '自然日光与全局环境光照已开启' : '已关闭自然采光，仅保留案上烛火香炉'}
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

          {/* ══════════════════════════════════════════════════════════════════
              背景空间美学 (6 款建筑典雅风格 · 严丝合缝融入场景)
             ══════════════════════════════════════════════════════════════════ */}
          <div className="space-y-2 p-3 bg-white rounded-xl border border-stone-200 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-medium text-stone-800">
                <Sparkles size={14} className="text-amber-600" />
                <span className="font-semibold">背景空间风格 (6 款可选)</span>
              </div>
              <span className="text-[11px] text-amber-800 font-medium">
                {WALL_STYLE_OPTIONS.find((o) => o.id === wallStyle)?.name} · {WALL_STYLE_OPTIONS.find((o) => o.id === wallStyle)?.poeticTitle}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-0.5">
              {WALL_STYLE_OPTIONS.map((opt) => {
                const isSelected = wallStyle === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      sound.playBell(540, 2);
                      onChangeWallStyle?.(opt.id);
                    }}
                    className={`flex flex-col p-2.5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? 'bg-amber-50/95 border-amber-500 ring-1 ring-amber-500/50 shadow-sm'
                        : 'bg-stone-50/80 hover:bg-stone-100 border-stone-200/90 text-stone-600'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-base">{opt.iconText}</span>
                      <span className={`text-[9px] px-1 py-0.2 rounded font-normal ${
                        isSelected ? 'bg-amber-200/80 text-amber-950 font-medium' : 'bg-stone-200/70 text-stone-500'
                      }`}>
                        {opt.tag}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-[11.5px] truncate font-serif ${isSelected ? 'text-amber-950 font-bold' : 'text-stone-800 font-medium'}`}>
                        {opt.name}
                      </span>
                    </div>
                    <div className="text-[10px] text-amber-900/80 truncate font-serif mt-0.5">
                      {opt.poeticTitle}
                    </div>
                    <div className="text-[9px] text-stone-400 line-clamp-2 mt-0.5 leading-tight">
                      {opt.desc}
                    </div>
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-600 ring-2 ring-amber-100" />
                    )}
                  </button>
                );
              })}
            </div>
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

          {/* Table Adornments (案台雅致装点) */}
          <div className="space-y-2.5 p-3 bg-white rounded-xl border border-stone-200 text-xs">
            <div className="flex items-center gap-1.5 font-medium text-stone-800">
              <Sparkles size={14} className="text-amber-600" />
              <span>案台雅致装点</span>
            </div>
            <div className="flex items-center justify-between text-stone-600 pt-1">
              <span>提花织锦大桌布（整案铺设 · 金丝流苏）</span>
              <button
                type="button"
                onClick={onToggleTableRunner}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  showTableRunner ? 'bg-amber-600 text-white' : 'bg-stone-200 text-stone-600'
                }`}
              >
                {showTableRunner ? '已铺设' : '素雅实木'}
              </button>
            </div>

            {/* 6 款不同风格桌布定制选择 (当桌布铺设时展开) */}
            {showTableRunner && (
              <div className="pt-2 border-t border-stone-100 space-y-2">
                <div className="flex items-center justify-between text-stone-500 text-[11px]">
                  <span className="flex items-center gap-1 font-medium text-stone-700">
                    <Palette size={12} className="text-amber-600" />
                    <span>定制桌布风格 (6 款可选)</span>
                  </span>
                  <span className="text-amber-800 font-medium">
                    {TABLECLOTH_OPTIONS.find((o) => o.id === tableclothStyle)?.name}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {TABLECLOTH_OPTIONS.map((opt) => {
                    const isSelected = tableclothStyle === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          sound.playWoodPlacement();
                          onChangeTableclothStyle?.(opt.id);
                        }}
                        className={`flex items-center gap-2 p-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-50/90 border-amber-500/80 ring-1 ring-amber-500/40 shadow-xs'
                            : 'bg-stone-50/80 hover:bg-stone-100 border-stone-200/80 text-stone-600'
                        }`}
                      >
                        <div
                          className="w-5 h-5 rounded-full border shadow-xs flex items-center justify-center shrink-0"
                          style={{ background: opt.color, borderColor: opt.borderColor }}
                        >
                          {isSelected && <Check size={11} className="text-white drop-shadow-xs stroke-[3]" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1">
                            <span className={`text-[11px] truncate ${isSelected ? 'text-amber-950 font-semibold' : 'text-stone-800 font-medium'}`}>
                              {opt.name}
                            </span>
                            <span className="text-[9px] px-1 py-0.2 rounded bg-stone-200/60 text-stone-600 shrink-0 font-normal">
                              {opt.material}
                            </span>
                          </div>
                          <div className="text-[9px] text-stone-500 truncate mt-0.5">
                            {opt.texture}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-stone-600 pt-1 border-t border-stone-100">
              <span>案头散落花瓣（随风零落意境）</span>
              <button
                type="button"
                onClick={onTogglePetals}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  showPetals ? 'bg-amber-600 text-white' : 'bg-stone-200 text-stone-600'
                }`}
              >
                {showPetals ? '已散落' : '隐藏'}
              </button>
            </div>
          </div>

          {/* Lifecycle & Time Scale (生机周期与岁月流速) */}
          <div className="space-y-2.5 p-3 bg-white rounded-xl border border-stone-200 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-medium text-stone-800">
                <Hourglass size={14} className="text-amber-600" />
                <span>供奉生机与岁月流速</span>
              </div>
              <span className="text-[11px] text-amber-800 font-semibold">
                {timeScale === 0 ? '🧘‍♂️ 禅意永生' : timeScale === 1 ? '🌱 现实流速' : timeScale === 10 ? '⏳ 演示加速 (10x)' : `${timeScale}x 极速`}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {[
                { scale: 0, label: '永生停驻' },
                { scale: 1, label: '现实 1x' },
                { scale: 10, label: '演示 10x' },
                { scale: 30, label: '极速 30x' },
              ].map((opt) => (
                <button
                  key={opt.scale}
                  type="button"
                  onClick={() => onUpdateTimeScale?.(opt.scale)}
                  className={`py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                    timeScale === opt.scale
                      ? 'bg-amber-600 text-white shadow-xs ring-1 ring-amber-700'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-stone-400 leading-tight">
              驱动案上供花真实生命历程（含苞 ➔ 盛开 ➔ 微凋 ➔ 枯萎 ➔ 消失）。
            </p>
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

        {/* Pinned Bottom Confirm Bar */}
        <div className="flex items-center justify-between border-t border-amber-200/60 px-5 py-3 shrink-0 bg-stone-100/95 backdrop-blur-xs">
          <span className="text-[11px] text-stone-500">
            全部调节已实时生效
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 active:scale-95 text-amber-50 font-medium text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Check size={14} />
            <span>完成确认</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const LightingPanel = EnvironmentDrawer;
