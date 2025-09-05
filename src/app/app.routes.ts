import { Routes } from '@angular/router';

export const routes: Routes = [
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

  { path: '', redirectTo: 'oficinas', pathMatch: 'full' },
  { path: '**', redirectTo: 'oficinas' }
];
