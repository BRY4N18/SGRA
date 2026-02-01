export type AvailabilityStatus = 'DISPONIBLE' | 'NO_DISPONIBLE' | 'SESION';

export interface AvailabilitySlot {
  day: string;
  time: string;
  status: AvailabilityStatus;
}
