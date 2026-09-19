/**
 * @file LoreBadge.tsx
 * @description 「典」角标：嵌在选择卡片内，点击即弹出该物件的朝代、出处与典故。
 *
 * 用 span 而非 button，避免嵌在 button 卡片内造成非法嵌套。
 */
import React from 'react';
import { ScrollText } from 'lucide-react';
import { hasRelicLore } from '../../data/lore';
import { openRelicLore } from './openRelicLore';

export interface LoreBadgeProps {
  /** 档案 id */
  loreId?: string;
  /** 浅色卡片用 light，深色卡片用 dark */
  variant?: 'dark' | 'light';
  /** 附加类名 */
  className?: string;
}

export const LoreBadge: React.FC<LoreBadgeProps> = ({ loreId, variant = 'dark', className = '' }) => {
  if (!hasRelicLore(loreId)) return null;

  const tone =
    variant === 'light'
      ? 'bg-amber-100/90 text-amber-800 border-amber-300/70 hover:bg-amber-200/90'
      : 'bg-amber-500/15 text-amber-300 border-amber-500/40 hover:bg-amber-500/25';

  return (
    <span
      role="button"
      tabIndex={0}
      title="查看朝代、出处与典故"
      onClick={(e) => {
        e.stopPropagation();
        openRelicLore(loreId);
      }}
      onKeyDown={(e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.stopPropagation();
        openRelicLore(loreId);
      }}
      className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md border text-[10px] cursor-pointer transition-colors select-none ${tone} ${className}`}
    >
      <ScrollText size={10} />
      <span>典</span>
    </span>
  );
};
