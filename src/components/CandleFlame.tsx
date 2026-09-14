import React, { useEffect, useRef } from 'react';
import { sound } from '../utils/audio';

interface CandleFlameProps {
  isLit: boolean;
  onToggle?: () => void;
  windForce?: number;
  glowIntensity?: number;
  scale?: number;
  className?: string;
}

export const CandleFlame: React.FC<CandleFlameProps> = ({
  isLit,
  onToggle,
  windForce = 0,
  glowIntensity = 1,
  scale = 1,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const smokeParticles = useRef<Array<{ x: number; y: number; vx: number; vy: number; alpha: number; size: number }>>([]);
  const emberAlpha = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = Math.random() * 100;
    const width = 80;
    const height = 110;
    canvas.width = width * 2;
    canvas.height = height * 2;

    const render = () => {
      time += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(2, 2);

      const centerX = width / 2;
      const baseY = height - 16;

      if (isLit) {
        emberAlpha.current = 1;

        const microFlicker = Math.sin(time * 12) * 0.5 + Math.cos(time * 23) * 0.3;
        const windTilt = (windForce * 12) + (Math.sin(time * 3) * 2);
        const flameHeight = (38 + Math.sin(time * 7) * 3 + microFlicker * 2) * scale;
        const flameWidth = (14 + Math.cos(time * 5) * 1.5) * scale;

        // 1. Radial ambient heat glow
        const glowRadius = (55 + Math.sin(time * 6) * 5) * glowIntensity * scale;
        const radialGlow = ctx.createRadialGradient(
          centerX + windTilt * 0.3,
          baseY - flameHeight * 0.4,
          2,
          centerX,
          baseY - flameHeight * 0.3,
          glowRadius
        );
        radialGlow.addColorStop(0, `rgba(255, 170, 50, ${0.45 * glowIntensity})`);
        radialGlow.addColorStop(0.3, `rgba(255, 120, 20, ${0.22 * glowIntensity})`);
        radialGlow.addColorStop(0.7, `rgba(255, 80, 0, ${0.08 * glowIntensity})`);
        radialGlow.addColorStop(1, 'rgba(255, 80, 0, 0)');

        ctx.fillStyle = radialGlow;
        ctx.beginPath();
        ctx.arc(centerX, baseY - flameHeight * 0.3, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // 2. Outer Flame (Warm Orange/Red teardrop)
        ctx.save();
        ctx.beginPath();
        const tipX = centerX + windTilt;
        const tipY = baseY - flameHeight;

        ctx.moveTo(centerX - flameWidth * 0.5, baseY);
        ctx.bezierCurveTo(
          centerX - flameWidth * 0.9, baseY - flameHeight * 0.35,
          centerX - flameWidth * 0.4 + windTilt * 0.5, baseY - flameHeight * 0.75,
          tipX, tipY
        );
        ctx.bezierCurveTo(
          centerX + flameWidth * 0.4 + windTilt * 0.5, baseY - flameHeight * 0.75,
          centerX + flameWidth * 0.9, baseY - flameHeight * 0.35,
          centerX + flameWidth * 0.5, baseY
        );
        ctx.closePath();

        const outerGrad = ctx.createLinearGradient(centerX, baseY, tipX, tipY);
        outerGrad.addColorStop(0, 'rgba(255, 90, 0, 0.95)');
        outerGrad.addColorStop(0.35, 'rgba(255, 140, 10, 0.9)');
        outerGrad.addColorStop(0.8, 'rgba(255, 210, 50, 0.85)');
        outerGrad.addColorStop(1, 'rgba(255, 240, 150, 0.3)');

        ctx.fillStyle = outerGrad;
        ctx.shadowColor = '#ff8800';
        ctx.shadowBlur = 12 * glowIntensity;
        ctx.fill();
        ctx.restore();

        // 3. Inner Core Flame (Luminous Yellow-White)
        ctx.save();
        ctx.beginPath();
        const innerH = flameHeight * 0.65;
        const innerW = flameWidth * 0.55;
        const innerTipX = centerX + windTilt * 0.75;
        const innerTipY = baseY - innerH;

        ctx.moveTo(centerX - innerW * 0.5, baseY - 2);
        ctx.bezierCurveTo(
          centerX - innerW * 0.8, baseY - innerH * 0.35,
          centerX - innerW * 0.3 + windTilt * 0.4, baseY - innerH * 0.75,
          innerTipX, innerTipY
        );
        ctx.bezierCurveTo(
          centerX + innerW * 0.3 + windTilt * 0.4, baseY - innerH * 0.75,
          centerX + innerW * 0.8, baseY - innerH * 0.35,
          centerX + innerW * 0.5, baseY - 2
        );
        ctx.closePath();

        const innerGrad = ctx.createLinearGradient(centerX, baseY, innerTipX, innerTipY);
        innerGrad.addColorStop(0, '#ff9900');
        innerGrad.addColorStop(0.4, '#ffee55');
        innerGrad.addColorStop(0.85, '#ffffff');
        innerGrad.addColorStop(1, '#ffffff');

        ctx.fillStyle = innerGrad;
        ctx.shadowColor = '#ffee88';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        // 4. Blue Flame Base
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(centerX, baseY + 1, flameWidth * 0.38, 3.5, 0, 0, Math.PI * 2);
        const blueGrad = ctx.createRadialGradient(centerX, baseY + 1, 0, centerX, baseY + 1, flameWidth * 0.4);
        blueGrad.addColorStop(0, 'rgba(50, 120, 255, 0.75)');
        blueGrad.addColorStop(0.7, 'rgba(30, 80, 220, 0.4)');
        blueGrad.addColorStop(1, 'rgba(20, 40, 180, 0)');
        ctx.fillStyle = blueGrad;
        ctx.fill();
        ctx.restore();

      } else {
        if (emberAlpha.current > 0.01) {
          emberAlpha.current *= 0.985;
          if (Math.random() < 0.4) {
            smokeParticles.current.push({
              x: centerX + (Math.random() - 0.5) * 4,
              y: baseY - 4,
              vx: (windForce * 0.5) + (Math.random() - 0.5) * 0.6,
              vy: -0.8 - Math.random() * 0.6,
              alpha: 0.6 * emberAlpha.current,
              size: 2 + Math.random() * 2,
            });
          }

          ctx.beginPath();
          ctx.arc(centerX, baseY - 3, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 80, 20, ${emberAlpha.current})`;
          ctx.shadowColor = '#ff4400';
          ctx.shadowBlur = 6 * emberAlpha.current;
          ctx.fill();
        }
      }

      for (let i = smokeParticles.current.length - 1; i >= 0; i--) {
        const p = smokeParticles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha *= 0.96;
        p.size += 0.15;

        if (p.alpha <= 0.02 || p.y < 0) {
          smokeParticles.current.splice(i, 1);
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(220, 220, 220, ${p.alpha})`;
          ctx.fill();
          ctx.restore();
        }
      }

      // Candle Wick
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, baseY + 6);
      ctx.quadraticCurveTo(centerX + (isLit ? 1.5 : 0.5), baseY + 1, centerX + 1, baseY - 3);
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = '#2d1f14';
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.restore();

      ctx.restore();
      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isLit, windForce, glowIntensity, scale]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggle) {
      if (isLit) {
        sound.playExtinguish();
      } else {
        sound.playMatchStrike();
      }
      onToggle();
    }
  };

  return (
    <div
      onClick={handleClick}
      title={isLit ? '点击熄灭烛火' : '点击点燃蜡烛'}
      className={`relative cursor-pointer select-none transition-transform active:scale-95 ${className}`}
      style={{ width: 80 * scale, height: 110 * scale }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none"
      />
    </div>
  );
};
