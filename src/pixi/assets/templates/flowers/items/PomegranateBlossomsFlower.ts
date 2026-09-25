/** 筒萼如冠、火红薄瓣翻卷的石榴花。 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'pomegranateBlossoms', form: 'pomegranate', layout: 'branch', leafShape: 'narrow',
  primary: '#ef4444', secondary: '#b91c1c', center: '#fbbf24',
  agedPrimary: '#964d3e', agedSecondary: '#6e382f', stem: '#5b3d26', agedStem: '#3d2d21',
  leaf: '#3f7a42', agedLeaf: '#5b5c40',
  blooms: [
    { x: 114, y: 25, scale: .76, rotate: 27, threshold: .5, stage: 'open', facing: 'three_quarter' },
    { x: 83, y: 42, scale: .94, rotate: 6, threshold: .41, stage: 'open', facing: 'front' },
    { x: 48, y: 34, scale: .62, rotate: -21, threshold: .33, stage: 'half', facing: 'side' },
    { x: 28, y: 67, scale: .72, rotate: -31, threshold: .25, stage: 'open', facing: 'back' },
    { x: 99, y: 73, scale: .52, rotate: 18, threshold: .16, stage: 'bud', facing: 'three_quarter' },
    { x: 58, y: 88, scale: .44, rotate: -9, threshold: .08, stage: 'bud', facing: 'side' },
  ],
};

export const POMEGRANATE_BLOSSOM_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .8 });
export const renderPomegranateBlossomsFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
