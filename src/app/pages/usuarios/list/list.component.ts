import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TabelaComponent, Coluna } from "../../../components/tabela/tabela.component";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TabelaComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  readonly colunas: Coluna[] = [
    {
      nome: 'Nome', campo: 'nome',
    },
    {
      nome: 'Tipo', campo: 'perfil.nome',
    },
    {
      nome: 'E-mail', campo: 'email',
    },
  ]

  constructor(private router: Router, private http: HttpClient) { }

  deletarUsuario(funcionario: any) {
    if (confirm(`Tem certeza que deseja excluir o usuário ${funcionario.nome}?`)) {
      // Atualiza o usuário para inativo ao invés de deletar
      this.http.put(`${environment.apiUrl}/funcionario/${funcionario.id_funcionario}`,
        { ...funcionario, ativo: false }
      ).subscribe(() => {
        alert('Usuário deletado com sucesso!');
        // Em vez de recarregar a página, atualiza apenas a tabela
        const tabela = document.querySelector('app-tabela');
        if (tabela) {
          // Dispara um evento customizado para a tabela recarregar os dados
          tabela.dispatchEvent(new CustomEvent('reloadData'));
        }
      });
    }
  }
}
