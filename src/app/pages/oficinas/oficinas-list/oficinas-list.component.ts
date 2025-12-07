import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TabelaComponent, Coluna } from '../../../components/tabela/tabela.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-oficinas-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TabelaComponent],
  templateUrl: './oficinas-list.component.html',
  styleUrls: ['./oficinas-list.component.css']
})

export class OficinasListComponent {
  private http = inject(HttpClient);

  readonly colunas: Coluna[] = [
    {
      nome: 'Nome', campo: 'nome',
    },
    {
      nome: 'Professor', campo: 'funcionario.nome',
    },
  ]

  deletarOficina(oficina: any) {
    if (confirm(`Tem certeza que deseja excluir a oficina ${oficina.nome}?`)) {
      this.http.delete(`${environment.apiUrl}/oficina/${oficina.id_oficina}`).subscribe(() => {
        alert('Oficina deletada com sucesso!');
        // Atualiza a tabela
        const tabela = document.querySelector('app-tabela');
        if (tabela) {
          tabela.dispatchEvent(new CustomEvent('reloadData'));
        }
      });
    }
  }
}
