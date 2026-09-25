/**
 * @file botanical.ts
 * @description 东方花谱共享的纯 SVG 植物几何工具。只负责重复的花瓣、枝叶与衰老计算，
 * 每个花种仍由独立模板声明自己的花形、构图、色谱和落瓣轨迹。
 */
import { FlowerRenderProps, FallingPetalDef } from '../types';
import { getBlossomDropStyle, getFlowerAgingFilter, lerpColor } from './lifecycle';

export type EasternFlowerForm =
  | 'peach'
  | 'apricot'
  | 'pear'
  | 'crabapple'
  | 'wintersweet'
  | 'magnolia'
  | 'camellia'
  | 'azalea'
  | 'double_pom'
  | 'kerria'
  | 'mutabilis'
  | 'hibiscus'
  | 'wisteria'
  | 'trumpet'
  | 'morning_glory'
  | 'honeysuckle'
  | 'forsythia'
  | 'iris'
  | 'clivia'
  | 'osmanthus'
  | 'crape_myrtle'
  | 'globe'
  | 'gardenia'
  | 'jasmine'
  | 'balloon'
  | 'daylily'
  | 'hosta'
  | 'impatiens'
  | 'hollyhock'
  | 'pomegranate'
  | 'cockscomb'
  | 'poppy'
  | 'epiphyllum'
  | 'spider_lily'
  | 'redbud';

export type FlowerLayout = 'stems' | 'branch' | 'cascade' | 'spike' | 'arch';
export type LeafShape = 'broad' | 'narrow' | 'round' | 'serrated' | 'lobed' | 'none';
export type BloomStage = 'open' | 'half' | 'bud';
export type BloomFacing = 'front' | 'three_quarter' | 'side' | 'back';
export type StemNature = 'woody' | 'rigid' | 'soft' | 'vine' | 'scape';

export interface EasternBloomPoint {
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  threshold?: number;
  variant?: number;
  stage?: BloomStage;
  facing?: BloomFacing;
}

export interface WoodyBranchSegment {
  /** 从主干或枝节出发的折线/贝塞尔路径，终点应与花或花苞的着生点相接。 */
  d: string;
  /** 该段木枝的实际粗细；主干最粗，末梢逐级递减。 */
  width: number;
}

export interface WoodyKnot {
  x: number;
  y: number;
  rx?: number;
  ry?: number;
  rotate?: number;
}

export interface BotanicalLeafPoint {
  x: number;
  y: number;
  rotate: number;
  scale?: number;
}

export interface EasternFlowerSpec {
  id: string;
  form: EasternFlowerForm;
  layout: FlowerLayout;
  blooms: EasternBloomPoint[];
  primary: string;
  secondary: string;
  center: string;
  agedPrimary: string;
  agedSecondary: string;
  stem?: string;
  agedStem?: string;
  leaf?: string;
  agedLeaf?: string;
  leafShape?: LeafShape;
  stemWidth?: number;
  stemNature?: StemNature;
  woodyBranches?: WoodyBranchSegment[];
  woodyKnots?: WoodyKnot[];
  leafPoints?: BotanicalLeafPoint[];
}

const n = (value: number): string => value.toFixed(2).replace(/\.00$/, '');

export function createEasternFallingPetals(
  blooms: EasternBloomPoint[],
  options: { landY?: number; petalScale?: number } = {},
): FallingPetalDef[] {
  const landY = options.landY ?? 194;
  const petalScale = options.petalScale ?? 1;
  return blooms.slice(0, 5).map((bloom, index) => ({
    id: index + 1,
    detachHealth: bloom.threshold ?? Math.max(0.08, 0.5 - index * 0.1),
    fallSpan: 0.06,
    startX: bloom.x,
    startY: bloom.y,
    landX: Math.max(20, Math.min(132, bloom.x + (index % 2 === 0 ? 8 : -7))),
    landY: landY + (index % 3),
    rx: (4.2 + (index % 2) * 0.8) * petalScale,
    ry: (2.4 + (index % 3) * 0.35) * petalScale,
    landRot: index % 2 === 0 ? 22 + index * 7 : -26 - index * 5,
    swayAmp: 10 + index * 2,
    swayFreq: 2.8 + index * 0.35,
  }));
}

const petalEllipse = (rx: number, ry: number, fill: string, rotate: number, cy = -ry * 0.8): string =>
  `<ellipse cx="0" cy="${n(cy)}" rx="${n(rx)}" ry="${n(ry)}" fill="${fill}" transform="rotate(${rotate})" />`;

const radialPetals = (
  count: number,
  rx: number,
  ry: number,
  fill: string,
  offset = 0,
  cy = -ry * 0.78,
): string => Array.from({ length: count }, (_, i) => petalEllipse(rx, ry, fill, offset + (360 / count) * i, cy)).join('');

const stamens = (count: number, length: number, color: string, radius = 1.15): string =>
  Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count;
    const x = Math.cos(angle) * length;
    const y = Math.sin(angle) * length;
    return `<path d="M 0 0 Q ${n(x * 0.55)} ${n(y * 0.55 - 1)} ${n(x)} ${n(y)}" stroke="${color}" stroke-width="0.65" fill="none"/><circle cx="${n(x)}" cy="${n(y)}" r="${radius}" fill="${color}"/>`;
  }).join('');

const twoToneStamens = (count: number, length: number, filament: string, anther: string, radius = .9): string =>
  Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count;
    const x = Math.cos(angle) * length;
    const y = Math.sin(angle) * length;
    return `<path d="M0 0 Q${n(x * .42)} ${n(y * .42 - .8)} ${n(x)} ${n(y)}" stroke="${filament}" stroke-width=".58" fill="none"/><ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(radius)}" ry="${n(radius * .68)}" fill="${anther}" transform="rotate(${n(angle * 180 / Math.PI + 18)} ${n(x)} ${n(y)})"/>`;
  }).join('');

const petalVeins = (count: number, length: number, color: string, offset = 0, opacity = .32): string =>
  Array.from({ length: count }, (_, i) => {
    const rotate = offset + (360 / count) * i;
    return `<path d="M0 -1 C-.7 -4 .8 -${n(length * .7)} 0 -${n(length)}" stroke="${color}" stroke-width=".52" fill="none" opacity="${opacity}" transform="rotate(${rotate})"/>`;
  }).join('');

const notchedPetals = (count: number, fill: string, stroke: string, offset = 0): string =>
  Array.from({ length: count }, (_, i) => `<path d="M0 1 C-5 -1 -7 -7 -5 -12 C-3 -16 -1 -17 0 -14 C1 -17 3 -16 5 -12 C7 -7 5 -1 0 1Z" fill="${fill}" stroke="${stroke}" stroke-width=".42" transform="rotate(${offset + (360 / count) * i})"/>`).join('');

