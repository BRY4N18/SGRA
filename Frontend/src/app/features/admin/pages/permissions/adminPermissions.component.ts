import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type PermissionKey = 'view' | 'create' | 'edit' | 'delete';

interface PermissionFlags {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

interface PermissionAction {
  key: PermissionKey;
  label: string;
  icon: string;
}

interface AdminModule {
  key: string;
  name: string;
  description: string;
  category: string;
  icon: string;
}

interface RoleOption {
  key: string;
  label: string;
}

@Component({
  selector: 'app-admin-permisos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adminPermissions.component.html',
  styleUrl: './adminPermissions.component.scss',
})
export class AdminPermisosComponent {
  roleOptions: RoleOption[] = [
    { key: 'ADMIN', label: 'Administrador' },
    { key: 'COORDINATOR', label: 'Coordinador' },
    { key: 'TEACHER', label: 'Docente' },
    { key: 'STUDENT', label: 'Estudiante' },
  ];

  permissionActions: PermissionAction[] = [
    { key: 'view', label: 'Ver', icon: 'bi-eye' },
    { key: 'create', label: 'Crear', icon: 'bi-plus-square' },
    { key: 'edit', label: 'Editar', icon: 'bi-pencil' },
    { key: 'delete', label: 'Eliminar', icon: 'bi-trash' },
  ];

  modules: AdminModule[] = [
    {
      key: 'usuarios',
      name: 'Usuarios',
      description: 'Gestion de usuarios y acceso.',
      category: 'Seguridad',
      icon: 'bi-people',
    },
    {
      key: 'roles',
      name: 'Roles',
      description: 'Definicion de roles y niveles.',
      category: 'Seguridad',
      icon: 'bi-shield-lock',
    },
    {
      key: 'permisos',
      name: 'Permisos',
      description: 'Permisos por modulo del sistema.',
      category: 'Seguridad',
      icon: 'bi-key',
    },
    {
      key: 'carreras',
      name: 'Carreras',
      description: 'Catalogo de carreras y areas.',
      category: 'Academico',
      icon: 'bi-mortarboard',
    },
    {
      key: 'asignaturas',
      name: 'Asignaturas',
      description: 'Asignaturas, temarios y periodos.',
      category: 'Academico',
      icon: 'bi-journal-bookmark',
    },
    {
      key: 'refuerzos',
      name: 'Refuerzos',
      description: 'Solicitudes, sesiones y reportes.',
      category: 'Operacion',
      icon: 'bi-clipboard-data',
    },
    {
      key: 'espacios',
      name: 'Espacios fisicos',
      description: 'Areas de trabajo y disponibilidad.',
      category: 'Operacion',
      icon: 'bi-building',
    },
    {
      key: 'notificaciones',
      name: 'Notificaciones',
      description: 'Canales y mensajes del sistema.',
      category: 'Comunicacion',
      icon: 'bi-bell',
    },
    {
      key: 'configuracion',
      name: 'Configuracion',
      description: 'Institucion, modalidades y parametros.',
      category: 'Sistema',
      icon: 'bi-gear',
    },
  ];

  selectedRole = 'ADMIN';
  permissionMatrix: Record<string, Record<string, PermissionFlags>> = {};

  constructor() {
    this.permissionMatrix = {
      ADMIN: this.buildRoleMatrix({ view: true, create: true, edit: true, delete: true }),
      COORDINATOR: this.buildRoleMatrix(
        { view: true, create: true, edit: true, delete: false },
        {
          roles: { create: false, edit: false, delete: false },
          permisos: { view: false, create: false, edit: false, delete: false },
          usuarios: { create: false, edit: false, delete: false },
          configuracion: { view: true, create: false, edit: false, delete: false },
        }
      ),
      TEACHER: this.buildRoleMatrix(
        { view: true, create: true, edit: true, delete: false },
        {
          roles: { view: false, create: false, edit: false, delete: false },
          permisos: { view: false, create: false, edit: false, delete: false },
          usuarios: { view: false, create: false, edit: false, delete: false },
          configuracion: { view: false, create: false, edit: false, delete: false },
        }
      ),
      STUDENT: this.buildRoleMatrix(
        { view: true, create: true, edit: false, delete: false },
        {
          roles: { view: false, create: false, edit: false, delete: false },
          permisos: { view: false, create: false, edit: false, delete: false },
          usuarios: { view: false, create: false, edit: false, delete: false },
          configuracion: { view: false, create: false, edit: false, delete: false },
          notificaciones: { view: true, create: false, edit: false, delete: false },
        }
      ),
    };
  }

  get selectedRoleLabel(): string {
    return this.roleOptions.find(role => role.key === this.selectedRole)?.label ?? this.selectedRole;
  }

  get enabledModules(): number {
    const matrix = this.permissionMatrix[this.selectedRole] ?? {};
    return this.modules.filter(module => {
      const flags = matrix[module.key];
      return flags ? Object.values(flags).some(Boolean) : false;
    }).length;
  }

  get fullAccessModules(): number {
    const matrix = this.permissionMatrix[this.selectedRole] ?? {};
    return this.modules.filter(module => {
      const flags = matrix[module.key];
      return flags ? Object.values(flags).every(Boolean) : false;
    }).length;
  }

  get readOnlyModules(): number {
    const matrix = this.permissionMatrix[this.selectedRole] ?? {};
    return this.modules.filter(module => {
      const flags = matrix[module.key];
      return flags ? flags.view && !flags.create && !flags.edit && !flags.delete : false;
    }).length;
  }

  private buildRoleMatrix(
    defaults: PermissionFlags,
    overrides: Record<string, Partial<PermissionFlags>> = {}
  ): Record<string, PermissionFlags> {
    return this.modules.reduce((acc, module) => {
      const override = overrides[module.key] ?? {};
      acc[module.key] = {
        view: defaults.view,
        create: defaults.create,
        edit: defaults.edit,
        delete: defaults.delete,
        ...override,
      };
      return acc;
    }, {} as Record<string, PermissionFlags>);
  }
}

