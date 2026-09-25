/** 银白渐金、成对细筒卷瓣的金银花。 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'honeysuckle', form: 'honeysuckle', layout: 'arch', leafShape: 'round',
  primary: '#facc15', secondary: '#fffbea', center: '#d97706',
  agedPrimary: '#aa8746', agedSecondary: '#d9ceb5', stem: '#3c6a3d', agedStem: '#49442f',
  leaf: '#4d7c48', agedLeaf: '#626044', stemWidth: 2.1,
  blooms: [
    { x: 44, y: 49, scale: .8, rotate: -18, threshold: .5 },
    { x: 70, y: 31, scale: .92, rotate: -4, threshold: .37 },
    { x: 101, y: 47, scale: .82, rotate: 19, threshold: .24 },
    { x: 112, y: 75, scale: .68, rotate: 26, threshold: .11 },
  ],
};

export const HONEYSUCKLE_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .58 });
export const renderHoneysuckleFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
