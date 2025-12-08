import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { AuthResponse } from '../../../core/interface';

function matchValidator(a: string, b: string): ValidatorFn {
  return (group: AbstractControl) => {
    const one = group.get(a)?.value;
    const two = group.get(b)?.value;
    return one && two && one === two ? null : { mismatch: true };
  };
}

@Component({
  standalone: true,
  selector: 'app-create-password',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePasswordComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private auth = inject(AuthService);

  readonly loading = signal(false);

  readonly form = new FormGroup({
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    confirm:  new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  }, { validators: matchValidator('password', 'confirm') });

  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true);
    const accessToken = this.session?.accessToken;

    if(!accessToken) {
      this.loading.set(false);
      return;
    }

    this.auth.alterarSenhaComToken(accessToken, this.form.value.password!, this.form.value.confirm!)
      .subscribe({
        next: () => this.router.navigate(['/auth/login']),
        error: () => this.loading.set(false),
        complete: () => this.loading.set(false)
      });
  }

  get session() {
    return this.route.snapshot.data['session'] as AuthResponse | null;
  }
}
