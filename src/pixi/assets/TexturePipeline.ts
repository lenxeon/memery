/**
 * @file TexturePipeline.ts
 * @description PixiJS 资产与纹理管线，负责集中加载与生成所有场景底图、供品摆件、高精写实花卉以及特效纹理。
 * 具备一键全量预热与同步获取能力，保证 60FPS 极速渲染。
 */
import { Texture } from 'pixi.js';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { rasterizeSvgToTexture, getCachedTexture } from './SvgToTexture';
import {
  getVaseWithFlowerSvg,
  getCenserSvg,
  getCandleSvg,
  getFruitDishSvg,
  getTeaCupsSvg,
  getSingingBowlSvg,
  getSingleBouquetSvg,
} from './PropSvgTemplates';
import { FlowerType, FruitType, FloorStyle, WallBackgroundStyle, TableclothStyle, TimeOfDay } from '../../types';
import { FLOWER_REGISTRY } from '../../components/offerings/flowers/registry';
import { VaseDefs, renderVaseBody, renderVaseMouthBack, VaseStyle } from '../../components/offerings/flowers/vases';
import { getVaseMouthAperture, getVaseSpreadFactor } from '../../components/offerings/flowers/types';
import { FruitDish } from '../../components/offerings/fruits';
import { AltarTableSvg } from '../../components/scene/AltarTableSvg';
import { getWallModule, renderWallDefs } from '../../components/scene/walls/registry';

export class TexturePipeline {
  private static instance: TexturePipeline;
  public isLoaded: boolean = false;

  // 地板真实材质贴图 (5大古典禅意地板)
  public woodPlankTexture: Texture | null = null;
  public marbleTileTexture: Texture | null = null;
  public floorTextures: Record<FloorStyle, Texture | null> = {
    hinoki_wood: null,
    walnut_plank: null,
    herringbone_wood: null,
    wood_planks: null,
    zen_tatami: null,
    marble_tile: null,
  };

  // 烟雾粒子贴图
  public smokeParticleTexture: Texture | null = null;

  // 烛光与高光光晕贴图 (Additive Blending)
  public glowTexture: Texture | null = null;

  // 花瓣粒子贴图
  public petalTextures: Record<FlowerType, Texture | null> = {
    peonies: null,
    lilies: null,
    lotus: null,
    chrysanthemum: null,
    roses: null,
    plum_blossoms: null,
    sunflowers: null,
    carnations: null,
    calla_lilies: null,
    tulips: null,
    narcissus: null,
    lily_of_valley: null,
    orchids: null,
    hydrangeas: null,
    daisies: null,
  };

  public static getInstance(): TexturePipeline {
    if (!TexturePipeline.instance) {
      TexturePipeline.instance = new TexturePipeline();
    }
    return TexturePipeline.instance;
  }

  /**
   * 初始化核心静态资产与预编译纹理
   */
  public async init(): Promise<void> {
    if (this.isLoaded) return;

    try {
      // 1. 生成程序化柔和烟雾与烛光粒子纹理 (同步即时生成)
      this.smokeParticleTexture = this.generateSoftRadialTexture(64, 'rgba(235, 230, 222, 0.45)');
      this.glowTexture = this.generateSoftRadialTexture(128, 'rgba(255, 195, 110, 0.7)');

      // 2. 生成各花系落花粒子纹理
      const petalColors: Record<FlowerType, string> = {
        peonies: '#f472b6',
        lilies: '#fdfbf7',
        lotus: '#fb7185',
        chrysanthemum: '#facc15',
        roses: '#f43f5e',
        plum_blossoms: '#ffffff',
        sunflowers: '#eab308',
        carnations: '#fb7185',
        calla_lilies: '#f8fafc',
        tulips: '#f43f5e',
        narcissus: '#fef08a',
        lily_of_valley: '#ffffff',
        orchids: '#f472b6',
        hydrangeas: '#60a5fa',
        daisies: '#ffffff',
      };

      for (const [key, color] of Object.entries(petalColors)) {
        this.petalTextures[key as FlowerType] = this.generatePetalTexture(color);
      }

      // 3. 加载地坪贴图 (使用原生 Image 加载转 Texture，最健壮不挂起)
      this.loadFloorTextures();

      // 4. 并行预热高频道具纹理 (花瓶、香炉、果盘、茶杯、蜡烛)
      await this.preloadAllCommonProps();

      this.isLoaded = true;
    } catch (err) {
      console.error('Failed to initialize TexturePipeline:', err);
      this.isLoaded = true; // 即使异常也标记为 true，降级渲染，绝不阻塞画面
    }
  }

