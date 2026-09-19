/**
 * @file openRelicCodex.ts
 * @description 典藏图鉴的命令式打开入口。
 */
import { openDialog } from '../common/dialog';
import { RelicCodexPanel } from './RelicCodexPanel';

export const openRelicCodex = (): void => {
  openDialog(RelicCodexPanel, {}, { width: '48rem' });
};
