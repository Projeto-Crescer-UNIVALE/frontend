import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { AlunoService } from '../../../core/sevices/aluno.service';
import { OficinaService } from '../../../core/sevices/oficina.service';
import { ProgramaSocialService } from '../../../core/sevices/programa-social.service';

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
    programaSocial: new FormControl([], { validators: [Validators.required, this.arrayNotEmpty], nonNullable: true }),
    oficinas: new FormControl([], { validators: [Validators.required, this.arrayNotEmpty], nonNullable: true }),
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
    this.carregarOficinas();
    this.carregarProgramasSociais();


    this.id = this.route.snapshot.paramMap.get('id') !== 'novo' ? Number(this.route.snapshot.paramMap.get('id')) : undefined;

    if (this.id) {
      this.alunoService.getAlunos().subscribe({
        next: (alunos) => {
          const aluno = alunos.find((a: any) => a.id === this.id);
          if (aluno) {
            if (aluno.data_nascimento) {
              const date = new Date(aluno.data_nascimento);
              aluno.data_nascimento = date.toISOString().split('T')[0];
            }

            if (aluno.oficinas && Array.isArray(aluno.oficinas)) {
              aluno.oficinas = aluno.oficinas
                .filter((o: any) => o.ativo)
                .map((o: any) => o.id_oficina);
            }

            if (aluno.programaSocial && Array.isArray(aluno.programaSocial)) {
              aluno.programaSocial = aluno.programaSocial.map((p: any) => p.id_programa_social);
            }
            this.form.patchValue(aluno);
          }
        },
        error: (err) => console.error('Erro ao carregar aluno: ', err),
      });
    }
  }

  carregarOficinas() {
    this.oficinaService.getOficinas().subscribe({
      next: (response) => {
        // A API retorna paginação, então pegamos os dados
        this.oficinasDisponiveis = response.data || response;
        console.log('Oficinas carregadas:', this.oficinasDisponiveis);
      },
      error: (err) => console.error('Erro ao carregar oficinas: ', err)
    });
  }

  carregarProgramasSociais() {
    this.programaSocialService.getProgramasSociais().subscribe({
      next: (response) => {
        // A API pode retornar paginação, então pegamos os dados
        this.programasSociaisDisponiveis = response.data || response;
        console.log('Programas sociais carregados:', this.programasSociaisDisponiveis);
      },
      error: (err) => console.error('Erro ao carregar programas sociais: ', err)
    });
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

    formValue.programaSocial = Array.isArray(formValue.programaSocial)
      ? formValue.programaSocial.map((v: any) => parseInt(v, 10))
      : [];

    formValue.oficinas = Array.isArray(formValue.oficinas)
      ? formValue.oficinas.map((v: any) => parseInt(v, 10))
      : [];

    formValue.alergias = formValue.alergias || '';
    formValue.necessidades_especiais = formValue.necessidades_especiais || '';
    formValue.medicamentos = formValue.medicamentos || '';

    console.log('Dados depois da transformação:', JSON.stringify(formValue, null, 2));

    if (this.id) {
      this.alunoService.updateAluno(this.id, formValue).subscribe({
        next: () => this.router.navigate(['/alunos']),
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
        next: () => this.router.navigate(['/alunos']),
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
