import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Coluna, TabelaComponent } from "../../../components/tabela/tabela.component";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-alunos-list',
  standalone: true,
  templateUrl: './alunos-list.component.html',
  styleUrls: ['./alunos-list.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, TabelaComponent]
})
export class AlunosListComponent {
  readonly colunas: Coluna[] = [
    {
      nome: 'Nome',
      campo: 'nome',
    },
    {
      nome: 'CPF',
      campo: 'cpf',
    },
    {
      nome: 'Nome responsável',
      campo: 'nome_mae',
    },
  ]

  constructor(private router: Router, private http: HttpClient) { }

  deletarAluno(aluno: any) {
    if (confirm(`Tem certeza que deseja excluir o aluno ${aluno.nome}?`)) {
      this.http.delete(`${environment.apiUrl}/aluno/${aluno.id_aluno}`).subscribe(() => {
        alert('Aluno deletado com sucesso!');
        window.location.reload();
      });
    }
  }
}
