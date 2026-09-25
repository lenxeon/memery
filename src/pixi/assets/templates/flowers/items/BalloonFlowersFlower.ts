/** 五角蓝紫花与鼓囊花苞并存的桔梗。 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'balloonFlowers', form: 'balloon', layout: 'stems', leafShape: 'serrated',
  primary: '#6366f1', secondary: '#a5b4fc', center: '#fef3c7',
  agedPrimary: '#686b78', agedSecondary: '#9c9da6', stem: '#3c6d42', agedStem: '#4a4932',
  leaf: '#3f7d45', agedLeaf: '#5c6042', stemWidth: 2.4,
  blooms: [
    { x: 47, y: 53, scale: .78, rotate: -12, threshold: .5 },
    { x: 75, y: 29, scale: .92, rotate: 0, threshold: .36 },
    { x: 103, y: 52, scale: .8, rotate: 13, threshold: .22 },
    { x: 66, y: 78, scale: .6, rotate: -10, threshold: .09 },
  ],
};

export const BALLOON_FLOWER_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .8 });
export const renderBalloonFlowersFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
