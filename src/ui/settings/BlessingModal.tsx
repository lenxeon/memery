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
        className="w-full max-w-md bg-[#1c1917]/95 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-amber-500/50 ring-1 ring-amber-400/20 text-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-amber-500/30 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
              <Sparkles size={16} />
            </div>
            <h3 className="font-serif text-lg font-semibold text-amber-100">写下祈愿与心声</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-amber-200 text-lg leading-none p-1.5 rounded-full hover:bg-stone-800/80 cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-stone-400 mb-3 leading-relaxed">
          在此为珍视的人许下祝福或留下一段思念，清幽磬音与香火烛光将长寄心意。
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="在此写下您的心愿、思念或问候..."
          rows={4}
          className="w-full px-3.5 py-2.5 bg-stone-950/80 rounded-xl border border-amber-500/30 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-amber-100 placeholder-stone-500 resize-none shadow-inner mb-3"
        />

        <div className="mb-4">
          <div className="text-[11px] text-amber-400/80 mb-1.5 flex items-center gap-1">
            <Heart size={12} className="text-amber-400" />
            <span>快速祈愿词：</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {quickBlessings.map((b, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setText(b)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-stone-900/80 hover:bg-amber-950/50 border border-amber-500/25 hover:border-amber-400/60 text-stone-300 hover:text-amber-200 transition-all cursor-pointer text-left"
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2.5 pt-3 border-t border-amber-500/30">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-stone-400 hover:text-stone-200 hover:bg-stone-800/60 text-xs transition-colors cursor-pointer"
          >
            取消
          </button>
          <button
            type="button"
            disabled={!text.trim()}
            onClick={() => handleSubmit(text)}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 disabled:opacity-40 text-stone-950 font-medium text-xs shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all cursor-pointer active:scale-95"
          >
            <Send size={13} />
            <span>呈献祈愿</span>
          </button>
        </div>
      </div>
    </div>
  );
};
