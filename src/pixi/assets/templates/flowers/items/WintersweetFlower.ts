/**
 * 【凌寒腊梅】
 * 骨：焦褐枯枝瘦、硬、折，主干斜举，末梢二歧，不生叶。
 * 肉：蜡质金黄小花双层而紧凑，花朵直接咬在枝节，不留柔软长梗。
 * 神：琥珀暗心、半开花与尖卵花苞高低错落，寒中蓄香。
 * 韵：疏朗留白，以墨褐、蜜蜡黄为主，呈清寒孤峭之气。
 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'wintersweet', form: 'wintersweet', layout: 'branch', leafShape: 'none',
  primary: '#facc15', secondary: '#fde68a', center: '#9a3412',
  agedPrimary: '#b68a45', agedSecondary: '#d6c29b', stem: '#3f2415', agedStem: '#24160f',
  woodyBranches: [
    { d: 'M75 128 L74 108 L70 88', width: 2.25 },
    { d: 'M70 88 L75 66 L82 45', width: 1.65 },
    { d: 'M82 45 L96 22 L112 -2 L125 -28', width: 1.08 },
    { d: 'M70 88 L57 72 L43 54 L26 42', width: 1.45 },
    { d: 'M75 66 L62 52 L50 31', width: 1.2 },
    { d: 'M82 45 L99 43 L118 50', width: 1.05 },
    { d: 'M112 -2 L102 -14 L96 -31', width: .82 },
    { d: 'M96 22 L108 10', width: .72 },
    { d: 'M125 -28 L130 -37 M125 -28 L119 -38', width: .62 },
    { d: 'M26 42 L18 36 M26 42 L20 48', width: .58 },
  ],
  woodyKnots: [
    { x: 74, y: 108, rx: 2.4, ry: 1.4, rotate: -8 },
    { x: 70, y: 88, rx: 2.1, ry: 1.3, rotate: 18 },
    { x: 75, y: 66, rx: 1.9, ry: 1.15, rotate: -22 },
    { x: 82, y: 45, rx: 1.7, ry: 1, rotate: 24 },
  ],
  blooms: [
    { x: 125, y: -28, scale: .82, rotate: 31, threshold: .48, stage: 'open', facing: 'three_quarter' },
    { x: 50, y: 31, scale: .98, rotate: -20, threshold: .4, stage: 'open', facing: 'front' },
    { x: 26, y: 42, scale: .74, rotate: -34, threshold: .32, stage: 'half', facing: 'side' },
    { x: 118, y: 50, scale: .84, rotate: 34, threshold: .24, stage: 'open', facing: 'back' },
    { x: 108, y: 10, scale: .5, rotate: 23, threshold: .16, stage: 'bud', facing: 'side' },
    { x: 96, y: -31, scale: .44, rotate: -22, threshold: .08, stage: 'bud', facing: 'three_quarter' },
    { x: 96, y: 22, scale: .82, rotate: 12, threshold: .28, stage: 'open', facing: 'front' },
    { x: 43, y: 54, scale: .68, rotate: -24, threshold: .18, stage: 'half', facing: 'three_quarter' },
    { x: 57, y: 34, scale: .72, rotate: 8, threshold: .22, stage: 'open', facing: 'three_quarter' },
    { x: 44, y: 27, scale: .62, rotate: -38, threshold: .14, stage: 'half', facing: 'front' },
    { x: 101, y: 43, scale: .7, rotate: 22, threshold: .12, stage: 'open', facing: 'side' },
    { x: 78, y: 65, scale: .64, rotate: -9, threshold: .1, stage: 'open', facing: 'three_quarter' },
  ],
};

export const WINTERSWEET_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .72 });
export const renderWintersweetFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
