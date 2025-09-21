import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TabelaComponent, Coluna } from '../../../components/tabela/tabela.component';

@Component({
  selector: 'app-oficinas-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TabelaComponent],
  templateUrl: './oficinas-list.component.html',
  styleUrls: ['./oficinas-list.component.css']
})

export class OficinasListComponent {

  readonly colunas: Coluna[] = [
    {
      nome: 'Nome', campo: 'nome',
    },
    {
      nome: 'Professor', campo: 'funcionario.nome',
    },
  ]
}
