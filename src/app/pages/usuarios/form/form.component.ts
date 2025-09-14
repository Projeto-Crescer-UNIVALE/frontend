import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  id: number | null = null;
  titulo: string = 'Cadastrar Usuário';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [''],
      telefone: [''],
      email: [''],
      tipo: [''],
      status: ['Ativo']
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.titulo = 'Editar Usuário';
      // Aqui buscaria no backend pelo ID
      this.form.patchValue({
        nome: 'Usuário Teste',
        telefone: '11999999999',
        email: 'teste@email.com',
        tipo: 'Professor',
        status: 'Ativo'
      });
    }
  }

  salvar() {
    if (this.form.valid) {
      if (this.id) {
        console.log('Atualizando usuário:', this.form.value);
      } else {
        console.log('Criando usuário:', this.form.value);
      }
      this.router.navigate(['/usuarios']);
    }
  }

  cancelar() {
    this.router.navigate(['/usuarios']);
  }
}
