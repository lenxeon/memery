/** 碧枝拱垂、六瓣先开的迎春。 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'winterJasmine', form: 'forsythia', layout: 'arch', leafShape: 'narrow',
  primary: '#fde047', secondary: '#fef08a', center: '#d97706',
  agedPrimary: '#b99a4d', agedSecondary: '#d9c992', stem: '#3f7d4a', agedStem: '#4a4931',
  leaf: '#65a30d', agedLeaf: '#6f7045', stemWidth: 2,
  blooms: [
    { x: 38, y: 48, scale: .68, rotate: -20, threshold: .5 },
    { x: 60, y: 31, scale: .74, rotate: -8, threshold: .4 },
    { x: 83, y: 40, scale: .72, rotate: 8, threshold: .3 },
    { x: 105, y: 58, scale: .68, rotate: 18, threshold: .2 },
    { x: 119, y: 84, scale: .58, rotate: 28, threshold: .1 },
  ],
};

export const WINTER_JASMINE_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .6 });
export const renderWinterJasmineFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
