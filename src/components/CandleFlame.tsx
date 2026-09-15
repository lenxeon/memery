import React, { useEffect, useRef } from 'react';
import { sound } from '../utils/audio';

interface CandleFlameProps {
  isLit: boolean;
  onToggle?: () => void;
  windForce?: number;
  glowIntensity?: number;
  scale?: number;
  className?: string;
  health?: number;
}

export const CandleFlame: React.FC<CandleFlameProps> = ({
  isLit,
  onToggle,
  windForce = 0,
  glowIntensity = 1,
  scale = 1,
  className = '',
  health = 1.0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const idleTimerId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const smokeParticles = useRef<Array<{ x: number; y: number; vx: number; vy: number; alpha: number; size: number }>>([]);
  const emberAlpha = useRef<number>(0);
  const renderRef = useRef<(() => void) | null>(null);

  const propsRef = useRef({ isLit, windForce, glowIntensity, scale, health });
  useEffect(() => {
    propsRef.current = { isLit, windForce, glowIntensity, scale, health };
  }, [isLit, windForce, glowIntensity, scale, health]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let time = Math.random() * 100;
    const width = 80;
    const height = 110;
    canvas.width = width * 2;
    canvas.height = height * 2;

    const render = () => {
      time += 0.05;
      const { isLit: lit, windForce: wind, glowIntensity: glow, scale: sc, health: hl = 1.0 } = propsRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(2, 2);

      const centerX = width / 2; // 40
      const baseY = height - 16;  // 94

      if (lit) {
        emberAlpha.current = 1;

        // 烛火后期自适应减小 (当生机低于 0.4 时平滑缩小至 ~45%)
        const lateFlameFactor = hl > 0.4 
          ? 1.0 
          : Math.max(0.42, 0.42 + 0.58 * (hl / 0.4));

        const microFlicker = Math.sin(time * 12) * 0.5 + Math.cos(time * 23) * 0.3;
        const windTilt = wind * 12 + Math.sin(time * 3) * 2;
        const flameHeight = (38 + Math.sin(time * 7) * 3 + microFlicker * 2) * sc * lateFlameFactor;
        const flameWidth = (14 + Math.cos(time * 5) * 1.5) * sc * Math.max(0.55, lateFlameFactor);

        // 1. Soft Warm Ambient Glow (光晕在后期也同步微缩)
        const effectiveGlow = glow * (0.35 + 0.65 * lateFlameFactor);
        const maxGlowRadius = 28 * sc * Math.max(0.5, lateFlameFactor);
        const glowCenterY = baseY - flameHeight * 0.45;
        const radialGlow = ctx.createRadialGradient(
          centerX + windTilt * 0.3,
          glowCenterY,
          1,
          centerX,
          glowCenterY,
          maxGlowRadius
        );
        radialGlow.addColorStop(0, `rgba(255, 180, 50, ${0.4 * effectiveGlow})`);
        radialGlow.addColorStop(0.4, `rgba(255, 130, 20, ${0.18 * effectiveGlow})`);
        radialGlow.addColorStop(0.75, `rgba(255, 90, 0, ${0.04 * effectiveGlow})`);
        radialGlow.addColorStop(1, 'rgba(255, 90, 0, 0)');

        ctx.fillStyle = radialGlow;
        ctx.beginPath();
        ctx.arc(centerX, glowCenterY, maxGlowRadius, 0, Math.PI * 2);
        ctx.fill();

        // 2. Outer Flame Teardrop (Warm Golden Orange)
        const tipX = centerX + windTilt;
        const tipY = baseY - flameHeight;

        ctx.beginPath();
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
        outerGrad.addColorStop(0, 'rgba(255, 80, 0, 0.95)');
        outerGrad.addColorStop(0.3, 'rgba(255, 140, 10, 0.92)');
        outerGrad.addColorStop(0.75, 'rgba(255, 215, 60, 0.9)');
        outerGrad.addColorStop(1, 'rgba(255, 245, 180, 0.4)');
        ctx.fillStyle = outerGrad;
        ctx.fill();

        // 3. Inner Core Flame (Luminous Pure Yellow-White)
        const innerH = flameHeight * 0.65;
        const innerW = flameWidth * 0.55;
        const innerTipX = centerX + windTilt * 0.75;
        const innerTipY = baseY - innerH;

        ctx.beginPath();
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
        innerGrad.addColorStop(0, '#ff9500');
        innerGrad.addColorStop(0.35, '#ffee55');
        innerGrad.addColorStop(0.75, '#ffffff');
        innerGrad.addColorStop(1, '#ffffff');
        ctx.fillStyle = innerGrad;
        ctx.fill();

        // 4. Blue Flame Base (Clean natural candle combustion)
        ctx.beginPath();
        ctx.ellipse(centerX, baseY + 1, flameWidth * 0.35, 3, 0, 0, Math.PI * 2);
        const blueGrad = ctx.createRadialGradient(centerX, baseY + 1, 0, centerX, baseY + 1, flameWidth * 0.35);
        blueGrad.addColorStop(0, 'rgba(60, 130, 255, 0.75)');
        blueGrad.addColorStop(0.7, 'rgba(40, 90, 230, 0.35)');
        blueGrad.addColorStop(1, 'rgba(20, 50, 180, 0)');
        ctx.fillStyle = blueGrad;
        ctx.fill();

      } else {
        if (emberAlpha.current > 0.01) {
          emberAlpha.current *= 0.985;
          if (Math.random() < 0.35) {
            smokeParticles.current.push({
              x: centerX + (Math.random() - 0.5) * 4,
              y: baseY - 4,
              vx: wind * 0.5 + (Math.random() - 0.5) * 0.6,
              vy: -0.8 - Math.random() * 0.6,
              alpha: 0.6 * emberAlpha.current,
              size: 2 + Math.random() * 2,
            });
          }

          ctx.beginPath();
          ctx.arc(centerX, baseY - 3, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 80, 20, ${emberAlpha.current})`;
          ctx.fill();
        }
      }

      // Render smoke after extinguishing
      for (let i = smokeParticles.current.length - 1; i >= 0; i--) {
        const p = smokeParticles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha *= 0.96;
        p.size += 0.15;

        if (p.alpha <= 0.02 || p.y < 0) {
          smokeParticles.current.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(220, 220, 220, ${p.alpha})`;
          ctx.fill();
        }
      }

      // Candle Wick
      ctx.beginPath();
      ctx.moveTo(centerX, baseY + 6);
      ctx.quadraticCurveTo(centerX + (lit ? 1.5 : 0.5), baseY + 1, centerX + 1, baseY - 3);
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = '#2d1f14';
      ctx.lineCap = 'round';
      ctx.stroke();

      ctx.restore();

      // Throttle: once unlit + ember gone + no particles → idle poll at 500ms
      const fullyIdle =
        !propsRef.current.isLit &&
        emberAlpha.current <= 0.01 &&
        smokeParticles.current.length === 0;

      if (fullyIdle) {
        idleTimerId.current = setTimeout(() => {
          if (renderRef.current) renderRef.current();
        }, 500);
      } else {
        animFrameId.current = requestAnimationFrame(render);
      }
    };

    renderRef.current = render;
    render();

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
        animFrameId.current = null;
      }
      if (idleTimerId.current) {
        clearTimeout(idleTimerId.current);
        idleTimerId.current = null;
      }
    };
  }, []);

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
        style={{ transform: 'translateZ(0)', willChange: 'transform' }}
      />
    </div>
  );
};
