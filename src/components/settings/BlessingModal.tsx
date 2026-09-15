/**
 * @file BlessingModal.tsx
 * @description 祈福祈愿留言录入弹窗，支持发送祈福感言与心愿寄语。
 */
import React, { useState } from 'react';
import { sound } from '../../utils/audio';
import { Sparkles, Heart, Send } from 'lucide-react';

interface BlessingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitBlessing: (text: string) => void;
}

export const BlessingModal: React.FC<BlessingModalProps> = ({
  isOpen,
  onClose,
  onSubmitBlessing,
}) => {
  const [text, setText] = useState('');

  if (!isOpen) return null;

  const quickBlessings = [
    '愿您在远方安好，福泽常伴。',
    '岁序流转，思念绵长，祈愿常乐。',
    '平安喜乐，万事顺遂，常存感恩。',
    '心有明灯，照澈十方，清净无忧。',
  ];

  const handleSubmit = (blessingText: string) => {
    if (!blessingText.trim()) return;
    sound.playBell(440, 3.5);
    onSubmitBlessing(blessingText);
    setText('');
    onClose();
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
        <div className="flex items-center justify-between border-b border-amber-200/60 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-amber-600" />
            <h3 className="font-serif text-lg font-semibold text-stone-800">写下祈愿与心声</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 text-lg leading-none p-1 rounded-full hover:bg-stone-200/60"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-stone-600 mb-3">
          在此为珍视的人许下祝福或留下一段思念，颂钵清音与香火将长寄心意。
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="在此写下您的心愿、思念或问候..."
          rows={4}
          className="w-full px-3 py-2.5 bg-white rounded-xl border border-amber-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-stone-800 placeholder-stone-400 resize-none shadow-inner mb-3"
        />

        <div className="mb-4">
          <div className="text-[11px] text-stone-500 mb-1.5 flex items-center gap-1">
            <Heart size={12} className="text-amber-600" />
            <span>快速祈愿词：</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {quickBlessings.map((b, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setText(b)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white hover:bg-amber-100/70 border border-stone-200 hover:border-amber-400 text-stone-700 transition-colors text-left"
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-amber-200/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-200/60 text-xs transition-colors"
          >
            取消
          </button>
          <button
            type="button"
            disabled={!text.trim()}
            onClick={() => handleSubmit(text)}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-amber-50 font-medium text-xs shadow-md transition-colors cursor-pointer"
          >
            <Send size={13} />
            <span>呈献祈愿</span>
          </button>
        </div>
      </div>
    </div>
  );
};
