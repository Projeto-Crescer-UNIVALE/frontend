import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  @Input() userName: string = "Usuário Logado";
  @Output() logoutClick = new EventEmitter<void>();

  dropdownOpen = false;
  
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }


  logout(): void {
    console.log("Usuário encerrou a sessão.");
    this.dropdownOpen = false;
    this.logoutClick.emit(); 
  }
}
