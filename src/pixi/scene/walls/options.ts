/**
 * @file options.ts
 * @description 背景墙风格选项（渲染域领域数据）。
 * 风格定义本身属于空间场景，UI 面板只读取用于展示与选择。
 */
import { WallBackgroundStyle } from '../../../types';

export const WALL_STYLE_OPTIONS: {
  id: WallBackgroundStyle;
  name: string;
  poeticTitle: string;
  iconText: string;
  desc: string;
  tag: string;
}[] = [
  { id: 'classic_dawn', name: '晴岚映曜', poeticTitle: '晨光沐影', iconText: '🏛️', desc: '欧式砂岩暖拱景窗 · 晨岚金辉丁达尔光', tag: '经典圣洁' },
  { id: 'heritage_wood', name: '暮林晚钟', poeticTitle: '沉香花格', iconText: '🏮', desc: '紫檀老木雕花隔扇 · 透光手工云龙皮纸影壁', tag: '传家古韵' },
  { id: 'royal_drape',    name: '华彩生光', poeticTitle: '皇家帷幔', iconText: '🎭', desc: '深绯皇家丝绒帷幔金绳流苏 · 暖金华彩透光', tag: '庄重华美' },
  { id: 'bronze_mirror',  name: '圆满如月', poeticTitle: '铜镜华光', iconText: '🌕', desc: '古法镏金大圆铜镜莲纹铸边 · 暖辉圆满映照', tag: '圆满通达' },
  { id: 'brick_screen',   name: '古朴苍然', poeticTitle: '月洞空灵', iconText: '🪟', desc: '月亮门水墨远山千道金芒 · 斑驳竹影落地宫灯暖念墙', tag: '东方雅意' },
  { id: 'lotus_mandorla', name: '宝相庄严', poeticTitle: '莲台佛境', iconText: '🪷', desc: '盛唐泥金宝相莲花曼陀罗 · 佛光福佑庄严', tag: '福佑庄严' },
];

