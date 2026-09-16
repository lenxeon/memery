/**
 * @file AltarTable.tsx
 * @description 供桌核心舞台容器，负责管理案台插槽网格、物品摆放布局及木纹底座渲染。
 */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SceneItem, SceneItemId, LightingSettings, EntityTypeId, GameItemData, TableclothStyle } from '../../types';
import { itemRegistry } from '../../game/factories/AbstractItemFactory';
import { sound } from '../../utils/audio';
import { RotateCcw } from 'lucide-react';

import {
  TableclothTheme,
  TABLECLOTH_THEMES,
  getTableclothModule,
  TableclothTopSurface,
  TableclothFrontValance,
  getFrontDrapePath,
} from '../offerings/tablecloth';

export { TABLECLOTH_THEMES, getFrontDrapePath };
export type { TableclothTheme };

export interface AltarTableProps {
  items: Record<SceneItemId, SceneItem>;
  onUpdateItemPosition: (id: SceneItemId, pos: { x: number; y: number }) => void;
  onToggleItemLit: (id: SceneItemId) => void;
  onResetLayout: () => void;
  onRemoveItem?: (id: SceneItemId) => void;
  onToggleFruit?: (id: SceneItemId) => void;
  onToggleVase?: (id: SceneItemId) => void;
  showTableRunner?: boolean;
  tableclothStyle?: TableclothStyle;
  showPetals?: boolean;
  lighting: LightingSettings;
  isArrangeMode: boolean;
}

export type DraggableAltarTableProps = AltarTableProps;

interface AltarItemSlotProps {
  id: SceneItemId;
  item: SceneItem;
  isDragging: boolean;
  tableScale: number;
  shadowTiltX: number;
  isArrangeMode: boolean;
  lighting: LightingSettings;
  onPointerDown: (id: SceneItemId, e: React.PointerEvent) => void;
  onToggleItemLit: (id: SceneItemId) => void;
  onToggleFruit?: (id: SceneItemId) => void;
  onToggleVase?: (id: SceneItemId) => void;
  onRemoveItem?: (id: SceneItemId) => void;
}

const AltarItemSlot = React.memo<AltarItemSlotProps>(({
  id,
  item,
  isDragging,
  tableScale,
  shadowTiltX,
  isArrangeMode,
  lighting,
  onPointerDown,
  onToggleItemLit,
  onToggleFruit,
  onToggleVase,
  onRemoveItem,
}) => {
  const posX = item.position.x * tableScale;
  const posY = item.position.y * tableScale;
  const perspectiveScale = (1 + (item.position.y / 80) * 0.08) * Math.max(0.72, tableScale);

  const inferredType: EntityTypeId = (item.type || (
    id.startsWith('offered_flower') ? 'flower' :
    id.startsWith('vase') ? 'vase' :
    id.startsWith('candle') ? 'candle' :
    id === 'censer' ? 'censer' :
    id.startsWith('fruit') ? 'fruit' :
    id === 'tea_cups' ? 'tea_cups' :
    id === 'singing_bowl' ? 'singing_bowl' : 'flower'
  )) as EntityTypeId;
  const shadowProps = itemRegistry.getShadowProps({ ...item, type: inferredType }, tableScale);
  const shadowSize = shadowProps.size;
  const shadowSpread = shadowProps.spread;

  const entityItem: GameItemData = { ...item, type: inferredType };

  const content = itemRegistry.renderItem({
    item: entityItem,
    lighting,
    isDragging,
    onInteract: (action) => {
      if (action === 'toggle_lit') {
        onToggleItemLit(id);
      } else if (action === 'toggle_fruit') {
        onToggleFruit?.(id);
      } else if (action === 'toggle_vase_style') {
        onToggleVase?.(id);
      }
    },
    onRemove: () => onRemoveItem?.(id),
  });

  return (
    <div
      onPointerDown={(e) => onPointerDown(id, e)}
      className={`absolute bottom-0 left-1/2 flex flex-col items-center pointer-events-auto cursor-grab active:cursor-grabbing ${
        isDragging ? 'z-50 scale-105' : 'z-20'
      }`}
      style={{
        transform: `translate3d(calc(-50% + ${posX}px), ${posY + (isDragging ? -10 : 0)}px, 0) scale(${perspectiveScale})`,
        transition: isDragging ? 'none' : 'transform 0.36s cubic-bezier(0.16, 1, 0.3, 1), scale 0.2s ease-out',
      }}
    >
      <div
        className="absolute bottom-1 rounded-[100%] pointer-events-none transition-all"
        style={{
          width: shadowSize,
          height: shadowSpread,
          background: 'radial-gradient(ellipse, rgba(50, 32, 16, 0.5) 0%, rgba(50, 32, 16, 0.2) 45%, transparent 75%)',
          transform: `translate(${shadowTiltX}px, ${4 + posY * 0.05}px) scale(${isDragging ? 1.3 : 1})`,
          opacity: isDragging ? 0.25 : 0.65,
        }}
      />
      {isArrangeMode && (
        <div className="absolute -inset-2 rounded-2xl border border-dashed border-amber-600/70 bg-amber-400/10 pointer-events-none animate-pulse" />
      )}
      {content}
    </div>
  );
});

