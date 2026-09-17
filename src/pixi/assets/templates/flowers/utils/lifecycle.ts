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

/**
 * 花卉生命周期通用色彩老化视觉滤镜
 * 坚决保持 100% 物理不透明度（拒绝幽灵半透明透景），真实模拟现实花枝水分散失、色泽变暗、枯黄褐变过程。
 */
export function getFlowerAgingFilter(health: number, isFaded: boolean = false): string {
  const clampedHealth = Math.max(0, Math.min(1.0, health));
  // 亮度：1.0(盛开) -> 0.78(微枯55%) -> 0.55(岁暮15%)
  const brightness = isFaded ? 0.45 : Math.max(0.5, 0.52 + 0.48 * clampedHealth);
  // 饱和度：1.0(盛开) -> 0.71(微枯55%) -> 0.44(岁暮15%)
  const saturate = isFaded ? 0.25 : Math.max(0.32, 0.35 + 0.65 * clampedHealth);
  // 枯黄褐变 (sepia)：随着生机减退逐步渗入干黄褐调
  const sepia = Math.max(0, Math.min(0.35, (0.8 - clampedHealth) * 0.45));

  return `filter: brightness(${brightness.toFixed(3)}) saturate(${saturate.toFixed(3)}) sepia(${sepia.toFixed(3)}); opacity: 1; transition: filter 0.6s ease-out;`;
}

