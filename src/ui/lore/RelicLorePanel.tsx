/**
 * @file RelicLorePanel.tsx
 * @description 物件典故卡：一花一器一果一纹样，皆列朝代、出处、典故与诗证。
 *
 * 卡片如实标注出处性质（典籍可考 / 民俗相传 / 近现代），
 * 无可靠诗证者留空，不硬凑；同名异物者以「辨误」说明。
 */
import { useDialogContext } from '../common/dialog';
import React, { useState } from 'react';
import { ScrollText, Quote, Flame, Info, ArrowRight, X } from 'lucide-react';
import { ChineseCornerOrnaments, CinnabarSealBadge } from '../common/ChineseDecorations';
import { getRelicLore } from '../../data/lore';
import { AUTHENTICITY_META, CATEGORY_LABEL } from '../../data/lore/types';

export interface RelicLorePanelProps {
  /** 档案 id（花材 / 果品 / 礼器 / 纹样） */
  loreId: string;
}

export const RelicLorePanel: React.FC<RelicLorePanelProps> = ({ loreId }) => {
  const { close } = useDialogContext();
  const [currentId, setCurrentId] = useState(loreId);
  const lore = getRelicLore(currentId);

  if (!lore) {
    return (
      <div
        className="w-full max-w-lg bg-gradient-to-b from-stone-900 to-stone-950 rounded-3xl border border-amber-500/40 p-8 text-center text-stone-400"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-sm">此物尚未录入典藏。</p>
        <button
          onClick={() => close()}
          className="mt-5 px-5 py-2 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-sm transition-colors"
        >
          知道了
        </button>
      </div>
    );
  }

  const auth = AUTHENTICITY_META[lore.authenticity];

  return (
    <div
      className="w-full max-w-xl max-h-[88vh] flex flex-col bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 rounded-3xl border border-amber-500/50 shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-stone-200 overflow-hidden relative ring-1 ring-amber-400/20"
      onClick={(e) => e.stopPropagation()}
    >
      <ChineseCornerOrnaments />

      {/* ── 头部：名与朝代 ── */}
      <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-amber-500/25 shrink-0 relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-100 tracking-wide">
                {lore.name}
              </h3>
              {lore.poeticTitle && <CinnabarSealBadge text={lore.poeticTitle} />}
            </div>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-md text-[11px] border border-amber-500/30 bg-amber-500/10 text-amber-300/90">
                {CATEGORY_LABEL[lore.category]}
              </span>
              {lore.dynasty && (
                <span className="px-2 py-0.5 rounded-md text-[11px] border border-stone-600/50 bg-stone-800/70 text-stone-300">
                  {lore.dynasty}
                </span>
              )}
              <span
                className="px-2 py-0.5 rounded-md text-[11px] border"
                style={{ color: auth.color, background: auth.bg, borderColor: `${auth.color}55` }}
                title={auth.hint}
              >
                {auth.label}
              </span>
            </div>
          </div>

          <button
            onClick={() => close()}
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-amber-200 hover:bg-stone-800 transition-colors"
            aria-label="关闭"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* ── 正文 ── */}
      <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-4 relative z-10">
        {lore.origin && (
          <div className="flex items-start gap-2.5 text-sm">
            <ScrollText size={16} className="text-amber-400/80 mt-0.5 shrink-0" />
            <div>
              <span className="text-stone-500 text-xs">出处　</span>
              <span className="text-stone-300">{lore.origin}</span>
            </div>
          </div>
        )}

        <p className="text-[15px] leading-7 text-stone-300/95 text-justify">{lore.allusion}</p>

        {lore.poem && (
          <div className="relative rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] px-4 py-3.5">
            <Quote size={14} className="absolute top-3 right-3 text-amber-400/30" />
            <p className="font-serif text-[15px] sm:text-base leading-7 text-amber-100/95 text-center">
              {lore.poem.text}
            </p>
            <p className="mt-2 text-center text-[11px] text-amber-300/70">
              —— {lore.poem.author}《{lore.poem.title}》
            </p>
          </div>
        )}

        {lore.ritual && (
          <div className="flex items-start gap-2.5 text-sm">
            <Flame size={16} className="text-amber-400/80 mt-0.5 shrink-0" />
            <div>
              <span className="text-stone-500 text-xs">礼俗　</span>
              <span className="text-stone-300">{lore.ritual}</span>
            </div>
          </div>
        )}

        {lore.note && (
          <div className="flex items-start gap-2.5 rounded-xl border border-sky-500/25 bg-sky-500/[0.07] px-3.5 py-3">
            <Info size={15} className="text-sky-300/80 mt-0.5 shrink-0" />
            <p className="text-[13px] leading-6 text-sky-100/85">{lore.note}</p>
          </div>
        )}

        {lore.related && lore.related.length > 0 && (
          <div className="pt-1">
            <p className="text-xs text-stone-500 mb-2">相关典藏</p>
            <div className="flex flex-wrap gap-2">
              {lore.related
                .filter((id) => getRelicLore(id))
                .map((id) => {
                  const rel = getRelicLore(id)!;
                  return (
                    <button
                      key={id}
                      onClick={() => setCurrentId(id)}
                      className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/25 bg-stone-800/60 hover:bg-stone-800 text-xs text-amber-200/90 transition-colors"
                    >
                      {rel.name}
                      <ArrowRight size={12} className="text-amber-400/50 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {/* ── 底栏 ── */}
      <div className="px-5 sm:px-6 py-3.5 border-t border-amber-500/25 shrink-0 flex items-center justify-between relative z-10">
        <p className="text-[11px] text-stone-500">
          出处性质：{auth.label} · {auth.hint}
        </p>
        <button
          onClick={() => close()}
          className="px-5 py-2 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-sm transition-colors"
        >
          收起
        </button>
      </div>
    </div>
  );
};
