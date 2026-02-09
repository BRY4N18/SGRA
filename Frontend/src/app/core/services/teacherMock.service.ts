import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AvailabilitySlot, AvailabilityStatus } from '../../features/teacher/models/teacherAvailability.model';
import { TeacherDashboardMetrics, TeacherHourIndicator, TeacherPeriodIndicator } from '../../features/teacher/models/teacherDashboard.model';
import { TeacherRequest } from '../../features/teacher/models/teacherRequest.model';
import { TeacherSession } from '../../features/teacher/models/teacherSession.model';

@Injectable({ providedIn: 'root' })
export class TeacherMockService {
  private readonly requests: TeacherRequest[] = [
    {
      id: 1,
      studentName: 'Juan Carlos Pérez García',
      studentEmail: 'jcperez@uteq.edu.ec',
      subject: 'Programación Avanzada',
      topic: 'Patrones de Diseño',
      reason: 'Dificultad en comprender el patrón Singleton.',
      mode: 'PRESENCIAL',
      type: 'INDIVIDUAL',
      status: 'PENDIENTE',
      dateLabel: '08/01/2026 00:00',
    },
    {
      id: 2,
      studentName: 'María Elena Torres',
      studentEmail: 'maria.torres@uteq.edu.ec',
      subject: 'Cálculo Diferencial',
      topic: 'Regla de la cadena',
      reason: 'Reforzar el tema para el examen parcial.',
      mode: 'VIRTUAL',
      type: 'INDIVIDUAL',
      status: 'ACEPTADA',
      dateLabel: '10/01/2026 10:30',
    },
    {
      id: 3,
      studentName: 'Luis Vega',
      studentEmail: 'luis.vega@uteq.edu.ec',
      subject: 'Física II',
      topic: 'Movimiento armónico',
      reason: 'Revisión de problemas aplicados a laboratorio.',
      mode: 'PRESENCIAL',
      type: 'GRUPAL',
      status: 'PROGRAMADA',
      dateLabel: '12/01/2026 09:00',
    },
    {
      id: 4,
      studentName: 'Sofía Guerrero',
      studentEmail: 'sofia.guerrero@uteq.edu.ec',
      subject: 'Estadística',
      topic: 'Distribución normal',
      reason: 'Necesita retroalimentación para su proyecto.',
      mode: 'VIRTUAL',
      type: 'INDIVIDUAL',
      status: 'RECHAZADA',
      dateLabel: '05/01/2026 15:00',
    },
  ];

  private readonly sessions: TeacherSession[] = [
    {
      id: 101,
      subject: 'Programación Avanzada',
      topic: 'Patrones de Diseño',
      student: 'Juan Carlos Pérez',
      modality: 'Presencial',
      type: 'INDIVIDUAL',
      status: 'PROGRAMADA',
      dateLabel: '08/01/2026 10:00',
      attendanceOpen: false,
    },
    {
      id: 102,
      subject: 'Cálculo Diferencial',
      topic: 'Regla de la cadena',
      student: 'María Elena Torres',
      modality: 'Virtual',
      type: 'INDIVIDUAL',
      status: 'EN_CURSO',
      dateLabel: '09/01/2026 14:30',
      attendanceOpen: true,
    },
    {
      id: 103,
      subject: 'Física II',
      topic: 'Movimiento armónico',
      student: 'Luis Vega',
      modality: 'Presencial',
      type: 'GRUPAL',
      status: 'REALIZADA',
      dateLabel: '04/01/2026 08:00',
      attendanceOpen: false,
      observations: 'Se revisaron ejercicios de laboratorio.',
      results: 'Estudiantes resolvieron correctamente el 80% de la guía.',
      finalStatus: 'Culminada',
    },
  ];

  private readonly availability: AvailabilitySlot[] = this.createAvailability();

  getRequests(): Observable<TeacherRequest[]> {
    return of(this.requests);
  }

  getSolicitudes(): Observable<TeacherRequest[]> {
    return this.getRequests();
  }

