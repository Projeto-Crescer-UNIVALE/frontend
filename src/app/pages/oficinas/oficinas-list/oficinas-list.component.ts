import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TabelaComponent, Coluna } from '../../../components/tabela/tabela.component';

type Oficina = {
  id: number;
  nome: string;
  professor: string;
  dias: string;
  horario: string;
};

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
      nome: 'ID', campo: 'nome',
    },
    {
      nome: 'Professor', campo: 'funcionario.nome',
    },
    {
      nome: 'Dias', campo: 'oficinacronograma.dia',
    },
    {
      nome: 'Horario', campo: 'oficinacronograma.hora_inicio',
    },
  ]
}
