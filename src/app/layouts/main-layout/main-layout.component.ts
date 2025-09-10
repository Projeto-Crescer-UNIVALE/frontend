import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header';

@Component({
  standalone: true,
  selector: 'app-main-layout',
  imports: [RouterModule, HeaderComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  userName = 'Usuário';
  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  logout() {
    console.log('logout');
  }
}
