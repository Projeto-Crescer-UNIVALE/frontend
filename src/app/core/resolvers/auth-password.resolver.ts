import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { RedirectCommand, ResolveFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { firstValueFrom } from "rxjs";

export const authPasswordResolver: ResolveFn<unknown> = async (route) => {
  const token = route.paramMap.get('token');
  const router = inject(Router)
  const authService = inject(AuthService)
  const isCreatePasswordRoute = route.routeConfig?.path === 'create-password/:token';

  if (!token) {
    return router.navigate(['/auth/sign-in'])
  }

  const session = await firstValueFrom(authService.verificaToken(token, isCreatePasswordRoute ? 'primeiro_acesso' : 'redefinicao_senha'))

  return session;
}