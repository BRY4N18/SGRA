import { StudentSubject } from './studentSubject.model';
import { StudentTeacher } from './studentTeacher.model';

export type StudentRequestStatus =
  | 'PENDIENTE'
  | 'ACEPTADA'
  | 'REALIZADA'
  | 'ESPERANDO ESPACIO'
  | 'PROGRAMADA';

export type StudentRequestType = 'INDIVIDUAL' | 'GRUPAL';

export interface StudentRequest {
  id: number;
  createdAt: string;
  subject: StudentSubject;
  topic: string;
  teacher: StudentTeacher;
  type: StudentRequestType;
  status: StudentRequestStatus;
}

