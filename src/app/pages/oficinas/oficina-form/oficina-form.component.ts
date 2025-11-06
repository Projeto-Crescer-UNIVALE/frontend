import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { OficinaService } from '../../../core/services/oficina.service';

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
export class OficinaFormComponent implements OnInit {
  id: string | null;
  titulo: string;
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  professores: any[] = [];

  readonly form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    id_funcionario: new FormControl<number | null>(null, [Validators.required]),
    descricao: new FormControl('', [Validators.required, Validators.maxLength(250)]),
    status: new FormControl(true, [Validators.required]),
    cronograma: new FormArray<FormGroup<CronogramaFormArray>>([]),
  });

  readonly dias = [
    { nome: 'Domingo' },
    { nome: 'Segunda-feira' },
    { nome: 'Terça-feira' },
    { nome: 'Quarta-feira' },
    { nome: 'Quinta-feira' },
    { nome: 'Sexta-feira' },
    { nome: 'Sábado' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private oficinaService: OficinaService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.titulo = this.id && this.id !== 'novo' ? 'Editar oficina' : 'Adicionar nova oficina';
  }

  ngOnInit() {
    // Pegar dados do resolver
    const dados = this.route.snapshot.data['dados'];
    console.log('Dados do resolver:', dados);

    if (dados) {
      const oficina = dados.oficina;
      const professores = dados.professores || [];

      this.professores = professores;
      console.log('Professores carregados:', this.professores);

      if (oficina) {
        console.log('Oficina carregada:', oficina);

        this.form.patchValue({
          nome: oficina.nome,
          id_funcionario: oficina.id_funcionario,
          descricao: oficina.descricao,
          status: oficina.status,
        });

        if (oficina.cronograma && oficina.cronograma.length > 0) {
          oficina.cronograma.forEach((c: any) => {
            // Converter Date para string HH:MM
            const horaInicio = this.formatTime(c.hora_inicio);
            const horaFim = this.formatTime(c.hora_fim);

            this.form.controls.cronograma.push(
              this.createCronogramaControl({
                dia: c.dia,
                hora_inicio: horaInicio,
                hora_fim: horaFim,
              })
            );
          });
        }

        // Forçar detecção de mudanças
        this.changeDetectorRef.markForCheck();
      }
    }
  }

  // Função para formatar Date para HH:MM
  formatTime(time: any): string {
    if (!time) return '00:00';

    if (typeof time === 'string') {
      // Remove qualquer parte de segundos ou timezone
      const match = time.match(/(\d{2}):(\d{2})/);
      if (match) {
        return `${match[1]}:${match[2]}`;
      }
      // Se a string não estiver no formato esperado, tenta extrair os primeiros números encontrados
      const numbers = time.match(/\d{2}/g);
      if (numbers && numbers.length >= 2) {
        return `${numbers[0]}:${numbers[1]}`;
      }
    }

    if (time instanceof Date) {
      const hours = time.getHours().toString().padStart(2, '0');
      const minutes = time.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }

    return '00:00';
  }

  createCronogramaControl(cronograma?: DiarioCronograma) {
    return new FormGroup({
      dia: new FormControl(cronograma?.dia ?? 1, { validators: [Validators.required], nonNullable: true }),
      hora_inicio: new FormControl(cronograma?.hora_inicio ?? '00:00', { validators: [Validators.required], nonNullable: true }),
      hora_fim: new FormControl(cronograma?.hora_fim ?? '00:00', { validators: [Validators.required], nonNullable: true }),
    });
  }

  handleToggleCronograma(dia: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const cronogramaExists = this.cronogramaDiaExists(dia);

    if (isChecked && !cronogramaExists) {
      this.form.controls.cronograma.push(this.createCronogramaControl({ dia, hora_inicio: '00:00', hora_fim: '00:00' }));
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

  getCronogramaIndex(dia: number): number {
    return this.form.controls.cronograma.value.findIndex(c => c.dia === dia);
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.error('Formulário inválido');
      console.error('Erros detalhados:', this.getFormErrors());
      return;
    }

    const payload = this.form.value;

    if (payload.id_funcionario) {
      payload.id_funcionario = Number(payload.id_funcionario);
    }

    if (payload.cronograma && Array.isArray(payload.cronograma)) {
      payload.cronograma = payload.cronograma.map((c: any) => ({
        dia: c.dia,
        hora_inicio: c.hora_inicio + ':00', // Adiciona os segundos
        hora_fim: c.hora_fim + ':00'
      }));
    }

    console.log('Payload a ser enviado:', payload);

    if (this.id && this.id !== 'novo') {
      this.oficinaService.updateOficina(Number(this.id), payload).subscribe({
        next: () => this.router.navigate(['/painel/oficinas']),
        error: (err) => console.error('Erro ao atualizar oficina:', err)
      });
    } else {
      this.oficinaService.createOficina(payload).subscribe({
        next: () => this.router.navigate(['/painel/oficinas']),
        error: (err) => {
          console.error('Erro ao criar oficina:', err);
          console.error('Detalhes do erro:', err.error);
          if (err.error && err.error.message) {
            console.error('Mensagens de validação:', err.error.message);
          }
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/painel/oficinas']);
  }

  getFormErrors() {
    const errors: any = {};

    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control && control.invalid) {
        errors[key] = control.errors;
      }
    });

    // Verificar erros no FormArray de cronograma
    const cronogramaArray = this.form.get('cronograma') as FormArray;
    if (cronogramaArray) {
      cronogramaArray.controls.forEach((group, index) => {
        if (group.invalid) {
          errors[`cronograma[${index}]`] = group.errors;

          // Verificar cada campo dentro do grupo
          Object.keys((group as FormGroup).controls).forEach(field => {
            const fieldControl = group.get(field);
            if (fieldControl && fieldControl.invalid) {
              errors[`cronograma[${index}].${field}`] = fieldControl.errors;
            }
          });
        }
      });
    }

    return errors;
  }
}
