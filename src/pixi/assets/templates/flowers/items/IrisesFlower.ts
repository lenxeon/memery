/** 三立三垂、金纹如蝶翼的鸢尾。 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'irises', form: 'iris', layout: 'stems', leafShape: 'narrow',
  primary: '#6366f1', secondary: '#a78bfa', center: '#facc15',
  agedPrimary: '#6e6578', agedSecondary: '#9c8d91', stem: '#315d42', agedStem: '#494633',
  leaf: '#2f6f58', agedLeaf: '#5d6045', stemWidth: 2.5,
  blooms: [
    { x: 47, y: 54, scale: .82, rotate: -13, threshold: .48 },
    { x: 75, y: 28, scale: .98, rotate: 0, threshold: .34 },
    { x: 104, y: 51, scale: .84, rotate: 14, threshold: .2 },
    { x: 68, y: 78, scale: .63, rotate: -8, threshold: .08 },
  ],
};

export const IRIS_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .9 });
export const renderIrisesFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
