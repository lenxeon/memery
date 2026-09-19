/**
 * @file openHallDialogs.ts
 * @description 堂轩（纪念馆）名录与筹建弹窗的打开入口。
 */
import type { ComponentProps } from 'react';
import { openDialog } from '../../ui/dialog';
import { HallDirectoryPanel } from './HallDirectoryPanel';
import { CreateHallPanel } from './CreateHallPanel';

export const openHallDirectory = (props: ComponentProps<typeof HallDirectoryPanel>) =>
  openDialog(HallDirectoryPanel, props, { width: '46rem', closeOnBackdrop: false });

export const openCreateHall = (props: ComponentProps<typeof CreateHallPanel>) =>
  openDialog(CreateHallPanel, props, { width: '30rem', closeOnBackdrop: false });
