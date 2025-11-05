import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OficinaService {
  private apiUrl = 'http://localhost:3000/oficina';

  constructor(private http: HttpClient) {}

  getOficinas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getOficinaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
