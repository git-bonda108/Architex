export interface Room {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
}

export interface Template {
  id: string;
  name: string;
  bhkType: string;
  description: string | null;
  roomsData: Room[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Design {
  id: string;
  name: string;
  bhkType: string;
  templateId: string | null;
  roomsData: Room[];
  specifications: DesignSpecifications;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface DesignSpecifications {
  overallWidth: number;
  overallHeight: number;
  wallThickness: number;
  ceilingHeight: number;
  unit: 'meters' | 'feet';
  drainageSpecs?: any;
  sewageSpecs?: any;
  materialSpecs?: any;
}

export interface Configuration {
  id: string;
  designId: string;
  overallWidth: number;
  overallHeight: number;
  wallThickness: number;
  ceilingHeight: number;
  unit: string;
  drainageSpecs?: any;
  sewageSpecs?: any;
  materialSpecs?: any;
  createdAt: Date;
  updatedAt: Date;
}

export type BHKType = '2BHK' | '3BHK';
