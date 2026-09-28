/**
 * @file PropsLayer.ts
 * @description PixiJS 道具图层管理器。
 * 具备 Dirty-Flag 脏标记与同步纹理缓存，避免重复赋图，保证 60FPS 丝滑流畅。
 */
import { Container, Sprite, FederatedPointerEvent, Polygon } from 'pixi.js';
import { TexturePipeline, getVaseTextureCacheKey } from '../assets/TexturePipeline';
import { SmokeParticleEmitter } from '../effects/SmokeParticleEmitter';
import { PixiEffects } from '../effects/PixiEffects';
import { CandleFlameRenderer } from '../effects/CandleFlameRenderer';
import { IncenseSmokeRenderer } from '../effects/IncenseSmokeRenderer';
import { SceneItem, SceneItemId, FlowerType, FruitType, VaseHitZone } from '../../types';
import { AltarLightSource } from './AltarTableLayer';
import { VaseStyle } from '../assets/templates/flowers/vases';
import { sound } from '../../utils/audio';
import { getMingAltarTableSurfaceDepth } from './table/MingAltarTableSpec';

/**
 * 花瓶命中区（容器局部坐标，单位 px，随容器 scale 缩放）。
 * 花瓶纹理是 210×265 的整幅画布，瓶身仅占中间约 44px 宽，四角大片透明留白，
 * 若沿用精灵包围盒，离花瓶很远的空处也会被命中。此处按「瓶身 + 花冠」实际轮廓收紧。
 * 坐标换算：容器原点对应纹理 viewBox 中的 (75, 193.2)，横向 0.84×、纵向 0.946×。
 */
/** 瓶口在容器局部坐标中的高度，同时作为「花冠 / 瓶身」点击分区的分界 */
const VASE_MOUTH_Y = -84;

const vaseHitArea = (hasFlower: boolean): Polygon => {
  if (!hasFlower) {
    // 净瓶裸检：只保留瓶身立柱
    return new Polygon([-22, 4, 22, 4, 22, VASE_MOUTH_Y, -22, VASE_MOUTH_Y]);
  }
  return new Polygon([
    -22, 4,     // 瓶底左
    -22, -50,   // 瓶身左
    -20, VASE_MOUTH_Y,   // 瓶口左
    -46, -102,  // 花冠左下外展
    -56, -145,  // 花冠左最宽处
    -44, -180,  // 花冠左上收
    -18, -192,  // 花冠顶左
    18, -192,   // 花冠顶右
    44, -180,
    56, -145,
    46, -102,
    20, VASE_MOUTH_Y,    // 瓶口右
    22, -50,
    22, 4,      // 瓶底右
  ]);
};

export interface PropsLayerCallbacks {
  onToggleLit?: (id: SceneItemId) => void;
  onToggleFruit?: (id: SceneItemId) => void;
  onBowlHit?: () => void;
  onVaseClick?: (id: SceneItemId, zone: VaseHitZone) => void;
  onItemPointerDown?: (id: SceneItemId, event: FederatedPointerEvent) => void;
  onUpdatePosition?: (id: SceneItemId, pos: { x: number; y: number }) => void;
  /** 长按物件：请求查看该物件的典故出处（供花、供果、礼器） */
  onInspect?: (id: SceneItemId) => void;
}

