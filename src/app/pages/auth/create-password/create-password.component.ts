import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-create-password',
  imports: [RouterLink, FormsModule],
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css']
})
export class CreatePasswordComponent {
  password: string = '';
  confirmPassword: string = '';
  passwordTouched: boolean = false;
  confirmTouched: boolean = false;

  constructor(private router: Router) {}

  get isPasswordValid(): boolean {
    return this.password.length >= 6;
  }

  get passwordErrorMsg(): string {
    if (!this.password) return 'Senha é obrigatória.';
    if (this.password.length < 6) return 'A senha deve ter no mínimo 6 caracteres.';
    return '';
  }

  get isConfirmPasswordValid(): boolean {
    return this.password === this.confirmPassword;
  }

  get formValid(): boolean {
    return this.isPasswordValid && this.isConfirmPasswordValid;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.passwordTouched = true;
    this.confirmTouched = true;

    if (this.formValid) {
      alert('Senha criada com sucesso!');
      this.router.navigate(['/login']);
    }
  }
}
