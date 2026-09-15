/**
 * @file lifecycle.ts
 * @description 花卉生长时间与绽放状态生命周期工具函数。
 */
// 颜色线性插值工具：真实模拟花瓣与叶片从鲜活到干枯褐变的过程
export function lerpColor(hex1: string, hex2: string, factor: number): string {
  const clampF = Math.max(0, Math.min(1, factor));
  const parse = (h: string) => {
    const hex = h.replace('#', '');
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16),
    };
  };
  const c1 = parse(hex1);
  const c2 = parse(hex2);
  const r = Math.round(c1.r + (c2.r - c1.r) * clampF);
  const g = Math.round(c1.g + (c2.g - c1.g) * clampF);
  const b = Math.round(c1.b + (c2.b - c1.b) * clampF);
  return `rgb(${r}, ${g}, ${b})`;
}

// 枝头花瓣逐层脱落状态计算
export function getBlossomDropStyle(health: number, dropThreshold: number) {
  if (health > dropThreshold) {
    const approach = Math.max(0, (dropThreshold + 0.12 - health) / 0.12);
    return {
      opacity: 1,
      droopY: approach * 4.0,
      isShed: false,
    };
  }
  return {
    opacity: 0,
    droopY: 8,
    isShed: true,
  };
}
