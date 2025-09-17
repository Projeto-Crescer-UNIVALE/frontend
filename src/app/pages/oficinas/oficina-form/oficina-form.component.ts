import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule , FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

interface DiarioCronograma {
  dia: number;
  hora_inicio: string;
  hora_fim: string;
}

interface CronogramaFormArray {
  dia: FormControl<number>;
  hora_inicio: FormControl<string>;
  hora_fim: FormControl<string>;
}

@Component({
  selector: 'app-oficina-form',
  standalone: true,

  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './oficina-form.component.html',
  styleUrls: ['./oficina-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OficinaFormComponent {
  id: string | null;
  titulo: string;
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  


  readonly form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    id_funcionario: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required, Validators.maxLength(250)]),
    status: new FormControl(true, [Validators.required]),
    cronograma: new FormArray<FormGroup<CronogramaFormArray>>([]),

  });

  readonly dias = [
    { nome: 'Domingo'},
    { nome: 'Segunda-feira'},
    { nome: 'Terça-feira'},
    { nome: 'Quarta-feira'},
    { nome: 'Quinta-feira'},
    { nome: 'Sexta-feira'},
    { nome: 'Sábado'},
  ];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.titulo = this.id ? 'Editar oficina' : 'Adicionar nova oficina';

  
    // if (this.id) {
    //   this.form.patchValue({
    //     nome: 'Oficina de Música',
    //     professor: 'João da Silva'
    //   });
    // }
  }

  createCronogramaControl(cronograma?: DiarioCronograma){
    return new FormGroup({
      dia: new FormControl(cronograma?.dia ?? 1, { validators: [Validators.required], nonNullable: true }),
      hora_inicio: new FormControl(cronograma?.hora_inicio ?? '00:00', { validators: [Validators.required], nonNullable: true }),
      hora_fim: new FormControl(cronograma?.hora_fim ?? '00:00', { validators: [Validators.required], nonNullable: true }),
    });
  }

  handleToggleCronograma(dia: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    const cronogramaExists =this.cronogramaDiaExists(dia);

    if (isChecked && !cronogramaExists) {
      this.form.controls.cronograma.push(this.createCronogramaControl({ dia, hora_inicio: '00:00', hora_fim: '00:00'}));
    }

    if (!isChecked && cronogramaExists) {
     const index = this.form.controls.cronograma.value.findIndex(c => c.dia === dia);

      if (index !== -1) {
        this.form.controls.cronograma.removeAt(index);
      }
    }
    this.changeDetectorRef.markForCheck();
  }

  cronogramaDiaExists(dia: number): boolean {
    const cronogramas = this.form.controls.cronograma.value;

    return cronogramas.some(c => c.dia === dia);
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
