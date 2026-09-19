/**
 * @file MemorialEditModal.tsx
 * @description 纪念先人信息编辑弹窗，支持修改姓名、生卒日期与头像照片。
 */
import React, { useState } from 'react';
import { MemorialInfo } from '../../../types';
import { Sparkles } from 'lucide-react';
import { sound } from '../../../utils/audio';

export interface MemorialEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  info: MemorialInfo;
  onUpdateInfo: (updated: Partial<MemorialInfo>) => void;
}

export type PortraitEditModalProps = MemorialEditModalProps;

export const MemorialEditModal: React.FC<MemorialEditModalProps> = ({
  isOpen,
  onClose,
  info,
  onUpdateInfo,
}) => {
  const [titleInput, setTitleInput] = useState(info.title);
  const [subtitleInput, setSubtitleInput] = useState(info.subtitle);
  const [photoUrlInput, setPhotoUrlInput] = useState(info.photoUrl);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateInfo({
      title: titleInput,
      subtitle: subtitleInput,
      photoUrl: photoUrlInput,
    });
    sound.playBell(580, 2);
    onClose();
  };

  const presets = [
    {
      name: '慈祥长辈 (原图奶奶)',
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
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md max-h-[86vh] overflow-y-auto bg-[#1c1917]/95 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-amber-500/50 ring-1 ring-amber-400/20 text-stone-200 pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-amber-500/30 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
              <Sparkles size={16} />
            </div>
            <h3 className="font-serif text-lg font-semibold text-amber-100">编辑纪念像容与寄语</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-amber-200 text-lg leading-none p-1.5 rounded-full hover:bg-stone-800/80 cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-medium text-amber-300/80 mb-1.5">选择预设像容或自定义照片</label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPhotoUrlInput(preset.url)}
                  className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all cursor-pointer ${
                    photoUrlInput === preset.url ? 'border-amber-400 ring-2 ring-amber-400/40 shadow-md scale-105' : 'border-stone-800 hover:border-amber-500/50'
                  }`}
                >
                  <img src={preset.url} alt={preset.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <input
              type="text"
              value={photoUrlInput}
              onChange={(e) => setPhotoUrlInput(e.target.value)}
              placeholder="或粘贴网络图片 URL (https://...)"
              className="w-full px-3.5 py-2 bg-stone-950/80 rounded-xl border border-amber-500/30 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-amber-100 placeholder-stone-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-amber-300/80 mb-1">主标题 (如：暖念墙 / 永远怀念)</label>
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              className="w-full px-3.5 py-2 bg-stone-950/80 rounded-xl border border-amber-500/30 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-amber-100 placeholder-stone-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-amber-300/80 mb-1">副标题 (如：Warmth & Blessing)</label>
            <input
              type="text"
              value={subtitleInput}
              onChange={(e) => setSubtitleInput(e.target.value)}
              className="w-full px-3.5 py-2 bg-stone-950/80 rounded-xl border border-amber-500/30 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-amber-100 placeholder-stone-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2.5 mt-6 pt-3 border-t border-amber-500/30">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-stone-400 hover:text-stone-200 hover:bg-stone-800/60 text-xs transition-colors cursor-pointer"
          >
            取消
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-medium text-xs shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all cursor-pointer active:scale-95"
          >
            保存并应用
          </button>
        </div>
      </div>
    </div>
  );
};

export const PortraitEditModal = MemorialEditModal;
