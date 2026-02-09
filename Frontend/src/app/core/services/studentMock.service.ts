import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StudentGroupmate } from '../../features/student/models/studentGroupmate.model';
import { StudentRequest, StudentRequestStatus, StudentRequestType } from '../../features/student/models/studentRequest.model';
import { StudentSubject } from '../../features/student/models/studentSubject.model';
import { StudentTeacher } from '../../features/student/models/studentTeacher.model';
import { StudentTimeSlot } from '../../features/student/models/studentTimeSlot.model';

export interface StudentMetrics {
  pendientes: number;
  aceptadas: number;
  proximas: number;
  realizadas: number;
}

@Injectable({ providedIn: 'root' })
export class StudentMockService {
  private readonly subjects: StudentSubject[] = [
    { code: 'MAT-101', name: 'Cálculo Diferencial' },
    { code: 'FIS-210', name: 'Física II' },
    { code: 'PRO-305', name: 'Programación Avanzada' },
    { code: 'EST-110', name: 'Estadística' },
  ];

  private readonly teachers: StudentTeacher[] = [
    { id: 1, name: 'Dra. Daniela Salazar', department: 'Matemáticas' },
    { id: 2, name: 'Ing. Carlos Viteri', department: 'Sistemas' },
    { id: 3, name: 'MSc. Fernanda Núñez', department: 'Física' },
    { id: 4, name: 'MSc. Julio Rivera', department: 'Estadística' },
  ];

  private readonly requests: StudentRequest[] = [
    {
      id: 1,
      createdAt: '2025-01-16 09:30',
      subject: this.subjects[0],
      topic: 'Reglas de derivación',
      teacher: this.teachers[0],
      type: 'INDIVIDUAL',
      status: 'PENDIENTE',
    },
    {
      id: 2,
      createdAt: '2025-01-14 14:10',
      subject: this.subjects[2],
      topic: 'Patrones de diseño',
      teacher: this.teachers[1],
      type: 'GRUPAL',
      status: 'ACEPTADA',
    },
    {
      id: 3,
      createdAt: '2025-01-12 08:45',
      subject: this.subjects[1],
      topic: 'Movimiento armónico simple',
      teacher: this.teachers[2],
      type: 'INDIVIDUAL',
      status: 'ESPERANDO ESPACIO',
    },
    {
      id: 4,
      createdAt: '2025-01-10 17:20',
      subject: this.subjects[3],
      topic: 'Distribución normal',
      teacher: this.teachers[3],
      type: 'GRUPAL',
      status: 'PROGRAMADA',
    },
    {
      id: 5,
      createdAt: '2025-01-08 11:05',
      subject: this.subjects[2],
      topic: 'APIs REST',
      teacher: this.teachers[1],
      type: 'INDIVIDUAL',
      status: 'REALIZADA',
    },
  ];

  private readonly timeSlots: StudentTimeSlot[] = [
    { id: 1, label: 'Lunes 08:00 - 09:30', day: 'Lunes', range: '08:00 - 09:30' },
    { id: 2, label: 'Martes 10:00 - 11:30', day: 'Martes', range: '10:00 - 11:30' },
    { id: 3, label: 'Miércoles 14:00 - 15:30', day: 'Miércoles', range: '14:00 - 15:30' },
    { id: 4, label: 'Jueves 16:00 - 17:30', day: 'Jueves', range: '16:00 - 17:30' },
  ];

  private readonly groupmates: StudentGroupmate[] = [
    { id: 1, name: 'Luis Zambrano', career: 'Sistemas' },
    { id: 2, name: 'María Cedeño', career: 'Electrónica' },
    { id: 3, name: 'José Paredes', career: 'Agroindustria' },
    { id: 4, name: 'Paola Vaca', career: 'Sistemas' },
  ];

  getMetrics(): Observable<StudentMetrics> {
    return of({
      pendientes: 2,
      aceptadas: 3,
      proximas: 1,
      realizadas: 6,
    });
  }

  getSubjects(): Observable<StudentSubject[]> {
    return of(this.subjects);
  }

  getTeachers(): Observable<StudentTeacher[]> {
    return of(this.teachers);
  }

  getRequests(): Observable<StudentRequest[]> {
    return of(this.requests);
  }

  getTimeSlots(): Observable<StudentTimeSlot[]> {
    return of(this.timeSlots);
  }

  getGroupmates(): Observable<StudentGroupmate[]> {
    return of(this.groupmates);
  }

  getStatusOptions(): Observable<StudentRequestStatus[]> {
    return of(['PENDIENTE', 'ACEPTADA', 'PROGRAMADA', 'REALIZADA', 'ESPERANDO ESPACIO']);
  }

  getTypeOptions(): Observable<StudentRequestType[]> {
    return of(['INDIVIDUAL', 'GRUPAL']);
  }
}

