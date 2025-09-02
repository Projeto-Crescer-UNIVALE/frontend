import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  alunosAtivos: number = 0;
  oficinasAtivas: number = 0;
  usuariosAtivos: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarDashboard();
  }

  carregarDashboard() {
    this.http.get<any>('http://localhost:3000/dashboard')
      .subscribe({
        next: (res) => {
          this.alunosAtivos = res.alunos;
          this.oficinasAtivas = res.oficinas;
          this.usuariosAtivos = res.usuarios;
        },
        error: (err) => console.error('Erro ao carregar dados do dashboard', err)
      });
  }
}
