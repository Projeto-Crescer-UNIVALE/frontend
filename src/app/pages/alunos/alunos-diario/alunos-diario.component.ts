import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DiarioService } from '../../../core/services/diario.service';

@Component({
  selector: 'app-alunos-diario',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './alunos-diario.component.html',
  styleUrls: ['./alunos-diario.component.css']
})
export class AlunosDiarioComponent implements OnInit {
  aluno: any;
  diarios: any[] = [];
  idAluno!: number;
  carregando = true;
  termoPesquisa = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private diarioService: DiarioService
  ) { }

  ngOnInit(): void {
    this.idAluno = Number(this.route.parent?.snapshot.paramMap.get('id'));

    // Carrega dados do aluno
    this.carregarAluno();

    // Carrega diários
    this.carregarDiarios();
  }

  private carregarAluno(): void {
    this.http.get(`http://localhost:3000/aluno/${this.idAluno}`).subscribe({
      next: (data: any) => {
        this.aluno = data;
      },
      error: (err) => {
        console.error('Erro ao buscar aluno:', err);
        alert('Erro ao carregar dados do aluno');
      }
    });
  }

  carregarDiarios(termoPesquisa?: string): void {
    this.carregando = true;

    const query = termoPesquisa ? { search: termoPesquisa } : {};

    this.diarioService.getDiariosByAluno(this.idAluno, query).subscribe({
      next: (data: any) => {
        // Se o backend retorna um objeto com paginação
        if (data.data) {
          this.diarios = data.data || [];
        } else {
          // Se retorna array direto
          this.diarios = data || [];
        }
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao buscar diários:', err);
        this.diarios = [];
        this.carregando = false;
      }
    });
  }

  pesquisar(): void {
    this.carregarDiarios(this.termoPesquisa);
  }

  limparPesquisa(): void {
    this.termoPesquisa = '';
    this.carregarDiarios();
  }
}
