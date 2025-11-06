import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-alunos-diario',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './alunos-diario.component.html',
  styleUrls: ['./alunos-diario.component.css']
})
export class AlunosDiarioComponent implements OnInit {
  aluno: any;
  diarios: any[] = [];
  idAluno!: number;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.idAluno = Number(this.route.snapshot.paramMap.get('id'));

    this.http.get(`http://localhost:3000/aluno/${this.idAluno}`).subscribe({
      next: (data: any) => {
        this.aluno = data;
        this.diarios = data.diarios || [];
      },
      error(err) {
        console.error('Erro ao buscar aluno: ', err)
      },
    });
  }
}
