/** 皱绉薄瓣聚成云团的紫薇。 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'crapeMyrtle', form: 'crape_myrtle', layout: 'stems', leafShape: 'round',
  primary: '#d946ef', secondary: '#f0abfc', center: '#fde047',
  agedPrimary: '#8c5d7b', agedSecondary: '#b997a4', stem: '#6b4d32', agedStem: '#453628',
  leaf: '#3f7d45', agedLeaf: '#5d5e40', stemWidth: 2.7,
  blooms: [
    { x: 47, y: 52, scale: .8, rotate: -12, threshold: .5 },
    { x: 75, y: 29, scale: .94, rotate: 1, threshold: .37 },
    { x: 103, y: 50, scale: .82, rotate: 14, threshold: .24 },
    { x: 62, y: 75, scale: .65, rotate: -15, threshold: .11 },
  ],
};

export const CRAPE_MYRTLE_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .55 });
export const renderCrapeMyrtleFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
