/** 墨绿蜡叶衬乳白旋瓣的栀子。 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'gardenias', form: 'gardenia', layout: 'stems', leafShape: 'broad',
  primary: '#fffdf5', secondary: '#f1f5e8', center: '#d9f99d',
  agedPrimary: '#d9cfb9', agedSecondary: '#c7c3a8', stem: '#244f32', agedStem: '#41422f',
  leaf: '#164e36', agedLeaf: '#47523b', stemWidth: 3,
  blooms: [
    { x: 49, y: 51, scale: .84, rotate: -10, threshold: .5 },
    { x: 76, y: 30, scale: .98, rotate: 2, threshold: .36 },
    { x: 103, y: 55, scale: .82, rotate: 13, threshold: .22 },
    { x: 66, y: 77, scale: .64, rotate: -14, threshold: .09 },
  ],
};

export const GARDENIA_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .9 });
export const renderGardeniasFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
