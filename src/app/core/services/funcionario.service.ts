import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private apiUrl = `${environment.apiUrl}/funcionario`;

  constructor(private http: HttpClient) {}

  getFuncionarios(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getFuncionarioById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createFuncionario(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateFuncionario(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteFuncionario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getProfessores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/listar/professores`);
  }
}
