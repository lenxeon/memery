/** 月白长瓣于夜色中放射盛开的昙花。 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'epiphyllum', form: 'epiphyllum', layout: 'stems', leafShape: 'broad',
  primary: '#ffffff', secondary: '#fef3c7', center: '#facc15',
  agedPrimary: '#d9cfbd', agedSecondary: '#d0bd8f', stem: '#397158', agedStem: '#4c5141',
  leaf: '#2f7658', agedLeaf: '#566552', stemWidth: 3.2,
  blooms: [
    { x: 53, y: 46, scale: .82, rotate: -17, threshold: .48 },
    { x: 82, y: 30, scale: 1, rotate: 4, threshold: .32 },
    { x: 105, y: 62, scale: .72, rotate: 18, threshold: .16 },
    { x: 66, y: 78, scale: .58, rotate: -10, threshold: .06 },
  ],
};

export const EPIPHYLLUM_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .95 });
export const renderEpiphyllumFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
