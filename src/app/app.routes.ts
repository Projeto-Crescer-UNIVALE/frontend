import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './pages/auth/auth-layout/auth-layout.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./pages/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
      },
      {
        path: 'create-password/:token',
        loadComponent: () =>
          import('./pages/auth/create-password/create-password.component').then(m => m.CreatePasswordComponent)
      },
      {
        path: 'reset-password/:token',
        loadComponent: () =>
          import('./pages/auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
      },
    ]
  },

  { path: '**', redirectTo: 'auth/login' }
];
