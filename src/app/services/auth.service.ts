import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.type';
import { catchError, Observable, of, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'http://localhost:3000';

  constructor( private http: HttpClient, private router: Router, private snackBar: MatSnackBar ) { }

  // VERSIONE CON ALERT SEMPLICE :

  // register(id: number, nome: string, cognome: string, cf: string, email: string, password: string, user: User) {
  //   this.http.post<any>(`${this.apiUrl}/register`, user).subscribe(() => {
  //     alert('Registrazione effettuata con successo');
  //     this.router.navigate(['/login']);
  //   },
  //   () => {
  //     alert('Errore nella registrazione');
  //   });
  // }

  // VERSIONE CON SNACKBAR funzionante: 
  register(id: number, nome: string, cognome: string, cf: string, email: string, password: string, user: User) {
    this.http.post<any>(`${this.apiUrl}/register`, user).subscribe(() => {
      this.snackBar.open('Registrazione effettuata con successo', 'Ok', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 3000,
      });

      this.router.navigate(['/login']);
    },
    () => {
      this.snackBar.open('Errore nella registrazione', 'Ok');
    });
  }




  login(email: string, password: string): Observable<{ accessToken: string, user: User } | null> {
    return this.http.post<{ accessToken: string, user: User }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        console.log('Risposta dal backend:', response);
  
        // Controlliamo che la risposta contenga l'oggetto 'user' e 'accessToken'
        if (response.user && response.user.id) {
          // Salva l'ID dell'utente nel localStorage
          localStorage.setItem('userId', response.user.id.toString());  // Assicurati che sia una stringa

          localStorage.setItem('email', response.user.email);


          // Salva il token di accesso
          localStorage.setItem('accessToken', response.accessToken);
          // Reindirizza alla pagina dell'area personale
          this.router.navigate(['/user-profile']);
        } else {
          // Se la risposta non contiene i dati utente, fai qualcosa (ad esempio, mostra un errore)
          alert('Dati utente non trovati');
        }
      }),
      catchError(() => {
        alert('Errore nel login');
        return of(null);
      })
    );
  }
  
  
  

  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('accessToken') ? true: false;
  }

  



}
