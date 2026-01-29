import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './shared/layout/layout';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },

  {
    path: 'dashboard',
    component: Layout,
    children: [
      {
        path: 'admin',
        loadComponent: () =>
          import('./pages/dashboards/admin-dashboard/admin-dashboard')
            .then(m => m.AdminDashboard),
      },
      {
        path: 'coordinador',
        loadComponent: () =>
          import('./pages/dashboards/coordinador-dashboard/coordinador-dashboard')
            .then(m => m.CoordinadorDashboard),
      },
      {
        path: 'docente',
        loadComponent: () =>
          import('./pages/dashboards/docente-dashboard/docente-dashboard')
            .then(m => m.DocenteDashboard),
      },
      {
        path: 'estudiante',
        loadComponent: () =>
          import('./pages/dashboards/estudiante-dashboard/estudiante-dashboard')
            .then(m => m.EstudianteDashboard),
      },

      // si entras a /dashboard, manda a coordinador (o al que quieras)
      { path: '', redirectTo: 'coordinador', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
