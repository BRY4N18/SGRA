export interface TeacherDashboardMetrics {
  pendientes: number;
  programadas: number;
  completadas: number;
  atendidos: number;
}

export interface TeacherPeriodIndicator {
  label: string;
  value: number;
  accent: string;
}

export interface TeacherHourIndicator {
  label: string;
  value: string;
  helper: string;
}
