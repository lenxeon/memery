/**
 * @file BaseWall.ts
 * @description 背景墙基准（BaseWall）——统一负责「贴哪张背景图 · 遗像落在哪 · 纪念文字落在哪」三件事。
 *
 * 背景图与照片 / 文字的偏移量均由空间主题注册表给出；本模块只把完整主题
 * 适配为旧墙面/遗像层仍在使用的轻量规格。
 * 其余（壁面布局、昼夜调色）由 SceneBackgroundLayer 统一处理，风格侧不再各写一套。
 *
 * 本文件只产出「壁面构成规格」——不含任何 DOM / 字符串模板：
 * 壁面 = 背景大图（装饰框一并画在图里）+ 遗像 + 纪念文字，全部落在 Pixi 画布内；
 * 背景图由 SceneBackgroundLayer 贴 Sprite，遗像与文字由 MemorialPortraitLayer 绘制。
 * 程序化矢量壁构（落地罩 / 帷幔 / 圆光罩 / 月洞 / 佛龛）已整体下线，不再渲染。
 */
import { WallBackgroundStyle } from '../../../types';
import { getSceneTheme } from '../themes';

/* ────────────────────────────────────────────────────────────────
 * 壁面构成规格：BaseWall 的"基因"
 * ──────────────────────────────────────────────────────────────── */

/** 遗像落位微调：一律以「基准位」为原点，单位视口 px */
export interface WallPortraitPlacement {
  /** 横向微调（正 = 右） */
  dx?: number;
  /** 纵向微调（正 = 下） */
  dy?: number;
  /** 遗像与金环的整体缩放（1 = 基准尺寸） */
  scale?: number;
}

/** 纪念文字落位微调：同样以「基准位」为原点 */
export interface WallTextPlacement {
  /** 横向微调（正 = 右） */
  dx?: number;
  /** 纵向微调（正 = 下） */
  dy?: number;
  /** 题名与副题之间追加的间距 */
  gap?: number;
}

export interface BaseWallSpec {
  /** 背景大图（public 下的绝对路径）：装饰框已画在图内，故壁面只剩这一层贴图 */
  backdropUrl?: string;
  /** Extend wall artwork below the wall/floor seam without shifting its top anchor. */
  bottomExtensionRatio?: number;
  /** 遗像落位微调 */
  portrait?: WallPortraitPlacement;
  /** 纪念文字落位微调 */
  text?: WallTextPlacement;
}

/** 基准壁面：无背景大图、零偏移 —— 一切缺省由此派生 */
export const BASE_WALL_SPEC: Required<Pick<BaseWallSpec, 'portrait' | 'text'>> &
  Omit<BaseWallSpec, 'portrait' | 'text'> = {
  portrait: { dx: 0, dy: 0, scale: 1 },
  text: { dx: 0, dy: 0, gap: 0 },
};

/**
 * 继承 BaseWall：只覆盖背景图与照片 / 文字的偏移量微调，其余沿用基准。
 * 未给出的字段逐项回落到 BASE_WALL_SPEC，故风格定义永远只需写差异。
 */
export const defineWall = (spec: BaseWallSpec = {}): BaseWallSpec => ({
  ...BASE_WALL_SPEC,
  ...spec,
  portrait: { ...BASE_WALL_SPEC.portrait, ...spec.portrait },
  text: { ...BASE_WALL_SPEC.text, ...spec.text },
});

/** 取某风格的壁面构成（未知风格回落晴岚映曜） */
export const getWallSpec = (
  style: WallBackgroundStyle,
  wallpaperOverride?: string,
  deviceProfile: 'phone' | 'tablet' = 'phone'
): BaseWallSpec => {
  const sceneTheme = getSceneTheme(style);
  const portrait = sceneTheme.wall?.portrait ?? sceneTheme.portrait;
  return defineWall({
    backdropUrl: wallpaperOverride
      ?? sceneTheme.wall?.wallpaper?.responsiveAssets?.[deviceProfile]
      ?? sceneTheme.wall?.wallpaper?.url
      ?? sceneTheme.backdropUrl,
    bottomExtensionRatio: sceneTheme.wall?.scenery?.[0]?.bottomExtensionRatio,
    portrait: {
      dx: portrait?.dx,
      dy: portrait?.dy,
      scale: portrait?.scale,
    },
    text: {
      dx: portrait?.textDx,
      dy: portrait?.textDy,
      gap: portrait?.textGap,
    },
  });
};
