/**
 * @file types.ts
 * @description 通用弹窗系统类型定义。
 *
 * 设计目标：业务组件只关心自身内容，弹窗的挂载、卸载、遮罩、层级、
 * 键盘与滚动管理等生命周期统一由 DialogHost / DialogShell 负责。
 * 调用处只需 `dialog.open(Component, props, options)`。
 */
import type { ComponentType } from 'react';

/** 弹窗外壳形态 */
export type DialogVariant = 'modal' | 'drawer';

export interface DialogOptions {
  /** 标题；不传则不渲染头部（内容自带头部时使用） */
  title?: string;
  /** 副标题（渲染在标题下方，可省略） */
  subtitle?: string;
  /** 外壳形态：居中弹窗 / 右侧抽屉，默认 modal */
  variant?: DialogVariant;
  /**
   * 是否使用通用外壳。
   * false 表示组件自带完整遮罩与面板（渐进迁移期的兼容开关），
   * 此时系统只负责生命周期管理，不再叠加外壳。
   */
  shell?: boolean;
  /** 面板宽度（Tailwind 宽度类或任意 CSS 宽度），默认 '28rem' */
  width?: string;
  /** 点击遮罩是否关闭，默认 true */
  closeOnBackdrop?: boolean;
  /** 按下 Esc 是否关闭，默认 true */
  closeOnEsc?: boolean;
  /** 附加到面板的自定义类名 */
  className?: string;
  /** 关闭后回调，接收 close(result) 传入的结果 */
  onClose?: (result?: unknown) => void;
}

export interface DialogEntry {
  id: number;
  component: ComponentType<any>;
  props: Record<string, unknown>;
  options: DialogOptions;
}

export interface DialogHandle {
  id: number;
  /** 关闭该弹窗，可携带结果交给 options.onClose */
  close: (result?: unknown) => void;
  /** 更新已挂载弹窗的 props */
  update: (props: Record<string, unknown>) => void;
}