  getSessions(): Observable<TeacherSession[]> {
    return of(this.sessions);
  }

  getSesiones(): Observable<TeacherSession[]> {
    return this.getSessions();
  }

  aceptarSolicitud(id: number): Observable<boolean> {
    const request = this.requests.find(item => item.id === id);
    if (request) {
      request.status = 'ACEPTADA';
    }
    return of(true);
  }

  rechazarSolicitud(id: number): Observable<boolean> {
    const request = this.requests.find(item => item.id === id);
    if (request) {
      request.status = 'RECHAZADA';
    }
    return of(true);
  }

  abrirAsistencia(idSesion: number): Observable<boolean> {
    const session = this.sessions.find(item => item.id === idSesion);
    if (session) {
      session.attendanceOpen = true;
    }
    return of(true);
  }

  cerrarAsistencia(idSesion: number): Observable<boolean> {
    const session = this.sessions.find(item => item.id === idSesion);
    if (session) {
      session.attendanceOpen = false;
    }
    return of(true);
  }

  finalizarSesion(payload: {
    idSesion: number;
    observaciones: string;
    resultados: string;
    estadoFinal: string;
  }): Observable<boolean> {
    const session = this.sessions.find(item => item.id === payload.idSesion);
    if (session) {
      session.status = 'REALIZADA';
      session.observations = payload.observaciones;
      session.results = payload.resultados;
      session.finalStatus = payload.estadoFinal;
      session.attendanceOpen = false;
    }
    return of(true);
  }

  getAvailability(): Observable<AvailabilitySlot[]> {
    return of(this.availability);
  }

  getDashboardMetrics(): Observable<TeacherDashboardMetrics> {
    return of({
      pendientes: 1,
      programadas: 0,
      completadas: 0,
      atendidos: 0,
    });
  }

  getPeriodIndicators(): Observable<TeacherPeriodIndicator[]> {
    return of([
      { label: 'Tasa de Aceptación', value: 85, accent: '#2f8b4f' },
      { label: 'Asistencia Promedio', value: 92, accent: '#d9466f' },
      { label: 'Sesiones Completadas', value: 78, accent: '#2f59c5' },
    ]);
  }

  getHoursIndicator(): Observable<TeacherHourIndicator> {
    return of({
      label: 'Horas de Refuerzo',
      value: '24 hrs',
      helper: 'Este período académico',
    });
  }

  getAvailabilityStats() {
    return of({
      disponibles: 8,
      programadas: 2,
      horasSemanales: 8,
      diasActivos: 5,
      distribucion: [
        { day: 'Lun', hours: 2 },
        { day: 'Mar', hours: 2 },
        { day: 'Mié', hours: 1 },
        { day: 'Jue', hours: 2 },
        { day: 'Vie', hours: 1 },
        { day: 'Sáb', hours: 0 },
      ],
    });
  }

  private createAvailability(): AvailabilitySlot[] {
    const days = ['Sáb', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie'];
    const hours = [
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
    ];

    const availabilityMap: Record<string, Record<string, AvailabilityStatus>> = {
      Lun: {
        '07:00': 'DISPONIBLE',
        '08:00': 'DISPONIBLE',
        '09:00': 'SESION',
      },
      Mar: {
        '09:00': 'DISPONIBLE',
        '10:00': 'DISPONIBLE',
      },
      Mié: {
        '08:00': 'SESION',
        '11:00': 'DISPONIBLE',
      },
      Jue: {
        '08:00': 'DISPONIBLE',
        '09:00': 'DISPONIBLE',
      },
      Vie: {
        '07:00': 'DISPONIBLE',
      },
      Sáb: {},
    };

    const slots: AvailabilitySlot[] = [];

    days.forEach(day => {
      hours.forEach(time => {
        const status = availabilityMap[day]?.[time] ?? 'NO_DISPONIBLE';
        slots.push({ day, time, status });
      });
    });

    return slots;
  }
}

