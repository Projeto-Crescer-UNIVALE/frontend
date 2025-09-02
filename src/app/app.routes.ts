import { Routes } from '@angular/router';
import { PainelComponent } from './pages/painel/painel.component';
import { AlunosComponent } from './pages/alunos/alunos.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { OficinasComponent } from './pages/oficinas/oficinas.component';


export const routes: Routes = [
  // Tela inicial (dashboard)
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },

  // Rotas do painel
  { path: 'painel', component: PainelComponent },
  { path: 'alunos', component: AlunosComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'oficinas', component: OficinasComponent },

  // Redirecionamento padrão
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
]
