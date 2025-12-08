import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './pages/auth/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NotAuthGuard } from './core/guards/not-auth.guard';
import { AlunoResolver } from '../app/core/resolvers/aluno.resolver';
import { OficinaResolver } from './core/resolvers/oficina.resolver';
import { authPasswordResolver } from './core/resolvers/auth-password.resolver';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivateChild: [NotAuthGuard],
    children: [
      { path: 'login', loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent) },
      { path: 'forgot-password', loadComponent: () => import('./pages/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },
      { path: 'create-password/:token', loadComponent: () => import('./pages/auth/create-password/create-password.component').then(m => m.CreatePasswordComponent), resolve: { session: authPasswordResolver } },
      { path: 'reset-password/:token', loadComponent: () => import('./pages/auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent), resolve: { session: authPasswordResolver } },
      { path: '**', redirectTo: 'login' },
    ]
  },
  {
    path: 'painel',
    component: MainLayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'usuarios',
        children: [
          { path: '', loadComponent: () => import('./pages/usuarios/list/list.component').then(m => m.ListComponent) },
          { path: ':id', loadComponent: () => import('./pages/usuarios/form/form.component').then(m => m.FormComponent) },
        ]
      },
      {
        path: 'oficinas',
        children: [
          { path: '', loadComponent: () => import('./pages/oficinas/oficinas-list/oficinas-list.component').then(m => m.OficinasListComponent) },
          {
            path: ':id',
            loadComponent: () => import('./pages/oficinas/oficina-form/oficina-form.component').then(m => m.OficinaFormComponent),
            resolve: { dados: OficinaResolver },
          },
        ]
      },
      {
        path: 'alunos',
        children: [
          { path: '', loadComponent: () => import('./pages/alunos/alunos-list/alunos-list.component').then(m => m.AlunosListComponent) },
          {
            path: ':id',
            resolve: { dados: AlunoResolver },
            children: [
              {
                path: '',
                loadComponent: () => import('./pages/alunos/alunos-form/alunos-form.component').then(m => m.AlunosFormComponent),
                pathMatch: 'full'
              },
              {
                path: 'diario',
                children: [
                  {
                    path: '',
                    loadComponent: () => import('./pages/alunos/alunos-diario/alunos-diario.component').then(m => m.AlunosDiarioComponent),
                    pathMatch: 'full'
                  },
                  {
                    path: 'novo',
                    loadComponent: () => import('../app/pages/alunos/diario-form/diario-form.component').then(m => m.DiarioFormComponent)
                  },
                  {
                    path: ':idDiario',
                    loadComponent: () => import('../app/pages/alunos/diario-form/diario-form.component').then(m => m.DiarioFormComponent)
                  }
                ]
              }
            ]
          },
        ]
      },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
  { path: '**', redirectTo: 'auth/login' },
];
