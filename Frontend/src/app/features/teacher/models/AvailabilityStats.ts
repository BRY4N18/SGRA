export interface AvailabilityStats {
  disponibles: number;
  programadas: number;
  horasSemanales: number;
  diasActivos: number;
  distribucion: { day: string; hours: number }[];
}