  private loadFloorTextures(): void {
    const urls: Record<string, string> = {
      hinoki_wood: '/textures/hinoki_wood.jpg',
      walnut_plank: '/textures/walnut_plank.jpg',
      herringbone_wood: '/textures/herringbone_wood.jpg',
      wood_planks: '/textures/herringbone_wood.jpg',
      zen_tatami: '/textures/zen_tatami.jpg',
      marble_tile: '/textures/marble_tile.jpg',
    };

    for (const [key, url] of Object.entries(urls)) {
      try {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          const tex = Texture.from(img);
          this.floorTextures[key as FloorStyle] = tex;
          if (key === 'herringbone_wood' || key === 'wood_planks') {
            this.woodPlankTexture = tex;
          }
          if (key === 'marble_tile') {
            this.marbleTileTexture = tex;
          }
        };
      } catch (e) {
        console.warn('Could not load floor texture:', key, e);
      }
    }
  }

  private async preloadAllCommonProps(): Promise<void> {
    const flowerTypes: FlowerType[] = ['peonies', 'lilies', 'lotus', 'chrysanthemum', 'roses'];
    const fruitTypes: FruitType[] = ['apples', 'oranges', 'peaches'];

    const tasks: Promise<unknown>[] = [
      // 花瓶 (左与右)
      ...flowerTypes.flatMap((f) => [
        this.getVaseTexture(f, false),
        this.getVaseTexture(f, true),
        this.getBouquetTexture(f),
      ]),
      // 香炉
      this.getCenserTexture(true),
      this.getCenserTexture(false),
      // 蜡烛 (初燃、半截、残烛)
      this.getCandleTexture(1.0),
      this.getCandleTexture(0.5),
      this.getCandleTexture(0.2),
      // 水果
      ...fruitTypes.map((fr) => this.getFruitTexture(fr)),
      // 茶杯与颂钵
      this.getTeaCupsTexture(),
      this.getSingingBowlTexture(),
    ];

    await Promise.allSettled(tasks);
  }

  public getVaseTexture(
    flowerType: FlowerType | 'none' = 'peonies',
    isRight: boolean = false,
    vaseStyle: VaseStyle = isRight ? 'painted_iris' : 'warm_white_plain',
    health: number = 1.0
  ): Promise<Texture> {
    const rawHealth = Math.round(health * 50) / 50;
    const key = `vase_${flowerType}_${vaseStyle}_${isRight ? 'R' : 'L'}_h${rawHealth}`;
    const cached = getCachedTexture(key);
    if (cached) return Promise.resolve(cached);

    try {
      const hasFlower = flowerType && flowerType !== 'none';
      const flowerModule = hasFlower ? (FLOWER_REGISTRY[flowerType as FlowerType] || FLOWER_REGISTRY.peonies) : null;
      const FlowerComp = flowerModule?.Component;
      const mouthAperture = getVaseMouthAperture(vaseStyle);
      const spreadFactor = getVaseSpreadFactor(vaseStyle);

      const steppedHealth = rawHealth;
      const steppedDry = Math.round(Math.max(0, Math.min(1.0, (0.75 - steppedHealth) / 0.7)) * 50) / 50;
      const isFaded = steppedHealth <= 0.05;

      const element = React.createElement(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '-50 -70 250 280',
          width: '250',
          height: '280',
        },
        React.createElement(
          'defs',
          null,
          React.createElement(VaseDefs, null)
        ),
        React.createElement('ellipse', {
          cx: 75,
          cy: 193,
          rx: 26,
          ry: 6,
          fill: '#140d07',
          opacity: 0.4,
        }),
        React.createElement(
          'g',
          { transform: isRight ? 'translate(150, 0) scale(-1, 1)' : undefined },
          React.createElement('g', { id: 'vaseMouthBack' }, renderVaseMouthBack(vaseStyle)),
          FlowerComp ? React.createElement(
            'g',
            { id: 'flowerMain' },
            React.createElement(FlowerComp, {
              health: steppedHealth,
              dryFactor: steppedDry,
              isFaded,
              vaseStyle,
              mouthAperture,
              spreadFactor,
            })
          ) : null,
          React.createElement('g', { id: 'vaseBody' }, renderVaseBody(vaseStyle))
        )
      );

      const svg = renderToStaticMarkup(element);
      return rasterizeSvgToTexture(key, svg, 250, 280, 2.5);
    } catch (e) {
      console.warn('Failed to render real flower vase, falling back to template:', e);
      const svg = getVaseWithFlowerSvg(flowerType as FlowerType, isRight);
      return rasterizeSvgToTexture(key, svg, 150, 200, 2.5);
    }
  }

  public getCenserTexture(isLit: boolean = true): Promise<Texture> {
    const key = `censer_${isLit ? 'lit' : 'unlit'}`;
    const cached = getCachedTexture(key);
    if (cached) return Promise.resolve(cached);
    const svg = getCenserSvg(isLit);
    return rasterizeSvgToTexture(key, svg, 100, 52, 2.5);
  }

  public getCandleTexture(health: number = 1.0, isLit: boolean = true): Promise<Texture> {
    const quantized = Math.round(health * 10) / 10;
    const key = `candle_w_${quantized}_${isLit ? '1' : '0'}`;
    const cached = getCachedTexture(key);
    if (cached) return Promise.resolve(cached);

    const currentWaxFactor = Math.max(0.08, Math.min(1.0, quantized));
    const candleH = Math.round(22 + 76 * currentWaxFactor);
    const svg = getCandleSvg(quantized, isLit);
    return rasterizeSvgToTexture(key, svg, 42, candleH, 2.5);
  }

  public getFruitTexture(fruitType: FruitType): Promise<Texture> {
    const key = `fruit_${fruitType}`;
    const cached = getCachedTexture(key);
    if (cached) return Promise.resolve(cached);

    try {
      const raw = renderToStaticMarkup(React.createElement(FruitDish, { fruitType }));
      const svgMatch = raw.match(/<svg[\s\S]*<\/svg>/);
      const svg = svgMatch ? svgMatch[0] : raw;
      return rasterizeSvgToTexture(key, svg, 108, 92, 2.5);
    } catch (e) {
      console.warn('Failed to render real fruit dish, falling back to template:', e);
      const svg = getFruitDishSvg(fruitType);
      return rasterizeSvgToTexture(key, svg, 104, 86, 2.5);
    }
  }

  public getTeaCupsTexture(): Promise<Texture> {
    const key = 'tea_cups_trio';
    const cached = getCachedTexture(key);
    if (cached) return Promise.resolve(cached);
    const svg = getTeaCupsSvg();
    return rasterizeSvgToTexture(key, svg, 108, 48, 2.5);
  }

  public getSingingBowlTexture(): Promise<Texture> {
    const key = 'singing_bowl';
    const cached = getCachedTexture(key);
    if (cached) return Promise.resolve(cached);
    const svg = getSingingBowlSvg();
    return rasterizeSvgToTexture(key, svg, 82, 68, 2.5);
  }

  public getBouquetTexture(flowerType: FlowerType): Promise<Texture> {
    const key = `bouquet_${flowerType}`;
    const cached = getCachedTexture(key);
    if (cached) return Promise.resolve(cached);
    const svg = getSingleBouquetSvg(flowerType);
    return rasterizeSvgToTexture(key, svg, 130, 72, 2.5);
  }

  public getSingleBouquetTexture(flowerType: FlowerType): Promise<Texture> {
    return this.getBouquetTexture(flowerType);
  }

  public generateSoftRadialTexture(size: number, centerColor: string): Texture {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    const center = size / 2;
    const grad = ctx.createRadialGradient(center, center, 0, center, center, center);
    grad.addColorStop(0, centerColor);
    grad.addColorStop(0.4, centerColor.replace(/[\d.]+\)$/, '0.2)'));
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(center, center, center, 0, Math.PI * 2);
    ctx.fill();

    return Texture.from(canvas);
  }

  public generatePetalTexture(mainColor: string): Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 48;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createLinearGradient(16, 0, 16, 48);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.5, mainColor);
    grad.addColorStop(1, mainColor.replace('#', '#88'));

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(16, 24, 10, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    return Texture.from(canvas);
  }

  public getAltarTableTexture(
    tableclothStyle: TableclothStyle = 'autumn_gold',
    showTableRunner: boolean = true,
    showPetals: boolean = true
  ): Promise<Texture> {
    const key = `altar_table_${tableclothStyle}_${showTableRunner ? '1' : '0'}_${showPetals ? '1' : '0'}`;
    const cached = getCachedTexture(key);
    if (cached) return Promise.resolve(cached);

    try {
      const element = React.createElement(AltarTableSvg, {
        tableclothStyle,
        showTableRunner,
        showPetals,
      });
      const svg = renderToStaticMarkup(element);
      return rasterizeSvgToTexture(key, svg, 1120, 320, 2.0);
    } catch (e) {
      console.warn('Failed to rasterize altar table:', e);
      throw e;
    }
  }

  public getWallTexture(
    wallStyle: WallBackgroundStyle = 'classic_dawn',
    timeOfDay: TimeOfDay = 'day',
    masterOn: boolean = true
  ): Promise<Texture> {
    const key = `wall_${wallStyle}_${timeOfDay}_${masterOn ? '1' : '0'}`;
    const cached = getCachedTexture(key);
    if (cached) return Promise.resolve(cached);

    try {
      const wallModule = getWallModule(wallStyle);
      const ambiance = wallModule.getAmbiance(timeOfDay, masterOn);
      const defsSlot = renderWallDefs(wallStyle, timeOfDay, masterOn);
      const StyleComp = wallModule.Component;

      const element = React.createElement(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 420 720',
          width: '420',
          height: '720',
        },
        React.createElement(
          'defs',
          null,
          React.createElement(
            'linearGradient',
            { id: 'goldFilletGrad', x1: '0%', y1: '0%', x2: '100%', y2: '100%' },
            React.createElement('stop', { offset: '0%', stopColor: '#e8cd8a' }),
            React.createElement('stop', { offset: '35%', stopColor: '#caa262' }),
            React.createElement('stop', { offset: '70%', stopColor: '#9a7638' }),
            React.createElement('stop', { offset: '100%', stopColor: '#6e4f1f' })
          ),
          defsSlot
        ),
        React.createElement(StyleComp, {
          masterOn,
          sunlightIntensity: 1.0,
          timeOfDay,
          sunAngle: 0,
          ambiance,
        })
      );

      const svg = renderToStaticMarkup(element);
      return rasterizeSvgToTexture(key, svg, 840, 1440, 2.0);
    } catch (e) {
      console.warn('Failed to rasterize altar wall:', e);
      throw e;
    }
  }
}