const ruffledPetals = (count: number, fill: string, stroke: string, offset = 0, scale = 1): string =>
  Array.from({ length: count }, (_, i) => `<path d="M0 1 C-6 -1 -8 -6 -5 -10 C-8 -14 -4 -18 0 -15 C3 -20 8 -15 5 -10 C9 -6 6 -1 0 1Z" fill="${fill}" stroke="${stroke}" stroke-width=".38" transform="rotate(${offset + (360 / count) * i}) scale(${scale})"/>`).join('');

function renderBloom(form: EasternFlowerForm, p: string, s: string, c: string, variant = 0): string {
  switch (form) {
    case 'peach':
      return `<g><g transform="translate(0 1.4)" opacity=".18">${notchedPetals(5, c, c, -8)}</g>${notchedPetals(5, p, s, -8)}<g opacity=".28">${notchedPetals(5, 'none', '#fff', -8)}</g><circle r="5.4" fill="${c}" opacity=".13"/>${petalVeins(5, 12.5, s, -8, .42)}<ellipse cy="1.2" rx="4.6" ry="3.2" fill="${s}" opacity=".88"/>${twoToneStamens(12, 7.1, '#f7d48a', c, .82)}<circle r="1.45" fill="${c}"/><ellipse cx="-3.5" cy="-7.5" rx="1.4" ry="2.4" fill="#fff" opacity=".3" transform="rotate(-22)"/></g>`;
    case 'apricot':
      return `<g><g transform="translate(0 1.5)" opacity=".16">${radialPetals(5, 8, 9.5, c, -6)}</g>${radialPetals(5, 7.8, 9.2, p, -6)}<circle r="6.2" fill="${c}" opacity=".12"/>${petalVeins(5, 7.8, s, -6, .34)}<ellipse cx="0" cy="-7.1" rx="7.8" ry="9.2" fill="${p}" stroke="#fff" stroke-width=".45" opacity=".96" transform="rotate(138)"/><ellipse cx="0" cy="-7.1" rx="7.8" ry="9.2" fill="${p}" stroke="#fff" stroke-width=".45" opacity=".96" transform="rotate(210)"/><ellipse cy="1" rx="4.2" ry="3.1" fill="${s}" opacity=".9"/>${twoToneStamens(10, 6, '#f4c9a8', c, .72)}<circle r="1.3" fill="${c}"/><ellipse cx="-3.8" cy="-6.8" rx="2.1" ry="3.5" fill="#fff" opacity=".28" transform="rotate(-24)"/></g>`;
    case 'pear':
      return `<g><g transform="translate(0 1.5)" opacity=".14">${radialPetals(5, 8.3, 10, c, -4)}</g>${radialPetals(5, 8.1, 9.8, p, -4)}<circle r="6.4" fill="#8b6473" opacity=".11"/>${petalVeins(5, 8.2, s, -4, .4)}<ellipse cx="0" cy="-7.6" rx="8.1" ry="9.8" fill="${p}" stroke="#fff" stroke-width=".48" opacity=".97" transform="rotate(140)"/><ellipse cx="0" cy="-7.6" rx="8.1" ry="9.8" fill="${p}" stroke="#fff" stroke-width=".48" opacity=".97" transform="rotate(212)"/><ellipse cy="1.1" rx="4.5" ry="3.2" fill="#d7b65a" opacity=".82"/>${twoToneStamens(13, 6.7, '#d8b14a', c, .98)}<circle r="1.35" fill="${c}"/><ellipse cx="-4.1" cy="-7.2" rx="2.4" ry="3.8" fill="#fff" opacity=".38" transform="rotate(-26)"/></g>`;
    case 'crabapple':
      return `<g><g transform="translate(0 1.25)" opacity=".17">${radialPetals(5, 6.8, 9.6, c, -12)}</g>${radialPetals(5, 6.6, 9.4, variant % 2 ? s : p, -12)}<circle r="5.2" fill="${c}" opacity=".13"/>${petalVeins(5, 7.6, s, -12, .34)}<ellipse cy=".8" rx="3.8" ry="2.7" fill="${s}" opacity=".88"/>${twoToneStamens(10, 5.8, '#f6c86d', c, .76)}<circle r="1.2" fill="${c}"/><ellipse cx="-3.4" cy="-6.7" rx="1.8" ry="3.1" fill="#fff" opacity=".3" transform="rotate(-28)"/></g>`;
    case 'wintersweet':
      return `<g><g transform="translate(0 1.2)" opacity=".2">${radialPetals(7, 6, 8.8, c, -5)}</g>${radialPetals(7, 5.8, 8.6, p, -5)}${petalVeins(7, 6.7, '#fff7bf', -5, .34)}<circle r="6.1" fill="#9a5b12" opacity=".12"/>${radialPetals(6, 3.7, 5.8, s, 8)}<circle r="3" fill="${c}" opacity=".9"/>${stamens(8, 3.5, '#f4b942', .5)}<ellipse cx="-3.2" cy="-5.7" rx="1.7" ry="3.2" fill="#fff" opacity=".42" transform="rotate(-28)"/></g>`;
    case 'magnolia':
      return `<g><ellipse cy="3" rx="15" ry="7" fill="#6f3840" opacity=".16"/><path d="M0 7 C-14 -2 -12 -25 -4 -31 C2 -23 4 -8 0 7Z" fill="${s}" stroke="#d9a9b3" stroke-width=".55"/><path d="M0 7 C8 -7 13 -25 6 -32 C-2 -25 -5 -8 0 7Z" fill="${p}" stroke="#ead8d0" stroke-width=".55"/><path d="M0 7 C18 -2 20 -17 14 -25 C4 -20 0 -7 0 7Z" fill="${s}" stroke="#d9a9b3" stroke-width=".48"/><path d="M0 7 C-18 -2 -20 -17 -14 -25 C-5 -20 -1 -6 0 7Z" fill="${p}" stroke="#ead8d0" stroke-width=".48"/><path d="M0 7 C-9 -3 -10 -19 -5 -27 C1 -21 3 -6 0 7Z" fill="${s}" opacity=".94"/><path d="M0 7 C8 -3 10 -19 5 -28 C-1 -21 -3 -6 0 7Z" fill="${p}" opacity=".98"/><path d="M0 6 C-4 -5 -3 -18 1 -25" stroke="#d89aaa" stroke-width=".9" fill="none" opacity=".52"/><path d="M-9 -17 Q-5 -8 -2 2 M10 -17 Q5 -8 2 2 M-3 -20 Q-1 -8 0 2" stroke="#fff" stroke-width="1.05" fill="none" opacity=".38"/><path d="M-8 4 Q0 -1 8 4 Q4 10 0 9 Q-4 10 -8 4Z" fill="${p}" stroke="#e7c8c6" stroke-width=".55"/><ellipse cx="0" cy="4" rx="4.5" ry="2.5" fill="${c}"/></g>`;
    case 'camellia':
      return `<g><g transform="translate(0 1.8)" opacity=".2">${radialPetals(9, 7.5, 12.4, '#701b24', 0)}</g>${radialPetals(9, 7.2, 12, p, 0)}${petalVeins(9, 9.4, s, 0, .25)}<circle r="9" fill="#6f1823" opacity=".16"/>${radialPetals(7, 5.4, 8.7, s, 17)}${radialPetals(5, 3.4, 5.5, p, 0)}<circle r="3.4" fill="${c}"/>${twoToneStamens(12, 5.4, '#f6d47a', c, .72)}<ellipse cx="-4.5" cy="-9" rx="2.5" ry="4.4" fill="#fff" opacity=".22" transform="rotate(-28)"/></g>`;
    case 'azalea':
      return `<g><ellipse cy="3" rx="15" ry="7" fill="#7f1d4b" opacity=".17"/><path d="M0 2 C-18 9 -24 -8 -14 -18 C-7 -15 -2 -8 0 2Z" fill="${p}" stroke="#fecdd3" stroke-width=".45"/><path d="M0 2 C18 9 24 -8 14 -18 C7 -15 2 -8 0 2Z" fill="${s}" stroke="#fecdd3" stroke-width=".45"/><path d="M0 1 C-9 -7 -9 -24 0 -27 C9 -23 9 -8 0 1Z" fill="${p}"/><path d="M0 1 C-13 -2 -19 10 -12 17 C-5 15 -1 8 0 1Z" fill="${s}"/><path d="M0 1 C13 -2 19 10 12 17 C5 15 1 8 0 1Z" fill="${p}"/><ellipse cy="1" rx="6.8" ry="4.5" fill="#9f1239" opacity=".25"/><g fill="#9f1239" opacity=".72"><circle cx="-5" cy="-10" r="1.05"/><circle cx="-2" cy="-13" r=".8"/><circle cx="2" cy="-10" r=".9"/><circle cx="5" cy="-13" r=".72"/><circle cx="0" cy="-17" r=".65"/></g>${twoToneStamens(7, 10.5, '#f8d36b', c, .82)}<ellipse cx="-6" cy="-12" rx="2.2" ry="4" fill="#fff" opacity=".2" transform="rotate(-22)"/></g>`;
    case 'double_pom':
      return `<g>${radialPetals(12, 4.2, 10.5, p, 0)}${radialPetals(9, 3.8, 8.2, s, 11)}${radialPetals(7, 3.1, 6, p, 0)}<circle r="3" fill="${c}"/></g>`;
    case 'kerria':
      return `<g><g transform="translate(0 1.4)" opacity=".18">${radialPetals(12, 4.6, 10.8, '#92400e', 0)}</g>${radialPetals(12, 4.4, 10.5, p, 0)}<circle r="8.4" fill="#b45309" opacity=".12"/>${radialPetals(10, 3.8, 8.1, s, 13)}${radialPetals(7, 3.1, 5.9, p, -4)}<circle r="2.8" fill="${c}"/>${stamens(10, 4.5, '#f59e0b', .58)}<ellipse cx="-3.8" cy="-7.2" rx="1.8" ry="3.5" fill="#fff" opacity=".28" transform="rotate(-25)"/></g>`;
    case 'mutabilis': {
      const outer = variant % 3 === 0 ? '#fff4f5' : variant % 3 === 2 ? '#e85d78' : p;
      const inner = variant % 3 === 0 ? s : variant % 3 === 2 ? p : s;
      return `<g><g transform="translate(0 1.8)" opacity=".17">${ruffledPetals(11, '#881337', '#881337', -5, 1.12)}</g>${ruffledPetals(11, outer, '#fecdd3', -5, 1.08)}<circle r="10" fill="#9f1239" opacity=".12"/>${ruffledPetals(9, inner, '#fff1f2', 12, .82)}${ruffledPetals(6, p, '#fecdd3', -2, .58)}<circle r="3.1" fill="${c}"/>${twoToneStamens(12, 5.2, '#fde68a', c, .7)}<ellipse cx="-5.2" cy="-10" rx="2.8" ry="4.8" fill="#fff" opacity=".25" transform="rotate(-26)"/></g>`;
    }
    case 'hibiscus':
      return `<g>${radialPetals(5, 10.5, 16, p, -10)}<circle r="7" fill="${s}" opacity="0.85"/><path d="M0 0 Q 7 5 17 10" stroke="${c}" stroke-width="2.2" fill="none"/>${Array.from({ length: 6 }, (_, i) => `<circle cx="${10 + i * 2}" cy="${6 + i * 0.8}" r="1.15" fill="${c}"/>`).join('')}</g>`;
    case 'wisteria':
      return `<g>${Array.from({ length: 9 }, (_, i) => {
        const y = i * 7;
        const x = ((i % 3) - 1) * (7 - i * 0.25);
        const sc = 1 - i * 0.045;
        return `<g transform="translate(${n(x)} ${y}) scale(${n(sc)})"><ellipse cx="-3" cy="0" rx="5" ry="4" fill="${i % 2 ? p : s}" transform="rotate(-24)"/><ellipse cx="3" cy="0" rx="5" ry="4" fill="${p}" transform="rotate(24)"/><path d="M-3 1 Q0 7 3 1" fill="${c}"/></g>`;
      }).join('')}<path d="M0 -7 Q2 24 0 62" stroke="${c}" stroke-width="1" fill="none" opacity="0.65"/></g>`;
    case 'trumpet':
      return `<g><path d="M-4 9 C-6 0 -12 -7 -18 -15 C-10 -25 11 -25 19 -14 C12 -7 6 0 4 9Z" fill="${p}"/><path d="M-18 -15 Q-9 -10 0 -15 Q9 -10 19 -14" fill="none" stroke="${s}" stroke-width="3"/><path d="M-4 9 L4 9 L2 21 L-2 21Z" fill="${s}"/><circle cy="-12" r="3" fill="${c}"/></g>`;
    case 'morning_glory':
      return `<g><path d="M0 4 C-9 0 -22 -4 -23 -15 C-16 -26 -7 -25 0 -19 C7 -25 17 -26 23 -15 C21 -4 10 0 0 4Z" fill="${p}"/><path d="M0 3 L-16 -15 M0 3 L16 -15 M0 3 L0 -19" stroke="${s}" stroke-width="2" opacity="0.75"/><circle cy="1" r="3" fill="${c}"/></g>`;
    case 'honeysuckle':
      return `<g>${Array.from({ length: 5 }, (_, i) => `<g transform="rotate(${i * 20 - 40})"><path d="M0 0 C3 -8 5 -15 4 -22" stroke="${i % 2 ? p : s}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M4 -22 Q10 -29 13 -22 Q8 -18 4 -22Z" fill="${p}"/><path d="M4 -20 Q12 -16 15 -9" stroke="${c}" stroke-width="0.8" fill="none"/></g>`).join('')}</g>`;
    case 'forsythia':
      return `<g>${radialPetals(6, 4.8, 9, p, 0)}<circle r="2.5" fill="${c}"/></g>`;
    case 'iris':
      return `<g><path d="M0 3 C-7 -8 -7 -25 0 -31 C7 -25 7 -8 0 3Z" fill="${s}"/><path d="M-2 2 C-14 -5 -23 -18 -18 -25 C-8 -23 -2 -12 -2 2Z" fill="${p}"/><path d="M2 2 C14 -5 23 -18 18 -25 C8 -23 2 -12 2 2Z" fill="${p}"/><path d="M0 1 C-8 9 -15 22 -10 29 C-2 24 1 12 0 1Z" fill="${p}"/><path d="M-1 1 C8 8 17 17 14 25 C5 23 0 12 -1 1Z" fill="${s}"/><path d="M0 2 Q-2 13 -7 22" stroke="${c}" stroke-width="2.5" fill="none"/></g>`;
    case 'clivia':
      return `<g>${Array.from({ length: 8 }, (_, i) => {
        const a = -70 + i * 20;
        return `<g transform="rotate(${a})"><path d="M0 0 L0 -15" stroke="${c}" stroke-width="1.2"/><path d="M-3 -14 C-9 -20 -8 -29 0 -33 C8 -29 9 -20 3 -14Z" fill="${i % 2 ? p : s}"/><circle cy="-25" r="1.5" fill="${c}"/></g>`;
      }).join('')}<circle r="3.4" fill="${c}"/></g>`;
    case 'osmanthus':
      return `<g>${Array.from({ length: 9 }, (_, i) => {
        const a = (i * Math.PI * 2) / 9;
        const x = Math.cos(a) * (5 + (i % 2) * 5);
        const y = Math.sin(a) * (5 + (i % 2) * 5);
        return `<g transform="translate(${n(x)} ${n(y)}) scale(.62)">${radialPetals(4, 3.6, 5.8, i % 2 ? p : s, 45)}<circle r="1.8" fill="${c}"/></g>`;
      }).join('')}</g>`;
    case 'crape_myrtle':
      return `<g>${Array.from({ length: 12 }, (_, i) => {
        const a = (i * 137.5 * Math.PI) / 180;
        const r = 3 + Math.sqrt(i) * 5;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        return `<path d="M${n(x)} ${n(y)} q-6 -5 -8 1 q3 7 8 2 q4 6 8 0 q-1 -7 -8 -4Z" fill="${i % 3 ? p : s}"/>`;
      }).join('')}<circle r="3" fill="${c}"/></g>`;
    case 'globe':
      return `<g><circle r="15" fill="${p}"/>${Array.from({ length: 18 }, (_, i) => {
        const a = (i * 137.5 * Math.PI) / 180;
        const r = Math.sqrt(i / 18) * 13;
        return `<circle cx="${n(Math.cos(a) * r)}" cy="${n(Math.sin(a) * r)}" r="2.2" fill="${i % 3 ? s : c}" opacity=".9"/>`;
      }).join('')}</g>`;
    case 'gardenia':
      return `<g>${radialPetals(8, 7.5, 12, p, 6)}${radialPetals(7, 5.5, 9, s, 22)}${radialPetals(5, 3.6, 6.5, p, 4)}<path d="M-3 1 Q0 -5 4 -1 Q1 5 -3 1Z" fill="${c}"/></g>`;
    case 'jasmine':
      return `<g>${radialPetals(6, 4.6, 9.5, p, 0)}<circle r="2.6" fill="${c}"/>${stamens(5, 4.3, s, 0.65)}</g>`;
    case 'balloon':
      return `<g><path d="M0 -24 L8 -8 L22 -5 L11 6 L13 21 L0 14 L-13 21 L-11 6 L-22 -5 L-8 -8Z" fill="${p}"/><path d="M0 -21 L0 12 M-19 -4 L10 5 M19 -4 L-10 5" stroke="${s}" stroke-width="1.2" opacity=".75"/><circle r="3.2" fill="${c}"/></g>`;
    case 'daylily':
      return `<g>${radialPetals(6, 6.8, 18, p, 0, -11)}<circle r="5.8" fill="${s}"/>${stamens(6, 12, c, 1)}</g>`;
    case 'hosta':
      return `<g><path d="M-5 -17 C-13 -9 -12 6 -4 15 L4 15 C12 6 13 -9 5 -17 Q0 -25 -5 -17Z" fill="${p}"/><path d="M-4 13 Q0 18 4 13" fill="none" stroke="${s}" stroke-width="2"/><path d="M0 12 L0 19" stroke="${c}" stroke-width="1"/></g>`;
    case 'impatiens':
      return `<g><path d="M0 2 C-14 8 -22 -2 -18 -14 C-8 -16 -2 -8 0 2Z" fill="${p}"/><path d="M0 2 C15 9 22 -2 17 -14 C8 -15 2 -7 0 2Z" fill="${s}"/><path d="M0 0 C-8 -8 -4 -21 4 -22 C12 -15 8 -5 0 0Z" fill="${p}"/><path d="M-3 4 Q-14 16 -20 13" stroke="${c}" stroke-width="2" fill="none"/><circle r="3" fill="${c}"/></g>`;
    case 'hollyhock':
      return `<g>${radialPetals(5, 10.5, 16, p, -10)}<circle r="7" fill="${s}"/>${stamens(14, 6.5, c, 0.9)}<circle r="2.4" fill="${c}"/></g>`;
    case 'pomegranate':
      return `<g><path d="M-9 4 L-12 -13 L-6 -19 L0 -14 L6 -20 L12 -13 L9 4Z" fill="${s}"/><path d="M-8 -9 C-17 -23 -6 -31 0 -21 C7 -32 18 -22 8 -9 C16 -5 13 8 3 7 C-3 13 -14 6 -8 -9Z" fill="${p}"/><circle cy="-7" r="3" fill="${c}"/></g>`;
    case 'cockscomb':
      return `<g><path d="M-20 16 C-27 6 -22 -2 -15 -3 C-23 -15 -12 -21 -5 -14 C-5 -28 8 -27 9 -15 C18 -23 27 -13 19 -4 C29 0 25 13 15 13 C8 23 -9 24 -20 16Z" fill="${p}"/><path d="M-17 10 Q-8 1 -16 -7 M-5 16 Q2 4 -3 -12 M8 14 Q17 4 11 -10" stroke="${s}" stroke-width="2.2" fill="none" opacity=".8"/><path d="M-15 15 Q0 24 16 13" stroke="${c}" stroke-width="2" fill="none"/></g>`;
    case 'poppy':
      return `<g><path d="M0 0 C-20 12 -30 -7 -18 -22 C-7 -24 -1 -13 0 0Z" fill="${p}"/><path d="M0 0 C20 12 30 -7 18 -22 C7 -24 1 -13 0 0Z" fill="${s}"/><path d="M0 0 C-12 -5 -13 -26 0 -29 C13 -26 12 -5 0 0Z" fill="${p}"/><path d="M0 0 C-11 8 -7 21 3 18 C12 14 9 4 0 0Z" fill="${s}"/><circle r="6" fill="${c}"/>${stamens(10, 7, '#1f1720', 0.8)}</g>`;
    case 'epiphyllum':
      return `<g>${radialPetals(12, 3.6, 23, p, 0, -15)}${radialPetals(9, 4.5, 17, s, 10, -11)}${radialPetals(7, 4, 12, p, 0, -8)}<circle cy="-1" r="4" fill="${c}"/>${stamens(13, 10, c, 0.75)}</g>`;
    case 'spider_lily':
      return `<g>${Array.from({ length: 6 }, (_, i) => `<g transform="rotate(${i * 60})"><path d="M0 0 C-3 -9 -9 -18 -3 -29 C2 -34 6 -29 3 -24 C-1 -17 3 -8 0 0Z" fill="${p}"/><path d="M0 -2 Q8 -19 17 -28" stroke="${s}" stroke-width="1.3" fill="none"/><circle cx="17" cy="-28" r="1.2" fill="${c}"/></g>`).join('')}<circle r="3.8" fill="${c}"/></g>`;
    case 'redbud':
      return `<g>${Array.from({ length: 7 }, (_, i) => {
        const a = (i * 51) * Math.PI / 180;
        const x = Math.cos(a) * (i % 2 ? 7 : 11);
        const y = Math.sin(a) * 8 - 5;
        return `<g transform="translate(${n(x)} ${n(y)}) rotate(${i * 17}) scale(.72)"><ellipse cx="-4" cy="0" rx="6" ry="4" fill="${p}"/><ellipse cx="4" cy="0" rx="6" ry="4" fill="${s}"/><path d="M-3 1 Q0 7 4 1" fill="${c}"/></g>`;
      }).join('')}</g>`;
  }
}

