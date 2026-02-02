import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ReportCard {
  title: string;
  description: string;
  icon: string;
  accent: string;
  filters: string[];
  options?: string[];
  checkboxLabel?: string;
}

interface RecentReport {
  type: string;
  date: string;
  format: string;
}

@Component({
  selector: 'app-reportes-coordinacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss',
})
export class ReportesCoordinacionComponent {
  reportCards: ReportCard[] = [
    {
      title: 'Reporte General',
      description: 'Resumen completo del período con estadísticas generales.',
      icon: 'bi-file-earmark-text',
      accent: 'indigo',
      filters: ['Periodo'],
      options: ['Último mes', 'Último trimestre', 'Semestre actual'],
    },
    {
      title: 'Reporte por Docente',
      description: 'Desempeño individual de docentes y sesiones realizadas.',
      icon: 'bi-mortarboard',
      accent: 'teal',
      filters: ['Docente', 'Periodo'],
      options: ['Todos los docentes', 'Último mes', 'Semestre actual'],
    },
    {
      title: 'Reporte por Asignatura',
      description: 'Demanda de refuerzo por materia y nivel.',
      icon: 'bi-book',
      accent: 'orange',
      filters: ['Asignatura'],
      options: ['Todas las asignaturas', 'Cálculo', 'Programación'],
      checkboxLabel: 'Incluir desglose por temas',
    },
    {
      title: 'Reporte de Asistencia',
      description: 'Control de asistencia a sesiones de refuerzo.',
      icon: 'bi-clipboard-check',
      accent: 'green',
      filters: ['Tipo de sesión'],
      options: ['Todas', 'Presencial', 'Virtual'],
      checkboxLabel: 'Solo mostrar ausencias',
    },
    {
      title: 'Reporte de Espacios',
      description: 'Uso de infraestructura y ocupación de espacios.',
      icon: 'bi-building',
      accent: 'purple',
      filters: ['Edificio'],
      options: ['Todos los edificios', 'Edificio A', 'Edificio B'],
    },
    {
      title: 'Reporte Personalizado',
      description: 'Configura métricas y filtros para un reporte a medida.',
      icon: 'bi-sliders',
      accent: 'slate',
      filters: [],
    },
  ];

  recentReports: RecentReport[] = [
    { type: 'General', date: '20/01/2026 19:40', format: 'PDF' },
    { type: 'Por Docente', date: '19/01/2026 19:40', format: 'EXCEL' },
    { type: 'Asistencia', date: '18/01/2026 19:40', format: 'PDF' },
  ];

  aiRecommendations = [
    'Reporte de cumplimiento por docente con sesiones completadas.',
    'Informe de ocupación de espacios con demanda pico.',
    'Reporte de asignaturas con mayor tasa de solicitudes.',
    'Resumen de asistencia para semanas críticas.',
  ];
}
