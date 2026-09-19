/**
 * @file AmbiancePanel.tsx
 * @description 环境与场景样式抽屉面板，支持时间、背景墙、桌布、音量等实时调节。
 */
import { FLOOR_STYLE_OPTIONS, WALL_STYLE_OPTIONS } from '../../../pixi';
import { useDialogContext } from '../../common/dialog';
import { LoreBadge } from '../../lore';
import { resolveTableclothLoreId } from '../../../data/lore';
import React, { useState } from 'react';
import { LightingSettings, TimeOfDay, TableclothStyle, TableWoodStyle, WallBackgroundStyle } from '../../../types';
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
  X,
  Disc3,
  Play,
  Pause,
  Music,
  ShieldCheck,
  Eye,
  ChevronDown,
  ChevronUp,
  RotateCcw
} from 'lucide-react';
import { sound, BGM_TRACKS } from '../../../utils/audio';
import { BgmTrackId, FloorStyle, AuditCategory, AuditGroup } from '../../../types';
import { ChineseCornerOrnaments, ChineseCloudDivider, CinnabarSealBadge } from '../../common/ChineseDecorations';

export interface AmbiancePanelProps {
  onOpenAgreement?: () => void;
  lighting: LightingSettings;
  onUpdateLighting: (updated: Partial<LightingSettings>) => void;
  onToggleAllCandles: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  showTableRunner?: boolean;
  onToggleTableRunner?: () => void;
  tableclothStyle?: TableclothStyle;
  onChangeTableclothStyle?: (style: TableclothStyle) => void;
  tableWoodStyle?: TableWoodStyle;
  onChangeTableWoodStyle?: (style: TableWoodStyle) => void;
  floorStyle?: FloorStyle;
  onChangeFloorStyle?: (style: FloorStyle) => void;
  wallStyle?: WallBackgroundStyle;
  onChangeWallStyle?: (style: WallBackgroundStyle) => void;
  showPetals?: boolean;
  onTogglePetals?: () => void;
  timeScale?: number;
  onUpdateTimeScale?: (scale: number) => void;
  isAuditMode?: boolean;
  onToggleAuditMode?: () => void;
  auditCategory?: AuditCategory;
  onSwitchAuditCategory?: (cat: AuditCategory) => void;
  auditGroup?: AuditGroup;
  onSwitchAuditGroup?: (grp: AuditGroup) => void;
  auditWithFlowers?: boolean;
  onToggleAuditFlowers?: () => void;
  flowerDecayHealth?: number;
  onSelectFlowerDecayHealth?: (health: number) => void;
  onTriggerAuditPetals?: () => void;
}

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

export const TABLE_WOOD_OPTIONS: {
  id: TableWoodStyle;
  name: string;
  poeticTitle: string;
  texture: string;
  color: string;
  borderColor: string;
  tag: string;
}[] = [
  { id: 'walnut', name: '暖栗胡桃', poeticTitle: '檀影温润', texture: '经典山纹 · 沉稳内敛', color: '#452618', borderColor: '#7c3f25', tag: '经典传承' },
  { id: 'huanghuali', name: '明式黄花梨', poeticTitle: '流水华彩', texture: '波浪鬼脸 · 琥珀温润', color: '#7a421b', borderColor: '#b4602a', tag: '宫廷名木' },
  { id: 'cherry', name: '典雅樱桃木', poeticTitle: '暖红映辉', texture: '丝质细润 · 微泛朱霞', color: '#6a2f20', borderColor: '#9a4731', tag: '端庄古朴' },
  { id: 'white_oak', name: '素雅白橡木', poeticTitle: '素心净植', texture: '自然直纹 · 通透淡雅', color: '#8c6e54', borderColor: '#b8997a', tag: '禅意素净' },
];

export type LightingPanelProps = AmbiancePanelProps;

