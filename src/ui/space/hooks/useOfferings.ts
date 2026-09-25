/**
 * @file useOfferings.ts
 * @description 供案献供域：案上物件的点选交互与「献花 / 供果 / 祈愿」三类弹窗 handler。
 *
 * 只做两件事：
 * 1. 把场景层的点击（换果、换花、换器、点烛、拖拽、长按考典）翻译成 items 状态变更；
 * 2. 打开献花 / 供果面板并把回调注入其中。
 * 光照、背景墙、地面等环境状态不在本域，见 useHallAmbience。
 */
import { useState } from 'react';
import type React from 'react';
import { SceneItem, SceneItemId, FlowerType, FruitType, VaseHitZone } from '../../../types';
import { VaseStyle, getVaseStyleMeta, FLOWER_REGISTRY } from '../../../pixi';
import { sound } from '../../../utils/audio';
import { findOptimalTableSpot, planSpotsSequentially } from '../../../utils/tablePlan';
import { resolveSceneItemLoreId } from '../../../data/lore';
import { openRelicLore } from '../../lore';
import { openFlowerOffering, openFruitOffering } from '../offering';
import {
  createBouquetItem,
  FLOWER_CYCLE_ORDER,
  FLOWER_DISPLAY_NAMES,
  FRUIT_CYCLE_ORDER,
  FRUIT_DISPLAY_NAMES,
  VASE_STYLE_CYCLE_ORDER,
  buildStandardItems,
  buildAuditItems,
} from '../../../data/sceneItems';
import { AuditInfo } from '../audit/useAuditStage';

export interface UseOfferingsOptions {
  items: Record<SceneItemId, SceneItem>;
  setItems: React.Dispatch<React.SetStateAction<Record<SceneItemId, SceneItem>>>;
  showToast: (message: string) => void;
  /** 触发落英缤纷动效 */
  onPetalTrigger: () => void;
  /** 审计展台现场快照（审计中的花材/器形由展台固定，点击仅提示） */
  audit: AuditInfo;
}

