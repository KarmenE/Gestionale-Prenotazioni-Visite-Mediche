import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  private themeKey = 'app-theme'; // chiave per il Local Storage
  private theme$ = new BehaviorSubject(this.getStoredTheme()); // tema iniziale

  setTheme(theme: string) {
    localStorage.setItem(this.themeKey, theme); // salva il tema nel Local Storage
    this.theme$.next(theme);
  }

  getTheme() {
    return this.theme$.asObservable();
  }

  private getStoredTheme(): string {
    return localStorage.getItem(this.themeKey) || 'light'; // recupera il tema dal Local Storage o usa 'light' come predefinito
  }



}