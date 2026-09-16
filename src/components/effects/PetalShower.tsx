/**
 * @file PetalShower.tsx
 * @description 漫天落英缤纷全屏 3D 特效组件。
 * 具备三维气动翻滚（Pitch/Roll/Yaw）、多样化气流轨迹（顺风滑翔、漩涡盘旋、大S摇曳、高频轻颤）
 * 以及品类专属花瓣剪影与光影渐变，呈现极度真实自然的落花意境。
 */
import React, { useEffect, useState, useMemo } from 'react';

export type FlightArchetype = 
  | 'tumble_spiral'   // 三维空翻螺旋盘旋
  | 'glide_breeze'    // 顺风大角度斜掠滑翔
  | 'flutter_eddy'    // 气流微涡高频倾侧翻飞
  | 'gentle_sway'     // 缓带当风大S型从容摇曳
  | 'tumbling_leaf';  // 轴线翻滚加速坠落

interface PetalSpec {
  id: number;
  startX: number;        // 起始 X 坐标 (vw 比例: 5% ~ 95%)
  delay: number;         // 错峰延迟 (0 ~ 1.5s)
  duration: number;      // 下落持续时间 (3.6s ~ 6.2s)
  size: number;          // 视觉尺寸 (12px ~ 26px)
  archetype: FlightArchetype;
  colorGradId: string;
  fillColor1: string;
  fillColor2: string;
  accentEdge: string;
  opacity: number;
  svgPath: string;
  viewBox: string;
  cssVars: Record<string, string>;
}

interface PetalShowerProps {
  activeTrigger: number;
  flowerType?: string;
}

