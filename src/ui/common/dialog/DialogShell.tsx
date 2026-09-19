/**
 * @file DialogShell.tsx
 * @description 通用弹窗外壳：遮罩、面板、头部、动画与关闭交互。
 *
 * 内容组件只承担自身业务，不感知遮罩与层级；
 * 通过 `useDialogContext()` 可取到 close / update，与 Vue 版 `provide: { dialog }` 等价。
 */
import React, { createContext, useContext, useMemo } from 'react';
import { updateDialog } from './dialogStore';
import type { DialogEntry } from './types';

export interface DialogContextValue {
  id: number;
  /** 关闭当前弹窗，可携带结果 */
  close: (result?: unknown) => void;
  /** 更新当前弹窗的 props */
  update: (props: Record<string, unknown>) => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

/** 在弹窗内容中获取弹窗自身控制句柄 */
export const useDialogContext = (): DialogContextValue => {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error('useDialogContext 只能在弹窗内容组件内部使用');
  }
  return ctx;
};

export interface DialogShellProps {
  entry: DialogEntry;
  onClose: () => void;
  children: React.ReactNode;
}

export const DialogShell: React.FC<DialogShellProps> = ({ entry, onClose, children }) => {
  const { options } = entry;
  const isDrawer = options.variant === 'drawer';
  const widthStyle = options.width ? { width: options.width, maxWidth: '100%' } : undefined;

  const ctx = useMemo<DialogContextValue>(
    () => ({
      id: entry.id,
      close: onClose as DialogContextValue['close'],
      update: (props: Record<string, unknown>) => updateDialog(entry.id, props),
    }),
    [entry.id, onClose]
  );

  // 组件自带完整遮罩与面板时，系统只管理生命周期
  if (options.shell === false) {
    return <DialogContext.Provider value={ctx}>{children}</DialogContext.Provider>;
  }

  // 未显式指定宽度时给一个通用上限，避免内容 w-full 撑满整屏
  const defaultWidthCls = options.width ? '' : 'max-w-2xl';

  const shellCls = isDrawer
    ? 'relative flex flex-col h-full bg-[#1c1917]/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] border-l border-amber-500/40 text-stone-200 animate-in slide-in-from-right duration-300'
    : `relative flex flex-col w-full ${defaultWidthCls} max-h-[86vh] rounded-3xl bg-[#1c1917]/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-amber-500/50 ring-1 ring-amber-400/20 text-stone-200 animate-in fade-in zoom-in-95 duration-200 ${options.className ?? ''}`;

  return (
    <DialogContext.Provider value={ctx}>
      <div
        className={`fixed inset-0 z-[100] flex ${isDrawer ? 'justify-end' : 'items-center justify-center p-4'}`}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in"
          onClick={() => {
            if (options.closeOnBackdrop !== false) onClose();
          }}
        />
        <div className={shellCls} style={widthStyle}>
          {options.title && (
            <div className="flex items-start justify-between gap-3 px-5 py-3 border-b border-amber-500/30 shrink-0">
              <div className="min-w-0">
                <h3 className="font-serif text-base font-semibold text-amber-100 truncate">
                  {options.title}
                </h3>
                {options.subtitle && (
                  <p className="mt-0.5 text-[11px] text-stone-400 truncate">{options.subtitle}</p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="关闭"
                className="shrink-0 text-stone-400 hover:text-amber-200 text-lg leading-none p-1 rounded-full hover:bg-stone-800/80 transition-colors"
              >
                ✕
              </button>
            </div>
          )}
          <div className="flex-1 min-h-0 overflow-y-auto">{children}</div>
        </div>
      </div>
    </DialogContext.Provider>
  );
};
