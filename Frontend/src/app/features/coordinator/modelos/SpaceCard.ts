import { SpaceResource } from './SpaceResource';

export interface SpaceCard {
  id: number;
  type: string;
  name: string;
  building: string;
  capacity: number;
  resources: SpaceResource[];
  occupancy: number;
  status: 'Disponible' | 'En uso';
}
