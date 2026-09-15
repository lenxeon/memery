/**
 * CandleEntity: 烛台实体控制器
 * 封装红烛生命周期：初燃长明 -> 渐燃半截 -> 残烛微光 -> 燃尽熄灭
 * 蜡烛高度随时间消耗变矮，烛火在后期自适应减小，最终自然熄灭
 */

import React from 'react';
import { 
  ItemEntityController, 
  GameItemData, 
  WorldContext, 
  ItemTickResult, 
  EntityRenderProps,
  EntityShadowProps,
  ItemLifecycle,
  LifecycleStage,
  EntityEvent
} from '../types/entity';
import { ItemCandle } from '../../components/ItemCandle';

export interface CandleItemData extends GameItemData {
  type: 'candle';
  isLit: boolean;
  waxHeight: number; // 0.08 ~ 1.0 (剩余蜡烛高度比例)
  lifecycle: ItemLifecycle;
}

export class CandleEntityController implements ItemEntityController<CandleItemData> {
  readonly type = 'candle';

  createInstance(params: Partial<CandleItemData>): CandleItemData {
    const defaultDuration = 300; // 5分钟完整燃烛周期 (可通过倍速加速)
    const waxHeight = params.waxHeight ?? (params.lifecycle ? params.lifecycle.health : 1.0);
    return {
      id: params.id || `candle_${Date.now()}`,
      type: 'candle',
      name: params.name || '朱砂红烛台',
      position: params.position || { x: 0, y: 0 },
      scale: params.scale || 0.95,
      isLit: params.isLit ?? true,
      waxHeight,
      lifecycle: params.lifecycle || {
        stage: 'blooming',
        age: 0,
        duration: defaultDuration,
        decayRate: 1.0,
        health: waxHeight,
        autoDespawn: false, // 烛台长留案上，蜡尽熄灭后可点击换新烛
      },
      metadata: params.metadata || {},
    };
  }

  onTick(item: CandleItemData, world: WorldContext): ItemTickResult<CandleItemData> {
    // 未点燃或时间流速为 0 时暂停消耗
    if (!item.isLit || !item.lifecycle || world.timeScale <= 0) {
      return { nextItem: item };
    }

    const { deltaSec, timeScale } = world;
    const currentLc = item.lifecycle;
    const nextAge = currentLc.age + deltaSec * currentLc.decayRate * timeScale;
    const progress = Math.min(1.0, nextAge / Math.max(1, currentLc.duration));
    const health = Math.max(0, 1.0 - progress);

    // 蜡烛高度随生机线性缩短 (从 1.0 降至 0.08 矮座)
    const waxHeight = Math.max(0.08, 0.08 + 0.92 * health);

    let stage: LifecycleStage = 'blooming';
    let isLit: boolean = item.isLit;

    if (progress < 0.40) {
      stage = 'blooming'; // 初燃长明
    } else if (progress < 0.70) {
      stage = 'wilting';  // 渐燃半截
    } else if (progress < 0.96) {
      stage = 'withered'; // 后期残烛微光 (烛火减小)
    } else {
      stage = 'expired';  // 燃尽熄灭
      isLit = false;      // 自动熄灭！
    }

    const events: EntityEvent[] = [];
    if (stage !== currentLc.stage) {
      events.push({
        type: 'stage_change',
        entityId: item.id,
        payload: { prev: currentLc.stage, current: stage },
      });
    }

    // 性能优化：数值变化极微时保持引用
    if (
      stage === currentLc.stage && 
      isLit === item.isLit && 
      Math.abs(health - currentLc.health) < 0.005
    ) {
      return { nextItem: item, events };
    }

    const nextItem: CandleItemData = {
      ...item,
      isLit,
      waxHeight,
      lifecycle: {
        ...currentLc,
        age: nextAge,
        stage,
        health,
      },
    };

    return { nextItem, events };
  }

  onInteract(item: CandleItemData, action: string, world: WorldContext): CandleItemData {
    if (action === 'toggle_lit') {
      const isExpired = item.lifecycle?.stage === 'expired' || (item.lifecycle?.health ?? 1) <= 0.05;

      // 若已经燃尽熄灭，点击添上新烛并点燃
      if (isExpired) {
        return {
          ...item,
          isLit: true,
          waxHeight: 1.0,
          lifecycle: item.lifecycle ? {
            ...item.lifecycle,
            age: 0,
            stage: 'blooming',
            health: 1.0,
          } : undefined,
        };
      }

      // 正常点燃/熄灭
      return {
        ...item,
        isLit: !item.isLit,
      };
    }

    if (action === 'revitalize') {
      return {
        ...item,
        isLit: true,
        waxHeight: 1.0,
        lifecycle: item.lifecycle ? {
          ...item.lifecycle,
          age: 0,
          stage: 'blooming',
          health: 1.0,
        } : undefined,
      };
    }

    return item;
  }

  getShadowProps(item: CandleItemData, tableScale: number): EntityShadowProps {
    const health = item.lifecycle?.health ?? item.waxHeight ?? 1.0;
    return {
      size: (34 + 6 * health) * tableScale,
      spread: (8 + 3 * health) * tableScale,
    };
  }

  render(props: EntityRenderProps): React.ReactNode {
    const item = props.item as CandleItemData;
    return (
      <ItemCandle
        isLit={!!item.isLit}
        onToggle={() => props.onInteract?.('toggle_lit')}
        windForce={props.lighting.windForce}
        glowIntensity={props.lighting.candleGlowIntensity}
        scale={item.scale || 0.95}
        waxHeight={item.waxHeight ?? item.lifecycle?.health ?? 1.0}
        lifecycle={item.lifecycle}
      />
    );
  }
}
