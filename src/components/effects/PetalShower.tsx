/**
 * @file PetalShower.tsx
 * @description 漫天落英缤纷高性能 Canvas 3D 物理引擎特效组件。
 * 具备极低重力空气浮力动力学、气流微涡翻滚、贡桌案台与木地板物理碰撞检测、
 * 案面/地面平铺停留及生命周期平滑消散。
 */
import React, { useEffect, useRef } from 'react';

interface PetalShowerProps {
  activeTrigger: number;
  flowerType?: string;
}

interface PhysicsPetal {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  gravity: number;
  terminalVy: number;
  swayAmp: number;
  swayFreq: number;
  swayPhase: number;
  pitch: number;
  roll: number;
  yaw: number;
  pitchSpeed: number;
  rollSpeed: number;
  yawSpeed: number;
  scale: number;
  depthRatio: number; // 落在桌面的进深比例 (0.0 ~ 1.0)
  status: 'falling' | 'settled' | 'fading';
  landedSurface?: 'table' | 'floor';
  stayDurationMs: number; // 停留在桌面/地面的生命时长 (毫秒)
  settledAtMs?: number;   // 刚着陆的时间戳
  fadeDurationMs: number;
  opacity: number;
  baseOpacity: number;
  colorPrimary: string;
  colorSecondary: string;
  colorEdge: string;
  petalShapeType: 'plum' | 'sunflower' | 'carnation' | 'calla' | 'tulip' | 'standard';
}

