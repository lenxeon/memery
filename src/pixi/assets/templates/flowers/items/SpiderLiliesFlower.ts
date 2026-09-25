/** 反卷赤瓣、长蕊如焰丝的彼岸花。 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'spiderLilies', form: 'spider_lily', layout: 'stems', leafShape: 'none',
  primary: '#dc2626', secondary: '#ef4444', center: '#fbbf24',
  agedPrimary: '#7f4138', agedSecondary: '#914a40', stem: '#315d39', agedStem: '#444432',
  stemWidth: 2.6,
  blooms: [
    { x: 48, y: 54, scale: .76, rotate: -12, threshold: .5 },
    { x: 75, y: 28, scale: .94, rotate: 0, threshold: .35 },
    { x: 103, y: 53, scale: .78, rotate: 13, threshold: .2 },
    { x: 65, y: 79, scale: .56, rotate: -10, threshold: .08 },
  ],
};

export const SPIDER_LILY_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: .58 });
export const renderSpiderLiliesFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
