import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { max } from 'rxjs';
import { NgxMaskDirective } from 'ngx-mask';

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
    id_perfil: new FormControl(1, { validators: [Validators.required], nonNullable: true})
  })
  
  titulo: string = 'Cadastrar Usuário';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    

    // this.id = Number(this.route.snapshot.paramMap.get('id'));

    // if (this.id) {
    //   this.titulo = 'Editar Usuário';
    //   // Aqui buscaria no backend pelo ID
    //   this.form.patchValue({
    //     nome: 'Usuário Teste',
    //     telefone: '11999999999',
    //     email: 'teste@email.com',
    //     tipo: 'Professor',
    //     status: 'Ativo'
    //   });
    // }
  }

  salvar() {
    // if (this.form.valid) {
    //   if (this.id) {
    //     console.log('Atualizando usuário:', this.form.value);
    //   } else {
    //     console.log('Criando usuário:', this.form.value);
    //   }
    //   this.router.navigate(['/usuarios']);
    // }
  }

  cancelar() {
    this.router.navigate(['/usuarios']);
  }
}
