import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adicionar-oficina',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-oficina.component.html',
})
export class CadastroOficinaComponent {
  form: FormGroup;
  professores = [
    { id: 1, nome: 'João' },
    { id: 2, nome: 'Maria' },
  ];

  dias = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: [''],
      professor: [''],
      dias: [[]],
      horaInicio: [''],
      horaFim: [''],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);

    }
  }
}
