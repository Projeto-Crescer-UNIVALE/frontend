import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-forgot-password',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent {
  private http = inject(HttpClient);
  readonly loading = signal(false);
  isSent = false;

  readonly form = new FormGroup({
    email: new FormControl<string | null>(null, {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    })
  });

  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    // TODO: replace with your AuthService forgot-password call.
    // Example:
    // this.auth.requestPasswordReset(this.form.value.email!)
    //   .subscribe({
    //     next: () => { this.isSent = true; this.loading.set(false); },
    //     error: () => { this.loading.set(false); /* show error */ }
    //   });

    // Temporary mock:
    setTimeout(() => {
      this.isSent = true;   // only after "success"
      this.loading.set(false);
    }, 500);
  }
}
