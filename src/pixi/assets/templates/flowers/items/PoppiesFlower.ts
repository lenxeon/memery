/** 绢纸薄瓣、墨色花心、细梗摇曳的虞美人。 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'poppies', form: 'poppy', layout: 'stems', leafShape: 'serrated',
  primary: '#ef4444', secondary: '#fb923c', center: '#292524',
  agedPrimary: '#995246', agedSecondary: '#ae744f', stem: '#53734b', agedStem: '#575443',
  leaf: '#648052', agedLeaf: '#6a6951', stemWidth: 1.8,
  blooms: [
    { x: 45, y: 54, scale: .76, rotate: -14, threshold: .5 },
    { x: 74, y: 27, scale: .94, rotate: -1, threshold: .35 },
    { x: 105, y: 51, scale: .8, rotate: 15, threshold: .2 },
    { x: 64, y: 79, scale: .58, rotate: -12, threshold: .08 },
  ],
};

export const POPPY_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .92 });
export const renderPoppiesFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
