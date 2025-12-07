import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { AlunoService } from '../../../core/services/aluno.service';
import { OficinaService } from '../../../core/services/oficina.service';
import { ProgramaSocialService } from '../../../core/services/programa-social.service';

@Component({
  selector: 'app-alunos-form',
  templateUrl: './alunos-form.component.html',
  styleUrls: ['./alunos-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, RouterModule],
  standalone: true
})
export class AlunosFormComponent implements OnInit {
  id?: number;
  oficinasDisponiveis: any[] = [];
  programasSociaisDisponiveis: any[] = [];

  readonly form = new FormGroup({
    nome: new FormControl('', { validators: [Validators.required, Validators.minLength(2), Validators.maxLength(250)], nonNullable: true }),
    cpf: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    rg: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    data_nascimento: new FormControl(null, { validators: [Validators.required], nonNullable: false }),
    nis: new FormControl('', { validators: [Validators.required, Validators.minLength(11), Validators.maxLength(11)], nonNullable: true }),
    cep: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    rua: new FormControl('', { validators: [Validators.required, Validators.minLength(1), Validators.maxLength(80)], nonNullable: true }),
    bairro: new FormControl('', { validators: [Validators.required, Validators.minLength(1), Validators.maxLength(30)], nonNullable: true }),
    numero_casa: new FormControl('', { validators: [Validators.required, Validators.minLength(1), Validators.maxLength(5)], nonNullable: true }),
    nome_mae: new FormControl('', { validators: [Validators.required, Validators.minLength(2), Validators.maxLength(250)], nonNullable: true }),
    telefone: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    grupo_scfv: new FormControl('0', { validators: [Validators.required], nonNullable: true }),
    situacao_escolar: new FormControl('0', { validators: [Validators.required], nonNullable: true }),
    programaSocial: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    oficinas: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    alergias: new FormControl('', { validators: [Validators.maxLength(100)], nonNullable: true }),
    necessidades_especiais: new FormControl('', { validators: [Validators.maxLength(120)], nonNullable: true }),
    medicamentos: new FormControl('', { validators: [Validators.maxLength(200)], nonNullable: true }),
    ativo: new FormControl(true, { validators: [Validators.required], nonNullable: true }),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alunoService: AlunoService,
    private oficinaService: OficinaService,
    private programaSocialService: ProgramaSocialService

  ) { }

  ngOnInit() {
    const dados = this.route.snapshot.data['dados'];
    console.log('Dados completos:', dados);

    this.oficinasDisponiveis = dados.oficinas;
    this.programasSociaisDisponiveis = dados.programas;

    const aluno = dados.aluno;
    console.log('Dados do aluno:', aluno);
    console.log('Programa social do aluno:', aluno?.programaSocial);

    // Verifica se o ID vem do aluno ou da URL
    if (aluno && aluno.id_aluno) {
      this.id = aluno.id_aluno;
    } else if (this.route.snapshot.paramMap.get('id') !== 'novo') {
      this.id = Number(this.route.snapshot.paramMap.get('id'));
    }

    if (aluno) {
      if (aluno.data_nascimento) {
        const date = new Date(aluno.data_nascimento);
        aluno.data_nascimento = date.toISOString().split('T')[0];
      }

      if (aluno.oficinas && Array.isArray(aluno.oficinas)) {
        aluno.oficinas = aluno.oficinas.filter((o: any) => o.ativo).map((o: any) => o.id_oficina);
      }

      if (aluno.programaSocial) {
        console.log('Tipo do programaSocial:', typeof aluno.programaSocial);

        // Se vier como array de objetos
        if (Array.isArray(aluno.programaSocial)) {
          console.log('ProgramaSocial é um array:', aluno.programaSocial);
          if (aluno.programaSocial.length > 0) {
            const program = aluno.programaSocial[0];
            // Verifica se é um objeto com id_programa_social ou apenas um ID
            const programId = typeof program === 'object' ? program.id_programa_social : program;
            aluno.programaSocial = programId;
            console.log('ID do programa extraído:', programId);
          }
        }
        // Se vier como objeto único
        else if (typeof aluno.programaSocial === 'object') {
          console.log('ProgramaSocial é um objeto:', aluno.programaSocial);
          aluno.programaSocial = aluno.programaSocial.id_programa_social;
        }
        // Se já vier como ID
        else {
          console.log('ProgramaSocial é um valor primitivo:', aluno.programaSocial);
          aluno.programaSocial = Number(aluno.programaSocial);
        }
      } else {
        aluno.programaSocial = '';
      }

      console.log('Valor final do programaSocial:', aluno.programaSocial);

      this.form.patchValue(aluno);
    }
  }

  private arrayNotEmpty(control: FormControl): ValidationErrors | null {
    return control.value && control.value.length > 0 ? null : { 'arrayEmpty': true };
  }

  salvar() {
    if (this.form.invalid) {
      console.error('Formulário inválido');
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control?.invalid) {
          console.error(`Campo inválido: ${key}`, control.errors);
        }
      });
      return;
    }

    const formValue = { ...this.form.value } as any;

    console.log('Dados antes da transformação:', JSON.stringify(formValue, null, 2));

    if (formValue.data_nascimento) {
      formValue.data_nascimento = new Date(formValue.data_nascimento);
    }

    if (formValue.cpf) {
      formValue.cpf = formValue.cpf.replace(/\D/g, '');
      if (formValue.cpf.length !== 11) {
        console.error('CPF deve ter exatamente 11 dígitos');
        return;
      }
    }

    if (formValue.rg) {
      formValue.rg = formValue.rg.replace(/\D/g, '');
      console.log('RG após remover máscara:', formValue.rg, 'Tamanho:', formValue.rg.length);
      if (formValue.rg.length < 7 || formValue.rg.length > 11) {
        console.error('RG deve ter entre 7 e 11 dígitos');
        return;
      }
    }

    if (formValue.nis) {
      formValue.nis = formValue.nis.replace(/\D/g, '');
      if (formValue.nis.length !== 11) {
        console.error('NIS deve ter exatamente 11 dígitos');
        return;
      }
    }

    if (formValue.cep) {
      formValue.cep = formValue.cep.replace(/\D/g, '');
      if (formValue.cep.length !== 8) {
        console.error('CEP deve ter exatamente 8 dígitos');
        return;
      }
    }

    if (formValue.telefone) {
      formValue.telefone = formValue.telefone.replace(/\D/g, '');
      if (formValue.telefone.length < 1 || formValue.telefone.length > 15) {
        console.error('Telefone deve ter entre 1 e 15 caracteres');
        return;
      }
    }

    formValue.grupo_scfv = parseInt(formValue.grupo_scfv, 10);
    formValue.situacao_escolar = parseInt(formValue.situacao_escolar, 10);

    // Converte os valores para arrays com um único item
    formValue.programaSocial = formValue.programaSocial ? [parseInt(formValue.programaSocial, 10)] : [];
    formValue.oficinas = formValue.oficinas ? [parseInt(formValue.oficinas, 10)] : [];

    formValue.alergias = formValue.alergias || '';
    formValue.necessidades_especiais = formValue.necessidades_especiais || '';
    formValue.medicamentos = formValue.medicamentos || '';

    console.log('Dados depois da transformação:', JSON.stringify(formValue, null, 2));

    if (this.id) {
      this.alunoService.updateAluno(this.id, formValue).subscribe({
        next: () => this.router.navigate(['/painel/alunos']),
        error: (err) => {
          console.error('Erro ao atualizar aluno: ', err);
          console.error('Erro completo:', JSON.stringify(err.error, null, 2));
          if (err.error && err.error.message) {
            console.error('Mensagem do backend:', err.error.message);
          }
        }
      });
    } else {
      this.alunoService.createAluno(formValue).subscribe({
        next: () => this.router.navigate(['/painel/alunos']),
        error: (err) => {
          console.error('Erro ao criar aluno: ', err);
          console.error('Erro completo:', JSON.stringify(err.error, null, 2));
          if (err.error && err.error.message) {
            console.error('Mensagem do backend:', err.error.message);
          }
        }
      });
    }
  }
}
