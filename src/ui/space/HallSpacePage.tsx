/**
 * @file HallSpacePage.tsx
 * @description 馆空间页：单座纪念堂（堂轩）的供案场景主视图。
 *
 * 本文件只负责「组合」：把四个状态域装配起来，再拼装舞台与控件 ——
 * - useAuditStage：专项审计展台（并持有案上陈设 items 与案台材质）
 * - useHallAmbience：光照、背景墙、地面、桌布、落瓣、音效与设置抽屉
 * - useOfferings：案上物件交互与献花 / 供果 / 祈愿
 * - useHallDirectory：主奉纪念堂与堂轩名录（切换 / 筹建 / 持久化）
 *
 * 登录态由应用外壳（AppShell）持有并通过 props 传入，本页不关心路由与登录页。
 */
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { UserProfile } from '../../types';
import { SceneCanvas } from './SceneCanvas';
import { BottomDock, TopBar } from './controls';
import { MemorialEditModal } from './memorial';
import { openBlessing } from './offering';
import { useHallAmbience, useHallDirectory, useOfferings } from './hooks';
import { AuditStage, useAuditStage } from './audit';
import { sound } from '../../utils/audio';
import { Sparkles } from 'lucide-react';

export interface HallSpacePageProps {
  /** 当前登录用户（由应用外壳持有并持久化） */
  currentUser: UserProfile | null;
  /** 请求进入登录页 */
  onRequestAuth: () => void;
  /** 登录态变更（登录成功 / 退出登录） */
  onUserChange: (user: UserProfile | null) => void;
}

