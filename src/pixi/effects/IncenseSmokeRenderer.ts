/**
 * @file IncenseSmokeRenderer.ts
 * @description PixiJS 国风禅意工笔香烟与三炷立香高保真渲染器。
 * 100% 完整复刻原版 IncenseSmoke.tsx 的拉格朗日流体力学质点流（Lagrangian Puff Ribbon）。
 * 呈现 86px 挺拔沉静的高香柱身、三缕同心徐徐升腾的 1.5px~3.3px 纤巧柔光缕烟多边形，
 * 以及细若游丝的 0.7px 工笔高光中流线，彻底消灭失火般的圆形滚滚浓烟！
 */
import { Sprite, Texture } from 'pixi.js';

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

export class IncenseSmokeRenderer {
  public sprite: Sprite;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private texture: Texture;

  private trails: SmokeNode[][] = [[], [], []];
  private time: number = 0;
  private frameCount: number = 0;
  private litTransition: number = 1.0;

  private readonly canvasW = 160;
  private readonly canvasH = 280;
  private readonly centerX = 80;
  private readonly burnerBaseY = 278;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.canvasW * 2;
    this.canvas.height = this.canvasH * 2;
    this.ctx = this.canvas.getContext('2d', { alpha: true })!;

    this.texture = Texture.from(this.canvas);
    this.sprite = new Sprite(this.texture);
    // 锚点精确对齐香炉香灰口底面 (centerX=80, burnerBaseY=278)
    this.sprite.anchor.set(this.centerX / this.canvasW, this.burnerBaseY / this.canvasH);
  }

  public update(
    delta: number = 1,
    isLit: boolean = true,
    windForce: number = 0.15,
    density: number = 1.0,
    health: number = 1.0,
    timeOfDay: 'day' | 'sunset' | 'night' = 'day'
  ): void {
    const ctx = this.ctx;
    if (!ctx) return;

    this.time += 0.016 * delta;
    this.frameCount++;

    const currentHealth = Math.max(0, Math.min(1.0, health));

    // 平滑点燃/熄灭过渡
    const targetLit = isLit && currentHealth > 0.02 ? 1.0 : 0.0;
    this.litTransition += (targetLit - this.litTransition) * 0.05 * delta;

    // 1. 香体长度与保留香脚 (原版标准尺寸：中心香 86px，两侧香 78px)
    const STUB_CENTER_LEN = 28;
    const STUB_SIDE_LEN = 25;
    const BURNABLE_CENTER = 58;
    const BURNABLE_SIDE = 53;

    const centerLen = STUB_CENTER_LEN + BURNABLE_CENTER * currentHealth;
    const sideLen = STUB_SIDE_LEN + BURNABLE_SIDE * currentHealth;
    const spreadX = 4.0 + 1.8 * currentHealth;

    const dynamicEmbers = [
      { x: this.centerX - spreadX, y: this.burnerBaseY - sideLen, dir: -1 },
      { x: this.centerX,           y: this.burnerBaseY - centerLen, dir: 0 },
      { x: this.centerX + spreadX, y: this.burnerBaseY - sideLen, dir: 1 },
    ];

    const lateFactor = currentHealth > 0.35
      ? 1.0
      : Math.max(0.3, 0.3 + 0.7 * (currentHealth / 0.35));

    const isNightMode = timeOfDay === 'night';

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.save();
    ctx.scale(2, 2);

    // ── 1. 绘制三炷清香香身 ─────────────────────────────────────────
    ctx.lineCap = 'round';
    for (let i = 0; i < dynamicEmbers.length; i++) {
      const emb = dynamicEmbers[i];

      // 深色木质主干
      ctx.beginPath();
      ctx.moveTo(this.centerX + (i - 1) * 0.85, this.burnerBaseY);
      ctx.lineTo(emb.x, emb.y);
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = '#382315';
      ctx.stroke();

      // 细微受光侧高光
      ctx.beginPath();
      ctx.moveTo(this.centerX + (i - 1) * 0.85 - 0.2, this.burnerBaseY);
      ctx.lineTo(emb.x - 0.2, emb.y);
      ctx.lineWidth = 0.45;
      ctx.strokeStyle = '#5a3d28';
      ctx.stroke();

      // 燃烧顶端的香灰节
      if (isLit && currentHealth > 0.02) {
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

    // ── 环境自然呼吸与偶尔阵风系统 ──
    const breathCycle = Math.sin(this.time * 0.92);
    const gustPulse = Math.pow(Math.max(0, Math.sin(this.time * 0.35)), 2.6) * 1.4;
    const organicWind = (windForce * 1.2) + (breathCycle * 0.45) + (gustPulse * (breathCycle >= 0 ? 0.7 : -0.7));

    // ── 2. 真实热对流缓缓升腾与自然扩散模拟 ──
    const trails = this.trails;

    // ── 三炷香差异化配置：更加纤巧薄透，三缕各具高低粗细与 S 弯波纹形态 ──
    const STREAM_PROFILES = [
      {
        // s = 0: 左侧香（纤巧柔美，偏左起弯，高度约 38px，宽度约 1.5px）
        ageMultiplier: 0.86,
        baseW: 0.50,
        maxW: 1.5,
        tipW: 0.12,
        waveFreq: 0.165,
        waveTimeSpeed: 1.25,
        wavePhaseOffset: -0.7,
        amplitude: 1.5,
        laneBias: -1.3,
      },
      {
        // s = 1: 中央主香（最挺拔高挑，主干饱满舒朗，高度约 46px，宽度约 2.0px）
        ageMultiplier: 1.0,
        baseW: 0.60,
        maxW: 2.0,
        tipW: 0.15,
        waveFreq: 0.140,
        waveTimeSpeed: 1.35,
        wavePhaseOffset: 0.0,
        amplitude: 1.8,
        laneBias: 0.0,
      },
      {
        // s = 2: 右侧香（中等舒朗，偏右起弯，高度约 42px，宽度约 1.7px）
        ageMultiplier: 0.92,
        baseW: 0.55,
        maxW: 1.7,
        tipW: 0.12,
        waveFreq: 0.150,
        waveTimeSpeed: 1.45,
        wavePhaseOffset: 0.8,
        amplitude: 1.6,
        laneBias: 1.3,
      },
    ];

    // 每 2 帧发射一个新烟气质点
    if (this.litTransition > 0.02 && this.frameCount % 2 === 0) {
      for (let s = 0; s < dynamicEmbers.length; s++) {
        const emb = dynamicEmbers[s];
        const prof = STREAM_PROFILES[s];
        trails[s].unshift({
          x: emb.x,
          y: emb.y - 0.5,
          vx: 0,
          // 缓缓上升：静谧平缓的对流速度 (-0.56 ~ -0.62 px/frame)
          vy: -(0.58 + Math.random() * 0.04) * lateFactor,
          age: 0,
          // 基准生命周期缩减至 68 帧（上升高度约 38~46px）
          maxAge: Math.round((68 + Math.random() * 8) * prof.ageMultiplier),
          width: prof.baseW,
          alpha: 0,
        });
      }
    }

    // 更新烟气粒子生命周期 (三缕各具形态与尺寸，微风优雅 S 弯波纹，尾部变尖细)
    for (let s = 0; s < trails.length; s++) {
      const trail = trails[s];
      const emb = dynamicEmbers[s];
      const prof = STREAM_PROFILES[s];

      for (let i = trail.length - 1; i >= 0; i--) {
        const node = trail[i];
        node.age += delta;

        if (node.age >= node.maxAge) {
          trail.splice(i, 1);
          continue;
        }

        // 垂直平缓升腾
        node.y += node.vy * delta;

        // 距离各自香头的垂直升腾高度
        const distFromEmber = Math.max(0, emb.y - node.y);
        const p = Math.min(1.0, distFromEmber / 48);

        // 1. 各自独立的曲线摇曳（不同波长、周期与相位，动作克制从容）：
        const wavePhase = distFromEmber * prof.waveFreq - this.time * prof.waveTimeSpeed + prof.wavePhaseOffset;
        const amplitude = prof.amplitude * Math.sin(Math.min(1.0, p * 1.1) * Math.PI * 0.82);
        const sCurveWave = Math.sin(wavePhase) * amplitude;

        // 2. 独立安全间距通道与偏向（绝对互不缠绕）
        const laneSpread = prof.laneBias * Math.pow(p, 1.15);

        // 3. 室内极微弱的自然微风协同漂移
        const windDrift = (windForce * 0.14) * (1.6 * Math.pow(p, 1.1));

        // 目标横向位置
        const targetX = emb.x + sCurveWave + laneSpread + windDrift;

        // 平滑向目标位置过渡
        node.x += (targetX - node.x) * 0.22;

        // 4. 差异化烟体造型：优雅收束变细
        const prog = node.age / node.maxAge;
        if (prog < 0.22) {
          // 根部出烟段：自香尖渐次展开
          const t = prog / 0.22;
          node.width = prof.baseW + t * (prof.maxW - prof.baseW);
          node.alpha = 0.2 + t * 0.6;
        } else if (prog < 0.62) {
          // 中段躯干：饱满流转的工笔主幔
          const t = (prog - 0.22) / 0.40;
          const arch = Math.sin(t * Math.PI);
          node.width = prof.maxW * (0.88 + arch * 0.12);
          node.alpha = 0.8 - t * 0.12;
        } else {
          // 尾部渐尖段（变尖细！优雅收束至极细锋芒尖梢）
          const t = (prog - 0.62) / 0.38;
          node.width = Math.max(prof.tipW, prof.maxW * Math.pow(1.0 - t, 1.35));
          node.alpha = 0.68 * Math.pow(1.0 - t, 1.25);
        }
      }
    }

    // ── 3. 绘制缓缓上升、薄透轻灵且尾端变尖细的柔光工笔缕烟 ──
    if (this.litTransition > 0.02) {
      // 降低基准不透明度，呈现若隐若现的空气通透感
      const baseAlpha = Math.min(0.65, density * 0.55) * lateFactor * this.litTransition;

      for (let s = 0; s < trails.length; s++) {
        const trail = trails[s];
        if (trail.length < 3) continue;

        const leftPoints: { x: number; y: number }[] = [];
        const rightPoints: { x: number; y: number }[] = [];

        for (let i = 0; i < trail.length; i++) {
          const node = trail[i];
          // 稍微收细半宽，使烟雾更显清瘦灵动
          const halfW = (node.width * 0.45) * (0.75 + 0.25 * lateFactor);
          leftPoints.push({ x: node.x - halfW, y: node.y });
          rightPoints.push({ x: node.x + halfW, y: node.y });
        }

        // Pass 1: 纤巧轻透缕烟多边形（柔美 S 弯工笔流体，尾部尖细闭合）
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

        const bottomY = trail[0].y;
        const topY = trail[trail.length - 1].y;
        const streamGrad = ctx.createLinearGradient(0, bottomY, 0, topY);

        if (isNightMode) {
          streamGrad.addColorStop(0, `rgba(252, 246, 236, 0.05)`);
          streamGrad.addColorStop(0.18, `rgba(250, 244, 232, ${0.52 * baseAlpha})`);
          streamGrad.addColorStop(0.55, `rgba(244, 238, 226, ${0.42 * baseAlpha})`);
          streamGrad.addColorStop(0.82, `rgba(235, 228, 216, ${0.20 * baseAlpha})`);
          streamGrad.addColorStop(1.0, `rgba(220, 212, 200, 0)`);
        } else {
          streamGrad.addColorStop(0, `rgba(255, 254, 250, 0.06)`);
          streamGrad.addColorStop(0.18, `rgba(254, 251, 244, ${0.56 * baseAlpha})`);
          streamGrad.addColorStop(0.55, `rgba(250, 246, 238, ${0.45 * baseAlpha})`);
          streamGrad.addColorStop(0.82, `rgba(242, 238, 230, ${0.22 * baseAlpha})`);
          streamGrad.addColorStop(1.0, `rgba(225, 220, 210, 0)`);
        }

        ctx.fillStyle = streamGrad;
        ctx.fill();

        // Pass 2: 细若游丝的工笔高光中脊线（沿波纹脊线延伸至尾部渐隐）
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
        coreGrad.addColorStop(0.14, `rgba(255, 255, 255, ${0.20 * baseAlpha})`);
        coreGrad.addColorStop(0.45, `rgba(254, 252, 248, ${0.12 * baseAlpha})`);
        coreGrad.addColorStop(0.75, `rgba(245, 240, 232, 0)`);

        ctx.strokeStyle = coreGrad;
        ctx.lineWidth = 0.35;
        ctx.stroke();
      }
    }

    // ── 4. 纤巧内敛的香头火炭 ──
    for (let i = 0; i < dynamicEmbers.length; i++) {
      const emb = dynamicEmbers[i];
      if (this.litTransition > 0.02 && currentHealth > 0.02) {
        const emberCycle = Math.sin(this.time * 2.8 + i * 1.6);
        const emberBreath = 0.82 + emberCycle * 0.18;

        // 微晕
        const rGlow = ctx.createRadialGradient(emb.x, emb.y, 0.4, emb.x, emb.y, 4.2 * lateFactor);
        rGlow.addColorStop(0, `rgba(255, 100, 30, ${0.65 * emberBreath * this.litTransition})`);
        rGlow.addColorStop(0.4, `rgba(245, 60, 15, ${0.25 * emberBreath * this.litTransition})`);
        rGlow.addColorStop(1, 'rgba(200, 40, 10, 0)');
        ctx.fillStyle = rGlow;
        ctx.beginPath();
        ctx.arc(emb.x, emb.y, 4.2 * lateFactor, 0, Math.PI * 2);
        ctx.fill();

        // 核心亮点
        ctx.fillStyle = `rgba(255, 200, 120, ${0.9 * emberBreath * this.litTransition})`;
        ctx.beginPath();
        ctx.arc(emb.x, emb.y, 0.75 * lateFactor, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();

    // 更新 GPU 纹理源
    this.texture.source.update();
  }

  public destroy(): void {
    try {
      this.sprite.destroy();
      this.texture.destroy(true);
    } catch {
      // ignore
    }
  }
}
