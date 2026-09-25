/**
 * 【垂丝海棠】
 * 骨：木质主枝仍瘦硬有节，细末梢略向下垂，区别于梅桃的上挑枝势。
 * 肉：浅粉五瓣与深粉花苞并置，花瓣柔润，短垂梗从枝端生出。
 * 神：花苞深、盛花浅，数朵同枝却大小朝向不同，嫩叶只作点睛。
 * 韵：枝硬花柔、上实下虚，呈花中神仙的含情与垂丝之美。
 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'crabappleBlossoms', form: 'crabapple', layout: 'branch', leafShape: 'serrated',
  primary: '#fb7185', secondary: '#fce7f3', center: '#9f1239',
  agedPrimary: '#b97572', agedSecondary: '#ddc6b7', stem: '#563126', agedStem: '#34231b',
  leaf: '#3f7d36', agedLeaf: '#67573c',
  woodyBranches: [
    { d: 'M75 128 L73 103 L77 79', width: 2.32 },
    { d: 'M77 79 L70 56 L76 31', width: 1.68 },
    { d: 'M76 31 L68 4 L73 -22', width: 1.04 },
    { d: 'M77 79 L94 63 L111 48', width: 1.42 },
    { d: 'M111 48 Q113 61 116 72', width: .48 },
    { d: 'M111 48 Q106 57 106 66', width: .44 },
    { d: 'M111 48 Q121 53 124 64', width: .42 },
    { d: 'M70 56 L53 43 L34 32', width: 1.2 },
    { d: 'M34 32 Q26 45 28 61', width: .46 },
    { d: 'M34 32 Q37 47 36 60', width: .42 },
    { d: 'M34 32 Q22 49 22 68', width: .4 },
    { d: 'M76 31 L94 16 L111 0', width: 1.03 },
    { d: 'M111 0 Q121 15 118 31', width: .44 },
    { d: 'M111 0 Q109 14 109 27', width: .4 },
    { d: 'M111 0 Q124 10 123 23', width: .38 },
    { d: 'M73 103 L57 91 L43 82', width: 1.12 },
    { d: 'M68 4 L57 -9', width: .7 },
    { d: 'M73 -22 L68 -32 M73 -22 L80 -30', width: .61 },
    { d: 'M116 72 L111 80 M116 72 L122 78', width: .55 },
    { d: 'M28 61 L21 68 M28 61 L34 69', width: .52 },
  ],
  woodyKnots: [
    { x: 73, y: 103, rx: 2.55, ry: 1.45, rotate: 7 },
    { x: 77, y: 79, rx: 2.3, ry: 1.3, rotate: -18 },
    { x: 70, y: 56, rx: 2, ry: 1.15, rotate: 20 },
    { x: 76, y: 31, rx: 1.75, ry: 1, rotate: -22 },
  ],
  leafPoints: [
    { x: 57, y: 91, rotate: -64, scale: .55 },
    { x: 94, y: 63, rotate: 62, scale: .48 },
    { x: 53, y: 43, rotate: -55, scale: .45 },
    { x: 94, y: 16, rotate: 56, scale: .38 },
    { x: 82, y: 28, rotate: 48, scale: .34 },
    { x: 64, y: 7, rotate: -48, scale: .3 },
  ],
  blooms: [
    { x: 73, y: -22, scale: .8, rotate: -5, threshold: .5, variant: 1, stage: 'open', facing: 'three_quarter' },
    { x: 116, y: 72, scale: .9, rotate: 15, threshold: .43, stage: 'open', facing: 'front' },
    { x: 106, y: 66, scale: .72, rotate: -18, threshold: .36, variant: 1, stage: 'half', facing: 'three_quarter' },
    { x: 124, y: 64, scale: .48, rotate: 32, threshold: .18, stage: 'bud', facing: 'side' },
    { x: 28, y: 61, scale: .78, rotate: -16, threshold: .34, variant: 1, stage: 'open', facing: 'three_quarter' },
    { x: 36, y: 60, scale: .68, rotate: 12, threshold: .28, stage: 'open', facing: 'front' },
    { x: 22, y: 68, scale: .46, rotate: -30, threshold: .12, variant: 1, stage: 'bud', facing: 'side' },
    { x: 118, y: 31, scale: .78, rotate: 18, threshold: .3, stage: 'open', facing: 'three_quarter' },
    { x: 109, y: 27, scale: .62, rotate: -14, threshold: .22, variant: 1, stage: 'half', facing: 'side' },
    { x: 123, y: 23, scale: .52, rotate: 28, threshold: .1, stage: 'bud', facing: 'three_quarter' },
    { x: 43, y: 82, scale: .5, rotate: -31, threshold: .08, stage: 'bud', facing: 'side' },
  ],
};

export const CRABAPPLE_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .72 });
export const renderCrabappleBlossomsFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
