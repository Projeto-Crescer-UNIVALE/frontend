import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/sevices/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],

  templateUrl: './header.html',
  styleUrls: ['./header.css']
})

export class HeaderComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  dropdownOpen = false;

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  get user() {
    return this.authService.getUser();
  }
}
