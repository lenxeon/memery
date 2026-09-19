/**
 * @file WallScene.ts
 * @description 背景墙场景元素（纯 TS，无 React 依赖）。
 *
 * 自持 DOM 结构：外壳光照（BaseWall）+ 风格模块注入的画面与环境层。
 * 风格或光影变化时整体重建（切换动作低频，重建成本可忽略）。
 */
import type { LightingSettings, WallBackgroundStyle } from '../../../types';
import { renderBaseWall } from './BaseWall';
import { getWallModule } from './registry';

export interface WallSceneOptions {
  lighting: LightingSettings;
  wallStyle?: WallBackgroundStyle;
}

export class WallScene {
  private readonly root: HTMLDivElement;
  private opts: WallSceneOptions;

  constructor(opts: WallSceneOptions) {
    this.opts = opts;
    this.root = document.createElement('div');
    this.root.className = 'absolute inset-0 pointer-events-none';
  }

  mount(container: HTMLElement): void {
    container.appendChild(this.root);
    this.render();
  }

  setOptions(patch: Partial<WallSceneOptions>): void {
    this.opts = { ...this.opts, ...patch };
    this.render();
  }

  destroy(): void {
    this.root.remove();
  }

  private render(): void {
    const { lighting, wallStyle = 'classic_dawn' } = this.opts;
    const { masterOn, timeOfDay, sunAngle, sunlightIntensity } = lighting;

    const wallModule = getWallModule(wallStyle);
    const ambiance = wallModule.getAmbiance(timeOfDay, masterOn);
    const styleProps = {
      masterOn,
      sunlightIntensity,
      timeOfDay,
      sunAngle,
      ambiance,
    };

    this.root.innerHTML = renderBaseWall({
      masterOn,
      sunlightIntensity,
      ambiance,
      defsSlot: wallModule.renderDefs?.({ timeOfDay, masterOn }) ?? '',
      environmentSlot: wallModule.renderEnvironment?.(styleProps) ?? '',
      contentSlot: wallModule.renderContent(styleProps),
    });
  }
}
