import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse, Funcionario } from '../interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  public user: Funcionario | null = null;

  constructor(private http: HttpClient) {
    if (!this.user) {
      const userData = localStorage.getItem('pcrescer_data');
      if (userData) {
        const { funcionario } = JSON.parse(userData) as AuthResponse;

        this.user = funcionario;
      }
    }
  }

  login(email: string, senha: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, senha });
  }

  setLoginData(data: AuthResponse) {
    this.user = data.funcionario;
    localStorage.setItem('pcrescer_data', JSON.stringify({ funcionario: data.funcionario, accessToken: data.accessToken, expiresAt: data.expiresAt }))
  }

  getUser(): Funcionario | null {
    return this.user;
  }

  logout() {
    this.user = null;
    localStorage.removeItem('pcrescer_data');
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
    const data = localStorage.getItem('pcrescer_data');
    if (!data) { return false };

    const { accessToken, funcionario } = JSON.parse(data) as AuthResponse;

    return !!accessToken && !!funcionario;
  }

  isAdmin(): boolean {
    return this.getUser()?.perfil === 'Administrador';
  }
}
