export type TimeOfDay = 'day' | 'sunset' | 'night';

export interface Position2D {
  x: number; // offset in px from table center
  y: number; // vertical depth offset on table
}

export type FlowerType = 'peonies' | 'lilies' | 'lotus' | 'chrysanthemum' | 'roses';

export type SceneItemId = string;

export interface SceneItem {
  id: SceneItemId;
  name: string;
  position: Position2D;
  isLit?: boolean;
  flowerType?: FlowerType;
}

export interface LightingSettings {
  masterOn: boolean;
  timeOfDay: TimeOfDay;
  sunlightIntensity: number; // 0 to 1
  godRaysEnabled: boolean;
  godRaysIntensity: number; // 0 to 1
  sunAngle: number; // -25 to 25 deg
  candleGlowIntensity: number; // 0 to 1
  dustDensity: number; // 20 to 150
  windForce: number; // -1 to 1
}

export interface MemorialInfo {
  title: string;
  subtitle: string;
  photoUrl: string;
}
