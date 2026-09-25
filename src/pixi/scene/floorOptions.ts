/**
 * @file floorOptions.ts
 * @description 地坪材质选项（领域数据）。
 *
 * 仅供 UI 面板展示与选择；地坪的实际渲染由 FloorLayer 以 PerspectiveMesh 完成，
 * 早已不再依赖旧版 DOM 场景元素。
 */
import type { FloorStyle } from '../../types';

/** 地坪材质选项（UI 面板用于展示与选择） */
export const FLOOR_STYLE_OPTIONS: {
  id: FloorStyle;
  name: string;
  poeticTitle: string;
  desc: string;
  iconText: string;
  tag: string;
  textureUrl: string;
}[] = [
  {
    id: 'hinoki_wood',
    name: '日式浅暖原木',
    poeticTitle: '晴岚暖木',
    desc: '对标参考图 1！阳光倾洒茶室的明朗浅橡原木大长板，温厚治愈，透视纵深开阔。',
    iconText: '🪵',
    tag: '图1核心推荐',
    textureUrl: '/textures/hinoki_wood.jpg',
  },
  {
    id: 'walnut_plank',
    name: '自然胡桃宽板',
    poeticTitle: '檀影温润',
    desc: '对标参考图 3！北美黑胡桃宽板错缝地板，木纹舒展流淌，斜切微倒角温润高级。',
    iconText: '🌲',
    tag: '图3奢雅质感',
    textureUrl: '/textures/walnut_plank.jpg',
  },
  {
    id: 'herringbone_wood',
    name: '暖木人字拼花',
    poeticTitle: '暖木拼花',
    desc: '对标参考图 2！经典手绘橡木人字拼实木地板，交织错落，立体层次分明。',
    iconText: '🏡',
    tag: '图2经典大宅',
    textureUrl: '/textures/herringbone_wood.jpg',
  },
  {
    id: 'zen_tatami',
    name: '禅意草木素席',
    poeticTitle: '幽香素席',
    desc: '对标参考图 1 禅意座榻！日式草木素麻编织地席配雅致深色包边，质朴静谧。',
    iconText: '🍵',
    tag: '图1茶室禅风',
    textureUrl: '/textures/zen_tatami.jpg',
  },
  {
    id: 'marble_tile',
    name: '汉白玉大理石',
    poeticTitle: '如意方砖',
    desc: '原版受好评的皇家级云石大方砖，光洁温润，美缝清晰，带近大远小倒影反光。',
    iconText: '🏛️',
    tag: '光洁高华',
    textureUrl: '/textures/marble_tile.jpg',
  },
];
