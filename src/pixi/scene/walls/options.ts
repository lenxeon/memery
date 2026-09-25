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
  { id: 'classic_dawn', name: '晴岚映曜', poeticTitle: '晨光沐影', iconText: '🏛️', desc: '支摘槛窗 · 横披纳远岫、冰裂格心透光', tag: '经典圣洁' },
  { id: 'heritage_wood', name: '暮林晚钟', poeticTitle: '沉香花格', iconText: '🏮', desc: '紫檀落地罩 · 素壁留白只嵌一扇冰裂漏窗', tag: '传家古韵' },
  { id: 'royal_drape',   name: '华彩生光', poeticTitle: '皇家帷幔', iconText: '🎭', desc: '深绛丝绒帷幔半开 · 幔内月洞一线远岫', tag: '庄重华美' },
  { id: 'bronze_mirror', name: '圆满如月', poeticTitle: '铜镜华光', iconText: '🌕', desc: '圆光罩镶镏金铜镜 · 莲瓣铸边镜中借景', tag: '圆满通达' },
  { id: 'brick_screen',  name: '古朴苍然', poeticTitle: '月洞空灵', iconText: '🪟', desc: '月洞门水墨二重远山 · 冰裂漏窗竹影宫灯', tag: '东方雅意' },
  { id: 'lotus_mandorla',name: '宝相庄严', poeticTitle: '莲台佛境', iconText: '🪷', desc: '佛龛欢门暖金 · 两层宝相花莲台一缕清香', tag: '福佑庄严' },
];

