import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../services/adminservice';
import { AdministrationDashboard } from '../../modelos/AdministrationDashboard';
import { AdminMetric } from '../../modelos/AdminMetric';
import { AdminAudit } from '../../modelos/AdminAudit';

@Component({
  selector: 'app-admin-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './adminDashboard.component.html',
  styleUrl: './adminDashboard.component.scss',
})
export class AdminDashboardPageComponent implements OnInit {
  username = localStorage.getItem('sgra_username') || 'Administrador';

  private adminService = inject(AdminService);

  metrics: AdminMetric[] = [
    { label: 'Usuarios activos', value: 0, icon: 'bi-people', accent: 'metric-icon--blue' },
    { label: 'Roles vigentes', value: 0, icon: 'bi-shield-check', accent: 'metric-icon--purple' },
    { label: 'Modulos con permiso', value: 0, icon: 'bi-grid-3x3-gap', accent: 'metric-icon--green' },
    { label: 'Cuentas inactivas', value: 0, icon: 'bi-person-x', accent: 'metric-icon--orange' },
  ];

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    this.adminService.getDashboardStats().subscribe({
      next: (data: AdministrationDashboard) => {
        this.metrics = [
          { label: 'Usuarios activos', value: 128, icon: 'bi-people', accent: 'metric-icon--blue' },
          { label: 'Roles vigentes', value: data.assetRoles, icon: 'bi-shield-check', accent: 'metric-icon--purple' },
          { label: 'Modulos con permiso', value: data.modulesWithPermissions, icon: 'bi-grid-3x3-gap', accent: 'metric-icon--green' },
          { label: 'Cuentas inactivas', value: data.inactiveAccounts, icon: 'bi-person-x', accent: 'metric-icon--orange' },
        ];
      },
      error: (err) => {
        console.error('Error al obtener las estadísticas del dashboard', err);
        // Mantener métricas por defecto en caso de error
      }
    });
  }

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

