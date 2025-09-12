import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './pages/auth/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard'},

 
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent) },
      { path: 'forgot-password', loadComponent: () => import('./pages/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },
      { path: 'create-password/:token', loadComponent: () => import('./pages/auth/create-password/create-password.component').then(m => m.CreatePasswordComponent) },
      { path: 'reset-password/:token', loadComponent: () => import('./pages/auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent) },
    ]
  },
  {
    path: 'oficinas',
    loadComponent: () =>
      import('./pages/oficinas/oficinas-list/oficinas-list.component')
        .then(m => m.OficinasListComponent),
  },
  {
    path: 'oficinas/novo',
    loadComponent: () =>
      import('./pages/oficinas/oficina-form/oficina-form.component')
        .then(m => m.OficinaFormComponent),
  },
  {
    path: 'oficinas/editar/:id',
    loadComponent: () =>
      import('./pages/oficinas/oficina-form/oficina-form.component')
        .then(m => m.OficinaFormComponent),
  },

  {
  path: 'oficinas/cadastro',
    loadComponent: () =>
      import('./pages/oficinas/cadastro-oficina/cadastro-oficina.component')
        .then(m => m.CadastroOficinaComponent),
  },

 
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
     
    ],
  },

  { path: '**', redirectTo: 'auth/login' },
];
