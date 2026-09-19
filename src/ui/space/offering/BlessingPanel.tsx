/**
 * @file BlessingPanel.tsx
 * @description 祈福祈愿留言内容（纯内容组件）。
 * 遮罩、面板、关闭与动画由通用弹窗系统托管，本组件只关心祈愿录入本身。
 */
import React, { useState } from 'react';
import { sound } from '../../../utils/audio';
import { Heart, Send } from 'lucide-react';
import { useDialogContext } from '../../common/dialog';

export interface BlessingPanelProps {
  onSubmitBlessing: (text: string) => void;
}

export const BlessingPanel: React.FC<BlessingPanelProps> = ({ onSubmitBlessing }) => {
  const [text, setText] = useState('');
  // 关闭动作由弹窗宿主注入，组件自身不感知挂载与卸载
  const { close } = useDialogContext();

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
    close();
  };

  return (
    <div className="p-5 sm:p-6">
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
          onClick={() => close()}
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
  );
};
