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

  // VERSIONE CON SNACKBAR funzionante: 

   // private apiUrl = 'http://localhost:3000';
   
  // register(id: number, nome: string, cognome: string, cf: string, email: string, password: string, user: User) {
  //   this.http.post<any>(`${this.apiUrl}/register`, user).subscribe(() => {
  //     this.snackBar.open('Registrazione effettuata con successo', 'Ok', {
  //       verticalPosition: 'top',
  //       horizontalPosition: 'center',
  //       duration: 3000,
  //     });

  //     this.router.navigate(['/login']);
  //   },
  //   () => {
  //     this.snackBar.open('Errore nella registrazione', 'Ok');
  //   });
  // }


  
  //register per email già esistente:
  private apiUrl = 'http://localhost:3000/api';

  register(user: User) {
    this.http.post<any>(`${this.apiUrl}/users`, user).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400 && error.error === 'Email already exists') {
          // Gestione dell'errore di email duplicata (codice di stato 400)
          this.snackBar.open('Email già registrata. Si prega di utilizzare un\'altra email.', 'Ok');
          return throwError(() => error);
        } else {
          // Gestione di altri errori
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
