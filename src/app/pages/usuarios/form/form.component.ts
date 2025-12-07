import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { FuncionarioService } from '../../../core/services/funcionario.service';
import { Funcionario } from '../../../core/interface';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  readonly form = new FormGroup({
    nome: new FormControl('', { validators: [Validators.required, Validators.minLength(2), Validators.maxLength(250)], nonNullable: true }),
    email: new FormControl('', { validators: [Validators.required, Validators.maxLength(60)], nonNullable: true}),
    telefone: new FormControl('', { validators: [Validators.required, Validators.maxLength(15)], nonNullable: true}),
    ativo: new FormControl(true, { validators: [Validators.required], nonNullable: true}),
    perfil: new FormControl<'Administrador' | 'Professor'>('Professor', { validators: [Validators.required], nonNullable: true})
  })

  titulo: string = 'Cadastrar Usuário';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private funcionarioService: FuncionarioService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam && idParam !== 'novo') {
      const id = Number(idParam);
      this.titulo = 'Editar Usuário';
      this.carregarUsuario(id);
    }
  }

  private carregarUsuario(id: number) {
    this.funcionarioService.getFuncionarioById(id).subscribe({
      next: (funcionario) => {
        this.form.patchValue({
          nome: funcionario.nome,
          email: funcionario.email,
          telefone: funcionario.telefone,
          ativo: funcionario.ativo,
          perfil: funcionario.perfil
        });
      },
      error: (erro) => {
        console.error('Erro ao carregar usuário:', erro);
        alert('Erro ao carregar dados do usuário');
        this.router.navigate(['/painel/usuarios']);
      }
    });
  }

  salvar() {
    if (this.form.valid) {
      const formValue = this.form.value;
      const dados = {
        nome: formValue.nome,
        email: formValue.email,
        telefone: formValue.telefone,
        ativo: formValue.ativo,
        id_perfil: formValue.perfil === 'Administrador' ? 1 : 2
      };
      const idParam = this.route.snapshot.paramMap.get('id');

      const request = idParam && idParam !== 'novo'
        ? this.funcionarioService.updateFuncionario(Number(idParam), dados)
        : this.funcionarioService.createFuncionario(dados);

      request.subscribe({
        next: () => {
          alert(idParam && idParam !== 'novo'
            ? 'Usuário atualizado com sucesso!'
            : 'Usuário criado com sucesso! Um email foi enviado com as instruções de acesso.');
          this.router.navigate(['/painel/usuarios']);
        },
        error: (erro: any) => {
          console.error('Erro ao salvar usuário:', erro);
          const mensagem = erro.error?.message || 'Erro ao salvar usuário';
          alert(mensagem);
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/usuarios']);
  }
}
