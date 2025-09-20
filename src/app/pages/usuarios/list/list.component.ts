import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TabelaComponent, Coluna } from "../../../components/tabela/tabela.component";

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
}
