/** 橙金长瓣如喇叭、剑叶舒展的忘忧萱草。 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'daylilies', form: 'daylily', layout: 'stems', leafShape: 'narrow',
  primary: '#f97316', secondary: '#fde047', center: '#9a3412',
  agedPrimary: '#9d663f', agedSecondary: '#c2a35d', stem: '#4c7138', agedStem: '#52503a',
  leaf: '#56833f', agedLeaf: '#69694b', stemWidth: 2.5,
  blooms: [
    { x: 47, y: 53, scale: .8, rotate: -14, threshold: .5 },
    { x: 75, y: 27, scale: .96, rotate: 0, threshold: .35 },
    { x: 104, y: 52, scale: .82, rotate: 15, threshold: .2 },
    { x: 65, y: 79, scale: .6, rotate: -12, threshold: .08 },
  ],
};

export const DAYLILY_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .85 });
export const renderDayliliesFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
