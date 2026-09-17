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

      // ── 三炷香差异化配置：整体缩小 30%，三缕各具高低粗细与 S 弯波纹形态（对标设计图二） ──
      const STREAM_PROFILES = [
        {
          // s = 0: 左侧香（纤巧柔美，偏左起弯，高度约 38px，宽度约 2.2px）
          ageMultiplier: 0.86,
          baseW: 0.75,
          maxW: 2.2,
          tipW: 0.18,
          waveFreq: 0.165,
          waveTimeSpeed: 1.25,
          wavePhaseOffset: -0.7,
          amplitude: 1.6,
          laneBias: -1.3,
        },
        {
          // s = 1: 中央主香（最挺拔高挑，主干饱满，S 弯舒朗正气，高度约 46px，宽度约 3.3px）
          ageMultiplier: 1.0,
          baseW: 0.95,
          maxW: 3.3,
          tipW: 0.25,
          waveFreq: 0.140,
          waveTimeSpeed: 1.35,
          wavePhaseOffset: 0.0,
          amplitude: 2.1,
          laneBias: 0.0,
        },
        {
          // s = 2: 右侧香（中等舒朗，偏右起弯，相差错落，高度约 42px，宽度约 2.7px）
          ageMultiplier: 0.92,
          baseW: 0.85,
          maxW: 2.7,
          tipW: 0.20,
          waveFreq: 0.150,
          waveTimeSpeed: 1.45,
          wavePhaseOffset: 0.8,
          amplitude: 1.8,
          laneBias: 1.3,
        },
      ];

      // ── 2. 真实热对流缓缓升腾与自然扩散模拟 (Advection Simulation) ────────
      const trails = trailsRef.current;

      // 每 2 帧发射一个新烟气质点
      if (litTransition > 0.02 && frameCount % 2 === 0) {
        for (let s = 0; s < dynamicEmbers.length; s++) {
          const emb = dynamicEmbers[s];
          const prof = STREAM_PROFILES[s];
          trails[s].unshift({
            x: emb.x,
            y: emb.y - 0.5,
            vx: 0,
            vy: -(0.58 + Math.random() * 0.04) * lateFactor,
            age: 0,
            maxAge: Math.round((68 + Math.random() * 8) * prof.ageMultiplier),
            width: prof.baseW,
            alpha: 0,
          });
        }
      }

      // 更新已发射烟气粒子（三缕各具形态与尺寸，微风优雅 S 弯波纹，尾部变尖细）
      for (let s = 0; s < trails.length; s++) {
        const trail = trails[s];
        const emb = dynamicEmbers[s];
        const prof = STREAM_PROFILES[s];

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
          const p = Math.min(1.0, distFromEmber / 48);

          // 1. 各自独立的曲线摇曳（不同波长、周期与相位，动作克制从容）：
          const wavePhase = distFromEmber * prof.waveFreq - time * prof.waveTimeSpeed + prof.wavePhaseOffset;
          const amplitude = prof.amplitude * Math.sin(Math.min(1.0, p * 1.1) * Math.PI * 0.82);
          const sCurveWave = Math.sin(wavePhase) * amplitude;

          // 2. 独立安全间距通道与偏向（绝对互不缠绕）
          const laneSpread = prof.laneBias * Math.pow(p, 1.15);

          // 3. 室内极微弱的自然微风协同漂移
          const windDrift = (wind * 0.14) * (1.6 * Math.pow(p, 1.1));

          // 目标横向位置与平滑过渡
          const targetX = emb.x + sCurveWave + laneSpread + windDrift;
          node.x += (targetX - node.x) * 0.22;

          // 4. 差异化烟体造型：对标设计图，各自拥有独立中段宽度，尾部变尖细！
          const prog = node.age / node.maxAge;
          if (prog < 0.22) {
            const t = prog / 0.22;
            node.width = prof.baseW + t * (prof.maxW - prof.baseW);
            node.alpha = 0.2 + t * 0.6;
          } else if (prog < 0.62) {
            const t = (prog - 0.22) / 0.40;
            const arch = Math.sin(t * Math.PI);
            node.width = prof.maxW * (0.88 + arch * 0.12);
            node.alpha = 0.8 - t * 0.12;
          } else {
            const t = (prog - 0.62) / 0.38;
            node.width = Math.max(prof.tipW, prof.maxW * Math.pow(1.0 - t, 1.35));
            node.alpha = 0.68 * Math.pow(1.0 - t, 1.25);
          }
        }
      }

      // ── 3. 绘制缓缓上升、曲线摇曳且尾端变尖细的柔光工笔缕烟 ───────────
      if (litTransition > 0.02) {
        const baseAlpha = Math.min(0.9, den * 0.8) * lateFactor * litTransition;

        for (let s = 0; s < trails.length; s++) {
          const trail = trails[s];
          if (trail.length < 3) continue;

          const leftPoints: { x: number; y: number }[] = [];
          const rightPoints: { x: number; y: number }[] = [];

          for (let i = 0; i < trail.length; i++) {
            const node = trail[i];
            const halfW = (node.width * 0.5) * (0.75 + 0.25 * lateFactor);
            leftPoints.push({ x: node.x - halfW, y: node.y });
            rightPoints.push({ x: node.x + halfW, y: node.y });
          }

          // ── Pass 1: 纤巧柔光缕烟多边形（柔美 S 弯工笔流体，尾部尖细闭合） ──
          ctx.beginPath();
          ctx.moveTo(leftPoints[0].x, leftPoints[0].y);
          for (let i = 0; i < leftPoints.length - 1; i++) {
            const xc = (leftPoints[i].x + leftPoints[i + 1].x) / 2;
            const yc = (leftPoints[i].y + leftPoints[i + 1].y) / 2;
            ctx.quadraticCurveTo(leftPoints[i].x, leftPoints[i].y, xc, yc);
          }
          // 汇聚于尖细尾梢顶端极点
          const apexNode = trail[trail.length - 1];
          ctx.lineTo(apexNode.x, apexNode.y - 0.8);
          ctx.lineTo(rightPoints[rightPoints.length - 1].x, rightPoints[rightPoints.length - 1].y);
          for (let i = rightPoints.length - 1; i > 0; i--) {
            const xc = (rightPoints[i].x + rightPoints[i - 1].x) / 2;
            const yc = (rightPoints[i].y + rightPoints[i - 1].y) / 2;
            ctx.quadraticCurveTo(rightPoints[i].x, rightPoints[i].y, xc, yc);
          }
          ctx.closePath();

          // 垂直渐变填充
          const bottomY = trail[0].y;
          const topY = trail[trail.length - 1].y;
          const streamGrad = ctx.createLinearGradient(0, bottomY, 0, topY);

          if (isNightMode) {
            streamGrad.addColorStop(0, `rgba(252, 246, 236, 0.2)`);
            streamGrad.addColorStop(0.18, `rgba(250, 244, 232, ${0.72 * baseAlpha})`);
            streamGrad.addColorStop(0.58, `rgba(244, 238, 226, ${0.68 * baseAlpha})`);
            streamGrad.addColorStop(0.85, `rgba(235, 228, 216, ${0.40 * baseAlpha})`);
            streamGrad.addColorStop(1.0, `rgba(220, 212, 200, 0)`);
          } else {
            streamGrad.addColorStop(0, `rgba(255, 254, 250, 0.25)`);
            streamGrad.addColorStop(0.18, `rgba(254, 251, 244, ${0.78 * baseAlpha})`);
            streamGrad.addColorStop(0.58, `rgba(250, 246, 238, ${0.72 * baseAlpha})`);
            streamGrad.addColorStop(0.85, `rgba(242, 238, 230, ${0.42 * baseAlpha})`);
            streamGrad.addColorStop(1.0, `rgba(225, 220, 210, 0)`);
          }

          ctx.fillStyle = streamGrad;
          ctx.fill();

          // ── Pass 2: 细若游丝的工笔高光中脊线（沿波纹脊线延伸至尾部渐隐） ──
          ctx.beginPath();
          ctx.moveTo(trail[0].x, trail[0].y);
          const spineLimit = Math.max(3, Math.floor(trail.length * 0.85));
          for (let i = 0; i < spineLimit - 1; i++) {
            const xc = (trail[i].x + trail[i + 1].x) / 2;
            const yc = (trail[i].y + trail[i + 1].y) / 2;
            ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
          }

          const coreGrad = ctx.createLinearGradient(0, bottomY, 0, topY);
          coreGrad.addColorStop(0, `rgba(255, 255, 255, 0)`);
          coreGrad.addColorStop(0.14, `rgba(255, 255, 255, ${0.32 * baseAlpha})`);
          coreGrad.addColorStop(0.45, `rgba(254, 252, 248, ${0.24 * baseAlpha})`);
          coreGrad.addColorStop(0.75, `rgba(245, 240, 232, 0)`);

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
