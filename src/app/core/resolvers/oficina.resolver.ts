import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { OficinaService } from '../services/oficina.service';
import { FuncionarioService } from '../services/funcionario.service';

@Injectable({ providedIn: 'root' })
export class OficinaResolver implements Resolve<any> {
  constructor(
    private oficinaService: OficinaService,
    private funcionarioService: FuncionarioService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');

    // Busca os professores que têm perfil "Professor"
    const professores$ = this.funcionarioService.getProfessores().pipe(
      map((r: any) => r.data || r),
      catchError(() => of([]))
    );

    // Se for "novo", só retorna professores (sem oficina)
    if (id === 'novo') {
      return forkJoin({
        oficina: of(null),
        professores: professores$,
      });
    }

    // Se for edição, busca oficina + professores
    return forkJoin({
      oficina: this.oficinaService.getOficinaById(Number(id)).pipe(
        catchError(() => of(null))
      ),
      professores: professores$,
    });
  }
}