function renderBud(form: EasternFlowerForm, p: string, s: string, c: string, leaf: string): string {
  if (form === 'magnolia') {
    return `<g><path d="M-7 7 C-11 -8 -7 -27 0 -33 C8 -26 11 -8 7 7Z" fill="${p}"/><path d="M-7 7 Q0 1 7 7 L4 13 L-4 13Z" fill="${leaf}"/><path d="M-2 -25 Q1 -10 2 4" stroke="${s}" stroke-width="1.4" opacity=".75"/></g>`;
  }
  if (form === 'wisteria') {
    return `<g><path d="M0 -5 Q4 12 0 31" stroke="${leaf}" stroke-width="1.2" fill="none"/>${[0, 1, 2, 3, 4].map((i) => `<ellipse cx="${i % 2 ? 3 : -3}" cy="${i * 6}" rx="3.3" ry="5" fill="${i < 2 ? s : p}" transform="rotate(${i % 2 ? 24 : -24})"/>`).join('')}</g>`;
  }
  if (form === 'trumpet' || form === 'daylily' || form === 'hosta' || form === 'clivia') {
    return `<g><path d="M-4 8 C-7 -4 -4 -22 0 -29 C6 -21 8 -4 4 8Z" fill="${p}"/><path d="M-4 7 Q0 2 4 7 L3 14 L-3 14Z" fill="${leaf}"/><path d="M0 -24 L0 3" stroke="${s}" stroke-width="1.1" opacity=".7"/></g>`;
  }
  if (form === 'pomegranate') {
    return `<g><path d="M-7 7 L-9 -10 L-4 -16 L0 -12 L5 -17 L9 -10 L7 7Z" fill="${s}"/><ellipse cy="-4" rx="6" ry="10" fill="${p}"/><path d="M-5 -10 L0 -15 L5 -10" fill="none" stroke="${c}" stroke-width="1"/></g>`;
  }
  if (form === 'spider_lily') {
    return `<g><path d="M-4 9 C-7 -5 -4 -22 0 -29 C5 -20 7 -4 4 9Z" fill="${p}"/><path d="M-4 8 Q0 3 4 8" fill="${leaf}"/></g>`;
  }
  if (form === 'cockscomb') {
    return `<g><path d="M-8 10 C-12 1 -8 -10 0 -14 C8 -10 12 1 8 10Z" fill="${p}"/><path d="M-6 7 Q0 1 6 7" stroke="${s}" stroke-width="1.6" fill="none"/></g>`;
  }
  return `<g><path d="M-7 8 C-10 -4 -6 -19 0 -24 C7 -19 10 -4 7 8Z" fill="${p}"/><path d="M-7 7 Q0 1 7 7 L4 13 L-4 13Z" fill="${leaf}"/><path d="M-2 -15 Q0 -5 2 5" stroke="${s}" stroke-width="1" opacity=".72"/></g>`;
}

