import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from '../sevices/auth.service';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router)

  if (authService.isAuthenticated()){ return true };

  authService.logout();
  return new RedirectCommand(router.parseUrl('/auth/login'));
};
