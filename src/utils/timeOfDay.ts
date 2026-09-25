/**
 * @file timeOfDay.ts
 * @description 依据本机系统时间推算自然天色时辰（供"时间跟随系统"模式使用）。
 */

import { TimeOfDay } from '../types';

/** 时段划分（本地时间，24h 制）：白昼 6:00–16:59 / 黄昏 17:00–18:59 / 夜色 19:00–5:59 */
export const SUNSET_START_HOUR = 17;
export const NIGHT_START_HOUR = 19;
export const DAY_START_HOUR = 6;

export const resolveSystemTimeOfDay = (date: Date = new Date()): TimeOfDay => {
  const h = date.getHours();
  if (h >= SUNSET_START_HOUR && h < NIGHT_START_HOUR) return 'sunset';
  if (h >= NIGHT_START_HOUR || h < DAY_START_HOUR) return 'night';
  return 'day';
};

export const TIME_OF_DAY_LABEL: Record<TimeOfDay, string> = {
  day: '白昼晨辉',
  sunset: '暖调黄昏',
  night: '静谧微夜',
};

/** 格式化为 HH:MM（本地时间） */
export const formatClock = (date: Date = new Date()): string =>
  `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