export const useOfferings = ({ items, setItems, showToast, onPetalTrigger, audit }: UseOfferingsOptions) => {
  const [currentFlower, setCurrentFlower] = useState<FlowerType>('peonies');
  const [lastOfferedFlower, setLastOfferedFlower] = useState<FlowerType>('peonies');

  /* ── 案上物件点选 ─────────────────────────────────────────────────────── */

  const handleToggleFruit = (id: SceneItemId) => {
    setItems((prev) => {
      const item = prev[id];
      if (!item) return prev;
      const current = item.fruitType || 'apples';
      const curIdx = FRUIT_CYCLE_ORDER.indexOf(current);
      const next: FruitType = FRUIT_CYCLE_ORDER[(curIdx + 1) % FRUIT_CYCLE_ORDER.length];
      const nextName = FRUIT_DISPLAY_NAMES[next];
      showToast(`已更换供果为「${nextName}」`);
      sound.playPorcelainClink();
      return {
        ...prev,
        [id]: {
          ...item,
          fruitType: next,
          name: `${nextName}高足盘 (${id.includes('left') ? '左' : id.includes('right') ? '右' : '敬献'})`,
        },
      };
    });
  };

  const updateItemPosition = (id: SceneItemId, pos: { x: number; y: number }) => {
    setItems((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        position: pos,
      },
    }));
  };

  const toggleItemLit = (id: SceneItemId) => {
    setItems((prev) => {
      const item = prev[id];
      if (!item) return prev;
      const nextLit = !item.isLit;
      const updated: SceneItem = {
        ...item,
        isLit: nextLit,
        lifecycle:
          (item.lifecycle?.stage === 'expired' || (item.lifecycle?.health ?? 1) <= 0.05) && nextLit
            ? {
                ...item.lifecycle,
                stage: 'blooming',
                age: 0,
                health: 1.0,
              }
            : item.lifecycle,
      };
      if (item.lifecycle?.stage === 'expired' || (item.lifecycle?.health ?? 1) <= 0.05) {
        showToast(id.startsWith('candle') ? '已添上崭新长明红烛并点燃' : '已敬奉崭新三炷高香并点燃');
      }
      return {
        ...prev,
        [id]: updated,
      };
    });
  };

  /** 长按案上物件：查其典故出处（一花、一器、一果、一纹样，各有来历） */
  const handleInspectItem = (id: SceneItemId) => {
    const loreId = resolveSceneItemLoreId(id, items[id]);
    if (!loreId) {
      showToast('此物尚未录入典藏');
      return;
    }
    openRelicLore(loreId);
  };

  /** 点击瓶身（非花冠区）：循环切换器形 */
  const handleToggleVaseStyle = (id: SceneItemId) => {
    if (id.startsWith('vase_audit_flower_') || (audit.isAuditMode && audit.category === 'flowers')) {
      const item = items[id];
      if (item) {
        sound.playPorcelainClink();
        const meta = item.flowerType ? FLOWER_REGISTRY[item.flowerType] : null;
        if (meta) {
          showToast(`🌸【${meta.name}】${meta.poeticTitle} · 名花专项审计中`);
        } else {
          showToast(`🌸【${item.name}】· 名花专项审计中`);
        }
        return;
      }
    }
    if (id.startsWith('vase_audit_') || audit.isAuditMode) {
      const item = items[id];
      if (item) {
        sound.playPorcelainClink();
        showToast(`🏺【${item.name}】· 花器专项审计中`);
        return;
      }
    }
    setItems((prev) => {
      const item = prev[id];
      if (!item || !id.startsWith('vase')) return prev;
      const current = (item.vaseStyle || (id.includes('right') ? 'painted_iris' : 'warm_white_plain')) as VaseStyle;
      const curIdx = VASE_STYLE_CYCLE_ORDER.indexOf(current);
      const next: VaseStyle = VASE_STYLE_CYCLE_ORDER[(curIdx + 1) % VASE_STYLE_CYCLE_ORDER.length];
      const nextMeta = getVaseStyleMeta(next);
      showToast(`已更换花瓶为「${nextMeta.name}」`);
      sound.playPorcelainClink();
      return {
        ...prev,
        [id]: {
          ...item,
          vaseStyle: next,
          name: `${nextMeta.name} (${id.includes('left') ? '左' : '右'})`,
        },
      };
    });
  };

  /** 点击花冠：循环切换瓶中的花材 */
  const cycleVaseFlower = (id: SceneItemId) => {
    const item = items[id];
    if (!item || !id.startsWith('vase')) return;

    const isRight = id.includes('right');
    const current = (item.flowerType || (isRight ? 'lilies' : 'peonies')) as FlowerType;
    const curIdx = FLOWER_CYCLE_ORDER.indexOf(current);
    const next = FLOWER_CYCLE_ORDER[(curIdx + 1) % FLOWER_CYCLE_ORDER.length];
    const name = FLOWER_DISPLAY_NAMES[next] || '鲜花';

    setItems((prev) => {
      const prevItem = prev[id];
      if (!prevItem) return prev;
      return {
        ...prev,
        [id]: {
          ...prevItem,
          flowerType: next,
          name: `${name}花瓶 (${isRight ? '右' : '左'})`,
        },
      };
    });

    setLastOfferedFlower(next);
    onPetalTrigger();
    sound.playPorcelainClink();
    sound.playBell(660, 1.6);
    showToast(`已更换插花为「${name}」`);
  };

  /**
   * 花瓶分区点击：命中花冠换花材，命中瓶身换器型，两类切换互不干扰。
   */
  const handleVaseClick = (id: SceneItemId, zone?: VaseHitZone) => {
    if (zone === 'flowers') {
      // 名花专项审计展台：花材由展台固定，点击仅作提示
      if (id.startsWith('vase_audit_flower_') || (audit.isAuditMode && audit.category === 'flowers')) {
        const item = items[id];
        if (item) {
          sound.playPorcelainClink();
          const meta = item.flowerType ? FLOWER_REGISTRY[item.flowerType] : null;
          if (meta) {
            showToast(`🌸【${meta.name}】${meta.poeticTitle} · 名花专项审计中`);
          } else {
            showToast(`🌸【${item.name}】· 名花专项审计中`);
          }
          return;
        }
      }
      cycleVaseFlower(id);
      return;
    }
    handleToggleVaseStyle(id);
  };

  const handleRemoveItem = (id: SceneItemId) => {
    setItems((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    sound.playWoodPlacement();
    showToast('已从供案上撤下该项');
  };

  const toggleAllCandles = () => {
    const anyLit = items.candle_left?.isLit || items.candle_right?.isLit || items.censer?.isLit;
    if (anyLit) {
      sound.playExtinguish();
      setItems((prev) => ({
        ...prev,
        candle_left: prev.candle_left ? { ...prev.candle_left, isLit: false } : prev.candle_left,
        candle_right: prev.candle_right ? { ...prev.candle_right, isLit: false } : prev.candle_right,
        censer: prev.censer ? { ...prev.censer, isLit: false } : prev.censer,
      }));
      showToast('已熄灭案上全部烛火与香炉');
    } else {
      sound.playMatchStrike();
      sound.playBell(528, 2.5);
      setItems((prev) => {
        const renewOrLight = (item: SceneItem | undefined, type: 'candle' | 'censer'): SceneItem | undefined => {
          if (!item) return item;
          const isExpired = item.lifecycle?.stage === 'expired' || (item.lifecycle?.health ?? 1) <= 0.05;
          if (isExpired) {
            return {
              ...item,
              isLit: true,
              ...(type === 'candle' ? { waxHeight: 1.0 } : {}),
              ...(type === 'censer' ? { incenseHealth: 1.0 } : {}),
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
          return { ...item, isLit: true };
        };

        // 已撤下的摆件不应被写回 undefined 空位（会让下游渲染层读到空对象）
        const next: Record<SceneItemId, SceneItem> = { ...prev };
        const nextLeft = renewOrLight(prev.candle_left, 'candle');
        const nextRight = renewOrLight(prev.candle_right, 'candle');
        const nextCenser = renewOrLight(prev.censer, 'censer');
        if (nextLeft) next.candle_left = nextLeft;
        if (nextRight) next.candle_right = nextRight;
        if (nextCenser) next.censer = nextCenser;
        return next;
      });
      showToast('已重新奉上并点燃长明红烛与清香');
    }
  };

  /** 案面复位：审计展台与常规五供各归其位 */
  const resetTableLayout = () => {
    sound.playWoodPlacement();
    setItems(
      audit.isAuditMode
        ? buildAuditItems(audit.category, audit.group, audit.withFlowers, audit.decayHealth)
        : buildStandardItems()
    );
    showToast('案面摆设已恢复初始格局');
  };

  /* ── 献花 ─────────────────────────────────────────────────────────────── */

  const handleAddOfferedFlower = (flowerType: FlowerType) => {
    const newId = `offered_flower_${Date.now()}`;
    const name = FLOWER_DISPLAY_NAMES[flowerType] || '鲜花';

    // 按案面平面占用求解相对最优摆位（避开既有陈设，多束时错落排开不重叠）
    const spot = findOptimalTableSpot(items, { radius: 59, depthRadius: 14, preferredDepth: -14 });

    const newBouquet = createBouquetItem(flowerType, spot, { id: newId, name: `敬献 · ${name}` });

    setItems((prev) => ({
      ...prev,
      [newId]: newBouquet,
    }));

    setCurrentFlower(flowerType);
    setLastOfferedFlower(flowerType);
    onPetalTrigger();
    sound.playBell(560, 2);
    showToast(`已将新鲜「${name}」奉献于供案桌面，可在案上随意拖拽摆放`);
  };

  const handleChangeVaseFlower = (side: 'left' | 'right' | 'both', flowerType: FlowerType) => {
    const name = FLOWER_DISPLAY_NAMES[flowerType] || '鲜花';

    setItems((prev) => {
      const next = { ...prev };
      if (side === 'left' || side === 'both') {
        next.vase_left = {
          ...next.vase_left,
          flowerType,
          name: `${name}花瓶 (左)`,
        };
      }
      if (side === 'right' || side === 'both') {
        next.vase_right = {
          ...next.vase_right,
          flowerType,
          name: `${name}花瓶 (右)`,
        };
      }
      return next;
    });

    setLastOfferedFlower(flowerType);
    onPetalTrigger();
    showToast(`已更换花瓶插花为「${name}」`);
  };

  const handleChangeVaseStyle = (side: 'left' | 'right' | 'both', vaseStyle: VaseStyle) => {
    const meta = getVaseStyleMeta(vaseStyle);
    setItems((prev) => {
      const next = { ...prev };
      if (side === 'left' || side === 'both') {
        if (next.vase_left) {
          next.vase_left = {
            ...next.vase_left,
            vaseStyle,
            name: `${meta.name} (左)`,
          };
        }
      }
      if (side === 'right' || side === 'both') {
        if (next.vase_right) {
          next.vase_right = {
            ...next.vase_right,
            vaseStyle,
            name: `${meta.name} (右)`,
          };
        }
      }
      return next;
    });
    sound.playPorcelainClink();
    sound.playBell(640, 2);
    showToast(`已更换花瓶形制为「${meta.name}」`);
  };

  const handleClearOfferedFlowers = () => {
    setItems((prev) => {
      const next = { ...prev };
      for (const k of Object.keys(next)) {
        if (k.startsWith('offered_flower_')) {
          delete next[k];
        }
      }
      return next;
    });
    sound.playWoodPlacement();
    showToast('已清空供案上的全部献花捧束');
  };

  const handleFillTenFlowers = () => {
    sound.playBell(528, 2.5);
    onPetalTrigger();

    const flowerOrder: FlowerType[] = [
      'peonies',
      'lilies',
      'lotus',
      'chrysanthemum',
      'roses',
      'plum_blossoms',
      'sunflowers',
      'carnations',
      'calla_lilies',
      'tulips',
    ];
    // 十捧花一次性排布：逐件求解并把已排定的计入占用，互不重叠
    const spots = planSpotsSequentially(items, flowerOrder.length, {
      radius: 59,
      depthRadius: 14,
      preferredDepth: -12,
    });

    setItems((prev) => {
      const next: Record<SceneItemId, SceneItem> = { ...prev };
      for (const key of Object.keys(next)) {
        if (key.startsWith('offered_flower_')) delete next[key];
      }
      flowerOrder.forEach((flower, idx) => {
        const id = `offered_flower_fill_${idx}`;
        next[id] = createBouquetItem(flower, spots[idx], {
          id,
          name: `敬献 · ${FLOWER_DISPLAY_NAMES[flower] || '鲜花'}`,
        });
      });
      return next;
    });

    showToast('已一键布设十捧香花盛供，案前繁花锦簇');
  };

  /* ── 供果 ─────────────────────────────────────────────────────────────── */

  const handleAddOfferedFruit = (fruitType: FruitType) => {
    const newId = `fruit_offered_${Date.now()}`;
    const nextName = FRUIT_DISPLAY_NAMES[fruitType];

    // 果盘占地略大，取相应的占地半径并摆在中前部
    const spot = findOptimalTableSpot(items, { radius: 49, depthRadius: 14, preferredDepth: -10 });

    const newFruitDish: SceneItem = {
      id: newId,
      type: 'fruit',
      name: `敬奉 · ${nextName}`,
      fruitType,
      position: spot,
      scale: 0.95,
    };

    setItems((prev) => ({
      ...prev,
      [newId]: newFruitDish,
    }));

    sound.playBell(560, 2);
    sound.playPorcelainClink();
    showToast(`已向供案敬奉一盘新鲜「${nextName}」，可在案台自由拖拽摆放`);
  };

  const handleChangeMainFruit = (side: 'left' | 'right' | 'both', fruitType: FruitType) => {
    const nextName = FRUIT_DISPLAY_NAMES[fruitType];

    setItems((prev) => {
      const next = { ...prev };
      if (side === 'left' || side === 'both') {
        if (next.fruit_left) {
          next.fruit_left = {
            ...next.fruit_left,
            fruitType,
            name: `${nextName}高足盘 (左)`,
          };
        }
      }
      if (side === 'right' || side === 'both') {
        if (next.fruit_right) {
          next.fruit_right = {
            ...next.fruit_right,
            fruitType,
            name: `${nextName}高足盘 (右)`,
          };
        }
      }
      return next;
    });

    sound.playPorcelainClink();
    showToast(
      `已将${side === 'left' ? '左侧' : side === 'right' ? '右侧' : '左右双侧'}主果盘设置为「${nextName}」`
    );
  };

  const handleClearOfferedFruits = () => {
    setItems((prev) => {
      const next = { ...prev };
      for (const k of Object.keys(next)) {
        if (k.startsWith('fruit_offered_')) {
          delete next[k];
        }
      }
      return next;
    });
    sound.playWoodPlacement();
    showToast('已从供案上撤下全部新增敬献果盘');
  };

  /* ── 祈愿 ─────────────────────────────────────────────────────────────── */

  const handleBlessingSubmit = (blessingText: string) => {
    // 祈愿呈奉时一并点亮案上香烛
    setItems((prev) => ({
      ...prev,
      ...(prev.candle_left ? { candle_left: { ...prev.candle_left, isLit: true } } : {}),
      ...(prev.candle_right ? { candle_right: { ...prev.candle_right, isLit: true } } : {}),
      ...(prev.censer ? { censer: { ...prev.censer, isLit: true } } : {}),
    }));
    showToast(`祈愿已诚心呈奉：「${blessingText.slice(0, 16)}...」`);
  };

  /* ── 弹窗入口 ─────────────────────────────────────────────────────────── */

  const openFlowerPicker = () => {
    openFlowerOffering({
      currentFlower,
      onSelectFlower: setCurrentFlower,
      onAddOfferedFlower: handleAddOfferedFlower,
      onChangeVaseFlower: handleChangeVaseFlower,
      onChangeVaseStyle: handleChangeVaseStyle,
      leftVaseFlower: items.vase_left?.flowerType || 'peonies',
      rightVaseFlower: items.vase_right?.flowerType || 'lilies',
      leftVaseStyle: items.vase_left?.vaseStyle || 'warm_white_plain',
      rightVaseStyle: items.vase_right?.vaseStyle || 'painted_iris',
      offeredCount: Object.keys(items).filter((k) => k.startsWith('offered_flower_')).length,
      onClearOfferedFlowers: handleClearOfferedFlowers,
      onFillTenFlowers: handleFillTenFlowers,
    });
  };

  const openFruitPicker = () => {
    openFruitOffering({
      onAddOfferedFruit: handleAddOfferedFruit,
      onChangeMainFruit: handleChangeMainFruit,
      leftFruitType: items.fruit_left?.fruitType || 'apples',
      rightFruitType: items.fruit_right?.fruitType || 'oranges',
      offeredCount: Object.keys(items).filter((k) => k.startsWith('fruit_offered_')).length,
      onClearOfferedFruits: handleClearOfferedFruits,
    });
  };

  return {
    currentFlower,
    lastOfferedFlower,
    handleToggleFruit,
    updateItemPosition,
    toggleItemLit,
    handleInspectItem,
    handleVaseClick,
    handleRemoveItem,
    toggleAllCandles,
    resetTableLayout,
    handleAddOfferedFlower,
    handleChangeVaseFlower,
    handleChangeVaseStyle,
    handleClearOfferedFlowers,
    handleFillTenFlowers,
    handleAddOfferedFruit,
    handleChangeMainFruit,
    handleClearOfferedFruits,
    handleBlessingSubmit,
    openFlowerPicker,
    openFruitPicker,
  };
};
