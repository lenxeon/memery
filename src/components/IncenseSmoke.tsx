import React, { useEffect, useRef } from 'react';
import { sound } from '../utils/audio';

interface IncenseSmokeProps {
  isLit: boolean;
  onToggle?: () => void;
  windForce?: number;
  density?: number;
  sunlightIntensity?: number;
  masterOn?: boolean;
  timeOfDay?: 'day' | 'sunset' | 'night';
  className?: string;
}

interface SmokeNode {
  x: number;
  y: number;
  age: number;
  maxAge: number;
  noiseSeed: number;
}

interface SecondaryWisp {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  maxAge: number;
  size: number;
  alpha: number;
  phase: number;
}

// ── Fixed canvas logical dimensions ─────────────────────────────────────────
const CANVAS_W = 160;
const CANVAS_H = 280;
const CENTER_X  = CANVAS_W / 2;
const BURNER_BASE_Y = CANVAS_H - 2;   // 278
const EMBER_BASE_Y  = CANVAS_H - 18;  // 262

// Three incense sticks (三炷香) with natural physical angles and heights
const EMBERS: { x: number; y: number; angle: number }[] = [
  { x: CENTER_X - 3.2, y: EMBER_BASE_Y - 21, angle: -0.06 }, // Left stick
  { x: CENTER_X,       y: EMBER_BASE_Y - 24, angle:  0.00 }, // Center stick
  { x: CENTER_X + 3.2, y: EMBER_BASE_Y - 21, angle:  0.06 }, // Right stick
];

// Height strictly reduced by half (~90px rise above ember, apex at y ≈ 148)
const SMOKE_MAX_HEIGHT = 90;
const SMOKE_APEX_Y = EMBER_BASE_Y - 24 - SMOKE_MAX_HEIGHT;

/**
 * Creates a soft feather-edge dissipation sprite for the apex of smoke plumes
 */
function createDispersionSprite(isDark: boolean): HTMLCanvasElement {
  const S = 32;
  const canvas = document.createElement('canvas');
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
    if (isDark) {
      grad.addColorStop(0,   'rgba(245, 240, 230, 0.12)');
      grad.addColorStop(0.4, 'rgba(235, 228, 218, 0.06)');
      grad.addColorStop(1,   'rgba(220, 212, 200, 0)');
    } else {
      grad.addColorStop(0,   'rgba(240, 238, 234, 0.10)');
      grad.addColorStop(0.4, 'rgba(230, 228, 224, 0.05)');
      grad.addColorStop(1,   'rgba(220, 218, 214, 0)');
    }
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(S / 2, S / 2, S / 2, 0, Math.PI * 2);
    ctx.fill();
  }
  return canvas;
}

