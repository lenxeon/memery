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
import { X } from 'lucide-react';

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
      const order: FruitType[] = [
        'apples', 
        'oranges', 
        'peaches', 
        'persimmons', 
        'citrons', 
        'grapes',
        'pomelos',
        'longans',
        'bananas',
        'kumquats',
        'dragonfruits',
        'cucumbers',
        'watermelons',
        'coconuts',
        'plums',
        'mangosteens',
        'pineapples',
        'pears',
      ];
      const curIdx = order.indexOf(item.fruitType || 'apples');
      const nextType = order[(curIdx + 1) % order.length];
      const names: Record<FruitType, string> = {
        apples: '平安红苹果高足盘',
        oranges: '吉祥金蜜柑高足盘',
        peaches: '福寿仙桃高足盘',
        persimmons: '如意丹柿高足盘',
        citrons: '禅意佛手高足盘',
        grapes: '阳光玫瑰青提高足盘',
        pomelos: '黄金蜜柚高足盘',
        longans: '富贵龙眼高足盘',
        bananas: '招财金蕉高足盘',
        kumquats: '翡翠青桔高足盘',
        dragonfruits: '红运火龙果高足盘',
        cucumbers: '翠玉黄瓜高足盘',
        watermelons: '盛夏西瓜高足盘',
        coconuts: '南国椰子高足盘',
        plums: '金玉蜂糖李高足盘',
        mangosteens: '果后山竹高足盘',
        pineapples: '祥瑞凤梨高足盘',
        pears: '金秋秋月梨高足盘',
      };
      const sideName = item.id === 'fruit_left' ? ' (左)' : item.id === 'fruit_right' ? ' (右)' : ' (敬献)';
      return {
        ...item,
        fruitType: nextType,
        name: `${names[nextType]}${sideName}`,
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
    const isCustomOffered = item.id.startsWith('fruit_offered_');
    return (
      <div className="relative group/fruit">
        {isCustomOffered && props.onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              props.onRemove?.();
            }}
            className="absolute -top-2 -right-1 z-50 w-5 h-5 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center text-xs shadow-md cursor-pointer transition-transform hover:scale-110 active:scale-95"
            title="撤下此供果盘"
          >
            <X size={12} />
          </button>
        )}
        <FruitDish
          fruitType={item.fruitType || 'apples'}
          scale={item.scale || 0.95}
          onToggleFruit={() => props.onInteract?.('toggle_fruit')}
        />
      </div>
    );
  }
}
