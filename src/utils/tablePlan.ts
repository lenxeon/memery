/**
 * @file tablePlan.ts
 * @description 供案桌面平面布局求解器。
 *
 * 坐标系与 `SceneItem.position` 完全一致：
 * - x：相对案心的横向偏移，负为左、正为右；
 * - y：案面纵深，0 = 紧贴台面前沿，负值向案里（后方）退，可用带约 [-54, 0]。
 *
 * 新贡品上案时不再使用「按数量奇偶取固定偏移」的粗放排布（多件时会层层重叠），
 * 而是：1) 汇总案面既有占位；2) 在案面可用平面内采样候选点，用椭圆距离判定干涉
 * （横向按占地半径严格要求，纵向按透视厚度放宽，允许前后错落遮挡）；
 * 3) 按「不重叠 / 纵深合宜 / 近案心 / 左右均衡」评分选出相对最优摆位；
 * 4) 案面排满时自动降级为「干涉最小」的点，保证永远有解。
 */
import { SceneItem } from '../types';

export interface PlanSpot {
  x: number;
  y: number;
}

/** 案面可摆放平面范围（x 横向，y 纵深，已收敛掉案沿与后幕） */
export const TABLE_PLAN_BOUNDS = {
  xMin: -240,
  xMax: 240,
  yMin: -50,
  yMax: -4,
};

/**
 * 未记录 position 的固定陈设默认摆位。
 * 与 PropsLayer 的默认布局基准值保持同量纲，用于占位避让。
 */
const DEFAULT_SPOTS: Record<string, PlanSpot> = {
  // 与 PropsLayer 默认布局同基准（xOffset 已随桌宽放大，取常用桌宽下的近似值）
  vase_left: { x: -190, y: -39 },
  vase_right: { x: 190, y: -39 },
  candle_left: { x: -95, y: -28 },
  candle_right: { x: 95, y: -28 },
  fruit_left: { x: -150, y: -16 },
  fruit_right: { x: 150, y: -16 },
  censer: { x: 0, y: -37 },
  tea_cups: { x: 0, y: -12 },
  singing_bowl: { x: -62, y: -18 },
};

/**
 * 占地半宽（横向）与透视厚度（纵深）。
 * 横向按道具实际占地半宽换算到布局量纲；纵深因台面进深仅约 54 单位而显著压缩，
 * 取较小的厚度值，允许前后错落（后排被前排部分遮挡是透视中的自然观感）。
 */
const FOOTPRINT = {
  vase: { rx: 68, ry: 16 },
  candle: { rx: 13, ry: 8 },
  censer: { rx: 39, ry: 12 },
  tea_cups: { rx: 49, ry: 12 },
  singing_bowl: { rx: 37, ry: 10 },
  fruit: { rx: 49, ry: 14 },
  flower: { rx: 59, ry: 14 },
} as const;

const DEFAULT_FOOTPRINT = { rx: 46, ry: 12 };

interface Occupancy extends PlanSpot {
  rx: number;
  ry: number;
}

interface Candidate extends PlanSpot {
  /** 归一化干涉余量：≥0 表示与既有道具不重叠，负值代表越挤 */
  clearance: number;
}

export interface TablePlanOptions {
  /** 待摆放道具的占地半宽，默认取花束尺寸 */
  radius?: number;
  /** 待摆放道具的纵深厚度，默认取花束尺寸 */
  depthRadius?: number;
  /** 期望的最小横向净间隙，默认 12；案面拥挤时自动放宽 */
  minGap?: number;
  /** 期望的纵深位置（越大越靠案前），默认 -16 */
  preferredDepth?: number;
  /** Bounds derived from the active theme's measured tabletop quad. */
  bounds?: { xMin: number; xMax: number; yMin: number; yMax: number };
}

const footprintOf = (id: string, item: SceneItem): { rx: number; ry: number } => {
  if (id.startsWith('vase')) return FOOTPRINT.vase;
  if (id.startsWith('candle')) return FOOTPRINT.candle;
  if (id === 'censer') return FOOTPRINT.censer;
  if (id === 'tea_cups') return FOOTPRINT.tea_cups;
  if (id === 'singing_bowl') return FOOTPRINT.singing_bowl;
  if (id.startsWith('fruit')) return FOOTPRINT.fruit;
  if (id.startsWith('offered_flower')) return FOOTPRINT.flower;
  switch (item.type) {
    case 'vase':
      return FOOTPRINT.vase;
    case 'candle':
      return FOOTPRINT.candle;
    case 'censer':
      return FOOTPRINT.censer;
    case 'tea_cups':
      return FOOTPRINT.tea_cups;
    case 'singing_bowl':
      return FOOTPRINT.singing_bowl;
    case 'fruit':
      return FOOTPRINT.fruit;
    case 'flower':
      return FOOTPRINT.flower;
    default:
      return DEFAULT_FOOTPRINT;
  }
};

