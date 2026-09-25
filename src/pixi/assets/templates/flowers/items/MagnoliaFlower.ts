/**
 * 【玉盏玉兰】
 * 骨：灰褐木枝由瓶口直上后折分，枝硬而不粗，顶端均有短小分叉。
 * 肉：大而厚的玉白杯瓣直立抱合，外瓣宽、内瓣收，不作平面五瓣花。
 * 神：主花朝天，侧花露杯壁，毛笔头状花苞立于枝端，先花后叶。
 * 韵：少花、大花、高举、大片留白，取霓裳片片、玉树临风之意。
 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'magnolia', form: 'magnolia', layout: 'branch', leafShape: 'none',
  primary: '#fff7ed', secondary: '#fbcfe8', center: '#d97706',
  agedPrimary: '#d8c5aa', agedSecondary: '#c99a9d', stem: '#4a2c20', agedStem: '#2c2019',
  woodyBranches: [
    { d: 'M75 128 L75 103 L69 78', width: 2.42 },
    { d: 'M69 78 L62 53 L58 25', width: 1.72 },
    { d: 'M58 25 L55 -6 L50 -36', width: 1.08 },
    { d: 'M69 78 L89 58 L107 35 L119 10', width: 1.55 },
    { d: 'M62 53 L42 40 L27 14', width: 1.3 },
    { d: 'M58 25 L75 8 L85 -17', width: 1.08 },
    { d: 'M75 103 L91 91 L108 86', width: 1.12 },
    { d: 'M50 -36 L45 -46 M50 -36 L56 -45', width: .72 },
    { d: 'M119 10 L125 3 M119 10 L127 13', width: .66 },
  ],
  woodyKnots: [
    { x: 75, y: 103, rx: 2.7, ry: 1.55, rotate: 8 },
    { x: 69, y: 78, rx: 2.4, ry: 1.4, rotate: -18 },
    { x: 62, y: 53, rx: 2.1, ry: 1.2, rotate: 20 },
    { x: 58, y: 25, rx: 1.8, ry: 1.05, rotate: -16 },
  ],
  blooms: [
    { x: 50, y: -36, scale: 1.04, rotate: -8, threshold: .5, stage: 'open', facing: 'three_quarter' },
    { x: 119, y: 10, scale: 1.2, rotate: 23, threshold: .39, stage: 'open', facing: 'front' },
    { x: 27, y: 14, scale: .88, rotate: -29, threshold: .28, stage: 'half', facing: 'side' },
    { x: 85, y: -17, scale: .72, rotate: 15, threshold: .18, stage: 'bud', facing: 'three_quarter' },
    { x: 108, y: 86, scale: .58, rotate: 38, threshold: .08, stage: 'bud', facing: 'back' },
    { x: 62, y: 53, scale: .78, rotate: -7, threshold: .3, stage: 'open', facing: 'side' },
    { x: 89, y: 58, scale: .72, rotate: 17, threshold: .16, stage: 'half', facing: 'three_quarter' },
    { x: 102, y: 35, scale: .76, rotate: 18, threshold: .12, stage: 'half', facing: 'three_quarter' },
  ],
};

export const MAGNOLIA_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: 1.05 });
export const renderMagnoliaFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
