/**
 * FlowerEntity: 供花实体控制器
 * 封装鲜花的数据、生命周期（含苞 -> 盛开 -> 微凋 -> 枯萎 -> 消失）与渲染
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
import { ItemOfferedBouquet } from '../../components/ItemOfferedBouquet';

export interface FlowerItemData extends GameItemData {
  type: 'flower';
  flowerType: 'peonies' | 'lilies' | 'lotus' | 'chrysanthemum' | 'roses';
}

export class FlowerEntityController implements ItemEntityController<FlowerItemData> {
  readonly type = 'flower';

  createInstance(params: Partial<FlowerItemData>): FlowerItemData {
    const defaultDuration = 180; // 默认 3 分钟完整花期 (可由时间倍率加速)
    return {
      id: params.id || `offered_flower_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      type: 'flower',
      name: params.name || '敬献 · 芬芳花束',
      position: params.position || { x: 0, y: 30 },
      flowerType: params.flowerType || 'peonies',
      scale: params.scale || 1,
      lifecycle: params.lifecycle || {
        stage: 'blooming',
        age: 0,
        duration: defaultDuration,
        decayRate: 1.0,
        health: 1.0,
        autoDespawn: true,
      },
      metadata: params.metadata || {},
    };
  }

  onTick(item: FlowerItemData, world: WorldContext): ItemTickResult<FlowerItemData> {
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
    } else if (progress < 0.60) {
      stage = 'blooming';
    } else if (progress < 0.85) {
      stage = 'wilting';
    } else if (progress < 1.0) {
      stage = 'withered';
    } else {
      stage = 'expired';
    }

    const events: EntityEvent[] = [];

    if (stage !== currentLc.stage) {
      events.push({
        type: 'stage_change',
        entityId: item.id,
        payload: { prev: currentLc.stage, current: stage },
      });

      // 当进入枯萎或凋零时，触发案面落瓣事件
      if (stage === 'wilting' || stage === 'withered') {
        events.push({
          type: 'petal_drop',
          entityId: item.id,
          payload: { flowerType: item.flowerType },
        });
      }
    }

    // 若已经彻底过期，且开启了自动撤除，则从供案消失
    if (stage === 'expired' && currentLc.autoDespawn) {
      events.push({
        type: 'despawn',
        entityId: item.id,
        payload: { reason: 'lifecycle_completed' },
      });
      return { nextItem: null, events };
    }

    // 若阶段与生机数值变化微小，则保持旧对象引用，避免垃圾回收与虚拟 DOM 重算
    if (stage === currentLc.stage && Math.abs(health - currentLc.health) < 0.005) {
      return { nextItem: item, events };
    }

    const nextItem: FlowerItemData = {
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

  onInteract(item: FlowerItemData, action: string, world: WorldContext, payload?: unknown): FlowerItemData {
    switch (action) {
      case 'revitalize': {
        // 修剪/添水滋润，重回盛开期
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
      case 'change_type': {
        const nextType = payload as FlowerItemData['flowerType'];
        return {
          ...item,
          flowerType: nextType || item.flowerType,
        };
      }
      default:
        return item;
    }
  }

  getShadowProps(item: FlowerItemData, tableScale: number): EntityShadowProps {
    const health = item.lifecycle?.health ?? 1.0;
    // 盛开时阴影饱满，枯萎凋零时阴影收缩变淡
    const baseSize = 85 * (0.65 + 0.35 * health);
    const baseSpread = 16 * (0.65 + 0.35 * health);
    return {
      size: baseSize * tableScale,
      spread: baseSpread * tableScale,
    };
  }

  render(props: EntityRenderProps): React.ReactNode {
    const item = props.item as FlowerItemData;
    return (
      <ItemOfferedBouquet
        flowerType={item.flowerType || 'peonies'}
        scale={item.scale || 1}
        lifecycle={item.lifecycle}
      />
    );
  }
}
