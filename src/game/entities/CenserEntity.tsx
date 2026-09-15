/**
 * CenserEntity: 香炉实体控制器
 * 封装线香生命周期：初献高香 -> 香过半柱 -> 余烬残香 -> 燃尽熄灭
 * 线香长度随时间燃烧缩短，火头与烟雾在后期减细微缩，最后自然熄灭
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
import { ItemCenser } from '../../components/ItemCenser';

export interface CenserItemData extends GameItemData {
  type: 'censer';
  isLit: boolean;
  incenseHealth: number; // 0.0 ~ 1.0 (剩余香长比例)
  lifecycle: ItemLifecycle;
}

export class CenserEntityController implements ItemEntityController<CenserItemData> {
  readonly type = 'censer';

  createInstance(params: Partial<CenserItemData>): CenserItemData {
    const defaultDuration = 240; // 4分钟完整一炷香周期 (可通过倍速加速)
    const incenseHealth = params.incenseHealth ?? (params.lifecycle ? params.lifecycle.health : 1.0);
    return {
      id: params.id || 'censer',
      type: 'censer',
      name: params.name || '青瓷清香香炉 (中)',
      position: params.position || { x: 0, y: 8 },
      scale: params.scale || 0.98,
      isLit: params.isLit ?? true,
      incenseHealth,
      lifecycle: params.lifecycle || {
        stage: 'blooming',
        age: 0,
        duration: defaultDuration,
        decayRate: 1.0,
        health: incenseHealth,
        autoDespawn: false, // 香炉长留案上，香尽熄灭后可点击敬上新香
      },
      metadata: params.metadata || {},
    };
  }

  onTick(item: CenserItemData, world: WorldContext): ItemTickResult<CenserItemData> {
    if (!item.isLit || !item.lifecycle || world.timeScale <= 0) {
      return { nextItem: item };
    }

    const { deltaSec, timeScale } = world;
    const currentLc = item.lifecycle;
    const nextAge = currentLc.age + deltaSec * currentLc.decayRate * timeScale;
    const progress = Math.min(1.0, nextAge / Math.max(1, currentLc.duration));
    const health = Math.max(0, 1.0 - progress);

    let stage: LifecycleStage = 'blooming';
    let isLit: boolean = item.isLit;

    if (progress < 0.40) {
      stage = 'blooming'; // 初献高香
    } else if (progress < 0.70) {
      stage = 'wilting';  // 香过半柱
    } else if (progress < 0.96) {
      stage = 'withered'; // 余烬残香 (火头微弱，烟雾变细)
    } else {
      stage = 'expired';  // 燃尽熄灭
      isLit = false;      // 清香自然熄灭！
    }

    const events: EntityEvent[] = [];
    if (stage !== currentLc.stage) {
      events.push({
        type: 'stage_change',
        entityId: item.id,
        payload: { prev: currentLc.stage, current: stage },
      });
    }

    if (
      stage === currentLc.stage && 
      isLit === item.isLit && 
      Math.abs(health - currentLc.health) < 0.005
    ) {
      return { nextItem: item, events };
    }

    const nextItem: CenserItemData = {
      ...item,
      isLit,
      incenseHealth: health,
      lifecycle: {
        ...currentLc,
        age: nextAge,
        stage,
        health,
      },
    };

    return { nextItem, events };
  }

  onInteract(item: CenserItemData, action: string): CenserItemData {
    if (action === 'toggle_lit') {
      const isExpired = item.lifecycle?.stage === 'expired' || (item.lifecycle?.health ?? 1) <= 0.05;

      // 若已燃尽熄灭，点击敬奉崭新三炷高香并点燃
      if (isExpired) {
        return {
          ...item,
          isLit: true,
          incenseHealth: 1.0,
          lifecycle: item.lifecycle ? {
            ...item.lifecycle,
            age: 0,
            stage: 'blooming',
            health: 1.0,
          } : undefined,
        };
      }

      // 正常熄灭/点燃
      return {
        ...item,
        isLit: !item.isLit,
      };
    }

    if (action === 'revitalize') {
      return {
        ...item,
        isLit: true,
        incenseHealth: 1.0,
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

  getShadowProps(item: CenserItemData, tableScale: number): EntityShadowProps {
    return {
      size: 56 * tableScale,
      spread: 14 * tableScale,
    };
  }

  render(props: EntityRenderProps): React.ReactNode {
    const item = props.item as CenserItemData;
    return (
      <ItemCenser
        isLit={!!item.isLit}
        onToggle={() => props.onInteract?.('toggle_lit')}
        windForce={props.lighting.windForce}
        sunlightIntensity={props.lighting.sunlightIntensity}
        masterOn={props.lighting.masterOn}
        timeOfDay={props.lighting.timeOfDay}
        scale={item.scale || 0.98}
        incenseHealth={item.incenseHealth ?? item.lifecycle?.health ?? 1.0}
        lifecycle={item.lifecycle}
      />
    );
  }
}
