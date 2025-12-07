import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);
  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = new FormGroup({
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.authService.login(this.form.controls.email.value, this.form.controls.password.value)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          if (response.accessToken) {
            this.authService.setLoginData(response);
            this.router.navigate(['painel/dashboard']);
          }
        },
        error: (err) => {
          this.loading.set(false);
          console.error('Erro no login:', err);
          const mensagem = err.error?.message || 'E-mail ou senha inválidos';
          this.errorMessage.set(mensagem);
        }
      });
  }

  get f(){ return this.form.controls; }
}
