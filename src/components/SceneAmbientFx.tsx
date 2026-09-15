import React, { useEffect, useRef } from 'react';
import { WallBackgroundStyle, LightingSettings } from '../types';

interface SceneAmbientFxProps {
  wallStyle: WallBackgroundStyle;
  lighting: LightingSettings;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vrot: number;
  alpha: number;
  maxAlpha: number;
  color: string;
  type: 'petal' | 'firefly' | 'maple' | 'ginkgo' | 'snow' | 'bamboo_leaf' | 'gold_fleck' | 'cream_mote';
  pulsePhase: number;
  pulseSpeed: number;
}

export const SceneAmbientFx: React.FC<SceneAmbientFxProps> = ({ wallStyle, lighting }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const stateRef = useRef({ wallStyle, lighting });

  stateRef.current = { wallStyle, lighting };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize particles according to theme
    const initParticles = (style: WallBackgroundStyle) => {
      const list: Particle[] = [];
      const count = style === 'summer_firefly' ? 42 : style === 'winter_snow' ? 65 : style === 'spring_sakura' ? 38 : style === 'autumn_maple' ? 32 : 28;

      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;

        if (style === 'spring_sakura') {
          // 🌸 春：轻柔飘舞的樱花花瓣
          const colors = ['#fbcfe8', '#f472b6', '#fda4af', '#fff1f2', '#f9a8d4'];
          list.push({
            x,
            y,
            vx: 0.35 + Math.random() * 0.6,
            vy: 0.5 + Math.random() * 0.8,
            size: 6 + Math.random() * 7,
            rot: Math.random() * Math.PI * 2,
            vrot: (Math.random() - 0.5) * 0.04,
            alpha: 0.3 + Math.random() * 0.55,
            maxAlpha: 0.8,
            color: colors[Math.floor(Math.random() * colors.length)],
            type: 'petal',
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.03 + Math.random() * 0.03,
          });
        } else if (style === 'summer_firefly') {
          // 🌌 夏：微光萤火粒子，呼吸起伏浮游
          const colors = ['#bef264', '#fef08a', '#86efac', '#facc15'];
          list.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 0.45,
            vy: (Math.random() - 0.5) * 0.45,
            size: 2.2 + Math.random() * 2.8,
            rot: 0,
            vrot: 0,
            alpha: 0.1,
            maxAlpha: 0.75 + Math.random() * 0.25,
            color: colors[Math.floor(Math.random() * colors.length)],
            type: 'firefly',
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02 + Math.random() * 0.03,
          });
        } else if (style === 'autumn_maple') {
          // 🍁 秋：红枫与金杏叶旋舞下落
          const isGinkgo = Math.random() > 0.5;
          const colors = isGinkgo ? ['#fbbf24', '#f59e0b', '#d97706'] : ['#dc2626', '#b91c1c', '#ea580c', '#c2410c'];
          list.push({
            x,
            y,
            vx: 0.2 + Math.random() * 0.6,
            vy: 0.6 + Math.random() * 0.9,
            size: 8 + Math.random() * 8,
            rot: Math.random() * Math.PI * 2,
            vrot: (Math.random() - 0.5) * 0.05,
            alpha: 0.5 + Math.random() * 0.4,
            maxAlpha: 0.85,
            color: colors[Math.floor(Math.random() * colors.length)],
            type: isGinkgo ? 'ginkgo' : 'maple',
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02,
          });
        } else if (style === 'winter_snow') {
          // ❄️ 冬：静谧飘落的雪花
          list.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 0.35,
            vy: 0.4 + Math.random() * 0.85,
            size: 1.5 + Math.random() * 3.5,
            rot: Math.random() * Math.PI * 2,
            vrot: (Math.random() - 0.5) * 0.02,
            alpha: 0.3 + Math.random() * 0.65,
            maxAlpha: 0.9,
            color: '#ffffff',
            type: 'snow',
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.015,
          });
        } else if (style === 'zen_bamboo') {
          // 🎋 禅：水墨竹叶轻落与檀香微尘
          list.push({
            x,
            y,
            vx: 0.15 + Math.random() * 0.4,
            vy: 0.35 + Math.random() * 0.5,
            size: 7 + Math.random() * 6,
            rot: Math.random() * Math.PI * 2,
            vrot: (Math.random() - 0.5) * 0.03,
            alpha: 0.25 + Math.random() * 0.4,
            maxAlpha: 0.65,
            color: '#2d4a3e',
            type: 'bamboo_leaf',
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02,
          });
        } else if (style === 'classical_lattice') {
          // 🏮 古典：宫廷金粉微芒浮沉
          list.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 0.3,
            vy: -0.1 - Math.random() * 0.3,
            size: 1.8 + Math.random() * 2.2,
            rot: Math.random() * Math.PI * 2,
            vrot: (Math.random() - 0.5) * 0.03,
            alpha: 0.2 + Math.random() * 0.6,
            maxAlpha: 0.85,
            color: '#fbbf24',
            type: 'gold_fleck',
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.03,
          });
        } else {
          // 🍦 现代：极简柔光微尘
          list.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 0.2,
            vy: -0.15 - Math.random() * 0.2,
            size: 1.5 + Math.random() * 2.0,
            rot: 0,
            vrot: 0,
            alpha: 0.15 + Math.random() * 0.35,
            maxAlpha: 0.55,
            color: '#f5f0e6',
            type: 'cream_mote',
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02,
          });
        }
      }
      particlesRef.current = list;
    };

    initParticles(wallStyle);

    let currentStyle = wallStyle;
    let frameCount = 0;

    const render = () => {
      frameCount++;
      const { wallStyle: targetStyle } = stateRef.current;

      if (targetStyle !== currentStyle) {
        currentStyle = targetStyle;
        initParticles(currentStyle);
      }

      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Move
        p.pulsePhase += p.pulseSpeed;
        p.rot += p.vrot;

        if (p.type === 'firefly') {
          // 萤火虫在空中做布朗微扰漫游与呼吸
          p.x += p.vx + Math.sin(p.pulsePhase * 0.7) * 0.4;
          p.y += p.vy + Math.cos(p.pulsePhase * 0.9) * 0.35;
          if (frameCount % 45 === i % 45) {
            p.vx = (Math.random() - 0.5) * 0.5;
            p.vy = (Math.random() - 0.5) * 0.4;
          }
          p.alpha = Math.max(0.04, (Math.sin(p.pulsePhase) * 0.5 + 0.5) * p.maxAlpha);
        } else {
          p.x += p.vx + Math.sin(p.pulsePhase) * 0.3;
          p.y += p.vy;
        }

        // Wrap around boundaries
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        } else if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        else if (p.x < -20) p.x = width + 20;

        // 2. Draw Particle Shape
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.alpha;

        if (p.type === 'petal') {
          // 🌸 樱花花瓣形状
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.5, p.size * 0.8, p.size * 0.5, 0, p.size);
          ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.5, -p.size * 0.8, -p.size * 0.5, 0, -p.size);
          ctx.fill();
        } else if (p.type === 'firefly') {
          // 🌌 萤火虫发光光团 (双层辐射光晕)
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 3.5);
          grad.addColorStop(0, '#ffffff');
          grad.addColorStop(0.25, p.color);
          grad.addColorStop(0.65, 'rgba(190, 242, 100, 0.4)');
          grad.addColorStop(1, 'rgba(190, 242, 100, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 3.5, 0, Math.PI * 2);
          ctx.fill();

          // Core bright spark
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.7, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'maple') {
          // 🍁 红枫叶形状 (五角锯齿星芒)
          ctx.fillStyle = p.color;
          ctx.beginPath();
          const s = p.size;
          ctx.moveTo(0, -s);
          ctx.lineTo(s * 0.35, -s * 0.3);
          ctx.lineTo(s * 0.9, -s * 0.4);
          ctx.lineTo(s * 0.5, 0.1);
          ctx.lineTo(s * 0.7, s * 0.7);
          ctx.lineTo(0, s * 0.35);
          ctx.lineTo(-s * 0.7, s * 0.7);
          ctx.lineTo(-s * 0.5, 0.1);
          ctx.lineTo(-s * 0.9, -s * 0.4);
          ctx.lineTo(-s * 0.35, -s * 0.3);
          ctx.closePath();
          ctx.fill();
        } else if (p.type === 'ginkgo') {
          // 扇形银杏叶形状
          ctx.fillStyle = p.color;
          ctx.beginPath();
          const s = p.size;
          ctx.moveTo(0, s * 0.6);
          ctx.lineTo(0, 0);
          ctx.arc(0, 0, s * 0.8, -Math.PI * 0.85, -Math.PI * 0.15);
          ctx.closePath();
          ctx.fill();
        } else if (p.type === 'snow') {
          // ❄️ 柔软雪花点
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
          grad.addColorStop(0, '#ffffff');
          grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.85)');
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'bamboo_leaf') {
          // 🎋 纤长水墨竹叶
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.quadraticCurveTo(p.size * 0.28, 0, 0, p.size);
          ctx.quadraticCurveTo(-p.size * 0.28, 0, 0, -p.size);
          ctx.fill();
        } else {
          // ✨ 金粉/微尘浮光点
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [wallStyle]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none select-none z-15 w-full h-full"
    />
  );
};
