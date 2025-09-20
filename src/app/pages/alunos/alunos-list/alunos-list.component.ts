import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Coluna, TabelaComponent } from '../../../components/tabela/tabela.component';

@Component({
  selector: 'app-alunos-list',
  templateUrl: './alunos-list.component.html',
  styleUrls: ['./alunos-list.component.css'],
  imports: [TabelaComponent, RouterModule]
})
export class AlunosListComponent {
  readonly colunas: Coluna[] = [
    {
      nome: 'Nome', campo: 'nome',
    },
    {
      nome: 'CPF', campo: 'cpf',
    },
    {
      nome: 'Nome responsável', campo: 'nome_mae',
    }
  ]

  constructor(private router: Router) {}
}
