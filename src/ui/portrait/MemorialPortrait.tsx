/**
 * @file MemorialPortrait.tsx
 * @description 纪念遗像框与贡香环绕组件，支持自定义姓名生卒年与照片上传。
 */
import React, { useState } from 'react';
import { MemorialInfo } from '../../types';
import { Camera, Edit3 } from 'lucide-react';
import { sound } from '../../utils/audio';
import { MemorialEditModal } from '../settings/MemorialEditModal';

export interface MemorialPortraitProps {
  info: MemorialInfo;
  onUpdateInfo: (updated: Partial<MemorialInfo>) => void;
  sunlightIntensity: number;
  timeOfDay: 'day' | 'sunset' | 'night';
}

export type PortraitFrameProps = MemorialPortraitProps;

export const MemorialPortrait: React.FC<MemorialPortraitProps> = ({
  info,
  onUpdateInfo,
  sunlightIntensity,
  timeOfDay,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          sound.playWoodPlacement();
          setIsModalOpen(true);
        }}
        className="group relative flex flex-col items-center cursor-pointer select-none transition-transform hover:scale-[1.02] active:scale-95"
        title="点击更换照片或编辑标题寄语"
      >
        {/* Golden Aura behind portrait (Zero blur penalty) */}
        <div
          className="absolute -inset-4 rounded-full pointer-events-none transition-opacity duration-700"
          style={{
            background: timeOfDay === 'night'
              ? 'radial-gradient(circle, rgba(240, 200, 120, 0.25) 0%, rgba(200, 150, 50, 0.1) 45%, transparent 70%)'
              : 'radial-gradient(circle, rgba(255, 230, 150, 0.45) 0%, rgba(255, 190, 80, 0.18) 45%, rgba(255, 180, 50, 0.05) 65%, transparent 80%)',
            opacity: 0.6 + (Number(sunlightIntensity) || 0) * 0.4,
          }}
        />

        {/* Circular Golden Filigree Ring with GPU layer promotion */}
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-0 w-full h-full animate-[spin_120s_linear_infinite]"
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
          >
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f5e1a4" />
                <stop offset="35%" stopColor="#d8b168" />
                <stop offset="70%" stopColor="#efd595" />
                <stop offset="100%" stopColor="#b6893e" />
              </linearGradient>
            </defs>

            <circle cx="100" cy="100" r="95" fill="none" stroke="url(#goldGradient)" strokeWidth="1.2" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="91" fill="none" stroke="url(#goldGradient)" strokeWidth="1" />

            {/* 12-petal mandala loops */}
            {Array.from({ length: 12 }).map((_, i) => (
              <g key={i} transform={`rotate(${i * 30} 100 100)`}>
                <path
                  d="M 100 9 C 94 22, 90 32, 100 42 C 110 32, 106 22, 100 9 Z"
                  fill="none"
                  stroke="url(#goldGradient)"
                  strokeWidth="1.2"
                />
                <circle cx="100" cy="13" r="2.2" fill="url(#goldGradient)" />
                <circle cx="100" cy="30" r="1.5" fill="url(#goldGradient)" />
              </g>
            ))}

            <circle cx="100" cy="100" r="69" fill="none" stroke="url(#goldGradient)" strokeWidth="2.5" />
            <circle cx="100" cy="100" r="66" fill="none" stroke="#fff8e7" strokeWidth="0.8" opacity="0.8" />
          </svg>

          {/* Portrait Photo Container */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-inner border border-amber-100/60 bg-amber-50">
            <img
              src={info.photoUrl}
              alt={info.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter contrast-[1.03] brightness-[1.02]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80';
              }}
            />
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_12px_rgba(140,100,50,0.25)] pointer-events-none" />

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[11px] gap-1">
              <Camera size={18} className="text-amber-200" />
              <span>更换像容</span>
            </div>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="mt-2.5 flex flex-col items-center text-center">
          <div className="flex items-center gap-1">
            <h1
              className="text-xl sm:text-2xl font-serif tracking-[0.28em] font-normal"
              style={{
                color: timeOfDay === 'night' ? '#e2e8f0' : '#453225',
                textShadow: timeOfDay === 'night' ? '0 1px 4px rgba(0,0,0,0.8)' : '0 1px 2px rgba(255,255,255,0.7)',
              }}
            >
              {info.title}
            </h1>
            <Edit3 size={13} className="text-amber-700/60 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <p
            className="text-[11px] sm:text-xs tracking-wider uppercase font-light mt-0.5"
            style={{
              color: timeOfDay === 'night' ? '#94a3b8' : '#7d6856',
            }}
          >
            {info.subtitle}
          </p>
        </div>
      </div>

      {isModalOpen && (
        <MemorialEditModal
          isOpen
          onClose={() => setIsModalOpen(false)}
          info={info}
          onUpdateInfo={onUpdateInfo}
        />
      )}
    </>
  );
};

export const PortraitFrame = MemorialPortrait;
