import { Routes } from '@angular/router';


import { PainelComponent } from './pages/painel/painel.component';
import { AlunosComponent } from './pages/alunos/alunos.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { OficinasComponent } from './pages/oficinas/oficinas.component';

export const routes: Routes = [
    { path: 'painel', component: PainelComponent },
    { path: 'alunos', component: AlunosComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'oficinas', component: OficinasComponent },

    { path: '', redirectTo: '/painel', pathMatch: 'full' }
];