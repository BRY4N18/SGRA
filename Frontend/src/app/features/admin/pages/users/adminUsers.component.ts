import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminUser } from '../../modelos/AdminUser';
import { AdminKpi } from '../../modelos/AdminKpi';

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adminUsers.component.html',
  styleUrl: './adminUsers.component.scss',
})
export class AdminUsuariosComponent {
  search = '';
  roleFilter = 'Todos';
  statusFilter = 'Todos';

  roleOptions = ['Todos', 'Administrador', 'Coordinador', 'Docente', 'Estudiante'];
  statusOptions = ['Todos', 'Activo', 'Inactivo'];

  users: AdminUser[] = [
    {
      id: 1,
      fullName: 'Paula Gomez',
      identifier: '1102398457',
      email: 'paula.gomez@uteq.edu.ec',
      phone: '0987654321',
      address: 'Av. Quito 123',
      gender: 'Femenino',
      institution: 'UTEQ',
      role: 'Administrador',
      username: 'pgomez',
      status: 'Activo',
      accountStatus: 'Activa',
    },
    {
      id: 2,
      fullName: 'Mario Cardenas',
      identifier: '1105982341',
      email: 'mcardenas@uteq.edu.ec',
      phone: '0981122334',
      address: 'Av. Universitaria s/n',
      gender: 'Masculino',
      institution: 'UTEQ',
      role: 'Coordinador',
      username: 'mcardenas',
      status: 'Activo',
      accountStatus: 'Activa',
    },
    {
      id: 3,
      fullName: 'Daniela Paredes',
      identifier: '1107823312',
      email: 'dparedes@uteq.edu.ec',
      phone: '0984433221',
      address: 'Calle 9 de Octubre',
      gender: 'Femenino',
      institution: 'UTEQ',
      role: 'Docente',
      username: 'dparedes',
      status: 'Activo',
      accountStatus: 'Activa',
    },
    {
      id: 4,
      fullName: 'Jose Rivera',
      identifier: '1103367890',
      email: 'jrivera@uteq.edu.ec',
      phone: '0986655443',
      address: 'Av. Amazonia 456',
      gender: 'Masculino',
      institution: 'UTEQ',
      role: 'Estudiante',
      username: 'jrivera',
      status: 'Inactivo',
      accountStatus: 'Bloqueada',
    },
    {
      id: 5,
      fullName: 'Carla Meza',
      identifier: '1109923145',
      email: 'cmeza@uteq.edu.ec',
      phone: '0987788991',
      address: 'Calle Sucre 221',
      gender: 'Femenino',
      institution: 'UTEQ',
      role: 'Docente',
      username: 'cmeza',
      status: 'Activo',
      accountStatus: 'Activa',
    },
  ];

  kpis: AdminKpi[] = [];

  form = {
    nombres: '',
    apellidos: '',
    identificador: '',
    correo: '',
    telefono: '',
    direccion: '',
    genero: '',
    institucion: 'UTEQ',
    rol: '',
    usuario: '',
    cuentaActiva: true,
  };

  showUserModal = false;

  genderOptions = ['Masculino', 'Femenino', 'Otro'];
  institutionOptions = ['UTEQ', 'Instituto Tecnico', 'Unidad Educativa'];

  constructor() {
    this.kpis = [
      {
        label: 'Usuarios activos',
        value: this.users.filter(user => user.status === 'Activo').length,
        icon: 'bi-person-check',
      },
      {
        label: 'Cuentas bloqueadas',
        value: this.users.filter(user => user.accountStatus === 'Bloqueada').length,
        icon: 'bi-shield-exclamation',
      },
      {
        label: 'Roles asignados',
        value: new Set(this.users.map(user => user.role)).size,
        icon: 'bi-shield-lock',
      },
      {
        label: 'Nuevos este mes',
        value: 12,
        icon: 'bi-person-plus',
      },
    ];
  }

  get filteredUsers(): AdminUser[] {
    return this.users.filter(user => {
      const matchesSearch =
        !this.search ||
        user.fullName.toLowerCase().includes(this.search.toLowerCase()) ||
        user.email.toLowerCase().includes(this.search.toLowerCase()) ||
        user.username.toLowerCase().includes(this.search.toLowerCase()) ||
        user.identifier.includes(this.search) ||
        user.phone.includes(this.search) ||
        user.address.toLowerCase().includes(this.search.toLowerCase()) ||
        user.institution.toLowerCase().includes(this.search.toLowerCase());

      const matchesRole = this.roleFilter === 'Todos' || user.role === this.roleFilter;
      const matchesStatus = this.statusFilter === 'Todos' || user.status === this.statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }

  clearFilters() {
    this.search = '';
    this.roleFilter = 'Todos';
    this.statusFilter = 'Todos';
  }

  openUserModal() {
    this.showUserModal = true;
  }

  closeUserModal() {
    this.showUserModal = false;
  }
}

