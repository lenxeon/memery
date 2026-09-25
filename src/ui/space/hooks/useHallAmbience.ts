/**
 * @file useHallAmbience.ts
 * @description 馆空间环境域：光照（含时辰跟随系统）、背景墙、地面、桌布、落瓣与禅意音效，
 * 并托管「氛围设置抽屉」的开关与 props 回推。
 *
 * 案台（供案本体）的材质/位置/桌布由审计展台域持有，此处以入参 table 读取，
 * 只负责把它们回推给抽屉；烛火总开关由献供域持有，同理经入参注入。
 */
import { useEffect, useRef, useState } from 'react';
import type React from 'react';
import {
  SceneItem,
  SceneItemId,
  LightingSettings,
  TableclothStyle,
  TableWoodStyle,
  WallBackgroundStyle,
  FloorStyle,
} from '../../../types';
import { FLOOR_STYLE_OPTIONS, WALL_STYLE_OPTIONS } from '../../../pixi';
import { useWorldLoop } from '../../../utils/useWorldLoop';
import { resolveSystemTimeOfDay } from '../../../utils/timeOfDay';
import { sound } from '../../../utils/audio';
import { openAmbianceDrawer } from '../setting';
import { openAgreement } from '../../agreement';
import { INITIAL_LIGHTING } from '../../../data/sceneItems';
import { AuditDrawerExtras } from '../audit/useAuditStage';

/** 案台（供案本体）中与抽屉共享的两项状态 */
export interface HallAmbianceTable {
  woodStyle: TableWoodStyle;
  showRunner: boolean;
  setWoodStyle: (style: TableWoodStyle) => void;
  setShowRunner: (value: boolean) => void;
}

export interface UseHallAmbienceOptions {
  items: Record<SceneItemId, SceneItem>;
  setItems: React.Dispatch<React.SetStateAction<Record<SceneItemId, SceneItem>>>;
  showToast: (message: string) => void;
  /** 世界循环事件（花瓣飘落 / 供花谢去）需要的落瓣触发口 */
  onPetalTrigger: () => void;
  table: HallAmbianceTable;
  /** 抽屉中的审计展台片段（由 useAuditStage 提供） */
  auditExtras: AuditDrawerExtras;
  /** 案上烛火总开关（由 useOfferings 提供） */
  onToggleAllCandles: () => void;
}

