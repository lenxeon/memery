/**
 * @file RelicCodexPanel.tsx
 * @description 典藏图鉴：按门类浏览全部物件的朝代、出处与典故，可检索。
 */
import { useDialogContext } from '../common/dialog';
import React, { useMemo, useState } from 'react';
import { BookOpen, Search, X } from 'lucide-react';
import { ChineseCornerOrnaments } from '../common/ChineseDecorations';
import { searchRelicLore } from '../../data/lore';
import { AUTHENTICITY_META, CATEGORY_LABEL } from '../../data/lore/types';
import type { LoreCategory } from '../../data/lore/types';
import { openRelicLore } from './openRelicLore';

const CATEGORY_TABS: { id: LoreCategory | 'all'; label: string }[] = [
  { id: 'all', label: '全部' },
  { id: 'flower', label: '供花' },
  { id: 'fruit', label: '供果' },
  { id: 'vessel', label: '礼器' },
  { id: 'pattern', label: '纹样' },
];

export const RelicCodexPanel: React.FC = () => {
  const { close } = useDialogContext();
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState<LoreCategory | 'all'>('all');

  const list = useMemo(() => {
    const matched = searchRelicLore(keyword);
    return category === 'all' ? matched : matched.filter((item) => item.category === category);
  }, [keyword, category]);

  return (
    <div
      className="w-full max-w-3xl max-h-[88vh] flex flex-col bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 rounded-3xl border border-amber-500/50 shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-stone-200 overflow-hidden relative ring-1 ring-amber-400/20"
      onClick={(e) => e.stopPropagation()}
    >
      <ChineseCornerOrnaments />

      {/* ── 头部 ── */}
      <div className="px-5 sm:px-6 pt-5 pb-3 border-b border-amber-500/25 shrink-0 relative z-10">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <BookOpen size={19} />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-amber-100 tracking-wide">物件典藏</h3>
              <p className="text-[11px] text-stone-400 mt-0.5">
                一花、一器、一果、一纹样，各记其朝代、出处与诗证
              </p>
            </div>
          </div>
          <button
            onClick={() => close()}
            className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-amber-200 hover:bg-stone-800 transition-colors"
            aria-label="关闭"
          >
            <X size={18} />
          </button>
        </div>

        {/* 检索 */}
        <div className="mt-3.5 flex items-center gap-2 px-3 py-2 rounded-xl border border-amber-500/25 bg-stone-950/70">
          <Search size={14} className="text-amber-400/70 shrink-0" />
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="搜名称、朝代或诗句，如「唐」「平安」"
            className="flex-1 bg-transparent text-sm text-stone-200 placeholder:text-stone-500 outline-none"
          />
        </div>

        {/* 门类 */}
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCategory(tab.id)}
              className={`px-3 py-1 rounded-full text-[11px] border transition-colors ${
                category === tab.id
                  ? 'bg-amber-500/25 border-amber-400/60 text-amber-100'
                  : 'bg-stone-900/70 border-stone-700/60 text-stone-400 hover:text-amber-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── 列表 ── */}
      <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 relative z-10">
        {list.length === 0 ? (
          <p className="text-center text-sm text-stone-500 py-10">未找到相关典藏</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {list.map((item) => {
              const auth = AUTHENTICITY_META[item.authenticity];
              return (
                <button
                  key={item.id}
                  onClick={() => openRelicLore(item.id)}
                  className="text-left p-3 rounded-2xl border border-amber-500/20 bg-stone-950/60 hover:bg-stone-900/80 hover:border-amber-400/50 transition-colors group"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-sm text-amber-100 font-semibold">{item.name}</span>
                    {item.poeticTitle && (
                      <span className="text-[10px] text-amber-400/80 truncate">{item.poeticTitle}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    <span className="text-[10px] text-stone-500">{CATEGORY_LABEL[item.category]}</span>
                    {item.dynasty && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-stone-800/80 text-stone-300">
                        {item.dynasty}
                      </span>
                    )}
                    <span
                      className="px-1.5 py-0.5 rounded text-[10px]"
                      style={{ color: auth.color, background: auth.bg }}
                    >
                      {auth.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1.5 line-clamp-2 leading-relaxed">{item.allusion}</p>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
