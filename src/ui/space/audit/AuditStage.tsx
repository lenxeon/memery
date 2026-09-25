/**
 * @file AuditStage.tsx
 * @description 专项审计展台控制胶囊（纯受控 UI）。
 *
 * 本组件不含任何业务状态：展台类别、分组、枯荣生机、位置与案台材质
 * 全部由外部（useAuditStage）注入，交互一律经 on* 回调上抛。
 * 因此它可被单独渲染与快照测试，也可复用于其它展台场景。
 */
import React from 'react';
import { AuditCategory, AuditGroup, TableWoodStyle } from '../../../types';
import { TABLE_WOOD_OPTIONS } from '../../../data/sceneItems';
import { CinnabarSealBadge } from '../../common/ChineseDecorations';
import { sound } from '../../../utils/audio';
import { GripVertical, ChevronDown, ChevronUp, X } from 'lucide-react';

export interface AuditStageProps {
  /** 展台类别：名花 / 花器 / 案台 */
  category: AuditCategory;
  /** 当前分组（名花梯队、花器系列等） */
  group: AuditGroup;
  /** 花器展台是否插花（净瓶裸检为 false） */
  withFlowers: boolean;
  /** 名花枯荣生机 0–1 */
  decayHealth: number;
  /** 配置区是否展开 */
  expanded: boolean;
  /** 胶囊位置（null 时回落到顶部居中） */
  pos: { x: number; y: number } | null;
  /** 胶囊根节点引用（拖拽定位与尺寸测量用） */
  panelRef?: React.Ref<HTMLDivElement>;
  onPointerDown?: React.PointerEventHandler<HTMLDivElement>;
  onToggleExpanded: () => void;
  onSwitchCategory: (category: AuditCategory) => void;
  onSwitchGroup: (group: AuditGroup) => void;
  onToggleFlowers: () => void;
  onCycleDecay: () => void;
  onTriggerPetals: () => void;
  /** 关闭展台（恢复常规五供） */
  onClose: () => void;

  /** ── 案台材质审计（受控） ── */
  tableWoodStyle: TableWoodStyle;
  tableLegWoodStyle: TableWoodStyle;
  tableForward: number;
  showTableRunner: boolean;
  onChangeTableWood: (style: TableWoodStyle) => void;
  onChangeTableLegWood: (style: TableWoodStyle) => void;
  onResetTableForward: () => void;
  onToggleTableRunner: () => void;
}

/** 展台标题与图标 */
const CATEGORY_META: Record<AuditCategory, { icon: string; title: string }> = {
  flowers: { icon: '🌸', title: '名花专项审计' },
  vases: { icon: '🏺', title: '花器专项审计' },
  table: { icon: '🪵', title: '案台木质审计' },
};

/** 名花分组按钮 */
const FLOWER_GROUPS: { id: AuditGroup; icon: string; label: string; title: string }[] = [
  { id: 'flowers_tier1_all', icon: '🌟', label: '10花齐放', title: '第一梯队 10 款新名花双排错落同台大展' },
  { id: 'flowers_tier1_a', icon: '🌺', label: '梯队A (前5)', title: '梅花、向日葵、康乃馨、马蹄莲、郁金香' },
  { id: 'flowers_tier1_b', icon: '🪷', label: '梯队B (后5)', title: '水仙、铃兰、蝴蝶兰、绣球、雏菊' },
  { id: 'flowers_classic', icon: '💮', label: '经典5供', title: '牡丹、百合、清莲、白菊、玫瑰' },
  { id: 'flowers_bouquets', icon: '💐', label: '案前花束', title: '桌面平铺丝带花束敬献形态比对' },
];

/** 花器分组按钮 */
const VASE_GROUPS: { id: AuditGroup; icon: string; label: string }[] = [
  { id: 'new_unique', icon: '✨', label: '4款异形瓶' },
  { id: 'designer_twist', icon: '🎨', label: '8款折痕瓶' },
];

