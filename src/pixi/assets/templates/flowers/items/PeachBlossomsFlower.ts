/**
 * 【灼灼桃花】
 * 骨：红褐新木仍以瘦、硬、折为基准，枝势横斜舒展，细梢轻挑。
 * 肉：单层五瓣略尖，粉色由瓣根向瓣尖变浅，花贴枝节而生。
 * 神：金丝长蕊、深红花萼、花苞与嫩叶同枝，正侧背三态相间。
 * 韵：枝节三两成簇、花团紧密而枝间留白，斜势带出桃之夭夭的明媚。
 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'peachBlossoms', form: 'peach', layout: 'branch', leafShape: 'narrow',
  primary: '#fb7185', secondary: '#fecdd3', center: '#fbbf24',
  agedPrimary: '#b97870', agedSecondary: '#d6b4a4', stem: '#542d20', agedStem: '#33241b',
  leaf: '#65a30d', agedLeaf: '#74643e',
  woodyBranches: [
    { d: 'M75 128 L76 104 L71 83', width: 2.36 },
    { d: 'M71 83 L62 62 L50 43', width: 1.68 },
    { d: 'M50 43 L37 20 L22 -7', width: 1.06 },
    { d: 'M71 83 L86 65 L101 46 L119 29', width: 1.5 },
    { d: 'M62 62 L75 39 L84 15', width: 1.2 },
    { d: 'M50 43 L34 47 L18 39', width: 1.02 },
    { d: 'M76 104 L93 91 L112 86', width: 1.18 },
    { d: 'M101 46 L111 35', width: .72 },
    { d: 'M22 -7 L17 -16 M22 -7 L29 -15', width: .62 },
    { d: 'M119 29 L127 22 M119 29 L128 33', width: .58 },
  ],
  woodyKnots: [
    { x: 76, y: 104, rx: 2.5, ry: 1.45, rotate: -5 },
    { x: 71, y: 83, rx: 2.2, ry: 1.3, rotate: 18 },
    { x: 62, y: 62, rx: 2, ry: 1.15, rotate: -20 },
    { x: 50, y: 43, rx: 1.7, ry: 1, rotate: 24 },
  ],
  leafPoints: [
    { x: 93, y: 91, rotate: 58, scale: .55 },
    { x: 84, y: 65, rotate: 48, scale: .48 },
    { x: 34, y: 47, rotate: -66, scale: .45 },
  ],
  blooms: [
    { x: 22, y: -7, scale: .86, rotate: -31, threshold: .5, stage: 'open', facing: 'three_quarter' },
    { x: 119, y: 29, scale: 1.04, rotate: 29, threshold: .42, stage: 'open', facing: 'front' },
    { x: 84, y: 15, scale: .78, rotate: 16, threshold: .34, stage: 'half', facing: 'side' },
    { x: 18, y: 39, scale: .92, rotate: -37, threshold: .26, stage: 'open', facing: 'back' },
    { x: 112, y: 86, scale: .52, rotate: 42, threshold: .18, stage: 'bud', facing: 'side' },
    { x: 101, y: 46, scale: .72, rotate: 16, threshold: .11, stage: 'half', facing: 'three_quarter' },
    { x: 111, y: 35, scale: .45, rotate: 35, threshold: .06, stage: 'bud', facing: 'back' },
    { x: 62, y: 62, scale: .82, rotate: -8, threshold: .3, stage: 'open', facing: 'front' },
    { x: 86, y: 65, scale: .68, rotate: 13, threshold: .2, stage: 'half', facing: 'three_quarter' },
    { x: 111, y: 27, scale: .78, rotate: 4, threshold: .24, stage: 'open', facing: 'three_quarter' },
    { x: 121, y: 38, scale: .68, rotate: 43, threshold: .16, stage: 'half', facing: 'side' },
    { x: 27, y: 42, scale: .78, rotate: -12, threshold: .22, stage: 'open', facing: 'front' },
    { x: 22, y: 31, scale: .64, rotate: -49, threshold: .14, stage: 'half', facing: 'three_quarter' },
    { x: 70, y: 58, scale: .76, rotate: 19, threshold: .18, stage: 'open', facing: 'three_quarter' },
    { x: 29, y: -3, scale: .68, rotate: 12, threshold: .12, stage: 'open', facing: 'side' },
  ],
};

export const PEACH_BLOSSOM_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .72 });
export const renderPeachBlossomsFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
