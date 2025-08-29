import { Routes } from '@angular/router';
import { TabelaComponent } from './components/tabela/tabela.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabela',
    pathMatch: 'full'
  },
  {
    path: 'tabela',
    component: TabelaComponent
  }
];