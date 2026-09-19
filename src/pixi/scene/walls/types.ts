/**
 * @file types.ts
 * @description 背景墙场景元素的参数与模块契约。
 *
 * 背景墙属于空间场景层，一律以纯 TS 实现：风格模块返回 SVG / HTML 字符串，
 * 由 WallScene 注入容器，不依赖 React。
 */
import { WallBackgroundStyle, TimeOfDay } from '../../../types';

export interface WallAmbiance {
  halo: string;
  nicheBevel: string;
  archBorder: string;
  archInner: string;
  mullion: string;
  sunOrb: string;
}

export interface WallStyleProps {
  masterOn?: boolean;
  sunlightIntensity: number;
  timeOfDay: TimeOfDay;
  sunAngle: number;
  ambiance: WallAmbiance;
}

/** 背景墙风格模块：以字符串形式提供画面内容，由场景层统一注入 */
export interface WallComponentModule {
  id: WallBackgroundStyle;
  name: string;
  poeticTitle: string;
  getAmbiance: (timeOfDay: TimeOfDay, masterOn: boolean) => WallAmbiance;
  /** 主体画面（SVG 片段） */
  renderContent: (props: WallStyleProps) => string;
  /** 渐变与图案定义（SVG <defs> 片段） */
  renderDefs?: (props: { timeOfDay: TimeOfDay; masterOn?: boolean }) => string;
  /** 附加环境层（HTML 片段，如背景纹理铺底） */
  renderEnvironment?: (props: WallStyleProps) => string;
}
