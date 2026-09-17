/**
 * @file index.tsx
 * @description 花瓶花卉模块统一导出入口，按品类派发插花渲染。
 */
import React from 'react';
import { VaseFlowerProps, getVaseMouthAperture, getVaseSpreadFactor } from './types';
import { BaseVase } from './BaseVase';
import { getFlowerModule } from './registry';

export * from './types';
export * from './BaseVase';
export * from './registry';
export * from './FlowerPreview';
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
  const health = lifecycle?.health ?? 1.0;
  const dryFactor = Math.max(0, Math.min(1.0, (0.75 - health) / 0.7));
  const isFaded = health <= 0.05;

  // 掉落花瓣轨迹渲染
  const fallingPetalsSlot = flowerModule ? (
    <g id="fallingPetalsGroup">
      {flowerModule.fallingPetals.map((petal) => {
        if (health > petal.detachHealth) return null;

        const progress = Math.min(1.0, (petal.detachHealth - health) / petal.fallSpan);
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
            fill={dryFactor > 0.4 ? '#a88e6a' : '#fbcfe8'}
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
        <FlowerComponent
          health={health}
          dryFactor={dryFactor}
          isFaded={isFaded}
          vaseStyle={vaseStyle}
          mouthAperture={mouthAperture}
          spreadFactor={spreadFactor}
        />
      )}
    </BaseVase>
  );
};

export const ItemVase = FlowerVase;
