import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  // CORREÇÃO AQUI:
  templateUrl: './header.html',
  // E AQUI TAMBÉM (garantindo que o nome do css está correto):
  styleUrl: './header.css'
})
export class HeaderComponent {
  // Propriedade para controlar a visibilidade do dropdown
  dropdownOpen = false;
  userName = "Usuário Logado";

  // Método para alternar a visibilidade do dropdown
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Método para o logout
  logout(): void {
    console.log("Usuário encerrou a sessão.");
    this.dropdownOpen = false;
  }
}