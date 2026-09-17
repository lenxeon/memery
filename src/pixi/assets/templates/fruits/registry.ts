/**
 * @file registry.ts
 * @description 供果纯 TS 模块注册表，统一管理 18 品类传统与时令吉祥供果。
 */
import { FruitType } from '../../../../types';
import { FruitItemModule } from './types';

import * as Apples from './items/ApplesFruit';
import * as Oranges from './items/OrangesFruit';
import * as Peaches from './items/PeachesFruit';
import * as Persimmons from './items/PersimmonsFruit';
import * as Citrons from './items/CitronsFruit';
import * as Grapes from './items/GrapesFruit';
import * as Pomelos from './items/PomelosFruit';
import * as Longans from './items/LongansFruit';
import * as Bananas from './items/BananasFruit';
import * as Kumquats from './items/KumquatsFruit';
import * as Dragonfruits from './items/DragonfruitsFruit';
import * as Cucumbers from './items/CucumbersFruit';
import * as Watermelons from './items/WatermelonsFruit';
import * as Coconuts from './items/CoconutsFruit';
import * as Plums from './items/PlumsFruit';
import * as Mangosteens from './items/MangosteensFruit';
import * as Pineapples from './items/PineapplesFruit';
import * as Pears from './items/PearsFruit';

export const FRUIT_REGISTRY: Record<FruitType, FruitItemModule> = {
  apples: { id: 'apples', title: Apples.metadata.title, nextName: Apples.metadata.nextName, renderDefs: Apples.renderDefs, renderContent: Apples.renderContent },
  oranges: { id: 'oranges', title: Oranges.metadata.title, nextName: Oranges.metadata.nextName, renderDefs: Oranges.renderDefs, renderContent: Oranges.renderContent },
  peaches: { id: 'peaches', title: Peaches.metadata.title, nextName: Peaches.metadata.nextName, renderDefs: Peaches.renderDefs, renderContent: Peaches.renderContent },
  persimmons: { id: 'persimmons', title: Persimmons.metadata.title, nextName: Persimmons.metadata.nextName, renderDefs: Persimmons.renderDefs, renderContent: Persimmons.renderContent },
  citrons: { id: 'citrons', title: Citrons.metadata.title, nextName: Citrons.metadata.nextName, renderDefs: Citrons.renderDefs, renderContent: Citrons.renderContent },
  grapes: { id: 'grapes', title: Grapes.metadata.title, nextName: Grapes.metadata.nextName, renderDefs: Grapes.renderDefs, renderContent: Grapes.renderContent },
  pomelos: { id: 'pomelos', title: Pomelos.metadata.title, nextName: Pomelos.metadata.nextName, renderDefs: Pomelos.renderDefs, renderContent: Pomelos.renderContent },
  longans: { id: 'longans', title: Longans.metadata.title, nextName: Longans.metadata.nextName, renderDefs: Longans.renderDefs, renderContent: Longans.renderContent },
  bananas: { id: 'bananas', title: Bananas.metadata.title, nextName: Bananas.metadata.nextName, renderDefs: Bananas.renderDefs, renderContent: Bananas.renderContent },
  kumquats: { id: 'kumquats', title: Kumquats.metadata.title, nextName: Kumquats.metadata.nextName, renderDefs: Kumquats.renderDefs, renderContent: Kumquats.renderContent },
  dragonfruits: { id: 'dragonfruits', title: Dragonfruits.metadata.title, nextName: Dragonfruits.metadata.nextName, renderDefs: Dragonfruits.renderDefs, renderContent: Dragonfruits.renderContent },
  cucumbers: { id: 'cucumbers', title: Cucumbers.metadata.title, nextName: Cucumbers.metadata.nextName, renderDefs: Cucumbers.renderDefs, renderContent: Cucumbers.renderContent },
  watermelons: { id: 'watermelons', title: Watermelons.metadata.title, nextName: Watermelons.metadata.nextName, renderDefs: Watermelons.renderDefs, renderContent: Watermelons.renderContent },
  coconuts: { id: 'coconuts', title: Coconuts.metadata.title, nextName: Coconuts.metadata.nextName, renderDefs: Coconuts.renderDefs, renderContent: Coconuts.renderContent },
  plums: { id: 'plums', title: Plums.metadata.title, nextName: Plums.metadata.nextName, renderDefs: Plums.renderDefs, renderContent: Plums.renderContent },
  mangosteens: { id: 'mangosteens', title: Mangosteens.metadata.title, nextName: Mangosteens.metadata.nextName, renderDefs: Mangosteens.renderDefs, renderContent: Mangosteens.renderContent },
  pineapples: { id: 'pineapples', title: Pineapples.metadata.title, nextName: Pineapples.metadata.nextName, renderDefs: Pineapples.renderDefs, renderContent: Pineapples.renderContent },
  pears: { id: 'pears', title: Pears.metadata.title, nextName: Pears.metadata.nextName, renderDefs: Pears.renderDefs, renderContent: Pears.renderContent },
};
