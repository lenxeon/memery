/**
 * @file TopBar.tsx
 * @description 馆空间顶栏：品牌与《暖念》初心入口、登录入口、自然光照总闸、时辰快捷切换、音效与设置。
 *
 * 纯受控组件：光照与音效状态全部由外部注入，交互经回调上抛。
 * （堂轩名录入口、用户档案胶囊与「案台材质」快捷审计按钮已按设计移除）
 */
import React from 'react';
import { LightingSettings, TimeOfDay, UserProfile } from '../../../types';
import { sound } from '../../../utils/audio';
import { openAgreement } from '../../agreement';
import {
  Sun,
  Moon,
  Sunset,
  Power,
  Volume2,
  VolumeX,
  SlidersHorizontal,
  User,
} from 'lucide-react';

export interface TopBarProps {
  /** 当前登录用户（未登录为 null） */
  currentUser: UserProfile | null;
  /** 请求进入登录页 */
  onRequestAuth: () => void;
  lighting: LightingSettings;
  onUpdateLighting: (patch: Partial<LightingSettings>) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  /** 打开氛围设置抽屉 */
  onOpenSettings: () => void;
}

/** 时辰快捷按钮：白昼 / 黄昏 / 静夜 */
const TIME_PRESETS: { id: TimeOfDay; icon: React.ReactNode; bell: number; title: string }[] = [
  { id: 'day', icon: <Sun size={14} />, bell: 480, title: '白昼晨光' },
  { id: 'sunset', icon: <Sunset size={14} />, bell: 440, title: '黄昏暖阳' },
  { id: 'night', icon: <Moon size={14} />, bell: 390, title: '静谧微夜' },
];

export const TopBar: React.FC<TopBarProps> = ({
  currentUser,
  onRequestAuth,
  lighting,
  onUpdateLighting,
  soundEnabled,
  onToggleSound,
  onOpenSettings,
}) => {
  const toggleMasterLight = () => {
    const next = !lighting.masterOn;
    sound.playBell(next ? 520 : 380, 2);
    onUpdateLighting({ masterOn: next });
  };

  const pickTimeOfDay = (timeOfDay: TimeOfDay, bell: number) => {
    sound.playBell(bell, 2);
    onUpdateLighting({ timeOfDay, timeMode: 'fixed' });
  };

  const timePresetClass = (id: TimeOfDay, activeClass: string) =>
    `p-1.5 rounded-full transition-colors ${
      lighting.timeOfDay === id ? activeClass : 'text-stone-500 hover:text-stone-800'
    }`;

  return (
    <header className="relative z-30 w-full max-w-5xl pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] pt-[calc(0.75rem+env(safe-area-inset-top,0px))] sm:pt-[calc(1rem+env(safe-area-inset-top,0px))] flex items-center justify-between pointer-events-auto">
      {/* Left: App Brand, Quick Agreement Link & User Login */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={openAgreement}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1917]/90 backdrop-blur-md border border-amber-500/40 shadow-xs text-xs text-amber-200 hover:bg-stone-900 transition-all cursor-pointer group select-none"
          title="查看《暖念》立意初心、社会价值与服务声明"
        >
          <span className="font-serif font-bold tracking-widest text-amber-100 group-hover:text-amber-200 text-xs sm:text-sm">
            暖念
          </span>
        </button>

        {/* 登录入口（已登录后顶栏不再展示个人档案胶囊） */}
        {!currentUser && (
          <button
            type="button"
            onClick={() => {
              sound.playWoodPlacement();
              onRequestAuth();
            }}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 border border-amber-400/60 shadow-xs text-xs text-stone-950 font-bold transition-all cursor-pointer active:scale-95 whitespace-nowrap"
            title="开启暖念心灯档案 · 登录与注册"
          >
            <User size={12} className="stroke-[2.5]" />
            <span>登录 / 注册</span>
          </button>
        )}
      </div>

      {/* Quick controls on right */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Master Light switch */}
        <button
          type="button"
          onClick={toggleMasterLight}
          title={lighting.masterOn ? '点击关闭自然光照' : '点击开启自然光照'}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-xs cursor-pointer whitespace-nowrap ${
            lighting.masterOn
              ? 'bg-amber-100/90 hover:bg-amber-200/90 text-amber-900 border border-amber-300/80'
              : 'bg-stone-800 text-stone-300 border border-stone-700'
          }`}
        >
          <Power size={13} className={lighting.masterOn ? 'text-amber-600' : 'text-stone-400'} />
          <span className="hidden sm:inline">{lighting.masterOn ? '日照开' : '烛夜暗'}</span>
        </button>

        {/* Time presets quick switch */}
        <div className="hidden sm:flex items-center bg-white/90 rounded-full p-0.5 border border-amber-200/60 shadow-xs text-xs">
          {TIME_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => pickTimeOfDay(preset.id, preset.bell)}
              className={timePresetClass(
                preset.id,
                preset.id === 'day'
                  ? 'bg-amber-200/80 text-amber-900'
                  : preset.id === 'sunset'
                  ? 'bg-orange-200/80 text-orange-900'
                  : 'bg-slate-700 text-indigo-300'
              )}
              title={preset.title}
            >
              {preset.icon}
            </button>
          ))}
        </div>

        {/* Sound toggle */}
        <button
          type="button"
          onClick={onToggleSound}
          title={soundEnabled ? '静音' : '开启颂钵音效'}
          className="p-1.5 sm:p-2 rounded-full bg-white/90 border border-amber-200/60 text-stone-700 hover:bg-white shadow-xs cursor-pointer transition-colors"
        >
          {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} className="text-stone-400" />}
        </button>

        {/* Detailed Ambiance & Music panel button */}
        <button
          type="button"
          onClick={onOpenSettings}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/90 border border-amber-200/60 text-stone-700 hover:bg-white shadow-xs text-xs cursor-pointer transition-colors whitespace-nowrap"
          title="设置：背景风格、光影、禅意背景音乐、桌布等"
        >
          <SlidersHorizontal size={13} className="text-amber-700" />
          <span className="hidden sm:inline font-medium">设置</span>
        </button>
      </div>
    </header>
  );
};
