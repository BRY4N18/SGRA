import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { authGuard } from './core/guards/authGuard';
import { roleGuard } from './core/guards/roleGuard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

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
        path: 'docente',
        canActivate: [roleGuard],
        data: { roles: ['TEACHER'] },
        loadComponent: () =>
          import('./features/dashboards/teacherDashboard/teacherDashboard.component')
            .then(m => m.TeacherDashboardComponent),
      },
      {
        path: 'estudiante',
        canActivate: [roleGuard],
        data: { roles: ['STUDENT'] },
        loadComponent: () =>
          import('./features/dashboards/studentDashboard/studentDashboard.component')
            .then(m => m.StudentDashboardComponent),
      },

      // si entras a /dashboard, manda a coordinador (o al que quieras)
      { path: '', redirectTo: 'coordinador', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
