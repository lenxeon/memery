/**
 * @file DialogHost.tsx
 * @description 弹窗宿主：订阅弹窗栈并渲染到 body，负责键盘与页面滚动等生命周期。
 *
 * 全应用只需挂载一次（App 根节点内），之后任何位置都可命令式打开弹窗。
 */
import React, { useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { subscribeDialogs, getDialogs, closeDialog, closeTopDialog } from './dialogStore';
import { DialogShell } from './DialogShell';

export const DialogHost: React.FC = () => {
  const entries = useSyncExternalStore(subscribeDialogs, getDialogs, getDialogs);

  // 有弹窗时锁定页面滚动
  useEffect(() => {
    if (entries.length === 0) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [entries.length]);

  // Esc 关闭最上层
  useEffect(() => {
    if (entries.length === 0) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const top = entries[entries.length - 1];
      if (top && top.options.closeOnEsc !== false) closeTopDialog();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [entries]);

  if (entries.length === 0) return null;

  return createPortal(
    <>
      {entries.map((entry) => {
        const injected = {
          ...entry.props,
          onClose: () => {
            // 内容组件显式声明的 onClose 先执行，再交给系统关闭
            const inner = entry.props.onClose;
            if (typeof inner === 'function') (inner as (...args: unknown[]) => void)();
            closeDialog(entry.id);
          },
        };
        return (
          <DialogShell key={entry.id} entry={entry} onClose={() => closeDialog(entry.id)}>
            {React.createElement(entry.component, injected)}
          </DialogShell>
        );
      })}
    </>,
    document.body
  );
};
