import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../sevices/auth.service';
import { inject } from '@angular/core';

export const IsAdminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated() && authService.isAdmin()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
