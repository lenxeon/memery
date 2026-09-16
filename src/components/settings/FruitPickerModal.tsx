/**
 * @file FruitPickerModal.tsx
 * @description 供案献果与摆放果盘挑选弹窗组件，对标献花功能，
 * 支持向案台敬献新果盘（苹果、蜜柑、仙桃），以及自由定制左/右主盘果品。
 */
import React, { useState } from 'react';
import { sound } from '../../utils/audio';
import { FruitType } from '../../types';
import { Sparkles, Trash2, Check, Apple, Citrus, RefreshCw } from 'lucide-react';

export interface FruitOption {
  id: FruitType;
  name: string;
  poeticName: string;
  meaning: string;
  desc: string;
  iconText: string;
  tag: string;
  accentColor: string;
  borderColor: string;
}

interface FruitPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddOfferedFruit: (fruitType: FruitType) => void;
  onChangeMainFruit: (side: 'left' | 'right' | 'both', fruitType: FruitType) => void;
  leftFruitType?: FruitType;
  rightFruitType?: FruitType;
  offeredCount?: number;
  onClearOfferedFruits?: () => void;
}

export const FRUIT_OPTIONS: FruitOption[] = [
  {
    id: 'apples',
    name: '红富士苹果',
    poeticName: '岁岁平安',
    meaning: '平平安安 · 福寿安康',
    desc: '果形圆润硕大，红白交织丝纹，天然果蜡温润漫光，祈愿岁岁平安、万事顺遂。',
    iconText: '🍎',
    tag: '平安祥瑞',
    accentColor: '#dc2626',
    borderColor: '#fca5a5',
  },
  {
    id: 'oranges',
    name: '吉祥金蜜柑',
    poeticName: '大吉大利',
    meaning: '吉星高照 · 金玉满堂',
    desc: '饱满金黄扁圆，细腻磨砂油胞肌理，带翠绿星芒花萼与双生嫩叶，象征大吉大利、财禄丰饶。',
    iconText: '🍊',
    tag: '吉庆祥和',
    accentColor: '#ea580c',
    borderColor: '#fdba74',
  },
  {
    id: 'peaches',
    name: '福寿并蒂仙桃',
    poeticName: '福寿绵长',
    meaning: '寿比南山 · 长乐永康',
    desc: '羊脂奶白透粉，桃尖胭脂浓艳，天然桃缝如诗如画，配以苍翠仙桃寿叶，祈愿福寿延绵。',
    iconText: '🍑',
    tag: '福寿尊崇',
    accentColor: '#db2777',
    borderColor: '#fbcfe8',
  },
  {
    id: 'persimmons',
    name: '如意熟丹柿',
    poeticName: '事事如意',
    meaning: '事事顺遂 · 万象更新',
    desc: '四方圆润敦实，朱红熟透，带经典四裂如意柿蒂木质花萼与薄霜微光，祈愿万事称心、如意遂愿。',
    iconText: '🍊',
    tag: '顺遂如意',
    accentColor: '#ea580c',
    borderColor: '#fed7aa',
  },
  {
    id: 'citrons',
    name: '禅意佛手柑',
    poeticName: '福寿双全',
    meaning: '佛光普照 · 福寿延年',
    desc: '案头清供之首，金指舒展纤长如持佛印，蜜蜡通透，清香怡人，象征神佛护佑、福禄双全。',
    iconText: '🪷',
    tag: '案头清供',
    accentColor: '#ca8a04',
    borderColor: '#fef08a',
  },
  {
    id: 'grapes',
    name: '阳光玫瑰青提',
    poeticName: '春华秋实',
    meaning: '生机盎然 · 繁盛常青',
    desc: '整串垂卧于白玉盘沿，如翡翠碧玉晶莹透光，如沐晨曦日光，象征生机勃勃、福泽延绵。',
    iconText: '🍇',
    tag: '青翠生机',
    accentColor: '#65a30d',
    borderColor: '#d9f99d',
  },
  {
    id: 'pomelos',
    name: '黄金蜜柚',
    poeticName: '保佑平安',
    meaning: '大柚所为 · 福柚绵长',
    desc: '文旦梨形丰厚硕大，温润蜜蜡金黄，顶缀鲜翠柚叶，祈愿神明护佑、保佑平安。',
    iconText: '🍈',
    tag: '福佑平安',
    accentColor: '#ca8a04',
    borderColor: '#fef08a',
  },
  {
    id: 'longans',
    name: '富贵龙眼',
    poeticName: '富贵团圆',
    meaning: '龙腾祥瑞 · 阖家圆满',
    desc: '珠圆玉润攒叠成丘，温润金褐木质壳泽，半剥凝脂白肉晶莹，象征阖家团圆、百子千孙。',
    iconText: '🌰',
    tag: '团圆吉庆',
    accentColor: '#d97706',
    borderColor: '#fde68a',
  },
  {
    id: 'bananas',
    name: '招财金蕉',
    poeticName: '招财进宝',
    meaning: '金条纳福 · 步步高升',
    desc: '一整梳黄金香蕉形如金条元宝，微弯五棱分明，点染成熟芝麻斑，祈愿财禄丰厚、步步高升。',
    iconText: '🍌',
    tag: '招财纳福',
    accentColor: '#eab308',
    borderColor: '#fde047',
  },
  {
    id: 'kumquats',
    name: '翡翠青桔',
    poeticName: '青云直上',
    meaning: '大吉大利 · 四季长青',
    desc: '小巧玲珑青翠欲滴，错落叠盘，星芒小蒂点缀翠绿小叶，象征仕途顺达、青云直上。',
    iconText: '🟢',
    tag: '青云直上',
    accentColor: '#16a34a',
    borderColor: '#bbf7d0',
  },
  {
    id: 'dragonfruits',
    name: '红运火龙果',
    poeticName: '鸿运当头',
    meaning: '红红火火 · 龙翔祥瑞',
    desc: '椭圆丰硕果身，龙鳞萼片层层翻卷升腾，浓艳胭脂红与黄绿反卷相映，象征鸿运当头、红红火火。',
    iconText: '🌺',
    tag: '鸿运当头',
    accentColor: '#e11d48',
    borderColor: '#fecdd3',
  },
  {
    id: 'cucumbers',
    name: '翠玉黄瓜',
    poeticName: '清心顺遂',
    meaning: '顺遂如意 · 飞黄腾达',
    desc: '修长墨翠，顶花带刺，灵动卷须轻绕，带朝露清甜之气，象征清心自在、飞黄腾达。',
    iconText: '🥒',
    tag: '清雅顺遂',
    accentColor: '#16a34a',
    borderColor: '#bbf7d0',
  },
  {
    id: 'watermelons',
    name: '盛夏西瓜',
    poeticName: '硕果红运',
    meaning: '红红火火 · 硕果累累',
    desc: '碧玉瓜皮条纹如波，鲜切月牙红瓤沙甜多汁，黑籽点缀，象征阖家硕果累累、日子红红火火。',
    iconText: '🍉',
    tag: '硕果红运',
    accentColor: '#ef4444',
    borderColor: '#fca5a5',
  },
  {
    id: 'coconuts',
    name: '南国椰子',
    poeticName: '清吉长寿',
    meaning: '爷孙同福 · 清吉长寿',
    desc: '翡翠青椰配金丝老椰，半剖雪白凝脂椰肉盛天然甘冽天泉，象征福泽绵长、清吉平安。',
    iconText: '🥥',
    tag: '清吉福禄',
    accentColor: '#0d9488',
    borderColor: '#99f6e4',
  },
  {
    id: 'plums',
    name: '金玉蜂糖李',
    poeticName: '甜甜蜜蜜',
    meaning: '甜甜蜜蜜 · 硕果丰盈',
    desc: '贵州镇宁名品蜂糖李，如凝脂蜂蜜般金黄透亮，蜜香馥郁，向阳微晕暖杏红，祈愿生活甜如蜜、阖家美满。',
    iconText: '🍯',
    tag: '蜜润金玉',
    accentColor: '#eab308',
    borderColor: '#fef08a',
  },
  {
    id: 'mangosteens',
    name: '果后山竹',
    poeticName: '冰清玉洁',
    meaning: '水果之后 · 清纯圆满',
    desc: '深沉茄紫果皮油润，厚萼冠顶，半剖露五瓣雪白如蒜瓣之鲜嫩果肉，甘美纯洁，象征圆满吉庆。',
    iconText: '🍇',
    tag: '清雅圆满',
    accentColor: '#701a75',
    borderColor: '#f5d0fe',
  },
  {
    id: 'pineapples',
    name: '祥瑞凤梨',
    poeticName: '好运旺来',
    meaning: '好运旺来 · 财源滚滚',
    desc: '金黄宝塔果身满布六角菱形果目，顶戴威仪凤尾翠冠，闽南民俗奉为「旺来」，祈愿财运亨通。',
    iconText: '🍍',
    tag: '好运旺来',
    accentColor: '#eab308',
    borderColor: '#fef08a',
  },
  {
    id: 'pears',
    name: '金秋秋月梨',
    poeticName: '花好月圆',
    meaning: '花好月圆 · 清润安康',
    desc: '名品秋月梨，硕大圆润宛如中秋朗月，皮薄金黄缀细密金沙果点，汁盈如蜜，象征阖家团圆、清润福宁。',
    iconText: '🍐',
    tag: '秋月圆满',
    accentColor: '#d97706',
    borderColor: '#fde68a',
  },
];


