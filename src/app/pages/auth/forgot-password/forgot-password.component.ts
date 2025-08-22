import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-forgot-password',
  imports: [RouterLink, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  emailTouched: boolean = false;

  constructor(private router: Router) {}

  get isEmailValid(): boolean {
    return this.emailErrorMsg === '';
  }

  get emailErrorMsg(): string {
    if (!this.email) return 'E-mail é obrigatório.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) return 'E-mail inválido.';
    return '';
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.emailTouched = true;

    if (this.isEmailValid) {
      this.router.navigate(['/forgot-password/sent']);
    }
  }
}
