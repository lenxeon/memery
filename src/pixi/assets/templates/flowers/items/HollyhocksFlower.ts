/** 大花沿高茎逐层攀升的蜀葵花塔。 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'hollyhocks', form: 'hollyhock', layout: 'spike', leafShape: 'round',
  primary: '#e11d48', secondary: '#fb7185', center: '#fde047',
  agedPrimary: '#8f4847', agedSecondary: '#b87870', stem: '#4b713d', agedStem: '#515038',
  leaf: '#4d7c3f', agedLeaf: '#626348', stemWidth: 3.2,
  blooms: [
    { x: 75, y: 24, scale: .78, rotate: 0, threshold: .5 },
    { x: 59, y: 47, scale: .82, rotate: -13, threshold: .39 },
    { x: 91, y: 58, scale: .8, rotate: 14, threshold: .28 },
    { x: 61, y: 78, scale: .7, rotate: -14, threshold: .17 },
    { x: 91, y: 91, scale: .62, rotate: 15, threshold: .07 },
  ],
};

export const HOLLYHOCK_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .92 });
export const renderHollyhocksFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
