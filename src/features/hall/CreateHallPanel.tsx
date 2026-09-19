/**
 * @file CreateHallPanel.tsx
 * @description 筹建新纪念堂弹窗，支持录入先人姓名、称谓关系、堂号、生卒年与遗像相片。
 */
import { useDialogContext } from '../../ui/dialog';
import React, { useState } from 'react';
import { X, Sparkles, Plus, Image as ImageIcon } from 'lucide-react';
import { MemorialHallItem } from '../../types';
import { sound } from '../../utils/audio';
import { ChineseCornerOrnaments, CinnabarSealBadge } from '../../ui/common/ChineseDecorations';

export interface CreateHallPanelProps {
  onCreate: (newHall: MemorialHallItem) => void;
}

const RELATION_TAGS = ['祖母', '祖父', '慈母', '慈父', '外祖母', '外祖父', '恩师', '挚友', '灵宠', '先贤'];

const PHOTO_PRESETS = [
  {
    name: '慈祥长辈',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: '温和祖父',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: '静心清莲',
    url: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: '安详菩提',
    url: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: '灵动爱宠',
    url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80',
  },
];

export const CreateHallPanel: React.FC<CreateHallPanelProps> = ({
  onCreate,
}) => {
  // 关闭动作由通用弹窗系统注入，本面板只处理自身内容
  const { close } = useDialogContext();
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('祖母');
  const [title, setTitle] = useState('慈颜常驻 · 永沐春风');
  const [birthDate, setBirthDate] = useState('1938 - 2021');
  const [photoUrl, setPhotoUrl] = useState(PHOTO_PRESETS[0].url);
  const [customPhotoInput, setCustomPhotoInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const handleSelectRelation = (rel: string) => {
    sound.playWoodPlacement();
    setRelationship(rel);
    // 自动给出优雅的堂号建议
    if (rel === '慈父' || rel === '祖父' || rel === '外祖父') {
      setTitle('父爱如山 · 德泽流芳');
    } else if (rel === '慈母' || rel === '祖母' || rel === '外祖母') {
      setTitle('慈颜常驻 · 永沐春风');
    } else if (rel === '灵宠') {
      setTitle('忠灵永伴 · 暖念不忘');
      setPhotoUrl(PHOTO_PRESETS[4].url);
    } else if (rel === '恩师') {
      setTitle('师表千秋 · 桃李芬芳');
    } else {
      setTitle('清德长留 · 懿范永存');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('请填写被纪念者姓名或称呼');
      return;
    }

    sound.playBell(528, 2.5);

    const newHall: MemorialHallItem = {
      id: `hall_${Date.now()}`,
      name: name.trim(),
      title: title.trim() || '慈容永在 · 暖念常存',
      relationship,
      birthDate: birthDate.trim() || '生卒年月',
      photoUrl: customPhotoInput.trim() || photoUrl,
      guardianDays: 1,
      blessingCount: 1,
      isOwner: true,
      createdAt: Date.now(),
    };

    onCreate(newHall);
    close();
  };

  return (
    <div 
      className="relative w-full max-w-md rounded-3xl border border-amber-500/40 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.9)] overflow-hidden"
      style={{
        backgroundColor: 'color-mix(in oklab, #1c191763 80%, transparent)'
      }}
    >
      <ChineseCornerOrnaments className="text-amber-400/40" />

      {/* 顶部标题与关闭 */}
      <div className="flex items-center justify-between pb-3 border-b border-amber-500/20 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-300">
            <Sparkles size={16} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-serif text-lg font-bold text-amber-100">
                筹建纪念堂
              </h3>
              <CinnabarSealBadge text="立堂" />
            </div>
            <p className="text-[11px] text-amber-200/70 font-serif">
              立一室心香，为至亲筑起永恒温暖的净土
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            sound.playWoodPlacement();
            close();
          }}
          className="p-1.5 rounded-full text-stone-400 hover:text-stone-100 hover:bg-stone-800/60 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>
      </div>

      {errorMsg && (
        <div className="mb-3 p-2 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
          {errorMsg}
        </div>
      )}

      {/* 核心表单 */}
      <form onSubmit={handleSubmit} className="space-y-3.5 text-xs text-stone-200">
        {/* 关系选择标签 */}
        <div>
          <label className="block text-[11px] text-stone-400 font-serif mb-1.5">
            纪念关系称谓
          </label>
          <div className="flex flex-wrap gap-1.5">
            {RELATION_TAGS.map((rel) => (
              <button
                key={rel}
                type="button"
                onClick={() => handleSelectRelation(rel)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] transition-all cursor-pointer ${
                  relationship === rel
                    ? 'bg-amber-600/90 border-amber-400 text-stone-950 font-bold shadow-xs'
                    : 'bg-stone-900/80 border-stone-700/70 text-stone-300 hover:border-amber-500/50'
                }`}
              >
                {rel}
              </button>
            ))}
          </div>
        </div>

        {/* 姓名与生卒 */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[11px] text-stone-400 font-serif mb-1">
              先人姓名 / 称呼 *
            </label>
            <input
              type="text"
              placeholder="例如：王秀英"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrorMsg('');
              }}
              className="w-full bg-stone-950/70 border border-amber-500/30 focus:border-amber-400 rounded-xl px-3 py-2 text-stone-100 placeholder:text-stone-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] text-stone-400 font-serif mb-1">
              生卒年代
            </label>
            <input
              type="text"
              placeholder="例如：1938 - 2021"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full bg-stone-950/70 border border-amber-500/30 focus:border-amber-400 rounded-xl px-3 py-2 text-stone-100 placeholder:text-stone-500 outline-none"
            />
          </div>
        </div>

        {/* 堂号匾额 */}
        <div>
          <label className="block text-[11px] text-stone-400 font-serif mb-1">
            堂号追思匾额
          </label>
          <input
            type="text"
            placeholder="例如：慈颜常驻 · 永沐春风"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-stone-950/70 border border-amber-500/30 focus:border-amber-400 rounded-xl px-3 py-2 text-amber-200 placeholder:text-stone-500 outline-none font-serif tracking-wider"
          />
        </div>

        {/* 遗像 / 象征照选取 */}
        <div>
          <label className="block text-[11px] text-stone-400 font-serif mb-1.5 flex items-center justify-between">
            <span>先人遗像 / 寄托象征相片</span>
            <span className="text-[10px] text-stone-500">可点选预置或自定义</span>
          </label>
          <div className="grid grid-cols-5 gap-2 mb-2">
            {PHOTO_PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => {
                  sound.playWoodPlacement();
                  setPhotoUrl(preset.url);
                  setCustomPhotoInput('');
                }}
                className={`relative rounded-xl overflow-hidden aspect-square border transition-all cursor-pointer ${
                  photoUrl === preset.url && !customPhotoInput
                    ? 'border-amber-400 ring-2 ring-amber-400/50 scale-105'
                    : 'border-stone-700/80 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 bg-stone-950/70 border border-amber-500/30 rounded-xl px-2.5 py-1.5 focus-within:border-amber-400">
            <ImageIcon size={13} className="text-stone-500 shrink-0" />
            <input
              type="text"
              placeholder="或填入自定义相片图片 URL"
              value={customPhotoInput}
              onChange={(e) => setCustomPhotoInput(e.target.value)}
              className="w-full bg-transparent text-[11px] text-stone-200 placeholder:text-stone-500 outline-none"
            />
          </div>
        </div>

        {/* 提交按钮 */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold font-serif shadow-lg border border-amber-300/60 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Plus size={15} />
            <span>落成堂轩 · 开启永恒守护</span>
          </button>
        </div>
      </form>
    </div>
  );
};