function renderBloomBack(form: EasternFlowerForm, p: string, s: string, leaf: string, variant = 0): string {
  if (form === 'wisteria' || form === 'osmanthus' || form === 'crape_myrtle' || form === 'globe' || form === 'redbud') {
    return `<g transform="scale(.78)">${renderBloom(form, p, s, leaf, variant)}<ellipse cy="2" rx="6" ry="4" fill="${leaf}" opacity=".88"/></g>`;
  }
  if (form === 'trumpet' || form === 'morning_glory' || form === 'daylily' || form === 'hosta') {
    return `<g transform="scale(.82 1)">${renderBloom(form, p, s, leaf, variant)}<path d="M-7 9 Q0 2 7 9 L4 17 L-4 17Z" fill="${leaf}" opacity=".92"/></g>`;
  }
  if (form === 'camellia' || form === 'kerria' || form === 'mutabilis') {
    return `<g transform="scale(.78)">${renderBloom(form, p, s, leaf, variant)}<path d="M-10 7 Q0 -1 10 7 L6 14 L0 10 L-6 14Z" fill="${leaf}" opacity=".9"/></g>`;
  }
  return `<g>${radialPetals(5, 6.4, 10.5, p, variant * 7)}<path d="M0 7 L-5 12 L0 10 L5 12Z" fill="${leaf}"/><circle r="3.8" fill="${s}" opacity=".55"/></g>`;
}

