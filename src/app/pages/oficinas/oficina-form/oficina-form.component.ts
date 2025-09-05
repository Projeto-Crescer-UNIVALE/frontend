import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

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
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './oficina-form.component.html',
  styleUrls: ['./oficina-form.component.css']
})
export class OficinaFormComponent {
  id: string | null;
  titulo: string;

  oficina = {
    nome: '',
    professor: ''
  };

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
      this.oficina = { nome: 'Oficina de Música', professor: '' };
    }
  }

  salvar() {
    if (this.id) {
      console.log('Atualizando oficina:', this.oficina);
    } else {
      console.log('Criando nova oficina:', this.oficina);
    }

    this.router.navigate(['/dashboard/oficinas']);
  }

  cancelar() {
    this.router.navigate(['/dashboard/oficinas']);
  }
}
