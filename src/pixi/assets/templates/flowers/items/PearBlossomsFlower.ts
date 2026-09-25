/**
 * 【晴雪梨花】
 * 骨：乌褐细木枝挺而多折，枝端呈扇形分叉，主次枝逐级收尖。
 * 肉：雪白圆瓣成小簇，花盘比杏花更开阔，瓣缘轻薄而不透明。
 * 神：深紫近黑花药是辨识核心，青萼、嫩叶与白花相互映衬。
 * 韵：白多而不满，枝间留空如一树晴雪，清明、冷静、克制。
 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'pearBlossoms', form: 'pear', layout: 'branch', leafShape: 'broad',
  primary: '#ffffff', secondary: '#f1f5f9', center: '#4c1d2f',
  agedPrimary: '#ded4c2', agedSecondary: '#c9c0ad', stem: '#493125', agedStem: '#30231c',
  leaf: '#4d7c0f', agedLeaf: '#62553b',
  woodyBranches: [
    { d: 'M75 128 L76 103 L73 78', width: 2.38 },
    { d: 'M73 78 L78 53 L72 29', width: 1.7 },
    { d: 'M72 29 L75 2 L68 -28', width: 1.06 },
    { d: 'M73 78 L55 61 L37 44 L20 21', width: 1.5 },
    { d: 'M78 53 L96 39 L115 21', width: 1.32 },
    { d: 'M72 29 L90 12 L104 -11', width: 1.08 },
    { d: 'M75 2 L58 -12 L47 -34', width: .92 },
    { d: 'M76 103 L95 88 L116 79', width: 1.15 },
    { d: 'M68 -28 L62 -38 M68 -28 L75 -37', width: .62 },
    { d: 'M20 21 L13 14 M20 21 L11 24', width: .56 },
    { d: 'M115 21 L123 15 M115 21 L125 25', width: .54 },
  ],
  woodyKnots: [
    { x: 76, y: 103, rx: 2.65, ry: 1.5, rotate: -6 },
    { x: 73, y: 78, rx: 2.35, ry: 1.35, rotate: 18 },
    { x: 78, y: 53, rx: 2.05, ry: 1.2, rotate: -19 },
    { x: 72, y: 29, rx: 1.8, ry: 1.05, rotate: 22 },
  ],
  leafPoints: [
    { x: 95, y: 88, rotate: 58, scale: .6 },
    { x: 55, y: 61, rotate: -58, scale: .52 },
    { x: 96, y: 39, rotate: 62, scale: .48 },
    { x: 58, y: -12, rotate: -48, scale: .4 },
  ],
  blooms: [
    { x: 47, y: -34, scale: .76, rotate: -25, threshold: .5, stage: 'half', facing: 'side' },
    { x: 68, y: -28, scale: .96, rotate: -8, threshold: .42, stage: 'open', facing: 'front' },
    { x: 115, y: 21, scale: 1.04, rotate: 23, threshold: .34, stage: 'open', facing: 'three_quarter' },
    { x: 20, y: 21, scale: .86, rotate: -34, threshold: .26, stage: 'open', facing: 'back' },
    { x: 37, y: 44, scale: .7, rotate: -22, threshold: .18, stage: 'half', facing: 'three_quarter' },
    { x: 104, y: -11, scale: .45, rotate: 18, threshold: .1, stage: 'bud', facing: 'side' },
    { x: 116, y: 79, scale: .4, rotate: 42, threshold: .05, stage: 'bud', facing: 'back' },
    { x: 73, y: 78, scale: .82, rotate: -2, threshold: .3, stage: 'open', facing: 'front' },
    { x: 78, y: 53, scale: .7, rotate: 8, threshold: .2, stage: 'half', facing: 'side' },
    { x: 59, y: -24, scale: .76, rotate: -26, threshold: .26, stage: 'open', facing: 'three_quarter' },
    { x: 75, y: -22, scale: .7, rotate: 14, threshold: .18, stage: 'open', facing: 'side' },
    { x: 107, y: 17, scale: .82, rotate: -9, threshold: .24, stage: 'open', facing: 'front' },
    { x: 121, y: 29, scale: .72, rotate: 42, threshold: .16, stage: 'half', facing: 'three_quarter' },
    { x: 27, y: 17, scale: .76, rotate: -5, threshold: .2, stage: 'open', facing: 'three_quarter' },
    { x: 17, y: 30, scale: .66, rotate: -48, threshold: .13, stage: 'half', facing: 'side' },
  ],
};

export const PEAR_BLOSSOM_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .78 });
export const renderPearBlossomsFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
