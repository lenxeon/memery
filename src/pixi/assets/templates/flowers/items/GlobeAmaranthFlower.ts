/** 洋红纸质球冠、长久不凋的千日红。 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'globeAmaranth', form: 'globe', layout: 'stems', leafShape: 'broad',
  primary: '#db2777', secondary: '#f9a8d4', center: '#fde68a',
  agedPrimary: '#914f63', agedSecondary: '#bb9291', stem: '#4d6f3b', agedStem: '#53503a',
  leaf: '#64834a', agedLeaf: '#686549', stemWidth: 2.2,
  blooms: [
    { x: 46, y: 54, scale: .72, rotate: -10, threshold: .5 },
    { x: 75, y: 30, scale: .84, rotate: 0, threshold: .38 },
    { x: 103, y: 53, scale: .74, rotate: 11, threshold: .26 },
    { x: 61, y: 77, scale: .6, rotate: -12, threshold: .14 },
    { x: 91, y: 78, scale: .56, rotate: 12, threshold: .06 },
  ],
};

export const GLOBE_AMARANTH_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .52 });
export const renderGlobeAmaranthFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
