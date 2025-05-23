import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from './services/theme.service';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestionale_prenotazioni_mediche';

  constructor(private AuthService: AuthService, public themeService: ThemeService) { }

  logout() {
    this.AuthService.logout();
  }

  isAuthenticated() {
    return this.AuthService.isAuthenticated();
  }

  currentTheme: string | undefined;
  private themeSubscription: Subscription | undefined;

  ngOnInit() {
    this.themeSubscription = this.themeService.getTheme().subscribe(theme => {
      this.currentTheme = theme;
      this.applyTheme();
    });
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  applyTheme() {
    if (this.currentTheme === 'dark') {
      document.body.classList.add('dark-theme');

    } else {
      document.body.classList.remove('dark-theme');


    }
  }


  toggleTheme() {
    if (this.currentTheme === 'dark') {
        this.themeService.setTheme('light');
        
    } else {
        this.themeService.setTheme('dark');
    }
  }

  

}
