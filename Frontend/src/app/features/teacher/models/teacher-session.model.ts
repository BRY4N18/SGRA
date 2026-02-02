export type TeacherSessionStatus = 'PROGRAMADA' | 'EN_CURSO' | 'REALIZADA';
export type TeacherSessionType = 'INDIVIDUAL' | 'GRUPAL';

export interface TeacherSession {
  id: number;
  dateLabel: string;
  subject: string;
  topic: string;
  student: string;
  modality: 'Presencial' | 'Virtual';
  type: TeacherSessionType;
  status: TeacherSessionStatus;
  attendanceOpen?: boolean;
  observations?: string;
  results?: string;
  finalStatus?: string;
}
