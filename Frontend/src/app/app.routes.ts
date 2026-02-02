import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { authGuard } from './core/guards/authGuard';
import { roleGuard } from './core/guards/roleGuard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard/estudiante',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['STUDENT'] },
    loadComponent: () =>
      import('./features/student/layout/student-layout.component').then(
        m => m.StudentLayoutComponent
      ),
    children: [
      {
        path: '',
        data: { title: 'Dashboard Estudiante' },
        loadComponent: () =>
          import('./features/student/pages/dashboard/student-dashboard.component').then(
            m => m.StudentDashboardPageComponent
          ),
      },
      {
        path: 'mis-solicitudes',
        data: { title: 'Mis Solicitudes' },
        loadComponent: () =>
          import('./features/student/pages/mis-solicitudes/mis-solicitudes.component').then(
            m => m.MisSolicitudesComponent
          ),
      },
      {
        path: 'nueva-solicitud',
        data: { title: 'Nueva Solicitud de Refuerzo' },
        loadComponent: () =>
          import('./features/student/pages/nueva-solicitud/nueva-solicitud.component').then(
            m => m.NuevaSolicitudComponent
          ),
      },
      {
        path: 'historial',
        data: { title: 'Historial' },
        loadComponent: () =>
          import('./features/student/pages/historial/historial.component').then(
            m => m.HistorialComponent
          ),
      },
      {
        path: 'preferencias',
        data: { title: 'Preferencias' },
        loadComponent: () =>
          import('./features/student/pages/preferencias/preferencias.component').then(
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
      import('./features/teacher/layout/teacher-layout.component').then(
        m => m.TeacherLayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/teacher/pages/dashboard/teacher-dashboard.component').then(
            m => m.TeacherDashboardComponent
          ),
      },
      {
        path: 'solicitudes',
        loadComponent: () =>
          import('./features/teacher/pages/solicitudes/solicitudes.component').then(
            m => m.SolicitudesComponent
          ),
      },
      {
        path: 'disponibilidad',
        loadComponent: () =>
          import('./features/teacher/pages/disponibilidad/disponibilidad.component').then(
            m => m.DisponibilidadComponent
          ),
      },
      {
        path: 'sesiones',
        loadComponent: () =>
          import('./features/teacher/pages/sesiones/sesiones.component').then(
            m => m.SesionesComponent
          ),
      },
      {
        path: 'reportes',
        loadComponent: () =>
          import('./features/teacher/pages/reportes/reportes.component').then(
            m => m.ReportesComponent
          ),
      },
      {
        path: 'preferencias',
        loadComponent: () =>
          import('./features/teacher/pages/preferencias/preferencias.component').then(
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
        path: 'admin',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] },
        loadComponent: () =>
          import('./features/dashboards/adminDashboard/adminDashboard.component')
            .then(m => m.AdminDashboardComponent),
      },
      {
        path: 'coordinador',
        canActivate: [roleGuard],
        data: { roles: ['COORDINATOR'] },
        loadComponent: () =>
          import('./features/dashboards/coordinatorDashboard/coordinatorDashboard.component')
            .then(m => m.CoordinatorDashboardComponent),
      },
      {
        path: 'en-construccion',
        loadComponent: () =>
          import('./features/placeholders/en-construccion/en-construccion.component').then(
            m => m.EnConstruccionComponent
          ),
      },

      // si entras a /dashboard, manda a coordinador (o al que quieras)
      { path: '', redirectTo: 'coordinador', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
