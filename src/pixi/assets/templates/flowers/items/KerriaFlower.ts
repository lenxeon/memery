/**
 * 【金玉棣棠】
 * 骨：鲜绿色木质长枝从瓶口斜出后拱垂，侧生短枝逐级变细。
 * 肉：金黄重瓣花呈小型蓬松团簇，外瓣舒展、内瓣紧密卷抱。
 * 神：花朵沿拱枝侧生，锯齿嫩叶与圆花苞穿插，不作顶端花球。
 * 韵：一弧金枝轻盈探出，明丽活泼而不软弱，具有迎风弹性的春意。
 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'kerria', form: 'kerria', layout: 'branch', leafShape: 'serrated',
  primary: '#facc15', secondary: '#fef08a', center: '#d97706',
  agedPrimary: '#b18a3e', agedSecondary: '#d7c38e', stem: '#3f6b32', agedStem: '#4e412a',
  leaf: '#65a30d', agedLeaf: '#727044',
  woodyBranches: [
    { d: 'M75 128 Q67 103 63 78', width: 2.24 },
    { d: 'M63 78 Q57 52 67 34', width: 1.62 },
    { d: 'M67 34 Q83 16 104 29', width: 1.08 },
    { d: 'M104 29 Q125 43 119 70', width: .78 },
    { d: 'M63 78 Q49 66 41 53', width: 1.04 },
    { d: 'M67 34 Q54 30 45 39', width: .78 },
    { d: 'M86 22 Q90 37 91 51', width: .7 },
    { d: 'M104 29 Q111 44 109 58', width: .64 },
    { d: 'M75 103 Q89 88 86 75', width: .9 },
    { d: 'M63 78 Q55 84 54 91', width: .62 },
  ],
  woodyKnots: [
    { x: 75, y: 103, rx: 2.35, ry: 1.35, rotate: -8 },
    { x: 63, y: 78, rx: 2.1, ry: 1.2, rotate: 18 },
    { x: 67, y: 34, rx: 1.7, ry: .95, rotate: -18 },
  ],
  leafPoints: [
    { x: 68, y: 102, rotate: -52, scale: .48 },
    { x: 76, y: 88, rotate: 54, scale: .5 },
    { x: 56, y: 68, rotate: -58, scale: .46 },
    { x: 72, y: 51, rotate: 52, scale: .43 },
    { x: 50, y: 38, rotate: -54, scale: .4 },
    { x: 88, y: 23, rotate: 48, scale: .38 },
    { x: 110, y: 42, rotate: 62, scale: .36 },
    { x: 91, y: 40, rotate: -42, scale: .34 },
  ],
  blooms: [
    { x: 67, y: 34, scale: .82, rotate: -5, threshold: .48, stage: 'open', facing: 'front' },
    { x: 104, y: 29, scale: .76, rotate: 15, threshold: .4, stage: 'open', facing: 'three_quarter' },
    { x: 119, y: 70, scale: .68, rotate: 28, threshold: .32, stage: 'open', facing: 'side' },
    { x: 41, y: 53, scale: .74, rotate: -20, threshold: .36, stage: 'open', facing: 'three_quarter' },
    { x: 45, y: 39, scale: .62, rotate: -12, threshold: .25, stage: 'half', facing: 'side' },
    { x: 91, y: 51, scale: .7, rotate: 12, threshold: .28, stage: 'open', facing: 'front' },
    { x: 109, y: 58, scale: .62, rotate: 24, threshold: .2, stage: 'half', facing: 'three_quarter' },
    { x: 86, y: 75, scale: .52, rotate: 10, threshold: .12, stage: 'bud', facing: 'side' },
    { x: 54, y: 91, scale: .48, rotate: -24, threshold: .07, stage: 'bud', facing: 'three_quarter' },
  ],
};

export const KERRIA_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .75 });
export const renderKerriaFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
