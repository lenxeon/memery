/**
 * SingingBowlEntity: 静心铜磬实体控制器
 * 封装纯铜敲磬、528Hz 泛音共鸣衰减与振动光环
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
import { ItemSingingBowl } from '../../components/ItemSingingBowl';

export interface SingingBowlItemData extends GameItemData {
  type: 'singing_bowl';
  vibration?: number; // 0.0 ~ 1.0 当前震颤共振强度
}

export class SingingBowlEntityController implements ItemEntityController<SingingBowlItemData> {
  readonly type = 'singing_bowl';

  createInstance(params: Partial<SingingBowlItemData>): SingingBowlItemData {
    return {
      id: params.id || 'singing_bowl',
      type: 'singing_bowl',
      name: params.name || '静心铜磬颂钵 (左前)',
      position: params.position || { x: -62, y: 32 },
      scale: params.scale || 0.95,
      vibration: params.vibration ?? 0.0,
      metadata: params.metadata || {},
    };
  }

  onTick(item: SingingBowlItemData, world: WorldContext): ItemTickResult<SingingBowlItemData> {
    const curVib = item.vibration ?? 0;
    if (curVib <= 0.01) return { nextItem: item };

    // 声音与光晕快速衰减
    const nextVib = Math.max(0, curVib - world.deltaSec * 1.5);
    return {
      nextItem: {
        ...item,
        vibration: nextVib,
      },
    };
  }

  onInteract(item: SingingBowlItemData, action: string): SingingBowlItemData {
    if (action === 'strike' || action === 'click') {
      return {
        ...item,
        vibration: 1.0,
      };
    }
    return item;
  }

  getShadowProps(item: SingingBowlItemData, tableScale: number): EntityShadowProps {
    return {
      size: 48 * tableScale,
      spread: 12 * tableScale,
    };
  }

  render(props: EntityRenderProps): React.ReactNode {
    const item = props.item as SingingBowlItemData;
    return (
      <ItemSingingBowl
        scale={item.scale || 0.95}
        onStrike={() => props.onInteract?.('strike')}
      />
    );
  }
}
