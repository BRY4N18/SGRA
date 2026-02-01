export type TeacherSessionStatus = 'PROGRAMADA' | 'COMPLETADA';

export interface TeacherSession {
  id: number;
  dateLabel: string;
  subject: string;
  student: string;
  modality: string;
  status: TeacherSessionStatus;
  link?: string;
}
