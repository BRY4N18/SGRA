import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { authGuard } from './core/guards/authGuard';
import { roleGuard } from './core/guards/roleGuard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard/admin',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] },
    loadComponent: () =>
      import('./features/admin/layout/adminLayout.component').then(
        m => m.AdminLayoutComponent
      ),
    children: [
      {
        path: '',
        data: { title: 'Dashboard Administrador' },
        loadComponent: () =>
          import('./features/admin/pages/dashboard/adminDashboard.component').then(
            m => m.AdminDashboardPageComponent
          ),
      },
      {
        path: 'usuarios',
        data: { title: 'Gestion de Usuarios' },
        loadComponent: () =>
          import('./features/admin/pages/users/adminUsers.component').then(
            m => m.AdminUsuariosComponent
          ),
      },
      {
        path: 'roles',
        data: { title: 'Gestion de Roles' },
        loadComponent: () =>
          import('./features/admin/pages/roles/adminRoles.component').then(
            m => m.AdminRolesComponent
          ),
      },
      {
        path: 'permisos',
        data: { title: 'Permisos por Modulo' },
        loadComponent: () =>
          import('./features/admin/pages/permissions/adminPermissions.component').then(
            m => m.AdminPermisosComponent
          ),
      },
    ],
  },
  {
    path: 'dashboard/estudiante',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['STUDENT'] },
    loadComponent: () =>
      import('./features/student/layout/studentLayout.component').then(
        m => m.StudentLayoutComponent
      ),
    children: [
      {
        path: '',
        data: { title: 'Dashboard Estudiante' },
        loadComponent: () =>
          import('./features/student/pages/dashboard/studentDashboard.component').then(
            m => m.StudentDashboardPageComponent
          ),
      },
      {
        path: 'mis-solicitudes',
        data: { title: 'Mis Solicitudes' },
        loadComponent: () =>
          import('./features/student/pages/myRequests/myRequests.component').then(
            m => m.MisSolicitudesComponent
          ),
      },
      {
        path: 'nueva-solicitud',
        data: { title: 'Nueva Solicitud de Refuerzo' },
        loadComponent: () =>
          import('./features/student/pages/newRequest/newRequest.component').then(
            m => m.NuevaSolicitudComponent
          ),
      },
      {
        path: 'historial',
        data: { title: 'Historial' },
        loadComponent: () =>
          import('./features/student/pages/history/history.component').then(
            m => m.HistorialComponent
          ),
      },
      {
        path: 'preferencias',
        data: { title: 'Preferencias' },
        loadComponent: () =>
          import('./features/student/pages/preferences/preferences.component').then(
            m => m.PreferenciasComponent
          ),
      },
    ],
  },
  {
    path: 'dashboard/docente',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['TEACHER', 'DOCENTE'] },
    loadComponent: () =>
      import('./features/teacher/layout/teacherLayout.component').then(
        m => m.TeacherLayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/teacher/pages/dashboard/teacherDashboard.component').then(
            m => m.TeacherDashboardComponent
          ),
      },
      {
        path: 'solicitudes',
        loadComponent: () =>
          import('./features/teacher/pages/requests/requests.component').then(
            m => m.SolicitudesComponent
          ),
      },
      {
        path: 'disponibilidad',
        loadComponent: () =>
          import('./features/teacher/pages/availability/availability.component').then(
            m => m.DisponibilidadComponent
          ),
      },
      {
        path: 'sesiones',
        loadComponent: () =>
          import('./features/teacher/pages/sessions/sessions.component').then(
            m => m.SesionesComponent
          ),
      },
      {
        path: 'reportes',
        loadComponent: () =>
          import('./features/teacher/pages/reports/reports.component').then(
            m => m.ReportesComponent
          ),
      },
      {
        path: 'preferencias',
        loadComponent: () =>
          import('./features/teacher/pages/preferences/preferences.component').then(
            m => m.PreferenciasComponent
          ),
      },
    ],
  },

  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'coordinador',
        canActivate: [roleGuard],
        data: { roles: ['COORDINATOR'] },
        loadComponent: () =>
          import('./features/dashboards/coordinatorDashboard/coordinatorDashboard.component')
            .then(m => m.CoordinatorDashboardComponent),
      },
      {
        path: 'coordinador/espacios',
        canActivate: [roleGuard],
        data: { roles: ['COORDINATOR'] },
        loadComponent: () =>
          import('./features/coordinator/pages/physicalSpaces/physicalSpaces.component')
            .then(m => m.EspaciosFisicosComponent),
      },
      {
        path: 'coordinador/reportes',
        canActivate: [roleGuard],
        data: { roles: ['COORDINATOR'] },
        loadComponent: () =>
          import('./features/coordinator/pages/reports/reports.component')
            .then(m => m.ReportesCoordinacionComponent),
      },
      {
        path: 'coordinador/importar',
        canActivate: [roleGuard],
        data: { roles: ['COORDINATOR'] },
        loadComponent: () =>
          import('./features/coordinator/pages/importData/importData.component')
            .then(m => m.ImportarDatosComponent),
      },
      {
        path: 'en-construccion',
        loadComponent: () =>
          import('./features/placeholders/underConstruction/underConstruction.component').then(
            m => m.EnConstruccionComponent
          ),
      },

      // si entras a /dashboard, manda a coordinador (o al que quieras)
      { path: '', redirectTo: 'coordinador', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: 'login' },
];

