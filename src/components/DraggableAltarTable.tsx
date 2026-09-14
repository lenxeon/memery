import React, { useState, useRef, useEffect } from 'react';
import { SceneItem, SceneItemId, LightingSettings } from '../types';
import { ItemVase } from './ItemVase';
import { ItemOfferedBouquet } from './ItemOfferedBouquet';
import { ItemCenser } from './ItemCenser';
import { ItemCandle } from './ItemCandle';
import { sound } from '../utils/audio';
import { RotateCcw } from 'lucide-react';

interface DraggableAltarTableProps {
  items: Record<SceneItemId, SceneItem>;
  onUpdateItemPosition: (id: SceneItemId, pos: { x: number; y: number }) => void;
  onToggleItemLit: (id: SceneItemId) => void;
  onResetLayout: () => void;
  onRemoveItem?: (id: SceneItemId) => void;
  lighting: LightingSettings;
  isArrangeMode: boolean;
}

export const DraggableAltarTable: React.FC<DraggableAltarTableProps> = ({
  items,
  onUpdateItemPosition,
  onToggleItemLit,
  onResetLayout,
  onRemoveItem,
  lighting,
  isArrangeMode,
}) => {
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

  const handlePointerDown = (id: SceneItemId, e: React.PointerEvent) => {
    e.stopPropagation();
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setActiveDragId(id);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      itemX: items[id].position.x,
      itemY: items[id].position.y,
    };
  };

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

  const renderItemContent = (id: SceneItemId) => {
    const item = items[id];
    if (!item) return null;

    if (id.startsWith('offered_flower')) {
      return (
        <ItemOfferedBouquet
          flowerType={item.flowerType || 'lilies'}
          scale={0.96}
          isArrangeMode={isArrangeMode}
          onRemove={() => onRemoveItem?.(id)}
        />
      );
    }

    switch (id) {
      case 'vase_left':
        return (
          <ItemVase
            flowerType={item.flowerType || 'lilies'}
            scale={0.96}
            isRightSide={false}
          />
        );
      case 'vase_right':
        return (
          <div style={{ transform: 'scaleX(-1)' }}>
            <ItemVase
              flowerType={item.flowerType || 'lilies'}
              scale={0.96}
              isRightSide={true}
            />
          </div>
        );
      case 'censer':
        return (
          <ItemCenser
            isLit={!!items.censer?.isLit}
            onToggle={() => onToggleItemLit('censer')}
            windForce={lighting.windForce}
            density={lighting.masterOn ? 1 : 0.5}
            sunlightIntensity={lighting.sunlightIntensity}
            masterOn={lighting.masterOn}
            timeOfDay={lighting.timeOfDay}
            scale={0.98}
          />
        );
      case 'candle_left':
        return (
          <ItemCandle
            isLit={!!items.candle_left?.isLit}
            onToggle={() => onToggleItemLit('candle_left')}
            windForce={lighting.windForce}
            glowIntensity={lighting.candleGlowIntensity}
            scale={0.95}
          />
        );
      case 'candle_right':
        return (
          <ItemCandle
            isLit={!!items.candle_right?.isLit}
            onToggle={() => onToggleItemLit('candle_right')}
            windForce={lighting.windForce}
            glowIntensity={lighting.candleGlowIntensity}
            scale={0.95}
          />
        );
      default:
        return null;
    }
  };

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

            const isDragging = activeDragId === id;
            // Scale positions and sizes proportionally with tableScale to ensure items never fall off the table
            const posX = item.position.x * tableScale;
            const posY = item.position.y * tableScale;
            const perspectiveScale = (1 + (item.position.y / 80) * 0.08) * Math.max(0.72, tableScale);

            // Contact shadow on the wooden tabletop
            const shadowSize = (id.includes('vase') ? 68 : id.includes('censer') ? 56 : id.includes('offered') ? 85 : 38) * tableScale;
            const shadowSpread = (id.includes('vase') ? 16 : id.includes('censer') ? 14 : id.includes('offered') ? 16 : 10) * tableScale;

            return (
              <div
                key={id}
                onPointerDown={(e) => handlePointerDown(id, e)}
                className={`absolute bottom-0 left-1/2 flex flex-col items-center pointer-events-auto cursor-grab active:cursor-grabbing ${
                  isDragging ? 'z-50 scale-105' : 'z-20'
                }`}
                style={{
                  transform: `translate3d(calc(-50% + ${posX}px), ${posY + (isDragging ? -10 : 0)}px, 0) scale(${perspectiveScale})`,
                  transition: isDragging ? 'none' : 'transform 0.36s cubic-bezier(0.16, 1, 0.3, 1), scale 0.2s ease-out',
                }}
              >
                {/* Elliptical Contact Shadow cast directly on the wooden tabletop */}
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

                {/* Arrange Mode dashed highlight halo */}
                {isArrangeMode && (
                  <div className="absolute -inset-2 rounded-2xl border border-dashed border-amber-600/70 bg-amber-400/10 pointer-events-none animate-pulse" />
                )}

                {renderItemContent(id)}
              </div>
            );
          })}
        </div>

        {/* Layer B: Ultra-Realistic 3D Japanese Zen Wooden Altar Table (榻榻米供案) */}
        <svg 
          viewBox="0 0 560 160" 
          className="w-full h-full drop-shadow-xl"
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
