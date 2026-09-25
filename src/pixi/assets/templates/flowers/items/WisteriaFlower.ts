/** 藤紫蝶花如瀑垂落的紫藤。 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'wisteria', form: 'wisteria', layout: 'cascade', leafShape: 'round',
  primary: '#8b5cf6', secondary: '#c4b5fd', center: '#fef3c7',
  agedPrimary: '#76647c', agedSecondary: '#a89da2', stem: '#4a5132', agedStem: '#423a29',
  leaf: '#4d7c0f', agedLeaf: '#5f6040', stemWidth: 2.5,
  blooms: [
    { x: 46, y: 23, scale: .72, rotate: -7, threshold: .5 },
    { x: 74, y: 17, scale: .84, rotate: 2, threshold: .37 },
    { x: 103, y: 28, scale: .76, rotate: 8, threshold: .24 },
    { x: 61, y: 54, scale: .58, rotate: -10, threshold: .12 },
  ],
};

export const WISTERIA_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .55 });
export const renderWisteriaFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
