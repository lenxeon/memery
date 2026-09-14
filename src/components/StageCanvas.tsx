import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  LightingSettings, 
  SceneItem, 
  SceneItemId, 
  MemorialInfo, 
  FlowerType 
} from '../types';
import { sound } from '../utils/audio';

interface StageCanvasProps {
  lighting: LightingSettings;
  items: Record<SceneItemId, SceneItem>;
  memorial: MemorialInfo;
  onUpdateItemPosition: (id: SceneItemId, pos: { x: number; y: number }) => void;
  onToggleItemLit: (id: SceneItemId) => void;
  onOpenPortraitEdit: () => void;
  onRemoveItem?: (id: SceneItemId) => void;
  isArrangeMode: boolean;
  activePetalTrigger?: number;
  lastOfferedFlower?: FlowerType;
}

// Particle & Petal Interfaces for Unified Game Engine Stage
interface SmokeParticle {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  maxAge: number;
  size: number;
  alpha: number;
  rot: number;
  vrot: number;
}

interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
}

interface FallingPetal {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  size: number;
  color: string;
  alpha: number;
}

export const StageCanvas: React.FC<StageCanvasProps> = ({
  lighting,
  items,
  memorial,
  onUpdateItemPosition,
  onToggleItemLit,
  onOpenPortraitEdit,
  onRemoveItem,
  isArrangeMode,
  activePetalTrigger = 0,
  lastOfferedFlower = 'peonies',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Cached portrait image
  const portraitImgRef = useRef<HTMLImageElement | null>(null);

  // Dragging state
  const draggingIdRef = useRef<SceneItemId | null>(null);
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isPointerDownRef = useRef<boolean>(false);
  const pointerDownPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Props ref for uninterrupted 120fps render loop
  const stateRef = useRef({
    lighting,
    items,
    memorial,
    isArrangeMode,
  });

  useEffect(() => {
    stateRef.current = { lighting, items, memorial, isArrangeMode };
  }, [lighting, items, memorial, isArrangeMode]);

  // Load portrait photo
  useEffect(() => {
    if (!memorial.photoUrl) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = memorial.photoUrl;
    img.onload = () => {
      portraitImgRef.current = img;
    };
  }, [memorial.photoUrl]);

  // Object pools
  const smokePool = useRef<SmokeParticle[]>([]);
  const dustPool = useRef<DustParticle[]>([]);
  const petalPool = useRef<FallingPetal[]>([]);

  // Trigger petal shower
  useEffect(() => {
    if (!activePetalTrigger) return;
    const colors = lastOfferedFlower === 'lotus'
      ? ['#f472b6', '#fbcfe8', '#ffffff', '#ec4899']
      : lastOfferedFlower === 'lilies'
      ? ['#ffffff', '#fef9c3', '#fefce8', '#f8fafc']
      : lastOfferedFlower === 'roses'
      ? ['#fed7aa', '#ffedd5', '#fb923c', '#fffbeb']
      : ['#fda4af', '#f472b6', '#fff1f2', '#fb7185'];

    const pool = petalPool.current;
    let spawned = 0;
    for (let i = 0; i < pool.length && spawned < 28; i++) {
      if (!pool[i].active) {
        const p = pool[i];
        p.active = true;
        p.x = 0.15 + Math.random() * 0.7; // normalized 0..1
        p.y = -0.05 - Math.random() * 0.15;
        p.vx = (Math.random() - 0.5) * 0.0015;
        p.vy = 0.002 + Math.random() * 0.0025;
        p.rot = Math.random() * Math.PI * 2;
        p.vrot = (Math.random() - 0.5) * 0.04;
        p.size = 12 + Math.random() * 10;
        p.color = colors[Math.floor(Math.random() * colors.length)];
        p.alpha = 0.85 + Math.random() * 0.15;
        spawned++;
      }
    }
  }, [activePetalTrigger, lastOfferedFlower]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Initialize pools
    if (smokePool.current.length === 0) {
      for (let i = 0; i < 90; i++) {
        smokePool.current.push({
          active: false,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          age: 0,
          maxAge: 120,
          size: 2,
          alpha: 0,
          rot: 0,
          vrot: 0,
        });
      }
    }

    if (dustPool.current.length === 0) {
      for (let i = 0; i < 140; i++) {
        dustPool.current.push({
          x: Math.random(),
          y: Math.random(),
          vx: (Math.random() - 0.5) * 0.0006,
          vy: -0.0003 - Math.random() * 0.0006,
          size: 1.2 + Math.random() * 2.2,
          baseAlpha: 0.35 + Math.random() * 0.55,
          twinkleSpeed: 0.03 + Math.random() * 0.05,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    if (petalPool.current.length === 0) {
      for (let i = 0; i < 40; i++) {
        petalPool.current.push({
          active: false,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          rot: 0,
          vrot: 0,
          size: 14,
          color: '#fda4af',
          alpha: 0,
        });
      }
    }

    let time = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      time += 0.03;
      const { lighting: light, items: currentItems, memorial: mem, isArrangeMode: arrange } = stateRef.current;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, W, H);

      const centerX = W / 2;
      const isNight = light.timeOfDay === 'night';
      const isSunset = light.timeOfDay === 'sunset';

      // =========================================================================
      // 1. BACKGROUND WALL (Ambient Lighting Gradient)
      // =========================================================================
      const wallGrad = ctx.createLinearGradient(0, 0, 0, H);
      if (!light.masterOn) {
        wallGrad.addColorStop(0, '#151210');
        wallGrad.addColorStop(0.5, '#1d1714');
        wallGrad.addColorStop(1, '#110f0d');
      } else if (isSunset) {
        wallGrad.addColorStop(0, '#f8e4d2');
        wallGrad.addColorStop(0.5, '#faefe4');
        wallGrad.addColorStop(1, '#edd5c2');
      } else if (isNight) {
        wallGrad.addColorStop(0, '#0f172a');
        wallGrad.addColorStop(0.5, '#1a2436');
        wallGrad.addColorStop(1, '#090d16');
      } else {
        wallGrad.addColorStop(0, '#fcf9f5');
        wallGrad.addColorStop(0.5, '#f7eee3');
        wallGrad.addColorStop(1, '#ecdfcf');
      }
      ctx.fillStyle = wallGrad;
      ctx.fillRect(0, 0, W, H);

      // Radial wall ambient warmth spotlight
      const wallSpot = ctx.createRadialGradient(centerX, H * 0.35, 10, centerX, H * 0.35, W * 0.6);
      if (light.masterOn && !isNight) {
        wallSpot.addColorStop(0, 'rgba(255, 245, 220, 0.45)');
        wallSpot.addColorStop(0.6, 'rgba(255, 235, 195, 0.12)');
        wallSpot.addColorStop(1, 'transparent');
        ctx.fillStyle = wallSpot;
        ctx.fillRect(0, 0, W, H);
      }

      // =========================================================================
      // 2. CATHEDRAL ARCHED WINDOW (Architectural Niche & Glass Panes)
      // =========================================================================
      const winW = Math.min(390, W * 0.88);
      const winH = Math.min(540, H * 0.72);
      const winTop = Math.max(16, H * 0.04);
      const winRadius = winW / 2;
      const winLeft = centerX - winRadius;
      const winBottom = winTop + winH;

      ctx.save();
      // Outer Niche arch path
      ctx.beginPath();
      ctx.moveTo(winLeft, winBottom);
      ctx.lineTo(winLeft, winTop + winRadius);
      ctx.arc(centerX, winTop + winRadius, winRadius, Math.PI, 0, false);
      ctx.lineTo(winLeft + winW, winBottom);
      ctx.closePath();

      // Window glass background
      const glassGrad = ctx.createLinearGradient(0, winTop, 0, winBottom);
      if (isNight) {
        glassGrad.addColorStop(0, '#1a2336');
        glassGrad.addColorStop(0.5, '#0f172a');
        glassGrad.addColorStop(1, '#050914');
      } else {
        glassGrad.addColorStop(0, '#fffcf7');
        glassGrad.addColorStop(0.45, '#fef5df');
        glassGrad.addColorStop(1, '#fae6c6');
      }
      ctx.fillStyle = glassGrad;
      ctx.fill();

      // Golden sun orb behind window
      if (light.masterOn && !isNight) {
        const sunX = centerX + light.sunAngle * 3;
        const sunY = winTop + winRadius * 0.7;
        const sunRadius = 70 * (0.8 + light.sunlightIntensity * 0.4);
        const sunGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius);
        sunGrad.addColorStop(0, 'rgba(255, 250, 225, 0.85)');
        sunGrad.addColorStop(0.4, 'rgba(255, 235, 175, 0.35)');
        sunGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Arch Bevel & Inner Frame
      const frameColor = isNight ? '#2e3a52' : '#ebd1b2';
      const mullionColor = isNight ? '#243044' : '#dfbe9e';
      ctx.lineWidth = 6;
      ctx.strokeStyle = frameColor;
      ctx.stroke();

      // Window Mullions (Vertical & Transom)
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = mullionColor;

      // Radial arch spokes
      const spokeAngles = [Math.PI * 0.75, Math.PI * 0.5, Math.PI * 0.25];
      spokeAngles.forEach((ang) => {
        ctx.beginPath();
        ctx.moveTo(centerX, winTop + winRadius);
        ctx.lineTo(
          centerX + Math.cos(ang) * winRadius,
          winTop + winRadius - Math.sin(ang) * winRadius
        );
        ctx.stroke();
      });

      // Horizontal transom bar
      const transomY = winTop + winRadius;
      ctx.beginPath();
      ctx.moveTo(winLeft, transomY);
      ctx.lineTo(winLeft + winW, transomY);
      ctx.stroke();

      // Vertical center mullion
      ctx.beginPath();
      ctx.moveTo(centerX, transomY);
      ctx.lineTo(centerX, winBottom);
      ctx.stroke();

      // Left & right secondary mullions
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(centerX - winRadius * 0.5, transomY);
      ctx.lineTo(centerX - winRadius * 0.5, winBottom);
      ctx.moveTo(centerX + winRadius * 0.5, transomY);
      ctx.lineTo(centerX + winRadius * 0.5, winBottom);
      ctx.stroke();

      // Horizontal crossbars
      ctx.beginPath();
      ctx.moveTo(winLeft, transomY + (winBottom - transomY) * 0.35);
      ctx.lineTo(winLeft + winW, transomY + (winBottom - transomY) * 0.35);
      ctx.moveTo(winLeft, transomY + (winBottom - transomY) * 0.7);
      ctx.lineTo(winLeft + winW, transomY + (winBottom - transomY) * 0.7);
      ctx.stroke();

      ctx.restore();

      // =========================================================================
      // 3. SEAMLESS PERSPECTIVE WOODEN FLOOR (Zero Horizontal Seam)
      // =========================================================================
      const floorTopY = H * 0.52; // Floor begins at mid-height and dissolves seamlessly
      const floorH = H - floorTopY;

      // Base Floorboard Gradient
      const floorBaseGrad = ctx.createLinearGradient(0, floorTopY, 0, H);
      if (!light.masterOn) {
        floorBaseGrad.addColorStop(0, '#1c1714');
        floorBaseGrad.addColorStop(1, '#130f0d');
      } else if (isNight) {
        floorBaseGrad.addColorStop(0, '#171d2b');
        floorBaseGrad.addColorStop(1, '#0e121b');
      } else if (isSunset) {
        floorBaseGrad.addColorStop(0, '#edd5be');
        floorBaseGrad.addColorStop(1, '#d8af8a');
      } else {
        floorBaseGrad.addColorStop(0, '#f5e8d7');
        floorBaseGrad.addColorStop(0.4, '#eddcc7');
        floorBaseGrad.addColorStop(1, '#dfc5a6');
      }

      // Draw floor with SEAMLESS TOP ALPHA FADE
      ctx.save();
      ctx.fillStyle = floorBaseGrad;
      ctx.fillRect(0, floorTopY, W, floorH);

      // Seamless Dissolve Mask at Floor Horizon:
      // Fades the top of the floor planks smoothly into the ambient background wall color
      const wallColorAtHorizon = !light.masterOn
        ? '#1d1714'
        : isNight
        ? '#1a2436'
        : isSunset
        ? '#faefe4'
        : '#f7eee3';

      const horizonFade = ctx.createLinearGradient(0, floorTopY - 2, 0, floorTopY + 90);
      horizonFade.addColorStop(0, wallColorAtHorizon);
      horizonFade.addColorStop(1, 'transparent');
      ctx.fillStyle = horizonFade;
      ctx.fillRect(0, floorTopY - 2, W, 92);

      // Perspective floor seams radiating from vanishing point
      const seamColor = isNight ? 'rgba(15, 22, 35, 0.3)' : 'rgba(135, 95, 65, 0.15)';
      ctx.strokeStyle = seamColor;
      ctx.lineWidth = 1.6;
      const vanishingX = centerX;
      const vanishingY = floorTopY - 80;

      const floorRays = [-0.75, -0.45, -0.2, 0, 0.2, 0.45, 0.75];
      floorRays.forEach((ratio) => {
        const bottomX = centerX + ratio * W * 1.35;
        ctx.beginPath();
        ctx.moveTo(vanishingX + ratio * 60, floorTopY + 25);
        ctx.lineTo(bottomX, H);
        ctx.stroke();
      });

      // Subtle horizontal board gaps
      ctx.lineWidth = 1;
      [0.3, 0.65].forEach((ratio) => {
        const y = floorTopY + floorH * ratio;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      });

      // Warm Soft Sunlight Puddle on Floor (Integrated with Window Light)
      if (light.masterOn && light.godRaysEnabled) {
        const poolX = centerX + light.sunAngle * 4;
        const poolY = floorTopY + floorH * 0.48;
        const poolRadiusX = Math.min(260, W * 0.45);
        const poolRadiusY = 85;

        const floorSunGrad = ctx.createRadialGradient(poolX, poolY, 5, poolX, poolY, poolRadiusX);
        if (isNight) {
          floorSunGrad.addColorStop(0, 'rgba(180, 210, 255, 0.18)');
          floorSunGrad.addColorStop(0.5, 'rgba(180, 210, 255, 0.06)');
          floorSunGrad.addColorStop(1, 'transparent');
        } else {
          floorSunGrad.addColorStop(0, 'rgba(255, 248, 225, 0.75)');
          floorSunGrad.addColorStop(0.4, 'rgba(255, 235, 185, 0.45)');
          floorSunGrad.addColorStop(0.75, 'rgba(255, 220, 160, 0.12)');
          floorSunGrad.addColorStop(1, 'transparent');
        }
        ctx.fillStyle = floorSunGrad;
        ctx.beginPath();
        ctx.ellipse(poolX, poolY, poolRadiusX, poolRadiusY, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      // =========================================================================
      // 4. VOLUMETRIC GOD RAYS (Screen Blended & Fully Integrated)
      // =========================================================================
      if (light.masterOn && light.godRaysEnabled && light.godRaysIntensity > 0.05) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';

        const rayAngleRad = (light.sunAngle * 0.5 * Math.PI) / 180;
        const rayOriginX = centerX + Math.sin(rayAngleRad) * 40;
        const rayOriginY = winTop + winRadius * 0.6;
        const rayIntensity = light.godRaysIntensity;

        // Draw multiple soft, overlapping atmospheric light beams
        const beamAngles = [-0.18, -0.06, 0.08, 0.22];
        const beamWidths = [140, 190, 160, 130];

        beamAngles.forEach((angOffset, idx) => {
          const angle = rayAngleRad + angOffset;
          const beamW = beamWidths[idx];
          const reach = H * 0.85;

          const leftBottomX = rayOriginX + Math.sin(angle - 0.22) * reach - beamW * 0.5;
          const rightBottomX = rayOriginX + Math.sin(angle + 0.22) * reach + beamW * 0.5;
          const bottomY = rayOriginY + Math.cos(angle) * reach;

          const rayGrad = ctx.createLinearGradient(rayOriginX, rayOriginY, (leftBottomX + rightBottomX) / 2, bottomY);
          if (isNight) {
            rayGrad.addColorStop(0, `rgba(180, 210, 255, ${0.35 * rayIntensity})`);
            rayGrad.addColorStop(0.4, `rgba(160, 195, 255, ${0.18 * rayIntensity})`);
            rayGrad.addColorStop(1, 'transparent');
          } else if (isSunset) {
            rayGrad.addColorStop(0, `rgba(255, 200, 130, ${0.65 * rayIntensity})`);
            rayGrad.addColorStop(0.4, `rgba(255, 170, 90, ${0.35 * rayIntensity})`);
            rayGrad.addColorStop(1, 'transparent');
          } else {
            rayGrad.addColorStop(0, `rgba(255, 248, 220, ${0.72 * rayIntensity})`);
            rayGrad.addColorStop(0.35, `rgba(255, 235, 185, ${0.42 * rayIntensity})`);
            rayGrad.addColorStop(0.7, `rgba(255, 225, 165, ${0.15 * rayIntensity})`);
            rayGrad.addColorStop(1, 'transparent');
          }

          ctx.fillStyle = rayGrad;
          ctx.beginPath();
          ctx.moveTo(rayOriginX - 25, rayOriginY);
          ctx.lineTo(rayOriginX + 25, rayOriginY);
          ctx.lineTo(rightBottomX, bottomY);
          ctx.lineTo(leftBottomX, bottomY);
          ctx.closePath();
          ctx.fill();
        });

        ctx.restore();
      }

      // =========================================================================
      // 5. MEMORIAL PORTRAIT FRAME (Centered in Window Niche)
      // =========================================================================
      const portraitY = Math.min(winTop + winRadius + 20, H * 0.32);
      const portraitR = Math.min(54, W * 0.13);

      ctx.save();
      // Soft golden aura behind portrait
      const auraGrad = ctx.createRadialGradient(centerX, portraitY, portraitR * 0.6, centerX, portraitY, portraitR * 1.5);
      auraGrad.addColorStop(0, isNight ? 'rgba(220, 190, 120, 0.3)' : 'rgba(255, 225, 140, 0.55)');
      auraGrad.addColorStop(0.6, isNight ? 'rgba(200, 150, 60, 0.1)' : 'rgba(255, 200, 100, 0.2)');
      auraGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(centerX, portraitY, portraitR * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Rotating Golden Mandala Filigree Ring
      ctx.save();
      ctx.translate(centerX, portraitY);
      ctx.rotate(time * 0.08);

      ctx.strokeStyle = '#d4af62';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(0, 0, portraitR + 8, 0, Math.PI * 2);
      ctx.stroke();

      // 12 Golden Mandala Petals
      for (let i = 0; i < 12; i++) {
        ctx.rotate((Math.PI * 2) / 12);
        ctx.beginPath();
        ctx.moveTo(0, -portraitR - 8);
        ctx.quadraticCurveTo(4, -portraitR - 16, 0, -portraitR - 20);
        ctx.quadraticCurveTo(-4, -portraitR - 16, 0, -portraitR - 8);
        ctx.fillStyle = '#edd295';
        ctx.fill();
      }
      ctx.restore();

      // Circular Photo Clip & Drawing
      ctx.beginPath();
      ctx.arc(centerX, portraitY, portraitR, 0, Math.PI * 2);
      ctx.save();
      ctx.clip();

      if (portraitImgRef.current && portraitImgRef.current.complete) {
        ctx.drawImage(portraitImgRef.current, centerX - portraitR, portraitY - portraitR, portraitR * 2, portraitR * 2);
      } else {
        ctx.fillStyle = '#e8decb';
        ctx.fillRect(centerX - portraitR, portraitY - portraitR, portraitR * 2, portraitR * 2);
      }
      ctx.restore();

      // Golden Beveled Inner Ring
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#dfb86e';
      ctx.stroke();

      // Title & Subtitle Text beneath portrait
      ctx.textAlign = 'center';
      ctx.fillStyle = isNight ? '#e2e8f0' : '#4a3828';
      ctx.font = '600 16px "Noto Serif SC", serif, sans-serif';
      ctx.fillText(mem.title || '暖 念 墙', centerX, portraitY + portraitR + 24);

      ctx.fillStyle = isNight ? '#94a3b8' : '#8c7056';
      ctx.font = '500 10px sans-serif';
      ctx.fillText((mem.subtitle || 'WARMTH & BLESSING').toUpperCase(), centerX, portraitY + portraitR + 38);

      ctx.restore();

      // =========================================================================
      // 6. ALTAR TABLE & DRAGGABLE ITEMS (3D Tabletop Surface)
      // =========================================================================
      const tableW = Math.min(520, W * 0.94);
      const tableH = 145;
      const tableY = Math.max(floorTopY + 60, H - tableH - 65);
      const tableTopPlaneY = tableY + 36; // Surface where items stand

      // Altar Floor Contact Ambient Occlusion
      ctx.save();
      const floorOcclusion = ctx.createRadialGradient(centerX, tableY + tableH - 5, 20, centerX, tableY + tableH - 5, tableW * 0.55);
      floorOcclusion.addColorStop(0, 'rgba(40, 24, 12, 0.45)');
      floorOcclusion.addColorStop(0.6, 'rgba(50, 30, 16, 0.15)');
      floorOcclusion.addColorStop(1, 'transparent');
      ctx.fillStyle = floorOcclusion;
      ctx.beginPath();
      ctx.ellipse(centerX, tableY + tableH - 5, tableW * 0.52, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // --- Draw Altar Table Structure (Grounds all tabletop items) ---
      ctx.save();
      const tableLeft = centerX - tableW / 2;

      // Table Front Apron & Pedestal Legs
      const apronGrad = ctx.createLinearGradient(0, tableY + 36, 0, tableY + tableH);
      apronGrad.addColorStop(0, '#a67d58');
      apronGrad.addColorStop(0.5, '#bc946e');
      apronGrad.addColorStop(1, '#7a5534');

      // Left & right sturdy legs
      const legW = Math.min(48, tableW * 0.12);
      ctx.fillStyle = apronGrad;
      ctx.fillRect(tableLeft + 35, tableY + 36, legW, tableH - 36);
      ctx.fillRect(tableLeft + tableW - 35 - legW, tableY + 36, legW, tableH - 36);

      // Recessed back panel slat
      ctx.fillStyle = '#654425';
      ctx.fillRect(tableLeft + 35 + legW, tableY + 36, tableW - 70 - legW * 2, tableH - 42);

      // Table Top Surface (Blonde oak bevel with gentle ambient lighting)
      const tableTopGrad = ctx.createLinearGradient(tableLeft, tableY, tableLeft + tableW, tableY + 40);
      tableTopGrad.addColorStop(0, '#f2e2cf');
      tableTopGrad.addColorStop(0.35, '#f7ebd9');
      tableTopGrad.addColorStop(0.7, '#eed6bd');
      tableTopGrad.addColorStop(1, '#dfc2a1');

      ctx.fillStyle = tableTopGrad;
      ctx.beginPath();
      ctx.roundRect(tableLeft, tableY, tableW, 40, [4, 4, 2, 2]);
      ctx.fill();

      // Table Top Chamfer Highlight
      ctx.strokeStyle = '#fbf3e6';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(tableLeft + 2, tableY + 1);
      ctx.lineTo(tableLeft + tableW - 2, tableY + 1);
      ctx.stroke();
      ctx.restore();

      // Sort items by Y depth (further back rendered first)
      const sortedKeys = Object.keys(currentItems).sort(
        (a, b) => (currentItems[a]?.position?.y || 0) - (currentItems[b]?.position?.y || 0)
      );

      // --- Draw Items Sitting on Table ---
      sortedKeys.forEach((id) => {
        const item = currentItems[id];
        if (!item) return;

        const isDragging = draggingIdRef.current === id;
        const itemPosX = centerX + item.position.x;
        const itemPosY = tableTopPlaneY + item.position.y + (isDragging ? -8 : 0);
        const scale = 1 + (item.position.y / 100) * 0.08;

        ctx.save();
        ctx.translate(itemPosX, itemPosY);
        ctx.scale(scale, scale);

        // Contact Shadow on wooden table
        const shadowW = id.includes('vase') ? 56 : id.includes('censer') ? 48 : 34;
        const shadowGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, shadowW);
        shadowGrad.addColorStop(0, 'rgba(45, 28, 14, 0.45)');
        shadowGrad.addColorStop(0.5, 'rgba(55, 35, 18, 0.15)');
        shadowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = shadowGrad;
        ctx.beginPath();
        ctx.ellipse(0, 4, shadowW, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Arrange Mode Highlight dashed outline
        if (arrange) {
          ctx.strokeStyle = '#d97706';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.arc(0, -35, 38, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // --- Render Specific Items ---
        if (id.includes('vase')) {
          // Porcelain Vase
          const fType = item.flowerType || 'peonies';
          // Vase body
          const vaseGrad = ctx.createLinearGradient(-22, 0, 22, 0);
          vaseGrad.addColorStop(0, '#e5ded4');
          vaseGrad.addColorStop(0.4, '#ffffff');
          vaseGrad.addColorStop(1, '#d8d0c4');
          ctx.fillStyle = vaseGrad;
          ctx.beginPath();
          ctx.moveTo(-10, -50);
          ctx.bezierCurveTo(-26, -35, -28, -12, -18, 0);
          ctx.lineTo(18, 0);
          ctx.bezierCurveTo(28, -12, 26, -35, 10, -50);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = '#c5b8a5';
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Flower Stems & Petals
          ctx.strokeStyle = '#4d7c0f';
          ctx.lineWidth = 2.5;
          [-12, 0, 12].forEach((xOff, idx) => {
            ctx.beginPath();
            ctx.moveTo(xOff * 0.4, -48);
            ctx.quadraticCurveTo(xOff * 0.6, -75, xOff, -95 + idx * 5);
            ctx.stroke();

            // Flower blossom head
            const flX = xOff;
            const flY = -95 + idx * 5;
            ctx.save();
            ctx.translate(flX, flY);

            const petalColor = fType === 'lilies' ? '#ffffff' : fType === 'lotus' ? '#f472b6' : fType === 'roses' ? '#fb923c' : '#fda4af';
            ctx.fillStyle = petalColor;
            for (let p = 0; p < 5; p++) {
              ctx.rotate((Math.PI * 2) / 5);
              ctx.beginPath();
              ctx.ellipse(0, -9, 6, 10, 0, 0, Math.PI * 2);
              ctx.fill();
            }
            // Flower center pistil
            ctx.fillStyle = '#fef08a';
            ctx.beginPath();
            ctx.arc(0, 0, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });

        } else if (id.includes('censer')) {
          // Celadon Incense Censer
          const censerGrad = ctx.createRadialGradient(-6, -14, 2, 0, -10, 32);
          censerGrad.addColorStop(0, '#f2f7f4');
          censerGrad.addColorStop(0.5, '#d4e4dc');
          censerGrad.addColorStop(1, '#a8c2b5');
          ctx.fillStyle = censerGrad;
          ctx.beginPath();
          ctx.ellipse(0, -10, 30, 16, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#9cb8aa';
          ctx.lineWidth = 1.4;
          ctx.stroke();

          // Bronze rim
          ctx.fillStyle = '#b7a27a';
          ctx.beginPath();
          ctx.ellipse(0, -16, 18, 5, 0, 0, Math.PI * 2);
          ctx.fill();

          // 3 Incense sticks
          const sticks = [-6, 0, 6];
          ctx.strokeStyle = '#4a2f1b';
          ctx.lineWidth = 1.4;
          sticks.forEach((sX) => {
            ctx.beginPath();
            ctx.moveTo(sX * 0.4, -16);
            ctx.lineTo(sX, -45);
            ctx.stroke();

            // Glowing ember tips
            if (item.isLit) {
              const emberGlow = ctx.createRadialGradient(sX, -45, 0.5, sX, -45, 5);
              emberGlow.addColorStop(0, '#ff4500');
              emberGlow.addColorStop(0.5, '#ffaa00');
              emberGlow.addColorStop(1, 'transparent');
              ctx.fillStyle = emberGlow;
              ctx.beginPath();
              ctx.arc(sX, -45, 5, 0, Math.PI * 2);
              ctx.fill();
            }
          });

          // Spawn smoke particles if lit
          if (item.isLit && Math.random() < 0.4) {
            const pool = smokePool.current;
            for (let s = 0; s < pool.length; s++) {
              if (!pool[s].active) {
                const smk = pool[s];
                smk.active = true;
                smk.x = itemPosX + (Math.random() - 0.5) * 6;
                smk.y = itemPosY - 46;
                smk.vx = (Math.random() - 0.5) * 0.35;
                smk.vy = -0.7 - Math.random() * 0.8;
                smk.age = 0;
                smk.maxAge = 90 + Math.floor(Math.random() * 45);
                smk.size = 3 + Math.random() * 2;
                smk.alpha = 0.55 + Math.random() * 0.25;
                smk.rot = Math.random() * Math.PI * 2;
                smk.vrot = (Math.random() - 0.5) * 0.03;
                break;
              }
            }
          }

        } else if (id.includes('candle')) {
          // Wax Candle Body
          const waxGrad = ctx.createLinearGradient(-14, 0, 14, 0);
          waxGrad.addColorStop(0, '#ddd3be');
          waxGrad.addColorStop(0.3, item.isLit ? '#fff5d6' : '#f5ecd8');
          waxGrad.addColorStop(1, '#c8bca2');
          ctx.fillStyle = waxGrad;
          ctx.beginPath();
          ctx.roundRect(-14, -55, 28, 55, [2, 2, 4, 4]);
          ctx.fill();
          ctx.strokeStyle = '#bfb094';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Candle Wick
          ctx.strokeStyle = '#2d1f14';
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(0, -55);
          ctx.quadraticCurveTo(item.isLit ? 1.5 : 0.5, -60, 1, -64);
          ctx.stroke();

          // Candle Flame
          if (item.isLit) {
            const flameFlicker = Math.sin(time * 12 + itemPosX) * 0.4;
            const flameW = 11 + Math.cos(time * 6) * 1.5;
            const flameH = 34 + flameFlicker * 3;
            const flameTilt = light.windForce * 8 + Math.sin(time * 4) * 2;
            const flameTipX = flameTilt;
            const flameTipY = -64 - flameH;

            // Warm Outer Ambient Glow (Kept strictly bounded)
            const candleGlow = ctx.createRadialGradient(0, -64 - flameH * 0.4, 2, 0, -64 - flameH * 0.4, 30);
            candleGlow.addColorStop(0, 'rgba(255, 180, 50, 0.45)');
            candleGlow.addColorStop(0.5, 'rgba(255, 130, 20, 0.15)');
            candleGlow.addColorStop(1, 'transparent');
            ctx.fillStyle = candleGlow;
            ctx.beginPath();
            ctx.arc(0, -64 - flameH * 0.4, 30, 0, Math.PI * 2);
            ctx.fill();

            // Outer Orange Teardrop
            ctx.beginPath();
            ctx.moveTo(-flameW * 0.5, -64);
            ctx.bezierCurveTo(-flameW * 0.9, -64 - flameH * 0.35, -flameW * 0.4 + flameTilt * 0.5, -64 - flameH * 0.75, flameTipX, flameTipY);
            ctx.bezierCurveTo(flameW * 0.4 + flameTilt * 0.5, -64 - flameH * 0.75, flameW * 0.9, -64 - flameH * 0.35, flameW * 0.5, -64);
            ctx.closePath();

            const flameGrad = ctx.createLinearGradient(0, -64, flameTipX, flameTipY);
            flameGrad.addColorStop(0, '#ff5500');
            flameGrad.addColorStop(0.4, '#ff9900');
            flameGrad.addColorStop(0.8, '#ffea55');
            flameGrad.addColorStop(1, '#fffde0');
            ctx.fillStyle = flameGrad;
            ctx.fill();

            // Inner Core Luminous Flame
            const innerH = flameH * 0.65;
            const innerW = flameW * 0.55;
            ctx.beginPath();
            ctx.moveTo(-innerW * 0.5, -65);
            ctx.bezierCurveTo(-innerW * 0.7, -65 - innerH * 0.35, -innerW * 0.3 + flameTilt * 0.4, -65 - innerH * 0.75, flameTipX * 0.75, -65 - innerH);
            ctx.bezierCurveTo(innerW * 0.3 + flameTilt * 0.4, -65 - innerH * 0.75, innerW * 0.7, -65 - innerH * 0.35, innerW * 0.5, -65);
            ctx.closePath();
            ctx.fillStyle = '#ffffff';
            ctx.fill();

            // Blue Flame Base
            ctx.beginPath();
            ctx.ellipse(0, -63, flameW * 0.35, 2.5, 0, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(50, 100, 240, 0.75)';
            ctx.fill();
          }
        } else if (id.startsWith('offered_flower')) {
          // Fresh offered flower bouquet bouquet
          ctx.fillStyle = '#fda4af';
          for (let p = 0; p < 7; p++) {
            ctx.beginPath();
            ctx.ellipse(Math.cos(p) * 12, Math.sin(p) * 6 - 8, 8, 12, p * 0.3, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.fillStyle = '#fef08a';
          ctx.beginPath();
          ctx.arc(0, -8, 6, 0, Math.PI * 2);
          ctx.fill();

          // In arrange mode, show small remove 'x' badge on offered flowers
          if (arrange) {
            ctx.fillStyle = 'rgba(239, 68, 68, 0.9)';
            ctx.beginPath();
            ctx.arc(16, -24, 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(13.5, -26.5);
            ctx.lineTo(18.5, -21.5);
            ctx.moveTo(18.5, -26.5);
            ctx.lineTo(13.5, -21.5);
            ctx.stroke();
          }
        }

        ctx.restore();
      });

      // =========================================================================
      // 7. RENDER SMOKE PARTICLES (Object Pool, Screen Blended)
      // =========================================================================
      ctx.save();
      const smokeList = smokePool.current;
      for (let i = 0; i < smokeList.length; i++) {
        const p = smokeList[i];
        if (!p.active) continue;

        p.age += 1;
        const progress = p.age / p.maxAge;
        const curlNoise = Math.sin(p.y * 0.05 + time * 1.5) * (0.8 + progress * 2.2);

        p.vx += light.windForce * 0.03 + curlNoise * 0.04;
        p.vx *= 0.98;
        p.vy *= 0.995;
        p.x += p.vx;
        p.y += p.vy;
        p.size += 0.22;
        p.rot += p.vrot;

        const currentAlpha = progress < 0.1 ? p.alpha * (progress / 0.1) : p.alpha * (1 - (progress - 0.1) / 0.9);

        if (progress >= 1 || currentAlpha <= 0.005 || p.y < 0) {
          p.active = false;
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);

        const smokeGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
        smokeGrad.addColorStop(0, `rgba(245, 240, 230, ${currentAlpha * 0.6})`);
        smokeGrad.addColorStop(0.5, `rgba(235, 230, 220, ${currentAlpha * 0.25})`);
        smokeGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = smokeGrad;
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();

      // =========================================================================
      // 8. DUST MOTES (Glistening particles in sunbeams)
      // =========================================================================
      if (light.masterOn && !isNight && light.dustDensity > 10) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        const dustList = dustPool.current;
        const activeDustCount = Math.min(dustList.length, Math.floor(light.dustDensity * 0.9));

        for (let i = 0; i < activeDustCount; i++) {
          const d = dustList[i];
          d.phase += d.twinkleSpeed;
          d.x += d.vx + light.windForce * 0.0003 + Math.sin(time + d.phase) * 0.00015;
          d.y += d.vy;

          if (d.y < 0) d.y = 1;
          if (d.y > 1) d.y = 0;
          if (d.x < 0) d.x = 1;
          if (d.x > 1) d.x = 0;

          const px = d.x * W;
          const py = d.y * H;

          const distCenterRatio = Math.abs(px - centerX) / (W * 0.5);
          const inBeam = Math.max(0.25, 1 - distCenterRatio * 0.7);
          const twinkle = Math.sin(d.phase) * 0.35 + 0.65;
          const alpha = d.baseAlpha * twinkle * light.sunlightIntensity * inBeam;

          if (alpha <= 0.02) continue;

          ctx.fillStyle = `rgba(255, 245, 210, ${alpha * 0.8})`;
          ctx.beginPath();
          ctx.arc(px, py, d.size * 1.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, d.size * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // =========================================================================
      // 9. FALLING PETAL SHOWER (Offering celebration)
      // =========================================================================
      ctx.save();
      const pList = petalPool.current;
      for (let i = 0; i < pList.length; i++) {
        const pt = pList[i];
        if (!pt.active) continue;

        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.rot += pt.vrot;

        if (pt.y > 0.9) {
          pt.alpha *= 0.94;
          if (pt.alpha <= 0.02) {
            pt.active = false;
            continue;
          }
        }

        const px = pt.x * W;
        const py = pt.y * H;

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(pt.rot);
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = pt.alpha;
        ctx.beginPath();
        ctx.ellipse(0, 0, pt.size * 0.5, pt.size, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Pointer event handlers for drag and click interactions
  const handlePointerDown = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    isPointerDownRef.current = true;
    pointerDownPosRef.current = { x: clickX, y: clickY };

    const W = rect.width;
    const H = rect.height;
    const centerX = W / 2;
    const floorTopY = H * 0.52;
    const tableH = 145;
    const tableY = Math.max(floorTopY + 60, H - tableH - 65);
    const tableTopPlaneY = tableY + 36;

    // Check click on portrait
    const winW = Math.min(390, W * 0.88);
    const winTop = Math.max(16, H * 0.04);
    const winRadius = winW / 2;
    const portraitY = Math.min(winTop + winRadius + 20, H * 0.32);
    const distToPortrait = Math.hypot(clickX - centerX, clickY - portraitY);
    if (distToPortrait < 65) {
      sound.playWoodPlacement();
      onOpenPortraitEdit();
      return;
    }

    // Check items on table in reverse depth order
    const currentItems = stateRef.current.items;
    const sortedKeys = Object.keys(currentItems).sort(
      (a, b) => (currentItems[b]?.position?.y || 0) - (currentItems[a]?.position?.y || 0)
    );

    for (const id of sortedKeys) {
      const item = currentItems[id];
      if (!item) continue;
      const itemPosX = centerX + item.position.x;
      const itemPosY = tableTopPlaneY + item.position.y;

      // In arrange mode, check click on remove 'x' badge on offered bouquets
      if (stateRef.current.isArrangeMode && id.startsWith('offered_flower')) {
        const badgeX = itemPosX + 16;
        const badgeY = itemPosY - 24;
        if (Math.hypot(clickX - badgeX, clickY - badgeY) < 14) {
          sound.playWoodPlacement();
          onRemoveItem?.(id);
          return;
        }
      }

      const itemCenterY = itemPosY - (id.includes('vase') ? 45 : id.includes('candle') ? 35 : id.includes('censer') ? 18 : 12);
      const hitRadius = id.includes('vase') ? 42 : id.includes('censer') ? 36 : id.includes('candle') ? 30 : 26;

      if (Math.hypot(clickX - itemPosX, clickY - itemCenterY) < hitRadius) {
        draggingIdRef.current = id;
        dragOffsetRef.current = {
          x: clickX - itemPosX,
          y: clickY - itemPosY,
        };
        try {
          canvas.setPointerCapture(e.pointerId);
        } catch {
          // ignore
        }
        return;
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingIdRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const W = rect.width;
    const H = rect.height;
    const centerX = W / 2;
    const floorTopY = H * 0.52;
    const tableH = 145;
    const tableY = Math.max(floorTopY + 60, H - tableH - 65);
    const tableTopPlaneY = tableY + 36;

    let newX = currentX - dragOffsetRef.current.x - centerX;
    let newY = currentY - dragOffsetRef.current.y - tableTopPlaneY;

    // Table boundary limits
    const BOUNDS_X = Math.min(220, W * 0.4);
    newX = Math.max(-BOUNDS_X, Math.min(BOUNDS_X, newX));
    newY = Math.max(-20, Math.min(26, newY));

    onUpdateItemPosition(draggingIdRef.current, { x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (draggingIdRef.current) {
      sound.playWoodPlacement();
      try {
        if (canvas) canvas.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }

      // If barely moved, treat as a click to toggle lit status
      const rect = canvas?.getBoundingClientRect();
      if (rect) {
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        const dist = Math.hypot(clickX - pointerDownPosRef.current.x, clickY - pointerDownPosRef.current.y);
        if (dist < 5) {
          const id = draggingIdRef.current;
          if (id.includes('candle') || id.includes('censer')) {
            sound.playMatchStrike();
            onToggleItemLit(id);
          }
        }
      }

      draggingIdRef.current = null;
    }
    isPointerDownRef.current = false;
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="w-full h-full cursor-pointer touch-none select-none"
    />
  );
};
