/**
 * @file index.ts
 * @description 物件典藏总索引：聚合四类档案，提供查档与场景物件映射。
 */
import type { LoreCategory, RelicLore } from './types';
import { FLOWER_LORE } from './flowers';
import { FRUIT_LORE } from './fruits';
import { VESSEL_LORE } from './vessels';
import { PATTERN_LORE } from './patterns';

export * from './types';
export { FLOWER_LORE, FRUIT_LORE, VESSEL_LORE, PATTERN_LORE };

/** 全量档案 */
export const ALL_LORE: RelicLore[] = [...FLOWER_LORE, ...FRUIT_LORE, ...VESSEL_LORE, ...PATTERN_LORE];

const LORE_MAP: Map<string, RelicLore> = new Map(ALL_LORE.map((item) => [item.id, item]));

/** 按 id 查档；未收录返回 undefined */
export const getRelicLore = (id?: string | null): RelicLore | undefined =>
  id ? LORE_MAP.get(id) : undefined;

/** 是否已收录典故 */
export const hasRelicLore = (id?: string | null): boolean => !!id && LORE_MAP.has(id);

/** 按门类取档（图鉴分页用） */
export const getLoreByCategory = (category: LoreCategory): RelicLore[] =>
  ALL_LORE.filter((item) => item.category === category);

/** 场景物件携带的可变材质信息（花材 / 器型 / 果品） */
export interface LoreSceneItemHint {
  flowerType?: string;
  vaseStyle?: string;
  fruitType?: string;
}

/**
 * 把场景物件 id 映射到档案 id。
 * 供瓶优先返回所插花材的典故，其次器型，最后落到「供瓶」总条目。
 */
export const resolveSceneItemLoreId = (sceneId: string, item?: LoreSceneItemHint): string | undefined => {
  if (sceneId === 'censer') return 'censer';
  if (sceneId.startsWith('candle')) return 'candle';
  if (sceneId === 'tea_cups') return 'tea_cups';
  if (sceneId === 'singing_bowl') return 'singing_bowl';

  if (sceneId.startsWith('fruit')) {
    return item?.fruitType || undefined;
  }

  if (sceneId.startsWith('vase') || sceneId.startsWith('offered_flower')) {
    if (item?.flowerType && hasRelicLore(item.flowerType)) return item.flowerType;
    if (item?.vaseStyle && hasRelicLore(item.vaseStyle)) return item.vaseStyle;
    return 'vase';
  }

  return hasRelicLore(sceneId) ? sceneId : undefined;
};

/** 桌布主题 → 其边饰纹样档案 id（无明确纹样者不映射） */
const TABLECLOTH_PATTERN_LORE: Record<string, string> = {
  autumn_gold: 'pattern_meander',
  cinnabar_red: 'pattern_wanzi',
  moonlight_white: 'pattern_ruyi',
  evergreen_pine: 'pattern_badayun',
  sandalwood_purple: 'pattern_lianzhu',
};

/** 取桌布边饰所用纹样的档案 id */
export const resolveTableclothLoreId = (tableclothStyle?: string | null): string | undefined =>
  tableclothStyle ? TABLECLOTH_PATTERN_LORE[tableclothStyle] : undefined;

/** 关键词检索（名称、诗意名、朝代、典故、诗句） */
export const searchRelicLore = (keyword: string): RelicLore[] => {
  const kw = keyword.trim().toLowerCase();
  if (!kw) return ALL_LORE;
  return ALL_LORE.filter((item) =>
    [item.name, item.poeticTitle, item.dynasty, item.origin, item.allusion, item.poem?.text, item.poem?.title]
      .filter(Boolean)
      .some((field) => (field as string).toLowerCase().includes(kw))
  );
};
