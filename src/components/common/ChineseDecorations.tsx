/**
 * @file ChineseDecorations.tsx
 * @description 中式古典装饰微组件库：
 * 包含四角万字回纹角花、祥云分界饰线、朱砂御印等东方传统雅意元素。
 */
import React from 'react';

/**
 * 东方古风四角回纹角花 (Wanzi / Meander Corner Ornaments)
 */
export const ChineseCornerOrnaments: React.FC<{ className?: string }> = ({
  className = 'text-amber-400/60',
}) => (
  <>
    {/* 左上角花 */}
    <svg
      className={`absolute top-2 left-2 w-4 h-4 pointer-events-none ${className}`}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
    >
      <path d="M 2 12 L 2 2 L 12 2 M 5 2 L 5 5 L 2 5 M 2 8 L 8 8 L 8 2" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

    {/* 右上角花 */}
    <svg
      className={`absolute top-2 right-2 w-4 h-4 pointer-events-none ${className}`}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
    >
      <path d="M 18 12 L 18 2 L 8 2 M 15 2 L 15 5 L 18 5 M 18 8 L 12 8 L 12 2" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

    {/* 左下角花 */}
    <svg
      className={`absolute bottom-2 left-2 w-4 h-4 pointer-events-none ${className}`}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
    >
      <path d="M 2 8 L 2 18 L 12 18 M 5 18 L 5 15 L 2 15 M 2 12 L 8 12 L 8 18" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

    {/* 右下角花 */}
    <svg
      className={`absolute bottom-2 right-2 w-4 h-4 pointer-events-none ${className}`}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
    >
      <path d="M 18 8 L 18 18 L 8 18 M 15 18 L 15 15 L 18 15 M 18 12 L 12 12 L 12 18" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </>
);

/**
 * 祥云如意中式金线分割条 (Auspicious Cloud Divider)
 */
export const ChineseCloudDivider: React.FC<{ title?: string; className?: string }> = ({
  title,
  className = 'my-3',
}) => (
  <div className={`flex items-center gap-3 opacity-90 ${className}`}>
    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-amber-500/70" />
    <div className="flex items-center gap-1.5 text-[11px] font-serif tracking-widest text-amber-300 shrink-0">
      <span className="text-amber-400 text-xs">❖</span>
      {title && <span className="font-medium">{title}</span>}
      <span className="text-amber-400 text-xs">❖</span>
    </div>
    <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-amber-500/40 to-amber-500/70" />
  </div>
);

/**
 * 朱砂古典印章徽标 (Cinnabar Red Seal Badge)
 */
export const CinnabarSealBadge: React.FC<{ text: string; className?: string }> = ({
  text,
  className = '',
}) => (
  <span
    className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-serif 
               bg-gradient-to-br from-red-700 via-red-800 to-red-950 text-amber-100 
               border border-amber-400/50 shadow-xs tracking-wider shrink-0 ${className}`}
  >
    {text}
  </span>
);