export const PetalShower: React.FC<PetalShowerProps> = ({ activeTrigger, flowerType = 'peonies' }) => {
  const [petals, setPetals] = useState<PetalSpec[]>([]);

  // 花种专属形态与色彩调色板定义
  const flowerSpec = useMemo(() => {
    switch (flowerType) {
      case 'plum_blossoms':
        return {
          colors: [
            { c1: '#ffffff', c2: '#faf6ee', edge: '#f1f5f9' },
            { c1: '#fffef8', c2: '#fce7f3', edge: '#f8fafc' },
            { c1: '#ffffff', c2: '#fef3c7', edge: '#fefce8' },
            { c1: '#f8fafc', c2: '#edd5d9', edge: '#fbcfe8' },
          ],
          // 小巧圆润五瓣梅花之单个花瓣（圆润微凹）
          path: 'M 10 2 C 16 2, 20 7, 19 15 C 18 22, 13 26, 10 28 C 7 26, 2 22, 1 15 C 0 7, 4 2, 10 2 Z',
          viewBox: '0 0 20 28',
          scaleRange: [10, 16],
        };

      case 'sunflowers':
        return {
          colors: [
            { c1: '#facc15', c2: '#eab308', edge: '#ca8a04' },
            { c1: '#fde047', c2: '#f59e0b', edge: '#b45309' },
            { c1: '#fef08a', c2: '#eab308', edge: '#d97706' },
            { c1: '#fbbf24', c2: '#d97706', edge: '#92400e' },
          ],
          // 狭长微弧金黄向日葵舌状花瓣
          path: 'M 9 0 C 14 6, 17 18, 14 30 C 12 36, 9 40, 9 42 C 9 40, 6 36, 4 30 C 1 18, 4 6, 9 0 Z',
          viewBox: '0 0 18 42',
          scaleRange: [13, 22],
        };

      case 'carnations':
        return {
          colors: [
            { c1: '#ffffff', c2: '#fbcfe8', edge: '#f472b6' },
            { c1: '#fdf2f8', c2: '#f472b6', edge: '#ec4899' },
            { c1: '#fff1f2', c2: '#fda4af', edge: '#fb7185' },
            { c1: '#fce7f3', c2: '#f9a8d4', edge: '#f43f5e' },
          ],
          // 康乃馨边缘细碎锯齿波浪小折扇花瓣
          path: 'M 10 28 C 7 22, 5 16, 2 12 C 1 10, 3 9, 4 8 C 4 7, 6 7, 7 6 C 8 5, 10 5, 11 6 C 12 7, 14 7, 15 8 C 16 9, 18 10, 17 12 C 14 16, 12 22, 10 28 Z',
          viewBox: '0 0 20 28',
          scaleRange: [12, 18],
        };

      case 'calla_lilies':
        return {
          colors: [
            { c1: '#ffffff', c2: '#fff1f2', edge: '#fbcfe8' },
            { c1: '#fafaf9', c2: '#fce7f3', edge: '#f472b6' },
            { c1: '#ffffff', c2: '#fdf4ff', edge: '#f5d0fe' },
          ],
          // 马蹄莲卷苞片与大片佛焰瓣
          path: 'M 10 0 C 18 8, 20 22, 13 32 C 9 36, 9 38, 9 40 C 9 38, 9 36, 5 32 C -2 22, 0 8, 10 0 Z',
          viewBox: '0 0 20 40',
          scaleRange: [15, 25],
        };

      case 'tulips':
        return {
          colors: [
            { c1: '#f43f5e', c2: '#be123c', edge: '#9f1239' },
            { c1: '#fb7185', c2: '#e11d48', edge: '#881337' },
            { c1: '#ffffff', c2: '#fef08a', edge: '#facc15' },
            { c1: '#fbcfe8', c2: '#f43f5e', edge: '#fda4af' },
          ],
          // 丰满挺立杯状郁金香花瓣
          path: 'M 12 2 C 19 2, 23 12, 22 24 C 20 32, 15 36, 12 38 C 9 36, 4 32, 2 24 C 1 12, 5 2, 12 2 Z',
          viewBox: '0 0 24 38',
          scaleRange: [14, 23],
        };

      case 'roses':
        return {
          colors: [
            { c1: '#f43f5e', c2: '#be123c', edge: '#881337' },
            { c1: '#fda4af', c2: '#e11d48', edge: '#9f1239' },
            { c1: '#ffedd5', c2: '#fb923c', edge: '#ea580c' },
            { c1: '#fff1f2', c2: '#f472b6', edge: '#e11d48' },
          ],
          // 柔美圆润玫瑰花瓣（顶端微凹卷心）
          path: 'M 12 4 C 15 1, 21 3, 23 10 C 25 18, 19 26, 12 30 C 5 26, -1 18, 1 10 C 3 3, 9 1, 12 4 Z',
          viewBox: '0 0 24 30',
          scaleRange: [13, 22],
        };

      case 'lotus':
        return {
          colors: [
            { c1: '#ffffff', c2: '#fbcfe8', edge: '#ec4899' },
            { c1: '#fce7f3', c2: '#f472b6', edge: '#db2777' },
            { c1: '#ffffff', c2: '#fdf2f8', edge: '#f472b6' },
          ],
          path: 'M 10 0 C 17 6, 20 20, 12 30 C 10 32, 10 34, 10 36 C 10 34, 10 32, 8 30 C 0 20, 3 6, 10 0 Z',
          viewBox: '0 0 20 36',
          scaleRange: [14, 24],
        };

      case 'peonies':
      default:
        return {
          colors: [
            { c1: '#fbcfe8', c2: '#f472b6', edge: '#db2777' },
            { c1: '#fff1f2', c2: '#fda4af', edge: '#f43f5e' },
            { c1: '#fce7f3', c2: '#f472b6', edge: '#ec4899' },
            { c1: '#ffffff', c2: '#fbcfe8', edge: '#f472b6' },
          ],
          path: 'M 12 2 C 18 1, 23 8, 22 18 C 20 25, 15 29, 12 31 C 9 29, 4 25, 2 18 C 1 8, 6 1, 12 2 Z',
          viewBox: '0 0 24 32',
          scaleRange: [13, 23],
        };
    }
  }, [flowerType]);

  useEffect(() => {
    if (!activeTrigger) return;

    const archetypes: FlightArchetype[] = [
      'tumble_spiral',
      'glide_breeze',
      'flutter_eddy',
      'gentle_sway',
      'tumbling_leaf',
    ];

    const count = 34; // 适度稠密，如梦似幻
    const newPetals: PetalSpec[] = Array.from({ length: count }).map((_, i) => {
      const archetype = archetypes[i % archetypes.length];
      const colorScheme = flowerSpec.colors[i % flowerSpec.colors.length];
      const minSz = flowerSpec.scaleRange[0];
      const maxSz = flowerSpec.scaleRange[1];
      const size = Math.round(minSz + Math.random() * (maxSz - minSz));

      // 差异化空气动力学参数
      const startX = 6 + Math.random() * 88; // 6% 到 94% 屏宽
      const duration = 3.6 + Math.random() * 2.4;
      const delay = (i * 0.04) + Math.random() * 0.55;

      // 气动自旋角度随机值 (度)
      const rotZStart = Math.round((Math.random() - 0.5) * 120);
      const rotZMid = Math.round(rotZStart + (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 240));
      const rotZEnd = Math.round(rotZMid + (Math.random() > 0.5 ? 1 : -1) * (200 + Math.random() * 320));

      // 三维俯仰/滚转翻面参数 (模拟薄片花瓣正反两面朝光翻滚)
      const rotX1 = Math.round((Math.random() - 0.5) * 360);
      const rotX2 = Math.round(rotX1 + (Math.random() > 0.5 ? 360 : -360) + (Math.random() - 0.5) * 180);
      const rotY1 = Math.round((Math.random() - 0.5) * 360);
      const rotY2 = Math.round(rotY1 + (Math.random() > 0.5 ? 360 : -360) + (Math.random() - 0.5) * 180);

      // 横向风力漂移位移量
      const windSign = Math.random() > 0.35 ? 1 : -1; // 偏向主风向
      const driftTotal = Math.round(windSign * (40 + Math.random() * 120));
      const sway1 = Math.round(windSign * (25 + Math.random() * 45));
      const sway2 = Math.round(-windSign * (15 + Math.random() * 35));

      return {
        id: Date.now() + i,
        startX,
        delay,
        duration,
        size,
        archetype,
        colorGradId: `petalGrad_${i % flowerSpec.colors.length}`,
        fillColor1: colorScheme.c1,
        fillColor2: colorScheme.c2,
        accentEdge: colorScheme.edge,
        opacity: 0.88 + Math.random() * 0.12,
        svgPath: flowerSpec.path,
        viewBox: flowerSpec.viewBox,
        cssVars: {
          '--p-start-x': `${startX}vw`,
          '--p-drift-x': `${driftTotal}px`,
          '--p-sway-1': `${sway1}px`,
          '--p-sway-2': `${sway2}px`,
          '--p-rot-z-0': `${rotZStart}deg`,
          '--p-rot-z-1': `${rotZMid}deg`,
          '--p-rot-z-2': `${rotZEnd}deg`,
          '--p-rot-x-0': `${rotX1}deg`,
          '--p-rot-x-1': `${rotX2}deg`,
          '--p-rot-y-0': `${rotY1}deg`,
          '--p-rot-y-1': `${rotY2}deg`,
        },
      };
    });

    setPetals(newPetals);

    // 最大下落时间 + 延迟后自动清理
    const maxLifeMs = 6800;
    const timer = setTimeout(() => {
      setPetals([]);
    }, maxLifeMs);

    return () => clearTimeout(timer);
  }, [activeTrigger, flowerSpec]);

  if (petals.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-35 overflow-hidden"
      style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
    >
      {/* 动态渐变资源 */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          {flowerSpec.colors.map((c, idx) => (
            <linearGradient key={idx} id={`petalGrad_${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={c.c1} />
              <stop offset="65%" stopColor={c.c2} />
              <stop offset="100%" stopColor={c.edge} />
            </linearGradient>
          ))}
        </defs>
      </svg>

      {petals.map((petal) => (
        <div
          key={petal.id}
          className={`absolute petal-item archetype-${petal.archetype}`}
          style={
            {
              left: `${petal.startX}%`,
              top: '-6%',
              animationDuration: `${petal.duration}s`,
              animationDelay: `${petal.delay}s`,
              ...petal.cssVars,
            } as React.CSSProperties
          }
        >
          <svg
            width={petal.size}
            height={petal.size * 1.5}
            viewBox={petal.viewBox}
            style={{
              filter: 'drop-shadow(0 3px 6px rgba(45, 20, 10, 0.18))',
              overflow: 'visible',
            }}
          >
            <path
              d={petal.svgPath}
              fill={`url(#${petal.colorGradId})`}
              stroke={petal.accentEdge}
              strokeWidth="0.4"
              opacity={petal.opacity}
            />
          </svg>
        </div>
      ))}

      {/* 5 种完全不同动力学特性的 3D 轨迹动画 */}
      <style>{`
        /* 1. 三维空翻螺旋盘旋 (Tumble Spiral) */
        .archetype-tumble_spiral {
          animation-name: animTumbleSpiral;
          animation-timing-function: cubic-bezier(0.33, 0, 0.67, 1);
          animation-fill-mode: forwards;
        }
        @keyframes animTumbleSpiral {
          0% {
            top: -6%;
            transform: translate3d(0, 0, 0) rotateX(var(--p-rot-x-0)) rotateY(var(--p-rot-y-0)) rotateZ(var(--p-rot-z-0)) scale(0.85);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          35% {
            transform: translate3d(calc(var(--p-sway-1) * 1.4), 32vh, 40px) rotateX(var(--p-rot-x-1)) rotateY(calc(var(--p-rot-y-0) + 180deg)) rotateZ(var(--p-rot-z-1)) scale(1.05);
          }
          70% {
            transform: translate3d(calc(var(--p-sway-2) * 0.8), 65vh, -20px) rotateX(calc(var(--p-rot-x-1) + 180deg)) rotateY(var(--p-rot-y-1)) rotateZ(calc(var(--p-rot-z-1) + 120deg)) scale(0.95);
            opacity: 0.95;
          }
          100% {
            top: 86%;
            transform: translate3d(var(--p-drift-x), 0, 0) rotateX(calc(var(--p-rot-x-1) + 360deg)) rotateY(calc(var(--p-rot-y-1) + 360deg)) rotateZ(var(--p-rot-z-2)) scale(0.8);
            opacity: 0;
          }
        }

        /* 2. 顺风大角度斜掠滑翔 (Glide Breeze) */
        .archetype-glide_breeze {
          animation-name: animGlideBreeze;
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation-fill-mode: forwards;
        }
        @keyframes animGlideBreeze {
          0% {
            top: -6%;
            transform: translate3d(0, 0, 0) rotateX(15deg) rotateY(10deg) rotateZ(var(--p-rot-z-0)) scale(0.9);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          45% {
            transform: translate3d(calc(var(--p-drift-x) * 0.6), 40vh, 60px) rotateX(35deg) rotateY(25deg) rotateZ(calc(var(--p-rot-z-0) + 75deg)) scale(1.08);
          }
          80% {
            opacity: 0.92;
          }
          100% {
            top: 88%;
            transform: translate3d(calc(var(--p-drift-x) * 1.3), 0, -30px) rotateX(55deg) rotateY(40deg) rotateZ(calc(var(--p-rot-z-0) + 160deg)) scale(0.75);
            opacity: 0;
          }
        }

        /* 3. 气流微涡高频倾侧翻飞 (Flutter Eddy) */
        .archetype-flutter_eddy {
          animation-name: animFlutterEddy;
          animation-timing-function: ease-in-out;
          animation-fill-mode: forwards;
        }
        @keyframes animFlutterEddy {
          0% {
            top: -6%;
            transform: translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) rotateZ(var(--p-rot-z-0));
            opacity: 0;
          }
          12% {
            opacity: 1;
          }
          25% {
            transform: translate3d(calc(var(--p-sway-1) * -1), 22vh, 30px) rotateX(120deg) rotateY(60deg) rotateZ(calc(var(--p-rot-z-0) - 80deg));
          }
          50% {
            transform: translate3d(calc(var(--p-sway-2) * 1.5), 45vh, -15px) rotateX(240deg) rotateY(180deg) rotateZ(calc(var(--p-rot-z-0) + 140deg));
          }
          75% {
            transform: translate3d(var(--p-sway-1), 68vh, 45px) rotateX(360deg) rotateY(260deg) rotateZ(calc(var(--p-rot-z-0) + 260deg));
            opacity: 0.9;
          }
          100% {
            top: 86%;
            transform: translate3d(calc(var(--p-drift-x) * 0.8), 0, 0) rotateX(520deg) rotateY(360deg) rotateZ(var(--p-rot-z-2));
            opacity: 0;
          }
        }

        /* 4. 缓带当风大 S 型从容摇曳 (Gentle Sway) */
        .archetype-gentle_sway {
          animation-name: animGentleSway;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          animation-fill-mode: forwards;
        }
        @keyframes animGentleSway {
          0% {
            top: -6%;
            transform: translate3d(0, 0, 0) rotateZ(var(--p-rot-z-0)) scale(0.95);
            opacity: 0;
          }
          10% {
            opacity: 0.95;
          }
          30% {
            transform: translate3d(calc(var(--p-sway-1) * 1.8), 28vh, 15px) rotateX(25deg) rotateY(-20deg) rotateZ(calc(var(--p-rot-z-0) + 40deg)) scale(1.0);
          }
          65% {
            transform: translate3d(calc(var(--p-sway-2) * 2.0), 58vh, -15px) rotateX(-20deg) rotateY(25deg) rotateZ(calc(var(--p-rot-z-0) - 35deg)) scale(0.96);
            opacity: 0.9;
          }
          100% {
            top: 87%;
            transform: translate3d(calc(var(--p-drift-x) * 0.9), 0, 0) rotateX(15deg) rotateY(10deg) rotateZ(calc(var(--p-rot-z-0) + 15deg)) scale(0.85);
            opacity: 0;
          }
        }

        /* 5. 轴线翻滚加速坠落 (Tumbling Leaf) */
        .archetype-tumbling_leaf {
          animation-name: animTumblingLeaf;
          animation-timing-function: cubic-bezier(0.3, 0.1, 0.4, 1);
          animation-fill-mode: forwards;
        }
        @keyframes animTumblingLeaf {
          0% {
            top: -6%;
            transform: translate3d(0, 0, 0) rotateX(var(--p-rot-x-0)) rotateZ(var(--p-rot-z-0));
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          40% {
            transform: translate3d(calc(var(--p-sway-1) * 0.9), 35vh, 20px) rotateX(calc(var(--p-rot-x-0) + 180deg)) rotateZ(calc(var(--p-rot-z-0) + 90deg));
          }
          75% {
            transform: translate3d(calc(var(--p-sway-2) * 1.1), 66vh, -30px) rotateX(calc(var(--p-rot-x-0) + 360deg)) rotateZ(calc(var(--p-rot-z-0) + 210deg));
            opacity: 0.88;
          }
          100% {
            top: 89%;
            transform: translate3d(var(--p-drift-x), 0, 0) rotateX(calc(var(--p-rot-x-0) + 540deg)) rotateZ(var(--p-rot-z-2));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
