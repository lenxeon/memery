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

export const DustMotes: React.FC<DustMotesProps> = ({
  density,
  sunlightIntensity,
  windForce = 0,
  timeOfDay,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const motes = useRef<Mote[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = Math.floor(density * (0.3 + sunlightIntensity * 0.7));
    const list: Mote[] = [];
    for (let i = 0; i < count; i++) {
      list.push({
        x: Math.random() * (canvas.width || 400),
        y: Math.random() * (canvas.height || 700),
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.15 - Math.random() * 0.35,
        size: 1 + Math.random() * 2.2,
        baseAlpha: 0.25 + Math.random() * 0.55,
        twinkleSpeed: 0.02 + Math.random() * 0.04,
        phase: Math.random() * Math.PI * 2,
      });
    }
    motes.current = list;

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (sunlightIntensity <= 0.05 && timeOfDay === 'night') {
        animFrameId.current = requestAnimationFrame(render);
        return;
      }

      let r = 255, g = 240, b = 200;
      if (timeOfDay === 'sunset') {
        r = 255; g = 210; b = 160;
      } else if (timeOfDay === 'night') {
        r = 190; g = 220; b = 255;
      }

      const w = canvas.width;
      const h = canvas.height;
      const centerX = w / 2;

      for (let i = 0; i < motes.current.length; i++) {
        const m = motes.current[i];
        m.phase += m.twinkleSpeed;
        m.x += m.vx + (windForce * 0.25) + Math.sin(time + m.phase) * 0.15;
        m.y += m.vy;

        if (m.y < 0) m.y = h;
        if (m.y > h) m.y = 0;
        if (m.x < 0) m.x = w;
        if (m.x > w) m.x = 0;

        const distFromCenterRatio = Math.abs(m.x - centerX) / (w * 0.5);
        const inBeamFactor = Math.max(0.2, 1 - distFromCenterRatio * 0.8);
        const twinkle = Math.sin(m.phase) * 0.3 + 0.7;
        const finalAlpha = m.baseAlpha * twinkle * sunlightIntensity * inBeamFactor;

        if (finalAlpha <= 0.01) continue;

        ctx.save();
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalAlpha})`;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
        ctx.shadowBlur = m.size * 3;
        ctx.fill();
        ctx.restore();
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [density, sunlightIntensity, windForce, timeOfDay]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-15"
    />
  );
};
