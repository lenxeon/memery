/**
 * @file index.tsx
 * @description 花瓶花卉模块统一导出入口，按品类派发插花渲染。
 */
import React from 'react';
import { VaseFlowerProps, getVaseMouthAperture, getVaseSpreadFactor } from './types';
import { BaseVase } from './BaseVase';
import { getFlowerModule } from './registry';
import { ProtectedCanvasFlora } from './ProtectedCanvasFlora';

export * from './types';
export * from './BaseVase';
export * from './registry';
export * from './FlowerPreview';
export * from './ProtectedCanvasFlora';
export * from './utils/lifecycle';
export * from './items/PeoniesFlower';
export * from './items/LiliesFlower';
export * from './items/LotusFlower';
export * from './items/ChrysanthemumFlower';
export * from './items/RosesFlower';

export const FlowerVase: React.FC<VaseFlowerProps> = ({
  vaseStyle = 'warm_white_plain',
  flowerType = 'peonies',
  scale = 1,
  className = '',
  isRightSide = false,
  lifecycle,
  onRevitalize,
  onClick,
}) => {
  const hasFlower = flowerType && flowerType !== 'none';
  const flowerModule = hasFlower ? getFlowerModule(flowerType) : null;
  const FlowerComponent = flowerModule?.Component;
  const rawHealth = lifecycle?.health ?? 1.0;
  // 将连续微小健康度量化为 2% 步进（50阶），兼顾肉眼极其平滑的色彩衰老演进，同时杜绝每秒高频刷屏
  const steppedHealth = Math.round(rawHealth * 50) / 50;
  const steppedDry = Math.round(Math.max(0, Math.min(1.0, (0.75 - steppedHealth) / 0.7)) * 50) / 50;
  const isFaded = steppedHealth <= 0.05;

  // 掉落花瓣轨迹渲染
  const fallingPetalsSlot = flowerModule ? (
    <g id="fallingPetalsGroup">
      {flowerModule.fallingPetals.map((petal) => {
        if (steppedHealth > petal.detachHealth) return null;

        const progress = Math.min(1.0, (petal.detachHealth - steppedHealth) / petal.fallSpan);
        const currX = petal.startX + (petal.landX - petal.startX) * progress + Math.sin(progress * Math.PI * petal.swayFreq) * petal.swayAmp * (1 - progress);
        const currY = petal.startY + (petal.landY - petal.startY) * progress;
        const currRot = progress * petal.landRot;

        return (
          <ellipse
            key={petal.id}
            cx={currX}
            cy={currY}
            rx={petal.rx}
            ry={petal.ry}
            fill={steppedDry > 0.4 ? '#a88e6a' : '#fbcfe8'}
            opacity={0.85}
            transform={`rotate(${currRot}, ${currX}, ${currY})`}
          />
        );
      })}
    </g>
  ) : undefined;

  const mouthAperture = getVaseMouthAperture(vaseStyle);
  const spreadFactor = getVaseSpreadFactor(vaseStyle);

  return (
    <BaseVase
      vaseStyle={vaseStyle}
      scale={scale}
      className={className}
      isRightSide={isRightSide}
      lifecycle={lifecycle}
      onRevitalize={onRevitalize}
      onClick={onClick}
      fallingPetalsSlot={fallingPetalsSlot}
    >
      {FlowerComponent && (
        <ProtectedCanvasFlora
          boundX={-60}
          boundY={-80}
          boundWidth={270}
          boundHeight={290}
        >
          <FlowerComponent
            health={steppedHealth}
            dryFactor={steppedDry}
            isFaded={isFaded}
            vaseStyle={vaseStyle}
            mouthAperture={mouthAperture}
            spreadFactor={spreadFactor}
          />
        </ProtectedCanvasFlora>
      )}
    </BaseVase>
  );
};

export const ItemVase = FlowerVase;
