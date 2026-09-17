/**
 * @file PropsLayer.ts
 * @description PixiJS 道具图层管理器。
 * 具备 Dirty-Flag 脏标记与同步纹理缓存，避免重复赋图，保证 60FPS 丝滑流畅。
 */
import { Container, Sprite, FederatedPointerEvent } from 'pixi.js';
import { TexturePipeline } from '../assets/TexturePipeline';
import { SmokeParticleEmitter } from '../effects/SmokeParticleEmitter';
import { PixiEffects } from '../effects/PixiEffects';
import { CandleFlameRenderer } from '../effects/CandleFlameRenderer';
import { IncenseSmokeRenderer } from '../effects/IncenseSmokeRenderer';
import { SceneItem, SceneItemId, FlowerType, FruitType } from '../../types';
import { VaseStyle } from '../../components/offerings/flowers/vases';

export interface PropsLayerCallbacks {
  onToggleLit?: (id: SceneItemId) => void;
  onToggleFruit?: (id: SceneItemId) => void;
  onBowlHit?: () => void;
  onVaseClick?: (side: 'left' | 'right') => void;
  onItemPointerDown?: (id: SceneItemId, event: FederatedPointerEvent) => void;
  onUpdatePosition?: (id: SceneItemId, pos: { x: number; y: number }) => void;
}

export class PropsLayer {
  public container: Container = new Container();

  private pipeline: TexturePipeline;
  private smokeEmitter: SmokeParticleEmitter | null = null;
  private pixiEffects: PixiEffects | null = null;
  private callbacks: PropsLayerCallbacks = {};

  private propSprites: Map<string, Sprite> = new Map();
  private propContainers: Map<string, Container> = new Map();
  private propTextureKeys: Map<string, string> = new Map();

  // 1:1 动态烛火与工笔青烟渲染器
  private candleFlames: Map<string, CandleFlameRenderer> = new Map();
  private incenseSmoke: IncenseSmokeRenderer = new IncenseSmokeRenderer();
  private latestItems: Record<string, SceneItem> = {};

  private currentAltarCenterX = 0;
  private currentAltarTopY = 0;
  private currentAltarWidth = 820;
  private currentScaleFactor = 1.0;
  private draggingId: string | null = null;

  private animTime: number = 0;

  constructor(pipeline: TexturePipeline) {
    this.pipeline = pipeline;
  }

  public bindEffects(smoke: SmokeParticleEmitter, effects: PixiEffects): void {
    this.smokeEmitter = smoke;
    this.pixiEffects = effects;
  }

  public setCallbacks(cbs: PropsLayerCallbacks): void {
    this.callbacks = cbs;
  }

