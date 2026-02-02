import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-coordinator-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './coordinatorDashboard.html',
  styleUrl: './coordinatorDashboard.scss',
})
export class CoordinatorDashboardComponent {
  kpiCards = [
    { label: 'Total Solicitudes', value: 4, accent: 'indigo', helper: '+15% este mes', icon: 'bi-file-earmark-text' },
    { label: 'Sesiones Activas', value: 0, accent: 'purple', helper: 'En este momento', icon: 'bi-calendar-check' },
    { label: 'Docentes Activos', value: 2, accent: 'teal', helper: 'Con sesiones', icon: 'bi-mortarboard' },
    { label: 'Estudiantes Atendidos', value: 1, accent: 'orange', helper: 'Últimos 7 días', icon: 'bi-people' },
    { label: 'Espacios Disponibles', value: 5, accent: 'green', helper: 'Hoy', icon: 'bi-building' },
    { label: 'Tasa de Cumplimiento', value: '0%', accent: 'pink', helper: 'Sesiones completadas', icon: 'bi-check-circle' },
  ];

  statusSummary = [
    { label: 'Pendientes', value: 1, color: '#f59e0b', percent: 25 },
    { label: 'Aceptadas', value: 1, color: '#3b82f6', percent: 25 },
    { label: 'Programadas', value: 0, color: '#8b5cf6', percent: 0 },
    { label: 'Completadas', value: 0, color: '#10b981', percent: 0 },
    { label: 'Rechazadas', value: 0, color: '#ef4444', percent: 0 },
  ];

  topTeachers = [
    { rank: 1, name: 'Dr. Juan Pérez', area: 'Cálculo', sessions: 15, hours: 22 },
    { rank: 2, name: 'Ing. María García', area: 'Programación', sessions: 12, hours: 18 },
    { rank: 3, name: 'Msc. Carlos López', area: 'Física', sessions: 10, hours: 15 },
    { rank: 4, name: 'Dra. Ana Martínez', area: 'Química', sessions: 8, hours: 12 },
    { rank: 5, name: 'Ing. Pedro Sánchez', area: 'Redes', sessions: 7, hours: 10 },
  ];

  spaceOccupancy = [
    { name: 'Aula 101', building: 'Edificio A', percent: 17 },
    { name: 'Laboratorio 201', building: 'Edificio B', percent: 17 },
    { name: 'Aula 102', building: 'Edificio A', percent: 71 },
    { name: 'Sala de Reuniones 301', building: 'Edificio C', percent: 88 },
    { name: 'Sala de Estudio Biblioteca', building: 'Biblioteca', percent: 88 },
  ];

  popularSubjects = [
    { name: 'Cálculo Diferencial', code: 'MAT101', value: 25 },
    { name: 'Programación I', code: 'INF101', value: 20 },
    { name: 'Física I', code: 'FIS101', value: 18 },
    { name: 'Química General', code: 'QUI101', value: 15 },
    { name: 'Inglés Técnico', code: 'ING201', value: 12 },
  ];

  quickActions = [
    { label: 'Gestionar Espacios', helper: 'Administra aulas y laboratorios', icon: 'bi-door-open', link: '/dashboard/coordinador/espacios' },
    { label: 'Ver Reservas', helper: 'Consulta reservas de espacios', icon: 'bi-calendar2-week', link: '/dashboard/coordinador' },
    { label: 'Cargar Datos', helper: 'Importar estudiantes y docentes', icon: 'bi-cloud-arrow-up', link: '/dashboard/coordinador/importar' },
    { label: 'Reportes', helper: 'Genera informes detallados', icon: 'bi-bar-chart', link: '/dashboard/coordinador/reportes' },
  ];
}
