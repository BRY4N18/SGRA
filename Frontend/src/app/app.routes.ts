import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      {
        path: 'admin',
        loadComponent: () =>
          import('./features/dashboards/adminDashboard/adminDashboard.component')
            .then(m => m.AdminDashboardComponent),
      },
      {
        path: 'coordinador',
        loadComponent: () =>
          import('./features/dashboards/coordinatorDashboard/coordinatorDashboard.component')
            .then(m => m.CoordinatorDashboardComponent),
      },
      {
        path: 'docente',
        loadComponent: () =>
          import('./features/dashboards/teacherDashboard/teacherDashboard.component')
            .then(m => m.TeacherDashboardComponent),
      },
      {
        path: 'estudiante',
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