const collectOccupancy = (items: Record<string, SceneItem | undefined>): Occupancy[] => {
  const list: Occupancy[] = [];
  for (const [id, item] of Object.entries(items)) {
    if (!item) continue;
    const spot = item.position ?? DEFAULT_SPOTS[id] ?? { x: 0, y: -18 };
    const fp = footprintOf(id, item);
    list.push({ x: spot.x, y: spot.y, rx: fp.rx, ry: fp.ry });
  }
  return list;
};

const solve = (occupancy: Occupancy[], options: TablePlanOptions): PlanSpot => {
  const {
    radius = FOOTPRINT.flower.rx,
    depthRadius = FOOTPRINT.flower.ry,
    minGap = 12,
    preferredDepth = -16,
    bounds = TABLE_PLAN_BOUNDS,
  } = options;

  // 案面横向重心：把新贡品补到相对空旷的一侧，避免全堆一边
  const weightSum = occupancy.reduce((s, o) => s + o.rx, 0) || 1;
  const centerOfMass = occupancy.reduce((s, o) => s + o.x * o.rx, 0) / weightSum;
  const lean = Math.sign(centerOfMass);

  // 按占地半径收边，避免道具压在案沿上（留出半个身位的安全余量）
  const xStart = bounds.xMin + radius * 0.8;
  const xEnd = bounds.xMax - radius * 0.8;
  const xStep = Math.max(4, (bounds.xMax - bounds.xMin) / 60);

  const candidates: Candidate[] = [];
  for (let y = bounds.yMin; y <= bounds.yMax; y += Math.max(2, (bounds.yMax - bounds.yMin) / 16)) {
    for (let x = xStart; x <= xEnd; x += xStep) {
      let clearance = Infinity;
      for (const o of occupancy) {
        const kx = o.rx + radius + minGap;
        const ky = o.ry + depthRadius + minGap * 0.35;
        const nx = (x - o.x) / kx;
        const ny = (y - o.y) / ky;
        clearance = Math.min(clearance, Math.hypot(nx, ny) - 1);
      }
      candidates.push({ x, y, clearance });
    }
  }

  const scoreOf = (c: Candidate): number => {
    const clearanceScore = Math.max(-1, Math.min(c.clearance, 1)) * 3.2;
      const horizontalSpan = Math.max(1, Math.max(Math.abs(bounds.xMin), Math.abs(bounds.xMax)));
      const depthSpan = Math.max(1, bounds.yMax - bounds.yMin);
      const centeringScore = -(Math.abs(c.x) / horizontalSpan) * 0.9;
      const depthScore = -(Math.abs(c.y - preferredDepth) / depthSpan) * 1.6;
      const balanceScore = -(c.x / horizontalSpan) * lean * 0.8;
    return clearanceScore + centeringScore + depthScore + balanceScore;
  };

  // 逐级放宽干涉要求：先要求有净间隙，再退到「相切即可」，最后允许轻微重叠
  for (const threshold of [0, -0.15, -0.35, -0.6]) {
    const feasible = candidates.filter((c) => c.clearance >= threshold);
    if (feasible.length) {
      return feasible.reduce((best, c) => (scoreOf(c) > scoreOf(best) ? c : best));
    }
  }

  // 案面已排满：取干涉最小的点
  return candidates.reduce((best, c) => (scoreOf(c) > scoreOf(best) ? c : best));
};

/**
 * 为一件新贡品寻找案面上相对最优的摆位。
 */
export const findOptimalTableSpot = (
  items: Record<string, SceneItem | undefined>,
  options: TablePlanOptions = {}
): PlanSpot => {
  const occupancy = collectOccupancy(items);
  const spot = solve(occupancy, options);
  return { x: Math.round(spot.x), y: Math.round(spot.y) };
};

/**
 * 批量布局：逐件求解，并把已排定的位置计入占用，避免一次性排布时互相重叠。
 */
export const planSpotsSequentially = (
  items: Record<string, SceneItem | undefined>,
  count: number,
  options: TablePlanOptions = {}
): PlanSpot[] => {
  const occupancy = collectOccupancy(items);
  const rx = options.radius ?? FOOTPRINT.flower.rx;
  const ry = options.depthRadius ?? FOOTPRINT.flower.ry;
  const spots: PlanSpot[] = [];

  for (let i = 0; i < count; i++) {
    const spot = solve(occupancy, options);
    occupancy.push({ x: spot.x, y: spot.y, rx, ry });
    spots.push({ x: Math.round(spot.x), y: Math.round(spot.y) });
  }

  return spots;
};
