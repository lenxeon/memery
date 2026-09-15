/**
 * @file scene.ts
 * @description 场景与摆件实体几何坐标、物品元数据接口定义。
 */
export type TimeOfDay = 'day' | 'sunset' | 'night';

export interface Position2D {
  x: number; // percentage or offset in pixels relative to table center
  y: number; // vertical offset
  z?: number; // depth layer on table (for shadow and scale perspective)
}

export type SceneItemId = 
  | 'vase_left' 
  | 'vase_right' 
  | 'candle_left' 
  | 'candle_right' 
  | 'censer' 
  | 'portrait'
  | 'table';

export interface SceneItem {
  id: SceneItemId;
  name: string;
  type: 'flower' | 'candle' | 'censer' | 'portrait' | 'table';
  position: Position2D;
  isLit?: boolean;
  scale?: number;
  rotation?: number;
}

export interface LightingSettings {
  masterOn: boolean;
  timeOfDay: TimeOfDay;
  sunlightIntensity: number; // 0 to 1
  godRaysEnabled: boolean;
  godRaysIntensity: number; // 0 to 1
  sunAngle: number; // -30 to 30 degrees
  ambientBrightness: number; // 0.2 to 1.5
  candleGlowIntensity: number; // 0 to 1
  dustDensity: number; // 20 to 200
  windForce: number; // -1 to 1 (affects smoke & flame sway)
}

export interface MemorialInfo {
  title: string;
  subtitle: string;
  photoUrl: string;
  dedicationText?: string;
  personName?: string;
}

export interface TributeMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  type: 'flower' | 'incense' | 'candle' | 'prayer';
}
