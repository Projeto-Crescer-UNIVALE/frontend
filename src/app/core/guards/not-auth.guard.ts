import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../sevices/auth.service';
import { inject } from '@angular/core';

export const NotAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    const user = authService.getUser();
    if (user?.perfil === 'Administrador') {
      router.navigate(['/dashboard']);
      return false;
    }
    if (user?.perfil === 'Professor') {
      router.navigate(['/oficinas']);
      return false;
    }
  }

  return true;
};
