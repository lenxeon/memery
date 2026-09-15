/**
 * @file FruitEntity.tsx
 * @description 供果实体包装组件，处理水果盘位置排布与供奉状态。
 */
/**
 * FruitEntity: 四时鲜果高足盘实体控制器
 * 封装高足盘果品数据、切果循环交互、保鲜度生命周期
 */

import React from 'react';
import { 
  ItemEntityController, 
  GameItemData, 
  WorldContext, 
  ItemTickResult, 
  EntityRenderProps,
  EntityShadowProps 
} from '../types/entity';
import { FruitDish } from '../../components/offerings/fruits';
import { FruitType } from '../../types';

export interface FruitItemData extends GameItemData {
  type: 'fruit';
  fruitType: FruitType;
  freshness?: number; // 1.0 (新鲜采摘) ~ 0.0 (熟透)
}

export class FruitEntityController implements ItemEntityController<FruitItemData> {
  readonly type = 'fruit';

  createInstance(params: Partial<FruitItemData>): FruitItemData {
    return {
      id: params.id || `fruit_${Date.now()}`,
      type: 'fruit',
      name: params.name || '四时鲜果高足盘',
      position: params.position || { x: 0, y: 16 },
      scale: params.scale || 0.95,
      fruitType: params.fruitType || 'apples',
      freshness: params.freshness ?? 1.0,
      metadata: params.metadata || {},
    };
  }

  onTick(item: FruitItemData, world: WorldContext): ItemTickResult<FruitItemData> {
    if (world.timeScale <= 0) return { nextItem: item };

    // 极慢的果品保鲜流逝
    const decayRate = 1 / 7200;
    const currentFresh = item.freshness ?? 1.0;
    const nextFresh = Math.max(0.3, currentFresh - decayRate * world.deltaSec * world.timeScale);

    return {
      nextItem: {
        ...item,
        freshness: nextFresh,
      },
    };
  }

  onInteract(item: FruitItemData, action: string, world: WorldContext): FruitItemData {
    if (action === 'toggle_fruit' || action === 'click') {
      const order: FruitType[] = ['apples', 'oranges', 'peaches'];
      const curIdx = order.indexOf(item.fruitType || 'apples');
      const nextType = order[(curIdx + 1) % order.length];
      const names: Record<FruitType, string> = {
        apples: '平安红苹果高足盘',
        oranges: '吉祥金蜜柑高足盘',
        peaches: '福寿仙桃高足盘',
      };
      return {
        ...item,
        fruitType: nextType,
        name: `${names[nextType]} (${item.id.includes('left') ? '左' : '右'})`,
        freshness: 1.0, // 换新果恢复至新鲜
      };
    }
    return item;
  }

  getShadowProps(item: FruitItemData, tableScale: number): EntityShadowProps {
    return {
      size: 64 * tableScale,
      spread: 14 * tableScale,
    };
  }

  render(props: EntityRenderProps): React.ReactNode {
    const item = props.item as FruitItemData;
    return (
      <FruitDish
        fruitType={item.fruitType || 'apples'}
        scale={item.scale || 0.95}
        onToggleFruit={() => props.onInteract?.('toggle_fruit')}
      />
    );
  }
}