/** 烛火 / 香烟贴图的重绘间隔（单位：帧，60FPS 下 2 帧 ≈ 30FPS 重绘） */
const EFFECT_REDRAW_STEP = 2;

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
  /**
   * 烛火 / 香烟走 Canvas2D 重绘 + 整张贴图重新上传 GPU，是场景里最贵的逐帧开销。
   * 累积到 EFFECT_REDRAW_STEP（≈2 帧，即 ~30FPS）才重绘一次，掉帧时自动回落到每帧重绘。
   */
  private effectAccum: number = 0;

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
    // scaleFactor 随桌宽线性缩放，不再硬钳到 1.0，让道具跟随桌子宽度铺开
    const scaleFactor = Math.min(1.5, Math.max(0.65, altarWidth / 560));
    this.currentScaleFactor = scaleFactor;

    // xOffset 以 560 为基准比例尺，随 scaleFactor 同步放大
    const spread = scaleFactor;
    // 台面进深以提取后的明式桌面实测尺寸为准，并与 AltarTableLayer 共用同一套比例。
    // yOffset 语义为「相对台面前沿的纵深」：0 = 紧贴前沿，负值向案里（后方）退，
    // 必须落在 [-depthUnits, 0] 带内，否则道具会浮在台面之外的正立面上。
    const tableDepth = getMingAltarTableSurfaceDepth(altarWidth);
    const depthUnits = tableDepth / scaleFactor;
    const defaultLayouts: Record<string, { xOffset: number; yOffset: number }> = {
      vase_left:    { xOffset: -190 * spread, yOffset: -39 },
      vase_right:   { xOffset:  190 * spread, yOffset: -39 },
      candle_left:  { xOffset:  -95 * spread, yOffset: -28 },
      candle_right: { xOffset:   95 * spread, yOffset: -28 },
      fruit_left:   { xOffset: -150 * spread, yOffset: -16 },
      fruit_right:  { xOffset:  150 * spread, yOffset: -16 },
      censer:       { xOffset:    0,          yOffset: -37 },
      tea_cups:     { xOffset:    0,          yOffset: -12 },
      singing_bowl: { xOffset:  -62 * spread, yOffset: -18 },
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
      // 空位（键存在但值为 undefined，例如撤下后又被批量操作写回）直接跳过
      if (!item) continue;

      let cont = this.propContainers.get(id);
      let sprite = this.propSprites.get(id);

      if (!cont) {
        cont = new Container();
        sprite = new Sprite();
        sprite.anchor.set(0.5, 1.0);
        cont.addChild(sprite);

        cont.eventMode = 'static';
        cont.cursor = 'grab';

        // 香炉：用多边形精确约束命中区域（香炉主体 + 三炷立香的纤细立柱）。
        // 缕烟精灵画布宽达 160px 且纵向高 280px，若不约束会令远离香体的区域也能触发拖放。
        if (id === 'censer') {
          cont.hitArea = new Polygon([
            -44, 8,     // 香炉左下
            44, 8,      // 香炉右下
            44, -52,    // 香炉右上
            11, -52,    // 立香柱右下（收窄至香体实际宽度）
            9, -128,    // 立香柱右上
            -9, -128,   // 立香柱左上
            -11, -52,   // 立香柱左下
            -44, -52,   // 香炉左上
          ]);
        }

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
        let startLocalY = 0;
        let hasMoved = false;
        // 长按（>520ms 且未移动）视为「查看典故」，与单击的功能操作、拖动的位移操作三分
        let longPressTimer: number | null = null;
        let longPressFired = false;

        const clearLongPress = () => {
          if (longPressTimer !== null) {
            window.clearTimeout(longPressTimer);
            longPressTimer = null;
          }
        };

        cont.on('pointerdown', (e: FederatedPointerEvent) => {
          e.stopPropagation();
          this.draggingId = id;
          isItemDragging = true;
          hasMoved = false;
          longPressFired = false;
          clearLongPress();
          longPressTimer = window.setTimeout(() => {
            longPressTimer = null;
            if (!isItemDragging || hasMoved) return;
            longPressFired = true;
            isItemDragging = false;
            this.draggingId = null;
            cont!.cursor = 'grab';
            cont!.scale.set(this.currentScaleFactor);
            sound.playPorcelainClink();
            this.callbacks.onInspect?.(id as SceneItemId);
          }, 520);
          startPointerX = e.global.x;
          startPointerY = e.global.y;
          // 记录命中点在容器局部坐标中的高度，用于花瓶「花冠 / 瓶身」分区判定
          startLocalY = cont!.toLocal(e.global).y;
          startContX = cont!.x;
          startContY = cont!.y;
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
            // 进入拖动即取消长按判定
            clearLongPress();
          }
          if (hasMoved) {
            const boundsX = 220 * (this.currentAltarWidth / 560);
            const newX = Math.max(
              this.currentAltarCenterX - boundsX,
              Math.min(this.currentAltarCenterX + boundsX, startContX + dx)
            );
            // 纵向只允许在台面进深带内移动（后沿 -tableDepth ~ 前沿 0）
            const dragDepth = getMingAltarTableSurfaceDepth(this.currentAltarWidth);
            const newY = Math.max(
              this.currentAltarTopY - dragDepth,
              Math.min(this.currentAltarTopY, startContY + dy)
            );

            cont!.x = newX;
            cont!.y = newY;
          }
        });

        const handlePointerEnd = () => {
          clearLongPress();
          if (!isItemDragging) return;
          isItemDragging = false;
          if (longPressFired) {
            longPressFired = false;
            return;
          }
          this.draggingId = null;
          cont!.cursor = 'grab';
          cont!.scale.set(this.currentScaleFactor);

          if (hasMoved) {
            sound.playWoodPlacement();
            const spread = this.currentAltarWidth / 560;
            const relX = (cont!.x - this.currentAltarCenterX) / spread / this.currentScaleFactor;
            const relY = (cont!.y - this.currentAltarTopY) / this.currentScaleFactor;
            this.callbacks.onUpdatePosition?.(id as SceneItemId, {
              x: Math.round(relX),
              y: Math.round(relY),
            });
          } else {
            // 点击交互逻辑
            if (id.startsWith('candle_')) {
              if (item.isLit) sound.playExtinguish();
              else sound.playMatchStrike();
              this.callbacks.onToggleLit?.(id as SceneItemId);
            } else if (id.startsWith('fruit_')) {
              sound.playWoodPlacement();
              this.callbacks.onToggleFruit?.(id as SceneItemId);
            } else if (id.startsWith('vase')) {
              sound.playBell(720, 2);
              // 瓶口以上为花冠（换花材），瓶口以下为瓶身（换器型）
              const zone: VaseHitZone = startLocalY < VASE_MOUTH_Y ? 'flowers' : 'vase';
              this.callbacks.onVaseClick?.(id as SceneItemId, zone);
            } else if (id === 'tea_cups') {
              sound.playPorcelainClink();
            } else if (id === 'censer') {
              if (item.isLit) sound.playExtinguish();
              else sound.playMatchStrike();
              this.callbacks.onToggleLit?.(id as SceneItemId);
            }
          }
        };

        cont.on('pointerup', handlePointerEnd);
        cont.on('pointerupoutside', handlePointerEnd);

        this.propContainers.set(id, cont);
        this.propSprites.set(id, sprite);
        this.container.addChild(cont);
      }

      // 如果当前正在拖拽该物品，不覆盖其位置
      if (this.draggingId === id) {
        continue;
      }

      // 计算相对于供案中心的绝对坐标
      const def = defaultLayouts[id] || { xOffset: 0, yOffset: -18 };
      const relX = item.position?.x !== undefined ? item.position.x : def.xOffset;
      // 纵向强制收入台面进深带：兼容历史存档里写在台面前沿之外的正值
      const relYRaw = item.position?.y !== undefined ? item.position.y : def.yOffset;
      const relY = Math.max(-depthUnits, Math.min(0, relYRaw));

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
        const flower = (item.flowerType !== undefined ? item.flowerType : (isRight ? 'lilies' : 'peonies')) as FlowerType | 'none';
        const vaseStyle = (item.vaseStyle || (isRight ? 'painted_iris' : 'warm_white_plain')) as VaseStyle;
        const health = item.lifecycle?.health ?? 1.0;
        const qHealth = Math.round(health * 50) / 50;
        targetKey = getVaseTextureCacheKey(flower, vaseStyle, isRight, qHealth);
        // 花瓶+盛开花束：高挑修长，远超蜡烛高度 (265px 挺拔优雅，对齐参考图1)
        targetW = 210;
        targetH = 265;
        // 命中区随花束有无切换：净瓶时不再保留上方花冠的空命中
        cont.hitArea = vaseHitArea(flower !== 'none');

        if (this.propTextureKeys.get(id) !== targetKey) {
          this.propTextureKeys.set(id, targetKey);
          this.pipeline.getVaseTexture(flower, isRight, vaseStyle, qHealth).then((tex) => {
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
        targetW = 86;
        targetH = 46;

        if (this.propTextureKeys.get(id) !== targetKey) {
          this.propTextureKeys.set(id, targetKey);
          this.pipeline.getCenserTexture(isLit).then((tex) => {
            if (sprite && !sprite.destroyed) {
              sprite.texture = tex;
              sprite.anchor.set(0.5, 0.92);
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
        this.incenseSmoke.sprite.y = -34;
      } else if (id.startsWith('candle_')) {
        const health = Number(item.waxHeight ?? item.lifecycle?.health ?? 1.0);
        const isLit = !!item.isLit;
        const qHealth = Math.round(health * 10) / 10;
        const currentWaxFactor = Math.max(0.08, Math.min(1.0, qHealth));
        // 蜡烛主体纤巧秀美 (高度 18~72px，宽度 28px，严禁大红柱或巨烛)
        const candleH = Math.round(18 + 54 * currentWaxFactor);

        targetKey = `candle_w_${qHealth}_${isLit ? '1' : '0'}`;
        targetW = 28;
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

        // 绑定 60FPS 动态真实烛火到蜡烛凹槽 (火苗高度~24px，纤巧灵动)
        let flame = this.candleFlames.get(id);
        if (!flame || flame.sprite.destroyed) {
          flame = new CandleFlameRenderer();
          this.candleFlames.set(id, flame);
        }
        if (!cont.children.includes(flame.sprite)) {
          cont.addChild(flame.sprite);
        }
        flame.sprite.x = 0;
        flame.sprite.y = -candleH + 5;
        flame.sprite.visible = isLit;
      } else if (id.startsWith('fruit_')) {
        const fruitType = (item.fruitType || 'apples') as FruitType;
        targetKey = `fruit_${fruitType}`;
        targetW = 98;
        targetH = 80;

        if (this.propTextureKeys.get(id) !== targetKey) {
          this.propTextureKeys.set(id, targetKey);
          this.pipeline.getFruitTexture(fruitType).then((tex) => {
            if (sprite && !sprite.destroyed) {
              sprite.texture = tex;
              sprite.anchor.set(0.5, 0.88);
              sprite.width = targetW;
              sprite.height = targetH;
            }
          });
        }
      } else if (id === 'tea_cups') {
        targetKey = 'tea_cups_trio';
        targetW = 86;
        targetH = 38;

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
        targetW = 66;
        targetH = 54;

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
    this.syncCandlesToEffects();
  }

  /**
   * 导出当前烛火点光源（火苗核心位置 + 明灭强度），供案体按光源位置计算照明。
   */
  public getCandleLightSources(): AltarLightSource[] {
    const leftCandleCont = this.propContainers.get('candle_left');
    const rightCandleCont = this.propContainers.get('candle_right');
    const leftCandle = this.latestItems.candle_left;
    const rightCandle = this.latestItems.candle_right;

    const build = (cont: Container | undefined, item: SceneItem | undefined, fallbackX: number) => {
      const isLit = !!item?.isLit;
      const health = Number(item?.waxHeight ?? (item?.lifecycle?.health ?? 1.0));
      const wax = Math.max(0.08, Math.min(1.0, Math.round(health * 10) / 10));
      const candleH = Math.round(18 + 54 * wax);
      const flameY = cont
        ? cont.y - (candleH + 5) * this.currentScaleFactor
        : this.currentAltarTopY - (candleH + 5) * this.currentScaleFactor;
      // 转换为舞台全局坐标：道具层与案体层视差系数不同，不可直接复用局部坐标
      const global = this.container.toGlobal({
        x: cont ? cont.x : fallbackX,
        y: flameY,
      });
      return {
        x: global.x,
        y: global.y,
        // 烛光强度随蜡体余量递减，熄灭为 0
        intensity: isLit ? Math.max(0.35, 0.55 + 0.45 * wax) : 0,
      };
    };

    return [
      build(leftCandleCont, leftCandle, this.currentAltarCenterX - 74 * this.currentScaleFactor),
      build(rightCandleCont, rightCandle, this.currentAltarCenterX + 74 * this.currentScaleFactor),
    ];
  }

  private syncCandlesToEffects(): void {
    if (!this.pixiEffects) return;
    const leftCandleCont = this.propContainers.get('candle_left');
    const rightCandleCont = this.propContainers.get('candle_right');

    const leftCandle = this.latestItems.candle_left;
    const rightCandle = this.latestItems.candle_right;

    const leftHealth = Number(leftCandle?.waxHeight ?? (leftCandle?.lifecycle?.health ?? 1.0));
    const rightHealth = Number(rightCandle?.waxHeight ?? (rightCandle?.lifecycle?.health ?? 1.0));

    const leftCurrentWax = Math.max(0.08, Math.min(1.0, Math.round(leftHealth * 10) / 10));
    const rightCurrentWax = Math.max(0.08, Math.min(1.0, Math.round(rightHealth * 10) / 10));

    const leftCandleH = Math.round(18 + 54 * leftCurrentWax);
    const rightCandleH = Math.round(18 + 54 * rightCurrentWax);

    // 火苗中心位于蜡烛凹槽向上 (candleH + 5) 处，精准对准跳动的火苗核心
    const leftFlameCenterY = leftCandleCont
      ? leftCandleCont.y - (leftCandleH + 5) * this.currentScaleFactor
      : this.currentAltarTopY - (leftCandleH + 5) * this.currentScaleFactor;
    const rightFlameCenterY = rightCandleCont
      ? rightCandleCont.y - (rightCandleH + 5) * this.currentScaleFactor
      : this.currentAltarTopY - (rightCandleH + 5) * this.currentScaleFactor;

    this.pixiEffects.updateCandles(
      leftCandleCont ? leftCandleCont.x : this.currentAltarCenterX - 74 * this.currentScaleFactor,
      leftFlameCenterY,
      !!leftCandle?.isLit,
      rightCandleCont ? rightCandleCont.x : this.currentAltarCenterX + 74 * this.currentScaleFactor,
      rightFlameCenterY,
      !!rightCandle?.isLit,
      this.currentScaleFactor
    );
  }

  public update(delta: number = 1): void {
    this.animTime += delta;

    // 清风拂动花枝微摇 (自然多频正弦波复合风力物理，覆盖全部常规与审计名花名瓷)
    for (const [id, cont] of this.propContainers.entries()) {
      if (id.startsWith('vase')) {
        const seed = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
        const windSway = Math.sin(this.animTime * 0.018 + seed * 0.4) * 0.018 + Math.cos(this.animTime * 0.038 + seed * 0.7) * 0.008;
        cont.rotation = windSway;
      } else if (id.startsWith('offered_flower_')) {
        cont.rotation = Math.sin(this.animTime * 0.015 + id.charCodeAt(id.length - 1)) * 0.006;
      }
    }

    // 烛火 / 香烟：Canvas 重绘 + 贴图上传，按 EFFECT_REDRAW_STEP 降频（≈30FPS）
    this.effectAccum += delta;
    if (this.effectAccum >= EFFECT_REDRAW_STEP) {
      const effDelta = this.effectAccum;
      this.effectAccum = 0;

      for (const [id, flame] of this.candleFlames.entries()) {
        if (!flame || !flame.sprite || flame.sprite.destroyed) continue;
        const item = this.latestItems[id];
        const isLit = item ? !!item.isLit : true;
        const health = Number(item?.waxHeight ?? (item?.lifecycle?.health ?? 1.0));
        flame.update(effDelta, isLit, 0.15, 1.0, health, 1.0);
      }

      // 国风工笔缕烟与三炷立香更新
      if (this.incenseSmoke && !this.incenseSmoke.sprite.destroyed) {
        const censerItem = this.latestItems['censer'];
        const isCenserLit = censerItem ? !!censerItem.isLit : true;
        const censerHealth = Number(censerItem?.lifecycle?.health ?? (censerItem?.incenseHealth ?? 1.0));
        this.incenseSmoke.update(effDelta, isCenserLit, 0.15, 1.0, censerHealth, 'day');
      }
    }

    // 每一帧同步烛光位置与光晕
    this.syncCandlesToEffects();
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
