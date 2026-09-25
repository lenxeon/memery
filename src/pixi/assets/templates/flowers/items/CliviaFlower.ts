/** 扇叶托举橙红伞序的君子兰。 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'clivia', form: 'clivia', layout: 'spike', leafShape: 'broad',
  primary: '#f97316', secondary: '#ef4444', center: '#fde047',
  agedPrimary: '#a5673e', agedSecondary: '#924c42', stem: '#386641', agedStem: '#4b4932',
  leaf: '#185c36', agedLeaf: '#4e573b', stemWidth: 3.7,
  blooms: [
    { x: 75, y: 38, scale: 1.05, rotate: 0, threshold: .34 },
    { x: 54, y: 59, scale: .68, rotate: -18, threshold: .48 },
    { x: 97, y: 61, scale: .66, rotate: 19, threshold: .18 },
  ],
};

export const CLIVIA_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .78 });
export const renderCliviaFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