export const HallSpacePage: React.FC<HallSpacePageProps> = ({ currentUser, onRequestAuth, onUserChange }) => {
  /* ── 轻提示 ──────────────────────────────────────────────────────────── */
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  }, []);

  // 落英缤纷动效触发（世界循环、献供与审计展台共用）
  const [petalTrigger, setPetalTrigger] = useState(0);
  const triggerPetals = useCallback(() => setPetalTrigger(Date.now()), []);

  /* ── 三域装配 ────────────────────────────────────────────────────────── */
  // 烛火总开关由献供域持有，而环境域的抽屉需要它：
  // 以 ref 延迟绑定，避免两个 hook 之间形成声明顺序上的循环依赖。
  const candlesToggleRef = useRef<() => void>(() => {});

  const audit = useAuditStage({ showToast, onPetalTrigger: triggerPetals });
  const { items } = audit;

  const ambience = useHallAmbience({
    items: audit.items,
    setItems: audit.setItems,
    showToast,
    onPetalTrigger: triggerPetals,
    table: audit.table,
    auditExtras: audit.extras,
    onToggleAllCandles: () => candlesToggleRef.current(),
  });

  const offerings = useOfferings({
    items: audit.items,
    setItems: audit.setItems,
    showToast,
    onPetalTrigger: triggerPetals,
    audit: audit.info,
  });

  candlesToggleRef.current = offerings.toggleAllCandles;

  const halls = useHallDirectory({ showToast });

  // 退出登录：登录态由应用外壳持有，此处只负责回传与提示
  const handleLogout = () => {
    sound.playWoodPlacement();
    onUserChange(null);
    showToast('已安全退出登录');
  };

  /* ── 局部 UI 态 ──────────────────────────────────────────────────────── */
  const [isArrangeMode, setIsArrangeMode] = useState(false);

  // 牌位编辑弹窗（遗像已迁至 Pixi 渲染，弹窗仍由页面持有）
  const [isMemorialEditorOpen, setIsMemorialEditorOpen] = useState(false);

  // 舞台区（顶栏与底栏之间）相对全屏画布的上下内缩：
  // Pixi 画布铺满全屏，遗像需要这两个数字才能复刻原先 top-[18%] 的纵向定位
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [stageInsets, setStageInsets] = useState({ top: 64, bottom: 96 });

  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      const top = Math.round(rect.top);
      const bottom = Math.round(window.innerHeight - rect.bottom);
      setStageInsets((prev) =>
        Math.abs(prev.top - top) < 1 && Math.abs(prev.bottom - bottom) < 1 ? prev : { top, bottom }
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  // 登录态由应用外壳注入：从无到有时在馆空间内提示
  const prevUserRef = useRef<UserProfile | null>(currentUser);
  useEffect(() => {
    if (!prevUserRef.current && currentUser) {
      showToast(`已登录：${currentUser.name}，暖念心灯已长伴`);
    }
    prevUserRef.current = currentUser;
  }, [currentUser, showToast]);

  return (
    <main
      className={`relative w-full h-screen overflow-hidden flex flex-col items-center justify-between select-none transition-colors duration-700 font-sans ${ambience.backgroundClass}`}
    >
      {/* Wall Texture Effect (Hardware accelerated, zero blend cost) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background: `radial-gradient(circle at 50% 35%, transparent 25%, rgba(60, 40, 20, 0.12) 100%)`,
        }}
      />

      {/* Layer 0: 全幅 Pixi 舞台（直接铺满视口，顶栏透明叠加其上，消除头部背景色差带） */}
      <div className="absolute inset-0 z-0">
        <SceneCanvas
          items={items}
          lighting={ambience.lighting}
          wallStyle={ambience.wallStyle}
          floorStyle={ambience.floorStyle}
          tableclothStyle={ambience.tableclothStyle}
          tableWoodStyle={audit.table.woodStyle}
          tableLegWoodStyle={audit.table.legWoodStyle}
          tableForward={audit.table.forward}
          showTableRunner={audit.table.showRunner}
          petalTrigger={petalTrigger}
          lastOfferedFlower={offerings.lastOfferedFlower}
          onToggleItemLit={offerings.toggleItemLit}
          onToggleFruit={offerings.handleToggleFruit}
          onVaseClick={offerings.handleVaseClick}
          onInspectItem={offerings.handleInspectItem}
          onBowlHit={() => sound.playSingingBowl()}
          onUpdateItemPosition={offerings.updateItemPosition}
          onUpdateTableForward={audit.table.setForward}
          memorial={halls.memorial}
          onEditMemorial={() => setIsMemorialEditorOpen(true)}
          stageInsets={stageInsets}
        />
      </div>

      {/* Top Header & Quick Environment Bar */}
      <TopBar
        currentUser={currentUser}
        onRequestAuth={onRequestAuth}
        lighting={ambience.lighting}
        onUpdateLighting={ambience.updateLighting}
        soundEnabled={ambience.soundEnabled}
        onToggleSound={ambience.toggleSound}
        onOpenSettings={ambience.openEnvironmentDrawer}
      />

      {/* Floating Toast */}
      {toastMessage && (
        <div className="absolute top-16 z-50 animate-in fade-in slide-in-from-top-3 duration-300 flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900/90 backdrop-blur-md text-amber-100 text-xs shadow-xl border border-amber-500/30 pointer-events-none">
          <Sparkles size={14} className="text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Core Simulation Stage (已全部迁至 Pixi：壁构 / 遗像 / 光束 / 浮尘 / 地坪，此处仅作占位与定位父级) */}
      <div
        ref={stageRef}
        className="relative w-full flex-1 flex flex-col items-center justify-center overflow-hidden pointer-events-none"
      >
        {/* Layer 1: Sacred Altar Back Wall — 已由 SceneCanvas 内的 Pixi SceneBackgroundLayer 接管渲染 */}

        {/* Layer 2: Volumetric Rays — 已由 SceneCanvas 内的 Pixi GodRaysLayer 接管（加色混合 + 视差） */}

        {/* Layer 3: Floating Dust Motes — 已由 SceneCanvas 内的 Pixi DustMotesLayer 接管（共用 Ticker） */}

        {/* Layer 4: Perspective Flooring — 由 SceneCanvas 内的 Pixi FloorLayer 渲染 */}

        {/* Layer 5: Sacred Memorial Portrait Frame — 已由 SceneCanvas 内的 Pixi MemorialPortraitLayer 接管
            （光晕 / 金环缠枝 / 圆形遗像 / 悬停提示 / 堂号题名全量 Pixi 渲染，随 portraitLayer 视差微动） */}

        {/* Layer 5.5: 🔍 专项审计模式控制胶囊 (支持拖拽改变位置，支持关闭) */}
        {audit.isAuditMode && <AuditStage {...audit.auditProps} />}
      </div>

      {/* Bottom Navigation Dock (献花 / 供果 / 点烛 / 置台 / 氛围 / 祈愿) */}
      <BottomDock
        onOpenFlowers={offerings.openFlowerPicker}
        currentFlower={offerings.currentFlower}
        onOpenFruits={offerings.openFruitPicker}
        onToggleCandles={offerings.toggleAllCandles}
        candlesLit={Boolean(items.candle_left?.isLit || items.candle_right?.isLit)}
        onToggleArrangeMode={() => setIsArrangeMode(!isArrangeMode)}
        isArrangeMode={isArrangeMode}
        onOpenLighting={ambience.openEnvironmentDrawer}
        onOpenBlessing={() => openBlessing({ onSubmitBlessing: offerings.handleBlessingSubmit })}
      />

      {/* 牌位编辑弹窗：由 Pixi 遗像层点击触发 */}
      {isMemorialEditorOpen && (
        <MemorialEditModal
          isOpen
          onClose={() => setIsMemorialEditorOpen(false)}
          info={halls.memorial}
          onUpdateInfo={(up) => halls.setMemorial((prev) => ({ ...prev, ...up }))}
        />
      )}
    </main>
  );
};