function defaultStage(form: EasternFlowerForm, index: number, count: number): BloomStage {
  const branchBloom = ['peach', 'apricot', 'pear', 'crabapple', 'wintersweet', 'magnolia', 'camellia', 'azalea', 'kerria', 'mutabilis', 'osmanthus', 'pomegranate', 'redbud'].includes(form);
  const clustered = ['wisteria', 'crape_myrtle', 'globe', 'clivia', 'cockscomb'].includes(form);
  if (count <= 3) return index === 0 ? 'open' : index === count - 1 ? 'bud' : 'half';
  if (branchBloom) {
    if (index >= count - 2) return 'bud';
    if (index === count - 3) return 'half';
    return 'open';
  }
  if (clustered) return index === count - 1 ? 'bud' : 'open';
  if (index === count - 1) return 'bud';
  if (index === count - 2) return 'half';
  return 'open';
}

function defaultFacing(index: number): BloomFacing {
  return (['three_quarter', 'front', 'side', 'back', 'three_quarter'] as BloomFacing[])[index % 5];
}

function renderBloomPose(
  form: EasternFlowerForm,
  point: EasternBloomPoint,
  index: number,
  count: number,
  p: string,
  s: string,
  c: string,
  leaf: string,
): string {
  const stage = point.stage ?? defaultStage(form, index, count);
  const facing = point.facing ?? defaultFacing(index);
  if (stage === 'bud') return renderBud(form, p, s, c, leaf);
  if (facing === 'back') return renderBloomBack(form, p, s, leaf, point.variant ?? index);

  const thickCorolla = form === 'camellia' || form === 'kerria' || form === 'mutabilis';
  const funnelCorolla = form === 'azalea';
  const facingScale = facing === 'side'
    ? thickCorolla ? .56 : funnelCorolla ? .46 : .36
    : facing === 'three_quarter'
      ? thickCorolla ? .82 : .72
      : 1;
  const stageScaleX = stage === 'half' ? .68 : 1;
  const stageScaleY = stage === 'half' ? .82 : 1;
  const calyx = stage === 'half'
    ? `<path d="M-7 8 Q0 2 7 8 L4 14 L-4 14Z" fill="${leaf}" opacity=".82"/>`
    : '';
  return `<g transform="scale(${n(facingScale * stageScaleX)} ${n(stageScaleY)})">${renderBloom(form, p, s, c, point.variant ?? index)}${calyx}</g>`;
}

