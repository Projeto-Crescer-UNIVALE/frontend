import { Component, input, output } from '@angular/core';

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
export class TabelaComponent {
  // INPUT SIGNALS
  colunas = input<Coluna[]>([]);
  dados   = input<any[]>([]);
  textoVisualizar = input<string>('Visualizar');
  textoDeletar    = input<string>('Deletar');

  // OUTPUT SIGNALS
  acaoPrimaria  = output<any>(); // visualizar
  acaoSecundaria = output<any>(); // deletar

  onVisualizar(linha: any) {
    this.acaoPrimaria.emit(linha);
  }

  onDeletar(linha: any) {
    this.acaoSecundaria.emit(linha);
  }
}