/**
 * @file FlowerPickerModal.tsx
 * @description 献花与花瓶形制定制挑选弹窗组件。
 * 支持：
 * 1. 【献花到供案桌面】：5 款清雅供花自由敬奉，案上拖拽摆放。
 * 2. 【更换花瓶与插花】：
 *    - 八款花瓶形制定制（含 4 款用户实拍参考陶艺/几何白瓷与 4 款经典东方名瓷）；
 *    - 五款名贵插花品种独立装瓶定制（左瓶/右瓶/成双对瓶）。
 */
import React, { useState } from 'react';
import { sound } from '../../utils/audio';
import { FlowerType } from '../../types';
import { Sparkles, Heart, Flower2, Trash2, Check, Sparkle } from 'lucide-react';
import { VaseStyle, VASE_STYLES, getVaseStyleMeta } from '../../pixi/assets/templates/flowers/vases';
import { FLOWER_REGISTRY } from '../../pixi/assets/templates/flowers';
import { FlowerPreview } from './FlowerPreview';
import { ChineseCornerOrnaments, CinnabarSealBadge } from '../common/ChineseDecorations';

export interface FlowerPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFlower?: FlowerType;
  onSelectFlower?: (flowerType: FlowerType) => void;
  onAddOfferedFlower?: (flowerType: FlowerType) => void;
  onChangeVaseFlower?: (side: 'left' | 'right', flowerType: FlowerType) => void;
  onChangeVaseStyle?: (side: 'left' | 'right', vaseStyle: VaseStyle) => void;
  leftVaseFlower?: FlowerType;
  rightVaseFlower?: FlowerType;
  leftVaseStyle?: VaseStyle;
  rightVaseStyle?: VaseStyle;
  offeredCount?: number;
  onClearOfferedFlowers?: () => void;
  onFillTenFlowers?: () => void;
}

