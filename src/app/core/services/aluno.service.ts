import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthResponse } from "../interface";

@Injectable({ providedIn: 'root' })
export class AlunoService {
  private readonly apiUrl = 'http://localhost:3000/aluno';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const data = localStorage.getItem('pcrescer_data');

    if (!data) {
      throw new Error('Usuário não autenticado.');
    }

    const { accessToken } = JSON.parse(data) as AuthResponse;
    return new HttpHeaders({ Authorization: `Bearer ${accessToken}` });
  }

  createAluno(aluno: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(this.apiUrl, aluno, { headers });
  }

  updateAluno(id: number, aluno: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${id}`, aluno, { headers })
  };

  getAlunos(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  getAlunoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deleteAluno(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
