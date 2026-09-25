/**
 * @file auditCatalog.ts
 * @description 专项审计展台的「动态目录」：名花与花器全量清单 + 每组 5 件的分页游标。
 *
 * 设计要点：
 * - 目录直接来自注册表（FLOWER_REGISTRY / VASE_STYLES），新增花材或新瓶后
 *   自动进入审计队列，无需再改动任何展台代码；
 * - 展台一次只陈 5 件（AUDIT_PAGE_SIZE），翻页即换下一组，末组之后回到首组；
 * - 本模块只做「目录与页码」的纯计算，不生成 SceneItem（生成在 sceneItems.ts）。
 */
import { AuditCategory, FlowerType } from '../types';
import { FLOWER_REGISTRY, VASE_STYLES, getVaseStyleMeta } from '../pixi';
import type { VaseStyle } from '../pixi';

/** 每组审计件数（一名花/一花器各占一席） */
export const AUDIT_PAGE_SIZE = 5;

/** 目录条目：带全局序号，便于展台上标注「第 N 号」 */
export interface AuditCatalogEntry {
  /** 全局序号，从 1 起 */
  no: number;
  id: string;
  name: string;
  /** 副题（名花用诗题、花器用形制标签） */
  sub: string;
}

/** 名花全量目录（顺序 = 注册表登记顺序） */
export const AUDIT_FLOWER_CATALOG: AuditCatalogEntry[] = (
  Object.keys(FLOWER_REGISTRY) as FlowerType[]
).map((id, index) => ({
  no: index + 1,
  id,
  name: FLOWER_REGISTRY[id]?.name || id,
  sub: FLOWER_REGISTRY[id]?.poeticTitle || '',
}));

/** 花器全量目录（顺序 = 形制注册表登记顺序） */
export const AUDIT_VASE_CATALOG: AuditCatalogEntry[] = VASE_STYLES.map((vase, index) => {
  const meta = getVaseStyleMeta(vase.id as VaseStyle);
  return {
    no: index + 1,
    id: meta.id,
    name: meta.name,
    sub: meta.tag,
  };
});

/** 按类别取目录（案台无目录，返回空数组） */
export const getAuditCatalog = (category: AuditCategory): AuditCatalogEntry[] =>
  category === 'vases' ? AUDIT_VASE_CATALOG : AUDIT_FLOWER_CATALOG;

/** 目录总件数 */
export const getAuditCatalogSize = (category: AuditCategory): number =>
  getAuditCatalog(category).length;

/** 总组数（向上取整，至少 1 组） */
export const getAuditPageCount = (category: AuditCategory): number =>
  Math.max(1, Math.ceil(getAuditCatalogSize(category) / AUDIT_PAGE_SIZE));

/** 把任意页码收敛到合法区间（支持负数与越界，末组之后回到首组） */
export const normalizeAuditPage = (category: AuditCategory, page: number): number => {
  const count = getAuditPageCount(category);
  return ((Math.floor(page) % count) + count) % count;
};

/** 取某一组要陈的条目（末组可能不足 5 件） */
export const getAuditPageEntries = (
  category: AuditCategory,
  page: number
): AuditCatalogEntry[] => {
  const catalog = getAuditCatalog(category);
  const start = normalizeAuditPage(category, page) * AUDIT_PAGE_SIZE;
  return catalog.slice(start, start + AUDIT_PAGE_SIZE);
};

/** 展台条目标签：`12. 玄墨梅瓶 · 玄墨静影` */
export const formatAuditEntryLabel = (entry: AuditCatalogEntry): string =>
  `${entry.no}. ${entry.name}${entry.sub ? ` · ${entry.sub}` : ''}`;
