/**
 * 【春雨杏花】
 * 骨：深褐细枝硬折向上，侧枝左右交错，老节清楚、末梢尖细。
 * 肉：五枚圆瓣比桃花更圆润，初开淡红、盛放粉白，红萼托底。
 * 神：花色由粉转白，花药细小，半开与花苞藏在枝叉处。
 * 韵：枝条清瘦、花色轻柔，如薄雾春雨中的杏林，不作艳丽花团。
 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'apricotBlossoms', form: 'apricot', layout: 'branch', leafShape: 'round',
  primary: '#fff7f5', secondary: '#f9a8b8', center: '#be123c',
  agedPrimary: '#d9cbb9', agedSecondary: '#c28f88', stem: '#583528', agedStem: '#36251d',
  leaf: '#84a941', agedLeaf: '#74613f',
  woodyBranches: [
    { d: 'M75 128 L74 106 L79 83', width: 2.32 },
    { d: 'M79 83 L76 60 L86 37', width: 1.66 },
    { d: 'M86 37 L101 14 L116 -13', width: 1.04 },
    { d: 'M79 83 L61 69 L43 51 L28 27', width: 1.48 },
    { d: 'M76 60 L62 39 L48 15', width: 1.2 },
    { d: 'M86 37 L104 42 L123 55', width: 1.08 },
    { d: 'M74 106 L56 94 L38 89', width: 1.14 },
    { d: 'M101 14 L91 2', width: .7 },
    { d: 'M116 -13 L112 -23 M116 -13 L123 -21', width: .61 },
    { d: 'M28 27 L20 20 M28 27 L19 31', width: .56 },
  ],
  woodyKnots: [
    { x: 74, y: 106, rx: 2.5, ry: 1.45, rotate: 8 },
    { x: 79, y: 83, rx: 2.25, ry: 1.3, rotate: -18 },
    { x: 76, y: 60, rx: 2, ry: 1.15, rotate: 19 },
    { x: 86, y: 37, rx: 1.75, ry: 1, rotate: -22 },
  ],
  leafPoints: [
    { x: 56, y: 94, rotate: -62, scale: .5 },
    { x: 61, y: 69, rotate: -51, scale: .45 },
    { x: 104, y: 42, rotate: 66, scale: .46 },
  ],
  blooms: [
    { x: 116, y: -13, scale: .84, rotate: 25, threshold: .48, stage: 'open', facing: 'three_quarter' },
    { x: 28, y: 27, scale: 1.02, rotate: -29, threshold: .4, stage: 'open', facing: 'front' },
    { x: 48, y: 15, scale: .74, rotate: -18, threshold: .32, stage: 'half', facing: 'side' },
    { x: 123, y: 55, scale: .88, rotate: 34, threshold: .24, stage: 'open', facing: 'back' },
    { x: 38, y: 89, scale: .54, rotate: -37, threshold: .16, stage: 'bud', facing: 'three_quarter' },
    { x: 91, y: 2, scale: .44, rotate: -11, threshold: .08, stage: 'bud', facing: 'side' },
    { x: 76, y: 60, scale: .82, rotate: 4, threshold: .3, stage: 'open', facing: 'front' },
    { x: 61, y: 69, scale: .66, rotate: -17, threshold: .2, stage: 'half', facing: 'three_quarter' },
    { x: 36, y: 24, scale: .76, rotate: 8, threshold: .25, stage: 'open', facing: 'three_quarter' },
    { x: 23, y: 34, scale: .68, rotate: -46, threshold: .18, stage: 'half', facing: 'side' },
    { x: 84, y: 56, scale: .72, rotate: 27, threshold: .22, stage: 'open', facing: 'three_quarter' },
    { x: 116, y: 51, scale: .7, rotate: 9, threshold: .15, stage: 'open', facing: 'front' },
    { x: 70, y: 67, scale: .62, rotate: -7, threshold: .12, stage: 'half', facing: 'side' },
  ],
};

export const APRICOT_BLOSSOM_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .72 });
export const renderApricotBlossomsFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
