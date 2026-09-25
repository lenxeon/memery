/**
 * @file useAuditStage.ts
 * @description 专项审计展台状态机：展台开关、类别/分组切换、枯荣生机、胶囊拖拽定位与案台材质。
 *
 * 职责边界：
 * - 持有「案上陈设」这一份状态（常规五供与审计展台互斥地整案替换），并对外输出 items/setItems；
 * - 持有「案台材质/位置/桌布」（审计胶囊的「案台」页与场景拖拽共用）；
 * - 输出 AuditStage 所需的全部受控 props（auditProps），以及回推给设置抽屉的片段（extras）。
 */
import { useCallback, useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { AuditCategory, AuditGroup, SceneItem, SceneItemId, TableWoodStyle } from '../../../types';
import { sound } from '../../../utils/audio';
import {
  INITIAL_ITEMS,
  DEFAULT_TABLE_WOOD_STYLE,
  TABLE_WOOD_OPTIONS,
  buildAuditItems,
  buildStandardItems,
} from '../../../data/sceneItems';
import { AuditStageProps } from './AuditStage';

/** 案台（供案本体）受控状态与写入口 */
export interface AuditTableState {
  woodStyle: TableWoodStyle;
  legWoodStyle: TableWoodStyle;
  /** 前后位置：-1 最靠后（远），0 标准，1 最靠前（近） */
  forward: number;
  showRunner: boolean;
  setWoodStyle: (style: TableWoodStyle) => void;
  setLegWoodStyle: (style: TableWoodStyle) => void;
  setForward: (value: number) => void;
  setShowRunner: (value: boolean) => void;
}

/** 供献供域（useOfferings）判读用的审计现场快照 */
export interface AuditInfo {
  isAuditMode: boolean;
  category: AuditCategory;
  group: AuditGroup;
  withFlowers: boolean;
  decayHealth: number;
}

/** 回推给氛围设置抽屉的审计片段 */
export interface AuditDrawerExtras {
  isAuditMode: boolean;
  onToggleAuditMode: () => void;
  auditCategory: AuditCategory;
  onSwitchAuditCategory: (category: AuditCategory) => void;
  auditGroup: AuditGroup;
  onSwitchAuditGroup: (group: AuditGroup) => void;
  auditWithFlowers: boolean;
  onToggleAuditFlowers: () => void;
  flowerDecayHealth: number;
  onSelectFlowerDecayHealth: (health: number) => void;
  onTriggerAuditPetals: () => void;
}

/** 名花枯荣三档：满盛 → 微枯 → 岁暮 → 重放 */
const DECAY_STEPS = [1.0, 0.55, 0.15] as const;

const describeDecay = (health: number): string =>
  health >= 0.9
    ? '🌸 满盛怒放（生机 100%）'
    : health >= 0.4
    ? '🍂 微枯初衰（生机 55%）'
    : '🥀 岁暮深凋（生机 15%）';

const GROUP_TOAST: Record<AuditGroup, string> = {
  flowers_tier1_all: '已展示第一梯队 10 款名花齐放同台全景',
  flowers_tier1_a: '已展示第一梯队前5名花 (梅花/向日葵/康乃馨/马蹄莲/郁金香)',
  flowers_tier1_b: '已展示第一梯队后5名花 (水仙/铃兰/蝴蝶兰/绣球/雏菊)',
  flowers_classic: '已展示经典五供名花 (牡丹/百合/清莲/白菊/玫瑰)',
  flowers_bouquets: '已展示案前敬献花束平铺形态对比',
  new_unique: '已展示 4 款异形与微观肌理瓶',
  designer_twist: '已展示 8 款现代几何折痕瓶',
  all_woods: '已展示 4 款名木实木板式材质',
};

export interface UseAuditStageOptions {
  showToast: (message: string) => void;
  /** 触发落英缤纷动效（供案落瓣由场景层消费） */
  onPetalTrigger: () => void;
}

export const useAuditStage = ({ showToast, onPetalTrigger }: UseAuditStageOptions) => {
  const [items, setItems] = useState<Record<SceneItemId, SceneItem>>(INITIAL_ITEMS);

  // ── 展台状态 ──
  const [isAuditMode, setIsAuditMode] = useState(false);
  const [auditPos, setAuditPos] = useState<{ x: number; y: number } | null>(null);
  const [auditCategory, setAuditCategory] = useState<AuditCategory>('flowers');
  const [auditGroup, setAuditGroup] = useState<AuditGroup>('flowers_tier1_all');
  const [auditWithFlowers, setAuditWithFlowers] = useState(true);
  const [flowerDecayHealth, setFlowerDecayHealth] = useState<number>(1.0);
  const [isAuditCapsuleExpanded, setIsAuditCapsuleExpanded] = useState<boolean>(true);
  const auditPanelRef = useRef<HTMLDivElement>(null);

  // ── 案台状态 ──
  const [tableWoodStyle, setTableWoodStyle] = useState<TableWoodStyle>(DEFAULT_TABLE_WOOD_STYLE);
  const [tableLegWoodStyle, setTableLegWoodStyle] = useState<TableWoodStyle>(DEFAULT_TABLE_WOOD_STYLE);
  const [tableForward, setTableForward] = useState(0);
  const [showTableRunner, setShowTableRunner] = useState(false);

  const clampForward = useCallback((value: number) => setTableForward(Math.max(-1, Math.min(1, value))), []);

  /* ── 展台切换 ─────────────────────────────────────────────────────────── */

  const switchAuditCategory = useCallback(
    (category: AuditCategory) => {
      setAuditCategory(category);
      if (category === 'table') {
        sound.playWoodPlacement();
        showToast('已进入「供案材质专项审计」');
        return;
      }
      const defaultGroup: AuditGroup = category === 'flowers' ? 'flowers_tier1_all' : 'new_unique';
      setAuditGroup(defaultGroup);
      sound.playPorcelainClink();
      setItems(buildAuditItems(category, defaultGroup, auditWithFlowers, flowerDecayHealth));
      showToast(category === 'flowers' ? '已进入「名花专项审计展台」' : '已进入「花器专项审计展台」');
    },
    [auditWithFlowers, flowerDecayHealth, showToast]
  );

  const switchAuditGroup = useCallback(
    (group: AuditGroup) => {
      setAuditGroup(group);
      sound.playPorcelainClink();
      setItems(buildAuditItems(auditCategory, group, auditWithFlowers, flowerDecayHealth));
      showToast(GROUP_TOAST[group] || '展台已更新');
    },
    [auditCategory, auditWithFlowers, flowerDecayHealth, showToast]
  );

  const applyDecayHealth = useCallback(
    (health: number) => {
      setFlowerDecayHealth(health);
      sound.playBell(720, 1.5);
      setItems(buildAuditItems(auditCategory, auditGroup, auditWithFlowers, health));
      showToast(`名花枯荣生命审计：${describeDecay(health)}`);
    },
    [auditCategory, auditGroup, auditWithFlowers, showToast]
  );

  const cycleFlowerDecay = useCallback(() => {
    const idx = DECAY_STEPS.indexOf(flowerDecayHealth as (typeof DECAY_STEPS)[number]);
    applyDecayHealth(DECAY_STEPS[(idx + 1) % DECAY_STEPS.length]);
  }, [applyDecayHealth, flowerDecayHealth]);

  const triggerAuditPetals = useCallback(() => {
    onPetalTrigger();
    sound.playBell(580, 2);
    showToast('🍃 已触发落英缤纷动效（花瓣随风舒展漫舞）');
  }, [onPetalTrigger, showToast]);

  const toggleAuditFlowers = useCallback(() => {
    const next = !auditWithFlowers;
    setAuditWithFlowers(next);
    sound.playPorcelainClink();
    setItems(buildAuditItems(auditCategory, auditGroup, next, flowerDecayHealth));
    showToast(
      next ? '已开启插花比对（审计花枝入瓶景深与咬合）' : '已切换为净瓶裸检模式（审计器形、釉色与微观肌理）'
    );
  }, [auditCategory, auditGroup, auditWithFlowers, flowerDecayHealth, showToast]);

  const toggleAuditMode = useCallback(() => {
    if (isAuditMode) {
      setIsAuditMode(false);
      setItems(buildStandardItems());
      showToast('已恢复常规五供陈设（香、花、灯、水、果）');
    } else {
      setIsAuditMode(true);
      setItems(buildAuditItems(auditCategory, auditGroup, auditWithFlowers, flowerDecayHealth));
      showToast(auditCategory === 'flowers' ? '已进入「名花专项审计展台」' : '已进入「花器专项审计展台」');
    }
    sound.playWoodPlacement();
  }, [auditCategory, auditGroup, auditWithFlowers, flowerDecayHealth, isAuditMode, showToast]);

  /* ── 顶栏「案台材质」快捷审计入口 ─────────────────────────────────────── */

  const toggleTableAudit = useCallback(() => {
    sound.playWoodPlacement();
    if (isAuditMode && auditCategory === 'table') {
      setIsAuditMode(false);
      return;
    }
    setIsAuditMode(true);
    setAuditCategory('table');
    setIsAuditCapsuleExpanded(true);
  }, [auditCategory, isAuditMode]);

  /* ── 胶囊拖拽（桌面鼠标与移动端触摸统一走 Pointer Events） ─────────────── */

  const handleAuditPointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    // 若点击在按钮等交互元素上，不触发面板拖拽
    if ((e.target as HTMLElement).closest('button, input, select, a')) return;

    const panel = auditPanelRef.current;
    if (!panel) return;

    const rect = panel.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const onPointerMove = (moveEv: PointerEvent) => {
      const panelW = rect.width;
      const panelH = rect.height;
      const newX = Math.max(8, Math.min(window.innerWidth - panelW - 8, moveEv.clientX - offsetX));
      const newY = Math.max(50, Math.min(window.innerHeight - panelH - 20, moveEv.clientY - offsetY));
      setAuditPos({ x: newX, y: newY });
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }, []);

  /* ── 案台（供案本体）变更 ─────────────────────────────────────────────── */

  const changeTableWood = useCallback(
    (style: TableWoodStyle) => {
      sound.playWoodPlacement();
      setTableWoodStyle(style);
      showToast(`供案材质已切换为「${TABLE_WOOD_OPTIONS.find((o) => o.id === style)?.name || ''}」`);
    },
    [showToast]
  );

  const changeTableLegWood = useCallback(
    (style: TableWoodStyle) => {
      sound.playWoodPlacement();
      setTableLegWoodStyle(style);
      showToast(`腿足材质已切换为「${TABLE_WOOD_OPTIONS.find((o) => o.id === style)?.name || ''}」`);
    },
    [showToast]
  );

  const resetTableForward = useCallback(() => {
    sound.playWoodPlacement();
    setTableForward(0);
    showToast('供案前后位置已复位');
  }, [showToast]);

  const toggleTableRunner = useCallback(() => {
    sound.playWoodPlacement();
    setShowTableRunner((v) => {
      const next = !v;
      showToast(next ? '已铺设提花大桌布' : '已收起桌布，呈现纯实木板式案台');
      return next;
    });
  }, [showToast]);

  /* ── 对外输出 ─────────────────────────────────────────────────────────── */

  const table: AuditTableState = {
    woodStyle: tableWoodStyle,
    legWoodStyle: tableLegWoodStyle,
    forward: tableForward,
    showRunner: showTableRunner,
    setWoodStyle: setTableWoodStyle,
    setLegWoodStyle: setTableLegWoodStyle,
    setForward: clampForward,
    setShowRunner: setShowTableRunner,
  };

  const info: AuditInfo = {
    isAuditMode,
    category: auditCategory,
    group: auditGroup,
    withFlowers: auditWithFlowers,
    decayHealth: flowerDecayHealth,
  };

  const auditProps: AuditStageProps = {
    category: auditCategory,
    group: auditGroup,
    withFlowers: auditWithFlowers,
    decayHealth: flowerDecayHealth,
    expanded: isAuditCapsuleExpanded,
    pos: auditPos,
    panelRef: auditPanelRef,
    onPointerDown: handleAuditPointerDown,
    onToggleExpanded: () => setIsAuditCapsuleExpanded((prev) => !prev),
    onSwitchCategory: switchAuditCategory,
    onSwitchGroup: switchAuditGroup,
    onToggleFlowers: toggleAuditFlowers,
    onCycleDecay: cycleFlowerDecay,
    onTriggerPetals: triggerAuditPetals,
    onClose: toggleAuditMode,
    tableWoodStyle,
    tableLegWoodStyle,
    tableForward,
    showTableRunner,
    onChangeTableWood: changeTableWood,
    onChangeTableLegWood: changeTableLegWood,
    onResetTableForward: resetTableForward,
    onToggleTableRunner: toggleTableRunner,
  };

  // 回推给氛围设置抽屉（仅在审计状态变化时产生新引用，避免抽屉无谓刷新）
  const extras: AuditDrawerExtras = useMemo(
    () => ({
      isAuditMode,
      onToggleAuditMode: toggleAuditMode,
      auditCategory,
      onSwitchAuditCategory: switchAuditCategory,
      auditGroup,
      onSwitchAuditGroup: switchAuditGroup,
      auditWithFlowers,
      onToggleAuditFlowers: toggleAuditFlowers,
      flowerDecayHealth,
      onSelectFlowerDecayHealth: applyDecayHealth,
      onTriggerAuditPetals: triggerAuditPetals,
    }),
    [
      isAuditMode,
      toggleAuditMode,
      auditCategory,
      switchAuditCategory,
      auditGroup,
      switchAuditGroup,
      auditWithFlowers,
      toggleAuditFlowers,
      flowerDecayHealth,
      applyDecayHealth,
      triggerAuditPetals,
    ]
  );

  return {
    items,
    setItems,
    isAuditMode,
    table,
    info,
    extras,
    auditProps,
    toggleTableAudit,
  };
};
