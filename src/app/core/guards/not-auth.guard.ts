import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const NotAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    const route = router.parseUrl(authService.getUser()?.perfil === 'Administrador' ? '/painel/dashboard' : '/painel/oficinas');

    return new RedirectCommand(route);
  }
  return true;
};
