import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface AdminMetric {
  label: string;
  value: number;
  icon: string;
  accent: string;
}

interface AdminAudit {
  title: string;
  meta: string;
  status: string;
}

@Component({
  selector: 'app-admin-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './adminDashboard.component.html',
  styleUrl: './adminDashboard.component.scss',
})
export class AdminDashboardPageComponent {
  username = localStorage.getItem('sgra_username') || 'Administrador';

  metrics: AdminMetric[] = [
    { label: 'Usuarios activos', value: 128, icon: 'bi-people', accent: 'metric-icon--blue' },
    { label: 'Roles vigentes', value: 6, icon: 'bi-shield-check', accent: 'metric-icon--purple' },
    { label: 'Modulos con permiso', value: 14, icon: 'bi-grid-3x3-gap', accent: 'metric-icon--green' },
    { label: 'Cuentas inactivas', value: 9, icon: 'bi-person-x', accent: 'metric-icon--orange' },
  ];

  auditTrail: AdminAudit[] = [
    {
      title: 'Cambio de rol: Docente -> Coordinador',
      meta: 'Usuario: Daniela P. | Hace 2 horas',
      status: 'Aprobado',
    },
    {
      title: 'Reset de clave solicitado',
      meta: 'Usuario: Mario C. | Hace 1 dia',
      status: 'Completado',
    },
    {
      title: 'Permisos del modulo Refuerzos ajustados',
      meta: 'Rol: Coordinador | Hace 2 dias',
      status: 'En revision',
    },
  ];
}

