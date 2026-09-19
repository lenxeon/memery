/**
 * @file HallDirectoryPanel.tsx
 * @description 《暖念》堂轩名录（纪念馆列表）组件。
 * 支持：
 * 1. 【我创建的】与【我瞻仰过的】双Tab切换；
 * 2. 零纪念堂时的温馨空状态引导（大按钮引导创建首座纪念馆）；
 * 3. 纪念馆卡片式展示（堂号、遗像、关系、生卒年、守护天数、香火数）；
 * 4. 一键【进入案台】无缝切换当前供奉堂号；
 * 5. 顶层【＋ 筹建新堂】入口。
 */
import { useDialogContext } from '../../ui/dialog';
import React, { useState } from 'react';
import {
  X,
  Plus,
  Compass,
  Sparkles,
  ArrowRight,
  Share2,
  Calendar,
  Flame,
  Check,
  Edit3
} from 'lucide-react';
import { MemorialHallItem } from '../../types';
import { sound } from '../../utils/audio';
import { ChineseCornerOrnaments, CinnabarSealBadge } from '../../ui/common/ChineseDecorations';

export interface HallDirectoryPanelProps {
  halls: MemorialHallItem[];
  currentHallId: string;
  onSelectHall: (hall: MemorialHallItem) => void;
  onOpenCreate: () => void;
  onEditHall?: (hall: MemorialHallItem) => void;
  onClearHalls?: () => void;
  onLoadSampleHalls?: () => void;
}

