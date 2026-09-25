/**
 * 【照水芙蓉】
 * 骨：直立木本主干稳健，侧枝舒展向上，枝端托举大花而非柔软草茎。
 * 肉：巨大的重瓣花冠由皱褶薄瓣层叠成碗，外瓣舒展、内瓣卷抱。
 * 神：同枝呈白、浅粉、酡红三色变化，金黄蕊心与掌状大叶相映。
 * 韵：花大而不俗、枝正而叶阔，如美人照水，一日三醉、温润含情。
 */
import { FlowerRenderProps } from '../types';
import { createEasternFallingPetals, EasternFlowerSpec, renderEasternFlower } from '../utils/botanical';

const SPEC: EasternFlowerSpec = {
  id: 'hibiscusMutabilis', form: 'mutabilis', layout: 'branch', leafShape: 'lobed',
  primary: '#fb7185', secondary: '#ffe4e6', center: '#fbbf24',
  agedPrimary: '#ae6d62', agedSecondary: '#d8c1b1', stem: '#4e4230', agedStem: '#3d3427',
  leaf: '#357a38', agedLeaf: '#62533a',
  woodyBranches: [
    { d: 'M75 128 L74 104 L78 82', width: 2.62 },
    { d: 'M78 82 L73 55 L77 28', width: 1.86 },
    { d: 'M77 28 L76 4', width: 1.12 },
    { d: 'M73 55 L54 41 L38 27', width: 1.52 },
    { d: 'M78 82 L97 67 L115 48', width: 1.56 },
    { d: 'M77 28 L95 16 L109 3', width: 1.08 },
    { d: 'M74 104 L56 92 L43 84', width: 1.14 },
    { d: 'M54 41 L48 31', width: .66 },
    { d: 'M115 48 L124 42', width: .62 },
  ],
  woodyKnots: [
    { x: 74, y: 104, rx: 2.8, ry: 1.55, rotate: 7 },
    { x: 78, y: 82, rx: 2.5, ry: 1.4, rotate: -17 },
    { x: 73, y: 55, rx: 2.2, ry: 1.22, rotate: 19 },
    { x: 77, y: 28, rx: 1.85, ry: 1.05, rotate: -18 },
  ],
  leafPoints: [
    { x: 58, y: 94, rotate: -58, scale: .72 },
    { x: 92, y: 72, rotate: 56, scale: .76 },
    { x: 58, y: 44, rotate: -54, scale: .72 },
    { x: 91, y: 19, rotate: 52, scale: .68 },
    { x: 105, y: 59, rotate: 62, scale: .7 },
    { x: 48, y: 35, rotate: -64, scale: .62 },
    { x: 78, y: 42, rotate: 38, scale: .58 },
  ],
  blooms: [
    { x: 76, y: 4, scale: 1.08, rotate: 2, threshold: .5, variant: 0, stage: 'open', facing: 'front' },
    { x: 38, y: 27, scale: .98, rotate: -18, threshold: .4, variant: 1, stage: 'open', facing: 'three_quarter' },
    { x: 115, y: 48, scale: .96, rotate: 20, threshold: .32, variant: 2, stage: 'open', facing: 'side' },
    { x: 109, y: 3, scale: .82, rotate: 18, threshold: .24, variant: 1, stage: 'half', facing: 'three_quarter' },
    { x: 43, y: 84, scale: .72, rotate: -24, threshold: .15, variant: 2, stage: 'half', facing: 'side' },
    { x: 48, y: 31, scale: .55, rotate: -8, threshold: .07, variant: 0, stage: 'bud', facing: 'three_quarter' },
  ],
};

export const HIBISCUS_MUTABILIS_FALLING_PETALS = createEasternFallingPetals(SPEC.blooms, { petalScale: 1.05 });
export const renderHibiscusMutabilisFlower = (props: FlowerRenderProps): string => renderEasternFlower(SPEC, props);
