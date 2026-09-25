/** 金粟小花藏于浓绿叶间的桂花。 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'osmanthus', form: 'osmanthus', layout: 'branch', leafShape: 'serrated',
  primary: '#fbbf24', secondary: '#fde68a', center: '#b45309',
  agedPrimary: '#ab8749', agedSecondary: '#d2c292', stem: '#4a3820', agedStem: '#34291d',
  leaf: '#285d37', agedLeaf: '#51543a',
  blooms: [
    { x: 58, y: 25, scale: .65, rotate: -10, threshold: .5, stage: 'open', facing: 'front' },
    { x: 91, y: 31, scale: .72, rotate: 14, threshold: .42, stage: 'open', facing: 'three_quarter' },
    { x: 35, y: 53, scale: .56, rotate: -28, threshold: .34, stage: 'half', facing: 'side' },
    { x: 111, y: 61, scale: .66, rotate: 27, threshold: .26, stage: 'open', facing: 'back' },
    { x: 70, y: 72, scale: .48, rotate: -3, threshold: .18, stage: 'bud', facing: 'three_quarter' },
    { x: 126, y: 86, scale: .4, rotate: 39, threshold: .1, stage: 'bud', facing: 'side' },
  ],
};

export const OSMANTHUS_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .42 });
export const renderOsmanthusFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