export const FlowerPickerModal: React.FC<FlowerPickerModalProps> = ({
  isOpen,
  onClose,
  currentFlower = 'peonies',
  onSelectFlower,
  onAddOfferedFlower,
  onChangeVaseFlower,
  onChangeVaseStyle,
  leftVaseFlower = 'peonies',
  rightVaseFlower = 'lilies',
  leftVaseStyle = 'ribbed_fluted_white',
  rightVaseStyle = 'organic_twist_cream',
  offeredCount = 0,
  onClearOfferedFlowers,
  onFillTenFlowers,
}) => {
  const [activeTab, setActiveTab] = useState<'offer' | 'vases'>('offer');
  const [selectedOfferFlower, setSelectedOfferFlower] = useState<FlowerType>(currentFlower);
  const [selectedVaseSide, setSelectedVaseSide] = useState<'left' | 'right'>('left');
  const [selectedVaseStyle, setSelectedVaseStyle] = useState<VaseStyle>(leftVaseStyle);
  const [selectedFlowerType, setSelectedFlowerType] = useState<FlowerType>(leftVaseFlower);
  const [vaseSubTab, setVaseSubTab] = useState<'vases' | 'flowers'>('vases');

  React.useEffect(() => {
    if (currentFlower) {
      setSelectedOfferFlower(currentFlower);
    }
  }, [currentFlower, isOpen]);

  if (!isOpen) return null;

  const flowerOptions: {
    id: FlowerType;
    name: string;
    emoji: string;
    desc: string;
    tag: string;
  }[] = [
    {
      id: 'peonies',
      name: '重瓣粉牡丹',
      emoji: '🌺',
      desc: '雍容华贵，花大色艳，层叠烂漫，富贵长寿之意',
      tag: '富贵吉祥',
    },
    {
      id: 'lilies',
      name: '纯白东方百合',
      emoji: '🌸',
      desc: '纯洁出尘，幽香清远，瓣如玉脂，百年好合之愿',
      tag: '纯净圣洁',
    },
    {
      id: 'lotus',
      name: '出水芙蓉清莲',
      emoji: '🪷',
      desc: '出淤泥而不染，濯清涟而不妖，佛堂高洁清净',
      tag: '高洁清幽',
    },
    {
      id: 'chrysanthemum',
      name: '傲霜素白晚菊',
      emoji: '🌼',
      desc: '凌霜不凋，清气长存，素净庄严，寄托永久思念',
      tag: '长青追思',
    },
    {
      id: 'roses',
      name: '柔和香槟玫瑰',
      emoji: '🌹',
      desc: '温暖恬淡，心心相印，温润优雅，感恩常驻心间',
      tag: '深情永固',
    },
    {
      id: 'plum_blossoms',
      name: '傲霜冷香白梅',
      emoji: '💮',
      desc: '枯瘦挺拔木质细枝，单层五瓣小碟紧贴骨节，金丝满心，青蕾点缀，清瘦孤高',
      tag: '清瘦孤高',
    },
    {
      id: 'sunflowers',
      name: '金色灿烂向阳',
      emoji: '🌻',
      desc: '硕大金黄辐射瓣配焦糖深褐大圆花盘，生生不息',
      tag: '光明生机',
    },
    {
      id: 'carnations',
      name: '慈孝粉康乃馨',
      emoji: '💐',
      desc: '锯齿波浪折边重瓣配青杯花萼，温情感恩，寸草春晖',
      tag: '温情慈孝',
    },
    {
      id: 'calla_lilies',
      name: '圣洁白马蹄莲',
      emoji: '🤍',
      desc: '流线卷折佛焰苞配金黄肉穗，肃穆高洁，现代悼念名品',
      tag: '高洁肃穆',
    },
    {
      id: 'tulips',
      name: '典雅娇红郁金香',
      emoji: '🌷',
      desc: '圆润高脚酒杯形倒卵花杯配挺拔抱茎宽叶，庄重挺立',
      tag: '典雅庄重',
    },
    {
      id: 'narcissus',
      name: '凌波金盏银台水仙',
      emoji: '⭐',
      desc: '六瓣平展素白雪瓣环绕金黄茶盏副花冠，岁朝清供名卉',
      tag: '金盏银台',
    },
    {
      id: 'lily_of_valley',
      name: '如意晶莹白铃兰',
      emoji: '🔔',
      desc: '优雅拱曲花葶倒挂一串串洁白圆润小风铃，纯白如意',
      tag: '福音归来',
    },
    {
      id: 'orchids',
      name: '幽谷飘逸蝴蝶兰',
      emoji: '🦋',
      desc: '展翅飞蝶般双大翼瓣配金斑小唇瓣，空谷幽兰君子之德',
      tag: '君子空灵',
    },
    {
      id: 'hydrangeas',
      name: '团圆冰蓝粉紫绣球',
      emoji: '💠',
      desc: '数十朵十字四瓣小花聚成饱满圆滚大绣球，圆满美满',
      tag: '圆满平安',
    },
    {
      id: 'daisies',
      name: '清纯雪白小雏菊',
      emoji: '🌼',
      desc: '辐射雪白细长花瓣配凸起金黄圆纽扣花心，纯真怀念',
      tag: '纯真深念',
    },
  ];

  const handleOfferBouquet = (flowerType: FlowerType) => {
    sound.playWindChimes();
    onAddOfferedFlower?.(flowerType);
    onClose();
  };

  const handleApplyVaseConfig = () => {
    sound.playBell(600, 2);
    if (vaseSubTab === 'vases') {
      onChangeVaseStyle?.(selectedVaseSide, selectedVaseStyle);
    } else {
      onChangeVaseFlower?.(selectedVaseSide, selectedFlowerType);
    }
  };

  const leftVaseMeta = getVaseStyleMeta(leftVaseStyle as VaseStyle);
  const rightVaseMeta = getVaseStyleMeta(rightVaseStyle as VaseStyle);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-[#1c1917]/95 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-amber-500/50 text-stone-200 relative overflow-hidden ring-1 ring-amber-400/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 四角古风回纹角花装饰 */}
        <ChineseCornerOrnaments className="text-amber-400/70" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-500/30 pb-3 mb-3.5 relative z-10">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
              <Flower2 size={18} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-base sm:text-lg font-semibold text-amber-200 leading-tight">
                  供案敬花 · 花器雅韵
                </h3>
                <CinnabarSealBadge text="雅供" />
              </div>
              <p className="text-[11px] text-amber-200/60 truncate mt-0.5">
                敬奉鲜花置于案台，或定制花瓶形制与瓶内插花
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-amber-400/60 hover:text-amber-200 text-sm w-7 h-7 flex items-center justify-center rounded-full hover:bg-amber-500/20 cursor-pointer transition-colors shrink-0"
          >
            ✕
          </button>
        </div>

        {/* 主 Tab 切换 */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-stone-950/80 rounded-2xl mb-3.5 border border-amber-500/30 text-xs relative z-10">
          <button
            type="button"
            onClick={() => setActiveTab('offer')}
            className={`py-2 px-3 rounded-xl font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'offer'
                ? 'bg-gradient-to-r from-amber-600/40 to-amber-500/30 text-amber-200 border border-amber-400/50 shadow-xs font-semibold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Sparkles size={14} className="text-amber-400" />
            <span>献花到供案桌面</span>
            {offeredCount > 0 && (
              <span className="bg-amber-600 text-white text-[10px] px-1.5 py-0.2 rounded-full">
                {offeredCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('vases')}
            className={`py-2 px-3 rounded-xl font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'vases'
                ? 'bg-gradient-to-r from-amber-600/40 to-amber-500/30 text-amber-200 border border-amber-400/50 shadow-xs font-semibold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <span>🏺 更换花瓶与插花</span>
          </button>
        </div>

        {/* TAB 1: 献花到供案桌面 */}
        {activeTab === 'offer' && (
          <div className="relative z-10 space-y-3">
            {/* ── 当前即将敬献供花实物预览大卡 (Live Showcase for Currently Selected Flower) ── */}
            {(() => {
              const currentOpt = flowerOptions.find((f) => f.id === selectedOfferFlower) || flowerOptions[0];
              return (
                <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-stone-950/95 via-stone-900/90 to-amber-950/40 border border-amber-400/50 ring-1 ring-amber-400/20 shadow-[0_8px_24px_rgba(0,0,0,0.6)] flex items-center justify-between gap-3 relative overflow-hidden">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-b from-stone-900 to-stone-950 border border-amber-400/50 shadow-[0_0_16px_rgba(245,158,11,0.25)] flex items-center justify-center shrink-0 overflow-hidden relative group">
                      <FlowerPreview flowerType={selectedOfferFlower} size={62} />
                      <div className="absolute inset-0 bg-radial from-transparent to-black/30 pointer-events-none" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] text-amber-300 font-serif tracking-wider">即将敬奉</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30 font-normal">
                          {currentOpt.tag}
                        </span>
                      </div>
                      <div className="font-serif font-bold text-amber-100 text-sm sm:text-base mt-0.5 truncate">
                        {currentOpt.name}
                      </div>
                      <div className="text-[11px] text-stone-400 mt-0.5 line-clamp-1 leading-relaxed">
                        {currentOpt.desc}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOfferBouquet(selectedOfferFlower)}
                    className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs sm:text-sm cursor-pointer transition-all active:scale-95 shadow-[0_4px_16px_rgba(245,158,11,0.35)] flex items-center gap-1.5 shrink-0 whitespace-nowrap border border-amber-300"
                    title="立即将当前所选供花敬奉于供案前"
                  >
                    <Heart size={14} className="fill-stone-950" />
                    <span>奉于案前</span>
                  </button>
                </div>
              );
            })()}

            <div className="flex items-center justify-between gap-2 px-1 text-xs">
              <span className="text-amber-200/80 font-medium">
                挑选花品（点击查看实景小样）：
              </span>
              <div className="flex items-center gap-2 shrink-0">
                {onFillTenFlowers && (
                  <button
                    type="button"
                    onClick={() => {
                      onFillTenFlowers();
                      onClose();
                    }}
                    className="text-[11px] text-amber-200 bg-amber-600/25 hover:bg-amber-600/40 border border-amber-400/50 px-2.5 py-1 rounded-full flex items-center gap-1 cursor-pointer transition-all active:scale-95 font-medium shadow-xs whitespace-nowrap"
                    title="一键布设十捧花海"
                  >
                    <Sparkles size={11} className="text-amber-400" />
                    <span>布设花海 (10)</span>
                  </button>
                )}
                {offeredCount > 0 && onClearOfferedFlowers && (
                  <button
                    type="button"
                    onClick={() => {
                      sound.playWoodPlacement();
                      onClearOfferedFlowers();
                    }}
                    className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer hover:underline whitespace-nowrap"
                  >
                    <Trash2 size={11} />
                    <span>清空案花</span>
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-2 max-h-[260px] overflow-y-auto custom-scrollbar pr-1">
              {flowerOptions.map((opt) => {
                const isSelected = selectedOfferFlower === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => {
                      setSelectedOfferFlower(opt.id);
                      onSelectFlower?.(opt.id);
                      sound.playBell(580, 1.5);
                    }}
                    className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border cursor-pointer transition-all active:scale-[0.98] group shadow-xs gap-2 ${
                      isSelected
                        ? 'border-amber-400 bg-amber-950/40 ring-1 ring-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.15)] text-amber-100'
                        : 'border-amber-500/25 bg-stone-950/60 hover:bg-stone-900/80 hover:border-amber-400/60 text-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-stone-900/90 border border-amber-400/30 flex items-center justify-center shrink-0 overflow-hidden shadow-xs group-hover:border-amber-400/60 transition-all">
                        <FlowerPreview flowerType={opt.id} size={36} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-amber-100 flex items-center gap-2 text-sm leading-snug">
                          <span className="truncate">{opt.name}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30 font-normal shrink-0 whitespace-nowrap">
                            {opt.tag}
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-400 mt-0.5 truncate">{opt.desc}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isSelected && <Check size={16} className="text-amber-400 mr-0.5" />}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOfferBouquet(opt.id);
                        }}
                        className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl bg-amber-600/30 text-amber-300 border border-amber-500/40 font-medium group-hover:bg-amber-500 group-hover:text-stone-950 transition-all shadow-xs whitespace-nowrap active:scale-95"
                        title="直接敬献此花"
                      >
                        <Heart size={13} className="group-hover:fill-stone-950" />
                        <span>敬献</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: 更换左右花瓶形制与插花 */}
        {activeTab === 'vases' && (
          <div className="space-y-3 relative z-10">
            {/* 当前花器与插花状态卡片 */}
            <div className="bg-stone-950/70 rounded-2xl p-2.5 border border-amber-500/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 min-w-0 truncate">
                <span className="text-amber-200/60 shrink-0">当前供案：</span>
                <span className="font-medium text-amber-200 truncate">
                  左 [{leftVaseMeta.name} · {flowerOptions.find(f => f.id === leftVaseFlower)?.name}]
                  <span className="text-amber-500 mx-1.5">|</span>
                  右 [{rightVaseMeta.name} · {flowerOptions.find(f => f.id === rightVaseFlower)?.name}]
                </span>
              </div>
            </div>

            {/* 子 Tab：花器形制 vs 插花品种 */}
            <div className="flex items-center justify-between px-1">
              <div className="inline-flex p-0.5 bg-stone-950/80 rounded-xl border border-amber-500/25 text-xs">
                <button
                  type="button"
                  onClick={() => setVaseSubTab('vases')}
                  className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1 ${
                    vaseSubTab === 'vases'
                      ? 'bg-gradient-to-r from-amber-600/40 to-amber-500/30 text-amber-200 border border-amber-400/50 shadow-xs font-semibold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <span>🏺 花器形制</span>
                  <span className="text-[10px] px-1 rounded-full bg-amber-500/25 text-amber-300">12款</span>
                </button>
                <button
                  type="button"
                  onClick={() => setVaseSubTab('flowers')}
                  className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1 ${
                    vaseSubTab === 'flowers'
                      ? 'bg-gradient-to-r from-amber-600/40 to-amber-500/30 text-amber-200 border border-amber-400/50 shadow-xs font-semibold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <span>🌸 插花品种</span>
                  <span className="text-[10px] px-1 rounded-full bg-stone-800 text-stone-300">15款</span>
                </button>
              </div>
              <span className="text-[11px] text-amber-200/60">
                {vaseSubTab === 'vases' ? '点击花器设为左右案器' : '点击花种设置瓶内插花'}
              </span>
            </div>

            {/* ── 子模式 1: 花瓶形制选择器 (12 款现代设计与奇特手作花器) ── */}
            {vaseSubTab === 'vases' && (
              <div className="space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
                  {VASE_STYLES.map((v) => {
                    const isSelected = selectedVaseStyle === v.id;
                    return (
                      <div
                        key={v.id}
                        onClick={() => setSelectedVaseStyle(v.id)}
                        className={`p-2.5 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-2 ${
                          isSelected
                            ? 'border-amber-400 bg-amber-950/40 ring-1 ring-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.15)] text-amber-100'
                            : 'border-amber-500/20 bg-stone-950/60 hover:border-amber-400/50 hover:bg-stone-900/80 text-stone-300'
                        }`}
                      >
                        <div className="flex items-start gap-2.5 min-w-0">
                          <span className="text-2xl shrink-0 mt-0.5">{v.iconText}</span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap leading-snug">
                              <span className="text-xs font-semibold text-amber-200">{v.name}</span>
                              <span className="text-[9px] px-1 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30 shrink-0 font-normal">
                                {v.sourceLabel}
                              </span>
                            </div>
                            <div className="text-[10px] text-stone-400 mt-0.5 line-clamp-2 leading-relaxed">
                              {v.desc}
                            </div>
                          </div>
                        </div>
                        {isSelected && <Check size={16} className="text-amber-400 shrink-0 mt-1" />}
                      </div>
                    );
                  })}
                </div>

                {/* 应用花瓶形制操作按钮 */}
                <div className="border-t border-amber-500/30 pt-2.5 flex flex-wrap items-center justify-between gap-2">
                  <div className="text-[11px] text-stone-400">
                    当前选定：<span className="font-medium text-amber-300">{getVaseStyleMeta(selectedVaseStyle).name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => onChangeVaseStyle?.('left', selectedVaseStyle)}
                      className="px-2.5 py-1.5 rounded-xl bg-stone-950 hover:bg-amber-950/50 border border-amber-500/40 text-amber-200 text-xs font-medium cursor-pointer transition-all active:scale-95 shadow-xs whitespace-nowrap"
                    >
                      设为左瓶
                    </button>
                    <button
                      type="button"
                      onClick={() => onChangeVaseStyle?.('right', selectedVaseStyle)}
                      className="px-2.5 py-1.5 rounded-xl bg-stone-950 hover:bg-amber-950/50 border border-amber-500/40 text-amber-200 text-xs font-medium cursor-pointer transition-all active:scale-95 shadow-xs whitespace-nowrap"
                    >
                      设为右瓶
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onChangeVaseStyle?.('left', selectedVaseStyle);
                        onChangeVaseStyle?.('right', selectedVaseStyle);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs cursor-pointer transition-all active:scale-95 shadow-md flex items-center gap-1 whitespace-nowrap border border-amber-300"
                    >
                      <Sparkles size={12} />
                      <span>双瓶皆换此形</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── 子模式 2: 插花品种选择器 (15 款一眼可辨传统名卉) ── */}
            {vaseSubTab === 'flowers' && (
              <div className="space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
                  {flowerOptions.map((opt) => {
                    const isSelected = selectedFlowerType === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setSelectedFlowerType(opt.id)}
                        className={`p-2.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'border-amber-400 bg-amber-950/40 ring-1 ring-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.15)] text-amber-100'
                            : 'border-amber-500/20 bg-stone-950/60 hover:border-amber-400/50 hover:bg-stone-900/80 text-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-stone-900/90 border border-amber-400/30 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                            <FlowerPreview flowerType={opt.id} size={34} />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-amber-200 truncate">{opt.name}</div>
                            <div className="text-[10px] text-stone-400 truncate">{opt.desc}</div>
                          </div>
                        </div>
                        {isSelected && <Check size={16} className="text-amber-400 shrink-0 ml-1" />}
                      </div>
                    );
                  })}
                </div>

                {/* 插花装瓶操作按钮 */}
                <div className="border-t border-amber-500/30 pt-2.5 flex flex-wrap items-center justify-between gap-2">
                  <div className="text-[11px] text-stone-400">
                    当前选定花种：<span className="font-medium text-amber-300">{flowerOptions.find(f => f.id === selectedFlowerType)?.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => onChangeVaseFlower?.('left', selectedFlowerType)}
                      className="px-2.5 py-1.5 rounded-xl bg-stone-950 hover:bg-amber-950/50 border border-amber-500/40 text-amber-200 text-xs font-medium cursor-pointer transition-all active:scale-95 shadow-xs whitespace-nowrap"
                    >
                      插至左瓶
                    </button>
                    <button
                      type="button"
                      onClick={() => onChangeVaseFlower?.('right', selectedFlowerType)}
                      className="px-2.5 py-1.5 rounded-xl bg-stone-950 hover:bg-amber-950/50 border border-amber-500/40 text-amber-200 text-xs font-medium cursor-pointer transition-all active:scale-95 shadow-xs whitespace-nowrap"
                    >
                      插至右瓶
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onChangeVaseFlower?.('left', selectedFlowerType);
                        onChangeVaseFlower?.('right', selectedFlowerType);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs cursor-pointer transition-all active:scale-95 shadow-md flex items-center gap-1 whitespace-nowrap border border-amber-300"
                    >
                      <Sparkles size={12} />
                      <span>双瓶皆插此花</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-3.5 pt-3 border-t border-amber-500/30 flex items-center justify-between gap-3 text-xs text-stone-400 relative z-10">
          <span className="text-[11px] text-amber-200/50 truncate min-w-0">
            提示：案上花瓶与花束均可按住自由拖拽摆放
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 border border-amber-500/50 text-xs font-medium cursor-pointer shrink-0 whitespace-nowrap transition-colors"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
};
