/**
 * 【丹华山茶】
 * 骨：常绿木本深褐老枝，主干稳、侧枝短而硬，花与叶贴近枝端。
 * 肉：大而厚的红色重瓣层层抱心，瓣面有丝绒暗部与蜡质亮边。
 * 神：金蕊藏于重瓣深处，深绿锯齿蜡叶厚亮，花苞圆而紧实。
 * 韵：雪里丹华，花少而丰、叶密而沉，端庄富贵却不轻浮。
 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'camellias', form: 'camellia', layout: 'branch', leafShape: 'serrated',
  primary: '#dc2626', secondary: '#fb7185', center: '#facc15',
  agedPrimary: '#8c4036', agedSecondary: '#b77b70', stem: '#49362a', agedStem: '#332b22',
  leaf: '#14532d', agedLeaf: '#4b4a2f',
  woodyBranches: [
    { d: 'M75 128 L74 105 L78 82', width: 2.55 },
    { d: 'M78 82 L72 58 L80 34', width: 1.82 },
    { d: 'M80 34 L84 8', width: 1.14 },
    { d: 'M72 58 L56 46 L40 38', width: 1.52 },
    { d: 'M78 82 L96 66 L116 50', width: 1.58 },
    { d: 'M80 34 L96 26', width: 1.12 },
    { d: 'M74 105 L61 92 L52 83', width: 1.18 },
    { d: 'M84 8 L80 -1 M84 8 L90 0', width: .62 },
    { d: 'M116 50 L125 45', width: .58 },
  ],
  woodyKnots: [
    { x: 74, y: 105, rx: 2.7, ry: 1.5, rotate: 7 },
    { x: 78, y: 82, rx: 2.45, ry: 1.35, rotate: -18 },
    { x: 72, y: 58, rx: 2.1, ry: 1.2, rotate: 19 },
    { x: 80, y: 34, rx: 1.85, ry: 1.05, rotate: -20 },
  ],
  leafPoints: [
    { x: 64, y: 94, rotate: -62, scale: .72 },
    { x: 90, y: 71, rotate: 58, scale: .78 },
    { x: 58, y: 47, rotate: -56, scale: .74 },
    { x: 94, y: 28, rotate: 58, scale: .7 },
    { x: 105, y: 58, rotate: 65, scale: .68 },
    { x: 48, y: 42, rotate: -64, scale: .62 },
    { x: 79, y: 19, rotate: -40, scale: .56 },
    { x: 57, y: 87, rotate: -50, scale: .58 },
  ],
  blooms: [
    { x: 84, y: 8, scale: 1.12, rotate: 2, threshold: .5, stage: 'open', facing: 'front' },
    { x: 40, y: 38, scale: 1, rotate: -18, threshold: .4, variant: 1, stage: 'open', facing: 'three_quarter' },
    { x: 116, y: 50, scale: .94, rotate: 20, threshold: .3, stage: 'open', facing: 'side' },
    { x: 52, y: 83, scale: .76, rotate: -24, threshold: .18, variant: 1, stage: 'half', facing: 'three_quarter' },
    { x: 96, y: 26, scale: .58, rotate: 24, threshold: .08, stage: 'bud', facing: 'side' },
  ],
};

export const CAMELLIA_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: 1.05 });
export const renderCamelliasFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
