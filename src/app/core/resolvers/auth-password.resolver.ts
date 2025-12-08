import { inject } from "@angular/core";
import { ResolveFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { firstValueFrom } from "rxjs";
import { AuthResponse } from "../interface";

export const authPasswordResolver: ResolveFn<AuthResponse | null> = async (route) => {
  const token = route.paramMap.get('token');
  const router = inject(Router)
  const authService = inject(AuthService)
  const isCreatePasswordRoute = route.routeConfig?.path === 'create-password/:token';

  if (!token) {
    await router.navigate(['/auth/sign-in'])
    return null;
  }

  const session = await firstValueFrom(authService.verificaToken(token, isCreatePasswordRoute ? 'primeiro_acesso' : 'redefinicao_senha'))

  return session;
}