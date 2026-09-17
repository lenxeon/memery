/**
 * @file types.ts
 * @description 供果盘数据类型定义（纯 TypeScript）。
 */
import { FruitType } from '../../../../types';

export interface FruitItemModule {
  id: FruitType;
  title: string;
  nextName: string;
  renderDefs: () => string;
  renderContent: () => string;
}
