/**
 * @file TeaCupsEntity.tsx
 * @description 敬茶实体包装组件，处理三杯茶水敬献、茶香微烟动效。
 */
/**
 * TeaCupsEntity: 敬茶三盅实体控制器
 * 封装紫檀托盘敬茶、茶汤温度与温润茶气
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
import { TeaCupsItem } from '../../components/offerings/tea_cups';

export interface TeaCupsItemData extends GameItemData {
  type: 'tea_cups';
  temperature?: number; // 1.0 (温热沏茶) ~ 0.0 (室温清茶)
}

export class TeaCupsEntityController implements ItemEntityController<TeaCupsItemData> {
  readonly type = 'tea_cups';

  createInstance(params: Partial<TeaCupsItemData>): TeaCupsItemData {
    return {
      id: params.id || 'tea_cups',
      type: 'tea_cups',
      name: params.name || '紫檀托描金敬茶三盅 (中)',
      position: params.position || { x: 0, y: 22 },
      scale: params.scale || 0.96,
      temperature: params.temperature ?? 1.0,
      metadata: params.metadata || {},
    };
  }

  onTick(item: TeaCupsItemData, world: WorldContext): ItemTickResult<TeaCupsItemData> {
    if (world.timeScale <= 0) return { nextItem: item };

    // 约 10 分钟缓缓降为常温
    const coolRate = 1 / 600;
    const curTemp = item.temperature ?? 1.0;
    const nextTemp = Math.max(0.2, curTemp - coolRate * world.deltaSec * world.timeScale);

    return {
      nextItem: {
        ...item,
        temperature: nextTemp,
      },
    };
  }

  onInteract(item: TeaCupsItemData, action: string): TeaCupsItemData {
    if (action === 'refill_tea' || action === 'click') {
      // 换上温热新茶
      return {
        ...item,
        temperature: 1.0,
      };
    }
    return item;
  }

  getShadowProps(item: TeaCupsItemData, tableScale: number): EntityShadowProps {
    return {
      size: 68 * tableScale,
      spread: 12 * tableScale,
    };
  }

  render(props: EntityRenderProps): React.ReactNode {
    const item = props.item as TeaCupsItemData;
    return (
      <TeaCupsItem
        scale={item.scale || 0.96}
        onClick={() => props.onInteract?.('click')}
      />
    );
  }
}