  public syncItems(
    items: Record<SceneItemId, SceneItem>,
    altarCenterX: number,
    altarTopY: number,
    altarWidth: number
  ): void {
    this.currentAltarCenterX = altarCenterX;
    this.currentAltarTopY = altarTopY;
    this.currentAltarWidth = altarWidth;
    const scaleFactor = Math.min(1.0, Math.max(0.65, altarWidth / 820));
    this.currentScaleFactor = scaleFactor;

    const defaultLayouts: Record<string, { xOffset: number; yOffset: number }> = {
      vase_left: { xOffset: -164, yOffset: -4 },
      vase_right: { xOffset: 164, yOffset: -4 },
      candle_left: { xOffset: -74, yOffset: 3 },
      candle_right: { xOffset: 74, yOffset: 3 },
      fruit_left: { xOffset: -118, yOffset: 16 },
      fruit_right: { xOffset: 118, yOffset: 16 },
      censer: { xOffset: 0, yOffset: 6 },
      tea_cups: { xOffset: 0, yOffset: 22 },
      singing_bowl: { xOffset: -62, yOffset: 32 },
    };

    this.latestItems = items;

    // 1. 移除已撤下的道具
    for (const [id, cont] of this.propContainers.entries()) {
      if (!items[id]) {
        this.container.removeChild(cont);
        const flame = this.candleFlames.get(id);
        if (flame) {
          flame.destroy();
          this.candleFlames.delete(id);
        }
        cont.destroy({ children: true });
        this.propContainers.delete(id);
        this.propSprites.delete(id);
        this.propTextureKeys.delete(id);
      }
    }

    // 2. 更新或新建道具
    for (const [id, item] of Object.entries(items)) {
      let cont = this.propContainers.get(id);
      let sprite = this.propSprites.get(id);

      if (!cont) {
        cont = new Container();
        sprite = new Sprite();
        sprite.anchor.set(0.5, 1.0);
        cont.addChild(sprite);

        cont.eventMode = 'static';
        cont.cursor = 'grab';

        cont.on('pointerover', () => {
          if (!this.draggingId) cont!.scale.set(this.currentScaleFactor * 1.04);
        });
        cont.on('pointerout', () => {
          if (!this.draggingId) cont!.scale.set(this.currentScaleFactor);
        });

        let isItemDragging = false;
        let startPointerX = 0;
        let startPointerY = 0;
        let startContX = 0;
        let startContY = 0;
        let hasMoved = false;

        cont.on('pointerdown', (e: FederatedPointerEvent) => {
          isItemDragging = true;
          hasMoved = false;
          startPointerX = e.global.x;
          startPointerY = e.global.y;
          startContX = cont!.x;
          startContY = cont!.y;
          this.draggingId = id;
          cont!.cursor = 'grabbing';
          if (cont!.parent) {
            cont!.parent.setChildIndex(cont!, cont!.parent.children.length - 1);
          }
          this.callbacks.onItemPointerDown?.(id as SceneItemId, e);
        });

        cont.on('globalpointermove', (e: FederatedPointerEvent) => {
          if (!isItemDragging) return;
          const dx = e.global.x - startPointerX;
          const dy = e.global.y - startPointerY;
          if (!hasMoved && Math.hypot(dx, dy) > 4) {
            hasMoved = true;
          }
          if (hasMoved) {
            cont!.x = startContX + dx;
            cont!.y = startContY + dy;
          }
        });

        const handlePointerUp = () => {
          if (!isItemDragging) return;
          isItemDragging = false;
          this.draggingId = null;
          cont!.cursor = 'grab';
          cont!.scale.set(this.currentScaleFactor);

          if (hasMoved) {
            const tableSpreadX = this.currentAltarWidth / 560;
            const safeSpread = Math.max(0.1, tableSpreadX * this.currentScaleFactor);
            const newRelX = (cont!.x - this.currentAltarCenterX) / safeSpread;
            const newRelY = (cont!.y - this.currentAltarTopY) / this.currentScaleFactor;
            this.callbacks.onUpdatePosition?.(id as SceneItemId, {
              x: Math.round(newRelX),
              y: Math.round(newRelY),
            });
          } else {
            // 点击交互逻辑
            if (id === 'censer' || id.startsWith('candle_')) {
              this.callbacks.onToggleLit?.(id as SceneItemId);
            } else if (id.startsWith('fruit_')) {
              this.callbacks.onToggleFruit?.(id as SceneItemId);
            } else if (id === 'singing_bowl') {
              this.callbacks.onBowlHit?.();
            } else if (id === 'vase_left') {
              this.callbacks.onVaseClick?.('left');
            } else if (id === 'vase_right') {
              this.callbacks.onVaseClick?.('right');
            }
          }
        };

        cont.on('pointerup', handlePointerUp);
        cont.on('pointerupoutside', handlePointerUp);

        this.propContainers.set(id, cont);
        this.propSprites.set(id, sprite);
        this.container.addChild(cont);
      }

      // 如果当前正在拖拽该物品，不覆盖其位置
      if (this.draggingId === id) {
        continue;
      }

      // 计算相对于供案中心的绝对坐标
      const def = defaultLayouts[id] || { xOffset: 0, yOffset: 0 };
      const relX = item.position?.x !== undefined ? item.position.x : def.xOffset;
      const relY = item.position?.y !== undefined ? item.position.y : def.yOffset;

      const tableSpreadX = altarWidth / 560;
      const itemX = altarCenterX + relX * tableSpreadX * scaleFactor;
      const itemY = altarTopY + relY * scaleFactor;

      cont.x = itemX;
      cont.y = itemY;
      cont.scale.set(scaleFactor);

      // 根据状态计算纹理键与尺寸
      let targetKey = '';
      let targetW = 100;
      let targetH = 100;

      if (id.startsWith('vase_')) {
        const isRight = id.includes('right');
        const flower = (item.flowerType || (isRight ? 'lilies' : 'peonies')) as FlowerType;
        const vaseStyle = (item.vaseStyle || (isRight ? 'painted_iris' : 'warm_white_plain')) as VaseStyle;
        targetKey = `vase_${flower}_${vaseStyle}_${isRight ? 'R' : 'L'}`;
        targetW = 180;
        targetH = 202;

        if (this.propTextureKeys.get(id) !== targetKey) {
          this.propTextureKeys.set(id, targetKey);
          this.pipeline.getVaseTexture(flower, isRight, vaseStyle).then((tex) => {
            if (sprite && !sprite.destroyed) {
              sprite.texture = tex;
              sprite.anchor.set(0.5, 0.94);
              sprite.width = targetW;
              sprite.height = targetH;
            }
          });
        }
      } else if (id === 'censer') {
        const isLit = !!item.isLit;
        targetKey = `censer_${isLit ? 'lit' : 'unlit'}`;
        targetW = 100;
        targetH = 52;

        if (this.propTextureKeys.get(id) !== targetKey) {
          this.propTextureKeys.set(id, targetKey);
          this.pipeline.getCenserTexture(isLit).then((tex) => {
            if (sprite && !sprite.destroyed) {
              sprite.texture = tex;
              sprite.anchor.set(0.5, 0.94);
              sprite.width = targetW;
              sprite.height = targetH;
            }
          });
        }

        // 将拉格朗日工笔缕烟与三炷立香精确附着在香炉香灰池中心 (cy=13.5)
        if (!this.incenseSmoke || this.incenseSmoke.sprite.destroyed) {
          this.incenseSmoke = new IncenseSmokeRenderer();
        }
        if (!cont.children.includes(this.incenseSmoke.sprite)) {
          cont.addChild(this.incenseSmoke.sprite);
        }
        this.incenseSmoke.sprite.x = 0;
        this.incenseSmoke.sprite.y = -38.5;
      } else if (id.startsWith('candle_')) {
        const health = item.waxHeight ?? (item.lifecycle?.health ?? 1.0);
        const isLit = !!item.isLit;
        const qHealth = Math.round(health * 10) / 10;
        const currentWaxFactor = Math.max(0.08, Math.min(1.0, qHealth));
        const candleH = Math.round(22 + 76 * currentWaxFactor);

        targetKey = `candle_w_${qHealth}_${isLit ? '1' : '0'}`;
        targetW = 42;
        targetH = candleH;

        if (this.propTextureKeys.get(id) !== targetKey) {
          this.propTextureKeys.set(id, targetKey);
          this.pipeline.getCandleTexture(qHealth, isLit).then((tex) => {
            if (sprite && !sprite.destroyed) {
              sprite.texture = tex;
              sprite.anchor.set(0.5, 1.0);
              sprite.width = targetW;
              sprite.height = targetH;
            }
          });
        }

        // 绑定 60FPS 动态真实烛火到蜡烛凹槽
        let flame = this.candleFlames.get(id);
        if (!flame || flame.sprite.destroyed) {
          flame = new CandleFlameRenderer();
          this.candleFlames.set(id, flame);
        }
        if (!cont.children.includes(flame.sprite)) {
          cont.addChild(flame.sprite);
        }
        flame.sprite.x = 0;
        flame.sprite.y = -candleH + 8;
        flame.sprite.visible = isLit;
      } else if (id.startsWith('fruit_')) {
        const fruitType = (item.fruitType || 'apples') as FruitType;
        targetKey = `fruit_${fruitType}`;
        targetW = 108;
        targetH = 92;

        if (this.propTextureKeys.get(id) !== targetKey) {
          this.propTextureKeys.set(id, targetKey);
          this.pipeline.getFruitTexture(fruitType).then((tex) => {
            if (sprite && !sprite.destroyed) {
              sprite.texture = tex;
              sprite.anchor.set(0.5, 0.85);
              sprite.width = targetW;
              sprite.height = targetH;
            }
          });
        }
      } else if (id === 'tea_cups') {
        targetKey = 'tea_cups_trio';
        targetW = 108;
        targetH = 48;

        if (this.propTextureKeys.get(id) !== targetKey) {
          this.propTextureKeys.set(id, targetKey);
          this.pipeline.getTeaCupsTexture().then((tex) => {
            if (sprite && !sprite.destroyed) {
              sprite.texture = tex;
              sprite.anchor.set(0.5, 0.88);
              sprite.width = targetW;
              sprite.height = targetH;
            }
          });
        }
      } else if (id === 'singing_bowl') {
        targetKey = 'singing_bowl_brass';
        targetW = 82;
        targetH = 68;

        if (this.propTextureKeys.get(id) !== targetKey) {
          this.propTextureKeys.set(id, targetKey);
          this.pipeline.getSingingBowlTexture().then((tex) => {
            if (sprite && !sprite.destroyed) {
              sprite.texture = tex;
              sprite.anchor.set(0.5, 0.85);
              sprite.width = targetW;
              sprite.height = targetH;
            }
          });
        }
      } else if (id.startsWith('offered_flower')) {
        const fType = (item.flowerType || 'peonies') as FlowerType;
        targetKey = `bouquet_${fType}`;
        targetW = 150;
        targetH = 94;

        if (this.propTextureKeys.get(id) !== targetKey) {
          this.propTextureKeys.set(id, targetKey);
          this.pipeline.getSingleBouquetTexture(fType).then((tex) => {
            if (sprite && !sprite.destroyed) {
              sprite.texture = tex;
              sprite.anchor.set(0.5, 0.5);
              sprite.width = targetW;
              sprite.height = targetH;
            }
          });
        }
      }

      // 同步最终摆件尺寸
      sprite.width = targetW * (item.scale || 1.0);
      sprite.height = targetH * (item.scale || 1.0);
    }

    // 3. 将蜡烛实时三维位置与光晕传递给光影层
    if (this.pixiEffects) {
      const leftCandleCont = this.propContainers.get('candle_left');
      const rightCandleCont = this.propContainers.get('candle_right');

      const leftCandle = items.candle_left;
      const rightCandle = items.candle_right;

      const leftHealth = Number(leftCandle?.waxHeight ?? (leftCandle?.lifecycle?.health ?? 1.0));
      const rightHealth = Number(rightCandle?.waxHeight ?? (rightCandle?.lifecycle?.health ?? 1.0));

      const leftH = Math.round(22 + 76 * Math.max(0.08, Math.min(1.0, leftHealth)));
      const rightH = Math.round(22 + 76 * Math.max(0.08, Math.min(1.0, rightHealth)));

      const leftWickY = leftCandleCont ? leftCandleCont.y - (leftH - 1) * this.currentScaleFactor : altarTopY - (leftH - 1) * this.currentScaleFactor;
      const rightWickY = rightCandleCont ? rightCandleCont.y - (rightH - 1) * this.currentScaleFactor : altarTopY - (rightH - 1) * this.currentScaleFactor;

      this.pixiEffects.updateCandles(
        leftCandleCont ? leftCandleCont.x : altarCenterX - 74 * this.currentScaleFactor,
        leftWickY,
        !!leftCandle?.isLit,
        rightCandleCont ? rightCandleCont.x : altarCenterX + 74 * this.currentScaleFactor,
        rightWickY,
        !!rightCandle?.isLit
      );
    }
  }

