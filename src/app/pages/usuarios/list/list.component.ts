import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipo: string;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  termo: string = '';
  tipoSelecionado: string = '';
  listaUsuarios: Usuario[] = [
    { id: 1, nome: 'Maria Souza', email: 'maria@email.com', tipo: 'Administrador' },
    { id: 2, nome: 'João Silva', email: 'joao@email.com', tipo: 'Professor' },
    { id: 3, nome: 'Ana Lima', email: 'ana@email.com', tipo: 'Professor' }
  ];
  listaFiltrada: Usuario[] = [...this.listaUsuarios];

  constructor(private router: Router) {}

  pesquisar() {
    this.listaFiltrada = this.listaUsuarios.filter(u => {
      const matchTermo =
        this.termo === '' ||
        u.nome.toLowerCase().includes(this.termo.toLowerCase()) ||
        u.email.toLowerCase().includes(this.termo.toLowerCase());

      const matchTipo = this.tipoSelecionado === '' || u.tipo === this.tipoSelecionado;

      return matchTermo && matchTipo;
    });
  }

  deletar(id: number) {
    if (confirm('Tem certeza que deseja deletar este usuário?')) {
      this.listaUsuarios = this.listaUsuarios.filter(u => u.id !== id);
      this.pesquisar();
    }
  }
}
