/** 朱橙长喇叭攀援而上的凌霄。 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'trumpetCreeper', form: 'trumpet', layout: 'cascade', leafShape: 'serrated',
  primary: '#f97316', secondary: '#dc2626', center: '#facc15',
  agedPrimary: '#9d623b', agedSecondary: '#8e4235', stem: '#35653b', agedStem: '#45442e',
  leaf: '#2f7c3e', agedLeaf: '#59603f', stemWidth: 2.8,
  blooms: [
    { x: 45, y: 34, scale: .8, rotate: -28, threshold: .5 },
    { x: 73, y: 24, scale: .95, rotate: -4, threshold: .36 },
    { x: 102, y: 39, scale: .84, rotate: 25, threshold: .22 },
    { x: 91, y: 70, scale: .68, rotate: 18, threshold: .09 },
  ],
};

export const TRUMPET_CREEPER_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .82 });
export const renderTrumpetCreeperFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
