/**
 * @file types.ts
 * @description 「物件典藏」文化元数据协议层。
 *
 * 每一花、一器、一果、一纹样，都记录其朝代、出处、典故与诗证。
 * 关键约定：authenticity 必须如实标注 —— 典籍可考 / 民俗相传 / 近现代，
 * 不可把民俗谐音包装成古籍出处，也不可给近代传入的作物硬编朝代。
 */

/** 出处可信度分级 */
export type LoreAuthenticity = 'canon' | 'folk' | 'modern';

/** 物件门类 */
export type LoreCategory = 'flower' | 'fruit' | 'vessel' | 'pattern';

/** 诗句佐证 */
export interface RelicPoem {
  /** 诗句正文 */
  text: string;
  /** 诗题 */
  title: string;
  /** 作者（含朝代，如「唐·刘禹锡」） */
  author: string;
}

/** 单件物件的文化档案 */
export interface RelicLore {
  /** 唯一 id：花/果沿用业务 id（如 'peonies'、'apples'），器与纹样用独立 id */
  id: string;
  category: LoreCategory;
  /** 通行名称 */
  name: string;
  /** 四字诗意别名 */
  poeticTitle?: string;
  /** 盛行或最早可考的朝代 */
  dynasty?: string;
  /** 出处：文献篇目或实物来源 */
  origin?: string;
  /** 典故正文 */
  allusion: string;
  /** 诗证（无可靠诗证时留空，不硬凑） */
  poem?: RelicPoem;
  /** 祭祀礼俗中的用法与宜忌 */
  ritual?: string;
  /** 辨误或补充（同名异物、古义今义之别） */
  note?: string;
  /** 出处可信度 */
  authenticity: LoreAuthenticity;
  /** 相关物件 id，可在卡片内跳转 */
  related?: string[];
}

export const AUTHENTICITY_META: Record<
  LoreAuthenticity,
  { label: string; hint: string; color: string; bg: string }
> = {
  canon: {
    label: '典籍可考',
    hint: '有传世文献或出土实物佐证',
    color: '#0f766e',
    bg: 'rgba(15,118,110,0.10)',
  },
  folk: {
    label: '民俗相传',
    hint: '民间吉语、谐音与岁时礼俗，非古籍出处',
    color: '#a16207',
    bg: 'rgba(161,98,7,0.10)',
  },
  modern: {
    label: '近现代',
    hint: '域外传入或近世通行，古无此制',
    color: '#64748b',
    bg: 'rgba(100,116,139,0.10)',
  },
};

export const CATEGORY_LABEL: Record<LoreCategory, string> = {
  flower: '供花',
  fruit: '供果',
  vessel: '礼器',
  pattern: '纹样',
};

/** 真实性分级的展示顺序（卡片徽标排序用） */
export const AUTHENTICITY_ORDER: LoreAuthenticity[] = ['canon', 'folk', 'modern'];
