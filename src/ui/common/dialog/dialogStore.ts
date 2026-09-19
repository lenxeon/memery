/**
 * @file dialogStore.ts
 * @description 弹窗栈的外部状态与命令式 API。
 *
 * 与 React 树解耦：任何模块（包括非组件代码）都可 `openDialog(Component, props, options)`，
 * 无需在使用处声明 isOpen 状态、也无需在 JSX 里挂载节点。
 */
import type { ComponentType } from 'react';
import type { DialogEntry, DialogHandle, DialogOptions } from './types';

let seq = 0;
let entries: DialogEntry[] = [];
const listeners = new Set<() => void>();

const emit = (): void => {
  listeners.forEach((listener) => listener());
};

/** 订阅弹窗栈变化（供 useSyncExternalStore 使用） */
export const subscribeDialogs = (listener: () => void): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/** 当前弹窗栈快照（引用稳定，仅在变更时替换） */
export const getDialogs = (): DialogEntry[] => entries;

const removeEntry = (id: number, result?: unknown): void => {
  const entry = entries.find((item) => item.id === id);
  if (!entry) return;
  entries = entries.filter((item) => item.id !== id);
  emit();
  entry.options.onClose?.(result);
};

/**
 * 打开一个弹窗。
 * @param component 内容组件（接收 props 与注入的 onClose）
 * @param props 传给内容组件的 props
 * @param options 弹窗外壳与生命周期配置
 */
export const openDialog = (
  component: ComponentType<any>,
  props: Record<string, unknown> = {},
  options: DialogOptions = {}
): DialogHandle => {
  const id = ++seq;
  const entry: DialogEntry = { id, component, props, options };
  entries = [...entries, entry];
  emit();

  return {
    id,
    close: (result?: unknown) => removeEntry(id, result),
    update: (next: Record<string, unknown>) => {
      entries = entries.map((item) =>
        item.id === id ? { ...item, props: { ...item.props, ...next } } : item
      );
      emit();
    },
  };
};

/** 更新指定弹窗的 props */
export const updateDialog = (id: number, props: Record<string, unknown>): void => {
  entries = entries.map((item) =>
    item.id === id ? { ...item, props: { ...item.props, ...props } } : item
  );
  emit();
};

/** 关闭指定弹窗 */
export const closeDialog = (id: number, result?: unknown): void => {
  removeEntry(id, result);
};

/** 关闭最上层弹窗 */
export const closeTopDialog = (): void => {
  const top = entries[entries.length - 1];
  if (top) removeEntry(top.id);
};

/** 关闭全部弹窗 */
export const closeAllDialogs = (): void => {
  const closing = entries;
  entries = [];
  emit();
  closing.forEach((entry) => entry.options.onClose?.());
};
