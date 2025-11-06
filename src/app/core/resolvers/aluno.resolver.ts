import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AlunoService } from '../services/aluno.service';
import { OficinaService } from '../services/oficina.service';
import { ProgramaSocialService } from '../services/programa-social.service';

@Injectable({ providedIn: 'root' })
export class AlunoResolver implements Resolve<any> {
  constructor(
    private alunoService: AlunoService,
    private oficinaService: OficinaService,
    private programaSocialService: ProgramaSocialService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.paramMap.get('id');

    const oficinas$ = this.oficinaService.getOficinas().pipe(map((r: any) => r.data || r));
    const programas$ = this.programaSocialService.getProgramasSociais().pipe(map((r: any) => r.data || r));

    if (id === 'novo') {
      return forkJoin({
        aluno: of(null),
        oficinas: oficinas$,
        programas: programas$,
      });
    }

    return forkJoin({
      aluno: this.alunoService.getAlunoById(Number(id)).pipe(catchError(() => of(null))),
      oficinas: oficinas$,
      programas: programas$,
    });
  }
}