function renderLeaf(shape: LeafShape, x: number, y: number, rotate: number, color: string, index: number, scale = 1): string {
  if (shape === 'none') return '';
  const dims = shape === 'narrow' ? [5, 22] : shape === 'round' ? [11, 14] : [9, 19];
  const serrated = shape === 'serrated' ? ' L7 -6 L4 -8 L9 -12 L3 -13 L5 -18 L0 -21 L-5 -18 L-3 -13 L-9 -12 L-4 -8 L-7 -6 Z' : '';
  const lobed = shape === 'lobed' ? ' L-4 -4 L-12 -6 L-8 -11 L-14 -16 L-6 -16 L-5 -24 L0 -19 L5 -24 L6 -16 L14 -16 L8 -11 L12 -6 L4 -4 Z' : '';
  const body = lobed || serrated || `C ${-dims[0]} ${-dims[1] * 0.35}, ${-dims[0]} ${-dims[1] * 0.85}, 0 ${-dims[1]} C ${dims[0]} ${-dims[1] * 0.85}, ${dims[0]} ${-dims[1] * 0.35}, 0 0 Z`;
  const sideVeins = shape === 'lobed'
    ? '<path d="M0 -8 L-9 -13 M0 -8 L9 -13 M0 -11 L-4 -19 M0 -11 L4 -19" stroke="#dcfce7" stroke-width=".55" opacity=".38"/>'
    : '';
  return `<g class="animate-leaf-sway-${(index % 3) + 1}-gentle" transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale})"><path d="M0 0 ${body}" fill="${color}"/><path d="M0 -2 L0 ${shape === 'lobed' ? -20 : -dims[1] + 3}" stroke="#dcfce7" stroke-width=".65" opacity=".45"/>${sideVeins}</g>`;
}

function adjustedPoint(point: EasternBloomPoint, spreadFactor: number, layout: FlowerLayout): EasternBloomPoint {
  if (layout === 'branch') return point;
  return { ...point, x: 75 + (point.x - 75) * spreadFactor, rotate: (point.rotate ?? 0) * spreadFactor };
}

function inferStemNature(spec: EasternFlowerSpec): StemNature {
  if (spec.stemNature) return spec.stemNature;
  if (spec.layout === 'branch') return 'woody';
  if (spec.layout === 'cascade' || spec.layout === 'arch') return 'vine';
  if (spec.layout === 'spike') return 'rigid';
  if (['iris', 'daylily', 'hosta', 'spider_lily', 'poppy'].includes(spec.form)) return 'scape';
  if (['camellia', 'pomegranate', 'redbud'].includes(spec.form)) return 'woody';
  return 'soft';
}

