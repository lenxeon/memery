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
  SceneThemeId,
  SceneAssemblyPart,
  SceneAssemblySelection,
  SceneForegroundSide,
} from '../../../types';
import {
  SCENE_FOREGROUND_OPTIONS,
  SCENE_THEME_OPTIONS,
  createDefaultSceneAssembly,
  getSceneTheme,
} from '../../../pixi';
import { useWorldLoop } from '../../../utils/useWorldLoop';
import { resolveSystemTimeOfDay } from '../../../utils/timeOfDay';
import { sound } from '../../../utils/audio';
import { openAmbianceDrawer } from '../setting';
import { openAgreement } from '../../agreement';
import { INITIAL_LIGHTING } from '../../../data/sceneItems';
import { AuditDrawerExtras } from '../audit/useAuditStage';
import { mapSceneThemeTablePosition } from '../../../pixi/layers/table/MingAltarTableSpec';

const DEFAULT_THEME = getSceneTheme('classic_dawn');

const cloneAssembly = (assembly: SceneAssemblySelection): SceneAssemblySelection => ({
  ...assembly,
  foreground: {
    left: { ...assembly.foreground.left },
    right: { ...assembly.foreground.right },
  },
});

/** 案台（供案本体）中与抽屉共享的两项状态 */
export interface HallAmbianceTable {
  woodStyle: TableWoodStyle;
  legWoodStyle: TableWoodStyle;
  showRunner: boolean;
  setWoodStyle: (style: TableWoodStyle) => void;
  setLegWoodStyle: (style: TableWoodStyle) => void;
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
  const [lighting, setLighting] = useState<LightingSettings>(() => ({
    ...INITIAL_LIGHTING,
    ...DEFAULT_THEME.preset.lighting,
  }));
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showPetals, setShowPetals] = useState(false);
  const [tableclothStyle, setTableclothStyle] = useState<TableclothStyle>(DEFAULT_THEME.preset.tablecloth);

  // 默认进入列表第一个「晴岚映曜」主题。
  const [themeId, setThemeId] = useState<SceneThemeId>('classic_dawn');
  const [sceneAssembly, setSceneAssembly] = useState<SceneAssemblySelection | null>(() =>
    DEFAULT_THEME.defaultAssembly ? cloneAssembly(DEFAULT_THEME.defaultAssembly) : null
  );

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

  const handleThemeChange = (id: SceneThemeId) => {
    const sceneTheme = getSceneTheme(id);
    setThemeId(id);
    setSceneAssembly(sceneTheme.defaultAssembly ? cloneAssembly(sceneTheme.defaultAssembly) : null);
    setTableclothStyle(sceneTheme.preset.tablecloth);
    if (sceneTheme.table) {
      table.setWoodStyle(sceneTheme.table.woodStyle);
      table.setLegWoodStyle(sceneTheme.table.woodStyle);
      table.setShowRunner(sceneTheme.table.runner);
    }
    setLighting((prev) => ({ ...prev, ...sceneTheme.preset.lighting }));
    const opt = SCENE_THEME_OPTIONS.find((o) => o.id === id);
    sound.playBell(540, 2);
    showToast(`已切换空间主题为「${opt?.name || ''} · ${opt?.poeticTitle || ''}」`);
  };

  const handleSceneComponentChange = (part: SceneAssemblyPart, id: string) => {
    const keyByPart: Record<SceneAssemblyPart, keyof Omit<SceneAssemblySelection, 'foreground'>> = {
      wallpaper: 'wallpaperId',
      wallpaperDecoration: 'wallpaperDecorationId',
      wallScenery: 'wallSceneryId',
      wallDecoration: 'wallDecorationId',
      groundMat: 'groundMatId',
      cushion: 'cushionId',
    };
    setSceneAssembly((current) => ({
      ...(current ? cloneAssembly(current) : createDefaultSceneAssembly(undefined, themeId)),
      [keyByPart[part]]: id,
    }));
    sound.playWoodPlacement();
  };

  // Theme defaults are a template in JSON; resolve each normalized table-local point into
  // the existing scene-state position unit whenever the active table changes.
  useEffect(() => {
    const theme = getSceneTheme(themeId);
    if (!theme.defaultOfferings || !theme.table) return;
    setItems((current) => {
      let changed = false;
      const next = { ...current };
      for (const [itemId, offering] of Object.entries(theme.defaultOfferings)) {
        const item = next[itemId as SceneItemId];
        if (!item) continue;
        const position = mapSceneThemeTablePosition(theme.table, offering.position.u, offering.position.v);
        next[itemId as SceneItemId] = { ...item, position };
        changed = true;
      }
      return changed ? next : current;
    });
  }, [themeId, setItems]);

  const selectForeground = (side: SceneForegroundSide, foregroundId: string) => {
    setSceneAssembly((current) => {
      const themeDefault = getSceneTheme(themeId).defaultAssembly;
      const next = current ? cloneAssembly(current) : themeDefault ? cloneAssembly(themeDefault) : createDefaultSceneAssembly(undefined, themeId);
      const previous = next.foreground[side];
      const previousDefinition = SCENE_FOREGROUND_OPTIONS.find((option) => option.id === previous?.foregroundId);
      const definition = SCENE_FOREGROUND_OPTIONS.find((option) => option.id === foregroundId);
      const layoutChanged = Boolean(previousDefinition?.referenceCanvas) !== Boolean(definition?.referenceCanvas);
      const defaultOffsetX = definition?.referenceCanvas || side === 'right' ? 0 : -0.36;
      next.foreground[side] = {
        instanceId: `${side}-${foregroundId}`,
        foregroundId,
        side,
        order: 0,
        offsetX: layoutChanged ? defaultOffsetX : previous?.offsetX,
        offsetY: layoutChanged ? 0 : previous?.offsetY,
      };
      return next;
    });
    sound.playWoodPlacement();
  };

  useEffect(() => {
    const cycleForeground = (event: Event) => {
      const side = (event as CustomEvent<{ side?: SceneForegroundSide }>).detail?.side;
      if (side !== 'left' && side !== 'right') return;

      const allowedSetIds = getSceneTheme(themeId).foregroundSetIds ?? [];
      const candidates = SCENE_FOREGROUND_OPTIONS.filter(
        (option) => option.side === side && allowedSetIds.includes(option.setId),
      );
      if (candidates.length === 0) return;

      const currentId = sceneAssembly?.foreground[side]?.foregroundId;
      const currentIndex = candidates.findIndex((option) => option.id === currentId);
      const next = candidates[(currentIndex + 1) % candidates.length];
      selectForeground(side, next.id);
    };

    window.addEventListener('memery:foreground-tap', cycleForeground);
    return () => window.removeEventListener('memery:foreground-tap', cycleForeground);
  }, [themeId, sceneAssembly]);

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
    onToggleTableRunner: () => {
      sound.playWoodPlacement();
      table.setShowRunner(!table.showRunner);
    },
    showPetals,
    onTogglePetals: () => setShowPetals((v) => !v),
    themeId,
    onChangeTheme: handleThemeChange,
    sceneAssembly,
    onChangeSceneComponent: handleSceneComponentChange,
    onSelectForeground: selectForeground,
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
    themeId,
    sceneAssembly,
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
    themeId,
    handleThemeChange,
    sceneAssembly,
    handleSceneComponentChange,
    selectForeground,
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
