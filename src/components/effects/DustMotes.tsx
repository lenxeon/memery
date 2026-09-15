/**
 * @file DustMotes.tsx
 * @description 空气微尘悬浮粒子特效组件，提升环境空灵沉浸感。
 */
import React, { useEffect, useRef } from 'react';

interface DustMotesProps {
  density: number;
  sunlightIntensity: number;
  windForce?: number;
  timeOfDay: 'day' | 'sunset' | 'night';
}

interface Mote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
}

// Pre-render glowing dust mote sprites onto small offscreen canvases
// with a bright luminous glint core and soft aura
function createDustSprite(r: number, g: number, b: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // 1. Soft radial outer glow
    const grad = ctx.createRadialGradient(16, 16, 2, 16, 16, 15);
    grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
    grad.addColorStop(0.35, `rgba(${r}, ${g}, ${b}, 0.7)`);
    grad.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, 0.25)`);
    grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(16, 16, 15, 0, Math.PI * 2);
    ctx.fill();

    // 2. High-visibility bright glint speck
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(16, 16, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }
  return canvas;
}

export const DustMotes: React.FC<DustMotesProps> = ({
  density,
  sunlightIntensity,
  windForce = 0,
  timeOfDay,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const motes = useRef<Mote[]>([]);
  const spritesRef = useRef<Record<string, HTMLCanvasElement> | null>(null);

  const propsRef = useRef({ density, sunlightIntensity, windForce, timeOfDay });
  useEffect(() => {
    propsRef.current = { density, sunlightIntensity, windForce, timeOfDay };
  }, [density, sunlightIntensity, windForce, timeOfDay]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    if (!spritesRef.current) {
      spritesRef.current = {
        day: createDustSprite(255, 242, 205),
        sunset: createDustSprite(255, 215, 160),
        night: createDustSprite(200, 230, 255),
      };
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener('resize', resize);

    const MAX_MOTES = 120;
    const list: Mote[] = [];
    const w = canvas.width || 400;
    const h = canvas.height || 700;

    for (let i = 0; i < MAX_MOTES; i++) {
      list.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.15 - Math.random() * 0.35,
        size: 1.2 + Math.random() * 2.2,
        baseAlpha: 0.35 + Math.random() * 0.55,
        twinkleSpeed: 0.025 + Math.random() * 0.045,
        phase: Math.random() * Math.PI * 2,
      });
    }
    motes.current = list;

    let time = 0;

    const render = () => {
      time += 0.02;
      const { sunlightIntensity: sunInt, density: den, windForce: wind, timeOfDay: tod } = propsRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (sunInt <= 0.05 && tod === 'night') {
        animFrameId.current = requestAnimationFrame(render);
        return;
      }

      const sprite = spritesRef.current ? spritesRef.current[tod] || spritesRef.current.day : null;
      if (!sprite) {
        animFrameId.current = requestAnimationFrame(render);
        return;
      }

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const activeCount = Math.min(MAX_MOTES, Math.floor(den * (0.3 + sunInt * 0.7)));

      for (let i = 0; i < activeCount; i++) {
        const m = motes.current[i];
        m.phase += m.twinkleSpeed;
        m.x += m.vx + (wind * 0.25) + Math.sin(time + m.phase) * 0.15;
        m.y += m.vy;

        if (m.y < 0) m.y = height;
        if (m.y > height) m.y = 0;
        if (m.x < 0) m.x = width;
        if (m.x > width) m.x = 0;

        const distFromCenterRatio = Math.abs(m.x - centerX) / (width * 0.5);
        const inBeamFactor = Math.max(0.3, 1 - distFromCenterRatio * 0.7);
        const twinkle = Math.sin(m.phase) * 0.35 + 0.65;
        const finalAlpha = Math.min(1, m.baseAlpha * twinkle * (0.4 + sunInt * 0.6) * inBeamFactor);

        if (finalAlpha <= 0.02) continue;

        const drawSize = m.size * 7;
        ctx.globalAlpha = finalAlpha;
        ctx.drawImage(
          sprite,
          m.x - drawSize * 0.5,
          m.y - drawSize * 0.5,
          drawSize,
          drawSize
        );
      }

      ctx.globalAlpha = 1;

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-15"
      style={{ transform: 'translateZ(0)', willChange: 'transform' }}
    />
  );
};
