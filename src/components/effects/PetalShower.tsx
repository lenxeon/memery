/**
 * @file PetalShower.tsx
 * @description 漫天花瓣飘落全屏特效组件，烘托祭拜思念氛围。
 */
import React, { useEffect, useState } from 'react';

interface Petal {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
  speed: number;
  drift: number;
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
    const newPetals: Petal[] = Array.from({ length: 24 }).map((_, i) => ({
      id: Date.now() + i,
      x: 20 + Math.random() * 60, // 20% to 80% screen width
      y: -5 - Math.random() * 20,
      size: 10 + Math.random() * 12,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 0.6 + Math.random() * 0.8,
      drift: (Math.random() - 0.5) * 1.5,
      opacity: 0.75 + Math.random() * 0.25,
    }));

    setPetals(newPetals);

    const timer = setTimeout(() => {
      setPetals([]);
    }, 4500);

    return () => clearTimeout(timer);
  }, [activeTrigger, flowerType]);

  if (petals.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-35 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute transition-all duration-3000 ease-out"
          style={{
            left: `${petal.x}%`,
            top: '85%',
            transform: `rotate(${petal.rotation + 180}deg)`,
            opacity: 0,
            animation: `petalFall 4.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
            animationDelay: `${Math.random() * 0.6}s`,
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
        @keyframes petalFall {
          0% {
            top: -5%;
            transform: translateX(0px) rotate(0deg) scale(0.8);
            opacity: 0.9;
          }
          50% {
            transform: translateX(15px) rotate(180deg) scale(1);
            opacity: 0.85;
          }
          100% {
            top: 78%;
            transform: translateX(-15px) rotate(360deg) scale(0.9);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
