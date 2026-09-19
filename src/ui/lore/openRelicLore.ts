/**
 * @file openRelicLore.ts
 * @description 典故卡的命令式打开入口：任何位置（含非组件代码）都可调用。
 */
import { openDialog } from '../common/dialog';
import { RelicLorePanel } from './RelicLorePanel';

export const openRelicLore = (loreId?: string | null): void => {
  if (!loreId) return;
  openDialog(RelicLorePanel, { loreId }, { width: '36rem' });
};