export const HallDirectoryPanel: React.FC<HallDirectoryPanelProps> = ({
  halls,
  currentHallId,
  onSelectHall,
  onOpenCreate,
  onEditHall,
  onClearHalls,
  onLoadSampleHalls,
}) => {
  // 关闭动作由通用弹窗系统注入，本面板只处理自身内容
  const { close } = useDialogContext();
  const [activeTab, setActiveTab] = useState<'created' | 'visited'>('created');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const createdHalls = halls.filter((h) => h.isOwner);
  const visitedHalls = halls.filter((h) => !h.isOwner);

  const handleShare = (e: React.MouseEvent, hall: MemorialHallItem) => {
    e.stopPropagation();
    sound.playWoodPlacement();
    const shareText = `【暖念】邀您共聚《${hall.title}》为先人${hall.name}敬香祈福。`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
    }
    setCopiedId(hall.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div 
      className="relative w-full max-w-2xl max-h-[88vh] flex flex-col rounded-3xl border border-amber-500/40 shadow-[0_24px_70px_rgba(0,0,0,0.9)] overflow-hidden"
      style={{
        backgroundColor: 'color-mix(in oklab, #1c191763 80%, transparent)'
      }}
    >
      <ChineseCornerOrnaments className="text-amber-400/40" />

      {/* ── 1. 顶部标题栏 ── */}
      <div className="flex items-center justify-between px-5 sm:px-6 pt-5 pb-3.5 border-b border-amber-500/20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-[0_0_16px_rgba(245,158,11,0.2)]">
            <Compass size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 tracking-wider">
                堂轩名录
              </h2>
              <CinnabarSealBadge text="家庙" />
            </div>
            <p className="text-xs text-amber-200/70 font-serif mt-0.5">
              一室一净土 · 一人一归宿 · 珍藏至亲永恒温情
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* 顶栏快速新建按钮 */}
          {createdHalls.length > 0 && activeTab === 'created' && (
            <button
              type="button"
              onClick={() => {
                sound.playWoodPlacement();
                onOpenCreate();
              }}
              className="px-3 py-1.5 rounded-xl bg-amber-600/90 hover:bg-amber-500 text-stone-950 font-serif font-bold text-xs shadow-xs border border-amber-400/70 transition-all cursor-pointer flex items-center gap-1"
            >
              <Plus size={14} />
              <span className="hidden sm:inline">筹建新堂</span>
              <span className="sm:hidden">新建</span>
            </button>
          )}

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
      </div>

      {/* ── 2. 双通道 Tab 切换 ── */}
      <div className="px-5 sm:px-6 pt-3 pb-2 shrink-0">
        <div className="grid grid-cols-2 gap-2 p-1 bg-stone-950/70 rounded-2xl border border-amber-500/25 text-xs font-serif">
          <button
            type="button"
            onClick={() => {
              sound.playWoodPlacement();
              setActiveTab('created');
            }}
            className={`py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'created'
                ? 'bg-amber-600/90 text-stone-950 font-bold shadow-xs border border-amber-400/60'
                : 'text-stone-400 hover:text-amber-200'
            }`}
          >
            <span>我创建的</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeTab === 'created' ? 'bg-amber-950/40 text-amber-200' : 'bg-stone-800 text-stone-400'
            }`}>
              {createdHalls.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playWoodPlacement();
              setActiveTab('visited');
            }}
            className={`py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'visited'
                ? 'bg-amber-600/90 text-stone-950 font-bold shadow-xs border border-amber-400/60'
                : 'text-stone-400 hover:text-amber-200'
            }`}
          >
            <span>我瞻仰过的</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeTab === 'visited' ? 'bg-amber-950/40 text-amber-200' : 'bg-stone-800 text-stone-400'
            }`}>
              {visitedHalls.length}
            </span>
          </button>
        </div>
      </div>

      {/* ── 3. 核心列表与空状态展示区 ── */}
      <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-3 space-y-3">
        {/* A. 【我创建的】展示分支 */}
        {activeTab === 'created' && (
          <>
            {createdHalls.length === 0 ? (
              /* ── 空状态：温馨引导创建首座纪念堂 ── */
              <div className="py-8 sm:py-12 px-4 text-center flex flex-col items-center justify-center animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-3xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-[0_0_30px_rgba(245,158,11,0.25)] mb-4">
                  <Sparkles size={28} className="animate-pulse" />
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-amber-100 mb-1.5">
                  您尚未建立纪念堂
                </h3>

                <p className="text-xs sm:text-sm text-amber-200/70 font-serif max-w-sm mx-auto leading-relaxed mb-6">
                  立一室心香，寄万般思念。<br />
                  为挚爱亲人筑一方永恒温暖的净土，随时献花敬香，静享温情。
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playBell(528, 2);
                      onOpenCreate();
                    }}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 active:scale-[0.98] text-stone-950 font-serif font-bold text-sm shadow-[0_8px_25px_rgba(245,158,11,0.35)] border border-amber-300/80 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Plus size={18} />
                    <span>筹建我的首座纪念堂</span>
                    <ArrowRight size={16} />
                  </button>
                  {onLoadSampleHalls && (
                    <button
                      type="button"
                      onClick={() => {
                        sound.playWoodPlacement();
                        onLoadSampleHalls();
                      }}
                      className="px-4 py-2.5 rounded-2xl bg-stone-900/80 hover:bg-stone-800 text-amber-200/80 hover:text-amber-200 border border-amber-500/30 text-xs font-serif transition-all cursor-pointer"
                    >
                      载入示例纪念堂
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-amber-500/15 text-[11px] text-stone-400 font-serif max-w-sm">
                  <div>🪷 专属永续案台</div>
                  <div>🕯️ 亲友同祭祈福</div>
                  <div>📜 珍藏生平相片</div>
                </div>
              </div>
            ) : (
              /* ── 实体列表：展示已创建的纪念堂 ── */
              <div className="space-y-3">
                {createdHalls.map((hall) => {
                  const isCurrent = hall.id === currentHallId;
                  return (
                    <div
                      key={hall.id}
                      onClick={() => {
                        sound.playWoodPlacement();
                        onSelectHall(hall);
                        close();
                      }}
                      className={`group relative p-4 rounded-2xl border transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-amber-950/40 border-amber-400/80 ring-1 ring-amber-400/40 shadow-[0_8px_25px_rgba(245,158,11,0.2)]'
                          : 'bg-stone-950/60 border-amber-500/25 hover:border-amber-400/50 hover:bg-stone-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* 遗像相框 */}
                        <div className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-amber-400/60 shadow-md">
                          <img
                            src={hall.photoUrl}
                            alt={hall.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {isCurrent && (
                            <div className="absolute inset-0 bg-amber-500/20 ring-2 ring-amber-400 rounded-full" />
                          )}
                        </div>

                        {/* 堂号与先人信息 */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h4 className="font-serif font-bold text-stone-100 text-sm sm:text-base truncate group-hover:text-amber-200 transition-colors">
                              {hall.title}
                            </h4>
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[10.5px] font-serif shrink-0">
                              {hall.relationship}
                            </span>
                            {isCurrent && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-serif font-bold shrink-0">
                                当前案前
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3 text-xs text-stone-400 font-serif flex-wrap">
                            <span className="text-stone-200 font-semibold">{hall.name}</span>
                            {hall.birthDate && (
                              <span className="flex items-center gap-1 text-[11px] text-stone-400">
                                <Calendar size={11} className="text-stone-500" />
                                {hall.birthDate}
                              </span>
                            )}
                            <span className="flex items-center gap-1 text-[11px] text-amber-300/80">
                              <Flame size={11} className="text-amber-400" />
                              已守护 {hall.guardianDays} 天 · 香火 {hall.blessingCount} 次
                            </span>
                          </div>
                        </div>

                        {/* 右侧操作按钮 */}
                        <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                          {onEditHall && (
                            <button
                              type="button"
                              title="修缮资料"
                              onClick={() => {
                                sound.playWoodPlacement();
                                onEditHall(hall);
                              }}
                              className="p-2 rounded-xl text-stone-400 hover:text-amber-200 hover:bg-stone-800/60 transition-colors cursor-pointer"
                            >
                              <Edit3 size={15} />
                            </button>
                          )}

                          <button
                            type="button"
                            title="邀请亲友共祭"
                            onClick={(e) => handleShare(e, hall)}
                            className="p-2 rounded-xl text-stone-400 hover:text-amber-200 hover:bg-stone-800/60 transition-colors cursor-pointer"
                          >
                            {copiedId === hall.id ? (
                              <Check size={15} className="text-emerald-400" />
                            ) : (
                              <Share2 size={15} />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              sound.playBell(580, 2);
                              onSelectHall(hall);
                              close();
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-stone-800/80 text-amber-300/90 border border-amber-500/30 cursor-default'
                                : 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 shadow-xs'
                            }`}
                          >
                            {isCurrent ? '案前祭奉中' : '进入案台'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* B. 【我瞻仰过的】展示分支 */}
        {activeTab === 'visited' && (
          <>
            {visitedHalls.length === 0 ? (
              /* ── 空状态：暂无瞻仰记录 ── */
              <div className="py-8 sm:py-12 px-4 text-center flex flex-col items-center justify-center animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-2xl bg-stone-800/50 border border-stone-700/60 flex items-center justify-center text-stone-400 mb-3">
                  <Compass size={24} />
                </div>
                <h4 className="font-serif text-base font-bold text-stone-200 mb-1">
                  暂无瞻仰足迹
                </h4>
                <p className="text-xs text-stone-400 font-serif max-w-xs mx-auto leading-relaxed">
                  亲友分享纪念堂链接后，您前往献花、敬香的温情足迹将在此悉心珍藏。
                </p>
              </div>
            ) : (
              /* ── 实体列表：展示曾经瞻仰过的亲友纪念堂 ── */
              <div className="space-y-3">
                {visitedHalls.map((hall) => {
                  const isCurrent = hall.id === currentHallId;
                  return (
                    <div
                      key={hall.id}
                      onClick={() => {
                        sound.playWoodPlacement();
                        onSelectHall(hall);
                        close();
                      }}
                      className={`group relative p-4 rounded-2xl border transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-amber-950/40 border-amber-400/80 ring-1 ring-amber-400/40 shadow-[0_8px_25px_rgba(245,158,11,0.2)]'
                          : 'bg-stone-950/60 border-amber-500/25 hover:border-amber-400/50 hover:bg-stone-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="shrink-0 w-14 h-14 rounded-full overflow-hidden border-2 border-stone-600 group-hover:border-amber-400/60 transition-colors">
                          <img src={hall.photoUrl} alt={hall.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h4 className="font-serif font-bold text-stone-100 text-sm truncate group-hover:text-amber-200">
                              {hall.title}
                            </h4>
                            <span className="px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 text-[10px] font-serif">
                              {hall.relationship}
                            </span>
                            {hall.creatorName && (
                              <span className="text-[10.5px] text-stone-400 font-serif">
                                ({hall.creatorName})
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3 text-xs text-stone-400 font-serif">
                            <span className="text-stone-200">{hall.name}</span>
                            <span className="text-[11px] text-amber-300/75">
                              累计寄思祈福 {hall.blessingCount} 次
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            sound.playBell(580, 2);
                            onSelectHall(hall);
                            close();
                          }}
                          className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-amber-600 hover:text-stone-950 text-amber-200 border border-amber-500/30 text-xs font-serif font-bold transition-all cursor-pointer shrink-0"
                        >
                          再次前往
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── 4. 底部微型注脚 ── */}
      <div className="px-6 py-2.5 bg-stone-950/60 border-t border-amber-500/15 flex items-center justify-between text-[10.5px] text-stone-500 font-serif shrink-0">
        <span>暖念 · 为每份挚爱安放永恒温情</span>
        <div className="flex items-center gap-3">
          {onClearHalls && halls.length > 0 && (
            <button
              type="button"
              onClick={() => {
                sound.playWoodPlacement();
                onClearHalls();
              }}
              className="text-stone-500 hover:text-amber-300 transition-colors underline decoration-dotted cursor-pointer"
              title="清空当前列表以测试新用户零纪念堂时的引导界面"
            >
              测试空状态引导
            </button>
          )}
          {onLoadSampleHalls && halls.length === 0 && (
            <button
              type="button"
              onClick={() => {
                sound.playWoodPlacement();
                onLoadSampleHalls();
              }}
              className="text-stone-500 hover:text-amber-300 transition-colors underline decoration-dotted cursor-pointer"
              title="恢复示例纪念堂数据"
            >
              恢复示例堂轩
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
