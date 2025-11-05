import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramaSocialService {
  private apiUrl = 'http://localhost:3000/programa-social';

  constructor(private http: HttpClient) { }

  getProgramasSociais(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
