import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.type';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor( private http: HttpClient, private router: Router, private snackBar: MatSnackBar ) { }


  private apiUrl = 'http://localhost:3000';

  register(user: User) {
    this.http.post<any>(`${this.apiUrl}/users`, user).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400 && error.error === 'Email already exists') {
          // gestione dell'errore di email duplicata (codice 400)
          this.snackBar.open('Email già registrata. Si prega di utilizzare un\'altra email.', 'Ok');
          return throwError(() => error);
        } else {
          // gestione altri errori
          this.snackBar.open('Errore nella registrazione', 'Ok');
          return throwError(() => error);
        }
      })
    ).subscribe({
      next: () => {
        this.snackBar.open('Registrazione effettuata con successo', 'Ok', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 3000,
        });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Errore durante la registrazione:', error);
      }
    });
  }


  login(email: string, password: string): Observable<{ accessToken: string, user: User } | null> {
    return this.http.post<{ accessToken: string, user: User }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        console.log('Risposta dal backend:', response);
  
        // controllo che la risposta contenga l'oggetto 'user' e 'accessToken'
        if (response.user && response.user.id) {
          // salva ID dell'utente nel localStorage
          localStorage.setItem('userId', response.user.id.toString());  // controllo che sia una stringa

          localStorage.setItem('email', response.user.email);


          // salva il token di accesso
          localStorage.setItem('accessToken', response.accessToken);
          // reindirizza alla pagina dell'area personale
          this.router.navigate(['/user-profile']);
        } else {
          // se la risposta non contiene i dati utente
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
