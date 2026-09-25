/** 素白星花与圆润青苞相映的茉莉。 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'jasmine', form: 'jasmine', layout: 'stems', leafShape: 'round',
  primary: '#ffffff', secondary: '#ecfccb', center: '#facc15',
  agedPrimary: '#ded5c4', agedSecondary: '#c8c8a4', stem: '#3f7042', agedStem: '#4a4932',
  leaf: '#2f7c46', agedLeaf: '#596247', stemWidth: 2.2,
  blooms: [
    { x: 46, y: 52, scale: .7, rotate: -12, threshold: .5 },
    { x: 71, y: 31, scale: .78, rotate: -2, threshold: .4 },
    { x: 97, y: 42, scale: .74, rotate: 12, threshold: .3 },
    { x: 111, y: 67, scale: .66, rotate: 20, threshold: .2 },
    { x: 65, y: 78, scale: .58, rotate: -15, threshold: .1 },
  ],
};

export const JASMINE_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .58 });
export const renderJasmineFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