  public update(delta: number = 1): void {
    this.animTime += delta;

    // 清风拂动花枝微摇 (自然多频正弦波复合风力物理)
    const leftVase = this.propContainers.get('vase_left');
    if (leftVase) {
      const windSway = Math.sin(this.animTime * 0.018) * 0.018 + Math.cos(this.animTime * 0.038) * 0.008;
      leftVase.rotation = windSway;
    }
    const rightVase = this.propContainers.get('vase_right');
    if (rightVase) {
      const windSway = Math.sin(this.animTime * 0.018 + 1.6) * 0.018 + Math.cos(this.animTime * 0.038 + 0.8) * 0.008;
      rightVase.rotation = windSway;
    }
    // 供花花束微风呼吸感
    for (const [id, cont] of this.propContainers.entries()) {
      if (id.startsWith('offered_flower_')) {
        cont.rotation = Math.sin(this.animTime * 0.015 + id.charCodeAt(id.length - 1)) * 0.006;
      }
    }

    // 烛火 60FPS 灵动跳跃微动效更新
    for (const [id, flame] of this.candleFlames.entries()) {
      if (!flame || !flame.sprite || flame.sprite.destroyed) continue;
      const item = this.latestItems[id];
      const isLit = item ? !!item.isLit : true;
      const health = Number(item?.waxHeight ?? (item?.lifecycle?.health ?? 1.0));
      flame.update(delta, isLit, 0.15, 1.0, health, 1.0);
    }

    // 国风工笔缕烟与三炷立香更新
    if (this.incenseSmoke && !this.incenseSmoke.sprite.destroyed) {
      const censerItem = this.latestItems['censer'];
      const isCenserLit = censerItem ? !!censerItem.isLit : true;
      const censerHealth = Number(censerItem?.lifecycle?.health ?? (censerItem?.incenseHealth ?? 1.0));
      this.incenseSmoke.update(delta, isCenserLit, 0.15, 1.0, censerHealth, 'day');
    }
  }

  public destroy(): void {
    if (this.incenseSmoke) {
      this.incenseSmoke.destroy();
    }
    this.candleFlames.forEach((f) => f.destroy());
    this.candleFlames.clear();
    this.container.destroy({ children: true });
    this.propContainers.clear();
    this.propSprites.clear();
    this.propTextureKeys.clear();
  }
}
