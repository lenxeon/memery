import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { FlowerType } from '../types';
import { Sparkles, Heart, Flower2, Trash2, Check } from 'lucide-react';

interface FlowerOption {
  id: FlowerType;
  name: string;
  desc: string;
  emoji: string;
  tag: string;
  accentColor: string;
}

interface FlowerPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddOfferedFlower: (flowerType: FlowerType) => void;
  onChangeVaseFlower: (side: 'left' | 'right' | 'both', flowerType: FlowerType) => void;
  leftVaseFlower?: FlowerType;
  rightVaseFlower?: FlowerType;
  offeredCount?: number;
  onClearOfferedFlowers?: () => void;
  onFillTenFlowers?: () => void;
}

export const FlowerPickerModal: React.FC<FlowerPickerModalProps> = ({
  isOpen,
  onClose,
  onAddOfferedFlower,
  onChangeVaseFlower,
  leftVaseFlower = 'peonies',
  rightVaseFlower = 'lilies',
  offeredCount = 0,
  onClearOfferedFlowers,
  onFillTenFlowers,
}) => {
  const [activeTab, setActiveTab] = useState<'offer' | 'vases'>('offer');
  const [selectedFlower, setSelectedFlower] = useState<FlowerType>('peonies');

  if (!isOpen) return null;

  const flowerOptions: FlowerOption[] = [
    {
      id: 'peonies',
      name: '粉白重瓣牡丹',
      desc: '富贵吉祥，温婉常伴，花开重瓣如锦',
      emoji: '🌸',
      tag: '典雅祥瑞',
      accentColor: '#f472b6',
    },
    {
      id: 'lilies',
      name: '纯净白东方百合',
      desc: '百年好合，圣洁高雅，馨香淡远',
      emoji: '🪷',
      tag: '原景标配',
      accentColor: '#86efac',
    },
    {
      id: 'lotus',
      name: '出尘清莲',
      desc: '清净无染，禅心常宁，并蒂含香',
      emoji: '🪷',
      tag: '禅意虔敬',
      accentColor: '#ec4899',
    },
    {
      id: 'chrysanthemum',
      name: '高洁白菊',
      desc: '淡泊寄思，长存心间，清气自洁',
      emoji: '🌼',
      tag: '追思怀念',
      accentColor: '#eab308',
    },
    {
      id: 'roses',
      name: '淡雅香槟玫瑰',
      desc: '深情永固，感恩相遇，芬芳隽永',
      emoji: '🌹',
      tag: '温馨敬意',
      accentColor: '#fb923c',
    },
  ];

  const handleOfferBouquet = (flowerId: FlowerType) => {
    sound.playBell(540, 2.5);
    onAddOfferedFlower(flowerId);
    onClose();
  };

  const handleChangeVase = (side: 'left' | 'right' | 'both', flowerId: FlowerType) => {
    sound.playWoodPlacement();
    sound.playBell(580, 2);
    onChangeVaseFlower(side, flowerId);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-[#fcfaf7] rounded-3xl p-5 sm:p-6 shadow-2xl border border-amber-200/90 text-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-200/70 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-100/80 flex items-center justify-center text-amber-700">
              <Flower2 size={18} />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-stone-900 leading-tight">
                供案敬花 · 芬芳常伴
              </h3>
              <p className="text-[11px] text-stone-500">
                可奉献鲜花置于案台正中，亦可定制左右瓷瓶中的插花
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 text-sm w-7 h-7 flex items-center justify-center rounded-full hover:bg-stone-200/60 cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tab Switching */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-amber-100/50 rounded-2xl mb-4 border border-amber-200/60 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('offer')}
            className={`py-2 px-3 rounded-xl font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'offer'
                ? 'bg-white text-amber-900 shadow-xs ring-1 ring-amber-200 font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles size={14} className="text-amber-600" />
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
                ? 'bg-white text-amber-900 shadow-xs ring-1 ring-amber-200 font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>🏺 更换花瓶插花</span>
          </button>
        </div>

        {/* TAB 1: 献花到供案桌面 */}
        {activeTab === 'offer' && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 px-1">
              <span className="text-xs text-stone-600 font-medium">
                点击花束即刻敬献，或一键布设花海：
              </span>
              <div className="flex items-center gap-2">
                {onFillTenFlowers && (
                  <button
                    type="button"
                    onClick={() => {
                      onFillTenFlowers();
                      onClose();
                    }}
                    className="text-[11px] text-amber-800 bg-amber-100/90 hover:bg-amber-200/90 border border-amber-300/80 px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer transition-all active:scale-95 font-medium shadow-2xs"
                    title="一键将供案布满十捧繁花锦簇"
                  >
                    <Sparkles size={12} className="text-amber-600" />
                    <span>一键布设十捧花海</span>
                  </button>
                )}
                {offeredCount > 0 && onClearOfferedFlowers && (
                  <button
                    type="button"
                    onClick={() => {
                      sound.playWoodPlacement();
                      onClearOfferedFlowers();
                    }}
                    className="text-[11px] text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer hover:underline"
                  >
                    <Trash2 size={12} />
                    <span>清空桌面</span>
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {flowerOptions.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => handleOfferBouquet(opt.id)}
                  className="flex items-center justify-between p-3 rounded-2xl border border-amber-200/60 bg-white hover:bg-amber-50/90 hover:border-amber-400 cursor-pointer transition-all active:scale-[0.98] group shadow-xs hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl drop-shadow-xs">{opt.emoji}</span>
                    <div>
                      <div className="font-medium text-stone-900 flex items-center gap-2 text-sm">
                        <span>{opt.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100/80 text-amber-900 font-normal">
                          {opt.tag}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{opt.desc}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl bg-amber-100/70 text-amber-900 font-medium group-hover:bg-amber-500 group-hover:text-white transition-all shadow-2xs">
                    <Heart size={13} className="group-hover:fill-white" />
                    <span>奉献案前</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: 更换左右花瓶插花 */}
        {activeTab === 'vases' && (
          <div className="space-y-3.5">
            <div className="bg-amber-50/80 rounded-2xl p-3 border border-amber-200/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-stone-600">当前瓶花状态：</span>
                <span className="font-medium text-stone-800">
                  左瓶 [{flowerOptions.find(f => f.id === leftVaseFlower)?.name}] · 
                  右瓶 [{flowerOptions.find(f => f.id === rightVaseFlower)?.name}]
                </span>
              </div>
            </div>

            <div className="text-xs text-stone-600 px-1 font-medium">
              选择花种并设置装瓶：
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
              {flowerOptions.map((opt) => {
                const isSelected = selectedFlower === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedFlower(opt.id)}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/90 ring-1 ring-amber-400'
                        : 'border-stone-200/80 bg-white hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{opt.emoji}</span>
                      <div>
                        <div className="text-xs font-semibold text-stone-800">{opt.name}</div>
                        <div className="text-[10px] text-stone-500">{opt.tag}</div>
                      </div>
                    </div>
                    {isSelected && <Check size={16} className="text-amber-700" />}
                  </div>
                );
              })}
            </div>

            {/* Application buttons */}
            <div className="border-t border-amber-200/70 pt-3 flex flex-wrap gap-2 justify-end">
              <button
                type="button"
                onClick={() => handleChangeVase('left', selectedFlower)}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-50 border border-amber-300 text-stone-700 hover:text-amber-900 text-xs font-medium cursor-pointer transition-all active:scale-95 shadow-2xs"
              >
                插至左花瓶
              </button>
              <button
                type="button"
                onClick={() => handleChangeVase('right', selectedFlower)}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-50 border border-amber-300 text-stone-700 hover:text-amber-900 text-xs font-medium cursor-pointer transition-all active:scale-95 shadow-2xs"
              >
                插至右花瓶
              </button>
              <button
                type="button"
                onClick={() => {
                  handleChangeVase('both', selectedFlower);
                  onClose();
                }}
                className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium cursor-pointer transition-all active:scale-95 shadow-xs flex items-center gap-1.5"
              >
                <Sparkles size={13} />
                <span>双瓶皆插此花</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs text-stone-500">
          <span>提示：供案上摆放的任何花卉捧束均可随时按住拖曳调整位置</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl hover:bg-stone-200/80 text-stone-700 text-xs cursor-pointer font-medium"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
};