function renderBranchStructure(spec: EasternFlowerSpec, points: EasternBloomPoint[], stem: string, leaf: string, width: number): string {
  if (spec.woodyBranches?.length) {
    const hierarchyWidth = (branchWidth: number): number => branchWidth >= 1.9
      ? branchWidth + .38
      : branchWidth < .9
        ? branchWidth * .88
        : branchWidth;
    const underpainting = spec.woodyBranches.map((segment) => {
      const displayWidth = hierarchyWidth(segment.width);
      return `<path d="${segment.d}" stroke="#180d08" stroke-width="${n(displayWidth + (displayWidth >= 2 ? .48 : .28))}" fill="none" stroke-linecap="round" stroke-linejoin="bevel" opacity=".94"/>`;
    }).join('');
    const bark = spec.woodyBranches.map((segment) => {
      const displayWidth = hierarchyWidth(segment.width);
      const opacity = segment.width < .9 ? .86 : 1;
      return `<path d="${segment.d}" stroke="${stem}" stroke-width="${n(displayWidth)}" fill="none" stroke-linecap="round" stroke-linejoin="bevel" opacity="${opacity}"/>`;
    }).join('');
    const barkLights = spec.woodyBranches.map((segment, index) => {
      const displayWidth = hierarchyWidth(segment.width);
      const lightWidth = displayWidth >= 2 ? displayWidth * .16 : displayWidth * .1;
      return `<path d="${segment.d}" stroke="#f2cf9f" stroke-width="${n(Math.max(.16, lightWidth))}" fill="none" stroke-linecap="round" stroke-dasharray="${index % 2 ? '3 8' : '6 11'}" opacity="${displayWidth >= 2 ? .3 : .18}"/>`;
    }).join('');
    const branchCollars = spec.woodyBranches.map((segment, index) => {
      if (index === 0 || segment.width < 1 || segment.width >= 1.9) return '';
      const origin = segment.d.match(/^M\s*(-?[\d.]+)\s+(-?[\d.]+)/);
      if (!origin) return '';
      const x = Number(origin[1]);
      const y = Number(origin[2]);
      const rotate = index % 2 ? -24 : 24;
      const rx = 1.15 + segment.width * .36;
      const ry = .62 + segment.width * .14;
      return `<g transform="rotate(${rotate} ${x} ${y})"><ellipse cx="${x}" cy="${y}" rx="${n(rx)}" ry="${n(ry)}" fill="#24130d" stroke="${stem}" stroke-width=".46"/><path d="M${n(x - rx * .62)} ${n(y + .08)} Q${x} ${n(y - .5)} ${n(x + rx * .62)} ${n(y + .08)}" stroke="#e0ad7c" stroke-width=".32" fill="none" opacity=".56"/></g>`;
    }).join('');
    const knots = (spec.woodyKnots ?? []).map((knot) => {
      const rx = (knot.rx ?? 2.2) * .78;
      const ry = (knot.ry ?? 1.35) * .74;
      return `<g transform="rotate(${knot.rotate ?? 0} ${knot.x} ${knot.y})"><ellipse cx="${knot.x}" cy="${knot.y}" rx="${n(rx)}" ry="${n(ry)}" fill="#1f100b" stroke="${stem}" stroke-width=".48"/><ellipse cx="${n(knot.x + rx * .08)}" cy="${n(knot.y - ry * .08)}" rx="${n(rx * .42)}" ry="${n(ry * .42)}" fill="#0f0906" opacity=".72"/><path d="M${n(knot.x - rx * .66)} ${n(knot.y + .1)} Q${knot.x} ${n(knot.y - .62)} ${n(knot.x + rx * .66)} ${n(knot.y + .08)}" stroke="#d5a575" stroke-width=".34" fill="none" opacity=".64"/></g>`;
    }).join('');
    const leaves = (spec.leafPoints ?? []).map((point, index) =>
      renderLeaf(spec.leafShape ?? 'round', point.x, point.y, point.rotate, leaf, index, point.scale ?? 1),
    ).join('');
    return `<g id="${spec.id}Branches" class="animate-sway-woody-stem" style="transform-origin:75px 128px">${underpainting}${bark}${branchCollars}${barkLights}${knots}${leaves}</g>`;
  }

  const top = points.reduce((best, point) => point.y < best.y ? point : best, points[0]);
  const sweep = top.x < 75 ? -1 : 1;
  const trunk = `<path d="M75 131 C${72 - sweep * 4} 112, ${76 + sweep * 7} 91, ${top.x} ${top.y + 4}" stroke="${stem}" stroke-width="${n(width + 1.5)}" fill="none" stroke-linecap="round"/>`;
  const branches = points.filter((point) => point !== top).map((point, index) => {
    const joinY = 103 - index * 13;
    const joinX = 75 + sweep * (index * 2 - 3);
    const elbowX = point.x + (point.x < joinX ? 11 : -11);
    return `<path d="M${n(joinX)} ${n(joinY)} Q${n(elbowX)} ${n((joinY + point.y) / 2 + (index % 2 ? 5 : -4))} ${n(point.x)} ${n(point.y + 3)}" stroke="${stem}" stroke-width="${n(Math.max(1.25, width - index * .34))}" fill="none" stroke-linecap="round"/>`;
  }).join('');
  const knots = points.slice(0, 4).map((point, index) => `<circle cx="${n(74 + sweep * (index - 1))}" cy="${n(103 - index * 13)}" r="${n(Math.max(1.2, 2.2 - index * .22))}" fill="${stem}"/>`).join('');
  const leaves = points.slice(1, 5).map((point, index) => {
    const lx = 75 + (point.x - 75) * .52 + (index % 2 ? -5 : 5);
    const ly = 111 + (point.y - 111) * .52;
    const rotation = point.x < 75 ? -62 - index * 7 : 58 + index * 6;
    return renderLeaf(spec.leafShape ?? 'round', lx, ly, rotation, leaf, index);
  }).join('');
  return `<g id="${spec.id}Branches">${trunk}${branches}${knots}${leaves}</g>`;
}

function renderSpikeStructure(spec: EasternFlowerSpec, points: EasternBloomPoint[], stem: string, leaf: string, width: number): string {
  const topY = Math.min(...points.map((point) => point.y));
  const main = `<path d="M75 131 C74 98 76 62 75 ${n(topY + 2)}" stroke="${stem}" stroke-width="${n(width + .6)}" fill="none" stroke-linecap="round"/>`;
  const pedicels = points.map((point, index) => {
    const jointY = Math.max(point.y + 5, topY + index * 13);
    return `<path d="M75 ${n(jointY)} Q${n((75 + point.x) / 2)} ${n(point.y + 8)} ${n(point.x)} ${n(point.y + 3)}" stroke="${stem}" stroke-width="${n(Math.max(1.1, width - .8 - index * .12))}" fill="none" stroke-linecap="round"/>`;
  }).join('');
  const baseLeaves = [
    renderLeaf(spec.leafShape ?? 'broad', 72, 126, -40, leaf, 0),
    renderLeaf(spec.leafShape ?? 'broad', 78, 126, 40, leaf, 1),
    renderLeaf(spec.leafShape ?? 'broad', 74, 118, -18, leaf, 2),
  ].join('');
  return `<g id="${spec.id}Spike">${main}${pedicels}${baseLeaves}</g>`;
}

function renderVineStructure(spec: EasternFlowerSpec, points: EasternBloomPoint[], stem: string, leaf: string, width: number): string {
  const sorted = [...points].sort((a, b) => a.x - b.x);
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  const axis = spec.layout === 'cascade'
    ? `<path d="M75 131 C66 98 60 58 ${n(first.x)} ${n(first.y + 4)} C72 ${n(first.y - 10)} 95 ${n(last.y - 4)} ${n(last.x)} ${n(last.y + 4)}" stroke="${stem}" stroke-width="${n(width + .65)}" fill="none" stroke-linecap="round"/>`
    : `<path d="M75 131 C66 96 65 63 78 39 C89 20 106 26 ${n(last.x)} ${n(last.y + 4)}" stroke="${stem}" stroke-width="${n(width + .5)}" fill="none" stroke-linecap="round"/>`;
  const pedicels = points.map((point, index) => {
    const rootX = 73 + (point.x - 75) * .42;
    const rootY = 104 + (point.y - 104) * .42;
    const controlX = point.x + (index % 2 ? 9 : -9);
    return `<path d="M${n(rootX)} ${n(rootY)} Q${n(controlX)} ${n((rootY + point.y) / 2)} ${n(point.x)} ${n(point.y + 3)}" stroke="${stem}" stroke-width="${n(Math.max(1.1, width - .45 - index * .12))}" fill="none" stroke-linecap="round"/>`;
  }).join('');
  const leaves = points.slice(0, 4).map((point, index) => renderLeaf(
    spec.leafShape ?? 'round',
    75 + (point.x - 75) * .42,
    106 + (point.y - 106) * .42,
    point.x < 75 ? -72 : 72,
    leaf,
    index,
  )).join('');
  return `<g id="${spec.id}Vine">${axis}${pedicels}${leaves}</g>`;
}