export const useHallAmbience = ({
  items,
  setItems,
  showToast,
  onPetalTrigger,
  table,
  auditExtras,
  onToggleAllCandles,
}: UseHallAmbienceOptions) => {
  const [lighting, setLighting] = useState<LightingSettings>(INITIAL_LIGHTING);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showPetals, setShowPetals] = useState(false);
  const [tableclothStyle, setTableclothStyle] = useState<TableclothStyle>('autumn_gold');

  // 背景墙（默认沉香花格 · 木构长廊）
  const [wallStyle, setWallStyle] = useState<WallBackgroundStyle>('heritage_wood');

  // 地面（默认晴岚暖木地坪）
  const [floorStyle, setFloorStyle] = useState<FloorStyle>('hinoki_wood');

  /* ── 时辰跟随系统 ─────────────────────────────────────────────────────── */

  // 按本机时钟推算时辰，每分钟与切回前台时校准一次
  useEffect(() => {
    if (lighting.timeMode === 'fixed') return;
    const sync = () => {
      const tod = resolveSystemTimeOfDay();
      setLighting((prev) => (prev.timeOfDay === tod ? prev : { ...prev, timeOfDay: tod }));
    };
    sync();
    const timer = window.setInterval(sync, 60 * 1000);
    window.addEventListener('visibilitychange', sync);
    window.addEventListener('focus', sync);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('visibilitychange', sync);
      window.removeEventListener('focus', sync);
    };
  }, [lighting.timeMode]);

  /* ── 世界循环：花烛香果的生命周期推进 ─────────────────────────────────── */

  const { timeScale, setTimeScale } = useWorldLoop({
    items,
    onUpdateItems: setItems,
    lighting,
    soundEnabled,
    initialTimeScale: 1.0,
    onEntityEvent: (event) => {
      if (event.type === 'despawn') {
        showToast('一捧供花完成生命花期，芬芳随风化作尘香');
        onPetalTrigger();
      } else if (event.type === 'petal_drop') {
        onPetalTrigger();
      }
    },
  });

  /* ── 环境切换 ─────────────────────────────────────────────────────────── */

  const handleWallStyleChange = (style: WallBackgroundStyle) => {
    setWallStyle(style);
    const opt = WALL_STYLE_OPTIONS.find((o) => o.id === style);
    sound.playBell(540, 2);
    showToast(`已切换背景风格为「${opt?.name || ''} · ${opt?.poeticTitle || ''}」`);
  };

  const handleFloorStyleChange = (style: FloorStyle) => {
    setFloorStyle(style);
    sound.playWoodPlacement();
    const opt = FLOOR_STYLE_OPTIONS.find((o) => o.id === style);
    showToast(`已切换地面材质为「${opt?.name || ''} · ${opt?.poeticTitle || ''}」`);
  };

  const updateLighting = (patch: Partial<LightingSettings>) => setLighting((prev) => ({ ...prev, ...patch }));

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    if (next) sound.playBell(580, 2);
  };

  /* ── 氛围设置抽屉：props 回推 ─────────────────────────────────────────── */

  // 弹窗 props 为「打开瞬间」的快照：父级状态更新不会自动回传给已挂载的弹窗，
  // 若不回传，面板内的开关与选中态会永远停在打开时的值（表现为点了没反应）。
  // 这里保存弹窗句柄，并在父级相关状态变化时把最新 props 推回去。
  type AmbianceDrawerProps = Parameters<typeof openAmbianceDrawer>[0];
  const ambianceDialogRef = useRef<ReturnType<typeof openAmbianceDrawer> | null>(null);
  const ambiancePropsRef = useRef<() => AmbianceDrawerProps>(() => ({} as AmbianceDrawerProps));

  ambiancePropsRef.current = () => ({
    lighting,
    onUpdateLighting: updateLighting,
    onToggleAllCandles,
    soundEnabled,
    onToggleSound: toggleSound,
    showTableRunner: table.showRunner,
    tableclothStyle,
    onChangeTableclothStyle: (st: TableclothStyle) => {
      sound.playWoodPlacement();
      setTableclothStyle(st);
    },
    tableWoodStyle: table.woodStyle,
    onChangeTableWoodStyle: (st: TableWoodStyle) => {
      sound.playWoodPlacement();
      table.setWoodStyle(st);
    },
    floorStyle,
    onChangeFloorStyle: handleFloorStyleChange,
    onToggleTableRunner: () => {
      sound.playWoodPlacement();
      table.setShowRunner(!table.showRunner);
    },
    showPetals,
    onTogglePetals: () => setShowPetals((v) => !v),
    wallStyle,
    onChangeWallStyle: handleWallStyleChange,
    timeScale,
    onUpdateTimeScale: setTimeScale,
    ...auditExtras,
    onOpenAgreement: openAgreement,
  });

  const openEnvironmentDrawer = () => {
    ambianceDialogRef.current = openAmbianceDrawer(ambiancePropsRef.current());
  };

  useEffect(() => {
    ambianceDialogRef.current?.update(ambiancePropsRef.current());
  }, [
    lighting,
    soundEnabled,
    table.showRunner,
    tableclothStyle,
    table.woodStyle,
    floorStyle,
    wallStyle,
    showPetals,
    timeScale,
    auditExtras,
  ]);

  /* ── 场景底色 ─────────────────────────────────────────────────────────── */

  const getSceneBackgroundClass = () => {
    if (!lighting.masterOn) {
      return 'bg-gradient-to-b from-[#141210] via-[#1c1714] to-[#120f0d] text-stone-200';
    }
    switch (lighting.timeOfDay) {
      case 'sunset':
        return 'bg-gradient-to-b from-[#f3dfcf] via-[#f7eae1] to-[#e8d2c0] text-stone-800';
      case 'night':
        return 'bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#090d16] text-stone-200';
      case 'day':
      default:
        return 'bg-gradient-to-b from-[#fbf8f3] via-[#f5ede3] to-[#e7dacb] text-stone-800';
    }
  };

  return {
    lighting,
    updateLighting,
    wallStyle,
    handleWallStyleChange,
    floorStyle,
    handleFloorStyleChange,
    tableclothStyle,
    setTableclothStyle,
    showPetals,
    setShowPetals,
    soundEnabled,
    toggleSound,
    timeScale,
    setTimeScale,
    openEnvironmentDrawer,
    backgroundClass: getSceneBackgroundClass(),
  };
};
