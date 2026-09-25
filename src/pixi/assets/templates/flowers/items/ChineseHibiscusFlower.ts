/** 巨大朱瓣与长雄蕊柱构成的朱槿。 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'chineseHibiscus', form: 'hibiscus', layout: 'stems', leafShape: 'serrated',
  primary: '#ef4444', secondary: '#fb923c', center: '#fde047',
  agedPrimary: '#954b3e', agedSecondary: '#a66f49', stem: '#3f6938', agedStem: '#4b4933',
  leaf: '#34753e', agedLeaf: '#586044', stemWidth: 3,
  blooms: [
    { x: 48, y: 51, scale: .82, rotate: -14, threshold: .5 },
    { x: 76, y: 29, scale: .98, rotate: 0, threshold: .36 },
    { x: 104, y: 54, scale: .82, rotate: 15, threshold: .22 },
    { x: 66, y: 78, scale: .62, rotate: -12, threshold: .09 },
  ],
};

export const CHINESE_HIBISCUS_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .95 });
export const renderChineseHibiscusFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
