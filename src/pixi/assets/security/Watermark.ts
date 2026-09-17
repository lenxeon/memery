/**
 * @file Watermark.ts
 * @description 隐蔽式数字资产几何水印保护系统。
 * 采用微几何坐标隐写术（Geometric Decimal Steganography）：
 * 将 "lenxeon" 的 ASCII 码 [108, 101, 110, 120, 101, 111, 110] 编码为零渲染贝塞尔路径的小数位微扰动。
 * 不含任何明文标签、注释或特殊属性，彻底杜绝审查元素识别，同时具备数学可验证性。
 */

const SIG_BYTES = [108, 101, 110, 120, 101, 111, 110]; // "lenxeon"

/**
 * 生成隐蔽微几何路径节点。
 * 坐标为微米级无绘制路径，完全合规嵌入 SVG 渲染树中。
 */
export function getGeometricWatermark(): string {
  // 构造隐写路径：M 0.108 0.101 C 0.110 0.120 0.101 0.111 0.110 0.108
  return `<path d="M 0.${SIG_BYTES[0]} 0.${SIG_BYTES[1]} C 0.${SIG_BYTES[2]} 0.${SIG_BYTES[3]} 0.${SIG_BYTES[4]} 0.${SIG_BYTES[5]} 0.${SIG_BYTES[6]} 0.${SIG_BYTES[0]}" fill="none" stroke="none" pointer-events="none" />`;
}

/**
 * 验证 SVG 字符串中是否包含有效的数字资产签名
 */
export function verifyWatermark(svgString: string): boolean {
  const targetPattern = /0\.108\s+0\.101\s+C\s+0\.110\s+0\.120\s+0\.101\s+0\.111\s+0\.110/;
  return targetPattern.test(svgString);
}
