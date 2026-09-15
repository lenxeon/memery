/**
 * Abstract Factory & Item Registry Architecture
 * 统一物品注册中心与抽象工厂接口
 */

import React from 'react';
import { 
  GameItemData, 
  EntityTypeId, 
  ItemEntityController, 
  WorldContext, 
  ItemTickResult, 
  EntityRenderProps,
  EntityShadowProps 
} from '../types/entity';

import { FlowerEntityController, FlowerItemData } from '../entities/FlowerEntity';
import { CandleEntityController, CandleItemData } from '../entities/CandleEntity';
import { CenserEntityController, CenserItemData } from '../entities/CenserEntity';
import { FruitEntityController, FruitItemData } from '../entities/FruitEntity';
import { TeaCupsEntityController, TeaCupsItemData } from '../entities/TeaCupsEntity';
import { SingingBowlEntityController, SingingBowlItemData } from '../entities/SingingBowlEntity';
import { VaseEntityController, VaseItemData } from '../entities/VaseEntity';
import { FlowerType, FruitType, Position2D } from '../../types';

/**
 * 物品注册中心 (单例注册表)
 */
class ItemFactoryRegistry {
  private controllers: Map<EntityTypeId, ItemEntityController<any>> = new Map();

  constructor() {
    this.registerDefaults();
  }

  private registerDefaults() {
    this.register(new FlowerEntityController());
    this.register(new CandleEntityController());
    this.register(new CenserEntityController());
    this.register(new FruitEntityController());
    this.register(new TeaCupsEntityController());
    this.register(new SingingBowlEntityController());
    this.register(new VaseEntityController());
  }

  register<T extends GameItemData>(controller: ItemEntityController<T>) {
    this.controllers.set(controller.type, controller);
  }

  getController<T extends GameItemData = GameItemData>(type: EntityTypeId): ItemEntityController<T> | undefined {
    return this.controllers.get(type) as ItemEntityController<T> | undefined;
  }

  createItem<T extends GameItemData = GameItemData>(type: EntityTypeId, params: Partial<T>): T {
    const controller = this.getController<T>(type);
    if (!controller) {
      throw new Error(`未注册的实体类型工厂: ${type}`);
    }
    return controller.createInstance(params);
  }

  tickItem(item: GameItemData, world: WorldContext): ItemTickResult {
    const controller = this.getController(item.type);
    if (!controller) return { nextItem: item };
    return controller.onTick(item, world);
  }

  interactItem(item: GameItemData, action: string, world: WorldContext, payload?: unknown): GameItemData {
    const controller = this.getController(item.type);
    if (!controller) return item;
    return controller.onInteract(item, action, world, payload);
  }

  getShadowProps(item: GameItemData, tableScale: number): EntityShadowProps {
    const controller = this.getController(item.type);
    if (!controller) return { size: 40 * tableScale, spread: 10 * tableScale };
    return controller.getShadowProps(item, tableScale);
  }

  renderItem(props: EntityRenderProps): React.ReactNode {
    const controller = this.getController(props.item.type);
    if (!controller) return null;
    return controller.render(props);
  }
}

export const itemRegistry = new ItemFactoryRegistry();

/**
 * 抽象工厂族群 (Abstract Factories)
 */

// 1. 生机花卉工厂 (Flora Factory)
export class FloraFactory {
  static createOfferedBouquet(
    flowerType: FlowerType,
    position: Position2D,
    options?: { id?: string; name?: string; duration?: number; autoDespawn?: boolean }
  ): FlowerItemData {
    const flowerNames: Record<FlowerType, string> = {
      peonies: '重瓣粉牡丹',
      lilies: '纯白东方百合',
      lotus: '出尘清莲',
      chrysanthemum: '高洁白菊',
      roses: '淡雅香槟玫瑰',
    };

    return itemRegistry.createItem<FlowerItemData>('flower', {
      id: options?.id,
      name: options?.name || `敬献 · ${flowerNames[flowerType]}`,
      flowerType,
      position,
      lifecycle: {
        stage: 'blooming',
        age: 0,
        duration: options?.duration ?? 180, // 默认 3 分钟花期
        decayRate: 1.0,
        health: 1.0,
        autoDespawn: options?.autoDespawn ?? true,
      },
    });
  }

  static createVase(side: 'left' | 'right', flowerType: FlowerType, position?: Position2D): VaseItemData {
    return itemRegistry.createItem<VaseItemData>('vase', {
      id: `vase_${side}`,
      name: side === 'left' ? '富贵牡丹花瓶 (左)' : '纯洁百合花瓶 (右)',
      flowerType,
      position: position || (side === 'left' ? { x: -164, y: -4 } : { x: 164, y: -4 }),
    });
  }
}

// 2. 仪轨长明工厂 (Ritual Factory)
export class RitualFactory {
  static createCandle(side: 'left' | 'right', position?: Position2D, isLit: boolean = true): CandleItemData {
    return itemRegistry.createItem<CandleItemData>('candle', {
      id: `candle_${side}`,
      name: side === 'left' ? '长明红烛 (左)' : '长明红烛 (右)',
      position: position || (side === 'left' ? { x: -74, y: 0 } : { x: 74, y: 0 }),
      isLit,
    });
  }

  static createCenser(position?: Position2D, isLit: boolean = true): CenserItemData {
    return itemRegistry.createItem<CenserItemData>('censer', {
      id: 'censer',
      name: '青瓷清香香炉 (中)',
      position: position || { x: 0, y: 8 },
      isLit,
    });
  }

  static createSingingBowl(position?: Position2D): SingingBowlItemData {
    return itemRegistry.createItem<SingingBowlItemData>('singing_bowl', {
      id: 'singing_bowl',
      name: '静心铜磬颂钵 (左前)',
      position: position || { x: -62, y: 32 },
    });
  }
}

// 3. 供奉器皿工厂 (Vessel Factory)
export class VesselFactory {
  static createFruitPlatter(
    side: 'left' | 'right', 
    fruitType: FruitType = 'apples', 
    position?: Position2D
  ): FruitItemData {
    const names: Record<FruitType, string> = {
      apples: '平安红苹果高足盘',
      oranges: '吉祥金蜜柑高足盘',
      peaches: '福寿仙桃高足盘',
    };
    return itemRegistry.createItem<FruitItemData>('fruit', {
      id: `fruit_${side}`,
      name: `${names[fruitType]} (${side === 'left' ? '左' : '右'})`,
      fruitType,
      position: position || (side === 'left' ? { x: -118, y: 16 } : { x: 118, y: 16 }),
    });
  }

  static createTeaCups(position?: Position2D): TeaCupsItemData {
    return itemRegistry.createItem<TeaCupsItemData>('tea_cups', {
      id: 'tea_cups',
      name: '紫檀托描金敬茶三盅 (中)',
      position: position || { x: 0, y: 22 },
    });
  }
}