export const DraggableAltarTableComponent: React.FC<DraggableAltarTableProps> = ({
  items,
  onUpdateItemPosition,
  onToggleItemLit,
  onResetLayout,
  onRemoveItem,
  onToggleFruit,
  onToggleVase,
  showTableRunner = true,
  tableclothStyle = 'autumn_gold',
  showPetals = true,
  lighting,
  isArrangeMode,
}) => {
  const tableclothModule = getTableclothModule(tableclothStyle);
  const theme = tableclothModule.theme;
  const [activeDragId, setActiveDragId] = useState<SceneItemId | null>(null);
  const dragStartRef = useRef<{ startX: number; startY: number; itemX: number; itemY: number } | null>(null);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const [tableScale, setTableScale] = useState(1);

  // Responsive scale tracker ensures items stay locked to the tabletop across all screen widths
  useEffect(() => {
    if (!tableRef.current) return;
    const el = tableRef.current;
    const updateScale = () => {
      const w = el.getBoundingClientRect().width;
      if (w > 0) {
        setTableScale(Math.min(1, w / 560));
      }
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, []);

  // Table surface limits in px
  const BOUNDS_X = 220;
  const BOUNDS_Y_MIN = -18; // further back on the 3D table surface
  const BOUNDS_Y_MAX = 24;  // front edge of table surface

  // Magnetic snapping thresholds (unscaled units)
  const SNAP_CENTER_X = 14;   // Snap to central axis (X = 0) within 14px
  const SNAP_MIRROR_X = 12;   // Snap to symmetrical partner within 12px
  const SNAP_DEPTH_Y = 6;     // Snap to partner depth within 6px

  const [snapInfo, setSnapInfo] = useState<{ type: 'center' | 'mirror'; x: number } | null>(null);

  const itemsRef = useRef(items);
  itemsRef.current = items;

  const handlePointerDown = useCallback((id: SceneItemId, e: React.PointerEvent) => {
    e.stopPropagation();
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setActiveDragId(id);
    const it = itemsRef.current[id];
    if (it) {
      dragStartRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        itemX: it.position.x,
        itemY: it.position.y,
      };
    }
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!activeDragId || !dragStartRef.current) return;
    const safeScale = Math.max(0.4, tableScale);
    const dx = (e.clientX - dragStartRef.current.startX) / safeScale;
    const dy = (e.clientY - dragStartRef.current.startY) / safeScale;

    let newX = dragStartRef.current.itemX + dx;
    let newY = dragStartRef.current.itemY + dy;

    newX = Math.max(-BOUNDS_X, Math.min(BOUNDS_X, newX));
    newY = Math.max(BOUNDS_Y_MIN, Math.min(BOUNDS_Y_MAX, newY));

    let currentSnap: { type: 'center' | 'mirror'; x: number } | null = null;

    // 1. Center Axis Snap for Censer (or any item brought to center)
    if (Math.abs(newX) < SNAP_CENTER_X) {
      newX = 0;
      currentSnap = { type: 'center', x: 0 };
    }

    // 2. Symmetrical Mirror Snap for Candle Pairs
    if (activeDragId === 'candle_left' && items.candle_right) {
      const mirrorTargetX = -items.candle_right.position.x;
      if (Math.abs(newX - mirrorTargetX) < SNAP_MIRROR_X) {
        newX = mirrorTargetX;
        currentSnap = { type: 'mirror', x: newX };
      }
      if (Math.abs(newY - items.candle_right.position.y) < SNAP_DEPTH_Y) {
        newY = items.candle_right.position.y;
      }
    } else if (activeDragId === 'candle_right' && items.candle_left) {
      const mirrorTargetX = -items.candle_left.position.x;
      if (Math.abs(newX - mirrorTargetX) < SNAP_MIRROR_X) {
        newX = mirrorTargetX;
        currentSnap = { type: 'mirror', x: newX };
      }
      if (Math.abs(newY - items.candle_left.position.y) < SNAP_DEPTH_Y) {
        newY = items.candle_left.position.y;
      }
    }

    // 3. Symmetrical Mirror Snap for Vase Pairs
    if (activeDragId === 'vase_left' && items.vase_right) {
      const mirrorTargetX = -items.vase_right.position.x;
      if (Math.abs(newX - mirrorTargetX) < SNAP_MIRROR_X) {
        newX = mirrorTargetX;
        currentSnap = { type: 'mirror', x: newX };
      }
      if (Math.abs(newY - items.vase_right.position.y) < SNAP_DEPTH_Y) {
        newY = items.vase_right.position.y;
      }
    } else if (activeDragId === 'vase_right' && items.vase_left) {
      const mirrorTargetX = -items.vase_left.position.x;
      if (Math.abs(newX - mirrorTargetX) < SNAP_MIRROR_X) {
        newX = mirrorTargetX;
        currentSnap = { type: 'mirror', x: newX };
      }
      if (Math.abs(newY - items.vase_left.position.y) < SNAP_DEPTH_Y) {
        newY = items.vase_left.position.y;
      }
    }

    setSnapInfo(currentSnap);
    onUpdateItemPosition(activeDragId, { x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (activeDragId) {
      sound.playWoodPlacement();
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      setActiveDragId(null);
      dragStartRef.current = null;
      setSnapInfo(null);
    }
  };

  // Depth sort based on Y position (items with smaller Y are further back, rendered first)
  const sortedItemIds: SceneItemId[] = Object.keys(items)
    .sort((a, b) => (items[a]?.position.y || 0) - (items[b]?.position.y || 0));

  const isSymmetrical = 
    Math.abs(items.censer?.position.x || 0) <= 2 &&
    Math.abs((items.candle_left?.position.x || 0) + (items.candle_right?.position.x || 0)) <= 2 &&
    Math.abs((items.vase_left?.position.x || 0) + (items.vase_right?.position.x || 0)) <= 2;

  const sunAngle = lighting.sunAngle;
  const shadowTiltX = -sunAngle * 0.45;

  return (
    <div 
      className="relative w-full max-w-[560px] flex flex-col items-center justify-end select-none pointer-events-auto"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Symmetrical Reset Icon Button */}
      <div className="absolute -top-9 inset-x-0 flex justify-end px-2 pointer-events-auto z-40">
        <button
          type="button"
          onClick={onResetLayout}
          title="对称复位（花、烛、香对齐中轴）"
          aria-label="对称复位"
          className={`w-7 h-7 flex items-center justify-center rounded-full border shadow-xs transition-all cursor-pointer active:scale-90 ${
            isSymmetrical 
              ? 'bg-white/85 hover:bg-white text-stone-600 hover:text-stone-900 border-stone-200/80' 
              : 'bg-amber-50/95 hover:bg-amber-100 text-amber-800 border-amber-300/90 shadow-amber-500/20 animate-pulse'
          }`}
        >
          <RotateCcw size={13} className={isSymmetrical ? '' : 'text-amber-700'} />
        </button>
      </div>

      {/* Unified Responsive Table & Items Container */}
      <div 
        ref={tableRef}
        className="relative w-full aspect-[560/160] select-none pointer-events-none z-20"
      >
        {/* Layer A: Draggable Items locked to the 3D tabletop surface plane */}
        {/* At aspect ratio 560/160, the wooden tabletop top plane is at bottom-[71%] */}
        <div className="absolute bottom-[71%] left-0 w-full h-0 pointer-events-none z-30">
          {/* Sacred Center Axis Guide Line & Snap Indicator */}
          {(isArrangeMode || snapInfo !== null) && (
            <div className="absolute -top-36 bottom-0 left-1/2 -translate-x-1/2 w-0 pointer-events-none z-10 flex flex-col items-center">
              <div className="w-[1px] h-44 bg-gradient-to-b from-amber-400/0 via-amber-400/80 to-amber-500/0 border-r border-dashed border-amber-400/70" />
              {snapInfo && (
                <div className="absolute -top-7 px-2.5 py-0.5 rounded-full bg-stone-900/90 text-[11px] font-medium text-amber-200 border border-amber-400/50 backdrop-blur-xs whitespace-nowrap shadow-lg animate-in fade-in zoom-in-95 duration-150 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  {snapInfo.type === 'center' ? '已精准吸附中轴' : '已严格对称对齐'}
                </div>
              )}
            </div>
          )}

          {sortedItemIds.map((id) => {
            const item = items[id];
            if (!item) return null;

            return (
              <AltarItemSlot
                key={id}
                id={id}
                item={item}
                isDragging={activeDragId === id}
                tableScale={tableScale}
                shadowTiltX={shadowTiltX}
                isArrangeMode={isArrangeMode}
                lighting={lighting}
                onPointerDown={handlePointerDown}
                onToggleItemLit={onToggleItemLit}
                onToggleFruit={onToggleFruit}
                onToggleVase={onToggleVase}
                onRemoveItem={onRemoveItem}
              />
            );
          })}
        </div>

        {/* Layer B: Ultra-Realistic 3D Japanese Zen Wooden Altar Table (榻榻米供案) */}
        <svg 
          viewBox="0 0 560 160" 
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            {/* 1. Top Tabletop Surface Gradient (Sunlit warm blonde oak wood) */}
            <linearGradient id="woodTableTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f3e5d3" />
              <stop offset="25%" stopColor="#faecd8" />
              <stop offset="65%" stopColor="#eed7bf" />
              <stop offset="100%" stopColor="#dfc3a3" />
            </linearGradient>

            {/* 2. Top Edge Chamfer / Specular Highlight (The bright golden edge in reference image) */}
            <linearGradient id="bevelSpecularGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#eedcc7" />
              <stop offset="20%" stopColor="#fff8ee" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="80%" stopColor="#fff8ee" />
              <stop offset="100%" stopColor="#eedcc7" />
            </linearGradient>

            {/* 3. Front Vertical Tabletop Slab Face (Solid thick wood with fiber shading) */}
            <linearGradient id="frontSlabGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d8b997" />
              <stop offset="35%" stopColor="#caa47c" />
              <stop offset="80%" stopColor="#b68e65" />
              <stop offset="100%" stopColor="#96724a" />
            </linearGradient>

            {/* 4. Left & Right Tabletop Endgrain Cuts */}
            <linearGradient id="endgrainLeft" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d1b18e" />
              <stop offset="100%" stopColor="#9d7751" />
            </linearGradient>
            <linearGradient id="endgrainRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d1b18e" />
              <stop offset="100%" stopColor="#9d7751" />
            </linearGradient>

            {/* 5. Recessed Under-Apron Panel Gradient (Warm shadow with vertical wood grain) */}
            <linearGradient id="apronPanelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#755234" />
              <stop offset="15%" stopColor="#a37c56" />
              <stop offset="55%" stopColor="#be976f" />
              <stop offset="90%" stopColor="#aa835b" />
              <stop offset="100%" stopColor="#684729" />
            </linearGradient>

            {/* 6. Pedestal Legs Solid Blocks (Left and Right supports) */}
            <linearGradient id="legBlockGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8d6844" />
              <stop offset="30%" stopColor="#be966f" />
              <stop offset="70%" stopColor="#ca9f75" />
              <stop offset="100%" stopColor="#9b734c" />
            </linearGradient>

            {/* 7. Soft Ambient Floor Shadow Gradient (Zero blur penalty) */}
            <radialGradient id="tableFloorShadowGrad" cx="50%" cy="50%" rx="50%" ry="50%">
              <stop offset="0%" stopColor="#3a2211" stopOpacity="0.58" />
              <stop offset="55%" stopColor="#3a2211" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#3a2211" stopOpacity="0" />
            </radialGradient>

            {/* 8. Brocade Silk Table Runner Gradients (Backwards compatible) */}
            <linearGradient id="brocadeRunnerTop" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9a6e2e" />
              <stop offset="15%" stopColor="#d4a34b" />
              <stop offset="50%" stopColor="#f7d488" />
              <stop offset="85%" stopColor="#d4a34b" />
              <stop offset="100%" stopColor="#9a6e2e" />
            </linearGradient>
            <linearGradient id="brocadeRunnerFront" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ca9842" />
              <stop offset="35%" stopColor="#dfb25d" />
              <stop offset="75%" stopColor="#aa792c" />
              <stop offset="100%" stopColor="#6e4915" />
            </linearGradient>
            <linearGradient id="goldFringe" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>

            {/* ══════════════════════════════════════════════════════════════════
                1. 材质微纹理贴图库 (6大专属织物物理机理，彻底告别单调与塑料感)
               ══════════════════════════════════════════════════════════════════ */}

            {/* [材质 1]: 真丝重缎 (Satin Silk Weave) - 斜纹细密经纬缎光，典雅微反光 */}
            <pattern id="weaveSatinSilk" width="16" height="16" patternUnits="userSpaceOnUse">
              <rect width="16" height="16" fill="none" />
              <path d="M 0 0 L 16 16 M 0 8 L 8 16 M 8 0 L 16 8" stroke="rgba(255,255,255,0.28)" strokeWidth="1.2" />
              <line x1="0" y1="4" x2="16" y2="4" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" />
              <line x1="0" y1="12" x2="16" y2="12" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" />
            </pattern>

            {/* [材质 2]: 苎麻粗布 (Coarse Slub Linen Weave) - 粗粝竹节麻纱、孔隙交织，复刻参考图1 */}
            <pattern id="weaveCoarseLinen" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="none" />
              <rect x="0" y="0" width="20" height="10" fill="rgba(0,0,0,0.16)" />
              <rect x="0" y="10" width="20" height="10" fill="rgba(255,255,255,0.18)" />
              <rect x="0" y="0" width="10" height="20" fill="rgba(255,255,255,0.22)" />
              <rect x="10" y="0" width="10" height="20" fill="rgba(0,0,0,0.16)" />
              {/* Slub yarn nodules (麻丝竹节粗节与凹凸结子) */}
              <ellipse cx="5" cy="4" rx="4.5" ry="2" fill="rgba(255,255,255,0.45)" />
              <ellipse cx="15" cy="14" rx="4.8" ry="2.2" fill="rgba(0,0,0,0.32)" />
              <line x1="0" y1="3" x2="20" y2="3" stroke="rgba(0,0,0,0.3)" strokeWidth="1.4" />
              <line x1="0" y1="13" x2="20" y2="13" stroke="rgba(255,255,255,0.42)" strokeWidth="1.4" />
              <line x1="3" y1="0" x2="3" y2="20" stroke="rgba(255,255,255,0.42)" strokeWidth="1.4" />
              <line x1="13" y1="0" x2="13" y2="20" stroke="rgba(0,0,0,0.3)" strokeWidth="1.4" />
            </pattern>

            {/* [材质 3]: 重工红呢漳缎 (Velvet Plush Nap) - 密绒磨毛微粒质感，厚实温润 */}
            <pattern id="weaveVelvetWool" width="16" height="16" patternUnits="userSpaceOnUse">
              <rect width="16" height="16" fill="none" />
              <circle cx="4" cy="4" r="2.2" fill="rgba(255,255,255,0.25)" />
              <circle cx="12" cy="12" r="2.2" fill="rgba(255,255,255,0.22)" />
              <circle cx="12" cy="4" r="1.8" fill="rgba(0,0,0,0.22)" />
              <circle cx="4" cy="12" r="1.8" fill="rgba(0,0,0,0.22)" />
              <circle cx="8" cy="8" r="2.6" fill="rgba(255,220,120,0.32)" />
              <line x1="2" y1="6" x2="6" y2="2" stroke="rgba(255,255,255,0.2)" strokeWidth="1.1" />
              <line x1="10" y1="14" x2="14" y2="10" stroke="rgba(255,255,255,0.2)" strokeWidth="1.1" />
            </pattern>

            {/* [材质 4]: 冰丝生绢绉纱 (Sheer Crepe Organza) - 轻盈通透微横绉波，仙风道骨 */}
            <pattern id="weaveSheerCrepe" width="20" height="12" patternUnits="userSpaceOnUse">
              <rect width="20" height="12" fill="none" />
              <path d="M 0 3 Q 5 1, 10 3 T 20 3" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" />
              <path d="M 0 9 Q 5 7, 10 9 T 20 9" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1.0" />
              <line x1="5" y1="0" x2="5" y2="12" stroke="rgba(255,255,255,0.28)" strokeWidth="0.8" strokeDasharray="2,2" />
              <line x1="15" y1="0" x2="15" y2="12" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" strokeDasharray="2,2" />
            </pattern>

            {/* [材质 5]: 沉香宋锦菱格 (Song Brocade Diamond Twill) - 雅宋几何经纬互结提花骨架 */}
            <pattern id="weaveSongBrocade" width="24" height="24" patternUnits="userSpaceOnUse">
              <rect width="24" height="24" fill="none" />
              <polygon points="12,2 22,12 12,22 2,12" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4" />
              <circle cx="12" cy="12" r="2.6" fill="rgba(255,230,150,0.4)" />
              <line x1="0" y1="0" x2="24" y2="24" stroke="rgba(0,0,0,0.18)" strokeWidth="1.0" />
              <line x1="24" y1="0" x2="0" y2="24" stroke="rgba(0,0,0,0.18)" strokeWidth="1.0" />
            </pattern>

            {/* [材质 6]: 盘金缂丝捻金线 (Gold-Couching Kesi Brocade) - 金属线微凸棱脊与高光 */}
            <pattern id="weaveKesiGold" width="20" height="16" patternUnits="userSpaceOnUse">
              <rect width="20" height="16" fill="none" />
              <rect x="0" y="0" width="20" height="6" fill="rgba(255,215,0,0.24)" />
              <rect x="0" y="6" width="20" height="10" fill="rgba(0,0,0,0.22)" />
              <line x1="0" y1="3" x2="20" y2="3" stroke="rgba(255,245,170,0.8)" strokeWidth="1.6" />
              <line x1="0" y1="5" x2="20" y2="5" stroke="rgba(110,50,5,0.4)" strokeWidth="1.0" />
              <line x1="0" y1="11" x2="20" y2="11" stroke="rgba(255,245,170,0.5)" strokeWidth="1.2" />
              <line x1="5" y1="0" x2="5" y2="16" stroke="rgba(255,255,255,0.4)" strokeWidth="1.0" strokeDasharray="3,3" />
              <line x1="15" y1="0" x2="15" y2="16" stroke="rgba(255,255,255,0.4)" strokeWidth="1.0" strokeDasharray="3,3" />
            </pattern>

            {/* [材质 7]: 暖念金绫织锦机理 (Warm Gold Brocade Weave) */}
            <pattern id="weaveGoldBrocade" width="16" height="16" patternUnits="userSpaceOnUse">
              <rect width="16" height="16" fill="none" />
              <line x1="0" y1="0" x2="16" y2="16" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
              <line x1="16" y1="0" x2="0" y2="16" stroke="rgba(80,45,10,0.1)" strokeWidth="0.8" />
            </pattern>

            {/* ══════════════════════════════════════════════════════════════════
                2. 边饰锦带贴图库 (6款各具风骨的传统经典织锦滚边)
               ══════════════════════════════════════════════════════════════════ */}

            {/* [边饰 1]: 金绫万字回纹锦带 (Autumn Gold Meander - 参考图金地浓墨万字回纹) */}
            <pattern id="borderMeanderGold" width="28" height="14" patternUnits="userSpaceOnUse">
              <rect width="28" height="14" fill="#cca74f" />
              {/* 上下细金边线 */}
              <line x1="0" y1="0.8" x2="28" y2="0.8" stroke="#24170d" strokeWidth="1.2" />
              <line x1="0" y1="13.2" x2="28" y2="13.2" stroke="#24170d" strokeWidth="1.2" />
              {/* 连环万字双回纹 (工整深墨线条) */}
              <path
                d="M 0 7 L 7 7 L 7 2.5 L 14 2.5 L 14 7 L 21 7 L 21 2.5 L 28 2.5 M 7 7 L 7 11.5 L 14 11.5 L 14 7 M 21 7 L 21 11.5 L 28 11.5"
                fill="none"
                stroke="#24170d"
                strokeWidth="1.8"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </pattern>

            {/* [边饰 2]: 素白抽纱人字边 (Indigo Linen Hemstitch) - 对应图1素白编织边 */}
            <pattern id="borderIndigoHemstitch" width="20" height="14" patternUnits="userSpaceOnUse">
              <rect width="20" height="14" fill="#111a26" />
              <line x1="0" y1="2" x2="20" y2="2" stroke="#ffffff" strokeWidth="1.2" />
              <line x1="0" y1="12" x2="20" y2="12" stroke="#ffffff" strokeWidth="1.2" />
              <path d="M 0 7 L 5 2 L 10 7 L 15 2 L 20 7 M 0 7 L 5 12 L 10 7 L 15 12 L 20 7" fill="none" stroke="#ffffff" strokeWidth="1.6" />
            </pattern>

            {/* [边饰 3]: 泥金万字不到头锦纹 (Cinnabar Wan Fretwork) */}
            <pattern id="borderWanFretwork" width="24" height="14" patternUnits="userSpaceOnUse">
              <rect width="24" height="14" fill="#2a0c0d" />
              <path d="M 0 7 L 7 7 L 7 2 L 13 2 L 13 7 L 21 7 M 13 7 L 13 12 L 19 12" fill="none" stroke="#fcd34d" strokeWidth="1.8" strokeLinecap="square" />
            </pattern>

            {/* [边饰 4]: 素银如意流云纹 (Moonlight Silver Ruyi) */}
            <pattern id="borderSilverRuyi" width="24" height="14" patternUnits="userSpaceOnUse">
              <rect width="24" height="14" fill="#3b3732" />
              <path d="M 0 7 Q 6 2, 12 7 Q 18 12, 24 7" fill="none" stroke="#ffffff" strokeWidth="1.8" />
              <circle cx="12" cy="7" r="2.2" fill="#ffffff" />
            </pattern>

            {/* [边饰 5]: 宋式八达晕菱花金边 (Evergreen Song Rosette) */}
            <pattern id="borderSongRosette" width="24" height="14" patternUnits="userSpaceOnUse">
              <rect width="24" height="14" fill="#111f17" />
              <polygon points="6,7 12,2 18,7 12,12" fill="none" stroke="#eab308" strokeWidth="1.8" />
              <circle cx="12" cy="7" r="1.8" fill="#eab308" />
              <line x1="0" y1="7" x2="6" y2="7" stroke="#eab308" strokeWidth="1.2" />
              <line x1="18" y1="7" x2="24" y2="7" stroke="#eab308" strokeWidth="1.2" />
            </pattern>

            {/* [边饰 6]: 盛唐盘金连珠宝相卷草 (Sandalwood Tang Lotus & Pearl) */}
            <pattern id="borderTangLotus" width="24" height="14" patternUnits="userSpaceOnUse">
              <rect width="24" height="14" fill="#210e1e" />
              <circle cx="4" cy="7" r="2.2" fill="#fbbf24" />
              <circle cx="20" cy="7" r="2.2" fill="#fbbf24" />
              <path d="M 6 7 Q 12 2, 18 7 Q 12 12, 6 7 Z" fill="none" stroke="#fbbf24" strokeWidth="1.6" />
            </pattern>

            {/* ── Fabric Color Gradients (6大主题定制面料质感色彩) ── */}
            {/* 台面贡缎主色 */}
            <linearGradient id="brocadeGoldTop" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={theme.topGrad[0]} />
              <stop offset="25%" stopColor={theme.topGrad[1]} />
              <stop offset="65%" stopColor={theme.topGrad[2]} />
              <stop offset="100%" stopColor={theme.topGrad[3]} />
            </linearGradient>

            {/* 前垂围幔丝绸跌落光感 */}
            <linearGradient id="brocadeGoldDrape" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={theme.drapeGrad[0]} />
              <stop offset="15%" stopColor={theme.drapeGrad[1]} />
              <stop offset="60%" stopColor={theme.drapeGrad[2]} />
              <stop offset="88%" stopColor={theme.drapeGrad[3]} />
              <stop offset="100%" stopColor={theme.drapeGrad[4]} />
            </linearGradient>

            {/* 桌角自然对折阴影 */}
            <linearGradient id="cornerDropShadowLeft" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={theme.cornerShadow[0]} />
              <stop offset="70%" stopColor={theme.cornerShadow[1]} />
              <stop offset="100%" stopColor={theme.cornerShadow[2]} />
            </linearGradient>
            <linearGradient id="cornerDropShadowRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={theme.cornerShadow[0]} />
              <stop offset="70%" stopColor={theme.cornerShadow[1]} />
              <stop offset="100%" stopColor={theme.cornerShadow[2]} />
            </linearGradient>

            {/* 珠宝/琥珀玉珠吊坠高光渐变 */}
            <radialGradient id="amberPendantGrad" cx="35%" cy="30%" rx="65%" ry="65%">
              <stop offset="0%" stopColor={theme.pendantBeadGrad[0]} />
              <stop offset="35%" stopColor={theme.pendantBeadGrad[1]} />
              <stop offset="75%" stopColor={theme.pendantBeadGrad[2]} />
              <stop offset="100%" stopColor={theme.pendantBeadGrad[3]} />
            </radialGradient>

            {/* 下摆挂穗流苏渐变 */}
            <linearGradient id="goldFringeFull" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={theme.fringeGrad[0]} />
              <stop offset="60%" stopColor={theme.fringeGrad[1]} />
              <stop offset="100%" stopColor={theme.fringeGrad[2]} />
            </linearGradient>

            {/* 桌面丝绸光泽横向水波纹 */}
            <linearGradient id="tableclothSheenWave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="35%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="65%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* === UNDER-STRUCTURE (Recessed Base & Pedestal Legs) === */}
          {/* Base apron container: sits inward from x=55 to x=505, y=55 to y=135 */}
          <g id="tableBaseStructure">
            {/* Recessed Back Slat Panels (3 panels divided by 2 shadow grooves as in reference image) */}
            <rect x="58" y="55" width="444" height="80" rx="3" fill="url(#apronPanelGrad)" />

            {/* 3 vertical panels texture highlights */}
            <rect x="62" y="55" width="140" height="80" fill="rgba(255, 235, 205, 0.05)" />
            <rect x="210" y="55" width="140" height="80" fill="rgba(255, 235, 205, 0.07)" />
            <rect x="358" y="55" width="140" height="80" fill="rgba(255, 235, 205, 0.05)" />

            {/* 2 Dark Vertical Shadow Grooves between panels */}
            <line x1="205" y1="55" x2="205" y2="135" stroke="#48301c" strokeWidth="3" />
            <line x1="207" y1="55" x2="207" y2="135" stroke="#dfc09c" strokeWidth="1" opacity="0.6" />

            <line x1="353" y1="55" x2="353" y2="135" stroke="#48301c" strokeWidth="3" />
            <line x1="355" y1="55" x2="355" y2="135" stroke="#dfc09c" strokeWidth="1" opacity="0.6" />

            {/* Left Sturdy Pedestal Leg (厚实左立柱台墩) */}
            <rect x="52" y="55" width="48" height="82" rx="2" fill="url(#legBlockGrad)" />
            {/* Left leg front bevel highlight */}
            <line x1="53" y1="55" x2="53" y2="137" stroke="#edd4b8" strokeWidth="1.2" opacity="0.8" />
            {/* Left leg shadow corner */}
            <rect x="96" y="55" width="5" height="82" fill="#4d321c" opacity="0.45" />

            {/* Right Sturdy Pedestal Leg (厚实右立柱台墩) */}
            <rect x="460" y="55" width="48" height="82" rx="2" fill="url(#legBlockGrad)" />
            {/* Right leg front bevel highlight */}
            <line x1="461" y1="55" x2="461" y2="137" stroke="#edd4b8" strokeWidth="1.2" opacity="0.8" />
            {/* Right leg inner shadow */}
            <rect x="460" y="55" width="5" height="82" fill="#4d321c" opacity="0.45" />

            {/* Bottom Plinth Floor Contact Rail */}
            <rect x="52" y="132" width="456" height="5" rx="1" fill="#6e4c2b" />

            {/* Deep Ambient Occlusion Shadow cast under tabletop onto base */}
            <rect x="52" y="55" width="456" height="14" fill="#2d1b0d" opacity="0.65" />
          </g>

          {/* === UPPER TABLETOP SLAB (Thick Solid Wood with 3D Perspective Plane) === */}
          <g id="tableTopSlab">
            {/* 1. Perspective Top Surface Plane (where items rest) */}
            {/* Polygon with perspective: back width=536px (from x=12 to 548), front width=552px (from x=4 to 556) */}
            <polygon
              points="14,16 546,16 556,52 4,52"
              fill="url(#woodTableTopGrad)"
              stroke="#cfb290"
              strokeWidth="0.8"
            />

            {/* Top surface natural subtle wood grain lines */}
            <path d="M 25 24 Q 280 23 535 24" stroke="#e0c4a4" strokeWidth="0.9" fill="none" opacity="0.75" />
            <path d="M 18 33 Q 280 32 542 33" stroke="#e0c4a4" strokeWidth="1.0" fill="none" opacity="0.7" />
            <path d="M 12 42 Q 280 41 548 42" stroke="#e0c4a4" strokeWidth="1.1" fill="none" opacity="0.65" />

            {/* Top surface sunny sheen wash in center */}
            <ellipse cx="280" cy="34" rx="210" ry="14" fill="#fff9ef" opacity="0.35" />

            {/* ── Imperial Jacquard & Artisanal Tablecloth (真实材质织法 · 专属印花提花 · 3D桌角悬垂) ── */}
            {showTableRunner && (
              <TableclothTopSurface
                theme={theme}
                MotifComponent={tableclothModule.MotifComponent}
              />
            )}

            {/* ── Scattered Flower Petals on Tabletop (案面散落花瓣) ── */}
            {showPetals && (
              <g id="scatteredTablePetals">
                {/* Petal 1: Left peony pink petal */}
                <ellipse cx="132" cy="46" rx="4.5" ry="2.2" fill="#2d1a0e" opacity="0.3" transform="rotate(25 132 46)" />
                <path d="M 130 42 C 136 40, 138 48, 131 47 C 127 46, 127 43, 130 42 Z" fill="#f472b6" />

                {/* Petal 2: Left-mid lily white petal */}
                <ellipse cx="178" cy="48" rx="5" ry="2.2" fill="#2d1a0e" opacity="0.28" transform="rotate(-15 178 48)" />
                <ellipse cx="178" cy="47" rx="4.5" ry="2" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.5" transform="rotate(-15 178 47)" />

                {/* Petal 3: Center-left peony petal */}
                <ellipse cx="236" cy="49" rx="4" ry="1.8" fill="#2d1a0e" opacity="0.25" transform="rotate(35 236 49)" />
                <ellipse cx="236" cy="48" rx="3.6" ry="1.8" fill="#fda4af" transform="rotate(35 236 48)" />

                {/* Petal 4: Center-right lily petal */}
                <ellipse cx="376" cy="48" rx="5" ry="2" fill="#2d1a0e" opacity="0.28" transform="rotate(20 376 48)" />
                <ellipse cx="376" cy="47" rx="4.6" ry="2" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.5" transform="rotate(20 376 47)" />

                {/* Petal 5: Right peony petal */}
                <ellipse cx="426" cy="46" rx="4.2" ry="2" fill="#2d1a0e" opacity="0.3" transform="rotate(-30 426 46)" />
                <path d="M 424 43 C 430 41, 432 48, 425 47 C 421 46, 421 44, 424 43 Z" fill="#f472b6" />
              </g>
            )}

            {/* ── Front Face: Tablecloth Valance or Bare Solid Wood Slab ── */}
            {showTableRunner ? (
              <TableclothFrontValance
                style={tableclothStyle}
                theme={theme}
                drapePath={tableclothModule.getFrontDrapePath()}
                CenterpieceComponent={tableclothModule.CenterpieceComponent}
              />
            ) : (
              /* 素木桌面时：完整展示纯实木前沿厚板与木纹 */
              <g id="bareWoodFrontSlab">
                {/* 2. Front Chamfer Bevel Highlight (The bright horizontal light strip) */}
                <polygon
                  points="4,52 556,52 556,54.5 4,54.5"
                  fill="url(#bevelSpecularGrad)"
                />

                {/* 3. Front Vertical Face of Tabletop (Thick solid slab) */}
                <rect
                  x="4"
                  y="54"
                  width="552"
                  height="20"
                  rx="1.5"
                  fill="url(#frontSlabGrad)"
                />

                {/* Vertical grain texture lines on front slab face */}
                {Array.from({ length: 18 }).map((_, i) => (
                  <line
                    key={i}
                    x1={20 + i * 30}
                    y1="54"
                    x2={20 + i * 30}
                    y2="74"
                    stroke="rgba(75, 45, 20, 0.12)"
                    strokeWidth="1.2"
                  />
                ))}
              </g>
            )}

            {/* Bottom edge shadow line of tabletop */}
            <line x1="4" y1="74" x2="556" y2="74" stroke="#52361d" strokeWidth="1.5" />

            {/* Left & Right angled end-grain corner bevels */}
            <polygon points="14,16 4,52 4,74 8,74 16,16" fill="url(#endgrainLeft)" opacity="0.6" />
            <polygon points="546,16 556,52 556,74 552,74 544,16" fill="url(#endgrainRight)" opacity="0.6" />
          </g>

          {/* === FLOOR CONTACT SHADOW & AMBIENT OCCLUSION === */}
          {/* Contact shadow where the table feet touch the floor planks */}
          <ellipse cx="76" cy="139" rx="38" ry="4.5" fill="#201208" opacity="0.85" />
          <ellipse cx="484" cy="139" rx="38" ry="4.5" fill="#201208" opacity="0.85" />
          <rect x="74" y="137" width="412" height="4" rx="2" fill="#201208" opacity="0.75" />

          {/* Soft cast shadow extending outward onto floor */}
          <ellipse
            cx={280 + shadowTiltX * 1.5}
            cy="146"
            rx="270"
            ry="12"
            fill="url(#tableFloorShadowGrad)"
          />
        </svg>
      </div>
    </div>
  );
};

export const AltarTable = React.memo(DraggableAltarTableComponent);
export const DraggableAltarTable = AltarTable;
