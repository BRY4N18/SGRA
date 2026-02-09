import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const allowed = (route.data?.['roles'] ?? []) as string[];
  const role = auth.getRole();

  if (!auth.isAuthenticated() || !role) return router.createUrlTree(['/login']);
  if (allowed.length === 0) return true;

  if (allowed.includes(role)) return true;

  const redirectMap: Record<string, string> = {
    TEACHER: '/dashboard/docente',
    STUDENT: '/dashboard/estudiante',
    ADMIN: '/dashboard/admin',
    COORDINATOR: '/dashboard/en-construccion',
  };

  return router.createUrlTree([redirectMap[role] ?? '/login']);
};
