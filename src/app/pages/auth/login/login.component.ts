import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private http = inject(HttpClient);
  private router = inject(Router);
  readonly loading = signal(false);

  readonly form = new FormGroup({
    email: new FormControl<string | null>(null, {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string | null>(null, {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  get f() { return this.form.controls; }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    // TODO: replace with your AuthService login call
    // Example:
    // this.auth.login(this.form.value as { email: string; password: string })
    //   .subscribe({
    //     next: () => this.router.navigateByUrl('/'),
    //     error: (err) => { /* show toast/error */ this.loading.set(false); },
    //     complete: () => this.loading.set(false)
    //   });

    // Temporary mock so you can see the flow:
    setTimeout(() => {
      this.loading.set(false);
      this.router.navigateByUrl('/'); // or dashboard
    }, 500);
  }
}