export const IncenseSmoke: React.FC<IncenseSmokeProps> = ({
  isLit,
  onToggle,
  windForce = 0,
  density = 1,
  sunlightIntensity = 0.8,
  masterOn = true,
  timeOfDay = 'day',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const dispersionSpriteDay = useRef<HTMLCanvasElement | null>(null);
  const dispersionSpriteNight = useRef<HTMLCanvasElement | null>(null);

  // Three continuous streamline trails (每炷香一缕独立的连续流线)
  const trailsRef = useRef<SmokeNode[][]>([[], [], []]);

  // Secondary ephemeral wisps (随主气流剥离飘散的轻灵游丝)
  const MAX_WISPS = 16;
  const wispsPool = useRef<SecondaryWisp[]>([]);

  const propsRef = useRef({ isLit, windForce, density, sunlightIntensity, masterOn, timeOfDay });
  useEffect(() => {
    propsRef.current = { isLit, windForce, density, sunlightIntensity, masterOn, timeOfDay };
  }, [isLit, windForce, density, sunlightIntensity, masterOn, timeOfDay]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    if (!dispersionSpriteDay.current) dispersionSpriteDay.current = createDispersionSprite(false);
    if (!dispersionSpriteNight.current) dispersionSpriteNight.current = createDispersionSprite(true);

    canvas.width  = CANVAS_W * 2;
    canvas.height = CANVAS_H * 2;

    const wPool: SecondaryWisp[] = [];
    for (let i = 0; i < MAX_WISPS; i++) {
      wPool.push({
        active: false,
        x: 0, y: 0, vx: 0, vy: 0,
        age: 0, maxAge: 60, size: 2, alpha: 0, phase: 0,
      });
    }
    wispsPool.current = wPool;

    let time = 0;
    let spawnTimer = 0;

    const spawnWisp = (x: number, y: number, vx: number, vy: number, alpha: number) => {
      const pool = wispsPool.current;
      for (let i = 0; i < pool.length; i++) {
        if (!pool[i].active) {
          const w = pool[i];
          w.active = true;
          w.x = x;
          w.y = y;
          w.vx = vx;
          w.vy = vy;
          w.age = 0;
          w.maxAge = 45 + Math.random() * 25;
          w.size = 1.5 + Math.random() * 1.0;
          w.alpha = alpha;
          w.phase = Math.random() * Math.PI * 2;
          return;
        }
      }
    };

    const render = () => {
      time += 0.016;
      spawnTimer += 1;

      const {
        isLit: lit,
        windForce: wind,
        density: den,
        masterOn: mOn,
        timeOfDay: tod,
      } = propsRef.current;

      const isNightMode = !mOn || tod === 'night';
      const sprite = (isNightMode ? dispersionSpriteNight : dispersionSpriteDay).current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(2, 2);

      // ── 1. Render Incense Sticks (三炷线香) ─────────────────────────────────
      ctx.lineCap = 'round';
      for (let i = 0; i < EMBERS.length; i++) {
        const emb = EMBERS[i];

        // Incense body (natural sandalwood / agarwood texture)
        ctx.beginPath();
        ctx.moveTo(CENTER_X + (i - 1) * 0.8, BURNER_BASE_Y);
        ctx.lineTo(emb.x, emb.y);
        ctx.lineWidth = 1.3;
        ctx.strokeStyle = '#3e271a';
        ctx.stroke();

        // Subtle highlight line on the stick
        ctx.beginPath();
        ctx.moveTo(CENTER_X + (i - 1) * 0.8 - 0.2, BURNER_BASE_Y);
        ctx.lineTo(emb.x - 0.2, emb.y);
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = '#63442f';
        ctx.stroke();

        // Burnt ash segment right below the ember tip
        ctx.beginPath();
        ctx.moveTo(emb.x, emb.y);
        ctx.lineTo(emb.x, emb.y + 1.8);
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = '#7c766e';
        ctx.stroke();
      }

      // ── 2. Emit New Streamline Nodes (半高度，饱满清晰) ──────────────────────
      if (lit) {
        const trails = trailsRef.current;
        for (let s = 0; s < EMBERS.length; s++) {
          const emb = EMBERS[s];
          trails[s].unshift({
            x: emb.x + (Math.random() - 0.5) * 0.2,
            y: emb.y - 1.2,
            age: 0,
            // Height reduced by half: maxAge tuned to ~80-95 frames
            maxAge: 82 + Math.random() * 16,
            noiseSeed: Math.random() * 100,
          });

          // Secondary wisps
          if (spawnTimer % 20 === 0 && Math.random() < 0.35 * den) {
            spawnWisp(
              emb.x + (Math.random() - 0.5) * 2,
              emb.y - 20 - Math.random() * 30,
              (Math.random() - 0.5) * 0.12 + wind * 0.15,
              -0.5 - Math.random() * 0.2,
              0.20 * den
            );
          }
        }
      }

      // ── 3. Update Streamline Nodes ─────────────────────────────────────────
      const trails = trailsRef.current;
      for (let s = 0; s < trails.length; s++) {
        const trail = trails[s];
        const emb = EMBERS[s];

        for (let i = trail.length - 1; i >= 0; i--) {
          const node = trail[i];
          node.age += 1;
          const progress = node.age / node.maxAge;

          // Prune when reached max age or reached half-height apex
          if (progress >= 1 || node.y <= SMOKE_APEX_Y) {
            trail.splice(i, 1);
            continue;
          }

          // Buoyancy
          const riseSpeed = 1.15 - progress * 0.32;
          node.y -= riseSpeed;

          const heightAboveEmber = emb.y - node.y;

          // Laminar flow near ember: straight silk thread for first 15px
          const laminarTransition = Math.min(1, Math.max(0, (heightAboveEmber - 12) / 22));
          const curlStrength = Math.pow(laminarTransition, 1.8);

          // Fluid undulation (轻烟袅袅): harmonic traveling waves
          const freq1 = 0.038;
          const freq2 = 0.076;
          const w1 = Math.sin(heightAboveEmber * freq1 - time * 2.3 + s * 1.8);
          const w2 = Math.cos(heightAboveEmber * freq2 - time * 3.2 + s * 2.6) * 0.35;
          const w3 = Math.sin(heightAboveEmber * 0.016 - time * 1.1 + s * 0.9) * 0.42;

          // Wave amplitude scaled for compact height
          const waveAmp = Math.pow(progress, 1.3) * 14 * curlStrength;
          const waveX = (w1 + w2 + w3) * waveAmp;

          // Wind force
          const windDrift = wind * 24 * Math.pow(progress, 1.25);

          // Inter-stick gentle separation
          const divergence = (s - 1) * 1.6 * (1 + progress * 1.8);

          const targetX = emb.x + divergence + waveX + windDrift;
          node.x += (targetX - node.x) * 0.15;
        }
      }

      // ── 4. Render Smoke Streams (恢复饱满清晰度，仅减高度) ───────────────────
      // Maintain full, clear visibility requested by user
      const baseAlpha = Math.min(1.2, den * 1.0);

      for (let s = 0; s < trails.length; s++) {
        const trail = trails[s];
        if (trail.length < 3) continue;

        const emberY = EMBERS[s].y;
        const apexY = emberY - SMOKE_MAX_HEIGHT;

        // ── Pass A: Soft Diffuse Halo (外层柔和烟气晕染) ──
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < trail.length - 1; i++) {
          const xc = (trail[i].x + trail[i + 1].x) / 2;
          const yc = (trail[i].y + trail[i + 1].y) / 2;
          ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        }

        const haloGrad = ctx.createLinearGradient(0, emberY, 0, apexY);
        if (isNightMode) {
          haloGrad.addColorStop(0,    `rgba(242, 236, 224, 0)`);
          haloGrad.addColorStop(0.12, `rgba(238, 230, 218, ${0.14 * baseAlpha})`);
          haloGrad.addColorStop(0.45, `rgba(230, 222, 208, ${0.18 * baseAlpha})`);
          haloGrad.addColorStop(0.80, `rgba(220, 212, 198, ${0.08 * baseAlpha})`);
          haloGrad.addColorStop(1.0,  `rgba(210, 202, 188, 0)`);
        } else {
          haloGrad.addColorStop(0,    `rgba(245, 243, 239, 0)`);
          haloGrad.addColorStop(0.12, `rgba(238, 235, 230, ${0.15 * baseAlpha})`);
          haloGrad.addColorStop(0.45, `rgba(230, 227, 221, ${0.17 * baseAlpha})`);
          haloGrad.addColorStop(0.80, `rgba(222, 218, 212, ${0.07 * baseAlpha})`);
          haloGrad.addColorStop(1.0,  `rgba(215, 210, 205, 0)`);
        }
        ctx.strokeStyle = haloGrad;
        ctx.lineWidth = 5.6;
        ctx.stroke();

        // ── Pass B: Main Streamline Ribbon (中层轻烟缕丝) ──
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < trail.length - 1; i++) {
          const xc = (trail[i].x + trail[i + 1].x) / 2;
          const yc = (trail[i].y + trail[i + 1].y) / 2;
          ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        }

        const bodyGrad = ctx.createLinearGradient(0, emberY, 0, apexY);
        if (isNightMode) {
          bodyGrad.addColorStop(0,    `rgba(250, 245, 236, 0)`);
          bodyGrad.addColorStop(0.05, `rgba(248, 242, 232, ${0.46 * baseAlpha})`);
          bodyGrad.addColorStop(0.35, `rgba(242, 236, 225, ${0.40 * baseAlpha})`);
          bodyGrad.addColorStop(0.70, `rgba(232, 225, 212, ${0.22 * baseAlpha})`);
          bodyGrad.addColorStop(1.0,  `rgba(220, 212, 200, 0)`);
        } else {
          bodyGrad.addColorStop(0,    `rgba(252, 250, 246, 0)`);
          bodyGrad.addColorStop(0.05, `rgba(246, 244, 240, ${0.48 * baseAlpha})`);
          bodyGrad.addColorStop(0.35, `rgba(240, 237, 232, ${0.38 * baseAlpha})`);
          bodyGrad.addColorStop(0.70, `rgba(232, 228, 222, ${0.20 * baseAlpha})`);
          bodyGrad.addColorStop(1.0,  `rgba(225, 220, 215, 0)`);
        }
        ctx.strokeStyle = bodyGrad;
        ctx.lineWidth = 2.2;
        ctx.stroke();

        // ── Pass C: Core Silk Thread ("一丝丝" 核心银白细丝 - 清晰可辨) ──
        const coreLen = Math.floor(trail.length * 0.68);
        if (coreLen > 2) {
          ctx.beginPath();
          ctx.moveTo(trail[0].x, trail[0].y);
          for (let i = 1; i < coreLen - 1; i++) {
            const xc = (trail[i].x + trail[i + 1].x) / 2;
            const yc = (trail[i].y + trail[i + 1].y) / 2;
            ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
          }

          const coreGrad = ctx.createLinearGradient(0, emberY, 0, emberY - 60);
          if (isNightMode) {
            coreGrad.addColorStop(0,    `rgba(255, 252, 245, 0)`);
            coreGrad.addColorStop(0.02, `rgba(255, 252, 245, ${0.82 * baseAlpha})`);
            coreGrad.addColorStop(0.35, `rgba(250, 246, 238, ${0.65 * baseAlpha})`);
            coreGrad.addColorStop(0.75, `rgba(242, 236, 226, ${0.25 * baseAlpha})`);
            coreGrad.addColorStop(1.0,  `rgba(235, 228, 218, 0)`);
          } else {
            coreGrad.addColorStop(0,    `rgba(255, 255, 255, 0)`);
            coreGrad.addColorStop(0.02, `rgba(255, 254, 250, ${0.84 * baseAlpha})`);
            coreGrad.addColorStop(0.35, `rgba(248, 246, 242, ${0.62 * baseAlpha})`);
            coreGrad.addColorStop(0.75, `rgba(240, 237, 232, ${0.24 * baseAlpha})`);
            coreGrad.addColorStop(1.0,  `rgba(232, 228, 222, 0)`);
          }
          ctx.strokeStyle = coreGrad;
          ctx.lineWidth = 0.95;
          ctx.stroke();
        }

        // ── Pass D: Dispersion at Apex ──
        if (sprite && trail.length > 15) {
          const step = Math.max(3, Math.floor(trail.length / 8));
          for (let i = Math.floor(trail.length * 0.65); i < trail.length; i += step) {
            const node = trail[i];
            const p = node.age / node.maxAge;
            const fade = Math.sin(p * Math.PI) * 0.26 * baseAlpha;
            const sz = 14 + p * 14;
            ctx.save();
            ctx.globalAlpha = fade;
            ctx.drawImage(sprite, node.x - sz / 2, node.y - sz / 2, sz, sz);
            ctx.restore();
          }
        }
      }

      // ── 5. Secondary Ephemeral Wisps (游丝微粒) ────────────────────────────
      const wisps = wispsPool.current;
      for (let i = 0; i < wisps.length; i++) {
        const w = wisps[i];
        if (!w.active) continue;

        w.age += 1;
        const prog = w.age / w.maxAge;
        if (prog >= 1 || w.y <= SMOKE_APEX_Y) {
          w.active = false;
          continue;
        }

        w.x += w.vx + Math.sin(w.age * 0.05 + w.phase) * 0.20;
        w.y += w.vy;
        w.size += 0.022;

        const alpha = w.alpha * Math.sin(prog * Math.PI) * (isNightMode ? 0.9 : 0.75);

        ctx.save();
        ctx.beginPath();
        ctx.arc(w.x, w.y, w.size, 0, Math.PI * 2);
        ctx.fillStyle = isNightMode
          ? `rgba(245, 240, 230, ${alpha})`
          : `rgba(240, 238, 234, ${alpha})`;
        ctx.fill();
        ctx.restore();
      }

      // ── 6. Burning Ember Tips (香头微火呼吸) ───────────────────────────────
      for (let i = 0; i < EMBERS.length; i++) {
        const emb = EMBERS[i];
        if (lit) {
          const pulse = Math.sin(time * 3.5 + i * 2.09) * 0.22 + 0.85;

          // Outer soft thermal glow
          ctx.beginPath();
          ctx.arc(emb.x, emb.y, 3.0 * pulse, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 105, 30, 0.32)';
          ctx.fill();

          // Warm ember orange core
          ctx.beginPath();
          ctx.arc(emb.x, emb.y, 1.35, 0, Math.PI * 2);
          ctx.fillStyle = '#ff7828';
          ctx.fill();

          // White-hot center point
          ctx.beginPath();
          ctx.arc(emb.x, emb.y, 0.65, 0, Math.PI * 2);
          ctx.fillStyle = '#fffdf0';
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(emb.x, emb.y, 1.0, 0, Math.PI * 2);
          ctx.fillStyle = '#261b12';
          ctx.fill();
        }
      }

      ctx.restore();
      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggle) {
      if (!isLit) {
        sound.playMatchStrike();
        sound.playBell(528, 2.5);
      } else {
        sound.playExtinguish();
      }
      onToggle();
    }
  };

  return (
    <div
      onClick={handleClick}
      title={isLit ? '点击熄灭香火' : '点击敬点清香'}
      className={`relative cursor-pointer select-none ${className}`}
      style={{ width: CANVAS_W, height: CANVAS_H }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none"
        style={{ transform: 'translateZ(0)', willChange: 'transform' }}
      />
    </div>
  );
};
