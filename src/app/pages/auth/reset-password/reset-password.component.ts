import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-reset-password',
  imports: [RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  constructor(private router: Router) {}

  submit() {
    alert('Senha redefinida com sucesso! (mock)');
    this.router.navigate(['/login']);
  }
}
