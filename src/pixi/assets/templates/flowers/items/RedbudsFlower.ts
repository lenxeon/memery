/** 紫红蝶花直接簇生于枝干的紫荆。 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'redbuds', form: 'redbud', layout: 'branch', leafShape: 'round',
  primary: '#c026d3', secondary: '#f0abfc', center: '#fde047',
  agedPrimary: '#81546f', agedSecondary: '#b392a0', stem: '#513324', agedStem: '#35271f',
  leaf: '#3f7a46', agedLeaf: '#5c5e42',
  blooms: [
    { x: 27, y: 26, scale: .62, rotate: -29, threshold: .5, stage: 'open', facing: 'three_quarter' },
    { x: 55, y: 48, scale: .76, rotate: -10, threshold: .42, stage: 'open', facing: 'front' },
    { x: 82, y: 30, scale: .58, rotate: 11, threshold: .34, stage: 'half', facing: 'side' },
    { x: 106, y: 53, scale: .74, rotate: 24, threshold: .26, stage: 'open', facing: 'back' },
    { x: 72, y: 76, scale: .48, rotate: -1, threshold: .18, stage: 'bud', facing: 'three_quarter' },
    { x: 124, y: 82, scale: .4, rotate: 38, threshold: .1, stage: 'bud', facing: 'side' },
  ],
};

export const REDBUD_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .52 });
export const renderRedbudsFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
