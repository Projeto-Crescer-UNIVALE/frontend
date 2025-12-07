import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DiarioService } from '../../../core/services/diario.service';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-diario-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './diario-form.component.html',
  styleUrls: ['./diario-form.component.css']
})
export class DiarioFormComponent implements OnInit {
  idAluno!: number;
  idDiario?: number;
  aluno: any;
  diario: any;
  carregando = true;
  oficinasDisponiveis: any[] = [];

  form = new FormGroup({
    id_oficina: new FormControl<number | null>(null, Validators.required),
    conteudo: new FormControl('', [Validators.required, Validators.maxLength(300)])
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private diarioService: DiarioService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Pega o ID do aluno da rota pai
    this.idAluno = Number(this.route.parent?.snapshot.paramMap.get('id'));

    // Verifica se é edição (tem idDiario) ou criação (rota 'novo')
    const idDiarioParam = this.route.snapshot.paramMap.get('idDiario');
    if (idDiarioParam && idDiarioParam !== 'novo') {
      this.idDiario = Number(idDiarioParam);
    }

    // Pega dados do resolver do pai (aluno, oficinas e programas)
    const dados = this.route.parent?.snapshot.data['dados'];
    console.log('Dados do resolver:', dados);

    if (dados) {
      this.aluno = dados.aluno;

        // Pega as oficinas do aluno se existirem
      if (dados.aluno && dados.aluno.oficinas && Array.isArray(dados.aluno.oficinas)) {
        this.oficinasDisponiveis = dados.aluno.oficinas
          .filter((o: any) => o.ativo)
          .map((o: any) => ({
            ...o.oficina,
            id_oficina: o.id_oficina
          }));
        console.log('Oficinas do aluno (filtradas):', this.oficinasDisponiveis);
      } else {
        console.warn('Aluno não tem oficinas vinculadas');
        this.oficinasDisponiveis = [];
      }
    }

    // Se não tiver dados do resolver ou oficinas vazias, carrega manualmente
    if (!dados || !this.aluno) {
      console.log('Carregando aluno manualmente...');
      this.carregarAluno();
    }

    if (!dados || this.oficinasDisponiveis.length === 0) {
      console.log('Carregando oficinas manualmente...');
      this.carregarOficinas();
    }

    // Se está editando, carregar dados do diário
    if (this.idDiario) {
      this.carregarDiario();
    } else {
      this.carregando = false;
    }
  }

  private carregarOficinas(): void {
    // Carrega o aluno para pegar suas oficinas
    this.http.get(`${environment.apiUrl}/aluno/${this.idAluno}`).subscribe({
      next: (response: any) => {
        if (response && response.oficinas && Array.isArray(response.oficinas)) {
          this.oficinasDisponiveis = response.oficinas
            .filter((o: any) => o.ativo)
            .map((o: any) => ({
              ...o.oficina,
              id_oficina: o.id_oficina
            }));
        } else {
          console.warn('Aluno não tem oficinas vinculadas');
          this.oficinasDisponiveis = [];
        }
        console.log('Oficinas do aluno carregadas:', this.oficinasDisponiveis);
      },
      error: (err) => {
        console.error('Erro ao carregar oficinas do aluno:', err);
        this.oficinasDisponiveis = [];
      }
    });
  }

  private carregarAluno(): void {
    this.http.get(`${environment.apiUrl}/aluno/${this.idAluno}`).subscribe({
      next: (data: any) => {
        this.aluno = data;
      },
      error: (err) => {
        console.error('Erro ao carregar aluno:', err);
        alert('Erro ao carregar dados do aluno');
        this.router.navigate(['/painel/alunos']);
      }
    });
  }

  private carregarDiario(): void {
    this.diarioService.getDiario(this.idAluno, this.idDiario!).subscribe({
      next: (diario: any) => {
        this.diario = diario;
        this.form.patchValue({
          id_oficina: diario.id_oficina,
          conteudo: diario.conteudo
        });
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar diário:', err);
        alert('Erro ao carregar registro do diário');
        this.cancelar();
      }
    });
  }

  get caracteresRestantes(): number {
    return 300 - (this.form.get('conteudo')?.value?.length || 0);
  }

  get isEdicao(): boolean {
    return !!this.idDiario;
  }

  salvar(): void {
    if (this.form.invalid) {
      // Marca todos os campos como tocados para mostrar os erros
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const funcionario = this.authService.getUser();
    if (!funcionario) {
      alert('Erro: Usuário não está autenticado');
      return;
    }

    const dados = {
      id_oficina: Number(this.form.value.id_oficina),
      id_autor: funcionario.id,
      conteudo: this.form.value.conteudo!
    };

    const requisicao = this.isEdicao
      ? this.diarioService.updateDiario(this.idAluno, this.idDiario!, dados)
      : this.diarioService.createDiario(this.idAluno, dados as any);

    requisicao.subscribe({
      next: () => {
        alert(this.isEdicao ? 'Registro atualizado com sucesso!' : 'Registro criado com sucesso!');
        this.router.navigate(['/painel/alunos', this.idAluno, 'diario']);
      },
      error: (err) => {
        console.error('Erro ao salvar diário:', err);
        console.error('Detalhes do erro:', err.error);
        console.error('Mensagens de erro:', err.error.message);
        const mensagem = Array.isArray(err.error.message)
          ? err.error.message.join(', ')
          : err.error.message;
        alert(`Erro ao salvar registro: ${mensagem}`);
      }
    });
  }

  deletar(): void {
    if (!this.isEdicao) {
      return;
    }

    if (confirm('Tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita.')) {
      this.diarioService.deleteDiario(this.idAluno, this.idDiario!).subscribe({
        next: () => {
          alert('Registro excluído com sucesso!');
          this.router.navigate(['/painel/alunos', this.idAluno, 'diario']);
        },
        error: (err) => {
          console.error('Erro ao deletar:', err);
          alert('Erro ao excluir registro. Tente novamente.');
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/painel/alunos', this.idAluno, 'diario']);
  }
}
