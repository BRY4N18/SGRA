import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const allowed = (route.data?.['roles'] ?? []) as string[];
  const role = auth.getRole();

  if (!role) return router.createUrlTree(['/login']);
  if (allowed.length === 0) return true;

  return allowed.includes(role) ? true : router.createUrlTree(['/login']);
};
