import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Diario {
  id_diario?: number;
  id_aluno: number;
  id_oficina: number | null;
  id_autor: number;
  conteudo: string;
  criado_em?: Date;
  atualizado_em?: Date;
  autor?: {
    nome: string;
    id_funcionario: number;
  };
  oficina?: {
    nome: string;
    id_oficina: number;
  };
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DiarioService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Buscar todos os diários de um aluno
  getDiariosByAluno(idAluno: number, query?: PaginationQuery): Observable<any> {
    let params = new HttpParams();

    if (query?.page) {
      params = params.set('page', query.page.toString());
    }
    if (query?.limit) {
      params = params.set('limit', query.limit.toString());
    }
    if (query?.search) {
      params = params.set('search', query.search);
    }

    return this.http.get<any>(`${this.apiUrl}/aluno/${idAluno}/diario`, { params });
  }

  // Buscar um diário específico
  getDiario(idAluno: number, idDiario: number): Observable<Diario> {
    return this.http.get<Diario>(`${this.apiUrl}/aluno/${idAluno}/diario/${idDiario}`);
  }

  // Criar novo diário
  createDiario(idAluno: number, diario: Omit<Diario, 'id_diario' | 'id_aluno'>): Observable<Diario> {
    return this.http.post<Diario>(`${this.apiUrl}/aluno/${idAluno}/diario`, diario);
  }

  // Atualizar diário existente
  updateDiario(idAluno: number, idDiario: number, diario: Partial<Diario>): Observable<Diario> {
    return this.http.put<Diario>(`${this.apiUrl}/aluno/${idAluno}/diario/${idDiario}`, diario);
  }

  // Deletar diário
  deleteDiario(idAluno: number, idDiario: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/aluno/${idAluno}/diario/${idDiario}`);
  }
}