function renderStemBundle(spec: EasternFlowerSpec, points: EasternBloomPoint[], stem: string, leaf: string, width: number, nature: StemNature): string {
  const paths = points.map((point, index) => {
    const rootX = 72.5 + (index % 4) * 1.7;
    const dx = point.x - rootX;
    if (nature === 'rigid' || nature === 'scape') {
      return `<path d="M${n(rootX)} 131 C${n(rootX + dx * .1)} 104, ${n(point.x - dx * .08)} ${n(point.y + 22)}, ${n(point.x)} ${n(point.y + 3)}" stroke="${stem}" stroke-width="${n(Math.max(1.2, width - index * .16))}" fill="none" stroke-linecap="round"/>`;
    }
    if (nature === 'woody') {
      return `<path d="M${n(rootX)} 131 L${n(rootX + dx * .2)} 106 Q${n(point.x - dx * .35)} ${n(point.y + 28)} ${n(point.x)} ${n(point.y + 3)}" stroke="${stem}" stroke-width="${n(Math.max(1.25, width - index * .18))}" fill="none" stroke-linecap="round"/>`;
    }
    const bow = (index % 2 ? 1 : -1) * (8 + index * 1.5);
    return `<path d="M${n(rootX)} 131 C${n(rootX + bow)} 105, ${n(point.x - bow)} ${n(point.y + 26)}, ${n(point.x)} ${n(point.y + 3)}" stroke="${stem}" stroke-width="${n(Math.max(1.15, width - index * .18))}" fill="none" stroke-linecap="round"/>`;
  }).join('');
  const leafCount = nature === 'scape' ? 3 : Math.min(5, points.length);
  const leaves = points.slice(0, leafCount).map((point, index) => {
    const t = nature === 'scape' ? .28 + index * .08 : .48 + (index % 3) * .1;
    const x = 75 + (point.x - 75) * t + (index % 2 ? 4 : -4);
    const y = 130 + (point.y - 130) * t;
    const rotation = point.x < 75 ? -52 - index * 7 : 54 + index * 7;
    return renderLeaf(spec.leafShape ?? 'broad', x, y, rotation, leaf, index);
  }).join('');
  return `<g id="${spec.id}Stems">${paths}${leaves}</g>`;
}

function renderStructure(spec: EasternFlowerSpec, points: EasternBloomPoint[], stem: string, leaf: string): string {
  const nature = inferStemNature(spec);
  const width = spec.stemWidth ?? (nature === 'woody' ? 3.1 : nature === 'rigid' ? 3 : nature === 'scape' ? 2.1 : 2.5);
  if (spec.layout === 'branch') return renderBranchStructure(spec, points, stem, leaf, width);
  if (spec.layout === 'spike') return renderSpikeStructure(spec, points, stem, leaf, width);
  if (spec.layout === 'cascade' || spec.layout === 'arch') return renderVineStructure(spec, points, stem, leaf, width);
  return renderStemBundle(spec, points, stem, leaf, width, nature);
}

export function renderEasternFlower(spec: EasternFlowerSpec, props: FlowerRenderProps): string {
  const { health, dryFactor, isFaded, spreadFactor = 1 } = props;
  const primary = lerpColor(spec.primary, spec.agedPrimary, dryFactor);
  const secondary = lerpColor(spec.secondary, spec.agedSecondary, dryFactor);
  const center = lerpColor(spec.center, '#7a542b', dryFactor);
  const stem = lerpColor(spec.stem ?? '#2f6b32', spec.agedStem ?? '#4d3a28', dryFactor);
  const leaf = lerpColor(spec.leaf ?? '#2f7d3b', spec.agedLeaf ?? '#625137', dryFactor);
  const points = spec.blooms.map((point) => adjustedPoint(point, spreadFactor, spec.layout));
  const agingStyle = getFlowerAgingFilter(health, isFaded);
  const modeledForms: EasternFlowerForm[] = ['peach', 'apricot', 'pear', 'crabapple', 'wintersweet', 'magnolia', 'camellia', 'azalea', 'kerria', 'mutabilis'];
  const hasModeledPetals = modeledForms.includes(spec.form);
  const paleEdged = spec.form === 'apricot' || spec.form === 'pear' || spec.form === 'magnolia';
  const petalBase = paleEdged ? secondary : primary;
  const petalEdge = paleEdged ? primary : secondary;
  const bloomPrimary = hasModeledPetals ? `url(#${spec.id}PetalFace)` : primary;
  const bloomSecondary = hasModeledPetals ? `url(#${spec.id}PetalDepth)` : secondary;

  return `<g id="${spec.id}Flora" style="${agingStyle}">
    <defs>
      <filter id="${spec.id}SoftShadow" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="0.7" dy="1.2" stdDeviation="1" flood-color="#140d07" flood-opacity=".24"/>
      </filter>
      ${hasModeledPetals ? `<radialGradient id="${spec.id}PetalFace" cx="50%" cy="58%" r="72%">
        <stop offset="0" stop-color="${petalBase}"/>
        <stop offset=".42" stop-color="${petalBase}"/>
        <stop offset="1" stop-color="${petalEdge}"/>
      </radialGradient>
      <linearGradient id="${spec.id}PetalDepth" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stop-color="${secondary}"/>
        <stop offset=".58" stop-color="${primary}"/>
        <stop offset="1" stop-color="#fff" stop-opacity=".88"/>
      </linearGradient>` : ''}
    </defs>
    ${renderStructure(spec, points, stem, leaf)}
    <g id="${spec.id}Blooms" filter="url(#${spec.id}SoftShadow)">
      ${points.map((point, index) => {
        const state = getBlossomDropStyle(health, point.threshold ?? Math.max(.06, .5 - index * .085));
        return `<g transform="translate(${n(point.x)} ${n(point.y)}) rotate(${n(point.rotate ?? 0)}) scale(${n(point.scale ?? 1)})" style="opacity:${state.opacity};transform-box:fill-box;transform-origin:center;transition:opacity .8s ease-out">
          <g class="animate-flower-sway-${index % 3 === 0 ? 'main' : index % 3 === 1 ? 'left' : 'right'}-gentle" style="transform:translateY(${n(state.droopY)}px)">
            ${renderBloomPose(spec.form, point, index, points.length, bloomPrimary, bloomSecondary, center, leaf)}
          </g>
        </g>`;
      }).join('')}
    </g>
  </g>`;
}
