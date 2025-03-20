import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestionale_prenotazioni_mediche';

  constructor(private AuthService: AuthService) { }

  logout() {
    this.AuthService.logout();
  }

  isAuthenticated() {
    return this.AuthService.isAuthenticated();
  }
  
}
