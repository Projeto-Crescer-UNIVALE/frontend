import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-alunos-form',
  templateUrl: './alunos-form.component.html',
  styleUrls: ['./alunos-form.component.css'],
  imports:[CommonModule, ReactiveFormsModule, NgxMaskDirective, RouterModule],
  standalone: true
})
export class AlunosFormComponent implements OnInit {
  id?: number;

  readonly form = new FormGroup({
    nome: new FormControl('', { validators: [Validators.required, Validators.minLength(2), Validators.maxLength(250)], nonNullable:true }),
    cpf: new FormControl('', { validators: [Validators.required], nonNullable:true }),
    rg: new FormControl('', { validators: [Validators.required, Validators.minLength(2), Validators.maxLength(250)], nonNullable:true }),
    data_nascimento: new FormControl(''),
    nis: new FormControl('',{ validators: [Validators.required, Validators.minLength(11), Validators.maxLength(11)], nonNullable:true }),
    cep: new FormControl(''),
    rua: new FormControl('',{ validators: [Validators.required, Validators.minLength(1), Validators.maxLength(80)], nonNullable:true }),
    bairro: new FormControl('',{ validators: [Validators.required, Validators.minLength(1), Validators.maxLength(30)], nonNullable:true }),
    numero_casa: new FormControl('',{ validators: [Validators.required, Validators.minLength(1), Validators.maxLength(5)], nonNullable:true }),
    nome_mae: new FormControl('',{ validators: [Validators.required, Validators.minLength(2), Validators.maxLength(250)], nonNullable:true }),
    telefone: new FormControl('',{ validators: [Validators.required], nonNullable:true }),
    grupo_scfv: new FormControl('0', { validators: [Validators.required], nonNullable:true }),
    situacao_escolar: new FormControl('0',{ validators: [Validators.required], nonNullable:true }),
    programaSocial: new FormControl([],{ validators: [Validators.required], nonNullable:true }),
    alergias: new FormControl('',{ validators: [ Validators.minLength(0), Validators.maxLength(100)], nonNullable:true }),
    necessidades_especiais: new FormControl('',{ validators: [ Validators.minLength(0), Validators.maxLength(120)], nonNullable:true }),
    medicamentos: new FormControl('', { validators: [ Validators.minLength(0), Validators.maxLength(200)], nonNullable:true }),
    ativo: new FormControl(true, { validators: [Validators.required], nonNullable:true }),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
     
    }
  }

  salvar() {
    if (this.form.invalid) return;

    if (this.id) {
      // editar aluno
      console.log('Editando aluno', this.form.value);
    } else {
      // criar aluno
      console.log('Criando aluno', this.form.value);
    }

    this.router.navigate(['/alunos']);
  }
}
