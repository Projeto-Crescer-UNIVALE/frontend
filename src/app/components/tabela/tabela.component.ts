import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, input, OnInit, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { distinctUntilChanged, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

export interface Coluna {
  campo: string;   // chave no objeto de dados (ex.: 'nome', 'cpf', 'email')
  nome: string;    // rótulo que aparece no TH
  width?: string;  // opcional (ex.: '180px')
}

export interface ResultadoPaginado {
  data: any[];
  meta: {
    total: number,
    lastPage: number,
    currentPage: number,
    perPage: number,
    prev: number,
    next: number
  }
}

@Component({
  selector: 'app-tabela',
  standalone: true,
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css'],
  imports: [CommonModule, RouterLink],
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
  campoIdentificador = input.required<string>();

  dados = signal<any[]>([]); // SIGNAL para dados

  paginacao = signal<ResultadoPaginado['meta']>({
    total: 0,
    lastPage: 0,
    currentPage: 0,
    perPage: 0,
    prev: 0,
    next: 0,
  })

  get termoPesquisa() {
    return this.activatedRoute.snapshot.queryParams['search'] || '';
  }

  acaoPrimaria  = output<any>(); // visualizar
  acaoSecundaria = output<any>(); // deletar

  ngOnInit() {
    // Adiciona listener para recarregar dados
    const element = document.querySelector('app-tabela');
    if (element) {
      element.addEventListener('reloadData', () => {
        const search = this.activatedRoute.snapshot.queryParams['search'] || '';
        const pagina = this.activatedRoute.snapshot.queryParams['page'] || 1;
        this.carregarDados(search, pagina);
      });
    }

    this.activatedRoute.queryParams.pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef)).subscribe((queryParams) => {
      const search = queryParams['search'] || '';
      const pagina = queryParams['page'] || 1;
      this.carregarDados(search, pagina);
    })
  }

  private carregarDados(search: string = '', pagina: number = 1) {
    const url = search ? `${this.endpoint()}?search=${encodeURIComponent(search)}&page=${pagina}` : `${this.endpoint()}?page=${pagina}`;

    this.http.get<ResultadoPaginado>(`${environment.apiUrl}/${url}`).pipe(take(1)).subscribe(response => {
      // Filtra apenas os registros ativos
      const dadosFiltrados = response.data.filter((item: any) => item.ativo !== false);
      this.dados.set(dadosFiltrados);

      // Atualiza a paginação considerando apenas os itens ativos
      this.paginacao.set({
        ...response.meta,
        total: dadosFiltrados.length,
        lastPage: Math.ceil(dadosFiltrados.length / response.meta.perPage)
      });
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

  alterarPagina(pagina: number) {
    this.router.navigate([], {
      queryParams: { page: pagina },
      queryParamsHandling: 'merge'
    });
  }

  getColumnValue(linha: any, campo: string): any {
    const campos = campo.split('.');
    let valor = linha;

    for (const c of campos) {
      if (valor && c in valor) {
        valor = valor[c];
      } else {
        return null;
      }
    }

    return valor;
  }
}
