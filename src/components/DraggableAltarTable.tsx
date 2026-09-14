import React, { useState, useRef } from 'react';
import { SceneItem, SceneItemId, LightingSettings } from '../types';
import { ItemVase } from './ItemVase';
import { ItemOfferedBouquet } from './ItemOfferedBouquet';
import { ItemCenser } from './ItemCenser';
import { ItemCandle } from './ItemCandle';
import { sound } from '../utils/audio';
import { RotateCcw, Move } from 'lucide-react';

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

  // Table surface limits in px
  const BOUNDS_X = 220;
  const BOUNDS_Y_MIN = -18; // further back on the 3D table surface
  const BOUNDS_Y_MAX = 24;  // front edge of table surface

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
    const dx = e.clientX - dragStartRef.current.startX;
    const dy = e.clientY - dragStartRef.current.startY;

    let newX = dragStartRef.current.itemX + dx;
    let newY = dragStartRef.current.itemY + dy;

    newX = Math.max(-BOUNDS_X, Math.min(BOUNDS_X, newX));
    newY = Math.max(BOUNDS_Y_MIN, Math.min(BOUNDS_Y_MAX, newY));

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
    }
  };

  // Depth sort based on Y position (items with smaller Y are further back, rendered first)
  const sortedItemIds: SceneItemId[] = Object.keys(items)
    .sort((a, b) => (items[a]?.position.y || 0) - (items[b]?.position.y || 0));

  const renderItemContent = (id: SceneItemId) => {
    const item = items[id];
    if (!item) return null;

    if (id.startsWith('offered_flower')) {
      return (
        <ItemOfferedBouquet
          flowerType={item.flowerType || 'peonies'}
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
            flowerType={item.flowerType || 'peonies'}
            scale={0.96}
            isRightSide={false}
          />
        );
      case 'vase_right':
        return (
          <ItemVase
            flowerType={item.flowerType || 'lilies'}
            scale={0.96}
            isRightSide={true}
          />
        );
      case 'censer':
        return (
          <ItemCenser
            isLit={!!items.censer?.isLit}
            onToggle={() => onToggleItemLit('censer')}
            windForce={lighting.windForce}
            density={lighting.masterOn ? 1 : 0.5}
            sunlightIntensity={lighting.sunlightIntensity}
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
      className="relative w-full max-w-[580px] h-[340px] flex flex-col items-center justify-end select-none pointer-events-auto"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Arrange Mode Floating Helper Indicator */}
      <div className="absolute -top-7 inset-x-2 flex items-center justify-between px-2 text-xs pointer-events-auto z-40">
        <div className="flex items-center gap-1.5 text-stone-700 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-200/80 shadow-xs">
          <Move size={12} className="text-amber-800 animate-pulse" />
          <span className="text-[11px] sm:text-xs">
            {isArrangeMode ? '可随意按住拖动花瓶、烛台与香炉' : '按住案上任一物件可自由拖曳摆放'}
          </span>
        </div>

        <button
          type="button"
          onClick={onResetLayout}
          title="重置为对称规范排布"
          className="flex items-center gap-1 bg-white/85 hover:bg-white text-stone-700 px-2.5 py-1 rounded-full border border-stone-200/80 shadow-xs transition-all text-[11px] cursor-pointer active:scale-95"
        >
          <RotateCcw size={11} />
          <span>对称复位</span>
        </button>
      </div>

      {/* Layer A: Draggable Items sitting on the 3D tabletop surface plane */}
      {/* The tabletop top plane is at Y: bottom-[125px] */}
      <div className="absolute bottom-[128px] left-1/2 -translate-x-1/2 w-[520px] h-0 pointer-events-none z-30">
        {sortedItemIds.map((id) => {
          const item = items[id];
          if (!item) return null;

          const isDragging = activeDragId === id;
          // Items placed further back (smaller y) appear slightly smaller for true 3D perspective
          const perspectiveScale = 1 + (item.position.y / 80) * 0.08;
          // Contact shadow on the wooden tabletop
          const shadowSize = id.includes('vase') ? 68 : id.includes('censer') ? 56 : id.includes('offered') ? 85 : 38;
          const shadowSpread = id.includes('vase') ? 16 : id.includes('censer') ? 14 : id.includes('offered') ? 16 : 10;

          return (
            <div
              key={id}
              onPointerDown={(e) => handlePointerDown(id, e)}
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto cursor-grab active:cursor-grabbing ${
                isDragging ? 'z-50 scale-105' : 'z-20'
              }`}
              style={{
                transform: `translate3d(calc(-50% + ${item.position.x}px), ${item.position.y + (isDragging ? -10 : 0)}px, 0) scale(${perspectiveScale})`,
                transition: isDragging ? 'none' : 'transform 0.16s cubic-bezier(0.2, 0.9, 0.4, 1), scale 0.16s ease-out',
              }}
            >
              {/* Elliptical Contact Shadow cast directly on the wooden tabletop */}
              <div
                className="absolute bottom-1 rounded-[100%] pointer-events-none transition-all"
                style={{
                  width: shadowSize,
                  height: shadowSpread,
                  backgroundColor: 'rgba(50, 32, 16, 0.42)',
                  filter: isDragging ? 'blur(6px)' : 'blur(2px)',
                  transform: `translate(${shadowTiltX}px, ${4 + item.position.y * 0.05}px) scale(${isDragging ? 1.3 : 1})`,
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
      <div className="relative w-full max-w-[560px] h-[160px] select-none pointer-events-none z-20">
        <svg 
          viewBox="0 0 560 160" 
          className="w-full h-full filter drop-shadow-2xl"
          preserveAspectRatio="xMidYMid meet"
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

            {/* 7. Ambient Occlusion Shadow Filter */}
            <filter id="tableSoftShadow" x="-15%" y="-15%" width="130%" height="130%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
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
            ry="11"
            fill="#3a2211"
            opacity="0.55"
            filter="url(#tableSoftShadow)"
          />
        </svg>
      </div>
    </div>
  );
};
