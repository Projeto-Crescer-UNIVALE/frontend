import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'forgot-password/sent',
    loadComponent: () => import('./pages/auth/forgot-password-sent/forgot-password-sent.component').then(m => m.ForgotPasswordSentComponent)
  },
  {
    path: 'create-password/:token',
    loadComponent: () => import('./pages/auth/create-password/create-password.component').then(m => m.CreatePasswordComponent)
  },
  {
    path: 'reset-password/:token',
    loadComponent: () => import('./pages/auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
