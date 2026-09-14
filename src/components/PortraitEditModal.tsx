import React, { useState } from 'react';
import { MemorialInfo } from '../types';
import { Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface PortraitEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  info: MemorialInfo;
  onUpdateInfo: (updated: Partial<MemorialInfo>) => void;
}

export const PortraitEditModal: React.FC<PortraitEditModalProps> = ({
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
        className="w-full max-w-md bg-stone-50 rounded-2xl p-6 shadow-2xl border border-amber-200/80 text-stone-800 pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-amber-200/60 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-amber-600" />
            <h3 className="font-serif text-lg font-semibold text-stone-800">编辑纪念像容与寄语</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 text-lg leading-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1.5">选择预设像容或自定义照片</label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPhotoUrlInput(preset.url)}
                  className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all cursor-pointer ${
                    photoUrlInput === preset.url ? 'border-amber-600 shadow-md scale-105' : 'border-stone-200 hover:border-amber-300'
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
              className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">主标题 (如：暖念墙 / 永远怀念)</label>
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">副标题 (如：Warmth & Blessing)</label>
            <input
              type="text"
              value={subtitleInput}
              onChange={(e) => setSubtitleInput(e.target.value)}
              className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-3 border-t border-amber-200/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-200/60 text-xs transition-colors cursor-pointer"
          >
            取消
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-amber-50 font-medium text-xs shadow-md transition-colors cursor-pointer"
          >
            保存设置
          </button>
        </div>
      </div>
    </div>
  );
};
