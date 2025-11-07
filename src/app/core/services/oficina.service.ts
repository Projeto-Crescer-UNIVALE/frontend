import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OficinaService {
  private apiUrl = `${environment.apiUrl}/oficina`;

  constructor(private http: HttpClient) {}

  getOficinas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getOficinaById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createOficina(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateOficina(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteOficina(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
