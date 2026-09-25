/**
 * 【映山杜鹃】
 * 骨：灌木从瓶口丛生，多根褐色细木枝向外张开，枝端短而密。
 * 肉：漏斗形五裂花冠成簇，花瓣相连而非五片独立圆瓣。
 * 神：上瓣深红斑点、细长外伸花蕊与尖形花苞构成辨识核心。
 * 韵：花团如山霞燃开，下疏上密、红而有层次，热烈但不平均铺满。
 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'azaleas', form: 'azalea', layout: 'branch', leafShape: 'narrow',
  primary: '#f43f5e', secondary: '#f9a8d4', center: '#fde047',
  agedPrimary: '#9d554b', agedSecondary: '#c99d91', stem: '#4c3a2c', agedStem: '#382f25',
  leaf: '#3f7c42', agedLeaf: '#625c3b',
  woodyBranches: [
    { d: 'M75 128 L74 106 L76 84', width: 2.18 },
    { d: 'M76 84 L68 58 L75 24', width: 1.4 },
    { d: 'M74 106 L60 82 L47 57 L40 34', width: 1.3 },
    { d: 'M74 106 L87 83 L101 61 L110 40', width: 1.34 },
    { d: 'M68 58 L54 45 L47 31', width: .88 },
    { d: 'M76 84 L88 61 L83 25', width: .9 },
    { d: 'M47 57 L34 44', width: .72 },
    { d: 'M101 61 L116 47', width: .74 },
    { d: 'M60 82 L54 63', width: .68 },
    { d: 'M87 83 L91 65', width: .68 },
  ],
  woodyKnots: [
    { x: 74, y: 106, rx: 2.5, ry: 1.4, rotate: 5 },
    { x: 76, y: 84, rx: 2.2, ry: 1.25, rotate: -17 },
    { x: 68, y: 58, rx: 1.8, ry: 1, rotate: 18 },
  ],
  leafPoints: [
    { x: 61, y: 84, rotate: -58, scale: .5 },
    { x: 88, y: 82, rotate: 58, scale: .52 },
    { x: 54, y: 63, rotate: -62, scale: .46 },
    { x: 91, y: 65, rotate: 64, scale: .46 },
    { x: 53, y: 47, rotate: -52, scale: .42 },
    { x: 101, y: 61, rotate: 58, scale: .44 },
    { x: 70, y: 43, rotate: -38, scale: .4 },
    { x: 83, y: 42, rotate: 44, scale: .4 },
  ],
  blooms: [
    { x: 75, y: 24, scale: .9, rotate: -2, threshold: .5, stage: 'open', facing: 'front' },
    { x: 83, y: 25, scale: .78, rotate: 20, threshold: .42, variant: 1, stage: 'open', facing: 'three_quarter' },
    { x: 70, y: 32, scale: .66, rotate: -22, threshold: .32, stage: 'half', facing: 'side' },
    { x: 40, y: 34, scale: .84, rotate: -18, threshold: .4, stage: 'open', facing: 'three_quarter' },
    { x: 47, y: 31, scale: .72, rotate: 12, threshold: .3, variant: 1, stage: 'open', facing: 'front' },
    { x: 34, y: 44, scale: .54, rotate: -34, threshold: .16, stage: 'bud', facing: 'side' },
    { x: 110, y: 40, scale: .86, rotate: 18, threshold: .36, stage: 'open', facing: 'front' },
    { x: 116, y: 47, scale: .72, rotate: 34, threshold: .26, variant: 1, stage: 'open', facing: 'three_quarter' },
    { x: 103, y: 51, scale: .62, rotate: -8, threshold: .2, stage: 'half', facing: 'side' },
    { x: 54, y: 63, scale: .55, rotate: -20, threshold: .12, stage: 'bud', facing: 'three_quarter' },
    { x: 91, y: 65, scale: .58, rotate: 22, threshold: .08, stage: 'bud', facing: 'side' },
  ],
};

export const AZALEA_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .85 });
export const renderAzaleasFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
