import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse, Funcionario } from '../interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  public user: Funcionario | null = null;

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, senha });
  }

  setUser(user: Funcionario, token: string) {
    this.user = user;
    localStorage.setItem('accessToken', token);
  }

  requestPasswordReset(email: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/recuperar-senha`, { email });
  }

  verificaToken(token: string, tipoToken: any = {}): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/verifica-token`, { token, tipoToken });
  }

  alterarSenhaComToken(token: string, novaSenha: string, confirmarNovaSenha: string): Observable<void> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post<void>(
      `${this.apiUrl}/alterar-senha`,
      { novaSenha, confirmarNovaSenha },
      { headers }
    );
  }

  isAuthenticated(): boolean {
    return !!this.user && !!localStorage.getItem('accessToken');
  }

  isAdmin(): boolean {
    return this.user?.perfil === 'Administrador';
  }
}
