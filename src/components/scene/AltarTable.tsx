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
import { AltarTableSvg } from './AltarTableSvg';

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
      } else if (action === 'toggle_vase_style' || action === 'toggle_vase' || action === 'click') {
        onToggleVase?.(id);
      }
    },
    onRemove: () => onRemoveItem?.(id),
  });

  return (
    <div
      onPointerDown={(e) => onPointerDown(id, e)}
      onContextMenu={(e) => e.preventDefault()}
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
        <AltarTableSvg
          tableclothStyle={tableclothStyle}
          showTableRunner={showTableRunner}
          showPetals={showPetals}
          shadowTiltX={shadowTiltX}
        />
      </div>
    </div>
  );
};

export const AltarTable = React.memo(DraggableAltarTableComponent);
export const DraggableAltarTable = AltarTable;
