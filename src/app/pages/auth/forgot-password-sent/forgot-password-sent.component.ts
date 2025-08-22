import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-forgot-password-sent',
  imports: [RouterLink],
  templateUrl: './forgot-password-sent.component.html',
  styleUrls: ['./forgot-password-sent.component.css']
})
export class ForgotPasswordSentComponent {}