export const FruitPickerModal: React.FC<FruitPickerModalProps> = ({
  isOpen,
  onClose,
  onAddOfferedFruit,
  onChangeMainFruit,
  leftFruitType = 'apples',
  rightFruitType = 'oranges',
  offeredCount = 0,
  onClearOfferedFruits,
}) => {
  const [activeTab, setActiveTab] = useState<'offer' | 'customize'>('offer');
  const [selectedFruit, setSelectedFruit] = useState<FruitType>('apples');

  if (!isOpen) return null;

  const handleOfferFruit = (fruitId: FruitType) => {
    sound.playBell(540, 2.5);
    onAddOfferedFruit(fruitId);
    onClose();
  };

  const handleCustomMain = (side: 'left' | 'right' | 'both', fruitId: FruitType) => {
    sound.playWoodPlacement();
    sound.playBell(580, 2);
    onChangeMainFruit(side, fruitId);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-[#fcfaf7] rounded-3xl p-5 sm:p-6 shadow-2xl border border-amber-200/90 text-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-200/70 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-100/90 flex items-center justify-center text-amber-700 shadow-xs">
              <Apple size={18} className="text-amber-800" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-stone-900 leading-tight">
                供案敬果 · 四时吉祥
              </h3>
              <p className="text-[11px] text-stone-500">
                可敬献时令高足果盘摆于案上，亦可分别定制案台左右主果盘
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
            <span>敬献果盘到案台</span>
            {offeredCount > 0 && (
              <span className="bg-amber-600 text-white text-[10px] px-1.5 py-0.2 rounded-full">
                {offeredCount} 盘
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('customize')}
            className={`py-2 px-3 rounded-xl font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'customize'
                ? 'bg-white text-amber-900 shadow-xs ring-1 ring-amber-200 font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <RefreshCw size={13} className="text-amber-700" />
            <span>定制左右主果盘</span>
          </button>
        </div>

        {/* TAB 1: 敬献新果盘到案台 */}
        {activeTab === 'offer' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[58vh] overflow-y-auto pr-1">
              {FRUIT_OPTIONS.map((opt) => {
                const isSelected = selectedFruit === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedFruit(opt.id)}
                    className={`flex flex-col p-2.5 sm:p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? 'bg-amber-50/90 border-amber-500 ring-2 ring-amber-400/40 shadow-xs'
                        : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-600'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-xl select-none">{opt.iconText}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-medium">
                        {opt.tag}
                      </span>
                    </div>

                    <div className="font-serif font-bold text-sm text-stone-900 leading-snug">
                      {opt.name}
                    </div>
                    <div className="text-[11px] text-amber-800 font-medium mt-0.5 leading-snug truncate">
                      {opt.meaning}
                    </div>

                    {isSelected && (
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-600 ring-2 ring-amber-200" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-amber-200/50">
              {offeredCount > 0 && onClearOfferedFruits ? (
                <button
                  type="button"
                  onClick={onClearOfferedFruits}
                  className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 cursor-pointer px-2 py-1 rounded-lg hover:bg-rose-50 transition-colors"
                >
                  <Trash2 size={13} />
                  <span>清空新增果盘 ({offeredCount})</span>
                </button>
              ) : (
                <div className="text-[11px] text-stone-400">
                  敬献后可在案上自由拖拽摆放
                </div>
              )}

              <button
                type="button"
                onClick={() => handleOfferFruit(selectedFruit)}
                className="ml-auto px-5 py-2.5 rounded-2xl bg-amber-700 hover:bg-amber-800 active:scale-95 text-amber-50 font-medium text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles size={14} />
                <span>敬奉此果盘上案</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: 定制案台左右主果盘 */}
        {activeTab === 'customize' && (
          <div className="space-y-4">
            <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200/60 text-xs text-stone-600 leading-relaxed">
              供案左右常设对称四时高足果盘，您可将左盘与右盘按意愿更换为不同祥瑞果品，左右呼应，阴阳调和。
            </div>

            {/* 左右盘当前设置与选择 */}
            <div className="grid grid-cols-2 gap-3">
              {/* 左侧果盘 */}
              <div className="p-3 bg-white rounded-2xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-serif font-bold text-stone-800">左侧主果盘</span>
                  <span className="text-[10px] text-amber-800 font-medium px-1.5 py-0.5 rounded bg-amber-100">
                    {FRUIT_OPTIONS.find((f) => f.id === leftFruitType)?.name}
                  </span>
                </div>
                <div className="space-y-1 pt-1">
                  {FRUIT_OPTIONS.map((f) => {
                    const isLeftSelected = leftFruitType === f.id;
                    return (
                      <button
                        key={`left_${f.id}`}
                        type="button"
                        onClick={() => handleCustomMain('left', f.id)}
                        className={`w-full flex items-center justify-between p-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                          isLeftSelected
                            ? 'bg-amber-100/90 text-amber-950 font-medium ring-1 ring-amber-400/60'
                            : 'hover:bg-stone-50 text-stone-600'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span>{f.iconText}</span>
                          <span>{f.name}</span>
                        </span>
                        {isLeftSelected && <Check size={12} className="text-amber-800" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 右侧果盘 */}
              <div className="p-3 bg-white rounded-2xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-serif font-bold text-stone-800">右侧主果盘</span>
                  <span className="text-[10px] text-amber-800 font-medium px-1.5 py-0.5 rounded bg-amber-100">
                    {FRUIT_OPTIONS.find((f) => f.id === rightFruitType)?.name}
                  </span>
                </div>
                <div className="space-y-1 pt-1">
                  {FRUIT_OPTIONS.map((f) => {
                    const isRightSelected = rightFruitType === f.id;
                    return (
                      <button
                        key={`right_${f.id}`}
                        type="button"
                        onClick={() => handleCustomMain('right', f.id)}
                        className={`w-full flex items-center justify-between p-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                          isRightSelected
                            ? 'bg-amber-100/90 text-amber-950 font-medium ring-1 ring-amber-400/60'
                            : 'hover:bg-stone-50 text-stone-600'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span>{f.iconText}</span>
                          <span>{f.name}</span>
                        </span>
                        {isRightSelected && <Check size={12} className="text-amber-800" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 一键左右成双配对 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-amber-200/50">
              <span className="text-[11px] text-stone-500 shrink-0">一键设置双盘并供：</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {FRUIT_OPTIONS.map((f) => (
                  <button
                    key={`both_${f.id}`}
                    type="button"
                    onClick={() => handleCustomMain('both', f.id)}
                    className="px-2.5 py-1 rounded-xl bg-stone-100 hover:bg-amber-100/80 text-stone-700 hover:text-amber-950 text-xs font-medium cursor-pointer transition-colors flex items-center gap-1"
                  >
                    <span>{f.iconText}</span>
                    <span>双盘{f.name.replace('红富士', '').replace('吉祥金', '').replace('福寿并蒂', '').replace('如意熟', '').replace('禅意', '').replace('阳光玫瑰', '').replace('黄金', '').replace('富贵', '').replace('招财金', '香').replace('翡翠', '').replace('红运', '').replace('翠玉', '').replace('盛夏', '').replace('南国', '').replace('金玉', '').replace('胭脂', '').replace('果后', '').replace('祥瑞', '').replace('金秋', '').replace('金晖', '')}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
