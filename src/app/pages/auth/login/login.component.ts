import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../../../core/sevices/auth.service';

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

  readonly form = new FormGroup({
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    this.authService.login(this.form.controls.email.value, this.form.controls.password.value)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          if (response.accessToken) {
            this.authService.user = response.funcionario;
            localStorage.setItem('accessToken', response.accessToken);
            this.router.navigate(['/']);
          }
        },
        error: (err) => { console.error('Erro no login:', err); }
      });
  }

  get f(){ return this.form.controls; }
}