export const AuditStage: React.FC<AuditStageProps> = ({
  category,
  group,
  withFlowers,
  decayHealth,
  expanded,
  pos,
  panelRef,
  onPointerDown,
  onToggleExpanded,
  onSwitchCategory,
  onSwitchGroup,
  onToggleFlowers,
  onCycleDecay,
  onTriggerPetals,
  onClose,
  tableWoodStyle,
  tableLegWoodStyle,
  tableForward,
  showTableRunner,
  onChangeTableWood,
  onChangeTableLegWood,
  onResetTableForward,
  onToggleTableRunner,
}) => {
  const meta = CATEGORY_META[category] || CATEGORY_META.flowers;
  const decayLabel =
    decayHealth === 1.0 ? '🌸 满盛' : decayHealth === 0.55 ? '🍂 微枯' : '🥀 岁暮';

  return (
    <div
      ref={panelRef}
      onPointerDown={onPointerDown}
      className="fixed z-40 select-none touch-none cursor-move transition-shadow pointer-events-auto"
      style={{
        left: pos ? `${pos.x}px` : '50%',
        top: pos ? `${pos.y}px` : '88px',
        transform: pos ? 'none' : 'translateX(-50%)',
        maxWidth: '96vw',
      }}
    >
      <div className="pointer-events-auto flex items-center flex-wrap justify-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-[#1c1917]/95 backdrop-blur-xl border border-amber-500/60 shadow-[0_12px_36px_rgba(0,0,0,0.85)] text-xs text-amber-100 ring-1 ring-amber-400/20 animate-in fade-in zoom-in-95">
        {/* 拖动手柄与标题 */}
        <div className="flex items-center gap-1 font-semibold text-amber-300 font-serif mr-1">
          <div
            className="text-amber-400/60 hover:text-amber-300 p-0.5 cursor-grab active:cursor-grabbing"
            title="按住拖动位置"
          >
            <GripVertical size={15} />
          </div>
          <span>{meta.icon}</span>
          <span>{meta.title}</span>
          <CinnabarSealBadge text="审计" />
        </div>

        {/* 胶囊展开/收起切换按钮 */}
        <button
          type="button"
          onClick={() => {
            sound.playWoodPlacement();
            onToggleExpanded();
          }}
          className="px-2 py-0.5 rounded-full bg-stone-900/90 border border-amber-500/40 hover:border-amber-400 text-[11px] text-amber-200/90 flex items-center gap-0.5 cursor-pointer transition-all active:scale-95"
          title={expanded ? '收起配置选项' : '展开详细配置选项'}
        >
          <span>{expanded ? '收起' : '展开配置'}</span>
          {expanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
        </button>

        {expanded && (
          <>
            <span className="text-stone-600 hidden sm:inline">|</span>

            {/* 类别切换：名花 vs 花器 vs 案台 */}
            <div className="flex items-center bg-stone-950/90 p-0.5 rounded-full border border-amber-500/40">
              <button
                type="button"
                onClick={() => onSwitchCategory('flowers')}
                className={`px-2.5 py-1 rounded-full cursor-pointer transition-all active:scale-95 font-medium flex items-center gap-1 ${
                  category === 'flowers'
                    ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-stone-950 font-bold shadow-xs'
                    : 'text-amber-200/70 hover:text-amber-100'
                }`}
              >
                <span>🌸</span>
                <span>名花 (15款)</span>
              </button>
              <button
                type="button"
                onClick={() => onSwitchCategory('vases')}
                className={`px-2.5 py-1 rounded-full cursor-pointer transition-all active:scale-95 font-medium flex items-center gap-1 ${
                  category === 'vases'
                    ? 'bg-amber-600/90 text-stone-950 font-bold shadow-xs'
                    : 'text-amber-200/70 hover:text-amber-100'
                }`}
              >
                <span>🏺</span>
                <span>花器 (12款)</span>
              </button>
              <button
                type="button"
                onClick={() => onSwitchCategory('table')}
                className={`px-2.5 py-1 rounded-full cursor-pointer transition-all active:scale-95 font-medium flex items-center gap-1 ${
                  category === 'table'
                    ? 'bg-amber-600/90 text-stone-950 font-bold shadow-xs'
                    : 'text-amber-200/70 hover:text-amber-100'
                }`}
              >
                <span>🪵</span>
                <span>案台 (4款)</span>
              </button>
            </div>

            <span className="text-stone-600 hidden sm:inline">|</span>

            {/* 名花 / 花器 分组切换 */}
            {category === 'flowers' ? (
              <div className="flex items-center flex-wrap gap-1 bg-stone-950/80 p-0.5 rounded-full border border-amber-500/30">
                {FLOWER_GROUPS.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => onSwitchGroup(g.id)}
                    className={`px-2 py-0.5 rounded-full cursor-pointer transition-all active:scale-95 font-medium ${
                      group === g.id
                        ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                        : 'text-amber-200/70 hover:text-amber-100'
                    }`}
                    title={g.title}
                  >
                    {g.icon} {g.label}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center bg-stone-950/80 p-0.5 rounded-full border border-amber-500/30">
                {VASE_GROUPS.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => onSwitchGroup(g.id)}
                    className={`px-2.5 py-1 rounded-full cursor-pointer transition-all active:scale-95 font-medium ${
                      group === g.id
                        ? 'bg-amber-600/90 text-stone-950 font-bold shadow-xs'
                        : 'text-amber-200/70 hover:text-amber-100'
                    }`}
                  >
                    {g.icon} {g.label}
                  </button>
                ))}
              </div>
            )}

            <span className="text-stone-600 hidden sm:inline">|</span>

            {/* 案台专属控制：台面/腿足独立原木材质、前后位置与桌布开关 */}
            {category === 'table' ? (
              <div className="flex items-center flex-wrap gap-1.5">
                <div className="flex items-center gap-1 bg-stone-950/80 p-0.5 rounded-full border border-amber-500/30">
                  {TABLE_WOOD_OPTIONS.map((w) => {
                    const isSel = tableWoodStyle === w.id;
                    return (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() => onChangeTableWood(w.id as TableWoodStyle)}
                        className={`px-2.5 py-1 rounded-full cursor-pointer transition-all active:scale-95 text-xs font-medium flex items-center gap-1.5 ${
                          isSel
                            ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                            : 'text-amber-200/80 hover:text-amber-100 hover:bg-stone-900/60'
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block border shrink-0"
                          style={{ background: w.color, borderColor: w.border }}
                        />
                        <span>{w.name}</span>
                      </button>
                    );
                  })}
                </div>

                <select
                  value={tableLegWoodStyle}
                  onChange={(e) => onChangeTableLegWood(e.target.value as TableWoodStyle)}
                  className="px-2 py-1 rounded-full bg-stone-950/80 border border-amber-500/30 text-amber-200 text-xs cursor-pointer outline-none"
                  title="切换腿足构架（桌腿/牙板/横枨）材质"
                >
                  {TABLE_WOOD_OPTIONS.map((w) => (
                    <option key={w.id} value={w.id}>
                      腿足·{w.name}
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-1.5 bg-stone-950/80 px-2 py-1 rounded-full border border-amber-500/30">
                  <span className="text-[10px] text-amber-300/70 whitespace-nowrap">
                    ✥ 场景中拖动供案调前后
                  </span>
                  <span className="text-[10px] font-mono text-amber-200/80 w-8 text-right">
                    {Math.round(tableForward * 100)}
                  </span>
                  <button
                    type="button"
                    onClick={onResetTableForward}
                    className="px-1.5 py-0.5 rounded-full bg-stone-900/80 border border-stone-700 text-stone-400 hover:text-amber-200 hover:border-amber-500/50 cursor-pointer transition-all active:scale-95 text-[10px]"
                    title="复位供案至标准前后位置"
                  >
                    复位
                  </button>
                </div>

                <button
                  type="button"
                  onClick={onToggleTableRunner}
                  className={`px-2.5 py-1 rounded-full border cursor-pointer transition-all active:scale-95 flex items-center gap-1 font-medium text-xs ${
                    showTableRunner
                      ? 'bg-amber-600/50 border-amber-400 text-amber-200 font-bold'
                      : 'bg-stone-900/80 border-stone-700 text-stone-400 hover:text-stone-200'
                  }`}
                  title="切换铺设大桌布或纯实木板式案台"
                >
                  <span>🧺</span>
                  <span>{showTableRunner ? '已铺大桌布' : '素雅纯实木'}</span>
                </button>
              </div>
            ) : category === 'flowers' ? (
              /* 名花专属控制：枯荣生命周期切换 & 漫天落瓣动效 */
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={onCycleDecay}
                  className="px-2.5 py-1 rounded-full bg-rose-950/40 hover:bg-rose-900/50 text-rose-200 border border-rose-400/40 cursor-pointer transition-all active:scale-95 flex items-center gap-1 font-medium"
                  title="切换名花生命周期：满盛(100%) -> 微枯(55%) -> 岁暮深凋(15%)"
                >
                  <span>{decayLabel}</span>
                  <span className="text-[10px] text-rose-300/80 font-mono">
                    {Math.round(decayHealth * 100)}%
                  </span>
                </button>
                <button
                  type="button"
                  onClick={onTriggerPetals}
                  className="px-2.5 py-1 rounded-full bg-amber-950/40 hover:bg-amber-900/50 text-amber-200 border border-amber-400/40 cursor-pointer transition-all active:scale-95 flex items-center gap-1 font-medium"
                  title="模拟落英缤纷漫天落瓣动效"
                >
                  <span>🍃 花雨</span>
                </button>
              </div>
            ) : (
              /* 花器专属控制 */
              <button
                type="button"
                onClick={onToggleFlowers}
                className="px-2.5 py-1 rounded-full bg-amber-950/40 hover:bg-amber-900/50 text-amber-200 border border-amber-400/40 cursor-pointer transition-all active:scale-95 flex items-center gap-1 font-medium"
                title="切换插花查看瓶口咬合深度，或看净瓶裸瓶"
              >
                <span>{withFlowers ? '🌸 切换裸检' : '🌸 显示插花'}</span>
              </button>
            )}

            {/* 恢复常规五供快捷按钮 */}
            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-1 rounded-full bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 border border-amber-500/50 cursor-pointer transition-all active:scale-95 flex items-center gap-1 font-medium"
              title="恢复常规五供陈设"
            >
              <span>🔄 恢复常规五供</span>
            </button>
          </>
        )}

        {/* 关闭审计展台 X 按钮 */}
        <button
          type="button"
          onClick={onClose}
          className="w-6 h-6 rounded-full bg-stone-900/90 hover:bg-rose-950/80 text-stone-400 hover:text-rose-300 flex items-center justify-center cursor-pointer border border-amber-500/40 hover:border-rose-400/60 transition-all shrink-0 ml-0.5 active:scale-90"
          title="关闭专项审计展台"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
