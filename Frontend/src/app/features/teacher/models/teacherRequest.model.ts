export type TeacherRequestStatus = 'PENDIENTE' | 'ACEPTADA' | 'PROGRAMADA' | 'RECHAZADA';
export type TeacherRequestType = 'INDIVIDUAL' | 'GRUPAL';
export type TeacherRequestMode = 'PRESENCIAL' | 'VIRTUAL';

export interface TeacherRequest {
  id: number;
  studentName: string;
  studentEmail: string;
  subject: string;
  topic: string;
  reason: string;
  mode: TeacherRequestMode;
  type: TeacherRequestType;
  status: TeacherRequestStatus;
  dateLabel: string;
}
