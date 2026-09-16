/**
 * @file PetalShower.tsx
 * @description 漫天花瓣飘落全屏特效组件，烘托祭拜思念氛围。
 * 具备多向旋转、地面碰撞着陆、落地平铺留存停留生命周期，再从容淡出消散。
 */
import React, { useEffect, useState } from 'react';

interface Petal {
  id: number;
  x: number;
  size: number;
  rotation: number;
  color: string;
  duration: number;
  delay: number;
  animClass: string;
  landTop: number; // 落地目标纵深坐标 (%): 88% ~ 94% (木地板) 或 68% ~ 72% (案台)
  opacity: number;
}

interface PetalShowerProps {
  activeTrigger: number;
  flowerType?: string;
}

export const PetalShower: React.FC<PetalShowerProps> = ({ activeTrigger, flowerType = 'peonies' }) => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (!activeTrigger) return;

    const getColors = () => {
      switch (flowerType) {
        case 'plum_blossoms':
          return ['#ffffff', '#fffef9', '#fefce8', '#f8fafc', '#fce7f3'];
        case 'sunflowers':
          return ['#facc15', '#fde047', '#eab308', '#fbbf24'];
        case 'carnations':
          return ['#fda4af', '#f472b6', '#fff1f2', '#fbcfe8'];
        case 'calla_lilies':
          return ['#ffffff', '#fff1f2', '#fbcfe8', '#f8fafc'];
        case 'tulips':
          return ['#f43f5e', '#fb7185', '#ffffff', '#fef08a'];
        case 'lilies':
        case 'chrysanthemum':
          return ['#ffffff', '#fef9c3', '#fefce8', '#f1f5f9'];
        case 'lotus':
          return ['#f472b6', '#fbcfe8', '#ffffff', '#ec4899'];
        case 'roses':
          return ['#fed7aa', '#ffedd5', '#fb923c', '#fffbeb'];
        case 'peonies':
        default:
          return ['#fda4af', '#f472b6', '#fff1f2', '#fb7185'];
      }
    };

    const colors = getColors();
    const animTypes = ['petalFallCW', 'petalFallCCW', 'petalFallDriftR', 'petalFallDriftL'];

    const newPetals: Petal[] = Array.from({ length: 28 }).map((_, i) => {
      const x = 10 + Math.random() * 80; // 10% 到 90% 屏幕宽度

      // 碰撞目标点计算：中央 35% ~ 65% 区域有部分花瓣落在供案案面(68%~72%)，其余全量落在木地板(88%~94%)
      const isOverTable = x >= 36 && x <= 64 && Math.random() < 0.45;
      const landTop = isOverTable 
        ? 68 + Math.random() * 4.5 
        : 88 + Math.random() * 6.0;

      return {
        id: Date.now() + i,
        x,
        size: 10 + Math.random() * 12,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: 8.8 + Math.random() * 1.8, // 8.8s ~ 10.6s 总周期（前4s下落，中段3.5s着陆留存，尾段1.5s消散）
        delay: Math.random() * 1.5,          // 0s ~ 1.5s 错峰下落
        animClass: animTypes[Math.floor(Math.random() * animTypes.length)],
        landTop,
        opacity: 0.85 + Math.random() * 0.15,
      };
    });

    setPetals(newPetals);

    // 12.5 秒后安全清理所有消散完毕的粒子
    const timer = setTimeout(() => {
      setPetals([]);
    }, 12500);

    return () => clearTimeout(timer);
  }, [activeTrigger, flowerType]);

  if (petals.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-35 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={
            {
              left: `${petal.x}%`,
              top: `${petal.landTop}%`,
              transform: `rotate(${petal.rotation}deg)`,
              opacity: 0,
              animation: `${petal.animClass} ${petal.duration.toFixed(2)}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
              animationDelay: `${petal.delay.toFixed(2)}s`,
              '--land-top': `${petal.landTop}%`,
            } as React.CSSProperties
          }
        >
          <svg
            width={petal.size}
            height={petal.size * 1.4}
            viewBox="0 0 20 28"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(60,30,10,0.18))',
            }}
          >
            <path
              d="M 10 0 C 18 6 20 20 10 28 C 0 20 2 6 10 0 Z"
              fill={petal.color}
              opacity={petal.opacity}
            />
          </svg>
        </div>
      ))}
      <style>{`
        /* 1. 顺时针旋转 + 右摆动 ➔ 触地平铺留存 ➔ 渐渐消散 */
        @keyframes petalFallCW {
          0% {
            top: -5%;
            transform: translateX(0px) rotate(0deg) scale(0.85);
            opacity: 0;
          }
          6% {
            opacity: 0.92;
          }
          25% {
            top: 40%;
            transform: translateX(18px) rotate(190deg) scale(1);
            opacity: 0.88;
          }
          45% {
            top: var(--land-top, 90%);
            transform: translateX(-12px) rotate(375deg) scale(0.95);
            opacity: 0.88;
          }
          50% {
            top: var(--land-top, 90%);
            transform: translateX(-10px) rotate(378deg) scaleY(0.45) scaleX(0.95);
            opacity: 0.85;
          }
          /* 落地后安静留存在地板/案面上约 3.5 秒 */
          78% {
            top: var(--land-top, 90%);
            transform: translateX(-10px) rotate(378deg) scaleY(0.45) scaleX(0.95);
            opacity: 0.85;
          }
          100% {
            top: var(--land-top, 90%);
            transform: translateX(-10px) rotate(378deg) scaleY(0.45) scaleX(0.95);
            opacity: 0;
          }
        }

        /* 2. 逆时针旋转 + 左摆动 ➔ 触地平铺留存 ➔ 渐渐消散 */
        @keyframes petalFallCCW {
          0% {
            top: -5%;
            transform: translateX(0px) rotate(0deg) scale(0.85);
            opacity: 0;
          }
          6% {
            opacity: 0.92;
          }
          25% {
            top: 40%;
            transform: translateX(-16px) rotate(-185deg) scale(0.98);
            opacity: 0.88;
          }
          45% {
            top: var(--land-top, 89%);
            transform: translateX(14px) rotate(-365deg) scale(0.92);
            opacity: 0.88;
          }
          50% {
            top: var(--land-top, 89%);
            transform: translateX(12px) rotate(-368deg) scaleY(0.45) scaleX(0.95);
            opacity: 0.85;
          }
          /* 落地后安静留存在地板/案面上约 3.5 秒 */
          78% {
            top: var(--land-top, 89%);
            transform: translateX(12px) rotate(-368deg) scaleY(0.45) scaleX(0.95);
            opacity: 0.85;
          }
          100% {
            top: var(--land-top, 89%);
            transform: translateX(12px) rotate(-368deg) scaleY(0.45) scaleX(0.95);
            opacity: 0;
          }
        }

        /* 3. 顺风向右斜掠漂移 ➔ 触地平铺留存 ➔ 渐渐消散 */
        @keyframes petalFallDriftR {
          0% {
            top: -5%;
            transform: translateX(0px) rotate(15deg) scale(0.85);
            opacity: 0;
          }
          6% {
            opacity: 0.92;
          }
          25% {
            top: 42%;
            transform: translateX(28px) rotate(160deg) scale(1.02);
            opacity: 0.88;
          }
          46% {
            top: var(--land-top, 91%);
            transform: translateX(42px) rotate(320deg) scale(0.9);
            opacity: 0.88;
          }
          51% {
            top: var(--land-top, 91%);
            transform: translateX(40px) rotate(322deg) scaleY(0.45) scaleX(0.95);
            opacity: 0.85;
          }
          /* 落地后安静留存在地板/案面上约 3.5 秒 */
          78% {
            top: var(--land-top, 91%);
            transform: translateX(40px) rotate(322deg) scaleY(0.45) scaleX(0.95);
            opacity: 0.85;
          }
          100% {
            top: var(--land-top, 91%);
            transform: translateX(40px) rotate(322deg) scaleY(0.45) scaleX(0.95);
            opacity: 0;
          }
        }

        /* 4. 逆风向左缓步漂移 ➔ 触地平铺留存 ➔ 渐渐消散 */
        @keyframes petalFallDriftL {
          0% {
            top: -5%;
            transform: translateX(0px) rotate(-10deg) scale(0.85);
            opacity: 0;
          }
          6% {
            opacity: 0.92;
          }
          25% {
            top: 41%;
            transform: translateX(-24px) rotate(-170deg) scale(0.98);
            opacity: 0.88;
          }
          46% {
            top: var(--land-top, 90%);
            transform: translateX(-36px) rotate(-340deg) scale(0.9);
            opacity: 0.88;
          }
          51% {
            top: var(--land-top, 90%);
            transform: translateX(-34px) rotate(-342deg) scaleY(0.45) scaleX(0.95);
            opacity: 0.85;
          }
          /* 落地后安静留存在地板/案面上约 3.5 秒 */
          78% {
            top: var(--land-top, 90%);
            transform: translateX(-34px) rotate(-342deg) scaleY(0.45) scaleX(0.95);
            opacity: 0.85;
          }
          100% {
            top: var(--land-top, 90%);
            transform: translateX(-34px) rotate(-342deg) scaleY(0.45) scaleX(0.95);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
