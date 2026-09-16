/**
 * @file IncenseSmoke.tsx
 * @description 【禅意升腾】基于真实拉格朗日流体力学质点流的国风工笔缕烟组件。
 * 彻底废除固定原地的正弦摆尾动画，采用真实的向上浮升粒子流带（Lagrangian Puff Ribbon），
 * 呈现根部挺拔静止、中段徐徐流动升腾、高空自然散入虚空的真实香烟禅境。
 */
import React, { useEffect, useRef } from 'react';
import { sound } from '../../../utils/audio';

interface IncenseSmokeProps {
  isLit: boolean;
  onToggle?: () => void;
  windForce?: number;
  density?: number;
  sunlightIntensity?: number;
  masterOn?: boolean;
  timeOfDay?: 'day' | 'sunset' | 'night';
  className?: string;
  health?: number;
}

interface SmokeNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  maxAge: number;
  width: number;
  alpha: number;
}

// ── Fixed canvas logical dimensions ─────────────────────────────────────────
const CANVAS_W = 160;
const CANVAS_H = 280;
const CENTER_X = CANVAS_W / 2;
const BURNER_BASE_Y = CANVAS_H - 2; // 278

export const IncenseSmoke: React.FC<IncenseSmokeProps> = ({
  isLit,
  onToggle,
  windForce = 0,
  density = 1,
  sunlightIntensity = 0.8,
  masterOn = true,
  timeOfDay = 'day',
  className = '',
  health = 1.0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  // 三炷香各自独立的向上浮升粒子队列 (真实流体质点流)
  const trailsRef = useRef<SmokeNode[][]>([[], [], []]);

  const propsRef = useRef({ isLit, windForce, density, sunlightIntensity, masterOn, timeOfDay, health });
  useEffect(() => {
    propsRef.current = { isLit, windForce, density, sunlightIntensity, masterOn, timeOfDay, health };
  }, [isLit, windForce, density, sunlightIntensity, masterOn, timeOfDay, health]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Retina 2x 超采样
    canvas.width = CANVAS_W * 2;
    canvas.height = CANVAS_H * 2;

    let time = 0;
    let frameCount = 0;
    let litTransition = isLit ? 1.0 : 0.0;

    const render = () => {
      time += 0.016;
      frameCount++;

      const {
        isLit: lit,
        windForce: wind,
        density: den,
        masterOn: mOn,
        timeOfDay: tod,
        health: hl = 1.0,
      } = propsRef.current;

      const currentHealth = Math.max(0, Math.min(1.0, hl));

      // 平滑点燃/熄灭过渡
      const targetLit = lit && currentHealth > 0.02 ? 1.0 : 0.0;
      litTransition += (targetLit - litTransition) * 0.05;

      // 1. 香体长度与保留香脚
      const STUB_CENTER_LEN = 28;
      const STUB_SIDE_LEN = 25;
      const BURNABLE_CENTER = 58;
      const BURNABLE_SIDE = 53;

      const centerLen = STUB_CENTER_LEN + BURNABLE_CENTER * currentHealth;
      const sideLen = STUB_SIDE_LEN + BURNABLE_SIDE * currentHealth;

      const spreadX = 4.0 + 1.8 * currentHealth;

      const dynamicEmbers = [
        { x: CENTER_X - spreadX, y: BURNER_BASE_Y - sideLen, dir: -1 },
        { x: CENTER_X,           y: BURNER_BASE_Y - centerLen, dir: 0 },
        { x: CENTER_X + spreadX, y: BURNER_BASE_Y - sideLen, dir: 1 },
      ];

      const lateFactor = currentHealth > 0.35
        ? 1.0
        : Math.max(0.3, 0.3 + 0.7 * (currentHealth / 0.35));

      const isNightMode = !mOn || tod === 'night';

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(2, 2);

      // ── 1. 绘制三炷清香香身 ─────────────────────────────────────────
      ctx.lineCap = 'round';
      for (let i = 0; i < dynamicEmbers.length; i++) {
        const emb = dynamicEmbers[i];

        ctx.beginPath();
        ctx.moveTo(CENTER_X + (i - 1) * 0.85, BURNER_BASE_Y);
        ctx.lineTo(emb.x, emb.y);
        ctx.lineWidth = 1.4;
        ctx.strokeStyle = '#382315';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(CENTER_X + (i - 1) * 0.85 - 0.2, BURNER_BASE_Y);
        ctx.lineTo(emb.x - 0.2, emb.y);
        ctx.lineWidth = 0.45;
        ctx.strokeStyle = '#5a3d28';
        ctx.stroke();

        if (lit && currentHealth > 0.02) {
          ctx.beginPath();
          ctx.moveTo(emb.x, emb.y);
          ctx.lineTo(emb.x, emb.y + 1.8 * lateFactor);
          ctx.lineWidth = 1.3;
          ctx.strokeStyle = '#6e6962';
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.moveTo(emb.x - 0.8, emb.y);
          ctx.lineTo(emb.x + 0.8, emb.y);
          ctx.lineWidth = 1.0;
          ctx.strokeStyle = '#1e140e';
          ctx.stroke();
        }
      }

      // ── 环境自然呼吸与偶尔阵风系统 (Organic Breeze & Breathing Gusts) ──
      // 1. 低频主呼吸律动 (周期约 6.8 秒，缓和平稳)
      const breathCycle = Math.sin(time * 0.92);
      // 2. 偶尔拂过的一抹自然清风 (模拟门窗微启掠过的一阵柔风，起伏舒卷)
      const gustPulse = Math.pow(Math.max(0, Math.sin(time * 0.35)), 2.6) * 1.4;
      const organicWind = (wind * 1.2) + (breathCycle * 0.45) + (gustPulse * (breathCycle >= 0 ? 0.7 : -0.7));

      // ── 2. 真实物理发射与向上流动模拟 (Advection Simulation) ────────
      const trails = trailsRef.current;

      // 生成新烟气质点 (每 2 帧发射一个，平滑连续)
      if (litTransition > 0.02 && frameCount % 2 === 0) {
        for (let s = 0; s < dynamicEmbers.length; s++) {
          const emb = dynamicEmbers[s];
          trails[s].unshift({
            x: emb.x + (Math.random() - 0.5) * 0.2,
            y: emb.y - 0.5,
            vx: 0,
            // 匀速缓升，营造香烟徐徐上升的静谧禅意
            vy: -(0.85 + Math.random() * 0.12) * lateFactor,
            age: 0,
            maxAge: 85 + Math.random() * 15,
            width: 0.9,
            alpha: 0,
          });
        }
      }

      // 更新已发射烟气粒子（真正随着时间一步一步徐徐往上飞）
      for (let s = 0; s < trails.length; s++) {
        const trail = trails[s];
        const emb = dynamicEmbers[s];

        for (let i = trail.length - 1; i >= 0; i--) {
          const node = trail[i];
          node.age += 1;

          if (node.age >= node.maxAge) {
            trail.splice(i, 1);
            continue;
          }

          // 1. 垂直升腾：真实向上平移
          node.y += node.vy;

          // 2. 垂直高度与归一化比例
          const distFromEmber = Math.max(0, emb.y - node.y);
          const p = Math.min(1.0, distFromEmber / 88);

          // 【三缕同心·步调一致】：
          // 三缕香烟共享完全相同的同向风吹漂移与向上行波，绝不各奔东西！
          // - 近香端（p很小）：层流锚定于各自香火顶端，端庄直立；
          // - 中高空（p逐步增大）：随偶尔微风同向舒展微拂，呈现水袖素绢般的呼吸波浪！
          const windShift = organicWind * (9.2 * Math.pow(p, 1.35));
          const waveShift = Math.sin(p * 3.6 - time * 1.5) * (4.2 * Math.pow(p, 1.25));

          // 理想横向目标位置（各自香火原点 + 共同微风行波偏移）
          const targetX = emb.x + windShift + waveShift;

          // 平滑向目标位置趋近，带有柔韧流体从容迟滞感
          node.x += (targetX - node.x) * 0.18;

          // 3. 烟体生命周期尺寸与通透度演变
          const prog = node.age / node.maxAge;
          if (prog < 0.18) {
            // 香头刚刚产生：极细极轻淡，自然脱离
            const t = prog / 0.18;
            node.width = 0.9 + t * 1.2;
            node.alpha = t * 0.32;
          } else if (prog < 0.65) {
            // 中空升腾段：纤细秀丽，优雅成缕
            const t = (prog - 0.18) / 0.47;
            node.width = 2.1 + t * 1.2; // 最宽仅约 3.3px
            node.alpha = 0.32 * (1.0 - t * 0.25);
          } else {
            // 高空自然飘散消隐段：轻微散开，徐徐隐入虚空
            const t = (prog - 0.65) / 0.35;
            node.width = 3.3 + t * 2.2;
            node.alpha = 0.24 * (1.0 - t); // 平滑归零，无突兀截断
          }
        }
      }

      // ── 3. 绘制平滑流线缕烟 (Smooth Advected Streamlines) ───────────
      if (litTransition > 0.02) {
        const baseAlpha = Math.min(0.9, den * 0.75) * lateFactor * litTransition;

        for (let s = 0; s < trails.length; s++) {
          const trail = trails[s];
          if (trail.length < 3) continue;

          const leftPoints: { x: number; y: number }[] = [];
          const rightPoints: { x: number; y: number }[] = [];

          for (let i = 0; i < trail.length; i++) {
            const node = trail[i];
            const halfW = (node.width * 0.5) * (0.6 + 0.4 * lateFactor);
            leftPoints.push({ x: node.x - halfW, y: node.y });
            rightPoints.push({ x: node.x + halfW, y: node.y });
          }

          // ── Pass 1: 纤巧柔光缕烟多边形 ──
          ctx.beginPath();
          ctx.moveTo(leftPoints[0].x, leftPoints[0].y);
          for (let i = 0; i < leftPoints.length - 1; i++) {
            const xc = (leftPoints[i].x + leftPoints[i + 1].x) / 2;
            const yc = (leftPoints[i].y + leftPoints[i + 1].y) / 2;
            ctx.quadraticCurveTo(leftPoints[i].x, leftPoints[i].y, xc, yc);
          }
          ctx.lineTo(rightPoints[rightPoints.length - 1].x, rightPoints[rightPoints.length - 1].y);
          for (let i = rightPoints.length - 1; i > 0; i--) {
            const xc = (rightPoints[i].x + rightPoints[i - 1].x) / 2;
            const yc = (rightPoints[i].y + rightPoints[i - 1].y) / 2;
            ctx.quadraticCurveTo(rightPoints[i].x, rightPoints[i].y, xc, yc);
          }
          ctx.closePath();

          // 垂直渐变填充 (轻盈通透象牙月白，自下而上徐徐淡化)
          const bottomY = trail[0].y;
          const topY = trail[trail.length - 1].y;
          const streamGrad = ctx.createLinearGradient(0, bottomY, 0, topY);

          if (isNightMode) {
            streamGrad.addColorStop(0, `rgba(250, 245, 235, 0)`);
            streamGrad.addColorStop(0.12, `rgba(248, 242, 230, ${0.18 * baseAlpha})`);
            streamGrad.addColorStop(0.40, `rgba(242, 236, 224, ${0.28 * baseAlpha})`);
            streamGrad.addColorStop(0.75, `rgba(235, 228, 216, ${0.16 * baseAlpha})`);
            streamGrad.addColorStop(1.0, `rgba(220, 212, 200, 0)`);
          } else {
            streamGrad.addColorStop(0, `rgba(255, 252, 246, 0)`);
            streamGrad.addColorStop(0.12, `rgba(252, 248, 240, ${0.20 * baseAlpha})`);
            streamGrad.addColorStop(0.40, `rgba(246, 242, 234, ${0.30 * baseAlpha})`);
            streamGrad.addColorStop(0.75, `rgba(238, 234, 226, ${0.16 * baseAlpha})`);
            streamGrad.addColorStop(1.0, `rgba(220, 215, 205, 0)`);
          }

          ctx.fillStyle = streamGrad;
          ctx.fill();

          // ── Pass 2: 细若游丝的工笔高光中流线 ──
          ctx.beginPath();
          ctx.moveTo(trail[0].x, trail[0].y);
          for (let i = 0; i < trail.length - 1; i++) {
            const xc = (trail[i].x + trail[i + 1].x) / 2;
            const yc = (trail[i].y + trail[i + 1].y) / 2;
            ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
          }

          const coreGrad = ctx.createLinearGradient(0, bottomY, 0, topY);
          coreGrad.addColorStop(0, `rgba(255, 255, 255, 0)`);
          coreGrad.addColorStop(0.15, `rgba(255, 255, 255, ${0.28 * baseAlpha})`);
          coreGrad.addColorStop(0.45, `rgba(252, 250, 246, ${0.24 * baseAlpha})`);
          coreGrad.addColorStop(0.80, `rgba(245, 240, 232, ${0.08 * baseAlpha})`);
          coreGrad.addColorStop(1.0, `rgba(235, 230, 222, 0)`);

          ctx.strokeStyle = coreGrad;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      // ── 4. 纤巧内敛的香头火炭 ──────────────────────────────────────
      for (let i = 0; i < dynamicEmbers.length; i++) {
        const emb = dynamicEmbers[i];
        if (lit && currentHealth > 0.02) {
          const pulse = Math.sin(time * 3.2 + i * 1.9) * 0.15 + 0.88;

          // 极克制的外围温热光晕 (微热微光，半径 1.6px)
          ctx.beginPath();
          ctx.arc(emb.x, emb.y, 1.6 * pulse * lateFactor, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(234, 88, 12, ${0.25 * lateFactor * litTransition})`;
          ctx.fill();

          // 真实微小暗红香炭核心 (半径 0.8px)
          ctx.beginPath();
          ctx.arc(emb.x, emb.y, 0.8 * lateFactor, 0, Math.PI * 2);
          ctx.fillStyle = '#dc2626';
          ctx.fill();

          // 顶尖一点金红微光 (半径 0.4px)
          if (lateFactor > 0.35) {
            ctx.beginPath();
            ctx.arc(emb.x, emb.y - 0.2, 0.4 * lateFactor, 0, Math.PI * 2);
            ctx.fillStyle = '#fef08a';
            ctx.fill();
          }
        } else {
          // 熄灭后：内敛沉静的冷炭黑点
          ctx.beginPath();
          ctx.arc(emb.x, emb.y, 0.75, 0, Math.PI * 2);
          ctx.fillStyle = '#1c140d';
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
