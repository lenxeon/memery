/**
 * @file App.tsx
 * @description 应用程序根组件，负责整合供桌场景、实体状态机、全局光影氛围、弹窗交互及音效调度。
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  SceneItem,
  SceneItemId,
  LightingSettings,
  MemorialInfo,
  FlowerType,
  FruitType,
  WorldContext,
  EntityTypeId,
  TableclothStyle,
  WallBackgroundStyle
} from './types';
import { AltarWall, AltarTable, FloorPlanks, MemorialPortrait } from './components/scene';
import { VolumetricRays, DustMotes, PetalShower } from './components/effects';
import { EnvironmentDrawer, WALL_STYLE_OPTIONS, FlowerPickerModal, BlessingModal } from './components/settings';
import { BottomDock, FpsMonitor } from './components/controls';
import { FloraFactory, RitualFactory, VesselFactory, itemRegistry } from './game/factories/AbstractItemFactory';
import { useWorldLoop } from './game/lifecycle/useWorldLoop';
import { sound } from './utils/audio';
import {
  Sun,
  Moon,
  Sunset,
  Power,
  Volume2,
  VolumeX,
  Sparkles,
  SlidersHorizontal,
  Heart
} from 'lucide-react';

export const buildInitialItems = (): Record<SceneItemId, SceneItem> => ({
  // ── Symmetrical Pillars: Vases, Candles, Censer ──
  vase_left: FloraFactory.createVase('left', 'peonies', { x: -164, y: -4 }),
  vase_right: FloraFactory.createVase('right', 'lilies', { x: 164, y: -4 }),
  candle_left: RitualFactory.createCandle('left', { x: -74, y: 3 }, true),
  candle_right: RitualFactory.createCandle('right', { x: 74, y: 3 }, true),
  censer: RitualFactory.createCenser({ x: 0, y: 6 }, true),

  // ── Auspicious Offerings (香、花、灯、水、果 · 五供齐备) ──
  fruit_left: VesselFactory.createFruitPlatter('left', 'apples', { x: -118, y: 16 }),
  fruit_right: VesselFactory.createFruitPlatter('right', 'oranges', { x: 118, y: 16 }),
  tea_cups: VesselFactory.createTeaCups({ x: 0, y: 22 }),
  singing_bowl: RitualFactory.createSingingBowl({ x: -62, y: 32 }),

  // ── Ten Fresh Flower Offerings (十景香花盛供 · 繁花锦簇 · 带生命周期) ──
  offered_flower_1: FloraFactory.createOfferedBouquet('peonies', { x: -192, y: 14 }, { id: 'offered_flower_1', name: '敬献 · 重瓣粉牡丹 (左翼)' }),
  offered_flower_2: FloraFactory.createOfferedBouquet('lilies', { x: 192, y: 14 }, { id: 'offered_flower_2', name: '敬献 · 纯白东方百合 (右翼)' }),
  offered_flower_3: FloraFactory.createOfferedBouquet('lotus', { x: -152, y: 22 }, { id: 'offered_flower_3', name: '敬献 · 出尘清莲 (左侧)' }),
  offered_flower_4: FloraFactory.createOfferedBouquet('roses', { x: 152, y: 22 }, { id: 'offered_flower_4', name: '敬献 · 淡雅香槟玫瑰 (右侧)' }),
  offered_flower_5: FloraFactory.createOfferedBouquet('chrysanthemum', { x: -172, y: 30 }, { id: 'offered_flower_5', name: '敬献 · 高洁白菊 (左中)' }),
  offered_flower_6: FloraFactory.createOfferedBouquet('roses', { x: 172, y: 30 }, { id: 'offered_flower_6', name: '敬献 · 淡雅香槟玫瑰 (右中)' }),
  offered_flower_7: FloraFactory.createOfferedBouquet('peonies', { x: -98, y: 28 }, { id: 'offered_flower_7', name: '敬献 · 重瓣粉牡丹 (左身)' }),
  offered_flower_8: FloraFactory.createOfferedBouquet('chrysanthemum', { x: 98, y: 28 }, { id: 'offered_flower_8', name: '敬献 · 高洁白菊 (右身)' }),
  offered_flower_9: FloraFactory.createOfferedBouquet('lilies', { x: -30, y: 35 }, { id: 'offered_flower_9', name: '敬献 · 纯白东方百合 (左前)' }),
  offered_flower_10: FloraFactory.createOfferedBouquet('lotus', { x: 30, y: 35 }, { id: 'offered_flower_10', name: '敬献 · 出尘清莲 (右前)' }),
});

const INITIAL_ITEMS: Record<SceneItemId, SceneItem> = buildInitialItems();

const INITIAL_LIGHTING: LightingSettings = {
  masterOn: true,
  timeOfDay: 'day',
  sunlightIntensity: 0.92,
  godRaysEnabled: true,
  godRaysIntensity: 0.88,
  sunAngle: -8,
  candleGlowIntensity: 1.0,
  dustDensity: 85,
  windForce: 0.15,
};

const INITIAL_MEMORIAL: MemorialInfo = {
  title: '暖念墙',
  subtitle: 'Warmth & Blessing',
  photoUrl: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=400&q=80',
};

export default function App() {
  const [items, setItems] = useState<Record<SceneItemId, SceneItem>>(INITIAL_ITEMS);
  const [lighting, setLighting] = useState<LightingSettings>(INITIAL_LIGHTING);
  const [memorial, setMemorial] = useState<MemorialInfo>(INITIAL_MEMORIAL);

  // Modals state
  const [isLightingOpen, setIsLightingOpen] = useState(false);
  const [isFlowerOpen, setIsFlowerOpen] = useState(false);
  const [isBlessingOpen, setIsBlessingOpen] = useState(false);
  const [isArrangeMode, setIsArrangeMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Table adornments (桌旗/大桌布与落花瓣)
  const [showTableRunner, setShowTableRunner] = useState(true);
  const [tableclothStyle, setTableclothStyle] = useState<TableclothStyle>('autumn_gold');
  const [showPetals, setShowPetals] = useState(true);

  // Petal shower animation trigger
  const [petalTrigger, setPetalTrigger] = useState(0);
  const [lastOfferedFlower, setLastOfferedFlower] = useState<FlowerType>('peonies');

  // Background space aesthetics (6 款典雅建筑室内风格可选)
  const [wallStyle, setWallStyle] = useState<WallBackgroundStyle>('brick_screen');

  const handleWallStyleChange = (style: WallBackgroundStyle) => {
    setWallStyle(style);
    const opt = WALL_STYLE_OPTIONS.find((o) => o.id === style);
    sound.playBell(540, 2);
    showToast(`已切换背景风格为「${opt?.name || ''} · ${opt?.poeticTitle || ''}」`);
  };

  // Toast / notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  const handleToggleFruit = (id: SceneItemId) => {
    setItems((prev) => {
      const item = prev[id];
      if (!item) return prev;
      const current = item.fruitType || 'apples';
      const next: FruitType = current === 'apples' ? 'oranges' : current === 'oranges' ? 'peaches' : 'apples';
      const fruitNames: Record<FruitType, string> = {
        apples: '平安红苹果',
        oranges: '吉祥金蜜柑',
        peaches: '福寿仙桃',
      };
      showToast(`已更换供果为「${fruitNames[next]}」`);
      return {
        ...prev,
        [id]: {
          ...item,
          fruitType: next,
          name: `${fruitNames[next]}高足盘 (${id.includes('left') ? '左' : '右'})`,
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
      const inferredType: EntityTypeId = (item.type || (
        id.startsWith('candle') ? 'candle' :
          id === 'censer' ? 'censer' : 'candle'
      )) as EntityTypeId;
      const worldContext: WorldContext = {
        deltaSec: 0,
        timeScale,
        lighting,
        soundEnabled,
      };
      const updated = itemRegistry.interactItem({ ...item, type: inferredType }, 'toggle_lit', worldContext);
      if (item.lifecycle?.stage === 'expired' || (item.lifecycle?.health ?? 1) <= 0.05) {
        showToast(id.startsWith('candle') ? '已添上崭新长明红烛并点燃' : '已敬奉崭新三炷高香并点燃');
      }
      return {
        ...prev,
        [id]: updated,
      };
    });
  };

  // Game World Loop: Lifecycle ticking for flowers, candles, incense, fruits
  const { timeScale, setTimeScale } = useWorldLoop({
    items,
    onUpdateItems: setItems,
    lighting,
    soundEnabled,
    initialTimeScale: 1.0,
    onEntityEvent: (event) => {
      if (event.type === 'despawn') {
        showToast('一捧供花完成生命花期，芬芳随风化作尘香');
        setPetalTrigger(Date.now());
      } else if (event.type === 'petal_drop') {
        setPetalTrigger(Date.now());
      }
    },
  });

  const resetTableLayout = () => {
    sound.playWoodPlacement();
    setItems(buildInitialItems());
    showToast('已依中轴规范对齐（花、烛、香严格对称）');
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
              lifecycle: item.lifecycle ? {
                ...item.lifecycle,
                age: 0,
                stage: 'blooming',
                health: 1.0,
              } : undefined,
            };
          }
          return { ...item, isLit: true };
        };

        return {
          ...prev,
          candle_left: renewOrLight(prev.candle_left, 'candle'),
          candle_right: renewOrLight(prev.candle_right, 'candle'),
          censer: renewOrLight(prev.censer, 'censer'),
        } as Record<SceneItemId, SceneItem>;
      });
      showToast('已重新奉上并点燃长明红烛与清香');
    }
  };

  const handleAddOfferedFlower = (flowerType: FlowerType) => {
    const newId = `offered_flower_${Date.now()}`;
    const flowerNameMap: Record<FlowerType, string> = {
      peonies: '粉白重瓣牡丹',
      lilies: '纯净白百合',
      lotus: '出尘清莲',
      chrysanthemum: '高洁白菊',
      roses: '淡雅香槟玫瑰',
    };

    // Calculate natural position near center/front of table
    const existingOffered = Object.keys(items).filter((k) => k.startsWith('offered_flower_')).length;
    const offsetX = existingOffered === 0 ? 0 : (existingOffered % 2 === 1 ? -65 : 65);
    const offsetY = Math.min(24, 14 + (existingOffered % 4) * 3);

    const newBouquet = FloraFactory.createOfferedBouquet(
      flowerType,
      { x: offsetX, y: offsetY },
      { id: newId, name: `敬献 · ${flowerNameMap[flowerType]}` }
    );

    setItems((prev) => ({
      ...prev,
      [newId]: newBouquet,
    }));

    setLastOfferedFlower(flowerType);
    setPetalTrigger(Date.now());
    sound.playBell(560, 2);
    showToast(`已将新鲜「${flowerNameMap[flowerType]}」奉献于供案桌面，可在案上随意拖拽摆放`);
  };

  const handleChangeVaseFlower = (side: 'left' | 'right' | 'both', flowerType: FlowerType) => {
    const flowerNameMap: Record<FlowerType, string> = {
      peonies: '粉白重瓣牡丹',
      lilies: '纯净白百合',
      lotus: '出尘清莲',
      chrysanthemum: '高洁白菊',
      roses: '淡雅香槟玫瑰',
    };

    setItems((prev) => {
      const next = { ...prev };
      if (side === 'left' || side === 'both') {
        next.vase_left = {
          ...next.vase_left,
          flowerType,
          name: `${flowerNameMap[flowerType]}花瓶 (左)`,
        };
      }
      if (side === 'right' || side === 'both') {
        next.vase_right = {
          ...next.vase_right,
          flowerType,
          name: `${flowerNameMap[flowerType]}花瓶 (右)`,
        };
      }
      return next;
    });

    setLastOfferedFlower(flowerType);
    setPetalTrigger(Date.now());
    showToast(`已更换花瓶插花为「${flowerNameMap[flowerType]}」`);
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
    setPetalTrigger(Date.now());
    setItems(buildInitialItems());
    showToast('已一键布设十捧香花盛供，案前繁花锦簇');
  };

  const handleBlessingSubmit = (blessingText: string) => {
    // Also light candles if not lit
    setItems((prev) => ({
      ...prev,
      candle_left: { ...prev.candle_left, isLit: true },
      candle_right: { ...prev.candle_right, isLit: true },
      censer: { ...prev.censer, isLit: true },
    }));
    showToast(`祈愿已诚心呈奉：「${blessingText.slice(0, 16)}...」`);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    if (next) sound.playBell(580, 2);
  };

  // Background ambiance color according to lighting & time
  const getSceneBackgroundClass = () => {
    if (!lighting.masterOn) {
      return 'bg-gradient-to-b from-[#141210] via-[#1c1714] to-[#120f0d] text-stone-200';
    }
    switch (lighting.timeOfDay) {
      case 'sunset':
        return 'bg-gradient-to-b from-[#f3dfcf] via-[#f7eae1] to-[#e8d2c0] text-stone-800';
      case 'night':
        return 'bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#090d16] text-stone-200';
      case 'day':
      default:
        return 'bg-gradient-to-b from-[#fbf8f3] via-[#f5ede3] to-[#e7dacb] text-stone-800';
    }
  };

  return (
    <main
      className={`relative w-full h-screen overflow-hidden flex flex-col items-center justify-between select-none transition-colors duration-700 font-sans ${getSceneBackgroundClass()}`}
    >
      {/* Wall Texture Effect (Hardware accelerated, zero blend cost) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background: `radial-gradient(circle at 50% 35%, transparent 25%, rgba(60, 40, 20, 0.12) 100%)`,
        }}
      />

      {/* Top Header & Quick Environment Bar */}
      <header className="relative z-30 w-full max-w-5xl px-4 pt-3 sm:pt-4 flex items-center justify-between pointer-events-auto">
        {/* Left: FPS Monitor in dev mode & Style Badge */}
        <div className="flex items-center gap-2">
          {import.meta.env.DEV && <FpsMonitor />}
          <button
            type="button"
            onClick={() => setIsLightingOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white border border-amber-200/80 shadow-xs text-xs font-medium text-stone-700 transition-all cursor-pointer hover:shadow-sm"
            title="点击切换背景空间美学风格"
          >
            <span className="text-sm">{WALL_STYLE_OPTIONS.find((o) => o.id === wallStyle)?.iconText || '🏛️'}</span>
            <span className="font-serif text-amber-950 font-semibold">
              {WALL_STYLE_OPTIONS.find((o) => o.id === wallStyle)?.name}
            </span>
            <span className="hidden sm:inline text-[10px] text-amber-700/80 bg-amber-100/70 px-1.5 py-0.5 rounded-full">
              {WALL_STYLE_OPTIONS.find((o) => o.id === wallStyle)?.poeticTitle}
            </span>
          </button>
        </div>

        {/* Quick controls on right */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Master Light switch */}
          <button
            type="button"
            onClick={() => {
              const next = !lighting.masterOn;
              sound.playBell(next ? 520 : 380, 2);
              setLighting((p) => ({ ...p, masterOn: next }));
            }}
            title={lighting.masterOn ? '点击关闭自然光照' : '点击开启自然光照'}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-xs cursor-pointer ${lighting.masterOn
                ? 'bg-amber-100/90 hover:bg-amber-200/90 text-amber-900 border border-amber-300/80'
                : 'bg-stone-800 text-stone-300 border border-stone-700'
              }`}
          >
            <Power size={13} className={lighting.masterOn ? 'text-amber-600' : 'text-stone-400'} />
            <span className="hidden sm:inline">{lighting.masterOn ? '日照开' : '烛夜暗'}</span>
          </button>

          {/* Time presets quick switch */}
          <div className="hidden sm:flex items-center bg-white/90 rounded-full p-0.5 border border-amber-200/60 shadow-xs text-xs">
            <button
              type="button"
              onClick={() => {
                sound.playBell(480, 2);
                setLighting((p) => ({ ...p, timeOfDay: 'day' }));
              }}
              className={`p-1.5 rounded-full transition-colors ${lighting.timeOfDay === 'day' ? 'bg-amber-200/80 text-amber-900' : 'text-stone-500 hover:text-stone-800'
                }`}
              title="白昼晨光"
            >
              <Sun size={14} />
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playBell(440, 2);
                setLighting((p) => ({ ...p, timeOfDay: 'sunset' }));
              }}
              className={`p-1.5 rounded-full transition-colors ${lighting.timeOfDay === 'sunset' ? 'bg-orange-200/80 text-orange-900' : 'text-stone-500 hover:text-stone-800'
                }`}
              title="黄昏暖阳"
            >
              <Sunset size={14} />
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playBell(390, 2);
                setLighting((p) => ({ ...p, timeOfDay: 'night' }));
              }}
              className={`p-1.5 rounded-full transition-colors ${lighting.timeOfDay === 'night' ? 'bg-slate-700 text-indigo-300' : 'text-stone-500 hover:text-stone-800'
                }`}
              title="静谧微夜"
            >
              <Moon size={14} />
            </button>
          </div>

          {/* Sound toggle */}
          <button
            type="button"
            onClick={toggleSound}
            title={soundEnabled ? '静音' : '开启颂钵音效'}
            className="p-1.5 sm:p-2 rounded-full bg-white/90 border border-amber-200/60 text-stone-700 hover:bg-white shadow-xs cursor-pointer transition-colors"
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} className="text-stone-400" />}
          </button>

          {/* Detailed Ambiance panel button */}
          <button
            type="button"
            onClick={() => setIsLightingOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/90 border border-amber-200/60 text-stone-700 hover:bg-white shadow-xs text-xs cursor-pointer transition-colors"
          >
            <SlidersHorizontal size={13} className="text-amber-700" />
            <span className="hidden sm:inline font-medium">调光</span>
          </button>
        </div>
      </header>

      {/* Floating Toast */}
      {toastMessage && (
        <div className="absolute top-16 z-50 animate-in fade-in slide-in-from-top-3 duration-300 flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900/90 backdrop-blur-md text-amber-100 text-xs shadow-xl border border-amber-500/30 pointer-events-none">
          <Sparkles size={14} className="text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Core Simulation Stage */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-center overflow-hidden">
        {/* Layer 1: Cathedral Window / Architectural Wall Niche */}
        <AltarWall
          masterOn={lighting.masterOn}
          sunlightIntensity={lighting.masterOn ? lighting.sunlightIntensity : 0.05}
          timeOfDay={lighting.timeOfDay}
          sunAngle={lighting.sunAngle}
          wallStyle={wallStyle}
        />

        {/* Layer 2: Volumetric Rays (Tyndall Light Beams / God Rays) */}
        <VolumetricRays
          enabled={lighting.masterOn && lighting.godRaysEnabled}
          intensity={lighting.godRaysIntensity}
          sunAngle={lighting.sunAngle}
          timeOfDay={lighting.timeOfDay}
        />

        {/* Layer 3: Floating Dust Motes caught in the sunlight */}
        <DustMotes
          density={lighting.dustDensity}
          sunlightIntensity={lighting.masterOn ? lighting.sunlightIntensity : 0.15}
          windForce={lighting.windForce}
          timeOfDay={lighting.timeOfDay}
        />

        {/* Layer 4: Realistic Perspective Wooden Floorboards with Window Sunlight Projection */}
        <FloorPlanks lighting={lighting} />

        {/* Layer 5: Sacred Memorial Portrait Frame (Centered against window) */}
        <div className="absolute top-[16%] sm:top-[18%] z-20 pointer-events-auto">
          <MemorialPortrait
            info={memorial}
            onUpdateInfo={(up) => setMemorial((prev) => ({ ...prev, ...up }))}
            sunlightIntensity={lighting.masterOn ? lighting.sunlightIntensity : 0.2}
            timeOfDay={lighting.timeOfDay}
          />
        </div>

        {/* Layer 6: Altar Table with all draggable items (Vases, Candles, Censer with Smoke, Offered Flowers, Fruits, Tea, Singing Bowl) */}
        <div className="absolute bottom-16 sm:bottom-20 z-25 w-full flex justify-center px-4">
          <AltarTable
            items={items}
            onUpdateItemPosition={updateItemPosition}
            onToggleItemLit={toggleItemLit}
            onResetLayout={resetTableLayout}
            onRemoveItem={handleRemoveItem}
            onToggleFruit={handleToggleFruit}
            showTableRunner={showTableRunner}
            tableclothStyle={tableclothStyle}
            showPetals={showPetals}
            lighting={lighting}
            isArrangeMode={isArrangeMode}
          />
        </div>

        {/* Layer 7: Gentle Petal Shower upon flower offering */}
        <PetalShower activeTrigger={petalTrigger} flowerType={lastOfferedFlower} />
      </div>

      {/* Bottom Navigation Dock (reproducing user's bottom buttons: 献花 / 点烛 / 置台 / 氛围 / 祈愿) */}
      <BottomDock
        onOpenFlowers={() => setIsFlowerOpen(true)}
        onToggleCandles={toggleAllCandles}
        candlesLit={items.candle_left.isLit || items.candle_right.isLit}
        onToggleArrangeMode={() => setIsArrangeMode(!isArrangeMode)}
        isArrangeMode={isArrangeMode}
        onOpenLighting={() => setIsLightingOpen(true)}
        onOpenBlessing={() => setIsBlessingOpen(true)}
      />

      {/* Modals & Drawers */}

      <EnvironmentDrawer
        isOpen={isLightingOpen}
        onClose={() => setIsLightingOpen(false)}
        lighting={lighting}
        onUpdateLighting={(up) => setLighting((prev) => ({ ...prev, ...up }))}
        onToggleAllCandles={toggleAllCandles}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        showTableRunner={showTableRunner}
        tableclothStyle={tableclothStyle}
        onChangeTableclothStyle={(st) => {
          sound.playWoodPlacement();
          setTableclothStyle(st);
        }}
        onToggleTableRunner={() => {
          sound.playWoodPlacement();
          setShowTableRunner((v) => {
            const next = !v;
            showToast(next ? '已铺设提花织锦大桌布（整案覆盖 · 金丝流苏）' : '已收起桌布，呈现素雅纯实木案台');
            return next;
          });
        }}
        showPetals={showPetals}
        onTogglePetals={() => setShowPetals((v) => !v)}
        wallStyle={wallStyle}
        onChangeWallStyle={handleWallStyleChange}
        timeScale={timeScale}
        onUpdateTimeScale={setTimeScale}
      />

      <FlowerPickerModal
        isOpen={isFlowerOpen}
        onClose={() => setIsFlowerOpen(false)}
        onAddOfferedFlower={handleAddOfferedFlower}
        onChangeVaseFlower={handleChangeVaseFlower}
        leftVaseFlower={items.vase_left?.flowerType || 'peonies'}
        rightVaseFlower={items.vase_right?.flowerType || 'lilies'}
        offeredCount={Object.keys(items).filter((k) => k.startsWith('offered_flower_')).length}
        onClearOfferedFlowers={handleClearOfferedFlowers}
        onFillTenFlowers={handleFillTenFlowers}
      />

      <BlessingModal
        isOpen={isBlessingOpen}
        onClose={() => setIsBlessingOpen(false)}
        onSubmitBlessing={handleBlessingSubmit}
      />
    </main>
  );
}
