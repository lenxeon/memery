import React, { useEffect, useRef } from 'react';
import { sound } from '../utils/audio';

interface IncenseSmokeProps {
  isLit: boolean;
  onToggle?: () => void;
  windForce?: number;
  density?: number;
  sunlightIntensity?: number;
  className?: string;
}

interface SmokePoint {
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

export const IncenseSmoke: React.FC<IncenseSmokeProps> = ({
  isLit,
  onToggle,
  windForce = 0,
  density = 1,
  sunlightIntensity = 0.8,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const particles = useRef<SmokePoint[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 160;
    const height = 280;
    canvas.width = width * 2;
    canvas.height = height * 2;

    let time = 0;

    const getEmbers = () => {
      const cx = width / 2;
      const cy = height - 18;
      return [
        { x: cx - 7, y: cy - 22 },
        { x: cx, y: cy - 25 },
        { x: cx + 7, y: cy - 22 },
      ];
    };

    const render = () => {
      time += 0.04;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(2, 2);

      const embers = getEmbers();
      const burnerBaseX = width / 2;
      const burnerBaseY = height - 2;

      // Draw incense sticks
      ctx.save();
      ctx.lineWidth = 1.4;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#4a2f1b';
      embers.forEach((emb) => {
        ctx.beginPath();
        ctx.moveTo(burnerBaseX, burnerBaseY);
        ctx.lineTo(emb.x, emb.y);
        ctx.stroke();
      });
      ctx.restore();

      // Spawn smoke
      if (isLit && Math.random() < 0.85 * density) {
        embers.forEach((emb, idx) => {
          if (Math.random() < 0.7) {
            particles.current.push({
              x: emb.x + (Math.random() - 0.5) * 1.5,
              y: emb.y - 1,
              vx: (Math.sin(time * 2 + idx) * 0.2) + (windForce * 0.4),
              vy: -1.2 - Math.random() * 0.6,
              age: 0,
              maxAge: 110 + Math.random() * 40,
              size: 2.5 + Math.random() * 2,
              alpha: 0.45 * density,
              rot: Math.random() * Math.PI * 2,
              vrot: (Math.random() - 0.5) * 0.04,
            });
          }
        });
      }

      // Update particles
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.age += 1;
        const progress = p.age / p.maxAge;

        const curlFreq = 0.05;
        const curlNoise = Math.sin((p.y * curlFreq) + time * 1.5) * (0.8 + progress * 2.2);

        p.vx += (windForce * 0.03) + curlNoise * 0.04;
        p.vx *= 0.98;
        p.vy *= 0.995;
        p.x += p.vx;
        p.y += p.vy;
        p.size += 0.22;
        p.rot += p.vrot;

        let currentAlpha = p.alpha;
        if (progress < 0.1) {
          currentAlpha = p.alpha * (progress / 0.1);
        } else {
          currentAlpha = p.alpha * (1 - (progress - 0.1) / 0.9);
        }

        if (progress >= 1 || currentAlpha <= 0.005 || p.y < 0) {
          particles.current.splice(i, 1);
          continue;
        }

        const isSunlit = sunlightIntensity > 0.3;
        const warmSun = isSunlit ? 0.35 * sunlightIntensity : 0;
        const r = Math.min(255, 230 + warmSun * 25);
        const g = Math.min(255, 230 + warmSun * 20);
        const b = Math.min(255, 235 - warmSun * 30);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);

        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentAlpha * 0.7})`);
        grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${currentAlpha * 0.3})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Embers tips
      embers.forEach((emb, i) => {
        if (isLit) {
          const pulse = Math.sin(time * 6 + i * 2) * 0.3 + 0.7;
          ctx.save();
          const emberGlow = ctx.createRadialGradient(emb.x, emb.y, 0.5, emb.x, emb.y, 6);
          emberGlow.addColorStop(0, `rgba(255, 120, 30, ${0.9 * pulse})`);
          emberGlow.addColorStop(0.4, `rgba(255, 60, 0, ${0.5 * pulse})`);
          emberGlow.addColorStop(1, 'rgba(255, 50, 0, 0)');
          ctx.fillStyle = emberGlow;
          ctx.beginPath();
          ctx.arc(emb.x, emb.y, 6, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(emb.x, emb.y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = '#fff4d0';
          ctx.fill();
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(emb.x, emb.y, 1, 0, Math.PI * 2);
          ctx.fillStyle = '#22150c';
          ctx.fill();
        }
      });

      ctx.restore();
      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isLit, windForce, density, sunlightIntensity]);

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
      style={{ width: 160, height: 280 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none"
      />
    </div>
  );
};
