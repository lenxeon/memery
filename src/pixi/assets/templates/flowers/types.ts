/**
 * @file types.ts
 * @description 花卉花瓶组件 Props 与花品纯 TypeScript 类型定义。
 */
import { VaseStyle, VaseMouthAperture } from './vases/types';

export * from './vases/types';

export interface FallingPetalDef {
  id: number;
  detachHealth: number; // 开始脱落的生机阈值
  fallSpan: number;     // 在空中下坠飘落所跨越的生机区间
  startX: number;       // 花头起始 X
  startY: number;       // 花头起始 Y
  landX: number;        // 桌面上最终着陆 X
  landY: number;        // 桌面上最终着陆 Y (靠近瓶底 y=193 案面)
  rx: number;           // 花瓣尺寸
  ry: number;
  landRot: number;      // 落地后的最终平铺旋转角度
  swayAmp: number;      // 飘落时的左右空气阻力摇曳幅度
  swayFreq: number;     // 摇曳频率
}

export interface FlowerRenderProps {
  health: number;
  dryFactor: number;
  isFaded: boolean;
  timeOfDay?: string;
  vaseStyle?: VaseStyle;
  mouthAperture?: VaseMouthAperture;
  spreadFactor?: number;
}

