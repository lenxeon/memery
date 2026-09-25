/** 宽润碧叶上悬垂玉白长筒花的玉簪。 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'hostas', form: 'hosta', layout: 'spike', leafShape: 'broad',
  primary: '#ffffff', secondary: '#ddd6fe', center: '#fef3c7',
  agedPrimary: '#d7cfbd', agedSecondary: '#bcb3b7', stem: '#4b7544', agedStem: '#53513b',
  leaf: '#3f7c52', agedLeaf: '#5f654c', stemWidth: 2.7,
  blooms: [
    { x: 64, y: 33, scale: .72, rotate: -16, threshold: .5 },
    { x: 83, y: 45, scale: .78, rotate: 16, threshold: .38 },
    { x: 60, y: 60, scale: .7, rotate: -20, threshold: .26 },
    { x: 88, y: 73, scale: .64, rotate: 18, threshold: .14 },
    { x: 69, y: 86, scale: .55, rotate: -14, threshold: .06 },
  ],
};

export const HOSTA_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .65 });
export const renderHostasFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
