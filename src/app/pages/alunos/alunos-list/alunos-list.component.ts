import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-alunos-list',
  standalone: true,
  templateUrl: './alunos-list.component.html',
  styleUrls: ['./alunos-list.component.css'],
  imports: [CommonModule, FormsModule, RouterModule] 
})
export class AlunosListComponent {
  alunos = [
    { id: 1, nome: 'João', cpf: '000.000.000-00', grupo: 'Criança', oficinas: 'Música' },
    { id: 2, nome: 'Maria', cpf: '111.111.111-11', grupo: 'Adolescente', oficinas: 'Futebol' }
  ];

  termo: string = '';

  constructor(private router: Router) {}

  novoAluno() {
    this.router.navigate(['/alunos/novo']);
  }

  editarAluno(id: number) {
    this.router.navigate(['/alunos/editar', id]);
  }

  deletarAluno(id: number) {
    console.log('Deletar aluno', id);
  }
  pesquisar() {
    console.log('Pesquisando:', this.termo);
  }

  deletar(id: number) {
    this.deletarAluno(id);
  }
}
