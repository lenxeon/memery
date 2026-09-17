/**
 * @file AuthBackground.tsx
 * @description 《暖念》夜空远山孔明灯场景：深邃蓝调夜空 · 璀璨繁星 · 皓月当空 · 黛蓝远山 · 古建飞檐 · 孔明灯静穆徐升
 * 纯粹还原参考图意境：夜空留白、群山叠翠与东方飞檐。
 */
import React, { useEffect, useRef } from 'react';

interface Lantern {
  x: number;
  y: number;
  width: number;
  height: number;
  speedY: number;
  driftSpeed: number;
  driftAmp: number;
  driftPhase: number;
  opacity: number;
  depth: 'close' | 'mid' | 'distant';
  hueShift: number;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export const AuthBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // ── 1. 初始化浩瀚星空繁星（120-160颗细密星芒，微弱闪烁） ──
    const starCount = Math.min(180, Math.max(90, Math.floor(width / 10)));
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      const baseAlpha = 0.2 + Math.random() * 0.7;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.75),
        radius: Math.random() < 0.8 ? 0.6 + Math.random() * 0.8 : 1.5 + Math.random() * 0.9,
        alpha: baseAlpha,
        baseAlpha,
        twinkleSpeed: 0.01 + Math.random() * 0.02,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // ── 2. 初始化孔明灯（严格限定最多3盏，景深分明，慢速平稳，近大远小） ──
    const lanterns: Lantern[] = [
      // 1. 近景大灯（清晰、温润、大气，位于右侧上空）
      {
        x: width * 0.78,
        y: height * 0.24,
        width: Math.min(width * 0.09, 64),
        height: Math.min(width * 0.12, 86),
        speedY: 0.065, // 极慢徐升，宁静庄严
        driftSpeed: 0.0015,
        driftAmp: 1.8,
        driftPhase: 0.6,
        opacity: 0.96,
        depth: 'close',
        hueShift: 0.2,
      },
      // 2. 中景中灯（微润柔焦，位于左侧空域）
      {
        x: width * 0.2,
        y: height * 0.44,
        width: Math.min(width * 0.048, 34),
        height: Math.min(width * 0.065, 46),
        speedY: 0.05, // 极慢平稳
        driftSpeed: 0.002,
        driftAmp: 2.2,
        driftPhase: 2.3,
        opacity: 0.86,
        depth: 'mid',
        hueShift: 0.4,
      },
      // 3. 远景小灯（高空虚化，小巧空灵，自群山上空升起）
      {
        x: width * 0.58,
        y: height * 0.6,
        width: Math.min(width * 0.024, 17),
        height: Math.min(width * 0.032, 23),
        speedY: 0.035, // 极慢飘浮
        driftSpeed: 0.0025,
        driftAmp: 1.6,
        driftPhase: 4.1,
        opacity: 0.68,
        depth: 'distant',
        hueShift: 0.7,
      },
    ];

    // ── 3. 绘制单盏东方孔明灯（带景深虚化与近大远小） ──
    const drawLantern = (l: Lantern, time: number) => {
      const curX = l.x + Math.sin(time * l.driftSpeed + l.driftPhase) * l.driftAmp;
      const curY = l.y;

      ctx.save();

      // 近大远小景深模糊虚化 (Depth of field blur)
      if (l.depth === 'distant') {
        ctx.filter = 'blur(2.6px)';
      } else if (l.depth === 'mid') {
        ctx.filter = 'blur(1.2px)';
      } else {
        ctx.filter = 'none';
      }

      ctx.translate(curX, curY);

      const alpha = l.opacity;

      // A. 外层柔和漫射暖色气晕
      const haloR = l.width * 1.5;
      const haloGrad = ctx.createRadialGradient(0, l.height * 0.35, l.width * 0.1, 0, l.height * 0.35, haloR);
      haloGrad.addColorStop(0, `rgba(254, 215, 170, ${alpha * 0.45})`);
      haloGrad.addColorStop(0.4, `rgba(249, 115, 22, ${alpha * 0.2})`);
      haloGrad.addColorStop(1, 'rgba(234, 88, 12, 0)');

      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(0, l.height * 0.35, haloR, 0, Math.PI * 2);
      ctx.fill();

      // B. 宣纸灯罩轮廓
      const halfWTop = l.width * 0.48;
      const halfWBot = l.width * 0.38;
      const h = l.height;

      ctx.beginPath();
      ctx.moveTo(-halfWTop, -h * 0.45);
      ctx.quadraticCurveTo(0, -h * 0.52, halfWTop, -h * 0.45);
      ctx.quadraticCurveTo(halfWTop * 1.08, 0, halfWBot, h * 0.45);
      ctx.quadraticCurveTo(0, h * 0.49, -halfWBot, h * 0.45);
      ctx.quadraticCurveTo(-halfWTop * 1.08, 0, -halfWTop, -h * 0.45);
      ctx.closePath();

      const lanternGrad = ctx.createRadialGradient(0, h * 0.15, l.width * 0.05, 0, 0, l.width * 0.85);
      lanternGrad.addColorStop(0, `rgba(255, 255, 240, ${alpha * 0.98})`);
      lanternGrad.addColorStop(0.35, `rgba(254, 215, 120, ${alpha * 0.95})`);
      lanternGrad.addColorStop(0.7, `rgba(249, 115, 22, ${alpha * 0.88})`);
      lanternGrad.addColorStop(1, `rgba(194, 65, 12, ${alpha * 0.82})`);

      ctx.fillStyle = lanternGrad;
      ctx.fill();

      // C. 底部竹圈边缘与芯火
      ctx.beginPath();
      ctx.ellipse(0, h * 0.44, halfWBot * 0.95, halfWBot * 0.22, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(154, 52, 18, ${alpha * 0.85})`;
      ctx.lineWidth = Math.max(1, l.width * 0.04);
      ctx.stroke();

      // 核心烛芯
      const flameW = l.width * 0.2;
      const flameH = l.height * 0.24;
      const flameGrad = ctx.createRadialGradient(0, h * 0.32, 1, 0, h * 0.32, flameW * 1.6);
      flameGrad.addColorStop(0, '#ffffff');
      flameGrad.addColorStop(0.4, `rgba(254, 240, 138, ${alpha})`);
      flameGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');

      ctx.fillStyle = flameGrad;
      ctx.beginPath();
      ctx.ellipse(0, h * 0.32, flameW, flameH, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // ── 4. 动画循环 ──
    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // A. 绘制璀璨繁星
      for (const s of stars) {
        s.twinklePhase += s.twinkleSpeed;
        const currentAlpha = s.baseAlpha * (0.6 + 0.4 * Math.sin(s.twinklePhase));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        if (s.radius > 1.2) {
          ctx.shadowColor = '#93c5fd';
          ctx.shadowBlur = 3;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // B. 排序并绘制孔明灯
      lanterns.sort((a, b) => {
        const order = { distant: 0, mid: 1, close: 2 };
        return order[a.depth] - order[b.depth];
      });

      for (const l of lanterns) {
        l.y -= l.speedY;

        if (l.y < -l.height * 1.8) {
          l.y = height * (l.depth === 'close' ? 1.05 : 0.85) + Math.random() * 50;
          l.x = l.depth === 'close'
            ? width * 0.74 + Math.random() * (width * 0.08)
            : l.depth === 'mid'
            ? width * 0.16 + Math.random() * (width * 0.08)
            : width * 0.52 + Math.random() * (width * 0.12);
        }

        drawLantern(l, time);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* ── 1. 经典蓝调深邃夜空渐变 (顶端Midnight Blue -> 中部Sapphire -> 底部远山Cyan Glow) ── */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #050b1a 0%, #081636 28%, #112d5d 56%, #1c457c 78%, #25588e 100%)'
        }}
      />

      {/* ── 2. 银河微茫与夜空微光雾层 (Milky Way / Nebula Sheen) ── */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(56, 189, 248, 0.15) 0%, rgba(30, 58, 138, 0.05) 55%, transparent 80%)'
        }}
      />

      {/* ── 3. 清朗明月与皎洁月晕 (The Radiant Moon) ── */}
      <div className="absolute top-10 sm:top-14 right-8 sm:right-24 pointer-events-none">
        <div 
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full absolute -top-4 -left-4 sm:-top-6 sm:-left-6 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(254, 252, 232, 0.35) 0%, rgba(191, 219, 254, 0.15) 45%, rgba(14, 165, 233, 0) 75%)',
            filter: 'blur(8px)',
          }}
        />
        <div 
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-[0_0_35px_rgba(255,255,255,0.75)] relative overflow-hidden"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #fef9c3 60%, #fed7aa 100%)',
          }}
        >
          <div 
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(ellipse at 40% 45%, #713f12 0%, transparent 60%)'
            }}
          />
        </div>
      </div>

      {/* ── 4. 浮云微掩 (Soft Nocturnal Floating Cloud Bands) ── */}
      <svg 
        className="absolute top-20 sm:top-24 right-0 w-80 sm:w-96 h-28 opacity-45 pointer-events-none" 
        viewBox="0 0 400 120"
      >
        <path
          d="M 20,60 Q 70,30 130,50 Q 190,20 270,55 Q 350,35 390,70 Q 320,95 240,80 Q 160,105 80,85 Z"
          fill="url(#cloudGrad)"
        />
        <defs>
          <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* ── 5. Canvas 动态图层：璀璨繁星 + 静穆徐升的孔明灯 ── */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none block z-10" />

      {/* ── 6. 底部远山山峦叠嶂 (优雅地平线比例，大幅压缩高度，留足星空留白) ── */}
      <svg
        className="absolute inset-x-0 bottom-0 w-full h-[22vh] sm:h-[26vh] pointer-events-none z-15"
        preserveAspectRatio="none"
        viewBox="0 0 1440 320"
      >
        <defs>
          {/* 最远峰峦天际渐变 */}
          <linearGradient id="mountainPeakFar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b72a8" stopOpacity="0.75" />
            <stop offset="35%" stopColor="#224c7a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#112944" stopOpacity="1" />
          </linearGradient>

          {/* 山谷晨霭薄雾渐变 */}
          <linearGradient id="valleyMistGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#1e3a8a" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0b1a2f" stopOpacity="0" />
          </linearGradient>

          {/* 中景崇山峻岭渐变 */}
          <linearGradient id="mountainPeakMid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e4d80" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#123358" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#0a1d33" stopOpacity="1" />
          </linearGradient>

          {/* 近景青黛苍山渐变 */}
          <linearGradient id="mountainPeakFore" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#122d4c" stopOpacity="0.98" />
            <stop offset="55%" stopColor="#09182a" stopOpacity="1" />
            <stop offset="100%" stopColor="#040b14" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* 1. 远景群峰 (秀美起伏，优雅依傍在地平线) */}
        <path
          d="M 0,160 
             L 120,95 L 240,135 
             L 380,65 L 520,130 
             L 660,80 L 780,125 
             L 920,55 L 1060,115 
             L 1200,75 L 1320,125 
             L 1440,85 
             L 1440,320 L 0,320 Z"
          fill="url(#mountainPeakFar)"
        />

        {/* 山谷流岚轻雾 */}
        <path
          d="M 0,180 Q 360,140 720,170 T 1440,150 L 1440,240 L 0,240 Z"
          fill="url(#valleyMistGrad)"
        />

        {/* 2. 中景连绵峻岭 */}
        <path
          d="M 0,200 
             Q 180,130 340,165 
             T 700,115 
             T 1080,155 
             T 1440,135 
             L 1440,320 L 0,320 Z"
          fill="url(#mountainPeakMid)"
        />

        {/* 3. 近景浑厚苍峦 */}
        <path
          d="M 0,250 
             C 220,190 440,240 640,205 
             C 880,160 1140,235 1440,195 
             L 1440,320 L 0,320 Z"
          fill="url(#mountainPeakFore)"
        />
      </svg>

      {/* ── 7. 底部幽蓝夜色渐隐 ── */}
      <div 
        className="absolute inset-x-0 bottom-0 h-16 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to top, rgba(3, 7, 14, 0.96) 0%, rgba(4, 9, 18, 0.4) 65%, transparent 100%)'
        }}
      />
    </div>
  );
};
