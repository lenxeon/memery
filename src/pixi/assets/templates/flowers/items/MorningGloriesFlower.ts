/** 晨露中舒展放射纹漏斗花的牵牛。 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'morningGlories', form: 'morning_glory', layout: 'arch', leafShape: 'broad',
  primary: '#3b82f6', secondary: '#c4b5fd', center: '#fff7ed',
  agedPrimary: '#657083', agedSecondary: '#a89ca4', stem: '#396b3d', agedStem: '#4b4932',
  leaf: '#3f7b3f', agedLeaf: '#606143', stemWidth: 2.2,
  blooms: [
    { x: 43, y: 48, scale: .84, rotate: -18, threshold: .48 },
    { x: 72, y: 28, scale: .98, rotate: -2, threshold: .34 },
    { x: 104, y: 50, scale: .86, rotate: 20, threshold: .2 },
    { x: 91, y: 78, scale: .65, rotate: 16, threshold: .08 },
  ],
};

export const MORNING_GLORY_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .92 });
export const renderMorningGloriesFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
