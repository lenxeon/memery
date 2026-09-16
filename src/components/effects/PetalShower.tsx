/**
 * @file PetalShower.tsx
 * @description 漫天花瓣飘落全屏特效组件，烘托祭拜思念氛围。
 * 具备多向旋转（顺时针/逆时针）、多样化风向漂移与错峰步调随机感。
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

    const newPetals: Petal[] = Array.from({ length: 26 }).map((_, i) => ({
      id: Date.now() + i,
      x: 12 + Math.random() * 76, // 12% 到 88% 屏幕宽度
      size: 10 + Math.random() * 12,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: 3.6 + Math.random() * 1.6, // 3.6s ~ 5.2s 错落步调
      delay: Math.random() * 1.4,          // 0s ~ 1.4s 错峰出现
      animClass: animTypes[Math.floor(Math.random() * animTypes.length)],
      opacity: 0.78 + Math.random() * 0.22,
    }));

    setPetals(newPetals);

    const timer = setTimeout(() => {
      setPetals([]);
    }, 6600);

    return () => clearTimeout(timer);
  }, [activeTrigger, flowerType]);

  if (petals.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-35 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: '85%',
            transform: `rotate(${petal.rotation}deg)`,
            opacity: 0,
            animation: `${petal.animClass} ${petal.duration.toFixed(2)}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
            animationDelay: `${petal.delay.toFixed(2)}s`,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.4}
            viewBox="0 0 20 28"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(60,30,10,0.15))',
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
        /* 1. 顺时针旋转 + 右微摆动 */
        @keyframes petalFallCW {
          0% {
            top: -5%;
            transform: translateX(0px) rotate(0deg) scale(0.8);
            opacity: 0.9;
          }
          50% {
            transform: translateX(18px) rotate(190deg) scale(1);
            opacity: 0.85;
          }
          100% {
            top: 80%;
            transform: translateX(-12px) rotate(375deg) scale(0.9);
            opacity: 0;
          }
        }

        /* 2. 逆时针旋转 + 左微摆动 */
        @keyframes petalFallCCW {
          0% {
            top: -5%;
            transform: translateX(0px) rotate(0deg) scale(0.85);
            opacity: 0.9;
          }
          50% {
            transform: translateX(-16px) rotate(-185deg) scale(0.95);
            opacity: 0.85;
          }
          100% {
            top: 78%;
            transform: translateX(14px) rotate(-365deg) scale(0.88);
            opacity: 0;
          }
        }

        /* 3. 顺风向右斜掠漂移 + 缓旋 */
        @keyframes petalFallDriftR {
          0% {
            top: -5%;
            transform: translateX(0px) rotate(15deg) scale(0.8);
            opacity: 0.9;
          }
          50% {
            transform: translateX(28px) rotate(160deg) scale(1.05);
            opacity: 0.88;
          }
          100% {
            top: 82%;
            transform: translateX(42px) rotate(320deg) scale(0.85);
            opacity: 0;
          }
        }

        /* 4. 逆风向左缓步漂移 + 逆向翻旋 */
        @keyframes petalFallDriftL {
          0% {
            top: -5%;
            transform: translateX(0px) rotate(-10deg) scale(0.85);
            opacity: 0.9;
          }
          50% {
            transform: translateX(-24px) rotate(-170deg) scale(1);
            opacity: 0.86;
          }
          100% {
            top: 79%;
            transform: translateX(-36px) rotate(-340deg) scale(0.9);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
