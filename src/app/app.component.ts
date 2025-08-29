import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabelaComponent } from './components/tabela/tabela.component';
import type { Coluna } from './components/tabela/tabela.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TabelaComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
   title = 'projeto-crescer-tabela';
   
  colunas: Coluna[] = [
    { campo: 'nome',  nome: 'Nome' },
    { campo: 'cpf',   nome: 'CPF' },
    { campo: 'email', nome: 'Email' },
  ];

  dados = [
    { id: 1, nome: 'Ana Souza', cpf: '123.456.789-00', email: 'email' },
    { id: 2, nome: 'Bruno Lima', cpf: '987.654.321-00', email: 'email' },
    
  ];

  visualizar(item: any) {
    console.log('VISUALIZAR ->', item);
    // aqui você pode abrir um modal, navegar para uma rota de detalhes, etc.
  }

  deletar(item: any) {
    console.log('DELETAR ->', item);
    // aqui você pode confirmar e remover da lista / chamar API
    // this.dados = this.dados.filter(d => d.id !== item.id);
  }
}