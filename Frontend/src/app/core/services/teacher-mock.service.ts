import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AvailabilitySlot, AvailabilityStatus } from '../../features/teacher/models/teacher-availability.model';
import { TeacherRequest } from '../../features/teacher/models/teacher-request.model';
import { TeacherSession } from '../../features/teacher/models/teacher-session.model';

@Injectable({ providedIn: 'root' })
export class TeacherMockService {
  private readonly requests: TeacherRequest[] = [
    {
      id: 1,
      studentName: 'Ana Paredes',
      studentEmail: 'ana.paredes@uteq.edu.ec',
      subject: 'Cálculo Diferencial',
      topic: 'Regla de la cadena',
      reason: 'Necesito reforzar el tema para el examen parcial.',
      mode: 'PRESENCIAL',
      type: 'INDIVIDUAL',
      status: 'PENDIENTE',
      dateLabel: 'Mar 12 • 09:30',
    },
    {
      id: 2,
      studentName: 'Luis Vega',
      studentEmail: 'luis.vega@uteq.edu.ec',
      subject: 'Programación Avanzada',
      topic: 'Patrones de diseño',
      reason: 'Reforzar el uso de patrones en proyecto final.',
      mode: 'VIRTUAL',
      type: 'GRUPAL',
      status: 'ACEPTADA',
      dateLabel: 'Mar 10 • 15:00',
    },
    {
      id: 3,
      studentName: 'María Cedeño',
      studentEmail: 'maria.cedeno@uteq.edu.ec',
      subject: 'Física II',
      topic: 'Movimiento armónico',
      reason: 'Presenta dudas con ejercicios de laboratorio.',
      mode: 'PRESENCIAL',
      type: 'INDIVIDUAL',
      status: 'PROGRAMADA',
      dateLabel: 'Mar 14 • 11:00',
    },
    {
      id: 4,
      studentName: 'Carlos Alcívar',
      studentEmail: 'carlos.alcivar@uteq.edu.ec',
      subject: 'Estadística',
      topic: 'Distribución normal',
      reason: 'Repasar conceptos de probabilidad.',
      mode: 'VIRTUAL',
      type: 'GRUPAL',
      status: 'RECHAZADA',
      dateLabel: 'Mar 08 • 10:15',
    },
  ];

  private readonly sessions: TeacherSession[] = [
    {
      id: 1,
      dateLabel: 'Mar 13 • 08:30',
      subject: 'Cálculo Diferencial',
      student: 'Ana Paredes',
      modality: 'Presencial',
      status: 'PROGRAMADA',
    },
    {
      id: 2,
      dateLabel: 'Mar 15 • 14:00',
      subject: 'Programación Avanzada',
      student: 'Luis Vega (Grupo)',
      modality: 'Virtual',
      status: 'PROGRAMADA',
      link: 'https://meet.example.com/uteq/refuerzo',
    },
    {
      id: 3,
      dateLabel: 'Mar 05 • 09:00',
      subject: 'Física II',
      student: 'María Cedeño',
      modality: 'Presencial',
      status: 'COMPLETADA',
    },
  ];

  private readonly availability: AvailabilitySlot[] = this.createAvailability();

  getRequests(): Observable<TeacherRequest[]> {
    return of(this.requests);
  }

  getSessions(): Observable<TeacherSession[]> {
    return of(this.sessions);
  }

  getAvailability(): Observable<AvailabilitySlot[]> {
    return of(this.availability);
  }

  getSummary() {
    return of({
      pendientes: 4,
      programadas: 3,
      completadas: 12,
      atendidos: 42,
    });
  }

  getAvailabilityStats() {
    return of({
      disponibles: 18,
      programadas: 4,
      horasSemanales: 22,
      diasActivos: 5,
      distribucion: [
        { day: 'Lun', hours: 4 },
        { day: 'Mar', hours: 5 },
        { day: 'Mié', hours: 3 },
        { day: 'Jue', hours: 6 },
        { day: 'Vie', hours: 4 },
        { day: 'Sáb', hours: 2 },
      ],
    });
  }

  private createAvailability(): AvailabilitySlot[] {
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const hours = ['07:00', '09:00', '11:00', '13:00', '15:00', '17:00'];
    const slots: AvailabilitySlot[] = [];

    days.forEach((day, dayIndex) => {
      hours.forEach((time, timeIndex) => {
        let status: AvailabilityStatus = 'NO_DISPONIBLE';
        if (dayIndex % 2 === 0 && timeIndex % 2 === 0) {
          status = 'DISPONIBLE';
        }
        if (dayIndex === 3 && timeIndex === 2) {
          status = 'SESION';
        }
        slots.push({ day, time, status });
      });
    });

    return slots;
  }
}
