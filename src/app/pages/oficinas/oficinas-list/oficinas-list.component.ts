import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './oficinas-list.component.html',
  styleUrls: ['./oficinas-list.component.css']
})
export class OficinasListComponent {
  termo = '';
  oficinas: Oficina[] = [
    { id: 1, nome: 'Oficina de Música', professor: 'João', dias: 'Domingo', horario: '00:00 - 00:00' },
    { id: 2, nome: 'Oficina de Arte', professor: 'Maria', dias: 'Segunda', horario: '08:00 - 10:00' },
    { id: 3, nome: 'Oficina de Esportes', professor: 'Ana', dias: 'Quarta', horario: '14:00 - 16:00' },
  ];

  get listaFiltrada(): Oficina[] {
    const t = this.termo.trim().toLowerCase();
    if (!t) return this.oficinas;
    return this.oficinas.filter(o =>
      o.nome.toLowerCase().includes(t) ||
      o.professor.toLowerCase().includes(t) ||
      o.dias.toLowerCase().includes(t)
    );
  }

  pesquisar() {/* filtragem já é reativa pelo getter */}
  deletar(id: number) {
    this.oficinas = this.oficinas.filter(o => o.id !== id);
  }
}
