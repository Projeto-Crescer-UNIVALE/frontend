import { HttpClient } from '@angular/common/http';
import { Component, inject, input, OnInit, output, signal } from '@angular/core';

export interface Coluna {
  campo: string;   // chave no objeto de dados (ex.: 'nome', 'cpf', 'email')
  nome: string;    // rótulo que aparece no TH
  width?: string;  // opcional (ex.: '180px')
}

@Component({
  selector: 'app-tabela',
  standalone: true,
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css'],
})

export class TabelaComponent implements OnInit {
  private http = inject(HttpClient);

  endpoint = input.required<string>();
  colunas = input<Coluna[]>([]);
  textoVisualizar = input<string>('Visualizar');
  textoDeletar    = input<string>('Deletar');

  dados = signal<any[]>([]); // SIGNAL para dados

  acaoPrimaria  = output<any>(); // visualizar
  acaoSecundaria = output<any>(); // deletar

  ngOnInit() {
    this.http.get<any[]>(this.endpoint()).subscribe(response => {
      this.dados.set(response);
    });
  }

  onVisualizar(linha: any) {
    this.acaoPrimaria.emit(linha);
  }

  onDeletar(linha: any) {
    this.acaoSecundaria.emit(linha);
  }
}
