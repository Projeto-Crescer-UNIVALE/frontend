import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OficinasListComponent } from './pages/oficinas/oficinas-list/oficinas-list.component';

@Component({
  selector: 'app-root',
  standalone: true, // ✅ precisa estar aqui
  imports: [RouterOutlet, OficinasListComponent], // ✅ adicione seu componente aqui
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ✅ corrigido (plural)
})
export class AppComponent {
  title = 'repositorio-front';
}