export const PetalShower: React.FC<PetalShowerProps> = ({ activeTrigger, flowerType = 'peonies' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const petalsRef = useRef<PhysicsPetal[]>([]);
  const animFrameIdRef = useRef<number | null>(null);

  // 花瓣色彩与几何分类
  const getFlowerPalette = (type: string) => {
    switch (type) {
      case 'plum_blossoms':
        return {
          shape: 'plum' as const,
          scaleRange: [7, 12],
          colors: [
            { p: '#ffffff', s: '#faf5ea', e: '#f1f5f9' },
            { p: '#fffef9', s: '#fce7f3', e: '#ffffff' },
            { p: '#ffffff', s: '#fef3c7', e: '#fefce8' },
          ],
        };
      case 'sunflowers':
        return {
          shape: 'sunflower' as const,
          scaleRange: [10, 16],
          colors: [
            { p: '#fde047', s: '#eab308', e: '#ca8a04' },
            { p: '#facc15', s: '#d97706', e: '#b45309' },
            { p: '#fef08a', s: '#f59e0b', e: '#d97706' },
          ],
        };
      case 'carnations':
        return {
          shape: 'carnation' as const,
          scaleRange: [8, 14],
          colors: [
            { p: '#ffffff', s: '#fbcfe8', e: '#f472b6' },
            { p: '#fff1f2', s: '#fda4af', e: '#fb7185' },
            { p: '#fdf2f8', s: '#f9a8d4', e: '#ec4899' },
          ],
        };
      case 'calla_lilies':
        return {
          shape: 'calla' as const,
          scaleRange: [10, 17],
          colors: [
            { p: '#ffffff', s: '#fff1f2', e: '#fbcfe8' },
            { p: '#fafaf9', s: '#fce7f3', e: '#f472b6' },
          ],
        };
      case 'tulips':
        return {
          shape: 'tulip' as const,
          scaleRange: [9, 15],
          colors: [
            { p: '#fb7185', s: '#e11d48', e: '#9f1239' },
            { p: '#f43f5e', s: '#be123c', e: '#881337' },
            { p: '#ffffff', s: '#fef08a', e: '#facc15' },
          ],
        };
      default:
        return {
          shape: 'standard' as const,
          scaleRange: [9, 15],
          colors: [
            { p: '#fbcfe8', s: '#f472b6', e: '#db2777' },
            { p: '#fff1f2', s: '#fda4af', e: '#f43f5e' },
            { p: '#ffffff', s: '#fbcfe8', e: '#f472b6' },
          ],
        };
    }
  };

  // 生成单次花雨粒子
  useEffect(() => {
    if (!activeTrigger) return;

    const palette = getFlowerPalette(flowerType);
    const canvas = canvasRef.current;
    const width = canvas ? canvas.width : window.innerWidth;

    // 每次触发生成 28 ~ 36 瓣灵动花雨
    const count = 32;
    const now = performance.now();
    const newPetals: PhysicsPetal[] = [];

    for (let i = 0; i < count; i++) {
      const col = palette.colors[i % palette.colors.length];
      const sz = palette.scaleRange[0] + Math.random() * (palette.scaleRange[1] - palette.scaleRange[0]);
      
      // 错落自然分布：错开高低出生点，杜绝“一起浮空等待下落”
      const startX = width * (0.05 + Math.random() * 0.9);
      // 竖向分散在屏幕上方 -40px 到 -480px 的自然高度层，随风依次徐徐入画
      const startY = -40 - Math.random() * 440;

      // 超轻重力与超低终端沉降速度（飘逸出尘）
      const terminalVy = 0.65 + Math.random() * 0.75; // 仅 0.65 ~ 1.4 px/帧
      const gravity = 0.012 + Math.random() * 0.018;

      newPetals.push({
        id: Date.now() + i + Math.random(),
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 0.6,
        vy: 0.3 + Math.random() * 0.4,
        gravity,
        terminalVy,
        swayAmp: 0.9 + Math.random() * 1.5,
        swayFreq: 0.016 + Math.random() * 0.018,
        swayPhase: Math.random() * Math.PI * 2,
        pitch: Math.random() * Math.PI * 2,
        roll: Math.random() * Math.PI * 2,
        yaw: Math.random() * Math.PI * 2,
        pitchSpeed: (Math.random() - 0.5) * 0.045,
        rollSpeed: (Math.random() - 0.5) * 0.045,
        yawSpeed: (Math.random() - 0.5) * 0.025,
        scale: sz,
        depthRatio: Math.random(),
        status: 'falling',
        stayDurationMs: 8000 + Math.random() * 6000, // 案面/地面停留 8 ~ 14 秒
        fadeDurationMs: 2500, // 平滑消散 2.5 秒
        opacity: 0,
        baseOpacity: 0.92 + Math.random() * 0.08,
        colorPrimary: col.p,
        colorSecondary: col.s,
        colorEdge: col.e,
        petalShapeType: palette.shape,
      });
    }

    // 追加到粒子队列中
    petalsRef.current = [...petalsRef.current, ...newPetals];
  }, [activeTrigger, flowerType]);

  // 高性能 Canvas 渲染与连续物理动力学循环
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retina 视网膜高清自适应
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // 绘制具体品类花瓣矢量剪影路径
    const drawPetalPath = (c: CanvasRenderingContext2D, shape: string, r: number) => {
      c.beginPath();
      switch (shape) {
        case 'plum':
          // 小巧圆润五瓣白梅瓣
          c.moveTo(0, -r * 0.95);
          c.bezierCurveTo(r * 0.85, -r * 0.95, r * 1.05, r * 0.1, r * 0.85, r * 0.7);
          c.bezierCurveTo(r * 0.6, r * 1.05, -r * 0.6, r * 1.05, -r * 0.85, r * 0.7);
          c.bezierCurveTo(-r * 1.05, r * 0.1, -r * 0.85, -r * 0.95, 0, -r * 0.95);
          break;

        case 'sunflower':
          // 狭长微弧金黄向日葵舌瓣
          c.moveTo(0, -r * 1.4);
          c.bezierCurveTo(r * 0.55, -r * 0.7, r * 0.6, r * 0.6, 0, r * 1.4);
          c.bezierCurveTo(-r * 0.6, r * 0.6, -r * 0.55, -r * 0.7, 0, -r * 1.4);
          break;

        case 'carnation':
          // 锯齿扇形重叠波浪瓣
          c.moveTo(0, r * 0.9);
          c.bezierCurveTo(-r * 0.6, r * 0.5, -r * 0.9, -r * 0.2, -r * 0.8, -r * 0.7);
          c.lineTo(-r * 0.5, -r * 0.9);
          c.lineTo(-r * 0.2, -r * 0.75);
          c.lineTo(0, -r * 0.95);
          c.lineTo(r * 0.2, -r * 0.75);
          c.lineTo(r * 0.5, -r * 0.9);
          c.lineTo(r * 0.8, -r * 0.7);
          c.bezierCurveTo(r * 0.9, -r * 0.2, r * 0.6, r * 0.5, 0, r * 0.9);
          break;

        case 'tulip':
        case 'calla':
        case 'standard':
        default:
          // 丰满椭圆高杯自然花瓣
          c.moveTo(0, -r * 1.15);
          c.bezierCurveTo(r * 0.9, -r * 0.85, r * 0.95, r * 0.45, 0, r * 1.15);
          c.bezierCurveTo(-r * 0.95, r * 0.45, -r * 0.9, -r * 0.85, 0, -r * 1.15);
          break;
      }
      c.closePath();
    };

    let lastFrameTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min(32, currentTime - lastFrameTime);
      lastFrameTime = currentTime;

      const screenW = window.innerWidth;
      const screenH = window.innerHeight;

      // 动态获取案台与地面物理碰撞边界
      const tableElem = document.getElementById('altarTableSurfaceContainer');
      let tableRect: DOMRect | null = null;
      if (tableElem) {
        tableRect = tableElem.getBoundingClientRect();
      }

      // 贡桌与地板几何碰撞参数
      // 贡桌木台面进深面 (从 top+20% 至 top+50%)
      const tableLeft = tableRect ? tableRect.left + tableRect.width * 0.05 : screenW * 0.25;
      const tableRight = tableRect ? tableRect.right - tableRect.width * 0.05 : screenW * 0.75;
      const tableTopY = tableRect ? tableRect.top + tableRect.height * 0.22 : screenH * 0.62;
      const tableBottomY = tableRect ? tableRect.top + tableRect.height * 0.48 : screenH * 0.68;

      // 地板着陆面
      const floorY = screenH * 0.91;

      // 清屏
      ctx.clearRect(0, 0, screenW, screenH);

      const activePetals: PhysicsPetal[] = [];

      for (let i = 0; i < petalsRef.current.length; i++) {
        const p = petalsRef.current[i];

        // ── 1. 物理位置与生命周期更新 ──
        if (p.status === 'falling') {
          // 淡入可见度
          if (p.opacity < p.baseOpacity && p.y > -20) {
            p.opacity = Math.min(p.baseOpacity, p.opacity + 0.06);
          }

          // 重力与空气阻力
          p.vy = Math.min(p.terminalVy, p.vy + p.gravity);
          
          // 空气升力微涡横向摇曳 (Sway)
          const swayOffset = Math.sin(currentTime * p.swayFreq + p.swayPhase) * p.swayAmp;
          p.x += p.vx + swayOffset * 0.35;
          p.y += p.vy;

          // 三维姿态自由翻转 (Pitch/Roll/Yaw)
          p.pitch += p.pitchSpeed;
          p.roll += p.rollSpeed;
          p.yaw += p.yawSpeed;

          // ── 物理碰撞检测 (Collision Detection) ──
          // A. 碰撞贡桌案面
          if (p.x >= tableLeft && p.x <= tableRight) {
            const tableTargetY = tableTopY + (tableBottomY - tableTopY) * p.depthRatio;
            if (p.y >= tableTargetY) {
              p.y = tableTargetY;
              p.status = 'settled';
              p.landedSurface = 'table';
              p.settledAtMs = currentTime;
              // 着陆后微幅滑动衰减
              p.vx = 0;
              p.vy = 0;
              // 花瓣平铺贴合在桌面（俯仰角放松趋平）
              p.pitch = (Math.random() - 0.5) * 0.2;
              p.roll = (Math.random() - 0.5) * 0.2;
            }
          }

          // B. 碰撞地面
          if (p.status === 'falling' && p.y >= floorY + (p.depthRatio * 20 - 10)) {
            p.y = floorY + (p.depthRatio * 20 - 10);
            p.status = 'settled';
            p.landedSurface = 'floor';
            p.settledAtMs = currentTime;
            p.vx = 0;
            p.vy = 0;
            p.pitch = (Math.random() - 0.5) * 0.2;
            p.roll = (Math.random() - 0.5) * 0.2;
          }
        } else if (p.status === 'settled') {
          // 案面/地面安静留存期
          const settledAge = currentTime - (p.settledAtMs || currentTime);
          if (settledAge > p.stayDurationMs) {
            p.status = 'fading';
          }
        } else if (p.status === 'fading') {
          // 平滑化为微尘散去
          p.opacity -= (dt / p.fadeDurationMs) * p.baseOpacity;
          if (p.opacity <= 0.01) {
            continue; // 该瓣消亡，不再留存
          }
        }

        // ── 2. 高保真三维透视投影绘制 ──
        ctx.save();
        ctx.translate(p.x, p.y);

        // 着陆阴影渲染（案面/地面微观接触软阴影）
        if (p.status === 'settled' || p.status === 'fading') {
          ctx.save();
          ctx.scale(1, 0.35);
          ctx.beginPath();
          ctx.arc(0, p.scale * 0.5, p.scale * 0.85, 0, Math.PI * 2);
          ctx.fillStyle = p.landedSurface === 'table' ? 'rgba(35, 18, 8, 0.22)' : 'rgba(20, 15, 10, 0.28)';
          ctx.fill();
          ctx.restore();
        }

        // 姿态自旋 (Yaw) 与 3D 翻面模拟 (Roll & Pitch)
        ctx.rotate(p.yaw);
        // 使用余弦实现逼真 3D 纸片/花瓣正反翻转效果 (正弦厚度微调避免完全变成 0 宽闪烁)
        const scaleX = Math.max(0.12, Math.abs(Math.cos(p.roll)));
        const scaleY = Math.max(0.12, Math.abs(Math.cos(p.pitch)));
        ctx.scale(scaleX, scaleY);

        // 花瓣渐变色
        const radGrad = ctx.createRadialGradient(0, -p.scale * 0.3, p.scale * 0.1, 0, 0, p.scale * 1.2);
        radGrad.addColorStop(0, p.colorPrimary);
        radGrad.addColorStop(0.7, p.colorSecondary);
        radGrad.addColorStop(1, p.colorEdge);

        ctx.fillStyle = radGrad;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity));

        // 花瓣边缘柔和微描边
        ctx.strokeStyle = p.colorEdge;
        ctx.lineWidth = 0.5;

        drawPetalPath(ctx, p.petalShapeType, p.scale);
        ctx.fill();
        ctx.stroke();

        ctx.restore();

        activePetals.push(p);
      }

      petalsRef.current = activePetals;

      // 如果队列中仍有花瓣，继续下一帧动力学循环
      if (activePetals.length > 0) {
        animFrameIdRef.current = requestAnimationFrame(loop);
      } else {
        animFrameIdRef.current = null;
      }
    };

    // 启动动画循环
    if (petalsRef.current.length > 0 && animFrameIdRef.current === null) {
      animFrameIdRef.current = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
    };
  }, [activeTrigger]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-35"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};
