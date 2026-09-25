/** 花若彩凤、弯距如尾的染甲凤仙。 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'impatiens', form: 'impatiens', layout: 'stems', leafShape: 'serrated',
  primary: '#ec4899', secondary: '#fb7185', center: '#facc15',
  agedPrimary: '#98596e', agedSecondary: '#ad6f68', stem: '#4b7540', agedStem: '#51503a',
  leaf: '#4d7c3f', agedLeaf: '#626448', stemWidth: 2.3,
  blooms: [
    { x: 47, y: 52, scale: .76, rotate: -16, threshold: .5 },
    { x: 74, y: 31, scale: .88, rotate: -2, threshold: .36 },
    { x: 102, y: 51, scale: .78, rotate: 15, threshold: .22 },
    { x: 62, y: 76, scale: .62, rotate: -18, threshold: .09 },
  ],
};

export const IMPATIENS_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .72 });
export const renderImpatiensFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