export const AmbiancePanel: React.FC<AmbiancePanelProps> = ({
  onOpenAgreement,
  lighting,
  onUpdateLighting,
  onToggleAllCandles,
  soundEnabled,
  onToggleSound,
  showTableRunner = true,
  onToggleTableRunner,
  tableclothStyle = 'autumn_gold',
  onChangeTableclothStyle,
  tableWoodStyle = 'walnut',
  onChangeTableWoodStyle,
  floorStyle = 'marble_tile',
  onChangeFloorStyle,
  wallStyle = 'classic_dawn',
  onChangeWallStyle,
  showPetals = true,
  onTogglePetals,
  timeScale = 1,
  onUpdateTimeScale,
  isAuditMode = false,
  onToggleAuditMode,
  auditCategory = 'flowers',
  onSwitchAuditCategory,
  auditGroup = 'flowers_tier1_all',
  onSwitchAuditGroup,
  auditWithFlowers = true,
  onToggleAuditFlowers,
  flowerDecayHealth = 1.0,
  onSelectFlowerDecayHealth,
  onTriggerAuditPetals,
}) => {
  // 关闭动作由通用弹窗系统注入，本面板只处理自身内容
  const { close } = useDialogContext();
  const [isAuditExpanded, setIsAuditExpanded] = useState(isAuditMode);

  React.useEffect(() => {
    if (isAuditMode) {
      setIsAuditExpanded(true);
    }
  }, [isAuditMode]);

  const [bgmState, setBgmState] = useState({
    isPlaying: sound.bgmPlaying,
    trackId: sound.currentTrackId,
    volume: sound.bgmVolume,
  });

  React.useEffect(() => {
    return sound.subscribeBgm((state) => {
      setBgmState(state);
    });
  }, []);
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
      className="w-full max-w-lg max-h-[85vh] sm:max-h-[88vh] flex flex-col bg-[#1c1917]/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-amber-500/50 text-stone-200 overflow-hidden relative ring-1 ring-amber-400/20"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 四角古风回纹角花装饰 */}
      <ChineseCornerOrnaments className="text-amber-400/70" />

      {/* Pinned Header */}
      <div className="flex items-center justify-between border-b border-amber-500/30 px-5 py-3.5 shrink-0 bg-[#1c1917]/90 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
            <Sliders size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-base sm:text-lg font-semibold text-amber-200 leading-tight">
                场景光影与环境造境
              </h3>
              <CinnabarSealBadge text="造境" />
            </div>
            <p className="text-[11px] text-amber-200/60 truncate mt-0.5">
              调节天色时辰、丁达尔光、古韵背景与雅致桌布
            </p>
          </div>
        </div>
        <button 
          onClick={close}
          className="text-amber-400/60 hover:text-amber-200 text-sm w-7 h-7 flex items-center justify-center rounded-full hover:bg-amber-500/20 cursor-pointer transition-colors shrink-0"
          title="关闭"
        >
          <X size={16} />
        </button>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-5 py-4 space-y-4 text-xs overscroll-contain relative z-10">
        {/* Master Light Switch */}
        <div className="flex items-center justify-between p-3.5 bg-stone-900/80 rounded-2xl border border-amber-500/30">
          <div className="flex items-center gap-2.5">
            <Power size={18} className={lighting.masterOn ? 'text-amber-400' : 'text-stone-500'} />
            <div>
              <div className="font-medium text-amber-200">环境自然光照模拟</div>
              <div className="text-[11px] text-stone-400">
                {lighting.masterOn ? '自然日光与全局环境光照已开启' : '已关闭自然采光，仅保留案上烛火香炉'}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleMasterToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer border ${
              lighting.masterOn ? 'bg-amber-600 border-amber-400/60' : 'bg-stone-800 border-stone-700'
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
        <div className="space-y-2 p-3 bg-stone-900/80 rounded-2xl border border-amber-500/30 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-medium text-amber-200">
              <Sparkles size={14} className="text-amber-400" />
              <span className="font-serif font-semibold">背景空间古韵 (6 款可选)</span>
            </div>
            <span className="text-[11px] text-amber-300 font-medium">
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
                      ? 'bg-amber-950/50 border-amber-400/80 ring-1 ring-amber-400/50 text-amber-100 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                      : 'bg-stone-950/60 hover:bg-stone-800/60 border-stone-800 text-stone-400'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-base">{opt.iconText}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-normal ${
                      isSelected ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-stone-800 text-stone-500'
                    }`}>
                      {opt.tag}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-[11.5px] truncate font-serif ${isSelected ? 'text-amber-200 font-bold' : 'text-stone-300 font-medium'}`}>
                      {opt.name}
                    </span>
                  </div>
                  <div className="text-[10px] text-amber-400/90 truncate font-serif mt-0.5">
                    {opt.poeticTitle}
                  </div>
                  <div className="text-[9px] text-stone-500 line-clamp-2 mt-0.5 leading-tight">
                    {opt.desc}
                  </div>
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 ring-2 ring-amber-950" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time of Day Presets */}
        <div className="space-y-2 p-3 bg-stone-900/80 rounded-2xl border border-amber-500/30">
          <label className="block text-amber-200/80 font-medium font-serif mb-1">自然天色时辰</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleTimeChange('day')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border transition-all cursor-pointer ${
                lighting.timeOfDay === 'day' 
                  ? 'bg-amber-950/60 border-amber-400/80 text-amber-200 ring-1 ring-amber-400/40 font-medium shadow-sm' 
                  : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:bg-stone-800/60'
              }`}
            >
              <Sun size={14} className="text-amber-400" />
              <span>白昼晨辉</span>
            </button>

            <button
              type="button"
              onClick={() => handleTimeChange('sunset')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border transition-all cursor-pointer ${
                lighting.timeOfDay === 'sunset' 
                  ? 'bg-orange-950/60 border-orange-400/80 text-orange-200 ring-1 ring-orange-400/40 font-medium shadow-sm' 
                  : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:bg-stone-800/60'
              }`}
            >
              <Sunset size={14} className="text-orange-400" />
              <span>暖调黄昏</span>
            </button>

            <button
              type="button"
              onClick={() => handleTimeChange('night')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border transition-all cursor-pointer ${
                lighting.timeOfDay === 'night' 
                  ? 'bg-indigo-950/60 border-indigo-400/80 text-indigo-200 ring-1 ring-indigo-400/40 font-medium shadow-sm' 
                  : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:bg-stone-800/60'
              }`}
            >
              <Moon size={14} className="text-indigo-400" />
              <span>静谧微夜</span>
            </button>
          </div>
        </div>

        {/* Volumetric Rays / God Rays Switch & Intensity */}
        <div className="space-y-2 p-3 bg-stone-900/80 rounded-2xl border border-amber-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-medium text-amber-200">
              <Sparkles size={14} className="text-amber-400" />
              <span className="font-serif">丁达尔光线 (体积光束 / 佛光晨曜)</span>
            </div>
            <button
              type="button"
              onClick={() => onUpdateLighting({ godRaysEnabled: !lighting.godRaysEnabled })}
              className={`text-xs px-2.5 py-0.5 rounded-full transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
                lighting.godRaysEnabled ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium' : 'bg-stone-800 text-stone-500'
              }`}
            >
              {lighting.godRaysEnabled ? '已开启' : '已关闭'}
            </button>
          </div>

          {lighting.godRaysEnabled && (
            <div className="pt-2 space-y-2 border-t border-stone-800/80 mt-1">
              <div className="flex items-center justify-between text-stone-400">
                <span>光束浓度</span>
                <span className="text-amber-300">{Math.round(lighting.godRaysIntensity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={lighting.godRaysIntensity}
                onChange={(e) => onUpdateLighting({ godRaysIntensity: parseFloat(e.target.value) })}
                className="w-full accent-amber-500 cursor-pointer"
              />

              <div className="flex items-center justify-between text-stone-400 pt-1">
                <span>光束入射倾角</span>
                <span className="text-amber-300">{lighting.sunAngle > 0 ? `右斜 ${lighting.sunAngle}°` : lighting.sunAngle < 0 ? `左斜 ${Math.abs(lighting.sunAngle)}°` : '正中下射'}</span>
              </div>
              <input
                type="range"
                min="-25"
                max="25"
                step="1"
                value={lighting.sunAngle}
                onChange={(e) => onUpdateLighting({ sunAngle: parseInt(e.target.value) })}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Candle Flame & Smoke Control */}
        <div className="space-y-3 p-3 bg-stone-900/80 rounded-2xl border border-amber-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-medium text-amber-200">
              <Flame size={14} className="text-orange-400" />
              <span className="font-serif">烛火与清香火苗控制</span>
            </div>
            <button
              type="button"
              onClick={onToggleAllCandles}
              className="text-xs text-amber-400 hover:text-amber-300 underline font-medium cursor-pointer shrink-0 whitespace-nowrap"
            >
              一键全点 / 全熄
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-stone-400">
              <span className="flex items-center gap-1">
                <Wind size={12} />
                <span>微风吹拂 (影响火苗摆动与烟雾飘向)</span>
              </span>
              <span className="text-amber-300">{lighting.windForce > 0 ? '微弱东风' : lighting.windForce < 0 ? '微弱西风' : '无风静止'}</span>
            </div>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.1"
              value={lighting.windForce}
              onChange={(e) => onUpdateLighting({ windForce: parseFloat(e.target.value) })}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Table Adornments (案台雅致装点) */}
        <div className="space-y-2.5 p-3 bg-stone-900/80 rounded-2xl border border-amber-500/30 text-xs">
          <div className="flex items-center gap-1.5 font-medium text-amber-200">
            <Sparkles size={14} className="text-amber-400" />
            <span className="font-serif font-semibold">案台雅致装点</span>
          </div>

          {/* 4 款供案实木材质选择 */}
          <div className="space-y-2 pt-0.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1 font-medium text-amber-200">
                <Palette size={12} className="text-amber-400" />
                <span className="font-serif">供案原木材质 (4 款可选)</span>
              </span>
              <span className="text-amber-300 font-medium">
                {TABLE_WOOD_OPTIONS.find((o) => o.id === tableWoodStyle)?.name}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {TABLE_WOOD_OPTIONS.map((opt) => {
                const isSelected = tableWoodStyle === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      sound.playWoodPlacement();
                      onChangeTableWoodStyle?.(opt.id);
                    }}
                    className={`flex items-center gap-2 p-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-950/50 border-amber-400/80 ring-1 ring-amber-400/40 text-amber-100 shadow-xs'
                        : 'bg-stone-950/60 hover:bg-stone-800/60 border-stone-800 text-stone-400'
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
                        <span className={`text-[11px] truncate font-serif ${isSelected ? 'text-amber-200 font-semibold' : 'text-stone-300 font-medium'}`}>
                          {opt.name}
                        </span>
                        <span className="text-[9px] px-1 py-0.2 rounded bg-stone-800 text-stone-400 shrink-0 font-normal">
                          {opt.tag}
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

          <div className="flex items-center justify-between text-stone-300 pt-2 border-t border-stone-800 gap-2">
            <span className="truncate">提花织锦大桌布（整案铺设 · 金丝流苏）</span>
            <button
              type="button"
              onClick={onToggleTableRunner}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer border shrink-0 whitespace-nowrap ${
                showTableRunner ? 'bg-amber-600 border-amber-400/60 text-amber-950 font-bold' : 'bg-stone-800 border-stone-700 text-stone-400'
              }`}
            >
              {showTableRunner ? '已铺设' : '素雅实木'}
            </button>
          </div>

          {/* 6 款不同风格桌布定制选择 (当桌布铺设时展开) */}
          {showTableRunner && (
            <div className="pt-2 border-t border-stone-800 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1 font-medium text-amber-200">
                  <Palette size={12} className="text-amber-400" />
                  <span className="font-serif">定制桌布风格 (6 款可选)</span>
                </span>
                <span className="text-amber-300 font-medium">
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
                          ? 'bg-amber-950/50 border-amber-400/80 ring-1 ring-amber-400/40 text-amber-100 shadow-xs'
                          : 'bg-stone-950/60 hover:bg-stone-800/60 border-stone-800 text-stone-400'
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
                          <span className={`text-[11px] truncate font-serif ${isSelected ? 'text-amber-200 font-semibold' : 'text-stone-300 font-medium'}`}>
                            {opt.name}
                          </span>
                          <span className="text-[9px] px-1 py-0.2 rounded bg-stone-800 text-stone-400 shrink-0 font-normal">
                            {opt.material}
                          </span>
                          <LoreBadge loreId={resolveTableclothLoreId(opt.id)} />
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

          <div className="flex items-center justify-between text-stone-300 pt-1 border-t border-stone-800 gap-2">
            <span className="truncate">案头散落花瓣（随风零落意境）</span>
            <button
              type="button"
              onClick={onTogglePetals}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer border shrink-0 whitespace-nowrap ${
                showPetals ? 'bg-amber-600 border-amber-400/60 text-amber-950 font-bold' : 'bg-stone-800 border-stone-700 text-stone-400'
              }`}
            >
              {showPetals ? '已散落' : '隐藏'}
            </button>
          </div>
        </div>

        {/* ── 6. 地面材质与地坪风格 (汉白玉大理石 / 沉香实木地板) ── */}
        <div className="space-y-2.5 p-3 bg-stone-900/80 rounded-2xl border border-amber-500/30 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-medium text-amber-200">
              <Palette size={14} className="text-amber-400" />
              <span className="font-serif font-semibold">地面材质与地坪风格 (5 款可选)</span>
            </div>
            <span className="text-[11px] text-amber-300 font-semibold">
              {FLOOR_STYLE_OPTIONS.find((o) => o.id === floorStyle)?.name} · {FLOOR_STYLE_OPTIONS.find((o) => o.id === floorStyle)?.poeticTitle}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {FLOOR_STYLE_OPTIONS.map((opt) => {
              const isSelected = opt.id === floorStyle;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    sound.playWoodPlacement();
                    onChangeFloorStyle?.(opt.id);
                  }}
                  className={`flex flex-col p-2 rounded-xl text-left transition-all cursor-pointer border relative ${
                    isSelected
                      ? 'bg-amber-950/50 border-amber-400/80 ring-1 ring-amber-400/40 text-amber-100 shadow-xs'
                      : 'bg-stone-950/60 hover:bg-stone-800/60 border-stone-800 text-stone-400'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-base select-none">{opt.iconText}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-normal ${
                      isSelected ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-stone-800 text-stone-500'
                    }`}>
                      {opt.tag}
                    </span>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-[11px] truncate font-serif ${isSelected ? 'text-amber-200 font-bold' : 'text-stone-300 font-medium'}`}>
                      {opt.name}
                    </span>
                    {isSelected && <Check size={12} className="text-amber-400 stroke-[3] shrink-0 ml-1" />}
                  </div>
                  <div className="text-[9.5px] text-amber-400/90 truncate font-serif mt-0.5">
                    {opt.poeticTitle}
                  </div>
                  <div className="text-[9px] text-stone-500 line-clamp-2 mt-0.5 leading-tight">
                    {opt.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Lifecycle & Time Scale (生机周期与岁月流速) */}
        <div className="space-y-2.5 p-3 bg-stone-900/80 rounded-2xl border border-amber-500/30 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-medium text-amber-200">
              <Hourglass size={14} className="text-amber-400" />
              <span className="font-serif font-semibold">供奉生机与岁月流速</span>
            </div>
            <span className="text-[11px] text-amber-300 font-semibold">
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
                className={`py-1.5 px-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer border whitespace-nowrap text-center ${
                  timeScale === opt.scale
                    ? 'bg-amber-600/80 border-amber-400/70 text-amber-100 shadow-xs'
                    : 'bg-stone-950/60 hover:bg-stone-800/60 border-stone-800 text-stone-400'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-stone-500 leading-tight">
            驱动案上供花真实生命历程（含苞 ➔ 盛开 ➔ 微凋 ➔ 枯萎 ➔ 消失）。
          </p>
        </div>

        {/* ── 8. 禅意背景音乐与声景 (Zen Meditation Music) ── */}
        <div className="space-y-2.5 p-3 bg-amber-950/20 border border-amber-500/40 rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Disc3 size={16} className={`text-amber-400 ${bgmState.isPlaying ? 'animate-[spin_8s_linear_infinite]' : ''}`} />
              <span className="text-xs font-serif font-semibold text-amber-200">禅意背景音乐 (432Hz / 528Hz)</span>
            </div>
            <button
              type="button"
              onClick={() => sound.toggleBgm()}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1 border shrink-0 whitespace-nowrap ${
                bgmState.isPlaying 
                  ? 'bg-amber-600 border-amber-400/60 text-amber-950 font-bold shadow-xs' 
                  : 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {bgmState.isPlaying ? <Pause size={12} /> : <Play size={12} />}
              <span>{bgmState.isPlaying ? '暂停' : '播放'}</span>
            </button>
          </div>

          {/* 4 大曲目卡片网格 */}
          <div className="grid grid-cols-2 gap-1.5">
            {BGM_TRACKS.map((track) => {
              const isSelected = track.id === bgmState.trackId;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => sound.playBgm(track.id)}
                  className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-amber-900/40 border-amber-400/70 text-amber-100 font-medium shadow-xs'
                      : 'bg-stone-900/70 hover:bg-stone-800/80 border-stone-800/70 text-stone-300'
                  }`}
                >
                  <span className="text-base select-none">{track.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-serif truncate text-amber-200">{track.name}</div>
                    <div className="text-[9px] text-stone-400 truncate">{track.poeticName}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 背景音乐音量控制条 */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[11px] text-stone-400 shrink-0">乐曲音量</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={bgmState.volume}
              onChange={(e) => sound.setBgmVolume(parseFloat(e.target.value))}
              className="flex-1 accent-amber-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
            />
            <span className="text-[10px] font-mono text-amber-300 w-7 text-right">
              {Math.round(bgmState.volume * 100)}%
            </span>
          </div>
        </div>

        {/* ── 9. 摆件交互音效开关 ── */}
        <div className="flex items-center justify-between p-3 bg-stone-900/80 rounded-2xl border border-amber-500/30 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {soundEnabled ? (
              <Volume2 size={16} className="text-amber-400 shrink-0" />
            ) : (
              <VolumeX size={16} className="text-stone-500 shrink-0" />
            )}
            <span className="text-stone-300 font-medium text-xs truncate">祭祀与供奉触碰音效 (敲磬/点烛/置杯)</span>
          </div>
          <button
            type="button"
            onClick={onToggleSound}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer border shrink-0 whitespace-nowrap ${
              soundEnabled ? 'bg-amber-600 border-amber-400/60 text-amber-950 font-bold' : 'bg-stone-800 border-stone-700 text-stone-400'
            }`}
          >
            {soundEnabled ? '开' : '关'}
          </button>
        </div>

        {/* ── 10. 专项展台审计开关与深度配置 (支持展开折叠) ── */}
        {onToggleAuditMode && (
          <div className="space-y-3 p-3.5 bg-stone-900/80 rounded-2xl border border-amber-500/30 transition-all">
            {/* 头部开关与展开折叠控制 */}
            <div 
              className="flex items-center justify-between cursor-pointer select-none gap-2.5"
              onClick={() => {
                sound.playWoodPlacement();
                setIsAuditExpanded((prev) => !prev);
              }}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                  isAuditMode 
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)]' 
                    : 'bg-stone-800 border-stone-700 text-stone-500'
                }`}>
                  <Eye size={16} />
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-stone-200 font-medium text-xs">专项展台审计（名花与花器全景品鉴）</span>
                    <span className="text-[10px] text-amber-400/90 font-mono flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 whitespace-nowrap shrink-0">
                      {isAuditExpanded ? '收起配置' : '展开配置'}
                      {isAuditExpanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-400 mt-0.5">
                    {isAuditMode ? '展台已激活 · 点击可折叠或微调审计大类、分组与枯荣度' : '开启后在案台呈现可自由拖拽的全景名花与名瓷品鉴展台'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-1" onClick={(e) => e.stopPropagation()}>
                {/* 开关按钮 */}
                <button
                  type="button"
                  onClick={() => {
                    sound.playWoodPlacement();
                    onToggleAuditMode();
                    if (!isAuditMode) {
                      setIsAuditExpanded(true);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border shrink-0 whitespace-nowrap ${
                    isAuditMode
                      ? 'bg-gradient-to-r from-rose-600 to-amber-600 border-amber-400/60 text-stone-950 font-bold shadow-xs'
                      : 'bg-stone-800 border-stone-700 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {isAuditMode ? '已开启' : '开启'}
                </button>
              </div>
            </div>

            {/* 展开后的详细配置面板 */}
            {isAuditExpanded && (
              <div className="pt-3 border-t border-amber-500/20 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                {/* 1. 品鉴大类切换 (名花 vs 花器 vs 供案) */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-amber-200/90 flex items-center justify-between font-serif">
                    <span>品鉴大类</span>
                    <span className="text-[10px] text-stone-400 font-sans font-normal">
                      {auditCategory === 'flowers' ? '当前：15款名卉形神品鉴' : '当前：12款雅瓷花器形制'}
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (!isAuditMode) onToggleAuditMode?.();
                        onSwitchAuditCategory?.('flowers');
                      }}
                      className={`py-1.5 px-2.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        auditCategory === 'flowers'
                          ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-sm'
                          : 'bg-stone-950/70 border-stone-800 text-stone-300 hover:bg-stone-800/80 hover:text-stone-100'
                      }`}
                    >
                      <span>🌸</span>
                      <span>名花形神专项 (15款)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (!isAuditMode) onToggleAuditMode?.();
                        onSwitchAuditCategory?.('vases');
                      }}
                      className={`py-1.5 px-2.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        auditCategory === 'vases'
                          ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-sm'
                          : 'bg-stone-950/70 border-stone-800 text-stone-300 hover:bg-stone-800/80 hover:text-stone-100'
                      }`}
                    >
                      <span>🏺</span>
                      <span>花器形制专项 (12款)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (!isAuditMode) onToggleAuditMode?.();
                        onSwitchAuditCategory?.('table');
                      }}
                      className={`py-1.5 px-2.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        auditCategory === 'table'
                          ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-sm'
                          : 'bg-stone-950/70 border-stone-800 text-stone-300 hover:bg-stone-800/80 hover:text-stone-100'
                      }`}
                    >
                      <span>🪵</span>
                      <span>供案原木材质 (4款)</span>
                    </button>
                  </div>
                </div>

                {/* 2. 展台阵列分组 */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-amber-200/90 font-serif">
                    {auditCategory === 'flowers' ? '名花陈列分组' : '雅瓷花器分组'}
                  </label>
                  {auditCategory === 'flowers' ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          if (!isAuditMode) onToggleAuditMode?.();
                          onSwitchAuditGroup?.('flowers_tier1_all');
                        }}
                        className={`py-1.5 px-2 rounded-lg border text-[11px] text-center cursor-pointer transition-all ${
                          auditGroup === 'flowers_tier1_all'
                            ? 'bg-amber-500/25 border-amber-400 text-amber-200 font-bold ring-1 ring-amber-400/40'
                            : 'bg-stone-950/50 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                        }`}
                      >
                        🌟 10花齐放同台
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!isAuditMode) onToggleAuditMode?.();
                          onSwitchAuditGroup?.('flowers_tier1_a');
                        }}
                        className={`py-1.5 px-2 rounded-lg border text-[11px] text-center cursor-pointer transition-all ${
                          auditGroup === 'flowers_tier1_a'
                            ? 'bg-amber-500/25 border-amber-400 text-amber-200 font-bold ring-1 ring-amber-400/40'
                            : 'bg-stone-950/50 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                        }`}
                      >
                        🌺 梯队A (前5)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!isAuditMode) onToggleAuditMode?.();
                          onSwitchAuditGroup?.('flowers_tier1_b');
                        }}
                        className={`py-1.5 px-2 rounded-lg border text-[11px] text-center cursor-pointer transition-all ${
                          auditGroup === 'flowers_tier1_b'
                            ? 'bg-amber-500/25 border-amber-400 text-amber-200 font-bold ring-1 ring-amber-400/40'
                            : 'bg-stone-950/50 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                        }`}
                      >
                        🪷 梯队B (后5)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!isAuditMode) onToggleAuditMode?.();
                          onSwitchAuditGroup?.('flowers_classic');
                        }}
                        className={`py-1.5 px-2 rounded-lg border text-[11px] text-center cursor-pointer transition-all ${
                          auditGroup === 'flowers_classic'
                            ? 'bg-amber-500/25 border-amber-400 text-amber-200 font-bold ring-1 ring-amber-400/40'
                            : 'bg-stone-950/50 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                        }`}
                      >
                        💮 经典5供名花
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!isAuditMode) onToggleAuditMode?.();
                          onSwitchAuditGroup?.('flowers_bouquets');
                        }}
                        className={`py-1.5 px-2 rounded-lg border text-[11px] text-center cursor-pointer transition-all col-span-2 sm:col-span-1 ${
                          auditGroup === 'flowers_bouquets'
                            ? 'bg-amber-500/25 border-amber-400 text-amber-200 font-bold ring-1 ring-amber-400/40'
                            : 'bg-stone-950/50 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                        }`}
                      >
                        💐 案前敬献花束
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (!isAuditMode) onToggleAuditMode?.();
                          onSwitchAuditGroup?.('new_unique');
                        }}
                        className={`py-1.5 px-2.5 rounded-lg border text-xs text-center cursor-pointer transition-all ${
                          auditGroup === 'new_unique'
                            ? 'bg-amber-500/25 border-amber-400 text-amber-200 font-bold ring-1 ring-amber-400/40'
                            : 'bg-stone-950/50 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                        }`}
                      >
                        ✨ 4款异形肌理瓶
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!isAuditMode) onToggleAuditMode?.();
                          onSwitchAuditGroup?.('designer_twist');
                        }}
                        className={`py-1.5 px-2.5 rounded-lg border text-xs text-center cursor-pointer transition-all ${
                          auditGroup === 'designer_twist'
                            ? 'bg-amber-500/25 border-amber-400 text-amber-200 font-bold ring-1 ring-amber-400/40'
                            : 'bg-stone-950/50 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                        }`}
                      >
                        🎨 8款现代折痕瓶
                      </button>
                    </div>
                  )}
                </div>

                {/* 3. 详细调节项：名花生命枯荣度 & 裸检模式 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
                  {/* 名花生命枯荣调节 */}
                  {auditCategory === 'flowers' && (
                    <div className="space-y-1.5 p-2 bg-stone-950/60 rounded-xl border border-stone-800">
                      <label className="text-[10px] text-amber-200/80 font-medium flex items-center justify-between">
                        <span>枯荣生命阶段</span>
                        <span className="text-rose-400 font-mono text-[10px]">
                          {Math.round((flowerDecayHealth ?? 1) * 100)}%
                        </span>
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            if (!isAuditMode) onToggleAuditMode?.();
                            onSelectFlowerDecayHealth?.(1.0);
                          }}
                          className={`py-1 px-1 rounded text-[10px] text-center cursor-pointer transition-all border ${
                            (flowerDecayHealth ?? 1) >= 0.9
                              ? 'bg-rose-950/60 border-rose-400 text-rose-200 font-bold'
                              : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          🌸 满盛
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!isAuditMode) onToggleAuditMode?.();
                            onSelectFlowerDecayHealth?.(0.55);
                          }}
                          className={`py-1 px-1 rounded text-[10px] text-center cursor-pointer transition-all border ${
                            (flowerDecayHealth ?? 1) > 0.3 && (flowerDecayHealth ?? 1) < 0.9
                              ? 'bg-amber-950/60 border-amber-400 text-amber-200 font-bold'
                              : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          🍂 微枯
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!isAuditMode) onToggleAuditMode?.();
                            onSelectFlowerDecayHealth?.(0.15);
                          }}
                          className={`py-1 px-1 rounded text-[10px] text-center cursor-pointer transition-all border ${
                            (flowerDecayHealth ?? 1) <= 0.3
                              ? 'bg-stone-800 border-stone-600 text-stone-300 font-bold'
                              : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          🥀 岁暮
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 插花景深 vs 裸检切换 */}
                  <div className={`space-y-1.5 p-2 bg-stone-950/60 rounded-xl border border-stone-800 ${
                    auditCategory === 'flowers' ? '' : 'sm:col-span-2'
                  }`}>
                    <label className="text-[10px] text-amber-200/80 font-medium">
                      瓶口景深与微观肌理
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        if (!isAuditMode) onToggleAuditMode?.();
                        onToggleAuditFlowers?.();
                      }}
                      className="w-full py-1.5 px-2 rounded-lg bg-amber-950/30 hover:bg-amber-900/40 text-amber-200 border border-amber-500/40 cursor-pointer text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>{auditWithFlowers ? '🌸 切换为净瓶裸检（看肌理）' : '🌸 恢复插花入瓶（看咬合）'}</span>
                    </button>
                  </div>
                </div>

                {/* 快捷操作条：触发落英 / 恢复常规五供 */}
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  {auditCategory === 'flowers' && onTriggerAuditPetals && (
                    <button
                      type="button"
                      onClick={() => {
                        onTriggerAuditPetals();
                      }}
                      className="text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>🍃 触发漫天落瓣动效</span>
                    </button>
                  )}
                  {isAuditMode && (
                    <button
                      type="button"
                      onClick={() => {
                        onToggleAuditMode?.();
                      }}
                      className="text-stone-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer ml-auto transition-colors"
                    >
                      <RotateCcw size={12} />
                      <span>一键退出审计 · 恢复常规五供</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 协议与立意公约说明入口 */}
        <div className="pt-2 flex items-center justify-between text-xs text-stone-400 border-t border-amber-500/20">
          <button
            type="button"
            onClick={() => {
              close();
              onOpenAgreement?.();
            }}
            className="flex items-center gap-1.5 text-amber-300/80 hover:text-amber-200 cursor-pointer transition-colors"
          >
            <ShieldCheck size={14} className="text-amber-400" />
            <span>《暖念服务协议、立意与收费声明》</span>
          </button>
          <span className="text-[10px] text-stone-500">v1.0.0 官方公约</span>
        </div>
      </div>

      {/* Pinned Bottom Confirm Bar */}
      <div className="flex items-center justify-between border-t border-amber-500/30 px-5 py-3 shrink-0 bg-[#1c1917]/95 relative z-10 backdrop-blur-xs">
        <span className="text-[11px] text-stone-400 font-serif">
          全部调节已实时生效 · 素心寄思
        </span>
        <button
          type="button"
          onClick={close}
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 active:scale-95 text-stone-950 font-bold text-xs shadow-lg border border-amber-400/60 transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Check size={14} />
          <span>完成确认</span>
        </button>
      </div>
    </div>
  );
};

export const LightingPanel = AmbiancePanel;
