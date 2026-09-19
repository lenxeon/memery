/**
 * @file openAmbianceDrawer.ts
 * @description 氛围与场景设置抽屉的打开入口（右侧抽屉形态）。
 */
import type { ComponentProps } from 'react';
import { openDialog } from '../../common/dialog';
import { AmbiancePanel } from './AmbiancePanel';

export const openAmbianceDrawer = (props: ComponentProps<typeof AmbiancePanel>) =>
  openDialog(AmbiancePanel, props, { variant: 'drawer', width: '30rem', closeOnBackdrop: true });
