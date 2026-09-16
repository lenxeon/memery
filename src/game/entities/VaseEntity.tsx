/**
 * @file VaseEntity.tsx
 * @description 花瓶实体包装组件，统筹左右花瓶插花展示与状态同步。
 */
/**
 * VaseEntity: 供案瓷瓶实体控制器
 * 封装对称瓷瓶、插花品种切换、花瓣枯萎凋零与终极枯枝生命周期
 */

import React from 'react';
import { 
  ItemEntityController, 
  GameItemData, 
  WorldContext, 
  ItemTickResult, 
  EntityRenderProps,
  EntityShadowProps,
  LifecycleStage,
  EntityEvent
} from '../types/entity';
import { FlowerVase } from '../../components/offerings/flowers';
import { FlowerType } from '../../types';
import { VaseStyle, VASE_STYLES } from '../../components/offerings/flowers/vases';

export interface VaseItemData extends GameItemData {
  type: 'vase';
  flowerType: FlowerType;
  vaseStyle?: VaseStyle;
}

export class VaseEntityController implements ItemEntityController<VaseItemData> {
  readonly type = 'vase';

  createInstance(params: Partial<VaseItemData>): VaseItemData {
    const isRight = params.id?.includes('right');
    const defaultDuration = 240; // 4分钟完整花期 (可由时间流速倍率加速)
    return {
      id: params.id || (isRight ? 'vase_right' : 'vase_left'),
      type: 'vase',
      name: params.name || (isRight ? '纯洁百合花瓶 (右)' : '富贵牡丹花瓶 (左)'),
      position: params.position || (isRight ? { x: 164, y: -4 } : { x: -164, y: -4 }),
      scale: params.scale || 0.95,
      flowerType: params.flowerType || (isRight ? 'lilies' : 'peonies'),
      vaseStyle: params.vaseStyle || (isRight ? 'painted_iris' : 'warm_white_plain'),
      lifecycle: params.lifecycle || {
        stage: 'blooming',
        age: 0,
        duration: defaultDuration,
        decayRate: 1.0,
        health: 1.0,
        autoDespawn: false, // 瓷瓶永远留驻供案，花瓣落尽后呈现清雅枯枝
      },
      metadata: params.metadata || {},
    };
  }

  onTick(item: VaseItemData, world: WorldContext): ItemTickResult<VaseItemData> {
    if (!item.lifecycle || world.timeScale <= 0) {
      return { nextItem: item };
    }

    const { deltaSec, timeScale } = world;
    const currentLc = item.lifecycle;
    const nextAge = currentLc.age + deltaSec * currentLc.decayRate * timeScale;
    const progress = Math.min(1.0, nextAge / Math.max(1, currentLc.duration));
    const health = Math.max(0, 1.0 - progress);

    let stage: LifecycleStage = 'blooming';
    if (progress < 0.10) {
      stage = 'budding';
    } else if (progress < 0.55) {
      stage = 'blooming';
    } else if (progress < 0.82) {
      stage = 'wilting';
    } else if (progress < 0.96) {
      stage = 'withered';
    } else {
      stage = 'expired'; // 枯萎终态：落尽繁花，仅存枯枝 (Bare branches)
    }

    const events: EntityEvent[] = [];

    if (stage !== currentLc.stage) {
      events.push({
        type: 'stage_change',
        entityId: item.id,
        payload: { prev: currentLc.stage, current: stage },
      });

      // 凋零期向案面散落花瓣
      if (stage === 'wilting' || stage === 'withered') {
        events.push({
          type: 'petal_drop',
          entityId: item.id,
          payload: { flowerType: item.flowerType },
        });
      }
    }

    // 数值阈值优化：阶段未变且生机数值浮动小于 0.005 时保持引用，节省渲染开销
    if (stage === currentLc.stage && Math.abs(health - currentLc.health) < 0.005) {
      return { nextItem: item, events };
    }

    const nextItem: VaseItemData = {
      ...item,
      lifecycle: {
        ...currentLc,
        age: nextAge,
        stage,
        health,
      },
    };

    return { nextItem, events };
  }

  onInteract(item: VaseItemData, action: string, world: WorldContext, payload?: unknown): VaseItemData {
    if (action === 'change_flower') {
      const nextFlower = payload as FlowerType;
      return {
        ...item,
        flowerType: nextFlower || item.flowerType,
        lifecycle: item.lifecycle
          ? {
              ...item.lifecycle,
              age: 0,
              stage: 'blooming',
              health: 1.0,
            }
          : undefined,
      };
    }

    if (action === 'change_vase_style') {
      const nextStyle = payload as VaseStyle;
      return {
        ...item,
        vaseStyle: nextStyle || item.vaseStyle,
      };
    }

    if (action === 'toggle_vase_style') {
      const styleList: VaseStyle[] = VASE_STYLES.map((v) => v.id);
      const curIdx = styleList.indexOf(item.vaseStyle || 'warm_white_plain');
      const nextStyle = styleList[(curIdx + 1) % styleList.length];
      return {
        ...item,
        vaseStyle: nextStyle,
      };
    }

    if (action === 'revitalize' || action === 'click') {
      // 添水剪枝，枯木逢春，重新盛开
      return {
        ...item,
        lifecycle: item.lifecycle
          ? {
              ...item.lifecycle,
              age: 0,
              stage: 'blooming',
              health: 1.0,
            }
          : undefined,
      };
    }

    return item;
  }

  getShadowProps(item: VaseItemData, tableScale: number): EntityShadowProps {
    return {
      size: 68 * tableScale,
      spread: 16 * tableScale,
    };
  }

  render(props: EntityRenderProps): React.ReactNode {
    const item = props.item as VaseItemData;
    const isRightSide = item.id.includes('right');
    return (
      <FlowerVase
        isRightSide={isRightSide}
        vaseStyle={item.vaseStyle || (isRightSide ? 'painted_iris' : 'warm_white_plain')}
        flowerType={item.flowerType !== undefined ? item.flowerType : (isRightSide ? 'lilies' : 'peonies')}
        scale={item.scale || 0.95}
        lifecycle={item.lifecycle}
        onRevitalize={() => props.onInteract?.('revitalize')}
        onClick={() => props.onInteract?.('toggle_vase_style')}
      />
    );
  }
}
