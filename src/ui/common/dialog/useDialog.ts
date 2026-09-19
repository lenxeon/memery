/**
 * @file useDialog.ts
 * @description 弹窗系统的 hook 入口，语义与命令式 API 一致，便于在组件内调用。
 */
import { useCallback } from 'react';
import type { ComponentType } from 'react';
import { openDialog, closeDialog, closeTopDialog, closeAllDialogs } from './dialogStore';
import type { DialogHandle, DialogOptions } from './types';

export interface UseDialogApi {
  /** 打开弹窗 */
  open: (
    component: ComponentType<any>,
    props?: Record<string, unknown>,
    options?: DialogOptions
  ) => DialogHandle;
  /** 关闭指定弹窗 */
  close: (id: number, result?: unknown) => void;
  /** 关闭最上层 */
  closeTop: () => void;
  /** 关闭全部 */
  closeAll: () => void;
}

export const useDialog = (): UseDialogApi => {
  const open = useCallback(
    (
      component: ComponentType<any>,
      props?: Record<string, unknown>,
      options?: DialogOptions
    ) => openDialog(component, props, options),
    []
  );

  return {
    open,
    close: closeDialog,
    closeTop: closeTopDialog,
    closeAll: closeAllDialogs,
  };
};
