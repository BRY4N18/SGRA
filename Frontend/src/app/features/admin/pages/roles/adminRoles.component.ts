import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRole } from '../../modelos/AdminRole';
import { RoleKpi } from '../../modelos/RoleKpi';

@Component({
  selector: 'app-admin-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adminRoles.component.html',
  styleUrl: './adminRoles.component.scss',
})
export class AdminRolesComponent {
  roles: AdminRole[] = [
    {
      id: 1,
      name: 'Administrador',
      description: 'Acceso total a configuracion y reportes.',
      users: 3,
      status: 'Activo',
      modules: 14,
      updated: 'Hoy 08:20',
    },
    {
      id: 2,
      name: 'Coordinador',
      description: 'Gestion de espacios, reportes y aprobaciones.',
      users: 6,
      status: 'Activo',
      modules: 9,
      updated: 'Ayer 17:40',
    },
    {
      id: 3,
      name: 'Docente',
      description: 'Atencion de solicitudes y sesiones.',
      users: 24,
      status: 'Activo',
      modules: 6,
      updated: 'Hace 3 dias',
    },
    {
      id: 4,
      name: 'Estudiante',
      description: 'Acceso a solicitudes y seguimiento.',
      users: 320,
      status: 'Activo',
      modules: 4,
      updated: 'Hace 1 semana',
    },
  ];

  kpis: RoleKpi[] = [
    { label: 'Roles activos', value: 4, icon: 'bi-shield-check' },
    { label: 'Roles inactivos', value: 0, icon: 'bi-shield-slash' },
    { label: 'Usuarios con rol', value: 355, icon: 'bi-people' },
    { label: 'Cambios hoy', value: 3, icon: 'bi-activity' },
  ];

  selectedRole!: AdminRole;

  newRole = {
    name: '',
    description: '',
    status: 'Activo',
  };

  showRoleModal = false;

  constructor() {
    this.selectedRole = this.roles[0];
  }

  selectRole(role: AdminRole) {
    this.selectedRole = role;
  }

  openRoleModal(role: AdminRole) {
    this.selectedRole = role;
    this.showRoleModal = true;
  }

  closeRoleModal() {
    this.showRoleModal = false;
  }
}

