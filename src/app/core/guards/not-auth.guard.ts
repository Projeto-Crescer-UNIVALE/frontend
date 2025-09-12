import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from '../sevices/auth.service';
import { inject } from '@angular/core';

export const NotAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    if (authService.user?.perfil === 'Administrador') {
      return new RedirectCommand(router.parseUrl('/dashboard'));
    }
    if (authService.user?.perfil === 'Professor') {
      return new RedirectCommand(router.parseUrl('/oficinas'));
    }
  }
  return true;
};
