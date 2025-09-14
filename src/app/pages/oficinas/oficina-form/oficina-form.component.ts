import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

type Dia = {
  nome: string;
  key: string;
  checked: boolean;
  inicio?: string;
  fim?: string;
  bloqueado?: boolean; 
};

@Component({
  selector: 'app-oficina-form',
  standalone: true,

  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './oficina-form.component.html',
  styleUrls: ['./oficina-form.component.css']
})
export class OficinaFormComponent {
  id: string | null;
  titulo: string;


  readonly form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    professor: new FormControl('', [Validators.required])
  });

  dias: Dia[] = [
    { nome: 'Domingo', key: 'dom', checked: true, inicio: '00:00', fim: '00:00' },
    { nome: 'Segunda-feira', key: 'seg', checked: false, bloqueado: true },
    { nome: 'Terça-feira', key: 'ter', checked: false, bloqueado: true },
    { nome: 'Quarta-feira', key: 'qua', checked: false, bloqueado: true },
    { nome: 'Quinta-feira', key: 'qui', checked: false, bloqueado: true },
    { nome: 'Sexta-feira', key: 'sex', checked: false, bloqueado: true },
    { nome: 'Sábado', key: 'sab', checked: false, bloqueado: true },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.titulo = this.id ? 'Editar oficina' : 'Adicionar nova oficina';

  
    if (this.id) {
      this.form.patchValue({
        nome: 'Oficina de Música',
        professor: 'João da Silva'
      });
    }
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const oficina = {
      ...this.form.value,
      dias: this.dias 
    };

    if (this.id) {
      console.log('Atualizando oficina:', oficina);
    } else {
      console.log('Criando nova oficina:', oficina);
    }

    this.router.navigate(['/oficinas']); 
  }

  cancelar() {
    this.router.navigate(['/oficinas']);
  }
}
