import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { AuthService } from '../../core/sevices/auth.service';
import { environment } from '../../../environments/environment';

interface DashboardInterface {
 alunosAtivos: number,
 oficinasAtivas: number,
 usuariosAtivos: number,
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private readonly authService = inject(AuthService);

  readonly dados = signal({
    alunosAtivos: 0,
    oficinasAtivas: 0,
    usuariosAtivos: 0,
  })

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarDashboard();
  }

  carregarDashboard() {
    this.http.get<DashboardInterface>(`${environment.apiUrl}/dashboard`)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.dados.set({
            alunosAtivos: res.alunosAtivos,
            oficinasAtivas: res.oficinasAtivas,
            usuariosAtivos: res.usuariosAtivos,
          })
        },
        error: (err) => console.error('Erro ao carregar dados do dashboard', err)
      });
  };

  get user() {
    return this.authService.getUser();
  };
}
