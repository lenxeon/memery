/** 扇形绒冠如珊瑚锦缎的鸡冠花。 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'cockscomb', form: 'cockscomb', layout: 'spike', leafShape: 'broad',
  primary: '#be123c', secondary: '#fb7185', center: '#f59e0b',
  agedPrimary: '#733f42', agedSecondary: '#a66d68', stem: '#516b39', agedStem: '#55503a',
  leaf: '#5f7d43', agedLeaf: '#696448', stemWidth: 3.6,
  blooms: [
    { x: 75, y: 33, scale: 1.05, rotate: 0, threshold: .32 },
    { x: 49, y: 60, scale: .72, rotate: -12, threshold: .48 },
    { x: 102, y: 63, scale: .68, rotate: 13, threshold: .16 },
  ],
};

export const COCKSCOMB_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .7 });
export const renderCockscombFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
