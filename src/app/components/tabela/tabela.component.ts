import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, input, OnInit, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, take } from 'rxjs';

export interface Coluna {
  campo: string;   // chave no objeto de dados (ex.: 'nome', 'cpf', 'email')
  nome: string;    // rótulo que aparece no TH
  width?: string;  // opcional (ex.: '180px')
}

@Component({
  selector: 'app-tabela',
  standalone: true,
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css'],
})

export class TabelaComponent implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef)

  endpoint = input.required<string>();
  colunas = input<Coluna[]>([]);
  textoVisualizar = input<string>('Visualizar');
  textoDeletar    = input<string>('Deletar');

  dados = signal<any[]>([]); // SIGNAL para dados

  get termoPesquisa() {
    return this.activatedRoute.snapshot.queryParams['search'] || '';
  }

  acaoPrimaria  = output<any>(); // visualizar
  acaoSecundaria = output<any>(); // deletar

  ngOnInit() {
    this.activatedRoute.queryParams.pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef)).subscribe((queryParams) => {
      const search = queryParams['search'] || '';
      this.termoPesquisa.set(search);
      this.carregarDados(search);
    })
  }

  private carregarDados(search: string = '') {
    const url = search ? `${this.endpoint()}?search=${encodeURIComponent(search)}` : this.endpoint();

    this.http.get<any[]>(url).pipe(take(1)).subscribe(response => {
      this.dados.set(response);
    });
  }

  onPesquisar(event: Event) {
    const input = event.target as HTMLInputElement;
    const valorPesquisa = input.value;

    this.router.navigate([], {
      queryParams: { search: valorPesquisa },
      queryParamsHandling: 'merge'
    });
  }

  onVisualizar(linha: any) {
    this.acaoPrimaria.emit(linha);
  }

  onDeletar(linha: any) {
    this.acaoSecundaria.emit(linha);
  }
}
