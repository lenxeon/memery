/**
 * @file AltarWall.tsx
 * @description 祭坛背景墙控制器，根据当前选中的背景风格动态派发渲染对应的背景墙组件。
 */
import React from 'react';
import { WallBackgroundStyle, TimeOfDay } from '../../../types';
import { BaseWall } from './BaseWall';
import { getWallModule, renderWallDefs } from './registry';

export interface AltarWallProps {
  masterOn?: boolean;
  sunlightIntensity: number;
  timeOfDay: TimeOfDay;
  sunAngle: number;
  wallStyle?: WallBackgroundStyle;
}

export type WindowArchProps = AltarWallProps;

/**
 * WindowArch 门面组件（Facade）
 * 采用模板基组件 (BaseWall) 与独立风格模块注册体系进行解耦分发。
 * 每种风格独立维护自身专属的 SVG 图形、材质 defs 与环境修饰层。
 */
export const AltarWall: React.FC<AltarWallProps> = ({
  masterOn = true,
  sunlightIntensity,
  timeOfDay,
  sunAngle,
  wallStyle = 'classic_dawn',
}) => {
  // 1. 获取对应的风格模块定义
  const wallModule = getWallModule(wallStyle);

  // 2. 动态计算当前风格的光影与色彩氛围
  const ambiance = wallModule.getAmbiance(timeOfDay, masterOn);

  // 3. 准备独立风格的专属 defs 与环境装饰组件（如古朴苍然的竹影与落地宫灯）
  const defsSlot = renderWallDefs(wallStyle, timeOfDay, masterOn);
  const StyleComponent = wallModule.Component;
  const EnvironmentComponent = wallModule.EnvironmentComponent;

  const styleProps = {
    masterOn,
    sunlightIntensity,
    timeOfDay,
    sunAngle,
    ambiance,
  };

  return (
    <BaseWall
      masterOn={masterOn}
      sunlightIntensity={sunlightIntensity}
      ambiance={ambiance}
      defsSlot={defsSlot}
      environmentSlot={
        EnvironmentComponent ? <EnvironmentComponent {...styleProps} /> : null
      }
    >
      <StyleComponent {...styleProps} />
    </BaseWall>
  );
};

export const WindowArch = AltarWall;
