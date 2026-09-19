/**
 * @file openOfferingDialogs.ts
 * @description 供品（献花 / 供果 / 祈愿）弹窗的打开入口。
 *
 * 约定：数据由页面持有并通过 props 传入，面板修改后通过回调写回页面；
 * props 类型直接从面板组件派生，新增/修改面板参数无需在此重复声明。
 */
import type { ComponentProps } from 'react';
import { openDialog } from '../../ui/dialog';
import { FlowerOfferingPanel } from './FlowerOfferingPanel';
import { FruitOfferingPanel } from './FruitOfferingPanel';
import { BlessingPanel } from './BlessingPanel';

export const openFlowerOffering = (
  props: ComponentProps<typeof FlowerOfferingPanel>
) => openDialog(FlowerOfferingPanel, props, { width: '34rem' });

export const openFruitOffering = (
  props: ComponentProps<typeof FruitOfferingPanel>
) => openDialog(FruitOfferingPanel, props, { width: '44rem' });

export const openBlessing = (props: ComponentProps<typeof BlessingPanel>) =>
  openDialog(BlessingPanel, props, { title: '写下祈愿与心声', width: '30rem' });
