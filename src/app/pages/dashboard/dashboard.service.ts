import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // deixa o service disponível em toda a aplicação
})
export class DashboardService {
  private apiUrl = 'http://localhost:3306/dashboard'; 
  // 🔗 coloque aqui a URL da sua API backend

  constructor(private http: HttpClient) {}

  // Método que busca os dados do backend
  getDashboardData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
